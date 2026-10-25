import React from 'react';
import { X, Users, TrendingDown, Shield, FileText, Globe } from './Icons.js';

export const DemographicsModal = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#16171c] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-950/40 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-amber-200">
                三國人口戶籍與各民族分佈考實
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                依據《三國志》、裴松之注引《蜀記》與《通典·食貨志》正史官載
              </p>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Population Sharp Decline Alert */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-red-300 font-bold">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span>漢末三國人口大衰退</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {data.commentary}
            </p>
          </div>

          {/* Census Data Comparison Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-serif">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>魏、蜀、吳三大政權官方編戶與軍吏對比</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.dataPoints.map((dp, idx) => {
                const borderColors = [
                  'border-blue-500/40 bg-blue-950/20 text-blue-300',
                  'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
                  'border-rose-500/40 bg-rose-950/20 text-rose-300',
                ];

                return (
                  <div key={idx} className={`p-4 rounded-xl border ${borderColors[idx]} space-y-2.5`}>
                    <h4 className="font-bold text-sm font-serif border-b border-white/10 pb-1.5">
                      {dp.regimeName.split('（')[0]}
                    </h4>
                    
                    <div className="space-y-1.5 text-xs text-zinc-300">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">官方口數：</span>
                        <span className="font-bold font-mono text-zinc-100">{dp.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">官方戶數：</span>
                        <span className="font-mono text-zinc-300">{dp.households}</span>
                      </div>
                      {dp.armyCount && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">軍隊編制：</span>
                          <span className="font-mono text-amber-300">{dp.armyCount}</span>
                        </div>
                      )}
                      {dp.officialsCount && (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">官吏人數：</span>
                          <span className="font-mono text-zinc-400">{dp.officialsCount}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-1.5 border-t border-white/5 text-[10px] text-zinc-500 italic">
                      出處：{dp.source}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ethnic Groups Distribution */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 font-serif">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>疆域內外少數民族與族群共融</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {data.ethnicGroups.map((group, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 font-serif text-sm">
                      {group.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                      {group.distributionRegion}
                    </span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-justify text-[11px]">
                    {group.relationshipWithRegime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
