export interface BrandInfo {
  name: string;
  brandDisplayName: string;
  legalEntity: string;
  division: string;
  cin: string;
  registrationType: string;
  grantDate: string;
  validity: string;
  sebiRegNo: string;
  bseEnlistmentNo: string;
  amfiArn: string;
  tagline: string;
  subtagline: string;
  founderQuote: string;
  mission: string;
  founder: {
    name: string;
    role: string;
    experience: string;
    peakAum: string;
    bio: string;
    priorRoles: string[];
  };
  leadershipTeam: Array<{
    name: string;
    role: string;
    email: string;
  }>;
  metrics: {
    strikeRate: string;
    activeInvestors: string;
    aumGuided: string;
    researchExperience: string;
  };
  contact: {
    registeredAddress: string;
    branchAddress: string;
    phone: string;
    supportEmail: string;
    complianceEmail: string;
    workingHours: string;
  };
  deepLinks: {
    webLogin: string;
    webRoot: string;
    iosApp: string;
    androidApp: string;
    whatsapp: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    instagram: string;
  };
  sqgarpPillars: Array<{
    letter: string;
    pillar: string;
    description: string;
  }>;
}

export const BRAND_INFO: BrandInfo = {
  name: 'Advisor Alpha',
  brandDisplayName: 'MyAdvisorAlpha',
  legalEntity: 'Renaissance Smart Tech Private Limited',
  division: 'MyAdvisorAlpha (SEBI Registered Research Analyst Division)',
  cin: 'U67200MH2020PTC338091',
  registrationType: 'Non-Individual',
  grantDate: 'July 14, 2025',
  validity: 'Perpetual',
  sebiRegNo: 'INH000021818',
  bseEnlistmentNo: '6793',
  amfiArn: 'ARN-350887',
  tagline: 'Investing made clear. Wealth made possible.',
  subtagline: 'Professional Investment Advisory for Smart Investors',
  founderQuote: 'I want every Indian to make money in stock market.',
  mission: 'Cut through noise, eliminate speculation, and deliver institutional-grade equity research and disciplined wealth management to individual retail investors across India.',
  founder: {
    name: 'Pankaj Murarka',
    role: 'Founder & Chief Investment Officer (CIO)',
    experience: '30+ Years',
    peakAum: '$5 Billion (₹40,000+ Cr)',
    bio: 'Pankaj Murarka brings over 30 years of equity market experience. As the former CIO of Axis Mutual Fund, he spearheaded the fastest-growing fund house in India managing $5B AUM. His distinguished career spans leadership and fund management roles at Rare Enterprises (Rakesh Jhunjhunwala’s firm), UTI AMC, Motilal Oswal, and Merrill Lynch.',
    priorRoles: [
      'CIO – Axis Mutual Fund ($5B AUM, 2011–2016)',
      'Senior Portfolio Manager – Rare Enterprises',
      'Fund Manager – UTI AMC',
      'Head of Research – Motilal Oswal Financial Services',
    ],
  },
  leadershipTeam: [
    { name: 'Pankaj Murarka', role: 'Founder & CIO', email: 'support@renaissanceadvisors.in' },
    { name: 'Alok Sharma', role: 'Director', email: 'support@renaissanceadvisors.in' },
    { name: 'Nipun Jalan', role: 'Principal Officer', email: 'support@myadvisoralpha.com' },
    { name: 'Ms. Nidhi Kamani', role: 'Compliance & Grievance Officer', email: 'support@myadvisoralpha.com' },
    { name: 'Rishabh Solanki', role: 'Head of Customer Care', email: 'support@renaissanceadvisors.in' },
  ],
  metrics: {
    strikeRate: '75%',
    activeInvestors: '1 Lakh+',
    aumGuided: '₹2,000 Cr+',
    researchExperience: '75+ Years',
  },
  contact: {
    registeredAddress: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059, Maharashtra, India',
    branchAddress: 'A/103, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    supportEmail: 'support@myadvisoralpha.com',
    complianceEmail: 'support@renaissanceadvisors.in',
    workingHours: '9:00 AM – 6:00 PM IST (Monday to Friday)',
  },
  deepLinks: {
    webLogin: 'https://web.advisoralpha.in/#/login',
    webRoot: 'https://web.advisoralpha.in/#/login',
    iosApp: 'https://apps.apple.com/in/app/advisor-alpha-stock-investing/id6749932451',
    androidApp: 'https://play.google.com/store/apps/details?id=com.renaissance.advisoralpha&hl=en_IN',
    whatsapp: 'https://whatsapp.com/channel/0029Vb6uPDGLtOj9FJ6BWW46',
    linkedin: 'https://www.linkedin.com/company/advisor-alpha/',
    twitter: 'https://x.com/AdvisorAlpha_',
    youtube: 'https://www.youtube.com/channel/UCSFDQB9GlrOkRCXTt3tXZYg',
    instagram: 'https://www.instagram.com/advisoralpha_?igsh=bTZ5MnprNnoyeGVi',
  },
  sqgarpPillars: [
    {
      letter: 'S',
      pillar: 'Sustainable Growth',
      description: 'We invest solely in businesses with durable economic moats, predictable cash flows, and long-term earning power — avoiding speculative momentum fads.',
    },
    {
      letter: 'Q',
      pillar: 'Quality First',
      description: 'Non-negotiable assessment of management governance integrity, capital allocation history, return on equity (ROE > 18%), and low leverage balance sheets.',
    },
    {
      letter: 'G',
      pillar: 'Growth Mindset',
      description: 'Targeting companies exhibiting structural market tailwinds capable of compounding earnings and revenues consistently at 15–25% CAGR over 3–5 year horizons.',
    },
    {
      letter: 'A',
      pillar: 'At Reasonable Price',
      description: 'Strict valuation discipline ensuring purchases occur with an adequate margin of safety (P/E to Growth, DCF, and historical multiples), protecting capital during downturns.',
    },
    {
      letter: 'R',
      pillar: 'Risk Management',
      description: 'Every recommendation is published with an upfront stop-loss level, maximum drawdown limit, and risk-adjusted position sizing guidelines.',
    },
    {
      letter: 'P',
      pillar: 'Patience & Conviction',
      description: 'Avoiding impulsive churn. Allowing the compounding power of high-quality businesses to work over short-term market noise and macro volatility.',
    },
  ],
};

export const brandInfo = BRAND_INFO;
