'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sunrise, Activity, Sunset, Info, ShieldCheck } from 'lucide-react';
import { LIVE_IDEAS, price, type StockIdea } from '@/data/app';
import { HEADLINE_INDICES, SECTORS, IDEA_QUOTES, MARKET_AS_OF, pctChange, gapOf, type IdeaQuote } from '@/data/market';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import { Card, Eyebrow, PageTitle, Segmented, Sheet, TermChip, mono, GAIN, LOSS } from '../ui';

type Lens = 'today' | 'entry' | 'target';

interface Tile {
  idea: StockIdea;
  q: IdeaQuote;
  today: number;
  entry: number;
  toTarget: number;
  progress: number; // 0 = at stop loss, 100 = at target 2
}

const signed = (n: number, d = 2) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(d)}%`;

/** Red–green scale for % moves, capped at ±cap. */
function moveColor(v: number, cap: number) {
  const t = Math.min(1, Math.abs(v) / cap);
  if (Math.abs(v) < 0.05) return { bg: '#E7ECF6', fg: '#14171C' };
  const strong = t > 0.55;
  return v > 0
    ? { bg: `rgba(30,122,53,${0.14 + t * 0.78})`, fg: strong ? '#FFFFFF' : '#0F4D22' }
    : { bg: `rgba(176,33,33,${0.14 + t * 0.78})`, fg: strong ? '#FFFFFF' : '#6B1414' };
}

/** Blue scale for upside left to target (more upside = deeper blue). */
function upsideColor(v: number) {
  const t = Math.min(1, Math.max(0, v / 40));
  return { bg: `rgba(21,65,152,${0.12 + t * 0.8})`, fg: t > 0.5 ? '#FFFFFF' : '#0B1F52' };
}

export default function MarketsView() {
  const [lens, setLens] = useState<Lens>('today');
  const [open, setOpen] = useState<Tile | null>(null);
  const [session, setSession] = useState<'pre' | 'live' | 'post'>('pre');

  const tiles: Tile[] = useMemo(
    () =>
      LIVE_IDEAS.map((idea) => {
        const q = IDEA_QUOTES.find((x) => x.symbol === idea.symbol)!;
        return {
          idea, q,
          today: pctChange(q.ltp, q.prevClose),
          entry: pctChange(q.ltp, idea.buyPrice),
          toTarget: Math.max(0, pctChange(idea.target2, q.ltp)),
          progress: Math.min(100, Math.max(0, ((q.ltp - idea.stopLoss) / (idea.target2 - idea.stopLoss)) * 100)),
        };
      }).sort((a, b) => (lens === 'today' ? b.today - a.today : lens === 'entry' ? b.entry - a.entry : b.toTarget - a.toTarget)),
    [lens],
  );

  const nifty = HEADLINE_INDICES[0];
  const niftyToday = pctChange(nifty.ltp, nifty.prevClose);
  const up = tiles.filter((t) => t.today > 0).length;
  const avgToday = tiles.reduce((a, t) => a + t.today, 0) / tiles.length;
  const beating = tiles.filter((t) => t.today > niftyToday).length;
  const inProfit = tiles.filter((t) => t.entry > 0).length;

  const valueOf = (t: Tile) => (lens === 'today' ? t.today : lens === 'entry' ? t.entry : t.toTarget);
  const colorOf = (t: Tile) => (lens === 'target' ? upsideColor(t.toTarget) : moveColor(valueOf(t), lens === 'today' ? 4 : 12));

  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="Markets" sub={<>NSE snapshot as of {MARKET_AS_OF} · read alongside your advisory calls</>} />

      {/* Index strip */}
      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {HEADLINE_INDICES.map((i) => {
          const c = pctChange(i.ltp, i.prevClose);
          return (
            <Card key={i.name} className="flex-none w-[164px] p-3.5">
              <div className="text-xs font-bold text-[#6B7381]">{i.short}</div>
              <div className={cn(mono, 'mt-1 text-[17px] font-semibold')}>{i.ltp.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              <div className={cn(mono, 'text-xs font-semibold')} style={{ color: c >= 0 ? GAIN : LOSS }}>{c >= 0 ? '▲' : '▼'} {Math.abs(i.ltp - i.prevClose).toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({Math.abs(c).toFixed(2)}%)</div>
            </Card>
          );
        })}
      </div>

      {/* Advisory heatmap */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <Eyebrow>Advisory heatmap</Eyebrow>
            <h2 className="text-xl font-extrabold tracking-[-0.02em] mt-1">How our live stock ideas are doing</h2>
          </div>
          <Segmented className="sm:w-[360px]" value={lens} onChange={setLens} options={[
            { id: 'today', label: 'Today' },
            { id: 'entry', label: 'Since entry' },
            { id: 'target', label: 'Upside left' },
          ]} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <Summary label="Up today" value={`${up} of ${tiles.length}`} />
          <Summary label="Avg. move today" value={signed(avgToday)} tone={avgToday >= 0 ? 'gain' : 'loss'} />
          <Summary label="Beating Nifty 50" value={`${beating} of ${tiles.length}`} hint={`Nifty ${signed(niftyToday)}`} />
          <Summary label="In profit since entry" value={`${inProfit} of ${tiles.length}`} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {tiles.map((t, i) => {
            const c = colorOf(t);
            const big = i < 2; // the two strongest tiles under the current lens get more room
            return (
              <button key={t.idea.id} onClick={() => setOpen(t)}
                className={cn('relative rounded-xl p-3 text-left transition-transform hover:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#154198]', big ? 'col-span-2 sm:col-span-1 lg:col-span-2 min-h-[132px]' : 'min-h-[112px]')}
                style={{ background: c.bg, color: c.fg }}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-extrabold tracking-wide">{t.idea.symbol}</span>
                  <span className="text-[10.5px] font-bold opacity-80 whitespace-nowrap">{t.idea.category.replace('Term', 'term')}</span>
                </div>
                <div className={cn(mono, 'mt-1 font-semibold', big ? 'text-[28px]' : 'text-[22px]')}>{lens === 'target' ? `${valueOf(t).toFixed(1)}%` : signed(valueOf(t))}</div>
                <div className="text-[11px] font-semibold opacity-85 truncate">{t.idea.name}</div>
                <div className="absolute left-3 right-3 bottom-2.5 h-1 rounded-full bg-black/10 overflow-hidden" title="Position between stop loss and target 2">
                  <div className="h-full rounded-full" style={{ width: `${t.progress}%`, background: c.fg, opacity: 0.7 }} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-[#6B7381]">
          <span>{lens === 'today' ? 'Colour: move vs yesterday’s close.' : lens === 'entry' ? 'Colour: return from our entry price.' : 'Colour: upside left to target 2.'} Bar: where the price sits between stop loss and target 2. Tap a tile for levels.</span>
          <Link href="/app/advisory/stocks" className="inline-flex items-center gap-1 font-extrabold text-[#154198]">All stock ideas<ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
      </section>

      {/* Sector heatmap */}
      <section className="flex flex-col gap-3">
        <div>
          <Eyebrow>Sector heatmap</Eyebrow>
          <h2 className="text-xl font-extrabold tracking-[-0.02em] mt-1">Where today’s move is, and where our ideas sit</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[...SECTORS].sort((a, b) => pctChange(b.ltp, b.prevClose) - pctChange(a.ltp, a.prevClose)).map((s) => {
            const v = pctChange(s.ltp, s.prevClose);
            const c = moveColor(v, 3.5);
            const ours = IDEA_QUOTES.filter((q) => q.sector === s.key).map((q) => q.symbol);
            return (
              <div key={s.key} className="rounded-xl p-3 min-h-[96px] flex flex-col" style={{ background: c.bg, color: c.fg }}>
                <span className="text-[12.5px] font-extrabold leading-tight">{s.short}</span>
                <span className={cn(mono, 'text-lg font-semibold mt-0.5')}>{signed(v)}</span>
                {ours.length > 0 && (
                  <div className="mt-auto pt-1.5 flex flex-wrap gap-1">
                    {ours.map((sym) => <span key={sym} className="text-[9.5px] font-extrabold tracking-wide bg-white/85 text-[#154198] rounded px-1.5 py-0.5">{sym}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[11.5px] text-[#6B7381]">Chips show which of our live stock ideas belong to each sector index. NAUKRI, ETERNAL and BALRAMCHIN don’t map to a sector index here.</p>
      </section>

      {/* Pre / post market breakup */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <Eyebrow>Session breakup</Eyebrow>
            <h2 className="text-xl font-extrabold tracking-[-0.02em] mt-1">Pre-market, live session and post-market</h2>
          </div>
          <Segmented className="sm:w-[400px]" value={session} onChange={setSession} options={[
            { id: 'pre', label: 'Pre-market' },
            { id: 'live', label: 'Session so far' },
            { id: 'post', label: 'Post-market' },
          ]} />
        </div>

        {session === 'pre' && <PreMarket />}
        {session === 'live' && <SessionSoFar />}
        {session === 'post' && (
          <Card className="p-6 flex flex-col items-center text-center gap-2">
            <span className="w-12 h-12 rounded-2xl bg-[#FFF6E3] text-[#C98F1E] flex items-center justify-center"><Sunset className="w-6 h-6" /></span>
            <div className="text-base font-extrabold">Post-market numbers arrive after the close</div>
            <p className="text-[13.5px] text-[#4A525F] max-w-md">This snapshot was taken at {MARKET_AS_OF.split(',')[0]}, while the market was open. Once trading ends at 3:30 PM and the closing session settles the day’s closing prices, this tab shows how our ideas and the indices finished, and how they moved from open to close.</p>
          </Card>
        )}

        <SessionGuide />
      </section>

      <Sheet open={!!open} onClose={() => setOpen(null)} eyebrow={open?.idea.sector} title={open?.idea.name ?? ''}>
        {open && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2"><TermChip>{open.idea.category}</TermChip><span className="text-xs font-semibold text-[#6B7381]">{open.idea.horizon}</span></div>
            <div className="grid grid-cols-3 gap-2 bg-[#F3F5FB] rounded-xl p-3">
              <Fact label="Price now" value={price(open.q.ltp)} />
              <Fact label="Today" value={signed(open.today)} tone={open.today} />
              <Fact label="Since entry" value={signed(open.entry)} tone={open.entry} />
              <Fact label="Entry" value={price(open.idea.buyPrice)} />
              <Fact label="Stop loss" value={price(open.idea.stopLoss)} />
              <Fact label="Target 2" value={price(open.idea.target2)} />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-bold text-[#6B7381]"><span>Stop loss</span><span>{open.progress.toFixed(0)}% of the way</span><span>Target 2</span></div>
              <div className="mt-1 h-2 rounded-full bg-[linear-gradient(90deg,#F6D4D0,#E7ECF6_45%,#CFEBD8)] relative">
                <span className="absolute -top-1 w-1 h-4 rounded bg-[#13235B] -translate-x-0.5" style={{ left: `${open.progress}%` }} />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#2C3550] line-clamp-5">{open.idea.why}</p>
            <Link href="/app/advisory/stocks" onClick={() => setOpen(null)} className="h-12 rounded-xl bg-[#1E3A8A] text-white text-[15px] font-bold flex items-center justify-center gap-2">Open in Stock ideas<ArrowRight className="w-4 h-4" /></Link>
          </div>
        )}
      </Sheet>
    </div>
  );
}

function Summary({ label, value, tone, hint }: { label: string; value: string; tone?: 'gain' | 'loss'; hint?: string }) {
  return (
    <Card className="px-3.5 py-3">
      <div className="text-xs font-semibold text-[#6B7381]">{label}</div>
      <div className={cn(mono, 'text-lg font-semibold')} style={{ color: tone === 'gain' ? GAIN : tone === 'loss' ? LOSS : '#14171C' }}>{value}</div>
      {hint && <div className="text-[11px] text-[#8D95A3]">{hint}</div>}
    </Card>
  );
}

function Fact({ label, value, tone }: { label: string; value: string; tone?: number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#5B6478]">{label}</span>
      <span className="text-[15px] font-bold" style={{ color: tone === undefined ? undefined : tone >= 0 ? GAIN : LOSS }}>{value}</span>
    </div>
  );
}

/** Three-part bar (green / grey / red) with counts. */
function SplitBar({ upN, flatN, downN, labels }: { upN: number; flatN: number; downN: number; labels: [string, string, string] }) {
  const total = upN + flatN + downN || 1;
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {upN > 0 && <div style={{ width: `${(upN / total) * 100}%`, background: '#26A649' }} />}
        {flatN > 0 && <div style={{ width: `${(flatN / total) * 100}%`, background: '#B4BBC7' }} />}
        {downN > 0 && <div style={{ width: `${(downN / total) * 100}%`, background: '#EB4E2C' }} />}
      </div>
      <div className="mt-1.5 flex justify-between text-xs font-bold">
        <span style={{ color: GAIN }}>{upN} {labels[0]}</span>
        <span className="text-[#6B7381]">{flatN} {labels[1]}</span>
        <span style={{ color: LOSS }}>{downN} {labels[2]}</span>
      </div>
    </div>
  );
}

function MoveList({ rows }: { rows: { label: string; sub?: string; from: number; to: number; v: number }[] }) {
  return (
    <div className="divide-y divide-[#E8EBF0]">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center py-2">
          <div className="min-w-0"><div className="text-[13.5px] font-bold truncate">{r.label}</div>{r.sub && <div className="text-[11px] text-[#8D95A3] truncate">{r.sub}</div>}</div>
          <span className={cn(mono, 'text-xs text-[#6B7381] whitespace-nowrap')}>{r.from.toLocaleString('en-IN')} → {r.to.toLocaleString('en-IN')}</span>
          <span className={cn(mono, 'text-[13px] font-semibold w-[68px] text-right')} style={{ color: r.v > 0 ? GAIN : r.v < 0 ? LOSS : '#6B7381' }}>{signed(r.v)}</span>
        </div>
      ))}
    </div>
  );
}

function PreMarket() {
  const gaps = IDEA_QUOTES.map((q) => ({ q, g: gapOf(q), v: pctChange(q.open, q.prevClose) })).sort((a, b) => b.v - a.v);
  const n = HEADLINE_INDICES[0];
  const nGap = pctChange(n.open, n.prevClose);
  const sectorsUp = SECTORS.filter((s) => gapOf(s) === 'up').length;
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]">
      <Card className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#FFF6E3] text-[#C98F1E] flex items-center justify-center"><Sunrise className="w-[18px] h-[18px]" /></span>
          <div><div className="text-sm font-extrabold">How the market opened</div><div className="text-xs text-[#6B7381]">Opening price vs yesterday’s close</div></div>
        </div>
        <div className="rounded-xl bg-[#F3F5FB] p-3.5">
          <div className="text-xs text-[#5B6478]">Nifty 50 opening gap</div>
          <div className={cn(mono, 'text-[26px] font-semibold')} style={{ color: nGap >= 0 ? GAIN : LOSS }}>{signed(nGap)}</div>
          <div className={cn(mono, 'text-xs text-[#6B7381]')}>{n.prevClose.toLocaleString('en-IN')} → {n.open.toLocaleString('en-IN')}</div>
        </div>
        <div><div className="text-xs font-bold text-[#6B7381] mb-1.5">Our {gaps.length} live ideas</div>
          <SplitBar upN={gaps.filter((x) => x.g === 'up').length} flatN={gaps.filter((x) => x.g === 'flat').length} downN={gaps.filter((x) => x.g === 'down').length} labels={['gapped up', 'flat', 'gapped down']} />
        </div>
        <div><div className="text-xs font-bold text-[#6B7381] mb-1.5">{SECTORS.length} sector indices</div>
          <SplitBar upN={sectorsUp} flatN={SECTORS.filter((s) => gapOf(s) === 'flat').length} downN={SECTORS.filter((s) => gapOf(s) === 'down').length} labels={['gapped up', 'flat', 'gapped down']} />
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-extrabold mb-1">Opening gap, stock by stock</div>
        <MoveList rows={gaps.map(({ q, v }) => ({ label: q.symbol, from: q.prevClose, to: q.open, v }))} />
      </Card>
    </div>
  );
}

function SessionSoFar() {
  const rows = IDEA_QUOTES.map((q) => ({ q, v: pctChange(q.ltp, q.open) })).sort((a, b) => b.v - a.v);
  const held = rows.filter((r) => r.v > 0.1).length;
  const faded = rows.filter((r) => r.v < -0.1).length;
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.3fr]">
      <Card className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center"><Activity className="w-[18px] h-[18px]" /></span>
          <div><div className="text-sm font-extrabold">Since the opening bell</div><div className="text-xs text-[#6B7381]">Price now vs opening price</div></div>
        </div>
        <SplitBar upN={held} flatN={rows.length - held - faded} downN={faded} labels={['extended gains', 'flat', 'gave back']} />
        <div className="grid grid-cols-2 gap-2">
          {HEADLINE_INDICES.slice(0, 4).map((i) => {
            const v = pctChange(i.ltp, i.open);
            return (
              <div key={i.name} className="rounded-xl border border-[#E4E8EF] p-2.5">
                <div className="text-[11.5px] font-bold text-[#6B7381]">{i.short}</div>
                <div className={cn(mono, 'text-sm font-semibold')} style={{ color: v >= 0 ? GAIN : LOSS }}>{signed(v)} since open</div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm font-extrabold mb-1">Open → now, stock by stock</div>
        <MoveList rows={rows.map(({ q, v }) => ({ label: q.symbol, sub: `Day range ${q.low.toLocaleString('en-IN')} – ${q.high.toLocaleString('en-IN')}`, from: q.open, to: q.ltp, v }))} />
      </Card>
    </div>
  );
}

function SessionGuide() {
  const rows = [
    { icon: Sunrise, name: 'Pre-market (pre-open)', when: 'Before 9:15 AM', what: 'Orders are collected and matched to find each stock’s opening price. No continuous trading.' },
    { icon: Activity, name: 'Normal market', when: '9:15 AM – 3:30 PM', what: 'Continuous buying and selling. Our entries, targets and stop losses are tracked against these prices.' },
    { icon: Sunset, name: 'Post-market (closing session)', when: 'After 3:30 PM', what: 'The exchange settles the official closing price. Trading, where allowed, happens at that price.' },
  ];
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center gap-2"><Info className="w-4 h-4 text-[#154198]" /><span className="text-sm font-extrabold">How the sessions differ</span></div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.name} className="rounded-xl bg-[#F5F7FC] p-3.5">
              <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-[#154198]" /><span className="text-[13.5px] font-extrabold">{r.name}</span></div>
              <div className={cn(mono, 'text-xs text-[#6B7381] mt-1')}>{r.when}</div>
              <p className="text-[13px] text-[#4A525F] mt-1.5 leading-snug">{r.what}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2.5 items-start rounded-xl border border-[#D9E5FF] bg-[#EEF3FE] p-3.5">
        <ShieldCheck className="w-5 h-5 text-[#154198] flex-none mt-0.5" />
        <p className="text-[13px] leading-relaxed text-[#13235B]">
          <b>We’re a research advisor, not a broker.</b> MyAdvisorAlpha (SEBI RA {BRAND_INFO.sebiRegNo}) publishes the entry, targets and stop loss; you place the order with your own broker. Whether you can place orders before the open, in the closing session or as an after-market order depends on your broker. NSE revised its pre-open and closing sessions this year; see our{' '}
          <Link href="/app/research" className="font-bold underline">research notes</Link> for the details.
        </p>
      </div>
    </Card>
  );
}
