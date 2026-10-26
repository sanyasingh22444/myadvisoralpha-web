import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import {
  ShieldCheck,
  Award,
  ArrowUpRight,
  Target,
  Building,
  Compass,
  Layers,
  Scale,
  Sparkles,
  Users,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Advisor Alpha - Institutional Equity Research & CIO Leadership',
  description:
    'Learn about Advisor Alpha (Renaissance Smart Tech Pvt Ltd, SEBI RA INH000021818), Founder & CIO Pankaj Murarka (Ex-CIO Axis AMC $5B AUM), and our SQGARP™ framework.',
};

export default function AboutPage() {
  const { founder, metrics, leadershipTeam, sqgarpPillars, contact, sebiRegNo, bseEnlistmentNo, amfiArn, cin } =
    BRAND_INFO;

  const coreValues = [
    {
      num: '01',
      title: 'No Speculation, Only Credibility',
      description:
        'Fundamental equity research backed by 30+ years of institutional fund management. We never trade on rumours, social media hype, or unverified tips.',
      icon: Award,
      badge: 'Institutional Rigor',
    },
    {
      num: '02',
      title: 'No Secrets, Total Transparency',
      description:
        'Every stock recommendation and portfolio change is accompanied by an exhaustive investment thesis, entry price range, target stages (T1–T3), and strict stop-loss.',
      icon: Layers,
      badge: 'Full Disclosure',
    },
    {
      num: '03',
      title: 'No One-Size-Fits-All, Investor-First',
      description:
        'Curated advisory strategies designed for distinct wealth-building horizons — from short-term swing momentum to 5-year compounding multi-cap baskets.',
      icon: Target,
      badge: 'Goal-Aligned',
    },
    {
      num: '04',
      title: 'No Barriers, Only Accessibility',
      description:
        'Democratizing institutional-grade investment management. Retain 100% custody of your capital in your preferred Demat account with one-click broker execution.',
      icon: Compass,
      badge: 'Zero Custody Risk',
    },
    {
      num: '05',
      title: 'No Hype, Discipline That Lasts',
      description:
        'Protecting capital is prerequisite to compounding capital. Our SQGARP™ screening enforces strict margin-of-safety valuation hurdles to mitigate downside during drawdowns.',
      icon: Scale,
      badge: 'Capital Protection',
    },
    {
      num: '06',
      title: 'No Shortcuts, Long-Term Vision',
      description:
        'Committed to the mission of financial empowerment: enabling 1,000,000+ Indian households to build durable generational wealth through disciplined equity investing.',
      icon: Building,
      badge: 'Generational Alpha',
    },
  ];

  const milestones = [
    {
      phase: 'Phase 01',
      title: 'Founding Vision & SEBI Authorization',
      period: 'Genesis',
      description:
        'Founded by Pankaj Murarka under Renaissance Smart Tech Pvt Ltd with a singular mission: bridge the vast information divide between institutional fund managers and everyday retail investors.',
      tag: 'Foundation',
    },
    {
      phase: 'Phase 02',
      title: 'Broker Integration & Advisory Infrastructure',
      period: 'Expansion',
      description:
        'Engineered institutional-grade algorithmic delivery, enabling instantaneous multi-target push alerts and 1-tap trade execution across India’s leading discount brokerages.',
      tag: 'Technology',
    },
    {
      phase: 'Phase 03',
      title: '10,000+ Investors & ₹1,500+ Cr Guided',
      period: 'Traction',
      description:
        'Crossed landmark 10,000 active investor milestone while establishing a verifiable 75% historical strike rate on closed stock ideas with transparent performance reporting.',
      tag: 'Validation',
    },
    {
      phase: 'Phase 04',
      title: '20,000+ Customers & ₹11,500+ Cr Cumulative Advisory',
      period: 'Scale',
      description:
        'Expanded advisory coverage into thematic Equity Model Portfolios and ONDC-powered zero-commission mutual fund baskets, surpassing ₹11,500+ Cr cumulative volume.',
      tag: 'Multi-Product',
    },
    {
      phase: 'Phase 05',
      title: 'Independent Web Portal & Nationwide Alpha Platform',
      period: '2026 & Beyond',
      description:
        'Launched dedicated web portal (web.advisoralpha.in) and mobile apps on iOS & Android, putting institutional equity research in the hands of 1,00,000+ active investors across India.',
      tag: 'National Reach',
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full selection:bg-[#F5BA31] selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 lg:pt-36 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F5BA31]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-[#3AA17E]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Regulatory Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1528] border border-[#F5BA31]/40 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-6 shadow-[0px_4px_20px_0px_rgba(245,186,49,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#3AA17E] animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-[#3AA17E]" />
            <span>SEBI Registered Research Analyst · {sebiRegNo}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            Investing Made Clear.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5BA31] via-[#3DA2F1] to-[#3AA17E]">
              Wealth Made Possible.
            </span>
          </h1>

          {/* Mission Statement */}
          <p className="mt-6 text-base sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            At Advisor Alpha, we eliminate the noise, speculation, and unverified tips that plague retail investing. We
            deliver institutional-grade equity research backed by over 30 years of fund management pedigree.
          </p>

          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5BA31]/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#3AA17E] tracking-tight">{metrics.strikeRate}</div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1 font-medium">Historical Win Rate</div>
              <div className="text-[11px] text-neutral-500 mt-1">On closed stock ideas</div>
            </div>

            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5BA31]/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{metrics.activeInvestors}</div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1 font-medium">Active Investors</div>
              <div className="text-[11px] text-neutral-500 mt-1">Across 100+ Indian cities</div>
            </div>

            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5BA31]/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F5BA31] tracking-tight">{metrics.aumGuided}</div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1 font-medium">Assets Guided</div>
              <div className="text-[11px] text-neutral-500 mt-1">Cumulative advisory capital</div>
            </div>

            <div className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 text-center hover:border-[#F5BA31]/50 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF8415] tracking-tight">{metrics.researchExperience}</div>
              <div className="text-xs sm:text-sm text-neutral-400 mt-1 font-medium">Research Pedigree</div>
              <div className="text-[11px] text-neutral-500 mt-1">Combined fund management</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER & CIO PROFILE (PANKAJ MURARKA) */}
      <section id="cio-profile" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)] relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0B1528] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F5BA31]/20 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: CIO Credentials Card */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full p-1 bg-gradient-to-tr from-[#F5BA31] via-[#3AA17E] to-[#FF8415] shadow-xl">
                    <div className="w-full h-full rounded-full bg-[#101D38] flex items-center justify-center overflow-hidden border-2 border-[#0B1528]">
                      {/* High-Contrast Stylized Avatar */}
                      <div className="flex flex-col items-center justify-center text-white">
                        <Users className="w-16 h-16 text-[#F5BA31] mb-1" />
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Chief Investment Officer</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 bg-[#3AA17E] text-black font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    30+ Yrs Equity Experience
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-6">{founder.name}</h3>
                <p className="text-sm text-[#F5BA31] font-semibold mt-1">{founder.role}</p>

                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300">
                  <Award className="w-4 h-4 text-[#FFCA3F]" />
                  <span>Peak AUM: <strong className="text-white">{founder.peakAum}</strong></span>
                </div>

                {/* Prior Institutional Roles Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {founder.priorRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white/5 border border-white/10 text-neutral-300 px-3 py-1 rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Founder Narrative & Thesis */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5BA31]">
                  <Sparkles className="w-4 h-4" />
                  <span>CIO Letter & Philosophy</span>
                </div>

                <blockquote className="text-xl sm:text-2xl font-bold text-white border-l-4 border-[#F5BA31] pl-4 italic leading-relaxed">
                  &ldquo;{BRAND_INFO.founderQuote}&rdquo;
                </blockquote>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {founder.bio}
                </p>

                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  During his 5-year tenure as Head of Equities and CIO of Axis Mutual Fund, Pankaj steered the fund house to become
                  the fastest growing in India, outperforming benchmarks across bull and bear cycles. He built Renaissance Smart
                  Tech to bring that same institutional-grade asset management discipline to retail equity investors across India.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href="https://web.advisoralpha.in/#/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] text-sm font-bold px-6 py-3 rounded-full shadow-lg transition-all active:scale-95"
                  >
                    <span>Access CIO Stock Recommendations</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white px-5 py-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
                  >
                    <span>Read Pankaj’s Market Memos</span>
                    <ChevronRight className="w-4 h-4 text-[#F5BA31]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SQGARP™ METHODOLOGY PILLARS */}
      <section id="sqgarp" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5BA31]/10 border border-[#F5BA31]/30 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-3">
              Proprietary Screening Framework
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The SQGARP™ Investment Philosophy
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              Every equity recommendation and portfolio selection is strictly evaluated against the 6 pillars of{' '}
              <strong className="text-white">Sustainable Quality Growth at Reasonable Price</strong>, honed across three decades
              of institutional fund management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sqgarpPillars.map((pillar) => (
              <div
                key={pillar.letter}
                className="bg-[#0B1528] border border-white/10 hover:border-[#F5BA31]/50 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F5BA31]/15 border border-[#F5BA31]/30 flex items-center justify-center text-[#F5BA31] font-black text-2xl group-hover:bg-[#F5BA31] group-hover:text-white transition-colors">
                    {pillar.letter}
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                    Pillar {pillar.letter}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#F5BA31] transition-colors">
                  {pillar.pillar}
                </h3>

                <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 CORE COMPANY VALUES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3AA17E]/10 border border-[#3AA17E]/30 text-[#3AA17E] text-xs font-bold tracking-wider uppercase mb-3">
              Guiding Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What We Stand For
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
              The foundational values that govern every research note, risk limit, and client interaction at Advisor Alpha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={val.num}
                  className="bg-[#0B1528] border border-white/10 rounded-2xl p-7 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#3AA17E] font-bold">{val.num}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                      {val.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#F5BA31] mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8415]/10 border border-[#FF8415]/30 text-[#FF8415] text-xs font-bold tracking-wider uppercase mb-3">
              Our Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How We Got Here
            </h2>
            <p className="mt-3 text-sm text-neutral-400">
              A track record of disciplined scaling, investor trust, and technology innovation.
            </p>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 space-y-12">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#081026] border-2 border-[#F5BA31] group-hover:bg-[#F5BA31] transition-colors" />

                <div className="bg-[#0B1528] border border-white/10 hover:border-[#F5BA31]/40 rounded-2xl p-6 sm:p-7 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F5BA31]">{m.phase}</div>
                    <span className="text-[11px] font-semibold text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {m.period}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5BA31]/10 border border-[#F5BA31]/30 text-[#F5BA31] text-xs font-bold tracking-wider uppercase mb-3">
              Governance & Research
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leadership & Officers
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400">
              Operating under strict SEBI Research Analyst (INH000021818) and BSE/AMFI governance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0B1528] border border-white/10 rounded-2xl p-6 flex items-start gap-4 hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F5BA31]/20 to-[#3AA17E]/20 text-white flex items-center justify-center shrink-0 border border-white/10 font-bold text-lg">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white truncate">{member.name}</h3>
                  <div className="text-xs text-[#F5BA31] font-medium mt-0.5">{member.role}</div>
                  <div className="text-[11px] text-neutral-400 mt-2 truncate font-mono">
                    {member.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATORY STATUS & STATUTORY BADGE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-[#0B1528] border border-[#3AA17E]/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#3AA17E]/20 text-[#3AA17E] flex items-center justify-center border border-[#3AA17E]/40 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SEBI Registered Intermediary</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {BRAND_INFO.legalEntity} · CIN: {cin}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/10 text-white font-mono text-xs px-3 py-1 rounded-full border border-white/10">
                SEBI RA: {sebiRegNo}
              </span>
              <span className="bg-white/10 text-white font-mono text-xs px-3 py-1 rounded-full border border-white/10">
                BSE Enlistment: {bseEnlistmentNo}
              </span>
              <span className="bg-white/10 text-white font-mono text-xs px-3 py-1 rounded-full border border-white/10">
                AMFI ARN: {amfiArn}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs text-neutral-400 leading-relaxed">
            <div>
              <strong className="text-white block mb-1">Registered Corporate Office:</strong>
              {contact.registeredAddress}
            </div>
            <div>
              <strong className="text-white block mb-1">Regulatory Recourse & Dispute Resolution:</strong>
              Grievances may be addressed directly to our compliance officer or escalated to the{' '}
              <a
                href="https://scores.sebi.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5BA31] underline hover:text-white"
              >
                SEBI SCORES Portal
              </a>{' '}
              or{' '}
              <a
                href="https://smartodr.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5BA31] underline hover:text-white"
              >
                Smart ODR
              </a>
              . View our{' '}
              <Link
                href="/legal/grievance-redressal-escalation-matrix"
                className="text-[#3AA17E] underline hover:text-white"
              >
                5-Tier Grievance Escalation Matrix
              </Link>
              .
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0B1528] via-[#101D38] to-[#0B1528] border border-[#F5BA31]/30 rounded-3xl p-8 sm:p-14 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Upgrade to Institutional-Grade Advisory?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto">
            Join 1,00,000+ smart investors who rely on Pankaj Murarka’s research recommendations to build durable wealth.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://web.advisoralpha.in/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] text-white text-sm font-bold px-8 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-white px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-colors"
            >
              <span>Book Free Portfolio Review</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
