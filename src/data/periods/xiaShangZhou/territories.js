// Xia, Shang, and Western Zhou Baseline Territory Snapshot (c. 1000 BCE Western Zhou Feudal Layout)
export const XIA_SHANG_ZHOU_TERRITORIES = {
  id: 'snapshot_western_zhou_feudal_order',
  year: -1000,
  periodName: '西周宗法封建天下總圖（前 1000 年成康之治盛期）',
  eraName: '周 康王十二年 / 宗周鎬京與東都成周洛邑體系',
  description: '周武王克商、周公東征平定三監後，西周實行「封建親戚，以藩屏周」大分封，立七十一國，姬姓獨居五十三。天下形成以宗周鎬京與成周洛邑為王權核心，齊、魯、晉、燕、衛、宋等諸侯屏衛王室，南方荊楚與江淮徐夷各守其疆，西北犬戎與北方獫狁相峙之禮樂封建格局。',
  factions: [
    {
      id: 'zhou_wangji',
      name: '西周王畿（宗周鎬京與成周洛邑直轄地）',
      faction: 'zhou',
      color: 'rgba(234, 179, 8, 0.35)',
      borderColor: '#ca8a04',
      capitalAncient: '宗周鎬京（陝西西安） / 成周洛邑（河南洛陽）',
      capitalModern: '陝西省西安市 / 河南省洛陽市',
      capitalCoords: [34.25, 108.75],
      registeredHouseholds: '約 30 萬戶',
      registeredPopulation: '約 180 萬人（含宗周六師、成周八師）',
      polygon: [
        [35.0, 107.0], // 岐山周原
        [35.5, 108.5], // 渭北高原
        [35.0, 110.5], // 韓城黃河渡口
        [35.0, 112.5], // 洛邑北邙山
        [34.5, 113.2], // 滎陽虎牢
        [34.0, 112.5], // 汝水伊闕
        [34.2, 110.0], // 潼關桃林塞
        [33.8, 108.5], // 終南秦嶺北麓
        [34.2, 107.0], // 寶雞渭河谷地
        [35.0, 107.0]
      ]
    },
    {
      id: 'lu',
      name: '魯國（曲阜，周公旦子伯禽始封，禮樂首善）',
      faction: 'zhou',
      color: 'rgba(34, 197, 94, 0.32)',
      borderColor: '#16a34a',
      capitalAncient: '曲阜（少昊之墟）',
      capitalModern: '山東省濟寧市曲阜市',
      capitalCoords: [35.58, 116.98],
      registeredHouseholds: '約 15 萬戶',
      registeredPopulation: '約 85 萬人',
      polygon: [
        [36.2, 116.5], // 泰山南麓
        [36.0, 117.8], // 萊蕪
        [35.3, 118.2], // 費縣沂蒙
        [34.8, 117.5], // 薛國邊界
        [35.0, 116.2], // 濟寧微山湖
        [35.8, 116.0], // 汶水
        [36.2, 116.5]
      ]
    },
    {
      id: 'qi',
      name: '齊國（營丘/臨淄，太公望姜尚始封，通工商之業）',
      faction: 'zhou',
      color: 'rgba(6, 182, 212, 0.35)',
      borderColor: '#0891b2',
      capitalAncient: '營丘（臨淄）',
      capitalModern: '山東省淄博市臨淄區',
      capitalCoords: [36.81, 118.34],
      registeredHouseholds: '約 18 萬戶',
      registeredPopulation: '約 100 萬人',
      polygon: [
        [37.5, 117.5], // 渤海灣
        [37.8, 119.5], // 萊州灣
        [37.0, 120.5], // 膠東半島西部
        [36.2, 119.5], // 諸城
        [36.2, 118.0], // 沂山北麓
        [36.8, 117.2], // 濟南章丘
        [37.5, 117.5]
      ]
    },
    {
      id: 'jin',
      name: '晉國（唐叔虞始封晉陽/翼城，表裡山河）',
      faction: 'zhou',
      color: 'rgba(168, 85, 247, 0.32)',
      borderColor: '#9333ea',
      capitalAncient: '唐 / 翼（山西曲沃/翼城）',
      capitalModern: '山西省臨汾市翼城縣 / 太原市',
      capitalCoords: [35.73, 111.71],
      registeredHouseholds: '約 16 萬戶',
      registeredPopulation: '約 90 萬人',
      polygon: [
        [38.0, 112.5], // 太原盆地晉陽
        [37.0, 113.0], // 太行山霍山
        [35.5, 112.5], // 中條山晉城
        [34.8, 111.0], // 風陵渡黃河大彎
        [35.2, 110.5], // 河津龍門
        [37.0, 111.0], // 呂梁山
        [38.0, 112.5]
      ]
    },
    {
      id: 'yan',
      name: '燕國（薊城，召公奭長子克始封，北鎮戎狄）',
      faction: 'zhou',
      color: 'rgba(59, 130, 246, 0.32)',
      borderColor: '#2563eb',
      capitalAncient: '薊城（北京房山琉璃河）',
      capitalModern: '北京市房山區琉璃河鎮 / 西城區',
      capitalCoords: [39.60, 116.02],
      registeredHouseholds: '約 12 萬戶',
      registeredPopulation: '約 65 萬人',
      polygon: [
        [40.5, 115.5], // 居庸關軍都山
        [40.8, 117.5], // 燕山古北口
        [39.8, 118.5], // 灤河孤竹邊界
        [38.8, 117.5], // 渤海灣天津
        [38.8, 115.5], // 保定易水
        [39.5, 115.0], // 太行北端房山
        [40.5, 115.5]
      ]
    },
    {
      id: 'wei',
      name: '衛國（朝歌故墟，武王同母少弟康叔始封）',
      faction: 'zhou',
      color: 'rgba(249, 115, 22, 0.32)',
      borderColor: '#ea580c',
      capitalAncient: '朝歌（淇縣）',
      capitalModern: '河南省鶴壁市淇縣',
      capitalCoords: [35.61, 114.20],
      registeredHouseholds: '約 14 萬戶',
      registeredPopulation: '約 75 萬人',
      polygon: [
        [36.5, 113.8], // 太行東麓邯鄲南
        [36.5, 115.5], // 大名
        [35.5, 115.5], // 濮陽帝丘
        [35.0, 114.5], // 滑縣延津
        [35.2, 113.8], // 新鄉牧野
        [36.5, 113.8]
      ]
    },
    {
      id: 'song',
      name: '宋國（商丘，商紂微子啟始封，存商三恪之祀）',
      faction: 'shang',
      color: 'rgba(236, 72, 153, 0.32)',
      borderColor: '#db2777',
      capitalAncient: '商丘（睢水之陽）',
      capitalModern: '河南省商丘市睢陽區',
      capitalCoords: [34.38, 115.65],
      registeredHouseholds: '約 13 萬戶',
      registeredPopulation: '約 70 萬人',
      polygon: [
        [34.8, 115.0], // 開封蘭考
        [34.8, 116.5], // 碭山
        [33.8, 116.8], // 宿州淮北
        [33.4, 115.5], // 亳州蒙城
        [33.8, 114.5], // 周口太康
        [34.8, 115.0]
      ]
    },
    {
      id: 'chu',
      name: '楚國（丹陽荊山，鬻熊後裔熊繹受封子爵）',
      faction: 'tribal',
      color: 'rgba(220, 38, 38, 0.32)',
      borderColor: '#dc2626',
      capitalAncient: '丹陽（湖北秭歸/保康/枝江）',
      capitalModern: '湖北省宜昌市 / 襄陽市保康縣',
      capitalCoords: [31.50, 111.20],
      registeredHouseholds: '約 10 萬戶',
      registeredPopulation: '約 50 萬人',
      polygon: [
        [32.5, 111.0], // 武當山漢水
        [32.2, 112.5], // 襄陽隨州
        [30.8, 113.5], // 江漢平原荊州
        [30.0, 112.0], // 洞庭湖口公安
        [30.5, 110.5], // 三峽巫山
        [31.8, 110.5], // 神農架
        [32.5, 111.0]
      ]
    },
    {
      id: 'shu_ba',
      name: '古蜀國與巴國（三星堆/金沙杜宇王朝與長江巴子國）',
      faction: 'tribal',
      color: 'rgba(99, 102, 241, 0.32)',
      borderColor: '#6366f1',
      capitalAncient: '成都金沙 / 廣漢三星堆 / 重慶江州',
      capitalModern: '四川省成都市 / 重慶市',
      capitalCoords: [30.68, 104.01],
      registeredHouseholds: '約 18 萬戶',
      registeredPopulation: '約 95 萬人',
      polygon: [
        [32.0, 103.5], // 岷山九寨茂縣
        [32.5, 106.5], // 廣元葭萌
        [31.5, 108.5], // 大巴山三峽
        [29.5, 107.5], // 重慶涪陵巴國
        [29.0, 105.0], // 宜賓長江
        [30.0, 103.0], // 雅安青衣江
        [31.5, 103.5], // 都江堰
        [32.0, 103.5]
      ]
    },
    {
      id: 'huaiyi_dongyi',
      name: '徐國與淮夷各部（徐偃王前身，江淮青銅文明）',
      faction: 'tribal',
      color: 'rgba(16, 185, 129, 0.32)',
      borderColor: '#059669',
      capitalAncient: '徐城（江蘇泗洪/邳州）',
      capitalModern: '江蘇省宿遷市泗洪縣 / 徐州市',
      capitalCoords: [33.45, 118.22],
      registeredHouseholds: '約 15 萬戶',
      registeredPopulation: '約 80 萬人',
      polygon: [
        [34.5, 117.5], // 邳州徐州
        [34.5, 119.5], // 連雲港黃海
        [32.8, 120.0], // 淮安鹽城
        [32.0, 118.5], // 南京長江
        [32.5, 116.5], // 淮南壽縣
        [33.5, 116.8], // 宿州
        [34.5, 117.5]
      ]
    },
    {
      id: 'xirong_quanrong',
      name: '西戎與犬戎諸方國（涇渭上游、隴東、白狼白鹿之野）',
      faction: 'tribal',
      color: 'rgba(100, 116, 139, 0.35)',
      borderColor: '#475569',
      capitalAncient: '犬戎部落汗帳（甘肅慶陽/涇川）',
      capitalModern: '甘肅省平涼市 / 慶陽市',
      capitalCoords: [35.53, 107.63],
      registeredHouseholds: '約 12 萬帳',
      registeredPopulation: '約 60 萬人',
      polygon: [
        [37.0, 105.5], // 寧夏固原須彌山
        [37.5, 108.0], // 陝北定邊
        [36.0, 108.5], // 慶陽子午嶺
        [35.0, 106.5], // 涇水六盤山
        [34.5, 104.5], // 渭河上游天水
        [35.5, 104.0], // 臨洮隴西
        [36.5, 104.5], // 蘭州黃河
        [37.0, 105.5]
      ]
    },
    {
      id: 'gui_xianyun',
      name: '鬼方與獫狁（陰山河套、北方草原早期遊牧族群）',
      faction: 'tribal',
      color: 'rgba(71, 85, 105, 0.35)',
      borderColor: '#334155',
      capitalAncient: '草原單于王庭遊牧之地',
      capitalModern: '內蒙古自治區呼和浩特市 / 包頭市 / 鄂爾多斯市',
      capitalCoords: [40.82, 111.65],
      registeredHouseholds: '約 15 萬帳',
      registeredPopulation: '約 70 萬人',
      polygon: [
        [41.5, 108.5], // 陰山北麓烏拉特
        [41.5, 112.5], // 烏蘭察布
        [40.0, 113.5], // 大同雁門關北
        [39.0, 111.0], // 府谷偏關黃河
        [38.5, 108.5], // 鄂爾多斯毛烏素
        [39.5, 106.5], // 賀蘭山北端
        [41.0, 107.0], // 河套磴口
        [41.5, 108.5]
      ]
    }
  ]
};
