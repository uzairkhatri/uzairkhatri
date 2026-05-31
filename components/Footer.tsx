import styles from "./Footer.module.css";
import { EMAIL_URL } from "./siteLinks";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <strong>Uzair Khatri</strong>
        <span>AI Systems Architect - Portfolio 2026</span>
      </div>

      <p>Uzair Khatri - Prototype-to-production AI architecture. Ship it. Scale it. Keep it alive.</p>

      <nav aria-label="Footer navigation">
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
