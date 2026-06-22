@echo off
setlocal
title GRIMOIRE - Diagnose

set "ROOT=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%ROOT%DIAGNOSE_GRIMOIRE.ps1"
pause
