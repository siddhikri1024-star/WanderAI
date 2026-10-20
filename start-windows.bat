@echo off
title WanderAI Travel Planner
cd /d "%~dp0"
if not exist node_modules (
  echo Installing project packages for first run...
  call npm install
  if errorlevel 1 (
    echo.
    echo Install failed. Check your internet connection and Node.js installation.
    pause
    exit /b 1
  )
)
echo Starting WanderAI. Keep this window open while using the website.
call npm run dev:full
pause
