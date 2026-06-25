"""EAN Sorter v2 — move images into EAN-named folders."""
from __future__ import annotations

import shutil
from pathlib import Path


def _resolve_conflict(dest_dir: Path, name: str) -> Path:
    target = dest_dir / name
    if not target.exists():
        return target
    stem = Path(name).stem
    suffix = Path(name).suffix
    counter = 1
    while target.exists():
        target = dest_dir / f"{stem}_{counter}{suffix}"
        counter += 1
    return target


def organize_by_ean(
    root: Path,
    matches: list[dict],
    delete_empty: bool = False,
    progress_cb: callable | None = None,
) -> dict:
    root = root.resolve()
    moved = 0
    errors: list[str] = []
    ean_folders: set[str] = set()
    move_log: list[dict] = []
    total = len(matches)

    for i, entry in enumerate(matches):
        src = Path(entry["image_path"])
        ean = entry.get("ean", "").strip()

        if not ean:
            errors.append(f"No EAN for '{src.name}'")
            continue

        if not src.exists():
            errors.append(f"File not found: '{src}'")
            continue

        dest_dir = root / ean
        dest_dir.mkdir(exist_ok=True)
        ean_folders.add(ean)

        target = _resolve_conflict(dest_dir, src.name)
        try:
            shutil.move(str(src), str(target))
            moved += 1
            move_log.append({
                "image_name": src.name,
                "ean": ean,
                "source": str(src.parent),
                "destination": str(dest_dir),
                "final_name": target.name,
            })
        except OSError as exc:
            errors.append(f"Failed to move '{src.name}': {exc}")

        if progress_cb and (i + 1) % 20 == 0:
            progress_cb(i + 1, total)

    if progress_cb and total > 0:
        progress_cb(total, total)

    deleted_empty = 0
    if delete_empty:
        deleted_empty = _remove_empty_folders(root)

    return {
        "moved": moved,
        "ean_folders": sorted(ean_folders),
        "errors": errors,
        "move_log": move_log,
        "deleted_empty_folders": deleted_empty,
    }


def _remove_empty_folders(root: Path) -> int:
    count = 0
    for dirpath in sorted(root.rglob("*"), key=lambda p: len(p.parts), reverse=True):
        if not dirpath.is_dir():
            continue
        try:
            if not any(dirpath.iterdir()):
                dirpath.rmdir()
                count += 1
        except OSError:
            pass
    return count
