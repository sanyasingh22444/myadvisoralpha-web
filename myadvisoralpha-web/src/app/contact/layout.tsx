import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | MyAdvisorAlpha',
  description:
    'Reach the MyAdvisorAlpha advisory desk by phone, email or WhatsApp for questions about stock advisory, model portfolios and mutual funds.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
