import React from 'react';
import { MapPin, Swords } from './Icons.js';

// 二戰歐洲戰場的地圖分頁。階段 1 只列出目前時期的事件與戰役；海岸線底圖與標記在階段 3 加入
// （docs/20261107_二戰歐洲戰場模組規劃_v4.md 第七節）。時期切換由頁首的時期選單負責。
export const EuropeWarAtlasMap = ({
  activeEraId,
  eras = [],
  eraBattleIds = {},
  events = [],
  battles = [],
  selectedEvent,
  selectedBattle,
  onSelectEvent,
  onSelectBattle,
}) => {
  const era = eras.find((e) => e.id === activeEraId) || eras[0] || null;
  const eraEvents = era ? events.filter((e) => e.eraId === era.id) : [];
  const ids = new Set(era ? eraBattleIds[era.id] || [] : []);
  const eraBattles = battles.filter((b) => ids.has(b.id));

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#1a1712] rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <p className="text-xs text-[#a89a80]">{era?.dateRangeDisplay}</p>
        <h3 className="text-lg font-serif font-bold text-[#e0b77e]">{era?.name || '二戰歐洲戰場'}</h3>
        {era?.description && <p className="mt-1 text-sm text-[#d6c5af]">{era.description}</p>}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <p className="text-xs text-[#a89a80] border border-dashed border-white/15 rounded-lg p-3">
          地圖底圖製作中，目前先以清單列出本時期的事件與戰役。
        </p>
        <section aria-label="本時期事件">
          <h4 className="text-sm font-bold text-[#e0b77e] mb-2">事件（{eraEvents.length}）</h4>
          {eraEvents.length === 0 ? <p className="text-sm text-[#a89a80]">本時期尚未建立事件。</p> : (
            <ul className="space-y-1">
              {eraEvents.map((evt) => (
                <li key={evt.id}>
                  <button type="button" onClick={() => onSelectEvent?.(evt)} aria-pressed={selectedEvent?.id === evt.id}
                    className={`w-full text-left flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${selectedEvent?.id === evt.id ? 'bg-[#3d3022] text-white' : 'text-[#d6c5af] hover:bg-white/5'}`}>
                    <MapPin aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[#e0b77e]" />
                    <span><span className="text-xs text-[#a89a80] mr-2">{evt.yearDisplay}</span>{evt.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section aria-label="本時期戰役">
          <h4 className="text-sm font-bold text-[#e0b77e] mb-2">戰役（{eraBattles.length}）</h4>
          {eraBattles.length === 0 ? <p className="text-sm text-[#a89a80]">本時期尚未建立戰役。</p> : (
            <ul className="space-y-1">
              {eraBattles.map((bat) => (
                <li key={bat.id}>
                  <button type="button" onClick={() => onSelectBattle?.(bat)} aria-pressed={selectedBattle?.id === bat.id}
                    className={`w-full text-left flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${selectedBattle?.id === bat.id ? 'bg-[#3d3022] text-white' : 'text-[#d6c5af] hover:bg-white/5'}`}>
                    <Swords aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[#e0b77e]" />
                    <span><span className="text-xs text-[#a89a80] mr-2">{bat.year}</span>{bat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
