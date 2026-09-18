import type { Metadata } from "next";
import styles from "./insights.module.css";
import SubPageNav from "@/components/SubPageNav";
import { withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "Architecture Insights & Engineering Essays",
  description:
    "Production AI architecture teardowns, agentic guardrail blueprints, RAG checklists, and distributed systems engineering notes by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/insights/",
  },
  openGraph: {
    title: "AI Architecture Insights & Technical Essays — Uzair Khatri",
    description: "Production AI systems teardowns, LangGraph multi-agent guardrails, and enterprise RAG checklists.",
    url: "https://uzairkhatri.com/insights/",
    images: [{ url: image, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Architecture Insights & Technical Essays — Uzair Khatri",
    description: "Production AI systems teardowns, LangGraph multi-agent guardrails, and enterprise RAG checklists.",
    images: [image],
  },
};


const articles = [
  {
    slug: "production-ai-architecture",
    category: "Architecture Philosophy",
    readTime: "8 min read",
    date: "Sept 2026",
    title: "The Shift From Prototype to System: Why 80% of AI Demos Never Survive Production",
    excerpt:
      "A prototype proves a model can generate an answer. An architecture guarantees the system survives rate limits, context window bloat, cascading hallucination loops, and unpredictable API bills.",
  },
  {
    slug: "ai-agent-guardrails",
    category: "Agentic Engineering",
    readTime: "11 min read",
    date: "Sept 2026",
    title: "Deterministic Guardrails for Probabilistic Agents: Pydantic, Circuit Breakers & Dead-Letter Queues",
    excerpt:
      "How to build unshakeable boundary layers around autonomous LangGraph agents: schema validation gates, error isolation, exponential retry backoff, and human escalation thresholds.",
  },
  {
    slug: "rag-production-checklist",
    category: "Retrieval Engineering",
    readTime: "9 min read",
    date: "Sept 2026",
    title: "Beyond Naive Vector Search: The Production RAG Architecture Checklist",
    excerpt:
      "Why top-k cosine similarity fails under live customer queries. Implementing chunking strategies, hybrid dense-sparse indexing, Cohere cross-encoder re-ranking, and sub-200ms latency budgets.",
  },
  {
    slug: "ai-agent-evaluation",
    category: "Systems Evaluation",
    readTime: "10 min read",
    date: "Sept 2026",
    title: "Evaluating Multi-Agent Systems in Production Without Burning Your API Budget",
    excerpt:
      "Continuous evaluation frameworks for non-deterministic agent clusters: synthetic regression tests, LLM-as-a-judge boundaries, trajectory scoring, and cost-governed automated benchmarks.",
  },
];

export default function InsightsHub() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Insights", url: "https://uzairkhatri.com/insights/" },
        ]}
      />

      <SubPageNav />

      <header className={styles.hubHero}>
        <div className={styles.hubHeroInner}>
          <p className={styles.hubEyebrow}>Architecture Notes &amp; Technical Essays</p>
          <h1 className={styles.hubTitle}>
            Engineering proof, <em>not marketing fluff.</em>
          </h1>
          <p className={styles.hubDesc}>
            Deep architectural teardowns, production failure mode analyses, and deterministic systems
            patterns from building production AI agents, distributed backends, and cloud SaaS platforms.
          </p>
        </div>
      </header>

      <main className={styles.hubSection}>
        <div className={styles.hubGrid}>
          {articles.map((art) => (
            <a
              href={withBasePath(`/insights/${art.slug}/`)}
              className={styles.hubCard}
              key={art.slug}
            >
              <div className={styles.hubCardHeader}>
                <div className={styles.hubCardMeta}>
                  <span>{art.category}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className={styles.hubCardTitle}>{art.title}</h2>
                <p className={styles.hubCardExcerpt}>{art.excerpt}</p>
              </div>
              <span className={styles.hubCardCta}>
                Read Teardown →
              </span>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
