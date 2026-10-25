import React, { useState, useMemo, useEffect } from 'react';
import { Users, Search, MapPin, Calendar, Filter } from './Icons.js';
import { FACTION_CONFIGS, getFactionMeta } from '../data/factionConfig.js';

const PAGE_SIZE = 36;

export const FiguresView = ({
  figures,
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

  // Automatically detect period if not explicitly supplied
  const effectivePeriodId = useMemo(() => {
    if (activePeriodId) return activePeriodId;
    if (figures.some((f) => f.faction === 'xia' || f.faction === 'shang')) {
      return 'xiaShangZhou';
    }
    if (figures.some((f) => f.faction === 'northern' || f.faction === 'southern' || f.faction === 'sixteen')) {
      return 'weiJin';
    }
    if (figures.some((f) => f.faction === 'tang' || f.faction === 'sui' || f.faction === 'wuZhou')) {
      return 'suiTang';
    }
    if (figures.some((f) => f.faction === 'liao' || f.faction === 'jin' || f.faction === 'song')) {
      return 'songLiao';
    }
    if (figures.some((f) => f.faction === 'taiping' || f.faction === 'republic' || f.faction === 'reform')) {
      return 'qingDynasty';
    }
    if (figures.some((f) => f.faction === 'yuan' || f.faction === 'maritime' || f.faction === 'peasant')) {
      return 'yuanMing';
    }
    if (figures.some((f) => f.faction === 'qin' || f.faction === 'zhao' || f.faction === 'qi')) {
      return 'warringStates';
    }
    if (figures.some((f) => f.faction === 'shu' || f.faction === 'wu')) {
      return 'threeKingdoms';
    }
    return 'qinHan';
  }, [activePeriodId, figures]);

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
        (a, b) => (b.participatedEventIds?.length || 0) - (a.participatedEventIds?.length || 0)
      );
    }
    if (sortBy === 'relations_desc') {
      return [...list].sort((a, b) => (b.relations?.length || 0) - (a.relations?.length || 0));
    }
    return list;
  }, [figures, selectedFaction, selectedRoleType, sortBy, search, globalSearchTerm]);

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
      {/* Search & Multi-Dimension Filter Header */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-serif text-amber-200">歷史人物誌專區</h2>
            <span className="text-xs text-zinc-400">
              （符合條件：<b className="text-amber-300">{filteredAndSortedFigures.length}</b> / {figures.length} 位）
            </span>
          </div>

          {/* Faction Pills */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-xs overflow-x-auto w-full lg:w-auto">
            {factions.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFaction(f.id)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  selectedFaction === f.id
                    ? 'bg-amber-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Second Row: Role Filter, Sort & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 pt-2 border-t border-white/5">
          {/* Role Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0 mr-0.5" />
            {roleCategories.map((rc) => (
              <button
                key={rc.id}
                onClick={() => setSelectedRoleType(rc.id)}
                className={`px-2.5 py-1 rounded-md border text-[11px] transition-colors whitespace-nowrap ${
                  selectedRoleType === rc.id
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 font-bold'
                    : 'bg-zinc-900/70 border-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {rc.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="default">排序：史冊預設</option>
              <option value="abilities_desc">排序：六維綜合能力 (高→低)</option>
              <option value="birth_asc">排序：出生年代 (早→晚)</option>
              <option value="events_desc">排序：參與事件數 (多→少)</option>
              <option value="relations_desc">排序：關係連結數 (多→少)</option>
            </select>

            {/* Quick Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              <input
                type="text"
                placeholder="搜尋姓名/字號/籍貫/官職/事蹟..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedFigures.map((fig) => {
          const style = getFactionStyle(fig.faction);

          return (
            <div
              key={fig.id}
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
                <div className="flex items-center gap-3">
                  <span>事件 ({(fig.participatedEventIds || []).length})</span>
                  <span className="text-zinc-600">·</span>
                  <span>關係網 ({(fig.relations || []).length})</span>
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
