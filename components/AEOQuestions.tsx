import styles from "./AEOQuestions.module.css";
import Link from "next/link";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { FaqJsonLd } from "./JsonLd";

interface Capability {
  tag: string;
  title: string;
  desc: string;
  tags: string[];
}

const capabilities: Capability[] = [
  {
    tag: "01 / Production AI",
    title: "AI Services & Architectures",
    desc: "Transforming prototype LLM prompts into resilient enterprise systems. Specializing in multi-agent LangGraph runtimes, hybrid vector search (RAG), Pydantic deterministic guardrails, and model failover routines.",
    tags: ["LangGraph", "Vector RAG", "OpenAI / Claude", "Bedrock Failover", "LangSmith"]
  },
  {
    tag: "02 / Agentic Operations",
    title: "Autonomous AI Workflows",
    desc: "Designing stateful, fault-isolated agent workflows with structured memory contracts, asynchronous worker queues, dead-letter retry buffers, and human-in-the-loop review gates.",
    tags: ["State Machines", "Celery / Redis", "Dead-Letter Queues", "HITL Review", "Async Buses"]
  },
  {
    tag: "03 / Scalable Platforms",
    title: "SaaS Applications & Backends",
    desc: "Engineering multi-tenant SaaS platforms with distributed concurrency safety (Redis Redlock), automated Stripe Connect payout reconciliation, high-throughput Postgres schemas, and cloud deployment.",
    tags: ["Multi-Tenant", "Stripe Connect", "Redis Redlock", "FastAPI / Python", "AWS ECS / RDS"]
  },
  {
    tag: "04 / Modern Frontend",
    title: "Full-Stack Web Development",
    desc: "Architecting high-performance Next.js 15 web applications with React 19, TypeScript, server-side streaming, 3D Canvas visualizers, and sub-50ms edge content delivery.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Three.js", "Cloudflare Edge"]
  }
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
    question: "What is your approach to modern full-stack web development?",
    answer: "I build production web applications using Next.js 15 with the App Router, React 19 Server Components, TypeScript, and Tailwind/Vanilla CSS Modules. Sites are optimized for sub-50ms global Time-to-First-Byte (TTFB) via Cloudflare Edge delivery, paired with custom 3D WebGL/Three.js interactive visuals."
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
            Specialized Engineering
          </div>
          <h2 className={styles.title}>
            Core Capabilities: AI Services, SaaS & Web Engineering
          </h2>
          <p className={styles.subtitle}>
            Senior architectural judgment across four high-leverage domains, closing the gap between prototype demos and dependable enterprise production.
          </p>
        </header>

        <div className={styles.grid}>
          {capabilities.map((cap) => (
            <article key={cap.title} className={styles.card}>
              <div className={styles.cardTag}>{cap.tag}</div>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardDesc}>{cap.desc}</p>
              <div className={styles.tagList}>
                {cap.tags.map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
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
