from __future__ import annotations

from pathlib import Path

from fastapi.testclient import TestClient

from main import app
from services.ean_renamer.services.folder_scanner import scan_bulk_folders, scan_folder


def _write_media(folder: Path) -> None:
    (folder / "artwork.pdf").write_bytes(b"%PDF-1.4\n")
    (folder / "product.jpg").write_bytes(b"not-a-real-jpeg")


def test_bulk_scan_keeps_pdf_and_returns_a_lightweight_summary(tmp_path: Path) -> None:
    root = tmp_path / "batch"
    folder = root / "8800000000000"
    folder.mkdir(parents=True)
    _write_media(folder)
    for index in range(8):
        (folder / f"extra-{index}.jpg").write_bytes(b"jpeg")

    result = scan_bulk_folders(str(root))

    assert result.totalFolders == 1
    assert result.totalImages == 10
    item = result.folders[0]
    assert item.imageCount == 10
    assert item.documentCount == 1
    assert len(item.images) == 4
    assert any(media.extension == ".pdf" for media in item.images)


def test_open_folder_returns_full_pdf_and_image_list(tmp_path: Path) -> None:
    folder = tmp_path / "8800000000000"
    folder.mkdir()
    _write_media(folder)

    result = scan_folder(str(folder))

    assert [media.extension for media in result.images] == [".pdf", ".jpg"]


def test_bulk_scan_api_includes_pdf_counts(tmp_path: Path) -> None:
    root = tmp_path / "batch"
    folder = root / "8800000000000"
    folder.mkdir(parents=True)
    _write_media(folder)

    with TestClient(app) as client:
        response = client.post("/api/ean-renamer/folder/bulk-scan", json={"folderPath": str(root)})

    assert response.status_code == 200
    item = response.json()["folders"][0]
    assert item["imageCount"] == 2
    assert item["documentCount"] == 1
