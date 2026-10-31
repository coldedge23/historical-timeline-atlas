// Page ids and small pure helpers shared by both data sources and the build. No data imports.
export const TAIWAN_PAGE = 'taiwanLens';
export const JAPAN_PAGE = 'japanAtlas';
export const pageIdFor = (civ, periodId) => civ === 'japan' ? JAPAN_PAGE : civ === 'taiwan' ? TAIWAN_PAGE : periodId;

// Era descriptions as data packs carry them: no keyEvents, firstEventId instead.
export const eraSummary = ({ keyEvents, ...era }) => ({ ...era, firstEventId: keyEvents?.[0]?.id ?? null });

// Taiwan/Japan battles as navigation and search see them: each carries the era it is listed under.
export const withEraIds = (battles, eraBattleIds) => battles.map(b => ({ ...b, eraId: Object.entries(eraBattleIds).find(([, ids]) => ids.includes(b.id))?.[0] }));
