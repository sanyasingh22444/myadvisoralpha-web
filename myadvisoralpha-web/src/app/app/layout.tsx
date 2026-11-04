import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import AppShell from '@/components/app/AppShell';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-app' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-app-mono' });

export const metadata: Metadata = {
  title: 'MyAdvisorAlpha App',
  description: 'Your stock ideas, portfolios, futures, MTF baskets and mutual funds in one place.',
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.variable} ${plexMono.variable} app-root`}>
      <AppShell>{children}</AppShell>
    </div>
  );
}
