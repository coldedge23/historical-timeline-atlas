const fs = require('fs');
const path = require('path');

const FIGURES = [
  // Sui
  { fid: 'yang_guang', query: 'Emperor Yang of Sui', fallbackChar: '廣', era: '大隋', color: '#ea580c' },
  { fid: 'yang_su', query: 'Yang Su Sui Dynasty', fallbackChar: '素', era: '大隋', color: '#c2410c' },
  { fid: 'gao_jiong', query: 'Gao Jiong', fallbackChar: '熲', era: '大隋', color: '#c2410c' },
  { fid: 'dugu_qieluo', query: 'Empress Dugu Qieluo', fallbackChar: '伽', era: '大隋', color: '#9a3412' },

  // Early Tang
  { fid: 'li_yuan', query: 'TangGaozu', directFile: 'File:TangGaozu.jpg', fallbackChar: '淵', era: '唐朝', color: '#f59e0b' },
  { fid: 'li_shimin', query: 'Tang Emperor Taizong', directFile: 'File:Tang Emperor Taizong.jpg', fallbackChar: '世', era: '唐朝', color: '#f59e0b' },
  { fid: 'zhangsun_huanghou', query: 'Empress Zhangsun', fallbackChar: '孫', era: '唐朝', color: '#d97706' },
  { fid: 'wei_zheng', query: 'WeiZheng', directFile: 'File:WeiZheng.jpg', fallbackChar: '徵', era: '唐朝', color: '#b45309' },
  { fid: 'fang_xuanling', query: 'Fang Xuanling', directFile: 'File:Fang Xuanling.jpg', fallbackChar: '齡', era: '唐朝', color: '#b45309' },
  { fid: 'du_ruhui', query: 'Du Ruhui', directFile: 'File:Du Ruhui.jpg', fallbackChar: '晦', era: '唐朝', color: '#b45309' },
  { fid: 'li_jing', query: 'Li Jing Tang general', directFile: 'File:Li Jing Tang.jpg', fallbackChar: '靖', era: '唐朝', color: '#b45309' },
  { fid: 'li_ji', query: 'Li Shiji', directFile: 'File:Li Shiji.jpg', fallbackChar: '勣', era: '唐朝', color: '#b45309' },
  { fid: 'yuchi_gong', query: 'Yuchi Gong', directFile: 'File:Yuchi Jingde.jpg', fallbackChar: '恭', era: '唐朝', color: '#b45309' },
  { fid: 'qin_qiong', query: 'Qin Shubao', directFile: 'File:Qin Qiong.jpg', fallbackChar: '瓊', era: '唐朝', color: '#b45309' },
  { fid: 'cheng_yaojin', query: 'Cheng Yaojin', fallbackChar: '咬', era: '唐朝', color: '#b45309' },
  { fid: 'li_xiaogong', query: 'Li Xiaogong', fallbackChar: '孝', era: '唐朝', color: '#f59e0b' },
  { fid: 'hou_junji', query: 'Hou Junji', fallbackChar: '君', era: '唐朝', color: '#b45309' },
  { fid: 'liu_rengui', query: 'Liu Rengui', fallbackChar: '軌', era: '唐朝', color: '#b45309' },
  { fid: 'wencheng_gongzhu', query: 'Princess Wencheng', directFile: 'File:Princess Wencheng statue.jpg', fallbackChar: '成', era: '唐朝', color: '#d97706' },

  // Wu Zhou & High Tang
  { fid: 'wu_zetian', query: 'Empress Wu Zetian', directFile: 'File:唐后行從圖 (局部) - 武則天.png', fallbackChar: '曌', era: '武周', color: '#a855f7' },
  { fid: 'di_renjie', query: 'Di Renjie', directFile: 'File:Di Renjie.jpg', fallbackChar: '傑', era: '武周', color: '#9333ea' },
  { fid: 'shangguan_waner', query: 'Shangguan Waner', fallbackChar: '婉', era: '武周', color: '#9333ea' },
  { fid: 'li_longji', query: '李隆基像', directFile: 'File:李隆基像.jpg', fallbackChar: '基', era: '唐朝', color: '#f59e0b' },
  { fid: 'yang_guifei', query: 'Yang Guifei', directFile: 'File:Qian Xuan - Yang Guifei Mounting a Horse.jpg', fallbackChar: '環', era: '唐朝', color: '#f43f5e' },
  { fid: 'yao_chong', query: 'Yao Chong', fallbackChar: '崇', era: '唐朝', color: '#b45309' },
  { fid: 'song_jing', query: 'Song Jing Tang', fallbackChar: '璟', era: '唐朝', color: '#b45309' },
  { fid: 'zhang_jiuling', query: 'Zhang Jiuling', fallbackChar: '九', era: '唐朝', color: '#b45309' },
  { fid: 'gao_lishi', query: 'Gao Lishi', fallbackChar: '力', era: '唐朝', color: '#b45309' },
  { fid: 'guo_ziyi', query: 'Guo Ziyi', directFile: 'File:Guo Ziyi.jpg', fallbackChar: '儀', era: '唐朝', color: '#b45309' },
  { fid: 'li_guangbi', query: 'Li Guangbi', fallbackChar: '弼', era: '唐朝', color: '#b45309' },
  { fid: 'gao_xianzhi', query: 'Gao Xianzhi', fallbackChar: '芝', era: '唐朝', color: '#b45309' },
  { fid: 'geshu_han', query: 'Geshu Han', fallbackChar: '翰', era: '唐朝', color: '#b45309' },
  { fid: 'zhang_xun', query: 'Zhang Xun Tang general', fallbackChar: '巡', era: '唐朝', color: '#b45309' },
  { fid: 'yan_zhenqing', query: 'Yan Zhenqing', directFile: 'File:Yan Zhenqing.jpg', fallbackChar: '卿', era: '唐朝', color: '#0d9488' },

  // Cultural
  { fid: 'li_bai', query: 'Li Bai in stroll', directFile: 'File:Li Bai in stroll.jpg', fallbackChar: '白', era: '詩仙', color: '#06b6d4' },
  { fid: 'du_fu', query: 'Du Fu portrait', directFile: 'File:杜甫像.jpg', fallbackChar: '甫', era: '詩聖', color: '#06b6d4' },
  { fid: 'bai_juyi', query: 'Bai Juyi', directFile: 'File:Bai Juyi.jpg', fallbackChar: '易', era: '文宗', color: '#06b6d4' },
  { fid: 'wang_wei', query: 'Wang Wei poet', fallbackChar: '維', era: '詩佛', color: '#06b6d4' },
  { fid: 'xuanzang', query: 'Xuanzang', directFile: 'File:Portrait of Xuanzang (Genjō) with Attendant MET DP-15580-007.jpg', fallbackChar: '奘', era: '佛法', color: '#eab308' },
  { fid: 'jianzhen', query: 'Jianzhen', directFile: 'File:Jianzhen.jpg', fallbackChar: '真', era: '佛法', color: '#eab308' },
  { fid: 'sun_simiao', query: 'Sun Simiao', directFile: 'File:Sun Simiao.jpg', fallbackChar: '邈', era: '藥王', color: '#10b981' },

  // Rebellion & Warlords
  { fid: 'an_lushan', query: 'An Lushan', fallbackChar: '祿', era: '叛軍', color: '#dc2626' },
  { fid: 'shi_siming', query: 'Shi Siming', fallbackChar: '明', era: '叛軍', color: '#dc2626' },
  { fid: 'huang_chao', query: 'Huang Chao', fallbackChar: '巢', era: '大齊', color: '#b91c1c' },

  // Five Dynasties & Nomadic
  { fid: 'zhu_wen', query: 'Emperor Taizu of Later Liang', fallbackChar: '溫', era: '後梁', color: '#059669' },
  { fid: 'li_keyong', query: 'Li Keyong', fallbackChar: '用', era: '後唐', color: '#059669' },
  { fid: 'li_cunxu', query: 'Emperor Zhuangzong of Later Tang', fallbackChar: '勖', era: '後唐', color: '#059669' },
  { fid: 'shi_jingtang', query: 'Emperor Gaozu of Later Jin', fallbackChar: '瑭', era: '後晉', color: '#059669' },
  { fid: 'chai_rong', query: 'Emperor Shizong of Later Zhou', directFile: 'File:Emperor Shizong of Later Zhou.jpg', fallbackChar: '榮', era: '後周', color: '#059669' },
  { fid: 'feng_dao', query: 'Feng Dao', fallbackChar: '道', era: '五代', color: '#64748b' },
  { fid: 'li_yu_nanTang', query: 'Li Yu Southern Tang', directFile: 'File:Li Yu (Southern Tang).jpg', fallbackChar: '煜', era: '南唐', color: '#d97706' },
  { fid: 'zhao_kuangyin_young', query: 'Emperor Taizu of Song', directFile: 'File:Song Taizu.jpg', fallbackChar: '胤', era: '後周', color: '#eab308' },
  { fid: 'yelv_abaoji', query: 'Emperor Taizu of Liao', directFile: 'File:Emperor Taizu of Liao.jpg', fallbackChar: '機', era: '大遼', color: '#0284c7' },
  { fid: 'songtsen_gampo', query: 'Songtsen Gampo', directFile: 'File:Songtsen Gampo statue.jpg', fallbackChar: '布', era: '吐蕃', color: '#8b5cf6' }
];

function generateSvgSeal(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="300" height="360">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#22201d"/>
      <stop offset="70%" stop-color="#141312"/>
      <stop offset="100%" stop-color="#0a0a09"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
  </defs>
  <rect width="300" height="360" rx="16" fill="url(#bgGrad)"/>
  <rect x="12" y="12" width="276" height="336" rx="12" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.6"/>
  <rect x="18" y="18" width="264" height="324" rx="8" fill="none" stroke="#78350f" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.5"/>
  <g transform="translate(150, 48)">
    <rect x="-38" y="-14" width="76" height="24" rx="4" fill="${item.color}" stroke="#fef08a" stroke-width="1" stroke-opacity="0.6"/>
    <text x="0" y="3" font-family="'Noto Serif TC', serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">${item.era}</text>
  </g>
  <circle cx="150" cy="170" r="76" fill="#181715" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <circle cx="150" cy="170" r="68" fill="none" stroke="#ca8a04" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="5,3"/>
  <text x="150" y="206" font-family="'Noto Serif TC', serif" font-size="92" font-weight="900" fill="url(#goldGrad)" text-anchor="middle">${item.fallbackChar}</text>
</svg>`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  try {
    await sleep(400);
    const res = await fetch(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (contact: user@history-atlas.local)' } });
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function downloadUrl(url, dest) {
  try {
    await sleep(400);
    const res = await fetch(url, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (contact: user@history-atlas.local)' } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) return false;
    fs.writeFileSync(dest, buf);
    return true;
  } catch (e) {
    return false;
  }
}

async function run() {
  const figuresDir = path.resolve(__dirname, '..', 'images', 'figures');
  let downloadedCount = 0;
  let fallbackCount = 0;

  for (const item of FIGURES) {
    const jpgDest = path.join(figuresDir, `fig_${item.fid}.jpg`);
    const svgDest = path.join(figuresDir, `fig_${item.fid}.svg`);

    // Check if jpg already exists and is valid
    if (fs.existsSync(jpgDest) && fs.statSync(jpgDest).size > 3000) {
      console.log(`[EXISTING] ${item.fid} -> ${fs.statSync(jpgDest).size} bytes`);
      downloadedCount++;
      continue;
    }

    let success = false;

    // Try directFile first
    if (item.directFile) {
      const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(item.directFile)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;
      const res = await fetchJson(apiUrl);
      const page = Object.values(res?.query?.pages || {})[0];
      const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
      if (thumbUrl) {
        success = await downloadUrl(thumbUrl, jpgDest);
        if (success) {
          console.log(`[DOWNLOADED DIRECT] ${item.fid} -> ${fs.statSync(jpgDest).size} bytes`);
          downloadedCount++;
          continue;
        }
      }
    }

    // Try search query
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(item.query)}&srnamespace=6&format=json`;
    const sRes = await fetchJson(searchUrl);
    const hits = sRes?.query?.search || [];
    for (const h of hits.slice(0, 3)) {
      if (/\.pdf|\.djvu|\.tif|\.svg/i.test(h.title)) continue;
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(h.title)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;
      const iRes = await fetchJson(infoUrl);
      const page = Object.values(iRes?.query?.pages || {})[0];
      const thumbUrl = page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url;
      if (thumbUrl) {
        success = await downloadUrl(thumbUrl, jpgDest);
        if (success) {
          console.log(`[DOWNLOADED SEARCH] ${item.fid} (${h.title}) -> ${fs.statSync(jpgDest).size} bytes`);
          downloadedCount++;
          break;
        }
      }
    }

    if (!success) {
      // Create SVG seal fallback
      fs.writeFileSync(svgDest, generateSvgSeal(item), 'utf8');
      console.log(`[GENERATED SVG] ${item.fid} -> svg seal fallback`);
      fallbackCount++;
    }
  }

  console.log(`\n🎉 肖像處理完成！成功下載古典畫像: ${downloadedCount} 位，生成高畫質印章: ${fallbackCount} 位`);
}

run();
