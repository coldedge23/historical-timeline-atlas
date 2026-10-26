import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Swords,
  Clock,
  MapPin,
  Sparkles
} from './Icons.js';
import { TAIWAN_LENS_ERAS } from '../data/taiwanLensData.js';

// Realistic Taiwan Geographical Path Datasets (Dedicated Taiwan ViewBox: 0 0 760 670)
// High precision representation of Taiwan Main Island, Penghu, Kinmen & Matsu
export const TAIWAN_DETAILED_PATHS = {
  // 1. 北部區域 (基隆、臺北府城、大稻埕、滬尾淡水、宜蘭平原)
  north: "M 578,128 C 588,125 604,136 620,150 C 632,160 635,178 625,195 C 618,206 605,218 588,222 C 570,226 550,215 542,202 C 536,192 542,176 552,160 C 560,146 568,132 578,128 Z",
  
  // 2. 桃竹苗區域 (竹塹、苗栗銅鑼)
  hsinchu_miaoli: "M 542,202 C 550,215 570,226 588,222 C 576,238 565,255 548,266 C 532,276 512,275 496,268 C 478,258 472,238 488,218 C 504,198 528,190 542,202 Z",
  
  // 3. 中部區域 (大肚社、臺中大里杙、彰化八卦山、鹿港、南投霧社)
  central: "M 496,268 C 512,275 532,276 548,266 C 558,285 562,310 550,332 C 538,352 516,362 486,365 C 452,368 422,352 418,335 C 412,312 432,286 465,274 C 478,269 488,267 496,268 Z",
  
  // 4. 雲嘉區域 (笨港北港、諸羅嘉義、阿里山)
  yunjia: "M 486,365 C 516,362 538,352 550,332 C 556,350 554,375 540,396 C 525,418 495,432 458,435 C 420,438 390,422 388,405 C 385,385 410,366 450,364 C 468,363 478,364 486,365 Z",
  
  // 5. 南部區域 (承天府赤崁安平、打狗高雄、鳳山、恆春瑯嶠牡丹社)
  south: "M 458,435 C 495,432 525,418 540,396 C 550,420 548,460 535,502 C 520,545 498,585 470,622 C 458,618 446,585 435,550 C 418,495 385,465 375,455 C 368,448 392,442 425,438 C 445,436 452,435 458,435 Z",
  
  // 6. 東部區域 (花蓮秀姑巒、臺東卑南、後山奇萊)
  east: "M 625,195 C 638,225 642,270 635,320 C 628,370 605,430 575,488 C 555,528 535,568 470,622 C 498,585 520,545 535,502 C 548,460 550,420 540,396 C 554,375 556,350 550,332 C 562,310 558,285 548,266 C 565,255 576,238 588,222 C 605,218 618,206 625,195 Z",

  // 7. 澎湖群島 (媽宮、八罩島、白沙、西嶼)
  penghu: "M 252,370 C 262,364 274,372 268,385 C 262,396 248,394 246,380 Z M 274,360 C 280,356 286,362 282,368 C 278,374 272,370 274,360 Z M 256,400 C 264,396 270,404 265,412 C 258,418 250,412 256,400 Z",

  // 8. 金門群島 (大金門、小金門、古寧頭、太武山)
  kinmen: "M 52,246 C 65,238 82,242 88,252 C 92,260 84,272 70,270 C 58,268 48,258 52,246 Z M 38,256 C 44,252 48,258 45,264 C 42,268 36,266 38,256 Z",

  // 9. 馬祖列島 (南竿、北竿、東莒)
  matsu: "M 285,42 C 292,38 298,44 294,50 C 288,54 282,48 285,42 Z M 304,32 C 310,28 316,34 312,40 C 306,44 300,38 304,32 Z",

  // 10. 綠島與蘭嶼
  offshore_islands: "M 586,515 C 592,512 596,518 593,524 C 588,528 584,522 586,515 Z M 598,602 C 606,596 612,604 608,612 C 602,618 594,612 598,602 Z"
};

// Colors and Warlord labels for the 8 Taiwan Eras
export const TAIWAN_ERA_PALETTES = {
  tw_prehistoric: {
    name: "南島大肚王國時期",
    fillColor: "#10b981",
    subFills: {
      north: "#34d399",
      hsinchu_miaoli: "#10b981",
      central: "#059669", // 大肚王國拍瀑拉核心
      yunjia: "#10b981",
      south: "#34d399",
      east: "#059669", // 南島原住民族阿美卑南
      penghu: "#fbbf24", // 澎湖巡檢司
      kinmen: "#94a3b8",
      matsu: "#94a3b8",
    },
    labels: [
      { name: "大肚王國 (巴布拉十七社邦聯)", pos: [450, 310], color: "#064e3b", size: 13 },
      { name: "平埔凱達格蘭各社", pos: [580, 160], color: "#065f46", size: 11 },
      { name: "西拉雅族三大社", pos: [430, 480], color: "#065f46", size: 11 },
      { name: "阿美/卑南/排灣祖居地", pos: [610, 420], color: "#064e3b", size: 12 },
      { name: "澎湖巡檢司 (1281年大元設治)", pos: [260, 345], color: "#854d0e", size: 11 },
      { name: "夷州 (三國東吳衛溫訪察)", pos: [500, 140], color: "#1e3a8a", size: 11 },
    ]
  },
  tw_dutch_spanish: {
    name: "大航海荷西與笨港拓墾時期",
    fillColor: "#f59e0b",
    subFills: {
      north: "#fde047", // 西班牙聖多明哥城
      hsinchu_miaoli: "#fbbf24",
      central: "#10b981", // 大肚王國抗荷
      yunjia: "#60a5fa", // 顏思齊鄭芝龍笨港開拓
      south: "#f97316", // 荷蘭東印度公司熱蘭遮城
      east: "#34d399",
      penghu: "#f97316", // 荷蘭轉口貿易站
      kinmen: "#3b82f6", // 鄭芝龍明朝水師
      matsu: "#94a3b8",
    },
    labels: [
      { name: "西班牙聖多明哥城 (基隆淡水)", pos: [595, 145], color: "#854d0e", size: 12 },
      { name: "荷蘭東印度公司 (熱蘭遮城/赤崁樓)", pos: [380, 480], color: "#7c2d12", size: 13 },
      { name: "笨港拓墾 (顏思齊/鄭芝龍開闢)", pos: [405, 385], color: "#1e40af", size: 12 },
      { name: "大肚王國堅壁清野", pos: [490, 310], color: "#065f46", size: 11 },
      { name: "金門料羅灣水師大捷 (鄭芝龍)", pos: [70, 280], color: "#1e3a8a", size: 11 },
    ]
  },
  tw_tungning: {
    name: "明鄭東寧王國時期",
    fillColor: "#ef4444",
    subFills: {
      north: "#f87171", // 天興縣北路
      hsinchu_miaoli: "#ef4444",
      central: "#ef4444", // 軍屯開荒
      yunjia: "#dc2626",
      south: "#b91c1c", // 承天府王城核心
      east: "#fca5a5",
      penghu: "#dc2626", // 劉國軒水師要塞
      kinmen: "#dc2626", // 鄭成功出征出發地
      matsu: "#94a3b8",
    },
    labels: [
      { name: "明鄭承天府 (安平王都·鄭成功)", pos: [380, 475], color: "#7f1d1d", size: 14 },
      { name: "天興縣 (陳永華軍屯拓墾)", pos: [450, 330], color: "#991b1b", size: 12 },
      { name: "萬年縣 (鳳山左營屯田)", pos: [420, 530], color: "#991b1b", size: 12 },
      { name: "全臺首學 (臺南孔廟國子監)", pos: [390, 495], color: "#7f1d1d", size: 11 },
      { name: "澎湖水師大寨 (劉國軒防線)", pos: [260, 345], color: "#991b1b", size: 11 },
      { name: "金門料羅灣出征起點", pos: [70, 280], color: "#991b1b", size: 11 },
    ]
  },
  tw_qing_early: {
    name: "清領前期渡臺拓墾時期",
    fillColor: "#eab308",
    subFills: {
      north: "#fef08a", // 淡水廳
      hsinchu_miaoli: "#fde047",
      central: "#eab308", // 彰化縣八卦山
      yunjia: "#ca8a04", // 諸羅縣嘉義
      south: "#a16207", // 臺灣府城
      east: "#86efac",
      penghu: "#ca8a04", // 澎湖廳
      kinmen: "#3b82f6",
      matsu: "#94a3b8",
    },
    labels: [
      { name: "大清臺灣府 (施琅平台設治)", pos: [380, 475], color: "#713f12", size: 13 },
      { name: "諸羅縣 (林爽文起義/賜名嘉義)", pos: [420, 395], color: "#854d0e", size: 12 },
      { name: "鴨母王朱一貴起義 (內門鴨母寮)", pos: [440, 500], color: "#991b1b", size: 11 },
      { name: "一府二鹿三艋舺繁榮", pos: [415, 305], color: "#713f12", size: 12 },
      { name: "艋舺開墾與水利八堡圳", pos: [570, 175], color: "#713f12", size: 11 },
    ]
  },
  tw_qing_late: {
    name: "自強建省開山撫番時期",
    fillColor: "#8b5cf6",
    subFills: {
      north: "#a78bfa", // 臺北府/巡撫衙門
      hsinchu_miaoli: "#8b5cf6", // 第一客運鐵路
      central: "#7c3aed", // 臺灣府 (臺中)
      yunjia: "#6d28d9",
      south: "#5b21b6", // 臺南府
      east: "#c084fc", // 臺東直隸州/開山撫番
      penghu: "#7c3aed",
      kinmen: "#3b82f6",
      matsu: "#94a3b8",
    },
    labels: [
      { name: "臺灣省巡撫衙門 (劉銘傳建省)", pos: [575, 165], color: "#3b0764", size: 13 },
      { name: "滬尾淡水大捷 (中法保臺)", pos: [565, 125], color: "#1e3a8a", size: 12 },
      { name: "中國第一客運鐵路 (基隆—新竹)", pos: [530, 185], color: "#4c1d95", size: 11 },
      { name: "牡丹社事件 (沈葆楨建億載金城)", pos: [460, 610], color: "#7f1d1d", size: 11 },
      { name: "八通關古道/開山撫番", pos: [530, 360], color: "#4c1d95", size: 11 },
    ]
  },
  tw_japanese: {
    name: "乙未抗日與文化啟蒙時期",
    fillColor: "#ec4899",
    subFills: {
      north: "#f472b6", // 臺北州
      hsinchu_miaoli: "#ec4899", // 新竹州/羅福星苗栗
      central: "#db2777", // 臺中州/八卦山/霧社
      yunjia: "#be185d", // 臺南州/余清芳噍吧哖
      south: "#9d174d", // 高雄州
      east: "#f9a8d4", // 花蓮港廳/臺東廳
      penghu: "#db2777", // 澎湖廳
      kinmen: "#3b82f6",
      matsu: "#94a3b8",
    },
    labels: [
      { name: "八卦山抗日大血戰 (吳湯興/徐驤)", pos: [420, 315], color: "#831843", size: 13 },
      { name: "臺灣文化協會·臺灣民眾黨 (蔣渭水/林獻堂)", pos: [575, 165], color: "#701a75", size: 13 },
      { name: "莫那·魯道霧社起義 (賽德克族)", pos: [530, 305], color: "#881337", size: 12 },
      { name: "臺灣新文學之父 (賴和彰化仁醫)", pos: [415, 335], color: "#701a75", size: 11 },
      { name: "西來庵噍吧哖事件 (余清芳起義)", pos: [430, 460], color: "#831843", size: 11 },
      { name: "苗栗抗日事件 (羅福星烈士)", pos: [480, 245], color: "#831843", size: 11 },
    ]
  },
  tw_postwar: {
    id: "tw_postwar",
    name: "戰後復原與臺海防衛時期",
    fillColor: "#3b82f6",
    subFills: {
      north: "#60a5fa",
      hsinchu_miaoli: "#3b82f6",
      central: "#2563eb",
      yunjia: "#1d4ed8",
      south: "#1e40af",
      east: "#93c5fd",
      penghu: "#2563eb",
      kinmen: "#b91c1c", // 古寧頭/八二三金門戰地
      matsu: "#b91c1c", // 馬祖前線
    },
    labels: [
      { name: "臺灣光復受降典禮 (臺北中山堂)", pos: [575, 165], color: "#1e3a8a", size: 13 },
      { name: "古寧頭戰役大捷 (全殲登陸敵軍)", pos: [70, 245], color: "#991b1b", size: 13 },
      { name: "八二三臺海砲戰 (確立海峽中線)", pos: [70, 275], color: "#7f1d1d", size: 13 },
      { name: "三七五減租與耕者有其田 (陳誠)", pos: [420, 420], color: "#1e40af", size: 12 },
      { name: "九年國民義務教育推行", pos: [460, 270], color: "#1e40af", size: 11 },
      { name: "新臺幣發行穩定經濟 (嚴家淦)", pos: [540, 195], color: "#1e40af", size: 11 },
    ]
  },
  tw_modern: {
    id: "tw_modern",
    name: "科技矽島與民主轉型時期",
    fillColor: "#06b6d4",
    subFills: {
      north: "#22d3ee",
      hsinchu_miaoli: "#0891b2", // 新竹科學園區/台積電
      central: "#0e7490", // 中部科學園區
      yunjia: "#155e75",
      south: "#164e63", // 南部科學園區
      east: "#67e8f9",
      penghu: "#0891b2",
      kinmen: "#0e7490",
      matsu: "#0e7490",
    },
    labels: [
      { name: "新竹科學園區·台積電 (張忠謀/李國鼎)", pos: [495, 205], color: "#164e63", size: 13 },
      { name: "十大建設·中山高速公路 (蔣經國/孫運璿)", pos: [430, 360], color: "#0e7490", size: 13 },
      { name: "解除戒嚴令與開放探親 (1987)", pos: [575, 155], color: "#155e75", size: 12 },
      { name: "公民直選總統·民主先生 (李登輝)", pos: [575, 180], color: "#164e63", size: 12 },
      { name: "臺灣護國神山矽盾 (全球半導體樞紐)", pos: [380, 520], color: "#155e75", size: 12 },
    ]
  }
};

export const TaiwanAtlasMap = ({
  activeTaiwanEraId = 'tw_tungning',
  onSelectTaiwanEraId,
  events = [],
  battles = [],
  selectedEvent,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
}) => {
  const currentPalette = TAIWAN_ERA_PALETTES[activeTaiwanEraId] || TAIWAN_ERA_PALETTES.tw_tungning;
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapScrollRef = useRef(null);

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

  // Markers coordinate fallback
  const getEventCoords = (evt) => {
    if (evt.svgPos) return evt.svgPos;
    if (evt.coordinates) {
      const x = Math.round((evt.coordinates[0] - 118.0) * 165);
      const y = Math.round((26.2 - evt.coordinates[1]) * 145);
      return [x, y];
    }
    return [500, 320];
  };

  return (
    <div className="relative w-full h-full max-h-full min-h-0 rounded-xl overflow-hidden border-2 border-emerald-700/60 shadow-2xl bg-[#f4ecd8] select-none flex flex-col font-serif">
      {/* 1. Taiwan Eras Quick Tab Selector */}
      <div className="px-3 py-2 bg-gradient-to-r from-emerald-950 via-[#0f2419] to-emerald-950 border-b-2 border-emerald-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-100 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-emerald-300 font-bold text-xs flex items-center gap-1 mr-1 shrink-0">
            <span className="text-sm">🏝️</span>
            臺灣紀元：
          </span>
          {TAIWAN_LENS_ERAS.map((era) => {
            const isActive = era.id === activeTaiwanEraId;
            return (
              <button
                key={era.id}
                onClick={() => {
                  if (onSelectTaiwanEraId) onSelectTaiwanEraId(era.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-md ring-1 ring-emerald-300 scale-[1.02]'
                    : 'bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/60 hover:text-white border border-emerald-700/30'
                }`}
              >
                {era.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Map Graphic (Dedicated Taiwan Atlas Canvas) */}
      <div
        ref={mapScrollRef}
        className="relative flex-1 min-h-0 overflow-y-auto bg-[#f2e9d2] p-3 sm:p-4 flex flex-col items-center"
      >
        {/* Top-Left Historic Title Plaque */}
        <div className="w-full max-w-[760px] mb-2 flex items-center justify-between px-2 text-xs text-[#2b2117]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 font-bold text-[11px] shadow">
              {currentPalette.name}
            </span>
            <span className="text-[11px] text-zinc-600 font-sans hidden sm:inline">
              臺灣海峽 • 澎湖群島 • 金門前線 • 本島全域
            </span>
          </div>
          {hoveredRegion && (
            <span className="text-[11px] font-bold text-emerald-900 bg-emerald-200/60 px-2 py-0.5 rounded">
              {hoveredRegion}
            </span>
          )}
        </div>

        {/* Floating Map Container */}
        <div
          className="relative w-full max-w-[760px] aspect-[760/670] shrink-0 rounded-xl overflow-hidden shadow-xl border-2 border-[#8c7355] bg-[#e8debe] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Zoom / Pan Controls (Top-Right) */}
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-[#1a140e]/85 backdrop-blur-md p-1 rounded-lg border border-[#8c7355] shadow-lg">
            <button
              onClick={handleZoomIn}
              title="放大地圖"
              className="p-1.5 rounded text-emerald-200 hover:bg-[#53412d] hover:text-emerald-100"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="縮小地圖"
              className="p-1.5 rounded text-emerald-200 hover:bg-[#53412d] hover:text-emerald-100"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              title="重置視角"
              className="p-1.5 rounded text-emerald-200 hover:bg-[#53412d] hover:text-emerald-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <svg
            viewBox="0 0 760 670"
            className="w-full h-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Ocean Waves Pattern & Background */}
            <rect x="0" y="0" width="760" height="670" fill="#e8dfc7" />

            {/* Sea Typography Annotations */}
            <g fill="#9c8c72" fontSize="12" fontWeight="bold" letterSpacing="6" className="pointer-events-none select-none">
              <text x="180" y="220">臺 灣 海 峽</text>
              <text x="655" y="380">太 平 洋</text>
              <text x="560" y="80">東 海</text>
              <text x="380" y="650">巴 士 海 峽</text>
              <text x="55" y="200" fontSize="10">九龍江口·廈門灣</text>
            </g>

            {/* Mainland Coast Silhouette Hint (Fujian Coastline at Left Edge) */}
            <path
              d="M 10,10 L 20,120 L 12,230 L 25,320 L 15,480 L 10,660 L 0,670 L 0,0 Z"
              fill="#dfd3b5"
              stroke="#b5a589"
              strokeWidth="1"
            />
            <text x="25" y="100" fill="#a89a80" fontSize="10" fontWeight="bold">福建海疆沿岸</text>

            {/* 1. TAIWAN MAIN ISLAND REGIONS & OFFSHORE ISLANDS */}
            <g stroke="#261c14" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
              {Object.entries(TAIWAN_DETAILED_PATHS).map(([regKey, pathStr]) => {
                const fillCol = (currentPalette.subFills && currentPalette.subFills[regKey]) || currentPalette.fillColor;
                const regTitle =
                  regKey === 'north'
                    ? '北部 (基隆/臺北府城/滬尾淡水/大稻埕)'
                    : regKey === 'hsinchu_miaoli'
                    ? '桃竹苗 (竹塹/新竹科學園區/苗栗銅鑼)'
                    : regKey === 'central'
                    ? '中部 (大肚社/彰化八卦山/鹿港/霧社)'
                    : regKey === 'yunjia'
                    ? '雲嘉 (笨港拓墾/諸羅嘉義/北港朝天宮)'
                    : regKey === 'south'
                    ? '南部 (承天府赤崁安平/打狗高雄/恆春瑯嶠)'
                    : regKey === 'east'
                    ? '東部 (後山奇萊/花蓮港廳/臺東直隸州)'
                    : regKey === 'penghu'
                    ? '澎湖群島 (澎湖巡檢司/媽宮砲台/澎湖海戰)'
                    : regKey === 'kinmen'
                    ? '金門列島 (料羅灣/古寧頭大捷/太武山八二三)'
                    : regKey === 'matsu'
                    ? '馬祖列島 (閩江口防衛要衝)'
                    : '綠島與蘭嶼 (達悟族原鄉)';

                const isHovered = hoveredRegion === regTitle;

                return (
                  <path
                    key={regKey}
                    d={pathStr}
                    fill={fillCol}
                    className="cursor-pointer transition-colors duration-200"
                    style={{
                      filter: isHovered ? 'brightness(1.15) drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))' : 'none',
                    }}
                    onMouseEnter={() => setHoveredRegion(regTitle)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  />
                );
              })}
            </g>

            {/* 2. CENTRAL MOUNTAIN RANGE EMBOSSING (中央山脈脊梁) */}
            <g fill="none" stroke="#2c5b36" strokeWidth="3" strokeLinecap="round" opacity="0.45" className="pointer-events-none">
              <path d="M 570,195 Q 545,245 528,300 Q 515,360 500,430 Q 480,500 458,565" />
              <path d="M 545,220 Q 515,260 495,310 Q 475,370 455,440" strokeWidth="2.2" stroke="#4a7c59" />
              <path d="M 585,250 Q 570,330 550,420 Q 535,490 505,550" strokeWidth="2" stroke="#4a7c59" />
            </g>
            <text x="515" y="380" fill="#14532d" fontSize="9" fontWeight="bold" opacity="0.8" transform="rotate(68 515,380)">
              中 央 山 脈
            </text>
            <text x="495" y="340" fill="#1e3a8a" fontSize="8" fontWeight="bold" opacity="0.8">
              ▲ 玉山 (3952m)
            </text>

            {/* 3. MAJOR RIVERS (濁水溪、淡水河、高屏溪、曾文溪) */}
            <g fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" opacity="0.75" className="pointer-events-none">
              <path d="M 570,150 Q 560,140 555,135" /> {/* 淡水河 */}
              <path d="M 520,330 Q 460,340 405,348" strokeWidth="2.5" /> {/* 濁水溪 */}
              <path d="M 500,410 Q 440,430 380,445" /> {/* 曾文溪 */}
              <path d="M 480,480 Q 440,510 395,540" strokeWidth="2.2" /> {/* 高屏溪 */}
            </g>

            {/* 4. HISTORICAL CALLIGRAPHY LABELS FOR THIS ERA */}
            <g fontWeight="bold" className="pointer-events-none select-none font-serif">
              {(currentPalette.labels || []).map((lbl, idx) => (
                <text
                  key={idx}
                  x={lbl.pos[0]}
                  y={lbl.pos[1]}
                  fill={lbl.color}
                  fontSize={lbl.size}
                  textAnchor="middle"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  paintOrder="stroke"
                >
                  {lbl.name}
                </text>
              ))}
            </g>

            {/* 5. TAIWAN HISTORICAL BATTLES MARKERS */}
            {battles.map((bat) => {
              const coords = bat.coordinates
                ? [
                    Math.round((bat.coordinates[0] - 118.0) * 165),
                    Math.round((26.2 - bat.coordinates[1]) * 145),
                  ]
                : [500, 320];

              const isSelected = selectedEvent?.battleId === bat.id;

              return (
                <g
                  key={bat.id}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectBattle) onSelectBattle(bat);
                  }}
                >
                  {/* Outer pulse circle */}
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r="12"
                    fill="#e11d48"
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r="8.5"
                    fill="#be123c"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="group-hover:scale-125 transition-transform"
                  />
                  <text
                    x={coords[0]}
                    y={coords[1] + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    ⚔
                  </text>
                  <text
                    x={coords[0]}
                    y={coords[1] - 12}
                    textAnchor="middle"
                    fill="#881337"
                    fontSize="10"
                    fontWeight="bold"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    paintOrder="stroke"
                  >
                    {bat.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}

            {/* 6. TAIWAN HISTORIC EVENTS MARKERS */}
            {events.map((evt) => {
              const coords = getEventCoords(evt);
              const isSelected = selectedEvent?.id === evt.id;

              return (
                <g
                  key={evt.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectEvent) onSelectEvent(evt);
                  }}
                >
                  {isSelected && (
                    <circle
                      cx={coords[0]}
                      cy={coords[1]}
                      r="10"
                      fill="#f59e0b"
                      opacity="0.4"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r={isSelected ? 6 : 4.5}
                    fill={isSelected ? '#d97706' : '#047857'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {isSelected && (
                    <text
                      x={coords[0]}
                      y={coords[1] + 16}
                      textAnchor="middle"
                      fill="#78350f"
                      fontSize="10"
                      fontWeight="bold"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                    >
                      ★ {evt.title.split(' ')[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 3. Event Detail & Tactical Intelligence (Below Map) */}
        {selectedEvent && (
          <div className="w-full max-w-[760px] mt-3 p-3.5 bg-[#fdfbf7] border-2 border-[#8c7355] rounded-xl shadow-md text-[#2b2117] flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#8c7355]/30 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 font-bold text-xs">
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
