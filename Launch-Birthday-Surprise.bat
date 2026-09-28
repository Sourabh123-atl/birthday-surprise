@echo off
title Birthday Surprise for Best Friend - Sourabh
echo ========================================================
echo   Launching Birthday Surprise Website for Best Friend
echo ========================================================
echo.
cd /d "%~dp0"
start "" "http://localhost:8080"
if errorlevel 1 (
    start "" index.html
)
exit
