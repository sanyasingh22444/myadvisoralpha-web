'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { formatINR, formatCompactINR } from '@/lib/utils';
import { AlphaComparisonResult, mapWealthToPortfolioBucket } from '@/lib/calculator';

interface AlphaComparisonBannerProps {
  comparison: AlphaComparisonResult;
  mode: 'sip' | 'lumpsum';
  onConsultationClick?: (portfolioBucket: string) => void;
  className?: string;
}

export default function AlphaComparisonBanner({
  comparison,
  mode,
  onConsultationClick,
  className = '',
}: AlphaComparisonBannerProps) {
  const {
    tenureYears,
    benchmarkRate,
    advisorRate,
    benchmarkValue,
    advisorValue,
    extraWealthCreated,
    alphaOutperformancePct,
  } = comparison;

  // Visual ratio calculation for comparative bars
  const maxBarValue = Math.max(advisorValue, benchmarkValue, 1);
  const benchBarWidthPct = Math.max(15, Math.min(100, Math.round((benchmarkValue / maxBarValue) * 100)));
  const advisorBarWidthPct = 100; // Always full reference in comparison

  const mappedBucket = mapWealthToPortfolioBucket(advisorValue);

  const handleActionClick = () => {
    if (onConsultationClick) {
      onConsultationClick(mappedBucket);
    } else {
      // Dispatch browser custom event for modal integration or scroll to contact
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('open-consultation-modal', {
          detail: { portfolioSize: mappedBucket },
        });
        window.dispatchEvent(event);

        // Fallback smooth scroll to contact section if modal not mounted
        const contactSection = document.getElementById('consultation-booking') || document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-amber-500/20 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all ${className}`}
      style={{
        background: 'linear-gradient(0deg, #141E30 -37.42%, #333333 65.82%)',
      }}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#F5BA31]/10 blur-3xl pointer-events-none" />

      {/* Header Eyebrow & Title */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AdvisorAlpha Institutional Alpha Advantage</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Traditional Index vs AdvisorAlpha Pro
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            See how our SEBI-registered SQGARP™ equity research framework delivers an expected{' '}
            <span className="text-amber-400 font-semibold">+{advisorRate - benchmarkRate}% sustained Alpha</span> over standard {mode.toUpperCase()} index investing over {tenureYears} years.
          </p>
        </div>

        {/* Extra Wealth Highlight Badge */}
        <div className="shrink-0 flex flex-col items-start sm:items-end bg-black/40 border border-white/10 rounded-2xl px-4 py-3">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
            Extra Wealth Generated (Alpha)
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 tabular-nums">
            +{formatINR(extraWealthCreated)}
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +{alphaOutperformancePct}% Greater Corpus
          </span>
        </div>
      </div>

      {/* Comparative Wealth Bars */}
      <div className="relative z-10 my-8 space-y-6">
        {/* Row 1: Traditional Index */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
              <span className="font-semibold text-gray-300">
                Traditional Equity Benchmark ({benchmarkRate}.0% CAGR)
              </span>
            </div>
            <span className="font-bold text-white tabular-nums">
              {formatINR(benchmarkValue)}
            </span>
          </div>
          <div className="w-full h-8 bg-black/40 rounded-xl overflow-hidden p-1 border border-white/10">
            <div
              className="h-full rounded-lg bg-white/20 transition-all duration-700 ease-out flex items-center justify-end pr-3"
              style={{ width: `${benchBarWidthPct}%` }}
            >
              <span className="text-[11px] font-bold text-gray-200 tabular-nums hidden sm:inline">
                {formatCompactINR(benchmarkValue)}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: AdvisorAlpha Pro */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                AdvisorAlpha Pro Advisory ({advisorRate}.0% CAGR)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-semibold">
                  +6% Alpha
                </span>
              </span>
            </div>
            <span className="font-black text-amber-300 tabular-nums text-base sm:text-lg">
              {formatINR(advisorValue)}
            </span>
          </div>
          <div className="w-full h-9 bg-black/50 rounded-xl overflow-hidden p-1 border border-amber-500/30 shadow-[0_0_20px_rgba(255,132,21,0.15)]">
            <div
              className="h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-between px-3 text-black font-extrabold text-xs shadow-inner"
              style={{
                width: `${advisorBarWidthPct}%`,
                background: 'linear-gradient(90deg, #FF8415 0%, #FFCA3F 100%)',
              }}
            >
              <span className="tracking-wide uppercase text-[10px] sm:text-xs text-black font-black">
                Pro Advisory Wealth
              </span>
              <span className="tabular-nums font-black text-black">
                {formatCompactINR(advisorValue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Callout & Conversion Trigger */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="text-xs sm:text-sm font-semibold text-white">
              SEBI Registered Research Analyst
            </div>
            <div className="text-[11px] text-gray-400">
              Registration No. INH000021818 • Renaissance Smart Tech Pvt Ltd
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleActionClick}
          className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EC6446] hover:bg-[#d95538] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all"
        >
          <span>Book Free Portfolio Review & Unlock Alpha</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
