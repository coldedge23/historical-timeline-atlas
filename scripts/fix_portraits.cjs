const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fixOne(fid, title, fallbackChar, era, color) {
  const figuresDir = path.resolve(__dirname, '..', 'images', 'figures');
  const dest = path.join(figuresDir, `fig_${fid}.jpg`);
  const svgDest = path.join(figuresDir, `fig_${fid}.svg`);
  let success = false;

  if (title) {
    try {
      await sleep(300);
      const u = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;
      const r = await fetch(u, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (contact: user@history-atlas.local)' } });
      const d = await r.json();
      const p = Object.values(d?.query?.pages || {})[0];
      const thumb = p?.imageinfo?.[0]?.thumburl || p?.imageinfo?.[0]?.url;
      if (thumb) {
        await sleep(300);
        const imgR = await fetch(thumb, { headers: { 'User-Agent': 'HistoricalAtlasBot/1.0 (contact: user@history-atlas.local)' } });
        if (imgR.ok) {
          const buf = Buffer.from(await imgR.arrayBuffer());
          if (buf.length > 3000) {
            fs.writeFileSync(dest, buf);
            console.log(`[FIXED JPG] ${fid} with ${title} (${buf.length} bytes)`);
            success = true;
          }
        }
      }
    } catch(e) {}
  }

  if (!success) {
    if (fs.existsSync(dest)) fs.unlinkSync(dest);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="300" height="360">
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
    <rect x="-38" y="-14" width="76" height="24" rx="4" fill="${color}" stroke="#fef08a" stroke-width="1" stroke-opacity="0.6"/>
    <text x="0" y="3" font-family="'Noto Serif TC', serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">${era}</text>
  </g>
  <circle cx="150" cy="170" r="76" fill="#181715" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <circle cx="150" cy="170" r="68" fill="none" stroke="#ca8a04" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="5,3"/>
  <text x="150" y="206" font-family="'Noto Serif TC', serif" font-size="92" font-weight="900" fill="url(#goldGrad)" text-anchor="middle">${fallbackChar}</text>
</svg>`;
    fs.writeFileSync(svgDest, svg, 'utf8');
    console.log(`[REPLACED WITH SEAL] ${fid}`);
  }
}

async function run() {
  await fixOne('du_fu', 'File:Du Fu.jpg', '甫', '詩聖', '#06b6d4');
  await fixOne('an_lushan', null, '祿', '叛將', '#dc2626');
  await fixOne('shi_siming', null, '明', '叛將', '#dc2626');
  await fixOne('geshu_han', null, '翰', '名將', '#b45309');
  await fixOne('yang_su', null, '素', '大隋', '#c2410c');
  await fixOne('gao_jiong', null, '熲', '大隋', '#c2410c');
  await fixOne('zhangsun_huanghou', 'File:Empress Zhangsun.jpg', '孫', '唐朝', '#d97706');
}

run();
