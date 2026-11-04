export type Product = 'stocks' | 'portfolios' | 'futures' | 'mtf';

export const PRODUCTS: { id: Product; label: string; isNew?: boolean }[] = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'portfolios', label: 'Portfolios' },
  { id: 'futures', label: 'Futures', isNew: true },
  { id: 'mtf', label: 'MTF Baskets', isNew: true },
];
