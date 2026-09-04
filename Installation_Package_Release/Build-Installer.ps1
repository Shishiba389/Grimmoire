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
$VerifyScript = Join-Path $PackageRoot "Verify-Package.ps1"
$PrerequisitesDir = Join-Path $PackageRoot "prerequisites"
$WebView2Installer = Join-Path $PrerequisitesDir "MicrosoftEdgeWebView2RuntimeInstallerX64.exe"
$WebView2StandaloneUrl = "https://go.microsoft.com/fwlink/p/?LinkId=2124701"

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
    Write-Host "[1/9] Restoring frontend dependencies..."
    Set-Location $FrontendDir
    npm.cmd ci
}

Write-Host "[2/9] Building frontend..."
Set-Location $FrontendDir
npm.cmd run build

Write-Host "[3/9] Publishing desktop app..."
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

Write-Host "[4/9] Copying backend runtime files..."
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

Write-Host "[5/9] Copying data files (taxonomy, reference examples)..."
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
    Write-Host "[6/9] Creating clean bundled Python runtime..."
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

    $BaseSitePackages = Join-Path $BasePython "Lib\site-packages"
    $BaseScripts = Join-Path $BasePython "Scripts"
    robocopy $BasePython $PythonTarget /E `
        /XD "__pycache__" $BaseSitePackages $BaseScripts `
        /XF "*.pyc" "*.pyo" | Out-Null

    $pythonCopyExit = $LASTEXITCODE
    if ($pythonCopyExit -gt 7) {
        throw "robocopy Python runtime failed with exit code $pythonCopyExit"
    }

    $BackendPython = Join-Path $PythonTarget "python.exe"
    Remove-Item -LiteralPath (Join-Path $PythonTarget "Lib\site-packages") -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath (Join-Path $PythonTarget "Scripts") -Recurse -Force -ErrorAction SilentlyContinue

    & $BackendPython -m ensurepip --upgrade
    if ($LASTEXITCODE -ne 0) {
        throw "Could not bootstrap pip in the bundled Python runtime."
    }
    & $BackendPython -m pip install --upgrade pip
    & $BackendPython -m pip install `
        "torch==2.12.1+cpu" "torchvision==0.27.1+cpu" `
        --index-url https://download.pytorch.org/whl/cpu
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to install the pinned CPU Torch runtime."
    }
    & $BackendPython -m pip install -r $BackendRuntimeRequirements
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to install backend runtime requirements."
    }

    Write-Host "      Removing unnecessary packages from bundled runtime..."
    $unwantedPackages = @(
        "PySide6",
        "PySide6-Essentials",
        "PySide6-Addons",
        "shiboken6",
        "botocore",
        "boto3",
        "s3transfer",
        "awscli"
    )
    $installedPackages = @(
        & $BackendPython -m pip list --format=json --disable-pip-version-check |
            ConvertFrom-Json |
            ForEach-Object { $_.name.ToLowerInvariant() }
    )
    if ($LASTEXITCODE -ne 0) {
        throw "Could not inspect bundled Python packages."
    }

    $packagesToRemove = @(
        $unwantedPackages |
            Where-Object { $installedPackages -contains $_.ToLowerInvariant() }
    )
    if ($packagesToRemove.Count -gt 0) {
        $pipUninstallArgs = @("-m", "pip", "uninstall") + $packagesToRemove + @("-y")
        & $BackendPython @pipUninstallArgs
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to remove unnecessary bundled Python packages."
        }
    } else {
        Write-Host "      No unnecessary Python packages are installed."
    }

    Write-Host "[7/9] Downloading the offline CLIP model and WebView2 runtime..."
    $ModelRoot = Join-Path $AppDir "models"
    $HfHome = Join-Path $ModelRoot "huggingface"
    $HfHubCache = Join-Path $HfHome "hub"
    New-Item -ItemType Directory -Force -Path $HfHubCache, $PrerequisitesDir | Out-Null

    $env:HF_HOME = $HfHome
    $env:HF_HUB_CACHE = $HfHubCache
    $downloadModelsCode = @'
import os
from huggingface_hub import snapshot_download

snapshot_download(
    repo_id="timm/vit_base_patch32_clip_224.openai",
    cache_dir=os.environ["HF_HUB_CACHE"],
    allow_patterns=[
        "*.safetensors",
        "*.json",
        "*.txt",
        "README.md",
        ".gitattributes",
    ],
)
'@
    $downloadModelsCode | & $BackendPython -
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to download the offline CLIP model assets."
    }

    if (-not (Test-Path $WebView2Installer)) {
        Invoke-WebRequest `
            -Uri $WebView2StandaloneUrl `
            -OutFile $WebView2Installer `
            -UseBasicParsing
    }
    if ((Get-Item $WebView2Installer).Length -lt 100MB) {
        throw "Downloaded WebView2 standalone installer looks incomplete."
    }
} else {
    Write-Host "[6/9] Backend runtime creation skipped."
}

if (-not (Test-Path $ReleaseNotes)) {
    @"
# GRIMOIRE $Version

- Installer package for GRIMOIRE $Version.
- Source code remains in the private development repository.
"@ | Set-Content -Path $ReleaseNotes -Encoding UTF8
}

Write-Host "[8/9] Verifying the packaged application offline..."
if (-not (Test-Path $VerifyScript)) {
    throw "Package verification script not found at $VerifyScript"
}
& $VerifyScript -AppDir $AppDir
if ($LASTEXITCODE -ne 0) {
    throw "Package verification failed."
}

Write-Host "[9/9] Compiling Inno Setup installer..."
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
    "/DMyWebView2Installer=$WebView2Installer" `
    $InnoScript

if ($LASTEXITCODE -ne 0) {
    throw "Inno Setup compilation failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Done. Release assets:"
Get-ChildItem $ReleasesDir | Select-Object Name, Length, LastWriteTime | Format-Table -AutoSize
