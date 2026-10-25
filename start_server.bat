@echo off
chcp 65001 >nul
echo ========================================================
echo  歷史星圖 | 華夏與臺灣歷史時空總覽
echo  正在啟動本地 Web 伺服器...
echo ========================================================
echo.
echo 請在瀏覽器訪問: http://localhost:8080
echo (按下 Ctrl + C 可關閉伺服器)
echo.

start "" "http://localhost:8080"
python -m http.server 8080
pause
