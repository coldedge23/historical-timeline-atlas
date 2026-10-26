// Taiwan Chronological Lens (臺灣四千年歷史縱貫專題視角資料集)
// Integrates Austronesian, Dutch-Spanish, Kingdom of Tungning, Qing Rule, Japanese Era, Post-War Defense & Modern Silicon Island

export const TAIWAN_LENS_ERAS = [
  {
    id: "tw_prehistoric",
    name: "南島原鄉與早期記錄",
    dateRangeDisplay: "史前 — 西元 1624 年",
    shortEra: "遠古至大航海前夕",
    tagline: "大肚王國·澎湖設治",
    description: "長濱文化舊石器時代、大坌坑文化新石器時代南島語系擴散；中臺灣跨部落「大肚王國」跨族群聯盟；三國衛溫夷州、隋代朱寬流求訪察；1281年元世祖設澎湖巡檢司，為中央政府管轄澎臺之始。",
    keyEvents: [
      {
        id: "evt_tw_penghu_1281",
        year: 1281,
        yearDisplay: "西元 1281 年 (至元十八年)",
        title: "元世祖設澎湖巡檢司",
        summary: "元朝於澎湖設巡檢司，隸屬福建行省同安縣，為澎湖群島納入中央官制之始。",
        detail: "1281年元世祖忽必烈在澎湖設澎湖巡檢司，派文官駐防收稅巡緝海疆，管轄澎湖三十六島，揭開澎臺兩地納入官府正式行政編制序幕。",
        locationNameAncient: "澎湖巡檢司署 (媽宮)",
        locationNameModern: "澎湖縣馬公市",
        coordinates: [119.57, 23.57],
        tags: ["澎湖巡檢司", "大元行省", "海疆管理"]
      },
      {
        id: "evt_tw_dadu_kingdom",
        year: 1500,
        yearDisplay: "約西元 1500 年前",
        title: "大肚王國 (跨部落南島邦聯體制)",
        summary: "中臺灣跨部族原住民族邦聯大肚王國，由拍瀑拉族白晝之王（Kamachat）統御十八社。",
        detail: "在荷蘭人抵達臺灣前，中臺灣大甲溪以南至大肚溪流域已建立跨部落邦聯「大肚王國」，由巴布拉族領袖世襲稱為Quataong。其版圖涵蓋臺中、彰化、南投各社，農牧互市，自給自足維持高度獨立自主。",
        locationNameAncient: "大肚社 (中臺灣)",
        locationNameModern: "臺中市大肚區",
        coordinates: [120.54, 24.16],
        tags: ["大肚王國", "南島原鄉", "部落邦聯"]
      }
    ],
    highlightFigures: ["fig_sun_quan", "fig_wei_wen", "fig_sui_yangdi", "fig_chen_leng"]
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
        id: "evt_tw_guohuaiyi_1652",
        year: 1652,
        yearDisplay: "西元 1652 年 (順治九年)",
        title: "郭懷一農民起義抗荷",
        summary: "臺灣漢人農民因苛捐雜稅發動大規模反荷抗爭，血戰普羅民遮城。",
        detail: "荷蘭東印度公司對臺灣漢人移民課徵沈重之人頭稅與重稅。佃農領袖郭懷一聯絡四千餘漢人農民在油車行（今臺南永康）揭竿起義，進攻赤崁樓。荷軍調集火槍隊與原住民聯軍殘酷鎮壓，郭懷一殉難，此事件促使荷軍築普羅民遮城強化控制。",
        locationNameAncient: "臺灣府赤崁普羅民遮城",
        locationNameModern: "臺南市中西區赤崁樓",
        coordinates: [120.20, 22.99],
        tags: ["郭懷一", "抗荷起義", "農民抗爭"]
      }
    ],
    highlightFigures: ["fig_yan_siqi", "fig_zheng_zhilong", "fig_guo_huaiyi"]
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
      }
    ],
    highlightFigures: ["fig_zheng_chenggong", "fig_chen_yonghua", "fig_zheng_jing", "fig_liu_guoxuan"]
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
        id: "evt_tw_linshuangwen_1786",
        year: 1786,
        yearDisplay: "西元 1786 年 (乾隆五十一年)",
        title: "林爽文天地會大起義",
        summary: "臺灣歷史規模最大民變，天地會林爽文攻陷彰化諸羅，乾隆派福康安渡海平亂。",
        detail: "大里杙天地會首領林爽文起義，自稱盟主改元順天，全臺南北呼應包圍諸羅城。乾隆帝派大學士福康安率數萬大軍渡臺解圍，諸羅軍民堅守數月「嘉其死守之義」，乾隆特賜名諸羅為「嘉義」，名列乾隆十全武功之一。",
        locationNameAncient: "臺灣府諸羅縣 (嘉義)",
        locationNameModern: "嘉義市東區與西區",
        coordinates: [120.45, 23.48],
        tags: ["林爽文", "天地會", "嘉義由來", "十全武功"]
      }
    ],
    highlightFigures: ["fig_shi_lang", "fig_zhu_yigui", "fig_lin_shuangwen", "fig_fu_kangan"]
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
        id: "evt_tw_mudanshe_1874",
        year: 1874,
        yearDisplay: "西元 1874 年 (同治十三年)",
        title: "牡丹社事件與沈葆楨開山撫番",
        summary: "日軍藉琉球船難進犯車城牡丹社，沈葆楨督辦防務，力倡開山撫番與南北開路。",
        detail: "1871年琉球宮古島漁船漂流至八瑤灣遭排灣族人殺害，日本藉故於1874年派西鄉從道發兵進犯牡丹社。清廷派船政大臣沈葆楨為欽差大臣赴臺督辦軍務，修築恆春古城與億載金城，廢除渡臺鐵禁，開闢北中南三條後山越嶺古道，改變清廷消極治臺政策。",
        locationNameAncient: "臺灣府恆春琅嶠牡丹社",
        locationNameModern: "屏東縣牡丹鄉與恆春鎮",
        coordinates: [120.74, 22.00],
        tags: ["牡丹社事件", "沈葆楨", "開山撫番", "恆春古城"]
      },
      {
        id: "evt_tw_liumingchuan_province_1885",
        year: 1885,
        yearDisplay: "西元 1885 年 (光緒十一年)",
        title: "劉銘傳中法保臺大捷與臺灣建省",
        summary: "劉銘傳於滬尾淡水擊退法軍艦隊，清廷下詔臺灣獨立建省，劉銘傳任首任巡撫推動全島現代化。",
        detail: "中法戰爭孤拔艦隊封鎖臺灣基隆、淡水。巡撫劉銘傳督師淡水滬尾以水雷沉船與近戰大敗法軍陸戰隊。戰後清廷深刻認識臺灣海防樞紐地位，於1885年10月12日慈禧太后頒旨宣示「臺灣為南洋門戶，關係緊要，自應設立行省」，正式分立臺灣省。劉銘傳築造中國第一條現代客運鐵路（基隆至新竹）、鋪設海底電報線、設立全臺郵政總局與西學堂。",
        locationNameAncient: "臺灣省巡撫衙門 (臺北府城)",
        locationNameModern: "臺北市中正區中山堂原址",
        coordinates: [121.51, 25.04],
        tags: ["臺灣建省", "劉銘傳", "現代化之父", "淡水大捷"]
      }
    ],
    highlightFigures: ["fig_shen_baozhen", "fig_liu_mingchuan", "fig_tang_jingsong", "fig_qiu_fengjia", "fig_liu_yongfu"]
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
        id: "evt_tw_cultural_golden_age",
        year: 1921,
        yearDisplay: "西元 1921 — 1931 年",
        title: "臺灣文化協會創立與政治社會啟蒙黃金時代",
        summary: "蔣渭水、林獻堂、蔡培火引領體制內非暴力啟蒙，創立文化協會與臺灣民眾黨。",
        detail: "1920年代林獻堂赴日發起「臺灣議會設置請願運動」連辦十四年。蔣渭水成立「臺灣文化協會」發表《臨床講義》，設立讀報社巡迴全島演講破除迷信，創立首個政黨「臺灣民眾黨」，賴和推動鄉土新文學。此時期標誌臺灣人民自武裝抗爭轉型為現代公民自主自覺。",
        locationNameAncient: "臺北州臺北市大稻埕",
        locationNameModern: "臺北市大同區大稻埕",
        coordinates: [121.51, 25.05],
        tags: ["臺灣文化協會", "蔣渭水", "林獻堂", "非暴力抗爭", "新文學"]
      },
      {
        id: "evt_tw_wushe_uprising",
        year: 1930,
        yearDisplay: "西元 1930 年 (昭和五年)",
        title: "莫那·魯道霧社起義抗日",
        summary: "賽德克族馬赫坡社首領莫那·魯道聯合六社抗暴起義，彰顯原住民族浩然不屈精神。",
        detail: "1930年10月27日，因長年山林苛役與殖民欺凌，賽德克族頭目莫那·魯道率部落勇士奇襲霧社公學校運動會。日軍出動大軍、飛機與糜爛性毒氣瓦斯圍攻，原住民族戰士以險阻山地血戰數十日，最後全數壯烈成仁，震撼國際聯盟關注原住民族人權。",
        locationNameAncient: "臺中州能高郡霧社",
        locationNameModern: "南投縣仁愛鄉霧社紀念公園",
        coordinates: [121.13, 24.02],
        tags: ["莫那魯道", "霧社事件", "賽德克族", "原民英烈"]
      }
    ],
    highlightFigures: ["fig_lin_xiantang", "fig_chiang_weishui", "fig_lai_he", "fig_cai_peihuo", "fig_mona_rudao", "fig_luo_fuxing", "fig_yu_qingfang"]
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
        id: "evt_tw_guningtou_1949",
        year: 1949,
        yearDisplay: "西元 1949 年 (民國三十八年)",
        title: "金門古寧頭大捷保衛臺灣",
        summary: "國軍全殲跨海登陸金門之解放軍三團，一舉挽回狂瀾確立臺海兩岸分立分治局面。",
        detail: "1949年10月25日凌晨解放軍近萬部隊渡海夜襲金門。胡璉第十二兵團沉著調度，「金門之熊」M5A1輕戰車衝擊海岸，血戰三晝夜將登陸敵軍徹底聚殲於古寧頭海灘。此戰粉碎奪取臺灣戰略企圖，奠定臺澎金馬七十年繁榮安寧之基石。",
        locationNameAncient: "福建省金門縣古寧頭",
        locationNameModern: "金門縣金寧鄉古寧頭戰史館",
        coordinates: [118.31, 24.48],
        tags: ["古寧頭大捷", "胡璉", "金門之熊", "保衛臺灣"]
      },
      {
        id: "evt_tw_land_reform_1953",
        year: 1953,
        yearDisplay: "西元 1953 年 (民國四十二年)",
        title: "耕者有其田和平土地改革成功",
        summary: "陳誠主導和平漸進式土地改革，自耕農倍增農村繁榮，地主資本順利轉型民營工業。",
        detail: "臺灣省政府推行三七五減租、公地放領及1953年「耕者有其田」，以四大公營公司股票及實物土地債券補償地主徵收超額出租耕地轉售佃農。自耕農比例躍升至八成以上，不僅免去激烈血腥鬥爭，更成功將農業資本導入民間工業投資。",
        locationNameAncient: "臺灣省全島",
        locationNameModern: "臺灣各地農村",
        coordinates: [120.30, 23.50],
        tags: ["土地改革", "耕者有其田", "陳誠", "經濟基礎"]
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
      }
    ],
    highlightFigures: ["fig_hu_lian", "fig_ji_xingwen", "fig_yu_dawei", "fig_chen_cheng", "fig_yan_jiagan", "fig_fu_sinian"]
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
        id: "evt_tw_hsinchu_tsmc_1980",
        year: 1980,
        yearDisplay: "西元 1980 — 1987 年",
        title: "新竹科學園區奠基與台積電成立打造矽盾",
        summary: "孫運璿、李國鼎促成新竹科學園區與工研院技術引進，張忠謀首創晶圓代工台積電成護國神山。",
        detail: "1980年新竹科學園區成立，李國鼎、孫運璿推動工研院引進美國RCA超大型積體電路技術，力邀張忠謀回臺主持工研院並於1987年創立台積電（TSMC）。首創純晶圓代工模式，帶領臺灣成為全球最關鍵高科技運算晶片樞紐與保護臺灣安全的「矽盾（Silicon Shield）」。",
        locationNameAncient: "新竹科學工業園區",
        locationNameModern: "新竹市科學園區台積電總部",
        coordinates: [120.99, 24.78],
        tags: ["台積電", "新竹科學園區", "張忠謀", "李國鼎", "護國神山"]
      },
      {
        id: "evt_tw_democratization_1987",
        year: 1987,
        yearDisplay: "西元 1987 — 1996 年",
        title: "解除戒嚴令與全民直選總統完成民主寧靜革命",
        summary: "蔣經國宣告解嚴開放黨禁報禁，李登輝推動憲改廢萬年國會，1996年全民直選總統。",
        detail: "1987年7月15日蔣經國宣布臺灣解除實施三十八年之戒嚴令，開放組黨與兩岸探親。李登輝繼任總統後終止動員戡亂時期、廢除萬年國會，並於1996年面對臺海飛彈危機如期完成中華民國首次總統公民直接選舉，達成不流血和平民主過渡之「寧靜革命」，成為全球華人民主燈塔。",
        locationNameAncient: "臺灣省臺北市",
        locationNameModern: "臺北市中正區總統府",
        coordinates: [121.51, 25.03],
        tags: ["解除戒嚴", "民主化", "總統直選", "李登輝", "民主燈塔"]
      }
    ],
    highlightFigures: ["fig_sun_yunsuan", "fig_li_guoding", "fig_zhang_zhongmou", "fig_wang_yongqing", "fig_chiang_chingkuo", "fig_li_denghui"]
  }
];

// Helper to extract all Taiwan-related figures across all 10 periods
export const TAIWAN_RELATED_FIGURE_IDS = [
  // Yuan-Ming
  "fig_yan_siqi", "fig_zheng_zhilong", "fig_guo_huaiyi",
  // Qing Dynasty
  "fig_zheng_chenggong", "fig_chen_yonghua", "fig_zheng_jing", "fig_liu_guoxuan",
  "fig_shi_lang", "fig_zhu_yigui", "fig_lin_shuangwen", "fig_fu_kangan",
  "fig_shen_baozhen", "fig_liu_mingchuan", "fig_tang_jingsong", "fig_qiu_fengjia", "fig_liu_yongfu",
  // Republic & Modern
  "fig_lin_xiantang", "fig_chiang_weishui", "fig_lai_he", "fig_cai_peihuo", "fig_mona_rudao",
  "fig_luo_fuxing", "fig_yu_qingfang", "fig_tang_de_zhang", "fig_yang_kui",
  "fig_hu_lian", "fig_ji_xingwen", "fig_yu_dawei", "fig_chen_cheng", "fig_yan_jiagan",
  "fig_sun_yunsuan", "fig_li_guoding", "fig_yin_zhongrong", "fig_fu_sinian",
  "fig_wang_yongqing", "fig_zhang_zhongmou", "fig_chiang_chingkuo", "fig_li_denghui"
];

// Mapping between Taiwan Era IDs and their active battles
export const ERA_BATTLE_IDS = {
  tw_prehistoric: [],
  tw_dutch_spanish: ["bat_tw_zeelandia_1661"],
  tw_tungning: ["bat_tw_zeelandia_1661", "bat_tw_penghu_1683"],
  tw_qing_early: ["bat_tw_penghu_1683"],
  tw_qing_late: ["bat_tw_tamsui_1884"],
  tw_japanese: ["bat_tw_baguashan_1895"],
  tw_postwar: ["bat_tw_guningtou_1949", "bat_tw_823_1958"],
  tw_modern: []
};

// Helper to extract all Taiwan-related battles across all 10 periods
export const TAIWAN_RELATED_BATTLES = [
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
    name: "澎湖海戰 (施琅大破劉國軒)",
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
    id: "bat_tw_baguashan_1895",
    eraId: "tw_japanese",
    name: "八卦山抗日戰役 (乙未保臺最烈血戰)",
    year: 1895,
    period: "taiwanLens",
    locationAncient: "臺灣省彰化八卦山制高點",
    locationModern: "彰化縣彰化市八卦山",
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
  }
];
