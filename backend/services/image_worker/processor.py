from __future__ import annotations

import csv
import json
import os
import re
import shutil
import subprocess
import threading
import time
import zipfile
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any, Callable, Iterable

import numpy as np
from PIL import Image, ImageColor, ImageFilter, ImageOps

from .ai_tools import pytorch_realesrgan_python, pytorch_realesrgan_weight, realesrgan_executable
from .auto_compose import auto_compose
from .models import BackgroundRemovalMode, CanvasBackgroundMode, ClarityEnhanceMode, FitMode, ImageEditRequest, ImageEditSummary, MarginMode, OutputMode, ProcessedImage, StandardUpscaleMethod


SUPPORTED_IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}


@dataclass(frozen=True)
class ImageInput:
    source_path: Path
    relative_path: Path
    root_ean: str = ""


@dataclass(frozen=True)
class ImageOutputPlan:
    ean: str
    ean_index: int
    output_name: str
    output_relative_path: Path


@dataclass(frozen=True)
class BackgroundAnalysis:
    classification: str
    strategy: str
    confidence: float
    border_color: tuple[int, int, int] | None = None


ProgressCallback = Callable[[dict[str, Any]], None]


def run_image_edit(
    input_paths: list[Path],
    output_dir: Path,
    request: ImageEditRequest,
    progress_callback: ProgressCallback | None = None,
) -> ImageEditSummary:
    output_dir.mkdir(parents=True, exist_ok=True)
    work_dir = output_dir / "images" if request.output_mode == OutputMode.zip else output_dir
    if request.output_mode == OutputMode.zip and work_dir.exists():
        shutil.rmtree(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)

    with TemporaryDirectory() as temp:
        expanded_inputs = expand_inputs(input_paths, Path(temp), include_subfolders=request.include_subfolders)
        if not expanded_inputs:
            raise ValueError("No supported image inputs found")
        emit_progress(
            progress_callback,
            total=len(expanded_inputs),
            completed=0,
            processed=0,
            skipped=0,
            current_file="Preparing output plan",
            worker_count=effective_worker_count(request),
        )
        used_paths: set[str] = set()
        ean_counts: dict[str, int] = {}
        tasks = []
        for index, image_input in enumerate(expanded_inputs, start=1):
            output_plan = build_output_plan(image_input, request, index, ean_counts, used_paths)
            tasks.append((index, image_input, output_plan, work_dir / output_plan.output_relative_path))

        records_by_index: dict[int, ProcessedImage] = {}
        worker_count = effective_worker_count(request)
        completed_count = 0
        processed_count = 0
        skipped_count = 0
        state_lock = threading.Lock()
        item_states = [
            {
                "item_id": f"item-{index:06d}",
                "index": index,
                "original_filename": image_input.source_path.name,
                "relative_path": image_input.relative_path.as_posix(),
                "source_path": str(image_input.source_path),
                "output_path": str(output_path),
                "output_filename": output_plan.output_relative_path.as_posix(),
                "width": request.width,
                "height": request.height,
                "status": "queued",
                "progress_percent": 0,
                "started_at_ms": None,
                "finished_at_ms": None,
                "elapsed_seconds": 0,
                "eta_seconds": None,
                "message": "",
            }
            for index, image_input, output_plan, output_path in tasks
        ]
        if can_use_sharp_batch(request):
            emit_progress(
                progress_callback,
                total=len(expanded_inputs),
                completed=0,
                processed=0,
                skipped=0,
                current_file="Sharp batch processing",
                worker_count=worker_count,
                items=item_states,
            )
            for index, record in process_sharp_batch_records(tasks, request, worker_count):
                records_by_index[index] = record
                completed_count += 1
                if record.status == "processed":
                    processed_count += 1
                else:
                    skipped_count += 1
                item = item_states[index - 1]
                item["status"] = "completed" if record.status == "processed" else "failed"
                item["progress_percent"] = 100
                item["started_at_ms"] = item["started_at_ms"] or int(time.time() * 1000)
                item["finished_at_ms"] = int(time.time() * 1000)
                item["message"] = record.message
                item["output_path"] = str(record.output_path or item["output_path"])
                item["output_filename"] = record.output_filename
                item["width"] = record.width or request.width
                item["height"] = record.height or request.height
                emit_progress(
                    progress_callback,
                    total=len(expanded_inputs),
                    completed=completed_count,
                    processed=processed_count,
                    skipped=skipped_count,
                    current_file=record.original_filename,
                    worker_count=worker_count,
                    items=item_states,
                )
        else:
            def process_task(task: tuple[int, ImageInput, ImageOutputPlan, Path]) -> ProcessedImage:
                index, image_input, output_plan, output_path = task
                with state_lock:
                    item = item_states[index - 1]
                    item["status"] = "processing"
                    item["progress_percent"] = 5
                    item["started_at_ms"] = int(time.time() * 1000)
                    emit_progress(
                        progress_callback,
                        total=len(expanded_inputs),
                        completed=completed_count,
                        processed=processed_count,
                        skipped=skipped_count,
                        current_file=image_input.source_path.name,
                        worker_count=worker_count,
                        items=item_states,
                    )
                return process_image_record(image_input, output_plan, output_path, request)

            with ThreadPoolExecutor(max_workers=worker_count) as executor:
                futures = {
                    executor.submit(process_task, task): task[0]
                    for task in tasks
                }
                for future in as_completed(futures):
                    record = future.result()
                    index = futures[future]
                    records_by_index[index] = record
                    with state_lock:
                        completed_count += 1
                        if record.status == "processed":
                            processed_count += 1
                        else:
                            skipped_count += 1
                        item = item_states[index - 1]
                        item["status"] = "completed" if record.status == "processed" else "failed"
                        item["progress_percent"] = 100
                        item["finished_at_ms"] = int(time.time() * 1000)
                        item["message"] = record.message
                        item["output_path"] = str(record.output_path or item["output_path"])
                        item["output_filename"] = record.output_filename
                        item["width"] = record.width or request.width
                        item["height"] = record.height or request.height
                    emit_progress(
                        progress_callback,
                        total=len(expanded_inputs),
                        completed=completed_count,
                        processed=processed_count,
                        skipped=skipped_count,
                        current_file=record.original_filename,
                        worker_count=worker_count,
                        items=item_states,
                    )

        records = [records_by_index[index] for index, *_ in tasks]

        manifest_path = output_dir / "manifest.csv"
        write_manifest(records, manifest_path)
        output_zip = ""
        if request.output_mode == OutputMode.zip:
            output_zip_path = output_dir / "image_edit_output.zip"
            write_zip(output_zip_path, work_dir, manifest_path)
            output_zip = str(output_zip_path)
        warnings = upscale_warnings(request)
        warnings.extend(non_ai_large_upscale_warnings(expanded_inputs, request))
        warnings.extend(optional_canvas_warnings(request))
        return ImageEditSummary(
            input_count=len(expanded_inputs),
            processed_count=sum(1 for record in records if record.status == "processed"),
            skipped_count=sum(1 for record in records if record.status != "processed"),
            output_zip=output_zip,
            output_dir=str(work_dir),
            manifest_path=str(manifest_path),
            worker_count=worker_count,
            progress_percent=100,
            current_file="Completed",
            warnings=warnings,
            items=item_states,
        )


def emit_progress(
    callback: ProgressCallback | None,
    *,
    total: int,
    completed: int,
    processed: int,
    skipped: int,
    current_file: str,
    worker_count: int,
    items: list[dict] | None = None,
) -> None:
    if callback is None:
        return
    percent = 0 if total <= 0 else int(round(completed / total * 100))
    callback(
        {
            "input_count": total,
            "processed_count": processed,
            "skipped_count": skipped,
            "progress_percent": max(0, min(percent, 100)),
            "current_file": current_file,
            "worker_count": worker_count,
            "items": refresh_item_estimates(items or [], worker_count),
        }
    )


def refresh_item_estimates(items: list[dict], worker_count: int) -> list[dict]:
    if not items:
        return items
    now_ms = int(time.time() * 1000)
    completed = [item for item in items if item.get("status") in {"completed", "failed"}]
    elapsed_values = []
    for item in completed:
        started = item.get("started_at_ms")
        finished = item.get("finished_at_ms")
        if started and finished:
            elapsed_values.append(max(0.0, (float(finished) - float(started)) / 1000))
    average = sum(elapsed_values) / len(elapsed_values) if elapsed_values else None
    queued_before = 0
    for item in items:
        status = item.get("status")
        started = item.get("started_at_ms")
        finished = item.get("finished_at_ms")
        if status == "processing" and started:
            item["elapsed_seconds"] = max(0.0, (now_ms - float(started)) / 1000)
            item["progress_percent"] = max(float(item.get("progress_percent") or 5), 10)
        elif status in {"completed", "failed"} and started and finished:
            item["elapsed_seconds"] = max(0.0, (float(finished) - float(started)) / 1000)
        elif status == "queued":
            queued_before += 1
        if status == "queued" and average:
            batches_ahead = max(0, queued_before - 1) // max(1, worker_count)
            item["eta_seconds"] = average * (batches_ahead + 1)
    return items


def expand_inputs(input_paths: list[Path], temp_dir: Path, include_subfolders: bool = True) -> list[ImageInput]:
    expanded: list[ImageInput] = []
    for input_path in input_paths:
        if input_path.is_dir():
            image_paths = input_path.rglob("*") if include_subfolders else input_path.glob("*")
            expanded.extend(
                ImageInput(path, path.relative_to(input_path), root_ean=first_ean_candidate(input_path.name))
                for path in image_paths
                if is_supported_image_file(path)
            )
            continue
        suffix = input_path.suffix.lower()
        if suffix == ".zip":
            extract_dir = temp_dir / input_path.stem
            extract_dir.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(input_path) as archive:
                safe_extract_zip(archive, extract_dir)
            image_paths = extract_dir.rglob("*") if include_subfolders else extract_dir.glob("*")
            expanded.extend(
                ImageInput(path, path.relative_to(extract_dir), root_ean=first_ean_candidate(input_path.stem))
                for path in image_paths
                if is_supported_image_file(path)
            )
        elif is_supported_image_file(input_path):
            expanded.append(ImageInput(input_path, Path(input_path.name), root_ean=""))
    return sorted(expanded, key=lambda item: item.relative_path.as_posix().lower())


def is_supported_image_file(path: Path) -> bool:
    if not path.is_file():
        return False
    if path.name.startswith(".") or path.name.startswith("~"):
        return False
    return path.suffix.lower() in SUPPORTED_IMAGE_SUFFIXES


def safe_extract_zip(archive: zipfile.ZipFile, extract_dir: Path) -> None:
    base_dir = extract_dir.resolve()
    for member in archive.infolist():
        member_path = (extract_dir / member.filename).resolve()
        if base_dir not in member_path.parents and member_path != base_dir:
            raise ValueError(f"Unsafe zip entry blocked: {member.filename}")
        archive.extract(member, extract_dir)


def process_image_record(image_input: ImageInput, output_plan: ImageOutputPlan, output_path: Path, request: ImageEditRequest) -> ProcessedImage:
    source_path = image_input.source_path
    output_name = output_plan.output_relative_path.as_posix()
    try:
        analysis = process_one_image(source_path, output_path, request)
        with Image.open(output_path) as output_image:
            width, height = output_image.size
        return ProcessedImage(
            original_filename=source_path.name,
            output_filename=output_name,
            status="processed",
            width=width,
            height=height,
            dpi=request.dpi,
            source_path=source_path,
            output_path=output_path,
            relative_path=image_input.relative_path.as_posix(),
            ean=output_plan.ean,
            background_classification=analysis.classification if analysis else "",
            background_strategy=analysis.strategy if analysis else "",
            background_confidence=analysis.confidence if analysis else None,
        )
    except Exception as exc:
        return ProcessedImage(
            original_filename=source_path.name,
            output_filename=output_name,
            status="failed",
            message=str(exc),
            source_path=source_path,
            relative_path=image_input.relative_path.as_posix(),
            ean=output_plan.ean,
        )


def can_use_sharp_batch(request: ImageEditRequest) -> bool:
    return (
        request.upscale_mode in {"none", ""}
        and not request.require_white_background
        and not request.reject_human_parts
        and request.canvas_background_mode == CanvasBackgroundMode.white
        and not request.remove_white_space_around_product
        and not request.auto_product_fill
        and not request.normalize_product_size
        and not request.remove_shadow
        and not request.remove_background
    )


def process_sharp_batch_records(
    tasks: list[tuple[int, ImageInput, ImageOutputPlan, Path]],
    request: ImageEditRequest,
    worker_count: int,
) -> list[tuple[int, ProcessedImage]]:
    worker_path = Path(__file__).with_name("worker.js")
    items = [
        {
            "input_path": str(image_input.source_path),
            "output_path": str(output_path),
            "request": request.model_dump(mode="json"),
        }
        for _, image_input, _, output_path in tasks
    ]
    result = subprocess.run(
        ["node", str(worker_path), "batch"],
        input=json.dumps({"items": items, "concurrency": min(worker_count, 8)}),
        capture_output=True,
        text=True,
        cwd=Path(__file__).resolve().parents[2],
    )
    if result.returncode != 0:
        message = (result.stderr or result.stdout or "Sharp batch failed").strip()
        raise RuntimeError(f"Sharp batch failed: {message}")
    payload = json.loads(result.stdout)
    raw_results = payload.get("results", [])
    records: list[tuple[int, ProcessedImage]] = []
    for task, item_result in zip(tasks, raw_results):
        index, image_input, output_plan, output_path = task
        source_path = image_input.source_path
        output_name = output_plan.output_relative_path.as_posix()
        if item_result.get("status") == "processed" and output_path.exists():
            width = int(item_result.get("width") or request.width)
            height = int(item_result.get("height") or request.height)
            records.append(
                (
                    index,
                    ProcessedImage(
                        original_filename=source_path.name,
                        output_filename=output_name,
                        status="processed",
                        width=width,
                        height=height,
                        dpi=request.dpi,
                        source_path=source_path,
                        output_path=output_path,
                        relative_path=image_input.relative_path.as_posix(),
                        ean=output_plan.ean,
                    ),
                )
            )
        else:
            records.append(
                (
                    index,
                    ProcessedImage(
                        original_filename=source_path.name,
                        output_filename=output_name,
                        status="failed",
                        message=str(item_result.get("message") or "Sharp batch item failed"),
                        source_path=source_path,
                        relative_path=image_input.relative_path.as_posix(),
                        ean=output_plan.ean,
                    ),
                )
            )
    return records


def process_one_image(source_path: Path, output_path: Path, request: ImageEditRequest) -> BackgroundAnalysis | None:
    image = Image.open(source_path)
    image = ImageOps.exif_transpose(image).convert("RGBA")
    if request.require_white_background and not has_white_background(image, request.white_threshold):
        raise ValueError("Skipped by white-background filter")
    if request.reject_human_parts and contains_human_parts(image):
        raise ValueError("Skipped by human-part filter")
    if request.auto_compose_enabled:
        request = auto_compose(image, request)
    if request.manual_transform_enabled:
        image = render_manual_transform(image, request)
        save_image(image, output_path, request)
        return BackgroundAnalysis("manual_layout", "manual_transform", 1.0)
    analysis = analyze_background(image, request)
    preprocessed_image = preprocess_product_image(image, request, analysis)
    if preprocessed_image is not None:
        image = preprocessed_image
    if request.upscale_mode in {"none", ""}:
        if preprocessed_image is None:
            run_sharp_transform(source_path, output_path, request)
            return analysis
        if preprocessed_image_is_final_canvas(request):
            save_image(image, output_path, request)
            return analysis
        with TemporaryDirectory() as temp:
            preprocessed_path = Path(temp) / "preprocessed.png"
            image.save(preprocessed_path, format="PNG")
            final_request = request.model_copy(update={"crop_to_content": False, "remove_white_space_around_product": False})
            run_sharp_transform(preprocessed_path, output_path, final_request)
        return analysis
    if request.crop_to_content:
        image = crop_to_non_white_content(image, request.white_threshold, padding_ratio=0.02)
    image = maybe_upscale_image(image, request, output_path)
    with TemporaryDirectory() as temp:
        intermediate_path = Path(temp) / "ai_upscaled.png"
        image.save(intermediate_path, format="PNG")
        final_request = request.model_copy(update={"crop_to_content": False, "clarity_enhance": ClarityEnhanceMode.none})
        run_sharp_transform(intermediate_path, output_path, final_request)
    return analysis


def run_sharp_transform(source_path: Path, output_path: Path, request: ImageEditRequest) -> None:
    worker_path = Path(__file__).with_name("worker.js")
    payload = {
        "input_path": str(source_path),
        "output_path": str(output_path),
        "request": request.model_dump(mode="json"),
    }
    result = subprocess.run(
        ["node", str(worker_path), "transform"],
        input=json.dumps(payload),
        capture_output=True,
        text=True,
        cwd=Path(__file__).resolve().parents[2],
        timeout=300,
    )
    if result.returncode != 0 or not output_path.exists():
        message = (result.stderr or result.stdout or "Sharp transform failed").strip()
        raise RuntimeError(f"Sharp transform failed: {message}")


def maybe_upscale_image(image: Image.Image, request: ImageEditRequest, output_path: Path) -> Image.Image:
    if request.upscale_mode in {"none", ""}:
        return standard_upscale_image(image, request)
    if request.upscale_mode not in {"real_esrgan", "real_esrgan_ncnn"}:
        raise ValueError(f"Unsupported upscale_mode: {request.upscale_mode}")

    work_dir = output_path.parent / "_upscale_work" / output_path.stem
    work_dir.mkdir(parents=True, exist_ok=True)
    input_path = work_dir / f"{output_path.stem}_upscale_input.png"
    upscaled_path = work_dir / f"{output_path.stem}_upscaled_ncnn.png"
    image.save(input_path, format="PNG")

    try:
        return run_ncnn_upscale(input_path, upscaled_path, request)
    except Exception as exc:
        if not request.upscale_cpu_fallback:
            raise
        cpu_path = work_dir / f"{output_path.stem}_upscaled_cpu.png"
        try:
            return run_pytorch_cpu_upscale(input_path, cpu_path)
        except Exception as cpu_exc:
            raise RuntimeError(f"AI upscale failed. ncnn error: {exc}; CPU fallback error: {cpu_exc}") from cpu_exc
    finally:
        shutil.rmtree(work_dir, ignore_errors=True)


def standard_upscale_image(image: Image.Image, request: ImageEditRequest) -> Image.Image:
    if image.width <= 0 or image.height <= 0:
        return image
    scale = fit_scale_ratio(image, request)
    if scale <= 1:
        return image
    next_size = (max(1, int(round(image.width * scale))), max(1, int(round(image.height * scale))))
    return resize_standard(image, next_size, request.standard_upscale_method)


def fit_scale_ratio(image: Image.Image, request: ImageEditRequest) -> float:
    target_width = request.width
    target_height = request.height
    margin_x, margin_y = margin_pixels(request, target_width, target_height)
    content_width = max(1, target_width - margin_x * 2)
    content_height = max(1, target_height - margin_y * 2)
    if image.width <= 0 or image.height <= 0:
        return 1.0
    if request.fit_mode == FitMode.cover:
        return max(content_width / image.width, content_height / image.height)
    if request.fit_mode == FitMode.stretch:
        return max(content_width / image.width, content_height / image.height)
    return min(content_width / image.width, content_height / image.height)


def resize_standard(image: Image.Image, size: tuple[int, int], method: StandardUpscaleMethod) -> Image.Image:
    if method == StandardUpscaleMethod.pillow_bicubic:
        return image.resize(size, Image.Resampling.BICUBIC)
    if method == StandardUpscaleMethod.pillow_lanczos:
        return image.resize(size, Image.Resampling.LANCZOS)
    if method in {StandardUpscaleMethod.opencv_lanczos4, StandardUpscaleMethod.opencv_cubic}:
        try:
            import cv2
        except Exception as exc:
            raise RuntimeError("OpenCV is required for the selected standard upscale method") from exc
        interpolation = cv2.INTER_LANCZOS4 if method == StandardUpscaleMethod.opencv_lanczos4 else cv2.INTER_CUBIC
        array = np.asarray(image.convert("RGBA"))
        resized = cv2.resize(array, size, interpolation=interpolation)
        return Image.fromarray(resized, mode="RGBA")
    return image.resize(size, Image.Resampling.LANCZOS)


def maybe_enhance_clarity(image: Image.Image, request: ImageEditRequest, resize_scale: float) -> Image.Image:
    if request.upscale_mode not in {"none", ""}:
        return image
    if request.clarity_enhance == ClarityEnhanceMode.none:
        return image
    if request.clarity_enhance == ClarityEnhanceMode.auto:
        params = auto_clarity_settings(resize_scale)
        if params is None:
            return image
        return image.filter(ImageFilter.UnsharpMask(**params))
    settings = {
        ClarityEnhanceMode.light: {"radius": 0.8, "percent": 80, "threshold": 3},
        ClarityEnhanceMode.medium: {"radius": 1.0, "percent": 125, "threshold": 3},
        ClarityEnhanceMode.strong: {"radius": 1.2, "percent": 170, "threshold": 2},
    }
    params = settings.get(request.clarity_enhance)
    if params is None:
        return image
    return image.filter(ImageFilter.UnsharpMask(**params))


def auto_clarity_settings(resize_scale: float) -> dict[str, float | int] | None:
    if resize_scale <= 0:
        return None
    if resize_scale < 0.5:
        return {"radius": 0.35, "percent": 70, "threshold": 2}
    if resize_scale < 1:
        return {"radius": 0.45, "percent": 90, "threshold": 2}
    if abs(resize_scale - 1) < 0.01:
        return {"radius": 0.3, "percent": 40, "threshold": 4}
    if resize_scale <= 1.5:
        return {"radius": 0.55, "percent": 110, "threshold": 2}
    return {"radius": 0.7, "percent": 90, "threshold": 3}


def run_ncnn_upscale(input_path: Path, upscaled_path: Path, request: ImageEditRequest) -> Image.Image:
    exe = realesrgan_executable()
    if exe is None:
        raise RuntimeError("Real-ESRGAN ncnn-vulkan executable is not installed")

    model_dir = exe.parent / "models"
    if not model_dir.exists():
        raise RuntimeError(f"Real-ESRGAN ncnn model directory is missing: {model_dir}")
    command = [
        str(exe),
        "-i",
        str(input_path),
        "-o",
        str(upscaled_path),
        "-s",
        str(request.upscale_scale),
        "-n",
        request.upscale_model,
        "-f",
        "png",
    ]
    if model_dir.exists():
        command.extend(["-m", str(model_dir)])

    result = subprocess.run(command, capture_output=True, text=True, timeout=300)
    if result.returncode != 0 or not upscaled_path.exists():
        message = (result.stderr or result.stdout or "Real-ESRGAN failed").strip()
        raise RuntimeError(f"Real-ESRGAN upscale failed: {message}")

    with Image.open(upscaled_path) as upscaled:
        return upscaled.convert("RGBA").copy()


def run_pytorch_cpu_upscale(input_path: Path, upscaled_path: Path) -> Image.Image:
    python_exe = pytorch_realesrgan_python()
    weights = pytorch_realesrgan_weight()
    if not python_exe.exists():
        raise RuntimeError(f"PyTorch Real-ESRGAN Python env is missing: {python_exe}")
    if not weights.exists():
        raise RuntimeError(f"PyTorch Real-ESRGAN weights are missing: {weights}")

    helper = Path(__file__).with_name("pytorch_upscale.py")
    command = [
        str(python_exe),
        str(helper),
        "--input",
        str(input_path),
        "--output",
        str(upscaled_path),
        "--weights",
        str(weights),
        "--device",
        "cpu",
    ]
    result = subprocess.run(command, capture_output=True, text=True, timeout=900)
    if result.returncode != 0 or not upscaled_path.exists():
        message = (result.stderr or result.stdout or "PyTorch Real-ESRGAN CPU fallback failed").strip()
        raise RuntimeError(message)
    with Image.open(upscaled_path) as upscaled:
        return upscaled.convert("RGBA").copy()


def preprocess_product_image(
    image: Image.Image,
    request: ImageEditRequest,
    analysis: BackgroundAnalysis | None = None,
) -> Image.Image | None:
    needs_preprocess = (
        request.canvas_background_mode != CanvasBackgroundMode.white
        or request.remove_white_space_around_product
        or request.auto_product_fill
        or request.normalize_product_size
        or request.remove_shadow
        or request.remove_background
    )
    if not needs_preprocess:
        return None

    result = image.convert("RGBA")
    if request.remove_background:
        result = remove_background_by_mode(result, request)
    elif request.remove_shadow:
        result = suppress_white_background_shadow(result, request.white_threshold)

    product_cleanup_safe = analysis is None or analysis.classification in {"transparent", "white_product", "solid_color", "manual"}
    if (request.auto_product_fill or request.normalize_product_size) and product_cleanup_safe:
        return compose_product_canvas(result, request, fill_product=True, analysis=analysis)
    if (request.remove_white_space_around_product or request.crop_to_content) and product_cleanup_safe:
        result = crop_to_non_white_content(result, request.white_threshold, padding_px=request.safe_padding)
    if request.canvas_background_mode != CanvasBackgroundMode.white:
        return compose_product_canvas(result, request, fill_product=False, analysis=analysis)
    return result


def preprocessed_image_is_final_canvas(request: ImageEditRequest) -> bool:
    return (
        request.canvas_background_mode != CanvasBackgroundMode.white
        or request.auto_product_fill
        or request.normalize_product_size
    )


def remove_background_by_mode(image: Image.Image, request: ImageEditRequest) -> Image.Image:
    if request.background_removal_mode == BackgroundRemovalMode.rembg:
        return remove_background_with_rembg(image)
    if request.background_removal_mode == BackgroundRemovalMode.sam2:
        return remove_border_connected_white_background(image, request.white_threshold)
    return remove_border_connected_white_background(image, request.white_threshold)


def remove_background_with_rembg(image: Image.Image) -> Image.Image:
    try:
        from rembg import remove
    except Exception as exc:
        raise RuntimeError("rembg and onnxruntime are required for background removal") from exc
    output = remove(image.convert("RGBA"))
    if isinstance(output, Image.Image):
        return output.convert("RGBA")
    if isinstance(output, bytes):
        return Image.open(BytesIO(output)).convert("RGBA")
    return image.convert("RGBA")


def remove_border_connected_white_background(image: Image.Image, threshold: int) -> Image.Image:
    rgba = image.convert("RGBA")
    array = np.asarray(rgba).copy()
    rgb = array[:, :, :3]
    alpha = array[:, :, 3]
    height, width = alpha.shape
    background = (alpha < 16) | np.all(rgb >= threshold, axis=2)
    visited = np.zeros((height, width), dtype=bool)
    stack: list[tuple[int, int]] = []
    for x in range(width):
        if background[0, x]:
            stack.append((x, 0))
        if background[height - 1, x]:
            stack.append((x, height - 1))
    for y in range(height):
        if background[y, 0]:
            stack.append((0, y))
        if background[y, width - 1]:
            stack.append((width - 1, y))
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= width or y >= height or visited[y, x] or not background[y, x]:
            continue
        visited[y, x] = True
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    array[visited, 3] = 0
    return Image.fromarray(array, mode="RGBA")
    return Image.open(output).convert("RGBA")


def suppress_white_background_shadow(image: Image.Image, threshold: int) -> Image.Image:
    rgba = image.convert("RGBA")
    array = np.asarray(rgba).copy()
    rgb = array[:, :, :3].astype(np.int16)
    alpha = array[:, :, 3]
    max_channel = rgb.max(axis=2)
    min_channel = rgb.min(axis=2)
    saturation = max_channel - min_channel
    shadow_mask = (alpha > 0) & (max_channel >= max(160, threshold - 70)) & (saturation <= 28)
    object_mask = (alpha > 8) & ((saturation > 28) | (max_channel < max(80, threshold - 90)))
    shadow_mask &= ~object_mask
    array[shadow_mask, 0:3] = 255
    return Image.fromarray(array, mode="RGBA")


def compose_product_canvas(
    image: Image.Image,
    request: ImageEditRequest,
    *,
    fill_product: bool,
    analysis: BackgroundAnalysis | None = None,
) -> Image.Image:
    source = image.convert("RGBA")
    product = source
    if fill_product or request.remove_white_space_around_product or request.crop_to_content:
        product = crop_to_non_white_content(source, request.white_threshold, padding_px=request.safe_padding)
    if product.width <= 0 or product.height <= 0:
        product = source

    margin_x, margin_y = margin_pixels(request, request.width, request.height)
    content_width = max(1, request.width - margin_x * 2)
    content_height = max(1, request.height - margin_y * 2)
    ratio = request.fill_ratio if fill_product else request.product_target_occupancy
    if request.normalize_product_size and not request.auto_product_fill:
        ratio = request.product_target_occupancy
    occupancy = max(0.1, min(float(ratio), 1.0))
    if not fill_product and analysis is not None and analysis.strategy in {"edge_extend", "blur_cover"}:
        occupancy = 1.0
    usable_width = max(1, int(round(content_width * occupancy)))
    usable_height = max(1, int(round(content_height * occupancy)))

    if request.fit_mode == FitMode.stretch and not fill_product:
        resized = product.resize((content_width, content_height), Image.Resampling.LANCZOS)
    else:
        scale = min(usable_width / product.width, usable_height / product.height)
        if request.fit_mode == FitMode.cover and not fill_product:
            scale = max(content_width / product.width, content_height / product.height)
        next_size = (
            max(1, int(round(product.width * scale))),
            max(1, int(round(product.height * scale))),
        )
        resized = product.resize(next_size, Image.Resampling.LANCZOS)
        if request.fit_mode == FitMode.cover and not fill_product:
            resized = ImageOps.fit(resized, (content_width, content_height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

    canvas = smart_canvas_background(source, request, analysis)
    x = margin_x + (content_width - resized.width) // 2
    y = margin_y + (content_height - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def analyze_background(image: Image.Image, request: ImageEditRequest) -> BackgroundAnalysis | None:
    mode = request.canvas_background_mode
    if mode == CanvasBackgroundMode.white:
        return None
    if mode == CanvasBackgroundMode.edge_extend:
        return BackgroundAnalysis("manual", "edge_extend", 1.0)
    if mode == CanvasBackgroundMode.blur_cover:
        return BackgroundAnalysis("manual", "blur_cover", 1.0)

    rgba = image.convert("RGBA")
    pixels = border_rgba_pixels(rgba)
    transparent_ratio = float(np.mean(pixels[:, 3] < 16))
    if transparent_ratio >= 0.15:
        return BackgroundAnalysis("transparent", "white", min(1.0, 0.8 + transparent_ratio * 0.2), (255, 255, 255))
    if has_white_background(rgba, request.white_threshold):
        return BackgroundAnalysis("white_product", "white", 0.96, (255, 255, 255))

    border_color = uniform_border_color(rgba)
    if border_color is not None:
        return BackgroundAnalysis("solid_color", "solid_color", 0.95, border_color)

    edge_density, smoothness = border_complexity_metrics(rgba)
    if edge_density <= 0.12 and smoothness >= 0.68:
        confidence = min(0.94, 0.72 + smoothness * 0.2 + max(0.0, 0.12 - edge_density))
        return BackgroundAnalysis("smooth_gradient", "edge_extend", confidence)
    confidence = min(0.94, 0.68 + edge_density * 0.5 + max(0.0, 0.68 - smoothness) * 0.25)
    return BackgroundAnalysis("complex_lifestyle", "blur_cover", confidence)


def border_complexity_metrics(image: Image.Image) -> tuple[float, float]:
    rgba = image.convert("RGBA")
    rgba.thumbnail((256, 256), Image.Resampling.LANCZOS)
    base = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    base.alpha_composite(rgba)
    rgb = np.asarray(base.convert("RGB")).astype(np.float32)
    gray = rgb.mean(axis=2)
    height, width = gray.shape
    edge = max(2, min(width, height) // 14)
    mask = np.zeros((height, width), dtype=bool)
    mask[:edge, :] = True
    mask[-edge:, :] = True
    mask[:, :edge] = True
    mask[:, -edge:] = True
    gradient = np.zeros_like(gray)
    gradient[:, 1:] = np.maximum(gradient[:, 1:], np.abs(np.diff(gray, axis=1)))
    gradient[1:, :] = np.maximum(gradient[1:, :], np.abs(np.diff(gray, axis=0)))
    border_gradient = gradient[mask]
    edge_density = float(np.mean(border_gradient > 18))
    smoothness = float(np.mean(border_gradient < 12))
    return edge_density, smoothness


def smart_canvas_background(
    image: Image.Image,
    request: ImageEditRequest,
    analysis: BackgroundAnalysis | None = None,
) -> Image.Image:
    if request.remove_background:
        return Image.new("RGBA", (request.width, request.height), (255, 255, 255, 0))
    if request.canvas_background_mode == CanvasBackgroundMode.white:
        return solid_canvas(request)

    rgba = image.convert("RGBA")
    selected = analysis or analyze_background(rgba, request)
    if selected is None or selected.strategy == "white":
        return Image.new("RGBA", (request.width, request.height), (255, 255, 255, 255))
    if selected.strategy == "solid_color" and selected.border_color is not None:
        return Image.new("RGBA", (request.width, request.height), (*selected.border_color, 255))
    if selected.strategy == "edge_extend":
        return edge_extend_canvas(rgba, request.width, request.height)
    return blur_cover_canvas(rgba, request.width, request.height)


def solid_canvas(request: ImageEditRequest) -> Image.Image:
    background = ImageColor.getrgb(request.background)
    return Image.new("RGBA", (request.width, request.height), (*background, 255))


def border_rgba_pixels(image: Image.Image, border: int | None = None) -> np.ndarray:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    edge = border or max(2, min(width, height) // 25)
    samples = [
        np.asarray(rgba.crop((0, 0, width, edge))),
        np.asarray(rgba.crop((0, height - edge, width, height))),
        np.asarray(rgba.crop((0, 0, edge, height))),
        np.asarray(rgba.crop((width - edge, 0, width, height))),
    ]
    return np.concatenate([sample.reshape(-1, 4) for sample in samples], axis=0)


def has_transparent_border(image: Image.Image) -> bool:
    pixels = border_rgba_pixels(image)
    return float(np.mean(pixels[:, 3] < 16)) >= 0.85


def uniform_border_color(image: Image.Image) -> tuple[int, int, int] | None:
    pixels = border_rgba_pixels(image)
    opaque = pixels[pixels[:, 3] > 240][:, :3]
    if len(opaque) < max(10, len(pixels) // 3):
        return None
    std = opaque.astype(np.float32).std(axis=0)
    if float(std.max()) > 8:
        return None
    median = np.median(opaque, axis=0)
    return tuple(int(round(value)) for value in median)


def blur_cover_canvas(image: Image.Image, width: int, height: int) -> Image.Image:
    base = Image.new("RGBA", image.size, (255, 255, 255, 255))
    base.alpha_composite(image.convert("RGBA"))
    cover = ImageOps.fit(base.convert("RGB"), (width, height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    return cover.filter(ImageFilter.GaussianBlur(radius=max(12, min(width, height) // 18))).convert("RGBA")


def edge_extend_canvas(image: Image.Image, width: int, height: int) -> Image.Image:
    base = Image.new("RGBA", image.size, (255, 255, 255, 255))
    base.alpha_composite(image.convert("RGBA"))
    contained = base.convert("RGB")
    contained.thumbnail((width, height), Image.Resampling.LANCZOS)
    x = (width - contained.width) // 2
    y = (height - contained.height) // 2
    color = uniform_border_color(base) or tuple(int(value) for value in np.median(border_rgba_pixels(base)[:, :3], axis=0))
    canvas = Image.new("RGB", (width, height), color)

    if x > 0:
        strip_width = max(1, min(contained.width, max(2, contained.width // 12)))
        left = contained.crop((0, 0, strip_width, contained.height)).resize((x, height), Image.Resampling.BICUBIC)
        right = contained.crop((contained.width - strip_width, 0, contained.width, contained.height)).resize((width - x - contained.width, height), Image.Resampling.BICUBIC)
        canvas.paste(left, (0, 0))
        canvas.paste(right, (x + contained.width, 0))
    if y > 0:
        strip_height = max(1, min(contained.height, max(2, contained.height // 12)))
        top = contained.crop((0, 0, contained.width, strip_height)).resize((width, y), Image.Resampling.BICUBIC)
        bottom = contained.crop((0, contained.height - strip_height, contained.width, contained.height)).resize((width, height - y - contained.height), Image.Resampling.BICUBIC)
        canvas.paste(top, (0, 0))
        canvas.paste(bottom, (0, y + contained.height))

    canvas.paste(contained, (x, y))
    return canvas.convert("RGBA")


def normalize_product_occupancy(image: Image.Image, request: ImageEditRequest) -> Image.Image:
    cropped = crop_to_non_white_content(image, request.white_threshold, padding_px=request.safe_padding)
    if cropped.width <= 0 or cropped.height <= 0:
        return image
    margin_x, margin_y = margin_pixels(request, request.width, request.height)
    content_width = max(1, request.width - margin_x * 2)
    content_height = max(1, request.height - margin_y * 2)
    occupancy = max(0.1, min(float(request.product_target_occupancy), 1.0))
    usable_width = max(1, int(round(content_width * occupancy)))
    usable_height = max(1, int(round(content_height * occupancy)))
    scale = min(usable_width / cropped.width, usable_height / cropped.height)
    next_size = (
        max(1, int(round(cropped.width * scale))),
        max(1, int(round(cropped.height * scale))),
    )
    resized = cropped.resize(next_size, Image.Resampling.LANCZOS)
    background = ImageColor.getrgb(request.background)
    canvas = Image.new("RGBA", (request.width, request.height), (*background, 255))
    if request.remove_background:
        canvas = Image.new("RGBA", (request.width, request.height), (255, 255, 255, 0))
    x = margin_x + (content_width - resized.width) // 2
    y = margin_y + (content_height - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def product_content_mask(image: Image.Image, threshold: int) -> np.ndarray:
    rgba = image.convert("RGBA")
    bg_color = uniform_border_color(rgba)
    if bg_color is None and has_white_background(rgba, threshold):
        bg_color = (255, 255, 255)
    bg_color = bg_color or (255, 255, 255)
    bg = Image.new("RGBA", rgba.size, (*bg_color, 255))
    flattened = Image.alpha_composite(bg, rgba).convert("RGB")
    array = np.asarray(flattened).astype(np.int16)
    alpha = np.asarray(rgba.getchannel("A"))
    bg_array = np.asarray(bg_color, dtype=np.int16)
    distance_from_background = np.abs(array - bg_array).max(axis=2)
    chroma = array.max(axis=2) - array.min(axis=2)
    alpha_content = alpha < 245
    white_bg = bg_color == (255, 255, 255)
    chroma_content = (chroma > 24) if white_bg else np.zeros_like(chroma, dtype=bool)
    return (alpha > 8) & (alpha_content | (distance_from_background > max(12, 255 - threshold)) | chroma_content)


def padded_bbox(
    bbox: tuple[int, int, int, int],
    size: tuple[int, int],
    padding_ratio: float = 0.0,
    padding_px: int = 0,
) -> tuple[int, int, int, int]:
    left, top, right, bottom = bbox
    width, height = size
    pad_x = max(int(round((right - left) * padding_ratio)), int(padding_px))
    pad_y = max(int(round((bottom - top) * padding_ratio)), int(padding_px))
    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(width, right + pad_x),
        min(height, bottom + pad_y),
    )


def crop_to_non_white_content(
    image: Image.Image,
    threshold: int,
    padding_ratio: float = 0.0,
    padding_px: int = 0,
) -> Image.Image:
    rgba = image.convert("RGBA")
    mask = product_content_mask(rgba, threshold)
    if not np.any(mask):
        return image
    ys, xs = np.where(mask)
    bbox = (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1)
    if bbox is None:
        return image
    if padding_ratio > 0 or padding_px > 0:
        bbox = padded_bbox(bbox, rgba.size, padding_ratio=padding_ratio, padding_px=padding_px)
    return image.crop(bbox)


def has_white_background(image: Image.Image, threshold: int) -> bool:
    rgb = image.convert("RGB")
    width, height = rgb.size
    border = max(2, min(width, height) // 25)
    samples = []
    samples.append(np.asarray(rgb.crop((0, 0, width, border))))
    samples.append(np.asarray(rgb.crop((0, height - border, width, height))))
    samples.append(np.asarray(rgb.crop((0, 0, border, height))))
    samples.append(np.asarray(rgb.crop((width - border, 0, width, height))))
    border_pixels = np.concatenate([sample.reshape(-1, 3) for sample in samples], axis=0)
    white_pixels = np.all(border_pixels >= threshold, axis=1)
    return float(np.mean(white_pixels)) >= 0.92


def contains_human_parts(image: Image.Image) -> bool:
    try:
        import mediapipe as mp
    except Exception as exc:
        raise RuntimeError("MediaPipe is required for human-part filtering") from exc

    rgb = image.convert("RGB")
    rgb.thumbnail((512, 512), Image.Resampling.LANCZOS)
    frame = np.asarray(rgb)

    with mp.solutions.face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.45) as face_detection:
        result = face_detection.process(frame)
        if result.detections:
            return True

    with mp.solutions.hands.Hands(static_image_mode=True, max_num_hands=4, min_detection_confidence=0.45) as hands:
        result = hands.process(frame)
        if result.multi_hand_landmarks:
            return True

    with mp.solutions.pose.Pose(static_image_mode=True, model_complexity=0, min_detection_confidence=0.45) as pose:
        result = pose.process(frame)
        if result.pose_landmarks:
            return True

    return False


def resize_with_dimension_logic(image: Image.Image, request: ImageEditRequest) -> Image.Image:
    target_width = request.width
    target_height = request.height
    background = ImageColor.getrgb(request.background)
    margin_x, margin_y = margin_pixels(request, target_width, target_height)
    content_width = max(1, target_width - margin_x * 2)
    content_height = max(1, target_height - margin_y * 2)

    if request.fit_mode == FitMode.stretch:
        resized = image.resize((content_width, content_height), Image.Resampling.LANCZOS)
    elif request.fit_mode == FitMode.cover:
        resized = ImageOps.fit(image, (content_width, content_height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    else:
        resized = image.copy()
        resized.thumbnail((content_width, content_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (target_width, target_height), (*background, 255))
    x = margin_x + (content_width - resized.width) // 2
    y = margin_y + (content_height - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


def render_manual_transform(image: Image.Image, request: ImageEditRequest) -> Image.Image:
    source = image.convert("RGBA")
    left = int(round(source.width * request.layer_crop_left))
    top = int(round(source.height * request.layer_crop_top))
    right = source.width - int(round(source.width * request.layer_crop_right))
    bottom = source.height - int(round(source.height * request.layer_crop_bottom))
    if right <= left or bottom <= top:
        cropped = source
    else:
        cropped = source.crop((left, top, right, bottom))

    scale_x = request.layer_scale_x if request.layer_scale_x is not None else request.layer_scale
    scale_y = request.layer_scale_y if request.layer_scale_y is not None else request.layer_scale
    next_size = (
        max(1, int(round(cropped.width * scale_x))),
        max(1, int(round(cropped.height * scale_y))),
    )
    resized = cropped.resize(next_size, Image.Resampling.LANCZOS)
    canvas = smart_canvas_background(source, request, analyze_background(source, request))
    x = int(round(request.layer_x if request.layer_x is not None else (request.width - resized.width) / 2))
    y = int(round(request.layer_y if request.layer_y is not None else (request.height - resized.height) / 2))
    canvas.alpha_composite(resized, (x, y))
    return canvas


def margin_pixels(request: ImageEditRequest, width: int, height: int) -> tuple[int, int]:
    if request.margin_mode == MarginMode.pixels:
        value = int(round(request.margin))
        return max(0, min(value, width // 2 - 1)), max(0, min(value, height // 2 - 1))
    margin_x = int(round(width * request.margin / 100))
    margin_y = int(round(height * request.margin / 100))
    return max(0, min(margin_x, width // 2 - 1)), max(0, min(margin_y, height // 2 - 1))


def save_image(image: Image.Image, output_path: Path, request: ImageEditRequest) -> None:
    output_format = normalized_output_format(request.output_format)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if output_format in {"jpg", "jpeg"}:
        rgb = Image.new("RGB", image.size, ImageColor.getrgb(request.background))
        rgb.paste(image.convert("RGBA"), mask=image.convert("RGBA").getchannel("A"))
        max_bytes = int(request.max_file_size_mb * 1024 * 1024) if request.max_file_size_mb > 0 else 0
        quality = request.output_quality
        while True:
            buffer = BytesIO()
            rgb.save(
                buffer,
                format="JPEG",
                quality=quality,
                subsampling=0,
                optimize=True,
                progressive=True,
                dpi=(request.dpi, request.dpi),
            )
            if not max_bytes or buffer.tell() <= max_bytes or quality <= 40:
                output_path.write_bytes(buffer.getvalue())
                break
            quality = max(40, quality - 5)
    else:
        image.save(output_path, format=output_format.upper(), optimize=True, dpi=(request.dpi, request.dpi))


def normalized_output_format(value: str) -> str:
    text = value.lower().strip().lstrip(".")
    if text == "jpeg":
        return "jpg"
    if text not in {"jpg", "png", "webp", "tiff"}:
        return "jpg"
    return text


def build_output_plan(
    image_input: ImageInput,
    request: ImageEditRequest,
    global_index: int,
    ean_counts: dict[str, int],
    used_paths: set[str],
) -> ImageOutputPlan:
    ean = extract_ean(image_input.relative_path, image_input.source_path, image_input.root_ean)
    ean_counts[ean] = ean_counts.get(ean, 0) + 1
    ean_index = ean_counts[ean]
    output_name = build_output_filename(image_input.source_path, request, global_index, ean_index, ean, image_input.relative_path)
    output_folder = output_folder_for_input(image_input, ean, request)
    output_relative_path = output_folder / output_name if output_folder else Path(output_name)
    output_relative_path = unique_output_relative_path(output_relative_path, used_paths)
    return ImageOutputPlan(ean=ean, ean_index=ean_index, output_name=output_relative_path.name, output_relative_path=output_relative_path)


def output_folder_for_input(image_input: ImageInput, ean: str, request: ImageEditRequest) -> Path:
    if request.preserve_folder_structure and image_input.relative_path.parent != Path("."):
        return safe_relative_path(image_input.relative_path.parent)
    if image_input.root_ean:
        return Path(safe_filename(image_input.root_ean))
    return Path()


def build_output_filename(
    source_path: Path,
    request: ImageEditRequest,
    global_index: int,
    ean_index: int,
    ean: str,
    relative_path: Path | None = None,
) -> str:
    extension = normalized_output_format(request.output_format)
    relative_path = relative_path or Path(source_path.name)
    role_tokens = parse_image_role_tokens(source_path.stem)
    tokens = {
        "ean": ean,
        "original_stem": source_path.stem,
        "original_name": source_path.name,
        "relative_stem": safe_filename(relative_path.with_suffix("").as_posix().replace("/", "_")),
        "parent": safe_filename(relative_path.parent.as_posix().replace("/", "_")) if str(relative_path.parent) != "." else "",
        "index": ean_index,
        "global_index": global_index,
        "width": str(request.width),
        "height": str(request.height),
        "fit_mode": request.fit_mode.value,
        "dpi": str(request.dpi),
        **role_tokens,
    }
    stem = render_naming_template(request.naming_rule or "{ean}_{index}", tokens)
    stem = safe_filename(Path(stem).stem or source_path.stem)
    return f"{stem}.{extension}"


def parse_image_role_tokens(stem: str) -> dict[str, object]:
    match = re.search(
        r"(?i)(?:^|[_\-\s])(?P<role>ls|lifestyle|front|back)[_\-\s]*\(?(?P<index>\d+)?\)?$",
        stem.strip(),
    )
    if not match:
        return {"role": "", "role_label": "", "role_index": "", "role_suffix": ""}

    role = match.group("role").lower()
    canonical_role = "ls" if role == "lifestyle" else role
    role_label = "lifestyle" if canonical_role == "ls" else canonical_role
    role_index_text = match.group("index") or ""
    role_index: object = int(role_index_text) if role_index_text else ""
    role_suffix = f"{canonical_role}{role_index_text}" if role_index_text else canonical_role
    return {
        "role": canonical_role,
        "role_label": role_label,
        "role_index": role_index,
        "role_suffix": role_suffix,
    }


def render_naming_template(template: str, tokens: dict[str, object]) -> str:
    def replace(match: re.Match[str]) -> str:
        key = match.group("key")
        fmt = match.group("fmt")
        value = tokens.get(key, "")
        if fmt:
            try:
                return ("{0:" + fmt + "}").format(value)
            except (TypeError, ValueError):
                return str(value)
        return str(value)

    return re.sub(r"\{(?P<key>[A-Za-z_][A-Za-z0-9_]*)(?::(?P<fmt>[^}]+))?\}", replace, template)


def unique_output_relative_path(relative_path: Path, used_paths: set[str]) -> Path:
    candidate = relative_path
    stem = candidate.stem
    suffix = candidate.suffix
    counter = 2
    while candidate.as_posix().lower() in used_paths:
        candidate = candidate.with_name(f"{stem}_{counter:02d}{suffix}")
        counter += 1
    used_paths.add(candidate.as_posix().lower())
    return candidate


def extract_ean(relative_path: Path, source_path: Path, root_ean: str = "") -> str:
    parts = relative_path.with_suffix("").parts
    for part in reversed(parts[:-1]):
        value = first_ean_candidate(part)
        if value:
            return value
    if root_ean:
        return root_ean
    value = first_ean_candidate(source_path.stem)
    if value:
        return value
    return safe_filename(relative_path.stem or source_path.stem)


def first_ean_candidate(value: str) -> str:
    matches = re.findall(r"(?<!\d)(\d{8,14})(?!\d)", value)
    return matches[0] if matches else ""


def safe_relative_path(path: Path) -> Path:
    safe_parts = [safe_filename(part) for part in path.parts if part not in {"", ".", ".."}]
    return Path(*safe_parts) if safe_parts else Path()


def safe_filename(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._ -]+", "_", value).strip(" .")
    return cleaned or "image"


def write_manifest(records: Iterable[ProcessedImage], manifest_path: Path) -> None:
    rows = [record.model_dump(mode="json") for record in records]
    fieldnames = [
        "original_filename",
        "ean",
        "relative_path",
        "source_path",
        "output_filename",
        "output_path",
        "status",
        "width",
        "height",
        "dpi",
        "background_classification",
        "background_strategy",
        "background_confidence",
        "message",
    ]
    with manifest_path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow({field: row.get(field, "") for field in fieldnames})


def write_zip(output_zip: Path, image_dir: Path, manifest_path: Path) -> None:
    if output_zip.exists():
        output_zip.unlink()
    with zipfile.ZipFile(output_zip, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.write(manifest_path, "manifest.csv")
        for image_path in sorted(image_dir.rglob("*")):
            if image_path.is_file():
                archive.write(image_path, f"images/{image_path.relative_to(image_dir).as_posix()}")


def upscale_warnings(request: ImageEditRequest) -> list[str]:
    if request.upscale_mode in {"none", ""}:
        return []
    if request.upscale_mode in {"real_esrgan", "real_esrgan_ncnn"} and realesrgan_executable() is not None:
        return []
    return [f"AI upscale mode '{request.upscale_mode}' is not available."]


def non_ai_large_upscale_warnings(inputs: list[ImageInput], request: ImageEditRequest) -> list[str]:
    if request.upscale_mode not in {"none", ""}:
        return []
    large_count = 0
    for image_input in inputs:
        try:
            with Image.open(image_input.source_path) as image:
                image = ImageOps.exif_transpose(image)
                scale = fit_scale_ratio(image, request)
        except Exception:
            continue
        if scale > 1.5:
            large_count += 1
    if large_count == 0:
        return []
    return [
        f"{large_count} image(s) require non-AI upscale above 1.5x; text/logo/barcode are protected, but output may still look soft."
    ]


def optional_canvas_warnings(request: ImageEditRequest) -> list[str]:
    warnings: list[str] = []
    if request.canvas_background_mode == CanvasBackgroundMode.ai_expand or request.ai_canvas_expand_enabled:
        warnings.append("AI Canvas Expand is optional; if ComfyUI is not configured, processing falls back to Smart Auto canvas handling.")
    if request.background_removal_mode == BackgroundRemovalMode.sam2:
        warnings.append("SAM2 background mode is a placeholder fallback unless a dedicated SAM2 runtime is installed.")
    return warnings


def effective_worker_count(request: ImageEditRequest) -> int:
    cpu_count = os.cpu_count() or 1
    if request.upscale_mode not in {"none", ""}:
        return max(1, min(request.max_workers, cpu_count, 2))
    return max(1, min(request.max_workers, cpu_count, 16))
