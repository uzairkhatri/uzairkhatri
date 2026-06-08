"use client";

import { useEffect, useState } from "react";
import styles from "./SystemSpecModal.module.css";

export type ProjectSpec = {
  name: string;
  category: string;
  role: string;
  year: string;
  description: string;
  metric: [string, string];
  stack: string[];
  challenge: string;
  solution: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
};

type SystemSpecModalProps = {
  project: ProjectSpec | null;
  onClose: () => void;
};

export default function SystemSpecModal({ project, onClose }: SystemSpecModalProps) {
  const [telemetryLines, setTelemetryLines] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project) {
      setTelemetryLines([]);
      return;
    }

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

    const activeTraces = projectTraces[project.name] || [
      "[INFO] Connecting to system nodes...",
      "[TRACE] Running transaction integrity checks...",
      "[SUCCESS] Environment healthy. Standing by."
    ];

    setTelemetryLines([activeTraces[0]]);

    let lineIndex = 1;
    const interval = setInterval(() => {
      setTelemetryLines((prev) => {
        if (lineIndex >= activeTraces.length) {
          lineIndex = 0;
          return [activeTraces[0]];
        }
        const nextLines = [...prev, activeTraces[lineIndex]];
        lineIndex++;
        return nextLines;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [project]);

  if (!project) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.tag}>{project.role}</span>
            <span className={styles.tag}>{project.category}</span>
            <span className={styles.tag}>{project.year}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.titleArea}>
            <h2 id="modal-title" className={styles.title}>{project.name}</h2>
            <p className={styles.desc}>{project.description}</p>
          </div>

          <div className={styles.contentGrid}>
            <section className={styles.leftCol}>
              <div className={styles.block}>
                <h3>The Scale Challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div className={styles.block}>
                <h3>The Architectural Solution</h3>
                <p>{project.solution}</p>
              </div>
              
              <div className={styles.traceConsole}>
                <h3>Live Execution Trace Simulator</h3>
                <div className={styles.consoleBody}>
                  <div className={styles.consoleHeader}>
                    <span className={styles.consoleDotRed} />
                    <span className={styles.consoleDotYellow} />
                    <span className={styles.consoleDotGreen} />
                    <span className={styles.consoleTitle}>telemetry_stream.log</span>
                  </div>
                  <div className={styles.consoleLines}>
                    {telemetryLines.map((line, idx) => (
                      <div key={idx} className={styles.consoleLine}>
                        <span className={styles.consoleTimestamp}>[+{idx * 1.2}s]</span>{" "}
                        <span className={styles.consoleText}>{line}</span>
                      </div>
                    ))}
                    <div className={styles.consoleCursor} />
                  </div>
                </div>
              </div>
            </section>

            <aside className={styles.rightCol}>
              <div className={styles.blueprintPanel}>
                <h3>System Blueprint</h3>
                <div className={styles.blueprintRow}>
                  <strong>Orchestration:</strong>
                  <span>{project.blueprint.orchestration}</span>
                </div>
                <div className={styles.blueprintRow}>
                  <strong>Data & Ingestion:</strong>
                  <span>{project.blueprint.data}</span>
                </div>
                <div className={styles.blueprintRow}>
                  <strong>Infrastructure:</strong>
                  <span>{project.blueprint.infra}</span>
                </div>
              </div>

              <div className={styles.metricPanel}>
                <h3>Impact Metric</h3>
                <strong>{project.metric[0]}</strong>
                <span>{project.metric[1]}</span>
              </div>

              <div className={styles.stackPanel}>
                <h3>Core Stack</h3>
                <div className={styles.tags}>
                  {project.stack.map((t) => (
                    <span key={t} className={styles.stackTag}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>NDA Protected System Architecture Spec. Verified Outcome.</span>
          <a href="#contact" onClick={onClose}>Discuss Similar Architecture -&gt;</a>
        </footer>
      </div>
    </div>
  );
}
