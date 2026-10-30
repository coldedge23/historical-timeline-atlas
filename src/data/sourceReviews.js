// Narrow, claim-specific external reviews. A reviewed excerpt never certifies a full biography.
export const SOURCE_REVIEWS = {
  'threeKingdoms:zhang_fei': [{title:'《三國志》卷三十六・張飛傳',
    url:'https://zh.wikisource.org/zh-hant/三國志/卷36#張飛', externalReviewed:true, reviewedAt:'2026-10-30',
    claimScope:'僅核對章武元年段落及張飛在劉備伐吳前遭部下殺害的記載；不含出生年、其他傳記事件或人物關係。',
    note:'原典章武元年段落後記述遇害；此核對支持其死亡早於建興六年北伐，不能列為該次北伐的親身參與者。'}],
  'threeKingdoms:guo_jia': [{title:'《三國志》卷十四・郭嘉傳',
    url:'https://zh.wikisource.org/zh-hant/三國志/卷14#郭嘉', externalReviewed:true, reviewedAt:'2026-10-30',
    claimScope:'僅核對郭嘉自柳城回師後病逝，以及曹操征荊州還、巴丘遇疫後追悼郭嘉的記載；不是郭嘉親自參加赤壁之戰的證據。',
    note:'將赤壁相關連結標為身後追念背景；不核定其完整生平或所有引言版本。'}],
  'threeKingdoms:sima_yi': [{title:'《晉書》卷一・宣帝紀（嘉平三年段）',
    url:'https://zh.wikisource.org/zh-hant/晉書/卷001#嘉平', externalReviewed:true, reviewedAt:'2026-10-30',
    claimScope:'僅核對宣帝紀嘉平三年段秋八月記載司馬懿去世；不支持其親身參加後來的263年滅蜀與280年滅吳。',
    note:'對應專案記錄卒年251；只核對此死亡段落，不認證整段傳記及關係網。'}]
};
export function applySourceReviews(datasets) {
  return datasets.map(dataset=>({...dataset,...Object.fromEntries(['figures','events','battles'].map(kind=>[kind,(dataset[kind]||[]).map(record=>{
    const reviewed=SOURCE_REVIEWS[`${dataset.id}:${record.id}`];
    return reviewed?{...record,sources:[...(Array.isArray(record.sources)?record.sources:record.sources?[record.sources]:[]),...reviewed]}:record;
  })]))}));
}
