# Phase 3 — Production Release Plan, Deployment Architecture & Rollback Runbook

**Document ID:** `docs/growth-system/18-production-release-plan.md`  
**Execution Date:** 2026-11-03  
**Author:** Cloudflare Deployment Engineer, Release Manager & Principal Software Architect  
**Status:** Ready to Execute (Awaiting Explicit User Authorization)  
**Target Domain:** `https://uzairkhatri.com`  
**Hosting Infrastructure:** Cloudflare Workers with Static Assets (`wrangler.jsonc`)

---

## 1. Production Architecture & Deployment Reality

An independent audit of the deployment configuration revealed an essential operational distinction:
1. **Cloudflare Workers Deployment (`wrangler.jsonc`)**:
   - `uzairkhatri.com` is powered by a Cloudflare Worker (`worker/index.ts`) bound to static Next.js export assets (`out/`) and Cloudflare Email Routing (`EMAIL` binding to `uz.khatri@gmail.com`).
   - Production deployment is executed via **Wrangler**:
     ```bash
     npx wrangler deploy
     ```
2. **GitHub Actions Workflow (`.github/workflows/deploy-pages.yml`)**:
   - A secondary workflow exists in the repository that builds and uploads artifacts to **GitHub Pages** upon git push to `main`.
   - **Crucial Rule**: Pushing commits to GitHub does NOT deploy to the production Cloudflare Worker. Production updates require building the static output (`npm run build`) and deploying via Wrangler (`npx wrangler deploy`), followed by a git commit and push to synchronize repository history.

---

## 2. Pre-Deployment Verification Checklist

Before issuing the release commands, ensure all the following pre-flight gates pass:

- [x] **Automated Tests**: `npm test` passes all 28 unit and integration tests (analytics, sitemaps, schemas, worker).
- [x] **Type Integrity**: `npx tsc --noEmit` exits with code 0 (zero compiler diagnostics).
- [x] **Production Static Build**: `npm run build` succeeds, generating 23 static pages into `out/`.
- [x] **Sitemap Integrity**: `out/sitemap.xml` contains exactly 19 canonical indexable routes with genuine historical lastmod dates (zero redirects, zero noindex).
- [x] **Secret Audit**: Client static assets in `out/_next/static/` scanned; zero secrets or tokens found.
- [x] **Asset Verification**: `out/Uzair-Iqbal-AI-Architect-CV.pdf` exists and is accessible.
- [x] **Local Recoverable Backup**: Full physical backup preserved at:  
  `C:\Users\Uzair Iqbal\.gemini\antigravity\brain\2ec5ad61-4fee-4333-a4e6-df2632371f03\scratch\pre-p0-backup`.

---

## 3. Step-by-Step Release Commands

*(DO NOT EXECUTE WITHOUT EXPLICIT USER AUTHORIZATION)*

### Step 3.1: Synchronize Local Git Commit
Record the verified changes into Git version history:

```bash
git add app/page.tsx components/JsonLd.tsx components/SelectedWork.module.css components/SelectedWork.tsx components/Writing.module.css components/Writing.tsx package.json public/sitemap.xml scripts/ping-indexnow.mjs app/audit/layout.tsx tests/schema.test.cjs tests/sitemap.test.cjs tests/worker.test.cjs docs/growth-system/

git commit -m "fix(growth-system): resolve sitemap deadlock, link discovery, schema and audit canonicals with comprehensive test suite"
```

### Step 3.2: Verify Build Output
Re-run the production build to ensure `out/` is 100% fresh:

```bash
npm run build
```

### Step 3.3: Deploy to Cloudflare Workers & Static Assets
Deploy the compiled `out/` directory and `worker/index.ts` to Cloudflare:

```bash
npx wrangler deploy
```
*(Deploys the static assets in `out/` and binds the worker routing to the live zone `uzairkhatri.com`)*

### Step 3.4: Synchronize Remote Git Repository
```bash
git push origin main
```

---

## 4. Production Smoke-Test Procedure

Immediately following deployment, execute these live smoke tests:

### 4.1 Live Header & Status Code Inspection
```bash
# Verify homepage returns HTTP 200 OK
curl -I https://uzairkhatri.com/

# Verify sitemap is live and valid
curl -I https://uzairkhatri.com/sitemap.xml

# Verify /audit/ returns 200 OK and check canonical
curl -s https://uzairkhatri.com/audit/ | grep -i 'rel="canonical"'
# Expected: <link rel="canonical" href="https://uzairkhatri.com/audit/"/>

# Verify /book/ redirects with 302 to Calendly
curl -I https://uzairkhatri.com/book/
# Expected: HTTP/2 302, Location: https://calendly.com/uz-khatri/30min
```

### 4.2 Search Engine Notification (IndexNow)
Notify Bing, Yandex, and IndexNow crawlers of the updated URLs:
```bash
node scripts/ping-indexnow.mjs
```

### 4.3 Google Search Console Sitemap Resubmission
1. Go to Google Search Console -> **Sitemaps** for property `sc-domain:uzairkhatri.com`.
2. Submit `sitemap.xml`.
3. Verify that discovered URLs count displays **19**.
4. Use **URL Inspection** on:
   - `https://uzairkhatri.com/`
   - `https://uzairkhatri.com/audit/`
   - `https://uzairkhatri.com/insights/production-ai-architecture/`
   Click **Request Indexing**.

---

## 5. Instant Rollback Runbook

If any failure occurs in production, rollback can be accomplished in under 60 seconds through two methods:

### Method 1: Cloudflare Worker Deployment Rollback (Instant Edge Revert)
Cloudflare Workers maintains immutable versioned deployments. To instantly rollback the live production environment to the previous version:
```bash
npx wrangler rollback
```
*(Select the previous active deployment from the interactive prompt or pass the specific deployment ID).*

### Method 2: Local Codebase Restoration from Snapshot
To reset the local working tree to the exact pre-P0 state:
```powershell
# Restore from physical snapshot:
Copy-Item -Path "C:\Users\Uzair Iqbal\.gemini\antigravity\brain\2ec5ad61-4fee-4333-a4e6-df2632371f03\scratch\pre-p0-backup\*" -Destination "D:\xamp\htdocs\uzairkhatri\" -Recurse -Force
```
Or via Git:
```bash
git reset --hard HEAD~1
```

