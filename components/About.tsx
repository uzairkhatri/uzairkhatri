"use client";

import Image from "next/image";
import styles from "./About.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { useTiltAndGlow } from "./useTiltAndGlow";

const workflow = [
  ["01", "Clarity Session", "We map the product goal, current system, constraints, and architecture risks before anyone starts building around assumptions."],
  ["02", "Architecture Blueprint", "I design the agents, APIs, queues, data stores, observability, and operational boundaries needed for production."],
  ["03", "Build or Guide", "I either build the critical path directly or work with your team as the architect reviewing decisions, code, and delivery tradeoffs."],
  ["04", "Production Handoff", "We harden the system for real users: monitoring, failure paths, performance, ownership, and scale-readiness."],
];

const principles = [
  {
    rule: "01",
    core: "The model is only 5% of a production AI system.",
    impact: "Vulnerabilities lie in state orchestration, rate-limiting, database lock-safety, and external integrations—not the LLM itself."
  },
  {
    rule: "02",
    core: "A demo without observability, retries, and cost control is not production.",
    impact: "Unmonitored agent prompts lead to silent token leakage, loop regression, and runaway API costs."
  },
  {
    rule: "03",
    core: "Agents need boundaries, state, and failure paths before they need more tools.",
    impact: "Adding external tools to unconstrained agent loops only compounds runtime errors and state mutation loss."
  },
  {
    rule: "04",
    core: "If the team cannot trace it at 2 AM, the architecture is not finished.",
    impact: "Multi-agent systems must export structured telemetry traces and transaction logs, not black-box console outputs."
  }
];

const stack = [
  "OpenAI",
  "Claude",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Python",
  "AWS",
  "Redis",
  "PostgreSQL",
  "Docker",
  "SQS",
];

function PrincipleCard({ item }: { item: typeof principles[0] }) {
  const tiltGlow = useTiltAndGlow({ maxTilt: 6, scale: 1.015 });
  return (
    <article
      ref={tiltGlow.ref}
      onMouseMove={tiltGlow.onMouseMove}
      onMouseLeave={tiltGlow.onMouseLeave}
      style={tiltGlow.style}
      className={`${styles.principleCard} reveal-item`}
    >
      <header className={styles.cardHeader}>
        <span className={styles.ruleBadge}>RULE {item.rule}</span>
        <span className={styles.glowDot} />
      </header>
      <blockquote>&ldquo;{item.core}&rdquo;</blockquote>
      <p className={styles.impactLine}>
        <span>Operational Impact:</span> {item.impact}
      </p>
    </article>
  );
}

export default function About() {
  return (
    <section id="about" className={`${styles.section} reveal-section`} aria-label="How Uzair Khatri thinks and works">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.principles}>
        <header className={styles.principlesHeader}>
          <div className="section-eyebrow"><span />How I think</div>
          <h3>Strong opinions on production AI. No hedging.</h3>
        </header>
        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <PrincipleCard key={item.rule} item={item} />
          ))}
        </div>
      </div>

      <div className={styles.workflow}>
        <header className={styles.workflowHeader}>
          <div className="section-eyebrow"><span />How I work</div>
          <h3>Clear decisions before expensive code.</h3>
          <p>
            My role is to reduce architecture risk early, then keep execution honest as the system
            moves toward production.
          </p>
        </header>

        <div className={styles.workflowContent}>
          <div className={styles.workflowGrid}>
            {workflow.map(([number, title, text]) => (
              <article className={`${styles.workflowStep} reveal-item`} key={title}>
                <span>{number}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className={`${styles.workflowVisual} reveal-item`}>
            <Image
              src={withBasePath("/img/profile/ai_system_architecture_3d.png")}
              alt="AI Systems 3D Schematic Diagram"
              width={600}
              height={600}
              priority
              style={{ objectFit: "contain", borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>





      <div className={styles.toolkitGrid}>
        {/* Left Column: Core Stack */}
        <div className={styles.toolkitBlock}>
          <header className={styles.toolkitBlockHeader}>
            <div className="section-eyebrow"><span />Technical Toolkit</div>
            <h3 className={styles.toolkitTitle}>Core Stack</h3>
            <p className={styles.toolkitDescription}>
              Production-hardened tools and frameworks I leverage to design, build, and orchestrate resilient AI systems.
            </p>
          </header>
          <div className={styles.chipGrid}>
            {stack.map((item) => (
              <span className={styles.chip} key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
