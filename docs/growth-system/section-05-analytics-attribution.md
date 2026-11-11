# Section 05 — GA4 Analytics, Search Console & Attribution Verification

**Date:** November 11, 2026  
**GA4 Property:** `G-1LXS5Z6GJ6` (`SiteAnalytics.tsx` + `components/analytics.ts`)  
**Search Console Property:** `sc-domain:uzairkhatri.com`  

---

## 1. Live Telemetry Baseline (Read-Only MCP Queries, November 11, 2026)

### 1.1 Google Analytics 4 (`google-analytics` MCP)
- **Realtime (`get_ga4_realtime_users`):** `0` active users during probe window.
- **Trailing 30 Days (`30daysAgo` to `today` via `get_ga4_traffic_overview`):**
  - `activeUsers`: `106`
  - `newUsers`: `106`
  - `sessions`: `106`
  - `screenPageViews`: `133`
  - `totalEngagementSeconds`: `675` (~6.4s avg engagement per session)
- **Top Viewed Paths (`get_ga4_top_pages`, `30daysAgo` to `today`):**
  - `/`: `72` views (`67` users)
  - `/services/ai-systems/`: `27` views
  - `/case-studies/`: `25` views
  - `/audit/`: `2` views
  - `/insights/`: `2` views
  - `/services/ai-audit/`: `1` view
  - Scanner `404` probes recorded: `/.env`, `/.env.local`, `/.env.production`, `/.git/config` (`1` view each — RootLayout initializes `SiteAnalytics` on exported `404.html` pages).

### 1.2 Google Search Console (`google-search-console` MCP)
- **Sitemap (`get_gsc_sitemaps` on `sc-domain:uzairkhatri.com`):**
  - URL: `https://uzairkhatri.com/sitemap.xml`
  - `lastSubmitted`: `2026-11-04T11:31:15.269Z`
  - Status: `isPending: true`, `warnings: "0"`, `errors: "0"`
- **Search Performance (`get_gsc_search_analytics`, `2026-10-12` to `2026-11-09`, dimension `page`):**
  - `https://uzairkhatri.com/`: `clicks: 0`, `impressions: 6`, `position: "3.3"`
- **URL Inspection (`inspect_gsc_url`):**
  - `https://uzairkhatri.com/`: `verdict: "PASS"`, `coverageState: "Submitted and indexed"`, `googleCanonical: "https://uzairkhatri.com/"`, `lastCrawlTime: "2026-09-14T11:27:10Z"` (stale crawl predating November redesign).
  - `https://uzairkhatri.com/audit/`: `verdict: "NEUTRAL"`, `coverageState: "URL is unknown to Google"` (high priority for manual GSC URL inspection & indexing request after final deploy).

---

## 2. Privacy, Opt-Out & Environment Safeguards

Implemented in [components/analytics.ts](file:///d:/xamp/htdocs/uzairkhatri/components/analytics.ts#L15-L61):

1. **Strict Origin Gating (`isAnalyticsAllowed`):** Requires `window.location.protocol === "https:"` and exact hostname `uzairkhatri.com` or `www.uzairkhatri.com`. Localhost, preview origins, and local static tests fail closed (`window["ga-disable-G-1LXS5Z6GJ6"] = true`, `window.gtag` uninitialized).
2. **Owner / QA Opt-Out Flag:** Visiting `?analytics=off` writes `localStorage["portfolio-analytics-disabled"] = "true"` across sessions; `?analytics=on` clears it. Failing storage access also fails closed.
3. **Zero PII in Event Payloads:** Names, emails, free-text inquiry messages, full external query strings, and Calendly invitee emails/URIs are never passed to `window.gtag("event", ...)`.

---

## 3. Complete 9-Event Conversion & Attribution Map (1:1 Zero Double Counting)

Verified across [components/analytics.ts](file:///d:/xamp/htdocs/uzairkhatri/components/analytics.ts#L63-L192), [BookingModal.tsx](file:///d:/xamp/htdocs/uzairkhatri/components/BookingModal.tsx), [Contact.tsx](file:///d:/xamp/htdocs/uzairkhatri/components/Contact.tsx), and [app/audit/page.tsx](file:///d:/xamp/htdocs/uzairkhatri/app/audit/page.tsx):

| Event Name | Trigger Condition | Parameters Sent | Double-Count Guard |
| :--- | :--- | :--- | :--- |
| **`generate_lead`** | [`trackLeadSubmission`](file:///d:/xamp/htdocs/uzairkhatri/components/analytics.ts#L63-L71) after confirmed `/api/contact` `{ success: true, dispatched: true, referenceId }` | `event_category: "Conversion"`, `event_label`, `lead_type`, `method: "api_contact"`, `value: 1` | Honeypot `_gotcha` skips dispatch & analytics; `submitting.current` blocks concurrent retries. |
| **`audit_request`** | [`trackAuditSubmission`](file:///d:/xamp/htdocs/uzairkhatri/components/analytics.ts#L73-L81) after confirmed `/api/audit` dispatch | `event_category: "Conversion"`, `event_label`, `stack`, `bottleneck`, `value: 1` | Only emits on confirmed backend acceptance (`referenceId` returned). |
| **`booking_click`** | Primary/middle click (`auxclick` button `1`) matching normalized `BOOKING_URL` (`origin + pathname` ignoring query/trailing slash) | `event_category: "Conversion"`, `event_label: source`, `source`, `page_path`, `value: 1` | Early `return` inside [`trackLinkClick`](file:///d:/xamp/htdocs/uzairkhatri/components/analytics.ts#L118-L192). |
| **`booking_scheduled`** | Real Calendly inline iframe completion validated by [`validateCalendlyScheduledMessage`](file:///d:/xamp/htdocs/uzairkhatri/components/BookingModal.tsx#L16-L40) | `event_category: "Conversion"`, `event_label: "calendly_modal_embed"`, `source`, `page_path`, `value: 1` | Checks `origin === "https://calendly.com"`, exact iframe `source`, object shape, non-empty `payload.event.uri`, and `trackedKeysRef` session set. |
| **`resume_download`** | Click on `/Uzair-Iqbal-AI-Architect-CV.pdf` | `file_name: "Uzair-Iqbal-AI-Architect-CV.pdf"`, `source`, `page_path` | Evaluated *before* `data-recruiter-cta` so CV downloads never also emit `recruiter_cta_click`. |
| **`recruiter_cta_click`** | Selection of `"Hiring / Role"` stage in [Contact.tsx](file:///d:/xamp/htdocs/uzairkhatri/components/Contact.tsx#L549-L552) **or** click on non-CV `data-recruiter-cta` anchor ([EngagementModels.tsx](file:///d:/xamp/htdocs/uzairkhatri/components/EngagementModels.tsx#L303), [/audit/](file:///d:/xamp/htdocs/uzairkhatri/app/audit/page.tsx)) | `cta_action`, `source`, `page_path` | `recruiterIntentTracked` ref prevents repeat firing on stage re-clicks; mutually exclusive with `resume_download`. |
| **`github_outbound_click`** | Outbound click to `github.com` | `destination_path`, `source`, `page_path` | Logs path only (strips query strings/fragments) and returns immediately. |
| **`linkedin_outbound_click`** | Outbound click to `linkedin.com` / `www.linkedin.com` | `destination_path`, `source`, `page_path` | Logs path only and returns immediately. |
| **`case_study_click`** | Internal click to `/work/<slug>/` (excluding normal `role="tab"` switches unless modified click) | `case_study`, `source`, `page_path`, `destination_path` | Regex-validated slug `[a-z0-9-]+`; tab selection without modifier keys does not inflate outbound case-study clicks. |

---

## 4. Attribution Gaps & Manual Configuration Required

1. **External-Tab Calendly Bookings:** Clicking external Calendly links (`data-booking-direct`, `/book/`, or `Ctrl/Cmd` new-tab clicks) records `booking_click`, but Calendly does **not** post `postMessage` back from an independent browser tab. If full external-tab completion tracking is needed, configure a Calendly Paid Plan redirect URL (back to `/strategy-call/?booked=1`) or server-side Calendly webhook (`invitee.created`).
2. **GA4 Admin Key Event Recommendations (`G-1LXS5Z6GJ6` -> Admin -> Events):**  
   `google-analytics` MCP exposes read-only reporting endpoints and cannot toggle GA4 Admin **Key Events**. Manually configure **only confirmed business outcomes** as Key Events — do **not** inflate Key Event totals with click or PDF download counters:
   - **Recommended Primary GA4 Key Events (mark as Key Event = ON):**
     - `generate_lead` — Confirmed `/api/contact` transport acceptance (reconcile against real `uz.khatri@gmail.com` receipts)
     - `audit_request` — Confirmed `/api/audit` transport acceptance (reconcile against real `uz.khatri@gmail.com` receipts)
     - `booking_scheduled` — Confirmed Calendly inline completion validated via `validateCalendlyScheduledMessage`
   - **Supporting Engagement & Pipeline Indicators (keep Key Event = OFF):**
     - `booking_click` — Booking intent click only (compare against `booking_scheduled` for funnel drop-off, never count as a confirmed meeting)
     - `resume_download` — Supporting recruiter PDF download signal
     - `recruiter_cta_click` — Supporting `"Hiring / Role"` stage and recruiter banner engagement
     - `case_study_click`, `github_outbound_click`, `linkedin_outbound_click` — Supporting technical evaluation and profile navigation metrics
3. **Google Search Console Manual Indexing:** Because write actions were intentionally withheld and `https://uzairkhatri.com/audit/` currently reports `"URL is unknown to Google"` (while `/` was last crawled `2026-09-14`), manually trigger **Request Indexing** in GSC UI for `/` and `/audit/` immediately after approving and deploying this release.

