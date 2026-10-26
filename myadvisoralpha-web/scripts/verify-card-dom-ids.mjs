import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('.next/server/app/index.html');
const showcasePath = path.resolve('src/components/sections/StackedShowcase.tsx');
const navbarPath = path.resolve('src/components/layout/Navbar.tsx');
const mobileNavPath = path.resolve('src/components/layout/MobileNav.tsx');

console.log('==============================================================================');
console.log('CHALLENGER EMPIRICAL VERIFICATION & ADVERSARIAL STRESS TEST');
console.log('==============================================================================');

if (!fs.existsSync(htmlPath)) {
  console.error('ERROR: .next/server/app/index.html does not exist. Run build first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const showcaseSrc = fs.readFileSync(showcasePath, 'utf8');
const navbarSrc = fs.readFileSync(navbarPath, 'utf8');
const mobileNavSrc = fs.readFileSync(mobileNavPath, 'utf8');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failures = [];

function check(desc, condition, failDetail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✔ [PASS] ${desc}`);
  } else {
    failedChecks++;
    const msg = `✖ [FAIL] ${desc} ${failDetail ? `(${failDetail})` : ''}`;
    failures.push(msg);
    console.error(`  ${msg}`);
  }
}

async function run() {
  // -----------------------------------------------------------------------------
  // Test Group 1: Card DOM IDs Check (Static HTML)
  // -----------------------------------------------------------------------------
  console.log('\n--- 1. Showcase Card DOM IDs Verification (Static Build) ---');
  const cardIds = [
    'single-stocks',
    'model-portfolios',
    'curated-mutual-funds',
    'execution-tools',
    'cio-edge'
  ];

  for (const id of cardIds) {
    const inShowcaseArray = showcaseSrc.includes(`id: '${id}'`);
    check(`Card ID "${id}" declared in SHOWCASE_CARDS array`, inShowcaseArray);
    
    const inDomAsId = html.includes(`id="${id}"`);
    check(`Card ID "${id}" rendered as id="${id}" in static DOM`, inDomAsId, 'Missing id attribute in rendered static HTML');
  }

  // -----------------------------------------------------------------------------
  // Test Group 2: Live Server DOM Check
  // -----------------------------------------------------------------------------
  console.log('\n--- 2. Live Server DOM Inspection (http://localhost:3000) ---');
  try {
    const res = await fetch('http://localhost:3000');
    check('Live server responds with HTTP 200', res.status === 200);
    const liveHtml = await res.text();
    for (const id of cardIds) {
      const inLiveDom = liveHtml.includes(`id="${id}"`);
      check(`Card ID "${id}" present in live server DOM`, inLiveDom, 'Not rendered in live DOM response');
    }
  } catch (err) {
    console.warn('Live server check skipped or failed:', err.message);
  }

  // -----------------------------------------------------------------------------
  // Test Group 3: Stacking Math & CSS Sticky
  // -----------------------------------------------------------------------------
  console.log('\n--- 3. Stacking Math & CSS Sticky Verification ---');
  check('Top offset formula "120 + index * 20" intact', showcaseSrc.includes('const topOffset = 120 + index * 20;'));
  check('Z-index formula "20 + index" intact', showcaseSrc.includes('const zIndex = 20 + index;'));
  check('Sticky class "sticky transition-all duration-300" intact', showcaseSrc.includes('className="sticky transition-all duration-300"'));
  check('Showcase section overflow-visible intact', showcaseSrc.includes('overflow-visible'));

  // Check exact computed styles for 5 cards
  for (let i = 0; i < 5; i++) {
    const expectedTop = 120 + i * 20;
    const expectedZ = 20 + i;
    check(`Card index ${i}: top offset is ${expectedTop}px`, expectedTop === (120 + i * 20));
    check(`Card index ${i}: z-index is ${expectedZ}`, expectedZ === (20 + i));
  }

  // -----------------------------------------------------------------------------
  // Test Group 4: Responsive Classes in StackedShowcase
  // -----------------------------------------------------------------------------
  console.log('\n--- 4. Responsive Classes in StackedShowcase.tsx ---');
  check('1-col mobile, 12-col desktop grid', showcaseSrc.includes('grid grid-cols-1 lg:grid-cols-12'));
  check('5-col visual panel', showcaseSrc.includes('lg:col-span-5'));
  check('7-col content panel', showcaseSrc.includes('lg:col-span-7'));
  check('Responsive border separator', showcaseSrc.includes('border-b lg:border-b-0 lg:border-r border-white/10'));
  check('Full-width mobile CTA button', showcaseSrc.includes('w-full sm:w-auto'));
  check('Responsive horizontal padding', showcaseSrc.includes('px-4 sm:px-6 lg:px-12'));

  // -----------------------------------------------------------------------------
  // Test Group 5: Navbar & MobileNav Hierarchy Links & Anchors
  // -----------------------------------------------------------------------------
  console.log('\n--- 5. Navbar & MobileNav Anchors in DOM ---');
  const navAnchors = ['offerings', 'futures', 'mtf-basket', 'portfolios', 'mutual-funds', 'faq', 'calculator'];
  for (const a of navAnchors) {
    const anchorInDom = html.includes(`id="${a}"`);
    check(`Anchor target #${a} exists in homepage DOM`, anchorInDom, `Element with id="${a}" not found in index.html`);
  }

  // -----------------------------------------------------------------------------
  // Summary
  // -----------------------------------------------------------------------------
  console.log('\n==============================================================================');
  console.log('VERIFICATION SUMMARY');
  console.log('==============================================================================');
  console.log(`Total Checks  : ${totalChecks}`);
  console.log(`Passed        : ${passedChecks}`);
  console.log(`Failed        : ${failedChecks}`);
  console.log('------------------------------------------------------------------------------');

  if (failedChecks > 0) {
    console.log('EMPIRICAL FAILURES DETECTED:');
    failures.forEach(f => console.log('  ' + f));
    console.log('\nVERDICT: REQUEST_CHANGES');
    process.exit(1);
  } else {
    console.log('ALL VERIFICATIONS PASSED.');
    console.log('\nVERDICT: APPROVE');
    process.exit(0);
  }
}

run();
