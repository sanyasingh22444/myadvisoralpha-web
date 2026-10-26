#!/usr/bin/env node
/**
 * ==============================================================================
 * CHALLENGER EMPIRICAL TEST SENSITIVITY HARNESS
 * ==============================================================================
 * Validates that `scripts/verify-e2e.mjs` is NOT a tautology.
 * Probes the harness with 7 intentional negative mutations / invalid inputs
 * to empirically prove that any failure immediately triggers:
 *   1. Increment in failed count
 *   2. `✖ [FAIL]` diagnostic in console output
 *   3. Non-zero exit code (code 1)
 * ==============================================================================
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const appDir = resolve(process.cwd());
const originalScriptPath = join(appDir, 'scripts', 'verify-e2e.mjs');
const tempScriptPath = join(appDir, 'scripts', 'verify-e2e.temp-probe.mjs');

console.log('==============================================================================');
console.log('CHALLENGER: EMPIRICAL TEST HARNESS SENSITIVITY PROBE');
console.log('Target: scripts/verify-e2e.mjs');
console.log('==============================================================================\n');

let totalProbes = 0;
let passedProbes = 0;

function runProbe(name, mutateFn) {
  totalProbes++;
  console.log(`Probe ${totalProbes}: ${name}`);
  
  const originalCode = readFileSync(originalScriptPath, 'utf8');
  let mutatedCode;
  try {
    mutatedCode = mutateFn(originalCode);
  } catch (err) {
    console.error(`  ✖ Mutation generation error: ${err.message}`);
    return false;
  }

  writeFileSync(tempScriptPath, mutatedCode, 'utf8');

  let exitCode = 0;
  let stdout = '';
  let stderr = '';

  try {
    stdout = execSync(`node scripts/verify-e2e.temp-probe.mjs --offline`, {
      cwd: appDir,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    exitCode = 0;
  } catch (err) {
    exitCode = err.status || 1;
    stdout = err.stdout || '';
    stderr = err.stderr || '';
  } finally {
    if (existsSync(tempScriptPath)) {
      unlinkSync(tempScriptPath);
    }
  }

  const correctlyFailed = exitCode !== 0;
  const failureReported = stdout.includes('✖ [FAIL]') || stdout.includes('OVERALL RESULT:');
  const failureCountDetected = /✖ OVERALL RESULT: \d+ ASSERTIONS FAILED/.test(stdout);

  if (correctlyFailed && failureReported && failureCountDetected) {
    passedProbes++;
    console.log(`  ✔ [PASS] Correctly rejected invalid condition (Exit code: ${exitCode})`);
    console.log(`           Captured summary: ${stdout.match(/✖ OVERALL RESULT: \d+ ASSERTIONS FAILED/)?.[0] || 'Assertion failure recorded'}`);
    return true;
  } else {
    console.error(`  ✖ [FAIL] Harness failed sensitivity probe! Expected exit code != 0, got ${exitCode}`);
    console.error(`  Output snippet:\n${stdout.slice(-500)}`);
    return false;
  }
}

// -----------------------------------------------------------------------------
// Probe 1: Live Server Down Flag Sensitivity
// -----------------------------------------------------------------------------
{
  totalProbes++;
  console.log(`Probe ${totalProbes}: Live Server Unreachable Sensitivity (--live --url=http://127.0.0.1:59999)`);
  let exitCode = 0;
  let stdout = '';
  try {
    stdout = execSync(`node scripts/verify-e2e.mjs --live --url=http://127.0.0.1:59999`, {
      cwd: appDir,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    exitCode = 0;
  } catch (err) {
    exitCode = err.status || 1;
    stdout = (err.stdout || '') + (err.stderr || '');
  }

  if (exitCode !== 0 && stdout.includes('unreachable')) {
    passedProbes++;
    console.log(`  ✔ [PASS] Correctly aborted with exit code ${exitCode} when live host unreachable.`);
  } else {
    console.error(`  ✖ [FAIL] Live check did not fail as expected! Exit code: ${exitCode}`);
  }
}

// -----------------------------------------------------------------------------
// Probe 2: Theme Color Token Sensitivity (Mutate expected #0066f5 -> #009999)
// -----------------------------------------------------------------------------
runProbe('Theme Color Token Sensitivity (Corrupted hex #009999)', (code) => {
  if (!code.includes("assertFileContains('tailwind.config.ts', '#0066f5'")) {
    throw new Error('Target pattern not found in code');
  }
  return code.replace(
    "assertFileContains('tailwind.config.ts', '#0066f5'",
    "assertFileContains('tailwind.config.ts', '#009999'"
  );
});

// -----------------------------------------------------------------------------
// Probe 3: Math SIP Future Value Oracle Sensitivity
// -----------------------------------------------------------------------------
runProbe('Math Oracle Sensitivity (Tampered SIP expected value)', (code) => {
  const target = 'assert(sipRes.invested === 1200000,';
  if (!code.includes(target)) {
    throw new Error('Target math pattern not found');
  }
  return code.replace(
    target,
    'assert(sipRes.invested === 999999999,'
  );
});

// -----------------------------------------------------------------------------
// Probe 4: Phone Regex Validation Sensitivity
// -----------------------------------------------------------------------------
runProbe('Lead Validation Boundary Sensitivity (Accepting 5-digit number)', (code) => {
  const target = "assert(!PHONE_REGEX.test('987654321'),";
  if (!code.includes(target)) {
    throw new Error('Target validation pattern not found');
  }
  return code.replace(
    target,
    "assert(PHONE_REGEX.test('987654321'),"
  );
});

// -----------------------------------------------------------------------------
// Probe 5: Sticky Stacking Formula Sensitivity
// -----------------------------------------------------------------------------
runProbe('Sticky Stacking Formula Sensitivity (Corrupted formula 999 + index * 99)', (code) => {
  if (!code.includes("assertFileContains('src/components/sections/StackedShowcase.tsx', '120 + index * 20'")) {
    throw new Error('Target stacking pattern not found');
  }
  return code.replace(
    "assertFileContains('src/components/sections/StackedShowcase.tsx', '120 + index * 20'",
    "assertFileContains('src/components/sections/StackedShowcase.tsx', '999 + index * 99'"
  );
});

// -----------------------------------------------------------------------------
// Probe 6: Rotating Hero Words Taxonomy Sensitivity
// -----------------------------------------------------------------------------
runProbe('Hero Rotating Headline Taxonomy Sensitivity (Wrong token "Options")', (code) => {
  if (!code.includes("heroRotatingWords: ['Stock', 'Futures', 'Portfolio']")) {
    throw new Error('Target rotating words pattern not found');
  }
  return code.replace(
    "heroRotatingWords: ['Stock', 'Futures', 'Portfolio']",
    "heroRotatingWords: ['Stock', 'Options', 'Cryptocurrency']"
  );
});

// -----------------------------------------------------------------------------
// Probe 7: Non-Existent File Sensitivity
// -----------------------------------------------------------------------------
runProbe('Missing Critical Component Sensitivity (non-existent-component.tsx)', (code) => {
  if (!code.includes("assertFileExists('src/components/layout/Navbar.tsx'")) {
    throw new Error('Target file check pattern not found');
  }
  return code.replace(
    "assertFileExists('src/components/layout/Navbar.tsx'",
    "assertFileExists('src/components/layout/NonExistentGhostComponent.tsx'"
  );
});

console.log('\n==============================================================================');
console.log('HARNESS SENSITIVITY PROBE SUMMARY');
console.log('==============================================================================');
console.log(`Total Sensitivity Probes Executed : ${totalProbes}`);
console.log(`Passed (Correctly Failed)         : ${passedProbes}`);
console.log(`Failed (Undetected / False Pass)  : ${totalProbes - passedProbes}`);
console.log('------------------------------------------------------------------------------');

if (passedProbes === totalProbes) {
  console.log('VERDICT: SENSITIVITY VERIFIED (Harness is strict, opaque-box, and responsive to failures)\n');
  process.exit(0);
} else {
  console.error('VERDICT: SENSITIVITY REJECTED (Harness has blind spots)\n');
  process.exit(1);
}
