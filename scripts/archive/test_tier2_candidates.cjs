const fs = require('fs');

const koeiNames = new Set(JSON.parse(fs.readFileSync('all_koei_names.json', 'utf8')));

// 100 candidates to add
const candidates = [
  // ===== 蜀漢 (25人) =====
  { id: 'jiang_wan', name: '蔣琬', file: '蒋琬.jpg', faction: 'shu' },
  { id: 'fei_yi', name: '費禕', file: '费祎.jpg', faction: 'shu' },
  { id: 'dong_yun', name: '董允', file: '董允.jpg', faction: 'shu' },
  { id: 'ma_liang', name: '馬良', file: '马良.jpg', faction: 'shu' },
  { id: 'ma_su', name: '馬謖', file: '马谡.jpg', faction: 'shu' },
  { id: 'sun_qian', name: '孫乾', file: '孙乾.jpg', faction: 'shu' },
  { id: 'mi_zhu', name: '麋竺', file: '糜竺.jpg', faction: 'shu' }, // check 糜竺
  { id: 'mi_fang', name: '麋芳', file: '糜芳.jpg', faction: 'shu' }, // check 糜芳
  { id: 'jian_yong', name: '簡雍', file: '简雍.jpg', faction: 'shu' },
  { id: 'liao_hua', name: '廖化', file: '廖化.jpg', faction: 'shu' },
  { id: 'guan_ping', name: '關平', file: '关平.jpg', faction: 'shu' },
  { id: 'guan_xing', name: '關興', file: '关兴.jpg', faction: 'shu' },
  { id: 'zhang_bao', name: '張苞', file: '张苞.jpg', faction: 'shu' },
  { id: 'liu_feng', name: '劉封', file: '刘封.jpg', faction: 'shu' },
  { id: 'meng_da', name: '孟達', file: '孟达.jpg', faction: 'shu' },
  { id: 'yan_yan', name: '嚴顏', file: '严颜.jpg', faction: 'shu' },
  { id: 'huang_quan', name: '黃權', file: '黄权.jpg', faction: 'shu' },
  { id: 'wang_ping', name: '王平', file: '王平.jpg', faction: 'shu' },
  { id: 'zhang_yi_ji', name: '張嶷', file: '张嶷.jpg', faction: 'shu' },
  { id: 'zhang_yi_bo', name: '張翼', file: '张翼.jpg', faction: 'shu' },
  { id: 'deng_zhi', name: '鄧芝', file: '邓芝.jpg', faction: 'shu' },
  { id: 'qiao_zhou', name: '譙周', file: '谯周.jpg', faction: 'shu' },
  { id: 'yue_ying', name: '黃月英', file: '黄月英.jpg', faction: 'shu' },
  { id: 'xu_shu', name: '徐庶', file: '徐庶.jpg', faction: 'shu' },
  { id: 'zhuge_zhan', name: '諸葛瞻', file: '诸葛瞻.jpg', faction: 'shu' },

  // ===== 曹魏 (35人) =====
  { id: 'xu_chu', name: '許褚', file: '许褚.jpg', faction: 'wei' },
  { id: 'cao_ren', name: '曹仁', file: '曹仁.jpg', faction: 'wei' },
  { id: 'cao_hong', name: '曹洪', file: '曹洪.jpg', faction: 'wei' },
  { id: 'cao_zhen', name: '曹真', file: '曹真.jpg', faction: 'wei' },
  { id: 'cao_xiu', name: '曹休', file: '曹休.jpg', faction: 'wei' },
  { id: 'cao_zhi', name: '曹植', file: '曹植.jpg', faction: 'wei' },
  { id: 'cao_zhang', name: '曹彰', file: '曹彰.jpg', faction: 'wei' },
  { id: 'cao_rui', name: '曹叡', file: '曹叡.jpg', faction: 'wei' },
  { id: 'cao_shuang', name: '曹爽', file: '曹爽.jpg', faction: 'wei' },
  { id: 'sima_shi', name: '司馬師', file: '司马师.jpg', faction: 'wei' },
  { id: 'sima_zhao', name: '司馬昭', file: '司马昭.jpg', faction: 'wei' },
  { id: 'sima_yan', name: '司馬炎', file: '司马炎.jpg', faction: 'wei' },
  { id: 'deng_ai', name: '鄧艾', file: '邓艾.jpg', faction: 'wei' },
  { id: 'zhong_hui', name: '鍾會', file: '锺会.jpg', faction: 'wei' }, // note 锺会
  { id: 'zhong_yao', name: '鍾繇', file: '锺繇.jpg', faction: 'wei' }, // note 锺繇
  { id: 'chen_qun', name: '陳羣', file: '陈群.jpg', faction: 'wei' },
  { id: 'man_chong', name: '滿寵', file: '满宠.jpg', faction: 'wei' },
  { id: 'liu_ye', name: '劉曄', file: '刘晔.jpg', faction: 'wei' },
  { id: 'jiang_ji', name: '蔣濟', file: '蒋济.jpg', faction: 'wei' },
  { id: 'li_dian', name: '李典', file: '李典.jpg', faction: 'wei' },
  { id: 'pang_de', name: '龐德', file: '庞德.jpg', faction: 'wei' },
  { id: 'wen_pin', name: '文聘', file: '文聘.jpg', faction: 'wei' },
  { id: 'guo_huai', name: '郭淮', file: '郭淮.jpg', faction: 'wei' },
  { id: 'sun_li', name: '孫禮', file: '孙礼.jpg', faction: 'wei' },
  { id: 'chen_tai', name: '陳泰', file: '陈泰.jpg', faction: 'wei' },
  { id: 'yang_xiu', name: '楊修', file: '杨修.jpg', faction: 'wei' },
  { id: 'cai_wenji', name: '蔡琰', file: '蔡琰.jpg', faction: 'wei' },
  { id: 'zhen_ji', name: '甄氏', file: '甄氏.jpg', faction: 'wei' },
  { id: 'wang_lang_wei', name: '王朗', file: '王朗.jpg', faction: 'wei' },
  { id: 'hua_xin', name: '華歆', file: '华歆.jpg', faction: 'wei' },
  { id: 'wang_shuang', name: '王雙', file: '王双.jpg', faction: 'wei' },
  { id: 'hao_zhao', name: '郝昭', file: '郝昭.jpg', faction: 'wei' },
  { id: 'yang_hu', name: '羊祜', file: '羊祜.jpg', faction: 'wei' },
  { id: 'jia_chong', name: '賈充', file: '贾充.jpg', faction: 'wei' },
  { id: 'du_yu', name: '杜預', file: '杜预.jpg', faction: 'wei' },

  // ===== 東吳 (25人) =====
  { id: 'zhou_tai', name: '周泰', file: '周泰.jpg', faction: 'wu' },
  { id: 'ling_tong', name: '凌統', file: '凌统.jpg', faction: 'wu' },
  { id: 'pan_zhang', name: '潘璋', file: '潘璋.jpg', faction: 'wu' },
  { id: 'ding_feng', name: '丁奉', file: '丁奉.jpg', faction: 'wu' },
  { id: 'xu_sheng', name: '徐盛', file: '徐盛.jpg', faction: 'wu' },
  { id: 'han_dang', name: '韓當', file: '韩当.jpg', faction: 'wu' },
  { id: 'zhu_ran', name: '朱然', file: '朱然.jpg', faction: 'wu' },
  { id: 'lu_kang', name: '陸抗', file: '陆抗.jpg', faction: 'wu' },
  { id: 'zhuge_jin', name: '諸葛瑾', file: '诸葛瑾.jpg', faction: 'wu' },
  { id: 'zhuge_ke', name: '諸葛恪', file: '诸葛恪.jpg', faction: 'wu' },
  { id: 'gu_yong', name: '顧雍', file: '顾雍.jpg', faction: 'wu' },
  { id: 'bu_zhi', name: '步騭', file: '步骘.jpg', faction: 'wu' },
  { id: 'yu_fan', name: '虞翻', file: '虞翻.jpg', faction: 'wu' },
  { id: 'kan_ze', name: '闞澤', file: '阚泽.jpg', faction: 'wu' },
  { id: 'zhang_hong', name: '張紘', file: '张纮.jpg', faction: 'wu' },
  { id: 'sun_shangxiang', name: '孫尚香', file: '孙尚香.jpg', faction: 'wu' },
  { id: 'da_qiao', name: '大喬', file: '大乔.jpg', faction: 'wu' },
  { id: 'xiao_qiao', name: '小喬', file: '小乔.jpg', faction: 'wu' },
  { id: 'sun_huan', name: '孫桓', file: '孙桓.jpg', faction: 'wu' },
  { id: 'sun_yi', name: '孫翊', file: '孙翊.jpg', faction: 'wu' },
  { id: 'quan_zong', name: '全琮', file: '全琮.jpg', faction: 'wu' },
  { id: 'jiang_qin', name: '蔣欽', file: '蒋钦.jpg', faction: 'wu' },
  { id: 'chen_wu', name: '陳武', file: '陈武.jpg', faction: 'wu' },
  { id: 'dong_xi', name: '董襲', file: '董袭.jpg', faction: 'wu' },
  { id: 'sun_hao', name: '孫皓', file: '孙皓.jpg', faction: 'wu' },

  // ===== 群雄/其他 (15人) =====
  { id: 'gongsun_zan', name: '公孫瓚', file: '公孙瓒.jpg', faction: 'other' },
  { id: 'tian_feng', name: '田豐', file: '田丰.jpg', faction: 'other' },
  { id: 'ju_shou', name: '沮授', file: '沮授.jpg', faction: 'other' },
  { id: 'yan_liang', name: '顏良', file: '颜良.jpg', faction: 'other' },
  { id: 'wen_chou', name: '文醜', file: '文丑.jpg', faction: 'other' },
  { id: 'chen_gong', name: '陳宮', file: '陈宫.jpg', faction: 'other' },
  { id: 'gao_shun', name: '高順', file: '高顺.jpg', faction: 'other' },
  { id: 'zhang_xiu', name: '張繡', file: '张绣.jpg', faction: 'other' },
  { id: 'tao_qian', name: '陶謙', file: '陶谦.jpg', faction: 'other' },
  { id: 'kong_rong', name: '孔融', file: '孔融.jpg', faction: 'other' },
  { id: 'liu_zhang', name: '劉璋', file: '刘璋.jpg', faction: 'other' },
  { id: 'zhang_lu', name: '張魯', file: '张鲁.jpg', faction: 'other' },
  { id: 'han_sui', name: '韓遂', file: '韩遂.jpg', faction: 'other' },
  { id: 'meng_huo', name: '孟獲', file: '孟获.jpg', faction: 'other' },
  { id: 'zhu_rong', name: '祝融', file: '祝融.jpg', faction: 'other' }
];

console.log('Total candidates:', candidates.length);
let matched = 0;
let missing = [];
for (const c of candidates) {
  if (koeiNames.has(c.file)) {
    matched++;
  } else {
    missing.push(c);
  }
}
console.log('Matched:', matched, 'Missing:', missing.length);
if (missing.length > 0) {
  console.log('Missing items:', missing);
}
