const https = require('https');
const fs = require('fs');
const path = require('path');

const PORTRAITS = [
  { fid: 'tuoba_hong', file: 'File:Emperor Xiaowen of Northern Wei.jpg' },
  { fid: 'yang_jian', file: 'File:Sui Wendi Tang.jpg' },
  { fid: 'tao_yuanming', file: 'File:Taoqian1.jpg' },
  { fid: 'gao_huan', file: 'File:Gao Huan.jpg' },
  { fid: 'yuwen_tai', file: 'File:Yuwen Tai.jpg' },
  { fid: 'sima_zhong', file: 'File:Harvard drs 49802792 繡像三國演義續編 v.1 (晉惠帝).jpg' },
  { fid: 'jia_nanfeng', file: 'File:繡像三國演義續編 v.1 (賈后).jpg' },
  { fid: 'shi_le', file: 'File:Shi Le (Emperor Ming of Later Zhao).jpg' },
  { fid: 'murong_chui', file: 'File:Harvard drs 49802792 繡像三國演義續編 v.1 (慕容垂).jpg' },
  { fid: 'chen_baxian', file: 'File:Emperor Wu of Chen.jpg' },
  { fid: 'hou_jing', file: 'File:Hou Jing.jpg' },
  { fid: 'jia_sixie', file: 'File:贾思勰像.jpg' },
  { fid: 'wei_rui', file: 'File:Wei Rui.jpg' },
];

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'AntigravityHistoryAtlas/1.0 (historical_atlas@example.com)' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'AntigravityHistoryAtlas/1.0 (historical_atlas@example.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    }).on('error', () => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of PORTRAITS) {
    const dest = path.join(__dirname, '..', 'images', 'figures', `fig_${item.fid}.jpg`);
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.file)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;
    const res = await fetchJson(apiUrl);
    const pages = res?.query?.pages || {};
    const page = Object.values(pages)[0];
    const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
    if (!thumbUrl) {
      console.log(`[NO URL] ${item.fid}`);
      continue;
    }
    const ok = await downloadImage(thumbUrl, dest);
    const size = ok && fs.existsSync(dest) ? fs.statSync(dest).size : 0;
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${item.fid} -> ${size} bytes`);
  }
}

run();
