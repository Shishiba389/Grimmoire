from __future__ import annotations

import shutil
import uuid
import json
import os
import hashlib
import mimetypes
from datetime import datetime
from pathlib import Path
from typing import Any

from fastapi import BackgroundTasks, Body, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel, Field, field_validator

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

MASTER_DATA_DIR = settings.user_data_root / "master_data_uploads"
MASTER_DATA_DIR.mkdir(parents=True, exist_ok=True)
MASTER_DATA_STATE_DIR = MASTER_DATA_DIR / ".state"
MASTER_DATA_STATE_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_CHECK_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}
IMAGE_CHECK_THUMB_DIR = Path(
    os.environ.get("GRIMOIRE_THUMB_CACHE", settings.user_data_root / "ImageCheckThumbs")
).expanduser().resolve()
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
    max_workers: int = Form(default=0),
    keep_detail_rows: bool = Form(default=True),
    selected_statuses: str = Form(default=""),
) -> JobRecord:
    return create_data_quality_control_job(background_tasks, file, chunk_size, max_workers, keep_detail_rows, selected_statuses)


@app.post("/api/data-quality-control/jobs", response_model=JobRecord)
def create_data_quality_control_job(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    chunk_size: int = Form(default=5000),
    max_workers: int = Form(default=0),
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
    job = job_store.update_job(
        job_id,
        status=JobStatus.running,
        summary={
            "progress_percent": 2,
            "progress_phase": "queued",
            "current_file": safe_name,
            "progress_message": "Queued Data QC audit",
            "worker_count": max_workers,
        },
    )
    background_tasks.add_task(execute_data_quality_control_job, job_id, input_path, output_path, options)
    return job


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
        raise HTTPException(status_code=409, detail="Directory job outputs are not available in GRIMOIRE")
    return FileResponse(
        output_path,
        filename=output_path.name,
        media_type=mimetypes.guess_type(output_path.name)[0] or "application/octet-stream",
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


def execute_data_quality_control_job(job_id: str, input_path: Path, output_path: Path, options: AuditOptions) -> None:
    def update_progress(progress: dict[str, Any]) -> None:
        current = job_store.get_job(job_id).summary or {}
        current.update(progress)
        current["worker_count"] = options.max_workers or (os.cpu_count() or 1)
        job_store.update_job(job_id, status=JobStatus.running, summary=current)

    try:
        summary = run_data_maintenance(input_path, output_path, options=options, job_id=job_id, progress_callback=update_progress)
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
            summary={**summary.model_dump(), "progress_percent": 100, "progress_phase": "completed", "progress_message": "Audit complete"},
        )
    except Exception as exc:
        current = job_store.get_job(job_id).summary or {}
        current.update(
            {
                "progress_phase": "failed",
                "progress_message": str(exc),
                "progress_percent": current.get("progress_percent", 0),
            }
        )
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc), summary=current)


def branded_missing_data_output_path(output_path: Path, brand_count: int) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return output_path.with_name(f"Brand_Missing_Data_{brand_count}_Brands_{timestamp}.xlsx")
