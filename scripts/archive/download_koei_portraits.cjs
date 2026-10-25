const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'images', 'figures');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const figures = [
  { id: 'cao_cao', filename: '曹操.jpg' },
  { id: 'liu_bei', filename: '刘备.jpg' },
  { id: 'sun_quan', filename: '孙权.jpg' },
  { id: 'zhuge_liang', filename: '诸葛亮.jpg' },
  { id: 'guan_yu', filename: '关羽.jpg' },
  { id: 'zhou_yu', filename: '周瑜.jpg' },
  { id: 'sima_yi', filename: '司马懿.jpg' },
  { id: 'lu_xun', filename: '陆逊.jpg' },
  { id: 'zhao_yun', filename: '赵云.jpg' },
  { id: 'zhang_fei', filename: '张飞.jpg' },
  { id: 'lv_bu', filename: '吕布.jpg' },
  { id: 'yuan_shao', filename: '袁绍.jpg' },
  { id: 'sun_ce', filename: '孙策.jpg' },
  { id: 'dong_zhuo', filename: '董卓.jpg' },
  { id: 'guo_jia', filename: '郭嘉.jpg' },
  { id: 'lu_su', filename: '鲁肃.jpg' },
  { id: 'xun_yu', filename: '荀彧.jpg' },
  { id: 'pang_tong', filename: '庞统.jpg' },
  { id: 'ma_chao', filename: '马超.jpg' },
  { id: 'huang_zhong', filename: '黄忠.jpg' },
  { id: 'wei_yan', filename: '魏延.jpg' },
  { id: 'jiang_wei', filename: '姜维.jpg' }
];

function download(fig) {
  return new Promise((resolve) => {
    const url = 'https://raw.githubusercontent.com/renmu123/koei_san_character_img/master/san/311_s/' + encodeURIComponent(fig.filename);
    const dest = path.join(targetDir, `${fig.id}.jpg`);
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
  console.log('Downloading Koei 311 character portraits...');
  for (const f of figures) {
    await download(f);
  }
  console.log('Finished downloading portraits!');
}

run();
