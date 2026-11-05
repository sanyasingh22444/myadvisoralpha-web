/**
 * Market snapshot for the Markets screen (/app/markets).
 *
 * Taken from NSE live data on 5 Nov 2026 at 10:56 AM IST (market open).
 * `open` vs `prevClose` gives the pre-open (opening gap) picture; `ltp` vs `open`
 * gives the session so far. Post-market (closing session) numbers only exist after
 * 3:30 PM, so they are not in this snapshot. Wire these to a live feed later.
 */

export const MARKET_AS_OF = '10:56 AM, 5 Nov 2026';
export const MARKET_DATE = '2026-11-05';

export interface IndexQuote {
  name: string;
  short: string;
  ltp: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
}

export const HEADLINE_INDICES: IndexQuote[] = [
  { name: 'NIFTY 50', short: 'Nifty 50', ltp: 24364.35, prevClose: 23960.6, open: 24378.05, high: 24442.2, low: 24296.3 },
  { name: 'NIFTY BANK', short: 'Bank Nifty', ltp: 57048.7, prevClose: 55913.6, open: 57102.8, high: 57139.7, low: 56718.2 },
  { name: 'NIFTY FIN SERVICE', short: 'Fin Nifty', ltp: 26266.65, prevClose: 25580.6, open: 26166.35, high: 26317.75, low: 26052.4 },
  { name: 'NIFTY NEXT 50', short: 'Nifty Next 50', ltp: 71750.1, prevClose: 70795.0, open: 71669.25, high: 71875.1, low: 71378.0 },
  { name: 'NIFTY MIDCAP 100', short: 'Midcap 100', ltp: 60422.5, prevClose: 59505.5, open: 60414.65, high: 60497.4, low: 60074.15 },
  { name: 'NIFTY SMLCAP 100', short: 'Smallcap 100', ltp: 19216.05, prevClose: 19026.4, open: 19298.4, high: 19306.35, low: 19157.75 },
  { name: 'INDIA VIX', short: 'India VIX', ltp: 15.2, prevClose: 15.19, open: 15.19, high: 15.5, low: 11.62 },
];

/** Sector indices; `key` links our live stock ideas to a sector. */
export interface SectorQuote extends IndexQuote {
  key: string;
}

export const SECTORS: SectorQuote[] = [
  { key: 'auto', name: 'NIFTY AUTO', short: 'Auto', ltp: 27353.15, prevClose: 26504.8, open: 26968.75, high: 27372.6, low: 26892.2 },
  { key: 'fin', name: 'NIFTY FIN SERVICE', short: 'Financial Services', ltp: 26266.65, prevClose: 25580.6, open: 26166.35, high: 26317.75, low: 26052.4 },
  { key: 'cement', name: 'NIFTY CEMENT', short: 'Cement', ltp: 14412.7, prevClose: 14022.6, open: 14277.25, high: 14492.35, low: 14270.4 },
  { key: 'it', name: 'NIFTY IT', short: 'IT', ltp: 32817.3, prevClose: 32061.9, open: 32589.9, high: 33124.7, low: 32465.1 },
  { key: 'pvtbank', name: 'NIFTY PVT BANK', short: 'Private Banks', ltp: 28225.7, prevClose: 27632.3, open: 28300.3, high: 28302.2, low: 28005.3 },
  { key: 'realty', name: 'NIFTY REALTY', short: 'Realty', ltp: 880.6, prevClose: 865.4, open: 881.5, high: 886.85, low: 875.6 },
  { key: 'psubank', name: 'NIFTY PSU BANK', short: 'PSU Banks', ltp: 8439.8, prevClose: 8302.3, open: 8430.1, high: 8457.0, low: 8399.6 },
  { key: 'durables', name: 'NIFTY CONSR DURBL', short: 'Consumer Durables', ltp: 37091.1, prevClose: 36521.45, open: 37078.8, high: 37212.4, low: 36849.65 },
  { key: 'metal', name: 'NIFTY METAL', short: 'Metal', ltp: 12610.0, prevClose: 12485.9, open: 12643.9, high: 12679.45, low: 12576.55 },
  { key: 'pharma', name: 'NIFTY PHARMA', short: 'Pharma', ltp: 27536.7, prevClose: 27333.45, open: 27470.1, high: 27586.65, low: 27135.9 },
  { key: 'health', name: 'NIFTY HEALTHCARE', short: 'Healthcare', ltp: 16769.05, prevClose: 16701.55, open: 16783.4, high: 16834.45, low: 16573.05 },
  { key: 'oilgas', name: 'NIFTY OIL AND GAS', short: 'Oil & Gas', ltp: 11216.95, prevClose: 11178.2, open: 11351.2, high: 11357.6, low: 11202.45 },
  { key: 'media', name: 'NIFTY MEDIA', short: 'Media', ltp: 1715.7, prevClose: 1710.65, open: 1730.95, high: 1745.5, low: 1710.65 },
  { key: 'fmcg', name: 'NIFTY FMCG', short: 'FMCG', ltp: 46344.75, prevClose: 46264.05, open: 46859.3, high: 46970.95, low: 46307.25 },
  { key: 'chem', name: 'NIFTY CHEMICALS', short: 'Chemicals', ltp: 27838.35, prevClose: 27833.7, open: 28159.3, high: 28172.0, low: 27782.0 },
];

/** Today's quotes for our live stock ideas (same symbols as LIVE_IDEAS in data/app.ts). */
export interface IdeaQuote {
  symbol: string;
  sector: string | null; // SECTORS key, or null when no sector index fits
  ltp: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
}

export const IDEA_QUOTES: IdeaQuote[] = [
  { symbol: 'NAUKRI', sector: null, ltp: 1206.5, prevClose: 1170.5, open: 1182.2, high: 1207.3, low: 1182.2 },
  { symbol: 'DLF', sector: 'realty', ltp: 732.35, prevClose: 720.0, open: 733.0, high: 735.55, low: 725.2 },
  { symbol: 'COFORGE', sector: 'it', ltp: 2090.2, prevClose: 2060.0, open: 2089.0, high: 2119.0, low: 2070.2 },
  { symbol: 'ETERNAL', sector: null, ltp: 356.1, prevClose: 344.5, open: 350.0, high: 358.75, low: 345.5 },
  { symbol: 'GLAND', sector: 'pharma', ltp: 3184.4, prevClose: 3159.0, open: 3170.0, high: 3208.6, low: 3101.3 },
  { symbol: 'MOTILALOFS', sector: 'fin', ltp: 1085.3, prevClose: 1013.0, open: 1037.45, high: 1087.0, low: 1032.65 },
  { symbol: 'AJANTPHARM', sector: 'pharma', ltp: 3323.7, prevClose: 3316.7, open: 3340.0, high: 3350.0, low: 3305.1 },
  { symbol: 'FEDERALBNK', sector: 'pvtbank', ltp: 336.2, prevClose: 335.2, open: 338.5, high: 338.75, low: 331.15 },
  { symbol: 'PHOENIXLTD', sector: 'realty', ltp: 2091.0, prevClose: 2079.5, open: 2118.0, high: 2121.0, low: 2071.3 },
  { symbol: 'BANKBARODA', sector: 'psubank', ltp: 249.9, prevClose: 245.37, open: 249.0, high: 250.4, low: 246.63 },
  { symbol: 'BALRAMCHIN', sector: null, ltp: 684.75, prevClose: 673.65, open: 680.4, high: 691.4, low: 666.0 },
  { symbol: 'BAJFINANCE', sector: 'fin', ltp: 1043.8, prevClose: 994.0, open: 1020.0, high: 1049.85, low: 1020.0 },
];

export const pctChange = (to: number, from: number) => ((to - from) / from) * 100;

/** Opening gap classification used by the pre-market breakup (±0.25% counts as flat). */
export function gapOf(q: { open: number; prevClose: number }): 'up' | 'down' | 'flat' {
  const g = pctChange(q.open, q.prevClose);
  return g > 0.25 ? 'up' : g < -0.25 ? 'down' : 'flat';
}
