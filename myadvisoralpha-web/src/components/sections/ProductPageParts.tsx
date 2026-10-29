'use client';

// Building blocks shared by the product pages (/advisory, /mutual-funds)

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PHONE_REGEX } from '@/components/modals/LeadCaptureModal';

// Phone number box used in the hero and the closing band
export function PhoneCapture({ label, onSubmit }: { label: React.ReactNode; onSubmit: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!agreed) {
      setError('Please agree to the Terms & Privacy Policy to continue');
      return;
    }
    setError('');
    onSubmit(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <p className="text-sm font-semibold text-white/90 mb-2.5">{label}</p>
      <div className="flex items-center bg-[#0E1A33] border border-[#F5BA31]/80 focus-within:border-[#F5BA31] rounded-xl p-1.5 transition-all shadow-[0_0_0_3px_rgba(245,186,49,0.12),0_8px_28px_rgba(245,186,49,0.18)]">
        <span className="px-2 sm:px-3 py-2 text-sm font-bold text-white/90 border-r border-white/15 select-none">+91</span>
        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
            if (error) setError('');
          }}
          placeholder="Enter your 10 digit mobile number"
          maxLength={10}
          aria-label="10-digit mobile number"
          className="bg-transparent text-white placeholder-white/40 placeholder:text-[10px] min-[360px]:placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-xs lg:placeholder:text-sm text-sm flex-1 min-w-0 px-2 sm:px-3 py-2 outline-none font-medium"
        />
        <button
          type="submit"
          aria-label="Submit mobile number"
          className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] flex items-center justify-center transition-all shadow-md"
        >
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-rose-400 font-medium pl-1">{error}</p>}
      <label className="mt-3 flex items-start gap-2.5 text-xs text-white/60 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-white/30 bg-[#0B1528] text-[#F5BA31] focus:ring-[#F5BA31] focus:ring-offset-0 cursor-pointer"
        />
        <span className="leading-tight">
          I agree to the{' '}
          <Link href="/legal/terms-and-conditions" className="text-white underline hover:text-[#F5BA31]">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy-policy" className="text-white underline hover:text-[#F5BA31]">
            Privacy Policy
          </Link>
        </span>
      </label>
    </form>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, dark }: { eyebrow: string; title: React.ReactNode; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-[#F5BA31]' : 'text-[#C99512]'}`}>{eyebrow}</span>
      <h2 className={`mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${dark ? 'text-white' : 'text-[#081026]'}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-3 text-base ${dark ? 'text-white/60' : 'text-neutral-600'}`}>{subtitle}</p>}
    </div>
  );
}

// A gold word that slides through `words`, on its own line so longer words never reflow the
// headline. Bottom padding leaves room for descenders (the y in Equity), and the matching
// negative margin keeps the line height unchanged
export function RotatingWord({ words, intervalMs = 2200 }: { words: string[]; intervalMs?: number }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), intervalMs);
    return () => clearInterval(interval);
  }, [reduceMotion, words.length, intervalMs]);

  return (
    <span className="relative block overflow-hidden text-[#F5BA31] h-[1.1em] box-content pb-[0.2em] -mb-[0.2em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26, opacity: { duration: 0.2 } }}
          className="block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
