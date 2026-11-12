'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Crown, Headset, Bookmark, PlayCircle, Sparkles, ChevronRight, TrendingUp, Briefcase, Activity, Layers,
  PieChart, Flame, Newspaper, History, ShieldCheck,
} from 'lucide-react';
import KycBanner from './KycBanner';
import { Card, LogoTile } from './ui';
import { mono, GAIN, LOSS } from './styles';
import { Rail, RailItem } from './cards';
import { StockCompact } from './productCards';
import { StockSheet } from './advisory/StocksTab';
import { useWatchlist } from './watchlist';
import {
  APP_USER, TRACK_RECORD, LIVE_IDEAS, PORTFOLIOS, FUTURES, MTF_BASKETS, RESEARCH, STOCK_PLAN, APP_LINKS, CLOSED_IDEAS,
  price, rupees, shortDate, type StockIdea,
} from '@/data/app';
import { HEADLINE_INDICES, MARKET_AS_OF, pctChange } from '@/data/market';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';

/**
 * Home, kept light the way Univest's app home is: a short status strip, an icon grid to
 * explore each product, the market strip, one short row of featured ideas and the research
 * digest. Full lists live on each product's own page.
 */
const EXPLORE = [
  { href: '/app/advisory/stocks', label: 'Stock ideas', sub: `${TRACK_RECORD.totalLive} live`, icon: TrendingUp },
  { href: '/app/advisory/portfolios', label: 'Portfolios', sub: `${PORTFOLIOS.length} curated`, icon: Briefcase },
  { href: '/app/advisory/futures', label: 'Futures', sub: `${FUTURES.length} calls`, icon: Activity, isNew: true },
  { href: '/app/advisory/mtf', label: 'MTF Baskets', sub: `${MTF_BASKETS.length} baskets`, icon: Layers, isNew: true },
  { href: '/app/mutual-funds', label: 'Mutual Funds', sub: 'Start a SIP', icon: PieChart },
  { href: '/app/markets', label: 'Markets', sub: 'Heatmap', icon: Flame },
  { href: '/app/advisory/stocks', label: 'Track record', sub: `${CLOSED_IDEAS.length} closed`, icon: History },
  { href: '/app/research', label: 'Research', sub: `${RESEARCH.length} insights`, icon: Newspaper },
];

export default function HomeView() {
  const [stock, setStock] = useState<{ idea: StockIdea; order: boolean } | null>(null);
  const plan = APP_USER.stockPlan;
  const misses = TRACK_RECORD.totalClosed - TRACK_RECORD.totalWinning;
  const twelve = STOCK_PLAN.durations.find((d) => d.months === 12)!;
  const featured = LIVE_IDEAS.filter((i) => i.featured).slice(0, 6);

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.03em]">Hello, {APP_USER.firstName} 👋</h1>
        <p className="text-sm text-[#4A525F] font-medium">What would you like to explore today?</p>
      </div>

      {!APP_USER.kycComplete && <KycBanner />}

      {/* Status strip: plan + track record, one line each */}
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/app/plans" className="group relative overflow-hidden rounded-2xl bg-[#081026] text-white px-4 py-3.5 border border-[#F5BA31]/60 flex items-center gap-3">
          <div aria-hidden className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-[#F5BA31]/15 blur-[60px]" />
          <span className="relative w-10 h-10 rounded-xl bg-[#F5BA31]/15 text-[#F5BA31] flex items-center justify-center flex-none"><Crown className="w-5 h-5" /></span>
          <div className="relative flex-1 min-w-0">
            <div className="text-[15px] font-extrabold truncate">{plan.name} <span className="ml-1 align-middle text-[10px] font-extrabold uppercase text-[#0E7F58] bg-[#C9F5E4] rounded px-1.5 py-0.5">Active</span></div>
            <div className="text-xs text-white/65">{plan.remainingDays} days left · till {shortDate(plan.endDate)}</div>
          </div>
          <span className="relative text-[13px] font-bold text-[#F5BA31] inline-flex items-center gap-0.5">Renew<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
        </Link>
        <Link href="/app/advisory/stocks" className="group rounded-2xl bg-white border border-[#93C5FD] px-4 py-3.5 flex items-center gap-3 hover:border-[#3B82F6]">
          <span className="w-10 h-10 rounded-xl bg-[#E3F5E7] text-[#1E7A35] flex items-center justify-center flex-none"><ShieldCheck className="w-5 h-5" /></span>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-extrabold"><span className={mono}>{TRACK_RECORD.hitRatePercentage.toFixed(1)}%</span> accuracy</div>
            <div className="text-xs text-[#6B7381]"><span style={{ color: GAIN }} className="font-bold">{TRACK_RECORD.totalWinning} hit</span> · <span style={{ color: LOSS }} className="font-bold">{misses} miss</span> · avg. +{TRACK_RECORD.averageProfitPercentage.toFixed(1)}%</div>
          </div>
          <span className="text-[13px] font-bold text-[#154198] inline-flex items-center gap-0.5">Track record<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
        </Link>
      </div>

      {/* Explore: product icons */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold tracking-[-0.02em]">Explore</h2>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-4 sm:gap-3">
          {EXPLORE.map((e) => {
            const Icon = e.icon;
            return (
              <Link key={e.label} href={e.href} className="group flex flex-col items-center text-center gap-1.5 sm:rounded-2xl sm:bg-white sm:border sm:border-[#93C5FD] sm:py-4 sm:px-2 sm:hover:border-[#3B82F6] sm:hover:shadow-[0_10px_24px_-14px_rgba(19,35,91,.35)] transition-all">
                <span className="relative w-14 h-14 rounded-2xl bg-[#081026] text-[#F5BA31] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                  {e.isNew && <span className="absolute -top-1.5 -right-2 text-[8.5px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-1.5 py-px">New</span>}
                </span>
                <span className="text-[12.5px] sm:text-[13.5px] font-extrabold leading-tight">{e.label}</span>
                <span className="hidden sm:block text-[11.5px] text-[#6B7381]">{e.sub}</span>
              </Link>
            );
          })}
        </div>
      </section>

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

      {/* One short row of featured ideas, Univest's "live trades" row */}
      <Rail title="Featured stock ideas" count={featured.length} href="/app/advisory/stocks" note={`${TRACK_RECORD.totalLive} live ideas in all`}>
        {featured.map((idea) => (
          <RailItem key={idea.id}><StockCompact idea={idea} onAbout={() => setStock({ idea, order: false })} onOrder={() => setStock({ idea, order: true })} /></RailItem>
        ))}
      </Rail>

      {/* Watchlist, offer, expert */}
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

      {/* Research digest */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-extrabold tracking-[-0.02em]">Research digest</h2>
          <Link href="/app/research" className="inline-flex items-center gap-0.5 text-sm font-extrabold text-[#154198] hover:underline">View all<ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {RESEARCH.slice(0, 4).map((r) => {
            const yt = r.videoUrl?.match(/[?&]v=([^&]+)/)?.[1];
            const src = r.imageUrl ?? (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : null);
            return (
              <Link key={r.id} href="/app/research" className="group rounded-2xl bg-white border border-[#93C5FD] overflow-hidden hover:border-[#3B82F6]">
                <div className="relative aspect-[16/9] bg-[#081026]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {src && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
                  {r.videoUrl && <PlayCircle className="absolute inset-0 m-auto w-10 h-10 text-white drop-shadow-lg" />}
                </div>
                <div className="p-3">
                  <div className="text-[10.5px] font-bold text-[#8D95A3] uppercase tracking-wider">{r.videoUrl ? 'Video' : 'Article'} · {shortDate(r.date)}</div>
                  <div className="mt-1 text-[13px] sm:text-[13.5px] font-extrabold leading-snug line-clamp-2 group-hover:text-[#154198]">{r.title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* One-line trust strip instead of the full reviews section */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl bg-[#081026] text-white px-5 py-4 text-[13px]">
        <span>Research led by <b className="text-[#F5BA31]">{BRAND_INFO.founder.name}</b>, former CIO, Axis MF</span>
        <span className="text-white/70">{BRAND_INFO.metrics.researchExperience} experience</span>
        <span className="text-white/70">{BRAND_INFO.metrics.activeInvestors} investors</span>
        <span className="text-white/70">SEBI RA {BRAND_INFO.sebiRegNo}</span>
      </div>

      <StockSheet detail={stock} onClose={() => setStock(null)} />
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
          {items.slice(0, 4).map((i) => (
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
