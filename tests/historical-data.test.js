import test from 'node:test';
import assert from 'node:assert/strict';
import {parseTroopCount, computeForcesTugOfWar} from '../src/utils/forces.js';
import {resolvePeriodId} from '../src/utils/period.js';
import {normalizePeriodDataset, parseBirthDeathYears} from '../src/data/schemaNormalizer.js';

test('explicit period wins over mixed cross-civilization figures', () => {
  assert.equal(resolvePeriodId('yuanMing', [{id:'fig_tw_sample'}]), 'yuanMing');
  assert.equal(resolvePeriodId('japan', []), 'japanAtlas');
});
test('force parsing preserves uncertainty and exact ratios without visual clamping', () => {
  for (const raw of ['數萬','十餘萬','1萬至2萬','1-2萬','未知','精銳主力','兵力10000，民眾20000']) assert.equal(parseTroopCount(raw), null, raw);
  assert.equal(parseTroopCount('約1.5萬人'), 15000);
  assert.equal(parseTroopCount('10,000'), 10000);
  assert.equal(parseTroopCount(500), 500);
  assert.equal(computeForcesTugOfWar('數萬','10000').comparable, false);
  const comparison = computeForcesTugOfWar('99000','1000');
  assert.equal(comparison.atkPct,99); assert.equal(comparison.defPct,1);
});
test('missing and partial dates never fabricate a lifespan', () => {
  assert.deepEqual(parseBirthDeathYears({lifeSpan:'約1300年'}), {birthYear:null,deathYear:null});
  assert.deepEqual(parseBirthDeathYears({birthYear:1300}), {birthYear:1300,deathYear:null});
  assert.deepEqual(parseBirthDeathYears({birthDeath:['?',1400]}), {birthYear:null,deathYear:1400});
  assert.deepEqual(parseBirthDeathYears({lifeSpan:'前551—前479'}), {birthYear:-551,deathYear:-479});
  assert.deepEqual(parseBirthDeathYears({lifeSpan:'前6—西元30'}), {birthYear:-6,deathYear:30});
});
test('normalization labels inferred relations and does not invent commanders or forces', () => {
  const data=normalizePeriodDataset({id:'yuanMing', figures:[{id:'a',name:'甲方',faction:'ming'},{id:'b',name:'乙方',faction:'ming'}], events:[{id:'e',year:1300,title:'甲方與乙方'}], battles:[{id:'b1',name:'戰役',summary:'甲方與乙方交戰',year:1300}]});
  assert.equal(data.figures[0].relations[0].inferred,true);
  assert.equal(data.figures[0].relations[0].relationType,'recommended');
  assert.equal(data.figures[0].abilitiesSource,'algorithm-entertainment');
  assert.equal(data.battles[0].attacker.forcesEstimate,'待考');
  assert.deepEqual(data.battles[0].attacker.commanders,[]);
  assert.deepEqual(data.battles[0].defender.commanders,[]);
});

import {getFactionMeta} from '../src/data/factionConfig.js';
test('faction labels remain within the explicitly selected period', () => {
  assert.equal(getFactionMeta('ming','yuanMing').label,'大明王朝');
  assert.equal(getFactionMeta('yuan','yuanMing').label,'大元/北元');
  assert.equal(getFactionMeta('cultural','yuanMing').label,'科技/文豪/名醫');
  assert.equal(getFactionMeta('ming','unknown').label,'未分類陣營');
  assert.equal(getFactionMeta('sengoku','yuanMing').label,'未分類陣營');
});
