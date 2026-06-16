"use client";

import Image from "next/image";
import { BOOKING_URL, withBasePath } from "./siteLinks";

export default function Landing() {
  return (
    <section className="hero-canvas" aria-label="Uzair Khatri hero">
      <div className="hero-grid-3d" aria-hidden="true" />
      
      <nav className="hero-nav" aria-label="Primary navigation">
        <a href={withBasePath("/")} aria-label="Uzair Khatri home" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--gold)" }}>
            <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2.2" />
            <path d="M10 10v7a6 6 0 0 0 12 0v-7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span>Uzair Khatri</span>
        </a>
        <div>
          <a href="#work">Work</a>
          <a href="#writing">Writing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="hero-nav-icon" href="https://github.com/UzairKhatri" aria-label="GitHub profile" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.36-1.2-3.36-1.2-.45-1.2-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.04A9.3 9.3 0 0 1 12 6.97c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.8c0 .28.18.6.69.5A10.1 10.1 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a className="hero-nav-icon" href="https://www.linkedin.com/in/uzair-khatri" aria-label="LinkedIn profile" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.94 8.98H3.72V20h3.22V8.98ZM7.2 5.58C7.2 4.55 6.43 3.8 5.35 3.8S3.5 4.55 3.5 5.58c0 1 .75 1.78 1.8 1.78h.02c1.1 0 1.88-.78 1.88-1.78ZM20.5 13.69c0-3.38-1.8-4.95-4.2-4.95-1.94 0-2.8 1.07-3.29 1.82V8.98H9.8c.04 1.03 0 11.02 0 11.02h3.21v-6.15c0-.33.03-.66.12-.9.26-.66.86-1.34 1.86-1.34 1.31 0 1.84 1.01 1.84 2.49V20h3.21l.46-6.31Z" />
            </svg>
          </a>
          <a className="hero-nav-cta" href={BOOKING_URL} target="_blank" rel="noreferrer">
            Book Architecture Call
          </a>
        </div>
      </nav>

      <div className="hero-portrait-stage" aria-hidden="true">
        <div className="hero-portrait-glow" />
        
        {/* SVG connection lines spanning the entire stage using percentage-based paths */}
        <svg className="hero-portrait-nodes-overlay" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Paths connecting Far-Left nodes (x=10) to Middle nodes (x=16) */}
          <path d="M 10 23 C 13 23, 13 12, 16 12" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />
          <path d="M 10 23 C 13 23, 13 27, 16 27" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />
          
          <path d="M 10 41 C 13 41, 13 27, 16 27" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />
          <path d="M 10 41 C 13 41, 13 42, 16 42" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />
          
          <path d="M 10 59 C 13 59, 13 42, 16 42" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />
          <path d="M 10 59 C 13 59, 13 57, 16 57" stroke="var(--gold)" strokeWidth="0.35" strokeOpacity="0.4" fill="none" strokeDasharray="1 1" />

          {/* Paths from Middle nodes right-edge (x=28) towards center x=70 (behind shifted portrait) */}
          <path d="M 28 12 H 36 C 48 12, 52 32, 70 32" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.5" fill="none" />
          <path d="M 28 27 H 36 C 48 27, 52 36, 70 36" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.6" fill="none" />
          <path d="M 28 42 H 70" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.5" fill="none" />
          <path d="M 28 57 H 36 C 48 57, 52 48, 70 48" stroke="var(--gold)" strokeWidth="0.4" strokeOpacity="0.5" fill="none" />

          {/* Mini node circles */}
          <circle cx="16" cy="12" r="0.6" fill="var(--gold)" />
          <circle cx="16" cy="27" r="0.6" fill="var(--gold)" />
          <circle cx="16" cy="42" r="0.6" fill="var(--gold)" />
          <circle cx="16" cy="57" r="0.6" fill="var(--gold)" />
          <circle cx="10" cy="23" r="0.6" fill="var(--gold)" />
          <circle cx="10" cy="41" r="0.6" fill="var(--gold)" />
          <circle cx="10" cy="59" r="0.6" fill="var(--gold)" />

          <circle cx="70" cy="32" r="0.8" fill="var(--gold)" className="node-pulse" />
          <circle cx="70" cy="36" r="0.8" fill="var(--gold)" className="node-pulse" />
          <circle cx="70" cy="42" r="0.8" fill="var(--gold)" className="node-pulse" />
          <circle cx="70" cy="48" r="0.8" fill="var(--gold)" className="node-pulse" />
        </svg>

        <span className="hero-watermark">Uzair Khatri</span>
        
        {/* Absolute capsules for the left-hand nodes (gateway, broker, storage) shifted left */}
        <div className="hero-node-pill fn-gateway" style={{ top: "21.5%", left: "0%" }}>
          <span className="node-indicator gold-pulse" />
          <span>gateway</span>
        </div>
        <div className="hero-node-pill fn-broker" style={{ top: "39.5%", left: "0%" }}>
          <span className="node-indicator gold-pulse" />
          <span>broker</span>
        </div>
        <div className="hero-node-pill fn-storage" style={{ top: "57.5%", left: "0%" }}>
          <span className="node-indicator gold-pulse" />
          <span>storage</span>
        </div>

        {/* Middle route pills shifted left to 16% so they reside strictly to the left of the face */}
        <div className="hero-node-pill mid-route" style={{ top: "10.5%", left: "16%" }}>
          <span>Ingestion Routing</span>
        </div>
        <div className="hero-node-pill mid-trigger" style={{ top: "25.5%", left: "16%" }}>
          <span>Trigger Event</span>
        </div>
        <div className="hero-node-pill mid-telemetry" style={{ top: "40.5%", left: "16%" }}>
          <span>Telemetry Layer</span>
        </div>
        <div className="hero-node-pill mid-queue" style={{ top: "55.5%", left: "16%" }}>
          <span>Pipeline Queue</span>
        </div>

        <Image src={withBasePath("/img/profile/hero-portrait.png")} alt="Uzair Iqbal - AI Systems Architect" fill sizes="(max-width: 900px) 82vw, 42vw" priority />
      </div>

      <div className="hero-content">
        <div className="hero-status-row">
          <div className="hero-availability">
            <span />
            1 client slot open for Q3 2026
          </div>
          <div className="hero-telemetry-pill">
            <span className="telemetry-pulse-gold" />
            <span>System: Active | RTT: 42ms</span>
          </div>
        </div>
        <div className="hero-role">
          <small>AI Systems Architect</small>
          <strong>I help AI products survive production.</strong>
          <span>
            I design the systems, agents, and infrastructure that keep AI products reliable under
            real users, real traffic, and real business pressure.
          </span>
        </div>
        <div className="hero-actions" aria-label="Hero actions">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            Book a 30-Min Architecture Review -&gt;
          </a>
          <a href="#work">View Production Work</a>
        </div>
        <p className="hero-microcopy">Free. No pitch. Just clarity on your system.</p>
      </div>
    </section>
  );
}
