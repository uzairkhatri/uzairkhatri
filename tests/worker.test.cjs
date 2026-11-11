const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const ts = require("typescript");

// Transpile worker/index.ts for Node.js native testing
const workerTsPath = path.join(__dirname, "..", "worker", "index.ts");
const workerTsCode = readFileSync(workerTsPath, "utf8");
const transpiledJs = ts.transpileModule(workerTsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

const workerModule = { exports: {} };
const fn = new Function("require", "exports", "module", transpiledJs);
fn(require, workerModule.exports, workerModule);
const worker = workerModule.exports.default;

function createMockEnv() {
  const sentEmails = [];
  const fetchedAssets = [];
  return {
    env: {
      ASSETS: {
        fetch: async (req) => {
          fetchedAssets.push(req);
          return new Response("mock static asset", { status: 200 });
        }
      },
      EMAIL: {
        send: async (msg) => {
          sentEmails.push(msg);
          return { messageId: "mock-msg-123" };
        }
      }
    },
    sentEmails,
    fetchedAssets
  };
}

test("Worker: /book, /book/, and /book/index.html redirect to Calendly with 302 and no-store; wrangler run_worker_first covers them", async () => {
  const { env } = createMockEnv();
  const wranglerConfig = JSON.parse(readFileSync(path.join(__dirname, "..", "wrangler.jsonc"), "utf8"));
  assert.deepEqual(wranglerConfig.assets?.run_worker_first, ["/book", "/book/*", "/api/*"]);
  assert.equal(wranglerConfig.assets.directory, "out");
  assert.equal(wranglerConfig.assets.binding, "ASSETS");

  for (const target of [
    "https://uzairkhatri.com/book",
    "https://uzairkhatri.com/book/",
    "https://uzairkhatri.com/book/index.html",
    "https://uzairkhatri.com/book?utm_source=linkedin",
    "https://uzairkhatri.com/book/?utm_source=linkedin",
  ]) {
    const res = await worker.fetch(new Request(target), env);
    assert.equal(res.status, 302, `Expected 302 for ${target}`);
    assert.equal(res.headers.get("Location"), "https://calendly.com/uz-khatri/30min");
    assert.equal(res.headers.get("Cache-Control"), "no-store");
  }
});

test("Worker: POST /api/contact handles all four inquiry categories with opaque referenceId and no messageId leak", async () => {
  const categories = ["Idea / MVP", "In Production", "$250 Pre-Mortem", "Hiring / Role"];
  for (const category of categories) {
    const { env, sentEmails } = createMockEnv();
    const payload = {
      name: "Jane Doe",
      email: "jane@example.com",
      message: `Inquiry regarding ${category} pipeline architecture.`,
      stage: category,
    };

    const req = new Request("https://uzairkhatri.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await worker.fetch(req, env);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.dispatched, true);
    assert.equal(data.deliveryStatus, "accepted_by_transport");
    assert.equal(data.messageId, undefined, "Internal mail transport messageId must not be exposed to client");
    assert.match(data.referenceId, /^INQ-[A-F0-9]{8}$/);

    assert.equal(sentEmails.length, 1);
    const email = sentEmails[0];
    assert.equal(email.to, "uz.khatri@gmail.com");
    assert.equal(email.from, "hello@uzairkhatri.com");
    assert.equal(email.replyTo, "jane@example.com");
    assert.ok(email.subject.includes(data.referenceId));
    assert.ok(email.subject.includes("Jane Doe"));
    assert.ok(email.subject.includes(`[${category}]`));
    assert.ok(email.text.includes(data.referenceId));
    assert.ok(email.html.includes(data.referenceId));
  }
});

test("Worker: POST /api/contact rejects missing required fields safely with 400", async () => {
  const { env, sentEmails } = createMockEnv();
  
  const req = new Request("https://uzairkhatri.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Jane" }) // missing email & message
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Name, email, and message are required.");
  assert.equal(sentEmails.length, 0);
});

test("Worker: POST /api/contact honeypot silently returns success without sending email", async () => {
  const { env, sentEmails } = createMockEnv();
  const payload = {
    name: "Spam Bot",
    email: "bot@spam.com",
    message: "Buy cheap backlinks now",
    _gotcha: "I am a spam bot trap"
  };

  const req = new Request("https://uzairkhatri.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.dispatched, false);
  assert.equal(sentEmails.length, 0); // zero emails sent!
});

test("Worker: POST /api/audit handles valid diagnostic requests", async () => {
  const { env, sentEmails } = createMockEnv();
  const payload = {
    name: "Mark CTO",
    email: "mark@techcorp.io",
    company: "TechCorp",
    stage: "Scaling",
    stack: "Python, FastAPI, AWS Bedrock, Pinecone",
    bottleneck: "Hallucination and high token latency (>4s)",
    repoOrDiagram: "https://github.com/techcorp/rag-service",
    message: "Our semantic search latency is degrading under 500 QPS."
  };

  const req = new Request("https://uzairkhatri.com/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.dispatched, true);
  assert.equal(data.deliveryStatus, "accepted_by_transport");
  assert.equal(data.messageId, undefined, "Internal mail transport messageId must not be exposed to client");
  assert.match(data.referenceId, /^AUD-[A-F0-9]{8}$/);

  assert.equal(sentEmails.length, 1);
  const email = sentEmails[0];
  assert.equal(email.to, "uz.khatri@gmail.com");
  assert.equal(email.from, "hello@uzairkhatri.com");
  assert.ok(email.subject.includes(`[${data.referenceId}]`));
  assert.ok(email.subject.includes("[AI Pre-Mortem Request]"));
  assert.ok(email.subject.includes("Mark CTO"));
  assert.ok(email.text.includes("Hallucination and high token latency"));
  assert.ok(email.html.includes("mark@techcorp.io"));
});

test("Worker: POST /api/audit rejects invalid submission with 400", async () => {
  const { env, sentEmails } = createMockEnv();
  const req = new Request("https://uzairkhatri.com/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Mark" })
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Name, email, and description are required.");
  assert.equal(sentEmails.length, 0);
});

test("Worker: POST /api/audit honeypot silently returns success without sending email", async () => {
  const { env, sentEmails } = createMockEnv();
  const req = new Request("https://uzairkhatri.com/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spam",
      email: "spam@bot.com",
      message: "Spam message",
      _gotcha: "honeypot triggered"
    })
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.equal(data.dispatched, false);
  assert.equal(sentEmails.length, 0);
});

test("Worker: Static routes forward to ASSETS.fetch", async () => {
  const { env, fetchedAssets } = createMockEnv();
  const req = new Request("https://uzairkhatri.com/services/ai-systems/");

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 200);
  assert.equal(fetchedAssets.length, 1);
  assert.equal(fetchedAssets[0].url, "https://uzairkhatri.com/services/ai-systems/");
});

test("Worker: Error handling does not leak stack traces, internal errors, or routing addresses", async () => {
  const { env } = createMockEnv();
  env.EMAIL.send = async () => {
    throw new Error("Internal Cloudflare Mail Gateway Error to uz.khatri@gmail.com");
  };

  const req = new Request("https://uzairkhatri.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jane",
      email: "jane@test.com",
      message: "Valid message content"
    })
  });

  const res = await worker.fetch(req, env);
  assert.equal(res.status, 500);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.equal(data.error, "Failed to dispatch email");
  assert.equal(data.error.includes("uz.khatri@gmail.com"), false);
  assert.equal(data.stack, undefined);
});

test("Worker: Rejects non-POST methods on API endpoints and handles missing EMAIL binding", async () => {
  const { env, sentEmails } = createMockEnv();
  const getRes = await worker.fetch(new Request("https://uzairkhatri.com/api/contact", { method: "GET" }), env);
  assert.equal(getRes.status, 405);

  const missingEnvRes = await worker.fetch(
    new Request("https://uzairkhatri.com/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alex", email: "alex@co.io", message: "Scope check" }),
    }),
    { ASSETS: env.ASSETS }
  );
  assert.equal(missingEnvRes.status, 500);
  assert.equal(sentEmails.length, 0);
});

test("Worker: Logs never contain sender PII (name, email, message content) on success or error", async () => {
  const { env } = createMockEnv();
  const logs = [];
  const origLog = console.log;
  const origErr = console.error;
  console.log = (...args) => logs.push(JSON.stringify(args));
  console.error = (...args) => logs.push(JSON.stringify(args));
  try {
    await worker.fetch(
      new Request("https://uzairkhatri.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SecretPersonName",
          email: "secret.person@privatecorp.test",
          message: "Confidential bottleneck body text",
          stage: "Hiring / Role",
        }),
      }),
      env
    );
    env.EMAIL.send = async () => ({ messageId: "   " });
    await worker.fetch(
      new Request("https://uzairkhatri.com/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SecretPersonName",
          email: "secret.person@privatecorp.test",
          message: "Confidential audit details",
        }),
      }),
      env
    );
  } finally {
    console.log = origLog;
    console.error = origErr;
  }
  const combinedLogs = logs.join("\n");
  assert.equal(combinedLogs.includes("SecretPersonName"), false);
  assert.equal(combinedLogs.includes("secret.person@privatecorp.test"), false);
  assert.equal(combinedLogs.includes("Confidential bottleneck"), false);
  assert.equal(combinedLogs.includes("mock-msg"), false);
});

test("Worker: Rejects whitespace-only fields cleanly with 400", async () => {
  const { env, sentEmails } = createMockEnv();
  const res = await worker.fetch(
    new Request("https://uzairkhatri.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "   ", email: "jane@co.com", message: "Hello" }),
    }),
    env
  );
  assert.equal(res.status, 400);
  assert.equal(sentEmails.length, 0);
});

test("Worker: Rejects invalid JSON and malformed email cleanly without dispatching", async () => {
  const { env, sentEmails } = createMockEnv();

  const badJsonRes = await worker.fetch(
    new Request("https://uzairkhatri.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not-json",
    }),
    env
  );
  assert.equal(badJsonRes.status, 400);

  const badEmailRes = await worker.fetch(
    new Request("https://uzairkhatri.com/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: "not-an-email",
        message: "Review request",
      }),
    }),
    env
  );
  assert.equal(badEmailRes.status, 400);
  assert.equal(sentEmails.length, 0);
});

test("Worker: Returns 502 when mail transport resolves without confirming a messageId", async () => {
  const { env } = createMockEnv();
  env.EMAIL.send = async () => ({});

  const res = await worker.fetch(
    new Request("https://uzairkhatri.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Jane",
        email: "jane@test.com",
        message: "Valid message content",
      }),
    }),
    env
  );
  assert.equal(res.status, 502);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.equal(data.stack, undefined);
});

