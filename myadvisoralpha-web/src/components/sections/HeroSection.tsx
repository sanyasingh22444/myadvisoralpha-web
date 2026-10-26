"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Check, 
  Target, 
  Layers,
  Briefcase,
  Zap,
  Pause,
  Play
} from "lucide-react";
import { BRAND_INFO } from "@/data/brand";

interface HeroSectionProps {
  onOpenConsultation?: (phone?: string) => void;
  onOpenLeadModal?: (phone?: string) => void;
}

const ROTATING_WORDS = ["Mutual Funds", "Stock Ideas", "Futures", "Portfolio"];
const TABS: Array<"stocks" | "portfolios" | "funds"> = ["stocks", "portfolios", "funds"];

export default function HeroSection({ onOpenConsultation, onOpenLeadModal }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"stocks" | "portfolios" | "funds">("funds");
  const [isPaused, setIsPaused] = useState(false);
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rotating headline word timer
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Placard Tabs Slideshow Auto-advance Timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const order: Array<"stocks" | "portfolios" | "funds"> = ["funds", "stocks", "portfolios"];
        const nextIdx = (order.indexOf(prev) + 1) % order.length;
        return order[nextIdx];
      });
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Interaction handlers to pause & resume slideshow seamlessly
  const handleMouseEnter = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 800); // 800ms buffer before resuming slideshow
  };

  const handleTabClick = (tab: "stocks" | "portfolios" | "funds") => {
    setActiveTab(tab);
    setIsPaused(true);
    // Auto-resume after 6s of user inactivity on manual selection
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
    if (error) setError("");
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Privacy Policy to continue");
      return;
    }
    setSubmitted(true);
    if (onOpenConsultation) {
      onOpenConsultation(phone);
    } else if (onOpenLeadModal) {
      onOpenLeadModal(phone);
    }
  };

  return (
    <div className="relative bg-[#081026] text-white">
      {/* Top Hero Section */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
        {/* Ambient Warm Gold & Deep Navy Glows */}
        <div 
          aria-hidden="true" 
          className="absolute top-10 right-10 w-[550px] h-[550px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
        />
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0066f5]/15 rounded-full blur-[130px] pointer-events-none -z-0"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subhead, WhatsApp Lead Capture, Stats */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
              
              {/* Main Headline with Dynamic Rotating Words (Clean, NO pill badge above it) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
                <div>Find your Alpha in</div>
                <div className="text-[#F5BA31] min-h-[1.2em] relative overflow-hidden mt-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      initial={{ y: 32, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -32, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 26,
                        opacity: { duration: 0.2 },
                      }}
                      className="inline-block"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>

              {/* Sub-Headline / Value Proposition */}
              <p className="mt-5 text-base sm:text-lg text-white/75 max-w-xl font-normal leading-relaxed">
                Research from a SEBI Registered Research Analyst team. Led by{" "}
                <span className="text-white font-medium">{BRAND_INFO.founder.name}</span> (Former CIO, Axis AMC, 30+ years of investment experience)
              </p>

              {/* Free Lead Capture Form matching Artifact */}
              <div className="mt-8 w-full max-w-md">
                <p className="text-sm font-semibold text-white/90 mb-2.5">
                  Get 2 research ideas free on WhatsApp
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="flex items-center bg-[#0B1528] border border-white/20 focus-within:border-[#F5BA31] rounded-xl p-1.5 transition-all shadow-xl">
                    <div className="flex items-center gap-1 px-3 py-2 text-white/90 font-semibold text-sm select-none border-r border-white/15">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="bg-transparent text-white placeholder-white/40 text-sm flex-1 px-3 py-2 outline-none font-medium"
                      aria-label="10-digit mobile number"
                    />
                    <button
                      type="submit"
                      className="shrink-0 w-11 h-11 rounded-lg bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] flex items-center justify-center font-black transition-all shadow-md"
                      aria-label="Submit phone number for free ideas"
                    >
                      <ArrowRight className="w-5 h-5 text-[#081026] stroke-[2.5]" />
                    </button>
                  </div>

                  {error && (
                    <p className="text-xs text-rose-400 font-medium pl-1">
                      {error}
                    </p>
                  )}

                  {submitted && !error && (
                    <p className="text-xs text-emerald-400 font-medium pl-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 2 free ideas sent to your WhatsApp!
                    </p>
                  )}

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-2.5 text-xs text-white/60 cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-white/30 bg-[#0B1528] text-[#F5BA31] focus:ring-[#F5BA31] focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="leading-tight">
                      I agree to the{" "}
                      <Link href="/legal/terms-and-conditions" className="text-white underline hover:text-[#F5BA31]">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy-policy" className="text-white underline hover:text-[#F5BA31]">
                        Privacy Policy
                      </Link>
                      , and allow MyAdvisorAlpha to contact me by call, SMS or WhatsApp, even if I&apos;m on DND.
                    </span>
                  </label>
                </form>
              </div>

              {/* Stats Row with Gold Dividers matching Artifact */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/10 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">1 lakh+</div>
                  <div className="text-xs text-white/60 font-medium mt-0.5">investors</div>
                </div>
                <div className="h-8 w-px bg-[#F5BA31]/40 hidden sm:block" />
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">₹2,000 Cr</div>
                  <div className="text-xs text-white/60 font-medium mt-0.5">assets guided</div>
                </div>
                <div className="h-8 w-px bg-[#F5BA31]/40 hidden sm:block" />
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">75+ years</div>
                  <div className="text-xs text-white/60 font-medium mt-0.5">combined research experience</div>
                </div>
              </div>

            </div>

            {/* Right Column: Fluid Interactive Slideshow Placard */}
            <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
              <div 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
                className="w-full max-w-[480px] bg-[#0B1528] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl relative transition-all"
              >
                
                {/* 3 Top Tabs: Stock Ideas, Model Portfolios, Mutual Funds with Fluid Spring Pill */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5 mb-5 text-xs font-semibold relative">
                  {[
                    { key: "stocks", label: "Stock Ideas" },
                    { key: "portfolios", label: "Model Portfolios" },
                    { key: "funds", label: "Mutual Funds" },
                  ].map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => handleTabClick(tab.key as any)}
                        className={`relative py-2 px-1 sm:px-2 rounded-lg transition-all text-center select-none ${
                          isActive
                            ? "text-[#F5BA31] font-bold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activePlacardTab"
                            className="absolute inset-0 bg-[#14233D] border border-[#F5BA31]/40 rounded-lg shadow-sm -z-0"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Status indicator bar showing live play vs pause */}
                <div className="flex items-center justify-between text-[10px] text-white/40 mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
                    <span>{isPaused ? "Slideshow paused (interacting)" : "Live auto-cycle (tap to pause)"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-white/40">
                    {["stocks", "portfolios", "funds"].map((t) => (
                      <span 
                        key={t}
                        className={`inline-block h-1 rounded-full transition-all ${
                          activeTab === t ? "w-4 bg-[#F5BA31]" : "w-1.5 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Slideshow Content Container with Fluid Fade & Slide Transition */}
                <div className="min-h-[300px]">
                  <AnimatePresence mode="wait">
                    
                    {/* Tab 1: Mutual Funds (SIP Month by Month Bar Chart from Artifact) */}
                    {activeTab === "funds" && (
                      <motion.div
                        key="funds"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-base font-bold text-white leading-tight">A SIP, month by month</h4>
                            <p className="text-xs text-white/60 mt-0.5">Small amounts, invested automatically</p>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                            Illustrative
                          </span>
                        </div>

                        {/* SIP Bar Chart Container */}
                        <div className="relative pt-6 pb-2 border-b border-white/10 mb-5">
                          {/* "Your goal" dashed guideline in yellow */}
                          <div className="absolute top-4 left-0 right-0 flex items-center gap-2">
                            <div className="flex-1 border-b border-dashed border-[#F5BA31]/60" />
                            <span className="text-[10px] font-bold text-[#F5BA31] shrink-0">Your goal</span>
                          </div>

                          {/* 12 Ascending Monthly Bars */}
                          <div className="flex items-end justify-between gap-1.5 h-36 pt-6 px-1">
                            {[
                              { m: "1", h: "18%" },
                              { m: "2", h: "26%" },
                              { m: "3", h: "34%" },
                              { m: "4", h: "42%" },
                              { m: "5", h: "50%" },
                              { m: "6", h: "58%" },
                              { m: "7", h: "66%" },
                              { m: "8", h: "74%" },
                              { m: "9", h: "82%" },
                              { m: "10", h: "90%" },
                              { m: "11", h: "98%" },
                              { m: "12", h: "85%" },
                            ].map((bar, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                                <div className="w-full h-28 flex items-end">
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: bar.h }}
                                    transition={{ duration: 0.5, delay: idx * 0.03 }}
                                    className="w-full bg-[#F5BA31] rounded-t-sm group-hover:bg-[#ffc84a] transition-colors"
                                  />
                                </div>
                                <span className="text-[9px] text-white/50">{bar.m}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-white/50 pt-1">
                            <span>Month</span>
                            {/* "Autopay every month" badge */}
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 border border-white/15 text-[10px] text-white/80">
                              <Zap className="w-3 h-3 text-[#F5BA31]" />
                              <span>Autopay every month</span>
                            </div>
                          </div>
                        </div>

                        {/* 3 Bottom Value Props */}
                        <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Goal-based baskets</div>
                            <div className="text-[10px] text-white/50 mt-0.5 leading-snug">From first salary to retirement</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Set up in 2 minutes</div>
                            <div className="text-[10px] text-white/50 mt-0.5 leading-snug">100% digital via ONDC</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Direct to the AMC</div>
                            <div className="text-[10px] text-white/50 mt-0.5 leading-snug">We never hold your money</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: Stock Ideas */}
                    {activeTab === "stocks" && (
                      <motion.div
                        key="stocks"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-base font-bold text-white leading-tight">Single Stock Advisory</h4>
                            <p className="text-xs text-white/60 mt-0.5">High-conviction equity signals with 1-tap execution</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            75% Strike Rate
                          </span>
                        </div>

                        <div className="space-y-3 mb-5">
                          <div className="bg-[#14223D] border border-white/10 rounded-xl p-3 hover:border-[#F5BA31]/40 transition-colors">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-white">STARHEALTH</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                +10.2% Gain
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 text-[11px] text-white/60">
                              <div>Entry: <span className="text-white font-medium">₹535</span></div>
                              <div>Target: <span className="text-emerald-400 font-medium">₹589</span></div>
                              <div>Stop: <span className="text-rose-400 font-medium">₹512</span></div>
                            </div>
                          </div>

                          <div className="bg-[#14223D] border border-white/10 rounded-xl p-3 hover:border-[#F5BA31]/40 transition-colors">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold text-white">PAYTM</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                +15.5% Gain
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 text-[11px] text-white/60">
                              <div>Entry: <span className="text-white font-medium">₹1,162</span></div>
                              <div>Target 2: <span className="text-emerald-400 font-medium">₹1,342</span></div>
                              <div>Stop: <span className="text-rose-400 font-medium">₹1,110</span></div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Derivatives &amp; Cash</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Futures + MTF Basket</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Strict Stop-Loss</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Capital preservation first</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">1-Tap Broker Sync</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Zerodha, Groww, Angel</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: Model Portfolios */}
                    {activeTab === "portfolios" && (
                      <motion.div
                        key="portfolios"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-base font-bold text-white leading-tight">Curated Model Portfolios</h4>
                            <p className="text-xs text-white/60 mt-0.5">Systematic asset allocation across market caps</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5BA31]/20 text-[#F5BA31] border border-[#F5BA31]/30">
                            +18.1% Alpha
                          </span>
                        </div>

                        <div className="bg-[#14223D] border border-white/10 rounded-xl p-4 mb-5">
                          <div className="flex items-center justify-between text-xs mb-3">
                            <span className="font-bold text-white">Flexicap Alpha Basket</span>
                            <span className="text-emerald-400 font-bold">24.2% CAGR (3Y)</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between text-white/70">
                              <span>Large Cap Leaders</span>
                              <span className="text-white font-medium">55%</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#F5BA31] h-full w-[55%]" />
                            </div>
                            <div className="flex items-center justify-between text-white/70 pt-1">
                              <span>Mid &amp; Small Cap Compounders</span>
                              <span className="text-white font-medium">45%</span>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-400 h-full w-[45%]" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Quarterly Rebalance</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Automated weight check</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">SQGARP™ Screen</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Quality at fair price</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Zero Lock-in</div>
                            <div className="text-[10px] text-white/50 mt-0.5">Full capital control</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Regulated and Registered Band matching Artifact (Soft Cream Background) */}
      <section className="bg-[#FAF7EE] text-[#081026] py-6 sm:py-8 border-y border-[#EBE6D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            
            {/* Label */}
            <div className="shrink-0">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#5A5040]">
                Regulated and registered
              </span>
            </div>

            {/* 3 White Registration Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 flex-1 lg:max-w-4xl">
              
              {/* Card 1: SEBI */}
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#E5DFCC] shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight">
                    SEBI Registered Research Analyst
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#081026] mt-0.5 font-mono">
                    INH000021818
                  </div>
                </div>
              </div>

              {/* Card 2: BSE */}
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#E5DFCC] shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight">
                    BSE Enlistment No.
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#081026] mt-0.5 font-mono">
                    6793
                  </div>
                </div>
              </div>

              {/* Card 3: AMFI */}
              <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#E5DFCC] shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight">
                    AMFI Registered MFD
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#081026] mt-0.5 font-mono">
                    ARN-350887
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
