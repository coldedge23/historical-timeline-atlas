@echo off
chcp 65001 >nul
echo 正在編譯打包歷史星圖應用程式...
node "%~dp0build.cjs"
if %errorlevel% equ 0 (
  echo 編譯打包完成！dist/bundle.js 已成功生成。
) else (
  echo 編譯失敗，請檢查錯誤訊息。
)
pause
