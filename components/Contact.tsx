"use client";

import React, { useRef, useState } from "react";
import styles from "./Contact.module.css";
import {
  BOOKING_URL,
  EMAIL_ADDRESS,
  EMAIL_URL,
  withBasePath,
} from "./siteLinks";
import { trackLeadSubmission } from "./analytics";

interface ChannelCard {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
  arrow: string;
  icon: React.ReactNode;
}

const channels: ChannelCard[] = [
  {
    label: "EMAIL",
    value: EMAIL_ADDRESS,
    href: EMAIL_URL,
    arrow: "↗",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    value: "Connect professionally",
    href: "https://www.linkedin.com/in/uzair-khatri",
    external: true,
    arrow: "↗",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GITHUB",
    value: "Inspect production code",
    href: "https://github.com/UzairKhatri",
    external: true,
    arrow: "↗",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "RESUME / CV",
    value: "Uzair Khatri (Uzair Iqbal) · PDF",
    href: withBasePath("/Uzair-Iqbal-AI-Architect-CV.pdf"),
    download: true,
    arrow: "↓",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    ),
  },
];

const projectStages = [
  "Idea",
  "Prototype",
  "In Production",
  "Existing System",
] as const;

export default function Contact() {
  const [projectStage, setProjectStage] = useState<string>("Prototype");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const submitting = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailFallback = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    "Architecture Inquiry (" + projectStage + ") from " + formState.name
  )}&body=${encodeURIComponent(
    "From: " +
      formState.name +
      " (" +
      formState.email +
      ")\n\n[Project Stage: " +
      projectStage +
      "]\n\n" +
      formState.message
  )}`;

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
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim().slice(0, 100),
          email: formState.email.trim().slice(0, 100),
          message: formState.message.trim().slice(0, 3000),
          stage: projectStage,
          _gotcha: formState._gotcha,
        }),
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
      setErrorMessage(
        "We couldn't confirm delivery. Your message is still here. Try again, or send it using your email app."
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  };

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={styles.container}>
        <div className={styles.dossierFrame}>
          {/* 4 Precision L-Shaped Gold Corner Brackets */}
          <span className={styles.cornerTL} aria-hidden="true" />
          <span className={styles.cornerTR} aria-hidden="true" />
          <span className={styles.cornerBL} aria-hidden="true" />
          <span className={styles.cornerBR} aria-hidden="true" />

          <div className={styles.topEdgeGlow} aria-hidden="true" />

          {/* Row 1: Balanced Header + Timezone Availability Pill */}
          <header className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <div className={styles.eyebrow}>
                <svg
                  className={styles.eyebrowStar}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#d4aa67"
                  aria-hidden="true"
                >
                  <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
                </svg>
                <span>05 // CONTACT &middot; SCHEDULE A CONVERSATION</span>
              </div>
              <h2 className={styles.heading} id="contact-title">
                Have an AI or backend system that needs to scale?
              </h2>
              <p className={styles.subtitle}>
                Whether you are moving from prototype to production, auditing a
                live runtime, or hiring for a senior architecture role.
              </p>
            </div>

            <div className={styles.timezoneBadge}>
              <span className={styles.timezoneDot} aria-hidden="true" />
              <span>
                UTC+5 (PKT) &middot; AVAILABLE FOR DUBAI/GCC &amp; GLOBAL REMOTE
              </span>
            </div>
          </header>

          {/* Row 2: 2-Column Split Stage Inside Dossier */}
          <div className={styles.stageGrid}>
            {/* LEFT COLUMN (45%): Strategy Call Card + 2x2 Channel Grid */}
            <div className={styles.leftCol}>
              <div className={styles.callCard}>
                <div>
                  <div className={styles.callTopBar}>
                    <div className={styles.hostProfile}>
                      <div className={styles.hostAvatarWrap}>
                        <img
                          src={withBasePath("/img/profile/hero-portrait.webp")}
                          alt="Uzair Khatri"
                          width={42}
                          height={42}
                          className={styles.hostAvatar}
                          loading="lazy"
                        />
                        <span
                          className={styles.hostOnlineDot}
                          aria-hidden="true"
                        />
                      </div>
                      <div className={styles.hostMeta}>
                        <strong className={styles.hostName}>Uzair Khatri</strong>
                        <span className={styles.hostRole}>
                          Principal AI Systems Architect
                        </span>
                      </div>
                    </div>

                    <div className={styles.callBadge}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>30 MIN &middot; 1-ON-1</span>
                    </div>
                  </div>

                  <h3 className={styles.callTitle}>
                    Book an Architecture Strategy Call
                  </h3>
                  <p className={styles.callDesc}>
                    A focused 30-minute engineer-to-engineer conversation to review
                    your system architecture, identify your highest-risk bottlenecks,
                    and agree on concrete next steps.
                  </p>

                  {/* Concrete 30-Min Session Agenda */}
                  <div className={styles.agendaWindow} aria-hidden="true">
                    <div className={styles.agendaHeader}>
                      <span>30-MIN STRATEGY CALL AGENDA</span>
                      <span className={styles.agendaTag}>1-ON-1</span>
                    </div>
                    <div className={styles.agendaRows}>
                      <div className={styles.agendaRow}>
                        <span>01 · Current Architecture &amp; Topology</span>
                        <span className={styles.agendaPill}>System Map</span>
                      </div>
                      <div className={styles.agendaRow}>
                        <span>02 · Critical Failure Points &amp; Scaling Limits</span>
                        <span className={styles.agendaPillGold}>Risk Triage</span>
                      </div>
                      <div className={styles.agendaRow}>
                        <span>03 · High-Priority Engineering Decisions</span>
                        <span className={styles.agendaPill}>Action Plan</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-source="contact_section"
                  className={styles.goldBtn}
                >
                  <span>Book 30-Min Architecture Call</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* 2x2 Direct Channels Grid */}
              <div
                className={styles.channelsGrid}
                role="list"
                aria-label="Direct contact channels"
              >
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.external ? "_blank" : undefined}
                    rel={ch.external ? "noreferrer" : undefined}
                    download={ch.download ? true : undefined}
                    className={styles.channelCard}
                    role="listitem"
                  >
                    <span className={styles.channelKicker}>
                      {ch.icon}
                      <span>{ch.label}</span>
                    </span>
                    <strong className={styles.channelValue}>
                      <span>{ch.value}</span>
                      <span
                        className={styles.channelArrow}
                        aria-hidden="true"
                      >
                        {ch.arrow}
                      </span>
                    </strong>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN (55%): Async System Context Form */}
            <div className={styles.rightCol} id="contact-card">
              <div className={styles.formPanel}>
                <span className={styles.formKicker}>
                  PREFER ASYNC? // SEND SYSTEM CONTEXT
                </span>
                <h3 className={styles.formHeading}>
                  Send the context. I&apos;ll pressure-test the shape of the
                  system.
                </h3>

                {status === "success" ? (
                  <div className={styles.formSuccess} role="status">
                    <div className={styles.successIconStage}>
                      <svg
                        className={styles.successCheck}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <strong>Message received.</strong>
                    <p>
                      I&apos;ll review your system context and respond within 24
                      hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className={styles.resetFormBtn}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                    aria-busy={status === "submitting"}
                  >
                    {/* Honeypot field for anti-bot spam defense */}
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: "none" }}
                      value={formState._gotcha}
                      onChange={(e) =>
                        setFormState({ ...formState, _gotcha: e.target.value })
                      }
                      aria-hidden="true"
                    />

                    <div className={styles.formRow}>
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
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className={styles.input}
                      />
                      <input
                        type="email"
                        placeholder="Work Email"
                        aria-label="Work Email"
                        name="email"
                        autoComplete="email"
                        disabled={status === "submitting"}
                        required
                        maxLength={100}
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className={styles.input}
                      />
                    </div>

                    <div
                      className={styles.stageTrack}
                      role="radiogroup"
                      aria-label="Project stage"
                    >
                      {projectStages.map((stage) => {
                        const active = projectStage === stage;
                        return (
                          <button
                            key={stage}
                            type="button"
                            disabled={status === "submitting"}
                            className={`${styles.stageBtn} ${
                              active ? styles.stageBtnActive : ""
                            }`}
                            onClick={() => setProjectStage(stage)}
                            aria-checked={active}
                            role="radio"
                          >
                            [{stage}]
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      placeholder="What is built, what is breaking, and what has to scale?"
                      aria-label="Project context"
                      name="message"
                      disabled={status === "submitting"}
                      required
                      maxLength={3000}
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className={styles.textarea}
                    />

                    {status === "error" && (
                      <div className={styles.formError}>
                        <p role="alert">{errorMessage}</p>
                        <a href={emailFallback}>Open email draft &rarr;</a>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={styles.goldBtn}
                    >
                      <span>
                        {status === "submitting"
                          ? "Sending..."
                          : status === "error"
                          ? "Try again"
                          : "Send System Context"}
                      </span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>

                    <p className={styles.formFootnote}>
                      Direct response within 24 hours &middot; Zero sales
                      intermediaries
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
