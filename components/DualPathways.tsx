import React from "react";
import { CV_URL, withBasePath } from "./siteLinks";
import styles from "./DualPathways.module.css";

interface SystemCredential {
  tag: string;
  name: string;
  subtitle: string;
  problem: string;
  decision: string;
  primaryMetric: string;
  primaryLabel: string;
  secondaryMetrics: string;
  stack: string;
  href: string;
}

const SELECTED_SYSTEMS: SystemCredential[] = [
  {
    tag: "MULTI-AGENT AI & RETRIEVAL",
    name: "Wellows",
    subtitle: "LLM Search Visibility & Citation Engine",
    problem:
      "Single-query prototype scripts degraded under concurrent load, with unguarded token spend and ungrounded model outputs.",
    decision:
      "Engineered LangGraph supervisor state machines with strict Pydantic contracts, isolated SQS queues, and Qdrant retrieval fallback.",
    primaryMetric: "3 Production Agents",
    primaryLabel: "LangGraph State Machine",
    secondaryMetrics: "<200ms vector lookup · 11-week delivery",
    stack: "LangGraph · Qdrant · FastAPI · Python",
    href: "/work/wellows/",
  },
  {
    tag: "FINTECH & DISTRIBUTED SYSTEMS",
    name: "Savyour",
    subtitle: "High-Throughput Webhook Ledger & Settlement",
    problem:
      "Surging nationwide retail promotions triggered webhook race conditions and duplicate cashback payout exploits across partner networks.",
    decision:
      "Architected Redis Redlock distributed locking, HMAC webhook verification, and double-entry immutable ledgers in PostgreSQL.",
    primaryMetric: "100+ Retail Partners",
    primaryLabel: "Zero Duplicate Payouts",
    secondaryMetrics: "18ms wallet write · ACID committed",
    stack: "FastAPI · Redis Redlock · PostgreSQL · AWS",
    href: "/work/savyour/",
  },
  {
    tag: "SAAS CONCURRENCY & WORKFLOWS",
    name: "Classflow & EFU Life",
    subtitle: "Stateful Concurrency & Paperless Routing",
    problem:
      "Concurrent checkout surges caused booking collisions, while manual insurance queues created multi-day document bottlenecks.",
    decision:
      "Implemented optimistic concurrency control with tenant state isolation, transactional queue workers, and role-based audit logging.",
    primaryMetric: "Zero Double-Bookings",
    primaryLabel: "Optimistic State Mutex",
    secondaryMetrics: "Day-scale automated queue · Paperless pipeline",
    stack: "Next.js · PostgreSQL · SQS · Event-Driven",
    href: "/work/classflow/",
  },
];

const PROOF_PILLS = [
  "DETERMINISTIC",
  "CONSTRAINT-BASED",
  "NO MOCK METRICS",
];

export default function DualPathways() {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="executive-proof-title"
    >
      <div id="start" style={{ position: "absolute", top: 0, height: 0, width: 0 }} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.ledgerFrame}>
          {/* Precision Gold Corner Brackets */}
          <span
            className={`${styles.cornerBracket} ${styles.cornerTL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerTR}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerBL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerBR}`}
            aria-hidden="true"
          />

          {/* Top-Edge Warm Bronze Ambient Glow & Micro-Grid */}
          <div className={styles.topEdgeGlow} aria-hidden="true" />
          <div className={styles.blueprintGrid} aria-hidden="true" />

          {/* Row 1: Balanced Editorial Context Header + Architectural Proof Pills */}
          <div className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <div className={styles.eyebrow}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles.eyebrowStar}
                  aria-hidden="true"
                >
                  <path
                    d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
                    fill="#D4AA67"
                  />
                </svg>
                <span>02 // PRODUCTION EXPERIENCE &middot; ARCHITECTURAL BENCHMARKS</span>
              </div>

              <h2 id="executive-proof-title" className={styles.heading}>
                Three architectures. Real operating constraints.
              </h2>

              <p className={styles.subtitle}>
                Prototypes prove demand. Production architectures are defined by how
                they isolate failures, enforce data invariants, and protect token budgets.
              </p>
            </div>

            <div
              className={styles.proofPillsCol}
              aria-label="Engineering guarantees"
            >
              {PROOF_PILLS.map((pill) => (
                <span key={pill} className={styles.proofPill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: 3-Column Authentic Architectural Benchmark Cards */}
          <div
            className={styles.systemsGrid}
            role="list"
            aria-label="Selected production architectural benchmarks"
          >
            {SELECTED_SYSTEMS.map((sys) => (
              <div
                key={sys.name}
                className={styles.systemCell}
                role="listitem"
              >
                <a
                  href={withBasePath(sys.href)}
                  className={styles.systemCard}
                  data-source="architectural-benchmark"
                >
                  {/* Card Header & Tag */}
                  <div className={styles.cardTopHeader}>
                    <span className={styles.cardTag}>{sys.tag}</span>
                    <span className={styles.cardArrow} aria-hidden="true">↗</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className={styles.titleGroup}>
                    <h3 className={styles.systemName}>{sys.name}</h3>
                    <p className={styles.systemSubtitle}>{sys.subtitle}</p>
                  </div>

                  {/* Problem Statement */}
                  <div className={styles.specSection}>
                    <span className={styles.specLabel}>OPERATING PROBLEM</span>
                    <p className={styles.specText}>{sys.problem}</p>
                  </div>

                  {/* Architectural Decision */}
                  <div className={styles.specSection}>
                    <span className={styles.specLabelGold}>ARCHITECTURAL DECISION</span>
                    <p className={styles.specText}>{sys.decision}</p>
                  </div>

                  {/* Authentic Metric Benchmark Box (Underwrite Style) */}
                  <div className={styles.metricBox}>
                    <div className={styles.metricPrimaryRow}>
                      <strong className={styles.metricVal}>{sys.primaryMetric}</strong>
                      <span className={styles.metricLabel}>{sys.primaryLabel}</span>
                    </div>
                    <div className={styles.metricSecondaryRow}>
                      <span>{sys.secondaryMetrics}</span>
                    </div>
                  </div>

                  {/* Card Footer Tech Stack & CTA */}
                  <div className={styles.cardFooter}>
                    <span className={styles.stackText}>{sys.stack}</span>
                    <span className={styles.ctaLink}>
                      Read Case Study <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Row 3: Balanced Dual-Action Fast-Track Footer Bar */}
          <div className={styles.pathwaysRow}>
            {/* Left Half: Hiring Teams */}
            <div className={styles.pathwayCell}>
              <div className={styles.pathwayInfo}>
                <div className={styles.pathwayIconBox} aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className={styles.pathwayText}>
                  <span className={styles.pathwayTitle}>FOR HIRING TEAMS</span>
                  <span className={styles.pathwayDesc}>
                    Staff, Principal &amp; AI Architect Roles &middot; Uzair Khatri (Uzair Iqbal)
                  </span>
                </div>
              </div>

              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.pathwayBtnOutline}
              >
                <span>Explore CV (PDF)</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Right Half: Founders & CTOs */}
            <div className={styles.pathwayCell}>
              <div className={styles.pathwayInfo}>
                <div className={styles.pathwayIconBox} aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div className={styles.pathwayText}>
                  <span className={styles.pathwayTitle}>
                    FOR FOUNDERS &amp; CTOS
                  </span>
                  <span className={styles.pathwayDesc}>
                    Architecture Pre-Mortem ($250) &amp; Implementation Sprints
                  </span>
                </div>
              </div>

              <a
                href={withBasePath("/audit/")}
                className={styles.pathwayBtnGold}
              >
                <span>Request Architecture Pre-Mortem</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
