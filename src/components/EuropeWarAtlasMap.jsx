import React from 'react';
import { MapPin, Swords } from './Icons.js';
import { EUROPEWAR_MAP } from '../data/europewar/europeWarMapGeoData.js';
import { EUROPEWAR_MAP_CITIES } from '../data/europewar/europeWarMapCities.js';
import { createMapProjection } from '../utils/conicProjection.js';

// 二戰歐洲戰場的地圖分頁（docs/20261107_二戰歐洲戰場模組規劃_v6.md 第七節）：Natural Earth 現代海岸線與湖泊，
// 不畫國界；只標目前時期的事件與戰役。座標一律 [lng, lat]（第 4.5 節）。時期切換由頁首的時期選單負責。
const project = createMapProjection(EUROPEWAR_MAP.projection);
const point = (record) => (Array.isArray(record?.coordinates) ? project(record.coordinates) : null);

const COLORS = { sea: '#eedfc5', land: '#d3bd92', coast: '#8c7355', city: '#4a3c2c', event: '#78350f', battle: '#b91c1c', selected: '#b45309' };
const CITY_POINTS = EUROPEWAR_MAP_CITIES.map((c) => ({ ...c, at: project([c.lng, c.lat]) }));

const activate = (handler) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
};

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
  // An event that belongs to a battle shown on the map is reached through the battle marker (same place).
  const eventMarkers = eraEvents.filter((e) => !(e.battleId && ids.has(e.battleId)))
    .map((e) => ({ record: e, at: point(e) })).filter((m) => m.at);
  const battleMarkers = eraBattles.map((b) => ({ record: b, at: point(b) })).filter((m) => m.at);
  const selectedLabel = [
    ...battleMarkers.filter((m) => m.record.id === selectedBattle?.id).map((m) => ({ ...m, text: m.record.name })),
    ...eventMarkers.filter((m) => m.record.id === selectedEvent?.id).map((m) => ({ ...m, text: m.record.title })),
  ][0];

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#1a1712] rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <p className="text-xs text-[#a89a80]">{era?.dateRangeDisplay}</p>
        <h3 className="text-lg font-serif font-bold text-[#e0b77e]">{era?.name || '二戰歐洲戰場'}</h3>
        {era?.description && <p className="mt-1 text-sm text-[#d6c5af]">{era.description}</p>}
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="relative">
          <svg viewBox={EUROPEWAR_MAP.viewBox} className="w-full h-auto block" role="group" aria-label={`${era?.name || '二戰歐洲戰場'}地圖`}>
            <rect x="0" y="0" width={EUROPEWAR_MAP.width} height={EUROPEWAR_MAP.height} fill={COLORS.sea} />
            <path d={EUROPEWAR_MAP.land} fill={COLORS.land} stroke={COLORS.coast} strokeWidth="1" fillRule="evenodd" strokeLinejoin="round" />
            <path d={EUROPEWAR_MAP.lakes} fill={COLORS.sea} stroke={COLORS.coast} strokeWidth="0.6" strokeLinejoin="round" />

            {/* 城市標籤（第 7.2 節）：畫在標記底下，不可點選。 */}
            <g aria-hidden="true" pointerEvents="none">
              {CITY_POINTS.map(({ neName, name, labelSide, at: [x, y] }) => {
                // 現代名稱（括號內）換到第二行，避免長標籤蓋住鄰近城市。
                const [periodName, modernName] = name.split('（');
                const labelX = labelSide === 'left' ? x - 9 : x + 9;
                return (
                  <g key={neName}>
                    <circle cx={x} cy={y} r="4" fill={COLORS.city} />
                    <text x={labelX} y={y - 7} textAnchor={labelSide === 'left' ? 'end' : 'start'}
                      fontSize="20" fill={COLORS.city} stroke={COLORS.land} strokeWidth="4" paintOrder="stroke">
                      {periodName}
                      {modernName && <tspan x={labelX} dy="19" fontSize="15">{`（${modernName}`}</tspan>}
                    </text>
                  </g>
                );
              })}
            </g>

            {battleMarkers.map(({ record, at: [x, y] }) => {
              const selected = record.id === selectedBattle?.id;
              const tip = [record.name, record.yearDisplay || record.year, record.locationNote && `代表位置：${record.locationNote}`].filter(Boolean).join('\n');
              return (
                <g key={record.id} role="button" tabIndex={0} aria-label={`${record.name}，查看戰役詳情${record.locationNote ? '（代表位置）' : ''}`}
                  aria-pressed={selected} className="cursor-pointer" onClick={() => onSelectBattle?.(record)} onKeyDown={activate(() => onSelectBattle?.(record))}>
                  <title>{tip}</title>
                  {record.locationNote && <circle cx={x} cy={y} r="27" fill="none" stroke={COLORS.battle} strokeWidth="2.5" strokeDasharray="6 4" />}
                  {selected && <circle cx={x} cy={y} r="20" fill="none" stroke={COLORS.selected} strokeWidth="4" />}
                  <rect x={x - 11} y={y - 11} width="22" height="22" transform={`rotate(45 ${x} ${y})`} fill={COLORS.battle} stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx={x} cy={y} r="34" fill="transparent" />
                </g>
              );
            })}
            {eventMarkers.map(({ record, at: [x, y] }) => {
              const selected = record.id === selectedEvent?.id;
              return (
                <g key={record.id} role="button" tabIndex={0} aria-label={`${record.title}，查看事件`} aria-pressed={selected}
                  className="cursor-pointer" onClick={() => onSelectEvent?.(record)} onKeyDown={activate(() => onSelectEvent?.(record))}>
                  <title>{[record.title, record.yearDisplay].filter(Boolean).join('\n')}</title>
                  {selected && <circle cx={x} cy={y} r="17" fill="none" stroke={COLORS.selected} strokeWidth="4" />}
                  <circle cx={x} cy={y} r="10" fill={COLORS.event} stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx={x} cy={y} r="30" fill="transparent" />
                </g>
              );
            })}
            {selectedLabel && (
              <text x={selectedLabel.at[0] + 30} y={selectedLabel.at[1] + 9} fontSize="28" fontWeight="bold" fill="#44382c"
                stroke={COLORS.sea} strokeWidth="6" paintOrder="stroke" pointerEvents="none">{selectedLabel.text}</text>
            )}
          </svg>
          <div className="border-y border-[#8c7355]/50 bg-[#eedfc5] px-3 py-1.5 text-[11px] leading-snug text-[#44382c]">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
              <span className="inline-flex items-center gap-1"><svg width="10" height="10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill={COLORS.event} /></svg>事件</span>
              <span className="inline-flex items-center gap-1"><svg width="10" height="10" aria-hidden="true"><rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill={COLORS.battle} /></svg>戰役</span>
              <span className="inline-flex items-center gap-1"><svg width="12" height="12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke={COLORS.battle} strokeDasharray="2 1.5" /></svg>代表位置</span>
            </p>
            <p className="mt-0.5 text-[#5c4a35]">底圖為現代海岸線，不含國界（Natural Earth）；大西洋戰場只標代表位置。城市名稱為本專案慣用譯名。</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
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
                      <span><span className="text-xs text-[#a89a80] mr-2">{bat.yearDisplay || bat.year}</span>{bat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
