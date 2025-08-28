@echo off

:: Run script with administrator priveleges.
net session >nul 2>&1
if %errorLevel% neq 0 (
    powershell -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File ""%~dp0script\install\main.ps1""' -Verb RunAs"
)
