from __future__ import annotations

import logging
import struct
from pathlib import Path

from PIL import Image, UnidentifiedImageError

logger = logging.getLogger("grimoire.clip.media")

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".heic", ".avif",
}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"}
GIF_EXTENSION = ".gif"
SUPPORTED_EXTENSIONS = IMAGE_EXTENSIONS | VIDEO_EXTENSIONS | {GIF_EXTENSION}


class MediaType:
    IMAGE = "image"
    VIDEO = "video"
    CORRUPT = "corrupt"


def _is_animated_gif(path: Path) -> bool:
    try:
        with open(path, "rb") as f:
            header = f.read(6)
            if header[:3] != b"GIF":
                return False
            f.seek(0)
            data = f.read(min(path.stat().st_size, 5 * 1024 * 1024))
        frame_count = 0
        i = 13
        if data[10] & 0x80:
            i += 3 * (2 ** ((data[10] & 0x07) + 1))
        while i < len(data):
            if data[i] == 0x2C:
                frame_count += 1
                if frame_count > 1:
                    return True
                i += 10
                if data[i - 1] & 0x80:
                    i += 3 * (2 ** ((data[i - 1] & 0x07) + 1))
            elif data[i] == 0x21:
                i += 2
                while i < len(data) and data[i] != 0:
                    i += data[i] + 1
                i += 1
            elif data[i] == 0x3B:
                break
            else:
                break
        return False
    except Exception:
        return False


def inspect_file(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in VIDEO_EXTENSIONS:
        return MediaType.VIDEO
    if ext == GIF_EXTENSION:
        return MediaType.VIDEO if _is_animated_gif(path) else MediaType.IMAGE
    if ext in IMAGE_EXTENSIONS:
        try:
            with Image.open(path) as im:
                im.verify()
            return MediaType.IMAGE
        except (UnidentifiedImageError, OSError, SyntaxError):
            logger.warning("Corrupt image: %s", path)
            return MediaType.CORRUPT
    return MediaType.CORRUPT


def classify_media_batch(paths: list[Path]) -> dict[str, list[Path]]:
    result: dict[str, list[Path]] = {
        MediaType.IMAGE: [],
        MediaType.VIDEO: [],
        MediaType.CORRUPT: [],
    }
    for p in paths:
        media_type = inspect_file(p)
        result[media_type].append(p)
    return result
