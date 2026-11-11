import styles from "./CaseStudyAuditCTA.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

interface CaseStudyAuditCTAProps {
  title?: string;
  description?: string;
  focusArea?: string;
}

export default function CaseStudyAuditCTA({
  title = "Building a similar production AI or high-throughput system?",
  description = "Start with a free 30-minute discovery call, or request a fixed-scope $250 Production Architecture Pre-Mortem covering one agreed technical problem (3–5 pages of findings, recommended approaches, and a 30-minute walkthrough).",
  focusArea = "Production AI & Architecture Review",
}: CaseStudyAuditCTAProps) {
  return (
    <section className={styles.ctaContainer} aria-label="Architecture Review & Pre-Mortem">
      <div className={styles.glowOrb} aria-hidden="true" />
      
      <div className={styles.header}>
        <div className={styles.kicker}>
          <span className={styles.pulseDot} aria-hidden="true" />
          <span>{focusArea}</span>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>
      </div>

      <div className={styles.actions}>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.primaryBtn}
          data-source="case_study_booking"
        >
          <span>Book 30-Min Discovery Call (Free)</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href={withBasePath("/audit/")}
          className={styles.secondaryBtn}
          data-source="case_study_audit"
        >
          <span>Explore $250 Architecture Pre-Mortem</span>
        </a>
      </div>

      <div className={styles.trustList}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🔒</span>
          <span>Confidential Review (No Repo Access Required)</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>⚡</span>
          <span>48-Hr Turnaround (After Scope &amp; Materials)</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🛠️</span>
          <span>3–5 Pages of Findings &bull; 30-Min Walkthrough</span>
        </div>
      </div>
    </section>
  );
}
