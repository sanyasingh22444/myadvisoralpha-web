import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mutual Funds | MyAdvisorAlpha',
  description:
    'Invest in equity, debt and gold mutual funds through handpicked, goal-based baskets on MyAdvisorAlpha. AMFI registered (ARN-350887), powered by ONDC, SIPs from ₹500.',
  alternates: {
    canonical: '/mutual-funds',
  },
};

export default function MutualFundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
