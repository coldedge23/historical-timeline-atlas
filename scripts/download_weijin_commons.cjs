const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGURES = [
  { fid: 'sima_rui', query: 'Sima Rui (Jin Yuandi)' },
  { fid: 'wang_dao', query: 'Wang Dao Jin' },
  { fid: 'xie_an', query: 'Xie An Sancai' },
  { fid: 'xie_xuan', query: 'Xie Xuan' },
  { fid: 'zu_ti', query: 'Zu Ti' },
  { fid: 'huan_wen', query: 'Huan Wen' },
  { fid: 'wang_xizhi', query: 'Wang Xizhi' },
  { fid: 'tao_yuanming', query: 'Tao Yuanming' },
  { fid: 'gu_kaizhi', query: 'Gu Kaizhi' },
  { fid: 'fu_jian', query: 'Fu Jian' },
  { fid: 'wang_meng', query: 'Wang Meng Former Qin' },
  { fid: 'kumarajiva', query: 'Kumarajiva' },
  { fid: 'liu_yu_song', query: 'Emperor Wu of Song' },
  { fid: 'liu_yilong', query: 'Emperor Wen of Song' },
  { fid: 'xiao_daocheng', query: 'Emperor Gao of Southern Qi' },
  { fid: 'xiao_yan', query: 'Emperor Wu of Liang' },
  { fid: 'chen_baxian', query: 'Emperor Wu of Chen' },
  { fid: 'zu_chongzhi', query: 'Zu Chongzhi' },
  { fid: 'tuoba_gui', query: 'Emperor Daowu of Northern Wei' },
  { fid: 'tuoba_dao', query: 'Emperor Taiwu of Northern Wei' },
  { fid: 'tuoba_hong', query: 'Emperor Xiaowen of Northern Wei' },
  { fid: 'yuwen_tai', query: 'Yuwen Tai' },
  { fid: 'gao_huan', query: 'Gao Huan Northern Qi' },
  { fid: 'jia_sixie', query: 'Jia Sixie' },
  { fid: 'li_daoyuan', query: 'Li Daoyuan' },
  { fid: 'yang_jian', query: 'Emperor Wen of Sui' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'AntigravityHistoryAtlas/1.0 (test@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.abort(); resolve(null); });
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'AntigravityHistoryAtlas/1.0 (test@example.com)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    });
    req.on('error', () => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
    req.setTimeout(10000, () => {
      req.abort();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of FIGURES) {
    const outPath = path.join(__dirname, '..', 'images', 'figures', `fig_${item.fid}.jpg`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 2000) {
      console.log(`[EXISTS] ${item.fid}`);
      continue;
    }
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.query)}&srnamespace=6&format=json`;
    const searchRes = await fetchJson(searchUrl);
    const hits = searchRes?.query?.search || [];
    if (!hits.length) {
      console.log(`[NO HITS] ${item.fid}`);
      continue;
    }
    const firstTitle = hits[0].title;
    const imgInfoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstTitle)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;
    const infoRes = await fetchJson(imgInfoUrl);
    const pages = infoRes?.query?.pages || {};
    const page = Object.values(pages)[0];
    const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
    if (!thumbUrl) {
      console.log(`[NO URL] ${item.fid} (${firstTitle})`);
      continue;
    }
    const ok = await downloadImage(thumbUrl, outPath);
    console.log(`[${ok ? 'OK' : 'FAIL'}] ${item.fid} -> ${firstTitle}`);
  }
  console.log('ALL DONE');
}

run();
