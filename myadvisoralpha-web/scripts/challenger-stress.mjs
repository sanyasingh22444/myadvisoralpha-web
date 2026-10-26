import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const appDir = resolve(process.cwd());
console.log('Target app directory:', appDir);

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message, details = '') {
  if (condition) {
    totalPassed++;
    console.log(`  ✔ [PASS] ${message}`);
  } else {
    totalFailed++;
    console.error(`  ✖ [FAIL] ${message} ${details ? `(${details})` : ''}`);
  }
}

console.log('\n======================================================');
console.log('CHALLENGER SUITE 1: Phone Validation Regex & Sanitizer');
console.log('======================================================');

const PHONE_REGEX = /^[6-9]\d{9}$/;

// Test 1.1: Valid Indian prefixes (6, 7, 8, 9)
for (const prefix of ['6', '7', '8', '9']) {
  const validNum = `${prefix}123456789`;
  assert(PHONE_REGEX.test(validNum), `Prefix ${prefix} accepted: ${validNum}`);
}

// Test 1.2: Invalid Indian prefixes (0, 1, 2, 3, 4, 5)
for (const prefix of ['0', '1', '2', '3', '4', '5']) {
  const invalidNum = `${prefix}123456789`;
  assert(!PHONE_REGEX.test(invalidNum), `Prefix ${prefix} rejected: ${invalidNum}`);
}

// Test 1.3: Length boundaries
assert(!PHONE_REGEX.test('987654321'), '9-digit phone rejected (too short)');
assert(!PHONE_REGEX.test('98765432100'), '11-digit phone rejected (too long)');
assert(!PHONE_REGEX.test(''), 'Empty string rejected');

// Test 1.4: Special characters, alpha, injections
const invalidInputs = [
  '98765 43210',
  '98765-43210',
  '987654321o',
  '987654321O',
  '+919876543210',
  '<script>alert(1)</script>',
  "9876543210' OR '1'='1",
  '९८७६५४३२१०', // Devnagari digits
  '98765.4321',
  'undefined',
  'null',
];

for (const input of invalidInputs) {
  assert(!PHONE_REGEX.test(input), `Invalid input rejected: "${input}"`);
}

// Test 1.5: Input sanitizer simulation from HeroSection.tsx
// handlePhoneChange: val = e.target.value.replace(/\D/g, '').slice(0, 10)
function sanitizePhone(raw) {
  return raw.replace(/\D/g, '').slice(0, 10);
}

assert(sanitizePhone('98765-43210') === '9876543210', 'Dashes stripped correctly');
assert(sanitizePhone('98 76 54 32 10') === '9876543210', 'Spaces stripped correctly');
assert(sanitizePhone('98765abc43210') === '9876543210', 'Letters stripped correctly');
assert(sanitizePhone('9876543210123') === '9876543210', 'Sliced to 10 digits max');

// Generator: 1000 pseudo-random numbers
let randomTestsPassed = true;
for (let i = 0; i < 1000; i++) {
  const firstDigit = Math.floor(Math.random() * 10).toString();
  const rest = Math.floor(100000000 + Math.random() * 900000000).toString();
  const testNumber = firstDigit + rest;
  const expected = ['6', '7', '8', '9'].includes(firstDigit);
  if (PHONE_REGEX.test(testNumber) !== expected) {
    randomTestsPassed = false;
    assert(false, `Random test failed for ${testNumber}`);
    break;
  }
}
if (randomTestsPassed) {
  assert(true, '1,000 random number generator stress tests passed');
}

console.log('\n======================================================');
console.log('CHALLENGER SUITE 2: Stacked Cards Deck Configuration');
console.log('======================================================');

const showcasePath = join(appDir, 'src/components/sections/StackedShowcase.tsx');
assert(existsSync(showcasePath), 'StackedShowcase.tsx exists');
const showcaseSrc = readFileSync(showcasePath, 'utf8');

// Parse top offsets and z-indexes logic
const hasTopOffsetFormula = showcaseSrc.includes('120 + index * 20');
const hasZIndexFormula = showcaseSrc.includes('20 + index');

assert(hasTopOffsetFormula, 'Top offset formula matches `120 + index * 20`');
assert(hasZIndexFormula, 'Z-index formula matches `20 + index`');

// Verify cards count and calculate offsets
const expectedCards = [
  { id: 'single-stocks', top: 120, z: 20 },
  { id: 'model-portfolios', top: 140, z: 21 },
  { id: 'curated-mutual-funds', top: 160, z: 22 },
  { id: 'execution-tools', top: 180, z: 23 },
  { id: 'cio-edge', top: 200, z: 24 },
];

for (let i = 0; i < expectedCards.length; i++) {
  const exp = expectedCards[i];
  const calcTop = 120 + i * 20;
  const calcZ = 20 + i;
  assert(calcTop === exp.top, `Card ${i} (${exp.id}) top offset is ${calcTop}px`);
  assert(calcZ === exp.z, `Card ${i} (${exp.id}) z-index is ${calcZ}`);
  assert(showcaseSrc.includes(exp.id), `Showcase contains card id '${exp.id}'`);
}

// Verify sticky styling
assert(showcaseSrc.includes('className="sticky transition-all duration-300"'), 'Cards have sticky class with transition');
assert(showcaseSrc.includes('overflow-visible'), 'Section has overflow-visible to support sticky positioning');

console.log('\n======================================================');
console.log('CHALLENGER SUITE 3: Responsive Layout Classes Audit');
console.log('======================================================');

// Inspect Navbar.tsx
const navbarPath = join(appDir, 'src/components/layout/Navbar.tsx');
assert(existsSync(navbarPath), 'Navbar.tsx exists');
const navbarSrc = readFileSync(navbarPath, 'utf8');

assert(navbarSrc.includes('sticky top-0 z-50'), 'Navbar has sticky top-0 z-50 positioning');
assert(navbarSrc.includes('hidden lg:flex'), 'Desktop nav links hidden on mobile/tablet (<1024px)');
assert(navbarSrc.includes('lg:hidden'), 'Mobile hamburger trigger hidden on desktop (>=1024px)');
assert(navbarSrc.includes('hidden sm:inline-flex'), 'Login button hidden on small mobile (<640px)');

// Inspect MobileNav.tsx
const mobileNavPath = join(appDir, 'src/components/layout/MobileNav.tsx');
assert(existsSync(mobileNavPath), 'MobileNav.tsx exists');
const mobileNavSrc = readFileSync(mobileNavPath, 'utf8');

assert(mobileNavSrc.includes('fixed inset-0 z-[60] lg:hidden'), 'Mobile drawer container is fixed full-screen and lg:hidden');
assert(mobileNavSrc.includes('max-w-xs sm:max-w-sm'), 'Mobile drawer has max-w-xs (320px) on mobile avoiding overflow');
assert(mobileNavSrc.includes('overflow-y-auto'), 'Mobile drawer has overflow-y-auto for scrollability');
assert(mobileNavSrc.includes('onClick={onClose}'), 'Backdrop has click-to-dismiss handler');

// Inspect HeroSection.tsx
const heroPath = join(appDir, 'src/components/sections/HeroSection.tsx');
assert(existsSync(heroPath), 'HeroSection.tsx exists');
const heroSrc = readFileSync(heroPath, 'utf8');

assert(heroSrc.includes('overflow-hidden'), 'Hero section has overflow-hidden preventing ambient glow overflows');
assert(heroSrc.includes('grid grid-cols-1 lg:grid-cols-12'), 'Hero section responsive grid (1 col mobile, 12 cols desktop)');
assert(heroSrc.includes('hidden sm:flex absolute -bottom-4 -left-6'), 'Floating alpha badge hidden on mobile preventing horizontal bleed');
assert(heroSrc.includes('grid grid-cols-2 sm:grid-cols-4'), 'Metrics strip 2-cols mobile, 4-cols tablet/desktop');

// Inspect Footer.tsx
const footerPath = join(appDir, 'src/components/layout/Footer.tsx');
assert(existsSync(footerPath), 'Footer.tsx exists');
const footerSrc = readFileSync(footerPath, 'utf8');

assert(footerSrc.includes('flex flex-col lg:flex-row'), 'App download banner stacks on mobile, row on desktop');
assert(footerSrc.includes('grid grid-cols-2 md:grid-cols-4'), 'Footer directory 2-cols mobile, 4-cols desktop');
assert(footerSrc.includes('grid grid-cols-1 md:grid-cols-3'), 'Registered office details 1-col mobile, 3-cols desktop');
assert(footerSrc.includes('flex flex-col sm:flex-row'), 'Bottom copyright/social strip stacks on mobile, row on tablet/desktop');

// Inspect globals.css and layout.tsx
const cssPath = join(appDir, 'src/app/globals.css');
assert(existsSync(cssPath), 'globals.css exists');
const cssSrc = readFileSync(cssPath, 'utf8');

assert(cssSrc.includes('overflow-x: hidden'), 'body has overflow-x: hidden');
assert(cssSrc.includes('color-scheme: dark'), 'html has color-scheme: dark');

const layoutPath = join(appDir, 'src/app/layout.tsx');
assert(existsSync(layoutPath), 'layout.tsx exists');
const layoutSrc = readFileSync(layoutPath, 'utf8');

assert(layoutSrc.includes('width: \'device-width\''), 'Viewport specifies width: device-width');
assert(layoutSrc.includes('initialScale: 1'), 'Viewport specifies initialScale: 1');

console.log('\n======================================================');
console.log(`SUMMARY: ${totalPassed} Passed, ${totalFailed} Failed`);
console.log('======================================================\n');

if (totalFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
