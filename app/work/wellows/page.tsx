import type { Metadata } from "next";
import styles from "./page.module.css";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import ProjectVisual from "@/components/ProjectVisual";

export const metadata: Metadata = {
  title: "Wellows Case Study | Uzair Khatri",
  description:
    "How I designed the production AI architecture for Wellows, a multi-agent search visibility platform with KIVA, OPTA, and Citation Intelligence operating across LLM ecosystems.",
};

function BackIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4 6 9l5 5" />
    </svg>
  );
}

const decisions = [
  {
    title: "Multi-agent over monolith",
    problem:
      "A single AI pipeline for keyword discovery, technical auditing, and brand citation monitoring would share failure modes. One model hallucination or rate-limit would block everything.",
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

const timeline = [
  ["Week 1-2", "Architecture clarity session. Mapped product goals, user flows, constraints, and the three agent contracts before implementation."],
  ["Week 3-4", "Built KIVA: keyword intelligence engine, vector ingestion pipeline, OpenAI integration, and production output schema."],
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
    label: "Concurrent-request target",
    note: "Load-tested target capacity with SQS queue depth and ECS auto-scaling validated before handoff.",
  },
];

export default function WellowsCaseStudy() {
  return (
    <div className={styles.page}>
      <nav className={styles.topNav}>
        <a href={withBasePath("/")} className={styles.back}>
          <BackIcon />
          Uzair Khatri
        </a>
        <a href={withBasePath("/#work")} className={styles.backWork}>
          All work
        </a>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.tag}>AI Agents / SaaS</span>
              <span className={styles.tag}>11-week delivery</span>
              <span className={styles.tag}>Founding Architect</span>
            </div>
            <h1 className={styles.heroTitle}>Wellows</h1>
            <p className={styles.heroSub}>AI Search Visibility Platform</p>
            <p className={styles.heroDesc}>
              How I designed the production architecture for a multi-agent platform tracking brand
              visibility across ChatGPT, Gemini, Perplexity, and Google AI, moving from prototype to
              live business system in eleven weeks.
            </p>
            <div className={styles.heroFacts}>
              <span><strong>3</strong> production agents</span>
              <span><strong>80%</strong> fewer manual workflow steps</span>
              <span><strong>&lt;200ms</strong> vector retrieval</span>
            </div>
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
              Keyword research, technical auditing, and citation monitoring each ran manually. None
              shared data. There was no orchestration, cost control, observability, or failure
              isolation. A rate limit or API timeout could break the pipeline silently.
            </p>
            <p>
              The work was to turn the demo into a product architecture: agents with clear
              responsibilities, a shared retrieval layer, async processing, typed APIs, and
              production operating controls.
            </p>
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
                    <span>Keyword intelligence and search opportunity discovery</span>
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
          <p className={styles.eyebrowLight}>Work together</p>
          <h2 className={styles.ctaTitle}>Moving AI from prototype to production?</h2>
          <p className={styles.ctaDesc}>
            I do not do patch jobs. If the architecture is wrong, I will tell you before another
            expensive layer gets built on top of it.
          </p>
          <div className={styles.ctaActions}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
              Book Architecture Call
            </a>
            <a href={withBasePath("/#work")} className={styles.ctaSecondary}>
              View all work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
