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
