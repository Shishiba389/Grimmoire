param(
    [string]$Version = "",
    [string]$Configuration = "Release",
    [string]$Runtime = "win-x64",
    [switch]$SkipNodeRestore,
    [switch]$SkipBackendRuntime,
    [switch]$CleanBuild
)

$ErrorActionPreference = "Stop"

$PackageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Resolve-Path (Join-Path $PackageRoot "..")
$DesktopProject = Join-Path $RepoRoot "desktop\Grimoire.Desktop.csproj"
$FrontendDir = Join-Path $RepoRoot "frontend"
$BackendDir = Join-Path $RepoRoot "backend"
$DataDir = Join-Path $RepoRoot "data"
$IconPath = Join-Path $RepoRoot "desktop\grimoire.ico"
$BuildRoot = Join-Path $PackageRoot "build"
$AppDir = Join-Path $BuildRoot "app"
$ReleasesDir = Join-Path $PackageRoot "Releases"
$ReleaseNotes = Join-Path $PackageRoot "release-notes.md"
$BackendRuntimeRequirements = Join-Path $BackendDir "requirements-runtime.txt"
$InnoScript = Join-Path $PackageRoot "Grimoire-Setup.iss"

if ([string]::IsNullOrWhiteSpace($Version)) {
    [xml]$projectXml = Get-Content $DesktopProject
    $Version = $projectXml.Project.PropertyGroup.Version
}

if ([string]::IsNullOrWhiteSpace($Version)) {
    throw "Could not determine package version."
}

Write-Host "== GRIMOIRE installer build =="
Write-Host "Version: $Version"
Write-Host "Runtime: $Runtime"
Write-Host ""

if ($CleanBuild -and (Test-Path $BuildRoot)) {
    Write-Host "Cleaning existing build output..."
    Remove-Item -LiteralPath $BuildRoot -Recurse -Force
}

if (-not $SkipNodeRestore) {
    Write-Host "[1/7] Restoring frontend dependencies..."
    Set-Location $FrontendDir
    npm.cmd ci
}

Write-Host "[2/7] Building frontend..."
Set-Location $FrontendDir
npm.cmd run build

Write-Host "[3/7] Publishing desktop app..."
if (Test-Path $AppDir) {
    Remove-Item -LiteralPath $AppDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $AppDir | Out-Null

Set-Location $RepoRoot
dotnet publish $DesktopProject `
    -c $Configuration `
    -r $Runtime `
    --self-contained true `
    -o $AppDir `
    -p:Version=$Version `
    -p:DebugType=None `
    -p:DebugSymbols=false

Write-Host "[4/7] Copying backend runtime files..."
$BackendTarget = Join-Path $AppDir "backend"
New-Item -ItemType Directory -Force -Path $BackendTarget | Out-Null

robocopy $BackendDir $BackendTarget /E `
    /XD ".venv" "node_modules" "__pycache__" `
    /XD "storage\uploads" "storage\outputs" `
    /XF "*.pyc" "*.pyo" | Out-Null

$robocopyExit = $LASTEXITCODE
if ($robocopyExit -gt 7) {
    throw "robocopy failed with exit code $robocopyExit"
}

Write-Host "[5/7] Copying data files (taxonomy, reference examples)..."
$DataTarget = Join-Path $AppDir "data"
if (Test-Path $DataDir) {
    New-Item -ItemType Directory -Force -Path $DataTarget | Out-Null
    robocopy $DataDir $DataTarget /E /XD "__pycache__" /XF "*.pyc" "*.pyo" "~`$*" | Out-Null
    $dataCopyExit = $LASTEXITCODE
    if ($dataCopyExit -gt 7) {
        throw "robocopy data folder failed with exit code $dataCopyExit"
    }
    Write-Host "      Data folder copied."
} else {
    Write-Host "      [WARN] No data/ folder found at $DataDir - skipping."
}

if (-not $SkipBackendRuntime) {
    Write-Host "[6/7] Creating bundled Python runtime..."
    $BasePython = Join-Path $env:LOCALAPPDATA "Programs\Python\Python311"
    if (-not (Test-Path (Join-Path $BasePython "python.exe"))) {
        $BasePython = (& py -3.11 -c "import sys; import pathlib; print(pathlib.Path(sys.executable).parent)").Trim()
    }
    if (-not (Test-Path (Join-Path $BasePython "python.exe"))) {
        throw "Could not locate Python 3.11 base runtime."
    }

    $PythonTarget = Join-Path $BackendTarget "python"
    if (Test-Path $PythonTarget) {
        Remove-Item -LiteralPath $PythonTarget -Recurse -Force
    }
    New-Item -ItemType Directory -Force -Path $PythonTarget | Out-Null

    robocopy $BasePython $PythonTarget /E `
        /XD "__pycache__" "Scripts\__pycache__" "Lib\__pycache__" `
        /XF "*.pyc" "*.pyo" | Out-Null

    $pythonCopyExit = $LASTEXITCODE
    if ($pythonCopyExit -gt 7) {
        throw "robocopy Python runtime failed with exit code $pythonCopyExit"
    }

    $BackendPython = Join-Path $PythonTarget "python.exe"
    & $BackendPython -m pip install --upgrade pip
    & $BackendPython -m pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
    & $BackendPython -m pip install -r $BackendRuntimeRequirements

    Write-Host "      Removing unnecessary packages from bundled runtime..."
    & $BackendPython -m pip uninstall PySide6 PySide6-Essentials PySide6-Addons shiboken6 -y 2>&1 | Out-Null
    & $BackendPython -m pip uninstall botocore boto3 s3transfer awscli -y 2>&1 | Out-Null

    Write-Host "      Installing backend Node dependencies..."
    Push-Location $BackendTarget
    npm.cmd ci --omit=dev
    Pop-Location

    $NodeExe = Join-Path $env:ProgramFiles "nodejs\node.exe"
    if (Test-Path $NodeExe) {
        $NodeTarget = Join-Path $BackendTarget "node"
        New-Item -ItemType Directory -Force -Path $NodeTarget | Out-Null
        Copy-Item -LiteralPath $NodeExe -Destination (Join-Path $NodeTarget "node.exe") -Force
    } else {
        Write-Host "      [WARN] node.exe was not found under Program Files. Runtime will use node from PATH."
    }
}

if (-not (Test-Path $ReleaseNotes)) {
    @"
# GRIMOIRE $Version

- Installer package for GRIMOIRE $Version.
- Source code remains in the private development repository.
"@ | Set-Content -Path $ReleaseNotes -Encoding UTF8
}

Write-Host "[7/7] Compiling Inno Setup installer..."
Set-Location $PackageRoot
New-Item -ItemType Directory -Force -Path $ReleasesDir | Out-Null

$InnoCompiler = $null
$InnoSearchPaths = @(
    "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
    "$env:ProgramFiles\Inno Setup 6\ISCC.exe",
    "${env:ProgramFiles(x86)}\Inno Setup 5\ISCC.exe"
)
foreach ($p in $InnoSearchPaths) {
    if (Test-Path $p) {
        $InnoCompiler = $p
        break
    }
}
if (-not $InnoCompiler) {
    throw "Inno Setup compiler (ISCC.exe) not found. Install Inno Setup 6 from https://jrsoftware.org/isinfo.php"
}

if (-not (Test-Path $InnoScript)) {
    throw "Inno Setup script not found at $InnoScript"
}

& $InnoCompiler `
    "/DMyAppVersion=$Version" `
    "/DMyAppDir=$AppDir" `
    "/DMyOutputDir=$ReleasesDir" `
    "/DMyIconPath=$IconPath" `
    $InnoScript

if ($LASTEXITCODE -ne 0) {
    throw "Inno Setup compilation failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Done. Release assets:"
Get-ChildItem $ReleasesDir | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
