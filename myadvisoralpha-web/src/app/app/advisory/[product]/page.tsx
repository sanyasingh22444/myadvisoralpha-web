import { notFound } from 'next/navigation';
import AdvisoryView from '@/components/app/advisory/AdvisoryView';
import { PRODUCTS, type Product } from '@/components/app/advisory/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ product: p.id }));
}

export default function AdvisoryPage({ params }: { params: { product: string } }) {
  if (!PRODUCTS.some((p) => p.id === params.product)) notFound();
  return <AdvisoryView product={params.product as Product} />;
}
