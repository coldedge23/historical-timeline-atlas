// Owner-specific semantic decisions from literal local text. No raw IDs are removed.
// Keys: datasetId:figureId:eventId. These annotate background/legacy links, not historical verification.
export const CHRONOLOGY_LINK_DECISIONS = {
  "threeKingdoms:yang_hu:evt_wu_fall_280": {
    "type": "posthumous-influence",
    "label": "死後影響",
    "reason": "事件原文說採納遺策，對應死後戰略影響，不是羊祜在280年親自出征。",
    "evidence": {
      "ownerType": "event",
      "field": "summary",
      "quote": "晉武帝司馬炎採納羊祜遺策與杜預、張華建議，發二十餘萬大軍分六路伐吳。龍驤將軍王濬自巴蜀率巨型樓船順長江東下，以大木筏與火炬熔斷攔江鐵鎖，直抵建業受孫皓出降。",
      "figureID": "yang_hu",
      "eventID": "evt_wu_fall_280",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:zhang_ji:evt_wancheng_197": {
    "type": "background",
    "label": "歷史背景",
    "reason": "原文以遺孀身分說明宛城衝突背景，張濟不是197年戰役的親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "summary",
      "quote": "袁術於淮南壽春憑傳國玉璽僭號稱帝；曹操南征宛城受張繡投降，因納張濟遺孀鄒氏激怒張繡，張繡採賈詡計夜襲曹營，猛將典韋與長子曹昂戰死。",
      "figureID": "zhang_ji",
      "eventID": "evt_wancheng_197",
      "datasetID": "threeKingdoms"
    }
  },
  "weiJin:sima_yan:evt_bawang_291": {
    "type": "background",
    "label": "歷史背景",
    "reason": "原文以晉武帝駕崩交代惠帝與八王之亂背景；人物name亦明載晉武帝，不是291年起親自參與內亂。",
    "evidence": {
      "ownerType": "event",
      "field": "summary",
      "quote": "晉武帝崩，惠帝懦愚『何不食肉糜』，賈南風專權誅殺楊駿、汝南王。隨後趙王司馬倫、齊王、成都王、長沙王、東海王司馬越等八位同姓封王引邊塞胡騎血戰中原十六載，白骨蔽野。",
      "figureID": "sima_yan",
      "eventID": "evt_bawang_291",
      "datasetID": "weiJin"
    }
  },
  "threeKingdoms:guo_jia:evt_chibi_208": {
    "type": "posthumous-influence",
    "label": "死後影響",
    "reason": "本地傳記明說早逝後由曹操追悼，屬死後評述，不是郭嘉親自參戰；只判定本地文字的連結語意。",
    "evidence": {
      "ownerType": "figure",
      "field": "bio",
      "quote": "曹操麾下首席智囊奇謀家，荀彧舉薦入幕。提出「十勝十敗」振奮官渡軍心，料定孫策遇刺、遠征白狼山滅烏桓。英年早逝，赤壁敗後曹操痛哭「若奉孝在，不使孤至此」。",
      "figureID": "guo_jia",
      "eventID": "evt_chibi_208",
      "datasetID": "threeKingdoms"
    }
  },
  "xiaShangZhou:yu:evt_taikang_2000": {
    "type": "posthumous-influence",
    "label": "死後影響",
    "reason": "事件是在後人作品中引述大禹訓誡，不是大禹親自參與太康失國。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "太康畋獵百日不返，有窮后羿因民弗忍，距於河。太康五位弟姪作《五子之歌》述大禹訓誡，哀怨而泣。后羿立太康弟仲康為傀儡，隨後寒浞殺后羿自立，夏王室顛沛流離近百年。",
      "figureID": "yu",
      "eventID": "evt_taikang_2000",
      "datasetID": "xiaShangZhou"
    }
  },
  "xiaShangZhou:qi_xia:evt_taikang_2000": {
    "type": "background",
    "label": "歷史背景",
    "reason": "原文以夏啟去世交代繼位背景，並非夏啟親自參與後續失國。",
    "evidence": {
      "ownerType": "event",
      "field": "summary",
      "quote": "夏啟崩，子太康繼位，荒淫無度，離宮前往洛水以南畋獵百日不歸。東夷有窮氏首領后羿善射，乘國人怨恨起兵奪取國都斟鄩，阻斷太康歸路。太康流亡洛北，后羿攝掌夏政。",
      "figureID": "qi_xia",
      "eventID": "evt_taikang_2000",
      "datasetID": "xiaShangZhou"
    }
  },
  "warringStates:shang_yang:evt_hanfeizi_qin_233": {
    "type": "posthumous-influence",
    "label": "死後影響",
    "reason": "原文談韓非子採納前人學說，商鞅是思想來源，不是在前233年親自參與。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "韓非子融合商鞅之「法」、申不害之「術」、慎到之「勢」，構建起古代中國最嚴密、最完備之法家君主專制中央集權理論體系。秦始皇統一天下後推行郡縣制、車同軌書同文、統一度量衡與法令嚴明，全盤承襲韓非學說。",
      "figureID": "shang_yang",
      "eventID": "evt_hanfeizi_qin_233",
      "datasetID": "warringStates"
    }
  },
  "warringStates:kong_zi:evt_qihuan_kuikou_651": {
    "type": "later-commentary",
    "label": "後世評述",
    "reason": "原文是後世孔子的評價文字，不能把孔子列為出生前前651年會盟的親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "孔子高度評價管仲與齊桓公：「管仲相桓公，霸諸侯，一匡天下，民到于今受其賜。微管仲，吾其被髮左衽矣。」齊桓公以「尊王攘夷」為號召，北伐山戎解燕國之危、南服強楚令其向王室貢包茅，維護了中原華夏文明主體。",
      "figureID": "kong_zi",
      "eventID": "evt_qihuan_kuikou_651",
      "datasetID": "warringStates"
    }
  },
  "warringStates:han_feizi:evt_shenbuhai_351": {
    "type": "later-commentary",
    "label": "後世評述",
    "reason": "原文明示後世思想總結，不能把韓非子列為出生前前351年申不害變法的親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "韓非子總結法家思想時稱：「申不害言術，而商鞅言法。」申不害的術治重在防奸審臣與加強君權集中，同時極大推動了韓國鐵器冶煉與軍工鑄造發展，號稱「天下之強弓勁弩皆自韓出，陸斷牛馬，水截鵠雁，超遠洞堅」。",
      "figureID": "han_feizi",
      "eventID": "evt_shenbuhai_351",
      "datasetID": "warringStates"
    }
  },
  "threeKingdoms:zhuge_liang:evt_shu_fall_263": {
    "type": "background",
    "label": "歷史背景",
    "reason": "事件僅以親屬身分介紹諸葛瞻與諸葛尚；諸葛亮本人不是263年戰役親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "面對劍閣銅牆鐵壁，鍾會糧盡欲退。鄧艾毅然出奇兵，自陰平鑿山造橋，將士以毛氈裹身滾下萬丈懸崖，直插蜀漢腹地江油。諸葛亮之子諸葛瞻與長孫諸葛尚於綿竹力戰殉國，劉禪採譙周之議投降，立國四十三年的蜀漢滅亡。次年姜維策反鍾會謀復漢室，事敗與鄧艾、鍾會皆死於成都兵變。",
      "figureID": "zhuge_liang",
      "eventID": "evt_shu_fall_263",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:sun_jian:evt_wu_found_229": {
    "type": "commemoration",
    "label": "死後追尊",
    "reason": "原文明示追尊，應作死後紀念關聯，不是229年本人參與稱帝。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "孫權追尊父孫堅為武烈皇帝、兄孫策為長沙桓王。面對孫權稱帝，蜀漢群臣多主張絕交，唯丞相諸葛亮深明大局，力主維護吳蜀同盟，派陳震與孫權於武昌登壇歃血為盟，約定滅魏後平分中原九州。",
      "figureID": "sun_jian",
      "eventID": "evt_wu_found_229",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:sun_ce:evt_wu_found_229": {
    "type": "commemoration",
    "label": "死後追尊",
    "reason": "同句「孫權追尊父孫堅為武烈皇帝、兄孫策為長沙桓王」明示追尊，不是229年本人參與稱帝。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "孫權追尊父孫堅為武烈皇帝、兄孫策為長沙桓王。面對孫權稱帝，蜀漢群臣多主張絕交，唯丞相諸葛亮深明大局，力主維護吳蜀同盟，派陳震與孫權於武昌登壇歃血為盟，約定滅魏後平分中原九州。",
      "figureID": "sun_ce",
      "eventID": "evt_wu_found_229",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:lu_xun:evt_xiling_272": {
    "type": "background",
    "label": "歷史背景",
    "reason": "原文用父子身分介紹陸抗；陸遜不是272年戰役的親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "summary",
      "quote": "東吳西陵督步闡獻城降晉，西晉車騎將軍羊祜、荊州刺史楊肇率大軍分路接應。東吳大都督陸抗（陸遜之子）構築嚴密圍城打援防線，夜破楊肇、攻克西陵誅步闡。",
      "figureID": "lu_xun",
      "eventID": "evt_xiling_272",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:dong_zhuo:evt_xiapi_198": {
    "type": "background",
    "label": "歷史背景",
    "reason": "此處是人物引述過往事例，不代表董卓親身參與198年下邳戰役。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "圍城三個月間，呂布猜忌陳宮、高順而不納其犄角之策。部將侯成、宋憲、魏續反叛縛陳宮出降，呂布於白門樓乞降，劉備提醒曹操「公不見丁原、董卓之事乎」，曹操遂縊殺呂布。陳宮從容赴死，張遼率部歸降曹操。",
      "figureID": "dong_zhuo",
      "eventID": "evt_xiapi_198",
      "datasetID": "threeKingdoms"
    }
  },
  "threeKingdoms:ding_yuan:evt_xiapi_198": {
    "type": "background",
    "label": "歷史背景",
    "reason": "此處是人物引述過往事例，不代表丁原親身參與198年下邳戰役。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "圍城三個月間，呂布猜忌陳宮、高順而不納其犄角之策。部將侯成、宋憲、魏續反叛縛陳宮出降，呂布於白門樓乞降，劉備提醒曹操「公不見丁原、董卓之事乎」，曹操遂縊殺呂布。陳宮從容赴死，張遼率部歸降曹操。",
      "figureID": "ding_yuan",
      "eventID": "evt_xiapi_198",
      "datasetID": "threeKingdoms"
    }
  },
  "suiTang:bai_juyi:evt_mawei_mutiny_756": {
    "type": "later-commentary",
    "label": "後世評述",
    "reason": "原文連向後世詩歌詮釋；白居易未出生於756年，不能視為馬嵬事件親身參與者。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "盛唐極度浪漫與殘酷政治崩塌之千古悲劇，白居易《長恨歌》傳唱千年之絕唱。",
      "figureID": "bai_juyi",
      "eventID": "evt_mawei_mutiny_756",
      "datasetID": "suiTang"
    }
  },
  "yuanMing:fig_kublai_khan:evt_ym_08": {
    "type": "background",
    "label": "歷史背景",
    "reason": "原文描述後代家系與汗位延續的歷史背景，不是忽必烈本人1388年親自參戰。",
    "evidence": {
      "ownerType": "event",
      "field": "detail",
      "quote": "脫古思帖木兒西奔途中被阿里不哥後裔也速迭兒縊殺，忽必烈嫡系黃金家族汗位斷絕，蒙古陷入瓦剌與韃靼百年混戰。",
      "figureID": "fig_kublai_khan",
      "eventID": "evt_ym_08",
      "datasetID": "yuanMing"
    }
  }
};
