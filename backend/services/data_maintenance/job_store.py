from __future__ import annotations

import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from .models import JobRecord, JobStatus
from .settings import get_settings


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat()


class JobStore:
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
                CREATE TABLE IF NOT EXISTS jobs (
                    id TEXT PRIMARY KEY,
                    type TEXT NOT NULL,
                    status TEXT NOT NULL,
                    original_filename TEXT,
                    input_path TEXT,
                    output_path TEXT,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    error TEXT,
                    summary_json TEXT NOT NULL DEFAULT '{}'
                )
                """
            )
            conn.execute("CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC)")

    def create_job(
        self,
        *,
        job_id: str,
        job_type: str,
        original_filename: str | None,
        input_path: str | None,
    ) -> JobRecord:
        now = utc_now_iso()
        with self.connect() as conn:
            conn.execute(
                """
                INSERT INTO jobs (
                    id, type, status, original_filename, input_path, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (job_id, job_type, JobStatus.pending.value, original_filename, input_path, now, now),
            )
        return self.get_job(job_id)

    def update_job(
        self,
        job_id: str,
        *,
        status: JobStatus | None = None,
        output_path: str | None = None,
        error: str | None = None,
        summary: dict[str, Any] | None = None,
    ) -> JobRecord:
        current = self.get_job(job_id)
        next_status = status or current.status
        next_output = output_path if output_path is not None else current.output_path
        next_error = error if error is not None else current.error
        next_summary = summary if summary is not None else current.summary
        with self.connect() as conn:
            conn.execute(
                """
                UPDATE jobs
                SET status = ?, output_path = ?, error = ?, summary_json = ?, updated_at = ?
                WHERE id = ?
                """,
                (
                    next_status.value,
                    next_output,
                    next_error,
                    json.dumps(next_summary, ensure_ascii=False),
                    utc_now_iso(),
                    job_id,
                ),
            )
        return self.get_job(job_id)

    def get_job(self, job_id: str) -> JobRecord:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        if row is None:
            raise KeyError(job_id)
        return self._row_to_job(row)

    def list_jobs(self, limit: int = 50) -> list[JobRecord]:
        with self.connect() as conn:
            rows = conn.execute(
                "SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?",
                (max(1, min(limit, 500)),),
            ).fetchall()
        return [self._row_to_job(row) for row in rows]

    def _row_to_job(self, row: sqlite3.Row) -> JobRecord:
        return JobRecord(
            id=row["id"],
            type=row["type"],
            status=JobStatus(row["status"]),
            original_filename=row["original_filename"],
            input_path=row["input_path"],
            output_path=row["output_path"],
            created_at=datetime.fromisoformat(row["created_at"]),
            updated_at=datetime.fromisoformat(row["updated_at"]),
            error=row["error"],
            summary=json.loads(row["summary_json"] or "{}"),
        )
