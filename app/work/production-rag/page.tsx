import type { Metadata } from "next";
import styles from "./page.module.css";
import SubPageNav from "@/components/SubPageNav";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const url = "https://uzairkhatri.com/work/production-rag/";
const repo = "https://github.com/uzairkhatri/production-rag-reference";
const architecture = "https://raw.githubusercontent.com/uzairkhatri/production-rag-reference/main/docs/assets/architecture.svg";
const image = "https://uzairkhatri.com/linkedin-featured/case-studies.png";

export const metadata: Metadata = {
  title: "Production RAG Case Study — Measurable Retrieval Architecture",
  description: "A production-oriented RAG reference architecture with hybrid retrieval, reranking, grounded citations, Recall@5 and MRR evaluation, CI regression gates, observability, and provider boundaries.",
  alternates: { canonical: url },
  openGraph: { title: "Production RAG: From Prototype to Measurable Architecture", description: "Engineering proof for a RAG system designed to be measured, operated, and changed safely.", url, images: [{ url: image, width: 1200, height: 627 }] },
  twitter: { card: "summary_large_image", title: "Production RAG: From Prototype to Measurable Architecture", description: "Hybrid retrieval, reranking, grounded citations, evaluation gates, observability, and provider boundaries.", images: [image] },
};

const decisions = [
  ["Hybrid retrieval", "Combine lexical and semantic signals instead of betting retrieval quality on one technique. The boundary stays replaceable so retrieval can evolve without rewriting the API."],
  ["Explicit reranking", "Keep candidate retrieval separate from final ranking. This makes ranking behavior testable and creates a clean insertion point for stronger rerankers later."],
  ["Grounded generation", "Return answers with source citations and abstain when retrieved evidence is insufficient rather than treating fluent output as proof of correctness."],
  ["Provider boundaries", "Retriever, reranker, embedder, and generator are explicit ports. Local deterministic behavior remains the default; OpenAI generation is optional rather than embedded into the architecture."],
];

const controls = [
  ["Quality", "Recall@5 + MRR", "A labelled evaluation dataset measures whether relevant evidence is retrieved and how highly it ranks."],
  ["CI", "Regression gate", "The evaluation runner exits non-zero when configured quality thresholds fail, so retrieval regressions can block a pull request."],
  ["Operations", "Trace IDs + usage", "Requests expose trace identifiers and usage metadata, with token and cost accounting at the generation boundary."],
  ["Reliability", "Timeouts + retries", "External generation is wrapped in explicit timeout and bounded retry/backoff policy rather than hidden provider behavior."],
];

export default function ProductionRagCaseStudy() {
  return <div className={styles.page}>
    <BreadcrumbJsonLd items={[{name:"Home",url:"https://uzairkhatri.com/"},{name:"Case Studies",url:"https://uzairkhatri.com/case-studies/"},{name:"Production RAG",url}]} />
    <TechArticleJsonLd title="Production RAG: From Prototype to Measurable Production Architecture" description="A public engineering reference for production-oriented retrieval-augmented generation with measurable retrieval quality and operational controls." url={url} image={image} />
    <SubPageNav extraLinks={[{ label: "GitHub", href: repo, external: true }]} />

    <header className={styles.hero}><div className={`${styles.inner} ${styles.heroGrid}`}><div><p className={styles.eyebrow}>Engineering reference / Production RAG</p><h1 className={styles.title}>From RAG demo to measurable production architecture.</h1><p className={styles.lead}>A public reference implementation showing how I structure retrieval-augmented generation when correctness, regression detection, observability, cost, and provider change all matter—not just whether a demo returns a plausible answer.</p><div className={styles.chips}><span className={styles.chip}>FastAPI</span><span className={styles.chip}>Hybrid retrieval</span><span className={styles.chip}>Reranking</span><span className={styles.chip}>Recall@5 + MRR</span><span className={styles.chip}>CI quality gate</span></div></div><div className={styles.architecture}><img src={architecture} alt="Production RAG reference architecture" /></div></div></header>

    <section className={styles.section}><div className={styles.inner}><p className={styles.eyebrow}>The engineering problem</p><h2 className={styles.heading}>A useful answer is not enough evidence that a RAG system works.</h2><p className={styles.intro}>Prototype RAG stacks often collapse retrieval, ranking, generation, and provider code into one path. That makes failures difficult to diagnose and quality difficult to measure. This reference architecture separates those responsibilities and makes retrieval quality part of the delivery pipeline.</p><div className={styles.grid3}><article className={styles.card}><span className={styles.label}>Failure</span><h3>Retrieval silently degrades</h3><p>The model can still produce convincing prose even when the right evidence stops reaching the context window.</p></article><article className={styles.card}><span className={styles.label}>Failure</span><h3>Provider logic leaks everywhere</h3><p>Embedding or generation changes become expensive when application code depends directly on a specific SDK.</p></article><article className={styles.card}><span className={styles.label}>Failure</span><h3>No release-time quality signal</h3><p>Without labelled queries and thresholds, a code change can reduce retrieval quality while every unit test remains green.</p></article></div></div></section>

    <section className={styles.sectionAlt}><div className={styles.inner}><p className={styles.eyebrow}>Architecture decisions</p><h2 className={styles.heading}>Boundaries first. Models second.</h2><div className={styles.grid2}>{decisions.map(([title,text])=><article className={styles.card} key={title}><span className={styles.label}>Decision</span><h3>{title}</h3><p>{text}</p></article>)}</div><pre className={styles.flow}>POST /documents → deterministic chunking → retrieval index{"\n"}POST /query → hybrid retrieval → reranking → grounded generation / abstention → citations{"\n"}evaluation dataset → Recall@5 + MRR → thresholds → CI pass / fail</pre></div></section>

    <section className={styles.section}><div className={styles.inner}><p className={styles.eyebrow}>Production controls</p><h2 className={styles.heading}>The architecture exposes evidence, not just output.</h2><p className={styles.intro}>The public repository is intentionally small enough to understand, but it includes the controls I expect around a production RAG path.</p><div className={styles.metrics}>{controls.map(([label,title,text])=><article className={styles.metric} key={label}><span className={styles.label}>{label}</span><strong>{title}</strong><p>{text}</p></article>)}</div></div></section>

    <section className={styles.sectionAlt}><div className={styles.inner}><p className={styles.eyebrow}>Verification</p><h2 className={styles.heading}>Quality becomes a software delivery concern.</h2><p className={styles.intro}>The repository contains a labelled evaluation dataset and a CLI evaluation runner. Recall@5 checks whether relevant evidence appears in the top five results; MRR rewards ranking the first relevant result higher. Configured thresholds turn those measurements into a regression gate that can fail CI.</p><div className={styles.proof}><a className={styles.button} href={repo} target="_blank" rel="noreferrer">Inspect the repository</a><a className={styles.buttonGhost} href={`${repo}/blob/main/docs/demo.md`} target="_blank" rel="noreferrer">Run the demo</a><a className={styles.buttonGhost} href={`${repo}/actions/workflows/rag-evaluation.yml`} target="_blank" rel="noreferrer">View evaluation workflow</a></div></div></section>

    <section className={styles.section}><div className={`${styles.inner} ${styles.closing}`}><p className={styles.eyebrow}>Production AI architecture</p><h2 className={styles.heading}>Building RAG that has to survive production?</h2><p className={styles.intro}>I work on the layer between a promising AI prototype and an operable system: architecture boundaries, retrieval quality, evaluation, observability, reliability, security, and cost controls.</p><div className={styles.proof}><a className={styles.button} href={BOOKING_URL} target="_blank" rel="noreferrer">Book an architecture strategy call</a><a className={styles.buttonGhost} href={withBasePath("/case-studies/")}>Explore more work</a></div></div></section>
  </div>;
}
