import React from 'react';
import type { Metadata } from 'next';
import FaqsClient from './FaqsClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQs) | MyAdvisorAlpha',
  description:
    'Comprehensive answers regarding MyAdvisorAlpha SEBI Research Analyst registration (INH000021818), SQGARP™ framework, stock picks, model portfolios, ONDC mutual funds, broker execution, and pricing.',
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQs) | MyAdvisorAlpha',
    description:
      'Clear, transparent answers about our SEBI-registered advisory offerings, research methodology, execution on your broker, and compliance disclosures.',
    url: 'https://myadvisoralpha.com/faqs',
    siteName: 'MyAdvisorAlpha',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function FaqsPage() {
  return <FaqsClient />;
}
