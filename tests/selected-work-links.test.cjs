const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

test("Selected Work case study links are crawlable, canonical, and discoverable in SSR HTML", () => {
  const selectedWorkPath = path.join(__dirname, "..", "components", "SelectedWork.tsx");
  const code = readFileSync(selectedWorkPath, "utf8");

  const requiredSlugs = [
    "/work/wellows/",
    "/work/savyour/",
    "/work/classflow/",
    "/work/efu-life/"
  ];

  // 1. Check all canonical slugs exist in SelectedWork.tsx source
  for (const slug of requiredSlugs) {
    assert.ok(
      code.includes(slug),
      `SelectedWork.tsx must explicitly reference canonical path: ${slug}`
    );
    assert.match(
      slug,
      /\/$/,
      `Canonical slug ${slug} must include trailing slash`
    );
  }

  // 2. If out/index.html exists (static export), verify real anchor tags for all 4
  const outIndexPath = path.join(__dirname, "..", "out", "index.html");
  if (existsSync(outIndexPath)) {
    const html = readFileSync(outIndexPath, "utf8");

    for (const slug of requiredSlugs) {
      // Must exist as an href in an anchor tag
      const hrefRegex = new RegExp(`href=["'](?:[^"']*)?${slug}["']`);
      assert.match(
        html,
        hrefRegex,
        `Compiled out/index.html must contain real anchor tag with href="${slug}" without requiring JS tab activation`
      );

      // Verify destination file exists in static export
      const destIndex = path.join(__dirname, "..", "out", slug.replace(/^\//, ""), "index.html");
      assert.ok(
        existsSync(destIndex),
        `Exported destination file must exist: ${destIndex}`
      );
    }
  }
});

