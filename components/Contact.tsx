import styles from "./Contact.module.css";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL } from "./siteLinks";

const links = [
  ["Email", EMAIL_URL, EMAIL_ADDRESS],
  ["LinkedIn", "https://www.linkedin.com/in/uzair-khatri", "Connect professionally"],
  ["GitHub", "https://github.com/UzairKhatri", "Review technical work"],
  ["Resume", "/Uzair%20Iqbal%20%E2%80%94%20CV.pdf", "Download CV / Resume"],
];

const engagementTypes = [
  "Moving an AI prototype into production",
  "Designing agentic workflows",
  "Scaling backend architecture",
  "Reducing architecture debt",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h9M9.5 5.5 13 9l-3.5 3.5" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.shell}>
        <div className={styles.left}>
          <p className={styles.kicker}>
            <span />
            Contact
          </p>
          <h2 id="contact-title">Moving AI from prototype to production?</h2>
          <p className={styles.copy}>
            Bring me in before architecture debt becomes product debt. I help teams clarify the
            system, reduce technical risk, and design the backend, agent, and infrastructure
            decisions that make AI products reliable at scale.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book Architecture Call
              <ArrowIcon />
            </a>
            <a className={styles.secondary} href="#work">
              View Production Proof
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.panel}>
            <p>Best fit for</p>
            <div className={styles.engagements}>
              {engagementTypes.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            {links.map(([label, href, description]) => (
              <a
                href={href}
                key={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                download={href.endsWith(".pdf") ? true : undefined}
              >
                <span>{label}</span>
                <strong>{description}</strong>
                <ArrowIcon />
              </a>
            ))}
          </div>

          <p className={styles.timezone}>
            Based in Karachi, Pakistan. Available globally, async-friendly. I respond to architecture
            enquiries within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
