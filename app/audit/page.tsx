"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { trackAuditSubmission } from "@/components/analytics";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import styles from "./page.module.css";

const auditAreas = [
  { icon: "layers", title: "Architecture & Design", items: ["System design & flow", "Scalability & modularity", "Technology choices", "Production readiness"] },
  { icon: "data", title: "Data & RAG Quality", items: ["Data sources & pipelines", "Chunking & retrieval strategy", "Context usage & citations", "Data privacy considerations"] },
  { icon: "agents", title: "Agents & Workflows", items: ["Agent design & tool use", "Prompting & guardrails", "Workflow reliability", "Human-in-the-loop design"] },
  { icon: "cost", title: "Costs & Optimization", items: ["Token usage & model costs", "Infrastructure efficiency", "Right model for the task", "Cost reduction opportunities"] },
  { icon: "bolt", title: "Performance & Reliability", items: ["Latency & throughput", "Error handling & retries", "Monitoring & alerting", "Caching & fallbacks"] },
  { icon: "shield", title: "Security & Compliance", items: ["Data handling & access", "Prompt injection risks", "Sensitive data protection", "Compliance best practices"] },
  { icon: "deploy", title: "Deployment & Scaling", items: ["Environment setup", "CI/CD & versioning", "Scaling strategy", "Disaster recovery"] },
  { icon: "report", title: "Actionable Roadmap", items: ["Prioritized findings", "Quick wins (0-30 days)", "Longer term improvements", "Clear next steps"] },
];

const stacks = ["Python", "JavaScript / TypeScript", "LangChain", "LlamaIndex", "OpenAI", "Anthropic", "AWS", "GCP", "Azure", "Docker / Kubernetes", "PostgreSQL", "Redis", "Other"];

const faq = [
  [
    "What is the difference between the Free Discovery Call and the $250 Pre-Mortem?",
    "The Free 30-Minute Architecture Discovery Call is a focused, 1:1 sanity check to understand your system, identify your primary technical risk, and agree on an appropriate next step (verbal call, no written deliverable). The $250 Production Architecture Pre-Mortem is a fixed-scope review of one agreed technical problem delivering 3–5 pages of prioritized findings (Risk Priority Matrix P0/P1/P2), recommended remediation approaches (no repository access required), and a 30-minute live walkthrough within 48 hours of scope acceptance, receipt of complete materials, and confirmed availability."
  ],
  [
    "What specific areas can be scoped for the $250 Pre-Mortem?",
    "Each $250 Pre-Mortem covers one agreed technical problem — for example, DB connection pool exhaustion under streaming, uncached prompt token inflation, hybrid RAG retrieval precision, LangGraph recursion guards, latency waterfalls, or LLM security boundaries. Multi-area or full-stack audits belong in Implementation & Advisory (Custom Quote)."
  ],
  [
    "Do I need to share proprietary source code?",
    "No. A high-level architecture diagram, schema outline, or sanitized description is usually enough to uncover silent architectural failure points. No repository access or private code sharing is required."
  ],
  [
    "What if we need you to implement the recommended fixes?",
    "For teams needing hands-on execution, I offer custom engineering implementation sprints and fractional architecture advisory (custom quote based on scope) to implement multi-agent state graphs, Redis Redlock concurrency, and production AWS/vector DB infrastructure."
  ],
  [
    "I am an engineering leader or recruiter looking to hire full-time. How should I reach out?",
    "You can download my CV directly from the header, review my production case studies, email me at hello@uzairkhatri.com, or schedule an introductory screening call via Calendly."
  ],
];

function AuditIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "layers") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m4 10 12-6 12 6-12 6-12-6Z"/><path d="m4 16 12 6 12-6M4 22l12 6 12-6"/></svg>;
  if (type === "data" || type === "cost") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><ellipse cx="16" cy="7" rx="10" ry="4"/><path d="M6 7v9c0 2.2 4.5 4 10 4s10-1.8 10-4V7M6 16v9c0 2.2 4.5 4 10 4s10-1.8 10-4v-9"/>{type === "cost" && <path d="M16 10v15M12.5 14h5a2 2 0 0 1 0 4h-3a2 2 0 0 0 0 4h5"/>}</svg>;
  if (type === "bolt") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M18 2 6 18h9l-1 12 12-17h-9l1-11Z"/></svg>;
  if (type === "shield") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 3 27 7v8c0 7-4.7 11.8-11 14-6.3-2.2-11-7-11-14V7l11-4Z"/><path d="M16 9v11"/></svg>;
  if (type === "report") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="5" y="3" width="20" height="24" rx="2"/><path d="M10 9h10M10 14h8M10 19h6M22 22l5 5"/><circle cx="21" cy="21" r="4"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m16 3 11 6-11 6L5 9l11-6Z"/><path d="m5 9v13l11 7 11-7V9M16 15v14"/><path d="m9 20 7-4 7 4"/></svg>;
}

type TopologyNodeKey = "users" | "gateway" | "agents" | "orchestration" | "database" | "llm" | "vectordb" | "tools";

const TOPOLOGY_NODES: Record<TopologyNodeKey, { title: string; subtitle: string; meta: string; finding: string; status: string; statusType: "badgeGreen" | "badgeWarn" | "badgeDanger" }> = {
  users: {
    title: "Client & Edge",
    subtitle: "FastAPI / Next.js Edge",
    meta: "Throughput: 48 req/s · Edge TTFB: 24ms",
    finding: "Client WebSocket connection directly multiplexed with zero response buffering. HTTP/2 and Edge CDN routing optimal.",
    status: "OPTIMAL",
    statusType: "badgeGreen",
  },
  gateway: {
    title: "API Gateway & Auth",
    subtitle: "JWT & Token Bucket",
    meta: "Rate Limit: 100 req/s · Ingress: 3.2 MB/s",
    finding: "Token bucket rate-limiting protects LLM endpoints from runaway loops. Auth verified before token billing.",
    status: "PROTECTED",
    statusType: "badgeGreen",
  },
  agents: {
    title: "Agent Supervisor",
    subtitle: "LangGraph State Machine",
    meta: "Active Threads: 18 · State Size: 4.2 KB",
    finding: "State isolation enforced via Redis Redlock mutex. Max recursion depth capped at 5 steps to stop infinite loops.",
    status: "GUARDED",
    statusType: "badgeGreen",
  },
  orchestration: {
    title: "AI Orchestration Hub",
    subtitle: "LlamaGuard · Guardrails · Semantic Cache",
    meta: "Cache Hit Rate: 68.4% · Inspection Latency: 16ms",
    finding: "Central triage layer checks input for prompt injection & PII before forwarding. Semantic cache prevents redundant model calls.",
    status: "ACTIONABLE",
    statusType: "badgeWarn",
  },
  database: {
    title: "PostgreSQL 16 & pgvector",
    subtitle: "Primary Data & Memory",
    meta: "Connection Pool: 32/50 · Query p95: 18ms",
    finding: "WARNING: Synchronous LLM streaming calls holding open DB connections. High risk of pool exhaustion under 50+ concurrent chats.",
    status: "HIGH RISK BOTTLENECK",
    statusType: "badgeDanger",
  },
  llm: {
    title: "LLM Provider Gateway",
    subtitle: "Claude 3.5 Sonnet / GPT-4o / Groq",
    meta: "TTFT: 380ms · Current Spend: $6,840/mo",
    finding: "CRITICAL: 28,000-token system prompt repeated on every turn with zero prompt caching. Recommend enabling Anthropic Prompt Caching (-$2.4k/mo).",
    status: "$4,650/MO LEAK",
    statusType: "badgeDanger",
  },
  vectordb: {
    title: "Hybrid Vector DB",
    subtitle: "Qdrant + BM25 Sparse Index",
    meta: "Recall@5: 91.4% · Search Latency: 58ms",
    finding: "Dense embeddings + BM25 keyword fusion with Reciprocal Rank Fusion (RRF). Reranking with Cohere Rerank v3 adds 65ms, boosts accuracy 22%.",
    status: "OPTIMAL",
    statusType: "badgeGreen",
  },
  tools: {
    title: "External Tools & APIs",
    subtitle: "Stripe, Slack, Webhooks",
    meta: "Sandboxed Subprocess · Timeout: 3.0s",
    finding: "Tool calls currently execute in serial. Recommend async parallel dispatch (asyncio.gather) to reduce tool turnaround from 4.2s to 920ms.",
    status: "OPTIMIZATION",
    statusType: "badgeWarn",
  },
};

function AuditDashboard() {
  const [active, setActive] = useState("System Overview");
  const [selectedNode, setSelectedNode] = useState<TopologyNodeKey>("llm");
  const [pFilter, setPFilter] = useState<"ALL" | "P0" | "P1" | "P2">("ALL");
  const [isScanning, setIsScanning] = useState(false);

  const nav = [
    "System Overview",
    "Architecture",
    "Costs & Efficiency",
    "RAG & Data",
    "Agents & Workflows",
    "Reliability & Scaling",
    "Security & Compliance",
    "Recommendations",
  ];

  const healthScores: Record<string, { overall: string; status: string; label: string; tone: "good" | "warn"; drill: { title: string; stats: [string, string][] } }> = {
    "System Overview": {
      overall: "84/100",
      status: "PRODUCTION READY",
      label: "Architecture",
      tone: "good",
      drill: {
        title: "Topology Telemetry",
        stats: [
          ["Active Subsystems", "8 / 8 Active"],
          ["E2E Latency (p95)", "1,420 ms"],
          ["Critical Bottlenecks", "1 Detected (DB Pool)"],
        ],
      },
    },
    Architecture: {
      overall: "78/100",
      status: "MODERATE RISK",
      label: "Architecture",
      tone: "warn",
      drill: {
        title: "Modularity Metrics",
        stats: [
          ["Coupling Level", "Tight on DB Stream"],
          ["Single Point of Failure", "1 Identified"],
          ["Concurrency Headroom", "3.8x Target"],
        ],
      },
    },
    "Costs & Efficiency": {
      overall: "62/100",
      status: "HIGH WASTE DETECTED",
      label: "Cost Efficiency",
      tone: "warn",
      drill: {
        title: "Token Burn Insights",
        stats: [
          ["Monthly Waste", "$4,650 / mo (68%)"],
          ["Uncached Prompt Tokens", "38% of Total"],
          ["Cache Hit Rate", "68.4% (Qdrant/Redis)"],
        ],
      },
    },
    "RAG & Data": {
      overall: "85/100",
      status: "STRONG RETRIEVAL",
      label: "RAG Quality",
      tone: "good",
      drill: {
        title: "Vector Quality",
        stats: [
          ["Recall@5", "91.4% (Optimal)"],
          ["Mean Reciprocal Rank", "0.84 MRR"],
          ["Hallucination Risk", "11.5% (Low)"],
        ],
      },
    },
    "Agents & Workflows": {
      overall: "82/100",
      status: "GUARDED WORKFLOW",
      label: "Architecture",
      tone: "good",
      drill: {
        title: "Agent Safety",
        stats: [
          ["Infinite Loop Breaker", "Max 5 Hops (Active)"],
          ["Tool Timeout Ceiling", "3,000 ms"],
          ["Human-in-the-Loop", "Gated on Mutations"],
        ],
      },
    },
    "Reliability & Scaling": {
      overall: "71/100",
      status: "LATENCY SPIKE RISK",
      label: "Latency",
      tone: "warn",
      drill: {
        title: "Latency Telemetry",
        stats: [
          ["Time to First Token", "380 ms"],
          ["p99 Total Turnaround", "4.2s (Spike on Tool)"],
          ["Circuit Breaker", "Trips on 3x 429 errors"],
        ],
      },
    },
    "Security & Compliance": {
      overall: "88/100",
      status: "OWASP VERIFIED",
      label: "Security",
      tone: "good",
      drill: {
        title: "Security Shield",
        stats: [
          ["Prompt Injection Defense", "PASSED (Dual-Prompt)"],
          ["PII Data Redaction", "Redacted (Presidio)"],
          ["Excessive Agency Check", "WARN (Scoped DB needed)"],
        ],
      },
    },
    Recommendations: {
      overall: "92/100",
      status: "ACTION ROADMAP READY",
      label: "Architecture",
      tone: "good",
      drill: {
        title: "Triage Summary",
        stats: [
          ["0-7 Day Quick Wins", "2 Critical (P0)"],
          ["Estimated Monthly ROI", "$4,650/mo Saved"],
          ["Expected Speedup", "65% Latency Drop"],
        ],
      },
    },
  };

  const currentHealth = healthScores[active] || healthScores["System Overview"];
  const node = TOPOLOGY_NODES[selectedNode];

  const runScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 650);
  };

  const recItems = [
    {
      id: 1,
      priority: "P0",
      title: "Enable Anthropic Prompt Caching & Redis Semantic Cache",
      timeline: "Day 1 – 7",
      impact: "Cuts LLM token bill from $6,840/mo to $2,190/mo (-68%). Drops TTFT from 1.8s to 380ms.",
      tag: "recPriorityP0",
    },
    {
      id: 2,
      priority: "P0",
      title: "Decouple LLM Streaming from PostgreSQL DB Connections",
      timeline: "Day 1 – 7",
      impact: "Eliminates connection pool starvation during long token streaming sessions under 50+ concurrent users.",
      tag: "recPriorityP0",
    },
    {
      id: 3,
      priority: "P1",
      title: "Upgrade to Hybrid RAG (Qdrant + BM25) + Cohere Rerank v3",
      timeline: "Day 8 – 14",
      impact: "Fixes tabular data context truncation; boosts Recall@5 from 74% to 91.4% with 65ms rerank latency.",
      tag: "recPriorityP1",
    },
    {
      id: 4,
      priority: "P1",
      title: "Convert Serial Agent Tool Invocations into Parallel Dispatch",
      timeline: "Day 8 – 14",
      impact: "Reduces multi-tool query turnaround from 4.2s to 920ms via asyncio.gather speculative execution.",
      tag: "recPriorityP1",
    },
    {
      id: 5,
      priority: "P2",
      title: "Enforce Least-Privilege Read-Only Scoping on Agent Database Tools",
      timeline: "Day 15 – 21",
      impact: "Fully mitigates OWASP LLM06 Excessive Agency vulnerability before deploying autonomous writes.",
      tag: "recPriorityP2",
    },
  ];

  const filteredRecs = pFilter === "ALL" ? recItems : recItems.filter((r) => r.priority === pFilter);

  return (
    <section className={styles.dashboard} aria-label="Interactive AI production audit preview">
      <div className={styles.dashboardBar}>
        <div className={styles.windowDots}>
          <i />
          <i />
          <i />
        </div>
        <div>
          <strong>ARCHITECTURAL BENCHMARK CONSOLE // SPECIFICATION PREVIEW</strong>
          <small>Interactive Architectural Telemetry &amp; Optimization Engine</small>
        </div>
        <div className={styles.ready}>
          <span /> {isScanning ? "BENCHMARK SCANNING…" : "Benchmark Model Active"}
          <small>Illustrative Topology</small>
        </div>
      </div>

      <div className={styles.simulatedBanner}>
        <span>ℹ ILLUSTRATIVE BENCHMARK</span>
        <p>This interactive console displays illustrative benchmarks of common production failure modes (DB pool exhaustion, un-cached prompt tokens, serial tool latency) to demonstrate our diagnostic methodology. It is not live telemetry from your infrastructure.</p>
      </div>

      <div className={styles.dashboardBody}>
        {/* Navigation Rail */}
        <nav className={styles.auditRail} aria-label="Audit dashboard sections">
          {nav.map((item) => (
            <button
              key={item}
              className={active === item ? styles.railActive : ""}
              onClick={() => setActive(item)}
              type="button"
            >
              <span>{active === item ? "◎" : "◇"}</span>
              {item}
            </button>
          ))}
        </nav>

        {/* Center Interactive Console Stage */}
        <div className={styles.consoleStage}>
          {/* TAB 1: SYSTEM OVERVIEW */}
          {active === "System Overview" && (
            <div className={styles.topoWrapper}>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>Topological Architecture Map</span>
                  <h3 className={styles.stageTitle}>Production AI System Pipeline</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>Benchmark Flow</span>
              </div>

              <div className={styles.topoCanvas}>
                {/* Top Row: Client & Gateways */}
                <div className={styles.topoRow}>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "users" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("users")}
                  >
                    <strong>Clients / Web</strong>
                    <small>Edge CDN (42ms)</small>
                  </button>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "gateway" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("gateway")}
                  >
                    <strong>API Gateway</strong>
                    <small>JWT &amp; Rate Limit</small>
                  </button>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "agents" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("agents")}
                  >
                    <strong>Agents Supervisor</strong>
                    <small>LangGraph Router</small>
                  </button>
                </div>

                {/* Pulse Connector */}
                <div className={styles.connectorRow} aria-hidden="true">
                  <span className={styles.dataPulseLine} />
                  <span>DATA FLOW &amp; GUARDRAIL BUS</span>
                  <span className={styles.dataPulseLine} />
                </div>

                {/* Center: Orchestration Hub */}
                <button
                  type="button"
                  className={`${styles.orchestrationHub} ${selectedNode === "orchestration" ? styles.topoNodeSelected : ""}`}
                  onClick={() => setSelectedNode("orchestration")}
                >
                  <strong>Orchestration &amp; Guardrails Layer</strong>
                  <small>LlamaGuard · PII Sanitizer · Redis Semantic Cache · Prompt Router</small>
                </button>

                {/* Pulse Connector */}
                <div className={styles.connectorRow} aria-hidden="true">
                  <span className={styles.dataPulseLine} />
                  <span>SUBSYSTEM DISPATCH</span>
                  <span className={styles.dataPulseLine} />
                </div>

                {/* Bottom Row: Core Subsystems */}
                <div className={styles.topoRow}>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "database" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("database")}
                  >
                    <strong>Postgres 16</strong>
                    <small>Pool 32/50 (Warn)</small>
                  </button>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "llm" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("llm")}
                  >
                    <strong>LLM Gateway</strong>
                    <small>Claude / GPT-4o</small>
                  </button>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "vectordb" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("vectordb")}
                  >
                    <strong>Qdrant Hybrid</strong>
                    <small>Recall: 91.4%</small>
                  </button>
                  <button
                    type="button"
                    className={`${styles.topoNodeBtn} ${selectedNode === "tools" ? styles.topoNodeSelected : ""}`}
                    onClick={() => setSelectedNode("tools")}
                  >
                    <strong>External Tools</strong>
                    <small>Sandboxed REST</small>
                  </button>
                </div>
              </div>

              {/* Node Diagnostic Inspector HUD */}
              <div className={styles.topoHud}>
                <div className={styles.topoHudTop}>
                  <span className={styles.topoHudTitle}>INSPECTOR: {node.title} ({node.subtitle})</span>
                  <span className={`${styles.stageBadge} ${styles[node.statusType]}`}>{node.status}</span>
                </div>
                <div className={styles.topoHudMeta}>
                  <span>{node.meta}</span>
                </div>
                <p className={styles.topoHudFinding}>
                  <b>Audit Finding:</b> {node.finding}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {active === "Architecture" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>Modularity &amp; Decoupling Inspection</span>
                  <h3 className={styles.stageTitle}>Service Boundaries &amp; Event Topology</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeWarn}`}>1 Architectural Smell</span>
              </div>

              <div className={styles.archCardGrid}>
                <div className={styles.archInspectBox}>
                  <h4>Event Pipeline &amp; Decoupling</h4>
                  <p>Client WebSockets handle client streaming without blocking application processes. Redis Streams manage async tasks.</p>
                  <div className={styles.archTagRow}>
                    <span className={`${styles.archTag} ${styles.tagGreen}`}>✓ Non-blocking Async</span>
                    <span className={`${styles.archTag} ${styles.tagGreen}`}>✓ Scoped Session Memory</span>
                  </div>
                </div>

                <div className={styles.archInspectBox}>
                  <h4>Multi-Provider Failover Matrix</h4>
                  <p>Automatic circuit breaker routes to Anthropic, OpenAI, or local DeepSeek within 40ms upon HTTP 429/503 errors.</p>
                  <div className={styles.archTagRow}>
                    <span className={`${styles.archTag} ${styles.tagGreen}`}>✓ Provider Redundant</span>
                    <span className={`${styles.archTag} ${styles.tagGreen}`}>✓ Sub-45ms Handoff</span>
                  </div>
                </div>
              </div>

              <div className={styles.calloutWarning}>
                <strong>⚠️ Bottleneck Identified:</strong>
                <div>
                  <strong>Thread &amp; Pool Starvation Risk:</strong> LLM streaming requests (averaging 4.2s per generation) are holding open active PostgreSQL connection transactions. Under 50+ concurrent users, the database pool will exhaust.
                  <br />
                  <b>Remedy:</b> Decouple response persistence into an async background queue (BullMQ/Redis) after stream completion.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COSTS & EFFICIENCY */}
          {active === "Costs & Efficiency" && (
            <div className={styles.costVisualizer}>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>Token Burn &amp; Model Right-Sizing</span>
                  <h3 className={styles.stageTitle}>Monthly Inference Cost Optimization</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeWarn}`}>$4,650/mo Recoverable</span>
              </div>

              <div className={styles.costComparisonCard}>
                <div className={styles.costHeaderRow}>
                  <span>ILLUSTRATIVE BENCHMARK SPEND COMPARISON</span>
                  <span className={styles.savingsHighlight}>POTENTIAL SAVINGS: -$4,650 / MO (-68%)</span>
                </div>
                <div className={styles.costBarGroup}>
                  <div className={styles.costBarRow}>
                    <span>Current Spend</span>
                    <div className={styles.costBarTrack}>
                      <div className={styles.costBarFillRed} />
                    </div>
                    <strong>$6,840/mo</strong>
                  </div>
                  <div className={styles.costBarRow}>
                    <span>Optimized Stack</span>
                    <div className={styles.costBarTrack}>
                      <div className={styles.costBarFillGreen} />
                    </div>
                    <strong style={{ color: "var(--audit-green)" }}>$2,190/mo</strong>
                  </div>
                </div>
              </div>

              <div className={styles.costWasteGrid}>
                <div className={styles.wasteBox}>
                  <strong>$2,450/mo Waste</strong>
                  <p>Uncached 28k token system prompts re-sent on every user message. Ephemeral prompt caching cuts this by 90%.</p>
                </div>
                <div className={styles.wasteBox}>
                  <strong>$1,620/mo Waste</strong>
                  <p>Over-provisioned frontier models used for simple intent routing. Route classification to Llama 3.1 8B on Groq.</p>
                </div>
                <div className={styles.wasteBox}>
                  <strong>$580/mo Waste</strong>
                  <p>Zero semantic caching on frequent questions. Redis semantic cache absorbs 32% of incoming queries for free.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RAG & DATA */}
          {active === "RAG & Data" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>Retrieval &amp; Vector Quality</span>
                  <h3 className={styles.stageTitle}>Hybrid Search &amp; Groundedness Evaluation</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>Recall@5: 91.4%</span>
              </div>

              <div className={styles.ragGauges}>
                <div className={styles.gaugeCard}>
                  <div className={styles.gaugeVal}>91.4%</div>
                  <div className={styles.gaugeLabel}>Recall @ 5</div>
                </div>
                <div className={styles.gaugeCard}>
                  <div className={styles.gaugeVal}>0.84</div>
                  <div className={styles.gaugeLabel}>MRR Score</div>
                </div>
                <div className={styles.gaugeCard}>
                  <div className={styles.gaugeVal}>88.2%</div>
                  <div className={styles.gaugeLabel}>Context Precision</div>
                </div>
                <div className={styles.gaugeCard}>
                  <div className={styles.gaugeVal} style={{ color: "var(--audit-gold-bright)" }}>11.5%</div>
                  <div className={styles.gaugeLabel}>Hallucination Risk</div>
                </div>
              </div>

              <div className={styles.ragInspector}>
                <h4>Chunking &amp; Ingestion Strategy Analysis</h4>
                <p>
                  <b>Current Finding:</b> Fixed 1024-token sliding window chunking was splitting markdown comparison tables and specifications in half, dropping relevant context during dense search.
                  <br />
                  <b>Remedy Implemented in Audit:</b> Document structure-aware hierarchical chunking + BM25 keyword fusion with Reciprocal Rank Fusion (RRF). Added Cohere Rerank v3 for Top-5 precision (+22% accuracy).
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: AGENTS & WORKFLOWS */}
          {active === "Agents & Workflows" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>LangGraph State Machine Guardrails</span>
                  <h3 className={styles.stageTitle}>Multi-Agent Orchestration &amp; Recursion Protection</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>Guardrails Armed</span>
              </div>

              <div className={styles.workflowPipeline}>
                <div className={styles.pipeStep}>
                  <span>NODE 01</span>
                  <strong>User Intent</strong>
                </div>
                <span className={styles.pipeArrow}>→</span>
                <div className={styles.pipeStep}>
                  <span>NODE 02</span>
                  <strong>RAG Retriever</strong>
                </div>
                <span className={styles.pipeArrow}>→</span>
                <div className={styles.pipeStep}>
                  <span>NODE 03</span>
                  <strong>Tool Dispatcher</strong>
                </div>
                <span className={styles.pipeArrow}>→</span>
                <div className={styles.pipeStep}>
                  <span>NODE 04</span>
                  <strong>Output Critic</strong>
                </div>
                <span className={styles.pipeArrow}>→</span>
                <div className={styles.pipeStep}>
                  <span>NODE 05</span>
                  <strong>Final Stream</strong>
                </div>
              </div>

              <div className={styles.guardrailsList}>
                <div className={styles.guardRow}>
                  <span>Infinite Recursion Loop Guard (Max 5 hops cap)</span>
                  <b>✓ ACTIVE</b>
                </div>
                <div className={styles.guardRow}>
                  <span>Tool Execution Sandboxed Timeout (3,000ms hard stop)</span>
                  <b>✓ ENFORCED</b>
                </div>
                <div className={styles.guardRow}>
                  <span>Human-in-the-Loop Gate on Destructive State Mutations</span>
                  <b>✓ GATED</b>
                </div>
                <div className={styles.guardRow}>
                  <span>Agent Output Schema Verification (Pydantic / Zod)</span>
                  <b>✓ DETERMINISTIC</b>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RELIABILITY & SCALING */}
          {active === "Reliability & Scaling" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>End-to-End Latency Waterfall</span>
                  <h3 className={styles.stageTitle}>Turnaround Time &amp; Circuit Breakers</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeWarn}`}>p95: 1.85s</span>
              </div>

              <div className={styles.waterfallGroup}>
                <div className={styles.waterfallRow}>
                  <span>DNS &amp; Edge Network</span>
                  <div className={styles.costBarTrack}><div className={styles.waterfallBar} style={{ width: "6%" }} /></div>
                  <strong>24ms</strong>
                </div>
                <div className={styles.waterfallRow}>
                  <span>PII &amp; Security Filter</span>
                  <div className={styles.costBarTrack}><div className={styles.waterfallBar} style={{ width: "4%" }} /></div>
                  <strong>16ms</strong>
                </div>
                <div className={styles.waterfallRow}>
                  <span>Hybrid Vector Retrieval</span>
                  <div className={styles.costBarTrack}><div className={styles.waterfallBar} style={{ width: "12%" }} /></div>
                  <strong>58ms</strong>
                </div>
                <div className={styles.waterfallRow}>
                  <span>Time-to-First-Token (TTFT)</span>
                  <div className={styles.costBarTrack}><div className={styles.waterfallBar} style={{ width: "32%", background: "var(--audit-green)" }} /></div>
                  <strong style={{ color: "var(--audit-green)" }}>380ms</strong>
                </div>
                <div className={styles.waterfallRow}>
                  <span>Token Stream Completion</span>
                  <div className={styles.costBarTrack}><div className={styles.waterfallBar} style={{ width: "70%" }} /></div>
                  <strong>940ms</strong>
                </div>
              </div>

              <div className={styles.calloutWarning} style={{ borderColor: "var(--audit-gold)" }}>
                <strong>⚡ Latency Finding:</strong>
                <div>Serial tool execution spikes p99 latency to 4.2s on complex queries. Speculative parallel tool execution drops p99 to under 1.2s.</div>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & COMPLIANCE */}
          {active === "Security & Compliance" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>OWASP Top 10 for LLMs</span>
                  <h3 className={styles.stageTitle}>Guardrails &amp; Vulnerability Matrix</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>Score: 88/100</span>
              </div>

              <div className={styles.securityList}>
                <div className={styles.securityItem}>
                  <div className={styles.securityItemLeft}>
                    <strong>LLM01: Prompt Injection Defense</strong>
                    <small>Delimiter encapsulation &amp; dual-model intent sanity classifier</small>
                  </div>
                  <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>PASSED</span>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityItemLeft}>
                    <strong>LLM02: Sensitive Data Exposure (PII)</strong>
                    <small>Presidio regex scrubber redacts emails, SSNs &amp; tokens prior to LLM</small>
                  </div>
                  <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>PASSED</span>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityItemLeft}>
                    <strong>LLM06: Excessive Agency &amp; Scoping</strong>
                    <small>Agent tool had broad database write access; needs read-only replica restriction</small>
                  </div>
                  <span className={`${styles.stageBadge} ${styles.badgeWarn}`}>WARN</span>
                </div>
                <div className={styles.securityItem}>
                  <div className={styles.securityItemLeft}>
                    <strong>LLM08: Vector DB Poisoning &amp; Isolation</strong>
                    <small>Isolated per-tenant namespaces with cryptographic JWT validation</small>
                  </div>
                  <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>PASSED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: RECOMMENDATIONS */}
          {active === "Recommendations" && (
            <div>
              <div className={styles.stageHeader}>
                <div className={styles.stageHeaderLeft}>
                  <span className={styles.stageTag}>Actionable 30-Day Triage Roadmap</span>
                  <h3 className={styles.stageTitle}>Prioritized Remediation Matrix</h3>
                </div>
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>5 Action Items</span>
              </div>

              <div className={styles.recsControls}>
                {(["ALL", "P0", "P1", "P2"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`${styles.filterPill} ${pFilter === filter ? styles.filterPillActive : ""}`}
                    onClick={() => setPFilter(filter)}
                  >
                    {filter === "ALL" ? "All Priorities" : `${filter} Items`}
                  </button>
                ))}
              </div>

              <div className={styles.recsList}>
                {filteredRecs.map((rec) => (
                  <div className={styles.recCard} key={rec.id}>
                    <div className={styles.recCardTop}>
                      <span className={styles[rec.tag as keyof typeof styles]}>{rec.priority} PRIORITY // {rec.timeline}</span>
                    </div>
                    <h4 className={styles.recTitle}>{rec.title}</h4>
                    <p className={styles.recImpact}><b>Expected Impact:</b> {rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Telemetry Health Scorecard */}
        <aside className={styles.healthPanel}>
          <div>
            <div className={styles.healthHeader}>
              <h3>System Health</h3>
              <span className={styles.liveBadge}><i className={styles.liveDot} /> BENCHMARK</span>
            </div>

            <div className={styles.scoreCircleBox}>
              <div className={styles.scoreCircle}>{currentHealth.overall}</div>
              <div className={styles.scoreCircleText}>
                <strong>{currentHealth.status}</strong>
                <small>{active}</small>
              </div>
            </div>

            <div className={styles.healthRows}>
              {[
                ["Architecture", "78/100", "warn"],
                ["Cost Efficiency", "62/100", "warn"],
                ["RAG Quality", "85/100", "good"],
                ["Latency", "71/100", "warn"],
                ["Security", "88/100", "good"],
              ].map(([label, score, tone]) => (
                <div
                  className={`${styles.healthRow} ${currentHealth.label === label ? styles.healthRowActive : ""}`}
                  key={label}
                >
                  <span>
                    <i className={tone === "good" ? styles.good : styles.warn} />
                    {label}
                  </span>
                  <strong className={tone === "good" ? styles.goodText : styles.warnText}>{score}</strong>
                </div>
              ))}
            </div>

            <div className={styles.telemetryDrilldown}>
              <span className={styles.drillTitle}>{currentHealth.drill.title}</span>
              {currentHealth.drill.stats.map(([key, val]) => (
                <div className={styles.drillStat} key={key}>
                  <span>{key}</span>
                  <b>{val}</b>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.healthActions}>
            <button type="button" className={styles.scanButton} onClick={runScan}>
              {isScanning ? "Scanning Architecture…" : "⚡ Re-run Benchmark Scan"}
            </button>
            <a href="#pricing-tiers" className={styles.primaryButton} style={{ minHeight: "38px", fontSize: ".76rem", width: "100%" }}>
              Explore Review Options →
            </a>
            <small className={styles.healthFootnote}>Illustrative benchmark model based on production failure mode patterns.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function AuditPage() {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    stage: "",
    engagementType: "Production Architecture Pre-Mortem ($250 Flat)",
    description: "",
    _gotcha: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [deliveryRef, setDeliveryRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const sending = useRef(false);

  const toggleStack = (stack: string) =>
    setSelectedStacks((current) =>
      current.includes(stack) ? current.filter((item) => item !== stack) : [...current, stack]
    );

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submitAudit(event: React.FormEvent) {
    event.preventDefault();
    if (sending.current) return;
    const trimmedEmail = form.email.trim();
    if (!form.name.trim() || !form.description.trim()) {
      setErrorMessage("Please enter your name and system or problem details.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid work or contact email address.");
      setStatus("error");
      return;
    }

    if (form._gotcha) {
      setDeliveryRef("");
      setStatus("success");
      return;
    }

    sending.current = true;
    setStatus("submitting");
    setErrorMessage("");
    setDeliveryRef("");

    const message = `[ARCHITECTURE ENGAGEMENT INQUIRY]\nType: ${form.engagementType}\nCompany: ${form.company || "N/A"}\nStage: ${form.stage || "N/A"}\nStack: ${selectedStacks.join(", ") || "N/A"}\n\n${form.description.trim().slice(0, 3500)}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(withBasePath("/api/audit"), {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim().slice(0, 100),
          email: trimmedEmail.slice(0, 100),
          company: form.company.trim().slice(0, 100),
          stage: form.stage,
          stack: selectedStacks.join(", "),
          bottleneck: form.engagementType,
          message,
          _gotcha: form._gotcha
        })
      });

      const result = await response.json();
      const confirmedRef =
        typeof result?.referenceId === "string" ? result.referenceId.trim() : "";
      if (!response.ok || result?.success !== true || result?.dispatched !== true || !confirmedRef) {
        const apiError =
          response.status >= 400 &&
          response.status < 500 &&
          typeof result?.error === "string" &&
          result.error.trim()
            ? result.error.trim()
            : "Mail transport dispatch was not confirmed";
        throw Object.assign(new Error(apiError), { status: response.status });
      }

      setDeliveryRef(confirmedRef);
      trackAuditSubmission(selectedStacks.join(", "), form.engagementType);
      setStatus("success");
      setSelectedStacks([]);
      setForm({
        name: "",
        email: "",
        company: "",
        stage: "",
        engagementType: "Production Architecture Pre-Mortem ($250 Flat)",
        description: "",
        _gotcha: "",
      });
    } catch (err: unknown) {
      const errObj = err as { name?: string; status?: number; message?: string } | null;
      if (errObj?.name === "AbortError") {
        setErrorMessage("The dispatch request timed out before confirmation. Please retry or email hello@uzairkhatri.com.");
      } else if (errObj?.status && errObj.status >= 400 && errObj.status < 500 && errObj.message) {
        setErrorMessage(errObj.message);
      } else {
        setErrorMessage("The request could not be confirmed for mail dispatch. Please retry or email hello@uzairkhatri.com.");
      }
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
    }
  }

  return (
    <div className={styles.page}>
      <SubPageNav backLabel="Uzair Khatri" />
      <main>
        {/* Recruiter Fast-Track Header Callout */}
        <div className={styles.recruiterBanner}>
          <div className={styles.recruiterBadge}>HIRING LEADERS &amp; RECRUITERS</div>
          <div className={styles.recruiterContent}>
            <h3>Looking for a Principal AI Systems Architect or Staff Backend Engineer?</h3>
            <p>14+ years of software engineering and distributed systems, hands-on production AI architecture across Python, Java, AWS, Redis Redlock, and LangGraph multi-agent runtimes. Available for senior full-time roles, contracts, and fractional leadership.</p>
            <div className={styles.recruiterActions}>
              <a href={CV_URL} target="_blank" rel="noreferrer" data-source="audit_recruiter_banner" className={styles.recruiterButton}>Download CV (Uzair Iqbal - PDF) &rarr;</a>
              <a href={withBasePath("/#work")} data-source="audit_recruiter_banner" data-recruiter-cta="audit_banner_case_studies" className={styles.recruiterSecondary}>View Enterprise Case Studies</a>
              <a href="mailto:hello@uzairkhatri.com" data-source="audit_recruiter_banner" data-recruiter-cta="audit_banner_email" className={styles.recruiterSecondary}>hello@uzairkhatri.com</a>
            </div>
          </div>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.handNote} ${styles.noteLeft}`}>Turn your<br/>AI idea into<br/>real impact.<span>↪</span></div>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrowPill}>Architecture Discovery &amp; Pre-Mortem</div>
            <h1>Build Smarter.<br/><em>Ship with Confidence.</em></h1>
            <p>Start with a free 30-minute discovery call to discuss your system and next steps—or choose a fixed-scope $250 pre-mortem covering one agreed technical problem with 3–5 pages of findings and recommended approaches.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={BOOKING_URL} target="_blank" rel="noreferrer">Book Free 30-Min Discovery Call <span>→</span></a>
              <a className={styles.secondaryButton} href="#pricing-tiers">View Review Tiers ($0 – $250)</a>
            </div>
            <div className={styles.heroProof}><span><b>♢</b>Confidential Review</span><span><b>ϟ</b>Fixed-Scope Pre-Mortem</span><span><b>▥</b>Actionable Recommendations</span></div>
          </div>
          <div className={styles.laptopVisual} aria-hidden="true"><Image src={withBasePath("/img/audit-laptop-v2.png")} alt="" width={1536} height={1152} priority /></div>
          <AuditDashboard />
        </section>

        {/* 3-Tier Offer Structure */}
        <section className={styles.tierSection} id="pricing-tiers">
          <div className={styles.sectionHeading}>
            <span>Architecture Engagement Structures</span>
            <h2>Choose the right level of architectural review.</h2>
            <p>Begin with a free 30-minute discovery call, request a fixed-scope $250 pre-mortem on one agreed technical problem, or scope custom implementation.</p>
          </div>

          <div className={styles.tierGrid}>
            {/* Tier 1: Free */}
            <article className={styles.tierCard}>
              <div className={styles.tierTag}>Free Discovery</div>
              <div className={styles.tierPrice}>
                $0 <span className={styles.tierPriceSub}>/ 30-min call</span>
              </div>
              <h3 className={styles.tierTitle}>30-Minute Architecture Discovery Call</h3>
              <p className={styles.tierDescription}>
                The easiest first step: a focused conversation to understand your system architecture, identify critical bottlenecks or failure risks, and agree on an appropriate next step.
              </p>
              <ul className={styles.tierDeliverables}>
                <li>30-minute live video call with Uzair</li>
                <li>Verbal triage of your primary technical risk</li>
                <li>Immediate sanity check on architecture choices</li>
                <li>Clear next-step recommendation (no written deliverable)</li>
              </ul>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={`${styles.secondaryButton} ${styles.tierCta}`}>
                Book a 30-Minute Discovery Call &rarr;
              </a>
            </article>

            {/* Tier 2: Paid Fixed-Scope ($250) */}
            <article className={`${styles.tierCard} ${styles.tierFeatured}`}>
              <span className={styles.tierBadge}>Fixed-Scope Single-Problem Review</span>
              <div className={styles.tierTag}>Paid Architecture Review</div>
              <div className={styles.tierPrice}>
                $250 <span className={styles.tierPriceSub}>flat fee · 48-hr turnaround</span>
              </div>
              <h3 className={styles.tierTitle}>Production Architecture Pre-Mortem</h3>
              <p className={styles.tierDescription}>
                Fixed-scope review of one agreed technical problem (such as concurrency, RAG accuracy, or token cost leaks) before scaling.
              </p>
              <ul className={styles.tierDeliverables}>
                <li>One agreed technical problem (fixed scope agreed pre-payment)</li>
                <li>3–5 pages of prioritized findings (Risk Priority Matrix P0/P1/P2)</li>
                <li>Recommended remediation approaches (no repository access required)</li>
                <li>30-minute live walkthrough &amp; team Q&amp;A</li>
                <li>Delivered within 48 hours after scope acceptance, receipt of complete materials &amp; confirmed availability</li>
              </ul>
              <a href="#request-audit" className={`${styles.primaryButton} ${styles.tierCta}`}>
                Request Architecture Pre-Mortem &rarr;
              </a>
            </article>

            {/* Tier 3: Higher-Value */}
            <article className={styles.tierCard}>
              <div className={styles.tierTag}>Hands-On Execution</div>
              <div className={styles.tierPrice}>
                Custom Quote <span className={styles.tierPriceSub}>/ sprint or retainer</span>
              </div>
              <h3 className={styles.tierTitle}>Implementation &amp; Advisory</h3>
              <p className={styles.tierDescription}>
                Direct, hands-on engineering execution and technical advisory tailored to your architecture roadmap and delivery timeline.
              </p>
              <ul className={styles.tierDeliverables}>
                <li>Engineering implementation &amp; direct PR contributions</li>
                <li>Architecture improvements &amp; multi-agent workflows (LangGraph)</li>
                <li>AI and backend integrations (APIs, queues, vector DBs)</li>
                <li>Ongoing technical advisory, code reviews &amp; hiring guidance</li>
              </ul>
              <a href="#request-audit" className={`${styles.secondaryButton} ${styles.tierCta}`}>
                Inquire for Implementation &rarr;
              </a>
            </article>
          </div>
        </section>

        <section className={styles.checkSection}>
          <div className={styles.sectionHeading}>
            <span>Selectable Focus Domains</span>
            <h2>Problem areas you can scope for review.</h2>
            <p>Each $250 Production Architecture Pre-Mortem targets <strong>one agreed technical problem</strong> chosen from these domains. Multi-area reviews or full-stack engagements belong under Implementation &amp; Advisory (Custom Quote).</p>
          </div>
          <div className={styles.auditGrid}>
            {auditAreas.map((area) => (
              <article className={styles.auditCard} key={area.title}>
                <AuditIcon type={area.icon}/>
                <h3>{area.title}</h3>
                <ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.reportSection} id="sample-report">
          <div className={styles.reportCopy}>
            <div className={styles.eyebrowPill}>$250 Pre-Mortem Deliverable</div>
            <h2>A clear findings report,<br/>not just a checklist.</h2>
            <p>In the $250 Production Architecture Pre-Mortem, you receive 3–5 pages of prioritized findings (P0/P1/P2 Risk Matrix) for one agreed technical problem, system boundary notes, recommended remediation approaches (no repository access required), and a 30-minute walkthrough delivered within 48 hours after scope acceptance, receipt of complete materials, and confirmed availability.</p>
            <a href="#request-audit" className={styles.primaryButton}>Request Pre-Mortem ($250) <span>→</span></a>
          </div>
          <div className={styles.reportStack} aria-label="Sample AI Production Audit report">
            <Image className={styles.reportAsset} src={withBasePath("/img/audit-report-v2.png")} alt="Three-page sample AI Production Audit report" width={1536} height={1024}/>
          </div>
          <div className={`${styles.handNote} ${styles.reportNote}`}>Real insights.<br/>Real impact.<span>↪</span></div>
        </section>

        <section className={styles.engineerSection}>
          <div className={styles.sectionLabel}>Reviewed by an engineer who ships</div>
          <div className={styles.engineerPanel}>
            <Image src={withBasePath("/img/profile/hero-portrait.png")} alt="Uzair Khatri" width={118} height={118}/>
            <div className={styles.engineerCopy}>
              <h2>Uzair Khatri (Uzair Iqbal) <span>·</span> AI Production Architect</h2>
              <p>I design and build production AI systems for real-world enterprise use cases. With 14+ years of experience in distributed systems, high-concurrency backends, and cloud-native architecture, I focus on deterministic, scalable architectures built to handle real customer load.</p>
            </div>
            <ul className={styles.engineerPoints}>
              <li>Production-focused mindset</li>
              <li>Hands-on technical experience</li>
              <li>Practical, no-nonsense advice</li>
              <li>Confidential review (NDA available)</li>
            </ul>
          </div>
        </section>

        <section className={styles.formSection} id="request-audit">
          {status === "success" ? (
            <div className={styles.success} role="status">
              <span>✓</span>
              <h2>Your request has been queued for delivery.</h2>
              <p>
                {deliveryRef
                  ? `Reference: ${deliveryRef}. Your inquiry comes directly to me. I'll respond as soon as possible.`
                  : "Your inquiry comes directly to me. I'll respond as soon as possible."}
              </p>
              <button
                type="button"
                className={styles.secondaryButton}
                style={{ marginTop: "16px" }}
                onClick={() => {
                  setDeliveryRef("");
                  setErrorMessage("");
                  setStatus("idle");
                }}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <div className={styles.sectionHeading}>
                <div className={styles.formLabel}>Get Started</div>
                <h2>Request Your Architecture Review</h2>
                <p>Select your preferred engagement level. All submissions are kept strictly confidential.</p>
              </div>
              <form onSubmit={submitAudit} aria-busy={status === "submitting"}>
                <input className={styles.honeypot} name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form._gotcha} onChange={(e) => update("_gotcha", e.target.value)}/>
                <div className={styles.formGrid}>
                  <label>Your Name <b>*</b>
                    <input required name="name" autoComplete="name" maxLength={100} disabled={status === "submitting"} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Alex Vance"/>
                  </label>
                  <label>Work Email <b>*</b>
                    <input required type="email" name="email" autoComplete="email" maxLength={100} disabled={status === "submitting"} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="alex@company.com"/>
                  </label>
                  <label>Company / Product URL
                    <input name="company" autoComplete="organization" maxLength={100} disabled={status === "submitting"} value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="company.com or app name"/>
                  </label>
                  <label>Current Stage
                    <select name="stage" disabled={status === "submitting"} value={form.stage} onChange={(e) => update("stage", e.target.value)}>
                      <option value="">Select stage</option>
                      <option>Idea / Planning</option>
                      <option>Prototype / MVP</option>
                      <option>Staging / Pre-launch</option>
                      <option>Production with users</option>
                    </select>
                  </label>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--audit-gold-bright)", display: "block", marginBottom: "8px" }}>
                    Engagement Type <b>*</b>
                    <select
                      name="engagementType"
                      disabled={status === "submitting"}
                      value={form.engagementType}
                      onChange={(e) => update("engagementType", e.target.value)}
                      style={{ width: "100%", height: "46px", background: "#0a1012", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#ffffff", padding: "0 14px", marginTop: "4px" }}
                    >
                      <option value="Production Architecture Pre-Mortem ($250 Flat)">Production Architecture Pre-Mortem ($250 Flat — 48-hr turnaround after scope acceptance)</option>
                      <option value="30-Minute Architecture Discovery Call ($0)">30-Minute Architecture Discovery Call ($0 — Verbal Triage)</option>
                      <option value="Senior Engineering Role / Recruiter Inquiry">Senior Engineering Role / Recruiter Inquiry (Full-time / Contract)</option>
                      <option value="Implementation & Advisory (Custom Quote)">Implementation &amp; Advisory (Custom Quote)</option>
                    </select>
                  </label>
                </div>

                <fieldset style={{ marginTop: "16px" }}>
                  <legend>Current Stack &amp; Frameworks <span>(select all that apply)</span></legend>
                  <div className={styles.stackOptions}>
                    {stacks.map((stack) => (
                      <button type="button" key={stack} aria-pressed={selectedStacks.includes(stack)} onClick={() => toggleStack(stack)}>
                        {selectedStacks.includes(stack) ? "✓" : "~"} {stack}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className={styles.fullLabel}>
                  Tell me about your system &amp; what you’re looking to review or build <b>*</b>
                  <textarea required name="description" maxLength={3500} disabled={status === "submitting"} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="e.g. We’re deploying an agentic LangGraph workflow and experiencing latency spikes on tool calls, plus need a pre-launch sanity check..."/>
                </label>

                {status === "error" && <p className={styles.formError} role="alert">{errorMessage || "The request could not be sent. Please email hello@uzairkhatri.com."}</p>}
                
                <button className={styles.submitButton} disabled={status === "submitting"}>
                  {status === "submitting" ? "Submitting…" : "Submit Review Request →"}
                </button>
                
                <div className={styles.formProof}>
                  <span>♙&nbsp; Strictly Confidential</span>
                  <span>ϟ&nbsp; Clear Scope</span>
                  <span>▣&nbsp; Actionable Recommendations</span>
                </div>
              </form>
            </>
          )}
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeading}>
            <span>Common Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
