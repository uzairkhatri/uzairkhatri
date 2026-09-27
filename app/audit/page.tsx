"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SubPageNav from "@/components/SubPageNav";
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
  ["Is the audit really free?", "Yes. There is no cost and no obligation. This is a technical review, not a sales call."],
  ["What will you review?", "Architecture, costs, latency, reliability, RAG, agent workflows, security and scaling."],
  ["Do I need to share source code?", "No. A high-level architecture diagram or description is usually enough."],
  ["What happens after I submit?", "I’ll review your submission and get back to you, usually within 48 hours, to schedule your 15-minute walkthrough."],
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
          ["PII Data Redaction", "100% Masked (Presidio)"],
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
          <strong>AI PRODUCTION AUDIT // LIVE DIAGNOSTIC CONSOLE</strong>
          <small>Interactive Architectural Telemetry &amp; Optimization Engine</small>
        </div>
        <div className={styles.ready}>
          <span /> {isScanning ? "DIAGNOSTIC SCANNING…" : "Audit Engine Active"}
          <small>Verified Architecture Model</small>
        </div>
      </div>

      <div className={styles.dashboardBody}>
        {/* Navigation Rail */}
        <nav className={styles.auditRail} aria-label="Audit dashboard sections">
          {nav.map((item, index) => (
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
                <span className={`${styles.stageBadge} ${styles.badgeGreen}`}>Live Flow Active</span>
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
                    <span className={`${styles.archTag} ${styles.tagGreen}`}>✓ Zero Memory Leaks</span>
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
                  <span>MONTHLY TOKEN EXPENDITURE COMPARISON</span>
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
              <span className={styles.liveBadge}><i className={styles.liveDot} /> LIVE TELEMETRY</span>
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
              {isScanning ? "Scanning Architecture…" : "⚡ Re-run Diagnostic Scan"}
            </button>
            <a href="#request-audit" className={styles.primaryButton} style={{ minHeight: "38px", fontSize: ".76rem", width: "100%" }}>
              Get Your Free Audit →
            </a>
            <small className={styles.healthFootnote}>Interactive demo based on production benchmarks.</small>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function AuditPage() {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", stage: "", description: "", _gotcha: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sending = useRef(false);
  const toggleStack = (stack: string) => setSelectedStacks((current) => current.includes(stack) ? current.filter((item) => item !== stack) : [...current, stack]);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submitAudit(event: React.FormEvent) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("submitting");
    const message = `[FREE AI PRODUCTION AUDIT]\nCompany: ${form.company || "N/A"}\nStage: ${form.stage || "N/A"}\nStack: ${selectedStacks.join(", ") || "N/A"}\n\n${form.description}`;
    try {
      const response = await fetch(withBasePath("/api/audit"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, company: form.company, stage: form.stage, stack: selectedStacks.join(", "), message, _gotcha: form._gotcha }) });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error();
      trackAuditSubmission(selectedStacks.join(", "), "Free AI production audit");
      setStatus("success");
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  }

  return <div className={styles.page}>
    <SubPageNav backLabel="Uzair Khatri" />
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.handNote} ${styles.noteLeft}`}>Turn your<br/>AI idea into<br/>real impact.<span>↪</span></div>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrowPill}>Free AI Production Audit</div>
          <h1>Build Smarter.<br/><em>Ship with Confidence.</em></h1>
          <p>Get a free, expert review of your AI architecture, infrastructure and workflows. Find risks, reduce costs, and improve reliability — before they impact your users or your budget.</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#request-audit">Request Your Free Audit <span>→</span></a><a className={styles.secondaryButton} href="#sample-report">See a Sample Report</a></div>
          <div className={styles.heroProof}><span><b>♢</b>100% Confidential</span><span><b>ϟ</b>No Sales Pitch</span><span><b>▥</b>Actionable Recommendations</span></div>
        </div>
        <div className={styles.laptopVisual} aria-hidden="true"><Image src={withBasePath("/img/audit-laptop-v2.png")} alt="" width={1536} height={1152} priority /></div>
        <AuditDashboard />
      </section>

      <section className={styles.checkSection}>
        <div className={styles.sectionHeading}><span>What We Check</span><h2>A complete review of your AI stack.</h2><p>We analyze your systems end-to-end and highlight what’s working, what’s at risk,<br/>and where you can improve.</p></div>
        <div className={styles.auditGrid}>{auditAreas.map((area) => <article className={styles.auditCard} key={area.title}><AuditIcon type={area.icon}/><h3>{area.title}</h3><ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className={styles.reportSection} id="sample-report">
        <div className={styles.reportCopy}><div className={styles.eyebrowPill}>Sample Output</div><h2>A clear report,<br/>not just a checklist.</h2><p>You’ll receive a 10+ page audit report with visual diagrams, a summary of key issues, risk ratings, and practical recommendations you can act on.</p><a href="#request-audit" className={styles.primaryButton}>View a Sample Report <span>→</span></a></div>
        <div className={styles.reportStack} aria-label="Sample AI Production Audit report"><Image className={styles.reportAsset} src={withBasePath("/img/audit-report-v2.png")} alt="Three-page sample AI Production Audit report" width={1536} height={1024}/></div>
        <div className={`${styles.handNote} ${styles.reportNote}`}>Real insights.<br/>Real impact.<span>↪</span></div>
      </section>

      <section className={styles.engineerSection}>
        <div className={styles.sectionLabel}>Reviewed by an engineer who ships</div>
        <div className={styles.engineerPanel}><Image src={withBasePath("/img/profile/hero-portrait.png")} alt="Uzair Khatri" width={118} height={118}/><div className={styles.engineerCopy}><h2>Uzair Khatri <span>·</span> AI Production Architect</h2><p>I design and build production AI systems for real-world use cases. With 14+ years of experience in distributed systems and cloud-native architecture, I focus on practical, scalable and cost-effective architectures that actually work in production.</p></div><ul className={styles.engineerPoints}><li>Production-focused mindset</li><li>Hands-on technical experience</li><li>Practical, non-nonsense advice</li><li>100% confidential review</li></ul></div>
      </section>

      <section className={styles.formSection} id="request-audit">
        {status === "success" ? <div className={styles.success}><span>✓</span><h2>Your audit request is in.</h2><p>I’ll review your details and get back to you within 48 hours.</p></div> : <>
          <div className={styles.sectionHeading}>
            <div className={styles.formLabel}>Get Started</div>
            <h2>Request Your Free AI Audit</h2>
            <p>Share a few details about your project. All submissions are kept strictly confidential.</p>
          </div>
          <form onSubmit={submitAudit}>
            <input className={styles.honeypot} tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={(e) => update("_gotcha", e.target.value)}/>
            <div className={styles.formGrid}><label>Your Name <b>*</b><input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Alex Vance"/></label><label>Work Email <b>*</b><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="alex@company.com"/></label><label>Company / Product URL<input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="company.com or app name"/></label><label>Current Stage<select value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">Select stage</option><option>Idea / Planning</option><option>Prototype / MVP</option><option>Staging / Pre-launch</option><option>Production with users</option></select></label></div>
            <fieldset><legend>Current Stack & Frameworks <span>(select all that apply)</span></legend><div className={styles.stackOptions}>{stacks.map((stack) => <button type="button" key={stack} aria-pressed={selectedStacks.includes(stack)} onClick={() => toggleStack(stack)}>{selectedStacks.includes(stack) ? "✓" : "~"} {stack}</button>)}</div></fieldset>
            <label className={styles.fullLabel}>Tell me about your system & what you’re looking to improve <b>*</b><textarea required value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="e.g. We’re building an AI agent for customer support and want to reduce costs and improve reliability..."/></label>
            {status === "error" && <p className={styles.formError}>The request could not be sent. Please email hello@uzairkhatri.com.</p>}
            <button className={styles.submitButton} disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request Free Audit →"}</button>
            <div className={styles.formProof}><span>♙&nbsp; 100% Confidential</span><span>ϟ&nbsp; No Obligation</span><span>▣&nbsp; Practical Recommendations</span></div>
          </form>
        </>}
      </section>

      <section className={styles.faqSection}><div className={styles.sectionHeading}><span>Common Questions</span><h2>Frequently Asked Questions</h2></div><div className={styles.faqGrid}>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className={styles.footer}><div><strong>‹&nbsp; Uzair Khatri</strong><small>AI Systems · Architecture · Real-World Impact</small></div><nav><a href={withBasePath("/#work")}>Work</a><a href={withBasePath("/services/ai-systems/")}>Services</a><a href={withBasePath("/case-studies/")}>Case Studies</a><a href={withBasePath("/insights/")}>Insights</a><a className={styles.activeLink} href={withBasePath("/audit/")}>AI Triage</a><a href={CV_URL}>CV</a><a className={styles.footerCta} href={BOOKING_URL}>Book a call</a></nav><p>Build better. Ship smarter.</p><p>© 2026 Uzair Khatri. All rights reserved.</p></footer>
  </div>;
}
