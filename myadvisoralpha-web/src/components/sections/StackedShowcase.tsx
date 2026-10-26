'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Target,
  TrendingUp,
  Layers,
  Briefcase,
  PieChart,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface ShowcaseCardData {
  id: string;
  category: string;
  badge: string;
  priceTag: string;
  priceSub?: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  isExternal: boolean;
  visualType: 'stocks' | 'portfolios' | 'mutual_funds' | 'execution' | 'cio';
}

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: 'single-stocks',
    category: 'EQUITY & DERIVATIVES ADVISORY',
    badge: '75% Strike Rate · SEBI RA',
    priceTag: '₹999 / month',
    priceSub: 'Regular ₹1,499 · Save 33%',
    title: 'Single Stock Advisory with High-Conviction Research',
    description: 'Get 20+ institutional-grade research ideas each month screened via the proprietary SQGARP™ framework. Each idea arrives with clear entry bands, 3 progressive targets, and a hard stop loss, plus momentum derivatives signals.',
    features: [
      'SQGARP™ Screening: Sustainable Growth, Quality Governance & Reasonable Valuation',
      'Futures: Derivatives trading strategies and momentum signals with defined risk parameters',
      'MTF Basket: Margin Trading Facility curated equity baskets with leverage and risk management',
      'T1, T2 & T3 Multi-Target Alerts to systematically lock in gains with trailing stop losses'
    ],
    ctaLabel: 'Subscribe for ₹999/mo',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe',
    isExternal: true,
    visualType: 'stocks'
  },
  {
    id: 'model-portfolios',
    category: 'PORTFOLIO ADVISORY',
    badge: 'Full Advisory & Rebalancing',
    priceTag: 'Starting ₹299 / month',
    priceSub: 'Min Capital ₹50,000',
    title: 'Ready-to-Invest Equity Portfolios & MTF Baskets',
    description: 'Full portfolio advisory, risk profiling, and periodic rebalancing. Invest across 5 to 30 fundamentally vetted stocks tailored for your risk appetite with direct broker integration and zero custody risk.',
    features: [
      '4 Distinct Risk Baskets: Beginner (₹50k), Balanced (₹2.5L), Flexicap (18.1% Target CAGR), Aggressive',
      'Full portfolio advisory, risk profiling, and periodic rebalancing with 1-click execution',
      'MTF Basket leverage optimization with institutional downside risk management safeguards',
      '100% Custody in your own Demat account (Zerodha, Groww, AngelOne) with zero profit-sharing'
    ],
    ctaLabel: 'Explore Model Portfolios',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=0b6dbbe5-226a-4222-80fe-08f88532774b&plan_type=portfolio&action=subscribe',
    isExternal: true,
    visualType: 'portfolios'
  },
  {
    id: 'curated-mutual-funds',
    category: 'MUTUAL FUNDS',
    badge: 'AMFI ARN-350887 · ONDC Powered',
    priceTag: '100% Free Advisory',
    priceSub: 'Zero Platform Commission',
    title: 'ONDC-Powered Zero-Commission Mutual Fund Baskets',
    description: 'AMFI-registered (ARN-350887), ONDC-powered zero-commission mutual fund baskets. Skip the confusion of 1,000+ schemes with handpicked goal-based portfolios designed for wealth creation, tax saving, and retirement.',
    features: [
      'AMFI-registered (ARN-350887), ONDC-powered zero-commission mutual fund baskets',
      'Curated Goal Baskets: First Salary (16.12% 3Y), All-Weather (18.35% 3Y), Retire Rich (21.76% 3Y)',
      'ONDC Network Architecture: Bank-grade 256-bit encryption with direct AMC payouts',
      '100% Paperless Digital Onboarding via Aadhaar & PAN in under 2 minutes'
    ],
    ctaLabel: 'Start Mutual Fund SIP',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=mutual_funds',
    isExternal: true,
    visualType: 'mutual_funds'
  },
  {
    id: 'execution-tools',
    category: 'DERIVATIVES & EXECUTION',
    badge: 'Futures & MTF Signals',
    priceTag: 'Included Free',
    priceSub: 'With Active Advisory',
    title: 'Futures Strategies, MTF Baskets & 1-Tap Broker Execution',
    description: 'Derivatives trading strategies and momentum signals with seamless Demat integration. Connect your existing Demat account in seconds to execute recommendations without switching broker tabs or manual entry.',
    features: [
      'Futures: Derivatives trading strategies and momentum signals with real-time risk alerts',
      'MTF Basket: Margin Trading Facility curated equity baskets with leverage and risk management',
      '1-Tap Broker Gateway: Zerodha, Groww, AngelOne, Upstox, ICICI Direct, HDFC Sky',
      'Full Desktop Web Terminal at web.advisoralpha.in with 360° portfolio health audits'
    ],
    ctaLabel: 'Open Web App Portal',
    ctaUrl: 'https://web.advisoralpha.in/#/login',
    isExternal: true,
    visualType: 'execution'
  },
  {
    id: 'cio-edge',
    category: 'LEADERSHIP & PEDIGREE',
    badge: '30+ Years Experience',
    priceTag: 'Institutional Excellence',
    priceSub: 'Axis AMC & Rare Enterprises',
    title: 'Pankaj Murarka CIO Alpha Edge',
    description: 'Benefit directly from the identical investment philosophy and disciplined risk framework that managed over $5 Billion (₹40,000+ Cr) in institutional assets at Axis AMC.',
    features: [
      'Ex-CIO Axis Mutual Fund: Oversaw fastest growing fund house in India ($5B AUM)',
      'Rare Enterprises (Rakesh Jhunjhunwala) & UTI AMC institutional research pedigree',
      'SQGARP™ Framework: Tested across 5 major market cycles over 3 decades',
      'Regular Investor Masterclasses, weekly macroeconomic webinars & live Q&A'
    ],
    ctaLabel: 'Read CIO Story & Methodology',
    ctaUrl: '/about',
    isExternal: false,
    visualType: 'cio'
  }
];

export default function StackedShowcase() {
  return (
    <section id="offerings" className="relative bg-[#010101] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-visible">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
        <span className="text-xs font-bold tracking-widest text-[#0066f5] uppercase bg-[#0066f5]/10 border border-[#0066f5]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Our Advisory Solutions
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          Institutional Intelligence. <br className="hidden sm:inline" />
          <span className="text-[#0066f5]">Tailored For Every Investor.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
          From high-conviction single stock picks and futures momentum to comprehensive model portfolios and mutual funds — engineered by veterans with 30+ years of institutional pedigree.
        </p>
      </div>

      {/* 5-Card Sequential Sticky Deck */}
      <div className="max-w-6xl mx-auto space-y-12 lg:space-y-16">
        {SHOWCASE_CARDS.map((card, index) => {
          // Signature stacking top offsets: 120px, 140px, 160px, 180px, 200px
          const topOffset = 120 + index * 20;
          const zIndex = 20 + index;

          return (
            <div
              key={card.id}
              id={card.id}
              className="sticky transition-all duration-300"
              style={{
                top: `${topOffset}px`,
                zIndex: zIndex
              }}
            >
              {/* Deep link anchor targets for navbar navigation */}
              {card.id === 'single-stocks' && (
                <>
                  <div id="futures" className="relative -top-28 pointer-events-none" />
                  <div id="mtf-basket" className="relative -top-28 pointer-events-none" />
                </>
              )}
              {card.id === 'model-portfolios' && (
                <div id="portfolios" className="relative -top-28 pointer-events-none" />
              )}
              {card.id === 'curated-mutual-funds' && (
                <div id="mutual-funds" className="relative -top-28 pointer-events-none" />
              )}

              <div className="w-full rounded-[32px] border border-white/10 hover:border-[#0066f5]/40 bg-[#0B0E14] shadow-[0_12px_48px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[520px]">
                  
                  {/* Visual Preview Left Panel (5 Cols) */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#111622] via-[#0B0E14] to-[#010101] p-6 lg:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
                    {renderVisualGraphic(card.visualType)}
                  </div>

                  {/* Content & Action Right Panel (7 Cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#0066f5] bg-[#0066f5]/10 px-3 py-1 rounded-full border border-[#0066f5]/20">
                            {card.category}
                          </span>
                          <span className="text-[11px] font-semibold text-[#166534] bg-[#dcfce7] px-2.5 py-0.5 rounded-full border border-[#bbf7d0]">
                            {card.badge}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-extrabold text-white">{card.priceTag}</p>
                          {card.priceSub && (
                            <p className="text-[11px] text-white/50">{card.priceSub}</p>
                          )}
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-3">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                        {card.description}
                      </p>

                      {/* Feature Checklist */}
                      <ul className="space-y-2.5 mb-8">
                        {card.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                      {card.isExternal ? (
                        <a
                          href={card.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066f5] hover:bg-[#0052cc] active:scale-95 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#0066f5]/20"
                        >
                          <span>{card.ctaLabel}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link
                          href={card.ctaUrl}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0066f5] hover:bg-[#0052cc] active:scale-95 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#0066f5]/20"
                        >
                          <span>{card.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      <span className="text-xs text-white/40 font-medium">
                        ✓ SEBI RA Compliance · 100% Transparency
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Visual Graphics Renderer per Card Type
function renderVisualGraphic(type: ShowcaseCardData['visualType']) {
  switch (type) {
    case 'stocks':
      return (
        <div className="space-y-3">
          <div className="bg-[#161C28] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">TATAMOTORS</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#dbeafe] text-[#1e40af]">
                  Futures
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Target 1 Hit (+5.8%)
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Entry Range:</span>
                <span className="text-white font-medium">₹940 – ₹955</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Target 1:</span>
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
                  ₹995 (Hit <Target className="w-3.5 h-3.5 text-emerald-400 inline" />)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Target 2:</span>
                <span className="text-white/80">₹1,040 (+10.6%)</span>
              </div>
              <div className="flex justify-between">
                <span>Stop Loss:</span>
                <span className="text-red-400">₹915</span>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-3 border border-white/5 text-[11px] text-white/60 text-center">
            SQGARP™ Screening: RoE &gt; 18%, Low Debt, Durable Moat
          </div>
        </div>
      );

    case 'portfolios':
      return (
        <div className="space-y-3">
          <div className="bg-[#161C28] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">Flexicap Alpha Basket</span>
              <span className="text-xs font-black text-[#0066f5]">18.1% Target CAGR</span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-white/70 text-[11px] mb-1">
                  <span>Large Cap (45%)</span>
                  <span>Mid Cap (35%)</span>
                  <span>Small Cap (20%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 flex overflow-hidden">
                  <div className="bg-[#0066f5] h-full w-[45%]" />
                  <div className="bg-[#3AA17E] h-full w-[35%]" />
                  <div className="bg-[#EC6446] h-full w-[20%]" />
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] text-white/60">
                Top Holdings: HDFC Bank, L&amp;T, Trent, Dixon Tech
              </div>
            </div>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-3 border border-white/5 text-[11px] text-white/60 text-center flex items-center justify-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0066f5]" />
            <span>Automatic Quarterly Rebalancing &amp; MTF Leverage Alerts</span>
          </div>
        </div>
      );

    case 'mutual_funds':
      return (
        <div className="space-y-3">
          <div className="bg-[#161C28] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white">All-Weather Goal Basket</span>
              <span className="text-xs font-bold text-emerald-400">+18.35% (3Y)</span>
            </div>
            <p className="text-[11px] text-white/60 mb-3">Multi-asset safety &amp; wealth compounding</p>
            <div className="space-y-1.5 text-[11px] text-white/80">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Min Monthly SIP:</span>
                <span className="text-white font-bold">₹5,000 / mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Funds Included:</span>
                <span className="text-white font-medium">6 Curated Schemes</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Custody:</span>
                <span className="text-[#3AA17E] font-medium">Direct AMC Account</span>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-3 border border-white/5 text-[11px] text-white/60 text-center flex items-center justify-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#FF8415]" />
            <span>Powered by ONDC Financial Services · 2-Min Onboarding</span>
          </div>
        </div>
      );

    case 'execution':
      return (
        <div className="space-y-3">
          <div className="bg-[#161C28] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">1-Tap Broker Execution</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                0.4s Executed
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-black/40 rounded-lg p-2.5 border border-white/5 text-[11px]">
                <div className="flex justify-between text-white font-medium">
                  <span>BUY 50x TATAMOTORS FUT</span>
                  <span className="text-emerald-400">₹945.00</span>
                </div>
                <div className="flex justify-between text-white/40 text-[10px] mt-1">
                  <span>Target: ₹1,040</span>
                  <span>Stop: ₹915</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60 pt-1">
                <span>Broker: Zerodha Kite</span>
                <span className="text-[#3AA17E]">● Connected</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] text-white/60">
            <div className="bg-white/5 rounded-lg py-1.5">Zerodha</div>
            <div className="bg-white/5 rounded-lg py-1.5">Groww</div>
            <div className="bg-white/5 rounded-lg py-1.5">AngelOne</div>
          </div>
        </div>
      );

    case 'cio':
      return (
        <div className="space-y-3">
          <div className="bg-[#161C28] border border-white/10 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066f5] to-[#3AA17E] flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                PM
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Pankaj Murarka</h4>
                <p className="text-xs text-[#0066f5] font-medium">Founder &amp; Chief Investment Officer</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-white/10">
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-base font-extrabold text-white">$5 Billion</p>
                <p className="text-[10px] text-white/50">Peak AUM at Axis</p>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <p className="text-base font-extrabold text-white">30+ Yrs</p>
                <p className="text-[10px] text-white/50">Equity Pedigree</p>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.04] rounded-xl p-2.5 border border-white/5 text-[11px] text-white/70 italic text-center">
            &quot;I want every Indian to make money in stock market.&quot;
          </div>
        </div>
      );
  }
}
