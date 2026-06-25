from __future__ import annotations

import logging
from pathlib import Path

from .taxonomy_loader import Taxonomy

logger = logging.getLogger("grimoire.clip.rules")

VIDEO_EXTENSIONS = {".mp4", ".mov", ".webm", ".avi", ".mkv", ".m4v"}
GIF_EXTENSION = ".gif"

ARTWORK_KEYWORDS = {
    "dieline", "die-line", "cut line", "fold line", "bleed",
    "measurement", "dimension", "ruler", "print mark", "flat packaging",
    "label artwork", "flat layout", "technical", "mockup",
}


def apply_rules(
    file_path: Path,
    category_scores: dict[str, float],
    is_video: bool,
    taxonomy: Taxonomy,
) -> tuple[dict[str, float], list[str]]:
    overrides: list[str] = []
    adjusted = dict(category_scores)

    if is_video:
        adjusted["04_video"] = 1.0
        overrides.append("rule:video_extension")
        return adjusted, overrides

    fname_lower = file_path.stem.lower()
    for kw in ARTWORK_KEYWORDS:
        if kw in fname_lower:
            bonus = 0.15
            if "03_artwork" in adjusted:
                adjusted["03_artwork"] = min(adjusted["03_artwork"] + bonus, 1.0)
            else:
                adjusted["03_artwork"] = bonus
            overrides.append(f"rule:artwork_filename_hint:{kw}")
            break

    art_score = adjusted.get("03_artwork", 0)
    human_score = adjusted.get("02_lifestyle_human", 0)
    if art_score > 0.6 and human_score > 0.6:
        if art_score > human_score + 0.05:
            overrides.append("rule:artwork_override_human")
        else:
            pass

    return adjusted, overrides


def resolve_final_category(
    clip_scores: dict[str, float],
    reference_scores: dict[str, float],
    rule_adjusted: dict[str, float],
    rule_overrides: list[str],
    taxonomy: Taxonomy,
    clip_weight: float = 0.50,
    reference_weight: float = 0.30,
    rule_weight: float = 0.20,
) -> tuple[str, dict[str, float]]:
    all_cats = set(clip_scores.keys()) | set(reference_scores.keys()) | set(rule_adjusted.keys())
    final_scores: dict[str, float] = {}

    for cat in all_cats:
        cs = clip_scores.get(cat, 0.0)
        rs = reference_scores.get(cat, 0.0)
        ra = rule_adjusted.get(cat, 0.0)
        final_scores[cat] = clip_weight * cs + reference_weight * rs + rule_weight * ra

    for override in rule_overrides:
        if override == "rule:video_extension":
            return "04_video", final_scores

    sorted_cats = sorted(final_scores.items(), key=lambda x: (-x[1], -taxonomy.categories.get(x[0], type("", (), {"priority": 0})).priority))

    if not sorted_cats:
        return "99_uncertain", final_scores

    return sorted_cats[0][0], final_scores
