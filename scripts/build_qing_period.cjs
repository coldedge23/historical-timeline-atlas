const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..', 'images', 'figures');

const QING_FIGURES_DEF = [
  { id: 'fig_shunzhi', name: '順治帝', fallbackChar: '臨', era: '大清', color: '#b45309', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_duorgon', name: '多爾袞', fallbackChar: '袞', era: '大清', color: '#78350f', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_xiaozhuang', name: '孝莊文皇后', fallbackChar: '莊', era: '大清', color: '#92400e', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_kangxi', name: '康熙帝', fallbackChar: '燁', era: '大清', color: '#ca8a04', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_aobai', name: '鰲拜', fallbackChar: '拜', era: '大清', color: '#713f12', faction: 'qing', roleType: 'general' },
  { id: 'fig_suoetu', name: '索額圖', fallbackChar: '圖', era: '大清', color: '#854d0e', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_zheng_chenggong', name: '鄭成功', fallbackChar: '功', era: '延平', color: '#dc2626', faction: 'ming', roleType: 'general' },
  { id: 'fig_shi_lang', name: '施琅', fallbackChar: '琅', era: '大清', color: '#ea580c', faction: 'qing', roleType: 'general' },
  { id: 'fig_galdan', name: '噶爾丹', fallbackChar: '丹', era: '準部', color: '#be185d', faction: 'zhun', roleType: 'monarch' },
  { id: 'fig_yongzheng', name: '雍正帝', fallbackChar: '禛', era: '大清', color: '#d97706', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_nian_gengyao', name: '年羹堯', fallbackChar: '堯', era: '大清', color: '#9a3412', faction: 'qing', roleType: 'general' },
  { id: 'fig_tian_wenjing', name: '田文鏡', fallbackChar: '鏡', era: '大清', color: '#854d0e', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_qianlong', name: '乾隆帝', fallbackChar: '曆', era: '大清', color: '#eab308', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_heshen', name: '和珅', fallbackChar: '珅', era: '大清', color: '#78350f', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_ji_xiaolan', name: '紀曉嵐', fallbackChar: '昀', era: '大清', color: '#059669', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_cao_xueqin', name: '曹雪芹', fallbackChar: '芹', era: '紅樓', color: '#7c3aed', faction: 'cultural', roleType: 'advisor' },
  { id: 'fig_jiaqing', name: '嘉慶帝', fallbackChar: '琰', era: '大清', color: '#ca8a04', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_daoguang', name: '道光帝', fallbackChar: '寧', era: '大清', color: '#b45309', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_lin_zexu', name: '林則徐', fallbackChar: '徐', era: '大清', color: '#dc2626', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_guan_tianpei', name: '關天培', fallbackChar: '培', era: '大清', color: '#991b1b', faction: 'qing', roleType: 'general' },
  { id: 'fig_xianfeng', name: '咸豐帝', fallbackChar: '詝', era: '大清', color: '#9a3412', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_cixi', name: '慈禧太后', fallbackChar: '禧', era: '大清', color: '#7f1d1d', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_hong_xiuquan', name: '洪秀全', fallbackChar: '全', era: '太平', color: '#e11d48', faction: 'taiping', roleType: 'monarch' },
  { id: 'fig_yang_xiuqing', name: '楊秀清', fallbackChar: '清', era: '太平', color: '#be123c', faction: 'taiping', roleType: 'general' },
  { id: 'fig_shi_dakai', name: '石達開', fallbackChar: '開', era: '太平', color: '#9f1239', faction: 'taiping', roleType: 'general' },
  { id: 'fig_zeng_guofan', name: '曾國藩', fallbackChar: '藩', era: '湘軍', color: '#ea580c', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_zuo_zongtang', name: '左宗棠', fallbackChar: '棠', era: '楚軍', color: '#c2410c', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_li_hongzhang', name: '李鴻章', fallbackChar: '章', era: '淮軍', color: '#b45309', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_zhang_zhidong', name: '張之洞', fallbackChar: '洞', era: '大清', color: '#ca8a04', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_liu_mingchuan', name: '劉銘傳', fallbackChar: '傳', era: '巡撫', color: '#dc2626', faction: 'qing', roleType: 'statesman' },
  { id: 'fig_deng_shichang', name: '鄧世昌', fallbackChar: '昌', era: '北洋', color: '#991b1b', faction: 'qing', roleType: 'general' },
  { id: 'fig_ding_ruchang', name: '丁汝昌', fallbackChar: '汝', era: '北洋', color: '#7f1d1d', faction: 'qing', roleType: 'general' },
  { id: 'fig_guangxu', name: '光緒帝', fallbackChar: '湉', era: '大清', color: '#f59e0b', faction: 'qing', roleType: 'monarch' },
  { id: 'fig_kang_youwei', name: '康有為', fallbackChar: '為', era: '維新', color: '#0284c7', faction: 'reform', roleType: 'advisor' },
  { id: 'fig_liang_qichao', name: '梁啟超', fallbackChar: '超', era: '新民', color: '#0369a1', faction: 'reform', roleType: 'advisor' },
  { id: 'fig_tan_sitong', name: '譚嗣同', fallbackChar: '同', era: '六君', color: '#dc2626', faction: 'reform', roleType: 'statesman' },
  { id: 'fig_yan_fu', name: '嚴復', fallbackChar: '復', era: '啟蒙', color: '#059669', faction: 'reform', roleType: 'advisor' },
  { id: 'fig_sun_yat_sen', name: '孫中山', fallbackChar: '文', era: '民國', color: '#2563eb', faction: 'republic', roleType: 'monarch' },
  { id: 'fig_huang_xing', name: '黃興', fallbackChar: '興', era: '民國', color: '#1d4ed8', faction: 'republic', roleType: 'general' },
  { id: 'fig_qiu_jin', name: '秋瑾', fallbackChar: '瑾', era: '鑑湖', color: '#be185d', faction: 'republic', roleType: 'statesman' },
  { id: 'fig_yuan_shikai', name: '袁世凱', fallbackChar: '凱', era: '北洋', color: '#475569', faction: 'republic', roleType: 'monarch' },
  { id: 'fig_li_yuanhong', name: '黎元洪', fallbackChar: '洪', era: '民國', color: '#334155', faction: 'republic', roleType: 'general' },
  { id: 'fig_puyi', name: '溥儀', fallbackChar: '儀', era: '宣統', color: '#78350f', faction: 'qing', roleType: 'monarch' }
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

QING_FIGURES_DEF.forEach(f => {
  const jpgPath = path.join(targetDir, `${f.id}.jpg`);
  const svgPath = path.join(targetDir, `${f.id}.svg`);
  if (!fs.existsSync(jpgPath) && !fs.existsSync(svgPath)) {
    createSvgSeal(f, svgPath);
    console.log(`Created seal for ${f.id}`);
  }
});

console.log('All Qing figure avatars ready!');
