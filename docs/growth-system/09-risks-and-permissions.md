# Permissions Matrix, Risk Governance & Data Integrity Protocol

**Document ID**: GS-DOC-09  
**Target Domain**: https://uzairkhatri.com  
**Auditor**: Principal Security Engineer & Senior Full-Stack Architect  
**Governance Scope**: API Authentication, Secret Hygiene, Quota Management, Compliance Boundaries  

---

## 1. Connector Permissions & Authentication Matrix

| Service / API | Integration Type | Auth Credential Storage | Scopes & Permissions | Status & Verification | Fallback / Resolution Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Google Search Console** | Google Cloud Service Account | `.agents/gsc-credentials.json` | `https://www.googleapis.com/auth/webmasters.readonly` | **Verified Active** (OAuth JWT token exchanges successfully) | Read-only scope; zero write or deletion permissions. |
| **Google Analytics 4** | Google Cloud Service Account | `.agents/ga-credentials.json` | `https://www.googleapis.com/auth/analytics.readonly` | **Verified Active** (Data API v1beta queries execute cleanly) | Read-only scope; property ID `553870935`. |
| **Cloudflare Workers** | Cloudflare Email Binding & Assets | `wrangler.jsonc` (Edge bindings) | `EMAIL` binding (`uz.khatri@gmail.com`), `ASSETS` binding | **Verified Active** in production | Governed by Cloudflare API token stored securely in Cloudflare Dashboard. |
| **IndexNow Network** | HTTP POST API with verification file | `public/85a92cfb19d44e83bf65882b7d29ae70.txt` | Key file hosting at `https://uzairkhatri.com/<key>.txt` | **Verified Active** (`scripts/ping-indexnow.mjs`) | Instant submission to Bing, Yandex, Seznam, Naver. |
| **GitHub REST API** | Personal Access Token (PAT) | Local environment variable / secret | `repo` scope (Traffic API: `/repos/:owner/:repo/traffic/views`) | **Access Limitation (Blocked)**: Requires fine-grained PAT with read-only repository traffic access. | **Safe Resolution**: Generate a GitHub Fine-Grained Personal Access Token with read-only access to Repository Traffic for `uzairkhatri/*`. |
| **LinkedIn Ingestion** | Manual CSV Export / Activity Intake | Local structured files in `docs/growth-system/data/` | Public post statistics | **Permitted Manual Process**: Strictly avoids unofficial scraping or automated session cookies. | **Compliance Rule**: Never implement headless Puppeteer scrapers or auto-connect bots; strictly use official export workflows. |

---

## 2. API Quotas, Rate Limits & Data Retention Boundaries

### 2.1 Google Analytics 4 (GA4)
- **API Token Quota**: 25,000 tokens per project per day. Our planned daily batch report consumes ~15 tokens per run (<0.1% of daily allowance).
- **Data Retention Boundary**: Default GA4 data retention is often set to **2 months**.  
  *Actionable Recommendation*: Verify in GA4 Admin -> Data Settings -> Data Retention that event data is set to **14 months** to maintain trailing annual baseline comparisons.

### 2.2 Google Search Console (GSC)
- **API Quota**: 1,200 queries per minute per site; 100,000 queries per day. Daily ingestion consumes ~10 queries per run.
- **Reporting Latency**: GSC data has an inherent 48-to-72-hour processing lag. Ingestion pipelines must query with an offset (`today - 3 days`) to avoid capturing incomplete daily partitions.
- **Data Retention**: GSC preserves 16 months of historical search data.

### 2.3 GitHub Repository Traffic Retention
- **Critical Retention Limit**: GitHub only stores repository traffic (pageviews, unique visitors, clones) for **14 trailing days**.
- If traffic is not captured and archived daily/weekly into local storage or Cloudflare D1, older repository traffic data is permanently lost.

---

## 3. Security Hygiene & Zero-Leakage Boundaries

1. **Server-Side Secret Isolation**:  
   All Google Cloud service account keys (`.agents/*.json`) and future GitHub tokens must remain strictly outside version control. The `.gitignore` must continue to enforce exclusion of `.agents/`, `.env*`, and credential files.
2. **Zero Client-Side Token Exposure**:  
   No API keys, private keys, or service account tokens are ever bundled into client-facing Next.js code or public static HTML files in `out/`.
3. **Bot & Abuse Mitigation**:  
   - Both `/api/contact` and `/api/audit` endpoints on the Cloudflare Worker implement silent honeypot filtering (`_gotcha`).
   - String truncation is strictly applied on edge input bodies (`name.slice(0, 100)`, `message.slice(0, 3000)`) to prevent payload bloat attacks.
   - HTML injection prevention: All user input injected into dispatch emails is strictly sanitized using `escapeHtml()` in `worker/index.ts:17-24`.

---

## 4. Change Risk Assessment & Rollback Protocols

| Proposed Modification | Risk Level | Potential Failure Mode | Safeguard & Rollback Plan |
| :--- | :--- | :--- | :--- |
| **Sitemap XML Fix (Removing `/book/`)** | **Low** | Malformed XML syntax or crawler indexing delay. | Validate syntax with `xmllint` before commit. Rollback via `git checkout public/sitemap.xml`. |
| **Schema.org Telephone Removal** | **Very Low** | None (removing invalid dummy data). | Validate rendered JSON-LD in Google Rich Results Test tool. Rollback via `git checkout components/JsonLd.tsx`. |
| **Mounting `<Writing />` on Homepage** | **Low** | Styling conflict or layout shift on mobile viewports. | Test build with `npm run build` and mobile viewport inspection (375px). Rollback via git. |
| **Static Anchors in `SelectedWork.tsx`** | **Medium** | Breaking Framer Motion animation or CSS tab selector layout. | Keep existing tab animations for interactive desktop users while adding static semantic links in markup. Rollback via git. |
| **Analytics Event Expansion** | **Low** | Event name duplication or double-firing. | Single event listener model; full test coverage in `tests/analytics.test.cjs`. Rollback via git. |
| **Cloudflare Worker Updates** | **High** | Email routing failure or static asset routing break. | Run local `wrangler dev` smoke tests. Test contact form dispatch to verify `EMAIL.send` functions before `wrangler deploy`. |

---

## 5. Compliance & Brand Boundaries

- **Brand Independence**: Uzair Khatri's personal brand is strictly independent of his agency **Insxoft**. No client work, blog posts, case studies, or metadata will mention or conflate Insxoft with Uzair’s personal advisory, architecture, and career portfolio.
- **Evidence-First Claim Verification**: No marketing claims regarding performance benchmarks, client outcomes, or upstream contributions may be published unless supported by runnable code, public pull requests, or verified production case study metrics.

