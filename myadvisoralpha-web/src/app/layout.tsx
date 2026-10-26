import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BRAND_INFO } from '@/data/brand';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: `${BRAND_INFO.name} | ${BRAND_INFO.subtagline}`,
  description: `${BRAND_INFO.tagline} Backed by ${BRAND_INFO.metrics.researchExperience} of research experience and Founder & CIO Pankaj Murarka (Ex-CIO Axis AMC). SEBI Registered RA: ${BRAND_INFO.sebiRegNo}.`,
  keywords: [
    'MyAdvisorAlpha',
    'Advisor Alpha',
    'Pankaj Murarka',
    'SEBI Registered Research Analyst',
    'Stock Advisory India',
    'Model Portfolios',
    'Mutual Funds SIP',
    'Institutional Advisory',
    'INH000021818',
    'SQGARP investment',
  ],
  authors: [{ name: BRAND_INFO.founder.name }, { name: BRAND_INFO.legalEntity }],
  creator: BRAND_INFO.legalEntity,
  publisher: BRAND_INFO.legalEntity,
  metadataBase: new URL('https://myadvisoralpha.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${BRAND_INFO.name} | ${BRAND_INFO.subtagline}`,
    description: BRAND_INFO.tagline,
    url: 'https://myadvisoralpha.com',
    siteName: BRAND_INFO.brandDisplayName,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_INFO.name} | ${BRAND_INFO.subtagline}`,
    description: BRAND_INFO.tagline,
    creator: '@AdvisorAlpha_',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#010101',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#010101] text-white antialiased selection:bg-[#0066f5] selection:text-white flex flex-col">
        {/* Skip to Main Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0066f5] focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        {/* Global Sticky Navbar Shell */}
        <Navbar />

        {/* Dynamic Page Views */}
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Regulatory Footer */}
        <Footer />
      </body>
    </html>
  );
}
