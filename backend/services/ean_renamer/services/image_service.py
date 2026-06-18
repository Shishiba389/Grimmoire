from __future__ import annotations

import hashlib
import os
import subprocess
import sys
import threading
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

try:
    import pillow_heif  # type: ignore
    pillow_heif.register_heif_opener()
except ImportError:
    pass

# AVIF support is built into Pillow >= 11.2 (no separate plugin needed).

try:
    import imageio_ffmpeg  # type: ignore
    _FFMPEG_EXE: str | None = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    _FFMPEG_EXE = None

Image.MAX_IMAGE_PIXELS = None  # disable DecompressionBomb guard - we trust local user files

_SUBPROCESS_FLAGS = 0
if sys.platform == "win32":
    _SUBPROCESS_FLAGS = getattr(subprocess, "CREATE_NO_WINDOW", 0x08000000)

from services.ean_renamer.services.folder_scanner import DOCUMENT_EXTENSIONS, VIDEO_EXTENSIONS, get_image_path, normalize_folder

_THUMB_LOCKS: dict[str, threading.Lock] = {}
_THUMB_LOCKS_GUARD = threading.Lock()


def _lock_for(key: str) -> threading.Lock:
    with _THUMB_LOCKS_GUARD:
        lock = _THUMB_LOCKS.get(key)
        if lock is None:
            lock = threading.Lock()
            _THUMB_LOCKS[key] = lock
        return lock


def thumbnail_cache_dir(folder: Path) -> Path:
    cache_dir = folder / ".ean-renamer" / "thumbs"
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir


def get_original_image(folder_path: str, image_id: str) -> Path:
    folder = normalize_folder(folder_path)
    return get_image_path(folder, image_id)


def get_thumbnail(folder_path: str, image_id: str) -> Path:
    folder = normalize_folder(folder_path)
    image_path = get_image_path(folder, image_id)
    stat = image_path.stat()
    cache_key = f"{image_path.relative_to(folder).as_posix()}:{stat.st_size}:{stat.st_mtime_ns}".encode("utf-8")
    thumb_name = hashlib.sha1(cache_key).hexdigest() + ".jpg"
    thumb_path = thumbnail_cache_dir(folder) / thumb_name

    if thumb_path.exists():
        return thumb_path

    lock = _lock_for(thumb_name)
    with lock:
        if thumb_path.exists():
            return thumb_path

        if image_path.suffix.lower() in VIDEO_EXTENSIONS:
            extracted = False
            try:
                extracted = _extract_video_frame(image_path, thumb_path)
            except Exception:
                extracted = False
            if extracted:
                _overlay_play_icon(thumb_path)
            else:
                create_media_placeholder(thumb_path, image_path.suffix.lower(), "VIDEO", "#7f8a57")
            return thumb_path

        if image_path.suffix.lower() in DOCUMENT_EXTENSIONS:
            create_media_placeholder(thumb_path, image_path.suffix.lower(), "PDF", "#a45151")
            return thumb_path

        try:
            with Image.open(image_path) as image:
                image.load()
                if getattr(image, "is_animated", False):
                    try:
                        image.seek(0)
                    except (EOFError, OSError):
                        pass
                try:
                    image = ImageOps.exif_transpose(image) or image
                except Exception:
                    pass
                if image.mode == "P":
                    image = image.convert("RGBA") if "transparency" in image.info else image.convert("RGB")
                elif image.mode == "CMYK":
                    image = image.convert("RGB")
                elif image.mode == "1":
                    image = image.convert("L")
                elif image.mode == "I" or image.mode == "F":
                    image = image.convert("L")
                elif image.mode not in ("RGB", "RGBA", "L", "LA"):
                    image = image.convert("RGB")
                image.thumbnail((420, 420), Image.LANCZOS)
                background = Image.new("RGB", image.size, "white")
                if image.mode in ("RGBA", "LA"):
                    channels = image.split()
                    background.paste(image, mask=channels[-1])
                elif image.mode == "RGB":
                    background.paste(image)
                else:
                    background.paste(image.convert("RGB"))
                background.save(thumb_path, "JPEG", quality=82, optimize=True)
        except Exception:
            try:
                create_media_placeholder(thumb_path, image_path.suffix.lower(), "BROKEN", "#b94c4c")
            except Exception:
                pass

    return thumb_path


def _extract_video_frame(video_path: Path, output_path: Path, max_size: int = 420) -> bool:
    """Use ffmpeg to grab a representative frame. Returns True on success."""
    if not _FFMPEG_EXE:
        return False
    common_args = [
        _FFMPEG_EXE, "-y",
        "-hide_banner", "-loglevel", "error",
        "-nostdin",
    ]
    scale = f"scale='if(gt(iw,ih),min({max_size},iw),-2)':'if(gt(ih,iw),min({max_size},ih),-2)'"
    # First attempt: smart thumbnail filter at 0.5s in (avoids black opening frame).
    attempts = [
        [*common_args, "-ss", "0.5", "-i", str(video_path),
         "-vf", f"thumbnail,{scale}", "-frames:v", "1", "-f", "image2", str(output_path)],
        # Fallback: very short clip, just take the first frame.
        [*common_args, "-i", str(video_path),
         "-vf", scale, "-frames:v", "1", "-f", "image2", str(output_path)],
    ]
    for cmd in attempts:
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                timeout=20,
                check=False,
                creationflags=_SUBPROCESS_FLAGS,
            )
        except (subprocess.TimeoutExpired, OSError):
            continue
        if result.returncode == 0 and output_path.exists():
            try:
                if output_path.stat().st_size > 0:
                    return True
            except OSError:
                continue
        try:
            if output_path.exists():
                os.unlink(output_path)
        except OSError:
            pass
    return False


def _overlay_play_icon(thumb_path: Path) -> None:
    """Composite a translucent play badge so users distinguish video at a glance."""
    try:
        with Image.open(thumb_path) as base:
            canvas = base.convert("RGBA")
        overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        w, h = canvas.size
        cx, cy = w // 2, h // 2
        radius = max(28, min(w, h) // 7)
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            fill=(0, 0, 0, 150),
        )
        tri_half = int(radius * 0.55)
        triangle = [
            (cx - tri_half // 2, cy - tri_half),
            (cx - tri_half // 2, cy + tri_half),
            (cx + tri_half, cy),
        ]
        draw.polygon(triangle, fill=(255, 255, 255, 235))
        merged = Image.alpha_composite(canvas, overlay).convert("RGB")
        merged.save(thumb_path, "JPEG", quality=82, optimize=True)
    except Exception:
        pass  # decorative only


def create_media_placeholder(thumb_path: Path, extension: str, label: str, color: str) -> None:
    image = Image.new("RGB", (420, 420), "#f3f4f0")
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((110, 122, 310, 282), radius=18, fill="#ffffff", outline="#d9dcd2", width=3)
    if label == "VIDEO":
        draw.polygon([(186, 166), (186, 238), (246, 202)], fill=color)
    elif label == "BROKEN":
        draw.line((150, 160, 270, 250), fill=color, width=8)
        draw.line((270, 160, 150, 250), fill=color, width=8)
    else:
        draw.rectangle((168, 154, 252, 250), fill=color)
        draw.rectangle((188, 174, 232, 182), fill="#ffffff")
        draw.rectangle((188, 194, 232, 202), fill="#ffffff")
        draw.rectangle((188, 214, 218, 222), fill="#ffffff")
    caption = label if label == "BROKEN" else extension.lstrip(".").upper()
    draw.text((210, 316), caption, fill=color, anchor="mm")
    image.save(thumb_path, "JPEG", quality=82, optimize=True)
