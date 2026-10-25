import { BattleEvent } from '../../types/history';

export const THREE_KINGDOMS_BATTLES: BattleEvent[] = [
  {
    id: 'battle_guandu_200',
    name: '官渡之戰',
    year: 200,
    eraName: '東漢 獻帝建安五年',
    locationAncient: '兗州 中牟縣官渡水',
    locationModern: '河南省鄭州市中牟縣東北',
    coordinates: [34.783, 114.02],
    summary: '東漢末年曹操與袁紹兩大北方軍閥之間的決戰。曹操在兵力劣勢下，採納降將許攸之計夜襲烏巢燒毀袁紹糧草，以弱勝強，摧毀袁紹主力，奠定了曹操一統北方的根本基礎。',
    attacker: {
      factionName: '袁紹軍 (冀、青、幽、並四州盟軍)',
      faction: 'warlord',
      commanders: [
        { name: '袁紹', title: '大將軍、冀州牧' },
        { name: '顏良', title: '河北名將（白馬戰死）' },
        { name: '文醜', title: '河北名將（延津戰死）' },
        { name: '淳于瓊', title: '督糧大將（烏巢戰死）' }
      ],
      forcesEstimate: '步兵 10 萬，騎兵 1 萬',
      casualtiesEstimate: '主力覆沒，被俘坑殺 7 萬餘人，袁紹率八百騎北渡黃河奔逃'
    },
    defender: {
      factionName: '曹操軍 (奉天子以令諸侯之中央軍)',
      faction: 'wei',
      commanders: [
        { name: '曹操', title: '司空、車騎將軍' },
        { name: '荀彧', title: '留守許都總策劃' },
        { name: '許攸', title: '降將獻破烏巢之計' },
        { name: '張遼', title: '先鋒中堅' }
      ],
      forcesEstimate: '約 2 萬 ~ 3 萬人（曹軍實際前線兵力）',
      casualtiesEstimate: '傷亡數千，軍糧一度幾近耗盡'
    },
    victor: 'defender',
    victorStatement: '曹操以奇謀大勝，袁紹元氣大傷一蹶不振',
    tactics: [
      '聲東擊西：解白馬之圍、誘斬文醜於延津',
      '堅壁固守：深溝高壘於官渡，發明發石車（霹靂車）擊毀袁軍高樓砲塔',
      '夜襲奇襲：親率精騎假扮袁軍，直搗烏巢糧倉火燒積聚'
    ],
    strategicOutcome: '彻底逆轉北方強弱格局。兩年後袁紹病死，曹操陸續攻取冀、青、幽、並四州，黃河流域重歸一統。',
    significance: '中國軍事史上以少勝多、以弱勝強、後勤糧道戰的千古經典範例。'
  },
  {
    id: 'battle_chibi_208',
    name: '赤壁之戰',
    year: 208,
    eraName: '東漢 獻帝建安十三年冬',
    locationAncient: '荊州 長江南岸赤壁 / 烏林',
    locationModern: '湖北省咸寧市赤壁市西北 / 洪湖市東北',
    coordinates: [29.878, 113.626],
    summary: '曹操基本統一北方後率大軍南征，孫權與劉備結成同盟，由周瑜指揮聯軍在長江赤壁一帶利用火攻大破曹軍水旱大軍。此戰粉碎了曹操迅速統一全國的企圖，為日後三國鼎立拉開了序幕。',
    attacker: {
      factionName: '曹操南征大軍 (中原精銳步騎 + 新收降劉表荊州水軍)',
      faction: 'wei',
      commanders: [
        { name: '曹操', title: '丞相' },
        { name: '曹仁', title: '征南將軍' },
        { name: '張遼', title: '中堅名將' },
        { name: '蔡瑁 / 張允', title: '原荊州水軍都督' }
      ],
      forcesEstimate: '號稱 80 萬，史家考證實約 20 萬 ~ 23 萬（含原荊州降兵約 7-8 萬）',
      casualtiesEstimate: '水軍戰船幾乎全遭焚燬，北軍疫病流行，傷亡溺斃過半，敗走華容道'
    },
    defender: {
      factionName: '孫劉聯軍 (江東水師 + 劉備殘部)',
      faction: 'wu',
      commanders: [
        { name: '周瑜', title: '東吳前線大都督' },
        { name: '程普', title: '副都督' },
        { name: '黃蓋', title: '丹陽都尉（詐降獻火攻策）' },
        { name: '劉備', title: '左將軍、豫州牧' },
        { name: '諸葛亮', title: '促成孫劉聯盟全權使節' }
      ],
      forcesEstimate: '孫權軍 3 萬精銳水師 + 劉備與劉琦合軍約 2 萬，合計約 5 萬人',
      casualtiesEstimate: '傷亡甚微，大獲全勝'
    },
    victor: 'defender',
    victorStatement: '孫劉聯軍大破曹軍，長江烈火奠定天下三分雛形',
    tactics: [
      '結盟抗敵：諸葛亮舌戰群儒促成吳蜀聯合戰線',
      '抓敵弱點：曹軍北方人不習水性、戰船鐵索相連（連環船）、軍中疾疫蔓延',
      '苦肉詐降：黃蓋致書曹操約定投降，瞞天過海',
      '乘風火攻：藉東南風起，滿載枯柴灌膏之蒙衝鬥艦直衝曹營點火'
    ],
    strategicOutcome: '曹操被迫退回北方休養生息，短時間內無力南下；劉備趁機奪取荊南四郡並西入益州；孫權鞏固長江中下游防線，奠立三國鼎立之局。',
    significance: '長江流域規模最大、影響最深遠的水戰，改變了整個中國中世紀的地緣政治結構。'
  },
  {
    id: 'battle_fancheng_219',
    name: '襄樊之戰（水淹七軍）',
    year: 219,
    eraName: '東漢 獻帝建安二十四年',
    locationAncient: '荊州 襄陽與樊城',
    locationModern: '湖北省襄陽市襄州區與樊城區',
    coordinates: [32.045, 112.144],
    summary: '關羽率荊州主力北攻曹魏重鎮襄陽與樊城。適逢連降暴雨漢水氾濫，關羽乘大水水淹曹魏于禁七軍，生擒于禁、斬龐德，威震華夏。然而孫權暗中與曹操聯盟，呂蒙白衣渡江偷襲江陵，導致關羽腹背受敵，最終兵敗麥城。',
    attacker: {
      factionName: '蜀漢荊州守軍',
      faction: 'shu',
      commanders: [
        { name: '關羽', title: '前將軍、襄陽太守、蕩寇將軍' },
        { name: '關平', title: '副將' }
      ],
      forcesEstimate: '約 3 萬 ~ 4 萬水陸主力',
      casualtiesEstimate: '前期大勝俘敵三萬；後期因東吳襲後全軍潰散，關羽父子被俘遇害'
    },
    defender: {
      factionName: '曹魏襄樊守軍與援軍（後得東吳暗援）',
      faction: 'wei',
      commanders: [
        { name: '曹仁', title: '征南將軍（死守樊城）' },
        { name: '于禁', title: '左將軍（全軍覆沒降關羽）' },
        { name: '龐德', title: '立義將軍（誓死不降被斬）' },
        { name: '徐晃', title: '解圍長驅直入名將' }
      ],
      forcesEstimate: '曹軍襄樊守軍約萬餘人，于禁援軍三萬，徐晃後續援軍數萬',
      casualtiesEstimate: '于禁七軍三萬餘人盡沒投降，樊城城牆幾近被洪水沖塌'
    },
    victor: 'draw',
    victorStatement: '前期蜀軍完勝威震華夏；後期東吳偷襲荊州，蜀漢痛失南郡全線潰敗',
    tactics: [
      '順應天時：利用八月秋霖漢水暴漲，以巨艦大舸圍困沉於水中的魏軍',
      '長驅直入：徐晃隱蔽前進，聲東擊西突破關羽營寨',
      '白衣渡江：東吳呂蒙商船偽裝奇襲江陵烽火台，徹底斷其歸路'
    ],
    strategicOutcome: '蜀漢徹底失去戰略樞紐荊州，諸葛亮《隆中對》兩路出兵北伐之藍圖化為泡影；孫劉聯盟破裂，直接引發後續的夷陵大戰。',
    significance: '三國格局由「聯吳抗曹」急劇演變為三方劇烈互搏的最關鍵轉折點。'
  },
  {
    id: 'battle_yiling_222',
    name: '夷陵之戰（猇亭之戰）',
    year: 222,
    eraName: '蜀漢 章武二年 / 曹魏 黃初三年',
    locationAncient: '荊州 夷陵、猇亭',
    locationModern: '湖北省宜昌市夷陵區、猇亭區',
    coordinates: [30.53, 111.45],
    summary: '劉備稱帝後為報關羽之仇並奪回荊州，親率蜀漢大軍東征東吳。東吳大都督陸遜深溝高壘，避其鋒芒數月。盛夏時分，蜀軍捨舟就陸、連營七百里於山林，陸遜抓住戰機實施火攻，蜀軍全線潰敗，劉備逃入白帝城病逝。',
    attacker: {
      factionName: '蜀漢東征大軍',
      faction: 'shu',
      commanders: [
        { name: '劉備', title: '蜀漢昭烈皇帝' },
        { name: '馮習', title: '大督（陣亡）' },
        { name: '張南', title: '前部督（陣亡）' },
        { name: '黃權', title: '鎮北將軍（降魏）' }
      ],
      forcesEstimate: '約 4 萬 ~ 5 萬蜀漢正規主力精銳（非演義所謂七十萬）',
      casualtiesEstimate: '蜀軍陣亡數萬，軍資器械損失殆盡，屍填長江而下'
    },
    defender: {
      factionName: '東吳防守反擊軍',
      faction: 'wu',
      commanders: [
        { name: '陸遜', title: '大都督、鎮西將軍' },
        { name: '朱然', title: '名將' },
        { name: '潘璋', title: '名將' },
        { name: '韓當', title: '東吳老將' }
      ],
      forcesEstimate: '約 5 萬東吳水陸防禦軍',
      casualtiesEstimate: '傷亡較少，繳獲無算'
    },
    victor: 'defender',
    victorStatement: '陸遜火燒連營七百里，蜀漢元氣大傷退守白帝城',
    tactics: [
      '後發制人：堅守不出長達半年，耗盡蜀軍銳氣與士氣',
      '避實擊虛：蜀軍結營林木深處避暑，陸遜命中每名士兵手持茅草順風縱火',
      '水陸並進：火起之時水師與陸軍同時合圍，將蜀漢各營分割包圍'
    ],
    strategicOutcome: '蜀漢精銳喪盡、人才凋零；劉備崩逝於白帝城託孤諸葛亮。諸葛亮重新遣使修好東吳，確定三國鼎立最終定局。',
    significance: '三大戰役（官渡、赤壁、夷陵）之最後一戰，定格了三國長達數十年的僵持國界。'
  },
  {
    id: 'battle_wuzhang_234',
    name: '五丈原之戰（諸葛亮最後北伐）',
    year: 234,
    eraName: '蜀漢 建興十二年 / 曹魏 青龍二年',
    locationAncient: '雍州 扶風郡郿縣五丈原',
    locationModern: '陝西省寶雞市岐山縣五丈原鎮',
    coordinates: [34.288, 107.69],
    summary: '諸葛亮率蜀軍十萬進行第五次也是最後一次北伐，出斜谷進駐五丈原，隔渭水與司馬懿魏軍對峙百餘日。諸葛亮在五丈原推行屯田做持久戰準備，並多次送巾幗女裝羞辱司馬懿求戰，司馬懿堅壁清野不戰。八月，諸葛亮積勞成疾逝於軍中，蜀軍依秘計安全整軍退回漢中。',
    attacker: {
      factionName: '蜀漢北伐大軍',
      faction: 'shu',
      commanders: [
        { name: '諸葛亮', title: '丞相、益州牧（病逝五丈原）' },
        { name: '魏延', title: '前軍師、征西大將軍' },
        { name: '姜維', title: '中監軍、征西將軍' },
        { name: '楊儀', title: '丞相長史' }
      ],
      forcesEstimate: '約 10 萬人（分兵屯田）',
      casualtiesEstimate: '諸葛亮逝世，撤軍時魏延內鬨被誅，全軍主力大致完整撤回'
    },
    defender: {
      factionName: '曹魏關中防守大軍',
      faction: 'wei',
      commanders: [
        { name: '司馬懿', title: '太尉、大都督' },
        { name: '郭淮', title: '雍州刺史' },
        { name: '辛毗', title: '衛尉（持節制止諸將出戰）' }
      ],
      forcesEstimate: '約 10 萬 ~ 12 萬人',
      casualtiesEstimate: '交鋒傷亡輕微，司馬懿驚嘆「亮真天下奇才也」'
    },
    victor: 'draw',
    victorStatement: '魏軍成功防守關中，諸葛亮鞠躬盡瘁星落秋風',
    tactics: [
      '長久屯田：蜀軍與當地百姓雜處耕作，解決糧草轉運長途之苦',
      '挑釁堅壁：送婦人巾幗服飾激怒魏將，司馬懿請旨天子千里降詔「堅壁不出」',
      '整肅撤退：造木雕諸葛亮像退敵，「死諸葛走生仲達」'
    ],
    strategicOutcome: '蜀漢失去了靈魂領袖，轉入守勢；曹魏關中得以長期安定，司馬懿威望在朝中空前暴漲。',
    significance: '象徵蜀漢北伐全盛期終結，英雄相繼謝幕的悲壯篇章。'
  }
];
