/**
 * Canonical Services & Product Taxonomy Data Fixture
 * MyAdvisorAlpha Web Application
 *
 * Defines the authoritative hierarchy:
 *   - Advisory Category
 *     - Single Stocks
 *       - Futures: "Derivatives trading strategies and momentum signals"
 *       - MTF Basket: "Margin Trading Facility curated equity baskets with leverage and risk management"
 *     - Portfolio: "Full portfolio advisory, risk profiling, and periodic rebalancing"
 *   - Mutual Funds Category: "AMFI-registered (ARN-350887), ONDC-powered zero-commission mutual fund baskets"
 */

export interface SubOffering {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  iconName?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  subOfferings?: SubOffering[];
  ctaText: string;
  ctaHref: string;
}

export interface SubServiceItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  href: string;
  iconName?: string;
}

export interface AdvisorySection {
  id: string;
  title: string;
  description: string;
  items: SubServiceItem[];
}

export const CANONICAL_SERVICES: ServiceCategory[] = [
  {
    id: 'advisory',
    name: 'Advisory',
    slug: 'advisory',
    tagline: 'SEBI-Registered Equity, Derivatives & Portfolio Advisory',
    description: 'Institutional-grade research led by Pankaj Murarka (Ex-CIO Axis AMC). High-conviction single stock picks, derivatives strategies, margin trading baskets, and full portfolio advisory.',
    ctaText: 'Explore Advisory',
    ctaHref: '/#offerings',
    subOfferings: [
      {
        id: 'futures',
        name: 'Futures',
        slug: 'futures',
        tagline: 'Derivatives trading strategies and momentum signals',
        description: 'Derivatives trading strategies and momentum signals with structured risk parameters, entry bands, and multi-target profit booking.',
        badge: 'Derivatives',
        features: [
          'Momentum breakout and reversal signals for index and stock futures',
          'Disciplined risk-to-reward ratio with strict trailing stop loss',
          'Real-time alerts via WhatsApp, Telegram & AdvisorAlpha mobile app',
          'SEBI RA compliance: zero conflict of interest execution',
        ],
        ctaText: 'Explore Futures Signals',
        ctaHref: '/#futures',
        iconName: 'TrendingUp',
      },
      {
        id: 'mtf-basket',
        name: 'MTF Basket',
        slug: 'mtf-basket',
        tagline: 'Margin Trading Facility curated equity baskets with leverage and risk management',
        description: 'Margin Trading Facility curated equity baskets with leverage and risk management designed to amplify returns with institutional downside safeguards.',
        badge: 'Margin Trading',
        features: [
          'Curated equity baskets optimized for broker Margin Trading Facilities',
          'Pre-screened via proprietary SQGARP™ fundamental framework',
          'Dynamic margin monitoring and volatility protection alerts',
          'Direct broker integration across leading Indian Demat platforms',
        ],
        ctaText: 'Explore MTF Baskets',
        ctaHref: '/#mtf-basket',
        iconName: 'Layers',
      },
      {
        id: 'portfolio',
        name: 'Portfolio',
        slug: 'portfolio',
        tagline: 'Full portfolio advisory, risk profiling, and periodic rebalancing',
        description: 'Full portfolio advisory, risk profiling, and periodic rebalancing across 4 distinct risk buckets with direct Demat custody.',
        badge: 'Full Advisory',
        features: [
          '4 Goal-Based Portfolios: Beginner, Balanced, Flexicap (18.1% Target CAGR), Aggressive',
          'Quarterly fundamental rebalancing updates with 1-click execution',
          '100% custody in client Demat account (Zerodha, Groww, AngelOne)',
          'Flat subscription fee with zero profit-sharing or hidden commissions',
        ],
        ctaText: 'Explore Model Portfolios',
        ctaHref: '/#portfolios',
        iconName: 'Briefcase',
      },
    ],
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    slug: 'mutual-funds',
    tagline: 'AMFI-registered (ARN-350887), ONDC-powered zero-commission mutual fund baskets',
    description: 'AMFI-registered (ARN-350887), ONDC-powered zero-commission mutual fund baskets. Paperless digital onboarding via Aadhaar & PAN in 2 minutes with bank-grade 256-bit encryption.',
    ctaText: 'Start Mutual Fund SIP',
    ctaHref: '/#mutual-funds',
    subOfferings: [
      {
        id: 'first-salary-basket',
        name: 'First Salary Basket',
        slug: 'first-salary-basket',
        tagline: '16.12% 3Y Return · Ideal for early career investors',
        description: 'Tailored for young professionals beginning their wealth journey with disciplined monthly SIPs.',
        badge: '16.12% 3Y',
        features: [
          'Balanced mix of large-cap stability and mid-cap alpha',
          'Zero commission direct plans maximizing compounding growth',
          'Minimum SIP starts at ₹1,000/month',
        ],
        ctaText: 'Invest in Basket',
        ctaHref: 'https://link.advisoralpha.in/nav?page=mutual_funds',
        iconName: 'PieChart',
      },
      {
        id: 'all-weather-basket',
        name: 'All-Weather Basket',
        slug: 'all-weather-basket',
        tagline: '18.35% 3Y Return · Multi-asset resilience',
        description: 'Engineered for steady capital growth across bullish, sideways, and volatile macroeconomic cycles.',
        badge: '18.35% 3Y',
        features: [
          'Multi-asset diversification spanning equity, debt, and gold',
          'Low volatility profile with superior risk-adjusted returns',
          'Automated rebalancing across asset classes',
        ],
        ctaText: 'Invest in Basket',
        ctaHref: 'https://link.advisoralpha.in/nav?page=mutual_funds',
        iconName: 'ShieldCheck',
      },
      {
        id: 'retire-rich-basket',
        name: 'Retire Rich Basket',
        slug: 'retire-rich-basket',
        tagline: '21.76% 3Y Return · Long-term wealth compounding',
        description: 'High-growth equity compounding portfolio designed for substantial retirement corpus accumulation.',
        badge: '21.76% 3Y',
        features: [
          'High-conviction flexicap and thematic equity exposure',
          'Focus on long-term compounders with proven management pedigree',
          'Tax-efficient withdrawal planning integration',
        ],
        ctaText: 'Invest in Basket',
        ctaHref: 'https://link.advisoralpha.in/nav?page=mutual_funds',
        iconName: 'Award',
      },
    ],
  },
];

export const ADVISORY_SERVICES: AdvisorySection[] = [
  {
    id: 'single-stocks',
    title: 'Single Stocks',
    description: 'High-conviction stock research screened via SQGARP™ framework with clear entry, target, and stop-loss.',
    items: [
      {
        id: 'futures',
        name: 'Futures',
        badge: 'Derivatives',
        description: 'Derivatives trading strategies and momentum signals',
        href: '/#futures',
        iconName: 'TrendingUp',
      },
      {
        id: 'mtf-basket',
        name: 'MTF Basket',
        badge: 'Margin Trading',
        description: 'Margin Trading Facility curated equity baskets with leverage and risk management',
        href: '/#mtf-basket',
        iconName: 'Layers',
      },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Full portfolio advisory, risk profiling, and periodic rebalancing',
    items: [
      {
        id: 'model-portfolios',
        name: 'Model Portfolios',
        badge: '18.1% Target CAGR',
        description: 'Full portfolio advisory, risk profiling, and periodic rebalancing',
        href: '/#portfolios',
        iconName: 'Briefcase',
      },
    ],
  },
];

/**
 * Helper to fetch a service category by its unique ID or slug.
 */
export function getServiceCategory(idOrSlug: string): ServiceCategory | undefined {
  return CANONICAL_SERVICES.find(
    (c) => c.id === idOrSlug || c.slug === idOrSlug
  );
}

/**
 * Helper to flatten and return all sub-offerings across all categories.
 */
export function getAllOfferings(): SubOffering[] {
  return CANONICAL_SERVICES.flatMap((category) => category.subOfferings || []);
}

/**
 * Helper to locate an individual sub-offering by its slug.
 */
export function getOfferingBySlug(slug: string): SubOffering | undefined {
  return getAllOfferings().find((offering) => offering.slug === slug);
}
