'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShieldCheck, 
  Quote, 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  CheckCircle,
  Users
} from 'lucide-react';
import { 
  TESTIMONIALS, 
  TESTIMONIALS_RATING_PROOF, 
} from '@/data/testimonials';

interface TestimonialsProps {
  onOpenConsultation?: () => void;
}

export default function Testimonials({ onOpenConsultation }: TestimonialsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Stocks' | 'Portfolios' | 'Mutual Funds'>('All');

  const filteredTestimonials = selectedCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.portfolioCategory === selectedCategory);

  return (
    <section 
      id="testimonials" 
      className="relative bg-[#081026] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden"
    >
      {/* Background radial gradient accent */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#F5BA31]/10 rounded-full blur-[140px] pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F5BA31]/10 rounded-full blur-[120px] pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-4">
            <Users className="w-3.5 h-3.5 text-[#F5BA31]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5BA31]">
              TESTIMONIALS & INVESTOR PROOF
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Hear from our{' '}
            <span className="text-[#F5BA31] inline-block">
              Verified Investors
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            Real performance feedback from Indian retail investors, finance professionals, 
            and defense veterans navigating the markets with MyAdvisorAlpha.
          </p>

          {/* AdvisorAlpha 4.9 Rating Proof Pill */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-2xl bg-[#0B1528] border border-white/10 shadow-lg">
            
            {/* Stars Cluster */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#FCF50F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FCF50F] stroke-none" />
                ))}
              </div>
              <span className="text-sm font-extrabold text-white">
                {TESTIMONIALS_RATING_PROOF.ratingDisplay}
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/20" />

            {/* Total Reviews Proof */}
            <div className="flex items-center gap-1.5 text-xs text-white/80 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#3AA17E]" />
              <span>{TESTIMONIALS_RATING_PROOF.totalReviews}</span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-white/20" />

            {/* App Store Rating */}
            <div className="flex items-center gap-1.5 text-xs text-white/80 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-[#F5BA31]" />
              <span>{TESTIMONIALS_RATING_PROOF.appStoreRating}</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {(['All', 'Stocks', 'Portfolios', 'Mutual Funds'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F5BA31] text-[#081026] font-bold shadow-md shadow-black/40'
                  : 'bg-[#0B1528] text-white/70 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat === 'All' ? 'All Reviews' : cat}
              <span className="ml-1.5 text-xs opacity-70">
                ({cat === 'All' ? TESTIMONIALS.length : TESTIMONIALS.filter(t => t.portfolioCategory === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-2xl border border-white/10 bg-[#0B1528] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#F5BA31]/40 hover:-translate-y-1 hover:shadow-[0px_8px_32px_0px_rgba(245,186,49,0.12)]"
            >
              {/* Watermark Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.04] group-hover:text-[#F5BA31]/10 transition-colors pointer-events-none" />

              <div>
                {/* Meta Top: Stars + Category + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FCF50F] text-[#FCF50F] stroke-none" />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
                      {testimonial.portfolioCategory}
                    </span>

                    {testimonial.verifiedBadge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3AA17E] bg-[#3AA17E]/10 border border-[#3AA17E]/30 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Headline */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F5BA31] transition-colors leading-snug">
                  “{testimonial.headline}”
                </h3>

                {/* Review Body */}
                <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar with fallback */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-[#F5BA31] to-[#3AA17E] flex items-center justify-center text-white font-bold text-xs shrink-0 border border-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="uppercase">
                      {testimonial.name.slice(0, 2)}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-white/50 leading-tight mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Location & Date */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-[11px] text-white/40">
                    <MapPin className="w-3 h-3 text-[#F5BA31]" />
                    <span>{testimonial.location}</span>
                  </div>
                  <div className="text-[10px] text-white/30 mt-0.5">
                    {testimonial.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Social Proof & CTA Banner */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B1528] via-[#0D1A33] to-[#0B1528] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left max-w-xl">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3AA17E] flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 1 Lakh+ Indian Investors
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Experience the clarity of institutional trade research
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Join thousands of smart investors using disciplined entries, multi-tier targets, 
              and hard stop losses. Zero profit sharing. Zero hidden fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] active:scale-95 font-bold text-sm transition-all shadow-lg shadow-black/40"
            >
              <span>Subscribe for ₹999/mo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onOpenConsultation ? (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white font-semibold text-sm transition-all cursor-pointer"
              >
                Schedule Free Callback
              </button>
            ) : (
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 active:scale-95 text-white font-semibold text-sm transition-all"
              >
                Schedule Free Callback
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
