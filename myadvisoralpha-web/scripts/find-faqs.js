const fs = require('fs');
const html = fs.readFileSync('scratch/live_site.html', 'utf8');

const queries = [
  'How often are ideas',
  'What is SQGARP',
  'Is there a free plan',
  'Can I upgrade or downgrade'
];

queries.forEach(q => {
  let pos = 0;
  while ((pos = html.indexOf(q, pos)) !== -1) {
    console.log(`\n=== Found "${q}" at pos ${pos} ===`);
    console.log(html.substring(Math.max(0, pos - 50), Math.min(html.length, pos + 400)));
    pos += q.length + 1;
  }
});
