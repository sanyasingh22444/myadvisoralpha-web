"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  LogIn, 
  TrendingUp,
  PieChart,
  BookOpen, 
  HelpCircle, 
  PhoneCall,
  UserCheck
} from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLeadModal?: () => void;
  onOpenConsultation?: () => void;
}

export default function MobileNav({ 
  isOpen, 
  onClose, 
  onOpenLeadModal, 
  onOpenConsultation 
}: MobileNavProps) {
  const [advisoryExpanded, setAdvisoryExpanded] = useState(true);
  const [legalExpanded, setLegalExpanded] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-[#0B1528] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-[70] overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header row: Logo & Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            {/* Logo sits on a white chip because its wordmark is dark navy */}
            <Link href="/" onClick={onClose} aria-label="MyAdvisorAlpha home" className="flex items-center bg-white rounded-xl px-2.5 py-1.5">
              <Image
                src="/assets/brand/myadvisoralpha-logo.svg"
                alt="MyAdvisorAlpha by Renaissance"
                width={171}
                height={58}
                unoptimized
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 space-y-1">
            {/* Advisory Accordion matching desktop taxonomy */}
            <div>
              <button
                type="button"
                onClick={() => setAdvisoryExpanded(!advisoryExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#F5BA31]" />
                  <span>Advisory</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    advisoryExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {advisoryExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-1 mt-1 border-l-2 border-[#F5BA31]/40 ml-3">
                  {/* Same order as the desktop Advisory menu */}
                  {[
                    { href: "/advisory", label: "All advisory products", description: "See every product on one page" },
                    { href: "/advisory#single-stocks", label: "Stocks", description: "Stock ideas with entry, target & stop-loss" },
                    { href: "/advisory#mtf-basket", label: "MTF Baskets", description: "Short-term stock baskets using margin", comingSoon: true },
                    { href: "/advisory#futures", label: "Futures", description: "Futures trades with defined risk", comingSoon: true },
                    { href: "/advisory#portfolios", label: "Portfolios", description: "Ready-made portfolios matched to your risk" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white group-hover:text-[#F5BA31] transition-colors">
                          {item.label}
                        </span>
                        {"comingSoon" in item && item.comingSoon && (
                          <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-[#F5BA31]/15 text-[#F5BA31] border border-[#F5BA31]/40">
                            Coming soon
                          </span>
                        )}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">{item.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mutual Funds */}
            <Link
              href="/mutual-funds"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#FF8415]" />
                <span>Mutual Funds</span>
              </div>
              <span className="text-[10px] font-semibold text-neutral-400">ONDC</span>
            </Link>

            {/* Blog */}
            <Link
              href="/blogs"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#F5BA31]" />
              <span>Blog</span>
            </Link>

            {/* FAQ */}
            <Link
              href="/faqs"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#F5BA31]" />
              <span>FAQ</span>
            </Link>

            {/* Secondary Navigation Divider */}
            <div className="pt-2 pb-1">
              <div className="h-px bg-white/10 my-1" />
            </div>

            {/* About Us */}
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>About Us</span>
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#EC6446]" />
              <span>Contact Us</span>
            </Link>

            {/* Legal Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setLegalExpanded(!legalExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>Legal &amp; Disclosures</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    legalExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {legalExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-1">
                  <Link
                    href="/legal/terms-and-conditions"
                    onClick={onClose}
                    className="block px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                  >
                    Terms &amp; Conditions
                  </Link>
                  <Link
                    href="/legal/privacy-policy"
                    onClick={onClose}
                    className="block px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/legal/grievance-redressal-escalation-matrix"
                    onClick={onClose}
                    className="block px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                  >
                    Grievance Escalation Matrix
                  </Link>
                  <Link
                    href="/legal/customer-complaints-and-disclosures"
                    onClick={onClose}
                    className="block px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white"
                  >
                    Customer Complaints &amp; Disclosures
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Bottom Actions & Badges */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          {/* Web App Login */}
          <a
            href="https://web.advisoralpha.in/#/login"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            <LogIn className="w-4 h-4 text-[#F5BA31]" />
            <span>Login to Web App</span>
          </a>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => {
              onClose();
              handleCtaClick();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] font-bold text-sm shadow-lg active:scale-95 transition-all"
          >
            <span>Get 2 free ideas</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Regulatory Trust Badge in Drawer */}
          <div className="text-center pt-2">
            <span className="text-[10px] text-neutral-400 font-medium block">
              SEBI RA INH000021818 · BSE 6793 · AMFI ARN-350887
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
