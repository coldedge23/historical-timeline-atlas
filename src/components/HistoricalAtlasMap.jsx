import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Swords, 
  Clock,
  MapPin,
  Maximize2,
  Minimize2
} from './Icons.js';
import { CHINA_PROVINCE_PATHS } from '../data/threeKingdoms/chinaMapData.js';
import { WARLORD_PERIOD_CONFIGS } from '../data/threeKingdoms/warlordPeriods.js';

export { WARLORD_PERIOD_CONFIGS };

export const HistoricalAtlasMap = ({
  warlordPeriodConfigs,
  events,
  allEvents = [],
  battles,
  selectedEvent,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
  onClearSearch,
  isCinemaMode = false,
  onToggleCinemaMode,
}) => {
  const configsToUse = warlordPeriodConfigs && warlordPeriodConfigs.length > 0 ? warlordPeriodConfigs : WARLORD_PERIOD_CONFIGS;
  const initialYear = selectedEvent?.year || configsToUse[0]?.yearNumber || 184;
  const initialPreset =
    configsToUse.reduce(
      (best, p) =>
        Math.abs(p.yearNumber - initialYear) < Math.abs(best.yearNumber - initialYear) ? p : best,
      configsToUse[0]
    );

  const [activePreset, setActivePreset] = useState(initialPreset);
  const [hoveredWarlord, setHoveredWarlord] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const tabsScrollRef = useRef(null);
  const tabRefs = useRef({});
  const mapScrollContainerRef = useRef(null);

  // Automatically update the map preset when selectedEvent or configsToUse changes
  useEffect(() => {
    if (!selectedEvent && (!configsToUse || configsToUse.length === 0)) return;
    const yr = selectedEvent ? selectedEvent.year : configsToUse[0].yearNumber;
    let best = configsToUse[0];
    let minDiff = 999999;
    configsToUse.forEach((p) => {
      const diff = Math.abs(p.yearNumber - yr);
      if (diff < minDiff) {
        minDiff = diff;
        best = p;
      }
    });
    setActivePreset(best);
  }, [selectedEvent, configsToUse]);

  // Smoothly scroll the active period button to center in the top toolbar
  useEffect(() => {
    if (activePreset && tabRefs.current[activePreset.id] && tabsScrollRef.current) {
      const tabEl = tabRefs.current[activePreset.id];
      const container = tabsScrollRef.current;
      const tabRect = tabEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeLeft = tabRect.left - containerRect.left + container.scrollLeft;
      const targetScrollLeft = relativeLeft - (container.clientWidth / 2) + (tabEl.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activePreset?.id]);

  // If the map scroll container was scrolled down to view chronicles, gently ensure the map canvas is visible
  useEffect(() => {
    if (mapScrollContainerRef.current && mapScrollContainerRef.current.scrollTop > 100) {
      mapScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedEvent?.id, activePreset?.id]);

  const handleZoomIn = () => setZoom((z) => Math.min(2.4, +(z + 0.35).toFixed(2)));
  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, +(z - 0.35).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxOffset = (zoom - 1) * 180;
    const nx = Math.max(-maxOffset, Math.min(maxOffset, e.clientX - dragStart.x));
    const ny = Math.max(-maxOffset, Math.min(maxOffset, e.clientY - dragStart.y));
    setPan({ x: nx, y: ny });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleBattleMarkerClick = (b, e) => {
    e.stopPropagation();
    if (b.battleId && battles && onSelectBattle) {
      const foundBattle = battles.find((bat) => bat.id === b.battleId);
      if (foundBattle) {
        onSelectBattle(foundBattle);
      }
    }
    // Also synchronize timeline event
    if (events && onSelectEvent) {
      const foundEvt = events.find((ev) => (b.eventId && ev.id === b.eventId) || (b.battleId && ev.battleId === b.battleId));
      if (foundEvt) onSelectEvent({ ...foundEvt, _scrollTs: Date.now() });
    }
  };

  const focalPos = selectedEvent?.svgPos || [512, 345];
  const activeRoutes = selectedEvent?.routes || [];

  const getMarkerId = (color) => {
    if (color === '#dc2626') return 'arrow-red';
    if (color === '#2563eb') return 'arrow-blue';
    if (color === '#16a34a') return 'arrow-green';
    if (color === '#d97706') return 'arrow-amber';
    return 'arrow-slate';
  };

  return (
    <div className="relative w-full h-full max-h-full min-h-0 rounded-xl overflow-hidden border-2 border-[#8c7355] shadow-2xl bg-[#f5eedb] select-none flex flex-col font-serif">
      {/* 1. Header Toolbar with Chronological Year Preset Tabs */}
      <div className="px-3 py-2 bg-[#2b2117] border-b-2 border-[#8c7355] flex flex-wrap items-center justify-between gap-2 text-xs text-[#f5ebd9] shrink-0">
        <div ref={tabsScrollRef} className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[#e8c89b] font-bold text-xs flex items-center gap-1 mr-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            歷史時期：
          </span>
          {configsToUse.map((p) => {
            const isActive = p.id === activePreset.id;
            return (
              <button
                key={p.id}
                ref={(el) => (tabRefs.current[p.id] = el)}
                onClick={() => {
                  setActivePreset(p);
                  if (onClearSearch) onClearSearch();
                  const pool = allEvents && allEvents.length > 0 ? allEvents : events;
                  if (pool && pool.length > 0) {
                    const closestEvt = pool.reduce((best, e) => {
                      return Math.abs(e.year - p.yearNumber) < Math.abs(best.year - p.yearNumber) ? e : best;
                    }, pool[0]);
                    if (closestEvt && onSelectEvent) {
                      onSelectEvent({ ...closestEvt, _scrollTs: Date.now() });
                    }
                  }
                }}
                className={`px-2 py-1 rounded text-[11px] whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#d97706] text-white font-bold shadow-md ring-1 ring-[#fef08a]'
                    : 'bg-[#3d3022] text-[#d6c5af] hover:bg-[#53412d] hover:text-white'
                }`}
              >
                {p.yearDisplay} {p.shortLabel ? p.shortLabel.replace(new RegExp(`^(?:西元\\s*)?${p.yearNumber}(?:\\s*年)?\\s*`), '') : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Map Graphic (100% Real Geographical Boundary Integration) */}
      <div ref={mapScrollContainerRef} className="relative flex-1 min-h-0 overflow-y-auto bg-[#f4ecd8] p-3 sm:p-4 flex flex-col items-center">
        {/* Top-Left Big Headline Stamp */}
        <div className={`w-full shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 px-1 gap-2 ${isCinemaMode ? 'max-w-[1320px]' : 'max-w-[960px]'}`}>
          <div>
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#262018] font-serif">
              <span className="text-xl sm:text-2xl text-[#991b1b] mr-2">{activePreset.yearDisplay}</span>
              {activePreset.headline}
            </div>
            <div className="text-xs text-[#78634c] mt-0.5 tracking-wide">
              {activePreset.subTitle}
            </div>
          </div>

          {/* Selected Event Badge Indicator */}
          {selectedEvent && (
            <div className="flex items-center gap-1.5 bg-[#2b2117] text-[#fef08a] px-2.5 py-1 rounded-lg border border-[#8c7355] text-[11px] shrink-0 shadow">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[#d6c5af]">聚焦事件：</span>
              <b className="text-amber-300">
                {selectedEvent.year ? `${selectedEvent.year}年 · ` : ''}
                {(selectedEvent.title || '').split('：')[0].split('，')[0]}
              </b>
            </div>
          )}
        </div>

        {/* The SVG Real Geographic Jigsaw Atlas Map Canvas */}
        <div
          className={`w-full ${isCinemaMode ? 'max-w-[1320px]' : 'max-w-[960px]'} aspect-[1000/740] shrink-0 bg-[#efe5cd] rounded-lg border-2 border-[#786047] shadow-xl overflow-hidden relative ${
            zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : ''
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Floating Map Zoom, Route Toggle & Reset Toolbar */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#2b2117]/90 backdrop-blur-sm p-1 rounded-lg border border-[#8c7355] shadow-lg">
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
              onClick={() => setShowRoutes((v) => !v)}
              title="切換顯示動態戰術行軍路線"
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                showRoutes
                  ? 'bg-amber-600 text-white'
                  : 'text-[#d6c5af] hover:bg-[#53412d] hover:text-white'
              }`}
            >
              <Swords className="w-3 h-3" />
              <span>行軍路線</span>
            </button>
            <div className="w-px h-4 bg-[#8c7355]/50 mx-0.5" />
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
              title="重置視角 (100%)"
              className="p-1.5 rounded text-[#f5ebd9] hover:bg-[#53412d] hover:text-amber-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            {zoom > 1 && (
              <span className="text-[10px] font-mono text-amber-300 px-1.5">
                {Math.round(zoom * 100)}%
              </span>
            )}
          </div>

          {/* Floating Tactical Route Legend Overlay (Bottom-Left of Map Canvas) */}
          {showRoutes && activeRoutes.length > 0 && (
            <div className="absolute bottom-2.5 left-2.5 z-10 max-w-[310px] bg-[#1a140e]/95 backdrop-blur-md px-3 py-2 rounded-lg border-2 border-[#8c7355] shadow-2xl text-[11px] text-[#f5ebd9] space-y-1.5">
              <div className="font-bold text-[#fbbf24] flex items-center justify-between border-b border-[#8c7355]/60 pb-1 text-xs">
                <span className="flex items-center gap-1">
                  <span>🗺️</span>
                  <span>{selectedEvent.year}年 戰術行軍動線</span>
                </span>
                {selectedEvent.battleId && (
                  <button
                    onClick={() => {
                      const bat = battles?.find((b) => b.id === selectedEvent.battleId);
                      if (bat && onSelectBattle) onSelectBattle(bat);
                    }}
                    className="text-[11px] font-bold text-rose-300 hover:text-rose-100 underline decoration-rose-400 ml-2 transition-colors"
                  >
                    戰役詳情 &rarr;
                  </button>
                )}
              </div>
              {activeRoutes.map((rt, idx) => (
                <div key={idx} className="flex items-center gap-2 leading-snug">
                  <span
                    className="w-4 h-1.5 rounded-full shrink-0 shadow-sm"
                    style={{
                      backgroundColor: rt.color,
                      borderBottom: rt.dashed ? '1px dashed #fff' : 'none',
                    }}
                  />
                  <span className="truncate text-[#f5eedb] font-medium tracking-wide drop-shadow-sm">{rt.label}</span>
                </div>
              ))}
            </div>
          )}

          <svg
            viewBox="195 130 515 440"
            className="w-full h-full transition-transform duration-150 ease-out"
            style={{
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Arrowhead Markers for Tactical March Routes */}
            <defs>
              {[
                { id: 'arrow-red', color: '#dc2626' },
                { id: 'arrow-blue', color: '#2563eb' },
                { id: 'arrow-green', color: '#16a34a' },
                { id: 'arrow-amber', color: '#d97706' },
                { id: 'arrow-slate', color: '#475569' },
              ].map((m) => (
                <marker
                  key={m.id}
                  id={m.id}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="4.5"
                  markerHeight="4.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill={m.color} />
                </marker>
              ))}
            </defs>

            {/* Ocean / Outer Sea Background */}
            <rect x="0" y="0" width="1000" height="1000" fill="#f0e5cb" />

            {/* Sea labels */}
            <text x="590" y="275" fill="#a89a80" fontSize="11" fontWeight="bold">渤 海</text>
            <text x="635" y="340" fill="#a89a80" fontSize="11" fontWeight="bold">黃 海</text>
            <text x="645" y="440" fill="#a89a80" fontSize="11" fontWeight="bold">東 海</text>
            <text x="540" y="555" fill="#a89a80" fontSize="11" fontWeight="bold">南 海</text>
            <text x="588" y="475" fill="#a89a80" fontSize="8" fontWeight="bold">臺灣海峽</text>

            {/* 1. SEAMLESS REAL GEOGRAPHICAL PROVINCES OF CHINA */}
            <g>
              {Object.entries(CHINA_PROVINCE_PATHS).map(([provId, pathStr]) => {
                const conf = (activePreset.provinceWarlordMap || {})[provId];
                if (!conf) return null;
                const isHovered = hoveredWarlord === conf.warlord;

                return (
                  <path
                    key={provId}
                    d={pathStr}
                    fill={conf.color}
                    stroke="#261c14"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="cursor-pointer transition-colors duration-150"
                    style={{ filter: isHovered ? 'brightness(1.08)' : 'none' }}
                    onMouseEnter={() => setHoveredWarlord(conf.warlord)}
                    onMouseLeave={() => setHoveredWarlord(null)}
                  />
                );
              })}

              {/* Taiwan Island & Penghu & Kinmen Realistic Geography */}
              {(() => {
                const twConf = (activePreset.provinceWarlordMap || {}).taiwan;
                const twColor = twConf ? twConf.color : '#10b981';
                const twLabel = twConf ? twConf.warlord : '臺灣（寶島）';
                return (
                  <g className="transition-all duration-300">
                    {/* Taiwan Main Island */}
                    <path
                      d="M 602,462 Q 609,475 607,492 Q 600,495 596,480 Q 595,468 602,462 Z"
                      fill={twColor}
                      stroke="#261c14"
                      strokeWidth="1.3"
                      className="cursor-pointer transition-colors duration-150"
                      style={{
                        filter: hoveredWarlord === twLabel ? 'brightness(1.15) drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))' : 'none',
                      }}
                      onMouseEnter={() => setHoveredWarlord(twLabel)}
                      onMouseLeave={() => setHoveredWarlord(null)}
                    />
                    {/* Penghu Islands (澎湖巡檢司/澎湖海戰) */}
                    <circle
                      cx="592"
                      cy="477"
                      r="2"
                      fill={twColor}
                      stroke="#261c14"
                      strokeWidth="0.8"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredWarlord(`澎湖群島 (${twLabel})`)}
                      onMouseLeave={() => setHoveredWarlord(null)}
                    />
                    {/* Kinmen (金門料羅灣/古寧頭/八二三) */}
                    <circle
                      cx="582"
                      cy="484"
                      r="1.8"
                      fill={twColor}
                      stroke="#261c14"
                      strokeWidth="0.8"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredWarlord(`金門 (${twLabel})`)}
                      onMouseLeave={() => setHoveredWarlord(null)}
                    />
                  </g>
                );
              })()}
            </g>

            {/* 2. REAL RIVERS (Yellow River & Yangtze River) */}
            <g fill="none" stroke="#0284c7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" className="pointer-events-none">
              <path d="M 280,285 Q 360,270 380,250 Q 410,170 435,170 Q 460,170 470,240 Q 475,325 490,328 Q 530,325 565,295 Q 575,275 580,270" />
              <path d="M 330,430 Q 380,430 430,410 Q 460,395 480,400 Q 515,395 540,415 Q 565,390 580,365 Q 595,370 610,385" />
              <path d="M 445,340 Q 480,360 515,395" strokeWidth="1.8" />
              <path d="M 480,400 Q 482,440 480,465" strokeWidth="1.6" />
              <path d="M 540,415 Q 537,445 535,465" strokeWidth="1.6" />
            </g>

            {/* 3. WARLORD CALLIGRAPHY LABELS */}
            <g fontWeight="bold" className="pointer-events-none select-none font-serif">
              {(activePreset.labels || []).map((lbl, idx) => (
                <text
                  key={idx}
                  x={lbl.pos[0]}
                  y={lbl.pos[1]}
                  fill={lbl.color}
                  fontSize={Math.min(lbl.size || 18, 18)}
                  textAnchor="middle"
                  letterSpacing="1.5"
                  stroke="#fefefe"
                  strokeWidth="1.5"
                  paintOrder="stroke"
                >
                  {lbl.name}
                </text>
              ))}
            </g>

            {/* 4. HISTORIC STRATEGIC CITIES */}
            <g className="select-none pointer-events-none">
              {(activePreset.cities || []).map((c, idx) => (
                <g key={idx} transform={`translate(${c.pos[0]}, ${c.pos[1]})`}>
                  <circle cx="0" cy="0" r={c.isCap ? '4' : '2.8'} fill="#18181b" />
                  {c.isCap && <circle cx="0" cy="0" r="1.5" fill="#ffffff" />}
                  <text
                    x="5"
                    y="3"
                    fill="#18181b"
                    fontSize="9.5"
                    fontWeight="bold"
                    stroke="#f5eedb"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </g>

            {/* 5. INTERACTIVE STRATEGIC BATTLEFIELDS */}
            <g className="select-none">
              {(activePreset.battles || []).map((b, idx) => (
                <g
                  key={idx}
                  transform={`translate(${b.pos[0]}, ${b.pos[1]})`}
                  onClick={(e) => handleBattleMarkerClick(b, e)}
                  className="cursor-pointer group"
                >
                  <circle cx="0" cy="0" r="9" fill="#dc2626" opacity="0.22" />
                  <text
                    x="0"
                    y="3.5"
                    fill="#b91c1c"
                    fontSize="11"
                    fontWeight="extrabold"
                    textAnchor="middle"
                  >
                    ✕
                  </text>
                  <text
                    x="0"
                    y="-8"
                    fill="#7f1d1d"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    stroke="#f5eedb"
                    strokeWidth="2.2"
                    paintOrder="stroke"
                  >
                    {b.name}
                  </text>
                </g>
              ))}
            </g>

            {/* 6. TACTICAL MARCH ROUTES (Animated SVG Arrows) */}
            {showRoutes && activeRoutes.length > 0 && (
              <g className="pointer-events-none">
                {activeRoutes.map((rt, idx) => (
                  <g key={idx}>
                    {/* Outer halo for contrast */}
                    <path
                      d={rt.path}
                      fill="none"
                      stroke="#fef9c3"
                      strokeWidth="4.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.75"
                    />
                    {/* Animated tactical arrow */}
                    <path
                      d={rt.path}
                      fill="none"
                      stroke={rt.color}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={rt.dashed ? '4 3' : '6 3'}
                      markerEnd={`url(#${getMarkerId(rt.color)})`}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="36"
                        to="0"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                ))}
              </g>
            )}

            {/* 7. Dynamic Selected Event Focal Spotlight */}
            {selectedEvent && (
              <g transform={`translate(${focalPos[0]}, ${focalPos[1]})`} className="pointer-events-none">
                <circle cx="0" cy="0" r="6" fill="#d97706" opacity="0.35" />
                <circle cx="0" cy="0" r="3" fill="#b45309" stroke="#fef08a" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="18" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.85">
                  <animate attributeName="r" values="6;22;32" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.95;0.4;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="12" fill="none" stroke="#dc2626" strokeWidth="1.4" opacity="0.7">
                  <animate attributeName="r" values="4;16;24" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.3;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <g transform="translate(0, -14)">
                  <text
                    x="0"
                    y="0"
                    fill="#991b1b"
                    fontSize="8.5"
                    fontWeight="extrabold"
                    textAnchor="middle"
                    stroke="#fef9c3"
                    strokeWidth="2.5"
                    paintOrder="stroke"
                  >
                    ★ {((selectedEvent.locationNameAncient || selectedEvent.locationName || '').split('/')[0] || '').split(' ').pop().trim()}
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* 3. Bottom Historical Chronicles Strip */}
        <div className={`w-full ${isCinemaMode ? 'max-w-[1320px]' : 'max-w-[960px]'} shrink-0 mt-3 p-3 bg-[#eae0c6] rounded-lg border border-[#786047] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#3a2e20] leading-relaxed`}>
          <div className="space-y-1">
            <div className="font-bold text-[#7f1d1d] flex items-center gap-1 mb-1 border-b border-[#c4a676] pb-1">
              <span>📜 {activePreset.yearDisplay} 軍事重大決策與戰況：</span>
            </div>
            {(activePreset.chronicleLeft || []).map((note, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#991b1b] font-bold">·</span>
                <span>{note}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <div className="font-bold text-[#7f1d1d] flex items-center gap-1 mb-1 border-b border-[#c4a676] pb-1">
              <span>⚔️ 戰局演變與地緣影響：</span>
            </div>
            {(activePreset.chronicleRight || []).map((note, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#991b1b] font-bold">·</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Bottom Active Info Bar */}
      <div className="px-4 py-2 shrink-0 bg-[#2b2117] border-t-2 border-[#8c7355] flex flex-wrap items-center justify-between text-xs text-[#f5ebd9]">
        <div className="flex items-center gap-2">
          <span className="text-[#e8c89b] font-bold">當前沙盤年代：</span>
          <span className="font-bold text-white bg-[#78350f] px-2 py-0.5 rounded border border-[#b45309]">
            {activePreset.yearDisplay} · {activePreset.shortLabel ? activePreset.shortLabel.replace(new RegExp(`^(?:西元\\s*)?${activePreset.yearNumber}(?:\\s*年)?\\s*`), '') : ''}
          </span>
          {hoveredWarlord ? (
            <span className="text-[#fef08a] ml-2">
              當前游標所指割據勢力：<b>【{hoveredWarlord}】</b>
            </span>
          ) : (
            <span className="text-[#d6c5af] ml-2 hidden sm:inline">
              點擊地圖「✕ 戰場」可開啟戰役詳情，右側時間軸可開啟「▶ 自動推演百年歷史」
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
