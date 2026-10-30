import { FIGURE_ID_CORRECTIONS } from './linkCorrections.js';
import { EVENT_ID_CORRECTIONS } from './eventLinkCorrections.js';

const navigation = (dataset, record) => {
  const civ = dataset.civ || dataset.civilizationMode || (dataset.id === 'taiwanLens' ? 'taiwan' : dataset.id === 'japanAtlas' ? 'japan' : 'china');
  return { id: record.id, datasetId: dataset.id, periodId: dataset.id, civ, civilizationMode: civ, ...(record.eraId ? { eraId: record.eraId } : {}) };
};
const indexRecords = (datasets, field) => {
  const index = new Map();
  for (const dataset of datasets) for (const record of dataset[field] || []) {
    if (!record.id) continue;
    const entries = index.get(record.id) || [];
    entries.push({ dataset, record }); index.set(record.id, entries);
  }
  return index;
};

/** Resolve only explicit correction entries. Raw records and supplied tables are never mutated. */
export function buildHistoryLinkGraph(input, { figureCorrections = FIGURE_ID_CORRECTIONS, eventCorrections = EVENT_ID_CORRECTIONS } = {}) {
  if (!Array.isArray(input)) throw new TypeError('datasets 必須是陣列');
  const figureIndex = indexRecords(input, 'figures');
  const eventIndex = indexRecords(input, 'events');
  const repairs = [], pending = []; const repairKeys = new Set();
  const find = (index, id, datasetId) => {
    const candidates = index.get(id) || [];
    return candidates.find((target) => target.dataset.id === datasetId) || candidates[0];
  };
  const resolveLink = (dataset, record, field, kind, id) => {
    const index = kind === 'event' ? eventIndex : figureIndex;
    const existing = find(index, id, dataset.id);
    if (existing) return { id, target: navigation(existing.dataset, existing.record) };
    const corrections = kind === 'event' ? eventCorrections : figureCorrections;
    const correction = corrections[`${dataset.id}:${record.id}:${id}`] || corrections[`${dataset.id}:${id}`];
    if (correction?.allowedFigureIds && !correction.allowedFigureIds.includes(record.id)) return { unresolved: { kind, id, reason: '別名可識別，但人物參與關係待確認', field } };
    const target = correction?.to ? find(index, correction.to, dataset.id) : undefined;
    if (target) {
      const repairKey = [dataset.id, record.id, field, kind, id, correction.to].join(":");
      if (!repairKeys.has(repairKey)) repairs.push({ datasetId: dataset.id, recordId: record.id, field, kind, from: id, to: correction.to, evidence: correction.evidence, target: navigation(target.dataset, target.record) }); repairKeys.add(repairKey);
      return { id: correction.to, target: navigation(target.dataset, target.record) };
    }
    const reason = correction?.to ? `校正目標 ${correction.to} 不存在，保留待確認` : '原始引用找不到實際資料；尚無可確認的校正';
    return { unresolved: { kind, id, reason, field } };
  };
  const datasets = input.map((dataset) => {
    const processRecord = (record, recordKind) => {
      const output = { ...record, ...navigation(dataset, record) };
      const originals = { ...(record.originalLinkIds || {}) };
      const linkTargets = { figures: [], events: [], relations: [] };
      const pendingLinks = (record.pendingLinks || []).filter((link) => !['figureIds','figuresInvolved','participatedEventIds','relations'].includes(link.field)).map((link) => ({ ...link }));
      const pendingKeys = new Set(pendingLinks.map((link) => `${link.field || ''}:${link.kind}:${link.id}`));
      const retainPending = (link) => {
        const key = `${link.field}:${link.kind}:${link.id}`;
        if (!pendingKeys.has(key)) { pendingLinks.push(link); pendingKeys.add(key); }
      };
      const list = (field, kind, targetField) => {
        if (!Array.isArray(record[field])) return;
        originals[field] ??= [...record[field]];
        const seen = new Set();
        output[field] = [];
        for (const id of new Set([...(originals[field] || []), ...record[field]])) {
          const resolved = resolveLink(dataset, record, field, kind, id);
          if (resolved.unresolved) { retainPending(resolved.unresolved); continue; }
          if (seen.has(resolved.id)) continue;
          seen.add(resolved.id); output[field].push(resolved.id);
          if (!linkTargets[targetField].some((entry) => entry.id === resolved.id)) linkTargets[targetField].push(resolved.target);
        }
      };
      if (recordKind === 'events') {
        list('figureIds', 'figure', 'figures');
        list('figuresInvolved', 'figure', 'figures');
      }
      if (recordKind === 'figures') {
        list('participatedEventIds', 'event', 'events');
        if (Array.isArray(record.relations)) {
          originals.relations ??= record.relations.map((relation) => ({ ...relation }));
          const seen = new Set();
          output.relations = [];
          for (const relation of [...(originals.relations || []), ...record.relations]) {
            const resolved = resolveLink(dataset, record, 'relations', 'relation', relation.figureId);
            if (resolved.unresolved) { retainPending(resolved.unresolved); continue; }
            const key = `${resolved.id}:${relation.relationType || ''}:${relation.description || ''}`;
            if (seen.has(key)) continue;
            seen.add(key);
            output.relations.push({ ...relation, ...resolved.target, figureId: resolved.id });
            if (!linkTargets.relations.some((entry) => entry.id === resolved.id)) linkTargets.relations.push(resolved.target);
          }
        }
      }
      if (Object.keys(originals).length) output.originalLinkIds = originals;
      output.linkTargets = linkTargets;
      output.pendingLinks = pendingLinks;
      for (const link of pendingLinks) pending.push({ datasetId: dataset.id, recordId: record.id, ...link });
      return output;
    };
    return { ...dataset, events: (dataset.events || []).map((record) => processRecord(record, 'events')), figures: (dataset.figures || []).map((record) => processRecord(record, 'figures')), battles: (dataset.battles || []).map((record) => processRecord(record, 'battles')) };
  });
  // Add only cross-dataset reverse navigation explicitly declared by the event.
  // Same-dataset participation discrepancies remain untouched for human review.
  const effectiveFigures = new Map();
  for (const dataset of datasets) for (const figure of dataset.figures) effectiveFigures.set(`${dataset.id}:${figure.id}`, figure);
  for (const dataset of datasets) for (const event of dataset.events) {
    for (const target of event.linkTargets.figures) {
      if (target.datasetId === dataset.id) continue;
      const figure = effectiveFigures.get(`${target.datasetId}:${target.id}`);
      if (!figure) continue;
      const disputed = (figure.pendingLinks || []).some((link) => {
        if (link.kind !== 'event') return false;
        const correction = eventCorrections[`${target.datasetId}:${figure.id}:${link.id}`] || eventCorrections[`${target.datasetId}:${link.id}`];
        return link.id === event.id || correction?.to === event.id;
      });
      if (disputed || (figure.participatedEventIds || []).includes(event.id)) continue;
      figure.participatedEventIds = [...(figure.participatedEventIds || []), event.id];
      figure.linkTargets.events = [...figure.linkTargets.events, navigation(dataset, event)];
      figure.derivedEventLinks = [...(figure.derivedEventLinks || []), { eventId: event.id, datasetId: dataset.id, basis: 'event-declared-figure' }];
    }
  }
  return { datasets, repairs, pending };
}




