from __future__ import annotations

import os
import re
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import pandas as pd

from .excel_reader import CANONICAL_ALIASES, ReadResult, find_column
from .field_mapping import FIELD_ALIASES, OVERVIEW_FIELD_GROUPS, STATUS_BUCKETS, SUMMARY_FIELDS
from .models import AuditOptions, AuditSummary
from .rules import RuleProfile


MISSING_VALUES = {"", "-", "na", "n/a", "none", "null", "tbc", "tbd", "todo", "unknown"}


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
    update_summary: pd.DataFrame
    update_summary_sheet_name: str
    summary: AuditSummary


def audit_master_data(
    read_result: ReadResult,
    rules: RuleProfile,
    output_path: Path,
    options: AuditOptions | None = None,
) -> AuditResult:
    options = options or AuditOptions()
    df = read_result.dataframe.copy(deep=False)
    brand_col = find_column(list(df.columns), CANONICAL_ALIASES["brand"])
    status_col = find_column(list(df.columns), CANONICAL_ALIASES["status"])
    sku_col = find_column(list(df.columns), CANONICAL_ALIASES["sku"])
    product_name_col = find_column(list(df.columns), CANONICAL_ALIASES["product_name"])
    if brand_col is None:
        raise ValueError("Required column not found: Brand")

    df["_brand"] = df[brand_col].map(lambda value: value.strip() or "Unknown Brand")
    df["_status_raw"] = df[status_col].map(str.strip) if status_col else ""
    df["_status_bucket"] = df["_status_raw"].map(status_bucket)
    included_statuses = effective_included_statuses(rules, options)
    df["_included"] = df.apply(lambda row: is_included_status(row["_status_raw"], row["_status_bucket"], included_statuses), axis=1)
    included = df[df["_included"]].copy()
    if included.empty:
        included = df.copy()
        included["_included"] = True

    field_map = resolve_audit_field_map(df, [field for field, _group in OVERVIEW_FIELD_GROUPS])
    available_fields = list(field_map)
    all_fields = [field for field, _group in OVERVIEW_FIELD_GROUPS]
    df = add_audit_field_columns(df, field_map)
    included = df[df["_included"]].copy()
    if included.empty:
        included = df.copy()
        included["_included"] = True

    needed_columns = ["_brand", "_status_raw", "_status_bucket", *all_fields]
    for optional_col in (sku_col, product_name_col):
        if optional_col and optional_col not in needed_columns:
            needed_columns.append(optional_col)
    included = included.loc[:, [column for column in needed_columns if column in included.columns]].copy()

    missing_overview = build_missing_overview(df, included, all_fields, field_map, options)
    summary_tracker = build_summary_tracker(missing_overview)
    action_tracker = build_action_tracker(included, all_fields, rules, field_map, options)
    sku_missing_detail = (
        build_sku_missing_detail(included, available_fields, rules, sku_col, product_name_col, read_result.header_row)
        if options.keep_detail_rows
        else pd.DataFrame(columns=["Brand", "SKU", "Product Name", "Status", "Missing Field", "Priority", "Source Row"])
    )
    validation_errors = build_validation_errors(included, sku_col, product_name_col, read_result.header_row)
    brand_scorecard = build_brand_scorecard(included, available_fields, rules, action_tracker, validation_errors, options)
    executive_summary = build_executive_summary(df, included, brand_scorecard, action_tracker, validation_errors)
    run_summary = pd.DataFrame(
        [
            ("Source file", str(read_result.source_path)),
            ("Source sheet", read_result.sheet_name),
            ("Header row", read_result.header_row),
            ("Total rows", len(df)),
            ("Included rows", len(included)),
            ("Brand count", included["_brand"].nunique()),
            ("Included statuses", ", ".join(sorted(status or "Blank" for status in included_statuses))),
            ("Audited fields present", len(available_fields)),
            ("Missing audited fields absent from input", ", ".join(field for field in all_fields if field not in field_map)),
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
        update_summary=pd.DataFrame(),
        update_summary_sheet_name="Update Summary v1",
        summary=summary,
    )


def is_missing(value: Any) -> bool:
    if value is None:
        return True
    normalized = str(value).strip().lower()
    if normalized in {"0", "0.0", "0.00", "0.000", "0.0000"}:
        return True
    return normalized in MISSING_VALUES


def effective_included_statuses(rules: RuleProfile, options: AuditOptions) -> set[str]:
    if options.selected_statuses is None:
        return set(rules.included_statuses)
    return {str(status).strip() for status in options.selected_statuses}


def is_included_status(raw_value: str, bucket_value: str, included_statuses: set[str]) -> bool:
    stripped = raw_value.strip()
    if stripped == "":
        return "" in included_statuses or "Blank" in included_statuses or "Blanks" in included_statuses
    normalized_included = {status.upper() for status in included_statuses if status}
    return stripped.upper() in normalized_included or bucket_value.upper() in normalized_included


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


def resolve_audit_field_map(df: pd.DataFrame, fields: list[str]) -> dict[str, str]:
    columns = list(df.columns)
    resolved: dict[str, str] = {}
    for field in fields:
        aliases = FIELD_ALIASES.get(field, [field])
        source = find_column(columns, aliases)
        if source is not None:
            resolved[field] = source
    return resolved


def add_audit_field_columns(df: pd.DataFrame, field_map: dict[str, str]) -> pd.DataFrame:
    output = df.copy(deep=False)
    for field, source in field_map.items():
        if field not in output.columns:
            output[field] = output[source]
    return output


def build_missing_overview(
    all_rows: pd.DataFrame,
    included_rows: pd.DataFrame,
    fields: list[str],
    field_map: dict[str, str],
    options: AuditOptions | None = None,
) -> pd.DataFrame:
    options = options or AuditOptions()
    included_by_brand = {brand: group for brand, group in included_rows.groupby("_brand", dropna=False)}

    def build_brand_row(item: tuple[str, pd.DataFrame]) -> dict[str, Any]:
        brand, all_group = item
        included_group = included_by_brand.get(brand, all_group.iloc[0:0])
        row: dict[str, Any] = {"Brand": brand, "Total": len(included_group)}
        for bucket in STATUS_BUCKETS:
            row[bucket] = int((all_group["_status_bucket"] == bucket).sum())
        for field in fields:
            if field not in field_map:
                row[field] = "-"
                continue
            if included_group.empty:
                row[field] = "-"
                continue
            missing = int(included_group[field].map(is_missing).sum())
            row[field] = "NO missing" if missing == 0 else f"missing: {missing}"
        return row

    groups = list(all_rows.groupby("_brand", dropna=False))
    worker_count = effective_dqc_worker_count(options)
    if len(groups) > 1 and worker_count > 1:
        with ThreadPoolExecutor(max_workers=worker_count) as executor:
            rows = list(executor.map(build_brand_row, groups, chunksize=max(1, options.chunk_size // 1000)))
    else:
        rows = [build_brand_row(group) for group in groups]
    return pd.DataFrame(rows).sort_values("Brand").reset_index(drop=True)


def build_summary_tracker(missing_overview: pd.DataFrame) -> pd.DataFrame:
    if missing_overview.empty:
        return missing_overview
    first_columns = ["Brand", "Total", *STATUS_BUCKETS]
    field_columns = [field for field in SUMMARY_FIELDS if field in missing_overview.columns]
    return missing_overview[[*first_columns, *field_columns]].copy()


def build_action_tracker(
    df: pd.DataFrame,
    fields: list[str],
    rules: RuleProfile,
    field_map: dict[str, str],
    options: AuditOptions | None = None,
) -> pd.DataFrame:
    options = options or AuditOptions()

    def build_brand_actions(item: tuple[str, pd.DataFrame]) -> list[dict[str, Any]]:
        brand, group = item
        brand_rows: list[dict[str, Any]] = []
        total = len(group)
        if total == 0:
            return brand_rows
        for field in fields:
            if field not in field_map:
                continue
            missing = int(group[field].map(is_missing).sum())
            if missing == 0:
                continue
            priority = rules.field_priority.get(field, "Low")
            brand_rows.append(
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
        return brand_rows

    groups = list(df.groupby("_brand", dropna=False))
    worker_count = effective_dqc_worker_count(options)
    if len(groups) > 1 and worker_count > 1:
        with ThreadPoolExecutor(max_workers=worker_count) as executor:
            nested_rows = list(executor.map(build_brand_actions, groups, chunksize=max(1, options.chunk_size // 1000)))
        rows = [row for group_rows in nested_rows for row in group_rows]
    else:
        rows = [row for group in groups for row in build_brand_actions(group)]
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
    header_row: int,
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
                        "Source Row": header_row + row_index + 1,
                    }
                )
    return pd.DataFrame(rows)


def build_validation_errors(df: pd.DataFrame, sku_col: str | None, product_name_col: str | None, header_row: int = 1) -> pd.DataFrame:
    columns = ["Brand", "SKU", "Product Name", "Field", "Value", "Rule", "Severity", "Message", "Source Row"]
    checks = [
        ("BAR CODE", "Barcode format", "High", validate_barcode),
        ("HEX CODE", "HEX color format", "Medium", validate_hex),
        ("SUPPLY PRICE", "Non-negative number", "Medium", validate_non_negative_number),
        ("Net Weight (g)", "Positive number", "Medium", validate_positive_number),
        ("Gross weight (g)", "Positive number", "Medium", validate_positive_number),
        ("DEPTH / LENGTH", "Positive number", "Low", validate_positive_number),
        ("HEIGHT", "Positive number", "Low", validate_positive_number),
        ("WIDTH", "Positive number", "Low", validate_positive_number),
    ]
    rows: list[dict[str, Any]] = []
    for row_index, row in df.iterrows():
        for field, rule, severity, validator in checks:
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
                        "Rule": rule,
                        "Severity": severity,
                        "Message": message,
                        "Source Row": header_row + row_index + 1,
                    }
                )
    rows.extend(duplicate_errors(df, sku_col, sku_col, product_name_col, "Duplicate SKU", "High", header_row))
    rows.extend(duplicate_errors(df, "BAR CODE" if "BAR CODE" in df.columns else None, sku_col, product_name_col, "Duplicate BAR CODE", "High", header_row))
    return pd.DataFrame(rows, columns=columns)


def duplicate_errors(
    df: pd.DataFrame,
    column: str | None,
    sku_col: str | None,
    product_name_col: str | None,
    rule: str,
    severity: str,
    header_row: int = 1,
) -> list[dict[str, Any]]:
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
                    "SKU": row.get(sku_col, "") if sku_col else "",
                    "Product Name": row.get(product_name_col, "") if product_name_col else "",
                    "Field": column,
                    "Value": value,
                    "Rule": rule,
                    "Severity": severity,
                    "Message": f"{column} value appears more than once",
                    "Source Row": header_row + row_index + 1,
                }
            )
    return rows


def build_brand_scorecard(
    df: pd.DataFrame,
    fields: list[str],
    rules: RuleProfile,
    action_tracker: pd.DataFrame,
    validation_errors: pd.DataFrame,
    options: AuditOptions | None = None,
) -> pd.DataFrame:
    options = options or AuditOptions()
    weights = {"Critical": 5, "High": 3, "Medium": 2, "Low": 1}

    def build_brand_score(item: tuple[str, pd.DataFrame]) -> dict[str, Any]:
        brand, group = item
        possible = len(group) * sum(weights.get(rules.field_priority.get(field, "Low"), 1) for field in fields)
        missing_weight = 0
        for field in fields:
            priority = rules.field_priority.get(field, "Low")
            missing_weight += int(group[field].map(is_missing).sum()) * weights.get(priority, 1)
        score = 100 if possible == 0 else round(max(0, (possible - missing_weight) / possible * 100), 2)
        brand_actions = action_tracker[action_tracker["Brand"] == brand] if not action_tracker.empty else pd.DataFrame()
        brand_errors = validation_errors[validation_errors["Brand"] == brand] if not validation_errors.empty else pd.DataFrame()
        return {
            "Brand": brand,
            "Total Products": len(group),
            "Completeness Score": score,
            "Risk Level": risk_level(score),
            "Critical Missing Actions": int((brand_actions["Priority"] == "Critical").sum()) if not brand_actions.empty else 0,
            "High Missing Actions": int((brand_actions["Priority"] == "High").sum()) if not brand_actions.empty else 0,
            "Validation Errors": len(brand_errors),
        }

    groups = list(df.groupby("_brand", dropna=False))
    worker_count = effective_dqc_worker_count(options)
    if len(groups) > 1 and worker_count > 1:
        with ThreadPoolExecutor(max_workers=worker_count) as executor:
            rows = list(executor.map(build_brand_score, groups, chunksize=max(1, options.chunk_size // 1000)))
    else:
        rows = [build_brand_score(group) for group in groups]
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


def effective_dqc_worker_count(options: AuditOptions) -> int:
    cpu_count = os.cpu_count() or 1
    if options.max_workers == 0:
        return max(1, cpu_count)
    return max(1, options.max_workers)
