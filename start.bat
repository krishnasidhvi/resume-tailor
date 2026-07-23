@echo off
echo Starting Resume Tailor...

echo Checking for agy...
agy --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: agy CLI is not installed or not in PATH!
    echo Please install agy to use the AI features.
)

start cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload --port 8000"
start cmd /k "cd frontend && npm run dev"

echo Backend running on http://localhost:8000
echo Frontend running on http://localhost:3000
echo.
echo Application will open in your browser shortly...
timeout /t 3 >nul
start http://localhost:3000
