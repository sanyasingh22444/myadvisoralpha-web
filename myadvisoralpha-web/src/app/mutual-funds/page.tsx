'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Layers,
  LineChart,
  Percent,
  Scale,
  ShieldCheck,
  Target,
  UserCheck,
  Wallet,
} from 'lucide-react';
import { SipChart } from '@/components/sections/HeroPlacard';
import LeadCaptureModal, { INVESTMENT_GOAL_OPTIONS, PHONE_REGEX } from '@/components/modals/LeadCaptureModal';
import { REGULATORY_INFO } from '@/data/legal';

const MF_APP_URL = 'https://link.advisoralpha.in/nav?page=mutual_funds';
const MF_GOAL = INVESTMENT_GOAL_OPTIONS.find((opt) => opt.value.startsWith('Curated Mutual Funds'))?.value;

const HERO_ASSETS = ['Equity', 'Debt', 'Gold'];

const HERO_POINTS = [
  'Handpicked mutual fund collection',
  'Goal-based investment baskets',
  'Personalised mutual fund recommendations',
  'Start SIP with ₹500',
];

const FEATURES = [
  {
    icon: Layers,
    title: 'Handpicked fund collection',
    brief: 'From 1,000+ schemes to a short list worth owning.',
    points: [
      'Shortlisted by a research team with 75+ years of combined experience',
      'Equity, debt, hybrid and gold funds in one place',
      'Ready lists: Consistent Performers, Better than FD, Star Managers',
    ],
  },
  {
    icon: Target,
    title: 'Goal-based & personalised baskets',
    brief: 'Invest for a goal, not in a random fund.',
    points: [
      'Ready baskets: First Salary, All-Weather, Retire Rich',
      'Each basket matched to a timeline and risk level',
      'Personalised basket built around your own goal and risk profile',
    ],
  },
  {
    icon: BellRing,
    title: 'Ongoing portfolio health monitoring',
    brief: 'We keep watching after you invest.',
    points: [
      'Every fund and its fund manager tracked continuously',
      'Alerts when a fund in your basket falls behind or needs a switch',
      'All your SIPs tracked in one app, powered by ONDC',
    ],
  },
];

const BASKETS = [
  {
    id: 'first-salary',
    name: 'First Salary',
    risk: 'Conservative',
    funds: '4 funds',
    body: 'For young earners building a SIP habit, with large-cap and balanced advantage funds.',
    url: 'https://link.advisoralpha.in/pBt43plM92b',
  },
  {
    id: 'all-weather',
    name: 'All-Weather',
    risk: 'Balanced',
    funds: '6 funds',
    body: 'A mix of equity, debt, gold and international funds to ride out market corrections.',
    url: 'https://link.advisoralpha.in/mietzMIR92b',
  },
  {
    id: 'retire-rich',
    name: 'Retire Rich',
    risk: 'Aggressive',
    funds: '7 funds',
    body: 'Flexicap and midcap funds for building a retirement corpus over the long term.',
    url: 'https://link.advisoralpha.in/MD16l0NR92b',
  },
];

const THEMATIC_LISTS = ['Consistent Performers', 'Better than FD', 'Star Managers'];

const SELECTION_CHECKS = [
  {
    icon: LineChart,
    title: 'Consistency',
    metric: '3Y & 5Y rolling returns',
    body: 'Compared with its benchmark and category average over many periods, so one lucky year doesn’t count.',
  },
  {
    icon: UserCheck,
    title: 'Fund manager',
    metric: 'Tenure & track record',
    body: 'How long the manager has run this fund, and how their funds held up through past market falls.',
  },
  {
    icon: BadgeCheck,
    title: 'Portfolio quality',
    metric: 'Holdings & concentration',
    body: 'What the fund actually owns, how much sits in its top 10 stocks, and whether it sticks to its stated style.',
  },
  {
    icon: Percent,
    title: 'Cost',
    metric: 'Expense ratio & exit load',
    body: 'Checked against similar funds. A 1% yearly cost gap can add up to lakhs over a 20-year SIP.',
  },
  {
    icon: Scale,
    title: 'Risk fit',
    metric: 'Falls & volatility',
    body: 'How far the fund fell in bad markets and how bumpy the ride was, matched to the basket’s goal.',
  },
];

const STEPS = [
  { title: 'Tell us your goal', body: 'First salary, a house, retirement. Pick what you are saving for and your risk level.' },
  { title: 'Pick a basket', body: 'Choose a ready-made basket or ask us for one matched to you. Finish KYC with Aadhaar & PAN.' },
  { title: 'Start your SIP', body: 'Set up UPI Autopay or net banking. Invest monthly and track every fund in the app.' },
];

const FAQS = [
  {
    q: 'Does it cost anything to invest through MyAdvisorAlpha?',
    a: 'No. Browsing our baskets and getting fund recommendations is free. You pay only the fund’s own charges (its expense ratio), which are shown before you invest.',
  },
  {
    q: 'What is the minimum SIP amount?',
    a: 'You can start a SIP from ₹500 a month. Some funds in a basket may have a higher minimum, which the app shows before you invest.',
  },
  {
    q: 'What is ONDC and is my money safe?',
    a: 'ONDC (Open Network for Digital Commerce) is a government-backed network. Through it, your money goes from your bank account straight to the AMC, and units are held in your name. We never hold your money.',
  },
  {
    q: 'Can I stop or change my SIP?',
    a: 'Yes. You can pause, stop or change a SIP at any time in the app. ELSS (tax-saving) funds have a 3-year lock-in on each instalment.',
  },
  {
    q: 'Are you registered?',
    a: 'Yes. We are an AMFI-registered Mutual Fund Distributor (ARN-350887) and a SEBI-registered Research Analyst (INH000021818), operating as Renaissance Smart Tech Private Limited.',
  },
];

function formatRupees(value: number) {
  return '₹' + Math.round(value).toLocaleString('en-IN');
}

// Phone number box shared by the hero and the closing band
function PhoneCapture({ label, onSubmit }: { label: React.ReactNode; onSubmit: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms & Privacy Policy to continue');
      return;
    }
    setError('');
    onSubmit(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <p className="text-sm font-semibold text-white/90 mb-2.5">{label}</p>
      <div className="flex items-center bg-[#0B1528] border border-white/25 focus-within:border-[#F5BA31] rounded-xl p-1.5 transition-all shadow-xl">
        <span className="px-3 py-2 text-sm font-bold text-white/90 border-r border-white/15 select-none">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
            if (error) setError('');
          }}
          placeholder="Enter mobile number"
          maxLength={10}
          aria-label="10-digit mobile number"
          className="bg-transparent text-white placeholder-white/40 text-sm flex-1 min-w-0 px-3 py-2 outline-none font-medium"
        />
        <button
          type="submit"
          aria-label="Submit mobile number"
          className="shrink-0 w-11 h-11 rounded-lg bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] flex items-center justify-center transition-all shadow-md"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-rose-400 font-medium pl-1">{error}</p>}
      <label className="mt-3 flex items-start gap-2.5 text-xs text-white/60 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-white/30 bg-[#0B1528] text-[#F5BA31] focus:ring-[#F5BA31] focus:ring-offset-0 cursor-pointer"
        />
        <span className="leading-tight">
          I agree to the{' '}
          <Link href="/legal/terms-and-conditions" className="text-white underline hover:text-[#F5BA31]">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy-policy" className="text-white underline hover:text-[#F5BA31]">
            Privacy Policy
          </Link>
        </span>
      </label>
    </form>
  );
}

function SectionHeading({ eyebrow, title, subtitle, dark }: { eyebrow: string; title: React.ReactNode; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-[#F5BA31]' : 'text-[#C99512]'}`}>{eyebrow}</span>
      <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${dark ? 'text-white' : 'text-[#081026]'}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-base ${dark ? 'text-white/60' : 'text-neutral-600'}`}>{subtitle}</p>}
    </div>
  );
}

export default function MutualFundsPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [prefillPhone, setPrefillPhone] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [assetIndex, setAssetIndex] = useState(0);

  // Rotating asset word in the headline
  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => setAssetIndex((prev) => (prev + 1) % HERO_ASSETS.length), 2200);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  // SIP calculator
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const months = years * 12;
  const monthlyRate = rate / 12 / 100;
  const totalValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const invested = monthly * months;

  const openLeadModal = (phone?: string) => {
    setPrefillPhone(phone);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#081026]">
      {/* 1. Hero with phone number box */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081026] via-[#0B1A3A] to-[#0E2350] text-white pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div aria-hidden="true" className="absolute -top-20 right-0 w-[520px] h-[520px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white/60">Mutual Funds</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              <span className="sr-only">Invest in equity, debt and gold with mutual funds</span>
              <span aria-hidden="true">
                <span className="block">
                  Invest in{' '}
                  {/* Top-aligned box exactly one line tall, so the word sits on the sentence's baseline */}
                  <span className="relative inline-block align-top overflow-hidden text-[#F5BA31] h-[1.1em]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={HERO_ASSETS[assetIndex]}
                        initial={{ y: 32, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -32, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26, opacity: { duration: 0.2 } }}
                        className="block"
                      >
                        {HERO_ASSETS[assetIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
                <span className="block mt-1">with mutual funds</span>
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

            <div className="mt-8">
              <PhoneCapture label="Start investing in mutual funds" onSubmit={openLeadModal} />
            </div>

            {/* Trust row */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { value: 'AMFI', label: 'Registered MFD · ARN-350887' },
                { value: 'ONDC', label: 'Powered by ONDC' },
                { value: '₹500', label: 'Start a SIP from' },
              ].map((item, i) => (
                <div key={item.value} className={i > 0 ? 'pl-4 border-l border-[#F5BA31]/40' : ''}>
                  <div className="text-xl sm:text-2xl font-extrabold">{item.value}</div>
                  <div className="text-[11px] sm:text-xs text-white/60 mt-0.5 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] rounded-[28px] bg-[#0B1528] border border-white/10 p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#F5BA31]">Start SIP</div>
                  <div className="text-lg font-bold text-white mt-0.5">Small amounts can create big wealth</div>
                </div>
                <span className="text-[10px] font-semibold text-white/50 border border-white/15 rounded-full px-2 py-0.5">Illustrative</span>
              </div>
              <SipChart still={reduceMotion} />
              <ul className="mt-6 grid grid-cols-3 gap-3 text-center">
                {['From ₹500', 'UPI Autopay', 'Units in your name'].map((point) => (
                  <li key={point} className="text-[11px] sm:text-xs font-semibold text-white/80 bg-white/5 border border-white/10 rounded-lg py-2 px-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Everything you need */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Invest smarter"
            title="Everything you need in mutual funds"
            subtitle="Skip hours of research. Invest in baskets our research team has already built."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, brief, points }) => (
              <div key={title} className="rounded-2xl border border-neutral-200 p-6 lg:p-8 hover:border-[#164198]/30 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#164198]/10 text-[#164198] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-[#081026]">{title}</h3>
                <p className="mt-1.5 text-base font-semibold text-[#C99512]">{brief}</p>
                <ul className="mt-4 space-y-2.5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-neutral-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#164198] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Baskets */}
      <section id="baskets" className="bg-[#081026] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            dark
            eyebrow="Pick your basket"
            title={<>Ready-to-invest <span className="text-[#F5BA31]">fund baskets</span></>}
            subtitle="Each basket is built for a goal and a risk level, so you know why every fund is in it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BASKETS.map((basket) => (
              <div key={basket.id} className="flex flex-col rounded-2xl bg-[#0B1528] border border-white/10 p-6 hover:border-[#F5BA31]/50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5BA31] bg-[#F5BA31]/10 border border-[#F5BA31]/30 rounded-full px-2.5 py-0.5">
                    {basket.risk}
                  </span>
                  <span className="text-xs text-white/50 font-medium">{basket.funds}</span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-white">{basket.name}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed flex-1">{basket.body}</p>
                <a
                  href={basket.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#F5BA31] hover:text-white transition-colors"
                >
                  View basket <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}

            {/* Personalised basket */}
            <div className="flex flex-col rounded-2xl bg-[#F5BA31] text-[#081026] p-6">
              <span className="self-start text-[11px] font-bold uppercase tracking-wider bg-[#081026]/10 rounded-full px-2.5 py-0.5">
                Made for you
              </span>
              <h3 className="mt-4 text-xl font-extrabold">Personalised basket</h3>
              <p className="mt-2 text-sm text-[#081026]/80 leading-relaxed flex-1">
                Tell us your goal, timeline and risk comfort. We will suggest a basket matched to you.
              </p>
              <button
                type="button"
                onClick={() => openLeadModal()}
                className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-bold bg-[#081026] text-white rounded-lg px-4 py-2.5 hover:bg-[#164198] transition-colors"
              >
                Talk to expert <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-white/60 mr-1">Also in the app:</span>
            {THEMATIC_LISTS.map((list) => (
              <span key={list} className="text-white/85 font-semibold bg-white/5 border border-white/10 rounded-full px-3 py-1">
                {list}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How we pick funds */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Our fund research"
            title="How we pick every fund"
            subtitle="A fund makes it into a basket only after it clears five checks."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SELECTION_CHECKS.map(({ icon: Icon, title, metric, body }, i) => (
              <div key={title} className="rounded-2xl bg-[#F6F8FC] border border-[#164198]/10 p-5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white text-[#164198] border border-[#164198]/15 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="min-w-9 h-9 px-2 rounded-full bg-[#164198] text-white text-sm font-extrabold flex items-center justify-center">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-extrabold text-[#081026]">{title}</h3>
                <p className="mt-2 inline-block text-xs font-bold text-[#8A6D10] bg-[#F5BA31]/20 border border-[#F5BA31]/40 rounded-md px-2 py-1">
                  {metric}
                </p>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Three steps */}
      <section className="bg-[#081026] py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            dark
            eyebrow="Get started"
            title={<>Start a SIP in <span className="text-[#F5BA31]">3 steps</span></>}
            subtitle="100% digital and paperless. Takes about 2 minutes."
          />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl bg-[#0B1528] border border-white/10 p-6 lg:p-8">
                <span className="w-10 h-10 rounded-full bg-[#F5BA31] text-[#081026] font-black flex items-center justify-center">{i + 1}</span>
                <h3 className="mt-5 text-lg font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <a
              href={MF_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] font-bold px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all"
            >
              Start investing <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. SIP calculator */}
      <section id="sip-calculator" className="bg-[#081026] border-t border-white/10 py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            dark
            eyebrow="Calculator"
            title="See what a monthly SIP can grow to"
            subtitle="Move the sliders to estimate the value of your SIP."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-[28px] bg-[#0B1528] border border-white/10 p-6 sm:p-8 lg:p-10">
            <div className="space-y-7">
              {[
                { label: 'Monthly investment', value: monthly, display: formatRupees(monthly), min: 500, max: 100000, step: 500, set: setMonthly },
                { label: 'Expected return (p.a.)', value: rate, display: `${rate}%`, min: 6, max: 18, step: 0.5, set: setRate },
                { label: 'Time period', value: years, display: `${years} yrs`, min: 1, max: 30, step: 1, set: setYears },
              ].map((slider) => (
                <label key={slider.label} className="block">
                  <span className="flex items-center justify-between text-sm">
                    <span className="text-white/70 font-medium">{slider.label}</span>
                    <span className="text-white font-bold bg-white/5 border border-white/10 rounded-lg px-3 py-1">{slider.display}</span>
                  </span>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.value}
                    onChange={(e) => slider.set(Number(e.target.value))}
                    className="mt-3 w-full accent-[#F5BA31] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div className="rounded-2xl bg-[#081026] border border-white/10 p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Invested amount</span>
                  <span className="text-white font-bold">{formatRupees(invested)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Estimated returns</span>
                  <span className="text-[#F5BA31] font-bold">{formatRupees(totalValue - invested)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/80 font-semibold">Total value</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">{formatRupees(totalValue)}</span>
                </div>
              </div>
              <p className="mt-5 text-[11px] text-white/45 leading-relaxed">
                Illustration only, assuming a constant {rate}% yearly return. Mutual fund returns are not guaranteed and change with the market.
              </p>
              <button
                type="button"
                onClick={() => openLeadModal()}
                className="mt-6 inline-flex items-center justify-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold px-5 py-3 rounded-xl active:scale-95 transition-all"
              >
                <Wallet className="w-4 h-4" /> Start a SIP like this
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Got questions?" title="Mutual fund FAQs" />
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
      <section className="bg-gradient-to-br from-[#0E2350] to-[#081026] py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Not sure which basket fits you?
            </h2>
            <p className="mt-3 text-base text-white/65 max-w-lg">
              Share your number and our team will call you to help pick a basket for your goal. Free, with no obligation to invest.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
              <ShieldCheck className="w-4 h-4 text-[#F5BA31]" />
              AMFI Registered MFD ARN-350887 · SEBI RA INH000021818
            </div>
          </div>
          <div className="lg:justify-self-end w-full max-w-md">
            <PhoneCapture label="Get a free basket suggestion" onSubmit={openLeadModal} />
          </div>
        </div>
        <p className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-[11px] text-white/45 leading-relaxed">
          {REGULATORY_INFO.standardDisclaimers.mutualFund}
        </p>
      </section>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setPrefillPhone(undefined);
        }}
        initialPhone={prefillPhone}
        initialInvestmentGoal={MF_GOAL}
      />
    </div>
  );
}
