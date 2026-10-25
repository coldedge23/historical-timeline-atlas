const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'images', 'figures');

// 1. Generate portraits for Yuan & Ming
const YUAN_MING_FIGURES_DEF = [
  // Yuan
  { id: 'fig_kublai_khan', name: '忽必烈', fallbackChar: '烈', era: '大元', color: '#2563eb', faction: 'yuan', roleType: 'monarch' },
  { id: 'fig_chahan_tiemu', name: '察罕帖木兒', fallbackChar: '帖', era: '大元', color: '#2563eb', faction: 'yuan', roleType: 'general' },
  { id: 'fig_wang_baobao', name: '王保保', fallbackChar: '保', era: '北元', color: '#2563eb', faction: 'yuan', roleType: 'general' },
  { id: 'fig_tuotuo', name: '脫脫', fallbackChar: '脫', era: '大元', color: '#2563eb', faction: 'yuan', roleType: 'statesman' },
  { id: 'fig_guo_shoujing', name: '郭守敬', fallbackChar: '敬', era: '大元', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_zhao_mengfu', name: '趙孟頫', fallbackChar: '頫', era: '大元', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_guan_hanqing', name: '關漢卿', fallbackChar: '卿', era: '大元', color: '#059669', faction: 'cultural', roleType: 'advisor' },

  // Ming Early
  { id: 'fig_zhu_yuanzhang', name: '朱元璋', fallbackChar: '璋', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'monarch' },
  { id: 'fig_ma_huanghou', name: '馬皇后', fallbackChar: '馬', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_zhu_biao', name: '朱標', fallbackChar: '標', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_liu_bowen', name: '劉伯溫', fallbackChar: '基', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'advisor' },
  { id: 'fig_li_shan_chang', name: '李善長', fallbackChar: '長', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_xu_da', name: '徐達', fallbackChar: '達', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_chang_yuchun', name: '常遇春', fallbackChar: '春', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_tang_he', name: '湯和', fallbackChar: '和', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_lan_yu', name: '藍玉', fallbackChar: '玉', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },

  // Ming Yongle & Mid
  { id: 'fig_zhu_di', name: '朱棣 (永樂帝)', fallbackChar: '棣', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'monarch' },
  { id: 'fig_yao_guangxiao', name: '姚廣孝', fallbackChar: '衍', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'advisor' },
  { id: 'fig_fang_xiaoru', name: '方孝孺', fallbackChar: '孺', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_zheng_he', name: '鄭和', fallbackChar: '和', era: '大明', color: '#0284c7', faction: 'ming', roleType: 'general' },
  { id: 'fig_xie_jin', name: '解縉', fallbackChar: '縉', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'advisor' },
  { id: 'fig_yu_qian', name: '于謙', fallbackChar: '謙', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_wang_yangming', name: '王陽明', fallbackChar: '守', era: '大明', color: '#16a34a', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_zhang_juzheng', name: '張居正', fallbackChar: '居', era: '大明', color: '#ca8a04', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_hai_rui', name: '海瑞', fallbackChar: '瑞', era: '大明', color: '#16a34a', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_qi_jiguang', name: '戚繼光', fallbackChar: '光', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_yu_dayou', name: '俞大猷', fallbackChar: '猷', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_li_rusong', name: '李如松', fallbackChar: '松', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_li_shizhen', name: '李時珍', fallbackChar: '珍', era: '大明', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_xu_xiake', name: '徐霞客', fallbackChar: '霞', era: '大明', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_song_yingxing', name: '宋應星', fallbackChar: '星', era: '大明', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_tang_bohu', name: '唐伯虎', fallbackChar: '寅', era: '大明', color: '#7c3aed', faction: 'cultural', roleType: 'advisor' },

  // Ming Late & Rivals
  { id: 'fig_yuan_chonghuan', name: '袁崇煥', fallbackChar: '煥', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_sun_chengzong', name: '孫承宗', fallbackChar: '宗', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'statesman' },
  { id: 'fig_lu_xiangsheng', name: '盧象昇', fallbackChar: '昇', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_sun_chuanting', name: '孫傳庭', fallbackChar: '庭', era: '大明', color: '#ea580c', faction: 'ming', roleType: 'general' },
  { id: 'fig_qin_liangyu', name: '秦良玉', fallbackChar: '玉', era: '大明', color: '#be185d', faction: 'ming', roleType: 'general' },
  { id: 'fig_chongzhen', name: '崇禎帝', fallbackChar: '檢', era: '大明', color: '#7f1d1d', faction: 'ming', roleType: 'monarch' },
  { id: 'fig_li_zicheng', name: '李自成', fallbackChar: '闖', era: '大順', color: '#f59e0b', faction: 'peasant', roleType: 'monarch' },
  { id: 'fig_zhang_xianzhong', name: '張獻忠', fallbackChar: '獻', era: '大西', color: '#d97706', faction: 'peasant', roleType: 'monarch' },
  { id: 'fig_zheng_zhilong', name: '鄭芝龍', fallbackChar: '龍', era: '明鄭', color: '#0284c7', faction: 'maritime', roleType: 'general' },
  { id: 'fig_nurhaci', name: '努爾哈赤', fallbackChar: '汗', era: '後金', color: '#ca8a04', faction: 'jin', roleType: 'monarch' },
  { id: 'fig_hong_taiji', name: '皇太極', fallbackChar: '極', era: '大清', color: '#a16207', faction: 'jin', roleType: 'monarch' },
  { id: 'fig_wu_sangui', name: '吳三桂', fallbackChar: '桂', era: '明清', color: '#475569', faction: 'other', roleType: 'general' }
];

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

// Ensure all figure avatars exist
YUAN_MING_FIGURES_DEF.forEach(f => {
  const jpgPath = path.join(targetDir, `${f.id}.jpg`);
  const svgPath = path.join(targetDir, `${f.id}.svg`);
  if (!fs.existsSync(jpgPath) && !fs.existsSync(svgPath)) {
    createSvgSeal(f, svgPath);
    console.log(`Created seal for ${f.id}`);
  }
});

console.log('All Yuan-Ming figure avatars ready!');
