"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;
    let isVisible = true;

    // Stop requestAnimationFrame loop when scrolled out of view to preserve resources
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          tick();
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroElement);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = e.clientX / innerWidth - 0.5;
      targetY = e.clientY / innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const tick = () => {
      if (!isVisible) return;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      heroElement.style.setProperty("--mx", currentX.toFixed(4));
      heroElement.style.setProperty("--my", currentY.toFixed(4));

      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-canvas" aria-label="Uzair Khatri hero">
      <div className="hero-grid-3d" aria-hidden="true" />
      
      <nav className="hero-nav" aria-label="Primary navigation">
        <a href={withBasePath("/")} aria-label="Uzair Khatri home" style={{ border: "none", paddingBottom: 0, textDecoration: "none" }}>
          <Logo />
        </a>
        <div className="desktop-nav-links">
          <a href="#work">Work</a>
          <a href="#method">Method</a>
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
            <span className="cta-text-primary">Request Review</span>
          </a>
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-header">
              <Logo compact={true} />
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="mobile-menu-links">
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href="#method" onClick={() => setMobileMenuOpen(false)}>Method</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-3d-double" style={{ fontSize: "1rem", padding: "0.8rem 1.8rem" }}>
                <span className="btn-3d-text-primary">Request Architecture Review</span>
              </a>
            </nav>
            <div className="mobile-menu-footer">
              <a href="https://github.com/UzairKhatri" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>GitHub</a>
              <a href="https://www.linkedin.com/in/uzair-khatri" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>LinkedIn</a>
            </div>
          </div>
        )}
      </nav>

      <div className="hero-portrait-stage" aria-hidden="true">
        <div className="hero-portrait-glow" />
        <div className="hero-blueprint-grid" />

        {/* Docked Executive Architecture HUD Cards */}
        <div className="hero-hud-card hud-top-left">
          <div className="hud-card-header">
            <span className="hud-status-dot gold" />
            <span className="hud-card-tag">SYSTEM RUNTIME</span>
          </div>
          <strong className="hud-card-title">LangGraph Multi-Agent</strong>
          <span className="hud-card-sub">State Graphs &bull; Error Isolation</span>
        </div>

        <div className="hero-hud-card hud-bottom-left">
          <div className="hud-card-header">
            <span className="hud-status-dot green" />
            <span className="hud-card-tag">PRODUCTION INFRA</span>
          </div>
          <strong className="hud-card-title">FastAPI &bull; Vector &bull; AWS</strong>
          <span className="hud-card-sub">Queue Buffering &bull; Latency Limits</span>
        </div>

        <Image src={withBasePath("/img/profile/hero-portrait.webp")} alt="Uzair Khatri - AI Production Architect" fill sizes="(max-width: 900px) 82vw, 42vw" priority fetchPriority="high" />
      </div>

      <div className="hero-content">
        <div className="hero-status-row">
          <div className="hero-telemetry-pill">
            <span className="telemetry-pulse-gold" />
            <span>Systems Scope: Agent Runtimes &bull; Retrieval &bull; Cloud Infrastructure</span>
          </div>
        </div>
        <div className="hero-role">
          <small>AI Production Architect</small>
          <h2>
            <span>Fragile AI</span>
            <span>rebuilt for</span>
            <span>production.</span>
          </h2>
          <span>
            I turn promising AI prototypes into reliable systems with agent runtimes,
            guardrails, tracing, queues, cost controls, and cloud paths your team can operate.
          </span>
        </div>
        <div className="hero-actions" aria-label="Hero actions">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-3d-double">
            <span className="btn-3d-text-primary">Request Architecture Review &rarr;</span>
          </a>
          <a href="#work">View Production Work</a>
        </div>
        <div className="hero-proof-row" aria-label="Proof points">
          <span>14+ years in architecture</span>
          <span>agentic production systems</span>
          <span>operator-grade handoff</span>
        </div>
        <p className="hero-microcopy">30 minutes &bull; architecture pressure test &bull; concrete next moves</p>
      </div>
    </section>
  );
}





