// Geopolitical State & Warlord Slices for Wei, Jin, Southern and Northern Dynasties (220 CE - 589 CE)
// Authentic Historical Geographic Layout based on Real Seamless Provincial / Feudal Mesh Map
export const WEI_JIN_WARLORD_PERIODS = [
  {
    id: "ce_280",
    yearNumber: 280,
    yearDisplay: "西元 280 年",
    shortLabel: "太康一統",
    headline: "晉滅東吳天下歸晉，太康盛世短暫大一統",
    subTitle: "王濬杜預樓船下江陵 · 孫皓銜璧出降 · 三國六十年干戈平息 · 太康之治人口復甦",
    chronicleLeft: [
      "晉武帝司馬炎採納羊祜、杜預平吳遺策，發動二十萬大軍分六路伐吳",
      "巴蜀水軍王濬造五牙樓船大艦，順長江破三峽、焚鐵鎖、直逼建業石頭城",
      "東吳丞相張悌戰死，後主孫皓輿櫬銜璧面縛出降，東吳滅亡"
    ],
    chronicleRight: [
      "自漢末建安以來六十載魏蜀吳三國割據徹底終結，天下大一統",
      "西晉收復長江以南二百三十萬戶口，開創繁榮一時的「太康之治」"
    ],
    provinceWarlordMap: {
      henan: { warlord: "西晉中央 (洛陽太康直轄)", color: "#fef08a" },
      shaanxi: { warlord: "西晉關中都督府 (長安)", color: "#fef08a" },
      shanxi: { warlord: "西晉并州 (匈奴五部內附)", color: "#fde047" },
      hebei: { warlord: "西晉冀州 (鄴城封王鎮守)", color: "#fef08a" },
      shandong: { warlord: "西晉青兗徐州", color: "#fef08a" },
      beijing: { warlord: "西晉幽州 (薊城邊防)", color: "#fde047" },
      tianjin: { warlord: "西晉幽州海防", color: "#fde047" },
      liaoning: { warlord: "西晉平州 (慕容鮮卑臣服)", color: "#cbd5e1" },
      gansu: { warlord: "西晉涼州 (禿髮鮮卑西戎)", color: "#fed7aa" },
      jiangsu: { warlord: "西晉揚州 (建鄴改建鄴，東吳故地)", color: "#bbf7d0" },
      zhejiang: { warlord: "西晉會稽三吳", color: "#bbf7d0" },
      anhui: { warlord: "西晉淮南壽春重鎮", color: "#fef08a" },
      hubei: { warlord: "西晉荊州都督府 (江陵/襄陽)", color: "#bbf7d0" },
      hunan: { warlord: "西晉湘江各郡", color: "#bbf7d0" },
      jiangxi: { warlord: "西晉江州豫章", color: "#bbf7d0" },
      sichuan: { warlord: "西晉益州 (原蜀漢故土)", color: "#fef08a" },
      chongqing: { warlord: "西晉巴東三峽", color: "#fef08a" },
      fujian: { warlord: "西晉晉安郡 (閩越入籍)", color: "#bbf7d0" },
      guangdong: { warlord: "西晉廣州南海", color: "#bbf7d0" },
      guangxi: { warlord: "西晉交州刺史部", color: "#bbf7d0" },
      guizhou: { warlord: "西晉南中諸郡", color: "#e2e8f0" },
      yunnan: { warlord: "西晉寧州滇南", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "塞外拓跋鮮卑 / 匈奴殘部", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西戎羌氏部落", color: "#94a3b8" },
      qinghai: { warlord: "吐谷渾早期西遷 / 西羌各部", color: "#cbd5e1" },
      xinjiang: { warlord: "西域長史府統轄諸綠洲", color: "#e2e8f0" },
      jilin: { warlord: "高句麗王國", color: "#cbd5e1" },
      heilongjiang: { warlord: "挹婁肅慎部族", color: "#cbd5e1" },
      shanghai: { warlord: "西晉吳郡華亭", color: "#bbf7d0" }
    },
    labels: [
      { name: "西 晉 洛 陽", pos: [495, 328], color: "#854d0e", size: 14 },
      { name: "長 安 都 督", pos: [460, 335], color: "#854d0e", size: 13 },
      { name: "建 業 故 吳", pos: [530, 365], color: "#166534", size: 13 },
      { name: "江 陵 重 鎮", pos: [490, 385], color: "#166534", size: 12 },
      { name: "并 州 五 部 匈 奴", pos: [480, 290], color: "#c2410c", size: 12 }
    ],
    cities: [
      { name: "洛陽 (西晉京師)", pos: [495, 328], isCap: true },
      { name: "長安 (關中重鎮)", pos: [460, 335], isCap: false },
      { name: "建鄴 (江東故都)", pos: [530, 365], isCap: false },
      { name: "江陵 (荊州總督)", pos: [490, 385], isCap: false },
      { name: "鄴城 (河北巨邑)", pos: [505, 305], isCap: false },
      { name: "成都 (天府之國)", pos: [420, 380], isCap: false }
    ],
    battles: [
      {
        name: "× 晉滅吳之戰 (王濬樓船破江東)",
        pos: [520, 370],
        battleId: "battle_mie_wu_280",
        year: 280
      }
    ]
  },
  {
    id: "ce_306",
    yearNumber: 306,
    yearDisplay: "西元 306 年",
    shortLabel: "八王殘局",
    headline: "十六年八王內訌中原血竭，五胡割據四起",
    subTitle: "司馬越毒殺惠帝 · 劉淵并州建漢趙稱大單于 · 李雄成都建大成 · 中原白骨蔽野",
    chronicleLeft: [
      "晉惠帝癡愚賈后弄權，宗室八王引胡兵血戰十六年，白骨蔽野",
      "匈奴屠各部劉淵借兵自立，於并州左國城築壇建漢趙稱大單于",
      "巴蜀流民首領李特李雄攻陷成都，建立大成（成漢）"
    ],
    chronicleRight: [
      "中原元氣耗盡，西晉政權風雨飄搖，五胡十六國全面登場",
      "琅琊王司馬睿受命出鎮建鄴，王導聯絡顧陸名族為衣冠南渡佈局"
    ],
    provinceWarlordMap: {
      henan: { warlord: "東海王司馬越 (洛陽中央殘局)", color: "#fef08a" },
      shaanxi: { warlord: "河間王殘部 / 關中流民起義", color: "#fed7aa" },
      shanxi: { warlord: "劉淵漢趙匈奴大單于 (左國城/平陽)", color: "#f43f5e" },
      hebei: { warlord: "石勒羯胡起義 / 王浚鮮卑聯軍", color: "#c084fc" },
      shandong: { warlord: "西晉苟晞青徐軍政", color: "#fde047" },
      beijing: { warlord: "王浚都督幽州 (引段部鮮卑南下)", color: "#a5b4fc" },
      tianjin: { warlord: "段部鮮卑騎兵", color: "#a5b4fc" },
      liaoning: { warlord: "慕容廆前燕鮮卑稱雄大凌河", color: "#818cf8" },
      gansu: { warlord: "張軌前涼守境安民", color: "#6ee7b7" },
      sichuan: { warlord: "李雄成漢 (流民攻佔成都立國)", color: "#fb923c" },
      chongqing: { warlord: "成漢巴蜀控制區", color: "#fb923c" },
      jiangsu: { warlord: "安東將軍司馬睿渡江鎮建鄴", color: "#86efac" },
      zhejiang: { warlord: "江南顧榮陸曄世族共衛司馬睿", color: "#86efac" },
      anhui: { warlord: "江淮流民乞活軍營壘", color: "#fed7aa" },
      hubei: { warlord: "荊州都督劉弘安撫流民", color: "#bbf7d0" },
      hunan: { warlord: "西晉湘州各郡", color: "#bbf7d0" },
      jiangxi: { warlord: "西晉江州豫章", color: "#bbf7d0" },
      fujian: { warlord: "晉安郡中原南遷衣冠", color: "#86efac" },
      guangdong: { warlord: "西晉南海交廣", color: "#bbf7d0" },
      guangxi: { warlord: "交州山嶺諸蠻", color: "#bbf7d0" },
      guizhou: { warlord: "西南夷部", color: "#e2e8f0" },
      yunnan: { warlord: "寧州南中豪族", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "拓跋鮮卑索頭部", color: "#94a3b8" },
      "ningxia-hui": { warlord: "羌氐雜部", color: "#94a3b8" },
      qinghai: { warlord: "吐谷渾王國", color: "#cbd5e1" },
      xinjiang: { warlord: "西域諸國依附前涼", color: "#e2e8f0" },
      jilin: { warlord: "高句麗擴張", color: "#cbd5e1" },
      heilongjiang: { warlord: "黑水靺鞨部族", color: "#cbd5e1" },
      shanghai: { warlord: "三吳顧陸世族地", color: "#86efac" }
    },
    labels: [
      { name: "漢 趙 劉 淵 (平陽)", pos: [480, 310], color: "#9f1239", size: 13 },
      { name: "成 漢 李 雄 (成都)", pos: [420, 380], color: "#c2410c", size: 13 },
      { name: "司 馬 睿 鎮 建 鄴", pos: [530, 365], color: "#15803d", size: 13 },
      { name: "前 涼 張 軌 (姑臧)", pos: [420, 305], color: "#047857", size: 12 },
      { name: "慕 容 鮮 卑 (棘城)", pos: [550, 260], color: "#4338ca", size: 12 }
    ],
    cities: [
      { name: "洛陽 (殘破京師)", pos: [495, 328], isCap: false },
      { name: "平陽 (漢趙都城)", pos: [480, 310], isCap: true },
      { name: "成都 (成漢都城)", pos: [420, 380], isCap: true },
      { name: "建鄴 (琅琊王府)", pos: [530, 365], isCap: false },
      { name: "姑臧 (前涼首府)", pos: [420, 305], isCap: false }
    ],
    battles: []
  },
  {
    id: "ce_317",
    yearNumber: 317,
    yearDisplay: "西元 317 年",
    shortLabel: "衣冠南渡",
    headline: "永嘉之禍西晉覆亡，東晉立國「王與馬共天下」",
    subTitle: "洛陽長安二帝蒙塵 · 晉元帝司馬睿建康登基 · 祖逖中流擊楫矢志北伐 · 北方五胡群雄混戰",
    chronicleLeft: [
      "漢趙劉曜、石勒攻破洛陽俘懷帝，西晉北方政權徹底覆亡",
      "司馬睿在建康登基建立東晉，引王導同坐御榻，『王與馬共天下』",
      "祖逖率部曲百家渡江，中流擊楫立誓，收復黃河以南故土"
    ],
    chronicleRight: [
      "北方門閥士族率百萬流民『衣冠南渡』，江南開發與門閥政治奠基",
      "北方陷入漢趙、後趙、前涼、成漢等五胡政權割據混戰"
    ],
    provinceWarlordMap: {
      henan: { warlord: "祖逖北伐部隊收復黃河以南 (豫州)", color: "#86efac" },
      shaanxi: { warlord: "漢趙劉曜鎮守長安關中", color: "#f43f5e" },
      shanxi: { warlord: "石勒後趙勢力兼併并州", color: "#c084fc" },
      hebei: { warlord: "石勒建立後趙定都襄國", color: "#c084fc" },
      shandong: { warlord: "後趙兵鋒與曹嶷青州割據", color: "#c084fc" },
      beijing: { warlord: "段部鮮卑與段匹磾歸附東晉", color: "#a5b4fc" },
      tianjin: { warlord: "段部鮮卑騎兵", color: "#a5b4fc" },
      liaoning: { warlord: "慕容廆前燕撫綏漢族流亡世家", color: "#818cf8" },
      gansu: { warlord: "前涼張茂奉東晉建興正朔", color: "#6ee7b7" },
      sichuan: { warlord: "成漢李雄雄據巴蜀", color: "#fb923c" },
      chongqing: { warlord: "成漢三峽各郡", color: "#fb923c" },
      jiangsu: { warlord: "東晉朝廷 (建康，司馬睿與王導)", color: "#22c55e" },
      zhejiang: { warlord: "東晉會稽郡中原高門僑寓地", color: "#22c55e" },
      anhui: { warlord: "東晉淮南防線 (壽春/合肥)", color: "#86efac" },
      hubei: { warlord: "東晉西府荊州軍閥王敦", color: "#4ade80" },
      hunan: { warlord: "東晉湘江各郡", color: "#22c55e" },
      jiangxi: { warlord: "東晉江州潯陽名勝", color: "#22c55e" },
      fujian: { warlord: "東晉晉安郡中原南遷各姓", color: "#22c55e" },
      guangdong: { warlord: "東晉廣州刺史部", color: "#22c55e" },
      guangxi: { warlord: "東晉交州刺史部", color: "#22c55e" },
      guizhou: { warlord: "西南僚人蠻部", color: "#e2e8f0" },
      yunnan: { warlord: "爨氏大姓自保稱雄滇南", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "拓跋鬱律代國稱王", color: "#94a3b8" },
      "ningxia-hui": { warlord: "白蘭羌氐部落", color: "#94a3b8" },
      qinghai: { warlord: "吐谷渾王國慕容吐延", color: "#cbd5e1" },
      xinjiang: { warlord: "高昌及西域諸城邦", color: "#e2e8f0" },
      jilin: { warlord: "高句麗美川王南拓", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉部族", color: "#cbd5e1" },
      shanghai: { warlord: "東晉海隅", color: "#22c55e" }
    },
    labels: [
      { name: "東 晉 建 康 (司馬睿)", pos: [530, 365], color: "#14532d", size: 14 },
      { name: "祖 逖 豫 州 北 伐", pos: [495, 335], color: "#15803d", size: 13 },
      { name: "後 趙 石 勒 (襄國)", pos: [505, 295], color: "#7e22ce", size: 13 },
      { name: "漢 趙 劉 曜 (長安)", pos: [460, 335], color: "#9f1239", size: 13 },
      { name: "成 漢 李 雄 (成都)", pos: [420, 380], color: "#c2410c", size: 12 },
      { name: "前 涼 張 氏 (武威)", pos: [420, 305], color: "#047857", size: 12 }
    ],
    cities: [
      { name: "建康 (東晉京師)", pos: [530, 365], isCap: true },
      { name: "襄國 (後趙都城)", pos: [505, 295], isCap: true },
      { name: "長安 (漢趙都城)", pos: [460, 335], isCap: true },
      { name: "成都 (成漢都城)", pos: [420, 380], isCap: true },
      { name: "雍丘 (祖逖大營)", pos: [498, 335], isCap: false }
    ],
    battles: [
      {
        name: "× 洛陽永嘉之禍 (懷帝被俘西晉覆亡)",
        pos: [495, 328],
        battleId: "battle_luoyang_yongjia_311",
        year: 311
      },
      {
        name: "× 祖逖渡江北伐 (中流擊楫收復黃河南)",
        pos: [498, 335],
        battleId: "battle_zuti_beifa_317",
        year: 317
      }
    ]
  },
  {
    id: "ce_351",
    yearNumber: 351,
    yearDisplay: "西元 351 年",
    shortLabel: "冉魏與前燕",
    headline: "羯趙崩潰冉閔立國殺胡，前燕慕容鮮卑定鼎中原",
    subTitle: "冉閔發佈殺胡令 · 慕容儁南下入主鄴城稱帝 · 苻健入關建立前秦 · 桓溫收復巴蜀北伐中原",
    chronicleLeft: [
      "後趙石虎死後大亂，冉閔發布殺胡令建立冉魏政權",
      "前燕慕容鮮卑騎兵大舉南下入主鄴城，擊滅冉魏定鼎中原",
      "東晉大司馬桓溫溯江西征平定成漢，徹底收復巴蜀"
    ],
    chronicleRight: [
      "北方呈現前燕慕容鮮卑（鄴城）與前秦氐族（長安）雙雄相爭",
      "東晉牢牢掌控長江全線天險與四川天府糧倉"
    ],
    provinceWarlordMap: {
      henan: { warlord: "冉魏冉閔主力抗擊羯胡慕容 (鄴城/洛陽)", color: "#fb7185" },
      hebei: { warlord: "慕容儁前燕鮮卑大軍南下兼併冀州", color: "#818cf8" },
      shandong: { warlord: "前燕慕容恪橫掃青徐諸州", color: "#818cf8" },
      shaanxi: { warlord: "苻健氐族大軍建立前秦定都長安", color: "#a855f7" },
      shanxi: { warlord: "前秦與後趙殘將拉鋸", color: "#c084fc" },
      beijing: { warlord: "前燕舊都薊城", color: "#818cf8" },
      tianjin: { warlord: "前燕控制區", color: "#818cf8" },
      liaoning: { warlord: "前燕大本營遼西龍城", color: "#6366f1" },
      gansu: { warlord: "前涼張重華保境安民", color: "#6ee7b7" },
      sichuan: { warlord: "東晉桓溫西征滅成漢收復巴蜀", color: "#22c55e" },
      chongqing: { warlord: "東晉巴郡益州", color: "#22c55e" },
      jiangsu: { warlord: "東晉朝廷 (建康，穆帝初立)", color: "#22c55e" },
      zhejiang: { warlord: "東晉王羲之會稽蘭亭雅集 (353 CE)", color: "#22c55e" },
      anhui: { warlord: "東晉淮南重鎮壽春", color: "#4ade80" },
      hubei: { warlord: "東晉桓溫大將軍都督荊江八州", color: "#16a34a" },
      hunan: { warlord: "東晉西府轄區", color: "#22c55e" },
      jiangxi: { warlord: "東晉江州名郡", color: "#22c55e" },
      fujian: { warlord: "東晉晉安郡", color: "#22c55e" },
      guangdong: { warlord: "東晉嶺南諸郡", color: "#22c55e" },
      guangxi: { warlord: "東晉交廣各州", color: "#22c55e" },
      guizhou: { warlord: "西南夷部", color: "#e2e8f0" },
      yunnan: { warlord: "南中爨氏大姓", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "拓跋什翼犍代王盛樂", color: "#94a3b8" },
      "ningxia-hui": { warlord: "西羌部落", color: "#94a3b8" },
      qinghai: { warlord: "吐谷渾王國碎奚", color: "#cbd5e1" },
      xinjiang: { warlord: "西域前涼護理", color: "#e2e8f0" },
      jilin: { warlord: "高句麗故國原王", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉部族", color: "#cbd5e1" },
      shanghai: { warlord: "東晉三吳沃土", color: "#22c55e" }
    },
    labels: [
      { name: "前 燕 慕 容 鮮 卑", pos: [515, 290], color: "#3730a3", size: 14 },
      { name: "冉 魏 武 悼 天 王 (鄴)", pos: [500, 310], color: "#be123c", size: 13 },
      { name: "前 秦 苻 健 (長安)", pos: [460, 335], color: "#6b21a8", size: 13 },
      { name: "東 晉 建 康 王 謝", pos: [530, 365], color: "#14532d", size: 13 },
      { name: "桓 溫 督 荊 襄 蜀 漢", pos: [480, 380], color: "#166534", size: 12 }
    ],
    cities: [
      { name: "鄴城 (冉魏都城/後前燕)", pos: [505, 305], isCap: true },
      { name: "建康 (東晉京師)", pos: [530, 365], isCap: true },
      { name: "長安 (前秦都城)", pos: [460, 335], isCap: true },
      { name: "成都 (桓溫收復歸晉)", pos: [420, 380], isCap: false },
      { name: "會稽 (王羲之蘭亭)", pos: [545, 385], isCap: false }
    ],
    battles: []
  },
  {
    id: "ce_376",
    yearNumber: 376,
    yearDisplay: "西元 376 年",
    shortLabel: "前秦混一北方",
    headline: "苻堅王猛修明天下，前秦席捲華北南北分峙",
    subTitle: "滅前燕平前涼吞代國 · 漢人王猛為相法治嚴明 · 拓地千里休養生息 · 前秦東晉隔淮相峙",
    chronicleLeft: [
      "前秦天王苻堅任用漢人王猛為相，崇尚儒學法度，修明政治",
      "前秦軍連平前燕、滅前涼、吞代國，席捲黃河流域一統北方",
      "東晉謝安執掌樞柄，謝玄於京口招募流民勇士組建『北府兵』"
    ],
    chronicleRight: [
      "南北兩大政權隔淮河長江對峙，北方胡漢融合空前加深",
      "王猛臨終苦諫『不可圖晉』，苻堅懷一統天下之志醞釀大舉南征"
    ],
    provinceWarlordMap: {
      shaanxi: { warlord: "前秦中央京畿 (長安，天王苻堅)", color: "#a855f7" },
      henan: { warlord: "前秦洛陽都督府", color: "#a855f7" },
      hebei: { warlord: "前秦滅燕後冀州行臺 (鄴城)", color: "#c084fc" },
      shandong: { warlord: "前秦青兗二州", color: "#c084fc" },
      shanxi: { warlord: "前秦并州太原", color: "#a855f7" },
      beijing: { warlord: "前秦幽州燕薊", color: "#c084fc" },
      tianjin: { warlord: "前秦渤海防務", color: "#c084fc" },
      liaoning: { warlord: "前秦遼西平州 (撫慰慕容鮮卑)", color: "#c084fc" },
      gansu: { warlord: "前秦滅前涼後之河西涼州", color: "#a855f7" },
      sichuan: { warlord: "東晉梁益二州", color: "#22c55e" },
      chongqing: { warlord: "東晉巴東峽口", color: "#22c55e" },
      jiangsu: { warlord: "東晉朝廷 (建康，孝武帝即位謝安當國)", color: "#22c55e" },
      zhejiang: { warlord: "東晉三吳財賦根本", color: "#22c55e" },
      anhui: { warlord: "東晉淮南重鎮壽陽 (胡彬鎮守)", color: "#4ade80" },
      hubei: { warlord: "東晉桓沖督荊州", color: "#16a34a" },
      hunan: { warlord: "東晉湘江各郡", color: "#22c55e" },
      jiangxi: { warlord: "東晉江州潯陽", color: "#22c55e" },
      fujian: { warlord: "東晉晉安閩江", color: "#22c55e" },
      guangdong: { warlord: "東晉廣州刺史部", color: "#22c55e" },
      guangxi: { warlord: "東晉交州刺史部", color: "#22c55e" },
      guizhou: { warlord: "西南僚人蠻部", color: "#e2e8f0" },
      yunnan: { warlord: "南中大姓各爨", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "前秦滅代後分治拓跋諸部", color: "#c084fc" },
      "ningxia-hui": { warlord: "前秦朔方護軍", color: "#a855f7" },
      qinghai: { warlord: "吐谷渾王國臣服前秦", color: "#cbd5e1" },
      xinjiang: { warlord: "呂光西征收服西域諸國", color: "#a855f7" },
      jilin: { warlord: "高句麗小獸林王立太學", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉靺鞨部族", color: "#cbd5e1" },
      shanghai: { warlord: "東晉三吳之地", color: "#22c55e" }
    },
    labels: [
      { name: "前 秦 苻 堅 席 捲 北 方", pos: [475, 315], color: "#581c87", size: 15 },
      { name: "長 安 草 堂 太 學", pos: [460, 335], color: "#6b21a8", size: 13 },
      { name: "東 晉 謝 安 輔 政 (建康)", pos: [530, 365], color: "#14532d", size: 14 },
      { name: "謝 玄 創 北 府 兵 (京口)", pos: [535, 360], color: "#15803d", size: 12 },
      { name: "桓 沖 督 荊 襄 防 線", pos: [490, 385], color: "#166534", size: 12 }
    ],
    cities: [
      { name: "長安 (前秦京師)", pos: [460, 335], isCap: true },
      { name: "建康 (東晉京師)", pos: [530, 365], isCap: true },
      { name: "鄴城 (前秦行臺)", pos: [505, 305], isCap: false },
      { name: "壽陽 (淮南門戶)", pos: [515, 365], isCap: false },
      { name: "京口 (北府大營)", pos: [535, 360], isCap: false }
    ],
    battles: [
      {
        name: "× 枋頭之戰 (慕容垂大破桓溫北伐)",
        pos: [508, 320],
        battleId: "battle_fangtou_369",
        year: 369
      }
    ]
  },
  {
    id: "ce_383",
    yearNumber: 383,
    yearDisplay: "西元 383 年",
    shortLabel: "淝水之戰",
    headline: "投鞭斷流前秦臨淮，謝安八萬北府兵風聲鶴唳破苻堅",
    subTitle: "苻堅大舉南征投鞭斷流 · 謝安東山對弈小兒輩大破賊 · 淝水決戰草木皆兵 · 前秦崩解北方再入亂局",
    chronicleLeft: [
      "前秦苻堅率號稱近百萬大軍大舉伐晉，投鞭長江自許斷流",
      "東晉謝安東山對弈運籌帷幄，謝玄率八萬北府精銳於淝水決戰",
      "朱序陣後大呼秦軍敗矣，前秦軍大潰自踐，風聲鶴唳草木皆兵"
    ],
    chronicleRight: [
      "東晉以弱勝強，保全了江左漢民族政權與華夏衣冠禮樂正朔",
      "前秦帝國迅速分崩離析，北方重回後燕、後秦、北魏多雄割據"
    ],
    provinceWarlordMap: {
      shaanxi: { warlord: "前秦中央 (苻堅長安大營後方)", color: "#a855f7" },
      henan: { warlord: "前秦南征大軍主力前鋒集結地", color: "#f43f5e" },
      anhui: { warlord: "淝水戰場：前秦苻融 vs 東晉謝玄北府兵", color: "#dc2626" },
      jiangsu: { warlord: "東晉朝廷 (謝安坐鎮建康調度三軍)", color: "#22c55e" },
      hubei: { warlord: "東晉桓沖水軍牽制前秦荊襄偏師", color: "#16a34a" },
      hebei: { warlord: "前秦河北軍區 (慕容垂統軍懷異志)", color: "#818cf8" },
      shandong: { warlord: "前秦青徐守軍", color: "#c084fc" },
      shanxi: { warlord: "前秦并州 (西燕慕容泓慕容沖密謀)", color: "#a855f7" },
      beijing: { warlord: "前秦幽州邊鎮", color: "#c084fc" },
      tianjin: { warlord: "前秦海防", color: "#c084fc" },
      liaoning: { warlord: "慕容鮮卑故部各生異心", color: "#818cf8" },
      gansu: { warlord: "呂光出征西域大軍在外", color: "#a855f7" },
      sichuan: { warlord: "東晉益州守軍", color: "#22c55e" },
      chongqing: { warlord: "東晉峽江要衝", color: "#22c55e" },
      zhejiang: { warlord: "東晉三吳世家鼎力犒軍", color: "#22c55e" },
      hunan: { warlord: "東晉湘江後方", color: "#22c55e" },
      jiangxi: { warlord: "東晉江州水陸策應", color: "#22c55e" },
      fujian: { warlord: "東晉晉安郡", color: "#22c55e" },
      guangdong: { warlord: "東晉廣州", color: "#22c55e" },
      guangxi: { warlord: "東晉交州", color: "#22c55e" },
      guizhou: { warlord: "西南僚部", color: "#e2e8f0" },
      yunnan: { warlord: "滇南爨氏大姓", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "拓跋珪隱伏塞外俟機復國", color: "#94a3b8" },
      "ningxia-hui": { warlord: "姚萇羌軍密圖自立", color: "#fed7aa" },
      qinghai: { warlord: "吐谷渾王國觀望中原", color: "#cbd5e1" },
      xinjiang: { warlord: "呂光平龜茲獲鳩摩羅什大師", color: "#a855f7" },
      jilin: { warlord: "高句麗故國壤王", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉部族", color: "#cbd5e1" },
      shanghai: { warlord: "東晉三吳根基", color: "#22c55e" }
    },
    labels: [
      { name: "淝 水 決 戰 (草木皆兵)", pos: [515, 365], color: "#b91c1c", size: 15 },
      { name: "謝 安 東 山 運 籌 (建康)", pos: [530, 365], color: "#14532d", size: 14 },
      { name: "苻 堅 百 萬 潰 散 (八公山)", pos: [512, 360], color: "#581c87", size: 13 },
      { name: "慕 容 垂 保 全 鮮 卑 營", pos: [505, 320], color: "#3730a3", size: 12 },
      { name: "姚 萇 羌 兵 伺 機 關 中", pos: [460, 335], color: "#9a3412", size: 12 }
    ],
    cities: [
      { name: "壽陽/八公山 (前秦前鋒)", pos: [515, 365], isCap: false },
      { name: "建康 (東晉京師)", pos: [530, 365], isCap: true },
      { name: "長安 (前秦京師)", pos: [460, 335], isCap: true },
      { name: "京口 (北府精兵出征)", pos: [535, 360], isCap: false },
      { name: "襄陽 (朱序身在秦營心在晉)", pos: [488, 355], isCap: false }
    ],
    battles: [
      {
        name: "× 淝水之戰 (謝玄破苻堅，風聲鶴唳草木皆兵)",
        pos: [515, 365],
        battleId: "battle_feishui_383",
        year: 383
      }
    ]
  },
  {
    id: "ce_420",
    yearNumber: 420,
    yearDisplay: "西元 420 年",
    shortLabel: "劉裕代晉建宋",
    headline: "金戈鐵馬氣吞萬里如虎，劉裕代晉開啟南朝",
    subTitle: "兩度北伐滅南燕破後秦收復兩京 · 卻月陣戰車破魏騎 · 劉宋取代東晉建國 · 拓跋鮮卑北魏平城崛起",
    chronicleLeft: [
      "劉裕北伐滅南燕破後秦收復長安洛陽，創『卻月陣』以戰車破魏騎",
      "劉裕代晉建立劉宋，東晉百年門閥統治落幕，南朝宋齊梁陳開端",
      "北魏拓跋珪遷都平城，拓跋燾厲兵秣馬統一北方"
    ],
    chronicleRight: [
      "南朝打破高門世族壟斷，『寒人掌機要』抑制豪強兼併",
      "宋文帝元嘉之治推行三十載，江南戶口繁衍、文教與佛寺大興"
    ],
    provinceWarlordMap: {
      jiangsu: { warlord: "宋武帝劉裕建立劉宋 (建康南朝開端)", color: "#10b981" },
      zhejiang: { warlord: "劉宋三吳經濟腹地", color: "#10b981" },
      anhui: { warlord: "劉宋淮南軍區淮西", color: "#34d399" },
      hubei: { warlord: "劉宋荊州水軍門戶 (江陵/襄陽)", color: "#059669" },
      hunan: { warlord: "劉宋湘州", color: "#10b981" },
      jiangxi: { warlord: "劉宋江州潯陽陶淵明故里", color: "#10b981" },
      sichuan: { warlord: "劉宋平定譙縱收復益州", color: "#10b981" },
      chongqing: { warlord: "劉宋峽江重鎮", color: "#10b981" },
      shandong: { warlord: "劉裕滅南燕收復青徐廣固之地", color: "#34d399" },
      henan: { warlord: "劉宋洛陽河南守軍 (魏宋拉鋸中)", color: "#34d399" },
      shaanxi: { warlord: "赫連勃勃大夏國 (赫連夏佔據長安統萬城)", color: "#f43f5e" },
      shanxi: { warlord: "拓跋鮮卑北魏太原并州", color: "#0284c7" },
      hebei: { warlord: "北魏明元帝拓跋嗣統轄冀州", color: "#38bdf8" },
      beijing: { warlord: "北魏幽州防線", color: "#38bdf8" },
      tianjin: { warlord: "北魏渤海防區", color: "#38bdf8" },
      liaoning: { warlord: "北燕馮氏龍城割據", color: "#818cf8" },
      gansu: { warlord: "北涼沮渠蒙遜定都姑臧", color: "#f59e0b" },
      fujian: { warlord: "劉宋晉安郡", color: "#10b981" },
      guangdong: { warlord: "劉宋廣州番禺", color: "#10b981" },
      guangxi: { warlord: "劉宋交州", color: "#10b981" },
      guizhou: { warlord: "西南夷獠", color: "#e2e8f0" },
      yunnan: { warlord: "寧州爨氏大姓", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "北魏平城京畿塞北 (大同)", color: "#0284c7" },
      "ningxia-hui": { warlord: "赫連夏統萬城", color: "#f43f5e" },
      qinghai: { warlord: "吐谷渾王國阿柴", color: "#cbd5e1" },
      xinjiang: { warlord: "西域高昌車師", color: "#e2e8f0" },
      jilin: { warlord: "高句麗長壽王稱雄東北遷都平壤", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉靺鞨各部", color: "#cbd5e1" },
      shanghai: { warlord: "劉宋三吳海隅", color: "#10b981" }
    },
    labels: [
      { name: "劉 宋 氣 吞 萬 里 如 虎 (建康)", pos: [530, 365], color: "#065f46", size: 14 },
      { name: "北 魏 平 城 太 跋 嗣 (大同)", pos: [495, 275], color: "#0369a1", size: 14 },
      { name: "大 夏 赫 連 勃 勃 (統萬城)", pos: [465, 305], color: "#9f1239", size: 13 },
      { name: "北 涼 沮 渠 蒙 遜 (姑臧)", pos: [420, 305], color: "#b45309", size: 12 },
      { name: "高 句 麗 長 壽 王 遷 平 壤", pos: [600, 290], color: "#3730a3", size: 12 }
    ],
    cities: [
      { name: "建康 (劉宋京師)", pos: [530, 365], isCap: true },
      { name: "平城 (北魏京師/大同)", pos: [495, 275], isCap: true },
      { name: "統萬城 (大夏國都)", pos: [465, 305], isCap: true },
      { name: "長安 (西秦/大夏爭奪)", pos: [460, 335], isCap: false },
      { name: "廣固 (南燕慕容超降)", pos: [530, 315], isCap: false }
    ],
    battles: [
      {
        name: "× 參合陂之戰 (拓跋珪大破後燕奪北方)",
        pos: [505, 270],
        battleId: "battle_canhebei_395",
        year: 395
      },
      {
        name: "× 卻月陣之戰 (劉裕百艘戰船戰車破魏騎)",
        pos: [495, 330],
        battleId: "battle_queyuezhen_417",
        year: 417
      }
    ]
  },
  {
    id: "ce_495",
    yearNumber: 495,
    yearDisplay: "西元 495 年",
    shortLabel: "孝文帝遷洛漢化",
    headline: "北魏太和遷都洛陽全盤漢化，南北朝文華鼎盛對峙",
    subTitle: "孝文帝拓跋宏遷都洛陽 · 禁胡服斷北語改漢姓元氏 · 推行均田制與三長制 · 南齊蕭鸞定都建康隔淮相望",
    chronicleLeft: [
      "北魏孝文帝拓跋宏力排保守派反對，自塞北平城遷都故都洛陽",
      "厲行太和改制：改鮮卑拓跋姓為元氏、禁胡服胡語、推行漢族通婚",
      "南齊蕭道成、蕭鸞定都建康，南北以長江淮水為鐵血分界拉鋸"
    ],
    chronicleRight: [
      "北魏實行均田制與三長制，胡漢融和，北方人口復甦突破三千萬",
      "南北朝對峙體制趨於成熟，文化科學鼎盛（祖沖之、賈思勰、酈道元）"
    ],
    provinceWarlordMap: {
      henan: { warlord: "北魏新都洛陽 (孝文帝太和漢化中心)", color: "#0284c7" },
      shaanxi: { warlord: "北魏雍州長安關中重鎮", color: "#0284c7" },
      shanxi: { warlord: "北魏晉陽并州軍事行臺", color: "#0284c7" },
      hebei: { warlord: "北魏冀州定州漢人士家望族", color: "#38bdf8" },
      shandong: { warlord: "北魏齊州青州齊魯文脈", color: "#38bdf8" },
      beijing: { warlord: "北魏幽州薊城", color: "#38bdf8" },
      tianjin: { warlord: "北魏海防", color: "#38bdf8" },
      liaoning: { warlord: "北魏營州安東", color: "#38bdf8" },
      gansu: { warlord: "北魏涼州河西莫高窟敦煌", color: "#0284c7" },
      "inner-mongolia": { warlord: "北魏懷朔武川六鎮邊防軍", color: "#0369a1" },
      "ningxia-hui": { warlord: "北魏薄骨律鎮", color: "#0284c7" },
      jiangsu: { warlord: "南朝蕭齊 (建康，齊明帝蕭鸞)", color: "#10b981" },
      zhejiang: { warlord: "南齊三吳魚米之鄉", color: "#10b981" },
      anhui: { warlord: "南齊淮南壽陽與鐘離重鎮", color: "#34d399" },
      hubei: { warlord: "南齊荊州江陵蕭氏藩王重鎮", color: "#059669" },
      hunan: { warlord: "南齊湘江各郡", color: "#10b981" },
      jiangxi: { warlord: "南齊江州豫章廬山", color: "#10b981" },
      sichuan: { warlord: "南齊益州天府成都", color: "#10b981" },
      chongqing: { warlord: "南齊巴東三峽要塞", color: "#10b981" },
      fujian: { warlord: "南齊晉安郡海貿繁興", color: "#10b981" },
      guangdong: { warlord: "南齊廣州南海市舶", color: "#10b981" },
      guangxi: { warlord: "南齊交廣俚獠部落", color: "#10b981" },
      guizhou: { warlord: "西南僚獠諸族", color: "#e2e8f0" },
      yunnan: { warlord: "南中爨氏大姓代傳自治", color: "#e2e8f0" },
      qinghai: { warlord: "吐谷渾王國伏連籌強盛通好兩朝", color: "#a855f7" },
      xinjiang: { warlord: "高昌國麴氏立國臣服北魏", color: "#e2e8f0" },
      jilin: { warlord: "高句麗文諮明王東方盛期", color: "#cbd5e1" },
      heilongjiang: { warlord: "勿吉各部向北魏朝貢", color: "#cbd5e1" },
      shanghai: { warlord: "南齊三吳之海口", color: "#10b981" }
    },
    labels: [
      { name: "北 魏 孝 文 帝 遷 洛 陽", pos: [495, 328], color: "#0369a1", size: 15 },
      { name: "懷 朔 武 川 六 鎮 邊 兵", pos: [480, 255], color: "#1e3a8a", size: 13 },
      { name: "南 齊 建 康 蕭 氏 皇 朝", pos: [530, 365], color: "#065f46", size: 14 },
      { name: "淮 漢 鐵 血 拉 鋸 邊 界", pos: [505, 355], color: "#b91c1c", size: 12 },
      { name: "吐 谷 渾 青 海 道 絲 路", pos: [390, 325], color: "#6b21a8", size: 12 }
    ],
    cities: [
      { name: "洛陽 (北魏太和新都)", pos: [495, 328], isCap: true },
      { name: "建康 (南齊京師)", pos: [530, 365], isCap: true },
      { name: "平城 (北魏舊京大同)", pos: [495, 275], isCap: false },
      { name: "江陵 (南齊荊州要鎮)", pos: [490, 385], isCap: false },
      { name: "鐘離 (淮水天險蚌埠)", pos: [520, 360], isCap: false }
    ],
    battles: [
      {
        name: "× 鐘離之戰 (韋睿曹景宗火攻大破北魏)",
        pos: [520, 360],
        battleId: "battle_zhongli_507",
        year: 507
      }
    ]
  },
  {
    id: "ce_534",
    yearNumber: 534,
    yearDisplay: "西元 534 年",
    shortLabel: "東西魏分裂",
    headline: "六鎮兵變北魏裂為東西魏，高歡宇文泰雙雄並立",
    subTitle: "爾朱榮河陰之變引爆浩劫 · 高歡定都鄴城立東魏 · 宇文泰擁孝武帝都長安立西魏 · 蕭衍南梁崇佛四十年",
    chronicleLeft: [
      "北魏六鎮起義爆發，爾朱榮發動河陰之變屠戮百官",
      "高歡擁立孝靜帝遷都鄴城立東魏；宇文泰迎孝武帝都長安立西魏",
      "西魏宇文泰沙苑之戰以萬人破高歡二十萬，開創『府兵制』"
    ],
    chronicleRight: [
      "西魏八柱國十二大將軍體制孕育出橫跨隋唐之『關隴貴族集團』",
      "南梁梁武帝蕭衍崇佛四十年，江南三吳承平日久文風鼎盛"
    ],
    provinceWarlordMap: {
      henan: { warlord: "高歡東魏大軍兼併中原洛陽河南", color: "#38bdf8" },
      hebei: { warlord: "東魏京畿首善鄴城 (高歡父子神武霸業)", color: "#0284c7" },
      shandong: { warlord: "東魏青齊平原沃野", color: "#38bdf8" },
      shanxi: { warlord: "高歡霸府太原晉陽大營", color: "#0284c7" },
      beijing: { warlord: "東魏幽州安平", color: "#38bdf8" },
      tianjin: { warlord: "東魏海防", color: "#38bdf8" },
      liaoning: { warlord: "東魏平州", color: "#38bdf8" },
      shaanxi: { warlord: "宇文泰西魏朝廷關中長安 (八柱國創立府兵制)", color: "#6366f1" },
      gansu: { warlord: "西魏秦州隴右門戶", color: "#6366f1" },
      "inner-mongolia": { warlord: "柔然汗國南下寇掠邊塞", color: "#ca8a04" },
      "ningxia-hui": { warlord: "西魏原州夏州", color: "#6366f1" },
      jiangsu: { warlord: "南朝蕭梁 (梁武帝蕭衍定都建康)", color: "#10b981" },
      zhejiang: { warlord: "蕭梁三吳繁富千里寺廟林立", color: "#10b981" },
      anhui: { warlord: "蕭梁淮南合肥壽春防禦", color: "#34d399" },
      hubei: { warlord: "蕭梁荊州江陵湘東王蕭繹", color: "#059669" },
      hunan: { warlord: "蕭梁湘江諸郡", color: "#10b981" },
      jiangxi: { warlord: "蕭梁江州慧遠佛教名山", color: "#10b981" },
      sichuan: { warlord: "蕭梁武陵王蕭紀坐鎮成都益州", color: "#10b981" },
      chongqing: { warlord: "蕭梁巴東三峽", color: "#10b981" },
      fujian: { warlord: "蕭梁晉安郡", color: "#10b981" },
      guangdong: { warlord: "蕭梁嶺南冼夫人統率俚僚護境", color: "#10b981" },
      guangxi: { warlord: "蕭梁交廣部落", color: "#10b981" },
      guizhou: { warlord: "西南各族", color: "#e2e8f0" },
      yunnan: { warlord: "爨氏自治", color: "#e2e8f0" },
      qinghai: { warlord: "吐谷渾王國夸呂", color: "#a855f7" },
      xinjiang: { warlord: "高昌國麴氏", color: "#e2e8f0" },
      jilin: { warlord: "高句麗安臧王", color: "#cbd5e1" },
      heilongjiang: { warlord: "靺鞨部族", color: "#cbd5e1" },
      shanghai: { warlord: "蕭梁三吳東境", color: "#10b981" }
    },
    labels: [
      { name: "高 歡 東 魏 (鄴城太原)", pos: [505, 305], color: "#0369a1", size: 14 },
      { name: "宇 文 泰 西 魏 (長安八柱國)", pos: [460, 335], color: "#3730a3", size: 14 },
      { name: "梁 武 帝 四 十 年 太 平 (建康)", pos: [530, 365], color: "#065f46", size: 14 },
      { name: "沙 苑 決 戰 (渭河奇襲)", pos: [472, 332], color: "#b91c1c", size: 12 },
      { name: "嶺 南 冼 夫 人 保 境 安 民", pos: [480, 470], color: "#047857", size: 12 }
    ],
    cities: [
      { name: "鄴城 (東魏都城)", pos: [505, 305], isCap: true },
      { name: "長安 (西魏都城)", pos: [460, 335], isCap: true },
      { name: "建康 (蕭梁京師)", pos: [530, 365], isCap: true },
      { name: "晉陽 (高歡軍事霸府)", pos: [485, 295], isCap: false },
      { name: "江陵 (湘東王蕭繹重鎮)", pos: [490, 385], isCap: false }
    ],
    battles: [
      {
        name: "× 沙苑之戰 (宇文泰以弱勝強破高歡二十萬大軍)",
        pos: [472, 332],
        battleId: "battle_shayan_537",
        year: 537
      }
    ]
  },
  {
    id: "ce_589",
    yearNumber: 589,
    yearDisplay: "西元 589 年",
    shortLabel: "隋滅陳統一天下",
    headline: "賀若弼韓擒虎金陵破城，四百年南北分裂復歸一統",
    subTitle: "隋文帝楊堅平滅南陳 · 擒陳後主於景陽井 · 魏晉南北朝四百年分裂落幕 · 開創隋唐三百年盛世大一統",
    chronicleLeft: [
      "隋文帝楊堅命晉王楊廣、楊素、賀若弼、韓擒虎統兵五十一萬伐陳",
      "韓擒虎五百騎夜渡採石疾馳建康，攻破朱雀門擒陳後主於景陽井",
      "嶺南冼夫人率百越全境奉詔歸隋，南陳滅亡，南北一統"
    ],
    chronicleRight: [
      "自西晉永嘉之亂二百七十八載南北大分裂徹底終結",
      "隋朝創立三省六部制、科舉制與開鑿大運河，開創隋唐四百年極盛期"
    ],
    provinceWarlordMap: {
      shaanxi: { warlord: "大隋帝國京師 (大興城/長安，隋文帝楊堅)", color: "#f59e0b" },
      henan: { warlord: "大隋洛陽東都", color: "#f59e0b" },
      hebei: { warlord: "大隋河北定州安平", color: "#fbbf24" },
      shanxi: { warlord: "大隋太原留守", color: "#f59e0b" },
      shandong: { warlord: "大隋齊州齊魯之地", color: "#fbbf24" },
      beijing: { warlord: "大隋幽州薊城", color: "#fbbf24" },
      tianjin: { warlord: "大隋海防", color: "#fbbf24" },
      liaoning: { warlord: "大隋遼西營州", color: "#fbbf24" },
      gansu: { warlord: "大隋涼州絲路商道", color: "#f59e0b" },
      sichuan: { warlord: "大隋楊素造五牙大艦自巴蜀順流東下", color: "#f59e0b" },
      chongqing: { warlord: "大隋水軍破三峽陳軍防線", color: "#f59e0b" },
      hubei: { warlord: "大隋水陸兼征破荊襄南下", color: "#f59e0b" },
      anhui: { warlord: "賀若弼合肥出兵火攻白土破陣", color: "#f59e0b" },
      jiangsu: { warlord: "韓擒虎夜渡長江直搗建康朱雀門 (南陳滅亡)", color: "#f59e0b" },
      zhejiang: { warlord: "大隋平定三吳故陳各郡", color: "#fde68a" },
      hunan: { warlord: "大隋平定湘南", color: "#fde68a" },
      jiangxi: { warlord: "大隋經略江州九江", color: "#fde68a" },
      fujian: { warlord: "大隋泉州閩越歸附", color: "#fde68a" },
      guangdong: { warlord: "冼夫人奉隋詔安撫嶺南百越全部歸順", color: "#fde68a" },
      guangxi: { warlord: "大隋交趾諸郡平定", color: "#fde68a" },
      guizhou: { warlord: "西南夷部向大隋朝貢", color: "#e2e8f0" },
      yunnan: { warlord: "南中大姓降隋置州", color: "#e2e8f0" },
      "inner-mongolia": { warlord: "突厥汗國沙缽略向隋稱藩", color: "#cbd5e1" },
      "ningxia-hui": { warlord: "大隋靈州塞上防務", color: "#f59e0b" },
      qinghai: { warlord: "吐谷渾王國步迦可汗", color: "#a855f7" },
      xinjiang: { warlord: "西域伊吾鄯善入朝大隋", color: "#e2e8f0" },
      jilin: { warlord: "高句麗嬰陽王戒備隋朝", color: "#cbd5e1" },
      heilongjiang: { warlord: "靺鞨向隋稱臣", color: "#cbd5e1" },
      shanghai: { warlord: "大隋江南直轄", color: "#fde68a" }
    },
    labels: [
      { name: "大 隋 開 皇 統 一 天 下", pos: [495, 328], color: "#b45309", size: 16 },
      { name: "隋 大 興 城 (長安新都)", pos: [460, 335], color: "#b45309", size: 14 },
      { name: "建 康 城 陷 (陳後主降)", pos: [530, 365], color: "#b91c1c", size: 14 },
      { name: "楊 素 五 牙 樓 船 順 江 下", pos: [475, 385], color: "#d97706", size: 12 },
      { name: "冼 夫 人 率 嶺 南 全 境 歸 隋", pos: [480, 470], color: "#047857", size: 12 }
    ],
    cities: [
      { name: "大興城 (大隋京師/長安)", pos: [460, 335], isCap: true },
      { name: "建康 (南陳故都)", pos: [530, 365], isCap: false },
      { name: "洛陽 (大隋東京重鎮)", pos: [495, 328], isCap: false },
      { name: "廣陵/揚州 (江都門戶)", pos: [530, 355], isCap: false },
      { name: "江陵 (荊襄水師樞紐)", pos: [490, 385], isCap: false }
    ],
    battles: [
      {
        name: "× 隋滅陳建康之戰 (韓擒虎破朱雀門擒陳後主)",
        pos: [530, 365],
        battleId: "battle_suipingchen_589",
        year: 589
      }
    ]
  }
];
