const fs = require('fs');

const allKoei = JSON.parse(fs.readFileSync('all_koei_names.json', 'utf8'));
const usedFiles = new Set(JSON.parse(fs.readFileSync('used_koei_files.json', 'utf8')));

// Non-TK or NPC
const nonTK = new Set([
  '士兵.jpg', '传令.jpg', '都督.jpg', '武将.jpg', '文官.jpg', '仙人.jpg', '童子.jpg', '贼将.jpg', '山贼.jpg',
  '乌丸头目.jpg', '乌丸武将.jpg', '羌头目.jpg', '羌武将.jpg', '南蛮头目.jpg', '南蛮武将.jpg', '贼头目.jpg',
  '黄巾头目.jpg', '黄巾武将.jpg', '商人.jpg', '侍女.jpg', '老人.jpg', '农民.jpg', '劳动者.jpg', '医生.jpg',
  '北斗.jpg', '南斗.jpg', '管辂.jpg', '左慈.jpg', '紫虚上人.jpg', '于吉.jpg', '使者.jpg', '守卫.jpg',
  // Ancient sages
  '乐毅.jpg', '韩信.jpg', '白起.jpg', '张良.jpg', '刘邦.jpg', '项羽.jpg', '萧何.jpg', '英布.jpg', '范增.jpg',
  '彭越.jpg', '吕雉.jpg', '虞姬.jpg', '管仲.jpg', '鲍叔牙.jpg', '孙武.jpg', '吴起.jpg', '李斯.jpg', '蔺相如.jpg',
  '廉颇.jpg', '李牧.jpg', '王翦.jpg', '蒙恬.jpg', '屈原.jpg', '孔丘.jpg', '岳飞.jpg', '秦琼.jpg', '尉迟恭.jpg',
  '李靖.jpg', '秦良玉.jpg', '郑成功.jpg', '养由基.jpg', '霍去病.jpg', '卫青.jpg', '班超.jpg', '杨大眼.jpg',
  '陈庆之.jpg', '高长恭.jpg', '花木兰.jpg', '织田信长.jpg', '丰臣秀吉.jpg', '德川家康.jpg', '真田幸村.jpg',
  '伊达政宗.jpg', '武田信玄.jpg', '上杉谦信.jpg', '源义经.jpg', '弁庆.jpg', '阿市.jpg', '浓姬.jpg',
  '老年 曹操.jpg', '老年 司马懿.jpg', '老年 关羽.jpg', '老年 张飞.jpg', '老年 赵云.jpg', '年轻 曹操.jpg'
]);

const remaining = allKoei.filter(f => !usedFiles.has(f) && !nonTK.has(f));
console.log('Total remaining genuine Koei figures:', remaining.length);
fs.writeFileSync('remaining_koei_figures.json', JSON.stringify(remaining, null, 2));
