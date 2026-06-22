@echo off
setlocal
title GRIMOIRE - Repair

set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"
set "DOTNET=dotnet"
if exist "%ProgramFiles%\dotnet\dotnet.exe" set "DOTNET=%ProgramFiles%\dotnet\dotnet.exe"

echo ============================================
echo   GRIMOIRE - Repair
echo ============================================
echo Root: %ROOT%
echo.

echo [1/7] Checking Python and Node...
python --version || goto fail
node --version || goto fail
call npm.cmd --version || goto fail

echo.
echo [2/7] Recreating missing Python venv if needed...
cd /d "%BACKEND%"
if not exist ".venv\Scripts\python.exe" (
    python -m venv .venv || goto fail
)

echo.
echo [3/7] Repairing Python dependencies...
".venv\Scripts\python.exe" -m pip install --upgrade pip || goto fail
".venv\Scripts\python.exe" -m pip install -r requirements.txt || goto fail

echo.
echo [4/7] Repairing backend Node dependencies...
if exist "%BACKEND%\package.json" (
    cd /d "%BACKEND%"
    call npm.cmd install || goto fail
)

echo.
echo [5/7] Repairing frontend Node dependencies...
if exist "%FRONTEND%\package.json" (
    cd /d "%FRONTEND%"
    call npm.cmd install || goto fail
)

echo.
echo [6/7] Rebuilding frontend...
if exist "%FRONTEND%\package.json" (
    cd /d "%FRONTEND%"
    call npm.cmd run build || goto fail
)

echo.
echo [7/7] Rebuilding desktop app when .NET is available...
cd /d "%ROOT%"
"%DOTNET%" --version >nul 2>&1
if errorlevel 1 (
    echo [WARN] .NET SDK not found. Skipping desktop rebuild.
) else (
    "%DOTNET%" build "%ROOT%desktop\Grimoire.Desktop.csproj" -c Release -t:Rebuild || goto fail
)

echo.
echo ============================================
echo   Repair complete
echo ============================================
pause
exit /b 0

:fail
echo.
echo [ERROR] Repair failed. Run DIAGNOSE_GRIMOIRE.bat and send the report.
pause
exit /b 1
