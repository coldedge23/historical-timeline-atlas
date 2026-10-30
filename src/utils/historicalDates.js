// Historical calendar parsing only. These functions do not infer missing dates or validate historical truth.
const UNKNOWN = /^(?:不詳|未知|待考|未詳|生卒不詳|生年不詳|卒年不詳|\?|？|無|N\/?A|unknown|present|至今|迄今|在世|現在|今)$/i;
const NUMERAL = '[0-9零〇一二兩三四五六七八九十百千萬廿卅元]+';
function integer(value) {
  if (typeof value === 'number') return Number.isSafeInteger(value) && value !== 0 ? value : null;
  if (typeof value !== 'string' || !/^[+-]?\d+$/.test(value.trim())) return null;
  const number = Number(value); return Number.isSafeInteger(number) && number !== 0 ? number : null;
}
function chineseInteger(text) {
  if (/^\d+$/.test(text)) return Number(text);
  if (text === '元') return 1;
  text = text.replace(/廿/g,'二十').replace(/卅/g,'三十').replace(/兩/g,'二');
  const digits = {零:0,〇:0,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
  if ([...text].every(c=>c in digits)) return Number([...text].map(c=>digits[c]).join(''));
  let total=0,section=0,current=0;
  const units={十:10,百:100,千:1000,萬:10000};
  for(const char of text) {
    if(char in digits) current=digits[char];
    else if(char in units) { const unit=units[char]; if(unit===10000){total+=(section+current)*unit;section=0;}else section+=(current||1)*unit; current=0; }
    else return null;
  }
  return total+section+current;
}
function clean(text) {
  return String(text).trim().replace(/−/g,'-').replace(/B\.\s*C\.\s*E\.?/gi,'BCE').replace(/B\.\s*C\.?/gi,'BC')
    .replace(/A\.\s*D\.?/gi,'AD').replace(/C\.\s*E\.?/gi,'CE')
    .replace(/[（(]\s*(BCE|BC|CE|AD)\s*[）)]/gi,' $1 ')
    .replace(/[（(][^）)]*[）)]/g,'').trim();
}
function readYear(value, inheritedEra = null) {
  if (typeof value === 'number') return {year:integer(value),era:null,explicit:true,approximate:false,valid:integer(value)!==null};
  if (typeof value !== 'string') return {year:null,era:null,valid:false};
  let text=clean(value);
  const approximate=/^(?:約|大約|約於|circa\s*|ca\.\s*|c\.\s*)/i.test(text);
  text=text.replace(/^(?:大約|約於|約|circa\s*|ca\.\s*|c\.\s*)/i,'').trim();
  if(UNKNOWN.test(text)) return {year:null,era:null,approximate,valid:true,unknown:true};
  // BCE/BC are matched as complete tokens before CE/AD, never by a CE substring inside BCE.
  const match=text.match(new RegExp('^(?:(公元前|西元前|民國前|民國|公元|西元|前|BCE|BC|CE|AD)\\s*)?([+-]?'+NUMERAL+')\\s*(?:年)?\\s*(BCE|BC|CE|AD)?$','i'));
  if(!match) return {year:null,era:null,approximate,valid:false};
  const prefix=(match[1]||'').toUpperCase(),suffix=(match[3]||'').toUpperCase();
  const getEra=token=> /^(公元前|西元前|前|BCE|BC)$/.test(token)?'bce':/^(公元|西元|CE|AD)$/.test(token)?'ce':token==='民國'?'roc':token==='民國前'?'before-roc':null;
  const prefixEra=getEra(prefix),suffixEra=getEra(suffix);
  if(prefixEra && suffixEra && prefixEra!==suffixEra) return {year:null,era:null,approximate,valid:false};
  const era=prefixEra||suffixEra||inheritedEra;
  const sign=match[2].startsWith('-')?-1:1;
  const magnitude=chineseInteger(match[2].replace(/^[+-]/,''));
  if(!Number.isSafeInteger(magnitude)||magnitude<=0) return {year:null,era,approximate,valid:false};
  if((era==='roc'||era==='before-roc')&&sign<0) return {year:null,era,approximate,valid:false};
  const year=era==='bce'?-magnitude:era==='roc'?1911+magnitude:era==='before-roc'?1912-magnitude:sign*magnitude;
  if(!Number.isSafeInteger(year)||year===0) return {year:null,era,approximate,valid:false};
  return {year,era:prefixEra||suffixEra,approximate,valid:true,explicit:Boolean(prefixEra||suffixEra)};
}
export function parseHistoricalYear(value) { return readYear(value).year; }
function readPair(value) {
  if(Array.isArray(value) && value.length>=2) {
    const first=readYear(value[0]),second=readYear(value[1]);
    return [typeof value[0]==='number'?first:readYear(value[0],first.era||second.era),typeof value[1]==='number'?second:readYear(value[1],second.era||first.era)];
  }
  if(typeof value!=='string') return null;
  const text=clean(value);
  for(let i=1;i<text.length;i++) {
    const char=text[i];
    if(!'—–~～－-至到'.includes(char)) continue;
    const left=text.slice(0,i).trim(),right=text.slice(i+1).trim();
    if(!left||!right) continue;
    const first=readYear(left),second=readYear(right);
    if(!first.valid||!second.valid) continue;
    return [readYear(left,first.era||second.era),readYear(right,second.era||first.era)];
  }
  return null;
}
export function parseBirthDeathYears(figure = {}) {
  // Structured fields win, including explicitly signed numeric arrays.
  let birthYear=readYear(figure.birthYear).year,deathYear=readYear(figure.deathYear).year;
  const sources=[figure.birthDeath,figure.birthDeathDisplay,figure.lifeSpan];
  for(const source of sources) {
    const pair=readPair(source);
    if(!pair) continue;
    birthYear ??= pair[0].year; deathYear ??= pair[1].year;
  }
  return {birthYear:birthYear??null,deathYear:deathYear??null};
}
export function parseEventYearRange(event = {}) {
  const start=readYear(event.startYear),end=readYear(event.endYear);
  if(event.startYear!=null||event.endYear!=null) {
    if(start.year==null||end.year==null||start.year>end.year) return {startYear:null,endYear:null,reason:'explicit-range-incomplete-or-invalid'};
    return {startYear:start.year,endYear:end.year,approximate:Boolean(start.approximate||end.approximate),reason:'explicit-range'};
  }
  const yearPair=readPair(event.year);
  if(yearPair) return yearPair[0].year!=null&&yearPair[1].year!=null&&yearPair[0].year<=yearPair[1].year?
    {startYear:yearPair[0].year,endYear:yearPair[1].year,approximate:Boolean(yearPair[0].approximate||yearPair[1].approximate),reason:'year-range'}:
    {startYear:null,endYear:null,reason:'year-range-incomplete-or-invalid'};
  const point=readYear(event.year);
  // Only an entire parseable calendar range counts. Regnal years and parenthetical reign labels are not mined for digits.
  const displayPair=readPair(event.yearDisplay);
  if(displayPair && displayPair[0].year!=null && displayPair[1].year!=null && displayPair[0].year<=displayPair[1].year) {
    const [left,right]=displayPair;
    if(point.year!=null && (point.year<left.year||point.year>right.year)) return {startYear:null,endYear:null,reason:'year-display-conflict'};
    return {startYear:left.year,endYear:right.year,approximate:Boolean(left.approximate||right.approximate),reason:'calendar-display-range'};
  }
  if(point.year!=null) return {startYear:point.year,endYear:point.year,approximate:Boolean(point.approximate),reason:'year-point'};
  const display=readYear(event.yearDisplay);
  return display.year!=null?{startYear:display.year,endYear:display.year,approximate:Boolean(display.approximate),reason:'calendar-display-point'}:
    {startYear:null,endYear:null,reason:'unknown-event-date'};
}
export function classifyEventChronology(figure = {},event = {}) {
  const figureRange=parseBirthDeathYears(figure),eventRange=parseEventYearRange(event);
  const result={figureRange,eventRange,birthYear:figureRange.birthYear,deathYear:figureRange.deathYear,eventStartYear:eventRange.startYear,eventEndYear:eventRange.endYear};
  const {birthYear,deathYear}=figureRange,{startYear,endYear}=eventRange;
  if(birthYear==null||deathYear==null||birthYear>deathYear||startYear==null||endYear==null) return {...result,status:'unknown',reason:'incomplete-or-invalid-dates'};
  if(endYear<birthYear||startYear>deathYear) return {...result,status:'outside',reason:'nominal-ranges-disjoint'};
  if(startYear>=birthYear&&endYear<=deathYear) return {...result,status:'within',reason:'event-range-contained'};
  return {...result,status:'overlap',reason:'event-range-partially-overlaps-lifespan'};
}

