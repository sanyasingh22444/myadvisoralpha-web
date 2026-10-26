'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { formatINR, formatCompactINR } from '@/lib/utils';
import {
  calculateSip,
  calculateLumpsum,
  calculateAlphaComparison,
  CALCULATOR_BOUNDS,
  mapWealthToPortfolioBucket,
} from '@/lib/calculator';
import AlphaComparisonBanner from './AlphaComparisonBanner';

interface SipCalculatorProps {
  onOpenLeadModal?: (portfolioBucket?: string) => void;
  onOpenConsultation?: (portfolioBucket?: string) => void;
  className?: string;
  defaultMode?: 'sip' | 'lumpsum';
}

export default function SipCalculator({
  onOpenLeadModal,
  onOpenConsultation,
  className = '',
  defaultMode = 'sip',
}: SipCalculatorProps) {
  // Mode selection: SIP (Monthly) vs Lumpsum (One-Time)
  const [mode, setMode] = useState<'sip' | 'lumpsum'>(defaultMode);

  // Input states with defaults
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(CALCULATOR_BOUNDS.sip.defaultMonthly);
  const [lumpsumInvestment, setLumpsumInvestment] = useState<number>(CALCULATOR_BOUNDS.lumpsum.defaultPrincipal);
  const [tenureYears, setTenureYears] = useState<number>(CALCULATOR_BOUNDS.tenure.defaultYears);
  const [returnRate, setReturnRate] = useState<number>(CALCULATOR_BOUNDS.rate.defaultRate);

  // Active investment amount depending on current mode
  const currentInvestment = mode === 'sip' ? monthlyInvestment : lumpsumInvestment;

  // Real-time calculation computation
  const calculation = useMemo(() => {
    if (mode === 'sip') {
      return calculateSip({
        monthlyInvestment,
        timePeriodYears: tenureYears,
        expectedReturnRate: returnRate,
      });
    } else {
      return calculateLumpsum({
        principalAmount: lumpsumInvestment,
        timePeriodYears: tenureYears,
        expectedReturnRate: returnRate,
      });
    }
  }, [mode, monthlyInvestment, lumpsumInvestment, tenureYears, returnRate]);

  // Pro Advisory Alpha comparison computation
  const alphaComparison = useMemo(() => {
    return calculateAlphaComparison(
      currentInvestment,
      tenureYears,
      mode,
      CALCULATOR_BOUNDS.rate.benchmarkDefault,
      CALCULATOR_BOUNDS.rate.benchmarkDefault + CALCULATOR_BOUNDS.rate.advisorAlphaSpread
    );
  }, [currentInvestment, tenureYears, mode]);

  // SVG Donut Chart Parameters
  const donutMath = useMemo(() => {
    const total = calculation.totalValue || 1;
    const invested = calculation.investedAmount || 0;
    const returns = calculation.estimatedReturn || 0;

    const investedPct = Math.round((invested / total) * 100);
    const returnsPct = 100 - investedPct;

    // Circumference = 2 * pi * r (r = 65 -> 2 * 3.14159 * 65 = 408.4)
    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const investedStrokeDash = (investedPct / 100) * circumference;
    const returnsStrokeDash = (returnsPct / 100) * circumference;

    return {
      radius,
      circumference,
      investedPct,
      returnsPct,
      investedStrokeDash,
      returnsStrokeDash,
    };
  }, [calculation]);

  // Handlers for investment amount
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (mode === 'sip') {
      setMonthlyInvestment(Math.max(0, Math.min(CALCULATOR_BOUNDS.sip.maxMonthly, rawVal)));
    } else {
      setLumpsumInvestment(Math.max(0, Math.min(CALCULATOR_BOUNDS.lumpsum.maxPrincipal, rawVal)));
    }
  };

  const handleAmountSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (mode === 'sip') {
      setMonthlyInvestment(val);
    } else {
      setLumpsumInvestment(val);
    }
  };

  // Handlers for tenure
  const handleTenureSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setTenureYears(Number(e.target.value));
  };

  const handleTenureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/[^0-9]/g, ''));
    setTenureYears(Math.max(1, Math.min(CALCULATOR_BOUNDS.tenure.maxYears, val)));
  };

  // Handlers for return rate
  const handleRateSlider = (e: ChangeEvent<HTMLInputElement>) => {
    setReturnRate(Number(e.target.value));
  };

  const handleRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setReturnRate(Math.max(1, Math.min(CALCULATOR_BOUNDS.rate.maxRate, val)));
    }
  };

  const triggerModal = (bucket: string) => {
    if (onOpenLeadModal) {
      onOpenLeadModal(bucket);
    } else if (onOpenConsultation) {
      onOpenConsultation(bucket);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-consultation-modal', {
          detail: { portfolioSize: bucket },
        })
      );
    }
  };

  // Slider visual fill percentage helpers
  const minAmt = mode === 'sip' ? CALCULATOR_BOUNDS.sip.minMonthly : CALCULATOR_BOUNDS.lumpsum.minPrincipal;
  const maxAmt = mode === 'sip' ? CALCULATOR_BOUNDS.sip.maxMonthly : CALCULATOR_BOUNDS.lumpsum.maxPrincipal;
  const stepAmt = mode === 'sip' ? CALCULATOR_BOUNDS.sip.step : CALCULATOR_BOUNDS.lumpsum.step;
  const amountFillPct = Math.max(0, Math.min(100, ((currentInvestment - minAmt) / (maxAmt - minAmt)) * 100));
  const tenureFillPct = Math.max(0, Math.min(100, ((tenureYears - CALCULATOR_BOUNDS.tenure.minYears) / (CALCULATOR_BOUNDS.tenure.maxYears - CALCULATOR_BOUNDS.tenure.minYears)) * 100));
  const rateFillPct = Math.max(0, Math.min(100, ((returnRate - CALCULATOR_BOUNDS.rate.minRate) / (CALCULATOR_BOUNDS.rate.maxRate - CALCULATOR_BOUNDS.rate.minRate)) * 100));

  // Quick preset chips
  const sipChips = [5000, 10000, 25000, 50000, 100000];
  const lumpsumChips = [100000, 500000, 1000000, 2500000, 5000000];
  const tenureChips = [3, 5, 10, 15, 20];
  const rateChips = [
    { label: '10% (FD/Debt)', val: 10 },
    { label: '12% (Nifty Index)', val: 12 },
    { label: '15% (Balanced Growth)', val: 15 },
    { label: '18% (AdvisorAlpha Pro)', val: 18 },
  ];

  return (
    <section id="calculator" className={`w-full py-16 lg:py-24 bg-[#081026] text-white ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5BA31]/10 border border-[#F5BA31]/30 text-[#F5BA31] text-xs font-semibold tracking-widest uppercase mb-4">
            <TrendingUp className="w-4 h-4" />
            <span>Interactive Wealth Projection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Compound Your Wealth with <span className="text-[#F5BA31]">Proven Alpha</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
            Simulate your investment growth and discover the compounding difference when your portfolio is guided by SEBI-registered Research Analysts.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 bg-[#0B1528] border border-white/10 rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => setMode('sip')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'sip'
                  ? 'bg-[#F5BA31] text-[#081026] shadow-[0_0_20px_rgba(245,186,49,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SIP (Monthly Investment)
            </button>
            <button
              type="button"
              onClick={() => setMode('lumpsum')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'lumpsum'
                  ? 'bg-[#F5BA31] text-[#081026] shadow-[0_0_20px_rgba(245,186,49,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Lumpsum (One-Time)
            </button>
          </div>
        </div>

        {/* 2-Column Calculator Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Sliders & Parameter Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Input 1: Investment Amount */}
            <div className="bg-[#0B1528] border border-[#2A2A2A] hover:border-white/20 rounded-2xl p-5 sm:p-6 transition-all shadow-md">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#F5BA31]" />
                  <span>{mode === 'sip' ? 'Monthly Investment' : 'Total Investment'}</span>
                </label>
                <div className="flex items-center bg-[#0D1A33] border border-[#2A2A2A] rounded-xl px-3 py-1.5 focus-within:border-[#F5BA31] focus-within:ring-1 focus-within:ring-[#F5BA31] transition-all">
                  <span className="text-gray-400 font-bold text-sm mr-1.5">₹</span>
                  <input
                    type="text"
                    value={currentInvestment.toLocaleString('en-IN')}
                    onChange={handleAmountChange}
                    className="bg-transparent text-right font-black text-white text-base sm:text-lg outline-none w-28 sm:w-36 tabular-nums"
                    aria-label="Investment Amount"
                  />
                </div>
              </div>

              {/* Range Slider */}
              <div className="py-2">
                <input
                  type="range"
                  min={minAmt}
                  max={maxAmt}
                  step={stepAmt}
                  value={currentInvestment}
                  onChange={handleAmountSlider}
                  style={{
                    background: `linear-gradient(to right, #F5BA31 0%, #F5BA31 ${amountFillPct}%, #2A2A2A ${amountFillPct}%, #2A2A2A 100%)`,
                  }}
                  className="w-full cursor-pointer"
                  aria-label="Investment Amount Slider"
                />
              </div>

              {/* Bounds & Quick Preset Chips */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mt-1">
                <span>Min: {formatINR(minAmt)}</span>
                <span>Max: {formatCompactINR(maxAmt)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-white/5">
                <span className="text-[11px] text-gray-400 font-medium mr-1">Quick:</span>
                {(mode === 'sip' ? sipChips : lumpsumChips).map((chipVal) => (
                  <button
                    key={chipVal}
                    type="button"
                    onClick={() => {
                      if (mode === 'sip') setMonthlyInvestment(chipVal);
                      else setLumpsumInvestment(chipVal);
                    }}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      currentInvestment === chipVal
                        ? 'bg-[#F5BA31] text-[#081026]/20 border-[#F5BA31] text-[#F5BA31]'
                        : 'bg-[#0D1A33] border-[#2A2A2A] text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {formatCompactINR(chipVal)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Expected Return Rate (CAGR) */}
            <div className="bg-[#0B1528] border border-[#2A2A2A] hover:border-white/20 rounded-2xl p-5 sm:p-6 transition-all shadow-md">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Expected Return Rate (p.a.)</span>
                </label>
                <div className="flex items-center bg-[#0D1A33] border border-[#2A2A2A] rounded-xl px-3 py-1.5 focus-within:border-[#F5BA31] focus-within:ring-1 focus-within:ring-[#F5BA31] transition-all">
                  <input
                    type="number"
                    min={CALCULATOR_BOUNDS.rate.minRate}
                    max={CALCULATOR_BOUNDS.rate.maxRate}
                    step={0.5}
                    value={returnRate}
                    onChange={handleRateChange}
                    className="bg-transparent text-right font-black text-white text-base sm:text-lg outline-none w-16 sm:w-20 tabular-nums"
                    aria-label="Expected Return Rate"
                  />
                  <span className="text-gray-400 font-bold text-sm ml-1.5">%</span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="py-2">
                <input
                  type="range"
                  min={CALCULATOR_BOUNDS.rate.minRate}
                  max={CALCULATOR_BOUNDS.rate.maxRate}
                  step={CALCULATOR_BOUNDS.rate.step}
                  value={returnRate}
                  onChange={handleRateSlider}
                  style={{
                    background: `linear-gradient(to right, #F5BA31 0%, #F5BA31 ${rateFillPct}%, #2A2A2A ${rateFillPct}%, #2A2A2A 100%)`,
                  }}
                  className="w-full cursor-pointer"
                  aria-label="Return Rate Slider"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mt-1">
                <span>Min: 1%</span>
                <span>Max: 30%</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-white/5">
                <span className="text-[11px] text-gray-400 font-medium mr-1">Benchmarks:</span>
                {rateChips.map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setReturnRate(chip.val)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      returnRate === chip.val
                        ? 'bg-[#F5BA31] text-[#081026]/20 border-[#F5BA31] text-[#F5BA31]'
                        : 'bg-[#0D1A33] border-[#2A2A2A] text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Investment Tenure (Years) */}
            <div className="bg-[#0B1528] border border-[#2A2A2A] hover:border-white/20 rounded-2xl p-5 sm:p-6 transition-all shadow-md">
              <div className="flex items-center justify-between gap-4 mb-3">
                <label className="text-xs sm:text-sm font-bold text-gray-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Time Period (Tenure)</span>
                </label>
                <div className="flex items-center bg-[#0D1A33] border border-[#2A2A2A] rounded-xl px-3 py-1.5 focus-within:border-[#F5BA31] focus-within:ring-1 focus-within:ring-[#F5BA31] transition-all">
                  <input
                    type="number"
                    min={CALCULATOR_BOUNDS.tenure.minYears}
                    max={CALCULATOR_BOUNDS.tenure.maxYears}
                    value={tenureYears}
                    onChange={handleTenureChange}
                    className="bg-transparent text-right font-black text-white text-base sm:text-lg outline-none w-14 sm:w-16 tabular-nums"
                    aria-label="Investment Period"
                  />
                  <span className="text-gray-400 font-bold text-sm ml-1.5">Years</span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="py-2">
                <input
                  type="range"
                  min={CALCULATOR_BOUNDS.tenure.minYears}
                  max={CALCULATOR_BOUNDS.tenure.maxYears}
                  step={CALCULATOR_BOUNDS.tenure.step}
                  value={tenureYears}
                  onChange={handleTenureSlider}
                  style={{
                    background: `linear-gradient(to right, #F5BA31 0%, #F5BA31 ${tenureFillPct}%, #2A2A2A ${tenureFillPct}%, #2A2A2A 100%)`,
                  }}
                  className="w-full cursor-pointer"
                  aria-label="Tenure Slider"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mt-1">
                <span>Min: 1 Year</span>
                <span>Max: 30 Years</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-white/5">
                <span className="text-[11px] text-gray-400 font-medium mr-1">Horizon:</span>
                {tenureChips.map((chipYears) => (
                  <button
                    key={chipYears}
                    type="button"
                    onClick={() => setTenureYears(chipYears)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                      tenureYears === chipYears
                        ? 'bg-[#F5BA31] text-[#081026]/20 border-[#F5BA31] text-[#F5BA31]'
                        : 'bg-[#0D1A33] border-[#2A2A2A] text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    {chipYears} Years
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Donut & Wealth Breakdown (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0B1528] border border-[#2A2A2A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="border-b border-white/10 pb-5">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Wealth Projected in {tenureYears} Years
                </span>
                <div className="mt-2 flex items-baseline gap-2">
                  <h3 className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
                    {formatINR(calculation.totalValue)}
                  </h3>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">
                  Includes {formatINR(calculation.estimatedReturn)} estimated compounding return
                </div>
              </div>

              {/* Pure SVG Donut Chart */}
              <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r={donutMath.radius}
                      stroke="#0D1A33"
                      strokeWidth="16"
                      fill="transparent"
                    />
                    {/* Invested Capital Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r={donutMath.radius}
                      stroke="#383B42"
                      strokeWidth="16"
                      fill="transparent"
                      strokeDasharray={donutMath.circumference}
                      strokeDashoffset={0}
                      className="transition-all duration-500 ease-out"
                    />
                    {/* Returns Growth Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r={donutMath.radius}
                      stroke="#F5BA31"
                      strokeWidth="16"
                      fill="transparent"
                      strokeDasharray={`${donutMath.returnsStrokeDash} ${donutMath.circumference}`}
                      strokeDashoffset={-donutMath.investedStrokeDash}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>

                  {/* Donut Center Metrics */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Maturity
                    </span>
                    <span className="text-lg font-black text-white tabular-nums">
                      {formatCompactINR(calculation.totalValue)}
                    </span>
                  </div>
                </div>

                {/* Donut Legend */}
                <div className="space-y-3 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-md bg-[#383B42] shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Invested Amount</div>
                      <div className="text-sm font-bold text-white tabular-nums">
                        {donutMath.investedPct}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-md bg-[#F5BA31] text-[#081026] shrink-0 shadow-[0_0_8px_rgba(245,186,49,0.6)]" />
                    <div>
                      <div className="text-xs text-[#F5BA31] font-medium">Estimated Gains</div>
                      <div className="text-sm font-bold text-white tabular-nums">
                        {donutMath.returnsPct}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Metric Tiles */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="bg-[#0D1A33] border border-white/5 rounded-2xl p-3.5">
                  <span className="text-[11px] text-gray-400 block font-medium">Invested Capital</span>
                  <span className="text-base sm:text-lg font-extrabold text-gray-200 tabular-nums block mt-1">
                    {formatINR(calculation.investedAmount)}
                  </span>
                </div>
                <div className="bg-[#0D1A33] border border-white/5 rounded-2xl p-3.5">
                  <span className="text-[11px] text-emerald-400 block font-medium">Est. Returns</span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-400 tabular-nums block mt-1">
                    +{formatINR(calculation.estimatedReturn)}
                  </span>
                </div>
              </div>

              {/* Consultation Quick Trigger */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const bucket = mapWealthToPortfolioBucket(calculation.totalValue);
                    triggerModal(bucket);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#F5BA31]/15 hover:bg-[#F5BA31]/25 border border-[#F5BA31]/40 text-[#F5BA31] hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#F5BA31]" />
                  <span>Review Portfolio For {formatCompactINR(calculation.totalValue)} Goal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AdvisorAlpha Pro Advisory Alpha Comparison Banner */}
        <div className="mt-12 sm:mt-16">
          <AlphaComparisonBanner
            comparison={alphaComparison}
            mode={mode}
            onConsultationClick={(bucket) => {
              triggerModal(bucket);
            }}
          />
        </div>
      </div>
    </section>
  );
}
