import styles from "./CaseStudyAuditCTA.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

interface CaseStudyAuditCTAProps {
  title?: string;
  description?: string;
  focusArea?: string;
}

export default function CaseStudyAuditCTA({
  title = "Building a similar production AI or high-throughput system?",
  description = "Avoid fragile prototypes, concurrency deadlocks, and runaway token bills. Request a focused $250 Architecture Pre-Mortem, or book a free 30-minute engineer-to-engineer strategy call.",
  focusArea = "Production AI & Architecture Triage",
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
          href={withBasePath("/audit/")}
          className={styles.primaryBtn}
          data-source="case_study_audit"
        >
          <span>Request Architecture Pre-Mortem ($250)</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.secondaryBtn}
          data-source="case_study_booking"
        >
          <span>Book 30-Min Discovery Call (Free)</span>
        </a>
      </div>

      <div className={styles.trustList}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🔒</span>
          <span>100% Confidential (Mutual NDA on request)</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>⚡</span>
          <span>48-Hour Turnaround (Post-Scope Acceptance)</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🛠️</span>
          <span>Zero Sales Fluff &bull; Concrete Engineering</span>
        </div>
      </div>
    </section>
  );
}
