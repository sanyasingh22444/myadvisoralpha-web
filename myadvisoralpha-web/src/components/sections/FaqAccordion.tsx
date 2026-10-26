'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Phone, 
  Mail, 
  X
} from 'lucide-react';
import { FAQS } from '@/data/faq';

interface FaqAccordionProps {
  onOpenConsultation?: () => void;
}

export default function FaqAccordion({ onOpenConsultation }: FaqAccordionProps) {
  // Pre-expand first two items for instant content visibility
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const categories = [
    { key: 'all', label: 'All Questions', count: FAQS.length },
    { key: 'offerings', label: 'Advisory Offerings', count: FAQS.filter(f => f.category === 'offerings').length },
    { key: 'compliance', label: 'SEBI & Compliance', count: FAQS.filter(f => f.category === 'compliance').length },
    { key: 'pricing', label: 'Pricing & Refunds', count: FAQS.filter(f => f.category === 'pricing').length },
    { key: 'general', label: 'General & Methodology', count: FAQS.filter(f => f.category === 'general').length },
  ];

  const filteredFaqs = FAQS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="faq" 
      className="relative bg-[#081026] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden"
    >
      {/* Background ambient light */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#3AA17E]/10 rounded-full blur-[120px] pointer-events-none -z-0"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#237FFB]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#237FFB]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Got Questions?{' '}
            <span className="text-[#237FFB] inline-block">
              We Have Clear Answers.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            Everything you need to know about our SEBI-registered advisory, execution on your broker, 
            and subscription terms.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., SEBI, Demat, refund, minimum capital)..."
              className="w-full pl-11 pr-10 py-3 bg-[#0B0E14] border border-white/15 focus:border-[#237FFB] rounded-2xl text-sm text-white placeholder-white/40 outline-none transition-colors shadow-lg shadow-black/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#237FFB] text-white shadow-md'
                    : 'bg-[#0B0E14] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
                <span className="ml-1 text-[11px] opacity-70">
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-[#0B0E14] border border-white/10">
              <HelpCircle className="w-8 h-8 text-white/30 mx-auto mb-3" />
              <p className="text-sm font-semibold text-white/80">
                No matching questions found for &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-[#237FFB] hover:underline font-semibold cursor-pointer"
              >
                Reset search filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#237FFB]/40 bg-[#0B0E14] shadow-[0px_4px_24px_0px_rgba(35,127,251,0.08)]'
                      : 'border-white/10 bg-[#0B0E14]/80 hover:border-white/20'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#237FFB] transition-colors leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      <div className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-[#237FFB]/20 transition-all ${
                        isOpen ? 'bg-[#237FFB] text-white rotate-180' : ''
                      }`}>
                        <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Panel with smooth CSS transition */}
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${faq.id}`}
                    className={`transition-all duration-300 ease-in-out px-5 sm:px-6 overflow-hidden ${
                      isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    }`}
                  >
                    <div className="pt-2 border-t border-white/5 text-xs sm:text-sm text-white/75 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B0E14] via-[#111622] to-[#0B0E14] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-[#237FFB] flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-4 h-4" />
              Need Personal Guidance?
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Still have questions about our advisory?
            </h3>
            <p className="text-xs text-white/60 mt-1 max-w-lg">
              Speak directly with our research and compliance desk. We are available Mon–Fri, 9:00 AM – 6:00 PM IST.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="tel:+918655387833"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-xs font-semibold text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#3AA17E]" />
              <span>+91 8655387833</span>
            </a>

            <a
              href="mailto:support@myadvisoralpha.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-xs font-semibold text-white transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#237FFB]" />
              <span>Email Support</span>
            </a>

            {onOpenConsultation ? (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#237FFB] hover:bg-[#1C6FE6] active:scale-95 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <span>Request Call</span>
              </button>
            ) : (
              <Link
                href="/contact"
                className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#237FFB] hover:bg-[#1C6FE6] active:scale-95 text-xs font-bold text-white shadow-md transition-all"
              >
                <span>Request Call</span>
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
