// Display rules for chronology reviews. Pure: no data imports, safe for the main entry (plan v2 section 3.7).
// The reviews themselves are applied at build time by src/data/chronologyReviews.js.
export const isContextReview = review => review?.status === 'outside' || !!review?.type;
export function formatHistoryYear(year) { return Number.isFinite(year) ? year < 0 ? `前${Math.abs(year)}年` : `${year}年` : '年代待考'; }
