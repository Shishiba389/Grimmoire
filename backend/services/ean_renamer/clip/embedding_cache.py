from __future__ import annotations

import hashlib
import logging
import sqlite3
import threading
from pathlib import Path

import numpy as np

from .paths import embedding_cache_path as _default_cache_path

logger = logging.getLogger("grimoire.clip.cache")


class EmbeddingCache:
    def __init__(self, db_path: Path | None = None):
        if db_path is None:
            db_path = _default_cache_path()
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
            CREATE TABLE IF NOT EXISTS image_embeddings (
                image_hash TEXT NOT NULL,
                model_version TEXT NOT NULL,
                embedding BLOB NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                PRIMARY KEY (image_hash, model_version)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS fast_lookup (
                file_size INTEGER NOT NULL,
                mtime_ns INTEGER NOT NULL,
                file_path TEXT NOT NULL,
                image_hash TEXT NOT NULL,
                PRIMARY KEY (file_size, mtime_ns, file_path)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS text_prompt_cache (
                prompt_hash TEXT NOT NULL,
                model_version TEXT NOT NULL,
                taxonomy_version TEXT NOT NULL,
                embedding BLOB NOT NULL,
                prompt_code TEXT DEFAULT '',
                PRIMARY KEY (prompt_hash, model_version)
            )
        """)
        conn.commit()

    @staticmethod
    def compute_file_hash(path: Path) -> str:
        h = hashlib.sha256()
        with open(path, "rb") as f:
            while True:
                chunk = f.read(1 << 20)
                if not chunk:
                    break
                h.update(chunk)
        return h.hexdigest()[:32]

    @staticmethod
    def fast_key(path: Path) -> tuple[int, int, str]:
        st = path.stat()
        return (st.st_size, int(st.st_mtime_ns), str(path))

    def lookup_fast(self, path: Path, model_version: str) -> np.ndarray | None:
        size, mtime_ns, fpath = self.fast_key(path)
        conn = self._get_conn()
        row = conn.execute(
            "SELECT image_hash FROM fast_lookup WHERE file_size=? AND mtime_ns=? AND file_path=?",
            (size, mtime_ns, fpath),
        ).fetchone()
        if row is None:
            return None
        return self._get_embedding(row[0], model_version)

    def lookup_hash(self, image_hash: str, model_version: str) -> np.ndarray | None:
        return self._get_embedding(image_hash, model_version)

    def _get_embedding(self, image_hash: str, model_version: str) -> np.ndarray | None:
        conn = self._get_conn()
        row = conn.execute(
            "SELECT embedding FROM image_embeddings WHERE image_hash=? AND model_version=?",
            (image_hash, model_version),
        ).fetchone()
        if row is None:
            return None
        return np.frombuffer(row[0], dtype=np.float16).copy()

    def store(self, path: Path, image_hash: str, model_version: str, embedding: np.ndarray):
        conn = self._get_conn()
        blob = embedding.astype(np.float16).tobytes()
        conn.execute(
            "INSERT OR REPLACE INTO image_embeddings (image_hash, model_version, embedding) VALUES (?, ?, ?)",
            (image_hash, model_version, blob),
        )
        size, mtime_ns, fpath = self.fast_key(path)
        conn.execute(
            "INSERT OR REPLACE INTO fast_lookup (file_size, mtime_ns, file_path, image_hash) VALUES (?, ?, ?, ?)",
            (size, mtime_ns, fpath, image_hash),
        )
        conn.commit()

    def store_batch(self, entries: list[tuple[Path, str, np.ndarray]], model_version: str):
        conn = self._get_conn()
        for path, image_hash, embedding in entries:
            blob = embedding.astype(np.float16).tobytes()
            conn.execute(
                "INSERT OR REPLACE INTO image_embeddings (image_hash, model_version, embedding) VALUES (?, ?, ?)",
                (image_hash, model_version, blob),
            )
            size, mtime_ns, fpath = self.fast_key(path)
            conn.execute(
                "INSERT OR REPLACE INTO fast_lookup (file_size, mtime_ns, file_path, image_hash) VALUES (?, ?, ?, ?)",
                (size, mtime_ns, fpath, image_hash),
            )
        conn.commit()

    def get_text_embeddings(self, model_version: str, taxonomy_version: str) -> dict[str, np.ndarray] | None:
        conn = self._get_conn()
        rows = conn.execute(
            "SELECT prompt_code, embedding FROM text_prompt_cache WHERE model_version=? AND taxonomy_version=?",
            (model_version, taxonomy_version),
        ).fetchall()
        if not rows:
            return None
        return {code: np.frombuffer(blob, dtype=np.float16).copy() for code, blob in rows}

    def store_text_embeddings(self, prompts: dict[str, np.ndarray], model_version: str, taxonomy_version: str):
        conn = self._get_conn()
        conn.execute(
            "DELETE FROM text_prompt_cache WHERE model_version=? AND taxonomy_version=?",
            (model_version, taxonomy_version),
        )
        for code, embedding in prompts.items():
            blob = embedding.astype(np.float16).tobytes()
            prompt_hash = hashlib.sha256(code.encode()).hexdigest()[:32]
            conn.execute(
                "INSERT OR REPLACE INTO text_prompt_cache (prompt_hash, model_version, taxonomy_version, embedding, prompt_code) VALUES (?, ?, ?, ?, ?)",
                (prompt_hash, model_version, taxonomy_version, blob, code),
            )
        conn.commit()
