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

  // Filter events strictly for this era
  const currentEraEvents = events.filter((e) => {
    return e.eraId === activeJapanEraId || selectedEvent?.id === e.id;
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
              <text x="210" y="515" fontSize="11" letterSpacing="3">瀨戶內海</text>
              <text x="75" y="460" fontSize="11" letterSpacing="2">對馬海峽</text>
              <text x="630" y="40" fontSize="10" letterSpacing="3">鄂霍次克海</text>
              <text x="45" y="660" fontSize="10">東海 (琉球航路)</text>
            </g>

            {/* 1. AUTHENTIC PROVINCES OF JAPAN (66 Feudal Provinces Geometries) */}
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

            {/* 2. PROVINCE CALLIGRAPHY LABELS (令制國名) */}
            <g fill="#1a140e" fontSize="10.5" fontWeight="900" className="pointer-events-none select-none">
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

            {/* 3. FAMOUS CASTLES & STRONGHOLDS (🏯 天守閣與城池) */}
            <g className="select-none">
              {JAPAN_HISTORICAL_CASTLES.map((castle) => {
                const [cx, cy] = projectLngLatToJapanMap(castle.lng, castle.lat);
                const isCapital = castle.importance === "capital" || castle.importance === "imperial";

                return (
                  <g key={castle.id} className="cursor-pointer group">
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isCapital ? 6.5 : 5}
                      fill={isCapital ? "#b91c1c" : "#292524"}
                      stroke="#ffffff"
                      strokeWidth="1.8"
                    />
                    <text
                      x={cx + 7}
                      y={cy + 3.5}
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

            {/* 4. JAPAN HISTORICAL BATTLES MARKERS (Crossed Swords ⚔️) */}
            {currentEraBattles.map((bat, batIdx) => {
              const [bx, by] = getMarkerCoords(bat);
              const isSelected = selectedBattle?.id === bat.id || selectedEvent?.battleId === bat.id;

              // Collision-free coordinate calculation
              let labelX = bx;
              let labelY = by - 14;
              let textAnchor = 'middle';

              if (bat.id === 'bat_jp_dannoura_1185') {
                labelX = bx - 12;
                textAnchor = 'end';
                labelY = by + 4;
              } else if (bat.id === 'bat_jp_tsushima_1905') {
                labelX = bx + 14;
                textAnchor = 'start';
                labelY = by - 2;
              } else if (bat.id === 'bat_jp_sekigahara_1600') {
                labelY = by - 14;
              } else if (bat.id === 'bat_jp_nagashino_1575') {
                labelY = by + 18;
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
                    x={labelX}
                    y={labelY}
                    textAnchor={textAnchor}
                    fontSize="11"
                    fontWeight="bold"
                    fill="#7f1d1d"
                    stroke="#ffffff"
                    strokeWidth="3.2"
                    paintOrder="stroke"
                    letterSpacing="0.8"
                    className="pointer-events-none select-none"
                  >
                    {battleShortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 5. Selected Battle Detail Card (Drawer at Bottom) */}
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
