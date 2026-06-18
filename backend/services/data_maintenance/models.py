from __future__ import annotations

from datetime import datetime
from enum import StrEnum
from pathlib import Path
from typing import Any

from pydantic import BaseModel

from services.data_quality_control.models import AuditOptions, RuleProfilePayload


class JobStatus(StrEnum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


class JobRecord(BaseModel):
    id: str
    type: str
    status: JobStatus
    original_filename: str | None = None
    input_path: str | None = None
    output_path: str | None = None
    created_at: datetime
    updated_at: datetime
    error: str | None = None
    summary: dict[str, Any] = {}


class AuditRequest(BaseModel):
    input_path: Path
    output_path: Path | None = None
    options: AuditOptions = AuditOptions()


class AuditSummary(BaseModel):
    total_rows: int
    included_rows: int
    brand_count: int
    action_count: int
    critical_actions: int
    validation_error_count: int
    output_path: str
    warnings: list[str] = []
