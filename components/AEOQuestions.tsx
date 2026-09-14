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
    serviceHref: "/services/ai-systems/",
  },
  {
    tag: "03 / 0 to 1 Execution",
    title: "AI Product Engineering",
    pillars: "0 to 1 Build · Concurrency Locks · Ledgers",
    desc: "Shipping resilient, monetizable SaaS platforms with distributed concurrency safety, transactional ledger balance, and intuitive controls.",
    serviceHref: "/services/ai-systems/",
  },
  {
    tag: "04 / Cloud & Edge",
    title: "Cloud & Platform Infrastructure",
    pillars: "AWS Cloud · Edge Delivery · Sub-50ms TTFB",
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
    question: "What specific AI services does Uzair Khatri provide?",
    answer: "I provide end-to-end AI systems architecture: multi-agent runtime design using LangGraph, RAG and hybrid vector search pipelines, deterministic schema guardrails to prevent hallucination, multi-model failover between OpenAI and Anthropic Claude via AWS Bedrock, and cost-observability dashboards with LangSmith."
  },
  {
    question: "How do you build and architect scalable SaaS applications?",
    answer: "SaaS applications require rigorous data integrity and concurrency guarantees. I design multi-tenant cloud backends in Python (FastAPI) and Node.js, utilizing Redis Redlock distributed mutexes to eliminate race conditions, Celery/SQS worker queues for asynchronous load buffering, and Stripe Connect automated payout ledgers."
  },
  {
    question: "How do you approach the application layer and frontend for AI systems?",
    answer: "An AI architecture is only as reliable as the interface delivering it. I engineer high-performance web platforms using Next.js 15 App Router, React 19 Server Components, and edge streaming. Interfaces are built for sub-50ms TTFB, optimistic state transitions, and responsive visualization of complex agent telemetry."
  },
  {
    question: "What are agentic AI workflows and how do they benefit enterprises?",
    answer: "Agentic AI workflows replace fragile single-prompt chains with coordinated, specialized agents (e.g. data ingestion, reasoning, validation, and citation). Each agent operates within strict memory contracts, retry limits, and dead-letter queues so an error in one component never crashes the customer-facing application."
  },
  {
    question: "How can we start an engagement or architecture review?",
    answer: "You can book an introductory 30-minute Architecture Review session directly via Calendly or email hello@uzairkhatri.com. We will pressure-test your current system, identify failure risks, and outline a concrete production roadmap."
  }
];

export default function AEOQuestions() {
  return (
    <section className={styles.section} id="capabilities" aria-label="Capabilities and FAQ">
      <FaqJsonLd />
      <div className={styles.shell}>
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

        <div className={styles.faqContainer}>
          <h3 className={styles.faqTitle}>
            Frequently Asked Questions (AEO & Architecture Insights)
          </h3>
          {faqs.map((faq, idx) => (
            <details key={faq.question} className={styles.faqItem} open={idx === 0}>
              <summary className={styles.faqSummary}>{faq.question}</summary>
              <div className={styles.faqBody}>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
