import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mutual Funds | MyAdvisorAlpha',
  description:
    'Invest in handpicked direct mutual funds through goal-based baskets on MyAdvisorAlpha. AMFI registered (ARN-350887), invested via ONDC, SIPs from ₹500.',
  alternates: {
    canonical: '/mutual-funds',
  },
};

export default function MutualFundsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
