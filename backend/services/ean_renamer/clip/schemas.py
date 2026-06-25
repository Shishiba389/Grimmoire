from __future__ import annotations

from enum import Enum
from pydantic import BaseModel, Field


class ConfidenceLevel(str, Enum):
    AUTO = "auto"
    REVIEW = "review"
    UNCERTAIN = "uncertain"


class ClassifyRequest(BaseModel):
    folder_path: str = Field(min_length=1)
    taxonomy_path: str | None = None
    reference_path: str | None = None
    user_data_path: str | None = None


class ClassifyProgress(BaseModel):
    job_id: str
    phase: str = "idle"
    processed: int = 0
    total: int = 0
    batch_speed: float = 0.0
    eta_seconds: float = 0.0
    error: str | None = None


class CategoryScore(BaseModel):
    category: str
    score: float
    raw_score: float


class SubcategoryScore(BaseModel):
    code: str
    name: str
    score: float


class AttributeTag(BaseModel):
    code: str
    name: str
    score: float


class ImageClassification(BaseModel):
    image_id: str
    relative_path: str
    main_category: str
    subcategory: str
    confidence: ConfidenceLevel
    calibrated_score: float
    score_gap: float
    top_categories: list[CategoryScore] = Field(default_factory=list)
    top_subcategories: list[SubcategoryScore] = Field(default_factory=list)
    attributes: list[AttributeTag] = Field(default_factory=list)
    rule_overrides: list[str] = Field(default_factory=list)
    is_video: bool = False


class ClassifyResult(BaseModel):
    job_id: str
    folder_path: str
    total_images: int
    classifications: list[ImageClassification]
    category_counts: dict[str, int] = Field(default_factory=dict)
    model_version: str = ""
    taxonomy_version: str = ""


class CorrectionRecord(BaseModel):
    image_hash: str
    relative_path: str
    source_batch: str
    predicted_category: str
    predicted_subcategory: str
    corrected_category: str
    corrected_subcategory: str
    top1_score: float
    top2_score: float
    score_gap: float
    clip_model_version: str
    taxonomy_version: str
    embedding_cache_key: str
    created_at: str


class CorrectionCommitRequest(BaseModel):
    folder_path: str
    corrections: list[CorrectionRecord]


class ClipStatusResponse(BaseModel):
    loaded: bool
    model: str = ""
    device: str = ""
    taxonomy_loaded: bool = False
    taxonomy_version: str = ""
    reference_count: int = 0
