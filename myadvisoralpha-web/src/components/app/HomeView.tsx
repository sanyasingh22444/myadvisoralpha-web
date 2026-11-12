'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Crown, Headset, Bookmark, Quote, PlayCircle, Sparkles, ChevronRight, Gem } from 'lucide-react';
import KycBanner from './KycBanner';
import { Card, Eyebrow, LogoTile } from './ui';
import { mono, GAIN, LOSS } from './styles';
import { Rail, RailItem } from './cards';
import { StockCompact, PortfolioCompact, FuturesCompact, MtfCompact, ClosedCompact } from './productCards';
import { StockSheet } from './advisory/StocksTab';
import { ClosedAboutSheet } from './advisory/ClosedIdeas';
import { MtfPositionsSheet } from './advisory/MtfTab';
import { FuturesWhySheet } from './advisory/FuturesTab';
import { ICONS } from './advisory/PortfoliosTab';
import { useWatchlist } from './watchlist';
import {
  APP_USER, TRACK_RECORD, LIVE_IDEAS, CLOSED_IDEAS, PORTFOLIOS, FUTURES, MTF_BASKETS, RESEARCH, APP_REVIEWS, PARTNERS,
  STOCK_PLAN, SNAPSHOT_AS_OF, APP_LINKS, price, rupees, shortDate,
  type StockIdea, type ClosedIdea, type MtfBasket, type FuturesCall,
} from '@/data/app';
import { HEADLINE_INDICES, MARKET_AS_OF, pctChange } from '@/data/market';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';

export default function HomeView() {
  const [stock, setStock] = useState<{ idea: StockIdea; order: boolean } | null>(null);
  const [closed, setClosed] = useState<ClosedIdea | null>(null);
  const [basket, setBasket] = useState<MtfBasket | null>(null);
  const [fut, setFut] = useState<FuturesCall | null>(null);
  const plan = APP_USER.stockPlan;
  const misses = TRACK_RECORD.totalClosed - TRACK_RECORD.totalWinning;
  const twelve = STOCK_PLAN.durations.find((d) => d.months === 12)!;
  const live = [...LIVE_IDEAS].sort((a, b) => Number(b.featured) - Number(a.featured) || +new Date(b.launchedDate) - +new Date(a.launchedDate));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.03em]">Hello, {APP_USER.firstName} 👋</h1>
        <p className="text-sm text-[#4A525F] font-medium">Your research desk for stocks, portfolios, futures and MTF baskets.</p>
      </div>

      {!APP_USER.kycComplete && <KycBanner />}

      <div className="flex flex-col gap-6 min-w-0">
        <div className="flex flex-col gap-6 min-w-0">
          {/* Plan + accuracy */}
          <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
            <div className="relative overflow-hidden rounded-[20px] bg-[#081026] text-white p-5 border border-[#F5BA31]/60">
              <div aria-hidden className="absolute -top-16 -right-10 w-60 h-60 rounded-full bg-[#F5BA31]/15 blur-[80px]" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <Eyebrow className="text-[#F5BA31]">Your stock plan</Eyebrow>
                  <div className="mt-1 flex items-center gap-2"><Crown className="w-5 h-5 text-[#F5BA31]" /><span className="text-[22px] font-extrabold tracking-[-0.02em]">{plan.name}</span></div>
                  <p className="text-[13px] text-white/65">Active till {shortDate(plan.endDate)}</p>
                </div>
                <span className="text-[11px] font-extrabold uppercase text-[#0E7F58] bg-[#C9F5E4] rounded-md px-2 py-1">Active</span>
              </div>
              <div className="relative mt-4 grid grid-cols-3 gap-3">
                {[[plan.remainingDays, 'days left'], [TRACK_RECORD.totalLive, 'live ideas'], [`${plan.usedIdeas}/${plan.totalIdeas}`, 'acted on']].map(([v, l]) => (
                  <div key={l as string}><div className={cn(mono, 'text-[22px] font-semibold')}>{v}</div><div className="text-xs text-white/60">{l}</div></div>
                ))}
              </div>
              <div className="relative mt-4 flex flex-wrap gap-2">
                <Link href="/app/advisory/stocks" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold">Stock ideas<ArrowRight className="w-4 h-4" /></Link>
                <Link href="/app/plans" className="inline-flex items-center h-10 px-4 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white/[0.06]">Renew or upgrade</Link>
              </div>
            </div>

            <Card className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Eyebrow>Our track record</Eyebrow>
                <Link href="/app/advisory/stocks" className="text-xs font-extrabold text-[#154198]">Closed ideas</Link>
              </div>
              <div className="grid grid-cols-3 text-center">
                <div><div className={cn(mono, 'text-[24px] font-semibold')} style={{ color: GAIN }}>{TRACK_RECORD.totalWinning}</div><div className="text-xs font-semibold text-[#6B7381]">Hit</div></div>
                <div><div className={cn(mono, 'text-[24px] font-semibold')}>{TRACK_RECORD.hitRatePercentage.toFixed(1)}%</div><div className="text-xs font-semibold text-[#6B7381]">Accuracy</div></div>
                <div><div className={cn(mono, 'text-[24px] font-semibold')} style={{ color: LOSS }}>{misses}</div><div className="text-xs font-semibold text-[#6B7381]">Miss</div></div>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                <div style={{ width: `${(TRACK_RECORD.totalWinning / TRACK_RECORD.totalClosed) * 100}%`, background: '#26A649' }} />
                <div style={{ width: `${(misses / TRACK_RECORD.totalClosed) * 100}%`, background: '#EB4E2C' }} />
              </div>
              <div className="flex justify-between text-[12.5px] text-[#4A525F]">
                <span>Avg. return <b className="text-[#1E7A35]">+{TRACK_RECORD.averageProfitPercentage.toFixed(1)}%</b></span>
                <span>Avg. holding <b className="text-[#14171C]">{Math.round(TRACK_RECORD.averageDurationDays)} days</b></span>
              </div>
              <p className="text-[11px] text-[#8D95A3] mt-auto">Every closed idea is published, including losses.</p>
            </Card>
          </div>

          {/* Market strip */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-extrabold tracking-[-0.02em]">Markets today</h2>
              <Link href="/app/markets" className="inline-flex items-center gap-0.5 text-sm font-extrabold text-[#154198] hover:underline">Heatmap<ChevronRight className="w-4 h-4" /></Link>
            </div>
            <div className="-mx-4 sm:mx-0 px-4 sm:px-0 flex gap-2.5 overflow-x-auto [scrollbar-width:none]">
              {HEADLINE_INDICES.slice(0, 6).map((i) => {
                const c = pctChange(i.ltp, i.prevClose);
                return (
                  <Link key={i.name} href="/app/markets" className="flex-none w-[150px] rounded-xl bg-white border border-[#93C5FD] px-3 py-2.5 hover:border-[#3B82F6]">
                    <div className="text-xs font-bold text-[#6B7381]">{i.short}</div>
                    <div className={cn(mono, 'text-[15px] font-semibold')}>{i.ltp.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
                    <div className={cn(mono, 'text-[11.5px] font-semibold')} style={{ color: c >= 0 ? GAIN : LOSS }}>{c >= 0 ? '▲' : '▼'} {Math.abs(c).toFixed(2)}%</div>
                  </Link>
                );
              })}
            </div>
            <p className="text-[11px] text-[#8D95A3]">NSE snapshot, {MARKET_AS_OF}</p>
          </section>

          {/* Watchlist, offer and expert help: one row of their own so they never cover the card rows */}
          <section className="grid gap-4 md:grid-cols-3 items-stretch">
            <Watchlist onOpen={(idea) => setStock({ idea, order: false })} />
            <Link href="/app/plans" className="group relative overflow-hidden rounded-2xl bg-[#081026] text-white p-4 border border-[#F5BA31]/60 flex flex-col">
              <div aria-hidden className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full bg-[#F5BA31]/20 blur-[60px]" />
              <div className="relative flex items-center gap-2 text-[#F5BA31] text-[11px] font-extrabold tracking-[0.14em] uppercase"><Sparkles className="w-3.5 h-3.5" />Offer</div>
              <div className="relative mt-1 text-lg font-extrabold leading-tight">Pay for 6 months, get 6 months free</div>
              <div className="relative mt-1 text-xs text-white/65">12 months of {STOCK_PLAN.name} for {rupees(twelve.price)} <s className="text-white/40">{rupees(twelve.originalPrice)}</s></div>
              <span className="relative mt-auto pt-3 inline-flex items-center gap-1 text-sm font-bold text-[#F5BA31]">See plans<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
            </Link>
            <Card className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center flex-none"><Headset className="w-5 h-5" /></span>
                <div className="min-w-0"><div className="text-sm font-extrabold">Talk to an expert</div><div className="text-xs text-[#6B7381]">{BRAND_INFO.contact.workingHours}</div></div>
              </div>
              <a href={APP_LINKS.helpSupport} target="_blank" rel="noopener noreferrer" className="mt-auto h-10 rounded-[10px] border border-[#C6D0EC] text-[#13235B] text-sm font-bold flex items-center justify-center hover:bg-[#F4F6F9]">Ask a question</a>
            </Card>
          </section>

          <Rail title="Live stock ideas" count={TRACK_RECORD.totalLive} href="/app/advisory/stocks" note={`Prices as of ${SNAPSHOT_AS_OF}`}>
            {live.map((idea) => (
              <RailItem key={idea.id}><StockCompact idea={idea} onAbout={() => setStock({ idea, order: false })} onOrder={() => setStock({ idea, order: true })} /></RailItem>
            ))}
          </Rail>

          <Rail title="Portfolios curated for you" count={PORTFOLIOS.length} href="/app/advisory/portfolios">
            {PORTFOLIOS.map((p) => {
              const Icon = ICONS[p.slug] ?? Gem;
              return <RailItem key={p.id}><PortfolioCompact p={p} icon={<Icon className="w-5 h-5" />} /></RailItem>;
            })}
          </Rail>

          <div className="flex flex-col gap-6">
            <Rail title="Futures calls" count={FUTURES.length} href="/app/advisory/futures" note="New · sample calls while the product launches">
              {FUTURES.map((f) => <RailItem key={f.id}><FuturesCompact f={f} onAbout={() => setFut(f)} /></RailItem>)}
            </Rail>
            <Rail title="MTF baskets" count={MTF_BASKETS.length} href="/app/advisory/mtf" note="New · sample baskets while the product launches">
              {MTF_BASKETS.map((b) => <RailItem key={b.id}><MtfCompact b={b} onPositions={() => setBasket(b)} onAbout={() => setBasket(b)} /></RailItem>)}
            </Rail>
          </div>

          <Rail title="Recently closed" count={TRACK_RECORD.totalClosed} href="/app/advisory/stocks" note="Profit or loss, every closed idea stays published">
            {CLOSED_IDEAS.slice(0, 10).map((c) => <RailItem key={c.id}><ClosedCompact c={c} onAbout={() => setClosed(c)} /></RailItem>)}
          </Rail>

          {/* Research digest */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-extrabold tracking-[-0.02em]">Research digest</h2>
              <Link href="/app/research" className="inline-flex items-center gap-0.5 text-sm font-extrabold text-[#154198] hover:underline">View all<ChevronRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCH.slice(0, 4).map((r) => {
                const yt = r.videoUrl?.match(/[?&]v=([^&]+)/)?.[1];
                const src = r.imageUrl ?? (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : null);
                return (
                  <Link key={r.id} href="/app/research" className="group rounded-2xl bg-white border border-[#93C5FD] overflow-hidden hover:border-[#3B82F6]">
                    <div className="relative aspect-[16/9] bg-[#EEF3FE]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {src && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                      {r.videoUrl && <PlayCircle className="absolute inset-0 m-auto w-10 h-10 text-white drop-shadow-lg" />}
                    </div>
                    <div className="p-3">
                      <div className="text-[10.5px] font-bold text-[#8D95A3] uppercase tracking-wider">{r.videoUrl ? 'Video' : 'Article'} · {shortDate(r.date)}</div>
                      <div className="mt-1 text-[13.5px] font-extrabold leading-snug line-clamp-2 group-hover:text-[#154198]">{r.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

      </div>

      {/* Trust */}
      <section className="rounded-[20px] bg-[#081026] text-white p-5 sm:p-7 relative overflow-hidden">
        <div aria-hidden className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F5BA31]/10 blur-[90px]" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.4fr] items-center">
          <div>
            <Eyebrow className="text-[#F5BA31]">Why investors trust us</Eyebrow>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.02em]">Research led by <span className="text-[#F5BA31]">{BRAND_INFO.founder.name}</span></h2>
            <p className="mt-2 text-sm text-white/70">Former CIO, Axis Mutual Fund · {BRAND_INFO.founder.experience} investing experience</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[[BRAND_INFO.metrics.researchExperience, 'research experience'], ['₹2,000 Cr', 'assets guided'], [BRAND_INFO.metrics.activeInvestors, 'investors']].map(([v, l]) => (
                <div key={l} className="border-l border-[#F5BA31]/40 pl-3"><div className="text-lg font-extrabold">{v}</div><div className="text-[11px] text-white/55">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto snap-x pb-1 [scrollbar-width:none]">
            {APP_REVIEWS.map((r) => (
              <figure key={r.name} className="snap-start flex-none w-[260px] rounded-2xl bg-[#0E1A33] border border-white/10 p-4 flex flex-col gap-3">
                <Quote className="w-5 h-5 text-[#F5BA31]" />
                <blockquote className="text-[13.5px] leading-relaxed text-white/85">{r.text}</blockquote>
                <figcaption className="mt-auto text-xs font-bold">{r.name}{r.role && <span className="block font-medium text-white/50">{r.role}</span>}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Eyebrow>Our partners</Eyebrow>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PARTNERS.map((p) => (
            <div key={p.name} className="h-16 rounded-xl bg-white border border-[#93C5FD] flex items-center justify-center px-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.name} className="max-h-9 max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <StockSheet detail={stock} onClose={() => setStock(null)} />
      <ClosedAboutSheet idea={closed} onClose={() => setClosed(null)} />
      <MtfPositionsSheet basket={basket} onClose={() => setBasket(null)} onAbout={() => setBasket(null)} />
      <FuturesWhySheet f={fut} onClose={() => setFut(null)} />
    </div>
  );
}

/** Saved stock ideas, Univest-style watchlist. */
function Watchlist({ onOpen }: { onOpen: (idea: StockIdea) => void }) {
  const wl = useWatchlist();
  const items = LIVE_IDEAS.filter((i) => wl.has(i.id));
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-extrabold flex items-center gap-1.5"><Bookmark className="w-4 h-4 text-[#154198]" />My watchlist</h2>
        <span className="text-xs font-bold text-[#8D95A3]">{items.length}</span>
      </div>
      {items.length ? (
        <ul className="mt-2 divide-y divide-[#E8EBF0]">
          {items.map((i) => (
            <li key={i.id}>
              <button onClick={() => onOpen(i)} className="w-full flex items-center gap-2.5 py-2 text-left hover:bg-[#F5F7FC] rounded-lg">
                <LogoTile src={i.logoUrl} label={i.symbol} size={32} />
                <span className="flex-1 min-w-0"><span className="block text-[13px] font-extrabold truncate">{i.symbol}</span><span className="block text-[11px] text-[#8D95A3] truncate">{i.category}</span></span>
                <span className="text-right"><span className={cn(mono, 'block text-[12.5px] font-semibold')}>{price(i.currentPrice)}</span><span className={cn(mono, 'block text-[11px] font-semibold')} style={{ color: i.returnPercentage >= 0 ? GAIN : LOSS }}>{i.returnPercentage >= 0 ? '+' : ''}{i.returnPercentage.toFixed(2)}%</span></span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[12.5px] text-[#6B7381] leading-relaxed">Tap the bookmark on any stock idea to follow it here. Your watchlist is saved in this browser.</p>
      )}
    </Card>
  );
}
