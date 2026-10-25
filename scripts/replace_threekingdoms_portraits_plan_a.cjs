const fs = require('fs');
const path = require('path');
const https = require('https');

const figuresDataPath = path.resolve(__dirname, '..', 'src', 'data', 'threeKingdoms', 'figures.js');
const imagesDir = path.resolve(__dirname, '..', 'images', 'figures');
const backupDir = path.resolve(__dirname, '..', 'images', 'archive_koei_backup');

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

// Read Three Kingdoms figures
const tk = require(figuresDataPath);
const figures = tk.THREE_KINGDOMS_FIGURES;

console.log(`Loaded ${figures.length} Three Kingdoms figures.`);

// Backup current 500 Koei portraits to archive
let backedUp = 0;
figures.forEach(f => {
  const src = path.join(imagesDir, `${f.id}.jpg`);
  const dst = path.join(backupDir, `${f.id}.jpg`);
  if (fs.existsSync(src) && !fs.existsSync(dst)) {
    fs.copyFileSync(src, dst);
    backedUp++;
  }
});
console.log(`Safely backed up ${backedUp} images to images/archive_koei_backup/`);

// 1. Classical Public Domain Woodcuts Map for Top Heroes
const PUBLIC_DOMAIN_PORTRAITS = {
  liu_bei: 'File:Liu Bei Portrait.jpg',
  cao_cao: 'File:Cao Cao Portrait ROTK.jpg',
  sun_quan: 'File:Sun Quan Portrait.jpg',
  zhuge_liang: 'File:Zhuge Liang Portrait.jpg',
  guan_yu: 'File:Guan Yu Portrait.jpg',
  zhang_fei: 'File:Zhang Fei Portrait.jpg',
  zhao_yun: 'File:Zhao Yun Portrait.jpg',
  ma_chao: 'File:Ma Chao Portrait.jpg',
  huang_zhong: 'File:Huang Zhong Portrait.jpg',
  zhou_yu: 'File:Zhou Yu Portrait.jpg',
  lu_su: 'File:Lu Su Portrait.jpg',
  lu_xun: 'File:Lu Xun Portrait.jpg',
  lu_meng: 'File:Lu Meng Portrait.jpg',
  sima_yi: 'File:Sima Yi Portrait.jpg',
  xun_yu: 'File:Xun Yu Portrait.jpg',
  guo_jia: 'File:Guo Jia Portrait.jpg',
  xiahou_dun: 'File:Xiahou Dun Portrait.jpg',
  zhang_liao: 'File:Zhang Liao Portrait.jpg',
  xu_chu: 'File:Xu Chu Portrait.jpg',
  dian_wei: 'File:Dian Wei Portrait.jpg',
  lu_bu: 'File:Lu Bu Portrait.jpg',
  diao_chan: 'File:Diaochan Portrait.jpg',
  dong_zhuo: 'File:Dong Zhuo Portrait.jpg',
  yuan_shao: 'File:Yuan Shao Portrait.jpg',
  yuan_shu: 'File:Yuan Shu Portrait.jpg',
  sun_ce: 'File:Sun Ce Portrait.jpg',
  sun_jian: 'File:Sun Jian Portrait.jpg',
  taishi_ci: 'File:Taishi Ci Portrait.jpg',
  gan_ning: 'File:Gan Ning Portrait.jpg',
  huang_gai: 'File:Huang Gai Portrait.jpg',
  cheng_pu: 'File:Cheng Pu Portrait.jpg',
  pang_tong: 'File:Pang Tong Portrait.jpg',
  fa_zheng: 'File:Fa Zheng Portrait.jpg',
  wei_yan: 'File:Wei Yan Portrait.jpg',
  jiang_wei: 'File:Jiang Wei Portrait.jpg',
  deng_ai: 'File:Deng Ai Portrait.jpg',
  zhong_hui: 'File:Zhong Hui Portrait.jpg',
  cao_pi: 'File:Cao Pi Portrait.jpg',
  cao_zhi: 'File:Cao Zhi Portrait.jpg',
  hua_tuo: 'File:Hua Tuo Portrait.jpg',
  jia_xu: 'File:Jia Xu Portrait.jpg',
  chen_gong: 'File:Chen Gong Portrait.jpg',
  meng_huo: 'File:Meng Huo Portrait.jpg',
  zhu_rong: 'File:Lady Zhurong Portrait.jpg',
  pang_de: 'File:Pang De Portrait.jpg',
  zhang_he: 'File:Zhang He Portrait.jpg',
  xu_huang: 'File:Xu Huang Portrait.jpg',
  yu_jin: 'File:Yu Jin Portrait.jpg',
  sima_shi: 'File:Sima Shi Portrait.jpg',
  sima_zhao: 'File:Sima Zhao Portrait.jpg',
  sima_yan: 'File:Emperor Wu of Jin.jpg'
};

async function getWikimediaImageUrl(filename) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) return resolve(null);
          const pageId = Object.keys(pages)[0];
          const imageInfo = pages[pageId]?.imageinfo;
          if (imageInfo && imageInfo[0]?.url) {
            resolve(imageInfo[0].url);
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status: ' + res.statusCode));
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
    }).on('error', reject);
  });
}

function getFactionColor(faction) {
  switch (faction) {
    case 'wei': return { color: '#2563eb', era: '魏' };
    case 'shu': return { color: '#dc2626', era: '蜀' };
    case 'wu': return { color: '#059669', era: '吳' };
    case 'jin': return { color: '#d97706', era: '晉' };
    default: return { color: '#ca8a04', era: '群' };
  }
}

function createSvgSeal(name, faction, outputPath) {
  const { color, era } = getFactionColor(faction);
  const fallbackChar = name.length > 0 ? name[name.length - 1] : '將';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad_${era}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a241e"/>
      <stop offset="100%" stop-color="#14110e"/>
    </radialGradient>
    <filter id="glow_${era}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="200" height="200" fill="url(#bgGrad_${era})"/>
  <circle cx="100" cy="100" r="88" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#e6c687" stroke-width="2"/>
  <circle cx="100" cy="100" r="74" fill="${color}" fill-opacity="0.15"/>
  <rect x="52" y="52" width="96" height="96" rx="8" fill="#881337" fill-opacity="0.3" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="100" y="118" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="52" font-weight="900" fill="#fef08a" text-anchor="middle" filter="url(#glow_${era})">${fallbackChar}</text>
  <text x="100" y="172" font-family="'Noto Serif TC', sans-serif" font-size="13" font-weight="bold" fill="#fde68a" text-anchor="middle" letter-spacing="3">${era}·${name}</text>
</svg>`;
  fs.writeFileSync(outputPath, svg, 'utf8');
}

async function run() {
  console.log('=== Step 1: Downloading Public Domain Woodcut Portraits for Key Figures ===');
  const downloadedKeyFigures = new Set();
  for (const [id, filename] of Object.entries(PUBLIC_DOMAIN_PORTRAITS)) {
    try {
      const url = await getWikimediaImageUrl(filename);
      if (url) {
        const dest = path.join(imagesDir, `${id}.jpg`);
        console.log(`[DOWNLOAD] ${id} (${filename})`);
        await downloadFile(url, dest);
        downloadedKeyFigures.add(id);
      }
    } catch (err) {
      console.log(`[WARN] Failed to download ${id}: ${err.message}`);
    }
  }
  console.log(`Successfully downloaded ${downloadedKeyFigures.size} public domain portraits.`);

  console.log('=== Step 2: Generating Classical Vector Seals for all other figures ===');
  let sealCount = 0;
  figures.forEach(f => {
    if (!downloadedKeyFigures.has(f.id)) {
      const svgPath = path.join(imagesDir, `${f.id}.svg`);
      createSvgSeal(f.name, f.faction, svgPath);
      f.avatar = `./images/figures/${f.id}.svg`;
      sealCount++;
      // Remove old Koei JPG to ensure zero copyright liability
      const oldJpg = path.join(imagesDir, `${f.id}.jpg`);
      if (fs.existsSync(oldJpg)) {
        try { fs.unlinkSync(oldJpg); } catch {}
      }
    } else {
      f.avatar = `./images/figures/${f.id}.jpg`;
    }
  });

  console.log(`Generated ${sealCount} authentic vector seals and updated figures data.`);

  // Save updated figures.js
  const figuresFileContent = 'export const THREE_KINGDOMS_FIGURES = ' + JSON.stringify(figures, null, 2) + ';\n';
  fs.writeFileSync(figuresDataPath, figuresFileContent, 'utf8');
  console.log('Updated src/data/threeKingdoms/figures.js successfully!');
}

run().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
