import React from 'react';
import { Dialog } from './Dialog.jsx';
import { X, Users, TrendingDown, FileText, Globe } from './Icons.js';

export const DemographicsModal = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const modalTitle = data.title || '歷代人口戶籍與各民族分佈考實';
  const modalSubtitle =
    data.subtitle ||
    data.sourceNote ||
    '來源尚待逐筆核對，人口數字不代表已完成史料查證';
  const alertTitle =
    data.alertTitle ||
    (data.peakPopulation ? `時代極盛人口規模：${data.peakPopulation}` : '歷代戶口變遷與社會結構總覽');
  const commentary = data.commentary || data.summary || '';
  const dataPoints = data.dataPoints || data.censusData || [];
  const ethnicGroups = data.ethnicGroups || [];

  return (
    <Dialog onClose={onClose} label="人口與民族詳情">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#16171c] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900">
          <button
            onClick={onClose}
            aria-label="關閉人口與民族詳情"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 pr-8">
            <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-950/40 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-amber-200">
                {modalTitle}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {modalSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Population Overview / Peak Banner */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <TrendingDown className="w-4 h-4 text-amber-400" />
              <span>{alertTitle}</span>
            </div>
            {commentary && (
              <p className="text-zinc-300 leading-relaxed text-justify">
                {commentary}
              </p>
            )}
          </div>

          {/* Census Data Comparison Cards */}
          {dataPoints.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-serif">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>主要政權與時期官方編戶、人口與軍吏考證</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {dataPoints.map((dp, idx) => {
                  const borderColors = [
                    'border-blue-500/40 bg-blue-950/20 text-blue-300',
                    'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
                    'border-rose-500/40 bg-rose-950/20 text-rose-300',
                    'border-amber-500/40 bg-amber-950/20 text-amber-300',
                    'border-purple-500/40 bg-purple-950/20 text-purple-300',
                    'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
                  ];

                  const regimeLabel =
                    dp.regimeName || dp.name || dp.yearDisplay || (dp.year ? `西元 ${dp.year} 年` : '官方普查');
                  const popVal = dp.population || dp.total || '待考';
                  const hhVal = dp.households || '待考';
                  const srcVal = dp.source || dp.note || '來源待核對';

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${borderColors[idx % borderColors.length]} space-y-2.5 flex flex-col justify-between`}
                    >
                      <div>
                        <h4 className="font-bold text-sm font-serif border-b border-white/10 pb-1.5 mb-2.5">
                          {regimeLabel}
                        </h4>

                        <div className="space-y-1.5 text-xs text-zinc-300">
                          <div className="flex justify-between gap-2">
                            <span className="text-zinc-400 shrink-0">官方口數：</span>
                            <span className="font-bold font-mono text-zinc-100 text-right">{popVal}</span>
                          </div>
                          <div className="flex justify-between gap-2">
                            <span className="text-zinc-400 shrink-0">官方戶數：</span>
                            <span className="font-mono text-zinc-300 text-right">{hhVal}</span>
                          </div>
                          {dp.armyCount && (
                            <div className="flex justify-between gap-2">
                              <span className="text-zinc-400 shrink-0">軍隊編制：</span>
                              <span className="font-mono text-amber-300 text-right">{dp.armyCount}</span>
                            </div>
                          )}
                          {dp.officialsCount && (
                            <div className="flex justify-between gap-2">
                              <span className="text-zinc-400 shrink-0">官吏人數：</span>
                              <span className="font-mono text-zinc-400 text-right">{dp.officialsCount}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 text-[10px] text-zinc-400 italic leading-snug">
                        考證：{srcVal}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ethnic Groups Distribution */}
          {Array.isArray(ethnicGroups) && ethnicGroups.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-serif">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>疆域內外少數民族與族群共融</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {ethnicGroups.map((group, idx) => {
                  const regionLabel = group.distributionRegion || group.region || '';
                  const descText =
                    group.relationshipWithRegime || group.traits || group.description || '';

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-amber-300 font-serif text-sm">
                          {group.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {group.proportion && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30 font-mono">
                              {group.proportion}
                            </span>
                          )}
                          {regionLabel && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                              {regionLabel}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-zinc-300 leading-relaxed text-justify text-[11px]">
                        {descText}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
