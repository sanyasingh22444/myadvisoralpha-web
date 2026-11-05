import { notFound } from 'next/navigation';
import PortfolioDetailView from '@/components/app/portfolio/PortfolioDetailView';
import { PORTFOLIOS } from '@/data/app';

export function generateStaticParams() {
  return PORTFOLIOS.map((p) => ({ slug: p.slug }));
}

export default function PortfolioPage({ params }: { params: { slug: string } }) {
  if (!PORTFOLIOS.some((p) => p.slug === params.slug)) notFound();
  return <PortfolioDetailView slug={params.slug} />;
}
