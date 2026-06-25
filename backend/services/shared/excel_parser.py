"""Shared Excel / master-data parsing used by both EAN Sorter and EAN Renamer."""

from __future__ import annotations

import re
import tempfile
import time
import uuid
from pathlib import Path
from typing import Any

import pandas as pd
from fastapi import HTTPException, UploadFile

from services.ean_sorter.matcher import MasterDataMatcher
from services.ean_sorter.models import MasterDataRow, MasterDataUploadResponse

_EAN_KEYS = {"ean", "barcode", "bar_code", "ma_ean", "sku"}
_CODE_KEYS = {"ot_article_number", "article_code", "code", "article_number", "ot_code", "item_code"}
_NAME_KEYS = {"product_name", "product", "name", "ten_san_pham", "title"}


def normalize_barcode_value(text: str) -> str:
    if not text or text.lower() in ("nan", "none", ""):
        return ""
    if re.fullmatch(r"\d+\.0+", text):
        return text.split(".", 1)[0]
    return text


def parse_master_excel(path: Path, filename: str) -> tuple[list[MasterDataRow], list[str], list[str]]:
    """Parse an Excel file and return (rows, columns_detected, warnings)."""
    try:
        df = pd.read_excel(path, dtype=str, keep_default_na=False)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read file: {exc}") from exc

    columns_lower = {col: col.strip().lower().replace(" ", "_") for col in df.columns}

    def _find_col(aliases: set[str]) -> str | None:
        for orig, norm in columns_lower.items():
            if norm in aliases:
                return orig
        return None

    ean_col = _find_col(_EAN_KEYS)
    code_col = _find_col(_CODE_KEYS)
    name_col = _find_col(_NAME_KEYS)

    detected: list[str] = []
    if ean_col:
        detected.append(f"EAN: {ean_col}")
    if code_col:
        detected.append(f"Code: {code_col}")
    if name_col:
        detected.append(f"Name: {name_col}")

    warnings: list[str] = []
    if not ean_col and not code_col and not name_col:
        warnings.append("No recognizable columns found. Check your file headers.")

    rows: list[MasterDataRow] = []
    for _, row in df.iterrows():
        ean_val = str(row.get(ean_col, "")).strip() if ean_col else None
        code_val = str(row.get(code_col, "")).strip() if code_col else None
        name_val = str(row.get(name_col, "")).strip() if name_col else None
        if ean_val:
            ean_val = normalize_barcode_value(ean_val)
        if not ean_val and not code_val and not name_val:
            continue
        rows.append(MasterDataRow(
            ean=ean_val or None,
            article_code=code_val or None,
            product_name=name_val or None,
            raw=dict(row),
        ))

    return rows, detected, warnings


def parse_and_register(
    path: Path,
    filename: str,
    sessions: dict[str, Any],
    cleanup_fn: callable,
    max_sessions: int = 10,
) -> dict:
    """Parse master data, register a session, and return the response dict."""
    rows, detected, warnings = parse_master_excel(path, filename)

    session_id = str(uuid.uuid4())
    matcher = MasterDataMatcher(rows)
    cleanup_fn()
    sessions[session_id] = (matcher, rows, time.time())

    return MasterDataUploadResponse(
        session_id=session_id,
        row_count=len(rows),
        columns_detected=detected,
        warnings=warnings,
    ).model_dump()


async def handle_upload(
    file: UploadFile,
    sessions: dict[str, Any],
    cleanup_fn: callable,
) -> dict:
    """Handle the /master-data/upload endpoint — read file, parse, register."""
    import asyncio

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="File is empty")
    suffix = Path(file.filename or "").suffix.lower()
    tmp = Path(tempfile.mktemp(suffix=suffix or ".xlsx"))
    tmp.write_bytes(content)
    try:
        return await asyncio.to_thread(
            parse_and_register, tmp, file.filename or "master_data.xlsx", sessions, cleanup_fn
        )
    finally:
        try:
            tmp.unlink()
        except OSError:
            pass


def handle_upload_path(
    payload: dict,
    sessions: dict[str, Any],
    cleanup_fn: callable,
) -> dict:
    """Handle the /master-data/upload-path endpoint."""
    file_path = payload.get("path", "")
    if not file_path:
        raise HTTPException(status_code=400, detail="path is required")
    source = Path(file_path).expanduser()
    if not source.is_file():
        raise HTTPException(status_code=404, detail=f"File not found: {source}")
    return parse_and_register(source, source.name, sessions, cleanup_fn)
