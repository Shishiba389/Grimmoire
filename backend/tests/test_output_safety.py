from __future__ import annotations

from pathlib import Path

import pytest
from fastapi import HTTPException

from services.ean_renamer.models import BatchAssignment, BatchRenameRequest, RenameColumns, RenamePlanItem, RenameRequest
from services.ean_renamer.services.batch_renamer import apply_batch_copy, build_batch_plan, find_copy_target_collisions
from services.ean_renamer.services.folder_scanner import image_id_for_name, invalidate_scan_cache
from services.ean_renamer.services.safe_renamer import apply_rename


EAN = "5901234123457"


def make_source(tmp_path: Path) -> tuple[Path, str, str]:
    source = tmp_path / "source"
    ean_folder = source / EAN
    ean_folder.mkdir(parents=True)
    (ean_folder / "packshot.jpg").write_bytes(b"PACKSHOT")
    (ean_folder / "artwork.jpg").write_bytes(b"ARTWORK")
    return source, image_id_for_name(f"{EAN}/packshot.jpg"), image_id_for_name(f"{EAN}/artwork.jpg")


def request_for(source: Path, packshot_id: str, artwork_id: str, paths: dict[str, str]) -> BatchRenameRequest:
    return BatchRenameRequest(
        folderPath=str(source),
        outputFolderPaths=paths,
        assignments=[
            BatchAssignment(id=packshot_id, category="packshot"),
            BatchAssignment(id=artwork_id, category="artwork"),
        ],
    )


def test_batch_requires_output_for_every_populated_category(tmp_path: Path) -> None:
    source, packshot_id, artwork_id = make_source(tmp_path)
    request = request_for(source, packshot_id, artwork_id, {"packshot": str(tmp_path / "packshots")})

    with pytest.raises(HTTPException, match="Missing: artwork"):
        build_batch_plan(request)


def test_batch_rejects_shared_category_output_root(tmp_path: Path) -> None:
    source, packshot_id, artwork_id = make_source(tmp_path)
    shared = str(tmp_path / "shared")
    request = request_for(source, packshot_id, artwork_id, {"packshot": shared, "artwork": shared})

    with pytest.raises(HTTPException, match="different output folder"):
        build_batch_plan(request)


def test_batch_copies_packshot_and_artwork_to_separate_ean_folders(tmp_path: Path) -> None:
    source, packshot_id, artwork_id = make_source(tmp_path)
    packshots = tmp_path / "packshots"
    artworks = tmp_path / "artworks"
    request = request_for(
        source,
        packshot_id,
        artwork_id,
        {"packshot": str(packshots), "artwork": str(artworks)},
    )

    result = apply_batch_copy(request)

    assert len(result.items) == 2
    assert (packshots / EAN / f"{EAN}.jpg").read_bytes() == b"PACKSHOT"
    assert (artworks / EAN / f"{EAN}.jpg").read_bytes() == b"ARTWORK"
    invalidate_scan_cache(str(source))


def test_legacy_copy_rejects_mixed_categories(tmp_path: Path) -> None:
    source = tmp_path / EAN
    source.mkdir()
    (source / "packshot.jpg").write_bytes(b"PACKSHOT")
    (source / "artwork.jpg").write_bytes(b"ARTWORK")
    request = RenameRequest(
        folderPath=str(source),
        outputFolderPath=str(tmp_path / "output"),
        columns=RenameColumns(
            packshot=[image_id_for_name("packshot.jpg")],
            artwork=[image_id_for_name("artwork.jpg")],
        ),
    )

    with pytest.raises(HTTPException, match="Legacy rename copy supports one category"):
        apply_rename(request)


def test_copy_plan_detects_a_duplicate_destination_before_copy(tmp_path: Path) -> None:
    root = tmp_path / "packshots"
    first = RenamePlanItem(
        id="first", category="packshot", oldName="first.jpg", newName=f"{EAN}.jpg",
        extension=".jpg", ean=EAN, outputRelativePath=f"{EAN}/{EAN}.jpg",
    )
    second = RenamePlanItem(
        id="second", category="packshot", oldName="second.jpg", newName=f"{EAN}.jpg",
        extension=".jpg", ean=EAN, outputRelativePath=f"{EAN}/{EAN}.jpg",
    )

    conflicts = find_copy_target_collisions([first, second], {"packshot": root})

    assert len(conflicts) == 1
    assert "collides" in conflicts[0]
