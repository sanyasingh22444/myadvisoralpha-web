"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  TrendingUp,
  Briefcase,
  Layers,
  BarChart3,
  Headset
} from "lucide-react";
import MobileNav from "./MobileNav";
import { openContactPage } from "./contactLinks";
import TalkToExpert from "./TalkToExpert";

interface NavbarProps {
  onOpenLeadModal?: () => void;
  onOpenConsultation?: () => void;
}

// Brand colours from the MyAdvisorAlpha logo
const BRAND_BLUE = "#164198";

// Advisory dropdown, in the order shown
const ADVISORY_ITEMS = [
  {
    href: "/advisory#single-stocks",
    label: "Stocks",
    description: "Stock ideas with entry, target & stop-loss",
    icon: TrendingUp,
  },
  {
    href: "/advisory#mtf-basket",
    label: "MTF Baskets",
    description: "Short-term stock baskets using margin",
    icon: Layers,
    comingSoon: true,
  },
  {
    href: "/advisory#futures",
    label: "Futures",
    description: "Futures trades with defined risk",
    icon: BarChart3,
    comingSoon: true,
  },
  {
    href: "/advisory#portfolios",
    label: "Portfolios",
    description: "Ready-made portfolios matched to your risk",
    icon: Briefcase,
  },
];

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
        openContactPage();
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

  // Close the Advisory dropdown on Escape
  useEffect(() => {
    if (!advisoryOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAdvisoryOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advisoryOpen]);

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

  const navLinkClass =
    "whitespace-nowrap px-3.5 py-1.5 rounded-full text-[#164198] hover:text-[#C99512] hover:bg-[#164198]/[0.06] transition-colors";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 pb-2" : "pt-4 pb-2"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Floating off-white pill with a slight blue tint */}
          <nav
            aria-label="Main Navigation"
            className="bg-[#EEF3FB] rounded-full border border-[#164198]/15 pl-4 pr-2 sm:px-6 py-2 flex items-center justify-between gap-2 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.35)]"
          >
            {/* Logo (from myadvisoralpha.com) */}
            <div className="flex items-center min-w-0">
              <Link href="/" aria-label="MyAdvisorAlpha home" className="flex items-center">
                <Image
                  src="/assets/brand/myadvisoralpha-logo.svg"
                  alt="MyAdvisorAlpha by Renaissance"
                  width={171}
                  height={58}
                  priority
                  unoptimized
                  className="h-10 min-[400px]:h-11 sm:h-14 w-auto object-contain object-left"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-0 lg:gap-1 xl:gap-3 text-sm lg:text-base font-semibold">
              {/* 1. Advisory Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* One click jumps to the product cards; hover or focus opens the menu */}
                <Link
                  href="/advisory"
                  aria-expanded={advisoryOpen}
                  aria-haspopup="true"
                  onFocus={handleMouseEnter}
                  onClick={() => setAdvisoryOpen(false)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5 focus:outline-none ${
                    advisoryOpen
                      ? "bg-[#164198]/[0.08] text-[#164198]"
                      : "text-[#164198] hover:text-[#C99512] hover:bg-[#164198]/[0.06]"
                  }`}
                >
                  <span>Advisory</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      advisoryOpen ? "rotate-180 text-[#C99512]" : ""
                    }`}
                  />
                </Link>

                {advisoryOpen && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 mt-2 w-[440px] bg-[#F5F8FD] border border-[#93C5FD] rounded-2xl p-2 shadow-[0_25px_60px_rgba(0,0,0,0.35)] z-[100] before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
                  >
                    {ADVISORY_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setAdvisoryOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#164198]/[0.05] transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#164198]/10 text-[#164198] flex items-center justify-center shrink-0 group-hover:bg-[#F5BA31] group-hover:text-[#081026] transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#164198] group-hover:text-[#C99512] transition-colors">
                                {item.label}
                              </span>
                              {item.comingSoon && (
                                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#F5BA31]/20 text-[#8A6D10] border border-[#F5BA31]/50">
                                  Coming soon
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-neutral-600 mt-0.5 font-normal">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Dropdown footer links */}
                    <div className="mt-1 pt-2.5 pb-1.5 border-t border-neutral-200 flex items-center justify-between gap-3 px-3 text-xs text-neutral-600 whitespace-nowrap">
                      <span className="font-medium">Pankaj Murarka · 30+ Yrs Equity Pedigree</span>
                      <div className="flex items-center gap-2.5">
                        <Link
                          href="/about"
                          onClick={() => setAdvisoryOpen(false)}
                          className="text-[#C99512] hover:underline font-bold"
                        >
                          About Us
                        </Link>
                        <span className="text-neutral-300">·</span>
                        <Link
                          href="/contact"
                          onClick={() => setAdvisoryOpen(false)}
                          className="text-[#164198] hover:text-[#C99512] transition-colors font-semibold"
                        >
                          Contact Desk
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Mutual Funds Link */}
              <Link href="/mutual-funds" className={navLinkClass}>
                Mutual Funds
              </Link>

              {/* 3. Blog Link */}
              <Link href="/blogs" className={navLinkClass}>
                Blog
              </Link>

              {/* 4. FAQs Link */}
              <Link href="/faqs" className={navLinkClass}>
                FAQs
              </Link>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1 min-[400px]:gap-1.5 sm:gap-3 shrink-0">
              {/* Web Login Button (in the mobile drawer below sm) */}
              <a
                href="https://web.advisoralpha.in/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center whitespace-nowrap justify-center text-sm lg:text-base font-semibold text-[#164198] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-[#164198]/30 hover:border-[#164198] hover:bg-[#164198]/[0.05] transition-all active:scale-95"
              >
                <span>Log in</span>
              </a>

              {/* Talk to expert: shows the advisory desk number to call. Hidden where the
                  desktop links leave no room (md to lg); phones get the compact button below */}
              <TalkToExpert className="hidden xl:inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm lg:text-base font-semibold text-white bg-[#164198] hover:bg-[#123577] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all active:scale-95">
                <Headset className="w-4 h-4" />
                <span>Talk to expert</span>
              </TalkToExpert>

              {/* Talk to expert on phones: a compact headset button so the bar keeps its size */}
              <TalkToExpert
                ariaLabel="Talk to expert"
                className="md:hidden inline-flex items-center justify-center shrink-0 w-[30px] h-[30px] rounded-lg text-white bg-[#164198] hover:bg-[#123577] transition-all active:scale-95"
              >
                <Headset className="w-4 h-4" />
              </TalkToExpert>

              {/* "Get 2 free ideas" - solid gold button */}
              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] text-xs min-[375px]:text-[13px] sm:text-sm lg:text-base font-bold px-2 min-[375px]:px-2.5 min-[400px]:px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md active:scale-95 transition-all"
              >
                Get 2 free ideas
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                aria-label="Open mobile menu"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1.5 min-[400px]:p-2 rounded-full focus:outline-none transition-colors hover:bg-[#164198]/[0.06]"
                style={{ color: BRAND_BLUE }}
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
