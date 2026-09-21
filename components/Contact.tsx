"use client";

import { useRef, useState } from "react";
import styles from "./Contact.module.css";
import { BOOKING_URL, EMAIL_ADDRESS, EMAIL_URL, withBasePath } from "./siteLinks";
import { trackLeadSubmission } from "./analytics";

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

const projectStages = ["Idea", "Prototype", "In Production", "Existing System"] as const;

export default function Contact() {
  const [projectStage, setProjectStage] = useState<string>("Prototype");
  const [formState, setFormState] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const submitting = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailFallback = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent("Architecture Inquiry (" + projectStage + ") from " + formState.name)}&body=${encodeURIComponent("From: " + formState.name + " (" + formState.email + ")\n\n[Project Stage: " + projectStage + "]\n\n" + formState.message)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    if (!formState.name.trim() || !formState.message.trim()) {
      setErrorMessage("Please enter your name and project context.");
      setStatus("error");
      return;
    }

    // Honeypot check: If filled by automated bot, fake success silently without hitting API
    if (formState._gotcha) {
      setStatus("success");
      setFormState({ name: "", email: "", message: "", _gotcha: "" });
      return;
    }

    submitting.current = true;
    setStatus("submitting");
    setErrorMessage("");

    const endpoint = withBasePath("/api/contact");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formState.name.trim().slice(0, 100),
          email: formState.email.trim().slice(0, 100),
          message: formState.message.trim().slice(0, 3000),
          stage: projectStage,
          _gotcha: formState._gotcha,
        })
      });

      const result = await response.json();
      if (response.ok && result?.success === true) {
        trackLeadSubmission(projectStage, "api_contact");
        setStatus("success");
        setFormState({ name: "", email: "", message: "", _gotcha: "" });
      } else {
        throw new Error("Contact request was not accepted");
      }
    } catch {
      setErrorMessage("We couldn't confirm delivery. Your message is still here. Try again, or send it using your email app.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  };

  return (
    <section className={`${styles.section} reveal-section`} id="contact" aria-labelledby="contact-title">
      <div className={styles.shell}>
        <div className={styles.left}>
          <p className={styles.kicker}>
            <span />
            Architecture Review
          </p>
          <h2 id="contact-title">Have an AI system that needs to actually work?</h2>
          <p className={styles.copy}>
            Whether you&apos;re moving from prototype to production or fixing an AI system that&apos;s already struggling, let&apos;s review the architecture: runtime boundaries, memory state, concurrency safety, and cost controls.
          </p>

          <div className={styles.fitList} aria-label="Best fit for">
            {engagementTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <a 
              className={styles.primary} 
              href={BOOKING_URL} 
              target="_blank" 
              rel="noreferrer"
              data-source="contact_section"
            >
              Book 30-Min Architecture Call &rarr;
            </a>
            <a className={styles.secondary} href="#contact-card">
              Prefer async? Tell me about your project &darr;
            </a>
          </div>
        </div>

        <div className={styles.right} id="contact-card">
          <div className={styles.contactCard}>
            <p>Start here</p>
            <h3>Send the context. I&apos;ll pressure-test the shape of the system.</h3>
            
            {status === "success" ? (
              <div className={styles.formSuccess} role="status">
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
              <form onSubmit={handleSubmit} className={styles.form} aria-busy={status === "submitting"}>
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
                      aria-label="Name"
                      name="name"
                      autoComplete="name"
                      disabled={status === "submitting"}
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
                      aria-label="Email"
                      name="email"
                      autoComplete="email"
                      disabled={status === "submitting"}
                      required
                      maxLength={100}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.stageSelectorGroup}>
                  <span className={styles.stageLabel}>Project Stage</span>
                  <div className={styles.stageButtons} role="radiogroup" aria-label="Project stage">
                    {projectStages.map((stage) => (
                      <button
                        key={stage}
                        type="button"
                        disabled={status === "submitting"}
                        className={`${styles.stageBtn} ${projectStage === stage ? styles.stageBtnActive : ""}`}
                        onClick={() => setProjectStage(stage)}
                        aria-checked={projectStage === stage}
                        role="radio"
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    placeholder="What is built, what is breaking, and what has to scale?"
                    aria-label="Project context"
                    name="message"
                    disabled={status === "submitting"}
                    required
                    maxLength={3000}
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={styles.textarea}
                  />
                </div>
                {status === "error" && (
                  <div className={styles.formError}>
                    <p role="alert">{errorMessage}</p>
                    <a href={emailFallback}>Open email draft &rarr;</a>
                  </div>
                )}
                <button type="submit" disabled={status === "submitting"} className={styles.submitBtn}>
                  {status === "submitting" ? "Sending..." : status === "error" ? "Try again" : "Send Context"}
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

