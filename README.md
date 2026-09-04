# GRIMOIRE

GRIMOIRE is a local Windows desktop tool for product-data audit, image review,
EAN-based output, and high-volume folder processing. It combines a React user
interface, FastAPI backend, and WPF/WebView2 desktop host.

## Included workflows

| Workflow | Purpose |
| --- | --- |
| Data QC | Audit Excel/CSV master data and generate review reports. |
| Images Check | Scan and visually review local image folders before confirmed deletion. |
| EAN Renamer | Classify, preview, copy, or rename a product folder by EAN. |
| Bulk Working | Process many EAN folders with lazy queue scanning, PDF retention, AI suggestions, custom output columns, and preview-first output. |

## Bulk Working principles

- A root scan returns lightweight folder summaries so large queues stay fast.
- Full files are loaded only when a user opens a folder.
- PDF files are retained and counted. They are not sent to CLIP and start in
  Artwork for manual review.
- Users can filter the queue and move selected files directly instead of
  relying on a horizontally expanding drag board.
- Custom columns persist locally and are output categories just like EAN
  Renamer categories.

## Development

```powershell
cd frontend
npm ci
npm run lint
npm test
npm run build

cd ..\backend
python -m pytest
python -m compileall -q .

cd ..
dotnet build desktop\Grimoire.Desktop.csproj -c Release --no-restore
```

The frontend build is copied into `desktop/wwwroot` by the desktop project.
For a release package, use `Installation_Package_Release/Build-Installer.ps1`.

## Local operations

Use `SETUP_GRIMOIRE.bat` for a first local setup, `REPAIR_GRIMOIRE.bat` for a
repair/build, and `DIAGNOSE_GRIMOIRE.bat` for support diagnostics.

## Retired modules

EAN Sorter, Packshot Browser, SharePoint browsing, and Image Edit have been
removed from GRIMOIRE. The unbuilt Image Edit source was moved to
`D:\GRIMOIRE_IMAGE_EDIT` for later standalone-app work.
