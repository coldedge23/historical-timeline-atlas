// Wei, Jin, Southern and Northern Dynasties Baseline Territory Snapshot (c. 495 CE Northern Wei & Southern Qi Confrontation)
export const WEI_JIN_TERRITORIES = {
  id: 'snapshot_northern_wei_southern_qi_495',
  year: 495,
  periodName: '南北朝雙雄對峙總圖（495 CE 北魏太和孝文帝遷洛 vs 南齊蕭齊分峙）',
  eraName: '北魏 太和十九年 / 南齊 建武二年',
  description: '西元 495 年，北魏孝文帝拓跋宏力排眾議，自代北平城（大同）遷都洛陽，全線推行漢化改制、推行均田制與三長制，北方經濟文化全面復甦鼎盛。江南則由蕭齊政權定都建康，坐擁長江天險、控馭江淮荊揚閩粵蜀漢沃野。長江、淮河與漢水一線構成兩大文明板塊四百年軍事拉鋸之鐵血分界，西北吐谷渾盤踞青海，漠北柔然控馭大漠，海隅夷洲自古生息。',
  factions: [
    {
      id: 'northern_wei',
      name: '北魏帝國（拓跋鮮卑，遷都洛陽，統一天下北方）',
      faction: 'northern',
      color: 'rgba(2, 132, 199, 0.35)',
      borderColor: '#0284c7',
      capitalAncient: '洛陽（原平城大同）',
      capitalModern: '河南省洛陽市洛龍區',
      capitalCoords: [34.62, 112.45],
      registeredHouseholds: '約 500 萬戶',
      registeredPopulation: '約 3,000 萬人（均田制推行後隱戶大舉編籍）',
      polygon: [
        [41.5, 113.0], // 平城大同塞北
        [41.0, 117.5], // 熱河承德
        [40.2, 120.5], // 遼西走廊
        [39.0, 118.0], // 渤海灣
        [37.5, 121.5], // 膠東半島
        [35.5, 119.5], // 海州
        [33.5, 118.0], // 淮水淮陰
        [32.8, 115.5], // 潁州
        [32.5, 112.0], // 宛城南陽
        [32.2, 110.5], // 武當漢江北岸
        [33.0, 107.0], // 漢中北山
        [34.5, 105.0], // 天水秦州
        [36.0, 103.5], // 金城蘭州
        [39.0, 100.5], // 河西走廊張掖
        [40.0, 106.0], // 河套鄂爾多斯
        [41.0, 110.0], // 陰山敕勒川
        [41.5, 113.0]
      ]
    },
    {
      id: 'southern_qi',
      name: '南朝蕭齊（蕭道成建立，都建康，六朝文華正朔）',
      faction: 'southern',
      color: 'rgba(16, 185, 129, 0.35)',
      borderColor: '#059669',
      capitalAncient: '建康（金陵）',
      capitalModern: '江蘇省南京市玄武區',
      capitalCoords: [32.06, 118.79],
      registeredHouseholds: '約 105 萬戶（官方土斷編戶）',
      registeredPopulation: '約 600 萬人（實際江南總口逾千萬）',
      polygon: [
        [33.5, 118.0], // 淮水淮陰
        [32.8, 115.5], // 淮南合肥
        [32.2, 112.0], // 襄陽漢水
        [31.0, 110.5], // 荊州江陵
        [30.8, 108.5], // 巴東三峽
        [30.6, 104.0], // 益州成都平原
        [28.0, 102.5], // 大渡河越巂
        [25.0, 103.0], // 寧州昆明
        [23.0, 108.0], // 廣西潯江
        [21.5, 110.0], // 雷州半島
        [19.0, 109.5], // 海南島珠崖
        [22.5, 114.0], // 嶺南廣州番禺
        [24.5, 118.0], // 福建晉安泉州
        [27.0, 120.5], // 溫州東甌
        [30.0, 122.0], // 舟山寧波
        [31.5, 121.5], // 長江口崇明
        [33.5, 118.0]
      ]
    },
    {
      id: 'tuyuhun',
      name: '吐谷渾王國（慕容鮮卑西遷，伏俟城，絲綢之路青海道）',
      faction: 'other',
      color: 'rgba(168, 85, 247, 0.3)',
      borderColor: '#9333ea',
      capitalAncient: '伏俟城（青海湖畔）',
      capitalModern: '青海省共和縣鐵卜恰古城',
      capitalCoords: [36.95, 100.12],
      registeredHouseholds: '約 12 萬戶',
      registeredPopulation: '約 70 萬人（慕容部鮮卑與西羌各部）',
      polygon: [
        [38.0, 97.0], // 柴達木北緣
        [37.5, 101.5], // 祁連山南麓
        [36.0, 102.0], // 湟水流域西寧
        [34.5, 102.5], // 黃河首曲積石山
        [33.5, 98.0], // 玉樹通天河
        [35.0, 93.0], // 可可西里
        [37.5, 93.5], // 阿爾金山
        [38.0, 97.0]
      ]
    },
    {
      id: 'rouran_khaganate',
      name: '柔然汗國（漠北蒙古高原，稱雄大漠，與北魏百戰）',
      faction: 'other',
      color: 'rgba(234, 179, 8, 0.28)',
      borderColor: '#ca8a04',
      capitalAncient: '燕然山穹廬大營',
      capitalModern: '蒙古國杭愛山脈南麓',
      capitalCoords: [46.5, 102.5],
      registeredHouseholds: '約 20 萬落（遊牧部族）',
      registeredPopulation: '約 120 萬人（東胡各部遊牧騎兵）',
      polygon: [
        [49.0, 95.0],
        [49.5, 110.0],
        [47.0, 118.0],
        [43.5, 116.0],
        [42.0, 111.0], // 陰山長城塞外
        [42.0, 102.0], // 居延澤
        [44.0, 95.0],
        [49.0, 95.0]
      ]
    },
    {
      id: 'taiwan_yizhou',
      name: '夷洲（臺灣島，南島語族部落自古繁衍）',
      faction: 'other',
      color: 'rgba(16, 185, 129, 0.35)',
      borderColor: '#10b981',
      capitalAncient: '大員 / 雞籠 / 諸羅聚落',
      capitalModern: '臺灣臺南市赤崁 / 臺北市基隆河谷',
      capitalCoords: [23.5, 120.8],
      registeredHouseholds: '分村聚落無定戶',
      registeredPopulation: '約 12 萬 ~ 15 萬人',
      polygon: [
        [25.3, 121.5],
        [25.0, 122.0],
        [24.0, 121.7],
        [22.5, 121.0],
        [21.9, 120.8],
        [22.2, 120.6],
        [23.0, 120.1],
        [24.0, 120.3],
        [25.0, 121.0],
        [25.3, 121.5]
      ]
    }
  ]
};
