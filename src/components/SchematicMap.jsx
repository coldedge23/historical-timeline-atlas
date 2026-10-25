import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Landmark, 
  Swords, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  MapPin, 
  Compass
} from './Icons.js';

// Base map dimensions
const MAP_W = 1000;
const MAP_H = 750;

// Accurate geographic projection to 1000x750 SVG canvas
// China Longitude roughly 96°E to 124°E, Latitude roughly 20°N to 42°N
// Taiwan at ~121°E, 23.5°N
const toSvgCoords = (lat, lng) => {
  const x = (lng - 96) * (880 / 28) + 40;
  const y = (42 - lat) * (660 / 22) + 40;
  return [Math.round(x), Math.round(y)];
};

export const SchematicMap = ({
  territories,
  events,
  battles,
  selectedEvent,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
}) => {
  // viewBox: x, y, width, height (default: full view)
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: MAP_W, h: MAP_H });
  const [hoveredFaction, setHoveredFaction] = useState(null);
  const [activePreset, setActivePreset] = useState('all');

  // When an event is selected from Timeline, automatically pan & zoom to it!
  useEffect(() => {
    if (!selectedEvent || !selectedEvent.coordinates) return;
    const [lat, lng] = selectedEvent.coordinates;
    const [targetX, targetY] = toSvgCoords(lat, lng);

    const zoomW = 500;
    const zoomH = 375;
    const vx = Math.max(0, Math.min(MAP_W - zoomW, targetX - zoomW / 2));
    const vy = Math.max(0, Math.min(MAP_H - zoomH, targetY - zoomH / 2));

    setViewBox({ x: vx, y: vy, w: zoomW, h: zoomH });
  }, [selectedEvent]);

  // Preset region jump
  const handleJumpToRegion = (presetKey) => {
    setActivePreset(presetKey);
    switch (presetKey) {
      case 'all':
        setViewBox({ x: 0, y: 0, w: MAP_W, h: MAP_H });
        break;
      case 'wei': // 曹魏 (中原、華北、關中)
        setViewBox({ x: 220, y: 40, w: 580, h: 435 });
        break;
      case 'shu': // 蜀漢 (巴蜀、漢中、南中)
        setViewBox({ x: 50, y: 200, w: 550, h: 412 });
        break;
      case 'wu': // 東吳 (江東、長江中下游、嶺南)
        setViewBox({ x: 300, y: 220, w: 600, h: 450 });
        break;
      case 'taiwan': // 夷洲 (臺灣)
        setViewBox({ x: 560, y: 420, w: 400, h: 300 });
        break;
      default:
        break;
    }
  };

  const handleZoom = (factor) => {
    setViewBox((prev) => {
      const newW = Math.max(350, Math.min(MAP_W, prev.w * factor));
      const newH = Math.max(260, Math.min(MAP_H, prev.h * factor));
      const centerX = prev.x + prev.w / 2;
      const centerY = prev.y + prev.h / 2;
      const newX = Math.max(0, Math.min(MAP_W - newW, centerX - newW / 2));
      const newY = Math.max(0, Math.min(MAP_H - newH, centerY - newH / 2));
      return { x: newX, y: newY, w: newW, h: newH };
    });
  };

  // Convert territory polygons to SVG points
  const svgFactions = territories.factions.map((f) => {
    const pointsStr = f.polygon.map(([lat, lng]) => toSvgCoords(lat, lng).join(',')).join(' ');
    const [capX, capY] = toSvgCoords(f.capitalCoords[0], f.capitalCoords[1]);
    return {
      ...f,
      points: pointsStr,
      capSvgX: capX,
      capSvgY: capY,
    };
  });

  return (
    <div className="relative w-full h-[620px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e1015] select-none flex flex-col">
      {/* Top Floating Controls */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Region Presets */}
        <div className="glass-panel px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 pointer-events-auto border border-white/10 text-xs shadow-lg">
          <span className="text-[11px] text-zinc-400 font-bold px-1">區域焦點：</span>
          <button
            onClick={() => handleJumpToRegion('all')}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              activePreset === 'all' ? 'bg-amber-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            全域總覽
          </button>
          <button
            onClick={() => handleJumpToRegion('wei')}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              activePreset === 'wei' ? 'bg-blue-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            曹魏 (中原)
          </button>
          <button
            onClick={() => handleJumpToRegion('shu')}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              activePreset === 'shu' ? 'bg-rose-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            蜀漢 (巴蜀)
          </button>
          <button
            onClick={() => handleJumpToRegion('wu')}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              activePreset === 'wu' ? 'bg-emerald-600 text-white font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            東吳 (江東)
          </button>
          <button
            onClick={() => handleJumpToRegion('taiwan')}
            className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
              activePreset === 'taiwan' ? 'bg-amber-500 text-black font-bold shadow' : 'text-amber-300 hover:text-amber-100'
            }`}
          >
            夷洲 (臺灣)
          </button>
        </div>

        {/* Zoom & Reset Tools */}
        <div className="glass-panel p-1.5 rounded-lg flex items-center gap-1 pointer-events-auto border border-white/10 text-xs text-zinc-300 shadow-lg">
          <button
            onClick={() => handleZoom(0.8)}
            title="放大地圖"
            className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(1.25)}
            title="縮小地圖"
            className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleJumpToRegion('all')}
            title="重設全景視角"
            className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full transition-all duration-500 ease-out"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="ancientGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
            </pattern>

            {/* Glowing filter */}
            <filter id="beaconGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Antique Dark Background */}
          <rect width={MAP_W} height={MAP_H} fill="#0e1014" />
          <rect width={MAP_W} height={MAP_H} fill="url(#ancientGrid)" />

          {/* Sea / Ocean Tone (Pacific & Taiwan Strait) */}
          <path
            d="M 680 0 Q 640 240 660 380 Q 670 520 620 650 L 1000 750 L 1000 0 Z"
            fill="#090b0f"
          />
          <text x="820" y="520" fill="#222733" fontSize="18" fontFamily="serif" fontWeight="bold" letterSpacing="6">
            東 海（太 平 洋）
          </text>
          <text x="690" y="520" fill="#31394c" fontSize="12" fontFamily="serif" letterSpacing="3">
            臺灣海峽
          </text>

          {/* Major Historical Rivers (黃河、長江、淮河) */}
          <g fill="none">
            {/* 黃河 (Yellow River) */}
            <path
              d="M 120 280 Q 220 290 270 230 Q 300 130 350 140 Q 400 150 400 270 Q 400 270 510 270 Q 570 260 620 220"
              stroke="#b45309"
              strokeWidth="3"
              strokeDasharray="6,3"
              opacity="0.85"
            />
            <text x="460" y="255" fill="#f59e0b" fontSize="12" fontFamily="serif" fontWeight="bold">
              黃河
            </text>

            {/* 長江 (Yangtze River) */}
            <path
              d="M 170 420 Q 250 430 310 400 Q 370 380 430 395 Q 490 400 550 360 Q 610 340 660 330"
              stroke="#0284c7"
              strokeWidth="4"
              opacity="0.9"
            />
            <text x="500" y="380" fill="#38bdf8" fontSize="12" fontFamily="serif" fontWeight="bold">
              長江
            </text>

            {/* 淮河 (Huai River) */}
            <path
              d="M 430 320 Q 510 320 600 305"
              stroke="#0284c7"
              strokeWidth="2"
              opacity="0.75"
            />
            <text x="530" y="315" fill="#7dd3fc" fontSize="11" fontFamily="serif">
              淮河
            </text>
          </g>

          {/* Factions Territory Polygons (曹魏、蜀漢、東吳、夷洲) */}
          <g>
            {svgFactions.map((f) => (
              <g 
                key={f.id} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredFaction(f)}
                onMouseLeave={() => setHoveredFaction(null)}
              >
                <polygon
                  points={f.points}
                  fill={f.color}
                  stroke={f.borderColor}
                  strokeWidth={hoveredFaction?.id === f.id ? "3.5" : "2"}
                  strokeDasharray={f.faction === 'taiwan' ? "6,4" : undefined}
                />

                {/* Capital Marker */}
                <circle
                  cx={f.capSvgX}
                  cy={f.capSvgY}
                  r="7"
                  fill={f.borderColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <rect
                  x={f.capSvgX - 30}
                  y={f.capSvgY + 9}
                  width="60"
                  height="19"
                  rx="4"
                  fill="rgba(15,16,21,0.95)"
                  stroke={f.borderColor}
                  strokeWidth="1"
                />
                <text
                  x={f.capSvgX}
                  y={f.capSvgY + 23}
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="serif"
                  textAnchor="middle"
                >
                  {f.capitalAncient.split('（')[0]}
                </text>
              </g>
            ))}
          </g>

          {/* Prominent Faction Territory Watermarks */}
          <text x="440" y="210" fill="rgba(96, 165, 250, 0.45)" fontSize="36" fontWeight="bold" fontFamily="serif" letterSpacing="14">
            曹 魏
          </text>
          <text x="210" y="440" fill="rgba(248, 113, 113, 0.45)" fontSize="36" fontWeight="bold" fontFamily="serif" letterSpacing="14">
            蜀 漢
          </text>
          <text x="520" y="460" fill="rgba(52, 211, 153, 0.45)" fontSize="36" fontWeight="bold" fontFamily="serif" letterSpacing="14">
            東 吳
          </text>
          <text x="740" y="580" fill="rgba(234, 179, 8, 0.9)" fontSize="20" fontWeight="bold" fontFamily="serif" letterSpacing="4">
            夷 洲
          </text>
          <text x="740" y="605" fill="#a1a1aa" fontSize="11" fontFamily="serif">
            (今臺灣本島)
          </text>

          {/* Major Battles (Swords & Red Pulse Halo) */}
          <g>
            {battles.map((b) => {
              const [bx, by] = toSvgCoords(b.coordinates[0], b.coordinates[1]);
              return (
                <g
                  key={b.id}
                  transform={`translate(${bx}, ${by})`}
                  className="cursor-pointer"
                  onClick={() => onSelectBattle(b)}
                >
                  <circle r="18" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1.5">
                    <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>

                  <circle r="13" fill="#991b1b" stroke="#fecaca" strokeWidth="2" />
                  <text x="0" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    ⚔
                  </text>

                  <rect
                    x="-28"
                    y="15"
                    width="56"
                    height="18"
                    rx="4"
                    fill="rgba(15,16,21,0.92)"
                    stroke="#ef4444"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="28"
                    fill="#fecaca"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {b.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Selected Event Focus Beacon (📍) */}
          {selectedEvent && selectedEvent.coordinates && (() => {
            const [ex, ey] = toSvgCoords(selectedEvent.coordinates[0], selectedEvent.coordinates[1]);
            return (
              <g transform={`translate(${ex}, ${ey})`}>
                {/* Golden Pulse Rings */}
                <circle r="36" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8">
                  <animate attributeName="r" values="14;48" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.4s" repeatCount="indefinite" />
                </circle>

                {/* Golden Badge */}
                <circle r="14" fill="#d97706" stroke="#fef3c7" strokeWidth="2.5" filter="url(#beaconGlow)" />
                <text x="0" y="5" fontSize="14" textAnchor="middle">
                  📍
                </text>

                {/* Event Name Banner right above pin */}
                <g transform="translate(0, -22)">
                  <rect
                    x="-65"
                    y="-20"
                    width="130"
                    height="22"
                    rx="5"
                    fill="#78350f"
                    stroke="#fde68a"
                    strokeWidth="1.5"
                    filter="url(#beaconGlow)"
                  />
                  <text
                    x="0"
                    y="-5"
                    fill="#fef3c7"
                    fontSize="11.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="serif"
                  >
                    {selectedEvent.title.slice(0, 8)}...
                  </text>
                </g>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Selected Event Floating Card (Bottom of Map) */}
      {selectedEvent && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-30 glass-panel p-4 rounded-xl border border-amber-500/60 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-amber-600 text-white px-2 py-0.5 rounded">
                {selectedEvent.yearDisplay}
              </span>
              <span className="text-xs text-amber-300 font-serif">
                {selectedEvent.eraName}
              </span>
            </div>
            <span className="text-xs text-zinc-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {selectedEvent.locationNameAncient}
                {!ancientNamesOnly && ` (今${selectedEvent.locationNameModern})`}
              </span>
            </span>
          </div>

          <h3 className="text-base font-bold text-amber-100 font-serif mb-1.5">
            {selectedEvent.title}
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed text-justify line-clamp-3">
            {selectedEvent.summary}
          </p>

          {selectedEvent.battleId && (
            <div className="mt-2.5 pt-2 border-t border-white/5 flex justify-end">
              <button
                onClick={() => {
                  const b = battles.find((bt) => bt.id === selectedEvent.battleId);
                  if (b) onSelectBattle(b);
                }}
                className="flex items-center gap-1 text-xs text-rose-400 font-bold hover:text-rose-300"
              >
                <Swords className="w-3.5 h-3.5" />
                <span>開啟此役戰報詳情 &rarr;</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hovered Faction Demographic Stat Badge */}
      {hoveredFaction && (
        <div className="absolute top-16 left-3 z-30 glass-panel p-3 rounded-xl border border-white/10 text-xs shadow-xl space-y-1 animate-in fade-in duration-150 pointer-events-none">
          <h4 className="font-bold font-serif text-sm" style={{ color: hoveredFaction.borderColor }}>
            {hoveredFaction.name}
          </h4>
          <p className="text-zinc-300">
            <b>治所：</b>{hoveredFaction.capitalAncient}
          </p>
          <p className="text-zinc-400">
            <b>官方戶數：</b>{hoveredFaction.registeredHouseholds || '部落社會未編戶'}
          </p>
          <p className="text-zinc-400">
            <b>官方人口：</b>{hoveredFaction.registeredPopulation || '估計十餘萬'}
          </p>
          <p className="text-amber-400 text-[11px] pt-1 border-t border-white/5">
            <b>主要族群：</b>{hoveredFaction.ethnicities.map((e) => e.name).join('、')}
          </p>
        </div>
      )}

      {/* Map Legend (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-20 glass-panel p-2.5 rounded-lg border border-white/10 text-xs hidden sm:block pointer-events-auto">
        <div className="text-[11px] font-bold text-amber-400 mb-1.5 flex items-center justify-between gap-3">
          <span>三國疆域圖例</span>
          <span className="text-zinc-500 text-[10px]">西元229年成熟期</span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex items-center gap-2 text-blue-300">
            <span className="w-3 h-3 rounded bg-blue-500/50 border border-blue-400"></span>
            <span>曹魏 (中原、河北、關中)</span>
          </div>
          <div className="flex items-center gap-2 text-rose-300">
            <span className="w-3 h-3 rounded bg-rose-500/50 border border-rose-400"></span>
            <span>蜀漢 (巴蜀、漢中、南中)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <span className="w-3 h-3 rounded bg-emerald-500/50 border border-emerald-400"></span>
            <span>東吳 (江東、荊州、嶺南)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300">
            <span className="w-3 h-3 rounded bg-amber-500/50 border border-amber-400 border-dashed"></span>
            <span>夷洲 (臺灣本島全境)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
