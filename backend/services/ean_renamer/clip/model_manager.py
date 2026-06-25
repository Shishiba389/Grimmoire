from __future__ import annotations

import logging
import threading
from pathlib import Path

import numpy as np

logger = logging.getLogger("grimoire.clip.model")

_MODEL_NAME = "ViT-B-32"
_PRETRAINED = "openai"
_MODEL_REVISION = "quickgelu-v2"

_lock = threading.Lock()
_instance: _ClipModel | None = None


class _ClipModel:
    def __init__(self):
        import open_clip

        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            _MODEL_NAME,
            pretrained=_PRETRAINED,
            force_quick_gelu=True,
        )
        self.tokenizer = open_clip.get_tokenizer(_MODEL_NAME)
        self.model.eval()

        import torch
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = self.model.to(self.device)
        self.torch = torch
        self.embed_dim = self.model.visual.output_dim
        # Include inference configuration in the cache version so embeddings
        # created with an older activation setup are never mixed with this model.
        self.version = f"{_MODEL_NAME}_{_PRETRAINED}_{_MODEL_REVISION}"
        logger.info("CLIP loaded: %s on %s (dim=%d)", self.version, self.device, self.embed_dim)


def get_model() -> _ClipModel:
    global _instance
    if _instance is not None:
        return _instance
    with _lock:
        if _instance is not None:
            return _instance
        _instance = _ClipModel()
        return _instance


def is_loaded() -> bool:
    return _instance is not None


def get_status() -> dict:
    if _instance is None:
        return {"loaded": False, "model": "", "device": ""}
    return {
        "loaded": True,
        "model": _instance.version,
        "device": _instance.device,
    }


def encode_images(images: list, batch_size: int = 32) -> np.ndarray:
    m = get_model()
    all_embeds = []
    for i in range(0, len(images), batch_size):
        batch = images[i:i + batch_size]
        import torch
        tensors = torch.stack([m.preprocess(img) for img in batch]).to(m.device)
        with torch.no_grad():
            embeds = m.model.encode_image(tensors)
            embeds = embeds / embeds.norm(dim=-1, keepdim=True)
        all_embeds.append(embeds.cpu().numpy().astype(np.float16))
    return np.vstack(all_embeds) if all_embeds else np.empty((0, m.embed_dim), dtype=np.float16)


def encode_texts(texts: list[str], batch_size: int = 64) -> np.ndarray:
    m = get_model()
    all_embeds = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        import torch
        tokens = m.tokenizer(batch).to(m.device)
        with torch.no_grad():
            embeds = m.model.encode_text(tokens)
            embeds = embeds / embeds.norm(dim=-1, keepdim=True)
        all_embeds.append(embeds.cpu().numpy().astype(np.float16))
    return np.vstack(all_embeds) if all_embeds else np.empty((0, m.embed_dim), dtype=np.float16)
