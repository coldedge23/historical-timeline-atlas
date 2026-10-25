const fs = require('fs');

const files = ['qin_shihuang.jpg', 'bai_qi.jpg', 'shang_yang.jpg', 'sun_wu.jpg', 'liu_bang.jpg', 'xiang_yu.jpg'];
files.forEach(f => {
  const p = 'images/figures/' + f;
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(f, stat.size, 'bytes');
  }
});
