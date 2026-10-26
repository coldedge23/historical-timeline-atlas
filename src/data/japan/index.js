// Japan Historical Atlas Module Entry Point
import { JAPAN_ERAS } from './japanEras.js';
import { JAPAN_FIGURES } from './japanFigures.js';
import { JAPAN_BATTLES } from './japanBattles.js';

export * from './japanEras.js';
export * from './japanFigures.js';
export * from './japanBattles.js';
export * from './japanMapGeoData.js';
export * from './japanWarlordPeriods.js';

// Mapping of Active Battles per Japan Historical Era
export const JAPAN_ERA_BATTLE_IDS = {
  jp_ancient_medieval: ["bat_jp_dannoura_1185", "bat_jp_koan_1281"],
  jp_sengoku: [
    "bat_jp_okehazama_1560",
    "bat_jp_kawanakajima_1561",
    "bat_jp_mikata_1573",
    "bat_jp_nagashino_1575"
  ],
  jp_azuchi_momoyama: [
    "bat_jp_yamazaki_1582",
    "bat_jp_shizugatake_1583",
    "bat_jp_sekigahara_1600"
  ],
  jp_edo: [
    "bat_jp_osaka_natsu_1615"
  ],
  jp_bakumatsu: [
    "bat_jp_toba_fushimi_1868",
    "bat_jp_goryokaku_1869"
  ],
  jp_meiji_modern: [
    "bat_jp_tabaruzaka_1877",
    "bat_jp_tsushima_1905"
  ]
};

// Flatten all events across the 6 eras
export const JAPAN_ALL_EVENTS = [];
JAPAN_ERAS.forEach((era) => {
  (era.keyEvents || []).forEach((ke) => {
    JAPAN_ALL_EVENTS.push({
      ...ke,
      eraId: era.id,
      eraName: era.name,
      period: "japanAtlas",
      periodName: "日本歷史星圖"
    });
  });
});
JAPAN_ALL_EVENTS.sort((a, b) => a.year - b.year);
