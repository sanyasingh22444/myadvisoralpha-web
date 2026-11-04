'use client';

import { useEffect, useState } from 'react';
import { BadgeCheck, X, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '@/data/brand';

const KEY = 'maa-app-kyc-dismissed';

export default function KycBanner() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem(KEY) === '1') setHidden(true); } catch { /* storage blocked */ }
  }, []);
  if (hidden) return null;
  const dismiss = () => {
    setHidden(true);
    try { sessionStorage.setItem(KEY, '1'); } catch { /* storage blocked */ }
  };
  return (
    <div className="relative flex items-center gap-3 sm:gap-4 rounded-[14px] border border-[#F2D79A] bg-[#FFF6E3] px-4 py-3.5">
      <span className="w-10 h-10 rounded-xl bg-white text-[#C98F1E] flex items-center justify-center flex-none"><BadgeCheck className="w-5 h-5" /></span>
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-extrabold text-[#14171C]">Your KYC is pending</div>
        <div className="text-[12.5px] font-semibold text-[#6E4C0B]">Complete it in under a minute to place orders and invest.</div>
      </div>
      <a href={BRAND_INFO.deepLinks.webLogin} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-[10px] bg-[#154198] text-white text-sm font-bold hover:bg-[#0E2C7A]">Complete now<ArrowRight className="w-4 h-4" /></a>
      <a href={BRAND_INFO.deepLinks.webLogin} target="_blank" rel="noopener noreferrer" aria-label="Complete KYC now" className="sm:hidden w-9 h-9 rounded-[10px] bg-[#154198] text-white flex items-center justify-center"><ArrowRight className="w-4 h-4" /></a>
      <button onClick={dismiss} aria-label="Dismiss" className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#F2D79A] text-[#6E4C0B] flex items-center justify-center"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}
