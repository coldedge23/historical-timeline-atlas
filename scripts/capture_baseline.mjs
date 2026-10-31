// Stage 0 baseline: record current search, navigation, relation and count behaviour as JSON fixtures.
// Usage: node scripts/capture_baseline.mjs   (writes tests/fixtures/baseline/*.json)
// tests/baseline.test.js imports collectBaseline() and compares against the written files.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LINKED_PERIODS, LINKED_TAIWAN_EVENTS, LINKED_JAPAN_EVENTS, LINKED_JAPAN_FIGURES, LINKED_TAIWAN_FIGURES, ALL_LINKED_FIGURES, ALL_LINKED_EVENTS, ALL_LINKED_BATTLES } from '../src/data/linkedHistoryCatalog.js';
import { TAIWAN_LENS_ERAS, TAIWAN_RELATED_BATTLES, ERA_BATTLE_IDS } from '../src/data/taiwanLensData.js';
import { JAPAN_ERAS, JAPAN_BATTLES, JAPAN_ALL_EVENTS, JAPAN_ERA_BATTLE_IDS } from '../src/data/japan/index.js';
import { resolveNavigation, resolveInitialNavigation } from '../src/utils/navigation.js';
import { createSearchIndex, searchIndex } from '../src/utils/search.js';
import { linkedEvents, figureRelations } from '../src/utils/figureLinks.js';
import { figureBattles, battleAttacker, battleDefender, battleFigureIndex, resolveCommander, battleLinkedEvent, contemporaryMatches, resolveFigureSelection } from '../src/utils/relationRules.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BASELINE_DIR = join(ROOT, 'tests', 'fixtures', 'baseline');
// Files above this size store one short hash per entry instead of the full record.
const HASH_THRESHOLD_BYTES = 500 * 1024;

export const SEARCH_TERMS = ['曹操', '劉備', '諸葛亮', '孔明', '赤壁', '長平', '蔣中正', '鄭成功', '鄭芝龍', '顏思齊',
  '織田信長', '德川家康', '關原', '本能寺', '明治', '臺南', '洛陽', '長安', '北京', '南京',
  '戰役', '叛亂', '改革', '王', '李', '唐', '東寧', '霧社', '安史之亂', '不存在的詞xyz'];
const SEARCH_ACTIVE_IDS = ['yuanMing', 'taiwanLens', 'japanAtlas'];

const key = (record, fallbackDataset = '?') => record ? `${record.datasetId || fallbackDataset}:${record.id}` : null;

// Same page data and link pools as App (app.js currentEvents/currentFigures/currentBattles, figuresForLinks...).
function pages() {
  const list = Object.entries(LINKED_PERIODS).map(([id, p]) => ({ id, civ: 'china', events: p.events || [], figures: p.figures || [], battles: p.battles || [] }));
  list.push({ id: 'taiwanLens', civ: 'taiwan', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES });
  list.push({ id: 'japanAtlas', civ: 'japan', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES });
  for (const page of list) {
    page.figuresForLinks = [...page.figures, ...ALL_LINKED_FIGURES.filter(f => !page.figures.some(l => l.id === f.id))];
    page.eventsForLinks = [...page.events, ...ALL_LINKED_EVENTS.filter(e => !page.events.some(l => l.id === e.id))];
    page.battlesForLinks = [...page.battles, ...ALL_LINKED_BATTLES.filter(b => !page.battles.some(l => l.id === b.id))];
  }
  return list;
}

function catalogs() {
  return { ...LINKED_PERIODS,
    taiwan: { id: 'taiwanLens', civ: 'taiwan', name: '臺灣歷史', events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES.map(b => ({ ...b, eraId: Object.entries(ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0] })) },
    japan: { id: 'japanAtlas', civ: 'japan', name: '日本歷史', events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES.map(b => ({ ...b, eraId: Object.entries(JAPAN_ERA_BATTLE_IDS).find(([, ids]) => ids.includes(b.id))?.[0] })) },
  };
}

function collectSearch() {
  const index = createSearchIndex(Object.values(catalogs()));
  const out = {};
  for (const activeId of SEARCH_ACTIVE_IDS) {
    out[activeId] = {};
    for (const term of SEARCH_TERMS) {
      out[activeId][term] = searchIndex(index, term, activeId).map(r => [r.type, r.periodId, r.item.id, r.title, r.subtitle, r.score]);
    }
  }
  return out;
}

function collectNavigation() {
  const cats = catalogs();
  const eras = { taiwan: TAIWAN_LENS_ERAS, japan: JAPAN_ERAS };
  const initialCtx = { periods: LINKED_PERIODS,
    taiwanEras: TAIWAN_LENS_ERAS, taiwanEraBattleIds: ERA_BATTLE_IDS,
    japanEras: JAPAN_ERAS, japanAllEvents: JAPAN_ALL_EVENTS, japanEraBattleIds: JAPAN_ERA_BATTLE_IDS,
    taiwan: { events: LINKED_TAIWAN_EVENTS, figures: LINKED_TAIWAN_FIGURES, battles: TAIWAN_RELATED_BATTLES },
    japan: { events: LINKED_JAPAN_EVENTS, figures: LINKED_JAPAN_FIGURES, battles: JAPAN_BATTLES } };
  const hashes = ['', '#period=sanguo', '#civ=korea', '#lens=taiwan', '#civ=japan&era=jp_edo', '#civ=taiwan&era=missing',
    '#period=yuanMing&event=missing&figure=missing&battle=missing', '#civ=japan&event=missing&era=jp_edo', '#period=threeKingdoms&tab=figures', '#period=threeKingdoms&tab=battles'];
  for (const [id, p] of Object.entries(LINKED_PERIODS)) {
    for (const [param, list] of [['event', p.events], ['figure', p.figures], ['battle', p.battles]]) for (const r of list || []) hashes.push(`#period=${id}&${param}=${r.id}`);
  }
  for (const civ of ['taiwan', 'japan']) {
    const c = cats[civ];
    for (const [param, list] of [['event', c.events], ['figure', c.figures], ['battle', c.battles]]) for (const r of list) hashes.push(`#civ=${civ}&${param}=${r.id}`);
  }
  const out = {};
  for (const hash of hashes) {
    const r = resolveNavigation(hash, cats, eras);
    const i = resolveInitialNavigation(hash, initialCtx);
    out[hash] = {
      restore: [r.civ, r.period, r.era, r.tab, r.event, r.figure, r.battle, r.unknown.civ, r.unknown.period],
      coldStart: [i.civ, i.period, i.tab, i.taiwanEra, i.japanEra, i.selectedEvent?.id || '', i.selectedFigure?.id || '', i.selectedBattle?.id || ''],
    };
  }
  return out;
}

function collectFigureLinks(pageList) {
  const out = {};
  for (const page of pageList) {
    for (const figure of page.figures) {
      out[`${page.id}>${figure.id}`] = {
        relations: figureRelations(figure, page.figuresForLinks).map(r => [key(r.targetFigure), r.relationType, r.label]),
        events: linkedEvents(figure, page.eventsForLinks).map(e => key(e)),
        battles: figureBattles(figure, page.battlesForLinks).map(b => key(b, page.id)),
      };
    }
  }
  return out;
}

function collectBattleLinks(pageList) {
  const out = {};
  for (const page of pageList) {
    const figMap = battleFigureIndex(page.figuresForLinks);
    for (const battle of page.battles) {
      const side = s => [s.factionName ?? null, s.forcesEstimate ?? null, s.casualtiesEstimate ?? null,
        (Array.isArray(s.commanders) ? s.commanders : []).filter(Boolean).map(cmd => { const c = resolveCommander(cmd, figMap); return [c.cmdName, c.cmdTitle, key(c.fig)]; })];
      out[`${page.id}>${battle.id}`] = {
        attacker: side(battleAttacker(battle)),
        defender: side(battleDefender(battle)),
        event: key(battleLinkedEvent(battle, page.eventsForLinks) || null),
      };
    }
  }
  return out;
}

function collectContemporary(pageList) {
  const allChinaEvents = [];
  for (const [periodId, p] of Object.entries(LINKED_PERIODS)) for (const evt of p.events || []) allChinaEvents.push({ ...evt, periodId, periodName: p.name });
  allChinaEvents.sort((a, b) => a.year - b.year);
  const pools = { china: allChinaEvents, taiwan: LINKED_TAIWAN_EVENTS, japan: LINKED_JAPAN_EVENTS };
  const out = {};
  for (const page of pageList) {
    for (const evt of page.events) {
      if (typeof evt.year !== 'number') continue;
      out[`${page.id}>${evt.id}`] = contemporaryMatches(evt, page.civ, pools)
        .map(m => [m.civKey, m.regimeLabel, m.closest ? key(m.closest) : null, m.closest?.periodId || m.closest?.eraId || null, Number.isFinite(m.minDiff) ? m.minDiff : null]);
    }
  }
  return out;
}

function collectFigureSelection(pageList) {
  const ctx = { periods: LINKED_PERIODS, japanEvents: LINKED_JAPAN_EVENTS, taiwanEvents: LINKED_TAIWAN_EVENTS };
  const decide = (figure, current) => {
    const d = resolveFigureSelection(figure, current, ctx);
    if (!d) return null;
    const s = d.switchTo;
    return [key(d.target), s ? s.civ : 'stay', s ? (s.periodId || s.japanEraId || s.taiwanEraId) : null, s ? key(s.selectedEvent) : null];
  };
  // A figure outside the current page always switches the same way, so record it once per figure.
  const offPage = {};
  for (const figure of ALL_LINKED_FIGURES) offPage[key(figure)] = decide(figure, []);
  // Taiwan page: every listed figure (own and referenced) and every relation chip shown in its modal.
  const taiwan = pageList.find(p => p.id === 'taiwanLens');
  const taiwanPage = {};
  for (const figure of taiwan.figures) {
    taiwanPage[figure.id] = {
      self: decide(figure, taiwan.figures),
      relationClicks: figureRelations(figure, taiwan.figuresForLinks).map(r => decide(r.targetFigure, taiwan.figures)),
    };
  }
  return { offPage, taiwanPage };
}

function collectCounts(pageList) {
  return Object.fromEntries(pageList.map(p => [p.id, { events: p.events.length, figures: p.figures.length, battles: p.battles.length }]));
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

export function collectBaseline() {
  const pageList = pages();
  return {
    search: collectSearch(),
    navigation: collectNavigation(),
    figureLinks: collectFigureLinks(pageList),
    battleLinks: collectBattleLinks(pageList),
    contemporary: collectContemporary(pageList),
    figureSelection: collectFigureSelection(pageList),
    counts: collectCounts(pageList),
    validateFailures: collectValidateFailures(),
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
