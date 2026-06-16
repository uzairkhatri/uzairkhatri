import styles from "./ManifestoAndStats.module.css";
import AnimatedCounter from "./AnimatedCounter";
import { BOOKING_URL } from "./siteLinks";

export default function ManifestoAndStats() {
  return (
    <section className={`${styles.section} reveal-section`} aria-label="Manifesto & production track record dashboard">
      <div className={styles.shell}>
        
        {/* Left Column: The Pitch (Manifesto) & Orbit Map */}
        <div className={styles.leftColumn}>
          <div className={`section-eyebrow ${styles.eyebrow}`}>
            <span />
            Manifesto
          </div>
          <div className={styles.copy}>
            <h2>Most AI systems fail around the model, not inside it.</h2>
            <span>I design the layer that makes the model survivable.</span>
          </div>
          <div className={styles.systemMap} aria-hidden="true">
            <span className={styles.orbitOuter} />
            <span className={styles.orbitMiddle} />
            <span className={styles.orbitInner} />
            <span className={styles.connectionA} />
            <span className={styles.connectionB} />
            <span className={styles.connectionC} />
            <span className={styles.connectionD} />
            <span className={styles.model}>Model</span>
            <span className={`${styles.node} ${styles.nodeA}`}>Observability</span>
            <span className={`${styles.node} ${styles.nodeB}`}>Retries</span>
            <span className={`${styles.node} ${styles.nodeC}`}>State</span>
            <span className={`${styles.node} ${styles.nodeD}`}>Cost</span>
            <span className={styles.hudLabel}>Production layer</span>
          </div>
        </div>

        {/* Right Column: The Proof (Stats) & Sparkline */}
        <div className={styles.rightColumn}>
          <div className={`section-eyebrow ${styles.eyebrow}`}>
            <span />
            Proof
          </div>
          
          <div className={styles.context}>
            <h3 className={styles.title}>Proven Track Record of Production Scale</h3>
            <p className={styles.description}>
              Over 10 years of experience designing high-throughput infrastructure, orchestrating multi-agent runtimes, and deploying resilient systems that survive real-world traffic.
            </p>
            <a href={BOOKING_URL} className={styles.cta} target="_blank" rel="noreferrer">
              Talk to expert &rarr;
            </a>
            
            <div className={styles.graphContainer} aria-hidden="true">
              <svg viewBox="0 0 300 100" className={styles.sparkline}>
                <defs>
                  <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area under the path */}
                <path 
                  d="M 10 75 Q 35 60 60 70 T 110 50 T 160 65 T 210 40 T 260 55 T 290 15 L 290 100 L 10 100 Z" 
                  fill="url(#sparkline-grad)" 
                />
                {/* Drawing line */}
                <path 
                  d="M 10 75 Q 35 60 60 70 T 110 50 T 160 65 T 210 40 T 260 55 T 290 15" 
                  fill="none" 
                  stroke="var(--gold)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className={styles.sparklinePath}
                />
              </svg>
            </div>
          </div>

          <div className={styles.metricsStage}>
            {/* Highlight Metric */}
            <div className={styles.highlightStat}>
              <strong className={styles.highlightValue}>
                <AnimatedCounter value="10+" />
              </strong>
              <span className={styles.highlightLabel}>years of architecture experience</span>
              <svg viewBox="0 0 100 30" className={styles.miniSparkline} aria-hidden="true">
                <defs>
                  <linearGradient id="mini-grad-highlight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0,22 Q 25,10 50,18 T 100,2" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 0,22 Q 25,10 50,18 T 100,2 L 100,30 L 0,30 Z" fill="url(#mini-grad-highlight)" />
              </svg>
            </div>

            {/* 2x2 Grid */}
            <div className={styles.grid}>
              <div className={styles.gridItem}>
                <strong className={styles.gridValue}>
                  <AnimatedCounter value="25+" />
                </strong>
                <span className={styles.linkLabel}>production-deployed systems</span>
                <svg viewBox="0 0 100 30" className={styles.miniSparkline} aria-hidden="true">
                  <defs>
                    <linearGradient id="mini-grad-1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,25 Q 20,20 40,8 T 80,14 T 100,2" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 0,25 Q 20,20 40,8 T 80,14 T 100,2 L 100,30 L 0,30 Z" fill="url(#mini-grad-1)" />
                </svg>
              </div>
              <div className={styles.gridItem}>
                <strong className={styles.gridValue}>
                  <AnimatedCounter value="95%" />
                </strong>
                <span className={styles.linkLabel}>success rate under peak load</span>
                <svg viewBox="0 0 100 30" className={styles.miniSparkline} aria-hidden="true">
                  <defs>
                    <linearGradient id="mini-grad-2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,18 Q 30,12 60,24 T 100,8" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 0,18 Q 30,12 60,24 T 100,8 L 100,30 L 0,30 Z" fill="url(#mini-grad-2)" />
                </svg>
              </div>
              <div className={styles.gridItem}>
                <strong className={styles.gridValue}>
                  <AnimatedCounter value="3" />
                </strong>
                <span className={styles.linkLabel}>active named ai agents</span>
                <svg viewBox="0 0 100 30" className={styles.miniSparkline} aria-hidden="true">
                  <defs>
                    <linearGradient id="mini-grad-3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,28 Q 25,22 50,8 T 100,16" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 0,28 Q 25,22 50,8 T 100,16 L 100,30 L 0,30 Z" fill="url(#mini-grad-3)" />
                </svg>
              </div>
              <div className={styles.gridItem}>
                <strong className={styles.gridValue}>
                  <AnimatedCounter value="0" />
                </strong>
                <span className={styles.linkLabel}>unproven prototype demos</span>
                <svg viewBox="0 0 100 30" className={styles.miniSparkline} aria-hidden="true">
                  <defs>
                    <linearGradient id="mini-grad-4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,4 Q 40,6 80,4 T 100,26" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 0,4 Q 40,6 80,4 T 100,26 L 100,30 L 0,30 Z" fill="url(#mini-grad-4)" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
