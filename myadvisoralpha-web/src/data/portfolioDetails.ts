/**
 * Full portfolio details (about, allocations, attributes, stock list, performance vs benchmark).
 * Snapshot of api.advisoralpha.in/portfolio/basket/details/{id} and
 * /performance-compare/{id}?timeframe=… taken on 5 Nov 2026. Each performance series is
 * thinned to at most 60 points. Refresh with scratchpad/fetch-portfolios.mjs or wire to the API.
 */
import raw from './portfolio-details.json';

export type Timeframe = '1M' | '3M' | '6M' | '1Y' | '3Y' | 'ALL';
export const TIMEFRAMES: Timeframe[] = ['1M', '3M', '6M', '1Y', '3Y', 'ALL'];

export type Point = [string, number]; // [YYYY-MM-DD, NAV]

export interface PortfolioDetail {
  id: string;
  name: string;
  tagline: string;
  inceptionDate: string;
  sinceInception: string;
  absoluteReturn: number | null;
  cagr: number | null;
  minInvestment: number | null;
  stockCount: number;
  riskLevel: string;
  idealFor: string;
  about: string;
  features: string[];
  factsheetUrl: string | null;
  risk: { sharpe: number | null; alpha: number | null; beta: number | null; stdDev: number | null; pe: number | null; pb: number | null; note: string };
  mcapAllocation: { category: string; percent: number; stocks: number }[];
  sectorAllocation: { sector: string; percent: number; stocks: number }[];
  stocks: { symbol: string; name: string; weight: number; sector: string; mcap: string | null; ltp: number | null; logo: string | null }[];
  benchmark: string;
  performance: Record<Timeframe, { portfolio: Point[]; benchmark: Point[] }>;
}

const data = raw as unknown as { fetchedAt: string; portfolios: Record<string, PortfolioDetail> };

export const PORTFOLIO_DETAILS_AS_OF = data.fetchedAt.slice(0, 10);

export function getPortfolioDetail(slug: string): PortfolioDetail | undefined {
  return data.portfolios[slug];
}

/** Return over a series, in %. */
export function seriesReturn(s: Point[]): number | null {
  if (s.length < 2 || !s[0][1]) return null;
  return (s[s.length - 1][1] / s[0][1] - 1) * 100;
}

/** A risk number of 0 or null from the API means "not available yet". */
export const metric = (v: number | null, digits = 2) => (v === null || v === 0 ? '–' : v.toFixed(digits));

/** "First-time investors. Individuals seeking…" → bullet list. */
export const toBullets = (text: string) => text.split(/\.\s+|\n+/).map((s) => s.trim().replace(/\.$/, '')).filter(Boolean);

/** Strip the "Launch date: …" and "Investment Strategy:" lead-ins the API puts in the about text. */
export const cleanAbout = (text: string) =>
  text.replace(/^Launch date:[^\n]*\n+/i, '').replace(/^Investment Strategy:\s*/i, '').trim();
