"""EAN Sorter v2 — deep recursive scanner with loose-image detection."""
from __future__ import annotations

import shutil
from pathlib import Path

from services.ean_renamer.services.folder_scanner import (
    IMAGE_EXTENSIONS,
    SKIPPED_DIR_NAMES_NORMALIZED,
)

from .models import ImageRecord

LOOSE_FOLDER_NAME = "_LOOSE_IMAGES"


def _is_skipped(name: str) -> bool:
    return name.startswith(".") or name.lower() in SKIPPED_DIR_NAMES_NORMALIZED


def _is_image(path: Path) -> bool:
    return path.suffix.lower() in IMAGE_EXTENSIONS


def deep_scan(root: Path) -> dict:
    root = root.resolve()
    images: list[ImageRecord] = []
    loose_images: list[ImageRecord] = []
    subfolder_names: set[str] = set()

    import os
    for dirpath_str, dirnames, filenames in os.walk(root):
        dirpath = Path(dirpath_str)
        dirnames[:] = [d for d in dirnames if not _is_skipped(d)]
        dirnames.sort(key=str.lower)

        rel_dir = dirpath.relative_to(root)
        is_root = dirpath == root

        if not is_root:
            subfolder_names.add(str(rel_dir).split("\\")[0].split("/")[0])

        for fname in sorted(filenames, key=str.lower):
            fpath = dirpath / fname
            if not _is_image(fpath):
                continue

            try:
                size = fpath.stat().st_size
            except OSError:
                size = 0

            record = ImageRecord(
                path=str(fpath),
                name=fname,
                source_folder=str(dirpath),
                relative_path=str(fpath.relative_to(root)),
                size_bytes=size,
            )
            images.append(record)
            if is_root:
                loose_images.append(record)

    return {
        "images": images,
        "loose_images": loose_images,
        "subfolder_count": len(subfolder_names),
        "total_count": len(images),
    }


def collect_loose_images(root: Path) -> dict:
    root = root.resolve()
    dest = root / LOOSE_FOLDER_NAME
    dest.mkdir(exist_ok=True)

    moved: list[dict] = []
    for item in sorted(root.iterdir(), key=lambda p: p.name.lower()):
        if not item.is_file() or not _is_image(item):
            continue

        target = dest / item.name
        if target.exists():
            stem, suffix = item.stem, item.suffix
            counter = 1
            while target.exists():
                target = dest / f"{stem}_{counter}{suffix}"
                counter += 1

        shutil.move(str(item), str(target))
        moved.append({
            "original": item.name,
            "destination": str(target),
        })

    return {
        "moved": moved,
        "dest_folder": str(dest),
        "count": len(moved),
    }
