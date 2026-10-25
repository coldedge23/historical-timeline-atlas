const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesDir = path.resolve(__dirname, '..', 'images', 'figures');
const figuresDataPath = path.resolve(__dirname, '..', 'src', 'data', 'threeKingdoms', 'figures.js');

const KEY_FIGURES = [
  { id: 'zhuge_liang', file: 'File:Zhuge Liang Portrait.jpg' },
  { id: 'guan_yu', file: 'File:Guan Yu Portrait.jpg' },
  { id: 'zhang_fei', file: 'File:Zhang Fei Portrait.jpg' },
  { id: 'sun_quan', file: 'File:Sun Quan Portrait.jpg' },
  { id: 'zhao_yun', file: 'File:Zhao Yun Portrait.jpg' },
  { id: 'zhou_yu', file: 'File:Zhou Yu Portrait.jpg' },
  { id: 'sima_yi', file: 'File:Sima Yi Portrait.jpg' },
  { id: 'lu_bu', file: 'File:Lu Bu Portrait.jpg' },
  { id: 'lu_su', file: 'File:Lu Su Portrait.jpg' },
  { id: 'lu_xun', file: 'File:Lu Xun Portrait.jpg' },
  { id: 'xun_yu', file: 'File:Xun Yu Portrait.jpg' },
  { id: 'guo_jia', file: 'File:Guo Jia Portrait.jpg' },
  { id: 'xiahou_dun', file: 'File:Xiahou Dun Portrait.jpg' },
  { id: 'dian_wei', file: 'File:Dian Wei Portrait.jpg' },
  { id: 'xu_chu', file: 'File:Xu Chu Portrait.jpg' },
  { id: 'dong_zhuo', file: 'File:Dong Zhuo Portrait.jpg' },
  { id: 'yuan_shao', file: 'File:Yuan Shao Portrait.jpg' }
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getWikimediaImageUrl(filename) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (historical-research-project)' } }, (res) => {
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
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (historical-research-project)' } }, (res) => {
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

async function main() {
  const tk = require(figuresDataPath);
  const figuresMap = new Map(tk.THREE_KINGDOMS_FIGURES.map(f => [f.id, f]));

  for (const item of KEY_FIGURES) {
    console.log(`Querying ${item.id}...`);
    await sleep(1500);
    try {
      const url = await getWikimediaImageUrl(item.file);
      if (url) {
        const dest = path.join(imagesDir, `${item.id}.jpg`);
        console.log(`Downloading ${item.id} -> ${url}`);
        await downloadFile(url, dest);
        if (figuresMap.has(item.id)) {
          figuresMap.get(item.id).avatar = `./images/figures/${item.id}.jpg`;
        }
        console.log(`[SUCCESS] ${item.id} downloaded.`);
      }
    } catch (e) {
      console.log(`[SKIP] ${item.id}: ${e.message}`);
    }
  }

  const updatedFigures = Array.from(figuresMap.values());
  fs.writeFileSync(figuresDataPath, 'export const THREE_KINGDOMS_FIGURES = ' + JSON.stringify(updatedFigures, null, 2) + ';\n', 'utf8');
  console.log('Finished updating top Three Kingdoms woodcuts!');
}

main();
