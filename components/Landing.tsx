"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BOOKING_URL, CV_URL, withBasePath } from "./siteLinks";
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
          <a href={withBasePath("/#work")}>Work</a>
          <a href={withBasePath("/services/ai-systems/")}>Services</a>
          <a href={withBasePath("/case-studies/")}>Case Studies</a>
          <a href={withBasePath("/#about")}>About</a>
          <a href={CV_URL} target="_blank" rel="noreferrer" title="Download Resume / CV (PDF)">CV</a>
          <a href={withBasePath("/#contact")}>Contact</a>
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
              <a href={withBasePath("/#work")} onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href={withBasePath("/services/ai-systems/")} onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href={withBasePath("/case-studies/")} onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
              <a href={withBasePath("/#about")} onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href={CV_URL} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>CV / Resume (PDF)</a>
              <a href={withBasePath("/#contact")} onClick={() => setMobileMenuOpen(false)}>Contact</a>
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
        <Image src={withBasePath("/img/profile/hero-portrait.webp")} alt="Uzair Khatri - AI Systems Architect" fill sizes="(max-width: 900px) 82vw, 42vw" priority fetchPriority="high" />
      </div>

      <div className="hero-content">
        <div className="hero-identity-row">
          <span className="hero-identity-name">Uzair Khatri</span>
          <span className="hero-identity-sep">&bull;</span>
          <span className="hero-identity-role">AI Systems Architect</span>
        </div>

        <div className="hero-role">
          <h2>
            <span>Fragile AI.</span>
            <span>Rebuilt for</span>
            <span>Production.</span>
          </h2>
          <p className="hero-thesis">
            I architect production AI systems, multi-agent runtimes, and enterprise cloud backends that stay reliable beyond the demo.
          </p>
        </div>

        <div className="hero-actions" aria-label="Hero actions">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-3d-double">
            <span className="btn-3d-text-primary">Discuss a Project</span>
          </a>
          <a href="#work" className="hero-secondary-btn">View Production Work &rarr;</a>
        </div>

        <div className="hero-proof-row" aria-label="Proof points">
          <span>14+ Years in Architecture</span>
          <span>Agentic Multi-Agent Systems</span>
          <span>Operator-Grade Handoff</span>
        </div>
      </div>
    </section>
  );
}





