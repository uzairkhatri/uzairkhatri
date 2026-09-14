"use client";

import { useState } from "react";
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
    role: "Senior Backend Systems Engineer",
    focus: "Monolith Refactoring & Partner Integration",
    description:
      "Refactored complex commercial monolithic backends, optimizing affiliate ledgers, API caching, and Postgres transaction performance for brand ecosystems.",
  },
  {
    year: "2015",
    role: "Backend Systems Engineer",
    focus: "Relational Schemas & Transaction Flows",
    description:
      "Engineered early transactional database schemas, custom backend architectures, and automated payment integrations for high-availability enterprise web portals.",
  },
];

function TimelineCard({ item, index, isLast }: { item: typeof timelineData[0]; index: number; isLast: boolean }) {
  const tiltGlow = useTiltAndGlow({ maxTilt: 5, scale: 1.01 });

  return (
    <div className={styles.timelineItem} key={item.year}>
      {/* Node pin indicator */}
      <div className={styles.timelineNode}>
        <div className={styles.nodeCircle}>
          <span className={styles.nodeYear}>{item.year}</span>
        </div>
        {!isLast && <div className={styles.nodeConnector} />}
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
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? timelineData : timelineData.slice(0, 3);

  return (
    <section className={`${styles.section} reveal-section`} id="timeline" aria-label="Professional evolution timeline">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className="section-eyebrow">
            <span />
            Track Record
          </div>
          <h2>Selected Experience</h2>
          <p>
            A 14-year engineering progression from transactional database architectures to scalable, enterprise multi-agent runtimes.
          </p>
        </header>

        <div className={styles.timelineContainer}>
          {/* Vertical spine line */}
          <div className={styles.timelineSpine} aria-hidden="true" />
          
          <div className={styles.timelineList}>
            {displayedItems.map((item, idx) => (
              <TimelineCard 
                key={item.year} 
                item={item} 
                index={idx} 
                isLast={idx === displayedItems.length - 1} 
              />
            ))}
          </div>

          <div className={styles.expandContainer}>
            <button
              onClick={() => setShowAll(!showAll)}
              className={styles.expandBtn}
              aria-expanded={showAll}
            >
              {showAll ? (
                <>Collapse Earlier History &uarr;</>
              ) : (
                <>View Full 14-Year Timeline (2015&ndash;2020) &darr;</>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
