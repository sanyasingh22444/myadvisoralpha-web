/**
 * ==============================================================================
 * MyAdvisorAlpha Financial Calculator Engine (`src/lib/calculator.ts`)
 * ==============================================================================
 * Rigorous mathematical formulas for:
 *   1. Monthly SIP Compounding: FV = P * ((1+i)^n - 1)/i * (1+i)
 *   2. Lumpsum Compounding: A = P * (1 + r/100)^t
 *   3. SEBI Advisory Pro Alpha Comparison (+4% to +6% over Benchmark Index)
 *   4. Yearly Wealth Progression for Visualization
 *   5. Consultation Lead Modal Portfolio Bucket Mapping
 * ==============================================================================
 */

export interface SipCalculationInput {
  monthlyInvestment: number; // ₹500 to ₹10,00,000
  timePeriodYears: number;   // 1 to 30 years
  expectedReturnRate: number;// 1% to 30%
}

export interface SipCalculationResult {
  investedAmount: number;
  estimatedReturn: number;
  totalValue: number;
  alphaBenchmarkValue: number; // Value at benchmark (e.g. 12%)
  alphaAdvisorValue: number;   // Value with Advisor Alpha (+4% to +6%, e.g. 18%)
  // Aliases for verify-e2e.mjs compatibility
  invested: number;
  futureValue: number;
  gain: number;
  alphaDifference: number;
  gainPercentage: number;
}

export interface LumpsumCalculationInput {
  principalAmount: number;   // ₹1,000 to ₹1,00,00,000
  timePeriodYears: number;   // 1 to 30 years
  expectedReturnRate: number;// 1% to 30%
}

export interface LumpsumCalculationResult {
  investedAmount: number;
  estimatedReturn: number;
  totalValue: number;
  alphaBenchmarkValue: number;
  alphaAdvisorValue: number;
  // Aliases for verify-e2e.mjs compatibility
  invested: number;
  futureValue: number;
  gain: number;
  alphaDifference: number;
  gainPercentage: number;
}

export interface AlphaComparisonResult {
  investedAmount: number;
  tenureYears: number;
  benchmarkRate: number;      // e.g. 12%
  advisorRate: number;        // e.g. 18% (+6% Alpha)
  benchmarkValue: number;
  advisorValue: number;
  extraWealthCreated: number; // Advisor - Benchmark
  alphaOutperformancePct: number; // % increase in wealth
}

export interface YearlyProgressionPoint {
  year: number;
  invested: number;
  futureValue: number;
  returns: number;
  benchmarkValue: number;
  advisorValue: number;
}

export const CALCULATOR_BOUNDS = {
  sip: {
    minMonthly: 500,
    maxMonthly: 1000000,
    defaultMonthly: 25000,
    step: 500,
  },
  lumpsum: {
    minPrincipal: 10000,
    maxPrincipal: 10000000,
    defaultPrincipal: 500000,
    step: 5000,
  },
  tenure: {
    minYears: 1,
    maxYears: 30,
    defaultYears: 10,
    step: 1,
  },
  rate: {
    minRate: 1,
    maxRate: 30,
    defaultRate: 15,
    benchmarkDefault: 12, // Traditional Indian Equity Index (Nifty 50)
    advisorAlphaSpread: 6, // +6% Target Alpha (12% -> 18%)
    step: 0.5,
  },
};

/**
 * Monthly SIP Compounding Calculation
 * Formula: FV = P * ((1 + i)^n - 1)/i * (1 + i)
 * Where:
 *   P = Monthly installment
 *   r = Annual return rate in %
 *   i = Monthly rate = r / 100 / 12
 *   n = Total months = tenureYears * 12
 *
 * Supports both object input and positional arguments:
 *   calculateSip({ monthlyInvestment: 10000, timePeriodYears: 10, expectedReturnRate: 15 })
 *   calculateSip(10000, 10, 15)
 */
export function calculateSip(input: SipCalculationInput): SipCalculationResult;
export function calculateSip(monthlyAmount: number, tenureYears: number, annualRatePercent: number): SipCalculationResult;
export function calculateSip(
  arg1: number | SipCalculationInput,
  arg2?: number,
  arg3?: number
): SipCalculationResult {
  let P: number;
  let t: number;
  let r: number;

  if (typeof arg1 === 'object' && arg1 !== null) {
    P = Number(arg1.monthlyInvestment);
    t = Number(arg1.timePeriodYears);
    r = Number(arg1.expectedReturnRate);
  } else {
    P = Number(arg1);
    t = Number(arg2 ?? 0);
    r = Number(arg3 ?? 0);
  }

  // Boundary condition: Zero or negative capital / tenure
  if (isNaN(P) || isNaN(t) || P <= 0 || t <= 0) {
    return {
      investedAmount: 0,
      estimatedReturn: 0,
      totalValue: 0,
      alphaBenchmarkValue: 0,
      alphaAdvisorValue: 0,
      invested: 0,
      futureValue: 0,
      gain: 0,
      alphaDifference: 0,
      gainPercentage: 0,
    };
  }

  const n = t * 12;
  const invested = Math.round(P * n);

  // Boundary condition: Zero interest rate (avoids division by zero)
  if (isNaN(r) || r <= 0) {
    return {
      investedAmount: invested,
      estimatedReturn: 0,
      totalValue: invested,
      alphaBenchmarkValue: invested,
      alphaAdvisorValue: invested,
      invested,
      futureValue: invested,
      gain: 0,
      alphaDifference: 0,
      gainPercentage: 0,
    };
  }

  // Monthly compounding calculation
  const i = r / 100 / 12;
  const fvRaw = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalValue = Math.round(fvRaw);
  const estimatedReturn = Math.round(totalValue - invested);

  // Alpha Comparison: Benchmark (12%) vs Pro Advisory (18%)
  const benchI = CALCULATOR_BOUNDS.rate.benchmarkDefault / 100 / 12;
  const benchFvRaw = P * ((Math.pow(1 + benchI, n) - 1) / benchI) * (1 + benchI);
  const alphaBenchmarkValue = Math.round(benchFvRaw);

  const advisorRate = CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread;
  const advisorI = advisorRate / 100 / 12;
  const advisorFvRaw = P * ((Math.pow(1 + advisorI, n) - 1) / advisorI) * (1 + advisorI);
  const alphaAdvisorValue = Math.round(advisorFvRaw);

  const alphaDifference = Math.max(0, alphaAdvisorValue - alphaBenchmarkValue);
  const gainPercentage = invested > 0 ? (estimatedReturn / invested) * 100 : 0;

  return {
    investedAmount: invested,
    estimatedReturn,
    totalValue,
    alphaBenchmarkValue,
    alphaAdvisorValue,
    invested,
    futureValue: totalValue,
    gain: estimatedReturn,
    alphaDifference,
    gainPercentage,
  };
}

/**
 * Lumpsum One-Time Compounding Calculation
 * Formula: FV = P * (1 + r/100)^t
 *
 * Supports both object input and positional arguments:
 *   calculateLumpsum({ principalAmount: 100000, timePeriodYears: 5, expectedReturnRate: 15 })
 *   calculateLumpsum(100000, 5, 15)
 */
export function calculateLumpsum(input: LumpsumCalculationInput): LumpsumCalculationResult;
export function calculateLumpsum(principalAmount: number, tenureYears: number, annualRatePercent: number): LumpsumCalculationResult;
export function calculateLumpsum(
  arg1: number | LumpsumCalculationInput,
  arg2?: number,
  arg3?: number
): LumpsumCalculationResult {
  let P: number;
  let t: number;
  let r: number;

  if (typeof arg1 === 'object' && arg1 !== null) {
    P = Number(arg1.principalAmount);
    t = Number(arg1.timePeriodYears);
    r = Number(arg1.expectedReturnRate);
  } else {
    P = Number(arg1);
    t = Number(arg2 ?? 0);
    r = Number(arg3 ?? 0);
  }

  // Boundary condition: Zero or negative capital / tenure
  if (isNaN(P) || isNaN(t) || P <= 0 || t <= 0) {
    return {
      investedAmount: 0,
      estimatedReturn: 0,
      totalValue: 0,
      alphaBenchmarkValue: 0,
      alphaAdvisorValue: 0,
      invested: 0,
      futureValue: 0,
      gain: 0,
      alphaDifference: 0,
      gainPercentage: 0,
    };
  }

  const invested = Math.round(P);

  // Boundary condition: Zero interest rate
  if (isNaN(r) || r <= 0) {
    return {
      investedAmount: invested,
      estimatedReturn: 0,
      totalValue: invested,
      alphaBenchmarkValue: invested,
      alphaAdvisorValue: invested,
      invested,
      futureValue: invested,
      gain: 0,
      alphaDifference: 0,
      gainPercentage: 0,
    };
  }

  const fvRaw = P * Math.pow(1 + r / 100, t);
  const totalValue = Math.round(fvRaw);
  const estimatedReturn = Math.round(totalValue - invested);

  // Alpha Comparison: Benchmark (12%) vs Pro Advisory (18%)
  const benchFvRaw = P * Math.pow(1 + CALCULATOR_BOUNDS.rate.benchmarkDefault / 100, t);
  const alphaBenchmarkValue = Math.round(benchFvRaw);

  const advisorRate = CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread;
  const advisorFvRaw = P * Math.pow(1 + advisorRate / 100, t);
  const alphaAdvisorValue = Math.round(advisorFvRaw);

  const alphaDifference = Math.max(0, alphaAdvisorValue - alphaBenchmarkValue);
  const gainPercentage = invested > 0 ? (estimatedReturn / invested) * 100 : 0;

  return {
    investedAmount: invested,
    estimatedReturn,
    totalValue,
    alphaBenchmarkValue,
    alphaAdvisorValue,
    invested,
    futureValue: totalValue,
    gain: estimatedReturn,
    alphaDifference,
    gainPercentage,
  };
}

/**
 * Dedicated Alpha Outperformance Comparison
 */
export function calculateAlphaComparison(
  amount: number,
  tenureYears: number,
  mode: 'sip' | 'lumpsum' = 'sip',
  benchmarkRate: number = CALCULATOR_BOUNDS.rate.benchmarkDefault,
  advisorRate: number = CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread
): AlphaComparisonResult {
  const isSip = mode === 'sip';
  const benchRes = isSip
    ? calculateSip(amount, tenureYears, benchmarkRate)
    : calculateLumpsum(amount, tenureYears, benchmarkRate);

  const advRes = isSip
    ? calculateSip(amount, tenureYears, advisorRate)
    : calculateLumpsum(amount, tenureYears, advisorRate);

  const extraWealth = Math.max(0, advRes.futureValue - benchRes.futureValue);
  const outperformancePct = benchRes.futureValue > 0
    ? ((advRes.futureValue - benchRes.futureValue) / benchRes.futureValue) * 100
    : 0;

  return {
    investedAmount: benchRes.invested,
    tenureYears,
    benchmarkRate,
    advisorRate,
    benchmarkValue: benchRes.futureValue,
    advisorValue: advRes.futureValue,
    extraWealthCreated: extraWealth,
    alphaOutperformancePct: Number(outperformancePct.toFixed(1)),
  };
}

/**
 * Generate yearly progression milestones for chart projection
 */
export function generateYearlyProgression(
  amount: number,
  totalYears: number,
  returnRate: number,
  mode: 'sip' | 'lumpsum' = 'sip'
): YearlyProgressionPoint[] {
  const points: YearlyProgressionPoint[] = [];
  const years = Math.max(1, Math.min(30, Math.round(totalYears)));

  for (let y = 1; y <= years; y++) {
    const userRes = mode === 'sip'
      ? calculateSip(amount, y, returnRate)
      : calculateLumpsum(amount, y, returnRate);

    const benchRes = mode === 'sip'
      ? calculateSip(amount, y, CALCULATOR_BOUNDS.rate.benchmarkDefault)
      : calculateLumpsum(amount, y, CALCULATOR_BOUNDS.rate.benchmarkDefault);

    const advRes = mode === 'sip'
      ? calculateSip(amount, y, CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread)
      : calculateLumpsum(amount, y, CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread);

    points.push({
      year: y,
      invested: userRes.invested,
      futureValue: userRes.futureValue,
      returns: userRes.gain,
      benchmarkValue: benchRes.futureValue,
      advisorValue: advRes.futureValue,
    });
  }

  return points;
}

/**
 * Maps calculated wealth projection to the corresponding Lead Consultation Modal portfolio size bucket
 * Matching Tier 3 assertion #10 & Lead Capture form schema
 */
export function mapWealthToPortfolioBucket(projectedWealthRupees: number): string {
  if (projectedWealthRupees >= 10000000) {
    return '₹1Cr+';
  }
  if (projectedWealthRupees >= 2500000) {
    return '> ₹25 Lakhs';
  }
  if (projectedWealthRupees >= 500000) {
    return '₹5L - ₹25L';
  }
  return 'Below ₹5L';
}
