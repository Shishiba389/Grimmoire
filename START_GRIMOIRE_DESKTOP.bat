@echo off
title GRIMOIRE — Desktop
echo ============================================
echo   GRIMOIRE — Desktop Mode
echo ============================================
echo.

cd /d "%~dp0"

:: ── Check venv ──
if not exist "backend\.venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found. Run SETUP_GRIMOIRE.bat first.
    pause
    exit /b 1
)

:: ── Launch desktop app ──
echo Starting GRIMOIRE desktop app...
backend\.venv\Scripts\python desktop_app.py %*
