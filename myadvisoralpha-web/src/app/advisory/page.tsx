'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  Layers,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { StockChart } from '@/components/sections/HeroPlacard';
import LeadCaptureModal from '@/components/modals/LeadCaptureModal';
import StockTrackRecord from '@/components/sections/StockTrackRecord';
import { PhoneCapture, RotatingWord, SectionHeading } from '@/components/sections/ProductPageParts';
import { REGULATORY_INFO } from '@/data/legal';

const STOCKS_PLAN_URL = 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe';
const PORTFOLIO_PLAN_URL = 'https://link.advisoralpha.in/nav?page=payment&plan_id=0b6dbbe5-226a-4222-80fe-08f88532774b&plan_type=portfolio&action=subscribe';

const HERO_PRODUCTS = ['Stocks', 'Portfolios', 'MTF Baskets', 'Futures'];

const HERO_POINTS = ['Entry, target & stop-loss on every idea'];

const STATS = [
  { value: '30+ years', label: 'of research experience' },
];

const PRODUCTS = [
  {
    id: 'single-stocks',
    icon: TrendingUp,
    name: 'Stocks',
    brief: 'High-conviction stock ideas with a clear plan.',
    points: [
      'Entry range, up to 2 targets and a stop-loss on every idea',
      'Short-term (0–3 months), mid-term (3–6 months) and long-term (6+ months) ideas',
      'Full research rationale and SQGARP™ screening behind each pick',
      'Entry, stop-loss and exit alerts on the app, WhatsApp and email',
    ],
    cta: { label: 'Explore Stocks', href: STOCKS_PLAN_URL },
  },
  {
    id: 'portfolios',
    icon: Briefcase,
    name: 'Portfolios',
    brief: 'Ready-made stock portfolios matched to your risk.',
    points: [
      'Large cap, mid cap and small cap portfolios',
      '15 to 30 SQGARP™ screened stocks, with stock-level rationale',
      'Rebalancing alerts with the reason for every change',
      'Shares stay in your own demat account',
    ],
    cta: { label: 'Explore Portfolios', href: PORTFOLIO_PLAN_URL },
  },
  {
    id: 'mtf-basket',
    icon: Layers,
    name: 'MTF Baskets',
    comingSoon: true,
    brief: 'Short-term stock baskets using your broker’s margin.',
    points: [],
  },
  {
    id: 'futures',
    icon: BarChart3,
    name: 'Futures',
    comingSoon: true,
    brief: 'Index and stock futures trades with defined risk.',
    points: [],
  },
];

const SQGARP = [
  { letter: 'S', title: 'Sustainable', body: 'Business model & earnings that compound, not a one-quarter story' },
  { letter: 'Q', title: 'Quality', body: 'High return on capital, low debt, strong management' },
  { letter: 'G', title: 'Growth', body: 'Clear, visible earnings growth ahead' },
  { letter: 'ARP', title: 'At Reasonable Price', body: 'Enter only when valuation offers a margin of safety' },
];

const STEPS = [
  { icon: Briefcase, title: 'Choose a product', body: 'Pick Stocks or a Portfolio, whichever fits your goal and risk.' },
  { icon: Wallet, title: 'Make the payment', body: 'Pay securely by UPI, card or net banking. Access starts as soon as it’s confirmed.' },
  { icon: FileCheck2, title: 'KYC & eSign', body: 'Quick 1-step digital KYC, then eSign the agreement.' },
  { icon: Bell, title: 'Get your first idea', body: 'Receive your first idea with full rationale. Act on it in your own broker account.' },
];

const FAQS = [
  {
    q: 'How are ideas delivered?',
    a: 'Ideas are published on the web app (web.advisoralpha.in) and mobile apps, with instant push and WhatsApp alerts. Each one has an entry range, up to 2 targets, a stop-loss and the full research rationale.',
  },
  {
    q: 'Can I use my existing broker?',
    a: 'Yes. We never hold your money or shares. You place trades in your own demat account with any broker, including Zerodha, Groww, Angel One, ICICI Direct, HDFC Sky, Upstox and Kotak Securities.',
  },
  {
    q: 'How much capital do I need to start?',
    a: 'Stocks can start with ₹10,000–₹25,000. Portfolios start from ₹50,000, depending on the portfolio.',
  },
  {
    q: 'Do you charge profit sharing or commissions?',
    a: 'No. We charge a flat subscription fee only. No profit sharing, and no commissions from brokers on your trades.',
  },
  {
    q: 'What is SQGARP™?',
    a: 'Sustainable Quality Growth at Reasonable Price. It is the research framework Pankaj Murarka built over 30+ years of institutional fund management, and it is applied to every stock idea and portfolio.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes. You can manage or cancel auto-renewal anytime from the web app or mobile app settings, in line with SEBI guidelines and our Most Important Terms & Conditions.',
  },
];

export default function AdvisoryPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [prefillPhone, setPrefillPhone] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openLeadModal = (phone?: string) => {
    setPrefillPhone(phone);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#081026]">
      {/* 1. Hero with phone number box */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081026] via-[#0B1A3A] to-[#0E2350] text-white pt-8 sm:pt-10 lg:pt-6 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div aria-hidden="true" className="absolute -top-20 right-0 w-[520px] h-[520px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 items-center">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white/60">Advisory</span>
            <h1 className="mt-3 text-[2rem] sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1]">
              <span className="sr-only">SEBI-registered research across stocks, portfolios, MTF baskets and futures</span>
              <span aria-hidden="true">
                <span className="block">SEBI-registered research across</span>
                <span className="block mt-1">
                  <RotatingWord words={HERO_PRODUCTS} />
                </span>
              </span>
            </h1>

            {/* Dividers trail each item so a wrapped line never starts with one */}
            <ul className="mt-5 max-w-xl flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-base text-white/75 leading-relaxed">
              {HERO_POINTS.map((point, i) => (
                <li key={point} className="flex items-center gap-3 whitespace-nowrap">
                  <span>{point}</span>
                  {i < HERO_POINTS.length - 1 && <span aria-hidden="true" className="h-4 w-px bg-[#F5BA31]/50" />}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <PhoneCapture label={<>Get <span className="text-[#F5BA31]">2 free</span> trade ideas</>} onSubmit={openLeadModal} />
            </div>

            {/* Trust row */}
            <div className="mt-5 w-fit max-w-full rounded-2xl border border-[#F5BA31]/70 bg-white/[0.07] px-2.5 min-[400px]:px-3 py-3.5 sm:px-5 md:px-3 lg:px-5 grid grid-cols-[auto_auto_auto] justify-start gap-x-2.5 min-[400px]:gap-x-3 sm:gap-x-6 md:gap-x-3 lg:gap-x-6 shadow-[0_8px_28px_rgba(245,186,49,0.12)]">
              {[
                { value: 'SEBI Registered', label: 'INH000021818' },
                { value: 'BSE', label: 'Enlistment No. 6793' },
                { value: '1 Lakh+', label: 'Users Across India' },
              ].map((item, i) => (
                <div key={item.value} className={i > 0 ? 'pl-2.5 min-[400px]:pl-3 sm:pl-6 md:pl-3 lg:pl-6 border-l border-[#F5BA31]/40' : ''}>
                  <div className="text-[15px] min-[400px]:text-lg sm:text-xl md:text-base lg:text-xl font-extrabold text-[#F5BA31] whitespace-nowrap">{item.value}</div>
                  <div className="text-[11px] sm:text-xs text-white/85 mt-0.5 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] rounded-[28px] bg-[#0B1528] border border-[#F5BA31]/70 p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F5BA31]">Stock idea</div>
                  <div className="text-lg font-bold text-white mt-0.5">What you get before you buy</div>
                </div>
                <span className="text-[10px] font-semibold text-white/50 border border-white/15 rounded-full px-2 py-0.5">Illustrative</span>
              </div>
              <StockChart still={reduceMotion} />
              <ul className="mt-5 grid grid-cols-3 gap-3 text-center">
                {['Up to 2 targets', 'Stop-loss upfront', 'Full rationale'].map((point) => (
                  <li key={point} className="text-[11px] sm:text-xs font-semibold text-white/80 bg-white/5 border border-white/10 rounded-lg py-2 px-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why choose us */}
      <section className="bg-white py-10 lg:py-14 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Why choose us"
            title="Institutional research, made for individual investors"
            subtitle="The same depth that powers India’s largest fund houses, at a fraction of the cost."
          />
          <div className="flex justify-center">
            {STATS.map((stat) => (
              <div key={stat.value} className="w-full max-w-sm rounded-2xl bg-[#FFFBEF] border border-[#F5BA31] shadow-[0_8px_24px_rgba(245,186,49,0.18)] p-5 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#164198]">{stat.value}</div>
                <div className="mt-2 text-xs sm:text-sm text-neutral-600 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Products */}
      <section id="products" className="bg-[#081026] py-12 lg:py-16 px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            dark
            eyebrow="Our advisory"
            title={<>One research team. <span className="text-[#F5BA31]">Every style of investing.</span></>}
            subtitle="Pick the product that matches how you invest. Every idea comes with a clear entry and exit plan."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRODUCTS.map(({ id, icon: Icon, name, brief, points, comingSoon, cta }) => (
              <div key={id} id={id} className="scroll-mt-28 flex flex-col rounded-2xl bg-[#0B1528] border border-[#F5BA31]/70 p-6 lg:p-8 hover:border-[#F5BA31] transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5BA31]/10 text-[#F5BA31] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  {comingSoon && (
                    <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#F5BA31]/15 text-[#F5BA31] border border-[#F5BA31]/40">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-white">{name}</h3>
                <p className="mt-1.5 text-base font-semibold text-[#F5BA31]">{brief}</p>
                {points.length > 0 ? (
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-white/75 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#F5BA31] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1" />
                )}
                <div className="mt-7">
                  {cta ? (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
                    >
                      {cta.label} <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openLeadModal()}
                      className="inline-flex items-center gap-2 border border-white/25 hover:border-[#F5BA31] text-white text-sm font-semibold px-5 py-2.5 rounded-xl active:scale-95 transition-all"
                    >
                      <Bell className="w-4 h-4" /> Notify me at launch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stocks performance track */}
      <StockTrackRecord />

      {/* 4. SQGARP framework */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F6FC] to-white py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        {/* Faint oversized wordmark behind the section */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 top-6 text-[22vw] lg:text-[240px] font-black tracking-tighter leading-none text-[#164198]/[0.03] whitespace-nowrap"
        >
          SQGARP
        </span>

        <div className="relative max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Our investment philosophy"
            title="Every idea starts with SQGARP™"
            subtitle="Sustainable Quality Growth at Reasonable Price. Every stock idea and portfolio passes the same four tests."
          />

          {/* The acronym, spelt out by the four tests */}
          <div className="flex justify-center items-end gap-2 sm:gap-3 mb-12 lg:mb-14" aria-hidden="true">
            {SQGARP.map((item, i) => (
              <React.Fragment key={item.letter}>
                <span className="font-serif text-4xl sm:text-6xl font-normal tracking-[0.12em] text-[#164198]">{item.letter}</span>
                {i < SQGARP.length - 1 && <span className="mb-2.5 sm:mb-4 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C99512]" />}
              </React.Fragment>
            ))}
          </div>

          <div className="relative">
            {/* Gold line joining the four letter tiles on desktop */}
            <div aria-hidden="true" className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#C99512]/40" />

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 pt-8">
              {SQGARP.map((item, i) => (
                <li
                  key={item.letter}
                  className="group relative rounded-2xl bg-white border border-[#93C5FD] shadow-[0_10px_30px_rgba(22,65,152,0.08)] px-6 pt-12 pb-7 text-center hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(22,65,152,0.16)] transition-all duration-300"
                >
                  {/* Thin outlined letter mark on the card's top edge */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border border-[#164198]/30 text-[#164198] font-serif text-xl font-normal tracking-wide flex items-center justify-center ring-4 ring-[#F6F8FC] group-hover:border-[#C99512] transition-colors">
                    {item.letter}
                  </span>
                  <span className="font-serif text-xl tracking-[0.15em] text-[#C99512]">0{i + 1}</span>
                  <h3 className="mt-1.5 text-lg font-extrabold text-[#081026]">{item.title}</h3>
                  <span aria-hidden="true" className="block mx-auto mt-3 w-8 h-0.5 rounded-full bg-[#F5BA31]" />
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#164198] bg-[#164198]/[0.06] border border-[#164198]/15 rounded-full px-4 py-2">
              <ShieldCheck className="w-4 h-4 text-[#C99512]" />
              Applied to every stock idea and portfolio. No exceptions.
            </span>
          </p>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="bg-[#081026] py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            dark
            eyebrow="How it works"
            title={<>From sign-up to your first idea in <span className="text-[#F5BA31]">4 steps</span></>}
            subtitle="Fully digital and paperless."
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rounded-2xl bg-[#0B1528] border border-[#F5BA31]/70 p-6">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-[#F5BA31] text-[#081026] font-black flex items-center justify-center">{i + 1}</span>
                  <Icon className="w-5 h-5 text-white/40" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Research team */}
      <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[320px] sm:h-[420px] rounded-[28px] overflow-hidden bg-[#F6F8FC]">
            <Image
              src="/assets/app/pankaj-murarka.jpg"
              alt="Pankaj Murarka, Founder & CIO of MyAdvisorAlpha"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C99512]">Our research team</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#081026]">Led by Pankaj Murarka</h2>
            <figure className="mt-5 border-l-2 border-[#F5BA31] pl-4">
              <blockquote className="text-lg italic text-[#081026]">&ldquo;I want every Indian to make money in stock market.&rdquo;</blockquote>
              <figcaption className="mt-1 text-xs text-neutral-500">Pankaj Murarka, Founder & CIO, MyAdvisorAlpha</figcaption>
            </figure>
            <ul className="mt-6 space-y-3">
              {[
                'CIO of Axis Mutual Fund (2011–2016), managing $5B as India’s fastest-growing fund house',
                'Senior roles at Rare Enterprises, UTI AMC, Motilal Oswal and Merrill Lynch',
                '30+ years in Indian equities, across every market cycle',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700">
                  <CheckCircle2 className="w-5 h-5 text-[#164198] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#164198] hover:text-[#C99512] transition-colors"
            >
              Read our story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="bg-white border-t border-neutral-200 py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Got questions?" title="Advisory FAQs" />
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#081026]">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#164198] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="pb-5 -mt-1 text-sm sm:text-base text-neutral-600 leading-relaxed">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Closing band with phone number box */}
      <section className="bg-gradient-to-br from-[#0E2350] to-[#081026] py-12 lg:py-14 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Try our research before you subscribe
            </h2>
            <p className="mt-3 text-base text-white/65 max-w-lg">
              Share your number to get 2 free trade ideas, each with an entry, target and stop-loss.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
              <ShieldCheck className="w-4 h-4 text-[#F5BA31]" />
              SEBI RA INH000021818 · BSE Enlistment No. 6793
            </div>
          </div>
          <div className="lg:justify-self-end w-full max-w-md">
            <PhoneCapture label="Get 2 free trade ideas" onSubmit={openLeadModal} />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 space-y-2 text-[11px] text-white/45 leading-relaxed">
          <p>{REGULATORY_INFO.standardDisclaimers.marketRisk}</p>
          <p>{REGULATORY_INFO.standardDisclaimers.sebiNineOutOfTenLossWarning}</p>
        </div>
      </section>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setPrefillPhone(undefined);
        }}
        initialPhone={prefillPhone}
      />
    </div>
  );
}
