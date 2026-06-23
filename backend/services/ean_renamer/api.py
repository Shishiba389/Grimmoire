"""EAN Renamer — FastAPI router.
Ported from NAMING_SAMPLE/backend/app/main.py.
"""
from __future__ import annotations

import logging
import threading
import time
import tempfile

from fastapi import APIRouter, File, Request, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path

from services.ean_renamer.models import (
    ApplyRenameResponse,
    BulkMappingEntry,
    BulkMappingResponse,
    BulkScanResponse,
    BatchApplyRenameResponse,
    BatchRenamePlanResponse,
    BatchRenameRequest,
    FolderResponse,
    OpenFolderRequest,
    PickOutputFolderRequest,
    PickFolderResponse,
    RenamePlanResponse,
    RenameRequest,
    UndoRequest,
    UndoResponse,
)
from services.ean_renamer.services.batch_renamer import apply_batch_copy, build_batch_plan
from services.ean_renamer.services.folder_scanner import scan_bulk_folders, scan_folder, scan_root_folder
from services.ean_renamer.services.image_service import get_original_image, get_thumbnail
from services.ean_renamer.services.rename_planner import build_rename_plan
from services.ean_renamer.services.safe_renamer import apply_rename
from services.ean_renamer.services.undo_service import undo_rename

router = APIRouter()
logger = logging.getLogger("ean.renamer")

_STATIC_CACHE_HEADERS = {"Cache-Control": "public, max-age=86400, immutable"}
_TK_DIALOG_LOCK = threading.Lock()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "ean-renamer"}


@router.post("/folder/open", response_model=FolderResponse)
def open_folder(request: OpenFolderRequest) -> FolderResponse:
    return scan_root_folder(request.folderPath)


@router.post("/folder/pick", response_model=FolderResponse)
def pick_folder() -> FolderResponse:
    import tkinter as tk
    from tkinter import filedialog

    with _TK_DIALOG_LOCK:
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        try:
            folder_path = filedialog.askdirectory(title="Select EAN image folder")
        finally:
            root.destroy()
    if not folder_path:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="No folder selected")
    return scan_root_folder(folder_path)


@router.post("/folder/pick-output", response_model=PickFolderResponse)
def pick_output_folder(request: PickOutputFolderRequest | None = None) -> PickFolderResponse:
    import tkinter as tk
    from tkinter import filedialog

    options = {"title": "Select output folder for renamed copies", "mustexist": True}
    initial_path = (request.initialFolderPath if request else None) or None
    if initial_path:
        initial_dir = Path(initial_path).expanduser()
        if initial_dir.is_file():
            initial_dir = initial_dir.parent
        if initial_dir.exists():
            options["initialdir"] = str(initial_dir)
    with _TK_DIALOG_LOCK:
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        try:
            folder_path = filedialog.askdirectory(**options)
        finally:
            root.destroy()
    if not folder_path:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="No output folder selected")
    return PickFolderResponse(folderPath=folder_path)


@router.post("/folder/bulk-scan", response_model=BulkScanResponse)
def bulk_scan_folder(request: OpenFolderRequest) -> BulkScanResponse:
    return scan_bulk_folders(request.folderPath)


@router.post("/bulk/import-map", response_model=BulkMappingResponse)
async def import_bulk_mapping(file: UploadFile = File(...)) -> BulkMappingResponse:
    suffix = Path(file.filename or "").suffix.lower()
    raw = await file.read()
    if not raw:
        return BulkMappingResponse(entries=[], warnings=["Uploaded file is empty."])
    if suffix in {".xlsx", ".xls"}:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(raw)
            tmp_path = Path(tmp.name)
        try:
            return parse_mapping_table(tmp_path)
        finally:
            try:
                tmp_path.unlink()
            except OSError:
                pass
    return parse_mapping_text(raw.decode("utf-8-sig", errors="replace"))


@router.get("/images/{image_id}/thumbnail")
def thumbnail(image_id: str, folderPath: str) -> FileResponse:
    path = get_thumbnail(folderPath, image_id)
    return FileResponse(path, media_type="image/jpeg", headers=_STATIC_CACHE_HEADERS)


def parse_mapping_table(path: Path) -> BulkMappingResponse:
    try:
        import pandas as pd

        frame = pd.read_excel(path, dtype=str, keep_default_na=False)
    except Exception as exc:
        return BulkMappingResponse(entries=[], warnings=[f"Could not read mapping file: {exc}"])
    return mapping_response_from_rows(frame.to_dict(orient="records"))


def parse_mapping_text(text: str) -> BulkMappingResponse:
    rows: list[dict[str, str]] = []
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines:
        return BulkMappingResponse(entries=[], warnings=["Uploaded file has no rows."])

    separators = ["\t", ",", ";", "|"]
    sep = next((candidate for candidate in separators if candidate in lines[0]), None)
    if sep:
        first = [part.strip() for part in lines[0].split(sep)]
        has_header = any(normalize_header(part) in {"ean", "barcode", "product_name", "product"} for part in first)
        headers = first if has_header else ["EAN", "Product Name", "Source"][: len(first)]
        data_lines = lines[1:] if has_header else lines
        for line in data_lines:
            parts = [part.strip() for part in line.split(sep)]
            rows.append({headers[index]: parts[index] for index in range(min(len(headers), len(parts)))})
    else:
        for line in lines:
            parts = line.split(maxsplit=1)
            rows.append({"EAN": parts[0], "Product Name": parts[1] if len(parts) > 1 else ""})
    return mapping_response_from_rows(rows)


def mapping_response_from_rows(rows: list[dict[str, object]]) -> BulkMappingResponse:
    entries: list[BulkMappingEntry] = []
    warnings: list[str] = []
    for row in rows:
        normalized = {normalize_header(str(key)): str(value).strip() for key, value in row.items()}
        ean = first_value(normalized, ["ean", "barcode", "bar_code", "ma_ean", "sku"])
        product_name = first_value(normalized, ["product_name", "product", "name", "ten_san_pham", "title"])
        source = first_value(normalized, ["source", "folder", "folder_name", "file", "filename", "image_name"])
        if not ean and not product_name:
            continue
        entries.append(BulkMappingEntry(ean=ean or None, productName=product_name or None, source=source or None))
    if not entries:
        warnings.append("No EAN/Product Name rows were detected.")
    return BulkMappingResponse(entries=entries, warnings=warnings)


def normalize_header(value: str) -> str:
    return "_".join(part for part in "".join(char.lower() if char.isalnum() else "_" for char in value).split("_") if part)


def first_value(row: dict[str, str], keys: list[str]) -> str:
    for key in keys:
        value = row.get(key, "").strip()
        if value:
            return value
    return ""


@router.get("/images/{image_id}/original")
def original(image_id: str, folderPath: str) -> FileResponse:
    path = get_original_image(folderPath, image_id)
    return FileResponse(path, headers=_STATIC_CACHE_HEADERS)


@router.post("/rename/preview", response_model=RenamePlanResponse)
def preview_rename(request: RenameRequest) -> RenamePlanResponse:
    return build_rename_plan(request)


@router.post("/rename/apply", response_model=ApplyRenameResponse)
def apply_rename_plan(request: RenameRequest) -> ApplyRenameResponse:
    return apply_rename(request)


@router.post("/batch/preview", response_model=BatchRenamePlanResponse)
def preview_batch_rename(request: BatchRenameRequest) -> BatchRenamePlanResponse:
    return build_batch_plan(request)


@router.post("/batch/apply", response_model=BatchApplyRenameResponse)
def apply_batch_rename(request: BatchRenameRequest) -> BatchApplyRenameResponse:
    return apply_batch_copy(request)


@router.post("/rename/undo", response_model=UndoResponse)
def undo_last_rename(request: UndoRequest) -> UndoResponse:
    return undo_rename(request)
