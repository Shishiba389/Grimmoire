from __future__ import annotations

from pathlib import Path

from fastapi import HTTPException

from services.ean_renamer.models import RenamePlanItem, RenamePlanResponse, RenameRequest
from services.ean_renamer.services.folder_scanner import get_image_path, normalize_folder, scan_folder

CATEGORY_ORDER = ("packshot", "lifestyle", "artwork")


def build_rename_plan(request: RenameRequest) -> RenamePlanResponse:
    folder = normalize_folder(request.folderPath)
    scanned = scan_folder(str(folder))
    known_ids = {image.id for image in scanned.images}
    selected_ids: set[str] = set()
    items: list[RenamePlanItem] = []
    counter = 1

    for category in CATEGORY_ORDER:
        image_ids = getattr(request.columns, category)
        for image_id in image_ids:
            if image_id in selected_ids:
                continue
            if image_id not in known_ids:
                raise HTTPException(
                    status_code=409,
                    detail="Source folder changed since it was loaded. Click Refresh and try again.",
                )
            selected_ids.add(image_id)

            image_path = get_image_path(folder, image_id)
            new_name = f"{folder.name}_{counter}{image_path.suffix.lower()}"
            items.append(
                RenamePlanItem(
                    id=image_id,
                    category=category,
                    oldName=image_path.name,
                    newName=new_name,
                    extension=image_path.suffix.lower(),
                )
            )
            counter += 1

    conflict_folder = Path(request.outputFolderPath).expanduser().resolve() if request.outputFolderPath else folder
    conflicts = find_target_conflicts(conflict_folder, items, selected_old_names_relevant=not request.outputFolderPath)
    return RenamePlanResponse(
        ean=folder.name,
        items=items,
        skippedCount=len(known_ids - selected_ids),
        conflicts=conflicts,
    )


def find_target_conflicts(folder: Path, items: list[RenamePlanItem], selected_old_names_relevant: bool = True) -> list[str]:
    selected_old_names = {item.oldName for item in items}
    conflicts: list[str] = []

    for item in items:
        target = folder / item.newName
        same_file = item.oldName.lower() == item.newName.lower()
        target_is_selected_source = selected_old_names_relevant and target.name in selected_old_names
        if target.exists() and not same_file and not target_is_selected_source:
            conflicts.append(f"{item.newName} already exists and is not part of this rename plan")

    return conflicts
