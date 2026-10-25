const fs = require('fs');
const path = require('path');

const WEIJIN_SVG_FIGURES = [
  { id: 'sima_zhong', name: '司馬衷', char: '衷', pinyin: 'Sīmǎ Zhōng', era: '西晉', color: '#eab308', title: '晉惠帝 · 何不食肉糜' },
  { id: 'jia_nanfeng', name: '賈南風', char: '賈', pinyin: 'Jiǎ Nánfēng', era: '西晉', color: '#be123c', title: '賈皇后 · 引爆八王亂' },
  { id: 'zu_ti', name: '祖逖', char: '逖', pinyin: 'Zǔ Tì', era: '東晉', color: '#16a34a', title: '豫州刺史 · 中流擊楫' },
  { id: 'huan_wen', name: '桓溫', char: '溫', pinyin: 'Huán Wēn', era: '東晉', color: '#15803d', title: '大司馬 · 三次北伐' },
  { id: 'wang_xizhi', name: '王羲之', char: '羲', pinyin: 'Wáng Xīzhī', era: '東晉', color: '#059669', title: '書聖 · 蘭亭集序' },
  { id: 'tao_yuanming', name: '陶淵明', char: '淵', pinyin: 'Táo Yuānmíng', era: '東晉', color: '#10b981', title: '五柳先生 · 靖節先生' },
  { id: 'liu_yuan', name: '劉淵', char: '淵', pinyin: 'Liú Yuān', era: '漢趙', color: '#a855f7', title: '光文帝 · 五胡揭幕' },
  { id: 'shi_le', name: '石勒', char: '勒', pinyin: 'Shí Lè', era: '後趙', color: '#9333ea', title: '後趙明帝 · 兼併中原' },
  { id: 'murong_chui', name: '慕容垂', char: '垂', pinyin: 'Mùróng Chuí', era: '後燕', color: '#6366f1', title: '後燕成武帝 · 鮮卑戰神' },
  { id: 'fu_jian', name: '苻堅', char: '堅', pinyin: 'Fú Jiān', era: '前秦', color: '#7e22ce', title: '宣昭帝 · 投鞭斷流' },
  { id: 'ran_min', name: '冉閔', char: '閔', pinyin: 'Rǎn Mǐn', era: '冉魏', color: '#b91c1c', title: '武悼天王 · 殺胡令' },
  { id: 'wei_rui', name: '韋睿', char: '睿', pinyin: 'Wéi Ruì', era: '南梁', color: '#047857', title: '豫州刺史 · 白袍韋虎' },
  { id: 'chen_baxian', name: '陳霸先', char: '陳', pinyin: 'Chén Bàxiān', era: '南陳', color: '#059669', title: '陳武帝 · 力挽狂瀾' },
  { id: 'hou_jing', name: '侯景', char: '景', pinyin: 'Hóu Jǐng', era: '東魏/梁', color: '#dc2626', title: '宇宙大將軍 · 台城圍' },
  { id: 'tuoba_dao', name: '拓跋燾', char: '燾', pinyin: 'Tuòbá Dào', era: '北魏', color: '#0284c7', title: '太武帝 · 統一北方' },
  { id: 'tuoba_hong', name: '元宏 (拓跋宏)', char: '宏', pinyin: 'Yuán Hóng', era: '北魏', color: '#0284c7', title: '孝文帝 · 遷都漢化' },
  { id: 'feng_taihou', name: '馮太后', char: '馮', pinyin: 'Féng Tàihòu', era: '北魏', color: '#0369a1', title: '文明太后 · 均田改制' },
  { id: 'yuwen_tai', name: '宇文泰', char: '泰', pinyin: 'Yǔwén Tài', era: '西魏', color: '#4338ca', title: '西魏丞相 · 府兵八柱' },
  { id: 'gao_huan', name: '高歡', char: '歡', pinyin: 'Gāo Huān', era: '東魏', color: '#0284c7', title: '齊神武帝 · 霸府鄴城' },
  { id: 'jia_sixie', name: '賈思勰', char: '勰', pinyin: 'Jiǎ Sīxié', era: '北魏', color: '#0d9488', title: '農學宗師 · 齊民要術' },
  { id: 'li_daoyuan', name: '酈道元', char: '道', pinyin: 'Lì Dàoyuán', era: '北魏', color: '#0284c7', title: '地理學家 · 水經注' },
  { id: 'yang_jian', name: '楊堅', char: '堅', pinyin: 'Yáng Jiān', era: '大隋', color: '#f59e0b', title: '隋文帝 · 四百年一統' }
];

function generateSVG(item) {
  const eraBg = item.color;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="300" height="360">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#24211d"/>
      <stop offset="70%" stop-color="#141312"/>
      <stop offset="100%" stop-color="#0a0a09"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="50%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="300" height="360" rx="16" fill="url(#bgGrad)"/>

  <!-- Ancient Border Ornamentation -->
  <rect x="12" y="12" width="276" height="336" rx="12" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.6"/>
  <rect x="18" y="18" width="264" height="324" rx="8" fill="none" stroke="#78350f" stroke-width="1" stroke-dasharray="6,4" stroke-opacity="0.5"/>

  <!-- Corner Traditional Motifs -->
  <path d="M 16,36 L 36,36 L 36,16" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <path d="M 284,36 L 264,36 L 264,16" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <path d="M 16,324 L 36,324 L 36,344" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
  <path d="M 284,324 L 264,324 L 264,344" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>

  <!-- Dynasty Top Tag -->
  <g transform="translate(150, 48)">
    <rect x="-42" y="-14" width="84" height="24" rx="4" fill="${eraBg}" stroke="#fef08a" stroke-width="1" stroke-opacity="0.6"/>
    <text x="0" y="3" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="3">${item.era}</text>
  </g>

  <!-- Central Seal Emblem Halo -->
  <circle cx="150" cy="160" r="76" fill="#181715" stroke="url(#goldGrad)" stroke-width="2.5" filter="url(#shadow)"/>
  <circle cx="150" cy="160" r="68" fill="none" stroke="#ca8a04" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="5,3"/>

  <!-- Large Calligraphic Character -->
  <text x="150" y="196" font-family="'Noto Serif TC', 'Kaiti TC', 'STKaiti', serif" font-size="94" font-weight="900" fill="url(#goldGrad)" text-anchor="middle" filter="url(#shadow)">${item.char}</text>

  <!-- Name & Pinyin -->
  <text x="150" y="272" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="22" font-weight="bold" fill="#fef08a" text-anchor="middle" letter-spacing="3">${item.name}</text>
  <text x="150" y="294" font-family="'Noto Sans TC', sans-serif" font-size="12" fill="#a1a1aa" text-anchor="middle" letter-spacing="1">${item.pinyin}</text>

  <!-- Title Pill -->
  <g transform="translate(150, 316)">
    <text x="0" y="3" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="11" fill="#d4d4d8" text-anchor="middle" letter-spacing="1">${item.title}</text>
  </g>
</svg>`;
}

const outDir = path.join(__dirname, '..', 'images', 'figures');
for (const item of WEIJIN_SVG_FIGURES) {
  const filePath = path.join(outDir, `fig_${item.id}.svg`);
  fs.writeFileSync(filePath, generateSVG(item), 'utf8');
  console.log(`Generated SVG: ${item.id} -> fig_${item.id}.svg`);
}
console.log('All SVGs generated successfully!');
