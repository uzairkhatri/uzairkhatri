import type { Metadata } from "next";
import styles from "../insights.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const ogImage = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "The Production RAG Architecture Checklist — Uzair Khatri",
  description:
    "Why naive vector search fails in production. An architectural checklist covering chunking, hybrid BM25 search, semantic re-ranking, and sub-200ms latency budgets by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/insights/rag-production-checklist/",
  },
  openGraph: {
    title: "The Production RAG Architecture Checklist — Uzair Khatri",
    description: "Why naive vector search fails in production. Chunking, hybrid BM25 search, semantic re-ranking, and latency budgets.",
    url: "https://uzairkhatri.com/insights/rag-production-checklist/",
    images: [{ url: ogImage, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Production RAG Architecture Checklist — Uzair Khatri",
    description: "Why naive vector search fails in production. Chunking, hybrid BM25 search, semantic re-ranking, and latency budgets.",
    images: [ogImage],
  },
};

function BackIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1rem" }}>
      <path d="M11 4 6 9l5 5" />
    </svg>
  );
}

export default function RagProductionChecklistArticle() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Insights", url: "https://uzairkhatri.com/insights/" },
          { name: "Production RAG Checklist", url: "https://uzairkhatri.com/insights/rag-production-checklist/" },
        ]}
      />
      <TechArticleJsonLd
        title="Beyond Naive Vector Search: The Production RAG Architecture Checklist"
        description="Why naive vector search fails in production. An architectural checklist covering chunking, hybrid BM25 search, semantic re-ranking, and sub-200ms latency budgets by Uzair Khatri."
        url="https://uzairkhatri.com/insights/rag-production-checklist/"
        image={ogImage}
      />

      <nav className={styles.topNav}>
        <a href={withBasePath("/insights/")} className={styles.back}>
          <BackIcon />
          All Insights
        </a>
        <div className={styles.topNavRight}>
          <a href={withBasePath("/services/ai-systems/")} className={styles.topNavLink}>
            Services
          </a>
          <a href={withBasePath("/case-studies/")} className={styles.topNavLink}>
            Case Studies
          </a>
          <a href={CV_URL} target="_blank" rel="noreferrer" className={styles.topNavLink}>
            CV
          </a>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.topNavCta}>
            Book call
          </a>
        </div>
      </nav>

      <header className={styles.articleHero}>
        <div className={styles.articleHeroInner}>
          <div className={styles.articleMeta}>
            <span>Retrieval Engineering</span>
            <span>·</span>
            <span>9 min read</span>
            <span>·</span>
            <span>Sept 2026</span>
          </div>
          <h1 className={styles.articleTitle}>
            Beyond Naive Vector Search: The Production RAG Architecture Checklist
          </h1>
          <p className={styles.articleLead}>
            Embedding raw text documents into a vector database and querying top-5 cosine similarity works
            great on a 10-page demo PDF. In production, it yields irrelevant snippets, hallucinated summaries,
            and 3-second query latencies. Here is how to architect enterprise retrieval.
          </p>
          <div className={styles.articleAuthor}>
            <span>By <strong>Uzair Khatri</strong> · Principal AI Systems Architect</span>
          </div>
        </div>
      </header>

      <article className={styles.articleContent}>
        <div className={styles.articleInner}>
          <h2>The Failure of Naive Retrieval</h2>
          <p>
            Most tutorials teach the standard RAG pipeline: load document &rarr; split by 500 characters &rarr;
            embed with OpenAI text-embedding-3-small &rarr; store in Pinecone &rarr; retrieve top-5 matches &rarr;
            inject into prompt.
          </p>
          <p>
            When deployed against messy real-world data (financial filings, technical manuals, brand crawl
            artifacts), this naive pipeline fails for three structural reasons:
          </p>
          <ul>
            <li><strong>Context Fragmentation:</strong> A 500-token chunk splits an important table or paragraph in half, leaving the embedding model with broken semantic meaning.</li>
            <li><strong>Vocabulary Mismatch:</strong> Cosine similarity finds semantic proximity, but fails completely on exact keyword matching (SKUs, error codes, legal clauses, exact names).</li>
            <li><strong>Prompt Bloat &amp; Needle-in-a-Haystack:</strong> Feeding 5 large chunks directly into the prompt injects irrelevant noise, diluting model attention and increasing token costs.</li>
          </ul>

          <div className={styles.callout}>
            <strong>Production Rule</strong>
            <p>
              Retrieval is not a single database query. It is a multi-stage funnel: broad retrieval,
              keyword fusion, cross-encoder re-ranking, and context compression.
            </p>
          </div>

          <h2>The 5-Stage Production RAG Funnel</h2>

          <pre className={styles.schematic}>
{`[User Query]
     ↓
[1. Query Expansion & Decomposition] (Extract entities + generate search variants)
     ↓
[2. Hybrid Retrieval Funnel]
     ├── Dense Vector Search (pgvector / Qdrant) ──→ Top 50 semantic candidates
     └── Sparse Keyword Search (BM25 / Elasticsearch) ──→ Top 50 keyword candidates
     ↓
[3. Reciprocal Rank Fusion (RRF)] ──→ Merged top-30 candidate pool
     ↓
[4. Cross-Encoder Re-Ranking] (Cohere / BGE) ──→ Top-5 high-relevance passages
     ↓
[5. Structured Prompt Injection] ──→ LLM Generation with strict citation tags`}
          </pre>

          <h2>The Production Architecture Checklist</h2>
          <p>
            When auditing or designing a production RAG platform, verify these mandatory checkpoints:
          </p>

          <h3>1. Ingestion &amp; Chunking Strategy</h3>
          <ul>
            <li><strong>Parent-Document Retrieval:</strong> Embed small, precise sentences for retrieval, but return the parent paragraph or section to the LLM to preserve complete semantic context.</li>
            <li><strong>Metadata Enrichment:</strong> Every chunk must carry metadata: <code>tenant_id</code>, <code>document_type</code>, <code>created_at</code>, and access permission tags.</li>
            <li><strong>Asynchronous Ingestion:</strong> Document parsing, chunking, and embedding generation must run in background worker queues (SQS/Celery), never on user-facing HTTP request threads.</li>
          </ul>

          <h3>2. Hybrid Dense + Sparse Search</h3>
          <ul>
            <li>Combine vector similarity with traditional BM25 search using Reciprocal Rank Fusion (RRF). Vector search understands conceptual questions; BM25 catches specific model numbers, product IDs, and proper nouns.</li>
          </ul>

          <h3>3. Cross-Encoder Re-Ranking</h3>
          <ul>
            <li>Vector cosine similarity is a bi-encoder approximation. Running the top 30 retrieved candidates through a cross-encoder model (e.g. Cohere Rerank) scores query-passage relevance with 3x higher precision, allowing you to pass only the 3–5 most relevant snippets to the prompt.</li>
          </ul>

          <h3>4. Latency Budget Enforcement (&lt;200ms)</h3>
          <ul>
            <li>Hybrid vector + BM25 query: <strong>&lt;40ms</strong></li>
            <li>Cross-encoder re-ranking: <strong>&lt;80ms</strong></li>
            <li>Total retrieval overhead: <strong>&lt;150ms</strong>, leaving the remainder of the latency budget for model generation streaming.</li>
          </ul>

          <div className={styles.articleCta}>
            <h3>Is your RAG system delivering noisy answers or slow latency?</h3>
            <p>
              I architect high-performance retrieval pipelines, hybrid search spines, and embedding ingestion
              systems with sub-200ms response targets.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.articleCtaBtn}>
              Discuss Your RAG Architecture
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
