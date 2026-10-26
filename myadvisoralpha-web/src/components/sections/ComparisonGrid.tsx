'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface ComparisonRow {
  id: string;
  category: 'trust' | 'advisory' | 'execution' | 'support';
  feature: string;
  description: string;
  advisorAlpha: {
    title: React.ReactNode;
    description: string;
    isAdvantage: boolean;
  };
  traditionalBroker: {
    title: React.ReactNode;
    description: string;
    isAdvantage: boolean | null;
  };
  unvettedTips: {
    title: React.ReactNode;
    description: string;
    isAdvantage: boolean;
  };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'sebi-registration',
    category: 'trust',
    feature: 'Regulatory License & SEBI Audit',
    description: 'Statutory compliance, ethical boundaries, and legal accountability',
    advisorAlpha: {
      title: 'SEBI Registered RA (INH000021818)',
      description: 'BSE Enlistment #6793. Perpetual validity, mandatory SEBI Research Analysts compliance audits, and full legal accountability.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Execution-Only Broker License',
      description: 'Licensed solely for order routing. Brokers do not assume fiduciary responsibility for stock recommendations.',
      isAdvantage: null,
    },
    unvettedTips: {
      title: 'Unregulated & Illegal Channels',
      description: 'Anonymous Telegram/WhatsApp finfluencers operating without SEBI registration, facing frequent regulatory crackdowns.',
      isAdvantage: false,
    },
  },
  {
    id: 'research-pedigree',
    category: 'advisory',
    feature: 'Institutional Research Desk',
    description: 'Pedigree and rigor behind each equity recommendation',
    advisorAlpha: {
      title: 'Led by CIO Pankaj Murarka',
      description: '30+ years institutional equity experience (Ex-CIO Axis AMC, $5B AUM). Proprietary SQGARP™ framework with 75+ years combined research pedigree.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Generic Sell-Side Research',
      description: 'Impersonal, automated screening algorithms or 40-page institutional research PDFs with delayed consensus updates.',
      isAdvantage: null,
    },
    unvettedTips: {
      title: 'Hype & Momentum Speculation',
      description: 'Unverified screenshots, pump-and-dump penny stocks, momentum chasing without fundamental balance sheet evaluation.',
      isAdvantage: false,
    },
  },
  {
    id: 'signal-specificity',
    category: 'advisory',
    feature: 'Actionable Signal Specificity',
    description: 'Exact entry price bands, multiple targets, and exit rules',
    advisorAlpha: {
      title: 'Entry, T1/T2/T3 Targets & Hard Stop-Loss',
      description: 'Every recommendation specifies exact buy bands, 3 progressive profit booking targets, hard stop-losses, and live trailing alerts.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Vague Buy/Hold Ratings',
      description: 'Ambiguous 12-month price targets without clear tactical entry ranges or explicit risk-managed exit rules.',
      isAdvantage: false,
    },
    unvettedTips: {
      title: (
        <span className="inline-flex items-center gap-1">
          &quot;BUY NOW <TrendingUp className="w-4 h-4 text-rose-400 inline" />&quot; With Zero Exit Rules
        </span>
      ),
      description: 'Hype messages without stop-loss risk management; total admin silence or deletion when prices plunge 30%.',
      isAdvantage: false,
    },
  },
  {
    id: 'incentive-alignment',
    category: 'trust',
    feature: 'Fee Model & Conflict of Interest',
    description: 'How the service generates revenue from your trading',
    advisorAlpha: {
      title: '100% Flat Fee-Only Subscription',
      description: 'Zero commission kickbacks from brokers. Zero turnover incentives. We only win when you succeed and renew your subscription.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Volume & Brokerage Churn Model',
      description: 'Brokers earn fee commissions per transaction, incentivizing frequent over-trading, options turnover, and margin loans.',
      isAdvantage: false,
    },
    unvettedTips: {
      title: 'Front-Running & Paid Promotions',
      description: 'Operators buy illiquid shares first, pump them to followers, and dump their positions at retail investors\' expense.',
      isAdvantage: false,
    },
  },
  {
    id: 'portfolio-diagnostics',
    category: 'execution',
    feature: 'Portfolio Diagnostics & Rebalancing',
    description: 'Continuous portfolio health monitoring and risk controls',
    advisorAlpha: {
      title: 'Continuous 360° Health Review',
      description: 'Dynamic portfolio diagnostics, sector concentration audits, and 1-tap quarterly rebalancing across curated equity baskets.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Static Ledger & Holding Statements',
      description: 'Basic daily P&L and statement views with zero proactive guidance on cutting losers or taking profits on winners.',
      isAdvantage: null,
    },
    unvettedTips: {
      title: 'Zero Holistic Portfolio View',
      description: 'Isolated stock tips with no asset allocation strategy, leading to heavy portfolio drawdowns during sector rotations.',
      isAdvantage: false,
    },
  },
  {
    id: 'custody-control',
    category: 'execution',
    feature: 'Capital Custody & Broker Control',
    description: 'Security and possession of your investment capital',
    advisorAlpha: {
      title: '100% Custody in Your Own Demat',
      description: 'Your capital stays safe in your existing Demat (Zerodha, Groww, AngelOne, etc.). 1-tap execution with zero custody risk.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Broker Custody Silo',
      description: 'Capital held in proprietary brokerage account, requiring complete platform lock-in and account transfer hurdles.',
      isAdvantage: null,
    },
    unvettedTips: {
      title: 'High Risk of Scam Pooled Wallets',
      description: 'High frequency of phishing links, fraudulent trading apps, or unauthorized PMS pooling accounts.',
      isAdvantage: false,
    },
  },
  {
    id: 'support-recourse',
    category: 'support',
    feature: 'Dedicated Support & Legal Recourse',
    description: 'Resolution of grievances and escalation paths',
    advisorAlpha: {
      title: '5-Tier Grievance Matrix + Phone Support',
      description: 'Direct phone (+91 8655387833), dedicated Compliance Officer (Ms. Nidhi Kamani), SEBI SCORES, and Smart ODR recourse.',
      isAdvantage: true,
    },
    traditionalBroker: {
      title: 'Automated Bot & Queued Helpdesk',
      description: 'Tier-1 chatbot queues with delayed ticket response times during volatile market hours.',
      isAdvantage: null,
    },
    unvettedTips: {
      title: 'Blocked / Kicked from Telegram Group',
      description: 'Zero customer support; subscribers who question losses or fraudulent calls are deleted and blocked.',
      isAdvantage: false,
    },
  },
];

interface ComparisonGridProps {
  onOpenConsultation?: () => void;
}

export default function ComparisonGrid({ onOpenConsultation }: ComparisonGridProps) {
  const [mobileTab, setMobileTab] = useState<'brokerages' | 'unregulated'>('brokerages');

  return (
    <section 
      id="comparison" 
      className="relative bg-[#081026] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#F5BA31]/10 rounded-full blur-[120px] pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5BA31]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5BA31]">
              PRO MEMBERSHIPS · WHY US
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Stop Guessing.{' '}
            <span className="text-[#F5BA31] inline-block">
              Start Growing.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            See how MyAdvisorAlpha’s SEBI-registered institutional advisory contrasts against 
            traditional brokerages and unvetted social media tips.
          </p>
        </div>

        {/* Mobile Tab Switcher (< lg screens) */}
        <div className="block lg:hidden mb-6">
          <div className="bg-[#0B1528] border border-white/10 p-1.5 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMobileTab('brokerages')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                mobileTab === 'brokerages'
                  ? 'bg-[#F5BA31] text-[#081026] font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              vs Traditional Brokerages
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('unregulated')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                mobileTab === 'unregulated'
                  ? 'bg-[#F5BA31] text-[#081026] font-bold shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              vs Unvetted Tips & Finfluencers
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP COMPARISON TABLE (lg:block) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1528] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.4)]">
            
            {/* Table Header Row */}
            <div className="grid grid-cols-12 border-b border-white/10 bg-white/[0.02] text-left">
              <div className="col-span-4 p-6 flex flex-col justify-end">
                <span className="text-xs uppercase font-bold tracking-wider text-white/40">
                  Decision Criteria
                </span>
                <span className="text-lg font-bold text-white mt-1">
                  Feature Comparison
                </span>
              </div>

              {/* MyAdvisorAlpha Column (Highlighted) */}
              <div className="col-span-3 p-6 bg-[#F5BA31] text-[#081026]/[0.08] border-x border-[#F5BA31]/30 relative flex flex-col justify-end">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#F5BA31] text-[#081026]" />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5BA31] text-[#081026] text-[10px] font-extrabold tracking-wide uppercase self-start mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  Recommended · SEBI RA
                </div>
                <div className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span>MyAdvisorAlpha</span>
                </div>
                <span className="text-xs text-[#3AA17E] font-semibold mt-0.5">
                  Institutional Equity Research
                </span>
              </div>

              {/* Traditional Brokerages Column */}
              <div className="col-span-3 p-6 flex flex-col justify-end">
                <span className="text-xs uppercase font-bold tracking-wider text-white/40">
                  Execution Only
                </span>
                <span className="text-lg font-bold text-white/90 mt-1">
                  Traditional Brokerages
                </span>
                <span className="text-xs text-white/50 mt-0.5">
                  Discount & Full-Service Brokers
                </span>
              </div>

              {/* Unvetted Tips Column */}
              <div className="col-span-2 p-6 flex flex-col justify-end bg-red-950/[0.1] border-l border-white/5">
                <span className="text-xs uppercase font-bold tracking-wider text-red-400/80">
                  High Risk
                </span>
                <span className="text-base font-bold text-white/80 mt-1">
                  Unvetted Tips
                </span>
                <span className="text-xs text-white/40 mt-0.5">
                  Telegram & Finfluencers
                </span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
              {COMPARISON_ROWS.map((row, idx) => (
                <div 
                  key={row.id} 
                  className={`grid grid-cols-12 items-stretch transition-colors ${
                    idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                  } hover:bg-white/[0.03]`}
                >
                  {/* Feature Label & Subtitle */}
                  <div className="col-span-4 p-5 sm:p-6 flex flex-col justify-center">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      {row.feature}
                    </span>
                    <span className="text-xs text-white/50 mt-1 leading-relaxed">
                      {row.description}
                    </span>
                  </div>

                  {/* MyAdvisorAlpha Cell */}
                  <div className="col-span-3 p-5 sm:p-6 bg-[#F5BA31] text-[#081026]/[0.05] border-x border-[#F5BA31]/20 flex flex-col justify-center">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#3AA17E] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">
                          {row.advisorAlpha.title}
                        </div>
                        <div className="text-xs text-white/70 mt-1 leading-relaxed">
                          {row.advisorAlpha.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Traditional Broker Cell */}
                  <div className="col-span-3 p-5 sm:p-6 flex flex-col justify-center">
                    <div className="flex items-start gap-2.5">
                      {row.traditionalBroker.isAdvantage === false ? (
                        <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white/50 shrink-0 mt-0.5">
                          –
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-white/80">
                          {row.traditionalBroker.title}
                        </div>
                        <div className="text-xs text-white/50 mt-1 leading-relaxed">
                          {row.traditionalBroker.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unvetted Tips Cell */}
                  <div className="col-span-2 p-5 sm:p-6 flex flex-col justify-center bg-red-950/[0.05] border-l border-white/5">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-red-200/90">
                          {row.unvettedTips.title}
                        </div>
                        <div className="text-[11px] text-white/40 mt-1 leading-relaxed">
                          {row.unvettedTips.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row CTA Strip */}
            <div className="grid grid-cols-12 bg-gradient-to-r from-[#0B1528] via-[#0D1A33] to-[#0B1528] border-t border-white/10 p-6 items-center">
              <div className="col-span-4">
                <span className="text-sm font-bold text-white">
                  Ready to upgrade your investing?
                </span>
                <p className="text-xs text-white/50 mt-0.5">
                  100% custody in your existing Demat account. Zero platform lock-in.
                </p>
              </div>

              <div className="col-span-3">
                <a
                  href="https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] active:scale-95 text-xs font-bold transition-all shadow-lg shadow-black/40"
                >
                  <span>Start for ₹999/mo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="col-span-5 flex items-center justify-end gap-3 pl-6">
                <span className="text-xs text-white/60">
                  Prefer a one-on-one portfolio discussion?
                </span>
                {onOpenConsultation ? (
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white text-xs font-semibold transition-all whitespace-nowrap cursor-pointer"
                  >
                    Request Free Callback
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white text-xs font-semibold transition-all whitespace-nowrap"
                  >
                    Contact Advisory Desk
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE COMPARISON CARDS (< lg screens) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-4">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border border-white/10 bg-[#0B1528] p-5 shadow-lg space-y-4"
            >
              {/* Row Title */}
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#F5BA31]">
                  {row.category.toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {row.feature}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  {row.description}
                </p>
              </div>

              {/* AdvisorAlpha Card Highlight */}
              <div className="p-3.5 rounded-xl bg-[#F5BA31] text-[#081026]/10 border border-[#F5BA31]/30 relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#F5BA31] uppercase tracking-wide flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    MyAdvisorAlpha (SEBI RA)
                  </span>
                  <span className="text-[10px] bg-[#3AA17E]/20 text-[#3AA17E] px-2 py-0.5 rounded-full font-bold">
                    Regulated
                  </span>
                </div>
                <div className="text-sm font-bold text-white flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                  <span>{row.advisorAlpha.title}</span>
                </div>
                <p className="text-xs text-white/70 mt-1.5 leading-relaxed pl-6">
                  {row.advisorAlpha.description}
                </p>
              </div>

              {/* Alternative Comparison (Based on mobileTab) */}
              {mobileTab === 'brokerages' ? (
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white/60 uppercase tracking-wide">
                      Traditional Brokerages
                    </span>
                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-semibold">
                      Self-Directed
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white/80">
                    {row.traditionalBroker.title}
                  </div>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {row.traditionalBroker.description}
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-red-950/[0.15] border border-red-500/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Unvetted Tips & Finfluencers
                    </span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">
                      Unregulated
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-red-200">
                    {row.unvettedTips.title}
                  </div>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {row.unvettedTips.description}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Mobile Quick Action Card */}
          <div className="rounded-2xl border border-[#F5BA31]/30 bg-gradient-to-b from-[#0B1528] to-[#0D1A33] p-5 text-center shadow-lg mt-6">
            <h4 className="text-base font-extrabold text-white">
              Stop Guessing with Your Hard-Earned Wealth
            </h4>
            <p className="text-xs text-white/70 mt-1.5 mb-4">
              Get SEBI-registered stock recommendations with clear entry, target, and stop-loss directly on your phone.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#F5BA31] text-[#081026] active:scale-95 font-bold text-sm shadow-md"
              >
                <span>Subscribe for ₹999/mo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenConsultation ? (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="py-2.5 px-4 rounded-xl border border-white/20 active:scale-95 text-white/90 font-semibold text-xs cursor-pointer"
                >
                  Book Free Advisory Call
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="py-2.5 px-4 rounded-xl border border-white/20 active:scale-95 text-white/90 font-semibold text-xs"
                >
                  Book Free Advisory Call
                </Link>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
