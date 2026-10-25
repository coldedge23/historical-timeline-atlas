const https = require('https');

function checkKoei(path) {
  const url = 'https://raw.githubusercontent.com/renmu123/koei_san_character_img/master/' + path.split('/').map(encodeURIComponent).join('/');
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve(res.statusCode === 200 ? url : null);
    }).on('error', () => resolve(null));
  });
}

function getWikiThumb(title) {
  return new Promise((resolve) => {
    const url = 'https://zh.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=280';
    https.get(url, { headers: { 'User-Agent': 'HistoricalAtlasApp/1.0 (contact@ivanproject.org)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const p = Object.values(json.query.pages)[0];
          resolve(p?.thumbnail?.source || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function test() {
  const candidates = [
    { id: 'bao_shuya', koei: 'san/311_s/鲍叔牙.jpg' },
    { id: 'wu_qi', koei: 'san/311_s/吴起.jpg' },
    { id: 'zhang_yi', koei: 'san/311_s/张仪.jpg' },
    { id: 'qin_mugong', wiki: '秦穆公' },
    { id: 'baili_xi', wiki: '百里奚' },
    { id: 'zheng_zhuanggong', wiki: '郑庄公' },
    { id: 'song_xianggong', wiki: '宋襄公' },
    { id: 'wu_helv', wiki: '阖闾' },
    { id: 'wu_fuchai', wiki: '夫差' },
    { id: 'wen_zhong', wiki: '文种' },
    { id: 'jie_zitui', wiki: '介子推' },
    { id: 'cao_gui', wiki: '曹刿' },
    { id: 'xun_zi', wiki: '荀子' },
    { id: 'gui_guzi', wiki: '鬼谷子' },
    { id: 'li_kui', wiki: '李悝' },
    { id: 'shen_buhai', wiki: '申不害' },
    { id: 'su_qin', wiki: '苏秦' },
    { id: 'fan_ju', wiki: '范雎' },
    { id: 'mengchang_jun', wiki: '孟尝君' },
    { id: 'pingyuan_jun', wiki: '平原君' },
    { id: 'xinling_jun', wiki: '魏无忌' },
    { id: 'chunzhen_jun', wiki: '黄歇' },
    { id: 'mou_sui', wiki: '毛遂' },
    { id: 'zhao_she', wiki: '赵奢' },
    { id: 'wang_ben', wiki: '王贲' },
    { id: 'meng_ao', wiki: '蒙骜' },
    { id: 'sima_cuo', wiki: '司马错' },
    { id: 'xiang_yan', wiki: '项燕' },
    { id: 'qin_xiaogong', wiki: '秦孝公' },
    { id: 'qin_huiwenwang', wiki: '秦惠文王' },
    { id: 'qin_zhaoxiangwang', wiki: '秦昭襄王' },
    { id: 'xuan_taihou', wiki: '宣太后' },
    { id: 'wei_wenhou', wiki: '魏文侯' },
    { id: 'qi_weiwang', wiki: '齐威王' },
    { id: 'chu_huaiwang', wiki: '楚怀王' },
    { id: 'lv_buwei', wiki: '吕不韦' },
    { id: 'jing_ke', wiki: '荆轲' },
    { id: 'zheng_guo', wiki: '郑国 (水工)' },
    { id: 'yu_rang', wiki: '豫让' },
    { id: 'zhuan_zhu', wiki: '专诸' },
    { id: 'zou_yan', wiki: '邹衍' }
  ];

  for (const c of candidates) {
    let hit = null;
    if (c.koei) hit = await checkKoei(c.koei);
    if (!hit && c.wiki) hit = await getWikiThumb(c.wiki);
    console.log(c.id, hit ? 'OK' : 'MISSING', hit ? hit.slice(0, 50) : '');
    await new Promise(r => setTimeout(r, 100));
  }
}

test();
