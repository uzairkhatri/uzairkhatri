const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

test("JsonLd schemas are valid Schema.org entities with no placeholder data", () => {
  const jsonLdPath = path.join(__dirname, "..", "components", "JsonLd.tsx");
  const code = readFileSync(jsonLdPath, "utf8");

  // Transpile to CommonJS to inspect in isolated context
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;

  // Extract JSON-LD objects via regex or eval
  assert.doesNotMatch(code, /\+923000000000/, "Dummy phone placeholder must not exist in JsonLd");
  assert.doesNotMatch(code, /https:\/\/github\.com\/UzairKhatri/, "GitHub username casing must be lowercase canonical");

  // Validate personSchema
  const personMatch = code.match(/const personSchema = ({[\s\S]*?});\n\nconst serviceSchema/);
  assert.ok(personMatch, "personSchema must exist");
  const person = eval(`(${personMatch[1]})`);
  assert.equal(person["@type"], "Person");
  assert.equal(person.name, "Uzair Khatri");
  assert.equal(person.url, "https://uzairkhatri.com");
  assert.ok(Array.isArray(person.sameAs));
  assert.ok(person.sameAs.includes("https://github.com/uzairkhatri"));

  // Validate serviceSchema
  const serviceMatch = code.match(/const serviceSchema = ({[\s\S]*?});\n\nconst faqSchema/);
  assert.ok(serviceMatch, "serviceSchema must exist");
  const service = eval(`(${serviceMatch[1]})`);
  assert.equal(service["@type"], "ProfessionalService");
  assert.equal(service.telephone, undefined, "telephone must be stripped if placeholder");
  assert.equal(service.email, "hello@uzairkhatri.com");
  assert.ok(service.hasOfferCatalog);

  // Validate faqSchema
  const faqMatch = code.match(/const faqSchema = ({[\s\S]*?});\n\nconst websiteSchema/);
  assert.ok(faqMatch, "faqSchema must exist");
  const faq = eval(`(${faqMatch[1]})`);
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity.length, 5);
});

