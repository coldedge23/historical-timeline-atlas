// Stage 1: the built catalog, search index and data packs must reproduce the stage 0 baseline,
// and the verify checks must catch broken packs.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { createDataPacks } from '../scripts/build_data_packs.mjs';
import { BASELINE_DIR, collectBaseline, toFixture } from '../scripts/capture_baseline.mjs';
import { contemporaryMatches } from '../src/utils/relationRules.js';

const { checkDataPacks } = createRequire(import.meta.url)('../scripts/check_data_packs.cjs');
const built = createDataPacks();
const json = Object.fromEntries(Object.entries(built.files).map(([file, text]) => [file, JSON.parse(text)]));
const catalog = json['data/catalog.json'];
const packs = Object.fromEntries(Object.entries(catalog.packs).map(([id, info]) => [id, json[info.file]]));
const search = json[catalog.searchIndex.file];

// Descriptor and pack keys in the stage 0 baseline format (<dataset>:<id>).
const bk = (d) => d ? `${d.homePack}:${d.id}` : null;
const entityFromKey = (k) => { const [dataset, , ...id] = k.split(':'); return { dataset, id: id.join(':') }; };

function packSource() {
  const pages = Object.entries(packs).map(([id, pack]) => ({ id, civ: pack.meta.civ, events: pack.events, figures: pack.figures, battles: pack.battles }));
  const china = pages.filter((p) => p.civ === 'china');
  const tw = packs.taiwanLens, jp = packs.japanAtlas;
  const withEra = (pack) => pack.battles.map((b) => ({ ...b, eraId: Object.entries(pack.eraBattleIds).find(([, ids]) => ids.includes(b.id))?.[0] }));
  const catalogs = { ...Object.fromEntries(china.map((p) => [p.id, { id: p.id, name: packs[p.id].period.name, events: p.events, figures: p.figures, battles: p.battles }])),
    taiwan: { id: 'taiwanLens', civ: 'taiwan', events: tw.events, figures: tw.figures, battles: withEra(tw) },
    japan: { id: 'japanAtlas', civ: 'japan', events: jp.events, figures: jp.figures, battles: withEra(jp) } };
  const fields = search.fields;
  const searchEntries = search.entries.map((row) => { const e = Object.fromEntries(fields.map((f, i) => [f, row[i]])); return { ...e, item: { id: entityFromKey(e.key).id } }; });
  const pools = Object.fromEntries(Object.entries(catalog.contemporary).map(([civ, rows]) => [civ, rows.map(([key, year, title, periodId, eraId, regimes]) => ({ key, year, title, periodId, eraId, regimes }))]));
  const poolEntry = Object.fromEntries(Object.values(pools).flat().map((e) => [e.key, e]));
  // ALL_LINKED_FIGURES: every dataset's own figures, first occurrence of an id wins.
  const seen = new Set();
  const selectionFigures = pages.flatMap((p) => p.figures.filter((f) => !f.ref)).filter((f) => !seen.has(f.id) && seen.add(f.id));
  const linkOf = (page) => packs[page.id].links;
  return {
    pages, searchEntries, catalogs,
    eras: { taiwan: tw.eras, japan: jp.eras },
    initialContext: { periods: Object.fromEntries(china.map((p) => [p.id, p])), eraCivs: {
      taiwan: { eras: tw.eras, eraBattleIds: tw.eraBattleIds, events: tw.events, figures: tw.figures, battles: tw.battles },
      japan: { eras: jp.eras, eraBattleIds: jp.eraBattleIds, events: jp.events, figures: jp.figures, battles: jp.battles } } },
    figureLinks: (page, figure) => { const l = linkOf(page).figures[figure.id];
      return { relations: l.relations.map((d) => [bk(d), d.relationType, d.label]), events: l.events.map(bk), battles: l.battles.map(bk) }; },
    commanderTargets: (page, battle) => { const l = linkOf(page).battles[battle.id];
      return { attacker: l.commanders.attacker.map(bk), defender: l.commanders.defender.map(bk), event: bk(l.event) }; },
    eventLinks: (page, evt) => { const l = linkOf(page).events[evt.id]; return { figures: l.figures.map((d) => [bk(d), d.review]), battle: bk(l.battle) }; },
    tagTargets: (page, evt) => Object.fromEntries((evt.tags || []).map((tag) => [tag, bk(linkOf(page).events[evt.id].tags[tag])])),
    contemporary: (page, evt) => {
      const own = poolEntry[`${evt.datasetId}:event:${evt.id}`];
      return contemporaryMatches(evt, page.civ, pools).map((m) => [m.civKey, own.regimes[m.civKey],
        m.closest ? (({ dataset, id }) => `${dataset}:${id}`)(entityFromKey(m.closest.key)) : null,
        m.closest?.periodId || m.closest?.eraId || null, Number.isFinite(m.minDiff) ? m.minDiff : null]);
    },
    selectionFigures,
    selectionContext: { periods: Object.fromEntries(china.map((p) => [p.id, p])), eventsByCiv: { japan: jp.events, taiwan: tw.events } },
    taiwanRelationTargets: (page, figure) => linkOf(page).figures[figure.id].relations.map((d) => ({ id: d.id, datasetId: d.homePack, eraId: d.eraId ?? undefined })),
  };
}

const fromPacks = collectBaseline(packSource());
for (const [name, value] of Object.entries(fromPacks)) {
  test(`data packs reproduce baseline: ${name}`, () => {
    const expected = JSON.parse(readFileSync(join(BASELINE_DIR, `${name}.json`), 'utf8'));
    assert.deepEqual(JSON.parse(JSON.stringify(toFixture(value))), expected);
  });
}

test('packs are deterministic and content-hashed', () => {
  assert.deepEqual(Object.keys(createDataPacks().files).sort(), Object.keys(built.files).sort());
  for (const info of Object.values(catalog.packs)) assert.match(info.file, /^data\/packs\/[A-Za-z]+\.[a-f0-9]{12}\.json$/);
});

test('derived links are marked with their basis', () => {
  const tk = packs.threeKingdoms.links;
  const bases = new Set(Object.values(tk.figures).flatMap((l) => l.battles.map((d) => `${d.basis}:${d.derived}`)));
  assert.ok(bases.has('commander-name:true') || bases.has('summary-text:true'));
  for (const l of Object.values(tk.figures)) for (const d of l.relations) assert.equal(d.derived, d.basis !== 'relation', d.key);
  assert.ok(packs.taiwanLens.figures.some((f) => f.ref === `republicModern:figure:${f.id}`), 'Taiwan pack carries referenced figures');
});

function writeDist(files) {
  const dist = mkdtempSync(join(tmpdir(), 'atlas-packs-'));
  for (const [file, text] of Object.entries(files)) { mkdirSync(dirname(join(dist, file)), { recursive: true }); writeFileSync(join(dist, file), text); }
  return { dist, manifest: { data: { catalog: 'data/catalog.json', files: Object.keys(files) } } };
}

test('verify accepts the built packs and rejects broken ones', (t) => {
  const ok = writeDist(built.files);
  t.after(() => rmSync(ok.dist, { recursive: true, force: true }));
  assert.equal(checkDataPacks(ok.dist, ok.manifest, { strictLeftovers: true }).leftovers.length, 0);

  const leftover = join(ok.dist, 'data', 'packs', 'old.000000000000.json');
  writeFileSync(leftover, '{}');
  assert.equal(checkDataPacks(ok.dist, ok.manifest, { strictLeftovers: false }).leftovers.length, 1);
  assert.throws(() => checkDataPacks(ok.dist, ok.manifest, { strictLeftovers: true }), /未列出/);
  rmSync(leftover);

  const tkFile = catalog.packs.threeKingdoms.file;
  const broken = { ...built.files, [tkFile]: JSON.stringify({ ...packs.threeKingdoms, figures: packs.threeKingdoms.figures.filter((f) => f.id !== 'cao_cao') }) };
  const missing = writeDist(broken);
  t.after(() => rmSync(missing.dist, { recursive: true, force: true }));
  assert.throws(() => checkDataPacks(missing.dist, missing.manifest), /threeKingdoms:figure:cao_cao/);

  const corrupt = writeDist({ ...built.files, [tkFile]: '{"meta":' });
  t.after(() => rmSync(corrupt.dist, { recursive: true, force: true }));
  assert.throws(() => checkDataPacks(corrupt.dist, corrupt.manifest), /不是有效 JSON/);

  const wrongVersion = writeDist({ ...built.files, [tkFile]: JSON.stringify({ ...packs.threeKingdoms, meta: { ...packs.threeKingdoms.meta, schemaVersion: 99 } }) });
  t.after(() => rmSync(wrongVersion.dist, { recursive: true, force: true }));
  assert.throws(() => checkDataPacks(wrongVersion.dist, wrongVersion.manifest), /schemaVersion/);
});
