"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ArrowUpRight, 
  Search, 
  Menu, 
  TrendingUp, 
  Briefcase, 
  Layers, 
  PieChart, 
  BookOpen, 
  HelpCircle, 
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

  const handleCtaClick = onOpenConsultation || onOpenLeadModal;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 pb-2" : "pt-4 pb-2"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Floating Pill Container */}
          <nav
            aria-label="Main Navigation"
            className="bg-[#0B0E14]/95 backdrop-blur-md rounded-full border border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0px_8px_32px_0px_rgba(0,0,0,0.36)]"
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066f5] to-[#3AA17E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold tracking-tight text-white leading-none">
                    Advisor<span className="text-[#0066f5]">Alpha</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#3AA17E] font-semibold mt-0.5">
                    SEBI RA INH000021818
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-white/90">
              {/* 1. Advisory Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setAdvisoryOpen(true)}
                onMouseLeave={() => setAdvisoryOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={advisoryOpen}
                  onClick={() => setAdvisoryOpen(!advisoryOpen)}
                  className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 focus:outline-none"
                >
                  <span>Advisory</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                      advisoryOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {advisoryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[480px] sm:w-[520px] bg-[#0B0E14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-3">
                    {/* Section 1: Single Stocks */}
                    <div>
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-xs font-bold uppercase tracking-wider text-[#0066f5]">
                        <TrendingUp className="w-3.5 h-3.5 text-[#0066f5]" />
                        <span>Single Stocks</span>
                      </div>
                      <div className="space-y-1">
                        {/* Futures Sub-Item */}
                        <Link
                          href="/#futures"
                          onClick={() => setAdvisoryOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0066f5]/20 text-[#0066f5] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0066f5] group-hover:text-white transition-colors">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white">Futures</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#dbeafe] text-[#1e40af]">
                                Derivatives
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                              Derivatives trading strategies and momentum signals
                            </div>
                          </div>
                        </Link>

                        {/* MTF Basket Sub-Item */}
                        <Link
                          href="/#mtf-basket"
                          onClick={() => setAdvisoryOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0066f5]/20 text-[#0066f5] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0066f5] group-hover:text-white transition-colors">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white">MTF Basket</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#dbeafe] text-[#1e40af]">
                                Margin Trading
                              </span>
                            </div>
                            <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                              Margin Trading Facility curated equity baskets with leverage and risk management
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Section 2: Portfolio */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1.5 px-2 pb-1.5 text-xs font-bold uppercase tracking-wider text-[#3AA17E]">
                        <Briefcase className="w-3.5 h-3.5 text-[#3AA17E]" />
                        <span>Portfolio</span>
                      </div>
                      <Link
                        href="/#portfolios"
                        onClick={() => setAdvisoryOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#3AA17E]/20 text-[#3AA17E] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#3AA17E] group-hover:text-white transition-colors">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">Portfolio Advisory</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#dcfce7] text-[#166534]">
                              Full Advisory
                            </span>
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                            Full portfolio advisory, risk profiling, and periodic rebalancing
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Dropdown Quick Pedigree & Route Links */}
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between px-2 text-[11px] text-white/50">
                      <span>Pankaj Murarka · 30+ Yrs Equity Pedigree</span>
                      <div className="flex items-center gap-2.5">
                        <Link
                          href="/about"
                          onClick={() => setAdvisoryOpen(false)}
                          className="text-[#0066f5] hover:underline font-medium"
                        >
                          About Us
                        </Link>
                        <span>·</span>
                        <Link
                          href="/contact"
                          onClick={() => setAdvisoryOpen(false)}
                          className="hover:text-white transition-colors"
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

              {/* 4. FAQ Link */}
              <Link
                href="/#faq"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
              >
                FAQ
              </Link>
            </div>

            {/* Right Action Trigger & Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Search Pill (Desktop XL) */}
              <div
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs transition-colors cursor-pointer bg-white/5"
                title="Search offerings & research"
                onClick={() => {
                  const searchElement = document.getElementById("search-input");
                  if (searchElement) searchElement.focus();
                }}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search advisory...</span>
                <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono">⌘K</kbd>
              </div>

              {/* Web Login Button */}
              <a
                href="https://web.advisoralpha.in/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-white/90 hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-[#0066f5]" />
                <span>Login</span>
              </a>

              {/* Get Started Shimmer CTA Button */}
              {handleCtaClick ? (
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="btn-shimmer relative inline-flex items-center gap-1.5 bg-[#0066f5] hover:bg-[#0052cc] text-white text-xs lg:text-sm font-bold px-4 py-2 rounded-full shadow-lg active:scale-95 transition-all"
                >
                  <span>Get Started</span>
                  <div className="w-4 h-4 rounded-full bg-white text-[#0066f5] flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="btn-shimmer relative inline-flex items-center gap-1.5 bg-[#0066f5] hover:bg-[#0052cc] text-white text-xs lg:text-sm font-bold px-4 py-2 rounded-full shadow-lg active:scale-95 transition-all"
                >
                  <span>Get Started</span>
                  <div className="w-4 h-4 rounded-full bg-white text-[#0066f5] flex items-center justify-center shrink-0">
                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </Link>
              )}

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
