'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Check, 
  TrendingUp,
  Target,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { brandInfo } from '@/data/brand';

const ROTATING_WORDS = ['Stock', 'Futures', 'Portfolio'] as const;

interface HeroSectionProps {
  onOpenConsultation?: (phone?: string) => void;
  onOpenLeadModal?: () => void;
}

export default function HeroSection({ onOpenConsultation, onOpenLeadModal }: HeroSectionProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (error) setError('');
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (onOpenConsultation) {
      onOpenConsultation(phone);
    } else {
      window.open(`https://web.advisoralpha.in/#/login`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-[#010101] text-white pt-28 lg:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
      {/* Ambient Glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0066f5]/15 rounded-full blur-[120px] pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#3AA17E]/10 rounded-full blur-[100px] pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Conversion */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Regulatory Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 hover:border-[#0066f5]/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3AA17E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3AA17E]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-white/90">
                SEBI Registered Research Analyst · INH000021818
              </span>
            </div>

            {/* Main Headline with Dynamic Rotating Words */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              <span>Advisory in </span>
              <span className="relative inline-block overflow-hidden align-top text-[#0066f5] min-w-[130px] sm:min-w-[180px] lg:min-w-[240px] xl:min-w-[280px] h-[1.25em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                      opacity: { duration: 0.2 },
                    }}
                    className="inline-block text-[#0066f5] underline decoration-[#0066f5]/30 underline-offset-8"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Sub-Headline / Value Proposition */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl font-normal leading-relaxed">
              Clear Entry, Target, and Stop-Loss signals with 1-tap execution. Led by{' '}
              <span className="text-white font-semibold">{brandInfo.founder.name}</span> ({brandInfo.founder.priorRoles[0]}) 
              with 75+ years of combined institutional research pedigree.
            </p>

            {/* Quick Mobile Lead Input */}
            <form onSubmit={handleQuickSubmit} className="mt-8 w-full max-w-md">
              <div className="flex items-center bg-[#0B0E14] border border-white/20 focus-within:border-[#0066f5] rounded-xl p-1.5 transition-all shadow-xl shadow-black/60">
                <div className="flex items-center gap-1 px-3 py-2 text-white/90 font-semibold text-sm select-none border-r border-white/15">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  className="bg-transparent text-white placeholder-white/40 text-sm flex-1 px-3 py-2 outline-none font-medium"
                  aria-label="Enter 10-digit mobile number"
                />
                <button
                  type="submit"
                  className="shrink-0 flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-lg bg-[#0066f5] hover:bg-[#0052cc] active:scale-95 text-white font-bold text-sm transition-all shadow-md shadow-[#0066f5]/30"
                >
                  <span>Get Picks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs text-red-400 font-medium pl-1">
                  {error}
                </p>
              )}

              {/* Trust Microcopy */}
              <div className="mt-3 flex items-center gap-4 text-[11px] sm:text-xs text-white/50 flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#3AA17E]" /> Free Alpha Picks
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#3AA17E]" /> Zero Custody Risk
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#3AA17E]" /> Instant Activation
                </span>
              </div>
            </form>

            {/* Trust Badges Strip */}
            <div className="mt-10 pt-8 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">75%</p>
                <p className="text-xs font-medium text-white/60 mt-0.5">Historical Strike Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">1 Lakh+</p>
                <p className="text-xs font-medium text-white/60 mt-0.5">Active Investors</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">₹2,000 Cr+</p>
                <p className="text-xs font-medium text-white/60 mt-0.5">Advisory Guided</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0066f5] tracking-tight">75+</p>
                <p className="text-xs font-medium text-white/60 mt-0.5">Years Combined Pedigree</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic App / Device Mockup Preview */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center">
            
            {/* Promotional Ad Card: onClick={onOpenConsultation || onOpenLeadModal} */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                const trigger = onOpenConsultation || onOpenLeadModal;
                if (trigger) {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  } else {
                    trigger();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  (onOpenConsultation || onOpenLeadModal)?.();
                }
              }}
              className="w-full max-w-[320px] sm:max-w-[350px] bg-[#0B0E14] border border-[#0066f5]/40 hover:border-[#0066f5] rounded-2xl p-4 shadow-xl shadow-[#0066f5]/10 mb-6 transition-all hover:scale-[1.02] cursor-pointer group"
              aria-label="Get 2 free investment or trade ideas"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dcfce7] text-[#166534] text-[10px] font-bold tracking-wide uppercase">
                  <ShieldCheck className="w-3 h-3 text-[#166534]" />
                  SEBI Registered
                </span>
                <span className="text-[10px] font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                  Free Access
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors flex items-center">
                <span>{"Get 2 free -> investment/ trade ideas"}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </div>
              <p className="text-[11px] text-white/50 mt-1">
                Instant delivery via WhatsApp &amp; SMS · Zero custody risk
              </p>
            </div>

            {/* Smartphone Mockup Container */}
            <div className="relative">
              {/* Smartphone Outer Shell */}
              <div className="w-[320px] sm:w-[350px] rounded-[44px] p-3 bg-gradient-to-b from-[#2E323B] via-[#1A1D24] to-[#0A0C10] border border-white/20 shadow-2xl shadow-blue-500/10 relative">
                
                {/* Dynamic Notch / Speaker */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#111] mr-3" />
                  <div className="w-2 h-2 rounded-full bg-[#002244]" />
                </div>

                {/* Inner Screen */}
                <div className="bg-[#0B0E14] rounded-[36px] pt-8 pb-5 px-4 text-white overflow-hidden border border-white/10">
                  
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">AdvisorAlpha Live</span>
                      <h4 className="text-sm font-bold text-white">SQGARP™ Research Desk</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] border border-[#166534]/20 text-[#166534]">
                      SEBI Active
                    </span>
                  </div>

                  {/* Live Recommendation Card 1 (Star Health) */}
                  <div className="bg-[#121722] border border-white/10 rounded-2xl p-3.5 mb-3 hover:border-[#0066f5]/50 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">STARHEALTH</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 inline-flex items-center gap-1">
                        +10.2% Gain <Target className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[11px] text-white/60 mb-2">
                      <div>Entry: <span className="text-white font-medium">₹535</span></div>
                      <div>Target: <span className="text-emerald-400 font-medium">₹589</span></div>
                      <div>Stop: <span className="text-red-400 font-medium">₹512</span></div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                      <span className="text-white/40">Holding: 27 Days</span>
                      <span className="text-[#0066f5] font-semibold">Target 1 Hit · Profit Booked</span>
                    </div>
                  </div>

                  {/* Live Recommendation Card 2 (Paytm) */}
                  <div className="bg-[#121722] border border-white/10 rounded-2xl p-3.5 mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">PAYTM</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 inline-flex items-center gap-1">
                        +15.5% Gain <Target className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[11px] text-white/60 mb-2">
                      <div>Entry: <span className="text-white font-medium">₹1,162</span></div>
                      <div>Target 2: <span className="text-emerald-400 font-medium">₹1,342</span></div>
                      <div>Stop: <span className="text-red-400 font-medium">₹1,110</span></div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                      <span className="text-white/40">Catalyst: Earnings Turnaround</span>
                      <span className="text-emerald-400 font-semibold">Target 2 Closed</span>
                    </div>
                  </div>

                  {/* 1-Tap Broker Sync Button */}
                  <div className="bg-gradient-to-r from-[#0066f5]/20 to-[#3AA17E]/20 border border-[#0066f5]/40 rounded-xl p-3 text-center">
                    <p className="text-[11px] font-bold text-white mb-1.5 inline-flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Tap Broker Sync
                    </p>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-white/70">
                      <span className="px-1.5 py-0.5 rounded bg-white/10">Zerodha</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10">Groww</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10">AngelOne</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Overlapping Floating Badge: Alpha Over Benchmark */}
              <div className="hidden sm:flex absolute -bottom-4 -left-6 bg-[#0B0E14]/95 border border-[#3AA17E]/40 backdrop-blur-md rounded-2xl p-3 shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3AA17E]/20 flex items-center justify-center text-[#3AA17E]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">+18.1% Alpha</p>
                  <p className="text-[10px] text-white/60">Flexicap Model CAGR</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
