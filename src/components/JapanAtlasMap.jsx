import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Clock,
  MapPin,
  Swords
} from './Icons.js';
import {
  JAPAN_PROVINCE_PATHS,
  JAPAN_WARLORD_PERIOD_CONFIGS,
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
  const configsToUse = JAPAN_WARLORD_PERIOD_CONFIGS;

  // Derive initial preset from selectedEvent or activeJapanEraId
  const getInitialPreset = () => {
    if (selectedEvent && selectedEvent.year) {
      return configsToUse.reduce((best, p) =>
        Math.abs(p.yearNumber - selectedEvent.year) < Math.abs(best.yearNumber - selectedEvent.year) ? p : best,
        configsToUse[0]
      );
    }
    if (activeJapanEraId === 'jp_ancient_medieval') return configsToUse[0];
    if (activeJapanEraId === 'jp_sengoku') return configsToUse[0]; // 1560
    if (activeJapanEraId === 'jp_azuchi_momoyama') return configsToUse[2]; // 1582
    if (activeJapanEraId === 'jp_edo') return configsToUse[4]; // 1615
    if (activeJapanEraId === 'jp_bakumatsu') return configsToUse[5]; // 1868
    if (activeJapanEraId === 'jp_meiji_modern') return configsToUse[6]; // 1877
    return configsToUse[0];
  };

  const [activePreset, setActivePreset] = useState(getInitialPreset);
  const [hoveredWarlord, setHoveredWarlord] = useState(null);
  const [showRoutes, setShowRoutes] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const tabsScrollRef = useRef(null);
  const tabRefs = useRef({});
  const mapScrollContainerRef = useRef(null);

  // Sync preset when selectedEvent changes
  useEffect(() => {
    if (!selectedEvent || !selectedEvent.year) return;
    const yr = selectedEvent.year;
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
  }, [selectedEvent?.id, selectedEvent?.year]);

  // Smooth scroll active period button into center
  useEffect(() => {
    if (activePreset && tabRefs.current[activePreset.id] && tabsScrollRef.current) {
      const tabEl = tabRefs.current[activePreset.id];
      const container = tabsScrollRef.current;
      const tabRect = tabEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeLeft = tabRect.left - containerRect.left + container.scrollLeft;
      const targetScrollLeft = relativeLeft - container.clientWidth / 2 + tabEl.clientWidth / 2;
      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth'
      });
    }
  }, [activePreset?.id]);

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
      const foundEvt = events.find((ev) => (b.battleId && ev.battleId === b.battleId));
      if (foundEvt) onSelectEvent({ ...foundEvt, _scrollTs: Date.now() });
    }
  };

  const getMarkerId = (color) => {
    if (color === '#dc2626') return 'arrow-red';
    if (color === '#2563eb') return 'arrow-blue';
    if (color === '#16a34a') return 'arrow-green';
    if (color === '#d97706') return 'arrow-amber';
    return 'arrow-slate';
  };

  const activeRoutes = activePreset.routes || [];

  return (
    <div className="relative w-full h-full max-h-full min-h-0 rounded-xl overflow-hidden border-2 border-[#8c7355] shadow-2xl bg-[#f5eedb] select-none flex flex-col font-serif">
      {/* 1. Header Toolbar with Chronological Period Tabs (Like China Three Kingdoms Map) */}
      <div className="px-3 py-2 bg-[#2b2117] border-b-2 border-[#8c7355] flex flex-wrap items-center justify-between gap-2 text-xs text-[#f5ebd9] shrink-0">
        <div ref={tabsScrollRef} className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
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
                  // Map to era ID if applicable
                  if (onSelectJapanEraId) {
                    if (p.yearNumber <= 1575) onSelectJapanEraId('jp_sengoku');
                    else if (p.yearNumber <= 1600) onSelectJapanEraId('jp_azuchi_momoyama');
                    else if (p.yearNumber <= 1853) onSelectJapanEraId('jp_edo');
                    else if (p.yearNumber <= 1869) onSelectJapanEraId('jp_bakumatsu');
                    else onSelectJapanEraId('jp_meiji_modern');
                  }
                  if (events && events.length > 0) {
                    const closestEvt = events.reduce((best, e) => {
                      return Math.abs(e.year - p.yearNumber) < Math.abs(best.year - p.yearNumber) ? e : best;
                    }, events[0]);
                    if (closestEvt && onSelectEvent) {
                      onSelectEvent({ ...closestEvt, _scrollTs: Date.now() });
                    }
                  }
                }}
                className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-[#d97706] text-white font-bold shadow-md ring-1 ring-[#fef08a]'
                    : 'bg-[#3d3022] text-[#d6c5af] hover:bg-[#53412d] hover:text-white'
                }`}
              >
                {p.yearDisplay} {p.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Map Graphic (100% Real Geographical Boundary Integration) */}
      <div ref={mapScrollContainerRef} className="relative flex-1 min-h-0 overflow-y-auto bg-[#f4ecd8] p-3 sm:p-4 flex flex-col items-center">
        {/* Top-Left Big Headline Stamp */}
        <div className="w-full shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 px-1 gap-2 max-w-[960px]">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#262018] font-serif">
              <span className="text-2xl sm:text-3xl text-[#991b1b] mr-2">{activePreset.yearDisplay}</span>
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

        {/* The SVG Real Geographic Atlas Map Canvas */}
        <div
          className={`w-full max-w-[960px] aspect-[820/720] shrink-0 bg-[#efe5cd] rounded-lg border-2 border-[#786047] shadow-xl overflow-hidden relative cursor-grab active:cursor-grabbing`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Floating Map Zoom, Route Toggle & Reset Toolbar (Top-Right) */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-[#2b2117]/90 backdrop-blur-sm p-1 rounded-lg border border-[#8c7355] shadow-lg">
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
          </div>

          {/* Bottom-Left Floating Tactical Campaign Route Legend Card */}
          {showRoutes && activeRoutes.length > 0 && (
            <div className="absolute bottom-2.5 left-2.5 z-10 max-w-[340px] bg-[#1e1713]/90 backdrop-blur-md p-2 rounded-lg border border-[#8c7355] shadow-xl text-[11px] space-y-1 font-serif pointer-events-none select-none">
              <div className="text-[#fef08a] font-bold flex items-center justify-between border-b border-[#8c7355]/50 pb-1">
                <span>📖 {activePreset.yearDisplay} 戰術行軍動線</span>
                <span className="text-[10px] text-amber-300">戰役詳情 →</span>
              </div>
              {activeRoutes.map((rt, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[#e5d5be] text-[10.5px]">
                  <span
                    className="w-3 h-1.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: rt.color }}
                  />
                  <span className="truncate">{rt.label}</span>
                </div>
              ))}
            </div>
          )}

          <svg
            viewBox="0 0 820 720"
            className="w-full h-full transition-transform duration-150 ease-out"
            style={{
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

            {/* Subtle Continental & Island Hints at Canvas Edges */}
            <g fill="#e3d6b8" stroke="#baa98b" strokeWidth="1.2" className="pointer-events-none select-none font-serif">
              <path d="M 0,380 L 40,400 L 50,440 L 42,475 L 20,510 L 0,520 Z" />
              <text x="18" y="445" fill="#a89a80" fontSize="10" fontWeight="bold">朝鮮半島 (釜山)</text>

              <path d="M 565,0 L 575,22 L 595,20 L 608,0 Z" />
              <text x="575" y="14" fill="#a89a80" fontSize="8.5" fontWeight="bold">庫頁島 (樺太)</text>

              <path d="M 725,65 L 750,45 L 778,28 L 810,12 L 820,20 L 755,75 Z" />
              <text x="745" y="42" fill="#a89a80" fontSize="9" fontWeight="bold">千島列島</text>

              <path d="M 40,685 L 65,680 L 80,695 L 60,705 Z" />
              <text x="45" y="700" fill="#a89a80" fontSize="9" fontWeight="bold">琉球諸島</text>
            </g>

            {/* 1. SEAMLESS CONTIGUOUS PROVINCES FILLED BY WARLORD DOMAIN */}
            <g stroke="#261c14" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
              {Object.entries(JAPAN_PROVINCE_PATHS).map(([provKey, provItem]) => {
                const conf = (activePreset.provinceWarlordMap || {})[provKey];
                const fillCol = conf ? conf.color : '#e2e8f0';
                const warlordName = conf ? conf.warlord : provItem.name;
                const isHovered = hoveredWarlord === warlordName;

                return (
                  <path
                    key={provKey}
                    d={provItem.d}
                    fill={fillCol}
                    className="cursor-pointer transition-colors duration-150"
                    style={{
                      filter: isHovered ? 'brightness(1.12) drop-shadow(0 0 6px rgba(220, 38, 38, 0.5))' : 'none',
                    }}
                    onMouseEnter={() => setHoveredWarlord(warlordName)}
                    onMouseLeave={() => setHoveredWarlord(null)}
                  />
                );
              })}
            </g>

            {/* 2. LAKE BIWA (琵琶湖) */}
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
              <path d="M 454,410 Q 468,382 484,352" strokeWidth="2.2" />
              <text x="472" y="380" fill="#0369a1" fontSize="7.5" fontWeight="bold" stroke="none">信濃川</text>

              <path d="M 502,408 Q 525,418 554,422" strokeWidth="2.2" />
              <text x="532" y="415" fill="#0369a1" fontSize="7.5" fontWeight="bold" stroke="none">利根川</text>

              <path d="M 424,420 Q 412,442 404,464" strokeWidth="2" />
              <path d="M 368,464 Q 358,472 344,484" strokeWidth="2.4" />
            </g>

            {/* 4. JAPAN MOUNTAIN TOPOGRAPHY & MOUNT FUJI */}
            <g fill="none" stroke="#2c5b36" strokeLinecap="round" opacity="0.45" className="pointer-events-none select-none">
              <path d="M 412,410 Q 430,425 448,435 Q 465,445 470,455" strokeWidth="3" />
              <path d="M 425,405 Q 440,420 455,438" strokeWidth="2.2" stroke="#4a7c59" />
              <path d="M 536,365 Q 548,310 562,250" strokeWidth="2.5" />
              <path d="M 180,490 Q 225,475 270,460" strokeWidth="2.5" />
            </g>

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

              {/* MOUNT FUJI (🗻 富士山 3776m) */}
              <polygon points="466,463 472,450 478,463" fill="#5a6b5c" stroke="#2b3b2c" strokeWidth="1.2" />
              <polygon points="469.5,455 472,450 474.5,455" fill="#ffffff" />
              <text x="472" y="445" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">
                ▲ 富士山 (3776m)
              </text>
            </g>

            {/* 5. GIANT WARLORD CALLIGRAPHY LABELS (Matching China Three Kingdoms Style) */}
            <g fontWeight="bold" className="pointer-events-none select-none font-serif">
              {(activePreset.labels || []).map((lbl, idx) => (
                <text
                  key={idx}
                  x={lbl.pos[0]}
                  y={lbl.pos[1]}
                  fill={lbl.color}
                  fontSize={lbl.size}
                  textAnchor="middle"
                  letterSpacing="4"
                  stroke="#ffffff"
                  strokeWidth="3.2"
                  paintOrder="stroke"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
                >
                  {lbl.name}
                </text>
              ))}
            </g>

            {/* 6. HISTORIC STRATEGIC CITIES & CAPITALS (● 與 ◎) */}
            <g className="select-none pointer-events-none font-serif">
              {(activePreset.cities || []).map((c, idx) => (
                <g key={idx} transform={`translate(${c.pos[0]}, ${c.pos[1]})`}>
                  {c.isCap ? (
                    <>
                      <circle cx="0" cy="0" r="5.5" fill="#b91c1c" />
                      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                      <circle cx="0" cy="0" r="9" fill="none" stroke="#d97706" strokeWidth="1.2" opacity="0.85">
                        <animate attributeName="r" values="6;12;16" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.9;0.3;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </>
                  ) : (
                    <circle cx="0" cy="0" r="3" fill="#18181b" stroke="#ffffff" strokeWidth="1" />
                  )}
                  <text
                    x={c.isCap ? '9' : '6'}
                    y="3.5"
                    fill={c.isCap ? '#991b1b' : '#18181b'}
                    fontSize={c.isCap ? '10.5' : '9'}
                    fontWeight="bold"
                    stroke="#f5eedb"
                    strokeWidth="2.5"
                    paintOrder="stroke"
                  >
                    {c.name}
                  </text>
                </g>
              ))}
            </g>

            {/* 7. INTERACTIVE STRATEGIC BATTLEFIELDS (Crossed Swords ⚔️) */}
            <g className="select-none font-serif">
              {(activePreset.battles || []).map((b, idx) => (
                <g
                  key={idx}
                  transform={`translate(${b.pos[0]}, ${b.pos[1]})`}
                  onClick={(e) => handleBattleMarkerClick(b, e)}
                  className="cursor-pointer group"
                >
                  <circle cx="0" cy="0" r="10" fill="#dc2626" opacity="0.22" />
                  <circle cx="0" cy="0" r="8" fill="#b91c1c" stroke="#ffffff" strokeWidth="1.5" className="group-hover:scale-125 transition-transform" />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="8.5"
                    fontWeight="bold"
                  >
                    ⚔
                  </text>
                  <text
                    x="0"
                    y="-11"
                    fill="#7f1d1d"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    stroke="#ffffff"
                    strokeWidth="2.8"
                    paintOrder="stroke"
                    letterSpacing="0.5"
                  >
                    {b.name}
                  </text>
                </g>
              ))}
            </g>

            {/* 8. TACTICAL MARCH ROUTES (Animated SVG Arrows) */}
            {showRoutes && activeRoutes.length > 0 && (
              <g className="pointer-events-none">
                {activeRoutes.map((rt, idx) => (
                  <g key={idx}>
                    {/* Outer glow halo for contrast */}
                    <path
                      d={rt.path}
                      fill="none"
                      stroke="#fef9c3"
                      strokeWidth="4.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.8"
                    />
                    {/* Animated tactical arrow */}
                    <path
                      d={rt.path}
                      fill="none"
                      stroke={rt.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6 3"
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

            {/* 9. ANTIQUE CARTOGRAPHY: COMPASS ROSE & SCALE BAR */}
            <g transform="translate(85, 95)" opacity="0.45" className="pointer-events-none select-none font-serif">
              <circle r="22" fill="none" stroke="#8c7355" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 0,-26 L 4,-6 L 0,0 L -4,-6 Z" fill="#991b1b" />
              <path d="M 0,26 L 4,6 L 0,0 L -4,6 Z" fill="#44382c" />
              <path d="M 26,0 L 6,4 L 0,0 L 6,-4 Z" fill="#44382c" />
              <path d="M -26,0 L -6,4 L 0,0 L -6,-4 Z" fill="#44382c" />
              <text y="-29" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">北</text>
            </g>

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

        {/* 3. Bottom Historical Chronicles Strip (Matching China Three Kingdoms Style) */}
        <div className="w-full max-w-[960px] shrink-0 mt-3 p-3 bg-[#eae0c6] rounded-lg border border-[#786047] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#3a2e20] leading-relaxed font-serif">
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

        {/* 4. Selected Battle Detail Card (Drawer at Bottom if clicked) */}
        {selectedBattle && (
          <div className="w-full max-w-[960px] mt-3 p-3.5 rounded-xl bg-[#261c14] border-2 border-[#8c7355] text-[#f5ebd9] shadow-2xl flex flex-col gap-2">
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

      {/* 5. Bottom Active Info Bar */}
      <div className="px-4 py-2 shrink-0 bg-[#2b2117] border-t-2 border-[#8c7355] flex flex-wrap items-center justify-between text-xs text-[#f5ebd9]">
        <div className="flex items-center gap-2">
          <span className="text-[#e8c89b] font-bold">當前沙盤年代：</span>
          <span className="font-bold text-white bg-[#78350f] px-2 py-0.5 rounded border border-[#b45309]">
            {activePreset.yearDisplay} · {activePreset.shortLabel}
          </span>
          {hoveredWarlord ? (
            <span className="text-[#fef08a] ml-2">
              當前游標所指割據勢力：<b>【{hoveredWarlord}】</b>
            </span>
          ) : (
            <span className="text-[#d6c5af] ml-2 hidden sm:inline">
              點擊地圖「⚔️ 戰場」可開啟戰役詳情，可開啟「🔀 行軍路線」觀看歷史名將進軍動線
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
