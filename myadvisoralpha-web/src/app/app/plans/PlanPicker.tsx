'use client';

import { useState } from 'react';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { STOCK_PLAN, APP_LINKS, APP_USER, GST_PERCENT, rupees, monthsLabel } from '@/data/app';
import { cn } from '@/lib/utils';
import { goldBtn, mono } from '@/components/app/styles';

export default function PlanPicker() {
  const [months, setMonths] = useState(12);
  const sel = STOCK_PLAN.durations.find((d) => d.months === months)!;
  const monthly = STOCK_PLAN.durations.find((d) => d.months === 1)!;

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-[#081026] text-white border border-[#F5BA31]/60 p-5 sm:p-7">
      <div aria-hidden className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#F5BA31]/12 blur-[90px]" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#F5BA31]">{STOCK_PLAN.tag}</span>
          <h2 className="mt-1 text-[28px] font-extrabold tracking-[-0.02em]">{STOCK_PLAN.name}</h2>
          <p className="mt-1 text-sm text-white/70">{STOCK_PLAN.whoItsFor}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {STOCK_PLAN.whatYouGet.map((w) => <li key={w} className="flex gap-2.5 text-sm"><Check className="w-4 h-4 mt-0.5 text-[#F5BA31] flex-none" />{w}</li>)}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div role="radiogroup" aria-label="Plan duration" className="flex flex-col gap-2.5">
            {STOCK_PLAN.durations.map((d) => {
              const on = d.months === months;
              const current = APP_USER.stockPlan.durationMonths === d.months;
              const save = Math.round((1 - d.price / (monthly.price * d.months)) * 100);
              return (
                <button key={d.months} role="radio" aria-checked={on} onClick={() => setMonths(d.months)}
                  className={cn('relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors', on ? 'border-[#F5BA31] bg-[#F5BA31]/10' : 'border-white/15 bg-white/[0.03] hover:border-white/30')}>
                  <span className={cn('w-5 h-5 rounded-full border-2 flex-none', on ? 'border-[#F5BA31] bg-[radial-gradient(circle,#F5BA31_40%,transparent_45%)]' : 'border-white/40')} />
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-extrabold">{monthsLabel(d.months)}
                      {d.months === 12 && <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#081026] bg-[#F5BA31] rounded-full px-2 py-0.5"><Sparkles className="w-3 h-3" />6 months free</span>}
                      {current && <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0E7F58] bg-[#C9F5E4] rounded-full px-2 py-0.5">Current</span>}
                    </span>
                    <span className="text-xs text-white/55">{d.months > 1 ? `${rupees(Math.round(d.price / d.months))}/month · save ${save}% vs monthly` : 'Billed monthly'}</span>
                  </span>
                  <span className="text-right">
                    <s className="block text-xs text-white/40">{rupees(d.originalPrice)}</s>
                    <span className={cn(mono, 'text-lg font-semibold')}>{rupees(d.price)}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <a href={APP_LINKS.stockCheckout} target="_blank" rel="noopener noreferrer" className={cn(goldBtn, 'h-12 text-[15px] mt-1')}>
            {APP_USER.stockPlan.status === 'ACTIVE' ? 'Renew' : 'Subscribe'} for {rupees(sel.price)} + GST<ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-white/45 text-center">{GST_PERCENT}% GST added at checkout. Secure payment via Razorpay.</p>
        </div>
      </div>
    </div>
  );
}
