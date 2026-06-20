import styles from "./Footer.module.css";
import { EMAIL_URL } from "./siteLinks";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Brand Column */}
      <div className={styles.brandCol}>
        <Logo compact={true} />
        <span className={styles.copyright}>&copy; Portfolio 2026</span>
      </div>

      {/* Terminal Command Center Column */}
      <div className={styles.statusTerminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.statusDotGreen} />
          <span className={styles.terminalTitle}>system_status.sh</span>
        </div>
        <div className={styles.terminalGrid}>
          <div className={styles.terminalRow}>
            <strong>SYSTEM:</strong>
            <span>ACTIVE</span>
          </div>
          <div className={styles.terminalRow}>
            <strong>LOCATION:</strong>
            <span>Pakistan</span>
          </div>
          <div className={styles.terminalRow}>
            <strong>AVAILABILITY:</strong>
            <span className={styles.goldText}>OPEN TO OPPORTUNITIES</span>
          </div>
          <div className={styles.terminalRow}>
            <strong>RESPONSE TIME:</strong>
            <span>&lt; 24H</span>
          </div>
          <div className={styles.terminalRow}>
            <strong>ACTIVE THREADS:</strong>
            <span>3</span>
          </div>
        </div>
      </div>

      {/* Nav Link List Column */}
      <nav className={styles.nav} aria-label="Footer navigation">
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="https://www.linkedin.com/in/uzair-khatri" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/UzairKhatri" target="_blank" rel="noreferrer">GitHub</a>
        <a href={EMAIL_URL}>Email</a>
      </nav>
    </footer>
  );
}

