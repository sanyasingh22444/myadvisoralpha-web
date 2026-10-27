'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, MinusCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ComparisonRow {
  id: string;
  feature: string;
  advisorAlpha: string;
  brokers: string;
  tips: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'sebi-registration',
    feature: 'SEBI registered',
    advisorAlpha: 'Yes, RA INH000021818',
    brokers: 'Broker licence',
    tips: 'Not registered',
  },
  {
    id: 'research',
    feature: 'Research',
    advisorAlpha: 'Led by Pankaj Murarka',
    brokers: 'Generic reports',
    tips: 'Hype & rumours',
  },
  {
    id: 'trade-plan',
    feature: 'Entry, target & stop-loss',
    advisorAlpha: 'On every call',
    brokers: 'Unclear rating',
    tips: 'No exit plan',
  },
  {
    id: 'fees',
    feature: 'How they earn',
    advisorAlpha: 'Flat fee',
    brokers: 'Brokerage on every trade',
    tips: 'Paid promotions',
  },
  {
    id: 'support',
    feature: 'Support',
    advisorAlpha: 'Phone & grievance desk',
    brokers: 'Chatbot queues',
    tips: 'None',
  },
];

interface ComparisonGridProps {
  onOpenConsultation?: () => void;
}

export default function ComparisonGrid({ onOpenConsultation }: ComparisonGridProps) {
  const [mobileTab, setMobileTab] = useState<'brokers' | 'tips'>('brokers');

  return (
    <section
      id="comparison"
      className="bg-white text-[#081026] py-16 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-20"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Research, <span className="text-[#C99512] whitespace-nowrap">not guesswork.</span>
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            See how MyAdvisorAlpha compares with brokers and unverified tips.
          </p>
        </div>

        {/* Mobile Tab Switcher (< sm screens) */}
        <div className="sm:hidden mb-4 bg-neutral-100 p-1 rounded-xl flex gap-1">
          {([
            { key: 'brokers', label: 'vs Brokers' },
            { key: 'tips', label: 'vs Unverified Tips' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMobileTab(tab.key)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                mobileTab === tab.key ? 'bg-[#081026] text-white shadow' : 'text-neutral-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th scope="col" className="p-3 sm:p-5 text-xs font-bold uppercase tracking-wider text-neutral-500 w-[34%] sm:w-[28%]">
                  Feature
                </th>
                <th scope="col" className="p-3 sm:p-5 bg-[#F5BA31] text-[#081026]">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide mb-1">
                    <ShieldCheck className="w-3 h-3" /> Recommended
                  </span>
                  <span className="block text-sm sm:text-lg font-extrabold">MyAdvisorAlpha</span>
                </th>
                <th
                  scope="col"
                  className={`p-3 sm:p-5 text-sm sm:text-base font-bold text-neutral-800 ${mobileTab === 'brokers' ? '' : 'hidden sm:table-cell'}`}
                >
                  Brokers
                </th>
                <th
                  scope="col"
                  className={`p-3 sm:p-5 text-sm sm:text-base font-bold text-neutral-800 ${mobileTab === 'tips' ? '' : 'hidden sm:table-cell'}`}
                >
                  Unverified Tips
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.id}>
                  <th scope="row" className="p-3 sm:p-5 font-semibold text-[#081026]">
                    {row.feature}
                  </th>
                  <td className="p-3 sm:p-5 bg-[#FFF6DC] font-semibold text-[#081026]">
                    <span className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      {row.advisorAlpha}
                    </span>
                  </td>
                  <td className={`p-3 sm:p-5 text-neutral-700 ${mobileTab === 'brokers' ? '' : 'hidden sm:table-cell'}`}>
                    <span className="flex items-start gap-2">
                      <MinusCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      {row.brokers}
                    </span>
                  </td>
                  <td className={`p-3 sm:p-5 text-neutral-700 ${mobileTab === 'tips' ? '' : 'hidden sm:table-cell'}`}>
                    <span className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      {row.tips}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold transition-all active:scale-95 shadow-md"
          >
            Start for ₹999/mo
            <ArrowRight className="w-4 h-4" />
          </a>
          {onOpenConsultation ? (
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#081026]/20 hover:border-[#081026]/40 text-[#081026] text-sm font-semibold transition-all active:scale-95"
            >
              Request Free Callback
            </button>
          ) : (
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-[#081026]/20 hover:border-[#081026]/40 text-[#081026] text-sm font-semibold transition-all"
            >
              Contact Advisory Desk
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
