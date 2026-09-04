"""EAN Renamer — FastAPI router.
Ported from NAMING_SAMPLE/backend/app/main.py.
"""
from __future__ import annotations

import logging
import re
import threading
import time
import tempfile

from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse
from pathlib import Path

from services.ean_renamer.models import (
    ApplyRenameResponse,
    BulkFolderMatchItem,
    BulkMatchCandidate,
    BulkMatchRequest,
    BulkMatchResponse,
    BulkMatchResult,
    BulkMappingEntry,
    BulkMappingResponse,
    BulkScanResponse,
    BatchApplyRenameResponse,
    BatchRenamePlanResponse,
    BatchRenameRequest,
    FolderResponse,
    ImageMatchCandidate,
    ImageMatchItem,
    ImageMatchRequest,
    ImageMatchResponse,
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


# ---------------------------------------------------------------------------
# Master data matching for Bulk mode (3-tier matcher)
# ---------------------------------------------------------------------------

from services.shared.master_data import ImageRecord, MasterDataMatcher, MasterDataRow, MasterDataUploadResponse

_master_sessions: dict[str, tuple[MasterDataMatcher, list[MasterDataRow], float]] = {}
_MASTER_TTL = 7200
_MASTER_MAX_SESSIONS = 10


def _cleanup_master_sessions() -> None:
    now = time.time()
    expired = [k for k, (_, _, ts) in _master_sessions.items() if now - ts > _MASTER_TTL]
    for k in expired:
        _master_sessions.pop(k, None)
    if len(_master_sessions) > _MASTER_MAX_SESSIONS:
        by_age = sorted(_master_sessions.items(), key=lambda x: x[1][2])
        for k, _ in by_age[:len(_master_sessions) - _MASTER_MAX_SESSIONS]:
            _master_sessions.pop(k, None)


def _get_master_matcher(session_id: str) -> MasterDataMatcher:
    _cleanup_master_sessions()
    entry = _master_sessions.get(session_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Master data session not found or expired. Please re-upload.")
    return entry[0]


@router.post("/master-data/upload")
async def upload_master_data(file: UploadFile = File(...)) -> dict:
    from services.shared.excel_parser import handle_upload
    return await handle_upload(file, _master_sessions, _cleanup_master_sessions)


@router.post("/master-data/upload-path")
def upload_master_data_path(payload: dict) -> dict:
    from services.shared.excel_parser import handle_upload_path
    return handle_upload_path(payload, _master_sessions, _cleanup_master_sessions)


@router.post("/bulk/match-master")
def bulk_match_master(request: BulkMatchRequest) -> BulkMatchResponse:
    matcher = _get_master_matcher(request.session_id)

    results: list[BulkMatchResult] = []
    for folder in request.folders:
        all_candidates: list[BulkMatchCandidate] = []
        seen_eans: set[str] = set()

        names_to_match = [folder.name]
        if folder.relativePath and folder.relativePath != ".":
            names_to_match.append(folder.relativePath)
        names_to_match.extend(folder.sampleImageNames)

        for name in names_to_match:
            fake_image = ImageRecord(
                path=name,
                name=name,
                source_folder=folder.name,
                relative_path=folder.relativePath,
                size_bytes=0,
            )
            match_result = matcher.match(fake_image)
            for c in match_result.candidates:
                if c.ean not in seen_eans:
                    seen_eans.add(c.ean)
                    all_candidates.append(BulkMatchCandidate(
                        ean=c.ean,
                        product_name=c.product_name,
                        confidence=c.confidence,
                        tier=c.tier,
                        match_source=c.match_source,
                    ))

        if len(all_candidates) == 0:
            status = "unmatched"
        elif len(all_candidates) == 1:
            status = "matched"
        else:
            status = "ambiguous"

        results.append(BulkMatchResult(
            key=folder.key,
            name=folder.name,
            candidates=all_candidates,
            selected_index=0 if len(all_candidates) == 1 else None,
            status=status,
        ))

    matched = sum(1 for r in results if r.status == "matched")
    ambiguous = sum(1 for r in results if r.status == "ambiguous")
    unmatched = sum(1 for r in results if r.status == "unmatched")

    return BulkMatchResponse(
        results=results,
        summary={"total": len(results), "matched": matched, "ambiguous": ambiguous, "unmatched": unmatched},
    )


@router.post("/match-images", response_model=ImageMatchResponse)
def match_images(request: ImageMatchRequest) -> ImageMatchResponse:
    matcher = _get_master_matcher(request.session_id)

    matches: list[ImageMatchItem] = []
    for name in request.image_names:
        fake_image = ImageRecord(
            path=name,
            name=name,
            source_folder="",
            relative_path="",
            size_bytes=0,
        )
        result = matcher.match(fake_image)
        best = result.candidates[0] if result.candidates else None
        matches.append(ImageMatchItem(
            image_name=name,
            candidates=[
                ImageMatchCandidate(
                    ean=c.ean,
                    product_name=c.product_name,
                    confidence=c.confidence,
                    tier=c.tier,
                    match_source=c.match_source,
                )
                for c in result.candidates
            ],
            best_ean=best.ean if best else None,
            best_product=best.product_name if best else None,
            best_confidence=best.confidence if best else 0.0,
            best_tier=best.tier if best else None,
            status=result.status,
        ))

    matched_count = sum(1 for m in matches if m.status != "unmatched")
    return ImageMatchResponse(
        matches=matches,
        matched_count=matched_count,
        total_count=len(matches),
    )
