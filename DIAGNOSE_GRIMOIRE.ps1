$ErrorActionPreference = "Continue"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Backend = Join-Path $Root "backend"
$Frontend = Join-Path $Root "frontend"
$OutDir = Join-Path $Root "diagnostics"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$Report = Join-Path $OutDir "grimoire-diagnose-$Stamp.txt"

function Add-Line {
    param([string]$Text = "")
    $Text | Out-File -FilePath $Report -Append -Encoding utf8
}

function Add-Command {
    param(
        [string]$Title,
        [string]$FileName,
        [string[]]$Arguments = @(),
        [string]$WorkingDirectory = $Root
    )
    Add-Line "[$Title]"
    try {
        Push-Location $WorkingDirectory
        $output = & $FileName @Arguments 2>&1
        if ($LASTEXITCODE -ne $null) {
            Add-Line "ExitCode: $LASTEXITCODE"
        }
        if ($output) {
            $output | ForEach-Object { Add-Line ($_ | Out-String).TrimEnd() }
        }
    } catch {
        Add-Line "ERROR: $($_.Exception.Message)"
    } finally {
        Pop-Location
    }
    Add-Line
}

function Add-Exists {
    param([string]$Label, [string]$Path)
    if (Test-Path $Path) {
        Add-Line "OK      $Label -> $Path"
    } else {
        Add-Line "MISSING $Label -> $Path"
    }
}

Add-Line "GRIMOIRE Diagnostic Report"
Add-Line "=========================="
Add-Line "Created: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "Root: $Root"
Add-Line

Add-Line "[System]"
Add-Line "OS: $([System.Environment]::OSVersion.VersionString)"
Add-Line "User: $env:USERNAME"
Add-Line "Computer: $env:COMPUTERNAME"
Add-Line "Arch: $env:PROCESSOR_ARCHITECTURE"
Add-Line

Add-Command "Python Version" "python" @("--version")
Add-Command "Python Path" "where.exe" @("python")
Add-Command "Node Version" "node" @("--version")
Add-Command "Node Path" "where.exe" @("node")
Add-Command "npm Version" "npm.cmd" @("--version")
Add-Command "npm Path" "where.exe" @("npm")
Add-Command ".NET Version" "dotnet" @("--version")
Add-Command ".NET Path" "where.exe" @("dotnet")

Add-Line "[Project Files]"
Add-Exists "backend main" (Join-Path $Backend "main.py")
Add-Exists "backend venv" (Join-Path $Backend ".venv\Scripts\python.exe")
Add-Exists "backend package" (Join-Path $Backend "package.json")
Add-Exists "backend node_modules" (Join-Path $Backend "node_modules")
Add-Exists "frontend package" (Join-Path $Frontend "package.json")
Add-Exists "frontend node_modules" (Join-Path $Frontend "node_modules")
Add-Exists "desktop exe" (Join-Path $Root "desktop\bin\Release\net10.0-windows\Grimoire.exe")
Add-Exists "desktop dll" (Join-Path $Root "desktop\bin\Release\net10.0-windows\Grimoire.dll")
Add-Exists "desktop wwwroot" (Join-Path $Root "desktop\bin\Release\net10.0-windows\wwwroot\index.html")
Add-Line

$VenvPython = Join-Path $Backend ".venv\Scripts\python.exe"
if (Test-Path $VenvPython) {
    Add-Command "Backend Import Check" $VenvPython @("-c", "import main; print('OK import backend main')") $Backend
    Add-Command "Backend Compile Check" $VenvPython @("-m", "py_compile", "main.py", "services\ean_renamer\models.py", "services\ean_renamer\services\batch_renamer.py") $Backend
} else {
    Add-Line "[Backend Checks]"
    Add-Line "SKIP: backend venv missing"
    Add-Line
}

if ((Test-Path (Join-Path $Frontend "package.json")) -and (Test-Path (Join-Path $Frontend "node_modules"))) {
    Add-Command "Frontend Build Check" "npm.cmd" @("run", "build") $Frontend
} else {
    Add-Line "[Frontend Build Check]"
    Add-Line "SKIP: frontend dependencies missing"
    Add-Line
}

Add-Line "[Ports]"
try {
    $ports = Get-NetTCPConnection -LocalPort 7788,5173 -ErrorAction SilentlyContinue |
        Select-Object LocalAddress, LocalPort, State, OwningProcess
    if ($ports) {
        $ports | Format-Table -AutoSize | Out-String | ForEach-Object { Add-Line $_.TrimEnd() }
    } else {
        Add-Line "No listeners found on 7788 or 5173."
    }
} catch {
    netstat -ano | Select-String ":7788 |:5173 " | ForEach-Object { Add-Line $_.Line }
}
Add-Line

Add-Line "[Recent Release Files]"
Get-Item -ErrorAction SilentlyContinue `
    (Join-Path $Root "desktop\bin\Release\net10.0-windows\Grimoire.exe"),
    (Join-Path $Root "desktop\bin\Release\net10.0-windows\Grimoire.dll"),
    (Join-Path $Root "desktop\bin\Release\net10.0-windows\wwwroot\index.html") |
    Select-Object FullName, LastWriteTime, Length |
    Format-Table -AutoSize |
    Out-String |
    ForEach-Object { Add-Line $_.TrimEnd() }

Get-ChildItem -ErrorAction SilentlyContinue (Join-Path $Root "desktop\bin\Release\net10.0-windows\wwwroot\assets\index-*.js") |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 5 FullName, LastWriteTime, Length |
    Format-Table -AutoSize |
    Out-String |
    ForEach-Object { Add-Line $_.TrimEnd() }

Write-Host "Diagnostic complete."
Write-Host "Report: $Report"
Write-Host
Get-Content $Report
