const fs = require('fs');
const path = require('path');

const figuresDir = path.join(__dirname, '..', 'images', 'figures');
if (!fs.existsSync(figuresDir)) {
  fs.mkdirSync(figuresDir, { recursive: true });
}

function generateSvgSeal(id, name, faction = 'taiwan') {
  const outputPath = path.join(figuresDir, `${id}.svg`);
  if (fs.existsSync(outputPath)) return;

  let color = '#10b981';
  let era = '臺';
  if (faction === 'indigenous') { color = '#f97316'; era = '原'; }
  else if (faction === 'dutch' || faction === 'foreign') { color = '#3b82f6'; era = '洋'; }
  else if (faction === 'scholar' || faction === 'culture') { color = '#8b5cf6'; era = '文'; }
  else if (faction === 'military' || faction === 'general') { color = '#ef4444'; era = '將'; }
  else if (faction === 'tech' || faction === 'reform') { color = '#06b6d4'; era = '技'; }
  else if (faction === 'art' || faction === 'sports') { color = '#ec4899'; era = '藝'; }
  
  const fallbackChar = name.length > 0 ? name[name.length - 1] : '先';
  const cleanId = id.replace(/[^a-zA-Z0-9_]/g, '_');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad_${cleanId}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#111827"/>
    </radialGradient>
    <filter id="glow_${cleanId}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="200" height="200" fill="url(#bgGrad_${cleanId})"/>
  <circle cx="100" cy="100" r="88" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="100" cy="100" r="74" fill="${color}" fill-opacity="0.15"/>
  <rect x="52" y="52" width="96" height="96" rx="8" fill="#1e3a8a" fill-opacity="0.3" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="100" y="118" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="52" font-weight="900" fill="#f8fafc" text-anchor="middle" filter="url(#glow_${cleanId})">${fallbackChar}</text>
  <text x="100" y="172" font-family="'Noto Serif TC', sans-serif" font-size="13" font-weight="bold" fill="#bae6fd" text-anchor="middle" letter-spacing="3">${era}·${name}</text>
</svg>`;
  fs.writeFileSync(outputPath, svg, 'utf8');
}

// 25 Additional Taiwan Figures (to reach ~85 total figures in Taiwan Lens mode)
const massiveFigures = [
  {
    id: "fig_tw_wang_delu",
    name: "王得祿",
    courtesyName: "玉峰",
    lifeSpan: "1770 - 1842",
    faction: "military",
    role: "太子太保 / 浙江水師提督",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wang_delu.svg",
    importance: 5,
    hometown: "臺灣府諸羅縣溝尾庄 (今嘉義太保)",
    shortBio: "大清官位最高之臺籍武將。出任水師提督，平定蔡牽、朱濆等海盜狂瀾，立下赫赫戰功。病逝追贈伯爵加太子太師，其故鄉嘉義溝尾特改名「太保」，太保市之由來。",
    historicalSignificance: "臺灣四百年清代官階最崇隆之軍事統帥，嘉義太保市地名歷史源頭。",
    abilities: { strategy: 90, commanding: 96, politics: 84, intellect: 82, courage: 98, charisma: 92 }
  },
  {
    id: "fig_tw_guoxi_liu",
    name: "郭錫瑠",
    courtesyName: "錫瑠公",
    lifeSpan: "1705 - 1765",
    faction: "taiwan",
    role: "瑠公圳開創者 / 臺北水利之祖",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_guoxi_liu.svg",
    importance: 5,
    hometown: "福建省漳州府南靖縣 (立足臺北大安)",
    shortBio: "傾盡家財數十載，鑿穿碧潭堅硬岩壁，引新店溪溪水修築長達數十里之「瑠公圳」，灌溉臺北盆地萬餘甲良田，造就艋舺、大稻埕百年米穀繁榮。",
    historicalSignificance: "大臺北盆地水利之父，瑠公圳至今為臺北水利開拓之第一象徵。",
    abilities: { strategy: 86, commanding: 74, politics: 82, intellect: 95, courage: 92, charisma: 90 }
  },
  {
    id: "fig_tw_lin_weiyuan",
    name: "林維源",
    courtesyName: "時甫 / 號冏卿",
    lifeSpan: "1840 - 1905",
    faction: "taiwan",
    role: "板橋林家首富 / 臺灣巡撫總理墾撫事宜",
    roleType: "minister",
    avatar: "./images/figures/fig_tw_lin_weiyuan.svg",
    importance: 5,
    hometown: "臺灣府淡水廳枋橋 (今新北板橋)",
    shortBio: "板橋林本源家族第四代族長，臺灣首富。出巨資力挺劉銘傳開闢鐵路、架設電報與開山撫番，任幫辦臺灣撫墾大臣，興建國寶建築「板橋林家花園」。",
    historicalSignificance: "近代臺灣首屈一指之實業與政商領袖，傾力贊助劉銘傳全島現代化建設。",
    abilities: { strategy: 89, commanding: 78, politics: 95, intellect: 93, courage: 85, charisma: 96 }
  },
  {
    id: "fig_tw_wu_guangliang",
    name: "吳光亮",
    courtesyName: "霽軒",
    lifeSpan: "1834 - 1898",
    faction: "military",
    role: "南澳總兵 / 八通關古道開築統帥",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wu_guangliang.svg",
    importance: 5,
    hometown: "廣東省大埔縣",
    shortBio: "南澳鎮總兵。受沈葆楨命率兩千飛虎軍開闢中路越嶺古道，劈山築路橫貫中央山脈玉山鞍部，完成長達三百里之八通關古道，題字「萬里鴻基」、「山高水長」。",
    historicalSignificance: "首度以現代軍事工程貫通中央山脈東西交通之拓荒名將。",
    abilities: { strategy: 88, commanding: 94, politics: 80, intellect: 85, courage: 97, charisma: 91 }
  },
  {
    id: "fig_tw_james_maxwell",
    name: "馬雅各",
    courtesyName: "James Laidlaw Maxwell",
    lifeSpan: "1836 - 1921",
    faction: "foreign",
    role: "英國長老教會宣教士 / 新樓醫院創辦人",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_james_maxwell.svg",
    importance: 5,
    hometown: "蘇格蘭愛丁堡",
    shortBio: "愛丁堡大學醫學博士。1865年抵臺南創立看西街醫館（新樓醫院前身），為全臺灣第一所現代西醫醫院。以仁心仁術免費施醫救治原漢平民，奠定南部現代醫療根基。",
    historicalSignificance: "引進現代西方醫療體系至臺灣之第一位宣教醫師，深受南臺灣人民愛戴。",
    abilities: { strategy: 84, commanding: 72, politics: 86, intellect: 98, courage: 94, charisma: 97 }
  },
  {
    id: "fig_tw_xiao_guangming",
    name: "蕭光明",
    courtesyName: "左堆總理 / 佳冬步月樓英雄",
    lifeSpan: "1840 - 1900",
    faction: "military",
    role: "六堆客家抗日義軍統領",
    roleType: "general",
    avatar: "./images/figures/fig_tw_xiao_guangming.svg",
    importance: 5,
    hometown: "屏東縣佳冬鄉蕭家古厝",
    shortBio: "六堆客家左堆總理。乙未戰爭乃木希典日軍登陸枋寮，蕭光明率六堆子弟兵依託步月樓紅磚圍龍大屋巷戰死守，兩子蕭昇祥、蕭達祥壯烈殉難，守衛南臺灣氣節千古。",
    historicalSignificance: "南臺灣六堆客家抗日第一烈士家族，步月樓血戰名垂青史。",
    abilities: { strategy: 85, commanding: 92, politics: 82, intellect: 84, courage: 99, charisma: 94 }
  },
  {
    id: "fig_tw_wu_pengnian",
    name: "吳彭年",
    courtesyName: "黑旗軍名將 / 八卦山統領",
    lifeSpan: "1855 - 1895",
    faction: "military",
    role: "黑旗軍前線副統領 / 八卦山殉國烈士",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wu_pengnian.svg",
    importance: 5,
    hometown: "浙江省餘姚縣",
    shortBio: "劉永福黑旗軍頭號勇將。乙未戰爭奉命北上督師彰化，與吳湯興、徐驤客家義軍並肩死守八卦山要塞。在彈盡糧絕之際身先士卒發動白刃反撲，身中數彈壯烈成仁。",
    historicalSignificance: "八卦山會戰黑旗軍最高指揮官，與客家義民同袍共死之英雄典範。",
    abilities: { strategy: 86, commanding: 95, politics: 74, intellect: 80, courage: 100, charisma: 93 }
  },
  {
    id: "fig_tw_yu_tengfeng",
    name: "郁永河",
    courtesyName: "字慢翁",
    lifeSpan: "1645 - 1715",
    faction: "culture",
    role: "清初旅行地理家 /《裨海紀遊》作者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_yu_tengfeng.svg",
    importance: 4,
    hometown: "浙江省杭州府仁和縣",
    shortBio: "康熙三十六年因福州火藥庫爆炸，自告奮勇渡海來臺採硫。自府城搭牛車一路向北深入平埔各社，在北投大磺嘴煮硫數月，著成《裨海紀遊》，為臺灣最早全島山川風土第一名著。",
    historicalSignificance: "臺灣第一部現代地質、地理與人類風土實地考察經典之作者。",
    abilities: { strategy: 76, commanding: 65, politics: 78, intellect: 96, courage: 92, charisma: 89 }
  },
  {
    id: "fig_tw_lan_dingyuan",
    name: "藍鼎元",
    courtesyName: "玉霖 / 號鹿洲",
    lifeSpan: "1680 - 1733",
    faction: "culture",
    role: "經略臺灣名臣 /《東征集》作者",
    roleType: "minister",
    avatar: "./images/figures/fig_tw_lan_dingyuan.svg",
    importance: 5,
    hometown: "福建省漳州府漳浦縣",
    shortBio: "隨族兄藍廷珍渡臺平定朱一貴起義。深入考察臺灣全島，力倡在竹塹（新竹）設縣、拓墾半線與後山，嚴禁官吏剝削原住民。其著《東征集》《平臺紀略》成為清代治臺最高綱領。",
    historicalSignificance: "清代最具遠見之臺灣經略大師，促成淡水廳竹塹石城與北部行政中樞之設立。",
    abilities: { strategy: 92, commanding: 80, politics: 96, intellect: 97, courage: 88, charisma: 93 }
  },
  {
    id: "fig_tw_tu_tsung_ming",
    name: "杜聰明",
    courtesyName: "臺灣首位醫學博士",
    lifeSpan: "1893 - 1986",
    faction: "tech",
    role: "京都帝大醫學博士 / 高雄醫學院創辦人",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_tu_tsung_ming.svg",
    importance: 5,
    hometown: "新北市淡水區",
    shortBio: "臺灣第一位獲得帝國大學醫學博士學位者。創立鴉片漸禁斷癮療法與蛇毒免疫藥理研究聞名國際，創辦高雄醫學院與臺灣醫學會，培育全臺無數名醫，被譽為「臺灣醫學之父」。",
    historicalSignificance: "臺灣本土高等醫學教育與現代藥理研究奠基宗師，立功立德名垂杏林。",
    abilities: { strategy: 85, commanding: 76, politics: 86, intellect: 100, courage: 92, charisma: 96 }
  },
  {
    id: "fig_tw_hsieh_hsueh_hung",
    name: "謝雪紅",
    courtesyName: "阿女",
    lifeSpan: "1901 - 1970",
    faction: "taiwan",
    role: "臺灣社會運動先驅 / 二七部隊精神領袖",
    roleType: "general",
    avatar: "./images/figures/fig_tw_hsieh_hsueh_hung.svg",
    importance: 4,
    hometown: "彰化縣彰化市",
    shortBio: "日治時期投入農民組合與反殖民運動，曾留學莫斯科東方大學。二二八事件期間在臺中召開市民大會，成立「二七部隊」進駐埔里山區抵抗，展現堅毅抗爭勇氣。",
    historicalSignificance: "臺灣近代女性政治社會運動傳奇領袖，象徵臺灣人民反抗威權之自主精神。",
    abilities: { strategy: 82, commanding: 88, politics: 85, intellect: 84, courage: 98, charisma: 91 }
  },
  {
    id: "fig_tw_kondo_hyoe",
    name: "近藤兵衛",
    courtesyName: "天下嘉農教練",
    lifeSpan: "1888 - 1966",
    faction: "sports",
    role: "嘉義農林棒球隊總教練",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_kondo_hyoe.svg",
    importance: 4,
    hometown: "日本愛媛縣松山 (立足臺灣嘉義)",
    shortBio: "松山商業棒球名將。接任嘉義農林棒球隊（KANO）總教練，打破種族界線，融合漢族協調、和族守備與原住民速度，1931年率隊殺入甲子園決賽奪得亞軍，締造「天下嘉農」傳奇。",
    historicalSignificance: "臺灣棒球運動魂魄第一塑造者，奠定臺灣棒球王國超越族群之運動家精神。",
    abilities: { strategy: 90, commanding: 96, politics: 78, intellect: 85, courage: 95, charisma: 94 }
  },
  {
    id: "fig_tw_lin_huaimin",
    name: "林懷民",
    courtesyName: "雲門舞集創辦人",
    lifeSpan: "1947 - 活耀",
    faction: "culture",
    role: "國家文藝獎得主 / 現代舞蹈藝術大師",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_lin_huaimin.svg",
    importance: 5,
    hometown: "嘉義縣新港鄉",
    shortBio: "1973年創立華語世界第一個現代專業舞團「雲門舞集」。以臺灣拓荒史詩《薪傳》、古典東方美學《白蛇傳》《水月》《九歌》震撼全球，獲頒時代雜誌「亞洲英雄」。",
    historicalSignificance: "以臺灣土地情感結合現代舞與書法太極，將臺灣文化美學推向世界巔峰之國寶大師。",
    abilities: { strategy: 84, commanding: 82, politics: 85, intellect: 99, courage: 95, charisma: 99 }
  },
  {
    id: "fig_tw_li_yuan_tseh",
    name: "李遠哲",
    courtesyName: "諾貝爾化學獎得主",
    lifeSpan: "1936 - 活耀",
    faction: "tech",
    role: "諾貝爾化學獎得主 / 中央研究院院長",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_li_yuan_tseh.svg",
    importance: 5,
    hometown: "新竹市",
    shortBio: "加州大學柏克萊分校化學博士。發明交叉分子束技術，1986年榮獲諾貝爾化學獎，為第一位在臺灣本土受完整基礎教育之諾貝爾獎得主。1994年毅然返臺出任中研院院長，推動科研教育轉型。",
    historicalSignificance: "臺灣首位諾貝爾獎得主，引領臺灣基礎科學與前沿學術躍登國際頂尖行列。",
    abilities: { strategy: 92, commanding: 80, politics: 88, intellect: 100, courage: 94, charisma: 97 }
  },
  {
    id: "fig_tw_stan_shih",
    name: "施振榮",
    courtesyName: "Stan Shih",
    lifeSpan: "1944 - 活耀",
    faction: "tech",
    role: "宏碁集團創辦人 / 臺灣個人電腦PC教父",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_stan_shih.svg",
    importance: 5,
    hometown: "彰化縣鹿港鎮",
    shortBio: "交通大學電子工程研究所畢業。1976年創立宏碁（Acer），提出著名的「微笑曲線（Smile Curve）」理論。帶領臺灣自勞力密集代工轉型為自有品牌微處理機王國，名列全球PC五大品牌。",
    historicalSignificance: "臺灣自有高科技國際品牌先驅，微笑曲線理論啟發全球科技產業價值鏈分工。",
    abilities: { strategy: 96, commanding: 86, politics: 85, intellect: 98, courage: 94, charisma: 96 }
  },
  {
    id: "fig_tw_terry_gou",
    name: "郭台銘",
    courtesyName: "Terry Gou",
    lifeSpan: "1950 - 活耀",
    faction: "tech",
    role: "鴻海科技集團創辦人 / 全球電子製造龍頭",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_terry_gou.svg",
    importance: 5,
    hometown: "新北市板橋區",
    shortBio: "中國海專畢業。1974年以三十萬元創立鴻海塑膠，以極致供應鏈整合、高精度模具與自動化量產打造富士康（Foxconn）帝國，成為全球最大電子代工製造服務（EMS）巨擘。",
    historicalSignificance: "締造全球規模最龐大之精密電子量產供應鏈網絡，臺灣製造實力全球化之代表人物。",
    abilities: { strategy: 95, commanding: 98, politics: 86, intellect: 92, courage: 99, charisma: 95 }
  },
  {
    id: "fig_tw_jensen_huang",
    name: "黃仁勳",
    courtesyName: "Jensen Huang",
    lifeSpan: "1963 - 活耀",
    faction: "tech",
    role: "輝達 NVIDIA 創辦人兼執行長 / 全球AI教父",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_jensen_huang.svg",
    importance: 5,
    hometown: "臺南市",
    shortBio: "史丹佛大學電機碩士。1993年創辦輝達（NVIDIA），發明GPU圖形處理器與CUDA並行運算架構。進入AI大模型時代市值突破三兆美元，多次公開盛讚「臺灣是全球科技與AI革命之中心無名英雄」。",
    historicalSignificance: "掀起全球生成式人工智慧與深度學習工業革命之世界級科技領袖，全球臺灣科技鏈核心靈魂。",
    abilities: { strategy: 100, commanding: 98, politics: 90, intellect: 100, courage: 100, charisma: 100 }
  },
  {
    id: "fig_tw_lisa_su",
    name: "蘇姿丰",
    courtesyName: "Lisa Su",
    lifeSpan: "1969 - 活耀",
    faction: "tech",
    role: "超微半導體 AMD 董事長兼執行長 / 晶片半導體女王",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_lisa_su.svg",
    importance: 5,
    hometown: "臺南市",
    shortBio: "麻省理工學院（MIT）電機工程博士。接掌瀕臨破產之AMD，主導Zen架構高效能處理器革命，與台積電緊密合作反超英特爾，獲選美國總統科技顧問委員會委員與全球頂尖女性領袖。",
    historicalSignificance: "全球半導體史上最傑出之女性架構師與執行長，與臺灣半導體製造結為牢固戰略同盟。",
    abilities: { strategy: 99, commanding: 96, politics: 92, intellect: 100, courage: 98, charisma: 97 }
  },
  {
    id: "fig_tw_chen_shu_chu",
    name: "陳樹菊",
    courtesyName: "愛心菜販 / 時代百大人物",
    lifeSpan: "1950 - 活耀",
    faction: "taiwan",
    role: "臺東中央市場菜販 / 慈善家",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_chen_shu_chu.svg",
    importance: 5,
    hometown: "雲林縣西螺鎮 (立足臺東半世紀)",
    shortBio: "每日在臺東中央市場賣菜數十年，生活極度節儉，將一分一毫積攢之近兩千萬所得全數捐贈蓋圖書館、孤兒院與助學基金。獲選時代雜誌全球百大影響力人物與麥格塞塞獎。",
    historicalSignificance: "臺灣最純粹樸實之平民慈善楷模，展現臺灣民間互助溫暖之最高道德典範。",
    abilities: { strategy: 70, commanding: 65, politics: 70, intellect: 85, courage: 100, charisma: 100 }
  },
  {
    id: "fig_tw_ang_lee",
    name: "李安",
    courtesyName: "Ang Lee",
    lifeSpan: "1954 - 活耀",
    faction: "culture",
    role: "奧斯卡最佳導演 / 國際電影巨擘",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_ang_lee.svg",
    importance: 5,
    hometown: "屏東縣潮州鎮 (成長於臺南)",
    shortBio: "紐約大學電影研究所畢業。以《臥虎藏龍》獲奧斯卡最佳外語片，以《斷背山》《少年PI的奇幻漂流》兩度榮獲奧斯卡最佳導演獎，並奪威尼斯金獅獎與柏林金熊獎，融會中西人性格局深沈。",
    historicalSignificance: "華人世界首屈一指之國際電影巨匠，將臺灣人文深度與東方哲學推向全球藝術殿堂。",
    abilities: { strategy: 90, commanding: 94, politics: 84, intellect: 100, courage: 96, charisma: 99 }
  },
  {
    id: "fig_tw_tai_tzu_ying",
    name: "戴資穎",
    courtesyName: "小戴 / 羽球球后",
    lifeSpan: "1994 - 活耀",
    faction: "sports",
    role: "羽球女子單打世界第一紀錄保持者 / 奧運銀牌",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_tai_tzu_ying.svg",
    importance: 5,
    hometown: "高雄市三民區",
    shortBio: "以靈巧多變之假動作與魔術球風風靡世界羽壇。生涯位居BWF世界球后寶座累計達214週，為女子單打史上最長紀錄，榮獲奧運銀牌、亞運金牌與世界羽聯年終總決賽四冠王。",
    historicalSignificance: "臺灣體育史上最具統治力之世界球后，以「相信自己」之頑強鬥志激勵數代年輕人。",
    abilities: { strategy: 95, commanding: 80, politics: 75, intellect: 94, courage: 100, charisma: 100 }
  }
];

// Generate SVG files
console.log('Generating massive additional SVG seals...');
massiveFigures.forEach(fig => {
  generateSvgSeal(fig.id, fig.name, fig.faction);
});
console.log('All massive figure seals generated!');

module.exports = { massiveFigures };
