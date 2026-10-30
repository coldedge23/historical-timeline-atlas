import React from 'react';
import { classifyHistorySources } from '../utils/historySources.js';

export function SourceDisclosure({record}) {
  const source = classifyHistorySources(record);
  return <details className="source-disclosure border-t border-white/10 mt-3 pt-2">
    <summary className="text-sm text-zinc-300 cursor-pointer py-2">來源與核對範圍：{source.reviewed ? '部分主張已核對' : source.label}</summary>
    <p className="text-sm text-zinc-400 leading-relaxed mb-2">{source.reason}。{source.disclaimer} 本區為文字內容來源，不代表人物圖像授權。</p>
    {source.entries.map((entry,index)=><div key={index} className="text-sm text-zinc-300 my-3 space-y-1">
      {entry.url ? <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-amber-200 underline underline-offset-4">{entry.referenceTitle || entry.text || '查看來源'}</a> : <p>{entry.text}</p>}
      <p>{entry.reviewed ? '已核對範圍：' : '參考線索（未核對）：'}{entry.claimScope || entry.text}</p>
    </div>)}
  </details>;
}
