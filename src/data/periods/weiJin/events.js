// Historical Events of Wei, Jin, Southern and Northern Dynasties (220 CE - 589 CE)
// With SVG Geographic Marching Routes, Coordinates & Cross-linking
export const WEI_JIN_EVENTS = [
  {
    id: "evt_miewu_280",
    title: "晉滅東吳三國歸晉：王濬樓船破金陵，天下一統太康之治",
    year: 280,
    yearDisplay: "西元 280 年",
    eraName: "晉 咸寧六年 / 太康元年",
    faction: "jin",
    category: "military",
    svgPos: [530, 365],
    summary: "晉武帝司馬炎發兵二十萬六路伐吳，王濬造巨艦樓船自益州順江東下火燒鐵鎖，杜預席捲荊湘如破竹。孫皓面縛出降，三國割據六十年徹底終結，天下大統，開啟太康之治。",
    detail: "《晉書·武帝紀》載：太康元年春，王濬舟師直逼建業石頭城。吳主孫皓窮蹙，銜璧輿櫬詣軍門降。西晉受吳四州四十三郡，三國六十年烽火歸於一尊。司馬炎下詔大赦，罷州郡兵以示偃武修文，全國戶口恢復至一千六百萬。",
    locationNameAncient: "建業 / 洛陽",
    locationNameModern: "江蘇省南京市 / 河南省洛陽市",
    coordinates: [32.06, 118.79],
    figureIds: ["sima_yan", "du_yu", "wang_jun_jin", "yang_hu"],
    tags: ["晉滅吳", "三國歸晉", "王濬樓船", "太康之治"],
    battleId: "battle_mie_wu_280",
    routes: [
      {
        from: "巴蜀（成都）",
        to: "建業（南京）",
        label: "王濬萬里水師順長江東下破吳",
        color: "#eab308",
        dashed: false,
        path: "M 420,380 Q 470,390 530,365"
      }
    ]
  },
  {
    id: "evt_bawang_291",
    title: "賈后亂政引爆八王之亂：西晉宗室骨肉相殘，中原元氣喪盡",
    year: 291,
    yearDisplay: "西元 291 — 306 年",
    eraName: "晉 元康元年 — 光熙元年",
    faction: "jin",
    category: "political",
    svgPos: [495, 328],
    summary: "晉武帝崩，惠帝懦愚『何不食肉糜』，賈南風專權誅殺楊駿、汝南王。隨後趙王司馬倫、齊王、成都王、長沙王、東海王司馬越等八位同姓封王引邊塞胡騎血戰中原十六載，白骨蔽野。",
    detail: "《資治通鑑》載：八王相繼起兵，皆引入匈奴、羯、鮮卑、烏桓各族勁騎自衛。關中、中原百姓死於兵燹飢饉者數百萬，官府戶口殘破，宗室同室操戈達十六年之久，徹底掏空西晉帝國國防實力，為五胡蜂起割據埋下伏筆。",
    locationNameAncient: "洛陽 / 鄴城 / 長安",
    locationNameModern: "河南省洛陽市 / 河北省臨漳縣 / 陝西省西安市",
    coordinates: [34.62, 112.45],
    figureIds: ["sima_zhong", "jia_nanfeng", "sima_yan"],
    tags: ["八王之亂", "何不食肉糜", "賈后專政", "西晉衰亡"],
    routes: []
  },
  {
    id: "evt_liuyuan_304",
    title: "匈奴劉淵起兵建漢趙：五胡十六國三百年大分裂序幕揭開",
    year: 304,
    yearDisplay: "西元 304 年",
    eraName: "漢 元熙元年",
    faction: "sixteen",
    category: "political",
    svgPos: [475, 305],
    summary: "南匈奴五部大都督劉淵以漢朝外甥自居，於并州左國城起兵稱漢王，追尊劉禪，定都平陽。巴蜀李雄亦於成都稱成都王建大成。中原五胡十六國大割據由此全面爆發。",
    detail: "劉淵素通經史，熟讀《左傳》《孫吳兵法》。值八王之亂成都王司馬穎召胡兵，劉淵藉機歸并州聚眾，誓言『夫帝王豈有常哉，大禹出於西羌，文王生於東夷，顧德如何耳！』宣告五胡民族正式爭奪華夏正統帝業。",
    locationNameAncient: "左國城 / 平陽",
    locationNameModern: "山西省呂梁市離石區 / 山西省臨汾市堯都區",
    coordinates: [36.08, 111.51],
    figureIds: ["liu_yuan", "shi_le"],
    tags: ["漢趙立國", "劉淵起兵", "五胡十六國", "胡漢融合"],
    routes: [
      {
        from: "左國城（山西離石）",
        to: "平陽（山西臨汾）",
        label: "劉淵匈奴鐵騎南下立都",
        color: "#a855f7",
        dashed: false,
        path: "M 470,290 Q 475,300 480,310"
      }
    ]
  },
  {
    id: "evt_yongjia_311",
    title: "永嘉之亂洛陽淪陷：西晉覆亡，二帝蒙塵，華夏天地翻覆",
    year: 311,
    yearDisplay: "西元 311 年",
    eraName: "晉 永嘉五年",
    faction: "sixteen",
    category: "military",
    svgPos: [495, 328],
    summary: "漢趙劉曜、石勒大軍合圍洛陽，攻破宣陽門，擄晉懷帝北去，焚燒宮廟太學，屠殺王公士庶三萬餘人。長安隨後亦陷，晉愍帝出降，西晉在北方五十二年統治徹底終結。",
    detail: "《晉書》載：太尉王衍引十萬王公軍眷出走，於苦縣遭石勒騎兵合圍覆滅。石勒嘆王衍清談誤國，以牆壓殺之。隨後劉曜攻陷洛陽，發掘諸陵，焚燬宗廟。華夏中原名門高第蕩然無存，士民流離泣血。",
    locationNameAncient: "洛陽 / 苦縣",
    locationNameModern: "河南省洛陽市 / 河南省鹿邑縣",
    coordinates: [34.62, 112.45],
    figureIds: ["shi_le", "sima_zhong"],
    tags: ["永嘉之禍", "洛陽陷落", "西晉覆亡", "二帝蒙塵"],
    battleId: "battle_luoyang_yongjia_311",
    routes: [
      {
        from: "平陽（山西臨汾）",
        to: "洛陽（河南洛陽）",
        label: "劉曜石勒胡騎南下直搗京師",
        color: "#dc2626",
        dashed: false,
        path: "M 480,310 Q 488,320 495,328"
      }
    ]
  },
  {
    id: "evt_simarui_317",
    title: "衣冠南渡與東晉立國：司馬睿建康登基，『王與馬共天下』",
    year: 317,
    yearDisplay: "西元 317 年",
    eraName: "晉 建武元年 / 大興元年",
    faction: "jin",
    category: "political",
    svgPos: [530, 365],
    summary: "北方陸沉，琅琊王司馬睿在宰相王導『鎮之以靜，群情自安』輔佐下，聯絡江南顧陸高門與北方南渡僑姓，於建康即皇帝位建立東晉，開啟江左百年門閥政治盛世。",
    detail: "司馬睿登基之日，拉王導同升御榻受百官朝拜，時稱『王與馬，共天下』。琅琊王氏、陳郡謝氏、潁川庾氏、譙國桓氏四大僑姓門閥輪流執掌東晉軍政，設立僑州僑郡安置百萬渡江難民，推動江南經濟飛躍開拓。",
    locationNameAncient: "建康（金陵）",
    locationNameModern: "江蘇省南京市玄武區",
    coordinates: [32.06, 118.79],
    figureIds: ["sima_rui", "wang_dao"],
    tags: ["衣冠南渡", "東晉立國", "王與馬共天下", "門閥政治"],
    routes: [
      {
        from: "中原洛陽 / 琅琊臨沂",
        to: "江東建康（南京）",
        label: "北方高門士庶百萬衣冠南渡",
        color: "#22c55e",
        dashed: true,
        path: "M 495,328 Q 515,345 530,365"
      }
    ]
  },
  {
    id: "evt_zuti_beifa_317",
    title: "祖逖聞雞起舞中流擊楫：渡江北伐收復黃河以南失地",
    year: 317,
    yearDisplay: "西元 317 — 321 年",
    eraName: "晉 大興年間",
    faction: "jin",
    category: "military",
    svgPos: [498, 335],
    summary: "名將祖逖率部曲百家自京口渡江，中流擊楫立誓『不能清中原而復濟者，有如大江！』轉戰淮北豫州，奇謀撫輯塢堡，大敗石虎石勒，收復黃河以南全部故土。",
    detail: "祖逖自幼與劉琨聞雞起舞、志在報國。南渡後司馬睿無意北伐，僅授奮威將軍、給千人糧千匹布。祖逖自鑄兵器，連破陳川、桃豹，石勒震怖不敢窺覦河南，修其祖塋修好。後朝廷疑其威望派戴淵牽制，祖逖悲憤成疾卒於雍丘。",
    locationNameAncient: "京口 / 雍丘 / 譙郡",
    locationNameModern: "江蘇省鎮江市 / 河南省杞縣 / 安徽省亳州市",
    coordinates: [34.55, 114.78],
    figureIds: ["zu_ti", "shi_le"],
    tags: ["聞雞起舞", "中流擊楫", "祖逖北伐", "收復河南"],
    battleId: "battle_zuti_beifa_317",
    routes: [
      {
        from: "京口（江蘇鎮江）",
        to: "雍丘（河南杞縣）",
        label: "祖逖中流擊楫渡江北伐進駐雍丘",
        color: "#16a34a",
        dashed: false,
        path: "M 535,360 Q 515,345 498,335"
      }
    ]
  },
  {
    id: "evt_shile_319",
    title: "後趙石勒稱霸北方：奴隸出身之雄傑，兼併前趙一統中原",
    year: 319,
    yearDisplay: "西元 319 — 329 年",
    eraName: "後趙 太和年間",
    faction: "sixteen",
    category: "political",
    svgPos: [505, 295],
    summary: "羯族石勒自幼被掠賣為奴，奮起起兵轉戰千里。西元 319 年自稱趙王建後趙，滅前趙生擒劉曜，平定青齊幽燕，統一黃河流域，創立『胡漢分治』與九品官人。",
    detail: "石勒雖不識字，但雅好文學，常令儒生讀史漢書聽之，論及漢高祖、光武帝見解卓絕。在位期間嚴懲豪強、興辦太學、課農桑、定度量衡，為北方五胡政權中兼具武功與政治手腕之突出君主。",
    locationNameAncient: "襄國 / 鄴城",
    locationNameModern: "河北省邢台市襄都區 / 河北省臨漳縣",
    coordinates: [37.06, 114.50],
    figureIds: ["shi_le"],
    tags: ["後趙立國", "石勒稱霸", "羯族崛起", "北方一統"],
    routes: []
  },
  {
    id: "evt_huanwen_ba_347",
    title: "桓溫西征滅成漢收復巴蜀：東晉拓地萬里，桓氏霸業崛起",
    year: 347,
    yearDisplay: "西元 347 年",
    eraName: "晉 永和三年",
    faction: "jin",
    category: "military",
    svgPos: [420, 380],
    summary: "安西將軍桓溫未經朝廷允准，毅然率萬人水師自江陵沿長江三峽逆流西征。直搗成都城下大破成漢李勢，迫其肉袒出降，成漢滅亡，巴蜀重歸晉室版圖。",
    detail: "《世說新語》載：桓溫西征過三峽，猿鳴三聲淚沾裳。進抵成都城外彭模，前鋒受挫，傳令敲退兵鼓，鼓手誤擊進軍鼓，將士爭先猛攻，反敗為勝。巴蜀收復使東晉掌控長江上游戰略腹地，桓溫進拜征西大將軍，名震朝野。",
    locationNameAncient: "江陵 / 成都",
    locationNameModern: "湖北省荊州市 / 四川省成都市",
    coordinates: [30.67, 104.06],
    figureIds: ["huan_wen"],
    tags: ["桓溫滅蜀", "收復巴蜀", "成漢滅亡", "長江上游"],
    routes: [
      {
        from: "江陵（湖北荊州）",
        to: "成都（四川成都）",
        label: "桓溫溯江而上直搗成都平定成漢",
        color: "#16a34a",
        dashed: false,
        path: "M 490,385 Q 455,390 420,380"
      }
    ]
  },
  {
    id: "evt_lanting_353",
    title: "王羲之會稽山陰蘭亭雅集：《蘭亭集序》天下第一行書千古流芳",
    year: 353,
    yearDisplay: "西元 353 年",
    eraName: "晉 永和九年三月三日",
    faction: "jin",
    category: "cultural",
    svgPos: [545, 385],
    summary: "會稽內史王羲之與謝安、孫綽等四十二位名士雅集於會稽山陰蘭亭，修禊修身，曲水流觴引酒賦詩。王羲之乘醉揮毫寫下《蘭亭集序》，被譽為『天下第一行書』，魏晉風度之極致代表。",
    detail: "『天朗氣清，惠風和暢。仰觀宇宙之大，俯察品類之盛，所以遊目騁懷，足以極視聽之娛，信可樂也。』全篇二十個『之』字無一雷同，遒媚勁健、飄若浮雲、矯若驚龍，將魏晉名士超脫生死哲思與書法美學推向世界文藝巔峰。",
    locationNameAncient: "會稽山陰蘭亭",
    locationNameModern: "浙江省紹興市柯橋區蘭亭風景區",
    coordinates: [29.93, 120.48],
    figureIds: ["wang_xizhi", "xie_an"],
    tags: ["蘭亭集序", "王羲之", "曲水流觴", "魏晉風骨", "天下第一行書"],
    routes: []
  },
  {
    id: "evt_fujian_wangmeng_376",
    title: "苻堅任賢王猛一統北方：修明法度，前秦全盛與前秦南征序幕",
    year: 376,
    yearDisplay: "西元 376 年",
    eraName: "前秦 建元十二年",
    faction: "sixteen",
    category: "political",
    svgPos: [460, 335],
    summary: "前秦天王苻堅登位，破格任用漢人士族王猛為丞相。王猛捫蝨而言嚴明法紀，整肅豪強、興農修學，平前燕、滅前涼、吞代國，前秦混一北方，中原大治。",
    detail: "苻堅視王猛為周之姜尚、漢之孔明，自謂『孤之有寧平，如魚之有水也』。前秦境內五穀豐登、路不拾遺。西元 375 年王猛病危，泣諫苻堅：『晉雖僻陋江南，正朔相承，不可圖也。鮮卑、羌虜我之仇讎，宜漸除之。』苻堅未遵遺訓，引發淝水之災。",
    locationNameAncient: "長安草堂 / 鄴城",
    locationNameModern: "陝西省西安市未央區",
    coordinates: [34.26, 108.94],
    figureIds: ["fu_jian", "wang_meng"],
    tags: ["王猛相秦", "苻堅一統北方", "胡漢融合", "前秦盛世"],
    routes: [
      {
        from: "長安（陝西西安）",
        to: "鄴城（河北臨漳）",
        label: "前秦大軍出關東征滅前燕",
        color: "#a855f7",
        dashed: false,
        path: "M 460,335 Q 480,315 505,305"
      }
    ]
  },
  {
    id: "evt_feishui_383",
    title: "淝水之戰投鞭斷流：謝安謝玄八萬北府兵風聲鶴唳大破前秦",
    year: 383,
    yearDisplay: "西元 383 年",
    eraName: "晉 太元八年",
    faction: "jin",
    category: "military",
    svgPos: [515, 365],
    summary: "前秦苻堅率號稱步騎近百萬大軍南侵，投鞭長江自許斷流。東晉宰相謝安東山對弈處變不驚，謝玄率八萬北府精兵渡淝水出擊，前秦陣勢稍退朱序高呼潰散，風聲鶴唳草木皆兵，前秦瓦解。",
    detail: "《資治通鑑》載：謝玄劉牢之夜襲洛澗斬梁成，苻堅望八公山草木皆以為晉兵。兩軍隔淝水對陣，晉軍請秦軍少退決戰，秦軍倒退引發大踩踏。苻融落馬被殺，前秦各族大軍潰逃千里。捷報至建康，謝安對客圍棋，閱書徐置床上，客問何事，安緩答：『小兒輩遂已破賊。』還室過戶，喜不自勝，木屐齒折而不自知。",
    locationNameAncient: "壽陽 / 淝水 / 八公山",
    locationNameModern: "安徽省淮南市壽縣淝水",
    coordinates: [32.58, 116.78],
    figureIds: ["xie_an", "xie_xuan", "fu_jian", "murong_chui"],
    tags: ["淝水之戰", "投鞭斷流", "草木皆兵", "風聲鶴唳", "北府兵神話"],
    battleId: "battle_feishui_383",
    routes: [
      {
        from: "建康 / 京口",
        to: "壽陽淝水（安徽壽縣）",
        label: "謝玄八萬精銳北府兵西出禦敵",
        color: "#16a34a",
        dashed: false,
        path: "M 535,360 Q 525,362 515,365"
      },
      {
        from: "長安 / 襄陽",
        to: "壽陽八公山",
        label: "苻堅前秦各族號稱百萬鐵騎前鋒",
        color: "#dc2626",
        dashed: false,
        path: "M 460,335 Q 490,350 512,360"
      }
    ]
  },
  {
    id: "evt_tuoba_gui_386",
    title: "拓跋珪盛樂復國建北魏：拓跋鮮卑入主中原，參合陂定鼎霸業",
    year: 386,
    yearDisplay: "西元 386 — 398 年",
    eraName: "北魏 登國元年 — 天興元年",
    faction: "northern",
    category: "political",
    svgPos: [495, 275],
    summary: "淝水戰後前秦解體，拓跋珪在牛川大會部落復代國，尋改國號為魏，定都平陽/平城（大同）。西元 395 年參合陂之戰全殲後燕八萬大軍，入主中原黃河，奠定北魏統治北方基礎。",
    detail: "拓跋珪兼具遊牧與華夏統御手腕，命鮮卑部眾罷黜遊牧解散部落編為民戶，推行農耕制；同時設立百官，建立太學，起用漢人士族崔宏等定製度度量，使拓跋鮮卑迅速由草原部落部落過渡為中央集權封建帝國。",
    locationNameAncient: "盛樂 / 平城（大同）",
    locationNameModern: "內蒙古和林格爾縣 / 山西省大同市平城區",
    coordinates: [40.09, 113.30],
    figureIds: ["tuoba_gui"],
    tags: ["北魏開國", "拓跋珪", "平城定都", "參合陂大捷"],
    battleId: "battle_canhebei_395",
    routes: [
      {
        from: "盛樂（內蒙古和林格爾）",
        to: "平城（山西大同）",
        label: "拓跋珪南下遷都平城經略中原",
        color: "#0284c7",
        dashed: false,
        path: "M 485,250 Q 490,265 495,275"
      }
    ]
  },
  {
    id: "evt_kumarajiva_401",
    title: "鳩摩羅什入長安譯經：大乘佛學中土普及，草堂寺三千義學高僧",
    year: 401,
    yearDisplay: "西元 401 — 413 年",
    eraName: "後秦 弘始三年",
    faction: "other",
    category: "cultural",
    svgPos: [460, 335],
    summary: "西域龜茲高僧鳩摩羅什受後秦文桓帝姚興迎入長安，居草堂寺。羅什精通梵漢，主持翻譯《妙法蓮華經》《維摩詰經》《金剛經》《大智度論》等三億餘字，開創大乘中觀義學巔峰。",
    detail: "鳩摩羅什譯文洗練流暢、韻致天然，擺脫舊日拘泥音譯之晦澀，使印度佛教義理深度契入華夏思想文化。長安草堂寺沙門三千人雲集，僧肇、道生等一代大師受其親炙，成為漢傳佛教大乘各宗派共同認祖之譯經宗師。",
    locationNameAncient: "長安草堂寺 / 涼州",
    locationNameModern: "陝西省西安市戶縣草堂寺",
    coordinates: [34.05, 108.73],
    figureIds: ["kumarajiva"],
    tags: ["鳩摩羅什", "草堂寺", "大乘佛經", "金剛經", "文化交流"],
    routes: [
      {
        from: "涼州（甘肅武威）",
        to: "長安草堂寺（西安）",
        label: "後秦姚興迎鳩摩羅什入長安譯經",
        color: "#6366f1",
        dashed: true,
        path: "M 420,305 Q 440,320 460,335"
      }
    ]
  },
  {
    id: "evt_queyuezhen_417",
    title: "劉裕北伐氣吞萬里如虎：卻月陣破魏騎，攻克洛陽長安收復中原",
    year: 417,
    yearDisplay: "西元 409 — 417 年",
    eraName: "晉 義熙年間",
    faction: "southern",
    category: "military",
    svgPos: [495, 330],
    summary: "東晉權相劉裕兩度大舉北伐，滅南燕生擒慕容超；西征後秦時創『卻月陣』以兩千七百步兵戰車大破三萬北魏鮮卑鐵騎，收復洛陽、長安兩京，金戈鐵馬氣吞萬里如虎。",
    detail: "辛棄疾千古詞讚：『想當年，金戈鐵馬，氣吞萬里如虎。』劉裕出身寒微布衣，自北府兵戎馬起家，百戰百勝。平定孫恩桓玄，滅南燕破後秦，將東晉疆界北拓至黃河天塹，為百年南朝開國立下最赫赫戰功。",
    locationNameAncient: "廣固 / 黃河岸 / 長安",
    locationNameModern: "山東省青州市 / 河南省鞏義市 / 陝西省西安市",
    coordinates: [34.78, 113.02],
    figureIds: ["liu_yu_song"],
    tags: ["劉裕北伐", "卻月陣", "氣吞萬里", "收復兩京"],
    battleId: "battle_queyuezhen_417",
    routes: [
      {
        from: "建康（南京）",
        to: "黃河洛水（河南鞏義）",
        label: "劉裕水陸大軍北伐收復洛陽進軍關中",
        color: "#10b981",
        dashed: false,
        path: "M 530,365 Q 510,340 495,330"
      }
    ]
  },
  {
    id: "evt_liuyu_song_420",
    title: "劉裕代晉建宋南朝揭幕：寒人掌機要，宋齊梁陳文華鼎盛",
    year: 420,
    yearDisplay: "西元 420 年",
    eraName: "宋 永初元年",
    faction: "southern",
    category: "political",
    svgPos: [530, 365],
    summary: "劉裕廢晉恭帝自立，建立劉宋，東晉一百零四年江左政權落幕，南朝宋、齊、梁、陳相繼更迭一百七十年揭開序幕。寒門庶族打破門閥世襲壟斷，江南文教佛寺大興。",
    detail: "宋武帝劉裕即位後厲行整頓：下詔清查戶口推行『土斷』抑制豪強，重用寒人掌管樞要中樞機要，下令禁斷世族私佔山川林澤，減免賦稅輕徭薄賦。隨後其子宋文帝劉義隆在位三十年，開創『元嘉之治』經濟文華高峰。",
    locationNameAncient: "建康（南京）",
    locationNameModern: "江蘇省南京市秦淮區",
    coordinates: [32.06, 118.79],
    figureIds: ["liu_yu_song", "liu_yilong"],
    tags: ["劉裕代晉", "劉宋開國", "南朝開端", "寒人掌機要"],
    routes: []
  },
  {
    id: "evt_xiaowen_qianluo_493",
    title: "北魏孝文帝遷都洛陽漢化改制：斷諸北語胡漢融合，均田制定天下",
    year: 493,
    yearDisplay: "西元 493 — 495 年",
    eraName: "北魏 太和十七年 — 十九年",
    faction: "northern",
    category: "political",
    svgPos: [495, 328],
    summary: "北魏孝文帝拓跋宏借南征為名，力排反對率文武自平城遷都中原故都洛陽。厲行全面漢化：改鮮卑拓跋姓為元氏、禁胡服胡語、推行漢族通婚，頒布均田制與三長制，奠定隋唐盛世制度源頭。",
    detail: "《魏書·高祖紀》載：孝文帝詔令『三十以下在朝廷者，不得復說北語，違者免所居官』。拓跋氏帶頭改姓元氏，與盧、崔、鄭、王漢族四大望族通婚。頒布『均田令』給農民露田桑麻，建立鄉村三長制。胡漢隔閡消弭，中原人口迅速復甦至三千萬。",
    locationNameAncient: "平城（大同） / 洛陽",
    locationNameModern: "山西省大同市 / 河南省洛陽市洛龍區",
    coordinates: [34.62, 112.45],
    figureIds: ["tuoba_hong", "feng_taihou"],
    tags: ["孝文帝遷洛", "太和改制", "均田制", "胡漢融合", "斷諸北語"],
    routes: [
      {
        from: "平城（山西大同）",
        to: "洛陽（河南洛陽）",
        label: "孝文帝率百官軍旅大舉遷都洛陽",
        color: "#0284c7",
        dashed: false,
        path: "M 495,275 Q 492,300 495,328"
      }
    ]
  },
  {
    id: "evt_zhongli_507",
    title: "鐘離之戰韋睿白袍火攻破魏：梁武帝天監之治，南北長江相持",
    year: 507,
    yearDisplay: "西元 507 年",
    eraName: "梁 天監六年",
    faction: "southern",
    category: "military",
    svgPos: [520, 360],
    summary: "北魏中山王元英、楊大眼率二十萬重兵圍攻淮南鐘離城。守將昌義之死守，梁武帝遣豫州刺史韋睿乘板輿督戰，趁春水暴漲以火船焚斷魏軍浮橋，北魏大潰投水溺死十餘萬人。",
    detail: "韋睿素羸弱常乘板輿，臨敵持如意指麾，魏軍憚之呼為『韋虎』。此役梁軍斬獲首級十餘萬，生擒五萬，繳獲資糧山積。北魏自孝文帝以來南擴勢頭遭重挫，蕭衍南梁得以維持長達四十餘年之承平與佛教文化鼎盛繁榮。",
    locationNameAncient: "鐘離（安徽鳳陽臨淮）",
    locationNameModern: "安徽省滁州市鳳陽縣臨淮鎮淮河南岸",
    coordinates: [32.88, 117.58],
    figureIds: ["wei_rui", "xiao_yan"],
    tags: ["鐘離之戰", "韋睿火攻", "南梁大捷", "天監之治"],
    battleId: "battle_zhongli_507",
    routes: [
      {
        from: "合肥淮南",
        to: "鐘離（安徽鳳陽）",
        label: "韋睿曹景宗火攻船隊馳援鐘離破魏",
        color: "#10b981",
        dashed: false,
        path: "M 525,370 Q 522,365 520,360"
      }
    ]
  },
  {
    id: "evt_dongxiwei_534",
    title: "北魏六鎮兵變裂為東西魏：高歡坐鄴城，宇文泰霸關隴創府兵",
    year: 534,
    yearDisplay: "西元 534 — 537 年",
    eraName: "東魏 天平元年 · 西魏 大統元年",
    faction: "northern",
    category: "political",
    svgPos: [480, 320],
    summary: "北魏北部六鎮起義爆發，爾朱榮發動河陰之變屠戮百官。隨後北魏分裂為高歡扶立之東魏（遷都鄴城）與宇文泰擁立之西魏（定都長安）。西魏宇文泰沙苑之戰以萬人破高歡二十萬，創立府兵制。",
    detail: "宇文泰在關隴實行八柱國、十二大將軍體制，將胡漢勇士編為二十四開府府兵，寓兵於農兵農合一。李唐皇室（李虎）、隋朝皇室（楊忠）皆出自八柱國軍事貴族，孕育出左右中華中古歷史之『關隴軍事集團』。",
    locationNameAncient: "鄴城 / 長安 / 沙苑",
    locationNameModern: "河北省臨漳縣 / 陝西省西安市 / 陝西省大荔縣",
    coordinates: [34.75, 109.95],
    figureIds: ["yuwen_tai", "gao_huan", "hou_jing"],
    tags: ["東西魏分裂", "府兵制創立", "八柱國", "關隴集團", "沙苑大捷"],
    battleId: "battle_shayan_537",
    routes: [
      {
        from: "洛陽",
        to: "鄴城（河北臨漳）",
        label: "高歡擁孝靜帝遷都四十萬戶至鄴城建立東魏",
        color: "#0284c7",
        dashed: false,
        path: "M 495,328 Q 500,315 505,305"
      },
      {
        from: "洛陽",
        to: "長安（陝西西安）",
        label: "孝武帝西奔投宇文泰建立西魏",
        color: "#6366f1",
        dashed: false,
        path: "M 495,328 Q 475,330 460,335"
      }
    ]
  },
  {
    id: "evt_houjing_548",
    title: "侯景之亂建康台城淪陷：南朝門閥士族覆滅，陳霸先力挽狂瀾",
    year: 548,
    yearDisplay: "西元 548 — 552 年",
    eraName: "梁 太清二年 — 大寶元年",
    faction: "southern",
    category: "military",
    svgPos: [530, 365],
    summary: "東魏降將侯景反叛引兵渡長江圍攻建康台城。台城陷落，八十六歲梁武帝蕭衍被囚禁於淨居殿活活餓死。三吳繁華膏腴盡毀，王謝南渡頂級門閥世家遭遇滅頂打擊，陳霸先自嶺南起兵平亂代梁建陳。",
    detail: "侯景殘暴縱兵燒殺建康，自稱『宇宙大將軍』。江南士族衣冠流離，朱門世家淪為餓殍，唐代劉禹錫詩云『舊時王謝堂前燕，飛入尋常百姓家』即寫此變。陳霸先擊滅侯景、阻擊北齊南侵，力保江南半壁漢室衣冠，建立南朝陳。",
    locationNameAncient: "建康台城 / 採石",
    locationNameModern: "江蘇省南京市雞鳴寺台城遺跡",
    coordinates: [32.06, 118.79],
    figureIds: ["hou_jing", "xiao_yan", "chen_baxian"],
    tags: ["侯景之亂", "台城陷落", "梁武帝駕崩", "士族衰亡", "陳霸先登基"],
    routes: [
      {
        from: "淮南壽陽",
        to: "建康台城（南京）",
        label: "侯景渡長江圍困台城毀滅三吳世族",
        color: "#dc2626",
        dashed: false,
        path: "M 515,365 Q 522,365 530,365"
      }
    ]
  },
  {
    id: "evt_suipingchen_589",
    title: "隋文帝滅陳南北四百年大一統：金陵破城，中華重歸天下大同",
    year: 589,
    yearDisplay: "西元 589 年",
    eraName: "隋 開皇九年",
    faction: "sui",
    category: "military",
    svgPos: [530, 365],
    summary: "隋文帝楊堅命晉王楊廣、楊素、賀若弼、韓擒虎統率五十一萬水陸大軍南下伐陳。韓擒虎五百騎夜渡採石直搗建康朱雀門，擒陳後主於景陽井，魏晉南北朝四百年分裂歷史徹底終結，隋唐盛世揭幕。",
    detail: "自西元 311 年西晉永嘉之亂洛陽淪陷起，天下歷經五胡十六國、南北朝對峙達二百七十八載。隋文帝修明政事，開創開皇之治，平陳後下詔焚燬建康宮殿平闢為良田，革除南北藩籬。大一統中央集權三省六部與科舉制雛形就此奠定。",
    locationNameAncient: "建康（南京） / 大興城（長安）",
    locationNameModern: "江蘇省南京市秦淮區 / 陝西省西安市",
    coordinates: [32.06, 118.79],
    figureIds: ["yang_jian", "chen_baxian"],
    tags: ["隋滅陳", "四百年大一統", "韓擒虎破城", "隋唐盛世開端"],
    battleId: "battle_suipingchen_589",
    routes: [
      {
        from: "大興城（長安） / 廣陵（揚州）",
        to: "建康（南京朱雀門）",
        label: "隋軍五十一萬八道並進大舉渡江一統天下",
        color: "#f59e0b",
        dashed: false,
        path: "M 460,335 Q 500,345 530,365"
      }
    ]
  }
];
