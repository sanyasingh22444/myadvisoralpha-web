'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Info, Lightbulb, ChevronRight, Target, ShieldCheck, Bell } from 'lucide-react';
import { PRODUCT_FEATURES } from '@/data/app';
import { cn } from '@/lib/utils';
import { Sheet } from '../ui';
import StocksTab from './StocksTab';
import PortfoliosTab from './PortfoliosTab';
import FuturesTab from './FuturesTab';
import MtfTab from './MtfTab';

import { PRODUCTS, type Product } from './products';

const CTA: Record<Product, string> = {
  stocks: 'What you get with Stocks',
  portfolios: 'What you get with Portfolios',
  futures: 'What you get with Futures',
  mtf: 'What you get with MTF Baskets',
};

export default function AdvisoryView({ product }: { product: Product }) {
  const [features, setFeatures] = useState<Product | null>(null);
  const featureIcons = [Target, ShieldCheck, Bell];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-[27px] sm:text-[30px] font-extrabold tracking-[-0.03em]">Advisory</h1>
        <button onClick={() => setFeatures(product)} aria-label="About this product" className="w-[26px] h-[26px] rounded-full border border-[#DFE4EC] bg-white text-[#4C5462] flex items-center justify-center hover:bg-[#F4F6F9]"><Info className="w-3.5 h-3.5" /></button>
      </div>

      <div role="tablist" aria-label="Advisory products" className="flex gap-4 sm:gap-5 overflow-x-auto border-b border-[#DFE4EC] mb-4 [scrollbar-width:none]">
        {PRODUCTS.map((p) => {
          const on = p.id === product;
          return (
            <Link key={p.id} role="tab" aria-selected={on} href={`/app/advisory/${p.id}`} scroll={false}
              className={cn('relative flex-none pb-2.5 text-[15px] whitespace-nowrap transition-colors', on ? 'font-extrabold text-[#154198]' : 'font-semibold text-[#6B7381] hover:text-[#14171C]')}>
              {p.label}
              {p.isNew && !on && <span className="absolute -right-2 top-0 w-1.5 h-1.5 rounded-full bg-[#E03131]" aria-label="New" />}
              {p.isNew && on && <span className="hidden sm:inline ml-1.5 align-middle text-[9.5px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-1.5 py-px">New</span>}
              {on && <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-t bg-[#154198]" />}
            </Link>
          );
        })}
      </div>

      {product === 'stocks' && <StocksTab />}
      {product === 'portfolios' && <PortfoliosTab />}
      {product === 'futures' && <FuturesTab />}
      {product === 'mtf' && <MtfTab />}

      <button onClick={() => setFeatures(product)} className="mt-5 flex items-center gap-2.5 w-full p-3.5 border border-[#EFD9A0] rounded-[14px] bg-[#FBF3DE] text-left hover:border-[#CC9720]">
        <span className="w-[34px] h-[34px] rounded-[9px] bg-white text-[#A87C16] flex items-center justify-center flex-none"><Lightbulb className="w-4 h-4" /></span>
        <span className="flex-1 text-[13.5px] font-bold">{CTA[product]}</span>
        <ChevronRight className="w-4 h-4 text-[#8A6A12]" />
      </button>

      <Sheet open={!!features} onClose={() => setFeatures(null)} eyebrow="What you get" title={PRODUCTS.find((p) => p.id === features)?.label ?? ''}>
        {features && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-1.5 overflow-x-auto">
              {PRODUCTS.map((p) => (
                <button key={p.id} onClick={() => setFeatures(p.id)} className={cn('h-8 px-3 rounded-full border text-[12.5px] whitespace-nowrap', features === p.id ? 'border-[#154198] bg-[#EEF3FE] text-[#154198] font-extrabold' : 'border-[#DFE4EC] text-[#4C5462] font-semibold')}>{p.label}</button>
              ))}
            </div>
            <ul className="flex flex-col gap-3">
              {PRODUCT_FEATURES[features].map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                return (
                  <li key={f.title} className="flex gap-3 items-start">
                    <span className="w-9 h-9 rounded-xl bg-[#EEF3FE] text-[#154198] flex items-center justify-center flex-none"><Icon className="w-[18px] h-[18px]" /></span>
                    <span><span className="block text-sm font-extrabold">{f.title}</span><span className="block text-[13px] text-[#4A525F] leading-snug">{f.body}</span></span>
                  </li>
                );
              })}
            </ul>
            <Link href="/app/plans" onClick={() => setFeatures(null)} className="h-12 rounded-xl bg-[#1E3A8A] text-white text-[15px] font-bold flex items-center justify-center">See plans</Link>
          </div>
        )}
      </Sheet>
    </div>
  );
}
