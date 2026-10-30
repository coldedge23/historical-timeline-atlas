import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyHistorySources} from '../src/utils/historySources.js';
test('missing source fields do not turn narrative book mentions into citations',()=>{
  assert.equal(classifyHistorySources({bio:'著《本草綱目》，是一位名醫。'}).status,'missing');
  assert.equal(classifyHistorySources({source:' ',sources:[{},null]}).status,'missing');
});
test('generic histories and pending notes remain unverified',()=>{
  for(const source of ['正史食貨志記載','官志','來源待考','無具體書名卷章或URL','《正史》','國史館記載']) assert.equal(classifyHistorySources({source}).status,'unverified-note',source);
});
test('specific book titles and valid URLs provide traceability, never automatic verification',()=>{
  for(const source of ['《三國志·蜀書·後主傳》裴松之注','https://example.org/history','《史記》']) {
    const result=classifyHistorySources({source}); assert.equal(result.status,'traceable-reference'); assert.equal(result.reviewed,false);
  }
  assert.equal(classifyHistorySources({source:{title:'三國志',chapter:'卷三十二'}}).status,'traceable-reference');
  assert.equal(classifyHistorySources({sourceUrl:'javascript:alert(1)'}).status,'unverified-note');
});
test('verified web requires explicit review, a valid URL and scoped claims on the same citation',()=>{
  const base={url:'https://example.org/history',title:'原始記錄',externalReviewed:true,claimScope:'僅核對此人物出生年份'};
  const result=classifyHistorySources({sources:[base]}); assert.equal(result.status,'verified-web'); assert.equal(result.reviewed,true); assert.deepEqual(result.claimScopes,['僅核對此人物出生年份']);
  for(const citation of [{...base,externalReviewed:false},{...base,externalReviewed:'true'},{...base,claimScope:''},{...base,url:'not-a-url'}]) assert.notEqual(classifyHistorySources({sources:[citation]}).status,'verified-web');
  assert.equal(classifyHistorySources({sourceUrl:base.url,externalReviewed:true,claimScope:'僅核對年份'}).status,'verified-web');
  assert.equal(classifyHistorySources({sources:[base.url],externalReviewed:true,claimScope:'不得套給整陣列'}).status,'traceable-reference');
});
test('classification does not mutate input, and mixed citations preserve individual review states',()=>{
  const record={sources:[{url:'https://example.org',externalReviewed:true,claimScope:['年份']},'正史記載']}; const before=structuredClone(record);
  const result=classifyHistorySources(record); assert.deepEqual(record,before); assert.equal(result.entries[1].reviewed,false); assert.match(result.reason,/不代表全篇/);
});

test('a chapter without a named work is insufficient, while an explicit classic title is traceable',()=>{
  assert.equal(classifyHistorySources({source:{chapter:'卷三十二'}}).status,'unverified-note');
  assert.equal(classifyHistorySources({source:'三國志 卷三十二'}).status,'traceable-reference');
  assert.equal(classifyHistorySources({source:'《來源待考》'}).status,'unverified-note');
});
