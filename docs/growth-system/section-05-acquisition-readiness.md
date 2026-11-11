# Section 05 — LinkedIn, GitHub & Outreach Acquisition Readiness

**Date:** November 11, 2026  
**Canonical Portfolio Root:** `https://uzairkhatri.com/`  
**Profile Assets Updated Locally (Not Pushed):** `README.md` (`uzairkhatri/uzairkhatri` GitHub profile README)  

---

## 1. Canonical Acquisition Link Architecture & UTM Standard

Always link with canonical trailing slashes (except `.pdf` and bare root `/`) and clean lowercase UTM tags so GA4 `sessionSource`, `sessionMedium`, and `sessionCampaign` aggregate cleanly without fragmenting across `/insights` vs `/insights/`.

| Parameter | Standard Values |
| :--- | :--- |
| **`utm_source`** | `linkedin`, `github`, `direct`, `email` |
| **`utm_medium`** | `profile`, `featured`, `social`, `readme`, `outreach`, `recruiter_note` |
| **`utm_campaign`** | `profile_hero`, `cs_hub`, `rag_reference`, `ai_audit`, `role_application`, `li_launch` |

### Audience-Specific Destination URLs

| Audience | Objective | Ready-to-Use Destination URL |
| :--- | :--- | :--- |
| **Recruiters / Hiring Leaders** | Direct qualification + CV download | `https://uzairkhatri.com/case-studies/?utm_source=linkedin&utm_medium=recruiter_note&utm_campaign=role_application` |
| **Recruiters (Direct CV)** | Zero-friction PDF resume review | `https://uzairkhatri.com/Uzair-Iqbal-AI-Architect-CV.pdf` *(PDF hosted directly on apex)* |
| **CTOs / VPs of Engineering** | Fixed-scope `$250` Architecture Pre-Mortem | `https://uzairkhatri.com/audit/?utm_source=linkedin&utm_medium=featured&utm_campaign=ai_audit` |
| **Technical Founders** | Prototype-to-production systems & booking | `https://uzairkhatri.com/?utm_source=linkedin&utm_medium=social&utm_campaign=founder_outreach#contact` |
| **Engineering Teams / GitHub** | RAG & distributed systems proof | `https://uzairkhatri.com/work/production-rag/?utm_source=github&utm_medium=profile&utm_campaign=rag_reference` |

> **QA Note:** Append `?analytics=off` on owner devices or test sessions so internal visits set `localStorage["portfolio-analytics-disabled"] = "true"` and do not inflate GA4 counts.

---

## 2. GitHub Acquisition Readiness (Prepared Locally in `README.md`)

Changes prepared locally in [README.md](file:///d:/xamp/htdocs/uzairkhatri/README.md) (**not yet pushed — awaiting user approval**):

- Preserved `Principal AI Systems Architect & SaaS Engineer` engineering positioning with zero commercial `$250` sales pitch on the developer profile.
- Fixed trailing-slash canonical link `/insights/` (previously missing trailing slash).
- Added explicit `utm_source=github&utm_medium=profile` campaign parameters to header badges, Production RAG case study, `Architecture review practice`, and `Architecture review` Connect links.
- Stated availability concisely as engineering leadership / architecture roles and advisory (`Open to Staff / Principal AI Systems Architect roles and technical architecture advisory.`).
- Preserved strictly factual open-source status for [opentelemetry-python-contrib#5111](https://github.com/open-telemetry/opentelemetry-python-contrib/pull/5111) (`open and awaiting maintainer review`).

### Ready-to-Add Backlink Footer for Project Repositories

When approved to update individual GitHub repositories (`production-rag-reference`, `high-throughput-event-platform`, `production-ai-readiness`, `fastapi-ai-team`):

```markdown
---
*Engineered by [Uzair Khatri](https://uzairkhatri.com/?utm_source=github&utm_medium=readme&utm_campaign=repo_footer) — AI Systems Architect & SaaS Engineer.*  
*Documentation & architecture case studies: [uzairkhatri.com/case-studies/](https://uzairkhatri.com/case-studies/?utm_source=github&utm_medium=readme&utm_campaign=repo_footer)*
```

---

## 3. Ready-to-Publish LinkedIn Positioning & Outreach Assets

> [!NOTE]
> Prepared for manual review and posting by Uzair. Nothing has been posted or sent externally.

### 3.1 LinkedIn Headline Draft
`Principal AI Systems Architect & SaaS Engineer | 14+ Yrs Distributed Systems, High-Throughput Backends & AWS | Production LangGraph Agents, Grounded Hybrid RAG & Reliability Engineering`

### 3.2 LinkedIn About Section Draft (Aligned to Approved Sections 1–5)
> Most AI prototypes work in a notebook and fail under production load, retries, or unguarded token spend. Over 14+ years building enterprise insurance workflows (EFU Life), high-concurrency fintech ledgers (Savyour), and multi-agent AI platforms (Wellows), I focus on the engineering boundaries that keep systems reliable in production.
>
> **Core Engineering Focus:**
> - **Production AI & Agentic Systems:** LangGraph orchestration, grounded Hybrid RAG (BM25 + dense retrieval + reranking), eval gates, and cost guardrails.
> - **Backend & Distributed Systems:** Python/FastAPI, Java, PostgreSQL ACID ledgers, Redis Redlock coordination, Kafka/SQS worker pipelines, and idempotent webhooks.
> - **Enterprise Architecture & Integrations:** Regulated workflows, Active Directory / LDAP access controls, and auditable migrations.
>
> **Ways to Connect:**
> - **Principal / Staff AI & Backend Roles (Remote / Dubai / GCC):** Review case studies (`uzairkhatri.com/case-studies/`) or my CV (`uzairkhatri.com/Uzair-Iqbal-AI-Architect-CV.pdf`).
> - **Fixed-Scope Single-Problem Review ($250):** Pre-mortem on one agreed production bottleneck (`uzairkhatri.com/audit/`).
> - **30-Minute Discovery Call (Free Verbal Triage):** `calendly.com/uz-khatri/30min`

### 3.3 LinkedIn Featured Card Set (Assets Already in `public/linkedin-featured/`)
1. **Verified Production Case Studies** — `https://uzairkhatri.com/case-studies/?utm_source=linkedin&utm_medium=featured&utm_campaign=cs_hub` (`case-studies.png`)
2. **Production Architecture Pre-Mortem ($250 Fixed Scope)** — `https://uzairkhatri.com/audit/?utm_source=linkedin&utm_medium=featured&utm_campaign=ai_audit` (`strategy-call.png`)
3. **Production RAG Architecture Case Study** — `https://uzairkhatri.com/work/production-rag/?utm_source=linkedin&utm_medium=featured&utm_campaign=rag_reference` (`services.png`)
4. **Production AI Playbook** — `https://uzairkhatri.com/ai-playbook/?utm_source=linkedin&utm_medium=featured&utm_campaign=playbook` (`ai-playbook.png`)

### 3.4 First Post Draft (Launch Verification Post)
> Shipping an AI agent or RAG prototype to production rarely breaks on prompt wording — it breaks on queue backpressure, ungrounded retrieval, duplicate webhook retries, or runaway token cost.
>
> Over the last few weeks I rebuilt `uzairkhatri.com` to document the concrete architecture trade-offs behind Wellows (multi-agent workflows), Savyour (Redis + PostgreSQL ledger concurrency), ClassFlow (atomic booking locks), and enterprise insurance workflows.
>
> If you're scaling an AI backend or hiring for Principal / Staff AI & Distributed Systems engineering (Remote / Dubai / GCC):
> - Engineering case studies: `https://uzairkhatri.com/case-studies/?utm_source=linkedin&utm_medium=social&utm_campaign=li_launch`
> - Fixed-scope $250 single-problem pre-mortem: `https://uzairkhatri.com/audit/?utm_source=linkedin&utm_medium=social&utm_campaign=li_launch_audit`

---

## 4. Simple Private Conversion Measurement Cadence

Track weekly (no third-party CRM needed; pair GA4 acquisition report with Gmail `INQ-` / `AUD-` / Calendly confirmations):

| Weekly Metric | Source | Target Purpose |
| :--- | :--- | :--- |
| Sessions by `utm_source` / `utm_medium` (`linkedin`, `github`) | GA4 Acquisition | Confirm outreach & profile links actually drive qualified visits (baseline: `106` total / `30d`). |
| `resume_download` + `recruiter_cta_click` | GA4 Supporting Events *(not Key Events)* | Track hiring-leader engagement separately from primary business conversions. |
| `booking_click` -> `booking_scheduled` | GA4 + Calendly | Compare click intent (`booking_click`, supporting) against confirmed completions (`booking_scheduled`, Primary Key Event). |
| `generate_lead` + `audit_request` | GA4 Primary Key Events + Gmail `[INQ-]`/`[AUD-]` | Reconcile accepted dispatches 1:1 against real delivered inbox threads in `uz.khatri@gmail.com`. |
| Qualified conversations / interviews / engagements | Private Sheet / Notes | Outcome accountability tied to interviews, advisory scopes, and Principal-role offers. |

---

## 5. Master Approval Checklist (External Actions Held Pending Sign-Off)

1. Approve commit + `git push origin main` (updates site code + GitHub profile `README.md`).
2. Approve `npx wrangler deploy` (publishes `/book` + `/book/` server-side `302` routing via `run_worker_first`, hardened `worker/index.ts`, clean `security.txt`, response-copy fixes, and analytics updates).
3. Verify `curl -I https://uzairkhatri.com/book` and `curl -I https://uzairkhatri.com/book/` return `302` to `https://calendly.com/uz-khatri/30min`.
4. Approve **one** controlled live `POST /api/contact` test + verify actual receipt and `Reply-To` in `uz.khatri@gmail.com`.
5. Manually mark **only** `generate_lead`, `audit_request`, and `booking_scheduled` as GA4 Admin Key Events (keep `booking_click`, `resume_download`, and `recruiter_cta_click` as supporting engagement events).
6. Manually request indexing in Google Search Console for `https://uzairkhatri.com/` and `https://uzairkhatri.com/audit/`.
7. Publish approved LinkedIn headline/About/Featured updates and first launch post; proceed directly to Phase 6 qualified traffic & outbound acquisition.

