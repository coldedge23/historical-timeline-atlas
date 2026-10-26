const fs = require('fs');
const path = require('path');

const FIGURES = [
  { id: 'fig_jp_imagawa_yoshimoto', name: '今川義元', crest: '今川赤鳥', char: '弓', color: '#be123c' },
  { id: 'fig_jp_saito_dosan', name: '齋藤道三', crest: '美濃二頭波', char: '蝮', color: '#b45309' },
  { id: 'fig_jp_shimazu_yoshihiro', name: '島津義弘', crest: '薩摩丸十字', char: '鬼', color: '#78350f' },
  { id: 'fig_jp_otomo_sorin', name: '大友宗麟', crest: '大友抱杏葉', char: '砲', color: '#9a3412' },
  { id: 'fig_jp_chosokabe_motochika', name: '長宗我部元親', crest: '七片酢漿草', char: '蝠', color: '#0e7490' },
  { id: 'fig_jp_shibata_katsuie', name: '柴田勝家', crest: '柴田二雁金', char: '猛', color: '#991b1b' },
  { id: 'fig_jp_maeda_toshiie', name: '前田利家', crest: '加賀加賀梅鉢', char: '槍', color: '#d97706' },
  { id: 'fig_jp_takenaka_hanbei', name: '竹中半兵衛', crest: '竹中九枚笹', char: '策', color: '#0284c7' },
  { id: 'fig_jp_tachibana_muneshige', name: '立花宗茂', crest: '立花祇園守', char: '無', color: '#b45309' },
  { id: 'fig_jp_naoe_kanetsugu', name: '直江兼續', crest: '米澤愛字兜', char: '愛', color: '#b91c1c' },
  { id: 'fig_jp_sanada_yukitaka', name: '真田幸隆', crest: '信濃六文錢', char: '攻', color: '#dc2626' },
  { id: 'fig_jp_azai_nagamasa', name: '淺井長政', crest: '三盛龜甲花菱', char: '義', color: '#2563eb' },
  { id: 'fig_jp_ii_naomasa', name: '井伊直政', crest: '井伊赤備橘', char: '鬼', color: '#dc2626' },
  { id: 'fig_jp_fukushima_masanori', name: '福島正則', crest: '賤岳七本槍', char: '剛', color: '#c2410c' },
  { id: 'fig_jp_mori_terumoto', name: '毛利輝元', crest: '一文字三星', char: '輝', color: '#15803d' },
  { id: 'fig_jp_tokugawa_hidetada', name: '德川秀忠', crest: '三葉葵紋', char: '法', color: '#854d0e' },
  { id: 'fig_jp_tokugawa_yoshimune', name: '德川吉宗', crest: '三葉葵享保', char: '米', color: '#854d0e' },
  { id: 'fig_jp_arai_hakuseki', name: '新井白石', crest: '正德之治', char: '儒', color: '#334155' },
  { id: 'fig_jp_chikamatsu_monzaemon', name: '近松門左衛門', crest: '元祿人形劇', char: '劇', color: '#475569' },
  { id: 'fig_jp_sugita_gempaku', name: '杉田玄白', crest: '蘭學解體書', char: '醫', color: '#0284c7' },
  { id: 'fig_jp_yoshida_shoin', name: '吉田松陰', crest: '松下村塾', char: '誠', color: '#991b1b' },
  { id: 'fig_jp_takasugi_shinsaku', name: '高杉晉作', crest: '長州奇兵隊', char: '狂', color: '#dc2626' },
  { id: 'fig_jp_kido_takayoshi', name: '木戶孝允', crest: '長州藩執政', char: '桂', color: '#15803d' },
  { id: 'fig_jp_okubo_toshimichi', name: '大久保利通', crest: '內務卿大久保', char: '邦', color: '#1e3a8a' },
  { id: 'fig_jp_katsu_kaishu', name: '勝海舟', crest: '幕臣海軍奉行', char: '舟', color: '#0284c7' },
  { id: 'fig_jp_tokugawa_yoshinobu', name: '德川慶喜', crest: '末代征夷將軍', char: '還', color: '#854d0e' },
  { id: 'fig_jp_kondo_isami', name: '近藤勇', crest: '新選組誠之旗', char: '誠', color: '#0284c7' },
  { id: 'fig_jp_okita_soji', name: '沖田總司', crest: '新選組一番隊', char: '劍', color: '#0284c7' },
  { id: 'fig_jp_itagaki_taisuke', name: '板垣退助', crest: '自由民權運動', char: '由', color: '#ea580c' },
  { id: 'fig_jp_okuma_shigenobu', name: '大隈重信', crest: '早稻田立憲', char: '學', color: '#0d9488' },
  { id: 'fig_jp_yamagata_aritomo', name: '山縣有朋', crest: '近代國軍元老', char: '軍', color: '#334155' },
  { id: 'fig_jp_shibusawa_eiichi', name: '澀澤榮一', crest: '資本主義之父', char: '商', color: '#d97706' }
];

const outDir = path.join(__dirname, '..', 'images', 'figures');

FIGURES.forEach(f => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <radialGradient id="bg_${f.id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a2018" />
      <stop offset="100%" stop-color="#0e0a07" />
    </radialGradient>
    <filter id="shadow_${f.id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <!-- Outer Rim Frame -->
  <circle cx="60" cy="60" r="56" fill="url(#bg_${f.id})" stroke="${f.color}" stroke-width="2.5" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="${f.color}" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>

  <!-- Japanese Kamon Outer Ring Accent -->
  <circle cx="60" cy="60" r="38" fill="none" stroke="${f.color}" stroke-width="1.8" opacity="0.85" />

  <!-- Clan Mon / Traditional Character Seal -->
  <text x="60" y="65" font-family="'Noto Serif TC', 'Songti TC', 'Kozuka Mincho Pro', 'Yu Mincho', serif" 
        font-size="28" font-weight="900" fill="${f.color}" text-anchor="middle" dominant-baseline="middle"
        filter="url(#shadow_${f.id})">
    ${f.char}
  </text>

  <!-- Top Clan / Faction Badge -->
  <rect x="25" y="8" width="70" height="15" rx="3" fill="#1c1611" stroke="${f.color}" stroke-width="1"/>
  <text x="60" y="19" font-family="'Noto Sans TC', sans-serif" font-size="8.5" font-weight="bold" fill="#fef08a" text-anchor="middle">
    ${f.crest}
  </text>

  <!-- Bottom Name Banner -->
  <rect x="14" y="94" width="92" height="17" rx="3" fill="#1c1611" stroke="${f.color}" stroke-width="1.2"/>
  <text x="60" y="106" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="9.5" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="0.5">
    ${f.name}
  </text>
</svg>`;

  const filePath = path.join(outDir, `${f.id}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
});

console.log(`Generated ${FIGURES.length} Japanese Kamon SVG seals in images/figures/`);
