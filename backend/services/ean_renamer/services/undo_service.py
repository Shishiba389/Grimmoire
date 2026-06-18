from __future__ import annotations

import json
from pathlib import Path

from fastapi import HTTPException

from services.ean_renamer.models import RenamePlanItem, UndoRequest, UndoResponse
from services.ean_renamer.services.folder_scanner import invalidate_scan_cache, normalize_folder


def undo_rename(request: UndoRequest) -> UndoResponse:
    folder = normalize_folder(request.folderPath)
    invalidate_scan_cache(str(folder))
    log_path = resolve_log_path(folder, request.logPath)
    payload = json.loads(log_path.read_text(encoding="utf-8"))
    items = [RenamePlanItem(**item) for item in payload.get("items", [])]
    if not items:
        raise HTTPException(status_code=400, detail="Log does not contain rename items")

    mode = payload.get("mode", "rename")
    if mode == "batch_rename":
        undone: list[RenamePlanItem] = []
        try:
            for item in reversed(items):
                current = folder / (item.outputRelativePath or item.newName)
                original = folder / item.oldName
                if not current.exists():
                    raise HTTPException(status_code=404, detail=f"Cannot undo, missing file: {item.outputRelativePath or item.newName}")
                if original.exists():
                    raise HTTPException(status_code=409, detail=f"Cannot undo, original name exists: {item.oldName}")
                current.rename(original)
                undone.append(item)
        except Exception:
            for item in reversed(undone):
                re_original = folder / item.oldName
                re_current = folder / (item.outputRelativePath or item.newName)
                if re_original.exists() and not re_current.exists():
                    re_original.rename(re_current)
            raise

        excel_report = payload.get("excelReport")
        if excel_report:
            report_path = Path(excel_report).expanduser().resolve()
            logs_dir = folder / ".ean-renamer" / "logs"
            if is_relative_to(report_path, logs_dir.resolve()) and report_path.exists():
                report_path.unlink()
        return UndoResponse(restored=list(reversed(undone)), logPath=str(log_path))

    if mode in {"copy", "batch_copy"}:
        output_folder_raw = payload.get("outputFolder")
        output_folders_raw = payload.get("outputFolders") or {}
        if not output_folder_raw and not output_folders_raw:
            raise HTTPException(status_code=400, detail="Copy log does not contain output folder")
        output_folder = Path(output_folder_raw).expanduser().resolve() if output_folder_raw else None
        output_folders = {
            category: Path(path).expanduser().resolve()
            for category, path in output_folders_raw.items()
        }
        restored: list[RenamePlanItem] = []
        fallback_folder = output_folder or next(iter(output_folders.values()), None)
        for item in reversed(items):
            item_output_folder = output_folders.get(item.category) or fallback_folder
            if not item_output_folder:
                raise HTTPException(status_code=400, detail=f"Missing output folder for {item.category}")
            copied = item_output_folder / item.outputRelativePath if item.outputRelativePath else item_output_folder / item.newName
            if copied.exists():
                copied.unlink()
            restored.append(item)
        excel_report = payload.get("excelReport")
        if excel_report:
            report_path = Path(excel_report).expanduser().resolve()
            allowed_roots = [path for path in output_folders.values()]
            if output_folder:
                allowed_roots.append(output_folder)
            if any(is_relative_to(report_path, root) for root in allowed_roots) and report_path.exists():
                report_path.unlink()
        return UndoResponse(restored=list(reversed(restored)), logPath=str(log_path))

    undone: list[RenamePlanItem] = []
    try:
        for item in reversed(items):
            current = folder / item.newName
            original = folder / item.oldName
            if not current.exists():
                raise HTTPException(status_code=404, detail=f"Cannot undo, missing file: {item.newName}")
            if original.exists():
                raise HTTPException(status_code=409, detail=f"Cannot undo, original name exists: {item.oldName}")
            current.rename(original)
            undone.append(item)
    except Exception:
        for item in reversed(undone):
            re_original = folder / item.oldName
            re_current = folder / item.newName
            if re_original.exists() and not re_current.exists():
                re_original.rename(re_current)
        raise

    return UndoResponse(restored=list(reversed(undone)), logPath=str(log_path))


def resolve_log_path(folder: Path, log_path: str | None) -> Path:
    logs_dir = folder / ".ean-renamer" / "logs"
    if log_path:
        candidate = Path(log_path).expanduser().resolve()
        if not is_relative_to(candidate, logs_dir.resolve()):
            raise HTTPException(status_code=400, detail="Log path must be inside this folder log directory")
        if not candidate.exists():
            raise HTTPException(status_code=404, detail="Log file does not exist")
        return candidate

    all_logs = [
        *logs_dir.glob("rename-log-*.json"),
        *logs_dir.glob("batch-copy-log-*.json"),
        *logs_dir.glob("batch-rename-log-*.json"),
    ]
    logs = sorted(all_logs, key=lambda p: p.stat().st_mtime, reverse=True)
    if not logs:
        raise HTTPException(status_code=404, detail="No rename log found")
    return logs[0]


def is_relative_to(path: Path, root: Path) -> bool:
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False
