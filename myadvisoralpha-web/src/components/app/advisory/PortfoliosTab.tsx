'use client';

import { useState } from 'react';
import { Info, ShieldCheck, Sprout, Gem, Rocket, Check, ArrowUpRight } from 'lucide-react';
import { PORTFOLIOS, PORTFOLIO_PLANS, APP_LINKS, APP_USER, GST_PERCENT, rupees, monthsLabel, type Portfolio } from '@/data/app';
import { cn } from '@/lib/utils';
import { Card, Sheet, Disclaimer, goldBtn, mono, GAIN, LOSS } from '../ui';

const ICONS: Record<string, typeof Sprout> = {
  'alpha-beginner': Sprout,
  'alpha-prime': ShieldCheck,
  'alpha-allrounder': Gem,
  'alpha-emerging-leaders': Rocket,
};

const RISK: Record<string, string> = { Low: 'bg-[#E3F5E7] text-[#1E7A35]', Medium: 'bg-[#FFF6E3] text-[#9A6B12]', High: 'bg-[#FDECEC] text-[#B02121]' };

export default function PortfoliosTab() {
  const [detail, setDetail] = useState<Portfolio | null>(null);
  const [amountInfo, setAmountInfo] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mx-0.5 mb-3 text-base font-bold text-[#6B7381]">{APP_USER.portfolioPlan ? 'Your subscriptions' : 'Model portfolios'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PORTFOLIOS.map((p) => {
            const Icon = ICONS[p.slug] ?? Gem;
            return (
              <article key={p.id} className="bg-white border border-[#1E3A8A] rounded-[14px] px-4 py-3.5 flex flex-col">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E8EBF0]">
                  <div className="flex flex-col items-start gap-1.5 min-w-0">
                    <span className={cn('text-[10.5px] font-extrabold tracking-[0.06em] uppercase rounded-md px-2 py-[3px]', RISK[p.riskLevel])}>{p.riskLevel} risk</span>
                    <span className="text-[17px] font-extrabold tracking-[-0.01em]">{p.name}</span>
                    <span className="text-[13.5px] font-medium text-[#8B93A1]">{p.tagline} · since {p.launchDate}</span>
                  </div>
                  <span className="w-11 h-11 flex-none flex items-center justify-center text-[#1E3A8A]"><Icon className="w-[30px] h-[30px]" /></span>
                </div>
                <div className="flex justify-between items-start gap-3 py-3 border-b border-[#E8EBF0]">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setAmountInfo(true)} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1E3A8A]">Recommended amount<Info className="w-[13px] h-[13px]" /></button>
                    <span className={cn(mono, 'text-base font-semibold text-[#279D46]')}>{rupees(p.minInvestment)}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[13.5px] font-semibold text-[#1E3A8A]">{p.cagr ? 'CAGR' : 'Return since launch'}</span>
                    <span className={cn(mono, 'text-base font-semibold')} style={{ color: (p.cagr ?? p.absoluteReturn) >= 0 ? GAIN : LOSS }}>
                      {p.cagr ? `${p.cagr.toFixed(2)}%` : `${p.absoluteReturn > 0 ? '+' : ''}${p.absoluteReturn.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3">
                  <span className="text-[12.5px] font-semibold text-[#6B7381]">{p.stockCount} stocks{p.cagr ? ` · ${p.absoluteReturn.toFixed(0)}% absolute return` : ''}</span>
                  <button onClick={() => setDetail(p)} className="h-10 min-w-[128px] px-5 border-[1.5px] border-[#1E3A8A] rounded-[10px] bg-white text-[14.5px] font-extrabold text-[#1E3A8A] hover:bg-[#EEF3FE]">Invest</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mx-0.5 mb-3 text-base font-bold text-[#6B7381]">Portfolio plans</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {PORTFOLIO_PLANS.map((plan, i) => {
            const best = plan.durations[plan.durations.length - 1];
            const premium = i === PORTFOLIO_PLANS.length - 1;
            return (
              <Card key={plan.id} className={cn('p-5 flex flex-col gap-4', premium && 'bg-[linear-gradient(140deg,#1E2A4A_0%,#0B1320_70%)] text-white border-[#F5BA31]/60')}>
                <div className="flex items-center justify-between">
                  <span className={cn('text-[11px] font-extrabold tracking-[0.14em] uppercase', premium ? 'text-[#F5BA31]' : 'text-[#154198]')}>{plan.tag}</span>
                  <span className={cn('text-xs font-semibold', premium ? 'text-white/60' : 'text-[#6B7381]')}>{plan.access}</span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-[-0.02em]">{plan.name}</h3>
                  <p className={cn('text-[13px] mt-1', premium ? 'text-white/70' : 'text-[#4A525F]')}>{plan.whoItsFor}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {plan.whatYouGet.map((w) => (
                    <li key={w} className="flex gap-2 text-[13px] leading-snug"><Check className={cn('w-4 h-4 flex-none mt-0.5', premium ? 'text-[#F5BA31]' : 'text-[#279D46]')} />{w}</li>
                  ))}
                </ul>
                <div className={cn('mt-auto rounded-xl p-3 flex flex-col gap-1.5', premium ? 'bg-white/[0.06]' : 'bg-[#F3F5FB]')}>
                  {plan.durations.map((d) => (
                    <div key={d.months} className="flex items-baseline justify-between text-sm">
                      <span className="font-semibold">{monthsLabel(d.months)}</span>
                      <span><s className={cn('text-xs mr-1.5', premium ? 'text-white/40' : 'text-[#8D95A3]')}>{rupees(d.originalPrice)}</s><span className={cn(mono, 'font-semibold')}>{rupees(d.price)}</span></span>
                    </div>
                  ))}
                </div>
                <a href={APP_LINKS.portfolioCheckout(plan.id)} target="_blank" rel="noopener noreferrer" className={cn(goldBtn, 'h-11 text-sm')}>
                  Subscribe from {rupees(Math.round(best.price / best.months))}/mo<ArrowUpRight className="w-4 h-4" />
                </a>
              </Card>
            );
          })}
        </div>
      </section>

      <Disclaimer>Prices exclude {GST_PERCENT}% GST. CAGR and returns are of the model portfolio since launch; Alpha Beginner and Alpha Emerging Leaders have less than a year of history. Past performance may or may not be sustained in the future. Investment in securities market are subject to market risks.</Disclaimer>

      <Sheet open={amountInfo} onClose={() => setAmountInfo(false)} eyebrow="Portfolios" title="Recommended amount">
        <p className="text-sm leading-relaxed text-[#2C3550]">The smallest amount that lets you buy every stock in the model portfolio at its recommended weight. Investing less can leave some stocks out or skew the weights.</p>
      </Sheet>

      <Sheet open={!!detail} onClose={() => setDetail(null)} eyebrow={detail?.tagline} title={detail?.name ?? ''}>
        {detail && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2 bg-[#F3F5FB] rounded-xl p-3">
              <div><div className="text-xs text-[#5B6478]">Min. amount</div><div className="text-[15px] font-bold">{rupees(detail.minInvestment)}</div></div>
              <div><div className="text-xs text-[#5B6478]">Stocks</div><div className="text-[15px] font-bold">{detail.stockCount}</div></div>
              <div><div className="text-xs text-[#5B6478]">Risk</div><div className="text-[15px] font-bold">{detail.riskLevel}</div></div>
            </div>
            <div><h3 className="text-sm font-extrabold mb-1">Investment strategy</h3><p className="text-sm leading-relaxed text-[#2C3550]">{detail.strategy}</p></div>
            <div><h3 className="text-sm font-extrabold mb-1">Ideal for</h3><p className="text-sm leading-relaxed text-[#2C3550]">{detail.idealFor}</p></div>
            <div>
              <h3 className="text-sm font-extrabold mb-2">Included in</h3>
              <div className="flex flex-col gap-2">
                {PORTFOLIO_PLANS.filter((pl) => detail.planIds.includes(pl.id)).map((pl) => (
                  <a key={pl.id} href={APP_LINKS.portfolioCheckout(pl.id)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-[#DCE2F2] px-3.5 py-3 hover:border-[#154198]">
                    <span><span className="block text-sm font-bold">{pl.name}</span><span className="text-xs text-[#6B7381]">from {rupees(Math.min(...pl.durations.map((d) => d.price)))}</span></span>
                    <ArrowUpRight className="w-4 h-4 text-[#154198]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
