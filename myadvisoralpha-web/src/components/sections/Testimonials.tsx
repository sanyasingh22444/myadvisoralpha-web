'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  Quote,
  ArrowRight,
  TrendingUp,
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
  return (
    <section 
      id="testimonials" 
      className="relative bg-[#081026] text-white py-12 lg:py-16 px-4 sm:px-6 lg:px-12 xl:px-20 overflow-hidden"
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
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-4">
            <Users className="w-3.5 h-3.5 text-[#F5BA31]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#F5BA31]">
              INVESTOR REVIEWS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            What our{' '}
            <span className="text-[#F5BA31] inline-block">
              investors say
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
            Feedback from investors who use MyAdvisorAlpha for stock ideas, portfolios and mutual funds.
          </p>

          {/* AdvisorAlpha Rating Proof Pill */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-2xl bg-[#0B1528] border border-[#F5BA31]/70 shadow-lg">
            
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

        {/* Review cards, centred so an unfilled last row sits in the middle */}
        <div className="flex flex-wrap justify-center gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl border border-[#F5BA31]/70 bg-[#0B1528] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#F5BA31] hover:-translate-y-1 hover:shadow-[0px_8px_32px_0px_rgba(245,186,49,0.12)]"
            >
              {/* Watermark Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/[0.04] group-hover:text-[#F5BA31]/10 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FCF50F] text-[#FCF50F] stroke-none" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  “{testimonial.quote}”
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F5BA31] to-[#3AA17E] flex items-center justify-center text-white font-bold text-xs uppercase shrink-0 border border-white/20">
                  {testimonial.name
                    .split(/\s+/)
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{testimonial.name}</h4>
                  {testimonial.role && (
                    <p className="text-xs text-white/50 leading-tight mt-0.5">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof & CTA Banner */}
        <div className="mt-14 rounded-3xl border border-[#F5BA31]/70 bg-gradient-to-r from-[#0B1528] via-[#0D1A33] to-[#0B1528] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left max-w-xl">
            <span className="text-xs uppercase font-bold tracking-wider text-[#3AA17E] flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 1 Lakh+ Investors
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Your wealth-building journey starts today.
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              SEBI-registered research with a clear entry, target and stop-loss on every idea.
              Flat fee. No profit sharing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/advisory#products"
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#F5BA31] text-[#081026] hover:bg-[#e5ab28] active:scale-95 font-bold text-sm transition-all shadow-lg shadow-black/40"
            >
              <span>Subscribe for</span>
              <span className="sr-only">₹1199 per month, down from ₹2123</span>
              <s aria-hidden="true" className="text-xs font-semibold text-[#081026]/55">₹2123</s>
              <span aria-hidden="true" className="text-base font-extrabold">₹1199</span>
              <span aria-hidden="true" className="-ml-1.5">/mo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

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
