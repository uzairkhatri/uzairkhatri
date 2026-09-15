import type { Metadata } from "next";
import styles from "../insights.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const ogImage = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "Evaluating Multi-Agent Systems in Production — Uzair Khatri",
  description:
    "How to test, benchmark, and evaluate autonomous AI agents without blowing your API budget: deterministic schema checks, trajectory scoring, and CI/CD regression suites by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/insights/ai-agent-evaluation/",
  },
  openGraph: {
    title: "Evaluating Multi-Agent Systems in Production — Uzair Khatri",
    description: "Testing and benchmarking autonomous AI agents without blowing your API budget: deterministic assertions and CI/CD regression suites.",
    url: "https://uzairkhatri.com/insights/ai-agent-evaluation/",
    images: [{ url: ogImage, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evaluating Multi-Agent Systems in Production — Uzair Khatri",
    description: "Testing and benchmarking autonomous AI agents without blowing your API budget: deterministic assertions and CI/CD regression suites.",
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

export default function AiAgentEvaluationArticle() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Insights", url: "https://uzairkhatri.com/insights/" },
          { name: "AI Agent Evaluation", url: "https://uzairkhatri.com/insights/ai-agent-evaluation/" },
        ]}
      />
      <TechArticleJsonLd
        title="Evaluating Multi-Agent Systems in Production Without Burning Your API Budget"
        description="How to test, benchmark, and evaluate autonomous AI agents without blowing your API budget: deterministic schema checks, trajectory scoring, and CI/CD regression suites by Uzair Khatri."
        url="https://uzairkhatri.com/insights/ai-agent-evaluation/"
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
            <span>Systems Evaluation</span>
            <span>·</span>
            <span>10 min read</span>
            <span>·</span>
            <span>Sept 2026</span>
          </div>
          <h1 className={styles.articleTitle}>
            Evaluating Multi-Agent Systems in Production Without Burning Your API Budget
          </h1>
          <p className={styles.articleLead}>
            Traditional unit testing relies on deterministic assertions: <code>assert output == expected</code>.
            AI agents produce non-deterministic, probabilistic responses where string equality fails.
            Here is how to architect automated evaluation pipelines that catch behavioral regressions without
            bankrupting your team with LLM-as-a-judge tokens.
          </p>
          <div className={styles.articleAuthor}>
            <span>By <strong>Uzair Khatri</strong> · Principal AI Systems Architect</span>
          </div>
        </div>
      </header>

      <article className={styles.articleContent}>
        <div className={styles.articleInner}>
          <h2>The Evaluation Dilemma</h2>
          <p>
            When engineering teams build autonomous multi-agent pipelines (like LangGraph agent swarms),
            they quickly run into the evaluation trap:
          </p>
          <ul>
            <li><strong>The &ldquo;Vibe Check&rdquo; Anti-Pattern:</strong> Engineers manually inspect 5 sample outputs, decide it &ldquo;feels right,&rdquo; and deploy. Silent regressions occur on edge cases.</li>
            <li><strong>The &ldquo;LLM-as-a-Judge&rdquo; Money Pit:</strong> Calling GPT-4 to judge every intermediate step across a 200-test regression suite costs $40–$100 per PR build, discouraging developers from running tests.</li>
          </ul>

          <div className={styles.callout}>
            <strong>Core Principle</strong>
            <p>
              Separate trajectory validation from generation evaluation. Validate 90% of your agent&apos;s
              execution graph using deterministic code before spending a single token on model judges.
            </p>
          </div>

          <h2>The 4-Layer Evaluation Pyramid</h2>

          <pre className={styles.schematic}>
{`            /\\
           /  \\     Layer 4: LLM-as-a-Judge (5% of tests, semantic tone & quality)
          /────\\
         /      \\    Layer 3: Trajectory & Tool Assertions (20%, correct tools invoked)
        /────────\\
       /          \\   Layer 2: Pydantic Schema Contracts (35%, strictly valid JSON)
      /────────────\\
     /              \\  Layer 1: Deterministic Invariants (40%, latency, token budget, zero $)`}
          </pre>

          <h3>Layer 1: Deterministic Invariants ($0 Cost)</h3>
          <p>
            Before evaluating what the model wrote, evaluate how the system executed:
          </p>
          <ul>
            <li><strong>Cycle / Step Budget:</strong> Did the LangGraph agent resolve within the designated step limit (e.g. &lt;10 iterations)?</li>
            <li><strong>Token Consumption Cap:</strong> Did the agent stay within the max token threshold (e.g. &lt;4,000 tokens per session)?</li>
            <li><strong>Latency SLA:</strong> Did the total execution pipeline complete within user tolerance (&lt;4.5 seconds)?</li>
          </ul>

          <h3>Layer 2: Output Schema &amp; Assertion Contracts ($0 Cost)</h3>
          <p>
            Deterministic schema testing with Pydantic:
          </p>
          <ul>
            <li>Validating that all required schema attributes exist.</li>
            <li>Asserting that numerical metrics (e.g. prices, dates, confidence scores) fall within valid ranges.</li>
            <li>Checking that no prohibited substrings or prompt leakage markers appear in the output.</li>
          </ul>

          <h3>Layer 3: Agent Trajectory &amp; Tool Scoring</h3>
          <p>
            In multi-agent systems, the journey matters as much as the destination. You must verify whether
            the agent chose the optimal execution path:
          </p>
          <ul>
            <li><strong>Tool Selection Accuracy:</strong> Did the agent call the <code>SearchVectorStore</code> tool for retrieval queries, or did it call the <code>DatabaseQuery</code> tool unnecessarily?</li>
            <li><strong>Tool Argument Validity:</strong> Were the generated parameters passed to the tool syntactically and logically correct?</li>
            <li><strong>State Transition Assertions:</strong> Did the supervisor agent correctly route from discovery to evaluation without looping back?</li>
          </ul>

          <h3>Layer 4: Targeted Semantic Evaluation (Low Token Cost)</h3>
          <p>
            Only run LLM-as-a-judge on the final synthesized response, and use fast, cost-efficient models:
          </p>
          <ul>
            <li>Use smaller models (Claude 3.5 Haiku or GPT-4o-mini) paired with strict rubric scoring (0 to 1 scales with categorical criteria).</li>
            <li><strong>Faithfulness Evaluation:</strong> Asserting that claims in the output are strictly supported by the retrieved context snippets, penalizing ungrounded hallucinations.</li>
          </ul>

          <h2>Automated CI/CD Regression Gates</h2>
          <p>
            In production deployments, we wire this 4-layer pyramid directly into GitHub Actions:
          </p>
          <ol>
            <li>On pull request, a synthetic dataset of 30 known failure cases executes against the staging agent graph.</li>
            <li>Layers 1, 2, and 3 run deterministically in sub-30 seconds.</li>
            <li>Layer 4 executes on a 10% representative sample, costing &lt;$0.40 per build.</li>
            <li>If trajectory accuracy or schema compliance drops below 98%, the pull request is blocked automatically.</li>
          </ol>

          <div className={styles.articleCta}>
            <h3>Ready to build automated testing for your AI systems?</h3>
            <p>
              I help engineering leaders design deterministic evaluation suites, synthetic test harnesses,
              and CI/CD gates that protect your production AI applications from silent regressions.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.articleCtaBtn}>
              Schedule an Architecture Session
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
