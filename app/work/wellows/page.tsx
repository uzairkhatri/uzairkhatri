import type { Metadata } from "next";
import styles from "./page.module.css";
import SubPageNav from "@/components/SubPageNav";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import ProjectVisual from "@/components/ProjectVisual";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";
import CaseStudyAuditCTA from "@/components/CaseStudyAuditCTA";

const ogImage = "https://uzairkhatri.com/linkedin-featured/case-studies.png?v=20260921";

export const metadata: Metadata = {
  title: "Wellows Case Study — Multi-Agent AI Workflow Architecture",
  description:
    "How Uzair Khatri designed the production AI services and multi-agent workflow architecture for Wellows, an LLM search visibility platform measuring brand citations across ChatGPT, Gemini, Perplexity, and Google AI, then closing gaps through automated content and technical remediation.",
  alternates: {
    canonical: "https://uzairkhatri.com/work/wellows/",
  },
  openGraph: {
    title: "Wellows Case Study — Multi-Agent AI Workflow Architecture",
    description: "An LLM search visibility platform that measures brand citations in AI answers, then closes the gaps through automated remediation. Multi-agent architecture on LangGraph.",
    url: "https://uzairkhatri.com/work/wellows/",
    images: [{ url: ogImage, width: 1734, height: 907, alt: "Wellows Architecture Case Study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellows Case Study — Multi-Agent AI Workflow Architecture",
    description: "An LLM search visibility platform that measures brand citations in AI answers, then closes the gaps through automated remediation. Multi-agent architecture on LangGraph.",
    images: [ogImage],
  },
};


const decisions = [
  {
    title: "Multi-agent over monolith",
    problem:
      "A single AI pipeline for citation monitoring, technical auditing, and content drafting would share failure modes. One model hallucination or rate-limit would block everything.",
    decision:
      "Designed three specialized agents with isolated responsibilities, separate retry logic, and a shared retrieval layer. Failure in one agent does not propagate to the rest of the system.",
    tradeoff:
      "More orchestration complexity upfront, but operational independence at scale. LangGraph handled the coordination contract.",
  },
  {
    title: "Vector search as the retrieval spine",
    problem:
      "LLM outputs needed grounding in real brand data: keyword corpuses, competitive citations, and crawl artifacts, without re-indexing on every query.",
    decision:
      "Built a vector search layer with chunked ingestion pipelines. Agents query the same store while new data is ingested asynchronously.",
    tradeoff:
      "Requires careful chunk sizing and embedding consistency. Paid off in sub-200ms retrieval latency at query time.",
  },
  {
    title: "Remediation grounded in the same retrieval layer as the audit",
    problem:
      "Measuring a visibility gap is only half the product. Drafting content to close that gap without the brand corpus and citation findings produced output that contradicted the platform's own analysis.",
    decision:
      "Pointed KIVA at the same Qdrant store the monitoring agents query, so every draft is grounded in the crawl artifacts and citation history that identified the gap in the first place.",
    tradeoff:
      "Remediation inherits the retrieval layer's freshness constraints, but measurement and fix stay consistent and one ingestion pipeline serves both.",
  },
  {
    title: "FastAPI for the agent API surface",
    problem:
      "Orchestration results needed to be consumed by a frontend product team without coupling them to LangGraph internals.",
    decision:
      "Wrapped agent outputs in a clean FastAPI layer with typed response schemas. The frontend receives structured JSON instead of internal orchestration details.",
    tradeoff:
      "An extra serialization layer, but essential for team separation. Agent internals can change without breaking the product contract.",
  },
  {
    title: "AWS-native infrastructure",
    problem:
      "Managed AI wrappers abstract away control at the cost of observability and cost predictability, both non-negotiable at production scale.",
    decision:
      "Used SQS for async job queuing, ECS for agent containers, and CloudWatch for observability. Kept AI logic in code, not in proprietary platform abstractions.",
    tradeoff:
      "More infrastructure ownership, but the team owns failure paths, instrumentation, and cost controls.",
  },
];

const constraints = [
  {
    label: "Latency SLA",
    title: "<200ms Vector Retrieval",
    text: "Brand monitoring queries demanded immediate sub-second dashboard rendering, precluding naive, synchronous multi-LLM re-ranking on the critical user path.",
  },
  {
    label: "Tenant Cost Governance",
    title: "Strict Token Spend Caps",
    text: "Continuous crawling, citation audits, and remediation content at 10K+ articles a month could easily balloon API costs if agent loops ran unbounded without strict token quotas and deterministic cycle limits.",
  },
  {
    label: "Failure Isolation",
    title: "Zero Shared Mutable State",
    text: "A transient timeout or hallucination in the content drafting agent (KIVA) could not be allowed to corrupt memory or interrupt ongoing technical audits (OPTA).",
  },
];

const failureModes = [
  {
    tag: "Failure Mode 01",
    title: "Model Hallucination & Schema Drift",
    impact: "An LLM returning unstructured markdown or omitting required schema keys would crash the downstream frontend dashboard.",
    defense: "Strict Pydantic JSON schema contracts enforced on every agent step. If validation fails, LangGraph triggers an automated correction prompt with lowered temperature before routing to human fallback.",
  },
  {
    tag: "Failure Mode 02",
    title: "Third-Party Rate Limits (HTTP 429)",
    impact: "Concurrent enterprise brand audits overwhelming OpenAI or Perplexity rate limits, causing pipeline abortion and data loss.",
    defense: "Decoupled asynchronous worker queues using AWS SQS and Celery with exponential backoff and jitter, combined with automated model failover via AWS Bedrock.",
  },
  {
    tag: "Failure Mode 03",
    title: "Cascading Multi-Agent Deadlocks",
    impact: "One slow or stuck agent blocking the entire evaluation graph, leaving user requests hanging indefinitely.",
    defense: "Independent circuit breakers per agent. If an agent fails after 3 retry cycles, the orchestrator issues a partial result flag, saves checkpoints, and completes the remaining workflow.",
  },
  {
    tag: "Failure Mode 04",
    title: "Vector Retrieval Context Poisoning",
    impact: "Outdated crawl snippets or redundant competitive brand mentions polluting the LLM context window with high noise.",
    defense: "Semantic deduplication, chunked ingestion pipelines with TTL expiration, and cross-encoder re-ranking ensuring only the top-5 verified citations enter the prompt.",
  },
];

const timeline = [
  ["Week 1-2", "Architecture clarity session. Mapped product goals, user flows, constraints, and the three agent contracts before implementation."],
  ["Week 3-4", "Built KIVA: the writing assistant drafting remediation content against retrieved brand context, plus the vector ingestion pipeline, OpenAI integration, and production output schema."],
  ["Week 5-6", "Built OPTA: technical audit agent, crawler integration, remediation output format, and LangGraph orchestration wiring."],
  ["Week 7-8", "Built Citation Intelligence: multi-LLM monitoring across ChatGPT, Gemini, and Perplexity with sentiment diff logic."],
  ["Week 9-10", "Production hardening: retry logic, cost controls, observability dashboards, load testing, and FastAPI contract finalization."],
  ["Week 11", "Handoff: architecture documentation, agent operating playbooks, team onboarding, and zero open critical issues."],
];

const outcomes = [
  {
    value: "3",
    label: "Production AI agents shipped",
    note: "KIVA, OPTA, and Citation Intelligence, each with defined responsibilities and independent failure paths.",
  },
  {
    value: "80%",
    label: "Reduction in manual workflow steps",
    note: "Measured against the pre-agent manual analysis process the client used before the platform.",
  },
  {
    value: "<200ms",
    label: "Vector retrieval latency",
    note: "Achieved through chunked ingestion design and a shared retrieval layer across all three agents.",
  },
  {
    value: "10K+",
    label: "Articles generated per month",
    note: "Automated remediation output, grounded against the shared Qdrant retrieval layer and processed through SQS-backed generation, review, and publishing services.",
  },
];

export default function WellowsCaseStudy() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Selected Work", url: "https://uzairkhatri.com/#work" },
          { name: "Wellows Case Study", url: "https://uzairkhatri.com/work/wellows/" },
        ]}
      />
      <TechArticleJsonLd
        title="Wellows Case Study — Multi-Agent AI Workflow Architecture"
        description="How Uzair Khatri designed the production AI services and multi-agent workflow architecture for Wellows, an LLM search visibility platform measuring brand citations across ChatGPT, Gemini, Perplexity, and Google AI, then closing gaps through automated content and technical remediation."
        url="https://uzairkhatri.com/work/wellows/"
        image="https://uzairkhatri.com/linkedin-featured/case-studies.png?v=20260921"
      />
      <SubPageNav />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.tag}>AI Agents / SaaS</span>
              <span className={styles.tag}>11-week delivery</span>
              <span className={styles.tag}>Solutions Architect</span>
            </div>
            <h1 className={styles.heroTitle}>
              Wellows <span style={{ display: "block", fontSize: "0.5em", color: "var(--gold-bright)", fontWeight: 700, marginTop: "0.35rem", letterSpacing: "0.02em" }}>Multi-Agent AI Workflow Architecture</span>
            </h1>
            <p className={styles.heroSub}>LLM Search Visibility Platform</p>
            <p className={styles.heroDesc}>
              How I designed the production architecture for a platform that measures whether a brand
              shows up in AI answers across ChatGPT, Gemini, Perplexity, and Google AI, then closes
              the gaps it finds through automated content generation and technical page remediation.
              Prototype to live business system in eleven weeks.
            </p>
            <div className={styles.heroFacts}>
              <span><strong>3</strong> production agents</span>
              <span><strong>80%</strong> fewer manual workflow steps</span>
              <span><strong>&lt;200ms</strong> vector retrieval</span>
            </div>
            <p className={styles.heroLive}>
              <a href="https://wellows.com" target="_blank" rel="noreferrer">
                View the live platform &rarr;
              </a>
            </p>
          </div>
          <ProjectVisual type="wellows" variant="hero" />
        </div>
      </header>

      <section className={styles.section} aria-label="The problem">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The problem</p>
          <h2 className={styles.sectionTitle}>
            The prototype worked in demos. It was not ready for production.
          </h2>
          <div className={styles.prose}>
            <p>
              Wellows had a strong product hypothesis: brands are losing visibility inside LLM
              ecosystems and do not know it. The prototype proved demand, but the system behind it
              was still a set of disconnected scripts.
            </p>
            <p>
              Citation monitoring, technical auditing, and content drafting each ran manually. None
              shared data, so content was written without the visibility findings that should have
              informed it. There was no orchestration, cost control, observability,
              or failure isolation. A rate limit or API timeout could break the pipeline silently.
            </p>
            <p>
              The work was to turn the demo into a product architecture where measurement and
              remediation share one spine: agents with clear responsibilities, a shared retrieval
              layer that grounds both the audit and the content written against it, async
              processing, typed APIs, and production operating controls.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Operating constraints">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Operating constraints</p>
          <h2 className={styles.sectionTitleLight}>
            The non-negotiable boundaries before writing code.
          </h2>
          <p className={styles.sectionDescLight}>
            Prototypes ignore limits. Production architectures are defined by them. These three
            constraints anchored every architectural choice we made.
          </p>
          <div className={styles.constraintsGrid}>
            {constraints.map((c) => (
              <div className={styles.constraintCard} key={c.label}>
                <span className={styles.constraintLabel}>{c.label}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Architecture decisions">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Architecture decisions</p>
          <h2 className={styles.sectionTitleLight}>
            The decisions that determined whether the system would survive production.
          </h2>
          <p className={styles.sectionDescLight}>
            These were not implementation details. They were the product boundaries that made the
            platform operable under real traffic, real cost, and real failure modes.
          </p>
          <div className={styles.decisionGrid}>
            {decisions.map((decision) => (
              <article className={styles.decisionCard} key={decision.title}>
                <h3>{decision.title}</h3>
                <div className={styles.decisionBlock}>
                  <span>Problem</span>
                  <p>{decision.problem}</p>
                </div>
                <div className={styles.decisionBlock}>
                  <span>Decision</span>
                  <p>{decision.decision}</p>
                </div>
                <div className={styles.decisionBlock}>
                  <span>Tradeoff accepted</span>
                  <p>{decision.tradeoff}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="System architecture">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>System architecture</p>
          <h2 className={styles.sectionTitle}>How the agents connect.</h2>
          <div className={styles.diagram}>
            <div className={styles.diagramLabel}>AWS infrastructure boundary</div>
            <div className={styles.diagramBody}>
              <div className={styles.diagramRow}>
                <div className={styles.diagramNode}>
                  <strong>Brand / user request</strong>
                  <span>FastAPI entry point</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={`${styles.diagramNode} ${styles.diagramCore}`}>
                  <strong>LangGraph orchestrator</strong>
                  <span>Routes tasks, manages retries, coordinates outputs</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramAgents}>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>KIVA</strong>
                    <span>Writing assistant drafting grounded remediation content</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>OPTA</strong>
                    <span>Technical audits and remediation workflows</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Citation Intelligence</strong>
                    <span>Brand mention tracking across LLM ecosystems</span>
                  </div>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramNode}>
                  <strong>Shared retrieval layer</strong>
                  <span>Vector search and real-time ingestion pipelines</span>
                </div>
              </div>

              <div className={styles.diagramInfra}>
                <div className={styles.diagramInfraItem}>
                  <span>SQS</span>
                  <p>Async job queue</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>ECS</span>
                  <p>Agent containers</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>CloudWatch</span>
                  <p>Observability</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>OpenAI / Claude</span>
                  <p>LLM backends</p>
                </div>
              </div>
            </div>
            <p className={styles.diagramNote}>
              No single point of failure. Each agent operates independently with isolated retry
              logic. A timeout in Citation Intelligence does not block KIVA from completing its
              task.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Failure modes and defenses">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Failure modes & defenses</p>
          <h2 className={styles.sectionTitle}>
            Where naive AI systems break — and how this architecture survives.
          </h2>
          <p className={styles.sectionDesc}>
            A resilient AI system is engineered around worst-case execution. These are the primary failure
            vectors identified during pressure-testing and the deterministic defenses built to neutralize them.
          </p>
          <div className={styles.failureGrid}>
            {failureModes.map((f) => (
              <article className={styles.failureCard} key={f.tag}>
                <div className={styles.failureHeader}>
                  <span className={styles.failureTag}>{f.tag}</span>
                  <h3>{f.title}</h3>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.failureLabel}>Production Impact</span>
                  <p>{f.impact}</p>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.defenseLabel}>Architectural Defense</span>
                  <p>{f.defense}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Build timeline">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Build timeline</p>
          <h2 className={styles.sectionTitleLight}>Eleven weeks, prototype to production.</h2>
          <div className={styles.timeline}>
            {timeline.map(([period, text]) => (
              <div className={styles.timelineItem} key={period}>
                <span className={styles.timelinePeriod}>{period}</span>
                <p className={styles.timelineText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Outcomes">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Outcomes</p>
          <h2 className={styles.sectionTitle}>What the architecture delivered.</h2>
          <p className={styles.sectionDesc}>
            These are production numbers, not decorative metrics. Every outcome connects to an
            architecture decision made before handoff.
          </p>
          <div className={styles.outcomeGrid}>
            {outcomes.map((outcome) => (
              <article className={styles.outcomeCard} key={outcome.value}>
                <strong className={styles.outcomeValue}>{outcome.value}</strong>
                <h3 className={styles.outcomeLabel}>{outcome.label}</h3>
                <p className={styles.outcomeNote}>{outcome.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-label="Call to action">
        <div className={styles.ctaInner}>
          <CaseStudyAuditCTA
            focusArea="Multi-Agent Systems & LLM Architecture"
            title="Moving your AI agents from prototype to production?"
            description="If your agent loops are freezing, hallucinating, or blowing past token budgets under concurrent load, let's triage your state isolation, tool-calling boundaries, and failure fallbacks."
          />
          <div className={styles.ctaActions} style={{ marginTop: "1.5rem" }}>
            <a href={withBasePath("/#work")} className={styles.ctaSecondary}>
              View all work &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
