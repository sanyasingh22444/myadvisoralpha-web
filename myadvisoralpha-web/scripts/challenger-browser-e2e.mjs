import { spawn } from 'node:child_process';
import http from 'node:http';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DEBUG_PORT = 9222;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    return res.result?.value;
  }

  close() {
    this.ws.close();
  }
}

async function runBrowserTest() {
  console.log('Launching Edge in headless mode...');
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=1440,900',
  ]);

  edge.stderr.on('data', () => {});

  let passed = 0;
  let failed = 0;

  function assert(cond, msg, extra = '') {
    if (cond) {
      passed++;
      console.log(`  ✔ [PASS] ${msg}`);
    } else {
      failed++;
      console.error(`  ✖ [FAIL] ${msg} ${extra ? `(${extra})` : ''}`);
    }
  }

  try {
    const wsUrl = await getDebuggerUrl();
    console.log('Connected to Edge DevTools Protocol');
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
    await delay(1000); // Allow react hydration and layout to settle

    console.log('\n======================================================');
    console.log('TEST 1: Desktop Viewport (1440px x 900px)');
    console.log('======================================================');

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    const desktopScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const desktopInnerWidth = await cdp.eval('window.innerWidth');
    assert(
      desktopScrollWidth <= desktopInnerWidth,
      `No horizontal overflow on Desktop 1440px (scrollWidth: ${desktopScrollWidth}px, innerWidth: ${desktopInnerWidth}px)`,
      `Overflow detected: ${desktopScrollWidth} > ${desktopInnerWidth}`
    );

    const desktopNavDisplay = await cdp.eval(
      `getComputedStyle(document.querySelector('header nav div.hidden.lg\\\\:flex')).display`
    );
    assert(desktopNavDisplay !== 'none', `Desktop nav links visible on 1440px (display: ${desktopNavDisplay})`);

    const hamburgerDesktopDisplay = await cdp.eval(
      `getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`
    );
    assert(hamburgerDesktopDisplay === 'none', `Mobile hamburger hidden on desktop (display: ${hamburgerDesktopDisplay})`);

    // Stacked Cards check
    const cardsCount = await cdp.eval(`document.querySelectorAll('#offerings .sticky').length`);
    assert(cardsCount === 5, `5 sticky cards found in offerings section (found: ${cardsCount})`);

    const cardStyles = await cdp.eval(`
      Array.from(document.querySelectorAll('#offerings .sticky')).map((el, i) => {
        const computed = getComputedStyle(el);
        return {
          index: i,
          position: computed.position,
          top: computed.top,
          zIndex: computed.zIndex,
        };
      })
    `);

    const expectedOffsets = ['120px', '140px', '160px', '180px', '200px'];
    const expectedZ = ['20', '21', '22', '23', '24'];

    for (let i = 0; i < cardStyles.length; i++) {
      const c = cardStyles[i];
      assert(c.position === 'sticky', `Card ${i} has computed position: sticky (got: ${c.position})`);
      assert(c.top === expectedOffsets[i], `Card ${i} has computed top: ${c.top} (expected: ${expectedOffsets[i]})`);
      assert(c.zIndex === expectedZ[i], `Card ${i} has computed zIndex: ${c.zIndex} (expected: ${expectedZ[i]})`);
    }

    console.log('\n======================================================');
    console.log('TEST 2: Tablet Viewport (768px x 1024px)');
    console.log('======================================================');

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    const tabletScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const tabletInnerWidth = await cdp.eval('window.innerWidth');
    assert(
      tabletScrollWidth <= tabletInnerWidth,
      `No horizontal overflow on Tablet 768px (scrollWidth: ${tabletScrollWidth}px, innerWidth: ${tabletInnerWidth}px)`,
      `Overflow detected: ${tabletScrollWidth} > ${tabletInnerWidth}`
    );

    const tabletNavDisplay = await cdp.eval(
      `getComputedStyle(document.querySelector('header nav div.hidden.lg\\\\:flex')).display`
    );
    assert(tabletNavDisplay === 'none', `Desktop nav links hidden on tablet (display: ${tabletNavDisplay})`);

    const hamburgerTabletDisplay = await cdp.eval(
      `getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`
    );
    assert(hamburgerTabletDisplay !== 'none', `Mobile hamburger visible on tablet (display: ${hamburgerTabletDisplay})`);

    console.log('\n======================================================');
    console.log('TEST 3: Mobile Viewport (375px x 667px)');
    console.log('======================================================');

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(300);

    const mobileScrollWidth = await cdp.eval('document.documentElement.scrollWidth');
    const mobileInnerWidth = await cdp.eval('window.innerWidth');
    assert(
      mobileScrollWidth <= mobileInnerWidth,
      `No horizontal overflow on Mobile 375px (scrollWidth: ${mobileScrollWidth}px, innerWidth: ${mobileInnerWidth}px)`,
      `Overflow detected: ${mobileScrollWidth} > ${mobileInnerWidth}`
    );

    const hamburgerMobileDisplay = await cdp.eval(
      `getComputedStyle(document.querySelector('header button[aria-label="Open mobile menu"]')).display`
    );
    assert(hamburgerMobileDisplay !== 'none', `Mobile hamburger visible on mobile (display: ${hamburgerMobileDisplay})`);

    // Test Hero Section Phone Input validation in real DOM
    console.log('\nTesting Hero Phone Input in real DOM...');
    const inputExists = await cdp.eval(`!!document.querySelector('input[type="tel"]')`);
    assert(inputExists, 'Hero telephone input exists in DOM');

    // Enter invalid number (starting with 1) and click submit
    await cdp.eval(`
      (() => {
        const input = document.querySelector('input[type="tel"]');
        const form = input.closest('form');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, '1234567890');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      })()
    `);
    await delay(200);

    const errorVisible = await cdp.eval(`
      (() => {
        const err = document.querySelector('form p.text-red-400');
        return err ? err.textContent : null;
      })()
    `);
    assert(
      errorVisible?.includes('valid 10-digit Indian mobile number'),
      `Error displayed for invalid prefix '1': "${errorVisible}"`
    );

    // Enter valid number (starting with 9) and type
    await cdp.eval(`
      (() => {
        const input = document.querySelector('input[type="tel"]');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, '9820123456');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      })()
    `);
    await delay(200);

    const errorCleared = await cdp.eval(`
      (() => {
        const err = document.querySelector('form p.text-red-400');
        return err === null;
      })()
    `);
    assert(errorCleared, 'Error message cleared upon typing valid input');

    // Test Mobile Drawer Interaction
    console.log('\nTesting Mobile Drawer Open/Close in real DOM...');
    // Click hamburger button
    await cdp.eval(`
      document.querySelector('header button[aria-label="Open mobile menu"]').click();
    `);
    await delay(400);

    const drawerVisible = await cdp.eval(`
      (() => {
        const drawer = document.querySelector('div.fixed.inset-y-0.right-0');
        if (!drawer) return false;
        const rect = drawer.getBoundingClientRect();
        return rect.width > 0 && rect.width <= 375 && rect.right <= 375;
      })()
    `);
    assert(drawerVisible, 'Mobile drawer opened within 375px viewport bounds without overflow');

    const drawerHasLinks = await cdp.eval(`
      (() => {
        const links = document.querySelectorAll('div.fixed.inset-y-0.right-0 a');
        return links.length;
      })()
    `);
    assert(drawerHasLinks >= 8, `Mobile drawer contains navigation links (count: ${drawerHasLinks})`);

    // Click close button
    await cdp.eval(`
      document.querySelector('div.fixed.inset-y-0.right-0 button[aria-label="Close menu"]').click();
    `);
    await delay(400);

    const drawerClosed = await cdp.eval(`
      document.querySelector('div.fixed.inset-y-0.right-0') === null
    `);
    assert(drawerClosed, 'Mobile drawer cleanly closed upon clicking close button');

    cdp.close();

    console.log('\n======================================================');
    console.log(`REAL BROWSER E2E SUMMARY: ${passed} Passed, ${failed} Failed`);
    console.log('======================================================\n');
  } finally {
    edge.kill();
  }

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runBrowserTest().catch((err) => {
  console.error('Browser test failed:', err);
  process.exit(1);
});
