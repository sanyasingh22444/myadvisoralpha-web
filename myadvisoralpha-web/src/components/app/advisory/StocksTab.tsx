'use client';

import { useMemo, useState } from 'react';
import { Calendar, ShoppingCart, Activity, Bookmark, BookmarkCheck, Eye, ChevronLeft, ArrowRight, ShieldCheck, Search, X, FileText } from 'lucide-react';
import {
  LIVE_IDEAS, CLOSED_IDEAS, TRACK_RECORD, SNAPSHOT_AS_OF, inBuyRange, price, shortDate,
  type StockIdea, type IdeaCategory,
} from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import ClosedIdeas from './ClosedIdeas';
import { StockCompact } from '../productCards';
import { useWatchlist } from '../watchlist';
import { cn } from '@/lib/utils';
import {
  Card, Change, FeaturedChip, LevelTrack, LogoTile, Segmented, Sheet, StatStrip, TermChip, Disclaimer,
  goldBtn, ghostBtn, blueBtn, mono, GAIN, LOSS,
} from '../ui';

type Term = 'All' | IdeaCategory;
type Chip = 'featured' | 'range' | 'potential';

const TERMS: Term[] = ['All', 'Short Term', 'Mid Term', 'Long Term'];
const CHIPS: { id: Chip; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'range', label: 'In buy range' },
  { id: 'potential', label: 'Potential > 15%' },
];

const daysBetween = (a: string, b: string) => Math.max(1, Math.round((+new Date(b) - +new Date(a)) / 86400000));

export default function StocksTab() {
  const [live, setLive] = useState<'live' | 'past'>('live');
  const [term, setTerm] = useState<Term>('All');
  const [chips, setChips] = useState<Chip[]>([]);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState<{ idea: StockIdea; order: boolean } | null>(null);

  const q = query.trim().toLowerCase();
  const match = (s: { name: string; symbol: string; sector: string }) =>
    !q || s.name.toLowerCase().includes(q) || s.symbol.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q);

  const ideas = useMemo(
    () =>
      LIVE_IDEAS.filter((i) => (term === 'All' || i.category === term) && match(i))
        .filter((i) => !chips.includes('featured') || i.featured)
        .filter((i) => !chips.includes('range') || inBuyRange(i))
        .filter((i) => !chips.includes('potential') || i.upsidePotential > 15)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned) || +new Date(b.launchedDate) - +new Date(a.launchedDate)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [term, chips, q],
  );
  const closed = CLOSED_IDEAS.filter((i) => (term === 'All' || i.category === term) && match(i));

  const toggleChip = (c: Chip) => setChips((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <Card className="p-3 sm:p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
          <Segmented
            className="sm:w-[300px]"
            value={live}
            onChange={setLive}
            options={[
              { id: 'live', label: <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#279D46]" />Live <span className={cn(mono, 'text-[11px] opacity-70')}>{TRACK_RECORD.totalLive}</span></span> },
              { id: 'past', label: <span>Past <span className={cn(mono, 'text-[11px] opacity-70')}>{TRACK_RECORD.totalClosed}</span></span> },
            ]}
          />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8D95A3]" />
            <input
              type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, ticker or sector"
              className="w-full h-10 rounded-[10px] border border-[#DFE4EC] bg-[#F7F9FC] pl-9 pr-9 text-[13.5px] font-semibold outline-none focus:border-[#154198] focus:bg-white focus:shadow-[0_0_0_3px_rgba(21,65,152,.28)]"
            />
            {query && <button aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#8D95A3]"><X className="w-4 h-4" /></button>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div role="radiogroup" aria-label="Holding period" className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {TERMS.map((t) => (
              <button key={t} role="radio" aria-checked={term === t} onClick={() => setTerm(t)} className={cn('flex items-center gap-1.5 text-[13px]', term === t ? 'font-extrabold text-[#154198]' : 'font-semibold text-[#4C5462]')}>
                <span className={cn('w-3.5 h-3.5 rounded-full border-2', term === t ? 'border-[#154198] bg-[radial-gradient(circle,#154198_40%,transparent_45%)]' : 'border-[#B4BBC7]')} />
                {t}
              </button>
            ))}
          </div>
          {live === 'live' && (
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              {CHIPS.map((c) => (
                <button key={c.id} onClick={() => toggleChip(c.id)} aria-pressed={chips.includes(c.id)}
                  className={cn('h-8 px-3 rounded-full border text-[12.5px] whitespace-nowrap transition-colors', chips.includes(c.id) ? 'border-[#154198] bg-[#EEF3FE] text-[#154198] font-extrabold' : 'border-[#DFE4EC] bg-white text-[#4C5462] font-semibold')}>
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {live === 'live' && (
        <StatStrip
          items={[
            { label: 'Hit rate', value: `${TRACK_RECORD.hitRatePercentage.toFixed(1)}%` },
            { label: 'Avg. return', value: `+${TRACK_RECORD.averageProfitPercentage.toFixed(1)}%`, tone: 'gain' },
            { label: 'Avg. holding', value: `${Math.round(TRACK_RECORD.averageDurationDays)} days` },
          ]}
        />
      )}

      {live === 'live' ? (
        ideas.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
            {ideas.map((idea) => (
              <StockCompact key={idea.id} idea={idea} onAbout={() => setDetail({ idea, order: false })} onOrder={() => setDetail({ idea, order: true })} />
            ))}
          </div>
        ) : (
          <Empty query={query} />
        )
      ) : closed.length ? (
        <ClosedIdeas ideas={closed} />
      ) : (
        <Empty query={query} />
      )}

      <Disclaimer>
        {live === 'live'
          ? <>Showing the latest {LIVE_IDEAS.length} of {TRACK_RECORD.totalLive} live ideas. Prices as of {SNAPSHOT_AS_OF}.</>
          : <>All {CLOSED_IDEAS.length} closed ideas as of 5 Nov 2026. A close at or above the entry price counts as a hit.</>}{' '}Track record: {TRACK_RECORD.totalWinning} of {TRACK_RECORD.totalClosed} closed ideas hit. Investment in securities market are subject to market risks. Read all related documents carefully before investing. Past performance may or may not be sustained in the future.
      </Disclaimer>

      <StockSheet detail={detail} onClose={() => setDetail(null)} />
    </div>
  );
}

/** "About idea" panel: the full card (or its order screen), the rationale and the report. Reused by Home and search. */
export function StockSheet({ detail, onClose }: { detail: { idea: StockIdea; order: boolean } | null; onClose: () => void }) {
  const wl = useWatchlist();
  const idea = detail?.idea;
  return (
    <Sheet open={!!idea} onClose={onClose} wide eyebrow={detail?.order ? 'Place order' : 'About idea'} title={idea ? `${idea.name} · ${idea.symbol}` : ''}>
      {idea && (
        <div className="flex flex-col gap-4">
          <IdeaCard key={`${idea.id}-${detail.order}`} idea={idea} saved={wl.has(idea.id)} onSave={() => wl.toggle(idea.id)} initialFlipped={detail.order} />
          <div>
            <h3 className="text-sm font-extrabold mb-1">Why we like it</h3>
            <p className="text-sm leading-[1.6] text-[#2C3550]">{idea.why}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-[#F3F5FB] rounded-xl p-3">
            <Fact label="Horizon" value={idea.horizon} />
            <Fact label="Sector" value={idea.sector} />
            <Fact label="Upside left" value={`${idea.upsidePotential.toFixed(1)}%`} />
          </div>
          {idea.reportUrl && (
            <a href={idea.reportUrl} target="_blank" rel="noopener noreferrer" className={cn(ghostBtn, 'h-12 text-[15px]')}><FileText className="w-4 h-4" />Read the research report</a>
          )}
          <p className="text-[11px] leading-4 text-[#5B6478]">Research for information only. SEBI RA Reg. No. {BRAND_INFO.sebiRegNo}. Investments in the securities market are subject to market risks.</p>
        </div>
      )}
    </Sheet>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-[#5B6478]">{label}</span>
      <span className="text-[15px] font-bold">{value}</span>
    </div>
  );
}

function Empty({ query }: { query: string }) {
  return (
    <div className="py-10 text-center">
      <div className="text-sm font-extrabold">{query ? `No ideas match "${query}"` : 'No ideas match these filters'}</div>
      <div className="text-[12.5px] font-semibold text-[#8D95A3] mt-1">Try a company name, ticker or sector, or clear a filter.</div>
    </div>
  );
}

/** Full stock idea card from the Advisory tab design (levels, buy range, order screen). Shown inside the About panel. */
export function IdeaCard({ idea, saved, onSave, onWhy, initialFlipped = false }: { idea: StockIdea; saved: boolean; onSave: () => void; onWhy?: () => void; initialFlipped?: boolean }) {
  const [flipped, setFlipped] = useState(initialFlipped);
  const [qty, setQty] = useState(1);
  const since = idea.returnPercentage;

  if (flipped) {
    return (
      <Card className="overflow-hidden">
        <div className="bg-[linear-gradient(120deg,#2D4CD2_0%,#1D3296_100%)] px-3.5 py-3 flex items-center gap-2.5 text-white">
          <button aria-label="Back to idea" onClick={() => setFlipped(false)} className="w-[30px] h-[30px] rounded-lg border border-white/20 flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex-1 min-w-0">
            <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#E9CB66]">Buy order</div>
            <div className="text-[17px] font-extrabold tracking-[-0.02em] truncate">{idea.name}</div>
          </div>
          <div className={cn(mono, 'text-sm font-semibold')}>{price(idea.currentPrice)}</div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div>
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8D95A3] text-center">Quantity</div>
            <div className="mt-2.5 flex items-center justify-center gap-4">
              <button aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((n) => Math.max(1, n - 1))} className="w-[46px] h-[46px] rounded-xl border border-[#DFE4EC] text-2xl font-bold disabled:opacity-40">−</button>
              <input aria-label="Quantity" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className={cn(mono, 'w-24 h-[46px] rounded-xl border border-[#DFE4EC] text-[30px] font-semibold text-center outline-none focus:border-[#154198]')} />
              <button aria-label="Increase quantity" onClick={() => setQty((n) => n + 1)} className="w-[46px] h-[46px] rounded-xl border border-[#DFE4EC] text-2xl font-bold">+</button>
            </div>
          </div>
          <div className="border border-[#E8EBF0] rounded-[14px] p-3.5 flex flex-col gap-2">
            <div className="flex justify-between text-[13px]"><span className="font-semibold text-[#6B7381]">{qty} × {price(idea.currentPrice)}</span><span className="text-[11.5px] font-semibold text-[#8D95A3]">Market order</span></div>
            <div className="flex justify-between items-baseline border-t border-[#E8EBF0] pt-2"><span className="text-[13px] font-bold">Amount to invest</span><span className={cn(mono, 'text-[19px] font-semibold')}>{price(qty * idea.currentPrice)}</span></div>
          </div>
          <p className="text-xs font-semibold text-[#D93A32] text-center">Final invested amount may vary based on live market prices at execution</p>
          <a href={BRAND_INFO.deepLinks.webLogin} target="_blank" rel="noopener noreferrer" className={cn(goldBtn, 'h-12 text-[15.5px]')}>Confirm order<ArrowRight className="w-4 h-4" /></a>
          <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#8D95A3]"><ShieldCheck className="w-3.5 h-3.5" />Executed via smallcase gateway · SEBI Reg. {BRAND_INFO.sebiRegNo}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-[#E9EEF9] px-3.5 pt-2.5 pb-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7381]"><Calendar className="w-3 h-3" />{shortDate(idea.launchedDate)}</span>
          <span className="flex items-center gap-1.5">{idea.featured && <FeaturedChip />}<TermChip>{idea.category}</TermChip></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-[#6B7381]">Since launch</span>
          <span className={cn(mono, 'text-[11.5px] font-semibold rounded-md px-1.5 py-0.5')} style={{ color: since >= 0 ? GAIN : LOSS, background: since >= 0 ? '#E3F5E7' : '#FDECEC' }}>{since >= 0 ? '+' : ''}{since.toFixed(2)}%</span>
          <span className="w-px h-3.5 bg-[#CDD6E6] ml-auto mr-1" />
          <span className="text-[11px] font-semibold text-[#6B7381]">Potential left</span>
          <span className={cn(mono, 'text-[11.5px] font-semibold bg-white border border-[#DFE4EC] rounded-md px-1.5 py-0.5')}>{idea.upsidePotential.toFixed(1)}%</span>
        </div>
      </div>

      <div className="px-3.5 pt-3 pb-3.5 flex flex-col gap-2.5">
        <div className="flex gap-3 items-start">
          <LogoTile src={idea.logoUrl} label={idea.symbol} />
          <div className="flex-1 min-w-0">
            <div className="text-[19px] font-extrabold tracking-[-0.02em] truncate">{idea.name}</div>
            <div className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className={cn(mono, 'text-[13px] font-semibold')}>{price(idea.currentPrice)}</span>
              <Change value={idea.dayChangePercentage} />
            </div>
          </div>
          <button onClick={onSave} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} className={cn('w-9 h-9 rounded-lg border flex items-center justify-center', saved ? 'border-[#154198] bg-[#EEF3FE] text-[#154198]' : 'border-[#DFE4EC] text-[#4C5462]')}>
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        <LevelTrack
          current={idea.currentPrice}
          levels={[
            { label: 'Stop loss', value: idea.stopLoss, tone: 'sl' },
            { label: 'Entry', value: idea.buyPrice, tone: 'entry' },
            { label: 'Target 1', value: idea.target1, tone: 'target' },
            { label: 'Target 2', value: idea.target2, tone: 'target' },
          ]}
        />

        <div className="border-t border-[#E8EBF0] pt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div><div className="text-[11.5px] text-[#8D95A3] font-semibold">Buy range</div><div className="text-sm font-semibold mt-0.5">{idea.buyRange && !idea.buyRange.startsWith('0-')
            ? <span className={mono}>{idea.buyRange.split('-').map((n) => Number(n).toLocaleString('en-IN')).join(' – ')}</span>
            : <>Up to <span className={mono}>{(idea.buyRange ? Number(idea.buyRange.split('-')[1]) : idea.target1).toLocaleString('en-IN')}</span></>}</div></div>
          <div className="text-center"><div className="text-[11.5px] text-[#8D95A3] font-semibold">Action</div><span className="mt-0.5 inline-flex items-center gap-1 bg-[#E7F6EE] border border-[#BFE6D4] text-[#0E7F58] rounded-lg px-2.5 py-1 text-[13px] font-bold"><ShoppingCart className="w-3.5 h-3.5" />Buy</span></div>
          <div className="text-right"><div className="text-[11.5px] text-[#8D95A3] font-semibold">Entry</div><div className={cn(mono, 'text-sm font-semibold mt-0.5')}>{price(idea.buyPrice)}</div></div>
        </div>

        {idea.buyMore && (
          <div className="rounded-lg bg-[#FFF6E3] border border-[#F2D79A] px-3 py-2 text-[12px] font-semibold text-[#6E4C0B]">
            Buy more added at {price(idea.buyMore.price)} on {shortDate(idea.buyMore.date)} · launch {price(idea.launchedPrice)}
          </div>
        )}

        <div className="border-t border-[#E8EBF0] pt-2.5 flex justify-between">
          <div><div className="text-[11.5px] text-[#8D95A3] font-semibold">Stop loss</div><div className={cn(mono, 'text-[15px] font-semibold mt-0.5')}>{price(idea.stopLoss)}</div></div>
          <div className="text-right"><div className="text-[11.5px] text-[#8D95A3] font-semibold">Duration</div><div className="text-[15px] font-bold mt-0.5">{idea.horizon}</div></div>
        </div>

        <div className="border-t border-[#E8EBF0] pt-2.5 flex gap-2.5">
          {onWhy && <button onClick={onWhy} className={cn(ghostBtn, 'h-11 flex-1 text-sm')}><Activity className="w-4 h-4" />Why this stock?</button>}
          <button onClick={() => setFlipped(true)} className={cn(goldBtn, 'h-11 flex-1 text-[14.5px]')}><ShoppingCart className="w-4 h-4" />Place order</button>
        </div>
      </div>
    </Card>
  );
}
