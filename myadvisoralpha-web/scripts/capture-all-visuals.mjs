import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.resolve(process.cwd(), '..', 'screenshots');
const BASE_URL = 'http://localhost:3000';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function captureAll() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  console.log('Launching Edge for visual verification suite...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  try {
    // -------------------------------------------------------------------------
    // 1. DESKTOP VIEWPORT (1440 x 900)
    // -------------------------------------------------------------------------
    console.log('\n--- CAPTURING DESKTOP (1440x900) ---');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await delay(1000);

    // Hero: Rotating Headline frames
    console.log('Capturing Hero rotating headline states...');
    // Frame 1: Stock
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_desktop_hero_headline_stock.png') });

    // Wait for rotation to 'Futures'
    await delay(2600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_desktop_hero_headline_futures.png') });

    // Wait for rotation to 'Portfolio'
    await delay(2600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_desktop_hero_headline_portfolio.png') });

    // Promo Card and Phone mockup close-up
    console.log('Capturing Promo Card & Mockup...');
    const promoCard = await page.$('[aria-label="Get 2 free investment or trade ideas"]');
    if (promoCard) {
      await promoCard.screenshot({ path: path.join(SCREENSHOT_DIR, '04_desktop_promo_card_detail.png') });
    }

    // Navbar Dropdown: Hover over Advisory
    console.log('Capturing Navbar Advisory Dropdown...');
    const advisoryBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('header nav button'));
      return buttons.find(b => b.textContent?.includes('Advisory'));
    });
    if (advisoryBtn.asElement()) {
      await advisoryBtn.asElement().hover();
      await delay(500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_desktop_navbar_advisory_dropdown.png') });
    }

    // Click outside to close dropdown
    await page.mouse.click(10, 10);
    await delay(300);

    // Scroll down to Stacked Cards section
    console.log('Capturing Stacked Cards Showcase...');
    await page.evaluate(() => {
      const el = document.getElementById('offerings');
      el?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_desktop_stacked_cards_card1.png') });

    // Scroll a bit down to see stacking behavior
    await page.evaluate(() => window.scrollBy(0, 650));
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_desktop_stacked_cards_card2.png') });

    await page.evaluate(() => window.scrollBy(0, 700));
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_desktop_stacked_cards_card3.png') });

    // Scroll to SIP Calculator
    console.log('Capturing SIP Calculator...');
    await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('SIP') || h.textContent?.includes('Wealth'));
      h2?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_desktop_sip_calculator_default.png') });

    // Interact with SIP Calculator: Switch to Lumpsum mode
    console.log('Interacting with SIP Calculator: switching to Lumpsum...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const lumpsumBtn = buttons.find(b => b.textContent?.includes('Lumpsum'));
      lumpsumBtn?.click();
    });
    await delay(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_desktop_sip_calculator_lumpsum.png') });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(400);

    // Lead Capture Modal
    console.log('Triggering Lead Capture Modal via Promo Card...');
    const promoCardClick = await page.$('[aria-label="Get 2 free investment or trade ideas"]');
    if (promoCardClick) {
      await promoCardClick.click();
      await delay(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_desktop_lead_modal_open.png') });

      // Trigger validation errors by clicking submit button
      const submitBtn = await page.$('div[role="dialog"] button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await delay(400);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_desktop_lead_modal_validation_errors.png') });
      }

      // Close modal
      const closeBtn = await page.$('button[aria-label="Close dialog"]');
      if (closeBtn) {
        await closeBtn.click();
        await delay(400);
      } else {
        await page.keyboard.press('Escape');
        await delay(400);
      }
    }

    // -------------------------------------------------------------------------
    // 2. REGULATORY & SECONDARY PAGES (Desktop 1440)
    // -------------------------------------------------------------------------
    const regulatoryPages = [
      { route: '/legal/customer-complaints-and-disclosures', name: '13_desktop_legal_complaints.png' },
      { route: '/legal/grievance-redressal-escalation-matrix', name: '14_desktop_legal_matrix.png' },
      { route: '/legal/terms-and-conditions', name: '15_desktop_legal_terms.png' },
      { route: '/legal/privacy-policy', name: '16_desktop_legal_privacy.png' },
      { route: '/about', name: '17_desktop_about.png' },
      { route: '/contact', name: '18_desktop_contact.png' },
      { route: '/blogs', name: '19_desktop_blogs.png' },
    ];

    for (const r of regulatoryPages) {
      console.log(`Navigating to ${r.route}...`);
      await page.goto(`${BASE_URL}${r.route}`, { waitUntil: 'networkidle0' });
      await delay(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, r.name) });
    }

    // -------------------------------------------------------------------------
    // 3. TABLET VIEWPORT (768 x 1024)
    // -------------------------------------------------------------------------
    console.log('\n--- CAPTURING TABLET (768x1024) ---');
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await delay(1000);

    // Hero Section on Tablet
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '20_tablet_hero.png') });

    // Open Mobile Drawer on Tablet
    const tabletHamburger = await page.$('header button[aria-label="Open mobile menu"]');
    if (tabletHamburger) {
      await tabletHamburger.click();
      await delay(500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '21_tablet_drawer_open.png') });

      // Close drawer
      const closeDrawer = await page.$('button[aria-label="Close menu"]');
      if (closeDrawer) await closeDrawer.click();
      await delay(400);
    }

    // Tablet Stacked Cards
    await page.evaluate(() => {
      document.getElementById('offerings')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '22_tablet_stacked_cards.png') });

    // Tablet Complaints page
    await page.goto(`${BASE_URL}/legal/customer-complaints-and-disclosures`, { waitUntil: 'networkidle0' });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '23_tablet_complaints.png') });

    // -------------------------------------------------------------------------
    // 4. MOBILE VIEWPORT (375 x 812)
    // -------------------------------------------------------------------------
    console.log('\n--- CAPTURING MOBILE (375x812) ---');
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await delay(1000);

    // Mobile Hero
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '24_mobile_375_hero.png') });

    // Scroll to see promo card & phone
    await page.evaluate(() => window.scrollBy(0, 480));
    await delay(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '25_mobile_375_promo_and_phone.png') });

    // Mobile Navigation Drawer
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    const mobileHamburger = await page.$('header button[aria-label="Open mobile menu"]');
    if (mobileHamburger) {
      await mobileHamburger.click();
      await delay(500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '26_mobile_375_drawer.png') });

      // Expand Advisory Accordion inside Drawer
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('div.fixed button'));
        const adv = buttons.find(b => b.textContent?.includes('Advisory'));
        adv?.click();
      });
      await delay(500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '27_mobile_375_drawer_accordion_expanded.png') });

      // Close drawer
      const closeMobileDrawer = await page.$('button[aria-label="Close menu"]');
      if (closeMobileDrawer) await closeMobileDrawer.click();
      await delay(400);
    }

    // Mobile Stacked Cards
    await page.evaluate(() => {
      document.getElementById('offerings')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '28_mobile_375_stacked_cards.png') });

    // Mobile SIP Calculator
    await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('SIP') || h.textContent?.includes('Wealth'));
      h2?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '29_mobile_375_sip_calculator.png') });

    // Mobile Lead Modal
    await page.evaluate(() => window.scrollTo(0, 0));
    await delay(300);
    const promoCardMobile = await page.$('[aria-label="Get 2 free investment or trade ideas"]');
    if (promoCardMobile) {
      await promoCardMobile.click();
      await delay(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '30_mobile_375_lead_modal.png') });
      const closeDialog = await page.$('button[aria-label="Close dialog"]');
      if (closeDialog) await closeDialog.click();
      await delay(300);
    }

    // -------------------------------------------------------------------------
    // 5. MOBILE VIEWPORT (390 x 844 - iPhone 12/13/14)
    // -------------------------------------------------------------------------
    console.log('\n--- CAPTURING MOBILE (390x844) ---');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
    await delay(1000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '31_mobile_390_hero.png') });

    await page.goto(`${BASE_URL}/legal/customer-complaints-and-disclosures`, { waitUntil: 'networkidle0' });
    await delay(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '32_mobile_390_complaints.png') });

    console.log('\nAll 32 visual verification screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

captureAll().catch((err) => {
  console.error('Error during captureAll:', err);
  process.exit(1);
});
