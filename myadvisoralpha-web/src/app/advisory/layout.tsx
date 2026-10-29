import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advisory | MyAdvisorAlpha',
  description:
    'SEBI-registered research advisory (INH000021818) led by Pankaj Murarka, former CIO of Axis Mutual Fund. Stock ideas with entry, target and stop-loss, portfolios, and soon MTF baskets and futures.',
  alternates: {
    canonical: '/advisory',
  },
};

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
