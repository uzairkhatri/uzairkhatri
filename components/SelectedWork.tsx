"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./SelectedWork.module.css";
import ProjectVisual, { type ProjectVisualType } from "./ProjectVisual";
import { BOOKING_URL } from "./siteLinks";

type Project = {
  number: string;
  year: string;
  name: string;
  category: string;
  role: string;
  description: string;
  stack: string[];
  metric: [string, string];
  diagram: ProjectVisualType;
  challenge: string;
  solution: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
  schema: Record<string, any>;
};

const projects: Project[] = [
  {
    number: "01",
    year: "2024",
    name: "Wellows",
    category: "AI Search Visibility Platform",
    role: "Founding Architect",
    description:
      "Designed the agent workflows, retrieval layer, backend services, and infrastructure path for production-grade AI search visibility across ChatGPT, Gemini, Perplexity, and Google AI surfaces.",
    stack: ["LangGraph", "OpenAI", "FastAPI", "Vector Search", "AWS"],
    metric: ["3 agents active", "KIVA, OPTA, and Citation Intelligence orchestration"],
    diagram: "wellows",
    challenge: "Wellows prototype worked in investor demos but lacked cost controls, async orchestration, and failure boundaries required to support concurrent enterprise users.",
    solution: "Orchestrated three specialized agents (KIVA, OPTA, and Citation Intelligence) using LangGraph and isolated error queues, ensuring failure in one did not crash the system.",
    blueprint: {
      orchestration: "LangGraph / FastAPI / Python",
      data: "Vector Index / Ingestion pipeline",
      infra: "AWS SQS Queues / ECS Containers"
    },
    schema: {
      "orchestration": {
        "engine": "LangGraph StateGraph",
        "nodes": ["KIVA_agent", "OPTA_agent", "Citation_Intelligence"],
        "max_concurrency_threads": 64,
        "state_context_store": "MemorySaver (Session Bound)"
      },
      "resilience": {
        "provider_failover": "Claude-3.5-Sonnet (via AWS Bedrock)",
        "rate_limiting_retry": "Exponential backoff with jitter",
        "dead_letter_queue": "aws-sqs-wellows-errors"
      }
    }
  },
  {
    number: "02",
    year: "2024",
    name: "ClassFlow",
    category: "Agentic Online Learning Platform",
    role: "Lead Architect",
    description:
      "Architected scheduling, teacher matching, payment disbursement, quality scoring, and real-time class lifecycle systems as one coordinated operational platform.",
    stack: ["Agentic AI", "FastAPI", "Stripe", "WebSockets", "Redis"],
    metric: ["0 manual ops", "Scheduling and payment workflows moved into automated system paths"],
    diagram: "classflow",
    challenge: "Moving online learning operations from high-friction manual teacher matching and scheduling runs to a completely autonomous, lock-safe orchestration engine.",
    solution: "Designed an automated teacher matchmaking pipeline utilizing dynamic scoring and timezone resolution with real-time class state machines.",
    blueprint: {
      orchestration: "FastAPI / Python State Machine",
      data: "Redis Locks / WebSockets match feedback",
      infra: "Stripe payout system / AWS ECS"
    },
    schema: {
      "matchmaker_engine": {
        "scoring_matrix": ["timezone_offset", "historical_rating", "active_load"],
        "lock_safety": "Redis Distributed Mutex (Redlock)",
        "lock_ttl_seconds": 45
      },
      "ledger_consistency": {
        "transaction_isolation": "PostgreSQL Serializable",
        "payout_provider": "Stripe Custom Accounts",
        "match_resolution": "real-time WebSocket state client"
      }
    }
  },
  {
    number: "03",
    year: "2023",
    name: "Savyour",
    category: "Fintech Cashback Platform",
    role: "Solutions Architect",
    description:
      "Contributed backend architecture across cashback calculation, partner integrations, wallet flows, payment disbursement, and AI shopping assistance for a large consumer marketplace.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Payment APIs"],
    metric: ["650+ brands", "Brand-partner ecosystem supported through integration architecture"],
    diagram: "savyour",
    challenge: "Processing thousands of affiliate rewards events concurrently while keeping financial wallet ledgers synchronized, idempotent, and highly consistent.",
    solution: "Developed decoupled ingestion queues with database-level ACID transactions and Redis caches to handle cashback event calculation in sub-second timelines.",
    blueprint: {
      orchestration: "FastAPI Async Services",
      data: "PostgreSQL Ledger / Transaction Isolation",
      infra: "Partner webhook channels / AWS"
    },
    schema: {
      "ledger_accounting": {
        "idempotency_key": "x-savyour-transaction-id",
        "isolation_level": "PostgreSQL Repeatable Read",
        "cache_invalidation": "Redis namespaces key pattern"
      },
      "webhook_ingestion": {
        "rate_limit": 2500,
        "security_verification": "HMAC-SHA256 signature verification"
      }
    }
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
    metric: ["100% paperless", "Paperless delivery path for enterprise document workflows"],
    diagram: "efu",
    challenge: "Migrating highly physical paper filing operations to paperless case routing for thousands of enterprise policy documents daily with strict compliance guidelines.",
    solution: "Implemented IBM FileNet Content Store with automated document ingestion and Case Manager routing pipelines, eliminating manual filing queues.",
    blueprint: {
      orchestration: "IBM Case Manager Workflows",
      data: "FileNet P8 Content Repository",
      infra: "On-Premise Server High Availability clusters"
    },
    schema: {
      "document_pipeline": {
        "ingestion": "IBM Datacap capture queues",
        "indexing_metadata": "IBM FileNet P8 Metadata schema",
        "access_control": "LDAP Active Directory synchronized ACLs"
      },
      "case_routing": {
        "workflow_engine": "IBM Process Engine PE engine",
        "failover": "Clustered active-active database replica"
      }
    }
  },
];

const projectTraces: Record<string, string[]> = {
  "Wellows": [
    "[INFO] Initializing multi-agent orchestration (KIVA + OPTA)...",
    "[TRACE] Ingestion pipeline: Fetching Perplexity citations & search signals",
    "[DEBUG] DB Search: Querying Vector similarity indexes...",
    "[RESOLVED] Vector database returns 88 items (confidence > 0.91)",
    "[TRACE] OPTA Node: Executing citation optimization via GPT-4o",
    "[MUTATION] Updating search visibility audit cache...",
    "[SUCCESS] Process completed in 1420ms. Gateways clear."
  ],
  "ClassFlow": [
    "[INFO] Received class lifecycle event trigger (User #408)...",
    "[LOCK] Redis Mutex: Setting lock on teacher_slot_892",
    "[TRACE] Matchmaker agent: Scoring candidates in UTC-5 timezone",
    "[MUTATION] Booking ledger: Writing class lifecycle matching data",
    "[PAYMENT] Stripe transfer: Initiating partner disbursement batch",
    "[SUCCESS] DB locks released. 0 manual operations triggered."
  ],
  "Savyour": [
    "[INFO] Cashback payload received from brand partner webhook...",
    "[TRACE] Database isolation: Starting Postgres ACID transaction",
    "[CACHE] Redis key invalidation: cash_ledger:user_991",
    "[TRACE] Cashback engine: Calculating reward event details (4.5% rate)",
    "[COMMIT] Financial ledger commit completed and confirmed",
    "[SUCCESS] Reward transaction logged. Cashback state synchronized."
  ],
  "EFU Life": [
    "[INFO] Scanning high-volume paperless case directory...",
    "[TRACE] Capture engine: FileNet metadata extraction in process",
    "[WORKFLOW] Case Manager: Routing claims document #10928 to agent",
    "[COMPLIANCE] Compliance rules: checking signature verification state",
    "[ARCHIVE] Content Store: metadata index written to P8 cluster",
    "[SUCCESS] Case route complete. compliance audit trail updated."
  ]
};

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState(0);
  const [telemetryLines, setTelemetryLines] = useState<string[]>([]);
  const [consoleView, setConsoleView] = useState<"log" | "schema">("log");
  const activeProject = projects[activeTab];
  const [animateIn, setAnimateIn] = useState(true);

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    setAnimateIn(false);
    setTimeout(() => {
      setActiveTab(index);
      setAnimateIn(true);
    }, 150);
  };

  // Telemetry loop hook: runs once, then enters an idle monitor standby
  useEffect(() => {
    const activeTraces = projectTraces[activeProject.name] || [];
    setTelemetryLines([activeTraces[0]]);

    let lineIndex = 1;
    const interval = setInterval(() => {
      if (lineIndex < activeTraces.length) {
        setTelemetryLines((prev) => [...prev, activeTraces[lineIndex]]);
        lineIndex++;
      } else {
        // Enters a clean standing idle check line, then shuts down interval loop
        setTelemetryLines((prev) => [
          ...prev,
          `[IDLE] Node listener active. Monitoring transactions...`
        ]);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className={styles.section} id="work" aria-labelledby="work-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span />
            Selected work
          </div>
          <h2 className={styles.title} id="work-title">
            Production proof, not portfolio filler.
          </h2>
          <p>
            Explore the active architectural blueprints and verified outcome telemetry of systems built to survive scale.
          </p>
        </header>

        {/* Dashboard Split Container */}
        <div className={styles.dashboardContainer}>
          
          {/* Left Navigation: Vertical tabs list */}
          <nav className={styles.tabsList} aria-label="Project architecture selector">
            {projects.map((proj, idx) => (
              <button
                key={proj.number}
                className={`${styles.tabBtn} ${idx === activeTab ? styles.tabActive : ""}`}
                onClick={() => handleTabChange(idx)}
                aria-selected={idx === activeTab}
                role="tab"
              >
                <div className={styles.tabHeader}>
                  <span>{proj.number}</span>
                  <em>{proj.year}</em>
                </div>
                <h3>{proj.name}</h3>
                <span className={styles.tabKicker}>{proj.category}</span>
                <div className={styles.tabBadge}>{proj.metric[0]}</div>
              </button>
            ))}
          </nav>

          {/* Right Panel: Spec Details */}
          <article className={`${styles.specPanel} ${animateIn ? styles.fadeIn : styles.fadeOut}`}>
            {/* Project Visual Display Header */}
            <div className={styles.specVisualBlock}>
              <ProjectVisual type={activeProject.diagram} variant="hero" />
            </div>

            {/* Sub-Layout Content Columns */}
            <div className={styles.specBody}>
              <div className={styles.specDetails}>
                <div className={styles.specRoleLine}>
                  <strong>{activeProject.role}</strong>
                  <span>&bull;</span>
                  <span>{activeProject.category}</span>
                </div>
                <p className={styles.specDesc}>{activeProject.description}</p>

                <div className={styles.blockRow}>
                  <div className={styles.block}>
                    <h4>The Scale Challenge</h4>
                    <p>{activeProject.challenge}</p>
                  </div>
                  <div className={styles.block}>
                    <h4>The Architectural Solution</h4>
                    <p>{activeProject.solution}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar Technical Blueprint */}
              <aside className={styles.specSidebar}>
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
              </aside>
            </div>

            {/* Bottom Full-Width Telemetry trace / JSON Schema Switcher */}
            <div className={styles.traceConsole}>
              <div className={styles.consoleTabHeader}>
                <h4>System Telemetry Console</h4>
                <div className={styles.consoleViewSelectors}>
                  <button 
                    className={`${styles.consoleSelBtn} ${consoleView === "log" ? styles.consoleSelActive : ""}`}
                    onClick={() => setConsoleView("log")}
                  >
                    [ Telemetry Stream ]
                  </button>
                  <button 
                    className={`${styles.consoleSelBtn} ${consoleView === "schema" ? styles.consoleSelActive : ""}`}
                    onClick={() => setConsoleView("schema")}
                  >
                    [ Parameter Schema ]
                  </button>
                </div>
              </div>

              <div className={styles.consoleBody}>
                <div className={styles.consoleHeader}>
                  <span className={styles.consoleDotRed} />
                  <span className={styles.consoleDotYellow} />
                  <span className={styles.consoleDotGreen} />
                  <span className={styles.consoleTitle}>
                    {consoleView === "log" ? "telemetry_stream.log" : "system_parameters.json"}
                  </span>
                </div>

                {consoleView === "log" ? (
                  <div className={styles.consoleLines}>
                    {telemetryLines.map((line, idx) => (
                      <div key={idx} className={styles.consoleLine}>
                        <span className={styles.consoleTimestamp}>[+{(idx * 1.0).toFixed(1)}s]</span>{" "}
                        <span className={styles.consoleText}>{line}</span>
                      </div>
                    ))}
                    {telemetryLines.length < (projectTraces[activeProject.name]?.length || 0) + 1 && (
                      <div className={styles.consoleCursor} />
                    )}
                  </div>
                ) : (
                  <div className={styles.consoleJson}>
                    <pre><code>{JSON.stringify(activeProject.schema, null, 2)}</code></pre>
                  </div>
                )}
              </div>
              <p className={styles.consoleDisclaimer}>
                *Simulated execution telemetry reflecting production system configurations and runtime paths.
              </p>
            </div>

            {/* Footer actions */}
            <footer className={styles.specFooter}>
              <span>NDA Protected System Architecture. Outcomes fully verified.</span>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                Discuss Similar Architecture &rarr;
              </a>
            </footer>
          </article>

        </div>
      </div>
    </section>
  );
}
