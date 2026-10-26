import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import {
  ShieldCheck,
  Lock,
  Database,
  UserCheck,
  FileLock,
  EyeOff,
  Server,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronRight,
  FileText,
  KeyRound,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Privacy Policy & DPDP Data Protection | ${BRAND_INFO.brandDisplayName}`,
  description: `Official Privacy Policy and Data Protection Framework of ${BRAND_INFO.brandDisplayName} (${BRAND_INFO.legalEntity}, SEBI RA: ${BRAND_INFO.sebiRegNo}), fully compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act).`,
  keywords: [
    'Privacy Policy',
    'Renaissance Smart Tech Private Limited',
    'DPDP Act 2023 Compliance',
    'Data Protection India',
    'CKYC Data Privacy',
    'Advisor Alpha Privacy Policy',
    'SEBI Data Retention',
  ],
};

export default function PrivacyPolicyPage() {
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
            <span className="text-[#237FFB] font-medium">Privacy Policy</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA17E]/10 border border-[#3AA17E]/30 text-[#3AA17E] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/10 border border-[#237FFB]/30 text-[#237FFB] text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL/TLS Encryption</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono">
              SEBI RA: {BRAND_INFO.sebiRegNo}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Privacy Policy & Data Protection Charter
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mb-4">
            At <strong className="text-white">{BRAND_INFO.legalEntity}</strong> (operating as <strong className="text-white">{BRAND_INFO.brandDisplayName}</strong>), your privacy and financial confidentiality are non-negotiable institutional commitments. This Privacy Policy outlines our data governance, collection, and storage practices in accordance with the <strong className="text-white">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, Information Technology Act, 2000, and SEBI regulations.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-white/10 font-mono">
            <span>Data Controller: {BRAND_INFO.legalEntity}</span>
            <span>•</span>
            <span>CIN: {BRAND_INFO.cin}</span>
            <span>•</span>
            <span>Last Updated: October 2026</span>
          </div>
        </div>
      </section>

      {/* 4 CORE PRIVACY COMMITMENTS BANNER */}
      <section className="bg-[#0B0E14] border-b border-[#2A2A2A] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#3AA17E]/20 text-[#3AA17E] flex items-center justify-center font-bold">
                <EyeOff className="w-4 h-4" />
              </div>
              <div className="font-bold text-white text-sm">Zero Commercial Selling</div>
              <p className="text-neutral-400">
                Your personal data is never sold, rented, or traded to marketing brokers or commercial third parties.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold">
                <Server className="w-4 h-4" />
              </div>
              <div className="font-bold text-white text-sm">Domestic Indian Hosting</div>
              <p className="text-neutral-400">
                All KYC, transaction, and client records reside on secure, ISO 27001 cloud servers inside India.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#EC6446]/20 text-[#EC6446] flex items-center justify-center font-bold">
                <FileLock className="w-4 h-4" />
              </div>
              <div className="font-bold text-white text-sm">Tokenized Billing</div>
              <p className="text-neutral-400">
                Card details and net banking passwords are never stored; processed via PCI-DSS compliant gateways.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <div className="font-bold text-white text-sm">SEBI 5-Year Mandate</div>
              <p className="text-neutral-400">
                Statutory compliance archives preserved for 5 years per SEBI and PMLA regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY SECTIONS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* STICKY TOC */}
            <aside className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-28 bg-[#0B0E14] border border-white/10 rounded-2xl p-4 shadow-lg text-xs space-y-2">
                <div className="font-bold text-white text-xs uppercase tracking-wider pb-2 border-b border-white/10 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#237FFB]" />
                  <span>Policy Sections</span>
                </div>
                <nav className="space-y-1 text-neutral-400 font-medium">
                  <a href="#privacy-1" className="block py-1 hover:text-[#237FFB] transition-colors truncate">1. Scope & Controller</a>
                  <a href="#privacy-2" className="block py-1 hover:text-[#237FFB] transition-colors truncate">2. Personal Data Collected</a>
                  <a href="#privacy-3" className="block py-1 hover:text-[#237FFB] transition-colors truncate">3. Purpose of Processing</a>
                  <a href="#privacy-4" className="block py-1 hover:text-[#237FFB] transition-colors truncate">4. KRA & CKYC Sharing</a>
                  <a href="#privacy-5" className="block py-1 hover:text-[#237FFB] transition-colors truncate">5. Cookies & Telemetry</a>
                  <a href="#privacy-6" className="block py-1 hover:text-[#237FFB] transition-colors truncate">6. Security Measures</a>
                  <a href="#privacy-7" className="block py-1 hover:text-[#237FFB] transition-colors truncate">7. Data Retention (5 Yrs)</a>
                  <a href="#privacy-8" className="block py-1 hover:text-[#237FFB] transition-colors truncate">8. DPDP Principal Rights</a>
                  <a href="#privacy-9" className="block py-1 hover:text-[#237FFB] transition-colors truncate">9. Grievance Redressal</a>
                </nav>

                <div className="pt-3 border-t border-white/10">
                  <a
                    href="#privacy-9"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3AA17E] hover:underline"
                  >
                    <span>Contact DPO</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* DETAILED CONTENT */}
            <div className="lg:col-span-3 space-y-10 text-neutral-300 text-sm sm:text-base leading-relaxed">
              
              {/* SECTION 1 */}
              <article id="privacy-1" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">1</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Scope & Data Fiduciary Details
                  </h2>
                </div>
                <p>
                  Under the Digital Personal Data Protection Act, 2023 (DPDP Act), <strong className="text-white">{BRAND_INFO.legalEntity}</strong> serves as the <strong className="text-white">Data Fiduciary</strong> responsible for determining the purpose and means of processing personal data collected across our web portal (<span className="font-mono text-[#237FFB]">myadvisoralpha.com</span>, <span className="font-mono text-[#237FFB]">web.advisoralpha.in</span>), mobile applications (iOS and Android), and associated communication channels.
                </p>
                <p className="text-xs sm:text-sm text-neutral-400">
                  This policy applies to all prospective visitors, registered users, and active subscribers. By accessing our services or submitting any information, you acknowledge that you have reviewed and consented to the collection and processing described herein.
                </p>
              </article>

              {/* SECTION 2 */}
              <article id="privacy-2" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">2</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Categories of Personal Data Collected
                  </h2>
                </div>
                <p>
                  We collect only the personal information strictly necessary to fulfill our statutory obligations as a SEBI-registered Research Analyst and to deliver advisory services:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#237FFB]" />
                      <span>A. Mandatory Regulatory Identity & KYC Data</span>
                    </h3>
                    <p className="text-neutral-300">
                      In accordance with SEBI Master Circulars, PMLA, and exchange directives, we collect and verify: Full Legal Name, Date of Birth, Gender, Father&apos;s/Spouse&apos;s Name, Permanent Account Number (PAN), Central KYC Registry (CKYC) identifier, and masked Aadhaar verification tokens fetched via authorized UIDAI-compliant offline XML / DigiLocker mechanisms.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#3AA17E]" />
                      <span>B. Contact & Communication Details</span>
                    </h3>
                    <p className="text-neutral-300">
                      Mobile telephone number (for OTP verification and research alerts), primary email address, permanent and correspondence residential address, state, pin code, and user communication preferences.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#F59E0B]" />
                      <span>C. Financial Profile & Billing Records</span>
                    </h3>
                    <p className="text-neutral-300">
                      Investment horizon, portfolio size range (&lt; ₹1L, ₹1L–₹5L, ₹5L–₹25L, &gt; ₹25L), investment objective, subscription plan details, GSTIN (for corporate invoicing), bank account IFSC and last 4 digits (for refund verification), payment transaction IDs, and invoice records. <em>Note: Sensitive card credentials and net banking passwords are never accessed, handled, or stored by our servers.</em>
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#EC6446]" />
                      <span>D. Technical & Device Telemetry</span>
                    </h3>
                    <p className="text-neutral-300">
                      IP address, operating system, device hardware model, browser user agent, login timestamps, session identifiers, screen resolution, and error logs collected automatically to guarantee security and prevent account sharing.
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 3 */}
              <article id="privacy-3" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">3</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Legal Basis & Purpose of Data Processing
                  </h2>
                </div>
                <p>
                  Under the DPDP Act, 2023, we process your personal data under the lawful grounds of <strong className="text-white">Consent</strong> and <strong className="text-white">Certain Legitimate Uses / Statutory Mandates</strong>:
                </p>
                <ul className="space-y-2 list-none text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>Statutory SEBI & PMLA Mandate:</strong> Conducting mandatory KYC authentication, client onboarding verification, and audit trail maintenance as required under SEBI (Research Analysts) Regulations, 2014.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>Service Delivery:</strong> Dispatching real-time stock recommendations, multi-target profit alerts, trailing stop-losses, and model portfolio rebalancing advisories via SMS, WhatsApp, and push notifications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>Billing & Tax Compliance:</strong> Generating GST-compliant tax invoices, processing subscription renewals, and verifying payment transactions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3AA17E] shrink-0 mt-0.5" />
                    <span><strong>Security & Fraud Prevention:</strong> Identifying multi-device simultaneous logins, mitigating credential stuffing, and safeguarding research intellectual property against unauthorized leaks.</span>
                  </li>
                </ul>
              </article>

              {/* SECTION 4 */}
              <article id="privacy-4" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">4</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    KRA, CKYC & Authorized Regulatory Disclosures
                  </h2>
                </div>
                <p>
                  {BRAND_INFO.legalEntity} guarantees that your personal data is never sold, rented, or leased to third parties. We disclose your information only to authorized regulatory bodies and certified technology intermediaries:
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">1. KYC Registration Agencies (KRAs) & CKYCR:</strong> We query and exchange KYC status with CVL KRA, NDML KRA, DotEx KRA, CAMS KRA, Karvy KRA, and the Central KYC Registry (CERSAI) to validate client identification.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">2. Regulatory & Judicial Authorities:</strong> Data is disclosed to SEBI, Bombay Stock Exchange (BSE), National Stock Exchange (NSE), Financial Intelligence Unit (FIU-IND), Income Tax Department, or law enforcement agencies when mandated by statutory summons or valid legal process.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">3. RBI-Authorized Payment Gateways:</strong> Transaction identifiers and payment amounts are shared with Razorpay / Cashfree under secure, tokenized SSL channels to fulfill subscription billing.
                  </div>
                </div>
              </article>

              {/* SECTION 5 */}
              <article id="privacy-5" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">5</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Cookies, Web Telemetry & Tracking Technologies
                  </h2>
                </div>
                <p>
                  Our platform uses first-party cookies and modern local storage mechanisms strictly for:
                </p>
                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm pl-2">
                  <li><strong className="text-white">Essential Authentication Cookies:</strong> Maintaining active session state and preventing Cross-Site Request Forgery (CSRF) on <span className="font-mono text-neutral-200">web.advisoralpha.in</span>.</li>
                  <li><strong className="text-white">User Preferences:</strong> Storing display preferences (such as dark mode theme and calculator values).</li>
                  <li><strong className="text-white">Security & Rate Limiting:</strong> Monitoring request volume from IP addresses to thwart distributed denial-of-service (DDoS) and bot attacks.</li>
                </ul>
                <p className="text-xs text-neutral-400">
                  We do not deploy invasive third-party cross-site advertising trackers or social media tracking pixels that compromise your financial browsing privacy. You may configure your web browser to block or alert you about cookies; however, disabling essential session cookies will prevent login to the client portal.
                </p>
              </article>

              {/* SECTION 6 */}
              <article id="privacy-6" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">6</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Security Safeguards & Architecture
                  </h2>
                </div>
                <p>
                  We deploy defense-in-depth technical, cryptographic, and operational safeguards to protect your personal and financial data against loss, misuse, or unauthorized access:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-[#237FFB]" />
                      <span>Data in Transit</span>
                    </div>
                    <p className="text-neutral-400">
                      Encrypted with modern TLS 1.3 cryptographic suites using 256-bit certificates across all web and mobile endpoints.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-[#3AA17E]" />
                      <span>Data at Rest</span>
                    </div>
                    <p className="text-neutral-400">
                      All database volumes, PAN records, and user files are encrypted utilizing AES-256 with automated key rotation.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-[#EC6446]" />
                      <span>Access Governance</span>
                    </div>
                    <p className="text-neutral-400">
                      Strict role-based access control (RBAC), multi-factor authentication (MFA), and zero-trust engineering protocols.
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                      <span>Vulnerability Audits</span>
                    </div>
                    <p className="text-neutral-400">
                      Periodic VAPT (Vulnerability Assessment & Penetration Testing) conducted by CERT-In empaneled security auditors.
                    </p>
                  </div>
                </div>
              </article>

              {/* SECTION 7 */}
              <article id="privacy-7" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">7</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Statutory Data Retention (SEBI 5-Year Requirement)
                  </h2>
                </div>
                <p>
                  Under Regulation 24 of the SEBI (Research Analysts) Regulations, 2014 and the Prevention of Money Laundering (Maintenance of Records) Rules, 2005, a registered Research Analyst is statutorily mandated to preserve all client records, KYC documentations, research reports disseminated, client communications, and grievance correspondence for a <strong className="text-white">minimum period of five (5) years</strong> from the date of creation or cessation of client relationship.
                </p>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Even upon cancellation or expiry of a subscription, your KYC and regulatory records will remain safely archived until the completion of the statutory 5-year retention period, after which they will be permanently and securely purged using cryptographic erasure.
                </p>
              </article>

              {/* SECTION 8 */}
              <article id="privacy-8" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">8</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Your Rights as a Data Principal under DPDP Act, 2023
                  </h2>
                </div>
                <p>
                  As an individual whose personal data is processed by {BRAND_INFO.brandDisplayName}, you possess the following statutory rights under Chapter III of the DPDP Act, 2023:
                </p>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">Right to Access Information:</strong> You may request a summary of your personal data processed, details of third parties with whom data has been shared, and any other relevant processing details.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">Right to Correction & Updating:</strong> You have the right to correct inaccurate or misleading personal data and update outdated KYC information.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">Right to Erasure:</strong> You may request deletion of your personal data when it is no longer necessary for the purpose collected, subject always to our statutory SEBI/PMLA 5-year retention obligation.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">Right of Grievance Redressal:</strong> You may lodge a data privacy grievance with our designated Data Protection Officer, detailed below.
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <strong className="text-white">Right to Nominate:</strong> You have the right to nominate any individual to exercise your privacy rights in the unfortunate event of death or incapacity.
                  </div>
                </div>
              </article>

              {/* SECTION 9 */}
              <article id="privacy-9" className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">9</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Grievance Redressal Officer & Data Protection Contact
                  </h2>
                </div>
                <p>
                  If you have any questions, wish to exercise your statutory rights as a Data Principal under the DPDP Act, or have a grievance concerning data privacy, please contact our designated Grievance & Compliance Officer:
                </p>
                
                <div className="bg-gradient-to-r from-black/60 to-black/30 border border-[#237FFB]/30 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <div className="text-base font-bold text-white">Ms. Nidhi Kamani</div>
                      <div className="text-neutral-400">Compliance & Grievance Redressal Officer</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#237FFB]/20 text-[#237FFB] text-xs font-semibold">
                      Level 3 Escalation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-300">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#237FFB] shrink-0" />
                        <span>Email: <a href={`mailto:${BRAND_INFO.contact.supportEmail}`} className="text-white underline">{BRAND_INFO.contact.supportEmail}</a></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#3AA17E] shrink-0" />
                        <span>Grievance Email: <a href={`mailto:${BRAND_INFO.contact.complianceEmail}`} className="text-white underline">{BRAND_INFO.contact.complianceEmail}</a></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <span>Telephone: <a href={`tel:${BRAND_INFO.contact.phone}`} className="text-white underline">{BRAND_INFO.contact.phone}</a></span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#EC6446] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {BRAND_INFO.contact.registeredAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span>Working Hours: {BRAND_INFO.contact.workingHours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400">
                  We acknowledge all privacy inquiries within 48 business hours and resolve complaints within a maximum of 21 business days in accordance with SEBI guidelines and our{' '}
                  <Link href="/legal/grievance-redressal-escalation-matrix" className="text-[#237FFB] underline">
                    Escalation Matrix
                  </Link>.
                </p>
              </article>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
