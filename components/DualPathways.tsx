import React from "react";
import { CV_URL, withBasePath } from "./siteLinks";
import styles from "./DualPathways.module.css";

interface SystemCredential {
  tag: string;
  tagTone: "gold" | "emerald" | "titanium";
  name: string;
  subtitle: string;
  problem: string;
  decision: string;
  metricLabel: string;
  metricValue: string;
  metricUnit: string;
  secondaryMetric: string;
  stack: string;
  href: string;
}

const SELECTED_SYSTEMS: SystemCredential[] = [
  {
    tag: "AI AGENTS & RAG",
    tagTone: "gold",
    name: "Wellows",
    subtitle: "LLM Search Visibility & Citation Engine",
    problem:
      "Single-query prototype scripts degraded under concurrent load, with unguarded token spend and ungrounded model drift.",
    decision:
      "Engineered LangGraph supervisor state machines with strict Pydantic contracts, isolated SQS queues, and Qdrant retrieval fallback.",
    metricLabel: "VECTOR LOOKUP LATENCY",
    metricValue: "<200",
    metricUnit: "ms avg",
    secondaryMetric: "3 LangGraph production agents",
    stack: "LangGraph · Qdrant · FastAPI · Python",
    href: "/work/wellows/",
  },
  {
    tag: "FINTECH & LEDGERS",
    tagTone: "emerald",
    name: "Savyour",
    subtitle: "High-Throughput Webhook Ledger & Settlement",
    problem:
      "Nationwide retail promotion bursts triggered webhook race conditions and duplicate cashback payout exploits across partner networks.",
    decision:
      "Architected Redis Redlock distributed mutexes, HMAC webhook verification, and double-entry immutable ledgers in PostgreSQL.",
    metricLabel: "PAYOUT INTEGRITY & LOCKING",
    metricValue: "0",
    metricUnit: "duplicate payouts",
    secondaryMetric: "18ms wallet write · ACID committed",
    stack: "FastAPI · Redis Redlock · PostgreSQL · AWS",
    href: "/work/savyour/",
  },
  {
    tag: "ENTERPRISE SAAS",
    tagTone: "titanium",
    name: "ClassFlow & Enterprise Insurer",
    subtitle: "Stateful Concurrency & Regulated Paperless Routing",
    problem:
      "Peak checkout surges caused double-booking collisions, while manual insurance queues created multi-day underwriting backlogs.",
    decision:
      "Implemented optimistic concurrency control with tenant state isolation, transactional queue workers, and role-based audit logging.",
    metricLabel: "BOOKING COLLISION RATE",
    metricValue: "0",
    metricUnit: "double-bookings",
    secondaryMetric: "100% automated paperless queue",
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
      aria-labelledby="benchmark-title"
    >
      <div id="start" style={{ position: "absolute", top: 0, height: 0, width: 0 }} aria-hidden="true" />
      <div className={styles.container}>
        {/* Overhead Ambient Gold Spotlight & Micro-Grid */}
        <div className={styles.topSpotlight} aria-hidden="true" />
        <div className={styles.blueprintGrid} aria-hidden="true" />

        {/* Row 1: Centered Headline & Editorial Context */}
        <div className={styles.headerBlock}>
          {/* Status Pill Badge with live green dot */}
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>02 // PRODUCTION ARCHITECTURAL BENCHMARKS</span>
          </div>

          {/* Two-Tone Bold Headline in Warm Gold */}
          <h2 id="benchmark-title" className={styles.heading}>
            Three architectures.
            <span className={styles.headingAccent}> Real operating constraints.</span>
          </h2>

          <p className={styles.subtitleLead}>See the data.</p>
          <p className={styles.subtitle}>
            Prototypes prove demand. Production architectures are defined by how they
            isolate failures, enforce data invariants, and protect token budgets.
          </p>

          <div className={styles.proofPillsRow} aria-label="Engineering guarantees">
            {PROOF_PILLS.map((pill) => (
              <span key={pill} className={styles.proofPill}>
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: 3 Floating Underwrite-Style Cards */}
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
                className={`${styles.systemCard} ${styles[`card_${sys.tagTone}`]}`}
                data-source="architectural-benchmark"
              >
                {/* Card Header: Category Tag on left, three dots on right */}
                <div className={styles.cardTopHeader}>
                  <span className={`${styles.cardTag} ${styles[`tag_${sys.tagTone}`]}`}>
                    {sys.tag}
                  </span>
                  <span className={styles.cardMenuDots} aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className={styles.titleGroup}>
                  <h3 className={styles.systemName}>{sys.name}</h3>
                  <p className={styles.systemSubtitle}>{sys.subtitle}</p>
                </div>

                {/* Operating Problem & Architectural Decision */}
                <div className={styles.narrativeGroup}>
                  <div className={styles.narrativeItem}>
                    <span className={styles.narrativeLabel}>OPERATING PROBLEM</span>
                    <p className={styles.narrativeText}>{sys.problem}</p>
                  </div>
                  <div className={styles.narrativeItem}>
                    <span className={styles.narrativeLabelAccent}>ARCHITECTURAL DECISION</span>
                    <p className={styles.narrativeText}>{sys.decision}</p>
                  </div>
                </div>

                {/* Underwrite-Style Inset Metric Benchmark Box */}
                <div className={styles.metricBox}>
                  <span className={styles.metricBoxLabel}>{sys.metricLabel}</span>
                  <div className={styles.metricValRow}>
                    <span className={`${styles.metricVal} ${styles[`val_${sys.tagTone}`]}`}>
                      {sys.metricValue}
                    </span>
                    <span className={styles.metricUnit}>{sys.metricUnit}</span>
                  </div>
                  <div className={styles.metricSecondaryRow}>
                    <span>{sys.secondaryMetric}</span>
                  </div>
                </div>

                {/* Card Footer: Tech Stack & Read Case Study Link */}
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

        {/* Scroll prompt (Underwrite Signature) */}
        <div className={styles.scrollIndicatorRow}>
          <a href="#work" className={styles.scrollLink}>
            <span>SCROLL TO EXPLORE ARCHITECTURE LAB</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={styles.scrollChevron}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>

        {/* Row 3: Dual-Action Pathway Footer (Recruiter & Founder Fast-Tracks) */}
        <div className={styles.pathwaysRow}>
          {/* Left: Hiring Teams */}
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

          {/* Right: Founders & CTOs */}
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
    </section>
  );
}
