'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PortfolioCompact } from '../productCards';
import { Info, ShieldCheck, Sprout, Gem, Rocket, Check, ArrowUpRight, ChevronDown, ChevronRight, RefreshCw, Target, Quote, FileText } from 'lucide-react';
import { PORTFOLIOS, PORTFOLIO_PLANS, APP_LINKS, APP_USER, APP_REVIEWS, GST_PERCENT, rupees, monthsLabel, type Portfolio } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import { Card, Eyebrow, Sheet, Disclaimer, goldBtn, mono, GAIN, LOSS } from '../ui';

export const ICONS: Record<string, typeof Sprout> = {
  'alpha-beginner': Sprout,
  'alpha-prime': ShieldCheck,
  'alpha-allrounder': Gem,
  'alpha-emerging-leaders': Rocket,
};

const VOL: Record<Portfolio['riskLevel'], { label: string; cls: string }> = {
  Low: { label: 'Low volatility', cls: 'bg-[#E3F5E7] text-[#1E7A35]' },
  Medium: { label: 'Mid volatility', cls: 'bg-[#FFF6E3] text-[#9A6B12]' },
  High: { label: 'High volatility', cls: 'bg-[#FDECEC] text-[#B02121]' },
};

const headline = (p: Portfolio) =>
  p.cagr ? { label: 'CAGR', value: p.cagr } : { label: 'Since launch', value: p.absoluteReturn };

const FAQS: { q: string; a: string }[] = [
  { q: 'What are MyAdvisorAlpha portfolios?', a: `Model portfolios of stocks chosen and weighted by our research team led by ${BRAND_INFO.founder.name}. Every stock passes the same SQGARP™ framework as our single stock ideas.` },
  { q: 'How many portfolios are there?', a: `${PORTFOLIOS.length}: ${PORTFOLIOS.map((p) => `${p.name} (${p.tagline.toLowerCase()})`).join(', ')}.` },
  { q: 'Which plans are available?', a: PORTFOLIO_PLANS.map((p) => `${p.name}: ${p.access.toLowerCase()}, from ${rupees(Math.min(...p.durations.map((d) => d.price)))}`).join('. ') + `. Prices exclude ${GST_PERCENT}% GST.` },
  { q: 'How much do I need to start?', a: `The recommended amount is the smallest sum that buys every stock at its weight: ${PORTFOLIOS.map((p) => `${p.name} ${rupees(p.minInvestment)}`).join(', ')}.` },
  { q: 'How are portfolios updated?', a: 'The research team reviews each portfolio and sends rebalancing alerts with the reason why, so you see what changed (add, trim or exit) and why.' },
  { q: 'Do you place the trades for me?', a: `No. ${BRAND_INFO.brandDisplayName} is a SEBI-registered research analyst (${BRAND_INFO.sebiRegNo}), not a broker. You invest through your own broker; orders in the app go through the smallcase gateway.` },
];

export default function PortfoliosTab() {
  const [amountInfo, setAmountInfo] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-7">
      {/* Portfolio cards */}
      <section>
        <div className="flex items-end justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-extrabold tracking-[-0.02em]">{APP_USER.portfolioPlan ? 'Your portfolios' : 'Portfolios curated for you'}</h2>
            <p className="text-[13px] text-[#6B7381]">Built and tracked by our SEBI-registered research team</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          {PORTFOLIOS.map((p) => {
            const Icon = ICONS[p.slug] ?? Gem;
            return <PortfolioCompact key={p.id} p={p} icon={<Icon className="w-5 h-5" />} />;
          })}
        </div>
        <button onClick={() => setAmountInfo(true)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#6B7381] hover:text-[#154198]"><Info className="w-3.5 h-3.5" />What is the minimum amount?</button>
      </section>

      {/* Portfolio report */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#154198]" />
          <div>
            <Eyebrow>Portfolio report</Eyebrow>
            <h2 className="text-lg font-extrabold tracking-[-0.02em]">All four portfolios side by side</h2>
          </div>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead className="bg-[#F5F7FC] text-[11px] font-bold uppercase tracking-[0.06em] text-[#6B7381]">
                <tr>
                  <th className="px-4 py-3">Portfolio</th>
                  <th className="px-3 py-3">Launched</th>
                  <th className="px-3 py-3 text-right">Stocks</th>
                  <th className="px-3 py-3 text-right">Min. amount</th>
                  <th className="px-3 py-3 text-right">CAGR</th>
                  <th className="px-3 py-3 text-right">Return since launch</th>
                  <th className="px-4 py-3">Volatility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EBF0]">
                {PORTFOLIOS.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAFBFE]">
                    <td className="px-4 py-3"><Link href={`/app/portfolios/${p.slug}`} className="font-extrabold text-[#154198] hover:underline">{p.name}</Link><div className="text-[11.5px] text-[#8D95A3]">{p.tagline}</div></td>
                    <td className="px-3 py-3 whitespace-nowrap text-[#4A525F]">{p.launchDate}</td>
                    <td className={cn(mono, 'px-3 py-3 text-right')}>{p.stockCount}</td>
                    <td className={cn(mono, 'px-3 py-3 text-right')}>{rupees(p.minInvestment)}</td>
                    <td className={cn(mono, 'px-3 py-3 text-right font-semibold')} style={{ color: p.cagr ? GAIN : undefined }}>{p.cagr ? `${p.cagr.toFixed(2)}%` : '–'}</td>
                    <td className={cn(mono, 'px-3 py-3 text-right font-semibold')} style={{ color: p.absoluteReturn >= 0 ? GAIN : LOSS }}>{p.absoluteReturn > 0 ? '+' : ''}{p.absoluteReturn.toFixed(2)}%</td>
                    <td className="px-4 py-3"><span className={cn('text-[11px] font-extrabold rounded-md px-2 py-[3px] whitespace-nowrap', VOL[p.riskLevel].cls)}>{VOL[p.riskLevel].label}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 border-t border-[#E8EBF0] text-[11px] text-[#8D95A3]">Model portfolio performance. “–” means less than a year of history, so CAGR isn’t shown. Past performance may or may not be sustained in the future.</p>
        </Card>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            { icon: Target, title: 'Matched to your risk profile', body: 'From the low-volatility Alpha Beginner to mid & small-cap Emerging Leaders, pick the portfolio that fits your appetite.' },
            { icon: RefreshCw, title: 'Rebalancing with the reason why', body: 'Add, trim and exit calls when the research team changes a portfolio, each with the rationale.' },
            { icon: ShieldCheck, title: 'SQGARP™ screened', body: 'Every stock in a portfolio passes the same framework as our single stock picks.' },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <Card key={b.title} className="p-4 flex gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center flex-none"><Icon className="w-[18px] h-[18px]" /></span>
                <div><div className="text-sm font-extrabold">{b.title}</div><p className="text-[12.5px] text-[#4A525F] leading-snug mt-0.5">{b.body}</p></div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Plans */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold tracking-[-0.02em]">Portfolio plans</h2>
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

      {/* What investors say */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold tracking-[-0.02em]">What our investors say</h2>
        <div className="flex gap-3 overflow-x-auto snap-x pb-1 [scrollbar-width:none]">
          {APP_REVIEWS.map((r) => (
            <figure key={r.name} className="snap-start flex-none w-[260px] sm:w-[300px] rounded-2xl bg-white border border-[#93C5FD] p-4 flex flex-col gap-3">
              <Quote className="w-5 h-5 text-[#C98F1E]" />
              <blockquote className="text-[13.5px] leading-relaxed text-[#2C3550]">{r.text}</blockquote>
              <figcaption className="mt-auto text-xs font-extrabold">{r.name}{r.role && <span className="block font-medium text-[#8D95A3]">{r.role}</span>}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="mb-3 text-lg font-extrabold tracking-[-0.02em]">FAQs</h2>
        <Card className="divide-y divide-[#E8EBF0]">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-[14.5px] font-bold">
                {f.q}<ChevronDown className={cn('w-4 h-4 flex-none text-[#6B7381] transition-transform', faq === i && 'rotate-180')} />
              </button>
              {faq === i && <p className="px-4 pb-4 -mt-1 text-[13.5px] leading-relaxed text-[#4A525F]">{f.a}</p>}
            </div>
          ))}
        </Card>
        <a href={APP_LINKS.portfolioHelp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-[#154198]">More help on portfolios<ChevronRight className="w-4 h-4" /></a>
      </section>

      <Disclaimer>Prices exclude {GST_PERCENT}% GST. CAGR and returns are of the model portfolio since launch; Alpha Beginner and Alpha Emerging Leaders have less than a year of history. Past performance may or may not be sustained in the future. Investment in securities market are subject to market risks.</Disclaimer>

      <Sheet open={amountInfo} onClose={() => setAmountInfo(false)} eyebrow="Portfolios" title="Minimum amount">
        <p className="text-sm leading-relaxed text-[#2C3550]">The smallest amount that lets you buy every stock in the model portfolio at its recommended weight. Investing less can leave some stocks out or skew the weights.</p>
      </Sheet>

    </div>
  );
}
