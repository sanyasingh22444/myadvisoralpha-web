import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateCheckoutUrl(urlStr, source) {
  try {
    const parsed = new URL(urlStr);
    const planId = parsed.searchParams.get('plan_id');
    const planType = parsed.searchParams.get('plan_type');
    const action = parsed.searchParams.get('action');
    const page = parsed.searchParams.get('page');

    console.log(`[CHECKOUT LINK VALIDATION] Source: ${source}`);
    console.log(`  URL: ${urlStr}`);
    console.log(`  Page: ${page}`);
    console.log(`  Plan ID: ${planId} (Valid UUID: ${UUID_REGEX.test(planId)})`);
    console.log(`  Plan Type: ${planType}`);
    console.log(`  Action: ${action}`);

    if (page !== 'payment') throw new Error(`Expected page=payment, got ${page}`);
    if (!planId || !UUID_REGEX.test(planId)) throw new Error(`Invalid plan_id UUID: ${planId}`);
    if (!['stocks', 'portfolio'].includes(planType)) throw new Error(`Invalid plan_type: ${planType}`);
    if (action !== 'subscribe') throw new Error(`Expected action=subscribe, got ${action}`);

    console.log('  STATUS: PASS\n');
    return true;
  } catch (err) {
    console.error(`  STATUS: FAIL - ${err.message}\n`);
    return false;
  }
}

function validateWebLoginUrl(urlStr, source) {
  try {
    const parsed = new URL(urlStr);
    console.log(`[WEB LOGIN VALIDATION] Source: ${source}`);
    console.log(`  URL: ${urlStr}`);
    console.log(`  Host: ${parsed.host}`);
    console.log(`  Hash: ${parsed.hash}`);

    if (parsed.host !== 'web.advisoralpha.in') throw new Error(`Expected host web.advisoralpha.in, got ${parsed.host}`);
    if (parsed.hash !== '#/login') throw new Error(`Expected hash #/login, got ${parsed.hash}`);

    console.log('  STATUS: PASS\n');
    return true;
  } catch (err) {
    console.error(`  STATUS: FAIL - ${err.message}\n`);
    return false;
  }
}

let allPass = true;

// 1. Check src/data/offerings.ts
const offerings = readFileSync(resolve('src/data/offerings.ts'), 'utf8');
const checkoutRegex = /https:\/\/link\.advisoralpha\.in\/nav\?page=payment[^\s'"`]+/g;
const offeringsCheckoutLinks = offerings.match(checkoutRegex) || [];
for (const link of offeringsCheckoutLinks) {
  if (!validateCheckoutUrl(link, 'src/data/offerings.ts')) allPass = false;
}

// 2. Check src/components/sections/StackedShowcase.tsx
const showcase = readFileSync(resolve('src/components/sections/StackedShowcase.tsx'), 'utf8');
const showcaseCheckoutLinks = showcase.match(checkoutRegex) || [];
for (const link of showcaseCheckoutLinks) {
  if (!validateCheckoutUrl(link, 'src/components/sections/StackedShowcase.tsx')) allPass = false;
}

// 3. Check web login URLs
const filesToCheck = [
  'src/data/brand.ts',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/MobileNav.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/StackedShowcase.tsx',
];

const loginRegex = /https:\/\/web\.advisoralpha\.in[^\s'"`]*/g;
for (const file of filesToCheck) {
  const content = readFileSync(resolve(file), 'utf8');
  const loginLinks = content.match(loginRegex) || [];
  for (const link of loginLinks) {
    if (!validateWebLoginUrl(link, file)) allPass = false;
  }
}

console.log(`Overall Deep Links Validation: ${allPass ? 'ALL PASSED' : 'FAILURES DETECTED'}`);
process.exit(allPass ? 0 : 1);
