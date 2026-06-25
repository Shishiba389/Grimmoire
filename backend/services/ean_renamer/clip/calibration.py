from __future__ import annotations

import logging
from dataclasses import dataclass

logger = logging.getLogger("grimoire.clip.calibration")

DEFAULT_THRESHOLDS = {
    # These are similarity/fusion scores, not probabilities. Real CLIP results
    # commonly cluster around 0.35-0.55, so the review threshold must accept
    # useful predictions in that range while leaving genuinely weak matches
    # in Unsorted for user review.
    "03_artwork":       {"auto": 0.48, "review": 0.34},
    "02_lifestyle_human": {"auto": 0.50, "review": 0.36},
    "02_lifestyle_collection": {"auto": 0.52, "review": 0.38},
    "01_packshot":      {"auto": 0.50, "review": 0.36},
    "02_lifestyle_scene_setup": {"auto": 0.52, "review": 0.38},
    "02_lifestyle_color_background_or_packshot_low_priority": {"auto": 0.50, "review": 0.36},
    "04_video":         {"auto": 0.50, "review": 0.35},
    "99_uncertain":     {"auto": 0.45, "review": 0.30},
}

DEFAULT_GAP_THRESHOLD = 0.06


@dataclass
class CalibrationResult:
    calibrated_score: float
    confidence: str  # "auto" | "review" | "uncertain"
    gap: float


def calibrate_score(
    raw_score: float,
    category: str,
    second_score: float = 0.0,
    user_thresholds: dict | None = None,
) -> CalibrationResult:
    thresholds = {cat: values.copy() for cat, values in DEFAULT_THRESHOLDS.items()}
    if user_thresholds:
        for cat, vals in user_thresholds.items():
            if cat in thresholds:
                thresholds[cat].update(vals)

    gap = raw_score - second_score
    cat_thresholds = thresholds.get(category, {"auto": 0.70, "review": 0.55})
    auto_thresh = cat_thresholds["auto"]
    review_thresh = cat_thresholds["review"]

    calibrated = raw_score

    if calibrated >= auto_thresh and gap >= DEFAULT_GAP_THRESHOLD:
        confidence = "auto"
    elif calibrated >= review_thresh:
        confidence = "review"
    else:
        confidence = "uncertain"

    return CalibrationResult(
        calibrated_score=round(calibrated, 4),
        confidence=confidence,
        gap=round(gap, 4),
    )
