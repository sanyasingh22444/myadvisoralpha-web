'use client';

import Link from 'next/link';
import { Bookmark, BookmarkCheck, ShoppingCart, Activity, CalendarClock, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import {
  price, rupees, shortDate, holdingDays, isHit, futuresReturn, MTF_LEVERAGE,
  type StockIdea, type FuturesCall, type MtfBasket, type Portfolio, type ClosedIdea,
} from '@/data/app';
import { cn } from '@/lib/utils';
import { CompactCard, primaryAction, secondaryAction, orderAction } from './cards';
import { FeaturedChip, LogoTile, TermChip } from './ui';
import { useWatchlist } from './watchlist';

const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(2)}%`;
const fp = (n: number) => (n < 1000 ? price(n) : rupees(Math.round(n)));

function ProductChip({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-extrabold tracking-wide text-[#1E3A8A] bg-[#E8EDFB] rounded-md px-2 py-[3px] whitespace-nowrap">{children}</span>;
}

export function SideBadge({ side }: { side: 'LONG' | 'SHORT' }) {
  const long = side === 'LONG';
  const Icon = long ? TrendingUp : TrendingDown;
  return (
    <span className={cn('flex-none inline-flex items-center gap-1 h-7 rounded-lg px-2.5 text-xs font-extrabold border', long ? 'bg-[#E7F6EE] border-[#BFE6D4] text-[#0E7F58]' : 'bg-[#FDECEC] border-[#F3C2C2] text-[#B02121]')}>
      <Icon className="w-3.5 h-3.5" />{side}
    </span>
  );
}

/* ---------- Stock idea ---------- */
export function StockCompact({ idea, onAbout, onOrder }: { idea: StockIdea; onAbout: () => void; onOrder: () => void }) {
  const wl = useWatchlist();
  const saved = wl.has(idea.id);
  return (
    <CompactCard
      chips={<><ProductChip>Stock</ProductChip><TermChip>{idea.category}</TermChip></>}
      chipsRight={idea.featured ? <FeaturedChip /> : <span className="text-[11.5px] text-[#8D95A3]">{shortDate(idea.launchedDate)}</span>}
      logo={<LogoTile src={idea.logoUrl} label={idea.symbol} size={42} />}
      title={idea.name}
      subtitle={idea.symbol}
      quote={{ price: price(idea.currentPrice), change: idea.dayChangePercentage }}
      badge={
        <button onClick={() => wl.toggle(idea.id)} aria-pressed={saved} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
          className={cn('flex-none w-8 h-8 rounded-lg border flex items-center justify-center', saved ? 'border-[#154198] bg-[#EEF3FE] text-[#154198]' : 'border-[#DFE4EC] text-[#6B7381]')}>
          {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      }
      highlight={{ label: 'Since entry', value: signed(idea.returnPercentage), tone: idea.returnPercentage, aside: { label: 'Potential left', value: `${idea.upsidePotential.toFixed(1)}%` } }}
      facts={[
        { label: 'Entry', value: price(idea.buyPrice) },
        { label: 'Target 2', value: price(idea.target2), tone: 'gain' },
        { label: 'Stop loss', value: price(idea.stopLoss), tone: 'loss' },
      ]}
      onOpen={onAbout}
      actions={<>
        <button onClick={onAbout} className={secondaryAction}><Activity className="w-4 h-4" />About idea</button>
        <button onClick={onOrder} className={orderAction}><ShoppingCart className="w-4 h-4" />Place order</button>
      </>}
    />
  );
}

/* ---------- Futures call ---------- */
export function FuturesCompact({ f, onAbout }: { f: FuturesCall; onAbout: () => void }) {
  const since = futuresReturn(f, f.ltp);
  const potential = Math.abs((f.target - f.ltp) / f.ltp) * 100;
  return (
    <CompactCard
      chips={<><ProductChip>Futures</ProductChip><span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#6B4300] bg-[#FCEBC5] px-2 py-[3px] rounded-md whitespace-nowrap"><CalendarClock className="w-3 h-3" />Exp {f.expiry}</span></>}
      chipsRight={<span className="text-[11.5px] text-[#8D95A3]">{shortDate(f.posted)}</span>}
      logo={<span className="w-[42px] h-[42px] rounded-xl bg-[#F3F5FB] border border-[#DCE2F2] flex items-center justify-center flex-none text-[8px] font-extrabold text-[#1E3A8A] text-center leading-[1.15] p-0.5 overflow-hidden">{f.name.toUpperCase()}</span>}
      title={f.name}
      subtitle={f.contract}
      quote={{ price: fp(f.ltp), change: f.chgPct }}
      badge={<SideBadge side={f.side} />}
      highlight={{ label: 'Since entry', value: signed(since), tone: since, aside: { label: 'Potential left', value: `${potential.toFixed(2)}%` } }}
      facts={[
        { label: 'Entry', value: fp(f.entry) },
        { label: 'Target', value: fp(f.target), tone: 'gain' },
        { label: 'Stop loss', value: fp(f.stopLoss), tone: 'loss' },
      ]}
      onOpen={onAbout}
      actions={<button onClick={onAbout} className={primaryAction}><Activity className="w-4 h-4" />Why this trade?</button>}
    />
  );
}

/* ---------- MTF basket ---------- */
export function mtfStats(b: MtfBasket) {
  const capital = b.stocks.reduce((a, s) => a + s.entry, 0);
  const pnl = b.stocks.reduce((a, s) => a + (s.cmp - s.entry) * MTF_LEVERAGE, 0);
  const netPct = (pnl / capital) * 100;
  return { capital, netPct, potential: b.targetPct - netPct, exits: b.stocks.filter((s) => (s.target !== undefined && s.cmp >= s.target) || (s.sl !== undefined && s.cmp <= s.sl)).length };
}

export function MtfCompact({ b, onPositions, onAbout }: { b: MtfBasket; onPositions: () => void; onAbout: () => void }) {
  const st = mtfStats(b);
  return (
    <CompactCard
      chips={<><ProductChip>MTF basket</ProductChip><span className="text-[11.5px] font-bold text-[#6B4300] bg-[#FCEBC5] px-2 py-[3px] rounded-md whitespace-nowrap">Short term · {MTF_LEVERAGE}x</span></>}
      chipsRight={b.featured ? <FeaturedChip /> : <span className="text-[11.5px] text-[#8D95A3]">{shortDate(b.posted)}</span>}
      logo={<span className="w-[42px] h-[42px] rounded-xl bg-[#F3F5FB] border border-[#DCE2F2] flex flex-col items-center justify-center flex-none text-[9px] font-extrabold text-[#1E3A8A] leading-tight">3<span className="font-semibold">stocks</span></span>}
      title={b.name}
      subtitle={b.stocks.map((s) => s.sym).join(' · ')}
      badge={st.exits > 0 ? <span className="flex-none text-[11px] font-extrabold text-white bg-[#B42318] rounded-md px-2 py-1">{st.exits} exit advised</span> : undefined}
      highlight={{ label: 'Basket P&L', value: signed(st.netPct), tone: st.netPct, aside: { label: 'Potential left', value: `${st.potential.toFixed(2)}%` } }}
      facts={[
        { label: 'Capital', value: rupees(st.capital) },
        { label: 'Target', value: `+${b.targetPct.toFixed(1)}%`, tone: 'gain' },
        { label: 'Stop loss', value: `−${b.stopLossPct.toFixed(1)}%`, tone: 'loss' },
      ]}
      onOpen={onPositions}
      actions={<>
        <button onClick={onPositions} className={secondaryAction}>View positions</button>
        <button onClick={onAbout} className={primaryAction}>About trade</button>
      </>}
    />
  );
}

/* ---------- Model portfolio ---------- */
const VOL: Record<string, { label: string; cls: string }> = {
  Low: { label: 'Low volatility', cls: 'bg-[#E3F5E7] text-[#1E7A35]' },
  Medium: { label: 'Mid volatility', cls: 'bg-[#FFF6E3] text-[#9A6B12]' },
  High: { label: 'High volatility', cls: 'bg-[#FDECEC] text-[#B02121]' },
};

export function PortfolioCompact({ p, icon }: { p: Portfolio; icon?: React.ReactNode }) {
  const v = VOL[p.riskLevel];
  return (
    <CompactCard
      chips={<><ProductChip>Portfolio</ProductChip><span className={cn('text-[11px] font-extrabold rounded-md px-2 py-[3px]', v.cls)}>{v.label}</span></>}
      chipsRight={<span className="text-[11.5px] text-[#8D95A3]">since {p.launchDate}</span>}
      logo={<span className="w-[42px] h-[42px] rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center flex-none">{icon}</span>}
      title={p.name}
      subtitle={p.tagline}
      highlight={p.cagr
        ? { label: 'CAGR', value: `${p.cagr.toFixed(2)}%`, tone: p.cagr, aside: { label: 'Since launch', value: signed(p.absoluteReturn) } }
        : { label: 'Return since launch', value: signed(p.absoluteReturn), tone: p.absoluteReturn, aside: { label: 'CAGR', value: '–' } }}
      facts={[
        { label: 'Min. amount', value: rupees(p.minInvestment) },
        { label: 'Stocks', value: p.stockCount },
        { label: 'Risk', value: p.riskLevel, tone: p.riskLevel === 'Low' ? 'gain' : 'loss' },
      ]}
      actions={<Link href={`/app/portfolios/${p.slug}`} className={primaryAction}>View portfolio</Link>}
    />
  );
}

/* ---------- Closed stock idea ---------- */
export function ClosedCompact({ c, onAbout }: { c: ClosedIdea; onAbout: () => void }) {
  const hit = isHit(c);
  return (
    <CompactCard
      chips={<><ProductChip>Closed</ProductChip><TermChip>{c.category}</TermChip></>}
      chipsRight={<span className={cn('text-[11px] font-extrabold rounded-md px-2 py-[3px]', c.gainPercentage > 0 ? 'bg-[#E7F5EC] text-[#0F5C2C]' : c.gainPercentage === 0 ? 'bg-[#E8EDFB] text-[#1E3A8A]' : 'bg-[#FDECEA] text-[#8A1C12]')}>{c.gainPercentage > 0 ? 'Profit booked' : c.gainPercentage === 0 ? 'At cost' : 'Exited at loss'}</span>}
      logo={<LogoTile src={c.logoUrl} label={c.symbol} size={42} />}
      title={c.symbol}
      subtitle={c.name}
      highlight={{ label: `Net ${hit ? 'gain' : 'loss'} in ${holdingDays(c)} days`, value: signed(c.gainPercentage), tone: c.gainPercentage, aside: c.targetUpside ? { label: 'Targeted', value: `+${c.targetUpside.toFixed(1)}%` } : undefined }}
      facts={[
        { label: 'Avg. entry', value: price(c.buyPrice) },
        { label: 'Exit', value: price(c.closedPrice) },
        { label: 'Closed', value: new Date(c.closedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' }) },
      ]}
      onOpen={onAbout}
      actions={<>
        <button onClick={onAbout} className={primaryAction}>About idea</button>
        {c.reportUrl && <a href={c.reportUrl} target="_blank" rel="noopener noreferrer" className={cn(secondaryAction, 'flex-none px-3.5')}><FileText className="w-4 h-4" />Report</a>}
      </>}
    />
  );
}
