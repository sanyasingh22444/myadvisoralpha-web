import { spawn } from 'node:child_process';

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

async function audit() {
  console.log('Launching Edge headless...');
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

    try {
      await cdp.send('Page.navigate', { url: targetUrl });
      await delay(2000);
    } catch (err) {
      console.error('Navigation error:', err);
    }

    const viewports = [
      { name: 'Desktop (1440px)', width: 1440, height: 900, mobile: false },
      { name: 'Tablet (768px)', width: 768, height: 1024, mobile: false },
      { name: 'Mobile (375px)', width: 375, height: 667, mobile: true },
    ];

    for (const vp of viewports) {
      console.log(`\n======================================================`);
      console.log(`AUDITING VIEWPORT: ${vp.name}`);
      console.log(`======================================================`);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile,
      });
      await delay(500);

      const metrics = await cdp.eval(`
        (() => {
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const winInnerWidth = window.innerWidth;

          // Hero section metrics
          const heroSection = document.querySelector('section');
          const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
          const heroScrollWidth = heroSection ? heroSection.scrollWidth : null;
          const heroClientWidth = heroSection ? heroSection.clientWidth : null;

          // Check all children inside hero section for overflow
          const overflowingInHero = [];
          if (heroSection) {
            const allHeroElements = heroSection.querySelectorAll('*');
            for (const el of allHeroElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > winInnerWidth + 1 || rect.left < -1) {
                overflowingInHero.push({
                  tag: el.tagName,
                  className: el.className,
                  id: el.id,
                  left: Math.round(rect.left),
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                  textSnippet: (el.textContent || '').trim().slice(0, 30)
                });
              }
            }
          }

          // Check all elements on the entire page for overflow
          const allOverflowingOnPage = [];
          const allElements = document.querySelectorAll('*');
          for (const el of allElements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > winInnerWidth + 1) {
              allOverflowingOnPage.push({
                tag: el.tagName,
                className: typeof el.className === 'string' ? el.className.slice(0, 50) : '',
                id: el.id,
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                textSnippet: (el.textContent || '').trim().slice(0, 30)
              });
            }
          }

          return {
            docScrollWidth,
            bodyScrollWidth,
            winInnerWidth,
            hero: {
              scrollWidth: heroScrollWidth,
              clientWidth: heroClientWidth,
              rectWidth: heroRect ? Math.round(heroRect.width) : null,
              rectLeft: heroRect ? Math.round(heroRect.left) : null,
              rectRight: heroRect ? Math.round(heroRect.right) : null,
              overflowingCount: overflowingInHero.length,
              overflowing: overflowingInHero.slice(0, 5),
            },
            totalPageOverflowCount: allOverflowingOnPage.length,
            pageOverflowingTop5: allOverflowingOnPage.slice(0, 5),
          };
        })()
      `);

      console.log('Document ScrollWidth:', metrics.docScrollWidth, 'vs Window InnerWidth:', metrics.winInnerWidth);
      console.log('Hero Section ScrollWidth:', metrics.hero.scrollWidth, 'ClientWidth:', metrics.hero.clientWidth, 'Rect:', metrics.hero.rectLeft, 'to', metrics.hero.rectRight);
      console.log('Hero Internal Overflowing Elements Count:', metrics.hero.overflowingCount);
      if (metrics.hero.overflowingCount > 0) {
        console.log('Hero Overflowing Elements:', JSON.stringify(metrics.hero.overflowing, null, 2));
      }
      console.log('Total Page Overflowing Elements Count:', metrics.totalPageOverflowCount);
      if (metrics.totalPageOverflowCount > 0) {
        console.log('Page Overflowing Samples:', JSON.stringify(metrics.pageOverflowingTop5, null, 2));
      }
    }

    // AUDIT 2: Promotional Ad Card Click -> Lead Modal
    console.log(`\n======================================================`);
    console.log(`AUDITING PROMOTIONAL AD CARD & LEAD MODAL TRIGGER`);
    console.log(`======================================================`);

    // Reset to Desktop 1440
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    // Check promotional ad card existence
    const promoCardData = await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        if (!card) return { found: false };
        const text = card.textContent;
        const rect = card.getBoundingClientRect();
        return {
          found: true,
          text: text.trim(),
          role: card.getAttribute('role'),
          tabIndex: card.getAttribute('tabindex'),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          visible: rect.width > 0 && rect.height > 0
        };
      })()
    `);
    console.log('Promo Card Found:', promoCardData);

    // Check modal state before click
    const modalBefore = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        return {
          exists: !!modal,
          headline: modal ? modal.querySelector('#modal-headline')?.textContent : null,
        };
      })()
    `);
    console.log('Modal Before Click:', modalBefore);

    // Listen for console errors during click
    const consoleErrors = [];
    cdp.on('Runtime.consoleAPICalled', (params) => {
      if (params.type === 'error') {
        consoleErrors.push(params.args.map(a => a.value || a.description).join(' '));
      }
    });

    // Click the promotional ad card
    console.log('Clicking Promotional Ad Card...');
    await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        card.click();
      })()
    `);
    await delay(600);

    // Check modal state after click
    const modalAfter = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return { open: false };
        const headline = modal.querySelector('#modal-headline')?.textContent;
        const phoneInput = modal.querySelector('input[name="phone"]');
        const nameInput = modal.querySelector('input[name="name"]');
        const emailInput = modal.querySelector('input[name="email"]');
        const submitBtn = modal.querySelector('button[type="submit"]');
        return {
          open: true,
          headline,
          phoneValue: phoneInput ? phoneInput.value : null,
          nameValue: nameInput ? nameInput.value : null,
          emailValue: emailInput ? emailInput.value : null,
          submitBtnText: submitBtn ? submitBtn.textContent.trim() : null,
          ariaModal: modal.getAttribute('aria-modal')
        };
      })()
    `);
    console.log('Modal After Click:', modalAfter);
    console.log('Console Errors Captured during click:', consoleErrors);

    // Test typing and submitting the lead form from this promotional trigger
    console.log('\nTesting Lead Form Interaction Inside Modal...');
    await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        const nameInput = modal.querySelector('input[name="name"]');
        const phoneInput = modal.querySelector('input[name="phone"]');
        const emailInput = modal.querySelector('input[name="email"]');
        const select = modal.querySelector('select[name="portfolioSize"]');

        const setVal = (el, val) => {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setVal(nameInput, 'Rajesh Challenger');
        setVal(phoneInput, '9820123456');
        setVal(emailInput, 'rajesh@challenger.test');

        select.value = '₹5L - ₹25L';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      })()
    `);
    await delay(300);

    // Click submit
    console.log('Submitting Lead Form...');
    await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        const form = modal.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      })()
    `);
    await delay(1200); // 800ms simulation latency + margin

    // Check confirmation screen
    const modalSuccess = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return { success: false, reason: 'Modal not found' };
        const text = modal.textContent;
        const hasConfirmed = text.includes('Consultation Confirmed');
        const ticket = modal.querySelector('.font-mono')?.textContent;
        return {
          success: hasConfirmed,
          ticketCode: ticket,
          hasTicket: !!ticket && ticket.startsWith('#AA-')
        };
      })()
    `);
    console.log('Modal Submission Result:', modalSuccess);

    // Close the modal
    console.log('Closing Modal...');
    await cdp.eval(`
      (() => {
        const closeBtn = document.querySelector('[role="dialog"] button');
        closeBtn.click();
      })()
    `);
    await delay(400);

    const modalClosed = await cdp.eval(`
      document.querySelector('[role="dialog"]') === null
    `);
    console.log('Modal Closed cleanly:', modalClosed);

    // AUDIT 3: Rotating Headline
    console.log(`\n======================================================`);
    console.log(`AUDITING DYNAMIC ROTATING HEADLINE`);
    console.log(`======================================================`);
    const initialWord = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log('Initial Headline:', initialWord);

    console.log('Waiting 2.8s for first rotation...');
    await delay(2800);
    const secondWord = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log('Second Headline:', secondWord);

    console.log('Waiting 2.8s for second rotation...');
    await delay(2800);
    const thirdWord = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log('Third Headline:', thirdWord);

    cdp.close();
  } finally {
    edge.kill();
  }
}

audit().catch(console.error);
