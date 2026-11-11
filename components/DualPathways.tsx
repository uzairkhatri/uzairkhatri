import React from "react";
import { CV_URL, withBasePath } from "./siteLinks";
import styles from "./DualPathways.module.css";

interface ProductionProject {
  category: string;
  categoryTag: string;
  title: string;
  clientContext: string;
  problem: string;
  contribution: string;
  tags: string[];
  href: string;
}

const PRODUCTION_PROJECTS: ProductionProject[] = [
  {
    category: "Production AI Platform",
    categoryTag: "AI & RAG ARCHITECTURE",
    title: "Wellows",
    clientContext: "Multi-Agent Search Visibility & Citation Engine",
    problem:
      "Single-query prototype scripts degraded under concurrent load, with unguarded token spend and ungrounded model outputs across search surfaces.",
    contribution:
      "Co-engineered a multi-agent orchestration architecture using LangGraph state machines, Pydantic schema validation, and isolated SQS queues to decouple citation auditing from content generation.",
    tags: ["LangGraph", "Python / FastAPI", "AWS SQS & Redis"],
    href: "/work/wellows/",
  },
  {
    category: "Fintech & Distributed Backend",
    categoryTag: "FINTECH & DISTRIBUTED SYSTEMS",
    title: "Savyour",
    clientContext: "High-Throughput Webhook Ledger & Settlement",
    problem:
      "Nationwide retail promotion bursts triggered concurrent affiliate webhook race conditions that risked duplicate balance updates.",
    contribution:
      "Architected distributed mutex locking with Redis Redlock, idempotent HMAC webhook ingestion, and double-entry transaction boundaries in PostgreSQL to protect ledger integrity.",
    tags: ["Redis Redlock", "PostgreSQL ACID", "AWS ECS"],
    href: "/work/savyour/",
  },
  {
    category: "Enterprise Workflow & Integrations",
    categoryTag: "REGULATED ENTERPRISE WORKFLOWS",
    title: "Enterprise Insurer",
    clientContext: "Regulated Document Ingestion & Case Routing Platform",
    problem:
      "Core insurance underwriting relied on paper-bound records and manual department handoffs, creating multi-day review queues and audit tracing gaps.",
    contribution:
      "Architected automated document capture, structured content indexing, and rules-based approval routing integrated with enterprise Active Directory / LDAP for end-to-end auditability.",
    tags: ["Workflow Engine", "Content Repository", "Active Directory / LDAP"],
    href: "/work/efu-life/",
  },
];

export default function DualPathways() {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="production-experience-title"
    >
      <div id="start" style={{ position: "absolute", top: 0, height: 0, width: 0 }} aria-hidden="true" />
      <div className={styles.container}>
        {/* Overhead Ambient Gold Spotlight & Micro-Grid */}
        <div className={styles.topSpotlight} aria-hidden="true" />
        <div className={styles.blueprintGrid} aria-hidden="true" />

        {/* Section Header: Standardized Eyebrow, Headline & Context */}
        <div className={styles.headerBlock}>
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>PRODUCTION EXPERIENCE</span>
          </div>

          <h2 id="production-experience-title" className={styles.heading}>
            Real Systems. <span className={styles.headingAccent}>Real Engineering Decisions.</span>
          </h2>

          <p className={styles.subtitle}>
            From AI-powered platforms to high-throughput backend services, I&apos;ve helped
            design and build systems where reliability, scalability, and maintainability matter.
          </p>
        </div>

        {/* 3 Concise Production Experience Cards */}
        <div
          className={styles.cardsGrid}
          role="list"
          aria-label="Verified production engineering projects"
        >
          {PRODUCTION_PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className={styles.cardCell}
              role="listitem"
            >
              <article className={styles.projectCard}>
                {/* Card Top: Category Badge */}
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{proj.category}</span>
                  <span className={styles.categorySubtag}>{proj.categoryTag}</span>
                </div>

                {/* Card Identity */}
                <div className={styles.titleWrap}>
                  <h3 className={styles.projectTitle}>{proj.title}</h3>
                  <p className={styles.projectContext}>{proj.clientContext}</p>
                </div>

                {/* Problem Statement */}
                <div className={styles.contentBlock}>
                  <span className={styles.blockLabel}>OPERATING PROBLEM</span>
                  <p className={styles.blockText}>{proj.problem}</p>
                </div>

                {/* Engineering Contribution */}
                <div className={styles.contentBlock}>
                  <span className={styles.blockLabelAccent}>ENGINEERING CONTRIBUTION</span>
                  <p className={styles.blockText}>{proj.contribution}</p>
                </div>

                {/* Card Footer: Tech Tags + Direct Case Study Link */}
                <div className={styles.cardFooter}>
                  <div className={styles.tagList} aria-label={`Technologies used in ${proj.title}`}>
                    {proj.tags.map((tag) => (
                      <span key={tag} className={styles.techTag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={withBasePath(proj.href)}
                    className={styles.caseStudyLink}
                    aria-label={`Read case study for ${proj.title}`}
                  >
                    <span>Read Case Study</span>
                    <span className={styles.linkArrow} aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Dual-Action Pathway Bar: Direct Paths for Hiring Teams & Founders */}
        <div className={styles.pathwaysRow} aria-label="Next steps by audience">
          {/* Hiring Teams */}
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
              data-source="dual_pathways_hiring"
              className={styles.pathwayBtnOutline}
              aria-label="Download Uzair Khatri resume and CV in PDF format"
            >
              <span>Explore CV (PDF)</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          {/* Founders & CTOs */}
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
                <span className={styles.pathwayTitle}>FOR FOUNDERS &amp; CTOS</span>
                <span className={styles.pathwayDesc}>
                  Architecture Reviews &amp; Production Implementation Sprints
                </span>
              </div>
            </div>

            <a
              href={withBasePath("/audit/")}
              className={styles.pathwayBtnGold}
              aria-label="Request an architecture triage and review"
            >
              <span>Discuss Architecture</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
