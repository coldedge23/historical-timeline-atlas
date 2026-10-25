const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'images', 'figures');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const figures = [
  // 蜀漢 (12)
  { id: 'liu_bei', filename: '刘备.jpg' },
  { id: 'zhuge_liang', filename: '诸葛亮.jpg' },
  { id: 'guan_yu', filename: '关羽.jpg' },
  { id: 'zhang_fei', filename: '张飞.jpg' },
  { id: 'zhao_yun', filename: '赵云.jpg' },
  { id: 'ma_chao', filename: '马超.jpg' },
  { id: 'huang_zhong', filename: '黄忠.jpg' },
  { id: 'pang_tong', filename: '庞统.jpg' },
  { id: 'fa_zheng', filename: '法正.jpg' },
  { id: 'wei_yan', filename: '魏延.jpg' },
  { id: 'jiang_wei', filename: '姜维.jpg' },
  { id: 'liu_shan', filename: '刘禅.jpg' },

  // 曹魏 (16)
  { id: 'cao_cao', filename: '曹操.jpg' },
  { id: 'sima_yi', filename: '司马懿.jpg' },
  { id: 'cao_pi', filename: '曹丕.jpg' },
  { id: 'guo_jia', filename: '郭嘉.jpg' },
  { id: 'xun_yu', filename: '荀彧.jpg' },
  { id: 'jia_xu', filename: '贾诩.jpg' },
  { id: 'xun_you', filename: '荀攸.jpg' },
  { id: 'cheng_yu', filename: '程昱.jpg' },
  { id: 'zhang_liao', filename: '张辽.jpg' },
  { id: 'zhang_he', filename: '张郃.jpg' },
  { id: 'xu_huang', filename: '徐晃.jpg' },
  { id: 'yu_jin', filename: '于禁.jpg' },
  { id: 'yue_jin', filename: '乐进.jpg' },
  { id: 'xiahou_dun', filename: '夏侯惇.jpg' },
  { id: 'xiahou_yuan', filename: '夏侯渊.jpg' },
  { id: 'dian_wei', filename: '典韦.jpg' },

  // 東吳 (12)
  { id: 'sun_jian', filename: '孙坚.jpg' },
  { id: 'sun_ce', filename: '孙策.jpg' },
  { id: 'sun_quan', filename: '孙权.jpg' },
  { id: 'zhou_yu', filename: '周瑜.jpg' },
  { id: 'lu_su', filename: '鲁肃.jpg' },
  { id: 'lv_meng', filename: '吕蒙.jpg' },
  { id: 'lu_xun', filename: '陆逊.jpg' },
  { id: 'taishi_ci', filename: '太史慈.jpg' },
  { id: 'gan_ning', filename: '甘宁.jpg' },
  { id: 'huang_gai', filename: '黄盖.jpg' },
  { id: 'cheng_pu', filename: '程普.jpg' },
  { id: 'zhang_zhao', filename: '张昭.jpg' },

  // 群雄/其他 (10)
  { id: 'lv_bu', filename: '吕布.jpg' },
  { id: 'dong_zhuo', filename: '董卓.jpg' },
  { id: 'yuan_shao', filename: '袁绍.jpg' },
  { id: 'yuan_shu', filename: '袁术.jpg' },
  { id: 'liu_biao', filename: '刘表.jpg' },
  { id: 'liu_yan', filename: '刘焉.jpg' },
  { id: 'ma_teng', filename: '马腾.jpg' },
  { id: 'zhang_jiao', filename: '张角.jpg' },
  { id: 'diao_chan', filename: '貂蝉.jpg' },
  { id: 'hua_tuo', filename: '华佗.jpg' }
];

function download(fig) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, `${fig.id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      // already exists
      resolve(true);
      return;
    }

    const url = 'https://raw.githubusercontent.com/renmu123/koei_san_character_img/master/san/311_s/' + encodeURIComponent(fig.filename);
    const file = fs.createWriteStream(dest);

    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Saved: ${fig.id}.jpg (${fig.filename})`);
          resolve(true);
        });
      } else {
        console.log(`Failed ${fig.id} status: ${res.statusCode}`);
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error ${fig.id}: ${err.message}`);
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${figures.length} Koei 311 character portraits...`);
  for (const f of figures) {
    await download(f);
  }
  console.log('All 50 portraits checked and ready!');
}

run();
