'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mono, GAIN, LOSS } from './styles';

/**
 * One card anatomy for every product (stock ideas, futures, MTF baskets, portfolios),
 * modelled on the Advisory tab design and Univest's compact trade cards:
 *   chips row · identity row · highlight panel (the one number that matters) · 3 key facts · actions.
 * Full detail lives behind the primary action.
 */
export interface Fact {
  label: string;
  value: React.ReactNode;
  tone?: 'gain' | 'loss' | 'brand';
}

const toneColor = (t?: Fact['tone']) => (t === 'gain' ? GAIN : t === 'loss' ? LOSS : t === 'brand' ? '#1E3A8A' : undefined);

export function CompactCard({
  chips, chipsRight, logo, title, subtitle, quote, badge, highlight, facts, actions, onOpen, className,
}: {
  chips?: React.ReactNode;
  chipsRight?: React.ReactNode;
  logo?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  quote?: { price: string; change?: number };
  badge?: React.ReactNode;
  highlight?: { label: string; value: string; tone?: number; aside?: { label: string; value: string } };
  facts?: Fact[];
  actions?: React.ReactNode;
  onOpen?: () => void;
  className?: string;
}) {
  return (
    <article className={cn('w-full bg-white border border-[#DCE2F2] rounded-2xl p-4 flex flex-col gap-3 text-[#13235B] hover:border-[#9FB2E0] hover:shadow-[0_10px_28px_-12px_rgba(19,35,91,.28)] transition-all', className)}>
      {(chips || chipsRight) && (
        <div className="flex items-center justify-between gap-2 min-h-[24px]">
          <div className="flex items-center gap-1.5 flex-wrap">{chips}</div>
          <div className="flex items-center gap-1.5">{chipsRight}</div>
        </div>
      )}

      <div className="flex items-start gap-3">
        {logo}
        <div className="flex-1 min-w-0">
          {onOpen ? (
            <button onClick={onOpen} className="block max-w-full text-left text-[17px] font-bold leading-tight truncate hover:text-[#154198]">{title}</button>
          ) : (
            <h3 className="text-[17px] font-bold leading-tight truncate">{title}</h3>
          )}
          {subtitle && <div className="text-[12.5px] text-[#5B6478] truncate mt-0.5">{subtitle}</div>}
          {quote && (
            <div className="flex items-baseline gap-1.5 mt-0.5 whitespace-nowrap">
              <span className={cn(mono, 'text-[13.5px] font-semibold')}>{quote.price}</span>
              {quote.change !== undefined && (
                <span className="text-xs font-semibold" style={{ color: quote.change >= 0 ? GAIN : LOSS }}>{quote.change >= 0 ? '▲' : '▼'} {Math.abs(quote.change).toFixed(2)}%</span>
              )}
            </div>
          )}
        </div>
        {badge}
      </div>

      {highlight && (
        <div className="flex justify-between items-end gap-3 px-3.5 py-2.5 bg-[#F3F5FB] rounded-xl">
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-[#5B6478]">{highlight.label}</span>
            <span className="text-[22px] leading-7 font-extrabold tracking-[-0.02em]" style={{ color: highlight.tone === undefined ? '#13235B' : highlight.tone >= 0 ? GAIN : LOSS }}>{highlight.value}</span>
          </div>
          {highlight.aside && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#5B6478] whitespace-nowrap">{highlight.aside.label}</span>
              <span className="text-base font-bold text-[#1E3A8A]">{highlight.aside.value}</span>
            </div>
          )}
        </div>
      )}

      {facts && facts.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {facts.map((f, i) => (
            <div key={f.label} className={cn('flex flex-col min-w-0', i === 1 && 'items-center text-center', i === 2 && 'items-end text-right')}>
              <span className="text-[11.5px] text-[#8D95A3] font-semibold truncate max-w-full">{f.label}</span>
              <span className={cn(mono, 'text-[13.5px] font-semibold truncate max-w-full')} style={{ color: toneColor(f.tone) }}>{f.value}</span>
            </div>
          ))}
        </div>
      )}

      {actions && <div className="flex gap-2 mt-auto">{actions}</div>}
    </article>
  );
}

export const primaryAction = 'flex-1 h-10 rounded-[10px] bg-[#1E3A8A] hover:bg-[#13235B] text-white text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors';
export const secondaryAction = 'flex-1 h-10 rounded-[10px] border border-[#C6D0EC] bg-white hover:bg-[#F4F6F9] text-[#13235B] text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-colors';
export const orderAction = 'flex-1 h-10 rounded-[10px] text-[#14171C] text-sm font-extrabold inline-flex items-center justify-center gap-1.5 bg-[linear-gradient(100deg,#CC9720_0%,#F8E68D_46%,#CC9720_100%)] hover:shadow-[0_8px_20px_-6px_rgba(204,151,32,.45)] transition-all';

/** Univest-style horizontal row: title + count + "View all", cards scroll sideways. */
export function Rail({ title, count, href, note, children }: { title: string; count?: number; href?: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5 min-w-0">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-extrabold tracking-[-0.02em]">{title}{count !== undefined && <span className="ml-1.5 text-[#8D95A3] font-bold">({count})</span>}</h2>
          {note && <div className="text-xs text-[#6B7381] mt-0.5">{note}</div>}
        </div>
        {href && <Link href={href} className="flex-none inline-flex items-center gap-0.5 text-sm font-extrabold text-[#154198] hover:underline">View all<ChevronRight className="w-4 h-4" /></Link>}
      </div>
      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 scroll-px-4 sm:scroll-px-0 flex gap-3 overflow-x-auto snap-x pb-2 [scrollbar-width:thin]">
        {children}
      </div>
    </section>
  );
}

/** Fixed-width slot for a card inside a Rail. */
export function RailItem({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <div className={cn('snap-start flex-none flex', wide ? 'w-[300px] sm:w-[340px]' : 'w-[280px] sm:w-[300px]')}>{children}</div>;
}
