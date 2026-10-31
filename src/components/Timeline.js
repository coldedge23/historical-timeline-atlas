import { SourceDisclosure } from './SourceDisclosure.jsx';
import { isContextReview } from '../data/chronologyReviews.js';
import { pendingLinkCount } from '../utils/figureLinks.js';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Swords, 
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  BookOpen,
  Globe
} from './Icons.js';
import { getFactionMeta } from '../data/factionConfig.js';

function getContemporaryRegimeLabel(civ, year) {
  if (civ === 'china') {
    if (year < -770) return '商周時代';
    if (year < -221) return '春秋戰國';
    if (year < 220) return '秦漢帝國';
    if (year < 280) return '魏蜀吳三國';
    if (year < 581) return '魏晉南北朝';
    if (year < 907) return '隋唐盛世';
    if (year < 960) return '五代十國';
    if (year < 1279) return '宋遼金夏';
    if (year < 1368) return '大元帝國';
    if (year < 1644) return '大明帝國';
    if (year < 1912) return '大清帝國';
    return '近現代中華';
  }
  if (civ === 'japan') {
    if (year < 710) return '飛鳥・古墳時代';
    if (year < 794) return '奈良時代';
    if (year < 1185) return '平安時代';
    if (year < 1336) return '鎌倉幕府';
    if (year < 1467) return '室町南北朝';
    if (year < 1573) return '戰國群雄時代';
    if (year < 1603) return '安土桃山時代';
    if (year < 1853) return '江戶德川幕府';
    if (year < 1868) return '幕末尊皇倒幕';
    return '明治維新・近代日本';
  }
  if (civ === 'taiwan') {
    if (year < 1624) return '南島原住民部落與大肚王國';
    if (year < 1662) return '荷西殖民與大航海時代';
    if (year < 1683) return '明鄭東寧王國';
    if (year < 1874) return '清領拓墾時期';
    if (year < 1895) return '清季自強建省時期';
    if (year < 1945) return '日治抗日與啟蒙時期';
    return '戰後臺灣與現代矽島';
  }
  return '';
}

export const Timeline = ({
  events = [],
  figures = [],
  battles = [],
  selectedEvent,
  onSelectEvent,
  onSelectFigureById,
  onSelectBattleById,
  ancientNamesOnly,
  activePeriodId,
  searchTerm = '',
  onClearSearch,
  onSearchChange,
  civilizationMode = 'china',
  crossCivPools = null,
  onJumpToCrossCivEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFiguresEventId, setExpandedFiguresEventId] = useState(null);
  const [expandedTagsEventId, setExpandedTagsEventId] = useState(null);
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

  // Handle click on tags: Jump to figure, battle, or apply as search filter
  const handleTagClick = (tag, e) => {
    e.stopPropagation();
    setIsAutoPlaying(false);

    // 1. Check if tag matches a figure name or courtesyName
    const matchingFig = figures.find(
      (f) => f.name === tag || (f.courtesyName && f.courtesyName.includes(tag))
    );
    if (matchingFig && onSelectFigureById) {
      onSelectFigureById(matchingFig.id);
      return;
    }

    // 2. Check if tag matches a battle name
    const matchingBat = battles.find(
      (b) => b.name === tag || b.name.includes(tag) || tag.includes(b.name)
    );
    if (matchingBat && onSelectBattleById) {
      onSelectBattleById(matchingBat.id);
      return;
    }

    // 3. Otherwise, set as search filter term
    if (onSearchChange) {
      onSearchChange(tag);
    }
  };

  // Smoothly and reliably scroll target event card inside the Timeline container, level with the map
  const scrollToSelectedCard = (eventId) => {
    if (!eventId) return;
    const el = itemRefs.current[eventId];
    const container = containerRef.current;
    if (!el || !container) return;

    // Lock programmatic scrolling so onScroll doesn't overwrite selectedEvent during travel
    isProgrammaticScrolling.current = true;
    if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current);
    programmaticScrollTimer.current = setTimeout(() => {
      isProgrammaticScrolling.current = false;
    }, 750);

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const relativeTop = elRect.top - containerRect.top + container.scrollTop;
    // Align target card near the top of the timeline viewport (12px padding) so it sits right next to the map
    const targetTop = Math.max(0, relativeTop - 12);
    container.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
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
  }, [selectedEvent?.id, selectedEvent?._scrollTs]);

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
    <div className="flex flex-col h-full max-h-full min-h-0 bg-[#141519] rounded-xl border border-white/10 overflow-hidden shadow-xl">
      {/* Timeline Controls & Auto-Play Header */}
      <div className="p-3 border-b border-white/10 glass-panel space-y-2 shrink-0">
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

        {/* Active Search Filter Alert */}
        {searchTerm && onClearSearch && (
          <div className="flex items-center justify-between bg-amber-950/50 border border-amber-500/50 px-2.5 py-1.5 rounded-lg text-xs text-amber-200 shadow-sm">
            <span className="flex items-center gap-1.5 truncate">
              <span className="text-amber-400">🔍</span>
              <span>目前篩選：<b className="text-amber-300">「{searchTerm}」</b></span>
              <span className="text-zinc-400 text-[10px]">({events.length} 筆)</span>
            </span>
            <button
              onClick={onClearSearch}
              className="text-[11px] text-amber-400 hover:text-white bg-amber-900/60 hover:bg-amber-800 px-2 py-0.5 rounded border border-amber-500/40 transition-colors ml-2 shrink-0 cursor-pointer font-medium"
            >
              清除篩選
            </button>
          </div>
        )}

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
        className="timeline-scroll flex-1 min-h-0 overflow-y-auto p-3 space-y-3"
      >
        {filteredEvents.map((evt) => {
          const isSelected = selectedEvent?.id === evt.id;
          const factionBadge = getFactionBadge(evt.faction);
          const linkedFigures = (evt.figureIds || [])
            .map((fid) => (figures || []).find((f) => f.id === fid))
            .filter(Boolean);
          const contextFigures = linkedFigures.filter(figure=>isContextReview(evt.figureLinkReviews?.[figure.id]));
          const allEvtFigures = linkedFigures.filter(figure=>!isContextReview(evt.figureLinkReviews?.[figure.id]));
          const showAllFigs = expandedFiguresEventId === evt.id;
          const visibleFigures = allEvtFigures.slice(0, showAllFigs ? 30 : 8);
          const remainingCount = allEvtFigures.length - visibleFigures.length;
          const tags = evt.tags || [];
          const showAllTags = expandedTagsEventId === evt.id;
          const visibleTags = showAllTags ? tags : tags.slice(0, 3);
          const toggleEvent = () => {
            setIsAutoPlaying(false);
            isTimelineScrolling.current = false;
            onSelectEvent(isSelected ? null : evt);
            if (!isSelected) scrollToSelectedCard(evt.id);
          };

          return (
            <article
              key={evt.id}
              ref={(el) => (itemRefs.current[evt.id] = el)}
              className={`timeline-card ${isSelected ? 'is-selected' : ''}`}
            >
              {/* Year, era and faction on one quiet line */}
              <div className="timeline-card-meta">
                <span className="timeline-card-year">{evt.yearDisplay}</span>
                {evt.eraName && <span className="timeline-card-era">{evt.eraName}</span>}
                <span className={`timeline-card-faction ${factionBadge.bg}`}>{factionBadge.text}</span>
              </div>

              <h3 className="font-serif text-zinc-100">
                <button type="button" className="timeline-event-title" aria-expanded={isSelected} onClick={toggleEvent}>
                  <span>{evt.title}</span>
                  <ChevronDown aria-hidden="true" className="timeline-card-chevron" />
                  <span className="sr-only">{isSelected ? '收起' : '展開'}</span>
                </button>
              </h3>

              <p className={`timeline-card-summary ${isSelected ? '' : 'line-clamp-2'}`}>{evt.summary}</p>

              {!isSelected && (
                <p className="timeline-card-facts">
                  {evt.locationNameAncient && (
                    <span><MapPin aria-hidden="true" className="w-3.5 h-3.5" />{evt.locationNameAncient}</span>
                  )}
                  {allEvtFigures.length > 0 && (
                    <span><Users aria-hidden="true" className="w-3.5 h-3.5" />{allEvtFigures.length} 位人物</span>
                  )}
                  {evt.battleId && (
                    <span><Swords aria-hidden="true" className="w-3.5 h-3.5" />戰役</span>
                  )}
                </p>
              )}

              {isSelected && (
                <div className="timeline-card-body animate-in fade-in duration-150">
                  {/* People and battle: the most-used next steps */}
                  <section className="timeline-card-section" aria-label="地點、人物與戰役">
                    <p className="timeline-card-place">
                      <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                      <span>{evt.locationNameAncient}</span>
                      {!ancientNamesOnly && evt.locationNameModern && <span className="text-zinc-400">（{evt.locationNameModern}）</span>}
                    </p>
                    {(visibleFigures.length > 0 || evt.battleId) && (
                      <div className="timeline-card-chips">
                        {evt.battleId && (
                          <button type="button" className="timeline-chip is-battle"
                            onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); onSelectBattleById(evt.battleId); }}>
                            <Swords aria-hidden="true" className="w-3.5 h-3.5" />查看戰役詳情
                          </button>
                        )}
                        {visibleFigures.map((fig) => (
                          <button key={fig.id} type="button" className="timeline-chip is-figure"
                            onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(false); onSelectFigureById(fig.id); }}>
                            {fig.avatar && (
                              <img src={fig.avatar} alt="" className="w-4 h-4 rounded-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                            )}
                            {fig.name}
                          </button>
                        ))}
                        {(remainingCount > 0 || showAllFigs) && allEvtFigures.length > 8 && (
                          <button type="button" className="timeline-chip is-more"
                            onClick={(e) => { e.stopPropagation(); setExpandedFiguresEventId(showAllFigs ? null : evt.id); }}>
                            {showAllFigs ? '收合人物' : `+${remainingCount} 位人物`}
                          </button>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Cross-Civilization Contemporary Sync Reference */}
                  {crossCivPools && typeof evt.year === 'number' && (() => {
                    const civMeta = {
                      china: { label: '華夏', badgeBg: 'bg-amber-950/60 border-amber-500/40 text-amber-300' },
                      taiwan: { label: '臺灣', badgeBg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' },
                      japan: { label: '日本', badgeBg: 'bg-rose-950/60 border-rose-500/40 text-rose-300' },
                    };
                    const otherCivs = ['china', 'taiwan', 'japan'].filter((c) => c !== civilizationMode);
                    const matches = otherCivs.map((civKey) => {
                      const pool = crossCivPools[civKey] || [];
                      let closest = null;
                      let minDiff = Infinity;
                      for (const item of pool) {
                        if (typeof item.year === 'number') {
                          const d = Math.abs(item.year - evt.year);
                          if (d < minDiff) {
                            minDiff = d;
                            closest = item;
                          }
                        }
                      }
                      const regimeLabel = getContemporaryRegimeLabel(civKey, evt.year);
                      return { civKey, meta: civMeta[civKey], regimeLabel, closest, minDiff };
                    });

                    return (
                      <section className="timeline-card-section" aria-label="同期東亞歷史橫向對照">
                        <h4 className="timeline-card-heading">
                          <Globe aria-hidden="true" className="w-3.5 h-3.5 text-indigo-300" />
                          同期東亞歷史橫向對照
                          <span className="timeline-card-heading-note">{evt.year > 0 ? `西元 ${evt.year} 年` : `前 ${Math.abs(evt.year)} 年`}・點擊可跨文明跳轉</span>
                        </h4>
                        <ul className="timeline-sync-list">
                          {matches.map(({ civKey, meta, regimeLabel, closest, minDiff }) => (
                            <li key={civKey}>
                              <button type="button" disabled={!closest} className="timeline-sync-row group/sync"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (closest && onJumpToCrossCivEvent) {
                                    setIsAutoPlaying(false);
                                    onJumpToCrossCivEvent(civKey, closest);
                                  }
                                }}
                                title={closest ? `點擊切換至${meta.label}星圖並定位「${closest.title}」` : ''}>
                                <span className={`timeline-sync-civ ${meta.badgeBg}`}>{meta.label}</span>
                                <span className="timeline-sync-text">
                                  <strong>{regimeLabel}</strong>
                                  {closest && <span>{closest.year > 0 ? `${closest.year}年` : `前${Math.abs(closest.year)}年`}・{(closest.title || '').split('：')[0]}</span>}
                                </span>
                                {closest && (
                                  <span className="timeline-sync-diff">
                                    {minDiff === 0 ? '同年' : `±${minDiff}年`}
                                    <ChevronRight aria-hidden="true" className="w-3 h-3" />
                                  </span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })()}

                  {(evt.detail || evt.impact) && (
                    <details className="event-narrative timeline-card-section">
                      <summary>閱讀歷史始末與影響</summary>
                      {evt.detail && (
                        <div className="timeline-narrative-block">
                          <h4 className="timeline-card-heading"><BookOpen aria-hidden="true" className="w-3.5 h-3.5 text-amber-400" />歷史始末</h4>
                          <p>{evt.detail}</p>
                        </div>
                      )}
                      {evt.impact && (
                        <div className="timeline-narrative-block">
                          <h4 className="timeline-card-heading"><Sparkles aria-hidden="true" className="w-3.5 h-3.5 text-amber-400" />深遠影響</h4>
                          <p>{evt.impact}</p>
                        </div>
                      )}
                    </details>
                  )}

                  {tags.length > 0 && (
                    <div className="timeline-card-chips is-tags">
                      {visibleTags.map((tag, idx) => {
                        const matchingFig = figures.find(
                          (f) => f.name === tag || (f.courtesyName && f.courtesyName.includes(tag))
                        );
                        const matchingBat = battles.find(
                          (b) => b.name === tag || b.name.includes(tag) || tag.includes(b.name)
                        );
                        const tip = matchingFig
                          ? `點擊開啟人物列傳：${matchingFig.name}`
                          : matchingBat
                          ? `點擊開啟戰役詳情：${matchingBat.name}`
                          : `點擊以「${tag}」篩選年表`;

                        return (
                          <button key={idx} type="button" onClick={(e) => handleTagClick(tag, e)} title={tip} className="timeline-chip is-tag">
                            {matchingFig ? (
                              <Users aria-hidden="true" className="w-3 h-3 text-blue-300 shrink-0" />
                            ) : matchingBat ? (
                              <Swords aria-hidden="true" className="w-3 h-3 text-rose-300 shrink-0" />
                            ) : (
                              <span aria-hidden="true" className="text-amber-400/80">#</span>
                            )}
                            {tag}
                          </button>
                        );
                      })}
                      {tags.length > 3 && (
                        <button type="button" className="timeline-chip is-more"
                          onClick={(e) => { e.stopPropagation(); setExpandedTagsEventId(showAllTags ? null : evt.id); }}>
                          {showAllTags ? '收合標籤' : `+${tags.length - 3}`}
                        </button>
                      )}
                    </div>
                  )}

                  {contextFigures.length > 0 && <details className="text-sm text-zinc-300"><summary className="cursor-pointer py-2">背景與年代待考人物（{contextFigures.length} 位）</summary>
                    {contextFigures.map(figure=><button key={figure.id} type="button" className="block text-left text-amber-200 py-2" onClick={()=>onSelectFigureById(figure.id)}>{figure.name}・{evt.figureLinkReviews[figure.id].label}</button>)}
                  </details>}
                  {pendingLinkCount(evt) > 0 && <p className="text-sm text-amber-200">另有 {pendingLinkCount(evt)} 筆人物連結待確認，暫不列入有效清單。</p>}
                  <SourceDisclosure record={evt} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
