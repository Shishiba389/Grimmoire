"""EAN Sorter — core EAN utilities."""
from __future__ import annotations

import re
from pathlib import Path

EAN_PATTERN = re.compile(r"(?<!\d)(\d{13}|\d{8})(?!\d)")


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
