from __future__ import annotations

from pathlib import Path
from typing import Any, Callable

from .models import AuditSummary
from services.data_quality_control.models import AuditOptions
from services.data_quality_control.service import run_data_quality_control


def run_data_maintenance(
    input_path: Path,
    output_path: Path | None = None,
    *,
    options: AuditOptions | None = None,
    job_id: str | None = None,
    progress_callback: Callable[[dict[str, Any]], None] | None = None,
) -> AuditSummary:
    return run_data_quality_control(
        input_path,
        output_path,
        options=options,
        job_id=job_id,
        progress_callback=progress_callback,
    )
