const fs = require('fs');
const https = require('https');
const html = fs.readFileSync('scratch/live_site.html', 'utf8');

const mjsFiles = [...html.matchAll(/https:\/\/framerusercontent\.com\/sites\/[^"'\s>]+\.mjs/g)].map(m => m[0]);
console.log('MJS files count:', mjsFiles.length);

function fetchUrl(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

(async () => {
  for (const url of mjsFiles) {
    const content = await fetchUrl(url);
    if (content.includes('How often are ideas') || content.includes('upgrade or downgrade') || content.includes('free plan') || content.includes('SQGARP')) {
      console.log('Found matches in:', url);
      const strings = content.match(/`[^`]{20,500}`/g) || [];
      strings.forEach(s => {
        if (s.includes('plan') || s.includes('stock') || s.includes('portfolio') || s.includes('SEBI') || s.includes('rebalanc') || s.includes('fund') || s.includes('research')) {
          console.log('>>', s);
        }
      });
    }
  }
})();
