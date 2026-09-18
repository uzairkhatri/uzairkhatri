import type { Metadata } from "next";
import styles from "../insights.module.css";
import SubPageNav from "@/components/SubPageNav";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const ogImage = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "Deterministic Guardrails for Probabilistic Agents",
  description:
    "How to architect production guardrails for autonomous AI agents: Pydantic schema validation, LangGraph state checkpoints, circuit breakers, and dead-letter queues by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/insights/ai-agent-guardrails/",
  },
  openGraph: {
    title: "Deterministic Guardrails for Probabilistic Agents — Uzair Khatri",
    description: "Architecting production guardrails for autonomous AI agents: Pydantic schema validation, circuit breakers, and dead-letter queues.",
    url: "https://uzairkhatri.com/insights/ai-agent-guardrails/",
    images: [{ url: ogImage, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deterministic Guardrails for Probabilistic Agents — Uzair Khatri",
    description: "Architecting production guardrails for autonomous AI agents: Pydantic schema validation, circuit breakers, and dead-letter queues.",
    images: [ogImage],
  },
};


export default function AiAgentGuardrailsArticle() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Insights", url: "https://uzairkhatri.com/insights/" },
          { name: "AI Agent Guardrails", url: "https://uzairkhatri.com/insights/ai-agent-guardrails/" },
        ]}
      />
      <TechArticleJsonLd
        title="Deterministic Guardrails for Probabilistic Agents: Pydantic, Circuit Breakers & Dead-Letter Queues"
        description="How to architect production guardrails for autonomous AI agents: Pydantic schema validation, LangGraph state checkpoints, circuit breakers, and dead-letter queues by Uzair Khatri."
        url="https://uzairkhatri.com/insights/ai-agent-guardrails/"
        image={ogImage}
      />

      <SubPageNav backHref={withBasePath("/insights/")} backLabel="All Insights" />

      <header className={styles.articleHero}>
        <div className={styles.articleHeroInner}>
          <div className={styles.articleMeta}>
            <span>Agentic Engineering</span>
            <span>·</span>
            <span>11 min read</span>
            <span>·</span>
            <span>Sept 2026</span>
          </div>
          <h1 className={styles.articleTitle}>
            Deterministic Guardrails for Probabilistic Agents: Pydantic, Circuit Breakers &amp; Dead-Letter Queues
          </h1>
          <p className={styles.articleLead}>
            Autonomous agents are powerful because they are probabilistic. That same trait makes them
            unacceptable in mission-critical software without deterministic perimeter fences. Here is how
            we build unbreakable runtime boundaries.
          </p>
          <div className={styles.articleAuthor}>
            <span>By <strong>Uzair Khatri</strong> · Principal AI Systems Architect</span>
          </div>
        </div>
      </header>

      <article className={styles.articleContent}>
        <div className={styles.articleInner}>
          <h2>The Problem with &ldquo;Prompt-Only&rdquo; Guardrails</h2>
          <p>
            When engineering teams encounter unwanted agent behavior, the default reflex is to add more rules
            to the system prompt: <em>&ldquo;You MUST ALWAYS return valid JSON&rdquo;</em> or <em>&ldquo;NEVER execute
            deletions without confirmation.&rdquo;</em>
          </p>
          <p>
            This is a category error. System prompts are soft guidance; they are suggestions given to a
            statistical token predictor. They are not deterministic control structures. Under stress, long
            context windows, or adversarial inputs, prompt-only constraints decay.
          </p>

          <div className={styles.callout}>
            <strong>Architectural Axiom</strong>
            <p>
              Never use a probabilistic model to police another probabilistic model when deterministic code
              can execute the check in sub-millisecond time.
            </p>
          </div>

          <h2>The Three-Tier Guardrail Architecture</h2>
          <p>
            In production systems like Wellows, we enforce guardrails across three distinct architectural
            perimeters:
          </p>

          <pre className={styles.schematic}>
{`[User Input]
     ↓
[Tier 1: Ingress Guardrail] ──(Pass/Reject)──→ Fast Token/Injection Filter
     ↓
[Tier 2: Runtime Sandbox]   ──(StateGraph) ──→ Max Iteration & Tool Whitelist
     ↓
[Tier 3: Egress Validator]  ──(Pydantic)   ──→ Strict Schema Contract & Asserts
     ↓
[Safe Output Dispatched]`}
          </pre>

          <h3>Tier 1: Ingress Screening &amp; Input Normalization</h3>
          <p>
            Before a customer query touches an expensive reasoning model, it passes through lightweight
            deterministic sanitization:
          </p>
          <ul>
            <li><strong>Input Token Truncation:</strong> Hard ceiling on payload length preventing context window exhaustion attacks.</li>
            <li><strong>Adversarial Pattern Matching:</strong> Fast regex and embedding checks screening for jailbreak templates (e.g. &ldquo;Ignore previous instructions&rdquo;).</li>
            <li><strong>Intent Router:</strong> Directing administrative or read-only queries to deterministic SQL/cache handlers without invoking an agent at all.</li>
          </ul>

          <h3>Tier 2: Runtime Execution Sandboxes</h3>
          <p>
            Within LangGraph, every agent node executes within constrained boundaries:
          </p>
          <ul>
            <li><strong>Hard Recursion Limits:</strong> LangGraph state graphs must be initialized with strict <code>recursion_limit</code> caps (typically 10–15 steps). If an agent fails to reach a terminal state within the budget, it transitions immediately to an error node.</li>
            <li><strong>Scoped Tool Credentials:</strong> Agent tool calls execute using scoped service accounts with least-privilege permissions. An agent analyzing a database never possesses write credentials.</li>
            <li><strong>Human-in-the-Loop Escalation:</strong> High-consequence actions (e.g. sending a customer email, initiating a wire transfer, or deleting a record) emit a suspended state waiting for explicit human review.</li>
          </ul>

          <h3>Tier 3: Egress Schema Validation via Pydantic</h3>
          <p>
            An agent cannot emit freeform text to the frontend product. Every agent output is parsed against
            a strict Pydantic model:
          </p>
          <ul>
            <li>Fields must match exact enum definitions and types.</li>
            <li>Missing required attributes automatically trigger a single repair pass with targeted error feedback.</li>
            <li>If repair fails, the orchestrator emits a structured fallback payload rather than unparsed garbage.</li>
          </ul>

          <h2>Circuit Breakers and Dead-Letter Replay</h2>
          <p>
            When external model APIs experience transient outages or 429 rate limits, naive agent systems
            either hang or crash. In our architectures, we wrap external calls in circuit breaker state
            machines:
          </p>
          <ol>
            <li><strong>Closed State:</strong> Requests execute normally. Latency and error rates are monitored.</li>
            <li><strong>Open State:</strong> If error rates cross 15% over a 60-second window, the circuit trips. Outgoing calls are immediately routed to a secondary provider (e.g. AWS Bedrock Claude fallback) without hammering the failing API.</li>
            <li><strong>Dead-Letter Queue (DLQ):</strong> Unresolvable tasks are serialized into an SQS dead-letter queue with full execution state, allowing engineers to inspect the exact prompt trace and replay without data loss.</li>
          </ol>

          <div className={styles.articleCta}>
            <h3>Need to harden your autonomous AI workflows?</h3>
            <p>
              I architect deterministic runtime guardrails, LangGraph state persistence, and fault-isolated
              agent clusters for teams building enterprise AI applications.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.articleCtaBtn}>
              Book an Agent Architecture Review
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
