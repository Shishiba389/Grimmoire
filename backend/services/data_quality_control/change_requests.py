from __future__ import annotations

import json
import sqlite3
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from openpyxl import Workbook

from services.data_maintenance.settings import get_settings


CHANGE_REQUEST_COLUMNS = [
    "Request ID",
    "Request Type",
    "Status",
    "SKU",
    "Brand",
    "Product Name",
    "Payload JSON",
    "Created At",
]


def utc_now_iso() -> str:
    return datetime.now(UTC).isoformat()


class ChangeRequestStore:
    def __init__(self, db_path: Path | None = None) -> None:
        settings = get_settings()
        self.db_path = db_path or settings.database_path
        self.output_dir = settings.resolve_storage_path(Path("storage/outputs/change_requests"))
        self.output_dir.mkdir(parents=True, exist_ok=True)
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
                CREATE TABLE IF NOT EXISTS master_change_requests (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    request_type TEXT NOT NULL,
                    status TEXT NOT NULL,
                    sku TEXT NOT NULL,
                    brand TEXT NOT NULL,
                    product_name TEXT NOT NULL,
                    payload_json TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
                """
            )
            conn.execute("CREATE INDEX IF NOT EXISTS idx_master_change_requests_created_at ON master_change_requests(created_at DESC)")

    def create_request(self, request_type: str, sku: str, brand: str, product_name: str, payload: dict[str, Any]) -> dict[str, Any]:
        now = utc_now_iso()
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO master_change_requests (
                    request_type, status, sku, brand, product_name, payload_json, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    request_type,
                    "Pending",
                    sku.strip(),
                    brand.strip(),
                    product_name.strip(),
                    json.dumps(payload, ensure_ascii=False),
                    now,
                ),
            )
            request_id = int(cursor.lastrowid)
        request = self.get_request(request_id)
        request["export_path"] = str(self.export_request_patch(request))
        return request

    def list_requests(self, limit: int = 100) -> list[dict[str, Any]]:
        with self.connect() as conn:
            rows = conn.execute(
                "SELECT * FROM master_change_requests ORDER BY created_at DESC LIMIT ?",
                (max(1, min(limit, 500)),),
            ).fetchall()
        return [self._row_to_dict(row) for row in rows]

    def get_request(self, request_id: int) -> dict[str, Any]:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM master_change_requests WHERE id = ?", (request_id,)).fetchone()
        if row is None:
            raise KeyError(request_id)
        return self._row_to_dict(row)

    def export_request_patch(self, request: dict[str, Any]) -> Path:
        output_path = self.output_dir / f"master_change_request_{request['id']:06d}.xlsx"
        workbook = Workbook()
        worksheet = workbook.active
        worksheet.title = "Master Data Change Request"
        worksheet.append(CHANGE_REQUEST_COLUMNS)
        worksheet.append(
            [
                request["id"],
                request["request_type"],
                request["status"],
                request["sku"],
                request["brand"],
                request["product_name"],
                json.dumps(request["payload"], ensure_ascii=False),
                request["created_at"],
            ]
        )

        fields = workbook.create_sheet("Fields")
        fields.append(["Field", "Value"])
        for key, value in request["payload"].items():
            fields.append([key, value])

        workbook.save(output_path)
        return output_path

    def _row_to_dict(self, row: sqlite3.Row) -> dict[str, Any]:
        return {
            "id": row["id"],
            "request_type": row["request_type"],
            "status": row["status"],
            "sku": row["sku"],
            "brand": row["brand"],
            "product_name": row["product_name"],
            "payload": json.loads(row["payload_json"] or "{}"),
            "created_at": row["created_at"],
        }
