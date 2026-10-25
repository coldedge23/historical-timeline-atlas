export type HistoryFaction = 'wei' | 'shu' | 'wu' | 'han' | 'warlord' | 'taiwan' | 'other';

export type EventCategory = 'military' | 'political' | 'cultural' | 'diplomatic' | 'demographic';

export interface TimelineEvent {
  id: string;
  title: string;
  year: number; // 西元年，負數為西元前
  yearDisplay: string; // 例如: "西元 208 年"
  eraName: string; // 例如: "東漢 獻帝建安十三年"
  faction: HistoryFaction;
  category: EventCategory;
  summary: string;
  detail: string;
  locationNameAncient: string; // 當代地名，如 "赤壁"
  locationNameModern: string; // 現代地名，如 "湖北省咸寧市赤壁市"
  coordinates?: [number, number]; // [lat, lng]
  figureIds: string[]; // 關聯人物
  battleId?: string; // 關聯戰役詳情
  impact: string; // 歷史影響
  tags: string[];
}

export interface FigureRelation {
  figureId: string;
  relationType: 'ally' | 'rival' | 'monarch-subject' | 'family' | 'advisor' | 'friend';
  label: string;
}

export interface HistoricalPerson {
  id: string;
  name: string;
  courtesyName?: string; // 字
  artName?: string; // 號
  posthumousName?: string; // 諡號/廟號
  birthDeathDisplay: string; // 如 "155年 - 220年"
  birthYear?: number;
  deathYear?: number;
  nativePlaceAncient: string; // 古籍出生地，如 "沛國譙縣"
  nativePlaceModern: string; // 今地名，如 "安徽省亳州市"
  faction: HistoryFaction;
  roles: string[]; // 例如: ["魏武帝", "政治家", "軍事家", "文學家"]
  avatar: string; // 形象圖或色系頭像
  bio: string;
  keyAchievements: string[];
  famousQuotes?: string[];
  relations: FigureRelation[];
  participatedEventIds: string[];
}

export interface BattleCommander {
  id?: string;
  name: string;
  title: string;
}

export interface BattleSide {
  factionName: string;
  faction: HistoryFaction;
  commanders: BattleCommander[];
  forcesEstimate: string; // 兵力估計，如 "約 20 萬 ~ 23 萬"
  casualtiesEstimate: string; // 死傷，如 "傷亡過半，水軍幾近覆滅"
}

export interface BattleEvent {
  id: string;
  name: string; // 戰役名稱，如 "赤壁之戰"
  year: number;
  eraName: string;
  locationAncient: string;
  locationModern: string;
  coordinates: [number, number]; // [lat, lng]
  summary: string;
  attacker: BattleSide;
  defender: BattleSide;
  victor: 'attacker' | 'defender' | 'draw';
  victorStatement: string; // 如 "孫劉聯軍大勝，曹操北撤"
  tactics: string[]; // 核心戰術，如 ["詐降信", "連環計", "火攻", "乘風破浪"]
  strategicOutcome: string; // 戰略影響
  significance: string; // 歷史地位
}

export interface FactionTerritory {
  id: string;
  name: string;
  faction: HistoryFaction;
  color: string;
  borderColor: string;
  capitalAncient: string;
  capitalModern: string;
  capitalCoords: [number, number];
  polygon: [number, number][]; // 疆域邊界經緯度輪廓
  registeredHouseholds?: string; // 戶數
  registeredPopulation?: string; // 口數
  ethnicities: {
    name: string;
    region: string;
    note: string;
  }[];
}

export interface PeriodTerritorySnapshot {
  id: string;
  year: number;
  periodName: string; // 如 "三國鼎立初期 (220年 - 228年)"
  eraName: string;
  description: string;
  factions: FactionTerritory[];
}

export interface DemographicsData {
  year: number;
  eraName: string;
  estimatedTotalPopulation: string;
  commentary: string;
  dataPoints: {
    regimeName: string;
    households: string;
    population: string;
    armyCount?: string;
    officialsCount?: string;
    source: string; // 史料出處，如《三國志·後主傳》裴松之注
  }[];
  ethnicGroups: {
    name: string;
    distributionRegion: string;
    relationshipWithRegime: string;
  }[];
}
