// Major Historical Battles of Qin-Han Empire (206 BCE - 184 CE)
export const QIN_HAN_BATTLES = [
  {
    id: 'battle_julu_207',
    eventId: 'evt_julu_207',
    name: '鉅鹿之戰（破釜沉舟，滅秦主力）',
    year: -207,
    eraName: '秦 二世三年十二月',
    locationAncient: '鉅鹿郡 鉅鹿城 / 漳水南岸',
    locationModern: '河北省邢台市平鄉縣、巨鹿縣一帶',
    coordinates: [37.21, 115.03],
    svgPos: [535, 270],
    summary: '秦名將章邯、王離統四十萬大軍圍趙王歇於鉅鹿。項羽率楚軍數萬人渡漳水「破釜沉舟，持三日糧」，九戰九捷全殲秦軍主力長城兵團，擊殺蘇角、生擒王離，章邯隨後率二十萬降楚。',
    attacker: {
      factionName: '楚國及反秦諸侯救趙聯軍',
      faction: 'other',
      commanders: [
        { name: '項羽', title: '長安侯、楚軍主帥（破釜沉舟親鋒突陣）', figureId: 'xiang_yu' },
        { name: '英布', title: '當陽君（率數千前鋒截斷秦甬道）', figureId: 'ying_bu' },
        { name: '蒲將軍', title: '楚將（配合作戰擊潰秦兵）' },
        { name: '范增', title: '亞父、楚軍軍師', figureId: 'fan_zeng' }
      ],
      forcesEstimate: '楚軍精兵約 5 萬餘人（諸侯作壁上觀）',
      casualtiesEstimate: '傷亡數千人，以極小代價大獲全勝'
    },
    defender: {
      factionName: '大秦帝國北方主力長城兵團及章邯軍',
      faction: 'other',
      commanders: [
        { name: '章邯', title: '秦名將、雍王（築甬道運糧供應圍城）', figureId: 'zhang_han' },
        { name: '王離', title: '大將軍、武城侯（統長城兵團圍鉅鹿，被俘）' },
        { name: '涉間', title: '秦副將（不降自焚而死）' },
        { name: '蘇角', title: '秦將（陣前戰死）' }
      ],
      forcesEstimate: '長城邊防軍 20 萬 + 章邯驪山降卒刑徒軍 20 萬，合計約 40 萬人',
      casualtiesEstimate: '王離全軍覆沒，死傷十餘萬人，章邯軍二十萬隨後投降'
    },
    victor: 'attacker',
    victorStatement: '項羽九戰破秦軍主力長城軍團，諸侯軍作壁上觀後「膝行而前，莫敢仰視」，項羽自此奠定西楚霸王統帥地位',
    tactics: [
      '破釜沉舟：渡漳水後皆沉船、砸破行軍鐵鍋、燒毀營舍，示以必死無還心',
      '截斷甬道：派英布、蒲將軍率輕兵數次渡河切斷章邯給王離護送糧草之甬道',
      '猛烈穿插中央突破：楚兵呼聲動天以一當十，直插王離指揮大帳擒殺主帥'
    ],
    strategicOutcome: '徹底消滅秦朝最後可戰之中央正規精銳軍隊，秦二世被趙高所逼自盡，秦朝實質宣告滅亡。',
    significance: '中國歷史上破釜沉舟、以少勝多的最著名巔峰會戰之一。'
  },
  {
    id: 'battle_chencang_206',
    eventId: 'evt_chencang_206',
    name: '暗度陳倉之戰（韓信平定三秦還定三輔）',
    year: -206,
    eraName: '漢 漢元年八月',
    locationAncient: '右扶風 陳倉 / 廢丘 / 梁州南鄭',
    locationModern: '陝西省寶雞市陳倉區 / 興平市 / 漢中市',
    coordinates: [34.35, 107.21],
    svgPos: [428, 332],
    summary: '漢王劉邦受封漢中，拜韓信為大將軍。韓信令樊噲佯修已被燒毀的褒斜棧道以吸引章邯防備，主力部隊秘密出其不意沿青泥道陳倉險徑北出秦嶺，一舉擊潰雍王章邯，席捲三秦。',
    attacker: {
      factionName: '漢王劉邦漢中主力大軍',
      faction: 'han',
      commanders: [
        { name: '韓信', title: '漢大將軍（統籌奇謀暗出陳倉故道）', figureId: 'han_xin' },
        { name: '劉邦', title: '漢王（親統大軍還定關中）', figureId: 'liu_bang' },
        { name: '曹參', title: '中涓、漢將（破章邯陳倉主力）' },
        { name: '樊噲', title: '漢將（佯裝修復褒斜道吸引章邯）', figureId: 'fan_kuai' }
      ],
      forcesEstimate: '漢軍入蜀降卒及巴蜀新軍約 8 萬人',
      casualtiesEstimate: '傷亡甚微，以迅雷不及掩耳之勢克城'
    },
    defender: {
      factionName: '三秦封王（雍王章邯、塞王司馬欣、翟王董翳）',
      faction: 'other',
      commanders: [
        { name: '章邯', title: '雍王（防守關中正道，陳倉被突襲潰敗退守廢丘）', figureId: 'zhang_han' },
        { name: '司馬欣', title: '塞王（守櫟陽，望風歸降漢軍）' },
        { name: '董翳', title: '翟王（守高奴，聞風獻城降漢）' }
      ],
      forcesEstimate: '三秦降卒守備部隊約 10 萬餘人',
      casualtiesEstimate: '陳倉戰敗潰散，廢丘被圍引水灌城章邯自拔劍自殺'
    },
    victor: 'attacker',
    victorStatement: '韓信以「明修棧道，暗度陳倉」聲東擊西之奇策奪取關中，為大漢開闢四年楚漢相爭的絕對戰略大後方',
    tactics: [
      '明修棧道：遣數千徒役大張旗鼓修復褒斜棧道，令雍王章邯將主力重兵集結於棧道出口',
      '暗度陳倉：韓信親率漢軍主力由南鄭沿險峻難行的陳倉古道出其不意直搗關中門戶陳倉',
      '水灌廢丘：圍困章邯於廢丘數月不下，漢軍引長安流水灌城徹底破城'
    ],
    strategicOutcome: '劉邦迅速奪取秦地八百里秦川沃土與百萬秦人基層兵源，具備了與西楚霸王項羽逐鹿天下的根基。',
    significance: '「明修棧道，暗度陳倉」成為三十六計中最著名的聲東擊西軍事成語。'
  },
  {
    id: 'battle_pengcheng_205',
    eventId: 'evt_pengcheng_205',
    name: '彭城之戰（項羽三萬鐵騎破漢五十六萬）',
    year: -205,
    eraName: '漢 漢二年四月',
    locationAncient: '西楚 彭城 / 睢水',
    locationModern: '江蘇省徐州市市區及睢寧縣',
    coordinates: [34.26, 117.18],
    svgPos: [552, 345],
    summary: '項羽率軍北伐齊國田榮，漢王劉邦乘虛聯合五路諸侯五十六萬大軍攻陷楚都彭城。項羽聞訊以諸將留圍齊，親點三萬精銳騎兵晨馳南下，乘朝霧突擊彭城西，大破漢軍，溺斃睢水十餘萬。',
    attacker: {
      factionName: '西楚霸王項羽親統三萬精騎',
      faction: 'other',
      commanders: [
        { name: '項羽', title: '西楚霸王（三萬精騎拂曉奇襲）', figureId: 'xiang_yu' },
        { name: '季布', title: '楚將（隨項羽陷陣）' },
        { name: '鍾離眛', title: '楚將（重創漢軍）' }
      ],
      forcesEstimate: '西楚百戰精銳騎兵 3 萬人',
      casualtiesEstimate: '傷亡僅數百人'
    },
    defender: {
      factionName: '漢王劉邦及關東五諸侯反楚聯軍',
      faction: 'han',
      commanders: [
        { name: '劉邦', title: '漢王（全軍潰敗，數十騎狼狽突圍）', figureId: 'liu_bang' },
        { name: '夏侯嬰', title: '漢太僕（御車救劉邦與孝惠、魯元公主）', figureId: 'xiahou_ying' },
        { name: '張良', title: '漢軍師（助劉邦定下邑之謀）', figureId: 'zhang_liang' },
        { name: '陳平', title: '漢謀士（乘亂隨劉邦西退）', figureId: 'chen_ping' }
      ],
      forcesEstimate: '五路諸侯聯軍合計 56 萬人',
      casualtiesEstimate: '死傷十餘萬人，十餘萬人退入睢水溺死，「睢水為之不流」'
    },
    victor: 'attacker',
    victorStatement: '項羽創造了古代長途騎兵突襲戰的最高奇蹟，以三萬騎破敵五十六萬，反漢諸侯隨後再度反叛歸降西楚',
    tactics: [
      '輕裝急馳：項羽不以全軍回援，而是親挑三萬精銳騎兵日夜兼程避開正面直撲彭城西翼',
      '乘霧拂曉突擊：拂曉趁晨霧朝暾向正在沉溺酒色慶功的漢軍發起雷霆萬鈞的閃電衝擊',
      '心理崩潰互踩：漢軍龐大而各懷異心，前部受創後潰兵自相踐踏互相推擠墮入睢水'
    ],
    strategicOutcome: '劉邦聯軍瓦解，父母妻子皆落入楚軍之手，劉邦退保滎陽、成皋一線轉入防禦相持。',
    significance: '古代冷兵器戰爭中以少勝多、騎兵大縱深閃電奔襲的千古經典範例。'
  },
  {
    id: 'battle_jingxing_204',
    eventId: 'evt_beishui_204',
    name: '井陘之戰（韓信背水一戰，拔旗易幟破趙）',
    year: -204,
    eraName: '漢 漢三年十月',
    locationAncient: '常山郡 井陘口 / 綿蔓水畔',
    locationModern: '河北省石家莊市井陘縣微水鎮',
    coordinates: [38.03, 114.14],
    svgPos: [520, 280],
    summary: '韓信、張耳率數萬漢軍東出井陘口伐趙。趙統帥陳餘拒聽李左車扼守險道斷糧之謀，以二十萬大軍依山阻擊。韓信置陣於綿蔓水畔「置之死地而後生」，遣兩千紅旗輕騎奇襲趙營拔旗易幟，大破趙軍。',
    attacker: {
      factionName: '漢軍北伐大軍',
      faction: 'han',
      commanders: [
        { name: '韓信', title: '左丞相、大將軍（背水列陣、置之死地而後生）', figureId: 'han_xin' },
        { name: '張耳', title: '漢將（故常山王，協同指揮）', figureId: 'zhang_er' }
      ],
      forcesEstimate: '漢軍新募步騎約 3 萬至 4 萬人',
      casualtiesEstimate: '傷亡數千人'
    },
    defender: {
      factionName: '趙王歇與成安君陳餘趙國二十萬大軍',
      faction: 'other',
      commanders: [
        { name: '陳餘', title: '成安君、趙軍統帥（拒採李左車計，泜水陣亡）', figureId: 'chen_yu' },
        { name: '趙歇', title: '趙王（逃奔襄國被漢軍追擒）' },
        { name: '李左車', title: '廣武君（獻截糧妙計未被採納，戰後為韓信師）', figureId: 'li_zuoche' }
      ],
      forcesEstimate: '趙國號稱 20 萬重兵',
      casualtiesEstimate: '全軍崩潰，陣斬陳餘、生擒趙歇，斬首俘虜數萬人'
    },
    victor: 'attacker',
    victorStatement: '韓信「陷之死地而後生，置之亡地而後存」，一戰滅趙降燕，開闢平定黃河以北的宏大戰略走廊',
    tactics: [
      '含肉出關：半夜傳令每人含肉乾一塊，約定「今日破趙會食」激勵鬥志',
      '背水列陣：將主力置於背倚綿蔓水的絕境，漢軍無路可退人人殊死奮勇以一當十',
      '紅旗易幟：預伏兩千輕騎攜漢赤旗，趁趙軍空巢追擊傾巢而出之時，疾馳奪取趙大營插滿漢旗'
    ],
    strategicOutcome: '韓信徹底底定太行山以東趙國全境，傳檄平定燕國，為漢軍合圍項羽奠立北方包抄重圍。',
    significance: '「背水一戰」與「拔旗易幟」成為流傳千古之兵法典範，韓信被兵家尊為兵仙神算。'
  },
  {
    id: 'battle_gaixia_202',
    eventId: 'evt_gaixia_202',
    name: '垓下之戰（十面埋伏，四面楚歌霸王自刎）',
    year: -202,
    eraName: '漢 漢五年十二月',
    locationAncient: '沛郡 垓下城 / 和州烏江浦',
    locationModern: '安徽省宿州市靈璧縣濠城鎮 / 馬鞍山市和縣烏江鎮',
    coordinates: [33.45, 117.58],
    svgPos: [538, 355],
    summary: '楚漢相爭終極決戰。劉邦會合韓信、彭越、英布等四十萬聯軍將十萬楚軍重重合圍於垓下。韓信五軍陣法配合十面埋伏擊破項羽前鋒，漢軍夜唱楚歌瓦解楚人士氣，項羽率八百騎突圍至烏江拔劍自刎。',
    attacker: {
      factionName: '大漢及諸侯反楚四十萬同盟大軍',
      faction: 'han',
      commanders: [
        { name: '韓信', title: '齊王、漢軍前敵統帥（布設十面埋伏與五軍陣法）', figureId: 'han_xin' },
        { name: '劉邦', title: '漢王（親統中軍督戰）', figureId: 'liu_bang' },
        { name: '彭越', title: '魏相國（率部切斷楚軍糧道）', figureId: 'peng_yue' },
        { name: '英布', title: '淮南王（率淮南軍合擊楚軍南面）', figureId: 'ying_bu' },
        { name: '張良', title: '軍師（籌劃夜唱楚歌心戰策略）', figureId: 'zhang_liang' }
      ],
      forcesEstimate: '漢諸侯聯軍合計約 40 萬人',
      casualtiesEstimate: '傷亡約萬餘人'
    },
    defender: {
      factionName: '西楚霸王項羽楚國十萬疲憊疲卒',
      faction: 'other',
      commanders: [
        { name: '項羽', title: '西楚霸王（十面圍困，烏江自刎）', figureId: 'xiang_yu' },
        { name: '虞姬', title: '楚霸王愛妾（營帳中和垓下歌自刎殉情）', figureId: 'yu_ji' },
        { name: '鍾離眛', title: '楚將（突圍逃奔陳地）' }
      ],
      forcesEstimate: '楚軍兵少食盡約 10 萬人',
      casualtiesEstimate: '十萬楚軍全滅，項羽率八百騎突圍至烏江僅剩二十八騎，項羽自刎'
    },
    victor: 'attacker',
    victorStatement: '韓信指揮十面埋伏大獲全勝，徹底粉碎西楚政權，大漢王朝四百年江山由此奠立',
    tactics: [
      '五軍層層截擊：韓信親統中軍進擊受挫後主動後撤，左右兩翼孔聚陳賀及劉邦中軍合圍絞殺',
      '四面楚歌心戰：利用楚人士卒思鄉之情，令降楚漢卒圍營高唱楚地民歌瓦解楚軍戰志',
      '圍三闕一奔襲圍捕：灌嬰率五千精騎窮追不捨，將項羽二十八騎逼迫至烏江斷絕退路'
    ],
    strategicOutcome: '四年楚漢相爭宣告結束，漢王劉邦隨後於氾水之陽登基稱帝，建立漢朝。',
    significance: '改寫中國歷史走向的最偉大決戰之一，誕生了「霸王別姬」、「十面埋伏」、「四面楚歌」等千古傳奇。'
  },
  {
    id: 'battle_baideng_200',
    eventId: 'evt_baideng_200',
    name: '白登之圍（冒頓圍高祖於白登山）',
    year: -200,
    eraName: '漢 高祖七年冬',
    locationAncient: '雁門郡 平城白登山',
    locationModern: '山西省大同市東北白登山（馬鋪山）',
    coordinates: [40.15, 113.38],
    svgPos: [515, 225],
    summary: '韓王信叛降匈奴，漢高祖劉邦親率三十二萬大軍北征。冒頓單于故意匿精銳示弱，以四十萬精騎將劉邦先頭部隊誘入平城，圍困於白登山七日七夜。陳平施秘計厚賂單于閼氏，匈奴開圍劉邦脫險。',
    attacker: {
      factionName: '大匈奴帝國冒頓單于四十萬騎兵兵團',
      faction: 'other',
      commanders: [
        { name: '冒頓單于', title: '匈奴單于（分四色騎四十萬合圍白登山）', figureId: 'modun_chanyu' },
        { name: '韓王信', title: '降匈叛將（引匈奴兵入寇太原）' }
      ],
      forcesEstimate: '匈奴控弦之士精騎 40 萬人',
      casualtiesEstimate: '圍困七日未曾總攻，戰後主動撤圍解困'
    },
    defender: {
      factionName: '漢高祖親統大漢北征先鋒軍',
      faction: 'han',
      commanders: [
        { name: '劉邦', title: '漢高帝（親臨第一線被圍白登山）', figureId: 'liu_bang' },
        { name: '陳平', title: '護軍中尉（獻秘計遣使厚賂閼氏化解重圍）', figureId: 'chen_ping' },
        { name: '樊噲', title: '左丞相（率步兵大軍隨後馳援）', figureId: 'fan_kuai' },
        { name: '周勃', title: '將軍（率後續主力推進救援）', figureId: 'zhou_bo' }
      ],
      forcesEstimate: '被圍先頭部隊約 5 萬至 8 萬人（主力步兵滯後未及時趕到）',
      casualtiesEstimate: '嚴寒凍墮手指者十之二三，士卒飢困'
    },
    victor: 'defender',
    victorStatement: '漢高祖靠陳平奇計脫困突出重圍，匈奴解圍北撤，漢廷認識到暫無法以武力滅匈',
    tactics: [
      '誘敵深入：匈奴留老弱殘兵與羸瘦牲畜示弱，誘使漢高祖不顧婁敬勸阻輕敵孤軍深入',
      '四色騎環形圍困：冒頓以白馬騎居西、青馬騎居東、黑馬騎居北、赤馬騎居南合圍白登七晝夜',
      '夫人外交秘計：陳平使者夜遁攜重金寶物入胡營私說閼氏，閼氏說單于「兩主不相困」'
    ],
    strategicOutcome: '奠定了漢初六十餘年「與民休息、休養生息、奉行和親」的最高對外基本國策。',
    significance: '漢匈百年爭霸的起點，使西漢統治層冷靜轉向厚積薄發的國力積累期。'
  },
  {
    id: 'battle_qiguo_154',
    eventId: 'evt_qiguo_154',
    name: '七國之亂·昌邑與睢陽保衛戰',
    year: -154,
    eraName: '漢 景帝前元三年春',
    locationAncient: '梁國 睢陽 / 山陽郡昌邑',
    locationModern: '河南省商丘市睢陽區 / 山東省巨野縣昌邑集',
    coordinates: [34.38, 115.65],
    svgPos: [535, 332],
    summary: '漢景帝採晁錯《削藩策》，吳王劉濞聯合楚等七國起兵五十萬反叛「清君側」。梁王劉武死守睢陽牽制叛軍主力；太尉周亞夫屯軍昌邑深溝高壘，遣輕騎斷敵糧道，三個月平定七國。',
    attacker: {
      factionName: '太尉周亞夫漢廷中央平叛大軍',
      faction: 'han',
      commanders: [
        { name: '周亞夫', title: '太尉、平叛統帥（深溝高壘屯昌邑，堅壁不出斷糧道）', figureId: 'zhou_yafu' },
        { name: '劉武', title: '梁孝王（率梁國精兵死守睢陽擋住叛軍正面）', figureId: 'liu_wu_liang' },
        { name: '竇嬰', title: '大將軍（守滎陽監管齊趙叛軍）' }
      ],
      forcesEstimate: '漢中央軍約 10 萬 + 梁國守軍約 5 萬',
      casualtiesEstimate: '陣亡數千人，以極低代價瓦解叛軍'
    },
    defender: {
      factionName: '吳楚趙膠西膠東菑川濟南七國諸侯聯軍',
      faction: 'other',
      commanders: [
        { name: '劉濞', title: '吳王、叛軍盟主（煮鹽鑄錢稱霸東南，敗逃被刺）', figureId: 'liu_bi' },
        { name: '劉戊', title: '楚王（兵敗自盡）' },
        { name: '田祿伯', title: '吳將（建議別將攻淮水未被採納）' }
      ],
      forcesEstimate: '七國合兵號稱 50 萬大軍',
      casualtiesEstimate: '吳楚軍大飢潰散互踩，被俘投降數十萬人，劉濞身死國除'
    },
    victor: 'attacker',
    victorStatement: '周亞夫指揮若定，三個月徹底掃滅七國五十萬叛軍，諸侯封國軍政特權被全數剝奪',
    tactics: [
      '以梁抗吳：任由梁王堅守睢陽牽制吳楚主力鋒芒，周亞夫抗旨不救梁，確保中央戰略主動',
      '斷敵糧道：遣弓高侯韓頹當率輕騎襲擊截斷吳楚軍後方糧草輜重通道',
      '聲東擊西防禦：叛軍奔襲昌邑東南營，周亞夫早令備戰西北營，敵果然轉攻西北自投羅網'
    ],
    strategicOutcome: '漢景帝廢除諸侯王治民與發兵大權，郡縣制全面取代封建分封，中央集權得到決定性加強。',
    significance: '西漢歷史上中央政權挫敗地方分裂割據的最大勝利。'
  },
  {
    id: 'battle_hexi_121',
    eventId: 'evt_hexi_121',
    name: '河西之戰（霍去病千里破匈奴，收復河西走廊）',
    year: -121,
    eraName: '漢 武帝元狩二年春至夏',
    locationAncient: '河西走廊 焉支山 / 祁連山 / 居延澤',
    locationModern: '甘肅省張掖市山丹縣、武威市、酒泉市一帶',
    coordinates: [38.93, 100.45],
    svgPos: [315, 260],
    summary: '十九歲驃騎將軍霍去病率萬騎六天轉戰千餘里過焉支山，斬匈奴盧屠王，奪休屠王祭天金人；同年夏再次深入祁連山合圍匈奴，降渾邪王四萬部眾，全線收復河西走廊，設河西四郡。',
    attacker: {
      factionName: '大漢帝國驃騎將軍北征精騎兵團',
      faction: 'han',
      commanders: [
        { name: '霍去病', title: '驃騎將軍（十九歲統萬騎閃擊河西，大破二王）', figureId: 'huo_qubing' },
        { name: '公孫敖', title: '合騎侯（夏役迷失道路被免官）', figureId: 'gongsun_ao' }
      ],
      forcesEstimate: '春役精騎 1 萬，夏役精騎 1 萬餘人',
      casualtiesEstimate: '輕傷數百人，以奔襲戰損極低大勝'
    },
    defender: {
      factionName: '匈奴休屠王、渾邪王、折蘭王諸部',
      faction: 'other',
      commanders: [
        { name: '渾邪王', title: '匈奴渾邪王（大敗後殺休屠王率四萬眾降漢）', figureId: 'hunye_wang' },
        { name: '休屠王', title: '匈奴休屠王（祭天金人被奪，後被渾邪王斬殺）', figureId: 'xiutu_wang' },
        { name: '折蘭王', title: '匈奴名王（陣亡）' },
        { name: '盧屠王', title: '匈奴名王（陣亡）' }
      ],
      forcesEstimate: '匈奴駐守河西各部騎兵約 8 萬至 10 萬人',
      casualtiesEstimate: '前後被斬首及俘虜三萬餘級，降漢部眾四萬餘人'
    },
    victor: 'attacker',
    victorStatement: '霍去病單騎平定渾邪王叛變，匈奴西退，漢武帝設立武威、張掖、酒泉、敦煌河西四郡',
    tactics: [
      '超遠距離大縱深閃擊：千里奔襲過焉支山，利用匈奴散布放牧無防備特性逐個擊破',
      '大迂迴背側包抄：夏役出隴西涉居延澤，繞道祁連山西南實施大縱深包圍',
      '膽略懾敵平嘩變：渾邪王部眾臨降生變，霍去病單騎馳入敵營立斬八千作亂者平定亂局'
    ],
    strategicOutcome: '「斷匈奴右臂，張中國之掖」，徹底切斷匈奴與西羌之聯絡，開闢通往西域的陸上咽喉要道。',
    significance: '匈奴悲歌「失我祁連山，使我六畜不蕃息」，霍去病戰神威名揚名千古。'
  },
  {
    id: 'battle_mobei_119',
    eventId: 'evt_mobei_119',
    name: '漠北決戰（衛青武剛車陣，霍去病封狼居胥）',
    year: -119,
    eraName: '漢 武帝元狩四年春',
    locationAncient: '漠北 狼居胥山 / 趙信城 / 瀚海（貝加爾湖）',
    locationModern: '蒙古國烏蘭巴托以東肯特山脈 / 貝加爾湖',
    coordinates: [48.0, 108.0],
    svgPos: [440, 160],
    summary: '漢武帝發動傾國之漠北決戰。衛青、霍去病各率五萬精騎、步卒數十萬深入瀚海千里尋殲單于主力。衛青以武剛車環結成陣抗擊伊稚斜單于，霍去病斬捕七萬餘級，封狼居胥、登臨瀚海。',
    attacker: {
      factionName: '大漢帝國傾國遠征大軍',
      faction: 'han',
      commanders: [
        { name: '衛青', title: '大將軍（結武剛車陣大破伊稚斜單于主力，焚趙信城）', figureId: 'wei_qing' },
        { name: '霍去病', title: '驃騎將軍（斬首俘虜七萬餘級，封狼居胥登瀚海）', figureId: 'huo_qubing' },
        { name: '李廣', title: '前將軍、飛將軍（迷失道引刀自刎）', figureId: 'li_guang' },
        { name: '公孫賀', title: '左將軍（深入千里無所獲）' }
      ],
      forcesEstimate: '精銳騎兵 10 萬 + 步兵輜重數十萬人，戰馬十四萬匹',
      casualtiesEstimate: '漢軍陣亡兩萬餘人，十四萬戰馬還塞者僅不滿三萬匹'
    },
    defender: {
      factionName: '匈奴伊稚斜單于主力及左賢王部兵團',
      faction: 'other',
      commanders: [
        { name: '伊稚斜單于', title: '匈奴最高單于（乘六騾遁走，單于廷覆滅）', figureId: 'yizhi_xie_chanyu' },
        { name: '左賢王', title: '匈奴左賢王（遭霍去病大軍徹底擊滅）' },
        { name: '趙信', title: '匈奴謀士、故漢降將（築趙信城存糧，被衛青全焚）' }
      ],
      forcesEstimate: '匈奴騎兵主力部隊約 15 萬至 20 萬人',
      casualtiesEstimate: '斬捕首虜八萬餘級，左賢王部主力幾近全滅，單于大軍崩解'
    },
    victor: 'attacker',
    victorStatement: '「漠南無王廷，匈奴遠遁」，西漢徹底摧毀了匈奴自秦以來稱霸北方草原的主力帝國體系',
    tactics: [
      '武剛車環營固守：衛青與單于突發遭遇，立即命令沉重的武剛戰車環結成防禦圓形車壘阻擋騎射',
      '大風揚沙兩翼包抄：乘狂風大作飛沙撲面之機，衛青迅速出動左右兩翼五千騎兵完成鐵壁合圍',
      '輕裝急馳萬里追亡：霍去病棄輜重取食於敵，奔襲兩千餘里橫掃漠北直登狼居胥山設壇祭天'
    ],
    strategicOutcome: '匈奴主力北徙漠北更遠苦寒之地，北方長城邊疆自此數十年免除大規模游牧騎兵入寇。',
    significance: '「封狼居胥」成為中國歷史上武將統帥立功邊陲的至高榮譽象徵。'
  },
  {
    id: 'battle_chentang_36',
    eventId: 'evt_chentang_36',
    name: '郅支城之戰（陳湯誅滅郅支單于）',
    year: -36,
    eraName: '漢 元帝建昭三年冬',
    locationAncient: '康居國 郅支城（都賴水畔）',
    locationModern: '哈薩克斯坦江布爾州塔拉茲（江布爾城一帶）',
    coordinates: [42.9, 71.36],
    svgPos: [190, 210],
    summary: '北匈奴郅支單于西遷康居稱霸中亞並殺漢使。副校尉陳湯矯制發西域十五國四萬聯軍，翻越蔥嶺遠征三千餘里圍攻康居郅支城，以強弩破重盾木城，斬殺郅支單于，立下千古功名。',
    attacker: {
      factionName: '漢西域都護與西域諸國四萬胡漢聯軍',
      faction: 'han',
      commanders: [
        { name: '陳湯', title: '西域副校尉（假託朝命出師，破城斬單于）', figureId: 'chen_tang' },
        { name: '甘延壽', title: '西域都護（受陳湯激勵同領大軍遠征）', figureId: 'gan_yanshou' }
      ],
      forcesEstimate: '西域漢軍及西域十五國聯軍 4 萬人',
      casualtiesEstimate: '攻城戰陣亡數百人'
    },
    defender: {
      factionName: '北匈奴郅支單于部眾及康居守軍',
      faction: 'other',
      commanders: [
        { name: '郅支單于', title: '北匈奴單于（負隅頑抗中箭身亡，被斬首傳送長安）', figureId: 'zhizhi_chanyu' }
      ],
      forcesEstimate: '匈奴精銳騎兵與康居守軍約 1 萬至 2 萬人',
      casualtiesEstimate: '斬單于閼氏名王以下 1518 級，生俘 145 人，投降千餘人'
    },
    victor: 'attacker',
    victorStatement: '陳湯攻陷郅支城斬殺北匈奴首領，飛報朝廷：「宜懸頭槀街，以示萬里，明犯強漢者，雖遠必誅！」',
    tactics: [
      '矯制發兵先斬後奏：見郅支日漸坐大，若報請長安必經公卿爭辯延誤戰機，斷然矯制興兵',
      '步盾弩箭協同攻城：前列步兵執長盾護衛，後列強弩密射城頭守軍，發巨木火燒三重外木城',
      '分化康居援兵：派出重甲步兵設陣擊退康居騎兵外圍救援，專心聚殲城內單于中軍'
    ],
    strategicOutcome: '北匈奴西部分支徹底消亡，西域三十六國完全臣服大漢，天山南北重現數十年和平繁榮。',
    significance: '「明犯強漢者，雖遠必誅」成為大漢王朝最鏗鏘有力的千古強音。'
  },
  {
    id: 'battle_kunyang_23',
    eventId: 'evt_kunyang_23',
    name: '昆陽之戰（劉秀三千破四十二萬新莽大軍）',
    year: 23,
    eraName: '新 地皇四年 / 漢 更始元年六月',
    locationAncient: '潁川郡 昆陽城 / 滎水',
    locationModern: '河南省平頂山市葉縣城區',
    coordinates: [33.62, 113.35],
    svgPos: [505, 355],
    summary: '王莽發大司徒王尋、大司空王邑四十二萬大軍、驅虎豹猛獸圍攻昆陽孤城。偏將軍劉秀十三騎夜突圍調集三千勇士回援，親統敢死隊手斬數十敵直搗敵中軍，狂風暴雨莽軍自相踐踏大潰。',
    attacker: {
      factionName: '漢光武帝劉秀親統三千敢死精銳馳援軍',
      faction: 'han',
      commanders: [
        { name: '劉秀', title: '太常偏將軍（十三騎突圍，統三千死士直搗敵中央指揮所）', figureId: 'liu_xiu' },
        { name: '王霸', title: '漢將（隨劉秀死戰陷陣）', figureId: 'wang_ba' },
        { name: '王鳳', title: '更始大將軍（城內堅守待援）' }
      ],
      forcesEstimate: '昆陽城內守軍約 8000 人，劉秀外援精兵僅 3000 人',
      casualtiesEstimate: '傷亡數百人，以微弱代價取得不可思議之全勝'
    },
    defender: {
      factionName: '王莽新朝四十二萬平叛主力部隊',
      faction: 'other',
      commanders: [
        { name: '王邑', title: '新莽大司空（大軍總帥，慘敗後僅隨數千騎逃回洛陽）', figureId: 'wang_yi_xin' },
        { name: '王尋', title: '新莽大司徒（陣中被劉秀敢死隊合圍斬殺）', figureId: 'wang_xun' },
        { name: '巨毋霸', title: '巨人將軍（督率虎豹犀牛大象巨獸陣）' }
      ],
      forcesEstimate: '新莽朝廷主力 42 萬人，營壘百餘座',
      casualtiesEstimate: '大司徒王尋陣亡，士卒溺死滎水者萬數，四十萬大軍徹底潰散'
    },
    victor: 'attacker',
    victorStatement: '劉秀以三千死士創造了中國古代軍事史上的最大神話，新朝主力覆滅，王莽政權隨後崩潰',
    tactics: [
      '敢死突刺斬首中軍：劉秀率三千步騎由城西直接猛撲王尋、王邑帥旗所在，令敵軍不知虛實不敢救援',
      '內外夾攻中心開花：城內守軍見劉秀破敵，大呼殺出，昆陽城內外漢軍四面呼喊聲震百里',
      '天候神助借勢借風：正交戰時大風驟起屋瓦齊飛，雷雨暴注，滎水暴漲，莽軍虎豹震恐反噬自踩'
    ],
    strategicOutcome: '王莽新朝的最後軍事支柱徹底倒塌，同年九月綠林軍攻入長安斬殺王莽，新朝覆滅。',
    significance: '光武帝劉秀名揚天下的封神之役，中國古代以少勝多戰爭藝術的至高範本。'
  },
  {
    id: 'battle_chengdu_36',
    eventId: 'evt_guangwu_unify_36',
    name: '成都之戰（吳漢滅公孫述，東漢一統天下）',
    year: 36,
    eraName: '東漢 光武帝建武十二年十一月',
    locationAncient: '益州 蜀郡成都 / 廣都',
    locationModern: '四川省成都市城區及雙流區',
    coordinates: [30.658, 104.065],
    svgPos: [372, 402],
    summary: '光武帝遣大司馬吳漢、岑彭造大艦由荊州溯長江入蜀。岑彭遭刺後，吳漢進圍成都，公孫述率延岑等傾巢出城背水殊死反撲。吳漢以精騎誘敵設伏，公孫述中槊戰死，成都城降，海內重歸一統。',
    attacker: {
      factionName: '大漢大司馬吳漢征蜀水陸大軍',
      faction: 'han',
      commanders: [
        { name: '吳漢', title: '大司馬、廣平侯（率漢軍長驅入蜀，破成都斬公孫述）', figureId: 'wu_han' },
        { name: '岑彭', title: '征南大將軍（造大艦拔江關破白帝，惜遇刺殉國）', figureId: 'cen_peng' },
        { name: '劉尚', title: '偏將軍（出奇兵大破公孫述外圍主力）' }
      ],
      forcesEstimate: '漢水陸南征軍約 6 萬至 8 萬人',
      casualtiesEstimate: '漢軍傷亡數千人'
    },
    defender: {
      factionName: '成家皇帝公孫述及延岑十二載巴蜀守軍',
      faction: 'other',
      commanders: [
        { name: '公孫述', title: '成家白帝、割據蜀地十二年（親自披甲出戰被刺落馬身亡）', figureId: 'gongsun_shu' },
        { name: '延岑', title: '成家大司馬（成都城破降漢，後被誅）' }
      ],
      forcesEstimate: '成家蜀軍精銳約 10 萬人',
      casualtiesEstimate: '公孫述陣亡，全軍開城投降，成家政權覆亡'
    },
    victor: 'attacker',
    victorStatement: '吳漢平定最後的割據勢力蜀中成家，東漢至此徹底平定海內，實現天下一統',
    tactics: [
      '水陸並進長江突破：岑彭先拔荊門、直下白帝城江關天險，突破三峽長江防線',
      '引敵深入合圍伏擊：吳漢在成都城外故意分營示弱，引誘公孫述出城夾擊，埋伏精騎攔腰截斷',
      '擊殺主帥瓦解守志：漢將高午飛槊刺中公孫述胸膛，公孫述當夜氣絕，城中軍心頃刻瓦解'
    ],
    strategicOutcome: '王莽篡漢以來的三十年全國群雄割據混戰徹底終結，開啟政通人和的「光武中興」治世。',
    significance: '標誌著東漢王朝正式完成全國統一，奠定後續兩百年的安定繁榮。'
  },
  {
    id: 'battle_yanran_89',
    eventId: 'evt_yanran_89',
    name: '稽落山與燕然山之戰（竇憲勒石燕然，覆滅北匈奴）',
    year: 89,
    eraName: '東漢 和帝永元元年夏六月',
    locationAncient: '漠北 稽落山 / 燕然山（杭愛山）',
    locationModern: '蒙古國中戈壁省杭愛山脈',
    coordinates: [45.18, 104.55],
    svgPos: [430, 160],
    summary: '東漢車騎將軍竇憲率執金吾耿秉等，發漢軍及南匈奴、羌胡八萬精騎三路出塞北伐。於稽落山大破北匈奴單于主力，斬捕萬餘級、降者二十餘萬人。竇憲登燕然山，命班固刻石銘記漢威。',
    attacker: {
      factionName: '大漢及南匈奴八萬北伐騎兵聯軍',
      faction: 'han',
      commanders: [
        { name: '竇憲', title: '車騎將軍、北伐統帥（稽落山大捷，燕然勒石功成）', figureId: 'dou_xian' },
        { name: '耿秉', title: '執金吾（勇冠全軍，出朔方與竇憲會師）', figureId: 'geng_bing' },
        { name: '班固', title: '中護軍、史學家（撰寫《封燕然山銘》摩崖石刻）', figureId: 'ban_gu' }
      ],
      forcesEstimate: '漢騎四千 + 南匈奴及羌胡精騎八萬人',
      casualtiesEstimate: '漢匈聯軍傷亡約數百人'
    },
    defender: {
      factionName: '北匈奴單于部眾及部族聯軍',
      faction: 'other',
      commanders: [
        { name: '北單于', title: '北匈奴單于（稽落山負傷潰逃，部眾崩散）' }
      ],
      forcesEstimate: '北匈奴精騎約 6 萬至 8 萬人',
      casualtiesEstimate: '斬名王以下 13000 餘級，獲生口牛馬百萬頭，八十一部二十餘萬人歸降'
    },
    victor: 'attacker',
    victorStatement: '竇憲大破北匈奴，登燕然山作銘刻石勒功，北匈奴在蒙古高原徹底除名消亡',
    tactics: [
      '三路多點合圍深入：大軍分別出朔方、雞鹿塞、滿夷谷，長驅三千餘里在涿邪山精準會師',
      '騎兵大兵團穿插衝鋒：稽落山遭遇戰中以重裝鐵騎撕裂敵陣，使北單于無法組織有效抵抗',
      '政治招降與軍事圍獵並用：大捷後以南匈奴安撫歸附部落，一舉瓦解北匈奴八十一部聯盟'
    ],
    strategicOutcome: '北匈奴在蒙古高原的統治徹底瓦解，被迫西遷中亞、歐洲，徹底解除了漢朝北方長城邊患。',
    significance: '「燕然勒石」成為與「封狼居胥」齊名的中國古代武將建功立業之至高巔峰象徵。'
  }
];
