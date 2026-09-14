import React from "react";
import styles from "./EcosystemLogos.module.css";

interface EcosystemBrand {
  name: string;
  domain: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

const ecosystems: EcosystemBrand[] = [
  {
    name: "EFU Life",
    domain: "Enterprise Core Systems",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Jubilee Life",
    domain: "Regulated Workflows",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 12h10M12 7v10" />
      </svg>
    ),
  },
  {
    name: "Savyour",
    domain: "60k+ DAU Fintech Platform",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    name: "Wellows",
    domain: "Healthtech SaaS",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "ClassFlow",
    domain: "AI Assessment Runtime",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    name: "IBM FileNet",
    domain: "Enterprise ECM & Ingestion",
    icon: ({ className }) => (
      <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h4M6 12h12M6 16h8" />
      </svg>
    ),
  },
];

export default function EcosystemLogos() {
  return (
    <section className={styles.ecosystemStrip} aria-label="Enterprise client and system ecosystems">
      <div className={styles.shell}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          <span>ENGINEERED SYSTEMS ACROSS REGULATED ENTERPRISE &amp; HIGH-SCALE PLATFORMS</span>
        </div>
        <div className={styles.logoGrid}>
          {ecosystems.map((eco) => {
            const Icon = eco.icon;
            return (
              <div key={eco.name} className={styles.logoItem} title={`${eco.name} — ${eco.domain}`}>
                <div className={styles.logoIcon} aria-hidden="true">
                  <Icon />
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>{eco.name}</span>
                  <span className={styles.logoDomain}>{eco.domain}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
