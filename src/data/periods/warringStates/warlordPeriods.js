// Historical Empire and Feudal State Period Configurations for Spring & Autumn and Warring States (770 BCE - 221 BCE)
// Authentic Historical Geographic Layout based on Real Seamless Provincial / Feudal State Meshes
export const WARRING_STATES_PERIOD_CONFIGS = [
  {
    id: 'bce_770',
    yearNumber: -770,
    yearDisplay: '前 770 年',
    shortLabel: '平王東遷',
    headline: '周平王東遷洛邑，春秋列國爭霸序幕開啟',
    subTitle: '西周覆亡 · 犬戎入鎬京 · 鄭莊公小霸 · 宗周禮崩樂壞',
    provinceWarlordMap: {
      'henan': { warlord: '東周王室 (洛邑) / 鄭國 / 宋國 / 衛國', color: '#fef08a' },
      'shandong': { warlord: '齊國 (臨淄) / 魯國 (曲阜) / 曹國', color: '#fed7aa' },
      'shanxi': { warlord: '晉國 (翼城/絳) / 北狄諸部', color: '#bbf7d0' },
      'shaanxi': { warlord: '秦襄公 (始封諸侯) / 犬戎各部', color: '#cbd5e1' },
      'gansu': { warlord: '西戎八國 / 羌狄部族', color: '#94a3b8' },
      'hebei': { warlord: '燕國 (薊城) / 邢國 / 狄族', color: '#e2e8f0' },
      'beijing': { warlord: '燕國 (薊城)', color: '#e2e8f0' },
      'tianjin': { warlord: '燕國', color: '#e2e8f0' },
      'liaoning': { warlord: '孤竹國 / 東胡諸部', color: '#cbd5e1' },
      'hubei': { warlord: '楚國 (丹陽，荊蠻辟在荊山)', color: '#fed7aa' },
      'hunan': { warlord: '百越諸部 / 楚之南境', color: '#fde047' },
      'anhui': { warlord: '淮夷諸國 / 群舒', color: '#fef08a' },
      'jiangsu': { warlord: '淮夷 / 句吳小邦', color: '#fde047' },
      'zhejiang': { warlord: '於越諸部', color: '#bbf7d0' },
      'jiangxi': { warlord: '百越揚越諸部', color: '#fef08a' },
      'sichuan': { warlord: '古蜀國 (開明氏)', color: '#fbcfe8' },
      'chongqing': { warlord: '古巴國', color: '#fbcfe8' },
      'guizhou': { warlord: '夜郎前身古部落', color: '#e2e8f0' },
      'yunnan': { warlord: '古滇濮諸部', color: '#e2e8f0' },
      'fujian': { warlord: '閩越部族', color: '#bbf7d0' },
      'guangdong': { warlord: '南越百越諸部', color: '#fed7aa' },
      'guangxi': { warlord: '西甌駱越部族', color: '#fed7aa' },
      'inner-mongolia': { warlord: '林胡 / 樓煩 / 狄族', color: '#94a3b8' },
      'ningxia-hui': { warlord: '義渠戎', color: '#94a3b8' },
      'qinghai': { warlord: '西羌諸部', color: '#94a3b8' },
      'xinjiang': { warlord: '西域三十六國古城邦', color: '#e2e8f0' },
      'jilin': { warlord: '肅慎部族', color: '#cbd5e1' },
      'heilongjiang': { warlord: '肅慎部族', color: '#cbd5e1' },
      'shanghai': { warlord: '句吳沼澤', color: '#fde047' },
    },
    labels: [
      { name: '東 周 (洛邑)', pos: [488, 332], color: '#991b1b', size: 14 },
      { name: '齊 國', pos: [550, 305], color: '#b45309', size: 13 },
      { name: '晉 國', pos: [490, 275], color: '#166534', size: 13 },
      { name: '秦 (始受封)', pos: [430, 328], color: '#334155', size: 13 },
      { name: '楚 國 (荊楚)', pos: [485, 395], color: '#c2410c', size: 13 },
      { name: '魯 國', pos: [540, 325], color: '#92400e', size: 11 },
      { name: '鄭 國', pos: [505, 335], color: '#78350f', size: 11 },
      { name: '宋 國', pos: [528, 342], color: '#78350f', size: 11 },
      { name: '燕 國', pos: [540, 245], color: '#475569', size: 11 },
      { name: '犬戎 / 西戎', pos: [390, 310], color: '#64748b', size: 11 },
      { name: '古蜀 (開明)', pos: [375, 400], color: '#86198f', size: 11 },
      { name: '古 巴 國', pos: [430, 405], color: '#86198f', size: 10 }
    ],
    cities: [
      { name: '洛邑 (王城)', pos: [488, 332], isCap: true },
      { name: '鎬京 (故都)', pos: [438, 328] },
      { name: '臨淄', pos: [555, 302] },
      { name: '曲阜', pos: [542, 324] },
      { name: '絳 (晉都)', pos: [485, 290] },
      { name: '新鄭 (鄭都)', pos: [503, 336] },
      { name: '商丘 (宋都)', pos: [528, 342] },
      { name: '丹陽 (楚都)', pos: [475, 390] },
      { name: '櫟陽 (秦)', pos: [445, 325] },
      { name: '薊 (燕都)', pos: [535, 248] },
      { name: '成都 (蜀都)', pos: [372, 402] }
    ],
    battles: [
      { name: '× 繻葛之戰 (射中周桓王肩)', pos: [505, 338], eventId: 'evt_xuge_707' }
    ],
    chronicleLeft: [
      '周幽王烽火戲諸侯，申侯引犬戎破鎬京殺幽王於驪山下，西周滅亡。',
      '前770年，秦襄公、晉文侯、鄭武公護送周平王東遷洛邑，史稱「東周」，春秋時代由此揭幕。',
      '秦襄公以護送平王有功，始列為諸侯，受賜岐西之地，秦國正式建國開拓西陲。'
    ],
    chronicleRight: [
      '周王室實力與土地空前縮減，諸侯各自稱雄，號令不行於天下，「禮崩樂壞」。',
      '前707年繻葛之戰，鄭莊公率軍迎戰周天子聯軍，祝聃一箭射中周桓王肩膀，天子威嚴蕩然無存，鄭莊公首啟「小霸」。'
    ]
  },
  {
    id: 'bce_656',
    yearNumber: -656,
    yearDisplay: '前 656 年',
    shortLabel: '齊桓首霸',
    headline: '齊桓公九合諸侯尊王攘夷，葵丘會盟確立首霸地位',
    subTitle: '管仲變法富國強兵 · 召陵之盟責楚包茅 · 北伐山戎救燕存邢',
    provinceWarlordMap: {
      'shandong': { warlord: '齊桓公 (春秋首霸，尊王攘夷) / 魯國', color: '#fdba74' },
      'henan': { warlord: '周王室 / 宋桓公 / 衛文公 / 鄭文公', color: '#fef08a' },
      'shanxi': { warlord: '晉獻公 (假道伐虢滅虢虞)', color: '#bbf7d0' },
      'shaanxi': { warlord: '秦穆公 (任百里奚圖強)', color: '#cbd5e1' },
      'hubei': { warlord: '楚成王 (向北擴張飲馬江漢)', color: '#fed7aa' },
      'hunan': { warlord: '楚國勢力範圍', color: '#fed7aa' },
      'hebei': { warlord: '齊桓公援燕平山戎 / 衛邢', color: '#fdba74' },
      'beijing': { warlord: '燕莊公 (受齊援救)', color: '#fed7aa' },
      'tianjin': { warlord: '燕國', color: '#fed7aa' },
      'liaoning': { warlord: '山戎 / 孤竹國', color: '#e2e8f0' },
      'gansu': { warlord: '西戎八國', color: '#94a3b8' },
      'anhui': { warlord: '楚屬淮夷諸小國', color: '#fef08a' },
      'jiangsu': { warlord: '吳國小邦', color: '#fde047' },
      'zhejiang': { warlord: '越國部族', color: '#bbf7d0' },
      'sichuan': { warlord: '古蜀國', color: '#fbcfe8' },
      'chongqing': { warlord: '古巴國', color: '#fbcfe8' },
      'inner-mongolia': { warlord: '北狄 / 白狄 / 赤狄', color: '#94a3b8' },
      'ningxia-hui': { warlord: '義渠戎', color: '#94a3b8' }
    },
    labels: [
      { name: '齊 (桓公霸業)', pos: [555, 305], color: '#c2410c', size: 14 },
      { name: '周 天 子', pos: [488, 332], color: '#991b1b', size: 12 },
      { name: '晉 (獻公擴疆)', pos: [490, 275], color: '#166534', size: 13 },
      { name: '秦 (穆公求賢)', pos: [430, 328], color: '#334155', size: 13 },
      { name: '楚 (南蠻稱王)', pos: [485, 395], color: '#b45309', size: 13 },
      { name: '魯 (曹劌長勺)', pos: [540, 325], color: '#78350f', size: 11 },
      { name: '宋 國', pos: [528, 342], color: '#78350f', size: 10 }
    ],
    cities: [
      { name: '臨淄 (齊都)', pos: [555, 302], isCap: true },
      { name: '洛邑', pos: [488, 332] },
      { name: '曲阜 (魯都)', pos: [542, 324] },
      { name: '絳 (晉都)', pos: [485, 290] },
      { name: '雍城 (秦都)', pos: [425, 328] },
      { name: '郢 (楚都)', pos: [475, 390] },
      { name: '葵丘 (會盟地)', pos: [535, 325] },
      { name: '召陵 (盟楚地)', pos: [508, 350] }
    ],
    battles: [
      { name: '× 長勺之戰 (曹劌一鼓作氣)', pos: [545, 322], battleId: 'battle_changshao_684', eventId: 'evt_changshao_684' },
      { name: '× 召陵之盟 (管仲責楚包茅)', pos: [508, 350], eventId: 'evt_shaoling_656' }
    ],
    chronicleLeft: [
      '齊桓公拜管仲為相，改革軍政，推行「通齊之有無，立通商之官，設女閭，官山海煮鹽鑄鐵」，齊國躍為東方第一富強大國。',
      '管仲提出「尊王攘夷」旗號，九合諸侯，北伐山戎解救燕國，存邢救衛，使中原諸夏文化免於遊牧戎狄踐踏。'
    ],
    chronicleRight: [
      '前656年齊桓公率八國諸侯大軍南征楚國，兵臨召陵，斥責楚國不貢包茅祭祀周天子，屈完講和簽訂「召陵之盟」。',
      '前651年葵丘會盟，周天子賜胙致賀，諸侯共奉齊桓公為「春秋第一霸主」。'
    ]
  },
  {
    id: 'bce_632',
    yearNumber: -632,
    yearDisplay: '前 632 年',
    shortLabel: '城濮爭霸',
    headline: '城濮之戰晉文公退避三舍破楚軍，踐土之盟晉文稱霸',
    subTitle: '重耳流亡十九載返國圖強 · 先軫奇謀縛虎皮破楚 · 秦晉之好殽山伏擊',
    provinceWarlordMap: {
      'shanxi': { warlord: '晉文公 (尊王攘夷天下霸主)', color: '#86efac' },
      'henan': { warlord: '晉國聯盟 / 東周 / 鄭宋諸侯', color: '#86efac' },
      'shandong': { warlord: '齊昭公 (依附晉國同盟) / 魯國', color: '#fde047' },
      'shaanxi': { warlord: '秦穆公 (助文公返晉，秦晉之好)', color: '#cbd5e1' },
      'hubei': { warlord: '楚成王 / 得臣 (城濮慘敗受挫)', color: '#fed7aa' },
      'hunan': { warlord: '楚國境內', color: '#fed7aa' },
      'hebei': { warlord: '燕國 / 晉國勢力', color: '#e2e8f0' },
      'gansu': { warlord: '秦穆公稱霸西戎 (益國十二拓地千里)', color: '#cbd5e1' },
      'anhui': { warlord: '楚國附庸', color: '#fef08a' },
      'jiangsu': { warlord: '吳國發軔', color: '#fde047' },
      'zhejiang': { warlord: '越國', color: '#bbf7d0' }
    },
    labels: [
      { name: '晉 國 (文公全盛霸業)', pos: [490, 275], color: '#15803d', size: 14 },
      { name: '秦 (穆公霸西戎)', pos: [430, 328], color: '#334155', size: 13 },
      { name: '楚 國 (北進受挫)', pos: [485, 395], color: '#b45309', size: 13 },
      { name: '齊 國', pos: [555, 305], color: '#c2410c', size: 12 },
      { name: '周 天 子 (踐土)', pos: [488, 332], color: '#991b1b', size: 11 }
    ],
    cities: [
      { name: '絳 (晉都)', pos: [485, 290], isCap: true },
      { name: '城濮 (大捷地)', pos: [520, 330] },
      { name: '踐土 (會盟地)', pos: [496, 328] },
      { name: '雍城 (秦都)', pos: [425, 328] },
      { name: '臨淄', pos: [555, 302] },
      { name: '郢都 (楚)', pos: [475, 390] },
      { name: '殽山 (伏擊地)', pos: [462, 332] }
    ],
    battles: [
      { name: '× 城濮之戰 (退避三舍大破楚軍)', pos: [520, 330], battleId: 'battle_chengpu_632', eventId: 'evt_chengpu_632' },
      { name: '× 殽之戰 (先軫伏擊滅秦全軍)', pos: [462, 332], battleId: 'battle_xiao_627', eventId: 'evt_xiao_627' }
    ],
    chronicleLeft: [
      '晉公子重耳流亡狄、齊、楚、秦十九年，受秦穆公護送歸晉登基為晉文公，任賢使能修明內政。',
      '楚軍圍宋，宋向晉告急。前632年晉文公兌現昔日對楚莊王的承諾「退避三舍」（主動後撤九十里）誘敵於城濮，先軫以虎皮蒙馬突襲楚左右兩翼，大破楚子玉大軍。'
    ],
    chronicleRight: [
      '戰後晉文公大會諸侯於踐土，獻楚俘於周天子，天子策命為侯伯，晉國正式確立中原百年霸業。',
      '前627年秦穆公欲乘文公崩偷襲鄭國，先軫於殽山狹谷設伏，全殲秦軍生擒三將，秦晉之好決裂，秦穆公轉向西進稱霸西戎。'
    ]
  },
  {
    id: 'bce_506',
    yearNumber: -506,
    yearDisplay: '前 506 年',
    shortLabel: '柏舉大捷',
    headline: '孫武伍子胥率吳軍柏舉大破楚軍，五戰入郢攻克楚都',
    subTitle: '兵聖孫武兵法十三篇 · 伍子胥掘楚平王墓鞭屍 · 申包胥哭秦庭借秦兵',
    provinceWarlordMap: {
      'jiangsu': { warlord: '吳王闔閭 (稱霸東南，破楚入郢)', color: '#67e8f9' },
      'anhui': { warlord: '吳國大軍西征突破線', color: '#67e8f9' },
      'zhejiang': { warlord: '越國 (允常乘虛襲吳)', color: '#bbf7d0' },
      'hubei': { warlord: '楚昭王 (郢都淪陷奔隨逃難)', color: '#fef08a' },
      'hunan': { warlord: '楚國南境', color: '#fef08a' },
      'henan': { warlord: '蔡國 (引吳伐楚) / 鄭國 / 東周', color: '#fed7aa' },
      'shandong': { warlord: '魯定公 (孔子仕魯) / 齊景公', color: '#fdba74' },
      'shanxi': { warlord: '晉定公 (六卿內鬥加劇)', color: '#86efac' },
      'shaanxi': { warlord: '秦哀公 (申包胥哭秦庭出兵救楚)', color: '#cbd5e1' }
    },
    labels: [
      { name: '吳 國 (闔閭孫武全盛)', pos: [572, 362], color: '#0891b2', size: 14 },
      { name: '楚 國 (郢都陷落)', pos: [485, 395], color: '#c2410c', size: 13 },
      { name: '晉 國 (六卿分立)', pos: [490, 275], color: '#15803d', size: 12 },
      { name: '齊 國', pos: [555, 305], color: '#b45309', size: 12 },
      { name: '越 國 (勾踐蓄勢)', pos: [575, 430], color: '#047857', size: 12 },
      { name: '秦 (秦哀公援楚)', pos: [430, 328], color: '#334155', size: 11 }
    ],
    cities: [
      { name: '姑蘇 (吳都)', pos: [575, 365], isCap: true },
      { name: '郢都 (楚都)', pos: [475, 390] },
      { name: '柏舉 (決戰地)', pos: [515, 380] },
      { name: '會稽 (越都)', pos: [575, 425] },
      { name: '曲阜', pos: [542, 324] },
      { name: '洛邑', pos: [488, 332] },
      { name: '雍城', pos: [425, 328] }
    ],
    battles: [
      { name: '× 柏舉之戰 (孫武五戰破楚主力)', pos: [515, 380], battleId: 'battle_baiju_506', eventId: 'evt_baiju_506' },
      { name: '× 檇李之戰 (闔閭重傷陣亡)', pos: [570, 390], eventId: 'evt_zuili_496' }
    ],
    chronicleLeft: [
      '吳王闔閭任用亡命楚將伍子胥與齊國兵學奇才孫武，嚴明軍紀、演練陣法，吳國迅速強大。',
      '前506年，闔閭聯合蔡國、唐國，拜孫武、伍子胥為大將率三萬精兵溯淮水深入楚地千里，柏舉之戰乘楚軍半渡發起猛攻，全殲囊瓦楚軍主力。'
    ],
    chronicleRight: [
      '吳軍五戰五捷攻陷楚國都城郢都，楚昭王棄城出逃，伍子胥掘楚平王墓鞭屍三百以報父兄之仇。',
      '楚大夫申包胥奔秦求援，於秦廷倚柱痛哭七日七夜不絕水漿，秦哀公為之動容發兵五百乘救楚，吳軍隨後退還。'
    ]
  },
  {
    id: 'bce_453',
    yearNumber: -453,
    yearDisplay: '前 453 年',
    shortLabel: '三家分晉',
    headline: '晉陽之戰趙襄子水淹智伯，韓趙魏三家分晉開啟戰國時代',
    subTitle: '智伯決晉水灌晉陽 · 趙襄子密聯韓魏反戈 · 春秋世卿瓦解戰國七雄成型',
    provinceWarlordMap: {
      'shanxi': { warlord: '趙氏 (邯鄲/晉陽) / 魏氏 (安邑) / 韓氏 (平陽)', color: '#fed7aa' },
      'hebei': { warlord: '趙氏封邑 / 中山國 / 燕國', color: '#fed7aa' },
      'henan': { warlord: '魏氏 / 韓氏 / 東周王室 (式微)', color: '#fed7aa' },
      'shandong': { warlord: '田氏齊國 (田乞田恆專政) / 魯國', color: '#fde047' },
      'shaanxi': { warlord: '秦厲共公 (西陲圖存)', color: '#cbd5e1' },
      'hubei': { warlord: '楚惠王 (滅陳蔡復興疆土)', color: '#bbf7d0' },
      'hunan': { warlord: '楚國', color: '#bbf7d0' },
      'jiangsu': { warlord: '越王勾踐滅吳後霸江淮', color: '#6ee7b7' },
      'zhejiang': { warlord: '越國', color: '#6ee7b7' },
      'sichuan': { warlord: '古蜀國', color: '#fbcfe8' }
    },
    labels: [
      { name: '趙 氏 (晉陽之捷)', pos: [495, 260], color: '#ea580c', size: 13 },
      { name: '魏 氏 (安邑新強)', pos: [480, 290], color: '#16a34a', size: 13 },
      { name: '韓 氏 (中原咽喉)', pos: [490, 335], color: '#0284c7', size: 12 },
      { name: '秦 國 (西垂固守)', pos: [430, 328], color: '#334155', size: 13 },
      { name: '齊 國 (田氏專權)', pos: [555, 305], color: '#b45309', size: 13 },
      { name: '楚 國 (復霸江淮)', pos: [485, 395], color: '#c2410c', size: 13 },
      { name: '越 國 (滅吳稱霸)', pos: [575, 410], color: '#047857', size: 12 }
    ],
    cities: [
      { name: '晉陽 (趙氏發祥)', pos: [492, 255], isCap: true },
      { name: '安邑 (魏都)', pos: [478, 298] },
      { name: '平陽 (韓氏)', pos: [482, 280] },
      { name: '邯鄲', pos: [518, 280] },
      { name: '臨淄', pos: [555, 302] },
      { name: '郢都', pos: [475, 390] },
      { name: '會稽 (越都)', pos: [575, 425] }
    ],
    battles: [
      { name: '× 晉陽之戰 (引汾水倒灌智氏)', pos: [492, 255], eventId: 'evt_jinyang_453' }
    ],
    chronicleLeft: [
      '晉國六卿內鬥兼併，智伯瑤勢力最大，向韓康子、魏桓子、趙襄子強索封地。韓魏屈從，趙襄子堅拒，退守晉陽城堅守三年。',
      '智伯引晉水（汾水）灌晉陽城，水離城頭僅三版，城中白骨易子而食但民心不背叛。'
    ],
    chronicleRight: [
      '趙襄子遣張孟談夜出城私會韓魏二家，陳以「脣亡齒寒」利害關係。韓魏深知智氏滅趙後必及己，遂引兵倒戈，引水反灌智伯軍營斬殺智伯。',
      '韓、趙、魏三家瓜分智氏土地，並最終將晉國全境瓜分，史稱「三家分晉」，司馬光《資治通鑑》特以此事件為中國戰國歷史之絕對起點。'
    ]
  },
  {
    id: 'bce_356',
    yearNumber: -356,
    yearDisplay: '前 356 年',
    shortLabel: '商鞅變法',
    headline: '秦孝公下求賢令商鞅徙木立信，秦國變法圖強躍為第一強國',
    subTitle: '廢井田開阡陌 · 獎勵軍功斬首封爵 · 桂陵之戰圍魏救趙龐涓被俘',
    provinceWarlordMap: {
      'shaanxi': { warlord: '秦孝公 / 商鞅 (廢井田行軍功爵，秦始崛起)', color: '#475569' },
      'gansu': { warlord: '秦國隴西郡', color: '#475569' },
      'shanxi': { warlord: '魏惠王 (遷都大梁) / 趙成侯 / 韓昭侯', color: '#fed7aa' },
      'henan': { warlord: '魏惠王 (霸主) / 韓國 (申不害變法)', color: '#fed7aa' },
      'hebei': { warlord: '趙國 (邯鄲被圍) / 燕國 / 中山國', color: '#fed7aa' },
      'shandong': { warlord: '齊威王 (任鄒忌孫臏大破魏軍)', color: '#fde047' },
      'hubei': { warlord: '楚宣王 (楚國領土廣袤全盛)', color: '#bbf7d0' },
      'hunan': { warlord: '楚國', color: '#bbf7d0' },
      'jiangsu': { warlord: '楚越相持', color: '#bbf7d0' },
      'sichuan': { warlord: '古蜀國', color: '#fbcfe8' }
    },
    labels: [
      { name: '秦 (商鞅變法圖強)', pos: [430, 328], color: '#1e293b', size: 14 },
      { name: '魏 國 (大梁中原稱霸)', pos: [515, 325], color: '#15803d', size: 13 },
      { name: '齊 國 (威王鄒忌)', pos: [555, 305], color: '#b45309', size: 13 },
      { name: '趙 國 (邯鄲求援)', pos: [515, 280], color: '#ea580c', size: 12 },
      { name: '楚 國 (方城長江)', pos: [485, 395], color: '#c2410c', size: 13 },
      { name: '韓 國 (申不害)', pos: [490, 345], color: '#0284c7', size: 11 },
      { name: '燕 國', pos: [540, 245], color: '#475569', size: 11 }
    ],
    cities: [
      { name: '咸陽 (秦新都)', pos: [438, 328], isCap: true },
      { name: '大梁 (魏新都)', pos: [518, 332] },
      { name: '臨淄 (齊都)', pos: [555, 302] },
      { name: '邯鄲 (趙都)', pos: [518, 280] },
      { name: '新鄭 (韓都)', pos: [503, 336] },
      { name: '郢都 (楚)', pos: [475, 390] },
      { name: '桂陵 (交戰地)', pos: [530, 320] }
    ],
    battles: [
      { name: '× 桂陵之戰 (孫臏圍魏救趙)', pos: [530, 320], battleId: 'battle_guiling_353', eventId: 'evt_guiling_353' },
      { name: '× 馬陵之戰 (減灶誘敵射殺龐涓)', pos: [540, 315], battleId: 'battle_maling_341', eventId: 'evt_maling_341' }
    ],
    chronicleLeft: [
      '秦孝公即位發布《求賢令》，衛國貴族商鞅入秦，以法家富國強兵之術說服孝公，前356年南門「徙木立信」推行歷史性變法。',
      '廢除井田制准許土地自由買賣，實行二十等軍功爵制「斬一首賜爵一級」，確立嚴刑峻法與連坐制度，秦人聞戰則喜號為「虎狼之師」。'
    ],
    chronicleRight: [
      '前353年龐涓率魏武卒包圍趙都邯鄲，齊威王拜田忌為將、孫臏為軍師出兵救趙。',
      '孫臏直搗空虛的魏都大梁「圍魏救趙」，於桂陵伏擊疲憊回援的魏軍生擒龐涓；前341年馬陵之戰孫臏「減灶誘敵」，萬弩齊發射死龐涓，魏國霸權徹底瓦解。'
    ]
  },
  {
    id: 'bce_307',
    yearNumber: -307,
    yearDisplay: '前 307 年',
    shortLabel: '胡服騎射',
    headline: '趙武靈王推行胡服騎射，組建強大野戰鐵騎席捲北方',
    subTitle: '脫深衣革革胡服 · 滅中山破林胡樓煩 · 司馬錯拔巴蜀秦國兼併天府',
    provinceWarlordMap: {
      'shanxi': { warlord: '趙武靈王 (胡服騎射，兵力驟增)', color: '#fed7aa' },
      'hebei': { warlord: '趙國 / 燕昭王 (千金買骨樂毅築黃金台)', color: '#fed7aa' },
      'inner-mongolia': { warlord: '趙武靈王擴疆千里築長城', color: '#fed7aa' },
      'shaanxi': { warlord: '秦昭襄王 / 宣太后 (東出函谷關)', color: '#334155' },
      'sichuan': { warlord: '秦國司馬錯平定巴蜀設蜀郡', color: '#334155' },
      'chongqing': { warlord: '秦國巴郡', color: '#334155' },
      'gansu': { warlord: '秦國義渠郡', color: '#334155' },
      'shandong': { warlord: '齊宣王 / 齊湣王 (東方霸主吞宋)', color: '#fde047' },
      'hubei': { warlord: '楚懷王 (屈原直諫，受騙於張儀)', color: '#bbf7d0' },
      'henan': { warlord: '韓襄王 / 魏襄王', color: '#fed7aa' }
    },
    labels: [
      { name: '趙 (胡服騎射震北方)', pos: [515, 260], color: '#c2410c', size: 14 },
      { name: '秦 (得巴蜀天府大圖)', pos: [430, 335], color: '#0f172a', size: 14 },
      { name: '齊 國 (大吞淮南)', pos: [555, 305], color: '#b45309', size: 13 },
      { name: '楚 國 (遭張儀連橫算計)', pos: [485, 395], color: '#15803d', size: 13 },
      { name: '燕 國 (黃金台招賢)', pos: [540, 245], color: '#475569', size: 12 }
    ],
    cities: [
      { name: '邯鄲 (趙都)', pos: [518, 280], isCap: true },
      { name: '咸陽 (秦都)', pos: [438, 328] },
      { name: '臨淄 (齊都)', pos: [555, 302] },
      { name: '薊城 (燕都)', pos: [535, 248] },
      { name: '郢都 (楚都)', pos: [475, 390] },
      { name: '成都 (秦蜀郡，李冰築都江堰)', pos: [372, 402] }
    ],
    battles: [
      { name: '× 司馬錯滅巴蜀 (席捲天府)', pos: [385, 380], eventId: 'evt_simacuo_shubashu_316' },
      { name: '× 丹陽與藍田之戰 (秦楚大決戰)', pos: [468, 345], eventId: 'evt_lantian_312' }
    ],
    chronicleLeft: [
      '趙國地處四戰之地，北方常遭匈奴、林胡、樓煩騎射襲擾。趙武靈王力排眾議推行「胡服騎射」，改穿胡人短衣窄袖，苦練馬背騎射。',
      '趙國迅速建立中國歷史上第一支強大的多兵種騎兵集團，北滅中山國、破林胡樓煩「拓地千里」，築趙南長城，一躍成為關東唯一能單獨抗衡強秦的軍事大國。'
    ],
    chronicleRight: [
      '前316年，秦惠文王採司馬錯之策出石牛道攻滅巴國、蜀國，「得蜀則得楚，楚亡則天下併矣」，秦國奪得天府之國富饒沃土與天險後方。',
      '張儀以「商於之地六百里」誘騙楚懷王與齊國絕交，隨後改口「六里」，秦楚丹陽藍田大戰楚軍慘敗，屈原痛心疾首作《離騷》。'
    ]
  },
  {
    id: 'bce_284',
    yearNumber: -284,
    yearDisplay: '前 284 年',
    shortLabel: '樂毅破齊',
    headline: '樂毅統五國聯軍下齊七十城，田單即墨火牛陣反攻復國',
    subTitle: '燕昭王雪恥築黃金台 · 齊湣王自大覆滅奔莒 · 田單大擺火牛陣收復齊境',
    provinceWarlordMap: {
      'shandong': { warlord: '燕軍攻佔七十城 (齊僅存即墨莒城)', color: '#93c5fd' },
      'hebei': { warlord: '燕昭王 / 趙惠文王 (將相和廉頗藺相如)', color: '#93c5fd' },
      'beijing': { warlord: '燕昭王', color: '#93c5fd' },
      'tianjin': { warlord: '燕國', color: '#93c5fd' },
      'shaanxi': { warlord: '秦昭襄王 (伊闕之戰白起斬首二十四萬)', color: '#334155' },
      'sichuan': { warlord: '秦國天府之國', color: '#334155' },
      'chongqing': { warlord: '秦國巴郡', color: '#334155' },
      'henan': { warlord: '魏安釐王 / 韓厘王 (依附強秦)', color: '#fed7aa' },
      'hubei': { warlord: '楚頃襄王 (楚國避秦遷陳城)', color: '#bbf7d0' },
      'hunan': { warlord: '楚國', color: '#bbf7d0' }
    },
    labels: [
      { name: '燕 (樂毅席捲齊地)', pos: [545, 275], color: '#1e3a8a', size: 14 },
      { name: '齊 (田單死守即墨)', pos: [572, 310], color: '#b45309', size: 13 },
      { name: '秦 (白起伊闕滅韓魏)', pos: [430, 328], color: '#0f172a', size: 14 },
      { name: '趙 (藺相如完璧歸趙)', pos: [505, 275], color: '#ea580c', size: 13 },
      { name: '楚 (郢都危急)', pos: [485, 395], color: '#15803d', size: 12 }
    ],
    cities: [
      { name: '臨淄 (齊都淪陷)', pos: [555, 302] },
      { name: '即墨 (火牛復國)', pos: [572, 310], isCap: true },
      { name: '莒城', pos: [550, 325] },
      { name: '薊城 (燕都)', pos: [535, 248] },
      { name: '咸陽 (秦都)', pos: [438, 328] },
      { name: '邯鄲 (趙都)', pos: [518, 280] },
      { name: '伊闕 (白起斬首24萬)', pos: [486, 335] }
    ],
    battles: [
      { name: '× 濟西之戰 (樂毅破齊主力)', pos: [535, 295], battleId: 'battle_jixi_284', eventId: 'evt_leyi_poqi_284' },
      { name: '× 即墨之戰 (田單火牛陣復國)', pos: [572, 310], eventId: 'evt_tiandan_huoniu_279' },
      { name: '× 伊闕之戰 (白起斬韓魏24萬)', pos: [486, 335], battleId: 'battle_yique_293', eventId: 'evt_yique_293' }
    ],
    chronicleLeft: [
      '齊湣王驕狂滅宋國、逐孟嘗君欲並吞天下，諸侯憤恨。燕昭王臥薪嘗膽築黃金台拜樂毅為上將軍，聯合秦、韓、趙、魏五國大舉伐齊。',
      '前284年濟西之戰樂毅大破齊軍主力，長驅直入拔齊都臨淄，連克齊國七十餘城，齊國僅剩莒城與即墨兩孤城負隅頑抗。'
    ],
    chronicleRight: [
      '燕惠王中反間計以騎劫代樂毅，齊名將田單在即墨收集千餘頭耕牛，披五彩綢布、角縛利刃、尾繫燃草，夜開城門「火牛陣」衝鋒陷陣，斬殺騎劫收復全境七十城。',
      '前293年伊闕之戰秦名將白起出奇兵大破韓魏聯軍斬首二十四萬，「殺神」白起名震諸侯。'
    ]
  },
  {
    id: 'bce_260',
    yearNumber: -260,
    yearDisplay: '前 260 年',
    shortLabel: '長平之戰',
    headline: '長平之戰白起斷糧合圍趙軍，坑殺四十萬趙卒奠定秦統',
    subTitle: '廉頗堅壁清野三年相持 · 趙王中反間計用紙上談兵趙括 · 關東六國再無抗秦實力',
    provinceWarlordMap: {
      'shaanxi': { warlord: '秦昭襄王 / 武安君白起 (坑趙四十萬主力)', color: '#1e293b' },
      'shanxi': { warlord: '長平前線 · 趙國全線崩潰', color: '#1e293b' },
      'sichuan': { warlord: '秦國大後方', color: '#1e293b' },
      'chongqing': { warlord: '秦國大後方', color: '#1e293b' },
      'gansu': { warlord: '秦國後方', color: '#1e293b' },
      'hebei': { warlord: '趙孝成王 (邯鄲大飢，平原君趙奢)', color: '#fca5a5' },
      'henan': { warlord: '魏安釐王 (信陵君竊符救趙) / 韓國', color: '#fed7aa' },
      'shandong': { warlord: '齊王建 (袖手旁觀，不修武備)', color: '#fef08a' },
      'hubei': { warlord: '秦拔郢都焚夷陵，楚退保陳城壽春', color: '#1e293b' },
      'anhui': { warlord: '楚考烈王 (春申君遷都壽春)', color: '#bbf7d0' },
      'hunan': { warlord: '楚國', color: '#bbf7d0' },
      'beijing': { warlord: '燕國 (乘趙危北伐反被廉頗破)', color: '#e2e8f0' }
    },
    labels: [
      { name: '秦 (長平決戰霸天下)', pos: [430, 328], color: '#020617', size: 14 },
      { name: '趙 (國殤長平損45萬)', pos: [515, 275], color: '#b91c1c', size: 14 },
      { name: '魏 (信陵君竊符救趙)', pos: [515, 332], color: '#15803d', size: 12 },
      { name: '楚 (遷都壽春避秦)', pos: [540, 365], color: '#c2410c', size: 12 },
      { name: '齊 (齊王建不通世務)', pos: [555, 305], color: '#b45309', size: 12 }
    ],
    cities: [
      { name: '長平 (曠世決戰地)', pos: [498, 288], isCap: true },
      { name: '邯鄲 (趙都，信陵君解圍)', pos: [518, 280] },
      { name: '咸陽 (秦都)', pos: [438, 328] },
      { name: '大梁 (魏都)', pos: [518, 332] },
      { name: '壽春 (楚新都)', pos: [542, 365] },
      { name: '臨淄 (齊都)', pos: [555, 302] }
    ],
    battles: [
      { name: '× 長平之戰 (白起坑殺四十萬趙卒)', pos: [498, 288], battleId: 'battle_changping_260', eventId: 'evt_changping_260' },
      { name: '× 邯鄲之戰 (信陵君救趙破秦軍)', pos: [518, 280], battleId: 'battle_handan_257', eventId: 'evt_handan_257' }
    ],
    chronicleLeft: [
      '韓上黨郡降趙，引發秦趙兩強長平大對決。名將廉頗築丹河石壘堅壁不出三年，秦軍百萬屢攻不克陷入消耗戰。',
      '秦相范雎施反間計傳言「秦惟懼馬服君趙奢之子趙括為將」，趙孝成王撤換廉頗以趙括為帥。秦昭襄王秘密起用武安君白起為主帥，下達封口令「洩言者斬」。'
    ],
    chronicleRight: [
      '趙括自恃精通兵書全線出擊，白起佯敗誘敵深入，出奇兵二萬五千人斷趙軍退路，以五千騎兵插趙陣中央分割包圍。',
      '秦昭襄王親至河內動員十五歲以上男子全數開赴長平截斷趙國救兵。趙軍斷糧四十六日殺馬食骨，趙括突圍中箭戰死，白起坑殺降卒四十萬人，趙國元氣大傷，六國再無抗秦底氣。'
    ]
  },
  {
    id: 'bce_221',
    yearNumber: -221,
    yearDisplay: '前 221 年',
    shortLabel: '秦滅六國',
    headline: '秦王政席捲六國統一天下，分天下為三十六郡稱始皇帝',
    subTitle: '王翦王賁父子滅燕趙魏楚齊 · 書同文車同軌統一度量衡 · 中華帝制二千年奠基',
    provinceWarlordMap: {
      'shaanxi': { warlord: '大秦帝國 (始皇帝二十六年統一天下)', color: '#0f172a' },
      'shanxi': { warlord: '大秦帝國 (太原郡 / 上黨郡)', color: '#0f172a' },
      'hebei': { warlord: '大秦帝國 (鉅鹿郡 / 邯鄲郡)', color: '#0f172a' },
      'shandong': { warlord: '大秦帝國 (齊郡 / 瑯琊郡)', color: '#0f172a' },
      'henan': { warlord: '大秦帝國 (三川郡 / 潁川郡)', color: '#0f172a' },
      'hubei': { warlord: '大秦帝國 (南郡 / 南陽郡)', color: '#0f172a' },
      'anhui': { warlord: '大秦帝國 (九江郡)', color: '#0f172a' },
      'jiangsu': { warlord: '大秦帝國 (泗水郡 / 會稽郡)', color: '#0f172a' },
      'zhejiang': { warlord: '大秦帝國 (會稽郡)', color: '#0f172a' },
      'jiangxi': { warlord: '大秦帝國 (廬江郡)', color: '#0f172a' },
      'hunan': { warlord: '大秦帝國 (長沙郡)', color: '#0f172a' },
      'beijing': { warlord: '大秦帝國 (漁陽郡)', color: '#0f172a' },
      'tianjin': { warlord: '大秦帝國', color: '#0f172a' },
      'liaoning': { warlord: '大秦帝國 (遼東郡 / 遼西郡)', color: '#0f172a' },
      'sichuan': { warlord: '大秦帝國 (蜀郡)', color: '#0f172a' },
      'chongqing': { warlord: '大秦帝國 (巴郡)', color: '#0f172a' },
      'gansu': { warlord: '大秦帝國 (隴西郡)', color: '#0f172a' },
      'guangdong': { warlord: '屠睢南征百越置南海三郡', color: '#334155' },
      'guangxi': { warlord: '桂林郡 / 象郡', color: '#334155' },
      'inner-mongolia': { warlord: '蒙恬三十萬大軍北逐匈奴收河南地', color: '#334155' }
    },
    labels: [
      { name: '大 秦 帝 國 (統一天下)', pos: [480, 310], color: '#fef08a', size: 16 },
      { name: '咸陽 (帝都)', pos: [438, 328], color: '#dc2626', size: 13 },
      { name: '蒙恬北擊匈奴收河南', pos: [440, 210], color: '#93c5fd', size: 12 },
      { name: '秦軍五十萬開嶺南靈渠', pos: [480, 500], color: '#6ee7b7', size: 12 }
    ],
    cities: [
      { name: '咸陽 (大秦帝都)', pos: [438, 328], isCap: true },
      { name: '臨淄 (齊郡)', pos: [555, 302] },
      { name: '邯鄲 (邯鄲郡)', pos: [518, 280] },
      { name: '大梁 (三川郡)', pos: [518, 332] },
      { name: '壽春 (九江郡)', pos: [542, 365] },
      { name: '薊城 (廣陽郡)', pos: [535, 248] },
      { name: '成都 (蜀郡)', pos: [372, 402] },
      { name: '吳縣 (會稽郡)', pos: [575, 365] }
    ],
    battles: [
      { name: '× 滅韓之戰 (前230年內史騰滅韓)', pos: [503, 336], eventId: 'evt_qin_mie_han_230' },
      { name: '× 滅趙之戰 (王翦離間計誅李牧破邯鄲)', pos: [518, 280], eventId: 'evt_qin_mie_zhao_228' },
      { name: '× 滅楚之戰 (王翦六十萬宿將破項燕)', pos: [542, 365], battleId: 'battle_wangjian_miechu_223', eventId: 'evt_qin_mie_chu_223' }
    ],
    chronicleLeft: [
      '秦王政親政誅嫪毐、罷呂不韋，重用李斯「遠交近攻」策略，先後十年席捲天下：前230年滅韓、前228年滅趙、前225年水灌大梁滅魏。',
      '前223年王翦親統六十萬大軍破項燕滅楚，前222年滅燕滅代，前221年王賁奇襲滅齊，徹底結束春秋戰國五百餘年諸侯割據分裂。'
    ],
    chronicleRight: [
      '秦王政以功蓋三皇、德邁五帝，自定尊號為「始皇帝」，廢除分封制推行郡縣制分天下為三十六郡。',
      '統一度量衡、車同軌、書同文字「小篆」，修萬里長城拒匈奴、開靈渠通嶺南，正式奠定中國兩千餘年大一統中央集權制度之骨架。'
    ]
  }
];

export const WARRING_STATES_WARLORD_PERIODS = WARRING_STATES_PERIOD_CONFIGS;
