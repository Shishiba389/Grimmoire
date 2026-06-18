from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class RuleProfile:
    included_statuses: set[str]
    priority_fields: dict[str, list[str]]
    field_priority: dict[str, str]
    fields_to_audit: list[str]


def load_rule_profile(path: Path | None = None) -> RuleProfile:
    rules_path = path or Path(__file__).with_name("default_rules.yaml")
    with rules_path.open("r", encoding="utf-8") as handle:
        raw: dict[str, Any] = yaml.safe_load(handle) or {}

    priority_fields = {
        str(priority): [str(field) for field in fields]
        for priority, fields in (raw.get("priority_fields") or {}).items()
    }
    field_priority: dict[str, str] = {}
    fields_to_audit: list[str] = []
    for priority, fields in priority_fields.items():
        for field in fields:
            field_priority[field] = priority
            fields_to_audit.append(field)

    return RuleProfile(
        included_statuses={str(status).strip() for status in raw.get("included_statuses", [])},
        priority_fields=priority_fields,
        field_priority=field_priority,
        fields_to_audit=fields_to_audit,
    )
