import { DemographicsData } from '../../types/history';

export const THREE_KINGDOMS_DEMOGRAPHICS: DemographicsData = {
  year: 263,
  eraName: '三國末期（蜀滅亡之際與西晉統一前）',
  estimatedTotalPopulation: '全國官方編戶約 767 萬人（若計入隱匿流民、奴婢與世族莊園佃農，實際人口約 1,600 萬 ~ 2,000 萬）',
  commentary: '東漢桓帝永壽三年（157年）全國戶口為 1,067 萬戶，口 5,648 萬人。經過漢末黃巾之亂、軍閥割據四十年戰火、赤壁大疫與三國長年戰亂，官方編戶人口銳減超過 70%~80%。三國各自推行屯田制、蔭客制與招撫少數民族以補充極度匱乏的勞動力與兵源。',
  dataPoints: [
    {
      regimeName: '曹魏（佔據中原、北方與關中）',
      households: '約 663,423 戶',
      population: '約 4,432,881 口',
      armyCount: '常備軍約 40 萬 ~ 50 萬',
      officialsCount: '約 6 萬 ~ 8 萬',
      source: '《通典·食貨志七》引曹魏景元四年（263年）滅蜀時全國戶籍紀錄'
    },
    {
      regimeName: '東吳（佔據江東、荊南與嶺南交廣）',
      households: '約 523,000 戶',
      population: '約 2,300,000 口',
      armyCount: '兵 230,000 人',
      officialsCount: '吏 32,000 人、後宮 5,000 人',
      source: '《晉書·地理志》及《三國志·吳書·孫皓傳》天紀四年（280年）降表紀錄'
    },
    {
      regimeName: '蜀漢（佔據益州巴蜀與南中）',
      households: '約 280,000 戶',
      population: '約 940,000 口',
      armyCount: '帶甲將士 102,000 人',
      officialsCount: '吏 40,000 人',
      source: '《三國志·蜀書·後主傳》裴松之注引王隱《蜀記》炎興元年（263年）降表'
    }
  ],
  ethnicGroups: [
    {
      name: '南蠻諸部（南中叟、僚、彝族與白族先民）',
      distributionRegion: '南中地區（雲南、貴州及四川西昌一帶）',
      relationshipWithRegime: '建興三年諸葛亮南征「七擒孟獲」後，實施「治實不治名」的羈縻自主治理，廣納各部勇士組建「無當飛軍」，成為蜀漢最驍勇的特種步兵。'
    },
    {
      name: '山越族（古越人後裔）',
      distributionRegion: '江東丹陽、會稽、鄱陽等高山險阻地帶',
      relationshipWithRegime: '依險割據不服孫吳徭役。孫權命陸遜、諸葛恪等名將大舉搜山「剿撫兼施」，前後遷徙十數萬山越人下山編入戶籍，壯勇者萬餘人補充為東吳主力軍。'
    },
    {
      name: '鮮卑族（拓跋部、慕容部、軻比能部等）',
      distributionRegion: '陰山以南、塞外漠南草原至遼東',
      relationshipWithRegime: '曹魏採取「分其部眾、離其勢力」之策略，魏將田豫、牽招等長年經略邊疆，曹魏也藉互市引進良馬，強化北方防騎兵戰線。'
    },
    {
      name: '烏桓族（東胡後裔）',
      distributionRegion: '河北北部、遼西走廊白狼山一帶',
      relationshipWithRegime: '建安十二年曹操北征白狼山斬烏桓蹋頓單于，遷徙烏桓部落萬餘戶入中原，烏桓騎兵成為曹魏「三胡突騎」主力，戰功赫赫。'
    },
    {
      name: '羌族與氐族',
      distributionRegion: '涼州河西走廊、隴西天水、武都與陰平山區',
      relationshipWithRegime: '夾處於魏蜀之間。曹操曾強遷武都五萬餘氐人入關中；蜀漢諸葛亮、姜維則多次聯絡羌氐共同反魏，姜維親信羌人被稱為「羌胡之義從」。'
    },
    {
      name: '夷洲先民（台灣原住民族先祖）',
      distributionRegion: '夷洲（台灣全島平原與沿海）',
      relationshipWithRegime: '黃龍二年（230年）東吳衛溫率萬人艦隊抵台，東吳官員沈瑩在《臨海水土志》記載其善射獵、雕題鯨面、使用石器竹木器，為文獻記載兩岸早期族群接觸之重要史實。'
    }
  ]
};
