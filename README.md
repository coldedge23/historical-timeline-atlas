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

## 多電腦工作指南

GitHub（`coldedge23/historical-timeline-atlas`）是唯一正本，每台電腦都只是工作副本。同步靠 git，不靠 Google 雲端硬碟。

### 新電腦第一次設定（只做一次）

1. 安裝 Node.js 20 以上與 Git。
2. 下載專案到本機磁碟（不要放在雲端硬碟）：
   ```powershell
   git clone https://github.com/coldedge23/historical-timeline-atlas.git C:\dev\historical-timeline-atlas
   ```
3. 安裝套件並確認能建置：
   ```powershell
   cd C:\dev\historical-timeline-atlas
   npm ci
   npm run build
   npm test
   ```
4. 第一次 push 時 Git 會要求登入 GitHub，請用 **`coldedge23`** 帳號。用其他帳號會沒有權限，GitHub 設定頁也會顯示 404。

### 每次工作的固定流程

| 時機 | 做什麼 | 指令 |
|---|---|---|
| 開始前 | 取得另一台電腦的最新修改 | `git pull` |
| 改完後 | 確認沒壞 | `npm run build`、`npm test`、`npm run validate:data` |
| 確認後 | 存檔並上傳 | `git add -A`、`git commit -m "說明"`、`git push` |
| push 之後 | 不用做任何事 | GitHub Actions 自動建置，約 1–2 分鐘後網站更新 |

離開一台電腦前一定要 push；換到另一台開始前一定要 pull。兩台都改了同一個檔案卻沒同步，會產生衝突，需要手動合併。

### 新增歷史資料

- 華夏各時期：`src/data/periods/<時期>/`（三國在 `src/data/threeKingdoms/`），內含 `events.js`、`figures.js`、`battles.js` 等。
- 臺灣：`src/data/taiwanLensData.js`；日本：`src/data/japan/`。
- 圖片放 `images/`。
- 改完必跑 `npm test`。連結、年代、圖片與地圖座標檢查會在上線前擋下格式錯誤的資料；測試沒過時 Actions 不會發布，網站維持上一版。
- 使用 AI 工具（Claude Code、Codex、Antigravity）時，它們會先讀 `AGENTS.md`，依其中的資料格式與資料誠信規則工作。換工具前先 commit。

### 安全網

- 改壞了：網站不會更新，修正後再 push 即可。
- 退回某一版：每次 commit 都是還原點，可用 `git log` 查看後還原。
- 備份：GitHub 即完整備份；`backup.bat` 產生的 zip 可另外放到雲端硬碟。
- Google 雲端硬碟上的舊專案資料夾不是正式版本，不要在那裡修改或執行 git。

## 建置與發布

唯一建置入口為 `build.cjs`，使用專案鎖定的 esbuild、Tailwind 3、PostCSS 與 Autoprefixer。`build.js` 是相容轉接入口；舊 Vite 設定不參與建置。

- `index.html` 為建置模板；瀏覽請使用 `npm run preview`，不要直接開模板。
- `src/main.js` 匯入 `src/index.css` 與 `src/interface.css`；樣式在建置時完整產生，不使用 Tailwind CDN 或遠端字型。
- `dist/index.html`、`dist/assets/`、`dist/images/` 為可獨立部署的完整輸出。JS 採 ESM 分包，JS/CSS 使用內容雜湊名稱，勿手改版本編號。
- 正式發布：push 到 `master` 後，GitHub Actions（`.github/workflows/pages.yml`）會執行 `npm ci`、建置、測試、發布檢查，再把 `dist` 發布到 GitHub Pages。`dist/` 不納入版本控制。
- `vercel.json` 保留 Vercel 設定，但目前未使用 Vercel 部署。
- HTML 與圖片不長期快取；只有內容雜湊 JS/CSS 採 immutable 快取。
- 建置不自動刪除舊資產，避免開啟中的頁面失去分包；正式發布建議以全新的 dist artifact 取代整包舊部署。

## 驗證

```powershell
npm run build
npm run verify
npm test
```

發布驗證檢查入口、預編譯 CSS、雜湊資產與本地圖片，並檢查體積上限（以壓縮後大小計）：最大 JS 檔不超過 1,000 KB、JS+CSS 總量不超過 1,500 KB。2026-10-30 基準為 788 KB 與 1,140 KB。超過上限時建置不會發布；應改為按時期拆分資料載入，而不是調高上限。

建置也會在 `dist/data/` 產出總目錄 `catalog.json`、搜尋索引與各時期資料包，瀏覽器依需要下載（切到未載入的時期時短暫顯示載入中；失敗時可重試）。過渡期可在網址加 `?data=legacy` 改用舊做法。`npm run verify` 檢查每個資料包可解析、版本一致、所有關聯目標都找得到，並檢查壓縮後上限：最大資料包 600 KB、總目錄 60 KB、搜尋索引 650 KB、程式與資料總量 3,600 KB（2026-10-31 Ivan 核准；總量為 2b 過渡期數值，階段 4 重訂；首次載入上限 800 KB，以瀏覽器實際請求量測，自動檢查待階段 4）。2026-10-31 實測（2b-②）為三國 451 KB、33 KB、474 KB、3,417 KB，首次載入最壞情況 618 KB（三國地圖頁）、預設首頁 238 KB，見 `docs/20261031_資料包體積實測_v2.md`。CI 全新建置時，`dist/data` 不得有總目錄未列出的檔案；本機建置只提出警告。

測試涵蓋發布完整性、預覽伺服器路徑限制、快取、HEAD 與拒絕寫入，以及資料模型測試。既有 `scripts/verify_complete_atlas.cjs` 保留為歷史稽核工具，其舊版 bundle 假設不代表目前正式流程。

## 檔案結構

- `src/app.js`：狀態與導覽協調。
- `src/civilizations/`：文明註冊清單與各文明設定（華夏、臺灣、日本）；主程式只透過這裡判斷文明。
- `src/store/`：資料存取模組（總目錄、資料包、搜尋索引）。
- `src/components/`：地圖、年表、人物／戰役頁與彈窗。
- `src/data/`：時期、文明、事件、人物、戰役與統一模型。
- `images/`：本地圖像資產。
- `scripts/`：資料生成、維護、稽核及備份工具；不要把歷史生成腳本當作日常更新入口。
- `_backups/`：本機備份，不包含於正式發布。

歷史推測、人物能力與示意疆域應以介面標示及資料來源註記解讀；沒有逐筆查核的內容不應視為學術定論。新工作請先閱讀專案交接文件（`docs/20261031_專案總結與交接手冊_v10.md`）與 `AGENTS.md`，並以現行程式與此 README 的命令為準。


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
