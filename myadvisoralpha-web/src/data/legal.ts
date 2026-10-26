export interface GrievanceLevel {
  level: number;
  designation: string;
  contactPerson: string;
  address: string;
  phone: string;
  email: string;
  turnaroundTime: string;
  workingHours: string;
}

export interface ComplaintStats {
  srNo: number;
  receivedFrom: string;
  pendingLastMonth: number;
  received: number;
  resolved: number;
  totalPending: number;
  pendingOverThreeMonths: number;
  avgResolutionDays: number;
}

export interface DisclosureDoc {
  title: string;
  category: string;
  url: string;
  description: string;
}

export interface RegulatoryMetadata {
  entityName: string;
  divisionName: string;
  cin: string;
  sebiRegNo: string;
  bseEnlistment: string;
  amfiArn: string;
  validity: string;
  scoresPortalUrl: string;
  smartOdrPortalUrl: string;
  sebiMasterCircularUrl: string;
  regionalOfficeAddress: string;
  standardDisclaimers: {
    marketRisk: string;
    researchAnalyst: string;
    mutualFund: string;
    sebiNineOutOfTenLossWarning: string;
  };
}

export const GRIEVANCE_LEVELS: GrievanceLevel[] = [
  {
    level: 1,
    designation: 'Customer Care Desk',
    contactPerson: 'Rishabh Solanki',
    address: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    email: 'support@renaissanceadvisors.in',
    turnaroundTime: '2 to 3 Business Days',
    workingHours: '9:00 AM – 6:00 PM IST (Mon–Fri)',
  },
  {
    level: 2,
    designation: 'Head of Customer Care',
    contactPerson: 'Rishabh Solanki',
    address: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    email: 'support@renaissanceadvisors.in',
    turnaroundTime: '5 Business Days',
    workingHours: '9:00 AM – 6:00 PM IST (Mon–Fri)',
  },
  {
    level: 3,
    designation: 'Compliance Officer',
    contactPerson: 'Ms. Nidhi Kamani',
    address: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    email: 'support@myadvisoralpha.com',
    turnaroundTime: '7 Business Days',
    workingHours: '9:00 AM – 6:00 PM IST (Mon–Fri)',
  },
  {
    level: 4,
    designation: 'Principal Officer',
    contactPerson: 'Mr. Nipun Jalan',
    address: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    email: 'support@myadvisoralpha.com',
    turnaroundTime: '7 Business Days',
    workingHours: '9:00 AM – 6:00 PM IST (Mon–Fri)',
  },
  {
    level: 5,
    designation: 'Director(s)',
    contactPerson: 'Pankaj Murarka / Alok Sharma',
    address: 'Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd, Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059',
    phone: '+91 8655387833',
    email: 'support@renaissanceadvisors.in',
    turnaroundTime: '10 Business Days',
    workingHours: '9:00 AM – 6:00 PM IST (Mon–Fri)',
  },
];

export const COMPLAINTS_DATA_CURRENT_MONTH: ComplaintStats[] = [
  {
    srNo: 1,
    receivedFrom: 'Directly from Investors',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingOverThreeMonths: 0,
    avgResolutionDays: 0,
  },
  {
    srNo: 2,
    receivedFrom: 'SEBI (SCORES)',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingOverThreeMonths: 0,
    avgResolutionDays: 0,
  },
  {
    srNo: 3,
    receivedFrom: 'Other Sources (if any)',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingOverThreeMonths: 0,
    avgResolutionDays: 0,
  },
];

export const DISCLOSURE_DOCS: DisclosureDoc[] = [
  {
    title: 'SEBI Registration Details',
    category: 'Regulatory Licensing',
    url: 'https://drive.google.com/file/d/1sPlZdR_50WIfXBDL-DqvsRbZFxgORhex/view?usp=sharing',
    description: 'Official Certificate of Registration as Research Analyst under SEBI (Research Analysts) Regulations, 2014.',
  },
  {
    title: 'Disclosure under SEBI Circular',
    category: 'Statutory Disclosures',
    url: 'https://drive.google.com/file/d/1IJYKTGQS_aQWzeHwBspTAVZac14m5dOU/view?usp=sharing',
    description: 'Mandatory disclosures pursuant to SEBI circulars on code of conduct and analyst declarations.',
  },
  {
    title: 'Annual Compliance Audit',
    category: 'Audit & Governance',
    url: 'https://drive.google.com/file/d/1xMVbEMTVsYylSuHi4YAwBsBt0PHmjykd/view?usp=sharing',
    description: 'Annual regulatory compliance audit report certifying operational adherence to research analyst guidelines.',
  },
  {
    title: 'Most Important Terms & Conditions (MITC)',
    category: 'Client Agreements',
    url: 'https://drive.google.com/file/d/1tesOxWm1_Z8Oxf05dPSYq4_P4U4H_DqI/view?usp=sharing',
    description: 'Key contractual rights, fee terms, advisory scope, dispute resolution mechanisms, and risk acknowledgments.',
  },
  {
    title: 'Disclosure & Disclaimer in Research Report',
    category: 'Research Standards',
    url: 'https://drive.google.com/file/d/1gxNiwI79nHT_WSMjx-bhwnAZWkid-udy/view?usp=sharing',
    description: 'Comprehensive financial interest disclaimers, conflict-of-interest declarations, and methodology disclosures.',
  },
  {
    title: 'Client Level Segregation',
    category: 'Operational Policy',
    url: 'https://drive.google.com/file/d/14vocVVymTrp1qBJ6fjDYFnJ4W69nVAPA/view?usp=sharing',
    description: 'Strict segregation protocols ensuring institutional boundary between advisory recommendations and client execution.',
  },
  {
    title: 'Payment via UPI ID Advisory',
    category: 'Payment Safety',
    url: 'https://drive.google.com/file/d/1bj7m4lCZLZIpUbHFGAdYlRHdh8z06DkV/view?usp=sharing',
    description: 'Official notice to clients warning against unauthorized personal bank accounts or third-party UPI transfers.',
  },
  {
    title: 'Investor Charter for Research Analysts',
    category: 'Investor Protection',
    url: 'https://drive.google.com/file/d/16OmU8JBDxyKjiHnTsdGvJQVSjZlFC0X_/view?usp=sharing',
    description: 'Investor charter published as mandated by SEBI detailing investor rights, responsibilities, and do’s and don’ts.',
  },
  {
    title: 'Historical Complaints Data',
    category: 'Compliance History',
    url: 'https://drive.google.com/file/d/1Xy349dbDZulxltiMlyFp08fn5RVfUVAc/view?usp=sharing',
    description: 'Multi-year historical log of investor complaints received and resolved across financial years.',
  },
];

export const REGULATORY_METADATA: RegulatoryMetadata = {
  entityName: 'Renaissance Smart Tech Private Limited',
  divisionName: 'MyAdvisorAlpha',
  cin: 'U67200MH2020PTC338091',
  sebiRegNo: 'INH000021818',
  bseEnlistment: '6793',
  amfiArn: 'ARN-350887',
  validity: 'July 14, 2025 – Perpetual',
  scoresPortalUrl: 'https://scores.sebi.gov.in/',
  smartOdrPortalUrl: 'https://smartodr.in/login',
  sebiMasterCircularUrl: 'https://renaissanceadvisors.in/wp-content/uploads/2024/01/Master-Circular-for-Online-Resolution-of-Disputes-in-the-Indian-Securities-Market.pdf',
  regionalOfficeAddress: 'SEBI Regional Office: G Block, Near Bank of India, Plot No. C 4-A, G Block Rd, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
  standardDisclaimers: {
    marketRisk: 'Investment in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, enlistment as RA with Exchange and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.',
    researchAnalyst: 'We, the research analysts and authors of this report, hereby certify that the views expressed in this research report accurately reflect our personal views about the subject securities, issuers, products, sectors or industries. It is also certified that no part of the compensation of the analyst(s) was, is, or will be directly or indirectly related to the inclusion of specific recommendations or views in this research.',
    mutualFund: 'Mutual Fund Investments are subject to market risk, read all scheme related documents carefully before investing. Past performance is not indicative of future returns.',
    sebiNineOutOfTenLossWarning: 'Risk Disclosures on Derivatives: 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. On average, loss makers registered net trading loss close to ₹50,000. Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs. Those making net trading profits incurred between 15% to 50% of such profits as transaction cost.',
  },
};

export const REGULATORY_INFO = REGULATORY_METADATA;
