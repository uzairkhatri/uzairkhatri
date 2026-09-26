"use client";

import { useState } from "react";
import styles from "./AuditVisuals.module.css";
import ProjectVisual, { type ProjectVisualType } from "@/components/ProjectVisual";

export function AuditHeroConsole() {
  const [activeTab, setActiveTab] = useState<"state" | "cost" | "latency" | "failover">("state");

  return (
    <div className={styles.consoleWrapper} aria-label="Interactive AI System Telemetry">
      <div className={styles.topBar}>
        <div className={styles.trafficLights}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.consoleTitle}>
          AI ARCHITECTURE DIAGNOSTIC CONSOLE // PRODUCTION STRESS-TEST
        </div>
        <div className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          <span>DIAGNOSTIC ACTIVE</span>
        </div>
      </div>

      <div className={styles.tabBar}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "state" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("state")}
        >
          01 // Concurrency &amp; State
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "cost" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("cost")}
        >
          02 // Token Cost Curve
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "latency" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("latency")}
        >
          03 // P99 Latency Waterfall
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === "failover" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("failover")}
        >
          04 // Failover &amp; Breaker
        </button>
      </div>

      <div className={styles.consoleBody}>
        {activeTab === "state" && (
          <div className={styles.archGrid}>
            <div className={styles.diagramBox}>
              <svg viewBox="0 0 460 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid */}
                <pattern id="grid-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
                </pattern>
                <rect width="460" height="220" fill="url(#grid-dots)" />

                {/* Nodes */}
                {/* Client Gateway */}
                <rect x="20" y="85" width="90" height="50" rx="8" fill="#14181a" stroke="rgba(216,173,100,0.4)" strokeWidth="1.5" />
                <text x="65" y="108" fill="#d8ad64" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">FASTAPI</text>
                <text x="65" y="122" fill="#8e9594" fontSize="9" textAnchor="middle">50 Users/sec</text>

                {/* Arrow 1 */}
                <path d="M110 110 H150" stroke="#d8ad64" strokeWidth="2" strokeDasharray="3 3" />

                {/* Supervisor Node */}
                <rect x="150" y="65" width="120" height="90" rx="8" fill="#181d20" stroke="#d8ad64" strokeWidth="2" />
                <text x="210" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">STATE MACHINE</text>
                <text x="210" y="105" fill="#2ecc71" fontSize="9" fontFamily="monospace" textAnchor="middle">✓ Session Isolated</text>
                <text x="210" y="120" fill="#8e9594" fontSize="8" textAnchor="middle">Redlock Mutex</text>
                <text x="210" y="138" fill="#f1c40f" fontSize="8" fontFamily="monospace" textAnchor="middle">Timeout: 8000ms</text>

                {/* Arrow 2 & 3 */}
                <path d="M270 95 H320" stroke="#2ecc71" strokeWidth="1.5" />
                <path d="M270 125 H320" stroke="#2ecc71" strokeWidth="1.5" />

                {/* Worker Agents */}
                <rect x="320" y="70" width="120" height="40" rx="6" fill="#14181a" stroke="rgba(255,255,255,0.15)" />
                <text x="380" y="88" fill="#ffffff" fontSize="10" textAnchor="middle">Agent A: Ingestion</text>
                <text x="380" y="100" fill="#2ecc71" fontSize="8" fontFamily="monospace" textAnchor="middle">Context Isolated</text>

                <rect x="320" y="120" width="120" height="40" rx="6" fill="#14181a" stroke="rgba(255,255,255,0.15)" />
                <text x="380" y="138" fill="#ffffff" fontSize="10" textAnchor="middle">Agent B: RAG Search</text>
                <text x="380" y="150" fill="#2ecc71" fontSize="8" fontFamily="monospace" textAnchor="middle">Context Isolated</text>
              </svg>
            </div>
            <div className={styles.telemetryPanel}>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Deadlock Detection</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>✓ ZERO DEADLOCKS</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Memory Isolation</span>
                <span className={`${styles.telemetryValue} ${styles.valRemediated}`}>Scoped Sessions (Redis)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Recursive Loop Guard</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>Max 5 Iterations Hardcap</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>State Race Vulnerability</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>0% (Eliminated)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cost" && (
          <div className={styles.archGrid}>
            <div className={styles.diagramBox}>
              <svg viewBox="0 0 460 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cost Comparison Bars */}
                <text x="20" y="35" fill="#e74c3c" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  UNOPTIMIZED PROMPT INGESTION: $4,850/mo
                </text>
                <rect x="20" y="48" width="400" height="24" rx="4" fill="rgba(231,76,60,0.2)" stroke="#e74c3c" />
                <rect x="20" y="48" width="370" height="24" rx="4" fill="#e74c3c" opacity="0.8" />
                <text x="30" y="64" fill="#ffffff" fontSize="10" fontWeight="bold">32,400 Prompt Tokens Sent per Turn (Zero Cache)</text>

                <text x="20" y="115" fill="#2ecc71" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  AFTER DISTILLATION &amp; SEMANTIC CACHE: $540/mo (-89%)
                </text>
                <rect x="20" y="128" width="400" height="24" rx="4" fill="rgba(46,204,113,0.15)" stroke="#2ecc71" />
                <rect x="20" y="128" width="55" height="24" rx="4" fill="#2ecc71" opacity="0.9" />
                <text x="90" y="144" fill="#d8ad64" fontSize="10" fontWeight="bold">
                  1,850 Tokens + 68% Cache Hits ($0.008/turn)
                </text>

                {/* Savings Pill */}
                <rect x="20" y="175" width="220" height="28" rx="14" fill="rgba(216,173,100,0.15)" stroke="#d8ad64" />
                <text x="130" y="193" fill="#d8ad64" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ESTIMATED SAVINGS: $4,310/mo
                </text>
              </svg>
            </div>
            <div className={styles.telemetryPanel}>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>System Prompt Size</span>
                <span className={`${styles.telemetryValue} ${styles.valRemediated}`}>Reduced 32k &rarr; 2.4k</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Semantic Cache Hit Rate</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>68.4% (Qdrant/Redis)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Model Tier Routing</span>
                <span className={`${styles.telemetryValue} ${styles.valRemediated}`}>Haiku (80%) / Sonnet (20%)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Runaway Spend Risk</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>Hard Budget Circuit Breaker</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "latency" && (
          <div className={styles.archGrid}>
            <div className={styles.diagramBox}>
              <svg viewBox="0 0 460 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Waterfall bars */}
                <text x="20" y="30" fill="#e74c3c" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  BEFORE: Synchronous Blocking (14.2s P99)
                </text>
                <rect x="20" y="42" width="120" height="16" rx="3" fill="#e74c3c" opacity="0.6" />
                <rect x="145" y="42" width="180" height="16" rx="3" fill="#e74c3c" opacity="0.8" />
                <rect x="330" y="42" width="90" height="16" rx="3" fill="#e74c3c" />
                <text x="25" y="54" fill="#fff" fontSize="8">Auth/DB</text>
                <text x="150" y="54" fill="#fff" fontSize="8">Blocking LLM Call (7.8s)</text>
                <text x="335" y="54" fill="#fff" fontSize="8">Serial Tool (4.2s)</text>

                <text x="20" y="115" fill="#2ecc71" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  AFTER: Speculative Streaming &amp; Parallel Dispatch (920ms P99)
                </text>
                <rect x="20" y="128" width="60" height="18" rx="3" fill="#2ecc71" />
                <text x="25" y="140" fill="#000" fontSize="8" fontWeight="bold">Chunk #1</text>
                <rect x="85" y="128" width="140" height="18" rx="3" fill="#d8ad64" />
                <text x="90" y="140" fill="#000" fontSize="8" fontWeight="bold">Parallel Speculative Tool Dispatch</text>

                <text x="20" y="195" fill="#d8ad64" fontSize="10" fontFamily="monospace">
                  &bull; Time to First Token (TTFT): 380ms &bull; User perceived wait: Instant
                </text>
              </svg>
            </div>
            <div className={styles.telemetryPanel}>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Time to First Token (TTFT)</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>380ms (Down from 4.8s)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Tool Dispatch Concurrency</span>
                <span className={`${styles.telemetryValue} ${styles.valRemediated}`}>Async Parallel (Gather)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Reranking Latency</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>85ms (FlashRank / Cohere)</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Total P99 Latency</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>920ms &bull; Production Ready</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "failover" && (
          <div className={styles.archGrid}>
            <div className={styles.diagramBox}>
              <svg viewBox="0 0 460 220" className={styles.diagramSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circuit Breaker Visual */}
                <rect x="20" y="85" width="100" height="50" rx="8" fill="#14181a" stroke="#d8ad64" />
                <text x="70" y="108" fill="#d8ad64" fontSize="10" fontWeight="bold" textAnchor="middle">USER INQUIRY</text>
                <text x="70" y="122" fill="#8e9594" fontSize="8" textAnchor="middle">API Request</text>

                <path d="M120 110 H170" stroke="#d8ad64" strokeWidth="2" />

                {/* Primary Provider - Tripping */}
                <rect x="170" y="45" width="130" height="50" rx="8" fill="#1e1313" stroke="#e74c3c" strokeWidth="1.5" />
                <text x="235" y="68" fill="#e74c3c" fontSize="10" fontWeight="bold" textAnchor="middle">PRIMARY (OpenAI)</text>
                <text x="235" y="82" fill="#ff7675" fontSize="8" textAnchor="middle">⚠️ HTTP 429 Rate Limit</text>

                {/* Circuit Breaker reroute */}
                <path d="M235 95 V125" stroke="#f1c40f" strokeWidth="2" strokeDasharray="3 3" />

                {/* Fallback Provider - Operating */}
                <rect x="170" y="130" width="130" height="50" rx="8" fill="#111c15" stroke="#2ecc71" strokeWidth="1.5" />
                <text x="235" y="153" fill="#2ecc71" fontSize="10" fontWeight="bold" textAnchor="middle">FAILOVER (Claude 3.5)</text>
                <text x="235" y="167" fill="#2ecc71" fontSize="8" textAnchor="middle">✓ Auto-Switched in 40ms</text>

                <path d="M300 155 H350" stroke="#2ecc71" strokeWidth="2" />

                <rect x="350" y="130" width="90" height="50" rx="8" fill="#14181a" stroke="#2ecc71" />
                <text x="395" y="158" fill="#2ecc71" fontSize="10" fontWeight="bold" textAnchor="middle">RESPONSE</text>
                <text x="395" y="170" fill="#fff" fontSize="8" textAnchor="middle">Zero Downtime</text>
              </svg>
            </div>
            <div className={styles.telemetryPanel}>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Circuit Breaker Policy</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>Trips on 3x Consecutive 429/503</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Fallback Switch Latency</span>
                <span className={`${styles.telemetryValue} ${styles.valRemediated}`}>&lt;45ms Seamless Handoff</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Schema Drift Validation</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>Pydantic v2 / Zod Deterministic</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>Customer Impact</span>
                <span className={`${styles.telemetryValue} ${styles.valHealthy}`}>100% Request Continuity</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DeliverablePreview() {
  return (
    <div className={styles.deliverableCard}>
      <div className={styles.deliverableHeader}>
        <div>
          <h3 className={styles.deliverableTitle}>What Your Teardown Actually Looks Like</h3>
          <p className={styles.deliverableSub}>
            No 30-page automated PDF junk. A private, engineer-to-engineer video teardown with exact code &amp; architectural redlines.
          </p>
        </div>
      </div>

      <div className={styles.videoMockup}>
        <div className={styles.videoHeader}>
          <div className={styles.videoTitleRow}>
            <span className={styles.loomBadge}>LOOM // ASYNC TEARDOWN</span>
            <span className={styles.videoFileName}>triage-walkthrough-architecture-audit.mp4</span>
          </div>
          <span className={styles.videoDuration}>05:14</span>
        </div>

        <div className={styles.timelineTracks}>
          <div className={styles.timelineItem}>
            <span className={styles.timelineStamp}>00:42</span>
            <span className={styles.timelineDesc}>
              State Isolation Vulnerability: Shared context dictionary causing cross-user contamination under load.
            </span>
            <span className={`${styles.timelineTag} ${styles.tagDanger}`}>HIGH RISK</span>
          </div>

          <div className={styles.timelineItem}>
            <span className={styles.timelineStamp}>02:15</span>
            <span className={styles.timelineDesc}>
              Token Cost Leak: Redundant 28,000-token system prompt repeated on each agent turn without caching.
            </span>
            <span className={`${styles.timelineTag} ${styles.tagWarning}`}>$3.8K/MO LEAK</span>
          </div>

          <div className={styles.timelineItem}>
            <span className={styles.timelineStamp}>03:50</span>
            <span className={styles.timelineDesc}>
              Async Parallel Remediation: Converting sequential tool calls into speculative parallel dispatch (P99 12s &rarr; 850ms).
            </span>
            <span className={`${styles.timelineTag} ${styles.tagSuccess}`}>OPTIMIZATION</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArchitectGuaranteeCard() {
  return (
    <div className={styles.architectCard}>
      <img
        src="/img/profile/hero-portrait.webp"
        alt="Uzair Khatri - AI Production Architect"
        className={styles.architectAvatar}
      />
      <div className={styles.architectInfo}>
        <span className={styles.architectRole}>Direct Engineer Review</span>
        <h4 className={styles.architectName}>Uzair Khatri &bull; AI Production Architect</h4>
        <p className={styles.architectBio}>
          Every architecture triage is personally audited and recorded by me. Shipped production systems for EFU Life, Savyour, and Wellows. Zero junior sales reps or outsourced contractors.
        </p>
      </div>
    </div>
  );
}

export function ArchitectureProofShowcase() {
  const [selectedProof, setSelectedProof] = useState<ProjectVisualType>("wellows");

  const proofDetails: Record<string, { client: string; desc: string; stack: string[] }> = {
    wellows: {
      client: "Wellows — Multi-Agent AI Search Visibility",
      desc: "LangGraph StateGraph router orchestrating 3 specialized agents with isolated error queues and LlamaGuard prompt safety.",
      stack: ["LangGraph", "FastAPI", "Qdrant", "Claude 3.5 Sonnet", "GPT-4o"],
    },
    efu: {
      client: "EFU Life — Enterprise Case & Document Routing",
      desc: "IBM FileNet P8, Datacap Capture, and Active Directory / LDAP integration replacing physical manual queues with paperless delivery.",
      stack: ["IBM FileNet P8", "IBM Case Manager", "IBM Capture", "LDAP / AD"],
    },
    savyour: {
      client: "Savyour — High-Throughput Fintech SaaS Ledger",
      desc: "Idempotent webhook ingestion, Redis hierarchical caching, and double-entry financial ledger serving 100+ national retail partners.",
      stack: ["FastAPI", "Redis Cluster", "PostgreSQL", "HMAC Ingestion"],
    },
  };

  const current = proofDetails[selectedProof] || proofDetails.wellows;

  return (
    <div className={styles.proofShowcase}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Proven Production Blueprints</p>
        <h3 className={styles.sectionTitle}>Inspecting real systems shipped to production.</h3>
        <p className={styles.sectionSub}>
          Explore the actual interactive architectural schematics of production systems designed by Uzair Khatri.
        </p>
      </div>

      <div className={styles.proofTabBar}>
        <button
          type="button"
          className={`${styles.proofTabBtn} ${selectedProof === "wellows" ? styles.proofTabBtnActive : ""}`}
          onClick={() => setSelectedProof("wellows")}
        >
          Wellows // Multi-Agent AI
        </button>
        <button
          type="button"
          className={`${styles.proofTabBtn} ${selectedProof === "efu" ? styles.proofTabBtnActive : ""}`}
          onClick={() => setSelectedProof("efu")}
        >
          EFU Life // Enterprise Workflows
        </button>
        <button
          type="button"
          className={`${styles.proofTabBtn} ${selectedProof === "savyour" ? styles.proofTabBtnActive : ""}`}
          onClick={() => setSelectedProof("savyour")}
        >
          Savyour // High-Throughput Fintech
        </button>
      </div>

      <div className={styles.proofContentBox}>
        <div className={styles.proofMetaBar}>
          <div>
            <h4 className={styles.proofClientTitle}>{current.client}</h4>
            <p className={styles.proofClientDesc}>{current.desc}</p>
          </div>
          <div className={styles.proofStackChips}>
            {current.stack.map((item) => (
              <span key={item} className={styles.proofStackChip}>{item}</span>
            ))}
          </div>
        </div>

        <div className={styles.proofVisualCanvas}>
          <ProjectVisual type={selectedProof} variant="hero" />
        </div>
      </div>
    </div>
  );
}
