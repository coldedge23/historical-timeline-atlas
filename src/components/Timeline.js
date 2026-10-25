import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Swords, 
  ChevronRight,
  Sparkles,
  BookOpen
} from './Icons.js';
import { getFactionMeta } from '../data/factionConfig.js';

export const Timeline = ({
  events,
  figures,
  selectedEvent,
  onSelectEvent,
  onSelectFigureById,
  onSelectBattleById,
  ancientNamesOnly,
  activePeriodId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFiguresEventId, setExpandedFiguresEventId] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(3200); // ms per event
  const itemRefs = useRef({});
  const containerRef = useRef(null);
  const isTimelineScrolling = useRef(false);
  const isProgrammaticScrolling = useRef(false);
  const programmaticScrollTimer = useRef(null);
  const scrollSpyTimerRef = useRef(null);

  // Auto-detect period if not explicitly supplied
  const effectivePeriodId = activePeriodId || (
    events.some((e) => e.faction === 'qin' || e.faction === 'zhao' || e.faction === 'qi')
      ? 'warringStates'
      : events.some((e) => e.faction === 'shu' || e.faction === 'wu')
      ? 'threeKingdoms'
      : 'qinHan'
  );

  const categories = [
    { id: 'all', label: `全部 (${events.length})` },
    { id: 'military', label: '⚔️ 軍事征伐' },
    { id: 'political', label: '🏛️ 帝王政權' },
    { id: 'diplomatic', label: '🚢 外交遠航' },
  ];

  const filteredEvents = events.filter((evt) => {
    if (selectedCategory === 'all') return true;
    return evt.category === selectedCategory;
  });

  // Smoothly and reliably scroll target event card to upper view, level with the map
  const scrollToSelectedCard = (eventId) => {
    if (!eventId) return;
    const el = itemRefs.current[eventId];
    if (!el) return;

    // Lock programmatic scrolling so onScroll doesn't overwrite selectedEvent during travel
    isProgrammaticScrolling.current = true;
    if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current);
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScrolling.current = false;
    }, 700);

    // 1. Native browser scrollIntoView (guaranteed to scroll the containing viewport)
    try {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } catch (e) {}

    // 2. Also adjust container explicit scrollTop for precision
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const relativeTop = elRect.top - containerRect.top + container.scrollTop;
      // Position target card in upper section (~18%) for immediate prominent visibility
      const targetTop = relativeTop - (container.clientHeight * 0.18);
      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    }
  };

  // Real-time scroll-spy: when user scrolls timeline with wheel/scrollbar/touch, synchronize the map in real-time
  const handleContainerScroll = () => {
    if (isProgrammaticScrolling.current || isAutoPlaying || filteredEvents.length === 0) return;

    if (scrollSpyTimerRef.current) clearTimeout(scrollSpyTimerRef.current);
    scrollSpyTimerRef.current = setTimeout(() => {
      if (isProgrammaticScrolling.current) return;
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const targetY = containerRect.top + (containerRect.clientHeight * 0.26);

      let closestEvt = null;
      let minDistance = Infinity;

      for (const evt of filteredEvents) {
        const el = itemRefs.current[evt.id];
        if (!el) continue;
        const elRect = el.getBoundingClientRect();
        const dist = Math.abs(elRect.top - targetY);
        if (dist < minDistance) {
          minDistance = dist;
          closestEvt = evt;
        }
      }

      if (closestEvt && closestEvt.id !== selectedEvent?.id) {
        isTimelineScrolling.current = true;
        onSelectEvent(closestEvt);
      }
    }, 60);
  };

  // Auto-play history tour interval
  useEffect(() => {
    if (!isAutoPlaying || filteredEvents.length === 0) return;

    const timer = setInterval(() => {
      const currentIndex = filteredEvents.findIndex((e) => e.id === selectedEvent?.id);
      const nextIndex = currentIndex >= 0 && currentIndex < filteredEvents.length - 1 ? currentIndex + 1 : 0;
      onSelectEvent(filteredEvents[nextIndex]);
    }, playSpeed);

    return () => clearInterval(timer);
  }, [isAutoPlaying, playSpeed, filteredEvents, selectedEvent, onSelectEvent]);

  // When selectedEvent changes (via click, map preset click, or autoplay), smooth-scroll the timeline directly to that event
  useEffect(() => {
    if (!selectedEvent?.id) return;
    if (isTimelineScrolling.current) {
      // Triggered by timeline scrolling itself; do not fight user's scroll
      isTimelineScrolling.current = false;
      return;
    }
    scrollToSelectedCard(selectedEvent.id);
    const t1 = setTimeout(() => scrollToSelectedCard(selectedEvent.id), 60);
    const t2 = setTimeout(() => scrollToSelectedCard(selectedEvent.id), 180);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedEvent?.id]);

  // Reset scroll when switching historical epoch
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [effectivePeriodId]);

  const currentEvtIdx = Math.max(
    0,
    filteredEvents.findIndex((e) => e.id === selectedEvent?.id)
  );
  const progressPct =
    filteredEvents.length > 1
      ? Math.round(((currentEvtIdx + 1) / filteredEvents.length) * 100)
      : 100;

  const getFactionBadge = (faction) => {
    const meta = getFactionMeta(faction, effectivePeriodId);
    return { text: meta.label, bg: meta.badge };
  };

  return (
    <div className="flex flex-col h-full bg-[#141519] rounded-xl border border-white/10 overflow-hidden shadow-xl">
      {/* Timeline Controls & Auto-Play Header */}
      <div className="p-3 border-b border-white/10 glass-panel space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-serif text-amber-200">雙軸歷史年表</span>
            <span className="text-[10px] font-mono text-zinc-400">
              ({currentEvtIdx + 1}/{filteredEvents.length})
            </span>
          </div>

          {/* Auto-Play History Tour Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoPlaying((v) => !v)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                isAutoPlaying
                  ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-950/50 animate-pulse'
                  : 'bg-amber-600/20 text-amber-300 border-amber-500/40 hover:bg-amber-600/30'
              }`}
            >
              <span>{isAutoPlaying ? '⏸ 暫停推演' : '▶ 自動推演百年'}</span>
            </button>

            {isAutoPlaying && (
              <button
                onClick={() => setPlaySpeed((s) => (s === 3200 ? 1600 : 3200))}
                title="切換推演速度"
                className="px-2 py-1 rounded bg-zinc-800 border border-white/10 text-[10px] font-mono text-amber-300 hover:bg-zinc-700"
              >
                {playSpeed === 1600 ? '2x 速' : '1x 速'}
              </button>
            )}
          </div>
        </div>

        {/* Category Filters & Progress Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsAutoPlaying(false);
                  containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600/90 text-white shadow-sm'
                    : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chronological Progress Strip */}
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-rose-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Events List */}
      <div
        ref={containerRef}
        onScroll={handleContainerScroll}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {filteredEvents.map((evt) => {
          const isSelected = selectedEvent?.id === evt.id;
          const factionBadge = getFactionBadge(evt.faction);
          const allEvtFigures = (evt.figureIds || [])
            .map((fid) => figures.find((f) => f.id === fid))
            .filter(Boolean);
          const showAllFigs = expandedFiguresEventId === evt.id;
          const displayLimit = isSelected ? (showAllFigs ? 30 : 8) : 4;
          const visibleFigures = allEvtFigures.slice(0, displayLimit);
          const remainingCount = allEvtFigures.length - visibleFigures.length;

          return (
            <div
              key={evt.id}
              ref={(el) => (itemRefs.current[evt.id] = el)}
              onClick={() => {
                setIsAutoPlaying(false);
                isTimelineScrolling.current = false;
                onSelectEvent(evt);
                scrollToSelectedCard(evt.id);
              }}
              className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-950/40 via-[#1a1b22] to-[#16171d] border-amber-500/80 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/50'
                  : 'bg-[#18191e]/80 border-white/5 hover:border-white/20 hover:bg-[#1f2027]'
              }`}
            >
              {/* Dual Track Year & Reign Title */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
                    {evt.yearDisplay}
                  </span>
                  <span className="text-[11px] font-serif text-zinc-300 bg-zinc-800/80 px-2 py-0.5 rounded border border-white/5">
                    {evt.eraName}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${factionBadge.bg}`}>
                  {factionBadge.text}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="font-serif font-bold text-sm text-zinc-100 group-hover:text-amber-200 transition-colors mb-1.5 flex items-center justify-between">
                <span>{evt.title}</span>
                {isSelected && <ChevronRight className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />}
              </h3>

              {/* Event Summary */}
              <p className={`text-xs text-zinc-300 leading-relaxed mb-2 ${isSelected ? '' : 'line-clamp-2 text-zinc-400'}`}>
                {evt.summary}
              </p>

              {/* Expanded Detail & Impact when Selected */}
              {isSelected && (
                <div className="mt-2.5 mb-3 space-y-2.5 pt-2.5 border-t border-amber-500/20 text-xs animate-in fade-in duration-150">
                  {evt.detail && (
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 text-zinc-300 leading-relaxed text-justify">
                      <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-1 font-serif">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>歷史始末詳情</span>
                      </div>
                      {evt.detail}
                    </div>
                  )}

                  {evt.impact && (
                    <div className="bg-amber-950/25 p-2.5 rounded-lg border-l-2 border-amber-500 text-amber-100/90 leading-relaxed">
                      <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1 mb-0.5 font-serif">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>深遠歷史影響</span>
                      </div>
                      {evt.impact}
                    </div>
                  )}

                  {evt.tags && evt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {evt.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Metadata tags: Location, Figures & Battle Link */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-[11px]">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* Location */}
                  <span className="flex items-center gap-1 text-zinc-400">
                    <MapPin className="w-3 h-3 text-amber-400/80 shrink-0" />
                    <span>{evt.locationNameAncient}</span>
                    {!ancientNamesOnly && (
                      <span className="text-zinc-500 text-[10px]">({evt.locationNameModern})</span>
                    )}
                  </span>

                  {/* Battle Link Button if attached */}
                  {evt.battleId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        onSelectBattleById(evt.battleId);
                      }}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-950/70 text-rose-200 border border-rose-600/50 text-[10px] font-bold hover:bg-rose-800 hover:text-white transition-colors shadow-sm"
                    >
                      <Swords className="w-3 h-3 text-rose-400" />
                      <span>查看戰役詳情</span>
                    </button>
                  )}
                </div>

                {/* Related Figures Buttons with tiny avatars */}
                {visibleFigures.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Users className="w-3 h-3 text-blue-400/80 shrink-0" />
                    {visibleFigures.map((fig) => (
                      <button
                        key={fig.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoPlaying(false);
                          onSelectFigureById(fig.id);
                        }}
                        className="flex items-center gap-1 pl-1 pr-1.5 py-0.5 rounded bg-blue-950/40 text-blue-200 border border-blue-800/40 text-[10px] hover:bg-blue-800/60 hover:text-white transition-colors"
                      >
                        {fig.avatar && (
                          <img
                            src={fig.avatar}
                            alt={fig.name}
                            className="w-3.5 h-3.5 rounded-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <span>{fig.name}</span>
                      </button>
                    ))}
                    {remainingCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSelected) {
                            onSelectEvent(evt);
                          } else {
                            setExpandedFiguresEventId(showAllFigs ? null : evt.id);
                          }
                        }}
                        className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 hover:text-amber-300 text-[10px] border border-white/5"
                      >
                        +{remainingCount} 位人物
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
