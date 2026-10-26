const fs = require('fs');
const path = require('path');

const NEW_FIGURES = [
  // ==========================================
  // Group 1: 戰國後期與安土桃山 (Late Sengoku & Azuchi-Momoyama)
  // ==========================================
  {
    id: "fig_jp_sakai_tadatsugu",
    name: "酒井忠次",
    courtesyName: "小平次 / 左衛門督",
    lifeSpan: "1527 - 1596",
    faction: "azuchi_momoyama",
    clanTag: "德川四天王之首",
    emblemChar: "鼓",
    mainColor: "#b45309",
    bgColor: "#451a03",
    role: "德川四天王之首席大老 / 海老掬之舞 / 三方原酒井之太鼓",
    roleType: "general",
    avatar: "./images/figures/fig_jp_sakai_tadatsugu.svg",
    importance: 5,
    hometown: "三河國額田郡 (今愛知縣岡崎市)",
    shortBio: "德川家康最受信賴之同族長老，德川四天王中資歷最深者。三方原合戰殿後率殘兵入濱松城，下令洞開城門並擂響「酒井之太鼓」，使武田軍生疑不敢輕進。長篠之戰獻策夜襲鳶之巢山，斬殺武田名將河窪信實，粉碎武田包圍網。性格豁達，善跳「海老掬舞」鼓舞三河武士士氣。",
    historicalSignificance: "德川軍團軍政重鎮，三方原空城計與長篠奇襲立下不世之功。",
    abilities: { strategy: 90, commanding: 92, politics: 88, intellect: 87, courage: 93, charisma: 91 }
  },
  {
    id: "fig_jp_sakakibara_yasumasa",
    name: "榊原康政",
    courtesyName: "小平太 / 式部大輔",
    lifeSpan: "1548 - 1606",
    faction: "azuchi_momoyama",
    clanTag: "德川四天王",
    emblemChar: "檄",
    mainColor: "#b45309",
    bgColor: "#451a03",
    role: "德川四天王之一 / 館林藩初代藩主 / 小牧長久手撰檄文使秀吉懸賞",
    roleType: "general",
    avatar: "./images/figures/fig_jp_sakakibara_yasumasa.svg",
    importance: 5,
    hometown: "三河國額田郡 (今愛知縣岡崎市)",
    shortBio: "自幼侍奉家康，與本多忠勝並稱德川雙璧，更長於文墨政事。姊川合戰以側翼突擊立奇功。小牧長久手之戰撰寫檄文痛陳羽柴秀吉「出身微賤、篡奪織田基業」，秀吉聞訊暴怒懸賞十萬石購其首級。後在長久手率部逆襲擊斬森長可，德川軍大勝。關原合戰隨秀忠行軍，維護幕府初創基業。",
    historicalSignificance: "文武雙全之代表，以檄文震撼天下，長久手陣中斬將立威。",
    abilities: { strategy: 93, commanding: 91, politics: 92, intellect: 94, courage: 89, charisma: 90 }
  },
  {
    id: "fig_jp_maeda_keiji",
    name: "前田慶次",
    courtesyName: "利益 / 慶次郎 / 天下第一傾奇者",
    lifeSpan: "1543 - 1612",
    faction: "sengoku",
    clanTag: "傾奇者大ふへん者",
    emblemChar: "狂",
    mainColor: "#dc2626",
    bgColor: "#450a0a",
    role: "戰國第一傾奇者 / 穀藏院飄戶道齋 / 長谷堂殿後一騎當千",
    roleType: "general",
    avatar: "./images/figures/fig_jp_maeda_keiji.svg",
    importance: 5,
    hometown: "尾張國荒子 (今愛知縣名古屋市)",
    shortBio: "瀧川一益一族出身，入繼前田家。身材魁梧武藝冠絕，精通連歌茶道，騎乘愛馬松風我行我素，世稱「天下第一傾奇者」。前田利家掌權後出奔京都，與直江兼續結為莫逆。長谷堂合戰直江軍潰退時，慶次單騎突入最上軍斬將數十，親自殿後掩護上杉軍全師而退，晚年隱居米澤安貧樂道。",
    historicalSignificance: "戰國風雅豪俠精神之極致化身，文武兼備且蔑視凡俗權貴的傳奇武士。",
    abilities: { strategy: 86, commanding: 90, politics: 72, intellect: 93, courage: 100, charisma: 98 }
  },
  {
    id: "fig_jp_kobayakawa_hideaki",
    name: "小早川秀秋",
    courtesyName: "金吾中納言 / 木下秀俊",
    lifeSpan: "1582 - 1602",
    faction: "azuchi_momoyama",
    clanTag: "金吾中納言",
    emblemChar: "決",
    mainColor: "#d97706",
    bgColor: "#451a03",
    role: "筑前名島藩主 / 關原合戰松尾山決策扭轉天下走向",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_kobayakawa_hideaki.svg",
    importance: 4,
    hometown: "近江國 (今滋賀縣)",
    shortBio: "豐臣秀吉之妻北政所（寧寧）之侄，曾被收為秀吉養子，後過繼予小早川隆景。朝鮮文祿之役中曾親臨戰陣破敵。關原合戰時進駐松尾山，兵力達萬餘人，成為東西兩軍拉攏樞紐。在家康開火威嚇下，秀秋毅然下山猛攻西軍大谷吉繼側翼，導致西軍戰線雪崩瓦解，戰後獲封備前岡山五十七萬石。",
    historicalSignificance: "關原合戰扭轉乾坤之關鍵核心，其抉擇終結豐臣天下開創江戶時代。",
    abilities: { strategy: 75, commanding: 78, politics: 76, intellect: 74, courage: 79, charisma: 76 }
  },
  {
    id: "fig_jp_goto_matabei",
    name: "後藤又兵衛",
    courtesyName: "基次 / 黑田八虎之首",
    lifeSpan: "1560 - 1615",
    faction: "azuchi_momoyama",
    clanTag: "大坂五人眾",
    emblemChar: "槍",
    mainColor: "#dc2626",
    bgColor: "#450a0a",
    role: "黑田家先鋒名將 / 大坂五人眾 / 道明寺之戰決死衝鋒勇將",
    roleType: "general",
    avatar: "./images/figures/fig_jp_goto_matabei.svg",
    importance: 5,
    hometown: "播磨國別所 (今兵庫縣加西市)",
    shortBio: "黑田官兵衛手下第一猛將，黑田八虎之首，使名槍「日本號」勇冠三軍。朝鮮之役屢登首功。因與黑田長政不合出奔，遭長政以「奉公構」封殺流浪天下。大坂之陣應秀賴之召入大坂城，名列「大坂五人眾」。道明寺之戰在後援未至且大霧彌漫中孤軍突入伊達政宗與松平忠輝數萬軍中，血戰力竭壯烈戰死。",
    historicalSignificance: "戰國豪邁不屈之槍術名將，大坂夏之陣以身殉道無悔壯烈傳奇。",
    abilities: { strategy: 88, commanding: 95, politics: 65, intellect: 83, courage: 99, charisma: 94 }
  },
  {
    id: "fig_jp_kimura_shigenari",
    name: "木村重成",
    courtesyName: "長門守",
    lifeSpan: "1593 - 1615",
    faction: "azuchi_momoyama",
    clanTag: "豐臣家若武者",
    emblemChar: "香",
    mainColor: "#f59e0b",
    bgColor: "#451a03",
    role: "豐臣秀賴重臣兼乳兄弟 / 八尾若江之戰名留青史之美男子",
    roleType: "general",
    avatar: "./images/figures/fig_jp_kimura_shigenari.svg",
    importance: 4,
    hometown: "攝津國大坂 (今大阪府大阪市)",
    shortBio: "豐臣秀賴乳母之子，容姿端麗，進退有禮，深受秀賴信任。大坂冬之陣在今福之戰力抗佐竹義宣軍。夏之陣前出征八尾若江，決戰前夕以名香薰染兜鍪內部，誓言「若被斬首，亦不可令敵聞首級腐臭」。於若江之戰力戰井伊直政赤備軍，力盡戰死。家康檢視其首級感嘆其武士風骨，傳為千古美談。",
    historicalSignificance: "日本武士道精神中「死狂與至美」之標竿人物，忠烈從容之青年名將。",
    abilities: { strategy: 82, commanding: 87, politics: 84, intellect: 86, courage: 96, charisma: 95 }
  },
  {
    id: "fig_jp_hosokawa_tadaoki",
    name: "細川忠興",
    courtesyName: "與一郎 / 三齋 / 利休七哲",
    lifeSpan: "1563 - 1646",
    faction: "azuchi_momoyama",
    clanTag: "細川宗家",
    emblemChar: "齋",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "丹後田邊藩主 / 小倉藩初代藩主 / 細川伽羅奢之夫 / 利休七哲",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_hosokawa_tadaoki.svg",
    importance: 5,
    hometown: "山城國京都 (今京都府)",
    shortBio: "細川藤孝嫡子，娶明智光秀之女玉子（伽羅奢）。本能寺之變毅然拒絕岳父明智光秀勸降，堅定依附羽柴秀吉。利休七哲之一，創製「三齋流」茶道並精研甲冑刀劍。關原合戰加入家康東軍，伽羅奢在石田三成圍攻下自盡殉節，忠興在關原前線激戰報仇。後開創小倉藩三十九萬石，文武兼資壽至八十四歲。",
    historicalSignificance: "歷侍織田、豐臣、德川三朝屹立不搖之世家領袖，茶道與武藝雙絕。",
    abilities: { strategy: 89, commanding: 91, politics: 93, intellect: 95, courage: 92, charisma: 88 }
  },
  {
    id: "fig_jp_hosokawa_fujitaka",
    name: "細川幽齋",
    courtesyName: "藤孝 / 幽齋玄旨 / 古今傳授",
    lifeSpan: "1534 - 1610",
    faction: "sengoku",
    clanTag: "歌道宗匠",
    emblemChar: "歌",
    mainColor: "#ca8a04",
    bgColor: "#422006",
    role: "足利將軍幕臣 / 古今和歌集唯一傳人 / 田邊城籠城戰",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_hosokawa_fujitaka.svg",
    importance: 5,
    hometown: "山城國京都 (今京都府)",
    shortBio: "室町將軍足利義輝與義昭之親信重臣，後引介織田信長上洛。不僅精通各派劍術騎射，更是當時唯一掌握《古事記》《古今和歌集》奧義的「古今傳授」唯一繼承者。關原合戰時以五百兵堅守丹後田邊城，抵擋西軍一萬五千兵長達五十日。後陽成天皇恐其戰死導致和歌文脈斷絕，特頒敕令令雙方罷兵解圍。",
    historicalSignificance: "日本文脈之守護神，以一人之詩才學問引動天皇頒敕令解救名城之唯一傳奇。",
    abilities: { strategy: 92, commanding: 88, politics: 95, intellect: 99, courage: 90, charisma: 97 }
  },
  {
    id: "fig_jp_gamo_ujisato",
    name: "蒲生氏鄉",
    courtesyName: "鶴千代 / 忠三郎 / 飛驒守",
    lifeSpan: "1556 - 1595",
    faction: "sengoku",
    clanTag: "利休七哲首席",
    emblemChar: "鶴",
    mainColor: "#dc2626",
    bgColor: "#450a0a",
    role: "信長愛婿 / 會津若松九十二萬石大名 / 利休七哲首席 / 吉利支丹大名",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_gamo_ujisato.svg",
    importance: 5,
    hometown: "近江國日野 (今滋賀縣蒲生郡)",
    shortBio: "織田信長賞識其非凡才能，將次女冬姬許配為妻。本能寺之變保護信長遺族避難日野城。後追隨秀吉平定九州與奧州，受封會津九十二萬石鎮撫東北諸侯，修建名城會津若松城並開闢繁榮市町。洗禮名良三（Leo），身為利休七哲之首，兼具卓越統帥才能與開明商貿眼光，秀吉曾嘆「天下能奪我政權者唯氏鄉一人」。",
    historicalSignificance: "文武商賈、築城治國全才之模範大名，戰國最具帝王器量之雄才。",
    abilities: { strategy: 95, commanding: 94, politics: 96, intellect: 97, courage: 92, charisma: 96 }
  },
  {
    id: "fig_jp_mogami_yoshiaki",
    name: "最上義光",
    courtesyName: "白鳥十郎 / 羽州之狐 / 出羽之虎將",
    lifeSpan: "1546 - 1614",
    faction: "sengoku",
    clanTag: "最上源氏",
    emblemChar: "狐",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "出羽國山形五十七萬石霸主 / 長谷堂合戰力抗上杉西軍",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_mogami_yoshiaki.svg",
    importance: 5,
    hometown: "出羽國山形 (今山形縣山形市)",
    shortBio: "清和源氏足利氏一族。伊達政宗之親舅父。勇猛善用謀略，一統紛亂之出羽國。關原合戰出羽戰場（長谷堂之戰）與伊達政宗結盟，在直江兼續率二萬大軍壓境下，義光親自揮舞鐵棒督戰，誓死堅守山形城與長谷堂城，並在關原捷報傳來時大舉反擊，追擊直江兼續，一舉躍升為山形五十七萬石東北第二大名。",
    historicalSignificance: "開拓東北重鎮山形之基石，長谷堂合戰粉碎上杉軍的北國梟雄。",
    abilities: { strategy: 94, commanding: 91, politics: 93, intellect: 95, courage: 93, charisma: 89 }
  },

  // ==========================================
  // Group 2: 江戶前期與中世治世 (Early & Mid Edo Period)
  // ==========================================
  {
    id: "fig_jp_amakusa_shiro",
    name: "天草四郎",
    courtesyName: "益田時貞 / 天主教洗禮名熱羅尼莫",
    lifeSpan: "1621 - 1638",
    faction: "edo",
    clanTag: "島原起義總大將",
    emblemChar: "天",
    mainColor: "#a855f7",
    bgColor: "#3b0764",
    role: "島原之亂十七歲起義領袖 / 堅守原城抗衡幕府十二萬大軍",
    roleType: "general",
    avatar: "./images/figures/fig_jp_amakusa_shiro.svg",
    importance: 5,
    hometown: "肥後國天草 (今熊本縣上天草市)",
    shortBio: "小西行長遺臣益田好次之子。自幼聰慧過人，被島原與天草教民視為耶穌會預言中降臨之「天童」。因領主松倉勝家極度殘酷盤剝與殘酷彈壓吉利支丹，天草四郎於十六歲率領三萬七千名農民與浪人起事，進駐廢棄的原城。以嚴密組織擊退幕府軍多次總攻，迫使幕府調集十二萬五千大軍與荷蘭戰船砲擊，苦撐數月城破殉教。",
    historicalSignificance: "日本歷史規模最大農民宗教抗爭總首領，直接促成江戶幕府徹底實施鎖國政策。",
    abilities: { strategy: 88, commanding: 90, politics: 82, intellect: 91, courage: 98, charisma: 100 }
  },
  {
    id: "fig_jp_yagyu_jubei",
    name: "柳生十兵衛",
    courtesyName: "三嚴 / 柳生新陰流極致",
    lifeSpan: "1607 - 1650",
    faction: "edo",
    clanTag: "新陰流大劍豪",
    emblemChar: "劍",
    mainColor: "#475569",
    bgColor: "#0f172a",
    role: "將軍家劍術指南役 / 天下獨眼劍豪傳奇 / 著《月之抄》",
    roleType: "general",
    avatar: "./images/figures/fig_jp_yagyu_jubei.svg",
    importance: 5,
    hometown: "大和國柳生莊 (今奈良縣奈良市)",
    shortBio: "江戶幕府劍術師範柳生宗矩長子。二十歲時因觸怒三代將軍德川家光遭罷黜，隱遁大和柳生莊十二載，周遊諸國磨礪劍技，傳聞其一目失明以黑眼罩示人。後重返江戶擔任將軍身邊大目付與劍術要席。總結新陰流絕學撰寫《月之抄》，主張「活人劍」之至高境界，成為日本大眾文化中無人不知的無雙劍聖。",
    historicalSignificance: "將柳生新陰流哲學推向頂峰之大劍客，日本武俠文化之永恆偶像。",
    abilities: { strategy: 87, commanding: 85, politics: 78, intellect: 94, courage: 100, charisma: 97 }
  },
  {
    id: "fig_jp_tokugawa_mitsukuni",
    name: "德川光圀",
    courtesyName: "水戶黃門 / 日光山人 / 子龍",
    lifeSpan: "1628 - 1701",
    faction: "edo",
    clanTag: "水戶黃門",
    emblemChar: "水",
    mainColor: "#ca8a04",
    bgColor: "#422006",
    role: "水戶德川家第二代藩主 / 主持編纂《大日本史》奠定尊皇論",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tokugawa_mitsukuni.svg",
    importance: 5,
    hometown: "常陸國水戶 (今茨城縣水戶市)",
    shortBio: "德川賴房之子，家康之孫。為人明辨豁達，禮聘明朝遺臣朱舜水來日講學，在江戶小石川創辦彰考館，主持動員天下學者編纂紀傳體巨著《大日本史》，開創「水戶學派」，確立以天皇為正統之尊皇大義名分，深遠影響兩百年後的幕末維新。民間相傳其化名「水戶黃門」微服巡行諸國懲奸除惡，為日本婦孺皆知之明君。",
    historicalSignificance: "水戶學派創始人與《大日本史》推動者，埋下尊王倒幕思想最重要的歷史火種。",
    abilities: { strategy: 91, commanding: 83, politics: 97, intellect: 99, courage: 90, charisma: 98 }
  },
  {
    id: "fig_jp_hoshina_masayuki",
    name: "保科正之",
    courtesyName: "幸松 / 會津藩初代藩主",
    lifeSpan: "1611 - 1673",
    faction: "edo",
    clanTag: "會津松平始祖",
    emblemChar: "保",
    mainColor: "#15803d",
    bgColor: "#052e16",
    role: "德川秀忠四子 / 會津藩初代藩主 / 輔政名相 / 訂《會津家訓十五條》",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_hoshina_masayuki.svg",
    importance: 5,
    hometown: "江戶城 (今東京都)",
    shortBio: "二代將軍德川秀忠庶子，幼年寄養高遠藩保科家。三代將軍家光臨終前執其手托孤，任輔政之首，輔佐幼君四代將軍德川家綱二十餘載。推行「明曆大火」後江戶重建、廢除武士殉死陋習、實施老人撫恤「養老扶持」與社倉糧食儲備，使幕府由武斷統治轉為文治德政。制訂《會津家訓十五條》，要求後代「誓死效忠將軍家」。",
    historicalSignificance: "江戶幕府文治政治之奠基名相，兼顧仁政與儒學道德的幕府楷模。",
    abilities: { strategy: 93, commanding: 86, politics: 99, intellect: 97, courage: 88, charisma: 95 }
  },
  {
    id: "fig_jp_tokugawa_tsunayoshi",
    name: "德川綱吉",
    courtesyName: "犬公方 / 館林德松",
    lifeSpan: "1646 - 1709",
    faction: "edo",
    clanTag: "江戶五代將軍",
    emblemChar: "綱",
    mainColor: "#854d0e",
    bgColor: "#422006",
    role: "江戶幕府第五代征夷大將軍 / 元祿文化繁榮推手 / 頒《生類憐憫令》",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tokugawa_tsunayoshi.svg",
    importance: 4,
    hometown: "江戶城 (今東京都)",
    shortBio: "三代將軍家光四子。酷愛儒學，親自向大名幕臣講授《論語》《易經》，建湯島聖堂確立儒學國教地位。大力提倡尊崇孝道與禮樂文教，催生江戶史上璀璨奪目的「元祿文化」（近松、芭蕉、光琳等大師輩出）。後期因篤信佛教頒布極其極端的保護動物法令《生類憐憫令》，甚至懲辦傷狗百姓而被戲稱為「犬公方」，評價毀譽參半。",
    historicalSignificance: "江戶儒學文治化與元祿文化繁榮之最高推動者，日本歷史最具爭議之將軍。",
    abilities: { strategy: 82, commanding: 75, politics: 89, intellect: 92, courage: 80, charisma: 86 }
  },
  {
    id: "fig_jp_ooka_tadasuke",
    name: "大岡忠相",
    courtesyName: "大岡越前 / 越前守",
    lifeSpan: "1677 - 1752",
    faction: "edo",
    clanTag: "名奉行越前",
    emblemChar: "岡",
    mainColor: "#1e3a8a",
    bgColor: "#0f172a",
    role: "江戶南町奉行 / 享保改革司法大臣 / 町火消消防隊與小石川養生所",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_ooka_tadasuke.svg",
    importance: 5,
    hometown: "江戶 (今東京都)",
    shortBio: "江戶幕府著名法官與名臣。八代將軍德川吉宗推行「享保改革」之核心重臣，任南町奉行近二十載。嚴明執法、體察民情，主持設立「町火消」（市民消防隊）防治江戶火災，設立「小石川養生所」為貧民提供免費醫療，健全司法判例集《公事方御定書》。民間流傳眾多「大岡政談」智慧斷案傳奇，為日本家喻戶曉之清官象徵。",
    historicalSignificance: "江戶法制近代化與平民福利事業開創者，司法公正廉明的永恆象徵。",
    abilities: { strategy: 88, commanding: 80, politics: 98, intellect: 97, courage: 93, charisma: 96 }
  },
  {
    id: "fig_jp_matsuo_basho",
    name: "松尾芭蕉",
    courtesyName: "金作 / 宗房 / 日本俳聖",
    lifeSpan: "1644 - 1694",
    faction: "edo",
    clanTag: "日本俳聖",
    emblemChar: "芭",
    mainColor: "#15803d",
    bgColor: "#052e16",
    role: "日本俳諧鼻祖 / 蕉風俳諧創始人 / 紀行文學《奧之細道》",
    roleType: "cultural",
    avatar: "./images/figures/fig_jp_matsuo_basho.svg",
    importance: 5,
    hometown: "伊賀國上野 (今三重縣伊賀市)",
    shortBio: "下級武士出身，客居江戶芭蕉庵。將原本遊戲性質的俳諧昇華為具有深刻哲思與自然禪意的至高詩歌藝術，創立「蕉風」。一生雲遊四方，徒步跋涉日本東北奧羽、北陸山海，撰寫古典紀行文學巔峰《奧之細道》。名句「古池冷浸月，蛙躍入水聲」「寂寞如蟬鳴，凝入山石間」，將「幽玄」「寂侘」（Wabi-Sabi）美學推向世界文學殿堂。",
    historicalSignificance: "被尊為日本「俳聖」，以極簡十七音深刻確立日本民族之自然心靈美學。",
    abilities: { strategy: 70, commanding: 50, politics: 60, intellect: 100, courage: 85, charisma: 99 }
  },
  {
    id: "fig_jp_ogata_korin",
    name: "尾形光琳",
    courtesyName: "市之丞 / 方祝 / 琳派宗師",
    lifeSpan: "1658 - 1716",
    faction: "edo",
    clanTag: "琳派藝術宗師",
    emblemChar: "琳",
    mainColor: "#eab308",
    bgColor: "#422006",
    role: "元祿琳派藝術宗師 / 日本國寶《燕子花圖屏風》《紅白梅圖屏風》",
    roleType: "cultural",
    avatar: "./images/figures/fig_jp_ogata_korin.svg",
    importance: 5,
    hometown: "山城國京都 (今京都府)",
    shortBio: "京都高級和服布料商「雁金屋」之子，深受本阿彌光悅與俵屋宗達影響。大膽將日本傳統工藝圖案化、抽象化，運用金箔背景、青綠礦物顏料與水墨流淌技巧（垂屋技法），創立獨樹一幟的「琳派」藝術流派。其所繪國寶《燕子花圖屏風》與《紅白梅圖屏風》構圖大膽奇絕、金碧輝煌而洗練，對現代日本設計乃至西洋新藝術運動產生巨大衝擊。",
    historicalSignificance: "日本美術史上最具裝飾性與前衛感的天才宗師，奠定「琳派」世界美學標竿。",
    abilities: { strategy: 65, commanding: 50, politics: 55, intellect: 98, courage: 80, charisma: 96 }
  },
  {
    id: "fig_jp_tanuma_okitsugu",
    name: "田沼意次",
    courtesyName: "龍助 / 主殿頭",
    lifeSpan: "1719 - 1788",
    faction: "edo",
    clanTag: "老中田沼時代",
    emblemChar: "商",
    mainColor: "#d97706",
    bgColor: "#451a03",
    role: "江戶幕府老中 / 重商主義財政改革 / 拓荒蝦夷地與長崎外貿擴張",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tanuma_okitsugu.svg",
    importance: 4,
    hometown: "江戶 (今東京都)",
    shortBio: "由低微之足輕之子憑藉過人理財幹才逐步擢升為幕府權傾天下之老中。面對幕府財政匱乏，打破傳統重農抑商教條，大膽實施「重商主義」：公認商人「株仲間」（同業公會）並徵收運上冥加金、推行印旛沼開墾、擴大長崎對華對荷貿易、派遣探險隊調查蝦夷地（北海道）與開發北方資源，使江戶商品經濟空前繁榮，但亦引發賄賂盛行之譏。",
    historicalSignificance: "江戶時代唯一嘗試轉向近代商品貨幣經濟的改革舵手，日本重商主義先驅。",
    abilities: { strategy: 93, commanding: 72, politics: 95, intellect: 96, courage: 89, charisma: 85 }
  },
  {
    id: "fig_jp_matsudaira_sadanobu",
    name: "松平定信",
    courtesyName: "白河樂翁 / 寬政改革",
    lifeSpan: "1759 - 1829",
    faction: "edo",
    clanTag: "寬政名相",
    emblemChar: "寬",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "白河藩第三代藩主 / 幕府老中首座 / 主持「寬政改革」/ 興建南湖公園",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_matsudaira_sadanobu.svg",
    importance: 5,
    hometown: "江戶 (今東京都)",
    shortBio: "八代將軍德川吉宗之孫。在白河藩主任內遇天明大饑荒，實施嚴密賑濟，白河藩竟無一人餓斃，聲名鵲起。後出任幕府老中首座主持「寬政改革」：頒布《棄金令》豁免旗本債務、實施《寬政異學之禁》確立朱子學正統、推行「七分積金」設立平民福利基金，並在白河興建日本最早向百姓開放的公眾園林「南湖公園」，自號「樂翁」。",
    historicalSignificance: "江戶三大改革中「寬政改革」總推手，實踐儒家士大夫治國平天下理念的典範。",
    abilities: { strategy: 90, commanding: 78, politics: 97, intellect: 96, courage: 88, charisma: 92 }
  },
  {
    id: "fig_jp_motoori_norinaga",
    name: "本居宣長",
    courtesyName: "鈴屋 / 舜庵 / 國學集大成者",
    lifeSpan: "1730 - 1801",
    faction: "edo",
    clanTag: "日本國學大成",
    emblemChar: "哀",
    mainColor: "#b91c1c",
    bgColor: "#450a0a",
    role: "江戶國學四大師之集大成者 / 著《古事記傳》/ 提倡「物之哀」美學",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_motoori_norinaga.svg",
    importance: 5,
    hometown: "伊勢國松阪 (今三重縣松阪市)",
    shortBio: "兼職兒科醫生之學者。師事賀茂真淵，致力擺脫儒教與佛教觀點，回溯日本上古本原精神。耗費三十五年光陰完成四十四卷巨著《古事記傳》，使湮沒千年之上古神話與古語徹底釋讀。在《源氏物語玉小櫛》中提出「物之哀」（物の哀れ）為日本文學精神本質。其倡導之神道本原與皇統思想，日後成為幕末尊王論之重要理論源頭。",
    historicalSignificance: "日本國學集大成者，確立日本固有古典美學與上古神道研究範式之學術泰斗。",
    abilities: { strategy: 75, commanding: 50, politics: 70, intellect: 100, courage: 85, charisma: 94 }
  },
  {
    id: "fig_jp_ino_tadataka",
    name: "伊能忠敬",
    courtesyName: "勘敬 / 東瀛地圖之祖",
    lifeSpan: "1745 - 1818",
    faction: "edo",
    clanTag: "地圖測量之先驅",
    emblemChar: "輿",
    mainColor: "#0d9488",
    bgColor: "#042f2e",
    role: "天文地理學者 / 步測全日本海岸線 / 繪製《大日本沿海輿地全圖》",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_ino_tadataka.svg",
    importance: 5,
    hometown: "上總國山邊郡 (今千葉縣九十九里町)",
    shortBio: "酒造商出身，五十歲隱退後始赴江戶拜天文名家高橋至時為師，精研天文曆法與西洋測量技術。自五十五歲起十七年間，歷經十次遠征，徒步近四萬公里（相當於繞地球一周），以推車步測、星宿觀測與導線法丈量全日本列島海岸線。身後弟子整理出版《大日本沿海輿地全圖》（伊能圖），其精確度震撼歐美列強，奠定現代日本國土地圖基石。",
    historicalSignificance: "五十歲立志丈量全日本之科學傳奇，近代地理測繪史上世界級偉大科學家。",
    abilities: { strategy: 88, commanding: 80, politics: 75, intellect: 100, courage: 96, charisma: 93 }
  },

  // ==========================================
  // Group 3: 江戶後期文化與浮世繪巨擘 (Late Edo Masters)
  // ==========================================
  {
    id: "fig_jp_katsushika_hokusai",
    name: "葛飾北齋",
    courtesyName: "畫狂老人卍 / 鐵藏 / 春朗",
    lifeSpan: "1760 - 1849",
    faction: "edo",
    clanTag: "浮世繪天才宗師",
    emblemChar: "浪",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "世界著名浮世繪泰斗 / 《富嶽三十六景·神奈川沖浪裏》《北齋漫畫》",
    roleType: "cultural",
    avatar: "./images/figures/fig_jp_katsushika_hokusai.svg",
    importance: 5,
    hometown: "江戶本所 (今東京都墨田區)",
    shortBio: "自稱「畫狂老人卍」，一生改名三十次、遷居九十三次，執著作畫至九十高齡。融合日本傳統狩野派、土佐派與西洋透視法，創作舉世聞名的《富嶽三十六景》，其中《神奈川沖浪裏》被譽為全人類視覺藝術中最具代表性之名作。《北齋漫畫》記錄江戶百態，被視為現代日本漫畫鼻祖。其作品強烈啟發莫內、梵谷等印象派畫家。",
    historicalSignificance: "入選《Life》雜誌千禧年全球百大偉人中唯一日本藝術家，浮世繪世界化第一人。",
    abilities: { strategy: 70, commanding: 55, politics: 50, intellect: 100, courage: 90, charisma: 100 }
  },
  {
    id: "fig_jp_utagawa_hiroshige",
    name: "歌川廣重",
    courtesyName: "安藤廣重 / 一幽齋 / 廣重藍",
    lifeSpan: "1797 - 1858",
    faction: "edo",
    clanTag: "風景浮世繪大師",
    emblemChar: "景",
    mainColor: "#1d4ed8",
    bgColor: "#0f172a",
    role: "浮世繪風景版畫大師 / 《東海道五十三次》《名所江戶百景》",
    roleType: "cultural",
    avatar: "./images/figures/fig_jp_utagawa_hiroshige.svg",
    importance: 5,
    hometown: "江戶八重洲 (今東京都中央區)",
    shortBio: "定火消（消防役）武士之子。繼承家業同時拜歌川豐廣為師學畫。隨幕府隊伍沿東海道進京獻馬，沿途將五十三處宿場的風雪雨霧、旅人笑淚融入詩情畫意，出版《東海道五十三次》，轟動天下。其大量使用普魯士藍（廣重藍）表現雨景與夜色，《名所江戶百景·大橋安宅驟雨》更曾被梵谷親自全幅臨摹油畫。",
    historicalSignificance: "江戶抒情風景版畫之神，以詩情畫意之雨雪暮景折服歐洲印象派之大師。",
    abilities: { strategy: 68, commanding: 50, politics: 52, intellect: 97, courage: 80, charisma: 95 }
  },
  {
    id: "fig_jp_sato_issai",
    name: "佐藤一齋",
    courtesyName: "愛日樓 / 昌平坂儒官",
    lifeSpan: "1772 - 1859",
    faction: "edo",
    clanTag: "江戶儒學泰斗",
    emblemChar: "言",
    mainColor: "#475569",
    bgColor: "#0f172a",
    role: "幕府最高學府昌平坂學問所儒官 / 著《言志四錄》/ 西鄉隆盛座右銘導師",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_sato_issai.svg",
    importance: 4,
    hometown: "美濃國岩村藩 (今岐阜縣惠那市)",
    shortBio: "美濃岩村藩家老之子。博通朱子學與陽明學，歷任幕府最高儒官「昌平坂學問所」總長四十載，弟子三千遍及列藩。花費四十餘年記錄人生哲思成四卷格言集《言志四錄》（言志錄、言志後錄、言志晚錄、言志耋錄），提倡「少而學者，壯而有為；壯而學者，老而無衰；老而學者，死而不朽」。西鄉隆盛將其視為終生精神導師並親自抄錄手冊。",
    historicalSignificance: "幕末諸多開化改革志士之思想發源地，撰寫江戶最高人生指南《言志四錄》之大儒。",
    abilities: { strategy: 84, commanding: 60, politics: 90, intellect: 99, courage: 85, charisma: 94 }
  },

  // ==========================================
  // Group 4: 幕末激盪與倒幕/佐幕 (Bakumatsu Strife)
  // ==========================================
  {
    id: "fig_jp_ii_naosuke",
    name: "井伊直弼",
    courtesyName: "宗觀 / 彥根藩主 / 幕府大老",
    lifeSpan: "1815 - 1860",
    faction: "bakumatsu",
    clanTag: "幕府大老",
    emblemChar: "斷",
    mainColor: "#dc2626",
    bgColor: "#450a0a",
    role: "彥根藩第十五代藩主 / 幕府大老 / 簽署日美條約開國 / 發動「安政大獄」",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_ii_naosuke.svg",
    importance: 5,
    hometown: "近江國彥根 (今滋賀縣彥根市)",
    shortBio: "井伊直政後裔。年輕時隱居「埋木舍」苦修茶道、居合劍術與和歌。黑船來航激盪之際臨危受命出任幕府大老首座，力排眾議，未待天皇敕許斷然與美公使哈里斯簽署《日美修好通商條約》，開啟日本近代國門。隨後以雷霆手段鎮壓反對派水戶藩與尊攘志士，發動「安政大獄」處死吉田松陰等人。1860年櫻田門外之變遭水戶浪士刺殺殉職。",
    historicalSignificance: "承擔千古罵名力排眾議開國之鐵腕大老，日本近代化轉折之關鍵政治人物。",
    abilities: { strategy: 93, commanding: 85, politics: 96, intellect: 94, courage: 99, charisma: 88 }
  },
  {
    id: "fig_jp_tokugawa_nariaki",
    name: "德川齊昭",
    courtesyName: "水戶烈公 / 景山 / 德川慶喜生父",
    lifeSpan: "1800 - 1860",
    faction: "bakumatsu",
    clanTag: "水戶烈公",
    emblemChar: "攘",
    mainColor: "#ca8a04",
    bgColor: "#422006",
    role: "常陸水戶藩第九代藩主 / 創辦弘道館 / 尊王攘夷論領袖 / 將軍慶喜生父",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_tokugawa_nariaki.svg",
    importance: 5,
    hometown: "水戶城 (今茨城縣水戶市)",
    shortBio: "德川光圀後裔，末代將軍德川慶喜之生父。性格剛烈果決，世稱「水戶烈公」。創立水戶藩校弘道館與偕樂園，熔鑄大砲鑄造西式鐵砲強化海岸防衛。強烈倡導「尊王攘夷」，主張堅拒外夷要求，改革幕政以朝廷為尊。因在將軍繼嗣問題與條約簽署上與井伊直弼爆發激烈衝突遭處以「永蟄居」，間接點燃櫻田門外之變與幕末動亂之火。",
    historicalSignificance: "尊王攘夷思潮在幕末政治舞台之精神旗手，水戶學轉化為動盪政治實踐之推手。",
    abilities: { strategy: 89, commanding: 88, politics: 92, intellect: 93, courage: 96, charisma: 95 }
  },
  {
    id: "fig_jp_shimazu_nariakira",
    name: "島津齊彬",
    courtesyName: "邦興 / 薩摩賢侯 / 集成館之父",
    lifeSpan: "1809 - 1858",
    faction: "bakumatsu",
    clanTag: "薩摩一代賢侯",
    emblemChar: "彬",
    mainColor: "#78350f",
    bgColor: "#311807",
    role: "薩摩藩第二十八代當主 / 「集成館」西洋近代工業創始人 / 西鄉隆盛恩師",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_shimazu_nariakira.svg",
    importance: 5,
    hometown: "薩摩國鹿兒島 (今鹿兒島縣鹿兒島市)",
    shortBio: "幕末四賢侯之首。極具遠見卓識，力主吸收西方近代科技。在薩摩創設日本最早的近代工廠群「集成館」，興建反射爐冶鐵、製造洋槍大砲、建造日本第一艘國產蒸汽船「雲行丸」、成功研發電報與水雷。力排眾議破格提拔下級武士西鄉隆盛與大久保利通，主張公武合體與開國強兵。英年早逝，但其奠定之工業軍事底蘊支撐薩摩引領明治維新。",
    historicalSignificance: "日本近代產業與西洋軍事工業化之先驅導師，西鄉與大久保最敬仰之精神教父。",
    abilities: { strategy: 98, commanding: 92, politics: 99, intellect: 100, courage: 95, charisma: 99 }
  },
  {
    id: "fig_jp_matsudaira_katamori",
    name: "松平容保",
    courtesyName: "肥後守 / 會津藩主 / 京都守護職",
    lifeSpan: "1836 - 1893",
    faction: "bakumatsu",
    clanTag: "會津京都守護",
    emblemChar: "容",
    mainColor: "#15803d",
    bgColor: "#052e16",
    role: "會津藩第九代藩主 / 幕末京都守護職 / 統轄新選組 / 戊辰戰爭統帥",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_matsudaira_katamori.svg",
    importance: 5,
    hometown: "江戶美濃高須藩邸 (今東京都)",
    shortBio: "美濃高須四兄弟之一，入繼會津松平家。恪遵保科正之「忠誠幕府」家訓，於京都局勢最凶險之時毅然出任「京都守護職」，收編近藤勇新選組為麾下維持治安，平定池田屋事件與蛤御門之變，獲孝明天皇極高信任並賜御衣與宸翰。戊辰戰爭被新政府定為朝敵，率會津軍民在若松城歷經一個月悲壯慘烈守城戰，城破獲赦，晚年任日光東照宮宮司。",
    historicalSignificance: "恪守武士忠道名分之最後守護者，會津軍魂與佐幕派最悲壯高貴之象徵。",
    abilities: { strategy: 87, commanding: 89, politics: 88, intellect: 90, courage: 96, charisma: 94 }
  },
  {
    id: "fig_jp_saito_hajime",
    name: "齋藤一",
    courtesyName: "山口一 / 藤田五郎 / 新選組三番隊長",
    lifeSpan: "1844 - 1915",
    faction: "bakumatsu",
    clanTag: "新選組三番隊",
    emblemChar: "齋",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "新選組三番隊組長 / 左手居合拔刀術無雙 / 會津戰爭死守 / 明治警視廳拔刀隊",
    roleType: "general",
    avatar: "./images/figures/fig_jp_saito_hajime.svg",
    importance: 5,
    hometown: "江戶 (今東京都)",
    shortBio: "新選組創立核心幹部之一，劍術與沖田總司齊名，以神速致命的「左手單手突刺」居合術名震幕末。曾依土方歲三密令潛入伊東甲子太郎之御陵衛士充當臥底，成功瓦解分裂陰謀。戊辰戰爭土方轉戰五稜郭時，齋藤堅決留守會津與松平容保同生共死「我奉命守護會津，寧死不退」。明治後化名藤田五郎加入警視廳，西南戰爭參與「警視隊拔刀隊」衝鋒立功。",
    historicalSignificance: "新選組存活最久之修羅劍客，將「惡·即·斬」之武士信念貫徹一生的傳奇之刃。",
    abilities: { strategy: 85, commanding: 88, politics: 72, intellect: 91, courage: 99, charisma: 93 }
  },
  {
    id: "fig_jp_okada_izo",
    name: "岡田以藏",
    courtesyName: "宜振 / 土佐勤王黨人斬以藏",
    lifeSpan: "1838 - 1865",
    faction: "bakumatsu",
    clanTag: "幕末四大人斬",
    emblemChar: "斬",
    mainColor: "#ea580c",
    bgColor: "#431407",
    role: "幕末四大人斬之一 / 土佐勤王黨首要刺客 / 鏡心明智流拔刀術",
    roleType: "general",
    avatar: "./images/figures/fig_jp_okada_izo.svg",
    importance: 4,
    hometown: "土佐國高知 (今高知縣高知市)",
    shortBio: "土佐鄉士出身，精研鏡心明智流劍術，劍技剛猛迅疾，與薩摩田中新兵衛、中村半次郎（桐野利秋）、熊本河上彥齋合稱「幕末四大人斬」。加入武市半平太創辦之土佐勤王黨，在京都充當天誅刺客斬殺佐幕官員。亦曾擔任勝海舟之貼身護衛，憑劍術救勝海舟於暗殺危機。後土佐政局反轉遭逮捕下獄，經嚴刑拷打斬首，辭世詩「君為我心吾為身，落花流水盡歸塵」。",
    historicalSignificance: "幕末動盪血雨腥風中身不由己之刀劍象徵，土佐勤王黨最著名之悲情劍客。",
    abilities: { strategy: 70, commanding: 72, politics: 55, intellect: 78, courage: 98, charisma: 82 }
  },
  {
    id: "fig_jp_sakuma_shozan",
    name: "佐久間象山",
    courtesyName: "修理 / 象山先生 / 東洋道德西洋藝術",
    lifeSpan: "1811 - 1864",
    faction: "bakumatsu",
    clanTag: "開國啟蒙宗師",
    emblemChar: "象",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "信濃松代藩兵學者 / 開國強兵思想宗師 / 勝海舟與吉田松陰之恩師",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_sakuma_shozan.svg",
    importance: 5,
    hometown: "信濃國松代藩 (今長野縣長野市)",
    shortBio: "江戶晚期最卓越之思想家與兵學者。自學蘭學、西洋砲術與玻璃光學，首倡「東洋道德、西洋藝術（技術）」名言，主張在守護東方道德精神前提下全面吸納西洋近代科技。於江戶開辦象山塾，弟子包括勝海舟、吉田松陰、坂本龍馬、橋本左內等幾乎所有幕末時代巨擘。因支持吉田松陰偷渡美國受牽連下獄九年。獲釋後赴京推動公武合體，遭尊攘派刺客河上彥齋暗殺。",
    historicalSignificance: "幕末啟蒙天下維新志士之第一智囊，引領日本走出封閉走向近代的思想燈塔。",
    abilities: { strategy: 96, commanding: 78, politics: 93, intellect: 100, courage: 95, charisma: 97 }
  },
  {
    id: "fig_jp_enomoto_takeaki",
    name: "榎本武揚",
    courtesyName: "釜次郎 / 蝦夷共和國總裁",
    lifeSpan: "1836 - 1908",
    faction: "bakumatsu",
    clanTag: "蝦夷政權總裁",
    emblemChar: "艦",
    mainColor: "#1e3a8a",
    bgColor: "#0f172a",
    role: "幕府海軍副總裁 / 蝦夷共和國總裁 / 五稜郭決戰統帥 / 明治海軍中將外務大臣",
    roleType: "general",
    avatar: "./images/figures/fig_jp_enomoto_takeaki.svg",
    importance: 5,
    hometown: "江戶下谷 (今東京都台東區)",
    shortBio: "幕府旗本出身，留學荷蘭五年精研近代海軍軍事、國際法與造船。江戶無血開城後，榎本不甘幕府精銳艦隊被繳，率開陽丸等八艘戰艦北上佔領北海道箱館，建立五稜郭要塞並創立亞洲最早之民選政權「蝦夷共和國」自任總裁。箱館海陸大戰兵敗之際將珍貴海事法典《海律全書》贈予新政府軍指揮官黑田清隆，黑田愛其全才力保其免死。出獄後任明治外相、農商務大臣。",
    historicalSignificance: "近代日本海軍與北方開拓先驅，兼具國際法修養與現代科技的大度政治家。",
    abilities: { strategy: 93, commanding: 94, politics: 92, intellect: 98, courage: 94, charisma: 95 }
  },

  // ==========================================
  // Group 5: 明治維新先驅與轉型領袖 (Meiji Transition Pioneers)
  // ==========================================
  {
    id: "fig_jp_john_manjiro",
    name: "約翰萬次郎",
    courtesyName: "中濱萬次郎 / John Mung",
    lifeSpan: "1827 - 1898",
    faction: "meiji_modern",
    clanTag: "首位旅美開拓者",
    emblemChar: "海",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "首位留美獲現代知識之漂流民 / 日美修好通商條約首席顧問 / 開成學校英語教授",
    roleType: "scholar",
    avatar: "./images/figures/fig_jp_john_manjiro.svg",
    importance: 5,
    hometown: "土佐國中濱 (今高知縣土佐清水市)",
    shortBio: "土佐貧苦漁民之子。十四歲出海遇難漂流至無人荒島，被美籍捕鯨船「約翰·豪蘭號」救起並由惠特菲爾德船長收留帶往美國麻省。刻苦學習英語、測量航海術與造船，以第一名畢業於巴特利特學院。淘金熱積攢路費後冒死返回處於鎖國期的日本。黑船來航時獲幕府破格起用為直屬旗本，擔任日美談判最高翻譯顧問與幕府軍艦咸臨丸訪美引水員，並教授英語啟蒙無數青年。",
    historicalSignificance: "日本近代首座聯通西方文明的跨大洋人橋，民間奇蹟轉化為國家外交棟樑的偉大傳奇。",
    abilities: { strategy: 86, commanding: 80, politics: 84, intellect: 97, courage: 100, charisma: 96 }
  },
  {
    id: "fig_jp_komatsu_tatewaki",
    name: "小松帶刀",
    courtesyName: "尚五郎 / 帶刀 / 薩摩家老執政",
    lifeSpan: "1835 - 1870",
    faction: "meiji_modern",
    clanTag: "薩摩維新原動力",
    emblemChar: "帶",
    mainColor: "#78350f",
    bgColor: "#311807",
    role: "薩摩藩家老執政 / 薩長同盟與大政奉還幕後核心推手 / 明治參與兼外國官副知事",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_komatsu_tatewaki.svg",
    importance: 5,
    hometown: "薩摩國鹿兒島 (今鹿兒島縣鹿兒島市)",
    shortBio: "薩摩藩名門出身，二十八歲破格出任薩摩藩家老，總攬藩政近十年。胸襟寬廣、知人善任，極力支持西鄉隆盛與大久保利通，資助坂本龍馬成立「龜山社中」（海援隊），並在自己的京都小松邸促成坂本龍馬調解下的「薩長同盟」締結。大政奉還時代表薩摩藩與德川慶喜於二條城同席會商。明治政府成立出任外國官副知事，早逝於三十六歲，世稱「幻之維新領袖」。",
    historicalSignificance: "薩摩藩推進倒幕大業的幕後樞紐與財政軍政總支柱，維新三傑之堅定靠山。",
    abilities: { strategy: 95, commanding: 86, politics: 98, intellect: 96, courage: 91, charisma: 97 }
  },
  {
    id: "fig_jp_mutsu_munemitsu",
    name: "陸奧宗光",
    courtesyName: "陽之助 / 剃刀陸奧 / 條約改正",
    lifeSpan: "1844 - 1897",
    faction: "meiji_modern",
    clanTag: "剃刀陸奧外相",
    emblemChar: "剃",
    mainColor: "#0284c7",
    bgColor: "#082f49",
    role: "坂本龍馬海援隊幹將 / 明治外務大臣 / 成功廢除不平等條約 / 簽署馬關條約",
    roleType: "ruler",
    avatar: "./images/figures/fig_jp_mutsu_munemitsu.svg",
    importance: 5,
    hometown: "紀伊國和歌山 (今和歌山縣和歌山市)",
    shortBio: "紀州藩儒臣之子。脫藩投奔神戶海軍操練所，成為坂本龍馬最得力的海援隊智囊，龍馬曾言「刀劍不如宗光之舌，天下事可托陸奧」。維新後歷經牢獄磨礪，赴歐留學研習西方近代政治學。出任伊藤博文內閣外務大臣，憑藉極其縝密敏銳的「剃刀」外交手腕，成功迫使大英帝國廢除領事裁判權（治外法權），終結日本數十年屈辱不平等條約，並代表日本簽署《馬關條約》，著有《蹇蹇錄》。",
    historicalSignificance: "近代日本最偉大的外交戰略家，徹底終結列強治外法權不平等條約之最大功臣。",
    abilities: { strategy: 99, commanding: 78, politics: 98, intellect: 100, courage: 94, charisma: 95 }
  }
];

// 1. Generate SVGs for all 36 figures
const svgDir = path.join(__dirname, '..', 'images', 'figures');
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

NEW_FIGURES.forEach(f => {
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
  <circle cx="60" cy="60" r="56" fill="url(#bg_${f.id})" stroke="${f.mainColor}" stroke-width="2.5" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="${f.mainColor}" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>

  <!-- Japanese Kamon Outer Ring Accent -->
  <circle cx="60" cy="60" r="38" fill="none" stroke="${f.mainColor}" stroke-width="1.8" opacity="0.85" />

  <!-- Clan Mon / Traditional Character Seal -->
  <text x="60" y="65" font-family="'Noto Serif TC', 'Songti TC', 'Kozuka Mincho Pro', 'Yu Mincho', serif" 
        font-size="28" font-weight="900" fill="${f.mainColor}" text-anchor="middle" dominant-baseline="middle"
        filter="url(#shadow_${f.id})">
    ${f.emblemChar}
  </text>

  <!-- Top Clan / Faction Badge -->
  <rect x="22" y="8" width="76" height="15" rx="3" fill="#1c1611" stroke="${f.mainColor}" stroke-width="1"/>
  <text x="60" y="19" font-family="'Noto Sans TC', sans-serif" font-size="8.5" font-weight="bold" fill="#fef08a" text-anchor="middle">
    ${f.clanTag.slice(0, 8)}
  </text>

  <!-- Bottom Name Banner -->
  <rect x="18" y="94" width="84" height="17" rx="3" fill="#1c1611" stroke="${f.mainColor}" stroke-width="1.2"/>
  <text x="60" y="106" font-family="'Noto Serif TC', 'Songti TC', serif" font-size="10" font-weight="bold" fill="#f8fafc" text-anchor="middle" letter-spacing="1">
    ${f.name}
  </text>
</svg>`;

  const outPath = path.join(svgDir, `${f.id}.svg`);
  fs.writeFileSync(outPath, svg, 'utf8');
});

console.log(`Generated 36 Kamon SVG avatars in ${svgDir}`);

// 2. Append to src/data/japan/japanFigures.js
const figuresPath = path.join(__dirname, '..', 'src', 'data', 'japan', 'japanFigures.js');
let currentCode = fs.readFileSync(figuresPath, 'utf8');

// Strip trailing "];"
const lastBracketIndex = currentCode.lastIndexOf('];');
if (lastBracketIndex === -1) {
  throw new Error('Could not find closing bracket in japanFigures.js');
}

const prefix = currentCode.slice(0, lastBracketIndex).trimEnd();
const newJsonEntries = NEW_FIGURES.map(f => {
  return '  ' + JSON.stringify(f, null, 2).replace(/\n/g, '\n  ');
}).join(',\n');

const updatedCode = prefix + ',\n' + newJsonEntries + '\n];\n';
fs.writeFileSync(figuresPath, updatedCode, 'utf8');

console.log(`Successfully appended 36 figures to japanFigures.js. New total should be 135.`);
