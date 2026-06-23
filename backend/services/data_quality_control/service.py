from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any, Callable

from services.data_maintenance.settings import get_settings

from .auditor import audit_master_data
from .excel_reader import read_master_data
from .history import AuditHistoryStore
from .models import AuditOptions, AuditSummary
from .report_writer import write_audit_report
from .rules import load_rule_profile
from .snapshots import DQCSnapshotStore, build_snapshot, build_update_summary_dataframe, next_snapshot_version, update_summary_sheet_name


def run_data_quality_control(
    input_path: Path,
    output_path: Path | None = None,
    *,
    rule_profile_path: Path | None = None,
    options: AuditOptions | None = None,
    job_id: str | None = None,
    record_history: bool = True,
    progress_callback: Callable[[dict[str, Any]], None] | None = None,
) -> AuditSummary:
    def progress(percent: int, phase: str, message: str) -> None:
        if progress_callback:
            progress_callback(
                {
                    "progress_percent": max(0, min(percent, 100)),
                    "progress_phase": phase,
                    "current_file": input_path.name,
                    "progress_message": message,
                }
            )

    settings = get_settings()
    input_path = input_path.resolve()
    progress(5, "loading_rules", "Loading DQC rule profile")
    rules = load_rule_profile(rule_profile_path)
    options = options or AuditOptions()
    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_stem = "".join(char if char.isalnum() or char in ("-", "_") else "_" for char in input_path.stem)
        output_path = settings.resolve_storage_path(settings.outputs_dir) / f"data_quality_control_report_{safe_stem}_{timestamp}.xlsx"
    else:
        output_path = output_path.resolve()

    progress(12, "reading_file", "Reading uploaded master data")
    read_result = read_master_data(input_path, rules.fields_to_audit)
    progress(28, "auditing", f"Auditing {len(read_result.dataframe)} row(s)")
    audit_result = audit_master_data(read_result, rules, output_path, options)
    progress(70, "snapshot", "Building audit snapshot and update summary")
    snapshot_store = DQCSnapshotStore()
    previous_snapshot = snapshot_store.latest_snapshot() if record_history else None
    current_snapshot = build_snapshot(audit_result)
    current_version = next_snapshot_version(previous_snapshot)
    current_snapshot["version"] = current_version
    current_snapshot["update_summary_sheet_name"] = update_summary_sheet_name(previous_snapshot, current_version)
    audit_result.update_summary_sheet_name = current_snapshot["update_summary_sheet_name"]
    audit_result.update_summary = build_update_summary_dataframe(current_snapshot, previous_snapshot)
    progress(84, "writing_report", "Writing Excel audit report")
    write_audit_report(audit_result, output_path)
    summary = audit_result.summary
    if record_history:
        progress(94, "recording_history", "Recording audit history")
        AuditHistoryStore().record_run(job_id=job_id, source_path=str(input_path), summary=summary.model_dump())
        snapshot_store.record_snapshot(
            job_id=job_id,
            source_path=str(input_path),
            output_path=str(output_path),
            snapshot=current_snapshot,
        )
    progress(100, "completed", "Audit complete")
    return summary
