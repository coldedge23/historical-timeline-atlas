const fs = require('fs');
const path = require('path');

const FIGURES_DIR = path.resolve(__dirname, '..', 'images', 'figures');
const JAPAN_DATA_DIR = path.resolve(__dirname, '..', 'src', 'data', 'japan');

if (!fs.existsSync(FIGURES_DIR)) fs.mkdirSync(FIGURES_DIR, { recursive: true });
if (!fs.existsSync(JAPAN_DATA_DIR)) fs.mkdirSync(JAPAN_DATA_DIR, { recursive: true });

// 1. Generate Japanese Classical Kamon (家紋) and Vector Seal Avatars
function generateJapanSvgSeal(id, name, clanTag, emblemChar, mainColor, bgColor) {
  const filePath = path.join(FIGURES_DIR, `${id}.svg`);
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <radialGradient id="bg_${id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#120e0b" />
    </radialGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>
  
  <!-- Outer Rim Frame -->
  <circle cx="60" cy="60" r="56" fill="url(#bg_${id})" stroke="${mainColor}" stroke-width="2.5" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="${mainColor}" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>

  <!-- Japanese Kamon Outer Ring Accent -->
  <circle cx="60" cy="60" r="38" fill="none" stroke="${mainColor}" stroke-width="1.8" opacity="0.85" />

  <!-- Clan Mon / Traditional Character Seal -->
  <text x="60" y="65" font-family="'Noto Serif TC', 'Songti TC', 'Kozuka Mincho Pro', 'Yu Mincho', serif" 
        font-size="28" font-weight="900" fill="${mainColor}" text-anchor="middle" dominant-baseline="middle"
        filter="url(#shadow_${id})">
    ${emblemChar}
  </text>

  <!-- Top Clan / Faction Badge -->
  <rect x="34" y="8" width="52" height="15" rx="3" fill="#1c1611" stroke="${mainColor}" stroke-width="1"/>
  <text x="60" y="19" font-family="'Noto Sans TC', sans-serif" font-size="8.5" font-weight="bold" fill="#fef08a" text-anchor="middle">
    ${clanTag}
  </text>

  <!-- Bottom Name Banner -->
  <rect x="18" y="94" width="84" height="17" rx="3" fill="#1c1611" stroke="${mainColor}" stroke-width="1.2"/>
  <text x="60" y="106" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="10" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="1">
    ${name}
  </text>
</svg>`;

  fs.writeFileSync(filePath, svg, 'utf8');
}

// 25 Iconic Japanese Historical Figures
const JAPAN_FIGURES_DATA = [
  // --- ERA 1: Ancient & Medieval ---
  {
    id: "fig_jp_shotoku",
    name: "聖德太子",
    courtesyName: "廄戶皇子 / 豐聰耳",
    lifeSpan: "574 - 622",
    faction: "ancient",
    clanTag: "飛鳥皇室",
    emblemChar: "德",
    mainColor: "#fbbf24",
    bgColor: "#451a03",
    role: "飛鳥時代攝政 / 十七條憲法與冠位十二階制訂者",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_shotoku.svg",
    importance: 5,
    hometown: "大和國斑鳩 (今奈良縣生駒郡)",
    shortBio: "飛鳥時代推古天皇攝政。積極汲取隋唐盛世文化，派遣遣隋使小野妹子出使中國，制定「冠位十二階」唯才是舉，頒布日本歷史首部成文法典《十七條憲法》，興建法隆寺大弘佛法，被尊為日本文明啟蒙之祖。",
    historicalSignificance: "奠定日本中央集權國家體系與佛教文化根基，開創自主外交之偉大政治家。",
    abilities: { strategy: 92, commanding: 80, politics: 99, intellect: 98, courage: 85, charisma: 99 }
  },
  {
    id: "fig_jp_minamoto_yoritomo",
    name: "源賴朝",
    courtesyName: "武家棟梁 / 鎌倉殿",
    lifeSpan: "1147 - 1199",
    faction: "kamakura",
    clanTag: "清和源氏",
    emblemChar: "源",
    mainColor: "#f59e0b",
    bgColor: "#312e81",
    role: "鎌倉幕府初代征夷大將軍 / 武家政權創始人",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_minamoto_yoritomo.svg",
    importance: 5,
    hometown: "尾張國熱田 (今愛知縣名古屋)",
    shortBio: "清和源氏嫡流。流放伊豆二十載，得北條氏襄助舉兵討伐平氏。指派異母弟源義經於壇之浦徹底滅亡平家。後設立守護、地頭制度掌握軍政實權，1192年受朝廷冊封征夷大將軍建立鎌倉幕府，開啟日本武士掌權近七百年歷史。",
    historicalSignificance: "開創日本近七百年武家幕府政治體制之始祖，奠定御家人主從制度。",
    abilities: { strategy: 94, commanding: 89, politics: 98, intellect: 93, courage: 88, charisma: 96 }
  },
  {
    id: "fig_jp_minamoto_yoshitsune",
    name: "源義經",
    courtesyName: "九郎判官 / 鞍馬遮那王",
    lifeSpan: "1159 - 1189",
    faction: "kamakura",
    clanTag: "清和源氏",
    emblemChar: "義",
    mainColor: "#38bdf8",
    bgColor: "#1e1b4b",
    role: "源平合戰天才戰神 / 日本三大悲劇英雄",
    roleType: "general",
    avatar: "./images/figures/fig_jp_minamoto_yoshitsune.svg",
    importance: 5,
    hometown: "山城國鞍馬山 (今京都府)",
    shortBio: "幼名牛若丸。投奔奧州藤原氏後與兄長源賴朝起兵。一之谷會戰率精騎自懸崖「鵯越落石」奇襲破敵；屋島會戰奇襲平家本陣；壇之浦大決戰以「八艘跳」一舉滅亡平氏一族。後遭兄長猜忌追殺，最後於奧州衣川館英勇自盡，留下「判官贔屓」傳世悲情美學。",
    historicalSignificance: "日本軍事史上最具傳奇色彩之野戰戰術天才，武士美學之終極象徵。",
    abilities: { strategy: 97, commanding: 99, politics: 58, intellect: 84, courage: 100, charisma: 98 }
  },
  {
    id: "fig_jp_hojo_tokimune",
    name: "北條時宗",
    courtesyName: "相模守 / 鎌倉第八代執權",
    lifeSpan: "1251 - 1284",
    faction: "kamakura",
    clanTag: "北條得宗",
    emblemChar: "時",
    mainColor: "#10b981",
    bgColor: "#064e3b",
    role: "鎌倉幕府執權 / 抗擊大元蒙古忽必烈兩度侵日",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_hojo_tokimune.svg",
    importance: 5,
    hometown: "相模國鎌倉 (今神奈川縣鎌倉市)",
    shortBio: "十八歲就任執權。面對忽必烈大軍兩度東征文永、弘安之役，時宗毫無懼色，斬殺元使立誓血戰。在博多灣構築二十公里石壘堅守，指揮九州與各國武士在狂風暴雨（神風）配合下徹底粉碎蒙元十四萬遠征大軍，保全日本疆土國祚。",
    historicalSignificance: "日本面對外敵生死存亡之際挽狂瀾於既倒之鐵腕領袖，禪宗護國實踐者。",
    abilities: { strategy: 95, commanding: 96, politics: 95, intellect: 91, courage: 100, charisma: 97 }
  },
  {
    id: "fig_jp_ashikaga_yoshimitsu",
    name: "足利義滿",
    courtesyName: "鹿苑院殿 / 日本國王",
    lifeSpan: "1358 - 1408",
    faction: "muromachi",
    clanTag: "室町幕府",
    emblemChar: "滿",
    mainColor: "#eab308",
    bgColor: "#713f12",
    role: "室町幕府第三代將軍 / 南北朝統一與北山文化創始者",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_ashikaga_yoshimitsu.svg",
    importance: 5,
    hometown: "山城國京都室町 (今京都府)",
    shortBio: "十歲繼位將軍。成功結束半世紀之南北朝分裂重歸統一，壓制守護大名兼任太政大臣達到公武合一頂點。與明太祖、明成祖展開勘合貿易獲冊封「日本國王」，興建金閣寺開創融匯武家、公家與禪宗之絢爛「北山文化」。",
    historicalSignificance: "室町幕府權威最巔峰之奠基者，中日朝貢貿易與日本中世美學全盛推手。",
    abilities: { strategy: 94, commanding: 88, politics: 99, intellect: 97, courage: 89, charisma: 98 }
  },

  // --- ERA 2: Sengoku Warring States ---
  {
    id: "fig_jp_oda_nobunaga",
    name: "織田信長",
    courtesyName: "尾張大傻瓜 / 第六天魔王",
    lifeSpan: "1534 - 1582",
    faction: "oda",
    clanTag: "織田木瓜",
    emblemChar: "天",
    mainColor: "#ef4444",
    bgColor: "#450a0a",
    role: "戰國三英傑之首 / 天下布武打破封建體制開創者",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_oda_nobunaga.svg",
    importance: 5,
    hometown: "尾張國那古野城 (今愛知縣名古屋)",
    shortBio: "打破傳統的戰國天才霸主。桶狹間之戰率兩千輕騎暴風雨中斬殺今川義元震驚列島；長篠之戰首創設防木柵與三段火繩槍輪射全殲武田無敵赤備；推行樂市樂座兵農分離，建造壯麗安土城。距平定天下咫尺之遙時，遭明智光秀於本能寺奇襲兵敗自盡，留下「人間五十年，下天光陰幾何」之絕唱。",
    historicalSignificance: "徹底摧毀中世紀封建割據、推動日本走向統一與現代化火器革命之劃時代巨擘。",
    abilities: { strategy: 98, commanding: 99, politics: 97, intellect: 96, courage: 100, charisma: 100 }
  },
  {
    id: "fig_jp_takeda_shingen",
    name: "武田信玄",
    courtesyName: "甲斐之虎 / 風林火山",
    lifeSpan: "1521 - 1573",
    faction: "takeda",
    clanTag: "武田菱",
    emblemChar: "虎",
    mainColor: "#dc2626",
    bgColor: "#7f1d1d",
    role: "戰國第一軍學大師 / 赤備騎兵統帥 / 戰國名將",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_takeda_shingen.svg",
    importance: 5,
    hometown: "甲斐國躑躅崎館 (今山梨縣甲府市)",
    shortBio: "孫子兵法「疾如風、徐如林、侵掠如火、不動如山」旗號聞名天下。五度於川中島與上杉謙信激戰，其赤備騎兵威震關東列島；修築信玄堤造福百姓，推行《甲州法度之次第》。西上作戰於三方原之戰將青年德川家康殺得潰不成軍，惜病逝於進京途中。",
    historicalSignificance: "戰國時代野戰指揮最高水準代表，甲州流軍學與水利治國一代宗師。",
    abilities: { strategy: 99, commanding: 100, politics: 95, intellect: 94, courage: 97, charisma: 99 }
  },
  {
    id: "fig_jp_uesugi_kenshin",
    name: "上杉謙信",
    courtesyName: "越後之龍 / 毘沙門天化身",
    lifeSpan: "1530 - 1578",
    faction: "uesugi",
    clanTag: "毘沙門",
    emblemChar: "毘",
    mainColor: "#38bdf8",
    bgColor: "#0c4a6e",
    role: "戰國第一義將 / 車懸之陣創始人 / 軍神",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_uesugi_kenshin.svg",
    importance: 5,
    hometown: "越後國春日山城 (今新潟縣上越市)",
    shortBio: "篤信佛教毘沙門天，戰旗高揚「毘」與「龍」。一生作戰絕不為私利掠奪土地，受託救援出兵，義贈食鹽予敵國武田信玄；第四次川中島單騎直突武田本陣揮刀砍信玄；手取川之戰大破織田家柴田勝家主力。治下越後青苧紡織富甲一方，被尊為戰國軍神。",
    historicalSignificance: "武士道「義理」最高化身，戰國混亂時代最純粹高潔之軍神楷模。",
    abilities: { strategy: 98, commanding: 100, politics: 86, intellect: 90, courage: 100, charisma: 99 }
  },
  {
    id: "fig_jp_hojo_ujiyasu",
    name: "北條氏康",
    courtesyName: "相模之獅 / 相州之雄",
    lifeSpan: "1515 - 1571",
    faction: "sengoku_warlords",
    clanTag: "後北條",
    emblemChar: "相",
    mainColor: "#a855f7",
    bgColor: "#3b0764",
    role: "後北條氏第三代當主 / 河越夜戰創造者 / 關東霸主",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_hojo_ujiyasu.svg",
    importance: 5,
    hometown: "相模國小田原城 (今神奈川縣小田原市)",
    shortBio: "後北條氏全盛奠基者。河越夜戰以八千精兵冒雨突襲八萬關東聯軍，創造日本三大奇襲之一；修築難攻不落天下第一要塞小田原城，先後抵禦武田信玄與上杉謙信親率主力圍城；首創公事免除與檢地賦稅制度深得民心。",
    historicalSignificance: "智勇仁三全之關東霸主，後北條氏五代百年基業核心支柱。",
    abilities: { strategy: 96, commanding: 96, politics: 98, intellect: 93, courage: 94, charisma: 96 }
  },
  {
    id: "fig_jp_mori_motonari",
    name: "毛利元就",
    courtesyName: "戰國第一謀將 / 中國之雄",
    lifeSpan: "1497 - 1571",
    faction: "sengoku_warlords",
    clanTag: "一文字三星",
    emblemChar: "謀",
    mainColor: "#15803d",
    bgColor: "#14532d",
    role: "西國安芸毛利氏當主 / 嚴島海戰奇蹟統帥",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_mori_motonari.svg",
    importance: 5,
    hometown: "安芸國吉田郡山城 (今廣島縣安藝高田市)",
    shortBio: "從吉田郡山小小國人起家。吉田郡山籠城破尼子三十萬大軍；嚴島合戰以四千奇兵暴風雨中浮海夜襲，全殲陶晴賢兩萬強敵；消滅大內、尼子兩大豪強稱霸中國十國。「三矢之訓」告誡子孫團結同心，保全毛利家屹立三百年至幕末維新。",
    historicalSignificance: "戰國謀略算計之最高巔峰，以少勝多、謀定而後動之一代智帥。",
    abilities: { strategy: 100, commanding: 97, politics: 96, intellect: 98, courage: 90, charisma: 94 }
  },
  {
    id: "fig_jp_akechi_mitsuhide",
    name: "明智光秀",
    courtesyName: "惟任日向守 / 金剛寺茶人",
    lifeSpan: "1528 - 1582",
    faction: "oda",
    clanTag: "明智桔梗",
    emblemChar: "光",
    mainColor: "#3b82f6",
    bgColor: "#1e3a8a",
    role: "織田家頭號智將 / 本能寺之變發動者",
    roleType: "general",
    avatar: "./images/figures/fig_jp_akechi_mitsuhide.svg",
    importance: 5,
    hometown: "美濃國可兒郡 (今岐阜縣)",
    shortBio: "精通築城、連歌茶道與鐵砲軍學。為織田信長攻克丹波、平定近畿居功厥偉，修築坂本城與福知山城。1582年受命支援羽柴秀吉西征，於龜山誓師「敵在本能寺！」，發動兵變迫死信長。隨後於山崎之戰不敵秀吉「中國大返還」之迅猛反擊，敗退小栗棲途中遇伏身亡。",
    historicalSignificance: "徹底扭轉戰國與安土桃山歷史走向之樞紐人物，文武雙全之悲劇將領。",
    abilities: { strategy: 95, commanding: 95, politics: 94, intellect: 97, courage: 91, charisma: 88 }
  },
  {
    id: "fig_jp_honda_tadakatsu",
    name: "本多忠勝",
    courtesyName: "德川四天王之首 / 花實兼備",
    lifeSpan: "1548 - 1610",
    faction: "tokugawa",
    clanTag: "三葉立葵",
    emblemChar: "忠",
    mainColor: "#eab308",
    bgColor: "#422006",
    role: "德川第一名將 / 蜻蛉切名槍戰神",
    roleType: "general",
    avatar: "./images/figures/fig_jp_honda_tadakatsu.svg",
    importance: 5,
    hometown: "三河國額田郡 (今愛知縣岡崎市)",
    shortBio: "手持天下三名槍「蜻蛉切」，鹿角兜威震四方。一生歷經姊川、三方原、長篠、小牧長久手與關原之戰大小五十七戰，斬將拔旗無數而「身無分文創傷」。織田信長盛讚「日本之張飛」，豐臣秀吉歎為「東國第一勇士、花實兼備之將」。",
    historicalSignificance: "德川家康統一天下之頭號猛將支柱，武勇絕頂而毫髮無損之傳奇戰神。",
    abilities: { strategy: 86, commanding: 98, politics: 79, intellect: 82, courage: 100, charisma: 97 }
  },

  // --- ERA 3: Azuchi-Momoyama ---
  {
    id: "fig_jp_toyotomi_hideyoshi",
    name: "豐臣秀吉",
    courtesyName: "猴子 / 羽柴秀吉 / 太閤殿下",
    lifeSpan: "1537 - 1598",
    faction: "toyotomi",
    clanTag: "五七桐紋",
    emblemChar: "豐",
    mainColor: "#f59e0b",
    bgColor: "#78350f",
    role: "戰國三英傑之二 / 天下一統關白太閤 / 日輪之子",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_toyotomi_hideyoshi.svg",
    importance: 5,
    hometown: "尾張國愛知郡中村 (今愛知縣名古屋)",
    shortBio: "從底層草履小廝奇蹟崛起。墨俁一夜城展現驚人工程神速；本能寺變後以「中國大返還」狂飆二百公里於山崎殲滅光秀；平定四國、九州與小田原終結戰國百年紛爭統一日本。推行「太閤檢地」與「刀狩令」奠定近代身分制度，興建大阪城金碧輝煌。",
    historicalSignificance: "世界歷史最傳奇之平民逆襲為一國至尊最高統治者，奠定近世日本體制基礎。",
    abilities: { strategy: 99, commanding: 98, politics: 100, intellect: 97, courage: 95, charisma: 100 }
  },
  {
    id: "fig_jp_tokugawa_ieyasu",
    name: "德川家康",
    courtesyName: "竹千代 / 東照大權現",
    lifeSpan: "1543 - 1616",
    faction: "tokugawa",
    clanTag: "三葉葵紋",
    emblemChar: "葵",
    mainColor: "#ca8a04",
    bgColor: "#1e1b4b",
    role: "戰國三英傑之終 / 江戶幕府初代將軍 / 二百六十年基業奠定者",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tokugawa_ieyasu.svg",
    importance: 5,
    hometown: "三河國岡崎城 (今愛知縣岡崎市)",
    shortBio: "早年歷經今川氏質子磨難。與織田信長結成清洲同盟堅定守望二十年；小牧長久手之戰擊挫秀吉威名；關原合戰統御東軍一天之內贏得天下；大坂冬夏之陣徹底掃平最後後患。1603年就任征夷大將軍建立江戶幕府，以極致忍耐與宏大制度開創日本二百六十年承平盛世。",
    historicalSignificance: "日本歷史最偉大之制度架構師與統一天下者，終結百年動盪奠定江戶繁榮。",
    abilities: { strategy: 98, commanding: 98, politics: 100, intellect: 97, courage: 96, charisma: 99 }
  },
  {
    id: "fig_jp_ishida_mitsunari",
    name: "石田三成",
    courtesyName: "治部少輔 / 大一大萬大吉",
    lifeSpan: "1560 - 1600",
    faction: "toyotomi",
    clanTag: "大一大吉",
    emblemChar: "三",
    mainColor: "#6366f1",
    bgColor: "#312e81",
    role: "豐臣政權五奉行之首 / 關原西軍實質統帥",
    roleType: "advisor",
    avatar: "./images/figures/fig_jp_ishida_mitsunari.svg",
    importance: 5,
    hometown: "近江國坂田郡石田村 (今滋賀縣長濱市)",
    shortBio: "三獻茶得秀吉賞識提拔。主管太閤檢地與全國後勤補給，算術精敏公正無私；秀吉臨終託孤，誓死捍衛幼主秀賴。為阻擋德川家康奪權，串聯毛利、宇喜多、上杉合組西軍十萬大軍於關原決戰。戰敗被俘臨刑前泰然自若，絕不屈服從容赴死。",
    historicalSignificance: "豐臣氏政權最忠貞不二之支柱，「大一大萬大吉（萬人為一人，一人為天下）」崇高理想實踐者。",
    abilities: { strategy: 93, commanding: 88, politics: 99, intellect: 98, courage: 91, charisma: 90 }
  },
  {
    id: "fig_jp_sanada_masayuki",
    name: "真田昌幸",
    courtesyName: "安房守 / 表裏比興之名將",
    lifeSpan: "1547 - 1611",
    faction: "sengoku_warlords",
    clanTag: "六文錢",
    emblemChar: "昌",
    mainColor: "#b91c1c",
    bgColor: "#450a0a",
    role: "信濃上田城主 / 兩度重挫德川主力之防禦大師",
    roleType: "general",
    avatar: "./images/figures/fig_jp_sanada_masayuki.svg",
    importance: 5,
    hometown: "信濃國小縣郡 (今長野縣上田市)",
    shortBio: "真田幸村之父。周旋於武田、織田、上杉、德川、北條五大強權夾縫中，以極高政治手腕保全家族。第一次上田合戰以兩千老弱城下設伏大破德川七千大軍；第二次上田合戰關原前夕拖延德川秀忠三萬八千大軍無法及時趕赴主戰場。家康讚其「表裏第一不可輕忽之敵」。",
    historicalSignificance: "戰國時代防守戰與游擊戰術之神，以弱勝強、智謀絕倫之名帥楷模。",
    abilities: { strategy: 99, commanding: 98, politics: 94, intellect: 97, courage: 96, charisma: 95 }
  },
  {
    id: "fig_jp_kuroda_kanbei",
    name: "黑田官兵衛",
    courtesyName: "黑田孝高 / 黑田如水",
    lifeSpan: "1546 - 1604",
    faction: "toyotomi",
    clanTag: "黑田黑餅",
    emblemChar: "水",
    mainColor: "#0ea5e9",
    bgColor: "#082f49",
    role: "豐臣秀吉第一謀臣 / 天下第一軍師",
    roleType: "advisor",
    avatar: "./images/figures/fig_jp_kuroda_kanbei.svg",
    importance: 5,
    hometown: "播磨國姬路 (今兵庫縣姬路市)",
    shortBio: "與竹中半兵衛並稱「豐臣二兵衛」。遭荒木村重囚禁有岡城地牢一年致腿跛而志氣不減。本能寺變後第一時間向秀吉進言「此乃奪取天下之良機」，策劃「中國大返還」功高震主。關原之戰時乘虛席捲九州大半，家康對其忌憚萬分。",
    historicalSignificance: "戰國時代最深不可測、兼具戰略遠見與戰術執行力之天才大軍師。",
    abilities: { strategy: 100, commanding: 95, politics: 94, intellect: 99, courage: 94, charisma: 95 }
  },
  {
    id: "fig_jp_date_masamune",
    name: "伊達政宗",
    courtesyName: "獨眼龍政宗 / 梵天丸",
    lifeSpan: "1567 - 1636",
    faction: "sengoku_warlords",
    clanTag: "竹雀三日月",
    emblemChar: "龍",
    mainColor: "#eab308",
    bgColor: "#1c1917",
    role: "伊達家第十七代當主 / 奧羽霸主 / 仙台藩祖",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_date_masamune.svg",
    importance: 5,
    hometown: "出羽國米澤城 (今山形縣米澤市)",
    shortBio: "幼患天花右眼失明。人取橋之戰臨危不亂，摺上原之戰一舉稱霸南奧羽；小田原之役穿喪服伏見秀吉巧化死劫；關原之役支持家康立下大功，開拓仙台藩六十二萬石繁華基業。派遣遣歐使節團遠赴羅馬晉見教宗，兼具國際視野與戰國豪俠氣魄。",
    historicalSignificance: "戰國最晚熟之英雄梟雄，留下一句「願早生二十年以圖天下」之千古慨嘆。",
    abilities: { strategy: 95, commanding: 96, politics: 95, intellect: 94, courage: 98, charisma: 99 }
  },

  // --- ERA 4: Edo Shogunate ---
  {
    id: "fig_jp_sanada_yukimura",
    name: "真田幸村",
    courtesyName: "真田信繁 / 日本第一兵",
    lifeSpan: "1567 - 1615",
    faction: "toyotomi",
    clanTag: "真田六文錢",
    emblemChar: "真",
    mainColor: "#dc2626",
    bgColor: "#450a0a",
    role: "戰國最後武士 / 大坂城赤備防衛統帥 / 日本第一兵",
    roleType: "general",
    avatar: "./images/figures/fig_jp_sanada_yukimura.svg",
    importance: 5,
    hometown: "信濃國上田 (九度山蟄居十四載)",
    shortBio: "真田昌幸次子。大坂冬之陣構築出丸要塞「真田丸」，以鐵砲狂瀾重創德川數萬先鋒部隊名揚天下；夏之陣天王寺決戰，幸村抱必死決心統率三千赤備精騎，如怒濤般三度衝破德川十五萬大軍重重軍陣，殺至德川家康本陣馬印傾倒、逼得家康幾欲切腹。力竭戰死於茶臼山，島津義弘盛讚為「日本第一兵」。",
    historicalSignificance: "日本武士道黃金時代最後、最悲壯絢爛之絕唱，萬人景仰之英雄戰神。",
    abilities: { strategy: 97, commanding: 99, politics: 72, intellect: 88, courage: 100, charisma: 100 }
  },
  {
    id: "fig_jp_tokugawa_iemitsu",
    name: "德川家光",
    courtesyName: "竹千代 / 第三代將軍",
    lifeSpan: "1604 - 1651",
    faction: "tokugawa",
    clanTag: "三葉葵紋",
    emblemChar: "光",
    mainColor: "#eab308",
    bgColor: "#3f2c00",
    role: "江戶幕府第三代將軍 / 參勤交代與鎖國體制奠基人",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tokugawa_iemitsu.svg",
    importance: 5,
    hometown: "武藏國江戶城 (今東京都)",
    shortBio: "宣告「生於將軍之家」，徹底奠定將軍至高權威。制定嚴苛之「參勤交代」制度削弱諸藩大名財力兵力；平定島原之亂後頒布鎖國令五道，限制外貿於長崎出島，全面禁絕天主教傳播，構築起江戶二百餘年牢不可破之幕藩統治秩序。",
    historicalSignificance: "江戶幕府中央集權封建體制最關鍵之完形締造者。",
    abilities: { strategy: 92, commanding: 92, politics: 98, intellect: 91, courage: 94, charisma: 95 }
  },
  {
    id: "fig_jp_miyamoto_musashi",
    name: "宮本武藏",
    courtesyName: "新免玄信 / 二天一流創始人",
    lifeSpan: "1584 - 1645",
    faction: "edo",
    clanTag: "二天一流",
    emblemChar: "劍",
    mainColor: "#64748b",
    bgColor: "#0f172a",
    role: "天下無雙劍聖 / 二天一流劍豪 / 《五輪書》作者",
    roleType: "general",
    avatar: "./images/figures/fig_jp_miyamoto_musashi.svg",
    importance: 5,
    hometown: "播磨國宮本村 (今兵庫縣)",
    shortBio: "十三歲起歷經六十餘度生死比試未嘗一敗。京都一乘寺垂松大戰吉岡一門數十人；巖流島決戰以四尺木刀智破佐佐木小次郎名動天下。晚年蟄居熊本靈巖洞著《五輪書》（地水火風空），精通水墨畫與兵法，被公認為日本歷史最高劍聖。",
    historicalSignificance: "日本劍道哲學與兵法思維之集大成者，世界知名的劍聖符號。",
    abilities: { strategy: 96, commanding: 85, politics: 60, intellect: 96, courage: 100, charisma: 97 }
  },

  // --- ERA 5: Bakumatsu ---
  {
    id: "fig_jp_sakamoto_ryoma",
    name: "坂本龍馬",
    courtesyName: "直柔 / 海援隊長 / 船中八策",
    lifeSpan: "1836 - 1867",
    faction: "bakumatsu",
    clanTag: "海援隊",
    emblemChar: "龍",
    mainColor: "#38bdf8",
    bgColor: "#082f49",
    role: "薩長同盟撮合者 / 海援隊創始人 / 日本近代國家概念奠基人",
    roleType: "advisor",
    avatar: "./images/figures/fig_jp_sakamoto_ryoma.svg",
    importance: 5,
    hometown: "土佐國高知城下 (今高知縣高知市)",
    shortBio: "脫離土佐藩追尋新思潮。創辦日本第一家股份貿易公司兼私設海軍「龜山社中（海援隊）」；以過人胸襟化解薩摩與長州世仇促成「薩長同盟」；在夕顏丸船上提出推翻幕府和平過渡之「船中八策」，促成大政奉還建立現代兩院議會架構。於京都近江屋遭暗殺壯烈殉國。",
    historicalSignificance: "日本邁入現代世界第一奇男子，以非暴力商業與外交智慧推進明治維新革命。",
    abilities: { strategy: 99, commanding: 88, politics: 99, intellect: 98, courage: 99, charisma: 100 }
  },
  {
    id: "fig_jp_saigo_takamori",
    name: "西鄉隆盛",
    courtesyName: "吉之助 / 南洲翁",
    lifeSpan: "1828 - 1877",
    faction: "bakumatsu",
    clanTag: "薩摩島津",
    emblemChar: "西",
    mainColor: "#f97316",
    bgColor: "#431407",
    role: "維新三傑之首 / 江戶無血開城元勳 / 日本最後武士",
    roleType: "general",
    avatar: "./images/figures/fig_jp_saigo_takamori.svg",
    importance: 5,
    hometown: "薩摩國鹿兒島 (今鹿兒島縣)",
    shortBio: "兩度流放孤島磨礪出金石之志。掌握薩摩藩軍事大權，與勝海舟會談達成江戶城「無血開城」免去京都江戶兵燹之災；官至陸軍大將推動廢藩置縣。因「征韓論」受挫辭官回鄉創立私學校。西南戰爭為士族名譽起義，兵敗於城山切腹，世人萬分敬仰尊為「最後的武士」。",
    historicalSignificance: "日本近代史上人格魅力最崇高之精神領袖，維新建國最高軍事統帥。",
    abilities: { strategy: 95, commanding: 100, politics: 92, intellect: 90, courage: 100, charisma: 100 }
  },
  {
    id: "fig_jp_hijikata_toshizo",
    name: "土方歲三",
    courtesyName: "鬼之副長 / 歲三",
    lifeSpan: "1835 - 1869",
    faction: "shinsengumi",
    clanTag: "新選組",
    emblemChar: "誠",
    mainColor: "#06b6d4",
    bgColor: "#164e63",
    role: "新選組副長 / 幕末最後幕臣 / 箱館五稜郭陸軍奉行並",
    roleType: "general",
    avatar: "./images/figures/fig_jp_hijikata_toshizo.svg",
    importance: 5,
    hometown: "武藏國多摩郡 (今東京都日野市)",
    shortBio: "以嚴苛軍規鐵律打造令尊攘志士聞風喪膽之「新選組」；池田屋事件平定叛亂名動天下。鳥羽伏見戰敗後轉戰會津、宮古灣，率殘部渡海建立蝦夷共和國五稜郭要塞。五稜郭決戰單槍匹馬馳援弁天台場，於一本木關門中彈壯烈成仁，被譽為「幕末最瀟灑之最後武士」。",
    historicalSignificance: "新選組靈魂核心，堅持武士道信念至最後一刻之永恆傳奇象徵。",
    abilities: { strategy: 94, commanding: 97, politics: 80, intellect: 90, courage: 100, charisma: 100 }
  },

  // --- ERA 6: Meiji & Modern ---
  {
    id: "fig_jp_ito_hirobumi",
    name: "伊藤博文",
    courtesyName: "俊輔 / 春畝",
    lifeSpan: "1841 - 1909",
    faction: "meiji",
    clanTag: "明治元老",
    emblemChar: "博",
    mainColor: "#3b82f6",
    bgColor: "#1e3a8a",
    role: "日本首任內閣總理大臣 / 《大日本帝國憲法》起草者",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_ito_hirobumi.svg",
    importance: 5,
    hometown: "長州國周防 (今山口縣光市)",
    shortBio: "松下村塾門生，長州五傑留英青年。歷任四屆內閣總理大臣，遠赴歐洲考察俾斯麥憲政，主持起草亞洲第一部近代憲法《大日本帝國憲法》；簽署中日《馬關條約》；後出任首任韓國統監，1909年於哈爾濱車站遇刺殉職。",
    historicalSignificance: "近代日本憲政體制奠基元勳，引導日本躋身世界列強之首席文官首相。",
    abilities: { strategy: 95, commanding: 80, politics: 100, intellect: 98, courage: 92, charisma: 97 }
  },
  {
    id: "fig_jp_fukuzawa_yukichi",
    name: "福澤諭吉",
    courtesyName: "慶應義塾創始人 / 一萬日圓肖像",
    lifeSpan: "1835 - 1901",
    faction: "meiji",
    clanTag: "啟蒙思想",
    emblemChar: "福",
    mainColor: "#eab308",
    bgColor: "#451a03",
    role: "日本近代啟蒙思想之父 / 慶應義塾大學創立者 / 《勸學篇》作者",
    roleType: "advisor",
    avatar: "./images/figures/fig_jp_fukuzawa_yukichi.svg",
    importance: 5,
    hometown: "豐前國中津藩 (今大分縣中津市)",
    shortBio: "精通蘭學與英語，三度出訪歐美。撰寫《西洋事情》、《勸學篇》（「天不造人上之人，亦不造人下之人」）風靡全日本發行逾三百萬冊；創立慶應義塾大學與《時事新報》，提倡獨立自尊與實學科學，為現代日本國民精神之奠基者。",
    historicalSignificance: "開啟現代日本文明開化與理性自由精神之最高思想啟蒙宗師。",
    abilities: { strategy: 96, commanding: 70, politics: 95, intellect: 100, courage: 97, charisma: 100 }
  },
  {
    id: "fig_jp_togo_heihachiro",
    name: "東鄉平八郎",
    courtesyName: "東洋納爾遜 / 軍神",
    lifeSpan: "1848 - 1934",
    faction: "meiji",
    clanTag: "帝國海軍",
    emblemChar: "東",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "聯合艦隊司令長官 / 對馬海峽海戰全勝海軍元帥",
    roleType: "general",
    avatar: "./images/figures/fig_jp_togo_heihachiro.svg",
    importance: 5,
    hometown: "薩摩國鹿兒島 (今鹿兒島縣)",
    shortBio: "薩摩出身，留學英國格林威治海軍學院七載。日俄戰爭出任聯合艦隊司令長官，旗艦三笠號升起「Z字旗（皇國興廢在此一戰，各員奮勇努力）」，首創大角度「東鄉丁字戰法」，以壓倒性優勢全殲俄國波羅的海艦隊，震驚全球近代海戰史，被西方譽為「東方納爾遜」。",
    historicalSignificance: "近代亞洲首次在現代海軍戰役中徹底擊潰歐洲列強艦隊之一代海軍軍神。",
    abilities: { strategy: 98, commanding: 100, politics: 82, intellect: 94, courage: 100, charisma: 99 }
  }
];

// 20 Authoritative Battles across Japanese History
const JAPAN_BATTLES_DATA = [
  {
    id: "bat_jp_dannoura_1185",
    eraId: "jp_ancient_medieval",
    name: "壇之浦海戰 (源平合戰平家滅亡大決戰)",
    year: 1185,
    period: "japanAtlas",
    locationAncient: "長門國壇之浦海面",
    locationModern: "山口縣下關市關門海峽壇之浦",
    coordinates: [130.95, 33.96],
    parties: {
      invader: "平氏水師主力 (平宗盛、平知盛率五百艘戰船)",
      defender: "源氏追討水師 (源義經統帥八百艘戰船)"
    },
    victor: "源義經指揮源氏水師輝煌全勝",
    victorStatement: "源義經神速八艘跳穿梭亂陣，平知盛背負鐵錨投海自盡，平氏一族覆亡",
    commanders: {
      invader: ["平宗盛", "平知盛"],
      defender: ["源義經", "田所四郎"]
    },
    summary: "1185年源義經統帥源氏船隊於關門海峽壇之浦決戰平氏水軍。義經利用潮水漲退轉向奇策反擊，命令弓箭手集中射擊平家舵手，平家全線潰散。安德天皇投海，平家一族徹底滅亡，宣告日本中世紀武家鎌倉幕府時代降臨。",
    keyStrategies: [
      "精確掌握關門海峽潮流逆轉時機發動全面順流強攻",
      "以精準弓箭火力集中狙殺敵船舵手與搖櫓水手瓦解敵艦隊機動性",
      "源義經親率精銳跳幫白刃肉搏（八艘跳）重挫敵軍本陣士氣"
    ]
  },
  {
    id: "bat_jp_koan_1281",
    eraId: "jp_ancient_medieval",
    name: "弘安之役博多灣合戰 (神風狂瀾阻擊忽必烈大軍)",
    year: 1281,
    period: "japanAtlas",
    locationAncient: "筑前國博多灣沿岸",
    locationModern: "福岡縣福岡市博多灣元寇防壘",
    coordinates: [130.36, 33.59],
    parties: {
      invader: "大元蒙古東征十萬大軍 (江南軍與東路軍聯軍)",
      defender: "鎌倉幕府武士聯軍 (北條時宗命少貳景資、竹崎季長防守)"
    },
    victor: "日本鎌倉守軍阻擊成功，元軍全線潰退",
    victorStatement: "二十公里防壘死守兩月，強烈颱風「神風」覆沒元軍千艘戰艦",
    commanders: {
      invader: ["范文虎", "忻都", "阿刺罕"],
      defender: ["北條時宗", "少貳景資", "竹崎季長"]
    },
    summary: "1281年元世祖忽必烈派遣十四萬海陸大軍分兩路侵日。執權北條時宗預先於博多灣修築二十公里「元寇防壘」，元軍無法搶灘被迫滯留海面。日軍小船夜襲放火，鏖戰近兩月，終逢強烈颱風（神風）摧毀元艦大半，徹底解除東亞海疆威脅。",
    keyStrategies: [
      "構築二十公里石壘防線使敵強大騎兵與火器無法直接登陸突擊",
      "利用靈活輕舟於夜間發動火攻奇襲敵巨艦",
      "持久消耗敵登陸部隊水糧疫病，配合季風氣候逆轉戰局"
    ]
  },
  {
    id: "bat_jp_okehazama_1560",
    eraId: "jp_sengoku",
    name: "桶狹間奇襲之戰 (信長兩千輕騎斬殺今川義元)",
    year: 1560,
    period: "japanAtlas",
    locationAncient: "尾張國桶狹間山窪地",
    locationModern: "愛知縣豐明市榮町桶狹間古戰場",
    coordinates: [136.98, 35.05],
    parties: {
      invader: "東海道霸主今川大軍 (今川義元親率兩萬五千大軍)",
      defender: "織田信長尾張精銳 (信長親率兩千精銳輕騎)"
    },
    victor: "織田信長取得戰國史上最震撼奇襲大勝",
    victorStatement: "暴風雨中直撲今川本陣，服部小平太與毛利新助陣斬今川義元首級",
    commanders: {
      invader: ["今川義元 (戰死)"],
      defender: ["織田信長"]
    },
    summary: "1560年東海道第一弓取今川義元率兩萬五千大軍上洛進京。織田信長於清洲城跳敦盛之舞後，率兩千精騎趁驟雨狂風掩蔽，如閃電般直撲田樂窪今川義元本陣。今川軍措手不及大亂，義元被陣斬。信長一戰成名，奠定天下布武起點。",
    keyStrategies: [
      "善野之戰以佯攻部隊插旗吸引敵前鋒部隊注意力",
      "利用夏日突發暴雨巨雷掩蓋兩千精騎迂迴山脊行軍聲響",
      "全軍直取敵中樞核心指揮官本陣斬首戰術"
    ]
  },
  {
    id: "bat_jp_kawanakajima_1561",
    eraId: "jp_sengoku",
    name: "第四次川中島會戰 (信玄鶴翼陣 vs 謙信車懸之陣)",
    year: 1561,
    period: "japanAtlas",
    locationAncient: "信濃國八幡原 (川中島三日月堀)",
    locationModern: "長野縣長野市川中島古戰場史跡公園",
    coordinates: [138.18, 36.59],
    parties: {
      invader: "武田信玄甲斐赤備軍團 (兩萬精兵)",
      defender: "上杉謙信越後毘沙門精銳 (一萬三千大軍)"
    },
    victor: "雙方互有極慘烈死傷，戰國最巔峰野戰對決",
    victorStatement: "謙信單騎直入武田本陣三刀劈向信玄，信玄以軍配團扇擋刀傳千古",
    commanders: {
      invader: ["武田信玄", "武田信繁 (戰死)", "山本勘助 (戰死)"],
      defender: ["上杉謙信", "柿崎景家"]
    },
    summary: "1561年龍虎五度交鋒中最慘烈之八幡原決戰。山本勘助獻「啄木鳥戰法」分兵夜襲妻女山，上杉謙信洞悉先機趁晨霧下山布下「車懸之陣」猛攻武田本陣。信玄弟信繁與軍師勘助雙雙戰死，謙信單騎殺入本陣三斬信玄，被譽為戰國第一野戰傳奇。",
    keyStrategies: [
      "上杉謙信反客為主趁晨霧不點火炬全軍下山搶佔八幡原決戰位",
      "車懸之陣以波狀輪換衝擊連續瓦解敵鶴翼陣中央",
      "武田別動隊狂奔回防形成兩面夾擊挽救全軍覆滅"
    ]
  },
  {
    id: "bat_jp_mikata_1573",
    eraId: "jp_sengoku",
    name: "三方原之戰 (武田信玄鐵騎大破德川家康)",
    year: 1573,
    period: "japanAtlas",
    locationAncient: "遠江國三方原高地",
    locationModern: "靜岡縣濱松市中央區三方原町",
    coordinates: [137.71, 34.78],
    parties: {
      invader: "武田信玄西上上洛大軍 (三萬精騎與步兵)",
      defender: "德川家康與織田援軍 (一萬一千守軍)"
    },
    victor: "武田信玄赤備騎兵以魚鱗陣徹底擊潰德川軍",
    victorStatement: "家康丟盔棄甲狼狽逃回濱松城，畫下「顰像」以示終身不忘之恥",
    commanders: {
      invader: ["武田信玄", "山縣昌景", "馬場信春"],
      defender: ["德川家康", "佐久間信盛", "夏目吉信 (替死)"]
    },
    summary: "1573年武田信玄發動西上作戰，大軍故意繞過濱松城挑釁。德川家康少年氣盛出城追擊，在三方原暴雪中落入信玄預設魚鱗陣。武田赤備如狂風般突貫，德川家臣夏目吉信換穿家康甲冑代死。家康九死一生逃回濱松，空城計退敵，畫下醜態自省圖。",
    keyStrategies: [
      "武田信玄故意無視濱松城誘敵深入三方原開闊地決戰",
      "以魚鱗陣集中突破德川鶴翼陣中樞造成全線崩潰",
      "德川家康濱松城大開城門點燃火炬行空城計成功阻敵夜襲"
    ]
  },
  {
    id: "bat_jp_nagashino_1575",
    eraId: "jp_sengoku",
    name: "長篠·設樂原大決戰 (信長火繩槍三段射擊滅武田)",
    year: 1575,
    period: "japanAtlas",
    locationAncient: "三河國設樂原連吾川沿線",
    locationModern: "愛知縣新城市設樂原古戰場防馬柵",
    coordinates: [137.52, 34.92],
    parties: {
      invader: "武田勝賴甲斐騎兵軍團 (一萬五千兵力)",
      defender: "織田信長與德川家康聯軍 (三萬八千大軍，配備三千挺火繩槍)"
    },
    victor: "織田德川聯軍利用現代火器工事取得完全壓倒性勝利",
    victorStatement: "防馬柵阻隔騎兵衝鋒，三段輪射彈雨全殲武田二十四將精英",
    commanders: {
      invader: ["武田勝賴", "山縣昌景 (戰死)", "馬場信春 (戰死)"],
      defender: ["織田信長", "德川家康", "酒井忠次"]
    },
    summary: "1575年武田勝賴圍攻長篠城。織田信長依託設樂原連吾川地形構築三重防馬柵，配置三千挺火繩槍實施「三段輪射」。武田騎兵連續五波衝鋒均撞上防馬柵慘遭槍林彈雨掃射，山縣昌景、馬場信春等重臣名將全數陣亡，武田軍團從此一蹶不振。",
    keyStrategies: [
      "依託設樂原濕地構築三重縱深防馬木柵徹底遏阻騎兵衝擊力",
      "創立三段擊連續裝填射擊戰術消除火繩槍冷卻裝藥間隙",
      "酒井忠次夜襲鳶之巢山奇襲破敵後勤退路瓦解敵軍心理"
    ]
  },
  {
    id: "bat_jp_yamazaki_1582",
    eraId: "jp_azuchi_momoyama",
    name: "山崎合戰 (天王山之戰·秀吉中國大返還殲逆賊)",
    year: 1582,
    period: "japanAtlas",
    locationAncient: "山城國與攝津國交界山崎天王山",
    locationModern: "京都府乙訓郡大山崎町天王山",
    coordinates: [135.68, 34.89],
    parties: {
      invader: "明智光秀叛軍主力 (一萬六千人)",
      defender: "羽柴秀吉討逆大軍 (統率四萬大軍)"
    },
    victor: "羽柴秀吉以神速大軍壓制天王山制高點全勝",
    victorStatement: "奪取天王山全線壓制，明智軍潰散光秀出逃小栗棲遭竹槍刺死",
    commanders: {
      invader: ["明智光秀", "齋藤利三"],
      defender: ["羽柴秀吉", "黑田官兵衛", "池田恆興", "中川清秀"]
    },
    summary: "本能寺之變後，秀吉以「中國大返還」於七天內率軍狂飆兩百公里趕回畿內。雙方在狹窄山崎布陣，秀吉搶先搶佔「天王山」制高點居高臨下俯衝夾擊。明智軍防線崩潰，光秀夜逃途中遭農民刺殺。秀吉一躍成為織田政權實質繼承人。",
    keyStrategies: [
      "軍師黑田官兵衛策劃中國大返還神速行軍搶奪政治正當性",
      "搶佔山崎狹隘通道之戰略制高點天王山控制全場視野",
      "以中川清秀與高山右近為前鋒依托河道阻敵右翼包抄"
    ]
  },
  {
    id: "bat_jp_shizugatake_1583",
    eraId: "jp_azuchi_momoyama",
    name: "賤岳之戰 (賤岳七本槍·秀吉奠定天下人霸業)",
    year: 1583,
    period: "japanAtlas",
    locationAncient: "近江國琵琶湖畔賤岳山麓",
    locationModern: "滋賀縣長濱市余吳町賤岳古戰場",
    coordinates: [136.19, 35.50],
    parties: {
      invader: "柴田勝家北陸軍團 (佐久間盛政前鋒兩萬餘人)",
      defender: "羽柴秀吉大軍 (五萬兵力，賤岳七本槍猛攻)"
    },
    victor: "羽柴秀吉「美濃大返還」神速回防取得徹底大勝",
    victorStatement: "五小時狂奔五十二公里，福島正則、加藤清正七本槍揚威天下",
    commanders: {
      invader: ["柴田勝家", "佐久間盛政", "前田利家 (撤軍退場)"],
      defender: ["羽柴秀吉", "加藤清正", "福島正則", "片桐且元"]
    },
    summary: "1583年織田首席宿老柴田勝家與秀吉決裂。勝家大將佐久間盛政攻克中川清秀陣地後抗命留駐。秀吉在美濃大垣獲悉，以神速「美濃大返還」五小時狂奔五十二公里反撲。前田利家陣前中立撤軍，柴田軍瓦解，勝家退守北之莊城自焚切腹。",
    keyStrategies: [
      "秀吉美濃大返還夜間疾行五十公里殺得敵前鋒措手不及",
      "陣前巧妙政治離間使前田利家放棄戰鬥撤軍促成連鎖潰敗",
      "賤岳七本槍勇猛直插敵大營首開全面追擊戰"
    ]
  },
  {
    id: "bat_jp_sekigahara_1600",
    eraId: "jp_azuchi_momoyama",
    name: "關原之戰 (天下之分水嶺·東西十六萬大軍對決)",
    year: 1600,
    period: "japanAtlas",
    locationAncient: "美濃國不破郡關原盆地",
    locationModern: "岐阜縣不破郡關原町開戰地史蹟",
    coordinates: [136.53, 35.36],
    parties: {
      invader: "西軍豐臣奉行聯軍 (石田三成、宇喜多秀家等八萬大軍)",
      defender: "東軍德川家康聯盟 (德川家康、福島正則、黑田長政等八萬大軍)"
    },
    victor: "德川家康東軍大獲全勝，一戰奠定兩百六十年江戶幕府",
    victorStatement: "家康以問鐵砲震懾小早川秀秋倒戈衝下松尾山，西軍全線崩潰",
    commanders: {
      invader: ["石田三成", "大谷吉繼 (戰死)", "小早川秀秋 (叛變)", "島津義弘"],
      defender: ["德川家康", "本多忠勝", "井伊直政", "福島正則"]
    },
    summary: "1600年10月21日十六萬大軍在濃霧瀰漫之關原決戰。三成依託笹尾山布鶴翼陣占優，大谷吉繼浴血死守。正午德川家康命鐵砲向松尾山開火逼問，猶豫不決之小早川秀秋率一萬五千人生力軍倒戈衝下松尾山夾擊大谷吉繼。西軍瓦解，家康一日平定天下，定鼎江戶。",
    keyStrategies: [
      "家康事前廣發書信暗中調略小早川秀秋、吉川廣家等西軍關鍵大名",
      "以問鐵砲實施精準心理威懾逼迫觀望部隊實施陣前背叛",
      "黑田長政鐵砲陣地扼守丸山有效壓制石田三成本陣突擊"
    ]
  },
  {
    id: "bat_jp_osaka_natsu_1615",
    eraId: "jp_edo",
    name: "大坂夏之陣 (天王寺茶臼山決戰·日本第一兵幸村絕唱)",
    year: 1615,
    period: "japanAtlas",
    locationAncient: "攝津國大坂城南天王寺口與茶臼山",
    locationModern: "大阪府大阪市天王寺區茶臼山公園",
    coordinates: [135.51, 34.65],
    parties: {
      invader: "德川幕府平定大軍 (德川家康、德川秀忠率十五萬大軍)",
      defender: "大坂城豐臣浪人守軍 (真田幸村、毛利勝永率五萬大軍)"
    },
    victor: "德川幕府徹底消滅豐臣氏，終結戰國亂世",
    victorStatement: "真田幸村三度直衝家康本陣殺死旗本，力竭殉國，大坂城陷落",
    commanders: {
      invader: ["德川家康", "德川秀忠", "本多忠朝 (戰死)"],
      defender: ["真田幸村 (戰死)", "毛利勝永 (戰死)", "豐臣秀賴 (自盡)"]
    },
    summary: "大坂冬之陣外濠被填平後，1615年5月爆發夏之陣。真田幸村與毛利勝永在天王寺岡山口發動決死總突擊。真田赤備以不可阻擋之氣勢連破德川軍數重防線，直衝家康本陣斬倒帥旗，家康狼狽出逃。幸村力竭於安居神社戰死，秀賴自盡，戰國時代徹底畫上句號。",
    keyStrategies: [
      "真田幸村與毛利勝永協同發動正面突擊與側翼牽制敢死突擊",
      "利用茶臼山高地實施赤備騎兵高速穿透集中打擊德川中軍",
      "德川家軍以壓倒性十倍兵力優勢逐步封鎖包圍耗盡守軍體力"
    ]
  },
  {
    id: "bat_jp_toba_fushimi_1868",
    eraId: "jp_bakumatsu",
    name: "鳥羽·伏見之戰 (戊辰戰爭揭幕·錦之御旗定乾坤)",
    year: 1868,
    period: "japanAtlas",
    locationAncient: "山城國京都南郊鳥羽與伏見",
    locationModern: "京都府京都市伏見區御香宮神社",
    coordinates: [135.75, 34.93],
    parties: {
      invader: "德川舊幕府軍與新選組 (一萬五千兵力)",
      defender: "薩摩與長州新政府軍 (配備現代阿姆斯壯巨砲五千人)"
    },
    victor: "薩長新政府軍以現代火器與錦旗大勝",
    victorStatement: "朝廷「錦之御旗」升起，舊幕府軍淪為朝敵軍心潰散，慶喜退保江戶",
    commanders: {
      invader: ["德川慶喜", "近藤勇", "土方歲三"],
      defender: ["西鄉隆盛", "大山巖", "西園寺公望"]
    },
    summary: "1868年1月王政復古後，舊幕府軍北上進軍京都。薩長聯軍以精銳洋槍與阿姆斯壯現代後膛砲封鎖鳥羽與伏見狹窄道路。當新政府軍高揚天皇御賜「錦之御旗」時，舊幕府軍士氣崩潰化為朝敵。德川慶喜自大坂乘開陽丸軍艦退保江戶，明治維新全面勝利。",
    keyStrategies: [
      "薩長聯軍依託街道要塞發揮現代後膛洋槍與阿姆斯壯巨砲火力壓制",
      "政治心理戰：打出「錦之御旗」宣告新政府軍為皇軍奪取正統名分",
      "封鎖淀川水路斷絕舊幕府軍後勤退路促成全面潰逃"
    ]
  },
  {
    id: "bat_jp_goryokaku_1869",
    eraId: "jp_bakumatsu",
    name: "箱館五稜郭之戰 (戊辰戰爭終幕·土方歲三最後武士)",
    year: 1869,
    period: "japanAtlas",
    locationAncient: "蝦夷地箱館五稜郭要塞",
    locationModern: "北海道函館市五稜郭星形要塞",
    coordinates: [140.75, 41.79],
    parties: {
      invader: "新政府陸海征討大軍 (黑田清隆統率鐵甲艦與兩萬大軍)",
      defender: "蝦夷共和國守軍 (榎本武揚、土方歲三率三千舊幕臣)"
    },
    victor: "新政府軍攻陷五稜郭，戊辰戰爭全面結束",
    victorStatement: "土方歲三一本木關門單騎殉國，榎本武揚開城投降，日本走向現代統一",
    commanders: {
      invader: ["黑田清隆", "山田顯義"],
      defender: ["榎本武揚", "土方歲三 (戰死)", "大鳥圭介"]
    },
    summary: "1868年底榎本武揚率幕府艦隊開赴北海道建立蝦夷共和國，以西洋星形要塞「五稜郭」堅守。1869年5月新政府甲鐵艦大舉進攻，土方歲三單騎馳援弁天台場於一本木關門中彈犧牲。榎本武揚交出《海律全書》開城投降。日本全境完成現代中央集權統一。",
    keyStrategies: [
      "依託西洋棱堡星形要塞五稜郭形成交叉火力網抗擊強敵",
      "新政府軍利用甲鐵裝甲艦艦砲實施遠程飽和轟炸要塞內部",
      "黑田清隆以贈酒肉與愛惜人才之誠意促成和平受降免除屠戮"
    ]
  },
  {
    id: "bat_jp_tabaruzaka_1877",
    eraId: "jp_meiji_modern",
    name: "西南戰爭·田原坂血戰 (士族拔刀隊 vs 西鄉薩摩軍)",
    year: 1877,
    period: "japanAtlas",
    locationAncient: "肥後國田原坂丘陵要塞",
    locationModern: "熊本縣熊本市北區植木町田原坂古戰場",
    coordinates: [130.64, 32.91],
    parties: {
      invader: "西鄉隆盛薩摩士族私學校起義軍 (一萬三千示現流精銳)",
      defender: "大日本帝國政府徵兵平叛軍 (有栖川宮、山縣有朋統帥數萬平民徵兵)"
    },
    victor: "政府軍依託充沛彈藥與拔刀隊奪下田原坂",
    victorStatement: "十七天血戰落雨彈如雨下，薩摩軍銳氣耗盡退守城山，武士階級落幕",
    commanders: {
      invader: ["西鄉隆盛", "桐野利秋", "村田新八"],
      defender: ["山縣有朋", "川上操六", "谷干城"]
    },
    summary: "1877年西鄉隆盛率薩摩武士反抗明治政府削奪武士特權。雙方在通往熊本之隘口田原坂展開十七天泥濘血戰。薩摩示現流白刃戰所向披靡，政府軍組織舊會津武士組成「拔刀隊」以刀制刀，並以日耗數十萬發子彈重創薩軍。此戰標誌平民徵兵制徹底取代傳統武士特權階級。",
    keyStrategies: [
      "薩摩軍以凶悍示現流近身肉搏夜襲給政府軍震撼打擊",
      "政府軍成立舊會津武士「警視廳拔刀隊」抗衡薩摩白刃戰",
      "現代後勤工業優勢：每日運送三十萬發子彈實施不間斷彈雨壓制"
    ]
  },
  {
    id: "bat_jp_tsushima_1905",
    eraId: "jp_meiji_modern",
    name: "對馬海峽海戰 (東鄉平八郎丁字戰法全殲波羅的海艦隊)",
    year: 1905,
    period: "japanAtlas",
    locationAncient: "對馬海峽外海海域",
    locationModern: "長崎縣對馬市周邊海面 (日本海)",
    coordinates: [129.50, 34.35],
    parties: {
      invader: "沙皇俄國第二太平洋波羅的海遠征艦隊 (羅傑斯特文斯基統率三十八艘戰艦)",
      defender: "大日本帝國海軍聯合艦隊 (東鄉平八郎統帥三笠號等全艦隊)"
    },
    victor: "東鄉平八郎聯合艦隊取得世界海戰史上最完勝奇蹟",
    victorStatement: "升起Z字旗實施「東鄉丁字轉向」，擊沉俄軍主力艦十六艘、俘虜五艘",
    commanders: {
      invader: ["羅傑斯特文斯基 (被俘)", "費克爾薩姆 (戰死)"],
      defender: ["東鄉平八郎", "加藤友三郎", "秋山真之 (參謀)"]
    },
    summary: "1905年5月27日俄國波羅的海艦隊航行八個月抵達對馬海峽。東鄉平八郎在旗艦三笠號升起Z字旗，參謀秋山真之擬定「七段作戰」。東鄉冒險實施大角度「U型大轉彎（敵前大回頭）」佔據T字橫頭優勢位，下瀨火藥猛烈轟擊，俄國艦隊近乎全滅。促成日俄簽訂朴茨茅斯和約，日本晉升列強。",
    keyStrategies: [
      "東鄉冒險於敵前八千米實施大角度回頭轉向搶奪T字有利砲擊橫位",
      "採用高威力下瀨火藥與伊集院信管實施連續毀滅性甲板引燃",
      "秋山真之七段作戰構想：日間戰艦砲戰銜接夜間魚雷快艇狼群追擊"
    ]
  }
];

// 6 Eras of Japanese Historical Atlas
const JAPAN_ERAS_DATA = [
  {
    id: "jp_ancient_medieval",
    name: "古代與中世發端",
    dateRangeDisplay: "西元 538 - 1467 年",
    shortEra: "飛鳥·平安·鎌倉·室町",
    tagline: "大化革新·源平合戰·武家誕生",
    description: "飛鳥時代聖德太子頒《十七條憲法》引進隋唐文明；大化革新確立中央集權；平安京遷都開創國風美學；源平爭霸壇之浦海戰平家覆滅，源賴朝開創鎌倉幕府；北條時宗築壘抗擊忽必烈元寇神風；室町足利義滿建金閣寺推動勘合貿易。",
    keyEvents: [
      {
        id: "evt_jp_shotoku_constitution_604",
        year: 604,
        yearDisplay: "西元 604 年 (推古天皇十二年)",
        title: "聖德太子制定冠位十二階與十七條憲法",
        summary: "聖德太子推行革新法典，開創日本歷史成文憲法與德治之始。",
        detail: "聖德太子在大和斑鳩宮頒布《十七條憲法》，以「以和為貴」為首條，融入儒家仁義、佛教三寶與法家綱紀；推行打破世襲門閥之「冠位十二階」，派遣遣隋使小野妹子出使中國，確立日本東亞自主文明格局。",
        locationNameAncient: "大和國斑鳩宮",
        locationNameModern: "奈良縣生駒郡斑鳩町法隆寺",
        coordinates: [135.73, 34.61],
        tags: ["聖德太子", "十七條憲法", "冠位十二階", "法隆寺"]
      },
      {
        id: "evt_jp_taika_reforms_645",
        year: 645,
        yearDisplay: "西元 645 年 (大化元年)",
        title: "大化革新與中大兄皇子乙巳之變",
        summary: "誅滅專權蘇我氏，參照唐朝均田租庸調制度確立中央集權律令制。",
        detail: "中大兄皇子（後天智天皇）與中臣鎌足發動乙巳之變誅殺跋扈權臣蘇我入鹿。孝德天皇即位改元「大化」，廢除部民私有土地，推行公地公民制、班田收授法與租庸調賦稅制度，奠定日本律令制國家根基。",
        locationNameAncient: "大和國飛鳥板蓋宮",
        locationNameModern: "奈良縣高市郡明日香村",
        coordinates: [135.82, 34.47],
        tags: ["大化革新", "乙巳之變", "班田收授", "律令國家"]
      },
      {
        id: "evt_jp_heian_kyo_794",
        year: 794,
        yearDisplay: "西元 794 年 (延曆十三年)",
        title: "桓武天皇遷都平安京開啟平安盛世",
        summary: "日本遷都山城國平安京（今京都），開創四百年平安時代國風文化。",
        detail: "為擺脫奈良南都六宗僧侶干政，桓武天皇仿唐代長安城方正棋盤格局興建「平安京」。平安四百年孕育出假名文字、《源氏物語》、《枕草子》與大和繪等精緻國風美學，定鼎京都千年帝都地位。",
        locationNameAncient: "山城國葛野郡平安京大內裏",
        locationNameModern: "京都府京都市上京區京都御所",
        coordinates: [135.76, 35.02],
        tags: ["平安京", "桓武天皇", "國風文化", "京都千年底蘊"]
      },
      {
        id: "evt_jp_dannoura_gempei_1185",
        year: 1185,
        yearDisplay: "西元 1185 年 (文治元年)",
        title: "壇之浦海戰平家覆滅與武家崛起",
        summary: "源義經指揮源氏水軍徹底滅亡平家，八歲安德天皇抱三神器投海。",
        detail: "源平爭霸最後決戰於長門國壇之浦爆發。源義經以靈活跳幫戰術逆風突襲，平知盛負錨投海，平家滿門投海覆滅。七百年間朝廷貴族公家掌權時代終結，拉開日本武家政權主宰政治舞台之序幕。",
        locationNameAncient: "長門國赤間關壇之浦",
        locationNameModern: "山口縣下關市關門海峽",
        coordinates: [130.95, 33.96],
        tags: ["壇之浦", "源義經", "平家物語", "武家掌權"]
      },
      {
        id: "evt_jp_kamakura_shogunate_1192",
        year: 1192,
        yearDisplay: "西元 1192 年 (建久三年)",
        title: "源賴朝就任征夷大將軍建立鎌倉幕府",
        summary: "後白河法皇與朝廷冊封賴朝為征夷大將軍，日本首個武家政權正式成立。",
        detail: "源賴朝設大本營於相模鎌倉，創立政所、侍所與問注所，並向各國廣設「守護」與「地頭」，將行政裁判與徵稅大權自公家手中收歸武士階級，奠定武士道御家人封建主從秩序。",
        locationNameAncient: "相模國鎌倉大藏幕府",
        locationNameModern: "神奈川縣鎌倉市鶴岡八幡宮旁",
        coordinates: [139.55, 35.32],
        tags: ["源賴朝", "鎌倉幕府", "征夷大將軍", "守護地頭"]
      },
      {
        id: "evt_jp_mongol_invasions_1281",
        year: 1281,
        yearDisplay: "西元 1281 年 (弘安四年)",
        title: "弘安之役北條時宗堅守防壘與神風大捷",
        summary: "鎌倉執權北條時宗率全島武士阻擊大元十四萬大軍，神風狂嵐保全日本。",
        detail: "忽必烈調集江南軍與東路軍十四萬遠征大軍登陸九州。北條時宗預先於博多灣築二十公里石壘堅決抵抗兩月。農曆七月強烈颱風（神風）席捲博多灣，元軍巨艦折戟沉沙，徹底粉碎元帝國擴張企圖。",
        locationNameAncient: "筑前國博多灣元寇防壘",
        locationNameModern: "福岡縣福岡市西區與早良區沿海",
        coordinates: [130.36, 33.59],
        tags: ["元寇襲來", "北條時宗", "神風", "博多防壘"]
      },
      {
        id: "evt_jp_ashikaga_kinkakuji_1397",
        year: 1397,
        yearDisplay: "西元 1397 年 (應永四年)",
        title: "足利義滿興建北山鹿苑寺金閣與勘合貿易",
        summary: "室町幕府第三代將軍統一大陸朝貢與公武合一，開創燦爛北山文化。",
        detail: "足利義滿結束五十六年南北朝分裂，在京都北山興築金箔輝煌之舍利殿金閣寺。受明朝冊封「日本國王」，開啟寧波勘合貿易，壓制倭寇，開創融合禪宗墨繪與能樂幽玄之北山黃金文化。",
        locationNameAncient: "山城國北山鹿苑寺",
        locationNameModern: "京都府京都市北區金閣寺",
        coordinates: [135.72, 35.03],
        tags: ["足利義滿", "金閣寺", "勘合貿易", "北山文化"]
      }
    ],
    highlightFigures: ["fig_jp_shotoku", "fig_jp_minamoto_yoritomo", "fig_jp_minamoto_yoshitsune", "fig_jp_hojo_tokimune", "fig_jp_ashikaga_yoshimitsu"]
  },
  {
    id: "jp_sengoku",
    name: "戰國亂世·群雄逐鹿",
    dateRangeDisplay: "西元 1467 - 1582 年",
    shortEra: "應仁之亂至本能寺之變",
    tagline: "下剋上·風林火山·天下布武",
    description: "應仁之亂幕府名存實亡，日本進入一百二十年下剋上大動盪；甲斐之虎武田信玄與越後之龍上杉謙信川中島宿命激戰；毛利元就稱霸西國；織田信長桶狹間奇襲一戰成名，長篠合戰火繩槍三段擊破武田赤備，天下布武推進統一，惜終結於本能寺之變。",
    keyEvents: [
      {
        id: "evt_jp_onin_war_1467",
        year: 1467,
        yearDisplay: "西元 1467 年 (應仁元年)",
        title: "應仁之亂爆發京都化為灰燼下剋上開啟",
        summary: "細川勝元與山名宗全爭奪幕府繼嗣，大戰十一年揭開戰國百年大動亂。",
        detail: "室町將軍足利義政繼承人問題引發細川東軍與山名西軍二十餘萬武士在京都激戰十一年。古都樓宇化為廢墟，幕府權威掃地名存實亡，全日本守護代與國人豪族競相以實力「下剋上」割據一方。",
        locationNameAncient: "山城國京都上京相國寺周邊",
        locationNameModern: "京都府京都市上京區小川通",
        coordinates: [135.75, 35.03],
        tags: ["應仁之亂", "下剋上", "室町衰頹", "戰國揭幕"]
      },
      {
        id: "evt_jp_tanegashima_teppo_1543",
        year: 1543,
        yearDisplay: "西元 1543 年 (天文十二年)",
        title: "葡萄牙火繩槍傳入種子島引發軍事革命",
        summary: "南蠻商人將歐洲火繩槍傳入日本，徹底顛覆傳統冷兵器戰術格局。",
        detail: "一艘載有葡萄牙商人之明朝走私船漂流至薩摩種子島。島主種子島時堯以重金購得兩挺火繩槍並命刀工八板金兵衛仿製成功。火器迅速傳入國友村與堺港大規模量產，深刻改變戰國城防與野戰戰法。",
        locationNameAncient: "大隅國種子島門倉岬",
        locationNameModern: "鹿兒島縣熊毛郡南種子町",
        coordinates: [130.88, 30.33],
        tags: ["種子島", "鐵砲傳來", "軍事革命", "火繩槍"]
      },
      {
        id: "evt_jp_okehazama_1560",
        year: 1560,
        yearDisplay: "西元 1560 年 (永祿三年)",
        title: "桶狹間之戰織田信長兩千斬殺今川義元",
        summary: "織田信長暴風雨中奇襲今川義元兩萬五千大軍本陣，一舉震驚列國。",
        detail: "駿河今川義元率大軍西征上洛。信長在清洲城決策進攻，冒狂風暴雨率兩千輕騎突襲桶狹間窪地今川本陣，陣斬今川義元。今川家迅速衰落，德川家康脫離獨立，信長聲威大振奠定霸權。",
        locationNameAncient: "尾張國桶狹間田樂窪",
        locationNameModern: "愛知縣豐明市榮町",
        coordinates: [136.98, 35.05],
        tags: ["桶狹間", "織田信長", "今川義元", "戰國奇蹟"]
      },
      {
        id: "evt_jp_kawanakajima_1561",
        year: 1561,
        yearDisplay: "西元 1561 年 (永祿四年)",
        title: "第四次川中島合戰龍虎八幡原血戰",
        summary: "武田信玄與上杉謙信展開最慘烈會戰，謙信單騎衝入本陣三斬信玄。",
        detail: "信玄與謙信在信濃川中島八幡原正面決戰。謙信識破勘助啄木鳥戰法，晨霧中以車懸之陣直撲武田本陣，單騎揮刀砍信玄，信玄以軍配擋刀。武田名將信繁與軍師勘助戰死，成為日本武勇英雄傳奇典範。",
        locationNameAncient: "信濃國八幡原川中島",
        locationNameModern: "長野縣長野市八幡原史跡公園",
        coordinates: [138.18, 36.59],
        tags: ["川中島", "武田信玄", "上杉謙信", "龍虎對決"]
      },
      {
        id: "evt_jp_nagashino_1575",
        year: 1575,
        yearDisplay: "西元 1575 年 (天正三年)",
        title: "長篠之戰信長三千火槍三段射覆沒武田赤備",
        summary: "織田信長於設樂原築防馬柵，以密集火器三段輪射徹底摧毀無敵騎兵。",
        detail: "武田勝賴率一萬五千赤備精騎圍長篠城。信長與家康以三萬八千大軍在設樂原構築三重防馬木柵，部署三千挺火繩槍實施輪射。武田騎兵衝鋒慘遭密集彈雨射殺，名將山縣昌景陣亡，武田名門基業盡毀。",
        locationNameAncient: "三河國設樂原連吾川",
        locationNameModern: "愛知縣新城市長篠城史蹟",
        coordinates: [137.52, 34.92],
        tags: ["長篠之戰", "三段射擊", "防馬柵", "近代火器革命"]
      },
      {
        id: "evt_jp_azuchi_castle_1579",
        year: 1579,
        yearDisplay: "西元 1579 年 (天正七年)",
        title: "織田信長築安土城天下布武與樂市樂座",
        summary: "建造琵琶湖畔七層五重安土天守，推行自由商業廢除特權行會。",
        detail: "信長於琵琶湖畔興建極盡奢華之七層安土城，開創日本近代天守閣建築形制。頒布「樂市樂座」取締封建座商特權免除通行稅，推行兵農分離與常備軍制度，展現現代經濟與開放思維。",
        locationNameAncient: "近江國安土山城",
        locationNameModern: "滋賀縣近江八幡市安土町",
        coordinates: [136.14, 35.15],
        tags: ["安土城", "天下布武", "樂市樂座", "兵農分離"]
      },
      {
        id: "evt_jp_honnoji_incident_1582",
        year: 1582,
        yearDisplay: "西元 1582 年 (天正十年)",
        title: "本能寺之變明智光秀叛變織田信長殞命",
        summary: "明智光秀深夜誓師「敵在本能寺」，一代霸王信長葬身火海千古絕唱。",
        detail: "信長下榻京都本能寺準備西征毛利。部將明智光秀突起反心，率一萬三千大軍圍攻寺廟。信長率數十侍衛弓箭力戰受創，在正殿引火自焚，年四十八歲，留下無人能解之戰國歷史最大謎團。",
        locationNameAncient: "山城國京都本能寺",
        locationNameModern: "京都府京都市中京區油小路通本能寺舊址",
        coordinates: [135.75, 35.01],
        tags: ["本能寺之變", "織田信長", "明智光秀", "歷史轉折"]
      }
    ],
    highlightFigures: ["fig_jp_oda_nobunaga", "fig_jp_takeda_shingen", "fig_jp_uesugi_kenshin", "fig_jp_hojo_ujiyasu", "fig_jp_mori_motonari", "fig_jp_akechi_mitsuhide", "fig_jp_honda_tadakatsu"]
  },
  {
    id: "jp_azuchi_momoyama",
    name: "安土桃山·天下統一",
    dateRangeDisplay: "西元 1582 - 1603 年",
    shortEra: "秀吉統一天下至關原之戰",
    tagline: "中國大返還·太閤檢地·關原分水嶺",
    description: "豐臣秀吉中國大返還平定逆賊，小田原征伐結束戰國百年分裂一統天下；推行太閤檢地與刀狩令奠定近代社會分層；秀吉身故後德川家康與石田三成爆發十六萬人關原大決戰，東軍獲勝奠定德川霸權。",
    keyEvents: [
      {
        id: "evt_jp_yamazaki_1582",
        year: 1582,
        yearDisplay: "西元 1582 年 (天正十年)",
        title: "山崎合戰秀吉中國大返還殲滅明智光秀",
        summary: "秀吉七天狂奔兩百公里奪天王山，光秀敗亡秀吉成為信長繼承人。",
        detail: "本能寺變後秀吉火速與毛利議和，展開震驚全島之「中國大返還」。於山崎搶佔天王山高地全線壓制光秀軍。光秀出逃小栗棲遭竹槍擊斃，秀吉掌控織田政權核心大權。",
        locationNameAncient: "山城國大山崎天王山",
        locationNameModern: "京都府乙訓郡大山崎町",
        coordinates: [135.68, 34.89],
        tags: ["山崎合戰", "中國大返還", "豐臣秀吉", "天王山"]
      },
      {
        id: "evt_jp_osaka_castle_1583",
        year: 1583,
        yearDisplay: "西元 1583 年 (天正十一年)",
        title: "豐臣秀吉修築天下第一名城大坂城",
        summary: "石山本願寺舊址興建金碧輝煌之巨城要塞，成為統一天下之政治中心。",
        detail: "秀吉動用數萬民工於難波要塞修築三重護城河、巨石壘砌之大坂城。本丸天守外飾金箔黑漆，匯聚天下物產與財富，展現「天下人」無上權威。",
        locationNameAncient: "攝津國大坂城本丸",
        locationNameModern: "大阪府大阪市中央區大阪城",
        coordinates: [135.53, 34.69],
        tags: ["大坂城", "豐臣秀吉", "天下人", "巨石要塞"]
      },
      {
        id: "evt_jp_taiko_kenchi_1588",
        year: 1588,
        yearDisplay: "西元 1588 年 (天正十六年)",
        title: "太閤檢地與刀狩令奠定兵農分離",
        summary: "全國統一度量衡測量田畝石高，沒收農民刀械兵器確立武士農民身分。",
        detail: "秀吉頒布「刀狩令」收繳民間刀劍弓槍熔鑄大佛，剝奪農民武裝起義可能；推行「太閤檢地」釐清全國土地所有與石高稅負，奠定嚴格的兵農分離制度與近世社會秩序基礎。",
        locationNameAncient: "京都聚樂第行幸",
        locationNameModern: "京都府京都市上京區聚樂第舊址",
        coordinates: [135.74, 35.02],
        tags: ["太閤檢地", "刀狩令", "兵農分離", "石高制"]
      },
      {
        id: "evt_jp_odawara_siege_1590",
        year: 1590,
        yearDisplay: "西元 1590 年 (天正十八年)",
        title: "小田原征伐滅後北條氏全日本終歸統一",
        summary: "秀吉統率二十萬大軍包圍天下第一堅城小田原，終結百年戰國紛爭。",
        detail: "後北條氏拒絕臣服。秀吉集結全日本諸大名二十餘萬大軍重重圍困小田原城三月，築石垣山一夜城挫敵士氣。北條氏政開城切腹，伊達政宗等奧羽諸大名盡皆歸順，戰國百年分裂至此徹底告終。",
        locationNameAncient: "相模國小田原城與石垣山",
        locationNameModern: "神奈川縣小田原市",
        coordinates: [139.15, 35.25],
        tags: ["小田原征伐", "天下統一", "北條滅亡", "一夜城"]
      },
      {
        id: "evt_jp_sekigahara_1600",
        year: 1600,
        yearDisplay: "西元 1600 年 (慶長五年)",
        title: "關原之戰天下分水嶺德川家康奪天下",
        summary: "東西軍十六萬大軍於美濃關原大決戰，家康擊潰三成奠定德川幕府基業。",
        detail: "秀吉卒後家康奪權。石田三成合組十萬西軍於關原布陣迎戰東軍。正午家康以問鐵砲迫使小早川秀秋倒戈衝下松尾山夾擊大谷吉繼，西軍大潰。家康一日定天下，開啟德川家康統治時代。",
        locationNameAncient: "美濃國關原古戰場",
        locationNameModern: "岐阜縣不破郡關原町",
        coordinates: [136.53, 35.36],
        tags: ["關原之戰", "天下分水嶺", "德川家康", "石田三成"]
      }
    ],
    highlightFigures: ["fig_jp_toyotomi_hideyoshi", "fig_jp_tokugawa_ieyasu", "fig_jp_ishida_mitsunari", "fig_jp_sanada_masayuki", "fig_jp_kuroda_kanbei", "fig_jp_date_masamune"]
  },
  {
    id: "jp_edo",
    name: "江戶幕府·鎖國治世",
    dateRangeDisplay: "西元 1603 - 1853 年",
    shortEra: "大坂之陣至黑船來航前夕",
    tagline: "征夷大將軍·參勤交代·鎖國承平",
    description: "德川家康受封征夷大將軍建都江戶；大坂冬夏之陣徹底平定豐臣殘餘；制定參勤交代削弱諸藩；鎖國體制獨留長崎出島；元祿赤穗浪士忠臣藏；迎來二百六十年無內戰之承平繁榮盛世。",
    keyEvents: [
      {
        id: "evt_jp_edo_bakufu_1603",
        year: 1603,
        yearDisplay: "西元 1603 年 (慶長八年)",
        title: "德川家康就任征夷大將軍建立江戶幕府",
        summary: "後陽成天皇冊封家康為征夷大將軍，開創二百六十年江戶時代。",
        detail: "德川家康在伏見城受旨封為將軍，隨後移駕江戶城展開「天下普請」大規模填海興建巨城與五街道（東海道、中山道等），奠定現代東京作為日本政治經濟樞紐地位。",
        locationNameAncient: "武藏國江戶城本丸",
        locationNameModern: "東京都千代田區皇居",
        coordinates: [139.75, 35.68],
        tags: ["江戶幕府", "德川家康", "天下普請", "征夷大將軍"]
      },
      {
        id: "evt_jp_osaka_siege_1615",
        year: 1615,
        yearDisplay: "西元 1615 年 (慶長二十年)",
        title: "大坂夏之陣豐臣覆滅真田幸村戰神絕唱",
        summary: "真田幸村三度直衝家康本陣殺出威名，大坂城陷落戰國亂世終結。",
        detail: "德川家康統帥十五萬大軍發動夏之陣。真田幸村以赤備決死突擊三度衝入家康大營斬翻馬印，家康幾乎切腹。幸村力竭於茶臼山成仁，豐臣秀賴與淀殿自盡大坂城陷落，元和偃武時代降臨。",
        locationNameAncient: "攝津國大坂城天守",
        locationNameModern: "大阪府大阪市中央區大阪城公園",
        coordinates: [135.53, 34.69],
        tags: ["大坂夏之陣", "真田幸村", "元和偃武", "豐臣滅亡"]
      },
      {
        id: "evt_jp_buke_shohatto_1615",
        year: 1615,
        yearDisplay: "西元 1615 年 (元和元年)",
        title: "頒布《武家諸法度》與參勤交代制度",
        summary: "嚴格規範大名築城、婚姻與人質進京，確立幕藩體制中央集權統治。",
        detail: "幕府頒布《武家諸法度》，規定諸藩「一國一城」、嚴禁私自修繕城郭與私通聯姻；後德川家光確立「參勤交代」制度，規定各大名每隔一年必須進京服役，妻兒留作人質，大幅消耗諸藩財力避免叛亂。",
        locationNameAncient: "武藏國江戶城黑書院",
        locationNameModern: "東京都千代田區皇居",
        coordinates: [139.75, 35.68],
        tags: ["武家諸法度", "參勤交代", "幕藩體制", "一國一城"]
      },
      {
        id: "evt_jp_sakoku_orders_1639",
        year: 1639,
        yearDisplay: "西元 1639 年 (寬永十六年)",
        title: "島原之亂平定與全面實施鎖國令",
        summary: "鎮壓天主教島原起義，全面禁止葡萄牙西班牙船隻，僅留長崎出島。",
        detail: "九州島原天主教農民在天草四郎率領下爆發大起義，幕府調集十二萬聯軍苦戰數月始平定。隨後頒布第五道鎖國令，禁止日本人出國與海外歸國，對外貿易全面限制於長崎出島（荷蘭與中國商船），開啟二百餘年封閉鎖國。",
        locationNameAncient: "肥前國長崎出島蘭館",
        locationNameModern: "長崎縣長崎市出島町",
        coordinates: [129.87, 32.74],
        tags: ["島原之亂", "鎖國令", "長崎出島", "天草四郎"]
      },
      {
        id: "evt_jp_ako_incident_1702",
        year: 1702,
        yearDisplay: "西元 1702 年 (元祿十五年)",
        title: "元祿赤穗浪士夜襲復仇與忠臣藏傳奇",
        summary: "大石內藏助率四十七浪人雪夜攻入吉良邸報君仇，彰顯極致武士道。",
        detail: "赤穗藩主淺野內匠頭遭吉良上野介侮辱於江戶城松之大廊下拔刀被迫切腹。家老大石內藏助隱忍兩年，於雪夜率四十七義士直搗吉良宅邸斬殺仇敵祭主，全員從容切腹就義，成為日本文學戲劇《忠臣藏》永恆母題。",
        locationNameAncient: "武藏國本所吉良邸與高輪泉岳寺",
        locationNameModern: "東京都港區高輪二丁目泉岳寺",
        coordinates: [139.74, 35.64],
        tags: ["忠臣藏", "大石內藏助", "赤穗四十七士", "武士道"]
      }
    ],
    highlightFigures: ["fig_jp_tokugawa_ieyasu", "fig_jp_sanada_yukimura", "fig_jp_tokugawa_iemitsu", "fig_jp_miyamoto_musashi", "fig_jp_tokugawa_yoshimune"]
  },
  {
    id: "jp_bakumatsu",
    name: "幕末風雲·尊王倒幕",
    dateRangeDisplay: "西元 1853 - 1868 年",
    shortEra: "黑船來航至戊辰戰爭終局",
    tagline: "尊王攘夷·薩長同盟·大政奉還",
    description: "美國海軍培里黑船來航強迫日本開國；安政大獄催生尊王攘夷烈火；坂本龍馬促成薩摩與長州同盟提出船中八策；德川慶喜宣告大政奉還；戊辰戰爭爆發鳥羽伏見西鄉隆盛促成江戶無血開城；新選組土方歲三五稜郭悲壯落幕。",
    keyEvents: [
      {
        id: "evt_jp_perry_black_ships_1853",
        year: 1853,
        yearDisplay: "西元 1853 年 (嘉永六年)",
        title: "美國海軍培里黑船來航浦賀迫日開國",
        summary: "美軍四艘蒸汽鐵甲黑色巨艦駛入江戶灣，震碎日本二百年鎖國美夢。",
        detail: "美國海軍准將培里率四艘黑色蒸汽巡洋艦強勢駛入浦賀海峽，黑煙滾滾艦砲威脅。幕府無力抵抗被迫於次年簽訂《日美神奈川條約》開放下田、函館兩港，終結二百年鎖國，日本陷入「尊王攘夷」激盪狂潮。",
        locationNameAncient: "相模國三浦郡浦賀港",
        locationNameModern: "神奈川縣橫須賀市浦賀港",
        coordinates: [139.72, 35.25],
        tags: ["黑船來航", "培里", "開國條約", "幕末序幕"]
      },
      {
        id: "evt_jp_sakuradamon_1860",
        year: 1860,
        yearDisplay: "西元 1860 年 (安政七年)",
        title: "櫻田門外之變井伊直弼遇刺幕府權威大墜",
        summary: "水戶浪士雪夜刺殺鐵血大老井伊直弼，幕府專制統治遭遇致命重創。",
        detail: "幕府大老大興「安政大獄」逮捕處死吉田松陰等大批尊攘志士。水戶與薩摩十八名浪士在江戶城櫻田門外大雪中奇襲大老轎輿斬殺井伊直弼。幕府至高權威蕩然無存，倒幕風潮勢不可擋。",
        locationNameAncient: "武藏國江戶城櫻田門外",
        locationNameModern: "東京都千代田區皇居櫻田門",
        coordinates: [139.75, 35.68],
        tags: ["櫻田門外之變", "井伊直弼", "安政大獄", "幕府崩解"]
      },
      {
        id: "evt_jp_satsuma_choshu_alliance_1866",
        year: 1866,
        yearDisplay: "西元 1866 年 (慶應二年)",
        title: "坂本龍馬促成薩長同盟建立倒幕主力",
        summary: "土佐浪士坂本龍馬以卓越政治遠見化解宿仇，薩摩與長州握手結盟。",
        detail: "長年敵對的西國兩大強藩薩摩（西鄉隆盛、小松帶刀）與長州（木戶孝允）在京都薩摩藩邸密會。坂本龍馬從中斡旋，長州購得洋槍彈藥、薩摩獲得糧米，兩大藩締結密約，凝聚成摧毀江戶幕府的決定性同盟。",
        locationNameAncient: "山城國京都薩摩藩二本松藩邸",
        locationNameModern: "京都府京都市上京區同志社大學旁",
        coordinates: [135.76, 35.03],
        tags: ["薩長同盟", "坂本龍馬", "西鄉隆盛", "木戶孝允"]
      },
      {
        id: "evt_jp_taisei_hokan_1867",
        year: 1867,
        yearDisplay: "西元 1867 年 (慶應三年)",
        title: "德川慶喜二條城宣告大政奉還還政天皇",
        summary: "末代將軍德川慶喜主動將統治大權奉還明治天皇，避免全面內戰。",
        detail: "依據坂本龍馬「船中八策」倡議，第十五代將軍德川慶喜於京都二條城召集諸藩重臣，正式呈交奏摺將掌管二百六十年的統治政權奉還天皇，實施王政復古，幕府時代在法理上正式告終。",
        locationNameAncient: "山城國京都二條城二之丸御殿",
        locationNameModern: "京都府京都市中京區二條城",
        coordinates: [135.75, 35.01],
        tags: ["大政奉還", "德川慶喜", "二條城", "王政復古"]
      },
      {
        id: "evt_jp_boshin_war_1868",
        year: 1868,
        yearDisplay: "西元 1868 年 (慶應四年)",
        title: "戊辰戰爭爆發與江戶無血開城",
        summary: "鳥羽伏見戰役擊潰舊幕府軍，西鄉隆盛與勝海舟會談保全江戶百萬生靈。",
        detail: "鳥羽伏見之戰新政府軍手持錦旗大勝。西鄉隆盛統率大軍兵臨江戶，幕府陸軍總裁勝海舟親赴薩摩藩邸會談，達成和平交割協議。江戶城「無血開城」免遭毀滅，隨後改名為「東京」，新時代啟航。",
        locationNameAncient: "武藏國江戶城西之丸與田町薩摩藩邸",
        locationNameModern: "東京都港區芝五丁目三田薩摩藩邸跡",
        coordinates: [139.75, 35.65],
        tags: ["戊辰戰爭", "無血開城", "西鄉隆盛", "勝海舟"]
      }
    ],
    highlightFigures: ["fig_jp_sakamoto_ryoma", "fig_jp_saigo_takamori", "fig_jp_hijikata_toshizo", "fig_jp_katsu_kaishu"]
  },
  {
    id: "jp_meiji_modern",
    name: "明治維新·近代崛起",
    dateRangeDisplay: "西元 1868 - 1945 年+",
    shortEra: "明治維新至近代文明開化",
    tagline: "富國強兵·殖產興業·憲政列強",
    description: "明治天皇頒《五條御誓文》推行廢藩置縣四民平等；岩倉使節團考察歐美引進西學；福澤諭吉啟蒙國民；西南戰爭終結武士特權；伊藤博文起草亞洲首部近代憲法；日俄戰爭對馬海戰擊破列強躋身世界舞台。",
    keyEvents: [
      {
        id: "evt_jp_charter_oath_1868",
        year: 1868,
        yearDisplay: "西元 1868 年 (明治元年)",
        title: "明治天皇頒布五條御誓文開展維新變法",
        summary: "宣告「廣求知識於世界，大振皇基」，確立改革開放基本國策。",
        detail: "由木戶孝允與由利公正起草，十六歲明治天皇於京都御所紫宸殿率百官向上天宣誓：廣興會議萬機決於公論、破除舊習求知識於世界。隨後定年號為「明治」，遷都東京，推行近代全方位改革。",
        locationNameAncient: "山城國京都御所紫宸殿",
        locationNameModern: "京都府京都市上京區京都御所",
        coordinates: [135.76, 35.02],
        tags: ["五條御誓文", "明治天皇", "文明開化", "近代改革"]
      },
      {
        id: "evt_jp_haihan_chiken_1871",
        year: 1871,
        yearDisplay: "西元 1871 年 (明治四年)",
        title: "廢藩置縣徹底消滅封建割據統一天下",
        summary: "廢除二百六十個藩國改立府縣，知事由中央直接派遣確立集權中央體制。",
        detail: "西鄉隆盛、大久保利通調動薩長土三藩御親兵鎮守東京，斷然宣布廢除全日本所有藩國，收回諸侯大名領地，改設三府七十二縣，徹底打破延續千年的武士封建割據，建立現代民族國家政體。",
        locationNameAncient: "東京都皇居正殿",
        locationNameModern: "東京都千代田區皇居",
        coordinates: [139.75, 35.68],
        tags: ["廢藩置縣", "大久保利通", "中央集權", "現代府縣"]
      },
      {
        id: "evt_jp_seinan_war_1877",
        year: 1877,
        yearDisplay: "西元 1877 年 (明治十年)",
        title: "西南戰爭爆發武士階級走向終結",
        summary: "西鄉隆盛率薩摩士族發動最後抗爭，城山自刃象徵武士時代落幕。",
        detail: "因廢刀令與俸祿取消，不滿政府官僚的薩摩士族推舉西鄉隆盛起兵。田原坂血戰十七天，政府平民徵兵依託現代彈雨火力重創薩軍。西鄉在鹿兒島城山切腹身亡，舊武士特權階級徹底走入歷史灰燼。",
        locationNameAncient: "薩摩國鹿兒島城山",
        locationNameModern: "鹿兒島縣鹿兒島市城山公園",
        coordinates: [130.55, 31.60],
        tags: ["西南戰爭", "西鄉隆盛", "最後武士", "城山自刃"]
      },
      {
        id: "evt_jp_meiji_constitution_1889",
        year: 1889,
        yearDisplay: "西元 1889 年 (明治二十二年)",
        title: "頒布《大日本帝國憲法》亞洲首開憲政",
        summary: "伊藤博文主持起草亞洲第一部近代成文憲法，建立帝國議會兩院制。",
        detail: "借鑑普魯士君主立憲架構，明治天皇親自頒布《大日本帝國憲法》。規定三權分立、創設貴族院與眾議院，確立臣民基本權利與法治國家形式，使日本成為亞洲第一個實施近代憲政之國家。",
        locationNameAncient: "東京都宮城正殿",
        locationNameModern: "東京都千代田區國會議事堂",
        coordinates: [139.74, 35.68],
        tags: ["大日本帝國憲法", "伊藤博文", "亞洲首部憲法", "立憲君主"]
      },
      {
        id: "evt_jp_tsushima_naval_1905",
        year: 1905,
        yearDisplay: "西元 1905 年 (明治三十八年)",
        title: "對馬海戰東鄉平八郎全殲波羅的海艦隊",
        summary: "聯合艦隊全殲俄羅斯遠征巨艦，亞洲國家首度在現代海戰擊敗歐洲列強。",
        detail: "日俄戰爭關鍵海戰。東鄉平八郎率聯合艦隊於對馬海峽打出「Z字旗」，冒險實施「東鄉丁字轉彎」火力全開，擊沉俘獲俄軍主力戰艦二十餘艘，迫使沙皇求和簽署《朴茨茅斯條約》，日本國際地位躋身世界列強行列。",
        locationNameAncient: "對馬海峽外海海域",
        locationNameModern: "長崎縣對馬市周邊海面",
        coordinates: [129.50, 34.35],
        tags: ["對馬海峽海戰", "東鄉平八郎", "三笠號", "躋身列強"]
      }
    ],
    highlightFigures: ["fig_jp_ito_hirobumi", "fig_jp_fukuzawa_yukichi", "fig_jp_togo_heihachiro"]
  }
];

// Generate SVG files for all figures
console.log(`Generating ${JAPAN_FIGURES_DATA.length} Japanese vector seal SVG avatars...`);
JAPAN_FIGURES_DATA.forEach(fig => {
  generateJapanSvgSeal(fig.id, fig.name, fig.clanTag, fig.emblemChar, fig.mainColor, fig.bgColor);
});
console.log('All Japanese SVG seals generated successfully!');

// Write src/data/japan/japanFigures.js
const figuresFileContent = `// Japanese Historical Atlas Figures Dataset (25 Iconic Figures)
export const JAPAN_FIGURES = ${JSON.stringify(JAPAN_FIGURES_DATA, null, 2)};
`;
fs.writeFileSync(path.join(JAPAN_DATA_DIR, 'japanFigures.js'), figuresFileContent, 'utf8');
console.log('Saved src/data/japan/japanFigures.js');

// Write src/data/japan/japanBattles.js
const battlesFileContent = `// Japanese Historical Atlas Battles Dataset (14 Authoritative Epic Battles)
export const JAPAN_BATTLES = ${JSON.stringify(JAPAN_BATTLES_DATA, null, 2)};
`;
fs.writeFileSync(path.join(JAPAN_DATA_DIR, 'japanBattles.js'), battlesFileContent, 'utf8');
console.log('Saved src/data/japan/japanBattles.js');

// Write src/data/japan/japanEras.js
const erasFileContent = `// Japanese Historical Atlas Eras Dataset (6 Master Historical Eras)
export const JAPAN_ERAS = ${JSON.stringify(JAPAN_ERAS_DATA, null, 2)};
`;
fs.writeFileSync(path.join(JAPAN_DATA_DIR, 'japanEras.js'), erasFileContent, 'utf8');
console.log('Saved src/data/japan/japanEras.js');

console.log('Japan module data build complete!');
