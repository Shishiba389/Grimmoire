from __future__ import annotations

import hashlib
import logging
from collections import defaultdict
from pathlib import Path

import numpy as np

from . import model_manager
from .embedding_cache import EmbeddingCache
from .encoder import load_and_preprocess
from .media_inspector import IMAGE_EXTENSIONS
from .paths import reference_examples_path as _default_reference_path

logger = logging.getLogger("grimoire.clip.reference")

_CATEGORY_MAP = {
    "01_packshot": "01_packshot",
    "02_lifestyle": None,
    "human": "02_lifestyle_human",
    "scene_setup": "02_lifestyle_scene_setup",
    "collection": "02_lifestyle_collection",
    "color_background_single": "02_lifestyle_color_background_or_packshot_low_priority",
    "03_artwork": "03_artwork",
    "04_video": "04_video",
    "99_uncertain": "99_uncertain",
}


class ReferenceBank:
    def __init__(self):
        self.embeddings: np.ndarray | None = None
        self.labels: list[str] = []
        self.sublabels: list[str] = []
        self.paths: list[str] = []
        self._loaded = False

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    @property
    def count(self) -> int:
        return len(self.labels) if self._loaded else 0

    def load(self, reference_path: Path | None = None, cache: EmbeddingCache | None = None):
        if reference_path is None:
            reference_path = _default_reference_path()
        if not reference_path.exists():
            logger.warning("Reference path does not exist: %s", reference_path)
            return

        image_paths: list[Path] = []
        categories: list[str] = []
        subcategories: list[str] = []

        for img_path in sorted(reference_path.rglob("*")):
            if not img_path.is_file():
                continue
            if img_path.suffix.lower() not in IMAGE_EXTENSIONS:
                continue

            rel = img_path.relative_to(reference_path)
            parts = rel.parts
            cat = self._resolve_category(parts)
            subcat = parts[-2] if len(parts) >= 2 else ""
            if cat is None:
                continue

            image_paths.append(img_path)
            categories.append(cat)
            subcategories.append(subcat)

        if not image_paths:
            logger.warning("No reference images found in %s", reference_path)
            return

        seen_hashes = set()
        deduped_paths = []
        deduped_cats = []
        deduped_subs = []

        for p, cat, sub in zip(image_paths, categories, subcategories):
            fhash = hashlib.sha256(open(p, "rb").read(8192)).hexdigest()[:16]
            if fhash in seen_hashes:
                continue
            seen_hashes.add(fhash)
            deduped_paths.append(p)
            deduped_cats.append(cat)
            deduped_subs.append(sub)

        m = model_manager.get_model()
        embeddings_list = []
        final_cats = []
        final_subs = []
        final_paths = []

        for i, p in enumerate(deduped_paths):
            cached = None
            if cache:
                cached = cache.lookup_fast(p, m.version)
            if cached is not None:
                embeddings_list.append(cached)
            else:
                img = load_and_preprocess(p)
                if img is None:
                    continue
                emb = model_manager.encode_images([img], batch_size=1)
                embeddings_list.append(emb[0])
                if cache:
                    file_hash = EmbeddingCache.compute_file_hash(p)
                    cache.store(p, file_hash, m.version, emb[0])
            final_cats.append(deduped_cats[i])
            final_subs.append(deduped_subs[i])
            final_paths.append(str(deduped_paths[i]))

        if embeddings_list:
            self.embeddings = np.stack(embeddings_list).astype(np.float16)
            self.labels = final_cats
            self.sublabels = final_subs
            self.paths = final_paths
            self._loaded = True
            logger.info("Reference bank loaded: %d images across categories", len(self.labels))

    def _resolve_category(self, parts: tuple[str, ...]) -> str | None:
        if not parts:
            return None
        top = parts[0]
        if top == "02_lifestyle" and len(parts) >= 2:
            sub_dir = parts[1]
            return _CATEGORY_MAP.get(sub_dir, None)
        return _CATEGORY_MAP.get(top, None)

    def knn_scores(self, query_embedding: np.ndarray, k: int = 10) -> dict[str, float]:
        if not self._loaded or self.embeddings is None:
            return {}

        query = query_embedding.astype(np.float32)
        bank = self.embeddings.astype(np.float32)
        sims = query @ bank.T
        if sims.ndim == 1:
            sims = sims.reshape(1, -1)

        top_k_idx = np.argsort(-sims[0])[:k]
        category_scores: dict[str, float] = defaultdict(float)
        category_counts: dict[str, int] = defaultdict(int)

        for idx in top_k_idx:
            cat = self.labels[idx]
            sim = float(sims[0, idx])
            category_scores[cat] += sim
            category_counts[cat] += 1

        result = {}
        for cat in category_scores:
            result[cat] = category_scores[cat] / category_counts[cat]
        return result
