@echo off
setlocal
title GRIMOIRE - Build Desktop App
echo ============================================
echo   GRIMOIRE Desktop Build
echo ============================================
echo.

set "ROOT=%~dp0"
set "DOTNET=dotnet"
if exist "%ProgramFiles%\dotnet\dotnet.exe" set "DOTNET=%ProgramFiles%\dotnet\dotnet.exe"

:: Build frontend
echo [1/3] Building frontend...
cd /d "%ROOT%frontend"
call npm.cmd run build
if errorlevel 1 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
echo Frontend built successfully.
echo.

:: Build desktop app
echo [2/3] Building desktop app...
"%DOTNET%" build "%ROOT%desktop\Grimoire.Desktop.csproj" -c Release -t:Rebuild
if errorlevel 1 (
    echo ERROR: Desktop build failed!
    pause
    exit /b 1
)
echo Desktop app built successfully.
echo.

:: Show output
echo [3/3] Build complete!
echo.
echo Output: %ROOT%desktop\bin\Release\net10.0-windows\Grimoire.exe
echo.
echo To create a self-contained package (no .NET required):
echo   dotnet publish desktop\Grimoire.Desktop.csproj -c Release -r win-x64 --self-contained
echo.
pause
