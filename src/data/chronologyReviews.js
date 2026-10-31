import { classifyEventChronology } from '../utils/historicalDates.js';
import { CHRONOLOGY_LINK_DECISIONS } from './chronologyDecisions.js';
export { isContextReview, formatHistoryYear } from '../utils/chronologyLabels.js';
export function applyChronologyReviews(input) {
  const datasets=input.map(dataset=>({...dataset,figures:dataset.figures.map(figure=>({...figure,eventLinkReviews:{}})),events:dataset.events.map(event=>({...event,figureLinkReviews:{}}))}));
  const events=datasets.flatMap(dataset=>dataset.events),figures=datasets.flatMap(dataset=>dataset.figures);
  const select=(pool,id,datasetId)=>pool.find(record=>record.id===id&&record.datasetId===datasetId)||pool.find(record=>record.id===id);
  const review=(figure,event)=>{
    const chronology=classifyEventChronology(figure,event);
    const decision=CHRONOLOGY_LINK_DECISIONS[`${figure.datasetId}:${figure.id}:${event.id}`] || CHRONOLOGY_LINK_DECISIONS[`${event.datasetId}:${figure.id}:${event.id}`];
    return {...chronology,...(decision||{}),label:decision?.label || (chronology.status==='outside'?'年代不符，關聯待考':chronology.status==='overlap'?'跨年度部分重疊':chronology.status==='unknown'?'年代資料不足':'生卒範圍內'),
      reviewReason:decision?.reason || (chronology.status==='outside'?'事件與記載生卒區間不相容；保留關聯供核對，不當作親身參與。':chronology.status==='overlap'?'事件涵蓋多個年度，與人物生卒部分重疊，不能以單一年份判定。':null)};
  };
  for(const figure of figures) for(const id of figure.participatedEventIds||[]) {
    const target=figure.linkTargets?.events?.find(entry=>entry.id===id);
    const event=select(events,id,target?.datasetId||figure.datasetId);
    if(event) figure.eventLinkReviews[id]=review(figure,event);
  }
  for(const event of events) for(const id of event.figureIds||event.figuresInvolved||[]) {
    const target=event.linkTargets?.figures?.find(entry=>entry.id===id);
    const figure=select(figures,id,target?.datasetId||event.datasetId);
    if(figure) event.figureLinkReviews[id]=review(figure,event);
  }
  return datasets;
}
