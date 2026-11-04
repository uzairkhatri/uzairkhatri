"use client";

import { BOOKING_URL, CV_URL, withBasePath } from "./siteLinks";
import styles from "./DualPathways.module.css";

export default function DualPathways() {
  return (
    <section className={`${styles.section} reveal-section`} aria-label="Direct engagement pathways">
      <div className={styles.shell}>
        <div className={styles.grid}>
          {/* Pathway A: Recruiters & Hiring Managers */}
          <article className={`${styles.card} reveal-item`}>
            <div className={styles.cardHeader}>
              <span className={styles.tagBadge}>Hiring Teams &amp; Recruiters</span>
              <span className={styles.statusPill}>Available for Staff / Principal Roles</span>
            </div>

            <h2 className={styles.cardTitle}>
              Looking for a Principal AI Systems Architect or Staff Backend Engineer?
            </h2>

            <p className={styles.cardSummary}>
              14+ years designing distributed systems, high-concurrency backends, and production AI orchestration. Available for senior full-time roles, contracts, and engineering leadership.
            </p>

            <div className={styles.funnelSteps} aria-label="Recruiter conversion path">
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>01</span>
                <div>
                  <strong>Experience</strong>
                  <span>14+ years across distributed microservices, AWS, Python, Java, and LangGraph</span>
                </div>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>02</span>
                <div>
                  <strong>Resume &amp; CV</strong>
                  <span>Complete career background, verified impact metrics, and technology history</span>
                </div>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNum}>03</span>
                <div>
                  <strong>Architecture Proof</strong>
                  <span>Deep-dive case studies across fintech, edtech, and production multi-agent systems</span>
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <a href={CV_URL} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
                Download CV (PDF) &rarr;
              </a>
              <a href={withBasePath("/case-studies/")} className={styles.secondaryBtn}>
                View Case Studies
              </a>
              <a href="mailto:hello@uzairkhatri.com" className={styles.textLink}>
                hello@uzairkhatri.com
              </a>
            </div>
          </article>

          {/* Pathway B: Founders, CTOs & Engineering Teams */}
          <article className={`${styles.card} ${styles.cardFeatured} reveal-item`}>
            <div className={styles.cardHeader}>
              <span className={styles.tagBadgeGold}>Founders, CTOs &amp; Product Teams</span>
              <span className={styles.statusPillGold}>Fixed-Scope &amp; Advisory</span>
            </div>

            <h2 className={styles.cardTitle}>
              Moving AI Beyond the Prototype without Silent Production Failures?
            </h2>

            <p className={styles.cardSummary}>
              Diagnose hallucination vectors, unblock database pools under streaming LLMs, cut token waste with prompt caching, and harden multi-agent state before enterprise scale.
            </p>

            <div className={styles.funnelSteps} aria-label="Founder conversion path">
              <div className={styles.stepItem}>
                <span className={styles.stepNumGold}>01</span>
                <div>
                  <strong>Triage Risk</strong>
                  <span>Identify database pool starvation, unmapped loops, and runaway token costs</span>
                </div>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumGold}>02</span>
                <div>
                  <strong>Pre-Mortem Review</strong>
                  <span>$250 fixed-scope review delivering a 3–5 page Risk Priority Matrix (P0/P1/P2)</span>
                </div>
              </div>
              <div className={styles.stepItem}>
                <span className={styles.stepNumGold}>03</span>
                <div>
                  <strong>Consultation &amp; Action</strong>
                  <span>Free 30-min verbal triage or 30-min walkthrough with concrete remediation patterns</span>
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <a href={withBasePath("/audit/")} className={styles.primaryBtnGold}>
                Explore Architecture Review ($0–$250) &rarr;
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
                Book 30-Min Call
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

