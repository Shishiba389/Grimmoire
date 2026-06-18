from __future__ import annotations

import json
import shutil
import uuid
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path

from fastapi import HTTPException

from services.ean_renamer.models import (
    BatchApplyRenameResponse,
    BatchRenamePlanResponse,
    BatchRenameRequest,
    RenamePlanItem,
)
from services.ean_renamer.services.excel_report import write_excel_report
from services.ean_renamer.services.folder_scanner import get_image_path, invalidate_scan_cache, normalize_folder, scan_root_folder
from services.ean_renamer.services.safe_renamer import normalize_output_folder

CATEGORY_OUTPUT_PATHS = {
    "packshot": ("Packshot", "{ean}"),
    "lifestyle_human": ("Lifestyle", "Human", "{ean}"),
    "lifestyle_normal": ("Lifestyle", "Normal", "{ean}"),
    "artwork": ("Artwork", "{ean}"),
}
STANDARD_CATEGORY_ORDER = tuple(CATEGORY_OUTPUT_PATHS.keys())
NAMING_MODE_PER_CATEGORY = "per_category"
NAMING_MODE_CONTINUOUS = "continuous"
NAMING_MODE_PREFIXED = "prefixed"
SUPPORTED_NAMING_MODES = {NAMING_MODE_PER_CATEGORY, NAMING_MODE_CONTINUOUS, NAMING_MODE_PREFIXED}
OUTPUT_MODE_COPY = "copy"
OUTPUT_MODE_RENAME = "rename"
SUPPORTED_OUTPUT_MODES = {OUTPUT_MODE_COPY, OUTPUT_MODE_RENAME}
INVALID_NAME_CHARS = set('<>:"/\\|?*')
PREFIX_BY_CATEGORY = {
    "packshot": "Pack_shot",
    "lifestyle_human": "Human",
    "lifestyle_normal": "Normal_Lifestyle",
    "artwork": "Artwork",
}
COPY_WORKERS = 8


def build_batch_plan(request: BatchRenameRequest) -> BatchRenamePlanResponse:
    root = normalize_folder(request.folderPath)
    required_categories = categories_for_assignments(request)
    output_mode = normalize_output_mode(request.outputMode)
    output_roots = output_roots_for_request(request, root, required_categories) if output_mode == OUTPUT_MODE_COPY else {}
    custom_ean = normalize_custom_ean(request.customEan)
    naming_mode = normalize_naming_mode(request.namingMode)
    product_name = normalize_product_name(request.productName) if request.productNameContinuous else None
    if product_name:
        naming_mode = NAMING_MODE_CONTINUOUS
    scanned = scan_root_folder(str(root))
    images_by_id = {image.id: image for image in scanned.images}
    selected_ids: set[str] = set()
    selected: list[tuple[str, str, str, str | None]] = []

    missing_ean_names: list[str] = []
    for assignment in request.assignments:
        validate_category(assignment.category)
        if assignment.id in selected_ids:
            continue
        if assignment.id not in images_by_id:
            raise HTTPException(
                status_code=409,
                detail="Source folder changed since it was loaded. Click Refresh and try again.",
            )
        selected_ids.add(assignment.id)
        image = images_by_id[assignment.id]
        naming_ean = custom_ean or image.ean
        if not naming_ean:
            missing_ean_names.append(image.name)
            continue
        selected.append((naming_ean, assignment.category, assignment.id, assignment.categoryName))

    if missing_ean_names and not selected:
        preview = ", ".join(missing_ean_names[:3])
        suffix = f" (+{len(missing_ean_names) - 3} more)" if len(missing_ean_names) > 3 else ""
        raise HTTPException(
            status_code=400,
            detail=f"No EAN folder for selected files and no Custom EAN provided. Files: {preview}{suffix}",
        )

    items: list[RenamePlanItem] = []
    conflicts: list[str] = []
    priority_set: set[str] = set(request.priorityIds or [])

    if naming_mode in {NAMING_MODE_CONTINUOUS, NAMING_MODE_PREFIXED}:
        grouped_by_ean: dict[str, dict[str, list[str]]] = defaultdict(lambda: defaultdict(list))
        category_names: dict[str, str | None] = {}
        for ean, category, image_id, category_name in selected:
            grouped_by_ean[ean][category].append(image_id)
            category_names.setdefault(category, category_name)

        duplicate_groups = normalized_duplicate_groups(request)
        for ean, category_groups in grouped_by_ean.items():
            has_priority = any(
                img_id in priority_set
                for cat_ids in category_groups.values()
                for img_id in cat_ids
            )
            continuous_counter = 2 if has_priority else 1
            for category in category_order_for_request(request, category_groups.keys()):
                ids_in_category = category_groups.get(category, [])
                ids_in_category = _reorder_priority(ids_in_category, priority_set)

                if naming_mode == NAMING_MODE_PREFIXED:
                    prefix = category_prefix(category, category_names.get(category))
                    for slot_ids, num in prefixed_number_slots(ids_in_category, priority_set, duplicate_groups):
                        for image_id in slot_ids:
                            image = images_by_id[image_id]
                            suffix = image.extension.lower()
                            new_name = f"{ean}_{prefix}_{num}{suffix}"
                            add_plan_item(
                                items,
                                conflicts,
                                output_roots,
                                root,
                                output_mode,
                                ean,
                                category,
                                category_names.get(category),
                                image_id,
                                image.relativePath or image.name,
                                image.name,
                                suffix,
                                new_name,
                            )
                    continue

                for image_id in ids_in_category:
                    image = images_by_id[image_id]
                    suffix = image.extension.lower()
                    is_priority = image_id in priority_set
                    num = 1 if is_priority else continuous_counter
                    if not is_priority:
                        continuous_counter += 1
                    if product_name:
                        new_name = f"{ean}_{product_name}_{num}{suffix}"
                    else:
                        new_name = f"{ean}_{num}{suffix}"
                    add_plan_item(
                        items,
                        conflicts,
                        output_roots,
                        root,
                        output_mode,
                        ean,
                        category,
                        category_names.get(category),
                        image_id,
                        image.relativePath or image.name,
                        image.name,
                        suffix,
                        new_name,
                    )

        if output_mode == OUTPUT_MODE_RENAME:
            conflicts = find_in_place_conflicts(root, items)

        return BatchRenamePlanResponse(
            items=items,
            skippedCount=len(images_by_id) - len(selected_ids),
            conflicts=conflicts,
        )

    grouped: dict[tuple[str, str], list[str]] = defaultdict(list)
    for ean, category, image_id, _category_name in selected:
        grouped[(ean, category)].append(image_id)

    for (ean, category), image_ids in grouped.items():
        image_ids = _reorder_priority(image_ids, priority_set)
        total = len(image_ids)
        has_priority = any(img_id in priority_set for img_id in image_ids)
        counter = 2 if has_priority else 1
        for image_id in image_ids:
            image = images_by_id[image_id]
            suffix = image.extension.lower()
            is_priority = image_id in priority_set
            if total == 1 and not has_priority:
                new_name = f"{ean}{suffix}"
            else:
                num = 1 if is_priority else counter
                if not is_priority:
                    counter += 1
                new_name = f"{ean}_{num}{suffix}"
            add_plan_item(
                items,
                conflicts,
                output_roots,
                root,
                output_mode,
                ean,
                category,
                None,
                image_id,
                image.relativePath or image.name,
                image.name,
                suffix,
                new_name,
            )

    if output_mode == OUTPUT_MODE_RENAME:
        conflicts = find_in_place_conflicts(root, items)

    return BatchRenamePlanResponse(
        items=items,
        skippedCount=len(images_by_id) - len(selected_ids),
        conflicts=conflicts,
    )


def apply_batch_copy(request: BatchRenameRequest) -> BatchApplyRenameResponse:
    if normalize_output_mode(request.outputMode) == OUTPUT_MODE_RENAME:
        return apply_batch_rename_in_place(request)

    root = normalize_folder(request.folderPath)
    required_categories = categories_for_assignments(request)
    output_roots = output_roots_for_request(request, root, required_categories)
    plan = build_batch_plan(request)
    if plan.conflicts:
        raise HTTPException(status_code=409, detail={"conflicts": plan.conflicts})
    if not plan.items:
        raise HTTPException(status_code=400, detail="No images selected for output")

    copy_jobs: list[tuple[Path, Path]] = []
    created_dirs: list[Path] = []
    for item in plan.items:
        source = get_image_path(root, item.id)
        if not item.outputRelativePath:
            raise HTTPException(status_code=500, detail=f"Internal: missing output path for {item.oldName}")
        if item.category not in output_roots:
            raise HTTPException(
                status_code=400,
                detail=f"Set an output folder for category '{item.category}' before applying.",
            )
        target = output_roots[item.category] / Path(item.outputRelativePath)
        if not target.parent.exists():
            target.parent.mkdir(parents=True, exist_ok=True)
            created_dirs.append(target.parent)
        if target.exists():
            raise HTTPException(status_code=409, detail=f"Output file already exists: {item.outputRelativePath}")
        copy_jobs.append((source, target))

    copied_targets: list[Path] = []
    copy_error: Exception | None = None
    with ThreadPoolExecutor(max_workers=min(COPY_WORKERS, max(1, len(copy_jobs)))) as executor:
        futures = {executor.submit(shutil.copy2, source, target): target for source, target in copy_jobs}
        for future in as_completed(futures):
            target = futures[future]
            try:
                future.result()
                copied_targets.append(target)
            except Exception as exc:
                if copy_error is None:
                    copy_error = exc

    if copy_error is not None:
        for target in copied_targets:
            if target.exists():
                target.unlink()
        for directory in reversed(created_dirs):
            try:
                directory.rmdir()
            except OSError:
                pass
        raise copy_error

    report_path = write_excel_report(report_output_root(output_roots), plan.items)
    log_path = write_batch_log(root, output_roots, plan.items, report_path)
    invalidate_scan_cache(str(root))
    return BatchApplyRenameResponse(
        items=plan.items,
        logPath=str(log_path),
        mode="copy",
        outputFolderPath=str(output_roots.get("packshot") or next(iter(output_roots.values()))),
    )


def apply_batch_rename_in_place(request: BatchRenameRequest) -> BatchApplyRenameResponse:
    root = normalize_folder(request.folderPath)
    plan = build_batch_plan(request)
    if plan.conflicts:
        raise HTTPException(status_code=409, detail={"conflicts": plan.conflicts})
    if not plan.items:
        raise HTTPException(status_code=400, detail="No images selected for rename")

    temp_id = uuid.uuid4().hex
    temp_paths: list[tuple[RenamePlanItem, Path]] = []
    renamed_targets: list[tuple[RenamePlanItem, Path]] = []

    try:
        for index, item in enumerate(plan.items, start=1):
            source = get_image_path(root, item.id)
            target = in_place_target(root, item)
            if source.resolve() == target.resolve():
                continue
            temp_path = source.with_name(f".ean-renamer-tmp-{temp_id}-{index}{source.suffix.lower()}")
            source.rename(temp_path)
            temp_paths.append((item, temp_path))

        for item, temp_path in temp_paths:
            target = in_place_target(root, item)
            if target.exists():
                raise HTTPException(status_code=409, detail=f"Target already exists: {item.outputRelativePath or item.newName}")
            temp_path.rename(target)
            renamed_targets.append((item, target))
    except Exception:
        rollback_in_place(root, temp_paths, renamed_targets)
        raise

    report_path = write_excel_report(root / ".ean-renamer" / "logs", plan.items)
    log_path = write_batch_rename_log(root, plan.items, report_path)
    invalidate_scan_cache(str(root))
    return BatchApplyRenameResponse(
        items=plan.items,
        logPath=str(log_path),
        mode="rename",
        outputFolderPath=str(root),
    )


def output_roots_for_request(request: BatchRenameRequest, source_root: Path, required_categories: set[str]) -> dict[str, Path]:
    roots: dict[str, Path] = {}
    fallback = request.outputFolderPath or first_output_folder_path(request)
    missing: list[str] = []
    for category in required_categories:
        raw_path = request.outputFolderPaths.get(category) or fallback
        if not raw_path:
            missing.append(category)
            continue
        roots[category] = normalize_output_folder(raw_path, source_root)
    if missing:
        listed = ", ".join(missing)
        raise HTTPException(
            status_code=400,
            detail=f"Set an output folder before applying. Missing: {listed}",
        )
    return roots


def first_output_folder_path(request: BatchRenameRequest) -> str | None:
    for value in request.outputFolderPaths.values():
        if value:
            return value
    return None


def report_output_root(output_roots: dict[str, Path]) -> Path:
    return output_roots.get("packshot") or next(iter(output_roots.values()))


def categories_for_assignments(request: BatchRenameRequest) -> set[str]:
    categories: set[str] = set()
    for assignment in request.assignments:
        validate_category(assignment.category)
        categories.add(assignment.category)
    return categories


def normalize_custom_ean(custom_ean: str | None) -> str | None:
    if custom_ean is None:
        return None
    value = custom_ean.strip()
    if not value:
        return None
    if any(char in INVALID_NAME_CHARS for char in value):
        raise HTTPException(status_code=400, detail="Custom EAN contains characters that are invalid for Windows paths")
    if value in {".", ".."}:
        raise HTTPException(status_code=400, detail="Custom EAN is not valid")
    return value


def normalize_product_name(product_name: str | None) -> str | None:
    if product_name is None:
        return None
    value = product_name.strip()
    if not value:
        return None
    value = "".join(char if char.isalnum() else "_" for char in value)
    value = "_".join(part for part in value.split("_") if part)
    if not value:
        return None
    if value in {".", ".."}:
        raise HTTPException(status_code=400, detail="Product name is not valid")
    return value.upper()


def normalize_naming_mode(naming_mode: str | None) -> str:
    mode = (naming_mode or NAMING_MODE_PER_CATEGORY).strip()
    if mode not in SUPPORTED_NAMING_MODES:
        raise HTTPException(status_code=400, detail=f"Unsupported naming mode: {mode}")
    return mode


def normalize_output_mode(output_mode: str | None) -> str:
    mode = (output_mode or OUTPUT_MODE_COPY).strip()
    if mode not in SUPPORTED_OUTPUT_MODES:
        raise HTTPException(status_code=400, detail=f"Unsupported output mode: {mode}")
    return mode


def category_prefix(category: str, category_name: str | None = None) -> str:
    if category in PREFIX_BY_CATEGORY:
        return PREFIX_BY_CATEGORY[category]
    label = f"{category} {category_name or ''}".lower()
    if "video" in label:
        return "Video"
    safe_name = safe_custom_category_name(category_name or category)
    return safe_name.replace(" ", "_") or "Other"


def category_output_parts(ean: str, category: str, category_name: str | None = None) -> tuple[str, ...]:
    if category in CATEGORY_OUTPUT_PATHS:
        return tuple(part.format(ean=ean) for part in CATEGORY_OUTPUT_PATHS[category])
    return (safe_custom_category_name(category), ean)


def _reorder_priority(image_ids: list[str], priority_set: set[str]) -> list[str]:
    if not priority_set:
        return image_ids
    first = [id for id in image_ids if id in priority_set]
    rest = [id for id in image_ids if id not in priority_set]
    return first + rest


def normalized_duplicate_groups(request: BatchRenameRequest) -> list[tuple[list[str], bool]]:
    normalized: list[tuple[list[str], bool]] = []
    seen: set[str] = set()
    raw_groups = [(group.ids, group.first) for group in request.duplicateGroups]
    raw_groups.extend((group, True) for group in request.duplicateFirstGroups or [])
    for group, first in raw_groups:
        clean_group: list[str] = []
        for image_id in group:
            if image_id in seen:
                continue
            seen.add(image_id)
            clean_group.append(image_id)
        if clean_group:
            normalized.append((clean_group, first))
    return normalized


def prefixed_number_slots(
    image_ids: list[str],
    priority_set: set[str],
    duplicate_groups: list[tuple[list[str], bool]],
) -> list[tuple[list[str], int]]:
    image_id_set = set(image_ids)
    scoped_groups: list[tuple[list[str], bool]] = []
    duplicate_group_by_id: dict[str, tuple[list[str], bool]] = {}
    for group, first in duplicate_groups:
        scoped_group = [image_id for image_id in image_ids if image_id in group]
        if not scoped_group:
            continue
        scoped_groups.append((scoped_group, first))
        for image_id in scoped_group:
            duplicate_group_by_id[image_id] = (scoped_group, first)

    slots: list[tuple[list[str], int]] = []
    consumed: set[str] = set()

    next_number = 1
    for scoped_group, first in scoped_groups:
        if not first or any(image_id in consumed for image_id in scoped_group):
            continue
        slots.append((scoped_group, next_number))
        consumed.update(scoped_group)
        next_number += 1

    for image_id in image_ids:
        if image_id in consumed:
            continue
        if image_id in priority_set:
            slots.append(([image_id], next_number))
            consumed.add(image_id)
            next_number += 1

    for image_id in image_ids:
        if image_id in consumed or image_id not in image_id_set:
            continue
        duplicate_group = duplicate_group_by_id.get(image_id)
        if duplicate_group:
            scoped_group, _first = duplicate_group
            slots.append((scoped_group, next_number))
            consumed.update(scoped_group)
        else:
            slots.append(([image_id], next_number))
            consumed.add(image_id)
        next_number += 1

    return slots


def category_display_name(category: str) -> str:
    return category.removeprefix("custom_")


def category_order_for_request(request: BatchRenameRequest, present_categories: object) -> list[str]:
    present = set(present_categories)
    ordered: list[str] = []
    for category in request.categoryOrder:
        if category in present and category not in ordered:
            ordered.append(category)
    for category in STANDARD_CATEGORY_ORDER:
        if category in present and category not in ordered:
            ordered.append(category)
    for assignment in request.assignments:
        if assignment.category in present and assignment.category not in ordered:
            ordered.append(assignment.category)
    return ordered


def validate_category(category: str) -> None:
    if category in CATEGORY_OUTPUT_PATHS:
        return
    safe_custom_category_name(category)


def safe_custom_category_name(category: str) -> str:
    raw = category_display_name(category)
    value = "".join(char if char.isalnum() else "_" for char in raw.strip())
    value = "_".join(part for part in value.split("_") if part)
    if not value:
        raise HTTPException(status_code=400, detail=f"Unsupported category: {category}")
    return value.upper()


def add_plan_item(
    items: list[RenamePlanItem],
    conflicts: list[str],
    output_roots: dict[str, Path],
    source_root: Path,
    output_mode: str,
    ean: str,
    category: str,
    category_name: str | None,
    image_id: str,
    source_relative_path: str,
    image_name: str,
    suffix: str,
    new_name: str,
) -> None:
    if output_mode == OUTPUT_MODE_RENAME:
        source_relative = Path(source_relative_path)
        target_relative = source_relative.with_name(new_name)
        items.append(
            RenamePlanItem(
                id=image_id,
                category=category,
                oldName=source_relative.as_posix(),
                newName=new_name,
                extension=suffix,
                ean=ean,
                outputRelativePath=target_relative.as_posix(),
            )
        )
        return

    output_parts = (*category_output_parts(ean, category, category_name), new_name)
    output_relative_path = Path(*output_parts).as_posix()
    target = output_roots[category].joinpath(*output_parts)
    if target.exists():
        conflicts.append(f"{output_relative_path} already exists")

    items.append(
        RenamePlanItem(
            id=image_id,
            category=category,
            oldName=image_name,
            newName=new_name,
            extension=suffix,
            ean=ean,
            outputRelativePath=output_relative_path,
        )
    )


def find_in_place_conflicts(root: Path, items: list[RenamePlanItem]) -> list[str]:
    selected_sources = {Path(item.oldName).as_posix().lower() for item in items}
    seen_targets: set[str] = set()
    conflicts: list[str] = []

    for item in items:
        target_relative = Path(item.outputRelativePath or item.newName).as_posix()
        target_key = target_relative.lower()
        if target_key in seen_targets:
            conflicts.append(f"{target_relative} is targeted more than once")
            continue
        seen_targets.add(target_key)

        target = (root / target_relative).resolve()
        try:
            target.relative_to(root)
        except ValueError:
            conflicts.append(f"{target_relative} is outside the source folder")
            continue

        if target.exists() and target_key not in selected_sources:
            conflicts.append(f"{target_relative} already exists and is not part of this rename plan")

    return conflicts


def in_place_target(root: Path, item: RenamePlanItem) -> Path:
    relative = Path(item.outputRelativePath or item.newName)
    target = (root / relative).resolve()
    try:
        target.relative_to(root)
    except ValueError as exc:
        raise HTTPException(status_code=409, detail="Invalid in-place target path") from exc
    return target


def rollback_in_place(
    root: Path,
    temp_paths: list[tuple[RenamePlanItem, Path]],
    renamed_targets: list[tuple[RenamePlanItem, Path]],
) -> None:
    for item, target in reversed(renamed_targets):
        original = root / item.oldName
        if target.exists() and not original.exists():
            target.rename(original)
    for item, temp_path in reversed(temp_paths):
        original = root / item.oldName
        if temp_path.exists() and not original.exists():
            temp_path.rename(original)


def write_batch_log(root: Path, output_roots: dict[str, Path], items: list[RenamePlanItem], report_path: Path | None = None) -> Path:
    logs_dir = root / ".ean-renamer" / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    path = logs_dir / f"batch-copy-log-{timestamp}.json"
    payload = {
        "createdAt": datetime.now().isoformat(timespec="seconds"),
        "folder": str(root),
        "mode": "batch_copy",
        "outputFolders": {category: str(path) for category, path in output_roots.items()},
        "outputFolder": str(next(iter(output_roots.values()))),
        "excelReport": str(report_path) if report_path else None,
        "items": [item.model_dump() for item in items],
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return path


def write_batch_rename_log(root: Path, items: list[RenamePlanItem], report_path: Path | None = None) -> Path:
    logs_dir = root / ".ean-renamer" / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    path = logs_dir / f"batch-rename-log-{timestamp}.json"
    payload = {
        "createdAt": datetime.now().isoformat(timespec="seconds"),
        "folder": str(root),
        "mode": "batch_rename",
        "outputFolder": str(root),
        "excelReport": str(report_path) if report_path else None,
        "items": [item.model_dump() for item in items],
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return path
