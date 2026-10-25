const fs = require('fs');
const path = require('path');

const yuanMingPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'yuanMing', 'figures.js');
const qingPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'qingDynasty', 'figures.js');
const imagesDir = path.resolve(__dirname, '..', 'images', 'figures');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

function createSvgSeal(name, faction, outputPath) {
  let color = '#d97706';
  let era = '元明';
  
  if (faction === 'yuan') { color = '#3b82f6'; era = '元'; }
  else if (faction === 'ming') { color = '#ef4444'; era = '明'; }
  else if (faction === 'qing') { color = '#eab308'; era = '清'; }
  else if (faction === 'taiwan') { color = '#10b981'; era = '臺'; }
  else if (faction === 'taiping') { color = '#f97316'; era = '天'; }
  else if (faction === 'republic') { color = '#06b6d4'; era = '民'; }
  else if (faction === 'science') { color = '#8b5cf6'; era = '學'; }
  
  const fallbackChar = name.length > 0 ? name[name.length - 1] : '先';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad_${era}_${name}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a241e"/>
      <stop offset="100%" stop-color="#14110e"/>
    </radialGradient>
    <filter id="glow_${era}_${name}">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="200" height="200" fill="url(#bgGrad_${era}_${name})"/>
  <circle cx="100" cy="100" r="88" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="6,4" opacity="0.6"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#e6c687" stroke-width="2"/>
  <circle cx="100" cy="100" r="74" fill="${color}" fill-opacity="0.15"/>
  <rect x="52" y="52" width="96" height="96" rx="8" fill="#881337" fill-opacity="0.3" stroke="#f43f5e" stroke-width="1.5"/>
  <text x="100" y="118" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="52" font-weight="900" fill="#fef08a" text-anchor="middle" filter="url(#glow_${era}_${name})">${fallbackChar}</text>
  <text x="100" y="172" font-family="'Noto Serif TC', sans-serif" font-size="13" font-weight="bold" fill="#fde68a" text-anchor="middle" letter-spacing="3">${era}·${name}</text>
</svg>`;
  fs.writeFileSync(outputPath, svg, 'utf8');
}

// ==========================================
// 1. Yuan-Ming Additional Figures (25 figures)
// ==========================================
const YUAN_MING_EXPANSION = [
  {
    id: "fig_xu_guangqi",
    name: "徐光啟",
    courtesyName: "子先",
    lifeSpan: "1562 - 1633",
    faction: "ming",
    role: "文淵閣大學士 / 中西科學交流先驅",
    roleType: "scholar",
    avatar: "./images/figures/fig_xu_guangqi.svg",
    importance: 5,
    hometown: "南直隸松江府上海縣",
    shortBio: "明末內閣首輔，科學家、天文學家、農業學家。與利瑪竇合譯《幾何原本》，著《農政全書》，主持崇禎曆局編修新曆，引進西方紅夷大砲強化京師防務。",
    historicalSignificance: "中西文化科學交流先驅，奠定中國近代數學、天文學與西方科技譯介基礎。",
    abilities: { strategy: 88, commanding: 72, politics: 95, intellect: 99, courage: 84, charisma: 90 }
  },
  {
    id: "fig_li_zhizao",
    name: "李之藻",
    courtesyName: "振之",
    lifeSpan: "1565 - 1630",
    faction: "ming",
    role: "太僕寺少卿 / 西學譯介重臣",
    roleType: "scholar",
    avatar: "./images/figures/fig_li_zhizao.svg",
    importance: 4,
    hometown: "浙江杭州府仁和縣",
    shortBio: "明末學者與大臣，與徐光啟、楊廷筠並稱「天主教三大柱石」。與利瑪竇等合譯《渾蓋通憲圖說》、《同文算指》、《名理探》，刊印《坤輿萬國全圖》。",
    historicalSignificance: "致力於西方數理、邏輯與地理學譯介，拓寬晚明天下一代士人的世界眼界。",
    abilities: { strategy: 80, commanding: 65, politics: 86, intellect: 96, courage: 78, charisma: 85 }
  },
  {
    id: "fig_fang_yizhi",
    name: "方以智",
    courtesyName: "密之",
    lifeSpan: "1611 - 1671",
    faction: "ming",
    role: "明末清初通儒 / 物理啟蒙大師",
    roleType: "scholar",
    avatar: "./images/figures/fig_fang_yizhi.svg",
    importance: 4,
    hometown: "南直隸安慶府桐城縣",
    shortBio: "明末四公子之一，崇禎進士。明亡後削髮為僧。精通中西自然哲學與博學，著有《物理小識》、《通雅》，提出「質測即藏通幾」之科學實證思想。",
    historicalSignificance: "中國近代百科全書式學者，在自然科學哲學上兼收中西精粹。",
    abilities: { strategy: 82, commanding: 60, politics: 78, intellect: 97, courage: 88, charisma: 88 }
  },
  {
    id: "fig_huang_zongxi",
    name: "黃宗羲",
    courtesyName: "太沖 (梨洲先生)",
    lifeSpan: "1610 - 1695",
    faction: "ming",
    role: "啟蒙思想家 / 東林後勁",
    roleType: "scholar",
    avatar: "./images/figures/fig_huang_zongxi.svg",
    importance: 5,
    hometown: "浙江紹興府餘姚縣",
    shortBio: "明末清初三大儒之一，抗清義士。著《明夷待訪錄》，猛烈批判君主專制，提出「天下為主，君為客」之民本主權觀，被譽為中國啟蒙運動之父。",
    historicalSignificance: "奠定近代反君主專制政治哲學之基石，梁啟超譽為東方盧梭。",
    abilities: { strategy: 86, commanding: 74, politics: 94, intellect: 99, courage: 92, charisma: 94 }
  },
  {
    id: "fig_gu_yanwu",
    name: "顧炎武",
    courtesyName: "寧人 (亭林先生)",
    lifeSpan: "1613 - 1682",
    faction: "ming",
    role: "實學開山導師 / 考據學宗師",
    roleType: "scholar",
    avatar: "./images/figures/fig_gu_yanwu.svg",
    importance: 5,
    hometown: "南直隸蘇州府崑山縣",
    shortBio: "明末清初三大儒之一。提倡「經世致用」，痛斥空談心學，著《日知錄》、《天下郡國利病書》，名言「天下興亡，匹夫有責」傳誦千古。",
    historicalSignificance: "開創清代乾嘉考據與經世致用學風，近代愛國主義精神之崇高典範。",
    abilities: { strategy: 88, commanding: 70, politics: 92, intellect: 98, courage: 95, charisma: 95 }
  },
  {
    id: "fig_wang_fuzhi",
    name: "王夫之",
    courtesyName: "而農 (船山先生)",
    lifeSpan: "1619 - 1692",
    faction: "ming",
    role: "唯物主義哲學巨擘",
    roleType: "scholar",
    avatar: "./images/figures/fig_wang_fuzhi.svg",
    importance: 5,
    hometown: "湖廣衡州府衡陽縣",
    shortBio: "明末清初三大儒之一。隱居石船山四十餘載著書立說，築土室曰湘西草堂，著《讀通鑑論》、《宋論》，建立博大深奧之唯物主義氣一元論體系。",
    historicalSignificance: "集古典哲學之大成，湖湘文化與近代湖湘人才輩出之思想源泉。",
    abilities: { strategy: 85, commanding: 65, politics: 88, intellect: 99, courage: 92, charisma: 91 }
  },
  {
    id: "fig_zhu_yunming",
    name: "祝允明",
    courtesyName: "希哲 (祝枝山)",
    lifeSpan: "1460 - 1526",
    faction: "ming",
    role: "江南四大才子 / 草書名家",
    roleType: "scholar",
    avatar: "./images/figures/fig_zhu_yunming.svg",
    importance: 4,
    hometown: "南直隸蘇州府長洲縣",
    shortBio: "江南四大才子之一，右手生六指，自號枝山。狂草豪放狂放跌宕，神采飛揚，與唐寅、文徵明、徐禎卿並稱吳中四才子。",
    historicalSignificance: "明代書法狂草藝術頂峰代表，吳門書派靈魂人物。",
    abilities: { strategy: 60, commanding: 40, politics: 68, intellect: 92, courage: 75, charisma: 90 }
  },
  {
    id: "fig_wen_zhengming",
    name: "文徵明",
    courtesyName: "徵仲 (衡山居士)",
    lifeSpan: "1470 - 1559",
    faction: "ming",
    role: "吳門畫派領袖 / 文藝巨擘",
    roleType: "scholar",
    avatar: "./images/figures/fig_wen_zhengming.svg",
    importance: 4,
    hometown: "南直隸蘇州府長洲縣",
    shortBio: "詩文、書畫皆登峰造極，弟子門生遍江南。行書得王羲之法，山水細筆清麗超逸，沈周逝後主盟江南文壇畫壇三十載。",
    historicalSignificance: "吳門畫派集大成者，明代江南士紳高雅文藝美學之最高代表。",
    abilities: { strategy: 65, commanding: 42, politics: 72, intellect: 94, courage: 78, charisma: 92 }
  },
  {
    id: "fig_xu_wei",
    name: "徐渭",
    courtesyName: "文長 (青藤道士)",
    lifeSpan: "1521 - 1593",
    faction: "ming",
    role: "潑墨大寫意始祖 / 天才奇士",
    roleType: "scholar",
    avatar: "./images/figures/fig_xu_wei.svg",
    importance: 4,
    hometown: "浙江紹興府山陰縣",
    shortBio: "明代奇才，胡宗憲幕府策士，曾畫策擒汪直、徐海。畫風大開大合、水墨淋漓，開創青藤畫派；劇作《四聲猿》被湯顯祖譽為海內奇作。",
    historicalSignificance: "中國大寫意水墨畫之奠基大師，齊白石曾云「恨不生三百年前為青藤門下走狗」。",
    abilities: { strategy: 90, commanding: 55, politics: 62, intellect: 98, courage: 86, charisma: 90 }
  },
  {
    id: "fig_tang_xianzu",
    name: "湯顯祖",
    courtesyName: "義仍 (海若)",
    lifeSpan: "1550 - 1616",
    faction: "ming",
    role: "東方莎士比亞 / 戲曲傳奇大師",
    roleType: "scholar",
    avatar: "./images/figures/fig_tang_xianzu.svg",
    importance: 5,
    hometown: "江西撫州府臨川縣",
    shortBio: "明代最傑出之戲劇家，著「臨川四夢」，尤以《牡丹亭》名滿天下。「情不知所起，一往而深」傳誦數百年，與同時代英國莎士比亞齊名震鑠世界戲劇史。",
    historicalSignificance: "世界級戲劇泰斗，浪漫主義情感文學的崇高高峰。",
    abilities: { strategy: 65, commanding: 45, politics: 70, intellect: 97, courage: 80, charisma: 95 }
  },
  {
    id: "fig_feng_menglong",
    name: "馮夢龍",
    courtesyName: "猶龍",
    lifeSpan: "1574 - 1646",
    faction: "ming",
    role: "通俗文學泰斗 / 白話小說奠基人",
    roleType: "scholar",
    avatar: "./images/figures/fig_feng_menglong.svg",
    importance: 4,
    hometown: "南直隸蘇州府長洲縣",
    shortBio: "編纂「三言」（《喻世明言》、《警世通言》、《醒世恆言》），整理改編《東周列國志》，極大推動市井大眾白話通俗文學與市民文化狂飆發展。",
    historicalSignificance: "中國古代白話短篇小說繁榮的第一功臣。",
    abilities: { strategy: 70, commanding: 48, politics: 75, intellect: 94, courage: 75, charisma: 90 }
  },
  {
    id: "fig_yang_shen",
    name: "楊慎",
    courtesyName: "用修 (升庵先生)",
    lifeSpan: "1488 - 1559",
    faction: "ming",
    role: "大明第一才子 / 翰林修撰",
    roleType: "scholar",
    avatar: "./images/figures/fig_yang_shen.svg",
    importance: 5,
    hometown: "四川成都府新都縣",
    shortBio: "正德六年狀元，內閣首輔楊廷和之子。因大禮議案抗爭廷杖謫戍雲南永昌三十餘年，博覽群書著述浩瀚，詞作《臨江仙·滾滾長江東逝水》後世定為《三國演義》卷首詞。",
    historicalSignificance: "明代三才子之首，在西南邊陲播撒中原文化，詞作千古不朽。",
    abilities: { strategy: 78, commanding: 50, politics: 82, intellect: 99, courage: 94, charisma: 93 }
  },
  {
    id: "fig_tie_xuan",
    name: "鐵鉉",
    courtesyName: "鼎石",
    lifeSpan: "1366 - 1402",
    faction: "ming",
    role: "兵部尚書 / 濟南鐵壁忠烈",
    roleType: "general",
    avatar: "./images/figures/fig_tie_xuan.svg",
    importance: 4,
    hometown: "河南鄧州",
    shortBio: "回族將領。靖難之役時堅守濟南城，設鐵板掛朱元璋畫像重創朱棣燕軍，力挫燕軍三月之久。燕王奪位後誓死不屈，受磔刑壯烈殉國。",
    historicalSignificance: "忠義節烈不懼權逆的千古代表，濟南市民世代立廟祭祀鐵公祠。",
    abilities: { strategy: 90, commanding: 92, politics: 86, intellect: 88, courage: 99, charisma: 95 }
  },
  {
    id: "fig_shi_heng",
    name: "石亨",
    courtesyName: "武毅",
    lifeSpan: "1410 - 1460",
    faction: "ming",
    role: "武清侯 / 京師保衛戰驍將",
    roleType: "general",
    avatar: "./images/figures/fig_shi_heng.svg",
    importance: 4,
    hometown: "北直隸順天府大興縣",
    shortBio: "土木堡之變後協助于謙守衛德勝門，奮勇搏殺重創瓦剌也先騎兵，戰功第一。後參與奪門之變擁復英宗，封忠國公，晚年驕橫跋扈下獄死。",
    historicalSignificance: "北京保衛戰戰場第一戰將，功績赫赫但命運起伏昭示權力更迭無常。",
    abilities: { strategy: 82, commanding: 92, politics: 60, intellect: 70, courage: 96, charisma: 75 }
  },
  {
    id: "fig_kuang_zhong",
    name: "況鍾",
    courtesyName: "伯律",
    lifeSpan: "1383 - 1443",
    faction: "ming",
    role: "蘇州知府 / 況青天",
    roleType: "minister",
    avatar: "./images/figures/fig_kuang_zhong.svg",
    importance: 4,
    hometown: "江西靖安縣",
    shortBio: "宣德年間任蘇州知府十三年，廉潔自持，嚴懲豪強貪吏，平反冤獄，減免重賦興修水利，百姓刻石頌德，譽為「況青天」，與包拯、海瑞齊名。",
    historicalSignificance: "明代地方良吏清官之最高典範，戲曲《十五貫》之核心主角原型。",
    abilities: { strategy: 80, commanding: 65, politics: 95, intellect: 90, courage: 92, charisma: 94 }
  },
  {
    id: "fig_xia_yan",
    name: "夏言",
    courtesyName: "公謹 (桂翁)",
    lifeSpan: "1482 - 1548",
    faction: "ming",
    role: "內閣首輔 / 耿介忠直直言敢諫",
    roleType: "minister",
    avatar: "./images/figures/fig_xia_yan.svg",
    importance: 4,
    hometown: "江西廣信府貴溪縣",
    shortBio: "嘉靖朝名相，為官剛烈方正，力整朝綱抗衡權臣。支持曾銑收復河套之策，遭嚴嵩奸謀陷害棄市。後隆慶帝平反追諡文愍。",
    historicalSignificance: "嘉靖朝抗擊韃靼與整頓內政之中樞梁柱，嚴嵩掌權前夕之正義防線。",
    abilities: { strategy: 85, commanding: 62, politics: 93, intellect: 92, courage: 95, charisma: 88 }
  },
  {
    id: "fig_gao_gong",
    name: "高拱",
    courtesyName: "肅卿 (中玄)",
    lifeSpan: "1513 - 1578",
    faction: "ming",
    role: "內閣首輔 / 隆慶新政擘劃者",
    roleType: "minister",
    avatar: "./images/figures/fig_gao_gong.svg",
    importance: 4,
    hometown: "河南開封府新鄭縣",
    shortBio: "隆慶朝首輔，果決善斷，力主俺答封貢結束北方百年戰事，拔擢戚繼光守薊鎮、李成梁守遼東，起用張居正推行吏治，為萬曆中興奠下宏基。",
    historicalSignificance: "隆慶和議與邊防強化的核心推手，明中後期名相重臣。",
    abilities: { strategy: 92, commanding: 72, politics: 96, intellect: 94, courage: 92, charisma: 89 }
  },
  {
    id: "fig_chen_lin",
    name: "陳璘",
    courtesyName: "朝爵",
    lifeSpan: "1543 - 1607",
    faction: "ming",
    role: "水軍都督 / 露梁海戰明軍總指揮",
    roleType: "general",
    avatar: "./images/figures/fig_chen_lin.svg",
    importance: 5,
    hometown: "廣東韶州府翁源縣",
    shortBio: "萬曆援朝抗日水師總指揮，率明朝舟師萬餘出海戰鬥。在露梁海戰與朝鮮統制使李舜臣並肩浴血作戰，焚毀擊沉日艦數百艘，徹底終結豐臣秀吉侵略野心。",
    historicalSignificance: "萬曆援朝戰爭海戰決戰總舵手，中朝共同尊崇之抗倭民族英雄。",
    abilities: { strategy: 91, commanding: 94, politics: 78, intellect: 84, courage: 95, charisma: 90 }
  },
  {
    id: "fig_deng_zilong",
    name: "鄧子龍",
    courtesyName: "武橋",
    lifeSpan: "1531 - 1598",
    faction: "ming",
    role: "副總兵 / 露梁海戰壯烈殉國老將",
    roleType: "general",
    avatar: "./images/figures/fig_deng_zilong.svg",
    importance: 4,
    hometown: "江西撫州府豐城縣",
    shortBio: "明朝抗倭及平定西南邊境悍將，年近七旬主動請纓援朝。於露梁海戰率巨艦先登直衝日軍主力，奮戰手格數十人，戰船中火壯烈殉國。",
    historicalSignificance: "老當益壯氣吞山河，中韓兩國共同建廟立碑世世銘念之名將。",
    abilities: { strategy: 84, commanding: 92, politics: 70, intellect: 78, courage: 99, charisma: 90 }
  },
  {
    id: "fig_zhang_huangyan",
    name: "張煌言",
    courtesyName: "玄扈 (蒼水先生)",
    lifeSpan: "1620 - 1664",
    faction: "ming",
    role: "兵部尚書 / 東南抗清柱石",
    roleType: "general",
    avatar: "./images/figures/fig_zhang_huangyan.svg",
    importance: 5,
    hometown: "浙江寧波府鄞縣",
    shortBio: "南明抗清領袖兼傑出詩人。堅持浙東抗清近二十年，曾與鄭成功大舉北伐合圍南京，震動江南。被捕後寧死不降，臨刑慷慨賦詩《正氣歌》，與岳飛、于謙並稱「西湖三傑」。",
    historicalSignificance: "明末氣節與愛國詩歌最高象徵，中華民族錚錚鐵骨之代表。",
    abilities: { strategy: 90, commanding: 88, politics: 92, intellect: 95, courage: 99, charisma: 97 }
  },
  {
    id: "fig_yan_siqi",
    name: "顏思齊",
    courtesyName: "大漢",
    lifeSpan: "1586 - 1625",
    faction: "taiwan",
    role: "開台第一人 / 笨港開拓大寨主",
    roleType: "general",
    avatar: "./images/figures/fig_yan_siqi.svg",
    importance: 5,
    hometown: "福建漳州府海澄縣",
    shortBio: "明代海商開台拓墾先驅。率眾入台灣登陸笨港（今雲林北港、嘉義新港），築寨分定十寨，招徠閩南流民移民三千餘人拓荒墾殖，奠定漢人開闢台灣之基業。",
    historicalSignificance: "史稱「開台王」，台灣有組織拓墾農墾文明實質奠基者。",
    abilities: { strategy: 86, commanding: 90, politics: 82, intellect: 84, courage: 93, charisma: 92 }
  },
  {
    id: "fig_shen_yourong",
    name: "沈有容",
    courtesyName: "士弘",
    lifeSpan: "1557 - 1628",
    faction: "ming",
    role: "福建都司副總兵 / 澎湖諭退紅毛番",
    roleType: "general",
    avatar: "./images/figures/fig_shen_yourong.svg",
    importance: 4,
    hometown: "南直隸徽州府宣城縣",
    shortBio: "明代抗倭水師名將。1604年荷蘭提督韋麻郎佔領澎湖，沈有容單舟渡海直闖荷蘭艦隊宣明國威，折服韋麻郎不血刃退出澎湖，立碑「沈有容諭退紅毛番韋麻郎等」，為台灣歷史最古老碑碣。",
    historicalSignificance: "台灣澎湖早期海權主權維護者，留下台澎現存最早之歷史石碑原蹟。",
    abilities: { strategy: 88, commanding: 90, politics: 88, intellect: 85, courage: 97, charisma: 92 }
  },
  {
    id: "fig_he_bin",
    name: "何斌",
    courtesyName: "廷斌",
    lifeSpan: "1610 - 1675",
    faction: "taiwan",
    role: "荷蘭東印度公司通事 / 助鄭收台策士",
    roleType: "scholar",
    avatar: "./images/figures/fig_he_bin.svg",
    importance: 4,
    hometown: "福建泉州府南安縣",
    shortBio: "原為荷蘭大員通事，精通荷語與海情地理。暗中繪製台灣鹿耳門水道與熱蘭遮城潮汐水文圖，親赴廈門面呈鄭成功，力陳「台灣沃野千里為霸王之資」，為鄭氏指引登陸收復台灣奇兵。",
    historicalSignificance: "鄭成功收復台灣的關鍵地緣情報軍師，扭轉台灣歷史走向之奇士。",
    abilities: { strategy: 92, commanding: 65, politics: 84, intellect: 94, courage: 88, charisma: 86 }
  },
  {
    id: "fig_yelv_chucai",
    name: "耶律楚材",
    courtesyName: "晉卿 (湛然居士)",
    lifeSpan: "1190 - 1244",
    faction: "yuan",
    role: "中書令 / 蒙古帝國文治奠基人",
    roleType: "minister",
    avatar: "./images/figures/fig_yelv_chucai.svg",
    importance: 5,
    hometown: "契丹皇族後裔 / 燕京",
    shortBio: "成吉思汗與窩闊台汗首席謀臣。力阻蒙古貴族「盡屠漢人變農田為牧場」之暴虐主張，建立賦稅、科舉、法制與官學，保護中原數百萬百姓性命與漢文化道統不墜。",
    historicalSignificance: "「興文教、定賦稅、禁屠殺」，挽救中原文明火種於蒙古馬蹄之下的曠世名相。",
    abilities: { strategy: 94, commanding: 70, politics: 99, intellect: 98, courage: 94, charisma: 96 }
  },
  {
    id: "fig_tuotuo",
    name: "脫脫",
    courtesyName: "馬哈謀",
    lifeSpan: "1314 - 1355",
    faction: "yuan",
    role: "中書右丞相 / 元末救時宰相",
    roleType: "minister",
    avatar: "./images/figures/fig_tuotuo.svg",
    importance: 5,
    hometown: "蒙古蔑兒乞部",
    shortBio: "元順帝時右丞相，主持修撰《宋史》、《遼史》、《金史》三史大典。元末農民起義爆發，親率百萬大軍圍高郵圍剿張士誠，勝利在望之際遭讒言奪職流放害死，元朝氣數自此盡喪。",
    historicalSignificance: "「脫脫被貶，元亡決矣」，元代最後之軍政支柱，三史總裁官之文治巨勛。",
    abilities: { strategy: 91, commanding: 92, politics: 95, intellect: 94, courage: 88, charisma: 92 }
  }
];

// ==========================================
// 2. Qing Dynasty Additional Figures (25 figures)
// ==========================================
const QING_DYNASTY_EXPANSION = [
  {
    id: "fig_pu_songling",
    name: "蒲松齡",
    courtesyName: "留仙 (柳泉居士)",
    lifeSpan: "1640 - 1715",
    faction: "qing",
    role: "志怪小說之王 / 聊齋先生",
    roleType: "scholar",
    avatar: "./images/figures/fig_pu_songling.svg",
    importance: 5,
    hometown: "山東濟南府淄川縣",
    shortBio: "一生科場蹭蹬，設館採風，採集民間傳奇神怪狐鬼，寫就文言短篇小說巔峰巨作《聊齋誌異》。郭沫若評：「寫鬼寫妖高人一等，刺貪刺虐入木三分。」",
    historicalSignificance: "中國古典文言志怪諷世小說之集大成泰斗。",
    abilities: { strategy: 60, commanding: 40, politics: 65, intellect: 97, courage: 80, charisma: 94 }
  },
  {
    id: "fig_wu_jingzi",
    name: "吳敬梓",
    courtesyName: "敏軒",
    lifeSpan: "1701 - 1754",
    faction: "qing",
    role: "諷刺長篇小說鼻祖 / 文學巨匠",
    roleType: "scholar",
    avatar: "./images/figures/fig_wu_jingzi.svg",
    importance: 5,
    hometown: "安徽安慶府全椒縣",
    shortBio: "出身官宦世家，不慕榮利，痛感八股取士扭曲士子靈魂，耗十餘載撰成章回諷刺小說《儒林外史》，塑造范進中舉、嚴監生等經典諷刺形象。",
    historicalSignificance: "中國古典諷刺文學的第一高峰，魯迅盛讚其「如見其心，如聞其語」。",
    abilities: { strategy: 65, commanding: 42, politics: 68, intellect: 96, courage: 85, charisma: 90 }
  },
  {
    id: "fig_gong_zizhen",
    name: "龔自珍",
    courtesyName: "璱人 (定庵)",
    lifeSpan: "1792 - 1841",
    faction: "qing",
    role: "晚清思想啟蒙先聲 / 詩人",
    roleType: "scholar",
    avatar: "./images/figures/fig_gong_zizhen.svg",
    importance: 4,
    hometown: "浙江杭州府仁和縣",
    shortBio: "今文經學今世致用論大師，敏銳預見晚清社會危機，提倡更法改革。「我勸天公重抖擻，不拘一格降人才」成為衝破封建思想禁錮之時代吶喊。",
    historicalSignificance: "晚清思想解放先驅，近代改良主義思想之第一聲春雷。",
    abilities: { strategy: 82, commanding: 50, politics: 84, intellect: 97, courage: 92, charisma: 93 }
  },
  {
    id: "fig_wei_yuan",
    name: "魏源",
    courtesyName: "默深",
    lifeSpan: "1794 - 1857",
    faction: "qing",
    role: "睜眼看世界宗師 / 《海國圖志》作者",
    roleType: "scholar",
    avatar: "./images/figures/fig_wei_yuan.svg",
    importance: 5,
    hometown: "湖南寶慶府邵陽縣",
    shortBio: "晚年受林則徐所託編撰《海國圖志》百卷，系統介紹世界各國地理、歷史、兵制與科技，率先提出「師夷長技以制夷」之曠世戰略方針，深深啟發洋務運動與日本明治維新。",
    historicalSignificance: "近代中國走向世界之啟蒙宗師，推動亞洲近代化思維之重要文獻源頭。",
    abilities: { strategy: 92, commanding: 65, politics: 88, intellect: 98, courage: 90, charisma: 93 }
  },
  {
    id: "fig_yung_wing",
    name: "容閎",
    courtesyName: "純甫",
    lifeSpan: "1828 - 1912",
    faction: "science",
    role: "中國留學教育之父 / 耶魯首位華人畢業生",
    roleType: "scholar",
    avatar: "./images/figures/fig_yung_wing.svg",
    importance: 5,
    hometown: "廣東香山縣南屏鄉",
    shortBio: "近代中國首位赴美留學並畢業於耶魯大學之學者。力促曾國藩、李鴻章推動「幼童赴美留學計畫」，培養出詹天佑、唐紹儀等大批近代工程外交棟樑。",
    historicalSignificance: "開創中國近現代留學教育新紀元，洋務引進西方工程體系的關鍵導師。",
    abilities: { strategy: 88, commanding: 60, politics: 86, intellect: 96, courage: 92, charisma: 94 }
  },
  {
    id: "fig_zhan_tianyou",
    name: "詹天佑",
    courtesyName: "眷誠",
    lifeSpan: "1861 - 1919",
    faction: "science",
    role: "中國鐵路之父 / 京張鐵路總工程師",
    roleType: "scholar",
    avatar: "./images/figures/fig_zhan_tianyou.svg",
    importance: 5,
    hometown: "廣東南海縣",
    shortBio: "首批留美幼童之一，耶魯大學土木工程系畢業。在列強譏諷下主持修建中國第一條自主設計施工之京張鐵路，巧設「人」字形折返線攻克八達嶺天險，震驚世界。",
    historicalSignificance: "中國近代工程技術自立自強之民族英雄，近代鐵路事業之宗師。",
    abilities: { strategy: 86, commanding: 80, politics: 80, intellect: 98, courage: 95, charisma: 93 }
  },
  {
    id: "fig_xu_shou",
    name: "徐壽",
    courtesyName: "雪村",
    lifeSpan: "1818 - 1884",
    faction: "science",
    role: "中國近代化學啟蒙之父",
    roleType: "scholar",
    avatar: "./images/figures/fig_xu_shou.svg",
    importance: 4,
    hometown: "江蘇無錫縣",
    shortBio: "中國近代科學巨匠。與華蘅芳合製中國第一艘自主建造之蒸汽輪船「黃鵠號」，參與創辦江南製造總局翻譯館，創造氫、氧、氮、鈣、鎂等化學元素中文定名並沿用至今。",
    historicalSignificance: "奠定中文化學科學譯名命名法則，中國近代化學與機械製造開山導師。",
    abilities: { strategy: 80, commanding: 55, politics: 72, intellect: 99, courage: 85, charisma: 88 }
  },
  {
    id: "fig_hua_hengfang",
    name: "華蘅芳",
    courtesyName: "若汀",
    lifeSpan: "1833 - 1902",
    faction: "science",
    role: "近代數學家 / 蒸汽機船先鋒工程師",
    roleType: "scholar",
    avatar: "./images/figures/fig_hua_hengfang.svg",
    importance: 4,
    hometown: "江蘇常州府無錫縣",
    shortBio: "晚清著名數學家與科技翻譯家。與徐壽精確測算製造蒸汽機發動機，譯有《代數學》、《微積溯源》、《三角數理》等西方科學名著，推動現代高等數學在華扎根。",
    historicalSignificance: "中國近代微積分與代數學引進推廣先驅。",
    abilities: { strategy: 78, commanding: 52, politics: 70, intellect: 98, courage: 82, charisma: 86 }
  },
  {
    id: "fig_zhu_yigui",
    name: "朱一貴",
    courtesyName: "祖",
    lifeSpan: "1689 - 1721",
    faction: "taiwan",
    role: "中興王 / 鴨母王起義領袖",
    roleType: "general",
    avatar: "./images/figures/fig_zhu_yigui.svg",
    importance: 4,
    hometown: "福建漳州府長泰縣 (居台灣鳳山鴨母寮)",
    shortBio: "居台灣以養鴨為業，能指揮鴨群陣容，人稱「鴨母王」。不滿清吏苛政起兵抗清，攻下台灣府城，建國號「大明」，年號「永和」，為清代台灣首次全島性大規模民變。",
    historicalSignificance: "清代台灣漢民反官逼民反之首開起義領袖，深深影響後續民間社會結構。",
    abilities: { strategy: 75, commanding: 80, politics: 72, intellect: 74, courage: 92, charisma: 88 }
  },
  {
    id: "fig_lin_shuangwen",
    name: "林爽文",
    courtesyName: "文",
    lifeSpan: "1756 - 1788",
    faction: "taiwan",
    role: "天地會北路大元帥 / 盟主",
    roleType: "general",
    avatar: "./images/figures/fig_lin_shuangwen.svg",
    importance: 5,
    hometown: "福建漳州府平和縣 (居台灣大里杙)",
    shortBio: "台灣天地會領袖。1786年因清廷查禁天地會而起事，數月內席捲全台攻佔淡水彰化諸城，封號「盟主大元帥」，年號「順天」。清廷命陝甘總督福康安率滿漢精銳萬人始告平定。",
    historicalSignificance: "清代台灣最大規模天地會武裝起義，名列乾隆「十全武功」之一。",
    abilities: { strategy: 82, commanding: 88, politics: 75, intellect: 76, courage: 95, charisma: 92 }
  },
  {
    id: "fig_guo_huaiyi",
    name: "郭懷一",
    courtesyName: "五官",
    lifeSpan: "1603 - 1652",
    faction: "taiwan",
    role: "引領抗荷起義義首",
    roleType: "general",
    avatar: "./images/figures/fig_guo_huaiyi.svg",
    importance: 4,
    hometown: "福建泉州同安縣 (居台灣油車行)",
    shortBio: "荷治時期台灣漢人開墾首領。因荷蘭殖民當局苛斂人頭稅且殘暴壓榨，秘密聯絡四千餘漢民持竹竿鐮刀起事圍攻普羅民遮城，終因遭告密敵寡不敵壯烈犧牲。",
    historicalSignificance: "台灣漢民反抗西方殖民主義強權之第一場波瀾壯闊民族起義先驅。",
    abilities: { strategy: 76, commanding: 80, politics: 74, intellect: 78, courage: 96, charisma: 90 }
  },
  {
    id: "fig_shen_baozhen",
    name: "沈葆楨",
    courtesyName: "幼丹",
    lifeSpan: "1820 - 1879",
    faction: "taiwan",
    role: "欽差辦理台灣等處海防大臣 / 兩江總督",
    roleType: "minister",
    avatar: "./images/figures/fig_shen_baozhen.svg",
    importance: 5,
    hometown: "福建福州府侯官縣",
    shortBio: "林則徐女婿。牡丹社事件後受命巡撫台灣海防，果斷修建安平二鯤鯓砲台（億載金城），開通北中南三條後山橫斷道路「開山撫番」，廢止內地渡台禁令，奠定台灣近代化樞紐。",
    historicalSignificance: "將台灣推向全面近代化防禦與後山交通開闢之關鍵大臣。",
    abilities: { strategy: 92, commanding: 85, politics: 95, intellect: 94, courage: 90, charisma: 93 }
  },
  {
    id: "fig_ding_richang",
    name: "丁日昌",
    courtesyName: "禹生",
    lifeSpan: "1823 - 1882",
    faction: "taiwan",
    role: "福建巡撫 / 台灣近代實業拓荒者",
    roleType: "minister",
    avatar: "./images/figures/fig_ding_richang.svg",
    importance: 4,
    hometown: "廣東海陽縣 (今豐順)",
    shortBio: "洋務派重臣，主政台灣期間極力發展實業，開採基隆八斗子煤礦（引入現代蒸汽鑽井機），鋪設台灣第一條電報線（安平至旗後），建立近代海防武裝。",
    historicalSignificance: "台灣現代礦業、通訊電報與現代工業技術之第一引進者。",
    abilities: { strategy: 88, commanding: 75, politics: 92, intellect: 94, courage: 85, charisma: 88 }
  },
  {
    id: "fig_tang_jingsong",
    name: "唐景崧",
    courtesyName: "維卿",
    lifeSpan: "1841 - 1903",
    faction: "taiwan",
    role: "台灣民主國大總統 / 台灣巡撫",
    roleType: "monarch",
    avatar: "./images/figures/fig_tang_jingsong.svg",
    importance: 4,
    hometown: "廣西桂林府灌陽縣",
    shortBio: "曾於中法戰爭在越南聯絡黑旗軍立奇功。乙未割台之際，軍民擁戴其就任「台灣民主國」大總統，年號「永清」，發表獨立宣言誓抗日軍，日軍登陸基隆後內渡廈門。",
    historicalSignificance: "亞洲第一個共和國政權「台灣民主國」大總統，乙未抗日守土核心人物。",
    abilities: { strategy: 82, commanding: 72, politics: 84, intellect: 88, courage: 72, charisma: 82 }
  },
  {
    id: "fig_qiu_fengjia",
    name: "丘逢甲",
    courtesyName: "仙根 (倉海居士)",
    lifeSpan: "1864 - 1912",
    faction: "taiwan",
    role: "台灣民主國副總統兼義勇軍統領 / 愛國詩人",
    roleType: "scholar",
    avatar: "./images/figures/fig_qiu_fengjia.svg",
    importance: 5,
    hometown: "台灣苗栗縣銅鑼灣",
    shortBio: "台灣著名進士與愛國抗日志士。乙未割台時涕泣血書「拒割台灣」，倡建台灣民主國任義勇軍統領。戰敗內渡後寫下「宰相有權能割地，孤臣無力可回天」之千古悲歌。",
    historicalSignificance: "台灣愛國文學泰斗，台灣同胞抗日救亡運動的傑出詩人與領袖。",
    abilities: { strategy: 80, commanding: 75, politics: 85, intellect: 95, courage: 92, charisma: 94 }
  },
  {
    id: "fig_wu_sha",
    name: "吳沙",
    courtesyName: "布衣",
    lifeSpan: "1731 - 1798",
    faction: "taiwan",
    role: "開蘭第一人 / 噶瑪蘭拓墾宗師",
    roleType: "scholar",
    avatar: "./images/figures/fig_wu_sha.svg",
    importance: 4,
    hometown: "福建漳州府漳浦縣 (墾於台灣宜蘭)",
    shortBio: "乾隆晚期率漳泉粵三籍移民千餘人翻山越嶺拓墾蛤仔難（宜蘭平原），建頭城，以草藥替原住民醫治天花贏得信任，奠定蘭陽平原農耕水利繁榮之根基。",
    historicalSignificance: "尊為「開蘭始祖」，宜蘭盆地漢人拓荒融合歷史的至高先驅。",
    abilities: { strategy: 82, commanding: 80, politics: 86, intellect: 82, courage: 92, charisma: 90 }
  },
  {
    id: "fig_mona_rudao",
    name: "莫那·魯道",
    courtesyName: "達多·莫那之父",
    lifeSpan: "1880 - 1930",
    faction: "taiwan",
    role: "賽德克族馬赫坡社頭目 / 霧社事件起義英雄",
    roleType: "general",
    avatar: "./images/figures/fig_mona_rudao.svg",
    importance: 5,
    hometown: "台灣南投仁愛鄉霧社馬赫坡部落",
    shortBio: "台灣原住民族賽德克族馬赫坡社領袖。因長期不堪日本殖民統治殘酷壓迫與剝削，於1930年發動震撼世界的「霧社事件」浴血反抗，彈盡糧絕後自縊於斷崖巨木之下，寧死不屈。",
    historicalSignificance: "台灣原住民反抗外來殖民殘酷壓迫的至高民族英雄，彰顯不屈不撓之獵人尊嚴。",
    abilities: { strategy: 86, commanding: 92, politics: 80, intellect: 80, courage: 100, charisma: 98 }
  },
  {
    id: "fig_lin_juemin",
    name: "林覺民",
    courtesyName: "意洞",
    lifeSpan: "1887 - 1911",
    faction: "republic",
    role: "黃花崗七十二烈士 / 辛亥先烈",
    roleType: "scholar",
    avatar: "./images/figures/fig_lin_juemin.svg",
    importance: 5,
    hometown: "福建福州府閩縣",
    shortBio: "同盟會核心志士，留學日本慶應大學。1911年參加廣州黃花崗起義，臨行前寫下情辭萬丈之《與妻訣別書》：「吾充吾愛汝之心，助天下人愛其所愛」，受傷被俘英勇就義。",
    historicalSignificance: "辛亥革命最純粹崇高之青年志士，《與妻訣別書》為中華民族至情至性經典之作。",
    abilities: { strategy: 78, commanding: 70, politics: 82, intellect: 95, courage: 99, charisma: 96 }
  },
  {
    id: "fig_xu_xilin",
    name: "徐錫麟",
    courtesyName: "伯蓀",
    lifeSpan: "1873 - 1907",
    faction: "republic",
    role: "光復會領袖 / 安慶起義烈士",
    roleType: "general",
    avatar: "./images/figures/fig_xu_xilin.svg",
    importance: 4,
    hometown: "浙江紹興府山陰縣",
    shortBio: "光復會重要首領，創辦紹興大通學堂。潛伏任安徽巡警處會辦，1907年安慶巡警學堂畢業典禮上槍殺巡撫恩銘發動起義，孤軍奮戰被俘，剖心殉國神色自若。",
    historicalSignificance: "為推翻滿清專制拋頭顱灑熱血，震動清廷中樞神經之革命先驅。",
    abilities: { strategy: 82, commanding: 80, politics: 78, intellect: 90, courage: 100, charisma: 92 }
  },
  {
    id: "fig_zou_rong",
    name: "鄒容",
    courtesyName: "蔚丹",
    lifeSpan: "1885 - 1905",
    faction: "republic",
    role: "革命軍馬前卒 / 《革命軍》作者",
    roleType: "scholar",
    avatar: "./images/figures/fig_zou_rong.svg",
    importance: 5,
    hometown: "四川重慶府巴縣",
    shortBio: "留日青年革命家。18歲時以澎湃激昂筆調撰寫《革命軍》一書，大聲疾呼民主共和，發行百萬餘冊。引發蘇報案後自首入獄，年僅20歲病逝獄中。",
    historicalSignificance: "辛亥革命思想傳播最烈之啟蒙巨著作者，孫中山追贈大將軍銜。",
    abilities: { strategy: 75, commanding: 55, politics: 88, intellect: 95, courage: 98, charisma: 96 }
  },
  {
    id: "fig_zhang_taiyan",
    name: "章太炎",
    courtesyName: "枚叔 (太炎)",
    lifeSpan: "1869 - 1936",
    faction: "republic",
    role: "國學大師 / 革命宣傳宗師",
    roleType: "scholar",
    avatar: "./images/figures/fig_zhang_taiyan.svg",
    importance: 5,
    hometown: "浙江杭州府餘杭縣",
    shortBio: "近代國學泰斗兼革命思想大師。主編同盟會機關報《民報》，以雄健筆鋒痛批康梁保皇派，倡言驅除韃虜建立共和；國學上朴學小學登峰造極，魯迅弟子之師承。",
    historicalSignificance: "辛亥革命思想輿論旗手，現代國學考據訓詁領域泰山北斗。",
    abilities: { strategy: 86, commanding: 50, politics: 88, intellect: 100, courage: 96, charisma: 95 }
  },
  {
    id: "fig_lu_haodong",
    name: "陸皓東",
    courtesyName: "中和",
    lifeSpan: "1868 - 1895",
    faction: "republic",
    role: "青天白日旗設計者 / 共和第一烈士",
    roleType: "scholar",
    avatar: "./images/figures/fig_lu_haodong.svg",
    importance: 4,
    hometown: "廣東香山縣翠亨村",
    shortBio: "孫中山自幼同鄉摯友，興中會首批核心盟員。親手設計青天白日旗。1895年廣州起義失敗，為銷毀革命同志名冊冒險返回機關，不幸被捕英勇就義，孫中山稱其為「中國有史以來為共和革命犧牲之第一人」。",
    historicalSignificance: "青天白日旗創始設計者，近代共和革命犧牲烈士之第一人。",
    abilities: { strategy: 80, commanding: 65, politics: 80, intellect: 92, courage: 99, charisma: 91 }
  },
  {
    id: "fig_cai_e",
    name: "蔡鍔",
    courtesyName: "松坡",
    lifeSpan: "1882 - 1916",
    faction: "republic",
    role: "護國軍總司令 / 再造共和元勳",
    roleType: "general",
    avatar: "./images/figures/fig_cai_e.svg",
    importance: 5,
    hometown: "湖南寶慶府邵陽縣",
    shortBio: "日本陸軍士官學校畢業「士官三傑」之一。辛亥革命領導昆明重九起義。1915年袁世凱稱帝復辟，蔡鍔智奔雲南起義組建護國軍，抱病出川擊潰北洋軍主力，迫使袁世凱取消帝制捍衛共和。",
    historicalSignificance: "捍衛辛亥共和果實的「再造共和之父」，中華民國國葬第一人。",
    abilities: { strategy: 95, commanding: 98, politics: 88, intellect: 94, courage: 98, charisma: 97 }
  },
  {
    id: "fig_nian_gengyao",
    name: "年羹堯",
    courtesyName: "亮工 (雙峰)",
    lifeSpan: "1679 - 1726",
    faction: "qing",
    role: "撫遠大將軍 / 西北拓疆名將",
    roleType: "general",
    avatar: "./images/figures/fig_nian_gengyao.svg",
    importance: 4,
    hometown: "漢軍鑲黃旗 (原籍安徽懷遠)",
    shortBio: "康熙、雍正兩朝重臣。出兵西藏驅逐準噶爾，平定青海羅卜藏丹津叛亂，拓地數千里，受封一等公。後因自恃功高震主、擅權驕橫，遭雍正削職賜自盡。",
    historicalSignificance: "康雍乾盛世大西北邊疆防務開拓者，清代名將功高震主之代表人物。",
    abilities: { strategy: 92, commanding: 96, politics: 82, intellect: 88, courage: 95, charisma: 88 }
  },
  {
    id: "fig_ji_xiaolan",
    name: "紀曉嵐",
    courtesyName: "曉嵐 (春帆)",
    lifeSpan: "1724 - 1805",
    faction: "qing",
    role: "四庫全書總纂官 / 協辦大學士",
    roleType: "scholar",
    avatar: "./images/figures/fig_ji_xiaolan.svg",
    importance: 5,
    hometown: "直隸河間府獻縣",
    shortBio: "清代文壇宗師，乾隆朝掌纂《四庫全書》歷十餘載，收錄經史子集三千餘種，著《閱微草堂筆記》評述世態人心。才思敏捷，詩文詼諧，學貫古今。",
    historicalSignificance: "主編古代世界最大叢書《四庫全書》的文化泰斗，清代考據筆記文學大師。",
    abilities: { strategy: 75, commanding: 45, politics: 88, intellect: 99, courage: 82, charisma: 94 }
  }
];

// Execute update on Yuan-Ming
const ymData = require(yuanMingPath);
const existingYmIds = new Set(ymData.YUAN_MING_FIGURES.map(f => f.id));
let addedYm = 0;
YUAN_MING_EXPANSION.forEach(f => {
  if (!existingYmIds.has(f.id)) {
    ymData.YUAN_MING_FIGURES.push(f);
    existingYmIds.add(f.id);
    addedYm++;
  }
  const svgFile = path.resolve(imagesDir, `${f.id}.svg`);
  createSvgSeal(f.name, f.faction, svgFile);
});

fs.writeFileSync(yuanMingPath, 'export const YUAN_MING_FIGURES = ' + JSON.stringify(ymData.YUAN_MING_FIGURES, null, 2) + ';\n', 'utf8');
console.log(`[YUAN-MING] Added ${addedYm} figures. Total now: ${ymData.YUAN_MING_FIGURES.length}`);

// Execute update on Qing
const qingData = require(qingPath);
const existingQingIds = new Set(qingData.QING_DYNASTY_FIGURES.map(f => f.id));
let addedQing = 0;
QING_DYNASTY_EXPANSION.forEach(f => {
  if (!existingQingIds.has(f.id)) {
    qingData.QING_DYNASTY_FIGURES.push(f);
    existingQingIds.add(f.id);
    addedQing++;
  }
  const svgFile = path.resolve(imagesDir, `${f.id}.svg`);
  createSvgSeal(f.name, f.faction, svgFile);
});

fs.writeFileSync(qingPath, 'export const QING_DYNASTY_FIGURES = ' + JSON.stringify(qingData.QING_DYNASTY_FIGURES, null, 2) + ';\n', 'utf8');
console.log(`[QING] Added ${addedQing} figures. Total now: ${qingData.QING_DYNASTY_FIGURES.length}`);

console.log('Finished expanding figures and generating SVG seals!');
