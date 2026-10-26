# Project: MyAdvisorAlpha Web Application Refactoring & Restyling

## Architecture
- **Framework**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion.
- **Design Philosophy**: Univest-modeled UI structure and interactive layout mechanics, combined with 100% strict brand isolation and authentic MyAdvisorAlpha assets, products, disclosures, and Royal Blue (`#0066f5`) theme styling.
- **Iconography System**: Zero emojis. Sleek `lucide-react` icons and 31 authentic brand SVGs/PNGs in `public/assets/`.
- **Component Hierarchy**:
  - `src/app/layout.tsx`: Root shell, clean document metadata keywords, theme variables, sticky Navbar shell, Footer.
  - `tailwind.config.ts`: Institutional design tokens (`#0066f5` primary, slate/white surfaces, high-contrast badges `#dbeafe`/`#1e40af`, `#dcfce7`/`#166534`).
  - `src/data/services.ts`: Canonical services taxonomy and product model (`Single Stocks` -> `Futures`, `MTF Basket`; `Portfolio`; `Mutual Funds`).
  - `src/components/layout/Navbar.tsx`: Desktop floating pill container with Advisory dropdown, Mutual Funds, Blog, FAQ, Web Login, and Get Started CTA.
  - `src/components/layout/MobileNav.tsx`: Responsive slide-over drawer mirroring the exact nested Advisory taxonomy.
  - `src/components/sections/HeroSection.tsx`: Hero section featuring dynamic rotating text ("Advisory in [Stock | Futures | Portfolio]" via Framer Motion) and promotional ad card ("Get 2 free -> investment/ trade ideas" + "SEBI Registered") above phone mockup card.
  - `src/components/sections/StackedShowcase.tsx`: Sticky stacked cards aligned with Single Stocks (Futures, MTF Basket), Model Portfolios, Mutual Funds, Broker Sync, and CIO Alpha Edge (preserving IDs `single-stocks`, `model-portfolios`, `curated-mutual-funds`, `execution-tools`, `cio-edge`).
  - `src/components/calculators/`: SIP & Wealth calculators, comparison banners, and alpha projections.
  - `scripts/verify-e2e.mjs`: Complete 4-tier E2E automated verification test harness.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Strict Brand Isolation | 100% elimination of Univest copy, DOM strings, metadata keywords, and code comments | M1 | ORIGINAL_REQUEST.md (R1) |
| 2 | Royal Blue Theme Palette | Implement Royal Blue (`#0066f5`), clean slate/white surfaces, high-contrast badges (`#dbeafe`/`#1e40af`, `#dcfce7`/`#166534`) | M1 | ORIGINAL_REQUEST.md (R1) |
| 3 | Emoji Elimination & Iconography | Zero cheap emojis; replace with `lucide-react` icons and `public/assets/` SVGs | M1 | User Guidance (2026-10-25T18:54:02Z) |
| 4 | Canonical Services Data Model | Create `src/data/services.ts` defining Single Stocks (`Futures`, `MTF Basket`), `Portfolio`, `Mutual Funds` | M2 | ORIGINAL_REQUEST.md (R2) |
| 5 | Custom Desktop Navbar Structure | Top-level links: `Advisory` (dropdown), `Mutual Funds`, `Blog`, `FAQ`, Web Login, Get Started CTA | M2 | ORIGINAL_REQUEST.md (R2) |
| 6 | Advisory Dropdown Hierarchy | Nested dropdown: `Single Stocks` (`Futures`, `MTF Basket`) and `Portfolio` with descriptions | M2 | ORIGINAL_REQUEST.md (R2) |
| 7 | Responsive Mobile Navigation Drawer | Slide-over drawer with expandable accordion mirroring the exact Advisory hierarchy | M2 | ORIGINAL_REQUEST.md (R2) |
| 8 | Showcase Cards Taxonomy Alignment | Align `StackedShowcase.tsx` cards with new taxonomy while preserving card IDs (`single-stocks`, `model-portfolios`, `curated-mutual-funds`, `execution-tools`, `cio-edge`) | M2 | ORIGINAL_REQUEST.md (R2) |
| 9 | Dynamic Rotating Hero Headline | Framer Motion animated vertical slide/fade cycling `Stock` → `Futures` → `Portfolio` after `"Advisory in "` | M3 | ORIGINAL_REQUEST.md (R3) |
| 10 | Promotional Ad Card | Card above phone mockup with `"Get 2 free -> investment/ trade ideas"` and `"SEBI Registered"` badge triggering lead modal | M3 | ORIGINAL_REQUEST.md (R3) |
| 11 | Comprehensive E2E Verification Suite | Extend `scripts/verify-e2e.mjs` to test zero-Univest scan, navbar taxonomy, rotating keywords, and ad card | M4 | ORIGINAL_REQUEST.md (R4) |
| 12 | Local Build & Server Validation | Clean `npm.cmd run build` (exit code 0), 100% passing tests, and verified server on `http://localhost:3000` | M4 | ORIGINAL_REQUEST.md (R4) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Brand Isolation, Theme & Asset Styling | Clean all Univest references, apply Royal Blue `#0066f5` & high-contrast badges, eliminate cheap emojis with Lucide/SVGs | none | DONE |
| M2 | Services Taxonomy, Navigation & Showcase System | Create `src/data/services.ts`, implement Custom Navbar & Mobile Drawer with Advisory hierarchy, align `StackedShowcase.tsx` | M1 | DONE |
| M3 | Hero Dynamic Rotating Headline & Promotional Ad Card | Implement Framer Motion text rotation ("Advisory in [Stock \| Futures \| Portfolio]") and promo ad card above phone mockup | M2 | IN_PROGRESS |
| M4 | E2E Verification Suite & Final Build Validation | Modernize `scripts/verify-e2e.mjs`, run complete test suite, verify `npm.cmd run build`, test live server on port 3000 | M3 | PLANNED |

## Interface Contracts
### `src/data/services.ts` Contract
```typescript
export interface SubOffering {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  iconName?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  subOfferings?: SubOffering[];
  ctaText: string;
  ctaHref: string;
}

export const CANONICAL_SERVICES: ServiceCategory[];
```

### Navbar Taxonomy Contract
- **Top-Level Links**:
  1. `Advisory` (Dropdown Menu)
  2. `Mutual Funds` (`/#mutual-funds` or `/mutual-funds`)
  3. `Blog` (`/blogs`)
  4. `FAQ` (`/#faq`)
- **Advisory Dropdown Children**:
  - `Single Stocks`
    - `Futures`: "Derivatives trading strategies and momentum signals"
    - `MTF Basket`: "Margin Trading Facility curated equity baskets with leverage and risk management"
  - `Portfolio`: "Full portfolio advisory, risk profiling, and periodic rebalancing"
- **Actions**:
  - `Login`: `https://web.advisoralpha.in/#/login` (external)
  - `Get Started`: opens lead capture modal (`onOpenConsultation()`)

### Hero UI Contract
- **Dynamic Headline**:
  - Base text: `"Advisory in "`
  - Rotating text: `["Stock", "Futures", "Portfolio"]`
  - Motion: `framer-motion` `AnimatePresence` with vertical slide and opacity transitions.
- **Promotional Ad Card**:
  - Placement: Directly above the phone mockup card (`lg:col-span-5`).
  - Content: `"Get 2 free -> investment/ trade ideas"`
  - Trust Badge: `"SEBI Registered"` (`bg-[#dcfce7] text-[#166534]`)
  - Interaction: Click triggers consultation lead modal.

## Code Layout
- `src/app/layout.tsx`: HTML document metadata, body shell, global navbar & footer wrapper.
- `tailwind.config.ts`: Color palette (`#0066f5` primary, institutional surfaces, badges), fonts, animations.
- `src/app/globals.css`: Range slider styling, scrollbar, shimmer effects.
- `src/data/services.ts`: Canonical services & product taxonomy.
- `src/data/testimonials.ts`: Verified testimonials with clean institutional copy.
- `src/components/layout/Navbar.tsx`: Custom desktop navbar with Advisory dropdown.
- `src/components/layout/MobileNav.tsx`: Responsive mobile drawer with accordion hierarchy.
- `src/components/sections/HeroSection.tsx`: Dynamic rotating headline and promotional ad card.
- `src/components/sections/StackedShowcase.tsx`: Sticky stacked cards aligned with taxonomy.
- `src/components/calculators/AlphaComparisonBanner.tsx`: Clean institutional alpha comparison.
- `scripts/verify-e2e.mjs`: Complete automated verification test runner.
