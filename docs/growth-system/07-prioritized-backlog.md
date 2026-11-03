# Prioritized Implementation Backlog & Quality Verification Plan

**Document ID**: GS-DOC-07  
**Target Domain**: https://uzairkhatri.com  
**Auditor**: Principal Growth Engineer & Senior Full-Stack Architect  
**Governance**: Read-Only Audit Mode (Strictly Awaiting User Approval)  

---

## 1. Backlog Prioritization Matrix

Every backlog item below addresses a mathematically verified finding from the Phase 0–6 audits, formatted with root causes, exact file targets, implementation plans, and rollback safeguards.

```mermaid
quadrantChart
    title Action Prioritization by Effort vs. Business Impact
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 High Impact / High Effort (Strategic)
    quadrant-2 High Impact / Low Effort (Quick Wins / P0)
    quadrant-3 Low Impact / Low Effort (Polish)
    quadrant-4 Low Impact / High Effort (Avoid)
    "P0: Fix GSC Sitemap & Remove /book/": [0.15, 0.95]
    "P0: Mount Insights Feed on Home": [0.25, 0.88]
    "P0: Remove Dummy Phone in Schema": [0.10, 0.75]
    "P1: Render Statically All Case Studies": [0.35, 0.85]
    "P1: Instrument Recruiter & Outbound Events": [0.30, 0.80]
    "P1: Recruiter Fast-Track Card": [0.35, 0.78]
    "P2: GitHub Backlinks & UTM Tags": [0.25, 0.65]
    "P2: LinkedIn 30-Day Content Execution": [0.60, 0.70]
    "P3: Growth Dashboard & Automated Cron": [0.65, 0.60]
```

---

## 2. P0: Broken Experiences, Indexing Blockers & Integrity Defects

### Task P0-01: Resolve GSC Sitemap Deadlock & Strip `/book/` from XML Sitemap
- **Evidence & Root Cause**: `public/sitemap.xml:15` includes `https://uzairkhatri.com/book/` with priority `0.8`. However, `worker/index.ts:32` intercepts this with a 302 redirect to Calendly, and `app/book/page.tsx:8` sets `robots: { index: false }`. GSC Sitemaps API shows `isPending: true` since Oct 15, 2026, and URL inspection confirms all subpages are "unknown to Google".
- **Target Audience & Intended Outcome**: Search engines; enables Googlebot to parse `sitemap.xml` cleanly and index all 17 subpages.
- **Exact Files Affected**: `public/sitemap.xml`, `scripts/ping-indexnow.mjs`.
- **Implementation Approach**:
  1. Remove `<url><loc>https://uzairkhatri.com/book/</loc>...</url>` from `public/sitemap.xml`.
  2. Update `scripts/ping-indexnow.mjs` to remove `/book/` from the URL list.
  3. Validate XML schema syntax.
  4. Submit refreshed sitemap via GSC API / Search Console interface.
- **Dependencies & Rollback**: Zero runtime dependencies. Rollback is a single `git checkout public/sitemap.xml`.
- **Test Instructions & Success Criteria**: Run XML linter. Verify `public/sitemap.xml` has 19 canonical 200 OK URLs. GSC API reports `"isPending": false` and `"errors": "0"`.
- **Risk & Effort**: Risk: Very Low. Effort: **30 minutes**.

### Task P0-02: Fix Schema.org Phone Placeholder in `serviceSchema`
- **Evidence & Root Cause**: `components/JsonLd.tsx:41` contains `"telephone": "+923000000000"`, an obvious dummy phone placeholder in `ProfessionalService`. Google Rich Results algorithms flag placeholder phone numbers as deceptive structured data.
- **Target Audience & Intended Outcome**: Google Knowledge Graph / Rich Results; prevents structured data penalties.
- **Exact Files Affected**: `components/JsonLd.tsx`.
- **Implementation Approach**: Remove the `telephone` field from `serviceSchema` while preserving `email: "hello@uzairkhatri.com"`, physical geo coordinates, and offer catalog.
- **Dependencies & Rollback**: Zero dependencies. Rollback via git.
- **Test Instructions & Success Criteria**: Run Google Rich Results Test / Schema Validator against rendered output; verify zero syntax warnings and zero dummy fields.
- **Risk & Effort**: Risk: None. Effort: **15 minutes**.

### Task P0-03: Reconnect Technical Essays to Homepage Internal Link Graph
- **Evidence & Root Cause**: `components/Writing.tsx` exists with 4 essay summaries but is completely omitted from `app/page.tsx`. GSC inspection confirms `/insights/` and all 4 child essays are `URL is unknown to Google`.
- **Target Audience & Intended Outcome**: Search crawlers & CTOs; passes homepage internal PageRank directly to the 4 technical essays and increases time on site.
- **Exact Files Affected**: `app/page.tsx`, `components/Writing.tsx`, `components/Writing.module.css`.
- **Implementation Approach**:
  1. Update `components/Writing.tsx` to link directly to the local canonical insight URLs (`/insights/production-ai-architecture/`, `/insights/ai-agent-guardrails/`, `/insights/rag-production-checklist/`, `/insights/ai-agent-evaluation/`) rather than external LinkedIn generic links.
  2. Import and mount `<Writing />` inside `app/page.tsx` right above `WorkingWithUzair`.
- **Dependencies & Rollback**: Clean component mount. Rollback via git revert.
- **Test Instructions & Success Criteria**: Inspect homepage DOM to verify direct `<a>` tags with `href="/insights/<slug>/"`. Verify Next.js builds cleanly with zero layout shift.
- **Risk & Effort**: Risk: Low. Effort: **1.5 hours**.

---

## 3. P1: High-Impact Positioning, Critical UX Journeys & Technical SEO

### Task P1-01: Render All Case Studies Statically in `SelectedWork.tsx`
- **Evidence & Root Cause**: In `components/SelectedWork.tsx`, only the active tab (`activeProject`) outputs an HTML `<a>` tag to `/work/<slug>`. Projects 02, 03, and 04 are hidden behind React client state. Web crawlers parsing initial HTML miss the internal links.
- **Target Audience & Intended Outcome**: Search engine crawlers and scanning visitors; ensures all 4 case study pages are discovered and indexed.
- **Exact Files Affected**: `components/SelectedWork.tsx`, `components/SelectedWork.module.css`.
- **Implementation Approach**: Refactor component so all 4 project cards render standard semantic HTML `<a>` tags in the DOM with progressive enhancement, while retaining the interactive preview tab on desktop. Normalize URLs with trailing slashes.
- **Dependencies & Rollback**: CSS adjustments for responsive layout.
- **Test Instructions & Success Criteria**: View rendered HTML without JavaScript enabled; confirm `<a href="/work/wellows/">`, `<a href="/work/classflow/">`, `<a href="/work/savyour/">`, and `<a href="/work/efu-life/">` are present in source markup.
- **Risk & Effort**: Risk: Low. Effort: **2.5 hours**.

### Task P1-02: Instrument Missing Recruiter & Outbound Analytics Events
- **Evidence & Root Cause**: GA4 baseline records 0 recruiter CTA clicks, 0 GitHub clicks, and 0 LinkedIn clicks. The client cannot measure recruiter vs client traffic.
- **Target Audience & Intended Outcome**: Analytics attribution; enables tracking recruiter conversion funnels in GA4.
- **Exact Files Affected**: `components/analytics.ts`, `components/SiteAnalytics.tsx`, `tests/analytics.test.cjs`.
- **Implementation Approach**:
  1. Add outbound click detection in `trackLinkClick` for `github.com` and `linkedin.com`.
  2. Add `recruiter_cta_click` and `resume_download` tracking when users click CV download links.
  3. Add `contact_form_start` on first interaction.
  4. Expand `tests/analytics.test.cjs` with unit test cases for each new event.
- **Dependencies & Rollback**: Must pass `npm run test:analytics`.
- **Test Instructions & Success Criteria**: `npm run test:analytics` passes 100%. In GA4 DebugView, clicking CV generates `resume_download` with parameter `file_name: "Uzair-Iqbal-AI-Architect-CV.pdf"`.
- **Risk & Effort**: Risk: Very Low. Effort: **2 hours**.

### Task P1-03: Add Recruiter Fast-Track Profile Card on Homepage
- **Evidence & Root Cause**: Enterprise recruiters spend an average of 15 seconds evaluating a profile. Currently, they must scroll through the entire page or open a PDF to discover target roles, remote availability, and timezone alignment.
- **Target Audience & Intended Outcome**: Executive recruiters & Talent Partners; increases CV downloads and recruiter interview inquiries.
- **Exact Files Affected**: `components/RecruiterCard.tsx` (new), `app/page.tsx`, `components/RecruiterCard.module.css`.
- **Implementation Approach**: Create a high-contrast, compact card in the `About` or `Timeline` section:
  - Open Roles: *Principal AI Systems Architect, Staff Distributed Systems Engineer, Fractional CTO*.
  - Work Modes: *Global Remote, Contract / FTE, Dubai / GCC (GST) & US East overlap*.
  - Fast Actions: `[Download Full CV (PDF)]` and `[Email Directly]`.
- **Dependencies & Rollback**: Modular component addition.
- **Test Instructions & Success Criteria**: Verified on mobile, tablet, and desktop viewports. Check contrast ratios exceed 4.5:1.
- **Risk & Effort**: Risk: Low. Effort: **2 hours**.

---

## 4. P2: Credibility, Case Studies, GitHub & LinkedIn Alignment

### Task P2-01: Synchronize GitHub Repository READMEs with Case Study Cross-Links
- **Evidence & Root Cause**: Zero visitors arrived from GitHub in 28 days despite 5 public repositories. Repositories lack standardized callout cards linking back to the deep-dive architecture case studies on `uzairkhatri.com`.
- **Target Audience & Intended Outcome**: Technical peers & hiring managers inspecting code; converts repository stars and clones into website case study readers.
- **Exact Repos Affected**: `production-rag-reference`, `high-throughput-event-platform`, `production-ai-readiness`, `fastapi-ai-team`.
- **Implementation Approach**: Add clean markdown footer banners with UTM parameters (`?utm_source=github&utm_medium=readme&utm_campaign=...`).
- **Dependencies & Rollback**: Git commits on respective repositories.
- **Test Instructions & Success Criteria**: Click link in GitHub README; verify GA4 records session with source `github.com` and campaign attribution.
- **Risk & Effort**: Risk: Zero. Effort: **1.5 hours**.

### Task P2-02: Execute the 30-Day LinkedIn Content Strategy
- **Evidence & Root Cause**: Only 2 sessions came from LinkedIn in 28 days due to irregular technical publishing.
- **Target Audience & Intended Outcome**: Founders, CTOs, and engineering leaders; drives consistent weekly qualified traffic.
- **Exact Files Affected**: `docs/growth-system/08-content-calendar.md`.
- **Implementation Approach**: Publish 3 posts per week following the pre-approved 12-post bank and 2 carousel blueprints, manually approved and published with UTM links.
- **Dependencies & Rollback**: Human review before every post.
- **Test Instructions & Success Criteria**: Verify GA4 records > 25 weekly active users from `linkedin.com / referral`.
- **Risk & Effort**: Risk: None. Effort: **1.5 hours per week**.

---

## 5. P3: Growth Intelligence Automation & Experimentation

### Task P3-01: Build Automated Daily Growth Intelligence Ingestion Pipeline
- **Evidence & Root Cause**: Analytics data requires manual API queries or logging into disparate dashboards (GA4, GSC).
- **Target Audience & Intended Outcome**: Uzair (Solo Operator); provides automated weekly summaries and real-time anomaly alerts without manual maintenance.
- **Exact Files Affected**: `scripts/growth/ingest.mjs`, `scripts/growth/generate-summary.mjs`, `package.json`.
- **Implementation Approach**: Standalone Node CLI script reading local service account keys, querying GSC/GA4, and producing a markdown summary in `docs/growth-system/reports/weekly-summary.md`.
- **Dependencies & Rollback**: Isolated scripts directory.
- **Test Instructions & Success Criteria**: Run `npm run growth:digest` locally; verify markdown report generated with live trailing 7-day and 28-day deltas.
- **Risk & Effort**: Risk: Zero. Effort: **3.5 hours**.

---

## 6. Comprehensive Test & Validation Requirements

| Verification Area | Test Methodology | Tool / Command | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Unit Test Suite** | Isolated browser VM simulation | `npm run test:analytics` | 100% tests pass (17+ tests), 0 regressions |
| **Static Build Verification** | Next.js SSG Export | `npm run build` | Exits code 0; generates all 19 HTML bundles in `out/` |
| **Schema Validation** | Google Rich Results API | Structured Data Linter | Valid `Person`, `ProfilePage`, `TechArticle`; 0 errors, 0 placeholder values |
| **WCAG 2.2 Accessibility** | Axe / Lighthouse headless | Chromium Lab Audit | Zero contrast violations; all interactive elements focusable; aria labels intact |
| **Responsive Verification** | Multi-device layout check | 375px (Mobile), 768px (Tablet), 1440px (Desktop) | No horizontal overflow (`overflow-x: hidden`); touch targets ≥ 44px |
| **Form & Spam Protection** | Honeypot injection test | POST to `/api/contact` with `_gotcha="bot"` | Returns 200 OK fake success; 0 emails sent; 0 GA4 events emitted |
| **Search Engine Discovery** | GSC URL Inspection | Google Search Console API | `robotsTxtState: "ALLOWED"`, sitemap status `"isPending": false` |

