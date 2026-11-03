# Phase 2 — Post-Deployment Verification & Telemetry Playbook

**Document ID:** `docs/growth-system/15-post-deployment-validation.md`  
**Execution Date:** 2026-11-03  
**Author:** Technical SEO Architect, Analytics Engineer, Senior Full-Stack Architect  
**Status:** Ready to Execute Immediately Following Production Deployment  
**Target Domain:** `https://uzairkhatri.com`

---

## 1. Purpose & Protocol

Once the user approves production deployment and Cloudflare Pages completes the build from `main`, this playbook provides the exact sequence of verification steps to:
1. Confirm live HTTP status and header integrity.
2. Clear the Google Search Console sitemap pending deadlock.
3. Notify IndexNow-enabled search engines (Bing, Yandex, Naver).
4. Verify GA4 event streaming and conversion funnels.
5. Smoke test live contact form delivery via Cloudflare Workers.
6. Establish a rigorous 7-day, 14-day, and 30-day monitoring cadence.

---

## 2. Step-by-Step Post-Deployment Verification

### Step 1: Live HTTP Status & Canonical Header Verification
Verify that production endpoints return clean `200 OK` status codes and accurate canonical tags:

```bash
# Verify homepage returns 200 OK
curl -I https://uzairkhatri.com/

# Verify sitemap returns 200 OK with correct XML content-type
curl -I https://uzairkhatri.com/sitemap.xml

# Verify /audit/ returns 200 OK and inspect its canonical tag
curl -s https://uzairkhatri.com/audit/ | grep -i 'rel="canonical"'
# Expected output: <link rel="canonical" href="https://uzairkhatri.com/audit/"/>

# Verify one of the insights articles
curl -s https://uzairkhatri.com/insights/production-ai-architecture/ | grep -i 'rel="canonical"'
# Expected output: <link rel="canonical" href="https://uzairkhatri.com/insights/production-ai-architecture/"/>

# Verify /book/ continues to 302 redirect cleanly to Calendly
curl -I https://uzairkhatri.com/book/
# Expected output: HTTP/2 302, Location: https://calendly.com/uz-khatri/30min
```

---

### Step 2: Google Search Console Sitemap Resubmission & URL Inspection
Since `public/sitemap.xml` was previously stuck in `isPending: true` due to the `/book/` 302 redirect and `lastmod` timestamps, execute the following in GSC:

1. **Submit Updated Sitemap**:
   - Navigate to Google Search Console -> **Sitemaps** under property `sc-domain:uzairkhatri.com`.
   - In "Add a new sitemap", enter: `sitemap.xml` and click **Submit**.
   - Verify that the submitted URL count displays **19** discovered URLs.
   - Note: Google may take 24 to 72 hours to transition status from "Success" / "Processing" to active indexing.
2. **Priority URL Inspection & Re-crawl Requests**:
   Using the GSC URL Inspection tool, inspect the following priority endpoints and click **Request Indexing**:
   - `https://uzairkhatri.com/` (to crawl updated homepage internal links).
   - `https://uzairkhatri.com/audit/` (to register the corrected canonical tag and title).
   - `https://uzairkhatri.com/insights/production-ai-architecture/` (to index the primary architectural pillar).
   - `https://uzairkhatri.com/insights/ai-agent-guardrails/`
   - `https://uzairkhatri.com/insights/rag-production-checklist/`
   - `https://uzairkhatri.com/insights/ai-agent-evaluation/`

---

### Step 3: Trigger IndexNow Search Engine Notification
Bing and other search engines support immediate crawl notification via the project's IndexNow script:

```bash
# Execute the updated script from repository root
node scripts/ping-indexnow.mjs
```
- **Expected Outcome**:
  - Script reads the 19 canonical URLs.
  - Submits payload containing `host: "uzairkhatri.com"`, `key: "...", and `urlList`.
  - Returns `HTTP 200 OK` or `HTTP 202 Accepted` from `api.indexnow.org`.

---

### Step 4: Google Analytics 4 Realtime & DebugView Validation
Verify that user interactions on newly mounted components trigger events cleanly into GA4 Property `553870935` (`G-1LXS5Z6GJ6`):

1. **Open GA4 Realtime Dashboard**:
   - Navigate to [analytics.google.com](https://analytics.google.com/) -> Reports -> **Realtime**.
2. **Execute In-Browser Smoke Test**:
   - Visit `https://uzairkhatri.com` in Chrome with Google Analytics Debugger extension enabled (or via `?_dbg=1`).
   - Scroll to **Technical Insights & Architecture Notes**; click an article card.
     - Verify event: `page_view` triggered with `page_location: https://uzairkhatri.com/insights/<slug>/`.
   - Scroll to **Selected Work**; click `Read Case Study →` on `ClassFlow`.
     - Verify event: `case_study_view` dispatched with `project_name: classflow`.
   - Click *"Book 30-Min Architecture Call"*.
     - Verify event: `cta_click` with `cta_name: book_call_hero` and `modal_open`.

---

### Step 5: Contact Form Delivery Smoke Test
Verify that lead capture and contact dispatch work end-to-end via the Cloudflare Worker:

1. Navigate to `https://uzairkhatri.com/contact/` (or `/audit/`).
2. Fill out test submission:
   - Name: `Automated QA Smoke Test`
   - Email: `qa-test@uzairkhatri.com`
   - Company: `Verification Test Corp`
   - Message: `Validating Cloudflare Worker routing and lead receipt post-P0 deployment.`
   - Leave `website_hp` honeypot completely blank.
3. Submit form.
4. Verify:
   - UI displays green confirmation modal / toast.
   - GA4 Realtime displays `lead_capture` and `form_submit` events.
   - Target recipient mailbox (`uz.khatri@gmail.com`) receives notification email from `hello@uzairkhatri.com`.

---

## 3. Post-Deployment Monitoring Schedule

| Timeframe | Monitoring Focus | Target Metric / Tool | Success Threshold |
| :--- | :--- | :--- | :--- |
| **Day 1 (Post-Deploy)** | HTTP status codes, edge cache hit ratio, Worker logs | Cloudflare Analytics & Worker tail logs | Zero 5xx errors; 200 OK across all routes. |
| **Day 3** | Search Console sitemap status | GSC Sitemaps report | Status transitions from "Pending" to "Success" with 19 discovered URLs. |
| **Day 7** | Page indexing coverage & crawl budget | GSC Page Indexing report | Indexing requests for `/insights/*` and `/audit/` processed; 0 sitemap errors. |
| **Day 14** | Organic query impressions & click-through | GSC Performance (Search Results) | Non-branded queries for *"production AI architecture"*, *"agent guardrails"*, *"rag checklist"* begin showing impressions. |
| **Day 30** | Recruiter & client conversion funnel | GA4 Conversions & Calendly dashboard | Qualified visits to `/insights/` and `/work/`; increase in audit inquiries and architecture call bookings. |

---

## 4. Anomaly Response & Escalation Protocol

If any anomaly is detected during the monitoring cadence:
- **Sitemap Error in GSC**: Check GSC error details. If a specific URL returns an error, cross-reference against `tests/sitemap.test.cjs`.
- **Worker Delivery Failure**: Inspect Cloudflare Workers dashboard metrics for `functions/api/contact.ts`. Check spam filter or Resend/SendGrid API error logs.
- **Indexing Stalls**: Resubmit specific URLs via GSC URL Inspection and verify robots meta header remains `index, follow`.

