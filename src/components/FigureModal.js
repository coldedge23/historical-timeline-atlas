import React, { useState, useMemo } from 'react';
import { X, Award, Quote, MapPin, Calendar, GitFork, BookOpen, Layers, Swords } from './Icons.js';
import { getFactionMeta } from '../data/factionConfig.js';

export const FigureModal = ({
  figure,
  allFigures = [],
  allEvents = [],
  allBattles = [],
  onClose,
  onSelectFigure,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
  activePeriodId,
}) => {
  const [showStarGraph, setShowStarGraph] = useState(true);

  if (!figure) return null;

  // Automatically detect period if not passed
  const effectivePeriodId = activePeriodId || (
    allFigures.some((f) => f.faction === 'xia' || f.faction === 'shang')
      ? 'xiaShangZhou'
      : allFigures.some((f) => f.faction === 'northern' || f.faction === 'southern' || f.faction === 'sixteen')
      ? 'weiJin'
      : allFigures.some((f) => f.faction === 'qin' || f.faction === 'zhao' || f.faction === 'qi')
      ? 'warringStates'
      : allFigures.some((f) => f.faction === 'shu' || f.faction === 'wu')
      ? 'threeKingdoms'
      : 'qinHan'
  );

  const getFactionBadge = (faction) => {
    const meta = getFactionMeta(faction, effectivePeriodId);
    return {
      text: `${meta.label}陣營`,
      color: meta.badge,
      stroke: meta.stroke,
    };
  };

  const badge = getFactionBadge(figure.faction);

  // Combine direct relations + reverse relations (up to 8 nodes for rich star graph)
  const combinedRelations = useMemo(() => {
    const map = new Map();
    (figure.relations || []).forEach((rel) => {
      const target = allFigures.find((f) => f.id === rel.figureId);
      if (target && target.id !== figure.id) {
        map.set(target.id, {
          targetFigure: target,
          relationType: rel.relationType || 'colleague',
          label: rel.label || '歷史交集',
        });
      }
    });

    // Also include reverse links if we have fewer than 6 nodes
    if (map.size < 6) {
      for (const other of allFigures) {
        if (other.id === figure.id || map.has(other.id)) continue;
        const rev = (other.relations || []).find((r) => r.figureId === figure.id);
        if (rev) {
          map.set(other.id, {
            targetFigure: other,
            relationType: rev.relationType || 'colleague',
            label: rev.label || '歷史交集',
          });
          if (map.size >= 8) break;
        }
      }
    }

    return Array.from(map.values()).slice(0, 8);
  }, [figure, allFigures]);

  // Find battles where this figure was a commander or mentioned in summary
  const participatedBattles = (allBattles || []).filter((bat) => {
    const cmds = [
      ...(bat.attacker?.commanders || []),
      ...(bat.defender?.commanders || []),
    ];
    if (cmds.some((c) => c.figureId === figure.id || c.name.includes(figure.name))) {
      return true;
    }
    return (bat.summary || '').includes(figure.name);
  });

  const getRelEdgeStyle = (relType) => {
    switch (relType) {
      case 'monarch-subject':
        return { color: '#f59e0b', dashed: false, tag: '君臣' };
      case 'family':
        return { color: '#fb7185', dashed: false, tag: '宗族/結義' };
      case 'rival':
        return { color: '#ef4444', dashed: true, tag: '宿敵/交鋒' };
      default:
        return { color: '#38bdf8', dashed: false, tag: '同僚/袍澤' };
    }
  };

  const cx = 260;
  const cy = 140;
  const radius = 102;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#16171c] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Background Accent */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar / Portrait */}
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-500/40 shrink-0 shadow-lg bg-zinc-800 flex items-center justify-center text-3xl font-serif font-bold text-amber-300 relative">
              <span className="select-none font-serif text-amber-300 font-bold text-3xl">
                {figure.name ? figure.name[0] : '？'}
              </span>
              {figure.avatar && (
                <img
                  src={figure.avatar}
                  alt={figure.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>

            {/* Names & Titles */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold font-serif text-amber-200">{figure.name}</h2>
                {figure.courtesyName && (
                  <span className="text-sm text-zinc-400">字 {figure.courtesyName}</span>
                )}
                {figure.posthumousName && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-serif">
                    {figure.posthumousName}
                  </span>
                )}
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                  {badge.text}
                </span>
              </div>

              {/* Roles */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(figure.roles || []).map((role, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-white/5"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Meta: Birth/Death & Origin */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>生卒：{figure.birthDeathDisplay || '待考'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    籍貫：{figure.nativePlaceAncient}
                    {!ancientNamesOnly && figure.nativePlaceModern && ` (今${figure.nativePlaceModern})`}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Biography */}
          <div>
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-2 font-serif">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>生平列傳</span>
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed text-justify bg-black/20 p-4 rounded-xl border border-white/5">
              {figure.bio}
            </p>
          </div>

          {/* Key Achievements */}
          {figure.keyAchievements && figure.keyAchievements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-2 font-serif">
                <Award className="w-4 h-4 text-amber-400" />
                <span>歷史重大功績與影響</span>
              </h3>
              <ul className="grid grid-cols-1 gap-2 text-xs text-zinc-300">
                {figure.keyAchievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Famous Quotes */}
          {figure.famousQuotes && figure.famousQuotes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-2 font-serif">
                <Quote className="w-4 h-4 text-amber-400" />
                <span>傳世名言與詩詞</span>
              </h3>
              <div className="space-y-2">
                {figure.famousQuotes.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-amber-950/20 border-l-2 border-amber-500 text-xs italic text-amber-100/90 font-serif">
                    「{q}」
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inter-Figure Relationships with Interactive Star Network Graph */}
          {combinedRelations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 font-serif">
                  <GitFork className="w-4 h-4 text-amber-400" />
                  <span>人物歷史關係星網圖譜（點擊節點可穿梭切換）</span>
                </h3>
                <button
                  onClick={() => setShowStarGraph((v) => !v)}
                  className="text-[11px] px-2.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-amber-300 hover:bg-zinc-700"
                >
                  {showStarGraph ? '收合星網圖' : '展開星網圖'}
                </button>
              </div>

              {/* Interactive SVG Radial Star Graph */}
              {showStarGraph && (
                <div className="mb-3 rounded-xl bg-[#0e0f13] border border-amber-500/20 overflow-hidden relative">
                  <svg viewBox="0 0 520 280" className="w-full h-auto select-none">
                    <defs>
                      <radialGradient id="starBgGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d97706" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#0e0f13" stopOpacity="0" />
                      </radialGradient>
                      <clipPath id="centerClip">
                        <circle cx={cx} cy={cy} r="24" />
                      </clipPath>
                      {combinedRelations.map((item, idx) => {
                        const angle = (idx / combinedRelations.length) * Math.PI * 2 - Math.PI / 2;
                        const nx = cx + Math.cos(angle) * radius;
                        const ny = cy + Math.sin(angle) * radius;
                        return (
                          <clipPath key={item.targetFigure.id} id={`nodeClip_${idx}`}>
                            <circle cx={nx} cy={ny} r="18" />
                          </clipPath>
                        );
                      })}
                    </defs>

                    {/* Ambient Star Glow */}
                    <circle cx={cx} cy={cy} r="130" fill="url(#starBgGrad)" />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity="0.06"
                      strokeDasharray="3 3"
                    />

                    {/* Relationship Connecting Edges */}
                    {combinedRelations.map((item, idx) => {
                      const angle = (idx / combinedRelations.length) * Math.PI * 2 - Math.PI / 2;
                      const nx = cx + Math.cos(angle) * radius;
                      const ny = cy + Math.sin(angle) * radius;
                      const mx = (cx + nx) / 2;
                      const my = (cy + ny) / 2;
                      const style = getRelEdgeStyle(item.relationType);

                      return (
                        <g key={`edge_${idx}`}>
                          <line
                            x1={cx}
                            y1={cy}
                            x2={nx}
                            y2={ny}
                            stroke={style.color}
                            strokeWidth="1.6"
                            strokeOpacity="0.7"
                            strokeDasharray={style.dashed ? '4 3' : 'none'}
                          />
                          <rect
                            x={mx - 24}
                            y={my - 7}
                            width="48"
                            height="14"
                            rx="4"
                            fill="#16171c"
                            stroke={style.color}
                            strokeWidth="0.8"
                            strokeOpacity="0.8"
                          />
                          <text
                            x={mx}
                            y={my + 3}
                            fill="#e4e4e7"
                            fontSize="7.5"
                            textAnchor="middle"
                          >
                            {item.label.slice(0, 6)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Outer Related Figure Nodes */}
                    {combinedRelations.map((item, idx) => {
                      const angle = (idx / combinedRelations.length) * Math.PI * 2 - Math.PI / 2;
                      const nx = cx + Math.cos(angle) * radius;
                      const ny = cy + Math.sin(angle) * radius;
                      const targetBadge = getFactionBadge(item.targetFigure.faction);

                      return (
                        <g
                          key={`node_${item.targetFigure.id}`}
                          onClick={() => onSelectFigure(item.targetFigure)}
                          className="cursor-pointer group"
                        >
                          <circle
                            cx={nx}
                            cy={ny}
                            r="20"
                            fill="#1f2028"
                            stroke={targetBadge.stroke}
                            strokeWidth="2"
                          />
                          <text
                            x={nx}
                            y={ny + 4}
                            fill="#fde047"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {item.targetFigure.name[0]}
                          </text>
                          {item.targetFigure.avatar && (
                            <image
                              href={item.targetFigure.avatar}
                              x={nx - 18}
                              y={ny - 18}
                              width="36"
                              height="36"
                              preserveAspectRatio="xMidYMid slice"
                              clipPath={`url(#nodeClip_${idx})`}
                            />
                          )}
                          <rect
                            x={nx - 24}
                            y={ny + 20}
                            width="48"
                            height="14"
                            rx="4"
                            fill="#16171c"
                            fillOpacity="0.9"
                          />
                          <text
                            x={nx}
                            y={ny + 30}
                            fill="#fef08a"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {item.targetFigure.name}
                          </text>
                        </g>
                      );
                    })}

                    {/* Center Active Figure Node */}
                    <g>
                      <circle cx={cx} cy={cy} r="28" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5">
                        <animate attributeName="r" values="25;31;25" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={cx} cy={cy} r="25" fill="#18181b" stroke="#fbbf24" strokeWidth="2.5" />
                      <text
                        x={cx}
                        y={cy + 5}
                        fill="#fde047"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {figure.name[0]}
                      </text>
                      {figure.avatar && (
                        <image
                          href={figure.avatar}
                          x={cx - 24}
                          y={cy - 24}
                          width="48"
                          height="48"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#centerClip)"
                        />
                      )}
                      <rect
                        x={cx - 26}
                        y={cy + 22}
                        width="52"
                        height="15"
                        rx="4"
                        fill="#78350f"
                        stroke="#f59e0b"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={cy + 32.5}
                        fill="#ffffff"
                        fontSize="9.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {figure.name}
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {/* Relationship Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {combinedRelations.map((item, idx) => {
                  const targetFigure = item.targetFigure;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectFigure(targetFigure)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-amber-500/50 hover:bg-zinc-800 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-zinc-800 flex items-center justify-center text-xs font-bold text-amber-300">
                          {targetFigure.avatar ? (
                            <img
                              src={targetFigure.avatar}
                              alt={targetFigure.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            targetFigure.name[0]
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-amber-200 group-hover:text-amber-300 flex items-center gap-1.5">
                            <span>{targetFigure.name}</span>
                            {targetFigure.courtesyName && (
                              <span className="text-[10px] text-zinc-500 font-normal">
                                ({targetFigure.courtesyName})
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-400 truncate">
                            {item.label}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-400/80 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                        查看 &rarr;
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Participated Battles */}
          {participatedBattles.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-1.5 mb-2 font-serif">
                <Swords className="w-4 h-4 text-rose-400" />
                <span>參戰會戰紀錄</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {participatedBattles.map((bat) => (
                  <button
                    key={bat.id}
                    onClick={() => {
                      if (onSelectBattle) {
                        onClose();
                        onSelectBattle(bat);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 hover:border-rose-400 hover:bg-rose-900/50 transition-colors"
                  >
                    <Swords className="w-3 h-3 text-rose-400" />
                    <span className="font-mono text-rose-300 text-[10px]">{bat.year}年</span>
                    <span>{bat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Participated Events */}
          {figure.participatedEventIds && figure.participatedEventIds.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-2 font-serif">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>參與重大歷史事件（點擊對焦歷史地圖與行軍路線）</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {figure.participatedEventIds.map((evtId) => {
                  const evt = allEvents.find((e) => e.id === evtId);
                  if (!evt) return null;

                  return (
                    <button
                      key={evtId}
                      onClick={() => {
                        onClose();
                        onSelectEvent(evt);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-white/10 text-xs text-zinc-300 hover:border-amber-500/60 hover:text-amber-200 hover:bg-zinc-700/80 transition-colors"
                    >
                      <span className="font-mono text-amber-400 text-[10px]">{evt.year}年</span>
                      <span>{evt.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
