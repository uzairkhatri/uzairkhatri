"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL, withBasePath } from "./siteLinks";

const links = [
  ["Email", EMAIL_URL, EMAIL_ADDRESS],
  ["LinkedIn", "https://www.linkedin.com/in/uzair-khatri", "Connect professionally"],
  ["GitHub", "https://github.com/UzairKhatri", "Review technical work"],
  ["Resume", withBasePath("/Uzair-Iqbal-AI-Architect-CV.pdf"), "Download CV (Uzair Iqbal — PDF)"],
];

const engagementTypes = [
  "AI prototype to production",
  "Agent workflow design",
  "Backend scaling",
  "Architecture risk review",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h9M9.5 5.5 13 9l-3.5 3.5" />
    </svg>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: If filled by automated bot, fake success silently without hitting API
    if (formState._gotcha) {
      setStatus("success");
      setFormState({ name: "", email: "", message: "", _gotcha: "" });
      return;
    }

    setStatus("submitting");

    const endpoint = withBasePath("/api/contact");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formState.name.slice(0, 100),
          email: formState.email.slice(0, 100),
          message: formState.message.slice(0, 3000),
          _gotcha: formState._gotcha,
        })
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        // Fallback to mailto link
        window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent("Architecture Inquiry from " + formState.name)}&body=${encodeURIComponent("From: " + formState.name + " (" + formState.email + ")\n\n" + formState.message)}`;
        setStatus("success");
      }
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent("Architecture Inquiry from " + formState.name)}&body=${encodeURIComponent("From: " + formState.name + " (" + formState.email + ")\n\n" + formState.message)}`;
      setStatus("success");
    }
  };

  return (
    <section className={`${styles.section} reveal-section`} id="contact" aria-labelledby="contact-title">
      <div className={styles.shell}>
        <div className={styles.left}>
          <p className={styles.kicker}>
            <span />
            Contact
          </p>
          <h2 id="contact-title">Ready to make the system real?</h2>
          <p className={styles.copy}>
            Bring me in when the prototype is promising and the architecture needs senior production judgment:
            runtime design, data boundaries, observability, queues, cost control, and handoff.
          </p>

          <div className={styles.fitList} aria-label="Best fit for">
            {engagementTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <a className={styles.primary} href={BOOKING_URL} target="_blank" rel="noreferrer">
              Request Architecture Review
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
            <h3>Send the context. I&apos;ll pressure-test the shape of the system.</h3>
            
            {status === "success" ? (
              <div className={styles.formSuccess}>
                <div className={styles.successIconStage}>
                  <span className={styles.successPulse} />
                  <svg className={styles.successCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <strong>Message received.</strong>
                <p>I&apos;ll review the context and respond within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className={styles.resetFormBtn}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Honeypot field for anti-bot spam defense */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  value={formState._gotcha}
                  onChange={(e) => setFormState({ ...formState, _gotcha: e.target.value })}
                  aria-hidden="true"
                />
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      maxLength={100}
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
                      maxLength={100}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    placeholder="What is built, what is breaking, and what has to scale?"
                    required
                    maxLength={3000}
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={styles.textarea}
                  />
                </div>
                <button type="submit" disabled={status === "submitting"} className={styles.submitBtn}>
                  {status === "submitting" ? "Sending..." : "Send Context"}
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
            Based in Karachi (PKT / UTC+5). Available for Dubai/GCC (GST) and global remote architecture engagements. Enquiries answered within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

