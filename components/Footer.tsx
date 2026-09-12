import styles from "./Footer.module.css";
import { BOOKING_URL, EMAIL_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

const navLinks = [
  { label: "Services", href: withBasePath("/services/ai-systems/") },
  { label: "Case Studies", href: withBasePath("/case-studies/") },
  { label: "Playbook", href: withBasePath("/ai-playbook/") },
  { label: "Work", href: withBasePath("/#work") },
  { label: "About", href: withBasePath("/#about") },
];

const connectLinks = [
  { label: "Book Call", href: BOOKING_URL, external: true, isPrimary: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/uzair-khatri", external: true },
  { label: "GitHub", href: "https://github.com/UzairKhatri", external: true },
  { label: "Email", href: EMAIL_URL, external: false },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Main Header / Navigation Row */}
        <div className={styles.mainRow}>
          <div className={styles.brand}>
            <Logo compact={true} />
            <div className={styles.statusBadge}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>Available for contract & advisory roles</span>
            </div>
          </div>

          <div className={styles.actionsGroup}>
            <nav className={styles.nav} aria-label="Footer navigation">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className={styles.connect}>
              {connectLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={item.isPrimary ? styles.bookButton : styles.connectLink}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  {item.label}
                  {item.external && <span className={styles.arrow}>↗</span>}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Bottom Metadata Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; 2026 Uzair Khatri. All rights reserved.
          </p>
          <div className={styles.meta}>
            <span className={styles.location}>Karachi &bull; UTC+5</span>
            <span className={styles.sep}>/</span>
            <a href={withBasePath("/.well-known/security.txt")} target="_blank" rel="noreferrer">
              security.txt
            </a>
            <span className={styles.sep}>/</span>
            <a href={withBasePath("/llms.txt")} target="_blank" rel="noreferrer">
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
