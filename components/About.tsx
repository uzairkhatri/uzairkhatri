"use client";

import styles from "./About.module.css";

const process = [
  ["01", "Pressure test", "Find what will break first: latency, cost, data quality, state, concurrency, or human ownership."],
  ["02", "Blueprint", "Define the agent runtime, backend contracts, retrieval path, queues, fallbacks, and observability model."],
  ["03", "Build", "Implement the critical path with the smallest reliable architecture that can survive real customer traffic."],
  ["04", "Handoff", "Leave the team with clear operating rules, monitoring, failure playbooks, and next architecture decisions."],
];

export default function About() {
  return (
    <section id="about" className={`${styles.section} reveal-section`} aria-labelledby="about-title">
      <div className={styles.shell}>
        <div className={styles.processPanel}>
          <div className={styles.processIntro}>
            <div className="section-eyebrow"><span />Execution Model</div>
            <h3 id="about-title">How decisions become code.</h3>
          </div>
          <div className={styles.processGrid}>
            {process.map(([number, title, body]) => (
              <article className={`${styles.processStep} reveal-item`} key={number}>
                <span>{number} / STAGE</span>
                <h4>{title}</h4>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Human Collaboration Statement */}
        <div className={`${styles.collaborationBanner} reveal-item`}>
          <div className={styles.collabHeader}>
            <span className={styles.collabDot} />
            <strong className={styles.collabTitle}>Embedded Engineering Partnership</strong>
          </div>
          <p className={styles.collabText}>
            I don&apos;t drop black-box code and vanish. I embed directly in pull requests alongside your lead engineers, establish resilient patterns, and leave your team with complete architectural ownership, observability dashboards, and clear operational runbooks.
          </p>
        </div>
      </div>
    </section>
  );
}
