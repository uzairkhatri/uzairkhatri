import styles from "./SubPageNav.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "./siteLinks";

function BackIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1.1rem" }}>
      <path d="M11 4 6 9l5 5" />
    </svg>
  );
}

interface SubPageNavProps {
  /** Where the back link points. Defaults to the homepage. */
  backHref?: string;
  /** Label for the back link. Defaults to the site name. */
  backLabel?: string;
}

export default function SubPageNav({
  backHref = withBasePath("/"),
  backLabel = "Uzair Khatri",
}: SubPageNavProps) {
  return (
    <nav className={styles.topNav} aria-label="Section navigation">
      <a href={backHref} className={styles.back}>
        <BackIcon />
        {backLabel}
      </a>
      <div className={styles.topNavRight}>
        <a href={withBasePath("/#work")} className={`${styles.topNavLink} ${styles.hideOnMobile}`}>
          Work
        </a>
        <a href={withBasePath("/services/ai-systems/")} className={styles.topNavLink}>
          Services
        </a>
        <a href={withBasePath("/case-studies/")} className={styles.topNavLink}>
          Case Studies
        </a>
        <a href={withBasePath("/insights/")} className={styles.topNavLink}>
          Insights
        </a>
        <a href={CV_URL} target="_blank" rel="noreferrer" className={`${styles.topNavLink} ${styles.hideOnMobile}`}>
          CV
        </a>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.topNavCta}>
          Book a call
        </a>
      </div>
    </nav>
  );
}
