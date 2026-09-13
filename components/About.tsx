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
          <div className="section-eyebrow"><span />Philosophy &amp; Practice</div>
          <h2 id="about-title">What I believe about AI systems.</h2>
          <p>
            I work alongside founders and engineering teams who have a promising AI idea,
            turning fragile prototypes into dependable, traceable, and operable production assets.
          </p>
        </header>

        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <article className={`${styles.principleCard} reveal-item`} key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        {/* Human Collaboration Statement */}
        <div className={`${styles.collaborationBanner} reveal-item`}>
          <div className={styles.collabHeader}>
            <span className={styles.collabDot} />
            <strong className={styles.collabTitle}>How I work with engineering teams</strong>
          </div>
          <p className={styles.collabText}>
            I don&apos;t drop black-box code and vanish. I embed alongside your lead engineers, establish resilient patterns directly in pull requests, and leave your team with full architectural ownership, observability dashboards, and clear operational runbooks.
          </p>
        </div>

        <div className={styles.processPanel}>
          <div className={styles.processIntro}>
            <div className="section-eyebrow"><span />How I work</div>
            <h3>Decisions before expensive code.</h3>
          </div>
          <div className={styles.processGrid}>
            {process.map(([number, title, body]) => (
              <article className={`${styles.processStep} reveal-item`} key={number}>
                <span>{number}</span>
                <h4>{title}</h4>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
