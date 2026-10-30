export function createSearchIndex(datasets) {
  const entries = [];
  for (const dataset of datasets) {
    for (const [type, key] of [['figure','figures'], ['battle','battles'], ['event','events']]) {
      for (const item of dataset[key] || []) {
        const title = item.name || item.title || '';
        const subtitle = type === 'figure' ? [item.birthDeathDisplay, ...(item.roles || [])].filter(Boolean).join(' · ') : [item.yearDisplay || item.year, item.locationAncient || item.locationNameAncient].filter(v => v != null).join(' · ');
        const text = [title, item.courtesyName, item.posthumousName, item.bio, item.summary, item.detail, item.locationAncient, item.locationModern, item.locationNameAncient, item.locationNameModern, ...(item.roles || []), ...(item.tags || [])].filter(Boolean).join(' ').toLowerCase();
        entries.push({ type, periodId: dataset.id, periodName: dataset.name, civ: dataset.civ || 'china', eraId: item.eraId, title, subtitle, text, item });
      }
    }
  }
  return entries;
}
export function searchIndex(index, query, activeId, limit = 24) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter(entry => entry.text.includes(q)).map(entry => ({...entry,
    score: (entry.title.toLowerCase() === q ? 100 : entry.title.toLowerCase().includes(q) ? 30 : 0) + (entry.periodId === activeId ? 3 : 0)
  })).sort((a,b) => b.score - a.score || a.title.localeCompare(b.title, 'zh-Hant')).slice(0, limit);
}
