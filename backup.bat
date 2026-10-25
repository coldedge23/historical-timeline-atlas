@echo off
chcp 65001 >nul
title 歷史星圖專案 - 一鍵全量備份
echo.
echo ========================================================
echo  歷史星圖 (Historical Atlas) 一鍵備份精靈
echo ========================================================
echo.
node scripts\backup_project.cjs
echo.
pause
