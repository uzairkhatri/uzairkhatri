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

test("Worker: /book and /book/ redirect to Calendly with 302", async () => {
  const { env } = createMockEnv();
  
  const res1 = await worker.fetch(new Request("https://uzairkhatri.com/book"), env);
  assert.equal(res1.status, 302);
  assert.equal(res1.headers.get("Location"), "https://calendly.com/uz-khatri/30min");

  const res2 = await worker.fetch(new Request("https://uzairkhatri.com/book/"), env);
  assert.equal(res2.status, 302);
  assert.equal(res2.headers.get("Location"), "https://calendly.com/uz-khatri/30min");
});

test("Worker: POST /api/contact handles valid submissions and sends email", async () => {
  const { env, sentEmails } = createMockEnv();
  const payload = {
    name: "Jane Doe",
    email: "jane@example.com",
    message: "We need an AI systems architect to review our multi-agent pipeline.",
    stage: "Production"
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

  assert.equal(sentEmails.length, 1);
  const email = sentEmails[0];
  assert.equal(email.to, "uz.khatri@gmail.com");
  assert.equal(email.from, "hello@uzairkhatri.com");
  assert.equal(email.replyTo, "jane@example.com");
  assert.ok(email.subject.includes("Jane Doe"));
  assert.ok(email.text.includes("multi-agent pipeline"));
  assert.ok(email.html.includes("Jane Doe"));
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

  assert.equal(sentEmails.length, 1);
  const email = sentEmails[0];
  assert.equal(email.to, "uz.khatri@gmail.com");
  assert.equal(email.from, "hello@uzairkhatri.com");
  assert.ok(email.subject.includes("[AI Pre-Mortem Request]: Mark CTO"));
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

test("Worker: Error handling does not leak stack traces", async () => {
  const { env } = createMockEnv();
  env.EMAIL.send = async () => {
    throw new Error("Internal Cloudflare Mail Gateway Error");
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
  assert.equal(data.error, "Internal Cloudflare Mail Gateway Error");
  assert.equal(data.stack, undefined);
});

