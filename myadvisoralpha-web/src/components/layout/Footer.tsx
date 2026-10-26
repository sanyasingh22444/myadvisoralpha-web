"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight
} from "lucide-react";
import QrDownloadCard from "./QrDownloadCard";

export default function Footer() {
  // Independent accordion toggles: 0, 1, 2, 3
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: true, // Default open for mandated derivative risk warning
    3: false,
  });

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <footer className="bg-[#010101] text-neutral-300 pt-16 pb-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION 1: App Download Banner with QR Card */}
        <div className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/10 border border-[#237FFB]/30 text-[#237FFB] text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Download Advisor Alpha</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Join 1,00,000+ Smart Investors Today
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Experience institutional-grade equity research, curated model portfolios, and disciplined wealth advisory right from your mobile device.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0" />
                <span>75% Strike Rate on Stock Recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0" />
                <span>Real-time Entry, Target (T1-T3) & Stop-Loss</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0" />
                <span>SEBI-Registered RA (INH000021818)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0" />
                <span>Zero Commission Churn Conflict</span>
              </div>
            </div>

            {/* App Store & Google Play Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="https://apps.apple.com/in/app/advisor-alpha-stock-investing/id6749932451"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-100 font-semibold text-xs transition-transform active:scale-95 shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-1.99.6-2.63 1.35-.58.65-1.09 1.72-1.04 2.76 1.01.08 2.05-.51 2.66-1.26z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-neutral-600 uppercase">Download on the</div>
                  <div className="text-xs font-bold font-sans">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.renaissance.advisoralpha&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-100 font-semibold text-xs transition-transform active:scale-95 shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186c-.307-.282-.485-.688-.485-1.129V2.943c0-.441.178-.847.484-1.129zM15.207 13.414l2.122 2.122-12.08 6.974 9.958-9.096zm0-2.828L5.249 1.49l12.08 6.974-2.122 2.122zm1.414 1.414l3.182-1.838c.844-.487.844-1.282 0-1.769l-3.182-1.837-1.414 1.414 2.828 2.828-2.828 2.828 1.414 1.414 1.414-1.414-.001-.001z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-neutral-600 uppercase">Get it on</div>
                  <div className="text-xs font-bold font-sans">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code Download Card */}
          <QrDownloadCard />
        </div>

        {/* SECTION 2: SEBI 9/10 Traders Loss Mandate Callout Box */}
        <div className="border border-[#DD5240]/40 bg-[#DD5240]/10 rounded-2xl p-5 mb-10 shadow-lg">
          <div className="flex items-center gap-2.5 text-[#DD5240] font-bold text-sm sm:text-base mb-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>Risk Disclosures on Derivatives (Mandated by SEBI)</span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed list-disc list-inside">
            <li>
              <strong>9 out of 10</strong> individual traders in equity Futures and Options Segment, incurred net losses.
            </li>
            <li>
              On an average, loss makers registered net trading loss close to <strong>₹50,000</strong>.
            </li>
            <li>
              Over and above the net trading losses incurred, loss makers expended an additional <strong>28%</strong> of net trading losses as transaction costs.
            </li>
            <li>
              Those making net trading profits, incurred between <strong>15% to 50%</strong> of such profits as transaction cost.
            </li>
          </ul>
          <div className="text-[11px] text-neutral-400 mt-3 pt-3 border-t border-[#DD5240]/20">
            Source: SEBI study on <em>&quot;Analysis of Profit and Loss of Individual Traders dealing in equity Futures and Options (F&O) Segment&quot;</em>, dated January 25, 2023.
          </div>
        </div>

        {/* SECTION 3: Four (4) Expandable SEBI Disclosure Accordions */}
        <div className="border-y border-[#2A2A2A] divide-y divide-[#2A2A2A] mb-12">
          {/* Accordion 1: About AdvisorAlpha & Regulatory Status */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleAccordion(0)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={openAccordions[0]}
            >
              <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#237FFB] transition-colors">
                1. About AdvisorAlpha & Regulatory Status
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                  openAccordions[0] ? "rotate-180 text-[#237FFB]" : ""
                }`}
              />
            </button>
            {openAccordions[0] && (
              <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <p>
                  <strong>Renaissance Smart Tech Private Limited</strong> (CIN: <span className="text-neutral-200 font-mono">U67200MH2020PTC338091</span>) operates through its dedicated investment advisory division <strong>MyAdvisorAlpha</strong>. The entity is registered with the Securities and Exchange Board of India (SEBI) as a Research Analyst under SEBI (Research Analysts) Regulations, 2014, with Registration No. <span className="text-neutral-200 font-mono">INH000021818</span> (Date of Grant: July 14, 2025 – Perpetual).
                </p>
                <p>
                  The company is also an enlisted Research Analyst with the Bombay Stock Exchange (BSE Enlistment No. <span className="text-neutral-200 font-mono">6793</span>) and a registered Mutual Fund Distributor with the Association of Mutual Funds in India (AMFI Registration No. <span className="text-neutral-200 font-mono">ARN-350887</span>). Registered Office: Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059, Maharashtra, India.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 2: Attention Investors (Exchange KYC & CAS Directives) */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={openAccordions[1]}
            >
              <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#237FFB] transition-colors">
                2. Attention Investors: Exchange KYC & CAS Directives
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                  openAccordions[1] ? "rotate-180 text-[#237FFB]" : ""
                }`}
              />
            </button>
            {openAccordions[1] && (
              <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <p>
                  <strong>Prevent Unauthorized Transactions:</strong> Update your mobile numbers and email IDs with your stockbrokers and depository participants. Receive information of your transactions directly from Exchanges and Depositories on your mobile and email at the end of every trading day.
                </p>
                <p>
                  <strong>KYC is a One-Time Exercise:</strong> KYC is a one-time exercise while dealing in securities markets. Once KYC is done through a SEBI-registered intermediary (broker, DP, Mutual Fund, etc.), you need not undergo the same process again when you approach another intermediary.
                </p>
                <p>
                  <strong>Direct IPO Subscriptions (ASBA):</strong> No need to issue cheques while subscribing to IPOs. Simply write the bank account number and sign the application form to authorize your bank to make payment in case of allotment. No worries for refunds as funds remain securely in the investor&apos;s account.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 3: Disclaimers, Research Integrity & Risk Notices */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={openAccordions[2]}
            >
              <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#237FFB] transition-colors">
                3. Disclaimers, Research Analyst Certifications & Conflicts
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                  openAccordions[2] ? "rotate-180 text-[#237FFB]" : ""
                }`}
              />
            </button>
            {openAccordions[2] && (
              <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <p>
                  <em>&quot;Investment in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, enlistment as RA with Exchange and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.&quot;</em>
                </p>
                <p>
                  <strong>Research Analyst Conflict Certification:</strong> We, the research analysts and authors of advisory reports, hereby certify that the views expressed accurately reflect our personal views about the subject securities, issuers, products, sectors, or industries. It is also certified that no part of the compensation of the analyst(s) was, is, or will be directly or indirectly related to the inclusion of specific recommendations. Analysts have taken reasonable care to achieve independence and objectivity.
                </p>
                <p>
                  <strong>Mutual Fund Notice:</strong> Mutual fund investments are subject to market risk. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.
                </p>
              </div>
            )}
          </div>

          {/* Accordion 4: Grievance Redressal Mechanism, SCORES & Smart ODR */}
          <div className="py-4">
            <button
              type="button"
              onClick={() => toggleAccordion(3)}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
              aria-expanded={openAccordions[3]}
            >
              <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#237FFB] transition-colors">
                4. Grievance Redressal Mechanism, SCORES & Smart ODR
              </span>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                  openAccordions[3] ? "rotate-180 text-[#237FFB]" : ""
                }`}
              />
            </button>
            {openAccordions[3] && (
              <div className="pt-3 pb-2 text-xs sm:text-sm text-neutral-400 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <p>
                  In the event of any grievance or query, clients may contact our designated Grievance Officers. For Level 1 / Level 2 queries: Rishabh Solanki (<span className="text-neutral-200">support@renaissanceadvisors.in</span>, Phone: <span className="text-neutral-200">+91 8655387833</span>). For Level 3 Compliance escalations: Ms. Nidhi Kamani (<span className="text-neutral-200">support@myadvisoralpha.com</span>). For Level 4 Principal Officer: Mr. Nipun Jalan. For Level 5 Directors: Pankaj Murarka / Alok Sharma.
                </p>
                <p>
                  If the grievance is not redressed within 21 calendar days, investors may lodge complaints on the{" "}
                  <a
                    href="https://scores.sebi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#237FFB] underline hover:text-white"
                  >
                    SEBI SCORES Portal
                  </a>{" "}
                  or initiate dispute resolution through the{" "}
                  <a
                    href="https://smartodr.in/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#237FFB] underline hover:text-white"
                  >
                    Smart ODR Portal
                  </a>
                  .
                </p>
                <div className="pt-2">
                  <Link
                    href="/legal/grievance-redressal-escalation-matrix"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#237FFB] hover:text-white"
                  >
                    <span>View Official 5-Tier Escalation Matrix Table</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 4: 9 Official Google Drive Regulatory Disclosure Links */}
        <div className="mb-12 bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#237FFB] mb-3">
            Official Regulatory Filings & Mandated Document Disclosures
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <a
              href="https://drive.google.com/file/d/1sPlZdR_50WIfXBDL-DqvsRbZFxgORhex/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>SEBI Registration Details</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1IJYKTGQS_aQWzeHwBspTAVZac14m5dOU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Disclosure under SEBI Circular</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1xMVbEMTVsYylSuHi4YAwBsBt0PHmjykd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Annual Compliance</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1tesOxWm1_Z8Oxf05dPSYq4_P4U4H_DqI/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Most Important Terms & Conditions (MITC)</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1gxNiwI79nHT_WSMjx-bhwnAZWkid-udy/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Disclosure & Disclaimer in Research Report</span>
            </a>
            <a
              href="https://drive.google.com/file/d/14vocVVymTrp1qBJ6fjDYFnJ4W69nVAPA/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Client Level Segregation</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1bj7m4lCZLZIpUbHFGAdYlRHdh8z06DkV/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Payment via UPI ID</span>
            </a>
            <a
              href="https://drive.google.com/file/d/16OmU8JBDxyKjiHnTsdGvJQVSjZlFC0X_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Investor Charter for RAs</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1Xy349dbDZulxltiMlyFp08fn5RVfUVAc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white hover:underline flex items-center gap-1.5 py-1"
            >
              <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
              <span>Historical Complaints</span>
            </a>
          </div>
        </div>

        {/* SECTION 5: Multi-Column Link Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Offerings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Advisory Offerings
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/#stock-advisory" className="hover:text-white transition-colors">
                  Single Stock Advisory
                </Link>
              </li>
              <li>
                <Link href="/#portfolios" className="hover:text-white transition-colors">
                  Equity Model Portfolios
                </Link>
              </li>
              <li>
                <Link href="/#mutual-funds" className="hover:text-white transition-colors">
                  Curated Mutual Funds
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-white transition-colors">
                  SIP Wealth Calculator
                </Link>
              </li>
              <li>
                <a
                  href="https://web.advisoralpha.in/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#237FFB]"
                >
                  <span>Client Web Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Research
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Advisor Alpha
                </Link>
              </li>
              <li>
                <Link href="/about#cio-profile" className="hover:text-white transition-colors">
                  Pankaj Murarka (CIO)
                </Link>
              </li>
              <li>
                <Link href="/about#sqgarp" className="hover:text-white transition-colors">
                  SQGARP™ Methodology
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Market Insights & Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Regulatory */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Compliance
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <Link href="/legal/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/grievance-redressal-escalation-matrix"
                  className="hover:text-white transition-colors"
                >
                  Grievance Escalation Matrix
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/customer-complaints-and-disclosures"
                  className="hover:text-white transition-colors"
                >
                  Customer Complaints & Disclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory Directories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Regulatory Directory
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <a
                  href="https://www.sebi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>SEBI Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>SEBI SCORES Portal</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://smartodr.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Smart ODR Portal</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bseindia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>BSE Enlisted RA (6793)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.amfiindia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>AMFI Registered MFD</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nseindia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>NSE India</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 6: Registered Entity & Office Details Card */}
        <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-6 mb-8 text-xs text-neutral-400 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div>
              <span className="font-bold text-white text-sm">Renaissance Smart Tech Private Limited</span>
              <span className="text-neutral-500 ml-2">CIN: U67200MH2020PTC338091</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/10 text-neutral-200 px-2 py-0.5 rounded font-mono">
                SEBI RA: INH000021818
              </span>
              <span className="bg-white/10 text-neutral-200 px-2 py-0.5 rounded font-mono">
                BSE: 6793
              </span>
              <span className="bg-white/10 text-neutral-200 px-2 py-0.5 rounded font-mono">
                AMFI: ARN-350887
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#237FFB] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-300">Registered Office:</strong>
                <p className="mt-0.5 leading-relaxed">
                  Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059, Maharashtra, India.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-300">Contact & Support:</strong>
                <p className="mt-0.5">Support: <a href="mailto:support@myadvisoralpha.com" className="hover:text-white underline">support@myadvisoralpha.com</a></p>
                <p>Grievance: <a href="mailto:support@renaissanceadvisors.in" className="hover:text-white underline">support@renaissanceadvisors.in</a></p>
                <p>Telephone: <a href="tel:+918655387833" className="hover:text-white underline">+91 8655387833</a></p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#FF8415] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-300">Working Hours:</strong>
                <p className="mt-0.5">Monday to Friday: 9:00 AM – 6:00 PM IST</p>
                <p>Closed on Saturdays, Sundays & Exchange Holidays</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: Social Handles & Bottom Statutory Strip */}
        <div className="pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 Renaissance Smart Tech Private Limited (MyAdvisorAlpha). All rights reserved.
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-4">
            <a
              href="https://whatsapp.com/channel/0029Vb6uPDGLtOj9FJ6BWW46"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Community"
              className="text-neutral-400 hover:text-[#3AA17E] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/company/advisor-alpha/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-neutral-400 hover:text-[#237FFB] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/AdvisorAlpha_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://www.youtube.com/channel/UCSFDQB9GlrOkRCXTt3tXZYg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-neutral-400 hover:text-[#DD5240] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/advisoralpha_?igsh=bTZ5MnprNnoyeGVi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-400 hover:text-[#EC6446] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
