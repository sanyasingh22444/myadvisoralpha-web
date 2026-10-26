'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  Phone, 
  Mail, 
  ArrowUpRight,
  X,
  FileText,
  Building2,
  ExternalLink
} from 'lucide-react';
import LeadCaptureModal from '@/components/modals/LeadCaptureModal';

interface Faq {
  id: string;
  category: 'offerings' | 'compliance' | 'pricing' | 'methodology';
  categoryLabel: string;
  question: string;
  answer: string;
}

const EXTENDED_FAQS: Faq[] = [
  {
    id: 'faq-1',
    category: 'offerings',
    categoryLabel: 'Advisory Offerings',
    question: 'What products does MyAdvisorAlpha offer?',
    answer:
      'MyAdvisorAlpha offers three core regulated products: (1) Single Stock Picks — high-conviction, research-backed ideas from a research team with 75+ years of combined market experience, featuring explicit entry range, strict stop-loss, and multi-tier profit targets (T1, T2, T3) with derivatives & MTF support. (2) Equity Model Portfolios — curated baskets of 5–30 stocks across conservative, balanced, all-weather, and aggressive risk profiles with ongoing monitoring and 1-tap rebalancing. (3) Curated Mutual Funds — a handpicked fund collection with goal-based investment baskets (first salary to retirement) distributed directly to the AMC via ONDC. Fixed Income, Bonds & FDs are coming soon.',
  },
  {
    id: 'faq-2',
    category: 'offerings',
    categoryLabel: 'Advisory Offerings',
    question: 'How often are ideas and portfolios updated?',
    answer:
      'Stock ideas are issued regularly with full research rationale whenever market opportunities meet our strict SQGARP™ quality filters. Model Portfolios are reviewed continuously, and subscribers receive instant rebalancing alerts whenever constituent adjustments are warranted. Mutual fund selections are monitored on an ongoing basis with quarterly reviews and real-time updates as macro and market conditions evolve.',
  },
  {
    id: 'faq-3',
    category: 'compliance',
    categoryLabel: 'SEBI & Compliance',
    question: 'Is MyAdvisorAlpha SEBI and AMFI registered?',
    answer:
      'Yes. MyAdvisorAlpha operates as a dedicated division of Renaissance Smart Tech Private Limited (CIN: U67200MH2020PTC338091). We are a SEBI-registered Research Analyst under Registration No. INH000021818 (perpetual validity granted July 14, 2025), an enlisted Research Analyst with the Bombay Stock Exchange (BSE Enlistment No. 6793), and an AMFI-registered Mutual Fund Distributor (ARN-350887). All research reports, conflict disclosures, and distribution services adhere strictly to SEBI (Research Analysts) Regulations, 2014.',
  },
  {
    id: 'faq-4',
    category: 'methodology',
    categoryLabel: 'Research Methodology',
    question: 'What is SQGARP™ and does it apply to mutual funds?',
    answer:
      'Our SQGARP™ framework (Sustainable Quality Growth at Reasonable Price) is a proven, institutional research lens developed over 30+ years of Indian equity fund management by Founder & CIO Pankaj Murarka (Ex-Head of Equities / CIO Axis AMC). Applied exclusively to our stock picks and equity portfolios, it screens businesses with durable economic moats, high Return on Equity (ROE > 18%), clean corporate governance, and disciplined valuations with margin of safety. Mutual funds are evaluated on rolling-return consistency across full market cycles, downside capture ratios, expense ratios, and fund manager pedigree.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    categoryLabel: 'Pricing & Execution',
    question: 'Is there a free plan available?',
    answer:
      'Yes. Our Stock Picks Lite plan is free — providing you with 1 high-conviction research idea per month with regular updates. You can also download the mobile app or visit the web portal to review our full historical track record (including closed trade gains and audit disclosures) before deciding to subscribe to any paid plan.',
  },
  {
    id: 'faq-6',
    category: 'pricing',
    categoryLabel: 'Pricing & Execution',
    question: 'Can I upgrade or downgrade my plan mid-term?',
    answer:
      'Yes, you can upgrade, downgrade, or cancel your subscription anytime directly from your account settings in the web portal (web.advisoralpha.in) or mobile app. If you cancel, your plan will simply transition to the free tier at the end of the current billing cycle. You will never be locked out of your archived reports or closed trade records.',
  },
  {
    id: 'faq-7',
    category: 'pricing',
    categoryLabel: 'Pricing & Execution',
    question: 'Can I execute recommendations using my existing stockbroker?',
    answer:
      'Yes. MyAdvisorAlpha is an independent research advisory. We NEVER hold custody of your capital or shares. You retain 100% control of your funds in your existing Demat and trading accounts with any leading SEBI-registered broker in India — including Zerodha, Groww, Angel One, ICICI Direct, HDFC Sky, Upstox, Kotak Securities, and 5paisa. With 1-tap broker integration, executing batch orders takes under 30 seconds.',
  },
  {
    id: 'faq-8',
    category: 'pricing',
    categoryLabel: 'Pricing & Execution',
    question: 'What is the minimum capital required to get started?',
    answer:
      'For Single Stock Advisory, you can begin with as little as ₹10,000–₹25,000. For Equity Model Portfolios, the Beginner Basket starts with ₹50,000, while the Balanced and Flexicap Portfolios recommend ₹1,00,000 to ₹2,50,000 for proper risk diversification across 20–25 holdings. For Mutual Funds, monthly SIPs start from just ₹2,000/month.',
  },
  {
    id: 'faq-9',
    category: 'offerings',
    categoryLabel: 'Advisory Offerings',
    question: 'How are stock ideas and alerts delivered to subscribers?',
    answer:
      'Every research call is published instantly to the web portal (web.advisoralpha.in) and mobile app (iOS & Android) with real-time push notifications and WhatsApp alerts. Each alert includes the company overview, investment thesis, SQGARP™ rating, exact buying range, Target 1, Target 2, Target 3, and strict trailing stop-loss guidelines.',
  },
  {
    id: 'faq-10',
    category: 'compliance',
    categoryLabel: 'SEBI & Compliance',
    question: 'Are there any profit-sharing fees or hidden commissions on stocks?',
    answer:
      'Zero. We operate on a transparent, flat fee-only subscription model. We do not charge profit-sharing percentages, nor do we accept commissions or kickbacks from stockbrokers. This completely eliminates conflicts of interest and ensures our recommendations are 100% aligned with your wealth growth.',
  },
  {
    id: 'faq-11',
    category: 'compliance',
    categoryLabel: 'SEBI & Compliance',
    question: 'How do I reach client support or escalate a grievance?',
    answer:
      'You can reach our client advisory desk at support@myadvisoralpha.com or by calling +91 8655387833 (Mon–Fri, 9 AM – 6 PM IST). For formal grievances, we operate under a SEBI-mandated 5-tier escalation matrix led by Compliance Officer Ms. Nidhi Kamani and Principal Officer Mr. Nipun Jalan. If unresolved within 21 days, investors have direct recourse to the SEBI SCORES portal (scores.sebi.gov.in) and Smart ODR.',
  },
  {
    id: 'faq-12',
    category: 'methodology',
    categoryLabel: 'Research Methodology',
    question: 'What is your historical strike rate and risk management policy?',
    answer:
      'MyAdvisorAlpha maintains a verified 75% historical win rate on closed single stock ideas. Every idea is published with a pre-defined risk-reward ratio (typically 1:2.5 or better) and strict stop-loss orders. If an adverse macroeconomic or corporate event breaks our thesis, an immediate exit alert is broadcast to safeguard subscriber capital.',
  },
];

export default function FaqsClient() {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2', 'faq-3']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleItem = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { key: 'all', label: 'All Questions', count: EXTENDED_FAQS.length },
    { key: 'offerings', label: 'Advisory Offerings', count: EXTENDED_FAQS.filter(f => f.category === 'offerings').length },
    { key: 'compliance', label: 'SEBI & Compliance', count: EXTENDED_FAQS.filter(f => f.category === 'compliance').length },
    { key: 'pricing', label: 'Pricing & Execution', count: EXTENDED_FAQS.filter(f => f.category === 'pricing').length },
    { key: 'methodology', label: 'SQGARP™ Methodology', count: EXTENDED_FAQS.filter(f => f.category === 'methodology').length },
  ];

  const filteredFaqs = useMemo(() => {
    return EXTENDED_FAQS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex-1 bg-[#081026] text-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-white/10 overflow-hidden">
        {/* Ambient Glows */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#F5BA31]">Frequently Asked Questions</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F5BA31]" />
            <span className="text-xs font-bold tracking-wider uppercase text-[#F5BA31]">
              SEBI REGISTERED RESEARCH ANALYST · INH000021818
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Frequently Asked <span className="text-[#F5BA31]">Questions.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our institutional research pedigree, 
            zero-custody broker execution, SQGARP™ framework, and regulatory protections.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., SEBI, Demat, SQGARP, free plan)..."
              className="w-full pl-11 pr-10 py-3.5 bg-[#0B1528] border border-white/20 focus:border-[#F5BA31] rounded-2xl text-sm text-white placeholder-white/40 outline-none transition-colors shadow-xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-6">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#F5BA31] text-[#081026] shadow-md scale-105'
                    : 'bg-[#0B1528] text-white/70 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {cat.label}
                <span className="ml-1 text-[11px] opacity-75">
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Accordion Body */}
      <section className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#0B1528] border border-white/10">
              <HelpCircle className="w-10 h-10 text-white/30 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No matching questions found</h3>
              <p className="text-xs text-white/60 mt-1">
                We couldn&apos;t find any results for &ldquo;{searchQuery}&rdquo;. Try another search term or browse by category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5BA31] text-[#081026] text-xs font-bold shadow-md hover:bg-[#e5ab28] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#F5BA31]/40 bg-[#0D1A33] shadow-[0px_8px_30px_rgba(0,0,0,0.5)]'
                      : 'border-white/10 bg-[#0B1528] hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                  >
                    <div className="flex-1 pr-2">
                      <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#F5BA31] transition-colors leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2.5 py-1 rounded">
                        {faq.categoryLabel}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isOpen
                            ? 'bg-[#F5BA31] text-[#081026] rotate-180'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact & Support Help Box */}
        <div className="mt-14 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0B1528] to-[#101D36] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#F5BA31] flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-4 h-4 text-[#F5BA31]" />
              Need Institutional Assistance?
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Still have questions about our advisory or onboarding?
            </h3>
            <p className="text-xs text-white/65 mt-1 max-w-md leading-relaxed">
              Our research team and client grievance desk are available Mon–Fri, 9:00 AM – 6:00 PM IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="tel:+918655387833"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-xs font-semibold text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 8655387833</span>
            </a>

            <a
              href="mailto:support@myadvisoralpha.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-xs font-semibold text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#F5BA31]" />
              <span>Email Desk</span>
            </a>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-xs font-bold text-[#081026] shadow-md transition-all active:scale-95"
            >
              <span>Request Callback</span>
            </button>
          </div>
        </div>

        {/* Regulatory Disclosures & Escalation Strip */}
        <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-xs text-white/50 space-y-2">
          <p>
            Renaissance Smart Tech Private Limited · SEBI Reg: <span className="text-white/80 font-mono">INH000021818</span> · BSE Enlistment: <span className="text-white/80 font-mono">6793</span> · AMFI ARN: <span className="text-white/80 font-mono">ARN-350887</span>
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-white/60">
            <Link href="/legal/grievance-redressal-escalation-matrix" className="hover:text-[#F5BA31] underline">
              Grievance Escalation Matrix
            </Link>
            <span>·</span>
            <Link href="/legal/terms-and-conditions" className="hover:text-[#F5BA31] underline">
              Terms &amp; Conditions
            </Link>
            <span>·</span>
            <Link href="/legal/customer-complaints-and-disclosures" className="hover:text-[#F5BA31] underline">
              Customer Complaints &amp; Disclosures
            </Link>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
