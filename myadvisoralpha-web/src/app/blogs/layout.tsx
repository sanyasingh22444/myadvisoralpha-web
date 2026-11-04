import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs & Market Insights | MyAdvisorAlpha',
  description:
    'Research notes, market insights and investing explainers from the MyAdvisorAlpha SEBI-registered research team.',
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
