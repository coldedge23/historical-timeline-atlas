const fs = require('fs');
const path = require('path');
const https = require('https');

const FIGURES = [
  // Northern Song
  { fid: 'zhao_kuangyin', directFile: 'File:Song Taizu.jpg', fallbackChar: '胤', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_guangyi', directFile: 'File:Song Taizong.jpg', fallbackChar: '義', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_heng', directFile: 'File:Song Zhenzong.jpg', fallbackChar: '恆', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_zhen', directFile: 'File:Song Renzong.jpg', fallbackChar: '禎', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_xu', directFile: 'File:Song Shenzong.jpg', fallbackChar: '頊', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_ji', directFile: 'File:Song Huizong.jpg', fallbackChar: '佶', era: '北宋', color: '#dc2626' },
  { fid: 'zhao_pu', directFile: 'File:Zhao Pu.jpg', fallbackChar: '普', era: '北宋', color: '#ea580c' },
  { fid: 'kou_zhun', directFile: 'File:Kou Zhun.jpg', fallbackChar: '準', era: '北宋', color: '#ea580c' },
  { fid: 'fan_zhongyan', directFile: 'File:Fan Zhongyan.jpg', fallbackChar: '淹', era: '北宋', color: '#ea580c' },
  { fid: 'han_qi', directFile: 'File:Han Qi.jpg', fallbackChar: '琦', era: '北宋', color: '#ea580c' },
  { fid: 'fu_bi', directFile: 'File:Fu Bi.jpg', fallbackChar: '弼', era: '北宋', color: '#ea580c' },
  { fid: 'bao_zheng', directFile: 'File:Bao Zheng.jpg', fallbackChar: '拯', era: '北宋', color: '#ea580c' },
  { fid: 'wang_an_shi', directFile: 'File:Wang Anshi.jpg', fallbackChar: '石', era: '北宋', color: '#ea580c' },
  { fid: 'sima_guang', directFile: 'File:Sima Guang portrait.jpg', fallbackChar: '光', era: '北宋', color: '#ea580c' },
  { fid: 'di_qing', directFile: 'File:Di Qing.jpg', fallbackChar: '青', era: '北宋', color: '#ea580c' },
  { fid: 'shen_kuo', directFile: 'File:Shen Kuo.jpg', fallbackChar: '括', era: '科技', color: '#0284c7' },
  { fid: 'wang_shao', fallbackChar: '韶', era: '北宋', color: '#ea580c' },
  { fid: 'li_gang', fallbackChar: '綱', era: '抗金', color: '#ea580c' },
  { fid: 'zong_ze', fallbackChar: '澤', era: '抗金', color: '#ea580c' },
  { fid: 'yang_ye', fallbackChar: '業', era: '楊家將', color: '#ea580c' },

  // Southern Song
  { fid: 'zhao_gou', directFile: 'File:Song Gaozong.jpg', fallbackChar: '構', era: '南宋', color: '#b91c1c' },
  { fid: 'zhao_shen', directFile: 'File:Song Xiaozong.jpg', fallbackChar: '昚', era: '南宋', color: '#b91c1c' },
  { fid: 'yue_fei', directFile: 'File:General Yue Fei.jpg', fallbackChar: '飛', era: '南宋', color: '#dc2626' },
  { fid: 'yue_yun', fallbackChar: '雲', era: '南宋', color: '#dc2626' },
  { fid: 'zhang_xian', fallbackChar: '憲', era: '南宋', color: '#dc2626' },
  { fid: 'han_shizhong', directFile: 'File:Han Shizhong.jpg', fallbackChar: '忠', era: '南宋', color: '#dc2626' },
  { fid: 'liang_hongyu', fallbackChar: '玉', era: '南宋', color: '#f43f5e' },
  { fid: 'wu_jie', fallbackChar: '玠', era: '南宋', color: '#dc2626' },
  { fid: 'wu_lin', fallbackChar: '璘', era: '南宋', color: '#dc2626' },
  { fid: 'liu_qi', fallbackChar: '錡', era: '南宋', color: '#dc2626' },
  { fid: 'yu_yunwen', fallbackChar: '文', era: '南宋', color: '#dc2626' },
  { fid: 'meng_gong', fallbackChar: '珙', era: '南宋', color: '#dc2626' },
  { fid: 'qin_hui', fallbackChar: '檜', era: '主和', color: '#71717a' },
  { fid: 'wen_tianxiang', directFile: 'File:Wen Tianxiang.jpg', fallbackChar: '祥', era: '忠烈', color: '#b91c1c' },
  { fid: 'lu_xiufu', fallbackChar: '秀', era: '忠烈', color: '#b91c1c' },
  { fid: 'zhang_shijie', fallbackChar: '傑', era: '忠烈', color: '#b91c1c' },

  // Cultural & Philosophers
  { fid: 'ouyang_xiu', directFile: 'File:Ouyang Xiu.jpg', fallbackChar: '修', era: '文豪', color: '#0d9488' },
  { fid: 'su_shi', directFile: 'File:Su Shi.jpg', fallbackChar: '軾', era: '文豪', color: '#0d9488' },
  { fid: 'su_che', directFile: 'File:Su Zhe.jpg', fallbackChar: '轍', era: '文豪', color: '#0d9488' },
  { fid: 'su_xun', directFile: 'File:Su Xun.jpg', fallbackChar: '洵', era: '文豪', color: '#0d9488' },
  { fid: 'liu_yong', fallbackChar: '永', era: '詞宗', color: '#0d9488' },
  { fid: 'yan_shu', fallbackChar: '殊', era: '詞人', color: '#0d9488' },
  { fid: 'li_qingzhao', directFile: 'File:Li Qingzhao.jpg', fallbackChar: '照', era: '易安', color: '#f43f5e' },
  { fid: 'xin_qiji', directFile: 'File:Xin Qiji.jpg', fallbackChar: '疾', era: '稼軒', color: '#0d9488' },
  { fid: 'lu_you', directFile: 'File:Lu You.jpg', fallbackChar: '游', era: '放翁', color: '#0d9488' },
  { fid: 'zhou_dunyi', directFile: 'File:Zhou Dunyi.jpg', fallbackChar: '頤', era: '理學', color: '#eab308' },
  { fid: 'zhu_xi', directFile: 'File:Zhu Xi.jpg', fallbackChar: '熹', era: '理學', color: '#eab308' },

  // Liao Dynasty
  { fid: 'xiao_chuo', directFile: 'File:Empress Dowager Chengtian.jpg', fallbackChar: '綽', era: '大遼', color: '#0284c7' },
  { fid: 'yelv_longxu', fallbackChar: '緒', era: '大遼', color: '#0284c7' },
  { fid: 'yelv_xiuge', fallbackChar: '哥', era: '大遼', color: '#0284c7' },
  { fid: 'yelv_xiezhen', fallbackChar: '軫', era: '大遼', color: '#0284c7' },
  { fid: 'yelv_dashi', fallbackChar: '石', era: '西遼', color: '#0284c7' },

  // Jin Dynasty
  { fid: 'wanyan_aguda', directFile: 'File:Jin Taizu.jpg', fallbackChar: '骨', era: '大金', color: '#ca8a04' },
  { fid: 'wanyan_zongwang', fallbackChar: '望', era: '大金', color: '#ca8a04' },
  { fid: 'wanyan_zongbi', fallbackChar: '朮', era: '大金', color: '#ca8a04' },
  { fid: 'wanyan_liang', fallbackChar: '亮', era: '大金', color: '#ca8a04' },
  { fid: 'wanyan_yong', fallbackChar: '雍', era: '大金', color: '#ca8a04' },

  // Western Xia & Dali
  { fid: 'li_yuanhao', directFile: 'File:Emperor Jingzong of Western Xia.jpg', fallbackChar: '昊', era: '西夏', color: '#7c3aed' },
  { fid: 'yeli_renrong', fallbackChar: '榮', era: '西夏', color: '#7c3aed' },
  { fid: 'duan_siping', fallbackChar: '平', era: '大理', color: '#10b981' },

  // Mongol Empire
  { fid: 'temujin', directFile: 'File:YuanEmperorAlbumGenghisPortrait.jpg', fallbackChar: '吉', era: '蒙古', color: '#2563eb' },
  { fid: 'subutai', fallbackChar: '臺', era: '蒙古', color: '#2563eb' },
  { fid: 'kublai', directFile: 'File:YuanEmperorAlbumKhubilaiPortrait.jpg', fallbackChar: '烈', era: '大元', color: '#2563eb' }
];

const targetDir = path.resolve(__dirname, '..', 'images', 'figures');

function createSvgSeal(f, outputPath) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a241e"/>
      <stop offset="100%" stop-color="#14110e"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="200" height="200" fill="url(#bgGrad)"/>
  <circle cx="100" cy="100" r="88" fill="none" stroke="${f.color}" stroke-width="3" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#e6c687" stroke-width="2"/>
  <circle cx="100" cy="100" r="74" fill="${f.color}" fill-opacity="0.15"/>
  <rect x="52" y="52" width="96" height="96" rx="8" fill="#881337" fill-opacity="0.3" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="100" y="118" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="52" font-weight="900" fill="#fef08a" text-anchor="middle" filter="url(#glow)">${f.fallbackChar}</text>
  <text x="100" y="172" font-family="'Noto Serif TC', sans-serif" font-size="13" font-weight="bold" fill="#fde68a" text-anchor="middle" letter-spacing="3">${f.era}</text>
</svg>`;
  fs.writeFileSync(outputPath, svg, 'utf8');
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status: ' + res.statusCode));
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function getWikimediaImageUrl(fileName) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' +
    encodeURIComponent(fileName) +
    '&prop=imageinfo&iiprop=url&format=json';

  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) return resolve(null);
          for (const pid of Object.keys(pages)) {
            const ii = pages[pid]?.imageinfo;
            if (ii && ii[0]?.url) return resolve(ii[0].url);
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  console.log(`Downloading/generating portraits for ${FIGURES.length} Song-Liao-Jin figures...`);
  for (const f of FIGURES) {
    const jpgPath = path.join(targetDir, `fig_${f.fid}.jpg`);
    const svgPath = path.join(targetDir, `fig_${f.fid}.svg`);

    if (fs.existsSync(jpgPath) || fs.existsSync(svgPath)) {
      console.log(`[SKIP] Already exists: ${f.fid}`);
      continue;
    }

    let downloaded = false;
    if (f.directFile) {
      try {
        const imgUrl = await getWikimediaImageUrl(f.directFile);
        if (imgUrl) {
          console.log(`[DOWNLOAD] ${f.fid} from Wikimedia: ${imgUrl}`);
          await downloadFile(imgUrl, jpgPath);
          downloaded = true;
        }
      } catch (e) {
        console.log(`[WARN] ${f.fid}: ${e.message}`);
      }
    }

    if (!downloaded) {
      console.log(`[SVG SEAL] Generated seal for ${f.fid}`);
      createSvgSeal(f, svgPath);
    }
  }
  console.log('All Song-Liao portraits ready!');
}

main();
