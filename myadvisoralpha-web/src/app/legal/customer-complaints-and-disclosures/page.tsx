import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import {
  COMPLAINTS_DATA_CURRENT_MONTH,
  DISCLOSURE_DOCS,
} from '@/data/legal';
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Calendar,
  TrendingUp,
  Archive,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Customer Complaints & Regulatory Disclosures | ${BRAND_INFO.brandDisplayName}`,
  description: `SEBI-mandated monthly investor complaints audit data and official regulatory disclosure filings for ${BRAND_INFO.brandDisplayName} (${BRAND_INFO.legalEntity}, SEBI RA: ${BRAND_INFO.sebiRegNo}). Month Ending September 2026.`,
  keywords: [
    'Customer Complaints Data',
    'SEBI Disclosures',
    'Research Analyst Disclosures',
    'SEBI INH000021818 Complaints',
    'Investor Charter',
    'MITC Document',
    'BSE Enlistment 6793',
  ],
};

// Historical Monthly Disposal Audit Data (Last 6 Months)
const HISTORICAL_MONTHLY_DATA = [
  { month: 'April 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { month: 'May 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { month: 'June 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { month: 'July 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { month: 'August 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { month: 'September 2026', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
];

// Historical Annual Compliance Audit Trends
const HISTORICAL_ANNUAL_DATA = [
  { financialYear: 'FY 2024-25', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { financialYear: 'FY 2025-26', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  { financialYear: 'FY 2026-27 (YTD)', carriedForward: 0, received: 0, resolved: 0, pending: 0 },
];

export default function CustomerComplaintsAndDisclosuresPage() {
  return (
    <div className="flex-1 flex flex-col w-full selection:bg-[#237FFB] selection:text-white">
      {/* HERO / BREADCRUMB HEADER */}
      <section className="relative pt-8 pb-12 border-b border-[#2A2A2A] bg-gradient-to-b from-[#0B0E14] to-[#010101] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-500">Legal</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#237FFB] font-medium">Complaints & Disclosures</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA17E]/10 border border-[#3AA17E]/30 text-[#3AA17E] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEBI Mandated Monthly Audit</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/10 border border-[#237FFB]/30 text-[#237FFB] text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Month Ending September 2026</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono">
              SEBI RA: {BRAND_INFO.sebiRegNo}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Customer Complaints Data & Regulatory Disclosures
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mb-4">
            Published in strict compliance with SEBI Master Circular for Research Analysts (SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158). At <strong className="text-white">{BRAND_INFO.legalEntity}</strong> (<strong className="text-white">{BRAND_INFO.brandDisplayName}</strong>), monthly complaints audits and statutory governance filings are updated on or before the 7th of every calendar month.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-white/10 font-mono">
            <span>Corporate Entity: {BRAND_INFO.legalEntity}</span>
            <span>•</span>
            <span>CIN: {BRAND_INFO.cin}</span>
            <span>•</span>
            <span>BSE Enlistment: {BRAND_INFO.bseEnlistmentNo}</span>
          </div>
        </div>
      </section>

      {/* 4 STATS CARDS */}
      <section className="bg-[#0B0E14] border-b border-[#2A2A2A] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#3AA17E]">0</div>
              <div className="text-xs text-neutral-400 mt-1">Complaints Received (Sep 2026)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#237FFB]">0</div>
              <div className="text-xs text-neutral-400 mt-1">Pending at Month End</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">0</div>
              <div className="text-xs text-neutral-400 mt-1">Pending &gt; 3 Months</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#3AA17E]">0 Days</div>
              <div className="text-xs text-neutral-400 mt-1">Avg. Resolution Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 1: MANDATORY MONTHLY COMPLAINTS TABLE */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#237FFB] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Statutory SEBI Format</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Data for the Month Ending September 2026
                </h2>
              </div>
              <div className="text-xs text-neutral-400 font-mono">
                Updated: October 7, 2026
              </div>
            </div>

            {/* Responsive Table */}
            <div className="bg-[#0B0E14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-4 px-3 sm:px-4 text-center w-14">Sr. No.</th>
                      <th className="py-4 px-4 min-w-[200px]">Received From</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Pending at End of Last Month</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Received</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Resolved*</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Total Pending#</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Pending &gt; 3 Months</th>
                      <th className="py-4 px-3 sm:px-4 text-center">Avg Resolution Time^ (Days)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300 font-mono">
                    {COMPLAINTS_DATA_CURRENT_MONTH.map((row) => (
                      <tr key={row.srNo} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-3 sm:px-4 text-center text-neutral-500 font-sans font-bold">
                          {row.srNo}
                        </td>
                        <td className="py-4 px-4 font-sans font-medium text-white">
                          {row.receivedFrom}
                        </td>
                        <td className="py-4 px-3 sm:px-4 text-center">{row.pendingLastMonth}</td>
                        <td className="py-4 px-3 sm:px-4 text-center text-[#237FFB] font-bold">{row.received}</td>
                        <td className="py-4 px-3 sm:px-4 text-center text-[#3AA17E] font-bold">{row.resolved}</td>
                        <td className="py-4 px-3 sm:px-4 text-center">{row.totalPending}</td>
                        <td className="py-4 px-3 sm:px-4 text-center">{row.pendingOverThreeMonths}</td>
                        <td className="py-4 px-3 sm:px-4 text-center">{row.avgResolutionDays}</td>
                      </tr>
                    ))}

                    {/* Grand Total Row */}
                    <tr className="bg-white/5 font-bold text-white border-t-2 border-white/20">
                      <td className="py-4 px-3 sm:px-4 text-center font-sans">-</td>
                      <td className="py-4 px-4 font-sans uppercase tracking-wider text-xs">
                        Grand Total
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-center">0</td>
                      <td className="py-4 px-3 sm:px-4 text-center text-[#237FFB]">0</td>
                      <td className="py-4 px-3 sm:px-4 text-center text-[#3AA17E]">0</td>
                      <td className="py-4 px-3 sm:px-4 text-center">0</td>
                      <td className="py-4 px-3 sm:px-4 text-center">0</td>
                      <td className="py-4 px-3 sm:px-4 text-center">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mandated Footnotes */}
              <div className="p-4 sm:p-6 bg-black/40 border-t border-white/10 text-xs text-neutral-400 space-y-2">
                <div className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">
                  Statutory Notes & Explanations:
                </div>
                <p className="leading-relaxed">
                  <strong className="text-neutral-300">*</strong> The number of complaints received during the month against the RA due to impersonation by some other entity, if any, may be adjusted from the total number of received and resolved complaints while preparing the above table. Such impersonation-related complaints must be closed only after following the due process as specified by SEBI/RAASB.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-neutral-300">#</strong> The figures in the table are inclusive of complaints from previous months that were resolved in the current month, as well as complaints pending as on the last day of the month.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-neutral-300">^</strong> The average resolution time is calculated as the total number of days taken to resolve each complaint during the current month divided by the total number of complaints resolved in that month.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: HISTORICAL TRENDS (MONTHLY & ANNUAL) */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3AA17E] mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Compliance Track Record</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Historical Complaints Trends
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* TABLE: Monthly Disposal Trend */}
              <div className="bg-[#0B0E14] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-bold text-white text-base">
                    Monthly Disposal Trend (Last 6 Months)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 font-mono">
                    FY 2026-27
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 font-semibold uppercase text-[10px]">
                        <th className="py-2.5 px-3">Month</th>
                        <th className="py-2.5 px-2 text-center">Carried Fwd</th>
                        <th className="py-2.5 px-2 text-center">Received</th>
                        <th className="py-2.5 px-2 text-center">Resolved</th>
                        <th className="py-2.5 px-2 text-center">Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-neutral-300">
                      {HISTORICAL_MONTHLY_DATA.map((row) => (
                        <tr key={row.month} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-sans font-medium text-white">{row.month}</td>
                          <td className="py-2.5 px-2 text-center">{row.carriedForward}</td>
                          <td className="py-2.5 px-2 text-center text-[#237FFB]">{row.received}</td>
                          <td className="py-2.5 px-2 text-center text-[#3AA17E]">{row.resolved}</td>
                          <td className="py-2.5 px-2 text-center">{row.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE: Annual Disposal Trend */}
              <div className="bg-[#0B0E14] border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-bold text-white text-base">
                    Annual Disposal Trend (Since Inception)
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-[#3AA17E]/10 text-[#3AA17E] font-semibold">
                    100% Clean Audit
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-neutral-400 font-semibold uppercase text-[10px]">
                        <th className="py-2.5 px-3">Financial Year</th>
                        <th className="py-2.5 px-2 text-center">Carried Fwd</th>
                        <th className="py-2.5 px-2 text-center">Received</th>
                        <th className="py-2.5 px-2 text-center">Resolved</th>
                        <th className="py-2.5 px-2 text-center">Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-neutral-300">
                      {HISTORICAL_ANNUAL_DATA.map((row) => (
                        <tr key={row.financialYear} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-sans font-medium text-white">{row.financialYear}</td>
                          <td className="py-2.5 px-2 text-center">{row.carriedForward}</td>
                          <td className="py-2.5 px-2 text-center text-[#237FFB]">{row.received}</td>
                          <td className="py-2.5 px-2 text-center text-[#3AA17E]">{row.resolved}</td>
                          <td className="py-2.5 px-2 text-center">{row.pending}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-white/5 rounded-xl text-xs text-neutral-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                  <span>
                    Zero pending investor complaints recorded across all financial years since receipt of SEBI Research Analyst registration INH000021818.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: 9 OFFICIAL GOOGLE DRIVE REGULATORY DISCLOSURE DOCUMENTS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EC6446] mb-1">
                  <Archive className="w-3.5 h-3.5" />
                  <span>Public Regulatory Repository</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Mandated Regulatory Disclosure Documents
                </h2>
              </div>
              <div className="text-xs text-neutral-400">
                9 Official Document Filings (Hosted on Google Drive)
              </div>
            </div>

            {/* 3-Column Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DISCLOSURE_DOCS.map((doc, idx) => (
                <div
                  key={doc.title}
                  className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-[#237FFB]/50 hover:bg-[#121620] transition-all group shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Category Badge & Doc Number */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-medium">
                        {doc.category}
                      </span>
                      <span className="font-mono text-neutral-500 text-[11px]">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-white text-base group-hover:text-[#237FFB] transition-colors leading-snug">
                      {doc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-white/5">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full py-2 px-3.5 rounded-xl bg-white/5 hover:bg-[#237FFB] text-neutral-300 hover:text-white text-xs font-semibold transition-all group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#237FFB] group-hover/btn:text-white" />
                        <span>View Official Filing</span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: INVESTOR CHARTER DO'S & DON'TS */}
          <div className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-[#3AA17E]" />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Investor Charter for Research Analysts — Do&apos;s and Don&apos;ts
                </h3>
                <p className="text-xs text-neutral-400">
                  Mandated by SEBI to protect retail investors from fraudulent schemes and unauthorized tipsters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* DO's */}
              <div className="p-5 rounded-2xl bg-black/40 border border-[#3AA17E]/30 space-y-3">
                <div className="font-bold text-[#3AA17E] flex items-center gap-2 uppercase tracking-wider text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Investor Do&apos;s</span>
                </div>
                <ul className="space-y-2 list-none text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#3AA17E] font-bold">✓</span>
                    <span>Always verify SEBI registration status on the official SEBI website (<a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#237FFB] underline">sebi.gov.in</a>) before subscribing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3AA17E] font-bold">✓</span>
                    <span>Ensure fees are paid strictly via banking channels (NEFT/RTGS/Netbanking/UPI) to the corporate bank account of the registered entity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3AA17E] font-bold">✓</span>
                    <span>Review the research rationale, stop-loss guidelines, and risk disclosures before placing trades.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#3AA17E] font-bold">✓</span>
                    <span>Keep track of all fee receipts, invoices, and research communications.</span>
                  </li>
                </ul>
              </div>

              {/* DON'Ts */}
              <div className="p-5 rounded-2xl bg-black/40 border border-[#EC6446]/30 space-y-3">
                <div className="font-bold text-[#EC6446] flex items-center gap-2 uppercase tracking-wider text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>Investor Don&apos;ts</span>
                </div>
                <ul className="space-y-2 list-none text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC6446] font-bold">✕</span>
                    <span>Do not provide your trading account credentials, demat password, MPIN, or 2FA OTP to any advisor or research analyst.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC6446] font-bold">✕</span>
                    <span>Do not believe promises of assured, fixed, or guaranteed returns. Assured return promises are illegal under SEBI regulations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC6446] font-bold">✕</span>
                    <span>Do not pay advisory fees into any personal bank account or personal UPI ID of an employee or individual.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EC6446] font-bold">✕</span>
                    <span>Do not act on unsolicited messages or stock tips received on WhatsApp, Telegram, or social media channels.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
              <span>Detailed Investor Charter Document:</span>
              <a
                href="https://drive.google.com/file/d/16OmU8JBDxyKjiHnTsdGvJQVSjZlFC0X_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#237FFB] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Download Full SEBI Investor Charter PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
