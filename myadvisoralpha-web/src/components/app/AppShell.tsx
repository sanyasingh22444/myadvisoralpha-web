'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home, LineChart, PieChart, Newspaper, UserRound, Headset, Bell, ChevronRight,
  TrendingUp, Briefcase, Activity, Layers, BarChart3, Flame,
} from 'lucide-react';
import { APP_LINKS, APP_USER } from '@/data/app';
import { cn } from '@/lib/utils';

const ADVISORY = [
  { href: '/app/advisory/stocks', label: 'Stocks', icon: TrendingUp },
  { href: '/app/advisory/portfolios', label: 'Portfolios', icon: Briefcase },
  { href: '/app/advisory/futures', label: 'Futures', icon: Activity, isNew: true },
  { href: '/app/advisory/mtf', label: 'MTF Baskets', icon: Layers, isNew: true },
];

const NAV = [
  { href: '/app', label: 'Home', icon: Home, match: (p: string) => p === '/app', mobile: true },
  { href: '/app/markets', label: 'Markets', icon: Flame, match: (p: string) => p.startsWith('/app/markets'), mobile: true },
  { href: '/app/advisory/stocks', label: 'Advisory', icon: LineChart, match: (p: string) => p.startsWith('/app/advisory'), mobile: true },
  { href: '/app/mutual-funds', label: 'Mutual Funds', icon: PieChart, match: (p: string) => p.startsWith('/app/mutual-funds'), mobile: true },
  { href: '/app/research', label: 'Research', icon: Newspaper, match: (p: string) => p.startsWith('/app/research'), mobile: false },
  { href: '/app/profile', label: 'Profile', icon: UserRound, match: (p: string) => p.startsWith('/app/profile') || p.startsWith('/app/plans'), mobile: true },
];

function LogoPill({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/app" aria-label="MyAdvisorAlpha home" className={cn('inline-flex items-center rounded-2xl bg-[#EEF3FB] border border-[#164198]/15', compact ? 'px-2.5 py-1' : 'px-3 py-1.5')}>
      <Image src="/assets/brand/myadvisoralpha-logo.svg" alt="MyAdvisorAlpha by Renaissance" width={171} height={58} priority className={cn('w-auto object-contain', compact ? 'h-8' : 'h-11')} />
    </Link>
  );
}

function Avatar() {
  return (
    <Link href="/app/profile" aria-label="Your profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E2A4A] to-[#0B1320] text-[#F5BA31] flex items-center justify-center text-sm font-extrabold ring-1 ring-[#F5BA31]/40">
      {APP_USER.firstName.charAt(0)}
    </Link>
  );
}

function TopActions({ dark = false }: { dark?: boolean }) {
  const btn = cn('w-9 h-9 rounded-full flex items-center justify-center transition-colors', dark ? 'text-white/85 hover:bg-white/10' : 'text-[#14171C] hover:bg-[#164198]/[0.06]');
  return (
    <div className="flex items-center gap-1.5">
      <a href={APP_LINKS.helpSupport} target="_blank" rel="noopener noreferrer" aria-label="Help & support" className={btn}><Headset className="w-5 h-5" /></a>
      <button type="button" aria-label="Notifications" className={btn}><Bell className="w-5 h-5" /></button>
      <Avatar />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/app';
  const onAdvisory = pathname.startsWith('/app/advisory');

  return (
    <div className="min-h-screen bg-[#EEF3FE] text-[#14171C] font-[family-name:var(--font-app)] lg:pl-[264px]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[264px] flex-col bg-[#081026] text-white border-r border-white/10 z-40">
        <div aria-hidden className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#F5BA31]/10 blur-[100px] pointer-events-none" />
        <div className="relative px-5 pt-6 pb-5">
          <LogoPill />
        </div>
        <nav aria-label="App" className="relative flex-1 overflow-y-auto px-3 space-y-1">
          {NAV.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-semibold transition-colors',
                    active ? 'bg-white/[0.08] text-white' : 'text-white/65 hover:text-white hover:bg-white/[0.05]',
                  )}
                >
                  {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#F5BA31]" />}
                  <Icon className={cn('w-[18px] h-[18px]', active && 'text-[#F5BA31]')} />
                  {item.label}
                </Link>
                {item.label === 'Advisory' && onAdvisory && (
                  <div className="mt-1 mb-2 ml-6 pl-3 border-l border-white/10 space-y-0.5">
                    {ADVISORY.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link key={sub.href} href={sub.href} className={cn('flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors', subActive ? 'text-[#F5BA31] bg-[#F5BA31]/10' : 'text-white/60 hover:text-white')}>
                          <span>{sub.label}</span>
                          {sub.isNew && <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-1.5 py-px">New</span>}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="relative p-4 space-y-3">
          <Link href="/app/plans" className="group flex items-center gap-3 rounded-2xl border border-[#F5BA31]/60 bg-[#0E1A33] px-4 py-3.5 shadow-[0_0_0_3px_rgba(245,186,49,0.08)] hover:border-[#F5BA31] transition-colors">
            <span className="w-9 h-9 rounded-xl bg-[#F5BA31] text-[#081026] flex items-center justify-center"><BarChart3 className="w-5 h-5" /></span>
            <span className="flex-1">
              <span className="block text-sm font-extrabold">Get 6 months free</span>
              <span className="block text-xs text-white/60">on the 12-month plan</span>
            </span>
            <ChevronRight className="w-4 h-4 text-[#F5BA31] group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-[10.5px] leading-relaxed text-white/40">© Renaissance Smart Tech Pvt. Ltd. · SEBI RA INH000021818 · AMFI ARN-350887</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#081026] px-4 py-2.5 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
        <LogoPill compact />
        <TopActions dark />
      </header>

      {/* Desktop top bar */}
      <header className="hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between px-8 bg-[#EEF3FE]/85 backdrop-blur border-b border-[#D7DDE8]/70">
        <div className="text-[15px] font-semibold text-[#4A525F]">
          Hello, <span className="text-[#14171C] font-extrabold">{APP_USER.firstName}</span> 👋
        </div>
        <TopActions />
      </header>

      <main id="app-main" className="px-4 sm:px-6 lg:px-8 pt-4 lg:pt-6 pb-28 lg:pb-12 max-w-[1240px] mx-auto">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav aria-label="App" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#D7DDE8] pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {NAV.filter((item) => item.mobile).map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} aria-current={active ? 'page' : undefined} className="flex flex-col items-center gap-1 pt-2 pb-2.5">
                <span className={cn('w-11 h-7 rounded-full flex items-center justify-center transition-colors', active ? 'bg-[#164198] text-[#F5BA31]' : 'text-[#6B7381]')}>
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className={cn('text-[10.5px] font-bold', active ? 'text-[#164198]' : 'text-[#6B7381]')}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
