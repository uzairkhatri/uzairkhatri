import styles from "./Writing.module.css";
import { withBasePath } from "./siteLinks";

interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
}

const articles: Article[] = [
  {
    slug: "production-ai-architecture",
    category: "Architecture Philosophy",
    readTime: "8 min read",
    title: "Why 80% of AI Demos Never Survive Production",
    summary:
      "The shift from prototype to system: surviving rate limits, context window bloat, cascading hallucination loops, and unpredictable API bills under enterprise traffic.",
  },
  {
    slug: "ai-agent-guardrails",
    category: "Agentic Engineering",
    readTime: "11 min read",
    title: "Deterministic Guardrails for Probabilistic Agents",
    summary:
      "Building unshakeable boundary layers around autonomous LangGraph agents: Pydantic v2 schema validation gates, error isolation, exponential backoff, and dead-letter queues.",
  },
  {
    slug: "rag-production-checklist",
    category: "Retrieval Engineering",
    readTime: "9 min read",
    title: "Beyond Naive Vector Search: Production RAG Checklist",
    summary:
      "Why top-k cosine similarity fails under live customer queries. Implementing chunking strategies, hybrid dense-sparse indexing, Cohere reranking, and sub-200ms latency budgets.",
  },
  {
    slug: "ai-agent-evaluation",
    category: "Systems Evaluation",
    readTime: "10 min read",
    title: "Evaluating Multi-Agent Systems in Production",
    summary:
      "Continuous evaluation frameworks for non-deterministic agent clusters: synthetic regression tests, LLM-as-a-judge boundaries, trajectory scoring, and cost-governed automated benchmarks.",
  },
];

export default function Writing() {
  return (
    <section className={`${styles.section} reveal-section`} id="insights" aria-labelledby="writing-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className="section-eyebrow">
              <span />
              Insights &amp; Architecture Notes
            </div>
            <h2 id="writing-title">How I build past the prototype.</h2>
          </div>
          <div>
            <p className={styles.headerLead}>
              In-depth architectural teardowns, production failure mode analyses, and deterministic systems patterns from building production AI agents, distributed backends, and cloud SaaS platforms.
            </p>
            <a href={withBasePath("/insights/")} className={styles.hubLink}>
              Explore all technical essays &rarr;
            </a>
          </div>
        </header>

        <div className={styles.grid}>
          {articles.map((art, index) => (
            <article
              className={`${styles.card} ${index === 0 ? styles.featured : ""} reveal-item`}
              key={art.slug}
            >
              <div className={styles.metaRow}>
                <span className={styles.category}>{art.category}</span>
                <span className={styles.readTime}>{art.readTime}</span>
              </div>
              <h3>{art.title}</h3>
              <p>{art.summary}</p>
              <a
                href={withBasePath(`/insights/${art.slug}/`)}
                title={`Read ${art.title}`}
                className={styles.articleLink}
              >
                Read Technical Note &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
