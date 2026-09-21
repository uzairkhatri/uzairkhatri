const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

// Run the actual client modules with an isolated browser and no network access.
function setup(url = "https://uzairkhatri.com/", options = {}) {
  const storage = options.storage || new Map();
  const location = new URL(url);
  const win = {
    location,
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    },
  };
  if (options.blockStorage) Object.defineProperty(win, "localStorage", { get() { throw new Error("Blocked"); } });
  class Element {
    constructor(href, source, parentId) {
      this.href = href ? new URL(href, location).href : undefined;
      this.source = source;
      this.parentId = parentId;
    }
    closest(selector) {
      if (selector === "a[href]") return this.anchor || (this.href ? this : null);
      return this.parentId ? { getAttribute: () => this.parentId } : null;
    }
    getAttribute(name) { return name === "data-source" ? this.source : null; }
  }
  const effects = [];
  const listeners = new Map();
  const enabled = [];
  const context = vm.createContext({
    window: options.ssr ? undefined : win,
    Element, URL, URLSearchParams, Date,
    process: { env: { NEXT_PUBLIC_BASE_PATH: options.basePath || "" } },
    document: {
      addEventListener(type, listener, capture) { assert.equal(capture, true); listeners.set(type, listener); },
      removeEventListener(type, listener, capture) { assert.equal(capture, true); assert.equal(listeners.get(type), listener); listeners.delete(type); },
    },
  });
  const cache = new Map();
  function load(name) {
    if (cache.has(name)) return cache.get(name).exports;
    const filename = path.join(__dirname, "..", "components", name);
    const code = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const module = { exports: {} };
    cache.set(name, module);
    const localRequire = (id) => {
      if (id === "react") return { useEffect: (fn) => effects.push(fn), useState: () => [false, (value) => enabled.push(value)] };
      if (id === "react/jsx-runtime") return require(id);
      if (id === "next/script") return { __esModule: true, default: () => null };
      if (id.startsWith("./")) return load(id.slice(2) + ".ts");
      throw new Error(`Unexpected dependency: ${id}`);
    };
    vm.runInContext(`(function(require, module, exports) { ${code}\n})`, context, { filename })(localRequire, module, module.exports);
    return module.exports;
  }
  const api = load("analytics.ts");
  const events = () => (win.dataLayer || []).map((entry) => Array.from(entry)).filter((entry) => entry[0] === "event");
  function click(href, source, extra = {}) {
    api.trackLinkClick({ type: "click", button: 0, target: new Element(href, source), ...extra });
  }
  return { api, win, storage, events, click, Element, load, effects, listeners, enabled };
}

test("server rendering never starts analytics or throws for lead/booking events", () => {
  const { api } = setup(undefined, { ssr: true });
  assert.equal(api.initializeAnalytics(), false);
  api.trackLeadSubmission("prototype");
  api.trackBookingClick();
});

for (const url of ["http://localhost:3000/", "http://127.0.0.1:3017/", "http://[::1]:3000/", "https://preview.example.com/", "https://uzairkhatri.github.io/", "https://uzairkhatri.com.example.org/", "http://uzairkhatri.com/"]) {
  test(`no initialization or events on ${url}`, () => {
    const { api, win, events } = setup(url);
    assert.equal(api.initializeAnalytics(), false);
    api.trackLeadSubmission("test");
    api.trackBookingClick();
    assert.equal(win.gtag, undefined);
    assert.equal(events().length, 0);
  });
}

test("both production hostnames initialize once and queue events before the tag loads", () => {
  for (const host of ["uzairkhatri.com", "www.uzairkhatri.com"]) {
    const { api, win, events } = setup(`https://${host}/`);
    assert.equal(api.initializeAnalytics(), true);
    assert.equal(api.initializeAnalytics(), true);
    assert.equal(win.dataLayer.length, 2);
    api.trackLeadSubmission("production", "api_contact");
    assert.equal(events()[0][1], "generate_lead");
    assert.equal(events()[0][2].method, "api_contact");
  }
});

test("testing opt-out persists across pages, and an explicit on URL restores it on reload", () => {
  const first = setup("https://uzairkhatri.com/?analytics=off");
  assert.equal(first.api.initializeAnalytics(), false);
  assert.equal(first.win["ga-disable-G-1LXS5Z6GJ6"], true);
  const next = setup("https://uzairkhatri.com/work/efu-life/", { storage: first.storage });
  assert.equal(next.api.initializeAnalytics(), false);
  next.api.trackLeadSubmission("test");
  assert.equal(next.events().length, 0);
  const reset = setup("https://uzairkhatri.com/?analytics=on", { storage: first.storage });
  assert.equal(reset.api.initializeAnalytics(), true);
  assert.equal(setup("http://localhost:3000/?analytics=on").api.initializeAnalytics(), false);
});

test("blocked storage and existing GA disable preference fail closed", () => {
  const blocked = setup(undefined, { blockStorage: true });
  assert.equal(blocked.api.initializeAnalytics(), false);
  assert.equal(blocked.win.gtag, undefined);
  const disabled = setup();
  disabled.win["ga-disable-G-1LXS5Z6GJ6"] = true;
  assert.equal(disabled.api.initializeAnalytics(), false);
});

test("booking tracking covers ordinary, keyboard, modified, middle and modal-direct clicks", () => {
  const { api, click, events } = setup("https://uzairkhatri.com/work/efu-life/");
  api.initializeAnalytics();
  for (const extra of [{}, { detail: 0 }, { ctrlKey: true }, { metaKey: true }, { type: "auxclick", button: 1 }]) {
    click("https://calendly.com/uz-khatri/30min", "contact_section", extra);
  }
  click("https://calendly.com/uz-khatri/30min", "booking_modal_direct");
  assert.equal(events().length, 6);
  assert.ok(events().every((entry) => entry[1] === "booking_click"));
  assert.equal(events()[0][2].page_path, "/work/efu-life/");
  assert.equal(events()[5][2].source, "booking_modal_direct");
});

test("contact anchors, external links, right clicks and work index links are not booking/case-study events", () => {
  const { api, click, events } = setup();
  api.initializeAnalytics();
  for (const href of ["/#contact", "/work/", "/services/ai-audit/", "mailto:hello@uzairkhatri.com", "https://example.com/work/efu-life/"]) click(href);
  click("https://calendly.com/uz-khatri/30min", "test", { type: "auxclick", button: 2 });
  assert.equal(events().length, 0);
});

test("case-study links include slug/source, omit query strings, and support base paths and nested SVGs", () => {
  for (const basePath of ["", "/portfolio"]) {
    const { api, Element, events } = setup(undefined, { basePath });
    api.initializeAnalytics();
    const icon = new Element();
    icon.anchor = new Element(`${basePath}/work/efu-life/?private=value#architecture`, undefined, "work");
    api.trackLinkClick({ type: "click", button: 0, target: icon });
    assert.equal(events().length, 1);
    assert.equal(events()[0][1], "case_study_click");
    assert.equal(events()[0][2].case_study, "efu-life");
    assert.equal(events()[0][2].source, "work");
    assert.equal(events()[0][2].destination_path, `${basePath}/work/efu-life/`);
  }
});

test("ad blocker errors do not break navigation or form completion", () => {
  const { api, win } = setup();
  api.initializeAnalytics();
  win.gtag = () => { throw new Error("Blocked"); };
  assert.doesNotThrow(() => api.trackBookingClick());
  assert.doesNotThrow(() => api.trackLeadSubmission("test"));
});

test("root registers one capture listener per gesture and cleans up across Strict Mode remounts", () => {
  const state = setup();
  state.load("SiteAnalytics.tsx").default();
  const cleanup = state.effects[0]();
  assert.deepEqual(state.enabled, [true]);
  assert.equal(state.listeners.size, 2);
  const target = new state.Element("https://calendly.com/uz-khatri/30min", "contact_section");
  state.listeners.get("click")({ type: "click", button: 0, target });
  assert.equal(state.events().length, 1);
  cleanup();
  assert.equal(state.listeners.size, 0);
  state.effects[0]();
  assert.equal(state.win.dataLayer.length, 3);
  assert.equal(state.listeners.size, 2);
});

test("root does not enable a script or listeners for local previews or opted-out visitors", () => {
  for (const url of ["http://localhost:3000/", "https://uzairkhatri.com/?analytics=off"]) {
    const state = setup(url);
    assert.equal(state.load("SiteAnalytics.tsx").default(), null);
    state.effects[0]();
    assert.equal(state.enabled.length, 0);
    assert.equal(state.listeners.size, 0);
    assert.equal(state.win.gtag, undefined);
  }
});
