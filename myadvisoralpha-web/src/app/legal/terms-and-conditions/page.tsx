import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import { REGULATORY_INFO } from '@/data/legal';
import {
  ShieldCheck,
  Scale,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Lock,
  Building2,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Terms and Conditions & Client Agreement | ${BRAND_INFO.brandDisplayName}`,
  description: `Official Terms and Conditions and SEBI Research Analyst Client Agreement for ${BRAND_INFO.brandDisplayName}, operated by ${BRAND_INFO.legalEntity} (SEBI Reg. ${BRAND_INFO.sebiRegNo}, BSE: ${BRAND_INFO.bseEnlistmentNo}).`,
  keywords: [
    'Terms and Conditions',
    'Client Agreement',
    'SEBI Research Analyst Terms',
    'Advisor Alpha Terms',
    'Renaissance Smart Tech Private Limited',
    'INH000021818',
  ],
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex-1 flex flex-col w-full selection:bg-[#237FFB] selection:text-white">
      {/* HERO / BREADCRUMB HEADER */}
      <section className="relative pt-8 pb-12 border-b border-[#2A2A2A] bg-gradient-to-b from-[#0B0E14] to-[#010101] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-500">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#237FFB] font-medium">Terms and Conditions</span>
          </nav>

          {/* Regulatory Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/10 border border-[#237FFB]/30 text-[#237FFB] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEBI RA: {BRAND_INFO.sebiRegNo}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono">
              BSE: {BRAND_INFO.bseEnlistmentNo}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA17E]/10 border border-[#3AA17E]/30 text-[#3AA17E] text-xs font-semibold">
              AMFI: {BRAND_INFO.amfiArn}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Terms & Conditions & Client Agreement
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mb-4">
            These Terms and Conditions constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Subscriber&rdquo;, or &ldquo;Client&rdquo;) and <strong className="text-white">{BRAND_INFO.legalEntity}</strong>, operating through its registered research analyst brand <strong className="text-white">{BRAND_INFO.brandDisplayName}</strong> (&ldquo;Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or &ldquo;Our&rdquo;).
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-white/10 font-mono">
            <span>Date of Grant: July 14, 2025 (Perpetual)</span>
            <span>•</span>
            <span>CIN: {BRAND_INFO.cin}</span>
            <span>•</span>
            <span>Last Updated: October 2026</span>
          </div>
        </div>
      </section>

      {/* STATUTORY MANDATORY RISK HIGHLIGHT */}
      <section className="bg-[#0B0E14] border-b border-[#2A2A2A] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#F59E0B]/30 bg-[#F59E0B]/5 rounded-2xl p-5 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
              <div className="font-bold text-[#F59E0B] uppercase tracking-wider text-xs">
                Mandatory Statutory Notice under SEBI (Research Analysts) Regulations, 2014
              </div>
              <p className="leading-relaxed italic">
                &ldquo;{REGULATORY_INFO.standardDisclaimers.marketRisk}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* TABLE OF CONTENTS - STICKY SIDEBAR */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 bg-[#0B0E14] border border-white/10 rounded-2xl p-4 shadow-lg text-xs space-y-2">
                <div className="font-bold text-white text-xs uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#237FFB]" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1 text-neutral-400 font-medium">
                  <a href="#section-1" className="block py-1 hover:text-[#237FFB] transition-colors truncate">1. Regulatory Status</a>
                  <a href="#section-2" className="block py-1 hover:text-[#237FFB] transition-colors truncate">2. Eligibility & PEP</a>
                  <a href="#section-3" className="block py-1 hover:text-[#237FFB] transition-colors truncate">3. Advisory Scope</a>
                  <a href="#section-4" className="block py-1 hover:text-[#237FFB] transition-colors truncate">4. No Custody Policy</a>
                  <a href="#section-5" className="block py-1 hover:text-[#237FFB] transition-colors truncate">5. KYC & CKYC Consent</a>
                  <a href="#section-6" className="block py-1 hover:text-[#237FFB] transition-colors truncate">6. Fees & Refund Policy</a>
                  <a href="#section-7" className="block py-1 hover:text-[#237FFB] transition-colors truncate">7. Disclaimers & Risk</a>
                  <a href="#section-8" className="block py-1 hover:text-[#237FFB] transition-colors truncate">8. Intellectual Property</a>
                  <a href="#section-9" className="block py-1 hover:text-[#237FFB] transition-colors truncate">9. TRAI & Communications</a>
                  <a href="#section-10" className="block py-1 hover:text-[#237FFB] transition-colors truncate">10. Limitation of Liability</a>
                  <a href="#section-11" className="block py-1 hover:text-[#237FFB] transition-colors truncate">11. Account Termination</a>
                  <a href="#section-12" className="block py-1 hover:text-[#237FFB] transition-colors truncate">12. Mumbai Jurisdiction</a>
                </nav>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <Link
                    href="/legal/privacy-policy"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#237FFB] hover:underline"
                  >
                    <span>Privacy Policy</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/legal/grievance-redressal-escalation-matrix"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3AA17E] hover:underline"
                  >
                    <span>Escalation Matrix</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* CLAUSES TEXT CONTAINER */}
            <div className="lg:col-span-3 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
              
              {/* SECTION 1 */}
              <article id="section-1" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">1</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Corporate Identity & Regulatory Licensing
                  </h2>
                </div>
                <p>
                  <strong className="text-white">{BRAND_INFO.legalEntity}</strong> (CIN: <span className="font-mono text-neutral-200">{BRAND_INFO.cin}</span>) is a private limited company incorporated under the Companies Act, 2013, with its Registered Corporate Office situated at:
                </p>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs font-mono text-neutral-300 space-y-1">
                  <div className="font-bold text-white">{BRAND_INFO.contact.registeredAddress}</div>
                  <div className="text-neutral-400">Branch: {BRAND_INFO.contact.branchAddress}</div>
                </div>
                <p>
                  The Company operates an independent research analyst division under the brand name <strong className="text-white">{BRAND_INFO.brandDisplayName}</strong> and holds the following statutory registrations:
                </p>
                <ul className="space-y-2 list-none text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>SEBI Research Analyst Registration:</strong> Non-Individual Registration No. <span className="font-mono text-white">{BRAND_INFO.sebiRegNo}</span> granted under SEBI (Research Analysts) Regulations, 2014, with perpetual validity starting July 14, 2025.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>BSE Enlistment:</strong> Enlisted Research Analyst with the Bombay Stock Exchange (BSE) under Enlistment ID <span className="font-mono text-white">{BRAND_INFO.bseEnlistmentNo}</span>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>AMFI Registration:</strong> Registered Mutual Fund Distributor with the Association of Mutual Funds in India under ARN <span className="font-mono text-white">{BRAND_INFO.amfiArn}</span>.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 2 */}
              <article id="section-2" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">2</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Eligibility & Politically Exposed Person (PEP) Declaration
                  </h2>
                </div>
                <p>
                  By registering, subscribing to, or accessing services provided by {BRAND_INFO.brandDisplayName}, you affirmatively declare, warrant, and represent that:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white text-sm">A. Legal Majority & Contractual Capacity</h3>
                    <p className="text-xs sm:text-sm text-neutral-300">
                      You are at least 18 years of age (or the age of majority applicable in your jurisdiction) and legally competent to enter into a binding and enforceable contract under the Indian Contract Act, 1872. If you are accessing the services on behalf of an entity, Hindu Undivided Family (HUF), or trust, you warrant that you possess full corporate authorization.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white text-sm">B. Jurisdiction & FEMA Compliance</h3>
                    <p className="text-xs sm:text-sm text-neutral-300">
                      You are either a resident Indian citizen or a Non-Resident Indian (NRI) / Person of Indian Origin (PIO) permitted under the Foreign Exchange Management Act, 1999 (FEMA) and applicable RBI guidelines to transact in Indian securities markets through an authorized NRE/NRO or PIS brokerage account.
                    </p>
                  </div>

                  <div className="p-4 bg-[#EC6446]/10 border border-[#EC6446]/30 rounded-xl space-y-2">
                    <h3 className="font-bold text-[#EC6446] text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>C. Mandatory Affirmative PEP Declaration</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-200">
                      You expressly confirm and warrant that you are <strong>NOT a Politically Exposed Person (PEP)</strong> nor related to or closely associated with any PEP as defined by SEBI circulars, RBI Master Directions, and the Prevention of Money Laundering Act, 2002 (PMLA). If your status alters at any time during your active subscription to PEP or relative of PEP, you are legally obligated to formally notify the Compliance Officer of {BRAND_INFO.brandDisplayName} in writing within seven (7) calendar days at <a href={`mailto:${BRAND_INFO.contact.complianceEmail}`} className="text-[#237FFB] underline">{BRAND_INFO.contact.complianceEmail}</a>.
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 3 */}
              <article id="section-3" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">3</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Nature & Scope of Research Advisory Services
                  </h2>
                </div>
                <p>
                  {BRAND_INFO.brandDisplayName} provides independent, non-exclusive research reports, equity ideas, and curated model portfolios strictly under its SEBI Research Analyst registration. Advisory recommendations are formulated utilizing the proprietary <strong className="text-white">SQGARP™</strong> (Sustainable Quality Growth at Reasonable Price) screening framework:
                </p>
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm pl-2">
                  <li><strong className="text-white">Single Stock Advisory:</strong> Research recommendations with defined entry price ranges, progressive multi-targets (T1, T2, T3), risk-defined stop-loss levels, and comprehensive institutional rationale.</li>
                  <li><strong className="text-white">Equity Model Portfolios:</strong> Curated thematic baskets of 5 to 30 equities rebalanced periodically according to risk-adjusted criteria.</li>
                  <li><strong className="text-white">Curated Mutual Funds:</strong> Goal-based mutual fund portfolios distributed pursuant to AMFI ARN-{BRAND_INFO.amfiArn}.</li>
                </ul>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Recommendations are advisory opinions only. {BRAND_INFO.brandDisplayName} does not provide customized portfolio management, personalized financial planning, or tax advisory services under these terms.
                </p>
              </article>

              {/* SECTION 4 */}
              <article id="section-4" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">4</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Non-Discretionary Advisory & Zero Custody Policy
                  </h2>
                </div>
                <p>
                  The Company adheres to a strict <strong className="text-white">Non-Discretionary & Zero Custody Architecture</strong> in accordance with SEBI guidelines:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-[#3AA17E]" />
                      <span>Zero Custody of Funds</span>
                    </div>
                    <p className="text-neutral-300">
                      We NEVER accept custody of your investment capital, demat securities, or trading balances. Your funds remain 100% inside your own depository/trading account with your broker.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-[#237FFB]" />
                      <span>Sole Execution Discretion</span>
                    </div>
                    <p className="text-neutral-300">
                      You retain total autonomy over the timing, quantity, and price of executing recommendations via your preferred SEBI-registered broker (Zerodha, Groww, Angel One, ICICI Direct, HDFC Sky, Upstox, etc.).
                    </p>
                  </div>
                </div>
                <p className="text-xs text-neutral-400">
                  Never share your broker login credentials, trading passwords, MPIN, or 2FA OTPs with any individual claiming to represent {BRAND_INFO.brandDisplayName}. Our officers will never request access to your trading accounts.
                </p>
              </article>

              {/* SECTION 5 */}
              <article id="section-5" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">5</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    User Representations, KYC & CKYC/KRA Authorization
                  </h2>
                </div>
                <p>
                  In compliance with SEBI master circulars, UIDAI guidelines, and PMLA requirements, the client must undergo Know Your Customer (KYC) verification prior to accessing research recommendations.
                </p>
                <div className="p-4 bg-white/5 border border-[#237FFB]/20 rounded-xl space-y-2 text-xs sm:text-sm">
                  <h3 className="font-bold text-[#237FFB]">Express KRA & CKYCR Fetch Authorization</h3>
                  <p className="text-neutral-300">
                    You hereby provide explicit affirmative authorization to {BRAND_INFO.legalEntity} and its verified technology partners to use your Permanent Account Number (PAN), Date of Birth, and Aadhaar verification token to query, fetch, download, verify, and store your KYC status and records from registered KYC Registration Agencies (KRAs) including <strong>CVL KRA, NDML KRA, DotEx KRA, CAMS KRA, and Karvy KRA</strong>, as well as the Central KYC Registry (CKYCR) managed by CERSAI.
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400">
                  You guarantee that all details furnished (PAN, mobile number, email, address, bank details for billing) are true, accurate, current, and complete. Providing fabricated or forged KYC records constitutes grounds for instant termination and statutory reporting to FIU-IND and SEBI. All personal and financial data collected are governed by our <Link href="/legal/privacy-policy" className="text-[#237FFB] underline">Privacy Policy</Link>.
                </p>
              </article>

              {/* SECTION 6 */}
              <article id="section-6" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">6</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Subscription Fees, Payment Gateways & Refund Policy
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <p>
                    <strong>A. Transparent Fee Schedule:</strong> All subscription plans (Single Stock Advisory from ₹999/month, Equity Model Portfolios from ₹299/month) are published openly on the platform. All stated prices are subject to statutory Goods and Services Tax (GST @ 18%), which will be charged and itemized on the tax invoice.
                  </p>
                  <p>
                    <strong>B. Authorized Payment Channel Notice:</strong> All payments must be processed solely through official secure payment links on our domain (<span className="font-mono text-[#237FFB]">link.advisoralpha.in</span> / <span className="font-mono text-[#237FFB]">web.advisoralpha.in</span>) via RBI-authorized payment aggregators (Razorpay / Cashfree) directly to the bank account of <strong className="text-white">{BRAND_INFO.legalEntity}</strong>.
                  </p>
                  <div className="p-3 bg-[#EC6446]/10 border border-[#EC6446]/30 rounded-xl text-[#EC6446] font-semibold text-xs">
                    WARNING: Do NOT transfer money into any personal bank account, UPI ID, or third-party wallet of any individual employee, agent, or researcher. The Company shall not be liable for transactions conducted outside authorized payment gateways.
                  </div>
                  <p>
                    <strong>C. SEBI-Compliant Refund & Cancellation Policy:</strong> Advisory subscriptions provide immediate digital access to proprietary research recommendations, target sheets, and portfolio allocations. Consequently, fees paid are non-refundable once service access has been provisioned, except where mandated under applicable SEBI circulars, court orders, or where technical failure prevented access and was reported within 48 hours of transaction. You may cancel auto-renewal at any time via web portal settings to prevent future billing.
                  </p>
                </div>
              </article>

              {/* SECTION 7 */}
              <article id="section-7" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">7</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Statutory Disclaimers of Guaranteed Returns & Risk Notice
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 bg-white/5 border border-[#3AA17E]/30 rounded-xl space-y-2">
                    <div className="font-bold text-[#3AA17E] text-xs uppercase tracking-wider">
                      No Assured or Guaranteed Returns
                    </div>
                    <p className="text-neutral-200">
                      {BRAND_INFO.brandDisplayName} and {BRAND_INFO.legalEntity} explicitly DO NOT guarantee, assure, or promise any specific financial return, capital appreciation, minimum percentage return, or preservation of capital on any recommendation, model portfolio, or mutual fund selection. Registration granted by SEBI, enlistment as RA with BSE, and certification from NISM in no way guarantee performance of the intermediary.
                    </p>
                  </div>

                  <p>
                    <strong>Historical Metrics Are Not Indicative of Future Results:</strong> All documented track records, including the historical 75% strike rate, backtested models, and past case studies (e.g. STARHEALTH, PAYTM) are published solely for educational and illustrative purposes. Equity markets are inherently volatile, influenced by macroeconomic shifts, interest rates, geopolitics, and regulatory actions.
                  </p>

                  <p>
                    <strong>Capital Risk & Stop-Loss Discipline:</strong> Equities are risk instruments. Subscribers may lose a portion or the entirety of their invested capital. Strict adherence to specified stop-loss levels and prudent asset allocation is strongly recommended.
                  </p>
                </div>
              </article>

              {/* SECTION 8 */}
              <article id="section-8" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">8</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Intellectual Property & Redistribution Restrictions
                  </h2>
                </div>
                <p>
                  All research reports, stock recommendation summaries, target prices, rationale notes, screening algorithms, the <strong className="text-white">SQGARP™</strong> methodology, website layout, graphics, text, software, and brand marks are the exclusive intellectual property of <strong className="text-white">{BRAND_INFO.legalEntity}</strong>, protected under the Copyright Act, 1957, Trade Marks Act, 1999, and applicable international intellectual property treaties.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs sm:text-sm">
                  <h3 className="font-bold text-white">Single-User Personal License & Prohibition of Sharing</h3>
                  <p className="text-neutral-300">
                    Subscribers are granted a limited, personal, revocable, non-transferable, and non-exclusive license to consume research reports solely for their own individual investment decision-making. <strong>You are strictly prohibited from copying, distributing, republishing, reselling, sublicensing, broadcasting, screenshotting, or sharing research notes on Telegram channels, WhatsApp groups, Discord servers, social media handles, or any online or offline forum.</strong>
                  </p>
                </div>
                <p className="text-xs text-neutral-400">
                  The Company deploys digital watermarking and telemetry forensics. Any subscriber detected engaging in unauthorized reproduction or commercial leaks will face immediate permanent account termination without refund and civil/criminal prosecution under Sections 63 & 65 of the Copyright Act and Section 420 of the Indian Penal Code.
                </p>
              </article>

              {/* SECTION 9 */}
              <article id="section-9" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">9</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Communication Consent & TRAI NCPR Override
                  </h2>
                </div>
                <p>
                  By registering your mobile telephone number and email address with {BRAND_INFO.brandDisplayName}, you give explicit, affirmative, and unconditional consent under Telecom Regulatory Authority of India (TRAI) regulations and Telecom Commercial Communications Customer Preference Regulations (TCCCPR), 2018.
                </p>
                <p className="text-xs sm:text-sm text-neutral-300">
                  You authorize {BRAND_INFO.brandDisplayName} to transmit transactional notifications, real-time research alerts (entry prices, targets, trailing stop-losses, exits), portfolio rebalancing advisories, billing invoices, and service updates through SMS, WhatsApp messages, automated phone calls, in-app push notifications, and emails, <strong>overriding any National Customer Preference Register (NCPR / NDNC) registration</strong> on your telephone number.
                </p>
              </article>

              {/* SECTION 10 */}
              <article id="section-10" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">10</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Limitation of Liability & Indemnification
                  </h2>
                </div>
                <div className="space-y-3 text-xs sm:text-sm">
                  <p>
                    <strong>A. Exclusion of Consequential Damages:</strong> Under no circumstances shall {BRAND_INFO.legalEntity}, its founder & CIO Pankaj Murarka, directors, research analysts, officers, or affiliates be liable for any direct, indirect, incidental, punitive, special, or consequential damages, including loss of profits, loss of capital, portfolio drawdowns, opportunity costs, or damages arising out of the execution, non-execution, delay, or slippage of trades with your stockbroker.
                  </p>
                  <p>
                    <strong>B. Technical Downtime & Force Majeure:</strong> We shall not be held responsible for failures, interruptions, or delays resulting from stock exchange technical glitches, internet outages, cyber attacks, broker API downtimes, acts of God, pandemics, strikes, or regulatory suspensions.
                  </p>
                  <p>
                    <strong>C. Indemnity:</strong> The client agrees to defend, indemnify, and hold harmless {BRAND_INFO.legalEntity} and its management against any third-party claims, liabilities, legal costs, or losses resulting from client breach of these terms, violation of applicable securities laws, or improper dissemination of research reports.
                  </p>
                </div>
              </article>

              {/* SECTION 11 */}
              <article id="section-11" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">11</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Account Suspension & Termination
                  </h2>
                </div>
                <p className="text-xs sm:text-sm">
                  {BRAND_INFO.brandDisplayName} reserves the statutory right to immediately suspend or permanently revoke client access to the web portal, mobile app, and research communication channels without prior notice under any of the following circumstances:
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-2">
                  <li>Breach of any clause of these Terms and Conditions or the executed service agreement.</li>
                  <li>Failure to complete mandatory digital KYC or furnishing misleading identity/PAN records.</li>
                  <li>Detection of multi-user credential sharing or redistribution of research recommendations.</li>
                  <li>Failure to notify PEP status change or involvement in financial fraud or PMLA investigation.</li>
                  <li>Directive or order issued by SEBI, Stock Exchanges, or any statutory authority.</li>
                </ul>
              </article>

              {/* SECTION 12 */}
              <article id="section-12" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">12</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Governing Law, Dispute Resolution & Exclusive Mumbai Jurisdiction
                  </h2>
                </div>
                <p>
                  These Terms and Conditions, all rights and obligations hereunder, and any dispute or controversy arising out of or in connection with the services provided by {BRAND_INFO.brandDisplayName} shall be governed exclusively by and construed in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without regard to conflict of law principles.
                </p>
                <div className="p-4 bg-white/5 border border-[#237FFB]/30 rounded-xl space-y-2 text-xs sm:text-sm">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#237FFB]" />
                    <span>Exclusive Jurisdiction of Mumbai Courts</span>
                  </div>
                  <p className="text-neutral-300">
                    Subject to the grievance redressal mechanism established under SEBI guidelines (including the SCORES portal and the Smart ODR platform), you unconditionally agree that the competent civil courts, consumer dispute redressal commissions, and judicial forums located in <strong className="text-white">Mumbai, Maharashtra, India</strong> shall have <strong>sole and exclusive territorial jurisdiction</strong> over all legal proceedings, suits, or arbitrations.
                  </p>
                </div>
                <div className="pt-2 text-xs text-neutral-400">
                  Dispute escalation is subject to the statutory 21-day internal resolution period detailed in our{' '}
                  <Link href="/legal/grievance-redressal-escalation-matrix" className="text-[#237FFB] underline">
                    Grievance Redressal Escalation Matrix
                  </Link>.
                </div>
              </article>

              {/* CONTACT & REGULATORY DISCLOSURE CARD */}
              <div className="bg-gradient-to-r from-[#0B0E14] to-[#121620] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3AA17E]">
                  <Building2 className="w-4 h-4" />
                  <span>Compliance & Grievance Contact</span>
                </div>
                <h3 className="text-lg font-bold text-white">Have questions regarding these Terms?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300 pt-1">
                  <div>
                    <span className="text-neutral-500 block">Registered Entity:</span>
                    <strong className="text-white">{BRAND_INFO.legalEntity}</strong>
                    <div className="mt-1">CIN: {BRAND_INFO.cin}</div>
                    <div>SEBI RA: {BRAND_INFO.sebiRegNo}</div>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Official Support:</span>
                    <div>Email: <a href={`mailto:${BRAND_INFO.contact.supportEmail}`} className="text-[#237FFB] hover:underline">{BRAND_INFO.contact.supportEmail}</a></div>
                    <div>Grievance: <a href={`mailto:${BRAND_INFO.contact.complianceEmail}`} className="text-[#237FFB] hover:underline">{BRAND_INFO.contact.complianceEmail}</a></div>
                    <div>Telephone: <a href={`tel:${BRAND_INFO.contact.phone}`} className="text-[#237FFB] hover:underline">{BRAND_INFO.contact.phone}</a></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
