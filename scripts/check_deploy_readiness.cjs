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

require('./image_asset_policy.cjs').verifyImageAssets(root).then(result=>console.log("圖像程式資產驗證通過：" + result.images + "張實際引用圖；排除已知備份SHA256。來源及授權仍須逐圖核對。")).catch(error=>{console.error(error.message);process.exitCode=1;});


