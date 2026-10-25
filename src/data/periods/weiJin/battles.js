// Historic Battles of Wei, Jin, Southern and Northern Dynasties (220 CE - 589 CE)
export const WEI_JIN_BATTLES = [
  {
    id: "battle_mie_wu_280",
    eventId: "evt_miewu_280",
    name: "晉滅吳之戰（樓船直下建業，三國六十年歸於一統）",
    year: 280,
    yearDisplay: "西元 280 年",
    eraName: "晉 咸寧六年 / 太康元年 · 吳 天紀四年",
    locationAncient: "西陵、江陵、牛渚、建業（長江中下游）",
    locationModern: "湖北省宜昌市 / 湖北省荊州市 / 江蘇省南京市",
    coordinates: [32.06, 118.79],
    factions: ["jin", "other"],
    attacker: {
      factionName: "西晉伐吳大軍（六路並進水陸並發）",
      faction: "jin",
      commanders: [
        {
          name: "杜預",
          title: "鎮南大將軍 · 都督荊州諸軍事",
          figureId: "du_yu"
        },
        {
          name: "王濬",
          title: "益州刺史 · 龍驤將軍（造巨型樓船五牙順流東下）",
          figureId: "wang_jun_jin"
        },
        {
          name: "司馬伷",
          title: "鎮東大將軍 · 琅琊王",
          figureId: "sima_zhou"
        },
        {
          name: "王渾",
          title: "安東將軍 · 都督揚州諸軍事"
        }
      ],
      forcesEstimate: "水陸六路大軍合計約 20 萬餘人、戰船數千艘",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "東吳水陸防線守軍",
      faction: "other",
      commanders: [
        {
          name: "孫皓",
          title: "東吳末帝（後主）"
        },
        {
          name: "張悌",
          title: "東吳丞相（領軍三萬渡江死戰殉國）"
        },
        {
          name: "吾彥",
          title: "建平太守（沿江設鐵鎖暗置江中）"
        }
      ],
      forcesEstimate: "東吳沿江守軍與近衛近 10 萬人",
      casualtiesEstimate: "死傷萬餘人，孫皓率文武百官銜璧輿櫬出降"
    },
    tactics: [
      "王濬造長百二十步、容二千人之巨型連舫樓船，自巴蜀順長江東下；以火櫱大筏灌麻油燒斷東吳置於三峽之江底鐵鎖木樁，勢如破竹",
      "杜預出江陵襲破西陵樂鄉，斬吳都督陸景，飛報朝廷『如破竹之勢，數節之後，迎刃而解』",
      "六路大軍齊集建業外圍，張悌板橋渡江力竭戰死，王濬旌旗蔽日舟師直抵石頭城，迫使孫皓面縛出降"
    ],
    victorStatement: "西晉大獲全勝，東吳四州四十三郡全境降晉。自漢末黃巾以來六十載之三國鼎立割據徹底終結，天下大統。",
    strategicOutcome: "西晉收復長江以南二百三十萬戶口，俘獲舟船五千餘艘，結束自東漢建安以來天下分裂格局，迎來短暫繁盛的「太康之治」。",
    summary: "西元 279 年冬，晉武帝司馬炎採納羊祜遺策與杜預、張華之謀，發動二十萬大軍分六路伐吳。益州刺史王濬率龐大水軍沿長江東下，以大火筏焚燬江底鐵鎖木樁；杜預連下江陵各城；王濬舟師直抵建業石頭城。東吳丞相張悌戰死，孫皓自縛出降，東吳滅亡。",
    significance: "晉滅吳是中國古代水陸協同大規模渡江作戰之經典範例，標誌著三國時代畫上句號，自秦漢之後中華大地重歸政治統一。"
  },
  {
    id: "battle_luoyang_yongjia_311",
    eventId: "evt_yongjia_311",
    name: "洛陽永嘉之戰（五胡破京師，西晉覆亡之浩劫）",
    year: 311,
    yearDisplay: "西元 311 年",
    eraName: "晉 永嘉五年 · 漢 嘉平元年",
    locationAncient: "洛陽城（河南洛陽）",
    locationModern: "河南省洛陽市洛龍區古城遺跡",
    coordinates: [34.62, 112.45],
    factions: ["sixteen", "jin"],
    attacker: {
      factionName: "漢趙匈奴羯胡聯軍",
      faction: "sixteen",
      commanders: [
        {
          name: "劉曜",
          title: "漢趙始安王 · 車騎大將軍",
          figureId: "liu_yao"
        },
        {
          name: "王彌",
          title: "漢趙征東大將軍"
        },
        {
          name: "石勒",
          title: "後趙前身 · 鎮東大將軍",
          figureId: "shi_le"
        },
        {
          name: "呼延晏",
          title: "漢趙前鋒大將"
        }
      ],
      forcesEstimate: "匈奴羯胡精騎約 5 萬 ~ 7 萬人",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "西晉洛陽朝廷與殘存衛軍",
      faction: "jin",
      commanders: [
        {
          name: "司馬熾 (晉懷帝)",
          title: "西晉第三代皇帝（被俘押往平陽後遭毒殺）"
        },
        {
          name: "司馬越殘部諸將",
          title: "西晉宗室殿中將士"
        }
      ],
      forcesEstimate: "洛陽饑饉守軍約 3 萬人（大軍此前隨司馬越靈柩出城，於苦縣遭石勒全殲十餘萬）",
      casualtiesEstimate: "洛陽王公士民死者三萬餘人，百官士庶慘遭屠戮，宮廟焚燬"
    },
    tactics: [
      "石勒於苦縣寧平城以騎兵圍殲太尉王衍及司馬越十餘萬大軍與宗室，徹底摧毀西晉中原野戰主力",
      "呼延晏先以騎兵截斷洛陽外圍糧道，劉曜、王彌大軍合圍，猛攻宣陽門入城，縱兵大掠焚燬宮室"
    ],
    victorStatement: "漢趙大軍攻破洛陽，擄晉懷帝及傳國玉璽北去平陽。西晉中原政權徹底瓦解。",
    strategicOutcome: "洛陽化為焦土，華夏政治中心崩潰，北方門閥士族與百萬黎民被迫大舉渡江南下，促成歷史上深遠的「衣冠南渡」，五胡十六國全面割據中原。",
    summary: "西晉經八王之亂十六年自殘，元氣耗盡。西元 311 年，漢趙劉曜、石勒、王彌等率大軍合圍洛陽。城內大饑，人相食。胡軍破宣陽門入城，屠王公士庶三萬餘人，焚燒太廟宮殿，俘擄晉懷帝，西晉宗廟傾覆。",
    significance: "永嘉之亂是華夏歷史之巨大震盪，宣告兩晉南北朝長達近三百年的南北大分裂與民族大交融時代正式全面降臨。"
  },
  {
    id: "battle_zuti_beifa_317",
    eventId: "evt_zuti_beifa_317",
    name: "祖逖北伐黃河之戰（聞雞起舞擊楫中流，力挽狂瀾收復河南）",
    year: 317,
    yearDisplay: "西元 317 — 321 年",
    eraName: "晉 大興年間",
    locationAncient: "譙郡、雍丘、襄國南線（河南黃河南岸）",
    locationModern: "河南省杞縣（雍丘） / 安徽省亳州市（譙郡）",
    coordinates: [34.55, 114.78],
    factions: ["jin", "sixteen"],
    attacker: {
      factionName: "東晉祖逖北伐義勇軍",
      faction: "jin",
      commanders: [
        {
          name: "祖逖",
          title: "奮威將軍 · 豫州刺史（中流擊楫誓清中原）",
          figureId: "zu_ti"
        },
        {
          name: "韓晃",
          title: "祖逖部將"
        }
      ],
      forcesEstimate: "初僅數百部曲及千匹布，後沿途收攏乞活軍與塢堡民壯萬餘人",
      casualtiesEstimate: "傷亡數千人"
    },
    defender: {
      factionName: "後趙石勒羯族鐵騎與依附塢堡",
      faction: "sixteen",
      commanders: [
        {
          name: "石勒",
          title: "後趙明帝（趙王）",
          figureId: "shi_le"
        },
        {
          name: "石虎",
          title: "後趙征虜將軍",
          figureId: "shi_hu"
        },
        {
          name: "桃豹",
          title: "後趙將領"
        }
      ],
      forcesEstimate: "羯胡步騎數萬人",
      casualtiesEstimate: "死傷萬餘人，陳川、桃豹等部相繼潰退黃河以北"
    },
    tactics: [
      "渡江至中流，祖逖擊楫而誓：『祖逖不能清中原而復濟者，有如大江！』極大激發南渡將士雪恥鬥志",
      "巧用疑兵計策反塢堡，設布袋盛米偽作千斛糧草迷惑後趙桃豹，遣伏兵斷其糧道，夜襲破敵",
      "懷柔招撫散落河南之漢人塢壁，實行『胡漢兼撫』，使後趙將士莫敢犯境，黃河以南各塢堡盡歸東晉"
    ],
    victorStatement: "祖逖大敗後趙羯軍，盡復黃河以南故地，石勒震恐修祖逖祖塋以示通好。",
    strategicOutcome: "收復豫州、兗州黃河以南全境，築牢東晉北方江淮緩衝屏障；後因朝廷疑忌派戴淵牽制，祖逖憂憤成疾卒於雍丘，河南復失。",
    summary: "晉室南渡建康，司馬睿無意北伐。祖逖毅然率部曲百家渡江，中流擊楫誓清中原。祖逖轉戰淮北豫州，攻拔反覆塢堡，大敗石虎、桃豹，收復黃河以南失地，威震華夏。石勒不敢南侵，修祖氏祖塋以修好。",
    significance: "祖逖北伐是東晉初期漢民族抵抗胡族入主、力圖收復故土之最光輝篇章，『聞雞起舞』與『中流擊楫』成為中華民族自強不息之精神圖騰。"
  },
  {
    id: "battle_fangtou_369",
    eventId: "evt_fangtou_369",
    name: "枋頭之戰（慕容垂奇謀伏擊，桓溫第三次北伐潰敗之役）",
    year: 369,
    yearDisplay: "西元 369 年",
    eraName: "晉 太和四年 · 前燕 建熙十年",
    locationAncient: "枋頭（河南浚縣西南淇門）",
    locationModern: "河南省鶴壁市浚縣西南",
    coordinates: [35.67, 114.55],
    factions: ["sixteen", "jin"],
    attacker: {
      factionName: "東晉桓溫北伐水陸大軍",
      faction: "jin",
      commanders: [
        {
          name: "桓溫",
          title: "大司馬 · 都督中外諸軍事",
          figureId: "huan_wen"
        },
        {
          name: "袁真",
          title: "東晉征虜將軍"
        }
      ],
      forcesEstimate: "水陸步騎約 5 萬人、戰船千餘艘",
      casualtiesEstimate: "撤軍時遭伏擊死傷三萬餘人，遺棄大量輜重兵甲"
    },
    defender: {
      factionName: "前燕鮮卑主力騎兵與前秦援軍",
      faction: "sixteen",
      commanders: [
        {
          name: "慕容垂",
          title: "前燕吳王 · 鮮卑戰神（前燕大都督）",
          figureId: "murong_chui"
        },
        {
          name: "慕容德",
          title: "前燕范陽王",
          figureId: "murong_de"
        },
        {
          name: "苟池",
          title: "前秦援燕將軍（苻堅所遣二萬騎兵）"
        }
      ],
      forcesEstimate: "前燕與前秦聯軍約 7 萬騎兵",
      casualtiesEstimate: "傷亡千餘人"
    },
    tactics: [
      "慕容垂精確判斷桓溫孤軍深入、倚賴水路糧運之致命弱點，令申紹深溝高壘堅壁不戰，遣輕騎斷東晉汴水糧道",
      "桓溫因旱缺水舟船難進、軍中糧竭，無奈焚燒戰船徒步南撤；慕容垂率八千精騎尾隨不即不離，待晉軍鬆懈於襄邑設伏夾擊",
      "前秦苟池二萬騎兵自側面猛切截擊，晉軍全線崩潰死傷大半"
    ],
    victorStatement: "前燕慕容垂大獲全勝，陣斬及俘虜晉軍三萬餘人，桓溫北伐精銳盡喪。",
    strategicOutcome: "粉碎了東晉桓溫篡晉立國之軍事聲望，前燕雖勝但內鬥加劇逼走慕容垂，前秦苻堅旋即乘虛滅燕，一統北方。",
    summary: "西元 369 年，東晉大司馬桓溫率五萬大軍第三次北伐直逼前燕都城鄴城，進抵枋頭。前燕吳王慕容垂臨危受命，堅壁拒戰斷其糧道。桓溫糧盡南撤，慕容垂率精騎追擊於襄邑大破晉軍，斬殺三萬餘人。桓溫抱憾南歸。",
    significance: "枋頭之役徹底扭轉了東晉對北方五胡的戰略攻勢態勢，奠定了慕容垂一代名將歷史地位，並間接引爆了前秦吞併前燕的北方大變局。"
  },
  {
    id: "battle_feishui_383",
    eventId: "evt_feishui_383",
    name: "淝水之戰（投鞭斷流前秦覆亡，八萬北府兵以少勝多之千古奇蹟）",
    year: 383,
    yearDisplay: "西元 383 年",
    eraName: "晉 太元八年 · 前秦 建元十九年",
    locationAncient: "淝水（八公山、壽陽）",
    locationModern: "安徽省淮南市壽縣八公山下淝水河畔",
    coordinates: [32.58, 116.78],
    factions: ["jin", "sixteen"],
    attacker: {
      factionName: "東晉北府兵與水陸守軍",
      faction: "jin",
      commanders: [
        {
          name: "謝安",
          title: "東晉尚書僕射 · 宰相（東山運籌帷幄，小兒輩大破賊）",
          figureId: "xie_an"
        },
        {
          name: "謝玄",
          title: "建武將軍 · 兗州刺史（前鋒都督統率北府精銳）",
          figureId: "xie_xuan"
        },
        {
          name: "謝石",
          title: "征虜將軍 · 征討大都督"
        },
        {
          name: "劉牢之",
          title: "北府鷹揚大將（率五千精騎奇襲洛澗大捷）"
        }
      ],
      forcesEstimate: "精銳北府兵 8 萬人（劉牢之洛澗前鋒 5,000 人）",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "前秦各民族百萬南征大軍",
      faction: "sixteen",
      commanders: [
        {
          name: "苻堅",
          title: "前秦宣昭帝（天王）",
          figureId: "fu_jian"
        },
        {
          name: "苻融",
          title: "陽平公 · 前鋒大都督（陣亡於亂軍之中）"
        },
        {
          name: "朱序",
          title: "原東晉襄陽太守（身在秦營大呼『秦軍敗矣』）"
        },
        {
          name: "慕容垂",
          title: "前秦冠軍將軍（坐壁上觀保全鮮卑軍）",
          figureId: "murong_chui"
        }
      ],
      forcesEstimate: "號稱步卒六十萬、騎兵二十七萬（淝水前線主力約 25 萬人）",
      casualtiesEstimate: "前秦軍大潰自相踐踏，死者十之七八，苻融落馬被斬，苻堅中流矢單騎逃奔"
    },
    tactics: [
      "劉牢之以五千北府夜襲洛澗，陣斬梁成，重挫前秦銳氣，苻堅登壽陽城望八公山草木皆以為晉兵",
      "謝玄遣使約苻堅『後退半舍，待晉軍渡水決戰』；苻堅欲半渡擊之而令後撤，前秦各族聯軍軍心不齊引發恐慌大倒退",
      "東晉內應朱序於陣後厲聲高呼『秦軍敗矣！秦軍敗矣！』，前秦軍大潰不可遏止，自相蹂躪，聞風聲鶴唳皆以為晉兵至"
    ],
    victorStatement: "東晉八萬北府兵徹底粉碎前秦百萬大軍，前秦宣昭帝苻堅負傷隻身北逃，前秦帝國旋即分崩離析。",
    strategicOutcome: "保全了江左華夏漢文化正朔與衣冠禮樂，阻止了五胡政權南侵；北方再度陷入後燕、後秦、西燕、北魏大分裂，迎來東晉太元鼎盛期。",
    summary: "西元 383 年，前秦苻堅傾全國之力號稱百萬大軍大舉伐晉，志在一統天下。東晉謝安以謝石為大都督、謝玄率八萬北府兵迎敵。謝玄於洛澗大捷後進逼淝水，邀秦軍退後渡水決戰。秦軍稍退，朱序大呼潰散，秦軍大亂自踐。苻融戰死，苻堅身中流矢逃歸長安。謝安對弈得捷報，屐齒皆折而不動聲色。",
    significance: "淝水之戰是中國歷史上規模最大、懸念最足之以少勝多戰役，直接改寫了中古華夏歷史進程，使南北朝政治文化大格局延續達兩百年之久。"
  },
  {
    id: "battle_canhebei_395",
    eventId: "evt_canhebei_395",
    name: "參合陂之戰（拓跋珪雪夜奇襲破後燕，北魏雄霸北方之奠基戰）",
    year: 395,
    yearDisplay: "西元 395 年",
    eraName: "北魏 登國十年 · 後燕 建興十年",
    locationAncient: "參合陂（山西陽高南 / 內蒙古涼城境內）",
    locationModern: "山西省大同市陽高縣西南參合陂",
    coordinates: [40.35, 113.75],
    factions: ["northern", "sixteen"],
    attacker: {
      factionName: "北魏拓跋珪鮮卑騎兵",
      faction: "northern",
      commanders: [
        {
          name: "拓跋珪",
          title: "北魏道武帝（拓跋鮮卑開國之主）",
          figureId: "tuoba_gui"
        },
        {
          name: "拓跋儀",
          title: "拓跋珪從弟 · 東平公"
        }
      ],
      forcesEstimate: "精騎 2 萬人",
      casualtiesEstimate: "傷亡數百人"
    },
    defender: {
      factionName: "後燕太子慕容寶主力大軍",
      faction: "sixteen",
      commanders: [
        {
          name: "慕容寶",
          title: "後燕太子（後燕惠愍帝）"
        },
        {
          name: "慕容農",
          title: "後燕遼西王",
          figureId: "murong_nong"
        },
        {
          name: "慕容麟",
          title: "後燕趙王"
        }
      ],
      forcesEstimate: "後燕步騎大軍約 8 萬人",
      casualtiesEstimate: "被斬及俘虜後燕將士五萬餘人，慕容寶單騎隻身突圍"
    },
    tactics: [
      "拓跋珪截斷後燕與中山國都通信，謊報慕容垂病故，使後燕全軍震恐離心、慕容寶軍心動搖倉促撤軍",
      "拓跋珪親選二萬精騎，一人備兩馬銜枚夜行連夜狂馳，追至參合陂趁後燕大軍臨水未備發起暴風突襲",
      "魏軍自西山順風縱馬俯衝夾擊，燕軍大驚失措自相踐踏投水死者萬計"
    ],
    victorStatement: "北魏全殲後燕八萬主力精銳，慕容垂得知參合陂死難萬眾悲憤嘔血病亡。",
    strategicOutcome: "後燕元氣徹底斷絕，北魏拓跋鮮卑迅速入關席捲中原河北，奠定了北魏統治整個華北的百年生機。",
    summary: "西元 395 年，後燕慕容垂遣太子慕容寶率八萬大軍征討北魏。拓跋珪堅壁清野、斷其後方音信。燕軍糧盡退兵至參合陂，拓跋珪以二萬精騎兼程雪夜追襲，趁燕軍不備自山上順風衝殺。後燕大軍土崩瓦解，四五萬俘虜被坑殺。慕容垂聞訊抱病親征，行經故戰場見白骨如山哭崩病亡。",
    significance: "參合陂之戰是五胡十六國向北魏南北朝過渡的決定性樞紐戰役，標誌著慕容鮮卑王朝的衰亡與拓跋鮮卑北魏政權的全面鼎興。"
  },
  {
    id: "battle_queyuezhen_417",
    eventId: "evt_queyuezhen_417",
    name: "劉裕卻月陣破魏騎（百艘戰船戰車大破三萬鮮卑鐵騎）",
    year: 417,
    yearDisplay: "西元 417 年",
    eraName: "晉 義熙十三年",
    locationAncient: "黃河洛水之交（河南鞏義黃河南岸）",
    locationModern: "河南省鞏義市康店鎮黃河南岸",
    coordinates: [34.78, 113.02],
    factions: ["southern", "northern"],
    attacker: {
      factionName: "北魏太孫拓跋燾與阿薄干精騎",
      faction: "northern",
      commanders: [
        {
          name: "長孫嵩",
          title: "北魏大將軍 · 翼衛將軍"
        },
        {
          name: "阿薄干",
          title: "北魏南下各部鮮卑騎兵統帥"
        }
      ],
      forcesEstimate: "北魏鮮卑具裝重騎兵 3 萬餘人",
      casualtiesEstimate: "陣斬數千人，主將阿薄干被斬，魏軍全線潰退黃河北"
    },
    defender: {
      factionName: "東晉劉裕北伐水陸舟師前鋒",
      faction: "southern",
      commanders: [
        {
          name: "劉裕",
          title: "宋公 · 東晉相國（遙控調度陣法，南朝第一帝）",
          figureId: "liu_yu_song"
        },
        {
          name: "丁旿",
          title: "劉裕帳下驍將（率百艘戰船運戰車登陸）"
        },
        {
          name: "朱超石",
          title: "東晉寧朔將軍（親統戰車大破魏騎）"
        }
      ],
      forcesEstimate: "登陸精兵 2,700 人、戰車百乘、大弩千張",
      casualtiesEstimate: "傷亡數百人"
    },
    tactics: [
      "劉裕創立『卻月陣』：背臨滔滔黃河水軍大艦，以七乘戰車圍成弧形半月（卻月），弧面向外，兩端深插河水杜絕抄後",
      "以戰車張大幔遮蔽箭矢，每車置二十員壯士，手持大弩長矟，魏軍鐵騎衝擊受阻於車陣被密集強弩射殺",
      "待魏軍近前，朱超石以大鐵錘斷矟三四尺，以十石巨弩急發，一矟輒洞穿魏騎三四人，魏騎膽裂崩潰"
    ],
    victorStatement: "晉軍以二千七百步兵大破北魏三萬鐵騎，斬阿薄干，俘獲無算。",
    strategicOutcome: "擊退北魏對西征軍側翼的重大威脅，劉裕大軍得以長驅直入關中攻克長安、覆滅後秦，建立不可動搖的代晉帝業根基。",
    summary: "劉裕西伐後秦，北魏派三萬精騎屯兵黃河北岸窺伺側翼。劉裕命丁旿率百艘戰船運百乘戰車登上南岸，佈設背水卻月陣。朱超石以大弩重箭急射，復以鐵錘斷矟洞穿魏騎。魏軍死傷慘重潰奔，劉裕水師順利西進收復長安。",
    significance: "卻月陣作戰是中國古代軍事史上以步克騎、水陸協同陣地防禦反擊戰法之巔峰傑作，被歷代兵家奉為兵法神算。"
  },
  {
    id: "battle_zhongli_507",
    eventId: "evt_zhongli_507",
    name: "鐘離之戰（韋睿白袍火攻大破北魏，南北朝長江淮南分界定型戰）",
    year: 507,
    yearDisplay: "西元 507 年",
    eraName: "梁 天監六年 · 北魏 正始四年",
    locationAncient: "鐘離城（淮水南岸，安徽鳳陽臨淮關）",
    locationModern: "安徽省滁州市鳳陽縣臨淮鎮",
    coordinates: [32.88, 117.58],
    factions: ["southern", "northern"],
    attacker: {
      factionName: "南朝梁國救援大軍（水陸火攻）",
      faction: "southern",
      commanders: [
        {
          name: "韋睿",
          title: "豫州刺史（人稱『韋虎』，乘板輿坐鎮淮水）",
          figureId: "wei_rui"
        },
        {
          name: "曹景宗",
          title: "右衛將軍 · 梁軍大都督（勇冠三軍）"
        },
        {
          name: "昌義之",
          title: "鐘離守將（率三千殘兵堅守重創魏軍）"
        }
      ],
      forcesEstimate: "南梁援軍水陸約 10 萬人",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "北魏中山王南征大軍",
      faction: "northern",
      commanders: [
        {
          name: "元英",
          title: "北魏中山王 · 征南將軍"
        },
        {
          name: "楊大眼",
          title: "北魏宿將 · 征虜將軍（人稱關張再世）"
        },
        {
          name: "蕭寶夤",
          title: "齊明帝子投魏將領"
        }
      ],
      forcesEstimate: "北魏精銳步騎號稱百萬，實戰部隊約 20 萬人",
      casualtiesEstimate: "被斬首及溺斃淮水者逾十萬人，被俘五萬人，元英單騎走梁城"
    },
    tactics: [
      "昌義之以三千兵以泥補城缺，死守鐘離城數月，抗擊北魏肉搏梯攻，重挫魏軍士氣",
      "韋睿、曹景宗利用春水暴漲淮水激流，造巨艦與高橋齊高，載膏油草料乘風放火焚燒北魏邵陽洲浮橋",
      "浮橋既斷，魏軍兩岸斷絕大潰，梁軍將士爭先奮擊，魏軍全線溺死淮水"
    ],
    victorStatement: "梁軍大獲全勝，北魏二十萬大軍全軍覆沒，元英、楊大眼僅以身免。",
    strategicOutcome: "徹底遏制了北魏孝文帝遷洛以來的南侵鋒芒，確保了南朝蕭梁長達四十年的江淮承平日久與天監之治。",
    summary: "西元 506 年冬，北魏中山王元英、楊大眼率二十萬大軍圍攻鐘離城，企圖一舉南渡長江滅梁。守將昌義之血戰堅守。西元 507 年春，梁武帝遣豫州刺史韋睿、曹景宗水陸馳援。春水暴漲，韋睿乘風以火船焚燬北魏邵陽浮橋，魏軍斷橋大潰，投水溺斃十餘萬人，斬獲無算。",
    significance: "鐘離之戰是南北朝歷史上規模最大、傷亡最慘烈之水陸攻防會戰，一戰奠定了梁魏南北相持平衡格局。"
  },
  {
    id: "battle_shayan_537",
    eventId: "evt_shayan_537",
    name: "沙苑之戰（宇文泰萬人奇襲大破高歡二十萬，西魏奠基之戰）",
    year: 537,
    yearDisplay: "西元 537 年",
    eraName: "西魏 大統三年 · 東魏 天平四年",
    locationAncient: "沙苑（陝西大荔南，渭河之濱蘆葦盪）",
    locationModern: "陝西省渭南市大荔縣南洛渭交匯處",
    coordinates: [34.75, 109.95],
    factions: ["northern", "northern"],
    attacker: {
      factionName: "西魏宇文泰萬人精銳伏兵",
      faction: "northern",
      commanders: [
        {
          name: "宇文泰",
          title: "西魏大丞相 · 八柱國之首（創立府兵制）",
          figureId: "yuwen_tai"
        },
        {
          name: "李弼",
          title: "西魏八柱國之一（率右軍突入破陣）"
        },
        {
          name: "趙貴",
          title: "西魏八柱國之一"
        },
        {
          name: "于謹",
          title: "西魏大將（定計誘敵入蘆葦叢）"
        }
      ],
      forcesEstimate: "精銳死士步騎不足 1 萬人",
      casualtiesEstimate: "傷亡數百人"
    },
    defender: {
      factionName: "高歡東魏二十萬大軍",
      faction: "northern",
      commanders: [
        {
          name: "高歡",
          title: "東魏大丞相 · 渤海王（神武帝）",
          figureId: "gao_huan"
        },
        {
          name: "高敖曹",
          title: "東魏漢人第一猛將（馬首是瞻）"
        },
        {
          name: "侯景",
          title: "東魏司徒 · 定州刺史（日後引爆梁朝之亂）",
          figureId: "hou_jing"
        }
      ],
      forcesEstimate: "東魏精騎與百保鮮卑兵約 20 萬人",
      casualtiesEstimate: "陣斬及被俘八萬餘人，高歡棄軍騎駝夜遁"
    },
    tactics: [
      "宇文泰以弱示敵，利用沙苑蘆葦深密泥濘之地形，全軍抱戈伏於深草之中，鳴鼓而起全線暴突",
      "李弼率鐵騎由右橫向突貫，攔腰將高歡二十萬綿延大陣截為數段，東魏騎兵陷於蘆葦爛泥無法迴旋",
      "東魏兵驕輕敵各自為戰，西魏將士以一當十，高歡軍自相踐踏大潰不可收拾"
    ],
    victorStatement: "西魏以不到萬人奇襲大破高歡二十萬大軍，俘虜東魏甲士七萬人，繳獲輜重兵甲山積。",
    strategicOutcome: "徹底挽救了新生的西魏關中政權，確立了東西魏與後續北周北齊南北相抗之二元格局，為宇文泰推行府兵制奠定生死底盤。",
    summary: "西元 537 年秋，東魏高歡率二十萬大軍西征長安企圖滅亡西魏。西魏大丞相宇文泰庫無隔宿之糧，毅然率不足萬人於沙苑蘆葦深處設伏。高歡輕敵冒進，西魏軍擂鼓齊起，李弼鐵騎橫衝斷敵。東魏軍大潰，高歡倉皇乘駱駝夜遁，西魏俘兵七萬人。",
    significance: "沙苑之戰是中國中古軍事史上以少勝多之神話戰例，決定了關隴軍事集團的存續，是日後北周滅齊、隋唐一統天下的源頭樞紐。"
  },
  {
    id: "battle_suipingchen_589",
    eventId: "evt_suipingchen_589",
    name: "隋滅陳建康之戰（韓擒虎賀若弼破金陵，四百年南北分裂大一統）",
    year: 589,
    yearDisplay: "西元 588 — 589 年",
    eraName: "隋 開皇八年 — 九年 · 陳 禎明二年 — 三年",
    locationAncient: "採石、牛渚、京口、白土崗、建康（南京朱雀門）",
    locationModern: "江蘇省南京市秦淮區 / 安徽省馬鞍山市採石磯",
    coordinates: [32.06, 118.79],
    factions: ["sui", "southern"],
    attacker: {
      factionName: "大隋滅陳大軍（五十一萬水陸並進）",
      faction: "sui",
      commanders: [
        {
          name: "楊堅 (隋文帝)",
          title: "隋朝開國皇帝（統一南北之聖明君主）",
          figureId: "yang_jian"
        },
        {
          name: "楊廣 (晉王)",
          title: "隋軍行軍元帥（統轄東線）"
        },
        {
          name: "楊素",
          title: "信州道行軍總管（率五牙大艦自長江上游順江狂掃）"
        },
        {
          name: "賀若弼",
          title: "吳州總管（白土崗大破陳軍主力）"
        },
        {
          name: "韓擒虎",
          title: "廬州總管（五百驍騎夜渡長江直搗朱雀門）"
        }
      ],
      forcesEstimate: "大隋水陸八路總兵力 51 萬 8 千人",
      casualtiesEstimate: "傷亡約數千人"
    },
    defender: {
      factionName: "南陳建康衛軍與沿江水軍",
      faction: "southern",
      commanders: [
        {
          name: "陳叔寶 (陳後主)",
          title: "南陳末帝（日夕於景陽宮與張麗華作玉樹後庭花）"
        },
        {
          name: "蕭摩訶",
          title: "南陳驃騎大將軍（白土崗被賀若弼生擒）"
        },
        {
          name: "任忠",
          title: "南陳鎮東大將軍（開朱雀門迎隋軍）"
        }
      ],
      forcesEstimate: "南陳建康禁軍與水陸守兵約 10 萬人",
      casualtiesEstimate: "死傷萬餘人，陳後主攜愛妃張麗華投井被俘，南陳全境歸降"
    },
    tactics: [
      "賀若弼以春季換防演練麻痺陳軍，令陳軍習以為常；冬夜忽出奇兵自廣陵飛渡江北奪京口",
      "韓擒虎率五百精騎自採石磯乘夜偷渡長江，連破新林直插建康，陳將任忠降隋開朱雀門引軍入城",
      "楊素自巴蜀建造大艦五牙戰船數十艘，船高百尺容八百人，順流而下摧枯拉朽全破長江上游陳軍防線"
    ],
    victorStatement: "大隋大軍攻入建康，俘獲陳後主於景陽宮枯井之中，南陳三十州全境平定。",
    strategicOutcome: "徹底終結自三國東吳、東晉、宋、齊、梁、陳六朝近四百年之南北大分裂，中國自西晉永嘉之後重歸天下一統，開啟大隋大唐近四百年之盛世極致。",
    summary: "西元 588 年冬，隋文帝楊堅發兵五十一萬，由晉王楊廣節度八道攻陳。陳後主荒淫自恃長江天塹。賀若弼破白土崗斬殺生擒蕭摩訶，韓擒虎以五百精兵夜渡採石疾馳建康。任忠降隋導引韓擒虎入朱雀門。陳後主與張貴妃藏匿景陽宮井被生擒，南陳滅亡，南北統一。",
    significance: "隋滅陳之役標誌著魏晉南北朝四百年分裂動盪徹底落幕，五胡胡漢民族大交融結出碩果，為中華第二個黃金帝國時代（隋唐盛世）奠定無可撼動的大一統基石。"
  }
];
