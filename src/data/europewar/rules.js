// 二戰歐洲戰場的資料規則（規劃 v4 第 4.1、4.5、7.2、9.5 節）。小型設定，不含歷史內容。

// 座標順序：本模組一律 [lng, lat]。
export const EUROPEWAR_COORDINATE_ORDER = 'lngLat';

// 地圖主圖範圍（經緯度）。所有座標，包括有 locationNote 的代表位置，都必須落在這個範圍內。
export const EUROPEWAR_MAP_BOUNDS = { minLng: -15, maxLng: 50, minLat: 28, maxLat: 71 };

export const EUROPEWAR_THEATERS = {
  western: '西歐',
  northern: '北歐',
  centraleast: '波蘭與中東歐',
  eastern: '德蘇戰線',
  mediterranean: '地中海與北非',
  balkans: '巴爾幹',
  atlantic: '大西洋',
};
export const EUROPEWAR_SCALES = { campaign: '戰役群', operation: '行動', battle: '會戰' };
export const EUROPEWAR_MODES = { land: '地面', air: '空中', naval: '海上', amphibious: '兩棲登陸', siege: '圍城', evacuation: '撤退' };

// 只要不是「待考」或空值，就必須被至少一個來源的 claims 涵蓋的欄位。
export const EUROPEWAR_CLAIM_FIELDS = {
  events: ['date', 'endDate'],
  battles: ['startDate', 'endDate', 'attacker.commanders', 'defender.commanders', 'attacker.forcesEstimate', 'defender.forcesEstimate',
    'attacker.casualtiesEstimate', 'defender.casualtiesEstimate'],
};
