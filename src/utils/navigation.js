import { DEFAULT_CIV, civById, isCivId } from '../civilizations/registry.js';
const DEFAULT_PERIOD = DEFAULT_CIV.defaultPeriodId;
const byPeriod = (civId) => (civById(civId) || DEFAULT_CIV).unit === 'period';
export function parseNavigationHash(hash = '') {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const requested = params.get('civ') || params.get('lens') || DEFAULT_CIV.id;
  return { civ: isCivId(requested) ? requested : DEFAULT_CIV.id,
    period: params.get('period') || DEFAULT_PERIOD, era: params.get('era') || '',
    tab: ['figures', 'battles'].includes(params.get('tab')) ? params.get('tab') : 'map-timeline',
    event: params.get('event') || '', figure: params.get('figure') || '', battle: params.get('battle') || '' };
}
export function serializeNavigation(state) {
  const p = new URLSearchParams();
  if (byPeriod(state.civ)) p.set('period', state.period);
  else { p.set('civ', state.civ); if (state.era) p.set('era', state.era); }
  if (state.tab && state.tab !== 'map-timeline') p.set('tab', state.tab);
  for (const key of ['event', 'figure', 'battle']) if (state[key]) p.set(key, state[key]);
  return '#' + p.toString();
}
// Unknown period/civ values in a shared link fall back to the defaults; report what was dropped.
export function unknownRouteParts(hash, isKnownPeriod) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const civ = params.get('civ') || params.get('lens');
  const period = params.get('period');
  return { civ: civ && !isCivId(civ) ? civ : '', period: period && !isKnownPeriod(period) ? period : '' };
}
export function resolveNavigation(hash, catalogs, eras) {
  const route = parseNavigationHash(hash);
  route.unknown = unknownRouteParts(hash, id => !!catalogs[id]);
  if (!catalogs[route.period]) route.period = DEFAULT_PERIOD;
  const key = byPeriod(route.civ) ? route.period : route.civ;
  const dataset = catalogs[key];
  const validEras = eras[route.civ] || [];
  route.era = validEras.some(e => e.id === route.era) ? route.era : byPeriod(route.civ) ? '' : civById(route.civ).defaultEraId;
  const battle = dataset.battles.find(b => b.id === route.battle) || null;
  if (!route.event && battle?.eraId) route.era = battle.eraId;
  const event = dataset.events.find(e => e.id === route.event) || dataset.events.find(e => !route.era || e.eraId === route.era) || dataset.events[0] || null;
  if (event?.eraId) route.era = event.eraId;
  const figure = dataset.figures.find(f => f.id === route.figure) || null;
  return { ...route, event: event?.id || '', figure: figure?.id || '', battle: battle?.id || '', selectedEvent: event, selectedFigure: figure, selectedBattle: battle };
}
// Cold-start state as App initialises it; hashchange/popstate use resolveNavigation instead.
export function resolveInitialNavigation(hash, ctx) {
  const initialHash = parseNavigationHash(hash);
  const initialCiv = initialHash.civ;
  const period = initialHash.period && ctx.periods[initialHash.period] ? initialHash.period : DEFAULT_PERIOD;
  const taiwanEra = ctx.taiwanEras.find(era => (era.keyEvents || []).some(event => event.id === initialHash.event))?.id ||
    Object.entries(ctx.taiwanEraBattleIds).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||
    (ctx.taiwanEras.some(e => e.id === initialHash.era) ? initialHash.era : civById('taiwan').defaultEraId);
  const japanEra = ctx.japanAllEvents.find(event => event.id === initialHash.event)?.eraId ||
    Object.entries(ctx.japanEraBattleIds).find(([, ids]) => ids.includes(initialHash.battle))?.[0] ||
    (ctx.japanEras.some(e => e.id === initialHash.era) ? initialHash.era : civById('japan').defaultEraId);
  const periodConfig = ctx.periods[period] || ctx.periods.qinHan;
  const dataset = initialCiv === 'japan' ? ctx.japan : initialCiv === 'taiwan' ? ctx.taiwan
    : { events: periodConfig.events || [], figures: periodConfig.figures || [], battles: periodConfig.battles || [] };
  const evts = dataset.events;
  const selectedEvent = (initialHash.event && evts.find((e) => e.id === initialHash.event)) ||
    evts.find(e => initialCiv === 'china' || e.eraId === (initialCiv === 'japan' ? japanEra : taiwanEra)) || evts[0] || null;
  const selectedFigure = initialHash.figure ? dataset.figures.find((f) => f.id === initialHash.figure) || null : null;
  const selectedBattle = initialHash.battle ? dataset.battles.find((b) => b.id === initialHash.battle) || null : null;
  return { civ: initialCiv, period, tab: initialHash.tab, taiwanEra, japanEra, selectedEvent, selectedFigure, selectedBattle };
}
