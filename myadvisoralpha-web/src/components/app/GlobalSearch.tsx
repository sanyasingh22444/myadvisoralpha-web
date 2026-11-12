'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X, TrendingUp, Briefcase, Activity, Layers, History } from 'lucide-react';
import { LIVE_IDEAS, CLOSED_IDEAS, PORTFOLIOS, FUTURES, MTF_BASKETS, price, type StockIdea } from '@/data/app';
import { cn } from '@/lib/utils';
import { StockSheet } from './advisory/StocksTab';

type Hit =
  | { kind: 'idea'; key: string; title: string; sub: string; idea: StockIdea }
  | { kind: 'link'; key: string; title: string; sub: string; href: string; icon: typeof Search };

/** Search across live and closed stock ideas, portfolios, futures calls and MTF baskets. */
export default function GlobalSearch({ dark = true, autoFocus = false, onDone }: { dark?: boolean; autoFocus?: boolean; onDone?: () => void }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<{ idea: StockIdea; order: boolean } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const hits: Hit[] = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const m = (...s: string[]) => s.some((x) => x.toLowerCase().includes(t));
    const out: Hit[] = [];
    LIVE_IDEAS.filter((i) => m(i.name, i.symbol, i.sector)).forEach((i) => out.push({ kind: 'idea', key: 'l' + i.id, title: `${i.symbol} · ${i.name}`, sub: `Live stock idea · ${i.category} · ${price(i.currentPrice)}`, idea: i }));
    PORTFOLIOS.filter((p) => m(p.name, p.tagline)).forEach((p) => out.push({ kind: 'link', key: 'p' + p.id, title: p.name, sub: `Model portfolio · ${p.tagline}`, href: `/app/portfolios/${p.slug}`, icon: Briefcase }));
    FUTURES.filter((f) => m(f.name, f.contract)).forEach((f) => out.push({ kind: 'link', key: 'f' + f.id, title: f.contract, sub: `Futures call · ${f.side}`, href: '/app/advisory/futures', icon: Activity }));
    MTF_BASKETS.filter((b) => m(b.name, ...b.stocks.map((s) => s.sym))).forEach((b) => out.push({ kind: 'link', key: 'm' + b.id, title: b.name, sub: 'MTF basket', href: '/app/advisory/mtf', icon: Layers }));
    CLOSED_IDEAS.filter((c) => m(c.name, c.symbol)).slice(0, 4).forEach((c) => out.push({ kind: 'link', key: 'c' + c.id, title: `${c.symbol} · ${c.name}`, sub: `Closed idea · ${c.gainPercentage >= 0 ? '+' : ''}${c.gainPercentage.toFixed(2)}%`, href: '/app/advisory/stocks', icon: History }));
    return out.slice(0, 9);
  }, [q]);

  const close = () => { setOpen(false); setQ(''); onDone?.(); };

  return (
    <div ref={box} className="relative w-full">
      <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', dark ? 'text-white/50' : 'text-[#8D95A3]')} />
      <input
        type="search" value={q} autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Escape') close(); }}
        placeholder="Search stock ideas, portfolios, futures…"
        aria-label="Search the app"
        className={cn('w-full h-10 rounded-xl pl-9 pr-9 text-[13.5px] font-semibold outline-none transition-colors',
          dark ? 'bg-white/[0.08] border border-white/15 text-white placeholder:text-white/45 focus:bg-white/[0.12] focus:border-[#F5BA31]/70'
            : 'bg-[#F7F9FC] border border-[#93C5FD] text-[#14171C] focus:border-[#154198]')}
      />
      {q && <button aria-label="Clear search" onClick={() => setQ('')} className={cn('absolute right-2.5 top-1/2 -translate-y-1/2', dark ? 'text-white/60' : 'text-[#8D95A3]')}><X className="w-4 h-4" /></button>}

      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 bg-white text-[#14171C] rounded-2xl border border-[#93C5FD] shadow-[0_20px_48px_-12px_rgba(11,19,32,.35)] overflow-hidden">
          {hits.length ? (
            <ul className="max-h-[60vh] overflow-y-auto py-1.5">
              {hits.map((h) => {
                const Icon = h.kind === 'idea' ? TrendingUp : h.icon;
                const inner = (
                  <>
                    <span className="w-8 h-8 rounded-lg bg-[#EEF3FE] text-[#154198] flex items-center justify-center flex-none"><Icon className="w-4 h-4" /></span>
                    <span className="min-w-0"><span className="block text-[13.5px] font-bold truncate">{h.title}</span><span className="block text-[11.5px] text-[#6B7381] truncate">{h.sub}</span></span>
                  </>
                );
                const cls = 'w-full flex items-center gap-3 px-3.5 py-2 text-left hover:bg-[#F5F7FC]';
                return (
                  <li key={h.key}>
                    {h.kind === 'idea'
                      ? <button className={cls} onClick={() => { setDetail({ idea: h.idea, order: false }); setOpen(false); }}>{inner}</button>
                      : <Link href={h.href} className={cls} onClick={close}>{inner}</Link>}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-5 text-sm text-[#6B7381]">Nothing matches “{q}”. Try a company, ticker or portfolio name.</p>
          )}
        </div>
      )}

      <StockSheet detail={detail} onClose={() => { setDetail(null); close(); }} />
    </div>
  );
}
