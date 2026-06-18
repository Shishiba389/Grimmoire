"""EAN Renamer — FastAPI router.
Ported from NAMING_SAMPLE/backend/app/main.py.
"""
from __future__ import annotations

import logging
import threading
import time

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from pathlib import Path

from services.ean_renamer.models import (
    ApplyRenameResponse,
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
from services.ean_renamer.services.folder_scanner import scan_folder, scan_root_folder
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


@router.get("/images/{image_id}/thumbnail")
def thumbnail(image_id: str, folderPath: str) -> FileResponse:
    path = get_thumbnail(folderPath, image_id)
    return FileResponse(path, media_type="image/jpeg", headers=_STATIC_CACHE_HEADERS)


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
