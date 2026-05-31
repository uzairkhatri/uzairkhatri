"use client";

import { useState } from "react";
import styles from "./SelectedWork.module.css";
import { withBasePath } from "./siteLinks";

type Project = {
  number: string;
  year: string;
  slug?: string;
  name: string;
  category: string;
  role: string;
  description: string;
  built: [string, string][];
  stack: string[];
  metrics: [string, string][];
};

const projects: Project[] = [
  {
    number: "01",
    year: "2024",
    slug: "wellows",
    name: "Wellows - AI Search Visibility Platform",
    category: "AI Agents - SaaS",
    role: "Founding Architect - AI Platform & Agent Systems",
    description:
      "Wellows needed more than an AI feature layer. The product required a production architecture for brand search visibility across ChatGPT, Gemini, Perplexity, and Google AI ecosystems. I designed the agent workflows, vector-search layer, backend services, and infrastructure path that moved the platform from idea to live business system.",
    built: [
      ["KIVA", "AI keyword intelligence engine for search opportunity discovery and SEO decision automation."],
      [
        "OPTA",
        "Autonomous technical audit agent detecting performance, SEO, and architecture issues with remediation workflows.",
      ],
      [
        "Citation Intelligence",
        "AI monitoring engine tracking brand mentions, sentiment shifts, and competitive citation gaps across LLM ecosystems.",
      ],
      [
        "Scalable API ecosystem",
        "Vector search infrastructure, real-time ingestion pipelines, and multi-agent orchestration backbone.",
      ],
    ],
    stack: ["LangChain", "OpenAI", "FastAPI", "Multi-Agent Systems", "Vector Search", "Python", "AWS", "Real-time Pipelines"],
    metrics: [
      ["3", "Production AI agents built"],
      ["80%", "Workflow automation improvement"],
      ["Multi-agent", "AI platform architecture"],
      ["LLM visibility", "Search intelligence across AI surfaces"],
    ],
  },
  {
    number: "02",
    year: "2024",
    name: "ClassFlow - Agentic Online Learning Platform",
    category: "AI Agents - EdTech",
    role: "Lead Architect - AI Systems & Platform",
    description:
      "ClassFlow needed to make online learning operationally scalable without hiring a manual operations team. I architected the AI scheduling, payment, quality-scoring, and real-time class lifecycle systems so booking, delivery, completion, and payouts could operate as one coordinated platform.",
    built: [
      [
        "AI Scheduling Agent",
        "Matches students to teachers by subject, availability, and performance history autonomously.",
      ],
      [
        "Payment Disbursement Engine",
        "Automated per-class student billing and per-subject teacher payout system.",
      ],
      [
        "Quality Scoring Agent",
        "Monitors session outcomes and flags performance issues without human intervention.",
      ],
      [
        "Real-time class lifecycle",
        "Booking, delivery, completion, and payment in a single orchestrated flow.",
      ],
    ],
    stack: ["Agentic AI", "FastAPI", "Stripe", "WebSockets", "PostgreSQL", "Redis", "AWS"],
    metrics: [
      ["3", "AI agents built"],
      ["100%", "Automated scheduling"],
      ["0", "Manual payment operations"],
    ],
  },
  {
    number: "03",
    year: "2023",
    name: "Savyour - Pakistan's First Cashback Platform",
    category: "Fintech - E-commerce",
    role: "Solutions Architect - Backend & AI Systems",
    description:
      "Savyour needed cashback, payments, partner integrations, and analytics to behave reliably across a large consumer marketplace. I contributed backend architecture for Pakistan's first major cashback platform, supporting 650+ brand integrations and real-money transaction flows.",
    built: [
      [
        "Cashback calculation engine",
        "Real-time affiliate commission tracking and instant wallet crediting across 650+ brand integrations.",
      ],
      [
        "Payment disbursement pipeline",
        "Real-money withdrawals directly to user bank accounts with full audit trail.",
      ],
      [
        "Savvy AI assistant",
        "AI shopping assistant inside a cashback app with English and Roman Urdu NLP.",
      ],
      [
        "Multi-brand API ecosystem",
        "Scalable integration layer connecting 650+ partner brands across categories.",
      ],
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Payment APIs", "NLP", "AWS"],
    metrics: [
      ["650+", "Brand partners integrated"],
      ["#1", "Cashback platform in Pakistan"],
      ["AI", "Shopping assistant in cashback app"],
    ],
  },
  {
    number: "04",
    year: "2022",
    name: "EFU Life - IBM FileNet Enterprise System",
    category: "Enterprise - Insurance",
    role: "Enterprise Architect - IBM FileNet Implementation",
    description:
      "EFU Life needed document-heavy insurance operations to move from fragmented manual workflows to enterprise-grade digital case management. I implemented IBM FileNet P8, Case Manager, and Capture to support policy, claims, compliance, and paperless operational delivery.",
    built: [
      [
        "IBM FileNet P8",
        "Enterprise document management across policy, claims, and compliance departments.",
      ],
      [
        "IBM Case Manager",
        "Insurance case routing, policy processing, and claims workflow automation.",
      ],
      [
        "IBM Capture",
        "Automated document ingestion, digitalization, and regulatory compliance routing.",
      ],
      [
        "Paperless transformation",
        "End-to-end digital operations replacing manual document-heavy workflows.",
      ],
    ],
    stack: ["IBM FileNet P8", "IBM Case Manager", "IBM Capture", "Enterprise Architecture", "Workflow Automation"],
    metrics: [
      ["AA++", "Client credit rating"],
      ["100%", "Paperless delivery"],
      ["1932", "Pakistan's oldest insurer"],
    ],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h9M9.5 5.5 13 9l-3.5 3.5" />
    </svg>
  );
}

function ArchitectureIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <rect x="3" y="3" width="4.4" height="4.4" rx="1" />
      <rect x="10.6" y="3" width="4.4" height="4.4" rx="1" />
      <rect x="6.8" y="10.6" width="4.4" height="4.4" rx="1" />
      <path d="M7.4 5.2h3.2M9 7.4v3.2" />
    </svg>
  );
}

function WellowsArchitectureDiagram() {
  const agents = ["KIVA", "OPTA", "Citation Intelligence"];

  return (
    <div className={styles.architectureDiagram} aria-label="Wellows multi-agent architecture diagram">
      <p className={styles.diagramLabel}>System architecture</p>
      <div className={styles.infrastructureFrame}>
        <span className={styles.infrastructureLabel}>AWS Infrastructure</span>
        <div className={styles.diagramFlow}>
        <div className={styles.diagramNode}>Brand / user request</div>
        <span className={styles.diagramArrow} aria-hidden="true" />
        <div className={`${styles.diagramNode} ${styles.diagramCore}`}>LangGraph orchestration</div>
        <span className={styles.diagramArrow} aria-hidden="true" />
        <div className={styles.diagramAgents}>
          {agents.map((agent) => (
            <div className={styles.diagramNode} key={agent}>
              {agent}
            </div>
          ))}
        </div>
        <span className={styles.diagramArrow} aria-hidden="true" />
          <div className={styles.diagramNode}>Vector search + FastAPI layer</div>
        </div>
      </div>
      <p className={styles.diagramNote}>
        Three specialized agents operate in parallel through LangGraph orchestration, each with defined
        responsibilities, retry logic, and a shared retrieval layer. No single point of failure.
      </p>
    </div>
  );
}

function ClassFlowArchitectureDiagram() {
  return (
    <div className={styles.architectureDiagram} aria-label="ClassFlow agentic learning architecture diagram">
      <p className={styles.diagramLabel}>System architecture</p>
      <div className={styles.infrastructureFrame}>
        <span className={styles.infrastructureLabel}>AWS Infrastructure</span>
        <div className={styles.diagramFlow}>
          <div className={styles.diagramNode}>Student request</div>
          <span className={styles.diagramArrow} aria-hidden="true" />
          <div className={`${styles.diagramNode} ${styles.diagramCore}`}>Scheduling agent</div>
          <span className={styles.diagramArrow} aria-hidden="true" />
          <div className={styles.diagramAgents}>
            <div className={styles.diagramNode}>Teacher matching</div>
            <div className={styles.diagramNode}>Payment engine</div>
            <div className={styles.diagramNode}>Quality scoring agent</div>
          </div>
          <span className={styles.diagramArrow} aria-hidden="true" />
          <div className={styles.diagramNode}>Live class lifecycle</div>
        </div>
      </div>
      <p className={styles.diagramNote}>
        Scheduling, session delivery, payment disbursement, and quality scoring operate as one coordinated
        workflow, reducing manual operations without losing control over class outcomes.
      </p>
    </div>
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section} id="work" aria-labelledby="selected-work-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <span />
              Selected work
            </div>
            <h2 className={styles.title} id="selected-work-title">
              Proof in
              <br />
              <span>production.</span>
            </h2>
            <p className={styles.subtitle}>
              Architecture diagrams are visible where the system thinking matters most.
            </p>
          </div>
          <div className={styles.headerRight}>
            <span>04 projects</span>
            <a href="#contact">
              Discuss architecture
              <ArrowIcon />
            </a>
          </div>
        </header>

        <div className={styles.rows}>
          {projects.map((project, index) => {
            const isActive = active === index;

            return (
              <article className={`${styles.row} ${isActive ? styles.active : ""}`} key={project.number}>
                <button className={styles.rowButton} type="button" onClick={() => setActive(isActive ? -1 : index)}>
                  <span className={styles.num}>{project.number}</span>
                  <span className={styles.rowMain}>
                    <span className={styles.name}>{project.name}</span>
                    <span className={styles.category}>{project.category}</span>
                  </span>
                  <span className={styles.rowRight}>
                    <span className={styles.arrow}>
                      <ArrowIcon />
                    </span>
                  </span>
                </button>

                <div className={styles.expand} aria-hidden={!isActive}>
                  <div className={styles.expandInner}>
                    <div>
                      <div className={styles.roleBadge}>
                        <ArchitectureIcon />
                        {project.role}
                      </div>
                      <p className={styles.description}>{project.description}</p>

                      <p className={styles.builtLabel}>What I architected</p>
                      <div className={styles.builtItems}>
                        {project.built.map(([title, text]) => (
                          <div className={styles.builtItem} key={title}>
                            <span />
                            <p>
                              <strong>{title}</strong> - {text}
                            </p>
                          </div>
                        ))}
                      </div>

                      {project.number === "01" ? <WellowsArchitectureDiagram /> : null}
                      {project.number === "02" ? <ClassFlowArchitectureDiagram /> : null}

                      <div className={styles.pills}>
                        {project.stack.map((chip) => (
                          <span key={chip}>{chip}</span>
                        ))}
                      </div>

                      {project.slug ? (
                        <a href={withBasePath(`/work/${project.slug}`)} className={styles.caseLink}>
                          Full case study -&gt;
                        </a>
                      ) : null}
                    </div>

                    <div className={styles.metrics}>
                      {project.metrics.map(([value, label]) => (
                        <div className={styles.metric} key={`${project.number}-${label}`}>
                          <strong>{value}</strong>
                          <span>{label}</span>
                        </div>
                      ))}
                      <a className={styles.talkLink} href="#contact">
                        Built something similar? Let&apos;s talk -&gt;
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
