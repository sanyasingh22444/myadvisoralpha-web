'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, LineChart, PieChart, UserRound, Headset, Bell, Flame, Search, X, Sparkles } from 'lucide-react';
import { APP_LINKS, APP_USER } from '@/data/app';
import { BRAND_INFO } from '@/data/brand';
import { cn } from '@/lib/utils';
import GlobalSearch from './GlobalSearch';

/** Product tabs across the top, Univest-style. Advisory products sit at the top level. */
const TABS = [
  { href: '/app', label: 'Home', match: (p: string) => p === '/app' },
  { href: '/app/markets', label: 'Markets', match: (p: string) => p.startsWith('/app/markets') },
  { href: '/app/advisory/stocks', label: 'Stock ideas', match: (p: string) => p.startsWith('/app/advisory/stocks') },
  { href: '/app/advisory/portfolios', label: 'Portfolios', match: (p: string) => p.startsWith('/app/advisory/portfolios') || p.startsWith('/app/portfolios') },
  { href: '/app/advisory/futures', label: 'Futures', match: (p: string) => p.startsWith('/app/advisory/futures'), isNew: true },
  { href: '/app/advisory/mtf', label: 'MTF Baskets', match: (p: string) => p.startsWith('/app/advisory/mtf'), isNew: true },
  { href: '/app/mutual-funds', label: 'Mutual Funds', match: (p: string) => p.startsWith('/app/mutual-funds') },
  { href: '/app/research', label: 'Research', match: (p: string) => p.startsWith('/app/research') },
];

/** Phone bottom bar. */
const BOTTOM = [
  { href: '/app', label: 'Home', icon: Home, match: (p: string) => p === '/app' },
  { href: '/app/markets', label: 'Markets', icon: Flame, match: (p: string) => p.startsWith('/app/markets') },
  { href: '/app/advisory/stocks', label: 'Advisory', icon: LineChart, match: (p: string) => p.startsWith('/app/advisory') || p.startsWith('/app/portfolios') },
  { href: '/app/mutual-funds', label: 'Mutual Funds', icon: PieChart, match: (p: string) => p.startsWith('/app/mutual-funds') },
  { href: '/app/profile', label: 'Profile', icon: UserRound, match: (p: string) => p.startsWith('/app/profile') || p.startsWith('/app/plans') },
];

function LogoPill() {
  return (
    <Link href="/app" aria-label="MyAdvisorAlpha home" className="flex-none inline-flex items-center rounded-xl bg-[#EEF3FB] border border-[#164198]/15 px-2.5 py-1">
      <Image src="/assets/brand/myadvisoralpha-logo.svg" alt="MyAdvisorAlpha by Renaissance" width={171} height={58} priority className="h-8 sm:h-9 w-auto object-contain" />
    </Link>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/app';
  const [mobileSearch, setMobileSearch] = useState(false);
  const iconBtn = 'w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/10 transition-colors';

  return (
    <div className="min-h-screen bg-[#EEF3FE] text-[#14171C] font-[family-name:var(--font-app)]">
      <header className="sticky top-0 z-40 bg-[#081026] text-white shadow-[0_8px_24px_rgba(8,16,38,0.35)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -top-24 right-24 w-80 h-80 rounded-full bg-[#F5BA31]/10 blur-[100px]" /></div>
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: brand, search, actions */}
          <div className="h-16 flex items-center gap-3 sm:gap-5">
            <LogoPill />
            <div className="hidden md:block flex-1 max-w-[480px]"><GlobalSearch /></div>
            <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
              <button onClick={() => setMobileSearch((v) => !v)} aria-label={mobileSearch ? 'Close search' : 'Search'} className={cn(iconBtn, 'md:hidden')}>{mobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}</button>
              <Link href="/app/plans" className="hidden lg:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-[13px] font-bold"><Sparkles className="w-4 h-4" />Get 6 months free</Link>
              <a href={APP_LINKS.helpSupport} target="_blank" rel="noopener noreferrer" aria-label="Help & support" className={iconBtn}><Headset className="w-5 h-5" /></a>
              <button type="button" aria-label="Notifications" className={cn(iconBtn, 'hidden sm:flex')}><Bell className="w-5 h-5" /></button>
              <Link href="/app/profile" aria-label="Your profile" className="ml-1 w-9 h-9 rounded-full bg-gradient-to-br from-[#1E2A4A] to-[#0B1320] text-[#F5BA31] flex items-center justify-center text-sm font-extrabold ring-1 ring-[#F5BA31]/50">
                {APP_USER.firstName.charAt(0)}
              </Link>
            </div>
          </div>
          {mobileSearch && <div className="md:hidden pb-3"><GlobalSearch autoFocus onDone={() => setMobileSearch(false)} /></div>}

          {/* Row 2: product tabs */}
          {/* Desktop only: smaller screens use the bottom bar instead, so there is one menu at a time */}
          <nav aria-label="Products" className="hidden lg:flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {TABS.map((t) => {
              const on = t.match(pathname);
              return (
                <Link key={t.href} href={t.href} aria-current={on ? 'page' : undefined}
                  className={cn('relative flex-none px-3 pt-2 pb-3 text-[14px] whitespace-nowrap transition-colors', on ? 'text-white font-extrabold' : 'text-white/60 font-semibold hover:text-white')}>
                  {t.label}
                  {t.isNew && <span className="ml-1.5 align-middle text-[9px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-1.5 py-px">New</span>}
                  {on && <span className="absolute left-3 right-3 bottom-0 h-[3px] rounded-t bg-[#F5BA31]" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="app-main" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 lg:pt-7 pb-28 lg:pb-12">
        {children}
        <p className="mt-10 pt-5 border-t border-[#D7DDE8] text-[11px] leading-relaxed text-[#8D95A3]">
          © {BRAND_INFO.legalEntity} · SEBI Registered Research Analyst {BRAND_INFO.sebiRegNo} · BSE Enlistment {BRAND_INFO.bseEnlistmentNo} · AMFI {BRAND_INFO.amfiArn}. Investment in securities market are subject to market risks.
        </p>
      </main>

      {/* Phone bottom bar */}
      <nav aria-label="App" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#D7DDE8] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {BOTTOM.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} aria-current={active ? 'page' : undefined} className="flex flex-col items-center gap-1 pt-2 pb-2.5">
                <span className={cn('w-11 h-7 rounded-full flex items-center justify-center transition-colors', active ? 'bg-[#081026] text-[#F5BA31]' : 'text-[#6B7381]')}>
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className={cn('text-[10.5px] font-bold', active ? 'text-[#081026]' : 'text-[#6B7381]')}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
