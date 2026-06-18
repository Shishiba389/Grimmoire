@echo off
setlocal
echo Stopping GRIMOIRE servers...

taskkill /fi "windowtitle eq GRIMOIRE Backend*" /f >nul 2>&1
taskkill /fi "windowtitle eq GRIMOIRE Frontend*" /f >nul 2>&1

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ports = 7788,5173; Get-NetTCPConnection -LocalPort $ports -State Listen -ErrorAction SilentlyContinue | Where-Object { $_.OwningProcess -gt 0 } | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo Done.
