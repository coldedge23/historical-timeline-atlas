// Deliberately conservative: uncertain/range descriptions are never exact counts.
export function parseTroopCount(raw) {
  if (typeof raw === 'number') return Number.isFinite(raw) && raw > 0 ? raw : null;
  if (typeof raw !== 'string') return null;
  const s = raw.replace(/[,，\s]/g, '');
  if (/不詳|未知|待考|數|餘|余|以上|以下|多|少|至|到|[~～—–-]/.test(s)) return null;
  const match = s.match(/^(?:約|大約|估計)?(\d+(?:\.\d+)?)(萬|千|百)?(?:人|名|兵|兵力|部隊)?$/);
  if (!match) return null;
  const count = Number(match[1]) * ({萬:10000,千:1000,百:100}[match[2]] || 1);
  return Number.isFinite(count) && count > 0 ? count : null;
}
export function computeForcesTugOfWar(atkRaw, defRaw) {
  const atk = parseTroopCount(atkRaw), def = parseTroopCount(defRaw);
  if (atk === null || def === null) return { comparable:false, atkPct:null, defPct:null, ratioText:'資料不足，無法比較', isDisparity:false };
  const atkPct = atk / (atk + def) * 100;
  const format = n => Number(n.toFixed(2)).toString();
  return { comparable:true, atkPct, defPct:100-atkPct,
    ratioText:atk >= def ? `${format(atk/def)} : 1` : `1 : ${format(def/atk)}`,
    isDisparity:Math.max(atk,def) / Math.min(atk,def) >= 2.2 };
}
export function formatForcePercent(value) { return Number(value.toFixed(1)); }
