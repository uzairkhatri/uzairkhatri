"use client";

import { useState } from "react";
import Image from "next/image";
import { BOOKING_URL, CV_URL, withBasePath } from "./siteLinks";
import styles from "./Landing.module.css";

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.heroHeaderWrap} role="banner">
      {/* Subtle architectural background texture (assistive hidden) */}
      <div className={styles.heroGridLayer} aria-hidden="true" />

      {/* Contained Architectural Header Bar */}
      <div className={styles.navOuter}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <div className={styles.navContainer}>
            <a
              href={withBasePath("/")}
              className={styles.navBrand}
              aria-label="Uzair Khatri - AI Systems Architect - Home"
            >
              {/* Geometric Double-Line Gold UK Monogram */}
              <svg
                width="34"
                height="28"
                viewBox="0 0 44 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.brandMonogram}
                aria-hidden="true"
              >
                {/* Outer & Inner "U" */}
                <path
                  d="M3 4V19C3 25.0751 7.92487 30 14 30C20.0751 30 25 25.0751 25 19V4"
                  stroke="#D4AA67"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M7.5 4V18.5C7.5 22.0899 10.4101 25 14 25C17.5899 25 20.5 22.0899 20.5 18.5V4"
                  stroke="#D4AA67"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
                {/* Architectural "K" */}
                <path
                  d="M29 4V30M33 4V30M41 4L33 16.5L41.5 30M37 4L29.5 15.5"
                  stroke="#D4AA67"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className={styles.brandTextWrap}>
                <span className={styles.brandName}>UZAIR KHATRI</span>
                <span className={styles.brandDivider} aria-hidden="true">/</span>
                <span className={styles.brandRole}>AI SYSTEMS ARCHITECT</span>
              </span>
            </a>

            <div className={styles.desktopLinks}>
              <a href={withBasePath("/#work")} className={styles.navLink}>
                Work
              </a>
              <a href={withBasePath("/services/ai-systems/")} className={styles.navLink}>
                Services
              </a>
              <a href={withBasePath("/case-studies/")} className={styles.navLink}>
                Case Studies
              </a>
              <a href={withBasePath("/insights/")} className={styles.navLink}>
                Insights
              </a>
              <a href={withBasePath("/#about")} className={styles.navLink}>
                About
              </a>
              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                title="Download Resume / CV (PDF)"
                className={styles.navLink}
              >
                CV
              </a>
              <a href={withBasePath("/#contact")} className={styles.navLink}>
                Contact
              </a>
              <a
                className={styles.navCta}
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book Strategy Call
              </a>
            </div>

            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="hero-mobile-menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="hero-mobile-menu"
          className={styles.mobileMenuOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className={styles.mobileMenuHeader}>
            <a
              href={withBasePath("/")}
              onClick={() => setMobileMenuOpen(false)}
              className={styles.navBrand}
            >
              <span className={styles.brandTextWrap}>
                <span className={styles.brandName}>UZAIR KHATRI</span>
              </span>
            </a>
            <button
              type="button"
              className={styles.mobileMenuClose}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileMenuLinks}>
            <a href={withBasePath("/#work")} onClick={() => setMobileMenuOpen(false)}>
              Work
            </a>
            <a href={withBasePath("/#experience")} onClick={() => setMobileMenuOpen(false)}>
              Experience
            </a>
            <a href={withBasePath("/services/ai-systems/")} onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
            <a href={withBasePath("/case-studies/")} onClick={() => setMobileMenuOpen(false)}>
              Case Studies
            </a>
            <a href={withBasePath("/insights/")} onClick={() => setMobileMenuOpen(false)}>
              Insights
            </a>
            <a href={withBasePath("/#about")} onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resume / CV (PDF)
            </a>
            <a href={withBasePath("/#contact")} onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <a
              href={withBasePath("/audit/")}
              className={styles.mobileMenuCta}
              onClick={() => setMobileMenuOpen(false)}
            >
              Discuss a Project &rarr;
            </a>
          </div>

          <div className={styles.mobileMenuFooter}>
            <a href="https://www.linkedin.com/in/uzair-khatri" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/uzairkhatri" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      )}

      {/* Hero Content & Editorial Asymmetric Composition */}
      <section className={styles.heroSection} aria-label="Introduction">
        <div className={styles.heroGrid}>
          {/* Column 1: Authoritative Editorial Copy (~56% Desktop, Order 1 on Mobile) */}
          <div className={styles.contentColumn}>
            {/* Availability Status Badge */}
            <div className={styles.badgeWrap}>
              <span className={styles.availBadge}>
                <span className={styles.availDot} aria-hidden="true" />
                OPEN TO SENIOR ROLES &amp; CONSULTING
              </span>
            </div>

            {/* Single Semantic Editorial H1 */}
            <h1 className={styles.h1}>
              I Build AI Systems That{" "}
              <span className={styles.h1Line2}>
                Work <span className={styles.goldEmphasis}>Beyond the Demo.</span>
              </span>
            </h1>

            {/* Production-Focused Value Proposition */}
            <p className={styles.mainDesc}>
              I design, build, and scale production AI systems and reliable backend platforms—from AI agents and RAG to distributed services and cloud infrastructure.
            </p>

            {/* 14+ Years Experience Statement with Left Gold Rule */}
            <p className={styles.experienceStmt}>
              <strong className={styles.goldAccentText}>14+ years</strong> of hands-on software engineering and solutions architecture.
            </p>

            {/* Audience-Aware CTAs */}
            <div className={styles.ctaGroup} aria-label="Primary actions">
              <a href={withBasePath("/audit/")} className={styles.btnPrimary}>
                <span>Discuss a Project</span>
                <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
              </a>
              <a href={withBasePath("/#experience")} className={styles.btnSecondary}>
                View My Experience
              </a>
            </div>

            {/* Single-Line Technical Expertise Strip with Isometric Cube Icon */}
            <div className={styles.techStripWrap} aria-label="Core technical capabilities">
              <div className={styles.techIconWrap} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className={styles.techStrip}>
                <span className={styles.techGroup}>PYTHON &middot; JAVA &middot; AWS</span>
                <span className={styles.techPipe} aria-hidden="true">|</span>
                <span className={styles.techGroup}>AI AGENTS &middot; RAG &middot; DISTRIBUTED SYSTEMS</span>
              </div>
            </div>
          </div>

          {/* Column 2: Architectural Compass Backdrop & Studio Portrait (~44% Desktop, Order 2 on Mobile) */}
          <div className={styles.portraitColumn}>
            <div className={styles.portraitStage}>
              {/* Warm Bronze Studio Radial Spotlight */}
              <div className={styles.portraitGlow} aria-hidden="true" />

              {/* Precision Architectural Compass & Drafting Crosshairs */}
              <svg
                className={styles.compassBackdrop}
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="compassRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E6C387" stopOpacity="0.62" />
                    <stop offset="50%" stopColor="#D4AA67" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#9E783B" stopOpacity="0.18" />
                  </linearGradient>
                  <radialGradient id="compassInnerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4AA67" stopOpacity="0.18" />
                    <stop offset="65%" stopColor="#D4AA67" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#0B0D0E" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Inner warm radial wash inside compass */}
                <circle cx="300" cy="310" r="245" fill="url(#compassInnerGlow)" />

                {/* Extended architectural drafting grid lines */}
                <line x1="15" y1="310" x2="585" y2="310" stroke="rgba(212, 170, 103, 0.22)" strokeWidth="1" />
                <line x1="300" y1="20" x2="300" y2="590" stroke="rgba(212, 170, 103, 0.16)" strokeWidth="1" />

                {/* Secant / chord drafting lines */}
                <line x1="127" y1="40" x2="127" y2="580" stroke="rgba(212, 170, 103, 0.13)" strokeWidth="0.85" />
                <line x1="473" y1="40" x2="473" y2="580" stroke="rgba(212, 170, 103, 0.13)" strokeWidth="0.85" />
                <line x1="30" y1="137" x2="570" y2="137" stroke="rgba(212, 170, 103, 0.11)" strokeWidth="0.85" />
                <line x1="30" y1="483" x2="570" y2="483" stroke="rgba(212, 170, 103, 0.11)" strokeWidth="0.85" />

                {/* 45-degree diagonal drafting rays */}
                <line x1="95" y1="105" x2="505" y2="515" stroke="rgba(212, 170, 103, 0.12)" strokeWidth="0.85" />
                <line x1="505" y1="105" x2="95" y2="515" stroke="rgba(212, 170, 103, 0.12)" strokeWidth="0.85" />

                {/* Outer Primary Gold Compass Ring */}
                <circle
                  cx="300"
                  cy="310"
                  r="245"
                  stroke="url(#compassRingGrad)"
                  strokeWidth="1.5"
                />

                {/* Inner Secondary Concentric Ring */}
                <circle
                  cx="300"
                  cy="310"
                  r="198"
                  stroke="rgba(212, 170, 103, 0.24)"
                  strokeWidth="1"
                />

                {/* Precision intersection node markers & crosshairs */}
                <circle cx="127" cy="137" r="2.2" fill="#D4AA67" fillOpacity="0.55" />
                <circle cx="473" cy="137" r="2.2" fill="#D4AA67" fillOpacity="0.55" />
                <circle cx="55" cy="310" r="2.2" fill="#D4AA67" fillOpacity="0.55" />
                <circle cx="545" cy="310" r="2.2" fill="#D4AA67" fillOpacity="0.55" />
                {/* Small "+" calibration mark on upper-right arc */}
                <path
                  d="M498 158H508M503 153V163"
                  stroke="#D4AA67"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Seamless Portrait Grounded into the Canvas */}
              <div className={styles.portraitCanvas}>
                <Image
                  src={withBasePath("/img/profile/hero-portrait.webp")}
                  alt="Uzair Khatri - AI Systems Architect"
                  width={1200}
                  height={1500}
                  className={styles.portraitImg}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 860px) 90vw, (max-width: 1280px) 44vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
