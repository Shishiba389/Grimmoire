param(
    [Parameter(Mandatory = $true)]
    [string]$Version,
    [string]$PreviousBuildDir = ""
)

$ErrorActionPreference = "Stop"

$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$AppDir = (Join-Path $PackageRoot "build\app").TrimEnd('\')
$AppDir = (Resolve-Path $AppDir).Path
$ReleasesDir = Join-Path $PackageRoot "Releases"
$SnapshotDir = Join-Path $PackageRoot "snapshots"
$CurrentSnapshot = Join-Path $SnapshotDir $Version

if (-not (Test-Path $AppDir)) {
    throw "Build output not found at $AppDir. Run Build-Installer.ps1 first."
}

New-Item -ItemType Directory -Force -Path $ReleasesDir | Out-Null
New-Item -ItemType Directory -Force -Path $SnapshotDir | Out-Null

# ── Step 1: Generate manifest for current build ──
Write-Host "[1/3] Generating file manifest..."
$manifest = @{}
$prefixLen = $AppDir.Length + 1
$allFiles = Get-ChildItem -LiteralPath $AppDir -Recurse -File
Write-Host "      Found $($allFiles.Count) files"
foreach ($f in $allFiles) {
    $fullPath = $f.FullName
    if ($fullPath.Length -le $prefixLen) { continue }
    $rel = $fullPath.Substring($prefixLen).Replace("\", "/")
    $hash = (Get-FileHash -LiteralPath $fullPath -Algorithm SHA256).Hash.ToLower()
    $manifest[$rel] = @{ hash = $hash; size = $f.Length }
}

$manifestJson = @{
    version = $Version
    files = $manifest
} | ConvertTo-Json -Depth 4

$manifestPath = Join-Path $ReleasesDir "manifest-$Version.json"
$manifestJson | Set-Content -Path $manifestPath -Encoding UTF8
Write-Host "      Manifest: $($manifest.Count) files"

# ── Step 2: Compare with previous build to find changed files ──
Write-Host "[2/3] Comparing with previous version..."

$previousManifest = $null
if ($PreviousBuildDir -and (Test-Path $PreviousBuildDir)) {
    $prevManifestFile = Get-ChildItem $ReleasesDir -Filter "manifest-*.json" |
        Where-Object { $_.Name -ne "manifest-$Version.json" } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if ($prevManifestFile) {
        $previousManifest = Get-Content $prevManifestFile.FullName -Raw | ConvertFrom-Json
    }
}

if (-not $previousManifest) {
    $prevManifestFile = Get-ChildItem $ReleasesDir -Filter "manifest-*.json" |
        Where-Object { $_.Name -ne "manifest-$Version.json" } |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1

    if ($prevManifestFile) {
        $previousManifest = Get-Content $prevManifestFile.FullName -Raw | ConvertFrom-Json
    }
}

if (-not $previousManifest) {
    Write-Host "      No previous manifest found. Skipping patch generation."
    Write-Host "      (This is expected for the first release)"
    Write-Host ""
    Write-Host "Done. Manifest saved to: $manifestPath"
    exit 0
}

$prevFiles = @{}
$previousManifest.files.PSObject.Properties | ForEach-Object {
    $prevFiles[$_.Name] = $_.Value.hash
}

$changedFiles = @()
foreach ($rel in $manifest.Keys) {
    $currentHash = $manifest[$rel].hash
    if (-not $prevFiles.ContainsKey($rel) -or $prevFiles[$rel] -ne $currentHash) {
        $changedFiles += $rel
    }
}

Write-Host "      Changed/new files: $($changedFiles.Count) of $($manifest.Count)"

if ($changedFiles.Count -eq 0) {
    Write-Host "      No changes detected. Skipping patch generation."
    exit 0
}

# ── Step 3: Create patch zip ──
Write-Host "[3/3] Creating patch archive..."
$patchDir = Join-Path $env:TEMP "grimoire-patch-$Version"
if (Test-Path $patchDir) {
    Remove-Item -LiteralPath $patchDir -Recurse -Force
}

foreach ($rel in $changedFiles) {
    $src = Join-Path $AppDir ($rel.Replace("/", "\"))
    $dst = Join-Path $patchDir ($rel.Replace("/", "\"))
    $dstDir = Split-Path $dst -Parent
    New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
    Copy-Item -LiteralPath $src -Destination $dst -Force
}

$patchZip = Join-Path $ReleasesDir "Grimoire-$Version-patch.zip"
if (Test-Path $patchZip) {
    Remove-Item -LiteralPath $patchZip -Force
}
Compress-Archive -Path "$patchDir\*" -DestinationPath $patchZip -CompressionLevel Optimal

Remove-Item -LiteralPath $patchDir -Recurse -Force

$patchSize = [math]::Round((Get-Item $patchZip).Length / 1MB, 1)
Write-Host ""
Write-Host "Done. Patch archive: $patchZip ($patchSize MB)"
Write-Host "      Changed files: $($changedFiles.Count)"
Write-Host "      Full installer: Grimoire-$Version-Setup.exe"
