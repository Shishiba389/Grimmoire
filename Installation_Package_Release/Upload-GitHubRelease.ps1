param(
    [Parameter(Mandatory = $true)]
    [string]$Version,
    [switch]$Draft
)

$ErrorActionPreference = "Stop"

$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ReleasesDir = Join-Path $PackageRoot "Releases"
$ReleaseNotes = Join-Path $PackageRoot "release-notes.md"
$RepoUrl = "https://github.com/Shishiba389/Grimoire_Release"
$Token = $env:GITHUB_TOKEN

if ([string]::IsNullOrWhiteSpace($Token)) {
    throw "Set GITHUB_TOKEN before uploading. Example: `$env:GITHUB_TOKEN = 'ghp_...'"
}

if (-not (Test-Path $ReleasesDir)) {
    throw "Releases folder not found. Run Build-Installer.ps1 first."
}

$tag = "v$Version"
$releaseName = "GRIMOIRE $tag"
$SetupFile = Join-Path $ReleasesDir "Grimoire-$Version-Setup.exe"
$PatchFile = Join-Path $ReleasesDir "Grimoire-$Version-patch.zip"

if (-not (Test-Path $SetupFile)) {
    throw "Setup file not found: $SetupFile. Run Build-Installer.ps1 first."
}

$assets = @($SetupFile)
if (Test-Path $PatchFile) {
    $assets += $PatchFile
    Write-Host "Patch file found: $PatchFile"
}

Write-Host "Uploading to $RepoUrl as $tag..."

$ghArgs = @("release", "create", $tag)
$ghArgs += $assets
$ghArgs += @("--repo", $RepoUrl, "--title", $releaseName)

if (Test-Path $ReleaseNotes) {
    $ghArgs += "--notes-file"
    $ghArgs += $ReleaseNotes
}

if ($Draft) {
    $ghArgs += "--draft"
}

& gh @ghArgs

if ($LASTEXITCODE -ne 0) {
    throw "gh release create failed with exit code $LASTEXITCODE"
}

Write-Host "Release $tag uploaded successfully."
Write-Host "Assets:"
foreach ($a in $assets) {
    $size = [math]::Round((Get-Item $a).Length / 1MB, 1)
    Write-Host "  $(Split-Path $a -Leaf) ($size MB)"
}
