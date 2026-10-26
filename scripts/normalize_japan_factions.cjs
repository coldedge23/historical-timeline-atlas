const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'japan', 'japanFigures.js');
let content = fs.readFileSync(filePath, 'utf8');

// Target era assignments
const targetFactions = {
  // Ancient
  fig_jp_shotoku: 'ancient',

  // Kamakura
  fig_jp_minamoto_yoritomo: 'kamakura',
  fig_jp_minamoto_yoshitsune: 'kamakura',
  fig_jp_hojo_tokimune: 'kamakura',

  // Muromachi
  fig_jp_ashikaga_yoshimitsu: 'muromachi',
  fig_jp_ashikaga_yoshiteru: 'muromachi',

  // Edo
  fig_jp_tokugawa_ieyasu: 'edo',
  fig_jp_honda_tadakatsu: 'edo',
  fig_jp_tokugawa_hidetada: 'edo',
  fig_jp_tokugawa_iemitsu: 'edo',
  fig_jp_tokugawa_yoshimune: 'edo',
  fig_jp_miyamoto_musashi: 'edo',
  fig_jp_arai_hakuseki: 'edo',
  fig_jp_chikamatsu_monzaemon: 'edo',
  fig_jp_sugita_gempaku: 'edo',

  // Bakumatsu
  fig_jp_sakamoto_ryoma: 'bakumatsu',
  fig_jp_saigo_takamori: 'bakumatsu',
  fig_jp_yoshida_shoin: 'bakumatsu',
  fig_jp_takasugi_shinsaku: 'bakumatsu',
  fig_jp_kido_takayoshi: 'bakumatsu',
  fig_jp_okubo_toshimichi: 'bakumatsu',
  fig_jp_katsu_kaishu: 'bakumatsu',
  fig_jp_tokugawa_yoshinobu: 'bakumatsu',
  fig_jp_kondo_isami: 'bakumatsu',
  fig_jp_okita_soji: 'bakumatsu',
  fig_jp_hijikata_toshizo: 'bakumatsu',

  // Meiji Modern
  fig_jp_ito_hirobumi: 'meiji_modern',
  fig_jp_fukuzawa_yukichi: 'meiji_modern',
  fig_jp_togo_heihachiro: 'meiji_modern',
  fig_jp_itagaki_taisuke: 'meiji_modern',
  fig_jp_okuma_shigenobu: 'meiji_modern',
  fig_jp_yamagata_aritomo: 'meiji_modern',
  fig_jp_shibusawa_eiichi: 'meiji_modern',

  // Azuchi-Momoyama
  fig_jp_toyotomi_hideyoshi: 'azuchi_momoyama',
  fig_jp_ishida_mitsunari: 'azuchi_momoyama',
  fig_jp_kuroda_kanbei: 'azuchi_momoyama',
  fig_jp_sanada_yukimura: 'azuchi_momoyama',
  fig_jp_tachibana_muneshige: 'azuchi_momoyama',
  fig_jp_naoe_kanetsugu: 'azuchi_momoyama',
  fig_jp_ii_naomasa: 'azuchi_momoyama',
  fig_jp_fukushima_masanori: 'azuchi_momoyama',
  fig_jp_mori_terumoto: 'azuchi_momoyama',
  fig_jp_ukita_hideie: 'azuchi_momoyama',
  fig_jp_otani_yoshitsugu: 'azuchi_momoyama',
  fig_jp_shima_sakon: 'azuchi_momoyama',
  fig_jp_uesugi_kagekatsu: 'azuchi_momoyama',
  fig_jp_yodo_dono: 'azuchi_momoyama',
  fig_jp_nene_kodaiin: 'azuchi_momoyama',
  fig_jp_hosokawa_gracia: 'azuchi_momoyama',
  fig_jp_sen_no_rikyu: 'azuchi_momoyama',
};

// Replace faction in each object
// Regex matching each figure object block
const objectRegex = /{\s*"id":\s*"([^"]+)"[\s\S]*?^  }/gm;

let updated = 0;
const newContent = content.replace(objectRegex, (block, id) => {
  const targetFaction = targetFactions[id] || 'sengoku';
  const newBlock = block.replace(/"faction":\s*"[^"]+"/, `"faction": "${targetFaction}"`);
  updated++;
  return newBlock;
});

console.log(`Updated ${updated} figures in japanFigures.js`);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully written back to japanFigures.js');
