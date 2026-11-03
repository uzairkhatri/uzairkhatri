const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

test("sitemap.xml is valid, canonical, and contains no redirects or noindex routes", () => {
  const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
  assert.equal(existsSync(sitemapPath), true, "public/sitemap.xml must exist");

  const content = readFileSync(sitemapPath, "utf8");
  assert.match(content, /^<\?xml version="1.0" encoding="UTF-8"\?>/, "Must start with XML declaration");
  assert.match(content, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/, "Must define valid urlset namespace");

  const locRegex = /<loc>(https:\/\/uzairkhatri\.com\/[^<]*)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  assert.equal(urls.length, 19, `Expected exactly 19 canonical URLs, found ${urls.length}`);

  // Disallow any redirecting / noindex utility URLs
  for (const url of urls) {
    assert.doesNotMatch(url, /\/book\/?$/, `Redirecting /book/ must not be in sitemap: ${url}`);
    assert.equal(url.startsWith("https://uzairkhatri.com/") && url.endsWith("/"), true, `URL must use https and end with trailing slash: ${url}`);
  }

  // Ensure no duplicate URLs
  const uniqueUrls = new Set(urls);
  assert.equal(uniqueUrls.size, urls.length, "Sitemap must not contain duplicate URLs");

  // Verify all URLs map to valid app routes
  const appRoot = path.join(__dirname, "..", "app");
  for (const url of urls) {
    const route = url.replace("https://uzairkhatri.com/", "").replace(/\/$/, "");
    if (route === "") {
      assert.equal(existsSync(path.join(appRoot, "page.tsx")), true, "Root route must exist");
    } else {
      const pagePath = path.join(appRoot, route, "page.tsx");
      assert.equal(existsSync(pagePath), true, `Route file must exist for sitemap URL: ${pagePath}`);
    }
  }

  // Verify priority and lastmod tags
  const priorityRegex = /<priority>([0-9.]+)<\/priority>/g;
  while ((match = priorityRegex.exec(content)) !== null) {
    const p = parseFloat(match[1]);
    assert.equal(p >= 0.1 && p <= 1.0, true, `Priority must be between 0.1 and 1.0, got ${p}`);
  }

  const lastmodRegex = /<lastmod>([0-9]{4}-[0-9]{2}-[0-9]{2})<\/lastmod>/g;
  while ((match = lastmodRegex.exec(content)) !== null) {
    assert.match(match[1], /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, `lastmod must be valid ISO date: ${match[1]}`);
  }
});
