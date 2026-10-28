'use client';

// Stock ideas performance, laid out like the Single Stocks screen in the app

import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Eye, Lock } from 'lucide-react';

type Term = 'Short Term' | 'Mid Term' | 'Long Term';

interface ClosedIdea {
  name: string;
  symbol: string;
  term: Term;
  entry: { action: string; time: string; price: string };
  exit: { action: string; time: string; price: string };
  // Net % move after exit; negative for a loss
  netPct: number;
}

const PERFORMANCE = [
  { label: 'Hit Rate', value: '76.6%' },
  { label: 'Avg Upside', value: '9.6%' },
  { label: 'Avg Duration', value: '79 days' },
];

const LIVE_COUNT = 47;
const PAST_COUNT = 145;

// Latest closed ideas, as published in the app
const CLOSED_IDEAS: ClosedIdea[] = [
  {
    name: 'Cyient',
    symbol: 'CYIENT',
    term: 'Short Term',
    entry: { action: 'Sell', time: '12:23 PM, 23/10/26', price: '₹1144' },
    exit: { action: 'Exit full', time: '06:06 PM, 23/10/26', price: '₹1169' },
    netPct: -2.2,
  },
  {
    name: 'Texmaco Rail',
    symbol: 'TEXRAIL',
    term: 'Long Term',
    entry: { action: 'Sell', time: '10:56 AM, 22/10/26', price: '₹105' },
    exit: { action: 'Exit full', time: '05:27 PM, 22/10/26', price: '₹85' },
    netPct: 18.7,
  },
];

const TERMS: Array<'All' | Term> = ['All', 'Short Term', 'Mid Term', 'Long Term'];

const WEB_APP_URL = 'https://web.advisoralpha.in/#/login';

export default function StockTrackRecord({ subscribeUrl }: { subscribeUrl: string }) {
  const [tab, setTab] = useState<'live' | 'past'>('past');
  const [term, setTerm] = useState<'All' | Term>('All');

  const ideas = term === 'All' ? CLOSED_IDEAS : CLOSED_IDEAS.filter((idea) => idea.term === term);

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
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-extrabold">MyAdvisorAlpha Performance</h3>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SEBI regd.
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 rounded-2xl border-2 border-[#F5BA31]/80 py-4 sm:py-5">
            {PERFORMANCE.map((stat, i) => (
              <div key={stat.label} className={`text-center px-1.5 sm:px-2 ${i > 0 ? 'border-l-2 border-[#F5BA31]/70' : ''}`}>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                <div className="mt-1 text-xl sm:text-3xl font-extrabold text-[#F5BA31] whitespace-nowrap">{stat.value}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs sm:text-sm text-white/75">Returns based on all positive & negative closed trades.</p>
        </div>

        {/* Live / Past switch */}
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-neutral-200 p-1" role="tablist" aria-label="Idea status">
          {([
            { key: 'live', label: 'Live', count: LIVE_COUNT },
            { key: 'past', label: 'Past', count: PAST_COUNT },
          ] as const).map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={`rounded-full py-2.5 text-base font-bold transition-colors ${
                  active ? 'bg-[#164198] text-white' : 'text-[#081026] hover:bg-neutral-100'
                }`}
              >
                {t.label}{' '}
                <span className={`ml-1 text-sm ${active ? 'text-white/70' : t.key === 'live' ? 'text-emerald-600' : 'text-neutral-500'}`}>
                  • {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {tab === 'past' ? (
          <>
            {/* Horizon filter */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2" role="radiogroup" aria-label="Idea horizon">
              {TERMS.map((t) => (
                <label key={t} className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base">
                  <input
                    type="radio"
                    name="track-term"
                    checked={term === t}
                    onChange={() => setTerm(t)}
                    className="appearance-none w-[18px] h-[18px] rounded-full border-2 border-[#164198]/70 bg-white checked:border-[5px] checked:border-[#164198] cursor-pointer transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164198]"
                  />
                  <span className={term === t ? 'font-semibold text-[#081026]' : 'text-neutral-500'}>{t}</span>
                </label>
              ))}
            </div>

            {/* Closed ideas */}
            <div className="mt-5 space-y-4">
              {ideas.map((idea) => {
                const gain = idea.netPct >= 0;
                return (
                  <article key={idea.symbol} className="rounded-2xl border border-[#164198]/15 bg-[#F3F6FC] p-2">
                    <div className="rounded-xl bg-white p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg border border-neutral-200 flex items-center justify-center text-[10px] font-extrabold text-[#081026] shrink-0">
                            {idea.symbol.slice(0, 4)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-[#081026] leading-tight">{idea.name}</h4>
                            <p className="text-sm text-neutral-500">{idea.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-xs font-semibold text-[#B88714] bg-[#FBF1D6] rounded px-2 py-0.5">{idea.term}</span>
                          {gain && <p className="mt-1.5 text-sm font-semibold text-emerald-600">Profit booked</p>}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-[1fr_1.4fr_1fr] gap-x-3 text-[11px] font-semibold tracking-wider uppercase text-neutral-500 border-b border-neutral-200 pb-2">
                        <span>Action</span>
                        <span className="text-center">Date</span>
                        <span className="text-right">Price</span>
                      </div>
                      {[idea.entry, idea.exit].map((row) => (
                        <div key={row.action} className="mt-2 grid grid-cols-[1fr_1.4fr_1fr] gap-x-3 items-center">
                          <span className="text-sm sm:text-base text-[#081026]">{row.action}</span>
                          <span className="text-xs text-neutral-500 text-center">{row.time}</span>
                          <span className="text-sm sm:text-base font-bold text-[#081026] text-right">{row.price}</span>
                        </div>
                      ))}

                      <div
                        className={`mt-4 rounded-lg py-2.5 text-center text-sm font-semibold ${
                          gain ? 'bg-emerald-600 text-white' : 'border border-rose-200 bg-rose-50 text-rose-600'
                        }`}
                      >
                        Net {gain ? 'gain' : 'loss'}: {Math.abs(idea.netPct)}%
                      </div>
                    </div>
                  </article>
                );
              })}
              {ideas.length === 0 && (
                <p className="rounded-2xl border border-dashed border-neutral-300 py-8 text-center text-sm text-neutral-500">
                  No {term.toLowerCase()} ideas in this preview. See every closed idea in the app.
                </p>
              )}
            </div>

            <div className="mt-6 text-center">
              <a
                href={WEB_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#164198] hover:bg-[#12357d] text-white text-sm font-bold px-6 py-3 rounded-xl active:scale-95 transition-all"
              >
                <Eye className="w-4 h-4" /> View all {PAST_COUNT} closed ideas <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#164198]/15 bg-[#F3F6FC] p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#164198]" />
            </div>
            <h4 className="mt-4 text-lg font-bold text-[#081026]">{LIVE_COUNT} live ideas open right now</h4>
            <p className="mt-1 text-sm text-neutral-600">Live entry, target and stop-loss levels are for subscribers.</p>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold px-6 py-3 rounded-xl active:scale-95 transition-all"
            >
              Subscribe to see live ideas <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        <p className="mt-6 text-[11px] leading-relaxed text-neutral-500 text-center">
          Past performance is not indicative of future returns. Figures cover all closed stock ideas, both profitable and loss-making.
          Investment in securities market are subject to market risks.
        </p>
      </div>
    </section>
  );
}
