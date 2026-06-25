"""EAN Sorter v2 — Pydantic models."""
from __future__ import annotations

from pydantic import BaseModel, Field


class MasterDataRow(BaseModel):
    ean: str | None = None
    article_code: str | None = None
    product_name: str | None = None
    raw: dict = Field(default_factory=dict)


class MatchCandidate(BaseModel):
    ean: str
    product_name: str | None = None
    confidence: float
    tier: str  # "ean" | "code" | "name"
    match_source: str


class MatchResult(BaseModel):
    image_path: str
    image_name: str
    source_folder: str
    candidates: list[MatchCandidate] = Field(default_factory=list)
    selected_index: int | None = None
    status: str  # "matched" | "ambiguous" | "unmatched"


class ImageRecord(BaseModel):
    path: str
    name: str
    source_folder: str
    relative_path: str
    size_bytes: int = 0


class ScanResponse(BaseModel):
    images: list[ImageRecord] = Field(default_factory=list)
    loose_images: list[ImageRecord] = Field(default_factory=list)
    subfolder_count: int = 0
    total_count: int = 0


class CollectLooseResponse(BaseModel):
    moved: list[dict] = Field(default_factory=list)
    dest_folder: str = ""
    count: int = 0


class MasterDataUploadResponse(BaseModel):
    session_id: str
    row_count: int = 0
    columns_detected: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


class SortRequest(BaseModel):
    folder: str
    session_id: str
    matches: list[dict] = Field(default_factory=list)
    delete_empty: bool = False


class SortResponse(BaseModel):
    moved: int = 0
    ean_folders: list[str] = Field(default_factory=list)
    report_path: str = ""
    errors: list[str] = Field(default_factory=list)
    unmatched: int = 0
