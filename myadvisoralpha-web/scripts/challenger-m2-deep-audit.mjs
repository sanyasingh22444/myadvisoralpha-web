#!/usr/bin/env node
/**
 * ==============================================================================
 * CHALLENGER M2-2 DEEP ADVERSARIAL STRESS TEST & AUDIT SUITE
 * ==============================================================================
 * Focus Areas:
 *   1. Headless Browser (Edge CDP) Responsive Layouts (1440px, 768px, 375px)
 *   2. Mobile Drawer Open/Close Dynamics, Scroll-Lock Invariant, & Zero Horizontal Overflow
 *   3. Rapid-fire Mobile Drawer Toggle Stress Testing (10 cycles)
 *   4. Viewport Transition Edge Cases (Resize while drawer open)
 *   5. src/data/services.ts Canonical Taxonomy, Exports & Helper Function Boundaries
 * ==============================================================================
 */

import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DEBUG_PORT = 9222;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];

function assert(condition, testName, extra = '') {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
    console.log(`  ✔ [PASS] ${testName}`);
  } else {
    failedAssertions++;
    const msg = `✖ [FAIL] ${testName} ${extra ? `(${extra})` : ''}`;
    failureDetails.push(msg);
    console.error(`  ${msg}`);
  }
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.eventListeners = new Map();

    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) {
          reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        } else {
          resolve(msg.result);
        }
      } else if (msg.method && this.eventListeners.has(msg.method)) {
        for (const cb of this.eventListeners.get(msg.method)) {
          cb(msg.params);
        }
      }
    };
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, cb) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(cb);
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`CDP Eval Exception: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  close() {
    this.ws.close();
  }
}

async function getDebuggerUrl() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`);
      if (res.ok) {
        const targets = await res.json();
        const pageTarget = targets.find((t) => t.type === 'page');
        if (pageTarget?.webSocketDebuggerUrl) {
          return pageTarget.webSocketDebuggerUrl;
        }
      }
    } catch {}
    await delay(300);
  }
  throw new Error('Failed to find page target on Edge remote debugging port');
}

async function runTestSuite() {
  console.log('\n==============================================================================');
  console.log('PART 1: SERVICES TAXONOMY & HELPER FUNCTIONS DEEP AUDIT (src/data/services.ts)');
  console.log('==============================================================================');

  const servicesModule = await import('../src/data/services.ts');
  const {
    CANONICAL_SERVICES,
    ADVISORY_SERVICES,
    getServiceCategory,
    getAllOfferings,
    getOfferingBySlug,
  } = servicesModule;

  // 1.1 Exports existence
  assert(Array.isArray(CANONICAL_SERVICES), 'CANONICAL_SERVICES is exported as an array');
  assert(Array.isArray(ADVISORY_SERVICES), 'ADVISORY_SERVICES is exported as an array');
  assert(typeof getServiceCategory === 'function', 'getServiceCategory is exported as a function');
  assert(typeof getAllOfferings === 'function', 'getAllOfferings is exported as a function');
  assert(typeof getOfferingBySlug === 'function', 'getOfferingBySlug is exported as a function');

  // 1.2 CANONICAL_SERVICES Structure & Content
  assert(CANONICAL_SERVICES.length === 2, `CANONICAL_SERVICES contains exactly 2 top-level categories (found: ${CANONICAL_SERVICES.length})`);

  const advisoryCat = CANONICAL_SERVICES.find(c => c.id === 'advisory');
  const mfCat = CANONICAL_SERVICES.find(c => c.id === 'mutual-funds');

  assert(!!advisoryCat, 'Advisory category present in CANONICAL_SERVICES');
  assert(advisoryCat?.name === 'Advisory', 'Advisory category name is "Advisory"');
  assert(advisoryCat?.slug === 'advisory', 'Advisory category slug is "advisory"');
  assert(advisoryCat?.subOfferings?.length === 3, `Advisory category has 3 sub-offerings (found: ${advisoryCat?.subOfferings?.length})`);

  assert(!!mfCat, 'Mutual Funds category present in CANONICAL_SERVICES');
  assert(mfCat?.name === 'Mutual Funds', 'Mutual Funds category name is "Mutual Funds"');
  assert(mfCat?.slug === 'mutual-funds', 'Mutual Funds category slug is "mutual-funds"');
  assert(mfCat?.tagline?.includes('ARN-350887'), 'Mutual Funds tagline contains AMFI license ARN-350887');
  assert(mfCat?.tagline?.includes('ONDC'), 'Mutual Funds tagline references ONDC');
  assert(mfCat?.subOfferings?.length === 3, `Mutual Funds category has 3 sub-offerings (found: ${mfCat?.subOfferings?.length})`);

  // Advisory Sub-Offerings
  const futures = advisoryCat?.subOfferings?.find(s => s.id === 'futures');
  const mtf = advisoryCat?.subOfferings?.find(s => s.id === 'mtf-basket');
  const portfolio = advisoryCat?.subOfferings?.find(s => s.id === 'portfolio');

  assert(!!futures, 'Futures sub-offering exists');
  assert(futures?.name === 'Futures', 'Futures sub-offering name is "Futures"');
  assert(futures?.badge === 'Derivatives', 'Futures badge is "Derivatives"');
  assert(futures?.tagline === 'Derivatives trading strategies and momentum signals', 'Futures tagline matches exact spec');
  assert(futures?.features?.length >= 3, `Futures has >= 3 features (found: ${futures?.features?.length})`);

  assert(!!mtf, 'MTF Basket sub-offering exists');
  assert(mtf?.name === 'MTF Basket', 'MTF Basket name is "MTF Basket"');
  assert(mtf?.badge === 'Margin Trading', 'MTF Basket badge is "Margin Trading"');
  assert(mtf?.tagline === 'Margin Trading Facility curated equity baskets with leverage and risk management', 'MTF Basket tagline matches exact spec');
  assert(mtf?.features?.length >= 3, `MTF Basket has >= 3 features (found: ${mtf?.features?.length})`);

  assert(!!portfolio, 'Portfolio sub-offering exists');
  assert(portfolio?.name === 'Portfolio', 'Portfolio name is "Portfolio"');
  assert(portfolio?.badge === 'Full Advisory', 'Portfolio badge is "Full Advisory"');
  assert(portfolio?.tagline === 'Full portfolio advisory, risk profiling, and periodic rebalancing', 'Portfolio tagline matches exact spec');
  assert(portfolio?.features?.length >= 3, `Portfolio has >= 3 features (found: ${portfolio?.features?.length})`);

  // Mutual Funds Sub-Offerings
  const firstSalary = mfCat?.subOfferings?.find(s => s.id === 'first-salary-basket');
  const allWeather = mfCat?.subOfferings?.find(s => s.id === 'all-weather-basket');
  const retireRich = mfCat?.subOfferings?.find(s => s.id === 'retire-rich-basket');

  assert(!!firstSalary, 'First Salary Basket exists');
  assert(firstSalary?.badge?.includes('16.12%'), 'First Salary Basket has 16.12% badge');
  assert(!!allWeather, 'All-Weather Basket exists');
  assert(allWeather?.badge?.includes('18.35%'), 'All-Weather Basket has 18.35% badge');
  assert(!!retireRich, 'Retire Rich Basket exists');
  assert(retireRich?.badge?.includes('21.76%'), 'Retire Rich Basket has 21.76% badge');

  // 1.3 ADVISORY_SERVICES Taxonomy Hierarchy
  assert(ADVISORY_SERVICES.length === 2, `ADVISORY_SERVICES contains 2 sections (found: ${ADVISORY_SERVICES.length})`);
  const singleStocksSection = ADVISORY_SERVICES.find(s => s.id === 'single-stocks');
  const portfolioSection = ADVISORY_SERVICES.find(s => s.id === 'portfolio');
  assert(!!singleStocksSection, 'Single Stocks section present in ADVISORY_SERVICES');
  assert(singleStocksSection?.items?.length === 2, 'Single Stocks section has 2 items (Futures & MTF Basket)');
  assert(singleStocksSection?.items?.some(i => i.id === 'futures'), 'Single Stocks contains Futures item');
  assert(singleStocksSection?.items?.some(i => i.id === 'mtf-basket'), 'Single Stocks contains MTF Basket item');
  assert(!!portfolioSection, 'Portfolio section present in ADVISORY_SERVICES');
  assert(portfolioSection?.items?.length === 1, 'Portfolio section has 1 item (Model Portfolios)');

  // 1.4 Helper Functions Stress & Corner Cases
  console.log('\n--- Helper Functions Stress & Corner Cases ---');
  // getServiceCategory
  assert(getServiceCategory('advisory')?.id === 'advisory', 'getServiceCategory matches by id "advisory"');
  assert(getServiceCategory('mutual-funds')?.id === 'mutual-funds', 'getServiceCategory matches by id "mutual-funds"');
  assert(getServiceCategory('non-existent-category') === undefined, 'getServiceCategory returns undefined for unknown category');
  assert(getServiceCategory('') === undefined, 'getServiceCategory returns undefined for empty string');
  assert(getServiceCategory(null) === undefined, 'getServiceCategory safely handles null input without crashing');
  assert(getServiceCategory(undefined) === undefined, 'getServiceCategory safely handles undefined input without crashing');

  // getAllOfferings
  const allOfferings = getAllOfferings();
  assert(allOfferings.length === 6, `getAllOfferings returns exactly 6 offerings (found: ${allOfferings.length})`);
  const offeringIds = allOfferings.map(o => o.id);
  const uniqueIds = new Set(offeringIds);
  assert(uniqueIds.size === 6, 'All 6 offering IDs are strictly unique (no collisions)');

  const offeringSlugs = allOfferings.map(o => o.slug);
  const uniqueSlugs = new Set(offeringSlugs);
  assert(uniqueSlugs.size === 6, 'All 6 offering slugs are strictly unique (no collisions)');

  // Validate every offering has required fields
  for (const off of allOfferings) {
    assert(typeof off.id === 'string' && off.id.length > 0, `Offering ${off.id} has non-empty id`);
    assert(typeof off.name === 'string' && off.name.length > 0, `Offering ${off.id} has non-empty name`);
    assert(typeof off.slug === 'string' && off.slug.length > 0, `Offering ${off.id} has non-empty slug`);
    assert(typeof off.tagline === 'string' && off.tagline.length > 0, `Offering ${off.id} has non-empty tagline`);
    assert(typeof off.description === 'string' && off.description.length > 0, `Offering ${off.id} has non-empty description`);
    assert(Array.isArray(off.features) && off.features.length > 0, `Offering ${off.id} has non-empty features array`);
    assert(typeof off.ctaText === 'string' && off.ctaText.length > 0, `Offering ${off.id} has non-empty ctaText`);
    assert(typeof off.ctaHref === 'string' && off.ctaHref.length > 0, `Offering ${off.id} has non-empty ctaHref`);
  }

  // getOfferingBySlug
  assert(getOfferingBySlug('futures')?.id === 'futures', 'getOfferingBySlug correctly finds "futures"');
  assert(getOfferingBySlug('mtf-basket')?.id === 'mtf-basket', 'getOfferingBySlug correctly finds "mtf-basket"');
  assert(getOfferingBySlug('portfolio')?.id === 'portfolio', 'getOfferingBySlug correctly finds "portfolio"');
  assert(getOfferingBySlug('first-salary-basket')?.id === 'first-salary-basket', 'getOfferingBySlug finds "first-salary-basket"');
  assert(getOfferingBySlug('all-weather-basket')?.id === 'all-weather-basket', 'getOfferingBySlug finds "all-weather-basket"');
  assert(getOfferingBySlug('retire-rich-basket')?.id === 'retire-rich-basket', 'getOfferingBySlug finds "retire-rich-basket"');
  assert(getOfferingBySlug('non-existent-slug') === undefined, 'getOfferingBySlug returns undefined for non-existent slug');
  assert(getOfferingBySlug('') === undefined, 'getOfferingBySlug returns undefined for empty string');
  assert(getOfferingBySlug(null) === undefined, 'getOfferingBySlug handles null input without crashing');

  console.log('\n==============================================================================');
  console.log('PART 2: HEADLESS BROWSER (EDGE) ADVERSARIAL STRESS TEST HARNESS');
  console.log('==============================================================================');

  console.log('Launching headless Edge on port ' + DEBUG_PORT + '...');
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=1440,900',
  ]);

  try {
    const wsUrl = await getDebuggerUrl();
    const cdp = new CDPClient(wsUrl);
    await cdp.ready;

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');

    const targetUrl = 'http://localhost:3000';
    console.log(`Navigating to ${targetUrl}...`);

    const navPromise = new Promise((resolve) => {
      cdp.on('Page.loadEventFired', resolve);
    });
    await cdp.send('Page.navigate', { url: targetUrl });
    await navPromise;
    await delay(1200);

    // -------------------------------------------------------------------------
    // 2.1 Viewport Responsiveness: Desktop (1440px)
    // -------------------------------------------------------------------------
    console.log('\n--- 2.1 Desktop Viewport (1440px x 900px) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    const deskScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const deskInnerWidth = await cdp.eval('window.innerWidth');
    assert(deskScrollWidth <= deskInnerWidth, `Desktop 1440px: No horizontal overflow (scrollWidth: ${deskScrollWidth}px <= innerWidth: ${deskInnerWidth}px)`);

    const deskNavDisplay = await cdp.eval(`getComputedStyle(document.querySelector('header nav div.hidden.lg\\\\:flex')).display`);
    assert(deskNavDisplay === 'flex', `Desktop nav links visible as flex container (display: ${deskNavDisplay})`);

    const deskHamburgerDisplay = await cdp.eval(`getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`);
    assert(deskHamburgerDisplay === 'none', `Mobile hamburger button hidden on desktop (display: ${deskHamburgerDisplay})`);

    // Verify Advisory Dropdown Interaction on Desktop
    console.log('Testing Advisory Dropdown hover/open on Desktop...');
    // Trigger advisory dropdown click
    await cdp.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('header nav button')).find(b => b.textContent.includes('Advisory'));
        if (btn) btn.click();
      })()
    `);
    await delay(200);

    const dropdownOpen = await cdp.eval(`
      (() => {
        const dd = document.querySelector('header nav div.absolute');
        return dd !== null && dd.textContent.includes('Single Stocks') && dd.textContent.includes('Futures') && dd.textContent.includes('MTF Basket') && dd.textContent.includes('Portfolio');
      })()
    `);
    assert(dropdownOpen, 'Advisory dropdown renders Single Stocks (Futures, MTF Basket) and Portfolio items on click');

    // Close dropdown
    await cdp.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('header nav button')).find(b => b.textContent.includes('Advisory'));
        if (btn) btn.click();
      })()
    `);
    await delay(200);

    // -------------------------------------------------------------------------
    // 2.2 Viewport Responsiveness: Tablet (768px)
    // -------------------------------------------------------------------------
    console.log('\n--- 2.2 Tablet Viewport (768px x 1024px) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    const tabScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const tabInnerWidth = await cdp.eval('window.innerWidth');
    assert(tabScrollWidth <= tabInnerWidth, `Tablet 768px: No horizontal overflow (scrollWidth: ${tabScrollWidth}px <= innerWidth: ${tabInnerWidth}px)`);

    const tabNavDisplay = await cdp.eval(`getComputedStyle(document.querySelector('header nav div.hidden.lg\\\\:flex')).display`);
    assert(tabNavDisplay === 'none', `Desktop nav links hidden on tablet (display: ${tabNavDisplay})`);

    const tabHamburgerDisplay = await cdp.eval(`getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`);
    assert(tabHamburgerDisplay === 'block', `Mobile hamburger button visible on tablet (display: ${tabHamburgerDisplay})`);

    // -------------------------------------------------------------------------
    // 2.3 Viewport Responsiveness: Mobile (375px)
    // -------------------------------------------------------------------------
    console.log('\n--- 2.3 Mobile Viewport (375px x 667px) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(300);

    const mobScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const mobInnerWidth = await cdp.eval('window.innerWidth');
    assert(mobScrollWidth <= mobInnerWidth, `Mobile 375px: No horizontal overflow (scrollWidth: ${mobScrollWidth}px <= innerWidth: ${mobInnerWidth}px)`);

    const mobHamburgerDisplay = await cdp.eval(`getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`);
    assert(mobHamburgerDisplay === 'block', `Mobile hamburger button visible on mobile (display: ${mobHamburgerDisplay})`);

    // -------------------------------------------------------------------------
    // 2.4 Mobile Drawer Open/Close Mechanics & Scroll-Lock Invariant
    // -------------------------------------------------------------------------
    console.log('\n--- 2.4 Mobile Drawer Open/Close Mechanics & Scroll-Lock Invariant ---');

    // Test baseline scrolling before opening drawer
    const initialOverflow = await cdp.eval('document.body.style.overflow');
    assert(initialOverflow === '' || initialOverflow === 'unset' || initialOverflow === 'auto', `Initial body overflow is normal: "${initialOverflow}"`);

    // Scroll down 300px
    await cdp.eval('window.scrollTo(0, 300)');
    await delay(100);
    const scrollYBeforeOpen = await cdp.eval('window.scrollY');
    assert(scrollYBeforeOpen >= 250, `Window successfully scrolled before drawer open (scrollY: ${scrollYBeforeOpen})`);

    // 1. Open Drawer
    console.log('Opening mobile drawer via hamburger...');
    await cdp.eval(`document.querySelector('header button[aria-label="Open mobile menu"]').click()`);
    await delay(400);

    const drawerContainer = await cdp.eval(`!!document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]')`);
    assert(drawerContainer, 'Mobile drawer container is mounted in DOM');

    const drawerScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    assert(drawerScrollWidth <= 375, `Zero horizontal overflow with drawer open (scrollWidth: ${drawerScrollWidth}px <= 375px)`);

    // Check drawer width is bounded to max-w-xs (320px) or viewport
    const drawerPanelWidth = await cdp.eval(`
      (() => {
        const panel = document.querySelector('div.fixed.inset-y-0.right-0');
        return panel ? panel.getBoundingClientRect().width : 0;
      })()
    `);
    assert(drawerPanelWidth > 0 && drawerPanelWidth <= 320, `Drawer panel width conforms to max-w-xs (width: ${drawerPanelWidth}px <= 320px)`);

    // Check drawer contains all taxonomy links
    const drawerTaxonomyContent = await cdp.eval(`
      (() => {
        const text = document.querySelector('div.fixed.inset-y-0.right-0')?.textContent || '';
        return {
          hasAdvisory: text.includes('Advisory'),
          hasSingleStocks: text.includes('Single Stocks'),
          hasFutures: text.includes('Futures'),
          hasMtf: text.includes('MTF Basket'),
          hasPortfolio: text.includes('Portfolio'),
          hasMutualFunds: text.includes('Mutual Funds'),
          hasBlog: text.includes('Blog'),
          hasFaq: text.includes('FAQ'),
          hasLogin: text.includes('Login to Web App'),
        };
      })()
    `);
    assert(drawerTaxonomyContent.hasAdvisory, 'Mobile drawer contains Advisory');
    assert(drawerTaxonomyContent.hasSingleStocks, 'Mobile drawer contains Single Stocks');
    assert(drawerTaxonomyContent.hasFutures, 'Mobile drawer contains Futures');
    assert(drawerTaxonomyContent.hasMtf, 'Mobile drawer contains MTF Basket');
    assert(drawerTaxonomyContent.hasPortfolio, 'Mobile drawer contains Portfolio');
    assert(drawerTaxonomyContent.hasMutualFunds, 'Mobile drawer contains Mutual Funds');
    assert(drawerTaxonomyContent.hasBlog, 'Mobile drawer contains Blog');
    assert(drawerTaxonomyContent.hasFaq, 'Mobile drawer contains FAQ');
    assert(drawerTaxonomyContent.hasLogin, 'Mobile drawer contains Web App Login link');

    // 2. Close Drawer via Close Button
    console.log('Closing mobile drawer via close button...');
    await cdp.eval(`document.querySelector('div.fixed.inset-y-0.right-0 button[aria-label="Close menu"]').click()`);
    await delay(400);

    const drawerClosed = await cdp.eval(`document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]') === null`);
    assert(drawerClosed, 'Mobile drawer cleanly unmounted after close button click');

    // Verify scrolling is NOT locked
    const overflowAfterClose = await cdp.eval('document.body.style.overflow');
    assert(overflowAfterClose !== 'hidden', `Body style overflow is NOT permanently locked hidden: "${overflowAfterClose}"`);

    // Test scrolling ability after close
    await cdp.eval('window.scrollTo(0, 800)');
    await delay(100);
    const scrollYAfterClose = await cdp.eval('window.scrollY');
    assert(scrollYAfterClose >= 700, `Page scrolling functions unimpeded after drawer close (scrollY: ${scrollYAfterClose})`);

    // 3. Open Drawer and Close via Backdrop Click
    console.log('Testing Backdrop click dismiss...');
    await cdp.eval(`document.querySelector('header button[aria-label="Open mobile menu"]').click()`);
    await delay(400);

    // Click backdrop
    await cdp.eval(`
      (() => {
        const backdrop = document.querySelector('div.fixed.inset-0.bg-black\\\\/75');
        if (backdrop) backdrop.click();
      })()
    `);
    await delay(400);

    const closedViaBackdrop = await cdp.eval(`document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]') === null`);
    assert(closedViaBackdrop, 'Mobile drawer cleanly dismissed upon backdrop click');

    // Verify scrolling again
    await cdp.eval('window.scrollTo(0, 500)');
    await delay(100);
    const scrollYAfterBackdrop = await cdp.eval('window.scrollY');
    assert(scrollYAfterBackdrop >= 450, `Page scrolling remains functional after backdrop dismiss (scrollY: ${scrollYAfterBackdrop})`);

    // 4. Open Drawer and Click a Navigation Link
    console.log('Testing Nav link click dismiss inside drawer...');
    await cdp.eval(`document.querySelector('header button[aria-label="Open mobile menu"]').click()`);
    await delay(400);

    await cdp.eval(`
      (() => {
        const faqLink = Array.from(document.querySelectorAll('div.fixed.inset-y-0.right-0 a')).find(a => a.textContent.includes('FAQ'));
        if (faqLink) faqLink.click();
      })()
    `);
    await delay(400);

    const closedViaLink = await cdp.eval(`document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]') === null`);
    assert(closedViaLink, 'Mobile drawer cleanly closed upon clicking a navigation link');

    // -------------------------------------------------------------------------
    // 2.5 Rapid-Fire Stress Test (10 open/close cycles)
    // -------------------------------------------------------------------------
    console.log('\n--- 2.5 Rapid-Fire Stress Test: 10 Consecutive Drawer Toggles ---');
    let stressSuccess = true;
    for (let cycle = 1; cycle <= 10; cycle++) {
      // Open
      await cdp.eval(`document.querySelector('header button[aria-label="Open mobile menu"]').click()`);
      await delay(80);
      // Close
      await cdp.eval(`
        (() => {
          const btn = document.querySelector('div.fixed.inset-y-0.right-0 button[aria-label="Close menu"]');
          if (btn) btn.click();
        })()
      `);
      await delay(80);
      const isGone = await cdp.eval(`document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]') === null`);
      if (!isGone) {
        stressSuccess = false;
        assert(false, `Rapid toggle cycle ${cycle} failed to close drawer cleanly`);
        break;
      }
    }
    if (stressSuccess) {
      assert(true, '10 rapid-fire open/close cycles executed flawlessly without locking or state desync');
    }

    // Verify scroll state after 10 rapid cycles
    await cdp.eval('window.scrollTo(0, 1000)');
    await delay(100);
    const scrollYAfterRapid = await cdp.eval('window.scrollY');
    assert(scrollYAfterRapid >= 900, `Page remains fully scrollable after 10 rapid cycles (scrollY: ${scrollYAfterRapid})`);

    const finalBodyOverflow = await cdp.eval('document.body.style.overflow');
    assert(finalBodyOverflow !== 'hidden', `Body style overflow is not locked hidden after stress cycles: "${finalBodyOverflow}"`);

    // -------------------------------------------------------------------------
    // 2.6 Viewport Transition Edge Case: Resize from Mobile to Desktop while Open
    // -------------------------------------------------------------------------
    console.log('\n--- 2.6 Viewport Transition: Resize from 375px to 1440px while Drawer Open ---');
    // Open drawer at mobile
    await cdp.eval(`document.querySelector('header button[aria-label="Open mobile menu"]').click()`);
    await delay(300);

    // Abruptly resize to desktop 1440px
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    // On desktop, the drawer has `lg:hidden`, so computed display of container must be none
    const drawerContainerDisplay = await cdp.eval(`
      (() => {
        const el = document.querySelector('div.fixed.inset-0.z-\\\\[60\\\\]');
        return el ? getComputedStyle(el).display : 'unmounted';
      })()
    `);
    assert(drawerContainerDisplay === 'none' || drawerContainerDisplay === 'unmounted', `Drawer container hidden on desktop via lg:hidden (display: ${drawerContainerDisplay})`);

    const overflowAfterResize = await cdp.eval('document.documentElement.scrollWidth <= window.innerWidth');
    assert(overflowAfterResize, 'Zero horizontal overflow after abrupt viewport expansion to 1440px');

    cdp.close();
  } finally {
    edge.kill();
  }

  // ---------------------------------------------------------------------------
  // Summary & Binary Verdict
  // ---------------------------------------------------------------------------
  console.log('\n==============================================================================');
  console.log('CHALLENGER M2-2 AUDIT SUMMARY');
  console.log('==============================================================================');
  console.log(`Total Assertions  : ${totalAssertions}`);
  console.log(`Passed            : ${passedAssertions}`);
  console.log(`Failed            : ${failedAssertions}`);
  console.log('------------------------------------------------------------------------------');

  if (failedAssertions > 0) {
    console.error(`VERDICT: REQUEST_CHANGES (${failedAssertions} failures detected)`);
    for (const f of failureDetails) {
      console.error(`  - ${f}`);
    }
    process.exit(1);
  } else {
    console.log('VERDICT: APPROVE (100% of adversarial assertions and stress tests passed cleanly)');
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal Test Harness Exception:', err);
  process.exit(1);
});
