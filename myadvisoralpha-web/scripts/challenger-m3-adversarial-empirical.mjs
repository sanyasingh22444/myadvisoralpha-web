import { spawn } from 'node:child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const DEBUG_PORT = 9229;
const TARGET_URL = 'http://127.0.0.1:3000';

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

async function runAdversarialChallenge() {
  console.log('==============================================================================');
  console.log('CHALLENGER M3: EMPIRICAL ADVERSARIAL TEST HARNESS');
  console.log('==============================================================================\n');

  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=1440,900',
  ]);

  const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    failures: [],
  };

  function assert(condition, message, details = '') {
    summary.total++;
    if (condition) {
      summary.passed++;
      console.log(`  ✔ [PASS] ${message}`);
    } else {
      summary.failed++;
      summary.failures.push({ message, details });
      console.log(`  ✖ [FAIL] ${message} ${details ? '(' + details + ')' : ''}`);
    }
  }

  try {
    const wsUrl = await getDebuggerUrl();
    const cdp = new CDPClient(wsUrl);
    await cdp.ready;

    const consoleErrors = [];
    const jsExceptions = [];

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');

    cdp.on('Runtime.consoleAPICalled', (params) => {
      if (params.type === 'error') {
        const text = params.args.map((a) => a.value || a.description).join(' ');
        consoleErrors.push(text);
      }
    });

    cdp.on('Runtime.exceptionThrown', (params) => {
      jsExceptions.push(params.exceptionDetails.text + ' ' + (params.exceptionDetails.exception?.description || ''));
    });

    console.log(`Navigating to ${TARGET_URL}...`);
    await cdp.send('Page.navigate', { url: TARGET_URL });
    await delay(3500);

    // -------------------------------------------------------------------------
    // TEST SUITE 1: RESPONSIVE LAYOUT & ZERO HORIZONTAL OVERFLOW
    // -------------------------------------------------------------------------
    console.log('\n--- 1. RESPONSIVE LAYOUT & ZERO HORIZONTAL OVERFLOW AUDIT ---');

    const viewports = [
      { name: 'Desktop (1440px)', width: 1440, height: 900, mobile: false },
      { name: 'Small Desktop (1024px)', width: 1024, height: 768, mobile: false },
      { name: 'Tablet (768px)', width: 768, height: 1024, mobile: false },
      { name: 'Phablet (480px)', width: 480, height: 854, mobile: true },
      { name: 'Mobile (375px)', width: 375, height: 812, mobile: true },
      { name: 'Compact Mobile (360px)', width: 360, height: 740, mobile: true },
    ];

    for (const vp of viewports) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile,
      });
      await delay(400);

      const metrics = await cdp.eval(`
        (() => {
          const winWidth = window.innerWidth;
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
          const cardRect = card ? card.getBoundingClientRect() : null;
          const headline = document.querySelector('h1');
          const headlineRect = headline ? headline.getBoundingClientRect() : null;
          const hero = document.querySelector('section');
          const heroComputed = hero ? window.getComputedStyle(hero) : null;

          return {
            winWidth,
            docScrollWidth,
            bodyScrollWidth,
            heroOverflowHidden: heroComputed ? heroComputed.overflow === 'hidden' : false,
            cardFound: !!card,
            cardWithinViewport: cardRect ? (cardRect.right <= winWidth + 1 && cardRect.left >= -1) : false,
            headlineWithinViewport: headlineRect ? (headlineRect.right <= winWidth + 1) : false,
            cardWidth: cardRect ? Math.round(cardRect.width) : null,
          };
        })()
      `);

      assert(metrics.docScrollWidth <= vp.width, `${vp.name}: Document scrollWidth (${metrics.docScrollWidth}px) <= Viewport (${vp.width}px) [Zero horizontal scrollbar]`);
      assert(metrics.bodyScrollWidth <= vp.width, `${vp.name}: Body scrollWidth (${metrics.bodyScrollWidth}px) <= Viewport (${vp.width}px)`);
      assert(metrics.cardFound, `${vp.name}: Promotional ad card rendered`);
      assert(metrics.cardWithinViewport, `${vp.name}: Promotional ad card fits entirely within viewport boundaries`);
      assert(metrics.headlineWithinViewport, `${vp.name}: Hero headline fits within viewport`);
      assert(metrics.heroOverflowHidden, `${vp.name}: Hero section has overflow: hidden`);
    }

    // -------------------------------------------------------------------------
    // TEST SUITE 2: PROMOTIONAL AD CARD & LEAD MODAL TRIGGER
    // -------------------------------------------------------------------------
    console.log('\n--- 2. PROMOTIONAL AD CARD & CONSULTATION LEAD MODAL TRIGGER AUDIT ---');

    // Switch back to Desktop 1440px
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(300);

    const cardDetails = await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        if (!card) return null;
        const cs = window.getComputedStyle(card);
        const rect = card.getBoundingClientRect();
        return {
          text: card.textContent.trim(),
          role: card.getAttribute('role'),
          tabIndex: card.getAttribute('tabindex'),
          cursor: cs.cursor,
          width: Math.round(rect.width),
          hasSebiBadge: card.textContent.includes('SEBI Registered'),
          hasOfferText: card.textContent.includes('Get 2 free -> investment/ trade ideas') || card.textContent.includes('Get 2 free -&gt; investment/ trade ideas'),
          hasTrustSubtext: card.textContent.includes('Zero custody risk'),
        };
      })()
    `);

    assert(cardDetails !== null, 'Promotional ad card exists in DOM');
    assert(cardDetails?.hasOfferText, 'Promotional ad card contains exact copy: "Get 2 free -> investment/ trade ideas"');
    assert(cardDetails?.hasSebiBadge, 'Promotional ad card contains "SEBI Registered" trust badge');
    assert(cardDetails?.hasTrustSubtext, 'Promotional ad card contains trust microcopy "Zero custody risk"');
    assert(cardDetails?.role === 'button', 'Promotional ad card has accessible role="button"');
    assert(cardDetails?.tabIndex === '0', 'Promotional ad card has tabIndex="0" for keyboard focus');
    assert(cardDetails?.cursor === 'pointer', 'Promotional ad card has CSS cursor: pointer');

    // Modal state before click
    const modalBefore = await cdp.eval(`!!document.querySelector('[role="dialog"]')`);
    assert(!modalBefore, 'Consultation modal is initially closed (not in DOM)');

    // Click promotional ad card
    console.log('  Triggering click event on Promotional Ad Card...');
    const errorsBeforeClickCount = consoleErrors.length + jsExceptions.length;
    await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        card.click();
      })()
    `);
    await delay(600);

    const modalAfterClick = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return null;
        return {
          open: true,
          ariaModal: modal.getAttribute('aria-modal'),
          headline: modal.querySelector('#modal-headline')?.textContent?.trim() || modal.querySelector('h3, h2')?.textContent?.trim(),
          hasNameInput: !!modal.querySelector('input[name="name"]'),
          hasPhoneInput: !!modal.querySelector('input[name="phone"]'),
          hasEmailInput: !!modal.querySelector('input[name="email"]'),
          hasPortfolioSelect: !!modal.querySelector('select[name="portfolioSize"]'),
          hasSubmitButton: !!modal.querySelector('button[type="submit"]'),
          submitBtnText: modal.querySelector('button[type="submit"]')?.textContent?.trim(),
          hasCloseButton: !!modal.querySelector('button[aria-label="Close dialog"], [role="dialog"] button:first-of-type'),
        };
      })()
    `);

    assert(modalAfterClick !== null, 'Clicking Promotional Ad Card opens consultation lead modal');
    assert(modalAfterClick?.ariaModal === 'true', 'Modal has aria-modal="true"');
    assert(modalAfterClick?.headline?.includes('Advisory Consultation'), 'Modal displays "Book Advisory Consultation" header');
    assert(modalAfterClick?.hasNameInput, 'Modal includes Name input field');
    assert(modalAfterClick?.hasPhoneInput, 'Modal includes Phone input field');
    assert(modalAfterClick?.hasEmailInput, 'Modal includes Email input field');
    assert(modalAfterClick?.hasPortfolioSelect, 'Modal includes Portfolio Size selection');
    assert(modalAfterClick?.hasSubmitButton, 'Modal includes Submit button');

    const errorsAfterClickCount = consoleErrors.length + jsExceptions.length;
    assert(errorsAfterClickCount === errorsBeforeClickCount, 'Zero console errors or exceptions during modal trigger');

    // -------------------------------------------------------------------------
    // TEST SUITE 3: LEAD CAPTURE FORM SUBMISSION & WORKFLOW FROM PROMO TRIGGER
    // -------------------------------------------------------------------------
    console.log('\n--- 3. MODAL FORM SUBMISSION WORKFLOW & CONFIRMATION AUDIT ---');

    // Fill the modal form
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

        setVal(nameInput, 'Empirical Challenger M3');
        setVal(phoneInput, '9820123456');
        setVal(emailInput, 'challenger_m3@advisoralpha.test');

        if (select) {
          select.value = '₹5L - ₹25L';
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()
    `);
    await delay(300);

    // Submit the form
    console.log('  Submitting consultation request from promotional trigger...');
    await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        const form = modal.querySelector('form');
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      })()
    `);
    await delay(1200);

    const confirmationResult = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return null;
        const text = modal.textContent;
        const ticket = modal.querySelector('.font-mono')?.textContent?.trim();
        return {
          hasConfirmedMessage: text.includes('Consultation Confirmed') || text.includes('Request Received'),
          ticketCode: ticket,
          hasValidTicketFormat: !!ticket && ticket.startsWith('#AA-'),
          hasSmsWhatsAppNotice: text.includes('WhatsApp') || text.includes('24 hours') || text.includes('advisor'),
        };
      })()
    `);

    assert(confirmationResult?.hasConfirmedMessage, 'Modal successfully resolves to Confirmation state');
    assert(confirmationResult?.hasValidTicketFormat, `Generated unique lead reference ticket: ${confirmationResult?.ticketCode}`);
    assert(confirmationResult?.hasSmsWhatsAppNotice, 'Displays advisor outreach commitment');

    // Close the modal
    console.log('  Closing modal via close button...');
    await cdp.eval(`
      (() => {
        const closeBtn = document.querySelector('[role="dialog"] button');
        closeBtn.click();
      })()
    `);
    await delay(400);

    const modalClosedCleanly = await cdp.eval(`document.querySelector('[role="dialog"]') === null`);
    assert(modalClosedCleanly, 'Modal closed cleanly and unmounted from DOM');

    // Reopen modal via keyboard Enter on promotional ad card
    console.log('  Reopening modal via keyboard navigation (Enter key on Promotional Ad Card)...');
    await cdp.eval(`
      (() => {
        const card = document.querySelector('[aria-label="Get 2 free investment or trade ideas"]');
        card.focus();
        card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      })()
    `);
    await delay(500);

    const modalReopened = await cdp.eval(`!!document.querySelector('[role="dialog"]')`);
    assert(modalReopened, 'Keyboard navigation (Enter key) successfully triggers consultation lead modal');

    // Close modal via Escape key
    console.log('  Dismissing modal via Escape key...');
    await cdp.eval(`
      (() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      })()
    `);
    await delay(400);

    const modalDismissedByEscape = await cdp.eval(`document.querySelector('[role="dialog"]') === null`);
    assert(modalDismissedByEscape, 'Escape key dismisses consultation lead modal');

    // -------------------------------------------------------------------------
    // TEST SUITE 4: DYNAMIC ROTATING HEADLINE
    // -------------------------------------------------------------------------
    console.log('\n--- 4. DYNAMIC ROTATING HEADLINE AUDIT ---');

    const word1 = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log(`  Initial headline state: "${word1}"`);
    assert(word1?.startsWith('Advisory in'), 'Headline begins with static prefix "Advisory in"');

    console.log('  Awaiting 2.7s for first word rotation...');
    await delay(2700);
    const word2 = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log(`  Second headline state: "${word2}"`);
    assert(word2 !== word1, `Headline rotated successfully to: "${word2}"`);
    assert(word2?.startsWith('Advisory in'), 'Rotated headline maintains "Advisory in" prefix');

    console.log('  Awaiting 2.7s for second word rotation...');
    await delay(2700);
    const word3 = await cdp.eval(`
      document.querySelector('h1')?.textContent?.trim()
    `);
    console.log(`  Third headline state: "${word3}"`);
    assert(word3 !== word2, `Headline rotated successfully to: "${word3}"`);

    const distinctWords = new Set([word1, word2, word3].map(w => w?.replace('Advisory in', '').trim()));
    assert(distinctWords.size >= 2, `Verified dynamic word cycling across distinct canonical keywords: ${Array.from(distinctWords).join(', ')}`);

    // -------------------------------------------------------------------------
    // TEST SUITE 5: BRAND ISOLATION & ACCESSIBILITY AUDIT
    // -------------------------------------------------------------------------
    console.log('\n--- 5. BRAND ISOLATION & COMPLIANCE AUDIT ---');

    const compliance = await cdp.eval(`
      (() => {
        const bodyText = document.body.innerText;
        const heroSection = document.querySelector('section');
        const heroHtml = heroSection ? heroSection.outerHTML : '';
        return {
          univestCount: (bodyText.match(/univest/gi) || []).length,
          hasPankajMurarka: bodyText.includes('Pankaj Murarka'),
          hasSebiLicense: bodyText.includes('INH000021818'),
          has75StrikeRate: bodyText.includes('75%'),
          has1LakhActive: bodyText.includes('1 Lakh+'),
          has2000CrAdvisory: bodyText.includes('₹2,000 Cr+'),
        };
      })()
    `);

    assert(compliance.univestCount === 0, 'Zero Univest mentions anywhere in rendered DOM');
    assert(compliance.hasPankajMurarka, 'Hero highlights founder Pankaj Murarka');
    assert(compliance.hasSebiLicense, 'Hero displays SEBI RA license INH000021818');
    assert(compliance.has75StrikeRate, 'Hero preserves 75% Historical Strike Rate assertion');
    assert(compliance.has1LakhActive, 'Hero preserves 1 Lakh+ Active Investors assertion');
    assert(compliance.has2000CrAdvisory, 'Hero preserves ₹2,000 Cr+ Advisory Guided assertion');

    // Final Error Tally
    assert(consoleErrors.length === 0, `Zero runtime console errors during entire session (Actual: ${consoleErrors.length})`, consoleErrors.join(' | '));
    assert(jsExceptions.length === 0, `Zero uncaught JavaScript exceptions during entire session (Actual: ${jsExceptions.length})`, jsExceptions.join(' | '));

    cdp.close();
  } finally {
    edge.kill();
  }

  console.log('\n==============================================================================');
  console.log(`CHALLENGER M3 FINAL RESULT: ${summary.passed}/${summary.total} ASSERTIONS PASSED`);
  if (summary.failed > 0) {
    console.log(`FAILURES (${summary.failed}):`);
    summary.failures.forEach(f => console.log(`  - ${f.message}: ${f.details}`));
    console.log('VERDICT: REQUEST_CHANGES');
  } else {
    console.log('VERDICT: APPROVE');
  }
  console.log('==============================================================================\n');

  if (summary.failed > 0) process.exit(1);
}

runAdversarialChallenge().catch(err => {
  console.error('Fatal challenge execution error:', err);
  process.exit(1);
});
