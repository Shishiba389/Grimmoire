"""EAN Sorter — 3-tier duplicate image detection by filename analysis."""
from __future__ import annotations

import re
import uuid
from collections import defaultdict
from difflib import SequenceMatcher
from pathlib import Path

from .core import extract_ean
from .models import ImageRecord, DuplicateGroup, DuplicateDetectionResponse

_SEPARATOR = re.compile(r"[\s_\-\.]+")

_STRIP_SUFFIX = re.compile(
    r"[_\-](?:"
    r"\d+|front|back|side|top|bottom|left|right|"
    r"large|small|thumb|thumbnail|detail|zoom|closeup|close|"
    r"main|alt|extra|hero|"
    r"\d+x\d+"
    r")$",
    re.IGNORECASE,
)


def _normalize_basename(name: str) -> str:
    stem = Path(name).stem
    norm = stem.lower().replace("-", "_")
    while True:
        reduced = _STRIP_SUFFIX.sub("", norm)
        if reduced == norm:
            break
        norm = reduced
    return norm.strip("_ ")


def _tokenize(name: str) -> list[str]:
    stem = Path(name).stem
    return [t for t in _SEPARATOR.split(stem) if t and len(t) >= 3]


def detect_duplicate_groups(
    images: list[ImageRecord],
    threshold: float = 0.8,
) -> DuplicateDetectionResponse:
    grouped_paths: set[str] = set()
    groups: list[DuplicateGroup] = []

    tier1 = _tier1_ean_groups(images)
    for g in tier1:
        groups.append(g)
        for img in g.images:
            grouped_paths.add(img.path)

    tier2 = _tier2_code_groups(images, grouped_paths)
    for g in tier2:
        groups.append(g)
        for img in g.images:
            grouped_paths.add(img.path)

    tier3 = _tier3_basename_groups(images, grouped_paths, threshold)
    for g in tier3:
        groups.append(g)
        for img in g.images:
            grouped_paths.add(img.path)

    total_grouped = len(grouped_paths)
    return DuplicateDetectionResponse(
        groups=groups,
        total_images_grouped=total_grouped,
        ungrouped_count=len(images) - total_grouped,
    )


def _tier1_ean_groups(images: list[ImageRecord]) -> list[DuplicateGroup]:
    buckets: dict[str, list[ImageRecord]] = defaultdict(list)
    for img in images:
        ean = extract_ean(img.name, is_file=True)
        if ean:
            buckets[ean].append(img)

    groups: list[DuplicateGroup] = []
    for ean, imgs in buckets.items():
        if len(imgs) < 2:
            continue
        groups.append(DuplicateGroup(
            group_id=str(uuid.uuid4())[:8],
            tier="ean",
            common_key=ean,
            images=imgs,
            suggested_folder_name=ean,
        ))
    return groups


def _tier2_code_groups(
    images: list[ImageRecord],
    already_grouped: set[str],
) -> list[DuplicateGroup]:
    remaining = [img for img in images if img.path not in already_grouped]

    token_to_images: dict[str, list[ImageRecord]] = defaultdict(list)
    for img in remaining:
        tokens = _tokenize(img.name)
        seen_tokens: set[str] = set()
        for token in tokens:
            norm = token.lower()
            if norm not in seen_tokens and re.match(r"^[a-z0-9]+$", norm):
                seen_tokens.add(norm)
                token_to_images[norm].append(img)

    groups: list[DuplicateGroup] = []
    used_paths: set[str] = set()
    sorted_tokens = sorted(token_to_images.items(), key=lambda x: -len(x[1]))

    for token, imgs in sorted_tokens:
        if len(imgs) < 2:
            continue
        fresh = [img for img in imgs if img.path not in used_paths]
        if len(fresh) < 2:
            continue
        groups.append(DuplicateGroup(
            group_id=str(uuid.uuid4())[:8],
            tier="code",
            common_key=token,
            images=fresh,
            suggested_folder_name=token,
        ))
        for img in fresh:
            used_paths.add(img.path)

    return groups


def _tier3_basename_groups(
    images: list[ImageRecord],
    already_grouped: set[str],
    threshold: float,
) -> list[DuplicateGroup]:
    remaining = [img for img in images if img.path not in already_grouped]

    buckets: dict[str, list[ImageRecord]] = defaultdict(list)
    for img in remaining:
        base = _normalize_basename(img.name)
        if len(base) < 3:
            continue
        buckets[base].append(img)

    groups: list[DuplicateGroup] = []
    for base, imgs in buckets.items():
        if len(imgs) < 2:
            continue
        if threshold < 1.0:
            names = [_normalize_basename(img.name) for img in imgs]
            all_similar = all(
                SequenceMatcher(None, names[0], n).ratio() >= threshold
                for n in names[1:]
            )
            if not all_similar:
                continue
        groups.append(DuplicateGroup(
            group_id=str(uuid.uuid4())[:8],
            tier="basename",
            common_key=base,
            images=imgs,
            suggested_folder_name=base,
        ))
    return groups
