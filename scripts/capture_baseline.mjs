// Stage 0 baseline: record current search, navigation, relation and count behaviour as JSON fixtures.
// Usage: node scripts/capture_baseline.mjs   (writes tests/fixtures/baseline/*.json)
// tests/baseline.test.js compares the live app logic against the fixtures;
// tests/data-packs.test.js feeds the built data packs through the same collectors.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_LINKED_FIGURES, appPages, appCatalogs, appContemporaryPools, APP_ERAS, APP_INITIAL_CONTEXT, APP_SELECTION_CONTEXT } from './lib/app_views.mjs';
import { resolveNavigation, resolveInitialNavigation } from '../src/utils/navigation.js';
import { createSearchIndex, searchIndex } from '../src/utils/search.js';
import { linkedEvents, figureRelations } from '../src/utils/figureLinks.js';
import { figureBattles, battleAttacker, battleDefender, battleFigureIndex, resolveCommander, battleLinkedEvent, eventFigures, contemporaryMatches, resolveFigureSelection } from '../src/utils/relationRules.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BASELINE_DIR = join(ROOT, 'tests', 'fixtures', 'baseline');
// Files above this size store one short hash per entry instead of the full record.
const HASH_THRESHOLD_BYTES = 500 * 1024;

export const SEARCH_TERMS = ['曹操', '劉備', '諸葛亮', '孔明', '赤壁', '長平', '蔣中正', '鄭成功', '鄭芝龍', '顏思齊',
  '織田信長', '德川家康', '關原', '本能寺', '明治', '臺南', '洛陽', '長安', '北京', '南京',
  '戰役', '叛亂', '改革', '王', '李', '唐', '東寧', '霧社', '安史之亂', '不存在的詞xyz'];
const SEARCH_ACTIVE_IDS = ['yuanMing', 'taiwanLens', 'japanAtlas'];

export const baselineKey = (record, fallbackDataset = '?') => record ? `${record.datasetId || fallbackDataset}:${record.id}` : null;
const key = baselineKey;

// The current app logic, evaluated in memory.
export function memorySource() {
  const pages = appPages();
  return {
    pages,
    searchEntries: createSearchIndex(Object.values(appCatalogs())),
    catalogs: appCatalogs(), eras: APP_ERAS, initialContext: APP_INITIAL_CONTEXT,
    figureLinks: (page, figure) => ({
      relations: figureRelations(figure, page.figuresForLinks).map(r => [key(r.targetFigure), r.relationType, r.label]),
      events: linkedEvents(figure, page.eventsForLinks).map(e => key(e)),
      battles: figureBattles(figure, page.battlesForLinks).map(b => key(b, page.id)),
    }),
    commanderTargets: (page, battle) => {
      const figMap = battleFigureIndex(page.figuresForLinks);
      const targets = side => (Array.isArray(side.commanders) ? side.commanders : []).filter(Boolean).map(cmd => key(resolveCommander(cmd, figMap).fig));
      return { attacker: targets(battleAttacker(battle)), defender: targets(battleDefender(battle)), event: key(battleLinkedEvent(battle, page.eventsForLinks) || null) };
    },
    eventLinks: (page, evt) => ({
      figures: eventFigures(evt, page.figuresForLinks).map(f => [key(f), evt.figureLinkReviews?.[f.id] ?? null]),
      battle: evt.battleId ? key(page.battles.find(b => b.id === evt.battleId) || null, page.id) : null,
    }),
    contemporary: (() => { const pools = appContemporaryPools(); return (page, evt) => contemporaryMatches(evt, page.civ, pools)
      .map(m => [m.civKey, m.regimeLabel, m.closest ? key(m.closest) : null, m.closest?.periodId || m.closest?.eraId || null, Number.isFinite(m.minDiff) ? m.minDiff : null]); })(),
    selectionFigures: ALL_LINKED_FIGURES,
    selectionContext: APP_SELECTION_CONTEXT,
    taiwanRelationTargets: (page, figure) => figureRelations(figure, page.figuresForLinks).map(r => r.targetFigure),
    // Timeline tag chips: the figure a tag opens (Timeline.js matched the whole link pool before stage 2b).
    tagTargets: (page, evt) => Object.fromEntries((evt.tags || []).map(tag => [tag, key(page.figuresForLinks.find(f => f.name === tag || (f.courtesyName && f.courtesyName.includes(tag))) || null)])),
    validateFailures: collectValidateFailures,
  };
}

function collectSearch(source) {
  const out = {};
  for (const activeId of SEARCH_ACTIVE_IDS) {
    out[activeId] = {};
    for (const term of SEARCH_TERMS) {
      out[activeId][term] = searchIndex(source.searchEntries, term, activeId).map(r => [r.type, r.periodId, r.item.id, r.title, r.subtitle, r.score]);
    }
  }
  return out;
}

function collectNavigation(source) {
  const cats = source.catalogs;
  const hashes = ['', '#period=sanguo', '#civ=korea', '#lens=taiwan', '#civ=japan&era=jp_edo', '#civ=taiwan&era=missing',
    '#period=yuanMing&event=missing&figure=missing&battle=missing', '#civ=japan&event=missing&era=jp_edo', '#period=threeKingdoms&tab=figures', '#period=threeKingdoms&tab=battles'];
  for (const [id, p] of Object.entries(cats)) {
    if (id === 'taiwan' || id === 'japan') continue;
    for (const [param, list] of [['event', p.events], ['figure', p.figures], ['battle', p.battles]]) for (const r of list || []) hashes.push(`#period=${id}&${param}=${r.id}`);
  }
  for (const civ of ['taiwan', 'japan']) {
    const c = cats[civ];
    for (const [param, list] of [['event', c.events], ['figure', c.figures], ['battle', c.battles]]) for (const r of list) hashes.push(`#civ=${civ}&${param}=${r.id}`);
  }
  // A source may resolve each route the way the browser does it: with only the page that route opens loaded.
  const restore = source.resolveRoute || (hash => resolveNavigation(hash, cats, source.eras));
  const coldStart = source.resolveColdStart || (hash => resolveInitialNavigation(hash, source.initialContext));
  const out = {};
  for (const hash of hashes) {
    const r = restore(hash);
    const i = coldStart(hash);
    out[hash] = {
      restore: [r.civ, r.period, r.era, r.tab, r.event, r.figure, r.battle, r.unknown.civ, r.unknown.period],
      coldStart: [i.civ, i.period, i.tab, i.eras.taiwan, i.eras.japan, i.selectedEvent?.id || '', i.selectedFigure?.id || '', i.selectedBattle?.id || ''],
    };
  }
  return out;
}

function collectFigureLinks(source) {
  const out = {};
  for (const page of source.pages) for (const figure of page.figures) out[`${page.id}>${figure.id}`] = source.figureLinks(page, figure);
  return out;
}

function collectBattleLinks(source) {
  const out = {};
  for (const page of source.pages) {
    for (const battle of page.battles) {
      const targets = source.commanderTargets(page, battle);
      const side = (s, sideTargets) => [s.factionName ?? null, s.forcesEstimate ?? null, s.casualtiesEstimate ?? null,
        (Array.isArray(s.commanders) ? s.commanders : []).filter(Boolean).map((cmd, i) => { const c = resolveCommander(cmd, new Map()); return [c.cmdName, c.cmdTitle, sideTargets[i]]; })];
      out[`${page.id}>${battle.id}`] = {
        attacker: side(battleAttacker(battle), targets.attacker),
        defender: side(battleDefender(battle), targets.defender),
        event: targets.event,
      };
    }
  }
  return out;
}

function collectEventLinks(source) {
  const out = {};
  for (const page of source.pages) for (const evt of page.events) out[`${page.id}>${evt.id}`] = source.eventLinks(page, evt);
  return out;
}

function collectEventTags(source) {
  const out = {};
  for (const page of source.pages) for (const evt of page.events) if ((evt.tags || []).length) out[`${page.id}>${evt.id}`] = source.tagTargets(page, evt);
  return out;
}

function collectContemporary(source) {
  const out = {};
  for (const page of source.pages) {
    for (const evt of page.events) {
      if (typeof evt.year !== 'number') continue;
      out[`${page.id}>${evt.id}`] = source.contemporary(page, evt);
    }
  }
  return out;
}

function collectFigureSelection(source) {
  const decide = (figure, current) => {
    const d = resolveFigureSelection(figure, current, source.selectionContextFor ? source.selectionContextFor(figure) : source.selectionContext);
    if (!d) return null;
    const s = d.switchTo;
    return [key(d.target), s ? s.civ : 'stay', s ? (s.periodId || s.eraId) : null, s ? key(s.selectedEvent) : null];
  };
  // A figure outside the current page always switches the same way, so record it once per figure.
  const offPage = {};
  for (const figure of source.selectionFigures) offPage[key(figure)] = decide(figure, []);
  // Taiwan page: every listed figure (own and referenced) and every relation chip shown in its modal.
  const taiwan = source.pages.find(p => p.id === 'taiwanLens');
  const taiwanPage = {};
  for (const figure of taiwan.figures) {
    taiwanPage[figure.id] = {
      self: decide(figure, taiwan.figures),
      relationClicks: source.taiwanRelationTargets(taiwan, figure).map(target => decide(target, taiwan.figures)),
    };
  }
  return { offPage, taiwanPage };
}

function collectCounts(source) {
  return Object.fromEntries(source.pages.map(p => [p.id, { events: p.events.length, figures: p.figures.length, battles: p.battles.length }]));
}

export function collectValidateFailures() {
  const run = spawnSync(process.execPath, [join(ROOT, 'scripts', 'validate_history_data.mjs'), '--json'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const text = run.stdout;
  const report = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  return {
    exitCode: run.status,
    failureCount: report.failureCount,
    failures: report.findings.filter(f => f.severity === 'fail').map(f => `${f.rule}|${f.dataset}|${f.kind}|${f.id}|${f.detail}`).sort(),
  };
}

export function collectBaseline(source = memorySource()) {
  return {
    search: collectSearch(source),
    navigation: collectNavigation(source),
    figureLinks: collectFigureLinks(source),
    battleLinks: collectBattleLinks(source),
    eventLinks: collectEventLinks(source),
    eventTags: collectEventTags(source),
    contemporary: collectContemporary(source),
    figureSelection: collectFigureSelection(source),
    counts: collectCounts(source),
    ...(source.validateFailures ? { validateFailures: source.validateFailures() } : {}),
  };
}

const shortHash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 16);
// Large maps become {entryKey: hash} so a diff still names the entry that changed.
export function toFixture(value) {
  const full = JSON.stringify(value, null, 1);
  if (Buffer.byteLength(full) <= HASH_THRESHOLD_BYTES) return { hashed: false, data: value };
  const entries = value && typeof value === 'object' && !Array.isArray(value) ? value : { all: value };
  return { hashed: true, data: Object.fromEntries(Object.entries(entries).map(([k, v]) => [k, shortHash(v)])) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  mkdirSync(BASELINE_DIR, { recursive: true });
  for (const [name, value] of Object.entries(collectBaseline())) {
    const fixture = toFixture(value);
    const text = JSON.stringify(fixture, null, 1) + '\n';
    writeFileSync(join(BASELINE_DIR, `${name}.json`), text);
    console.log(`${name}.json\t${(Buffer.byteLength(text) / 1024).toFixed(1)} KB${fixture.hashed ? '（摘要雜湊）' : ''}`);
  }
}
