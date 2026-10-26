"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ArrowUpRight, 
  Search, 
  Menu, 
  TrendingUp, 
  Briefcase, 
  Layers, 
  LogIn
} from "lucide-react";
import MobileNav from "./MobileNav";

interface NavbarProps {
  onOpenLeadModal?: () => void;
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenLeadModal, onOpenConsultation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCtaClick = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (onOpenLeadModal) {
      onOpenLeadModal();
    } else if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        window.dispatchEvent(new CustomEvent("open-consultation-modal"));
      } else {
        window.location.href = "/contact";
      }
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAdvisoryOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAdvisoryOpen(false);
    }, 250); // 250ms grace period prevents abrupt dropdown closure
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 pb-2" : "pt-4 pb-2"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Floating Pill Container matching Artifact */}
          <nav
            aria-label="Main Navigation"
            className="bg-[#0B1528]/95 backdrop-blur-md rounded-full border border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0px_8px_32px_0px_rgba(0,0,0,0.4)]"
          >
            {/* Logo Section matching Artifact: Warm Gold square + MyAdvisorAlpha */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#F5BA31] flex items-center justify-center text-[#081026] shadow-md group-hover:scale-105 transition-transform font-black">
                  <svg className="w-4 h-4 text-[#081026] stroke-[2.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19L20 5M20 5H10M20 5V15" />
                  </svg>
                </div>
                <div className="flex items-center text-lg font-extrabold tracking-tight text-white">
                  <span>MyAdvisor</span>
                  <span className="text-[#F5BA31]">Alpha</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-3 text-sm font-medium text-white/90">
              {/* 1. Advisory Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={advisoryOpen}
                  onClick={() => setAdvisoryOpen(!advisoryOpen)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 focus:outline-none ${
                    advisoryOpen ? "bg-white/15 text-white" : "hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>Advisory</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
                      advisoryOpen ? "rotate-180 text-[#F5BA31]" : ""
                    }`}
                  />
                </button>

                {advisoryOpen && (
                  <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ backgroundColor: "#0D1A33", opacity: 1 }}
                    className="absolute top-full left-0 mt-2 w-[480px] sm:w-[520px] bg-[#0D1A33] border border-white/20 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[100] animate-in fade-in slide-in-from-top-2 duration-200 space-y-3 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  >
                    {/* Section 1: Single Stocks */}
                    <div>
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-xs font-extrabold uppercase tracking-wider text-[#F5BA31]">
                        <TrendingUp className="w-3.5 h-3.5 text-[#F5BA31]" />
                        <span>Single Stocks</span>
                      </div>
                      <div className="space-y-1">
                        {/* Futures Sub-Item */}
                        <Link
                          href="/#futures"
                          onClick={() => setAdvisoryOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#F5BA31]/20 text-[#F5BA31] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F5BA31] group-hover:text-[#081026] transition-colors shadow-sm">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white group-hover:text-[#F5BA31] transition-colors">
                                Futures
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5BA31] text-[#081026] shadow-sm">
                                Derivatives
                              </span>
                            </div>
                            <div className="text-xs text-white/80 mt-1 leading-relaxed font-normal">
                              Derivatives trading strategies and momentum signals with defined risk parameters
                            </div>
                          </div>
                        </Link>

                        {/* MTF Basket Sub-Item */}
                        <Link
                          href="/#mtf-basket"
                          onClick={() => setAdvisoryOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#F5BA31]/20 text-[#F5BA31] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#F5BA31] group-hover:text-[#081026] transition-colors shadow-sm">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white group-hover:text-[#F5BA31] transition-colors">
                                MTF Basket
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5BA31] text-[#081026] shadow-sm">
                                Margin Trading
                              </span>
                            </div>
                            <div className="text-xs text-white/80 mt-1 leading-relaxed font-normal">
                              Margin Trading Facility curated equity baskets with leverage and institutional downside risk management
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Section 2: Portfolio */}
                    <div className="pt-2.5 border-t border-white/15">
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Portfolio</span>
                      </div>
                      <Link
                        href="/#portfolios"
                        onClick={() => setAdvisoryOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/25 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-400 group-hover:text-[#081026] transition-colors shadow-sm">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                              Portfolio Advisory
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-400 text-[#081026] shadow-sm">
                              Full Advisory
                            </span>
                          </div>
                          <div className="text-xs text-white/80 mt-1 leading-relaxed font-normal">
                            Full portfolio advisory, risk profiling, and periodic rebalancing
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Dropdown Quick Pedigree & Route Links */}
                    <div className="pt-2.5 border-t border-white/15 flex items-center justify-between px-2 text-xs text-white/70">
                      <span className="font-medium">Pankaj Murarka · 30+ Yrs Equity Pedigree</span>
                      <div className="flex items-center gap-2.5">
                        <Link
                          href="/about"
                          onClick={() => setAdvisoryOpen(false)}
                          className="text-[#F5BA31] hover:underline font-bold"
                        >
                          About Us
                        </Link>
                        <span className="text-white/40">·</span>
                        <Link
                          href="/contact"
                          onClick={() => setAdvisoryOpen(false)}
                          className="text-white hover:text-[#F5BA31] transition-colors font-medium"
                        >
                          Contact Desk
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Mutual Funds Link */}
              <Link
                href="/#mutual-funds"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                Mutual Funds
              </Link>

              {/* 3. Blog Link */}
              <Link
                href="/blogs"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                Blog
              </Link>

              {/* 4. FAQs Link */}
              <Link
                href="/faqs"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                FAQs
              </Link>
            </div>

            {/* Right Action Trigger & Buttons matching Artifact */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Web Login Button - Outlined style from Artifact */}
              <a
                href="https://web.advisoralpha.in/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs lg:text-sm font-semibold text-white/90 hover:text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all active:scale-95"
              >
                <span>Log in</span>
              </a>

              {/* "Get 2 free ideas" - Solid Warm Gold Pill/Button from Artifact */}
              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center gap-1.5 bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-xs lg:text-sm font-bold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md active:scale-95 transition-all"
              >
                <span>Get 2 free ideas</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                aria-label="Open mobile menu"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:text-white/80 hover:bg-white/10 rounded-full focus:outline-none transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenLeadModal={onOpenLeadModal}
        onOpenConsultation={onOpenConsultation}
      />
    </>
  );
}
