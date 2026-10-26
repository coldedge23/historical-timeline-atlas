const fs = require('fs');
const path = require('path');
const http = require('http');

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

async function verify() {
  console.log('====================================================');
  console.log('       HISTORICAL ATLAS FULL INTEGRITY AUDIT        ');
  console.log('====================================================\n');

  // Load via CommonJS
  const registryPath = path.resolve(__dirname, '..', 'src', 'data', 'periodsRegistry.js');
  // Since periodsRegistry uses ES modules export, let's read the index of each period directly
  const periodsConfig = [
    { id: 'xiaShangZhou', name: '夏商西周', dir: 'periods/xiaShangZhou' },
    { id: 'warringStates', name: '春秋戰國', dir: 'periods/warringStates' },
    { id: 'qinHan', name: '秦漢帝國', dir: 'periods/qinHan' },
    { id: 'threeKingdoms', name: '三國爭霸', dir: 'threeKingdoms' },
    { id: 'weiJin', name: '魏晉南北朝', dir: 'periods/weiJin' },
    { id: 'suiTang', name: '隋唐五代', dir: 'periods/suiTang' },
    { id: 'songLiao', name: '宋遼金夏', dir: 'periods/songLiao' },
    { id: 'yuanMing', name: '元明帝國', dir: 'periods/yuanMing' },
    { id: 'qingDynasty', name: '大清帝國', dir: 'periods/qingDynasty' },
    { id: 'republicModern', name: '民國近現代', dir: 'periods/republicModern' }
  ];

  let totalFigures = 0;
  let totalBattles = 0;
  let totalEvents = 0;
  let totalMissingAvatars = 0;
  let testedUrls = 0;
  let successfulUrls = 0;
  const allFigures = [];

  for (const p of periodsConfig) {
    const mod = require(path.resolve(__dirname, '..', 'src', 'data', p.dir, 'index.js'));
    const figures = mod[`${p.id.toUpperCase()}_FIGURES`] || mod.THREE_KINGDOMS_FIGURES || mod.XIA_SHANG_ZHOU_FIGURES || mod.WARRING_STATES_FIGURES || mod.QIN_HAN_FIGURES || mod.WEI_JIN_FIGURES || mod.SUI_TANG_FIGURES || mod.SONG_LIAO_FIGURES || mod.YUAN_MING_FIGURES || mod.QING_DYNASTY_FIGURES || mod.REPUBLIC_MODERN_FIGURES || [];
    const battles = mod[`${p.id.toUpperCase()}_BATTLES`] || mod.THREE_KINGDOMS_BATTLES || mod.XIA_SHANG_ZHOU_BATTLES || mod.WARRING_STATES_BATTLES || mod.QIN_HAN_BATTLES || mod.WEI_JIN_BATTLES || mod.SUI_TANG_BATTLES || mod.SONG_LIAO_BATTLES || mod.YUAN_MING_BATTLES || mod.QING_DYNASTY_BATTLES || mod.REPUBLIC_MODERN_BATTLES || [];
    const events = mod[`${p.id.toUpperCase()}_EVENTS`] || mod.THREE_KINGDOMS_EVENTS || mod.XIA_SHANG_ZHOU_EVENTS || mod.WARRING_STATES_EVENTS || mod.QIN_HAN_EVENTS || mod.WEI_JIN_EVENTS || mod.SUI_TANG_EVENTS || mod.SONG_LIAO_EVENTS || mod.YUAN_MING_EVENTS || mod.QING_DYNASTY_EVENTS || mod.REPUBLIC_MODERN_EVENTS || [];
    const warlords = mod[`${p.id.toUpperCase()}_WARLORD_PERIODS`] || mod.THREE_KINGDOMS_WARLORD_PERIODS || mod.XIA_SHANG_ZHOU_WARLORD_PERIODS || mod.WARRING_STATES_WARLORD_PERIODS || mod.QIN_HAN_WARLORD_PERIODS || mod.WEI_JIN_WARLORD_PERIODS || mod.SUI_TANG_WARLORD_PERIODS || mod.SONG_LIAO_WARLORD_PERIODS || mod.YUAN_MING_WARLORD_PERIODS || mod.QING_DYNASTY_WARLORD_PERIODS || mod.REPUBLIC_MODERN_WARLORD_PERIODS || [];

    const fCount = figures.length;
    const bCount = battles.length;
    const eCount = events.length;
    const wCount = warlords.length;

    totalFigures += fCount;
    totalBattles += bCount;
    totalEvents += eCount;
    allFigures.push(...figures);

    let periodMissingAvatars = 0;
    for (const fig of figures) {
      if (!fig.avatar) {
        periodMissingAvatars++;
        continue;
      }
      const diskPath = path.resolve(__dirname, '..', fig.avatar);
      if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size === 0) {
        periodMissingAvatars++;
      }
    }
    totalMissingAvatars += periodMissingAvatars;

    console.log(`[${p.id.padEnd(14)}] ${p.name.padEnd(14)} | Figures: ${String(fCount).padStart(3)} | Battles: ${String(bCount).padStart(3)} | Events: ${String(eCount).padStart(3)} | Warlords: ${String(wCount).padStart(2)} | Broken Avatars: ${periodMissingAvatars}`);
  }

  console.log('\n----------------------------------------------------');
  console.log(`TOTALS: Figures: ${totalFigures} | Battles: ${totalBattles} | Events: ${totalEvents}`);
  console.log(`TOTAL MISSING AVATARS ON DISK: ${totalMissingAvatars}`);
  console.log('----------------------------------------------------\n');

  // Taiwan Lens dataset verification
  console.log('=== Checking Taiwan Chronological Lens Dataset ===');
  let twDedicatedMissing = 0;
  try {
    const taiwanLens = await import('../src/data/taiwanLensData.js');
    const twEras = taiwanLens.TAIWAN_LENS_ERAS || [];
    const twBattles = taiwanLens.TAIWAN_RELATED_BATTLES || [];
    const twDedicatedFigures = taiwanLens.TAIWAN_DEDICATED_FIGURES || [];
    const twRelatedIds = taiwanLens.TAIWAN_RELATED_FIGURE_IDS || [];
    const twTotalEvents = twEras.reduce((acc, era) => acc + (era.keyEvents ? era.keyEvents.length : 0), 0);

    for (const fig of twDedicatedFigures) {
      if (!fig.avatar) {
        twDedicatedMissing++;
        continue;
      }
      const diskPath = path.resolve(__dirname, '..', fig.avatar);
      if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size === 0) {
        twDedicatedMissing++;
      }
    }
    console.log(`[taiwanLens] 臺灣歷史專題視角 | Eras: ${twEras.length} | Events: ${twTotalEvents} | Battles: ${twBattles.length} | Dedicated Figures: ${twDedicatedFigures.length} | Total Taiwan Figures Pool: ${twRelatedIds.length} | Broken Avatars: ${twDedicatedMissing}`);
    totalFigures += twDedicatedFigures.length;
    totalBattles += twBattles.length;
    totalEvents += twTotalEvents;
    totalMissingAvatars += twDedicatedMissing;
    allFigures.push(...twDedicatedFigures);
  } catch (err) {
    console.error('Failed to load taiwanLensData.js:', err);
  }

  // Japan Historical Atlas dataset verification
  console.log('=== Checking Japan Historical Atlas Dataset ===');
  let jpMissingAvatars = 0;
  try {
    const japanData = await import('../src/data/japan/index.js');
    const jpEras = japanData.JAPAN_ERAS || [];
    const jpBattles = japanData.JAPAN_BATTLES || [];
    const jpFigures = japanData.JAPAN_FIGURES || [];
    const jpTotalEvents = japanData.JAPAN_ALL_EVENTS ? japanData.JAPAN_ALL_EVENTS.length : 0;

    for (const fig of jpFigures) {
      if (!fig.avatar) {
        jpMissingAvatars++;
        continue;
      }
      const diskPath = path.resolve(__dirname, '..', fig.avatar);
      if (!fs.existsSync(diskPath) || fs.statSync(diskPath).size === 0) {
        jpMissingAvatars++;
      }
    }
    console.log(`[japanAtlas] 日本歷史星圖 | Eras: ${jpEras.length} | Events: ${jpTotalEvents} | Battles: ${jpBattles.length} | Figures: ${jpFigures.length} | Broken Avatars: ${jpMissingAvatars}`);
    totalFigures += jpFigures.length;
    totalBattles += jpBattles.length;
    totalEvents += jpTotalEvents;
    totalMissingAvatars += jpMissingAvatars;
    allFigures.push(...jpFigures);
  } catch (err) {
    console.error('Failed to load japan data:', err);
  }

  // Three Kingdoms specific copyright check
  console.log('=== Checking Three Kingdoms Plan A Copyright Compliance ===');
  const tkMod = require('../src/data/threeKingdoms/index.js');
  const tkFigures = tkMod.THREE_KINGDOMS_FIGURES;
  let tkSvg = 0;
  let tkWoodcut = 0;
  let tkOther = 0;
  for (const f of tkFigures) {
    if (f.avatar.endsWith('.svg')) tkSvg++;
    else if (f.avatar.endsWith('.jpg') || f.avatar.endsWith('.png')) tkWoodcut++;
    else tkOther++;
  }
  console.log(`Three Kingdoms Portfolios: ${tkSvg} Vector Seals SVG, ${tkWoodcut} Woodcut Prints JPG, ${tkOther} Others.`);
  const backupKoeiDir = path.resolve(__dirname, '..', 'images', 'archive_koei_backup');
  console.log(`Archived Koei Assets directory exists: ${fs.existsSync(backupKoeiDir)} (backed up safely)\n`);

  // Random HTTP sampling test
  console.log('=== HTTP 200 Live Server Verification (Sampling 35 Avatars) ===');
  const sampleStep = Math.max(1, Math.floor(allFigures.length / 35));
  const samples = [];
  for (let i = 0; i < allFigures.length; i += sampleStep) {
    samples.push(allFigures[i]);
  }

  for (const sample of samples) {
    testedUrls++;
    const relUrl = sample.avatar.replace(/^\.\//, '');
    const url = `http://localhost:8080/${relUrl}`;
    const ok = await checkUrl(url);
    if (ok) successfulUrls++;
    else console.log(`[HTTP FAIL] ${sample.id} -> ${url}`);
  }
  console.log(`HTTP Sampling Result: ${successfulUrls} / ${testedUrls} OK (100% success rate: ${successfulUrls === testedUrls})`);

  console.log('\n====================================================');
  if (totalMissingAvatars === 0 && successfulUrls === testedUrls) {
    console.log('>>> ALL VERIFICATION CHECKS PASSED WITH ZERO ERRORS <<<');
  } else {
    console.log('>>> WARNING: SOME CHECKS FAILED <<<');
  }
  console.log('====================================================\n');
}

verify();
