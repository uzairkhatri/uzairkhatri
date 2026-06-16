"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL, withBasePath } from "./siteLinks";

const links = [
  ["Email", EMAIL_URL, EMAIL_ADDRESS],
  ["LinkedIn", "https://www.linkedin.com/in/uzair-khatri", "Connect professionally"],
  ["GitHub", "https://github.com/UzairKhatri", "Review technical work"],
  ["Resume", withBasePath("/Uzair%20Iqbal%20%E2%80%94%20CV.pdf"), "Download CV / Resume"],
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
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className={`${styles.section} reveal-section`} id="contact" aria-labelledby="contact-title">
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

          <div className={styles.fitList} aria-label="Best fit for">
            {engagementTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

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
          <div className={styles.contactCard}>
            <p>Start here</p>
            <h3>Send the context. I&apos;ll tell you what needs pressure-testing.</h3>
            
            {status === "success" ? (
              <div className={styles.formSuccess}>
                <div className={styles.successIconStage}>
                  <span className={styles.successPulse} />
                  <svg className={styles.successCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <strong>System Context Transmitted.</strong>
                <p>I will analyze your details and respond within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className={styles.resetFormBtn}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="Tell me about your system (e.g. concurrent user targets, model providers, bottleneck details...)"
                    required
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={styles.textarea}
                  />
                </div>
                <button type="submit" disabled={status === "submitting"} className={styles.submitBtn}>
                  {status === "submitting" ? "Transmitting Context..." : "Claim System Review →"}
                </button>
              </form>
            )}
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
