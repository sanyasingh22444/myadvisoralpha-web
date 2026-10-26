import { spawn } from 'node:child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DEBUG_PORT = 9225;

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

async function run() {
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

    console.log('Navigating to http://localhost:3000...');
    await cdp.send('Page.navigate', { url: 'http://localhost:3000' });
    await delay(3500);

    // 1. Check Card element & styles
    const cardInfo = await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        if (!card) return { found: false };
        const cs = window.getComputedStyle(card);
        const rect = card.getBoundingClientRect();
        return {
          found: true,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          computed: {
            width: cs.width,
            maxWidth: cs.maxWidth,
            display: cs.display,
            position: cs.position,
            cursor: cs.cursor,
          },
          parentTag: card.parentElement ? card.parentElement.tagName : null,
          parentClass: card.parentElement ? card.parentElement.className : null,
          parentComputedWidth: card.parentElement ? window.getComputedStyle(card.parentElement).width : null,
        };
      })()
    `);
    console.log('CARD INFO:', JSON.stringify(cardInfo, null, 2));

    // 2. Check modal before and click
    const modalBefore = await cdp.eval(`!!document.querySelector('[role="dialog"]')`);
    console.log('Modal before click:', modalBefore);

    // Trigger click on card
    console.log('Triggering click on card...');
    const clickResult = await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        if (!card) return 'no card';
        card.click();
        return 'clicked';
      })()
    `);
    console.log('Click invocation:', clickResult);
    await delay(1000);

    const modalAfter = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return { open: false };
        return {
          open: true,
          text: modal.textContent.slice(0, 100),
          title: modal.querySelector('h3, h2, #modal-headline')?.textContent
        };
      })()
    `);
    console.log('Modal after click:', JSON.stringify(modalAfter, null, 2));

    // 3. Test Rotating Headline
    console.log('\n--- ROTATING HEADLINE TEST ---');
    const h1Text1 = await cdp.eval(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('H1 at T=0:', h1Text1);
    await delay(2800);
    const h1Text2 = await cdp.eval(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('H1 at T=2.8s:', h1Text2);
    await delay(2800);
    const h1Text3 = await cdp.eval(`document.querySelector('h1')?.textContent?.trim()`);
    console.log('H1 at T=5.6s:', h1Text3);

    // 4. Test Viewport Overflows
    console.log('\n--- VIEWPORT OVERFLOW AUDIT ---');
    for (const width of [1440, 768, 375, 320]) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: width <= 768 ? 2 : 1,
        mobile: width <= 768,
      });
      await delay(400);

      const overflow = await cdp.eval(`
        (() => {
          const docScrollWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const hero = document.querySelector('section');
          return {
            winWidth,
            docScrollWidth,
            hasDocOverflow: docScrollWidth > winWidth,
            heroScrollWidth: hero ? hero.scrollWidth : null,
            heroClientWidth: hero ? hero.clientWidth : null,
            hasHeroOverflow: hero ? hero.scrollWidth > hero.clientWidth : false
          };
        })()
      `);
      console.log(`Viewport ${width}px:`, JSON.stringify(overflow));
    }

    cdp.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
