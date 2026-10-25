const https = require('https');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const figures = [
    { name: 'Cao_Cao', id: 'cao_cao' },
    { name: 'Liu_Bei', id: 'liu_bei' },
    { name: 'Sun_Quan', id: 'sun_quan' },
    { name: 'Zhuge_Liang', id: 'zhuge_liang' },
    { name: 'Guan_Yu', id: 'guan_yu' },
    { name: 'Zhou_Yu', id: 'zhou_yu' },
    { name: 'Sima_Yi', id: 'sima_yi' },
    { name: 'Lu_Xun', id: 'lu_xun' }
  ];

  for (const f of figures) {
    try {
      const html = await fetchPage(`https://koei.fandom.com/wiki/${f.name}`);
      const matches = html.match(/https:\/\/static\.wikia\.nocookie\.net\/koei\/images\/[^\s\"']+/gi);
      if (matches) {
        const portraits = matches.filter(m => m.includes('RTK') || m.includes('San') || m.includes(f.name));
        const chosen = portraits[0] || matches[0];
        const clean = chosen.split('/revision/')[0];
        console.log(`${f.id}: '${clean}',`);
      } else {
        console.log(`${f.id}: no matches`);
      }
    } catch(e) {
      console.log(`${f.id}: error ${e.message}`);
    }
  }
}

run();
