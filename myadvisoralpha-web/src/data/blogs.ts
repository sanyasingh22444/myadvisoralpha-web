export interface BlogPost {
  slug: string;
  title: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  author: string;
  excerpt: string;
  tags: string[];
  contentSections: Array<{
    heading: string;
    body: string;
  }>;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'indias-power-supercycle-investment-story',
    title: 'India’s Power Supercycle: The Investment Story Everyone Is Missing',
    publishedDate: 'April 6, 2026',
    readingTime: '7 min read',
    category: 'Sector Trends',
    author: 'Pankaj Murarka',
    excerpt: 'An exhaustive analysis of the structural capex underway in India’s power sector — from renewable generation to high-voltage transmission and power grid infrastructure.',
    tags: ['Power Sector', 'Infrastructure', 'Renewables', 'Capex Cycle'],
    contentSections: [
      {
        heading: 'The Structural Shift in Power Demand',
        body: 'For over a decade, India operated with surplus power generation capacity. However, the confluence of blistering manufacturing capex, nationwide data center rollouts, and peak summer loads has pushed peak demand beyond 250 GW. India is now entering a prolonged power deficit regime unless massive capacity is brought online.',
      },
      {
        heading: 'Transmission: The Overlooked Bottleneck',
        body: 'While generation headlines capture public imagination, the real economic moats lie in transmission infrastructure. Evacuating green power from Rajasthan and Gujarat to industrial load centers demands high-voltage HVDC corridors. Companies with transmission EPC and transformer fabrication capabilities are enjoying decade-high order book visibility.',
      },
      {
        heading: 'Our SQGARP™ View on Utilities',
        body: 'We favour balance-sheet disciplined utilities with guaranteed regulated return-on-equity (RoE) frameworks and rapid renewable transition pathways. Avoiding high-debt cyclical developers is paramount.',
      },
    ],
  },
  {
    slug: 'fuel-relief-or-optics-reality-behind-omc-losses',
    title: 'Fuel Relief or Just Optics? The Reality Behind Oil Marketing Company (OMC) Losses',
    publishedDate: 'March 27, 2026',
    readingTime: '5 min read',
    category: 'Market Insights',
    author: 'Research Desk',
    excerpt: 'Dissecting retail pump price cuts versus crude refining margin realities for state-run refiners IOCL, BPCL, and HPCL.',
    tags: ['OMCs', 'Crude Oil', 'Refining Margins', 'PSU Stocks'],
    contentSections: [
      {
        heading: 'Marketing Margins vs Refining Margins',
        body: 'When global crude fluctuates around $80–$85/barrel, retail pump price freezes place disproportionate pressure on domestic marketing margins. Understanding gross refining margins (GRMs) is crucial for evaluating OMC earnings sustainability.',
      },
      {
        heading: 'Valuation Discipline in Sovereign Energy',
        body: 'Despite attractive dividend yields, oil marketing companies frequently face policy-driven price interventions. Our advisory methodology requires wide valuation safety buffers before initiating tactical positions in this space.',
      },
    ],
  },
  {
    slug: 'no-pass-through-no-margins-cement-sector-reality',
    title: 'No Pass-Through, No Margins: A Reality Check for India’s Cement Sector',
    publishedDate: 'March 18, 2026',
    readingTime: '6 min read',
    category: 'Sector Trends',
    author: 'Pankaj Murarka',
    excerpt: 'Intense price wars, regional demand variations, and aggressive capacity consolidation among UltraTech, Adani Cement, and Shree Cement.',
    tags: ['Cement', 'Commodities', 'Consolidation', 'Infra Demand'],
    contentSections: [
      {
        heading: 'Capacity Additions Ahead of Demand',
        body: 'Over 40 MTPA of new grinding capacity commissioned in FY25–26 has intensified regional price battles across North and Eastern markets. Without pricing power, input cost relief in petcoke fails to translate into margin expansion.',
      },
      {
        heading: 'Consolidation Will Create Institutional Compounders',
        body: 'Over a 3–5 year horizon, large incumbents with superior lead-distance logistics, green power captive plants, and balance sheet depth will acquire distressed regional mills, eventually unlocking pricing discipline.',
      },
    ],
  },
  {
    slug: 'small-cap-index-india-complete-valuation-guide',
    title: 'Small Cap Index in India: Meaning, Live Chart, PE Ratio & Best Small Cap Stocks',
    publishedDate: 'March 16, 2026',
    readingTime: '9 min read',
    category: 'Stock Deep Dives',
    author: 'Research Desk',
    excerpt: 'Everything you need to understand Nifty Smallcap 250 index valuations, liquidity considerations, and applying SQGARP™ quality filters to avoid wealth-destroying traps.',
    tags: ['Small Caps', 'Valuation', 'Nifty Smallcap 250', 'Risk Management'],
    contentSections: [
      {
        heading: 'The Appeal and Perils of Small Cap Investing',
        body: 'Small-cap equities offer explosive multi-bagger potential, but over 60% of small-cap index constituents fail to deliver benchmark returns across a full market cycle. Identifying durable winners requires rigorous institutional forensic analysis.',
      },
      {
        heading: 'The 3 Non-Negotiable Small Cap Filters',
        body: '1. Positive Operating Cash Flows in 4 out of last 5 years. 2. Promoter pledging under 5%. 3. Debt-to-Equity below 0.5x or covered by high interest coverage (>5x).',
      },
    ],
  },
  {
    slug: 'what-is-direct-mutual-fund-complete-guide',
    title: 'What is a Direct Mutual Fund? A Complete Guide for Investors',
    publishedDate: 'March 13, 2026',
    readingTime: '6 min read',
    category: 'Mutual Funds & SIPs',
    author: 'Research Desk',
    excerpt: 'How lower expense ratios in direct plans compound into lakhs of extra wealth over a 15–20 year investment horizon.',
    tags: ['Mutual Funds', 'Direct Plans', 'Expense Ratio', 'Compounding'],
    contentSections: [
      {
        heading: 'The Math of 1% Expense Difference',
        body: 'A 1% annual difference in expense ratio between Regular and Direct plans may seem trivial in year one. Over a 20-year SIP of ₹25,000/month compounding at 14%, that single percentage point translates to over ₹32 Lakhs in extra wealth retained by the investor.',
      },
    ],
  },
  {
    slug: 'tata-steel-vs-jsw-steel-head-to-head',
    title: 'Tata Steel vs JSW Steel: India’s Steel Giants Go Head-to-Head',
    publishedDate: 'March 11, 2026',
    readingTime: '8 min read',
    category: 'Company Deep Dives',
    author: 'Pankaj Murarka',
    excerpt: 'A comprehensive operational comparison: captive iron ore advantages, European decarbonization commitments, and domestic infrastructure consumption dynamics.',
    tags: ['Steel Sector', 'Tata Steel', 'JSW Steel', 'Cyclicals'],
    contentSections: [
      {
        heading: 'Cost Curve Supremacy in Domestic Operations',
        body: 'Tata Steel enjoys captive iron ore leases in Jharkhand and Odisha, granting it unmatched cost leadership in domestic operations. Conversely, JSW Steel demonstrates world-class conversion efficiency and aggressive brownfield execution at Vijayanagar.',
      },
    ],
  },
  {
    slug: 'third-stock-exchange-india-capital-markets',
    title: 'Why a Third Stock Exchange Could Strengthen India’s Capital Markets Architecture',
    publishedDate: 'March 10, 2026',
    readingTime: '7 min read',
    category: 'Macro & Policy',
    author: 'Pankaj Murarka',
    excerpt: 'Examining market concentration risks between NSE and BSE, liquidity fragmentation, and regulatory incentives for market resilience.',
    tags: ['Capital Markets', 'NSE', 'BSE', 'SEBI Policy'],
    contentSections: [
      {
        heading: 'The Duopoly Conundrum',
        body: 'With over 90% of derivatives traded on a single venue, systemic outages present heightened market-wide risks. A technologically resilient third exchange platform would bolster market infrastructure and lower institutional clearing fees.',
      },
    ],
  },
  {
    slug: 'walk-through-zero-coupon-bonds',
    title: 'A Walk Through Zero Coupon Bonds: How They Work & Who Should Invest',
    publishedDate: 'February 20, 2026',
    readingTime: '5 min read',
    category: 'Financial Planning',
    author: 'Research Desk',
    excerpt: 'An institutional primer on deep-discount fixed income instruments, compounding mechanics, and taxation considerations.',
    tags: ['Fixed Income', 'Bonds', 'Tax Efficiency', 'Debt Allocation'],
    contentSections: [
      {
        heading: 'Issued at Discount, Redeemed at Par',
        body: 'Zero coupon bonds pay no periodic interest coupons. Instead, they are issued at a substantial discount to face value and redeemed at full par value at maturity, providing guaranteed return certainty when held to maturity.',
      },
    ],
  },
  {
    slug: 'what-is-swp-simple-explanation-clears-confusion',
    title: 'What Is SWP? A Simple Explanation That Clears All Confusion',
    publishedDate: 'February 19, 2026',
    readingTime: '5 min read',
    category: 'Financial Planning',
    author: 'Research Desk',
    excerpt: 'How Systematic Withdrawal Plans provide regular monthly income during retirement with superior tax efficiency over fixed deposits.',
    tags: ['SWP', 'Retirement Planning', 'Tax Efficiency', 'Mutual Funds'],
    contentSections: [
      {
        heading: 'Why SWP Beats Traditional Annuities',
        body: 'Unlike fixed deposit interest which is taxed at your highest slab rate each financial year, SWP withdrawals redeem units where only the capital gain portion is subject to taxation, drastically reducing immediate tax drag.',
      },
    ],
  },
  {
    slug: 'scss-interest-rate-2026-complete-guide',
    title: 'SCSS Interest Rate 2026: Complete Guide to Returns, Tax Benefits & Eligibility',
    publishedDate: 'February 18, 2026',
    readingTime: '6 min read',
    category: 'Financial Planning',
    author: 'Research Desk',
    excerpt: 'Senior Citizen Savings Scheme rules, Section 80C deductions, quarterly interest payouts, and sovereign security guarantees.',
    tags: ['SCSS', 'Senior Citizens', 'Government Schemes', 'Safe Income'],
    contentSections: [
      {
        heading: 'Sovereign Guarantee for Golden Years',
        body: 'With an investment ceiling of ₹30 Lakhs per individual and government-backed sovereign safety, SCSS remains a cornerstone safe allocation for senior citizens seeking quarterly income.',
      },
    ],
  },
  {
    slug: 'rbi-tightens-lending-norms-stock-brokers',
    title: 'RBI Tightens Lending Norms for Stock Brokers: BSE, Groww, Angel One Fall Up to 10%',
    publishedDate: 'February 16, 2026',
    readingTime: '5 min read',
    category: 'Macro & Policy',
    author: 'Research Desk',
    excerpt: 'Analyzing the systemic rationale behind regulatory tightening on bank guarantees and margin trading facilities for retail brokerages.',
    tags: ['RBI Policy', 'Broking Sector', 'Margin Trading', 'Regulations'],
    contentSections: [
      {
        heading: 'De-leveraging the Brokerage Ecosystem',
        body: 'The Reserve Bank’s revised guidelines require higher collateral hair-cuts on bank guarantees provided to clearing corporations. While compressing short-term brokerage MTF loan books, it safeguards market stability against sudden retail margin shocks.',
      },
    ],
  },
];
