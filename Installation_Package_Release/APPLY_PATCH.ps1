param(
    [Parameter(Mandatory = $true)]
    [string]$PatchZip,
    [Parameter(Mandatory = $true)]
    [string]$InstallDir
)

$ErrorActionPreference = "Stop"
$patchPath = (Resolve-Path -LiteralPath $PatchZip).Path
$appPath = (Resolve-Path -LiteralPath $InstallDir).Path
$exePath = Join-Path $appPath "Grimoire.exe"
if (-not (Test-Path -LiteralPath $exePath -PathType Leaf)) {
    throw "Grimoire.exe was not found in the selected installation folder."
}

$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("grimoire-manual-patch-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tempRoot | Out-Null

try {
    Get-Process -Name Grimoire -ErrorAction SilentlyContinue | Stop-Process -Force
    Expand-Archive -LiteralPath $patchPath -DestinationPath $tempRoot -Force

    $deleteList = Join-Path $tempRoot ".grimoire-delete.txt"
    if (Test-Path -LiteralPath $deleteList -PathType Leaf) {
        foreach ($relativePath in Get-Content -LiteralPath $deleteList) {
            if ([string]::IsNullOrWhiteSpace($relativePath)) { continue }
            if ([System.IO.Path]::IsPathRooted($relativePath) -or $relativePath -match '(^|[\\/])\.\.([\\/]|$)') {
                throw "Unsafe path in patch deletion manifest: $relativePath"
            }
            $target = Join-Path $appPath $relativePath
            if (Test-Path -LiteralPath $target -PathType Leaf) {
                Remove-Item -LiteralPath $target -Force
            }
        }
    }

    Get-ChildItem -LiteralPath $tempRoot -Recurse -File |
        Where-Object { $_.Name -ne ".grimoire-delete.txt" } |
        ForEach-Object {
            $relativePath = $_.FullName.Substring($tempRoot.Length).TrimStart("\\", "/")
            $destination = Join-Path $appPath $relativePath
            New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
            Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
        }

    Start-Process -FilePath $exePath
    Write-Host "GRIMOIRE was updated and restarted."
}
finally {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force -ErrorAction SilentlyContinue
}
