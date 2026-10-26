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

  // 1. Hero Clean Professional
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 });
  await page.screenshot({ path: path.join(outDir, 'hero_clean_professional.png') });
  console.log('Saved hero_clean_professional.png');

  // 2. Dedicated FAQs page
  console.log('Navigating to http://localhost:3000/faqs ...');
  await page.goto('http://localhost:3000/faqs', { waitUntil: 'networkidle0', timeout: 20000 });
  await page.screenshot({ path: path.join(outDir, 'faqs_dedicated_page.png') });
  console.log('Saved faqs_dedicated_page.png');

  // 3. Dedicated Blogs page
  console.log('Navigating to http://localhost:3000/blogs ...');
  await page.goto('http://localhost:3000/blogs', { waitUntil: 'networkidle0', timeout: 20000 });
  await page.screenshot({ path: path.join(outDir, 'blogs_page.png') });
  console.log('Saved blogs_page.png');

  // 4. Test FAQ Singular Redirect (/faq -> /faqs)
  console.log('Navigating to http://localhost:3000/faq ...');
  await page.goto('http://localhost:3000/faq', { waitUntil: 'networkidle0', timeout: 20000 });
  const finalUrl = page.url();
  console.log('URL after /faq navigation:', finalUrl);

  // 5. Scroll to FAQ section on home page
  await page.goto('http://localhost:3000#faq', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'home_faq_section.png') });
  console.log('Saved home_faq_section.png');

  await browser.close();
  console.log('Verification completed!');
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
