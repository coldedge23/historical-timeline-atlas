const fs = require('fs');
const path = require('path');

const basePeriodDir = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'republicModern');
const imagesDir = path.resolve(__dirname, '..', 'images', 'figures');

if (!fs.existsSync(basePeriodDir)) {
  fs.mkdirSync(basePeriodDir, { recursive: true });
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Helper to generate SVG seal avatar
function createSvgSeal(name, faction, outputPath) {
  let color = '#06b6d4';
  let era = '民';
  
  if (faction === 'republic' || faction === 'kmt') { color = '#3b82f6'; era = '民'; }
  else if (faction === 'taiwan') { color = '#10b981'; era = '臺'; }
  else if (faction === 'scholar' || faction === 'culture') { color = '#8b5cf6'; era = '文'; }
  else if (faction === 'military' || faction === 'general') { color = '#f59e0b'; era = '將'; }
  else if (faction === 'warlord') { color = '#d97706'; era = '軍'; }
  else if (faction === 'tech' || faction === 'reform') { color = '#06b6d4'; era = '建'; }
  
  const fallbackChar = name.length > 0 ? name[name.length - 1] : '先';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad_${era}_${name}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#111827"/>
    </radialGradient>
    <filter id="glow_${era}_${name}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="200" height="200" fill="url(#bgGrad_${era}_${name})"/>
  <circle cx="100" cy="100" r="88" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  <circle cx="100" cy="100" r="74" fill="${color}" fill-opacity="0.15"/>
  <rect x="52" y="52" width="96" height="96" rx="8" fill="#1e3a8a" fill-opacity="0.3" stroke="#60a5fa" stroke-width="1.5"/>
  <text x="100" y="118" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="52" font-weight="900" fill="#f8fafc" text-anchor="middle" filter="url(#glow_${era}_${name})">${fallbackChar}</text>
  <text x="100" y="172" font-family="'Noto Serif TC', sans-serif" font-size="13" font-weight="bold" fill="#bae6fd" text-anchor="middle" letter-spacing="3">${era}·${name}</text>
</svg>`;
  fs.writeFileSync(outputPath, svg, 'utf8');
}

console.log('Building Stage 10: Republic & Modern Era (republicModern)...');

// 1. Figures (46 figures)
const figuresData = [
  {
    id: "fig_sun_yatsen",
    name: "孫中山",
    courtesyName: "逸仙 / 號中山樵",
    lifeSpan: "1866 - 1925",
    faction: "republic",
    role: "中華民國國父 / 臨時大總統",
    roleType: "monarch",
    avatar: "./images/figures/fig_sun_yatsen.svg",
    importance: 5,
    hometown: "廣東省香山縣 (今中山市)",
    shortBio: "首倡推翻滿清帝制，創立興中會與中國同盟會，提出三民主義與五權憲法。領導十次武裝起義，1911年辛亥革命成功，當選中華民國第一任臨時大總統，被尊為「國父」。",
    historicalSignificance: "終結華夏兩千多年帝制，肇建亞洲第一個民主共和國，奠定現代憲政思想根本綱領。",
    abilities: { strategy: 95, commanding: 78, politics: 98, intellect: 99, courage: 96, charisma: 100 }
  },
  {
    id: "fig_huang_xing_rep",
    name: "黃興",
    courtesyName: "克強",
    lifeSpan: "1874 - 1916",
    faction: "republic",
    role: "辛亥革命開國元勳 / 陸軍總長",
    roleType: "general",
    avatar: "./images/figures/fig_huang_xing_rep.svg",
    importance: 5,
    hometown: "湖南省善化縣 (今長沙市)",
    shortBio: "與孫中山並稱「孫黃」。創立華興會，親冒矢石身先士卒領導黃花崗起義與陽夏之戰，武昌起義後任各省都督府代表聯合會參謀總長與中華民國臨時政府陸軍總長。",
    historicalSignificance: "辛亥武裝起義第一前線統帥，「無公則無民國，有史必有斯人」。",
    abilities: { strategy: 90, commanding: 95, politics: 86, intellect: 88, courage: 100, charisma: 94 }
  },
  {
    id: "fig_song_jiaoren",
    name: "宋教仁",
    courtesyName: "鈍初 / 漁父",
    lifeSpan: "1882 - 1913",
    faction: "republic",
    role: "憲政之父 / 國民黨代理理事長",
    roleType: "statesman",
    avatar: "./images/figures/fig_song_jiaoren.svg",
    importance: 5,
    hometown: "湖南省桃源縣",
    shortBio: "倡導責任內閣制與責任政黨政治，將同盟會改組為國民黨並於首屆國會大選贏得壓倒性多數。1913年於上海火車站遇刺殉國，年僅31歲。",
    historicalSignificance: "民國憲政與議會民主制度的第一奠基者與殉道者。",
    abilities: { strategy: 92, commanding: 65, politics: 98, intellect: 97, courage: 92, charisma: 92 }
  },
  {
    id: "fig_cai_e",
    name: "蔡鍔",
    courtesyName: "松坡",
    lifeSpan: "1882 - 1916",
    faction: "military",
    role: "護國軍起義領袖 / 雲南都督",
    roleType: "general",
    avatar: "./images/figures/fig_cai_e.svg",
    importance: 5,
    hometown: "湖南省寶慶府邵陽縣",
    shortBio: "早年留學日本士官學校。辛亥革命爆發於昆明發動「重九起義」。袁世凱稱帝後，蔡鍔潛離北京返滇發起護國戰爭，出兵四川與北洋精銳血戰，迫使袁世凱取消帝制。",
    historicalSignificance: "再造共和之第一功臣，護國討袁捍衛民主政體。",
    abilities: { strategy: 95, commanding: 98, politics: 85, intellect: 92, courage: 99, charisma: 95 }
  },
  {
    id: "fig_chiang_kaishek",
    name: "蔣中正",
    courtesyName: "介石",
    lifeSpan: "1887 - 1975",
    faction: "kmt",
    role: "國民革命軍總司令 / 中華民國總統",
    roleType: "monarch",
    avatar: "./images/figures/fig_chiang_kaishek.svg",
    importance: 5,
    hometown: "浙江省奉化縣",
    shortBio: "黃埔軍校首任校長。率國民革命軍發動北伐統一全國；領導抗日戰爭浴血苦戰八年取得最後勝利，光復臺灣並使中國躋身聯合國創始五大常任理事國；政府遷臺後穩定臺海局勢並推動土地改革與基礎教育。",
    historicalSignificance: "領導北伐統一大業、領導十四年艱苦抗戰光復臺灣、維護中華民國憲政體制。",
    abilities: { strategy: 92, commanding: 92, politics: 94, intellect: 88, courage: 95, charisma: 95 }
  },
  {
    id: "fig_cai_yuanpei",
    name: "蔡元培",
    courtesyName: "孑民",
    lifeSpan: "1868 - 1940",
    faction: "scholar",
    role: "國立北京大學校長 / 中央研究院院長",
    roleType: "scholar",
    avatar: "./images/figures/fig_cai_yuanpei.svg",
    importance: 5,
    hometown: "浙江省紹興府山陰縣",
    shortBio: "光緒進士，留德學者。歷任中華民國首任教育總長、北京大學校長、中央研究院首任院長。提出「思想自由，兼容並包」校風，開拓現代高等學術教育之基石。",
    historicalSignificance: "五四新文化運動精神導師，現代中國學術教育之柱石。",
    abilities: { strategy: 86, commanding: 60, politics: 90, intellect: 99, courage: 90, charisma: 98 }
  },
  {
    id: "fig_hu_shi",
    name: "胡適",
    courtesyName: "適之",
    lifeSpan: "1891 - 1962",
    faction: "scholar",
    role: "新文化運動旗手 / 中央研究院院長",
    roleType: "scholar",
    avatar: "./images/figures/fig_hu_shi.svg",
    importance: 5,
    hometown: "安徽省徽州府績溪縣",
    shortBio: "提倡白話文運動，發表《文學改良芻議》，引介杜威實用主義。歷任駐美大使、北京大學校長與中央研究院院長。倡導「大膽假設，小心求證」與自由民主主義憲政理念。",
    historicalSignificance: "白話文新文學運動領航人，自由主義思想大師。",
    abilities: { strategy: 88, commanding: 55, politics: 90, intellect: 99, courage: 88, charisma: 96 }
  },
  {
    id: "fig_lu_xun",
    name: "魯迅",
    courtesyName: "周樹人",
    lifeSpan: "1881 - 1936",
    faction: "scholar",
    role: "現代文學泰斗 / 思想批判巨擘",
    roleType: "scholar",
    avatar: "./images/figures/fig_lu_xun.svg",
    importance: 5,
    hometown: "浙江省紹興府",
    shortBio: "發表中國現代第一篇白話小說《狂人日記》與《阿Q正傳》，以犀利辛辣的雜文剖析國民劣根性與封建禮教，深刻啟迪現代華人知識分子思想自覺。",
    historicalSignificance: "現代批判文學奠基巨擘，二十世紀最具震撼力之思想家。",
    abilities: { strategy: 85, commanding: 50, politics: 78, intellect: 99, courage: 96, charisma: 94 }
  },
  {
    id: "fig_lin_xiantang",
    name: "林獻堂",
    courtesyName: "灌園",
    lifeSpan: "1881 - 1956",
    faction: "taiwan",
    role: "臺灣議會設置請願運動領袖 / 臺灣議會之父",
    roleType: "statesman",
    avatar: "./images/figures/fig_lin_xiantang.svg",
    importance: 5,
    hometown: "臺灣府彰化縣霧峰庄 (今臺中霧峰)",
    shortBio: "霧峰林家代表人物。日治時期領導長達十四年的「臺灣議會設置請願運動」，資助並創立臺灣文化協會、新民會、臺灣民眾黨與《臺灣民報》，堅持非暴力體制內民主抗爭。",
    historicalSignificance: "臺灣民族自治運動與民主啟蒙的第一導師，被尊稱為「臺灣議會之父」。",
    abilities: { strategy: 94, commanding: 70, politics: 97, intellect: 95, courage: 96, charisma: 98 }
  },
  {
    id: "fig_chiang_weishui",
    name: "蔣渭水",
    courtesyName: "雪谷",
    lifeSpan: "1891 - 1931",
    faction: "taiwan",
    role: "臺灣文化協會創辦人 / 臺灣民眾黨領袖",
    roleType: "statesman",
    avatar: "./images/figures/fig_chiang_weishui.svg",
    importance: 5,
    hometown: "宜蘭縣宜蘭市",
    shortBio: "臺灣總督府醫學校畢業。發表名文《臨床講義》將臺灣診斷為「知識營養不良症」。創立臺灣文化協會、臺灣民眾黨與臺灣工友總聯盟，推動文化啟蒙與社會抗爭，十餘次入獄志節不移。",
    historicalSignificance: "臺灣社會運動與政治啟蒙之靈魂人物，被尊為「臺灣的孫中山」。",
    abilities: { strategy: 95, commanding: 80, politics: 98, intellect: 96, courage: 99, charisma: 100 }
  },
  {
    id: "fig_lai_he",
    name: "賴和",
    courtesyName: "懶雲 / 本名賴河",
    lifeSpan: "1894 - 1943",
    faction: "taiwan",
    role: "臺灣新文學之父 / 彰化人慈醫",
    roleType: "scholar",
    avatar: "./images/figures/fig_lai_he.svg",
    importance: 5,
    hometown: "彰化縣彰化市",
    shortBio: "仁心仁術行醫濟世，被彰化鄉親尊為「彰化媽祖」。提倡以臺灣話文創作現代小說、詩歌，主持《臺灣民報》文藝欄，提攜楊逵等無數青年作家，作品揭露殖民壓迫深沉動人。",
    historicalSignificance: "臺灣新文學運動奠基人，臺灣現代鄉土人文精神開山導師。",
    abilities: { strategy: 86, commanding: 55, politics: 82, intellect: 98, courage: 95, charisma: 96 }
  },
  {
    id: "fig_cai_peihuo",
    name: "蔡培火",
    courtesyName: "東山",
    lifeSpan: "1889 - 1983",
    faction: "taiwan",
    role: "臺灣文化協會理事 / 《臺灣民報》發行人",
    roleType: "statesman",
    avatar: "./images/figures/fig_cai_peihuo.svg",
    importance: 4,
    hometown: "臺南州新港庄 (今嘉義新港)",
    shortBio: "長期推動臺灣議會設置請願運動與白話字羅馬字普及教育，擔任《臺灣民報》常務董事與發行人，創作傳唱甚廣的《臺灣自治歌》。光復後任行政院政務委員與中華民國紅十字會副會長。",
    historicalSignificance: "日治臺灣非暴力啟蒙運動樞紐，連結戰前文化運動與戰後社會福利體系。",
    abilities: { strategy: 88, commanding: 62, politics: 92, intellect: 92, courage: 92, charisma: 90 }
  },
  {
    id: "fig_mona_rudao",
    name: "莫那·魯道",
    courtesyName: "Mona Rudo",
    lifeSpan: "1880 - 1930",
    faction: "taiwan",
    role: "霧社抗日起義領袖 / 賽德克族頭目",
    roleType: "general",
    avatar: "./images/figures/fig_mona_rudao.svg",
    importance: 5,
    hometown: "南投縣仁愛鄉霧社馬赫坡社",
    shortBio: "賽德克族馬赫坡社首領。1930年因日方長年苛政與壓迫，聯合賽德克族六社發動霧社起義，突襲霧社公學校運動會震驚日本朝野。退守險阻山林浴血抗戰至最後一刻，壯烈成仁。",
    historicalSignificance: "臺灣原住民族捍衛尊嚴與土地之不屈象徵，名列中華民國抗日忠烈祠。",
    abilities: { strategy: 88, commanding: 94, politics: 75, intellect: 82, courage: 100, charisma: 98 }
  },
  {
    id: "fig_zhang_zizhong",
    name: "張自忠",
    courtesyName: "藎忱",
    lifeSpan: "1891 - 1940",
    faction: "military",
    role: "第三十三集團軍總司令 / 二戰抗日殉國最高將領",
    roleType: "general",
    avatar: "./images/figures/fig_zhang_zizhong.svg",
    importance: 5,
    hometown: "山東省臨清縣",
    shortBio: "喜峰口抗戰重創日軍。台兒莊大戰率五十九軍馳援臨沂，浴血阻擊日軍坂垣師團。1940年棗宜會戰親率衛隊渡襄河阻截日軍主力，於宜城南瓜店激戰中彈壯烈殉國。",
    historicalSignificance: "第二次世界大戰盟軍犧牲之最高階軍事將領，忠烈之氣貫日月。",
    abilities: { strategy: 90, commanding: 98, politics: 78, intellect: 86, courage: 100, charisma: 98 }
  },
  {
    id: "fig_xue_yue",
    name: "薛岳",
    courtesyName: "伯陵",
    lifeSpan: "1896 - 1998",
    faction: "military",
    role: "第九戰區司令長官 / 抗日「長沙會戰天爐戰神」",
    roleType: "general",
    avatar: "./images/figures/fig_xue_yue.svg",
    importance: 5,
    hometown: "廣東省樂昌縣",
    shortBio: "創設「天爐戰法」，於萬家嶺大捷全殲日軍一○六師團主力，並於三次長沙會戰中重創日軍精銳，消滅日軍逾十萬人，被譽為「抗日戰神」。來臺後任總統府戰略顧問。",
    historicalSignificance: "八年抗戰消滅日軍最多之第一線方面軍統帥，獲頒青天白日勳章與美國自由勳章。",
    abilities: { strategy: 96, commanding: 100, politics: 80, intellect: 92, courage: 98, charisma: 94 }
  },
  {
    id: "fig_sun_liren",
    name: "孫立人",
    courtesyName: "撫民 / 號仲能",
    lifeSpan: "1900 - 1990",
    faction: "military",
    role: "新編第三十八師師長 / 中國遠征軍統帥",
    roleType: "general",
    avatar: "./images/figures/fig_sun_liren.svg",
    importance: 5,
    hometown: "安徽省廬江縣",
    shortBio: "清華大學與美國維吉尼亞軍校畢業。率新三十八師入緬作戰，於「仁安羌大捷」以一個團兵力擊潰數倍日軍救出英軍七千人；後反攻緬北克胡康河谷、孟拱、密支那，揚威國際。後於鳳山練兵奠定臺灣防衛軍力。",
    historicalSignificance: "二戰盟軍公認戰功最卓著之現代裝甲步兵戰術大師，被譽為「東方隆美爾」。",
    abilities: { strategy: 95, commanding: 100, politics: 72, intellect: 95, courage: 99, charisma: 96 }
  },
  {
    id: "fig_li_zongren",
    name: "李宗仁",
    courtesyName: "德鄰",
    lifeSpan: "1891 - 1969",
    faction: "military",
    role: "第五戰區司令長官 / 中華民國副總統與代總統",
    roleType: "monarch",
    avatar: "./images/figures/fig_li_zongren.svg",
    importance: 5,
    hometown: "廣西省臨桂縣",
    shortBio: "新桂系領袖。北伐時率第七軍轉戰兩湖被譽為「鋼軍」。抗戰初期任第五戰區司令長官，親臨前線指揮台兒莊大戰重創日軍兩大王牌師團，取得抗戰正面戰場首次重大空前勝利。1948年當選中華民國首任副總統。",
    historicalSignificance: "指揮台兒莊大捷鼓舞全國軍民士氣，國民政府行憲後代總統。",
    abilities: { strategy: 94, commanding: 96, politics: 90, intellect: 88, courage: 96, charisma: 94 }
  },
  {
    id: "fig_dai_anlan",
    name: "戴安瀾",
    courtesyName: "衍功 / 號海齡",
    lifeSpan: "1904 - 1942",
    faction: "military",
    role: "第五軍第二○○師師長 / 緬甸同古保衛戰英魂",
    roleType: "general",
    avatar: "./images/figures/fig_dai_anlan.svg",
    importance: 4,
    hometown: "安徽省無為縣",
    shortBio: "黃埔三期畢業。崑崙關大捷率機械化師攻堅拔寨克復天險。1942年率二○○師出征緬甸，於同古保衛戰以孤軍抗擊日軍數倍兵力苦戰十二天掩護英軍撤退，撤退途中遭伏擊傷重殉國，毛澤東、蔣中正同賦挽詩。",
    historicalSignificance: "抗戰第一支機械化裝甲師師長，揚威異域之民族英烈。",
    abilities: { strategy: 90, commanding: 96, politics: 74, intellect: 88, courage: 100, charisma: 93 }
  },
  {
    id: "fig_xie_jinyuan",
    name: "謝晉元",
    courtesyName: "中民",
    lifeSpan: "1905 - 1941",
    faction: "military",
    role: "第八十八師五二四團副團長 / 八百壯士孤軍營長",
    roleType: "general",
    avatar: "./images/figures/fig_xie_jinyuan.svg",
    importance: 4,
    hometown: "廣東省蕉嶺縣",
    shortBio: "1937年淞滬會戰掩護大軍西撤，率「八百壯士」（實四百餘人）死守蘇州河北岸四行倉庫四晝夜，擊退日軍數十次瘋狂進攻，楊惠敏涉水獻國旗震動中外，展現中華民族寧死不屈血性。",
    historicalSignificance: "四行倉庫孤軍血戰指揮官，抗戰精神之不朽圖騰。",
    abilities: { strategy: 86, commanding: 95, politics: 70, intellect: 85, courage: 100, charisma: 97 }
  },
  {
    id: "fig_gao_zhihang",
    name: "高志航",
    courtesyName: "銘久",
    lifeSpan: "1907 - 1937",
    faction: "military",
    role: "空軍第四航空大隊大隊長 / 中華民國空軍戰神",
    roleType: "general",
    avatar: "./images/figures/fig_gao_zhihang.svg",
    importance: 4,
    hometown: "吉林省通化縣",
    shortBio: "留法航空精英。1937年「八一四空戰」日軍鹿屋航空隊轟炸筧橋機場，高志航冒雨起飛率第四大隊以劣勢裝備首創擊落多架日機之神話，打破日軍空軍不可戰勝狂言。後於周家口機場遇襲犧牲。",
    historicalSignificance: "空軍八一四勝利之靈魂英雄，被尊為「中華民國空軍軍魂」。",
    abilities: { strategy: 88, commanding: 96, politics: 65, intellect: 88, courage: 100, charisma: 96 }
  },
  {
    id: "fig_hu_lian",
    name: "胡璉",
    courtesyName: "伯玉",
    lifeSpan: "1907 - 1977",
    faction: "military",
    role: "金門防衛司令部司令官 / 古寧頭與八二三名將",
    roleType: "general",
    avatar: "./images/figures/fig_hu_lian.svg",
    importance: 5,
    hometown: "陝西省華縣",
    shortBio: "黃埔四期。抗戰時率十一師固守石牌要塞挫敗日軍西犯重慶野心。1949年任金門防衛司令官，指揮古寧頭戰役全殲登陸敵軍，1958年指揮八二三砲戰挫敗解放軍奪島意圖。在金門修築水利、創立金門酒廠與普及學校，被金門百姓尊為「現代恩主公」。",
    historicalSignificance: "兩度保衛金門捍衛臺澎安全，奠定金門民生現代建設功業。",
    abilities: { strategy: 95, commanding: 98, politics: 92, intellect: 90, courage: 99, charisma: 97 }
  },
  {
    id: "fig_ji_xingwen",
    name: "吉星文",
    courtesyName: "紹武",
    lifeSpan: "1907 - 1958",
    faction: "military",
    role: "第二一九團團長 / 金防部中將副司令官",
    roleType: "general",
    avatar: "./images/figures/fig_ji_xingwen.svg",
    importance: 4,
    hometown: "河南省扶溝縣",
    shortBio: "抗日名將吉鴻昌堂姪。1937年七七事變任二一九團團長堅守盧溝橋與宛平城，打響全民族十四年全面抗戰第一槍。1958年八二三砲戰第一輪猛烈砲火中於金門太武山翠谷壯烈殉國。",
    historicalSignificance: "打響抗戰第一槍，最終在金門前線保衛臺灣壯烈殉職，血染兩地。",
    abilities: { strategy: 85, commanding: 92, politics: 70, intellect: 82, courage: 99, charisma: 92 }
  },
  {
    id: "fig_yu_dawei",
    name: "俞大維",
    courtesyName: "俞大維",
    lifeSpan: "1897 - 1993",
    faction: "reform",
    role: "中華民國國防部長 / 現代彈道學兵工巨擘",
    roleType: "statesman",
    avatar: "./images/figures/fig_yu_dawei.svg",
    importance: 5,
    hometown: "浙江省紹興府山陰縣",
    shortBio: "哈佛大學哲學博士，柏林大學研習彈道學與數理邏輯。抗戰時期任兵工署署長，建立自給自足之後方軍火兵工體系。1954年起任國防部長，八二三砲戰親赴金門前線指揮並負傷，引進響尾蛇飛彈與八吋自走砲確保臺海制空制海權。",
    historicalSignificance: "奠定中華民國國防科技、兵工製造與現代三軍聯戰體系之核心領航者。",
    abilities: { strategy: 96, commanding: 92, politics: 95, intellect: 100, courage: 96, charisma: 94 }
  },
  {
    id: "fig_sun_yunsuan",
    name: "孫運璿",
    courtesyName: "孫運璿",
    lifeSpan: "1913 - 2006",
    faction: "tech",
    role: "行政院院長 / 臺灣經濟奇蹟總工程師",
    roleType: "statesman",
    avatar: "./images/figures/fig_sun_yunsuan.svg",
    importance: 5,
    hometown: "山東省蓬萊縣",
    shortBio: "哈爾濱工業大學畢業。戰後主持臺電修復工程，五個月內恢復全島80%電力破日人預言。任經濟部長與行政院長期間推動「十大建設」、創立工研院（ITRI），拍板引進美國RCA積體電路技術奠定新竹科學園區與台積電半導體產業帝國之根基。",
    historicalSignificance: "臺灣從農業社會轉型為全球高科技矽島的最關鍵決策者與公僕典範。",
    abilities: { strategy: 98, commanding: 90, politics: 98, intellect: 99, courage: 96, charisma: 99 }
  },
  {
    id: "fig_li_guoding",
    name: "李國鼎",
    courtesyName: "李國鼎",
    lifeSpan: "1910 - 2001",
    faction: "tech",
    role: "財政部長 / 行政院政務委員 / 科技教父",
    roleType: "statesman",
    avatar: "./images/figures/fig_li_guoding.svg",
    importance: 5,
    hometown: "江蘇省江寧府 (今南京市)",
    shortBio: "劍橋大學物理研究學者。歷任經濟部長、財政部長與政務委員。草擬《獎勵投資條例》設立加工出口區，推動創投基金並力邀張忠謀回臺主持工研院與創立台積電，規劃新竹科學園區。",
    historicalSignificance: "被譽為「臺灣科技教父」與「經濟奇蹟推手」，奠定現代臺灣全球半導體領導地位。",
    abilities: { strategy: 99, commanding: 88, politics: 96, intellect: 100, courage: 95, charisma: 97 }
  },
  {
    id: "fig_yin_zhongrong",
    name: "尹仲容",
    courtesyName: "尹仲容",
    lifeSpan: "1903 - 1963",
    faction: "tech",
    role: "臺灣省產物保險董事長 / 經濟安定委員會主委",
    roleType: "statesman",
    avatar: "./images/figures/fig_yin_zhongrong.svg",
    importance: 4,
    hometown: "湖南省邵陽縣",
    shortBio: "南洋大學（今上海交大）電機工程畢業。1950年代主導美援運用與民營化改革，大刀闊斧推動外匯貿易改革，扶植民營紡織、塑膠產業（包括促成王永慶台塑創業），奠定進口替代轉出口導向經濟戰略。",
    historicalSignificance: "臺灣戰後自由經濟轉型之開山舵手，公忠體國勇於任事。",
    abilities: { strategy: 96, commanding: 85, politics: 94, intellect: 97, courage: 98, charisma: 92 }
  },
  {
    id: "fig_yan_jiagan",
    name: "嚴家淦",
    courtesyName: "靜波",
    lifeSpan: "1905 - 1993",
    faction: "reform",
    role: "中華民國總統 / 新臺幣幣制改革設計者",
    roleType: "monarch",
    avatar: "./images/figures/fig_yan_jiagan.svg",
    importance: 4,
    hometown: "江蘇省蘇州府吳縣",
    shortBio: "聖約翰大學理學士。戰後來臺任財政廳長，1949年以四萬舊臺幣換一元新臺幣發行「新臺幣」，切斷惡性通膨穩定島內物價民生。歷任行政院長、副總統，於蔣中正逝世後繼任總統平穩過渡憲政。",
    historicalSignificance: "戰後新臺幣幣制改革功臣，維護物價安定與政局和平交接。",
    abilities: { strategy: 92, commanding: 80, politics: 96, intellect: 96, courage: 90, charisma: 92 }
  },
  {
    id: "fig_fu_sinian",
    name: "傅斯年",
    courtesyName: "孟真",
    lifeSpan: "1896 - 1950",
    faction: "scholar",
    role: "國立臺灣大學校長 / 中央研究院歷史語言研究所創辦人",
    roleType: "scholar",
    avatar: "./images/figures/fig_fu_sinian.svg",
    importance: 5,
    hometown: "山東省聊城縣",
    shortBio: "五四運動學生領袖之一，創立中央研究院歷史語言研究所。1949年出任國立臺灣大學校長，在風雨飄搖年代以「敦品、勵學、愛國、愛人」校訓力抗軍政干預保護師生學術自由，留下「傅鐘」二十一響精神永誌。",
    historicalSignificance: "塑造國立臺灣大學學術自由與人文風骨之精神靈魂，近代史學巨匠。",
    abilities: { strategy: 92, commanding: 75, politics: 92, intellect: 99, courage: 99, charisma: 98 }
  },
  {
    id: "fig_qian_mu",
    name: "錢穆",
    courtesyName: "賓四",
    lifeSpan: "1895 - 1990",
    faction: "scholar",
    role: "新亞書院創辦人 / 當代國學史學泰斗",
    roleType: "scholar",
    avatar: "./images/figures/fig_qian_mu.svg",
    importance: 4,
    hometown: "江蘇省常州府無錫縣",
    shortBio: "著《國史大綱》，倡導對本國歷史具備「溫情與敬意」。於香港創立新亞書院維繫中華文化命脈，晚年定居臺北士林素書樓講學不輟，為當代最具影響力之傳統文化史學宗師。",
    historicalSignificance: "傳承華夏文化道統，二十世紀最深厚之史學與思想導師。",
    abilities: { strategy: 88, commanding: 50, politics: 80, intellect: 100, courage: 92, charisma: 95 }
  },
  {
    id: "fig_yang_kui",
    name: "楊逵",
    courtesyName: "本名楊貴",
    lifeSpan: "1906 - 1985",
    faction: "taiwan",
    role: "臺灣社會主義文學家 / 壓不扁的玫瑰",
    roleType: "scholar",
    avatar: "./images/figures/fig_yang_kui.svg",
    importance: 4,
    hometown: "臺南廳大目降 (今臺南新化)",
    shortBio: "日治時期以小說《送報伕》入選日本中央文壇《文學評論》第二名，為臺灣作家首獲日本文壇殊榮。戰後發表《和平宣言》身陷綠島十二年，出獄後自稱「壓不扁的玫瑰」，作品洋溢人道關懷與堅毅。",
    historicalSignificance: "臺灣文學不屈意志之象徵，人道與和平理念踐行大師。",
    abilities: { strategy: 82, commanding: 50, politics: 78, intellect: 95, courage: 99, charisma: 92 }
  },
  {
    id: "fig_chiang_chingkuo",
    name: "蔣經國",
    courtesyName: "建豐",
    lifeSpan: "1910 - 1988",
    faction: "kmt",
    role: "中華民國總統 / 推動十大建設與解嚴民主化",
    roleType: "monarch",
    avatar: "./images/figures/fig_chiang_chingkuo.svg",
    importance: 5,
    hometown: "浙江省奉化縣",
    shortBio: "推動行政革新與十大建設，勤走民間基層。面對臺美斷交等內外劇變，啟用本土青年人才（如李登輝），晚年大魄力宣布解除實施三十八年的戒嚴令、開放黨禁、報禁與兩岸探親，宣示「我也是臺灣人」。",
    historicalSignificance: "推動臺灣經濟躍升現代先進社會，開啟臺灣和平民主轉型憲政新頁。",
    abilities: { strategy: 96, commanding: 90, politics: 98, intellect: 94, courage: 98, charisma: 99 }
  },
  {
    id: "fig_li_denghui",
    name: "李登輝",
    courtesyName: "岩里政男",
    lifeSpan: "1923 - 2020",
    faction: "republic",
    role: "中華民國首位民選總統 / 臺灣民主先生",
    roleType: "monarch",
    avatar: "./images/figures/fig_li_denghui.svg",
    importance: 5,
    hometown: "臺北州淡水郡三芝庄",
    shortBio: "康乃爾大學農業經濟學博士。1988年繼任總統，推動國會全面改選、終止動員戡亂時期臨時條款、廢除萬年國會，並於1996年完成中華民國歷史上首次總統直選，被《時代雜誌》譽為「民主先生（Mr. Democracy）」。",
    historicalSignificance: "主導臺灣「寧靜革命」，完成中華民國憲政由威權走向全面直選民主化體制。",
    abilities: { strategy: 98, commanding: 85, politics: 100, intellect: 98, courage: 97, charisma: 96 }
  },
  {
    id: "fig_chen_cheng",
    name: "陳誠",
    courtesyName: "辭修",
    lifeSpan: "1898 - 1965",
    faction: "kmt",
    role: "臺灣省主席 / 行政院長 / 副總統",
    roleType: "statesman",
    avatar: "./images/figures/fig_chen_cheng.svg",
    importance: 5,
    hometown: "浙江省青田縣",
    shortBio: "保定軍校八期。抗戰時任武漢會戰前線指揮。1949年主政臺灣，果斷推行三七五減租、公地放領與耕者有其田土地改革，發行新臺幣穩定經濟，修築石門水庫，為臺灣社會安定奠定堅如磐石之基礎。",
    historicalSignificance: "臺灣和平土地改革第一設計推手，奠定臺灣繁榮與農業增產深厚根基。",
    abilities: { strategy: 92, commanding: 92, politics: 98, intellect: 92, courage: 94, charisma: 94 }
  },
  {
    id: "fig_duan_qirui",
    name: "段祺瑞",
    courtesyName: "芝泉",
    lifeSpan: "1865 - 1936",
    faction: "warlord",
    role: "北洋皖系領袖 / 國務總理 / 臨時執政",
    roleType: "monarch",
    avatar: "./images/figures/fig_duan_qirui.svg",
    importance: 4,
    hometown: "安徽省合肥縣",
    shortBio: "北洋三傑之「虎」。辛亥時領銜北洋諸將通電贊成共和，三次主導討伐復辟（討袁稱帝、討張勳復辟），被稱為「三造共和」。主導中國參加第一次世界大戰對德宣戰，使中國躋身戰勝國。",
    historicalSignificance: "北洋政府皖系首領，促成中國參與一戰收回德奧在華特權。",
    abilities: { strategy: 90, commanding: 90, politics: 88, intellect: 86, courage: 90, charisma: 88 }
  },
  {
    id: "fig_wu_peifu",
    name: "吳佩孚",
    courtesyName: "子玉",
    lifeSpan: "1874 - 1939",
    faction: "warlord",
    role: "北洋直系統帥 / 直魯豫巡閱使",
    roleType: "general",
    avatar: "./images/figures/fig_wu_peifu.svg",
    importance: 4,
    hometown: "山東省蓬萊縣",
    shortBio: "秀才出身，治軍嚴明稱「玉帥」。直皖戰爭與第一次直奉戰爭中屢建奇功控制北京政權，首位登上美國《時代雜誌》封面之中國人物。晚年拒絕出任日偽政權職務，保持崇高民族氣節。",
    historicalSignificance: "北洋直系軍事巨擘，晚年堅貞不屈拒絕降日。",
    abilities: { strategy: 92, commanding: 95, politics: 80, intellect: 90, courage: 96, charisma: 92 }
  },
  {
    id: "fig_zhang_zuolin",
    name: "張作霖",
    courtesyName: "雨亭",
    lifeSpan: "1875 - 1928",
    faction: "warlord",
    role: "奉系軍閥統帥 / 中華民國陸海軍大元帥",
    roleType: "monarch",
    avatar: "./images/figures/fig_zhang_zuolin.svg",
    importance: 4,
    hometown: "奉天省海城縣",
    shortBio: "統治東北三省，修築京奉鐵路，發展東北工業與高等教育（創立東北大學）。二次直奉大捷後入主北京，就任中華民國最後一任國家元首「陸海軍大元帥」。因拒絕日方擴大滿蒙特權，遭日軍關東軍於皇姑屯炸死。",
    historicalSignificance: "東北王與北洋政府最後一位國家元首，堅持國家主權拒絕賣國殉難。",
    abilities: { strategy: 90, commanding: 92, politics: 92, intellect: 84, courage: 95, charisma: 94 }
  },
  {
    id: "fig_zhang_xueliang",
    name: "張學良",
    courtesyName: "漢卿 / 號毅庵",
    lifeSpan: "1901 - 2001",
    faction: "military",
    role: "陸海空軍副司令 / 東北易幟與西安事變發動者",
    roleType: "general",
    avatar: "./images/figures/fig_zhang_xueliang.svg",
    importance: 5,
    hometown: "奉天省海城縣",
    shortBio: "皇姑屯事件後繼掌東北軍政，1928年毅然宣布「東北易幟」服從國民政府，完成形式上全國統一。1936年為促成停止內戰、一致抗日，與楊虎城發動「西安事變」，促成國共第二次合作共同抗日，隨後受長達半世紀軟禁。",
    historicalSignificance: "促成全國形式統一與全面全民族團結抗日，二十世紀歷史巨變之核心樞紐。",
    abilities: { strategy: 88, commanding: 88, politics: 86, intellect: 86, courage: 98, charisma: 95 }
  },
  {
    id: "fig_yan_xishan",
    name: "閻錫山",
    courtesyName: "百川",
    lifeSpan: "1883 - 1960",
    faction: "warlord",
    role: "晉系統帥 / 山西省政府主席 / 行政院長",
    roleType: "statesman",
    avatar: "./images/figures/fig_yan_xishan.svg",
    importance: 4,
    hometown: "山西省五臺縣",
    shortBio: "辛亥太原起義響應共和。主政山西長達三十八年，推行村政改革與義務教育，被稱為「模範省」。抗戰指揮忻口戰役頑強抗擊日軍。1949年任行政院長兼國防部長，撤退來臺後隱居陽明山著書立說。",
    historicalSignificance: "主政三晉推行近代模範省治理，抗戰堅守中條山防線。",
    abilities: { strategy: 92, commanding: 88, politics: 95, intellect: 92, courage: 90, charisma: 90 }
  },
  {
    id: "fig_feng_yuxiang",
    name: "馮玉祥",
    courtesyName: "煥章",
    lifeSpan: "1882 - 1948",
    faction: "warlord",
    role: "西北軍統帥 / 國民革命軍第二集團軍總司令",
    roleType: "general",
    avatar: "./images/figures/fig_feng_yuxiang.svg",
    importance: 4,
    hometown: "安徽省巢縣",
    shortBio: "創立西北軍，以「基督將軍」治軍嚴整。1924年發動北京政變推翻曹錕，驅逐廢帝溥儀出紫禁城。五原誓師響應北伐，抗戰期間任第三戰區、第六戰區司令長官，積極呼籲抗日救國。",
    historicalSignificance: "驅逐清室廢帝徹底斬斷封建復辟之夢，西北軍締造者。",
    abilities: { strategy: 88, commanding: 92, politics: 85, intellect: 85, courage: 95, charisma: 92 }
  },
  {
    id: "fig_bai_chongxi",
    name: "白崇禧",
    courtesyName: "健生",
    lifeSpan: "1893 - 1966",
    faction: "military",
    role: "國民政府軍事委員會副總參謀長 / 首任國防部長",
    roleType: "general",
    avatar: "./images/figures/fig_bai_chongxi.svg",
    importance: 5,
    hometown: "廣西省桂林府臨桂縣",
    shortBio: "新桂系名將，與李宗仁並稱「李白」。北伐任總司令部參謀長，指揮龍潭戰役奠定南京政權。抗戰策劃台兒莊大捷與崑崙關戰役，提出「積小勝為大勝，以空間換時間」戰略思想，被譽為「小諸葛」。1946年任中華民國首任國防部長，1947年二二八事變後受命來臺宣撫止痛。",
    historicalSignificance: "卓越之軍事謀略家，提出空間換取時間之抗日最高戰略。",
    abilities: { strategy: 99, commanding: 96, politics: 85, intellect: 98, courage: 95, charisma: 92 }
  },
  {
    id: "fig_tang_jingsong",
    name: "羅福星",
    courtesyName: "東亞 / 號東民",
    lifeSpan: "1886 - 1914",
    faction: "taiwan",
    role: "苗栗起義抗日烈士 / 同盟會會員",
    roleType: "general",
    avatar: "./images/figures/fig_luo_fuxing.svg",
    importance: 4,
    hometown: "廣東省嘉應州蕉嶺縣 (生於印尼巴達維亞)",
    shortBio: "參加黃花崗起義。辛亥革命成功後，奉孫中山之命赴臺灣組織同盟會支部，聯絡數千抗日同志發表《大漢獨立軍臺灣召集令》，密謀於苗栗起義驅逐日人。事洩被捕，於臺北刑務所從容就義，年僅28歲。",
    historicalSignificance: "辛亥革命精神光照臺灣之代表烈士，「殺頭相似剃頭髮，爭取雙十黑雲開」。",
    abilities: { strategy: 85, commanding: 82, politics: 78, intellect: 85, courage: 100, charisma: 94 }
  },
  {
    id: "fig_yu_qingfang",
    name: "余清芳",
    courtesyName: "廷祥",
    lifeSpan: "1879 - 1915",
    faction: "taiwan",
    role: "西來庵事件抗日領袖",
    roleType: "general",
    avatar: "./images/figures/fig_yu_qingfang.svg",
    importance: 4,
    hometown: "臺南府安平縣 (今高雄市茄萣區)",
    shortBio: "日治臺灣最大規模之武裝抗日事件「西來庵事件（噍吧哖事件）」領袖。利用臺南西來庵王爺信仰組織數千鄉民起義，在噍吧哖與日軍激戰數月，最終不幸殉難。此事件後臺灣抗日抗爭由武力轉向非暴力文化政治啟蒙。",
    historicalSignificance: "臺灣漢人最後一次大規模武裝抗日運動領袖，促發後續體制內文化抗爭。",
    abilities: { strategy: 82, commanding: 85, politics: 75, intellect: 80, courage: 99, charisma: 95 }
  },
  {
    id: "fig_tang_de_zhang",
    name: "湯德章",
    courtesyName: "德章",
    lifeSpan: "1907 - 1947",
    faction: "taiwan",
    role: "臺南著名人權律師 / 捍衛市民殉難先賢",
    roleType: "statesman",
    avatar: "./images/figures/fig_tang_de_zhang.svg",
    importance: 4,
    hometown: "臺南市",
    shortBio: "臺日混血律師。二二八事件期間出任臺南「二二八事件處理委員會治安組長」，盡全力平息混亂、收繳槍械維持和平。被軍警逮捕後遭受嚴刑拷打，堅決不供出學生名冊，被槍決於民生綠園（今湯德章紀念公園），保護了無數臺南青年。",
    historicalSignificance: "臺南人權與正義之化身，捨身成仁保衛故鄉青年市民。",
    abilities: { strategy: 85, commanding: 72, politics: 90, intellect: 94, courage: 100, charisma: 98 }
  },
  {
    id: "fig_wang_yongqing",
    name: "王永慶",
    courtesyName: "王永慶",
    lifeSpan: "1917 - 2008",
    faction: "tech",
    role: "台塑集團創辦人 / 臺灣經營之神",
    roleType: "statesman",
    avatar: "./images/figures/fig_wang_yongqing.svg",
    importance: 4,
    hometown: "臺北廳新店支廳 (今新北市新店區)",
    shortBio: "米店學徒出身，白手起家創立臺灣塑膠公司，秉持「勤勞樸實、止於至善」哲學，打造出跨石化、醫療、教育之世界級企業帝國（六輕園區與長庚醫院），引領臺灣塑化重工業騰飛。",
    historicalSignificance: "臺灣戰後白手起家民營工業崛起之最高象徵，被譽為「經營之神」。",
    abilities: { strategy: 98, commanding: 85, politics: 92, intellect: 96, courage: 98, charisma: 96 }
  },
  {
    id: "fig_zhang_zhongmou",
    name: "張忠謀",
    courtesyName: "Morris Chang",
    lifeSpan: "1931 - 至今",
    faction: "tech",
    role: "台積電 (TSMC) 創辦人 / 全球晶圓代工之父",
    roleType: "statesman",
    avatar: "./images/figures/fig_zhang_zhongmou.svg",
    importance: 5,
    hometown: "浙江省寧波府鄞縣",
    shortBio: "麻省理工學院與史丹佛大學博士。曾任德州儀器全球副總裁。受李國鼎、孫運璿之邀回臺出任工研院院長，1987年首創純晶圓代工（Pure-play Foundry）商業模式創立台灣積體電路製造（TSMC），徹底顛覆全球半導體產業鏈，打造守護臺灣之「矽盾（Silicon Shield）」。",
    historicalSignificance: "全球半導體代工模式發明人，奠定現代人類數位時代晶片運算核心基礎。",
    abilities: { strategy: 100, commanding: 92, politics: 95, intellect: 100, courage: 97, charisma: 98 }
  }
];

// Generate SVG files
figuresData.forEach((f) => {
  const filePath = path.resolve(__dirname, '..', f.avatar);
  createSvgSeal(f.name, f.faction, filePath);
});
console.log(`Generated ${figuresData.length} figure SVG seals.`);

// Write figures.js
const figuresFileContent = `// Republic & Modern China-Taiwan Period (1912 - Modern) Figures
export const REPUBLIC_MODERN_FIGURES = ${JSON.stringify(figuresData, null, 2)};
`;
fs.writeFileSync(path.join(basePeriodDir, 'figures.js'), figuresFileContent, 'utf8');

// 2. Battles (14 battles)
const battlesData = [
  {
    id: "bat_yangxia_1911",
    name: "陽夏保衛戰 (漢口漢陽之戰)",
    year: 1911,
    period: "republicModern",
    locationAncient: "湖北武漢三鎮 (漢口、漢陽)",
    locationModern: "湖北省武漢市",
    coordinates: [114.28, 30.59],
    parties: {
      invader: "大清北洋新軍 (馮國璋、段祺瑞指揮)",
      defender: "中華民國湖北軍政府 (黃興統帥、黎元洪都督)"
    },
    victor: "戰略勝利 (革命軍為全國十餘省獨立爭取寶貴時間)",
    victorStatement: "北洋軍雖佔領漢口漢陽，革命軍血戰41天掩護十餘省相繼獨立，促成南北議和終結清廷",
    commanders: {
      invader: ["馮國璋", "段祺瑞"],
      defender: ["黃興", "黎元洪", "吳兆麟"]
    },
    summary: "武昌起義爆發後清廷派北洋精銳南下鎮壓。黃興親臨漢口前線任戰時總司令，率民軍與北洋新軍展開血腥巷戰與陣地戰，為各省響應獨立贏得關鍵戰略轉機。",
    keyStrategies: [
      "黃興身先士卒渡江馳援，穩定革命軍混亂陣腳",
      "以武漢三鎮水網地利實施持久阻擊，拖垮清廷財政",
      "爭取各省軍民響應獨立，形成天下傳檄而定之局"
    ]
  },
  {
    id: "bat_huguo_1916",
    name: "護國戰爭 (川南血戰)",
    year: 1916,
    period: "republicModern",
    locationAncient: "四川敘州、瀘州、納溪天險",
    locationModern: "四川省瀘州市納溪區",
    coordinates: [105.38, 28.77],
    parties: {
      invader: "中華帝國袁世凱北洋討伐軍 (曹錕、張敬堯、吳佩孚)",
      defender: "護國第一軍 (蔡鍔總司令)"
    },
    victor: "護國軍戰略徹底大勝 (袁世凱被迫退位取消帝制)",
    victorStatement: "蔡鍔率精悍滇軍以少敵多克敵制勝，粉碎袁世凱稱帝復辟狂妄野心",
    commanders: {
      invader: ["曹錕", "吳佩孚", "張敬堯"],
      defender: ["蔡鍔", "戴戡", "朱德"]
    },
    summary: "袁世凱稱帝改元洪憲引發舉國震怒。蔡鍔在雲南誓師發動護國戰爭，出兵四川納溪、棉花坡與數倍北洋精銳血戰。各省相繼獨立，迫使袁世凱撤銷帝制憤死。",
    keyStrategies: [
      "蔡鍔運用滇軍山地戰特長，以迅雷之勢搶佔川南隘口",
      "納溪棉花坡反覆爭奪白刃搏殺，擊潰北洋軍銳氣",
      "政治軍事並進，觸發北洋派系內部分裂"
    ]
  },
  {
    id: "bat_dingsiqiao_1926",
    name: "北伐汀泗橋與賀勝橋戰役",
    year: 1926,
    period: "republicModern",
    locationAncient: "湖北咸寧汀泗橋、江夏賀勝橋",
    locationModern: "湖北省咸寧市汀泗橋鎮",
    coordinates: [114.26, 29.78],
    parties: {
      invader: "國民革命軍 (蔣中正總司令、李宗仁第七軍、第四軍葉挺獨立團)",
      defender: "北洋軍閥吳佩孚主力精銳"
    },
    victor: "國民革命軍大勝",
    victorStatement: "北伐軍突破軍閥天險直搗武漢，第四軍贏得「鐵軍」威名",
    commanders: {
      invader: ["蔣中正", "白崇禧", "李宗仁", "葉挺"],
      defender: ["吳佩孚", "宋大霈"]
    },
    summary: "國民革命軍誓師北伐後在湖南連戰皆捷。吳佩孚親臨汀泗橋、賀勝橋天險死守。葉挺獨立團與李宗仁第七軍奮勇穿插奇襲，一舉撕開軍閥防線光復武漢三鎮。",
    keyStrategies: [
      "葉挺獨立團抄小路偷襲汀泗橋敵後制高點",
      "白崇禧精密運籌協同第七軍、第四軍正面強攻突破",
      "政治口號激發全軍瓦解舊軍閥封建士兵鬥志"
    ]
  },
  {
    id: "bat_zhongyuan_1930",
    name: "中原大戰 (近代規模最大軍閥會戰)",
    year: 1930,
    period: "republicModern",
    locationAncient: "河南、山東、安徽隴海線與平漢線",
    locationModern: "河南省鄭州市與開封市",
    coordinates: [113.62, 34.75],
    parties: {
      invader: "反蔣反中央聯盟 (閻錫山、馮玉祥、李宗仁新桂系)",
      defender: "南京國民政府中央軍 (蔣中正統帥)"
    },
    victor: "南京國民政府中央軍決定性勝利",
    victorStatement: "中央軍成功擊潰西北軍與晉軍聯盟，張學良東北軍入關支持中央奠定統一",
    commanders: {
      invader: ["閻錫山", "馮玉祥", "李宗仁"],
      defender: ["蔣中正", "韓復榘", "張學良"]
    },
    summary: "國民革命軍編遣會議後地方派系不滿爆發全中國最大規模會戰，雙方動員兵力逾百萬人。馮玉祥西北軍驍勇善戰在隴海線連破中央軍，最終張學良揮師東北軍入關擁蔣，反蔣聯軍潰散。",
    keyStrategies: [
      "中央軍以現代鐵路交通與德式空軍砲兵實施戰線固守",
      "張學良發布和平巧電率三十萬東北大軍入關定局",
      "確立南京國民政府中央最高統治權威"
    ]
  },
  {
    id: "bat_xifengkou_1933",
    name: "長城抗戰·喜峰口大刀之戰",
    year: 1933,
    period: "republicModern",
    locationAncient: "河北遵化喜峰口、潘家口長城關隘",
    locationModern: "河北省唐山市遷西縣喜峰口",
    coordinates: [118.29, 40.38],
    parties: {
      invader: "大日本帝國關東軍第十四混成旅團、服部支隊",
      defender: "國民革命軍第二十九軍 (宋哲元軍長、趙登禹、張自忠旅長)"
    },
    victor: "中國軍隊局部大捷",
    victorStatement: "二十九軍大刀隊夜襲痛殲日寇，誕生著名愛國歌曲《大刀進行曲》",
    commanders: {
      invader: ["武藤信義", "服部兵次郎"],
      defender: ["宋哲元", "趙登禹", "張自忠"]
    },
    summary: "日軍佔領熱河後直逼長城各關口企圖進窺平津。二十九軍官兵在喜峰口憑藉長城磚石，以大刀隊深夜冒雪攀崖出擊，斬殺日軍百餘人奪回陣地，極大振奮全民族抗日決心。",
    keyStrategies: [
      "利用燕山長城崇山峻嶺實施近戰與夜間突襲",
      "組織五百勇士大刀隊夜襲敵營，專破日軍三八大蓋刺刀優勢",
      "愛國歌謠《大刀進行曲》傳唱長城內外激發同仇敵愾"
    ]
  },
  {
    id: "bat_songhu_1937",
    name: "淞滬會戰 (血戰大場與四行倉庫)",
    year: 1937,
    period: "republicModern",
    locationAncient: "江蘇上海 (寶山、羅店、大場、四行倉庫)",
    locationModern: "上海市寶山區與靜安區",
    coordinates: [121.47, 31.23],
    parties: {
      invader: "大日本帝國上海派遣軍、第三艦隊 (松井石根大將)",
      defender: "國民革命軍中央軍精銳與各省地方軍 (蔣中正、張治中、陳誠)"
    },
    victor: "日軍慘勝佔領上海 (中國達成重大戰略目標)",
    victorStatement: "中國軍民浴血苦戰三個月，粉碎日軍「三月亡華」之狂妄迷夢",
    commanders: {
      invader: ["松井石根", "長谷川清"],
      defender: ["蔣中正", "陳誠", "薛岳", "謝晉元"]
    },
    summary: "抗戰爆發後蔣中正為轉移日軍由北向南攻擊軸線，主動在上海開闢第二戰場，誘使日軍沿長江向西推進。中國動員七十餘萬大軍浴血苦戰三個月，粉碎三月亡華狂言，掩護東南工廠學校內遷重慶。",
    keyStrategies: [
      "主動開闢滬淞戰場，迫使日軍將侵略軸線由「自北向南」轉為「由東向西」",
      "羅店爭奪戰各師浴血搏殺被稱為「血肉磨坊」",
      "謝晉元率八百壯士堅守四行倉庫，在租界與世界各國注視下展現不屈氣節"
    ]
  },
  {
    id: "bat_taierzhuang_1938",
    name: "台兒莊大捷 (抗戰正面戰場首次大捷)",
    year: 1938,
    period: "republicModern",
    locationAncient: "山東棗莊台兒莊運河要塞",
    locationModern: "山東省棗莊市台兒莊區",
    coordinates: [117.73, 34.56],
    parties: {
      invader: "大日本帝國華北方面軍第十師團 (磯谷廉介)、第五師團 (坂垣征四郎)",
      defender: "國民革命軍第五戰區 (李宗仁總指揮、孫連仲、湯恩伯、張自忠)"
    },
    victor: "中國軍隊輝煌大捷",
    victorStatement: "殲滅日軍精銳精兵萬餘人，取得全國抗戰以來正面戰場最重大的勝利",
    commanders: {
      invader: ["磯谷廉介", "坂垣征四郎"],
      defender: ["李宗仁", "孫連仲", "湯恩伯", "池峰城", "張自忠"]
    },
    summary: "日軍企圖打通津浦鐵路南北夾擊徐州。李宗仁定下誘敵深入包圍殲滅之策。孫連仲三十一師在台兒莊巷戰血戰三晝夜誓死不退，湯恩伯兵團與張自忠五十九軍迂迴包抄合圍，全殲日軍萬餘人。",
    keyStrategies: [
      "李宗仁誘敵深入，將日軍王牌磯谷師團引至運河北岸聚殲",
      "孫連仲下達「死守台兒莊，後退者斬」命令，敢死隊夜奪敵陣",
      "湯恩伯主力由外線實施鐵壁合圍，打破日軍不可戰勝神話"
    ]
  },
  {
    id: "bat_wuhan_1938",
    name: "武漢會戰 (四百年華夏近代最大抗戰會戰)",
    year: 1938,
    period: "republicModern",
    locationAncient: "湖北武漢三鎮及大別山、萬家嶺",
    locationModern: "湖北省武漢市、江西省德安縣",
    coordinates: [114.30, 30.60],
    parties: {
      invader: "大日本帝國華中派遣軍 (畑俊六大將)",
      defender: "國民革命軍第九戰區、第五戰區 (蔣中正、陳誠、薛岳)"
    },
    victor: "戰略相持 (日軍佔領武漢但喪失速勝能力)",
    victorStatement: "中國以廣袤空間換取四年持久抗戰時間，抗日戰爭正式由戰略防禦轉入戰略相持",
    commanders: {
      invader: ["畑俊六", "岡村寧次"],
      defender: ["蔣中正", "陳誠", "薛岳", "張自忠"]
    },
    summary: "抗戰規模最大之會戰，戰線橫跨安徽、河南、江西、湖北四省。薛岳於萬家嶺戰役設伏重創日軍第一○六師團。中國軍隊主動撤離武漢退守陪都重慶，使抗戰進入持久戰略相持階段。",
    keyStrategies: [
      "薛岳反切敵陣於萬家嶺深山全殲日軍一○六師團四個聯隊",
      "利用大別山與長江險隘層層阻擊，消耗日軍百萬精銳",
      "戰略撤退確保西南大後方軍事、政治與工業完整"
    ]
  },
  {
    id: "bat_kunlunguan_1939",
    name: "崑崙關大捷 (桂南會戰攻堅天險)",
    year: 1939,
    period: "republicModern",
    locationAncient: "廣西邕寧崑崙關隘口",
    locationModern: "廣西壯族自治區南寧市崑崙關",
    coordinates: [108.58, 23.08],
    parties: {
      invader: "大日本帝國第二十一軍第五師團 (今村均中將、中村正雄少將)",
      defender: "國民革命軍第五軍 (白崇禧指導、杜聿明軍長、戴安瀾師長、邱清泉)"
    },
    victor: "中國軍隊攻堅大捷",
    victorStatement: "中國第一支機械化裝甲部隊大顯神威，擊斃日軍「鋼軍」旅團長中村正雄",
    commanders: {
      invader: ["今村均", "中村正雄"],
      defender: ["白崇禧", "杜聿明", "戴安瀾", "邱清泉"]
    },
    summary: "日軍突襲登陸欽州灣佔領南寧與崑崙關，企圖切斷中國西南對外補給生命線。白崇禧調集杜聿明第五軍發動反攻，戴安瀾二○○師配屬蘇聯T-26戰車連續血戰奪回崑崙關天險，全殲敵精銳三千餘人。",
    keyStrategies: [
      "步坦協同作戰，中國第一支機械化師向險峻關隘實施雷霆突擊",
      "邱清泉新二十二師迂迴敵後炸毀五塘橋阻斷敵增援",
      "戴安瀾身負重傷不下火線，以白刃肉搏克復主峰"
    ]
  },
  {
    id: "bat_changsha_1941",
    name: "第三次長沙會戰 (天爐熔敵名揚國際)",
    year: 1941,
    period: "republicModern",
    locationAncient: "湖南長沙城郊及新牆河、汨羅江",
    locationModern: "湖南省長沙市",
    coordinates: [112.98, 28.19],
    parties: {
      invader: "大日本帝國第十一軍 (阿南惟幾中將)",
      defender: "國民革命軍第九戰區 (薛岳司令長官、李玉堂第十軍)"
    },
    victor: "中國軍隊殲滅性輝煌大捷",
    victorStatement: "珍珠港事變後同盟國戰場第一場重大空前大捷，薛岳被封「長沙天爐之神」",
    commanders: {
      invader: ["阿南惟幾"],
      defender: ["薛岳", "李玉堂", "方先覺"]
    },
    summary: "太平洋戰爭爆發後日軍企圖攻佔長沙策應香港作戰。薛岳布下「天爐戰法」，以長沙城為誘餌，第十軍誓死固守長沙城垣，外線調集九個軍如熔爐般向內壓縮合圍，殲滅日軍五萬餘人，震動英美盟軍。",
    keyStrategies: [
      "天爐戰法：化整為零破壞交通，後退誘敵至決戰區域",
      "李玉堂第十軍以長沙城為堅固核心頂住日軍連續狂暴衝擊",
      "各外線大軍在指定時間同時自山嶽外圍實施鐵壁合圍"
    ]
  },
  {
    id: "bat_renanqiang_1942",
    name: "仁安羌大捷 (中國遠征軍出國解救英軍)",
    year: 1942,
    period: "republicModern",
    locationAncient: "緬甸仁安羌油田 (賓河兩岸)",
    locationModern: "緬甸馬圭省仁安羌",
    coordinates: [94.88, 20.48],
    parties: {
      invader: "大日本帝國第三十三師團主力",
      defender: "中國遠征軍新編第三十八師一一三團 (孫立人師長、劉放吾團長)"
    },
    victor: "中國遠征軍空前大勝",
    victorStatement: "以少勝多擊潰日軍主力，成功解救被圍英軍七千餘人與美籍傳教士記者",
    commanders: {
      invader: ["櫻井省三", "作間喬宜"],
      defender: ["孫立人", "劉放吾", "史迪威 (盟軍總參謀長)"]
    },
    summary: "日軍在緬甸合圍英緬軍第一師與裝甲第七旅七千餘人於仁安羌。孫立人將軍率新三十八師一一三團僅千餘兵力奔襲馳援，以精湛步兵戰術正面強攻奪回油田，救出全體英軍盟友，英女王特頒大英帝國司令勳章。",
    keyStrategies: [
      "以劣勢兵力採取夜間偽裝與多點牽制，使日軍誤判遠征軍主力已至",
      "劉放吾團長親率敢死隊攀登油田油罐高地奪回水源陣地",
      "揚威國際二戰盟軍，使中國遠征軍英名享譽全球"
    ]
  },
  {
    id: "bat_guningtou_1949",
    name: "金門古寧頭戰役 (保衛臺灣奠定分治第一仗)",
    year: 1949,
    period: "republicModern",
    locationAncient: "金門縣金寧鄉古寧頭、嚨口海岸",
    locationModern: "福建省金門縣古寧頭",
    coordinates: [118.31, 24.48],
    parties: {
      invader: "中國人民解放軍第二十八軍登陸突擊梯隊 (三個團近萬人)",
      defender: "中華民國國軍第十二兵團、金防部 (胡璉司令官、高魁元軍長、柯遠芬)"
    },
    victor: "中華民國國軍決定性全殲大捷",
    victorStatement: "登陸金門之敵軍三千餘人被俘、五千餘人陣亡，一舉挽狂瀾於既倒確保臺澎金馬安全",
    commanders: {
      invader: ["蕭鋒", "孫雲秀"],
      defender: ["胡璉", "高魁元", "湯恩伯"]
    },
    summary: "1949年10月解放軍跨海進攻大金門，因退潮擱淺船隻全遭國軍海空摧毀。國軍第十二兵團英勇阻擊，戰車第三團「金門之熊」M5A1戰車橫掃敵陣，血戰三晝夜將登陸敵軍徹底全殲於古寧頭海灘。",
    keyStrategies: [
      "利用秋季大退潮使敵登陸木帆船全部擱淺，海軍海峰艦與空軍全殲船隻斷敵後援",
      "「金門之熊」裝甲戰車部隊海灘機動突擊，發揮無可匹敵之火力壓制",
      "胡璉第十二兵團及時生力軍登陸增援實施包圍聚殲"
    ]
  },
  {
    id: "bat_823_artillery_1958",
    name: "八二三臺海砲戰 (確立海峽防衛分治分水嶺)",
    year: 1958,
    period: "republicModern",
    locationAncient: "金門群島、廈門灣海岸",
    locationModern: "金門縣大金門、小金門、大膽島",
    coordinates: [118.32, 24.44],
    parties: {
      invader: "中國人民解放軍福建前線砲兵部隊 (葉飛司令員)",
      defender: "中華民國金門防衛司令部 (胡璉司令官、吉星文副司令、俞大維國防部長)"
    },
    victor: "中華民國國軍堅守成功 (確立兩岸海峽分治現狀)",
    victorStatement: "國軍承受47萬發砲彈狂轟誓死堅守，八吋巨砲還擊奠定臺海半世紀和平穩定",
    commanders: {
      invader: ["葉飛", "張翼翔"],
      defender: ["胡璉", "俞大維", "吉星文 (殉國)", "郝柏村"]
    },
    summary: "1958年8月23日解放軍突向金門發射近六萬發砲彈，吉星文等三位副司令官殉職。國軍在俞大維與胡璉指揮下沉著應戰，美軍第七艦隊協防護航，國軍空軍F-86首創響尾蛇飛彈克敵，八吋榴彈砲重創廈門車站，迫使對方改為「單打雙不打」。",
    keyStrategies: [
      "金門地下坑道碉堡防禦網發揮極致避彈效能",
      "空軍以響尾蛇空對空飛彈首創世界空戰導彈擊落紀錄奪得制空權",
      "引進八吋美製自走重砲實施精確反擊，震撼敵前線指揮所"
    ]
  },
  {
    id: "bat_taiman_1955",
    name: "一江山與大陳島戰役",
    year: 1955,
    period: "republicModern",
    locationAncient: "浙江台州列島一江山島、大陳島",
    locationModern: "浙江省台州市椒江區一江山島",
    coordinates: [121.82, 28.61],
    parties: {
      invader: "中國人民解放軍華東軍區陸海空聯合作戰部隊 (張愛萍總指揮)",
      defender: "中華民國一江山防衛司令部 (王生明司令指揮千餘突擊隊員)"
    },
    victor: "戰術解放軍佔領一江山；國軍完成大陳島「金剛計劃」軍民萬人安全撤退",
    victorStatement: "王生明率千餘勇士戰至最後一彈壯烈殉國，國軍安全將大陳島全體義民接運至臺灣安居",
    commanders: {
      invader: ["張愛萍", "聶鳳智"],
      defender: ["王生明 (殉國)", "劉廉一"]
    },
    summary: "解放軍首次實行陸海空三棲聯合作戰進攻一江山島。王生明率千餘守軍引爆陣地壯烈成仁。隨後蔣中正總統下達「金剛計劃」，在美軍第七艦隊護航下將大陳島一萬八千餘居民與官兵全數安全接運臺灣，定居全臺各地大陳新村。",
    keyStrategies: [
      "王生明將軍率部血戰三晝夜堅守最後一刻",
      "中美海軍協同實施歷史性「金剛計劃」，將全島軍民和平撤離",
      "重新調整防禦前線，集中軍力專注防衛臺澎金馬核心"
    ]
  }
];

// Write battles.js
const battlesFileContent = `// Republic & Modern China-Taiwan Period (1912 - Modern) Battles
export const REPUBLIC_MODERN_BATTLES = ${JSON.stringify(battlesData, null, 2)};
`;
fs.writeFileSync(path.join(basePeriodDir, 'battles.js'), battlesFileContent, 'utf8');

// 3. Events (26 events)
const eventsData = [
  {
    id: "evt_1911_wuchang",
    year: 1911,
    yearDisplay: "西元 1911 年 (宣統三年辛亥)",
    title: "武昌首義與辛亥革命爆發",
    summary: "武昌工程營打響推翻滿清帝制第一槍，各省相繼宣布獨立響應共和。",
    detail: "1911年10月10日，湖北新軍工程營革命黨人熊秉坤、金兆龍等打響第一槍，攻佔楚望台軍械庫與湖廣總督署，建立中華民國湖北軍政府。隨後一個月內湖南、陝西、江西、廣東、江蘇等十餘省紛紛通電獨立，統治華夏兩百六十八年的大清王朝轟然崩解。",
    locationNameAncient: "湖北武昌",
    locationNameModern: "湖北省武漢市武昌區",
    coordinates: [114.30, 30.55],
    tags: ["辛亥革命", "推翻帝制", "武昌首義"]
  },
  {
    id: "evt_1912_republic_founding",
    year: 1912,
    yearDisplay: "西元 1912 年 (民國元年)",
    title: "中華民國臨時政府成立與清帝遜位",
    summary: "孫中山就任第一任臨時大總統，改用公曆，宣統帝下詔退位，兩千年帝制正式終結。",
    detail: "1912年1月1日，孫中山在南京宣誓就任中華民國臨時政府臨時大總統，宣告中華民國成立，定五色旗為國旗，改用陽曆。2月12日，隆裕太后攜六歲宣統帝溥儀頒布退位詔書，華夏自秦始皇以來兩千一百三十二年世襲君主專制政體正式宣告落幕。",
    locationNameAncient: "江蘇江寧府南京城",
    locationNameModern: "江蘇省南京市",
    coordinates: [118.79, 32.06],
    tags: ["民國肇建", "孫中山", "清帝退位", "開創共和"]
  },
  {
    id: "evt_1913_song_jiaoren_martyr",
    year: 1913,
    yearDisplay: "西元 1913 年 (民國二年)",
    title: "宋教仁遇刺與二次革命爆發",
    summary: "國民黨領袖宋教仁在上海火車站遇刺身亡，孫中山發動討袁二次革命。",
    detail: "1913年首屆國會大選國民黨獲壓倒性勝利，提倡政黨內閣制的宋教仁北上組閣途中於上海遇刺身亡。孫中山認定袁世凱為幕後主使，在江西、江蘇、廣東起兵討袁。二次革命失敗後孫中山流亡日本創立中華革命黨。",
    locationNameAncient: "上海老北站",
    locationNameModern: "上海市靜安區",
    coordinates: [121.48, 31.25],
    tags: ["憲政之父", "宋教仁", "二次革命"]
  },
  {
    id: "evt_1915_huguo_movement",
    year: 1915,
    yearDisplay: "西元 1915 年 (民國四年)",
    title: "袁世凱稱帝與蔡鍔護國戰爭",
    summary: "袁世凱復辟帝制改元洪憲，蔡鍔在雲南誓師討袁，護國軍轉戰川黔迫袁退位。",
    detail: "袁世凱接受「二十一條」並導演帝制丑劇，改民國五年為洪憲元年。蔡鍔潛回昆明與唐繼堯通電反袁，組成護國軍出兵四川。全國各省紛紛反對，連北洋心腹段祺瑞、馮國璋亦陽奉陰違，袁世凱被迫於1916年3月取消帝制，憂懼而亡。",
    locationNameAncient: "雲南昆明",
    locationNameModern: "雲南省昆明市",
    coordinates: [102.71, 25.04],
    tags: ["護國運動", "蔡鍔", "再造共和"]
  },
  {
    id: "evt_1919_may_fourth",
    year: 1919,
    yearDisplay: "西元 1919 年 (民國八年)",
    title: "五四愛國運動與新文化運動浪潮",
    summary: "巴黎和會外交受挫引發學生遊行，「德先生與賽先生」啟發思想現代啟蒙。",
    detail: "巴黎和會列強將戰敗國德國在山東之特權轉讓日本，引發北京三千餘大學生於天安門遊行抗議「外爭主權，內除國賊」。運動迅速蔓延全國罷工、罷市、罷課，拒簽對德和約。蔡元培、胡適、陳獨秀所倡導之科學與民主精神深刻改變華夏文明航向。",
    locationNameAncient: "北京天安門",
    locationNameModern: "北京市東城區天安門廣場",
    coordinates: [116.39, 39.90],
    tags: ["五四運動", "德先生賽先生", "新文化運動"]
  },
  {
    id: "evt_1921_taiwan_culture_assoc",
    year: 1921,
    yearDisplay: "西元 1921 年 (大正十年)",
    title: "臺灣文化協會成立與新文化啟蒙",
    summary: "林獻堂、蔣渭水於臺北創立「臺灣文化協會」，掀起全臺非暴力啟蒙巨浪。",
    detail: "1921年10月17日，林獻堂、蔣渭水、蔡培火等人於臺北靜修女學校召開成立大會。文協推動讀報社、全島巡迴文化演講、放映電影與創辦《臺灣民報》，批判迷信陋習，啟蒙臺灣民眾現代公民自主意識。",
    locationNameAncient: "臺北州臺北市大稻埕",
    locationNameModern: "臺北市大同區靜修中學",
    coordinates: [121.51, 25.05],
    tags: ["臺灣文化協會", "蔣渭水", "林獻堂", "文化啟蒙"]
  },
  {
    id: "evt_1924_whampoa_academy",
    year: 1924,
    yearDisplay: "西元 1924 年 (民國十三年)",
    title: "黃埔陸軍軍官學校成立",
    summary: "孫中山建立革命武力基石，任命蔣中正為校長，開創國民革命軍骨幹陣容。",
    detail: "孫中山在廣州黃埔島創辦「中國國民黨陸軍軍官學校」，廖仲愷任黨代表，周恩來任政治部主任。黃埔師生以「親愛精誠」為校訓，成為東征、北伐、抗日及戰後保衛臺灣之國軍核心將領搖籃。",
    locationNameAncient: "廣東省廣州府黃埔長洲島",
    locationNameModern: "廣東省廣州市黃埔區長洲島",
    coordinates: [113.43, 23.08],
    tags: ["黃埔建軍", "蔣中正", "孫中山"]
  },
  {
    id: "evt_1927_taiwan_peoples_party",
    year: 1927,
    yearDisplay: "西元 1927 年 (昭和二年)",
    title: "臺灣民眾黨創立 (臺灣歷史第一個合法政黨)",
    summary: "蔣渭水於臺中創立臺灣民眾黨，提出確立自治、改革教育與民生福利綱領。",
    detail: "在文化協會分裂後，蔣渭水、林獻堂、蔡培火等溫和民族主義者在臺中聚會，創立臺灣史上首個合法現代政黨「臺灣民眾黨」。以「實現臺灣人政治自由、經濟平等、社會公平」為宗旨，發行機關報並向國際聯盟控訴總督府鴉片專賣政策。",
    locationNameAncient: "臺中州臺中市",
    locationNameModern: "臺中市中區",
    coordinates: [120.68, 24.14],
    tags: ["臺灣民眾黨", "第一政黨", "蔣渭水", "自治運動"]
  },
  {
    id: "evt_1928_nanjing_unification",
    year: 1928,
    yearDisplay: "西元 1928 年 (民國十七年)",
    title: "北伐完成與張學良東北易幟",
    summary: "國民革命軍攻克北京，張學良宣布東北易幟服從南京國民政府，全國形式統一。",
    detail: "蔣中正誓師二次北伐，閻錫山、馮玉祥聯軍克復京津。張作霖退回東北於皇姑屯遇炸身亡。其子張學良頂住關東軍巨大威脅，於12月29日毅然通電東北易幟，將五色旗更換為青天白日滿地紅旗，標誌全國完成國家形式統一，南京國民政府進入「黃金十年」建設期。",
    locationNameAncient: "奉天府 (瀋陽)",
    locationNameModern: "遼寧省瀋陽市",
    coordinates: [123.43, 41.80],
    tags: ["北伐成功", "東北易幟", "黃金十年", "國家統一"]
  },
  {
    id: "evt_1930_wushe_incident",
    year: 1930,
    yearDisplay: "西元 1930 年 (昭和五年)",
    title: "霧社起義抗日事件",
    summary: "莫那·魯道率賽德克族六社起義抗擊日本殖民殘酷壓迫，壯烈成仁震撼國際。",
    detail: "1930年10月27日，因長年勞役苛捐與尊嚴踐踏，賽德克族頭目莫那·魯道聯合馬赫坡等六社部落，趁霧社公學校舉辦聯合運動會發動奇襲擊殺日警與官員。日軍調集大軍並動用飛機毒氣殘酷圍剿，族人退入斷崖深洞誓死不屈集體殉難，彰顯原住民族不滅之尊嚴。",
    locationNameAncient: "臺中州能高郡霧社",
    locationNameModern: "南投縣仁愛鄉霧社",
    coordinates: [121.13, 24.02],
    tags: ["霧社事件", "莫那魯道", "賽德克族", "原住民族抗日"]
  },
  {
    id: "evt_1931_mukden_incident",
    year: 1931,
    yearDisplay: "西元 1931 年 (民國二十年)",
    title: "九一八事變與東北十四年抗戰開始",
    summary: "日本關東軍炸毀柳條湖鐵路栽贓中國，隨即砲轟瀋陽北大營佔領東北三省。",
    detail: "1931年9月18日夜，日本關東軍自行炸毀南滿鐵路柳條湖段，反誣中國軍隊破壞，隨即開砲轟擊北大營佔領瀋陽。因不抵抗政策，東北錦繡河山數月內相繼淪陷，日本隨後扶植溥儀建立偽滿洲國。全中國抗日救亡怒潮全面爆發，東北抗日義勇軍展開長達十四年冰天雪地殊死游擊。",
    locationNameAncient: "奉天瀋陽柳條湖",
    locationNameModern: "遼寧省瀋陽市大東區北大營",
    coordinates: [123.46, 41.83],
    tags: ["九一八事變", "國恥日", "東北抗戰"]
  },
  {
    id: "evt_1936_xian_incident",
    year: 1936,
    yearDisplay: "西元 1936 年 (民國二十五年)",
    title: "西安事變與國共抗日民族統一戰線",
    summary: "張學良、楊虎城發動兵諫扣留蔣中正，和平解決促成停止內戰一致抗日。",
    detail: "1936年12月12日，東北軍張學良與西北軍楊虎城在臨潼華清池扣留督戰的蔣中正，提出停止一切內戰、釋放愛國政治犯等八項主張。周恩來親赴西安談判，蔣中正接受停止內戰、團結抗日，西安事變和平落幕，成為中國由內戰走向全民族團結禦侮的歷史分水嶺。",
    locationNameAncient: "陝西臨潼華清池",
    locationNameModern: "陝西省西安市臨潼區",
    coordinates: [109.21, 34.36],
    tags: ["西安事變", "張學良", "停止內戰", "一致抗日"]
  },
  {
    id: "evt_1937_lugouqiao_incident",
    year: 1937,
    yearDisplay: "西元 1937 年 (民國二十六年)",
    title: "七七盧溝橋事變與廬山抗戰宣言",
    summary: "日軍挑釁宛平城引發全面抗戰，蔣中正發表廬山宣言「地無分南北，年無分老幼皆有守土抗戰之責」。",
    detail: "1937年7月7日夜，日軍在北平西南盧溝橋附近演習謊稱一名士兵失蹤，要求搜查宛平縣城遭拒，隨即開砲進攻。吉星文團長率守軍奮起還擊。7月17日蔣中正在廬山發表抗戰談話，宣告「最後關頭已經到達，犧牲未到最後關頭絕不輕言犧牲，如果戰端一開，那就是地無分南北，年無分老幼，無論何人，皆有守土抗戰之責任」。",
    locationNameAncient: "直隸順天府盧溝橋",
    locationNameModern: "北京市豐臺區宛平城",
    coordinates: [116.22, 39.85],
    tags: ["七七事變", "盧溝橋", "廬山宣言", "全面抗戰"]
  },
  {
    id: "evt_1937_chongqing_capital",
    year: 1937,
    yearDisplay: "西元 1937 年 (民國二十六年)",
    title: "遷都陪都重慶與大後方長期抗戰",
    summary: "南京淪陷前國民政府宣布遷都重慶，建立西南戰略大後方，以空間換取時間。",
    detail: "淞滬會戰後日軍直逼南京，國民政府宣告移駐四川重慶「以持久抗戰消耗敵人」。數百萬難民、數百所高校（如西南聯大）及數千工廠機器經長江三峽西遷大後方。重慶在長達五年半的大轟炸中堅強不屈，被尊為「不屈之城」與戰時世界反法西斯核心支柱。",
    locationNameAncient: "四川重慶",
    locationNameModern: "重慶市渝中區",
    coordinates: [106.55, 29.56],
    tags: ["陪都重慶", "戰時首都", "持久抗戰", "西南聯大"]
  },
  {
    id: "evt_1943_cairo_conference",
    year: 1943,
    yearDisplay: "西元 1943 年 (民國三十二年)",
    title: "開羅會議宣告臺灣歸還中華民國",
    summary: "蔣中正、羅斯福、邱吉爾共商對日作戰，發表《開羅宣言》明定日本竊取之臺灣澎湖歸還中華民國。",
    detail: "1943年11月，蔣中正代表中華民國與美國總統羅斯福、英國首相邱吉爾在埃及開羅召開三國首腦會議。發表的《開羅宣言》莊嚴宣布：「三國之宗旨，在使日本所竊取於中國之領土，例如東北四省、臺灣、澎湖群島等，歸還中華民國。」此宣言確立戰後東亞秩序之國際法基礎。",
    locationNameAncient: "埃及開羅",
    locationNameModern: "埃及開羅市米納豪斯酒店",
    coordinates: [31.13, 29.98],
    tags: ["開羅會議", "開羅宣言", "光復臺灣", "大國地位"]
  },
  {
    id: "evt_1945_ww2_victory",
    year: 1945,
    yearDisplay: "西元 1945 年 (民國三十四年)",
    title: "第二次世界大戰勝利日本無條件投降",
    summary: "經過十四年艱苦卓絕浴血奮戰，日本簽署投降書，中國成為聯合國五大常任理事國。",
    detail: "1945年8月15日日本裕仁天皇發布《終戰詔書》無條件投降。9月2日日本代表在美艦密蘇里號簽署降書，9月9日中國戰區受降典禮於南京中央陸軍軍官學校大禮堂舉行，侵華日軍總司令岡村寧次向何應欽遞交投降書。十四年抗戰付出傷亡三千五百萬軍民代價，洗刷百年屈辱，中華民國躋身聯合國創始五大常任理事國。",
    locationNameAncient: "江蘇南京",
    locationNameModern: "江蘇省南京市南京軍區大禮堂",
    coordinates: [118.80, 32.05],
    tags: ["抗戰勝利", "二戰終結", "受降典禮", "常任理事國"]
  },
  {
    id: "evt_1945_taiwan_retrocession",
    year: 1945,
    yearDisplay: "西元 1945 年 (民國三十四年)",
    title: "臺灣光復受降典禮",
    summary: "日本第十方面軍在臺北公會堂簽署降書，結束五十年殖民統治，臺灣澎湖重歸中華民國。",
    detail: "1945年10月25日，臺灣省受降典禮在臺北公會堂（今中山堂）隆重舉行。臺灣省行政長官陳儀代表中國戰區最高統帥接受日本第十方面軍司令官兼臺灣總督安藤利吉投降。全臺民眾結綵遊行歡慶脫離日本五十年殖民統治。國民政府明訂10月25日為「臺灣光復節」。",
    locationNameAncient: "臺北州臺北市公會堂",
    locationNameModern: "臺北市中正區中山堂",
    coordinates: [121.51, 25.04],
    tags: ["臺灣光復", "中山堂受降", "重歸中華民國", "光復節"]
  },
  {
    id: "evt_1947_constitution_enacted",
    year: 1947,
    yearDisplay: "西元 1947 年 (民國三十六年)",
    title: "《中華民國憲法》正式施行",
    summary: "制憲國民大會通過憲法，建立五權分立、保障人民基本權利之現代民主根本大法。",
    detail: "1946年12月25日制憲國民大會三讀通過《中華民國憲法》，並於1947年1月1日公布、12月25日正式實施。憲法確立主權在民、三民主義與五權分立原則，保障言論、集會、信仰自由與各民族平等權利，成為中華民國在臺灣維持憲政運作至今之根本大法。",
    locationNameAncient: "江蘇南京國民大會堂",
    locationNameModern: "江蘇省南京市人民大會堂",
    coordinates: [118.79, 32.04],
    tags: ["中華民國憲法", "行憲", "民主憲政", "行憲紀念日"]
  },
  {
    id: "evt_1949_gov_relocated_taiwan",
    year: 1949,
    yearDisplay: "西元 1949 年 (民國三十八年)",
    title: "中央政府遷臺與兩岸分治對峙確立",
    summary: "中華民國中央政府由大陸遷往臺北，奠定臺澎金馬堅守憲政、兩岸分立分治七十年局勢。",
    detail: "因國共內戰局勢逆轉，1949年12月7日中華民國行政院決議將中央政府遷設臺北，12月10日蔣中正自成都飛抵臺北。約一百二十萬大陸軍民、黃金儲備、故宮國寶文物及中央研究院頂尖學者陸續遷臺，確立中華民國主權統轄臺澎金馬、兩岸隔海分治之長期格局。",
    locationNameAncient: "臺灣省臺北市",
    locationNameModern: "臺北市中正區總統府",
    coordinates: [121.51, 25.03],
    tags: ["中央政府遷臺", "兩岸分治", "播遷來臺", "故宮國寶"]
  },
  {
    id: "evt_1949_land_reform",
    year: 1949,
    yearDisplay: "西元 1949 - 1953 年",
    title: "臺灣土地改革：三七五減租與耕者有其田",
    summary: "陳誠主導和平漸進土地改革，奠定臺灣農業增產、農民富裕與工業資本轉型基石。",
    detail: "1949年起臺灣省政府先後推動「三七五減租」、「公地放領」與1953年「耕者有其田」政策。政府徵收地主超額土地轉售佃農，並以四大公營公司股票（臺泥、臺紙、工礦、農林）補償地主，不僅讓廣大自耕農收入大幅提升，更將地主資本成功引導至現代民營工業投資。",
    locationNameAncient: "臺灣省臺北市",
    locationNameModern: "臺北市中正區",
    coordinates: [121.52, 25.04],
    tags: ["土地改革", "三七五減租", "耕者有其田", "經濟奇蹟起步"]
  },
  {
    id: "evt_1968_compulsory_education",
    year: 1968,
    yearDisplay: "西元 1968 年 (民國五十七年)",
    title: "九年國民義務教育推行",
    summary: "政府宣布將義務教育延長為九年，免試升入國中，大幅提升全體國民素質與產業人才。",
    detail: "1968年蔣中正總統拍板實施「九年國民義務教育」，將初級中學改為國民中學，免收學費且免試升學。此舉徹底打破升學考試惡補，培育出臺灣1970至1990年代高素質技術勞工與科技工程師，被聯合國教科文組織譽為發展中國家教育奇蹟典範。",
    locationNameAncient: "臺灣全島",
    locationNameModern: "臺灣各地國民中學",
    coordinates: [121.53, 25.03],
    tags: ["九年國教", "教育普及", "國民素質", "科技島之基"]
  },
  {
    id: "evt_1973_ten_major_projects",
    year: 1973,
    yearDisplay: "西元 1973 年 (民國六十二年)",
    title: "推動十大建設突破全球能源危機",
    summary: "蔣經國、孫運璿推動十大國家基礎建設，打通臺灣現代海陸空運輸與重工業動脈。",
    detail: "面對第一次石油危機與退出聯合國外交逆境，行政院長蔣經國宣示「今天不做，明天就會後悔」，大魄力投資二千億元推動「十大建設」：中山高速公路、鐵路電氣化、北迴鐵路、中正國際機場、臺中港、蘇澳港、中鋼、中船、中油石化輕油裂解廠及核能一廠，徹底打破經濟瓶頸邁向新興工業化國家（亞洲四小龍之首）。",
    locationNameAncient: "臺灣北中南東全境",
    locationNameModern: "桃園國際機場 / 中山高速公路",
    coordinates: [121.23, 25.07],
    tags: ["十大建設", "蔣經國", "孫運璿", "亞洲四小龍"]
  },
  {
    id: "evt_1980_hsinchu_science_park",
    year: 1980,
    yearDisplay: "西元 1980 年 (民國六十九年)",
    title: "新竹科學工業園區奠基 (臺灣矽島之父誕生)",
    summary: "孫運璿、李國鼎引進半導體科技，打造全球半導體代工與高科技重鎮矽盾。",
    detail: "1980年12月15日新竹科學園區正式成立。李國鼎與孫運璿透過工研院派員赴美學習RCA積體電路技術，促成聯電與1987年台積電（TSMC）創立。竹科匯聚清華、交大頂尖研發實力與歸國海外精英，建立全球最完整的晶片代工產業聚落，被譽為護衛臺灣安全之「矽盾（Silicon Shield）」。",
    locationNameAncient: "新竹市東區",
    locationNameModern: "新竹市科學園區新安路",
    coordinates: [120.99, 24.78],
    tags: ["新竹科學園區", "李國鼎", "台積電", "矽島", "半導體"]
  },
  {
    id: "evt_1987_martial_law_lifted",
    year: 1987,
    yearDisplay: "西元 1987 年 (民國七十六年)",
    title: "解除戒嚴令與開放兩岸探親",
    summary: "蔣經國總統宣告解除實施長達三十八年之戒嚴，開放報禁黨禁與大陸探親，開啟民主轉型。",
    detail: "1987年7月15日，蔣經國簽署總統令宣布臺灣地區自零時起正式解除長達三十八年又五十六天的戒嚴狀態，終止軍事審判、平民審判回歸憲法司法，隨後開放組黨自由（黨禁）、出版自由（報禁）。同年11月開放民眾赴大陸探親，融化兩岸隔絕四十年之冰霜，臺灣邁向生氣蓬勃之現代民主開放社會。",
    locationNameAncient: "臺灣省臺北市",
    locationNameModern: "臺北市中正區總統府",
    coordinates: [121.51, 25.03],
    tags: ["解除戒嚴", "民主化", "開放報禁", "開放探親", "寧靜革命"]
  },
  {
    id: "evt_1996_direct_presidential_election",
    year: 1996,
    yearDisplay: "西元 1996 年 (民國八十五年)",
    title: "中華民國首屆公民直選總統 (民主先生李登輝)",
    summary: "面對臺海飛彈危機，全體公民一人一票直選國家元首，完成四千年華夏歷史首次民主普選。",
    detail: "1996年3月23日，中華民國舉行歷史上第九任總統、副總統公民直接選舉。面對中共在臺灣海峽實施飛彈試射與軍事演習威脅，全臺超過一千萬選民以高達76%投票率完成投票，李登輝、連戰以54%得票率當選。這是四千年華人文明史上第一次由全體人民透過民主投票選出國家最高領袖，被國際社會讚譽為「華人民主之燈塔」。",
    locationNameAncient: "臺澎金馬全區",
    locationNameModern: "臺灣各地投票所",
    coordinates: [121.51, 25.04],
    tags: ["總統直選", "主權在民", "李登輝", "民主燈塔"]
  },
  {
    id: "evt_2000_peaceful_power_transition",
    year: 2000,
    yearDisplay: "西元 2000 年 (民國八十九年)",
    title: "首次政黨輪替與民主體制完全成熟",
    summary: "第十任總統大選和平完成華人社會首次政黨政權轉移，確立成熟憲政民主常態。",
    detail: "2000年3月18日第十任總統大選揭曉，民主進步黨候選人陳水扁、呂秀蓮當選，執政半個多世紀的中國國民黨和平交出政權，國軍公開宣示「軍隊國家化效忠中華民國憲法」。政權和平交接標誌臺灣民主制度完全成熟，樹立和平憲政民主典範。",
    locationNameAncient: "臺灣臺北",
    locationNameModern: "臺北市中正區總統府",
    coordinates: [121.51, 25.03],
    tags: ["政黨輪替", "軍隊國家化", "和平轉移", "成熟民主"]
  }
];

// Write events.js
const eventsFileContent = `// Republic & Modern China-Taiwan Period (1912 - Modern) Events
export const REPUBLIC_MODERN_EVENTS = ${JSON.stringify(eventsData, null, 2)};
`;
fs.writeFileSync(path.join(basePeriodDir, 'events.js'), eventsFileContent, 'utf8');

// 4. Territories (territories.js)
const territoriesData = {
  republicPeak: {
    year: "西元 1912 - 1945 年 (中華民國法定版圖)",
    name: "中華民國秋海棠極盛法定疆域 (1141 萬平方公里)",
    description: "東起黑龍江與烏蘇里江匯合處，西達帕米爾高原噴赤河，南至南海諸島曾母暗沙，北抵薩彥嶺接唐努烏梁海與外蒙古，疆域形如秋海棠葉，管轄三十五省、一直轄地方、兩特別行政區與西藏地方。"
  },
  taiwanModern: {
    year: "西元 1949 年至今 (臺澎金馬實質管轄與海峽中線防禦圈)",
    name: "中華民國現代治權範圍與亞太民主島鏈樞紐",
    description: "實質管轄臺灣本島、澎湖群島、金門群島、馬祖列島、東沙群島及南沙太平島，控扼臺灣海峽與第一島鏈戰略航道，位居全球先進高科技半導體產業核心與華人世界民主燈塔。"
  }
};
const territoriesFileContent = `export const REPUBLIC_MODERN_TERRITORIES = ${JSON.stringify(territoriesData, null, 2)};\n`;
fs.writeFileSync(path.join(basePeriodDir, 'territories.js'), territoriesFileContent, 'utf8');

// 5. Warlord Periods (warlordPeriods.js)
const warlordPeriodsData = [
  {
    id: "rep_1912",
    yearNumber: 1912,
    yearDisplay: "西元 1912 年",
    shortLabel: "辛亥肇建",
    headline: "中華民國開國大典：孫中山南京宣告共和，宣統遜位南北議和",
    subTitle: "亞洲第一個民主共和國肇建，五色旗飄揚，清帝遜位終結帝制。",
    chronicleLeft: [
      "1912年元旦孫中山於南京宣誓就職臨時大總統，宣告中華民國成立，採用陽曆公曆。",
      "頒布《中華民國臨時約法》，確立三權分立、人民自由與五族共和主權在民憲政架構。",
      "南北議和達成協議，袁世凱施壓隆裕太后頒布退位詔書，孫中山踐諾讓位予袁世凱。"
    ],
    chronicleRight: [
      "北京北洋六鎮勢力龐大掌控華北，袁世凱借故兵變定都北京就任第二任臨時大總統。",
      "南方革命黨人與立憲派於各省成立都督府，革命陣營面臨財政拮据與軍政重組挑戰。",
      "臺灣正值日本大正時期殖民統治，羅福星在臺密組同盟會支部籌備苗栗起義。"
    ],
    provinceWarlordMap: {
      jiangsu: { warlord: "中華民國臨時政府 (南京孫中山)", color: "#93c5fd" },
      anhui: { warlord: "革命各省都督府", color: "#93c5fd" },
      zhejiang: { warlord: "革命各省都督府", color: "#93c5fd" },
      hubei: { warlord: "湖北軍政府 (黎元洪)", color: "#93c5fd" },
      hunan: { warlord: "湖南都督府 (焦達峰/譚延闓)", color: "#93c5fd" },
      guangdong: { warlord: "廣東都督府 (胡漢民)", color: "#93c5fd" },
      guangxi: { warlord: "廣西都督府 (陸榮廷)", color: "#93c5fd" },
      sichuan: { warlord: "大漢四川軍政府", color: "#93c5fd" },
      fujian: { warlord: "福建都督府", color: "#93c5fd" },
      jiangxi: { warlord: "江西都督府 (李烈鈞)", color: "#93c5fd" },
      beijing: { warlord: "北洋袁世凱內閣 (掌控京畿)", color: "#fed7aa" },
      hebei: { warlord: "北洋軍掌控區", color: "#fed7aa" },
      henan: { warlord: "北洋軍控制中原", color: "#fed7aa" },
      shandong: { warlord: "北洋第五鎮進駐", color: "#fed7aa" },
      shanxi: { warlord: "晉系起義軍 (閻錫山都督)", color: "#fef08a" },
      shaanxi: { warlord: "秦隴起義軍 (張鳳翽)", color: "#93c5fd" },
      liaoning: { warlord: "奉天巡防營 (張作霖崛起)", color: "#fed7aa" },
      jilin: { warlord: "清軍吉林將軍殘部", color: "#fed7aa" },
      heilongjiang: { warlord: "黑龍江都督府", color: "#fed7aa" },
      yunnan: { warlord: "重九起義滇軍 (蔡鍔都督)", color: "#a7f3d0" },
      guizhou: { warlord: "貴州起義都督府", color: "#a7f3d0" },
      taiwan: { warlord: "日本臺灣總督府 (佐久間左馬太)", color: "#fca5a5" },
      hainan: { warlord: "廣東軍政府管轄", color: "#93c5fd" }
    }
  },
  {
    id: "rep_1920",
    yearNumber: 1920,
    yearDisplay: "西元 1920 年",
    shortLabel: "軍閥割據",
    headline: "北洋軍閥派系混戰：直皖之戰曹吳得勢，南方廣州護法革命",
    subTitle: "袁世凱死後群雄割據分崩離析，臺灣文化協會誕生啟發民族覺醒。",
    chronicleLeft: [
      "直皖戰爭爆發，直系曹錕、吳佩孚聯合奉系張作霖大敗皖系段祺瑞，直系掌控北京中央。",
      "南方孫中山於廣州兩度建立護法軍政府，誓師北伐對抗北洋軍閥，倡導和平統一。",
      "西南滇系唐繼堯、桂系陸榮廷各據一方，中國陷入軍閥割據四分五裂之混亂深淵。"
    ],
    chronicleRight: [
      "五四新文化運動思潮吹拂全島，林獻堂赴日發起「臺灣議會設置請願運動」。",
      "蔣渭水等青年知識分子籌組「臺灣文化協會」，設立讀報社與巡迴演講喚醒臺灣同胞。",
      "臺灣新文學運動萌芽，以白話中文反思殖民處境，開啟三十年現代啟蒙浪潮。"
    ],
    provinceWarlordMap: {
      beijing: { warlord: "直系軍閥 (曹錕/吳佩孚掌控北京)", color: "#fdba74" },
      hebei: { warlord: "直系核心根據地", color: "#fdba74" },
      henan: { warlord: "吳佩孚直系精銳大本營 (洛陽)", color: "#fdba74" },
      hubei: { warlord: "直系湖北督軍", color: "#fdba74" },
      jiangsu: { warlord: "直系齊燮元駐紮", color: "#fdba74" },
      liaoning: { warlord: "奉系東北軍 (張作霖大帥府)", color: "#fef08a" },
      jilin: { warlord: "奉系勢力範圍", color: "#fef08a" },
      heilongjiang: { warlord: "奉系控制黑龍江", color: "#fef08a" },
      shandong: { warlord: "皖系靳雲鵬部", color: "#fde68a" },
      zhejiang: { warlord: "皖系盧永祥督軍 (保衛上海)", color: "#fde68a" },
      shanxi: { warlord: "晉系模範省 (閻錫山自主)", color: "#cbd5e1" },
      guangdong: { warlord: "廣州護法軍政府 (孫中山大元帥)", color: "#93c5fd" },
      guangxi: { warlord: "舊桂系陸榮廷", color: "#d8b4fe" },
      yunnan: { warlord: "滇系唐繼堯", color: "#a7f3d0" },
      guizhou: { warlord: "黔系割據", color: "#a7f3d0" },
      sichuan: { warlord: "川系劉湘等防區防線混戰", color: "#fbcfe8" },
      hunan: { warlord: "湘系趙恆惕自主省憲", color: "#fde047" },
      taiwan: { warlord: "日本臺灣總督府 (文官總督田健治郎)", color: "#fca5a5" },
      fujian: { warlord: "直系李厚基部", color: "#fdba74" },
      hainan: { warlord: "廣州革命軍政府掌控", color: "#93c5fd" }
    }
  },
  {
    id: "rep_1928",
    yearNumber: 1928,
    yearDisplay: "西元 1928 年",
    shortLabel: "北伐統一",
    headline: "國民革命軍北伐統一：定都南京奠定憲政，張學良東北易幟",
    subTitle: "結束軍閥割據進入十年黃金建設期，臺灣民眾黨成立拓展政黨民主。",
    chronicleLeft: [
      "蔣中正統帥國民革命軍克復北京，張學良頂住關東軍阻撓通電東北易幟，全國宣告統一。",
      "南京國民政府成立，收回關稅自主權，改組行政院各部，修築浙贛鐵路與各大公路。",
      "推行幣制改革，發行法幣統一全國金融貨幣體系，推動新生活運動振興國民道德精神。"
    ],
    chronicleRight: [
      "蔣渭水於臺中創立「臺灣民眾黨」，確立自治爭取普選，發起勞工工友總聯盟抗爭。",
      "臺灣總督府推行皇民化運動前夕，臺灣知識分子奮力維繫漢文文化與母語刊物傳承。",
      "賴和、楊逵發表抗殖民文學作品，彰顯臺灣人民堅韌反抗壓迫之靈魂。"
    ],
    provinceWarlordMap: {
      jiangsu: { warlord: "中華民國首都南京 (蔣中正國民政府)", color: "#60a5fa" },
      zhejiang: { warlord: "中央軍政治經濟核心腹地", color: "#60a5fa" },
      anhui: { warlord: "南京中央管轄區", color: "#60a5fa" },
      jiangxi: { warlord: "南京中央管轄區", color: "#60a5fa" },
      fujian: { warlord: "南京中央管轄省份", color: "#60a5fa" },
      beijing: { warlord: "改名北平 (國民政府直轄)", color: "#60a5fa" },
      hebei: { warlord: "閻錫山晉軍進駐歸順中央", color: "#93c5fd" },
      henan: { warlord: "馮玉祥第二集團軍部隊", color: "#93c5fd" },
      shandong: { warlord: "中央軍與地方混編守備", color: "#60a5fa" },
      liaoning: { warlord: "張學良東北易幟 (服從中央)", color: "#93c5fd" },
      jilin: { warlord: "東北易幟區域", color: "#93c5fd" },
      heilongjiang: { warlord: "東北易幟區域", color: "#93c5fd" },
      shanxi: { warlord: "閻錫山第三集團軍晉系", color: "#93c5fd" },
      guangxi: { warlord: "李宗仁/白崇禧第四集團軍新桂系", color: "#93c5fd" },
      guangdong: { warlord: "國民革命軍發祥地陳濟棠部", color: "#60a5fa" },
      hunan: { warlord: "中央軍何鍵進駐", color: "#60a5fa" },
      hubei: { warlord: "武漢政治分會直屬中央", color: "#60a5fa" },
      sichuan: { warlord: "川軍劉湘等通電擁護中央", color: "#93c5fd" },
      yunnan: { warlord: "龍雲主滇服從南京中央", color: "#93c5fd" },
      guizhou: { warlord: "黔軍歸附中央", color: "#93c5fd" },
      taiwan: { warlord: "日本臺灣總督府 (民眾黨非暴力抗爭)", color: "#fca5a5" },
      hainan: { warlord: "廣東省政府管轄", color: "#60a5fa" }
    }
  },
  {
    id: "rep_1938",
    yearNumber: 1938,
    yearDisplay: "西元 1938 年",
    shortLabel: "抗戰烽火",
    headline: "全面抗日戰爭浴血相持：遷都陪都重慶，台兒莊大捷揚威中外",
    subTitle: "以空間換取時間誓死不降，臺灣同胞前仆後繼投入抗日救亡大業。",
    chronicleLeft: [
      "七七事變全面抗戰爆發，淞滬血戰破日軍速勝迷夢，國民政府遷都戰時陪都重慶。",
      "李宗仁指揮台兒莊大戰全殲日軍精銳萬餘人，取得抗戰正面戰場首次重大空前勝利。",
      "武漢會戰消耗百萬日軍精銳，抗戰進入長期艱苦戰略相持階段，大後方軍民百折不撓。"
    ],
    chronicleRight: [
      "日本強行推行「皇民化運動」，廢止臺灣報紙漢文欄、強迫改日本姓名與神社參拜。",
      "李友邦在浙江金華成立「臺灣義勇隊」參加抗戰，高喊「保衛祖國，收復臺灣」。",
      "數萬臺灣青年被迫被徵召至南洋戰場，無數先民在殖民高壓下默默維繫中華民族認同。"
    ],
    provinceWarlordMap: {
      sichuan: { warlord: "中華民國戰時陪都重慶 (蔣中正統帥大後方)", color: "#3b82f6" },
      guizhou: { warlord: "抗戰西南大後方軍事要地", color: "#3b82f6" },
      yunnan: { warlord: "西南聯大 / 滇緬公路國際補給起點", color: "#3b82f6" },
      guangxi: { warlord: "第四戰區抗日前線 (白崇禧指揮)", color: "#3b82f6" },
      hunan: { warlord: "第九戰區長沙會戰前線 (薛岳指揮)", color: "#3b82f6" },
      hubei: { warlord: "第五戰區拉鋸戰場 (李宗仁指揮)", color: "#60a5fa" },
      shaanxi: { warlord: "第一戰區與陝甘寧抗日後方", color: "#3b82f6" },
      shanxi: { warlord: "第二戰區中條山防線抗日 (閻錫山)", color: "#60a5fa" },
      henan: { warlord: "第一戰區前線黃河防線", color: "#60a5fa" },
      jiangsu: { warlord: "日本華中派遣軍佔領區 (南京)", color: "#f87171" },
      anhui: { warlord: "津浦路沿線日軍佔領與敵後游擊", color: "#f87171" },
      zhejiang: { warlord: "浙東國軍抗日與日佔沿海對峙", color: "#60a5fa" },
      beijing: { warlord: "日本華北方面軍佔領區", color: "#f87171" },
      hebei: { warlord: "日本華北方面軍佔領區", color: "#f87171" },
      shandong: { warlord: "日軍佔領主要鐵路線 / 國軍敵後游擊", color: "#f87171" },
      liaoning: { warlord: "日本偽滿洲國控制", color: "#f87171" },
      jilin: { warlord: "日本偽滿洲國控制", color: "#f87171" },
      heilongjiang: { warlord: "日本偽滿洲國控制", color: "#f87171" },
      taiwan: { warlord: "大日本帝國「南進戰略基地」", color: "#fca5a5" },
      guangdong: { warlord: "廣州淪陷 / 粵北國軍頑強阻截", color: "#f87171" },
      fujian: { warlord: "第三戰區守備區", color: "#3b82f6" },
      hainan: { warlord: "日軍登陸佔領海口三亞", color: "#f87171" }
    }
  },
  {
    id: "rep_1945",
    yearNumber: 1945,
    yearDisplay: "西元 1945 年",
    shortLabel: "臺灣光復",
    headline: "二戰抗戰終獲勝利：日本無條件投降，臺灣澎湖重返中華民國",
    subTitle: "開羅宣言踐履收復寶島，臺北中山堂舉行神聖受降典禮。",
    chronicleLeft: [
      "日本天皇宣布無條件投降，中國戰區在南京陸軍總部舉行受降典禮，岡村寧次遞呈降書。",
      "中華民國洗刷百年國恥，廢除一切不平等條約，成為聯合國安理會五大常任理事國。",
      "重慶召開國共和談簽訂雙十協定，全國軍民渴望和平建國迎接戰後重建新時代。"
    ],
    chronicleRight: [
      "10月25日臺北公會堂（中山堂）舉行受降典禮，安藤利吉降服，臺灣結束五十年日本統治。",
      "全島數百萬民眾歡欣鼓舞熱烈慶祝「臺灣光復」，設立臺灣省行政長官公署進行接收。",
      "林獻堂、蔡培火等耆宿組光復致敬團赴南京致敬並謁中山陵，宣示兩岸骨肉團圓。"
    ],
    provinceWarlordMap: {
      taiwan: { warlord: "中華民國臺灣省 (陳儀受降接管光復)", color: "#60a5fa" },
      jiangsu: { warlord: "中華民國首都南京 (何應欽主持受降)", color: "#60a5fa" },
      zhejiang: { warlord: "國軍接管復員區", color: "#60a5fa" },
      anhui: { warlord: "國軍接管區", color: "#60a5fa" },
      jiangxi: { warlord: "國民政府統治區", color: "#60a5fa" },
      hubei: { warlord: "國民政府光復區", color: "#60a5fa" },
      hunan: { warlord: "國民政府管轄區", color: "#60a5fa" },
      sichuan: { warlord: "國民政府陪都重慶復員還都", color: "#60a5fa" },
      guangdong: { warlord: "廣東省政府光復接管", color: "#60a5fa" },
      fujian: { warlord: "福建省政府管轄", color: "#60a5fa" },
      beijing: { warlord: "北平受降區 (孫連仲主持受降)", color: "#60a5fa" },
      hebei: { warlord: "國軍接管平津地區", color: "#60a5fa" },
      shandong: { warlord: "國軍接管濟南青島", color: "#60a5fa" },
      henan: { warlord: "國民政府管轄省份", color: "#60a5fa" },
      liaoning: { warlord: "蘇軍進駐佔領 / 國軍接收撫順瀋陽", color: "#93c5fd" },
      jilin: { warlord: "國軍進駐接收吉林長春", color: "#93c5fd" },
      heilongjiang: { warlord: "東北各部光復重整", color: "#93c5fd" },
      shanxi: { warlord: "閻錫山部接管太原", color: "#60a5fa" },
      guangxi: { warlord: "國民政府統轄省份", color: "#60a5fa" },
      yunnan: { warlord: "盧漢滇軍出兵越南受降", color: "#60a5fa" },
      guizhou: { warlord: "國民政府後方復員", color: "#60a5fa" },
      hainan: { warlord: "廣東省光復接收", color: "#60a5fa" }
    }
  },
  {
    id: "rep_1949",
    yearNumber: 1949,
    yearDisplay: "西元 1949 年",
    shortLabel: "兩岸分治",
    headline: "中央政府遷臺定鼎：古寧頭大捷挽救狂瀾，兩岸海峽分治七十年",
    subTitle: "百萬軍民攜故宮國寶遷臺，土地改革安定社會奠定自由繁榮基地。",
    chronicleLeft: [
      "國共內戰局勢驟變，中央政府自南京經廣州、重慶、成都於12月正式播遷臺北。",
      "大批學者名流、百萬國軍將士、國庫黃金儲備及北京故宮精華國寶安全運抵基隆與高雄港。",
      "1949年10月解放軍三團突擊登陸金門，國軍在胡璉指揮下浴血反擊全殲敵軍於古寧頭。"
    ],
    chronicleRight: [
      "陳誠主持推行三七五減租、公地放領與耕者有其田，和平土地改革解決農民土地問題。",
      "嚴家淦推動新臺幣幣制改革，徹底切斷惡性通膨，穩定臺灣物價與基層民生治安。",
      "古寧頭戰役粉碎奪島企圖，奠定臺澎金馬成為捍衛自由世界反共與民主復興之不沉航空母艦。"
    ],
    provinceWarlordMap: {
      taiwan: { warlord: "中華民國中央政府 (臺北總統府 / 蔣中正復職)", color: "#2563eb" },
      fujian: { warlord: "中華民國福建省政府 (金門防衛司令部胡璉大捷)", color: "#2563eb" },
      hainan: { warlord: "國軍海南防衛總司令部 (薛岳指揮至1950年)", color: "#60a5fa" },
      zhejiang: { warlord: "解放軍進駐東南沿海 (國軍退守大陳島)", color: "#ef4444" },
      jiangsu: { warlord: "中華人民共和國控制區", color: "#ef4444" },
      anhui: { warlord: "中華人民共和國控制區", color: "#ef4444" },
      beijing: { warlord: "中華人民共和國宣告成立 (定都北京)", color: "#dc2626" },
      hebei: { warlord: "解放軍完全控制", color: "#ef4444" },
      shandong: { warlord: "解放軍完全控制", color: "#ef4444" },
      henan: { warlord: "解放軍完全控制", color: "#ef4444" },
      hubei: { warlord: "解放軍完全控制", color: "#ef4444" },
      hunan: { warlord: "解放軍完全控制", color: "#ef4444" },
      jiangxi: { warlord: "解放軍完全控制", color: "#ef4444" },
      guangdong: { warlord: "解放軍進佔廣州", color: "#ef4444" },
      guangxi: { warlord: "解放軍完全控制", color: "#ef4444" },
      sichuan: { warlord: "國軍成都撤退 / 解放軍佔領四川", color: "#ef4444" },
      guizhou: { warlord: "解放軍控制", color: "#ef4444" },
      yunnan: { warlord: "盧漢投共 / 國軍余部轉進滇緬邊境", color: "#ef4444" },
      liaoning: { warlord: "解放軍完全控制", color: "#ef4444" },
      jilin: { warlord: "解放軍完全控制", color: "#ef4444" },
      heilongjiang: { warlord: "解放軍完全控制", color: "#ef4444" },
      shanxi: { warlord: "解放軍攻克太原", color: "#ef4444" }
    }
  },
  {
    id: "rep_1975",
    yearNumber: 1975,
    yearDisplay: "西元 1975 年",
    shortLabel: "現代繁榮",
    headline: "臺灣經濟騰飛：推動十大建設，竹科奠基締造全球半導體奇蹟",
    subTitle: "自立自強突破外交逆境，由農業社會蛻變為先進全球科技矽島。",
    chronicleLeft: [
      "面對退出聯合國與國際石油危機衝擊，蔣經國、孫運璿全力推動國家「十大建設」。",
      "中山高速公路貫通南北、中正國際機場落成啟用、大鋼廠大造船廠大石化廠拔地而起。",
      "臺灣自新興工業國家迅速崛起，外匯儲備飛躍增長，名列亞洲四小龍之首引領風騷。"
    ],
    chronicleRight: [
      "李國鼎倡導創立「新竹科學工業園區」，推動工研院引進美國RCA超大型積體電路技術。",
      "力邀張忠謀回臺主持工研院與創立台積電（TSMC），首創晶圓代工模式顛覆全球高科技。",
      "普及九年國民義務教育，厚植數百萬優秀工程師與現代中產階級，為民主開放奠定雄厚基石。"
    ],
    provinceWarlordMap: {
      taiwan: { warlord: "中華民國實質管轄 (十大建設 / 亞洲四小龍之首)", color: "#1d4ed8" },
      fujian: { warlord: "中華民國金門、馬祖戰地政務委員會防衛", color: "#1d4ed8" },
      hainan: { warlord: "中共控制海警巡邏", color: "#ef4444" },
      beijing: { warlord: "中共中央國務院", color: "#dc2626" },
      hebei: { warlord: "中共控制", color: "#ef4444" },
      jiangsu: { warlord: "中共控制", color: "#ef4444" },
      zhejiang: { warlord: "中共控制", color: "#ef4444" },
      guangdong: { warlord: "中共控制", color: "#ef4444" },
      shandong: { warlord: "中共控制", color: "#ef4444" },
      henan: { warlord: "中共控制", color: "#ef4444" },
      hubei: { warlord: "中共控制", color: "#ef4444" },
      hunan: { warlord: "中共控制", color: "#ef4444" },
      sichuan: { warlord: "中共控制", color: "#ef4444" },
      liaoning: { warlord: "中共控制", color: "#ef4444" },
      jilin: { warlord: "中共控制", color: "#ef4444" },
      heilongjiang: { warlord: "中共控制", color: "#ef4444" },
      shanxi: { warlord: "中共控制", color: "#ef4444" },
      shaanxi: { warlord: "中共控制", color: "#ef4444" },
      yunnan: { warlord: "中共控制", color: "#ef4444" },
      guizhou: { warlord: "中共控制", color: "#ef4444" },
      guangxi: { warlord: "中共控制", color: "#ef4444" },
      anhui: { warlord: "中共控制", color: "#ef4444" },
      jiangxi: { warlord: "中共控制", color: "#ef4444" }
    }
  }
];

// Write warlordPeriods.js
const warlordPeriodsFileContent = `// Republic & Modern Period (1912 - Modern) Warlord Periods
export const REPUBLIC_MODERN_WARLORD_PERIODS = ${JSON.stringify(warlordPeriodsData, null, 2)};
`;
fs.writeFileSync(path.join(basePeriodDir, 'warlordPeriods.js'), warlordPeriodsFileContent, 'utf8');

// 6. Demographics (demographics.js)
const demographicsData = {
  periodId: "republicModern",
  title: "民國肇建至現代臺灣人口演變與多元族群融合",
  summary: "從辛亥民國四萬萬同胞，到戰後臺灣人口由六百萬激增突破兩千三百萬；歷經大遷徙、農業轉型、九年國教普及與高科技矽島騰飛，形成高度包容之現代多元公民社會。",
  peakPopulation: "中華民國實際管轄人口約 2,340 萬人 (臺灣本島與澎金馬)；全華人世界逾 14 億",
  censusData: [
    {
      year: 1912,
      yearDisplay: "西元 1912 年 (民國元年)",
      total: "約 43,200 萬 (全國)",
      households: "約 8,900 萬",
      note: "清宣統帝退位，民國初創時號稱「四萬萬同胞」"
    },
    {
      year: 1928,
      yearDisplay: "西元 1928 年 (北伐統一時期)",
      total: "約 45,000 萬 (全國) / 臺灣約 440 萬",
      households: "約 9,200 萬",
      note: "黃金十年起點，臺灣日治時期實施現代戶口調查，衛生進步人口穩健增長"
    },
    {
      year: 1945,
      yearDisplay: "西元 1945 年 (二戰結束光復時期)",
      total: "臺灣約 609 萬人",
      households: "約 110 萬",
      note: "日本戰敗投降後，在臺日人約 30 萬全數遣返回日"
    },
    {
      year: 1949,
      yearDisplay: "西元 1949 - 1950 年 (大遷徙時期)",
      total: "臺灣約 755 萬人 (含軍民播遷約 120 萬)",
      households: "約 145 萬",
      note: "隨中央政府播遷來臺之各省軍民與公教人員，帶來大批科技、教育文化與軍事精英"
    },
    {
      year: 1970,
      yearDisplay: "西元 1970 年 (經濟起飛前夕)",
      total: "臺灣約 1,467 萬人",
      households: "約 280 萬",
      note: "戰後嬰兒潮與醫療衛生大幅改善，推動九年國教普及，人口紅利釋放"
    },
    {
      year: 1996,
      yearDisplay: "西元 1996 年 (首度民選總統)",
      total: "臺灣約 2,147 萬人",
      households: "約 580 萬",
      note: "完成憲政直選，高教育普及率與健全健保制度確立"
    },
    {
      year: 2024,
      yearDisplay: "西元 2024 年 (現代臺灣)",
      total: "2,342 萬人",
      households: "約 920 萬",
      note: "邁入高齡化與少子化社會，新住民及其子女逾百萬人融入多元公民文化"
    }
  ],
  ethnicGroups: [
    {
      name: "臺灣閩南族群 (福佬)",
      percentage: "約 65% - 70%",
      description: "明鄭與清代渡臺先民後代，操閩南語泉漳腔，開拓平原沿海市鎮，形成蓬勃廟會信仰與民間企業活力。"
    },
    {
      name: "臺灣客家族群",
      percentage: "約 15% - 18%",
      description: "主要聚居桃竹苗「臺三線」、六堆（高屏）與花東縱谷，崇尚耕讀傳家、刻苦硬頸精神，維護珍貴客家語言文化。"
    },
    {
      name: "戰後新住民 (大陸各省籍移民及後代)",
      percentage: "約 10% - 12%",
      description: "1949年隨政府來臺之大陸各省軍民，遍布全臺眷村，融合大江南北飲食與文化，為臺灣現代化與國防貢獻卓越。"
    },
    {
      name: "臺灣原住民族 (法定十六族與平埔族群)",
      percentage: "約 2.5% (約 60 萬人)",
      description: "南島語系發源地，阿美、泰雅、排灣、布農、賽德克等十六個經政府認定族群，擁有獨特豐年祭典、祖靈信仰與無可取代之南島文化資產。"
    },
    {
      name: "新南向新住民與國際新公民",
      percentage: "約 3% (約 60~80 萬人)",
      description: "來自越南、印尼、菲律賓等東南亞及世界各國之配偶與就業人才，為臺灣注入嶄新多元文化活水。"
    }
  ],
  insights: [
    "人口規模從辛亥時期的四億大陸人口，轉化為戰後臺灣島內由六百萬到兩千三百萬的高素質現代公民。",
    "九年國民義務教育與普及高等教育，培養出支撐新竹科學園區與台積電半導體全球供應鏈的最關鍵工程師人才庫。",
    "從族群藩籬走向現代民主共同體，原住民、閩南、客家、眷村與新住民多元並蓄，展現華人世界最具自由活力的民主開放社會。"
  ]
};

// Write demographics.js
const demographicsFileContent = `// Republic & Modern Period (1912 - Modern) Demographics
export const REPUBLIC_MODERN_DEMOGRAPHICS = ${JSON.stringify(demographicsData, null, 2)};
`;
fs.writeFileSync(path.join(basePeriodDir, 'demographics.js'), demographicsFileContent, 'utf8');

// 7. Index barrel file (index.js)
const indexFileContent = `// Republic & Modern China-Taiwan Period (1912 - Modern) Barrel Module
export * from './demographics.js';
export * from './territories.js';
export * from './figures.js';
export * from './battles.js';
export * from './events.js';
export * from './warlordPeriods.js';
`;
fs.writeFileSync(path.join(basePeriodDir, 'index.js'), indexFileContent, 'utf8');

console.log('Successfully created all files for republicModern period!');
