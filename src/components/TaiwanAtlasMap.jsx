import React, { useState, useRef } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Clock,
  MapPin,
  Maximize2,
  Minimize2
} from './Icons.js';
import { TAIWAN_LENS_ERAS, ERA_BATTLE_IDS } from '../data/taiwanLensData.js';
import { TAIWAN_COUNTY_PATHS, projectLngLatToTaiwanMap } from '../data/taiwanMapGeoData.js';

// Historical Era Color Schemes for Taiwan 22 Counties
export const TAIWAN_ERA_COUNTY_SCHEMES = {
  tw_prehistoric: {
    name: "南島原鄉與早期記錄 (史前 - 1624)",
    themeBadge: "大肚王國·澎湖設治",
    themeColor: "#059669",
    countyColors: {
      taichung: "#047857", // 大肚王國拍瀑拉核心
      changhua: "#059669", // 大肚王國南境
      nantou: "#047857", // 埔里諸社
      taipei: "#10b981", // 凱達格蘭族
      new_taipei: "#10b981",
      keelung: "#10b981",
      yilan: "#059669", // 噶瑪蘭三十六社
      taoyuan: "#34d399",
      hsinchu_city: "#34d399",
      hsinchu_county: "#34d399", // 道卡斯族/賽夏族
      miaoli: "#34d399",
      yunlin: "#10b981",
      chiayi_city: "#10b981",
      chiayi_county: "#10b981",
      tainan: "#10b981", // 西拉雅族四大社
      kaohsiung: "#059669", // 馬卡道族
      pingtung: "#047857", // 排灣族/魯凱族
      hualien: "#065f46", // 阿美族/撒奇萊雅
      taitung: "#065f46", // 卑南族八社/排灣
      penghu: "#d97706", // 1281年元世祖設澎湖巡檢司
      kinmen: "#94a3b8",
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      taichung: "大肚王國 (巴布拉十七社邦聯)",
      changhua: "半線社 (大肚王國南界)",
      nantou: "埔里水沙連各社",
      taipei: "凱達格蘭大加蚋社",
      new_taipei: "八里坌社 / 滬尾社",
      keelung: "雞籠社 (大雞籠島)",
      yilan: "噶瑪蘭三十六社",
      tainan: "西拉雅四大社 (新港/麻豆/蕭壠/目加溜灣)",
      kaohsiung: "打狗社 (馬卡道族)",
      pingtung: "瑯嶠十八社 (排灣斯卡羅)",
      penghu: "澎湖巡檢司 (1281年元代設治)",
      kinmen: "同安縣浯洲嶼",
      lienchiang: "閩江口馬祖諸島"
    },
    tacticalLabels: [
      { name: "大肚王國核心 (拍瀑拉白晝王邦聯)", lng: 120.58, lat: 24.16, color: "#064e3b", size: 13 },
      { name: "平埔凱達格蘭各社", lng: 121.52, lat: 25.05, color: "#065f46", size: 11 },
      { name: "西拉雅四大社", lng: 120.30, lat: 23.10, color: "#065f46", size: 11 },
      { name: "阿美/卑南祖居聖地", lng: 121.20, lat: 22.80, color: "#064e3b", size: 12 },
      { name: "澎湖巡檢司 (1281年大元置官)", lng: 119.57, lat: 23.57, color: "#78350f", size: 11 },
      { name: "夷州 (三國東吳衛溫將軍遠航抵達)", lng: 121.40, lat: 25.25, color: "#1e3a8a", size: 11 }
    ]
  },
  tw_dutch_spanish: {
    name: "大航海時代荷西與笨港拓墾 (1624 - 1662)",
    themeBadge: "熱蘭遮城·笨港拓墾",
    themeColor: "#ea580c",
    countyColors: {
      keelung: "#eab308", // 西班牙聖救主城 (Fort San Salvador)
      new_taipei: "#eab308", // 西班牙聖多明哥城 (紅毛城前身)
      taipei: "#fef08a",
      yilan: "#fde047",
      taoyuan: "#fde047",
      hsinchu_city: "#fbbf24",
      hsinchu_county: "#fbbf24",
      miaoli: "#fbbf24",
      taichung: "#059669", // 大肚王國抗荷
      changhua: "#059669",
      nantou: "#059669",
      yunlin: "#2563eb", // 顏思齊/鄭芝龍笨港十寨
      chiayi_city: "#2563eb",
      chiayi_county: "#2563eb",
      tainan: "#ea580c", // 荷蘭熱蘭遮城/普羅民遮城
      kaohsiung: "#c2410c", // 荷蘭長官打狗管轄
      pingtung: "#c2410c",
      hualien: "#6ee7b7",
      taitung: "#6ee7b7",
      penghu: "#ea580c", // 荷蘭東印度公司澎湖要塞
      kinmen: "#dc2626", // 鄭芝龍大明水師料羅灣
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      keelung: "西班牙雞籠聖救主城",
      new_taipei: "西班牙滬尾聖多明哥城",
      tainan: "荷蘭大員熱蘭遮城 (安平古堡)",
      yunlin: "笨港拓墾十寨 (顏思齊開闢)",
      chiayi_county: "諸羅笨港 (鄭芝龍部眾)",
      taichung: "大肚王國堅壁清野",
      penghu: "風櫃尾荷蘭城堡遺址",
      kinmen: "料羅灣海戰 (鄭芝龍大破荷艦)"
    },
    tacticalLabels: [
      { name: "荷蘭東印度公司 (熱蘭遮城/普羅民遮城)", lng: 120.16, lat: 23.00, color: "#7c2d12", size: 13 },
      { name: "西班牙聖多明哥城 (淡水雞籠)", lng: 121.50, lat: 25.18, color: "#854d0e", size: 12 },
      { name: "顏思齊·鄭芝龍笨港拓墾營寨", lng: 120.30, lat: 23.57, color: "#1e40af", size: 12 },
      { name: "郭懷一抗荷起義 (油車行血戰)", lng: 120.25, lat: 23.03, color: "#991b1b", size: 11 },
      { name: "大肚王國抗擊荷軍進犯", lng: 120.55, lat: 24.15, color: "#065f46", size: 11 },
      { name: "料羅灣大捷 (鄭芝龍擊沉荷蘭戰艦)", lng: 118.42, lat: 24.41, color: "#7f1d1d", size: 11 }
    ]
  },
  tw_tungning: {
    name: "明鄭東寧王國時期 (1662 - 1683)",
    themeBadge: "開臺聖王·東寧國都",
    themeColor: "#dc2626",
    countyColors: {
      tainan: "#b91c1c", // 承天府東都王城核心
      kaohsiung: "#dc2626", // 萬年縣 (鳳山左營屯田)
      pingtung: "#dc2626", // 萬年縣南境
      chiayi_county: "#dc2626", // 天興縣 (諸羅屯墾)
      chiayi_city: "#dc2626",
      yunlin: "#dc2626",
      changhua: "#ef4444", // 天興縣屯田
      taichung: "#ef4444",
      nantou: "#ef4444",
      miaoli: "#f87171",
      hsinchu_city: "#f87171", // 天興縣北路巡緝
      hsinchu_county: "#f87171",
      taoyuan: "#f87171",
      new_taipei: "#f87171",
      taipei: "#f87171",
      keelung: "#f87171",
      yilan: "#fca5a5",
      hualien: "#6ee7b7",
      taitung: "#6ee7b7",
      penghu: "#991b1b", // 劉國軒水師軍港天險
      kinmen: "#b91c1c", // 延平王出師起點
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      tainan: "明鄭東都承天府 (安平王宮/孔廟)",
      kaohsiung: "萬年縣鳳山治所 (軍屯)",
      chiayi_county: "天興縣治所 (諸羅軍屯)",
      penghu: "澎湖安撫司 (劉國軒水師大寨)",
      kinmen: "金門料羅灣 (延平王出師地)"
    },
    tacticalLabels: [
      { name: "明鄭王都承天府 (鄭成功受降立國)", lng: 120.16, lat: 23.00, color: "#7f1d1d", size: 13 },
      { name: "全臺首學 (陳永華建孔廟開科舉)", lng: 120.20, lat: 22.99, color: "#7f1d1d", size: 12 },
      { name: "天興縣軍屯 (陳永華開荒拓土)", lng: 120.35, lat: 23.40, color: "#991b1b", size: 12 },
      { name: "萬年縣左營軍屯 (鳳山糧倉)", lng: 120.30, lat: 22.68, color: "#991b1b", size: 12 },
      { name: "澎湖水師營 (東寧海疆鎖鑰)", lng: 119.56, lat: 23.35, color: "#7f1d1d", size: 11 },
      { name: "金門料羅灣 (大軍集結出發點)", lng: 118.42, lat: 24.41, color: "#991b1b", size: 11 }
    ]
  },
  tw_qing_early: {
    name: "清領前期渡臺拓墾時期 (1683 - 1874)",
    themeBadge: "一府三縣·鹿港艋舺",
    themeColor: "#d97706",
    countyColors: {
      tainan: "#a16207", // 臺灣府城
      kaohsiung: "#ca8a04", // 鳳山縣
      pingtung: "#ca8a04", // 鳳山縣南境
      chiayi_county: "#d97706", // 諸羅縣 (林爽文起義賜名嘉義)
      chiayi_city: "#d97706",
      yunlin: "#d97706",
      changhua: "#eab308", // 彰化縣 (八堡圳開闢)
      taichung: "#eab308", // 貓霧捒圳
      nantou: "#eab308",
      miaoli: "#fde047", // 淡水廳南界
      hsinchu_city: "#fde047", // 淡水廳竹塹城
      hsinchu_county: "#fde047",
      taoyuan: "#fde047",
      new_taipei: "#fef08a", // 瑠公圳灌溉
      taipei: "#fef08a", // 艋舺/大稻埕興起
      keelung: "#fef08a",
      yilan: "#84cc16", // 噶瑪蘭廳設治
      hualien: "#86efac",
      taitung: "#86efac",
      penghu: "#b45309", // 澎湖廳通判
      kinmen: "#3b82f6",
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      tainan: "大清臺灣府 (施琅平台設治)",
      chiayi_city: "諸羅縣 (乾隆賜名嘉義)",
      kaohsiung: "鳳山縣左營舊城",
      changhua: "彰化縣城 (八堡圳/鹿港)",
      hsinchu_city: "淡水廳竹塹石城",
      taipei: "艋舺三邑/同安祖師廟",
      yilan: "噶瑪蘭廳 (楊廷理開蘭)",
      penghu: "臺灣府澎湖廳通判"
    },
    tacticalLabels: [
      { name: "大清臺灣府城 (巡道總兵駐紮首府)", lng: 120.20, lat: 23.00, color: "#713f12", size: 13 },
      { name: "嘉義縣城 (林爽文天地會包圍血戰)", lng: 120.45, lat: 23.48, color: "#78350f", size: 12 },
      { name: "鴨母王朱一貴起義 (內門鴨母寮)", lng: 120.46, lat: 22.94, color: "#991b1b", size: 11 },
      { name: "一府二鹿三艋舺全盛興起", lng: 120.43, lat: 24.06, color: "#713f12", size: 12 },
      { name: "淡水廳竹塹石城 (北臺行政樞紐)", lng: 120.97, lat: 24.81, color: "#713f12", size: 11 },
      { name: "施琅平台設臺灣府 (康熙棄留疏)", lng: 119.57, lat: 23.57, color: "#1e3a8a", size: 11 }
    ]
  },
  tw_qing_late: {
    name: "自強建省與開山撫番時期 (1874 - 1895)",
    themeBadge: "銘傳建省·滬尾大捷",
    themeColor: "#7c3aed",
    countyColors: {
      taipei: "#5b21b6", // 臺灣省巡撫衙門 (臺北府城)
      new_taipei: "#6d28d9", // 滬尾淡水大捷
      keelung: "#6d28d9", // 現代基隆港口/煤礦
      taoyuan: "#7c3aed",
      hsinchu_city: "#7c3aed", // 中國第一客運鐵路起訖
      hsinchu_county: "#7c3aed",
      miaoli: "#8b5cf6",
      taichung: "#6d28d9", // 臺灣府 (原定省城橋仔頭)
      changhua: "#7c3aed",
      nantou: "#8b5cf6", // 八通關古道起點
      yunlin: "#8b5cf6", // 雲林縣新設
      chiayi_city: "#8b5cf6",
      chiayi_county: "#8b5cf6",
      tainan: "#5b21b6", // 臺南府 (南路總兵)
      kaohsiung: "#6d28d9", // 旗後砲台
      pingtung: "#7c3aed", // 恆春縣城/鵝鑾鼻燈塔
      yilan: "#8b5cf6",
      hualien: "#a855f7", // 臺東直隸州花蓮港
      taitung: "#a855f7", // 臺東直隸州卑南
      penghu: "#6d28d9", // 澎湖鎮總兵
      kinmen: "#3b82f6",
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      taipei: "臺灣省巡撫衙門 (臺北府城)",
      new_taipei: "滬尾砲台 (法軍敗退處)",
      keelung: "基隆二沙灣砲台 (海東要塞)",
      taichung: "臺灣府城 (橋仔頭新省城)",
      tainan: "臺南府城 (億載金城/安平砲台)",
      pingtung: "恆春古城 (沈葆楨建城)",
      taitung: "臺東直隸州衙門 (卑南)",
      hsinchu_city: "新竹火車站 (鐵路新竹終點)"
    },
    tacticalLabels: [
      { name: "臺灣巡撫衙門 (劉銘傳建省定都)", lng: 121.51, lat: 25.04, color: "#3b0764", size: 13 },
      { name: "中國第一條客運鐵路 (基隆—新竹)", lng: 121.30, lat: 24.95, color: "#4c1d95", size: 11 },
      { name: "牡丹社事件 (沈葆楨開山撫番修城)", lng: 120.74, lat: 22.00, color: "#7f1d1d", size: 11 },
      { name: "八通關古道 (沈葆楨開拓後山中路)", lng: 121.00, lat: 23.60, color: "#4c1d95", size: 11 }
    ]
  },
  tw_japanese: {
    name: "乙未抗日與文化啟蒙時期 (1895 - 1945)",
    themeBadge: "八卦血戰·文協啟蒙",
    themeColor: "#db2777",
    countyColors: {
      taipei: "#9d174d", // 臺北州 (總督府/大稻埕文協)
      new_taipei: "#be185d",
      keelung: "#be185d",
      yilan: "#be185d",
      taoyuan: "#db2777", // 新竹州
      hsinchu_city: "#db2777",
      hsinchu_county: "#db2777",
      miaoli: "#be185d", // 羅福星苗栗起義
      taichung: "#9d174d", // 臺中州 (林獻堂霧峰/民眾黨)
      changhua: "#be185d", // 八卦山之役/賴和仁醫
      nantou: "#881337", // 莫那魯道霧社起義
      yunlin: "#db2777", // 臺南州 (余清芳噍吧哖)
      chiayi_city: "#db2777",
      chiayi_county: "#db2777",
      tainan: "#9d174d",
      kaohsiung: "#be185d", // 高雄州
      pingtung: "#db2777",
      hualien: "#f472b6", // 花蓮港廳
      taitung: "#f472b6", // 臺東廳
      penghu: "#db2777", // 澎湖廳
      kinmen: "#3b82f6",
      lienchiang: "#94a3b8"
    },
    historicalNames: {
      taipei: "臺北州大稻埕 (臺灣文化協會)",
      changhua: "八卦山乙未烈士祠 / 賴和醫館",
      taichung: "霧峰林家 (林獻堂議會請願)",
      nantou: "霧社馬赫坡社 (莫那魯道紀念碑)",
      tainan: "噍吧哖玉井 (余清芳西來庵事件)",
      miaoli: "苗栗起義紀念碑 (羅福星烈士)"
    },
    tacticalLabels: [
      { name: "臺灣文化協會·臺灣民眾黨 (蔣渭水/林獻堂)", lng: 121.51, lat: 25.05, color: "#701a75", size: 12 },
      { name: "莫那·魯道霧社起義 (賽德克族尊嚴抗暴)", lng: 121.13, lat: 24.02, color: "#881337", size: 11 },
      { name: "臺灣新文學之父 (賴和彰化仁心醫世)", lng: 120.54, lat: 24.07, color: "#701a75", size: 11 },
      { name: "噍吧哖西來庵事件 (余清芳武裝起義)", lng: 120.46, lat: 23.12, color: "#881337", size: 11 },
      { name: "羅福星苗栗起義 (辛亥革命光照臺灣)", lng: 120.82, lat: 24.56, color: "#881337", size: 11 }
    ]
  },
  tw_postwar: {
    name: "戰後復原與臺海防衛時期 (1945 - 1970)",
    themeBadge: "光復回歸·古寧八二三",
    themeColor: "#2563eb",
    countyColors: {
      taipei: "#1e40af", // 中華民國中央政府 (總統府/中山堂)
      new_taipei: "#1d4ed8",
      keelung: "#1d4ed8",
      yilan: "#2563eb",
      taoyuan: "#2563eb",
      hsinchu_city: "#2563eb",
      hsinchu_county: "#2563eb",
      miaoli: "#2563eb",
      taichung: "#1d4ed8",
      changhua: "#2563eb",
      nantou: "#3b82f6",
      yunlin: "#3b82f6",
      chiayi_city: "#2563eb",
      chiayi_county: "#2563eb",
      tainan: "#1d4ed8",
      kaohsiung: "#1e40af", // 左營軍港海軍基地
      pingtung: "#2563eb",
      hualien: "#60a5fa",
      taitung: "#60a5fa",
      penghu: "#1d4ed8", // 馬公海軍基地
      kinmen: "#b91c1c", // 古寧頭大捷 / 八二三戰地
      lienchiang: "#b91c1c" // 馬祖列島前線防衛
    },
    historicalNames: {
      taipei: "臺北中山堂 (臺灣光復受降典禮)",
      kinmen: "金門防衛司令部 (太武山擎天廳)",
      kaohsiung: "左營海軍艦隊軍港基地",
      penghu: "澎湖馬公防衛指揮部",
      lienchiang: "馬祖南竿北竿前線要塞"
    },
    tacticalLabels: [
      { name: "臺灣光復受降典禮 (臺北公會堂中山堂)", lng: 121.51, lat: 25.04, color: "#1e3a8a", size: 12 },
      { name: "三七五減租與耕者有其田 (陳誠推動土地改革)", lng: 120.30, lat: 23.50, color: "#1e40af", size: 11 },
      { name: "九年國民義務教育推行 (培育工程師基石)", lng: 120.68, lat: 24.15, color: "#1e40af", size: 11 },
      { name: "發行新臺幣穩定經濟物價 (嚴家淦幣改)", lng: 121.51, lat: 25.03, color: "#1e40af", size: 11 }
    ]
  },
  tw_modern: {
    name: "科技矽島與民主轉型時期 (1970 - 現代)",
    themeBadge: "十大建設·護國神山",
    themeColor: "#0891b2",
    countyColors: {
      taipei: "#0e7490", // 首都政經民主中心
      new_taipei: "#0891b2",
      keelung: "#0891b2",
      yilan: "#06b6d4",
      taoyuan: "#0891b2", // 桃園國際機場 (十大建設)
      hsinchu_city: "#164e63", // 新竹科學園區/台積電總部
      hsinchu_county: "#164e63", // 工研院/竹北生醫
      miaoli: "#0891b2", // 竹科竹南園區
      taichung: "#0e7490", // 中部科學園區/臺中港
      changhua: "#0891b2",
      nantou: "#06b6d4",
      yunlin: "#0891b2", // 六輕石化重鎮 (王永慶)
      chiayi_city: "#0891b2",
      chiayi_county: "#0891b2", // 嘉義科學園區
      tainan: "#164e63", // 南部科學園區 (台積電先進製程)
      kaohsiung: "#0e7490", // 中鋼/中船大造船廠
      pingtung: "#0891b2",
      hualien: "#22d3ee", // 北迴鐵路現代化
      taitung: "#22d3ee",
      penghu: "#0891b2",
      kinmen: "#0e7490",
      lienchiang: "#0e7490"
    },
    historicalNames: {
      hsinchu_city: "新竹科學園區 (台積電全球研發中心)",
      taipei: "總統府 (李登輝解嚴直選民主中心)",
      taoyuan: "桃園國際機場 (十大建設門戶)",
      kaohsiung: "中國鋼鐵 / 高雄港貨櫃樞紐",
      tainan: "南部科學園區 (3奈米晶圓旗艦廠)",
      yunlin: "麥寮六輕工業區 (台塑集團王永慶)"
    },
    tacticalLabels: [
      { name: "新竹科學工業園區 (李國鼎/孫運璿奠基)", lng: 120.99, lat: 24.78, color: "#164e63", size: 13 },
      { name: "台積電 TSMC (張忠謀創立晶圓代工矽盾)", lng: 121.01, lat: 24.77, color: "#0891b2", size: 13 },
      { name: "十大建設 (蔣經國推動突破能源危機)", lng: 121.23, lat: 25.07, color: "#0e7490", size: 12 },
      { name: "解除戒嚴與開放探親 (1987年民主啟航)", lng: 121.51, lat: 25.03, color: "#155e75", size: 12 },
      { name: "公民直選總統 (李登輝先生寧靜革命)", lng: 121.51, lat: 25.04, color: "#164e63", size: 12 }
    ]
  }
};

export const TaiwanAtlasMap = ({
  activeTaiwanEraId = 'tw_tungning',
  onSelectTaiwanEraId,
  events = [],
  allEvents = [],
  battles = [],
  selectedEvent,
  selectedBattle,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
  onClearSearch,
  isCinemaMode = false,
  onToggleCinemaMode,
}) => {
  const currentScheme = TAIWAN_ERA_COUNTY_SCHEMES[activeTaiwanEraId] || TAIWAN_ERA_COUNTY_SCHEMES.tw_tungning;
  const [hoveredCounty, setHoveredCounty] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapContainerRef = useRef(null);

  // Filter battles strictly for this era
  const currentEraBattles = battles.filter((b) => {
    const allowed = ERA_BATTLE_IDS[activeTaiwanEraId] || [];
    return allowed.includes(b.id) || selectedEvent?.battleId === b.id || selectedBattle?.id === b.id;
  });

  // Filter events strictly for this era
  const currentEraEvents = events.filter((e) => {
    return e.eraId === activeTaiwanEraId || selectedEvent?.id === e.id;
  });

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Position calculation via GIS Mercator
  const getMarkerCoords = (item) => {
    if (item.coordinates && Array.isArray(item.coordinates)) {
      return projectLngLatToTaiwanMap(item.coordinates[0], item.coordinates[1]);
    }
    return [550, 360];
  };

  return (
    <div className="relative w-full h-full max-h-full min-h-0 rounded-xl overflow-hidden border-2 border-[#8c7355] shadow-2xl bg-[#f5eedb] select-none flex flex-col font-serif">
      {/* 1. Header Toolbar with Chronological Taiwan Era Tabs */}
      <div className="px-3 py-2 bg-[#2b2117] border-b-2 border-[#8c7355] flex flex-wrap items-center justify-between gap-2 text-xs text-[#f5ebd9] shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[#e8c89b] font-bold text-xs flex items-center gap-1 mr-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            臺灣紀元：
          </span>
          {TAIWAN_LENS_ERAS.map((era) => {
            const isActive = era.id === activeTaiwanEraId;
            return (
              <button
                key={era.id}
                onClick={() => {
                  if (onClearSearch) onClearSearch();
                  if (onSelectTaiwanEraId) onSelectTaiwanEraId(era.id);
                }}
                className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-[#d97706] text-white font-bold shadow-md ring-1 ring-[#fef08a]'
                    : 'bg-[#3d3022] text-[#d6c5af] hover:bg-[#53412d] hover:text-white'
                }`}
              >
                {era.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Map Graphic (Authentic GIS Coastlines & Boundaries of Taiwan) */}
      <div
        ref={mapContainerRef}
        className="relative flex-1 min-h-0 overflow-y-auto bg-[#f4ecd8] p-3 sm:p-4 flex flex-col items-center"
      >
        {/* Top-Left Classical Seal Title Stamp */}
        <div className={`w-full ${isCinemaMode ? 'max-w-[1280px]' : 'max-w-[820px]'} mb-2 flex items-center justify-between px-2 text-xs text-[#2b2117]`}>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#8c2d19] text-[#fef08a] font-bold font-serif text-xs border border-[#d97706]/50 shadow-md">
              {currentScheme.themeBadge}
            </span>
            <span className="text-xs font-bold font-serif text-[#44382c]">
              {currentScheme.name}
            </span>
          </div>
          {hoveredCounty && (
            <span className="text-xs font-bold text-[#8c2d19] bg-[#ebd8b7] px-2.5 py-0.5 rounded border border-[#8c7355]/40 shadow-sm">
              {hoveredCounty}
            </span>
          )}
        </div>

        {/* Map Canvas with Authentic GIS Boundaries (820 x 720) */}
        <div
          className={`relative w-full ${isCinemaMode ? 'max-w-[1280px]' : 'max-w-[820px]'} aspect-[820/720] shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-[#8c7355] bg-[#efe5cc] cursor-grab active:cursor-grabbing`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Zoom / Pan Controls (Top-Right) */}
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-[#1a140e]/85 backdrop-blur-md p-1 rounded-lg border border-[#8c7355] shadow-lg">
            {onToggleCinemaMode && (
              <>
                <button
                  onClick={onToggleCinemaMode}
                  title={isCinemaMode ? '返回雙欄對照模式 (顯示右側年表)' : '開啟劇院滿版地圖模式 (隱藏右側年表)'}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                    isCinemaMode
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-[#fef08a] hover:bg-[#53412d] hover:text-white'
                  }`}
                >
                  {isCinemaMode ? (
                    <>
                      <Minimize2 className="w-3 h-3" />
                      <span>雙欄模式</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3 h-3" />
                      <span>劇院滿版</span>
                    </>
                  )}
                </button>
                <div className="w-px h-4 bg-[#8c7355]/50 mx-0.5" />
              </>
            )}
            <button
              onClick={handleZoomIn}
              title="放大地圖"
              className="p-1.5 rounded text-[#f5ebd9] hover:bg-[#53412d] hover:text-amber-300 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="縮小地圖"
              className="p-1.5 rounded text-[#f5ebd9] hover:bg-[#53412d] hover:text-amber-300 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              title="重置視角"
              className="p-1.5 rounded text-[#f5ebd9] hover:bg-[#53412d] hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <svg
            viewBox="0 0 820 720"
            className="w-full h-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Antique Rice Paper Ocean Sea Floor */}
            <rect x="0" y="0" width="820" height="720" fill="#eedfc5" />

            {/* Classical Sea Typography */}
            <g fill="#9c8a6f" fontSize="13" fontWeight="bold" letterSpacing="6" className="pointer-events-none select-none">
              <text x="210" y="240">臺 灣 海 峽</text>
              <text x="735" y="420" transform="rotate(90 735,420)">太 平 洋</text>
              <text x="610" y="90">東 海</text>
              <text x="430" y="700">巴 士 海 峽</text>
              <text x="60" y="210" fontSize="10" letterSpacing="2">九龍江口·廈門海灣</text>
            </g>

            {/* Subtle Continental Coastline Hint at Left Edge */}
            <path
              d="M 15,0 L 25,120 L 18,240 L 32,350 L 20,490 L 15,720 L 0,720 L 0,0 Z"
              fill="#e3d6b8"
              stroke="#baa98b"
              strokeWidth="1.2"
              className="pointer-events-none"
            />
            <text x="32" y="110" fill="#a89a80" fontSize="10" fontWeight="bold" className="pointer-events-none">
              福建海疆沿岸
            </text>

            {/* 1. AUTHENTIC 22 COUNTIES OF TAIWAN (Official GIS Geometries) */}
            <g stroke="#261c14" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
              {Object.entries(TAIWAN_COUNTY_PATHS).map(([countyKey, countyItem]) => {
                const fillCol = currentScheme.countyColors[countyKey] || "#eab308";
                const histName = currentScheme.historicalNames[countyKey] || countyItem.name;
                const isHovered = hoveredCounty === histName;

                return (
                  <path
                    key={countyKey}
                    d={countyItem.d}
                    fill={fillCol}
                    className="cursor-pointer transition-colors duration-150"
                    style={{
                      filter: isHovered ? 'brightness(1.15) drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))' : 'none',
                    }}
                    onMouseEnter={() => setHoveredCounty(`${countyItem.name} — ${histName}`)}
                    onMouseLeave={() => setHoveredCounty(null)}
                  />
                );
              })}
            </g>

            {/* 2. REAL RIVERS OF TAIWAN (濁水溪、淡水河、高屏溪、曾文溪) */}
            <g fill="none" stroke="#0284c7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" className="pointer-events-none">
              {/* 淡水河流域 */}
              <path d="M 640,165 Q 625,175 605,178 Q 585,170 575,152" />
              {/* 濁水溪流域 (長流貫穿) */}
              <path d="M 590,345 Q 540,350 490,356 Q 440,362 388,368" strokeWidth="3" />
              {/* 曾文溪 */}
              <path d="M 570,430 Q 520,440 460,455 Q 405,468 375,475" strokeWidth="2.2" />
              {/* 高屏溪 */}
              <path d="M 560,490 Q 520,520 480,545 Q 445,570 410,580" strokeWidth="2.6" />
            </g>

            {/* 3. CENTRAL MOUNTAIN RANGE EMBOSSING (中央山脈脊梁) */}
            <g fill="none" stroke="#2c5b36" strokeWidth="3.2" strokeLinecap="round" opacity="0.45" className="pointer-events-none">
              <path d="M 630,220 Q 600,270 580,330 Q 565,400 545,470 Q 525,540 495,610" />
              <path d="M 605,245 Q 570,290 545,345 Q 525,410 500,480" strokeWidth="2.4" stroke="#4a7c59" />
              <path d="M 645,280 Q 630,360 610,440 Q 585,520 545,585" strokeWidth="2.2" stroke="#4a7c59" />
            </g>
            <text x="580" y="410" fill="#14532d" fontSize="10" fontWeight="bold" opacity="0.75" transform="rotate(72 580,410)" className="pointer-events-none select-none">
              中 央 山 脈
            </text>
            <text x="560" y="375" fill="#1e3a8a" fontSize="8.5" fontWeight="bold" opacity="0.8" className="pointer-events-none select-none">
              ▲ 玉山 (3952m)
            </text>

            {/* 4. HISTORICAL CALLIGRAPHY LABELS (Era-Specific Positions) */}
            <g fontWeight="bold" className="pointer-events-none select-none font-serif">
              {(currentScheme.tacticalLabels || []).map((lbl, idx) => {
                const [lx, ly] = projectLngLatToTaiwanMap(lbl.lng, lbl.lat);
                return (
                  <text
                    key={idx}
                    x={lx}
                    y={ly}
                    fill={lbl.color}
                    fontSize={lbl.size}
                    textAnchor="middle"
                    stroke="#ffffff"
                    strokeWidth="3"
                    paintOrder="stroke"
                    letterSpacing="1.5"
                  >
                    {lbl.name}
                  </text>
                );
              })}
            </g>

            {/* 5. TAIWAN HISTORICAL BATTLES MARKERS */}
            {currentEraBattles.map((bat, batIdx) => {
              const [bx, by] = getMarkerCoords(bat);
              const isSelected = selectedBattle?.id === bat.id || selectedEvent?.battleId === bat.id;

              // Collision-free coordinate calculation:
              // For Kinmen & offshore islands on the western edge (bx < 180):
              const isOffshoreWest = bx < 180;
              let labelX = bx;
              let labelY = by - 14;
              let textAnchor = 'middle';

              if (isOffshoreWest) {
                // Place labels cleanly to the right of the battle marker icons
                labelX = bx + 16;
                textAnchor = 'start';
                if (bat.id === 'bat_tw_guningtou_1949') {
                  labelY = by - 7;
                } else if (bat.id === 'bat_tw_823_1958') {
                  labelY = by + 18;
                } else if (bat.id === 'bat_tw_daerdan_1950') {
                  labelY = by + 5;
                } else {
                  labelY = by + (batIdx % 2 === 0 ? -7 : 17);
                }
              } else if (bat.id === 'bat_tw_tamsui_1884') {
                // Offset Tamsui to the west
                labelX = bx - 14;
                textAnchor = 'end';
                labelY = by - 4;
              } else if (bat.id === 'bat_tw_keelung_1884' || bat.id === 'bat_tw_keelung_1642') {
                // Offset Keelung to the east
                labelX = bx + 14;
                textAnchor = 'start';
                labelY = by - 4;
              }

              const battleShortName = bat.name.split(' ')[0];

              return (
                <g
                  key={bat.id}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectBattle) onSelectBattle(bat);
                  }}
                >
                  {/* Selection Ring (Static, Crisp, No Ping Halo) */}
                  {isSelected && (
                    <circle
                      cx={bx}
                      cy={by}
                      r="15"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Battle Emblem Badge (Solid Antique Red) */}
                  <circle
                    cx={bx}
                    cy={by}
                    r={isSelected ? 11 : 9}
                    fill={isSelected ? '#991b1b' : '#be123c'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 2}
                    className="group-hover:scale-125 transition-transform"
                  />

                  {/* Crossed Swords Symbol */}
                  <text
                    x={bx}
                    y={by + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isSelected ? '10' : '8.5'}
                    fontWeight="bold"
                    className="pointer-events-none select-none"
                  >
                    ⚔
                  </text>

                  {/* Battle Name Text Label (Crisp stroke halo, perfectly positioned) */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    fill="#7f1d1d"
                    fontSize="11"
                    fontWeight="bold"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    paintOrder="stroke"
                    letterSpacing="0.5"
                    className="pointer-events-none select-none"
                  >
                    {battleShortName}
                  </text>
                </g>
              );
            })}

            {/* 6. TAIWAN HISTORIC EVENTS MARKERS */}
            {currentEraEvents.map((evt) => {
              const [ex, ey] = getMarkerCoords(evt);
              const isSelected = selectedEvent?.id === evt.id;
              const isOffshoreWest = ex < 180;

              return (
                <g
                  key={evt.id}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectEvent) onSelectEvent(evt);
                  }}
                >
                  {/* Selected Event Ring (Stationary, Crisp, No Pulse Halo) */}
                  {isSelected && (
                    <circle
                      cx={ex}
                      cy={ey}
                      r="10"
                      fill="none"
                      stroke="#b45309"
                      strokeWidth="2"
                    />
                  )}

                  {/* Event Marker Dot */}
                  <circle
                    cx={ex}
                    cy={ey}
                    r={isSelected ? 6.5 : 4.5}
                    fill={isSelected ? '#d97706' : '#047857'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform"
                  />

                  {/* Event Title Label */}
                  {isSelected && (
                    <text
                      x={isOffshoreWest ? ex + 16 : ex}
                      y={isOffshoreWest ? ey + 34 : ey + 17}
                      textAnchor={isOffshoreWest ? 'start' : 'middle'}
                      fill="#78350f"
                      fontSize="10.5"
                      fontWeight="bold"
                      stroke="#ffffff"
                      strokeWidth="2.8"
                      paintOrder="stroke"
                      className="pointer-events-none select-none"
                    >
                      ★ {evt.title.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 3. Event Detail & Tactical Intelligence Panel (Below Map) */}
        {selectedEvent && (
          <div className={`w-full ${isCinemaMode ? 'max-w-[1280px]' : 'max-w-[820px]'} mt-3 p-3.5 bg-[#fdfbf7] border-2 border-[#8c7355] rounded-xl shadow-md text-[#2b2117] flex flex-col gap-2`}>
            <div className="flex items-center justify-between border-b border-[#8c7355]/30 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#8c2d19] text-[#fef08a] font-bold font-serif text-xs shadow-sm">
                  {selectedEvent.yearDisplay || `${selectedEvent.year}年`}
                </span>
                <h3 className="font-bold text-sm text-[#78350f]">
                  {selectedEvent.title}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#8c7355] font-bold">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{selectedEvent.locationNameModern || selectedEvent.locationNameAncient}</span>
              </div>
            </div>

            <p className="text-xs text-[#44382c] leading-relaxed">
              {selectedEvent.detail || selectedEvent.summary}
            </p>

            {selectedEvent.tags && selectedEvent.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {selectedEvent.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#f4ecd8] border border-[#d6c5af] text-[#78350f] font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
