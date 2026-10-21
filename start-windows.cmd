@echo off
cd /d "%~dp0"
where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Install Node.js and npm first.
  pause
  exit /b 1
)
if not exist "node_modules\react-scripts\bin\react-scripts.js" goto install
if not exist "node_modules\lucide-react\package.json" goto install
if not exist "node_modules\d3-geo\package.json" goto install
goto start
:install
call npm.cmd ci
if errorlevel 1 (
  pause
  exit /b 1
)
:start
call npm.cmd start
pause
