// Japanese Historical Atlas Eras Dataset (6 Master Historical Eras)
export const JAPAN_ERAS = [
  {
    "id": "jp_ancient_medieval",
    "name": "古代與中世發端",
    "dateRangeDisplay": "西元 538 - 1467 年",
    "shortEra": "飛鳥·平安·鎌倉·室町",
    "tagline": "大化革新·源平合戰·武家誕生",
    "description": "飛鳥時代聖德太子頒《十七條憲法》引進隋唐文明；大化革新確立中央集權；平安京遷都開創國風美學；源平爭霸壇之浦海戰平家覆滅，源賴朝開創鎌倉幕府；北條時宗築壘抗擊忽必烈元寇神風；室町足利義滿建金閣寺推動勘合貿易。",
    "keyEvents": [
      {
        "id": "evt_jp_shotoku_constitution_604",
        "year": 604,
        "yearDisplay": "西元 604 年 (推古天皇十二年)",
        "title": "聖德太子制定冠位十二階與十七條憲法",
        "summary": "聖德太子推行革新法典，開創日本歷史成文憲法與德治之始。",
        "detail": "聖德太子在大和斑鳩宮頒布《十七條憲法》，以「以和為貴」為首條，融入儒家仁義、佛教三寶與法家綱紀；推行打破世襲門閥之「冠位十二階」，派遣遣隋使小野妹子出使中國，確立日本東亞自主文明格局。",
        "locationNameAncient": "大和國斑鳩宮",
        "locationNameModern": "奈良縣生駒郡斑鳩町法隆寺",
        "coordinates": [
          135.73,
          34.61
        ],
        "tags": [
          "聖德太子",
          "十七條憲法",
          "冠位十二階",
          "法隆寺"
        ]
      },
      {
        "id": "evt_jp_taika_reforms_645",
        "year": 645,
        "yearDisplay": "西元 645 年 (大化元年)",
        "title": "大化革新與中大兄皇子乙巳之變",
        "summary": "誅滅專權蘇我氏，參照唐朝均田租庸調制度確立中央集權律令制。",
        "detail": "中大兄皇子（後天智天皇）與中臣鎌足發動乙巳之變誅殺跋扈權臣蘇我入鹿。孝德天皇即位改元「大化」，廢除部民私有土地，推行公地公民制、班田收授法與租庸調賦稅制度，奠定日本律令制國家根基。",
        "locationNameAncient": "大和國飛鳥板蓋宮",
        "locationNameModern": "奈良縣高市郡明日香村",
        "coordinates": [
          135.82,
          34.47
        ],
        "tags": [
          "大化革新",
          "乙巳之變",
          "班田收授",
          "律令國家"
        ]
      },
      {
        "id": "evt_jp_heian_kyo_794",
        "year": 794,
        "yearDisplay": "西元 794 年 (延曆十三年)",
        "title": "桓武天皇遷都平安京開啟平安盛世",
        "summary": "日本遷都山城國平安京（今京都），開創四百年平安時代國風文化。",
        "detail": "為擺脫奈良南都六宗僧侶干政，桓武天皇仿唐代長安城方正棋盤格局興建「平安京」。平安四百年孕育出假名文字、《源氏物語》、《枕草子》與大和繪等精緻國風美學，定鼎京都千年帝都地位。",
        "locationNameAncient": "山城國葛野郡平安京大內裏",
        "locationNameModern": "京都府京都市上京區京都御所",
        "coordinates": [
          135.76,
          35.02
        ],
        "tags": [
          "平安京",
          "桓武天皇",
          "國風文化",
          "京都千年底蘊"
        ]
      },
      {
        "id": "evt_jp_dannoura_gempei_1185",
        "year": 1185,
        "yearDisplay": "西元 1185 年 (文治元年)",
        "title": "壇之浦海戰平家覆滅與武家崛起",
        "summary": "源義經指揮源氏水軍徹底滅亡平家，八歲安德天皇抱三神器投海。",
        "detail": "源平爭霸最後決戰於長門國壇之浦爆發。源義經以靈活跳幫戰術逆風突襲，平知盛負錨投海，平家滿門投海覆滅。七百年間朝廷貴族公家掌權時代終結，拉開日本武家政權主宰政治舞台之序幕。",
        "locationNameAncient": "長門國赤間關壇之浦",
        "locationNameModern": "山口縣下關市關門海峽",
        "coordinates": [
          130.95,
          33.96
        ],
        "tags": [
          "壇之浦",
          "源義經",
          "平家物語",
          "武家掌權"
        ]
      },
      {
        "id": "evt_jp_kamakura_shogunate_1192",
        "year": 1192,
        "yearDisplay": "西元 1192 年 (建久三年)",
        "title": "源賴朝就任征夷大將軍建立鎌倉幕府",
        "summary": "後白河法皇與朝廷冊封賴朝為征夷大將軍，日本首個武家政權正式成立。",
        "detail": "源賴朝設大本營於相模鎌倉，創立政所、侍所與問注所，並向各國廣設「守護」與「地頭」，將行政裁判與徵稅大權自公家手中收歸武士階級，奠定武士道御家人封建主從秩序。",
        "locationNameAncient": "相模國鎌倉大藏幕府",
        "locationNameModern": "神奈川縣鎌倉市鶴岡八幡宮旁",
        "coordinates": [
          139.55,
          35.32
        ],
        "tags": [
          "源賴朝",
          "鎌倉幕府",
          "征夷大將軍",
          "守護地頭"
        ]
      },
      {
        "id": "evt_jp_mongol_invasions_1281",
        "year": 1281,
        "yearDisplay": "西元 1281 年 (弘安四年)",
        "title": "弘安之役北條時宗堅守防壘與神風大捷",
        "summary": "鎌倉執權北條時宗率全島武士阻擊大元十四萬大軍，神風狂嵐保全日本。",
        "detail": "忽必烈調集江南軍與東路軍十四萬遠征大軍登陸九州。北條時宗預先於博多灣築二十公里石壘堅決抵抗兩月。農曆七月強烈颱風（神風）席捲博多灣，元軍巨艦折戟沉沙，徹底粉碎元帝國擴張企圖。",
        "locationNameAncient": "筑前國博多灣元寇防壘",
        "locationNameModern": "福岡縣福岡市西區與早良區沿海",
        "coordinates": [
          130.36,
          33.59
        ],
        "tags": [
          "元寇襲來",
          "北條時宗",
          "神風",
          "博多防壘"
        ]
      },
      {
        "id": "evt_jp_ashikaga_kinkakuji_1397",
        "year": 1397,
        "yearDisplay": "西元 1397 年 (應永四年)",
        "title": "足利義滿興建北山鹿苑寺金閣與勘合貿易",
        "summary": "室町幕府第三代將軍統一大陸朝貢與公武合一，開創燦爛北山文化。",
        "detail": "足利義滿結束五十六年南北朝分裂，在京都北山興築金箔輝煌之舍利殿金閣寺。受明朝冊封「日本國王」，開啟寧波勘合貿易，壓制倭寇，開創融合禪宗墨繪與能樂幽玄之北山黃金文化。",
        "locationNameAncient": "山城國北山鹿苑寺",
        "locationNameModern": "京都府京都市北區金閣寺",
        "coordinates": [
          135.72,
          35.03
        ],
        "tags": [
          "足利義滿",
          "金閣寺",
          "勘合貿易",
          "北山文化"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_shotoku",
      "fig_jp_minamoto_yoritomo",
      "fig_jp_minamoto_yoshitsune",
      "fig_jp_hojo_tokimune",
      "fig_jp_ashikaga_yoshimitsu"
    ]
  },
  {
    "id": "jp_sengoku",
    "name": "戰國亂世·群雄逐鹿",
    "dateRangeDisplay": "西元 1467 - 1582 年",
    "shortEra": "應仁之亂至本能寺之變",
    "tagline": "下剋上·風林火山·天下布武",
    "description": "應仁之亂幕府名存實亡，日本進入一百二十年下剋上大動盪；甲斐之虎武田信玄與越後之龍上杉謙信川中島宿命激戰；毛利元就稱霸西國；織田信長桶狹間奇襲一戰成名，長篠合戰火繩槍三段擊破武田赤備，天下布武推進統一，惜終結於本能寺之變。",
    "keyEvents": [
      {
        "id": "evt_jp_onin_war_1467",
        "year": 1467,
        "yearDisplay": "西元 1467 年 (應仁元年)",
        "title": "應仁之亂爆發京都化為灰燼下剋上開啟",
        "summary": "細川勝元與山名宗全爭奪幕府繼嗣，大戰十一年揭開戰國百年大動亂。",
        "detail": "室町將軍足利義政繼承人問題引發細川東軍與山名西軍二十餘萬武士在京都激戰十一年。古都樓宇化為廢墟，幕府權威掃地名存實亡，全日本守護代與國人豪族競相以實力「下剋上」割據一方。",
        "locationNameAncient": "山城國京都上京相國寺周邊",
        "locationNameModern": "京都府京都市上京區小川通",
        "coordinates": [
          135.75,
          35.03
        ],
        "tags": [
          "應仁之亂",
          "下剋上",
          "室町衰頹",
          "戰國揭幕"
        ]
      },
      {
        "id": "evt_jp_tanegashima_teppo_1543",
        "year": 1543,
        "yearDisplay": "西元 1543 年 (天文十二年)",
        "title": "葡萄牙火繩槍傳入種子島引發軍事革命",
        "summary": "南蠻商人將歐洲火繩槍傳入日本，徹底顛覆傳統冷兵器戰術格局。",
        "detail": "一艘載有葡萄牙商人之明朝走私船漂流至薩摩種子島。島主種子島時堯以重金購得兩挺火繩槍並命刀工八板金兵衛仿製成功。火器迅速傳入國友村與堺港大規模量產，深刻改變戰國城防與野戰戰法。",
        "locationNameAncient": "大隅國種子島門倉岬",
        "locationNameModern": "鹿兒島縣熊毛郡南種子町",
        "coordinates": [
          130.88,
          30.33
        ],
        "tags": [
          "種子島",
          "鐵砲傳來",
          "軍事革命",
          "火繩槍"
        ]
      },
      {
        "id": "evt_jp_okehazama_1560",
        "year": 1560,
        "yearDisplay": "西元 1560 年 (永祿三年)",
        "title": "桶狹間之戰織田信長兩千斬殺今川義元",
        "summary": "織田信長暴風雨中奇襲今川義元兩萬五千大軍本陣，一舉震驚列國。",
        "detail": "駿河今川義元率大軍西征上洛。信長在清洲城決策進攻，冒狂風暴雨率兩千輕騎突襲桶狹間窪地今川本陣，陣斬今川義元。今川家迅速衰落，德川家康脫離獨立，信長聲威大振奠定霸權。",
        "locationNameAncient": "尾張國桶狹間田樂窪",
        "locationNameModern": "愛知縣豐明市榮町",
        "coordinates": [
          136.98,
          35.05
        ],
        "tags": [
          "桶狹間",
          "織田信長",
          "今川義元",
          "戰國奇蹟"
        ]
      },
      {
        "id": "evt_jp_kawanakajima_1561",
        "year": 1561,
        "yearDisplay": "西元 1561 年 (永祿四年)",
        "title": "第四次川中島合戰龍虎八幡原血戰",
        "summary": "武田信玄與上杉謙信展開最慘烈會戰，謙信單騎衝入本陣三斬信玄。",
        "detail": "信玄與謙信在信濃川中島八幡原正面決戰。謙信識破勘助啄木鳥戰法，晨霧中以車懸之陣直撲武田本陣，單騎揮刀砍信玄，信玄以軍配擋刀。武田名將信繁與軍師勘助戰死，成為日本武勇英雄傳奇典範。",
        "locationNameAncient": "信濃國八幡原川中島",
        "locationNameModern": "長野縣長野市八幡原史跡公園",
        "coordinates": [
          138.18,
          36.59
        ],
        "tags": [
          "川中島",
          "武田信玄",
          "上杉謙信",
          "龍虎對決"
        ]
      },
      {
        "id": "evt_jp_nagashino_1575",
        "year": 1575,
        "yearDisplay": "西元 1575 年 (天正三年)",
        "title": "長篠之戰信長三千火槍三段射覆沒武田赤備",
        "summary": "織田信長於設樂原築防馬柵，以密集火器三段輪射徹底摧毀無敵騎兵。",
        "detail": "武田勝賴率一萬五千赤備精騎圍長篠城。信長與家康以三萬八千大軍在設樂原構築三重防馬木柵，部署三千挺火繩槍實施輪射。武田騎兵衝鋒慘遭密集彈雨射殺，名將山縣昌景陣亡，武田名門基業盡毀。",
        "locationNameAncient": "三河國設樂原連吾川",
        "locationNameModern": "愛知縣新城市長篠城史蹟",
        "coordinates": [
          137.52,
          34.92
        ],
        "tags": [
          "長篠之戰",
          "三段射擊",
          "防馬柵",
          "近代火器革命"
        ]
      },
      {
        "id": "evt_jp_azuchi_castle_1579",
        "year": 1579,
        "yearDisplay": "西元 1579 年 (天正七年)",
        "title": "織田信長築安土城天下布武與樂市樂座",
        "summary": "建造琵琶湖畔七層五重安土天守，推行自由商業廢除特權行會。",
        "detail": "信長於琵琶湖畔興建極盡奢華之七層安土城，開創日本近代天守閣建築形制。頒布「樂市樂座」取締封建座商特權免除通行稅，推行兵農分離與常備軍制度，展現現代經濟與開放思維。",
        "locationNameAncient": "近江國安土山城",
        "locationNameModern": "滋賀縣近江八幡市安土町",
        "coordinates": [
          136.14,
          35.15
        ],
        "tags": [
          "安土城",
          "天下布武",
          "樂市樂座",
          "兵農分離"
        ]
      },
      {
        "id": "evt_jp_honnoji_incident_1582",
        "year": 1582,
        "yearDisplay": "西元 1582 年 (天正十年)",
        "title": "本能寺之變明智光秀叛變織田信長殞命",
        "summary": "明智光秀深夜誓師「敵在本能寺」，一代霸王信長葬身火海千古絕唱。",
        "detail": "信長下榻京都本能寺準備西征毛利。部將明智光秀突起反心，率一萬三千大軍圍攻寺廟。信長率數十侍衛弓箭力戰受創，在正殿引火自焚，年四十八歲，留下無人能解之戰國歷史最大謎團。",
        "locationNameAncient": "山城國京都本能寺",
        "locationNameModern": "京都府京都市中京區油小路通本能寺舊址",
        "coordinates": [
          135.75,
          35.01
        ],
        "tags": [
          "本能寺之變",
          "織田信長",
          "明智光秀",
          "歷史轉折"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_oda_nobunaga",
      "fig_jp_takeda_shingen",
      "fig_jp_uesugi_kenshin",
      "fig_jp_hojo_ujiyasu",
      "fig_jp_mori_motonari",
      "fig_jp_akechi_mitsuhide",
      "fig_jp_honda_tadakatsu"
    ]
  },
  {
    "id": "jp_azuchi_momoyama",
    "name": "安土桃山·天下統一",
    "dateRangeDisplay": "西元 1582 - 1603 年",
    "shortEra": "秀吉統一天下至關原之戰",
    "tagline": "中國大返還·太閤檢地·關原分水嶺",
    "description": "豐臣秀吉中國大返還平定逆賊，小田原征伐結束戰國百年分裂一統天下；推行太閤檢地與刀狩令奠定近代社會分層；秀吉身故後德川家康與石田三成爆發十六萬人關原大決戰，東軍獲勝奠定德川霸權。",
    "keyEvents": [
      {
        "id": "evt_jp_yamazaki_1582",
        "year": 1582,
        "yearDisplay": "西元 1582 年 (天正十年)",
        "title": "山崎合戰秀吉中國大返還殲滅明智光秀",
        "summary": "秀吉七天狂奔兩百公里奪天王山，光秀敗亡秀吉成為信長繼承人。",
        "detail": "本能寺變後秀吉火速與毛利議和，展開震驚全島之「中國大返還」。於山崎搶佔天王山高地全線壓制光秀軍。光秀出逃小栗棲遭竹槍擊斃，秀吉掌控織田政權核心大權。",
        "locationNameAncient": "山城國大山崎天王山",
        "locationNameModern": "京都府乙訓郡大山崎町",
        "coordinates": [
          135.68,
          34.89
        ],
        "tags": [
          "山崎合戰",
          "中國大返還",
          "豐臣秀吉",
          "天王山"
        ]
      },
      {
        "id": "evt_jp_osaka_castle_1583",
        "year": 1583,
        "yearDisplay": "西元 1583 年 (天正十一年)",
        "title": "豐臣秀吉修築天下第一名城大坂城",
        "summary": "石山本願寺舊址興建金碧輝煌之巨城要塞，成為統一天下之政治中心。",
        "detail": "秀吉動用數萬民工於難波要塞修築三重護城河、巨石壘砌之大坂城。本丸天守外飾金箔黑漆，匯聚天下物產與財富，展現「天下人」無上權威。",
        "locationNameAncient": "攝津國大坂城本丸",
        "locationNameModern": "大阪府大阪市中央區大阪城",
        "coordinates": [
          135.53,
          34.69
        ],
        "tags": [
          "大坂城",
          "豐臣秀吉",
          "天下人",
          "巨石要塞"
        ]
      },
      {
        "id": "evt_jp_taiko_kenchi_1588",
        "year": 1588,
        "yearDisplay": "西元 1588 年 (天正十六年)",
        "title": "太閤檢地與刀狩令奠定兵農分離",
        "summary": "全國統一度量衡測量田畝石高，沒收農民刀械兵器確立武士農民身分。",
        "detail": "秀吉頒布「刀狩令」收繳民間刀劍弓槍熔鑄大佛，剝奪農民武裝起義可能；推行「太閤檢地」釐清全國土地所有與石高稅負，奠定嚴格的兵農分離制度與近世社會秩序基礎。",
        "locationNameAncient": "京都聚樂第行幸",
        "locationNameModern": "京都府京都市上京區聚樂第舊址",
        "coordinates": [
          135.74,
          35.02
        ],
        "tags": [
          "太閤檢地",
          "刀狩令",
          "兵農分離",
          "石高制"
        ]
      },
      {
        "id": "evt_jp_odawara_siege_1590",
        "year": 1590,
        "yearDisplay": "西元 1590 年 (天正十八年)",
        "title": "小田原征伐滅後北條氏全日本終歸統一",
        "summary": "秀吉統率二十萬大軍包圍天下第一堅城小田原，終結百年戰國紛爭。",
        "detail": "後北條氏拒絕臣服。秀吉集結全日本諸大名二十餘萬大軍重重圍困小田原城三月，築石垣山一夜城挫敵士氣。北條氏政開城切腹，伊達政宗等奧羽諸大名盡皆歸順，戰國百年分裂至此徹底告終。",
        "locationNameAncient": "相模國小田原城與石垣山",
        "locationNameModern": "神奈川縣小田原市",
        "coordinates": [
          139.15,
          35.25
        ],
        "tags": [
          "小田原征伐",
          "天下統一",
          "北條滅亡",
          "一夜城"
        ]
      },
      {
        "id": "evt_jp_sekigahara_1600",
        "year": 1600,
        "yearDisplay": "西元 1600 年 (慶長五年)",
        "title": "關原之戰天下分水嶺德川家康奪天下",
        "summary": "東西軍十六萬大軍於美濃關原大決戰，家康擊潰三成奠定德川幕府基業。",
        "detail": "秀吉卒後家康奪權。石田三成合組十萬西軍於關原布陣迎戰東軍。正午家康以問鐵砲迫使小早川秀秋倒戈衝下松尾山夾擊大谷吉繼，西軍大潰。家康一日定天下，開啟德川家康統治時代。",
        "locationNameAncient": "美濃國關原古戰場",
        "locationNameModern": "岐阜縣不破郡關原町",
        "coordinates": [
          136.53,
          35.36
        ],
        "tags": [
          "關原之戰",
          "天下分水嶺",
          "德川家康",
          "石田三成"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_toyotomi_hideyoshi",
      "fig_jp_tokugawa_ieyasu",
      "fig_jp_ishida_mitsunari",
      "fig_jp_sanada_masayuki",
      "fig_jp_kuroda_kanbei",
      "fig_jp_date_masamune"
    ]
  },
  {
    "id": "jp_edo",
    "name": "江戶幕府·鎖國治世",
    "dateRangeDisplay": "西元 1603 - 1853 年",
    "shortEra": "大坂之陣至黑船來航前夕",
    "tagline": "征夷大將軍·參勤交代·鎖國承平",
    "description": "德川家康受封征夷大將軍建都江戶；大坂冬夏之陣徹底平定豐臣殘餘；制定參勤交代削弱諸藩；鎖國體制獨留長崎出島；元祿赤穗浪士忠臣藏；迎來二百六十年無內戰之承平繁榮盛世。",
    "keyEvents": [
      {
        "id": "evt_jp_edo_bakufu_1603",
        "year": 1603,
        "yearDisplay": "西元 1603 年 (慶長八年)",
        "title": "德川家康就任征夷大將軍建立江戶幕府",
        "summary": "後陽成天皇冊封家康為征夷大將軍，開創二百六十年江戶時代。",
        "detail": "德川家康在伏見城受旨封為將軍，隨後移駕江戶城展開「天下普請」大規模填海興建巨城與五街道（東海道、中山道等），奠定現代東京作為日本政治經濟樞紐地位。",
        "locationNameAncient": "武藏國江戶城本丸",
        "locationNameModern": "東京都千代田區皇居",
        "coordinates": [
          139.75,
          35.68
        ],
        "tags": [
          "江戶幕府",
          "德川家康",
          "天下普請",
          "征夷大將軍"
        ]
      },
      {
        "id": "evt_jp_osaka_siege_1615",
        "year": 1615,
        "yearDisplay": "西元 1615 年 (慶長二十年)",
        "title": "大坂夏之陣豐臣覆滅真田幸村戰神絕唱",
        "summary": "真田幸村三度直衝家康本陣殺出威名，大坂城陷落戰國亂世終結。",
        "detail": "德川家康統帥十五萬大軍發動夏之陣。真田幸村以赤備決死突擊三度衝入家康大營斬翻馬印，家康幾乎切腹。幸村力竭於茶臼山成仁，豐臣秀賴與淀殿自盡大坂城陷落，元和偃武時代降臨。",
        "locationNameAncient": "攝津國大坂城天守",
        "locationNameModern": "大阪府大阪市中央區大阪城公園",
        "coordinates": [
          135.53,
          34.69
        ],
        "tags": [
          "大坂夏之陣",
          "真田幸村",
          "元和偃武",
          "豐臣滅亡"
        ]
      },
      {
        "id": "evt_jp_buke_shohatto_1615",
        "year": 1615,
        "yearDisplay": "西元 1615 年 (元和元年)",
        "title": "頒布《武家諸法度》與參勤交代制度",
        "summary": "嚴格規範大名築城、婚姻與人質進京，確立幕藩體制中央集權統治。",
        "detail": "幕府頒布《武家諸法度》，規定諸藩「一國一城」、嚴禁私自修繕城郭與私通聯姻；後德川家光確立「參勤交代」制度，規定各大名每隔一年必須進京服役，妻兒留作人質，大幅消耗諸藩財力避免叛亂。",
        "locationNameAncient": "武藏國江戶城黑書院",
        "locationNameModern": "東京都千代田區皇居",
        "coordinates": [
          139.75,
          35.68
        ],
        "tags": [
          "武家諸法度",
          "參勤交代",
          "幕藩體制",
          "一國一城"
        ]
      },
      {
        "id": "evt_jp_sakoku_orders_1639",
        "year": 1639,
        "yearDisplay": "西元 1639 年 (寬永十六年)",
        "title": "島原之亂平定與全面實施鎖國令",
        "summary": "鎮壓天主教島原起義，全面禁止葡萄牙西班牙船隻，僅留長崎出島。",
        "detail": "九州島原天主教農民在天草四郎率領下爆發大起義，幕府調集十二萬聯軍苦戰數月始平定。隨後頒布第五道鎖國令，禁止日本人出國與海外歸國，對外貿易全面限制於長崎出島（荷蘭與中國商船），開啟二百餘年封閉鎖國。",
        "locationNameAncient": "肥前國長崎出島蘭館",
        "locationNameModern": "長崎縣長崎市出島町",
        "coordinates": [
          129.87,
          32.74
        ],
        "tags": [
          "島原之亂",
          "鎖國令",
          "長崎出島",
          "天草四郎"
        ]
      },
      {
        "id": "evt_jp_ako_incident_1702",
        "year": 1702,
        "yearDisplay": "西元 1702 年 (元祿十五年)",
        "title": "元祿赤穗浪士夜襲復仇與忠臣藏傳奇",
        "summary": "大石內藏助率四十七浪人雪夜攻入吉良邸報君仇，彰顯極致武士道。",
        "detail": "赤穗藩主淺野內匠頭遭吉良上野介侮辱於江戶城松之大廊下拔刀被迫切腹。家老大石內藏助隱忍兩年，於雪夜率四十七義士直搗吉良宅邸斬殺仇敵祭主，全員從容切腹就義，成為日本文學戲劇《忠臣藏》永恆母題。",
        "locationNameAncient": "武藏國本所吉良邸與高輪泉岳寺",
        "locationNameModern": "東京都港區高輪二丁目泉岳寺",
        "coordinates": [
          139.74,
          35.64
        ],
        "tags": [
          "忠臣藏",
          "大石內藏助",
          "赤穗四十七士",
          "武士道"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_tokugawa_ieyasu",
      "fig_jp_sanada_yukimura",
      "fig_jp_tokugawa_iemitsu",
      "fig_jp_miyamoto_musashi",
      "fig_jp_tokugawa_yoshimune"
    ]
  },
  {
    "id": "jp_bakumatsu",
    "name": "幕末風雲·尊王倒幕",
    "dateRangeDisplay": "西元 1853 - 1868 年",
    "shortEra": "黑船來航至戊辰戰爭終局",
    "tagline": "尊王攘夷·薩長同盟·大政奉還",
    "description": "美國海軍培里黑船來航強迫日本開國；安政大獄催生尊王攘夷烈火；坂本龍馬促成薩摩與長州同盟提出船中八策；德川慶喜宣告大政奉還；戊辰戰爭爆發鳥羽伏見西鄉隆盛促成江戶無血開城；新選組土方歲三五稜郭悲壯落幕。",
    "keyEvents": [
      {
        "id": "evt_jp_perry_black_ships_1853",
        "year": 1853,
        "yearDisplay": "西元 1853 年 (嘉永六年)",
        "title": "美國海軍培里黑船來航浦賀迫日開國",
        "summary": "美軍四艘蒸汽鐵甲黑色巨艦駛入江戶灣，震碎日本二百年鎖國美夢。",
        "detail": "美國海軍准將培里率四艘黑色蒸汽巡洋艦強勢駛入浦賀海峽，黑煙滾滾艦砲威脅。幕府無力抵抗被迫於次年簽訂《日美神奈川條約》開放下田、函館兩港，終結二百年鎖國，日本陷入「尊王攘夷」激盪狂潮。",
        "locationNameAncient": "相模國三浦郡浦賀港",
        "locationNameModern": "神奈川縣橫須賀市浦賀港",
        "coordinates": [
          139.72,
          35.25
        ],
        "tags": [
          "黑船來航",
          "培里",
          "開國條約",
          "幕末序幕"
        ]
      },
      {
        "id": "evt_jp_sakuradamon_1860",
        "year": 1860,
        "yearDisplay": "西元 1860 年 (安政七年)",
        "title": "櫻田門外之變井伊直弼遇刺幕府權威大墜",
        "summary": "水戶浪士雪夜刺殺鐵血大老井伊直弼，幕府專制統治遭遇致命重創。",
        "detail": "幕府大老大興「安政大獄」逮捕處死吉田松陰等大批尊攘志士。水戶與薩摩十八名浪士在江戶城櫻田門外大雪中奇襲大老轎輿斬殺井伊直弼。幕府至高權威蕩然無存，倒幕風潮勢不可擋。",
        "locationNameAncient": "武藏國江戶城櫻田門外",
        "locationNameModern": "東京都千代田區皇居櫻田門",
        "coordinates": [
          139.75,
          35.68
        ],
        "tags": [
          "櫻田門外之變",
          "井伊直弼",
          "安政大獄",
          "幕府崩解"
        ]
      },
      {
        "id": "evt_jp_satsuma_choshu_alliance_1866",
        "year": 1866,
        "yearDisplay": "西元 1866 年 (慶應二年)",
        "title": "坂本龍馬促成薩長同盟建立倒幕主力",
        "summary": "土佐浪士坂本龍馬以卓越政治遠見化解宿仇，薩摩與長州握手結盟。",
        "detail": "長年敵對的西國兩大強藩薩摩（西鄉隆盛、小松帶刀）與長州（木戶孝允）在京都薩摩藩邸密會。坂本龍馬從中斡旋，長州購得洋槍彈藥、薩摩獲得糧米，兩大藩締結密約，凝聚成摧毀江戶幕府的決定性同盟。",
        "locationNameAncient": "山城國京都薩摩藩二本松藩邸",
        "locationNameModern": "京都府京都市上京區同志社大學旁",
        "coordinates": [
          135.76,
          35.03
        ],
        "tags": [
          "薩長同盟",
          "坂本龍馬",
          "西鄉隆盛",
          "木戶孝允"
        ]
      },
      {
        "id": "evt_jp_taisei_hokan_1867",
        "year": 1867,
        "yearDisplay": "西元 1867 年 (慶應三年)",
        "title": "德川慶喜二條城宣告大政奉還還政天皇",
        "summary": "末代將軍德川慶喜主動將統治大權奉還明治天皇，避免全面內戰。",
        "detail": "依據坂本龍馬「船中八策」倡議，第十五代將軍德川慶喜於京都二條城召集諸藩重臣，正式呈交奏摺將掌管二百六十年的統治政權奉還天皇，實施王政復古，幕府時代在法理上正式告終。",
        "locationNameAncient": "山城國京都二條城二之丸御殿",
        "locationNameModern": "京都府京都市中京區二條城",
        "coordinates": [
          135.75,
          35.01
        ],
        "tags": [
          "大政奉還",
          "德川慶喜",
          "二條城",
          "王政復古"
        ]
      },
      {
        "id": "evt_jp_boshin_war_1868",
        "year": 1868,
        "yearDisplay": "西元 1868 年 (慶應四年)",
        "title": "戊辰戰爭爆發與江戶無血開城",
        "summary": "鳥羽伏見戰役擊潰舊幕府軍，西鄉隆盛與勝海舟會談保全江戶百萬生靈。",
        "detail": "鳥羽伏見之戰新政府軍手持錦旗大勝。西鄉隆盛統率大軍兵臨江戶，幕府陸軍總裁勝海舟親赴薩摩藩邸會談，達成和平交割協議。江戶城「無血開城」免遭毀滅，隨後改名為「東京」，新時代啟航。",
        "locationNameAncient": "武藏國江戶城西之丸與田町薩摩藩邸",
        "locationNameModern": "東京都港區芝五丁目三田薩摩藩邸跡",
        "coordinates": [
          139.75,
          35.65
        ],
        "tags": [
          "戊辰戰爭",
          "無血開城",
          "西鄉隆盛",
          "勝海舟"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_sakamoto_ryoma",
      "fig_jp_saigo_takamori",
      "fig_jp_hijikata_toshizo",
      "fig_jp_katsu_kaishu"
    ]
  },
  {
    "id": "jp_meiji_modern",
    "name": "明治維新·近代崛起",
    "dateRangeDisplay": "西元 1868 - 1945 年+",
    "shortEra": "明治維新至近代文明開化",
    "tagline": "富國強兵·殖產興業·憲政列強",
    "description": "明治天皇頒《五條御誓文》推行廢藩置縣四民平等；岩倉使節團考察歐美引進西學；福澤諭吉啟蒙國民；西南戰爭終結武士特權；伊藤博文起草亞洲首部近代憲法；日俄戰爭對馬海戰擊破列強躋身世界舞台。",
    "keyEvents": [
      {
        "id": "evt_jp_charter_oath_1868",
        "year": 1868,
        "yearDisplay": "西元 1868 年 (明治元年)",
        "title": "明治天皇頒布五條御誓文開展維新變法",
        "summary": "宣告「廣求知識於世界，大振皇基」，確立改革開放基本國策。",
        "detail": "由木戶孝允與由利公正起草，十六歲明治天皇於京都御所紫宸殿率百官向上天宣誓：廣興會議萬機決於公論、破除舊習求知識於世界。隨後定年號為「明治」，遷都東京，推行近代全方位改革。",
        "locationNameAncient": "山城國京都御所紫宸殿",
        "locationNameModern": "京都府京都市上京區京都御所",
        "coordinates": [
          135.76,
          35.02
        ],
        "tags": [
          "五條御誓文",
          "明治天皇",
          "文明開化",
          "近代改革"
        ]
      },
      {
        "id": "evt_jp_haihan_chiken_1871",
        "year": 1871,
        "yearDisplay": "西元 1871 年 (明治四年)",
        "title": "廢藩置縣徹底消滅封建割據統一天下",
        "summary": "廢除二百六十個藩國改立府縣，知事由中央直接派遣確立集權中央體制。",
        "detail": "西鄉隆盛、大久保利通調動薩長土三藩御親兵鎮守東京，斷然宣布廢除全日本所有藩國，收回諸侯大名領地，改設三府七十二縣，徹底打破延續千年的武士封建割據，建立現代民族國家政體。",
        "locationNameAncient": "東京都皇居正殿",
        "locationNameModern": "東京都千代田區皇居",
        "coordinates": [
          139.75,
          35.68
        ],
        "tags": [
          "廢藩置縣",
          "大久保利通",
          "中央集權",
          "現代府縣"
        ]
      },
      {
        "id": "evt_jp_seinan_war_1877",
        "year": 1877,
        "yearDisplay": "西元 1877 年 (明治十年)",
        "title": "西南戰爭爆發武士階級走向終結",
        "summary": "西鄉隆盛率薩摩士族發動最後抗爭，城山自刃象徵武士時代落幕。",
        "detail": "因廢刀令與俸祿取消，不滿政府官僚的薩摩士族推舉西鄉隆盛起兵。田原坂血戰十七天，政府平民徵兵依託現代彈雨火力重創薩軍。西鄉在鹿兒島城山切腹身亡，舊武士特權階級徹底走入歷史灰燼。",
        "locationNameAncient": "薩摩國鹿兒島城山",
        "locationNameModern": "鹿兒島縣鹿兒島市城山公園",
        "coordinates": [
          130.55,
          31.6
        ],
        "tags": [
          "西南戰爭",
          "西鄉隆盛",
          "最後武士",
          "城山自刃"
        ]
      },
      {
        "id": "evt_jp_meiji_constitution_1889",
        "year": 1889,
        "yearDisplay": "西元 1889 年 (明治二十二年)",
        "title": "頒布《大日本帝國憲法》亞洲首開憲政",
        "summary": "伊藤博文主持起草亞洲第一部近代成文憲法，建立帝國議會兩院制。",
        "detail": "借鑑普魯士君主立憲架構，明治天皇親自頒布《大日本帝國憲法》。規定三權分立、創設貴族院與眾議院，確立臣民基本權利與法治國家形式，使日本成為亞洲第一個實施近代憲政之國家。",
        "locationNameAncient": "東京都宮城正殿",
        "locationNameModern": "東京都千代田區國會議事堂",
        "coordinates": [
          139.74,
          35.68
        ],
        "tags": [
          "大日本帝國憲法",
          "伊藤博文",
          "亞洲首部憲法",
          "立憲君主"
        ]
      },
      {
        "id": "evt_jp_tsushima_naval_1905",
        "year": 1905,
        "yearDisplay": "西元 1905 年 (明治三十八年)",
        "title": "對馬海戰東鄉平八郎全殲波羅的海艦隊",
        "summary": "聯合艦隊全殲俄羅斯遠征巨艦，亞洲國家首度在現代海戰擊敗歐洲列強。",
        "detail": "日俄戰爭關鍵海戰。東鄉平八郎率聯合艦隊於對馬海峽打出「Z字旗」，冒險實施「東鄉丁字轉彎」火力全開，擊沉俘獲俄軍主力戰艦二十餘艘，迫使沙皇求和簽署《朴茨茅斯條約》，日本國際地位躋身世界列強行列。",
        "locationNameAncient": "對馬海峽外海海域",
        "locationNameModern": "長崎縣對馬市周邊海面",
        "coordinates": [
          129.5,
          34.35
        ],
        "tags": [
          "對馬海峽海戰",
          "東鄉平八郎",
          "三笠號",
          "躋身列強"
        ]
      }
    ],
    "highlightFigures": [
      "fig_jp_ito_hirobumi",
      "fig_jp_fukuzawa_yukichi",
      "fig_jp_togo_heihachiro"
    ]
  }
];
