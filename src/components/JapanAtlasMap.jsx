import React, { useState, useRef } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Clock,
  MapPin
} from './Icons.js';
import {
  JAPAN_ERAS,
  JAPAN_ERA_BATTLE_IDS,
  JAPAN_PROVINCE_PATHS,
  JAPAN_HISTORICAL_CASTLES,
  JAPAN_ERA_PROVINCE_SCHEMES,
  projectLngLatToJapanMap
} from '../data/japan/index.js';

export const JapanAtlasMap = ({
  activeJapanEraId = 'jp_sengoku',
  onSelectJapanEraId,
  events = [],
  battles = [],
  selectedEvent,
  selectedBattle,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
}) => {
  const currentScheme = JAPAN_ERA_PROVINCE_SCHEMES[activeJapanEraId] || JAPAN_ERA_PROVINCE_SCHEMES.jp_sengoku;
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const mapContainerRef = useRef(null);

  // Filter battles strictly for this era
  const currentEraBattles = battles.filter((b) => {
    const allowed = JAPAN_ERA_BATTLE_IDS[activeJapanEraId] || [];
    return allowed.includes(b.id) || selectedEvent?.battleId === b.id || selectedBattle?.id === b.id;
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

  // Position calculation via GIS
  const getMarkerCoords = (item) => {
    if (item.coordinates && Array.isArray(item.coordinates)) {
      return projectLngLatToJapanMap(item.coordinates[0], item.coordinates[1]);
    }
    return [400, 360];
  };

  // Dedicated collision-free castle label placement helper
  const getCastleLabelProps = (castleId, cx, cy) => {
    switch (castleId) {
      case 'cst_kyoto':
        return { x: cx - 9, y: cy - 7, textAnchor: 'end' };
      case 'cst_osaka':
        return { x: cx - 9, y: cy + 12, textAnchor: 'end' };
      case 'cst_azuchi':
        return { x: cx, y: cy - 10, textAnchor: 'middle' };
      case 'cst_gifu':
        return { x: cx + 9, y: cy - 6, textAnchor: 'start' };
      case 'cst_kiyosu':
        return { x: cx + 9, y: cy + 13, textAnchor: 'start' };
      case 'cst_odawara':
        return { x: cx - 9, y: cy + 11, textAnchor: 'end' };
      case 'cst_edo':
        return { x: cx + 9, y: cy - 4, textAnchor: 'start' };
      case 'cst_tsutsujigasaki':
        return { x: cx, y: cy - 9, textAnchor: 'middle' };
      case 'cst_kasugayama':
        return { x: cx + 9, y: cy + 3.5, textAnchor: 'start' };
      case 'cst_himeji':
        return { x: cx, y: cy + 14, textAnchor: 'middle' };
      case 'cst_kumamoto':
        return { x: cx - 9, y: cy + 3.5, textAnchor: 'end' };
      case 'cst_kagoshima':
        return { x: cx + 9, y: cy + 3.5, textAnchor: 'start' };
      case 'cst_aoba_sendai':
        return { x: cx + 9, y: cy + 3.5, textAnchor: 'start' };
      case 'cst_aizu':
        return { x: cx - 9, y: cy + 3.5, textAnchor: 'end' };
      case 'cst_goryokaku':
        return { x: cx + 9, y: cy + 3.5, textAnchor: 'start' };
      default:
        return { x: cx + 8, y: cy + 3.5, textAnchor: 'start' };
    }
  };

  // Dedicated collision-free battle label placement helper
  const getBattleLabelProps = (battleId, bx, by) => {
    switch (battleId) {
      case 'bat_jp_sekigahara_1600':
        return { x: bx, y: by - 16, textAnchor: 'middle' };
      case 'bat_jp_osaka_natsu_1615':
        return { x: bx, y: by + 22, textAnchor: 'middle' };
      case 'bat_jp_yamazaki_1582':
        return { x: bx - 14, y: by - 7, textAnchor: 'end' };
      case 'bat_jp_shizugatake_1583':
        return { x: bx, y: by - 14, textAnchor: 'middle' };
      case 'bat_jp_toba_fushimi_1868':
        return { x: bx, y: by + 20, textAnchor: 'middle' };
      case 'bat_jp_okehazama_1560':
        return { x: bx + 14, y: by + 4, textAnchor: 'start' };
      case 'bat_jp_nagashino_1575':
        return { x: bx + 12, y: by + 14, textAnchor: 'start' };
      case 'bat_jp_mikata_1573':
        return { x: bx, y: by + 18, textAnchor: 'middle' };
      case 'bat_jp_kawanakajima_1561':
        return { x: bx, y: by - 14, textAnchor: 'middle' };
      case 'bat_jp_dannoura_1185':
        return { x: bx - 14, y: by + 4, textAnchor: 'end' };
      case 'bat_jp_koan_1281':
        return { x: bx - 14, y: by - 6, textAnchor: 'end' };
      case 'bat_jp_goryokaku_1869':
        return { x: bx + 16, y: by + 4, textAnchor: 'start' };
      case 'bat_jp_tabaruzaka_1877':
        return { x: bx - 14, y: by + 4, textAnchor: 'end' };
      case 'bat_jp_tsushima_1905':
        return { x: bx + 14, y: by - 2, textAnchor: 'start' };
      default:
        return { x: bx, y: by - 14, textAnchor: 'middle' };
    }
  };

  return (
    <div className="relative w-full h-full max-h-full min-h-0 rounded-xl overflow-hidden border-2 border-[#8c7355] shadow-2xl bg-[#f5eedb] select-none flex flex-col font-serif">
      {/* 1. Header Toolbar with Chronological Japan Era Tabs */}
      <div className="px-3 py-2 bg-[#1e1713] border-b-2 border-[#8c7355] flex flex-wrap items-center justify-between gap-2 text-xs text-[#f5ebd9] shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[#e8c89b] font-bold text-xs flex items-center gap-1 mr-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            日本紀元：
          </span>
          {JAPAN_ERAS.map((era) => {
            const isActive = era.id === activeJapanEraId;
            return (
              <button
                key={era.id}
                onClick={() => {
                  if (onSelectJapanEraId) onSelectJapanEraId(era.id);
                }}
                className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-[#dc2626] text-white font-bold shadow-md ring-1 ring-[#fef08a]'
                    : 'bg-[#33251c] text-[#d6c5af] hover:bg-[#4a3629] hover:text-white'
                }`}
              >
                {era.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Map Graphic (Authentic GIS Coastlines & Boundaries of Japan) */}
      <div
        ref={mapContainerRef}
        className="relative flex-1 min-h-0 overflow-y-auto bg-[#f4ecd8] p-3 sm:p-4 flex flex-col items-center"
      >
        {/* Top-Left Classical Seal Title Stamp */}
        <div className="w-full max-w-[820px] mb-2 flex items-center justify-between px-2 text-xs text-[#2b2117]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#991b1b] text-[#fef08a] font-bold font-serif text-xs border border-[#d97706]/50 shadow-md">
              {currentScheme.themeBadge}
            </span>
            <span className="text-xs font-bold font-serif text-[#44382c]">
              {currentScheme.name}
            </span>
          </div>
          {hoveredProvince && (
            <span className="text-xs font-bold text-[#8c2d19] bg-[#ebd8b7] px-2.5 py-0.5 rounded border border-[#8c7355]/40 shadow-sm">
              {hoveredProvince}
            </span>
          )}
        </div>

        {/* Map Canvas with Authentic GIS Boundaries (820 x 720) */}
        <div
          className="relative w-full max-w-[820px] aspect-[820/720] shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-[#8c7355] bg-[#efe5cc] cursor-grab active:cursor-grabbing"
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
              <text x="320" y="240">日 本 海</text>
              <text x="560" y="580">太 平 洋</text>
              <text x="220" y="510" fontSize="11" letterSpacing="3">瀨戶內海</text>
              <text x="75" y="460" fontSize="11" letterSpacing="2">對馬海峽</text>
              <text x="540" y="204" fontSize="9.5" letterSpacing="2">津輕海峽</text>
              <text x="660" y="45" fontSize="10" letterSpacing="3">鄂霍次克海</text>
              <text x="55" y="660" fontSize="10">東海 (琉球航路)</text>
            </g>

            {/* Subtle Continental & Archipelagic Land Hints at Canvas Edges */}
            <g fill="#e3d6b8" stroke="#baa98b" strokeWidth="1.2" className="pointer-events-none select-none">
              {/* Korean Peninsula Southern Coast & Busan */}
              <path d="M 0,380 L 40,400 L 50,440 L 42,475 L 20,510 L 0,520 Z" />
              <text x="18" y="445" fill="#a89a80" fontSize="10" fontWeight="bold">朝鮮半島 (釜山)</text>

              {/* Sakhalin / Karafuto Tip */}
              <path d="M 565,0 L 575,22 L 595,20 L 608,0 Z" />
              <text x="575" y="14" fill="#a89a80" fontSize="8.5" fontWeight="bold">庫頁島 (樺太)</text>

              {/* Kuril Islands */}
              <path d="M 725,65 L 750,45 L 778,28 L 810,12 L 820,20 L 755,75 Z" />
              <text x="745" y="42" fill="#a89a80" fontSize="9" fontWeight="bold">千島列島</text>

              {/* Ryukyu Islands hint */}
              <path d="M 40,685 L 65,680 L 80,695 L 60,705 Z" />
              <text x="45" y="700" fill="#a89a80" fontSize="9" fontWeight="bold">琉球群島</text>
            </g>

            {/* 1. AUTHENTIC CONTIGUOUS PROVINCES OF JAPAN (Official GIS Curvature) */}
            <g stroke="#261c14" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
              {Object.entries(JAPAN_PROVINCE_PATHS).map(([provKey, provItem]) => {
                const fillCol = currentScheme.provinceColors[provKey] || "#eab308";
                const histName = currentScheme.historicalNames[provKey] || provItem.name;
                const isHovered = hoveredProvince === histName;

                return (
                  <path
                    key={provKey}
                    d={provItem.d}
                    fill={fillCol}
                    className="cursor-pointer transition-colors duration-150"
                    style={{
                      filter: isHovered ? 'brightness(1.15) drop-shadow(0 0 6px rgba(220, 38, 38, 0.6))' : 'none',
                    }}
                    onMouseEnter={() => setHoveredProvince(`${provItem.name} — ${histName}`)}
                    onMouseLeave={() => setHoveredProvince(null)}
                  />
                );
              })}
            </g>

            {/* 2. LAKE BIWA (琵琶湖 - 近江名勝水體) */}
            <g className="pointer-events-none select-none">
              <path
                d="M 368,452 C 367,445 370,438 375,436 C 380,435 383,440 382,448 C 381,455 376,462 372,464 C 369,465 368,460 368,452 Z"
                fill="#8bb8cc"
                stroke="#3b82f6"
                strokeWidth="1.2"
                opacity="0.95"
              />
              <text x="375" y="449" fill="#1e3a8a" fontSize="8" fontWeight="bold" textAnchor="middle" opacity="0.9">
                琵琶湖
              </text>
            </g>

            {/* 3. MAJOR RIVERS OF JAPAN (信濃川、利根川、木曾川、淀川) */}
            <g fill="none" stroke="#0284c7" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" className="pointer-events-none select-none">
              {/* 信濃川 (日本第一長流) */}
              <path d="M 454,410 Q 468,382 484,352" strokeWidth="2.2" />
              <text x="472" y="380" fill="#0369a1" fontSize="7.5" fontWeight="bold" stroke="none">信濃川</text>

              {/* 利根川 (坂東太郎) */}
              <path d="M 502,408 Q 525,418 554,422" strokeWidth="2.2" />
              <text x="532" y="415" fill="#0369a1" fontSize="7.5" fontWeight="bold" stroke="none">利根川</text>

              {/* 木曾川·長良川 (濃尾平原名川) */}
              <path d="M 424,420 Q 412,442 404,464" strokeWidth="2" />

              {/* 淀川 (琵琶湖水經京都、大阪出海) */}
              <path d="M 368,464 Q 358,472 344,484" strokeWidth="2.4" />
            </g>

            {/* 4. JAPAN ALPS & TOPOGRAPHY (日本阿爾卑斯、奧羽山脈、富士山) */}
            <g fill="none" stroke="#2c5b36" strokeLinecap="round" opacity="0.45" className="pointer-events-none select-none">
              {/* 飛驒·木曾·赤石山脈 (日本阿爾卑斯) */}
              <path d="M 412,410 Q 430,425 448,435 Q 465,445 470,455" strokeWidth="3" />
              <path d="M 425,405 Q 440,420 455,438" strokeWidth="2.2" stroke="#4a7c59" />

              {/* 奧羽山脈 (東北脊梁) */}
              <path d="M 536,365 Q 548,310 562,250" strokeWidth="2.5" />

              {/* 中國山地 */}
              <path d="M 180,490 Q 225,475 270,460" strokeWidth="2.5" />
            </g>

            {/* Topography Labels */}
            <g className="pointer-events-none select-none font-serif">
              <text x="435" y="420" fill="#14532d" fontSize="8.5" fontWeight="bold" opacity="0.75" transform="rotate(35 435,420)">
                日本阿爾卑斯
              </text>
              <text x="556" y="295" fill="#14532d" fontSize="8" fontWeight="bold" opacity="0.65" transform="rotate(78 556,295)">
                奧羽山脈
              </text>
              <text x="165" y="565" fill="#991b1b" fontSize="8" fontWeight="bold" opacity="0.8">
                ▲ 阿蘇山
              </text>

              {/* MOUNT FUJI (🗻 富士山 3776m - 靈峰名嶽) */}
              <polygon points="466,463 472,450 478,463" fill="#5a6b5c" stroke="#2b3b2c" strokeWidth="1.2" />
              <polygon points="469.5,455 472,450 474.5,455" fill="#ffffff" />
              <text x="472" y="445" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">
                ▲ 富士山 (3776m)
              </text>
            </g>

            {/* 5. PROVINCE CALLIGRAPHY LABELS (令制國名) */}
            <g fill="#1a140e" fontSize="10.5" fontWeight="900" className="pointer-events-none select-none font-serif">
              {Object.entries(JAPAN_PROVINCE_PATHS).map(([provKey, provItem]) => {
                const [cx, cy] = provItem.centerCoords;
                return (
                  <text
                    key={`lbl_${provKey}`}
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    fill="#18130f"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    paintOrder="stroke"
                    letterSpacing="1"
                    opacity="0.9"
                  >
                    {provItem.kanji}
                  </text>
                );
              })}
            </g>

            {/* 6. FAMOUS CASTLES & STRONGHOLDS (🏯 天守閣與城池·無遮擋精確布局) */}
            <g className="select-none font-serif">
              {JAPAN_HISTORICAL_CASTLES.map((castle) => {
                const [cx, cy] = projectLngLatToJapanMap(castle.lng, castle.lat);
                const isCapital = castle.importance === "capital" || castle.importance === "imperial";
                const labelProps = getCastleLabelProps(castle.id, cx, cy);

                return (
                  <g key={castle.id} className="cursor-pointer group">
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isCapital ? 6 : 4.5}
                      fill={isCapital ? "#b91c1c" : "#292524"}
                      stroke="#ffffff"
                      strokeWidth="1.8"
                    />
                    <text
                      x={labelProps.x}
                      y={labelProps.y}
                      textAnchor={labelProps.textAnchor}
                      fontSize="9.5"
                      fontWeight="bold"
                      fill="#1c1917"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                    >
                      {castle.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 7. JAPAN HISTORICAL BATTLES MARKERS (Crossed Swords ⚔️·無重疊精確定位) */}
            {currentEraBattles.map((bat) => {
              const [bx, by] = getMarkerCoords(bat);
              const isSelected = selectedBattle?.id === bat.id || selectedEvent?.battleId === bat.id;
              const labelProps = getBattleLabelProps(bat.id, bx, by);
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
                  {/* Selection Ring */}
                  {isSelected && (
                    <circle
                      cx={bx}
                      cy={by}
                      r="16"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Battle Emblem Badge */}
                  <circle
                    cx={bx}
                    cy={by}
                    r={isSelected ? 11 : 9}
                    fill={isSelected ? '#991b1b' : '#b91c1c'}
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

                  {/* Battle Name Text Label */}
                  <text
                    x={labelProps.x}
                    y={labelProps.y}
                    textAnchor={labelProps.textAnchor}
                    fontSize="11"
                    fontWeight="bold"
                    fill="#7f1d1d"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    paintOrder="stroke"
                    letterSpacing="0.8"
                    className="pointer-events-none select-none font-serif"
                  >
                    {battleShortName}
                  </text>
                </g>
              );
            })}

            {/* 8. ANTIQUE CARTOGRAPHIC ACCENTS: COMPASS ROSE & SCALE BAR */}
            {/* 八方羅盤指南 (Compass Rose) */}
            <g transform="translate(85, 95)" opacity="0.45" className="pointer-events-none select-none">
              <circle r="22" fill="none" stroke="#8c7355" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 0,-26 L 4,-6 L 0,0 L -4,-6 Z" fill="#991b1b" />
              <path d="M 0,26 L 4,6 L 0,0 L -4,6 Z" fill="#44382c" />
              <path d="M 26,0 L 6,4 L 0,0 L 6,-4 Z" fill="#44382c" />
              <path d="M -26,0 L -6,4 L 0,0 L -6,-4 Z" fill="#44382c" />
              <text y="-29" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontSerif="true">北</text>
            </g>

            {/* 比例尺 (Scale Bar) */}
            <g transform="translate(45, 685)" opacity="0.7" className="pointer-events-none select-none font-serif">
              <line x1="0" y1="0" x2="80" y2="0" stroke="#5c4a35" strokeWidth="2" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#5c4a35" strokeWidth="2" />
              <line x1="40" y1="-2" x2="40" y2="2" stroke="#5c4a35" strokeWidth="1.5" />
              <line x1="80" y1="-3" x2="80" y2="3" stroke="#5c4a35" strokeWidth="2" />
              <text x="0" y="-6" fontSize="7.5" fill="#5c4a35">0</text>
              <text x="40" y="-6" fontSize="7.5" fill="#5c4a35" textAnchor="middle">五十里</text>
              <text x="80" y="-6" fontSize="7.5" fill="#5c4a35" textAnchor="end">百里 (約400km)</text>
            </g>
          </svg>
        </div>

        {/* 9. Selected Battle Detail Card (Drawer at Bottom) */}
        {selectedBattle && (
          <div className="w-full max-w-[820px] mt-3 p-3.5 rounded-xl bg-[#261c14] border-2 border-[#8c7355] text-[#f5ebd9] shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#8c7355]/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-[#991b1b] text-[#fef08a] font-bold text-xs">
                  ⚔️ 會戰沙盤
                </span>
                <span className="text-sm font-bold text-[#fef08a]">
                  {selectedBattle.name}
                </span>
                <span className="text-xs text-[#d6c5af]">
                  ({selectedBattle.year > 0 ? `西元 ${selectedBattle.year} 年` : `西元前 ${Math.abs(selectedBattle.year)} 年`})
                </span>
              </div>
              <button
                onClick={() => onSelectBattle(null)}
                className="text-xs text-[#a89a80] hover:text-[#fef08a] px-2 py-0.5 rounded bg-[#3d3022]"
              >
                關閉 ✕
              </button>
            </div>

            <div className="text-xs leading-relaxed text-[#e8ded1]">
              {selectedBattle.summary}
            </div>

            {selectedBattle.parties && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-[#382b20] border border-[#8c7355]/30">
                  <span className="text-[#f87171] font-bold">進攻/東軍陣營：</span>
                  <div className="text-[#d6c5af] mt-0.5">{selectedBattle.parties.invader}</div>
                </div>
                <div className="p-2 rounded bg-[#382b20] border border-[#8c7355]/30">
                  <span className="text-[#38bdf8] font-bold">守衛/西軍陣營：</span>
                  <div className="text-[#d6c5af] mt-0.5">{selectedBattle.parties.defender}</div>
                </div>
              </div>
            )}

            {selectedBattle.keyStrategies && selectedBattle.keyStrategies.length > 0 && (
              <div className="pt-1">
                <span className="text-[11px] font-bold text-[#eab308]">關鍵戰法與勝敗轉折：</span>
                <ul className="list-disc list-inside text-[11px] text-[#d6c5af] mt-1 space-y-0.5">
                  {selectedBattle.keyStrategies.map((strat, sIdx) => (
                    <li key={sIdx}>{strat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
