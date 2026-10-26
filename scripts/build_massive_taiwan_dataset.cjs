const fs = require('fs');
const path = require('path');
const { dedicatedFigures } = require('./expand_taiwan_history.cjs');
const { massiveFigures } = require('./expand_taiwan_history_massive.cjs');

const outputPath = path.join(__dirname, '..', 'src', 'data', 'taiwanLensData.js');

// Combine both dedicated figure arrays (20 + 21 = 41 dedicated figures)
const allDedicatedFigures = [...dedicatedFigures, ...massiveFigures];

// Read the complete 80 Events & 25 Battles schema
// Let's create an exhaustive dataset
const scriptContent = `// Taiwan Chronological Lens (臺灣四千年歷史縱貫專題視角資料集)
// Super-Expanded Dataset: 80 Iconic Events, 25 Historic Battles, and 85 Figures

export const TAIWAN_LENS_ERAS = [
  {
    id: "tw_prehistoric",
    name: "南島原鄉與早期記錄",
    dateRangeDisplay: "史前 — 西元 1624 年",
    shortEra: "遠古至大航海前夕",
    tagline: "大肚王國·澎湖設治",
    description: "長濱文化舊石器時代、大坌坑文化新石器時代南島語系擴散；中臺灣跨部落「大肚王國」跨族群邦聯；三國衛溫夷州、隋代朱寬流求訪察；1281年元世祖設澎湖巡檢司，為中央政府管轄澎臺之始。",
    keyEvents: [
      {
        id: "evt_tw_changbin_culture",
        year: -30000,
        yearDisplay: "約三萬年前 (舊石器時代)",
        title: "長濱文化八仙洞海蝕洞穴遺址",
        summary: "臺東長濱鄉八仙洞發現臺灣最古老之舊石器時代文化，證實數萬年前人類已在東臺灣繁衍生息。",
        detail: "中央研究院考古隊在臺東長濱八仙洞海蝕洞穴群發掘出打製石器、骨角器與火塘遺跡，經碳十四測定距今約兩萬至三萬年前，命名為「長濱文化」，為臺灣迄今所知最古老之人類史前文明起源。",
        locationNameAncient: "長濱八仙洞岩穴",
        locationNameModern: "臺東縣長濱鄉八仙洞遺址",
        coordinates: [121.49, 23.40],
        tags: ["長濱文化", "舊石器時代", "八仙洞", "史前文明"]
      },
      {
        id: "evt_tw_dabenkeng_culture",
        year: -3000,
        yearDisplay: "約西元前 3000 年前",
        title: "大坌坑文化與南島語系出臺灣說",
        summary: "新石器時代大坌坑文化揭開農耕與陶器文明，語言學與基因學證實臺灣為南島語族全球擴散母港。",
        detail: "距今五千年前大坌坑文化在八里、南科繁盛發展。族人掌握航海與根莖農業，語言學大師白樂思與現代基因學提出「南島語系出臺灣說（Out of Taiwan）」，證實臺灣原住民族為太平洋與印度洋近四億南島語族之祖源原鄉。",
        locationNameAncient: "大坌坑遺址 (觀音山麓)",
        locationNameModern: "新北市八里區大坌坑",
        coordinates: [121.41, 25.14],
        tags: ["大坌坑文化", "南島語系", "出臺灣說", "新石器時代"]
      },
      {
        id: "evt_tw_beinan_culture",
        year: -1000,
        yearDisplay: "約西元前 1000 年",
        title: "卑南文化與巨石石板棺聚落",
        summary: "臺東平原發展出東亞最大石板棺巨石文化與高度精緻臺灣玉（閃玉）器工藝貿易網絡。",
        detail: "卑南遺址出土數千座地下石板棺與巨型石柱，隨葬精美玉耳飾、玉玦與陶器。卑南族人採集花蓮豐田閃玉，打磨出兼具禮儀與威望之玉器，其貿易網絡遠達菲律賓與東南亞沿岸，展現高度發達之史前海洋工藝文明。",
        locationNameAncient: "卑南平原石柱聚落",
        locationNameModern: "臺東縣臺東市卑南遺址公園",
        coordinates: [121.12, 22.79],
        tags: ["卑南文化", "臺灣玉", "石板棺", "史前巨石"]
      },
      {
        id: "evt_tw_shisanhang_culture",
        year: 500,
        yearDisplay: "西元 500 — 1000 年",
        title: "十三行文化與史前煉鐵金屬工藝",
        summary: "北臺灣淡水河口十三行遺址展現煉鐵高爐、幾何印紋陶器及跨海琉璃珠貿易文明。",
        detail: "十三行文化代表臺灣史前金屬器時代之巔峰。族人利用本地褐鐵礦煉鐵，並出土漢代銅錢、西亞玻璃珠與瓷器，證明距今一千年前淡水河口之凱達格蘭先民已展開蓬勃之東亞跨海貿易。",
        locationNameAncient: "十三行聚落 (淡水河口)",
        locationNameModern: "新北市八里區十三行博物館",
        coordinates: [121.40, 25.16],
        tags: ["十三行文化", "金屬器時代", "煉鐵技術", "跨海貿易"]
      },
      {
        id: "evt_tw_weiwen_yizhou_230",
        year: 230,
        yearDisplay: "西元 230 年 (黃龍二年)",
        title: "三國東吳衛溫諸葛直浮海訪夷州",
        summary: "孫權派遣將軍衛溫、諸葛直率萬人甲士船隊遠航夷州，為正史首載官方遠洋探查臺灣之始。",
        detail: "三國吳大帝孫權為擴拓海外疆域與人口，命將軍衛溫、諸葛直統帥戰船船隊萬人自章安（浙江台州）啟航浮海求夷州（今臺灣）。船隊歷時經年探察，帶回數千島民。《三國志·吳書·孫權傳》與沈瑩《臨海水土志》對此留下人類信史對臺灣風土物產最早之詳盡記載。",
        locationNameAncient: "夷州海疆島峽",
        locationNameModern: "臺灣海峽沿海與北部海岸",
        coordinates: [121.74, 25.13],
        tags: ["三國東吳", "孫權", "衛溫", "夷州", "海疆探索"]
      },
      {
        id: "evt_tw_suidai_liuqiu_610",
        year: 610,
        yearDisplay: "西元 610 年 (大業六年)",
        title: "隋煬帝遣朱寬陳稜訪察流求國",
        summary: "隋代羽騎尉朱寬、虎賁郎將陳稜先後率水師跨海訪察流求國，深化中原與海島地緣往來。",
        detail: "隋煬帝大業年間，何蠻言海中有流求國，煬帝命羽騎尉朱寬入海訪求。大業六年虎賁郎將陳稜、朝請大夫張鎮周率東陽兵萬餘人自義安（廣東潮州）浮海航行月餘登陸流求。此兩次遠航為《隋書·流求傳》奠定珍貴歷史文獻紀錄。",
        locationNameAncient: "流求國海口",
        locationNameModern: "臺灣西南沿海海口",
        coordinates: [120.22, 23.02],
        tags: ["隋代", "流求國", "陳稜", "朱寬", "海路勘察"]
      },
      {
        id: "evt_tw_penghu_1281",
        year: 1281,
        yearDisplay: "西元 1281 年 (至元十八年)",
        title: "大元世祖設澎湖巡檢司",
        summary: "元朝於澎湖設巡檢司，隸屬福建行省泉州府同安縣，為中央政府管轄澎臺行政之始。",
        detail: "1281年元世祖忽必烈在澎湖設澎湖巡檢司，派文官駐防收稅巡緝海疆，管轄澎湖三十六島，揭開澎臺兩地納入官府正式行政編制序幕。",
        locationNameAncient: "澎湖巡檢司署 (媽宮)",
        locationNameModern: "澎湖縣馬公市",
        coordinates: [119.57, 23.57],
        tags: ["澎湖巡檢司", "大元行省", "海疆管理"]
      },
      {
        id: "evt_tw_daoyi_zhilue_1349",
        year: 1349,
        yearDisplay: "西元 1349 年 (至正九年)",
        title: "汪大淵《島夷志略》記載澎湖與琉球風土",
        summary: "元代航海家汪大淵兩度隨商船遠航西洋，歸國著書詳實記述澎湖巡檢司官制與臺灣風物。",
        detail: "南昌航海家汪大淵著《島夷志略》，其「澎湖」條載：地隸泉州晉江縣，至元間立巡檢司，戶各家自為活。其「琉球」條記載原住民族農耕、織布、煮海為鹽風尚，為研究宋元時期澎臺社會之重要文獻。",
        locationNameAncient: "澎湖島港與琉球山面",
        locationNameModern: "澎湖縣與西南海岸",
        coordinates: [119.58, 23.58],
        tags: ["島夷志略", "汪大淵", "澎湖巡檢司", "元代海運"]
      },
      {
        id: "evt_tw_ming_ban_penghu_1384",
        year: 1384,
        yearDisplay: "西元 1384 年 (洪武十七年)",
        title: "明太祖海禁與澎湖巡檢司移防",
        summary: "明太祖朱元璋實施嚴格海禁政策，廢澎湖巡檢司遷民回漳泉，海防形勢轉向消極。",
        detail: "明初因倭寇猖獗，朱元璋採「寸板不許下海」之閉關海禁政策，洪武十七年廢澎湖巡檢司，將島民全數內遷漳泉安置。此舉反使澎湖與臺灣西南沿岸成為林道乾、顏思齊等海商與海盜活動之自由樂園。",
        locationNameAncient: "澎湖媽宮巡防寨",
        locationNameModern: "澎湖縣馬公市水仙宮一帶",
        coordinates: [119.57, 23.56],
        tags: ["明初海禁", "朱元璋", "澎湖遷民", "海商興起"]
      },
      {
        id: "evt_tw_dadu_kingdom",
        year: 1500,
        yearDisplay: "約西元 1500 年前",
        title: "大肚王國 (跨部落南島邦聯體制)",
        summary: "中臺灣跨部族原住民族邦聯大肚王國，由拍瀑拉族白晝之王（Kamachat）統御十八社。",
        detail: "在荷蘭人抵達臺灣前，中臺灣大甲溪以南至大肚溪流域已建立跨部落邦聯「大肚王國」，由巴布拉族領袖世襲稱為Quataong（白晝之王）。其版圖涵蓋臺中、彰化、南投各社，農牧互市，自給自足維持高度獨立自主，並於1644年重挫荷蘭遠征軍。",
        locationNameAncient: "大肚社 (中臺灣)",
        locationNameModern: "臺中市大肚區大肚國小遺址",
        coordinates: [120.54, 24.16],
        tags: ["大肚王國", "南島原鄉", "部落邦聯", "白晝之王"]
      }
    ],
    highlightFigures: ["fig_tw_kamachat", "fig_sun_quan", "fig_wei_wen", "fig_sui_yangdi", "fig_chen_leng"]
  },
  {
    id: "tw_dutch_spanish",
    name: "大航海時代與荷西競逐",
    dateRangeDisplay: "1624 — 1662 年",
    shortEra: "西元 1624 — 1662 年",
    tagline: "熱蘭遮城·笨港拓墾",
    description: "荷蘭東印度公司（VOC）築安平熱蘭遮城、普羅民遮城推行鹿皮轉口貿易；西班牙築基隆聖多明哥城與淡水聖救主城；顏思齊、鄭芝龍拓墾笨港引漢人渡臺；郭懷一農民起義。",
    keyEvents: [
      {
        id: "evt_tw_yansiqi_bengang_1621",
        year: 1621,
        yearDisplay: "西元 1621 年 (天啟元年)",
        title: "顏思齊鄭芝龍開闢笨港十寨",
        summary: "顏思齊引率閩南拓民三千餘人登陸笨港開墾十寨，揭開漢人大規模渡臺拓荒史序幕。",
        detail: "顏思齊與鄭芝龍率十三艘巨船自日本平戶轉進笨港（今雲林北港與嘉義新港），建立「主寨」、「後寨」等十座拓墾據點。招募漳州、泉州貧農渡海來臺，分發耕牛農具拓荒水田，獲後世尊為「開臺王」。",
        locationNameAncient: "笨港大寨 (十寨總督)",
        locationNameModern: "雲林縣北港鎮與嘉義縣新港鄉",
        coordinates: [120.30, 23.57],
        tags: ["顏思齊", "鄭芝龍", "開臺第一庄", "笨港"]
      },
      {
        id: "evt_tw_voc_zeelandia",
        year: 1624,
        yearDisplay: "西元 1624 年 (天啟四年)",
        title: "荷蘭東印度公司進駐安平築熱蘭遮城",
        summary: "荷蘭人自澎湖轉進大員（今臺南安平），修築熱蘭遮城，臺灣正式進入世界貿易體系。",
        detail: "1624年荷蘭提督雷爾生自澎湖轉進大員沙洲，築熱蘭遮城（Fort Zeelandia）與普羅民遮城（赤崁樓）。荷蘭人引進黃牛、芒果、波羅蜜，以傳教士羅馬拼音創設「新港文書」，建立全島獵鹿出口鹿皮與甘蔗砂糖之轉口貿易大港。",
        locationNameAncient: "臺南大員熱蘭遮城",
        locationNameModern: "臺南市安平古堡",
        coordinates: [120.16, 23.00],
        tags: ["荷治時期", "熱蘭遮城", "大員", "安平"]
      },
      {
        id: "evt_tw_spanish_keelung_1626",
        year: 1626,
        yearDisplay: "西元 1626 年 (天啟六年)",
        title: "西班牙佔領雞籠淡水築聖多明哥城",
        summary: "西班牙菲律賓總督派遣遠征軍登陸三貂角，修築和平島聖救主城與淡水聖多明哥城。",
        detail: "西班牙為防禦荷蘭壟斷對日、對華航路，由伐爾得斯率艦隊自馬尼拉出航登陸三貂角，進駐雞籠灣和平島修築聖薩爾瓦多城，後進抵淡水築聖多明哥城（紅毛城前身），展開十六年天主教傳教與硫磺金礦貿易。",
        locationNameAncient: "雞籠社寮島聖救主城",
        locationNameModern: "基隆市中正區和平島與新北市淡水區紅毛城",
        coordinates: [121.76, 25.15],
        tags: ["西治時期", "聖多明哥城", "聖救主城", "和平島"]
      },
      {
        id: "evt_tw_hamada_yahei_1628",
        year: 1628,
        yearDisplay: "西元 1628 年 (寬永五年)",
        title: "濱田彌兵衛事件 (日荷大員通商衝突)",
        summary: "日本朱印船船長濱田彌兵衛因荷蘭徵收關稅衝突，在大員挾持荷蘭長官奴易茲。",
        detail: "荷蘭東印度公司對進出大員之日本朱印商船課稅引發江戶幕府強烈不滿。船長濱田彌兵衛率勇士在熱蘭遮城內拔刀挾持長官彼得·奴易茲，雙方簽訂協議放行。事件導致日本一度扣押荷蘭在平戶商館與貨物。",
        locationNameAncient: "大員熱蘭遮城長官公署",
        locationNameModern: "臺南市安平古堡內城",
        coordinates: [120.16, 23.00],
        tags: ["濱田彌兵衛", "朱印船", "奴易茲", "荷日貿易衝突"]
      },
      {
        id: "evt_tw_liaoluo_bay_1633",
        year: 1633,
        yearDisplay: "西元 1633 年 (崇禎六年)",
        title: "料羅灣海戰 (鄭芝龍大破荷蘭東印度艦隊)",
        summary: "明朝水師副總兵鄭芝龍於金門料羅灣以火攻大破荷蘭提督普特曼斯艦隊，確立東南沿海霸權。",
        detail: "荷蘭東印度公司企圖以武力強行迫使明朝開海通商，派遣戰艦與海盜劉香合流劫掠福建。鄭芝龍統帥百餘艘火攻戰船於料羅灣順風奇襲，焚毀荷蘭旗艦與戰艦多艘，普特曼斯狼狽敗退大員，奠定鄭氏家族掌握東亞航運制海權基礎。",
        locationNameAncient: "福建金門料羅灣海面",
        locationNameModern: "金門縣金湖鎮料羅灣",
        coordinates: [118.42, 24.41],
        tags: ["料羅灣海戰", "鄭芝龍", "火攻", "海權角逐"]
      },
      {
        id: "evt_tw_landdag_1636",
        year: 1636,
        yearDisplay: "西元 1636 年 (崇禎九年)",
        title: "荷蘭召開全島地方會議 (Landdag秩序確立)",
        summary: "荷蘭駐臺長官普特曼斯在新港社召開首屆地方會議，確立長官頒賜權杖之朝貢體系。",
        detail: "在麻豆社事件平定後，荷蘭當局召集南部各平埔族長老召開全島「地方會議（Landdag）」。長官向歸順頭目頒賜象徵威信的「荷蘭東印度公司藤杖（權杖）」，規範各社互不攻伐、改信基督教並宣誓效忠，奠定荷蘭統治原住民社會之制度架構。",
        locationNameAncient: "臺南新港社禮堂",
        locationNameModern: "臺南市新市區",
        coordinates: [120.29, 23.08],
        tags: ["地方會議", "Landdag", "長官權杖", "平埔族秩序"]
      },
      {
        id: "evt_tw_sinkang_manuscripts_1636",
        year: 1636,
        yearDisplay: "西元 1636 年 (崇禎九年)",
        title: "新港文書與西拉雅羅馬拼音創制",
        summary: "荷蘭牧師尤羅伯以羅馬字母拼寫西拉雅平埔族語，創立全臺第一套本土拼音文字系統。",
        detail: "荷蘭傳教士於新港社開辦學校，以拉丁字母拼寫西拉雅族語翻譯聖經，族人廣泛運用於土地買賣契約、債務契據，即聞名於世之「新港文書」（番仔契）。此套拼音系統在民間流傳使用逾一百五十年，直到清嘉慶道光年間仍具法定效力。",
        locationNameAncient: "臺南新港社 (西拉雅大社)",
        locationNameModern: "臺南市新市區新港國小一帶",
        coordinates: [120.30, 23.08],
        tags: ["新港文書", "西拉雅族", "羅馬拼音", "平埔族文化"]
      },
      {
        id: "evt_tw_dutch_spanish_war_1642",
        year: 1642,
        yearDisplay: "西元 1642 年 (崇禎十五年)",
        title: "雞籠之戰 (荷蘭驅逐西班牙統一全島貿易)",
        summary: "荷蘭東印度公司派遣大艦隊北上圍攻基隆聖薩爾瓦多城，西班牙守軍投降退出臺灣。",
        detail: "1642年8月荷蘭駐臺長官特勞紐斯派遣哈勞塞中校率戰艦四艘、士兵數百人北攻雞籠。荷軍登陸佔領制高點砲轟聖薩爾瓦多城，西班牙守備隊苦戰開城降荷。西班牙結束在臺十六年統治全數撤回馬尼拉，荷蘭自此完全壟斷全島對外航貿。",
        locationNameAncient: "雞籠灣社寮港",
        locationNameModern: "基隆市和平島要塞遺址",
        coordinates: [121.76, 25.15],
        tags: ["雞籠之戰", "荷西爭霸", "大航海時代", "和平島"]
      },
      {
        id: "evt_tw_dadu_resistance_1644",
        year: 1644,
        yearDisplay: "西元 1644 年 (崇禎十七年)",
        title: "大肚王國抵抗荷蘭軍隊進犯大甲溪",
        summary: "白晝之王甘馬轄·阿達夫統御拍瀑拉族與巴布薩族聯軍，在大甲溪流域成功重創荷軍遠征隊。",
        detail: "為打通大員通往北部基隆、淡水之陸路交通，荷蘭派遣布恩中尉率軍進攻中臺灣。大肚王甘馬轄率部族戰士依託林莽伏擊，荷軍傷亡慘重無法突破大甲溪防線，最終被迫放棄武力征服改採簽約和解。",
        locationNameAncient: "大甲溪下游林莽",
        locationNameModern: "臺中市清水區與大甲區",
        coordinates: [120.54, 24.28],
        tags: ["大肚王國", "甘馬轄", "抗荷戰事", "大甲溪"]
      },
      {
        id: "evt_tw_guohuaiyi_1652",
        year: 1652,
        yearDisplay: "西元 1652 年 (順治九年)",
        title: "郭懷一農民起義抗荷血戰赤崁",
        summary: "臺灣漢人農民因苛捐雜稅發動大規模反荷抗爭，血戰普羅民遮城。",
        detail: "荷蘭東印度公司對臺灣漢人移民課徵沈重之人頭稅與重稅。佃農領袖郭懷一聯絡四千餘漢人農民在油車行（今臺南永康）揭竿起義，進攻赤崁樓。荷軍調集火槍隊與原住民聯軍殘酷鎮壓，郭懷一殉難，此事件促使荷軍築普羅民遮城強化控制。",
        locationNameAncient: "臺灣府赤崁普羅民遮城",
        locationNameModern: "臺南市中西區赤崁樓",
        coordinates: [120.20, 22.99],
        tags: ["郭懷一", "抗荷起義", "農民抗爭", "赤崁樓"]
      }
    ],
    highlightFigures: ["fig_yan_siqi", "fig_zheng_zhilong", "fig_guo_huaiyi", "fig_tw_coyett"]
  },
  {
    id: "tw_tungning",
    name: "明鄭東寧王朝",
    dateRangeDisplay: "1662 — 1683 年",
    shortEra: "西元 1662 — 1683 年",
    tagline: "開臺聖王·禮樂衣冠",
    description: "鄭成功親率數百戰船跨海圍攻熱蘭遮城九個月，驅逐荷蘭光復臺灣建立「東寧王國」；諮議參軍陳永華築孔廟辦科舉、屯田開荒、自鑄錢幣；歷三代二十三年至澎湖海戰施琅平台。",
    keyEvents: [
      {
        id: "evt_tw_koxinga_retrocession",
        year: 1662,
        yearDisplay: "西元 1662 年 (永曆十五年)",
        title: "鄭成功驅荷光復臺灣 (圍攻熱蘭遮城大捷)",
        summary: "鄭成功圍攻熱蘭遮城九個月迫荷督揆一簽約投降，建立東寧政權被尊為開臺聖王。",
        detail: "1661年4月延平王鄭成功率兩萬五千水師自金門料羅灣出師，登陸禾寮港奇襲普羅民遮城。經長達九個月圍城血戰與攻堅烏特勒支堡，荷蘭末代長官揆一於1662年2月正式簽署降書退出臺灣。鄭成功改赤崁為東都明京，設承天府與天興、萬年二縣，奠定漢文化制度根基。",
        locationNameAncient: "承天府 (赤崁安平)",
        locationNameModern: "臺南市安平區與中西區",
        coordinates: [120.16, 23.00],
        tags: ["開臺聖王", "鄭成功", "驅荷光復", "東寧王國"]
      },
      {
        id: "evt_tw_shen_guangwen_poetry_1662",
        year: 1662,
        yearDisplay: "西元 1662 年 (永曆十六年)",
        title: "沈光文開創東瀛詩社 (開臺先師文教奠基)",
        summary: "明末遺儒沈光文結廬善化傳授儒學，創立全臺首座詩社「東瀛詩社」，被尊為開臺先師。",
        detail: "明代太僕寺少卿沈光文因風漂流至臺，不仕清廷隱居目加溜灣社（今臺南善化）。沈光文開館授徒，以漢醫草藥醫治原漢同胞，並召集季麒光、韓又琦等文士創立臺灣第一個文人詩社「東瀛詩社」，開啟臺灣古典漢語文學四百年薪傳。",
        locationNameAncient: "承天府善化里 (目加溜灣社)",
        locationNameModern: "臺南市善化區沈光文紀念碑",
        coordinates: [120.30, 23.13],
        tags: ["沈光文", "東瀛詩社", "開臺先師", "善化"]
      },
      {
        id: "evt_tw_chen_yonghua_salt_tax",
        year: 1665,
        yearDisplay: "西元 1665 年 (永曆十九年)",
        title: "陳永華革新淋鹵曬鹽法與官兵屯田",
        summary: "引進鋪缸瓦曬鹽法開闢瀨口鹽田，推行軍屯制使兵農合一厚植東寧國力。",
        detail: "東寧初期食鹽仰賴煎煮苦澀不堪，陳永華引進先進「淋鹵曬鹽法」並開闢瀨口鹽田（今臺南鹽埕），產出雪白結晶精鹽，不僅供應全臺更外銷日本東南亞。同時在天興縣、萬年縣劃分左營、前鎮、後壁等軍屯，兵士寓兵於農，數年內糧穀滿倉。",
        locationNameAncient: "承天府萬年縣瀨口鹽埕",
        locationNameModern: "臺南市南區鹽埕與七股鹽田",
        coordinates: [120.18, 22.97],
        tags: ["陳永華", "鹽業改革", "七股鹽田", "軍屯制度"]
      },
      {
        id: "evt_tw_chen_yonghua_confucius",
        year: 1666,
        yearDisplay: "西元 1666 年 (永曆二十年)",
        title: "陳永華建全臺首學臺南孔廟",
        summary: "諮議參軍陳永華輔佐鄭經興學制禮，建立全臺第一座孔廟設立國子監太學。",
        detail: "陳永華被譽為「東寧宰相」。為培育經世致用人才，力勸鄭經於承天府興建全臺首座孔廟（全臺首學），推動科舉取士，設府學與八思學校。推行保甲制與軍屯制，改良淋鹵曬鹽法開創七股鹽田，使東寧臺灣民豐物阜文教大開。",
        locationNameAncient: "承天府寧南坊全臺首學",
        locationNameModern: "臺南市中西區孔廟",
        coordinates: [120.20, 22.99],
        tags: ["陳永華", "全臺首學", "臺南孔廟", "東寧宰相"]
      },
      {
        id: "evt_tw_zheng_jing_trade_treaty",
        year: 1672,
        yearDisplay: "西元 1672 年 (永曆二十六年)",
        title: "鄭經簽署《英鄭通商條約》",
        summary: "東寧王朝與英國東印度公司簽訂正式自由貿易協定，於安平設立英國商館。",
        detail: "延平王鄭經為打破清朝遷界禁海之經濟封鎖，主動與英國東印度公司代表簽署三十條友好通商條約。英商於大員設立商館，進口火藥、火繩槍、鉛塊與呢絨，出口臺灣蔗糖、鹿皮與絲綢，使東寧臺灣成為西太平洋自由海權貿易王國。",
        locationNameAncient: "安平商埠英國商館",
        locationNameModern: "臺南市安平區洋行遺址群",
        coordinates: [120.16, 22.99],
        tags: ["英鄭條約", "鄭經", "國際貿易", "安平商館"]
      },
      {
        id: "evt_tw_zheng_jing_sanfan_1674",
        year: 1674,
        yearDisplay: "西元 1674 年 (永曆二十八年)",
        title: "鄭經西征參與三藩之役出兵閩粵",
        summary: "響應吳三桂與耿精忠起事，鄭經率水師主力渡海反攻廈門、泉州、漳州與潮州。",
        detail: "清初三藩之亂爆發，耿精忠派使約鄭經會師抗清。鄭經親統萬餘大軍渡海進駐廈門，先後攻克海澄、泉州、漳州、同安等地，震動清廷南疆。後因鄭耿嫌隙與清軍反撲，東寧主力於1680年撤回臺灣。",
        locationNameAncient: "金門料羅灣至廈門港",
        locationNameModern: "金門與廈門海峽兩岸",
        coordinates: [118.32, 24.44],
        tags: ["三藩之役", "鄭經", "反清復明", "西征"]
      },
      {
        id: "evt_tw_chen_yonghua_death_1680",
        year: 1680,
        yearDisplay: "西元 1680 年 (永曆三十四年)",
        title: "陳永華退隱辭官與一代宰相病逝",
        summary: "馮錫範、劉國軒排擠陳永華，一代名相解甲退隱龍湖巖，同年病逝，東寧失去棟樑。",
        detail: "西征失利後，陳永華遭侍衛鎮馮錫範以退為進奪取兵權。陳永華以大局為重辭去勇衛職守，隱居赤山龍湖巖修道，同年七月鬱悒染疾而卒。鄭經痛哭失聲，士民如喪考妣，東寧朝局自此陷入權臣爭權。",
        locationNameAncient: "承天府赤山龍湖巖",
        locationNameModern: "臺南市六甲區龍湖巖",
        coordinates: [120.36, 23.23],
        tags: ["陳永華", "東寧政爭", "赤山龍湖巖", "一代名相"]
      },
      {
        id: "evt_tw_dongning_coup_1681",
        year: 1681,
        yearDisplay: "西元 1681 年 (永曆三十五年)",
        title: "東寧政變 (鄭克𡒉遇害與鄭克塽即位)",
        summary: "鄭經薨逝，馮錫範聯絡宗室發動東寧之變縊殺監國鄭克𡒉，擁立年僅十二歲之鄭克塽。",
        detail: "鄭經長子鄭克𡒉剛毅勇決、深得軍心民望，受陳永華悉心教導。鄭經病逝後，馮錫範與鄭聰誣其非鄭氏骨肉，發動兵變於北園別館殺害鄭克𡒉，改立其婿鄭克塽。政變導致東寧文武離心，為施琅平台埋下禍端。",
        locationNameAncient: "承天府北園別館 (今開元寺)",
        locationNameModern: "臺南市北區開元寺",
        coordinates: [120.22, 23.01],
        tags: ["東寧政變", "鄭克𡒉", "鄭克塽", "開元寺"]
      },
      {
        id: "evt_tw_shi_lang_penghu_1683",
        year: 1683,
        yearDisplay: "西元 1683 年 (康熙二十二年)",
        title: "施琅澎湖海戰大捷東寧請降",
        summary: "施琅率三百艘水師精銳順風奇襲澎湖大破劉國軒，鄭克塽奉表納降，東寧王朝落幕。",
        detail: "康熙帝命施琅為福建水師提督專征臺灣。1683年7月施琅藉西南季風順流突入澎湖八罩水域，實施五方分進合擊大破劉國軒水師主力。劉國軒乘快船逃回臺灣，鄭克塽君臣見大勢已去奉表納土稱臣，明鄭歷時二十三年之治結束。",
        locationNameAncient: "澎湖娘媽宮海面至大員港",
        locationNameModern: "澎湖縣馬公市與臺南市安平區",
        coordinates: [119.56, 23.56],
        tags: ["澎湖海戰", "施琅", "劉國軒", "鄭克塽納降"]
      },
      {
        id: "evt_tw_koxinga_spirit_legacy",
        year: 1683,
        yearDisplay: "西元 1683 年 (明鄭遺緒)",
        title: "開臺聖王精神傳承與延平郡王祠",
        summary: "鄭成功開拓之功深受全臺民眾代代崇敬，康熙帝亦題輓聯讚揚其忠烈，尊為民族英雄。",
        detail: "鄭成功雖反清，但其驅逐外侮、闢土安民之功德受後世無比敬重。康熙帝特頒御聯：「四鎮多二心，兩島屯師，敢向東南爭半壁；諸生作一隊，九死不悔，願隨孤臣延祚綿。」後清光緒年間欽差沈葆楨奏請追諡並建延平郡王祠官祀，成為臺灣共同尊奉之守護圖騰。",
        locationNameAncient: "臺灣府開山王廟 (延平郡王祠)",
        locationNameModern: "臺南市中西區延平郡王祠",
        coordinates: [120.21, 22.99],
        tags: ["開臺聖王", "延平郡王祠", "民族精神", "沈葆楨追諡"]
      }
    ],
    highlightFigures: ["fig_zheng_chenggong", "fig_chen_yonghua", "fig_tw_shen_guangwen", "fig_zheng_jing", "fig_liu_guoxuan"]
  },
  {
    id: "tw_qing_early",
    name: "清領前期與渡臺拓墾",
    dateRangeDisplay: "1683 — 1874 年",
    shortEra: "西元 1683 — 1874 年",
    tagline: "臺灣設府·一府二鹿三艋舺",
    description: "施琅平台設臺灣府隸屬福建省；頒布渡臺禁令與劃界遷民；朱一貴鴨母王起義、林爽文天地會起事；水利大興（八堡圳、瑠公圳、曹公圳），市鎮興起號稱「一府二鹿三艋舺」。",
    keyEvents: [
      {
        id: "evt_tw_shi_lang_1684",
        year: 1684,
        yearDisplay: "西元 1684 年 (康熙二十三年)",
        title: "大清設臺灣府編入版圖",
        summary: "施琅力陳《臺灣棄留疏》，康熙帝決策保留臺灣，設臺灣府三縣巡道管轄。",
        detail: "澎湖海戰後朝廷一度研議放棄臺灣遷民回大陸。福建水師提督施琅上《恭陳臺灣棄留疏》，力陳「臺灣乃江浙閩粵四省之左護，棄之必復為盜窟，南洋外洋之門戶」。康熙帝採納其議，設臺灣府（領臺灣、鳳山、諸羅三縣），派總兵水陸萬人駐守。",
        locationNameAncient: "福建省臺灣府",
        locationNameModern: "臺南市中西區",
        coordinates: [120.20, 23.00],
        tags: ["施琅", "臺灣府", "康熙設治", "納入版圖"]
      },
      {
        id: "evt_tw_dantai_bans_1684",
        year: 1684,
        yearDisplay: "西元 1684 年 (康熙二十三年)",
        title: "頒布渡臺禁令與土牛紅線界碑",
        summary: "清廷為防臺灣成為反清溫床，實施渡臺三禁嚴防攜眷，立石劃定漢番分界「土牛線」。",
        detail: "清廷規定渡臺需領照准許、嚴禁攜家帶眷、禁止粵東客民入臺。導致早期渡臺移民男女比例嚴重失衡，多單身羅漢腳，促成「有唐山公，無唐山媽」之與平埔女性通婚現象。同時沿山麓挑溝堆土立石劃定「土牛線」，嚴禁漢人越界拓墾原住民保留區。",
        locationNameAncient: "臺灣府南北路土牛界碑",
        locationNameModern: "臺中石岡與桃園楊梅土牛碑",
        coordinates: [120.78, 24.27],
        tags: ["渡臺禁令", "土牛線", "羅漢腳", "漢番分界"]
      },
      {
        id: "evt_tw_yu_yonghe_sulfur_1697",
        year: 1697,
        yearDisplay: "西元 1697 年 (康熙三十六年)",
        title: "郁永河採硫探險與著成《裨海紀遊》",
        summary: "郁永河自府城搭牛車一路向北穿越全島荒野，在北投大磺嘴採硫著成全臺第一散文名著。",
        detail: "福州火藥庫爆炸後，浙江文士郁永河自告奮勇來臺採硫。自臺南出發歷經兩月牛車跋涉抵達淡水河口北投，在毒瘴地熱中搭屋煮硫二十餘萬斤。所著《裨海紀遊》文字靈動，詳記臺灣西部平原山川、動植物與平埔族原始風俗，為臺灣文學史開山經典。",
        locationNameAncient: "淡水廳北投大磺嘴",
        locationNameModern: "臺北市北投區硫磺谷",
        coordinates: [121.52, 25.14],
        tags: ["郁永河", "裨海紀遊", "北投採硫", "古典散文"]
      },
      {
        id: "evt_tw_babao_canal_1719",
        year: 1719,
        yearDisplay: "西元 1719 年 (康熙五十八年)",
        title: "施世榜開闢八堡圳 (中臺灣水利豐饒奠基)",
        summary: "施世榜傾資開鑿八堡圳引濁水溪，奠定彰化平原數百年稻作米倉之基石。",
        detail: "墾首施世榜歷經十年艱辛，引濁水溪水修築八堡圳（長逾百里，灌溉彰化十三堡中之八堡）。林先生傳授「笱仔」擋水引水秘法順利通水。全島水網縱橫，荒埔化為千頃沃野。",
        locationNameAncient: "臺灣府諸羅縣半線 (彰化)",
        locationNameModern: "彰化縣二水鄉鼻仔頭水圳頭",
        coordinates: [120.62, 23.81],
        tags: ["八堡圳", "施世榜", "林先生", "彰化平原", "水利工程"]
      },
      {
        id: "evt_tw_zhuyigui_1721",
        year: 1721,
        yearDisplay: "西元 1721 年 (康熙六十年)",
        title: "朱一貴鴨母王起義",
        summary: "反抗知府王珍暴政，朱一貴率眾起義七日破府城稱中興王，史稱鴨母王起事。",
        detail: "因臺灣知府王珍橫徵暴斂，養鴨農民朱一貴與杜君英結盟起事，號稱「鴨母王」。義軍數日內席捲全臺攻佔臺灣府城，朱一貴被擁立為中興王，改元永和，復明朝衣冠。清廷調派水師提督施世驃、總兵藍廷珍渡海鎮壓，起義雖敗但促使清廷檢討治臺政策。",
        locationNameAncient: "臺灣府鳳山縣鴨母寮",
        locationNameModern: "高雄市內門區",
        coordinates: [120.46, 22.94],
        tags: ["朱一貴", "鴨母王", "民變", "反清"]
      },
      {
        id: "evt_tw_lan_dingyuan_treatise_1723",
        year: 1723,
        yearDisplay: "西元 1723 年 (雍正元年)",
        title: "藍鼎元著《東征集》推動設立淡水廳與彰化縣",
        summary: "經略名臣藍鼎元著書力陳「經略臺灣十策」，促成清廷增設彰化縣與淡水廳拓展北臺。",
        detail: "隨施世驃平亂之文士藍鼎元深入考察全島，上書巡撫力主積極拓墾，著《東征集》與《平臺紀略》。藍鼎元指出竹塹、大加蚋（臺北）原野平闊沃衍，建議官設淡水廳管轄大甲溪以北，促使臺灣政經建設邁向北臺灣大開發。",
        locationNameAncient: "福建巡撫衙門與臺灣府署",
        locationNameModern: "新竹市與臺中市",
        coordinates: [120.97, 24.81],
        tags: ["藍鼎元", "東征集", "淡水廳", "彰化縣設治"]
      },
      {
        id: "evt_tw_guoxi_liu_canal_1760",
        year: 1760,
        yearDisplay: "西元 1760 年 (乾隆二十五年)",
        title: "郭錫瑠興築瑠公圳潤澤大臺北平原",
        summary: "郭錫瑠父子鑿通新店碧潭岩壁，引新店溪溪水修築木梘暗渠，使臺北盆地成為良田。",
        detail: "墾首郭錫瑠傾盡家產，克服泰雅族出草與洪水泥沙險阻，鑿通碧潭岩壁，並以巨型木梘跨越景美溪引水北進，灌溉大加蚋堡（今臺北大安、信義、松山）數萬畝荒地，奠定臺北城富庶之農經基底。",
        locationNameAncient: "大加蚋堡新店溪碧潭引水閘",
        locationNameModern: "新北市新店區碧潭與臺北市大安區",
        coordinates: [121.53, 24.95],
        tags: ["瑠公圳", "郭錫瑠", "臺北水利", "新店溪"]
      },
      {
        id: "evt_tw_linshuangwen_1786",
        year: 1786,
        yearDisplay: "西元 1786 年 (乾隆五十一年)",
        title: "林爽文天地會大起義與諸羅死守賜名嘉義",
        summary: "臺灣歷史規模最大民變，天地會林爽文攻陷彰化諸羅，乾隆派福康安渡海平亂賜名嘉義。",
        detail: "大里杙天地會首領林爽文起義，自稱盟主改元順天，全臺南北呼應包圍諸羅城。乾隆帝派大學士福康安率數萬大軍渡臺解圍，諸羅軍民堅守數月「嘉其死守之義」，乾隆特賜名諸羅為「嘉義」，名列乾隆十全武功之一。",
        locationNameAncient: "臺灣府諸羅縣 (嘉義)",
        locationNameModern: "嘉義市東區與西區",
        coordinates: [120.45, 23.48],
        tags: ["林爽文", "天地會", "嘉義由來", "十全武功"]
      },
      {
        id: "evt_tw_wu_sha_kavalan_1796",
        year: 1796,
        yearDisplay: "西元 1796 年 (嘉慶元年)",
        title: "吳沙率三籍移民入墾蘭陽平原 (開蘭始祖)",
        summary: "「開蘭始祖」吳沙率漳泉粵移民千餘人翻越雪山草嶺入墾頭圍，開闢宜蘭沃野。",
        detail: "吳沙召募墾民千餘人、鄉勇兩百人，攜帶農具穀種翻越三貂嶺草嶺古道入墾頭圍。初遭強烈抵抗，後蘭陽發生天花痘症，吳沙以漢藥方劑救治平埔族幼童無數，族人感激化干戈為玉帛，迅速開闢二圍、三圍至員山，奠定東臺灣開拓第一基石。",
        locationNameAncient: "蛤仔難頭圍 (頭城)",
        locationNameModern: "宜蘭縣頭城鎮吳沙故居",
        coordinates: [121.82, 24.86],
        tags: ["吳沙", "開蘭始祖", "蘭陽平原", "頭城"]
      },
      {
        id: "evt_tw_cao_jin_canal_1837",
        year: 1837,
        yearDisplay: "西元 1837 年 (道光十七年)",
        title: "曹謹修築曹公圳引灌南臺灣",
        summary: "鳳山知縣曹謹興修曹公圳水利，引高屏溪灌溉數萬甲農田，消弭百年旱災。",
        detail: "鳳山縣地勢乾旱水利不興，知縣曹謹到任後親自踏勘九曲堂，鑿山築壩引下淡水溪（高屏溪）修築四十四座水門、數百里渠道。完工後灌溉四萬餘甲田畝，使南臺灣鳳山、大寮、五甲成為沃野，士民感載至今稱頌曹公圳。",
        locationNameAncient: "鳳山縣九曲堂",
        locationNameModern: "高雄市大樹區九曲堂與鳳山區曹公廟",
        coordinates: [120.42, 22.66],
        tags: ["曹公圳", "曹謹", "鳳山知縣", "南臺灣水利"]
      }
    ],
    highlightFigures: ["fig_shi_lang", "fig_tw_shi_shibang", "fig_tw_guoxi_liu", "fig_zhu_yigui", "fig_tw_lan_dingyuan", "fig_tw_yu_tengfeng", "fig_lin_shuangwen", "fig_tw_wu_sha", "fig_tw_cao_jin", "fig_tw_yang_tingli", "fig_tw_wang_delu", "fig_fu_kangan"]
  },
  {
    id: "tw_qing_late",
    name: "自強建省與開山撫番",
    dateRangeDisplay: "1874 — 1895 年",
    shortEra: "西元 1874 — 1895 年",
    tagline: "開山撫番·銘傳建省",
    description: "牡丹社事件爆發日本犯臺；欽差大臣沈葆楨主持開山撫番廢除渡臺禁令；中法戰爭劉銘傳督師滬尾淡水大捷；1885年臺灣正式建省為行省，劉銘傳首任巡撫築鐵路、架電報、設郵政，躍登全國現代化模範省。",
    keyEvents: [
      {
        id: "evt_tw_tianjin_treaty_ports_1860",
        year: 1860,
        yearDisplay: "西元 1860 年 (咸豐十年)",
        title: "天津條約開港通商 (茶葉樟腦行銷全球)",
        summary: "安平、淡水、雞籠、打狗四港正式開港，洋行林立，臺灣茶與樟腦躍居外銷第一主力。",
        detail: "1860年《北京條約》與《天津條約》使臺灣門戶大開，怡和、德記、東興等英德美洋行紛紛進駐安平與大稻埕。臺灣烏龍茶（Formosa Oolong Tea）、樟腦與砂糖熱銷歐美，形成外貿大幅出超，促使臺灣政經重心自南部逐漸北移。",
        locationNameAncient: "臺灣府淡水廳滬尾洋行碼頭",
        locationNameModern: "新北市淡水區老街與臺北市大稻埕碼頭",
        coordinates: [121.44, 25.17],
        tags: ["開港通商", "大稻埕", "烏龍茶", "洋行"]
      },
      {
        id: "evt_tw_james_maxwell_1865",
        year: 1865,
        yearDisplay: "西元 1865 年 (同治四年)",
        title: "馬雅各醫師創辦全臺第一間西醫新樓醫院",
        summary: "英國長老教會馬雅各醫師於臺南看西街設立醫館，開啟臺灣現代西方公衛醫療之門。",
        detail: "愛丁堡大學醫學博士馬雅各奉派來臺，在府城看西街租屋行醫，引進現代化外科手術、眼科白內障治療與奎寧抗瘧藥物。後於新樓建立現代醫院，以醫療傳道消弭原漢對西學之疑懼，為臺灣現代西醫之濫觴。",
        locationNameAncient: "臺灣府城看西街醫館",
        locationNameModern: "臺南市東區新樓醫院",
        coordinates: [120.21, 22.99],
        tags: ["馬雅各", "新樓醫院", "現代西醫", "臺南"]
      },
      {
        id: "evt_tw_mackay_tamsui_hospital_1872",
        year: 1872,
        yearDisplay: "西元 1872 年 (同治十一年)",
        title: "馬偕博士抵臺創立滬尾偕醫館與牛津學堂",
        summary: "加拿大長老教會宣教士馬偕立足淡水，創立偕醫館與全臺首座現代高等學府牛津學堂。",
        detail: "1872年3月馬偕博士搭船抵達淡水，以「寧願燒盡，不願銹壞」之偉大情懷宣教三十年。設立滬尾偕醫館免費醫治病患、拔牙逾兩萬顆，設立牛津學堂引進天文、地理、物理新知，並創辦全臺第一所女子學校「淡水女學堂」，推動現代醫學與女性受教權。",
        locationNameAncient: "淡水廳滬尾牛津學堂",
        locationNameModern: "新北市淡水區真理大學與淡江中學",
        coordinates: [121.44, 25.17],
        tags: ["馬偕博士", "偕醫館", "牛津學堂", "現代西醫"]
      },
      {
        id: "evt_tw_mudanshe_1874",
        year: 1874,
        yearDisplay: "西元 1874 年 (同治十三年)",
        title: "牡丹社事件與沈葆楨開山撫番",
        summary: "日軍藉琉球船難進犯車城牡丹社，沈葆楨督辦防務，力倡開山撫番與修築恆春古城。",
        detail: "1871年琉球宮古島漁船漂流至八瑤灣遭排灣族人殺害，日本藉故於1874年派西鄉從道發兵進犯牡丹社。清廷派船政大臣沈葆楨為欽差大臣赴臺督辦軍務，修築恆春古城與億載金城，廢除渡臺鐵禁，開闢北中南三條後山越嶺古道，改變清廷消極治臺政策。",
        locationNameAncient: "臺灣府恆春琅嶠牡丹社",
        locationNameModern: "屏東縣牡丹鄉與恆春鎮",
        coordinates: [120.74, 22.00],
        tags: ["牡丹社事件", "沈葆楨", "開山撫番", "恆春古城"]
      },
      {
        id: "evt_tw_batongguan_ancient_road_1875",
        year: 1875,
        yearDisplay: "西元 1875 年 (光緒元年)",
        title: "吳光亮總兵劈山開築八通關古道",
        summary: "南澳總兵吳光亮率飛虎軍橫貫中央山脈玉山隘口，修築長達三百里之八通關越嶺古道。",
        detail: "沈葆楨開山撫番政策下，總兵吳光亮率兩千飛虎軍自林圯埔（今南投竹山）披荊斬棘入山，沿陳有蘭溪越過海拔兩千八百公尺之八通關鞍部，下切拉庫拉庫溪抵達璞石閣（今花蓮玉里）。在八通關石壁刻下「萬里鴻基」、「山高水長」，打通臺灣東西橫貫交通第一動脈。",
        locationNameAncient: "中央山脈八通關山隘",
        locationNameModern: "南投縣信義鄉與花蓮縣卓溪鄉八通關古道",
        coordinates: [120.99, 23.48],
        tags: ["八通關古道", "吳光亮", "沈葆楨", "開山撫番"]
      },
      {
        id: "evt_tw_sino_french_tamsui_1884",
        year: 1884,
        yearDisplay: "西元 1884 年 (光緒十年)",
        title: "中法戰爭滬尾大捷與基隆獅球嶺保衛戰",
        summary: "孤拔艦隊砲轟淡水基隆，劉銘傳、孫開華、林朝棟督師奮戰，重創法軍海軍陸戰隊。",
        detail: "法國遠東艦隊企圖奪取臺灣煤礦與港口以逼清和談。孫開華將軍設伏於淡水沙崙防風林白刃肉搏殲敵數百，林朝棟率鄉勇「棟軍」死守基隆獅球嶺要塞數月。法軍死傷慘重無法前進一步，孤拔中將飲恨澎湖病逝。",
        locationNameAncient: "淡水沙崙與基隆獅球嶺",
        locationNameModern: "新北市淡水區與基隆市仁愛區",
        coordinates: [121.43, 25.17],
        tags: ["中法戰爭", "滬尾大捷", "孫開華", "林朝棟", "獅球嶺"]
      },
      {
        id: "evt_tw_liumingchuan_province_1885",
        year: 1885,
        yearDisplay: "西元 1885 年 (光緒十一年)",
        title: "慈禧太后頒詔臺灣正式建省",
        summary: "清廷確立臺灣為南洋門戶海防要衝，下旨設立行省，劉銘傳任首任巡撫推動全島自強現代化。",
        detail: "中法戰爭後，清廷體認臺灣「為南洋門戶，關係緊要」。光緒十一年九月初五慈禧太后頒懿旨，正式將臺灣自福建省劃出獨立建省，改設三府一直接州。劉銘傳督辦全省新政，推行全島清賦、開山撫番、設西學堂電報學堂，使臺灣一躍成為全國最先進之模範行省。",
        locationNameAncient: "臺灣省巡撫衙門 (臺北府城)",
        locationNameModern: "臺北市中正區中山堂原址",
        coordinates: [121.51, 25.04],
        tags: ["臺灣建省", "劉銘傳", "現代化之父", "模範省"]
      },
      {
        id: "evt_tw_telegraph_cable_1887",
        year: 1887,
        yearDisplay: "西元 1887 年 (光緒十三年)",
        title: "鋪設臺灣福州海底電報線與大清郵政局",
        summary: "劉銘傳架設全臺陸上電報線並鋪設橫跨臺灣海峽之海底電纜，首創現代郵電通訊制度。",
        detail: "劉銘傳聘請丹麥工程師鋪設滬尾至福州川石島長達四百餘里之海底電報電纜，並建立全臺自基隆、臺北通達臺南之陸上電報線路。設立「臺灣郵政總局」，發行中國第一套現代郵票「龍馬圖郵票」，使臺灣資訊傳遞一日千里。",
        locationNameAncient: "臺北府城大清臺灣郵政總局",
        locationNameModern: "臺北市中正區忠孝西路郵政博物館原址",
        coordinates: [121.51, 25.04],
        tags: ["海底電纜", "臺灣郵政", "劉銘傳", "現代通訊"]
      },
      {
        id: "evt_tw_first_railway_1891",
        year: 1891,
        yearDisplay: "西元 1891 年 (光緒十七年)",
        title: "臺灣鐵路基隆至臺北新竹段全線通車",
        summary: "首任巡撫劉銘傳興築中國第一條官辦營運客運鐵路，騰雲號火車開行貫通北臺。",
        detail: "劉銘傳力排眾議聘請英德工程師，歷經四年鑿穿獅球嶺隧道，克服基隆河險阻，完成基隆港至大稻埕（臺北）及延伸至新竹長達一百零六公里之現代鐵路。引進德國製造「騰雲號」與「御風號」蒸氣機車，標誌臺灣邁入現代陸路交通工業時代。",
        locationNameAncient: "臺北火車碼頭 (大稻埕)",
        locationNameModern: "臺北市大同區鄭州路與基隆獅球嶺隧道遺址",
        coordinates: [121.51, 25.05],
        tags: ["臺灣鐵路", "劉銘傳", "騰雲號", "獅球嶺隧道"]
      },
      {
        id: "evt_tw_lin_weiyuan_garden_1893",
        year: 1893,
        yearDisplay: "西元 1893 年 (光緒十九年)",
        title: "板橋林家花園落成與巨紳贊助實業",
        summary: "臺灣首富林維源斥巨資修築板橋林本源園邸，出資百萬贊助鐵路軍防，冠蓋雲集。",
        detail: "板橋林家林維源歷經數十年落成佔地兩萬餘平方公尺之江南園林「林家花園（汲古書屋、來青閣）」。林維源以實業興邦，出資數十萬兩白銀贊助劉銘傳興築鐵路、電報與安撫原住民，展現臺灣本土士紳投身現代化建設之雄厚實力。",
        locationNameAncient: "臺北府淡水縣枋橋林本源園邸",
        locationNameModern: "新北市板橋區林本源園邸 (板橋林家花園)",
        coordinates: [121.45, 25.01],
        tags: ["板橋林家", "林維源", "林家花園", "臺灣實業"]
      }
    ],
    highlightFigures: ["fig_shen_baozhen", "fig_liu_mingchuan", "fig_tw_lin_chaodong", "fig_tw_lin_weiyuan", "fig_tw_wu_guangliang", "fig_tw_mackay", "fig_tw_james_maxwell", "fig_tang_jingsong", "fig_qiu_fengjia", "fig_liu_yongfu"]
  },
  {
    id: "tw_japanese",
    name: "乙未抗日與文化啟蒙",
    dateRangeDisplay: "1895 — 1945 年",
    shortEra: "西元 1895 — 1945 年",
    tagline: "乙未保臺·文協啟蒙",
    description: "甲午戰敗馬關割臺，全臺軍民成立臺灣民主國浴血進行乙未抗日；苗栗羅福星、噍吧哖余清芳武裝起義殉國；林獻堂領導十四年議會請願；蔣渭水創臺灣文化協會與民眾黨推動文化自治；賴和奠定臺灣新文學；莫那·魯道霧社起義震驚世界。",
    keyEvents: [
      {
        id: "evt_tw_yiwei_war_1895",
        year: 1895,
        yearDisplay: "西元 1895 年 (光緒二十一年 / 明治二十八年)",
        title: "乙未保臺抗日戰役與八卦山之役",
        summary: "《馬關條約》割讓臺灣引發全島殊死抵抗，丘逢甲、劉永福建立臺灣民主國，吳湯興血戰八卦山。",
        detail: "清廷因甲午慘敗簽訂《馬關條約》割讓臺灣澎湖。臺灣紳民痛哭鳴鑼罷市，宣告建立「臺灣民主國」推唐景崧為總統、丘逢甲任副總統。日軍近衛師團自澳底登陸南下，吳湯興、徐驤義勇軍與黑旗軍劉永福在八卦山爆發全臺最激烈會戰。全臺抗日軍民奮戰逾五個月，近萬人成仁，展現不屈節氣。",
        locationNameAncient: "臺灣省彰化八卦山",
        locationNameModern: "彰化縣彰化市八卦山大佛風景區",
        coordinates: [120.55, 24.08],
        tags: ["乙未戰爭", "臺灣民主國", "八卦山戰役", "保臺英烈"]
      },
      {
        id: "evt_tw_barclay_tainan_peace_1895",
        year: 1895,
        yearDisplay: "西元 1895 年 (明治二十八年)",
        title: "巴克禮牧師冒死交涉保全臺南府城百萬生靈",
        summary: "日軍圍攻臺南之際，巴克禮牧師受府城士紳懇請深夜出城和平交涉，使府城和平開城免遭屠戮。",
        detail: "黑旗軍劉永福內渡後，日軍三路包圍臺南府城。英國宣教士巴克禮與宋忠堅牧師受府城富紳懇託，深夜手持和平請願書穿過戰火出城與乃木希典將軍談判。日軍接受和平開城條件軍紀嚴整進城，全城百姓免於戰火屠殺滅頂之災。",
        locationNameAncient: "臺南府城小南門與南門路",
        locationNameModern: "臺南市中西區巴克禮紀念公園",
        coordinates: [120.21, 22.98],
        tags: ["巴克禮", "和平交涉", "臺南開城", "仁愛大德"]
      },
      {
        id: "evt_tw_gotoshinpei_land_survey_1898",
        year: 1898,
        yearDisplay: "西元 1898 — 1904 年",
        title: "後藤新平推行全島土地大調查與專賣公衛改革",
        summary: "民政長官後藤新平推行生物學統治原理，清丈全島地籍消除大租權，奠定近代行政財政基石。",
        detail: "後藤新平採用「舊慣調查」方式，全面清查全島土地隱田，發行公債收買大租戶產權，確立實質耕作小租戶為單一土地所有者，大幅增加田賦收入。同時實施鴉片漸禁、樟腦食鹽專賣，創立下水道防疫系統與臺北帝國大學醫學部前身。",
        locationNameAncient: "臺灣總督府民政部",
        locationNameModern: "臺北市中正區總統府原址",
        coordinates: [121.51, 25.03],
        tags: ["後藤新平", "土地調查", "公衛現代化", "專賣制度"]
      },
      {
        id: "evt_tw_cross_island_railway_1908",
        year: 1908,
        yearDisplay: "西元 1908 年 (明治四十一年)",
        title: "縱貫鐵路基隆至高雄405公里全線通車",
        summary: "歷時十年艱辛鑿山築橋，基隆至打狗（高雄）南北縱貫縱貫鐵路全線貫通通車。",
        detail: "總督府鐵道部克服大安溪、大安山、三義勝興陡坡與濁水溪險阻，完成長達405公里的南北縱貫鐵路。1908年10月於臺中公園舉行盛大通車典禮，行車時間由過去數日縮減為九小時，徹底打通全島物流、人流與現代經濟動脈。",
        locationNameAncient: "臺中火車站與臺中公園通車會場",
        locationNameModern: "臺中市中區臺中舊火車站與臺中公園",
        coordinates: [120.68, 24.14],
        tags: ["縱貫鐵路", "南北貫通", "臺中公園", "鐵道工藝"]
      },
      {
        id: "evt_tw_luofuxing_miaoli_1913",
        year: 1913,
        yearDisplay: "西元 1913 年 (大正二年)",
        title: "羅福星同盟會苗栗抗日起義",
        summary: "同盟會烈士羅福星受孫中山之命赴臺組織同盟會支部，策劃全島武裝起義壯烈犧牲。",
        detail: "辛亥革命成功後，同盟會會員羅福星潛入臺灣，在苗栗大湖、大圍秘密招募會員逾千人，發表《大漢篇》誓言驅除日本總督統治恢復臺灣。事洩被捕，羅福星從容就義，臨刑留下名言：「殺頭相似風吹帽，敢在人間做豪傑！」。",
        locationNameAncient: "新竹州苗栗郡大湖庄",
        locationNameModern: "苗栗縣大湖鄉昭忠祠",
        coordinates: [120.87, 24.42],
        tags: ["羅福星", "苗栗事件", "同盟會", "辛亥烈士"]
      },
      {
        id: "evt_tw_tapani_incident_1915",
        year: 1915,
        yearDisplay: "西元 1915 年 (大正四年)",
        title: "余清芳玉井噍吧哖抗日事件",
        summary: "余清芳、江定率起義軍於臺南玉井虎頭山揭竿抗日，為漢人最後一次大規模武裝抗暴。",
        detail: "余清芳、羅俊、江定以臺南西來庵王爺廟為秘密據點，結合民間信仰與抗日義民起事，號召驅逐日本殖民統治。義軍圍攻甲仙埔、南庄支廳，在玉井虎頭山與日警軍隊決戰。起義失敗後八百餘人被判死刑，此事件促使總督府放棄嚴苛武官鎮壓，轉向內地延長主義文官統治。",
        locationNameAncient: "臺南廳噍吧哖虎頭山",
        locationNameModern: "臺南市玉井區噍吧哖事件紀念園區",
        coordinates: [120.46, 23.12],
        tags: ["噍吧哖事件", "西來庵起義", "余清芳", "玉井"]
      },
      {
        id: "evt_tw_parliament_petition_1921",
        year: 1921,
        yearDisplay: "西元 1921 — 1934 年",
        title: "林獻堂發起臺灣議會設置請願運動",
        summary: "霧峰林家林獻堂領導全島菁英赴東京帝國議會請願，堅持十四年爭取臺灣人高度立法自治。",
        detail: "受威爾遜「民族自決」浪潮啟發，林獻堂、蔡培火等組成請願團，連續十五次向日本帝國議會遞交請願書，要求設立屬於臺灣人之地方民選議會。此非暴力憲政啟蒙運動長達十四年，培育全臺整整一代民主法治菁英。",
        locationNameAncient: "臺中州大屯郡霧峰林家花園景薰樓",
        locationNameModern: "臺中市霧峰區林家宅第",
        coordinates: [120.69, 24.06],
        tags: ["議會請願", "林獻堂", "自治精神", "非暴力爭取"]
      },
      {
        id: "evt_tw_cultural_golden_age",
        year: 1921,
        yearDisplay: "西元 1921 — 1931 年",
        title: "臺灣文化協會創立與政治社會啟蒙黃金時代",
        summary: "蔣渭水、林獻堂、蔡培火引領體制內非暴力啟蒙，創立文化協會與臺灣民眾黨。",
        detail: "蔣渭水於臺北大稻埕靜修女中發起成立「臺灣文化協會」，發表撼動人心之《臨床講義》，診斷臺灣罹患「智識營養不良症」。廣設讀報社、開辦夏季學校、巡迴演講，賴和開闢臺灣鄉土新文學，開啟全臺波瀾壯闊之自覺覺民黃金時代。",
        locationNameAncient: "臺北州臺北市大稻埕靜修女中",
        locationNameModern: "臺北市大同區大稻埕",
        coordinates: [121.51, 25.05],
        tags: ["臺灣文化協會", "蔣渭水", "臨床講義", "新文學"]
      },
      {
        id: "evt_tw_wushe_uprising",
        year: 1930,
        yearDisplay: "西元 1930 年 (昭和五年)",
        title: "莫那·魯道霧社起義抗日",
        summary: "賽德克族馬赫坡社首領莫那·魯道聯合六社抗暴起義，彰顯原住民族浩然不屈精神。",
        detail: "因長年山林苛役與殖民欺凌，賽德克族頭目莫那·魯道率三百勇士奇襲霧社公學校運動會。日軍出動大軍、飛機與糜爛性毒氣瓦斯圍攻，勇士們依託險峻奇岩浴血奮戰數十日，最後全數壯烈成仁，震撼國際聯盟高度關注原住民族生存人權。",
        locationNameAncient: "臺中州能高郡霧社馬赫坡社",
        locationNameModern: "南投縣仁愛鄉霧社紀念公園與廬山溫泉",
        coordinates: [121.13, 24.02],
        tags: ["莫那魯道", "霧社事件", "賽德克族", "原民英烈"]
      },
      {
        id: "evt_tw_hata_yoichi_jianan_1930",
        year: 1930,
        yearDisplay: "西元 1930 年 (昭和五年)",
        title: "八田與一烏山頭水庫與嘉南大圳竣工",
        summary: "水利泰斗八田與一歷經十年築成東亞第一大水壩與嘉南水網，十五萬甲乾旱鹽地變綠野糧倉。",
        detail: "土木技師八田與一歷經十年心血，採用先進半半成型水壩工法築成珊瑚潭「烏山頭水庫」，並鋪設長達一萬六千公里之嘉南大圳渠道。首創「三年輪作給水法」，使嘉南平原稻米甘蔗產量暴增數倍，被全臺農民感載奉為「嘉南大圳之父」。",
        locationNameAncient: "臺南州曾文郡官田庄烏山頭",
        locationNameModern: "臺南市官田區烏山頭水庫風景區",
        coordinates: [120.36, 23.20],
        tags: ["八田與一", "烏山頭水庫", "嘉南大圳", "綠色奇蹟"]
      }
    ],
    highlightFigures: ["fig_tw_wu_tangxing", "fig_tw_xu_xiang", "fig_tw_xiao_guangming", "fig_tw_wu_pengnian", "fig_tw_barclay", "fig_lin_xiantang", "fig_chiang_weishui", "fig_lai_he", "fig_tw_hatta_yoichi", "fig_tw_tu_tsung_ming", "fig_mona_rudao", "fig_luo_fuxing", "fig_yu_qingfang", "fig_tw_deng_yuxian", "fig_tw_huang_tushui", "fig_tw_chen_chengpo", "fig_tw_kondo_hyoe"]
  },
  {
    id: "tw_postwar",
    name: "戰後復原與臺海防衛",
    dateRangeDisplay: "1945 — 1970 年",
    shortEra: "西元 1945 — 1970 年",
    tagline: "光復回歸·古寧八二三",
    description: "1945年日本投降臺灣光復，臺北中山堂舉行受降典禮；1947年《中華民國憲法》施行；1949年中央政府遷臺，百萬軍民與故宮國寶渡海；金門古寧頭大捷與八二三砲戰保衛臺海；陳誠主導三七五減租、公地放領與耕者有其田土地改革；1968年推行九年國民義務教育。",
    keyEvents: [
      {
        id: "evt_tw_retrocession_1945",
        year: 1945,
        yearDisplay: "西元 1945 年 (民國三十四年)",
        title: "臺灣光復受降典禮 (臺北中山堂)",
        summary: "日本第十方面軍在臺北公會堂遞呈降書，結束五十年日本統治，全臺歡慶光復。",
        detail: "1945年10月25日，臺灣省受降典禮於臺北公會堂（今中山堂）舉行，陳儀代表同盟國中國戰區受降。臺灣及澎湖列島重歸中華民國版圖，全島民眾結綵遊行歡呼迎歸。10月25日明定為臺灣光復節。",
        locationNameAncient: "臺北市公會堂",
        locationNameModern: "臺北市中正區中山堂",
        coordinates: [121.51, 25.04],
        tags: ["臺灣光復", "中山堂", "終結殖民", "光復節"]
      },
      {
        id: "evt_tw_228_peace_memorial_1947",
        year: 1947,
        yearDisplay: "西元 1947 年 (民國三十六年)",
        title: "二二八歷史事件與轉型和平人權反思",
        summary: "戰後緝菸衝突引發全島省思，促成戰後民主憲政省察與歷史公義和平和解基石。",
        detail: "1947年2月27日臺北市大稻埕發生緝菸警民衝突，次日蔓延為全臺社會動盪與悲劇。隨後政府推動解嚴、正式平反賠償、設立二二八和平紀念公園與紀念館，總統親自向罹難者家屬致歉，促使臺灣社會深植法治、人權保障與族群共榮之最高民主價值。",
        locationNameAncient: "臺北市大稻埕天馬茶房與臺北新公園",
        locationNameModern: "臺北市中正區二二八和平紀念公園",
        coordinates: [121.51, 25.04],
        tags: ["二二八紀念", "人權和平", "轉型省思", "族群共榮"]
      },
      {
        id: "evt_tw_guningtou_1949",
        year: 1949,
        yearDisplay: "西元 1949 年 (民國三十八年)",
        title: "金門古寧頭大捷保衛臺灣",
        summary: "國軍全殲跨海登陸金門之解放軍三團，一舉挽回狂瀾確立臺海兩岸分立分治局面。",
        detail: "1949年10月25日凌晨解放軍近萬部隊渡海夜襲金門。胡璉第十二兵團、高魁元第十八軍沈著調度，「金門之熊」M5A1輕戰車衝擊海岸，海空聯手炸毀敵渡海船隻斷其歸路，血戰三晝夜將登陸部隊徹底聚殲於古寧頭海灘。此戰粉碎奪取臺灣戰略企圖，奠定臺澎金馬繁榮安寧之基石。",
        locationNameAncient: "福建省金門縣古寧頭",
        locationNameModern: "金門縣金寧鄉古寧頭戰史館",
        coordinates: [118.31, 24.48],
        tags: ["古寧頭大捷", "胡璉", "高魁元", "金門之熊", "保衛臺灣"]
      },
      {
        id: "evt_tw_npm_treasures_1949",
        year: 1949,
        yearDisplay: "西元 1949 年 (民國三十八年)",
        title: "國寶文博渡海與國立故宮博物院落成",
        summary: "六十八萬件故宮歷代帝王書畫青銅器精粹渡海遷臺，奠定臺灣中華文明殿堂地位。",
        detail: "1948年底至1949年初，在杭立武、傅斯年、莊嚴等學者護運下，故宮與中央博物院三批頂級文物（含快雪時晴帖、翠玉白菜、毛公鼎）安全渡海運抵基隆，先後存於臺中霧峰北溝庫房，1965年臺北外雙溪國立故宮博物院落成開館，成為世界四大頂級博物館之一。",
        locationNameAncient: "臺中霧峰北溝庫房至臺北外雙溪",
        locationNameModern: "臺北市士林區國立故宮博物院",
        coordinates: [121.55, 25.10],
        tags: ["故宮國寶", "文博傳承", "毛公鼎", "外雙溪"]
      },
      {
        id: "evt_tw_daerdan_victory_1950",
        year: 1950,
        yearDisplay: "西元 1950 年 (民國三十九年)",
        title: "大二膽島戰役 (史恆豐營長以寡敵眾立奇功)",
        summary: "解放軍夜襲金門門戶大二膽島，史恆豐少校率不到三百兵力全殲登陸敵軍生擒敵營長。",
        detail: "解放軍加強營七百餘人突擊大二膽島。史恆豐營長指揮沉著，傳令兵賴生明冒死穿過重重彈雨傳遞軍令，全營將士刺刀肉搏將敵軍包圍聚殲於沙灘。蔣經國親赴戰地題碑「島孤人不孤」，確立大膽島海防第一堡壘地位。",
        locationNameAncient: "金門縣大膽島生明廳",
        locationNameModern: "金門縣烈嶼鄉大膽島風景區",
        coordinates: [118.20, 24.38],
        tags: ["大二膽戰役", "史恆豐", "島孤人不孤", "大膽島"]
      },
      {
        id: "evt_tw_us_aid_yin_1950",
        year: 1950,
        yearDisplay: "西元 1950 — 1965 年",
        title: "尹仲容主導美援引進與外匯民營化改革",
        summary: "「臺灣經濟奇蹟總工程師」尹仲容主導運用美援十五億美元，培植民間紡織與石化工業。",
        detail: "韓戰爆發後美國重啟對臺經濟軍事援助。經濟部長尹仲容以超凡魄力推動「單一匯率改革」、鼓勵民間創業投資，扶持台塑王永慶、遠東徐有庠等民營企業家，奠定臺灣由農業社會邁向工業化外銷導向之黃金基石。",
        locationNameAncient: "行政院美援運用委員會署",
        locationNameModern: "臺北市中正區行政院原址",
        coordinates: [121.52, 25.04],
        tags: ["美援", "尹仲容", "外匯改革", "經濟起飛"]
      },
      {
        id: "evt_tw_land_reform_1953",
        year: 1953,
        yearDisplay: "西元 1953 年 (民國四十二年)",
        title: "耕者有其田和平土地改革成功",
        summary: "陳誠主導和平漸進式土地改革，自耕農倍增農村繁榮，地主資本順利轉型民營工業。",
        detail: "臺灣省政府推行三七五減租、公地放領及1953年「耕者有其田」，以四大公營公司股票及實物土地債券補償地主徵收超額出租耕地轉售佃農。自耕農比例躍升至八成以上，不僅免去激烈血腥鬥爭，更成功將農業資本導入民間工業投資，催生臺塑、水泥等民營集團起飛。",
        locationNameAncient: "臺灣省全島",
        locationNameModern: "臺灣各地農村",
        coordinates: [120.30, 23.50],
        tags: ["土地改革", "耕者有其田", "陳誠", "經濟基礎"]
      },
      {
        id: "evt_tw_yijiangshan_treaty_1955",
        year: 1955,
        yearDisplay: "西元 1955 年 (民國四十四年)",
        title: "一江山血戰成仁與《中美共同防禦條約》生效",
        summary: "王生明司令官率千餘守軍堅守一江山浴血三晝夜全員壯烈殉國，促成臺美同盟條約生效。",
        detail: "共軍陸海空軍大舉合圍一江山島，王生明率千餘官兵誓死死守，擊沉敵艦多艘，最後引爆手榴彈成仁。此悲壯血戰震撼自由世界，美國國會迅速通過《臺灣決議案》，《中美共同防禦條約》正式批准生效，大陳島萬餘軍民安全撤退臺灣，奠定海峽冷戰安全鐵壁。",
        locationNameAncient: "一江山防區至大陳島",
        locationNameModern: "臺北市一江街紀念碑與大陳新村",
        coordinates: [121.40, 25.80],
        tags: ["一江山島", "王生明", "中美防禦條約", "大陳撤退"]
      },
      {
        id: "evt_tw_823_1958",
        year: 1958,
        yearDisplay: "西元 1958 年 (民國四十七年)",
        title: "八二三臺海砲戰與確立海峽現狀",
        summary: "金門前線承受47萬發砲彈頑強堅守，八吋巨砲還擊，確立臺海冷戰防衛中線。",
        detail: "1958年8月23日解放軍突向大、小金門發射近六萬發砲彈，吉星文副司令官等殉國。俞大維國防部長與胡璉司令官在坑道碉堡中沉著反擊，空軍以響尾蛇飛彈首奪空戰大捷，國軍以八吋自走重砲重擊敵陣，迫使對方改為「單打雙不打」，奠定臺海半世紀和平穩定。",
        locationNameAncient: "金門防衛要塞群",
        locationNameModern: "金門縣太武山擎天廳",
        coordinates: [118.33, 24.45],
        tags: ["八二三砲戰", "吉星文", "俞大維", "海峽防線"]
      },
      {
        id: "evt_tw_nine_year_education_1968",
        year: 1968,
        yearDisplay: "西元 1968 年 (民國五十七年)",
        title: "實施九年國民義務教育 (全民科技人才奠基)",
        summary: "蔣中正總統下令全面實施九年義務教育，免試升初中，為臺灣高科技工業培育百萬人才。",
        detail: "1968年臺灣率先在全亞洲實施九年義務教育，將國民小學與初級中學全面銜接為免試國民教育。新設數百所國民中學，徹底掃除文盲，大幅提升勞動力文化與技術素質，為後續十大建設、新竹科學園區與工程師王國提供源源不絕之人才庫。",
        locationNameAncient: "臺灣省全島各縣市國民中學",
        locationNameModern: "全臺各國民中學",
        coordinates: [120.68, 24.15],
        tags: ["九年國教", "教育普及", "人才培育", "現代化基石"]
      }
    ],
    highlightFigures: ["fig_hu_lian", "fig_tw_gao_kuiyuan", "fig_tw_shi_hengfeng", "fig_tw_wang_shengming", "fig_ji_xingwen", "fig_yu_dawei", "fig_chen_cheng", "fig_yan_jiagan", "fig_yin_zhongrong", "fig_fu_sinian"]
  },
  {
    id: "tw_modern",
    name: "經濟奇蹟、科技矽島與民主轉型",
    dateRangeDisplay: "1970 年 — 現代",
    shortEra: "西元 1970 年 — 現代",
    tagline: "十大建設·護國矽盾",
    description: "蔣經國、孫運璿推動國家「十大建設」突破能源危機躍居亞洲四小龍之首；李國鼎引進半導體科技，張忠謀創立台積電（TSMC）打造全球最頂尖晶片代工「矽盾」；解除戒嚴開放探親；李登輝主導和平憲政改革、1996年全民直選總統與政黨輪替，被譽為華人世界的民主燈塔。",
    keyEvents: [
      {
        id: "evt_tw_ten_projects_1973",
        year: 1973,
        yearDisplay: "西元 1973 年 (民國六十二年)",
        title: "推動十大建設躍登亞洲四小龍之首",
        summary: "蔣經國大魄力投資二千億推動十大國家基礎建設，打破經濟瓶頸邁向新興工業國。",
        detail: "面對第一次石油危機與外交逆境，行政院長蔣經國宣示「今天不做，明天就會後悔」，全力投資十大建設：中山高速公路、鐵路電氣化、北迴鐵路、中正國際機場、臺中港、蘇澳港、中鋼、中船、中油石化輕油裂解廠及核一廠，打通全島交通工業動脈，帶動臺灣經濟黃金起飛。",
        locationNameAncient: "臺灣全島重點工區",
        locationNameModern: "中山高速公路全線 / 桃園機場",
        coordinates: [121.23, 25.07],
        tags: ["十大建設", "蔣經國", "孫運璿", "亞洲四小龍"]
      },
      {
        id: "evt_tw_itri_rca_1976",
        year: 1976,
        yearDisplay: "西元 1976 年 (民國六十五年)",
        title: "潘文淵李國鼎引進RCA半導體技術 (工研院成立)",
        summary: "經濟部推動潘文淵「積體電路計畫」，引進美國RCA技術在工研院試產晶圓，啟動矽島傳奇。",
        detail: "在臺北小欣欣豆漿店的一場早餐會中，潘文淵向孫運璿、李國鼎建言發展半導體。經濟部派遣曹興誠、曾繁城等第一批種子工程師赴美學習，在工業技術研究院（ITRI）成功自製第一顆IC晶片，隨後衍生聯電與台積電，開啟臺灣半導體霸業。",
        locationNameAncient: "新竹縣竹東鎮工業技術研究院",
        locationNameModern: "新竹縣竹東鎮工研院中興院區",
        coordinates: [121.04, 24.77],
        tags: ["工研院", "李國鼎", "孫運璿", "RCA計畫", "半導體起步"]
      },
      {
        id: "evt_tw_hsinchu_tsmc_1980",
        year: 1980,
        yearDisplay: "西元 1980 — 1987 年",
        title: "新竹科學園區奠基與台積電成立打造矽盾",
        summary: "孫運璿、李國鼎促成新竹科學園區與工研院技術引進，張忠謀首創晶圓代工台積電成護國神山。",
        detail: "1980年新竹科學園區成立，李國鼎、孫運璿推動工研院引進美國RCA超大型積體電路技術，力邀張忠謀回臺主持工研院並於1987年創立台積電（TSMC）。首創純晶圓代工模式，帶領臺灣成為全球最關鍵高科技運算晶片樞紐與保護臺灣安全的「矽盾（Silicon Shield）」。",
        locationNameAncient: "新竹科學工業園區",
        locationNameModern: "新竹市科學園區台積電全球研發中心",
        coordinates: [120.99, 24.78],
        tags: ["台積電", "新竹科學園區", "張忠謀", "李國鼎", "護國神山"]
      },
      {
        id: "evt_tw_end_martial_law_1987",
        year: 1987,
        yearDisplay: "西元 1987 年 (民國七十六年)",
        title: "蔣經國總統宣告臺灣解除戒嚴與開放探親",
        summary: "宣布自7月15日零時起終止實施三十八年之戒嚴令，開放黨禁報禁與兩岸探親，邁入自由社會。",
        detail: "蔣經國總統晚年順應時代巨浪，明智宣示「時代在變，環境在變，潮流也在變」，毅然簽署總統令解除戒嚴。同日開放報紙登記與組黨自由，11月正式開放退伍老兵與民眾赴大陸探親，徹底打開臺灣民主政治開放與海峽交流之大門。",
        locationNameAncient: "臺北市中正區總統府",
        locationNameModern: "臺北市中正區重慶南路總統府",
        coordinates: [121.51, 25.03],
        tags: ["解除戒嚴", "蔣經國", "開放探親", "自由民主"]
      },
      {
        id: "evt_tw_wild_lily_1990",
        year: 1990,
        yearDisplay: "西元 1990 年 (民國七十九年)",
        title: "野百合學運與廢除動員戡亂體制",
        summary: "數千大學生齊聚中正紀念堂靜坐抗議萬年國會，李登輝總統接見承諾國會全面改選推進民主改革。",
        detail: "1990年3月全臺數千大學生在臺北中正紀念堂廣場靜坐，提出「解散國民大會、廢除臨時條款、召開國是會議」四大訴求。李登輝總統親自接見學生代表並信守承諾，於次年宣告終止動員戡亂時期、廢除萬年國會，使中央民意代表全面直選。",
        locationNameAncient: "臺北市中正紀念堂廣場 (自由廣場)",
        locationNameModern: "臺北市中正區自由廣場牌樓",
        coordinates: [121.52, 25.03],
        tags: ["野百合學運", "李登輝", "廢除動員戡亂", "萬年國會改選"]
      },
      {
        id: "evt_tw_nhi_health_1995",
        year: 1995,
        yearDisplay: "西元 1995 年 (民國八十四年)",
        title: "開辦全民健康保險制度 (NHI全球醫療典範)",
        summary: "開辦涵蓋全體國民之全民健保，覆蓋率超過99%，獲諾貝爾獎得主與國際評為全球最佳公醫制度。",
        detail: "1995年3月1日全民健康保險正式開辦，打破身分職業限制，將全體國民納入單一社會保險保護傘。以高就醫便利性、低行政成本及高覆蓋率聞名，諾貝爾經濟學獎得主克魯曼譽為「全球公共政策之奇蹟」。",
        locationNameAncient: "臺北市中央健康保險局署",
        locationNameModern: "臺北市大安區衛生福利部中央健康保險署",
        coordinates: [121.54, 25.03],
        tags: ["全民健保", "醫療福祉", "全球模範", "公共衛生"]
      },
      {
        id: "evt_tw_presidential_election_1996",
        year: 1996,
        yearDisplay: "西元 1996 年 (民國八十五年)",
        title: "中華民國首次公民直選總統完成寧靜革命",
        summary: "李登輝當選首位民選總統，面對臺海飛彈危機堅定完成首次公民直接選舉，成為民主燈塔。",
        detail: "1996年3月23日，臺灣舉行華人歷史五千年來第一次國家元首公民直接投票。面對解放軍在臺海發射飛彈演習軍事威嚇，兩千一百萬臺灣人民無畏威脅以76%投票率完成大選。李登輝連任首任民選總統，國際媒體稱譽臺灣達成不流血過渡之「寧靜革命」。",
        locationNameAncient: "臺灣全島各投開票所",
        locationNameModern: "臺北市中正區總統府",
        coordinates: [121.51, 25.04],
        tags: ["總統直選", "李登輝", "寧靜革命", "民主燈塔"]
      },
      {
        id: "evt_tw_thsr_bullet_train_2007",
        year: 2007,
        yearDisplay: "西元 2007 年 (民國九十六年)",
        title: "臺灣高速鐵路全線通車 (南北一日生活圈)",
        summary: "時速三百公里高鐵貫通臺北至高雄左營，引進新幹線科技締造世界最大民間BOT工程奇蹟。",
        detail: "全長345公里的臺灣高速鐵路引進日本新幹線700T型列車，最高時速達315公里，將臺北至高雄行車時間縮短至九十分鐘。串聯新竹、臺中、臺南各大科學園區形成緊密高科技產業廊帶，徹底改變臺灣地緣經濟生活模式。",
        locationNameAncient: "高鐵全線貫穿臺灣西部走廊",
        locationNameModern: "臺北車站至高雄左營高鐵站",
        coordinates: [120.61, 24.11],
        tags: ["臺灣高鐵", "新幹線", "一日生活圈", "現代工程"]
      },
      {
        id: "evt_tw_taiwan_democracy_turnover",
        year: 2000,
        yearDisplay: "西元 2000 — 2016 年",
        title: "三度政黨輪替與成熟民主法治社會確立",
        summary: "2000年、2008年、2016年經歷三次和平政黨輪替，確立權力和平轉移之成熟憲政典範。",
        detail: "2000年陳水扁當選終結國民黨半世紀執政；2008年馬英九當選完成二度輪替；2016年蔡英文當選成為華人社會首位女性國家元首。三次政黨輪替完全透過民主選票和平過渡，在亞洲樹立最高人權自由與政制典範。",
        locationNameAncient: "臺北市中正區總統府",
        locationNameModern: "臺北市中正區凱達格蘭大道",
        coordinates: [121.51, 25.04],
        tags: ["政黨輪替", "民主深化", "和平過渡", "憲政主義"]
      },
      {
        id: "evt_tw_silicon_island_ai_2024",
        year: 2024,
        yearDisplay: "西元 2024 年 (民國一一三年)",
        title: "全球AI半導體與先進製程矽島之巔",
        summary: "台積電先進製程市佔突破九成，輝達、超微等全球AI巨頭供應鏈群聚臺灣打造全球科技神山。",
        detail: "進入生成式AI與大運算時代，臺灣以台積電3奈米、2奈米與CoWoS先進封裝技術獨步全球，掌握全球超過90%最尖端AI晶片製造。黃仁勳、蘇姿丰等科技領袖齊聚臺北國際電腦展，宣示臺灣為全球AI人工智慧革命中心，矽島之名輝映全球文明。",
        locationNameAncient: "新竹科學園區與南部科學園區",
        locationNameModern: "臺南南科台積電晶圓18廠 / 新竹寶山研發中心",
        coordinates: [120.27, 23.11],
        tags: ["矽島巔峰", "AI運算", "台積電先進製程", "全球護國神山"]
      }
    ],
    highlightFigures: ["fig_sun_yunsuan", "fig_li_guoding", "fig_zhang_zhongmou", "fig_wang_yongqing", "fig_chiang_chingkuo", "fig_li_denghui", "fig_tw_jensen_huang", "fig_tw_lisa_su", "fig_tw_stan_shih", "fig_tw_terry_gou", "fig_tw_li_yuan_tseh", "fig_tw_chi_cheng", "fig_tw_lin_huaimin", "fig_tw_ang_lee", "fig_tw_chen_shu_chu", "fig_tw_tai_tzu_ying"]
  }
];

// 41 Dedicated Taiwan Figures (merged dynamically with all 10 periods in app.js)
export const TAIWAN_DEDICATED_FIGURES = ${JSON.stringify(allDedicatedFigures, null, 2)};

// Complete list of figures relevant to Taiwan lens
export const TAIWAN_RELATED_FIGURE_IDS = [
  // Indigenous & Pioneer Leaders
  "fig_tw_kamachat", "fig_tw_coyett", "fig_tw_shen_guangwen",
  // Yuan-Ming
  "fig_yan_siqi", "fig_zheng_zhilong", "fig_guo_huaiyi",
  // Tungning & Qing Early
  "fig_zheng_chenggong", "fig_chen_yonghua", "fig_zheng_jing", "fig_liu_guoxuan",
  "fig_shi_lang", "fig_tw_shi_shibang", "fig_tw_guoxi_liu", "fig_zhu_yigui",
  "fig_tw_lan_dingyuan", "fig_tw_yu_tengfeng", "fig_lin_shuangwen", "fig_tw_wu_sha",
  "fig_tw_cao_jin", "fig_tw_yang_tingli", "fig_tw_wang_delu", "fig_fu_kangan",
  // Qing Late & Construction
  "fig_shen_baozhen", "fig_liu_mingchuan", "fig_tw_lin_chaodong", "fig_tw_lin_weiyuan",
  "fig_tw_wu_guangliang", "fig_tw_mackay", "fig_tw_james_maxwell", "fig_tw_barclay",
  "fig_tang_jingsong", "fig_qiu_fengjia", "fig_liu_yongfu",
  // Japanese Era & Cultural Enlightenment
  "fig_tw_wu_tangxing", "fig_tw_xu_xiang", "fig_tw_xiao_guangming", "fig_tw_wu_pengnian",
  "fig_lin_xiantang", "fig_chiang_weishui", "fig_lai_he", "fig_cai_peihuo", "fig_mona_rudao",
  "fig_luo_fuxing", "fig_yu_qingfang", "fig_tang_de_zhang", "fig_yang_kui",
  "fig_tw_hatta_yoichi", "fig_tw_tu_tsung_ming", "fig_tw_hsieh_hsueh_hung",
  "fig_tw_kondo_hyoe", "fig_tw_deng_yuxian", "fig_tw_huang_tushui", "fig_tw_chen_chengpo",
  // Post-War Defense & Modern Miracle
  "fig_hu_lian", "fig_tw_gao_kuiyuan", "fig_tw_shi_hengfeng", "fig_tw_wang_shengming",
  "fig_ji_xingwen", "fig_yu_dawei", "fig_chen_cheng", "fig_yan_jiagan",
  "fig_sun_yunsuan", "fig_li_guoding", "fig_yin_zhongrong", "fig_fu_sinian",
  "fig_wang_yongqing", "fig_zhang_zhongmou", "fig_chiang_chingkuo", "fig_li_denghui",
  "fig_tw_li_yuan_tseh", "fig_tw_stan_shih", "fig_tw_terry_gou", "fig_tw_jensen_huang",
  "fig_tw_lisa_su", "fig_tw_lin_huaimin", "fig_tw_ang_lee", "fig_tw_chen_shu_chu",
  "fig_tw_chi_cheng", "fig_tw_tai_tzu_ying"
];

// Mapping between Taiwan Era IDs and their active battles
export const ERA_BATTLE_IDS = {
  tw_prehistoric: ["bat_tw_dadu_war_1644"],
  tw_dutch_spanish: ["bat_tw_liaoluo_bay_1633", "bat_tw_keelung_1642", "bat_tw_zeelandia_1661"],
  tw_tungning: ["bat_tw_zeelandia_1661", "bat_tw_penghu_1683"],
  tw_qing_early: ["bat_tw_penghu_1683", "bat_tw_zhuyigui_1721", "bat_tw_jiayi_defense_1787", "bat_tw_caiqian_1805"],
  tw_qing_late: ["bat_tw_mudanshe_1874", "bat_tw_keelung_1884", "bat_tw_tamsui_1884"],
  tw_japanese: ["bat_tw_aodi_landing_1895", "bat_tw_daxi_1895", "bat_tw_baguashan_1895", "bat_tw_buyuelou_1895", "bat_tw_zengwenxi_1895", "bat_tw_tapani_1915", "bat_tw_wushe_1930"],
  tw_postwar: ["bat_tw_guningtou_1949", "bat_tw_daerdan_1950", "bat_tw_nanri_1952", "bat_tw_yijiangshan_1955", "bat_tw_823_1958", "bat_tw_wuchiu_1965"],
  tw_modern: []
};

// 25 Authoritative Taiwan-Related Historic Battles Across Four Centuries
export const TAIWAN_RELATED_BATTLES = [
  {
    id: "bat_tw_dadu_war_1644",
    eraId: "tw_prehistoric",
    name: "大肚王國抗荷戰役 (大甲溪伏擊之戰)",
    year: 1644,
    period: "taiwanLens",
    locationAncient: "中臺灣大甲溪大肚社林邑",
    locationModern: "臺中市大甲區與清水區大甲溪流域",
    coordinates: [120.54, 24.28],
    parties: {
      invader: "荷蘭東印度公司遠征軍 (彼得·布恩中尉率兩百火繩槍隊)",
      defender: "大肚王國跨部落原住民勇士聯軍 (白晝之王甘馬轄·阿達夫統御)"
    },
    victor: "大肚王國取得防衛阻擊勝利",
    victorStatement: "拍瀑拉與巴布薩聯軍依託密林弓矢重挫荷軍，迫使荷蘭東印度公司簽訂和平互不侵犯協議",
    commanders: {
      invader: ["彼得·布恩 (Pieter Boon)"],
      defender: ["甘馬轄·阿達夫 (Kamachat Aslammie)"]
    },
    summary: "1644年荷蘭東印度公司為打通大員至雞籠陸路通道，派遣布恩中尉進攻大肚王國。甘馬轄·阿達夫率各社勇士於大甲溪河谷設伏，荷軍受阻傷亡慘重撤退。荷蘭被迫承認大肚王國自治地位，為臺灣原住民族捍衛家園之光輝戰史。",
    keyStrategies: [
      "依託中臺灣大甲溪密林竹塹設伏阻擊火槍隊",
      "以毒箭弓矢配合熟稔地形發動夜間逆襲",
      "堅壁清野迫使荷蘭遠征軍補給匱乏撤軍"
    ]
  },
  {
    id: "bat_tw_liaoluo_bay_1633",
    eraId: "tw_dutch_spanish",
    name: "料羅灣海戰 (鄭芝龍大破荷蘭東印度艦隊)",
    year: 1633,
    period: "taiwanLens",
    locationAncient: "福建金門料羅灣海面",
    locationModern: "金門縣金湖鎮料羅灣",
    coordinates: [118.42, 24.41],
    parties: {
      invader: "荷蘭東印度公司艦隊與海盜聯軍 (普特曼斯長官)",
      defender: "大明福建水師精銳 (鄭芝龍副總兵統率百餘戰船)"
    },
    victor: "大明福建水師輝煌全勝",
    victorStatement: "火攻奇襲焚毀荷蘭旗艦與戰艦多艘，荷蘭長官普特曼斯狼狽敗退大員",
    commanders: {
      invader: ["普特曼斯 (Hans Putmans)", "劉香"],
      defender: ["鄭芝龍", "鄒維璉"]
    },
    summary: "荷蘭東印度公司為逼迫明朝通商封鎖海峽。鄭芝龍統帥百餘艘火攻戰船於料羅灣順風發起火攻奇襲，焚毀荷蘭多艘主力大艦，普特曼斯敗退大員，奠定鄭氏掌握東亞航運制海權基礎。",
    keyStrategies: [
      "精確掌握風向施放滿載硫磺油料之火攻快船",
      "百艘艨艟戰船密集成群包圍敵大型夾板巨艦",
      "重砲火繩槍立體壓制全殲敵登陸海盜部隊"
    ]
  },
  {
    id: "bat_tw_keelung_1642",
    eraId: "tw_dutch_spanish",
    name: "基隆雞籠之戰 (荷蘭驅退西班牙之役)",
    year: 1642,
    period: "taiwanLens",
    locationAncient: "雞籠社寮島聖薩爾瓦多城",
    locationModern: "基隆市中正區和平島台船造船廠遺址",
    coordinates: [121.76, 25.15],
    parties: {
      invader: "荷蘭東印度公司進攻艦隊 (哈勞塞中校四艘主力戰艦)",
      defender: "西班牙駐雞籠防衛守軍 (波提羅長官率西班牙火槍隊)"
    },
    victor: "荷蘭軍隊攻克要塞取得全勝",
    victorStatement: "西班牙守軍開城投降全數撤退，荷蘭東印度公司自此完全壟斷全臺對外海運航路",
    commanders: {
      invader: ["哈勞塞 (Hendrik Harouse)"],
      defender: ["波提羅 (Gonzalo Portillo)"]
    },
    summary: "1642年8月荷蘭自大員派大艦隊北上攻佔基隆。荷軍佔領和平島制高點山丘架設重砲猛轟聖救主城，西班牙守軍彈盡援絕簽降。西班牙人結束十六年在臺統治返回馬尼拉，荷蘭完全掌控臺灣南北要塞。",
    keyStrategies: [
      "荷軍搶先佔領島上制高點山丘構築砲兵陣地",
      "巨型艦砲封鎖雞籠港阻絕西班牙外援船隻",
      "日夜猛轟堡壘城垣迫使守軍體面簽署降約"
    ]
  },
  {
    id: "bat_tw_zeelandia_1661",
    eraId: "tw_tungning",
    name: "熱蘭遮城戰役 (鄭成功攻臺驅荷之戰)",
    year: 1661,
    period: "taiwanLens",
    locationAncient: "臺灣大員熱蘭遮城 (安平)",
    locationModern: "臺南市安平區安平古堡",
    coordinates: [120.16, 23.00],
    parties: {
      invader: "明鄭延平王部隊 (鄭成功統帥兩萬五千水師)",
      defender: "荷蘭東印度公司駐臺灣守軍 (揆一長官)"
    },
    victor: "明鄭大軍輝煌全勝",
    victorStatement: "圍城九個月迫使荷蘭東印度公司簽字投降，收復臺灣設立承天府",
    commanders: {
      invader: ["鄭成功", "陳永華", "黃昭"],
      defender: ["揆一 (Frederick Coyett)", "阿爾多夫"]
    },
    summary: "鄭成功率四百餘艘戰船自料羅灣出海登陸鹿耳門，合圍熱蘭遮城九個月，烏特勒支堡決戰大獲全勝，荷督揆一簽約投降，結束荷蘭三十八年殖民統治。",
    keyStrategies: [
      "趁大潮突破鹿耳門天險奇襲禾寮港登陸",
      "修築長圍封鎖熱蘭遮城水源與外援艦隊",
      "砲轟烏特勒支堡制高點迫使荷軍開城投降"
    ]
  },
  {
    id: "bat_tw_penghu_1683",
    eraId: "tw_tungning",
    name: "澎湖海戰 (施琅大破劉國軒水師)",
    year: 1683,
    period: "taiwanLens",
    locationAncient: "澎湖群島娘媽宮、八罩島海域",
    locationModern: "澎湖縣馬公市娘媽宮海面",
    coordinates: [119.56, 23.56],
    parties: {
      invader: "大清水師提督部隊 (施琅水師主力三百艘)",
      defender: "明鄭東寧水師精銳 (劉國軒水師兩百艘)"
    },
    victor: "大清水師決定性空前大捷",
    victorStatement: "全殲東寧海軍主力，鄭克塽見大勢已去奉表納降，臺灣納入大清版圖",
    commanders: {
      invader: ["施琅", "董騰"],
      defender: ["劉國軒", "林陞", "邱輝"]
    },
    summary: "施琅率戰船三百艘進攻澎湖，劉國軒依託砲台死守。施琅利用信風實施五方合圍砲擊，激戰七晝夜焚燬明鄭戰船百餘艘。劉國軒敗回臺灣，促成鄭克塽降清。",
    keyStrategies: [
      "施琅精準掌握夏季西南季風風向發動順風奇襲",
      "五方合擊戰術，集中主力圍殲敵中央旗艦",
      "戰後善待俘虜撫慰將士，瓦解東寧抵抗意志"
    ]
  },
  {
    id: "bat_tw_zhuyigui_1721",
    eraId: "tw_qing_early",
    name: "朱一貴府城之役 (鴨母王破城稱中興王)",
    year: 1721,
    period: "taiwanLens",
    locationAncient: "臺灣府城南門與赤崁大營",
    locationModern: "臺南市中西區大南門城樓",
    coordinates: [120.21, 22.98],
    parties: {
      invader: "鴨母王朱一貴起義軍 (養鴨農民與天地會三萬義軍)",
      defender: "大清臺灣府守軍 (臺灣知府王珍、南路參將苗敬龍)"
    },
    victor: "起義軍攻克臺灣府城",
    victorStatement: "七日內席捲全臺攻佔府城，朱一貴登基稱中興王，改元永和復明衣冠",
    commanders: {
      invader: ["朱一貴", "杜君英", "翁飛國"],
      defender: ["王珍", "施世驃", "藍廷珍"]
    },
    summary: "因官吏橫徵暴斂，朱一貴率義軍於內門起事。義軍連克岡山、鳳山，進逼臺灣府城。清廷守軍潰敗，朱一貴入城登基建立政權。雖旋遭水師提督施世驃渡海鎮壓，但震動清廷徹查吏治。",
    keyStrategies: [
      "閩客軍民攜手合擊，以閃電戰突破清軍外圍防線",
      "善用民間香火神會凝聚數萬農民同仇敵愾",
      "開倉賑濟安撫府城市民贏得民心支持"
    ]
  },
  {
    id: "bat_tw_jiayi_defense_1787",
    eraId: "tw_qing_early",
    name: "嘉義諸羅城保衛戰 (全臺死守乾隆賜名嘉義)",
    year: 1787,
    period: "taiwanLens",
    locationAncient: "臺灣府諸羅縣城 (今嘉義東門)",
    locationModern: "嘉義市東區東門圓環與忠烈祠",
    coordinates: [120.45, 23.48],
    parties: {
      invader: "林爽文天地會起義大軍 (號稱十萬義軍三路圍城)",
      defender: "諸羅軍民堅守部隊 (知縣李調元、柴大紀將軍、鄉勇義民)"
    },
    victor: "清軍與諸羅軍民堅守成功",
    victorStatement: "殺馬煮革掘草根死守半年解圍，乾隆感其忠義降旨賜名諸羅縣為「嘉義縣」",
    commanders: {
      invader: ["林爽文", "莊大田"],
      defender: ["柴大紀", "福康安", "李調元"]
    },
    summary: "天地會林爽文起義橫掃中臺灣，重兵合圍諸羅城長達半年。城內斷糧，軍民殺馬嚼草根殊死抗擊數十次坑道火攻，堅守待援。大學士福康安渡海登陸直插諸羅解圍，乾隆皇帝大喜親賜「嘉義」縣名。",
    keyStrategies: [
      "依託土石城垣構築堅固壕溝抵禦火攻長圍",
      "軍民同舟共濟，官民同糧死守城池六個月",
      "福康安大軍自鹿港登陸閃擊敵背腹背夾擊"
    ]
  },
  {
    id: "bat_tw_caiqian_1805",
    eraId: "tw_qing_early",
    name: "王得祿平定蔡牽海盜之役 (鹿耳門海戰大捷)",
    year: 1805,
    period: "taiwanLens",
    locationAncient: "臺灣府鹿耳門外洋與滬尾外海",
    locationModern: "臺南市安南區鹿耳門溪口",
    coordinates: [120.12, 23.03],
    parties: {
      invader: "大清福建水師艦隊 (王得祿副將、李長庚提督)",
      defender: "東南海盜大首領蔡牽艦隊 (自號鎮海威武王，戰船百餘艘)"
    },
    victor: "大清福建水師取得決定性勝利",
    victorStatement: "擊沉巨型旗艦「大將艇」，蔡牽投海自盡，肅清東南沿海二十年海患",
    commanders: {
      invader: ["王得祿", "李長庚"],
      defender: ["蔡牽", "朱濆"]
    },
    summary: "東南海盜蔡牽縱橫閩臺自封海王，率百艘戰船進攻鹿耳門企圖奪取臺灣府城。王得祿將軍身先士卒突入敵陣血戰，以火球神機箭焚毀敵旗艦，蔡牽落海亡。王得祿因功晉封太子太保、水師提督。",
    keyStrategies: [
      "深入鹿耳門複雜淺灘沙洲設伏，誘敵深入分段截擊",
      "以快船火箭火球集中射擊敵旗艦帆檣阻其機動",
      "南北兩路水師鉗形合圍徹底切斷外洋退路"
    ]
  },
  {
    id: "bat_tw_mudanshe_1874",
    eraId: "tw_qing_late",
    name: "牡丹社石門要塞保衛戰 (排灣族抵禦日軍之役)",
    year: 1874,
    period: "taiwanLens",
    locationAncient: "臺灣府恆春石門天險要塞",
    locationModern: "屏東縣牡丹鄉石門古戰場",
    coordinates: [120.78, 22.12],
    parties: {
      invader: "大日本帝國侵臺遠征軍 (佐久間左馬太少佐指揮)",
      defender: "排灣族牡丹社與高士佛社勇士 (阿祿古父子率族人死守)"
    },
    victor: "排灣族勇士憑險狙擊重創日軍先頭部隊",
    victorStatement: "依託石門天險殊死抵抗，促使清廷正視臺灣全島主權派遣沈葆楨開山撫番",
    commanders: {
      invader: ["西鄉從道", "佐久間左馬太"],
      defender: ["阿祿古 (牡丹社頭目)", "阿利路"]
    },
    summary: "日軍藉琉球宮古島船難為由發兵登陸車城進犯牡丹社。頭目阿祿古父子率排灣族勇士扼守石門天險峽谷，以巨石土銃奮勇阻擊，佐久間少佐險遭擊斃。此役促成清廷派遣沈葆楨興築恆春古城與開拓後山。",
    keyStrategies: [
      "利用石門兩峰夾峙之險隘峽谷以巨石封鎖要道",
      "排灣族獵勇隱蔽於峭壁灌木叢精準狙殺敵軍先鋒",
      "以微弱兵力誓死捍衛部落尊嚴震撼日本軍部"
    ]
  },
  {
    id: "bat_tw_keelung_1884",
    eraId: "tw_qing_late",
    name: "基隆獅球嶺要塞戰役 (林朝棟棟軍重創法軍)",
    year: 1884,
    period: "taiwanLens",
    locationAncient: "臺灣省基隆廳獅球嶺要塞",
    locationModern: "基隆市仁愛區獅球嶺砲台",
    coordinates: [121.73, 25.12],
    parties: {
      invader: "法蘭西遠東艦隊海軍陸戰隊 (孤拔中將、李士卑少將)",
      defender: "淮軍與霧峰林家棟軍 (劉銘傳巡撫、林朝棟督統、曹志忠)"
    },
    victor: "大清守軍堅守獅球嶺挫敗法軍進逼",
    victorStatement: "死守八個月遏止法軍跨越獅球嶺奪取臺北府城，孤拔中將飲恨澎湖病逝",
    commanders: {
      invader: ["孤拔 (Amédée Courbet)"],
      defender: ["劉銘傳", "林朝棟", "曹志忠"]
    },
    summary: "中法戰爭法國艦隊奪取基隆外港，企圖翻越獅球嶺長驅直入臺北府城。劉銘傳命霧峰林家林朝棟率鄉勇「棟軍」與淮軍精銳憑險扼守。雙方在濃霧泥濘中肉搏數月，法軍傷亡慘重無法前進一步。",
    keyStrategies: [
      "扼守獅球嶺咽喉天險構築品字形堅固地堡",
      "霧峰林朝棟棟軍熟悉山林善用林地狙擊伏殺",
      "焦土沉船塞港阻敵利用基隆河深航艦砲"
    ]
  },
  {
    id: "bat_tw_tamsui_1884",
    eraId: "tw_qing_late",
    name: "滬尾淡水之役 (中法保臺大捷)",
    year: 1884,
    period: "taiwanLens",
    locationAncient: "臺灣府淡水廳滬尾沙崙海岸",
    locationModern: "新北市淡水區滬尾砲台與沙崙海水浴場",
    coordinates: [121.43, 25.17],
    parties: {
      invader: "法蘭西遠東艦隊海軍陸戰隊 (孤拔中將、利士比少將)",
      defender: "大清臺灣防衛守軍 (劉銘傳巡撫督師、孫開華提督)"
    },
    victor: "大清淮軍湘軍臺灣守軍輝煌大捷",
    victorStatement: "將法軍登陸精銳全數逐入海中斬獲甚眾，成功守住臺北府城門戶",
    commanders: {
      invader: ["利士比 (Sébastien Lespès)"],
      defender: ["劉銘傳", "孫開華", "章高元", "張李成"]
    },
    summary: "中法戰爭法國艦隊猛烈砲轟淡水港企圖奪取臺北府城。劉銘傳放棄基隆集中兵力保衛淡水。孫開華將軍設伏於沙崙黃槿防風林，待法軍深入以白刃肉搏殊死衝殺，法軍潰退登艦，打破法軍不敗神話。",
    keyStrategies: [
      "劉銘傳斷然沉船塞港並布設水雷阻敵深入淡水河",
      "孫開華利用海岸防風林掩蔽伏兵，待敵半渡而擊",
      "湘淮精銳步兵短兵相接白刃衝殺擊潰法軍"
    ]
  },
  {
    id: "bat_tw_aodi_landing_1895",
    eraId: "tw_japanese",
    name: "澳底登陸三貂角阻擊戰 (乙未保臺第一戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "基隆廳三貂堡澳底海灘",
    locationModern: "新北市貢寮區澳底海灘鹽寮公園",
    coordinates: [121.92, 25.05],
    parties: {
      invader: "大日本帝國近衛師團登陸大軍 (北白川宮能久親王統帥)",
      defender: "臺灣民主國守軍與地方鄉勇 (簡大獅、在地民防隊)"
    },
    victor: "日軍強行登陸，義軍浴血阻擊",
    victorStatement: "義軍憑藉三貂角險隘懸崖頑抗數日，揭開全臺長達五個月悲壯抗日序幕",
    commanders: {
      invader: ["北白川宮能久親王", "樺山資紀"],
      defender: ["簡大獅", "在地客閩鄉勇"]
    },
    summary: "1895年5月29日日軍避開基隆砲台，自三貂角澳底灘頭強行登陸。地方義勇軍與守軍扼守鹽寮海岸頑強阻擊，展開游擊肉搏。此役打響乙未抗日戰爭第一槍。",
    keyStrategies: [
      "依託海岸林木與沿海岩礁伏擊敵登陸駁船",
      "切斷澳底通往瑞芳山道阻滯日軍先頭搜索隊",
      "廣泛動員地方保甲展開敵後游擊牽制作戰"
    ]
  },
  {
    id: "bat_tw_daxi_1895",
    eraId: "tw_japanese",
    name: "大嵙崁峽谷抗日血戰 (桃園客家義軍伏擊之戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "新竹州大嵙崁溪谷 (大溪)",
    locationModern: "桃園市大溪區大漢溪兩岸",
    coordinates: [121.28, 24.88],
    parties: {
      invader: "大日本帝國近衛師團步兵聯隊 (坊城後章少佐)",
      defender: "臺灣義勇軍 (江國榮、徐驤客家義民軍五千餘人)"
    },
    victor: "臺灣客家義軍重創日軍先鋒部隊",
    victorStatement: "伏擊日軍於大漢溪峽谷斬敵百餘人，粉碎近衛師團快速南下侵略企圖",
    commanders: {
      invader: ["坊城後章少佐"],
      defender: ["徐驤", "江國榮", "黃娘盛"]
    },
    summary: "1895年7月日軍自臺北南進進攻大姑崁（大溪）。徐驤與地方義士江國榮設伏於大漢溪峽谷十三份，待敵半渡發起白刃突擊。日軍死傷慘重，坊城少佐險遭陣斬，被迫退回三峽求援。",
    keyStrategies: [
      "利用大漢溪峽谷險峻地形實施半渡擊之伏擊戰",
      "閩客軍民協同以土銃砍刀白刃衝鋒夜襲日軍大營",
      "設伏阻擊爭取南臺灣軍民集結布防寶貴時間"
    ]
  },
  {
    id: "bat_tw_baguashan_1895",
    eraId: "tw_japanese",
    name: "八卦山抗日戰役 (乙未保臺最烈血戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "臺灣省彰化八卦山制高點",
    locationModern: "彰化縣彰化市八卦山大佛風景區",
    coordinates: [120.55, 24.08],
    parties: {
      invader: "大日本帝國近衛師團 (北白川宮能久親王)",
      defender: "臺灣民主國抗日義勇軍 (吳湯興、徐驤、吳彭年黑旗軍)"
    },
    victor: "日軍慘勝攻佔彰化 (臺灣義軍英名永垂史冊)",
    victorStatement: "吳湯興、吳彭年壯烈殉國，日軍遭受侵臺以來最慘重傷亡代價",
    commanders: {
      invader: ["北白川宮能久親王", "山根信成"],
      defender: ["吳湯興", "徐驤", "吳彭年", "李士炳"]
    },
    summary: "日軍近衛師團渡過大肚溪進攻彰化八卦山要塞。客家義民領袖吳湯興、徐驤率義勇軍與吳彭年黑旗軍七營憑險死守，雙方展開長達數晝夜肉搏血戰。吳湯興、吳彭年壯烈成仁，為乙未抗日戰爭最悲壯之戰。",
    keyStrategies: [
      "依託八卦山制高點砲火俯射遏阻日軍渡大肚溪",
      "閩客軍民攜手並肩、黑旗軍與地方義民同袍死戰",
      "夜間逆襲深入日軍中軍大營重創侵略敵寇"
    ]
  },
  {
    id: "bat_tw_dapu_lin_1895",
    eraId: "tw_japanese",
    name: "大莆林之役 (雲林大林黑旗軍義民伏擊戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "嘉義縣大莆林庄 (今大林)",
    locationModern: "嘉義縣大林鎮與雲林斗南交界",
    coordinates: [120.47, 23.60],
    parties: {
      invader: "大日本帝國第二師團先鋒大隊",
      defender: "黑旗軍營官楊泗洪、黑旗軍勇士與地方抗日義軍"
    },
    victor: "臺灣守軍伏擊大捷重創日軍",
    victorStatement: "設伏於竹塹蔗田白刃斬獲甚眾，楊泗洪營官不幸中流彈殉國",
    commanders: {
      invader: ["山口素臣少將"],
      defender: ["楊泗洪 (營官)", "林義成"]
    },
    summary: "八卦山失陷後，黑旗軍楊泗洪退守大莆林（嘉義大林）。日軍沿鐵路南下，楊泗洪設伏於茂密甘蔗田中發起衝殺，日軍死傷累累潰退數里。楊泗洪追擊中彈成仁，為乙未南臺灣抗擊日軍最輝煌之伏擊戰。",
    keyStrategies: [
      "利用嘉南平原茂密甘蔗林海完美隱蔽伏兵",
      "誘敵深入狹長土道實施四面包圍白刃白刃肉搏",
      "夜戰火攻敵輜重車隊徹底瓦解日軍追擊節奏"
    ]
  },
  {
    id: "bat_tw_buyuelou_1895",
    eraId: "tw_japanese",
    name: "步月樓六堆抗日之役 (屏東客家保鄉血戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "臺南府鳳山縣港東中里佳冬步月樓",
    locationModern: "屏東縣佳冬鄉蕭家古厝步月樓遺址",
    coordinates: [120.55, 22.42],
    parties: {
      invader: "大日本帝國第二師團登陸部隊 (乃木希典中將)",
      defender: "六堆客家抗日義軍 (左堆總理蕭光明、鍾發春)"
    },
    victor: "日軍付出沈重代價攻佔步月樓",
    victorStatement: "蕭光明率六堆子弟巷戰至最後一人，展現保鄉衛土之浩然壯烈氣節",
    commanders: {
      invader: ["乃木希典", "山口素臣"],
      defender: ["蕭光明", "鍾發春", "蕭昇祥"]
    },
    summary: "1895年10月乃木希典率日軍登陸枋寮進犯六堆客家庄。左堆總理蕭光明率義軍以佳冬步月樓堅固紅磚外牆為堡壘死守，以鳥銃土砲肉搏阻擊。蕭光明兩子壯烈犧牲，寫下南臺灣抗日最可歌可泣之一頁。",
    keyStrategies: [
      "利用傳統客家圍龍屋宅院與高聳步月樓為堅固防禦掩體",
      "六堆鄉親戶戶動員婦孺運送彈藥糧草浴血死守",
      "巷戰肉搏逐屋爭奪重創日軍先頭搜索大隊"
    ]
  },
  {
    id: "bat_tw_zengwenxi_1895",
    eraId: "tw_japanese",
    name: "曾文溪終極決戰 (抗日第一烈士徐驤成仁)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "臺南府曾文溪兩岸渡口",
    locationModern: "臺南市麻豆區與善化區曾文溪畔",
    coordinates: [120.28, 23.16],
    parties: {
      invader: "大日本帝國近衛師團主力部隊",
      defender: "徐驤田賦軍與黑旗軍殘部 (抗日第一烈士徐驤)"
    },
    victor: "日軍憑火砲重兵突破防線",
    victorStatement: "徐驤轉戰全臺十二戰身受數十創，臨終大呼不負祖宗，壯烈成仁",
    commanders: {
      invader: ["北白川宮能久親王"],
      defender: ["徐驤 (客家秀才)", "林義成"]
    },
    summary: "徐驤自苗栗、彰化一路轉戰南下。1895年10月在曾文溪扼守臺南府城北門戶，與日軍爆發殊死肉搏。徐驤身先士卒衝入敵陣，連斬數敵後身中數十彈壯烈殉國，被後世史家尊為「臺灣抗日第一烈士」。",
    keyStrategies: [
      "依託曾文溪泥沼天險築土壘頑抗敵優勢兵力",
      "抱定必死報國之志連環衝殺牽制敵軍主力渡溪",
      "以個人生命實踐民族氣節，激勵全臺百年不屈意志"
    ]
  },
  {
    id: "bat_tw_tapani_1915",
    eraId: "tw_japanese",
    name: "噍吧哖西來庵決戰 (玉井虎頭山最後抗暴)",
    year: 1915,
    period: "taiwanLens",
    locationAncient: "臺南廳噍吧哖虎頭山高地",
    locationModern: "臺南市玉井區虎頭山要塞",
    coordinates: [120.46, 23.12],
    parties: {
      invader: "大日本帝國臺灣總督府警察與憲兵聯隊",
      defender: "余清芳抗日起義軍 (農民信仰義軍兩千餘人)"
    },
    victor: "日軍憑現代火器優勢攻陷陣地",
    victorStatement: "余清芳壯烈就義，促使總督府徹底放棄軍事高壓改採文官內地延長統治",
    commanders: {
      invader: ["安東貞美總督", "福森警視"],
      defender: ["余清芳", "江定", "羅俊"]
    },
    summary: "余清芳、江定在玉井虎頭山聚眾誓師抗日。義民以大刀長矛對抗日軍火砲機槍，血戰數晝夜後陣地失守。余清芳被捕從容就義，此戰為日治時期漢人最後一次大型武裝抗暴，開啟隨後文協非暴力啟蒙運動。",
    keyStrategies: [
      "依託玉井虎頭山陡峭山勢構築秘密營壘抗擊敵圍",
      "利用夜間暴雨奇襲日本支廳繳獲現代槍械彈藥",
      "堅貞不屈從容就義喚醒臺灣全島民族自主意識"
    ]
  },
  {
    id: "bat_tw_wushe_1930",
    eraId: "tw_japanese",
    name: "霧社馬赫坡社要塞保衛戰 (莫那魯道抗暴之役)",
    year: 1930,
    period: "taiwanLens",
    locationAncient: "臺中州能高郡馬赫坡岩窟",
    locationModern: "南投縣仁愛鄉廬山溫泉馬赫坡古戰場",
    coordinates: [121.18, 24.03],
    parties: {
      invader: "大日本帝國臺灣軍司令部 (出動步兵聯隊、飛機與毒氣)",
      defender: "賽德克族馬赫坡等六社原住民族勇士 (莫那·魯道頭目)"
    },
    victor: "原住民族勇士死守數月全數壯烈成仁",
    victorStatement: "以原始獵槍對抗現代毒氣飛機堅守不屈，震撼國際聯盟關注原住民族生存權",
    commanders: {
      invader: ["鎌田彌彥少將"],
      defender: ["莫那·魯道", "達多·莫那"]
    },
    summary: "霧社事件爆發後，日軍出動三千正規軍、大砲、飛機與國際公約禁用的糜爛性毒氣瓦斯圍攻馬赫坡岩窟。莫那·魯道率族人退入天然險阻溶洞頑強抗擊五十餘日，最後彈盡糧絕於深山巨木下自戕成仁，震驚國際社會。",
    keyStrategies: [
      "依託馬赫坡懸崖峭壁與天然岩洞構築易守難攻死守陣地",
      "熟悉中央山脈原始叢林實施高山狙擊與陷阱戰術",
      "以寧死不屈之祖靈信仰戰鬥至最後一兵一卒"
    ]
  },
  {
    id: "bat_tw_guningtou_1949",
    eraId: "tw_postwar",
    name: "金門古寧頭戰役 (保衛臺灣穩定海峽第一仗)",
    year: 1949,
    period: "taiwanLens",
    locationAncient: "金門縣金寧鄉古寧頭海灘",
    locationModern: "金門縣金寧鄉古寧頭戰史館",
    coordinates: [118.31, 24.48],
    parties: {
      invader: "中國人民解放軍第二十八軍登陸突擊梯隊三個團",
      defender: "中華民國國軍第十二兵團、金防部 (胡璉司令官、高魁元軍長)"
    },
    victor: "中華民國國軍決定性全殲大捷",
    victorStatement: "殲滅登陸部隊五千餘人、俘獲三千餘人，粉碎跨海奪臺戰略企圖",
    commanders: {
      invader: ["蕭鋒", "孫雲秀"],
      defender: ["胡璉", "高魁元", "湯恩伯"]
    },
    summary: "1949年10月解放軍突襲金門古寧頭海灘，國軍「金門之熊」戰車部隊機動衝擊，海空聯手摧毀敵登陸船隻斷其退路，第十二兵團生力軍大舉反包圍，血戰三晝夜全殲登陸敵軍，奠定兩岸分治海峽安全第一基石。",
    keyStrategies: [
      "海軍空軍協同全數摧毀敵渡海木船斷其後援",
      "M5A1輕戰車「金門之熊」灘頭橫掃火力壓制",
      "胡璉將軍及時投入生力軍形成鐵壁反包圍聚殲"
    ]
  },
  {
    id: "bat_tw_daerdan_1950",
    eraId: "tw_postwar",
    name: "大二膽島戰役 (史恆豐營長以寡敵眾立奇功)",
    year: 1950,
    period: "taiwanLens",
    locationAncient: "金門縣大膽島、二膽島灘頭",
    locationModern: "金門縣烈嶼鄉大膽島生明廳",
    coordinates: [118.20, 24.38],
    parties: {
      invader: "中國人民解放軍登陸加強營 (七百餘精銳渡海突擊)",
      defender: "中華民國陸軍第七十五師第二二五團第一營 (史恆豐少校營長不到三百守軍)"
    },
    victor: "中華民國守軍輝煌全勝",
    victorStatement: "以寡敵眾生擒敵營長鮑成以下兩百餘人、擊斃三百餘人，蔣經國讚為「英雄骨氣」",
    commanders: {
      invader: ["鮑成 (營長)"],
      defender: ["史恆豐 (營長)", "賴生明 (傳令兵)"]
    },
    summary: "1950年7月解放軍趁大霧夜襲金門門戶大膽島與二膽島。史恆豐營長沈著冷靜，指揮不到三百兵力依託花崗岩碉堡殊死迎敵。傳令兵賴生明冒死穿過火網傳遞軍令，全營將士發動刺刀反撲全殲敵軍，立下「島孤人不孤」之傳奇功勳。",
    keyStrategies: [
      "扼守大膽島中央制高點碉堡分割包圍登陸敵軍",
      "傳令兵冒死穿透封鎖線達成南北夾擊全面反攻",
      "白刃肉搏殊死衝鋒粉碎敵軍奪取外島要塞企圖"
    ]
  },
  {
    id: "bat_tw_nanri_1952",
    eraId: "tw_postwar",
    name: "南日島突擊大捷 (國軍跨海突擊殲敵之戰)",
    year: 1952,
    period: "taiwanLens",
    locationAncient: "福建莆田南日島海域",
    locationModern: "金門防區北側南日島海域",
    coordinates: [119.50, 25.20],
    parties: {
      invader: "中華民國國軍突擊支隊 (胡璉司令官指揮陸空協同)",
      defender: "中國人民解放軍南日島守備營與援軍"
    },
    victor: "中華民國國軍突擊全勝",
    victorStatement: "全殲島上守軍與增援部隊俘獲八百餘人，安全撤回金門，震動東南沿海",
    commanders: {
      invader: ["胡璉", "吉星文"],
      defender: ["解放軍守備營長"]
    },
    summary: "1952年10月胡璉將軍調集精銳渡海發動南日島突擊戰。陸海空協同以閃電戰奪取灘頭，徹底包圍擊潰島上守軍與跨海增援部隊，俘獲敵軍八百餘人、物資無數後主動安全撤退，展現國軍強大海空機動打擊能力。",
    keyStrategies: [
      "高度保密發動夜間兩棲跨海閃電登陸",
      "佔領島上制高點以強大火力圍殲增援部隊",
      "達成戰略目標後迅速撤出防範敵大軍反撲"
    ]
  },
  {
    id: "bat_tw_yijiangshan_1955",
    eraId: "tw_postwar",
    name: "一江山島保衛戰 (王生明將軍全島成仁促美防禦協定)",
    year: 1955,
    period: "taiwanLens",
    locationAncient: "浙江沿海一江山島防衛陣地",
    locationModern: "外海一江山島要塞 (促成臺北一江街紀念)",
    coordinates: [121.40, 25.80],
    parties: {
      invader: "中國人民解放軍海陸空三軍登陸大軍",
      defender: "中華民國一江山地區守備司令部 (王生明司令官率千餘將士)"
    },
    victor: "共軍攻佔一江山，守軍壯烈殉國",
    victorStatement: "苦戰三晝夜引爆最後手榴彈全員成仁，震撼美國國會火速批准《中美共同防禦條約》",
    commanders: {
      invader: ["張愛萍", "彭德清"],
      defender: ["王生明 (追晉陸軍少將)"]
    },
    summary: "1955年1月解放軍首度動用陸海空立體火力狂轟一江山島。王生明司令官指揮千餘守軍堅壁抗擊數萬發砲彈，擊沉敵登陸艦多艘，血戰三晝夜陣地全毀。王生明引爆最後一枚手榴彈成仁。此役促使大陳島萬餘軍民安全撤退臺灣，美方火速簽署《中美共同防禦條約》確立臺灣安全中線。",
    keyStrategies: [
      "依託坑道工事抵禦敵海空數萬發砲彈飽和轟炸",
      "以平射砲重重封鎖登陸灘頭給敵登陸梯隊慘重傷亡",
      "以死守到底誓死不降之軍人氣節換取臺海防禦條約保障"
    ]
  },
  {
    id: "bat_tw_823_1958",
    eraId: "tw_postwar",
    name: "八二三臺海砲戰 (確立海峽防衛分治分水嶺)",
    year: 1958,
    period: "taiwanLens",
    locationAncient: "金門列島防區海空周邊",
    locationModern: "金門縣大金門太武山翠谷",
    coordinates: [118.33, 24.45],
    parties: {
      invader: "中國人民解放軍福建前線砲兵基地群",
      defender: "中華民國金門防衛司令部 (俞大維部長、胡璉司令官)"
    },
    victor: "中華民國國軍堅守成功 (確立兩岸海峽分治現狀)",
    victorStatement: "承受47萬發砲彈狂轟誓死守護，八吋巨砲精準還擊促成停火",
    commanders: {
      invader: ["葉飛", "張翼翔"],
      defender: ["胡璉", "俞大維", "吉星文 (殉國)", "郝柏村"]
    },
    summary: "1958年8月23日解放軍突向金門狂轟六萬發砲彈。俞大維部長在太武山親臨前線受創，國軍將士依託地下花崗岩坑道英勇頑抗。空軍以響尾蛇飛彈首奪空戰大捷，國軍以美製八吋自走重砲重擊廈門車站指揮所，確立臺海冷戰防衛中線至今。",
    keyStrategies: [
      "金門地下花崗岩坑道堡壘發揮百分之百避彈生存效能",
      "國軍空軍F-86首創響尾蛇空對空飛彈全勝紀錄牢控制空權",
      "引進八吋美製自走重砲實施高精度毀滅性反擊"
    ]
  },
  {
    id: "bat_tw_wuchiu_1965",
    eraId: "tw_postwar",
    name: "烏坵海戰 (海軍將士浴血守衛臺海海疆之役)",
    year: 1965,
    period: "taiwanLens",
    locationAncient: "烏坵嶼南方外海海域",
    locationModern: "金門縣烏坵鄉外海",
    coordinates: [119.45, 24.98],
    parties: {
      invader: "中國人民解放軍海軍快艇突擊群",
      defender: "中華民國海軍巡邏艦隊 (臨淮艦、山海艦)"
    },
    victor: "雙方互有傷亡，國軍戰略轉向守勢固守",
    victorStatement: "海軍官兵殊死抵抗擊沉敵快艇多艘，確立臺澎防衛固守作戰指導方針",
    commanders: {
      invader: ["魏垣武 (東海艦隊副司令)"],
      defender: ["陳利民 (臨淮艦長)", "何季澎"]
    },
    summary: "1965年11月解放軍魚雷快艇突襲護航烏坵物資之國軍臨淮艦。艦長陳利民率官兵奮勇開砲擊沉敵快艇四艘，臨淮艦不幸中雷沉沒，多名官兵壯烈犧牲。此戰後國軍正式確立以「防衛固守、有效嚇阻」為核心之現代臺海防禦戰略。",
    keyStrategies: [
      "以艦砲密集火力壓制近身魚雷快艇夜間狼群戰術",
      "臨危不亂組織損管抗沉誓死堅守戰鬥崗位",
      "促進國軍海空聯合作戰與反艦飛彈現代化換裝"
    ]
  }
];
`;

fs.writeFileSync(outputPath, scriptContent, 'utf8');
console.log('Successfully wrote super-expanded taiwanLensData.js: 80 Events, 25 Battles, and 41 Dedicated Figures!');
