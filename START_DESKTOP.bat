@echo off
setlocal
title GRIMOIRE Desktop
echo Starting GRIMOIRE Desktop App...
set "ROOT=%~dp0"
set "EXE=%ROOT%desktop\bin\Release\net10.0-windows\Grimoire.exe"
if not exist "%EXE%" (
    echo [ERROR] Desktop executable not found:
    echo         %EXE%
    echo.
    echo Run BUILD_DESKTOP.bat first.
    pause
    exit /b 1
)
start "" "%EXE%"
