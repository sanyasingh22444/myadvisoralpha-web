import { spawn } from 'node:child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DEBUG_PORT = 9228;

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

    await cdp.send('Page.navigate', { url: 'http://localhost:3000' });
    await delay(3000);

    const viewports = [
      { name: 'Desktop', width: 1440, height: 900, mobile: false },
      { name: 'Tablet', width: 768, height: 1024, mobile: false },
      { name: 'Mobile', width: 375, height: 812, mobile: true },
    ];

    const results = [];

    for (const vp of viewports) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile,
      });
      await delay(500);

      const data = await cdp.eval(`
        (() => {
          const winWidth = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
          const cardRect = card ? card.getBoundingClientRect() : null;
          const phone = document.querySelector('.rounded-\\\\[44px\\\\]');
          const phoneRect = phone ? phone.getBoundingClientRect() : null;
          const headline = document.querySelector('h1');
          const headlineRect = headline ? headline.getBoundingClientRect() : null;

          return {
            viewport: winWidth,
            docScrollWidth,
            bodyScrollWidth,
            hasDocHorizontalOverflow: docScrollWidth > winWidth,
            card: cardRect ? {
              left: Math.round(cardRect.left),
              right: Math.round(cardRect.right),
              width: Math.round(cardRect.width),
              overflow: Math.round(cardRect.right) > winWidth
            } : null,
            phone: phoneRect ? {
              left: Math.round(phoneRect.left),
              right: Math.round(phoneRect.right),
              width: Math.round(phoneRect.width),
              overflow: Math.round(phoneRect.right) > winWidth
            } : null,
            headline: headlineRect ? {
              left: Math.round(headlineRect.left),
              right: Math.round(headlineRect.right),
              width: Math.round(headlineRect.width),
              overflow: Math.round(headlineRect.right) > winWidth
            } : null,
          };
        })()
      `);

      results.push({ name: vp.name, ...data });
    }

    console.log('MULTI-VIEWPORT LAYOUT VERIFICATION:');
    console.log(JSON.stringify(results, null, 2));

    cdp.close();
  } finally {
    edge.kill();
  }
}

run().catch(console.error);
