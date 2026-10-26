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

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Capture full home page
  await page.screenshot({ path: path.join(__dirname, '..', 'screenshots', 'home_full.png'), fullPage: true });
  console.log('Saved home_full.png');

  // Find button containing 'Get 2 free ideas'
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Get 2 free ideas')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(__dirname, '..', 'screenshots', 'lead_modal_opened.png') });
      console.log('Saved lead_modal_opened.png');
      break;
    }
  }

  await browser.close();
}

test().catch(console.error);
