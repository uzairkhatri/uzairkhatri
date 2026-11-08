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
    kicker: "01 // PRODUCTION AI & SEARCH",
    title: "Reliable AI & Retrieval Systems",
    description:
      "Build AI search that retrieves relevant domain context and produces schema-validated answers your engineering team can evaluate.",
    pills: "Hybrid RAG · Contract Validation · CI Gates",
    linkLabel: "Explore AI Systems",
    href: "/services/ai-systems/",
    consoleTitle: "RAG & Eval Architecture",
    consoleSubtitle: "Deterministic Retrieval & Contract Enforcers",
    consoleRows: [
      {
        label: "Retrieval: BM25 Lexical + Vector",
        badge: "Hybrid Reranked",
        tone: "green",
      },
      {
        label: "Output Contract: Pydantic Schema",
        badge: "Type-Enforced",
        tone: "green",
      },
      {
        label: "Regression Gate: Automated Suite",
        badge: "CI Blocking",
        tone: "gold",
      },
    ],
  },
  {
    kicker: "02 // AGENT ORCHESTRATION",
    title: "Fault-Tolerant AI Agents",
    description:
      "Make AI agents work reliably across tools, external APIs, and failure modes with partitioned state machines and bounded step limits.",
    pills: "LangGraph · State Isolation · Fallbacks",
    linkLabel: "Explore Agent Runtimes",
    href: "/services/ai-agents/",
    consoleTitle: "LangGraph Runtime",
    consoleSubtitle: "Stateful Supervisor & Failover Mesh",
    consoleRows: [
      {
        label: "Supervisor State Graph",
        badge: "Isolated State",
        tone: "green",
      },
      {
        label: "Provider API Latency Surge",
        badge: "Multi-Model Failover",
        tone: "gold",
      },
      {
        label: "Unresolvable Tool Call Exception",
        badge: "Dead-Letter Queue",
        tone: "green",
      },
    ],
  },
  {
    kicker: "03 // SAAS & FINTECH BACKENDS",
    title: "Distributed SaaS & Ledgers",
    description:
      "Prevent duplicate transactions, race conditions, and backend bottlenecks under high concurrent customer volume.",
    pills: "Redis Redlock · Idempotency · ACID Ledgers",
    linkLabel: "Explore SaaS Architecture",
    href: "/services/saas-architecture/",
    consoleTitle: "Concurrency & Ledger",
    consoleSubtitle: "Distributed Locks & ACID Settlement",
    consoleRows: [
      {
        label: "Distributed Mutex: Redis Redlock",
        badge: "Serialized State",
        tone: "green",
      },
      {
        label: "PostgreSQL Double-Entry Ledger",
        badge: "ACID Enforced",
        tone: "gold",
      },
      {
        label: "Idempotent Webhook Processing",
        badge: "Deduplicated",
        tone: "green",
      },
    ],
  },
  {
    kicker: "04 // SYSTEM DIAGNOSTICS",
    title: "Architecture Pre-Mortem Audit",
    description:
      "Find production risks, state leaks, rate-limit cliffs, and runaway token expenses before they cause expensive incidents.",
    pills: "Failure Triage · Token Profiling · Risk RFC",
    linkLabel: "Inspect Audit Process",
    href: "/audit/",
    consoleTitle: "Diagnostic Telemetry",
    consoleSubtitle: "Risk Surface Analysis & Architecture RFC",
    consoleRows: [
      {
        label: "Single-Point-of-Failure Triage",
        badge: "Remediated",
        tone: "green",
      },
      {
        label: "Token Consumption Profiling",
        badge: "Budget-Capped",
        tone: "gold",
      },
      {
        label: "P99 Latency & Concurrency Stress",
        badge: "Benchmarked",
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
    tag: "01 · ARCHITECTURE PRE-MORTEM",
    badge: "$250 · 48-HR TURNAROUND",
    description:
      "One scoped production risk, 3–5 page written risk assessment with code snippets, and a live 30-minute walkthrough.",
    ctaLabel: "Request Pre-Mortem ($250)",
    href: "/audit/",
    featured: false,
    source: "engagement_01_audit",
  },
  {
    tag: "02 · CRITICAL-PATH BUILD",
    badge: "2–6 WEEKS · IMPLEMENTATION",
    description:
      "Hands-on production implementation of agent state machines, retrieval pipelines, and high-concurrency backend backbones.",
    ctaLabel: "Discuss a System Build",
    href: BOOKING_URL,
    external: true,
    featured: true,
    source: "engagement_02_build",
  },
  {
    tag: "03 · ADVISORY & STAFF/PRINCIPAL ROLES",
    badge: "RETAINER OR FULL-TIME",
    description:
      "Architecture direction, PR reviews, system design leadership, or full-time Staff/Principal roles for funded teams.",
    ctaLabel: "Book 30-Min Strategy Call",
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
