"use client";

import React from "react";
import styles from "./EngagementModels.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

interface ConsoleRow {
  label: string;
  badge: string;
  tone: "green" | "gold";
}

interface CapabilityItem {
  kicker: string;
  title: string;
  description: string;
  pills: string;
  linkLabel: string;
  href: string;
  consoleTitle: string;
  consoleSubtitle: string;
  consoleRows: ConsoleRow[];
}

const capabilities: CapabilityItem[] = [
  {
    kicker: "01 // PRODUCTION AI & RAG",
    title: "Production AI Systems",
    description:
      "Turning fragile LLM demos into deterministic systems with hybrid retrieval, reranking, and CI evaluation gates.",
    pills: "Hybrid RAG · Guardrails · Evals",
    linkLabel: "Explore AI Systems",
    href: "/services/ai-systems/",
    consoleTitle: "RAG & Eval Gate",
    consoleSubtitle: "Deterministic Retrieval & Guardrails",
    consoleRows: [
      {
        label: "Hybrid Search: BM25 + Qdrant",
        badge: "Recall@5: 94.2%",
        tone: "green",
      },
      {
        label: "Schema Guardrail: Pydantic v2",
        badge: "0 Hallucinations",
        tone: "green",
      },
      {
        label: "CI Regression Gate",
        badge: "Passed ✓",
        tone: "gold",
      },
    ],
  },
  {
    kicker: "02 // AGENT ORCHESTRATION",
    title: "Multi-Agent Workflows",
    description:
      "Stateful LangGraph runtimes with isolated SQS error queues, token budget circuit breakers, and multi-model failover.",
    pills: "LangGraph · SQS · Bedrock Failover",
    linkLabel: "Explore Agent Runtimes",
    href: "/services/ai-agents/",
    consoleTitle: "LangGraph Runtime",
    consoleSubtitle: "Stateful Supervisor & Failover Mesh",
    consoleRows: [
      {
        label: "Supervisor → 3 Sub-Agents",
        badge: "Isolated State",
        tone: "green",
      },
      {
        label: "OpenAI HTTP 429 Surge",
        badge: "Bedrock Failover 38ms",
        tone: "gold",
      },
      {
        label: "SQS Dead-Letter Queue",
        badge: "0 Dropped Jobs",
        tone: "green",
      },
    ],
  },
  {
    kicker: "03 // SAAS & FINTECH BACKENDS",
    title: "Distributed SaaS & Ledgers",
    description:
      "Concurrency-safe scheduling, Redis Redlock mutexes, idempotent webhook ingestion, and ACID double-entry ledgers.",
    pills: "FastAPI · Redis Redlock · PostgreSQL",
    linkLabel: "Explore SaaS Architecture",
    href: "/services/saas-architecture/",
    consoleTitle: "Concurrency & Ledger",
    consoleSubtitle: "Distributed Locks & ACID Settlement",
    consoleRows: [
      {
        label: "Redis Redlock Mutex",
        badge: "0 Race Conflicts",
        tone: "green",
      },
      {
        label: "PostgreSQL ACID Ledger",
        badge: "Serializable",
        tone: "gold",
      },
      {
        label: "Stripe Connect Split",
        badge: "Idempotent Sync",
        tone: "green",
      },
    ],
  },
  {
    kicker: "04 // SYSTEM DIAGNOSTICS",
    title: "Architecture Pre-Mortem Audit",
    description:
      "Rapid codebase and runtime triage isolating latency spikes, state leaks, rate-limit cliffs, and runaway API costs.",
    pills: "Latency Triage · Cost Cut · RFC",
    linkLabel: "Inspect Audit Process",
    href: "/audit/",
    consoleTitle: "Audit Report Preview",
    consoleSubtitle: "Architecture Score: 78 → 96 (Hardened)",
    consoleRows: [
      {
        label: "Architecture Score: 78 → 96",
        badge: "Hardened",
        tone: "green",
      },
      {
        label: "Prompt & Token Leak",
        badge: "-$2.4k/mo Saved",
        tone: "gold",
      },
      {
        label: "P99 Latency Triage",
        badge: "4.8s → 380ms",
        tone: "green",
      },
    ],
  },
];

interface EngagementItem {
  tag: string;
  badge: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
  featured?: boolean;
  source: string;
}

const engagements: EngagementItem[] = [
  {
    tag: "01 · ARCHITECTURE AUDIT",
    badge: "1–2 WEEKS",
    description:
      "Rapid diagnostic & remediation RFC for existing AI or backend systems.",
    ctaLabel: "Review your architecture",
    href: "/audit/",
    featured: false,
    source: "engagement_01_audit",
  },
  {
    tag: "02 · CRITICAL-PATH BUILD",
    badge: "4–8 WEEKS · MOST REQUESTED",
    description:
      "Hands-on production implementation of agent workflows, RAG, and backend spine.",
    ctaLabel: "Discuss a System Build",
    href: BOOKING_URL,
    external: true,
    featured: true,
    source: "engagement_02_build",
  },
  {
    tag: "03 · ADVISORY & SENIOR ROLES",
    badge: "FRACTIONAL / FULL-TIME",
    description:
      "Ongoing Principal Architect direction, PR reviews, or senior leadership roles.",
    ctaLabel: "Book Strategy Call",
    href: BOOKING_URL,
    external: true,
    featured: false,
    source: "engagement_03_advisory",
  },
];

export default function EngagementModels() {
  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-engagement-title"
    >
      {/* Anchor targets for legacy navigation hashes */}
      <div
        id="capabilities"
        style={{ position: "absolute", top: 0, height: 0, width: 0 }}
        aria-hidden="true"
      />
      <div
        id="about"
        style={{ position: "absolute", top: 0, height: 0, width: 0 }}
        aria-hidden="true"
      />

      <div className={styles.container}>
        <div className={styles.dossierFrame}>
          {/* 4 Precision L-Shaped Gold Corner Brackets */}
          <span className={styles.cornerTL} aria-hidden="true" />
          <span className={styles.cornerTR} aria-hidden="true" />
          <span className={styles.cornerBL} aria-hidden="true" />
          <span className={styles.cornerBR} aria-hidden="true" />

          <div className={styles.topEdgeGlow} aria-hidden="true" />

          {/* Row 1: Header + Embedded Engineering Badge */}
          <header className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <div className={styles.eyebrow}>
                <svg
                  className={styles.eyebrowStar}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#d4aa67"
                  aria-hidden="true"
                >
                  <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
                </svg>
                <span>04 // SERVICES &amp; ENGAGEMENT &middot; WHAT I CAN SOLVE</span>
              </div>
              <h2 className={styles.heading} id="services-engagement-title">
                Architectural capabilities &amp; ways to engage.
              </h2>
              <p className={styles.subtitle}>
                From unblocking fragile AI prototypes to architecting
                high-concurrency SaaS backends and enterprise workflows.
              </p>
            </div>

            <div className={styles.partnershipBadge}>
              <span className={styles.partnershipDot} aria-hidden="true" />
              <span>EMBEDDED ENGINEERING &middot; ZERO BLACK-BOX HANDOFFS</span>
            </div>
          </header>

          {/* Row 2: 4-Column Capability Cards Grid */}
          <div
            className={styles.capabilitiesGrid}
            role="list"
            aria-label="Core architectural capabilities"
          >
            {capabilities.map((cap) => (
              <article
                key={cap.title}
                className={styles.capCard}
                role="listitem"
              >
                <div className={styles.capTop}>
                  {/* Realistic Product UI / Telemetry Mini-Window */}
                  <div className={styles.consoleWindow} aria-hidden="true">
                    <div className={styles.consoleTitlebar}>
                      <div className={styles.consoleDots}>
                        <span className={styles.dotRed} />
                        <span className={styles.dotAmber} />
                        <span className={styles.dotGreen} />
                      </div>
                      <span className={styles.consoleWindowName}>
                        {cap.consoleTitle}
                      </span>
                    </div>

                    <div className={styles.consoleBody}>
                      {cap.consoleRows.map((row) => (
                        <div key={row.label} className={styles.consoleRow}>
                          <span className={styles.consoleRowLabel}>
                            {row.label}
                          </span>
                          <span
                            className={
                              row.tone === "gold"
                                ? styles.consoleBadgeGold
                                : styles.consoleBadgeGreen
                            }
                          >
                            {row.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <span className={styles.capKicker}>{cap.kicker}</span>
                  <h3 className={styles.capTitle}>{cap.title}</h3>
                  <p className={styles.capDesc}>{cap.description}</p>
                </div>

                <div className={styles.capFooter}>
                  <span className={styles.capPill}>{cap.pills}</span>
                  <a
                    href={withBasePath(cap.href)}
                    className={styles.capLink}
                  >
                    <span>{cap.linkLabel}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Row 3: 3-Column Engagement Strip */}
          <div
            className={styles.engagementsGrid}
            role="list"
            aria-label="Engagement models"
          >
            {engagements.map((eng) => {
              const targetHref = eng.external
                ? eng.href
                : withBasePath(eng.href);
              return (
                <article
                  key={eng.tag}
                  role="listitem"
                  className={`${styles.engCard} ${
                    eng.featured ? styles.engCardFeatured : ""
                  }`}
                >
                  <div className={styles.engTopRow}>
                    <span className={styles.engTag}>{eng.tag}</span>
                    <span
                      className={`${styles.engBadge} ${
                        eng.featured ? styles.engBadgeFeatured : ""
                      }`}
                    >
                      {eng.badge}
                    </span>
                  </div>

                  <p className={styles.engDesc}>{eng.description}</p>

                  <a
                    href={targetHref}
                    target={eng.external ? "_blank" : undefined}
                    rel={eng.external ? "noreferrer" : undefined}
                    data-source={eng.source}
                    className={
                      eng.featured ? styles.engBtnGold : styles.engBtnOutline
                    }
                  >
                    <span>{eng.ctaLabel}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
