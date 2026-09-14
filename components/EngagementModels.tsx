"use client";

import styles from "./EngagementModels.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { trackBookingClick } from "./analytics";

interface EngagementTier {
  tag: string;
  duration: string;
  badge?: string;
  title: string;
  bestFor: string;
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  isPrimary?: boolean;
}

const tiers: EngagementTier[] = [
  {
    tag: "01 / Rapid Assessment",
    duration: "1 – 2 Weeks",
    title: "Production Readiness & Architecture Audit",
    bestFor: "Teams with an existing prototype or live AI feature experiencing latency spikes, hallucination risks, unmapped state loops, or runaway token costs.",
    deliverables: [
      "Codebase & agent runtime vulnerability review",
      "Concurrency, rate-limit, and failure isolation analysis",
      "Cost modeling and token economics optimization",
      "Concrete Architecture RFC & remediation blueprint"
    ],
    ctaText: "Request Architecture Audit",
    ctaHref: BOOKING_URL,
    isPrimary: false
  },
  {
    tag: "02 / Flagship Build",
    duration: "4 – 8 Weeks",
    badge: "Most Requested",
    title: "Prototype-to-Production System Build",
    bestFor: "Founders and product teams ready to turn a promising demo into an enterprise-grade, resilient product that survives real customer load.",
    deliverables: [
      "Multi-agent state graph architecture (LangGraph / State Machines)",
      "Hybrid vector retrieval (RAG) & deterministic schema guardrails",
      "Queue buffering (Redis / Celery / SQS) & distributed locks",
      "Full observability instrumentation (LangSmith) & team handoff"
    ],
    ctaText: "Discuss a System Build",
    ctaHref: BOOKING_URL,
    isPrimary: true
  },
  {
    tag: "03 / Ongoing Direction",
    duration: "Monthly Retainer",
    title: "Fractional AI Systems Architect",
    bestFor: "Growing engineering teams needing senior architectural judgment, code review oversight, and systems strategy without full-time executive overhead.",
    deliverables: [
      "Weekly architecture strategy & sprint design reviews",
      "Hands-on PR reviews & boundary enforcement with lead engineers",
      "Multi-model failover & cloud infrastructure guidance (AWS / Edge)",
      "Executive advisory for technical roadmap and team hiring"
    ],
    ctaText: "Inquire for Advisory",
    ctaHref: withBasePath("/#contact"),
    isPrimary: false
  }
];

export default function EngagementModels() {
  return (
    <section className={`${styles.section} reveal-section`} id="services" aria-labelledby="engagement-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className="section-eyebrow">
            <span />
            Engagement Models
          </div>
          <h2 id="engagement-title">How we can work together.</h2>
          <p>
            Clear, high-leverage structures designed to unblock your product quickly—whether you need a rapid diagnostic, a complete production build, or ongoing architectural leadership.
          </p>
        </header>

        <div className={styles.grid}>
          {tiers.map((tier) => (
            <article 
              key={tier.title} 
              className={`${styles.card} ${tier.isPrimary ? styles.cardFeatured : ""} reveal-item`}
            >
              {tier.badge && <span className={styles.featuredBadge}>{tier.badge}</span>}
              
              <div className={styles.cardTop}>
                <span className={styles.cardTag}>{tier.tag}</span>
                <span className={styles.durationPill}>{tier.duration}</span>
              </div>

              <h3 className={styles.cardTitle}>{tier.title}</h3>
              <p className={styles.bestFor}>
                <strong>Best for:</strong> {tier.bestFor}
              </p>

              <div className={styles.deliverables}>
                <span className={styles.deliverablesLabel}>Key Deliverables</span>
                <ul className={styles.deliverablesList}>
                  {tier.deliverables.map((item) => (
                    <li key={item}>
                      <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardAction}>
                <a
                  href={tier.ctaHref}
                  target={tier.ctaHref.includes("calendly") ? "_blank" : undefined}
                  rel={tier.ctaHref.includes("calendly") ? "noreferrer" : undefined}
                  className={`${styles.ctaBtn} ${tier.isPrimary ? styles.ctaPrimary : styles.ctaSecondary}`}
                  onClick={() => trackBookingClick(`engagement_${tier.tag.toLowerCase().replace(/[^a-z0-9]/g, "_")}`)}
                >
                  {tier.ctaText} &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.bottomNote}>
          <svg className={styles.infoIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>
            Every engagement begins with a complimentary 30-minute Architecture Strategy Call to evaluate scope, system feasibility, and mutual fit. <a href={BOOKING_URL} target="_blank" rel="noreferrer" onClick={() => trackBookingClick("engagement_bottom_note")}>Schedule a call directly &rarr;</a>
          </p>
        </div>
      </div>
    </section>
  );
}
