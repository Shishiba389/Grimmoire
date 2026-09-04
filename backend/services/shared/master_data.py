"""Master data matching — shared by EAN Renamer bulk mode and Excel parser."""
from __future__ import annotations

import re
from difflib import SequenceMatcher
from pathlib import Path

from pydantic import BaseModel, Field

EAN_PATTERN = re.compile(r"(?<!\d)(\d{13}|\d{8})(?!\d)")
_SEPARATOR = re.compile(r"[\s_\-\.]+")


def ean_checksum_ok(code: str) -> bool:
    digits = [int(c) for c in code]
    check = digits.pop()
    total = sum(d * (3 if i % 2 == 0 else 1) for i, d in enumerate(reversed(digits)))
    return (10 - total % 10) % 10 == check


def extract_ean(name: str, is_file: bool = True) -> str | None:
    text = Path(name).stem if is_file else name
    candidates = EAN_PATTERN.findall(text)
    if not candidates:
        return None
    valid = [c for c in candidates if ean_checksum_ok(c)]
    pool = valid or candidates
    pool.sort(key=len, reverse=True)
    return pool[0]


class MasterDataRow(BaseModel):
    ean: str | None = None
    article_code: str | None = None
    product_name: str | None = None
    raw: dict = Field(default_factory=dict)


class MatchCandidate(BaseModel):
    ean: str
    product_name: str | None = None
    confidence: float
    tier: str
    match_source: str


class MatchResult(BaseModel):
    image_path: str
    image_name: str
    source_folder: str
    candidates: list[MatchCandidate] = Field(default_factory=list)
    selected_index: int | None = None
    status: str


class ImageRecord(BaseModel):
    path: str
    name: str
    source_folder: str
    relative_path: str
    size_bytes: int = 0


class MasterDataUploadResponse(BaseModel):
    session_id: str
    row_count: int = 0
    columns_detected: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)


def _normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9 ]+", " ", text.lower()).strip()


def _tokenize_filename(name: str) -> list[str]:
    stem = Path(name).stem
    return [t for t in _SEPARATOR.split(stem) if t]


class MasterDataMatcher:
    """Matches image filenames against master data using 3 tiers: EAN, code, name."""

    def __init__(self, rows: list[MasterDataRow]) -> None:
        self._ean_index: dict[str, MasterDataRow] = {}
        self._code_index: dict[str, MasterDataRow] = {}
        self._name_entries: list[tuple[str, MasterDataRow]] = []

        for row in rows:
            if row.ean:
                clean_ean = row.ean.strip()
                if clean_ean:
                    self._ean_index[clean_ean] = row
            if row.article_code:
                clean_code = row.article_code.strip().lower()
                if clean_code:
                    self._code_index[clean_code] = row
            if row.product_name:
                normalized = _normalize(row.product_name)
                if normalized:
                    self._name_entries.append((normalized, row))

    def match(self, image: ImageRecord) -> MatchResult:
        candidates: list[MatchCandidate] = []
        self._tier1_ean(image.name, candidates)
        self._tier2_code(image.name, candidates)
        self._tier3_name(image.name, candidates)

        seen: set[str] = set()
        unique: list[MatchCandidate] = []
        for c in candidates:
            if c.ean not in seen:
                seen.add(c.ean)
                unique.append(c)
        candidates = unique

        if not candidates:
            status = "unmatched"
        elif len(candidates) == 1:
            status = "matched"
        else:
            status = "ambiguous"
        selected = 0 if len(candidates) == 1 else None

        return MatchResult(
            image_path=image.path,
            image_name=image.name,
            source_folder=image.source_folder,
            candidates=candidates,
            selected_index=selected,
            status=status,
        )

    def _tier1_ean(self, filename: str, candidates: list[MatchCandidate]) -> None:
        ean = extract_ean(filename, is_file=True)
        if not ean:
            return
        row = self._ean_index.get(ean)
        if row:
            candidates.append(MatchCandidate(
                ean=row.ean, product_name=row.product_name, confidence=1.0, tier="ean",
                match_source=f"filename EAN '{ean}' -> master EAN",
            ))
        elif ean_checksum_ok(ean):
            candidates.append(MatchCandidate(
                ean=ean, product_name=None, confidence=0.9, tier="ean",
                match_source=f"filename EAN '{ean}' (valid checksum, not in master)",
            ))

    def _tier2_code(self, filename: str, candidates: list[MatchCandidate]) -> None:
        for token in _tokenize_filename(filename):
            row = self._code_index.get(token.lower())
            if row:
                candidates.append(MatchCandidate(
                    ean=row.ean or token.lower(), product_name=row.product_name,
                    confidence=0.8, tier="code",
                    match_source=f"filename token '{token}' -> master code '{row.article_code}'",
                ))

    def _tier3_name(self, filename: str, candidates: list[MatchCandidate]) -> None:
        if any(c.confidence >= 0.95 for c in candidates):
            return
        normalized_filename = _normalize(Path(filename).stem)
        if not normalized_filename or len(normalized_filename) < 3:
            return

        filename_tokens = set(normalized_filename.split())
        best_ratio = 0.0
        best_row: MasterDataRow | None = None

        for norm_name, row in self._name_entries:
            if abs(len(normalized_filename) - len(norm_name)) > max(len(normalized_filename), len(norm_name)) * 0.6:
                continue
            if not filename_tokens & set(norm_name.split()):
                continue
            ratio = SequenceMatcher(None, normalized_filename, norm_name).ratio()
            if ratio >= 0.6 and ratio > best_ratio:
                best_ratio = ratio
                best_row = row

        if best_row:
            candidates.append(MatchCandidate(
                ean=best_row.ean or "", product_name=best_row.product_name,
                confidence=round(min(best_ratio * 0.7, 0.7), 2), tier="name",
                match_source=f"filename fuzzy match -> '{best_row.product_name}' (ratio {best_ratio:.2f})",
            ))
