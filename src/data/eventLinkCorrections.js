// 2026-10-30：事件ID別名白名單。消費端必須同時檢查 allowedFigureIds。
// evidence 來自現有專案文本，並不等同已經外部史料查證。
export const EVENT_ID_CORRECTIONS = {
  "warringStates:evt_wangjian_mie_liuguo_221": {
    "to": "evt_qin_unify_221",
    "allowedFigureIds": [
      "qin_shihuang",
      "wang_jian",
      "li_si",
      "meng_tian"
    ],
    "evidence": "現有 evt_qin_unify_221 年份為前221年，標題為秦始皇席捲六國統一天下；figureIds 明列秦始皇、王翦、李斯、蒙恬，summary 明列王翦、王賁、蒙恬與十年統一戰爭，各人物傳記亦記載相關行動。僅修事件ID別名，不把李牧或韓非自動連到前221年。"
  },
  "warringStates:evt_goujian_494": {
    "to": "evt_goujian_woxin_494",
    "allowedFigureIds": [
      "wu_zixu",
      "gou_jian",
      "fan_li",
      "xi_shi"
    ],
    "evidence": "舊ID與現有 evt_goujian_woxin_494 同為前494年勾踐事件；現有事件標題為夫椒之辱會稽入質與臥薪嚐膽，figureIds 明列伍子胥、勾踐、范蠡、西施，四人傳記均記載相對應情節。"
  },
  "warringStates:evt_guiling_353": {
    "to": "evt_guiling_354",
    "allowedFigureIds": [
      "sun_bin",
      "pang_juan"
    ],
    "evidence": "現有唯一桂陵之戰事件 evt_guiling_354 的標題、summary、figureIds 均明列孫臏與龐涓，兩人傳記均記載桂陵圍魏救趙；舊ID年份353與現有事件年份354不同，本次只消除失效別名，保留現有日期，並不判定哪個年份為史實。"
  },
  "warringStates:evt_hufuqishe_307": {
    "to": "evt_hufu_qishe_307",
    "allowedFigureIds": [
      "zhao_wulingwang"
    ],
    "evidence": "舊ID僅少一底線；現有事件 evt_hufu_qishe_307 為前307年趙武靈王胡服騎射，figureIds 只列 zhao_wulingwang，其傳記亦明記前307年推行胡服騎射。"
  },
  "warringStates:evt_leyi_poqi_284": {
    "to": "evt_jixi_284",
    "allowedFigureIds": [
      "le_yi",
      "tian_dan"
    ],
    "evidence": "現有 evt_jixi_284 為前284年樂毅五國合縱濟西大破齊，樂毅傳記明記前284年五國伐齊；田單傳記明記五國破齊、臨淄陷落、突圍保即墨。白起傳記沒有明記此事，故白起不在白名單。"
  },
  "warringStates:evt_wanbigui_zhao_279": {
    "to": "evt_linxiangru_bi_283",
    "allowedFigureIds": [
      "lin_xiangru",
      "lian_po"
    ],
    "evidence": "現有唯一完璧歸趙事件 evt_linxiangru_bi_283 標題同時收錄澠池之會與廉頗負荊請罪，figureIds 明列藺相如、廉頗；兩人傳記亦有相同情節。舊ID279與現有事件283不同，本次不改既有日期、不將這個綜合事件當作單一精確年份證據。"
  },
  "warringStates:evt_bizhi_597": {
    "to": "evt_bi_597",
    "allowedFigureIds": [
      "chu_zhuangwang"
    ],
    "evidence": "現有 evt_bi_597 為前597年楚莊王邲之戰，figureIds 明列 chu_zhuangwang；人物傳記也明記邲之戰大破晉國三軍，與舊ID同年同主題。"
  }
};
