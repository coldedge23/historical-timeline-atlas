const VALID_CIVILIZATIONS = ['china', 'taiwan', 'japan'];
export function parseNavigationHash(hash = '') {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const requested = params.get('civ') || params.get('lens') || 'china';
  return { civ: VALID_CIVILIZATIONS.includes(requested) ? requested : 'china',
    period: params.get('period') || 'yuanMing', era: params.get('era') || '',
    tab: ['figures', 'battles'].includes(params.get('tab')) ? params.get('tab') : 'map-timeline',
    event: params.get('event') || '', figure: params.get('figure') || '', battle: params.get('battle') || '' };
}
export function serializeNavigation(state) {
  const p = new URLSearchParams();
  if (state.civ === 'china') p.set('period', state.period);
  else { p.set('civ', state.civ); if (state.era) p.set('era', state.era); }
  if (state.tab && state.tab !== 'map-timeline') p.set('tab', state.tab);
  for (const key of ['event', 'figure', 'battle']) if (state[key]) p.set(key, state[key]);
  return '#' + p.toString();
}
export function resolveNavigation(hash, catalogs, eras) {
  const route = parseNavigationHash(hash);
  if (!catalogs[route.period]) route.period = 'yuanMing';
  const key = route.civ === 'china' ? route.period : route.civ;
  const dataset = catalogs[key];
  const validEras = eras[route.civ] || [];
  const fallbackEra = route.civ === 'japan' ? 'jp_sengoku' : 'tw_tungning';
  route.era = validEras.some(e => e.id === route.era) ? route.era : route.civ === 'china' ? '' : fallbackEra;
  const battle = dataset.battles.find(b => b.id === route.battle) || null;
  if (!route.event && battle?.eraId) route.era = battle.eraId;
  const event = dataset.events.find(e => e.id === route.event) || dataset.events.find(e => !route.era || e.eraId === route.era) || dataset.events[0] || null;
  if (event?.eraId) route.era = event.eraId;
  const figure = dataset.figures.find(f => f.id === route.figure) || null;
  return { ...route, event: event?.id || '', figure: figure?.id || '', battle: battle?.id || '', selectedEvent: event, selectedFigure: figure, selectedBattle: battle };
}
