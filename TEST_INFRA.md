# E2E Test Infra: MyAdvisorAlpha Web Application

## Test Philosophy
- **Opaque-box, requirement-driven**: Tests derive strictly from user requirements and acceptance criteria in `ORIGINAL_REQUEST.md`, independent of internal implementation nuances.
- **Methodology**: Systematic 4-Tier verification covering Category-Partition (Tier 1), Boundary Value Analysis (Tier 2), Cross-Feature Combinations (Tier 3), and Real-World Workload Scenarios (Tier 4).
- **Execution Mechanism**: Standalone Node.js verification script (`scripts/verify-e2e.mjs`) executing against static files and live local web server (`http://localhost:3000`).

---

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|----------------------|:------:|:------:|:------:|
| 1 | Foundational Scaffolding & Local Runnability | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 2 | Univest Sticky Header & Navigation | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 3 | Hero Section & Trust Badges | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 4 | Stacked Cards Product Showcase | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 5 | Regulatory Accordion Footer | ORIGINAL_REQUEST §R1, §R2 | 5 | 5 | ✓ |
| 6 | Brand Data Fixtures & Leadership Profile | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 7 | Route `/about` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 8 | Route `/blogs` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 9 | Route `/contact` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 10 | Route `/legal/terms-and-conditions` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 11 | Route `/legal/privacy-policy` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 12 | Route `/legal/grievance-redressal-escalation-matrix` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 13 | Route `/legal/customer-complaints-and-disclosures` | ORIGINAL_REQUEST §R1, §R4 | 5 | 5 | ✓ |
| 14 | Deep Links & Regulatory URLs (Web login, checkout, SCORES, ODR, Drive docs) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 15 | Interactive Return & SIP Calculator | ORIGINAL_REQUEST §R2, §R3 | 5 | 5 | ✓ |
| 16 | Consultation Lead Modal & Field Validation | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 17 | Comparison & "Why Us" Grid | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 18 | Testimonials & Social Proof | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 19 | FAQ Accordion Component | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |

---

## Test Architecture
- **Test Runner**: `node scripts/verify-e2e.mjs`
- **Pass/Fail Semantics**: 
  - Every individual test assertion logs `[PASS]` or `[FAIL]`.
  - Process exits with code `0` only if 100% of tests pass.
  - Exits with code `1` if any test fails, logging comprehensive diagnostics.
- **Directory Layout**:
  - `myadvisoralpha-web/scripts/verify-e2e.mjs`: Central automated test harness.

---

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | First-Time Retail Investor Flow | Hero CTA -> Reviews Stock Advisory Plan -> Clicks Checkout Deep Link -> Validates Plan ID | High |
| 2 | Wealth Planning SIP Calculation | Adjusts SIP Slider to ₹25,000/mo over 15 yrs @ 15% -> Verifies Wealth Gain & Advisor Alpha comparison -> Opens Lead Modal | High |
| 3 | Regulatory Due Diligence Journey | Inspects Footer -> Navigates to Grievance Matrix -> Verifies Compliance Officer contacts -> Checks SCORES & Smart ODR links | High |
| 4 | Consultation Booking Journey | Opens Consultation Modal -> Enters Invalid Phone/Email -> Observes Validation -> Corrects to Valid -> Submits -> Confetti / Success Feedback | High |
| 5 | Complaints & Disclosures Audit | Navigates to Customer Complaints page -> Verifies SEBI monthly data table -> Checks all 9 Google Drive disclosure links | High |

---

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥5 tests per feature (minimum 95 test assertions across 19 features)
- **Tier 2 (Boundary & Corner Cases)**: ≥5 tests per feature (minimum 95 assertions covering input extremes, empty states, formatting errors)
- **Tier 3 (Cross-Feature Combinations)**: ≥19 tests covering major feature interactions (checkout links matching plan IDs, mobile drawer navigation, calculator to modal data transfer)
- **Tier 4 (Real-World Application Scenarios)**: 5 end-to-end multi-step workflow test scenarios
- **Total Minimum Target**: ~214 comprehensive test assertions
