from __future__ import annotations

import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from services.data_maintenance.settings import get_settings


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat()


class AuditHistoryStore:
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
                CREATE TABLE IF NOT EXISTS audit_runs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    job_id TEXT,
                    source_path TEXT NOT NULL,
                    output_path TEXT NOT NULL,
                    total_rows INTEGER NOT NULL,
                    included_rows INTEGER NOT NULL,
                    brand_count INTEGER NOT NULL,
                    action_count INTEGER NOT NULL,
                    critical_actions INTEGER NOT NULL,
                    validation_error_count INTEGER NOT NULL,
                    warnings_json TEXT NOT NULL DEFAULT '[]',
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute("CREATE INDEX IF NOT EXISTS idx_audit_runs_created_at ON audit_runs(created_at DESC)")
            conn.execute("CREATE INDEX IF NOT EXISTS idx_audit_runs_job_id ON audit_runs(job_id)")

    def record_run(self, *, job_id: str | None, source_path: str, summary: dict[str, Any]) -> dict[str, Any]:
        now = utc_now_iso()
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO audit_runs (
                    job_id, source_path, output_path, total_rows, included_rows, brand_count,
                    action_count, critical_actions, validation_error_count, warnings_json, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    job_id,
                    source_path,
                    summary.get("output_path", ""),
                    int(summary.get("total_rows", 0)),
                    int(summary.get("included_rows", 0)),
                    int(summary.get("brand_count", 0)),
                    int(summary.get("action_count", 0)),
                    int(summary.get("critical_actions", 0)),
                    int(summary.get("validation_error_count", 0)),
                    json.dumps(summary.get("warnings", []), ensure_ascii=False),
                    now,
                ),
            )
            run_id = cursor.lastrowid
        return self.get_run(int(run_id))

    def list_runs(self, limit: int = 50) -> list[dict[str, Any]]:
        with self.connect() as conn:
            rows = conn.execute(
                "SELECT * FROM audit_runs ORDER BY created_at DESC LIMIT ?",
                (max(1, min(limit, 500)),),
            ).fetchall()
        return [self._row_to_dict(row) for row in rows]

    def get_run(self, run_id: int) -> dict[str, Any]:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM audit_runs WHERE id = ?", (run_id,)).fetchone()
        if row is None:
            raise KeyError(run_id)
        return self._row_to_dict(row)

    def _row_to_dict(self, row: sqlite3.Row) -> dict[str, Any]:
        return {
            "id": row["id"],
            "job_id": row["job_id"],
            "source_path": row["source_path"],
            "output_path": row["output_path"],
            "total_rows": row["total_rows"],
            "included_rows": row["included_rows"],
            "brand_count": row["brand_count"],
            "action_count": row["action_count"],
            "critical_actions": row["critical_actions"],
            "validation_error_count": row["validation_error_count"],
            "warnings": json.loads(row["warnings_json"] or "[]"),
            "created_at": row["created_at"],
        }

