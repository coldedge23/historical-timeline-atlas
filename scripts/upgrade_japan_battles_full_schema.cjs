const fs = require('fs');
const path = require('path');

const UPGRADED_BATTLES = [
  {
    id: "bat_jp_dannoura_1185",
    eraId: "jp_ancient_medieval",
    name: "壇之浦海戰 (源平合戰平家覆滅決戰)",
    year: 1185,
    period: "japanAtlas",
    locationAncient: "長門國壇之浦海面",
    locationModern: "山口縣下關市關門海峽壇之浦",
    coordinates: [130.95, 33.96],
    summary: "1185年源義經統帥源氏水師於關門海峽壇之浦決戰平氏。義經巧妙利用潮水漲退轉向奇策反擊，以弓箭精準射擊敵船舵手，平家全線潰散。八歲安德天皇抱三神器投海，平家一族覆滅，拉開鎌倉幕府武家政權序幕。",
    attacker: {
      factionName: "源氏追討水師",
      faction: "kamakura",
      commanders: [
        { name: "源義經", title: "源氏水師總大將 / 九郎判官", figureId: "fig_jp_minamoto_yoshitsune" },
        { name: "梶原景時", title: "軍監 (逆櫓論爭)" },
        { name: "田所四郎", title: "水軍名將" }
      ],
      forcesEstimate: "戰船約 840 艘，兵力約 30,000 人",
      casualtiesEstimate: "傷亡數百人，獲得輝煌全勝"
    },
    defender: {
      factionName: "平家西國水師主力",
      faction: "heike",
      commanders: [
        { name: "平宗盛", title: "平家總帥 / 前內大臣 (被俘斬首)" },
        { name: "平知盛", title: "平家猛將 (負錨投海殉難)" },
        { name: "平教經", title: "能登守 (八艘跳追殺義經後投海)" }
      ],
      forcesEstimate: "戰船約 500 艘，兵力約 18,000 人",
      casualtiesEstimate: "全軍覆滅，安德天皇自盡，平家滿門投海"
    },
    victor: "attacker",
    victorStatement: "源義經神速八艘跳穿梭亂陣，平知盛負錨投海，平家滿門投海覆滅",
    tactics: [
      "掌握潮流時機：靜待關門海峽急流自西向東轉為自東向西逆轉時機發動順流總攻",
      "集中射殺舵手：違背傳統武士單挑禮儀，嚴令弓箭手專門狙殺平家舵手使敵船失控",
      "八艘跳貼身戰：源義經在敵船間敏捷連跳避開平教經死鬥，直搗敵指揮旗艦"
    ],
    strategicOutcome: "平家長達二十餘年的專權政權被徹底連根拔起，源賴朝得以建立日本首個武家政權鎌倉幕府。",
    significance: "終結平安時代貴族公家掌權時代，確立武家主宰日本政治達近七百年之起點。"
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
    summary: "忽必烈派出十四萬大軍分江南軍與東路軍征討日本。鎌倉幕府執權北條時宗下令沿博多灣修築二十公里石造防壘死守。元軍登陸受挫滯留海上兩個月，八月強烈颱風「神風」襲來，元軍戰艦大半覆沒，全線潰退。",
    attacker: {
      factionName: "大元蒙古征日東征軍",
      faction: "yuan",
      commanders: [
        { name: "范文虎", title: "江南軍統帥" },
        { name: "忻都", title: "東路軍蒙古將領" },
        { name: "阿刺罕", title: "大軍統帥" }
      ],
      forcesEstimate: "戰艦 4,400 艘，兵力 142,000 人 (蒙古、漢軍、高麗聯軍)",
      casualtiesEstimate: "遭颱風覆沒加斬首溺斃約 100,000 餘人，僅少數殘存脫逃"
    },
    defender: {
      factionName: "鎌倉幕府抗元守軍",
      faction: "kamakura",
      commanders: [
        { name: "北條時宗", title: "鎌倉幕府第八代執權", figureId: "fig_jp_hojo_tokimune" },
        { name: "少貳景資", title: "九州防禦指揮官" },
        { name: "竹崎季長", title: "肥後御家人 (先登肉搏)" }
      ],
      forcesEstimate: "九州御家人與武士聯軍約 40,000 人",
      casualtiesEstimate: "防壘攻防戰傷亡數千人"
    },
    victor: "defender",
    victorStatement: "二十公里防壘死守兩月，強烈颱風神風覆沒元軍千艘戰艦",
    tactics: [
      "修築防壘工事：戰前動員數萬軍民修築高兩公尺、長二十公里的防石壘，阻斷騎兵登陸",
      "夜襲游擊接舷：乘小型快船夜襲元軍巨型連環艦隊，縱火白刃肉搏癱瘓其遠程回回砲",
      "持久阻滯待變：堅壁清野拖延戰局達兩個月，迫使元軍在瘟疫與夏季颱風季深陷絕境"
    ],
    strategicOutcome: "忽必烈兩度東征皆告慘敗，元朝終生放棄進攻日本，東亞海權格局底定。",
    significance: "日本歷史上首次也是極少數成功擊退外族大規模海上入侵，孕育出「神國不滅」之文化神話。"
  },
  {
    id: "bat_jp_itsukushima_1555",
    eraId: "jp_sengoku",
    name: "嚴島合戰 (毛利元就暴風雨奇襲破陶晴賢)",
    year: 1555,
    period: "japanAtlas",
    locationAncient: "安藝國嚴島宮島",
    locationModern: "廣島縣廿日市市宮島町嚴島神社",
    coordinates: [132.32, 34.30],
    summary: "1555年，毛利元就以離間誘敵計將陶晴賢兩萬大軍誘至狹窄的嚴島宮島。在暴風雨暗夜中，元就率四千精兵登陸，小早川隆景水軍封鎖海路，合圍突襲陶軍本陣。陶晴賢自刃，毛利氏以弱勝強吞併西國十國。",
    attacker: {
      factionName: "毛利氏水陸聯軍",
      faction: "mori",
      commanders: [
        { name: "毛利元就", title: "安藝領主 / 戰國第一謀將", figureId: "fig_jp_mori_motonari" },
        { name: "吉川元春", title: "毛利兩川猛將 / 吉川軍指揮", figureId: "fig_jp_mori_motonari" },
        { name: "小早川隆景", title: "水軍統帥 / 封鎖海路", figureId: "fig_jp_mori_motonari" }
      ],
      forcesEstimate: "精銳步兵與村上水軍約 4,000 人，戰船百餘艘",
      casualtiesEstimate: "傷亡約 300 - 500 人，以極小代價獲全勝"
    },
    defender: {
      factionName: "大內陶氏西國主力",
      faction: "ouchi",
      commanders: [
        { name: "陶晴賢", title: "大內氏權臣 (戰敗於山中切腹)", figureId: "fig_jp_mori_motonari" },
        { name: "弘中隆包", title: "陶家智將 (駒之林奮戰陣亡)" }
      ],
      forcesEstimate: "西國名門精銳大軍約 20,000 - 25,000 人",
      casualtiesEstimate: "陣亡 4,700 餘人，數千人被俘，陶晴賢自刃"
    },
    victor: "attacker",
    victorStatement: "利用暴風雨暗夜登陸包圍敵軍本陣，陶晴賢敗亡自盡，毛利氏奠定西國霸主地位",
    tactics: [
      "修築宮尾誘餌：在宮島修築看似脆弱的宮尾小城，引誘自大的陶晴賢全軍渡海圍攻",
      "能島水軍同盟：以三矢之訓結好村上水軍，在戰役當日徹底斷絕陶軍船隻退路",
      "暴風雨夜突擊：利用海面驚濤駭浪麻痺敵守軍，自包之浦繞道山脊居高臨下反向穿插"
    ],
    strategicOutcome: "大內氏勢力土崩瓦解，毛利氏迅速接收周防、長門，一躍成為中國地方霸主。",
    significance: "日本戰國三大夜戰之一，毛利元就神機妙算之代表作，徹底改變西日本地緣政治。"
  },
  {
    id: "bat_jp_okehazama_1560",
    eraId: "jp_sengoku",
    name: "桶狹間奇襲之戰 (信長兩千輕騎斬殺今川義元)",
    year: 1560,
    period: "japanAtlas",
    locationAncient: "尾張國桶狹間田樂窪",
    locationModern: "愛知縣豐明市榮町桶狹間古戰場",
    coordinates: [136.97, 35.05],
    summary: "今川義元率兩萬五千大軍西上上洛，前鋒攻陷織田諸砦。織田信長於清洲城跳《敦盛》誓師，冒狂風驟雨率三千精兵翻山越嶺，直搗今川田樂窪本陣，斬殺義元，震驚全東瀛。",
    attacker: {
      factionName: "織田氏尾張精銳突擊隊",
      faction: "oda",
      commanders: [
        { name: "織田信長", title: "尾張守護代 / 總大將", figureId: "fig_jp_oda_nobunaga" },
        { name: "毛利新介", title: "旗本馬迴 (斬下今川義元首級)" },
        { name: "服部小平太", title: "旗本馬迴 (率先長矛刺中義元)" }
      ],
      forcesEstimate: "清洲城直屬騎兵與鐵砲隊約 2,500 - 3,000 人",
      casualtiesEstimate: "傷亡約 300 餘人"
    },
    defender: {
      factionName: "今川氏東海道西上大軍",
      faction: "imagawa",
      commanders: [
        { name: "今川義元", title: "東海道第一弓取 / 今川宗家當主 (陣亡)", figureId: "fig_jp_imagawa_yoshimoto" },
        { name: "松平元康", title: "前鋒大將 (德川家康，攻下丸根砦)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "朝比奈泰朝", title: "今川家重臣 (攻下鷲津砦)" }
      ],
      forcesEstimate: "全軍 25,000 人 (田樂窪本陣約 5,000 人)",
      casualtiesEstimate: "陣亡 2,500 餘人，總大將今川義元首級被割，全軍崩潰"
    },
    victor: "attacker",
    victorStatement: "信長乘暴雨疾馳田樂窪突襲今川本陣，毛利新介討取義元首級，名震東瀛",
    tactics: [
      "情報精準掌握：善照寺砦偵查騎兵回報今川本陣於田樂窪狹谷飲酒歇息的關鍵情報",
      "天候掩護奇襲：午後突降特大暴雨雷鳴，風雨迎面吹向今川軍，信長大軍神速掩殺",
      "中央直搗本陣：不理會各路散開的前鋒，集結全軍尖刀兵力直取今川義元旗蓋帥旗"
    ],
    strategicOutcome: "今川氏一蹶不振走向覆亡；松平元康脫離今川獨立奪回岡崎城，與信長締結「清洲同盟」。",
    significance: "織田信長「天下布武」統一大業之起點，日本歷史上最具戲劇性之戰略奇襲大逆轉。"
  },
  {
    id: "bat_jp_kawanakajima_1561",
    eraId: "jp_sengoku",
    name: "第四次川中島會戰 (信玄鶴翼陣 vs 謙信車懸之陣)",
    year: 1561,
    period: "japanAtlas",
    locationAncient: "信濃國川中島八幡原",
    locationModern: "長野縣長野市小島田町八幡原古戰場公園",
    coordinates: [138.19, 36.60],
    summary: "戰國雙雄武田信玄與上杉謙信在川中島展開第四次也是最慘烈交鋒。山本勘助獻啄木鳥戰法，謙信識破濃霧中夜渡千曲川下山，清晨突襲八幡原信玄本陣。雙方在八幡原白刃死鬥，傳說謙信單騎衝入本陣三斬信玄，信玄以軍配格擋。",
    attacker: {
      factionName: "上杉越後毘沙門精銳",
      faction: "uesugi",
      commanders: [
        { name: "上杉謙信", title: "越後國主 / 毘沙門天化身", figureId: "fig_jp_uesugi_kenshin" },
        { name: "柿崎景家", title: "越後先鋒猛將" },
        { name: "直江景綱", title: "妻女山本陣留守守備" }
      ],
      forcesEstimate: "越後大軍約 13,000 人 (八幡原突擊約 8,000 人)",
      casualtiesEstimate: "陣亡約 3,400 人，負傷 4,000 人 (傷亡率過半)"
    },
    defender: {
      factionName: "武田甲斐赤備軍團",
      faction: "takeda",
      commanders: [
        { name: "武田信玄", title: "甲斐之虎 / 武田宗家當主", figureId: "fig_jp_takeda_shingen" },
        { name: "武田信繁", title: "副將兼胞弟 (典廄，殿後英勇戰死)" },
        { name: "山本勘助", title: "軍師 (策劃啄木鳥戰術，引咎自刃)" }
      ],
      forcesEstimate: "甲斐信濃軍團 20,000 人 (本陣 8,000 人，別動隊 12,000 人)",
      casualtiesEstimate: "陣亡約 4,600 人，負傷 5,000 人，信繁與勘助陣亡"
    },
    victor: "defender",
    victorStatement: "武田軍別動隊回援夾擊迫使上杉軍撤退，但信玄痛失胞弟信繁與軍師勘助",
    tactics: [
      "車懸輪番突擊：上杉軍以圓形陣勢輪流接替衝鋒，使鋒線永遠保持生力軍打擊敵陣",
      "反制啄木鳥計：謙信見妻女山炊煙識破別動隊繞道，悄無聲息夜渡千曲川反客為主",
      "軍配單騎交鋒：謙信單騎衝入敵帥帳拔刀三劈，信玄泰然端坐以鐵甲軍配擋下致命斬"
    ],
    strategicOutcome: "雙方傷亡超過七成，武田氏保住北信濃霸權，上杉氏確保越後安全，兩雄從此不再正面主力血戰。",
    significance: "日本戰國時代戰術陣形（車懸之陣 vs 鶴翼之陣）與名將武藝對決之千古巔峰。"
  },
  {
    id: "bat_jp_ane_river_1570",
    eraId: "jp_sengoku",
    name: "姊川之戰 (織田德川聯軍血破淺井朝倉)",
    year: 1570,
    period: "japanAtlas",
    locationAncient: "近江國淺井郡姊川野村",
    locationModern: "滋賀縣長濱市野村町姊川河畔",
    coordinates: [136.28, 35.42],
    summary: "金崎之險後，織田信長與盟友德川家康統帥聯軍包圍小谷城。雙方在姊川兩岸正面對決，淺井長政部隊勇不可當連破織田十三道陣線。危急之際，德川家康迂迴強渡姊川側擊朝倉本陣，一舉扭轉局勢打破信長包圍網。",
    attacker: {
      factionName: "織田德川同盟大軍",
      faction: "oda",
      commanders: [
        { name: "織田信長", title: "織田軍總大將", figureId: "fig_jp_oda_nobunaga" },
        { name: "德川家康", title: "德川軍總帥 (側翼突破關鍵)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "本多忠勝", title: "三河第一勇將 (單騎突入朝倉陣)", figureId: "fig_jp_honda_tadakatsu" }
      ],
      forcesEstimate: "織田 23,000 人，德川 5,000 人，合計約 28,000 人",
      casualtiesEstimate: "傷亡約 800 - 1,000 人"
    },
    defender: {
      factionName: "淺井朝倉近江越前聯軍",
      faction: "azai",
      commanders: [
        { name: "淺井長政", title: "北近江名將 / 淺井家當主", figureId: "fig_jp_azai_nagamasa" },
        { name: "朝倉景健", title: "越前朝倉軍總大將" },
        { name: "磯野員昌", title: "淺井家猛將 (連破織田十三陣)" }
      ],
      forcesEstimate: "淺井 8,000 人，朝倉 10,000 人，合計約 18,000 人",
      casualtiesEstimate: "陣亡約 2,500 餘人，朝倉陣線徹底崩潰"
    },
    victor: "attacker",
    victorStatement: "德川家康率部右翼側擊朝倉本陣，織田軍頂住淺井十三段突擊後全線反推",
    tactics: [
      "十三段穿透突進：淺井軍集中精銳正面突破，連穿織田軍十三道本陣護衛線",
      "德川側翼迂迴渡河：德川家康果斷率三河精銳強渡姊川淺灘，出其不意打擊朝倉軍側背",
      "火繩槍排射反擊：稻葉一鐵等西美濃三人眾自側翼以火繩槍交叉射擊，阻截磯野員昌"
    ],
    strategicOutcome: "淺井朝倉主力受重創退守小谷城與一乘谷，信長取得進攻北近江的戰略主動權。",
    significance: "德川家康在戰役中展現三河武士驚人戰力，鞏固清洲同盟軍事信任。"
  },
  {
    id: "bat_jp_mikata_1573",
    eraId: "jp_sengoku",
    name: "三方原之戰 (武田信玄鐵騎大破德川家康)",
    year: 1573,
    period: "japanAtlas",
    locationAncient: "遠江國敷知郡三方原台地",
    locationModern: "靜岡縣濱松市中區三方原町古戰場",
    coordinates: [137.71, 34.78],
    summary: "武田信玄三萬大軍西上上洛，目視濱松城而過故意蔑視家康。家康不顧信長反對率八千守軍背水追擊。在三方原雪地高原，武田以魚鱗之陣正面碾碎德川軍。家康狼狽逃回濱松城大開城門行空城計，畫顰像銘記恥辱。",
    attacker: {
      factionName: "武田氏西上上洛大軍",
      faction: "takeda",
      commanders: [
        { name: "武田信玄", title: "甲斐之虎 / 上洛大將軍", figureId: "fig_jp_takeda_shingen" },
        { name: "山縣昌景", title: "赤備先鋒隊長" },
        { name: "馬場信春", title: "不死身鬼美濃" }
      ],
      forcesEstimate: "精騎與步兵約 27,000 - 30,000 人",
      casualtiesEstimate: "傷亡約 400 - 500 人，大獲全勝"
    },
    defender: {
      factionName: "德川織田守軍",
      faction: "tokugawa",
      commanders: [
        { name: "德川家康", title: "三河遠江領主 (狼狽潰退)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "酒井忠次", title: "德川家老 (濱松城擊酒井太鼓)" },
        { name: "鳥居忠廣", title: "德川近衛 (殿後戰死)" }
      ],
      forcesEstimate: "德川 8,000 人，織田援軍 3,000 人，合計約 11,000 人",
      casualtiesEstimate: "陣亡 1,000 - 2,000 餘人，多名譜代大將戰死"
    },
    victor: "attacker",
    victorStatement: "武田信玄以魚鱗陣全殲德川野戰部隊，家康畫顰像銘記一生慘敗",
    tactics: [
      "過門不入誘敵：信玄無視濱松城故意掠過，激怒家康出城野戰落入預設開闊台地",
      "魚鱗鑿穿戰術：信玄以集中錐形之魚鱗陣猛烈鑿穿德川單薄鶴翼陣兩翼",
      "空城計疑敵退守：家康逃回濱松城下令大開城門、點燃火炬擊太鼓，武田軍疑有伏兵未強攻"
    ],
    strategicOutcome: "信玄取得東海道壓倒性優勢，信長陷入空前危機；但信玄隨後病重回軍病逝駒場，信長包圍網崩解。",
    significance: "德川家康一生最大挫敗與最深刻軍事教訓，為其後續四十載隱忍沉穩性格之轉折點。"
  },
  {
    id: "bat_jp_nagashino_1575",
    eraId: "jp_sengoku",
    name: "長篠·設樂原大決戰 (信長火繩槍三段射擊滅武田赤備)",
    year: 1575,
    period: "japanAtlas",
    locationAncient: "三河國設樂郡設樂原·長篠城",
    locationModern: "愛知縣新城市設樂原古戰場歷史資料館",
    coordinates: [137.52, 34.92],
    summary: "武田勝賴率一萬五千甲陽赤備軍圍攻長篠城。織田信長與德川家康率三萬八千大軍馳援。信長在連吾川沿線構築三重馬防柵，配置三千挺火繩槍實施輪番「三段射擊」。武田騎兵衝鋒遭遇彈雨全軍覆滅，武田名將凋零殆盡。",
    attacker: {
      factionName: "武田勝賴甲陽赤備軍",
      faction: "takeda",
      commanders: [
        { name: "武田勝賴", title: "武田家當主", figureId: "fig_jp_takeda_shingen" },
        { name: "山縣昌景", title: "赤備軍團長 (中彈戰死)" },
        { name: "馬場信春", title: "不死之身 (斷後戰死)" },
        { name: "內藤昌豐", title: "四名臣之一 (戰死)" }
      ],
      forcesEstimate: "精銳騎兵與甲陽軍主力約 15,000 人",
      casualtiesEstimate: "陣亡 10,000 餘人，武田二十四將骨幹幾乎全滅"
    },
    defender: {
      factionName: "織田德川聯軍",
      faction: "oda",
      commanders: [
        { name: "織田信長", title: "織田軍總帥 / 火槍戰術革新者", figureId: "fig_jp_oda_nobunaga" },
        { name: "德川家康", title: "盟友統帥", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "酒井忠次", title: "鳶之巢山奇襲指揮官" }
      ],
      forcesEstimate: "聯軍 38,000 人，配備三千挺火繩槍（鐵砲）",
      casualtiesEstimate: "陣亡約 1,000 餘人，防線固若金湯"
    },
    victor: "defender",
    victorStatement: "馬防柵配合三段擊鐵砲連射，甲陽騎兵全軍覆沒，戰國重騎兵時代落幕",
    tactics: [
      "三重馬防柵：沿連吾川泥濘濕地構築長達兩公里的木樁柵欄阻擋敵騎兵高速衝擊",
      "三千挺三段連射：將火槍手分為三排，第一排射擊、第二排瞄準、第三排裝填，形成不間斷彈雨",
      "鳶之巢山後方奇襲：酒井忠次率三千別動隊深夜翻山奇襲武田後方鳶之巢山砦，解救長篠城"
    ],
    strategicOutcome: "武田宗家精銳喪盡無力再與織田抗衡，七年後武田氏滅亡；織田信長霸業如日中天。",
    significance: "世界軍事史上步兵火器擊潰傳統精銳重騎兵的劃時代轉折點，確立熱兵器戰場統治地位。"
  },
  {
    id: "bat_jp_tedorigawa_1577",
    eraId: "jp_sengoku",
    name: "手取川之戰 (軍神上杉謙信大破織田北陸軍團)",
    year: 1577,
    period: "japanAtlas",
    locationAncient: "加賀國手取川河畔",
    locationModern: "石川縣白山市手取川河口",
    coordinates: [136.48, 36.48],
    summary: "柴田勝家率四萬織田北陸軍進犯加賀，上杉謙信攻佔七尾城後誘敵渡河。趁秋雨連綿手取川暴漲、織田軍半渡之際，謙信以車懸之陣發動鐵騎突擊，織田軍大敗溺斃千餘人，信長北伐受挫。",
    attacker: {
      factionName: "上杉越後騎兵軍",
      faction: "uesugi",
      commanders: [
        { name: "上杉謙信", title: "越後軍神 / 總大將", figureId: "fig_jp_uesugi_kenshin" },
        { name: "直江兼續", title: "上杉家名將", figureId: "fig_jp_naoe_kanetsugu" }
      ],
      forcesEstimate: "越後騎兵精銳約 30,000 人",
      casualtiesEstimate: "傷亡數百人，完勝敵軍"
    },
    defender: {
      factionName: "織田北陸道大軍",
      faction: "oda",
      commanders: [
        { name: "柴田勝家", title: "織田北陸軍司令官", figureId: "fig_jp_shibata_katsuie" },
        { name: "前田利家", title: "赤母衣眾將領", figureId: "fig_jp_maeda_toshiie" },
        { name: "瀧川一益", title: "織田軍鐵砲奉行" }
      ],
      forcesEstimate: "四萬大軍 (羽柴秀吉戰前因不合撤退)",
      casualtiesEstimate: "溺斃與陣亡約 1,000 - 1,500 人，全線撤回越前"
    },
    victor: "attacker",
    victorStatement: "利用手取川暴漲截殺渡河織田軍，千餘人溺斃，粉碎織田信長北陸攻略",
    tactics: [
      "示弱誘敵渡河：故意撤離城池放慢行動，誘導柴田勝家冒雨渡過水勢兇猛之手取川",
      "半渡而擊突襲：掌握敵半數軍隊涉水過河、首尾不能相顧瞬間以精騎實施雷霆衝擊",
      "利用秋水暴漲：秋雨連綿迫使潰散織田軍落入深水激流，造成大量非戰鬥減員"
    ],
    strategicOutcome: "織田信長東進北陸進程遭到重擊不得不轉向防禦，直至謙信翌年病逝信長方敢重啟進攻。",
    significance: "戰國軍神上杉謙信生前對抗織田霸權之最後絕響勝利。"
  },
  {
    id: "bat_jp_kizugawaguchi_1578",
    eraId: "jp_sengoku",
    name: "第二次木津川口海戰 (九鬼嘉隆鐵甲船破毛利水軍)",
    year: 1578,
    period: "japanAtlas",
    locationAncient: "攝津國木津川河口大阪灣",
    locationModern: "大阪府大阪市大正區木津川河口",
    coordinates: [135.48, 34.65],
    summary: "為破解毛利水軍支援石山本願寺，信長命九鬼嘉隆建造六艘黑色鐵甲巨艦。毛利水軍以六百艘戰船發動焙烙玉火攻，鐵甲船刀槍不入，以大口徑大砲近距離轟沉數百艘敵船，奪取大阪灣制海權。",
    attacker: {
      factionName: "織田九鬼鐵甲艦隊",
      faction: "oda",
      commanders: [
        { name: "九鬼嘉隆", title: "九鬼水軍棟梁 / 志摩領主", figureId: "fig_jp_oda_nobunaga" },
        { name: "瀧川一益", title: "織田水軍副將" }
      ],
      forcesEstimate: "黑色鐵甲大安宅船 6 艘，大砲 18 門，護衛船數十艘",
      casualtiesEstimate: "數十人傷亡，鐵甲戰艦全數無損"
    },
    defender: {
      factionName: "毛利村上海上艦隊",
      faction: "mori",
      commanders: [
        { name: "村上元吉", title: "能島村上海賊總帥", figureId: "fig_jp_mori_terumoto" },
        { name: "兒玉就英", title: "毛利水軍副將" }
      ],
      forcesEstimate: "小早船與中型安宅船約 600 艘，兵力約 10,000 人",
      casualtiesEstimate: "焚毀擊沉數百艘戰船，陣亡千餘人，海上補給線徹底斷絕"
    },
    victor: "attacker",
    victorStatement: "厚鐵皮包覆抵禦焙烙玉火攻，大口徑大砲擊沉數百敵船，封鎖石山本願寺",
    tactics: [
      "鐵皮包裝防禦：首創以三毫米厚生鐵板覆蓋船身，徹底抵消毛利水軍擅長的焙烙玉火攻",
      "艦載重砲轟擊：在旗艦搭載葡萄牙引進的大口徑大口徑大筒，以超強火力粉碎輕型木船",
      "水陸完全封鎖：奪取大阪灣制海權，使石山本願寺十年兵糧運補徹底斷絕不得不降伏"
    ],
    strategicOutcome: "石山本願寺失去外部糧草支援於兩年後降伏，織田信長掃除腹心最大隱患。",
    significance: "世界海戰史上極早期應用「鐵甲艦」概念並取得決定性戰果之先驅海戰。"
  },
  {
    id: "bat_jp_takamatsu_1582",
    eraId: "jp_azuchi_momoyama",
    name: "備中高松城之戰 (秀吉水淹巨城與中國大返還發端)",
    year: 1582,
    period: "japanAtlas",
    locationAncient: "備中國高松城",
    locationModern: "岡山縣岡山市北區高松城址公園",
    coordinates: [133.82, 34.69],
    summary: "羽柴秀吉奉命征討毛利氏，面對沼澤險要高松城，採納黑田官兵衛水攻計策。動員數萬民工十二天修築長達三公里巨堤，引河水淹城將清水宗治逼入絕境。本能寺之變爆發後，秀吉以超凡魄力迅速與毛利簽署和約，換得宗治切腹保全守軍，隨即展開神速中國大返還。",
    attacker: {
      factionName: "羽柴織田征西大軍",
      faction: "toyotomi",
      commanders: [
        { name: "羽柴秀吉", title: "播磨守 / 織田征西司令官", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "黑田官兵衛", title: "秀吉軍師 (水攻總設計師)", figureId: "fig_jp_kuroda_kanbei" }
      ],
      forcesEstimate: "三萬織田主力與數萬民工",
      casualtiesEstimate: "傷亡百餘人，以工程壓制奪城"
    },
    defender: {
      factionName: "毛利備中守備軍",
      faction: "mori",
      commanders: [
        { name: "清水宗治", title: "備中高松城城主 (乘舟切腹)", figureId: "fig_jp_mori_terumoto" },
        { name: "毛利輝元", title: "毛利宗家總帥 (後方援軍四萬)", figureId: "fig_jp_mori_terumoto" }
      ],
      forcesEstimate: "高松城守軍 5,000 人 (毛利後方大軍四萬人對峙)",
      casualtiesEstimate: "城內彈盡糧絕，城主清水宗治切腹保全城內軍民"
    },
    victor: "attacker",
    victorStatement: "十二日修築三公里人工巨堤引足守川水淹城池，促成與毛利和談神速回師",
    tactics: [
      "人工巨堤水攻：斥巨資徵集民夫十二天築起高七公尺、長三公里的防水長堤阻斷足守川",
      "梅雨水淹要塞：利用梅雨暴漲將沼澤盆地化為人工大湖，城池淪為孤島斷絕外部增援",
      "迅速外交封口：得知信長死訊後火速答應和約，以清水宗治切腹為條件立即拔營回師"
    ],
    strategicOutcome: "清水宗治體面切腹，毛利氏割讓三國土地議和，秀吉騰出雙手展開震驚日本的「中國大返還」。",
    significance: "展現秀吉驚人工程組織力與頂級政治決斷力，為其問鼎天下之關鍵跳板。"
  },
  {
    id: "bat_jp_yamazaki_1582",
    eraId: "jp_azuchi_momoyama",
    name: "山崎合戰 (天王山之戰·秀吉中國大返還殲逆賊)",
    year: 1582,
    period: "japanAtlas",
    locationAncient: "山城國與攝津國界山崎天王山麓",
    locationModern: "京都府乙訓郡大山崎町天王山合戰場",
    coordinates: [135.68, 34.89],
    summary: "本能寺之變後，羽柴秀吉七日急行軍兩百公里完成「中國大返還」，號召四萬大軍於山崎天王山決戰叛臣明智光秀。中川清秀與高山右近搶先奪取天王山頂制高點，光秀軍潰滅，光秀於逃亡途中殞命，秀吉奠定天下人霸業。",
    attacker: {
      factionName: "羽柴秀吉討逆復仇軍",
      faction: "toyotomi",
      commanders: [
        { name: "羽柴秀吉", title: "總帥 / 織田家復仇討逆先鋒", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "丹羽長秀", title: "織田家元老重臣" },
        { name: "池田恒興", title: "攝津大名 (奇襲明智右翼)" },
        { name: "黑田官兵衛", title: "隨軍參謀軍師", figureId: "fig_jp_kuroda_kanbei" }
      ],
      forcesEstimate: "四萬大軍 (羽柴主力及攝津各路織田舊部)",
      casualtiesEstimate: "傷亡約 1,000 餘人"
    },
    defender: {
      factionName: "明智光秀本能寺叛軍",
      faction: "akechi",
      commanders: [
        { name: "明智光秀", title: "三日天下 / 明智軍總帥 (逃亡中死於竹槍)", figureId: "fig_jp_akechi_mitsuhide" },
        { name: "齋藤利三", title: "明智筆頭家老 (被俘伏誅)" },
        { name: "明智秀滿", title: "明智重臣 (阪本城切腹)" }
      ],
      forcesEstimate: "一萬六千人 (細川、筒井氏拒絕參戰)",
      casualtiesEstimate: "陣亡 3,000 餘人，光秀逃亡小栗栖遭農民伏殺"
    },
    victor: "attacker",
    victorStatement: "奪取天王山制高點合圍明智軍，明智光秀兵敗殞命，秀吉奠定天下人地位",
    tactics: [
      "爭奪天王山頂：先鋒中川清秀、高山右近冒死搶佔天王山山脊制高點俯瞰全場戰局",
      "右翼圓山奇襲：池田恒興率軍強渡淀川沼澤迂迴擊潰明智軍側翼津田信春部",
      "大義名分號召：高舉信長靈牌與朝廷討逆大義，使明智光秀陷入孤立「三日天下」"
    ],
    strategicOutcome: "明智叛亂在兩週內被徹底蕩平；秀吉在清洲會議掌握主導權，開啟太閤天下統一時代。",
    significance: "日本俗語「天王山」（比喻決定勝負最關鍵時刻）的歷史典故發源地。"
  },
  {
    id: "bat_jp_shizugatake_1583",
    eraId: "jp_azuchi_momoyama",
    name: "賤岳之戰 (賤岳七本槍·秀吉奠定天下人霸業)",
    year: 1583,
    period: "japanAtlas",
    locationAncient: "近江國伊香郡賤岳山頂",
    locationModern: "滋賀縣長濱市木之本町大音賤岳古戰場",
    coordinates: [136.19, 35.50],
    summary: "信長死後，清洲會議引爆秀吉與織田首席宿老柴田勝家權力爭奪。柴田軍猛將佐久間盛政奇襲賤岳；秀吉自大垣五小時狂奔五十二公里「美濃大返還」神速回師，前田利家戰場撤退，秀吉全線反撲。加藤清正、福島正則等「賤岳七本槍」威震天下，勝家自刃。",
    attacker: {
      factionName: "羽柴秀吉大軍",
      faction: "toyotomi",
      commanders: [
        { name: "羽柴秀吉", title: "織田後繼者 / 大軍統帥", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "福島正則", title: "賤岳七本槍之首 (率先破敵)", figureId: "fig_jp_fukushima_masanori" },
        { name: "加藤清正", title: "賤岳七本槍猛將", figureId: "fig_jp_toyotomi_hideyoshi" }
      ],
      forcesEstimate: "約 50,000 人 (含前田利家等部隊)",
      casualtiesEstimate: "傷亡約 1,500 人"
    },
    defender: {
      factionName: "柴田勝家北陸軍團",
      faction: "shibata",
      commanders: [
        { name: "柴田勝家", title: "鬼柴田 / 織田家首席宿老 (北之莊自焚)", figureId: "fig_jp_shibata_katsuie" },
        { name: "佐久間盛政", title: "鬼玄蕃 / 賤岳先鋒 (被俘處斬)" },
        { name: "前田利家", title: "加賀百萬石始祖 (中途退兵降秀吉)", figureId: "fig_jp_maeda_toshiie" }
      ],
      forcesEstimate: "北之莊精銳約 20,000 - 25,000 人",
      casualtiesEstimate: "陣亡 5,000 餘人，勝家退回北之莊天守與阿市夫人自盡"
    },
    victor: "attacker",
    victorStatement: "美濃大返還五小時狂奔五十二公里突擊，賤岳七本槍名揚天下，勝家自盡",
    tactics: [
      "美濃五小時急行軍：秀吉自大垣五小時狂奔五十二公里回師賤岳，徹底出乎柴田軍預料",
      "政治孤立誘降利家：秀吉利用與前田利家多年莫逆深交，促使利家陣前不戰自退引發連鎖瓦解",
      "青年武將勇冠三軍：拔擢福島正則、加藤清正等七名子弟兵親鋒突擊，一戰成名鑄造七本槍傳奇"
    ],
    strategicOutcome: "柴田勢力徹底覆滅，織田諸宿老臣服，秀吉次年修築大阪城，天下統一大勢底定。",
    significance: "豐臣政權完全取代織田政權之決定性分水嶺之戰。"
  },
  {
    id: "bat_jp_komaki_nagakute_1584",
    eraId: "jp_azuchi_momoyama",
    name: "小牧·長久手之戰 (羽柴秀吉與德川家康兩雄對決)",
    year: 1584,
    period: "japanAtlas",
    locationAncient: "尾張國春日井郡小牧山·愛知郡長久手",
    locationModern: "愛知縣長久手市坊後長久手古戰場公園",
    coordinates: [137.05, 35.18],
    summary: "織田信雄聯合德川家康與羽柴秀吉爆發天下爭霸對抗。秀吉率十萬大軍進駐尾張，派兵兩萬偷襲家康老營三河。家康精準研判內線夜行軍截擊，長久手野戰斬殺「鬼武藏」森長可與池田恒興。秀吉軍事受挫後改採外交手段降伏信雄，家康最終稱臣締盟。",
    attacker: {
      factionName: "德川織田聯軍 (長久手截擊主力)",
      faction: "tokugawa",
      commanders: [
        { name: "德川家康", title: "三河雄主 (親率九千精兵截殺)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "本多忠勝", title: "五百騎從容殿後掩護", figureId: "fig_jp_honda_tadakatsu" },
        { name: "井伊直政", title: "井伊赤備猛攻", figureId: "fig_jp_ii_naomasa" }
      ],
      forcesEstimate: "德川軍 16,000 人 (長久手突擊 9,000 人)",
      casualtiesEstimate: "傷亡約 500 - 700 人"
    },
    defender: {
      factionName: "羽柴秀吉大軍 (中入迂迴軍團)",
      faction: "toyotomi",
      commanders: [
        { name: "羽柴秀吉", title: "十萬大軍總帥 (小牧山對峙)", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "池田恒興", title: "中入先鋒大將 (長久手陣亡)" },
        { name: "森長可", title: "鬼武藏 / 槍術無雙 (中彈陣亡)" },
        { name: "羽柴秀次", title: "中入軍總大將 (狼狽潰逃)" }
      ],
      forcesEstimate: "中入部隊 20,000 人 (小牧山總兵力十萬人)",
      casualtiesEstimate: "陣亡 2,500 餘人，池田父子與森長可戰死"
    },
    victor: "attacker",
    victorStatement: "德川家康長久手野戰斬殺森長可與池田恒興，秀吉以政治外交奪取全局主導",
    tactics: [
      "內線神速夜行截擊：家康利用夜間機動搶先一步進駐小幡城，在長久手設伏痛擊中入軍",
      "本多五百騎游擊疑敵：本多忠勝率五百騎橫阻秀吉數萬大軍，連秀吉亦感嘆「日本第一勇將」",
      "政治孤立盟主：秀吉在局部戰術失敗後，直接跨過家康以絕對兵力威逼織田信雄單獨開城"
    ],
    strategicOutcome: "家康以勝者姿態上洛臣服秀吉，獲封五大老筆頭，秀吉以極低代價納德川為肱骨。",
    significance: "日本戰國兩大終結者唯一一次正面軍事大規模野戰較量。"
  },
  {
    id: "bat_jp_odawara_1590",
    eraId: "jp_azuchi_momoyama",
    name: "小田原征伐 (二十萬大軍平定關東與天下統一)",
    year: 1590,
    period: "japanAtlas",
    locationAncient: "相模國小田原城",
    locationModern: "神奈川縣小田原市城內小田原城址公園",
    coordinates: [139.15, 35.25],
    summary: "因北條氏拒絕惣無事令，豐臣秀吉動員全日本二十二萬大軍水陸合圍小田原城。秀吉修築石垣山一夜城心理戰擊潰敵軍信念。圍城三個月，後北條氏開城降伏，主戰派切腹。秀吉移封家康入關東，天下亂世徹底平定統一。",
    attacker: {
      factionName: "豐臣天下大名聯軍",
      faction: "toyotomi",
      commanders: [
        { name: "豐臣秀吉", title: "關白太政大臣 / 天下總大將", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "德川家康", title: "聯軍副帥 (隨後受封關東)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "前田利家", title: "北陸支隊司令官", figureId: "fig_jp_maeda_toshiie" },
        { name: "黑田官兵衛", title: "入城談判使者", figureId: "fig_jp_kuroda_kanbei" }
      ],
      forcesEstimate: "水陸全日本大名聯軍約 220,000 人",
      casualtiesEstimate: "數千人 (多死於疾病及忍城支線攻防)"
    },
    defender: {
      factionName: "後北條氏守軍與支城網絡",
      faction: "hojo",
      commanders: [
        { name: "北條氏政", title: "後北條氏太上家老 (戰後切腹)", figureId: "fig_jp_hojo_ujiyasu" },
        { name: "北條氏直", title: "第五代當主 (流放高野山)" },
        { name: "成田長親", title: "忍城守將 (水攻不屈)" }
      ],
      forcesEstimate: "五萬六千守軍 (號稱總構長達九公里巨城)",
      casualtiesEstimate: "圍城三月糧盡開城，後北條氏百年基業覆滅"
    },
    victor: "attacker",
    victorStatement: "一夜築石垣山一夜城重創敵軍士氣，北條氏政切腹，日本戰國時代全面結束",
    tactics: [
      "石垣山一夜城心理戰：在密林後築起雄偉天守，伐倒樹木露出城堡，讓北條軍誤認神降天城",
      "全方位物資封鎖：動員西國水軍封鎖相模灣，陸路二十萬人重重圍困斷絕一切糧秣援軍",
      "單獨支城突破：各路大軍先後攻克八王子城、山中城等支城，使主城淪為真正孤立絕島"
    ],
    strategicOutcome: "後北條氏覆亡，秀吉將家康轉封江戶關東二百五十萬石，日本戰國分裂時代正式劃上句點。",
    significance: "日本自應仁之亂以來歷經一百二十三年戰火紛擾，至此首度迎來全境真正實質統一。"
  },
  {
    id: "bat_jp_ueda_1600",
    eraId: "jp_azuchi_momoyama",
    name: "第二次上田城之戰 (真田昌幸以寡擊眾阻滯秀忠大軍)",
    year: 1600,
    period: "japanAtlas",
    locationAncient: "信濃國小縣郡上田城",
    locationModern: "長野縣上田市二之丸上田城跡",
    coordinates: [138.25, 36.40],
    summary: "關原之戰前夕，德川秀忠率三萬八千東軍主力沿中山道西進。行經信濃時，西軍真田昌幸與幸村父子僅憑兩千五百人據守上田城。昌幸引神川河水斷敵退路，伏兵四起擊退大軍，秀忠被迫繞道西行錯過關原主戰場。",
    attacker: {
      factionName: "德川東軍中山道主力軍",
      faction: "tokugawa",
      commanders: [
        { name: "德川秀忠", title: "東軍副大將 / 二代將軍", figureId: "fig_jp_tokugawa_hidetada" },
        { name: "真田信幸", title: "真田長男 (東軍陣營)", figureId: "fig_jp_sanada_masayuki" },
        { name: "本多正信", title: "德川首席軍師" }
      ],
      forcesEstimate: "三萬八千精兵 (東軍最精銳部隊)",
      casualtiesEstimate: "數百人死傷，最嚴重後果為延誤關原決戰"
    },
    defender: {
      factionName: "真田六文錢守軍",
      faction: "sanada",
      commanders: [
        { name: "真田昌幸", title: "表裏比興之名將", figureId: "fig_jp_sanada_masayuki" },
        { name: "真田幸村", title: "日本第一兵 (信繁)", figureId: "fig_jp_sanada_yukimura" }
      ],
      forcesEstimate: "兩千五百名信濃武士與獵人地侍",
      casualtiesEstimate: "極其輕微 (數十人)"
    },
    victor: "defender",
    victorStatement: "假意投降誘敵深入，神出鬼沒伏兵合擊，秀忠大軍受阻數日未及趕赴關原",
    tactics: [
      "佯降拖延戰術：假意致書秀忠稱願意開城，趁敵等待期間搶修加固城池壕溝設施",
      "神川水攻陷阱：誘敵渡過神川進入上田城下狹窄棋盤街道，突然開閘放水沖毀敵後路",
      "城下伏兵穿插：利用戶隱流忍者與信濃山地獵人精準狙擊德川先鋒將領，瓦解其陣型"
    ],
    strategicOutcome: "秀忠大軍未能如期抵達美濃，家康在關原只得以劣勢兵力決戰，戰後將昌幸幸村流放九度山。",
    significance: "真田氏以不到十分之一兵力牽制數萬天下大軍之神級戰術教科書。"
  },
  {
    id: "bat_jp_sekigahara_1600",
    eraId: "jp_azuchi_momoyama",
    name: "關原之戰 (天下之分水嶺·東西十六萬大軍對決)",
    year: 1600,
    period: "japanAtlas",
    locationAncient: "美濃國不破郡關原盆地",
    locationModern: "岐阜縣不破郡關原町關原古戰場開戰地",
    coordinates: [136.46, 35.36],
    summary: "1600年10月21日晨濃霧散去，東西軍十六萬主力於美濃關原峽谷正面決戰。石田三成與宇喜多秀家奮勇抵抗東軍猛攻。正午松尾山小早川秀秋遭家康「問鐵砲」威嚇後倒戈背叛，痛擊西軍大谷吉繼，西軍崩潰。德川家康定鼎天下。",
    attacker: {
      factionName: "東軍德川聯盟",
      faction: "tokugawa",
      commanders: [
        { name: "德川家康", title: "東軍總大將 / 內府", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "福島正則", title: "東軍先鋒大將", figureId: "fig_jp_fukushima_masanori" },
        { name: "井伊直政", title: "東軍開戰先頭", figureId: "fig_jp_ii_naomasa" },
        { name: "黑田長政", title: "右翼主力 / 策反小早川關鍵" },
        { name: "小早川秀秋", title: "松尾山部隊 (關鍵倒戈)", figureId: "fig_jp_ishida_mitsunari" }
      ],
      forcesEstimate: "東軍參戰約 82,000 人 (含松尾山部隊)",
      casualtiesEstimate: "陣亡約 4,000 - 5,000 人"
    },
    defender: {
      factionName: "西軍豐臣奉行聯軍",
      faction: "ishida",
      commanders: [
        { name: "石田三成", title: "西軍實質領袖 (佐和山城主，戰敗被俘處決)", figureId: "fig_jp_ishida_mitsunari" },
        { name: "宇喜多秀家", title: "西軍副將 / 備前宰相 (流放八丈島)" },
        { name: "大谷吉繼", title: "刑部少輔 (奮戰自刃)" },
        { name: "島津義弘", title: "薩摩猛將 (敵中突破突圍)", figureId: "fig_jp_shimazu_yoshihiro" },
        { name: "毛利輝元", title: "西軍名義總大將 (留守大坂城)", figureId: "fig_jp_mori_terumoto" }
      ],
      forcesEstimate: "號稱十萬，實際參戰約 82,000 人 (逾三萬人觀望或背叛)",
      casualtiesEstimate: "陣亡 8,000 - 12,000 餘人，西軍全線崩潰"
    },
    victor: "attacker",
    victorStatement: "小早川秀秋倒戈痛擊西軍側翼，島津義弘正面敵中突破，家康一戰定乾坤",
    tactics: [
      "問鐵砲心理威脅：家康在松尾山下命令鐵砲隊向小早川陣地齊射，逼迫搖擺秀秋立即反戈",
      "敵中突破正面突圍：島津義弘率千名薩摩兵不向後逃竄，反而筆直正面穿透家康本陣殺出重圍",
      "策反南宮山毛利軍：黑田長政事前調略吉川廣家「宰相殿空便當」，使毛利三萬精兵按兵不動"
    ],
    strategicOutcome: "西軍大名九十餘家遭改易除封或減封，德川家康三年後受封征夷大將軍建立江戶幕府。",
    significance: "日本歷史上規模最大、傷亡最慘烈之「天下分水嶺」大決戰。"
  },
  {
    id: "bat_jp_osaka_fuyu_1614",
    eraId: "jp_edo",
    name: "大坂冬之陣 (真田丸鐵砲交叉火力挫敗德川前鋒)",
    year: 1614,
    period: "japanAtlas",
    locationAncient: "攝津國東成郡大坂城南出丸真田丸",
    locationModern: "大阪府大阪市天王寺區餌差町三光神社",
    coordinates: [135.53, 34.67],
    summary: "德川家康動員二十萬大軍包圍大坂城。真田幸村於城南最脆弱處築出丸「真田丸」。12月前田利常、井伊直孝冒進強攻，幸村以鐵砲交叉火力伏擊，德川前鋒死傷數千人潰退。家康以英國大砲日夜轟擊天守閣逼和。",
    attacker: {
      factionName: "德川幕府全國大軍",
      faction: "tokugawa",
      commanders: [
        { name: "德川家康", title: "大御所 / 全國聯軍統帥", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "德川秀忠", title: "二代將軍", figureId: "fig_jp_tokugawa_hidetada" },
        { name: "前田利常", title: "前田家二代 (真田丸前線受挫)", figureId: "fig_jp_maeda_toshiie" },
        { name: "井伊直孝", title: "赤備指揮官 (真田丸受挫)" }
      ],
      forcesEstimate: "全日本大名部隊約 200,000 人",
      casualtiesEstimate: "真田丸陣地前死傷約 4,000 - 5,000 人"
    },
    defender: {
      factionName: "大坂城豐臣守軍",
      faction: "toyotomi",
      commanders: [
        { name: "豐臣秀賴", title: "豐臣宗家當主 / 太閤之子", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "真田幸村", title: "真田丸防禦總指揮", figureId: "fig_jp_sanada_yukimura" },
        { name: "後藤又兵衛", title: "浪人名將" }
      ],
      forcesEstimate: "大坂守軍約 100,000 人 (真田丸駐軍約 5,000 人)",
      casualtiesEstimate: "傷亡數百人，出丸防守固若金湯"
    },
    victor: "defender",
    victorStatement: "赤備鐵砲精準狙擊，前田利常、井伊直孝部隊死傷慘重，家康被迫簽訂和議",
    tactics: [
      "外圍出丸工事：在大坂城缺乏天險防護之南平原上構築高壘深壕複合出丸「真田丸」",
      "挑釁空槍誘敵深入：幸村令士兵大聲辱罵挑釁並放空槍假裝混亂，誘使敵軍蜂擁擠入鹿砦壕溝",
      "全方位交叉彈雨：在土壘遮板掩護下，數千挺火繩槍同時向壕溝內集聚之敵軍實施毀滅性齊射"
    ],
    strategicOutcome: "雙方議和簽訂停火協定，德川家康藉和約條件填平大坂城外圍所有天然壕溝，城防瓦解。",
    significance: "真田幸村以出凡軍事工程學與戰術射擊聞名於世之守城經典。"
  },
  {
    id: "bat_jp_osaka_natsu_1615",
    eraId: "jp_edo",
    name: "大坂夏之陣 (天王寺茶臼山決戰·日本第一兵幸村絕唱)",
    year: 1615,
    period: "japanAtlas",
    locationAncient: "攝津國天王寺茶臼山·大坂城下",
    locationModern: "大阪府大阪市天王寺區茶臼山町茶臼山古戰場",
    coordinates: [135.51, 34.65],
    summary: "1615年5月，德川十五萬大軍發動夏之陣。外壕已平的大坂浪人軍只得出城決戰。真田幸村率赤備敢死隊於天王寺發動決死突擊，三度殺入家康本陣，折斷家康帥旗「金扇馬印」。幸村力竭陣亡，大坂城陷落，豐臣氏覆滅，元和偃武。",
    attacker: {
      factionName: "德川幕府平定大軍",
      faction: "tokugawa",
      commanders: [
        { name: "德川家康", title: "大御所 (本陣遭幸村衝垮狼狽逃命)", figureId: "fig_jp_tokugawa_ieyasu" },
        { name: "德川秀忠", title: "二代將軍 (指揮後續反撲)", figureId: "fig_jp_tokugawa_hidetada" },
        { name: "本多忠朝", title: "本多忠勝次男 (天王寺戰死)" },
        { name: "井伊直孝", title: "彥根藩主赤備軍" }
      ],
      forcesEstimate: "約 155,000 人",
      casualtiesEstimate: "傷亡約 5,000 - 7,000 人，家康近衛幾乎散盡"
    },
    defender: {
      factionName: "大坂豐臣殘餘精銳",
      faction: "toyotomi",
      commanders: [
        { name: "真田幸村", title: "日本第一兵 / 信濃赤備 (安居神社壯烈自裁)", figureId: "fig_jp_sanada_yukimura" },
        { name: "毛利勝永", title: "西軍勇將 (天王寺連續擊退四路幕府軍)" },
        { name: "豐臣秀賴", title: "太閤遺孤 (大坂城山里丸自刃)", figureId: "fig_jp_toyotomi_hideyoshi" },
        { name: "淀殿", title: "茶茶 (與秀賴一同引火自焚)" }
      ],
      forcesEstimate: "出城決戰部隊約 55,000 人",
      casualtiesEstimate: "陣亡 15,000 餘人，豐臣宗家滅亡，城內全滅"
    },
    victor: "attacker",
    victorStatement: "幸村赤備三度殺透家康本陣折斷金扇帥旗，力竭戰歿，豐臣氏滅亡元和偃武",
    tactics: [
      "誘敵反制中央突穿：以毛利勝永正面牽制敵前鋒，真田幸村率赤備直撲家康本陣",
      "直搗帥旗斬首行動：放棄常規陣地戰，全軍化為尖刀，以一騎當千氣魄直取敵統帥首級",
      "決死氣魄以寡敵眾：幸村將士身著純赤赤甲，抱必死信念多次沖垮數倍於己之德川精銳親衛"
    ],
    strategicOutcome: "大坂城化為灰燼，豐臣氏三代天下徹底滅亡，德川幕府確立對全日本唯一絕對統治體制。",
    significance: "日本戰國時代正式劃下歷史句點，真田幸村被島津義弘尊為「日本第一兵」。"
  },
  {
    id: "bat_jp_shimabara_1637",
    eraId: "jp_edo",
    name: "島原之亂原城合戰 (天草四郎率天主教徒抗擊幕府)",
    year: 1637,
    period: "japanAtlas",
    locationAncient: "肥前國島原半島原城",
    locationModern: "長崎縣南島原市南有馬町原城址",
    coordinates: [130.34, 32.62],
    summary: "因苛政與殘酷迫害基督教，十六歲少年天草四郎率島原天草三萬七千教民起義，據原城死守。幕府派十二萬大軍圍剿，幕府將領板倉重昌戰死。後松平信綱採取斷糧圍困與荷蘭軍艦艦砲轟擊，四個月後原城陷落守軍全數殉難，日本全面鎖國。",
    attacker: {
      factionName: "江戶幕府老中征討軍",
      faction: "tokugawa",
      commanders: [
        { name: "松平信綱", title: "智惠伊豆 / 幕府老中總大將", figureId: "fig_jp_tokugawa_hidetada" },
        { name: "板倉重昌", title: "前任征討使 (元旦總攻中彈陣亡)" },
        { name: "水野勝成", title: "備後福山藩主老將" }
      ],
      forcesEstimate: "九州諸藩與幕府軍約 125,000 人 (荷蘭戰艦炮火支援)",
      casualtiesEstimate: "陣亡 3,000 餘人，負傷 8,000 餘人"
    },
    defender: {
      factionName: "島原天草天主教起義軍",
      faction: "christian",
      commanders: [
        { name: "天草四郎時貞", title: "十六歲起義軍精神領袖 (城破殉節)" },
        { name: "益田好次", title: "軍事作戰指揮 (小西行長舊臣)" }
      ],
      forcesEstimate: "農民、浪人、婦女兒童共約 37,000 人",
      casualtiesEstimate: "原城破城後，城內男女老幼 37,000 人全數遭屠戮殉節"
    },
    victor: "attacker",
    victorStatement: "歷時四個月血戰圍城，原城陷落，促使幕府頒布最嚴苛鎖國令全面禁教",
    tactics: [
      "十字旗幟信仰凝聚：以虔誠基督教信仰為死戰到底精神支柱，婦女亦登城投石射箭",
      "死守修復險阻石垣：利用原城廢棄石壘深塹修築梯次火力點，多次擊退幕府軍梯隊衝鋒",
      "外籍艦砲斷糧絕殺：松平信綱調動荷蘭商船開砲轟城，並採取嚴密圍困使城內以樹皮充飢"
    ],
    strategicOutcome: "起義被殘酷鎮壓，幕府徹底禁絕天主教，驅逐葡萄牙人，頒布鎖國令，僅留長崎出島與荷蘭清朝通商。",
    significance: "日本江戶時代最大規模內亂，直接促成封閉日本兩百年的完全鎖國體制。"
  },
  {
    id: "bat_jp_ikeda_ya_1864",
    eraId: "jp_bakumatsu",
    name: "京都池田屋事件 (新選組夜襲長州尊攘志士)",
    year: 1864,
    period: "japanAtlas",
    locationAncient: "山城國京都三條木屋町池田屋",
    locationModern: "京都府京都市中京區三條通河原町池田屋址",
    coordinates: [135.77, 35.01],
    summary: "新選組獲悉長州尊攘志士密謀於風雨夜縱火京都御所並綁架天皇。近藤勇、沖田總司率數人破門突入池田屋展開窄室白刃戰，土方歲三率大隊封鎖退路。新選組斬殺宮部鼎藏等志士首領，一戰成名威震京畿。",
    attacker: {
      factionName: "新選組突擊隊",
      faction: "shinsengumi",
      commanders: [
        { name: "近藤勇", title: "新選組局長 / 天然理心流宗家", figureId: "fig_jp_kondo_isami" },
        { name: "土方歲三", title: "副長 / 鬼之副長", figureId: "fig_jp_hijikata_toshizo" },
        { name: "沖田總司", title: "一番隊隊長 / 三段刺名手 (戰中咯血)", figureId: "fig_jp_okita_soji" },
        { name: "永倉新八", title: "二番隊隊長 / 神道無念流" }
      ],
      forcesEstimate: "參戰隊員 34 人 (初期突入 4 人，後續增援 30 人)",
      casualtiesEstimate: "陣亡 1 人，負傷 2 人"
    },
    defender: {
      factionName: "長州土佐尊王攘夷志士",
      faction: "choshu",
      commanders: [
        { name: "宮部鼎藏", title: "肥後藩尊攘派巨頭 (身中重傷自刃)" },
        { name: "吉田稔麿", title: "松下村塾名士 (死鬥陣亡)" },
        { name: "北添佶摩", title: "土佐脫藩志士 (戰死)" },
        { name: "桂小五郎", title: "長州領導 (提前離開僥倖脫險)", figureId: "fig_jp_kido_takayoshi" }
      ],
      forcesEstimate: "樓上集會尊攘志士約 20 - 30 人",
      casualtiesEstimate: "當場斬殺 7 人，逮捕 23 人，密謀全盤破滅"
    },
    victor: "attacker",
    victorStatement: "破壞長州火燒京都放逐天皇之密謀，新選組威震天下，延緩倒幕數年",
    tactics: [
      "窄室近身白刃死鬥：近藤勇、沖田總司率先踢破推門，在樓梯與榻榻米狹窄空間實施凌厲劍術格殺",
      "外圍鐵桶封鎖合圍：土方歲三率隊迅速封鎖池田屋前後門、後院溪水及屋頂通道，防敵逃逸",
      "嚴刑拷問迅速收網：藉由嚴刑訊問古高俊太郎於兩小時內鎖定集合地，搶在敵軍行動前發難"
    ],
    strategicOutcome: "長州尊攘派在京都的地下領導層遭重創，激化長州激進派進逼御所爆發「禁門之變」。",
    significance: "新選組從一介地方浪士組織躍升為幕府最銳利佩刀，維新進程被迫延後兩年。"
  },
  {
    id: "bat_jp_kinmon_1864",
    eraId: "jp_bakumatsu",
    name: "禁門之變 (蛤御門之戰·長州進攻京都御所)",
    year: 1864,
    period: "japanAtlas",
    locationAncient: "山城國京都御所蛤御門",
    locationModern: "京都府京都市上京區京都御苑蛤御門",
    coordinates: [135.76, 35.02],
    summary: "池田屋事件後，長州軍三千人以「清君側」為名進逼京都御所。戰火在蛤御門爆發，長州軍勇猛突入御所內庭威脅天皇。西鄉隆盛親率薩摩軍增援包抄，來島又兵衛戰死，久坂玄瑞自刃。戰後京都大火連燒三日毀兩萬餘戶，長州淪為朝敵。",
    attacker: {
      factionName: "長州藩激進進攻軍",
      faction: "choshu",
      commanders: [
        { name: "來島又兵衛", title: "長州游擊隊總指揮 (胸部中彈切腹)" },
        { name: "久坂玄瑞", title: "松下村塾高足 (鷹司邸自刃)" },
        { name: "真木和泉", title: "尊攘派神職志士 (天王山自刃)" }
      ],
      forcesEstimate: "三千精兵與脫藩浪士",
      casualtiesEstimate: "陣亡約 400 餘人，主要指揮官全部死節"
    },
    defender: {
      factionName: "御所衛戍會津薩摩桑名聯軍",
      faction: "aizu",
      commanders: [
        { name: "西鄉隆盛", title: "薩摩藩軍賦役 (親率部隊夾擊長州，腿部負傷)", figureId: "fig_jp_saigo_takamori" },
        { name: "松平容保", title: "京都守護職 / 會津藩主" },
        { name: "一橋慶喜", title: "禁裏御守衛總督 (德川慶喜)", figureId: "fig_jp_tokugawa_yoshinobu" }
      ],
      forcesEstimate: "聯軍衛戍部隊約 10,000 人",
      casualtiesEstimate: "傷亡數百人，京都大火焚毀 28,000 戶"
    },
    victor: "defender",
    victorStatement: "會津與薩摩聯軍擊退長州軍，長州淪為朝敵，幕府發動長州征伐",
    tactics: [
      "精確側翼齊射截擊：西鄉隆盛抓住長州軍突入御門後陣形混亂時機，調動薩摩來福槍隊側射狙殺",
      "依託宮牆石階防守：會津藩兵依託蛤御門厚重木門與土壘以密集步槍火力阻遏長州先鋒",
      "市街炮火覆蓋驅離：以大砲轟擊天王山及御所周邊長州據點，徹底瓦解其指揮樞紐"
    ],
    strategicOutcome: "朝廷宣判長州藩為「朝敵」，幕府藉此號召全日本發動第一次長州征伐，長州面臨空前危局。",
    significance: "激化薩摩與長州之深仇，卻也使長州徹底醒悟單憑勇力無法倒幕，為後續高杉晉作改革埋下伏筆。"
  },
  {
    id: "bat_jp_toba_fushimi_1868",
    eraId: "jp_bakumatsu",
    name: "鳥羽·伏見之戰 (戊辰戰爭揭幕·錦之御旗定乾坤)",
    year: 1868,
    period: "japanAtlas",
    locationAncient: "山城國紀伊郡鳥羽·伏見",
    locationModern: "京都府京都市伏見區御香宮神社古戰場跡",
    coordinates: [135.76, 34.93],
    summary: "1868年1月，德川慶喜率一萬五千幕府大軍沿鳥羽伏見向京都進發。五千薩長軍憑藉近代火砲與來福槍頑強阻擊。戰鬥第二日朝廷錦旗（菊花錦旗）抵達前線，薩長升格為「官軍」，幕府淪為「朝敵」軍心渙散潰退，戊辰戰爭全面爆發。",
    attacker: {
      factionName: "德川舊幕府進京大軍",
      faction: "bakufu",
      commanders: [
        { name: "德川慶喜", title: "第十五代將軍 (大坂開陽丸逃亡)", figureId: "fig_jp_tokugawa_yoshinobu" },
        { name: "大河內正質", title: "幕府老中兼大軍指揮" },
        { name: "近藤勇", title: "新選組局長 (伏見街道作戰受傷)", figureId: "fig_jp_kondo_isami" }
      ],
      forcesEstimate: "幕府步兵、會津藩、桑名藩、新選組共約 15,000 人",
      casualtiesEstimate: "陣亡 280 餘人，負傷千餘人，全線潰不成軍"
    },
    defender: {
      factionName: "薩摩長州明治官軍",
      faction: "satsuma",
      commanders: [
        { name: "西鄉隆盛", title: "官軍參謀兼總指揮", figureId: "fig_jp_saigo_takamori" },
        { name: "小松帶刀", title: "薩摩藩家老" },
        { name: "西園寺公望", title: "山陰道鎮撫使" }
      ],
      forcesEstimate: "薩摩長州土佐新軍約 5,000 人 (配備近代阿姆斯特朗大砲)",
      casualtiesEstimate: "陣亡 110 人，負傷 340 人，取得戰略大勝"
    },
    victor: "defender",
    victorStatement: "朝廷菊花錦旗抵達前線，薩長軍升格官軍，舊幕府軍全線崩潰逃回江戶",
    tactics: [
      "近代火砲街道封鎖：在狹窄的竹田街道佈設阿姆斯特朗迫擊砲，以密集開花彈阻滯數倍幕府步兵",
      "錦旗大義心理打擊：岩倉具視精心偽造並頒發朝廷「日月菊花錦旗」，幕府封建武士不敢向天子開槍",
      "來福槍線膛精準射殺：長州迷你步槍射程遠超幕府傳統火繩槍，在兩百米開外實施毀滅性齊射"
    ],
    strategicOutcome: "慶喜乘開陽丸軍艦秘密逃回江戶，舊幕府失去政權合法性，官軍兵臨江戶展開東征。",
    significance: "日本走向近代統一與廢除幕府封建制的最關鍵揭幕戰役。"
  },
  {
    id: "bat_jp_aizu_1868",
    eraId: "jp_bakumatsu",
    name: "會津若松城攻防戰 (奧羽列藩抵抗與白虎隊殉節)",
    year: 1868,
    period: "japanAtlas",
    locationAncient: "陸奧國會津若松城 (鶴之城)",
    locationModern: "福島縣會津若松市追手町鶴之城天守閣",
    coordinates: [139.93, 37.49],
    summary: "新政府官軍突破母成峠包圍會津若松城。會津全體軍民頑強籠城一個月抵抗。十六七歲少年組成的「白虎隊」在飯盛山上遠眺若松城濃煙烈火，誤判城破全員自刃。新政府軍以阿姆斯特朗巨砲傾瀉數千發砲彈，松平容保為保全軍民開城投降。",
    attacker: {
      factionName: "明治新政府東征大軍",
      faction: "meiji_army",
      commanders: [
        { name: "板垣退助", title: "土佐迅衝隊總督 / 參謀", figureId: "fig_jp_itagaki_taisuke" },
        { name: "伊地知正治", title: "薩摩砲兵戰術大師" },
        { name: "大山巖", title: "官軍砲兵隊長 (遭流彈負傷)" }
      ],
      forcesEstimate: "薩長土近代陸海大軍約 30,000 人",
      casualtiesEstimate: "陣亡約 1,000 人，負傷 2,000 人"
    },
    defender: {
      factionName: "會津藩與奧羽越列藩同盟",
      faction: "aizu",
      commanders: [
        { name: "松平容保", title: "會津藩主 (開城降伏)", figureId: "fig_jp_kondo_isami" },
        { name: "佐川官兵衛", title: "鬼官兵衛 / 會津家老" },
        { name: "中野竹子", title: "娘子軍首領 (中彈陣亡)" }
      ],
      forcesEstimate: "會津守軍與各部武裝約 5,000 人 (含白虎隊、婦女隊)",
      casualtiesEstimate: "陣亡約 3,000 餘人，白虎隊 19 名少年於飯盛山集體自刃"
    },
    victor: "attacker",
    victorStatement: "新政府軍阿姆斯特朗大砲日夜轟擊，白虎隊十六歲少年於飯盛山自刃殉節",
    tactics: [
      "巨砲密集飽和轟擊：伊地知正治在小田山架設五十門阿姆斯特朗大砲，向鶴之城傾瀉三千發砲彈",
      "母成峠險隘突破：板垣退助以奇兵迂迴突破會津天然門戶母成峠，神速殺至若松城下",
      "全民巷戰與拔刀阻擊：會津婦女組「娘子軍」持薙刀殺敵，少年白虎隊衝鋒，展現極致武士道精神"
    ],
    strategicOutcome: "奧羽越列藩同盟徹底瓦解，本州全境納入明治新政府統治，殘餘幕府海軍北撤蝦夷五稜郭。",
    significance: "日本戊辰戰爭最悲壯慘烈一幕，白虎隊忠節成為日本傳統精神文化的象徵。"
  },
  {
    id: "bat_jp_goryokaku_1869",
    eraId: "jp_bakumatsu",
    name: "箱館五稜郭之戰 (戊辰戰爭終幕·土方歲三最後武士)",
    year: 1869,
    period: "japanAtlas",
    locationAncient: "蝦夷地箱館五稜郭要塞",
    locationModern: "北海道函館市五稜郭町特別史跡五稜郭",
    coordinates: [140.75, 41.79],
    summary: "舊幕府海軍總裁榎本武揚與新選組副長土方歲三北上蝦夷，在法式星形要塞五稜郭建立「蝦夷共和國」。新政府軍出動鐵甲艦發動陸海總攻。土方歲三單騎衝鋒中彈陣亡；榎本武揚開城降伏，戊辰戰爭全面結束，日本實現明治大一統。",
    attacker: {
      factionName: "新政府陸海征討軍",
      faction: "meiji_army",
      commanders: [
        { name: "黑田清隆", title: "陸軍參謀 (戰後愛才保全榎本武揚)", figureId: "fig_jp_saigo_takamori" },
        { name: "清水谷公考", title: "箱館府知事 / 總督" }
      ],
      forcesEstimate: "新政府軍約 8,000 - 10,000 人，戰艦 8 艘 (含甲鐵鐵甲艦)",
      casualtiesEstimate: "陣亡約 300 餘人，負傷 800 人"
    },
    defender: {
      factionName: "蝦夷共和國守軍 (舊幕府殘軍)",
      faction: "goryokaku",
      commanders: [
        { name: "榎本武揚", title: "蝦夷共和國總裁 (海軍大家)", figureId: "fig_jp_katsu_kaishu" },
        { name: "土方歲三", title: "陸軍奉行並 / 新選組副長 (一本木關門戰歿)", figureId: "fig_jp_hijikata_toshizo" },
        { name: "大鳥圭介", title: "陸軍奉行 (步兵名將)" }
      ],
      forcesEstimate: "舊幕府陸海軍與新選組約 3,000 人",
      casualtiesEstimate: "陣亡近千人，土方歲三陣亡，榎本武揚率全軍投降"
    },
    victor: "attacker",
    victorStatement: "新政府軍海陸合圍五稜郭，土方歲三英勇戰歿，榎本武揚開城宣告明治統一",
    tactics: [
      "宮古灣接舷戰失敗：土方歲三試圖效仿義經跳幫奇襲奪取新政府最強「甲鐵艦」，因格林機槍阻擊受挫",
      "星形要塞幾何盲區防禦：五稜郭利用法式稜堡消除射擊死角，但難以抵禦現代鐵甲艦長程重砲",
      "一本木關門單騎決死衝鋒：土方歲三在弁天台場被困之際，策馬單騎突入亂軍陣中中彈壯烈捐軀"
    ],
    strategicOutcome: "蝦夷共和國覆滅，明治新政府設立「開拓使」全面開發北海道，戊辰戰爭正式終結。",
    significance: "日本最後武士時代的悲壯落幕，自源賴朝以來近七百年武士階級封建統治歷史徹底畫上句號。"
  },
  {
    id: "bat_jp_tabaruzaka_1877",
    eraId: "jp_meiji_modern",
    name: "西南戰爭·田原坂血戰 (士族拔刀隊 vs 西鄉薩摩軍)",
    year: 1877,
    period: "japanAtlas",
    locationAncient: "肥後國山本郡田原坂",
    locationModern: "熊本縣熊本市北區植木町田原坂西南之役古戰場",
    coordinates: [130.68, 32.90],
    summary: "西鄉隆盛率一萬三千薩摩士族起兵。谷干城死守加藤清正建造的熊本巨城，薩摩軍受阻。雙方在田原坂展開十七晝夜血戰，雨中肉搏彈雨如注。政府軍警視廳「拔刀隊」以劍術破示現流，徵兵新軍擊潰薩摩軍，西鄉於城山自刃，最後武士時代終結。",
    attacker: {
      factionName: "大日本帝國政府徵兵討伐軍",
      faction: "meiji_army",
      commanders: [
        { name: "有栖川宮熾仁親王", title: "征討總督", figureId: "fig_jp_yamagata_aritomo" },
        { name: "山縣有朋", title: "參謀兼陸軍中將", figureId: "fig_jp_yamagata_aritomo" },
        { name: "谷干城", title: "熊本鎮台司令官 (死守熊本城)", figureId: "fig_jp_yamagata_aritomo" }
      ],
      forcesEstimate: "全國徵募平民正規軍與警視拔刀隊約 60,000 人 (田原坂戰區約 20,000 人)",
      casualtiesEstimate: "田原坂戰區陣亡 3,000 餘人，負傷 4,000 餘人 (每日消耗彈藥三十萬發)"
    },
    defender: {
      factionName: "西鄉隆盛薩摩士族私學校軍",
      faction: "satsuma",
      commanders: [
        { name: "西鄉隆盛", title: "西鄉大元帥 (最後於鹿兒島城山自盡)", figureId: "fig_jp_saigo_takamori" },
        { name: "桐野利秋", title: "人斬半次郎 / 薩摩軍總指揮", figureId: "fig_jp_saigo_takamori" },
        { name: "村田新八", title: "西鄉心腹幹將" }
      ],
      forcesEstimate: "薩摩示現流武士精銳約 13,000 - 15,000 人",
      casualtiesEstimate: "田原坂戰區陣亡 4,000 餘人，薩摩武士精華損失殆盡"
    },
    victor: "attacker",
    victorStatement: "警視拔刀隊雨中破示現流，平民徵兵擊敗世襲武士，西鄉隆盛城山自盡",
    tactics: [
      "加藤清正堅城死守：谷干城利用熊本城高大「武者返」弧形石垣與深壕，以寡敵眾堅守五十四天",
      "警視廳拔刀隊肉搏：為壓制薩摩示現流恐怖的白刃衝鋒，政府挑選舊會津士族警察組建拔刀隊血戰",
      "連發來福槍火力覆蓋：政府平民士兵配備史奈德連發後膛步槍，在泥濘塹壕實施不間斷彈雨壓制"
    ],
    strategicOutcome: "薩摩士族叛亂徹底平定，西鄉隆盛切腹自盡，士族武力反抗明治政府路線徹底終結。",
    significance: "以事實宣告「平民農民徵兵」徹底戰勝「世襲武士階級」，日本近代徵兵制度與中央政權從此不可動搖。"
  },
  {
    id: "bat_jp_tsushima_1905",
    eraId: "jp_meiji_modern",
    name: "對馬海峽海戰 (東鄉平八郎丁字戰法全殲波羅的海艦隊)",
    year: 1905,
    period: "japanAtlas",
    locationAncient: "對馬海峽·日本海海域",
    locationModern: "長崎縣對馬市對馬海峽海域",
    coordinates: [130.00, 34.50],
    summary: "日俄戰爭最後大決戰。沙俄第二太平洋波羅的海遠征艦隊歷經八個月航行抵達對馬海峽。東鄉平八郎率聯合艦隊打出Z字旗「皇國興廢在此一戰」，以著名「丁字戰法（敵前大回頭）」搶佔T字橫頭，集中下瀨火藥重砲轟擊。俄艦隊幾乎全軍覆沒，俄國被迫議和。",
    attacker: {
      factionName: "大日本帝國海軍聯合艦隊",
      faction: "japan_navy",
      commanders: [
        { name: "東鄉平八郎", title: "聯合艦隊司令長官 (三笠號旗艦)", figureId: "fig_jp_togo_heihachiro" },
        { name: "秋山真之", title: "作戰參謀 (草擬丁字戰法與七段作戰)", figureId: "fig_jp_togo_heihachiro" },
        { name: "加藤友三郎", title: "聯合艦隊參謀長" }
      ],
      forcesEstimate: "戰艦 4 艘、裝甲巡洋艦 8 艘，各型艦艇共 96 艘",
      casualtiesEstimate: "僅沉沒魚雷艇 3 艘，陣亡 117 人，負傷 583 人 (奇蹟級超低傷亡)"
    },
    defender: {
      factionName: "俄羅斯帝國第二太平洋艦隊 (波羅的海艦隊)",
      faction: "russia_navy",
      commanders: [
        { name: "羅傑斯特文斯基", title: "艦隊司令長官 (蘇沃洛夫號重傷被俘)" },
        { name: "費爾克薩姆", title: "戰列艦分隊長 (戰前病逝戰中隱匿)" },
        { name: "涅博加托夫", title: "繼任指揮官 (率殘艦投降)" }
      ],
      forcesEstimate: "主力戰列艦 8 艘，各型戰艦及輔助船共 38 艘",
      casualtiesEstimate: "沉沒 21 艘，被俘 7 艘，陣亡 4,830 人，被俘 6,106 人，全軍覆沒"
    },
    victor: "attacker",
    victorStatement: "打出Z字旗實施敵前大回頭丁字戰法，日艦以超低傷亡全殲沙俄波羅的海艦隊",
    tactics: [
      "敵前大回頭（丁字戰法）：在敵前八千米處大膽實施大角度連續回轉，搶佔俄艦隊行進路線前方T字橫頭",
      "下瀨火藥與伊集院信管：日軍砲彈裝填烈性下瀨火藥，碰觸即炸引燃鋼甲，在俄艦甲板形成一片火海",
      "無線電接力預警網絡：信濃丸等輔助巡洋艦以無線電發布「今日天氣晴朗但波浪甚高」，精確引導截擊"
    ],
    strategicOutcome: "沙俄徹底喪失制海權，在美國老羅斯福總統斡旋下簽署《樸茨茅斯條約》，日本取得庫頁島南部及南滿鐵路權益。",
    significance: "近代世界海戰史上規模最大、最徹底的殲滅戰之一，亞洲國家在近代首次全面戰勝歐洲列強之歷史里程碑。"
  }
];

// Add backward compatible fields for every battle
UPGRADED_BATTLES.forEach(b => {
  b.parties = {
    invader: `${b.attacker.factionName} (${b.attacker.forcesEstimate})`,
    defender: `${b.defender.factionName} (${b.defender.forcesEstimate})`
  };
  b.keyStrategies = b.tactics;
});

const content = `// Japanese Historical Atlas Battles Dataset (${UPGRADED_BATTLES.length} Authoritative Epic Battles with Full Military Intelligence)
export const JAPAN_BATTLES = ${JSON.stringify(UPGRADED_BATTLES, null, 2)};
`;

const battlesFile = path.join(__dirname, '..', 'src', 'data', 'japan', 'japanBattles.js');
fs.writeFileSync(battlesFile, content, 'utf8');
console.log(`Successfully upgraded ${UPGRADED_BATTLES.length} battles with full attacker/defender schemas!`);
