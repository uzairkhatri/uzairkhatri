"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Diagnostics.module.css";
import { BOOKING_URL } from "./siteLinks";
import gsap from "gsap";

type Question = {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    points: number;
  }[];
};

const questions: Question[] = [
  {
    id: "scale",
    title: "What is your target or current monthly AI request volume?",
    subtitle: "Scale alters concurrency boundaries, lock-safety, and cost limits.",
    options: [
      { label: "Under 10k requests/mo", description: "Low scale prototype or internal demo.", value: "under-10k", points: 5 },
      { label: "10k - 100k requests/mo", description: "Early commercial product with active users.", value: "10k-100k", points: 12 },
      { label: "100k - 1M requests/mo", description: "Production scale with concurrency pressure.", value: "100k-1m", points: 20 },
      { label: "1M+ requests/mo", description: "Enterprise grade, high concurrency systems.", value: "1m-plus", points: 25 },
    ],
  },
  {
    id: "orchestration",
    title: "How are you orchestrating model prompts and agent tasks?",
    subtitle: "Complex runtimes create state leakage, loops, and latency compounders.",
    options: [
      { label: "No framework (Single Prompts)", description: "Simple script calls or standard REST API endpoints.", value: "none", points: 8 },
      { label: "LangChain / LangGraph", description: "Multi-agent systems using state graphs.", value: "langgraph", points: 16 },
      { label: "AutoGen / CrewAI", description: "Highly autonomous, conversational agent teams.", value: "crewai", points: 22 },
      { label: "Custom State Machine / Queues", description: "In-house deterministic backend event queues.", value: "custom", points: 6 },
    ],
  },
  {
    id: "resilience",
    title: "What happens when an LLM provider rate-limits or fails?",
    subtitle: "Failure handling dictates uptime. 80% of systems crash on provider timeouts.",
    options: [
      { label: "Direct crash / Error response", description: "Exceptions bubble up directly to the frontend client.", value: "crash", points: 25 },
      { label: "Try-catch with simple retries", description: "Standard retries that can lock database handles or block threads.", value: "try-catch", points: 18 },
      { label: "Decoupled message queues (SQS/Celery)", description: "Asynchronous task queue with backoffs and DLQs.", value: "queue", points: 5 },
      { label: "Multi-model fallback logic", description: "Redundant routing to alternative models (e.g., Anthropic/Ollama).", value: "fallback", points: 2 },
    ],
  },
  {
    id: "observability",
    title: "How do you track latency, token leaks, and prompt drift?",
    subtitle: "Without tracing, debugging production errors becomes guesswork.",
    options: [
      { label: "Stdout Console / Local Logs", description: "No structured telemetry. We search raw logs when complaints arise.", value: "console", points: 25 },
      { label: "Basic SaaS Tracers", description: "Using LangSmith, LangFuse, or equivalent third-party trackers.", value: "saas", points: 12 },
      { label: "OpenTelemetry + Datadog/Grafana", description: "Custom spans sent to operational dashboards.", value: "otel", points: 4 },
      { label: "Full Trace Context Database", description: "Granular logging tied to transaction IDs and user IDs.", value: "full", points: 2 },
    ],
  },
];

export default function Diagnostics() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  const handleSelect = (questionId: string, optionValue: string) => {
    setSelections((prev) => ({ ...prev, [questionId]: optionValue }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      startAudit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const startAudit = () => {
    setIsAuditing(true);
    setAuditLogs([]);

    const logMessages = [
      "[SYSTEM] Initializing AI Production-Readiness Diagnostic...",
      `[CONFIG] Scale parameter parsed: ${selections["scale"] || "unknown"} requests.`,
      `[CONFIG] Orchestration layout identified: ${selections["orchestration"] || "none"}.`,
      "[INFO] Scanning system thread concurrency buffers...",
      `[TRACE] Testing failure recovery: evaluating ${selections["resilience"] || "unprotected"} paths.`,
      "[WARN] Checking API fallback response times under load...",
      `[TRACE] Analyzing trace database observability: ${selections["observability"] || "console"} tracer detected.`,
      "[DEBUG] Simulating cascade rate-limiting event (HTTP 429)...",
      "[INFO] Evaluating data consistency & lock-safety locks...",
      "[SUCCESS] Diagnostics compiled. Scoring model parameters...",
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logMessages.length) {
        setAuditLogs((prev) => [...prev, logMessages[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAuditing(false);
          setShowReport(true);
        }, 600);
      }
    }, 280);
  };

  // Scroll terminal to bottom on new log
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [auditLogs]);

  // Compute stats and recommendations
  const getResults = () => {
    let score = 0;
    questions.forEach((q) => {
      const selectedOption = q.options.find((o) => o.value === selections[q.id]);
      if (selectedOption) score += selectedOption.points;
    });

    // Max potential points = 97
    const riskPercent = Math.min(Math.round((score / 97) * 100), 100);

    let riskLevel = "Low";
    let riskColor = "var(--accent-green)";
    if (riskPercent > 40) {
      riskLevel = "Medium";
      riskColor = "#e6af2e";
    }
    if (riskPercent > 70) {
      riskLevel = "High";
      riskColor = "#e63946";
    }

    const vulnerabilities: { title: string; desc: string }[] = [];

    // Rule 1: High Scale & Bad Resilience
    if (
      (selections["scale"] === "100k-1m" || selections["scale"] === "1m-plus") &&
      (selections["resilience"] === "crash" || selections["resilience"] === "try-catch")
    ) {
      vulnerabilities.push({
        title: "Cascade Rate-Limiting Crash",
        desc: "Without rate-limiting queues, high request concurrency causes provider HTTP 429 blocks to choke main process threads, locking up user sessions and crashing client gateways.",
      });
    }

    // Rule 2: Dynamic frameworks
    if (selections["orchestration"] === "crewai" || selections["orchestration"] === "langgraph") {
      vulnerabilities.push({
        title: "Dynamic Infinite Agent Loops",
        desc: "Autonomous conversational agents lack strict loop termination boundaries. If prompt constraints fail or outputs drift, agents cycle indefinitely, draining model token budgets in minutes.",
      });
    }

    // Rule 3: Console logging
    if (selections["observability"] === "console") {
      vulnerabilities.push({
        title: "Blind Troubleshooting (Hallucinations)",
        desc: "Standard console logs isolate event outputs without prompt/response tracing context. Debugging semantic logic failures, prompt drift, or cost leaks in production becomes blind work.",
      });
    }

    // Rule 4: No Resilience at scale
    if (selections["resilience"] === "crash") {
      vulnerabilities.push({
        title: "API Outage Vulnerability",
        desc: "LLM providers fail. Direct propagation of provider errors forces frontend crashes. Implementing model redundancy (e.g. Claude fallback) is required for production viability.",
      });
    }

    // Default vulnerabilities if list is short
    if (vulnerabilities.length < 3) {
      vulnerabilities.push({
        title: "Model Cost Bleeding",
        desc: "Without token-quota limits and local semantic caching, redundant agent queries query the model repeatedly, generating thousands of dollars in unnecessary API bills.",
      });
    }
    if (vulnerabilities.length < 3) {
      vulnerabilities.push({
        title: "State Consistency Risk",
        desc: "Agent loops and multi-step reasoning models lack transactional consistency boundaries. A single failed step leaves client database state half-mutated.",
      });
    }

    return {
      riskPercent,
      riskLevel,
      riskColor,
      vulnerabilities: vulnerabilities.slice(0, 3),
    };
  };

  const handleCopySummary = () => {
    const { riskPercent, riskLevel, vulnerabilities } = getResults();
    const formattedText = `Uzair Khatri Portfolio AI Risk Report
--------------------------------------
Calculated Risk Level: ${riskLevel} (${riskPercent}%)

Architecture Inputs:
- Scale: ${questions[0].options.find((o) => o.value === selections["scale"])?.label || "None"}
- Orchestration: ${questions[1].options.find((o) => o.value === selections["orchestration"])?.label || "None"}
- Resilience: ${questions[2].options.find((o) => o.value === selections["resilience"])?.label || "None"}
- Observability: ${questions[3].options.find((o) => o.value === selections["observability"])?.label || "None"}

Identified Vulnerabilities:
${vulnerabilities.map((v, i) => `${i + 1}. ${v.title}: ${v.desc}`).join("\n")}

Please review this with me during our architecture session.`;

    navigator.clipboard.writeText(formattedText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const resetCalculator = () => {
    setCurrentStep(0);
    setSelections({});
    setShowReport(false);
    setAuditLogs([]);
  };

  const currentQuestion = questions[currentStep];
  const isNextDisabled = !selections[currentQuestion.id];

  return (
    <section className={styles.section} id="diagnose" aria-labelledby="diagnose-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className="section-eyebrow">
            <span />
            Reliability Calculator
          </div>
          <h2 id="diagnose-title">AI System Production-Readiness Profiler</h2>
          <p>
            Answer 4 rapid technical questions to diagnose model fail-safes, vector scale locks,
            and cost vulnerabilities. Get a structured scorecard instantly.
          </p>
        </header>

        <div className={styles.stage} ref={containerRef}>
          {!isAuditing && !showReport && (
            <div className={styles.quiz}>
              {/* Stepper Header */}
              <div className={styles.stepper}>
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`${styles.stepIndicator} ${
                      idx === currentStep
                        ? styles.stepActive
                        : idx < currentStep
                        ? styles.stepCompleted
                        : ""
                    }`}
                  >
                    <span>0{idx + 1}</span>
                  </div>
                ))}
              </div>

              {/* Question Area */}
              <div className={styles.questionArea}>
                <h3>{currentQuestion.title}</h3>
                <p>{currentQuestion.subtitle}</p>

                <div className={styles.optionsGrid}>
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`${styles.optionCard} ${
                        selections[currentQuestion.id] === opt.value ? styles.optionSelected : ""
                      }`}
                      onClick={() => handleSelect(currentQuestion.id, opt.value)}
                    >
                      <div className={styles.optionRadio} />
                      <div className={styles.optionText}>
                        <strong>{opt.label}</strong>
                        <span>{opt.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className={styles.navRow}>
                <button
                  className={styles.backBtn}
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  &larr; Back
                </button>
                <button
                  className={styles.nextBtn}
                  onClick={handleNext}
                  disabled={isNextDisabled}
                >
                  {currentStep === questions.length - 1 ? "Analyze Infrastructure &rarr;" : "Next Question &rarr;"}
                </button>
              </div>
            </div>
          )}

          {/* Terminal Auditing Simulation */}
          {isAuditing && (
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
                <span className={styles.terminalTitle}>uzairkhatri-diagnostics.sh</span>
              </div>
              <div className={styles.terminalBody} ref={logTerminalRef}>
                {auditLogs.map((log, index) => (
                  <div key={index} className={styles.logLine}>
                    {log}
                  </div>
                ))}
                <div className={styles.cursor} />
              </div>
            </div>
          )}

          {/* Result Scorecard Report */}
          {showReport && (
            <div className={styles.report}>
              <div className={styles.reportGrid}>
                {/* Score Panel */}
                <div className={styles.scorePanel}>
                  <h3>Diagnostics Scorecard</h3>
                  <div className={styles.scoreRingStage}>
                    <svg viewBox="0 0 120 120" className={styles.scoreRing}>
                      <circle cx="60" cy="60" r="50" className={styles.ringBg} />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className={styles.ringVal}
                        style={{
                          strokeDashoffset: 314 - (314 * getResults().riskPercent) / 100,
                          stroke: getResults().riskColor,
                        }}
                      />
                    </svg>
                    <div className={styles.scoreText}>
                      <strong>{getResults().riskPercent}%</strong>
                      <span>RISK SCORE</span>
                    </div>
                  </div>
                  <div className={styles.riskBadge} style={{ color: getResults().riskColor }}>
                    <span>CLASSIFICATION:</span> <strong>{getResults().riskLevel} Risk</strong>
                  </div>
                  <p className={styles.scoreSummaryText}>
                    This system configuration has critical structural bottlenecks. These risks directly impact cost predictability, operational reliability, and API latency under concurrent customer traffic.
                  </p>
                </div>

                {/* Recommendations Panel */}
                <div className={styles.detailsPanel}>
                  <h3>Top 3 System Vulnerabilities</h3>
                  <div className={styles.vulnerabilities}>
                    {getResults().vulnerabilities.map((vuln, idx) => (
                      <article key={vuln.title} className={styles.vulnCard}>
                        <span>0{idx + 1}</span>
                        <div>
                          <h4>{vuln.title}</h4>
                          <p>{vuln.desc}</p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className={styles.reportCtaRow}>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.bookReviewCta}
                    >
                      Book 30-Min Vulnerability Review &rarr;
                    </a>
                    <button
                      className={styles.copyReportBtn}
                      onClick={handleCopySummary}
                    >
                      {isCopied ? "✓ Summary Copied!" : "📋 Copy Diagnostics Summary"}
                    </button>
                  </div>
                  <p className={styles.bookingMicro}>
                    Copies findings to clipboard. Paste in Calendly to review this exact architecture report live with Uzair.
                  </p>
                  <button className={styles.resetBtn} onClick={resetCalculator}>
                    &larr; Run Diagnostics Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
