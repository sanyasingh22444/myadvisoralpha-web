// ADVERSARIAL MILESTONE 1 VERIFICATION & STRESS SCANNER
// Checks Univest brand scan, legacy colors, badges, and emojis.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';

const appDir = resolve(process.cwd());
console.log('Adversarial Scanner Target Directory:', appDir);

let passCount = 0;
let failCount = 0;
const failureLog = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passCount++;
    console.log(`  ✔ [PASS] ${testName}`);
  } else {
    failCount++;
    const errMsg = `✖ [FAIL] ${testName} ${details ? `(${details})` : ''}`;
    failureLog.push(errMsg);
    console.error(`  ${errMsg}`);
  }
}

function walkDir(dir, filterFn) {
  let results = [];
  if (!existsSync(dir)) return results;
  const list = readdirSync(dir);
  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(walkDir(fullPath, filterFn));
      }
    } else if (filterFn(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

// -----------------------------------------------------------------------------
// 1. BRAND ISOLATION & UNIVEST LEAKAGE AUDIT
// -----------------------------------------------------------------------------
console.log('\n==============================================================================');
console.log('PART 1: UNIVEST BRAND ERADICATION & CASE-INSENSITIVE SCAN');
console.log('==============================================================================');

const sourceFiles = walkDir(join(appDir, 'src'), f => /\.(tsx|ts|css|html|json)$/.test(f));
const publicFiles = walkDir(join(appDir, 'public'), f => /\.(json|svg|html|txt|xml|js)$/.test(f));
const configFiles = [
  join(appDir, 'tailwind.config.ts'),
  join(appDir, 'package.json'),
  join(appDir, 'README.md'),
  join(appDir, 'next.config.mjs'),
].filter(existsSync);

const auditFiles = [...sourceFiles, ...publicFiles, ...configFiles];

console.log(`Auditing ${auditFiles.length} files across src/, public/, and configuration root...`);

const univestRegexes = [
  { name: 'Direct Case-Insensitive Univest', regex: /univest/i },
  { name: 'Hyphenated/Separated Uni-Vest', regex: /uni[-_.\s]vest/i },
  { name: 'Univest Domain', regex: /univest\.in/i },
  { name: 'Univest Token', regex: /['"`]univest['"`]/i },
];

let totalBrandMatches = 0;
const brandMatchDetails = [];

for (const file of auditFiles) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { name, regex } of univestRegexes) {
      if (regex.test(line)) {
        totalBrandMatches++;
        const detail = `${relative(appDir, file)}:${i + 1} [${name}]: ${line.trim()}`;
        brandMatchDetails.push(detail);
      }
    }
  }
}

assert(totalBrandMatches === 0, 'Zero occurrences of Univest across all source, public, and config files', 
  brandMatchDetails.join('\n'));

// Check specific sensitive files that previously contained Univest
const sensitiveChecks = [
  { file: 'src/data/testimonials.ts', forbidden: /univest/i, desc: 'Testimonials dataset' },
  { file: 'src/components/calculators/AlphaComparisonBanner.tsx', forbidden: /univest/i, desc: 'Alpha Comparison Banner' },
  { file: 'src/app/layout.tsx', forbidden: /univest/i, desc: 'Root layout metadata & comments' },
  { file: 'tailwind.config.ts', forbidden: /univest/i, desc: 'Tailwind config tokens' },
  { file: 'src/app/globals.css', forbidden: /univest/i, desc: 'Global stylesheet shimmer effect' },
  { file: 'src/components/calculators/SipCalculator.tsx', forbidden: /univest/i, desc: 'SIP Calculator' },
  { file: 'src/components/modals/LeadCaptureModal.tsx', forbidden: /univest/i, desc: 'Lead Capture Modal' },
  { file: 'src/app/page.tsx', forbidden: /univest/i, desc: 'Homepage sections' },
  { file: 'src/components/sections/Testimonials.tsx', forbidden: /univest/i, desc: 'Testimonials section' },
  { file: 'src/components/layout/Navbar.tsx', forbidden: /univest/i, desc: 'Navbar component' },
  { file: 'src/components/sections/StackedShowcase.tsx', forbidden: /univest/i, desc: 'Stacked showcase section' },
  { file: 'README.md', forbidden: /univest/i, desc: 'Project README' }
];

for (const item of sensitiveChecks) {
  const filePath = join(appDir, item.file);
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8');
    const matched = item.forbidden.test(content);
    assert(!matched, `No Univest references in ${item.desc} (${item.file})`);
  }
}

// -----------------------------------------------------------------------------
// 2. COMPILED BUILD BUNDLE & SSR DOM LEAKAGE AUDIT
// -----------------------------------------------------------------------------
console.log('\n==============================================================================');
console.log('PART 2: COMPILED PRODUCTION ARTIFACT AUDIT (.next/ BUILD)');
console.log('==============================================================================');

const nextDir = join(appDir, '.next');
if (existsSync(nextDir)) {
  const buildFiles = walkDir(nextDir, f => /\.(html|js|json)$/.test(f));
  let buildLeakages = 0;
  const leakDetails = [];

  for (const file of buildFiles) {
    try {
      if (!existsSync(file)) continue;
      const content = readFileSync(file, 'utf8');
      if (/univest/i.test(content)) {
        buildLeakages++;
        leakDetails.push(`${relative(appDir, file)}: Contains leaked 'univest' token`);
      }
    } catch {
      // Ignore unreadable or transient files
    }
  }

  assert(buildLeakages === 0, 'Zero Univest leakage into compiled production JS chunks or SSR HTML pages',
    leakDetails.slice(0, 5).join('\n'));
} else {
  console.log('  ⚠️ .next directory not found yet. Run after build completes.');
}

// -----------------------------------------------------------------------------
// 3. COLOR PALETTE & DESIGN TOKEN VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n==============================================================================');
console.log('PART 3: THEME COLOR TOKENS & BADGE COMPLIANCE');
console.log('==============================================================================');

const tailwindPath = join(appDir, 'tailwind.config.ts');
assert(existsSync(tailwindPath), 'tailwind.config.ts exists');
const tailwindContent = readFileSync(tailwindPath, 'utf8');

// Royal Blue #0066f5 check
assert(tailwindContent.includes('#0066f5') || tailwindContent.includes('0066f5'), 
  'Royal Blue (#0066f5) declared in Tailwind config');

// Check legacy blue #237FFB has been removed
assert(!tailwindContent.includes('#237FFB') && !tailwindContent.includes('#237ffb'), 
  'Legacy light blue (#237FFB) completely removed from Tailwind config');

// Check globals.css range slider thumb styling
const globalsCssPath = join(appDir, 'src/app/globals.css');
assert(existsSync(globalsCssPath), 'globals.css exists');
const globalsContent = readFileSync(globalsCssPath, 'utf8');

assert(globalsContent.includes('#0066f5') || globalsContent.includes('rgb(0, 102, 245)'),
  'Range slider thumb or accent in globals.css uses Royal Blue (#0066f5)');
assert(!globalsContent.includes('#237FFB') && !globalsContent.includes('#237ffb'),
  'globals.css does not reference legacy color #237FFB');

// Check high-contrast badge tokens
assert(tailwindContent.includes('#dbeafe') && tailwindContent.includes('#1e40af'),
  'Blue high-contrast badge tokens (#dbeafe / #1e40af) present in Tailwind config');
assert(tailwindContent.includes('#dcfce7') && tailwindContent.includes('#166534'),
  'Green high-contrast trust badge tokens (#dcfce7 / #166534) present in Tailwind config');

// -----------------------------------------------------------------------------
// 4. UNICODE EMOJI CODE POINTS ADVERSARIAL SCAN
// -----------------------------------------------------------------------------
console.log('\n==============================================================================');
console.log('PART 4: UNICODE EMOJI CODE POINTS SCAN (src/**/*.{tsx,ts,html})');
console.log('==============================================================================');

const srcCodeFiles = walkDir(join(appDir, 'src'), f => /\.(tsx|ts|html)$/.test(f));
console.log(`Scanning ${srcCodeFiles.length} TypeScript / TSX / HTML files in src/ for emojis...`);

// Emoji regex:
// 1. Extended Pictographic covers all modern emoji symbols (targets 🎯, 🚀, ⚡, 🔒, 🇮🇳, 🚇, ✈️, etc.)
// 2. Regional indicator symbol letters (flags like 🇮🇳: \u{1F1E6}-\u{1F1FF})
// 3. Dingbats & Misc symbols that are used as emojis (U+2600-U+27BF, e.g. ⚡ U+26A1, ✈ U+2708, ★ U+2605)
// 4. Emoticons (U+1F600-U+1F64F)
// 5. Misc Symbols and Pictographs (U+1F300-U+1F5FF, e.g. 🎯 U+1F3AF, 🚀 U+1F680, 🔒 U+1F512)
// 6. Transport & Map symbols (U+1F680-U+1F6FF, e.g. 🚇 U+1F687)
const emojiPattern = /(?:\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]{2}|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u26A0-\u26FF]|[\u2700-\u27BF])/gu;

// Allowed typographical & legal symbols that are standard text / compliance glyphs:
// e.g. ✓ (U+2713), ✔ (U+2714), ✕ (U+2715), ✖ (U+2716), • (bullet), → (arrow), ™ (trademark), © (copyright), ® (registered)
const allowedTypographicalChars = new Set([
  '\u2713', // ✓ Check mark
  '\u2714', // ✔ Heavy check mark
  '\u2715', // ✕ Multiplication X
  '\u2716', // ✖ Heavy multiplication X
  '\u2022', // • Bullet
  '\u2192', // → Arrow right
  '\u2190', // ← Arrow left
  '\u2191', // ↑ Arrow up
  '\u2193', // ↓ Arrow down
  '\u2122', // ™ Trademark sign (SQGARP™)
  '\u00A9', // © Copyright sign
  '\u00AE', // ® Registered sign
]);

let totalEmojiFound = 0;
const emojiDetails = [];

for (const file of srcCodeFiles) {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const matches = line.matchAll(emojiPattern);

    for (const match of matches) {
      const char = match[0];
      // Check if it is an allowed typographical glyph (like compliance checkmark ✓)
      if (allowedTypographicalChars.has(char)) {
        continue;
      }

      totalEmojiFound++;
      const codePoints = Array.from(char).map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
      emojiDetails.push({
        file: relative(appDir, file),
        line: lineIdx + 1,
        char,
        codePoints,
        snippet: line.trim()
      });
    }
  }
}

const detailedLog = emojiDetails.map(d => 
  `  - ${d.file}:${d.line}: "${d.char}" (${d.codePoints}) in \`${d.snippet}\``
).join('\n');

assert(totalEmojiFound === 0, `Zero cheap emojis found across all ${srcCodeFiles.length} source files in src/`, 
  totalEmojiFound > 0 ? `\nFound ${totalEmojiFound} emoji(s):\n${detailedLog}` : '');

// Specific checks on previously contaminated files:
const specificEmojiChecks = [
  { file: 'src/components/sections/HeroSection.tsx', name: 'HeroSection (flags, targets, zaps)' },
  { file: 'src/components/sections/StackedShowcase.tsx', name: 'StackedShowcase (hit targets)' },
  { file: 'src/components/sections/ComparisonGrid.tsx', name: 'ComparisonGrid (rocket)' },
  { file: 'src/components/modals/LeadCaptureModal.tsx', name: 'LeadCaptureModal (flags)' },
  { file: 'src/app/contact/page.tsx', name: 'Contact Page (locks, metros, planes)' },
  { file: 'src/data/testimonials.ts', name: 'Testimonials (star emoji)' }
];

for (const check of specificEmojiChecks) {
  const filePath = join(appDir, check.file);
  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8');
    const hasTargetEmoji = /[\u{1F3AF}\u{1F680}\u{26A1}\u{1F512}\u{1F687}\u{2708}\u{2605}\u{1F1EE}\u{1F1F3}]/u.test(content);
    assert(!hasTargetEmoji, `Target emojis (🎯, 🚀, ⚡, 🔒, 🚇, ✈️, ★, 🇮🇳) completely eliminated from ${check.name}`);
  }
}

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('\n==============================================================================');
console.log('ADVERSARIAL SCANNER SUMMARY');
console.log('==============================================================================');
console.log(`Total Assertions Executed : ${passCount + failCount}`);
console.log(`Passed                    : ${passCount}`);
console.log(`Failed                    : ${failCount}`);
console.log('------------------------------------------------------------------------------');

if (failCount === 0) {
  console.log('VERDICT: APPROVE (Milestone 1 satisfies all adversarial criteria)\n');
  process.exit(0);
} else {
  console.error('VERDICT: REQUEST_CHANGES (Adversarial failures detected)\n');
  process.exit(1);
}
