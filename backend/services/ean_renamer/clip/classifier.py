from __future__ import annotations

import logging
import time
from pathlib import Path

import numpy as np

from . import model_manager
from .calibration import calibrate_score
from .embedding_cache import EmbeddingCache
from .encoder import cosine_similarity, encode_image_batch, load_and_preprocess
from .media_inspector import MediaType, classify_media_batch
from .local_trainer import LocalClassifier
from .reference_bank import ReferenceBank
from .rule_engine import apply_rules, resolve_final_category
from .schemas import (
    CategoryScore,
    ConfidenceLevel,
    ImageClassification,
    SubcategoryScore,
)
from .taxonomy_loader import (
    Taxonomy,
    get_subcategory_prompts_for_category,
)

logger = logging.getLogger("grimoire.clip.classifier")

NON_VISUAL_CATEGORIES = {"04_video", "99_uncertain"}
CATEGORY_PROMPT_TOP_K = 3


class ClassificationPipeline:
    def __init__(
        self,
        taxonomy: Taxonomy,
        cache: EmbeddingCache,
        reference_bank: ReferenceBank | None = None,
        user_thresholds: dict | None = None,
        local_classifier: LocalClassifier | None = None,
    ):
        self.taxonomy = taxonomy
        self.cache = cache
        self.reference_bank = reference_bank
        self.user_thresholds = user_thresholds
        self.local_classifier = local_classifier
        self._category_embeddings: np.ndarray | None = None
        self._category_codes: list[str] = []
        self._category_prompt_embeddings: dict[str, np.ndarray] = {}
        self._subcategory_embeddings: dict[str, np.ndarray] = {}
        self._subcategory_codes: dict[str, list[str]] = {}
        self._subcategory_names: dict[str, list[str]] = {}

    def prepare_text_embeddings(self):
        m = model_manager.get_model()

        cached = self.cache.get_text_embeddings(m.version, self.taxonomy.version)
        if cached and len(cached) > 10:
            self._rebuild_from_cache(cached)
            logger.info("Text embeddings loaded from cache")
            return

        logger.info("Encoding multi-prompt category taxonomy...")
        all_prompt_embeddings: dict[str, np.ndarray] = {}
        for cat_code in self.taxonomy.categories:
            sub_prompts = get_subcategory_prompts_for_category(self.taxonomy, cat_code)
            if not sub_prompts:
                continue
            texts = [p.positive_prompt for p in sub_prompts]
            codes = [p.subcategory_code for p in sub_prompts]
            names = [p.subcategory for p in sub_prompts]
            embeds = model_manager.encode_texts(texts)
            self._subcategory_embeddings[cat_code] = embeds
            self._subcategory_codes[cat_code] = codes
            self._subcategory_names[cat_code] = names
            if cat_code not in NON_VISUAL_CATEGORIES:
                self._category_prompt_embeddings[cat_code] = embeds
            for j, sc in enumerate(codes):
                all_prompt_embeddings[f"sub:{cat_code}:{sc}"] = embeds[j]

        self._rebuild_category_centroids()
        for i, code in enumerate(self._category_codes):
            all_prompt_embeddings[f"cat:{code}"] = self._category_embeddings[i]

        self.cache.store_text_embeddings(all_prompt_embeddings, m.version, self.taxonomy.version)
        logger.info("Text embeddings encoded and cached")

    def _rebuild_from_cache(self, cached: dict[str, np.ndarray]):
        for cat_code, cat_def in self.taxonomy.categories.items():
            entries = []
            for prompt in cat_def.subcategory_prompts:
                key = f"sub:{cat_code}:{prompt.subcategory_code}"
                embedding = cached.get(key)
                if embedding is not None:
                    entries.append((prompt.subcategory_code, embedding))
            if not entries:
                continue

            codes = [code for code, _ in entries]
            embeds = np.stack([embedding for _, embedding in entries])
            self._subcategory_embeddings[cat_code] = embeds
            self._subcategory_codes[cat_code] = codes
            code_to_name = {p.subcategory_code: p.subcategory for p in cat_def.subcategory_prompts}
            self._subcategory_names[cat_code] = [code_to_name.get(code, code) for code in codes]
            if cat_code not in NON_VISUAL_CATEGORIES:
                self._category_prompt_embeddings[cat_code] = embeds

        self._rebuild_category_centroids()

    def _rebuild_category_centroids(self):
        self._category_codes = list(self._category_prompt_embeddings.keys())
        centroids = []
        for code in self._category_codes:
            prompt_embeddings = self._category_prompt_embeddings[code].astype(np.float32)
            centroid = prompt_embeddings.mean(axis=0)
            norm = np.linalg.norm(centroid)
            if norm > 0:
                centroid = centroid / norm
            centroids.append(centroid.astype(np.float16))
        self._category_embeddings = np.stack(centroids) if centroids else None

    def _score_categories(self, embedding: np.ndarray) -> dict[str, float]:
        scores: dict[str, float] = {}
        emb = embedding.reshape(1, -1)
        for code in self._category_codes:
            prompt_embeddings = self._category_prompt_embeddings[code]
            prompt_scores = cosine_similarity(emb, prompt_embeddings)[0]
            top_k = min(CATEGORY_PROMPT_TOP_K, len(prompt_scores))
            best_scores = np.partition(prompt_scores, -top_k)[-top_k:]
            scores[code] = float(best_scores.mean())
        return scores

    def classify_batch(
        self,
        image_paths: list[Path],
        image_ids: list[str],
        relative_paths: list[str],
        batch_size: int = 32,
        cancel_flag=None,
        progress_cb=None,
    ) -> list[ImageClassification]:
        t0 = time.time()
        media_result = classify_media_batch(image_paths)
        video_paths = set(str(p) for p in media_result[MediaType.VIDEO])
        corrupt_paths = set(str(p) for p in media_result[MediaType.CORRUPT])

        results: list[ImageClassification] = []
        encode_paths: list[Path] = []
        encode_indices: list[int] = []

        for i, p in enumerate(image_paths):
            sp = str(p)
            if sp in video_paths:
                results.append(ImageClassification(
                    image_id=image_ids[i],
                    relative_path=relative_paths[i],
                    main_category="04_video",
                    subcategory="",
                    confidence=ConfidenceLevel.AUTO,
                    calibrated_score=1.0,
                    score_gap=1.0,
                    is_video=True,
                    rule_overrides=["rule:video_extension"],
                ))
            elif sp in corrupt_paths:
                results.append(ImageClassification(
                    image_id=image_ids[i],
                    relative_path=relative_paths[i],
                    main_category="99_uncertain",
                    subcategory="corrupt_or_unsupported",
                    confidence=ConfidenceLevel.UNCERTAIN,
                    calibrated_score=0.0,
                    score_gap=0.0,
                    rule_overrides=["rule:corrupt_file"],
                ))
            else:
                results.append(None)  # type: ignore
                encode_paths.append(p)
                encode_indices.append(i)

        if not encode_paths:
            return [r for r in results if r is not None]

        m = model_manager.get_model()
        embeddings = self._get_or_encode_embeddings(encode_paths, m.version, batch_size, cancel_flag, progress_cb)

        if cancel_flag and cancel_flag.is_set():
            return [r for r in results if r is not None]

        for j, (emb, orig_idx) in enumerate(zip(embeddings, encode_indices)):
            if emb is None:
                results[orig_idx] = ImageClassification(
                    image_id=image_ids[orig_idx],
                    relative_path=relative_paths[orig_idx],
                    main_category="99_uncertain",
                    subcategory="encode_failed",
                    confidence=ConfidenceLevel.UNCERTAIN,
                    calibrated_score=0.0,
                    score_gap=0.0,
                )
                continue

            classification = self._classify_single(
                emb, image_paths[orig_idx], image_ids[orig_idx], relative_paths[orig_idx],
            )
            results[orig_idx] = classification

        elapsed = time.time() - t0
        valid_count = sum(1 for r in results if r is not None)
        logger.info("Classified %d images in %.1fs", valid_count, elapsed)
        return [r for r in results if r is not None]

    def _get_or_encode_embeddings(
        self, paths: list[Path], model_version: str,
        batch_size: int, cancel_flag, progress_cb,
    ) -> list[np.ndarray | None]:
        result: list[np.ndarray | None] = [None] * len(paths)
        to_encode_idx: list[int] = []
        to_encode_paths: list[Path] = []

        for i, p in enumerate(paths):
            cached = self.cache.lookup_fast(p, model_version)
            if cached is not None:
                result[i] = cached
            else:
                to_encode_idx.append(i)
                to_encode_paths.append(p)

        if to_encode_paths:
            logger.info("Cache miss: %d/%d images need encoding", len(to_encode_paths), len(paths))

            def _progress(done, total):
                if progress_cb:
                    cached_count = len(paths) - len(to_encode_paths)
                    progress_cb(cached_count + done, len(paths))

            embeds, valid_indices = encode_image_batch(
                to_encode_paths, batch_size=batch_size,
                cancel_flag=cancel_flag, progress_cb=_progress,
            )

            cache_entries = []
            for k, vi in enumerate(valid_indices):
                orig_i = to_encode_idx[vi]
                result[orig_i] = embeds[k]
                file_hash = EmbeddingCache.compute_file_hash(to_encode_paths[vi])
                cache_entries.append((to_encode_paths[vi], file_hash, embeds[k]))

            if cache_entries:
                self.cache.store_batch(cache_entries, model_version)
        else:
            logger.info("All %d images found in cache", len(paths))

        return result

    def _classify_single(
        self, embedding: np.ndarray, file_path: Path,
        image_id: str, relative_path: str,
    ) -> ImageClassification:
        emb = embedding.reshape(1, -1)

        clip_scores = self._score_categories(embedding)

        ref_scores: dict[str, float] = {}
        if self.reference_bank and self.reference_bank.is_loaded:
            ref_scores = self.reference_bank.knn_scores(embedding, k=10)

        rule_adjusted, rule_overrides = apply_rules(
            file_path, clip_scores, False, self.taxonomy,
        )

        best_cat, final_scores = resolve_final_category(
            clip_scores, ref_scores, rule_adjusted, rule_overrides, self.taxonomy,
        )

        if self.local_classifier and self.local_classifier.is_trained:
            local_scores = self.local_classifier.predict(embedding) or {}
            for category, local_score in local_scores.items():
                if category in final_scores:
                    final_scores[category] = 0.85 * final_scores[category] + 0.15 * local_score
            if final_scores:
                best_cat = max(
                    final_scores,
                    key=lambda category: (
                        final_scores[category],
                        self.taxonomy.categories.get(
                            category, type("", (), {"priority": 0})
                        ).priority,
                    ),
                )

        sorted_scores = sorted(final_scores.items(), key=lambda x: -x[1])
        top1_score = sorted_scores[0][1] if sorted_scores else 0.0
        top2_score = sorted_scores[1][1] if len(sorted_scores) > 1 else 0.0

        cal = calibrate_score(top1_score, best_cat, top2_score, self.user_thresholds)

        if cal.confidence == "uncertain":
            best_cat = "99_uncertain"

        top_categories = [
            CategoryScore(category=cat, score=round(score, 4), raw_score=round(clip_scores.get(cat, 0), 4))
            for cat, score in sorted_scores[:5]
        ]

        best_subcat = ""
        top_subcategories: list[SubcategoryScore] = []
        top2_cats = [best_cat] if best_cat in self._subcategory_embeddings else []

        for check_cat in top2_cats:
            if check_cat in self._subcategory_embeddings:
                sub_embeds = self._subcategory_embeddings[check_cat]
                sub_scores = cosine_similarity(emb, sub_embeds)[0]
                for k, sc_code in enumerate(self._subcategory_codes[check_cat]):
                    top_subcategories.append(SubcategoryScore(
                        code=sc_code,
                        name=self._subcategory_names[check_cat][k],
                        score=round(float(sub_scores[k]), 4),
                    ))

        top_subcategories.sort(key=lambda x: -x.score)
        if top_subcategories:
            best_cat_subcategory_codes = set(self._subcategory_codes.get(best_cat, []))
            for sc in top_subcategories:
                if sc.code in best_cat_subcategory_codes:
                    best_subcat = sc.name
                    break
            if not best_subcat:
                best_subcat = top_subcategories[0].name

        return ImageClassification(
            image_id=image_id,
            relative_path=relative_path,
            main_category=best_cat,
            subcategory=best_subcat,
            confidence=ConfidenceLevel(cal.confidence),
            calibrated_score=cal.calibrated_score,
            score_gap=cal.gap,
            top_categories=top_categories,
            top_subcategories=top_subcategories[:10],
            attributes=[],
            rule_overrides=rule_overrides,
        )
