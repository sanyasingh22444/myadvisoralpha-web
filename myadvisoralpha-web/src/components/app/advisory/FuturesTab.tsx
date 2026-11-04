'use client';

import { useState } from 'react';
import { CalendarClock, Activity, TriangleAlert, TrendingUp, TrendingDown } from 'lucide-react';
import { FUTURES, CLOSED_FUTURES, futuresReturn, price, rupees, shortDate, type FuturesCall } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import { Card, LogoTile, Segmented, Sheet, StatStrip, Disclaimer, SampleChip, blueBtn, mono, GAIN, LOSS } from '../ui';

type Chip = 'Index' | 'Stock' | 'LONG' | 'SHORT';
const CHIPS: { id: Chip; label: string }[] = [
  { id: 'Index', label: 'Index futures' },
  { id: 'Stock', label: 'Stock futures' },
  { id: 'LONG', label: 'Long' },
  { id: 'SHORT', label: 'Short' },
];

const fp = (n: number) => (n < 1000 ? price(n) : rupees(Math.round(n)));

export default function FuturesTab() {
  const [live, setLive] = useState<'live' | 'past'>('live');
  const [chips, setChips] = useState<Chip[]>([]);
  const [why, setWhy] = useState<FuturesCall | null>(null);

  const kinds = chips.filter((c) => c === 'Index' || c === 'Stock');
  const sides = chips.filter((c) => c === 'LONG' || c === 'SHORT');
  const calls = FUTURES.filter((f) => (!kinds.length || kinds.includes(f.kind)) && (!sides.length || sides.includes(f.side)));
  const past = CLOSED_FUTURES.filter((f) => !sides.length || sides.includes(f.side));

  const returns = CLOSED_FUTURES.map((f) => futuresReturn(f, f.exit));
  const wins = returns.filter((r) => r > 0).length;
  const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
  const avgDays = CLOSED_FUTURES.reduce((a, f) => a + f.days, 0) / CLOSED_FUTURES.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2.5 items-start p-3 rounded-xl bg-[#FFF6E3] border border-[#F2D79A]">
        <span className="w-7 h-7 rounded-lg bg-white text-[#9A6B12] flex items-center justify-center flex-none"><TriangleAlert className="w-4 h-4" /></span>
        <div className="flex-1">
          <div className="text-[12.5px] font-extrabold text-[#6E4C0B]">Futures are leveraged</div>
          <div className="text-[11.5px] leading-[1.45] font-semibold text-[#6E4C0B]">9 out of 10 individual traders in equity F&amp;O incurred net losses (SEBI study, FY22). Trade only with money you can afford to lose.</div>
        </div>
        <SampleChip />
      </div>

      <Card className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <Segmented className="sm:w-[300px]" value={live} onChange={setLive} options={[
          { id: 'live', label: <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#279D46]" />Live calls <span className={cn(mono, 'text-[11px] opacity-70')}>{FUTURES.length}</span></span> },
          { id: 'past', label: <span>Past calls <span className={cn(mono, 'text-[11px] opacity-70')}>{CLOSED_FUTURES.length}</span></span> },
        ]} />
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {CHIPS.filter((c) => live === 'live' || c.id === 'LONG' || c.id === 'SHORT').map((c) => (
            <button key={c.id} aria-pressed={chips.includes(c.id)} onClick={() => setChips((cs) => (cs.includes(c.id) ? cs.filter((x) => x !== c.id) : [...cs, c.id]))}
              className={cn('h-8 px-3 rounded-full border text-[12.5px] whitespace-nowrap', chips.includes(c.id) ? 'border-[#154198] bg-[#EEF3FE] text-[#154198] font-extrabold' : 'border-[#DFE4EC] bg-white text-[#4C5462] font-semibold')}>
              {c.label}
            </button>
          ))}
        </div>
      </Card>

      <StatStrip items={[
        { label: 'Hit rate', value: `${Math.round((wins / returns.length) * 100)}%` },
        { label: 'Avg. move', value: `${avg >= 0 ? '+' : ''}${avg.toFixed(2)}%`, tone: avg >= 0 ? 'gain' : 'loss' },
        { label: 'Avg. holding', value: `${Math.round(avgDays)} days` },
      ]} />

      {live === 'live' ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
          {calls.map((f) => <FuturesCard key={f.id} f={f} onWhy={() => setWhy(f)} />)}
          {!calls.length && <p className="py-10 text-center text-sm font-bold md:col-span-2 xl:col-span-3">No calls match these filters.</p>}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-start">
          {past.map((f) => {
            const r = futuresReturn(f, f.exit);
            const pnlLot = (f.exit - f.entry) * f.lot * (f.side === 'LONG' ? 1 : -1);
            const up = r >= 0;
            const first = f.side === 'LONG' ? 'Buy' : 'Sell';
            const second = f.side === 'LONG' ? 'Sell' : 'Buy';
            return (
              <div key={f.id} className="bg-[#EEF3FE] border border-[#D9E5FF] rounded-[14px] p-[7px]">
                <Card className="rounded-[10px] p-3.5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <LogoTile label={f.name.toUpperCase()} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-extrabold truncate">{f.name}</div>
                      <div className={cn(mono, 'text-xs text-[#8D95A3]')}>{f.contract}</div>
                    </div>
                    <SideBadge side={f.side} />
                  </div>
                  <div>
                    <div className="grid grid-cols-[1fr_1.5fr_1fr] pb-2 border-b border-[#E8EBF0] text-[11px] font-bold tracking-[0.06em] uppercase text-[#8D95A3]"><span>Action</span><span className="text-center">Date</span><span className="text-right">Price</span></div>
                    <Row a={first} d={shortDate(f.openedOn)} p={fp(f.entry)} />
                    <Row a={second} d={shortDate(f.closedOn)} p={fp(f.exit)} />
                  </div>
                  <div className={cn('rounded-[10px] py-2 text-center text-sm font-extrabold', up ? 'bg-[#E3F5E7]' : 'bg-[#FDECEC]')} style={{ color: up ? GAIN : LOSS }}>
                    {up ? '+' : '−'}{rupees(Math.abs(Math.round(pnlLot)))} per lot · {up ? '+' : ''}{r.toFixed(2)}% in {f.days} days
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      <Disclaimer>Futures calls shown are sample data from the Advisory tab design while the Futures product is being launched; they are not live recommendations. Open futures positions are marked to market daily by your broker. Positions not exited by expiry are settled per exchange rules. Investment in securities market are subject to market risks.</Disclaimer>

      <Sheet open={!!why} onClose={() => setWhy(null)} eyebrow="Why this trade" title={why?.contract ?? ''}>
        {why && (
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-[1.6] text-[#2C3550]">{why.thesis}</p>
            <ul className="flex flex-col gap-2.5">
              {why.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-[#13235B]"><span className="text-[#1E3A8A] font-black">✓</span>{p}</li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-2 bg-[#F3F5FB] rounded-xl p-3">
              <div><div className="text-xs text-[#5B6478]">Holding</div><div className="text-[15px] font-bold">{why.duration}</div></div>
              <div><div className="text-xs text-[#5B6478]">Lot size</div><div className="text-[15px] font-bold">{why.lot}</div></div>
              <div><div className="text-xs text-[#5B6478]">Expiry</div><div className="text-[15px] font-bold">{why.expiry}</div></div>
            </div>
            <p className="text-[11px] leading-4 text-[#5B6478]">Research for information only. Futures are leveraged; losses can exceed the margin blocked. SEBI RA Reg. No. {BRAND_INFO.sebiRegNo}.</p>
            <button onClick={() => setWhy(null)} className={cn(blueBtn, 'h-12 text-[15px] bg-[#1E3A8A]')}>Got it</button>
          </div>
        )}
      </Sheet>
    </div>
  );
}

function Row({ a, d, p }: { a: string; d: string; p: string }) {
  return (
    <div className="grid grid-cols-[1fr_1.5fr_1fr] items-center pt-2.5">
      <span className="text-sm font-semibold">{a}</span>
      <span className={cn(mono, 'text-[11.5px] text-[#6B7381] text-center')}>{d}</span>
      <span className={cn(mono, 'text-[15px] font-semibold text-right')}>{p}</span>
    </div>
  );
}

function SideBadge({ side }: { side: 'LONG' | 'SHORT' }) {
  const long = side === 'LONG';
  const Icon = long ? TrendingUp : TrendingDown;
  return (
    <span className={cn('flex-none inline-flex items-center gap-1.5 h-[30px] rounded-lg px-3 text-[13px] font-extrabold border', long ? 'bg-[#E7F6EE] border-[#BFE6D4] text-[#0E7F58]' : 'bg-[#FDECEC] border-[#F3C2C2] text-[#B02121]')}>
      <Icon className="w-3.5 h-3.5" />{side}
    </span>
  );
}

/** Live futures call, laid out per the updated Advisory tab design (AdvisoryTabDesign(1).html). */
function FuturesCard({ f, onWhy }: { f: FuturesCall; onWhy: () => void }) {
  const since = futuresReturn(f, f.ltp);
  const up = since >= 0;
  const potential = Math.abs((f.target - f.ltp) / f.ltp) * 100;
  const riskLot = Math.abs(f.entry - f.stopLoss) * f.lot;
  const rewardLot = Math.abs(f.target - f.entry) * f.lot;
  const marginLot = f.ltp * f.lot * f.marginPct;
  const long = f.side === 'LONG';

  // Risk/reward rail: SL – Entry – Target, laid out left to right in price order.
  const pts = [
    { badge: 'SL', label: 'Stop loss', value: f.stopLoss, color: LOSS },
    { badge: 'E', label: 'Entry', value: f.entry, color: '#154198' },
    { badge: 'T', label: 'Target', value: f.target, color: GAIN },
  ];
  const ordered = long ? pts : [...pts].reverse();
  const lo = Math.min(f.stopLoss, f.target), hi = Math.max(f.stopLoss, f.target);
  const at = (v: number) => (long ? (v - lo) / (hi - lo) : (hi - v) / (hi - lo)) * 100;
  // Keep Entry away from the ends so its label never collides with SL/Target labels.
  const entryAt = Math.min(72, Math.max(28, at(f.entry)));
  const posOf = (v: number) => (v === f.entry ? entryAt : at(v));

  const tile = 'rounded-[10px] px-2.5 py-2 flex flex-col gap-0.5 border';

  return (
    <article className="bg-white border border-[#DCE2F2] rounded-2xl p-4 flex flex-col gap-3.5 text-[#13235B]">
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs text-[#5B6478]">Posted: {shortDate(f.posted)}</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4300] bg-[#FCEBC5] px-2.5 py-1 rounded-md whitespace-nowrap"><CalendarClock className="w-3 h-3" />Exp {f.expiry}</span>
      </div>

      <div className="flex items-start gap-3">
        <span className="w-11 h-11 rounded-xl bg-[#F3F5FB] border border-[#DCE2F2] flex items-center justify-center flex-none text-[8.5px] font-extrabold tracking-[0.04em] text-[#1E3A8A] text-center leading-[1.15] p-0.5 overflow-hidden">{f.name.toUpperCase()}</span>
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <h2 className="text-[19px] font-bold truncate">{f.name}</h2>
          <span className="text-[12.5px] text-[#5B6478] truncate">{f.contract}</span>
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="text-sm font-bold">{fp(f.ltp)}</span>
            <span className="text-[12.5px] font-semibold" style={{ color: f.chgPct >= 0 ? '#157F3D' : '#B42318' }}>{f.chgPct >= 0 ? '▲' : '▼'} {Math.abs(f.chgPct).toFixed(2)}%</span>
          </div>
        </div>
        <SideBadge side={f.side} />
      </div>

      <div className="flex justify-between items-end gap-3 px-3.5 py-3 bg-[#F3F5FB] rounded-xl">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#5B6478]">Since entry</span>
          <span className="text-[26px] leading-8 font-extrabold tracking-[-0.02em]" style={{ color: up ? '#157F3D' : '#B42318' }}>{up ? '▲' : '▼'} {Math.abs(since).toFixed(2)}%</span>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-[#5B6478]">Potential left</span>
          <span className="text-lg font-bold text-[#1E3A8A]">{potential.toFixed(2)}%</span>
        </div>
      </div>

      <div className="relative h-[88px] mx-9">
        <span className="absolute top-[13px] h-1.5 rounded-l-full bg-[#F6D4D0]" style={{ left: 0, width: `${entryAt}%` }} />
        <span className="absolute top-[13px] h-1.5 rounded-r-full bg-[#CFEBD8]" style={{ left: `${entryAt}%`, right: 0 }} />
        {ordered.map((p) => (
          <div key={p.badge} className="absolute top-0 flex flex-col items-center -translate-x-1/2" style={{ left: `${posOf(p.value)}%` }}>
            <span className="w-8 h-8 rounded-full text-[11px] font-extrabold text-white flex items-center justify-center ring-4 ring-white" style={{ background: p.color }}>{p.badge}</span>
            <span className="text-xs text-[#5B6478] mt-2 whitespace-nowrap">{p.label}</span>
            <span className="text-sm font-bold whitespace-nowrap">{fp(p.value)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className={cn(tile, 'border-[#DCE2F2]')}><span className="text-xs text-[#5B6478]">Lot size</span><span className="text-sm font-bold">{f.lot.toLocaleString('en-IN')} qty</span></div>
        <div className={cn(tile, 'border-[#DCE2F2]')}><span className="text-xs text-[#5B6478]">Margin / lot</span><span className="text-sm font-bold">{rupees(Math.round(marginLot))}</span></div>
        <div className={cn(tile, 'border-[#F3C2BC] bg-[#FEF4F3]')}><span className="text-xs text-[#5B6478]">Risk / lot</span><span className="text-sm font-bold text-[#B42318]">{rupees(Math.round(riskLot))}</span></div>
        <div className={cn(tile, 'border-[#B7E0C4] bg-[#F1FAF4]')}><span className="text-xs text-[#5B6478]">Reward / lot</span><span className="text-sm font-bold text-[#157F3D]">{rupees(Math.round(rewardLot))}</span></div>
      </div>

      <button onClick={onWhy} className="h-[46px] rounded-xl bg-[#1E3A8A] hover:bg-[#13235B] text-white text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[.985] transition-all">
        <Activity className="w-4 h-4" />Why this trade?
      </button>
    </article>
  );
}
