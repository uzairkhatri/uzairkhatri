import type { ReactNode } from "react";
import styles from "./FeaturedLanding.module.css";
import { BOOKING_URL, CV_URL, EMAIL_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

type Stat = { value: string; label: string };
type Card = { eyebrow?: string; title: string; text: string; href?: string; linkLabel?: string };
type Step = { number: string; title: string; text: string };

type FeaturedLandingProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  proof: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats: Stat[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro?: string;
  cards: Card[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: Step[];
  closingTitle: string;
  closingText: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h10M10 5l4 4-4 4" />
    </svg>
  );
}

export default function FeaturedLanding({
  eyebrow,
  title,
  intro,
  proof,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  stats,
  sectionEyebrow,
  sectionTitle,
  sectionIntro,
  cards,
  stepsEyebrow,
  stepsTitle,
  steps,
  closingTitle,
  closingText,
}: FeaturedLandingProps) {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Page navigation">
        <a href={withBasePath("/")} aria-label="Uzair Khatri home"><Logo compact /></a>
        <div className={styles.navLinks}>
          <a href={withBasePath("/services/ai-systems/")}>Services</a>
          <a href={withBasePath("/case-studies/")}>Case Studies</a>
          <a href={withBasePath("/#work")}>Work</a>
          <a href={CV_URL} target="_blank" rel="noreferrer">CV</a>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.navCta}>Book a call</a>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={primaryHref} target={primaryHref.startsWith("http") ? "_blank" : undefined} rel={primaryHref.startsWith("http") ? "noreferrer" : undefined}>
              {primaryLabel}<ArrowIcon />
            </a>
            {secondaryLabel && secondaryHref ? (
              <a
                className={styles.secondary}
                href={secondaryHref}
                target={secondaryHref.startsWith("http") ? "_blank" : undefined}
                rel={secondaryHref.startsWith("http") ? "noreferrer" : undefined}
              >
                {secondaryLabel}
              </a>
            ) : null}
          </div>
          <p className={styles.proof}>{proof}</p>
          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.lightSection}>
        <div className={styles.sectionInner}>
          <p className={styles.darkEyebrow}>{sectionEyebrow}</p>
          <div className={styles.sectionHeading}>
            <h2>{sectionTitle}</h2>
            {sectionIntro ? <p>{sectionIntro}</p> : null}
          </div>
          <div className={styles.cardGrid}>
            {cards.map((card) => (
              <article className={styles.card} key={card.title}>
                {card.eyebrow ? <span>{card.eyebrow}</span> : null}
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                {card.href && card.linkLabel ? (
                  <a href={card.href}>{card.linkLabel}<ArrowIcon /></a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>{stepsEyebrow}</p>
          <h2 className={styles.darkTitle}>{stepsTitle}</h2>
          <div className={styles.steps}>
            {steps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.closingInner}>
          <div>
            <p className={styles.eyebrow}>Start with clarity</p>
            <h2>{closingTitle}</h2>
            <p>{closingText}</p>
          </div>
          <div className={styles.closingActions}>
            <a className={styles.primary} href={BOOKING_URL} target="_blank" rel="noreferrer">Book a 30-minute call<ArrowIcon /></a>
            <a className={styles.email} href={EMAIL_URL}>Email Uzair</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Logo compact />
        <span>AI systems architect · Karachi · Working globally</span>
        <a href={withBasePath("/")}>Back to portfolio</a>
      </footer>
    </main>
  );
}
