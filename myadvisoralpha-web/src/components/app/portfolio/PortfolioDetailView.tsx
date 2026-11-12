'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, FileText, ArrowUpRight, Sprout, ShieldCheck, Gem, Rocket, Info } from 'lucide-react';
import { findPortfolio, PORTFOLIO_PLANS, APP_LINKS, rupees } from '@/data/app';
import {
  getPortfolioDetail, seriesReturn, metric, toBullets, cleanAbout, TIMEFRAMES, PORTFOLIO_DETAILS_AS_OF,
  type Timeframe, type Point,
} from '@/data/portfolioDetails';
import { cn } from '@/lib/utils';
import { Card, LogoTile, Sheet, Disclaimer, goldBtn, mono, GAIN, LOSS } from '../ui';

const ICONS: Record<string, typeof Sprout> = {
  'alpha-beginner': Sprout, 'alpha-prime': ShieldCheck, 'alpha-allrounder': Gem, 'alpha-emerging-leaders': Rocket,
};
const MCAP_COLORS: Record<string, string> = { 'Large Cap': '#154198', 'Mid Cap': '#F5BA31', 'Small Cap': '#2D9C6A', Others: '#B4BBC7' };
const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(2)}%`;

export default function PortfolioDetailView({ slug }: { slug: string }) {
  const p = getPortfolioDetail(slug);
  const base = findPortfolio(slug);
  const [tab, setTab] = useState<'overview' | 'stocks'>('overview');
  const [info, setInfo] = useState<null | 'amount' | 'return'>(null);

  if (!p || !base) {
    return (
      <div className="py-16 text-center">
        <p className="font-extrabold">Portfolio not found.</p>
        <Link href="/app/advisory/portfolios" className="text-sm font-bold text-[#154198]">Back to portfolios</Link>
      </div>
    );
  }

  const Icon = ICONS[slug] ?? Gem;
  const plans = PORTFOLIO_PLANS.filter((pl) => base.planIds.includes(pl.id));
  const from = Math.min(...plans.flatMap((pl) => pl.durations.map((d) => d.price)));
  const cheapestPlan = plans.find((pl) => pl.durations.some((d) => d.price === from)) ?? plans[0];

  return (
    <div className="pb-24 lg:pb-28">
      <Link href="/app/advisory/portfolios" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#154198] mb-3"><ArrowLeft className="w-4 h-4" />Portfolios</Link>

      {/* Header */}
      <section className="rounded-[20px] bg-[linear-gradient(170deg,#D9E5FF_0%,#EEF3FE_45%,#FFF8E6_100%)] border border-[#D9E5FF] p-5 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-white text-[#154198] flex items-center justify-center shadow-sm"><Icon className="w-7 h-7" /></span>
          <div className="min-w-0">
            <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight">{p.name}</h1>
            <p className="text-sm font-semibold text-[#4A525F]">{p.tagline} · launched {new Date(p.inceptionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr] items-start">
          <div>
            <div className="text-xs font-extrabold tracking-[0.12em] uppercase text-[#14171C]">Ideal for</div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {toBullets(p.idealFor).map((b) => <li key={b} className="flex gap-2 text-[14px] text-[#2C3550]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#154198] flex-none" />{b}</li>)}
            </ul>
          </div>
          <Card className="grid grid-cols-3 divide-x divide-[#E8EBF0] py-3">
            <Stat label="Recommended amount" value={p.minInvestment ? rupees(p.minInvestment) : '–'} onInfo={() => setInfo('amount')} />
            <Stat label="Absolute return" value={p.absoluteReturn === null ? '–' : signed(p.absoluteReturn)} tone={p.absoluteReturn ?? 0} onInfo={() => setInfo('return')} />
            <Stat label="CAGR" value={p.cagr ? `${p.cagr.toFixed(2)}%` : '–'} tone={p.cagr ?? undefined} />
          </Card>
        </div>
      </section>

      {/* Tabs */}
      <div role="tablist" className="mt-5 flex gap-6 border-b border-[#DFE4EC]">
        {([['overview', 'Overview'], ['stocks', `Stock list (${p.stocks.length})`]] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
            className={cn('relative pb-2.5 text-[15px]', tab === id ? 'font-extrabold text-[#154198]' : 'font-semibold text-[#6B7381]')}>
            {label}{tab === id && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-t bg-[#154198]" />}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-4">
            <Section title="About portfolio">
              <p className="text-[14px] leading-relaxed text-[#4A525F] whitespace-pre-line">{cleanAbout(p.about)}</p>
              {p.features.length > 0 && (
                <>
                  <div className="mt-4 text-xs font-extrabold tracking-[0.12em] uppercase">Why invest</div>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {p.features.map((f) => <li key={f} className="flex gap-2 text-[14px] text-[#2C3550]"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F5BA31] flex-none" />{f}</li>)}
                  </ul>
                </>
              )}
            </Section>

            <Section title="Market capitalisation" sub="Periodic adjustments keep the portfolio aligned with its intended risk and allocation.">
              <div className="flex h-3.5 rounded-full overflow-hidden gap-0.5">
                {[...p.mcapAllocation].sort((a, b) => b.percent - a.percent).map((m) => (
                  <div key={m.category} title={`${m.category} ${m.percent.toFixed(2)}%`} style={{ width: `${m.percent}%`, background: MCAP_COLORS[m.category] ?? '#B4BBC7' }} />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[...p.mcapAllocation].sort((a, b) => b.percent - a.percent).map((m) => (
                  <div key={m.category} className="flex items-center gap-2 text-[13.5px]">
                    <span className="w-3 h-3 rounded-sm flex-none" style={{ background: MCAP_COLORS[m.category] ?? '#B4BBC7' }} />
                    <span className="text-[#4A525F]">{m.category}</span>
                    <span className={cn(mono, 'ml-auto font-semibold')}>{m.percent.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Attributes" sub={p.risk.note || (!p.risk.sharpe && !p.risk.beta ? 'Risk numbers need a year of history; “–” means not available yet.' : undefined)}>
              <div className="divide-y divide-[#E8EBF0]">
                {[
                  ['Sharpe ratio (1Y)', metric(p.risk.sharpe)],
                  ['Alpha (1Y)', metric(p.risk.alpha)],
                  ['Beta (1Y)', metric(p.risk.beta)],
                  ['Standard deviation (1Y)', p.risk.stdDev ? `${p.risk.stdDev.toFixed(2)}%` : '–'],
                  ['P/E', metric(p.risk.pe, 1)],
                  ['P/B', metric(p.risk.pb)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-2.5 text-[14px]"><span className="text-[#4A525F]">{l}</span><span className={cn(mono, 'font-semibold')}>{v}</span></div>
                ))}
              </div>
            </Section>
          </div>

          <div className="flex flex-col gap-4">
            <Performance name={p.name} benchmark={p.benchmark} perf={p.performance} inception={p.inceptionDate} />

            <Section title="Sectoral allocation">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#8D95A3] pb-2 border-b border-[#E8EBF0]">
                <span>Sector</span><span className="text-right">Stocks</span><span className="text-right w-[92px]">Weight</span>
              </div>
              {[...p.sectorAllocation].sort((a, b) => b.percent - a.percent).map((s) => (
                <div key={s.sector} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center py-2 border-b border-[#E8EBF0] last:border-0 text-[13.5px]">
                  <span className="min-w-0 truncate" title={s.sector}>{s.sector}</span>
                  <span className={cn(mono, 'text-right text-[#6B7381]')}>{s.stocks}</span>
                  <span className="w-[92px] flex items-center gap-2 justify-end">
                    <span className="h-1.5 rounded-full bg-[#154198]" style={{ width: `${Math.max(4, Math.min(48, s.percent * 1.6))}px` }} />
                    <span className={cn(mono, 'font-semibold w-[46px] text-right')}>{s.percent.toFixed(1)}%</span>
                  </span>
                </div>
              ))}
            </Section>

            {p.factsheetUrl && (
              <a href={p.factsheetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[14px] border border-[#EFD9A0] bg-[#FBF3DE] p-4 hover:border-[#CC9720]">
                <span className="w-10 h-10 rounded-xl bg-white text-[#A87C16] flex items-center justify-center"><FileText className="w-5 h-5" /></span>
                <span className="flex-1"><span className="block text-sm font-extrabold">Portfolio factsheet</span><span className="text-xs text-[#6E4C0B]">PDF report from the research team</span></span>
                <ArrowUpRight className="w-4 h-4 text-[#8A6A12]" />
              </a>
            )}
          </div>
        </div>
      ) : (
        <Card className="mt-4 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-[13.5px]">
              <thead className="bg-[#F5F7FC] text-[11px] font-bold uppercase tracking-[0.06em] text-[#6B7381] text-left">
                <tr><th className="px-4 py-3">Stock</th><th className="px-3 py-3">Sector</th><th className="px-3 py-3">Market cap</th><th className="px-3 py-3 text-right">Price</th><th className="px-4 py-3 text-right">Weight</th></tr>
              </thead>
              <tbody className="divide-y divide-[#E8EBF0]">
                {[...p.stocks].sort((a, b) => b.weight - a.weight).map((s) => (
                  <tr key={s.symbol}>
                    <td className="px-4 py-2.5"><div className="flex items-center gap-2.5"><LogoTile src={s.logo} label={s.symbol} size={32} /><div className="min-w-0"><div className="font-extrabold">{s.symbol}</div><div className="text-[11.5px] text-[#8D95A3] truncate max-w-[180px]">{s.name}</div></div></div></td>
                    <td className="px-3 py-2.5 text-[#4A525F] max-w-[200px] truncate" title={s.sector}>{s.sector}</td>
                    <td className="px-3 py-2.5 text-[#4A525F] whitespace-nowrap">{s.mcap ?? 'Others'}</td>
                    <td className={cn(mono, 'px-3 py-2.5 text-right')}>{s.ltp ? `₹${s.ltp.toLocaleString('en-IN')}` : '–'}</td>
                    <td className="px-4 py-2.5"><div className="flex items-center justify-end gap-2"><span className="h-1.5 rounded-full bg-[#F5BA31]" style={{ width: `${Math.max(4, s.weight * 4)}px` }} /><span className={cn(mono, 'font-semibold w-[52px] text-right')}>{s.weight.toFixed(2)}%</span></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Disclaimer>Portfolio data from MyAdvisorAlpha as of {new Date(PORTFOLIO_DETAILS_AS_OF).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}. Performance is of the model portfolio and its benchmark, rebased to 10 at the start of each period. Past performance may or may not be sustained in the future. Investment in securities market are subject to market risks.</Disclaimer>

      {/* Sticky subscribe bar */}
      <div className="fixed bottom-[68px] lg:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-[#D7DDE8] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-[#6B7381]">Get access from</div>
            <div className={cn(mono, 'text-lg font-semibold text-[#154198]')}>{rupees(from)}<span className="text-xs text-[#6B7381] font-sans"> · {cheapestPlan?.name}</span></div>
          </div>
          <a href={APP_LINKS.portfolioCheckout(cheapestPlan.id)} target="_blank" rel="noopener noreferrer" className={cn(goldBtn, 'h-11 px-6 text-[15px]')}>Subscribe<ArrowUpRight className="w-4 h-4" /></a>
        </div>
      </div>

      <Sheet open={info === 'amount'} onClose={() => setInfo(null)} eyebrow={p.name} title="Recommended amount">
        <p className="text-sm leading-relaxed text-[#2C3550]">The smallest amount that lets you buy every stock in the portfolio at its recommended weight. Investing less can leave some stocks out or skew the weights.</p>
      </Sheet>
      <Sheet open={info === 'return'} onClose={() => setInfo(null)} eyebrow={p.name} title="Absolute return">
        <p className="text-sm leading-relaxed text-[#2C3550]">Total return of the model portfolio since it launched, without annualising. CAGR is shown once a portfolio has enough history.</p>
      </Sheet>
    </div>
  );
}

function Stat({ label, value, tone, onInfo }: { label: string; value: string; tone?: number; onInfo?: () => void }) {
  return (
    <div className="px-3 flex flex-col items-center text-center gap-1">
      <span className="text-[11.5px] font-semibold text-[#6B7381] inline-flex items-center gap-1">{label}{onInfo && <button onClick={onInfo} aria-label={`About ${label.toLowerCase()}`}><Info className="w-3.5 h-3.5" /></button>}</span>
      <span className={cn(mono, 'text-[17px] font-semibold')} style={{ color: tone === undefined ? undefined : tone >= 0 ? GAIN : LOSS }}>{value}</span>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Card className="p-4 sm:p-5">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between gap-3 text-left">
        <h2 className="text-[17px] font-extrabold tracking-[-0.01em]">{title}</h2>
        <ChevronDown className={cn('w-5 h-5 text-[#154198] transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="mt-3">
          {sub && <p className="text-[13px] text-[#6B7381] mb-3">{sub}</p>}
          {children}
        </div>
      )}
    </Card>
  );
}

/** Portfolio vs benchmark line chart, both rebased to 10 at the first point of the chosen period. */
function Performance({ name, benchmark, perf, inception }: { name: string; benchmark: string; perf: Record<Timeframe, { portfolio: Point[]; benchmark: Point[] }>; inception: string }) {
  const [tf, setTf] = useState<Timeframe>('1Y');
  const W = 560, H = 230, L = 36, R = 10, T = 12, B = 28;

  const view = useMemo(() => {
    const raw = perf[tf];
    const rebase = (s: Point[]) => (s.length ? s.map(([d, v]) => [d, (v / s[0][1]) * 10] as Point) : s);
    const a = rebase(raw.portfolio), b = rebase(raw.benchmark);
    const all = [...a, ...b];
    if (!all.length) return null;
    const t = (d: string) => +new Date(d);
    const x0 = Math.min(...all.map((p) => t(p[0]))), x1 = Math.max(...all.map((p) => t(p[0])));
    const vals = all.map((p) => p[1]);
    const pad = (Math.max(...vals) - Math.min(...vals)) * 0.12 || 0.5;
    const y0 = Math.min(...vals) - pad, y1 = Math.max(...vals) + pad;
    const X = (d: string) => L + ((t(d) - x0) / (x1 - x0 || 1)) * (W - L - R);
    const Y = (v: number) => T + (1 - (v - y0) / (y1 - y0)) * (H - T - B);
    const path = (s: Point[]) => s.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
    const ticksY = Array.from({ length: 4 }, (_, i) => y0 + ((y1 - y0) * (i + 0.5)) / 4);
    const span = x1 - x0;
    const ticksX = Array.from({ length: 4 }, (_, i) => x0 + (span * (i + 0.5)) / 4).map((ms) => {
      const d = new Date(ms);
      return { x: L + ((ms - x0) / (span || 1)) * (W - L - R), label: span > 400 * 86400000 ? d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) };
    });
    return { a: path(a), b: path(b), ticksY, ticksX, Y, ra: seriesReturn(raw.portfolio), rb: seriesReturn(raw.benchmark), start: all.reduce((m, p) => (p[0] < m ? p[0] : m), all[0][0]) };
  }, [perf, tf]);

  return (
    <Card className="p-4 sm:p-5">
      <h2 className="text-[17px] font-extrabold tracking-[-0.01em]">Performance vs {benchmark}</h2>
      <p className="text-[13px] text-[#6B7381] mt-1">Launched {new Date(inception).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}. Comparing with {benchmark} shows how much the research added.</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#EEF3FE] px-3 py-2"><div className="text-[11.5px] font-semibold text-[#154198]">{name}</div><div className={cn(mono, 'text-base font-semibold')} style={{ color: (view?.ra ?? 0) >= 0 ? GAIN : LOSS }}>{view?.ra === null || view?.ra === undefined ? '–' : signed(view.ra)}</div></div>
        <div className="rounded-xl bg-[#F1FAF4] px-3 py-2"><div className="text-[11.5px] font-semibold text-[#1E7A35]">{benchmark}</div><div className={cn(mono, 'text-base font-semibold')} style={{ color: (view?.rb ?? 0) >= 0 ? GAIN : LOSS }}>{view?.rb === null || view?.rb === undefined ? '–' : signed(view.rb)}</div></div>
      </div>
      {view ? (
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-auto" role="img" aria-label={`${name} vs ${benchmark}, ${tf}`}>
          {view.ticksY.map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={view.Y(v)} y2={view.Y(v)} stroke="#E7ECF6" />
              <text x={L - 6} y={view.Y(v) + 4} textAnchor="end" fontSize="10.5" fill="#8D95A3">{v.toFixed(1)}</text>
            </g>
          ))}
          {view.ticksX.map((t) => <text key={t.label + t.x} x={t.x} y={H - 8} textAnchor="middle" fontSize="10.5" fill="#8D95A3">{t.label}</text>)}
          <path d={view.b} fill="none" stroke="#2D9C6A" strokeWidth="2" strokeLinejoin="round" />
          <path d={view.a} fill="none" stroke="#154198" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      ) : (
        <p className="py-10 text-center text-sm text-[#6B7381]">No data for this period.</p>
      )}
      <div className="mt-1 flex flex-wrap gap-4 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-[#154198]" />{name}</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-[#2D9C6A]" />{benchmark}</span>
      </div>
      <div role="radiogroup" aria-label="Period" className="mt-3 grid grid-cols-6 gap-1.5">
        {TIMEFRAMES.map((t) => (
          <button key={t} role="radio" aria-checked={tf === t} onClick={() => setTf(t)}
            className={cn('h-9 rounded-[10px] border text-[13px] font-bold', tf === t ? 'border-[#154198] bg-[#EEF3FE] text-[#154198]' : 'border-[#DFE4EC] text-[#4C5462]')}>
            {t === 'ALL' ? 'All' : t}
          </button>
        ))}
      </div>
      {view && view.start < inception && <p className="mt-2 text-[11.5px] text-[#8D95A3]">The portfolio launched after the start of this period, so its line begins later than the benchmark’s.</p>}
    </Card>
  );
}
