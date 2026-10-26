export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'offerings' | 'compliance' | 'pricing';
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'offerings',
    question: 'What services does MyAdvisorAlpha offer?',
    answer: 'MyAdvisorAlpha offers three primary regulated solutions: (1) Single Stock Advisory featuring high-conviction ideas across short, mid, and long horizons with explicit entry, stop-loss, and multi-tier profit targets; (2) Curated Model Portfolios aligned to conservative, balanced, all-weather, and aggressive goals; and (3) Goal-based Mutual Fund Baskets distributed via our registered AMFI MFD license (ARN-350887).',
  },
  {
    id: 'faq-2',
    category: 'compliance',
    question: 'Is MyAdvisorAlpha SEBI and AMFI registered?',
    answer: 'Yes. We operate under Renaissance Smart Tech Private Limited, holding SEBI Research Analyst registration number INH000021818 (perpetual validity granted July 14, 2025), BSE Enlistment number 6793, and AMFI Mutual Fund Distributor registration ARN-350887. All research adheres strictly to SEBI (Research Analysts) Regulations, 2014.',
  },
  {
    id: 'faq-3',
    category: 'general',
    question: 'What is the SQGARP™ investment framework?',
    answer: 'SQGARP™ stands for Sustainable Quality Growth at Reasonable Price. Honed over 30+ years of institutional fund management by our Founder & CIO Pankaj Murarka (Ex-CIO Axis AMC $5B AUM), this proprietary framework evaluates businesses on durability of moat, management integrity, high return on equity (ROE > 18%), structural growth tailwinds, and strict margin of safety at valuation.',
  },
  {
    id: 'faq-4',
    category: 'offerings',
    question: 'Can I execute recommendations using my existing stockbroker?',
    answer: 'Absolutely. MyAdvisorAlpha is an independent research and advisory platform. We never hold custody of your capital or equities. You retain 100% control of your funds in your existing Demat account with any leading broker in India, including Zerodha, Groww, Angel One, ICICI Direct, HDFC Sky, Upstox, and Kotak Securities.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'What is the refund and subscription cancellation policy?',
    answer: 'All subscriptions and cancellations comply strictly with applicable SEBI guidelines and our Most Important Terms & Conditions (MITC). You can manage or cancel auto-renewal anytime from within the web portal (web.advisoralpha.in) or mobile app settings without hidden cancellation fees.',
  },
  {
    id: 'faq-6',
    category: 'offerings',
    question: 'How are stock ideas delivered to subscribers?',
    answer: 'Stock recommendations are published directly to the web portal (web.advisoralpha.in) and mobile apps with instant push alerts and WhatsApp notifications. Each recommendation details the exact entry price range, Target 1, Target 2, Target 3, strict Stop-Loss, and full institutional rationale.',
  },
  {
    id: 'faq-7',
    category: 'pricing',
    question: 'What is the minimum capital required to get started?',
    answer: 'For Single Stock Advisory, you can start with as little as ₹10,000–₹25,000. For Equity Model Portfolios, the Beginner Portfolio requires a minimum capital of ₹50,000, while the Balanced and Flexicap portfolios recommend ₹1,00,000 to ₹2,50,000 for optimal diversification across 25–30 stocks. For Mutual Funds, SIPs start at just ₹2,000/month.',
  },
  {
    id: 'faq-8',
    category: 'offerings',
    question: 'How does portfolio rebalancing work?',
    answer: 'Our research team continuously monitors all portfolio constituents. When earnings fundamentals shift or target valuations are achieved, we dispatch a rebalancing notification. Subscribers can review the recommended changes and execute the batch trades with 1-tap via their connected broker.',
  },
  {
    id: 'faq-9',
    category: 'pricing',
    question: 'Are there any profit-sharing fees or hidden commissions on stocks?',
    answer: 'Zero. We operate on a transparent, flat fee-only subscription model. We do not charge profit-sharing fees, nor do we take commissions from brokers on stock transactions. This completely eliminates conflicts of interest and aligns our incentives purely with your portfolio success.',
  },
  {
    id: 'faq-10',
    category: 'compliance',
    question: 'How do I reach client support or escalate a grievance?',
    answer: 'You can contact our support team at support@myadvisoralpha.com or call +91 8655387833 (9 AM – 6 PM Mon–Fri). For formal escalations, we adhere to a 5-tier redressal matrix headed by our Compliance Officer Ms. Nidhi Kamani and Principal Officer Mr. Nipun Jalan, with external recourse to SEBI SCORES (scores.sebi.gov.in) and the Smart ODR portal.',
  },
];
