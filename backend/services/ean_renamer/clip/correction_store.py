from __future__ import annotations

import logging
import sqlite3
import threading
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

from .paths import corrections_db_path as _default_corrections_path, user_data_dir
from .schemas import CorrectionRecord

logger = logging.getLogger("grimoire.clip.corrections")


class CorrectionStore:
    def __init__(self, db_path: Path | None = None):
        if db_path is None:
            db_path = _default_corrections_path()
        self._db_path = db_path
        self._local = threading.local()
        self._init_db()

    def _get_conn(self) -> sqlite3.Connection:
        conn = getattr(self._local, "conn", None)
        if conn is None:
            conn = sqlite3.connect(str(self._db_path), check_same_thread=False)
            conn.execute("PRAGMA journal_mode=WAL")
            conn.execute("PRAGMA synchronous=NORMAL")
            self._local.conn = conn
        return conn

    def _init_db(self):
        conn = self._get_conn()
        conn.execute("""
            CREATE TABLE IF NOT EXISTS corrections (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image_hash TEXT NOT NULL,
                relative_path TEXT NOT NULL,
                source_batch TEXT DEFAULT '',
                predicted_category TEXT NOT NULL,
                predicted_subcategory TEXT DEFAULT '',
                corrected_category TEXT NOT NULL,
                corrected_subcategory TEXT DEFAULT '',
                top1_score REAL DEFAULT 0,
                top2_score REAL DEFAULT 0,
                score_gap REAL DEFAULT 0,
                clip_model_version TEXT DEFAULT '',
                taxonomy_version TEXT DEFAULT '',
                embedding_cache_key TEXT DEFAULT '',
                created_at TEXT DEFAULT (datetime('now'))
            )
        """)
        conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_corrections_hash
            ON corrections (image_hash)
        """)
        conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_corrections_category
            ON corrections (corrected_category)
        """)
        conn.commit()

    def commit_batch(self, records: list[CorrectionRecord]):
        if not records:
            return
        conn = self._get_conn()
        for r in records:
            conn.execute(
                """INSERT INTO corrections (
                    image_hash, relative_path, source_batch,
                    predicted_category, predicted_subcategory,
                    corrected_category, corrected_subcategory,
                    top1_score, top2_score, score_gap,
                    clip_model_version, taxonomy_version,
                    embedding_cache_key, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    r.image_hash, r.relative_path, r.source_batch,
                    r.predicted_category, r.predicted_subcategory,
                    r.corrected_category, r.corrected_subcategory,
                    r.top1_score, r.top2_score, r.score_gap,
                    r.clip_model_version, r.taxonomy_version,
                    r.embedding_cache_key, r.created_at or datetime.now(timezone.utc).isoformat(),
                ),
            )
        conn.commit()
        logger.info("Committed %d corrections", len(records))

    def get_correction_count(self) -> int:
        conn = self._get_conn()
        row = conn.execute("SELECT COUNT(*) FROM corrections").fetchone()
        return row[0] if row else 0

    def get_category_counts(self) -> dict[str, int]:
        conn = self._get_conn()
        rows = conn.execute(
            "SELECT corrected_category, COUNT(*) FROM corrections GROUP BY corrected_category"
        ).fetchall()
        return {cat: count for cat, count in rows}

    def get_all_corrections(self) -> list[dict]:
        conn = self._get_conn()
        conn.row_factory = sqlite3.Row
        rows = conn.execute("SELECT * FROM corrections ORDER BY created_at DESC").fetchall()
        conn.row_factory = None
        return [dict(r) for r in rows]

    def get_training_data(self, min_per_category: int = 5) -> tuple[list[str], list[str]] | None:
        counts = self.get_category_counts()
        valid_cats = {cat for cat, count in counts.items() if count >= min_per_category}
        if len(valid_cats) < 2:
            return None

        conn = self._get_conn()
        rows = conn.execute(
            "SELECT embedding_cache_key, corrected_category FROM corrections WHERE corrected_category IN ({})".format(
                ",".join("?" * len(valid_cats))
            ),
            list(valid_cats),
        ).fetchall()

        hashes = [r[0] for r in rows]
        labels = [r[1] for r in rows]
        return hashes, labels

    def export_excel(self, output_path: Path | None = None) -> Path:
        if output_path is None:
            output_path = user_data_dir() / "correction_report.xlsx"

        records = self.get_all_corrections()
        if records:
            df = pd.DataFrame(records)
        else:
            df = pd.DataFrame()

        df.to_excel(str(output_path), index=False, engine="openpyxl")
        logger.info("Exported %d corrections to %s", len(records), output_path)
        return output_path
