import Link from 'next/link';
import {
  ArrowRight, TrendingUp, Briefcase, Activity, Layers, PieChart, Crown, CalendarDays, Wallet, PlayCircle, Quote, ShieldCheck,
} from 'lucide-react';
import KycBanner from '@/components/app/KycBanner';
import { Card, Change, Eyebrow, LogoTile, TermChip } from '@/components/app/ui';
import { goldBtn, mono, GAIN, LOSS } from '@/components/app/styles';
import {
  APP_USER, TRACK_RECORD, LIVE_IDEAS, RESEARCH, APP_REVIEWS, PARTNERS, PORTFOLIOS, STOCK_PLAN, SNAPSHOT_AS_OF,
  price, rupees, shortDate,
} from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';

const SHORTCUTS = [
  { href: '/app/advisory/stocks', label: 'Stocks', sub: `${TRACK_RECORD.totalLive} live ideas`, icon: TrendingUp },
  { href: '/app/advisory/portfolios', label: 'Portfolios', sub: `${PORTFOLIOS.length} model portfolios`, icon: Briefcase },
  { href: '/app/advisory/futures', label: 'Futures', sub: 'Index & stock calls', icon: Activity, isNew: true },
  { href: '/app/advisory/mtf', label: 'MTF Baskets', sub: '3-stock baskets', icon: Layers, isNew: true },
  { href: '/app/mutual-funds', label: 'Mutual Funds', sub: 'SIP in 2 minutes', icon: PieChart },
];

export default function AppHome() {
  const plan = APP_USER.stockPlan;
  const featured = LIVE_IDEAS.filter((i) => i.featured).slice(0, 3);
  const twelve = STOCK_PLAN.durations.find((d) => d.months === 12)!;
  const bestPortfolio = PORTFOLIOS.reduce((a, b) => ((b.cagr ?? 0) > (a.cagr ?? 0) ? b : a));

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div className="lg:hidden">
        <h1 className="text-[24px] font-extrabold tracking-[-0.03em]">Hello, {APP_USER.firstName} 👋</h1>
        <p className="text-sm text-[#4A525F] font-medium">Here&apos;s what&apos;s moving in your account today.</p>
      </div>

      {!APP_USER.kycComplete && <KycBanner />}

      {/* Plan + investments */}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative overflow-hidden rounded-[20px] bg-[#081026] text-white p-5 sm:p-6 border border-[#F5BA31]/60 shadow-[0_12px_40px_-12px_rgba(8,16,38,0.6)]">
          <div aria-hidden className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-[#F5BA31]/15 blur-[80px]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <Eyebrow className="text-[#F5BA31]">Your stock plan</Eyebrow>
              <div className="mt-1.5 flex items-center gap-2"><Crown className="w-5 h-5 text-[#F5BA31]" /><span className="text-2xl font-extrabold tracking-[-0.02em]">{plan.name}</span></div>
              <p className="text-sm text-white/65 mt-1">{plan.durationMonths}-month plan · active till {shortDate(plan.endDate)}</p>
            </div>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0E7F58] bg-[#C9F5E4] rounded-md px-2 py-1">Active</span>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-3">
            <div><div className={cn(mono, 'text-2xl font-semibold')}>{plan.remainingDays}</div><div className="text-xs text-white/60">days left</div></div>
            <div><div className={cn(mono, 'text-2xl font-semibold')}>{TRACK_RECORD.totalLive}</div><div className="text-xs text-white/60">live ideas</div></div>
            <div><div className={cn(mono, 'text-2xl font-semibold')}>{plan.usedIdeas}/{plan.totalIdeas}</div><div className="text-xs text-white/60">ideas acted on</div></div>
          </div>
          <div className="relative mt-5 flex flex-wrap gap-2.5">
            <Link href="/app/advisory/stocks" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-sm font-bold">View stock ideas<ArrowRight className="w-4 h-4" /></Link>
            <Link href="/app/plans" className="inline-flex items-center h-11 px-5 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white/[0.06]">Renew or upgrade</Link>
          </div>
        </div>

        <Card className="p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <Eyebrow>Your investments</Eyebrow>
            <Wallet className="w-5 h-5 text-[#154198]" />
          </div>
          <div className={cn(mono, 'mt-2 text-[34px] font-semibold tracking-[-0.01em]')}>{rupees(APP_USER.investment.currentValue)}</div>
          <div className="text-sm text-[#6B7381]">Current value · invested {rupees(APP_USER.investment.totalInvestment)}</div>
          <p className="mt-4 text-[13.5px] text-[#4A525F] leading-relaxed">You haven&apos;t invested in a model portfolio yet. {bestPortfolio.name} has delivered {bestPortfolio.cagr?.toFixed(2)}% CAGR since {bestPortfolio.launchDate}.</p>
          <Link href="/app/advisory/portfolios" className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#154198] hover:underline">Explore portfolios<ArrowRight className="w-4 h-4" /></Link>
        </Card>
      </div>

      {/* Product shortcuts */}
      <section>
        <h2 className="text-lg font-extrabold tracking-[-0.02em] mb-3">Invest your way</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SHORTCUTS.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href} className="group relative rounded-[14px] bg-white border border-[#E4E8EF] p-4 hover:border-[#154198] hover:shadow-[0_8px_24px_-6px_rgba(11,19,32,.14)] transition-all">
                {s.isNew && <span className="absolute top-3 right-3 text-[9.5px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-1.5 py-px">New</span>}
                <span className="w-10 h-10 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center group-hover:bg-[#154198] group-hover:text-[#F5BA31] transition-colors"><Icon className="w-5 h-5" /></span>
                <div className="mt-3 text-[15px] font-extrabold">{s.label}</div>
                <div className="text-xs font-semibold text-[#6B7381]">{s.sub}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Offers */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/app/plans" className="group relative overflow-hidden rounded-[20px] bg-[linear-gradient(140deg,#1E2A4A_0%,#0B1320_70%)] text-white p-5 sm:p-6 border border-[#F5BA31]/50">
          <div aria-hidden className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#F5BA31]/15 blur-[70px]" />
          <Eyebrow className="relative text-[#F5BA31]">Single stock ideas</Eyebrow>
          <div className="relative mt-2 text-[26px] leading-tight font-extrabold tracking-[-0.02em]">Pay for 6 months.<br /><span className="text-[#F5BA31]">Get 6 months free.</span></div>
          <p className="relative mt-2 text-sm text-white/70">12 months of {STOCK_PLAN.name} for {rupees(twelve.price)} <s className="text-white/40">{rupees(twelve.originalPrice)}</s></p>
          <span className={cn(goldBtn, 'relative mt-4 h-10 px-4 text-sm')}>Explore plans<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
        </Link>
        <Link href="/app/advisory/portfolios" className="group relative overflow-hidden rounded-[20px] bg-white border border-[#BECBEE] p-5 sm:p-6">
          <Eyebrow className="text-[#154198]">Stock portfolios</Eyebrow>
          <div className="mt-2 text-[26px] leading-tight font-extrabold tracking-[-0.02em]">Diversify smarter.<br />Invest better.</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {PORTFOLIOS.map((p) => <span key={p.id} className="text-xs font-bold text-[#154198] bg-[#EEF3FE] border border-[#D9E5FF] rounded-full px-2.5 py-1">{p.name.replace('Alpha ', '')}</span>)}
          </div>
          <span className="mt-4 inline-flex items-center gap-1.5 h-10 px-4 rounded-[10px] bg-[#154198] text-white text-sm font-bold">Explore portfolios<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
        </Link>
      </div>

      {/* Track record */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
          <div>
            <Eyebrow>Stock ideas track record</Eyebrow>
            <h2 className="text-lg font-extrabold tracking-[-0.02em] mt-1">Every closed idea published, including losses</h2>
          </div>
          <span className="text-xs font-semibold text-[#8D95A3]">As of {SNAPSHOT_AS_OF}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ['Hit rate', `${TRACK_RECORD.hitRatePercentage.toFixed(1)}%`],
            ['Avg. return', `+${TRACK_RECORD.averageProfitPercentage.toFixed(1)}%`],
            ['Avg. holding', `${Math.round(TRACK_RECORD.averageDurationDays)} days`],
            ['Profitable ideas', `${TRACK_RECORD.totalWinning}/${TRACK_RECORD.totalClosed}`],
          ].map(([l, v], i) => (
            <div key={l} className={cn('flex flex-col', i > 0 && 'sm:border-l sm:border-[#E8EBF0] sm:pl-4')}>
              <span className={cn(mono, 'text-[26px] font-semibold', i === 1 && 'text-[#1E7A35]')}>{v}</span>
              <span className="text-xs font-semibold text-[#6B7381]">{l}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Featured ideas */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold tracking-[-0.02em]">Featured stock ideas</h2>
          <Link href="/app/advisory/stocks" className="text-sm font-extrabold text-[#154198] inline-flex items-center gap-1">See all<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((i) => (
            <Link key={i.id} href="/app/advisory/stocks" className="rounded-[14px] bg-white border border-[#E4E8EF] p-4 hover:border-[#154198] transition-colors flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <LogoTile src={i.logoUrl} label={i.symbol} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold truncate">{i.name}</div>
                  <div className="flex items-baseline gap-1.5"><span className={cn(mono, 'text-[13px] font-semibold')}>{price(i.currentPrice)}</span><Change value={i.dayChangePercentage} /></div>
                </div>
                <TermChip>{i.category}</TermChip>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center bg-[#F3F5FB] rounded-xl py-2.5">
                <div><div className="text-[11px] text-[#8D95A3] font-semibold">Entry</div><div className={cn(mono, 'text-[13px] font-semibold')}>{price(i.buyPrice)}</div></div>
                <div><div className="text-[11px] text-[#8D95A3] font-semibold">Target 2</div><div className={cn(mono, 'text-[13px] font-semibold text-[#0E9F6E]')}>{price(i.target2)}</div></div>
                <div><div className="text-[11px] text-[#8D95A3] font-semibold">Upside left</div><div className={cn(mono, 'text-[13px] font-semibold')}>{i.upsidePotential.toFixed(1)}%</div></div>
              </div>
              <div className="text-xs font-semibold" style={{ color: i.returnPercentage >= 0 ? GAIN : LOSS }}>{i.returnPercentage >= 0 ? '+' : ''}{i.returnPercentage.toFixed(2)}% since entry on {shortDate(i.launchedDate)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Research */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-extrabold tracking-[-0.02em]">Research &amp; insights</h2>
          <Link href="/app/research" className="text-sm font-extrabold text-[#154198] inline-flex items-center gap-1">See all<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {RESEARCH.slice(0, 4).map((r) => (
            <Link key={r.id} href="/app/research" className="group rounded-[14px] bg-white border border-[#E4E8EF] overflow-hidden hover:border-[#154198] transition-colors">
              <ResearchThumb imageUrl={r.imageUrl} videoUrl={r.videoUrl} />
              <div className="p-3.5">
                <div className="text-[11px] font-bold text-[#8D95A3] uppercase tracking-wider">{r.videoUrl ? 'Video' : 'Article'} · {shortDate(r.date)}</div>
                <div className="mt-1 text-sm font-extrabold leading-snug line-clamp-2 group-hover:text-[#154198]">{r.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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

      {/* Partners */}
      <section>
        <Eyebrow>Our partners</Eyebrow>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PARTNERS.map((p) => (
            <div key={p.name} className="h-16 rounded-xl bg-white border border-[#E4E8EF] flex items-center justify-center px-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={p.name} className="max-h-9 max-w-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-[14px] bg-white border border-[#E4E8EF] p-4 text-[11.5px] text-[#6B7381] leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-[#154198] flex-none" />
        <p>SEBI Registered Research Analyst {BRAND_INFO.sebiRegNo} · BSE Enlistment No. {BRAND_INFO.bseEnlistmentNo} · AMFI Registered MFD {BRAND_INFO.amfiArn}. Investment in securities market are subject to market risks. Read all related documents carefully before investing.</p>
      </footer>
    </div>
  );
}

function ResearchThumb({ imageUrl, videoUrl }: { imageUrl: string | null; videoUrl: string | null }) {
  const yt = videoUrl?.match(/[?&]v=([^&]+)/)?.[1];
  const src = imageUrl ?? (yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : null);
  return (
    <div className="relative aspect-[16/9] bg-[#EEF3FE]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}
      {videoUrl && <PlayCircle className="absolute inset-0 m-auto w-11 h-11 text-white drop-shadow-lg" />}
    </div>
  );
}
