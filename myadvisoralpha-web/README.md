# MyAdvisorAlpha Web Application

> **High-Converting Financial Advisory Web Application**  
> Combining institutional financial engineering, dark-theme aesthetic, and interactive UI components with authentic MyAdvisorAlpha institutional equity research, verified deep links, and SEBI regulatory compliance metadata.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![SEBI Registered](https://img.shields.io/badge/SEBI%20RA-INH000021818-3AA17E?style=flat)](https://scores.sebi.gov.in/)
[![BSE Enlistment](https://img.shields.io/badge/BSE%20Enlistment-6793-237FFB?style=flat)](https://www.bseindia.com/)
[![AMFI ARN](https://img.shields.io/badge/AMFI%20ARN-350887-amber?style=flat)](https://www.amfiindia.com/)
[![E2E Verification](https://img.shields.io/badge/E2E%20Tests-286%2F286%20Passed%20(100%25)-3AA17E?style=flat)](#automated-verification-suites)
[![Challenger Suite](https://img.shields.io/badge/Challenger%20Suite-75%2F75%20Passed%20(100%25)-3AA17E?style=flat)](#automated-verification-suites)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Local Setup & Running Instructions](#local-setup--running-instructions)
4. [Automated Verification Suites](#automated-verification-suites)
5. [Complete Route Map (8 Static Routes)](#complete-route-map-8-static-routes)
6. [Interactive Features & Engineering Deep Dive](#interactive-features--engineering-deep-dive)
7. [SEBI Regulatory Compliance & Disclosures](#sebi-regulatory-compliance--disclosures)
8. [Directory Structure](#directory-structure)
9. [License & Disclaimers](#license--disclaimers)

---

## Project Overview

**MyAdvisorAlpha** is an institutional-grade retail investment advisory platform designed to eliminate financial speculation, market noise, and commission conflicts for individual investors across India.

This project delivers a production-grade web application engineered with:
- **Institutional Design System**: High-converting visual layout, dark aesthetic (`#010101`, `#0B0E14`), Royal Blue (`#0066f5`) and high-contrast trust green (`#166534`) accents, sticky stacking showcase decks, fluid typography, and responsive ergonomics.
- **Authentic Brand & Content**: Fully populated with real business content, leadership profiles, investment philosophy (**SQGARP™**), and pricing tiers extracted from `https://myadvisoralpha.com/` (Renaissance Smart Tech Private Limited).
- **Verified Deep Links**: Real checkout URLs with cryptographic UUID plan identifiers, web application login portals, official mobile app store links (iOS & Android), and WhatsApp channel redirects.
- **Stringent SEBI Compliance**: Complete 5-tier Grievance Redressal Escalation Matrix, live SEBI SCORES portal links, Smart ODR portal routing, monthly customer complaints disclosure tables, and 9 verified statutory Google Drive disclosure documents.

---

## Architecture & Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14.2 (App Router)** | Modern React Server Components architecture with granular client-side islands (`'use client'`). |
| **Language** | **TypeScript 5.7** | Strict type checking, zero implicit anys, robust interfaces for brand, legal, and offering models. |
| **Styling** | **Tailwind CSS 3.4** | Utility-first styling with custom financial dark theme palette, typography plugin, and fluid grid layouts. |
| **Icons** | **Lucide React (v0.460)** | Clean, accessible vector iconography for financial metrics, navigation, and regulatory badges. |
| **FX & Animation** | **Canvas Confetti (v1.9)** | Interactive visual reward upon successful consultation booking and lead submission. |
| **State Management** | **React Context API** | Global `LeadModalContext` enabling modal triggering from any component, button, or calculator CTA. |
| **Calculators** | **Custom Math Engine** | Compound interest and monthly annuity calculation engine (`src/lib/calculator.ts`) with zero external math dependencies. |

---

## Local Setup & Running Instructions

### Prerequisites
- **Node.js**: `v18.17.0+` or `v22.x` (LTS recommended)
- **npm**: `v9.x` or `v10.x` (bundled with Node.js)
- Operating System: Windows (PowerShell/CMD), macOS, or Linux

### 1. Installation
Clone the repository or navigate to the project directory, then install the dependencies:

```bash
# Navigate to the web application directory
cd myadvisoralpha-web

# Install all npm dependencies (Windows)
npm.cmd install

# Alternatively on macOS / Linux:
npm install
```

### 2. Development Mode
Run the development server with Hot Module Replacement (HMR):

```bash
# Windows
npm.cmd run dev

# macOS / Linux
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 3. Production Build & Execution
Compile optimized static production bundles and start the production HTTP server:

```bash
# Step 1: Build the optimized production application (Windows)
npm.cmd run build

# Step 2: Serve the production build on port 3000
npm.cmd start
```

*Note: `npm run build` statically prerenders all 8 primary application routes and the 404 page with 0 errors.*

---

## Automated Verification Suites

The codebase includes an enterprise-grade automated testing and verification suite consisting of **3 independent test harnesses** covering over **360+ total assertions**.

### 1. 4-Tier Automated Verification Suite (`scripts/verify-e2e.mjs`)
Covers the entire functional surface of the application across 4 distinct levels:
- **Tier 1: Feature Coverage (115 Assertions)** — Validates all 19 core features (Hero, Metrics, Stacked Deck, Calculators, Alpha Comparison, Reviews, FAQs, Footer, About, Blogs, Contact, Legal Disclosures).
- **Tier 2: Boundary & Corner Cases (116 Assertions)** — Rigorous boundary analysis including zero/negative calculator inputs, 100-year tenure limits, Indian phone regex edge cases, email syntax checks, escalation hierarchy depths, and complaints table arithmetic.
- **Tier 3: Cross-Feature Combinations (23 Assertions)** — Asserts consistency between pricing plans and checkout URL UUIDs, brand metadata synchronization across headers/footers, and calculator wealth mapping to modal buckets.
- **Tier 4: Real-World Scenarios (32 Assertions)** — Simulates 5 complete end-to-end user journeys (First-Time Retail Investor, Wealth Planning SIP Flow, Regulatory Due Diligence, Consultation Booking, Complaints & Disclosures Audit).

```bash
# Run the complete 4-tier verification suite (offline static mode)
node scripts/verify-e2e.mjs

# Run against a running local HTTP server
node scripts/verify-e2e.mjs --live

# Target a specific tier (e.g., Tier 1 or Tier 4)
node scripts/verify-e2e.mjs --tier=1
node scripts/verify-e2e.mjs --tier=4

# Run with verbose diagnostic output
node scripts/verify-e2e.mjs --verbose
```

**Verification Output:**
```
==============================================================================
                    E2E TEST VERIFICATION SUMMARY                             
==============================================================================
  Tier 1 (Feature Coverage)        : 115 Passed | 0 Failed | 0 Pending
  Tier 2 (Boundary & Corner Cases) : 116 Passed | 0 Failed | 0 Pending
  Tier 3 (Cross-Feature Combos)    : 23 Passed | 0 Failed | 0 Pending
  Tier 4 (Real-World Scenarios)    : 32 Passed | 0 Failed | 0 Pending
------------------------------------------------------------------------------
  Grand Total Assertions           : 286 (286 Passed, 0 Failed, 0 Pending)

  ✔ OVERALL RESULT: ALL TESTS PASSED (100% SUCCESS)
```

---

### 2. Challenger Stress Suite (`scripts/challenger-stress.mjs`)
Tests boundary stress scenarios and CSS layout invariants:
- **Suite 1: Phone Validation Regex & Sanitizer (29 Assertions)** — Tests prefixes `6`, `7`, `8`, `9`, rejects `0-5`, invalid lengths, Devnagari characters, script injection attempts, and passes a 1,000 pseudo-random number generator stress test.
- **Suite 2: Stacked Cards Deck Configuration (17 Assertions)** — Verifies the signature sticky stacking top offsets formula (`120 + index * 20` px) and z-index layering (`20 + index`) for all 5 cards.
- **Suite 3: Responsive Layout Classes Audit (29 Assertions)** — Audits CSS utility classes across Desktop (`1440px`), Tablet (`768px`), and Mobile (`375px`) to guarantee zero horizontal layout overflow.

```bash
node scripts/challenger-stress.mjs
```

**Verification Output:**
```
======================================================
SUMMARY: 75 Passed, 0 Failed (100% SUCCESS)
======================================================
```

---

### 3. Deep Links Verification Suite (`scripts/verify-deep-links.mjs`)
Validates that all external checkout links and web login links conform to exact cryptographic specifications:
- Plan checkout links target `https://link.advisoralpha.in/nav?page=payment` with valid UUIDs (`77113212-0cd3-4810-af83-1dd07409ca49`, `0b6dbbe5-226a-4222-80fe-08f88532774b`), `plan_type` (`stocks`, `portfolio`), and `action=subscribe`.
- Web portal links correctly route to canonical `https://web.advisoralpha.in/#/login`.

```bash
node scripts/verify-deep-links.mjs
```

**Verification Output:**
```
Overall Deep Links Validation: ALL PASSED
```

---

### Single Command Comprehensive Audit
To run the production build and execute all three verification suites in sequence:

```bash
npm.cmd run build && node scripts/verify-e2e.mjs && node scripts/challenger-stress.mjs && node scripts/verify-deep-links.mjs
```

---

## Complete Route Map (8 Static Routes)

All 8 primary routes are fully implemented, statically prerendered, and return HTTP 200:

| Route Path | File Source | Description & Highlights |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | **Main Landing Page**: Sticky dark navbar, hero section with phone lead capture, metrics strip (75% strike rate, 1L+ investors, ₹2,000 Cr+ AUM), 5-card stacked showcase deck, dual-mode SIP/Lumpsum calculator, Pro Alpha wealth banner, brokerage comparison grid, testimonials, FAQ accordion, and comprehensive regulatory footer. |
| `/about` | `src/app/about/page.tsx` | **Company & Leadership**: Detailed profile of Founder & CIO **Pankaj Murarka** (Ex-CIO Axis AMC $5B AUM, Rare Enterprises), executive leadership directory, core values, full explanation of the **SQGARP™** investment framework, and corporate SEBI licensing credentials. |
| `/blogs` | `src/app/blogs/page.tsx` | **Research Library & Insights**: 11 real institutional research articles with category filtering (*Market Analysis*, *SQGARP Insights*, *Wealth Building*), instant text search, reading time indicators, interactive article reading modal, and newsletter subscription form. |
| `/contact` | `src/app/contact/page.tsx` | **Official Contact Desk**: Corporate headquarters in Andheri East, Mumbai, phone (`+91 8655387833`), dedicated support & compliance emails, business hours, and full interactive consultation request form with confetti feedback. |
| `/legal/terms-and-conditions` | `src/app/legal/terms-and-conditions/page.tsx` | **Terms of Service**: Statutory research analyst client agreement, scope of advisory services, billing and refund policies, limitation of liability, and direct links to grievance escalation mechanisms. |
| `/legal/privacy-policy` | `src/app/legal/privacy-policy/page.tsx` | **Privacy Policy**: Personal data governance, Information Technology Act 2000 compliance, 256-bit SSL encryption disclosures, and cookie usage guidelines. |
| `/legal/grievance-redressal-escalation-matrix` | `src/app/legal/grievance-redressal-escalation-matrix/page.tsx` | **Grievance Escalation Matrix**: Official 5-tier escalation hierarchy table with names, addresses, phone numbers, emails, and turnaround times for every level, plus links to SEBI SCORES and Smart ODR portals. |
| `/legal/customer-complaints-and-disclosures` | `src/app/legal/customer-complaints-and-disclosures/page.tsx` | **Complaints & Disclosures**: Monthly investor complaints audit table (ending September 2026), 6-month historical disposal trend, 3-year annual audit trend, and table of 9 statutory Google Drive disclosure documents. |

---

## Interactive Features & Engineering Deep Dive

### 1. Dual-Mode SIP & Lumpsum Calculator (`src/components/calculators/SipCalculator.tsx`)
- **Dual Computation Modes**: Toggle between monthly Systematic Investment Plan (SIP) and one-time Lumpsum investments.
- **Mathematical Formulas**:
  - **Monthly SIP Compounding**:
    $$FV = P \times \frac{(1 + i)^n - 1}{i} \times (1 + i)$$
    *(where $P$ is monthly amount, $i = r / 100 / 12$, and $n = t \times 12$ months)*
  - **Lumpsum Compounding**:
    $$FV = P \times \left(1 + \frac{r}{100}\right)^t$$
- **Pure SVG Donut Chart**: Dynamically renders stroke dash arrays (`circumference = 2 * π * 65 = 408.4`) showing the visual split between Invested Capital (emerald `#3AA17E`) and Wealth Gain (blue `#237FFB`).
- **Interactive Range Sliders**: Slider controls synchronized with numeric formatting, bounds checking, and boundary clamping.
- **Seamless Lead Integration**: The **"Start Your Wealth Plan"** button automatically categorizes projected wealth corpus (`mapWealthToPortfolioBucket`) into the appropriate modal portfolio bracket (`< ₹5L`, `₹5L - ₹25L`, `> ₹25L`, `₹1Cr+`) and opens the consultation modal.

---

### 2. Pro Alpha Wealth Comparison Banner (`src/components/calculators/AlphaComparisonBanner.tsx`)
- Directly compares conventional index investing (12% CAGR, Nifty 50 benchmark) against MyAdvisorAlpha's **18% CAGR target** (+6% Alpha spread).
- Computes and highlights the net outperformance in Indian Rupees (e.g., generating over **+₹1.03 Crore** in additional wealth on a ₹25,000/mo SIP over 15 years).

---

### 3. Stacked Cards Showcase Deck (`src/components/sections/StackedShowcase.tsx`)
- Adopts our signature sticky sequential card deck design.
- Each of the 5 cards sticks to the viewport with a calculated cascading offset:
  ```tsx
  topOffset = 120 + index * 20; // 120px, 140px, 160px, 180px, 200px
  zIndex = 20 + index;          // 20, 21, 22, 23, 24
  ```
- **Showcase Offerings**:
  1. **Single Stock Advisory**: 20+ monthly SQGARP™ picks, 3 profit targets, stop-loss, ₹999/mo checkout link.
  2. **Model Portfolios**: 4 risk baskets (Beginner ₹50k, Balanced ₹2.5L, Flexicap, Aggressive) with direct Demat custody.
  3. **Curated Mutual Funds**: ONDC-powered goal baskets (First Salary, All-Weather, Retire Rich) with zero commission conflict.
  4. **Execution Tools**: 1-tap broker execution gateway (Zerodha, Groww, AngelOne, Upstox) and portfolio health audit.
  5. **CIO Edge**: Highlighting Pankaj Murarka's 30-year track record and $5B peak AUM.

---

### 4. Consultation Lead Capture Modal (`src/components/modals/LeadCaptureModal.tsx`)
- **Strict Indian Phone Validation**:
  - Regular expression: `/^[6-9]\d{9}$/`
  - Real-time input sanitizer: strips non-digits and truncates to 10 characters max (`e.target.value.replace(/\D/g, '').slice(0, 10)`).
- **Validation Engine**: Validates full name (min 2 chars), valid email format, portfolio size selection, and mandatory terms consent.
- **Finite State Machine**: Seamlessly transitions `IDLE` $\rightarrow$ `SUBMITTING` (disables form, shows loading spinner) $\rightarrow$ `SUCCESS` (displays generated ticket code, e.g. `ADV-2026-XXXX`, and promised 24-hour callback window).
- **Celebration Feedback**: Triggers multi-burst celebratory confetti via `canvas-confetti` upon successful submission.

---

### 5. Responsive Mobile Drawer (`src/components/layout/MobileNav.tsx`)
- Smooth sliding mobile navigation drawer with backdrop blur.
- Click-to-dismiss backdrop handler and ESC keyboard accessibility.
- Optimized for mobile viewports (max width 320px) preventing horizontal scroll bleed.

---

## SEBI Regulatory Compliance & Disclosures

MyAdvisorAlpha operates under strict compliance with the **Securities and Exchange Board of India (SEBI)** regulations.

### Corporate Identification & Licensing
- **Corporate Legal Entity**: Renaissance Smart Tech Private Limited
- **Operating Division**: MyAdvisorAlpha (SEBI Registered Research Analyst Division)
- **Corporate Identification Number (CIN)**: `U67200MH2020PTC338091`
- **SEBI Research Analyst Registration No.**: `INH000021818` (Granted: July 14, 2025 · Perpetual)
- **BSE Enlistment Number**: `6793`
- **AMFI Mutual Fund Registration**: `ARN-350887`
- **Registered Corporate Office**:  
  Office No. 508, 5th Floor, B Wing, Mittal Commercial Premises CHS Ltd,  
  Off M.V. Road, Near Mittal Estate, Marol, Andheri (East), Mumbai - 400059, Maharashtra, India.  
  Telephone: `+91 8655387833` | Email: `support@myadvisoralpha.com`

---

### 5-Tier Grievance Redressal Hierarchy

| Level | Designation | Contact Person | Phone & Email | Resolution Turnaround |
| :---: | :--- | :--- | :--- | :---: |
| **Level 1** | Customer Care Desk | Rishabh Solanki | `+91 8655387833`<br>`support@renaissanceadvisors.in` | **2 – 3 Business Days** |
| **Level 2** | Head of Customer Care | Rishabh Solanki | `+91 8655387833`<br>`support@renaissanceadvisors.in` | **5 Business Days** |
| **Level 3** | Compliance Officer | Ms. Nidhi Kamani | `+91 8655387833`<br>`support@myadvisoralpha.com` | **7 Business Days** |
| **Level 4** | Principal Officer | Mr. Nipun Jalan | `+91 8655387833`<br>`support@myadvisoralpha.com` | **7 Business Days** |
| **Level 5** | Director(s) | Pankaj Murarka /<br>Alok Sharma | `+91 8655387833`<br>`support@renaissanceadvisors.in` | **10 Business Days** |

If a grievance is not redressed within the specified timeline or the client is dissatisfied with the resolution, the investor may escalate to:
1. **SEBI SCORES Portal**: [https://scores.sebi.gov.in/](https://scores.sebi.gov.in/)
2. **SMART ODR Portal**: [https://smartodr.in/login](https://smartodr.in/login)

---

### Verified Statutory Regulatory Disclosure Documents

All 9 official compliance documents published by Renaissance Smart Tech Private Limited are cataloged and linked directly:

1. **SEBI Registration Details**:  
   [View Registration Certificate](https://drive.google.com/file/d/1sPlZdR_50WIfXBDL-DqvsRbZFxgORhex/view?usp=sharing)
2. **Mandatory Disclosure under SEBI Circular**:  
   [View SEBI Circular Disclosure](https://drive.google.com/file/d/1IJYKTGQS_aQWzeHwBspTAVZac14m5dOU/view?usp=sharing)
3. **Annual Compliance Audit Report**:  
   [View Annual Audit Report](https://drive.google.com/file/d/1xMVbEMTVsYylSuHi4YAwBsBt0PHmjykd/view?usp=sharing)
4. **Most Important Terms & Conditions (MITC)**:  
   [View MITC Document](https://drive.google.com/file/d/1tesOxWm1_Z8Oxf05dPSYq4_P4U4H_DqI/view?usp=sharing)
5. **Disclosure & Disclaimer in Research Report**:  
   [View Research Disclaimers](https://drive.google.com/file/d/1gxNiwI79nHT_WSMjx-bhwnAZWkid-udy/view?usp=sharing)
6. **Client Level Segregation Policy**:  
   [View Segregation Policy](https://drive.google.com/file/d/14vocVVymTrp1qBJ6fjDYFnJ4W69nVAPA/view?usp=sharing)
7. **Payment via UPI ID Advisory Notice**:  
   [View Payment Notice](https://drive.google.com/file/d/1bj7m4lCZLZIpUbHFGAdYlRHdh8z06DkV/view?usp=sharing)
8. **Investor Charter for Research Analysts**:  
   [View Investor Charter](https://drive.google.com/file/d/16OmU8JBDxyKjiHnTsdGvJQVSjZlFC0X_/view?usp=sharing)
9. **Multi-Year Historical Complaints Data**:  
   [View Historical Complaints](https://drive.google.com/file/d/1Xy349dbDZulxltiMlyFp08fn5RVfUVAc/view?usp=sharing)

---

## Directory Structure

```
myadvisoralpha-web/
├── package.json                   # Dependencies, scripts, Next.js 14 config
├── tsconfig.json                  # Strict TypeScript configuration
├── tailwind.config.ts             # Tailwind design system & financial palette
├── postcss.config.js              # PostCSS autoprefixer configuration
├── next.config.mjs                # Next.js build options
├── README.md                      # Comprehensive project documentation
├── scripts/
│   ├── verify-e2e.mjs             # 4-Tier Automated Verification Suite (286 assertions)
│   ├── challenger-stress.mjs      # Challenger Stress Suite (75 assertions)
│   ├── verify-deep-links.mjs      # External UUID & Web Login URL Validator
│   └── challenger-browser-e2e.mjs # Browser automation verification script
└── src/
    ├── app/
    │   ├── layout.tsx             # Root Layout with Font, Metadata, and Context
    │   ├── globals.css            # Tailwind directives, animations & custom scrollbar
    │   ├── page.tsx               # Primary Landing Page (/)
    │   ├── about/page.tsx         # About Us & Leadership (/about)
    │   ├── blogs/page.tsx         # Research Library & Filtering (/blogs)
    │   ├── contact/page.tsx       # Contact Desk & Corporate Info (/contact)
    │   └── legal/
    │       ├── terms-and-conditions/page.tsx
    │       ├── privacy-policy/page.tsx
    │       ├── grievance-redressal-escalation-matrix/page.tsx
    │       └── customer-complaints-and-disclosures/page.tsx
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx         # Sticky header with desktop CTAs & mobile drawer
    │   │   ├── MobileNav.tsx      # Slide-out drawer with ESC and backdrop handling
    │   │   ├── Footer.tsx         # Regulatory disclaimers, address, and legal links
    │   │   └── QrDownloadCard.tsx # App download QR code popup
    │   ├── calculators/
    │   │   ├── SipCalculator.tsx  # Dual-mode SIP/Lumpsum with SVG Donut Chart
    │   │   └── AlphaComparisonBanner.tsx # Pro Alpha outperformance comparison
    │   ├── modals/
    │   │   └── LeadCaptureModal.tsx # Consultation form, regex validation, confetti
    │   └── sections/
    │       ├── HeroSection.tsx    # Value prop, trust badges, phone quick capture
    │       ├── StackedShowcase.tsx # 5-card sticky stacked deck
    │       ├── ComparisonGrid.tsx # Advisory vs Traditional Brokerage matrix
    │       ├── Testimonials.tsx   # Verified client reviews and ratings
    │       └── FaqAccordion.tsx   # Expandable regulatory & onboarding FAQs
    ├── context/
    │   └── LeadModalContext.tsx   # Global consultation modal provider
    ├── data/
    │   ├── brand.ts               # Brand credentials, metrics, social & deep links
    │   ├── offerings.ts           # Pricing plans, model portfolios, mutual funds
    │   ├── legal.ts               # 5-tier escalation matrix, complaints, disclosures
    │   ├── blogs.ts               # 11 institutional research articles & metadata
    │   ├── faq.ts                 # 8 categorised investor FAQs
    │   └── testimonials.ts        # Client reviews with portfolio metrics
    └── lib/
        ├── calculator.ts          # Compounding formulas & wealth bracket mapping
        └── utils.ts               # Currency formatting (INR), class merging
```

---

## License & Disclaimers

### Statutory Regulatory Disclaimers
- **Securities Market Risk**: Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI, enlistment as RA with Exchange, and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
- **Analyst Certification**: Research reports and recommendations are prepared based on publicly available data, proprietary SQGARP™ valuation methodology, and fundamental analysis. The research analyst certifies that views expressed reflect personal views about subject securities.
- **Mutual Fund Disclosures**: Mutual Fund investments are subject to market risks, read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.
- **SEBI Derivatives Warning**: 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. On average, loss makers registered net trading loss close to ₹50,000. Over and above net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.

---

*Engineered with precision for MyAdvisorAlpha / Renaissance Smart Tech Private Limited.*
