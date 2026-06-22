from __future__ import annotations

import shutil
import uuid
import json
import zipfile
import os
import hashlib
import mimetypes
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any

from fastapi import BackgroundTasks, Body, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

from services.image_worker.config import AI_UPSCALE_OPTIONS, IMAGE_DIMENSION_PRESETS
from services.image_worker.ai_tools import ai_tool_status
from services.image_worker.models import BackgroundRemovalMode, CanvasBackgroundMode, ClarityEnhanceMode, FitMode, ImageEditRequest, MarginMode, OutputMode, StandardUpscaleMethod
from services.image_worker.processor import normalized_output_format, process_one_image, run_image_edit

from .job_store import JobStore
from .models import JobRecord, JobStatus
from services.data_quality_control.change_requests import ChangeRequestStore
from services.data_quality_control.history import AuditHistoryStore
from services.data_quality_control.models import AuditOptions, RuleProfilePayload
from services.data_quality_control.report_reader import read_report_workbook
from services.data_quality_control.rules import load_rule_profile, save_rule_profile
from .service import run_data_maintenance
from .settings import get_settings
from .master_data_generator import (
    generate_missing_data,
    generate_missing_data_status,
    get_brand_products,
    load_state,
    read_dqc_brands,
    read_master_data,
    save_state,
)

app = FastAPI(title="GRIMOIRE", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:7788", "http://localhost:7788",
        "http://127.0.0.1:7790", "http://localhost:7790",
        "http://127.0.0.1:5173", "http://localhost:5173",
        "https://grimoire.local", "http://grimoire.local",
        "null",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
settings = get_settings()
job_store = JobStore()
audit_history_store = AuditHistoryStore()
change_request_store = ChangeRequestStore()

MASTER_DATA_DIR = Path(os.environ.get("GRIMOIRE_DATA", Path.home() / ".grimoire")) / "master_data_uploads"
MASTER_DATA_DIR.mkdir(parents=True, exist_ok=True)
MASTER_DATA_STATE_DIR = MASTER_DATA_DIR / ".state"
MASTER_DATA_STATE_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_CHECK_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}
IMAGE_CHECK_THUMB_DIR = Path(os.environ.get("GRIMOIRE_THUMB_CACHE", Path.home() / "AppData" / "Local" / "Grimoire" / "ImageCheckThumbs"))
IMAGE_CHECK_THUMB_MAX = 420


class LocalFolderPickerPayload(BaseModel):
    title: str = "Select folder"
    initial_path: str | None = None


class RevealPathPayload(BaseModel):
    path: str = Field(min_length=1)


class ImagesCheckScanPayload(BaseModel):
    folder: str = Field(min_length=1)


class ImagesCheckDeletePayload(BaseModel):
    root: str = Field(min_length=1)
    paths: list[str] = Field(default_factory=list)


class FileSearchPayload(BaseModel):
    query: str = Field(min_length=1)
    roots: list[str] = Field(default_factory=list)
    extensions: list[str] | None = None
    limit: int = Field(default=80, ge=1, le=300)


class ImageEditFolderJobPayload(BaseModel):
    input_folder_path: str = Field(min_length=1)
    output_folder_path: str | None = None
    preset: str | None = None
    layout_preset: str = "manual"
    width: int = Field(default=1000, ge=1, le=12000)
    height: int = Field(default=1000, ge=1, le=12000)
    fit_mode: FitMode = FitMode.contain
    margin: float = Field(default=0, ge=0, le=6000)
    margin_mode: MarginMode = MarginMode.percent
    dpi: int = Field(default=72, ge=1, le=2400)
    canvas_background_mode: CanvasBackgroundMode = CanvasBackgroundMode.white
    background_removal_mode: BackgroundRemovalMode = BackgroundRemovalMode.border_white
    output_format: str = "jpg"
    output_quality: int = Field(default=95, ge=1, le=100)
    max_file_size_mb: float = Field(default=0, ge=0, le=100)
    naming_rule: str = "{ean}_{index}"
    crop_to_content: bool = True
    remove_white_space_around_product: bool = False
    product_fill_enabled: bool = False
    product_fill_ratio: int = Field(default=88, ge=10, le=100)
    product_safe_padding: int = Field(default=8, ge=0, le=1000)
    require_white_background: bool = False
    reject_human_parts: bool = False
    auto_product_fill: bool = False
    fill_ratio: float = Field(default=0.88, ge=0.1, le=1.0)
    safe_padding: int = Field(default=0, ge=0, le=1000)
    normalize_product_size: bool = False
    product_target_occupancy: float = Field(default=0.88, ge=0.1, le=1.0)
    remove_shadow: bool = False
    remove_background: bool = False
    manual_transform_enabled: bool = False
    layer_x: float | None = None
    layer_y: float | None = None
    layer_scale: float = Field(default=1.0, ge=0.01, le=20)
    layer_scale_x: float | None = Field(default=None, ge=0.01, le=20)
    layer_scale_y: float | None = Field(default=None, ge=0.01, le=20)
    layer_crop_left: float = Field(default=0, ge=0, le=1)
    layer_crop_top: float = Field(default=0, ge=0, le=1)
    layer_crop_right: float = Field(default=0, ge=0, le=1)
    layer_crop_bottom: float = Field(default=0, ge=0, le=1)
    auto_compose_style: str = "balanced"
    ai_canvas_expand_enabled: bool = False
    ai_canvas_expand_provider: str = "comfyui"
    ai_canvas_expand_prompt: str = "clean commercial product photo background, consistent lighting"
    upscale_mode: str = "none"
    standard_upscale_method: StandardUpscaleMethod = StandardUpscaleMethod.pillow_lanczos
    clarity_enhance: ClarityEnhanceMode = ClarityEnhanceMode.auto
    upscale_scale: int = Field(default=2, ge=2, le=4)
    upscale_model: str = "realesrgan-x4plus"
    upscale_cpu_fallback: bool = True
    max_workers: int = Field(default=2, ge=1, le=16)
    include_subfolders: bool = True
    preserve_folder_structure: bool = True
    output_mode: OutputMode = OutputMode.zip


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {
        "status": "ok",
        "service": "aio-backend",
        "database_ready": settings.database_path.exists(),
        "storage_ready": settings.resolve_storage_path(settings.outputs_dir).exists(),
    }


@app.post("/api/local/select-folder")
def select_local_folder(payload: LocalFolderPickerPayload = Body(default_factory=LocalFolderPickerPayload)) -> dict[str, str | bool]:
    try:
        selected_path = open_native_folder_picker(payload.title, payload.initial_path)
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Native folder picker is unavailable: {exc}") from exc
    return {"selected": bool(selected_path), "path": selected_path}


@app.post("/api/local/reveal")
def reveal_local_path(payload: RevealPathPayload) -> dict[str, object]:
    target = Path(payload.path).expanduser()
    if not target.exists():
        raise HTTPException(status_code=404, detail="Path does not exist")
    try:
        if os.name == "nt":
            import subprocess

            if target.is_file():
                subprocess.Popen(["explorer.exe", f"/select,{target}"])
            else:
                subprocess.Popen(["explorer.exe", str(target)])
        else:
            raise HTTPException(status_code=400, detail="Reveal is only supported on Windows")
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Could not reveal path: {exc}") from exc
    return {"ok": True, "path": str(target)}


@app.post("/api/images-check/scan")
def scan_images_check(payload: ImagesCheckScanPayload) -> dict[str, object]:
    root = Path(payload.folder).expanduser().resolve()
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="Folder does not exist")
    images = []
    for path in sorted(root.rglob("*"), key=lambda p: str(p).lower()):
        if not path.is_file() or path.suffix.lower() not in IMAGE_CHECK_SUFFIXES:
            continue
        try:
            stat = path.stat()
            width, height = read_image_size(path)
            images.append({
                "id": str(uuid.uuid5(uuid.NAMESPACE_URL, str(path))),
                "name": path.name,
                "path": str(path),
                "relativePath": path.relative_to(root).as_posix(),
                "extension": path.suffix.lower(),
                "sizeBytes": stat.st_size,
                "width": width,
                "height": height,
                "modifiedAt": datetime.fromtimestamp(stat.st_mtime).isoformat(timespec="seconds"),
            })
        except Exception:
            continue
    return {"root": str(root), "count": len(images), "total": len(images), "images": images}


@app.get("/api/images-check/file")
def get_images_check_file(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_CHECK_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(target, media_type=mimetypes.guess_type(target.name)[0] or "application/octet-stream")


@app.get("/api/images-check/thumb")
def get_images_check_thumb(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_CHECK_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    thumb = image_check_thumbnail_path(target)
    return FileResponse(thumb, media_type="image/jpeg")


@app.post("/api/images-check/delete")
def delete_images_check_files(payload: ImagesCheckDeletePayload) -> dict[str, object]:
    root = Path(payload.root).expanduser().resolve()
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="Root folder does not exist")
    deleted: list[str] = []
    errors: list[dict[str, str]] = []
    for raw_path in payload.paths:
        try:
            target = Path(raw_path).expanduser().resolve()
            target.relative_to(root)
            if not target.is_file() or target.suffix.lower() not in IMAGE_CHECK_SUFFIXES:
                errors.append({"path": raw_path, "error": "not an image file"})
                continue
            target.unlink()
            deleted.append(str(target))
        except ValueError:
            errors.append({"path": raw_path, "error": "outside scan root"})
        except Exception as exc:
            errors.append({"path": raw_path, "error": str(exc)})
    return {"deleted": deleted, "deletedCount": len(deleted), "errors": errors}


@app.post("/api/search/files")
def search_files(payload: FileSearchPayload) -> dict[str, object]:
    query = payload.query.strip().lower()
    if not query:
        return {"results": []}
    allowed_ext = {ext.lower() if ext.startswith(".") else f".{ext.lower()}" for ext in (payload.extensions or [])}
    results: list[dict[str, object]] = []
    seen: set[str] = set()
    for raw_root in payload.roots:
        if len(results) >= payload.limit:
            break
        if not raw_root:
            continue
        root = Path(raw_root).expanduser()
        if root.is_file():
            root = root.parent
        try:
            root = root.resolve()
        except Exception:
            continue
        if not root.is_dir():
            continue
        for path in sorted(root.rglob("*"), key=lambda p: str(p).lower()):
            if len(results) >= payload.limit:
                break
            if not path.is_file():
                continue
            if allowed_ext and path.suffix.lower() not in allowed_ext:
                continue
            haystack = f"{path.name} {path.stem} {path.parent.name} {path}".lower()
            if query not in haystack:
                continue
            key = str(path.resolve()).lower()
            if key in seen:
                continue
            seen.add(key)
            try:
                stat = path.stat()
                width, height = read_image_size(path) if path.suffix.lower() in IMAGE_CHECK_SUFFIXES else (0, 0)
                results.append({
                    "name": path.name,
                    "path": str(path),
                    "folder": str(path.parent),
                    "relativePath": path.relative_to(root).as_posix(),
                    "root": str(root),
                    "extension": path.suffix.lower(),
                    "sizeBytes": stat.st_size,
                    "width": width,
                    "height": height,
                })
            except Exception:
                continue
    return {"results": results}


@app.get("/api/image-edit/presets")
def get_image_edit_presets() -> dict[str, object]:
    return {
        "dimension_presets": IMAGE_DIMENSION_PRESETS,
        "fit_modes": [mode.value for mode in FitMode],
        "margin_modes": [mode.value for mode in MarginMode],
        "canvas_background_modes": [mode.value for mode in CanvasBackgroundMode],
        "background_removal_modes": [mode.value for mode in BackgroundRemovalMode],
        "layout_presets": ["manual", "canva_fill", "object_aware_canvas", "canva_manual", "auto_compose", "ai_canvas_expand"],
        "ai_upscale_options": AI_UPSCALE_OPTIONS,
        "ai_tool_status": ai_tool_status(),
        "comfyui_status": comfyui_status(),
    }


@app.get("/api/image-edit/comfyui-status")
def get_comfyui_status() -> dict[str, object]:
    return comfyui_status()


def comfyui_status() -> dict[str, object]:
    url = os.environ.get("AIO_COMFYUI_URL", "http://127.0.0.1:8188").rstrip("/")
    workflow = os.environ.get("AIO_COMFYUI_WORKFLOW", "")
    payload: dict[str, object] = {
        "url": url,
        "reachable": False,
        "workflow_configured": bool(workflow),
        "workflow_path": workflow,
        "optional": True,
    }
    try:
        with urllib.request.urlopen(f"{url}/system_stats", timeout=1.5) as response:
            payload["reachable"] = response.status < 500
    except Exception:
        payload["reachable"] = False
    return payload


@app.get("/api/rules")
def get_rules() -> dict[str, object]:
    rules = load_rule_profile()
    return {
        "included_statuses": sorted(rules.included_statuses),
        "priority_fields": rules.priority_fields,
        "fields_to_audit": rules.fields_to_audit,
    }


@app.get("/api/data-quality-control/rule-profile")
def get_dqc_rule_profile() -> dict[str, object]:
    rules = load_rule_profile()
    return {
        "included_statuses": sorted(rules.included_statuses),
        "priority_fields": rules.priority_fields,
        "fields_to_audit": rules.fields_to_audit,
    }


@app.put("/api/data-quality-control/rule-profile")
def update_dqc_rule_profile(payload: RuleProfilePayload) -> dict[str, object]:
    rules = save_rule_profile(payload.model_dump())
    return {
        "included_statuses": sorted(rules.included_statuses),
        "priority_fields": rules.priority_fields,
        "fields_to_audit": rules.fields_to_audit,
    }


@app.get("/api/data-quality-control/history")
def list_dqc_history(limit: int = 50) -> list[dict[str, object]]:
    return audit_history_store.list_runs(limit=limit)


@app.post("/api/master-data/upload")
async def upload_master_data_files(
    dqc_file: UploadFile = File(...),
    master_file: UploadFile = File(...),
) -> dict[str, object]:
    dqc_path = MASTER_DATA_DIR / "dqc_report.xlsx"
    master_path = MASTER_DATA_DIR / "master_data.xlsx"
    for dest, upload in [(dqc_path, dqc_file), (master_path, master_file)]:
        content = await upload.read()
        dest.write_bytes(content)

    brands = read_dqc_brands(dqc_path)
    master_df = read_master_data(master_path)
    master_brands = sorted(master_df["OBJECT"].dropna().unique().tolist()) if "OBJECT" in master_df.columns else []

    save_state(MASTER_DATA_STATE_DIR, {
        "dqc_file": dqc_file.filename,
        "master_file": master_file.filename,
        "brands": brands,
        "master_brands": master_brands,
        "selected_brand": None,
    })
    return {
        "ok": True,
        "dqc_file": dqc_file.filename,
        "master_file": master_file.filename,
        "brands": brands,
        "master_brands": master_brands,
    }


@app.get("/api/master-data/state")
def get_master_data_state() -> dict[str, object]:
    state = load_state(MASTER_DATA_STATE_DIR)
    if state is None:
        return {"ok": True, "loaded": False}
    return {"ok": True, "loaded": True, **state}


@app.post("/api/master-data/select-brand")
def select_master_data_brand(payload: dict = Body(...)) -> dict[str, object]:
    brand = payload.get("brand", "")
    if not brand:
        raise HTTPException(status_code=400, detail="brand is required")
    state = load_state(MASTER_DATA_STATE_DIR)
    if state is None:
        raise HTTPException(status_code=400, detail="No files uploaded yet")
    state["selected_brand"] = brand
    save_state(MASTER_DATA_STATE_DIR, state)

    master_path = MASTER_DATA_DIR / "master_data.xlsx"
    master_df = read_master_data(master_path)
    products = get_brand_products(master_df, brand)
    return {"ok": True, "brand": brand, "product_count": len(products)}


@app.post("/api/master-data/generate")
def generate_master_missing_data(payload: dict = Body(...)) -> FileResponse:
    brand = payload.get("brand", "")
    if not brand:
        raise HTTPException(status_code=400, detail="brand is required")
    master_path = MASTER_DATA_DIR / "master_data.xlsx"
    if not master_path.exists():
        raise HTTPException(status_code=400, detail="Master data file not uploaded")
    master_df = read_master_data(master_path)
    products = get_brand_products(master_df, brand)
    if products.empty:
        raise HTTPException(status_code=404, detail=f"No products found for brand: {brand}")
    output_dir = MASTER_DATA_DIR / "output"
    output_dir.mkdir(parents=True, exist_ok=True)
    file_path = generate_missing_data(products, brand, output_dir)
    return FileResponse(
        file_path,
        filename=file_path.name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@app.post("/api/master-data/generate-status")
def generate_master_missing_data_status(payload: dict = Body(...)) -> FileResponse:
    brand = payload.get("brand", "")
    if not brand:
        raise HTTPException(status_code=400, detail="brand is required")
    master_path = MASTER_DATA_DIR / "master_data.xlsx"
    if not master_path.exists():
        raise HTTPException(status_code=400, detail="Master data file not uploaded")
    master_df = read_master_data(master_path)
    products = get_brand_products(master_df, brand)
    if products.empty:
        raise HTTPException(status_code=404, detail=f"No products found for brand: {brand}")
    output_dir = MASTER_DATA_DIR / "output"
    output_dir.mkdir(parents=True, exist_ok=True)
    file_path = generate_missing_data_status(products, brand, output_dir)
    return FileResponse(
        file_path,
        filename=file_path.name,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@app.get("/api/jobs", response_model=list[JobRecord])
def list_jobs(limit: int = 50) -> list[JobRecord]:
    return job_store.list_jobs(limit=limit)


@app.get("/api/jobs/{job_id}", response_model=JobRecord)
def get_job(job_id: str) -> JobRecord:
    try:
        return job_store.get_job(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc


@app.get("/api/jobs/{job_id}/items/{item_id}/thumbnail")
def get_image_edit_item_thumbnail(job_id: str, item_id: str, kind: str = "auto") -> FileResponse:
    try:
        job = job_store.get_job(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc
    summary = job.summary or {}
    item = next((entry for entry in summary.get("items", []) if entry.get("item_id") == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Job item not found")

    candidates: list[object] = []
    if kind in {"auto", "output"}:
        candidates.append(item.get("output_path"))
    if kind in {"auto", "source"}:
        candidates.append(item.get("source_path"))
    image_suffixes = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}
    for candidate in candidates:
        if not candidate:
            continue
        path = Path(str(candidate))
        if path.exists() and path.is_file() and path.suffix.lower() in image_suffixes:
            return FileResponse(path, filename=path.name, media_type=media_type_for_output(path))
    raise HTTPException(status_code=404, detail="Thumbnail source is not available")


@app.get("/api/jobs/{job_id}/report-data")
def get_job_report_data(job_id: str, max_rows_per_sheet: int = 5000) -> dict[str, object]:
    try:
        job = job_store.get_job(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc
    if job.status != JobStatus.completed or not job.output_path:
        raise HTTPException(status_code=409, detail="Job output is not ready")
    output_path = Path(job.output_path)
    if not output_path.exists() or output_path.suffix.lower() != ".xlsx":
        raise HTTPException(status_code=404, detail="Excel report output not found")
    return read_report_workbook(output_path, max_rows_per_sheet=max_rows_per_sheet)


@app.post("/api/data-maintenance/jobs", response_model=JobRecord)
def create_data_maintenance_job(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    chunk_size: int = Form(default=5000),
    max_workers: int = Form(default=2),
    keep_detail_rows: bool = Form(default=True),
    selected_statuses: str = Form(default=""),
) -> JobRecord:
    return create_data_quality_control_job(background_tasks, file, chunk_size, max_workers, keep_detail_rows, selected_statuses)


@app.post("/api/data-quality-control/jobs", response_model=JobRecord)
def create_data_quality_control_job(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    chunk_size: int = Form(default=5000),
    max_workers: int = Form(default=2),
    keep_detail_rows: bool = Form(default=True),
    selected_statuses: str = Form(default=""),
) -> JobRecord:
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in {".xlsx", ".xlsm", ".csv"}:
        raise HTTPException(status_code=400, detail="Only .xlsx, .xlsm, and .csv files are supported")

    job_id = str(uuid.uuid4())
    upload_dir = settings.resolve_storage_path(settings.uploads_dir) / job_id
    output_dir = settings.resolve_storage_path(settings.outputs_dir) / job_id
    upload_dir.mkdir(parents=True, exist_ok=True)
    output_dir.mkdir(parents=True, exist_ok=True)

    safe_name = safe_filename(file.filename or f"master_data{suffix}")
    input_path = upload_dir / safe_name
    with input_path.open("wb") as handle:
        shutil.copyfileobj(file.file, handle)

    job = job_store.create_job(
        job_id=job_id,
        job_type="data_quality_control",
        original_filename=file.filename,
        input_path=str(input_path),
    )

    options = AuditOptions(
        chunk_size=chunk_size,
        max_workers=max_workers,
        keep_detail_rows=keep_detail_rows,
        selected_statuses=parse_selected_statuses(selected_statuses),
    )
    output_path = output_dir / f"data_quality_control_report_{Path(safe_name).stem}.xlsx"
    job = job_store.update_job(job_id, status=JobStatus.running)
    background_tasks.add_task(execute_data_quality_control_job, job_id, input_path, output_path, options)
    return job


@app.post("/api/image-edit/jobs", response_model=JobRecord)
def create_image_edit_job(
    background_tasks: BackgroundTasks,
    files: list[UploadFile] = File(...),
    preset: str | None = Form(default=None),
    layout_preset: str = Form(default="manual"),
    width: int = Form(default=1000),
    height: int = Form(default=1000),
    fit_mode: FitMode = Form(default=FitMode.contain),
    margin: float = Form(default=0),
    margin_mode: MarginMode = Form(default=MarginMode.percent),
    dpi: int = Form(default=72),
    canvas_background_mode: CanvasBackgroundMode = Form(default=CanvasBackgroundMode.white),
    background_removal_mode: BackgroundRemovalMode = Form(default=BackgroundRemovalMode.border_white),
    output_format: str = Form(default="jpg"),
    output_quality: int = Form(default=95),
    max_file_size_mb: float = Form(default=0),
    naming_rule: str = Form(default="{ean}_{index}"),
    crop_to_content: bool = Form(default=True),
    remove_white_space_around_product: bool = Form(default=False),
    product_fill_enabled: bool = Form(default=False),
    product_fill_ratio: int = Form(default=88),
    product_safe_padding: int = Form(default=8),
    require_white_background: bool = Form(default=False),
    reject_human_parts: bool = Form(default=False),
    auto_product_fill: bool = Form(default=False),
    fill_ratio: float = Form(default=0.88),
    safe_padding: int = Form(default=0),
    normalize_product_size: bool = Form(default=False),
    product_target_occupancy: float = Form(default=0.88),
    remove_shadow: bool = Form(default=False),
    remove_background: bool = Form(default=False),
    manual_transform_enabled: bool = Form(default=False),
    layer_x: float | None = Form(default=None),
    layer_y: float | None = Form(default=None),
    layer_scale: float = Form(default=1.0),
    layer_scale_x: float | None = Form(default=None),
    layer_scale_y: float | None = Form(default=None),
    layer_crop_left: float = Form(default=0),
    layer_crop_top: float = Form(default=0),
    layer_crop_right: float = Form(default=0),
    layer_crop_bottom: float = Form(default=0),
    auto_compose_style: str = Form(default="balanced"),
    ai_canvas_expand_enabled: bool = Form(default=False),
    ai_canvas_expand_provider: str = Form(default="comfyui"),
    ai_canvas_expand_prompt: str = Form(default="clean commercial product photo background, consistent lighting"),
    upscale_mode: str = Form(default="none"),
    standard_upscale_method: StandardUpscaleMethod = Form(default=StandardUpscaleMethod.pillow_lanczos),
    clarity_enhance: ClarityEnhanceMode = Form(default=ClarityEnhanceMode.auto),
    upscale_scale: int = Form(default=2),
    upscale_model: str = Form(default="realesrgan-x4plus"),
    upscale_cpu_fallback: bool = Form(default=True),
    max_workers: int = Form(default=2),
    include_subfolders: bool = Form(default=True),
    preserve_folder_structure: bool = Form(default=True),
    output_mode: OutputMode = Form(default=OutputMode.zip),
) -> JobRecord:
    if not files:
        raise HTTPException(status_code=400, detail="At least one image or zip file is required")

    if preset:
        dimensions = IMAGE_DIMENSION_PRESETS.get(preset)
        if dimensions is None:
            raise HTTPException(status_code=400, detail=f"Unknown image preset: {preset}")
        width = int(dimensions["width"])
        height = int(dimensions["height"])

    job_id = str(uuid.uuid4())
    upload_dir = settings.resolve_storage_path(settings.uploads_dir) / job_id
    output_dir = settings.resolve_storage_path(settings.outputs_dir) / job_id
    upload_dir.mkdir(parents=True, exist_ok=True)
    output_dir.mkdir(parents=True, exist_ok=True)

    input_paths: list[Path] = []
    original_names: list[str] = []
    for upload in files:
        suffix = Path(upload.filename or "").suffix.lower()
        if suffix not in {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif", ".zip"}:
            raise HTTPException(status_code=400, detail=f"Unsupported image input: {upload.filename}")
        safe_name = safe_filename(upload.filename or f"image{suffix}")
        input_path = upload_dir / safe_name
        with input_path.open("wb") as handle:
            shutil.copyfileobj(upload.file, handle)
        input_paths.append(input_path)
        original_names.append(upload.filename or safe_name)

    job = job_store.create_job(
        job_id=job_id,
        job_type="image_edit",
        original_filename=", ".join(original_names[:5]),
        input_path=str(upload_dir),
    )
    request = ImageEditRequest(
        layout_preset=layout_preset,
        width=width,
        height=height,
        fit_mode=fit_mode,
        margin=margin,
        margin_mode=margin_mode,
        dpi=dpi,
        canvas_background_mode=canvas_background_mode,
        background_removal_mode=background_removal_mode,
        output_format=output_format,
        output_quality=output_quality,
        max_file_size_mb=max_file_size_mb,
        naming_rule=naming_rule,
        crop_to_content=crop_to_content,
        remove_white_space_around_product=remove_white_space_around_product,
        product_fill_enabled=product_fill_enabled,
        product_fill_ratio=product_fill_ratio,
        product_safe_padding=product_safe_padding,
        require_white_background=require_white_background,
        reject_human_parts=reject_human_parts,
        auto_product_fill=auto_product_fill,
        fill_ratio=fill_ratio,
        safe_padding=safe_padding,
        normalize_product_size=normalize_product_size,
        product_target_occupancy=product_target_occupancy,
        remove_shadow=remove_shadow,
        remove_background=remove_background,
        manual_transform_enabled=manual_transform_enabled,
        layer_x=layer_x,
        layer_y=layer_y,
        layer_scale=layer_scale,
        layer_scale_x=layer_scale_x,
        layer_scale_y=layer_scale_y,
        layer_crop_left=layer_crop_left,
        layer_crop_top=layer_crop_top,
        layer_crop_right=layer_crop_right,
        layer_crop_bottom=layer_crop_bottom,
        auto_compose_style=auto_compose_style,
        ai_canvas_expand_enabled=ai_canvas_expand_enabled,
        ai_canvas_expand_provider=ai_canvas_expand_provider,
        ai_canvas_expand_prompt=ai_canvas_expand_prompt,
        upscale_mode=upscale_mode,
        standard_upscale_method=standard_upscale_method,
        clarity_enhance=clarity_enhance,
        upscale_scale=upscale_scale,
        upscale_model=upscale_model,
        upscale_cpu_fallback=upscale_cpu_fallback,
        max_workers=max_workers,
        include_subfolders=include_subfolders,
        preserve_folder_structure=preserve_folder_structure,
        output_mode=output_mode,
    )
    job = job_store.update_job(job_id, status=JobStatus.running, summary=initial_image_edit_summary())
    background_tasks.add_task(execute_image_edit_job, job_id, input_paths, output_dir, request)
    return job


@app.post("/api/image-edit/folder-jobs", response_model=JobRecord)
def create_image_edit_folder_job(background_tasks: BackgroundTasks, payload: ImageEditFolderJobPayload = Body(...)) -> JobRecord:
    input_folder = Path(payload.input_folder_path).expanduser().resolve()
    if not input_folder.exists() or not input_folder.is_dir():
        raise HTTPException(status_code=400, detail=f"Input folder not found: {input_folder}")

    width = payload.width
    height = payload.height
    if payload.preset:
        dimensions = IMAGE_DIMENSION_PRESETS.get(payload.preset)
        if dimensions is None:
            raise HTTPException(status_code=400, detail=f"Unknown image preset: {payload.preset}")
        width = int(dimensions["width"])
        height = int(dimensions["height"])

    job_id = str(uuid.uuid4())
    if payload.output_folder_path:
        output_root = Path(payload.output_folder_path).expanduser().resolve()
        if output_root == input_folder or input_folder in output_root.parents:
            raise HTTPException(status_code=400, detail="Output folder must be outside the input folder")
        run_label = datetime.now().strftime("image_edit_%Y%m%d_%H%M%S")
        output_dir = output_root / f"{run_label}_{job_id[:8]}"
    else:
        output_dir = settings.resolve_storage_path(settings.outputs_dir) / job_id
    if output_dir == input_folder or input_folder in output_dir.parents:
        raise HTTPException(status_code=400, detail="Output folder must be outside the input folder")
    output_dir.mkdir(parents=True, exist_ok=True)

    job = job_store.create_job(
        job_id=job_id,
        job_type="image_edit_folder",
        original_filename=input_folder.name,
        input_path=str(input_folder),
    )
    request = ImageEditRequest(
        layout_preset=payload.layout_preset,
        width=width,
        height=height,
        fit_mode=payload.fit_mode,
        margin=payload.margin,
        margin_mode=payload.margin_mode,
        dpi=payload.dpi,
        canvas_background_mode=payload.canvas_background_mode,
        background_removal_mode=payload.background_removal_mode,
        output_format=payload.output_format,
        output_quality=payload.output_quality,
        max_file_size_mb=payload.max_file_size_mb,
        naming_rule=payload.naming_rule,
        crop_to_content=payload.crop_to_content,
        remove_white_space_around_product=payload.remove_white_space_around_product,
        product_fill_enabled=payload.product_fill_enabled,
        product_fill_ratio=payload.product_fill_ratio,
        product_safe_padding=payload.product_safe_padding,
        require_white_background=payload.require_white_background,
        reject_human_parts=payload.reject_human_parts,
        auto_product_fill=payload.auto_product_fill,
        fill_ratio=payload.fill_ratio,
        safe_padding=payload.safe_padding,
        normalize_product_size=payload.normalize_product_size,
        product_target_occupancy=payload.product_target_occupancy,
        remove_shadow=payload.remove_shadow,
        remove_background=payload.remove_background,
        manual_transform_enabled=payload.manual_transform_enabled,
        layer_x=payload.layer_x,
        layer_y=payload.layer_y,
        layer_scale=payload.layer_scale,
        layer_scale_x=payload.layer_scale_x,
        layer_scale_y=payload.layer_scale_y,
        layer_crop_left=payload.layer_crop_left,
        layer_crop_top=payload.layer_crop_top,
        layer_crop_right=payload.layer_crop_right,
        layer_crop_bottom=payload.layer_crop_bottom,
        auto_compose_style=getattr(payload, "auto_compose_style", "balanced"),
        ai_canvas_expand_enabled=payload.ai_canvas_expand_enabled,
        ai_canvas_expand_provider=payload.ai_canvas_expand_provider,
        ai_canvas_expand_prompt=payload.ai_canvas_expand_prompt,
        upscale_mode=payload.upscale_mode,
        standard_upscale_method=payload.standard_upscale_method,
        clarity_enhance=payload.clarity_enhance,
        upscale_scale=payload.upscale_scale,
        upscale_model=payload.upscale_model,
        upscale_cpu_fallback=payload.upscale_cpu_fallback,
        max_workers=payload.max_workers,
        include_subfolders=payload.include_subfolders,
        preserve_folder_structure=payload.preserve_folder_structure,
        output_mode=payload.output_mode,
    )
    job = job_store.update_job(job_id, status=JobStatus.running, summary=initial_image_edit_summary())
    background_tasks.add_task(execute_image_edit_job, job_id, [input_folder], output_dir, request)
    return job


@app.post("/api/image-edit/preview")
def create_image_edit_preview(
    file: UploadFile = File(...),
    layout_preset: str = Form(default="manual"),
    width: int = Form(default=1000),
    height: int = Form(default=1000),
    fit_mode: FitMode = Form(default=FitMode.contain),
    margin: float = Form(default=0),
    margin_mode: MarginMode = Form(default=MarginMode.percent),
    dpi: int = Form(default=72),
    canvas_background_mode: CanvasBackgroundMode = Form(default=CanvasBackgroundMode.white),
    background_removal_mode: BackgroundRemovalMode = Form(default=BackgroundRemovalMode.border_white),
    output_format: str = Form(default="jpg"),
    output_quality: int = Form(default=95),
    max_file_size_mb: float = Form(default=0),
    crop_to_content: bool = Form(default=True),
    remove_white_space_around_product: bool = Form(default=False),
    product_fill_enabled: bool = Form(default=False),
    product_fill_ratio: int = Form(default=88),
    product_safe_padding: int = Form(default=8),
    require_white_background: bool = Form(default=False),
    reject_human_parts: bool = Form(default=False),
    auto_product_fill: bool = Form(default=False),
    fill_ratio: float = Form(default=0.88),
    safe_padding: int = Form(default=0),
    normalize_product_size: bool = Form(default=False),
    product_target_occupancy: float = Form(default=0.88),
    remove_shadow: bool = Form(default=False),
    remove_background: bool = Form(default=False),
    manual_transform_enabled: bool = Form(default=False),
    layer_x: float | None = Form(default=None),
    layer_y: float | None = Form(default=None),
    layer_scale: float = Form(default=1.0),
    layer_scale_x: float | None = Form(default=None),
    layer_scale_y: float | None = Form(default=None),
    layer_crop_left: float = Form(default=0),
    layer_crop_top: float = Form(default=0),
    layer_crop_right: float = Form(default=0),
    layer_crop_bottom: float = Form(default=0),
    auto_compose_style: str = Form(default="balanced"),
    ai_canvas_expand_enabled: bool = Form(default=False),
    ai_canvas_expand_provider: str = Form(default="comfyui"),
    ai_canvas_expand_prompt: str = Form(default="clean commercial product photo background, consistent lighting"),
    upscale_mode: str = Form(default="none"),
    standard_upscale_method: StandardUpscaleMethod = Form(default=StandardUpscaleMethod.pillow_lanczos),
    clarity_enhance: ClarityEnhanceMode = Form(default=ClarityEnhanceMode.auto),
    upscale_scale: int = Form(default=2),
    upscale_model: str = Form(default="realesrgan-x4plus"),
    upscale_cpu_fallback: bool = Form(default=True),
) -> FileResponse:
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}:
        raise HTTPException(status_code=400, detail="Preview supports single image files only")

    preview_id = str(uuid.uuid4())
    preview_dir = settings.resolve_storage_path(Path("storage/outputs/previews")) / preview_id
    preview_dir.mkdir(parents=True, exist_ok=True)
    input_path = preview_dir / safe_filename(file.filename or f"preview{suffix}")
    output_format_normalized = normalized_output_format(output_format)
    output_path = preview_dir / f"preview.{output_format_normalized}"
    with input_path.open("wb") as handle:
        shutil.copyfileobj(file.file, handle)

    request = ImageEditRequest(
        layout_preset=layout_preset,
        width=width,
        height=height,
        fit_mode=fit_mode,
        margin=margin,
        margin_mode=margin_mode,
        dpi=dpi,
        canvas_background_mode=canvas_background_mode,
        background_removal_mode=background_removal_mode,
        output_format=output_format,
        output_quality=output_quality,
        max_file_size_mb=max_file_size_mb,
        crop_to_content=crop_to_content,
        remove_white_space_around_product=remove_white_space_around_product,
        product_fill_enabled=product_fill_enabled,
        product_fill_ratio=product_fill_ratio,
        product_safe_padding=product_safe_padding,
        require_white_background=require_white_background,
        reject_human_parts=reject_human_parts,
        auto_product_fill=auto_product_fill,
        fill_ratio=fill_ratio,
        safe_padding=safe_padding,
        normalize_product_size=normalize_product_size,
        product_target_occupancy=product_target_occupancy,
        remove_shadow=remove_shadow,
        remove_background=remove_background,
        manual_transform_enabled=manual_transform_enabled,
        layer_x=layer_x,
        layer_y=layer_y,
        layer_scale=layer_scale,
        layer_scale_x=layer_scale_x,
        layer_scale_y=layer_scale_y,
        layer_crop_left=layer_crop_left,
        layer_crop_top=layer_crop_top,
        layer_crop_right=layer_crop_right,
        layer_crop_bottom=layer_crop_bottom,
        auto_compose_style=auto_compose_style,
        ai_canvas_expand_enabled=ai_canvas_expand_enabled,
        ai_canvas_expand_provider=ai_canvas_expand_provider,
        ai_canvas_expand_prompt=ai_canvas_expand_prompt,
        upscale_mode=upscale_mode,
        standard_upscale_method=standard_upscale_method,
        clarity_enhance=clarity_enhance,
        upscale_scale=upscale_scale,
        upscale_model=upscale_model,
        upscale_cpu_fallback=upscale_cpu_fallback,
        max_workers=1,
    )
    try:
        process_one_image(input_path, output_path, request)
    except Exception as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    return FileResponse(
        output_path,
        filename=output_path.name,
        media_type=media_type_for_output(output_path),
    )


@app.get("/api/jobs/{job_id}/download")
def download_job_output(job_id: str) -> FileResponse:
    try:
        job = job_store.get_job(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc
    if job.status != JobStatus.completed or not job.output_path:
        raise HTTPException(status_code=409, detail="Job output is not ready")
    output_path = Path(job.output_path)
    if not output_path.exists():
        raise HTTPException(status_code=404, detail="Output file not found")
    if output_path.is_dir():
        archive_path = output_path.parent / f"{job_id}_image_edit_output.zip"
        write_directory_zip(output_path, archive_path)
        output_path = archive_path
    return FileResponse(
        output_path,
        filename=output_path.name,
        media_type=media_type_for_output(output_path),
    )


def safe_filename(filename: str) -> str:
    cleaned = "".join(char if char.isalnum() or char in (" ", ".", "-", "_") else "_" for char in filename).strip()
    return cleaned or "upload.xlsx"


def open_native_folder_picker(title: str, initial_path: str | None = None) -> str:
    import tkinter as tk
    from tkinter import filedialog

    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    initial_dir = str(Path(initial_path).expanduser().resolve()) if initial_path else str(Path.home())
    try:
        selected = filedialog.askdirectory(parent=root, title=title or "Select folder", initialdir=initial_dir, mustexist=False)
        return str(Path(selected).resolve()) if selected else ""
    finally:
        root.destroy()


def parse_selected_statuses(value: str) -> list[str] | None:
    text = (value or "").strip()
    if not text:
        return None
    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            statuses = [str(item).strip() for item in parsed if str(item).strip()]
            return statuses or None
    except json.JSONDecodeError:
        pass
    statuses = [item.strip() for item in text.split(",") if item.strip()]
    return statuses or None


def media_type_for_output(path: Path) -> str:
    if path.suffix.lower() == ".zip":
        return "application/zip"
    if path.suffix.lower() == ".xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    if path.suffix.lower() in {".jpg", ".jpeg"}:
        return "image/jpeg"
    if path.suffix.lower() == ".png":
        return "image/png"
    if path.suffix.lower() == ".webp":
        return "image/webp"
    if path.suffix.lower() == ".avif":
        return "image/avif"
    if path.suffix.lower() in {".tif", ".tiff"}:
        return "image/tiff"
    return "application/octet-stream"


def write_directory_zip(source_dir: Path, output_zip: Path) -> None:
    if output_zip.exists():
        output_zip.unlink()
    with zipfile.ZipFile(output_zip, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(source_dir.rglob("*")):
            if path.is_file():
                archive.write(path, path.relative_to(source_dir).as_posix())


def read_image_size(path: Path) -> tuple[int, int]:
    try:
        from PIL import Image

        with Image.open(path) as image:
            return int(image.width), int(image.height)
    except Exception:
        return 0, 0


def image_check_thumbnail_path(path: Path) -> Path:
    stat = path.stat()
    cache_key = hashlib.sha1(f"{path}|{stat.st_mtime_ns}|{stat.st_size}".encode("utf-8", errors="ignore")).hexdigest()
    target = IMAGE_CHECK_THUMB_DIR / f"{cache_key}.jpg"
    if target.is_file():
        return target

    IMAGE_CHECK_THUMB_DIR.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image, ImageOps

        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((IMAGE_CHECK_THUMB_MAX, IMAGE_CHECK_THUMB_MAX), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "L"):
                background = Image.new("RGB", image.size, "white")
                if image.mode == "RGBA":
                    background.paste(image, mask=image.getchannel("A"))
                else:
                    background.paste(image.convert("RGB"))
                image = background
            elif image.mode == "L":
                image = image.convert("RGB")
            image.save(target, "JPEG", quality=82, optimize=True)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Could not create image thumbnail: {exc}") from exc
    return target


def initial_image_edit_summary() -> dict[str, Any]:
    return {
        "input_count": 0,
        "processed_count": 0,
        "skipped_count": 0,
        "progress_percent": 0,
        "current_file": "Queued",
        "worker_count": 0,
        "warnings": [],
        "items": [],
    }


def execute_image_edit_job(job_id: str, input_paths: list[Path], output_dir: Path, request: ImageEditRequest) -> None:
    def update_progress(progress: dict[str, Any]) -> None:
        current = job_store.get_job(job_id).summary or {}
        current.update(progress)
        job_store.update_job(job_id, status=JobStatus.running, summary=current)

    try:
        summary = run_image_edit(input_paths, output_dir, request, progress_callback=update_progress)
        job_store.update_job(
            job_id,
            status=JobStatus.completed,
            output_path=summary.output_zip or summary.output_dir,
            error="",
            summary=summary.model_dump(),
        )
    except Exception as exc:
        current = job_store.get_job(job_id).summary or {}
        current.update({"current_file": "Failed", "progress_percent": current.get("progress_percent", 0)})
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc), summary=current)


def execute_data_quality_control_job(job_id: str, input_path: Path, output_path: Path, options: AuditOptions) -> None:
    try:
        summary = run_data_maintenance(input_path, output_path, options=options, job_id=job_id)
        final_output_path = branded_missing_data_output_path(output_path, summary.brand_count)
        if output_path.exists() and output_path.resolve() != final_output_path.resolve():
            if final_output_path.exists():
                final_output_path.unlink()
            output_path.replace(final_output_path)
            summary.output_path = str(final_output_path)
        job_store.update_job(
            job_id,
            status=JobStatus.completed,
            output_path=summary.output_path,
            error="",
            summary=summary.model_dump(),
        )
    except Exception as exc:
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc))


def branded_missing_data_output_path(output_path: Path, brand_count: int) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return output_path.with_name(f"Brand_Missing_Data_{brand_count}_Brands_{timestamp}.xlsx")
