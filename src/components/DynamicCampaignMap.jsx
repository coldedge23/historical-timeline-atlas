import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Swords, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  MapPin, 
  Compass,
  ArrowRight,
  Layers,
  Sparkles
} from './Icons.js';
import { CAMPAIGN_STAGES } from '../data/threeKingdoms/index.js';

const MAP_W = 1000;
const MAP_H = 750;

// Coordinate transformation: 96°E~124°E, 19°N~42°N -> 1000x750 SVG
const toSvgCoords = (lat, lng) => {
  const x = (lng - 96) * (880 / 28) + 40;
  const y = (42 - lat) * (660 / 23) + 40;
  return [Math.round(x), Math.round(y)];
};

export const DynamicCampaignMap = ({
  events,
  battles,
  selectedEvent,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
}) => {
  // Active Stage Index (0: 漢末群雄, 1: 赤壁, 2: 三國鼎立, 3: 天下一統)
  const [activeStageIndex, setActiveStageIndex] = useState(2);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: MAP_W, h: MAP_H });
  const [hoveredFaction, setHoveredFaction] = useState(null);
  const [hoveredMarch, setHoveredMarch] = useState(null);

  const currentStage = CAMPAIGN_STAGES[activeStageIndex];

  // Auto-sync active stage and position when an event is selected from Timeline
  useEffect(() => {
    if (!selectedEvent) return;

    // Find which stage this event belongs to by year
    const stageIdx = CAMPAIGN_STAGES.findIndex(
      (s) => selectedEvent.year >= s.years[0] && selectedEvent.year <= s.years[1]
    );

    if (stageIdx !== -1 && stageIdx !== activeStageIndex) {
      setActiveStageIndex(stageIdx);
    }

    if (selectedEvent.coordinates) {
      const [lat, lng] = selectedEvent.coordinates;
      const [targetX, targetY] = toSvgCoords(lat, lng);

      const zoomW = 540;
      const zoomH = 405;
      const vx = Math.max(0, Math.min(MAP_W - zoomW, targetX - zoomW / 2));
      const vy = Math.max(0, Math.min(MAP_H - zoomH, targetY - zoomH / 2));

      setViewBox({ x: vx, y: vy, w: zoomW, h: zoomH });
    }
  }, [selectedEvent]);

  // Handle stage tab click
  const handleSelectStage = (idx) => {
    setActiveStageIndex(idx);
    setViewBox({ x: 0, y: 0, w: MAP_W, h: MAP_H });
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

  // Convert current stage factions polygons
  const stageFactions = currentStage.factions.map((f) => {
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
    <div className="relative w-full h-[640px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b0d11] select-none flex flex-col font-sans">
      {/* Top Bar: Stage / Epoch Evolution Slider */}
      <div className="z-30 glass-panel border-b border-white/10 px-3 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {CAMPAIGN_STAGES.map((stg, idx) => (
            <button
              key={stg.id}
              onClick={() => handleSelectStage(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeStageIndex === idx
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-900/40 ring-1 ring-amber-400/50'
                  : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60'
              }`}
            >
              <span>{stg.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({stg.periodDisplay.split('西元 ')[1]})</span>
            </button>
          ))}
        </div>

        {/* Zoom & Reset Tools */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <button
            onClick={() => handleZoom(0.8)}
            title="放大地圖"
            className="p-1.5 rounded bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(1.25)}
            title="縮小地圖"
            className="p-1.5 rounded bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewBox({ x: 0, y: 0, w: MAP_W, h: MAP_H })}
            title="重設全景"
            className="p-1.5 rounded bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Context Headline Banner */}
      <div className="px-4 py-1.5 bg-gradient-to-r from-amber-950/40 via-zinc-900/80 to-transparent border-b border-white/5 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-bold font-serif text-amber-300">{currentStage.headline}</span>
          <span className="text-zinc-500 hidden md:inline">|</span>
          <span className="text-zinc-400 text-[11px] truncate hidden md:inline">{currentStage.description}</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 w-full h-full relative overflow-hidden">
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full transition-all duration-500 ease-out"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="ancientGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
            </pattern>

            {/* Glowing filter */}
            <filter id="beaconGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* March Animated Dash */}
            <style>
              {`
                @keyframes dashAnimation {
                  to {
                    stroke-dashoffset: -30;
                  }
                }
                .march-line {
                  animation: dashAnimation 1.5s linear infinite;
                }
              `}
            </style>
          </defs>

          {/* Deep Dark Antique Canvas Base */}
          <rect width={MAP_W} height={MAP_H} fill="#0d0f14" />
          <rect width={MAP_W} height={MAP_H} fill="url(#ancientGrid)" />

          {/* Authentic Coastline (China mainland, Taiwan, Bohai, Hangzhou Bay) */}
          <g fill="#12151c" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2">
            {/* China Mainland Coastline Mass */}
            <path
              d="M 690 40 
                 Q 670 120 660 160 
                 Q 630 150 560 135 
                 Q 580 180 640 200 
                 Q 660 210 650 230 
                 Q 600 240 590 280 
                 Q 620 310 640 330 
                 Q 610 360 610 390 
                 Q 590 420 570 460 
                 Q 530 520 480 550 
                 Q 420 580 390 620 
                 L 350 750 L 0 750 L 0 0 L 700 0 Z"
            />

            {/* Taiwan Island (夷洲) Realistic Island Contour */}
            <path
              d="M 685 495 
                 Q 695 515 698 545 
                 Q 692 585 686 615 
                 Q 678 610 672 575 
                 Q 668 540 676 505 Z"
              fill="rgba(234, 179, 8, 0.22)"
              stroke="#eab308"
              strokeWidth="1.8"
            />

            {/* Hainan Island */}
            <path
              d="M 370 640 Q 400 645 405 670 Q 380 685 365 670 Z"
              fill="#181c25"
            />
          </g>

          {/* Water Names */}
          <text x="800" y="520" fill="#202635" fontSize="18" fontFamily="serif" fontWeight="bold" letterSpacing="6">
            東 海（太 平 洋）
          </text>
          <text x="682" y="555" fill="#facc15" fontSize="13" fontWeight="bold" fontFamily="serif" textAnchor="middle">
            夷 洲
          </text>
          <text x="682" y="572" fill="#a1a1aa" fontSize="9" fontFamily="serif" textAnchor="middle">
            (今臺灣本島)
          </text>
          <text x="635" y="540" fill="#2d3748" fontSize="11" fontFamily="serif" letterSpacing="2">
            臺灣海峽
          </text>
          <text x="440" y="700" fill="#202635" fontSize="15" fontFamily="serif" fontWeight="bold" letterSpacing="4">
            南 海
          </text>

          {/* Major Historical River Networks (Yellow, Yangtze, Huai, Han) */}
          <g fill="none">
            {/* 黃河 (幾字形奔騰入海) */}
            <path
              d="M 120 280 Q 230 290 270 230 Q 300 130 350 140 Q 400 150 400 270 Q 400 270 510 270 Q 560 260 610 230"
              stroke="#b45309"
              strokeWidth="3.2"
              strokeDasharray="8,3"
              opacity="0.85"
            />
            <text x="460" y="255" fill="#d97706" fontSize="12" fontFamily="serif" fontWeight="bold">
              黃河
            </text>

            {/* 長江 (金沙江、巴蜀、三峽夔門、赤壁至江東) */}
            <path
              d="M 170 420 Q 250 430 310 400 Q 370 380 430 395 Q 490 400 550 360 Q 600 340 640 330"
              stroke="#0284c7"
              strokeWidth="4"
              opacity="0.9"
            />
            <text x="495" y="380" fill="#38bdf8" fontSize="12" fontFamily="serif" fontWeight="bold">
              長江
            </text>

            {/* 淮河 (南北分界要衝) */}
            <path
              d="M 430 320 Q 510 320 590 310"
              stroke="#0284c7"
              strokeWidth="2"
              opacity="0.8"
            />
            <text x="525" y="315" fill="#7dd3fc" fontSize="11" fontFamily="serif">
              淮河
            </text>
          </g>

          {/* Dynamic Factions of Current Stage */}
          <g>
            {stageFactions.map((f) => (
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
                  className="hover:brightness-125 transition-all"
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
                  x={f.capSvgX - 32}
                  y={f.capSvgY + 9}
                  width="64"
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
                  fontSize="10.5"
                  fontWeight="bold"
                  fontFamily="serif"
                  textAnchor="middle"
                >
                  {f.capital.split('（')[0]}
                </text>
              </g>
            ))}
          </g>

          {/* Dynamic March Routes & Tactical Arrows */}
          <g>
            {currentStage.marches && currentStage.marches.map((m) => {
              const svgPoints = m.points.map(([lat, lng]) => toSvgCoords(lat, lng));
              const d = svgPoints.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr[0]} ${curr[1]}`, '');
              const endPt = svgPoints[svgPoints.length - 1];

              return (
                <g 
                  key={m.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMarch(m)}
                  onMouseLeave={() => setHoveredMarch(null)}
                >
                  {/* Glowing wide backdrop line */}
                  <path
                    d={d}
                    fill="none"
                    stroke={m.color}
                    strokeWidth="5"
                    opacity="0.35"
                  />

                  {/* Animated dashed marching line */}
                  <path
                    d={d}
                    fill="none"
                    stroke={m.color}
                    strokeWidth="2.5"
                    strokeDasharray="6,4"
                    className="march-line"
                  />

                  {/* Arrowhead endpoint */}
                  <circle cx={endPt[0]} cy={endPt[1]} r="4" fill={m.color} stroke="#ffffff" strokeWidth="1.5" />
                </g>
              );
            })}
          </g>

          {/* Battles of this stage */}
          <g>
            {battles.map((b) => {
              const isActiveInStage = currentStage.featuredBattles.includes(b.id);
              const [bx, by] = toSvgCoords(b.coordinates[0], b.coordinates[1]);

              return (
                <g
                  key={b.id}
                  transform={`translate(${bx}, ${by})`}
                  className={`cursor-pointer transition-opacity duration-300 ${isActiveInStage ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`}
                  onClick={() => onSelectBattle(b)}
                >
                  {isActiveInStage && (
                    <circle r="18" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1.5">
                      <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}

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
                <circle r="36" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.8">
                  <animate attributeName="r" values="14;48" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.4s" repeatCount="indefinite" />
                </circle>

                <circle r="14" fill="#d97706" stroke="#fef3c7" strokeWidth="2.5" filter="url(#beaconGlow)" />
                <text x="0" y="5" fontSize="14" textAnchor="middle">
                  📍
                </text>

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

      {/* Selected Event Floating Card (Bottom Left) */}
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

      {/* March Route Tooltip Hover */}
      {hoveredMarch && (
        <div className="absolute top-16 right-3 z-30 glass-panel p-3 rounded-xl border border-amber-500/50 text-xs shadow-xl space-y-1 animate-in fade-in max-w-xs pointer-events-none">
          <h4 className="font-bold text-amber-300 font-serif text-sm flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredMarch.color }} />
            <span>{hoveredMarch.label}</span>
          </h4>
          <p className="text-zinc-300 text-[11px] leading-relaxed">
            {hoveredMarch.description}
          </p>
        </div>
      )}

      {/* Hovered Faction Demographic Stat Badge */}
      {hoveredFaction && (
        <div className="absolute top-16 left-3 z-30 glass-panel p-3 rounded-xl border border-white/10 text-xs shadow-xl space-y-1 animate-in fade-in duration-150 pointer-events-none max-w-xs">
          <h4 className="font-bold font-serif text-sm" style={{ color: hoveredFaction.borderColor }}>
            {hoveredFaction.name}
          </h4>
          <p className="text-zinc-200">
            <b>統帥領袖：</b>{hoveredFaction.leader}
          </p>
          <p className="text-zinc-300">
            <b>治所：</b>{hoveredFaction.capital}
          </p>
          <p className="text-zinc-400">
            <b>軍政實力：</b>{hoveredFaction.powerLevel}
          </p>
          <p className="text-amber-400 text-[11px] pt-1 border-t border-white/5">
            <b>歷史定位：</b>{hoveredFaction.historicalRole}
          </p>
        </div>
      )}

      {/* Stage Legend Footer */}
      <div className="absolute bottom-3 right-3 z-20 glass-panel p-2.5 rounded-lg border border-white/10 text-xs hidden sm:block pointer-events-auto">
        <div className="text-[11px] font-bold text-amber-400 mb-1 flex items-center justify-between gap-3">
          <span>{currentStage.name} 勢力分佈</span>
          <span className="text-zinc-500 text-[10px]">{currentStage.periodDisplay}</span>
        </div>
        <div className="space-y-1 text-[11px]">
          {currentStage.factions.map((f) => (
            <div key={f.id} className="flex items-center gap-2" style={{ color: f.borderColor }}>
              <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: f.borderColor }} />
              <span className="truncate">{f.name.split('（')[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
