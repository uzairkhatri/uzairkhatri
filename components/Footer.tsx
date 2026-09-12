import styles from "./Footer.module.css";
import { BOOKING_URL, EMAIL_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

const footerLinks = [
  ["Services", withBasePath("/services/ai-systems/")],
  ["Case Studies", withBasePath("/case-studies/")],
  ["AI Playbook", withBasePath("/ai-playbook/")],
  ["Work", withBasePath("/#work")],
  ["Method", withBasePath("/#method")],
  ["About", withBasePath("/#about")],
  ["Contact", withBasePath("/#contact")],
  ["LinkedIn", "https://www.linkedin.com/in/uzair-khatri"],
  ["GitHub", "https://github.com/UzairKhatri"],
  ["Email", EMAIL_URL],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brandCol}>
        <Logo compact={true} />
        <p>AI production architecture for teams moving from promising demo to reliable product.</p>
        <span className={styles.copyright}>&copy; 2026 Uzair Khatri. All rights reserved.</span>
      </div>

      <div className={styles.availability}>
        <span>Availability</span>
        <strong>Open for selected AI production builds.</strong>
        <p>Karachi based, global async collaboration, with architecture enquiries answered within 24 hours.</p>
        <a href={BOOKING_URL} target="_blank" rel="noreferrer">Schedule review &rarr;</a>
      </div>

      <nav className={styles.nav} aria-label="Footer navigation">
        {footerLinks.map(([label, href]) => (
          <a
            href={href}
            key={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
