'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

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
  // Phone screenshot or photo shown beside the copy
  visual: { src: string; alt: string; bg: string };
}

const WEB_APP_URL = 'https://web.advisoralpha.in/#/login';

const SHOWCASE_CARDS: ShowcaseCardData[] = [
  {
    id: 'single-stocks',
    label: 'Stocks',
    title: 'Stock ideas with a clear plan',
    points: [
      'Entry, target & stop-loss on every idea',
      'Short, mid & long-term ideas',
      'Every closed idea published, including losses',
    ],
    ctaLabel: 'Explore Stocks',
    ctaUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe',
    isExternal: true,
    visual: { src: '/assets/app/single-stocks.webp', alt: 'MyAdvisorAlpha app showing the Stocks screen', bg: '#F3F7FE' },
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
    visual: { src: '/assets/app/futures.webp', alt: 'MyAdvisorAlpha app showing a live futures trade', bg: '#F3F7FE' },
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
    visual: { src: '/assets/app/mtf-baskets.webp', alt: 'MyAdvisorAlpha app showing an MTF basket', bg: '#F3F7FE' },
  },
  {
    id: 'model-portfolios',
    label: 'Portfolios',
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
      'Handpicked funds, powered by ONDC',
      'Start a SIP in 2 minutes',
      'Your money goes straight to the AMC',
    ],
    price: 'Free',
    ctaLabel: 'Explore Mutual Funds',
    ctaUrl: '/mutual-funds',
    isExternal: false,
    visual: { src: '/assets/app/mutual-funds.webp', alt: 'MyAdvisorAlpha app showing popular mutual funds', bg: '#E6EFFD' },
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
    quote: { text: 'I want every Indian to make money in stock market.', by: 'Pankaj Murarka, Founder & CIO, MyAdvisorAlpha' },
    ctaLabel: 'Read our story',
    ctaUrl: '/about',
    isExternal: false,
    visual: { src: '/assets/app/pankaj-murarka.jpg', alt: 'Pankaj Murarka, Founder & CIO of MyAdvisorAlpha', bg: '#FFFFFF' },
  },
];

const CTA_CLASS =
  'w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5BA31] hover:bg-[#e5ab28] active:scale-95 text-[#081026] font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-all shadow-lg';

// Room left at the bottom of the screen for the sticky phone bar, which is taller
// on tablets, where it wraps onto two rows
function barSpace(width: number) {
  if (width < 768) return 80;
  if (width < 1024) return 130;
  return 64;
}

export default function StackedShowcase() {
  const reduceMotion = useReducedMotion() ?? false;
  const deckRef = useRef<HTMLDivElement>(null);

  // Cards stack like a deck: every card sticks at the same spot, so each one fully
  // covers the card before it. All cards share the tallest card's height so no edge
  // of an earlier card shows, and on short screens they sit higher so the top card
  // shows in full above the phone bar instead of being cut off at the bottom
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const cards = Array.from(deck.children) as HTMLElement[];
    const grids = cards.map((card) => card.querySelector<HTMLElement>('[data-card-body]'));

    const place = () => {
      const width = window.innerWidth;
      grids.forEach((grid) => grid && (grid.style.minHeight = ''));
      const tallest = Math.max(...cards.map((card) => card.offsetHeight));
      cards.forEach((card, i) => {
        const grid = grids[i];
        if (grid) grid.style.minHeight = `${tallest - (card.offsetHeight - grid.offsetHeight)}px`;
      });
      const base = width < 768 ? 88 : 104;
      const lowest = window.innerHeight - barSpace(width) - tallest;
      const top = Math.min(base, lowest);
      cards.forEach((card) => card.style.setProperty('--stack-top', `${top}px`));
    };

    place();
    // Heights settle once fonts and pictures load
    const settle = window.setTimeout(place, 800);
    document.fonts?.ready.then(place);
    window.addEventListener('load', place);
    window.addEventListener('resize', place);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('load', place);
      window.removeEventListener('resize', place);
    };
    // A re-render resets the inline --stack-top, so place again after it
  }, [reduceMotion]);

  return (
    <section id="offerings" className="relative bg-[#081026] py-12 lg:py-16 px-4 sm:px-6 lg:px-12 overflow-visible">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
        <span className="text-xs font-bold tracking-widest text-[#F5BA31] uppercase bg-[#F5BA31]/10 border border-[#F5BA31]/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Our Products
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          Invest with <span className="text-[#F5BA31]">conviction</span>
        </h2>
        <p className="mt-5 text-lg sm:text-xl font-medium leading-relaxed text-white/85">
          Stock ideas, futures, MTF baskets, portfolios and mutual funds,{' '}
          <span className="whitespace-nowrap rounded-md bg-[#F5BA31]/15 px-2 py-0.5 font-extrabold text-[#F5BA31]">all in one app</span>
        </p>
      </div>

      {/* Sequential Sticky Deck */}
      {/* The gap between cards is a pause: a card stays fully in view for about a
          third of a screen of scrolling before the next one slides over it */}
      {/* The scroll gap between cards follows the screen height, capped so tall screens
          (a phone in desktop-site mode) don't leave a long empty stretch */}
      <div ref={deckRef} className="max-w-6xl mx-auto space-y-[min(35vh,200px)]">
        {SHOWCASE_CARDS.map((card, index) => {
          return (
            <div
              key={card.id}
              id={card.id}
              className="sticky top-[var(--stack-top)] scroll-mt-32"
              style={{ '--stack-top': '112px', zIndex: 20 + index } as React.CSSProperties}
            >
              {/* Navbar anchor for the Portfolio link */}
              {card.id === 'model-portfolios' && (
                <div id="portfolios" className="relative -top-28 pointer-events-none" />
              )}
              {/* Navbar anchor for the Mutual Funds link */}
              {card.id === 'curated-mutual-funds' && (
                <div id="mutual-funds" className="relative -top-28 pointer-events-none" />
              )}

              <div className="w-full rounded-[32px] border border-[#F5BA31]/70 bg-[#0B1528] shadow-[0_12px_48px_rgba(0,0,0,0.85)] overflow-hidden">
                <div data-card-body className="grid grid-cols-1 md:grid-cols-2 md:min-h-[300px] lg:min-h-[340px]">

                  {/* Copy */}
                  <div className="px-5 sm:px-8 lg:px-12 pt-2.5 pb-8 md:pb-12 lg:pb-14 flex flex-col justify-start">
                    <div className="flex items-center justify-between gap-3 h-[34px]">
                      <span className="text-sm sm:text-base font-extrabold tracking-wide text-[#F5BA31] bg-[#F5BA31]/10 px-4 py-0.5 rounded-full border border-[#F5BA31]/30">
                        {card.label}
                      </span>
                      {card.price && (
                        <span className="text-base sm:text-lg font-extrabold text-white">{card.price}</span>
                      )}
                    </div>

                    <h3 className="mt-3 md:mt-4 text-[1.5rem] sm:text-[2rem] lg:text-[2.6rem] font-extrabold text-white leading-[1.1] mb-3 md:mb-4">
                      {card.title}
                    </h3>

                    <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm sm:text-base text-white/80">
                          <CheckCircle2 className="w-5 h-5 text-[#F5BA31] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {card.quote && (
                      <figure className="mb-4 md:mb-5 border-l-2 border-[#F5BA31] pl-4">
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

                  {/* Visual: app screenshot or photo */}
                  <div
                    className="relative aspect-[16/9] md:aspect-auto md:h-auto"
                    style={{ backgroundColor: card.visual.bg }}
                  >
                    <Image
                      src={card.visual.src}
                      alt={card.visual.alt}
                      fill
                      sizes="(min-width: 768px) 576px, 100vw"
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
