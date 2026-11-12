'use client';

import { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

import { GAIN, LOSS, mono } from './styles';

export { GAIN, LOSS, goldBtn, blueBtn, ghostBtn, mono } from './styles';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('bg-white border border-[#E4E8EF] rounded-[14px] shadow-[0_2px_10px_-2px_rgba(30,34,42,.10)]', className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('text-[11px] font-bold tracking-[0.14em] uppercase text-[#8D95A3]', className)}>{children}</span>;
}

export function PageTitle({ title, sub, right }: { title: string; sub?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em] text-[#14171C] leading-tight">{title}</h1>
        {sub && <p className="mt-1 text-sm text-[#4A525F] font-medium">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function TermChip({ children }: { children: React.ReactNode }) {
  return <span className="text-[11.5px] font-bold text-[#8A6A12] bg-[#FBF3DE] border border-[#EFD9A0] rounded-full px-2.5 py-[3px] whitespace-nowrap">{children}</span>;
}

export function FeaturedChip() {
  return (
    <span className="inline-flex items-center gap-1 text-[11.5px] font-extrabold text-[#FFD167] bg-[#154198] rounded-full pl-2 pr-2.5 py-[3px]">
      <Star className="w-[11px] h-[11px] fill-[#FFD167]" /> Featured
    </span>
  );
}

export function SampleChip() {
  return (
    <span title="Sample data from the Advisory tab design. Not live calls." className="text-[10.5px] font-extrabold tracking-wider uppercase text-[#6E4C0B] bg-[#FFEDC4] border border-[#F2D79A] rounded-md px-2 py-0.5">
      Sample data
    </span>
  );
}

export function Change({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span className={cn(mono, 'text-xs font-semibold', className)} style={{ color: up ? GAIN : LOSS }}>
      {up ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  );
}

/** Company logo tile; falls back to the ticker when the image is missing or fails. */
export function LogoTile({ src, label, size = 44 }: { src?: string | null; label: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="rounded-[10px] border border-[#93C5FD] bg-white flex items-center justify-center flex-none overflow-hidden" style={{ width: size, height: size }}>
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="w-full h-full object-contain p-1" onError={() => setFailed(true)} />
      ) : (
        <span className="text-[8.5px] font-extrabold tracking-wide text-[#154198] text-center leading-[1.1] px-0.5 break-all">{label}</span>
      )}
    </span>
  );
}

/**
 * Level track from the design: stop-loss → entry → target 1 → target 2 on a red-to-green rail,
 * with a "Current" marker placed by price.
 */
export function LevelTrack({ levels, current }: { levels: { label: string; value: number; tone: 'sl' | 'entry' | 'target' }[]; current: number }) {
  const min = levels[0].value;
  const max = levels[levels.length - 1].value;
  // Levels sit evenly on the rail; place the marker by interpolating between neighbouring levels.
  const step = 100 / levels.length;
  const posOf = (i: number) => step * i + step / 2;
  let pos: number;
  if (current <= min) pos = Math.max(2, posOf(0) - step / 2 * Math.min(1, (min - current) / (min * 0.05 || 1)));
  else if (current >= max) pos = Math.min(98, posOf(levels.length - 1) + step / 2 * Math.min(1, (current - max) / (max * 0.05 || 1)));
  else {
    let i = 0;
    while (i < levels.length - 1 && current > levels[i + 1].value) i++;
    const a = levels[i], b = levels[i + 1];
    pos = posOf(i) + ((current - a.value) / (b.value - a.value || 1)) * step;
  }
  const dot = { sl: '#E03131', entry: '#154198', target: '#279D46' };
  return (
    <div className="relative pt-9 px-1">
      <div className="absolute top-0 flex flex-col items-center -translate-x-1/2" style={{ left: `${pos}%` }}>
        <span className="text-[11px] font-bold text-[#4C5462]">Current</span>
        <span className={cn(mono, 'text-[11px] font-semibold text-[#14171C]')}>{current.toLocaleString('en-IN')}</span>
        <span className="w-0.5 h-3 bg-[#14171C] rounded" />
      </div>
      <div className="h-1 rounded bg-[linear-gradient(90deg,#EFA9A4_0%,#D6DCE6_38%,#BEDFCF_62%,#A8DCC2_100%)]" />
      <div className="grid -mt-[9px]" style={{ gridTemplateColumns: `repeat(${levels.length}, minmax(0,1fr))` }}>
        {levels.map((lv) => (
          <div key={lv.label} className="flex flex-col items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-full border-[3px] border-white shadow" style={{ background: dot[lv.tone] }} />
            <span className="text-[11px] font-bold" style={{ color: lv.tone === 'sl' ? LOSS : lv.tone === 'target' ? GAIN : '#154198' }}>{lv.label}</span>
            <span className={cn(mono, 'text-xs font-semibold text-[#4C5462]')}>{lv.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bottom sheet on phones, centred dialog on larger screens. */
export function Sheet({ open, onClose, eyebrow, title, children, wide = false }: { open: boolean; onClose: () => void; eyebrow?: string; title: string; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-[rgba(11,19,32,.56)] cursor-default" />
      <div role="dialog" aria-modal="true" aria-label={title} className={`relative w-full ${wide ? 'sm:max-w-xl' : 'sm:max-w-lg'} bg-white text-[#14171C] rounded-t-[20px] sm:rounded-[20px] px-5 pt-2.5 pb-6 max-h-[88vh] overflow-y-auto shadow-[0_20px_48px_-12px_rgba(11,19,32,.22)]`}>
        <div className="sm:hidden mx-auto w-10 h-1 rounded bg-[#C6D0EC] mb-3" />
        <div className="flex items-start justify-between gap-3 mb-3 sm:pt-3">
          <div className="flex flex-col gap-1">
            {eyebrow && <span className="text-xs font-bold tracking-[0.06em] uppercase text-[#5B6478]">{eyebrow}</span>}
            <h2 className="text-xl font-extrabold leading-tight">{title}</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="w-10 h-10 -mr-2 -mt-1 rounded-full flex items-center justify-center text-[#13235B] hover:bg-[#F4F6F9]"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange, className }: { options: { id: T; label: React.ReactNode }[]; value: T; onChange: (v: T) => void; className?: string }) {
  return (
    <div role="tablist" className={cn('flex gap-[3px] p-[3px] bg-white border border-[#93C5FD] rounded-full', className)}>
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} onClick={() => onChange(o.id)}
          className={cn('flex-1 h-[34px] px-3 rounded-full text-[13.5px] whitespace-nowrap transition-colors', value === o.id ? 'bg-[#1E3A8A] text-white font-bold' : 'text-[#13235B] font-semibold hover:bg-[#EEF3FE]')}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] leading-[1.55] text-[#8D95A3] mt-4 px-1">{children}</p>;
}

export function StatStrip({ items }: { items: { label: string; value: React.ReactNode; tone?: 'gain' | 'loss' }[] }) {
  return (
    <Card className="grid py-3.5 px-1.5" >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))` }}>
        {items.map((k, i) => (
          <div key={k.label} className={cn('flex flex-col items-center gap-0.5 px-2 text-center', i > 0 && 'border-l border-[#E8EBF0]')}>
            <span className="text-xs font-semibold text-[#6B7381]">{k.label}</span>
            <span className={cn(mono, 'text-[19px] font-semibold')} style={{ color: k.tone === 'gain' ? GAIN : k.tone === 'loss' ? LOSS : '#14171C' }}>{k.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
