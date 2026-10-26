const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const outDir = path.join(__dirname, '..', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 });
  await page.screenshot({ path: path.join(outDir, 'home_solid.png') });
  console.log('Saved home_solid.png');

  // Trigger hover on Advisory button
  const buttons = await page.$$('button');
  let advisoryFound = false;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Advisory')) {
      await btn.hover();
      advisoryFound = true;
      break;
    }
  }

  if (advisoryFound) {
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, 'advisory_solid_contrast.png') });
    console.log('Saved advisory_solid_contrast.png');
  } else {
    console.log('Advisory button not found!');
  }

  // Check secondary pages
  const routes = [
    { url: 'http://localhost:3000/about', name: 'about_themed.png' },
    { url: 'http://localhost:3000/contact', name: 'contact_themed.png' },
    { url: 'http://localhost:3000/blogs', name: 'blogs_themed.png' },
    { url: 'http://localhost:3000/legal/terms-and-conditions', name: 'terms_themed.png' }
  ];

  for (const r of routes) {
    console.log(`Navigating to ${r.url} ...`);
    await page.goto(r.url, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.screenshot({ path: path.join(outDir, r.name) });
    console.log(`Saved ${r.name}`);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

test().catch(e => {
  console.error('Error during screenshot capture:', e);
  process.exit(1);
});
