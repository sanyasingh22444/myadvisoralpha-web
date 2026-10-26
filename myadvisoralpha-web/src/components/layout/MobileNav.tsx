"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  LogIn, 
  TrendingUp, 
  Briefcase, 
  Layers, 
  PieChart, 
  Calculator, 
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

  const handleCtaClick = onOpenConsultation || onOpenLeadModal;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
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
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F5BA31] flex items-center justify-center text-[#081026] shadow-sm">
                <svg className="w-3.5 h-3.5 text-[#081026] stroke-[2.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 19L20 5M20 5H10M20 5V15" />
                </svg>
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                MyAdvisor<span className="text-[#F5BA31]">Alpha</span>
              </span>
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
                  <TrendingUp className="w-4 h-4 text-[#0066f5]" />
                  <span>Advisory</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    advisoryExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {advisoryExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-2 mt-1 border-l-2 border-[#0066f5]/30 ml-3">
                  {/* Single Stocks Subsection */}
                  <div>
                    <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0066f5]">
                      Single Stocks
                    </div>
                    <div className="space-y-1">
                      {/* Futures */}
                      <Link
                        href="/#futures"
                        onClick={onClose}
                        className="block p-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white group-hover:text-[#0066f5] transition-colors">
                            Futures
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#dbeafe] text-[#1e40af]">
                            Derivatives
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                          Derivatives trading strategies and momentum signals
                        </p>
                      </Link>

                      {/* MTF Basket */}
                      <Link
                        href="/#mtf-basket"
                        onClick={onClose}
                        className="block p-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white group-hover:text-[#0066f5] transition-colors">
                            MTF Basket
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#dbeafe] text-[#1e40af]">
                            Margin Trading
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                          Margin Trading Facility curated equity baskets with leverage and risk management
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Portfolio Subsection */}
                  <div className="pt-1 border-t border-white/5">
                    <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-[#3AA17E]">
                      Portfolio
                    </div>
                    <Link
                      href="/#portfolios"
                      onClick={onClose}
                      className="block p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white group-hover:text-[#3AA17E] transition-colors">
                          Portfolio Advisory
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#dcfce7] text-[#166534]">
                          Full Advisory
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                        Full portfolio advisory, risk profiling, and periodic rebalancing
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mutual Funds */}
            <Link
              href="/#mutual-funds"
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
              <BookOpen className="w-4 h-4 text-[#0066f5]" />
              <span>Blog</span>
            </Link>

            {/* FAQ */}
            <Link
              href="/#faq"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#3AA17E]" />
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

            {/* SIP Calculator */}
            <Link
              href="/#calculator"
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-[#3AA17E]" />
              <span>SIP &amp; Wealth Calculator</span>
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
          {handleCtaClick ? (
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
          ) : (
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5BA31] hover:bg-[#e5ab28] text-[#081026] font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              <span>Get 2 free ideas</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}

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
