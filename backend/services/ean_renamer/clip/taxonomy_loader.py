from __future__ import annotations

import hashlib
import logging
from dataclasses import dataclass, field
from pathlib import Path

import pandas as pd

from .paths import taxonomy_path as _default_taxonomy_path

logger = logging.getLogger("grimoire.clip.taxonomy")


@dataclass
class PromptEntry:
    row_type: str
    case: str
    category_code: str
    category: str
    subcategory_code: str
    subcategory: str
    attribute_code: str
    attribute_name: str
    positive_prompt: str
    negative_prompt: str
    detector_hint: str
    priority_weight: float
    decision_rule: str
    output_folder: str


@dataclass
class CategoryDef:
    code: str
    name: str
    priority: int
    subcategory_prompts: list[PromptEntry] = field(default_factory=list)
    attribute_prompts: list[PromptEntry] = field(default_factory=list)


@dataclass
class RuleDef:
    order: int
    name: str
    condition: str
    output: str
    notes: str


@dataclass
class Taxonomy:
    version: str
    categories: dict[str, CategoryDef]
    rules: list[RuleDef]
    all_subcategory_prompts: list[PromptEntry]
    all_attribute_prompts: list[PromptEntry]
    thresholds: dict


_cached: Taxonomy | None = None
_cached_path: str | None = None
_cached_hash: str | None = None


def _file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while True:
            chunk = f.read(1 << 20)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()[:16]


def load_taxonomy(path: Path | None = None) -> Taxonomy:
    global _cached, _cached_path, _cached_hash
    if path is None:
        path = _default_taxonomy_path()
    path = Path(path)
    fhash = _file_hash(path)
    if _cached and _cached_path == str(path) and _cached_hash == fhash:
        return _cached

    logger.info("Loading taxonomy from %s", path)

    taxonomy_map = pd.read_excel(path, sheet_name="01_Taxonomy_Map")
    categories: dict[str, CategoryDef] = {}
    for _, row in taxonomy_map.iterrows():
        case = str(row.get("Case", ""))
        code = str(row.get("Recommended Output Folder", ""))
        name = str(row.get("Main Category", ""))
        priority = int(row.get("Priority", 50))
        categories[code] = CategoryDef(code=code, name=name, priority=priority)

    rules_df = pd.read_excel(path, sheet_name="02_Rules_and_Prompts")
    rules: list[RuleDef] = []
    for _, row in rules_df.iterrows():
        rules.append(RuleDef(
            order=int(row.get("Rule Order", 0)),
            name=str(row.get("Rule Name", "")),
            condition=str(row.get("Condition", "")),
            output=str(row.get("Output", "")),
            notes=str(row.get("Reason / Notes", "")),
        ))

    prompts_df = pd.read_excel(path, sheet_name="04_CLIP_PROMPTS")
    all_sub: list[PromptEntry] = []
    all_attr: list[PromptEntry] = []
    for _, row in prompts_df.iterrows():
        entry = PromptEntry(
            row_type=str(row.get("Row Type", "")),
            case=str(row.get("Case", "")),
            category_code=str(row.get("Category Code", "")),
            category=str(row.get("Category", "")),
            subcategory_code=str(row.get("Subcategory Code", "")),
            subcategory=str(row.get("Subcategory", "")),
            attribute_code=str(row.get("Attribute Code", "") or ""),
            attribute_name=str(row.get("Attribute Name", "") or ""),
            positive_prompt=str(row.get("Positive CLIP Prompt", "")),
            negative_prompt=str(row.get("Negative CLIP Prompt", "")),
            detector_hint=str(row.get("Detector / Heuristic", "")),
            priority_weight=float(row.get("Priority Weight", 50)),
            decision_rule=str(row.get("Decision Rule", "")),
            output_folder=str(row.get("Output Folder", "")),
        )
        cat_code = entry.category_code
        if cat_code in categories:
            if entry.row_type == "SUBCATEGORY_PROMPT":
                categories[cat_code].subcategory_prompts.append(entry)
                all_sub.append(entry)
            elif entry.row_type == "ATTRIBUTE_PROMPT":
                categories[cat_code].attribute_prompts.append(entry)
                all_attr.append(entry)

    config_df = pd.read_excel(path, sheet_name="03_Config_Example")
    thresholds = {}
    for _, row in config_df.iterrows():
        key = str(row.get("Key", ""))
        val = str(row.get("Value / Example", ""))
        thresholds[key] = val

    taxonomy = Taxonomy(
        version=fhash,
        categories=categories,
        rules=rules,
        all_subcategory_prompts=all_sub,
        all_attribute_prompts=all_attr,
        thresholds=thresholds,
    )
    _cached = taxonomy
    _cached_path = str(path)
    _cached_hash = fhash
    logger.info(
        "Taxonomy loaded: %d categories, %d subcategory prompts, %d attribute prompts",
        len(categories), len(all_sub), len(all_attr),
    )
    return taxonomy


def get_category_representative_prompts(taxonomy: Taxonomy) -> dict[str, str]:
    result = {}
    for code, cat in taxonomy.categories.items():
        if cat.subcategory_prompts:
            result[code] = cat.subcategory_prompts[0].positive_prompt
        else:
            result[code] = cat.name
    return result


def get_subcategory_prompts_for_category(taxonomy: Taxonomy, category_code: str) -> list[PromptEntry]:
    cat = taxonomy.categories.get(category_code)
    if cat is None:
        return []
    return cat.subcategory_prompts


def get_attribute_prompts_for_category(taxonomy: Taxonomy, category_code: str) -> list[PromptEntry]:
    cat = taxonomy.categories.get(category_code)
    if cat is None:
        return []
    return cat.attribute_prompts
