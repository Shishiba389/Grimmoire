from __future__ import annotations

import csv
import ctypes
import base64
import hashlib
import json
import mimetypes
import os
import re
import shutil
import urllib.parse
from datetime import datetime
from pathlib import Path
from time import time

from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

router = APIRouter()

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".bmp", ".avif"}
THUMB_DIR = Path(os.environ.get(
    "GRIMOIRE_PACKSHOT_THUMB_CACHE",
    Path.home() / "AppData" / "Local" / "Grimoire" / "PackshotThumbs",
))
THUMB_MAX = 520
EAN_RE = re.compile(r"(?<!\d)(\d{8,14})(?!\d)")
DEFAULT_PAGE_SIZE = 180
MAX_PAGE_SIZE = 500
SCAN_CACHE_TTL_SECONDS = 60 * 60 * 8
SCAN_CACHE: dict[str, dict[str, object]] = {}


class ScanPayload(BaseModel):
    folder: str = Field(min_length=1)


class ImageListPayload(BaseModel):
    root: str = Field(min_length=1)
    folder: str = "."
    query: str = ""
    offset: int = Field(default=0, ge=0)
    limit: int = Field(default=DEFAULT_PAGE_SIZE, ge=1, le=MAX_PAGE_SIZE)


class CopyPayload(BaseModel):
    root: str = Field(min_length=1)
    destination: str = Field(min_length=1)
    paths: list[str] = Field(default_factory=list)
    preserve_folder_structure: bool = True
    group_by_ean: bool = False


def _is_cloud_only(path: Path) -> bool:
    if os.name != "nt":
        return False
    try:
        import ctypes

        attrs = ctypes.windll.kernel32.GetFileAttributesW(str(path))
        if attrs == -1:
            return False
        offline = 0x1000
        recall_on_open = 0x40000
        recall_on_data_access = 0x400000
        return bool(attrs & (offline | recall_on_open | recall_on_data_access))
    except Exception:
        return False


def _extract_eans(*parts: str) -> list[str]:
    found: list[str] = []
    seen: set[str] = set()
    for part in parts:
        for match in EAN_RE.findall(part or ""):
            if match not in seen:
                seen.add(match)
                found.append(match)
    return found


def _folder_key(root: Path, path: Path) -> str:
    try:
        parent = path.parent.relative_to(root).as_posix()
    except ValueError:
        parent = path.parent.name
    return parent or "."


def _group_label(root: Path, path: Path, eans: list[str]) -> str:
    for candidate in [path.parent.name, *path.parent.parts[::-1]]:
        if candidate in eans:
            return candidate
    return eans[0] if eans else path.parent.name or "Root"


def _cache_key(root: Path) -> str:
    return str(root).lower()


def _matches_query(image: dict[str, object], query: str) -> bool:
    q = query.strip().lower()
    if not q:
        return True
    haystack = " ".join([
        str(image.get("name", "")),
        str(image.get("relativePath", "")),
        str(image.get("folder", "")),
        str(image.get("groupLabel", "")),
        " ".join(str(ean) for ean in image.get("eans", [])),
        str(image.get("extension", "")),
    ]).lower()
    return q in haystack


def _folder_depth(folder: str) -> int:
    return 0 if folder == "." else folder.count("/") + 1


def _ensure_index(root: Path) -> dict[str, object]:
    key = _cache_key(root)
    cached = SCAN_CACHE.get(key)
    if cached and time() - float(cached.get("createdAt", 0)) < SCAN_CACHE_TTL_SECONDS:
        return cached
    return _build_index(root)


def _build_index(root: Path) -> dict[str, object]:
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="Folder does not exist")

    images: list[dict[str, object]] = []
    groups: dict[str, dict[str, object]] = {}
    folders: dict[str, dict[str, object]] = {
        ".": {
            "id": ".",
            "path": ".",
            "label": root.name,
            "parent": "",
            "depth": 0,
            "count": 0,
            "sizeBytes": 0,
            "localCount": 0,
            "cloudCount": 0,
        }
    }
    scanned = 0

    for path in sorted(root.rglob("*"), key=lambda p: str(p).lower()):
        if not path.is_file() or path.suffix.lower() not in IMAGE_SUFFIXES:
            continue
        scanned += 1
        try:
            stat = path.stat()
            rel = path.relative_to(root).as_posix()
            eans = _extract_eans(path.name, rel, path.parent.name)
            folder = _folder_key(root, path)
            cloud_only = _is_cloud_only(path)
            group_id = eans[0] if eans else folder
            group_label = _group_label(root, path, eans)
            item = {
                "id": hashlib.sha1(str(path).encode("utf-8", errors="ignore")).hexdigest(),
                "name": path.name,
                "path": str(path),
                "relativePath": rel,
                "folder": folder,
                "group": group_id,
                "groupLabel": group_label,
                "eans": eans,
                "extension": path.suffix.lower(),
                "sizeBytes": stat.st_size,
                "modifiedAt": datetime.fromtimestamp(stat.st_mtime).isoformat(timespec="seconds"),
                "oneDriveState": "cloud-only" if cloud_only else "local",
            }
            images.append(item)

            parts = [] if folder == "." else folder.split("/")
            for index in range(len(parts) + 1):
                subfolder = "." if index == 0 else "/".join(parts[:index])
                parent = "" if subfolder == "." else ("." if index == 1 else "/".join(parts[:index - 1]))
                folder_entry = folders.setdefault(subfolder, {
                    "id": subfolder,
                    "path": subfolder,
                    "label": root.name if subfolder == "." else parts[index - 1],
                    "parent": parent,
                    "depth": _folder_depth(subfolder),
                    "count": 0,
                    "sizeBytes": 0,
                    "localCount": 0,
                    "cloudCount": 0,
                })
                folder_entry["count"] = int(folder_entry["count"]) + 1
                folder_entry["sizeBytes"] = int(folder_entry["sizeBytes"]) + stat.st_size
                if cloud_only:
                    folder_entry["cloudCount"] = int(folder_entry["cloudCount"]) + 1
                else:
                    folder_entry["localCount"] = int(folder_entry["localCount"]) + 1

            group = groups.setdefault(group_id, {
                "id": group_id,
                "label": group_label,
                "folder": folder,
                "count": 0,
                "sizeBytes": 0,
                "eans": [],
            })
            group["count"] = int(group["count"]) + 1
            group["sizeBytes"] = int(group["sizeBytes"]) + stat.st_size
            known_eans = set(group["eans"])
            for ean in eans:
                if ean not in known_eans:
                    group["eans"].append(ean)
                    known_eans.add(ean)
        except Exception:
            continue

    index = {
        "createdAt": time(),
        "root": str(root),
        "count": len(images),
        "scanned": scanned,
        "images": images,
        "folders": sorted(folders.values(), key=lambda f: (int(f["depth"]), str(f["path"]).lower())),
        "groups": sorted(groups.values(), key=lambda g: (-int(g["count"]), str(g["label"]).lower())),
    }
    SCAN_CACHE[_cache_key(root)] = index
    return index


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "packshot-browser"}


@router.post("/scan")
def scan_packshots(payload: ScanPayload) -> dict[str, object]:
    root = Path(payload.folder).expanduser().resolve()
    index = _build_index(root)
    return {
        "ok": True,
        "root": str(root),
        "count": index["count"],
        "scanned": index["scanned"],
        "truncated": False,
        "images": [],
        "folders": index["folders"],
        "groups": index["groups"],
    }


@router.post("/images")
def list_packshot_images(payload: ImageListPayload) -> dict[str, object]:
    root = Path(payload.root).expanduser().resolve()
    index = _ensure_index(root)
    folder = payload.folder or "."
    query = payload.query or ""
    images = [
        image for image in index["images"]
        if (folder == "." or str(image.get("folder", "")) == folder)
        and _matches_query(image, query)
    ]
    start = payload.offset
    end = start + payload.limit
    return {
        "ok": True,
        "root": index["root"],
        "folder": folder,
        "query": query,
        "offset": start,
        "limit": payload.limit,
        "total": len(images),
        "images": images[start:end],
        "hasMore": end < len(images),
    }


@router.get("/file")
def get_packshot_file(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    if _is_cloud_only(target):
        raise HTTPException(status_code=409, detail="Image is cloud-only. Copy the file first to download it.")
    return FileResponse(target, media_type=mimetypes.guess_type(target.name)[0] or "application/octet-stream")


@router.get("/thumb")
def get_packshot_thumb(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    if _is_cloud_only(target):
        raise HTTPException(status_code=409, detail="Image is cloud-only. Thumbnail generation would download it.")
    return FileResponse(_thumbnail_path(target), media_type="image/jpeg")


@router.get("/shell-thumb")
def get_packshot_shell_thumb(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    thumb = _shell_cached_thumbnail_path(target)
    if thumb is None:
        raise HTTPException(status_code=404, detail="No cached Windows thumbnail is available")
    return FileResponse(thumb, media_type="image/jpeg")


@router.get("/online-thumb")
def get_packshot_online_thumb(path: str) -> FileResponse:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    thumb = _sharepoint_online_thumbnail_path(target)
    if thumb is None:
        raise HTTPException(status_code=404, detail="No SharePoint thumbnail is available")
    return FileResponse(thumb, media_type="image/jpeg")


@router.get("/online-status")
def get_packshot_online_status() -> dict[str, object]:
    cfg, cache_file = _load_sharepoint_config()
    if cfg is None:
        return {"configured": False, "authenticated": False, "message": "No SharePoint config found"}
    token = _get_sharepoint_token_silent(cfg, cache_file)
    return {
        "configured": True,
        "authenticated": bool(token),
        "spHost": cfg.get("sp_host", "orientrade.sharepoint.com"),
        "cacheFile": str(cache_file) if cache_file else "",
    }


@router.get("/meta")
def get_packshot_meta(path: str) -> dict[str, object]:
    target = Path(path).expanduser().resolve()
    if not target.is_file() or target.suffix.lower() not in IMAGE_SUFFIXES:
        raise HTTPException(status_code=404, detail="Image not found")
    stat = target.stat()
    cloud_only = _is_cloud_only(target)
    width, height = (0, 0) if cloud_only else _read_image_size(target)
    return {
        "path": str(target),
        "name": target.name,
        "extension": target.suffix.lower(),
        "sizeBytes": stat.st_size,
        "width": width,
        "height": height,
        "modifiedAt": datetime.fromtimestamp(stat.st_mtime).isoformat(timespec="seconds"),
        "oneDriveState": "cloud-only" if cloud_only else "local",
    }


@router.post("/copy")
def copy_packshots(payload: CopyPayload) -> dict[str, object]:
    root = Path(payload.root).expanduser().resolve()
    destination = Path(payload.destination).expanduser().resolve()
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="Root folder does not exist")
    if not payload.paths:
        raise HTTPException(status_code=400, detail="No images selected")
    if destination == root or root in destination.parents:
        raise HTTPException(status_code=400, detail="Output folder must be outside the scanned folder")

    destination.mkdir(parents=True, exist_ok=True)
    copied: list[dict[str, object]] = []
    errors: list[dict[str, str]] = []

    for raw_path in payload.paths:
        try:
            src = Path(raw_path).expanduser().resolve()
            src.relative_to(root)
            if not src.is_file() or src.suffix.lower() not in IMAGE_SUFFIXES:
                errors.append({"path": raw_path, "error": "not an image file"})
                continue
            eans = _extract_eans(src.name, src.parent.name, src.relative_to(root).as_posix())
            if payload.group_by_ean and eans:
                target_dir = destination / eans[0]
            elif payload.preserve_folder_structure:
                target_dir = destination / src.parent.relative_to(root)
            else:
                target_dir = destination
            target_dir.mkdir(parents=True, exist_ok=True)
            dest = _unique_path(target_dir / src.name)
            shutil.copy2(src, dest)
            copied.append({
                "source": str(src),
                "destination": str(dest),
                "name": src.name,
                "sizeBytes": dest.stat().st_size,
                "eans": eans,
            })
        except ValueError:
            errors.append({"path": raw_path, "error": "outside scan root"})
        except Exception as exc:
            errors.append({"path": raw_path, "error": str(exc)})

    report = destination / "packshot_browser_report.csv"
    _write_report(report, copied, errors)
    return {
        "ok": True,
        "destination": str(destination),
        "copiedCount": len(copied),
        "errorCount": len(errors),
        "copied": copied,
        "errors": errors,
        "report": str(report),
    }


def _unique_path(path: Path) -> Path:
    if not path.exists():
        return path
    stem, suffix = path.stem, path.suffix
    counter = 1
    while True:
        candidate = path.with_name(f"{stem}_{counter}{suffix}")
        if not candidate.exists():
            return candidate
        counter += 1


def _write_report(report: Path, copied: list[dict[str, object]], errors: list[dict[str, str]]) -> None:
    with report.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=["status", "name", "source", "destination", "sizeBytes", "eans", "error"])
        writer.writeheader()
        for item in copied:
            writer.writerow({
                "status": "copied",
                "name": item.get("name", ""),
                "source": item.get("source", ""),
                "destination": item.get("destination", ""),
                "sizeBytes": item.get("sizeBytes", ""),
                "eans": "; ".join(item.get("eans", [])),
                "error": "",
            })
        for item in errors:
            writer.writerow({
                "status": "error",
                "name": Path(item.get("path", "")).name,
                "source": item.get("path", ""),
                "destination": "",
                "sizeBytes": "",
                "eans": "",
                "error": item.get("error", ""),
            })


def _read_image_size(path: Path) -> tuple[int, int]:
    try:
        from PIL import Image

        with Image.open(path) as image:
            return int(image.width), int(image.height)
    except Exception:
        return 0, 0


def _thumbnail_path(path: Path) -> Path:
    stat = path.stat()
    key = hashlib.sha1(f"{path}|{stat.st_mtime_ns}|{stat.st_size}".encode("utf-8", errors="ignore")).hexdigest()
    target = THUMB_DIR / f"{key}.jpg"
    if target.is_file():
        return target

    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image, ImageOps

        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            image.thumbnail((THUMB_MAX, THUMB_MAX), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "L"):
                background = Image.new("RGB", image.size, "white")
                if image.mode == "RGBA":
                    background.paste(image, mask=image.getchannel("A"))
                else:
                    background.paste(image.convert("RGB"))
                image = background
            elif image.mode == "L":
                image = image.convert("RGB")
            image.save(target, "JPEG", quality=84, optimize=True)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Could not create image thumbnail: {exc}") from exc
    return target


def _load_sharepoint_config() -> tuple[dict[str, str] | None, Path | None]:
    candidates: list[Path] = []
    env_cfg = os.environ.get("GRIMOIRE_SHAREPOINT_CONFIG")
    if env_cfg:
        candidates.append(Path(env_cfg))
    here = Path(__file__).resolve()
    candidates.extend([
        here.parents[2] / "graph_config.json",
        here.parents[3] / "graph_config.json",
        Path(r"D:\FindPackShot\graph_config.json"),
    ])
    for candidate in candidates:
        if not candidate.is_file():
            continue
        try:
            cfg = json.loads(candidate.read_text(encoding="utf-8"))
        except Exception:
            continue
        if not cfg.get("tenant_id") or not cfg.get("client_id"):
            continue
        cache_candidates: list[Path] = []
        env_cache = os.environ.get("GRIMOIRE_SHAREPOINT_TOKEN_CACHE")
        if env_cache:
            cache_candidates.append(Path(env_cache))
        if cfg.get("token_cache"):
            cache_candidates.append(Path(str(cfg["token_cache"])))
        cache_candidates.extend([
            candidate.with_name(".graph_token_cache.bin"),
            Path(r"D:\FindPackShot\.graph_token_cache.bin"),
        ])
        cache_file = next((p for p in cache_candidates if p.is_file()), cache_candidates[0] if cache_candidates else None)
        return cfg, cache_file
    return None, None


def _get_sharepoint_token_silent(cfg: dict[str, str], cache_file: Path | None) -> str | None:
    try:
        import msal
    except Exception:
        return None

    cache = msal.SerializableTokenCache()
    if cache_file and cache_file.is_file():
        try:
            cache.deserialize(cache_file.read_text(encoding="utf-8"))
        except Exception:
            pass

    sp_host = cfg.get("sp_host", "orientrade.sharepoint.com")
    scopes = [f"https://{sp_host}/AllSites.Read"]
    app = msal.PublicClientApplication(
        cfg["client_id"],
        authority=f"https://login.microsoftonline.com/{cfg['tenant_id']}",
        token_cache=cache,
    )
    for account in app.get_accounts():
        result = app.acquire_token_silent(scopes, account=account)
        if result and result.get("access_token"):
            if cache.has_state_changed and cache_file:
                try:
                    cache_file.parent.mkdir(parents=True, exist_ok=True)
                    cache_file.write_text(cache.serialize(), encoding="utf-8")
                except Exception:
                    pass
            return str(result["access_token"])
    return None


def _sharepoint_online_thumbnail_path(path: Path) -> Path | None:
    cfg, cache_file = _load_sharepoint_config()
    if cfg is None:
        raise HTTPException(status_code=409, detail="SharePoint preview is not configured")
    token = _get_sharepoint_token_silent(cfg, cache_file)
    if not token:
        raise HTTPException(status_code=409, detail="SharePoint login is required before online previews can be loaded")

    stat = path.stat()
    cache_key = hashlib.sha1(f"sp|{path}|{stat.st_mtime_ns}|{stat.st_size}".encode("utf-8", errors="ignore")).hexdigest()
    target = THUMB_DIR / f"{cache_key}.sharepoint.jpg"
    if target.is_file():
        return target

    sp_host = cfg.get("sp_host", "orientrade.sharepoint.com")
    web_url = _find_sharepoint_web_url(path, token, sp_host)
    if not web_url:
        return None

    content = _fetch_sharepoint_thumbnail(web_url, token, sp_host)
    if not content:
        return None

    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    target.write_bytes(content)
    return target


def _find_sharepoint_web_url(path: Path, token: str, sp_host: str) -> str | None:
    try:
        import requests
    except Exception:
        return None

    headers = {"Authorization": f"Bearer {token}", "Accept": "application/json;odata=verbose"}
    props = "Title,DefaultEncodingURL,Path,FileType,Size,PictureThumbnailURL,ServerRedirectedPreviewURL"
    query = urllib.parse.quote(f"filename:{path.name}")
    url = (
        f"https://{sp_host}/_api/search/query"
        f"?querytext='{query}'"
        f"&selectproperties='{props}'"
        f"&rowlimit=25"
    )
    try:
        response = requests.get(url, headers=headers, timeout=25)
        response.raise_for_status()
        rows = (
            response.json()
            .get("d", {})
            .get("query", {})
            .get("PrimaryQueryResult", {})
            .get("RelevantResults", {})
            .get("Table", {})
            .get("Rows", {})
            .get("results", [])
        )
    except Exception:
        return None

    local_parts = [part.lower() for part in path.parts if part and part not in (path.anchor,)]
    best_url = None
    best_score = -1
    for row in rows:
        cells = {cell["Key"]: cell["Value"] for cell in row.get("Cells", {}).get("results", [])}
        ft = (cells.get("FileType") or "").lower()
        if ft and f".{ft}" not in IMAGE_SUFFIXES:
            continue
        web_url = cells.get("DefaultEncodingURL") or cells.get("Path") or ""
        if not web_url:
            continue
        decoded = urllib.parse.unquote(web_url).lower()
        score = sum(1 for part in local_parts[-8:] if part in decoded)
        if path.name.lower() in decoded:
            score += 10
        try:
            remote_size = int(cells.get("Size") or 0)
            if remote_size and remote_size == path.stat().st_size:
                score += 5
        except Exception:
            pass
        if score > best_score:
            best_score = score
            best_url = web_url
    return best_url


def _fetch_sharepoint_thumbnail(web_url: str, token: str, sp_host: str) -> bytes | None:
    try:
        import requests
    except Exception:
        return None

    headers = {"Authorization": f"Bearer {token}", "Accept": "image/jpeg,image/png,*/*"}
    encoded = base64.urlsafe_b64encode(web_url.encode("utf-8")).decode("ascii").rstrip("=")
    urls = [
        f"https://{sp_host}/_api/v2.1/shares/u!{encoded}/driveItem/thumbnails/0/medium/content",
        f"https://{sp_host}/_api/v2.1/shares/u!{encoded}/driveItem/thumbnails/0/small/content",
    ]
    for url in urls:
        try:
            response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
            if response.status_code == 200 and response.content:
                content_type = response.headers.get("content-type", "")
                if content_type.startswith("image/") or len(response.content) > 512:
                    return response.content
        except Exception:
            continue
    return None


class _SIZE(ctypes.Structure):
    _fields_ = [("cx", ctypes.c_long), ("cy", ctypes.c_long)]


class _BITMAP(ctypes.Structure):
    _fields_ = [
        ("bmType", ctypes.c_long),
        ("bmWidth", ctypes.c_long),
        ("bmHeight", ctypes.c_long),
        ("bmWidthBytes", ctypes.c_long),
        ("bmPlanes", ctypes.c_ushort),
        ("bmBitsPixel", ctypes.c_ushort),
        ("bmBits", ctypes.c_void_p),
    ]


class _BITMAPINFOHEADER(ctypes.Structure):
    _fields_ = [
        ("biSize", ctypes.c_uint32),
        ("biWidth", ctypes.c_long),
        ("biHeight", ctypes.c_long),
        ("biPlanes", ctypes.c_ushort),
        ("biBitCount", ctypes.c_ushort),
        ("biCompression", ctypes.c_uint32),
        ("biSizeImage", ctypes.c_uint32),
        ("biXPelsPerMeter", ctypes.c_long),
        ("biYPelsPerMeter", ctypes.c_long),
        ("biClrUsed", ctypes.c_uint32),
        ("biClrImportant", ctypes.c_uint32),
    ]


class _BITMAPINFO(ctypes.Structure):
    _fields_ = [("bmiHeader", _BITMAPINFOHEADER), ("bmiColors", ctypes.c_uint32 * 3)]


def _shell_cached_thumbnail_path(path: Path, size: int = 420) -> Path | None:
    """Return a Windows Explorer cached thumbnail without reading the file.

    SIIGBF_INCACHEONLY is the important guard: Windows may return an existing
    shell thumbnail, but it should not extract one from the cloud-only file.
    """
    if os.name != "nt":
        return None
    stat = path.stat()
    cache_key = hashlib.sha1(f"shell|{path}|{stat.st_mtime_ns}|{stat.st_size}|{size}".encode("utf-8", errors="ignore")).hexdigest()
    target = THUMB_DIR / f"{cache_key}.shell.jpg"
    if target.is_file():
        return target

    hbitmap = _get_shell_cached_hbitmap(path, size)
    if not hbitmap:
        return None
    try:
        image = _hbitmap_to_pil(hbitmap)
        if image is None:
            return None
        THUMB_DIR.mkdir(parents=True, exist_ok=True)
        image.thumbnail((size, size))
        if image.mode != "RGB":
            image = image.convert("RGB")
        image.save(target, "JPEG", quality=84, optimize=True)
        return target
    finally:
        ctypes.windll.gdi32.DeleteObject(hbitmap)


def _get_shell_cached_hbitmap(path: Path, size: int) -> int | None:
    shell32 = ctypes.windll.shell32
    ole32 = ctypes.windll.ole32

    iid = ctypes.c_byte * 16
    iid_factory = iid.from_buffer_copy(bytes.fromhex("798bc1bc16ba2f4480c48a59c30c463b"))
    factory = ctypes.c_void_p()

    ole32.CoInitialize(None)
    try:
        shell32.SHCreateItemFromParsingName.argtypes = [
            ctypes.c_wchar_p,
            ctypes.c_void_p,
            ctypes.POINTER(iid),
            ctypes.POINTER(ctypes.c_void_p),
        ]
        shell32.SHCreateItemFromParsingName.restype = ctypes.c_long
        hr = shell32.SHCreateItemFromParsingName(str(path), None, ctypes.byref(iid_factory), ctypes.byref(factory))
        if hr != 0 or not factory.value:
            return None

        vtbl = ctypes.cast(factory, ctypes.POINTER(ctypes.POINTER(ctypes.c_void_p))).contents
        get_image = ctypes.WINFUNCTYPE(ctypes.c_long, ctypes.c_void_p, _SIZE, ctypes.c_int, ctypes.POINTER(ctypes.c_void_p))(vtbl[3])
        release = ctypes.WINFUNCTYPE(ctypes.c_ulong, ctypes.c_void_p)(vtbl[2])

        hbitmap = ctypes.c_void_p()
        siigbf_thumbnailonly = 0x00000008
        siigbf_incacheonly = 0x00000010
        flags = siigbf_thumbnailonly | siigbf_incacheonly
        hr = get_image(factory, _SIZE(size, size), flags, ctypes.byref(hbitmap))
        release(factory)
        if hr != 0 or not hbitmap.value:
            return None
        return int(hbitmap.value)
    finally:
        ole32.CoUninitialize()


def _hbitmap_to_pil(hbitmap: int):
    try:
        from PIL import Image
    except Exception:
        return None

    gdi32 = ctypes.windll.gdi32
    user32 = ctypes.windll.user32
    bitmap = _BITMAP()
    if not gdi32.GetObjectW(hbitmap, ctypes.sizeof(bitmap), ctypes.byref(bitmap)):
        return None

    width = int(bitmap.bmWidth)
    height = int(bitmap.bmHeight)
    if width <= 0 or height <= 0:
        return None

    bmi = _BITMAPINFO()
    bmi.bmiHeader.biSize = ctypes.sizeof(_BITMAPINFOHEADER)
    bmi.bmiHeader.biWidth = width
    bmi.bmiHeader.biHeight = -height
    bmi.bmiHeader.biPlanes = 1
    bmi.bmiHeader.biBitCount = 32
    bmi.bmiHeader.biCompression = 0
    buffer_size = width * height * 4
    buffer = ctypes.create_string_buffer(buffer_size)

    hdc = user32.GetDC(None)
    try:
        rows = gdi32.GetDIBits(
            hdc,
            hbitmap,
            0,
            height,
            buffer,
            ctypes.byref(bmi),
            0,
        )
        if rows == 0:
            return None
    finally:
        user32.ReleaseDC(None, hdc)

    return Image.frombuffer("RGBA", (width, height), buffer, "raw", "BGRA", 0, 1)
