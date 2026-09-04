from __future__ import annotations

import base64
import os
import time
import zlib
from pathlib import Path

from fastapi import HTTPException
from PIL import Image, UnidentifiedImageError

from services.ean_renamer.models import BulkFolderItem, BulkScanResponse, FolderResponse, ImageItem

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".tif",
    ".tiff",
    ".bmp",
    ".heic",
    ".avif",
}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"}
DOCUMENT_EXTENSIONS = {".pdf"}
MEDIA_EXTENSIONS = IMAGE_EXTENSIONS | VIDEO_EXTENSIONS | DOCUMENT_EXTENSIONS
SKIPPED_DIR_NAMES = {
    ".ean-renamer",
    ".git",
    "__pycache__",
    "node_modules",
    "$RECYCLE.BIN",
    "System Volume Information",
}
SKIPPED_DIR_NAMES_NORMALIZED = {name.lower() for name in SKIPPED_DIR_NAMES}
READ_DIMENSIONS_DURING_SCAN = os.environ.get("EAN_SCAN_DIMENSIONS", "").strip().lower() in {"1", "true", "yes"}


def normalize_folder(folder_path: str) -> Path:
    folder = Path(folder_path).expanduser().resolve()
    if not folder.exists() or not folder.is_dir():
        raise HTTPException(status_code=404, detail="Folder does not exist")
    return folder


def image_id_for_name(file_name: str) -> str:
    normalized = file_name.replace("\\", "/").encode("utf-8")
    token = base64.urlsafe_b64encode(zlib.compress(normalized)).decode("ascii")
    return token.rstrip("=")


def file_name_from_image_id(image_id: str) -> str:
    padding = "=" * (-len(image_id) % 4)
    try:
        raw = base64.urlsafe_b64decode((image_id + padding).encode("ascii"))
        try:
            return zlib.decompress(raw).decode("utf-8")
        except zlib.error:
            return raw.decode("utf-8")
    except Exception as exc:
        raise HTTPException(status_code=422, detail="Invalid image id") from exc


def get_image_path(folder: Path, image_id: str) -> Path:
    file_name = file_name_from_image_id(image_id)
    candidate = (folder / file_name).resolve()
    try:
        candidate.relative_to(folder)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid image path") from exc
    if ".ean-renamer" in candidate.parts:
        raise HTTPException(status_code=400, detail="Invalid image path")
    if not candidate.exists() or not candidate.is_file():
        raise HTTPException(status_code=404, detail="Image does not exist")
    if candidate.suffix.lower() not in MEDIA_EXTENSIONS:
        raise HTTPException(status_code=415, detail="File is not a supported media file")
    return candidate


def scan_folder(folder_path: str) -> FolderResponse:
    folder = normalize_folder(folder_path)
    images = collect_images(folder, folder.name, folder)
    return FolderResponse(folderPath=str(folder), ean=folder.name, images=images)


_SCAN_CACHE: dict[str, tuple[float, FolderResponse]] = {}
_SCAN_CACHE_TTL_SECONDS = 5.0


def scan_root_folder(folder_path: str) -> FolderResponse:
    root = normalize_folder(folder_path)
    cache_key = str(root)
    now = time.monotonic()
    cached = _SCAN_CACHE.get(cache_key)
    if cached is not None and (now - cached[0]) < _SCAN_CACHE_TTL_SECONDS:
        return cached[1]

    images: list[ImageItem] = []

    direct_images = collect_direct_images(root, root.name, root)
    if direct_images:
        images.extend(direct_images)

    try:
        children = sorted(root.iterdir(), key=lambda item: item.name.lower())
    except OSError as exc:
        raise HTTPException(status_code=403, detail="Could not read selected folder (permission denied)") from exc

    for child in children:
        if not child.is_dir() or child.name.lower() in SKIPPED_DIR_NAMES_NORMALIZED:
            continue
        images.extend(collect_images(child, child.name, root))

    response = FolderResponse(folderPath=str(root), ean=root.name, images=images)
    _SCAN_CACHE[cache_key] = (now, response)
    return response


def scan_bulk_folders(folder_path: str) -> BulkScanResponse:
    root = normalize_folder(folder_path)
    folders: list[BulkFolderItem] = []

    direct_count, direct_documents, direct_samples = summarize_bulk_media(root, root.name, root, direct_only=True)
    if direct_count:
        folders.append(bulk_item_for_summary("__root__", root, ".", direct_count, direct_documents, direct_samples))

    try:
        children = sorted(root.iterdir(), key=lambda item: item.name.lower())
    except OSError as exc:
        raise HTTPException(status_code=403, detail="Could not read selected folder (permission denied)") from exc

    for child in children:
        if not child.is_dir() or child.name.lower() in SKIPPED_DIR_NAMES_NORMALIZED:
            continue
        count, document_count, samples = summarize_bulk_media(child, child.name, root)
        if count:
            relative_path = child.relative_to(root).as_posix()
            folders.append(bulk_item_for_summary(relative_path, child, relative_path, count, document_count, samples))

    return BulkScanResponse(
        folderPath=str(root),
        totalFolders=len(folders),
        totalImages=sum(item.imageCount for item in folders),
        folders=folders,
    )


def invalidate_scan_cache(folder_path: str | None = None) -> None:
    if folder_path is None:
        _SCAN_CACHE.clear()
        return
    try:
        key = str(Path(folder_path).expanduser().resolve())
    except OSError:
        return
    _SCAN_CACHE.pop(key, None)


def collect_images(folder: Path, ean: str, root: Path) -> list[ImageItem]:
    images: list[ImageItem] = []
    for path in media_files_under(folder):
        item = image_item_for_path(path, ean, root)
        if item:
            images.append(item)
    return images


def summarize_bulk_media(
    folder: Path,
    ean: str,
    root: Path,
    *,
    direct_only: bool = False,
    sample_limit: int = 4,
) -> tuple[int, int, list[ImageItem]]:
    """Return a lightweight bulk-folder summary without serialising every file.

    The workspace requests the complete media list only after a user opens a folder.
    Documents are intentionally included here so PDF artwork cannot disappear from
    a bulk queue, while video remains outside this image-and-artwork workflow.
    """
    count = 0
    document_count = 0
    samples: list[ImageItem] = []
    extensions = IMAGE_EXTENSIONS | DOCUMENT_EXTENSIONS

    def add(path: Path) -> None:
        nonlocal count, document_count
        if path.suffix.lower() not in extensions:
            return
        count += 1
        if path.suffix.lower() in DOCUMENT_EXTENSIONS:
            document_count += 1
        if len(samples) < sample_limit:
            item = image_item_for_path(path, ean, root)
            if item:
                samples.append(item)

    if direct_only:
        try:
            for path in sorted(folder.iterdir(), key=lambda item: item.name.lower()):
                if path.is_file():
                    add(path)
        except OSError:
            return 0, 0, []
        return count, document_count, samples

    def on_walk_error(_: OSError) -> None:
        return None

    for current_root, dir_names, file_names in os.walk(folder, topdown=True, onerror=on_walk_error):
        dir_names[:] = sorted(
            [name for name in dir_names if name.lower() not in SKIPPED_DIR_NAMES_NORMALIZED],
            key=str.lower,
        )
        current_path = Path(current_root)
        for file_name in sorted(file_names, key=str.lower):
            add(current_path / file_name)
    return count, document_count, samples


def bulk_item_for_summary(
    key: str,
    folder: Path,
    relative_path: str,
    file_count: int,
    document_count: int,
    samples: list[ImageItem],
) -> BulkFolderItem:
    return BulkFolderItem(
        key=key,
        folderPath=str(folder),
        relativePath=relative_path,
        name=folder.name,
        imageCount=file_count,
        documentCount=document_count,
        imageIds=[image.id for image in samples],
        images=samples,
        sampleImages=samples,
    )


def collect_direct_images(folder: Path, ean: str, root: Path) -> list[ImageItem]:
    images: list[ImageItem] = []
    try:
        paths = sorted(folder.iterdir(), key=lambda item: item.name.lower())
    except OSError:
        return images
    for path in paths:
        if not path.is_file() or path.suffix.lower() not in MEDIA_EXTENSIONS:
            continue
        item = image_item_for_path(path, ean, root)
        if item:
            images.append(item)
    return images


def image_item_for_path(path: Path, ean: str, root: Path) -> ImageItem | None:
    relative_path = path.relative_to(root).as_posix()
    width: int | None = None
    height: int | None = None
    if READ_DIMENSIONS_DURING_SCAN and path.suffix.lower() in IMAGE_EXTENSIONS:
        try:
            with Image.open(path) as image:
                width, height = image.size
        except (OSError, UnidentifiedImageError):
            pass

    try:
        stat = path.stat()
    except OSError:
        return None

    return ImageItem(
        id=image_id_for_name(relative_path),
        name=path.name,
        extension=path.suffix.lower(),
        sizeBytes=stat.st_size,
        modifiedTime=stat.st_mtime,
        width=width,
        height=height,
        ean=ean,
        relativePath=relative_path,
    )


def safe_media_files_under(folder: Path) -> list[Path]:
    paths: list[Path] = []

    def on_walk_error(error: OSError) -> None:
        return None

    for current_root, dir_names, file_names in os.walk(folder, topdown=True, onerror=on_walk_error):
        dir_names[:] = sorted(
            [name for name in dir_names if name.lower() not in SKIPPED_DIR_NAMES_NORMALIZED],
            key=str.lower,
        )
        current_path = Path(current_root)
        for file_name in sorted(file_names, key=str.lower):
            path = current_path / file_name
            if path.suffix.lower() in MEDIA_EXTENSIONS:
                paths.append(path)
    return paths


def safe_image_files_under(folder: Path) -> list[Path]:
    paths: list[Path] = []

    def on_walk_error(error: OSError) -> None:
        return None

    for current_root, dir_names, file_names in os.walk(folder, topdown=True, onerror=on_walk_error):
        dir_names[:] = sorted(
            [name for name in dir_names if name.lower() not in SKIPPED_DIR_NAMES_NORMALIZED],
            key=str.lower,
        )
        current_path = Path(current_root)
        for file_name in sorted(file_names, key=str.lower):
            path = current_path / file_name
            if path.suffix.lower() in IMAGE_EXTENSIONS:
                paths.append(path)
    return paths


def media_files_under(folder: Path) -> list[Path]:
    return sorted(safe_media_files_under(folder), key=lambda item: item.relative_to(folder).as_posix().lower())


def image_files_under(folder: Path) -> list[Path]:
    return sorted(safe_image_files_under(folder), key=lambda item: item.relative_to(folder).as_posix().lower())
