/**
 * Data for the signed-in web app (/app).
 *
 * Snapshot of the live MyAdvisorAlpha API (api.advisoralpha.in) taken on
 * 4 Nov 2026, 08:08 AM IST. Prices are as of that time. When the app is wired
 * to the API, each export here maps to one endpoint (noted above it), so the
 * screens can switch from this snapshot to live data without changing shape.
 */

import closedRaw from './closed-ideas.json';

export const SNAPSHOT_AS_OF = '08:08 AM, 4 Nov 2026';
export const GST_PERCENT = 18;

/* ---------- user (uam/users/data, single-stock/stock-plans/overview/static) ---------- */

export const APP_USER = {
  firstName: 'Sanya',
  kycComplete: false,
  esignComplete: false,
  riskProfileComplete: false,
  stockPlan: {
    name: 'Wealth Builder',
    status: 'ACTIVE' as const,
    durationMonths: 3,
    startDate: '2026-10-19',
    endDate: '2027-03-19',
    remainingDays: 136,
    usedIdeas: 0,
    totalIdeas: 5,
  },
  portfolioPlan: null as null | string,
  investment: { currentValue: 0, totalInvestment: 0, pnl: 0, pnlPercentage: 0 },
};

/* ---------- track record (stock-plans/overview/static -> winStreakCardData) ---------- */

export const TRACK_RECORD = {
  hitRatePercentage: 77.08,
  averageProfitPercentage: 9.73,
  averageDurationDays: 79.54,
  totalClosed: 48,
  totalWinning: 37,
  totalLive: 45,
};

/* ---------- stock ideas (v2/single-stock/stock-plans/overview/ideas) ---------- */

export type IdeaCategory = 'Short Term' | 'Mid Term' | 'Long Term';

export interface StockIdea {
  id: string;
  name: string;
  symbol: string;
  category: IdeaCategory;
  sector: string;
  logoUrl: string | null;
  /** Average entry price (includes any buy-more add-on). */
  buyPrice: number;
  launchedPrice: number;
  launchedDate: string;
  buyRange: string | null;
  stopLoss: number;
  target1: number;
  target2: number;
  horizon: string;
  currentPrice: number;
  dayChangePercentage: number;
  /** Return from entry to current price, %. */
  returnPercentage: number;
  /** Upside left to target 2, %. */
  upsidePotential: number;
  buyMore: { price: number; date: string } | null;
  featured: boolean;
  pinned: boolean;
  reportUrl: string | null;
  why: string;
}

const LOGO = 'https://dev-renaissance-assets.s3.amazonaws.com/stocks-logo/';
const S3 = 'https://prod-renaissance-assets.s3.amazonaws.com/web/';

export const LIVE_IDEAS: StockIdea[] = [
  {
    id: 'dbe46f6a-28dc-43e6-b5d1-dd7ed0104b5c',
    name: 'Info Edge (India)',
    symbol: 'NAUKRI',
    category: 'Long Term',
    sector: 'Miscellaneous',
    logoUrl: LOGO + 'InfoEdgIndia_32670259917_18844.png',
    buyPrice: 1216,
    launchedPrice: 1216,
    launchedDate: '2026-07-21',
    buyRange: null,
    stopLoss: 1050,
    target1: 1400,
    target2: 1600,
    horizon: '6-12 Months',
    currentPrice: 1172.2,
    dayChangePercentage: -0.66,
    returnPercentage: -3.6,
    upsidePotential: 36.5,
    buyMore: null,
    featured: true,
    pinned: true,
    reportUrl: S3 + '198002cd-cee5-4e0e-9690-450bbaacea50.pdf',
    why: "Info Edge is India's leading consumer-internet and online classifieds company, anchored by its dominant recruitment platform Naukri alongside 99acres in real estate, Jeevansathi in matchmaking and Shiksha in education. Its core recruitment franchise remains highly profitable and resilient even in a cautious hiring market, providing a strong cash engine, while the once loss-making non-recruitment verticals are now approaching an inflection toward profitability. As 99acres and matchmaking turn cash-positive and AI adoption strengthens engagement across its platforms, the drag on consolidated margins reverses into operating leverage, creating a credible path for sustained earnings growth.",
  },
  {
    id: '1f1b51bd-033f-480c-850d-e102e99e8075',
    name: 'DLF',
    symbol: 'DLF',
    category: 'Mid Term',
    sector: 'Construction',
    logoUrl: LOGO + 'DLF_34979173164_6890.png',
    buyPrice: 694,
    launchedPrice: 694,
    launchedDate: '2026-11-02',
    buyRange: null,
    stopLoss: 590,
    target1: 809,
    target2: 861,
    horizon: '3-6 Months',
    currentPrice: 720.85,
    dayChangePercentage: 1.67,
    returnPercentage: 3.87,
    upsidePotential: 19.44,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: S3 + '31a258be-6a2d-42fc-a54b-67d0a9fd161a.pdf',
    why: 'A rental portfolio of roughly 50 million square feet running at near-full occupancy provides a recurring, annuity-like earnings base that grows steadily — management is targeting a substantial step-up in exit rentals over the medium term. On the development side, a very large launch pipeline and a retained full-year pre-sales guidance give visibility, with a Gurugram luxury project and the Mumbai Westpark phase two due in the second half. Premium projects are proving the pricing power: the flagship Dahlias has sold most of its inventory and the senior-living launch sold out on day one. Cash collections and operating cash flow are both growing well, funding further project investment without strain. The land bank is enormous, with substantial development potential still ahead.',
  },
  {
    id: '5a96d3d3-635d-4949-81ae-93692e8c78b6',
    name: 'Coforge',
    symbol: 'COFORGE',
    category: 'Mid Term',
    sector: 'Computers - Software - Large',
    logoUrl: LOGO + 'CoforgeLtd_82546788_24978.png',
    buyPrice: 2098,
    launchedPrice: 2098,
    launchedDate: '2026-11-02',
    buyRange: null,
    stopLoss: 1788,
    target1: 2450,
    target2: 2608,
    horizon: '3-6 Months',
    currentPrice: 2038.9,
    dayChangePercentage: -1.06,
    returnPercentage: -2.82,
    upsidePotential: 27.91,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: S3 + '90df1dd9-821f-4656-899f-2295fa3cc34a.pdf',
    why: 'Record deal wins are the headline — order intake roughly doubled year on year with eight large deals in the quarter, lifting the twelve-month executable order book sharply and giving unusual visibility for an IT services firm. Management expects to lead the industry on growth for a third consecutive year and is guiding to a similar deal cadence next quarter. The Encora integration is essentially complete, with its growth set to converge with the core business and its margin expansion already running ahead of the acquisition plan. Margin guidance has been raised rather than trimmed, helped by AI-led delivery efficiency, with lower hedge losses and the end of exceptional items pointing to a stronger earnings exit. Technically, the stock has cleared a resistance zone that capped it four times in two years, completing a cup-and-handle formation.',
  },
  {
    id: '2fdc9986-09cc-416c-ad2b-d15f26d14997',
    name: 'Eternal',
    symbol: 'ETERNAL',
    category: 'Long Term',
    sector: 'Miscellaneous',
    logoUrl: LOGO + 'ZomatoLtd_70745857_68117.png',
    buyPrice: 328,
    launchedPrice: 328,
    launchedDate: '2026-10-07',
    buyRange: '274-455',
    stopLoss: 274,
    target1: 412,
    target2: 455,
    horizon: '6-12 Months',
    currentPrice: 342.75,
    dayChangePercentage: -1.92,
    returnPercentage: 4.5,
    upsidePotential: 32.75,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: S3 + '927615f7-4517-4ca2-bf6d-a00bfd82944a.pdf',
    why: 'Market leadership at genuine scale, with revenue still compounding at triple-digit rates — the company beats the industry median on sales growth, profit growth and long-term returns. The entire case rests on margin inflection: consensus expects operating profit to swing from a loss to a substantial positive over the next two years as scale converts into operating leverage, which is what collapses the forward valuation despite an extreme trailing multiple. The balance sheet supports the journey — equity-funded, negligible long-term debt, with operating cash flow doubling. Domestic institutions have raised their stake every quarter for a year, and momentum is constructive with the stock above nearly every moving average on heavy delivery volumes.',
  },
  {
    id: 'bef41e11-9ead-4e99-af96-72240ed88709',
    name: 'Gland Pharma',
    symbol: 'GLAND',
    category: 'Long Term',
    sector: 'Pharmaceuticals - Indian - Formulations',
    logoUrl: LOGO + 'GlandPharmaLtd._31222392_14546.png',
    buyPrice: 2900,
    launchedPrice: 2900,
    launchedDate: '2026-10-05',
    buyRange: '2413-3990',
    stopLoss: 2413,
    target1: 3596,
    target2: 3990,
    horizon: '6-12 Months',
    currentPrice: 3172.1,
    dayChangePercentage: 0.42,
    returnPercentage: 9.38,
    upsidePotential: 25.78,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: S3 + '409318f4-bbd6-42de-9e52-00d356ab5136.pdf',
    why: 'A pure-play injectables franchise with a broad global registration base, which is what lets new launches drive volume growth fast enough to outrun pricing erosion in the base business — the US and Europe, together the bulk of revenue, both grew strongly last quarter. Management has raised its multi-year growth guidance and backed that with a sizeable capex programme at a point when existing facilities are already running near full utilisation. The real margin lever is the shift toward complex products and the ready-to-use infusion bag portfolio, with a deep pipeline of filings and approvals behind them. Long-dated agreements extend the runway well past the current forecast horizon, and substantial net cash funds the entire capex without leverage.',
  },
  {
    id: 'a9058983-92e4-446c-b086-f0b9676a01e1',
    name: 'Motilal Oswal Financial',
    symbol: 'MOTILALOFS',
    category: 'Short Term',
    sector: 'Finance & Investments',
    logoUrl: LOGO + 'MotilOswalFin_944994613_28011.png',
    buyPrice: 1000,
    launchedPrice: 1000,
    launchedDate: '2026-08-21',
    buyRange: '870-1200',
    stopLoss: 870,
    target1: 1100,
    target2: 1200,
    horizon: '0-3 Months',
    currentPrice: 1017.75,
    dayChangePercentage: 0.77,
    returnPercentage: 1.77,
    upsidePotential: 17.91,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: null,
    why: 'The core thesis is a business model shift — from transaction-heavy broking income to a recurring, annuity-led revenue mix, with the recurring share now well past half of the total and still climbing. Asset management and private wealth are doing the heavy lifting, together contributing the bulk of operating profit. Improving fund performance and more schemes crossing the three-year track record threshold unlock wider distribution, while cross-sell penetration remains low enough to leave real headroom. Technically, the stock has broken out of a two-year downward trendline and is holding above the breakout zone, with the volatile treasury book and a weaker broking cycle the swing factors to watch.',
  },
  {
    id: '34bae2b7-607a-4f21-a665-0bc0775a4376',
    name: 'Ajanta Pharma',
    symbol: 'AJANTPHARM',
    category: 'Short Term',
    sector: 'Pharmaceuticals - Indian - Formulations',
    logoUrl: LOGO + 'AjantaPharma_12686194738_13504.png',
    buyPrice: 3655,
    launchedPrice: 3655,
    launchedDate: '2026-08-21',
    buyRange: '3250-4350',
    stopLoss: 2975,
    target1: 3910,
    target2: 4350,
    horizon: '0-3 Months',
    currentPrice: 3284.3,
    dayChangePercentage: -1.07,
    returnPercentage: -10.14,
    upsidePotential: 32.45,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: S3 + '4d831c44-b598-496d-8a40-37a36d6e1bfd.pdf',
    why: "A diversified branded-generics player entering the year with momentum across all core geographies. India continues to grow well ahead of the broader domestic pharma market, helped by leadership in select chronic therapies, fresh traction in newer areas like gynaecology and nephrology, and a steady cadence of new launches. Africa's branded and institutional businesses are compounding impressively, while the US franchise is being lifted by new launches. Asia is the one soft spot on near-term supply-chain disruption, but underlying demand is intact. Gross margins are holding at healthy levels, and the chart has confirmed a flag breakout with momentum firmly bullish.",
  },
  {
    id: '0826eea5-a0b1-44d8-9c5d-0f374cec69b8',
    name: 'Federal Bank',
    symbol: 'FEDERALBNK',
    category: 'Long Term',
    sector: 'Banks - Private Sector',
    logoUrl: LOGO + 'FederalBank_48888244722_3709.png',
    buyPrice: 338.65,
    launchedPrice: 347.3,
    launchedDate: '2026-07-20',
    buyRange: null,
    stopLoss: 303,
    target1: 390,
    target2: 425,
    horizon: '6-12 Months',
    currentPrice: 333.6,
    dayChangePercentage: -0.04,
    returnPercentage: -1.49,
    upsidePotential: 27.4,
    buyMore: { price: 330, date: '2026-11-04' },
    featured: true,
    pinned: false,
    reportUrl: S3 + '3ec92b83-bdd7-4eed-a557-b56cd4e64326.pdf',
    why: 'Federal Bank is the largest private sector bank in Kerala with a growing pan-India presence, offering retail and corporate banking alongside a strong deposit and NRI franchise. The bank continues to deliver steady operating performance, with accelerating loan growth, expanding margins and healthy asset quality supported by disciplined underwriting and low exposure to unsecured and microfinance lending. A gradual shift toward higher-yielding loans, a robust deposit base and fresh leadership under a new MD & CEO position it well for sustained earnings growth over the medium term.',
  },
  {
    id: '6bb7f8ea-82e8-40f7-a5e7-394697536853',
    name: 'Phoenix Mills',
    symbol: 'PHOENIXLTD',
    category: 'Short Term',
    sector: 'Construction',
    logoUrl: LOGO + 'PhoenixMills_41300937830_6418.png',
    buyPrice: 1980,
    launchedPrice: 1980,
    launchedDate: '2026-07-01',
    buyRange: '0-3000',
    stopLoss: 1735,
    target1: 2080,
    target2: 2170,
    horizon: '0-3 Months',
    currentPrice: 2047.5,
    dayChangePercentage: -0.06,
    returnPercentage: 3.41,
    upsidePotential: 5.98,
    buyMore: null,
    featured: true,
    pinned: false,
    reportUrl: null,
    why: "Phoenix Mills is India's leading owner and operator of premium retail-led malls, backed by a diversified real estate portfolio spanning retail, offices, hospitality and residential. A large share of its retail leases are due for renewal in the coming years, opening the door to healthy rental resets, while a visible development pipeline in newer markets adds to long-term growth visibility. With premium consumption trends firmly in its favour and strong leasing momentum across both malls and offices, the company is well placed to sustain its growth trajectory.",
  },
  {
    id: '7435d719-4338-4e13-8d21-b3829e671004',
    name: 'Bank of Baroda',
    symbol: 'BANKBARODA',
    category: 'Mid Term',
    sector: 'Banks - Public Sector',
    logoUrl: LOGO + 'BankofBaroda_23609426771_5456.png',
    buyPrice: 258.5,
    launchedPrice: 280,
    launchedDate: '2026-06-17',
    buyRange: '0-350',
    stopLoss: 220,
    target1: 320,
    target2: 350,
    horizon: '3-6 Months',
    currentPrice: 244.15,
    dayChangePercentage: 0.35,
    returnPercentage: -5.55,
    upsidePotential: 43.35,
    buyMore: { price: 237, date: '2026-11-03' },
    featured: true,
    pinned: false,
    reportUrl: null,
    why: "One of India's largest public-sector banks, with a cleaned-up balance sheet, improving return ratios, and a differentiated Middle East/Africa franchise alongside its diversified domestic book. Technically it's in a healthy weekly uptrend of higher highs and higher lows, holding an ascending trendline at a horizontal support base, with RSI momentum building. The entry sits right at that support confluence with a clearly-defined stop below the structure — a well-timed technical entry into a fundamentally improving bank.",
  },
  {
    id: 'b0d410da-8751-4d05-9723-0b07ef37d45d',
    name: 'Balrampur Chini',
    symbol: 'BALRAMCHIN',
    category: 'Mid Term',
    sector: 'Sugar',
    logoUrl: LOGO + 'BalrampurChini_3222149514_2208.png',
    buyPrice: 691,
    launchedPrice: 691,
    launchedDate: '2026-10-09',
    buyRange: '587-847',
    stopLoss: 587,
    target1: 807,
    target2: 847,
    horizon: '3-6 Months',
    currentPrice: 663.9,
    dayChangePercentage: 1.39,
    returnPercentage: -3.92,
    upsidePotential: 27.58,
    buyMore: null,
    featured: false,
    pinned: false,
    reportUrl: null,
    why: "The sugar cycle is working in its favour — domestic prices have firmed on tight supplies, and the company carries a large inventory valued well below current realisations. The transformational lever is India's first poly lactic acid bioplastics plant, now near completion, with returns sweetened by a state policy offering capital subsidy, interest subvention and tax reimbursement. The distillery business adds genuine diversification with multi-feedstock flexibility, while the ethanol blending roadmap is a live upside trigger. The balance sheet is a strength, and technically the stock broke above a multi-year resistance zone on heavy volumes and has completed a successful retest.",
  },
  {
    id: 'bdf4b24e-ecaa-4506-805e-702b62391fbf',
    name: 'Bajaj Finance',
    symbol: 'BAJFINANCE',
    category: 'Long Term',
    sector: 'Finance & Investments',
    logoUrl: LOGO + 'BajajFin_50319005561_3722.png',
    buyPrice: 978,
    launchedPrice: 978,
    launchedDate: '2026-10-07',
    buyRange: '978-1365',
    stopLoss: 808,
    target1: 1237,
    target2: 1365,
    horizon: '6-12 Months',
    currentPrice: 987.6,
    dayChangePercentage: 1.81,
    returnPercentage: 0.98,
    upsidePotential: 38.21,
    buyMore: null,
    featured: false,
    pinned: false,
    reportUrl: S3 + 'ee52600a-31a3-4889-be14-22d83fa8d373.pdf',
    why: 'The market leader in its category on both revenue and profit, with a profitability profile — return on equity, return on capital and margins — that no peer in the comparison set matches. The latest quarter extended the record, with profit growing faster than revenue, meaning operating leverage is still working. The valuation is the heart of the case: the multiple has compressed sharply over recent years while earnings kept compounding, putting the stock in its own historical strong buy zone. Consensus expects a clear earnings ramp over the next two years, with dividends rising alongside, and domestic institutions are adding.',
  },
];

/* ---------- closed ideas (single-stock/stock-ideas/past) ---------- */

export interface ClosedIdea {
  id: string;
  name: string;
  symbol: string;
  category: IdeaCategory;
  sector: string;
  logoUrl: string | null;
  tag: string | null;
  /** Price when the idea was published. */
  launchedPrice: number;
  /** Average entry, including any buy-more. */
  buyPrice: number;
  launchedAt: string; // ISO with IST offset, e.g. 2026-09-18T08:58:00+05:30
  buyMore: { price: number; at: string | null; percent: number | null } | null;
  closedPrice: number;
  closedAt: string;
  gainPercentage: number;
  /** Upside to target the research team expected at launch, %. */
  targetUpside: number | null;
  reportUrl: string | null;
  why: string | null;
  // Date-only forms for shortDate().
  launchedDate: string;
  closedDate: string;
}

/** All 48 closed ideas, newest first (snapshot of the past-ideas endpoint, 5 Nov 2026). */
export const CLOSED_IDEAS: ClosedIdea[] = (closedRaw as { ideas: Omit<ClosedIdea, 'launchedDate' | 'closedDate'>[] }).ideas.map((i) => ({
  ...i,
  launchedDate: i.launchedAt.slice(0, 10),
  closedDate: i.closedAt.slice(0, 10),
}));

/** Same rule as the official track record: a close at or above entry counts as a hit. */
export const isHit = (i: ClosedIdea) => i.gainPercentage >= 0;
export const holdingDays = (i: ClosedIdea) =>
  Math.max(1, Math.round((+new Date(i.closedAt) - +new Date(i.launchedAt)) / 86400000));
export const dateTime = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true });

/* ---------- plans (v2/single-stock/stock-plans/available, subscriptions/plans) ---------- */

export interface PlanDuration {
  months: number;
  originalPrice: number;
  price: number;
}

export interface Plan {
  id: string;
  name: string;
  tag: string;
  access: string;
  whoItsFor: string;
  whatYouGet: string[];
  durations: PlanDuration[];
}

export const STOCK_PLAN: Plan = {
  id: '77113212-0cd3-4810-af83-1dd07409ca49',
  name: 'Wealth Builder',
  tag: 'Stock ideas',
  access: 'Short, mid & long-term stock ideas',
  whoItsFor: 'Investors who want researched stock ideas with a clear entry, target and exit plan.',
  whatYouGet: [
    'Entry, 2 targets & stop-loss on every idea',
    'Short, mid & long-term ideas',
    'Full research rationale and report',
    'Exit alerts and every closed idea published',
  ],
  durations: [
    { months: 1, originalPrice: 1799, price: 1016 },
    { months: 3, originalPrice: 4999, price: 1948 },
    { months: 12, originalPrice: 19999, price: 5931 },
  ],
};

export const PORTFOLIO_PLANS: Plan[] = [
  {
    id: '0b6dbbe5-226a-4222-80fe-08f88532774b',
    name: 'Beginner Portfolio',
    tag: 'Starter',
    access: 'Beginner Portfolio',
    whoItsFor: 'New investors seeking a low-risk entry into equity markets.',
    whatYouGet: [
      'Access to the Alpha Beginner portfolio',
      'Conservative exposure to fundamentally strong companies',
      'Professional monitoring & reviews',
    ],
    durations: [
      { months: 1, originalPrice: 499, price: 253 },
      { months: 3, originalPrice: 1299, price: 508 },
      { months: 12, originalPrice: 5999, price: 1694 },
    ],
  },
  {
    id: 'f3792640-d0f8-44e3-a296-5e95f6a3dd45',
    name: 'Buy One Portfolio',
    tag: 'Basic',
    access: '1 premium portfolio',
    whoItsFor: 'Investors starting to build wealth with a focused strategy.',
    whatYouGet: [
      'Choice of one curated portfolio aligned with your goals',
      'Stability (Prime), growth (Allrounder) or high compounding (Emerging Leaders) + Alpha Beginner free',
      'Professional management & reviews',
    ],
    durations: [
      { months: 1, originalPrice: 1799, price: 1016 },
      { months: 3, originalPrice: 4999, price: 1948 },
      { months: 12, originalPrice: 19999, price: 5931 },
    ],
  },
  {
    id: '5a4b0817-3b57-443f-af02-5fb6ffa0e727',
    name: 'All Portfolios',
    tag: 'Premium',
    access: 'All premium portfolios',
    whoItsFor: 'Seasoned investors aiming to maximise opportunities.',
    whatYouGet: [
      'Full access to all portfolios',
      'Strategies from conservative to aggressive',
      'Highest compounding potential with tactical rebalancing',
    ],
    durations: [{ months: 12, originalPrice: 29999, price: 10169 }],
  },
];

/* ---------- portfolios (portfolio/basket/home -> advisedBaskets) ---------- */

export interface Portfolio {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  launchDate: string;
  strategy: string;
  idealFor: string;
  minInvestment: number;
  stockCount: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  cagr: number | null;
  absoluteReturn: number;
  imageUrl: string;
  planIds: string[];
}

export const PORTFOLIOS: Portfolio[] = [
  {
    id: '4eecff06-a8b0-4cc3-82d2-c95a16c1f375',
    slug: 'alpha-beginner',
    name: 'Alpha Beginner',
    tagline: 'Large cap with 5 - 10 stocks',
    launchDate: '1 Oct 2025',
    strategy: 'Designed for first-time equity investors who want to build confidence with a simple, stable, and low-risk equity portfolio. It focuses primarily on large-cap companies that are industry leaders with strong balance sheets, proven business models, and consistent earnings growth.',
    idealFor: 'First-time investors entering the stock market, seeking stable equity exposure with minimal complexity, who want to start small, learn, and gradually build confidence in equity investing.',
    minInvestment: 50000,
    stockCount: 9,
    riskLevel: 'Low',
    cagr: null,
    absoluteReturn: -2.92,
    imageUrl: S3 + '041337fc-c526-4c7e-8ed0-c85ab434404d.png',
    planIds: ['0b6dbbe5-226a-4222-80fe-08f88532774b', 'f3792640-d0f8-44e3-a296-5e95f6a3dd45', '5a4b0817-3b57-443f-af02-5fb6ffa0e727'],
  },
  {
    id: 'a8b53a8b-136c-4bf8-a3d1-1cfbc5ab9a01',
    slug: 'alpha-prime',
    name: 'Alpha Prime',
    tagline: 'Large cap with 25 - 30 stocks',
    launchDate: '1 Jun 2020',
    strategy: 'Focuses on high-quality, blue-chip companies that are industry leaders with consistent performance and sectoral dominance. These businesses exhibit strong earnings growth driven by structural tailwinds, high return on capital employed (ROCE), and enduring competitive advantages.',
    idealFor: 'Investors looking for stable, large-cap exposure with long-term growth potential and minimal volatility.',
    minInvestment: 250000,
    stockCount: 31,
    riskLevel: 'High',
    cagr: 9.1,
    absoluteReturn: 243.9,
    imageUrl: S3 + 'ded2cced-d025-4121-824b-09e29c0192f3.png',
    planIds: ['f3792640-d0f8-44e3-a296-5e95f6a3dd45', '5a4b0817-3b57-443f-af02-5fb6ffa0e727'],
  },
  {
    id: 'ffda90ba-7e46-483d-ae00-ba85b356eaa8',
    slug: 'alpha-allrounder',
    name: 'Alpha Allrounder',
    tagline: 'Flexi cap with 25 - 30 stocks',
    launchDate: '1 Jun 2021',
    strategy: 'This flexi-cap portfolio dynamically allocates across large, mid, and small-cap stocks based on market opportunities. The focus is on high-quality, high-growth companies that are either market leaders or fast-emerging players, with active management to capture the best risk-reward opportunities in any market condition.',
    idealFor: 'Investors seeking a diversified, actively managed portfolio with exposure across market segments for long-term wealth creation.',
    minInvestment: 250000,
    stockCount: 30,
    riskLevel: 'High',
    cagr: 16.29,
    absoluteReturn: 185.18,
    imageUrl: S3 + '814e5787-95b1-4846-97ce-a1ec77bf7623.png',
    planIds: ['f3792640-d0f8-44e3-a296-5e95f6a3dd45', '5a4b0817-3b57-443f-af02-5fb6ffa0e727'],
  },
  {
    id: 'b3b24e23-0565-456b-a051-cfa61a4f3fd5',
    slug: 'alpha-emerging-leaders',
    name: 'Alpha Emerging Leaders',
    tagline: 'Mid & small cap with 25 - 30 stocks',
    launchDate: '15 Oct 2025',
    strategy: 'Identifies high-growth mid- and small-cap businesses with the potential to scale into large-cap leaders. The approach emphasises early business leadership, lower mortality risk, and a long investment horizon to realise the full compounding potential of the company’s growth lifecycle.',
    idealFor: 'Investors with a higher risk appetite and a long-term horizon who want to back emerging market leaders in the early phases of wealth creation.',
    minInvestment: 250000,
    stockCount: 27,
    riskLevel: 'High',
    cagr: null,
    absoluteReturn: 1.4,
    imageUrl: S3 + '520004ed-ae77-4ca7-aea1-e6f78c7b66b2.png',
    planIds: ['5a4b0817-3b57-443f-af02-5fb6ffa0e727', 'f3792640-d0f8-44e3-a296-5e95f6a3dd45'],
  },
];

/* ---------- research & insights (cms/app-cms/analysis-research) ---------- */

export interface ResearchPost {
  id: string;
  title: string;
  excerpt: string;
  author: string | null;
  date: string;
  imageUrl: string | null;
  videoUrl: string | null;
}

export const RESEARCH: ResearchPost[] = [
  { id: '84789127', title: 'Why Is the Indian Stock Market Falling?', excerpt: 'The Nifty 50 was down around 0.5% on Thursday afternoon, but the broader market witnessed sharper declines, with midcap and smallcap stocks facing greater selling pressure.', author: null, date: '2026-10-22', imageUrl: S3 + '1c0bebaf-2c92-42e3-9b40-ce89fd9cd609.png', videoUrl: null },
  { id: '42774db0', title: 'Webinar: The Next Phase of Indian Equities — From Volatility to Opportunity', excerpt: 'Join Pankaj Murarka, Founder of MyAdvisorAlpha, for an exclusive discussion on the future of Indian equity markets.', author: 'Pankaj Murarka', date: '2026-10-14', imageUrl: null, videoUrl: 'https://www.youtube.com/watch?v=5kHIYaqDsv8' },
  { id: '349c4d8a', title: 'RBI Hikes Repo Rate to 5.50%: What It Means for You and the Markets', excerpt: 'The Reserve Bank of India has raised the repo rate by 25 basis points, from 5.25% to 5.50% — the first repo rate increase in nearly four years.', author: 'Rajesh Bhosale', date: '2026-10-07', imageUrl: S3 + 'd7508e23-991b-442e-abf7-e050ee9eca6f.jpg', videoUrl: null },
  { id: 'a58b6657', title: 'Chemical Stocks in Focus: Where Could the Next Big Rally Come From?', excerpt: 'In this Zee Business discussion, Pankaj Murarka shares his perspective on whether chemical stocks are entering an interesting phase for investors.', author: 'Pankaj Murarka', date: '2026-10-01', imageUrl: null, videoUrl: 'https://www.youtube.com/watch?v=iR0hVD_hxS0' },
  { id: '64f391b3', title: 'Watch Our Senior Analyst on ET NOW', excerpt: 'Our senior analyst breaks down the Nifty’s market setup and shares a technical view on HDFC Life, Mahindra & Mahindra and other actively tracked stocks.', author: null, date: '2026-09-17', imageUrl: null, videoUrl: 'https://www.youtube.com/watch?v=7SUG1POcWvI' },
  { id: '652c8347', title: 'Trading Before 9:15 AM Is Changing From September 7', excerpt: 'NSE is introducing a revised structure for the pre-open session to make opening-price discovery more systematic.', author: null, date: '2026-09-05', imageUrl: S3 + '4d033154-fc3f-495e-8335-1356e4b494eb.png', videoUrl: null },
  { id: 'a6461561', title: 'Market Shots: Metals & Financials Support Market as Realty, Pharma and Healthcare Drag', excerpt: 'Indian equities ended the session almost flat with a slight positive bias, with the Nifty 50 around 23,897.70, up 0.10%.', author: null, date: '2026-09-04', imageUrl: S3 + 'e1fc4f2c-cfde-44bc-8833-736967388236.png', videoUrl: null },
  { id: 'e0e5adbc', title: 'India Just Got a $127 Billion Boost', excerpt: 'What is FCNR? FCNR(B) is a foreign-currency fixed deposit for NRIs that stays in currencies such as USD, GBP or EUR instead of being converted into rupees.', author: null, date: '2026-09-03', imageUrl: S3 + 'dcca4141-564a-4be7-aa80-635ad6e6a583.png', videoUrl: null },
  { id: '3bf70157', title: 'CAS: The New Nightmare for F&O Traders?', excerpt: 'The Closing Auction Session was introduced in August to improve price discovery at the close, but its first month has brought another issue into focus.', author: null, date: '2026-09-02', imageUrl: S3 + '1ea506dd-0df1-458f-8c1d-2a69d0464f82.png', videoUrl: null },
  { id: '99b26957', title: 'Market Shots: IT & FMCG Cushion Losses as Financials, Pharma and Realty Drag', excerpt: 'Indian equities ended a volatile session with the Nifty 50 at 24,055.80, down 0.10%, while the underlying market was weaker.', author: null, date: '2026-09-01', imageUrl: S3 + 'b842bab2-9346-4b24-98ad-994b92bde630.png', videoUrl: null },
  { id: '23d8053a', title: 'Market Shots: Pharma & Healthcare Outperform as HDFC Bank Drags Nifty Below 24,100', excerpt: 'Indian equities ended lower on 27 August 2026, with the Nifty 50 closing at 24,090.85, down 116.90 points.', author: null, date: '2026-08-27', imageUrl: S3 + 'e1b66caa-e6ec-4a49-8d8e-64c350a2ec39.png', videoUrl: null },
  { id: '09ebbb4f', title: 'Market Shots: Nifty Snaps 7-Day Losing Streak as Media and Realty Lead Recovery', excerpt: 'Indian equities staged a broad recovery on 20 August 2026, with the Nifty 50 closing at 24,231.85, up 153.55 points.', author: null, date: '2026-08-20', imageUrl: S3 + '77d3e9c9-fcc8-4370-bae8-906aafe21c75.png', videoUrl: null },
];

/* ---------- reviews & partners (cms/app-cms/reviews, partnerships) ---------- */

export const APP_REVIEWS = [
  { name: 'Ayush', text: "Replaced my scattered investment approach with MyAdvisorAlpha. Now everything's centralized and well-researched. Returns improved, stress reduced." },
  { name: 'Sanjaya Pradhan', text: 'Excellent app for stock market and mutual fund learning. The interface is clean, easy to use, and very informative.' },
  { name: 'Shubra Agarwal', text: "Choosing MyAdvisorAlpha has been one of my best financial decisions. The growth, consistency, and trust I've experienced is a proof of the team’s excellent fund management." },
  { name: 'Ritu Poddar', role: 'Product Head, Nirmal Bang', text: 'I tried the AdvisorAlpha platform and found the overall journey to be extremely smooth and intuitive.' },
  { name: 'Rishabh', text: 'At first I was cautious, but after seeing how steadily my portfolio kept compounding, I only wish I had invested earlier.' },
] as Array<{ name: string; role?: string; text: string }>;

export const PARTNERS = [
  { name: 'Motilal Oswal Financial Services', logo: S3 + 'ea2622ff-db92-4cca-89e3-50d5945c0270.png' },
  { name: 'Prudent', logo: S3 + '7509a470-e65a-4384-96dd-0e064a418f1c.png' },
  { name: 'Mirae Asset (m.Stock)', logo: S3 + 'e4d4213e-6d2e-48b0-90dc-5e9a16728835.png' },
  { name: 'Anand Rathi', logo: S3 + '31e3ffb6-7e15-48bc-a9a0-38e12aa1b908.jpg' },
];

/* ---------- links (cms/app-cms/settings) ---------- */

export const APP_LINKS = {
  helpSupport: 'https://support.advisoralpha.in/support/tickets/new',
  faq: 'https://support.advisoralpha.in/support/home',
  portfolioHelp: 'https://support.advisoralpha.in/support/solutions/1130000031305',
  appStore: 'https://apps.apple.com/in/app/advisoralpha-stocks-mf/id6749932451',
  playStore: 'https://play.google.com/store/apps/details?id=com.renaissance.advisoralpha&hl=en_IN',
  stockCheckout: 'https://link.advisoralpha.in/nav?page=payment&plan_id=77113212-0cd3-4810-af83-1dd07409ca49&plan_type=stocks&action=subscribe',
  portfolioCheckout: (planId: string) => `https://link.advisoralpha.in/nav?page=payment&plan_id=${planId}&plan_type=portfolio&action=subscribe`,
};

/* ---------- futures (NEW product; no API yet) ----------
 * Sample calls from the Advisory tab design (AdvisoryTabDesign.html).
 * The current web app has no futures endpoint, so these are not live data. */

export interface FuturesCall {
  id: string;
  name: string;
  contract: string;
  kind: 'Index' | 'Stock';
  side: 'LONG' | 'SHORT';
  ltp: number;
  chgPct: number;
  entry: number;
  target: number;
  stopLoss: number;
  lot: number;
  marginPct: number;
  expiry: string;
  duration: string;
  posted: string;
  thesis: string;
  points: string[];
}

export const FUTURES: FuturesCall[] = [
  { id: 'nifty', name: 'NIFTY 50', contract: 'NIFTY 27 OCT FUT', kind: 'Index', side: 'LONG', ltp: 25842.4, chgPct: 0.37, entry: 25780, target: 26400, stopLoss: 25560, lot: 65, marginPct: 0.12, expiry: '27 Oct', duration: 'Till expiry', posted: '2026-10-06',
    thesis: 'NIFTY has held its 50-day average through three retests and breadth is improving, with advances leading declines for six sessions. FII short positions in index futures are at a two-month high, which leaves room for short covering into the October expiry.',
    points: ['Higher low above 25,500 support zone', 'FII index-futures longs-to-shorts ratio turning up', 'Defined risk: stop loss 0.85% below entry'] },
  { id: 'reliance', name: 'Reliance', contract: 'RELIANCE 27 OCT FUT', kind: 'Stock', side: 'LONG', ltp: 1412.3, chgPct: 0.63, entry: 1398, target: 1485, stopLoss: 1372, lot: 500, marginPct: 0.18, expiry: '27 Oct', duration: '1-3 Weeks', posted: '2026-10-05',
    thesis: 'Price has broken out of a six-week range on rising open interest, which points to fresh long positions rather than short covering. Retail and O2C earnings next week are the near-term trigger.',
    points: ['Range breakout above ₹1,395 on 1.6x average volume', 'Open interest up 11% with price', 'Stop loss below breakout base at ₹1,372'] },
  { id: 'tatasteel', name: 'Tata Steel', contract: 'TATASTEEL 27 OCT FUT', kind: 'Stock', side: 'SHORT', ltp: 158.42, chgPct: -0.85, entry: 160.5, target: 150, stopLoss: 164, lot: 5500, marginPct: 0.2, expiry: '27 Oct', duration: '1-2 Weeks', posted: '2026-10-06',
    thesis: 'A short call: steel spreads are under pressure as Chinese export volumes rise, and price has slipped below its 20-day average with open interest building on the way down — a sign of new short positions.',
    points: ['Lower high below ₹164 resistance', 'Open interest rising as price falls', 'Stop loss above resistance at ₹164'] },
];

export interface ClosedFutures {
  id: string;
  name: string;
  contract: string;
  side: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  lot: number;
  openedOn: string;
  closedOn: string;
  days: number;
}

export const CLOSED_FUTURES: ClosedFutures[] = [
  { id: 'bnf', name: 'Bank Nifty', contract: 'BANKNIFTY 25 AUG FUT', side: 'LONG', entry: 55120, exit: 56380, lot: 30, openedOn: '2026-08-04', closedOn: '2026-08-21', days: 17 },
  { id: 'infy', name: 'Infosys', contract: 'INFY 29 SEP FUT', side: 'SHORT', entry: 1542, exit: 1486, lot: 400, openedOn: '2026-09-08', closedOn: '2026-09-17', days: 9 },
  { id: 'sbin', name: 'State Bank of India', contract: 'SBIN 29 SEP FUT', side: 'LONG', entry: 842, exit: 821, lot: 750, openedOn: '2026-09-14', closedOn: '2026-09-18', days: 4 },
  { id: 'hdfcbank', name: 'HDFC Bank', contract: 'HDFCBANK 25 AUG FUT', side: 'LONG', entry: 972, exit: 1004, lot: 550, openedOn: '2026-08-06', closedOn: '2026-08-18', days: 12 },
  { id: 'maruti', name: 'Maruti Suzuki', contract: 'MARUTI 29 SEP FUT', side: 'SHORT', entry: 12880, exit: 13120, lot: 50, openedOn: '2026-09-22', closedOn: '2026-09-25', days: 3 },
];

export const futuresReturn = (f: { side: 'LONG' | 'SHORT'; entry: number }, price: number) =>
  ((price - f.entry) / f.entry) * 100 * (f.side === 'LONG' ? 1 : -1);

/* ---------- MTF baskets (NEW product; no API yet) ----------
 * Sample baskets from the Advisory tab design. Stocks the design left as
 * placeholders keep their placeholder symbol so it is obvious what to replace. */

export const MTF_LEVERAGE = 4;

export interface MtfStock {
  sym: string;
  entry: number;
  cmp: number;
  target?: number;
  sl?: number;
}

export interface MtfBasket {
  id: string;
  name: string;
  posted: string;
  days: number;
  featured?: boolean;
  targetPct: number;
  stopLossPct: number;
  stocks: MtfStock[];
  thesis: string;
  points: string[];
}

export const MTF_BASKETS: MtfBasket[] = [
  { id: 'capex', name: 'Capex & Defence Momentum', posted: '2026-09-22', days: 14, targetPct: 21.26, stopLossPct: 13.25,
    stocks: [{ sym: 'BHEL', entry: 428, cmp: 452 }, { sym: 'INDHOTEL', entry: 735, cmp: 736 }, { sym: 'BEL', entry: 392, cmp: 386 }],
    thesis: 'Capex and defence spending is lifting order books for power and defence equipment makers. This basket rides that momentum, with a hotel stock adding a consumption leg.',
    points: ['Order inflows building across power and defence', 'Hotel demand balances the capex tilt', 'Defined target and stop loss for every stock'] },
  { id: 'pvtbank', name: 'Private Bank Rebound', posted: '2026-09-30', days: 6, targetPct: 20.1, stopLossPct: 13.68,
    stocks: [{ sym: '[STOCK A]', entry: 1250, cmp: 1255 }, { sym: '[STOCK B]', entry: 2000, cmp: 1982 }, { sym: '[STOCK C]', entry: 2000, cmp: 1998 }],
    thesis: 'Private banks have lagged the broader market while credit growth stays steady. The basket bets on a catch-up move from here.',
    points: ['Valuations below recent averages', 'Steady loan growth and stable asset quality', 'Tight stop loss if the sector keeps lagging'] },
  { id: 'pharma', name: 'Pharma Breakout', posted: '2026-10-06', days: 9, featured: true, targetPct: 20, stopLossPct: 13,
    stocks: [{ sym: '[STOCK D]', entry: 1000, cmp: 1084, target: 1080 }, { sym: '[STOCK E]', entry: 1500, cmp: 1512, target: 1620 }, { sym: '[STOCK F]', entry: 600, cmp: 597, target: 648 }],
    thesis: 'Pharma names are breaking out of a long sideways range on rising volumes, backed by steady export demand.',
    points: ['Price breakout above multi-month resistance', 'Volumes confirming the move', 'Defensive sector that tends to hold up in weak markets'] },
  { id: 'it', name: 'IT Reversal', posted: '2026-10-08', days: 7, targetPct: 20, stopLossPct: 13,
    stocks: [{ sym: '[STOCK G]', entry: 1200, cmp: 1140, target: 1296, sl: 1150 }, { sym: '[STOCK H]', entry: 900, cmp: 909, target: 972, sl: 860 }, { sym: '[STOCK I]', entry: 1600, cmp: 1608, target: 1728, sl: 1530 }],
    thesis: 'IT stocks have corrected sharply and are showing early signs of a turn as deal wins pick up.',
    points: ['Oversold after a steep correction', 'Improving deal pipeline commentary', 'Tight stop loss, since reversals can fail'] },
];

export interface ClosedMtfBasket {
  id: string;
  name: string;
  posted: string;
  closed: string;
  days: number;
  outcome: 'target' | 'sl' | 'closed';
  stocks: { sym: string; entry: number; exit: number }[];
  thesis: string;
  points: string[];
}

export const CLOSED_MTF_BASKETS: ClosedMtfBasket[] = [
  { id: 'auto', name: 'Auto Ancillary Rally', posted: '2026-09-01', closed: '2026-09-19', days: 18, outcome: 'target',
    stocks: [{ sym: '[STOCK J]', entry: 800, exit: 872 }, { sym: '[STOCK K]', entry: 1100, exit: 1166 }, { sym: '[STOCK L]', entry: 450, exit: 474 }],
    thesis: 'Auto component makers were set to benefit from strong vehicle sales ahead of the festive season.',
    points: ['Festive-season demand tailwind', 'Margin recovery as input costs eased', 'Closed at basket target'] },
  { id: 'metals', name: 'Metals Bounce', posted: '2026-08-25', closed: '2026-09-04', days: 10, outcome: 'sl',
    stocks: [{ sym: '[STOCK M]', entry: 650, exit: 620 }, { sym: '[STOCK N]', entry: 1400, exit: 1360 }, { sym: '[STOCK O]', entry: 300, exit: 290 }],
    thesis: 'Metal stocks looked set to bounce after a sharp fall, on hopes of firmer global prices.',
    points: ['Oversold after a steep fall', 'Bet on firmer global metal prices', 'Closed at stop loss when the bounce failed'] },
  { id: 'fmcg', name: 'FMCG Defensive', posted: '2026-08-11', closed: '2026-09-08', days: 28, outcome: 'closed',
    stocks: [{ sym: '[STOCK P]', entry: 2400, exit: 2436 }, { sym: '[STOCK Q]', entry: 520, exit: 515 }, { sym: '[STOCK R]', entry: 1300, exit: 1318 }],
    thesis: 'FMCG stocks offered a defensive position while the broader market was choppy.',
    points: ['Steady demand in uncertain markets', 'Low volatility relative to the index', 'Closed by the advisor near the end of the holding period'] },
];

/* ---------- "What you get" per product (from the design) ---------- */

export const PRODUCT_FEATURES: Record<'stocks' | 'portfolios' | 'futures' | 'mtf', { title: string; body: string }[]> = {
  stocks: [
    { title: 'High-conviction single stock picks', body: 'Every idea carries full rationale, entry range, targets, stop loss and exit alerts.' },
    { title: 'SQGARP™ screened', body: 'One framework. Every stock & portfolio decision. Zero exceptions.' },
    { title: 'Alerts that matter', body: 'Target hit, stop loss breach and revision notes pushed the moment research changes.' },
  ],
  portfolios: [
    { title: 'Ready-made model portfolios', body: 'A set of stocks chosen and weighted by our research team, built to be held together.' },
    { title: 'Rebalance updates', body: 'Add, trim and exit calls when the research team changes the portfolio.' },
    { title: 'SQGARP™ screened', body: 'Every stock in a portfolio passes the same framework as our single stock picks.' },
  ],
  futures: [
    { title: 'Long and short futures calls', body: 'Index and stock futures ideas with entry, target, stop loss and expiry on every call.' },
    { title: 'Risk sized per lot', body: 'See margin and the loss at stop loss for each lot before you place the order.' },
    { title: 'Exit and roll-over alerts', body: 'Target hit, stop loss breach, exit calls and roll-over notes before expiry.' },
  ],
  mtf: [
    { title: '3-stock MTF baskets', body: 'Short-term baskets designed for margin trading, with the leverage shown on every card.' },
    { title: 'Basket target and stop loss', body: 'One target and one stop loss for the whole basket, tracked against your capital.' },
    { title: 'Exit advised per stock', body: 'Flags a stock the moment it hits its own target or stop loss; the rest of the basket stays open.' },
  ],
};

/* ---------- helpers ---------- */

export function findIdea(symbol: string): StockIdea | undefined {
  return LIVE_IDEAS.find((i) => i.symbol.toLowerCase() === symbol.toLowerCase());
}

export function findPortfolio(slug: string): Portfolio | undefined {
  return PORTFOLIOS.find((p) => p.slug === slug);
}

export function inBuyRange(idea: StockIdea): boolean {
  if (!idea.buyRange) return idea.currentPrice <= idea.target1 && idea.currentPrice > idea.stopLoss;
  const [lo, hi] = idea.buyRange.split('-').map(Number);
  return idea.currentPrice >= lo && idea.currentPrice <= hi;
}

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
export const price = (n: number) => `₹${inr.format(n)}`;
export const rupees = (n: number) => `₹${new Intl.NumberFormat('en-IN').format(n)}`;
export const pct = (n: number, signed = true) => `${signed && n > 0 ? '+' : ''}${n.toFixed(2)}%`;
export const shortDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const monthsLabel = (m: number) => (m === 12 ? '12 months' : m === 1 ? '1 month' : `${m} months`);
