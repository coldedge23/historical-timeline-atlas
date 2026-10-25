const fs = require('fs');
const path = require('path');

const wpPath = path.resolve(__dirname, '..', 'src', 'data', 'periods', 'suiTang', 'warlordPeriods.js');
const content = fs.readFileSync(wpPath, 'utf8');
const jsonStr = content.replace(/^[\s\S]*?export const SUI_TANG_WARLORD_PERIODS = /, '').replace(/;[\s\n]*$/, '');
const presets = eval(jsonStr);

const BATTLE_MAP = {
  'ce_589': [
    { name: '× 隋滅陳之戰', pos: [528, 365], battleId: 'bat_sui_chen_589', year: 589 },
    { name: '× 白道之戰 (史萬歲破突厥)', pos: [430, 205], battleId: 'bat_baidao_599', year: 599 }
  ],
  'ce_618': [
    { name: '× 薩水之戰 (清川江慘敗)', pos: [590, 230], battleId: 'bat_salsu_612', year: 612 },
    { name: '× 雁門之圍 (始畢圍煬帝)', pos: [450, 240], battleId: 'bat_yanmen_615', year: 615 },
    { name: '× 大海寺之戰 (斬張須陀)', pos: [470, 305], battleId: 'bat_dahaisi_616', year: 616 },
    { name: '× 霍邑之戰 (李淵下關中)', pos: [442, 285], battleId: 'bat_huoyi_617', year: 617 },
    { name: '× 淺水原之戰 (大破薛仁杲)', pos: [415, 305], battleId: 'bat_babi_618', year: 618 }
  ],
  'ce_626': [
    { name: '× 虎牢關大決戰 (擒兩王)', pos: [468, 310], battleId: 'bat_hulao_621', year: 621 },
    { name: '× 洺水之戰 (水淹劉黑闥)', pos: [465, 270], battleId: 'bat_mingshui_622', year: 622 },
    { name: '× 玄武門之變 (太宗即位)', pos: [432, 318], battleId: 'bat_xuanwumen_626', year: 626 }
  ],
  'ce_649': [
    { name: '× 陰山夜襲 (滅東突厥)', pos: [430, 205], battleId: 'bat_yinshan_630', year: 630 },
    { name: '× 吐谷渾之戰 (絕漠奔襲)', pos: [360, 320], battleId: 'bat_tuyuhun_635', year: 635 },
    { name: '× 松州之戰 (擊破松贊干布)', pos: [400, 350], battleId: 'bat_songzhou_638', year: 638 },
    { name: '× 高昌之戰 (置安西都護府)', pos: [260, 250], battleId: 'bat_gaochang_640', year: 640 },
    { name: '× 駐蹕山之戰 (白袍薛仁貴)', pos: [560, 240], battleId: 'bat_zhubishan_645', year: 645 }
  ],
  'ce_690': [
    { name: '× 白江口海戰 (焚倭艦四百)', pos: [635, 290], battleId: 'bat_baekgang_663', year: 663 },
    { name: '× 平壤之戰 (李勣滅高句麗)', pos: [600, 260], battleId: 'bat_pyongyang_668', year: 668 },
    { name: '× 大非川之戰 (論欽陵破唐軍)', pos: [365, 330], battleId: 'bat_dafeichuan_670', year: 670 }
  ],
  'ce_741': [
    { name: '× 怛羅斯之戰 (造紙術西傳)', pos: [120, 200], battleId: 'bat_talas_751', year: 751 }
  ],
  'ce_757': [
    { name: '× 潼關之戰 (哥舒翰中伏失守)', pos: [445, 318], battleId: 'bat_tongguan_756', year: 756 },
    { name: '× 睢陽保衛戰 (張巡許遠殉節)', pos: [500, 315], battleId: 'bat_suiyang_757', year: 757 },
    { name: '× 香積寺之戰 (李嗣業陌刀復京)', pos: [430, 320], battleId: 'bat_xiangji_757', year: 757 },
    { name: '× 鄴城相州之戰 (狂風沙暴潰敗)', pos: [475, 295], battleId: 'bat_yezhou_759', year: 759 },
    { name: '× 橫水大捷 (僕固懷恩復洛陽)', pos: [460, 312], battleId: 'bat_luoyang_762', year: 762 }
  ],
  'ce_820': [
    { name: '× 雪夜入蔡州 (李愬生擒吳元濟)', pos: [485, 345], battleId: 'bat_caizhou_817', year: 817 }
  ],
  'ce_884': [
    { name: '× 長安收復之戰 (李克用破黃巢)', pos: [433, 319], battleId: 'bat_changan_883', year: 883 }
  ],
  'ce_954': [
    { name: '× 柏鄉之戰 (李存勗大破朱溫)', pos: [467, 270], battleId: 'bat_baixiang_911', year: 911 },
    { name: '× 胡柳坡大決戰 (血戰力挽狂瀾)', pos: [488, 300], battleId: 'bat_huliupo_918', year: 918 },
    { name: '× 高平之戰 (柴榮親征破契丹)', pos: [462, 280], battleId: 'bat_gaoping_954', year: 954 },
    { name: '× 壽春之戰 (柴榮克淮南十四州)', pos: [498, 342], battleId: 'bat_shouchun_956', year: 956 }
  ]
};

const updated = presets.map(p => ({
  ...p,
  battles: BATTLE_MAP[p.id] || []
}));

const outCode = '// 10 Detailed Warlord Geo-Political Slices for Sui, Tang and Five Dynasties (581 - 960 CE)\nexport const SUI_TANG_WARLORD_PERIODS = ' +
  JSON.stringify(updated, null, 2) + ';\n';

fs.writeFileSync(wpPath, outCode, 'utf8');
console.log('warlordPeriods.js updated with 30 rich battle positions!');
