// Share displayed relations and event lists with the card counters.
export function linkedEvents(figure, events = []) {
  const seen = new Set();
  return (figure.participatedEventIds || []).map(id => {
    const context = figure.linkTargets?.events?.find(target => target.id === id);
    return events.find(event => event.id === id && (!context || event.datasetId === context.datasetId)) || events.find(event => event.id === id);
  }).filter(event => { if (!event || seen.has(event.id)) return false; seen.add(event.id); return true; });
}
export function figureRelations(figure, allFigures = []) {
  const map = new Map();
  const add = (target, relation) => {
    if (!target || target.id === figure.id || map.has(target.id)) return;
    map.set(target.id,{targetFigure:target,relationType:relation.inferred ? 'recommended' : (relation.relationType || 'colleague'),
      label:`${relation.inferred ? '系統推薦（非史實關係）：' : ''}${relation.label || '歷史交集'}`});
  };
  for (const relation of figure.relations || []) add(allFigures.find(target => target.id === relation.figureId),relation);
  if (map.size < 6) for (const other of allFigures) {
    const reverse = (other.relations || []).find(relation => relation.figureId === figure.id);
    if (reverse) add(other,reverse);
    if (map.size >= 8) break;
  }
  return [...map.values()].slice(0,8);
}
export function pendingLinkCount(record) {
  return new Set((record.pendingLinks || []).map(link => `${link.kind}:${link.id}`)).size;
}
