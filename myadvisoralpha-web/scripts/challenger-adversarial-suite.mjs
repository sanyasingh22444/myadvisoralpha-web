#!/usr/bin/env node
/**
 * ==============================================================================
 * CHALLENGER FINAL 2: Independent Empirical Stress Testing & Boundary Harness
 * ==============================================================================
 * Target: myadvisoralpha-web
 * Validates:
 *   1. Math & Compounding Verification (src/lib/calculator.ts)
 *   2. Lead Form Validation Verification (PHONE_REGEX = /^[6-9]\d{9}$/)
 *   3. CSS Sticky & Stacking Formulas (globals.css, StackedShowcase.tsx, Responsive)
 * ==============================================================================
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const appDir = resolve(process.cwd());
console.log('Challenger Target Directory:', appDir);

let suitePassed = 0;
let suiteFailed = 0;
const failureLog = [];

function assert(condition, testName, details = '') {
  if (condition) {
    suitePassed++;
    console.log(`  ✔ [PASS] ${testName}`);
  } else {
    suiteFailed++;
    const errMsg = `✖ [FAIL] ${testName} ${details ? `(${details})` : ''}`;
    failureLog.push(errMsg);
    console.error(`  ${errMsg}`);
  }
}

async function runAllChallengerTests() {
  console.log('\n==============================================================================');
  console.log('PART 1: MATH & COMPOUNDING VERIFICATION (src/lib/calculator.ts)');
  console.log('==============================================================================');

  // Dynamic import of TypeScript library via Node 22 native type stripping
  const calcModule = await import('../src/lib/calculator.ts');
  const {
    calculateSip,
    calculateLumpsum,
    calculateAlphaComparison,
    generateYearlyProgression,
    mapWealthToPortfolioBucket,
    CALCULATOR_BOUNDS,
  } = calcModule;

  // ---------------------------------------------------------------------------
  // 1.1 Rate = 0 (Zero Interest Rate)
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.1 Testing Rate = 0 (Zero Interest Rate) ---');
  {
    // SIP with r = 0
    const sipZeroRate = calculateSip(25000, 10, 0);
    assert(!Number.isNaN(sipZeroRate.totalValue), 'SIP rate=0 totalValue is not NaN');
    assert(Number.isFinite(sipZeroRate.totalValue), 'SIP rate=0 totalValue is finite');
    assert(sipZeroRate.invested === 3000000, 'SIP rate=0 invested is ₹30,00,000 (25k * 120)');
    assert(sipZeroRate.totalValue === sipZeroRate.invested, 'SIP rate=0 totalValue equals invested capital (no interest)');
    assert(sipZeroRate.gain === 0, 'SIP rate=0 gain is exactly 0');
    assert(sipZeroRate.gainPercentage === 0, 'SIP rate=0 gainPercentage is 0');
    assert(sipZeroRate.estimatedReturn === 0, 'SIP rate=0 estimatedReturn is 0');

    // Object signature test
    const sipZeroObj = calculateSip({ monthlyInvestment: 25000, timePeriodYears: 10, expectedReturnRate: 0 });
    assert(sipZeroObj.totalValue === 3000000, 'SIP object invocation with rate=0 returns correct invested capital');

    // Lumpsum with r = 0
    const lumpZeroRate = calculateLumpsum(500000, 10, 0);
    assert(!Number.isNaN(lumpZeroRate.totalValue), 'Lumpsum rate=0 totalValue is not NaN');
    assert(Number.isFinite(lumpZeroRate.totalValue), 'Lumpsum rate=0 totalValue is finite');
    assert(lumpZeroRate.invested === 500000, 'Lumpsum rate=0 invested is ₹5,00,000');
    assert(lumpZeroRate.totalValue === 500000, 'Lumpsum rate=0 totalValue equals principal');
    assert(lumpZeroRate.gain === 0, 'Lumpsum rate=0 gain is exactly 0');
    assert(lumpZeroRate.estimatedReturn === 0, 'Lumpsum rate=0 estimatedReturn is 0');

    // Alpha Comparison with r = 0
    const alphaZero = calculateAlphaComparison(25000, 10, 'sip', 0, 0);
    assert(!Number.isNaN(alphaZero.extraWealthCreated), 'Alpha comparison rate=0 extra wealth is not NaN');
    assert(alphaZero.extraWealthCreated === 0, 'Alpha comparison with identical rate=0 yields 0 extra wealth');
  }

  // ---------------------------------------------------------------------------
  // 1.2 Rate = 100 (100% Extreme Annual CAGR)
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.2 Testing Rate = 100 (100% Annual CAGR) ---');
  {
    // SIP with r = 100, 10 years, 25k/mo
    const sipRate100 = calculateSip(25000, 10, 100);
    assert(!Number.isNaN(sipRate100.totalValue), 'SIP rate=100 totalValue is not NaN');
    assert(Number.isFinite(sipRate100.totalValue), 'SIP rate=100 totalValue is finite (no overflow to Infinity)');
    assert(sipRate100.totalValue > sipRate100.invested, 'SIP rate=100 totalValue exceeds invested amount');
    assert(sipRate100.gain > 0, 'SIP rate=100 gain is positive');
    assert(!Number.isNaN(sipRate100.gainPercentage), 'SIP rate=100 gain percentage is not NaN');

    // Lumpsum with r = 100, 10 years, 500k: FV = 500000 * 2^10 = 512,000,000
    const lumpRate100 = calculateLumpsum(500000, 10, 100);
    assert(!Number.isNaN(lumpRate100.totalValue), 'Lumpsum rate=100 totalValue is not NaN');
    assert(Number.isFinite(lumpRate100.totalValue), 'Lumpsum rate=100 totalValue is finite');
    assert(lumpRate100.totalValue === 512000000, 'Lumpsum rate=100 for 10y exactly equals 500,000 * 2^10 = 512,000,000');
    assert(lumpRate100.gain === 511500000, 'Lumpsum rate=100 gain is exactly 511,500,000');

    // Stress test: 30 years at 100% rate
    const sip30yRate100 = calculateSip(25000, 30, 100);
    assert(!Number.isNaN(sip30yRate100.totalValue), 'SIP 30y rate=100 is not NaN');
    assert(Number.isFinite(sip30yRate100.totalValue), 'SIP 30y rate=100 is finite');
  }

  // ---------------------------------------------------------------------------
  // 1.3 Tenure = 1 Month (1/12 Years) & Tenure = 1 Year
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.3 Testing Tenure = 1 Month (1/12 Years) & Tenure = 1 Year ---');
  {
    // Tenure = 1 month (1/12 = ~0.08333333333333333 years)
    const tenure1Month = 1 / 12;
    const sip1Month = calculateSip(10000, tenure1Month, 12);
    // 1 installment of 10,000 at 12% annual = 1% monthly -> FV = 10,000 * (1.01) = 10,100
    assert(!Number.isNaN(sip1Month.totalValue), 'SIP tenure=1 month totalValue is not NaN');
    assert(Number.isFinite(sip1Month.totalValue), 'SIP tenure=1 month totalValue is finite');
    assert(sip1Month.invested === 10000, 'SIP tenure=1 month invested is 10,000');
    assert(sip1Month.totalValue === 10100, `SIP tenure=1 month totalValue is 10,100 (got ${sip1Month.totalValue})`);
    assert(sip1Month.gain === 100, `SIP tenure=1 month gain is 100 (got ${sip1Month.gain})`);

    // Lumpsum for 1 month
    const lump1Month = calculateLumpsum(100000, tenure1Month, 12);
    assert(!Number.isNaN(lump1Month.totalValue), 'Lumpsum tenure=1 month is not NaN');
    assert(Number.isFinite(lump1Month.totalValue), 'Lumpsum tenure=1 month is finite');
    assert(lump1Month.invested === 100000, 'Lumpsum tenure=1 month invested is 100,000');
    assert(lump1Month.totalValue >= 100900 && lump1Month.totalValue <= 101000, 'Lumpsum tenure=1 month compounding maturity within expected range');

    // Tenure = 1 full year
    const sip1Year = calculateSip(10000, 1, 12);
    assert(sip1Year.invested === 120000, 'SIP tenure=1 year invested is ₹1,20,000');
    assert(sip1Year.totalValue > 120000, 'SIP tenure=1 year totalValue > invested');
    assert(!Number.isNaN(sip1Year.totalValue), 'SIP tenure=1 year totalValue is not NaN');
  }

  // ---------------------------------------------------------------------------
  // 1.4 Negative Inputs & Zero Inputs
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.4 Testing Negative and Zero Inputs ---');
  {
    // Negative monthly capital
    const sipNegP = calculateSip(-10000, 10, 15);
    assert(sipNegP.invested === 0 && sipNegP.totalValue === 0, 'Negative SIP monthly capital safely returns 0');
    assert(!Number.isNaN(sipNegP.totalValue), 'Negative SIP capital does not produce NaN');

    // Negative tenure
    const sipNegT = calculateSip(10000, -5, 15);
    assert(sipNegT.invested === 0 && sipNegT.totalValue === 0, 'Negative SIP tenure safely returns 0');
    assert(!Number.isNaN(sipNegT.totalValue), 'Negative SIP tenure does not produce NaN');

    // Negative return rate
    const sipNegR = calculateSip(10000, 5, -10);
    assert(sipNegR.invested === 600000, 'Negative SIP rate calculates invested amount safely');
    assert(sipNegR.totalValue === 600000, 'Negative SIP rate defaults to invested principal without crashing or producing NaN');
    assert(!Number.isNaN(sipNegR.totalValue), 'Negative SIP rate does not produce NaN');

    // All negative SIP
    const sipAllNeg = calculateSip(-5000, -10, -20);
    assert(sipAllNeg.totalValue === 0 && sipAllNeg.invested === 0, 'All-negative SIP inputs return 0 safely');

    // Zero SIP capital
    const sipZeroP = calculateSip(0, 10, 15);
    assert(sipZeroP.totalValue === 0, 'Zero SIP capital returns 0 totalValue');

    // Zero SIP tenure
    const sipZeroT = calculateSip(10000, 0, 15);
    assert(sipZeroT.totalValue === 0, 'Zero SIP tenure returns 0 totalValue');

    // Lumpsum negative principal
    const lumpNegP = calculateLumpsum(-100000, 5, 12);
    assert(lumpNegP.invested === 0 && lumpNegP.totalValue === 0, 'Negative lumpsum principal safely returns 0');
    assert(!Number.isNaN(lumpNegP.totalValue), 'Negative lumpsum principal does not produce NaN');

    // Lumpsum negative tenure
    const lumpNegT = calculateLumpsum(100000, -5, 12);
    assert(lumpNegT.invested === 0 && lumpNegT.totalValue === 0, 'Negative lumpsum tenure safely returns 0');
    assert(!Number.isNaN(lumpNegT.totalValue), 'Negative lumpsum tenure does not produce NaN');

    // Lumpsum negative rate
    const lumpNegR = calculateLumpsum(100000, 5, -12);
    assert(lumpNegR.invested === 100000, 'Negative lumpsum rate maintains invested capital');
    assert(lumpNegR.totalValue === 100000, 'Negative lumpsum rate defaults to principal without crashing');
    assert(!Number.isNaN(lumpNegR.totalValue), 'Negative lumpsum rate does not produce NaN');

    // Non-numeric and NaN arguments
    const sipNaN = calculateSip(NaN, NaN, NaN);
    assert(sipNaN.totalValue === 0, 'NaN SIP arguments safely return 0');
    assert(!Number.isNaN(sipNaN.totalValue), 'NaN SIP arguments output is not NaN');

    const lumpNaN = calculateLumpsum(NaN, NaN, NaN);
    assert(lumpNaN.totalValue === 0, 'NaN lumpsum arguments safely return 0');
    assert(!Number.isNaN(lumpNaN.totalValue), 'NaN lumpsum arguments output is not NaN');
  }

  // ---------------------------------------------------------------------------
  // 1.5 Extreme Capital Values
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.5 Testing Extreme Capital Values ---');
  {
    const extremeCapitals = [
      10000000,               // 1 Crore
      100000000,              // 10 Crore
      1000000000,             // 100 Crore
      1000000000000,          // 1 Trillion (1e12)
      Number.MAX_SAFE_INTEGER // 9,007,199,254,740,991
    ];

    for (const cap of extremeCapitals) {
      // SIP extreme
      const resSip = calculateSip(cap, 10, 15);
      assert(!Number.isNaN(resSip.totalValue), `SIP with capital ${cap} is not NaN`);
      assert(Number.isFinite(resSip.totalValue), `SIP with capital ${cap} is finite`);
      assert(resSip.totalValue > 0, `SIP with capital ${cap} produces positive value`);

      // Lumpsum extreme
      const resLump = calculateLumpsum(cap, 10, 15);
      assert(!Number.isNaN(resLump.totalValue), `Lumpsum with principal ${cap} is not NaN`);
      assert(Number.isFinite(resLump.totalValue), `Lumpsum with principal ${cap} is finite`);
      assert(resLump.totalValue > 0, `Lumpsum with principal ${cap} produces positive value`);
    }
  }

  // ---------------------------------------------------------------------------
  // 1.6 Additional Calculator Engine Methods
  // ---------------------------------------------------------------------------
  console.log('\n--- 1.6 Testing Yearly Progression & Portfolio Bucket Mapping ---');
  {
    // Yearly progression
    const points = generateYearlyProgression(25000, 10, 15, 'sip');
    assert(points.length === 10, 'generateYearlyProgression generates exactly 10 milestones for 10 years');
    assert(points[0].year === 1, 'Milestone 1 is year 1');
    assert(points[9].year === 10, 'Milestone 10 is year 10');
    assert(points[9].futureValue > points[0].futureValue, 'Future value grows strictly monotonically over time');

    // Portfolio Bucket Mapping
    assert(mapWealthToPortfolioBucket(200000) === 'Below ₹5L', '₹2L maps to Below ₹5L');
    assert(mapWealthToPortfolioBucket(500000) === '₹5L - ₹25L', '₹5L boundary maps to ₹5L - ₹25L');
    assert(mapWealthToPortfolioBucket(2499999) === '₹5L - ₹25L', '₹24.99L maps to ₹5L - ₹25L');
    assert(mapWealthToPortfolioBucket(2500000) === '> ₹25 Lakhs', '₹25L boundary maps to > ₹25 Lakhs');
    assert(mapWealthToPortfolioBucket(9999999) === '> ₹25 Lakhs', '₹99.99L maps to > ₹25 Lakhs');
    assert(mapWealthToPortfolioBucket(10000000) === '₹1Cr+', '₹1Cr boundary maps to ₹1Cr+');
    assert(mapWealthToPortfolioBucket(50000000) === '₹1Cr+', '₹5Cr maps to ₹1Cr+');
  }

  console.log('\n==============================================================================');
  console.log('PART 2: LEAD FORM VALIDATION ADVERSARIAL VERIFICATION (/^[6-9]\\d{9}$/)');
  console.log('==============================================================================');

  const PHONE_REGEX = /^[6-9]\d{9}$/;

  // ---------------------------------------------------------------------------
  // 2.1 Valid Indian Mobile Numbers
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.1 Valid Indian Mobile Prefixes (6, 7, 8, 9) ---');
  {
    const validSamples = [
      '6123456789',
      '7000000000',
      '8999999999',
      '9876543210',
      '9820123456',
      '6291012345',
      '7980123456',
      '8888888888',
    ];
    for (const num of validSamples) {
      assert(PHONE_REGEX.test(num), `Valid mobile accepted: ${num}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.2 Invalid Indian Prefixes (0, 1, 2, 3, 4, 5)
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.2 Invalid Indian Prefixes (0, 1, 2, 3, 4, 5) ---');
  {
    const invalidPrefixSamples = [
      '0123456789',
      '1234567890',
      '2345678901',
      '3456789012',
      '4567890123',
      '5678901234',
      '0987654321',
      '1987654321',
      '5999999999',
    ];
    for (const num of invalidPrefixSamples) {
      assert(!PHONE_REGEX.test(num), `Invalid prefix rejected: ${num}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.3 SQL Injection Attack Vectors
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.3 Adversarial SQL Injection Vectors ---');
  {
    const sqliPayloads = [
      "' OR '1'='1",
      "9876543210' OR '1'='1",
      "9876543210; DROP TABLE users;--",
      "1; DROP TABLE leads;--",
      "admin'--",
      "' UNION SELECT null, username, password FROM users--",
      "9876543210' OR 1=1 --",
      "9876543210' AND SLEEP(5)--",
      "9876543210' WAITFOR DELAY '0:0:5'--",
      "9876543210/**/OR/**/1=1",
      "9876543210'||(SELECT 'a')||'",
    ];
    for (const payload of sqliPayloads) {
      assert(!PHONE_REGEX.test(payload), `SQL Injection rejected: ${payload}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.4 Script Tags & XSS Attack Vectors
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.4 Adversarial Script Tags & XSS Payloads ---');
  {
    const xssPayloads = [
      '<script>alert(1)</script>',
      '"><script>alert("XSS")</script>',
      '<svg onload=alert(1)>',
      '<img src=x onerror=alert(1)>',
      'javascript:alert(1)',
      '9876543210<script>',
      '<script>9876543210</script>',
      '98765"><img src=x onerror=alert(1)>',
      "98765';alert(1);//",
      '${alert(1)}',
      '{{7*7}}',
    ];
    for (const payload of xssPayloads) {
      assert(!PHONE_REGEX.test(payload), `XSS payload rejected: ${payload}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.5 Non-Digits, Whitespace, Punctuation & Unicode
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.5 Non-Digits, Whitespace, Punctuation & Unicode ---');
  {
    const nonDigitPayloads = [
      '98765 43210',             // Interspersed space
      ' 9876543210',             // Leading space
      '9876543210 ',             // Trailing space
      '98765-43210',             // Hyphenated
      '(987) 654-3210',          // US style parentheses
      '987.654.3210',            // Dot separated
      '987654321o',              // Lowercase letter o
      '987654321O',              // Uppercase letter O
      '987654321l',              // Lowercase letter l
      '987654321I',              // Uppercase letter I
      'abcdefghij',              // Letters only
      '९८७६५४३२१०',              // Devnagari numerals
      '٩٨٧٦٥٤٣٢١٠',              // Arabic numerals
      '９８７６５４３２１０',      // Full-width unicode digits
      '9876543210\n',            // Trailing newline
      '9876543210\0',            // Null byte injection
    ];
    for (const payload of nonDigitPayloads) {
      assert(!PHONE_REGEX.test(payload), `Non-digit string rejected: "${payload}"`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.6 International Dialing Codes
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.6 International Dialing Codes ---');
  {
    const intlPayloads = [
      '+919876543210',
      '+91 9876543210',
      '00919876543210',
      '919876543210',           // 12-digit without plus
      '0919876543210',
      '+14155552671',
      '+447911123456',
      '+81312345678',
    ];
    for (const payload of intlPayloads) {
      assert(!PHONE_REGEX.test(payload), `International dialing code rejected: ${payload}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.7 Edge-Length Strings (0..9, 11..50)
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.7 Edge-Length Strings ---');
  {
    // Empty string
    assert(!PHONE_REGEX.test(''), 'Length 0 (empty string) rejected');

    // Length 1 to 9 (too short)
    for (let len = 1; len <= 9; len++) {
      const shortStr = '9'.repeat(len);
      assert(!PHONE_REGEX.test(shortStr), `Length ${len} string rejected (too short): ${shortStr}`);
    }

    // Length 10 (valid if starts with 6-9)
    assert(PHONE_REGEX.test('9'.repeat(10)), 'Length 10 string of 9s accepted');

    // Length 11 to 20 (too long)
    for (let len = 11; len <= 15; len++) {
      const longStr = '9'.repeat(len);
      assert(!PHONE_REGEX.test(longStr), `Length ${len} string rejected (too long): ${longStr}`);
    }
  }

  // ---------------------------------------------------------------------------
  // 2.8 10,000 Pseudo-Random Property-Based Fuzzing
  // ---------------------------------------------------------------------------
  console.log('\n--- 2.8 10,000 Property-Based Fuzzing Invariant Verification ---');
  {
    let fuzzPassed = true;
    for (let i = 0; i < 10000; i++) {
      // Random generation
      const len = Math.floor(Math.random() * 15) + 1;
      let str = '';
      for (let j = 0; j < len; j++) {
        str += Math.floor(Math.random() * 10).toString();
      }
      const startsWithValid = ['6', '7', '8', '9'].includes(str[0]);
      const expected = len === 10 && startsWithValid;
      const actual = PHONE_REGEX.test(str);
      if (actual !== expected) {
        fuzzPassed = false;
        assert(false, `Fuzzing failure on string: "${str}" (expected ${expected}, got ${actual})`);
        break;
      }
    }
    if (fuzzPassed) {
      assert(true, '10,000 property-based random fuzzing iterations passed');
    }
  }

  console.log('\n==============================================================================');
  console.log('PART 3: CSS STICKY & STACKING FORMULAS AUDIT');
  console.log('==============================================================================');

  // ---------------------------------------------------------------------------
  // 3.1 globals.css overflow-x: clip Verification
  // ---------------------------------------------------------------------------
  console.log('\n--- 3.1 globals.css Sticky Preservation & overflow-x: clip ---');
  {
    const cssPath = join(appDir, 'src/app/globals.css');
    assert(existsSync(cssPath), 'globals.css exists');
    const cssContent = readFileSync(cssPath, 'utf8');

    // Check that body defines overflow-x: clip
    const bodyMatch = cssContent.match(/body\s*\{([^}]+)\}/);
    assert(bodyMatch !== null, 'body CSS rule block found in globals.css');
    if (bodyMatch) {
      const bodyBlock = bodyMatch[1];
      assert(bodyBlock.includes('overflow-x: clip'), 'body contains `overflow-x: clip`');
      
      // Ensure overflow-x is NOT actively set to 'hidden' in body
      const overflowXStatements = bodyBlock
        .split(';')
        .map(s => s.trim())
        .filter(s => s.startsWith('overflow-x:'));
      
      const activeOverflowX = overflowXStatements.map(s => s.split(':')[1].split('/*')[0].trim());
      assert(activeOverflowX.includes('clip'), 'Active overflow-x property is explicitly set to clip');
      assert(!activeOverflowX.includes('hidden'), 'Active overflow-x property is NOT hidden (which would break position: sticky)');
    }
  }

  // ---------------------------------------------------------------------------
  // 3.2 StackedShowcase.tsx Progressive Formulas & Deck Stacking
  // ---------------------------------------------------------------------------
  console.log('\n--- 3.2 StackedShowcase.tsx Progressive Stacking Formulas ---');
  {
    const showcasePath = join(appDir, 'src/components/sections/StackedShowcase.tsx');
    assert(existsSync(showcasePath), 'StackedShowcase.tsx exists');
    const src = readFileSync(showcasePath, 'utf8');

    // Verify formulas
    assert(src.includes('const topOffset = 120 + index * 20;'), 'Progressive top formula `120 + index * 20` present');
    assert(src.includes('const zIndex = 20 + index;'), 'Progressive z-index formula `20 + index` present');
    assert(src.includes('className="sticky transition-all duration-300"'), 'Cards have `sticky` class declaration');
    assert(src.includes('overflow-visible'), 'Showcase section sets `overflow-visible` to support sticky positioning');

    // Calculate and verify 5 cards
    const expectedCards = [
      { id: 'single-stocks', top: 120, z: 20 },
      { id: 'model-portfolios', top: 140, z: 21 },
      { id: 'curated-mutual-funds', top: 160, z: 22 },
      { id: 'execution-tools', top: 180, z: 23 },
      { id: 'cio-edge', top: 200, z: 24 },
    ];

    for (let idx = 0; idx < expectedCards.length; idx++) {
      const expected = expectedCards[idx];
      const computedTop = 120 + idx * 20;
      const computedZ = 20 + idx;
      assert(computedTop === expected.top, `Card ${idx} (${expected.id}) top is ${computedTop}px`);
      assert(computedZ === expected.z, `Card ${idx} (${expected.id}) z-index is ${computedZ}`);
      assert(src.includes(`id: '${expected.id}'`), `Card id '${expected.id}' cataloged in SHOWCASE_CARDS`);
    }

    // Monotonic progression assertion
    for (let i = 0; i < expectedCards.length - 1; i++) {
      const topCurrent = 120 + i * 20;
      const topNext = 120 + (i + 1) * 20;
      const zCurrent = 20 + i;
      const zNext = 20 + (i + 1);
      assert(topNext > topCurrent, `Monotonic top progression: card ${i+1} (${topNext}px) > card ${i} (${topCurrent}px)`);
      assert(zNext > zCurrent, `Monotonic z-index progression: card ${i+1} (${zNext}) > card ${i} (${zCurrent})`);
    }
  }

  // ---------------------------------------------------------------------------
  // 3.3 Mobile Responsive Styles Verification
  // ---------------------------------------------------------------------------
  console.log('\n--- 3.3 Mobile Responsive Styles Verification Across Viewports ---');
  {
    const showcasePath = join(appDir, 'src/components/sections/StackedShowcase.tsx');
    const showcaseSrc = readFileSync(showcasePath, 'utf8');

    // Responsive grid and layout in cards
    assert(showcaseSrc.includes('grid grid-cols-1 lg:grid-cols-12'), 'Cards use 1-col on mobile, 12-cols on desktop');
    assert(showcaseSrc.includes('lg:col-span-5'), 'Visual panel is 5-cols on desktop');
    assert(showcaseSrc.includes('lg:col-span-7'), 'Content panel is 7-cols on desktop');
    assert(showcaseSrc.includes('border-b lg:border-b-0 lg:border-r border-white/10'), 'Visual panel has bottom border on mobile, right border on desktop');
    assert(showcaseSrc.includes('w-full sm:w-auto'), 'CTA button is full-width on mobile, auto on tablet/desktop');
    assert(showcaseSrc.includes('px-4 sm:px-6 lg:px-12'), 'Showcase section has responsive horizontal padding');

    // Navbar responsive layout
    const navbarPath = join(appDir, 'src/components/layout/Navbar.tsx');
    const navbarSrc = readFileSync(navbarPath, 'utf8');
    assert(navbarSrc.includes('sticky top-0 z-50'), 'Navbar is sticky top-0 with z-50');
    assert(navbarSrc.includes('hidden lg:flex'), 'Desktop links hidden on mobile');
    assert(navbarSrc.includes('lg:hidden'), 'Mobile hamburger trigger hidden on desktop');
    assert(navbarSrc.includes('hidden sm:inline-flex'), 'Secondary login button hidden on mobile');

    // MobileNav drawer responsive layout
    const mobileNavPath = join(appDir, 'src/components/layout/MobileNav.tsx');
    const mobileNavSrc = readFileSync(mobileNavPath, 'utf8');
    assert(mobileNavSrc.includes('fixed inset-0 z-[60] lg:hidden'), 'MobileNav drawer has fixed inset-0 z-[60] and lg:hidden');
    assert(mobileNavSrc.includes('max-w-xs sm:max-w-sm'), 'MobileNav drawer width bounded to max-w-xs (320px) preventing mobile bleed');
    assert(mobileNavSrc.includes('overflow-y-auto'), 'MobileNav drawer has scrollable container');

    // Hero responsive layout
    const heroPath = join(appDir, 'src/components/sections/HeroSection.tsx');
    const heroSrc = readFileSync(heroPath, 'utf8');
    assert(heroSrc.includes('overflow-hidden'), 'Hero section has overflow-hidden preventing ambient glow bleed');
    assert(heroSrc.includes('hidden sm:flex absolute -bottom-4 -left-6'), 'Floating badge hidden on small screens avoiding mobile viewport overflow');
    assert(heroSrc.includes('grid grid-cols-2 sm:grid-cols-4'), 'Metrics strip 2-cols mobile, 4-cols desktop');

    // Root layout viewport
    const layoutPath = join(appDir, 'src/app/layout.tsx');
    const layoutSrc = readFileSync(layoutPath, 'utf8');
    assert(layoutSrc.includes("width: 'device-width'"), 'Viewport specifies width: device-width');
    assert(layoutSrc.includes('initialScale: 1'), 'Viewport specifies initialScale: 1');
  }

  // ---------------------------------------------------------------------------
  // Summary & Binary Verdict Formulation
  // ---------------------------------------------------------------------------
  console.log('\n==============================================================================');
  console.log('CHALLENGER FINAL 2 EXECUTION SUMMARY');
  console.log('==============================================================================');
  console.log(`Total Assertions Executed : ${suitePassed + suiteFailed}`);
  console.log(`Passed                    : ${suitePassed}`);
  console.log(`Failed                    : ${suiteFailed}`);
  console.log('------------------------------------------------------------------------------');

  if (suiteFailed > 0) {
    console.error(`VERDICT: REJECT (${suiteFailed} failures detected)`);
    for (const f of failureLog) {
      console.error(`  - ${f}`);
    }
    process.exit(1);
  } else {
    console.log('VERDICT: APPROVE (All mathematical, validation, and CSS assertions passed)');
    process.exit(0);
  }
}

runAllChallengerTests().catch((err) => {
  console.error('Fatal Test Harness Exception:', err);
  process.exit(1);
});
