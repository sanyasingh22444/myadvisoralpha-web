// Stock ideas performance, laid out like the Stocks screen in the app

import React from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';

const PERFORMANCE = [
  { label: 'Hit Rate', value: '76.6%' },
  { label: 'Avg Upside', value: '9.6%' },
  { label: 'Avg Duration', value: '79 days' },
];

// Past ideas screen of the web app; signed-out visitors see its sign-in first
const CLOSED_IDEAS_URL = 'https://web.advisoralpha.in/#/advisory/stocks/past-ideas';

export default function StockTrackRecord() {
  return (
    <section id="track-record" className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-12 scroll-mt-24 border-b border-neutral-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C99512]">Track record</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-[#081026]">
            Stocks <span className="text-[#C99512]">performance track</span>
          </h2>
          <p className="mt-3 text-base text-neutral-600">Every closed idea counts, the winners and the losses.</p>
        </div>

        {/* Performance summary */}
        <div className="rounded-3xl bg-[#081026] text-white p-5 sm:p-7 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold">MyAdvisorAlpha Performance</h3>
            <span className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SEBI Registered
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 rounded-2xl border border-[#F5BA31]/70 py-4 sm:py-5">
            {PERFORMANCE.map((stat, i) => (
              <div key={stat.label} className={`text-center px-1.5 sm:px-2 ${i > 0 ? 'border-l-2 border-[#F5BA31]/70' : ''}`}>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                <div className="mt-1 text-xl sm:text-3xl font-extrabold text-[#F5BA31] whitespace-nowrap">{stat.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
            <p className="text-xs sm:text-sm text-white/75 text-center sm:text-left">Returns based on all positive & negative closed trades, as of 3rd Nov 2026.</p>
            <a
              href={CLOSED_IDEAS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-[#F5BA31]/70 bg-[#F5BA31]/10 hover:bg-[#F5BA31] hover:text-[#081026] text-[#F5BA31] text-xs sm:text-sm font-bold px-3 py-1.5 active:scale-95 transition-all"
            >
              View closed ideas <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-neutral-500 text-center">
          Past performance is not indicative of future returns. Figures cover all closed stock ideas, both profitable and loss-making.
          Investment in securities market are subject to market risks.
        </p>
      </div>
    </section>
  );
}
