/** Source traceability labels describe citation metadata, never historical truth. */
export const HISTORY_SOURCE_FIELDS = Object.freeze(['source','sources','sourceNote','references','citations','reference','sourceUrl','sourceText']);
const labels = { missing:'尚未提供來源', 'unverified-note':'來源註記待補', 'traceable-reference':'有參考線索，尚未核對', 'verified-web':'有外部核對紀錄（限列明範圍）' };
const rank = { missing:0, 'unverified-note':1, 'traceable-reference':2, 'verified-web':3 };
const textValue = value => typeof value === 'string' ? value.trim() : '';
const scopeValue = value => Array.isArray(value) ? value.filter(item=>typeof item==='string' && item.trim()).join('；') : textValue(value);
const httpUrl = value => {
  if (typeof value !== 'string') return null;
  const match=value.match(/https?:\/\/[^\s<>「」『』《》"'，。；、)）]+/i);
  if (!match) return null;
  try { const parsed=new URL(match[0]); return ['http:','https:'].includes(parsed.protocol) && parsed.hostname ? parsed.href : null; } catch { return null; }
};
const referenceTitle = text => {
  for (const match of text.matchAll(/《([^》]{2,100})》/g)) {
    if (!/^(正史|官志|史料|資料|地方志|史書|文獻|古籍|來源待考|待考|未知|待補)$/.test(match[1].trim())) return match[1].trim();
  }
  const named = text.match(/(?:三國志|史記|後漢書|漢書|晉書|通典|資治通鑑|宋史|元史|明史|清史稿|[臺台]灣通史|[臺台]灣府志)(?=[·・．‧：:\s卷]|$)/);
  return named?.[0] || null;
};
function entryFor(value,field,metadata = {}) {
  if (value && typeof value==='object' && !Array.isArray(value)) {
    const title=textValue(value.title || value.work || value.book || value.bookTitle);
    const chapter=textValue(value.chapter || value.volume || value.section);
    const text=textValue(value.text || value.note || value.citation || value.reference) || [title,chapter].filter(Boolean).join('・');
    const url=httpUrl(value.url || value.sourceUrl || value.href || text);
    if (!text && !url) return null;
    const claimScope=scopeValue(value.claimScope);
    const traceableTitle=title && !/^(正史|官志|史料|資料|地方志|史書|文獻|古籍|來源待考|待考|未知|待補)$/.test(title) ? title : referenceTitle(text);
    const declaredReviewed=value.externalReviewed===true;
    const verified=declaredReviewed && !!url && !!claimScope;
    const traceable=!!url || !!traceableTitle;
    const status=verified?'verified-web':traceable?'traceable-reference':'unverified-note';
    return {field,text,url,referenceTitle:traceableTitle || null,claimScope:claimScope || null,status,reviewed:verified,reason:verified?'有明確外部核對標記、URL及主張範圍；僅適用列明範圍':traceable?'有可追溯參考線索，但尚未確認此筆主張與來源相符':'只有泛稱或不完整來源註記'};
  }
  const text=textValue(value);
  if (!text) return null;
  const url=httpUrl(text), title=referenceTitle(text);
  const claimScope=scopeValue(metadata.claimScope);
  const verified=metadata.externalReviewed===true && !!url && !!claimScope;
  const status=verified?'verified-web':url || title?'traceable-reference':'unverified-note';
  return {field,text,url,referenceTitle:title,claimScope:claimScope || null,status,reviewed:verified,reason:verified?'有明確外部核對標記、URL及主張範圍；僅適用列明範圍':url || title?'有可追溯參考線索，但尚未確認此筆主張與來源相符':'只有泛稱或不完整來源註記'};
}
export function classifyHistorySources(record = {}) {
  const entries=[];
  for (const field of HISTORY_SOURCE_FIELDS) {
    const value=record?.[field];
    const values=Array.isArray(value)?value:[value];
    for (const item of values) {
      // Record-level review metadata applies only to its own URL field, never
      // blanket-promotes every source string in an array.
      const entry=entryFor(item,field,field==='sourceUrl'?record:{});
      if (entry) entries.push(entry);
    }
  }
  const status=entries.reduce((best,entry)=>rank[entry.status]>rank[best]?entry.status:best,'missing');
  return {status,label:labels[status],reviewed:status==='verified-web',entries,
    reason:status==='missing'?'尚無明確來源欄位；敘事中的書名不自動視為引用':status==='verified-web'?'核對標記僅涵蓋列明主張，不代表全篇內容已查證':'可讀取來源註記，但尚未逐筆核對內容',
    claimScopes:[...new Set(entries.filter(entry=>entry.reviewed).map(entry=>entry.claimScope))],
    disclaimer:'來源分類僅反映引用及核對紀錄的完整度，不是史實正確性認證。'};
}


