from __future__ import annotations

import logging
from pathlib import Path

import numpy as np
from PIL import Image, UnidentifiedImageError

from . import model_manager

logger = logging.getLogger("grimoire.clip.encoder")

MAX_IMAGE_PIXELS = 50_000_000


def load_and_preprocess(path: Path) -> Image.Image | None:
    try:
        img = Image.open(path)
        if img.width * img.height > MAX_IMAGE_PIXELS:
            ratio = (MAX_IMAGE_PIXELS / (img.width * img.height)) ** 0.5
            img = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.LANCZOS)
        img = img.convert("RGB")
        return img
    except (UnidentifiedImageError, OSError, SyntaxError) as e:
        logger.warning("Failed to load image %s: %s", path, e)
        return None


def encode_image_batch(
    paths: list[Path],
    batch_size: int = 32,
    cancel_flag=None,
    progress_cb=None,
) -> tuple[np.ndarray, list[int]]:
    valid_images = []
    valid_indices = []
    for i, p in enumerate(paths):
        if cancel_flag and cancel_flag.is_set():
            break
        img = load_and_preprocess(p)
        if img is not None:
            valid_images.append(img)
            valid_indices.append(i)

    if not valid_images:
        m = model_manager.get_model()
        return np.empty((0, m.embed_dim), dtype=np.float16), []

    all_embeds = []
    processed = 0
    for i in range(0, len(valid_images), batch_size):
        if cancel_flag and cancel_flag.is_set():
            break
        batch = valid_images[i:i + batch_size]
        embeds = model_manager.encode_images(batch, batch_size=len(batch))
        all_embeds.append(embeds)
        processed += len(batch)
        if progress_cb:
            progress_cb(processed, len(valid_images))

    if not all_embeds:
        m = model_manager.get_model()
        return np.empty((0, m.embed_dim), dtype=np.float16), valid_indices[:0]

    return np.vstack(all_embeds), valid_indices[:processed]


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    a = a.astype(np.float32)
    b = b.astype(np.float32)
    return a @ b.T
