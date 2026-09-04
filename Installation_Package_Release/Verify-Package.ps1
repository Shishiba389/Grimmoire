param(
    [Parameter(Mandatory = $true)]
    [string]$AppDir
)

$ErrorActionPreference = "Stop"
$AppDir = (Resolve-Path $AppDir).Path
$BackendDir = Join-Path $AppDir "backend"
$Python = Join-Path $BackendDir "python\python.exe"

$requiredFiles = @(
    (Join-Path $AppDir "Grimoire.exe"),
    (Join-Path $AppDir "wwwroot\index.html"),
    (Join-Path $BackendDir "main.py"),
    $Python,
    (Join-Path $AppDir "data\taxonomy\CLIP_Image_Classification_Taxonomy_with_Prompts.xlsx")
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
        throw "Required package file is missing: $file"
    }
}

$referenceRoot = Join-Path $AppDir "data\reference_examples"
if (-not (Test-Path -LiteralPath $referenceRoot -PathType Container)) {
    throw "Reference example directory is missing: $referenceRoot"
}

$referenceCount = (Get-ChildItem -LiteralPath $referenceRoot -File -Recurse).Count
if ($referenceCount -lt 100) {
    throw "Reference example set looks incomplete: only $referenceCount files"
}

$env:PYTHONDONTWRITEBYTECODE = "1"
$env:HF_HOME = Join-Path $AppDir "models\huggingface"
$env:HF_HUB_CACHE = Join-Path $env:HF_HOME "hub"
$env:HF_HUB_OFFLINE = "1"
$env:TRANSFORMERS_OFFLINE = "1"
$env:GRIMOIRE_DATA = Join-Path $env:TEMP "grimoire-package-verify"

$verifyCode = @'
import importlib
import json
import os
import sys
from pathlib import Path

backend = Path.cwd()
sys.path.insert(0, str(backend))

modules = [
    "fastapi", "uvicorn", "pydantic", "pydantic_settings", "multipart",
    "pandas", "polars", "duckdb", "pandera", "openpyxl", "xlsxwriter",
    "yaml", "requests", "PIL", "pillow_heif", "numpy", "imageio_ffmpeg",
    "torch", "torchvision", "open_clip", "sklearn",
]
versions = {}
for name in modules:
    module = importlib.import_module(name)
    versions[name] = getattr(module, "__version__", "ok")

from main import app
paths = set(app.openapi()["paths"])
required_routes = {
    "/health",
    "/api/ean-renamer/batch/preview",
    "/api/ean-renamer/batch/apply",
    "/api/ean-renamer/folder/bulk-scan",
}
missing_routes = sorted(required_routes - paths)
if missing_routes:
    raise RuntimeError(f"Missing API routes: {missing_routes}")

from services.ean_renamer.clip.taxonomy_loader import load_taxonomy
taxonomy = load_taxonomy()
if not taxonomy.categories:
    raise RuntimeError("CLIP taxonomy contains no categories")

from services.ean_renamer.clip import model_manager
model = model_manager.get_model()
if not model.version:
    raise RuntimeError("CLIP model did not load")

print(json.dumps({
    "status": "ok",
    "modules": versions,
    "routes": len(paths),
    "taxonomy_categories": len(taxonomy.categories),
    "clip_model": model.version,
}, indent=2))
'@

Push-Location $BackendDir
try {
    $verifyCode | & $Python -
    if ($LASTEXITCODE -ne 0) {
        throw "Bundled Python verification failed with exit code $LASTEXITCODE"
    }

} finally {
    Pop-Location
    Remove-Item -LiteralPath $env:GRIMOIRE_DATA -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Package verification passed."
