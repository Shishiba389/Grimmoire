from __future__ import annotations

from datetime import datetime
from pathlib import Path

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
) -> AuditSummary:
    settings = get_settings()
    input_path = input_path.resolve()
    rules = load_rule_profile(rule_profile_path)
    options = options or AuditOptions()
    if output_path is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_stem = "".join(char if char.isalnum() or char in ("-", "_") else "_" for char in input_path.stem)
        output_path = settings.resolve_storage_path(settings.outputs_dir) / f"data_quality_control_report_{safe_stem}_{timestamp}.xlsx"
    else:
        output_path = output_path.resolve()

    read_result = read_master_data(input_path, rules.fields_to_audit)
    audit_result = audit_master_data(read_result, rules, output_path, options)
    snapshot_store = DQCSnapshotStore()
    previous_snapshot = snapshot_store.latest_snapshot() if record_history else None
    current_snapshot = build_snapshot(audit_result)
    current_version = next_snapshot_version(previous_snapshot)
    current_snapshot["version"] = current_version
    current_snapshot["update_summary_sheet_name"] = update_summary_sheet_name(previous_snapshot, current_version)
    audit_result.update_summary_sheet_name = current_snapshot["update_summary_sheet_name"]
    audit_result.update_summary = build_update_summary_dataframe(current_snapshot, previous_snapshot)
    write_audit_report(audit_result, output_path)
    summary = audit_result.summary
    if record_history:
        AuditHistoryStore().record_run(job_id=job_id, source_path=str(input_path), summary=summary.model_dump())
        snapshot_store.record_snapshot(
            job_id=job_id,
            source_path=str(input_path),
            output_path=str(output_path),
            snapshot=current_snapshot,
        )
    return summary
