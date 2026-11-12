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

const HEADINGS: Record<Product, { title: string; sub: string }> = {
  stocks: { title: 'Stock ideas', sub: 'Researched buy calls with entry, two targets and a stop loss, plus every closed idea.' },
  portfolios: { title: 'Model portfolios', sub: 'Ready-made portfolios built and rebalanced by our research team.' },
  futures: { title: 'Futures', sub: 'Index and stock futures calls with risk and reward sized per lot.' },
  mtf: { title: 'MTF Baskets', sub: 'Short-term 3-stock baskets for margin trading, with one target and stop loss.' },
};

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
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.03em]">{HEADINGS[product].title}</h1>
          {PRODUCTS.find((p) => p.id === product)?.isNew && <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#081026] bg-[#F5BA31] rounded-full px-2 py-0.5">New</span>}
          <button onClick={() => setFeatures(product)} aria-label="About this product" className="w-[26px] h-[26px] rounded-full border border-[#DFE4EC] bg-white text-[#4C5462] flex items-center justify-center hover:bg-[#F4F6F9]"><Info className="w-3.5 h-3.5" /></button>
        </div>
        <p className="-mt-2 text-sm text-[#4A525F]">{HEADINGS[product].sub}</p>
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {PRODUCT_FEATURES[product].map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <span key={f.title} className="flex-none inline-flex items-center gap-2 rounded-full bg-white border border-[#DCE2F2] pl-1.5 pr-3 py-1 text-[12.5px] font-bold text-[#13235B]">
                <span className="w-6 h-6 rounded-full bg-[#081026] text-[#F5BA31] flex items-center justify-center"><Icon className="w-3.5 h-3.5" /></span>{f.title}
              </span>
            );
          })}
        </div>
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
