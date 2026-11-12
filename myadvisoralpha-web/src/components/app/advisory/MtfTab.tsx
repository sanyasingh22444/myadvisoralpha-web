'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, CircleCheck, TriangleAlert } from 'lucide-react';
import { MTF_BASKETS, CLOSED_MTF_BASKETS, MTF_LEVERAGE as X, price, rupees, shortDate, type MtfBasket, type MtfStock } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import { MtfCompact } from '../productCards';
import { Card, FeaturedChip, Segmented, Sheet, Disclaimer, SampleChip, ghostBtn, mono, GAIN, LOSS } from '../ui';

type Chip = 'featured' | 'exit' | 'profit';
const CHIPS: { id: Chip; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'exit', label: 'Exit advised' },
  { id: 'profit', label: 'In profit' },
];

const arrow = (n: number) => (n >= 0 ? '▲' : '▼');
const tone = (n: number) => (n >= 0 ? GAIN : LOSS);

function stockState(s: MtfStock) {
  const move = ((s.cmp - s.entry) / s.entry) * 100;
  const tgtHit = s.target !== undefined && s.cmp >= s.target;
  const slHit = s.sl !== undefined && s.cmp <= s.sl;
  return { move, onCapital: move * X, tgtHit, slHit, exit: tgtHit || slHit };
}

function basketStats(b: MtfBasket) {
  const capital = b.stocks.reduce((a, s) => a + s.entry, 0);
  const pnl = b.stocks.reduce((a, s) => a + (s.cmp - s.entry) * X, 0);
  const netPct = (pnl / capital) * 100;
  return { capital, exposure: capital * X, netPct, potential: b.targetPct - netPct };
}

export default function MtfTab() {
  const [tab, setTab] = useState<'live' | 'past'>('live');
  const [chips, setChips] = useState<Chip[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [about, setAbout] = useState<{ name: string; thesis: string; points: string[] } | null>(null);

  const baskets = MTF_BASKETS.filter((b) => {
    const st = b.stocks.map(stockState);
    if (chips.includes('featured') && !b.featured) return false;
    if (chips.includes('exit') && !st.some((s) => s.exit)) return false;
    if (chips.includes('profit') && basketStats(b).netPct <= 0) return false;
    return true;
  });

  const past = CLOSED_MTF_BASKETS.map((p) => {
    const capital = p.stocks.reduce((a, s) => a + s.entry, 0);
    const pnl = p.stocks.reduce((a, s) => a + (s.exit - s.entry) * X, 0);
    return { ...p, netPct: (pnl / capital) * 100 };
  });
  const wins = past.filter((p) => p.netPct > 0).length;
  const avg = past.reduce((a, p) => a + p.netPct, 0) / past.length;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <Segmented className="sm:w-[300px]" value={tab} onChange={setTab} options={[{ id: 'live', label: 'Live Baskets' }, { id: 'past', label: 'Past Baskets' }]} />
        {tab === 'live' && (
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            {CHIPS.map((c) => (
              <button key={c.id} aria-pressed={chips.includes(c.id)} onClick={() => setChips((cs) => (cs.includes(c.id) ? cs.filter((x) => x !== c.id) : [...cs, c.id]))}
                className={cn('h-8 px-3 rounded-full border text-[12.5px] whitespace-nowrap', chips.includes(c.id) ? 'border-[#154198] bg-[#EEF3FE] text-[#154198] font-extrabold' : 'border-[#DFE4EC] bg-white text-[#4C5462] font-semibold')}>
                {c.label}
              </button>
            ))}
          </div>
        )}
        <span className={cn(tab === 'live' ? '' : 'sm:ml-auto')}><SampleChip /></span>
      </Card>

      {tab === 'live' ? (
        baskets.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
            {baskets.map((b) => (
              <MtfCompact key={b.id} b={b} onPositions={() => setOpen(b.id)} onAbout={() => setAbout(b)} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-[13.5px] font-semibold text-[#5B6478]">No baskets match these filters.</p>
        )
      ) : (
        <div className="flex flex-col gap-4">
          <Card className="px-4 py-3.5 grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5"><span className="text-xs text-[#5B6478]">Baskets closed</span><span className="text-lg font-extrabold">{past.length}</span></div>
            <div className="flex flex-col gap-0.5"><span className="text-xs text-[#5B6478]">Hit rate</span><span className="text-lg font-extrabold">{Math.round((wins / past.length) * 100)}%</span></div>
            <div className="flex flex-col items-end gap-0.5"><span className="text-xs text-[#5B6478]">Avg. return</span><span className="text-lg font-extrabold" style={{ color: tone(avg) }}>{avg >= 0 ? '+' : '−'}{Math.abs(avg).toFixed(2)}%</span></div>
          </Card>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 items-start">
            {past.map((p) => {
              const chip = p.outcome === 'target' ? ['Target hit', 'bg-[#E7F5EC] text-[#0F5C2C]'] : p.outcome === 'sl' ? ['Stop loss hit', 'bg-[#FDECEA] text-[#8A1C12]'] : ['Closed by advisor', 'bg-[#E8EDFB] text-[#1E3A8A]'];
              return (
                <Card key={p.id} className="rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs text-[#5B6478]">Posted {shortDate(p.posted)} · Closed {shortDate(p.closed)}</span>
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap', chip[1])}>{chip[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-[19px] font-bold">{p.name}</h3>
                    <span className="text-[13px] text-[#5B6478]">3 stocks · {X}x leverage · Held {p.days} days</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#5B6478]">Final basket P&amp;L</span>
                    <div className="text-[30px] leading-9 font-extrabold tracking-[-0.02em]" style={{ color: tone(p.netPct) }}>{arrow(p.netPct)} {Math.abs(p.netPct).toFixed(2)}%</div>
                  </div>
                  <div className="border-t border-[#E4E8F4]">
                    {p.stocks.map((s) => {
                      const m = ((s.exit - s.entry) / s.entry) * 100 * X;
                      return (
                        <div key={s.sym} className="grid grid-cols-[1fr_1.6fr_1fr] gap-1.5 items-center py-2.5 border-b border-[#E4E8F4]">
                          <span className="text-sm font-bold truncate">{s.sym}</span>
                          <span className={cn(mono, 'text-[13px] text-[#2C3550] whitespace-nowrap')}>{price(s.entry)} → {price(s.exit)}</span>
                          <span className="text-right text-sm font-bold" style={{ color: tone(m) }}>{arrow(m)} {Math.abs(m).toFixed(2)}%</span>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => setAbout(p)} className={cn(ghostBtn, 'h-12 text-[15px] rounded-xl')}>About trade</button>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <Disclaimer>MTF baskets shown are sample data from the Advisory tab design while the product is being launched; they are not live recommendations. Returns on actual investment are leveraged values ({X}x MTF) and exclude MTF interest and charges, which differ from broker to broker. Leverage magnifies losses as well as gains.</Disclaimer>

      <MtfPositionsSheet basket={MTF_BASKETS.find((b) => b.id === open) ?? null} onClose={() => setOpen(null)} onAbout={(b) => { setOpen(null); setAbout(b); }} />

      <Sheet open={!!about} onClose={() => setAbout(null)} eyebrow="Why this basket" title={about?.name ?? ''}>
        {about && (
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-[21px] text-[#2C3550]">{about.thesis}</p>
            <ul className="flex flex-col gap-2.5">
              {about.points.map((pt) => <li key={pt} className="flex gap-2.5 text-sm text-[#13235B]"><span className="text-[#1E3A8A] font-black">✓</span>{pt}</li>)}
            </ul>
            <div className="bg-[#F3F5FB] rounded-xl px-3.5 py-3 grid grid-cols-3 gap-2">
              <div><div className="text-xs text-[#5B6478]">Holding period</div><div className="text-[15px] font-bold">2–6 weeks</div></div>
              <div><div className="text-xs text-[#5B6478]">Leverage</div><div className="text-[15px] font-bold">{X}x</div></div>
              <div><div className="text-xs text-[#5B6478]">Stocks</div><div className="text-[15px] font-bold">3</div></div>
            </div>
            <p className="text-[11px] leading-4 text-[#5B6478]">Research for information only, not a recommendation to use MTF. Investments in the securities market are subject to market risks; leverage magnifies losses as well as gains. SEBI RA Reg. No. {BRAND_INFO.sebiRegNo}.</p>
            <button onClick={() => setAbout(null)} className="h-12 rounded-xl bg-[#1E3A8A] text-white text-[15px] font-bold">Got it</button>
          </div>
        )}
      </Sheet>
    </div>
  );
}

/** Positions panel: the full basket card from the design, opened with its positions table showing. */
export function MtfPositionsSheet({ basket, onClose, onAbout }: { basket: MtfBasket | null; onClose: () => void; onAbout: (b: MtfBasket) => void }) {
  return (
    <Sheet open={!!basket} onClose={onClose} wide eyebrow="Positions" title={basket?.name ?? ''}>
      {basket && <BasketCard b={basket} expanded onToggle={onClose} onAbout={() => onAbout(basket)} />}
    </Sheet>
  );
}

function BasketCard({ b, expanded, onToggle, onAbout }: { b: MtfBasket; expanded: boolean; onToggle: () => void; onAbout: () => void }) {
  const st = basketStats(b);
  const stocks = b.stocks.map((s) => ({ ...s, ...stockState(s) }));
  const tgtHit = stocks.find((s) => s.tgtHit);
  const slHit = stocks.find((s) => s.slHit);
  // Track runs from basket SL (left) to target (right), with 0% marked.
  const span = b.targetPct + b.stopLossPct;
  const zero = (b.stopLossPct / span) * 100;
  const mark = Math.min(100, Math.max(0, ((st.netPct + b.stopLossPct) / span) * 100));

  return (
    <Card className="rounded-2xl overflow-hidden">
      <div className={cn('p-4 flex flex-col gap-3', expanded && 'bg-[#E8EDFB] border-b border-[#DCE2F2]')}>
        <div className="flex justify-between items-center gap-2">
          <span className="text-xs text-[#5B6478]">Posted: {shortDate(b.posted)}</span>
          <span className="flex items-center gap-1.5">{b.featured && <FeaturedChip />}<span className="text-xs font-bold text-[#6B4300] bg-[#FCEBC5] px-2.5 py-1 rounded-md">MTF · Short Term</span></span>
        </div>
        <div>
          <h3 className="text-[19px] font-bold">{b.name}</h3>
          <span className="text-[13px] text-[#5B6478]">3 stocks · {X}x leverage · {expanded ? 'Hold 2–6 weeks' : `${b.days} days held`}</span>
        </div>
        {tgtHit && <Alert ok text={`${tgtHit.sym}: Target hit. Exit advised.`} />}
        {slHit && <Alert text={`${slHit.sym}: Stop loss hit. Exit advised.`} />}

        <div className="flex justify-between items-end gap-3">
          <div><span className="text-xs text-[#5B6478]">Basket P&amp;L</span><div className={cn(expanded ? 'text-base' : 'text-[34px] leading-10', 'font-extrabold tracking-[-0.02em]')} style={{ color: tone(st.netPct) }}>{arrow(st.netPct)} {Math.abs(st.netPct).toFixed(2)}%</div></div>
          <div className="text-right"><span className="text-xs text-[#5B6478]">Potential left</span><div className={cn(expanded ? 'text-base font-extrabold' : 'text-lg font-bold', 'text-[#1E3A8A]')}>{st.potential.toFixed(2)}%</div></div>
        </div>

        {!expanded && (
          <>
            <div className="flex flex-col gap-1.5">
              <div className="relative h-2.5">
                <div className="absolute inset-x-0 top-0.5 h-1.5 rounded-full" style={{ background: `linear-gradient(90deg,#F6D4D0 0%,#F6D4D0 ${zero}%,#CFEBD8 ${zero}%,#CFEBD8 100%)` }} />
                <div className="absolute top-0 w-px h-2.5 bg-[#8C95AD]" style={{ left: `${zero}%` }} />
                <div className="absolute -top-[3px] w-1 h-4 rounded-sm bg-[#13235B] -translate-x-0.5" style={{ left: `${mark}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#5B6478]"><span>Basket SL −{b.stopLossPct.toFixed(2)}%</span><span>0%</span><span>Target +{b.targetPct.toFixed(2)}%</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {stocks.map((s) => (
                <div key={s.sym} className={cn('rounded-[10px] px-2.5 py-2 flex flex-col gap-0.5', s.tgtHit ? 'border-[1.5px] border-[#157F3D] bg-[#F1FAF4]' : s.slHit ? 'border-[1.5px] border-[#B42318] bg-[#FEF4F3]' : 'border border-[#DCE2F2]')}>
                  <span className="text-[13px] font-bold truncate">{s.sym}</span>
                  <span className={cn(mono, 'text-xs font-semibold text-[#2C3550]')}>{price(s.cmp)}</span>
                  <span className="text-xs font-semibold" style={{ color: tone(s.onCapital) }}>{arrow(s.onCapital)} {Math.abs(s.onCapital).toFixed(2)}%</span>
                  {s.exit && <span className="self-start mt-1 text-[11px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: s.slHit ? LOSS : GAIN }}>Exit advised</span>}
                </div>
              ))}
            </div>
            <p className="text-xs leading-[18px] text-[#5B6478]">Returns on actual investment are leveraged values ({X}x MTF). Excludes interest and charges.</p>
          </>
        )}
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="grid grid-cols-[1.25fr_1fr_1fr_1fr] gap-1.5 py-3 border-b border-[#E4E8F4] text-xs font-semibold text-[#5B6478]">
            <span>Stock</span><span className="text-right">Entry</span><span className="text-right">CMP</span><span className="text-right whitespace-nowrap">P&amp;L ({X}x)</span>
          </div>
          {stocks.map((s) => (
            <div key={s.sym} className="grid grid-cols-[1.25fr_1fr_1fr_1fr] gap-1.5 items-start py-3 border-b border-[#E4E8F4]">
              <div className="flex flex-col min-w-0">
                <span className="text-[15px] font-bold truncate">{s.sym}</span>
                {s.exit && <span className="self-start mt-1 text-[11px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: s.slHit ? LOSS : GAIN }}>Exit advised</span>}
              </div>
              <span className={cn(mono, 'text-right text-[13.5px] text-[#2C3550]')}>{price(s.entry)}</span>
              <span className={cn(mono, 'text-right text-[13.5px] font-bold')}>{price(s.cmp)}</span>
              <span className="text-right text-[13.5px] font-bold" style={{ color: tone(s.onCapital) }}>{arrow(s.onCapital)} {Math.abs(s.onCapital).toFixed(2)}%</span>
            </div>
          ))}
          <p className="my-3 pb-3 border-b border-dashed border-[#C6D0EC] text-xs leading-[18px] text-[#5B6478]">P&amp;L excludes MTF interest. We are an advisory only, and MTF interest rates differ from broker to broker. Check your broker’s rate before you trade.</p>
          <div className="bg-[#F3F5FB] rounded-xl p-3.5 grid grid-cols-2 gap-y-3.5 gap-x-3">
            <div><div className="text-xs text-[#5B6478]">Your capital</div><div className="text-base font-bold">{rupees(st.capital)}</div></div>
            <div><div className="text-xs text-[#5B6478]">Total exposure</div><div className="text-base font-bold">{rupees(st.exposure)}</div></div>
            <div><div className="text-xs text-[#5B6478]">Basket target</div><div className="text-base font-bold text-[#157F3D]">+{b.targetPct.toFixed(2)}%</div></div>
            <div><div className="text-xs text-[#5B6478]">Basket stop loss</div><div className="text-base font-bold text-[#B42318]">−{b.stopLossPct.toFixed(2)}%</div></div>
          </div>
        </div>
      )}

      <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
        <button onClick={onToggle} aria-expanded={expanded} className={cn(ghostBtn, 'h-12 text-[15px] rounded-xl')}>{expanded ? 'Hide positions' : 'View positions'}{expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button>
        <button onClick={onAbout} className="h-12 rounded-xl bg-[#1E3A8A] text-white text-[15px] font-bold hover:bg-[#13235B]">About trade</button>
      </div>
    </Card>
  );
}

function Alert({ ok = false, text }: { ok?: boolean; text: string }) {
  const Icon = ok ? CircleCheck : TriangleAlert;
  return (
    <div role="status" className={cn('flex gap-2 items-start rounded-[10px] px-3 py-2.5 border', ok ? 'bg-[#E7F5EC] border-[#B7E0C4]' : 'bg-[#FDECEA] border-[#F3C2BC]')}>
      <Icon className={cn('w-[18px] h-[18px] flex-none mt-px', ok ? 'text-[#157F3D]' : 'text-[#B42318]')} />
      <span className={cn('text-[13px] font-bold', ok ? 'text-[#0F5C2C]' : 'text-[#8A1C12]')}>{text}</span>
    </div>
  );
}
