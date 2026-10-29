"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";
import HeroPlacard from "./HeroPlacard";

interface HeroSectionProps {
  onOpenConsultation?: (phone?: string) => void;
  onOpenLeadModal?: (phone?: string) => void;
}

const ROTATING_WORDS = ["Mutual Funds", "Stock Ideas", "Futures", "Portfolio"];

export default function HeroSection({ onOpenConsultation, onOpenLeadModal }: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Rotating headline word timer
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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
      <section className="relative pt-8 sm:pt-10 lg:pt-8 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden">
        {/* Ambient Warm Gold & Deep Navy Glows */}
        <div 
          aria-hidden="true" 
          className="absolute top-10 right-10 w-[550px] h-[550px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
        />
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F5BA31]/15 rounded-full blur-[130px] pointer-events-none -z-0"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Heading, Subhead, WhatsApp Lead Capture, Stats */}
            <div className="md:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
              
              {/* Main Headline with Dynamic Rotating Words (Clean, NO pill badge above it) */}
              <h1 className="text-4xl sm:text-5xl md:text-[2.5rem] lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
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
              {/* Dividers trail each item so a wrapped line never starts with one */}
              <ul className="mt-5 max-w-xl flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-base text-white/75 font-normal leading-relaxed">
                {[
                  <>Research led by <span className="text-white font-medium">{BRAND_INFO.founder.name}</span></>,
                  "Former CIO, Axis AMC",
                  "30+ years’ investing experience",
                  "$5 billion+ managed",
                ].map((item, i, all) => (
                  <li key={i} className="flex items-center gap-3 whitespace-nowrap">
                    <span>{item}</span>
                    {i < all.length - 1 && <span aria-hidden="true" className="h-4 w-px bg-[#F5BA31]/50" />}
                  </li>
                ))}
              </ul>

              {/* Free Lead Capture Form matching Artifact */}
              <div className="mt-6 w-full max-w-md">
                <p className="text-sm font-semibold text-white/90 mb-2.5">
                  Get 2 free trade ideas
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="flex items-center bg-[#0B1528] border border-white/20 focus-within:border-[#F5BA31] rounded-xl p-1.5 transition-all shadow-xl">
                    <div className="flex items-center gap-1 px-2 sm:px-3 py-2 text-white/90 font-semibold text-sm select-none border-r border-white/15">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/80">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter your 10 digit mobile number"
                      maxLength={10}
                      className="bg-transparent text-white placeholder-white/40 placeholder:text-[10px] min-[360px]:placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-xs lg:placeholder:text-sm text-sm flex-1 min-w-0 px-2 sm:px-3 py-2 outline-none font-medium"
                      aria-label="10-digit mobile number"
                    />
                    <button
                      type="submit"
                      className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] flex items-center justify-center font-black transition-all shadow-md"
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
                      <Check className="w-3.5 h-3.5" /> Almost done. Complete the short form to get your 2 free ideas.
                    </p>
                  )}

                  {/* Consent Checkbox */}
                  <label htmlFor="hero-consent" className="flex items-start gap-2.5 text-xs text-white/60 cursor-pointer select-none pt-1">
                    <input
                      id="hero-consent"
                      type="checkbox"
                      aria-labelledby="hero-consent-text"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-white/30 bg-[#0B1528] text-[#F5BA31] focus:ring-[#F5BA31] focus:ring-offset-0 cursor-pointer"
                    />
                    <span id="hero-consent-text" className="leading-tight">
                      I agree to the{" "}
                      <Link href="/legal/terms-and-conditions" className="text-white underline hover:text-[#F5BA31]">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy-policy" className="text-white underline hover:text-[#F5BA31]">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </form>
              </div>

              {/* Stats Row with Gold Dividers matching Artifact */}
              <div className="grid grid-cols-2 gap-y-5 max-w-md mt-7 pt-6 border-t border-white/10 text-left">
                {[
                  { value: "1 lakh+", label: "investors" },
                  { value: "₹2,000 Cr", label: "assets guided" },
                  { value: "SEBI Registered", label: "Research Analyst" },
                  { value: "AMFI Registered", label: "Mutual Fund Distributor" },
                ].map((stat, i) => (
                  <div key={stat.value} className={i % 2 === 1 ? "pl-5 sm:pl-6 border-l border-[#F5BA31]/40" : "pr-4"}>
                    <div className="text-lg min-[400px]:text-xl sm:text-2xl md:text-lg lg:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap">{stat.value}</div>
                    <div className="text-xs text-white/60 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Illustrated product placard (stock idea, portfolio, SIP) */}
            <div className="md:col-span-6 xl:col-span-5 flex justify-center md:justify-end">
              <HeroPlacard />
            </div>

          </div>
        </div>
      </section>

      {/* Regulated and Registered Band matching Artifact (Soft Cream Background) */}
      <section className="bg-[#FAF7EE] text-[#081026] py-6 sm:py-8 border-y border-[#EBE6D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-3 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-5 lg:gap-8">
            
            {/* Label */}
            <div className="shrink-0 text-center md:text-left">
              <span className="block md:max-w-[9rem] lg:max-w-none text-xs sm:text-sm md:text-xs lg:text-sm font-extrabold uppercase tracking-wider leading-snug text-[#5A5040]">
                Regulated and registered
              </span>
            </div>

            {/* 3 White Registration Cards */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap sm:justify-center gap-2.5 md:gap-2 lg:gap-2.5">
              
              {/* Card 1: SEBI */}
              <div className="bg-white rounded-xl px-3 py-2 border border-[#93C5FD] shadow-sm flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight whitespace-nowrap">
                    SEBI Registered Research Analyst
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#081026] mt-0.5 font-mono">
                    INH000021818
                  </div>
                </div>
              </div>

              {/* Card 2: BSE */}
              <div className="bg-white rounded-xl px-3 py-2 border border-[#93C5FD] shadow-sm flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight whitespace-nowrap">
                    BSE Enlistment No.
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#081026] mt-0.5 font-mono">
                    6793
                  </div>
                </div>
              </div>

              {/* Card 3: AMFI */}
              <div className="bg-white rounded-xl px-3 py-2 border border-[#93C5FD] shadow-sm flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FAF3DE] text-[#B88714] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B88714]" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-neutral-500 leading-tight whitespace-nowrap">
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
