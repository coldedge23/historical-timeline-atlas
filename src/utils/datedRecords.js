// Dated records (plan docs/20261108_二戰歐洲戰場模組規劃_v8.md, sections 4.2-4.3): YYYY-MM-DD or YYYY-MM dates,
// era assignment by start date, and display. Pure helpers, no history data; used by data modules, the validator
// and the UI.

const DATE_PATTERN = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

// { year, month, day|null } for a valid date string, else null. Rejects impossible dates such as 1941-02-30.
export function parseDate(text) {
  const match = typeof text === 'string' ? text.match(DATE_PATTERN) : null;
  if (!match) return null;
  const year = Number(match[1]), month = Number(match[2]), day = match[3] ? Number(match[3]) : null;
  if (month < 1 || month > 12) return null;
  if (day !== null) {
    const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (day < 1 || day > last) return null;
  }
  return { year, month, day };
}

const pad = (n) => String(n).padStart(2, '0');
const lastDay = (year, month) => new Date(Date.UTC(year, month, 0)).getUTCDate();
// The first and last full day a date covers: a month-only date covers the whole month.
export function dateSpan(text) {
  const d = parseDate(text);
  if (!d) return null;
  const head = `${d.year}-${pad(d.month)}`;
  return d.day !== null ? [`${head}-${pad(d.day)}`, `${head}-${pad(d.day)}`] : [`${head}-01`, `${head}-${pad(lastDay(d.year, d.month))}`];
}

// Start and end date fields of a record: battles use startDate/endDate, events use date/endDate.
export const startOf = (record) => record?.startDate ?? record?.date ?? null;
export const endOf = (record) => record?.endDate ?? null;

// The era whose [startDate, endDate] holds the whole span of the record's start date, else null.
// A month-only date that crosses an era boundary belongs to no era (it must be given to the day).
export function eraForDate(text, eras) {
  const span = dateSpan(text);
  if (!span) return null;
  return eras.find((era) => era.startDate <= span[0] && span[1] <= era.endDate) || null;
}

// Problems with a record's dates, as short Chinese messages; an empty list means the dates are valid.
export function dateProblems(record, { eras = null, requireStart = false } = {}) {
  const problems = [];
  const start = startOf(record), end = endOf(record);
  const startField = record?.startDate !== undefined ? 'startDate' : 'date';
  if (start == null) {
    if (requireStart) problems.push(`缺少${startField}`);
  } else if (!parseDate(start)) problems.push(`${startField} 格式或日期無效：${start}`);
  if (end != null && !parseDate(end)) problems.push(`endDate 格式或日期無效：${end}`);
  const startSpan = dateSpan(start), endSpan = dateSpan(end);
  if (startSpan && endSpan && endSpan[1] < startSpan[0]) problems.push(`開始 ${start} 晚於結束 ${end}`);
  if (startSpan && Number.isFinite(record?.year) && Number(start.slice(0, 4)) !== record.year) problems.push(`year ${record.year} 與開始日期 ${start} 的年份不同`);
  if (startSpan && eras) {
    const era = eraForDate(start, eras);
    if (!era) problems.push(`開始日期 ${start} 不完整落在任何時期內（只有年月時，整個月份必須在同一個時期）`);
    else if (record.eraId && record.eraId !== era.id) problems.push(`eraId ${record.eraId} 與日期判斷的時期 ${era.id} 不同`);
  }
  return problems;
}

// 1940 年 5 月 10 日 – 6 月 25 日; the year is written once when both ends share it.
export function formatDateRange(start, end) {
  const a = parseDate(start);
  if (!a) return '';
  const part = (d, withYear) => `${withYear ? `${d.year} 年 ` : ''}${d.month} 月${d.day !== null ? ` ${d.day} 日` : ''}`;
  const b = parseDate(end);
  if (!b || (b.year === a.year && b.month === a.month && b.day === a.day)) return part(a, true);
  return `${part(a, true)} – ${part(b, b.year !== a.year)}`;
}

// Sort key inside one year: dated records by date, undated ones after them (stable sort keeps their order).
export const dateSortKey = (record) => dateSpan(startOf(record))?.[0] ?? '9999-99-99';
