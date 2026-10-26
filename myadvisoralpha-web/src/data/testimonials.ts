export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  rating: number;
  headline: string;
  quote: string;
  verifiedBadge: boolean;
  portfolioCategory: 'Stocks' | 'Portfolios' | 'Mutual Funds';
  date: string;
}

export const TESTIMONIALS_RATING_PROOF = {
  averageRating: 4.9,
  ratingDisplay: '4.9',
  totalReviews: '1,000+ Verified Investors',
  appStoreRating: '4.9 / 5.0 Rating',
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Vikramaditya Sengupta',
    role: 'VP – Engineering',
    location: 'Bengaluru',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'No more confusing stock tips — pure institutional trade clarity!',
    quote: 'Before Advisor Alpha, my Demat account was a chaotic junkyard of random tips. Switching to their Single Stock Advisory gave me disciplined trade signals, exact buy ranges, and clear stop-losses. The Star Health recommendation alone netted me 10.2% in under a month. Truly institutional-grade trade research.',
    verifiedBadge: true,
    portfolioCategory: 'Stocks',
    date: 'March 2026',
  },
  {
    id: 't-2',
    name: 'Radhika Kulkarni',
    role: 'Chartered Accountant',
    location: 'Pune',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'Pankaj Murarka’s SQGARP™ framework actually protects downside.',
    quote: 'As a CA, I appreciate rigorous balance sheet analysis. Most advisory services recommend momentum junk that crashes 40% in corrections. Advisor Alpha’s Flexicap model portfolio has weathered volatility beautifully with an 18.1% CAGR. The transparent rebalancing alerts take 30 seconds to execute on Zerodha.',
    verifiedBadge: true,
    portfolioCategory: 'Portfolios',
    date: 'February 2026',
  },
  {
    id: 't-3',
    name: 'Col. Rajeshwar Singh (Retd.)',
    role: 'Defense Veteran',
    location: 'Chandigarh',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'Flawless SEBI compliance and peace of mind.',
    quote: 'Retirement savings cannot be gambled with. Having an ex-Axis AMC CIO guiding my mutual fund asset allocation gives my family immense confidence. Their ONDC mutual fund onboarding took literally 2 minutes on my phone, and all payouts go directly to my bank account.',
    verifiedBadge: true,
    portfolioCategory: 'Mutual Funds',
    date: 'January 2026',
  },
  {
    id: 't-4',
    name: 'Ananya Mehra',
    role: 'Product Lead – Fintech',
    location: 'Gurugram',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'The institutional-grade UI and multi-target trade alerts are seamless.',
    quote: 'The UX of Advisor Alpha is world-class. When a stock hits Target 1, you get a clean push alert to book partial profit and trail stop-loss on your trade. It eliminates emotional decision making completely. Best ₹999/month I spend on my personal finance.',
    verifiedBadge: true,
    portfolioCategory: 'Stocks',
    date: 'March 2026',
  },
  {
    id: 't-5',
    name: 'Dinesh Patel',
    role: 'SME Business Owner',
    location: 'Ahmedabad',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'Guided ₹50 Lakhs of my business surplus safely.',
    quote: 'I don’t have time during business hours to track tick-by-tick market news. Their Balanced Model Portfolio gave my surplus capital high-quality exposure with low drawdown. The client support desk is always responsive and professional.',
    verifiedBadge: true,
    portfolioCategory: 'Portfolios',
    date: 'December 2025',
  },
  {
    id: 't-6',
    name: 'Dr. Priya Sundaram',
    role: 'Consultant Radiologist',
    location: 'Chennai',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    headline: 'First Salary Basket got my medical interns started on SIPs.',
    quote: 'I recommend the First Salary mutual fund basket to all junior resident doctors in our hospital. It removes the paralysis of picking from thousands of funds, with disciplined diversification and zero commissions.',
    verifiedBadge: true,
    portfolioCategory: 'Mutual Funds',
    date: 'February 2026',
  },
];
