# System Inventory, Stack Architecture & Evidence Ledger

**Document ID**: GS-DOC-00  
**Domain**: https://uzairkhatri.com  
**Audit Date**: November 3, 2026  
**Auditor Mode**: Principal Growth Engineer & Full-Stack Architect (Read-Only Discovery)  

---

## 1. System Inventory & Infrastructure Overview

### 1.1 Technical Stack & Framework Versions
- **Core Framework**: Next.js `15.3.3` (App Router, static export mode).
- **Runtime & UI**: React `19.0.0`, React DOM `19.0.0`, Framer Motion `12.40.0`.
- **Styling**: Tailwind CSS `3.4.17`, PostCSS `8.5.4`, CSS Modules (Bespoke theme tokens).
- **Language**: TypeScript `5.8.3` (Strict mode enabled, ES2017 target).
- **Edge Runtime & Serverless**: Cloudflare Workers Static Assets (`wrangler` `4.131.1`, compatibility date `2026-09-11`).
- **Build Output**: `out/` (Static HTML/CSS/JS export via `output: "export"`, `trailingSlash: true`).
- **Repository Architecture**: Dual-purpose repository (`origin: https://github.com/uzairkhatri/uzairkhatri.git`). The root `README.md` acts as the canonical GitHub Special Profile README for `@uzairkhatri`, while the same repository contains the portfolio source code and Worker scripts.

### 1.2 Deployment & Cloud Infrastructure
- **Primary Hosting**: Cloudflare Workers with Static Assets binding (`ASSETS -> out/`).
- **Cloudflare Worker Dispatcher**: `worker/index.ts` intercepts incoming edge traffic:
  - Handles `GET /book` and `GET /book/` via HTTP 302 redirect to `https://calendly.com/uz-khatri/30min`.
  - Handles `POST /api/audit` via Cloudflare Email Routing (`EMAIL.send` binding to destination `uz.khatri@gmail.com` with sender `hello@uzairkhatri.com`). Honeypot bot protection via `_gotcha`.
  - Handles `POST /api/contact` via Cloudflare Email Routing (`EMAIL.send` to `uz.khatri@gmail.com`). Honeypot bot protection via `_gotcha`.
  - Forwards all remaining GET requests to static assets via `env.ASSETS.fetch(request)`.
- **Auxiliary CI/CD**: `.github/workflows/deploy-pages.yml` (automates static build and deployment to GitHub Pages upon push to `main`).
- **Security & Edge Headers**: `public/_headers` configures:
  - Strict-Transport-Security: `max-age=31536000; includeSubDomains; preload`
  - Content-Security-Policy (CSP): Whitelists `'self'`, `'unsafe-inline'`, `https://www.googletagmanager.com`, `https://assets.calendly.com`, `https://static.cloudflareinsights.com`, `https://formspree.io`, `https://www.google-analytics.com`, `https://analytics.google.com`.
  - X-Frame-Options: `SAMEORIGIN`
  - Referrer-Policy: `strict-origin-when-cross-origin`

### 1.3 Environment Variables
- **Detected Variable Names**:
  - `NEXT_PUBLIC_BASE_PATH`: Configured in `next.config.mjs`, `components/siteLinks.ts`, and `.github/workflows/deploy-pages.yml`. Empty string in production root domain; dynamically injected in GitHub Pages staging.
  - `GA4_PROPERTY_ID`: Declared in `.agents/mcp_config.json` (`553870935`).
  - `GSC_SITE_URL`: Declared in `.agents/mcp_config.json` (`sc-domain:uzairkhatri.com`).
  - `GOOGLE_APPLICATION_CREDENTIALS`: Supported in `.agents/ga4_server.mjs` and `.agents/gsc_server.mjs`.
- **Security Audit of Secrets**: No `.env` or `.env.local` files exist in the repository root or version control. Local Service Account keys reside in `.agents/ga-credentials.json` and `.agents/gsc-credentials.json`. Live GA4 server logs confirm repeated unauthorized probe attempts from external bots targeting `/.env`, `/.env.local`, and `/.git/config`, all correctly returned 404 or intercepted by Cloudflare.

---

## 2. Canonical Profile & Asset Discovery

Every canonical URL below has been verified via source code, configuration files, and live repository links:

| Entity | Canonical Target URL | Source Verification |
| :--- | :--- | :--- |
| **Website (Root Canonical)** | `https://uzairkhatri.com` | `app/layout.tsx:8`, `public/sitemap.xml`, GSC property |
| **LinkedIn Profile** | `https://www.linkedin.com/in/uzair-khatri` | `components/Contact.tsx:10`, `Footer.tsx:16`, `README.md:11` |
| **GitHub Profile** | `https://github.com/uzairkhatri` | `README.md:9-14`, git remote origin |
| **Calendly Booking** | `https://calendly.com/uz-khatri/30min` | `components/siteLinks.ts:1`, `worker/index.ts:32` |
| **Upwork Profile** | `https://www.upwork.com/freelancers/~016ea0db5e9fc0e887` | `components/siteLinks.ts:4` |
| **Contact Email** | `hello@uzairkhatri.com` | `components/siteLinks.ts:3`, `worker/index.ts:182` |
| **Internal Routing Email** | `uz.khatri@gmail.com` | `wrangler.jsonc:14`, `worker/index.ts:181` |
| **Resume / CV PDF** | `https://uzairkhatri.com/Uzair-Iqbal-AI-Architect-CV.pdf` | `public/Uzair-Iqbal-AI-Architect-CV.pdf`, `siteLinks.ts:16` |

---

## 3. Site Architecture & Route Inventory

The site comprises 18 static application routes, 2 Cloudflare Worker API routes, and 7 root discovery/crawler assets:

```text
https://uzairkhatri.com/
├── / (Homepage: Hero, Ecosystem, Manifesto, Work, About, Services AEO, Timeline, FAQ, Contact)
├── /services/
│   ├── /services/ai-systems/ (Enterprise AI Architecture & Core Services)
│   ├── /services/ai-agents/ (Multi-Agent Runtimes & LangGraph State Systems)
│   ├── /services/saas-architecture/ (High-Throughput Backends & Concurrency)
│   └── /services/ai-audit/ (2-Week AI Diagnostic & Production Pre-Mortem Sprint)
├── /case-studies/ (Case Studies Hub)
├── /work/
│   ├── /work/production-rag/ (Flagship Reference Architecture: FastAPI + Hybrid RAG + CI Evals)
│   ├── /work/wellows/ (Multi-Agent Brand Citation Monitoring & Automated Remediation)
│   ├── /work/classflow/ (EdTech Tutoring SaaS: Redis Redlock + Stripe Connect)
│   ├── /work/savyour/ (Fintech Affiliate Rewards & ACID Transaction Ledger)
│   └── /work/efu-life/ (Enterprise Regulated Insurance Workflow Modernization)
├── /insights/ (Architecture Notes & Technical Essays Hub)
│   ├── /insights/production-ai-architecture/ (The Shift From Prototype to System)
│   ├── /insights/ai-agent-guardrails/ (Deterministic Guardrails for Probabilistic Agents)
│   ├── /insights/rag-production-checklist/ (Beyond Naive Vector Search)
│   └── /insights/ai-agent-evaluation/ (Evaluating Multi-Agent Systems in Production)
├── /audit/ (Interactive Pre-Mortem Audit Intake & Topology Visualizer)
├── /strategy-call/ (Targeted 30-min Architecture Consultation Landing Page)
├── /ai-playbook/ (5-Layer Production AI Readiness Framework)
├── /book/ (302 Redirect & Fallback Client to Calendly; marked noindex)
└── Root Discovery & Compliance Files:
    ├── /robots.txt (Crawler allowances for standard + AI bots)
    ├── /sitemap.xml (XML URLSet: 20 listed routes)
    ├── /llms.txt (Standardized LLM context summary)
    ├── /llms-full.txt (Detailed architecture breakdown for LLM agents)
    ├── /.well-known/security.txt (Vulnerability disclosure policy)
    ├── /85a92cfb19d44e83bf65882b7d29ae70.txt (IndexNow verification key)
    └── /Uzair-Iqbal-AI-Architect-CV.pdf (Canonical resume download)
```

---

## 4. Analytics, Verification & API Capabilities

### 4.1 Google Analytics 4 (GA4) Configuration
- **Property ID**: `553870935` (Google Cloud Project: `uzairkhatriwebsite`).
- **Data Stream Measurement ID**: `G-1LXS5Z6GJ6`.
- **Implementation Mechanism**: `components/SiteAnalytics.tsx` loads `https://www.googletagmanager.com/gtag/js?id=G-1LXS5Z6GJ6` using Next.js `Script` (`strategy="lazyOnload"`).
- **Collection Boundaries & Filtering**:
  - Gtag only initializes if `window.location.protocol === "https:"` AND `hostname` matches `uzairkhatri.com` or `www.uzairkhatri.com`.
  - Localhost, IP addresses, and preview environments are strictly disabled.
  - Testing toggle: Visiting `https://uzairkhatri.com/?analytics=off` sets local storage flag `portfolio-analytics-disabled=true` and disables `gtag`.
- **Active Tracked Events**:
  - `generate_lead`: Emitted on successful `POST /api/contact` dispatch (includes `lead_type`, `method`, `value: 1`).
  - `audit_request`: Emitted on successful `POST /api/audit` dispatch (includes `stack`, `bottleneck`, `value: 1`).
  - `booking_click`: Emitted on left/auxclick pointing to Calendly booking URL (includes `source`, `page_path`).
  - `case_study_click`: Emitted on clicks to internal `/work/<slug>` routes.
- **Untracked Business Events**: `recruiter_cta_click`, `resume_download`, `github_outbound_click`, `linkedin_outbound_click`, `email_click`, `contact_form_start`, and distinct `case_study_view` events are currently absent or rely solely on automatic GA4 enhanced measurement.

### 4.2 Google Search Console (GSC) Configuration
- **Property URL**: `sc-domain:uzairkhatri.com` (Domain property).
- **Service Account Access**: `uzairkhatriwebsite.iam.gserviceaccount.com` has active read-only authorization.
- **Submitted Sitemaps**: `https://uzairkhatri.com/sitemap.xml` submitted on October 15, 2026.
- **IndexNow API**: Key file `85a92cfb19d44e83bf65882b7d29ae70.txt` present in `public/` and automated submission script `scripts/ping-indexnow.mjs` targets Bing, Yandex, Seznam, and Naver.

---

## 5. Evidence Ledger

Every observation below is backed by verified file paths, live API responses, or repository inspection.

| Finding ID | Source | Observed Behavior | Evidence | Severity | Business Impact | Confidence | Proposed Fix | Validation Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ELD-01** | GSC Inspection API | Subpages unknown to Google (`case-studies`, `production-rag`, `insights`, `services`) | `coverageState: "URL is unknown to Google"`, `verdict: "NEUTRAL"` across tested subpages | **Critical (P0)** | Subpages get zero organic impressions or search discovery | 100% | Fix sitemap blockers, add homepage crawl links, resubmit GSC index | GSC URL Inspection API & index status report |
| **ELD-02** | GSC Sitemaps API | XML sitemap is stuck in pending status since Oct 15, 2026 | `"isPending": true`, `"lastSubmitted": "2026-10-15T15:14:03Z"` | **High (P0)** | Google has not processed sitemap URLs for automated discovery | 100% | Remove redirected/noindex `/book/` from sitemap, resubmit clean sitemap | GSC Sitemaps API returns `"isPending": false`, `"warnings": 0` |
| **ELD-03** | Local Code & GSC | `/book/` submitted in `sitemap.xml` has `noindex` and 302 redirect to Calendly | `app/book/page.tsx:8` (`robots: { index: false }`), `worker/index.ts:32`, `sitemap.xml:15` | **High (P0)** | Signals conflicting directives to crawlers, harming sitemap parsing | 100% | Remove `/book/` from `sitemap.xml`; keep Calendly link direct on CTAs | Inspect `public/sitemap.xml` and GSC coverage report |
| **ELD-04** | Local Code (`page.tsx`) | `Writing.tsx` component is completely omitted from homepage | `app/page.tsx:1-40` lacks `Writing` import; essays invisible on root route | **High (P1)** | Technical authority and internal PageRank to `/insights/` articles are severed | 100% | Reintroduce `Writing.tsx` or an Insights feed with direct links to the 4 essays | DOM inspection & link graph crawl of `/` |
| **ELD-05** | Local Code (`SelectedWork.tsx`) | Non-active case studies not rendered as HTML anchor tags | `SelectedWork.tsx:434-438` only outputs `<a>` for `activeProject` | **High (P1)** | Googlebot cannot discover or crawl unselected case study tabs | 100% | Render standard semantic HTML links for all case study projects in markup | View Source / DOM snapshot before JS interaction |
| **ELD-06** | Local Code (`SelectedWork.tsx`) | URL trailing slash inconsistency in project links | `caseStudyUrl: "/work/wellows"` vs `next.config.mjs` `trailingSlash: true` | **Medium (P1)** | Causes unnecessary client/server redirect hops | 100% | Normalize all internal links in `SelectedWork.tsx` to include trailing slashes | Link verification script checking 200 OK without 301/308 |
| **ELD-07** | Local Code (`JsonLd.tsx`) | Placeholder dummy phone number in schema markup | `components/JsonLd.tsx:41`: `"telephone": "+923000000000"` | **Medium (P1)** | Damages Schema.org validity and entity trust signals in search engines | 100% | Remove dummy telephone property or replace with valid inquiry contact | Google Rich Results Test API / Schema Validator |
| **ELD-08** | GA4 API Measurement | Missing key recruiter and developer tracking events | `GA4 events_28d` shows only `booking_click` (3) and `file_download` (2); 0 GitHub/LinkedIn click events | **Medium (P1)** | Impossible to measure recruiter vs enterprise client acquisition channels | 100% | Instrument `recruiter_cta_click`, `resume_download`, `github_outbound_click`, `linkedin_outbound_click` | `npm run test:analytics` and GA4 DebugView validation |
| **ELD-09** | GSC URL Inspection | Homepage not recrawled by Googlebot for ~7 weeks | `lastCrawlTime: "2026-09-14T11:27:10Z"` | **Medium (P1)** | Recent content and architectural updates are not refreshed in Google index | 100% | Ping IndexNow, submit updated sitemap, request re-crawl in GSC | GSC Inspection `lastCrawlTime` updates |
| **ELD-10** | GA4 Real-time / Log Audit | External bot scans probing sensitive files (`/.env`, `/.git/config`) | Top GA4 pages include `/.env`, `/.env.local`, `/.env.production`, `/.git/config` (1 hit each) | **Low (P2)** | Noise in analytics, potential attack surface if misconfigured | 100% | Verify Cloudflare WAF block rules and filter non-application paths from GA4 | Cloudflare WAF analytics and GA4 page filter |

