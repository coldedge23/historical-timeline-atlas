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
  console.log(`Generated seal: ${outputPath}`);
}

// 20 New Dedicated Taiwan Figures
const dedicatedFigures = [
  {
    id: "fig_tw_kamachat",
    name: "甘馬轄·阿達夫",
    courtesyName: "Kamachat Aslammie",
    lifeSpan: "約1600 - 1650",
    faction: "taiwan",
    role: "大肚王國白晝之王 / 拍瀑拉族大頭目",
    roleType: "monarch",
    avatar: "./images/figures/fig_tw_kamachat.svg",
    importance: 5,
    hometown: "中臺灣大肚溪流域",
    shortBio: "大肚王國跨部落邦聯君主，拍瀑拉族傳奇領袖。統轄中臺灣大甲溪至大肚溪流域十八社，農牧互市獨立自主，1644年成功率勇士伏擊阻擊荷蘭遠征軍。",
    historicalSignificance: "臺灣有明確文獻記載之首位跨部落南島邦聯最高統帥，奠定中部原住民族捍衛家園之典範。",
    abilities: { strategy: 88, commanding: 93, politics: 89, intellect: 84, courage: 96, charisma: 95 }
  },
  {
    id: "fig_tw_coyett",
    name: "揆一",
    courtesyName: "Frederick Coyett",
    lifeSpan: "1615 - 1687",
    faction: "taiwan",
    role: "荷蘭東印度公司末代臺灣長官",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_coyett.svg",
    importance: 4,
    hometown: "瑞典斯德哥爾摩 (荷蘭東印度公司)",
    shortBio: "荷蘭東印度公司第十二任暨最後一任臺灣長官。在熱蘭遮城率千餘守軍抗擊鄭成功圍城九個月，城破後簽訂條約體面退兵，著有《被遺誤的臺灣》。",
    historicalSignificance: "主持熱蘭遮城終極保衛戰，其著作《被遺誤的臺灣》為大航海時代臺灣珍貴第一手史料。",
    abilities: { strategy: 82, commanding: 85, politics: 80, intellect: 88, courage: 84, charisma: 79 }
  },
  {
    id: "fig_tw_shen_guangwen",
    name: "沈光文",
    courtesyName: "文開 / 號斯菴",
    lifeSpan: "1612 - 1688",
    faction: "taiwan",
    role: "開臺先師 / 東瀛詩社創立者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_shen_guangwen.svg",
    importance: 5,
    hometown: "浙江省寧波府鄞縣",
    shortBio: "明末進士。南渡因颶風漂流至臺灣，結廬善化教化平埔族人漢學草藥，創立臺灣第一個文人團體「東瀛詩社」，被尊為「海東文獻初祖」、「開臺先師」。",
    historicalSignificance: "臺灣漢語文學與文教奠基始祖，開創臺灣四百年儒學詩文傳承。",
    abilities: { strategy: 75, commanding: 62, politics: 82, intellect: 96, courage: 85, charisma: 94 }
  },
  {
    id: "fig_tw_wu_sha",
    name: "吳沙",
    courtesyName: "開蘭第一先驅",
    lifeSpan: "1731 - 1798",
    faction: "taiwan",
    role: "開蘭始祖 / 拓墾頭圍召募墾首",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wu_sha.svg",
    importance: 5,
    hometown: "福建省漳州府漳浦縣",
    shortBio: "乾隆年間渡臺入三貂社。率漳、泉、粵三籍墾民千餘人跨越三貂嶺進入宜蘭平原開墾頭圍（今頭城），以草藥救助噶瑪蘭族人建立互信，化草萊為良田。",
    historicalSignificance: "成功開拓蘭陽平原之傳奇墾首，破除省籍藩籬，被後世尊奉為「開蘭始祖」。",
    abilities: { strategy: 85, commanding: 88, politics: 84, intellect: 86, courage: 92, charisma: 91 }
  },
  {
    id: "fig_tw_shi_shibang",
    name: "施世榜",
    courtesyName: "長齡 / 號東邨",
    lifeSpan: "1671 - 1743",
    faction: "taiwan",
    role: "清代水利開闢先驅 / 八堡圳興建者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_shi_shibang.svg",
    importance: 5,
    hometown: "福建省泉州府晉江縣",
    shortBio: "施琅同宗。傾家蕩產募資開鑿彰化「八堡圳」（施厝圳），引濁水溪之水灌溉十三堡八堡之廣袤平原，使中臺灣成為稻米甘蔗之豐饒穀倉。",
    historicalSignificance: "興築臺灣水利灌溉史上最大規模之八堡圳，奠定中臺灣數百年農業繁榮根基。",
    abilities: { strategy: 86, commanding: 72, politics: 90, intellect: 94, courage: 88, charisma: 89 }
  },
  {
    id: "fig_tw_cao_jin",
    name: "曹謹",
    courtesyName: "懷璞 / 號定庵",
    lifeSpan: "1787 - 1849",
    faction: "taiwan",
    role: "鳳山知縣 / 曹公圳興建者",
    roleType: "minister",
    avatar: "./images/figures/fig_tw_cao_jin.svg",
    importance: 5,
    hometown: "河南省懷慶府河內縣",
    shortBio: "任臺灣鳳山知縣期間，為根絕旱災引下淡水溪（高屏溪）開鑿「曹公圳」灌溉數萬甲田，修築鳳山新城砲台、興辦義塾、禦敵防盜，士民感念立生祠祀之。",
    historicalSignificance: "南臺灣最具民望之清代名臣，曹公圳澤被南臺灣平原近兩百年。",
    abilities: { strategy: 85, commanding: 82, politics: 95, intellect: 92, courage: 86, charisma: 94 }
  },
  {
    id: "fig_tw_yang_tingli",
    name: "楊廷理",
    courtesyName: "雙梧",
    lifeSpan: "1747 - 1813",
    faction: "taiwan",
    role: "臺灣知府 / 籌設噶瑪蘭廳第一人",
    roleType: "minister",
    avatar: "./images/figures/fig_tw_yang_tingli.svg",
    importance: 5,
    hometown: "廣西省柳州府馬平縣",
    shortBio: "五度入蘭平定蔡牽海盜，五度奉派臺南知府。極力向朝廷陳請將噶瑪蘭納入版圖，親履山川規劃頭圍、五圍宜蘭城，建立官制學校，被譽為「開蘭第一官」。",
    historicalSignificance: "確立東臺灣正式納入中央官制行政版圖之首功之臣，宜蘭地方祀為昭應宮開蘭名宦。",
    abilities: { strategy: 88, commanding: 84, politics: 94, intellect: 90, courage: 89, charisma: 92 }
  },
  {
    id: "fig_tw_mackay",
    name: "馬偕",
    courtesyName: "George Leslie Mackay",
    lifeSpan: "1844 - 1901",
    faction: "taiwan",
    role: "加拿大長老教會宣教士 / 現代西醫與教育先驅",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_mackay.svg",
    importance: 5,
    hometown: "加拿大安大略省牛津郡",
    shortBio: "1872年抵淡水。以「寧願燒盡，不願銹壞」為信念，創立滬尾偕醫館拔牙數萬顆，創辦牛津學堂與全臺首座女子中學，娶臺籍女子張聰明，長眠淡水淡江中學。",
    historicalSignificance: "現代醫學、公衛與西式高等教育引進臺灣第一巨擘，深愛臺灣之典範聖徒。",
    abilities: { strategy: 86, commanding: 78, politics: 88, intellect: 98, courage: 98, charisma: 100 }
  },
  {
    id: "fig_tw_barclay",
    name: "巴克禮",
    courtesyName: "Thomas Barclay",
    lifeSpan: "1849 - 1935",
    faction: "taiwan",
    role: "英國長老教會宣教士 / 臺南神學院創辦人 / 和平使者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_barclay.svg",
    importance: 5,
    hometown: "蘇格蘭格拉斯哥",
    shortBio: "在臺南宣教長達六十年。創立臺南神學院、創辦臺灣第一份報紙《臺灣府城教會報》，引進首部印刷機。1895年乙未割臺受府城紳民推派冒死出城和平交涉引日軍和平進城，保全府城百萬生靈免遭戰火屠戮。",
    historicalSignificance: "臺灣現代印刷傳媒與盲人教育之父，乙未交涉免去臺南屠城浩劫之和平守護者。",
    abilities: { strategy: 84, commanding: 70, politics: 92, intellect: 97, courage: 97, charisma: 98 }
  },
  {
    id: "fig_tw_lin_chaodong",
    name: "林朝棟",
    courtesyName: "蔭堂",
    lifeSpan: "1851 - 1904",
    faction: "taiwan",
    role: "霧峰林家抗法名將 / 棟軍統帥",
    roleType: "general",
    avatar: "./images/figures/fig_tw_lin_chaodong.svg",
    importance: 5,
    hometown: "臺灣省彰化縣阿罩霧 (今臺中霧峰)",
    shortBio: "霧峰林家代表名將。中法戰爭率鄉勇五百人奔赴基隆，依託獅球嶺砲台與法軍殊死血戰，重創法軍海軍陸戰隊。劉銘傳建省撫番特任其統率全省「棟軍」十營，開闢中路山林要道。",
    historicalSignificance: "中法戰爭保全北臺灣之本土軍事統帥，奠定霧峰林家在近代政治軍事之崇高威望。",
    abilities: { strategy: 87, commanding: 93, politics: 82, intellect: 84, courage: 95, charisma: 90 }
  },
  {
    id: "fig_tw_wu_tangxing",
    name: "吳湯興",
    courtesyName: "紹倫 / 號暾谷",
    lifeSpan: "1860 - 1895",
    faction: "taiwan",
    role: "乙未保臺義勇軍統領 / 抗日烈士",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wu_tangxing.svg",
    importance: 5,
    hometown: "臺灣省苗栗縣銅鑼灣",
    shortBio: "苗栗客家秀才。馬關割臺後散盡家財在銅鑼誓師抗日，獲丘逢甲授義軍統領。率客家義民與徐驤、吳彭年黑旗軍合兵，在彰化八卦山與日軍近衛師團展開最慘烈肉搏會戰，身中數彈壯烈殉國。",
    historicalSignificance: "臺灣乙未抗日戰爭最高精神象徵，「一寸山河一寸血」之民族浩然正氣楷模。",
    abilities: { strategy: 86, commanding: 94, politics: 80, intellect: 85, courage: 100, charisma: 96 }
  },
  {
    id: "fig_tw_xu_xiang",
    name: "徐驤",
    courtesyName: "雲祥",
    lifeSpan: "1858 - 1895",
    faction: "taiwan",
    role: "乙未抗日義軍首領 / 轉戰全臺名將",
    roleType: "general",
    avatar: "./images/figures/fig_tw_xu_xiang.svg",
    importance: 5,
    hometown: "臺灣省苗栗縣頭份庄",
    shortBio: "客家秀才。散盡家產招募「田賦軍」，轉戰桃園、新竹、苗栗、彰化八卦山、雲林大莆林、嘉義與臺南。轉戰全臺大小十二戰身受數十創，最後在臺南曾文溪決戰壯烈犧牲，臨終高呼「此日誓死，不可不見祖宗於地下！」。",
    historicalSignificance: "乙未抗日轉戰最烈、死守時間最長之義勇軍傳奇戰神，被譽為「臺灣抗日第一烈士」。",
    abilities: { strategy: 88, commanding: 96, politics: 78, intellect: 83, courage: 100, charisma: 95 }
  },
  {
    id: "fig_tw_hatta_yoichi",
    name: "八田與一",
    courtesyName: "Yoichi Hatta",
    lifeSpan: "1886 - 1942",
    faction: "taiwan",
    role: "水利土木巨匠 / 嘉南大圳與烏山頭水庫之父",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_hatta_yoichi.svg",
    importance: 5,
    hometown: "日本石川縣河北郡 (立足臺灣三十年)",
    shortBio: "東京帝國大學土木工學科畢業。親歷風霜十年，設計並築成東亞當時最大之半半成型水壩「烏山頭水庫」與灌溉渠長萬餘公里之「嘉南大圳」，化十五萬公頃鹽分旱地為良田。",
    historicalSignificance: "臺灣現代水利工程最偉大之奠基者，其塑像至今屹立於烏山頭水庫畔受世代臺灣農民感戴。",
    abilities: { strategy: 92, commanding: 85, politics: 84, intellect: 99, courage: 94, charisma: 95 }
  },
  {
    id: "fig_tw_shi_hengfeng",
    name: "史恆豐",
    courtesyName: "大膽島英雄營長",
    lifeSpan: "1921 - 2011",
    faction: "taiwan",
    role: "大二膽島戰役營長 / 陸軍少將",
    roleType: "general",
    avatar: "./images/figures/fig_tw_shi_hengfeng.svg",
    importance: 5,
    hometown: "陝西省華縣",
    shortBio: "1950年7月解放軍加強營渡海突襲大膽島與二膽島。時任第七十五師第二二五團第一營營長史恆豐率不足三百守軍沈著應戰，肉搏反包圍全殲並俘虜登陸敵軍，蔣經國題贈「島孤人不孤」。",
    historicalSignificance: "大膽島大捷締造者，以寡敵眾粉碎敵軍奪島企圖，牢固金門大膽之海防前線要塞。",
    abilities: { strategy: 89, commanding: 97, politics: 75, intellect: 82, courage: 99, charisma: 92 }
  },
  {
    id: "fig_tw_wang_shengming",
    name: "王生明",
    courtesyName: "至誠",
    lifeSpan: "1910 - 1955",
    faction: "taiwan",
    role: "一江山守備司令官 / 追晉陸軍少將",
    roleType: "general",
    avatar: "./images/figures/fig_tw_wang_shengming.svg",
    importance: 5,
    hometown: "湖南省祁陽縣",
    shortBio: "1955年1月解放軍陸海空軍大舉合圍一江山島。王生明率千餘守軍堅守彈丸小島死戰三晝夜，擊沉敵登陸艇多艘。陣地遭數萬發砲彈夷平後，王生明引爆最後一枚手榴彈壯烈成仁。",
    historicalSignificance: "一江山血戰促成美國國會高票通過《臺灣決議案》並批准《中美共同防禦條約》，奠定海峽冷戰安全鐵壁。",
    abilities: { strategy: 85, commanding: 98, politics: 72, intellect: 80, courage: 100, charisma: 95 }
  },
  {
    id: "fig_tw_gao_kuiyuan",
    name: "高魁元",
    courtesyName: "煜辰",
    lifeSpan: "1907 - 2012",
    faction: "taiwan",
    role: "陸軍一級上將 / 參謀總長 / 國防部長",
    roleType: "general",
    avatar: "./images/figures/fig_tw_gao_kuiyuan.svg",
    importance: 5,
    hometown: "山東省嶧縣",
    shortBio: "黃埔軍校四期。1949年金門古寧頭戰役時任第十八軍軍長，親臨前線指揮反攻反包圍，全殲登陸敵軍。後任陸軍總司令、參謀總長、國防部長，守護臺海半個世紀。",
    historicalSignificance: "古寧頭大捷第一線戰功最高將領，臺灣戰後軍事國防現代化關鍵支柱。",
    abilities: { strategy: 92, commanding: 96, politics: 90, intellect: 88, courage: 95, charisma: 92 }
  },
  {
    id: "fig_tw_deng_yuxian",
    name: "鄧雨賢",
    courtesyName: "崎頭純二",
    lifeSpan: "1906 - 1944",
    faction: "taiwan",
    role: "臺灣歌謠之父 / 古典作曲家",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_deng_yuxian.svg",
    importance: 5,
    hometown: "桃園市龍潭區客家望族",
    shortBio: "臺北師範學校畢業，留學日本學習西洋音樂。創作出傳唱近百年的四月望雨不朽經典：《四季紅》、《月夜愁》、《望春風》、《雨夜花》，被尊為「臺灣歌謠之父」。",
    historicalSignificance: "將西方現代管弦樂理融入臺灣本土歌謠旋律，凝聚臺灣世代共同靈魂情感之文化巨匠。",
    abilities: { strategy: 70, commanding: 60, politics: 72, intellect: 98, courage: 82, charisma: 97 }
  },
  {
    id: "fig_tw_huang_tushui",
    name: "黃土水",
    courtesyName: "臺灣第一雕塑大師",
    lifeSpan: "1895 - 1930",
    faction: "taiwan",
    role: "西洋雕塑先驅 / 帝展首位入選者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_huang_tushui.svg",
    importance: 5,
    hometown: "臺北市大稻埕",
    shortBio: "東京美術學校畢業。1920年以《山童吹笛》成為臺灣第一位入選帝國美術展覽會之藝術家，四度入選帝展。嘔心瀝血創作長五公尺半浮雕國寶《水牛群像》，為藝術鞠躬盡瘁壯年病逝。",
    historicalSignificance: "臺灣現代西方純藝術創作之開山宗師，以東方水牛意象刻畫臺灣鄉土靈魂深處。",
    abilities: { strategy: 74, commanding: 58, politics: 70, intellect: 99, courage: 94, charisma: 96 }
  },
  {
    id: "fig_tw_chen_chengpo",
    name: "陳澄波",
    courtesyName: "臺灣油畫先驅",
    lifeSpan: "1895 - 1947",
    faction: "taiwan",
    role: "西洋繪畫巨匠 / 赤島社與臺陽美術協會創立者",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_chen_chengpo.svg",
    importance: 5,
    hometown: "嘉義市",
    shortBio: "東京美術學校西洋畫科畢業。1926年以油畫《嘉義街外》成為第一位入選日本帝展之臺灣西洋畫家，創辦赤島社與臺陽美展，以熱烈強烈之色彩筆觸展現臺灣南國陽光生命力。",
    historicalSignificance: "臺灣西洋繪畫黃金時代先驅旗手，以深沈土地情感建立臺灣本土美學高度主體性。",
    abilities: { strategy: 76, commanding: 64, politics: 75, intellect: 98, courage: 92, charisma: 96 }
  },
  {
    id: "fig_tw_chi_cheng",
    name: "紀政",
    courtesyName: "飛躍的羚羊",
    lifeSpan: "1944 - 活耀",
    faction: "taiwan",
    role: "奧運女子田徑銅牌 / 世界紀錄締造者 / 體育大使",
    roleType: "advisor",
    avatar: "./images/figures/fig_tw_chi_cheng.svg",
    importance: 5,
    hometown: "新竹市",
    shortBio: "1968年墨西哥奧運女子80公尺跨欄銅牌，為臺灣女性運動員奪得首面奧運獎牌。多次打破百公尺、跨欄世界紀錄，被國際體壇譽為「飛躍的羚羊」、「黃色閃電」。",
    historicalSignificance: "臺灣登上世界現代頂級體壇舞台之首位運動巨星，鼓舞數代臺灣青年奮勇自強。",
    abilities: { strategy: 78, commanding: 75, politics: 82, intellect: 88, courage: 100, charisma: 99 }
  }
];

// Generate SVG files
console.log('Generating SVG Seals for dedicated Taiwan figures...');
dedicatedFigures.forEach(fig => {
  generateSvgSeal(fig.id, fig.name, fig.faction);
});

console.log('All 20 Dedicated Taiwan Figure SVG Seals generated successfully!');

module.exports = { dedicatedFigures };
