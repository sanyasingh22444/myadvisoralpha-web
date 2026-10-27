'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { SipChart } from './HeroPlacard';

interface ShowcaseCardData {
  id: string;
  label: string;
  title: string;
  points: string[];
  price?: string;
  quote?: { text: string; by: string };
  ctaLabel: string;
  ctaUrl: string;
  isExternal: boolean;
  // Phone screenshot or photo shown beside the copy; 'sip' renders the SIP chart
  visual: { src: string; alt: string; bg: string } | 'sip';
}

const WEB_APP_URL = 'https://web.advisoralpha.in/#/login';

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: 'single-stocks',
    label: 'Single Stocks',
    title: 'Stock ideas with a clear plan',
    points: [
      'Entry, target & stop-loss on every idea',
      'Short, mid & long-term ideas',
      'Every closed idea published, including losses',
    ],
    price: '₹999 / month',
    ctaLabel: 'Explore Single Stocks',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe',
    isExternal: true,
    visual: { src: '/assets/app/single-stocks.jpg', alt: 'MyAdvisorAlpha app showing the Single Stocks screen', bg: '#F3F7FE' },
  },
  {
    id: 'futures',
    label: 'Futures',
    title: 'Futures trades with defined risk',
    points: [
      'Entry, target & stop-loss for each trade',
      'Margin, risk & reward per lot shown upfront',
      'Live and past trades in one place',
    ],
    ctaLabel: 'Explore Futures',
    ctaUrl: WEB_APP_URL,
    isExternal: true,
    visual: { src: '/assets/app/futures.jpg', alt: 'MyAdvisorAlpha app showing a live Nifty futures trade', bg: '#F3F7FE' },
  },
  {
    id: 'mtf-basket',
    label: 'MTF Baskets',
    title: 'Short-term baskets with margin',
    points: [
      'A few stocks, held for weeks',
      'Basket target & stop-loss set upfront',
      'Exit alerts the moment a stop-loss is hit',
    ],
    ctaLabel: 'Explore MTF Baskets',
    ctaUrl: WEB_APP_URL,
    isExternal: true,
    visual: { src: '/assets/app/mtf-baskets.jpg', alt: 'MyAdvisorAlpha app showing an MTF basket', bg: '#F3F7FE' },
  },
  {
    id: 'model-portfolios',
    label: 'Model Portfolios',
    title: 'Ready-made stock portfolios',
    points: [
      'From beginner to large-cap portfolios',
      'Matched to your risk profile',
      'Rebalancing alerts with the reason why',
    ],
    ctaLabel: 'Explore Portfolios',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=0b6dbbe5-226a-4222-80fe-08f88532774b&plan_type=portfolio&action=subscribe',
    isExternal: true,
    visual: { src: '/assets/app/stock-portfolios.jpg', alt: 'MyAdvisorAlpha app showing the Stock Portfolios screen', bg: '#EAF1FD' },
  },
  {
    id: 'curated-mutual-funds',
    label: 'Mutual Funds',
    title: 'Goal-based mutual fund baskets',
    points: [
      'Direct plans, invested via ONDC',
      'Start a SIP in 2 minutes',
      'Your money goes straight to the AMC',
    ],
    price: 'Free',
    ctaLabel: 'Explore Mutual Funds',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=mutual_funds',
    isExternal: true,
    visual: 'sip',
  },
  {
    id: 'cio-edge',
    label: 'Our Research Team',
    title: 'Led by Pankaj Murarka',
    points: [
      'Former CIO, Axis Mutual Fund',
      '30+ years in equity research',
      'Creator of the SQGARP™ research framework',
    ],
    quote: { text: 'I want every Indian to make money in stock market.', by: 'Pankaj Murarka, Founder & CIO' },
    ctaLabel: 'Read our story',
    ctaUrl: '/about',
    isExternal: false,
    visual: { src: '/assets/app/pankaj-murarka.jpg', alt: 'Pankaj Murarka, Founder & CIO of MyAdvisorAlpha', bg: '#FFFFFF' },
  },
];

const CTA_CLASS =
  'w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-lg';

export default function StackedShowcase() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="offerings" className="relative bg-[#081026] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-visible">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
        <span className="text-xs font-bold tracking-widest text-[#F5BA31] uppercase bg-[#F5BA31]/10 border border-[#F5BA31]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Our Products
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          Invest with <span className="text-[#F5BA31]">conviction.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/60">
          Stock ideas, futures, MTF baskets, model portfolios and mutual funds, all in the MyAdvisorAlpha app.
        </p>
      </div>

      {/* Sequential Sticky Deck */}
      <div className="max-w-6xl mx-auto space-y-12 lg:space-y-16">
        {SHOWCASE_CARDS.map((card, index) => {
          // Stacking top offsets: 120px, 140px, 160px ...
          const topOffset = 120 + index * 20;

          return (
            <div
              key={card.id}
              id={card.id}
              className="sticky scroll-mt-28"
              style={{ top: `${topOffset}px`, zIndex: 20 + index }}
            >
              {/* Navbar anchor for the Portfolio link */}
              {card.id === 'model-portfolios' && (
                <div id="portfolios" className="relative -top-28 pointer-events-none" />
              )}
              {/* Navbar anchor for the Mutual Funds link */}
              {card.id === 'curated-mutual-funds' && (
                <div id="mutual-funds" className="relative -top-28 pointer-events-none" />
              )}

              <div className="w-full rounded-[32px] border border-white/10 bg-[#0B1528] shadow-[0_12px_48px_rgba(0,0,0,0.85)] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[480px]">

                  {/* Copy */}
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F5BA31] bg-[#F5BA31]/10 px-3 py-1 rounded-full border border-[#F5BA31]/20">
                        {card.label}
                      </span>
                      {card.price && (
                        <span className="text-base font-extrabold text-white">{card.price}</span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6">
                      {card.title}
                    </h3>

                    <ul className="space-y-3 mb-8">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                          <CheckCircle2 className="w-5 h-5 text-[#F5BA31] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {card.quote && (
                      <figure className="mb-8 border-l-2 border-[#F5BA31] pl-4">
                        <blockquote className="text-base sm:text-lg italic text-white">
                          &ldquo;{card.quote.text}&rdquo;
                        </blockquote>
                        <figcaption className="mt-1 text-xs text-white/50">{card.quote.by}</figcaption>
                      </figure>
                    )}

                    <div>
                      {card.isExternal ? (
                        <a href={card.ctaUrl} target="_blank" rel="noopener noreferrer" className={CTA_CLASS}>
                          <span>{card.ctaLabel}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link href={card.ctaUrl} className={CTA_CLASS}>
                          <span>{card.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Visual: app screenshot, photo or SIP chart */}
                  {card.visual === 'sip' ? (
                    <div className="order-1 lg:order-2 bg-[#0E1A33] border-b lg:border-b-0 lg:border-l border-white/10 flex items-center justify-center p-6 sm:p-10">
                      <div className="w-full max-w-[460px]">
                        <SipChart still={reduceMotion} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-auto"
                      style={{ backgroundColor: card.visual.bg }}
                    >
                      <Image
                        src={card.visual.src}
                        alt={card.visual.alt}
                        fill
                        sizes="(min-width: 1024px) 576px, 100vw"
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
