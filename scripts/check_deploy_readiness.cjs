const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'build-manifest.json'), 'utf8'));
assert(!/cdn\.tailwindcss\.com|fonts\.googleapis\.com/.test(html), '發布入口不得依賴外部樣式 CDN');
assert(html.includes('type="module"'), '入口必須支援 ESM 延遲分包');
for (const asset of manifest.assets) {
  assert(!asset.includes('..'), '資產路徑不得向外跳脫');
  assert(fs.statSync(path.join(dist, asset)).size > 0, `缺少資產 ${asset}`);
}
const cssAsset = manifest.assets.find((asset) => asset.endsWith('.css'));
const css = fs.readFileSync(path.join(dist, cssAsset), 'utf8');
assert(!css.includes('@tailwind'), 'CSS 必須預先編譯');
assert(css.includes('.text-amber-200'), '缺少既有主題 utility');
assert(css.includes('prefers-reduced-motion'), '缺少減少動態樣式');
assert(fs.existsSync(path.join(dist, 'images')), '發布目錄缺少圖片');
console.log(`程式資產驗證通過：${manifest.assets.length} 個資產，JS ${(manifest.jsBytes / 1024).toFixed(1)} KB，CSS ${(manifest.cssBytes / 1024).toFixed(1)} KB。`);

// Size budget, measured gzip-compressed as GitHub Pages serves it.
// 2026-10-30 baseline: largest JS 782 KB, all JS+CSS 1,136 KB.
// Exceeding a limit means it is time to split data by period, not to raise the limit.
const BUDGET_KB = { largestJs: 1000, total: 1500 };
const zlib = require('node:zlib');
const gzipKb = (asset) => zlib.gzipSync(fs.readFileSync(path.join(dist, asset))).length / 1024;
const sizes = manifest.assets.filter((asset) => /\.(js|css)$/.test(asset)).map((asset) => ({ asset, kb: gzipKb(asset) }));
const largest = sizes.filter(({ asset }) => asset.endsWith('.js')).sort((a, b) => b.kb - a.kb)[0];
const totalKb = sizes.reduce((sum, { kb }) => sum + kb, 0);
const usage = (kb, limit) => `${kb.toFixed(0)} / ${limit} KB（${((kb / limit) * 100).toFixed(1)}%）`;
assert(largest.kb <= BUDGET_KB.largestJs, `最大 JS 檔超過體積上限：${largest.asset} ${usage(largest.kb, BUDGET_KB.largestJs)}。請考慮按時期拆分資料。`);
assert(totalKb <= BUDGET_KB.total, `JS+CSS 總量超過體積上限：${usage(totalKb, BUDGET_KB.total)}。請考慮按時期拆分資料。`);
console.log(`體積上限檢查通過（壓縮後）：最大 JS ${usage(largest.kb, BUDGET_KB.largestJs)}；總量 ${usage(totalKb, BUDGET_KB.total)}。`);

// Data pack limits (plan v2 section 3.9, approved by Ivan 2026-10-31; see docs/20261031_資料包體積實測.md).
// B largest pack, C catalog, D search index, E all code and structured data. E is the 2b transition value
// (old inline data still in the bundle) and is reset in stage 4. A (first load) is set after 2b measures it in a browser.
// Exceeding a limit means slimming or splitting the data, not raising the limit.
const DATA_BUDGET_KB = { largestPack: 600, catalog: 60, searchIndex: 650, all: 3600 };
const data = require('./check_data_packs.cjs').checkDataPacks(dist, manifest);
const packKb = Object.values(data.sizes.packs);
const largestPack = Object.entries(data.sizes.packs).sort((a, b) => b[1] - a[1])[0];
const allKb = totalKb + data.sizes.catalog + data.sizes.searchIndex + packKb.reduce((sum, kb) => sum + kb, 0);
console.log(`資料包驗證通過：${packKb.length} 個資料包、${data.linkCount} 筆關聯目標全部找得到；schemaVersion ${data.catalog.schemaVersion}。`);
assert(largestPack[1] <= DATA_BUDGET_KB.largestPack, `最大資料包超過上限（B）：${largestPack[0]} ${usage(largestPack[1], DATA_BUDGET_KB.largestPack)}。請先移除用不到的欄位或拆分資料包。`);
assert(data.sizes.catalog <= DATA_BUDGET_KB.catalog, `總目錄超過上限（C）：${usage(data.sizes.catalog, DATA_BUDGET_KB.catalog)}。`);
assert(data.sizes.searchIndex <= DATA_BUDGET_KB.searchIndex, `搜尋索引超過上限（D）：${usage(data.sizes.searchIndex, DATA_BUDGET_KB.searchIndex)}。請考慮按文明拆開。`);
assert(allKb <= DATA_BUDGET_KB.all, `程式與資料總量超過上限（E）：${usage(allKb, DATA_BUDGET_KB.all)}。`);
console.log(`資料包體積上限檢查通過（壓縮後）：最大資料包 ${largestPack[0]} ${usage(largestPack[1], DATA_BUDGET_KB.largestPack)}；總目錄 ${usage(data.sizes.catalog, DATA_BUDGET_KB.catalog)}；搜尋索引 ${usage(data.sizes.searchIndex, DATA_BUDGET_KB.searchIndex)}；程式與資料總量 ${usage(allKb, DATA_BUDGET_KB.all)}。`);
if (data.leftovers.length) console.warn(`警告：dist/data 有 ${data.leftovers.length} 個總目錄未列出的舊檔案（本機建置不自動刪除；CI 全新建置時視為錯誤）。`);

require('./image_asset_policy.cjs').verifyImageAssets(root).then(result=>console.log("圖像程式資產驗證通過：" + result.images + "張實際引用圖；排除已知備份SHA256。來源及授權仍須逐圖核對。")).catch(error=>{console.error(error.message);process.exitCode=1;});


