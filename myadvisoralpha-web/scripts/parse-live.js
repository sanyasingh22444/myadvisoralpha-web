const fs = require('fs');
const html = fs.readFileSync('scratch/live_site.html', 'utf8');

// Extract links
const linkMatches = html.matchAll(/href=["']([^"']+)["']/gi);
const uniqueLinks = [...new Set([...linkMatches].map(m => m[1]))].filter(
  l => !l.startsWith('data:') && !l.startsWith('#') && !l.includes('.css') && !l.includes('.js')
);
console.log('Unique Links:', uniqueLinks);

// Clean text
const cleanText = html
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ');

['Pankaj', 'Renaissance', 'SEBI', 'AMFI', 'ARN', 'INH', 'BSE', 'Address', 'Email', 'Phone', 'SQGARP', 'Pricing', '₹', 'About', 'Research'].forEach(word => {
  let pos = 0;
  let count = 0;
  console.log(`\n=================== Matches for '${word}' ===================`);
  while ((pos = cleanText.indexOf(word, pos)) !== -1 && count < 3) {
    console.log(cleanText.substring(Math.max(0, pos - 100), Math.min(cleanText.length, pos + 250)));
    console.log('---');
    pos += word.length + 10;
    count++;
  }
});
