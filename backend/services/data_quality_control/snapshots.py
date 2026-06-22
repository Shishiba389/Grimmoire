from __future__ import annotations

import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import pandas as pd

from services.data_maintenance.settings import get_settings

from .auditor import AuditResult
from .field_mapping import STATUS_BUCKETS


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat()


class DQCSnapshotStore:
    def __init__(self, db_path: Path | None = None) -> None:
        settings = get_settings()
        self.db_path = db_path or settings.database_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.init_db()

    def connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self) -> None:
        with self.connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS dqc_snapshots (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    job_id TEXT,
                    source_path TEXT NOT NULL,
                    output_path TEXT NOT NULL,
                    snapshot_json TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute("CREATE INDEX IF NOT EXISTS idx_dqc_snapshots_created_at ON dqc_snapshots(created_at DESC)")

    def latest_snapshot(self) -> dict[str, Any] | None:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM dqc_snapshots ORDER BY created_at DESC LIMIT 1").fetchone()
        return self._row_to_dict(row) if row else None

    def record_snapshot(self, *, job_id: str | None, source_path: str, output_path: str, snapshot: dict[str, Any]) -> dict[str, Any]:
        now = utc_now_iso()
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO dqc_snapshots (job_id, source_path, output_path, snapshot_json, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (job_id, source_path, output_path, json.dumps(snapshot, ensure_ascii=False), now),
            )
            snapshot_id = int(cursor.lastrowid)
        return self.get_snapshot(snapshot_id)

    def get_snapshot(self, snapshot_id: int) -> dict[str, Any]:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM dqc_snapshots WHERE id = ?", (snapshot_id,)).fetchone()
        if row is None:
            raise KeyError(snapshot_id)
        return self._row_to_dict(row)

    def _row_to_dict(self, row: sqlite3.Row) -> dict[str, Any]:
        return {
            "id": row["id"],
            "job_id": row["job_id"],
            "source_path": row["source_path"],
            "output_path": row["output_path"],
            "snapshot": json.loads(row["snapshot_json"] or "{}"),
            "created_at": row["created_at"],
        }


def build_snapshot(result: AuditResult) -> dict[str, Any]:
    overview = result.missing_overview
    summary_tracker = result.summary_tracker
    status_totals = {
        status: int(pd.to_numeric(overview.get(status, pd.Series(dtype=int)), errors="coerce").fillna(0).sum())
        for status in STATUS_BUCKETS
        if status in overview.columns
    }
    field_missing_totals = collect_field_missing_totals(overview)
    return {
        "source_file": run_summary_value(result, "Source file"),
        "source_sheet": run_summary_value(result, "Source sheet"),
        "included_statuses": run_summary_value(result, "Included statuses"),
        "total_rows": result.summary.total_rows,
        "included_rows": result.summary.included_rows,
        "brand_count": result.summary.brand_count,
        "action_count": result.summary.action_count,
        "critical_actions": result.summary.critical_actions,
        "validation_error_count": result.summary.validation_error_count,
        "status_totals": status_totals,
        "field_missing_totals": field_missing_totals,
        "summary_field_missing_totals": collect_field_missing_totals(summary_tracker),
    }


def snapshot_version(snapshot_record: dict[str, Any] | None) -> int | None:
    if not snapshot_record:
        return None
    snapshot = snapshot_record.get("snapshot") or {}
    version = snapshot.get("version")
    if isinstance(version, int) and version > 0:
        return version
    try:
        version_int = int(str(version))
    except (TypeError, ValueError):
        return None
    return version_int if version_int > 0 else None


def next_snapshot_version(previous_record: dict[str, Any] | None) -> int:
    previous_version = snapshot_version(previous_record)
    return 1 if previous_version is None else previous_version + 1


def update_summary_sheet_name(previous_record: dict[str, Any] | None, current_version: int) -> str:
    previous_version = snapshot_version(previous_record)
    if previous_version is None:
        return f"Update Summary v{current_version}"
    return f"Update Summary v{previous_version}-v{current_version}"


def collect_field_missing_totals(dataframe: pd.DataFrame) -> dict[str, int]:
    excluded = {"Brand", "Total", *STATUS_BUCKETS}
    totals: dict[str, int] = {}
    for column in dataframe.columns:
        if column in excluded:
            continue
        total = 0
        for value in dataframe[column]:
            text = str(value or "")
            if text.startswith("missing:"):
                try:
                    total += int(text.split(":", 1)[1].strip())
                except ValueError:
                    continue
        totals[str(column)] = total
    return totals


def build_update_summary_dataframe(current: dict[str, Any], previous_record: dict[str, Any] | None) -> pd.DataFrame:
    current_version = current.get("version", 1)
    previous_version = snapshot_version(previous_record)
    version_label = f"v{current_version}" if previous_version is None else f"v{previous_version}-v{current_version}"
    rows: list[list[Any]] = [
        [f"UPDATE SUMMARY {version_label} - Current Master Data Audit", "", "", ""],
        ["", "", "", ""],
        ["1. FILE CHANGES OVERVIEW", "", "", ""],
        ["Metric", "Previous", "Current", "Change"],
    ]
    previous = previous_record["snapshot"] if previous_record else None
    rows.extend(metric_rows(previous, current))

    rows.extend([["", "", "", ""], ["2. STATUS CHANGES", "", "", ""], ["Status", "Previous", "Current", "Change"]])
    rows.extend(compare_mapping(previous, current, "status_totals"))

    rows.extend([["", "", "", ""], ["3. DATA FIELD MISSING CHANGES", "", "", ""], ["Field", "Previous Missing", "Current Missing", "Change"]])
    rows.extend(compare_mapping(previous, current, "summary_field_missing_totals", limit=80))

    rows.extend([["", "", "", ""], ["4. RUN CONTEXT", "", "", ""], ["Item", "Detail", "", ""]])
    if previous_record:
        rows.append(["Previous version", f"v{previous_version}" if previous_version is not None else "Legacy baseline", "", ""])
        rows.append(["Current version", f"v{current_version}", "", ""])
        rows.append(["Previous snapshot time", previous_record["created_at"], "", ""])
        rows.append(["Previous source", previous_record["source_path"], "", ""])
    else:
        rows.append(["Current version", f"v{current_version}", "", ""])
        rows.append(["Previous snapshot", "No previous DQC snapshot found. This run becomes the baseline.", "", ""])
    rows.extend(
        [
            ["Current source", current.get("source_file", ""), "", ""],
            ["Included statuses", current.get("included_statuses", ""), "", ""],
            ["Memory rule", "Each completed DQC run records a new snapshot for the next report comparison.", "", ""],
        ]
    )
    return pd.DataFrame(rows)


def metric_rows(previous: dict[str, Any] | None, current: dict[str, Any]) -> list[list[Any]]:
    metrics = [
        ("Total rows", "total_rows"),
        ("Included rows", "included_rows"),
        ("Brand count", "brand_count"),
        ("Action rows", "action_count"),
        ("Critical actions", "critical_actions"),
        ("Validation errors", "validation_error_count"),
    ]
    rows = []
    for label, key in metrics:
        prev_value = previous.get(key, 0) if previous else ""
        cur_value = current.get(key, 0)
        rows.append([label, prev_value, cur_value, numeric_delta(prev_value, cur_value) if previous else "baseline"])
    return rows


def compare_mapping(previous: dict[str, Any] | None, current: dict[str, Any], key: str, limit: int | None = None) -> list[list[Any]]:
    current_map = current.get(key, {}) or {}
    previous_map = previous.get(key, {}) if previous else {}
    names = sorted(set(current_map) | set(previous_map))
    rows = []
    for name in names:
        prev_value = int(previous_map.get(name, 0)) if previous else ""
        cur_value = int(current_map.get(name, 0))
        change = numeric_delta(prev_value, cur_value) if previous else "baseline"
        rows.append([name, prev_value, cur_value, change])
    rows.sort(key=lambda row: abs(row[3]) if isinstance(row[3], int) else -1, reverse=True)
    return rows[:limit] if limit else rows


def numeric_delta(previous: Any, current: Any) -> int:
    try:
        return int(current) - int(previous)
    except (TypeError, ValueError):
        return 0


def run_summary_value(result: AuditResult, item: str) -> str:
    if result.run_summary.empty:
        return ""
    rows = result.run_summary[result.run_summary["Item"] == item]
    if rows.empty:
        return ""
    return str(rows.iloc[0]["Value"])
