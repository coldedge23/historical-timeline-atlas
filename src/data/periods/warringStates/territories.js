// Spring & Autumn and Warring States Baseline Territory Snapshot (Warring States Seven Powers)
export const WARRING_STATES_TERRITORIES = {
  id: 'snapshot_warring_states_seven_powers',
  year: -260,
  periodName: '戰國七雄鼎峙版圖（前 260 年長平之戰前夕）',
  eraName: '周赧王五十五年 / 秦昭襄王四十七年 / 趙孝成王六年',
  description: '戰國中後期經過數百年兼併與變法圖強，天下萬邦凝結為「戰國七雄」（秦、楚、齊、趙、魏、韓、燕）與式微周天子王畿。秦國據關中、跨巴蜀，席捲天下之勢已成；楚地方五千里帶甲百萬；趙國胡服騎射稱雄北疆；齊國富甲海岱；魏韓固守中原腹地；燕闢地遼東。',
  factions: [
    {
      id: 'qin',
      name: '秦國（關中王畿、隴西、巴蜀、河東）',
      faction: 'qin',
      color: 'rgba(185, 28, 28, 0.35)',
      borderColor: '#b91c1c',
      capitalAncient: '咸陽（渭水北岸，商鞅變法後定都）',
      capitalModern: '陝西省咸陽市 / 西安市',
      capitalCoords: [34.34, 108.71],
      registeredHouseholds: '約 120 萬戶',
      registeredPopulation: '約 600 萬人',
      polygon: [
        [37.5, 109.5], // 上郡(陝北榆林)
        [36.0, 111.5], // 河東郡(山西臨汾)
        [34.8, 111.0], // 陝縣/函谷關
        [33.8, 110.0], // 武關/商洛
        [32.8, 111.5], // 南陽/鄧縣
        [32.0, 112.0], // 襄樊/南郡
        [30.4, 112.2], // 郢都(江陵，白起拔郢所奪)
        [29.0, 109.5], // 黔中郡(湖南湘西)
        [28.0, 106.0], // 黔北
        [29.5, 106.5], // 巴郡(重慶)
        [30.6, 104.0], // 蜀郡(成都平原)
        [32.0, 102.5], // 汶山/岷江上游
        [34.0, 104.0], // 隴西郡(甘肅臨洮)
        [35.5, 106.5], // 北地郡(甘肅慶陽)
        [37.5, 109.5]  // 榆林環線
      ]
    },
    {
      id: 'chu',
      name: '楚國（江淮、漢水、江南千里）',
      faction: 'chu',
      color: 'rgba(126, 34, 206, 0.32)',
      borderColor: '#9333ea',
      capitalAncient: '陳縣 / 壽春（白起拔郢後遷都陳，後徙壽春）',
      capitalModern: '河南省淮陽區 / 安徽省壽縣',
      capitalCoords: [32.58, 116.78],
      registeredHouseholds: '約 130 萬戶',
      registeredPopulation: '約 600 萬人',
      polygon: [
        [34.0, 114.5], // 淮陽陳縣
        [34.5, 117.0], // 徐州下邳
        [34.0, 119.5], // 海州(連雲港)
        [32.0, 120.8], // 長江口南通
        [30.5, 120.0], // 吳郡太湖
        [28.5, 119.0], // 浙江衢州
        [27.0, 116.0], // 江西撫州
        [26.0, 113.0], // 湖南衡陽
        [26.5, 111.0], // 永州零陵
        [28.5, 111.5], // 洞庭長沙
        [30.0, 114.5], // 武漢武昌
        [32.0, 114.0], // 隨州/信陽
        [33.5, 114.0], // 汝水汝南
        [34.0, 114.5]  // 環線
      ]
    },
    {
      id: 'qi',
      name: '齊國（海岱山東半島、膠東、臨淄）',
      faction: 'qi',
      color: 'rgba(14, 116, 144, 0.35)',
      borderColor: '#06b6d4',
      capitalAncient: '臨淄（富甲天下之列國商業第一大都會）',
      capitalModern: '山東省淄博市臨淄區',
      capitalCoords: [36.81, 118.34],
      registeredHouseholds: '約 90 萬戶',
      registeredPopulation: '約 450 萬人',
      polygon: [
        [37.8, 117.5], // 渤海灣無棣
        [38.0, 119.0], // 萊州灣
        [37.5, 121.5], // 煙台芝罘
        [37.0, 122.5], // 威海成山頭
        [36.0, 120.5], // 青島膠州灣
        [35.0, 119.0], // 日照琅琊
        [35.0, 118.0], // 莒縣
        [35.5, 117.0], // 魯國故地泰安曲阜
        [36.8, 116.5], // 濟南歷城
        [37.5, 117.0], // 德州
        [37.8, 117.5]  // 環線
      ]
    },
    {
      id: 'zhao',
      name: '趙國（太行東西、邯鄲、晉陽、代地、河套）',
      faction: 'zhao',
      color: 'rgba(217, 119, 6, 0.35)',
      borderColor: '#f59e0b',
      capitalAncient: '邯鄲（天下名都，戰略軍政核心）',
      capitalModern: '河北省邯鄲市',
      capitalCoords: [36.60, 114.49],
      registeredHouseholds: '約 70 萬戶',
      registeredPopulation: '約 360 萬人',
      polygon: [
        [40.8, 111.0], // 雲中郡(內蒙古呼和浩特)
        [40.5, 113.0], // 雁門郡(山西大同)
        [40.0, 114.5], // 代郡(河北蔚縣)
        [38.5, 114.5], // 石家莊真定
        [37.0, 115.5], // 邢台巨鹿
        [36.0, 115.0], // 邯鄲大名
        [35.5, 113.5], // 上黨郡長子/長平
        [37.0, 112.5], // 晉陽(太原)
        [39.0, 111.5], // 偏關/河曲
        [40.8, 111.0]  // 環線
      ]
    },
    {
      id: 'wei',
      name: '魏國（中原河濟、大梁、安邑）',
      faction: 'wei',
      color: 'rgba(22, 101, 52, 0.35)',
      borderColor: '#16a34a',
      capitalAncient: '大梁（開封，魏惠王遷都自安邑）',
      capitalModern: '河南省開封市',
      capitalCoords: [34.79, 114.31],
      registeredHouseholds: '約 65 萬戶',
      registeredPopulation: '約 320 萬人',
      polygon: [
        [35.8, 114.5], // 衛輝/汲縣
        [35.5, 115.5], // 濮陽東阿
        [34.8, 115.8], // 商丘睢陽
        [34.2, 115.0], // 拓城
        [34.4, 114.0], // 許昌
        [34.9, 113.5], // 鄭州滎陽
        [35.2, 113.8], // 新鄉獲嘉
        [35.8, 114.5]  // 環線
      ]
    },
    {
      id: 'han',
      name: '韓國（新鄭、宜陽、上黨故地）',
      faction: 'han',
      color: 'rgba(234, 88, 12, 0.35)',
      borderColor: '#ea580c',
      capitalAncient: '新鄭（天下之樞紐，強弩之鄉）',
      capitalModern: '河南省新鄭市',
      capitalCoords: [34.39, 113.73],
      registeredHouseholds: '約 40 萬戶',
      registeredPopulation: '約 180 萬人',
      polygon: [
        [34.8, 113.0], // 洛陽以東鞏義
        [34.5, 113.8], // 新鄭/密縣
        [34.0, 113.5], // 襄城/禹州
        [33.8, 112.8], // 魯山/南陽盆地北口
        [34.2, 112.0], // 宜陽(韓國軍工要地)
        [34.6, 112.4], // 洛水之南
        [34.8, 113.0]  // 環線
      ]
    },
    {
      id: 'yan',
      name: '燕國（薊城幽燕、遼西、遼東五郡）',
      faction: 'yan',
      color: 'rgba(79, 70, 229, 0.35)',
      borderColor: '#6366f1',
      capitalAncient: '薊城（北京故城）與下都（易縣）',
      capitalModern: '北京市宣武區 / 河北省易縣',
      capitalCoords: [39.90, 116.40],
      registeredHouseholds: '約 40 萬戶',
      registeredPopulation: '約 200 萬人',
      polygon: [
        [41.5, 123.0], // 遼東襄平(遼陽)
        [40.8, 120.5], // 遼西錦州
        [40.2, 118.5], // 右北平
        [40.5, 117.0], // 漁陽(北京密雲)
        [40.4, 115.5], // 上谷郡(懷來)
        [39.4, 115.3], // 燕下都(河北易縣)
        [39.0, 116.8], // 天津楊柳青
        [39.5, 117.8], // 渤海灣北岸
        [40.0, 119.8], // 山海關
        [41.5, 123.0]  // 環線
      ]
    },
    {
      id: 'zhou',
      name: '周王室（洛邑王畿微地）',
      faction: 'zhou',
      color: 'rgba(234, 179, 8, 0.45)',
      borderColor: '#eab308',
      capitalAncient: '東周洛邑（王城 / 成周）',
      capitalModern: '河南省洛陽市老城區',
      capitalCoords: [34.62, 112.45],
      registeredHouseholds: '約 3 萬戶',
      registeredPopulation: '約 15 萬人',
      polygon: [
        [34.75, 112.35],
        [34.75, 112.60],
        [34.52, 112.60],
        [34.52, 112.35],
        [34.75, 112.35]
      ]
    }
  ]
};
