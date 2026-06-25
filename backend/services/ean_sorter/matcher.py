"""EAN Sorter v2 — tiered matching engine (EAN → CODE → Product Name)."""
from __future__ import annotations

import re
from difflib import SequenceMatcher
from pathlib import Path

from .core import ean_checksum_ok, extract_ean
from .models import ImageRecord, MatchCandidate, MatchResult, MasterDataRow

_SEPARATOR = re.compile(r"[\s_\-\.]+")


def _normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9 ]+", " ", text.lower()).strip()


def _tokenize_filename(name: str) -> list[str]:
    stem = Path(name).stem
    return [t for t in _SEPARATOR.split(stem) if t]


class MasterDataMatcher:
    """Matches image filenames against master data using 3 tiers."""

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

        seen_eans: set[str] = set()
        unique: list[MatchCandidate] = []
        for c in candidates:
            if c.ean not in seen_eans:
                seen_eans.add(c.ean)
                unique.append(c)
        candidates = unique

        if len(candidates) == 0:
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

    def match_batch(
        self,
        images: list[ImageRecord],
        progress_cb: callable | None = None,
    ) -> list[MatchResult]:
        results: list[MatchResult] = []
        total = len(images)
        for i, img in enumerate(images):
            results.append(self.match(img))
            if progress_cb and (i + 1) % 50 == 0:
                progress_cb(i + 1, total)
        if progress_cb and total > 0:
            progress_cb(total, total)
        return results

    def _tier1_ean(self, filename: str, candidates: list[MatchCandidate]) -> None:
        ean = extract_ean(filename, is_file=True)
        if not ean:
            return
        row = self._ean_index.get(ean)
        if row:
            candidates.append(MatchCandidate(
                ean=row.ean,
                product_name=row.product_name,
                confidence=1.0,
                tier="ean",
                match_source=f"filename EAN '{ean}' → master EAN",
            ))
        elif ean_checksum_ok(ean):
            candidates.append(MatchCandidate(
                ean=ean,
                product_name=None,
                confidence=0.9,
                tier="ean",
                match_source=f"filename EAN '{ean}' (valid checksum, not in master)",
            ))

    def _tier2_code(self, filename: str, candidates: list[MatchCandidate]) -> None:
        tokens = _tokenize_filename(filename)
        for token in tokens:
            normalized = token.lower()
            row = self._code_index.get(normalized)
            if row:
                ean = row.ean or normalized
                candidates.append(MatchCandidate(
                    ean=ean,
                    product_name=row.product_name,
                    confidence=0.8,
                    tier="code",
                    match_source=f"filename token '{token}' → master code '{row.article_code}'",
                ))

    def _tier3_name(self, filename: str, candidates: list[MatchCandidate]) -> None:
        if candidates:
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
            name_tokens = set(norm_name.split())
            if not filename_tokens & name_tokens:
                continue
            ratio = SequenceMatcher(None, normalized_filename, norm_name).ratio()
            if ratio >= 0.6 and ratio > best_ratio:
                best_ratio = ratio
                best_row = row

        if best_row:
            ean = best_row.ean or ""
            candidates.append(MatchCandidate(
                ean=ean,
                product_name=best_row.product_name,
                confidence=round(min(best_ratio * 0.7, 0.7), 2),
                tier="name",
                match_source=f"filename fuzzy match → '{best_row.product_name}' (ratio {best_ratio:.2f})",
            ))
