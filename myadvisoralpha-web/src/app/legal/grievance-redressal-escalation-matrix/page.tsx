import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_INFO } from '@/data/brand';
import { GRIEVANCE_LEVELS, REGULATORY_INFO } from '@/data/legal';
import {
  ShieldCheck,
  Users,
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Building2,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Investor Grievance Redressal & Escalation Matrix | ${BRAND_INFO.brandDisplayName}`,
  description: `Official 5-tier Investor Grievance Redressal Escalation Matrix for ${BRAND_INFO.brandDisplayName} (${BRAND_INFO.legalEntity}, SEBI RA: ${BRAND_INFO.sebiRegNo}). Turnaround times, officer contacts, SEBI SCORES, and Smart ODR dispute resolution.`,
  keywords: [
    'Grievance Redressal Matrix',
    'Escalation Matrix',
    'SEBI SCORES Portal',
    'Smart ODR Portal',
    'Advisor Alpha Compliance Officer',
    'Nidhi Kamani Compliance',
    'Rishabh Solanki Customer Care',
  ],
};

export default function GrievanceRedressalPage() {
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
            <span className="text-[#237FFB] font-medium">Grievance Escalation Matrix</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA17E]/10 border border-[#3AA17E]/30 text-[#3AA17E] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEBI Mandated Escalation Matrix</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/10 border border-[#237FFB]/30 text-[#237FFB] text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>21-Day Statutory Resolution Timeline</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono">
              SEBI RA: {BRAND_INFO.sebiRegNo}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Investor Grievance Redressal Escalation Matrix
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl mb-4">
            Published in strict compliance with SEBI Master Circulars for Research Analysts. At <strong className="text-white">{BRAND_INFO.legalEntity}</strong> (<strong className="text-white">{BRAND_INFO.brandDisplayName}</strong>), client grievances are addressed systematically through our official <strong className="text-white">5-Tier Internal Escalation Hierarchy</strong>, backed by independent SEBI SCORES and Smart ODR platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-2 border-t border-white/10 font-mono">
            <span>Entity: {BRAND_INFO.legalEntity}</span>
            <span>•</span>
            <span>CIN: {BRAND_INFO.cin}</span>
            <span>•</span>
            <span>Working Hours: {BRAND_INFO.contact.workingHours}</span>
          </div>
        </div>
      </section>

      {/* 4 STATS HIGHLIGHT CARDS */}
      <section className="bg-[#0B0E14] border-b border-[#2A2A2A] py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#237FFB]">5 Tiers</div>
              <div className="text-xs text-neutral-400 mt-1">Structured Hierarchy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#3AA17E]">21 Days</div>
              <div className="text-xs text-neutral-400 mt-1">Maximum Statutory SLA</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-neutral-400 mt-1">Resolved Complaints Rate</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#EC6446]">0 Pending</div>
              <div className="text-xs text-neutral-400 mt-1">Month Ending Sep 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* SECTION 1: OFFICIAL 5-TIER ESCALATION TABLE */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#237FFB] mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Statutory Grievance Hierarchy</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Official 5-Tier Escalation Table
                </h2>
              </div>
              <div className="text-xs text-neutral-400">
                Please escalate sequentially from Level 1 to Level 5.
              </div>
            </div>

            {/* Responsive Table Container */}
            <div className="bg-[#0B0E14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-4 px-4 sm:px-6 text-center w-20">Level</th>
                      <th className="py-4 px-4">Designation</th>
                      <th className="py-4 px-4">Contact Person</th>
                      <th className="py-4 px-4">Contact Number</th>
                      <th className="py-4 px-4">Email Address</th>
                      <th className="py-4 px-4 text-center">Turnaround Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {GRIEVANCE_LEVELS.map((item) => (
                      <tr 
                        key={item.level} 
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Level Badge */}
                        <td className="py-4 px-4 sm:px-6 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${
                            item.level === 1 
                              ? 'bg-[#237FFB]/20 text-[#237FFB] border border-[#237FFB]/40'
                              : item.level === 2
                              ? 'bg-[#3AA17E]/20 text-[#3AA17E] border border-[#3AA17E]/40'
                              : item.level === 3
                              ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                              : item.level === 4
                              ? 'bg-[#EC6446]/20 text-[#EC6446] border border-[#EC6446]/40'
                              : 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                          }`}>
                            L{item.level}
                          </span>
                        </td>

                        {/* Designation */}
                        <td className="py-4 px-4 font-semibold text-white whitespace-nowrap">
                          {item.designation}
                        </td>

                        {/* Contact Person */}
                        <td className="py-4 px-4 whitespace-nowrap text-neutral-200">
                          {item.contactPerson}
                        </td>

                        {/* Contact Phone */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <a 
                            href={`tel:${item.phone.replace(/[^0-9+]/g, '')}`} 
                            className="text-neutral-300 hover:text-white underline font-mono flex items-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{item.phone}</span>
                          </a>
                        </td>

                        {/* Contact Email */}
                        <td className="py-4 px-4">
                          <a 
                            href={`mailto:${item.email}`} 
                            className="text-[#237FFB] hover:text-white underline font-mono flex items-center gap-1.5 break-all"
                          >
                            <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            <span>{item.email}</span>
                          </a>
                        </td>

                        {/* Turnaround Time */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium">
                            <Clock className="w-3 h-3 text-[#3AA17E]" />
                            <span>{item.turnaroundTime}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Common Office Address & Hours Strip */}
              <div className="p-4 sm:p-6 bg-black/40 border-t border-white/10 text-xs text-neutral-400 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#237FFB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-300">Common Office Address for all Levels:</strong>
                    <p className="mt-0.5 text-neutral-400">
                      {BRAND_INFO.contact.registeredAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-neutral-300 font-mono">
                  <Clock className="w-4 h-4 text-[#3AA17E] shrink-0" />
                  <span>{BRAND_INFO.contact.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: 5-STEP RESOLUTION PROCESS WORKFLOW */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3AA17E] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sequential Process</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Step-by-Step Escalation Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#237FFB]/50 transition-all">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#237FFB]/20 text-[#237FFB] flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div className="font-bold text-white text-sm">Customer Care Desk</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    First point of contact for service queries, billing, and login assistance.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-[#237FFB] font-mono">
                  SLA: 2–3 Days
                </div>
              </div>

              <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#3AA17E]/50 transition-all">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#3AA17E]/20 text-[#3AA17E] flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div className="font-bold text-white text-sm">Head of Customer Care</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Escalate to Rishabh Solanki if Level 1 resolution is unsatisfactory or delayed.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-[#3AA17E] font-mono">
                  SLA: 5 Days
                </div>
              </div>

              <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#F59E0B]/50 transition-all">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div className="font-bold text-white text-sm">Compliance Officer</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Direct escalation to Ms. Nidhi Kamani for statutory compliance or regulatory disputes.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-[#F59E0B] font-mono">
                  SLA: 7 Days
                </div>
              </div>

              <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative group hover:border-[#EC6446]/50 transition-all">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#EC6446]/20 text-[#EC6446] flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <div className="font-bold text-white text-sm">Principal Officer</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Escalate to Mr. Nipun Jalan for unresolved operational deadlock.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-[#EC6446] font-mono">
                  SLA: 7 Days
                </div>
              </div>

              <div className="bg-[#0B0E14] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative group hover:border-purple-500/50 transition-all">
                <div className="space-y-2">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <div className="font-bold text-white text-sm">Director(s)</div>
                  <div className="text-xs text-neutral-400 leading-relaxed">
                    Highest internal review by Pankaj Murarka / Alok Sharma.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-purple-400 font-mono">
                  SLA: 10 Days
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: REGULATORY ESCALATION BEYOND 21 DAYS (SCORES & SMART ODR) */}
          <div className="bg-[#0B0E14] border border-[#237FFB]/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-[#237FFB]" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Regulatory Escalation Beyond 21 Calendar Days
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400">
                  If your grievance is not redressed within 21 calendar days or if you remain dissatisfied with the internal resolution:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SCORES CARD */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-[#237FFB] transition-colors">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#237FFB]/20 text-[#237FFB] text-xs font-bold uppercase tracking-wider">
                    SEBI SCORES 2.0
                  </div>
                  <h3 className="text-lg font-bold text-white">SEBI Complaints Redress System</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Investors can lodge complaints directly on the SEBI SCORES portal. All complaints are tracked by SEBI with mandatory action taken reporting (ATR) by the Research Analyst.
                  </p>
                  <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                    <li>Centralized online tracking with SEBI registration</li>
                    <li>Two-level review by designated authorities</li>
                    <li>Mobile app available on Apple App Store & Google Play</li>
                  </ul>
                </div>

                <a
                  href={REGULATORY_INFO.scoresPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#237FFB] hover:bg-[#1A6DE0] text-white font-bold text-xs transition-colors shadow-lg"
                >
                  <span>Lodge Complaint on SEBI SCORES</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* SMART ODR CARD */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-[#3AA17E] transition-colors">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3AA17E]/20 text-[#3AA17E] text-xs font-bold uppercase tracking-wider">
                    SMART ODR PORTAL
                  </div>
                  <h3 className="text-lg font-bold text-white">Online Dispute Resolution Platform</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Under SEBI Master Circular on Online Resolution of Disputes, investors may initiate independent conciliation and online arbitration through Market Infrastructure Institutions (MIIs).
                  </p>
                  <ul className="text-xs text-neutral-400 space-y-1 list-disc list-inside">
                    <li>Independent conciliation and arbitration</li>
                    <li>Time-bound dispute resolution by empaneled arbitrators</li>
                    <li>Legally binding enforceable resolution awards</li>
                  </ul>
                </div>

                <a
                  href={REGULATORY_INFO.smartOdrPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#3AA17E] hover:bg-[#328e6e] text-white font-bold text-xs transition-colors shadow-lg"
                >
                  <span>Initiate Dispute on Smart ODR</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* SEBI Regional Office Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-neutral-400" />
                <span>SEBI Regional Office (Headquarters & Western Regional Office):</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                {REGULATORY_INFO.regionalOfficeAddress}
              </p>
              <div className="pt-1 text-neutral-400">
                SEBI Toll-Free Investor Helpline: <strong className="text-white font-mono">1800 22 7575</strong> / <strong className="text-white font-mono">1800 266 7575</strong> (Available in 8 Indian Languages)
              </div>
            </div>
          </div>

          {/* SECTION 4: INSTRUCTIONS FOR FILING GRIEVANCES */}
          <div className="bg-[#0B0E14] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#237FFB]" />
              <span>Guidelines for Filing an Effective Grievance</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-300">
              <div className="space-y-2">
                <div className="font-semibold text-white">What to Include:</div>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-400">
                  <li>Full Registered Client Name and Mobile Number</li>
                  <li>Registered Email Address and PAN</li>
                  <li>Subscription Plan or Transaction ID (if billing related)</li>
                  <li>Detailed description of the issue or dispute</li>
                  <li>Supporting documents or screenshots</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-white">Escalation Protocol:</div>
                <ul className="space-y-1.5 list-disc list-inside text-neutral-400">
                  <li>Quote your original Level 1 Ticket ID when escalating</li>
                  <li>Allow the stipulated turnaround time before escalating to next level</li>
                  <li>Keep copies of all email correspondence</li>
                  <li>Access our monthly compliance disclosures at{' '}
                    <Link href="/legal/customer-complaints-and-disclosures" className="text-[#237FFB] underline">
                      Complaints Table
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
