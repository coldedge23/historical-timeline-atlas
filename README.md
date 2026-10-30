# 歷史星圖

以地圖、時間軸、人物與戰役探索華夏、臺灣及日本歷史的純前端網站。保留古紙地圖與深色閱讀介面；本機資料不需要後端帳號。

## 安裝與啟動

需求：Node.js 20 以上與 npm。在專案資料夾執行：

```powershell
npm ci
npm run build
npm run preview
```

開啟 http://127.0.0.1:8080/。關閉終端機或按 Ctrl+C 停止。`start_server.bat` 會先建置再預覽；首次使用仍須先 `npm ci`。`npm run dev` 同樣先建置再啟動，修改後請重新建置，沒有熱更新。

Google Drive 等同步磁碟若出現 npm TAR_ENTRY_ERROR，建議將專案複製到一般本機磁碟後執行 `npm ci`。進階環境可將相同 package.json/package-lock.json 放在本機暫存目錄執行 `npm ci`，將 `ATLAS_NODE_MODULES` 設為該目錄的 node_modules，再執行 `npm run build`；預設不依賴任何個人電腦絕對路徑。

## 建置與發布

唯一建置入口為 `build.cjs`，使用專案鎖定的 esbuild、Tailwind 3、PostCSS 與 Autoprefixer。`build.js` 是相容轉接入口；舊 Vite 設定不參與建置。

- `index.html` 為建置模板；瀏覽請使用 `npm run preview`，不要直接開模板。
- `src/main.js` 匯入 `src/index.css` 與 `src/interface.css`；樣式在建置時完整產生，不使用 Tailwind CDN 或遠端字型。
- `dist/index.html`、`dist/assets/`、`dist/images/` 為可獨立部署的完整輸出。JS 採 ESM 分包，JS/CSS 使用內容雜湊名稱，勿手改版本編號。
- 發布時上傳 **dist 內的內容**。Vercel 已設定 buildCommand 與 outputDirectory。GitHub Pages 可將 dist 內容作為 Pages artifact 發布；`.nojekyll` 已產生。
- HTML 與圖片不長期快取；只有內容雜湊 JS/CSS 採 immutable 快取。
- 建置不自動刪除舊資產，避免開啟中的頁面失去分包；正式發布建議以全新的 dist artifact 取代整包舊部署。

## 驗證

```powershell
npm run build
npm run verify
npm test
```

發布驗證檢查入口、預編譯 CSS、雜湊資產與本地圖片。測試涵蓋發布完整性、預覽伺服器路徑限制、快取、HEAD 與拒絕寫入，以及資料模型測試。既有 `scripts/verify_complete_atlas.cjs` 保留為歷史稽核工具，其舊版 bundle 假設不代表目前正式流程。

## 檔案結構

- `src/app.js`：狀態與導覽協調。
- `src/components/`：地圖、年表、人物／戰役頁與彈窗。
- `src/data/`：時期、文明、事件、人物、戰役與統一模型。
- `images/`：本地圖像資產。
- `scripts/`：資料生成、維護、稽核及備份工具；不要把歷史生成腳本當作日常更新入口。
- `_backups/`：本機備份，不包含於正式發布。

歷史推測、人物能力與示意疆域應以介面標示及資料來源註記解讀；沒有逐筆查核的內容不應視為學術定論。新工作請先閱讀專案交接文件，並以現行程式與此 README 的命令為準。


## 連結修復與原始資料稽核（2026-10-30）

應用透過 `linkedHistoryCatalog.js` 與 `historyLinkGraph.js` 使用同一份有效連結資料，卡片計數及詳情清單共用解析規則。校正只依明確白名單，不做拼音模糊配對；原始資料模組不變，失效參照保存在 `originalLinkIds`／`pendingLinks`，未確認項目不算進有效連結。畫面會顯示待確認筆數。

```powershell
npm run validate:data                             # 原始資料稽核，仍可能FAIL
node scripts/validate_history_data.mjs --effective # 套校正與待確認隔離後的有效連結稽核
node scripts/validate_history_data.mjs --effective --json
```

本輪原174項失效人物／事件引用中97項已確認修復、77項待確認；另33項人物關係待確認。有效連結沒有失效引用，不代表來源、年代及史實全數通過。逐筆明細與限制見 `docs/20261030_連結修復紀錄.md`。


## 年代及來源核對

`node scripts/validate_history_data.mjs --runtime` 檢查實際渲染資料，包含正規化自動補入的關聯，不能和只讀原始資料的報告直接比較。年代外關聯保留在「背景與年代待考」；多年度部分重疊不再當成單點矛盾。文字來源顯示核對範圍，書名／URL不代表整筆已查證，也不代表圖像授權。

詳見 `docs/20261030_年代與來源分流紀錄.md`。人物圖像維持禁止重新抓取光榮圖庫的限制；備份同雜湊且來源未能確認的現用圖片暫以姓名占位，原圖只留本地，不進發布包。不要執行封存的光榮下載腳本。
