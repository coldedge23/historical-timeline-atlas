@echo off
chcp 65001 >nul
pushd "%~dp0"
call npm run build
if errorlevel 1 (echo 建置失敗。) else (echo 建置完成，dist 為完整發布資料夾。)
popd
pause
