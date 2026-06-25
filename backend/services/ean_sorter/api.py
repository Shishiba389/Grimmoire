"""EAN Sorter v2 — FastAPI router.

New flow: deep-scan → upload master data → match → sort.
Categorize subview endpoints preserved unchanged.
"""
from __future__ import annotations

import base64
import mimetypes
import os
import re
import time
import uuid
from collections import Counter
from pathlib import Path

import pandas as pd
from fastapi import APIRouter, BackgroundTasks, File, HTTPException, UploadFile
from fastapi.responses import FileResponse

from services.data_maintenance.job_store import JobStore
from services.data_maintenance.models import JobStatus

from .core import EAN_PATTERN, extract_ean
from .matcher import MasterDataMatcher
from .models import (
    CollectLooseResponse,
    DuplicateDetectionResponse,
    DuplicateGroup,
    GroupConfirmation,
    GroupIntoFoldersRequest,
    GroupIntoFoldersResponse,
    ImageRecord,
    MasterDataRow,
    MasterDataUploadResponse,
    MatchResult,
    ScanResponse,
    SortRequest,
    SortResponse,
)
from .duplicate_detector import detect_duplicate_groups
from .organizer import organize_by_ean
from .report import REPORT_NAME, write_loose_report, write_sort_report
from .scanner import collect_loose_images, deep_scan
from services.ean_renamer.services.folder_scanner import image_id_for_name
from services.ean_renamer.services.image_service import get_thumbnail

router = APIRouter()
job_store = JobStore()

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}

# ---------------------------------------------------------------------------
# Master data session storage (in-memory, keyed by session_id)
# ---------------------------------------------------------------------------
_sessions: dict[str, tuple[MasterDataMatcher, list[MasterDataRow], float]] = {}
_SESSION_TTL = 7200  # 2 hours
_MAX_SESSIONS = 10


def _cleanup_sessions() -> None:
    now = time.time()
    expired = [k for k, (_, _, ts) in _sessions.items() if now - ts > _SESSION_TTL]
    for k in expired:
        _sessions.pop(k, None)
    if len(_sessions) > _MAX_SESSIONS:
        by_age = sorted(_sessions.items(), key=lambda x: x[1][2])
        for k, _ in by_age[:len(_sessions) - _MAX_SESSIONS]:
            _sessions.pop(k, None)


def _get_matcher(session_id: str) -> MasterDataMatcher:
    _cleanup_sessions()
    entry = _sessions.get(session_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Master data session not found or expired. Please re-upload.")
    return entry[0]


# Store match results per session for sort step
_match_results: dict[str, list[MatchResult]] = {}
_MAX_MATCH_RESULTS = 20

# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "ean-sorter-v2"}


# ---------------------------------------------------------------------------
# Master data upload
# ---------------------------------------------------------------------------


@router.post("/master-data/upload")
async def upload_master_data(file: UploadFile = File(...)) -> dict:
    from services.shared.excel_parser import handle_upload
    return await handle_upload(file, _sessions, _cleanup_sessions)


@router.post("/master-data/upload-path")
def upload_master_data_path(payload: dict) -> dict:
    from services.shared.excel_parser import handle_upload_path
    return handle_upload_path(payload, _sessions, _cleanup_sessions)


# ---------------------------------------------------------------------------
# Deep scan
# ---------------------------------------------------------------------------


@router.post("/deep-scan")
def deep_scan_folder(payload: dict) -> dict:
    folder = payload.get("folder", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    result = deep_scan(root)
    return {
        "ok": True,
        "folder": str(root),
        "images": [img.model_dump() for img in result["images"]],
        "loose_images": [img.model_dump() for img in result["loose_images"]],
        "subfolder_count": result["subfolder_count"],
        "total_count": result["total_count"],
    }


@router.get("/thumbnail")
def match_result_thumbnail(folder: str, image_path: str) -> FileResponse:
    root = Path(folder).expanduser().resolve()
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="Source folder does not exist")

    requested = Path(image_path).expanduser()
    if not requested.is_absolute():
        requested = root / requested
    requested = requested.resolve()
    try:
        relative = requested.relative_to(root)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Image is outside the selected folder") from exc

    if not requested.is_file():
        matches = [
            candidate for candidate in root.rglob(requested.name)
            if candidate.is_file() and candidate.suffix.lower() in IMAGE_SUFFIXES
        ]
        if len(matches) != 1:
            raise HTTPException(status_code=404, detail="Image no longer exists at the scanned path")
        requested = matches[0].resolve()
        relative = requested.relative_to(root)

    image_id = image_id_for_name(relative.as_posix())
    thumbnail = get_thumbnail(str(root), image_id)
    return FileResponse(
        thumbnail,
        media_type="image/jpeg",
        headers={"Cache-Control": "public, max-age=86400, immutable"},
    )


# ---------------------------------------------------------------------------
# Collect loose images
# ---------------------------------------------------------------------------


@router.post("/collect-loose")
def collect_loose(payload: dict) -> dict:
    folder = payload.get("folder", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    result = collect_loose_images(root)

    if result["moved"]:
        report_path = root / "_LOOSE_IMAGES" / "loose_images_report.xlsx"
        write_loose_report(report_path, result["moved"])

    return {"ok": True, **result}


# ---------------------------------------------------------------------------
# Duplicate detection
# ---------------------------------------------------------------------------

_duplicate_results: dict[str, DuplicateDetectionResponse] = {}


@router.post("/detect-duplicates")
def detect_duplicates(payload: dict) -> dict:
    folder = payload.get("folder", "")
    threshold = float(payload.get("threshold", 0.8))
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    scan_result = deep_scan(root)
    images: list[ImageRecord] = scan_result["images"]
    result = detect_duplicate_groups(images, threshold)

    _duplicate_results[str(root)] = result
    if len(_duplicate_results) > 20:
        oldest_key = next(iter(_duplicate_results))
        _duplicate_results.pop(oldest_key, None)

    return {
        "ok": True,
        "groups": [g.model_dump() for g in result.groups],
        "total_images_grouped": result.total_images_grouped,
        "ungrouped_count": result.ungrouped_count,
    }


@router.post("/group-into-folders")
def group_into_folders(payload: dict, background_tasks: BackgroundTasks) -> dict:
    folder = payload.get("folder", "")
    groups_data = payload.get("groups", [])
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    job_id = str(uuid.uuid4())
    job_store.create_job(
        job_id=job_id,
        job_type="ean_sorter_group",
        original_filename=f"Group {len(groups_data)} sets",
        input_path=folder,
    )
    job_store.update_job(job_id, status=JobStatus.running, summary={
        "progress_percent": 0,
        "current_file": "Starting...",
        "created_folders": 0,
        "moved_files": 0,
    })

    background_tasks.add_task(_execute_group_job, job_id, root, groups_data)
    return job_store.get_job(job_id).model_dump(mode="json")


def _execute_group_job(job_id: str, root: Path, groups_data: list[dict]) -> None:
    import shutil

    try:
        created_folders = 0
        moved_files = 0
        folder_paths: list[str] = []
        errors: list[str] = []
        total = len(groups_data)

        for i, g in enumerate(groups_data):
            action = g.get("action", "confirm")
            if action == "skip":
                continue

            folder_name = g.get("folder_name") or g.get("common_key", f"group_{i}")
            removed_paths = set(g.get("removed_paths", []))
            images = g.get("images", [])

            dest_dir = root / folder_name
            dest_dir.mkdir(exist_ok=True)
            created_folders += 1
            folder_paths.append(str(dest_dir))

            for img_data in images:
                img_path = img_data.get("path", "")
                if img_path in removed_paths:
                    continue
                src = Path(img_path)
                if not src.exists():
                    errors.append(f"File not found: {src}")
                    continue
                # Skip if already in the destination
                if src.parent == dest_dir:
                    continue
                target = dest_dir / src.name
                if target.exists():
                    stem, suffix = src.stem, src.suffix
                    counter = 1
                    while target.exists():
                        target = dest_dir / f"{stem}_{counter}{suffix}"
                        counter += 1
                try:
                    shutil.move(str(src), str(target))
                    moved_files += 1
                except OSError as exc:
                    errors.append(f"Failed to move '{src.name}': {exc}")

            pct = int(round((i + 1) / max(total, 1) * 100))
            job_store.update_job(job_id, status=JobStatus.running, summary={
                "progress_percent": pct,
                "current_file": f"Group {i + 1}/{total}",
                "created_folders": created_folders,
                "moved_files": moved_files,
            })

        job_store.update_job(job_id, status=JobStatus.completed, output_path=str(root), summary={
            "progress_percent": 100,
            "current_file": "Completed",
            "created_folders": created_folders,
            "moved_files": moved_files,
            "folder_paths": folder_paths,
            "errors": errors,
        })
    except Exception as exc:
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc))


# ---------------------------------------------------------------------------
# Match
# ---------------------------------------------------------------------------


@router.post("/match")
def match_images(payload: dict) -> dict:
    folder = payload.get("folder", "")
    session_id = payload.get("session_id", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")

    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    scan_result = deep_scan(root)
    images: list[ImageRecord] = scan_result["images"]

    if session_id:
        matcher = _get_matcher(session_id)
    else:
        matcher = MasterDataMatcher([])

    results = matcher.match_batch(images)

    results_dicts = [r.model_dump() for r in results]
    if len(_match_results) >= _MAX_MATCH_RESULTS:
        oldest_key = next(iter(_match_results))
        _match_results.pop(oldest_key, None)
    _match_results[session_id or "no_session"] = results

    matched = sum(1 for r in results if r.status == "matched")
    ambiguous = sum(1 for r in results if r.status == "ambiguous")
    unmatched = sum(1 for r in results if r.status == "unmatched")

    return {
        "ok": True,
        "results": results_dicts,
        "summary": {
            "total": len(results),
            "matched": matched,
            "ambiguous": ambiguous,
            "unmatched": unmatched,
        },
    }


# ---------------------------------------------------------------------------
# Match override
# ---------------------------------------------------------------------------


@router.post("/match/override")
def override_matches(payload: dict) -> dict:
    overrides = payload.get("overrides", [])
    session_id = payload.get("session_id", "")

    key = session_id or "no_session"
    results = _match_results.get(key, [])
    if not results:
        raise HTTPException(status_code=404, detail="No match results found. Run /match first.")

    path_index = {r.image_path: i for i, r in enumerate(results)}
    updated = 0

    for override in overrides:
        img_path = override.get("image_path", "")
        selected = override.get("selected_index")
        idx = path_index.get(img_path)
        if idx is not None and selected is not None:
            results[idx].selected_index = selected
            if results[idx].status == "ambiguous":
                results[idx].status = "matched"
            updated += 1

    _match_results[key] = results
    return {
        "ok": True,
        "updated": updated,
        "results": [r.model_dump() for r in results],
    }


# ---------------------------------------------------------------------------
# Sort job (async)
# ---------------------------------------------------------------------------


@router.post("/sort-job")
def start_sort_job(payload: dict, background_tasks: BackgroundTasks) -> dict:
    folder = payload.get("folder", "")
    session_id = payload.get("session_id", "")
    delete_empty = payload.get("delete_empty", False)

    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")

    key = session_id or "no_session"
    results = _match_results.get(key, [])
    if not results:
        raise HTTPException(status_code=400, detail="No match results. Run /match first.")

    ambiguous = [r for r in results if r.status == "ambiguous"]
    if ambiguous:
        raise HTTPException(
            status_code=409,
            detail=f"{len(ambiguous)} ambiguous matches remain. Resolve them before sorting.",
        )

    matches: list[dict] = []
    for r in results:
        if r.status != "matched" or not r.candidates:
            continue
        sel = r.selected_index if r.selected_index is not None else 0
        if 0 <= sel < len(r.candidates):
            candidate = r.candidates[sel]
            if candidate.ean:
                matches.append({
                    "image_path": r.image_path,
                    "image_name": r.image_name,
                    "ean": candidate.ean,
                    "product_name": candidate.product_name,
                    "source_folder": r.source_folder,
                })

    job_id = str(uuid.uuid4())
    job_store.create_job(
        job_id=job_id,
        job_type="ean_sorter_sort",
        original_filename=f"Sort {len(matches)} images",
        input_path=folder,
    )
    job_store.update_job(job_id, status=JobStatus.running, summary={
        "progress_percent": 0,
        "current_file": "Starting...",
        "moved": 0,
        "total": len(matches),
    })

    background_tasks.add_task(
        _execute_sort_job, job_id, folder, matches, results, delete_empty,
    )

    return job_store.get_job(job_id).model_dump(mode="json")


def _execute_sort_job(
    job_id: str,
    folder: str,
    matches: list[dict],
    all_results: list[MatchResult],
    delete_empty: bool,
) -> None:
    def progress_cb(done: int, total: int) -> None:
        pct = int(round(done / max(total, 1) * 100))
        job_store.update_job(job_id, status=JobStatus.running, summary={
            "progress_percent": pct,
            "current_file": f"Moving {done}/{total}",
            "moved": done,
            "total": total,
        })

    try:
        root = Path(folder).expanduser()
        result = organize_by_ean(root, matches, delete_empty, progress_cb)

        report_path = root / REPORT_NAME
        write_sort_report(
            report_path,
            [r.model_dump() for r in all_results],
            result["move_log"],
        )

        job_store.update_job(job_id, status=JobStatus.completed, output_path=str(root), summary={
            "progress_percent": 100,
            "current_file": "Completed",
            "moved": result["moved"],
            "total": len(matches),
            "ean_folders": result["ean_folders"],
            "errors": result["errors"],
            "report_path": str(report_path),
            "unmatched": sum(1 for r in all_results if r.status == "unmatched"),
            "deleted_empty_folders": result.get("deleted_empty_folders", 0),
        })
    except Exception as exc:
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc))


# ---------------------------------------------------------------------------
# Report utilities
# ---------------------------------------------------------------------------


@router.post("/report/open")
def open_report_file(payload: dict) -> dict:
    folder = payload.get("folder", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    report = Path(folder).expanduser() / REPORT_NAME
    if not report.is_file():
        raise HTTPException(status_code=404, detail="Report has not been created yet.")
    os.startfile(report)
    return {"ok": True, "report": str(report)}


@router.post("/report/export")
def export_report(payload: dict) -> dict:
    folder = payload.get("folder", "")
    destination = payload.get("destination", "")
    if not folder or not destination:
        raise HTTPException(status_code=400, detail="folder and destination are required")

    import shutil
    report = Path(folder).expanduser() / REPORT_NAME
    if not report.is_file():
        raise HTTPException(status_code=404, detail="Report has not been created yet.")
    dest = Path(destination)
    if dest.suffix.lower() != ".xlsx":
        dest = dest.with_suffix(".xlsx")
    shutil.copy2(report, dest)
    return {"ok": True, "report": str(dest)}


# ---------------------------------------------------------------------------
# Thumbnail helpers
# ---------------------------------------------------------------------------


def _thumbnail_for_item(item: Path) -> str:
    if item.is_file() and item.suffix.lower() in IMAGE_SUFFIXES:
        return _data_url(item)
    if item.is_dir():
        for img in sorted(item.rglob("*"), key=lambda p: str(p).lower()):
            if img.is_file() and img.suffix.lower() in IMAGE_SUFFIXES:
                return _data_url(img)
    return ""


def _data_url(path: Path) -> str:
    try:
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        encoded = base64.b64encode(path.read_bytes()).decode("ascii")
        return f"data:{mime};base64,{encoded}"
    except Exception:
        return ""


# ---------------------------------------------------------------------------
# Reveal
# ---------------------------------------------------------------------------


@router.post("/reveal")
def reveal_folder(payload: dict) -> dict:
    folder = payload.get("folder", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.exists():
        raise HTTPException(status_code=404, detail=f"Path does not exist: {root}")
    os.startfile(root)
    return {"ok": True}


# ===========================================================================
# CATEGORIZE — preserved from v1 (status-file-based folder creation)
# ===========================================================================

NOT_FOUND = "not found"


@router.post("/categorize/create-folders")
def create_category_folders(payload: dict) -> dict:
    folder = payload.get("folder", "")
    categories = payload.get("categories", [])
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    if not categories:
        raise HTTPException(status_code=400, detail="categories list is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    created = []
    for cat in categories:
        cat_dir = root / cat
        cat_dir.mkdir(exist_ok=True)
        created.append(str(cat_dir))
    return {"ok": True, "created": created, "count": len(created)}


@router.post("/categorize/move")
def move_to_category(payload: dict) -> dict:
    folder = payload.get("folder", "")
    category = payload.get("category", "")
    paths = payload.get("paths", [])
    if not folder or not category:
        raise HTTPException(status_code=400, detail="folder and category are required")
    if not paths:
        raise HTTPException(status_code=400, detail="paths list is required")
    root = Path(folder).expanduser()
    target = root / category
    if not target.is_dir():
        raise HTTPException(status_code=400, detail=f"Category folder does not exist: {target}")

    moved = 0
    errors = []
    for p in paths:
        src = Path(p)
        if not src.exists():
            errors.append(f"Not found: {p}")
            continue
        dest = target / src.name
        if dest.exists():
            stem = src.stem if src.is_file() else src.name
            suffix = src.suffix if src.is_file() else ""
            counter = 1
            while dest.exists():
                dest = target / f"{stem}_{counter}{suffix}"
                counter += 1
        import shutil
        shutil.move(str(src), str(dest))
        moved += 1
    return {"ok": True, "moved": moved, "errors": errors}


@router.post("/categorize/uncategorized")
def get_uncategorized(payload: dict) -> dict:
    folder = payload.get("folder", "")
    if not folder:
        raise HTTPException(status_code=400, detail="folder is required")
    root = Path(folder).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    from .scanner import deep_scan as _scan
    scan_result = _scan(root)
    items = []
    for img in scan_result["images"]:
        ean = extract_ean(img.name, is_file=True)
        if not ean:
            items.append({
                "name": img.name,
                "path": img.path,
                "kind": "file",
                "type": Path(img.name).suffix.lstrip(".").upper(),
                "oldFolder": img.source_folder,
                "thumbnail": _thumbnail_for_item(Path(img.path)),
            })
    return {"ok": True, "items": items, "count": len(items)}


@router.post("/categorize/read-status-file")
async def read_status_file(file: UploadFile = File(...)) -> dict:
    import tempfile
    tmp = Path(tempfile.mktemp(suffix=".xlsx"))
    content = await file.read()
    tmp.write_bytes(content)
    try:
        return _read_status_workbook(tmp, file.filename or tmp.name)
    finally:
        try:
            tmp.unlink()
        except OSError:
            pass


@router.post("/categorize/read-status-file-path")
def read_status_file_path(payload: dict) -> dict:
    file_path = payload.get("path", "")
    if not file_path:
        raise HTTPException(status_code=400, detail="path is required")
    source = Path(file_path).expanduser()
    if not source.is_file():
        raise HTTPException(status_code=404, detail=f"Status file not found: {source}")
    if source.suffix.lower() not in {".xlsx", ".xls"}:
        raise HTTPException(status_code=400, detail="Status file must be an .xlsx or .xls workbook")
    return _read_status_workbook(source, source.name)


def _read_status_workbook(path: Path, filename: str) -> dict:
    try:
        xls = pd.ExcelFile(path)
        df = pd.read_excel(xls, xls.sheet_names[0], dtype={"BARCODE": str})
        xls.close()
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read status workbook: {exc}") from exc

    required = {"OT ARTICLE NUMBER", "BARCODE", "STATUS", "PRODUCT NAME"}
    if not required.issubset(set(df.columns)):
        raise HTTPException(status_code=400, detail=f"Missing columns. Required: {sorted(required)}")

    brand = filename.split("_Missing_Data_Status")[0] if "_Missing_Data_Status" in filename else "BRAND"

    products = []
    no_barcode = []
    barcode_counts: Counter[str] = Counter()

    for _, row in df.iterrows():
        code = row.get("OT ARTICLE NUMBER")
        barcode_raw = row.get("BARCODE")
        status = row.get("STATUS")
        name = row.get("PRODUCT NAME")

        if pd.isna(barcode_raw) or str(barcode_raw).strip() in ("", "nan", "NaN"):
            barcode = None
        else:
            barcode = _normalize_barcode(barcode_raw)

        product = {
            "code": str(code) if pd.notna(code) else "",
            "barcode": barcode,
            "status": str(status) if pd.notna(status) else "",
            "name": str(name) if pd.notna(name) else "",
        }
        products.append(product)

        if barcode is None:
            no_barcode.append(product)
        else:
            barcode_counts[barcode] += 1

    duplicates = {bc: cnt for bc, cnt in barcode_counts.items() if cnt > 1}
    duplicate_products = [p for p in products if p["barcode"] in duplicates] if duplicates else []

    statuses: dict[str, int] = {}
    for p in products:
        s = p["status"] or "Unknown"
        statuses[s] = statuses.get(s, 0) + 1

    return {
        "ok": True,
        "brand": brand,
        "total": len(products),
        "products": products,
        "statuses": statuses,
        "no_barcode": no_barcode,
        "no_barcode_count": len(no_barcode),
        "duplicates": duplicates,
        "duplicate_products": duplicate_products,
    }


def _normalize_barcode(value: object) -> str:
    text = str(value).strip()
    if re.fullmatch(r"\d+\.0+", text):
        return text.split(".", 1)[0]
    if re.fullmatch(r"\d+", text):
        return text
    try:
        numeric = float(text)
    except ValueError:
        return text
    return str(int(numeric)) if numeric.is_integer() else text


@router.post("/categorize/create-status-folders")
def create_status_folders(payload: dict) -> dict:
    return create_status_folders_sync(payload)


@router.post("/categorize/create-status-folders-job")
def create_status_folders_job(payload: dict, background_tasks: BackgroundTasks) -> dict:
    destination = payload.get("destination", "")
    products = payload.get("products", [])
    statuses = payload.get("statuses", [])
    brand = payload.get("brand", "BRAND")
    if not destination:
        raise HTTPException(status_code=400, detail="destination is required")
    if not products:
        raise HTTPException(status_code=400, detail="products list is required")
    if not statuses:
        raise HTTPException(status_code=400, detail="statuses list is required")

    job_id = str(uuid.uuid4())
    job = job_store.create_job(
        job_id=job_id,
        job_type="ean_sorter_status_folders",
        original_filename=f"{brand} status folders",
        input_path=destination,
    )
    summary = {
        "progress_percent": 0,
        "current_file": "Queued",
        "created_count": 0,
        "skipped_count": 0,
        "total_products": len(products),
    }
    job_store.update_job(job_id, status=JobStatus.running, summary=summary)
    background_tasks.add_task(execute_status_folders_job, job_id, payload)
    return job_store.get_job(job.id).model_dump(mode="json")


def execute_status_folders_job(job_id: str, payload: dict) -> None:
    def update(progress: dict) -> None:
        current = job_store.get_job(job_id).summary or {}
        current.update(progress)
        job_store.update_job(job_id, status=JobStatus.running, summary=current)

    try:
        result = create_status_folders_sync(payload, progress_callback=update)
        summary = job_store.get_job(job_id).summary or {}
        summary.update({
            "progress_percent": 100,
            "current_file": "Completed",
            "created_count": result["count"],
            "skipped_count": result["skipped_count"],
            "created": result["created"],
            "skipped": result["skipped"],
        })
        job_store.update_job(job_id, status=JobStatus.completed, output_path=payload.get("destination", ""), error="", summary=summary)
    except Exception as exc:
        summary = job_store.get_job(job_id).summary or {}
        summary.update({"current_file": "Failed"})
        job_store.update_job(job_id, status=JobStatus.failed, error=str(exc), summary=summary)


def create_status_folders_sync(payload: dict, progress_callback=None) -> dict:
    destination = payload.get("destination", "")
    products = payload.get("products", [])
    statuses = payload.get("statuses", [])
    brand = payload.get("brand", "BRAND")
    use_name_for_no_barcode = payload.get("use_name_for_no_barcode", False)
    no_barcode_statuses = {str(status).strip() for status in payload.get("no_barcode_statuses", [])}
    per_product_for_duplicates = payload.get("per_product_for_duplicates", False)

    if not destination:
        raise HTTPException(status_code=400, detail="destination is required")
    if not statuses:
        raise HTTPException(status_code=400, detail="statuses list is required")

    root = Path(destination).expanduser()
    if not root.is_dir():
        raise HTTPException(status_code=400, detail=f"Not a folder: {root}")

    created_folders = []
    skipped = []
    selected_statuses = set(statuses)
    selected_products = [p for p in products if p.get("status", "").strip() in selected_statuses]
    total = max(1, len(selected_products))
    completed = 0

    barcode_counter: Counter[str] = Counter()
    for p in products:
        bc = p.get("barcode")
        if bc:
            barcode_counter[bc] += 1
    duplicate_barcodes = {bc for bc, cnt in barcode_counter.items() if cnt > 1}

    for p in products:
        status = p.get("status", "").strip()
        if status not in selected_statuses:
            continue
        completed += 1

        barcode = p.get("barcode")
        name = p.get("name", "")
        code = p.get("code", "")

        status_dir = root / status
        status_dir.mkdir(exist_ok=True)

        if barcode and barcode not in duplicate_barcodes:
            sub = status_dir / barcode
            sub.mkdir(exist_ok=True)
            created_folders.append(str(sub))
        elif barcode and barcode in duplicate_barcodes:
            if per_product_for_duplicates:
                safe_name = re.sub(r'[<>:"/\\|?*]', '_', name.strip())
                folder_name = f"{brand}_{safe_name}_{status}"
                sub = status_dir / folder_name
                sub.mkdir(exist_ok=True)
                created_folders.append(str(sub))
            else:
                sub = status_dir / barcode
                sub.mkdir(exist_ok=True)
                if str(sub) not in created_folders:
                    created_folders.append(str(sub))
        elif not barcode:
            if use_name_for_no_barcode and (not no_barcode_statuses or status in no_barcode_statuses):
                safe_name = re.sub(r'[<>:"/\\|?*]', '_', name.strip())
                folder_name = f"{brand}_{safe_name}_{status}"
                sub = status_dir / folder_name
                sub.mkdir(exist_ok=True)
                created_folders.append(str(sub))
            else:
                skipped.append({"code": code, "name": name, "status": status})
        if progress_callback and (completed == total or completed % 50 == 0):
            progress_callback({
                "progress_percent": int(round(completed / total * 100)),
                "current_file": f"Creating {status} folders",
                "created_count": len(created_folders),
                "skipped_count": len(skipped),
                "total_products": len(selected_products),
            })

    return {
        "ok": True,
        "created": created_folders,
        "count": len(created_folders),
        "skipped": skipped,
        "skipped_count": len(skipped),
    }
