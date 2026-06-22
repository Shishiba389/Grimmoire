from __future__ import annotations

import json
import shutil
import uuid
from datetime import datetime
from pathlib import Path

from fastapi import HTTPException

from services.ean_renamer.models import ApplyRenameResponse, RenamePlanItem, RenameRequest
from services.ean_renamer.services.folder_scanner import normalize_folder
from services.ean_renamer.services.rename_planner import build_rename_plan


def log_dir(folder: Path) -> Path:
    path = folder / ".ean-renamer" / "logs"
    path.mkdir(parents=True, exist_ok=True)
    return path


def apply_rename(request: RenameRequest) -> ApplyRenameResponse:
    folder = normalize_folder(request.folderPath)
    plan = build_rename_plan(request)
    if plan.conflicts:
        raise HTTPException(status_code=409, detail={"conflicts": plan.conflicts})
    if not plan.items:
        raise HTTPException(status_code=400, detail="No images selected for rename")

    if request.outputFolderPath:
        output_folder = normalize_output_folder(request.outputFolderPath, folder)
        apply_copy(folder, output_folder, plan.items)
        log_path = write_log(folder, plan.items, mode="copy", output_folder=output_folder)
        return ApplyRenameResponse(
            ean=plan.ean,
            items=plan.items,
            logPath=str(log_path),
            mode="copy",
            outputFolderPath=str(output_folder),
        )

    temp_id = uuid.uuid4().hex
    temp_paths: list[tuple[RenamePlanItem, Path]] = []

    try:
        for index, item in enumerate(plan.items, start=1):
            source = folder / item.oldName
            if not source.exists():
                raise HTTPException(status_code=404, detail=f"Missing source file: {item.oldName}")
            temp_path = folder / f".ean-renamer-tmp-{temp_id}-{index}{source.suffix.lower()}"
            source.rename(temp_path)
            temp_paths.append((item, temp_path))

        for item, temp_path in temp_paths:
            target = folder / item.newName
            if target.exists():
                raise HTTPException(status_code=409, detail=f"Target already exists: {item.newName}")
            temp_path.rename(target)
    except Exception:
        rollback_temp_files(folder, temp_paths)
        raise

    log_path = write_log(folder, plan.items, mode="rename", output_folder=None)
    return ApplyRenameResponse(ean=plan.ean, items=plan.items, logPath=str(log_path), mode="rename")


def normalize_output_folder(output_folder_path: str, source_folder: Path) -> Path:
    output_folder = Path(output_folder_path).expanduser().resolve()
    if is_filesystem_root(output_folder):
        output_folder = output_folder / "EAN_Image_Renamer_Output"
    if output_folder == source_folder:
        raise HTTPException(status_code=400, detail="Output folder must be different from the source folder")
    output_folder.mkdir(parents=True, exist_ok=True)
    if not output_folder.exists() or not output_folder.is_dir():
        raise HTTPException(status_code=400, detail="Output folder is not available")
    return output_folder


def is_filesystem_root(path: Path) -> bool:
    return path == path.parent


def apply_copy(folder: Path, output_folder: Path, items: list[RenamePlanItem]) -> None:
    copied_targets: list[Path] = []
    try:
        for item in items:
            source = folder / item.oldName
            if not source.exists():
                raise HTTPException(status_code=404, detail=f"Missing source file: {item.oldName}")

            target = output_folder / item.newName
            if target.exists():
                raise HTTPException(status_code=409, detail=f"Output file already exists: {item.newName}")

            shutil.copy2(source, target)
            copied_targets.append(target)
    except Exception:
        for target in copied_targets:
            if target.exists():
                target.unlink()
        raise


def rollback_temp_files(folder: Path, temp_paths: list[tuple[RenamePlanItem, Path]]) -> None:
    for item, temp_path in reversed(temp_paths):
        original = folder / item.oldName
        if temp_path.exists() and not original.exists():
            temp_path.rename(original)


def write_log(folder: Path, items: list[RenamePlanItem], mode: str, output_folder: Path | None) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    path = log_dir(folder) / f"rename-log-{timestamp}.json"
    payload = {
        "createdAt": datetime.now().isoformat(timespec="seconds"),
        "folder": str(folder),
        "mode": mode,
        "outputFolder": str(output_folder) if output_folder else None,
        "items": [item.model_dump() for item in items],
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return path
