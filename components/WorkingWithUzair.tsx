import Image from "next/image";
import styles from "./WorkingWithUzair.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

export default function WorkingWithUzair() {
  return (
    <section className={`${styles.section} reveal-section`} id="partner" aria-label="Working with Uzair Khatri">
      <div className={styles.shell}>
        <div className={styles.grid}>
          
          <div className={styles.textColumn}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Direct Engineering Partnership
            </div>

            <h2 className={styles.headline}>
              I work where <em>prototypes meet production.</em>
            </h2>

            <p className={styles.lead}>
              You don&apos;t hire a layer of account managers or theoretical slide decks.
              When we partner, you work directly with me.
            </p>

            <div className={styles.bodyCopy}>
              <p>
                <strong>Embedded in your pull requests:</strong> I jump directly into your repository, isolate architectural failure points, and work alongside your lead engineers to implement the critical path—from multi-agent state graphs to Redis concurrency locks.
              </p>
              <p>
                <strong>Zero black-box code:</strong> My goal is to make your engineering team autonomous, not dependent. Every runtime boundary and retry queue is documented with comprehensive telemetry dashboards, tracing, and operational failure playbooks.
              </p>
              <p>
                <strong>14+ years of production battle-scars:</strong> Having scaled systems through high-concurrency traffic, fintech ledgers, and enterprise insurance compliance, I help you avoid overbuilding what you don&apos;t need—and make sure what you do ship stays reliable under real user load.
              </p>
            </div>

            <div className={styles.actions}>
              <a 
                href={BOOKING_URL} 
                className={styles.primaryCta} 
                target="_blank" 
                rel="noreferrer"
              >
                Book 30-Min Architecture Call &rarr;
              </a>
              <a href={withBasePath("/services/ai-systems/")} className={styles.secondaryCta}>
                Review engagement models &darr;
              </a>
            </div>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.portraitStage}>
              <Image
                src={withBasePath("/img/profile/hero-portrait.webp")}
                alt="Uzair Khatri — AI Production Architect"
                width={700}
                height={875}
                className={styles.portraitImage}
                priority={false}
              />
              <div className={styles.portraitBadge}>
                <div className={styles.badgeTag}>
                  <span className={styles.badgePulse} aria-hidden="true" />
                  Direct Access &bull; Selective Builds
                </div>
                <span className={styles.badgeName}>Uzair Khatri</span>
                <span className={styles.badgeRole}>AI Production Architect &bull; Systems Lead</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
