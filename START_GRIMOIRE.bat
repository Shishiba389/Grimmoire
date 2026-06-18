@echo off
setlocal
title GRIMOIRE

set "ROOT=%~dp0"
set "BACKEND_PORT=7788"
set "FRONTEND_PORT=5173"

echo ============================================
echo   GRIMOIRE - Dev Server
echo ============================================
echo.

cd /d "%ROOT%backend"
if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] Python virtual environment not found.
    echo Run SETUP_GRIMOIRE.bat first.
    pause
    exit /b 1
)

echo [1/2] Starting backend on port %BACKEND_PORT%...
start "GRIMOIRE Backend" /min cmd /c ".venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port %BACKEND_PORT%"

:wait_backend
timeout /t 1 /nobreak >nul
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { (Invoke-WebRequest http://127.0.0.1:%BACKEND_PORT%/health -UseBasicParsing -TimeoutSec 2).StatusCode } catch { exit 1 }" >nul 2>&1
if errorlevel 1 goto wait_backend
echo [OK] Backend ready

cd /d "%ROOT%frontend"
if exist "package.json" (
    echo [2/2] Starting frontend dev server on port %FRONTEND_PORT%...
    start "GRIMOIRE Frontend" cmd /c "npm.cmd run dev -- --host 127.0.0.1 --port %FRONTEND_PORT%"
    timeout /t 3 /nobreak >nul
    echo [OK] Frontend starting
    echo.
    echo Backend API:  http://127.0.0.1:%BACKEND_PORT%
    echo API Docs:     http://127.0.0.1:%BACKEND_PORT%/docs
    echo Frontend:     http://127.0.0.1:%FRONTEND_PORT%
    start "" "http://127.0.0.1:%FRONTEND_PORT%"
) else (
    echo [2/2] Frontend folder missing. Opening API docs.
    start "" "http://127.0.0.1:%BACKEND_PORT%/docs"
)

echo.
echo Press any key to stop GRIMOIRE dev servers...
pause >nul

taskkill /fi "windowtitle eq GRIMOIRE Backend*" /f >nul 2>&1
taskkill /fi "windowtitle eq GRIMOIRE Frontend*" /f >nul 2>&1
echo [GRIMOIRE] Stopped.
