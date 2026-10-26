const fs = require('fs');
const path = require('path');

const NEW_SENGOKU_FIGURES = [
  { id: 'fig_jp_kato_kiyomasa', name: '加藤清正', crest: '蛇之目紋', char: '虎', color: '#16a34a' },
  { id: 'fig_jp_ukita_hideie', name: '宇喜多秀家', crest: '兒文字紋', char: '兒', color: '#0284c7' },
  { id: 'fig_jp_otani_yoshitsugu', name: '大谷吉繼', crest: '對蝶紋', char: '刑', color: '#64748b' },
  { id: 'fig_jp_shima_sakon', name: '島左近', crest: '三葉柏紋', char: '鬼', color: '#b91c1c' },
  { id: 'fig_jp_katakura_kagetsuna', name: '片倉小十郎', crest: '九曜巴紋', char: '智', color: '#d97706' },
  { id: 'fig_jp_yamamoto_kansuke', name: '山本勘助', crest: '左三巴紋', char: '謀', color: '#78350f' },
  { id: 'fig_jp_yamagata_masakage', name: '山縣昌景', crest: '桔梗赤備', char: '赤', color: '#dc2626' },
  { id: 'fig_jp_baba_nobuharu', name: '馬場信春', crest: '花菱不死', char: '馬', color: '#b45309' },
  { id: 'fig_jp_takeda_katsuyori', name: '武田勝賴', crest: '武田菱紋', char: '賴', color: '#be123c' },
  { id: 'fig_jp_takeda_nobushige', name: '武田信繁', crest: '武田菱典廄', char: '繁', color: '#991b1b' },
  { id: 'fig_jp_kakizaki_kageie', name: '柿崎景家', crest: '越後七將', char: '先', color: '#0369a1' },
  { id: 'fig_jp_naoe_kageshuna', name: '直江景綱', crest: '上杉執政', char: '綱', color: '#0284c7' },
  { id: 'fig_jp_uesugi_kagekatsu', name: '上杉景勝', crest: '竹內二雀', char: '勝', color: '#0284c7' },
  { id: 'fig_jp_kobayakawa_takakage', name: '小早川隆景', crest: '左三巴隆景', char: '水', color: '#0d9488' },
  { id: 'fig_jp_kikkawa_motoharu', name: '吉川元春', crest: '吉川三文字', char: '武', color: '#15803d' },
  { id: 'fig_jp_murakami_takeyoshi', name: '村上武吉', crest: '能島上文字', char: '海', color: '#0369a1' },
  { id: 'fig_jp_amago_tsunehisa', name: '尼子經久', crest: '平四目結', char: '謀', color: '#2563eb' },
  { id: 'fig_jp_yamanaka_yukimori', name: '山中鹿介', crest: '三日月兜', char: '鹿', color: '#0284c7' },
  { id: 'fig_jp_ryuzoji_takanobu', name: '龍造寺隆信', crest: '十二日足', char: '熊', color: '#ea580c' },
  { id: 'fig_jp_nabeshima_naoshige', name: '鍋島直茂', crest: '鍋島杏葉', char: '佐', color: '#d97706' },
  { id: 'fig_jp_tachibana_dosetsu', name: '立花道雪', crest: '立花杏葉', char: '雷', color: '#b45309' },
  { id: 'fig_jp_takahashi_joun', name: '高橋紹運', crest: '一文字岩屋', char: '烈', color: '#b91c1c' },
  { id: 'fig_jp_shimazu_yoshihisa', name: '島津義久', crest: '丸十字龍', char: '久', color: '#78350f' },
  { id: 'fig_jp_shimazu_toshihisa', name: '島津歲久', crest: '丸十字智', char: '歲', color: '#78350f' },
  { id: 'fig_jp_shimazu_iehisa', name: '島津家久', crest: '丸十字捷', char: '伏', color: '#78350f' },
  { id: 'fig_jp_asakura_yoshikage', name: '朝倉義景', crest: '三盛木瓜', char: '景', color: '#475569' },
  { id: 'fig_jp_matsunaga_hisahide', name: '松永久秀', crest: '五階菱茶釜', char: '梟', color: '#991b1b' },
  { id: 'fig_jp_miyoshi_nagayoshi', name: '三好長慶', crest: '三引兩三好', char: '慶', color: '#334155' },
  { id: 'fig_jp_ashikaga_yoshiteru', name: '足利義輝', crest: '二引兩劍豪', char: '劍', color: '#ca8a04' },
  { id: 'fig_jp_tsukahara_bokuden', name: '塚原卜傳', crest: '新當流劍聖', char: '聖', color: '#d97706' },
  { id: 'fig_jp_kamiizumi_nobutsuna', name: '上泉信綱', crest: '新陰流開祖', char: '神', color: '#0284c7' },
  { id: 'fig_jp_yagyu_muneyoshi', name: '柳生石舟齋', crest: '柳生笹無刀', char: '柳', color: '#15803d' },
  { id: 'fig_jp_fuma_kotaro', name: '風魔小太郎', crest: '風魔暗忍', char: '風', color: '#475569' },
  { id: 'fig_jp_hattori_hanzo', name: '服部半藏', crest: '伊賀鬼半藏', char: '忍', color: '#1e293b' },
  { id: 'fig_jp_oichi_no_kata', name: '阿市夫人', crest: '戰國第一美', char: '市', color: '#f43f5e' },
  { id: 'fig_jp_yodo_dono', name: '淀殿 (茶茶)', crest: '大坂城淀殿', char: '茶', color: '#e11d48' },
  { id: 'fig_jp_nohime', name: '濃姬 (歸蝶)', crest: '美濃蝴蝶', char: '蝶', color: '#ec4899' },
  { id: 'fig_jp_nene_kodaiin', name: '北政所 (寧寧)', crest: '高台寺蒔繪', char: '寧', color: '#f59e0b' },
  { id: 'fig_jp_hosokawa_gracia', name: '細川伽羅奢', crest: '細川九曜十', char: '玉', color: '#6366f1' },
  { id: 'fig_jp_sen_no_rikyu', name: '千利休', crest: '佗茶宗匠', char: '茶', color: '#854d0e' }
];

const outDir = path.join(__dirname, '..', 'images', 'figures');

NEW_SENGOKU_FIGURES.forEach(f => {
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
  <rect x="22" y="8" width="76" height="15" rx="3" fill="#1c1611" stroke="${f.color}" stroke-width="1"/>
  <text x="60" y="19" font-family="'Noto Sans TC', sans-serif" font-size="8.5" font-weight="bold" fill="#fef08a" text-anchor="middle">
    ${f.crest}
  </text>

  <!-- Bottom Name Banner -->
  <rect x="12" y="94" width="96" height="17" rx="3" fill="#1c1611" stroke="${f.color}" stroke-width="1.2"/>
  <text x="60" y="106" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="9" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="0.5">
    ${f.name}
  </text>
</svg>`;

  const filePath = path.join(outDir, `${f.id}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
});

console.log(`Generated ${NEW_SENGOKU_FIGURES.length} Sengoku Kamon SVG seals in images/figures/`);
