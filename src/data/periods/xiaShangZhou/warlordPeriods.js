// Historical Empire and Feudal State Period Configurations for Xia, Shang, and Western Zhou (c. 2070 BCE - 771 BCE)
// Authentic Historical Geographic Layout based on Real Seamless Provincial / Feudal Mesh Map
export const XIA_SHANG_ZHOU_WARLORD_PERIODS = [
  {
    id: "bce_2070",
    yearNumber: -2070,
    yearDisplay: "約前 2070 年",
    shortLabel: "大禹開夏",
    headline: "大禹治水定九州，塗山會盟開創夏朝世襲基業",
    subTitle: "導淮疏九河 · 塗山大會諸侯 · 鑄九鼎定九州 · 二里頭青銅文明曙光",
    provinceWarlordMap: {
      henan: { warlord: "夏后氏 (陽城/斟鄩，禹啟都城)", color: "#fef08a" },
      shandong: { warlord: "東夷各部 (有窮氏/后羿前身/斟灌)", color: "#fed7aa" },
      shanxi: { warlord: "晉南陶寺古城部族 / 冀州之野", color: "#bbf7d0" },
      shaanxi: { warlord: "有扈氏部落同盟 (甘地/關中)", color: "#fbcfe8" },
      gansu: { warlord: "齊家文化西戎羌部", color: "#cbd5e1" },
      hebei: { warlord: "北方先商前身部族 / 幽燕部落", color: "#e2e8f0" },
      beijing: { warlord: "北方古代部落", color: "#e2e8f0" },
      tianjin: { warlord: "渤海古部落", color: "#e2e8f0" },
      liaoning: { warlord: "紅山文化後續部族", color: "#cbd5e1" },
      hubei: { warlord: "荊楚古三苗餘部 / 漢水部落", color: "#fed7aa" },
      hunan: { warlord: "三苗九嶷部落", color: "#fde047" },
      anhui: { warlord: "塗山氏部落 / 淮夷古國", color: "#fde047" },
      jiangsu: { warlord: "淮夷 / 良渚文化餘部", color: "#fde047" },
      zhejiang: { warlord: "防風氏 / 於越古族", color: "#bbf7d0" },
      jiangxi: { warlord: "百越古部落", color: "#fef08a" },
      sichuan: { warlord: "寶墩文化 / 三星堆青銅早期古蜀", color: "#fbcfe8" },
      chongqing: { warlord: "古巴人部族", color: "#fbcfe8" },
      guizhou: { warlord: "西南濮人古部落", color: "#e2e8f0" },
      yunnan: { warlord: "滇池早期部落", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "百越諸部", color: "#fed7aa" },
      guangxi: { warlord: "駱越古部落", color: "#fed7aa" },
      "inner-mongolia": { warlord: "北方草原早期遊牧族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎羌部", color: "#94a3b8" },
      qinghai: { warlord: "古西羌諸部", color: "#94a3b8" },
      xinjiang: { warlord: "西域早期綠洲城邦", color: "#e2e8f0" },
      jilin: { warlord: "肅慎先祖部落", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎先祖部落", color: "#cbd5e1" },
      shanghai: { warlord: "東南澤國", color: "#fde047" }
    },
    labels: [
      { name: "夏 后 氏 (斟鄩)", pos: [495, 328], color: "#991b1b", size: 14 },
      { name: "東 夷 (有窮氏)", pos: [545, 310], color: "#c2410c", size: 13 },
      { name: "有 扈 氏", pos: [450, 335], color: "#7c2d12", size: 12 },
      { name: "塗 山 盟 地", pos: [520, 375], color: "#b45309", size: 12 },
      { name: "三 苗 餘 部", pos: [480, 420], color: "#166534", size: 12 },
      { name: "三星堆古蜀", pos: [405, 410], color: "#1e3a8a", size: 12 }
    ],
    cities: [
      { name: "陽城 (登封)", pos: [488, 335], isCap: true },
      { name: "斟鄩 (二里頭)", pos: [495, 328], isCap: false },
      { name: "塗山 (蚌埠)", pos: [520, 375], isCap: false },
      { name: "甘地 (鄠邑)", pos: [465, 335], isCap: false }
    ],
    battles: [
      {
        name: "× 甘之戰 (夏啟滅有扈確立世襲)",
        pos: [465, 335],
        battleId: "battle_gan_2050",
        eventId: "evt_qigan_2050"
      }
    ],
    chronicleLeft: [
      "大禹十三年治水功成，平息黃河淮水特大水患，天下一統劃分九州",
      "塗山會盟大會天下萬國諸侯，執玉帛行封建，收天下九牧之金鑄造九鼎",
      "大禹傳位於益，諸侯去益而朝啟，夏啟伐有扈氏確立萬世「家天下」世襲"
    ],
    chronicleRight: [
      "河南偃師二里頭遺址印證夏代青銅禮器與宮殿基址，華夏文明邁入國家時代",
      "東夷有窮氏崛起於山東半島，太康失國后羿代夏，少康中興克復夏室社稷",
      "夏朝以農桑治國，創行夏曆，確立天干記日與宗族封邑制度"
    ]
  },
  {
    id: "bce_1600",
    yearNumber: -1600,
    yearDisplay: "約前 1600 年",
    shortLabel: "商湯滅夏",
    headline: "商湯革命鳴條大決戰，成湯建商立亳開八百年殷商基業",
    subTitle: "伊尹仲虺輔天子 · 鳴條破桀 · 桑林祈雨 · 鄭州商城與偃師商城",
    provinceWarlordMap: {
      henan: { warlord: "大商王朝 (商湯亳都 / 鄭州商城)", color: "#fde047" },
      shandong: { warlord: "商朝東方邦伯 / 萊夷", color: "#fef08a" },
      shanxi: { warlord: "商湯故地夏縣 / 鳴條戰場", color: "#bbf7d0" },
      shaanxi: { warlord: "先周公亶父前身西部族 / 羌戎", color: "#cbd5e1" },
      gansu: { warlord: "西戎諸方國", color: "#94a3b8" },
      hebei: { warlord: "先商發祥地 (漳水流域) / 孤竹", color: "#fed7aa" },
      beijing: { warlord: "燕山古代部落", color: "#e2e8f0" },
      tianjin: { warlord: "渤海古部落", color: "#e2e8f0" },
      liaoning: { warlord: "孤竹古國前身", color: "#cbd5e1" },
      hubei: { warlord: "盤龍城商城 (商朝南征據點)", color: "#fed7aa" },
      hunan: { warlord: "南方百越苗蠻", color: "#fde047" },
      anhui: { warlord: "夏桀流放地 (南巢) / 淮夷", color: "#fbcfe8" },
      jiangsu: { warlord: "淮夷方國", color: "#fbcfe8" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      jiangxi: { warlord: "大洋洲青銅古方國 (新干)", color: "#fef08a" },
      sichuan: { warlord: "三星堆青銅鼎盛古蜀國", color: "#fbcfe8" },
      chongqing: { warlord: "古巴方", color: "#fbcfe8" },
      guizhou: { warlord: "西南濮夷部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇池青銅古族", color: "#e2e8f0" },
      fujian: { warlord: "閩越部族", color: "#bbf7d0" },
      guangdong: { warlord: "南越古族", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "草原鬼方/土方部族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "鬼戎方國", color: "#94a3b8" },
      qinghai: { warlord: "西羌部落聯盟", color: "#94a3b8" },
      xinjiang: { warlord: "西域玉石之路部族", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "江海澤國", color: "#fde047" }
    },
    labels: [
      { name: "大 商 王 朝 (亳都)", pos: [510, 338], color: "#991b1b", size: 14 },
      { name: "鳴 條 之 野", pos: [475, 342], color: "#b45309", size: 13 },
      { name: "盤 龍 城 商 城", pos: [498, 410], color: "#c2410c", size: 12 },
      { name: "三星堆王國", pos: [405, 410], color: "#1e3a8a", size: 12 },
      { name: "南 巢 (桀放流處)", pos: [530, 385], color: "#7c2d12", size: 11 }
    ],
    cities: [
      { name: "商都亳 (商丘/鄭州)", pos: [515, 340], isCap: true },
      { name: "鳴條 (運城)", pos: [475, 342], isCap: false },
      { name: "盤龍城 (武漢)", pos: [498, 410], isCap: false },
      { name: "南巢 (巢湖)", pos: [530, 385], isCap: false }
    ],
    battles: [
      {
        name: "× 鳴條之戰 (成湯滅夏桀)",
        pos: [475, 342],
        battleId: "battle_mingtiao_1600",
        eventId: "evt_mingtiao_1600"
      }
    ],
    chronicleLeft: [
      "成湯任用賢相伊尹，行王道仁德，大軍誓師鳴條，決戰一舉摧毀夏朝主力",
      "夏桀敗逃江淮南巢，夏室滅亡，商湯於亳都登基天子，建立大商帝國",
      "商湯在位逢大旱七年，設壇桑林剪髮斷爪向天引咎祈雨，天降甘霖萬民大悅"
    ],
    chronicleRight: [
      "商朝以鄭州商城、偃師商城為早期都邑，青銅器鑄造技術出現飛躍性突破",
      "向南開闢湖北武漢盤龍城據點，將中原青銅文明深入拓展至長江流域",
      "伊尹訓導太甲於桐宮三年，首創天子有過臣下可依禮匡扶糾偏之憲政傳統"
    ]
  },
  {
    id: "bce_1300",
    yearNumber: -1300,
    yearDisplay: "約前 1300 年",
    shortLabel: "盤庚遷殷",
    headline: "商王盤庚力排眾議遷都安陽殷邑，定鼎黃河北岸開創殷墟繁盛青銅基業",
    subTitle: "九世之亂蕩平 · 北渡大河 · 營造殷墟 · 甲骨占卜盛行 · 殷商三百年定都",
    provinceWarlordMap: {
      henan: { warlord: "大商帝國新都 (安陽殷墟)", color: "#fde047" },
      shandong: { warlord: "商朝東方邦伯 (奄國/逢國)", color: "#fef08a" },
      shanxi: { warlord: "商朝王畿北衛 / 鬼方邊界", color: "#bbf7d0" },
      shaanxi: { warlord: "先周發祥 (古公亶父率族遷岐山周原) / 羌方", color: "#fed7aa" },
      gansu: { warlord: "羌戎部落同盟", color: "#94a3b8" },
      hebei: { warlord: "商朝北土諸侯 / 孤竹國", color: "#fef08a" },
      beijing: { warlord: "薊城古方國", color: "#e2e8f0" },
      tianjin: { warlord: "渤海古部落", color: "#e2e8f0" },
      liaoning: { warlord: "孤竹古國", color: "#cbd5e1" },
      hubei: { warlord: "商朝南土方國 / 楚人先祖鬻熊前身", color: "#fed7aa" },
      hunan: { warlord: "三苗苗蠻諸部", color: "#fde047" },
      anhui: { warlord: "淮夷方國", color: "#fbcfe8" },
      jiangsu: { warlord: "徐方 / 東夷方國", color: "#fbcfe8" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      jiangxi: { warlord: "新干大洋洲青銅古國", color: "#fef08a" },
      sichuan: { warlord: "三星堆鼎盛青銅王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴方部族", color: "#fbcfe8" },
      guizhou: { warlord: "西南濮夷部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇池青銅古族", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "百越諸部", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "草原鬼方 / 土方", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎羌族", color: "#94a3b8" },
      qinghai: { warlord: "西羌部落", color: "#94a3b8" },
      xinjiang: { warlord: "西域綠洲方國", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "江南澤國", color: "#fde047" }
    },
    labels: [
      { name: "殷 墟 新 都 (安陽)", pos: [508, 305], color: "#991b1b", size: 14 },
      { name: "舊 都 奄 (曲阜)", pos: [545, 322], color: "#78350f", size: 12 },
      { name: "周 原 岐 山 (周部族)", pos: [450, 330], color: "#166534", size: 13 },
      { name: "鬼 方 / 土 方", pos: [480, 240], color: "#334155", size: 13 },
      { name: "三星堆青銅古國", pos: [405, 410], color: "#1e3a8a", size: 12 }
    ],
    cities: [
      { name: "殷都 (安陽)", pos: [508, 305], isCap: true },
      { name: "奄邑 (曲阜)", pos: [545, 322], isCap: false },
      { name: "周原 (岐山)", pos: [450, 330], isCap: false }
    ],
    battles: [],
    chronicleLeft: [
      "商王仲丁以來九世亂，宗室王位紛爭，黃河屢次氾濫，商都五遷難以寧居",
      "盤庚十四年決策自奄遷都於殷（今河南安陽），百官貴族怨阻，盤庚作《盤庚》誥誡",
      "商王朝北渡黃河落定安陽小屯，自此至紂王滅國近三百年未再遷都，史稱殷商"
    ],
    chronicleRight: [
      "盤庚遵成湯之德政，安撫黎民，宗族和睦，諸侯率職朝貢，殷商社稷由亂轉治",
      "西方渭水流域古公亶父率姬周部族避戎狄自豳遷岐山周原，建城郭營宗廟，修農桑",
      "四川廣漢三星堆青銅文明正值全盛，黃金面具與青銅神樹交相輝映，西南文明大放異彩"
    ]
  },
  {
    id: "bce_1200",
    yearNumber: -1200,
    yearDisplay: "約前 1200 年",
    shortLabel: "武丁中興",
    headline: "盤庚遷殷安陽定鼎，高宗武丁得傅說、王后婦好四方征伐威震華夏",
    subTitle: "殷墟甲骨青銅巔峰 · 司母戊大方鼎 · 婦好北征鬼方破巴方 · 武丁盛世",
    provinceWarlordMap: {
      henan: { warlord: "大商帝國核心殷都 (安陽殷墟)", color: "#fde047" },
      shandong: { warlord: "商朝東方屬國 / 萊夷 / 逢國", color: "#fef08a" },
      shanxi: { warlord: "商朝王畿北衛 / 鬼方邊界", color: "#bbf7d0" },
      shaanxi: { warlord: "先周岐山部族 (公亶父/季歷) / 羌方", color: "#fed7aa" },
      gansu: { warlord: "西羌部落聯盟 (羌方)", color: "#94a3b8" },
      hebei: { warlord: "商朝北土方國 / 孤竹國", color: "#fef08a" },
      beijing: { warlord: "薊城古方國", color: "#e2e8f0" },
      tianjin: { warlord: "渤海古部落", color: "#e2e8f0" },
      liaoning: { warlord: "孤竹國", color: "#cbd5e1" },
      hubei: { warlord: "巴方邊界 / 虎方古國", color: "#fbcfe8" },
      hunan: { warlord: "炭河里青銅古方國 (寧鄉)", color: "#fde047" },
      anhui: { warlord: "淮夷各部族", color: "#fde047" },
      jiangsu: { warlord: "江淮夷方", color: "#fde047" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      jiangxi: { warlord: "新干大洋洲商文化古城", color: "#fef08a" },
      sichuan: { warlord: "三星堆青銅大祭祀巔峰王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴方部落聯盟 (為婦好所破)", color: "#fbcfe8" },
      guizhou: { warlord: "夜郎前身古濮部", color: "#e2e8f0" },
      yunnan: { warlord: "滇中青銅部落", color: "#e2e8f0" },
      fujian: { warlord: "閩越部族", color: "#bbf7d0" },
      guangdong: { warlord: "百越部族", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "鬼方 / 土方兇悍遊牧部族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "鬼戎部族", color: "#94a3b8" },
      qinghai: { warlord: "西羌部族", color: "#94a3b8" },
      xinjiang: { warlord: "西域和田玉石貿易綠洲", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "江海澤國", color: "#fde047" }
    },
    labels: [
      { name: "大 商 帝 國 (殷墟)", pos: [508, 305], color: "#991b1b", size: 15 },
      { name: "鬼 方 / 土 方", pos: [465, 255], color: "#334155", size: 13 },
      { name: "先 周 部 落 (岐山)", pos: [435, 328], color: "#b45309", size: 12 },
      { name: "羌 方 (西羌)", pos: [390, 310], color: "#7c2d12", size: 12 },
      { name: "三星堆青銅神國", pos: [405, 410], color: "#1e3a8a", size: 13 },
      { name: "巴 方 (漢水)", pos: [480, 385], color: "#c2410c", size: 12 }
    ],
    cities: [
      { name: "殷墟 (安陽)", pos: [508, 305], isCap: true },
      { name: "周原 (岐山)", pos: [435, 328], isCap: false },
      { name: "朝歌 (淇縣)", pos: [515, 312], isCap: false },
      { name: "三星堆 (廣漢)", pos: [405, 410], isCap: false }
    ],
    battles: [
      {
        name: "× 婦好征巴方之役",
        pos: [480, 385],
        battleId: "battle_fuhao_bafang_1250",
        eventId: "evt_wuding_fuhao_1250"
      }
    ],
    chronicleLeft: [
      "高宗武丁任用版築奴隸聖相傅說，整肅王綱，商朝國力自盤庚遷殷後臻於極頂",
      "王后婦好親統萬三千大軍北討鬼方、土方，設伏包圍巴方，開疆數千里",
      "司母戊鼎、婦好鴞尊等傳世重器問世，殷墟甲骨卜辭記載商王國政完備完勝"
    ],
    chronicleRight: [
      "西方渭水流域公亶父率周部族遷周原岐山，開闢農桑，西周基業悄然萌芽",
      "四川廣漢三星堆青銅神樹、黃金面具與青銅大立人進入最燦爛輝煌之巔峰期",
      "祖甲改制推動周祭體系，確立以嫡長子與宗廟昭穆順序為基礎的祭祀禮制"
    ]
  },
  {
    id: "bce_1046",
    yearNumber: -1046,
    yearDisplay: "前 1046 年",
    shortLabel: "武王克商",
    headline: "周武王牧野之戰克商，殷紂鹿台自焚，西周定鼎天下",
    subTitle: "孟津觀兵八百諸侯 · 牧野之戰血流漂杵 · 宗周鎬京立國 · 封姜尚於齊",
    provinceWarlordMap: {
      shaanxi: { warlord: "西周王朝發祥核心 (鎬京/周原)", color: "#fef08a" },
      henan: { warlord: "殷商殘餘朝歌 / 周軍控制中原", color: "#fed7aa" },
      shandong: { warlord: "太公望姜尚始封 (齊國營丘) / 東夷", color: "#bbf7d0" },
      shanxi: { warlord: "唐國 (後唐叔虞封晉) / 北狄", color: "#bbf7d0" },
      hebei: { warlord: "召公奭始封 (北燕薊城)", color: "#bbf7d0" },
      beijing: { warlord: "召公始封北燕 (薊城)", color: "#bbf7d0" },
      tianjin: { warlord: "燕國南境", color: "#bbf7d0" },
      hubei: { warlord: "鬻熊楚人部落 (荊楚) / 庸國", color: "#fed7aa" },
      anhui: { warlord: "淮夷部族 / 紂王南征殘軍", color: "#fbcfe8" },
      jiangsu: { warlord: "東夷徐國 / 淮夷各方", color: "#fbcfe8" },
      sichuan: { warlord: "蜀國盟軍 (參加密津伐紂)", color: "#fbcfe8" },
      chongqing: { warlord: "巴國盟軍 (前歌後舞力戰)", color: "#fbcfe8" },
      gansu: { warlord: "羌髳盟軍 / 犬戎部族", color: "#cbd5e1" },
      liaoning: { warlord: "箕子出走朝鮮古方國 / 孤竹", color: "#cbd5e1" },
      zhejiang: { warlord: "於越部落", color: "#bbf7d0" },
      jiangxi: { warlord: "百越干越族", color: "#fef08a" },
      hunan: { warlord: "楚南苗蠻諸部", color: "#fde047" },
      guizhou: { warlord: "濮越部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮古部", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "南越古族", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "獫狁 / 鬼方部落", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎部族", color: "#94a3b8" },
      qinghai: { warlord: "西羌諸部", color: "#94a3b8" },
      xinjiang: { warlord: "西域城邦", color: "#e2e8f0" },
      jilin: { warlord: "肅慎古國", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎古國", color: "#cbd5e1" },
      shanghai: { warlord: "江海澤國", color: "#fde047" }
    },
    labels: [
      { name: "西 周 王 朝 (鎬京)", pos: [465, 335], color: "#991b1b", size: 15 },
      { name: "殷 商 朝 歌 (鹿台)", pos: [515, 312], color: "#020617", size: 14 },
      { name: "牧 野 決 戰 處", pos: [510, 318], color: "#b91c1c", size: 13 },
      { name: "齊 (姜太公始封)", pos: [555, 305], color: "#166534", size: 13 },
      { name: "燕 (召公奭始封)", pos: [540, 245], color: "#1e3a8a", size: 12 },
      { name: "巴 蜀 聯 軍 故 土", pos: [405, 410], color: "#7c2d12", size: 12 }
    ],
    cities: [
      { name: "宗周鎬京 (西安)", pos: [465, 335], isCap: true },
      { name: "殷都朝歌 (淇縣)", pos: [515, 312], isCap: false },
      { name: "牧野 (新鄉)", pos: [510, 318], isCap: false },
      { name: "孟津渡口", pos: [492, 328], isCap: false },
      { name: "齊國營丘 (臨淄)", pos: [555, 305], isCap: false }
    ],
    battles: [
      {
        name: "× 牧野之戰 (武王克商紂自焚)",
        pos: [510, 318],
        battleId: "battle_muye_1046",
        eventId: "evt_muye_1046"
      }
    ],
    chronicleLeft: [
      "周武王率兵車三百乘、甲士四萬五千，聯合庸、蜀、羌、髳等八方諸侯誓師孟津",
      "甲子日拂曉牧野大會戰，太公望姜尚持白旄先登，商前鋒倒戈，商軍十七萬潰滅",
      "紂王鹿台自焚，武王入朝歌行天子之禮，分封微子啟存商祀，定都鎬京創立西周"
    ],
    chronicleRight: [
      "周武王拜姜子牙為師尚父，首批分封姜尚於齊、周公於魯、召公於燕",
      "巴蜀大軍助周伐紂有大功，『巴師勇銳，前歌後舞』，西南正式納入華夏同盟",
      "箕子不臣周朝率殷商遺民遠走朝鮮半島建立箕子朝鮮，傳播中原農耕青銅文明"
    ]
  },
  {
    id: "bce_1040",
    yearNumber: -1040,
    yearDisplay: "前 1040 年",
    shortLabel: "周公東征",
    headline: "周公旦踐奄平三監之亂，營建東都成周洛邑，大分封天下歸心",
    subTitle: "三年東征滅武庚 · 洛邑天下之中 · 封七十一諸侯 · 郁郁乎文哉周禮創始",
    provinceWarlordMap: {
      shaanxi: { warlord: "宗周鎬京天子王畿", color: "#fef08a" },
      henan: { warlord: "成周洛邑 (周公東都) / 衛國 (康叔)", color: "#fde047" },
      shandong: { warlord: "魯國 (伯禽) / 齊國 (姜尚)", color: "#bbf7d0" },
      shanxi: { warlord: "唐國 (唐叔虞封地) / 北戎", color: "#bbf7d0" },
      hebei: { warlord: "燕國 (召公後代治理)", color: "#bbf7d0" },
      beijing: { warlord: "燕國 (薊城)", color: "#bbf7d0" },
      tianjin: { warlord: "燕國南境", color: "#bbf7d0" },
      hubei: { warlord: "楚國 (成王封熊繹於丹陽)", color: "#fed7aa" },
      anhui: { warlord: "宋國 (微子啟殷商遺民)", color: "#fed7aa" },
      jiangsu: { warlord: "吳國 (太伯仲雍句吳古邑) / 淮夷", color: "#fbcfe8" },
      zhejiang: { warlord: "於越部落", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀國 (杜宇十二世)", color: "#fbcfe8" },
      chongqing: { warlord: "巴國", color: "#fbcfe8" },
      gansu: { warlord: "秦先祖非子前身犬丘部 / 西戎", color: "#cbd5e1" },
      liaoning: { warlord: "箕子朝鮮 / 孤竹", color: "#cbd5e1" },
      jiangxi: { warlord: "干越百越部", color: "#fef08a" },
      hunan: { warlord: "楚蠻部落", color: "#fde047" },
      guizhou: { warlord: "濮越部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮古部", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "南越百越", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "獫狁 / 狄族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "義渠戎前身", color: "#94a3b8" },
      qinghai: { warlord: "西羌部落", color: "#94a3b8" },
      xinjiang: { warlord: "西域城郭古邦", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳東南", color: "#fbcfe8" }
    },
    labels: [
      { name: "宗周鎬京 (西都)", pos: [465, 335], color: "#991b1b", size: 14 },
      { name: "成周洛邑 (東都)", pos: [488, 332], color: "#991b1b", size: 14 },
      { name: "魯 國 (伯禽曲阜)", pos: [540, 325], color: "#166534", size: 13 },
      { name: "齊 國 (姜太公臨淄)", pos: [555, 305], color: "#166534", size: 13 },
      { name: "衛 國 (康叔朝歌)", pos: [515, 312], color: "#166534", size: 12 },
      { name: "宋 國 (微子啟商丘)", pos: [528, 342], color: "#78350f", size: 12 },
      { name: "楚 國 (熊繹丹陽)", pos: [485, 395], color: "#c2410c", size: 12 }
    ],
    cities: [
      { name: "成周洛邑 (洛陽)", pos: [488, 332], isCap: true },
      { name: "宗周鎬京 (西安)", pos: [465, 335], isCap: true },
      { name: "曲阜 (魯國)", pos: [540, 325], isCap: false },
      { name: "營丘/臨淄 (齊國)", pos: [555, 305], isCap: false },
      { name: "商丘 (宋國)", pos: [528, 342], isCap: false },
      { name: "丹陽 (楚國)", pos: [485, 395], isCap: false }
    ],
    battles: [
      {
        name: "× 周公東征滅武庚三監",
        pos: [520, 320],
        battleId: "battle_sanjian_1042",
        eventId: "evt_zhougong_dongzheng_1042"
      }
    ],
    chronicleLeft: [
      "武王崩成王幼，周公攝政，三監勾結武庚起兵叛亂，周公親率六師東征三年平定叛亂",
      "誅武庚殺管叔流蔡叔，收復奄國平服九夷，徹底摧毀商朝遺民之復辟野心",
      "營造成周洛邑建王城遷九鼎，駐殷八師監撫東方，開創宗周與成周雙都體系"
    ],
    chronicleRight: [
      "周公推行宗法分封制，大封七十一國，姬姓獨占五十有三，建構綿密藩屏網絡",
      "創立吉凶賓軍嘉五禮與雅頌之樂，以周禮規範君臣父子嫡庶尊卑，德化天下",
      "周成王剪桐封弟於唐（晉），封熊繹於楚辟在荊山，華夏封建天下格局正式確立"
    ]
  },
  {
    id: "bce_1000",
    yearNumber: -1000,
    yearDisplay: "前 1000 年",
    shortLabel: "成康之治",
    headline: "周公歸政成康盛世，天下大治刑錯四十年不用",
    subTitle: "天下晏然 · 井田宗法達於極頂 · 諸侯守藩 · 禮樂文明黃金時代",
    provinceWarlordMap: {
      shaanxi: { warlord: "宗周天子直轄王畿", color: "#fef08a" },
      henan: { warlord: "成周天子直轄王畿 / 衛國 / 宋國", color: "#fde047" },
      shandong: { warlord: "齊國 / 魯國 (禮儀之邦全盛)", color: "#bbf7d0" },
      shanxi: { warlord: "晉國 (唐叔虞子燮父改國號為晉)", color: "#bbf7d0" },
      hebei: { warlord: "燕國 (召公後裔鎮撫北陲)", color: "#bbf7d0" },
      beijing: { warlord: "燕國薊城", color: "#bbf7d0" },
      tianjin: { warlord: "燕國領地", color: "#bbf7d0" },
      hubei: { warlord: "楚國 (奉周天子命辟在荊山)", color: "#fed7aa" },
      anhui: { warlord: "宋國 / 淮夷諸侯", color: "#fed7aa" },
      jiangsu: { warlord: "句吳古國 (太伯後代)", color: "#fbcfe8" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀杜宇王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴子國", color: "#fbcfe8" },
      gansu: { warlord: "秦人先祖為周牧馬 / 西戎", color: "#cbd5e1" },
      liaoning: { warlord: "箕子朝鮮王朝 / 孤竹", color: "#cbd5e1" },
      jiangxi: { warlord: "百越古族", color: "#fef08a" },
      hunan: { warlord: "三苗後裔部族", color: "#fde047" },
      guizhou: { warlord: "濮人部落", color: "#e2e8f0" },
      yunnan: { warlord: "滇池青銅古族", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "南越諸部", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "草原獫狁 / 狄族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎羌族", color: "#94a3b8" },
      qinghai: { warlord: "西羌部落", color: "#94a3b8" },
      xinjiang: { warlord: "西域綠洲方國", color: "#e2e8f0" },
      jilin: { warlord: "肅慎入貢楛矢石砮", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳境", color: "#fbcfe8" }
    },
    labels: [
      { name: "宗 周 王 畿 (鎬京)", pos: [465, 335], color: "#991b1b", size: 14 },
      { name: "成 周 洛 邑 (明堂)", pos: [488, 332], color: "#991b1b", size: 14 },
      { name: "魯 國 (周禮所在)", pos: [540, 325], color: "#166534", size: 13 },
      { name: "齊 國 (太公封土)", pos: [555, 305], color: "#166534", size: 13 },
      { name: "晉 國 (唐叔虞晉水)", pos: [490, 275], color: "#166534", size: 13 },
      { name: "燕 國 (召公北藩)", pos: [540, 245], color: "#1e3a8a", size: 13 }
    ],
    cities: [
      { name: "宗周鎬京", pos: [465, 335], isCap: true },
      { name: "成周洛邑", pos: [488, 332], isCap: true },
      { name: "曲阜 (魯)", pos: [540, 325], isCap: false },
      { name: "臨淄 (齊)", pos: [555, 305], isCap: false },
      { name: "晉陽 (晉)", pos: [490, 275], isCap: false },
      { name: "薊城 (燕)", pos: [540, 245], isCap: false }
    ],
    battles: [],
    chronicleLeft: [
      "成王康王父子相繼在位四十餘年，海內平定，囹圄空虛，刑錯四十餘年不用",
      "周公制禮作樂之法大行於天下，諸侯按歲朝聘天子，四海荒服各以其職入貢",
      "周康王會諸侯於豐宮作《康王之誥》，君臣協和，為先秦儒家尊奉之聖治巔峰"
    ],
    chronicleRight: [
      "井田制九夫為井廣推中原，『雨我公田，遂及我私』，農業生產與人口蓬勃發展",
      "晉水之濱唐叔虞子燮父因晉水改唐為晉，奠定後世春秋霸業三晉之基",
      "肅慎氏遠方入貢楛矢石砮長尺有咫，成王賜陳胡公以彰顯王化遠播東陲"
    ]
  },
  {
    id: "bce_977",
    yearNumber: -977,
    yearDisplay: "前 977 年",
    shortLabel: "昭王南征",
    headline: "周昭王南征不復死於漢水，宗周六師覆滅西周自此轉衰",
    subTitle: "好大喜功喪六師 · 漢水沉舟 · 楚國自帝遠漸不貢 · 南方邊陲失控",
    provinceWarlordMap: {
      shaanxi: { warlord: "宗周鎬京 (六師盡喪實力大挫)", color: "#fef08a" },
      henan: { warlord: "成周洛邑 / 八師守備中原", color: "#fde047" },
      shandong: { warlord: "齊國 / 魯國", color: "#bbf7d0" },
      shanxi: { warlord: "晉國 / 狄戎漸侵", color: "#bbf7d0" },
      hebei: { warlord: "燕國防禦北戎", color: "#bbf7d0" },
      beijing: { warlord: "燕國薊城", color: "#bbf7d0" },
      tianjin: { warlord: "燕國境", color: "#bbf7d0" },
      hubei: { warlord: "楚國 (南征戰場漢水，擊滅六師)", color: "#c2410c" },
      anhui: { warlord: "淮夷各部族 (隨楚叛周不貢)", color: "#fbcfe8" },
      jiangsu: { warlord: "徐國 (徐偃王前身日益強大)", color: "#fbcfe8" },
      zhejiang: { warlord: "於越族", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴國", color: "#fbcfe8" },
      gansu: { warlord: "西戎諸部 (見周衰趁機內侵)", color: "#94a3b8" },
      liaoning: { warlord: "箕子朝鮮", color: "#cbd5e1" },
      jiangxi: { warlord: "百越古部", color: "#fef08a" },
      hunan: { warlord: "荊楚南土", color: "#c2410c" },
      guizhou: { warlord: "濮人部落", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮古部", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "百越族", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "草原獫狁日強", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎部", color: "#94a3b8" },
      qinghai: { warlord: "西羌諸部", color: "#94a3b8" },
      xinjiang: { warlord: "西域城郭", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳", color: "#fbcfe8" }
    },
    labels: [
      { name: "宗 周 王 畿 (喪六師)", pos: [465, 335], color: "#991b1b", size: 14 },
      { name: "昭 王 殞 命 漢 水", pos: [480, 395], color: "#b91c1c", size: 14 },
      { name: "楚 (擊破周師日益雄)", pos: [485, 410], color: "#c2410c", size: 13 },
      { name: "徐 (徐偃王行仁義崛起)", pos: [535, 360], color: "#7c2d12", size: 13 },
      { name: "成 周 洛 邑", pos: [488, 332], color: "#991b1b", size: 13 }
    ],
    cities: [
      { name: "鎬京", pos: [465, 335], isCap: true },
      { name: "洛邑", pos: [488, 332], isCap: true },
      { name: "漢江沉舟處", pos: [480, 395], isCap: false },
      { name: "丹陽 (楚)", pos: [485, 410], isCap: false }
    ],
    battles: [
      {
        name: "× 漢水之役 (昭王喪六師溺死)",
        pos: [480, 395],
        battleId: "battle_zhaowang_chu_977",
        eventId: "evt_zhaowang_nanzheng_977"
      }
    ],
    chronicleLeft: [
      "周昭王十九年好大喜功，起宗周精銳六師主力大舉南巡伐楚，過漢江沉舟而死",
      "《竹書紀年》載『天大曀，雉兔皆震，喪六師於漢，王陟』，西周主力精華喪盡",
      "辛餘靡夜入漢水僅得昭王屍身北返，周天子對諸侯壓制軍力一落千丈，西周走向下坡"
    ],
    chronicleRight: [
      "南方楚國自此不受西周管轄，『辟在荊山』日漸稱雄南服，埋下後世楚武王自立稱王禍根",
      "東南徐國徐偃王修行仁義，三十六國陸續朝徐，威脅成周東南屏障",
      "周穆王即位以八駿巡行天下見西王母，東平徐偃王，作《呂刑》整頓綱紀力圖挽回頹勢"
    ]
  },
  {
    id: "bce_960",
    yearNumber: -960,
    yearDisplay: "前 960 年",
    shortLabel: "穆王西巡",
    headline: "周穆王馳八駿西征萬里會西王母，東平徐偃王，作呂刑整飭邦憲",
    subTitle: "瑤池宴飲 · 造父御車一日千里 · 平定徐偃王 · 西巡青海昆侖 · 呂刑五刑",
    provinceWarlordMap: {
      shaanxi: { warlord: "宗周鎬京天子直轄王畿", color: "#fef08a" },
      henan: { warlord: "成周洛邑王畿 / 衛國 / 宋國", color: "#fde047" },
      shandong: { warlord: "齊國 / 魯國", color: "#bbf7d0" },
      shanxi: { warlord: "晉國 / 北狄", color: "#bbf7d0" },
      hebei: { warlord: "燕國防禦山戎", color: "#bbf7d0" },
      beijing: { warlord: "燕國薊城", color: "#bbf7d0" },
      tianjin: { warlord: "燕國領地", color: "#bbf7d0" },
      hubei: { warlord: "楚國 (奉命助周平徐偃王)", color: "#c2410c" },
      anhui: { warlord: "徐國 (徐偃王僭號三十六國朝之)", color: "#fbcfe8" },
      jiangsu: { warlord: "徐國核心勢力 / 太伯句吳", color: "#fbcfe8" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀杜宇氏王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴子國", color: "#fbcfe8" },
      gansu: { warlord: "穆王西巡道 / 犬戎部族 (獲白狼白鹿)", color: "#94a3b8" },
      liaoning: { warlord: "箕子朝鮮", color: "#cbd5e1" },
      jiangxi: { warlord: "百越諸部", color: "#fef08a" },
      hunan: { warlord: "楚之南境", color: "#c2410c" },
      guizhou: { warlord: "濮人部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮古族", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "百越諸部", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "獫狁 / 狄族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎諸部", color: "#94a3b8" },
      qinghai: { warlord: "昆侖瑤池西王母之邦", color: "#cbd5e1" },
      xinjiang: { warlord: "西域綠洲方國", color: "#cbd5e1" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳境", color: "#fbcfe8" }
    },
    labels: [
      { name: "宗 周 鎬 京", pos: [465, 335], color: "#991b1b", size: 14 },
      { name: "西 王 母 之 邦 (昆侖)", pos: [350, 290], color: "#0284c7", size: 13 },
      { name: "徐 偃 王 僭 號 處", pos: [535, 345], color: "#9333ea", size: 13 },
      { name: "成 周 洛 邑", pos: [488, 332], color: "#991b1b", size: 13 },
      { name: "楚 (鬻熊後代助周)", pos: [480, 395], color: "#c2410c", size: 12 }
    ],
    cities: [
      { name: "鎬京", pos: [465, 335], isCap: true },
      { name: "成周洛邑", pos: [488, 332], isCap: true },
      { name: "徐國 (泗洪/邳州)", pos: [535, 345], isCap: false },
      { name: "昆侖瑤池", pos: [350, 290], isCap: false }
    ],
    battles: [
      {
        name: "× 穆王伐徐平偃王",
        pos: [535, 345],
        battleId: "battle_xuyanwang_960",
        eventId: "evt_muwang_xizheng_960"
      }
    ],
    chronicleLeft: [
      "周穆王即位好巡行天下，造父御八駿之乘，西征萬里至昆侖之丘，會西王母於瑤池",
      "穆王西征犬戎得白狼四、白鹿四以歸，移戎於太原，西北防線深入歐亞草原邊界",
      "東南徐偃王行仁義，得三十六國朝賀並僭號稱王，穆王聞訊造父駕車日馳千里還師"
    ],
    chronicleRight: [
      "穆王命楚國起兵平定徐國，徐偃王仁而不忍戰遂走死彭城，周室重定江淮秩序",
      "周穆王命司寇呂侯修撰《呂刑》，詳定墨、劓、剕、宮、大辟五刑三千條，明德慎罰",
      "穆王大興征伐巡狩雖振西周聲威，但耗資巨萬，國力日趨空耗，宗周漸生隱憂"
    ]
  },
  {
    id: "bce_841",
    yearNumber: -841,
    yearDisplay: "前 841 年",
    shortLabel: "國人暴動",
    headline: "周厲王專利防民之口，鎬京國人暴動逐天子，周召共和行政開中國確切紀年",
    subTitle: "防民之口甚於防川 · 厲王出奔於彘 · 召穆公以子代死 · 共和元年確切紀年",
    provinceWarlordMap: {
      shaanxi: { warlord: "宗周鎬京 (國人暴動 / 共和行政)", color: "#fef08a" },
      henan: { warlord: "成周洛邑 (周定公) / 衛國 / 鄭國前身", color: "#fde047" },
      shandong: { warlord: "齊國 / 魯國", color: "#bbf7d0" },
      shanxi: { warlord: "晉國 / 周厲王流放地彘邑 (霍州)", color: "#bbf7d0" },
      hebei: { warlord: "燕國", color: "#bbf7d0" },
      beijing: { warlord: "燕國薊城", color: "#bbf7d0" },
      tianjin: { warlord: "燕國領地", color: "#bbf7d0" },
      hubei: { warlord: "楚國 (熊渠封三子為王，僭越王位)", color: "#c2410c" },
      anhui: { warlord: "淮夷部族 (趁周室動亂頻繁入寇)", color: "#fbcfe8" },
      jiangsu: { warlord: "吳國 / 淮夷各方", color: "#fbcfe8" },
      zhejiang: { warlord: "越人部落", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀王國", color: "#fbcfe8" },
      chongqing: { warlord: "巴國", color: "#fbcfe8" },
      gansu: { warlord: "秦莊公前身秦邑 / 西戎大盛", color: "#cbd5e1" },
      liaoning: { warlord: "箕子朝鮮", color: "#cbd5e1" },
      jiangxi: { warlord: "百越諸部", color: "#fef08a" },
      hunan: { warlord: "楚國南境", color: "#c2410c" },
      guizhou: { warlord: "濮人部落", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮古部", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "南越諸部", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "獫狁勢力大張逼近涇陽", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎部", color: "#94a3b8" },
      qinghai: { warlord: "西羌部落", color: "#94a3b8" },
      xinjiang: { warlord: "西域城邦", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳", color: "#fbcfe8" }
    },
    labels: [
      { name: "鎬 京 (國人暴動共和)", pos: [465, 335], color: "#991b1b", size: 14 },
      { name: "彘 邑 (厲王出奔流亡)", pos: [482, 280], color: "#7c2d12", size: 13 },
      { name: "楚 (熊渠封三子為王)", pos: [485, 410], color: "#c2410c", size: 13 },
      { name: "獫 狁 (威脅宗周北疆)", pos: [445, 275], color: "#334155", size: 13 },
      { name: "齊 (齊獻公在位)", pos: [555, 305], color: "#166534", size: 12 },
      { name: "晉 (晉靖侯在位)", pos: [490, 275], color: "#166534", size: 12 }
    ],
    cities: [
      { name: "宗周鎬京", pos: [465, 335], isCap: true },
      { name: "彘邑 (霍州)", pos: [482, 280], isCap: false },
      { name: "成周洛邑", pos: [488, 332], isCap: true },
      { name: "丹陽 (楚)", pos: [485, 410], isCap: false }
    ],
    battles: [
      {
        name: "× 國人暴動攻入王宮",
        pos: [465, 335],
        battleId: "battle_guoren_841",
        eventId: "evt_guoren_baodong_841"
      }
    ],
    chronicleLeft: [
      "周厲王好專利斂財，任衛巫謗監天下民言，召公諫曰『防民之口甚於防川』，厲王不聽",
      "前841年鎬京平民發動國人暴動圍攻王宮，厲王出奔於彘邑，召穆公以己子代死護宣王",
      "召穆公與周定公共同主持「共和行政」十四年，司馬遷《史記》由此年開啟連續精確年表"
    ],
    chronicleRight: [
      "楚國君主熊渠趁宗周大亂，大舉攻打庸、揚粵至於鄂，僭越分封其三子為王",
      "北方獫狁乘天子出奔長驅直入逼近涇陽，王畿邊境烽火告急，西周邊防面臨空前考驗",
      "共和十四年厲王死於彘，周召二公奉太子姬靜即位為周宣王，開啟宣王中興"
    ]
  },
  {
    id: "bce_771",
    yearNumber: -771,
    yearDisplay: "前 771 年",
    shortLabel: "犬戎破鎬",
    headline: "周幽王烽火戲諸侯，申侯引犬戎攻破鎬京殺幽王於驪山，西周覆亡",
    subTitle: "廢嫡立庶寵褒姒 · 犬戎破鎬京 · 幽王死驪山下 · 諸侯擁平王東遷洛邑",
    provinceWarlordMap: {
      shaanxi: { warlord: "犬戎盤踞鎬京 / 秦襄公引兵勤王", color: "#cbd5e1" },
      henan: { warlord: "東都洛邑 (周平王東遷立足處) / 鄭武公", color: "#fde047" },
      shandong: { warlord: "齊國 / 魯國", color: "#fed7aa" },
      shanxi: { warlord: "晉國 (晉文侯大興勤王擁立平王)", color: "#bbf7d0" },
      hebei: { warlord: "燕國防禦山戎", color: "#e2e8f0" },
      beijing: { warlord: "燕國薊城", color: "#e2e8f0" },
      tianjin: { warlord: "燕國", color: "#e2e8f0" },
      hubei: { warlord: "楚國 (辟在荊山日盛，覬覦漢陽)", color: "#c2410c" },
      anhui: { warlord: "淮夷部族 / 宋國", color: "#fbcfe8" },
      jiangsu: { warlord: "句吳古國", color: "#fde047" },
      zhejiang: { warlord: "於越族", color: "#bbf7d0" },
      sichuan: { warlord: "古蜀開明氏前身", color: "#fbcfe8" },
      chongqing: { warlord: "巴國", color: "#fbcfe8" },
      gansu: { warlord: "犬戎大部族 / 申侯申國封地", color: "#94a3b8" },
      liaoning: { warlord: "孤竹 / 箕子朝鮮", color: "#cbd5e1" },
      jiangxi: { warlord: "百越部族", color: "#fef08a" },
      hunan: { warlord: "楚之南境", color: "#c2410c" },
      guizhou: { warlord: "濮越部族", color: "#e2e8f0" },
      yunnan: { warlord: "滇濮部族", color: "#e2e8f0" },
      fujian: { warlord: "閩越古族", color: "#bbf7d0" },
      guangdong: { warlord: "百越族", color: "#fed7aa" },
      guangxi: { warlord: "西甌駱越", color: "#fed7aa" },
      "inner-mongolia": { warlord: "林胡 / 樓煩遊牧族", color: "#94a3b8" },
      "ningxia-hui": { warlord: "義渠犬戎", color: "#94a3b8" },
      qinghai: { warlord: "西羌諸部", color: "#94a3b8" },
      xinjiang: { warlord: "西域城郭", color: "#e2e8f0" },
      jilin: { warlord: "肅慎族", color: "#cbd5e1" },
      heilongjiang: { warlord: "肅慎族", color: "#cbd5e1" },
      shanghai: { warlord: "太伯句吳沼澤", color: "#fde047" }
    },
    labels: [
      { name: "宗周鎬京 (犬戎陷落)", pos: [465, 335], color: "#020617", size: 14 },
      { name: "驪 山 (幽王死所)", pos: [475, 336], color: "#b91c1c", size: 14 },
      { name: "犬 戎 盤 踞 關 中", pos: [430, 310], color: "#334155", size: 13 },
      { name: "成周洛邑 (平王東遷)", pos: [488, 332], color: "#991b1b", size: 14 },
      { name: "晉 文 侯 (勤王首功)", pos: [490, 275], color: "#166534", size: 13 },
      { name: "秦 (襄公始封諸侯)", pos: [425, 335], color: "#1e3a8a", size: 13 },
      { name: "鄭 (鄭武公勤王立國)", pos: [505, 335], color: "#78350f", size: 12 }
    ],
    cities: [
      { name: "鎬京 (殘破)", pos: [465, 335], isCap: false },
      { name: "洛邑 (平王新都)", pos: [488, 332], isCap: true },
      { name: "驪山 (臨潼)", pos: [475, 336], isCap: false },
      { name: "申國 (南陽/陝西)", pos: [475, 370], isCap: false }
    ],
    battles: [
      {
        name: "× 驪山之難 (幽王身死宗周亡)",
        pos: [475, 336],
        battleId: "battle_haojing_771",
        eventId: "evt_youwang_qian_771"
      }
    ],
    chronicleLeft: [
      "周幽王寵褒姒廢嫡立庶，烽火戲弄天下諸侯，申侯怒而聯合犬戎大舉入寇鎬京",
      "幽王舉烽燧召兵諸侯莫應，犬戎攻陷宗周鎬京掠寶，殺幽王於驪山之下，俘褒姒",
      "西周二百七十五年江山覆亡，晉文侯、鄭武公、秦襄公引兵擊退犬戎，擁立平王"
    ],
    chronicleRight: [
      "周平王即位以鎬京殘破避戎徙洛邑，秦襄公護送有功始封諸侯，獲賜岐豐故地",
      "周天子自東遷後直轄疆域縮減至洛邑方圓六百里，王權失落，周室淪為等同中等諸侯",
      "諸侯自是強凌弱眾暴寡，鄭莊小霸、齊桓首霸陸續登台，春秋五百年爭霸大幕全面拉開"
    ]
  }
];
