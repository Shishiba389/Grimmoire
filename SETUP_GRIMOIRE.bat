@echo off
setlocal
title GRIMOIRE - Setup

set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"

echo ============================================
echo   GRIMOIRE - First-Time Setup
echo ============================================
echo Root: %ROOT%
echo.

python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not on PATH.
    echo Install Python 3.11+ from https://python.org
    pause
    exit /b 1
)
echo [OK] Python found

node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not on PATH.
    echo Install Node.js 20+ from https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js found

call npm.cmd --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not available. Reinstall Node.js with npm enabled.
    pause
    exit /b 1
)
echo [OK] npm found

echo.
echo [1/5] Preparing Python virtual environment...
cd /d "%BACKEND%"
if not exist ".venv\Scripts\python.exe" (
    python -m venv .venv
    if errorlevel 1 (
        echo [ERROR] Could not create backend\.venv.
        pause
        exit /b 1
    )
)
echo [OK] Virtual environment ready

echo.
echo [2/5] Installing Python dependencies...
".venv\Scripts\python.exe" -m pip install --upgrade pip
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Python dependency install failed.
    pause
    exit /b 1
)
echo [OK] Python dependencies installed

echo.
echo [3/5] Installing backend Node dependencies...
if exist "%BACKEND%\package.json" (
    cd /d "%BACKEND%"
    call npm.cmd install
    if errorlevel 1 (
        echo [ERROR] Backend npm install failed.
        pause
        exit /b 1
    )
    echo [OK] Backend Node dependencies installed
) else (
    echo [SKIP] No backend package.json found
)

echo.
echo [4/5] Installing frontend Node dependencies...
if exist "%FRONTEND%\package.json" (
    cd /d "%FRONTEND%"
    call npm.cmd install
    if errorlevel 1 (
        echo [ERROR] Frontend npm install failed.
        pause
        exit /b 1
    )
    echo [OK] Frontend dependencies installed
) else (
    echo [SKIP] No frontend package.json found
)

echo.
echo [5/5] Creating runtime folders...
cd /d "%BACKEND%"
if not exist "storage" mkdir "storage"
if not exist "storage\uploads" mkdir "storage\uploads"
if not exist "storage\outputs" mkdir "storage\outputs"
if not exist "storage\rules" mkdir "storage\rules"
echo [OK] Storage folders ready

echo.
echo ============================================
echo   Setup complete
echo ============================================
echo Run START_DESKTOP.bat for the desktop app.
echo Run START_GRIMOIRE.bat for the browser dev server.
pause
