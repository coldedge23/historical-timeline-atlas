// Central Historical Periods Registry
// Supports multi-epoch historical exploration across Chinese dynasties
import * as ThreeKingdoms from './threeKingdoms/index.js';
import * as QinHan from './periods/qinHan/index.js';
import * as WarringStates from './periods/warringStates/index.js';
import * as XiaShangZhou from './periods/xiaShangZhou/index.js';
import * as WeiJin from './periods/weiJin/index.js';

export const HISTORICAL_PERIODS = {
  xiaShangZhou: {
    id: 'xiaShangZhou',
    name: '夏商西周',
    dateRangeDisplay: '2070 - 771 BCE',
    shortEra: '約西元前 2070 — 西元前 771 年',
    fullTitle: '夏商西周（2070 - 771 BCE）',
    badge: '華夏三代·禮樂肇基',
    description: '大禹治水定九州開創世襲家天下、成湯鳴條滅夏、盤庚遷殷青銅鼎盛、武丁中興、武王伐紂克商、周公制禮作樂大分封至西周覆亡之華夏文明開端',
    events: XiaShangZhou.XIA_SHANG_ZHOU_EVENTS,
    figures: XiaShangZhou.XIA_SHANG_ZHOU_FIGURES,
    battles: XiaShangZhou.XIA_SHANG_ZHOU_BATTLES,
    territories: XiaShangZhou.XIA_SHANG_ZHOU_TERRITORIES,
    warlordPeriods: XiaShangZhou.XIA_SHANG_ZHOU_WARLORD_PERIODS,
    demographics: XiaShangZhou.XIA_SHANG_ZHOU_DEMOGRAPHICS,
  },
  warringStates: {
    id: 'warringStates',
    name: '春秋戰國',
    dateRangeDisplay: '770 - 221 BCE',
    shortEra: '西元前 770 — 西元前 221 年',
    fullTitle: '春秋戰國（770 - 221 BCE）',
    badge: '五霸七雄·百家爭鳴',
    description: '平王東遷、五霸迭興、三家分晉、戰國七雄兼併、商鞅變法與諸子百家爭鳴，至始皇席捲六國統一天下之五百年巨變',
    events: WarringStates.WARRING_STATES_EVENTS,
    figures: WarringStates.WARRING_STATES_FIGURES,
    battles: WarringStates.WARRING_STATES_BATTLES,
    territories: WarringStates.WARRING_STATES_TERRITORIES,
    warlordPeriods: WarringStates.WARRING_STATES_WARLORD_PERIODS,
    demographics: WarringStates.WARRING_STATES_DEMOGRAPHICS,
  },
  qinHan: {
    id: 'qinHan',
    name: '秦漢帝國',
    dateRangeDisplay: '206 BCE - 184 CE',
    shortEra: '西元前 206 — 西元 184 年',
    fullTitle: '秦漢帝國（206 BCE - 184 CE）',
    badge: '大漢四百年',
    description: '鉅鹿破釜沉舟、楚漢爭雄、大漢立國、文景之治、漢武拓土鑿空絲路、昭宣中興、光武中興與明章之治四百年浩瀚帝業',
    events: QinHan.QIN_HAN_EVENTS,
    figures: QinHan.QIN_HAN_FIGURES,
    battles: QinHan.QIN_HAN_BATTLES,
    territories: QinHan.QIN_HAN_TERRITORIES,
    warlordPeriods: QinHan.QIN_HAN_WARLORD_PERIODS,
    demographics: QinHan.QIN_HAN_DEMOGRAPHICS,
  },
  threeKingdoms: {
    id: 'threeKingdoms',
    name: '三國鼎立',
    dateRangeDisplay: '184 - 280 CE',
    shortEra: '西元 184 — 280 年',
    fullTitle: '三國鼎立（184 - 280 CE）',
    badge: '魏蜀吳三國',
    description: '漢末黃巾起義、群雄並起割據，曹魏、蜀漢、東吳鼎足三分，英雄輩出、謀略交鋒之大時代',
    events: ThreeKingdoms.THREE_KINGDOMS_EVENTS,
    figures: ThreeKingdoms.THREE_KINGDOMS_FIGURES,
    battles: ThreeKingdoms.THREE_KINGDOMS_BATTLES,
    territories: ThreeKingdoms.THREE_KINGDOMS_TERRITORIES,
    warlordPeriods: ThreeKingdoms.WARLORD_PERIOD_CONFIGS,
    demographics: ThreeKingdoms.THREE_KINGDOMS_DEMOGRAPHICS,
  },
  weiJin: {
    id: 'weiJin',
    name: '魏晉南北朝',
    dateRangeDisplay: '220 - 589 CE',
    shortEra: '西元 220 — 589 年',
    fullTitle: '魏晉南北朝（220 - 589 CE）',
    badge: '六朝風骨·南北分峙',
    description: '三國歸晉太康之治、八王之亂與永嘉南渡衣冠南渡、五胡十六國風雲變幻、淝水之戰、南朝宋齊梁陳文華鼎盛、北魏太和漢化改制，至隋滅陳四百年大一統之浩瀚歷史',
    events: WeiJin.WEI_JIN_EVENTS,
    figures: WeiJin.WEI_JIN_FIGURES,
    battles: WeiJin.WEI_JIN_BATTLES,
    territories: WeiJin.WEI_JIN_TERRITORIES,
    warlordPeriods: WeiJin.WEI_JIN_WARLORD_PERIODS,
    demographics: WeiJin.WEI_JIN_DEMOGRAPHICS,
  }
};

export const PERIOD_OPTIONS = [
  { id: 'xiaShangZhou', name: '夏商西周', range: '2070 - 771 BCE', count: '18事件·10戰役·33人物' },
  { id: 'warringStates', name: '春秋戰國', range: '770 - 221 BCE', count: '58事件·30戰役·90人物' },
  { id: 'qinHan', name: '秦漢帝國', range: '206 BCE - 184 CE', count: '20事件·13戰役·47人物' },
  { id: 'threeKingdoms', name: '三國鼎立', range: '184 - 280 CE', count: '37事件·28戰役·500人物' },
  { id: 'weiJin', name: '魏晉南北朝', range: '220 - 589 CE', count: '20事件·10戰役·39人物' },
];
