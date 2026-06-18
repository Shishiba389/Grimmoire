from __future__ import annotations

from pathlib import Path

from pydantic import BaseModel, Field


class AuditOptions(BaseModel):
    chunk_size: int = Field(default=5000, ge=100, le=100000)
    max_workers: int = Field(default=2, ge=1, le=16)
    keep_detail_rows: bool = True
    selected_statuses: list[str] | None = None


class AuditSummary(BaseModel):
    total_rows: int
    included_rows: int
    brand_count: int
    action_count: int
    critical_actions: int
    validation_error_count: int
    output_path: str
    warnings: list[str] = []


class AuditRequest(BaseModel):
    input_path: Path
    output_path: Path | None = None
    options: AuditOptions = Field(default_factory=AuditOptions)


class RuleProfilePayload(BaseModel):
    included_statuses: list[str]
    priority_fields: dict[str, list[str]]
