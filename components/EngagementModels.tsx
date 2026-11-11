"use client";

import React from "react";
import styles from "./EngagementModels.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "./siteLinks";

interface ServiceItem {
  number: string;
  category: string;
  title: string;
  problem: string;
  help: string;
  tech: string[];
  linkText: string;
  linkHref: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    category: "AI & AGENTIC ARCHITECTURE",
    title: "Production AI & Agentic Systems",
    problem:
      "Your AI prototype works, but making it reliable, testable, and cost-effective in production is difficult.",
    help:
      "AI agent orchestration, RAG architectures, evaluation, guardrails, failure recovery, and LLM cost controls.",
    tech: ["Python", "LangGraph", "RAG", "LLM APIs", "AWS"],
    linkText: "Explore AI Systems",
    linkHref: "/services/ai-systems/",
  },
  {
    number: "02",
    category: "DISTRIBUTED BACKEND & CONCURRENCY",
    title: "Backend & Distributed Systems",
    problem:
      "Your platform needs to handle growth, concurrency, integrations, and failures without becoming fragile.",
    help:
      "Backend architecture, APIs, asynchronous processing, event-driven workflows, caching, reliability, and performance optimization.",
    tech: ["Java", "Python", "Redis", "PostgreSQL/MySQL", "AWS", "Docker"],
    linkText: "Explore SaaS Architecture",
    linkHref: "/services/saas-architecture/",
  },
  {
    number: "03",
    category: "ENTERPRISE SYSTEMS & MODERNIZATION",
    title: "Enterprise Architecture & Integrations",
    problem:
      "Existing systems, databases, and business processes need to work together without introducing operational risk.",
    help:
      "Enterprise integration architecture, workflow automation, system modernization, secure data flows, and technical delivery planning.",
    tech: ["APIs", "Message Queues", "Cloud Infrastructure", "Databases", "Enterprise Systems"],
    linkText: "View Enterprise Architecture",
    linkHref: "/work/efu-life/",
  },
];

interface EngagementTier {
  kicker: string;
  title: string;
  priceBadge: string;
  description: string;
  scopeNote: string;
  ctaText: string;
  ctaHref: string;
  isExternal?: boolean;
  featured?: boolean;
  source: string;
}

const engagementTiers: EngagementTier[] = [
  {
    kicker: "FREE DISCOVERY",
    title: "30-Minute Architecture Discovery Call",
    priceBadge: "FREE · 30 MIN",
    description:
      "An initial conversation to understand your system architecture, identify critical bottlenecks or failure risks, and agree on an appropriate next step.",
    scopeNote:
      "A focused conversation to understand your system and agree on an appropriate next step. No written deliverable is promised.",
    ctaText: "Book a 30-Minute Discovery Call",
    ctaHref: BOOKING_URL,
    isExternal: true,
    featured: false,
    source: "engagement_discovery_call",
  },
  {
    kicker: "PAID ARCHITECTURE REVIEW",
    title: "Production Architecture Pre-Mortem",
    priceBadge: "$250 · 48-HR TURNAROUND",
    description:
      "Fixed-scope review of one agreed technical problem. Includes 3–5 pages of prioritized findings (Risk Priority Matrix P0/P1/P2), recommended remediation approaches (no repository access required), and a 30-minute walkthrough.",
    scopeNote:
      "Scope agreed before payment. Delivered within 48 hours after scope acceptance, receipt of complete materials, and confirmed availability.",
    ctaText: "Request an Architecture Review",
    ctaHref: "/audit/",
    isExternal: false,
    featured: true,
    source: "engagement_pre_mortem_audit",
  },
  {
    kicker: "IMPLEMENTATION & ADVISORY",
    title: "Engineering Implementation & Advisory",
    priceBadge: "CUSTOM QUOTE",
    description:
      "Hands-on backend delivery, production AI system implementation, architecture remediation, and technical leadership tailored to your operational requirements.",
    scopeNote:
      "Custom scope and pricing based on agreed milestones and deliverables.",
    ctaText: "Discuss Your Project",
    ctaHref: BOOKING_URL,
    isExternal: true,
    featured: false,
    source: "engagement_implementation_advisory",
  },
];

export default function EngagementModels() {
  return (
    <section
      className={styles.section}
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Retain legacy navigation hash anchors */}
      <div
        id="capabilities"
        style={{ position: "absolute", top: 0, height: 0, width: 0 }}
        aria-hidden="true"
      />
      <div
        id="about"
        style={{ position: "absolute", top: 0, height: 0, width: 0 }}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* Section 04 Header */}
        <header className={styles.headerBlock}>
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>HOW I CAN HELP</span>
          </div>

          <h2 id="services-heading" className={styles.heading}>
            Complex Systems.{" "}
            <span className={styles.headingAccent}>Clear Solutions.</span>
          </h2>

          <p className={styles.subtitle}>
            I help teams turn difficult engineering challenges into reliable,
            maintainable systems—from production AI and backend architecture to
            integrations and performance improvements.
          </p>
        </header>

        {/* 3-Column Core Services Grid */}
        <div
          className={styles.servicesGrid}
          role="list"
          aria-label="Core Engineering Services"
        >
          {services.map((svc) => (
            <article
              key={svc.number}
              className={styles.serviceCard}
              role="listitem"
            >
              <div className={styles.serviceCardHeader}>
                <span className={styles.serviceNumber}>[{svc.number}]</span>
                <span className={styles.serviceCategory}>{svc.category}</span>
              </div>

              <h3 className={styles.serviceTitle}>{svc.title}</h3>

              <div className={styles.serviceBody}>
                <div className={styles.problemBox}>
                  <strong className={styles.boxLabel}>THE CHALLENGE</strong>
                  <p className={styles.boxText}>{svc.problem}</p>
                </div>

                <div className={styles.helpBox}>
                  <strong className={styles.boxLabelGold}>HOW I HELP</strong>
                  <p className={styles.boxText}>{svc.help}</p>
                </div>
              </div>

              <div className={styles.serviceCardFooter}>
                <div
                  className={styles.techPillsList}
                  aria-label={`Technologies for ${svc.title}`}
                >
                  {svc.tech.map((t) => (
                    <span key={t} className={styles.techPill}>
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={withBasePath(svc.linkHref)}
                  className={styles.serviceLink}
                  aria-label={`${svc.linkText} for ${svc.title}`}
                >
                  <span>{svc.linkText}</span>
                  <span className={styles.linkArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Engagement Models Sub-Section */}
        <div className={styles.engagementSection}>
          <div className={styles.engagementHeader}>
            <div className={styles.subEyebrow}>ENGAGEMENT</div>
            <h3 className={styles.engagementHeading}>
              Ways We Can Work Together
            </h3>
            <p className={styles.engagementSub}>
              From a focused 30-minute discovery call to fixed-scope architecture
              pre-mortems and hands-on implementation sprints.
            </p>
          </div>

          <div
            className={styles.engagementsGrid}
            role="list"
            aria-label="Ways to engage"
          >
            {engagementTiers.map((tier) => {
              const targetHref = tier.isExternal
                ? tier.ctaHref
                : withBasePath(tier.ctaHref);

              return (
                <article
                  key={tier.kicker}
                  className={`${styles.engagementCard} ${
                    tier.featured ? styles.engagementCardFeatured : ""
                  }`}
                  role="listitem"
                >
                  <div className={styles.engagementCardHeader}>
                    <span className={styles.engagementKicker}>
                      {tier.kicker}
                    </span>
                    <span
                      className={`${styles.engagementPriceBadge} ${
                        tier.featured ? styles.priceBadgeGold : ""
                      }`}
                    >
                      {tier.priceBadge}
                    </span>
                  </div>

                  <h4 className={styles.engagementTitle}>{tier.title}</h4>
                  <p className={styles.engagementDesc}>{tier.description}</p>

                  <div className={styles.scopeNoteBox}>
                    <span className={styles.scopeDot} aria-hidden="true" />
                    <span className={styles.scopeNoteText}>
                      {tier.scopeNote}
                    </span>
                  </div>

                  <a
                    href={targetHref}
                    target={tier.isExternal ? "_blank" : undefined}
                    rel={tier.isExternal ? "noreferrer" : undefined}
                    data-source={tier.source}
                    className={
                      tier.featured
                        ? styles.engagementBtnGold
                        : styles.engagementBtnOutline
                    }
                    aria-label={`${tier.ctaText} — ${tier.title}`}
                  >
                    <span>{tier.ctaText}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        {/* Recruiter & Direct Inquiries Pathway */}
        <div className={styles.recruiterPathway}>
          <div className={styles.recruiterTextWrap}>
            <span className={styles.recruiterPrompt}>
              Recruiting or hiring for a Senior / Principal Engineering role?
            </span>
            <span className={styles.recruiterSubtext}>
              Review my 14+ years of engineering leadership, verified case
              studies, and technical CV.
            </span>
          </div>

          <div className={styles.recruiterActions}>
            <a
              href={withBasePath("/case-studies/")}
              className={styles.recruiterBtnOutline}
            >
              <span>Case Studies</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className={styles.recruiterBtnGold}
            >
              <span>View CV (PDF)</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
