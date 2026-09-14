"use client";

import styles from "./About.module.css";

const principles = [
  {
    number: "01",
    title: "The model is not the product.",
    body: "Most AI products fail in routing, state, retries, queues, observability, cost controls, and handoff. I design those layers before the demo becomes a liability."
  },
  {
    number: "02",
    title: "Agents need boundaries.",
    body: "A useful agent has a job, a memory contract, a tool policy, a failure path, and a clear exit. Without that, it is just a prompt loop with better branding."
  },
  {
    number: "03",
    title: "Production should be traceable.",
    body: "If a team cannot explain what the system did, why it did it, what it cost, and where it failed, the architecture is not finished."
  }
];

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
        <header className={styles.header}>
          <div>
            <div className="section-eyebrow"><span />Philosophy &amp; Practice</div>
            <h2 id="about-title">Engineering Principles</h2>
          </div>
          <p>
            Most AI products fail in state boundaries, retries, concurrency, and observability.
            I design the architectural guardrails before writing expensive code, so prototypes survive real production traffic.
          </p>
        </header>

        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <article className={`${styles.principleCard} reveal-item`} key={item.number}>
              <span>{item.number} / INVARIANT</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        {/* Unified 4-step execution model */}
        <div className={styles.processPanel}>
          <div className={styles.processIntro}>
            <div className="section-eyebrow"><span />Execution Model</div>
            <h3>How decisions become code.</h3>
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
