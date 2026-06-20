"use client";

import { useTiltAndGlow } from "./useTiltAndGlow";
import styles from "./Timeline.module.css";

const timelineData = [
  {
    year: "2025",
    role: "AI Systems Architect",
    focus: "Agentic Runtimes & Guardrails",
    description:
      "Orchestrates multi-agent systems (LangGraph), vector similarity indexes, and Bedrock failover structures. Hardens AI products to survive production traffic, LLM rate-limits, and token cost budgets.",
  },
  {
    year: "2023",
    role: "Engineering Lead",
    focus: "Backend Microservices & Distributed Queues",
    description:
      "Scaled payment payout platforms (Stripe Connect) and asynchronous task executors (Celery/Redis), shifting manual matching runs into lock-safe background worker queues.",
  },
  {
    year: "2021",
    role: "Solutions Architect",
    focus: "High-Availability Infrastructure",
    description:
      "Designed event-driven API gateways, Redis distributed locks (Redlock), and database transaction safety boundaries for concurrent corporate operations.",
  },
  {
    year: "2018",
    role: "Senior Laravel Engineer",
    focus: "Monolith Refactoring & Partner Integration",
    description:
      "Refactored complex commercial monolithic backends, optimizing affiliate ledgers, API caching, and Postgres transaction performance for brand ecosystems.",
  },
  {
    year: "2015",
    role: "PHP Full Stack Developer",
    focus: "Database Systems & Transaction Flows",
    description:
      "Built custom web applications, relational schemas, and payment flow integrations for early enterprise portals and commercial clients.",
  },
];

function TimelineCard({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const tiltGlow = useTiltAndGlow({ maxTilt: 5, scale: 1.01 });

  return (
    <div className={styles.timelineItem} key={item.year}>
      {/* Node pin indicator */}
      <div className={styles.timelineNode}>
        <div className={styles.nodeCircle}>
          <span className={styles.nodeYear}>{item.year}</span>
        </div>
        {index < timelineData.length - 1 && <div className={styles.nodeConnector} />}
      </div>

      {/* Card Content with tilt/glow */}
      <div
        ref={tiltGlow.ref}
        onMouseMove={tiltGlow.onMouseMove}
        onMouseLeave={tiltGlow.onMouseLeave}
        style={tiltGlow.style}
        className={styles.timelineCard}
      >
        <header className={styles.cardHeader}>
          <span className={styles.itemYearMobile}>{item.year}</span>
          <h3>{item.role}</h3>
          <span className={styles.itemFocus}>{item.focus}</span>
        </header>
        <p className={styles.itemDescription}>{item.description}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className={`${styles.section} reveal-section`} id="timeline" aria-label="Professional evolution timeline">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className="section-eyebrow">
            <span />
            Evolution Timeline
          </div>
          <h2>Architects sell thinking. Here is the track record.</h2>
          <p>
            A decade-long progression from writing early transaction models to building production-grade agentic AI mainframe infrastructures.
          </p>
        </header>

        <div className={styles.timelineContainer}>
          {/* Vertical spine line */}
          <div className={styles.timelineSpine} aria-hidden="true" />
          
          <div className={styles.timelineList}>
            {timelineData.map((item, idx) => (
              <TimelineCard key={item.year} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
