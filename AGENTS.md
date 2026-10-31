# 歷史星圖：AI 協作規則

本檔是所有 AI 工具（Claude Code、Codex、Antigravity／agy）的共用規則。動手前先讀本檔、`README.md`、`DESIGN.md`。規則與程式現況衝突時，以程式現況為準，並回報差異。

## 工作位置

- 正式工作目錄：`C:\dev\historical-timeline-atlas`（本機磁碟）。
- 不要在 Google 雲端硬碟的舊副本上執行 git 或 `npm ci`；同步會留下 `.git/index.lock` 並損壞 `node_modules`。
- 雲端硬碟只放 `backup.bat` 產生的備份 zip。

## 交接規則

1. 換工具前先 commit。下一個工具從乾淨的 `git status` 開始。
2. 不要同時讓兩個工具修改同一個資料夾。
3. commit 訊息寫清楚做了什麼；一次只做一件事。
4. 不要 `git add` 個別檔案以外的大量刪除；`git status` 出現大量 `D` 時先停下來確認。

## 唯一入口

| 用途 | 指令 |
|---|---|
| 安裝 | `npm ci` |
| 建置 | `npm run build`（入口 `build.cjs`，esbuild + Tailwind 3） |
| 預覽 | `npm run preview`（http://127.0.0.1:8080/） |
| 測試 | `npm test` |
| 發布檢查 | `npm run verify` |
| 資料稽核 | `npm run validate:data` |

- 不使用 Vite、Tailwind CDN、手動編號的 bundle（例如 `bundle_v69.js`）。
- 根目錄 `index.html` 是建置模板，不能直接開啟；可瀏覽的頁面在 `dist/`。
- 部署：push 到 `master` 由 GitHub Actions 自動建置並發布到 GitHub Pages。`dist/` 已列入 `.gitignore`，不要 commit。
- push 前在本機跑過 `npm run build`、`npm test`、`npm run verify`；Actions 任一步失敗就不會發布。
- `npm run verify` 含體積上限（壓縮後最大 JS 1,000 KB、總量 1,500 KB）。超標時不要調高上限，先回報並提出按時期拆分資料的方案。
- 資料包上限（壓縮後，2026-10-31 Ivan 核准）：最大資料包 600 KB、總目錄 60 KB、搜尋索引 650 KB、程式與資料總量 3,600 KB（2b 過渡期數值，階段 4 重訂）。首次載入上限待 2b 實測後設定。超標時先瘦身或拆分資料，不調高上限。依據 `docs/20261031_資料包體積實測.md`。

## 程式與資料

- 資料正本是 `src/data/**/*.js`。不要新增同名 `.ts` 資料檔。
- `src/types/history.ts` 只作為資料結構說明，不參與建置。
- 元件取歷史資料一律經 `src/store/historyStore.js`（非同步：總目錄、頁面、搜尋索引、關聯描述），不要在元件裡直接 import `src/data/`。只有 `src/store/legacySource.js` 可引入資料正本；元件允許的設定與地理資料引用列在 `tests/history-store.test.js`，主入口不得含資料正本或地理資料（`tests/bundle-boundary.test.js`）。
- 瀏覽器預設下載 `dist/data/` 的資料包；網址加 `?data=legacy` 改用 2a 舊做法（獨立分包，2b 過渡期回退開關，階段 4 移除）。
- 依名稱、摘要文字比對或反推而來的關聯（`derived: true`）在介面上加「程式推導」標示（`DerivedBadge`）。
- import 一律寫明 `.js`／`.jsx` 副檔名。
- 一次性腳本放 `scripts/`，用完移到 `scripts/archive/`；不要留在根目錄。
- 樣式：介面規則在 `src/interface.css`，依 `DESIGN.md` 保留古紙地圖與深色金銅視覺。

## 資料誠信

- 不編造年代、人物、兵力、來源。不確定的值標示「待考」或「待確認」。
- 不以拼音模糊比對自動修正連結；校正只走明確白名單（見 `README.md`）。
- 不改寫歷史來源原文或地理資料來配合視覺。

## 產出

- 報告與稽核結果放 `docs/`，檔名 `YYYYMMDD_主題.副檔名`。
- 回覆與文件使用繁體中文。
