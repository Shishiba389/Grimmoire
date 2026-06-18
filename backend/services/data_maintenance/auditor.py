from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import pandas as pd

from .excel_reader import CANONICAL_ALIASES, ReadResult, find_column
from .models import AuditSummary
from .rules import RuleProfile


MISSING_VALUES = {"", "-", "na", "n/a", "none", "null", "tbc", "tbd", "todo", "unknown"}
STATUS_BUCKETS = ["Active", "Upcoming", "Limited", "Non-Active", "Discontinued", "Blanks", "N/A", "Unknown", "Non-ACR", "Others"]


@dataclass
class AuditResult:
    executive_summary: pd.DataFrame
    brand_scorecard: pd.DataFrame
    missing_overview: pd.DataFrame
    summary_tracker: pd.DataFrame
    action_tracker: pd.DataFrame
    sku_missing_detail: pd.DataFrame
    validation_errors: pd.DataFrame
    run_summary: pd.DataFrame
    summary: AuditSummary


def audit_master_data(read_result: ReadResult, rules: RuleProfile, output_path: Path) -> AuditResult:
    df = read_result.dataframe.copy()
    brand_col = find_column(list(df.columns), CANONICAL_ALIASES["brand"])
    status_col = find_column(list(df.columns), CANONICAL_ALIASES["status"])
    sku_col = find_column(list(df.columns), CANONICAL_ALIASES["sku"])
    product_name_col = find_column(list(df.columns), CANONICAL_ALIASES["product_name"])
    if brand_col is None:
        raise ValueError("Required column not found: Brand")

    df["_brand"] = df[brand_col].map(lambda value: value.strip() or "Unknown Brand")
    df["_status_raw"] = df[status_col].map(str.strip) if status_col else ""
    df["_status_bucket"] = df["_status_raw"].map(status_bucket)
    df["_included"] = df["_status_raw"].map(lambda value: is_included_status(value, rules))
    included = df[df["_included"]].copy()
    if included.empty:
        included = df.copy()
        included["_included"] = True

    available_fields = [field for field in rules.fields_to_audit if field in included.columns]
    missing_overview = build_missing_overview(included, available_fields)
    summary_tracker = build_summary_tracker(missing_overview)
    action_tracker = build_action_tracker(included, available_fields, rules)
    sku_missing_detail = build_sku_missing_detail(included, available_fields, rules, sku_col, product_name_col)
    validation_errors = build_validation_errors(included, sku_col, product_name_col)
    brand_scorecard = build_brand_scorecard(included, available_fields, rules, action_tracker, validation_errors)
    executive_summary = build_executive_summary(df, included, brand_scorecard, action_tracker, validation_errors)
    run_summary = pd.DataFrame(
        [
            ("Source file", str(read_result.source_path)),
            ("Source sheet", read_result.sheet_name),
            ("Header row", read_result.header_row),
            ("Total rows", len(df)),
            ("Included rows", len(included)),
            ("Brand count", included["_brand"].nunique()),
            ("Audited fields present", len(available_fields)),
            ("Missing audited fields absent from input", ", ".join(field for field in rules.fields_to_audit if field not in included.columns)),
            ("Warnings", " | ".join(read_result.warnings)),
        ],
        columns=["Item", "Value"],
    )

    summary = AuditSummary(
        total_rows=len(df),
        included_rows=len(included),
        brand_count=int(included["_brand"].nunique()),
        action_count=len(action_tracker),
        critical_actions=int((action_tracker["Priority"] == "Critical").sum()) if not action_tracker.empty else 0,
        validation_error_count=len(validation_errors),
        output_path=str(output_path),
        warnings=read_result.warnings,
    )
    return AuditResult(
        executive_summary=executive_summary,
        brand_scorecard=brand_scorecard,
        missing_overview=missing_overview,
        summary_tracker=summary_tracker,
        action_tracker=action_tracker,
        sku_missing_detail=sku_missing_detail,
        validation_errors=validation_errors,
        run_summary=run_summary,
        summary=summary,
    )


def is_missing(value: Any) -> bool:
    if value is None:
        return True
    normalized = str(value).strip().lower()
    return normalized in MISSING_VALUES


def is_included_status(value: str, rules: RuleProfile) -> bool:
    stripped = value.strip()
    return stripped in rules.included_statuses or (stripped == "" and "" in rules.included_statuses)


def status_bucket(value: str) -> str:
    normalized = value.strip().upper()
    if normalized == "":
        return "Blanks"
    if normalized == "ACTIVE":
        return "Active"
    if normalized == "UPCOMING":
        return "Upcoming"
    if normalized == "LIMITED":
        return "Limited"
    if normalized in {"NON-ACTIVE", "NON ACTIVE", "INACTIVE"}:
        return "Non-Active"
    if normalized == "DISCONTINUED":
        return "Discontinued"
    if normalized == "N/A":
        return "N/A"
    if normalized == "NON-ACR":
        return "Non-ACR"
    if normalized == "UNKNOWN":
        return "Unknown"
    return "Others"


def build_missing_overview(df: pd.DataFrame, fields: list[str]) -> pd.DataFrame:
    rows: list[dict[str, Any]] = []
    for brand, group in df.groupby("_brand", dropna=False):
        row: dict[str, Any] = {"Brand": brand, "Total": len(group)}
        for bucket in STATUS_BUCKETS:
            row[bucket] = int((group["_status_bucket"] == bucket).sum())
        for field in fields:
            missing = int(group[field].map(is_missing).sum())
            row[field] = "NO missing" if missing == 0 else f"missing: {missing}"
        rows.append(row)
    return pd.DataFrame(rows).sort_values("Brand").reset_index(drop=True)


def build_summary_tracker(missing_overview: pd.DataFrame) -> pd.DataFrame:
    if missing_overview.empty:
        return missing_overview
    first_columns = ["Brand", "Total", *STATUS_BUCKETS]
    field_columns = [column for column in missing_overview.columns if column not in first_columns]
    return missing_overview[[*first_columns, *field_columns]].copy()


def build_action_tracker(df: pd.DataFrame, fields: list[str], rules: RuleProfile) -> pd.DataFrame:
    rows: list[dict[str, Any]] = []
    for brand, group in df.groupby("_brand", dropna=False):
        total = len(group)
        if total == 0:
            continue
        for field in fields:
            missing = int(group[field].map(is_missing).sum())
            if missing == 0:
                continue
            priority = rules.field_priority.get(field, "Low")
            rows.append(
                {
                    "Brand": brand,
                    "Field": field,
                    "# Missing": missing,
                    "Total": total,
                    "% Missing": missing / total,
                    "Priority": priority,
                    "Status": "To Do",
                    "Owner Team": owner_team(field),
                    "Suggested Action": suggested_action(field),
                }
            )
    priority_rank = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}
    output = pd.DataFrame(rows)
    if output.empty:
        return pd.DataFrame(columns=["#", "Brand", "Field", "# Missing", "Total", "% Missing", "Priority", "Status", "Owner Team", "Suggested Action"])
    output["_rank"] = output["Priority"].map(priority_rank).fillna(9)
    output = output.sort_values(["_rank", "% Missing", "# Missing", "Brand", "Field"], ascending=[True, False, False, True, True])
    output = output.drop(columns=["_rank"]).reset_index(drop=True)
    output.insert(0, "#", range(1, len(output) + 1))
    return output


def build_sku_missing_detail(
    df: pd.DataFrame,
    fields: list[str],
    rules: RuleProfile,
    sku_col: str | None,
    product_name_col: str | None,
) -> pd.DataFrame:
    rows: list[dict[str, Any]] = []
    for row_index, row in df.iterrows():
        for field in fields:
            if is_missing(row.get(field, "")):
                rows.append(
                    {
                        "Brand": row["_brand"],
                        "SKU": row.get(sku_col, "") if sku_col else "",
                        "Product Name": row.get(product_name_col, "") if product_name_col else "",
                        "Status": row["_status_raw"],
                        "Missing Field": field,
                        "Priority": rules.field_priority.get(field, "Low"),
                        "Source Row": row_index + 2,
                    }
                )
    return pd.DataFrame(rows)


def build_validation_errors(df: pd.DataFrame, sku_col: str | None, product_name_col: str | None) -> pd.DataFrame:
    checks = [
        ("BAR CODE", validate_barcode),
        ("HEX CODE", validate_hex),
        ("SUPPLY PRICE", validate_non_negative_number),
        ("Net Weight (g)", validate_positive_number),
        ("Gross weight (g)", validate_positive_number),
        ("DEPTH / LENGTH", validate_positive_number),
        ("HEIGHT", validate_positive_number),
        ("WIDTH", validate_positive_number),
    ]
    rows: list[dict[str, Any]] = []
    for row_index, row in df.iterrows():
        for field, validator in checks:
            if field not in df.columns:
                continue
            value = row.get(field, "")
            if is_missing(value):
                continue
            message = validator(value)
            if message:
                rows.append(
                    {
                        "Brand": row["_brand"],
                        "SKU": row.get(sku_col, "") if sku_col else "",
                        "Product Name": row.get(product_name_col, "") if product_name_col else "",
                        "Field": field,
                        "Value": value,
                        "Error": message,
                        "Source Row": row_index + 2,
                    }
                )
    rows.extend(duplicate_errors(df, sku_col, "Duplicate SKU"))
    rows.extend(duplicate_errors(df, "BAR CODE" if "BAR CODE" in df.columns else None, "Duplicate BAR CODE"))
    return pd.DataFrame(rows)


def duplicate_errors(df: pd.DataFrame, column: str | None, error: str) -> list[dict[str, Any]]:
    if not column:
        return []
    values = df[column].map(lambda value: "" if is_missing(value) else str(value).strip())
    duplicated_values = set(values[values.duplicated(keep=False)]).difference({""})
    rows = []
    for row_index, row in df.iterrows():
        value = str(row.get(column, "")).strip()
        if value in duplicated_values:
            rows.append(
                {
                    "Brand": row["_brand"],
                    "SKU": row.get(column, ""),
                    "Product Name": "",
                    "Field": column,
                    "Value": value,
                    "Error": error,
                    "Source Row": row_index + 2,
                }
            )
    return rows


def build_brand_scorecard(
    df: pd.DataFrame,
    fields: list[str],
    rules: RuleProfile,
    action_tracker: pd.DataFrame,
    validation_errors: pd.DataFrame,
) -> pd.DataFrame:
    weights = {"Critical": 5, "High": 3, "Medium": 2, "Low": 1}
    rows: list[dict[str, Any]] = []
    for brand, group in df.groupby("_brand", dropna=False):
        possible = len(group) * sum(weights.get(rules.field_priority.get(field, "Low"), 1) for field in fields)
        missing_weight = 0
        for field in fields:
            priority = rules.field_priority.get(field, "Low")
            missing_weight += int(group[field].map(is_missing).sum()) * weights.get(priority, 1)
        score = 100 if possible == 0 else round(max(0, (possible - missing_weight) / possible * 100), 2)
        brand_actions = action_tracker[action_tracker["Brand"] == brand] if not action_tracker.empty else pd.DataFrame()
        brand_errors = validation_errors[validation_errors["Brand"] == brand] if not validation_errors.empty else pd.DataFrame()
        rows.append(
            {
                "Brand": brand,
                "Total Products": len(group),
                "Completeness Score": score,
                "Risk Level": risk_level(score),
                "Critical Missing Actions": int((brand_actions["Priority"] == "Critical").sum()) if not brand_actions.empty else 0,
                "High Missing Actions": int((brand_actions["Priority"] == "High").sum()) if not brand_actions.empty else 0,
                "Validation Errors": len(brand_errors),
            }
        )
    return pd.DataFrame(rows).sort_values(["Completeness Score", "Brand"]).reset_index(drop=True)


def build_executive_summary(
    df: pd.DataFrame,
    included: pd.DataFrame,
    brand_scorecard: pd.DataFrame,
    action_tracker: pd.DataFrame,
    validation_errors: pd.DataFrame,
) -> pd.DataFrame:
    avg_score = round(float(brand_scorecard["Completeness Score"].mean()), 2) if not brand_scorecard.empty else 0
    critical_brands = int((brand_scorecard["Risk Level"] == "Critical").sum()) if not brand_scorecard.empty else 0
    return pd.DataFrame(
        [
            ("Total rows", len(df)),
            ("Included rows", len(included)),
            ("Brand count", included["_brand"].nunique()),
            ("Average completeness score", avg_score),
            ("Critical risk brands", critical_brands),
            ("Action tracker rows", len(action_tracker)),
            ("Critical actions", int((action_tracker["Priority"] == "Critical").sum()) if not action_tracker.empty else 0),
            ("Validation errors", len(validation_errors)),
        ],
        columns=["Metric", "Value"],
    )


def validate_barcode(value: str) -> str | None:
    text = re.sub(r"\s+", "", str(value))
    if not text.isdigit() or len(text) not in {8, 12, 13, 14}:
        return "Barcode must be 8, 12, 13, or 14 digits"
    return None


def validate_hex(value: str) -> str | None:
    text = str(value).strip()
    if not re.fullmatch(r"#[0-9A-Fa-f]{6}", text):
        return "HEX CODE must match #RRGGBB"
    return None


def validate_positive_number(value: str) -> str | None:
    try:
        if float(str(value).replace(",", "")) <= 0:
            return "Value must be greater than 0"
    except ValueError:
        return "Value must be numeric"
    return None


def validate_non_negative_number(value: str) -> str | None:
    try:
        if float(str(value).replace(",", "")) < 0:
            return "Value must be greater than or equal to 0"
    except ValueError:
        return "Value must be numeric"
    return None


def risk_level(score: float) -> str:
    if score >= 95:
        return "Good"
    if score >= 85:
        return "Watch"
    if score >= 70:
        return "Risk"
    return "Critical"


def owner_team(field: str) -> str:
    regulatory = {"CPNP Number", "UK SCPN NUMBER", "EU Responsible person", "UK Responsible person", "Ingredient list"}
    logistics = {"Net Weight (g)", "Gross weight (g)", "DEPTH / LENGTH", "HEIGHT", "WIDTH", "Inner box QTY", "Outer box QTY"}
    commercial = {"SUPPLY PRICE", "SUPPLY CURRENCY"}
    content = {"Description (250+ words)", "Warnings", "Vegan (Y/N)"}
    if field in regulatory:
        return "Regulatory"
    if field in logistics:
        return "Logistics"
    if field in commercial:
        return "Commercial"
    if field in content:
        return "Content"
    return "Data"


def suggested_action(field: str) -> str:
    suggestions = {
        "Description (250+ words)": "Request or write compliant ecommerce description",
        "EU Responsible person": "Request EU regulatory contact from supplier",
        "UK Responsible person": "Request UK regulatory contact from supplier",
        "BAR CODE": "Verify barcode against packaging or supplier item master",
        "SUPPLY PRICE": "Confirm commercial pricing with buying team",
    }
    return suggestions.get(field, f"Fill or verify {field}")
