"use client";

import { useState } from "react";
import { useTiltAndGlow } from "./useTiltAndGlow";
import styles from "./Timeline.module.css";

const timelineData = [
  {
    year: "2024",
    role: "Solutions Architect",
    focus: "Production AI Content Platform",
    description:
      "Owned the architecture behind 10K+ generated articles a month across generation, review, and publishing services. Ran OpenAI and Claude in production, built the Qdrant retrieval layer that grounds every output, and cut API latency from 800ms to 120ms.",
  },
  {
    year: "2023",
    role: "Solutions Architect",
    focus: "Fintech Platform Architecture",
    description:
      "Led backend architecture for a cashback platform with 1M+ customers and 5,000+ daily transactions. Split the monolith into 12 domain services, dropping average feature delivery from 3 weeks to 5 days, and designed settlement flows across 100+ partner integrations.",
  },
  {
    year: "2021",
    role: "Associate Architect",
    focus: "Search Services & Regulated Workflows",
    description:
      "Owned search and user-interaction services for a 1M+ customer platform, lifting search-driven engagement 10% through ranking changes, Redis caching, and query-path tuning. Concurrently built Java Spring Boot services and automated 5 IBM FileNet approval workflows for EFU Life and TPL Life.",
  },
  {
    year: "2017",
    role: "Senior Engineer to Lead Engineer",
    focus: "Backend APIs & Team Leadership",
    description:
      "Promoted from senior to lead while owning backend APIs for a core consumer platform. Built Laravel and PHP services behind user actions and merchant integrations, and led and mentored 10 engineers through code review, design discussion, and delivery planning.",
  },
  {
    year: "2012",
    role: "Senior Software Developer to Web Developer",
    focus: "Hhelios Consultants, Axact, Social Hubris",
    description:
      "Delivered 100+ web applications, CMS integrations, REST APIs, and backend services for enterprise and international clients.",
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
            A 14-year progression from client web applications to production AI platforms and high-volume fintech backends.
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
                <>View Earlier Roles (2012&ndash;2017) &darr;</>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
