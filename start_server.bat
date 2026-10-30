@echo off
chcp 65001 >nul
pushd "%~dp0"
call npm run build
if errorlevel 1 (pause & popd & exit /b 1)
echo 請開啟 http://127.0.0.1:8080 ，按 Ctrl+C 停止。
call npm run preview
popd
