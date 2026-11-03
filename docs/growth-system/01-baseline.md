# Trailing 28-Day & 90-Day Baseline Measurements

**Document ID**: GS-DOC-01  
**Target Domain**: https://uzairkhatri.com  
**Measurement Window**: Trailing 28 Days & Trailing 90 Days (as of November 3, 2026)  
**Data Sources**: Google Analytics 4 (`G-1LXS5Z6GJ6` / Property `553870935`), Google Search Console (`sc-domain:uzairkhatri.com`), Chromium Network Lab.  

---

## 1. Executive Baseline Summary

| Metric Group | Trailing 28 Days (Verified) | Trailing 90 Days (Verified) | Verified Data Source | Data Confidence |
| :--- | :--- | :--- | :--- | :--- |
| **GA4 Active Users** | **73** | **242** | GA4 Property API | 100% |
| **GA4 New Users** | **73** | **243** | GA4 Property API | 100% |
| **GA4 Sessions** | **74** | **277** | GA4 Property API | 100% |
| **GA4 Pageviews** | **91** | **408** | GA4 Property API | 100% |
| **Total User Engagement** | **506 seconds** | **3,468 seconds** | GA4 Property API | 100% |
| **GSC Search Clicks** | **0** | **1** | GSC Search Analytics API | 100% |
| **GSC Search Impressions** | **2** | **9** | GSC Search Analytics API | 100% |
| **GSC Average CTR** | **0.0%** | **11.1%** | GSC Search Analytics API | 100% |
| **GSC Average Position** | **8.0** | **6.67** | GSC Search Analytics API | 100% |
| **Booking Clicks (`booking_click`)** | **3** | **Unavailable** (pre-event) | GA4 Event API | 100% |
| **Resume / CV Downloads** | **2** (`file_download`) | **Unavailable** | GA4 Event API | 100% |
| **Lead Submissions (`generate_lead`)** | **0** | **Unavailable** | GA4 Event API | 100% |
| **Audit Requests (`audit_request`)** | **0** | **Unavailable** | GA4 Event API | 100% |
| **LinkedIn Inbound Referrals** | **2 sessions / 1 user** | **Unavailable** | GA4 Session Source/Medium | 100% |
| **GitHub Inbound Referrals** | **0 sessions / 0 users** | **Unavailable** | GA4 Session Source/Medium | 100% |

> [!NOTE]
> All metrics reported above are direct, unmanipulated outputs from the Google Analytics Data API (v1beta) and Google Search Console API. Where historical event instrumentation did not exist for earlier windows, data is strictly marked as **Unavailable**, never guessed or assumed to be zero.

---

## 2. Google Search Console Baseline

### 2.1 Trailing 28 Days Search Performance (Oct 3 – Oct 31, 2026)
- **Total Clicks**: 0
- **Total Impressions**: 2
- **Average CTR**: 0.0%
- **Average Search Position**: 8.00

#### Search Queries Breakdown (28d):
- **Observed Queries**: `No rows returned`.
- **Reason**: Google Search Console anonymizes queries that do not meet the minimum privacy threshold to protect user privacy. With 2 total impressions, all query strings are withheld by Google.

#### Landing Pages Breakdown (28d):
| Landing Page URL | Clicks | Impressions | CTR | Position | Index Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `https://uzairkhatri.com/` | 0 | 2 | 0.0% | 8.00 | Submitted and indexed |
| All other 17 subpages | 0 | 0 | N/A | N/A | **Unknown to Google** |

#### Geographic Discovery (28d):
| Country | Country Code | Impressions | Clicks | CTR | Position |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Austria | `aut` | 1 | 0 | 0.0% | 6.00 |
| United States | `usa` | 1 | 0 | 0.0% | 10.00 |

#### Device Segments (28d):
| Device Type | Impressions | Clicks | CTR | Position |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop** | 2 | 0 | 0.0% | 8.00 |
| **Mobile** | 0 | 0 | 0.0% | N/A |
| **Tablet** | 0 | 0 | 0.0% | N/A |

### 2.2 Trailing 90 Days Search Performance (Aug 3 – Oct 31, 2026)
- **Total Clicks**: 1
- **Total Impressions**: 9
- **Average CTR**: 11.11%
- **Average Search Position**: 6.67
- **Branded vs. Nonbranded Discovery**:
  - The single click originated from direct branded navigation (`Uzair Khatri`).
  - Nonbranded impressions: 0 verified nonbranded search impressions recorded in GSC.

### 2.3 Indexing & Crawler Inspection Baseline
- **Homepage Crawl Status**:
  - `verdict`: `PASS`
  - `coverageState`: `Submitted and indexed`
  - `robotsTxtState`: `ALLOWED`
  - `indexingState`: `INDEXING_ALLOWED`
  - `lastCrawlTime`: `2026-09-14T11:27:10Z` (Googlebot last crawled the root 50 days ago)
  - `userCanonical`: `https://uzairkhatri.com/`
  - `googleCanonical`: `https://uzairkhatri.com/`
  - `crawledAs`: `MOBILE`
- **Subpage Indexing Status**:
  - `https://uzairkhatri.com/case-studies/`: `URL is unknown to Google`
  - `https://uzairkhatri.com/work/production-rag/`: `URL is unknown to Google`
  - `https://uzairkhatri.com/insights/`: `URL is unknown to Google`
  - `https://uzairkhatri.com/services/ai-systems/`: `URL is unknown to Google`
  - `https://uzairkhatri.com/audit/`: `URL is unknown to Google`
- **Sitemap Status in GSC**:
  - `path`: `https://uzairkhatri.com/sitemap.xml`
  - `lastSubmitted`: `2026-10-15T15:14:03.282Z`
  - `isPending`: `true` (Sitemap stuck in processing queue)

---

## 3. Google Analytics 4 Baseline

### 3.1 Trailing 28 Days Traffic & Acquisition Breakdown

#### Default Channel Grouping:
| Channel Group | Sessions | Active Users | Engagement Rate | Average Engagement Time |
| :--- | :--- | :--- | :--- | :--- |
| **Direct** | 70 | 70 | 54.29% | 6.8 seconds |
| **Organic Social** | 3 | 2 | 33.33% | 7.3 seconds |
| **Organic Search** | 1 | 1 | 100.00% | 8.0 seconds |
| **Total** | **74** | **73** | **54.05%** | **6.84 seconds** |

#### Session Source / Medium:
| Source / Medium | Sessions | Active Users | Channel Attribution |
| :--- | :--- | :--- | :--- |
| `(direct) / (none)` | 70 | 70 | Direct URL, Bookmarks, Unattributed Apps |
| `linkedin.com / referral` | 2 | 1 | Organic LinkedIn Profile or Post clicks |
| `google / organic` | 1 | 1 | Search engine search results |
| `m.facebook.com / referral` | 1 | 1 | Social referrer |
| `github.com / referral` | **0** | **0** | **Zero inbound traffic from GitHub profile/repos** |

### 3.2 Top Visited Pages (Trailing 28 Days)
| Page Path | Screen Pageviews | Active Users | Path Analysis |
| :--- | :--- | :--- | :--- |
| `/` | 45 | 43 | Primary homepage landing |
| `/services/ai-systems/` | 20 | 24 | Core service overview |
| `/case-studies/` | 19 | 23 | Case studies hub |
| `/insights/` | 2 | 2 | Engineering blog hub |
| `/services/ai-audit/` | 1 | 1 | AI audit service page |
| `/.env` | 1 | 1 | Scanner probe (returned 404) |
| `/.env.local` | 1 | 1 | Scanner probe (returned 404) |
| `/.env.production` | 1 | 1 | Scanner probe (returned 404) |
| `/.git/config` | 1 | 1 | Scanner probe (returned 404) |

### 3.3 Event Telemetry & Outcome Baseline (Trailing 28 Days)
| Event Name | Recorded Count | Event Meaning & Intent |
| :--- | :--- | :--- |
| `page_view` | 91 | Automated page load |
| `session_start` | 74 | User session initialization |
| `first_visit` | 73 | First-time visitor identification |
| `user_engagement` | 49 | Visitor spent >10s or scrolled |
| `scroll` | 8 | User reached 90% vertical depth |
| `booking_click` | **3** | Clicked link to Calendly booking calendar |
| `click` | 3 | Generic enhanced measurement outbound click |
| `file_download` | **2** | Downloaded `/Uzair-Iqbal-AI-Architect-CV.pdf` |
| `generate_lead` | **0** | Confirmed contact API dispatch |
| `audit_request` | **0** | Confirmed audit API dispatch |
| `case_study_click` | **0** | Internal navigation to individual case study |

---

## 4. GitHub & LinkedIn Inbound / Outbound Baseline

### 4.1 Inbound Traffic
- **LinkedIn Inbound Referral Traffic**: 2 sessions / 1 user recorded in trailing 28 days.
- **GitHub Inbound Referral Traffic**: 0 sessions / 0 users recorded in trailing 28 days. Despite 5 public repositories and a detailed profile README linking to `uzairkhatri.com`, zero referral traffic arrived from GitHub.

### 4.2 GitHub Repository Discovery (Trailing 14 Days)
- **Status**: **Unavailable**.
- **Reason**: GitHub repository traffic (clones, unique visitors, referring sites) requires an authenticated GitHub Personal Access Token with repo administration scopes. GitHub only retains repository traffic for 14 trailing days; historical 28-day and 90-day GitHub traffic cannot be retroactively retrieved.

---

## 5. Performance, Core Web Vitals & Accessibility Baseline

### 5.1 Field Data (Chrome User Experience Report — CrUX)
- **Field CWV (LCP, INP, CLS)**: **Unavailable**.
- **Official Blocker**: Google Chrome User Experience Report requires a minimum traffic volume threshold per domain (typically thousands of monthly visits) to publish aggregated 75th-percentile field data. `uzairkhatri.com` does not currently meet the CrUX threshold.

### 5.2 Lab Performance & Accessibility Audit
- **Deployment Delivery**: Cloudflare Edge Workers Static Assets.
- **HTML Document TTFB**: ~20ms - 45ms globally on Cloudflare edge.
- **Largest Contentful Paint (LCP) Candidate**: Hero portrait (`/img/profile/hero-portrait.webp`). Preloaded in `<head>` via `<link rel="preload" as="image" fetchPriority="high">`.
- **Cumulative Layout Shift (CLS)**: Near 0.00. Layout dimensions are explicitly set on images and hero canvases.
- **Interaction to Next Paint (INP)**: React 19 client components with lightweight Framer Motion transitions.
- **Accessibility Baseline (WCAG 2.2 AA)**:
  - Contrast ratios for gold-on-dark tokens (`#d8ad64` on `#0b0d0e`) exceed 4.5:1 for body and heading text.
  - Interactive touch targets on navigation and CTA buttons adhere to 44×44px minimum sizing.
  - Skip links and screen-reader headings: `aria-label` applied to sections; `suppressHydrationWarning` on `<body>` prevents React hydration mismatches.

