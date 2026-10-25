import { PeriodTerritorySnapshot } from '../../types/history';

export const THREE_KINGDOMS_TERRITORIES: PeriodTerritorySnapshot = {
  id: 'snapshot_three_kingdoms_229',
  year: 229,
  periodName: '三國鼎立成熟期（西元 229 年孫權稱帝後）',
  eraName: '魏太和三年 / 蜀建興七年 / 吳黃龍元年',
  description: '天下三分格局全面確立，曹魏佔據中原黃河流域及關中、遼東，人口與經濟實力最強；東吳據守長江天險並向嶺南及海外拓展；蜀漢據巴蜀險隘，積極經營西南並矢志北伐。',
  factions: [
    {
      id: 'wei',
      name: '曹魏',
      faction: 'wei',
      color: 'rgba(59, 130, 246, 0.28)', // 魏國藍
      borderColor: '#3b82f6',
      capitalAncient: '洛陽（五都之一，政治中心）',
      capitalModern: '河南省洛陽市',
      capitalCoords: [34.619, 112.454],
      registeredHouseholds: '約 66 萬餘戶（《通典》載景元四年）',
      registeredPopulation: '約 443 萬餘人',
      polygon: [
        // 曹魏疆域粗略輪廓（遼東、華北、中原、關中、西涼至隴西、淮河以北）
        [41.5, 123.5], // 遼東襄平
        [40.8, 119.5],
        [40.5, 116.3], // 幽州薊城(北京)
        [39.5, 114.0],
        [38.5, 112.5], // 太原
        [39.0, 109.0],
        [38.5, 106.0], // 靈武
        [36.5, 103.5], // 金城(蘭州)
        [39.0, 98.5],  // 酒泉/張掖
        [36.0, 103.0],
        [34.8, 106.0], // 隴右天水
        [34.3, 107.5], // 岐山五丈原
        [34.2, 108.9], // 長安
        [33.8, 110.5],
        [33.2, 111.5],
        [32.8, 112.5], // 宛城(南陽)
        [32.1, 114.0], // 汝南
        [32.5, 116.0], // 壽春(淮南)
        [33.0, 119.0], // 廣陵
        [34.5, 119.5], // 海州
        [36.0, 120.5], // 青州
        [37.5, 121.5], // 膠東半島
        [39.0, 121.5], // 旅順
        [41.5, 123.5]  // 回到遼東
      ],
      ethnicities: [
        { name: '鮮卑 (Xianbei)', region: '漠南草原、塞北', note: '軻比能統一諸部對曹魏構成北方壓力，田豫等曹魏將領常施離間' },
        { name: '烏桓 (Wuhuan)', region: '遼西白狼山一帶', note: '曹操北征烏桓後，將烏桓名騎內遷中原，組建天下精銳突騎' },
        { name: '羌氐 (Qiang & Di)', region: '涼州、隴西、武都、陰平', note: '游移於魏蜀之間，曹操曾遷徙武都氐民入關中' },
        { name: '匈奴南單于部', region: '并州太原一帶', note: '曹操將南匈奴分為五部內附安置，司馬氏後受其反噬' }
      ]
    },
    {
      id: 'shu',
      name: '蜀漢',
      faction: 'shu',
      color: 'rgba(239, 68, 68, 0.28)', // 蜀漢赤紅
      borderColor: '#ef4444',
      capitalAncient: '成都',
      capitalModern: '四川省成都市',
      capitalCoords: [30.658, 104.065],
      registeredHouseholds: '28 萬戶（《三國志》裴注引《蜀記》炎興元年降表）',
      registeredPopulation: '94 萬口（帶甲將士 10 萬 2 千，吏 4 萬）',
      polygon: [
        // 蜀漢疆域輪廓（漢中、巴蜀、南中雲貴一帶）
        [33.3, 107.0], // 漢中南鄭
        [33.0, 105.0], // 陽平關/劍閣
        [33.5, 103.5], // 汶山/陰平
        [31.8, 101.5],
        [29.5, 101.0], // 康定一帶
        [27.0, 100.5], // 麗江/大理
        [24.5, 98.8],  // 永昌(保山) - 蜀漢最西南陲
        [23.5, 102.5], // 雲南南部
        [25.0, 105.0], // 牂柯(貴州)
        [27.5, 107.0], // 播州(遵義)
        [29.5, 108.5], // 黔江
        [31.0, 110.0], // 白帝城/夔門（吳蜀界首）
        [32.5, 108.5], // 米倉山
        [33.3, 107.0]  // 回到漢中
      ],
      ethnicities: [
        { name: '南蠻諸部 (彝/白族先祖)', region: '南中（今雲貴高原及川南）', note: '諸葛亮七擒孟獲後全心歸附，提供丹漆耕牛金銀，組成「無當飛軍」' },
        { name: '羌氐各部', region: '陰平、武都、汶山', note: '姜維本身為隴右涼州人，屢引羌氐部眾協同北伐' },
        { name: '僚人 (Liao)', region: '川南山地', note: '善山地作戰，蜀漢設立庲降都督統御治理' }
      ]
    },
    {
      id: 'wu',
      name: '東吳',
      faction: 'wu',
      color: 'rgba(16, 185, 129, 0.28)', // 東吳翠綠/翡翠
      borderColor: '#10b981',
      capitalAncient: '建業（南京） / 武昌（鄂州）',
      capitalModern: '江蘇省南京市',
      capitalCoords: [32.06, 118.79],
      registeredHouseholds: '52 萬 3 千戶（《晉書·地理志》天紀四年降表）',
      registeredPopulation: '230 萬口（兵 23 萬，吏 3 萬 2 千）',
      polygon: [
        // 東吳疆域輪廓（江東六郡、荊州南半、交州嶺南、福建海岸）
        [32.2, 119.5], // 鎮江/長江口
        [31.5, 121.5], // 長江入海口(上海)
        [30.0, 122.0], // 舟山
        [28.0, 121.0], // 台州/溫州 (臨海郡)
        [26.0, 119.5], // 福州 (建安郡)
        [24.5, 118.0], // 泉州/廈門
        [23.0, 116.5], // 潮汕
        [22.3, 114.0], // 珠江口(香港/深圳)
        [21.5, 111.0], // 廣東雷州半島
        [20.0, 110.0], // 海南島瓊州
        [18.5, 109.5], // 海南島南部
        [20.5, 108.5],
        [21.5, 106.5], // 交趾(今越南北部紅河三角洲，東吳設交州管轄)
        [23.0, 107.0], // 廣西
        [25.0, 110.0], // 桂林/零陵
        [27.0, 111.5], // 長沙
        [29.5, 112.5], // 洞庭湖
        [30.5, 112.0], // 江陵(荊州治所)
        [30.8, 114.5], // 武漢/夏口
        [31.3, 116.5], // 皖口
        [31.8, 118.5], // 馬鞍山
        [32.2, 119.5]  // 回到鎮江
      ],
      ethnicities: [
        { name: '山越 (Shanyue)', region: '丹陽、會稽、鄱陽、新都山地', note: '依險自保常起反抗，東吳諸葛恪等屢次征剿撫納，強徵精壯萬人補充吳軍精銳' },
        { name: '俚僚 / 駱越 (Li & Lao)', region: '嶺南、交州（廣東、廣西及越南北部）', note: '士燮家族歸附東吳後，東吳設立交州與廣州，加強對嶺南各族開發' },
        { name: '夷洲土著（台灣原住民先祖）', region: '夷洲（台灣）', note: '東吳衛溫將軍率萬人船隊訪夷洲，《臨海水土志》記載其「無君王，名拔頭，男女皆露髮徒跣」' }
      ]
    },
    {
      id: 'taiwan_yizhou',
      name: '夷洲（今台灣）',
      faction: 'taiwan',
      color: 'rgba(234, 179, 8, 0.35)', // 亮金黃
      borderColor: '#eab308',
      capitalAncient: '夷洲部落群（無統一政權，以部落族長為號）',
      capitalModern: '台灣（全島）',
      capitalCoords: [23.8, 121.0],
      registeredHouseholds: '未編戶齊民（部落社會）',
      registeredPopulation: '估計數萬至十餘萬人',
      polygon: [
        // 台灣島輪廓
        [25.3, 121.5], // 富貴角
        [25.0, 121.9], // 三貂角
        [24.5, 121.8], // 蘇澳
        [24.0, 121.6], // 花蓮
        [23.0, 121.3], // 台東
        [21.9, 120.8], // 鵝鑾鼻
        [22.5, 120.3], // 高雄
        [23.0, 120.1], // 台南
        [24.0, 120.3], // 彰化/台中
        [24.8, 120.9], // 新竹
        [25.1, 121.4], // 淡水
        [25.3, 121.5]  // 回到富貴角
      ],
      ethnicities: [
        { name: '台灣南島語族先民（夷洲土著）', region: '全島平原與山地', note: '《臨海水土志》紀錄其使用石器與竹木兵器、善射鳥獸、以粟米為主食、有豐富海洋漁撈技術' }
      ]
    }
  ]
};

export const ANCIENT_LOCATIONS = [
  // 曹魏要邑
  { nameAncient: '洛陽', nameModern: '河南洛陽', coords: [34.619, 112.454], faction: 'wei', role: '曹魏國都' },
  { nameAncient: '許昌（許縣）', nameModern: '河南許昌', coords: [34.025, 113.826], faction: 'wei', role: '魏五都之一，迎天子處' },
  { nameAncient: '鄴城', nameModern: '河北臨漳', coords: [36.25, 114.58], faction: 'wei', role: '魏五都之一，曹操霸業策源地' },
  { nameAncient: '長安', nameModern: '陝西西安', coords: [34.26, 108.94], faction: 'wei', role: '魏五都之一，關中防守大本營' },
  { nameAncient: '譙縣', nameModern: '安徽亳州', coords: [33.84, 115.77], faction: 'wei', role: '曹操故里' },
  { nameAncient: '合肥', nameModern: '安徽合肥', coords: [31.86, 117.28], faction: 'wei', role: '抗吳軍事重鎮，張遼威震逍遙津' },
  { nameAncient: '襄陽', nameModern: '湖北襄陽', coords: [32.045, 112.144], faction: 'wei', role: '南北水陸樞紐，南國鎖鑰' },

  // 蜀漢要邑
  { nameAncient: '成都', nameModern: '四川成都', coords: [30.658, 104.065], faction: 'shu', role: '蜀漢國都，天府之國中樞' },
  { nameAncient: '南鄭（漢中）', nameModern: '陝西漢中', coords: [33.078, 106.9], faction: 'shu', role: '巴蜀北面門戶，北伐基地' },
  { nameAncient: '白帝城（永安）', nameModern: '重慶奉節', coords: [31.045, 109.57], faction: 'shu', role: '長江夔門要塞，劉備託孤處' },
  { nameAncient: '劍閣（劍門關）', nameModern: '四川劍閣', coords: [32.25, 105.57], faction: 'shu', role: '一夫當關萬夫莫開之天險' },
  { nameAncient: '街亭', nameModern: '甘肅天水秦安', coords: [34.95, 105.88], faction: 'shu', role: '第一次北伐咽喉，馬謖失守處' },
  { nameAncient: '建寧', nameModern: '雲南曲靖', coords: [25.49, 103.79], faction: 'shu', role: '南中政治中樞' },

  // 東吳要邑
  { nameAncient: '建業', nameModern: '江蘇南京', coords: [32.06, 118.79], faction: 'wu', role: '東吳國都，六朝古都之始' },
  { nameAncient: '武昌', nameModern: '湖北鄂州', coords: [30.39, 114.89], faction: 'wu', role: '孫權稱帝處，東吳陪都' },
  { nameAncient: '江陵（南郡）', nameModern: '湖北荊州', coords: [30.35, 112.18], faction: 'wu', role: '長江中游戰略核心，三國必爭' },
  { nameAncient: '柴桑', nameModern: '江西九江', coords: [29.71, 115.99], faction: 'wu', role: '周瑜訓練東吳水師基地' },
  { nameAncient: '吳郡（富春）', nameModern: '浙江杭州富陽', coords: [30.05, 119.95], faction: 'wu', role: '孫氏宗族發祥地' },
  { nameAncient: '番禺', nameModern: '廣東廣州', coords: [23.13, 113.26], faction: 'wu', role: '廣州治所，海上絲路出發點' },

  // 台灣 / 夷洲
  { nameAncient: '夷洲', nameModern: '台灣本島', coords: [23.5, 120.5], faction: 'taiwan', role: '東吳衛溫將軍率萬人船隊遠航抵達地' }
];
