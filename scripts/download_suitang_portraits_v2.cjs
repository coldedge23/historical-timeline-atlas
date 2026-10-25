const fs = require('fs');
const path = require('path');
const https = require('https');

const NEW_FIGURES = [
  // Sui & Late Sui
  { fid: 'han_qinhu', query: 'Han Qinhu Sui', fallbackChar: '擒', era: '大隋', color: '#c2410c' },
  { fid: 'heruo_bi', query: 'Heruo Bi Sui', fallbackChar: '弼', era: '大隋', color: '#c2410c' },
  { fid: 'shi_wansui', query: 'Shi Wansui Sui', fallbackChar: '萬', era: '大隋', color: '#c2410c' },
  { fid: 'yuwen_huaji', query: 'Yuwen Huaji', fallbackChar: '化', era: '宇文', color: '#71717a' },
  { fid: 'li_mi', query: 'Li Mi Wagang', fallbackChar: '密', era: '瓦崗', color: '#f59e0b' },
  { fid: 'dou_jiande', query: 'Dou Jiande', fallbackChar: '建', era: '大夏', color: '#ea580c' },
  { fid: 'wang_shichong', query: 'Wang Shichong', fallbackChar: '世', era: '大鄭', color: '#d97706' },
  { fid: 'dan_xiongxin', query: 'Dan Xiongxin', fallbackChar: '單', era: '瓦崗', color: '#b45309' },
  { fid: 'zhai_rang', query: 'Zhai Rang Wagang', fallbackChar: '翟', era: '瓦崗', color: '#b45309' },

  // Early Tang & Zhenguan
  { fid: 'zhangsun_wuji', query: 'Zhangsun Wuji', directFile: 'File:Zhangsun Wuji.jpg', fallbackChar: '忌', era: '唐朝', color: '#b45309' },
  { fid: 'chai_shao', query: 'Chai Shao Tang', fallbackChar: '柴', era: '唐朝', color: '#b45309' },
  { fid: 'pingyang_gongzhu', query: 'Princess Pingyang Tang', fallbackChar: '娘', era: '唐朝', color: '#d97706' },
  { fid: 'xue_rengui', query: 'Xue Rengui', directFile: 'File:Xue Rengui.jpg', fallbackChar: '仁', era: '唐朝', color: '#b45309' },
  { fid: 'su_dingfang', query: 'Su Dingfang Tang general', fallbackChar: '定', era: '唐朝', color: '#b45309' },
  { fid: 'pei_xingjian', query: 'Pei Xingjian', fallbackChar: '行', era: '唐朝', color: '#b45309' },
  { fid: 'qibi_heli', query: 'Qibi Heli Tang', fallbackChar: '契', era: '唐朝', color: '#0284c7' },
  { fid: 'ashina_sheer', query: 'Ashina Sheer Tang', fallbackChar: '社', era: '唐朝', color: '#0284c7' },
  { fid: 'gar_dongzan', query: 'Gar Tongtsen Yulsung', fallbackChar: '贊', era: '吐蕃', color: '#0284c7' },

  // Wu Zhou & High Tang
  { fid: 'li_zhi', query: 'Emperor Gaozong of Tang', directFile: 'File:Tang Emperor Gaozong.jpg', fallbackChar: '治', era: '唐朝', color: '#f59e0b' },
  { fid: 'lou_shide', query: 'Lou Shide', fallbackChar: '德', era: '唐朝', color: '#b45309' },
  { fid: 'taiping_gongzhu', query: 'Princess Taiping', fallbackChar: '平', era: '唐朝', color: '#a855f7' },
  { fid: 'li_linfu', query: 'Li Linfu', fallbackChar: '甫', era: '唐朝', color: '#71717a' },
  { fid: 'yang_guozhong', query: 'Yang Guozhong', fallbackChar: '忠', era: '唐朝', color: '#71717a' },
  { fid: 'feng_changqing', query: 'Feng Changqing Tang general', fallbackChar: '清', era: '唐朝', color: '#b45309' },
  { fid: 'xu_yuan', query: 'Xu Yuan Tang', fallbackChar: '遠', era: '唐朝', color: '#b45309' },
  { fid: 'nan_jiyun', query: 'Nan Jiyun Tang general', fallbackChar: '霽', era: '唐朝', color: '#b45309' },
  { fid: 'li_bi', query: 'Li Bi Tang Chancellor', fallbackChar: '泌', era: '唐朝', color: '#06b6d4' },
  { fid: 'li_siye', query: 'Li Siye Tang', fallbackChar: '嗣', era: '唐朝', color: '#b45309' },

  // Mid-Late Tang & Culture
  { fid: 'li_chun_xianzong', query: 'Emperor Xianzong of Tang', fallbackChar: '純', era: '唐朝', color: '#f59e0b' },
  { fid: 'li_su', query: 'Li Su Tang general', fallbackChar: '愬', era: '唐朝', color: '#b45309' },
  { fid: 'pei_du', query: 'Pei Du Tang Chancellor', fallbackChar: '度', era: '唐朝', color: '#b45309' },
  { fid: 'han_yu', query: 'Han Yu', directFile: 'File:Han Yu.jpg', fallbackChar: '愈', era: '文宗', color: '#0d9488' },
  { fid: 'liu_zongyuan', query: 'Liu Zongyuan', directFile: 'File:Liu Zongyuan.jpg', fallbackChar: '元', era: '文宗', color: '#0d9488' },
  { fid: 'liu_yuxi', query: 'Liu Yuxi', directFile: 'File:Liu Yuxi.jpg', fallbackChar: '禹', era: '詩豪', color: '#0d9488' },
  { fid: 'li_shangyin', query: 'Li Shangyin', directFile: 'File:Li Shangyin.jpg', fallbackChar: '隱', era: '詩人', color: '#0d9488' },
  { fid: 'du_mu', query: 'Du Mu', directFile: 'File:Du Mu.jpg', fallbackChar: '牧', era: '詩人', color: '#0d9488' },
  { fid: 'meng_haoran', query: 'Meng Haoran', directFile: 'File:Meng Haoran.jpg', fallbackChar: '浩', era: '詩人', color: '#0d9488' },
  { fid: 'gao_shi', query: 'Gao Shi poet', directFile: 'File:Gao Shi.jpg', fallbackChar: '適', era: '邊塞', color: '#0d9488' },
  { fid: 'cen_shen', query: 'Cen Shen', directFile: 'File:Cen Shen.jpg', fallbackChar: '參', era: '邊塞', color: '#0d9488' },

  // Five Dynasties & Ten Kingdoms
  { fid: 'guo_wei', query: 'Emperor Taizu of Later Zhou', fallbackChar: '威', era: '後周', color: '#eab308' },
  { fid: 'li_siyuan', query: 'Emperor Mingzong of Later Tang', fallbackChar: '嗣', era: '後唐', color: '#eab308' },
  { fid: 'liu_zhiyuan', query: 'Emperor Gaozu of Later Han', fallbackChar: '知', era: '後漢', color: '#eab308' },
  { fid: 'qian_liu', query: 'Qian Liu Wuyue', directFile: 'File:Qian Liu portrait.jpg', fallbackChar: '鏐', era: '吳越', color: '#10b981' },
  { fid: 'yang_xingmi', query: 'Yang Xingmi', fallbackChar: '密', era: '南吳', color: '#10b981' },
  { fid: 'yelv_deguang', query: 'Emperor Taizong of Liao', fallbackChar: '德', era: '大遼', color: '#0284c7' }
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
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (contact@historical-atlas.org)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status: ' + res.statusCode));
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function getWikimediaImageUrl(fileNameOrQuery) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' +
    encodeURIComponent(fileNameOrQuery) +
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
  console.log(`Processing ${NEW_FIGURES.length} new figures...`);
  for (const f of NEW_FIGURES) {
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
        console.log(`[WARN] Failed to download direct file for ${f.fid}: ${e.message}`);
      }
    }

    if (!downloaded) {
      console.log(`[SVG SEAL] Generating seal badge for ${f.fid}`);
      createSvgSeal(f, svgPath);
    }
  }
  console.log('Done processing new portraits!');
}

main();
