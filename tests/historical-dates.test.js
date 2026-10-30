import test from 'node:test';
import assert from 'node:assert/strict';
import {parseHistoricalYear,parseBirthDeathYears,parseEventYearRange,classifyEventChronology} from '../src/utils/historicalDates.js';

test('BCE/BC are complete era tokens and explicit CE survives mixed-era lifespans',()=>{
 for(const value of ['44 BCE','BCE 44','44 BC','44 B.C.E.','公元前44年','西元前44年','約前44年']) assert.equal(parseHistoricalYear(value),-44,value);
 for(const value of ['14 CE','CE 14','AD 14','14 A.D.','西元14年']) assert.equal(parseHistoricalYear(value),14,value);
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'44 BCE — 14 CE'}),{birthYear:-44,deathYear:14});
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'221 — 206 BCE'}),{birthYear:-221,deathYear:-206});
 assert.equal(parseHistoricalYear('44 BCE CE'),null);
});
test('signed years and compact delimiters preserve their sign',()=>{
 for(const lifeSpan of ['-259 - -210','-259--210','−259–−210','前259-前210年']) assert.deepEqual(parseBirthDeathYears({lifeSpan}),{birthYear:-259,deathYear:-210},lifeSpan);
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'公元前63年至公元14年'}),{birthYear:-63,deathYear:14});
});
test('Republic calendar converts explicit years without interpreting a reign title',()=>{
 assert.equal(parseHistoricalYear('民國1年'),1912);
 assert.equal(parseHistoricalYear('民國元年'),1912);
 assert.equal(parseHistoricalYear('民國一百零五年'),2016);
 assert.equal(parseHistoricalYear('民國前1年'),1911);
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'民國前46年～民國14年'}),{birthYear:1866,deathYear:1925});
 for(const bad of ['民國0年','民國-1年','康熙61年','建安十三年','黃龍1年']) assert.equal(parseHistoricalYear(bad),null,bad);
});
test('structured fields and signed numeric arrays override display text',()=>{
 assert.deepEqual(parseBirthDeathYears({birthYear:-63,deathYear:14,birthDeath:[100,200],lifeSpan:'1–2'}),{birthYear:-63,deathYear:14});
 assert.deepEqual(parseBirthDeathYears({birthDeath:[-63,14],lifeSpan:'63 BCE–14 BCE'}),{birthYear:-63,deathYear:14});
 assert.deepEqual(parseBirthDeathYears({birthYear:'前63年',birthDeath:[-99,14]}),{birthYear:-63,deathYear:14});
 assert.deepEqual(parseBirthDeathYears({birthDeath:['前63年','14 CE']}),{birthYear:-63,deathYear:14});
});
test('unknown and a single unlabelled year never invent another endpoint',()=>{
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'約1900年 — 不詳'}),{birthYear:1900,deathYear:null});
 assert.deepEqual(parseBirthDeathYears({lifeSpan:'?–223年'}),{birthYear:null,deathYear:223});
 for(const lifeSpan of ['223年','不詳','生卒待考','約3世紀','建安十三年—黃初元年']) assert.deepEqual(parseBirthDeathYears({lifeSpan}),{birthYear:null,deathYear:null},lifeSpan);
 assert.deepEqual(parseBirthDeathYears({birthYear:false,deathYear:true}),{birthYear:null,deathYear:null});
 assert.deepEqual(parseBirthDeathYears({birthDeath:[161,null]}),{birthYear:161,deathYear:null});
});
test('event intervals use explicit bounds, arrays, and complete calendar displays',()=>{
 assert.deepEqual(parseEventYearRange({startYear:1900,endYear:1910,year:1901}).startYear,1900);
 assert.equal(parseEventYearRange({year:[1900,1910]}).endYear,1910);
 assert.equal(parseEventYearRange({year:386,yearDisplay:'西元386—398年'}).endYear,398);
 assert.equal(parseEventYearRange({year:-221,yearDisplay:'前221～前206年'}).endYear,-206);
 assert.equal(parseEventYearRange({year:1912,yearDisplay:'民國元年 — 民國十年'}).endYear,1921);
});
test('regnal display numbers and contradictory/incomplete intervals remain unknown',()=>{
 assert.equal(parseEventYearRange({year:208,yearDisplay:'建安十三年 — 黃初元年'}).startYear,208);
 assert.equal(parseEventYearRange({yearDisplay:'建安十三年'}).startYear,null);
 assert.equal(parseEventYearRange({startYear:1900}).startYear,null);
 assert.equal(parseEventYearRange({startYear:1910,endYear:1900}).startYear,null);
 assert.equal(parseEventYearRange({year:1800,yearDisplay:'1900—1910'}).startYear,null);
 assert.equal(parseEventYearRange({yearDisplay:'19世紀'}).startYear,null);
});
test('chronology classifies containment, overlap, disjointness, boundaries and unknowns',()=>{
 const figure={birthYear:1900,deathYear:1950};
 for(const event of [{year:1900},{year:1950},{startYear:1910,endYear:1940}]) assert.equal(classifyEventChronology(figure,event).status,'within');
 for(const event of [{startYear:1890,endYear:1910},{startYear:1940,endYear:1960},{startYear:1800,endYear:2000}]) assert.equal(classifyEventChronology(figure,event).status,'overlap');
 for(const event of [{year:1899},{startYear:1951,endYear:1960}]) assert.equal(classifyEventChronology(figure,event).status,'outside');
 assert.equal(classifyEventChronology({birthYear:1900},{year:1920}).status,'unknown');
 assert.equal(classifyEventChronology({birthYear:1950,deathYear:1900},{year:1920}).status,'unknown');
 assert.equal(classifyEventChronology(figure,{yearDisplay:'康熙十年'}).status,'unknown');
});
test('approximation is preserved without inventing a tolerance interval',()=>{
 const result=classifyEventChronology({lifeSpan:'約1900–1950年'},{year:'約1899年'});
 assert.equal(result.status,'outside');
 assert.equal(result.eventRange.approximate,true);
 assert.equal(result.eventRange.startYear,1899);
});
