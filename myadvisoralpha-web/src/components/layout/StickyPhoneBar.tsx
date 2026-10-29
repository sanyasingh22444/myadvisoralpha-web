'use client';

// Phone number bar pinned to the bottom of every page, shown once the visitor scrolls past the hero

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import LeadCaptureModal, { PHONE_REGEX, INVESTMENT_GOAL_OPTIONS } from '@/components/modals/LeadCaptureModal';

const SHOW_AFTER_PX = 500;
const MF_GOAL = INVESTMENT_GOAL_OPTIONS.find((opt) => opt.value.startsWith('Curated Mutual Funds'))?.value;

export default function StickyPhoneBar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const isMutualFunds = pathname?.startsWith('/mutual-funds') ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!PHONE_REGEX.test(phone)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setModalOpen(true);
  };

  const visible = scrolled && !dismissed && !modalOpen;

  return (
    <>
      {/* Keeps the footer's last lines clear of the bar */}
      <div aria-hidden="true" className="h-16 md:h-28 lg:h-12 bg-[#081026]" />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { y: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-40 bg-[#DCE7F8] border-t border-[#164198]/25 shadow-[0_-6px_24px_rgba(8,16,38,0.3)]"
          >
            <div className="relative flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-center justify-center gap-1 md:gap-x-6 lg:gap-x-5 md:gap-y-2 pl-3 pr-9 min-[360px]:pr-10 md:pr-14 lg:pr-12 py-1.5 md:py-3 lg:py-1.5">
              <p className="hidden md:block text-base lg:text-sm xl:text-base text-[#081026] leading-none whitespace-nowrap">
                Trusted by 1 Lakh+ Investors
                <span className="mx-2 text-[#081026]/40">|</span>
                <span className="font-bold uppercase tracking-wide text-[#C2410C]">
                  {isMutualFunds ? 'Start your SIP with ₹500' : 'Get 2 free trade ideas'}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="relative w-full md:w-auto" noValidate>
                <div
                  className={`flex items-center bg-white rounded-lg md:rounded-xl lg:rounded-lg border p-0.5 md:p-1 lg:p-0.5 transition-colors ${
                    error ? 'border-rose-500' : 'border-[#164198]/25 focus-within:border-[#164198]'
                  }`}
                >
                  <span className="pl-2 pr-1.5 md:pl-3 md:pr-2.5 lg:pl-2 lg:pr-1.5 text-xs sm:text-sm md:text-base lg:text-sm font-semibold text-[#081026]/70 border-r border-neutral-200 select-none">+91</span>
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
                    aria-invalid={error ? true : undefined}
                    className="bg-transparent text-[#081026] placeholder-neutral-400 placeholder:text-[10px] min-[400px]:placeholder:text-[11px] sm:placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-xs xl:placeholder:text-sm text-xs sm:text-sm md:text-base lg:text-sm flex-1 md:w-[19rem] lg:w-[15rem] xl:w-[17rem] min-w-0 px-1.5 sm:px-2 md:px-3 lg:px-2 py-1 md:py-2 lg:py-1 outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-1 rounded-md bg-[#164198] hover:bg-[#12357d] active:scale-95 text-white text-xs md:text-sm lg:text-xs font-bold uppercase tracking-wide px-2.5 sm:px-3.5 md:px-5 lg:px-3.5 py-1.5 md:py-2.5 lg:py-1.5 transition-all"
                  >
                    <span className="min-[360px]:hidden">Start</span>
                    <span className="hidden min-[360px]:inline">Start now</span> <ArrowRight className="hidden sm:block w-3.5 h-3.5" />
                  </button>
                </div>
                {error && (
                  <p role="alert" className="absolute left-0 bottom-full mb-1.5 rounded-md bg-rose-600 px-2 py-1 text-[11px] text-white font-medium shadow">
                    {error}
                  </p>
                )}
              </form>

              <p className="text-[10px] md:text-xs lg:text-[10px] leading-tight text-[#081026]/55 text-center md:text-left md:max-w-[11rem] lg:max-w-[9.5rem]">
                By continuing you agree to our{' '}
                <Link href="/legal/terms-and-conditions" className="underline hover:text-[#081026]">Terms</Link> and{' '}
                <Link href="/legal/privacy-policy" className="underline hover:text-[#081026]">Privacy Policy</Link>
              </p>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Close"
                className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 w-7 h-7 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-[#081026]/50 hover:text-[#081026] hover:bg-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPhone={phone}
        initialInvestmentGoal={isMutualFunds ? MF_GOAL : undefined}
        source="sticky-phone-bar"
      />
    </>
  );
}
