export interface OfferingPlan {
  id: string;
  title: string;
  category: 'stocks' | 'portfolio' | 'mutual_funds';
  subtitle: string;
  badge?: string;
  priceDisplay: string;
  originalPrice?: string;
  billingCycle: string;
  minInvestment?: string;
  expectedAlpha?: string;
  features: string[];
  checkoutUrl: string;
  popular?: boolean;
}

export interface ModelPortfolioBasket {
  id: string;
  title: string;
  stocksCount: string;
  riskProfile: 'Conservative' | 'Balanced' | 'Aggressive' | 'All-Weather';
  cagrBenchmark: string;
  minInvestment: string;
  description: string;
  basketDeepLink: string;
}

export interface MutualFundBasket {
  id: string;
  title: string;
  riskProfile: 'Conservative' | 'Balanced' | 'Aggressive';
  threeYearReturn: string;
  minSip: string;
  fundCount: number;
  description: string;
  deepLink: string;
}

export const OFFERING_PLANS: OfferingPlan[] = [
  {
    id: 'stock-advisory-pro',
    title: 'Single Stock Advisory',
    category: 'stocks',
    subtitle: 'High-conviction stock ideas across short, mid, and long horizons.',
    badge: '75% Historical Win Rate',
    priceDisplay: '₹999',
    originalPrice: '₹1,499',
    billingCycle: '/ month',
    minInvestment: 'Flexible (₹10,000+)',
    expectedAlpha: '+5% to +8% over Nifty 50',
    checkoutUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe',
    popular: true,
    features: [
      '20+ research-backed stock ideas per month',
      'Short-term (1–4 wks), Mid-term (1–6 mos) & Long-term compounders',
      'Progressive profit booking targets (Target 1, Target 2, Target 3)',
      'Strict stop-loss levels on every recommendation',
      'Instant entry, trail stop-loss & exit alerts via App & WhatsApp',
      'Institutional research reports & SQGARP™ valuation thesis',
      'SEBI Registered RA compliance (INH000021818)',
      'Direct broker execution (Zerodha, Groww, Angel One, Upstox, etc.)',
    ],
  },
  {
    id: 'equity-model-portfolios',
    title: 'Equity Model Portfolios',
    category: 'portfolio',
    subtitle: 'Curated baskets of 5–30 screened stocks rebalanced periodically.',
    badge: 'Top Pick for Long-Term Wealth',
    priceDisplay: '₹299',
    originalPrice: '₹1,000',
    billingCycle: '/ month',
    minInvestment: '₹50,000 – ₹2,50,000',
    expectedAlpha: '15% – 18.1% Target CAGR',
    checkoutUrl: 'https://link.advisoralpha.in/nav?page=payment&plan_id=0b6dbbe5-226a-4222-80fe-08f88532774b&plan_type=portfolio&action=subscribe',
    features: [
      '4 Goal-based portfolios (Beginner, Balanced, Flexicap, Aggressive)',
      'Diversified basket of 5 to 30 high-conviction SQGARP™ stocks',
      'Dynamic rebalancing notifications directly to your device',
      '1-Tap batch execution with your linked stockbroker',
      'Comprehensive quarterly performance audit webinars with CIO desk',
      'Zero custody risk: all shares held safely in your personal Demat',
      'No profit sharing or performance fee cuts',
      'Dedicated compliance and research support desk',
    ],
  },
  {
    id: 'curated-mutual-funds',
    title: 'Curated Mutual Funds',
    category: 'mutual_funds',
    subtitle: 'Skip the clutter of 1,000+ schemes with handpicked goal-based baskets.',
    badge: 'AMFI Registered (ARN-350887)',
    priceDisplay: '₹0 Advisory Fee',
    billingCycle: 'Free Platform Access',
    minInvestment: '₹2,000 / month SIP',
    expectedAlpha: '+16% to +21% Historical 3Y',
    checkoutUrl: 'https://link.advisoralpha.in/nav?page=mutual_funds',
    features: [
      'ONDC Financial Services powered architecture',
      '100% digital, paperless onboarding completed in 2 minutes',
      'Zero platform custody — direct bank-to-AMC settlement',
      'Goal-based baskets: First Salary, All-Weather, Retire Rich',
      'Thematic lists: Consistent Performers, Better than FD, Star Managers',
      'Automated mandate setup with UPI Autopay / Netbanking',
      'Continuous scheme monitoring and fund manager tracking',
      'Bank-grade 256-bit encryption for all transactional data',
    ],
  },
];

export const MODEL_PORTFOLIO_BASKETS: ModelPortfolioBasket[] = [
  {
    id: 'beginner-portfolio',
    title: 'Beginner Portfolio',
    stocksCount: '5–10 Stocks',
    riskProfile: 'Conservative',
    cagrBenchmark: '12% – 14% CAGR',
    minInvestment: '₹50,000',
    description: 'Large-cap bias designed for first-time equity investors prioritizing capital preservation and steady compounding.',
    basketDeepLink: 'https://link.advisoralpha.in/nav?page=portfolio&basket_id=4eecff06-a8b0-4cc3-82d2-c95a16c1f375',
  },
  {
    id: 'balanced-portfolio',
    title: 'Balanced Portfolio (Large-Cap Focus)',
    stocksCount: '25–30 Stocks',
    riskProfile: 'Balanced',
    cagrBenchmark: '12.9% – 15% CAGR',
    minInvestment: '₹2,50,000',
    description: 'Carefully chosen market leaders with resilient moats, high ROCE, and low debt for consistent multi-year compounding.',
    basketDeepLink: 'https://link.advisoralpha.in/nav?page=portfolio&basket_id=a8b53a8b-136c-4bf8-a3d1-1cfbc5ab9a01',
  },
  {
    id: 'flexicap-portfolio',
    title: 'Flexicap Portfolio (All-Weather)',
    stocksCount: '25–30 Stocks',
    riskProfile: 'All-Weather',
    cagrBenchmark: '18.1% CAGR',
    minInvestment: '₹1,00,000',
    description: 'Our most popular all-weather portfolio dynamically allocating across large, mid, and emerging leaders for optimal risk-adjusted returns.',
    basketDeepLink: 'https://link.advisoralpha.in/nav?page=portfolio&basket_id=ffda90ba-7e46-483d-ae00-ba85b356eaa8',
  },
  {
    id: 'aggressive-portfolio',
    title: 'Aggressive Growth Portfolio',
    stocksCount: '25–30 Stocks',
    riskProfile: 'Aggressive',
    cagrBenchmark: '20%+ Target CAGR',
    minInvestment: '₹1,00,000',
    description: 'High-growth mid and small cap opportunities exhibiting massive structural market tailwinds for investors with 3–5+ year horizons.',
    basketDeepLink: 'https://link.advisoralpha.in/nav?page=portfolio&basket_id=b3b24e23-0565-456b-a051-cfa61a4f3fd5',
  },
];

export const MUTUAL_FUND_BASKETS: MutualFundBasket[] = [
  {
    id: 'first-salary-basket',
    title: 'First Salary Basket',
    riskProfile: 'Conservative',
    threeYearReturn: '+16.12%',
    minSip: '₹2,000 / month',
    fundCount: 4,
    description: 'Designed for young earners establishing disciplined financial habits with high-quality large-cap and balanced advantage schemes.',
    deepLink: 'https://link.advisoralpha.in/pBt43plM92b',
  },
  {
    id: 'all-weather-portfolio',
    title: 'All-Weather Portfolio',
    riskProfile: 'Balanced',
    threeYearReturn: '+18.35%',
    minSip: '₹5,000 / month',
    fundCount: 6,
    description: 'Multi-asset strategy balancing domestic equities, high-yield debt, gold, and international exposure to weather market corrections.',
    deepLink: 'https://link.advisoralpha.in/mietzMIR92b',
  },
  {
    id: 'retire-rich-basket',
    title: 'Retire Rich Basket',
    riskProfile: 'Aggressive',
    threeYearReturn: '+21.76%',
    minSip: '₹5,000 / month',
    fundCount: 7,
    description: 'High-growth equity-focused compounding vehicle aimed at long-term retirement corpus creation through top flexicap and midcap performers.',
    deepLink: 'https://link.advisoralpha.in/MD16l0NR92b',
  },
];
