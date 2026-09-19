"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SelectedWork.module.css";
import ProjectVisual, { type ProjectVisualType } from "./ProjectVisual";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { useTiltAndGlow } from "./useTiltAndGlow";

type Project = {
  number: string;
  year: string;
  name: string;
  category: string;
  role: string;
  description: string;
  stack: string[];
  metric: [string, string];
  metrics: { label: string; value: string }[];
  diagram: ProjectVisualType;
  challenge: string;
  solution: string;
  caseStudyUrl?: string;
  /** Public URL of the shipped product, where one exists and is live. */
  liveUrl?: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
};

const projects: Project[] = [
  {
    number: "01",
    year: "2024",
    name: "Wellows",
    category: "LLM Search Visibility Platform",
    role: "Solutions Architect",
    caseStudyUrl: "/work/wellows",
    liveUrl: "https://wellows.com",
    description:
      "Designed the agent workflows, shared retrieval layer, backend services, and infrastructure path for a platform that measures brand visibility across ChatGPT, Gemini, Perplexity, and Google AI, then closes the gaps through automated content and technical page remediation.",
    stack: ["LangGraph", "OpenAI", "Claude", "FastAPI", "Qdrant", "AWS"],
    metric: ["3 agents active", "Citation measurement and automated remediation on one spine"],
    metrics: [
      { label: "Runtime", value: "LangGraph" },
      { label: "Safety", value: "Guardrails" },
      { label: "Tracing", value: "LangSmith" }
    ],
    diagram: "wellows",
    challenge: "Wellows prototype worked in investor demos but lacked cost controls, async orchestration, and failure boundaries required to support concurrent enterprise users. Remediation content was also drafted without the visibility findings that should have informed it.",
    solution: "Orchestrated three specialized agents (KIVA, OPTA, and Citation Intelligence) using LangGraph and isolated error queues, ensuring failure in one did not crash the system, and grounded KIVA against the same Qdrant store the monitoring agents query.",
    blueprint: {
      orchestration: "LangGraph / FastAPI / Python",
      data: "Qdrant index / Shared ingestion pipeline",
      infra: "AWS SQS Queues / ECS Containers"
    },
  },
  {
    number: "02",
    year: "2024",
    name: "ClassFlow",
    category: "Live Tutoring Marketplace SaaS",
    role: "Lead Architect",
    caseStudyUrl: "/work/classflow",
    description:
      "Architected automated tutor matching across global timezones, Redis concurrency locks to eliminate double-booking, and automated Stripe teacher payouts.",
    stack: ["FastAPI", "Redis Redlock", "Stripe Connect", "WebSockets", "PostgreSQL"],
    metric: ["Automated ops", "Scheduling, matching, and payout reconciliation run without manual steps"],
    metrics: [
      { label: "Locks", value: "Redis" },
      { label: "Payments", value: "Stripe" },
      { label: "State", value: "Realtime" }
    ],
    diagram: "classflow",
    challenge: "Online tutoring operations suffered from manual scheduling bottlenecks across 14 timezones and concurrent double-booking conflicts during peak enrollment surges.",
    solution: "Engineered an autonomous matchmaking engine with sub-100ms timezone heuristic scoring, Redis Redlock concurrency holds, and automated Stripe Connect disbursements.",
    blueprint: {
      orchestration: "FastAPI / Python State Machine",
      data: "Redis Locks / WebSockets match feedback",
      infra: "Stripe payout system / AWS ECS"
    },
  },
  {
    number: "03",
    year: "2023",
    name: "Savyour",
    category: "Fintech Cashback Platform",
    role: "Solutions Architect",
    caseStudyUrl: "/work/savyour",
    description:
      "Contributed backend architecture across cashback calculation, partner integrations, wallet flows, payment disbursement, and AI shopping assistance for a large consumer marketplace.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Payment APIs"],
    metric: ["100+ partners", "Merchant integrations served by the settlement and partner API layer"],
    metrics: [
      { label: "Ledger", value: "ACID" },
      { label: "Events", value: "Webhooks" },
      { label: "Cache", value: "Redis" }
    ],
    diagram: "savyour",
    challenge: "Processing thousands of affiliate rewards events concurrently while keeping financial wallet ledgers synchronized, idempotent, and highly consistent.",
    solution: "Developed decoupled ingestion queues with database-level ACID transactions and Redis caches to handle cashback event calculation in sub-second timelines.",
    blueprint: {
      orchestration: "FastAPI Async Services",
      data: "PostgreSQL Ledger / Transaction Isolation",
      infra: "Partner webhook channels / AWS"
    },
  },
  {
    number: "04",
    year: "2022",
    name: "EFU Life",
    category: "Enterprise Insurance System",
    role: "Enterprise Architect",
    description:
      "Implemented IBM FileNet P8, Case Manager, and Capture to move document-heavy insurance operations toward digital case management and paperless delivery.",
    stack: ["IBM FileNet", "Case Manager", "Capture", "Workflow Automation"],
    metric: ["5 workflows", "IBM FileNet approval chains automated, cutting turnaround from weeks to days"],
    metrics: [
      { label: "Workflow", value: "Case P8" },
      { label: "Capture", value: "Datacap" },
      { label: "Access", value: "LDAP" }
    ],
    diagram: "efu",
    challenge: "Migrating highly physical paper filing operations to paperless case routing for thousands of enterprise policy documents daily with strict compliance guidelines.",
    solution: "Implemented IBM FileNet Content Store with automated document ingestion and Case Manager routing pipelines, eliminating manual filing queues.",
    blueprint: {
      orchestration: "IBM Case Manager Workflows",
      data: "FileNet P8 Content Repository",
      infra: "On-Premise Server High Availability clusters"
    },
  },
];

// How many nodes each project's architecture diagram walks through. This drives
// the sequential node highlight in ProjectVisual via activeLogIndex; it is a
// presentation timer, not a record of anything the system did.
const diagramSteps: Record<string, number> = {
  Wellows: 7,
  ClassFlow: 6,
  Savyour: 6,
  "EFU Life": 6,
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.06,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" as const }
  }
};

function ProjectBlade({
  proj,
  idx,
  activeTab,
  activeColor,
  onClick,
}: {
  proj: typeof projects[0];
  idx: number;
  activeTab: number;
  activeColor: string;
  onClick: () => void;
}) {
  const tiltGlow = useTiltAndGlow({ maxTilt: 5, scale: 1.015 });
  const bladeSpecs = [
    { spec: "Multi-Agent", spine: "LangGraph" },
    { spec: "Live Scheduling & Locks", spine: "Redis Redlock / Stripe" },
    { spec: "Financial Ledger", spine: "PostgreSQL ACID" },
    { spec: "Enterprise ECM", spine: "IBM FileNet" },
  ];
  
  return (
    <button
      ref={tiltGlow.ref}
      onMouseMove={tiltGlow.onMouseMove}
      onMouseLeave={tiltGlow.onMouseLeave}
      style={tiltGlow.style}
      className={`${styles.tabBtn} ${idx === activeTab ? styles.tabActive : ""}`}
      onClick={onClick}
      aria-selected={idx === activeTab}
      role="tab"
    >
      {idx === activeTab && (
        <motion.div
          layoutId="activeBladeBackground"
          className={styles.activeTabGlow}
          style={{
            background: activeColor === "#c59b53" ? "rgba(197, 155, 83, 0.05)" : 
                        activeColor === "#8cc7ad" ? "rgba(140, 199, 173, 0.05)" : 
                        activeColor === "#9db5d8" ? "rgba(157, 181, 216, 0.05)" : 
                        "rgba(201, 188, 168, 0.05)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      )}
      <header className={styles.tabHeader}>
        <h3>{proj.name}</h3>
        <em>{proj.year}</em>
      </header>
      <span className={styles.tabKicker}>{proj.category}</span>
      <div className={styles.bladeMetrics}>
        <div className={styles.bladeMetricCell}>
          <small>Architecture</small>
          <strong>{bladeSpecs[idx].spec}</strong>
        </div>
        <div className={styles.bladeMetricCell}>
          <small>Core Spine</small>
          <strong>{bladeSpecs[idx].spine}</strong>
        </div>
      </div>
    </button>
  );
}

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(7);
  const activeProject = projects[activeTab];

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setActiveTab(index);
  };

  // Advances the architecture diagram's highlighted node, then settles.
  useEffect(() => {
    const steps = diagramSteps[activeProject.name] ?? 6;
    setActiveLogIndex(0);

    let step = 1;
    const interval = setInterval(() => {
      if (step < steps) {
        setActiveLogIndex(step);
        step++;
      } else {
        setActiveLogIndex(7); // settled state: no node emphasised
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab, activeProject.name]);

  // Accent colors for dynamic dashboard glow transitions
  const accentColors = ["#c59b53", "#8cc7ad", "#9db5d8", "#c9bca8"];
  const accentGlows = [
    "rgba(197, 155, 83, 0.04)",
    "rgba(140, 199, 173, 0.04)",
    "rgba(157, 181, 216, 0.04)",
    "rgba(201, 188, 168, 0.04)"
  ];
  const activeColor = accentColors[activeTab];
  const activeGlow = accentGlows[activeTab];

  return (
    <section 
      className={styles.section} 
      id="work" 
      aria-labelledby="work-title"
      style={{
        ["--project-accent" as any]: activeColor,
        ["--project-accent-glow" as any]: activeGlow
      }}
    >
      <div className={styles.ambientGlow} />
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              <span />
              Selected work
            </div>
            <h2 className={styles.title} id="work-title">
              Selected Work
            </h2>
          </div>
          <p className={styles.headerDesc}>
            Production architectures, multi-agent runtimes, and scalable platforms engineered to survive real customer traffic.
          </p>
        </header>

        {/* Dashboard Split Container */}
        <div className={styles.dashboardContainer}>
          
          <nav className={styles.tabsList} role="tablist" aria-label="Project architecture selector">
            {projects.map((proj, idx) => (
              <ProjectBlade
                key={proj.number}
                proj={proj}
                idx={idx}
                activeTab={activeTab}
                activeColor={activeColor}
                onClick={() => handleTabChange(idx)}
              />
            ))}
          </nav>

          {/* Right Panel: Spec Details with dynamic Framer Motion exit/entry */}
          <AnimatePresence mode="wait">
            <motion.article 
              key={activeProject.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.specPanel}
            >
              {/* Clear Business Context Header */}
              <motion.div className={styles.projectContextBanner} variants={itemVariants}>
                <div className={styles.projectContextTop}>
                  <h3 className={styles.projectNameTitle}>{activeProject.name} &bull; {activeProject.category}</h3>
                  <span className={styles.projectRolePill}>{activeProject.role}</span>
                </div>
                <p className={styles.projectSummaryLine}>{activeProject.description}</p>
              </motion.div>

              {/* Project Visual Display Header */}
              <motion.div className={styles.specVisualBlock} variants={itemVariants}>
                <ProjectVisual type={activeProject.diagram} variant="hero" activeLogIndex={activeLogIndex} />
              </motion.div>

              <motion.div className={styles.architectureMetrics} variants={itemVariants}>
                {activeProject.metrics.map((item) => (
                  <div className={styles.architectureMetric} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </motion.div>

              {/* Sub-Layout Content Columns */}
              <div className={styles.specBody}>
                <motion.div className={styles.specDetails} variants={itemVariants}>
                  <div className={styles.specRoleLine}>
                    <div className={styles.roleMeta}>
                      <strong>{activeProject.role}</strong>
                      <span>&bull;</span>
                      <span>{activeProject.category}</span>
                    </div>
                    {activeProject.caseStudyUrl && (
                      <a href={withBasePath(activeProject.caseStudyUrl)} className={styles.caseStudyLink}>
                        Read Architecture RFC &rarr;
                      </a>
                    )}
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.caseStudyLink}
                      >
                        View the live platform &rarr;
                      </a>
                    )}
                  </div>
                  <p className={styles.specDesc}>{activeProject.description}</p>

                  <div className={styles.blockRow}>
                    <div className={styles.block}>
                      <span className={styles.blockKicker}>01 / Problem</span>
                      <h4>The Scale Challenge</h4>
                      <p>{activeProject.challenge}</p>
                    </div>
                    <div className={styles.block}>
                      <span className={styles.blockKicker}>02 / Architecture</span>
                      <h4>The Architectural Solution</h4>
                      <p>{activeProject.solution}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Sidebar Technical Blueprint */}
                <motion.aside className={styles.specSidebar} variants={itemVariants}>
                  <div className={styles.blueprintPanel}>
                    <h4>System Blueprint</h4>
                    <div className={styles.blueprintRow}>
                      <strong>Orchestration</strong>
                      <span>{activeProject.blueprint.orchestration}</span>
                    </div>
                    <div className={styles.blueprintRow}>
                      <strong>Data Layer</strong>
                      <span>{activeProject.blueprint.data}</span>
                    </div>
                    <div className={styles.blueprintRow}>
                      <strong>Infrastructure</strong>
                      <span>{activeProject.blueprint.infra}</span>
                    </div>
                  </div>

                  <div className={styles.metricPanel}>
                    <span className={styles.blockKicker}>03 / Outcome</span>
                    <h4>Outcome Impact</h4>
                    <strong>{activeProject.metric[0]}</strong>
                    <span>{activeProject.metric[1]}</span>
                  </div>

                  <div className={styles.stackPanel}>
                    <h4>Core Stack</h4>
                    <div className={styles.tags}>
                      {activeProject.stack.map((t) => (
                        <span key={t} className={styles.stackTag}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.aside>
              </div>

              {/* Footer actions */}
              <motion.footer className={styles.specFooter} variants={itemVariants}>
                <span className={styles.ndaFootnote}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-2px", marginRight: "5px", opacity: 0.7 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Public details summarized under mutual NDA
                </span>
                <div className={styles.specFooterLinks}>
                  {activeProject.caseStudyUrl && (
                    <a href={withBasePath(activeProject.caseStudyUrl)} className={styles.specRfcBtn}>
                      Open Case Study RFC &rarr;
                    </a>
                  )}
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Discuss Similar Architecture &rarr;
                  </a>
                </div>
              </motion.footer>
            </motion.article>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

