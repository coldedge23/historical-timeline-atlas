const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const backupDir = path.join(projectRoot, '_backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Generate date stamp: YYYYMMDD_HHmm
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
const zipName = `歷史星圖_完整備份_${stamp}.zip`;
const targetZip = path.join(backupDir, zipName);

console.log('====================================================');
console.log('📦 歷史星圖專案 (Historical Timeline Atlas) 全自動備份');
console.log('====================================================');
console.log(`📁 專案根目錄: ${projectRoot}`);
console.log(`🎯 備份目標檔案: ${targetZip}`);

// Items to include in archive
const itemsToInclude = [
  'src',
  'images',
  'dist/bundle.js',
  'dist/bundle_v48.js',
  'scripts',
  'index.html',
  'server.cjs',
  'build.cjs',
  'build.bat',
  'start_server.bat',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'README.md',
  '.gitignore'
].filter((item) => fs.existsSync(path.join(projectRoot, item)));

console.log(`📋 納入備份之核心目錄與檔案 (${itemsToInclude.length} 項):`);
itemsToInclude.forEach((it) => console.log(`   - ${it}`));

console.log('\n⏳ 正在建立壓縮檔案中，請稍候...');

try {
  // Use Windows built-in bsdtar for ultra-fast and reliable zip compression
  const tarItems = itemsToInclude.map((i) => `"${i}"`).join(' ');
  const tarCmd = `tar -a -c -f "${targetZip}" ${tarItems}`;
  execSync(tarCmd, { cwd: projectRoot, stdio: 'inherit' });

  const stat = fs.statSync(targetZip);
  const sizeMb = (stat.size / 1024 / 1024).toFixed(2);
  console.log('\n====================================================');
  console.log('✅ 備份建立成功！');
  console.log(`📦 備份檔名: ${zipName}`);
  console.log(`💾 檔案大小: ${sizeMb} MB`);
  console.log(`📂 存放路徑: ${targetZip}`);
  console.log('====================================================');

  // List all existing backups
  const allBackups = fs.readdirSync(backupDir).filter((f) => f.endsWith('.zip'));
  console.log(`\n📚 目前 _backups/ 目錄共有 ${allBackups.length} 個備份快照：`);
  allBackups.forEach((b) => {
    const s = fs.statSync(path.join(backupDir, b));
    console.log(`   - ${b} (${(s.size / 1024 / 1024).toFixed(2)} MB, ${s.mtime.toLocaleString()})`);
  });
} catch (err) {
  console.error('❌ 備份失敗:', err.message);
  process.exit(1);
}
