import styles from "./AEOQuestions.module.css";
import Link from "next/link";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { FaqJsonLd } from "./JsonLd";

interface Capability {
  tag: string;
  title: string;
  pillars: string;
  desc: string;
  serviceHref: string;
}

const capabilities: Capability[] = [
  {
    tag: "01 / Production AI",
    title: "Production AI Architecture",
    pillars: "Agents · RAG · Evaluation · Observability",
    desc: "Turning fragile AI prototypes into hardened systems that operate reliably at enterprise scale with deterministic schema guardrails.",
    serviceHref: "/services/ai-systems/",
  },
  {
    tag: "02 / Systems Topology",
    title: "Enterprise Systems Topology",
    pillars: "State Machines · Queues · Failover · Audit",
    desc: "Structuring microservices and multi-agent workflows with strict memory boundaries, asynchronous worker queues, and automated recovery.",
    serviceHref: "/services/ai-agents/",
  },
  {
    tag: "03 / 0 to 1 Execution",
    title: "AI Product Engineering",
    pillars: "0 to 1 Build · Concurrency Locks · Ledgers",
    desc: "Shipping resilient, monetizable SaaS platforms with distributed concurrency safety, transactional ledger balance, and intuitive controls.",
    serviceHref: "/services/saas-architecture/",
  },
  {
    tag: "04 / Cloud & Edge",
    title: "Cloud & Platform Infrastructure",
    pillars: "AWS Cloud · Edge Delivery · Global CDN Caching",
    desc: "Deploying high-throughput Next.js and FastAPI runtimes with global edge caching, automated CI/CD pipelines, and enterprise SLA compliance.",
    serviceHref: "/services/ai-systems/",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Can you work with an AI system or codebase we already have in production?",
    answer: "Yes. A substantial portion of my work involves stabilizing systems that already have users but suffer from hallucinations, rate-limit failures, latency spikes, or runaway token costs. We isolate the architectural failure points without forcing a disruptive ground-up rewrite."
  },
  {
    question: "Do you build the system directly or only provide high-level architecture advisory?",
    answer: "Both, depending on your team's needs. In dedicated Build engagements, I write production code—submitting PRs for agent state graphs, vector retrieval, and Redis concurrency locks. In Advisory sprints or fractional retainers, I review architecture specs, enforce boundaries, and mentor lead engineers through complex decisions."
  },
  {
    question: "How do you embed with our existing engineering team?",
    answer: "I embed directly into your GitHub/GitLab repositories, pull requests, and Slack channels. I work alongside your CTO and senior backend engineers, establishing rigorous patterns and leaving your team with complete code ownership, telemetry dashboards, and clear operational runbooks."
  },
  {
    question: "What stage is the best time to bring you in?",
    answer: "The two highest-ROI moments are: (1) Prototype-to-Production—when your demo works and you need to harden state, queues, cost controls, and security before launch, and (2) Scale Bottleneck—when real customer load exposes concurrency flaws, dropped jobs, or high model failure rates."
  },
  {
    question: "How does an initial engagement start?",
    answer: "We begin with a focused 30-minute architecture strategy session to discuss your system constraints and bottlenecks. From there, we either execute a 1–2 week Architecture Audit or structure a 4–8 week critical-path build."
  }
];

interface AEOQuestionsProps {
  /** Which half to render. Services and FAQ sit at different points on the page. */
  show?: "services" | "faq";
}

export default function AEOQuestions({ show = "services" }: AEOQuestionsProps) {
  const isFaq = show === "faq";
  return (
    <section
      className={styles.section}
      id={isFaq ? "faq" : "capabilities"}
      aria-label={isFaq ? "Frequently asked questions" : "Core architectural services"}
    >
      {isFaq && <FaqJsonLd />}
      <div className={styles.shell}>
        {!isFaq && (<>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            High-Leverage Impact
          </div>
          <h2 className={styles.title}>
            Core Architectural Services
          </h2>
          <p className={styles.subtitle}>
            Senior architectural judgment across four high-stakes domains—closing the gap between promising AI prototypes and dependable enterprise production.
          </p>
        </header>

        <div className={styles.grid}>
          {capabilities.map((cap) => (
            <article key={cap.title} className={styles.card}>
              <div className={styles.cardTag}>{cap.tag}</div>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <div className={styles.cardPillars}>{cap.pillars}</div>
              <p className={styles.cardDesc}>{cap.desc}</p>
              <Link href={withBasePath(cap.serviceHref)} className={styles.serviceLink}>
                Explore service &rarr;
              </Link>
            </article>
          ))}
        </div>

        </>)}

        {isFaq && (
        <div className={styles.faqContainer}>
          <h3 className={styles.faqTitle}>
            Frequently Asked Questions (Engagement &amp; Delivery)
          </h3>
          {faqs.map((faq) => (
            <details key={faq.question} className={styles.faqItem}>
              <summary className={styles.faqSummary}>{faq.question}</summary>
              <div className={styles.faqBody}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
