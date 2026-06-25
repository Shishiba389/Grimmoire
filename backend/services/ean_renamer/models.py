from __future__ import annotations

from pydantic import BaseModel, Field


class OpenFolderRequest(BaseModel):
    folderPath: str = Field(min_length=1)


class ImageItem(BaseModel):
    id: str
    name: str
    extension: str
    sizeBytes: int
    modifiedTime: float
    width: int | None = None
    height: int | None = None
    ean: str | None = None
    relativePath: str | None = None


class FolderResponse(BaseModel):
    folderPath: str
    ean: str
    images: list[ImageItem]


class RenameColumns(BaseModel):
    packshot: list[str] = Field(default_factory=list)
    lifestyle: list[str] = Field(default_factory=list)
    artwork: list[str] = Field(default_factory=list)


class RenameRequest(BaseModel):
    folderPath: str = Field(min_length=1)
    columns: RenameColumns
    outputFolderPath: str | None = None


class RenamePlanItem(BaseModel):
    id: str
    category: str
    oldName: str
    newName: str
    extension: str
    ean: str | None = None
    outputRelativePath: str | None = None


class RenamePlanResponse(BaseModel):
    ean: str
    items: list[RenamePlanItem]
    skippedCount: int
    conflicts: list[str] = Field(default_factory=list)


class ApplyRenameResponse(BaseModel):
    ean: str
    items: list[RenamePlanItem]
    logPath: str
    mode: str = "rename"
    outputFolderPath: str | None = None


class PickFolderResponse(BaseModel):
    folderPath: str


class PickOutputFolderRequest(BaseModel):
    category: str | None = None
    initialFolderPath: str | None = None


class BulkFolderItem(BaseModel):
    key: str
    folderPath: str
    relativePath: str
    name: str
    imageCount: int
    imageIds: list[str] = Field(default_factory=list)
    images: list[ImageItem] = Field(default_factory=list)
    sampleImages: list[ImageItem] = Field(default_factory=list)


class BulkScanResponse(BaseModel):
    folderPath: str
    totalFolders: int
    totalImages: int
    folders: list[BulkFolderItem] = Field(default_factory=list)


class BulkMappingEntry(BaseModel):
    ean: str | None = None
    productName: str | None = None
    source: str | None = None


class BulkMappingResponse(BaseModel):
    entries: list[BulkMappingEntry] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


class UndoRequest(BaseModel):
    folderPath: str = Field(min_length=1)
    logPath: str | None = None


class UndoResponse(BaseModel):
    restored: list[RenamePlanItem]
    logPath: str


class BatchAssignment(BaseModel):
    id: str
    category: str
    categoryName: str | None = None
    ean: str | None = None
    productName: str | None = None


class DuplicateGroup(BaseModel):
    ids: list[str] = Field(default_factory=list)
    first: bool = False


class BatchRenameRequest(BaseModel):
    folderPath: str = Field(min_length=1)
    outputFolderPath: str | None = None
    outputFolderPaths: dict[str, str] = Field(default_factory=dict)
    outputMode: str = "copy"
    customEan: str | None = None
    productName: str | None = None
    productNameContinuous: bool = False
    productNameWithCategory: bool = False
    namingMode: str = "per_category"
    categoryOrder: list[str] = Field(default_factory=list)
    assignments: list[BatchAssignment] = Field(default_factory=list)
    priorityIds: list[str] | None = None
    duplicateGroups: list[DuplicateGroup] = Field(default_factory=list)
    duplicateFirstGroups: list[list[str]] = Field(default_factory=list)


class BatchRenamePlanResponse(BaseModel):
    items: list[RenamePlanItem]
    skippedCount: int
    conflicts: list[str] = Field(default_factory=list)


class BatchApplyRenameResponse(BaseModel):
    items: list[RenamePlanItem]
    logPath: str
    mode: str = "copy"
    outputFolderPath: str | None = None


# ---------------------------------------------------------------------------
# Bulk master data matching (3-tier)
# ---------------------------------------------------------------------------


class BulkFolderMatchItem(BaseModel):
    key: str
    name: str
    relativePath: str = ""
    sampleImageNames: list[str] = Field(default_factory=list)


class BulkMatchCandidate(BaseModel):
    ean: str
    product_name: str | None = None
    confidence: float
    tier: str  # "ean" | "code" | "name"
    match_source: str


class BulkMatchResult(BaseModel):
    key: str
    name: str
    candidates: list[BulkMatchCandidate] = Field(default_factory=list)
    selected_index: int | None = None
    status: str = "unmatched"  # "matched" | "ambiguous" | "unmatched"


class BulkMatchRequest(BaseModel):
    session_id: str
    folders: list[BulkFolderMatchItem]


class BulkMatchResponse(BaseModel):
    results: list[BulkMatchResult] = Field(default_factory=list)
    summary: dict = Field(default_factory=dict)


class BulkMatchOverrideItem(BaseModel):
    key: str
    selected_index: int


class BulkMatchOverrideRequest(BaseModel):
    results: list[BulkMatchResult]
    overrides: list[BulkMatchOverrideItem] = Field(default_factory=list)


# ---------------------------------------------------------------------------
# Per-image matching (single folder mode)
# ---------------------------------------------------------------------------


class ImageMatchRequest(BaseModel):
    session_id: str
    image_names: list[str]


class ImageMatchCandidate(BaseModel):
    ean: str
    product_name: str | None = None
    confidence: float
    tier: str
    match_source: str


class ImageMatchItem(BaseModel):
    image_name: str
    candidates: list[ImageMatchCandidate] = Field(default_factory=list)
    best_ean: str | None = None
    best_product: str | None = None
    best_confidence: float = 0.0
    best_tier: str | None = None
    status: str = "unmatched"


class ImageMatchResponse(BaseModel):
    matches: list[ImageMatchItem] = Field(default_factory=list)
    matched_count: int = 0
    total_count: int = 0
