import { isContextReview } from '../data/chronologyReviews.js';
import { linkedEvents, figureRelations, pendingLinkCount } from '../utils/figureLinks.js';
import { resolvePeriodId } from '../utils/period.js';
import React, { useState, useMemo, useEffect } from 'react';
import { Users, Search, MapPin, Calendar, Filter } from './Icons.js';
import { FACTION_CONFIGS, getFactionMeta } from '../data/factionConfig.js';

const PAGE_SIZE = 36;

export const FiguresView = ({
  figures,
  referenceFigures = figures,
  referenceEvents = [],
  onSelectFigure,
  ancientNamesOnly,
  globalSearchTerm = '',
  activePeriodId,
}) => {
  const [selectedFaction, setSelectedFaction] = useState('all');
  const [selectedRoleType, setSelectedRoleType] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);

  const effectivePeriodId = resolvePeriodId(activePeriodId, figures);

  useEffect(() => {
    setSelectedFaction('all'); setSelectedRoleType('all'); setSearch('');
    setCurrentPage(1); setShowAllPages(false);
  }, [effectivePeriodId]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFaction, selectedRoleType, sortBy, search, globalSearchTerm]);

  const factions = useMemo(() => {
    const counts = {};
    figures.forEach((f) => {
      counts[f.faction] = (counts[f.faction] || 0) + 1;
    });

    const periodConfig = FACTION_CONFIGS[effectivePeriodId] || FACTION_CONFIGS.threeKingdoms;
    const order = periodConfig.order || Object.keys(counts);

    const list = [{ id: 'all', label: `全部人物 (${figures.length})` }];
    order.forEach((facId) => {
      if (counts[facId] > 0) {
        const meta = getFactionMeta(facId, effectivePeriodId);
        list.push({
          id: facId,
          label: `${meta.label} (${counts[facId]})`,
        });
      }
    });

    Object.keys(counts).forEach((facId) => {
      if (!order.includes(facId) && counts[facId] > 0) {
        const meta = getFactionMeta(facId, effectivePeriodId);
        list.push({
          id: facId,
          label: `${meta.label} (${counts[facId]})`,
        });
      }
    });

    return list;
  }, [figures, effectivePeriodId]);

  const roleCategories = [
    { id: 'all', label: '全部定位' },
    { id: 'ruler', label: '👑 君主/諸侯' },
    { id: 'strategist', label: '📜 文臣/謀士/學者' },
    { id: 'general', label: '⚔️ 名將/武臣/義士' },
    { id: 'lady', label: '🌸 后妃/名媛' },
  ];

  const matchRoleCategory = (fig, roleCat) => {
    if (roleCat === 'all') return true;
    const roleStr = [...(fig.roles || []), fig.role || ''].join(' ');
    const text = `${roleStr} ${fig.bio || ''}`;
    if (roleCat === 'ruler') {
      return (
        fig.roleType === 'monarch' ||
        /皇帝|君主|主公|霸主|王|州牧|太守|盟主|單于|可汗|大總統|太祖|太宗|世祖|高祖/.test(roleStr)
      );
    }
    if (roleCat === 'lady') {
      return (
        /皇后|皇太后|太后|夫人|昭儀|貴妃|公主|才女|美人|名媛|女將|女詞人|妻|母|氏/.test(roleStr) ||
        fig.name.endsWith('氏')
      );
    }
    if (roleCat === 'strategist') {
      return (
        fig.roleType === 'scholar' ||
        fig.roleType === 'minister' ||
        /謀|軍師|丞相|宰相|首輔|大學士|尚書|侍中|從事|別駕|長史|主簿|太常|司徒|司空|大夫|名士|文|才子|智|諫|太傅|思想|大儒|哲學|科學|工程|詩|詞|小說|戲|書|畫|醫|變法|維新|清官/.test(
          roleStr
        )
      );
    }
    if (roleCat === 'general') {
      return (
        fig.roleType === 'general' ||
        /將|都督|元帥|總兵|提督|校尉|先鋒|騎|統帥|太守|猛|驍|勇士|力士|護衛|都尉|節度使|水師|起義|烈士|英雄/.test(
          text
        )
      );
    }
    return true;
  };

  const filteredAndSortedFigures = useMemo(() => {
    const combinedQuery = `${globalSearchTerm} ${search}`.trim().toLowerCase();

    const list = figures.filter((fig) => {
      if (selectedFaction !== 'all' && fig.faction !== selectedFaction) return false;
      if (!matchRoleCategory(fig, selectedRoleType)) return false;

      if (combinedQuery) {
        const terms = combinedQuery.split(/\s+/);
        const searchable = [
          fig.name || '',
          fig.courtesyName || '',
          fig.posthumousName || '',
          fig.nativePlaceAncient || '',
          fig.nativePlaceModern || '',
          ...(fig.roles || []),
          fig.bio || '',
        ]
          .join(' ')
          .toLowerCase();

        return terms.every((t) => searchable.includes(t));
      }
      return true;
    });

    if (sortBy === 'birth_asc') {
      return [...list].sort((a, b) => (a.birthYear ?? 9999) - (b.birthYear ?? 9999));
    }
    if (sortBy === 'abilities_desc') {
      const sumAbilities = (f) =>
        f.abilities
          ? Object.values(f.abilities).reduce((acc, v) => acc + (Number(v) || 0), 0)
          : 0;
      return [...list].sort((a, b) => sumAbilities(b) - sumAbilities(a));
    }
    if (sortBy === 'events_desc') {
      return [...list].sort(
        (a, b) => linkedEvents(b, referenceEvents).filter(event=>!isContextReview(b.eventLinkReviews?.[event.id])).length - linkedEvents(a, referenceEvents).filter(event=>!isContextReview(a.eventLinkReviews?.[event.id])).length
      );
    }
    if (sortBy === 'relations_desc') {
      return [...list].sort((a, b) => figureRelations(b, referenceFigures).length - figureRelations(a, referenceFigures).length);
    }
    return list;
  }, [figures, referenceFigures, referenceEvents, selectedFaction, selectedRoleType, sortBy, search, globalSearchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedFigures.length / PAGE_SIZE));
  const displayedFigures = showAllPages
    ? filteredAndSortedFigures
    : filteredAndSortedFigures.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getFactionStyle = (faction) => {
    const meta = getFactionMeta(faction, effectivePeriodId);
    return {
      card: meta.card,
      badge: meta.badge,
      label: meta.label,
    };
  };

  return (
    <div className="space-y-4">
      <section className="p-4 rounded-xl border border-white/10 bg-[#191a20] space-y-3" aria-label="人物搜尋與篩選">
        <div className="figure-toolbar">
          <div><h2>歷史人物誌</h2><p role="status">符合 {filteredAndSortedFigures.length} 位／本時期 {figures.length} 位</p></div>
          <label className="figure-local-search"><span className="sr-only">篩選本頁人物</span><input type="search" placeholder="篩選本頁人物：姓名、字號、官職" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
        </div>
        <details className="figure-filter">
          <summary>進階篩選與排序{selectedFaction !== 'all' || selectedRoleType !== 'all' || sortBy !== 'default' ? '（已套用條件）' : ''}</summary>
          <div className="figure-filter-content">
            <div><p className="text-sm text-zinc-300 mb-2">陣營</p><div className="filter-options">{factions.map((f) => <button key={f.id} aria-pressed={selectedFaction === f.id} onClick={() => setSelectedFaction(f.id)}>{f.label}</button>)}</div></div>
            <div><p className="text-sm text-zinc-300 mb-2">身分類別</p><div className="filter-options">{roleCategories.map((r) => <button key={r.id} aria-pressed={selectedRoleType === r.id} onClick={() => setSelectedRoleType(r.id)}>{r.label}</button>)}</div></div>
            <label>排序<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">史冊預設</option><option value="birth_asc">出生年代（早至晚）</option><option value="events_desc">參與事件數</option><option value="relations_desc">關聯數量</option><option value="abilities_desc">娛樂評分（高至低）</option>
            </select></label>
            <button className="text-sm text-amber-300 text-left" onClick={() => { setSelectedFaction('all'); setSelectedRoleType('all'); setSortBy('default'); setSearch(''); }}>重設全部篩選</button>
          </div>
        </details>
      </section>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedFigures.map((fig) => {
          const style = getFactionStyle(fig.faction);

          return (
            <div
              key={fig.id}
              role="button"
              tabIndex={0}
              aria-label={`查看${fig.name}列傳`}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelectFigure(fig); } }}
              onClick={() => onSelectFigure(fig)}
              className={`group p-4 rounded-xl bg-[#17181e] border ${style.card} transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/15 shrink-0 bg-zinc-800 flex items-center justify-center text-xl font-bold font-serif text-amber-300 shadow-md relative">
                    <span className="select-none font-serif text-amber-300 font-bold text-xl">
                      {fig.name ? fig.name[0] : '？'}
                    </span>
                    {fig.avatar && (
                      <img
                        src={fig.avatar}
                        alt={fig.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold font-serif text-zinc-100 group-hover:text-amber-200 transition-colors">
                          {fig.name}
                        </h3>
                        {fig.courtesyName && (
                          <span className="text-xs text-zinc-400">字{fig.courtesyName}</span>
                        )}
                        {fig.clanTag && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800/80 text-amber-300/90 border border-amber-500/30 font-medium">
                            {fig.clanTag}
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold shrink-0 ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                      <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{fig.birthDeathDisplay || '生卒待考'}</span>
                      {fig.posthumousName && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 font-serif truncate">
                          {fig.posthumousName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">
                        {fig.nativePlaceAncient || '未知'}
                        {!ancientNamesOnly && fig.nativePlaceModern && ` (今${fig.nativePlaceModern})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Roles Tags */}
                <div className="flex flex-wrap gap-1 mb-2.5">
                  {(fig.roles || []).map((r, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/90 text-zinc-300 border border-white/5"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Brief excerpt */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-3 text-justify">
                  {fig.bio || ''}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400/90 font-medium">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>事件 ({linkedEvents(fig, referenceEvents).filter(event=>!isContextReview(fig.eventLinkReviews?.[event.id])).length})</span>
                  {linkedEvents(fig,referenceEvents).some(event=>isContextReview(fig.eventLinkReviews?.[event.id])) && <span>背景／年代待考 {linkedEvents(fig,referenceEvents).filter(event=>isContextReview(fig.eventLinkReviews?.[event.id])).length}</span>}
                  <span className="text-zinc-600">·</span>
                  <span>關係網 ({figureRelations(fig, referenceFigures).length})</span>
                  {pendingLinkCount(fig) > 0 && <span className="text-amber-200">待確認 {pendingLinkCount(fig)} 筆</span>}
                </div>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-amber-300">
                  列傳詳情 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Bar */}
      {filteredAndSortedFigures.length > PAGE_SIZE && (
        <div className="glass-panel p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-zinc-400">
            目前顯示第{' '}
            <b className="text-amber-300">
              {showAllPages ? 1 : (currentPage - 1) * PAGE_SIZE + 1}
            </b>{' '}
            –{' '}
            <b className="text-amber-300">
              {showAllPages
                ? filteredAndSortedFigures.length
                : Math.min(currentPage * PAGE_SIZE, filteredAndSortedFigures.length)}
            </b>{' '}
            位，共 <b className="text-amber-300">{filteredAndSortedFigures.length}</b> 位人物
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {!showAllPages && (
              <>
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  上一頁
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-7 h-7 rounded font-mono transition-colors ${
                      currentPage === page
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-white/5'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded bg-zinc-800 border border-white/10 text-zinc-300 hover:bg-zinc-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  下一頁
                </button>
              </>
            )}

            <button
              onClick={() => setShowAllPages((v) => !v)}
              className="ml-2 px-3 py-1 rounded bg-amber-950/50 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-colors"
            >
              {showAllPages ? '切換分頁瀏覽' : `一次展開全部 (${filteredAndSortedFigures.length})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
