import type { Metadata } from "next";
import styles from "../wellows/page.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import ProjectVisual from "@/components/ProjectVisual";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const ogImage = "https://uzairkhatri.com/linkedin-featured/case-studies.png";

export const metadata: Metadata = {
  title: "Savyour Case Study — High-Throughput Fintech SaaS Ledger",
  description:
    "How Uzair Khatri architected high-throughput webhook ingestion, double-entry financial ledgers, and hierarchical Redis caching for Savyour's 650+ partner cashback platform.",
  alternates: {
    canonical: "https://uzairkhatri.com/work/savyour/",
  },
  openGraph: {
    title: "Savyour Case Study — High-Throughput Fintech SaaS Ledger",
    description: "High-throughput webhook ingestion, double-entry financial ledgers, and hierarchical Redis caching for Savyour's cashback platform.",
    url: "https://uzairkhatri.com/work/savyour/",
    images: [{ url: ogImage, width: 1200, height: 627, alt: "Savyour Architecture Case Study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savyour Case Study — High-Throughput Fintech SaaS Ledger",
    description: "High-throughput webhook ingestion, double-entry financial ledgers, and hierarchical Redis caching for Savyour's cashback platform.",
    images: [ogImage],
  },
};

function BackIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4 6 9l5 5" />
    </svg>
  );
}

const decisions = [
  {
    title: "Idempotent Webhook Processing via HMAC & Redis Keys",
    problem:
      "650+ affiliate networks and merchant partners dispatch webhook notifications with unpredictable retry behaviors, out-of-order deliveries, and duplicate payloads that threatened wallet double-crediting.",
    decision:
      "Engineered an ingestion barrier verifying HMAC-SHA256 partner signatures and enforcing deterministic idempotency keys via Redis atomic operations (SETNX with 72-hour TTL) before entering async task queues.",
    tradeoff:
      "Added ~15ms of ingestion verification latency, but mathematically eliminated duplicate transaction credits across millions of webhook events.",
  },
  {
    title: "Immutable Double-Entry Ledger with Serializable PostgreSQL",
    problem:
      "Concurrent transaction events (crediting cashback while users initiated bank withdrawals) risked balance drift, race condition exploits, and non-reconcilable financial discrepancies.",
    decision:
      "Implemented a strict double-entry bookkeeping ledger where user balances are computed from immutable credit/debit transaction lines under PostgreSQL Serializable isolation levels.",
    tradeoff:
      "Requires rigorous transaction isolation and advisory locks on hot accounts, but guarantees 100% financial audit integrity.",
  },
  {
    title: "Two-Tier Hierarchical Redis Invalidation Architecture",
    problem:
      "Shopping festival surges caused millions of concurrent database queries against brand commission tables, partnership tiers, and user balance caches, threatening database saturation.",
    decision:
      "Designed a hierarchical Redis caching architecture with namespace-level invalidation triggered via admin partner updates and probabilistic early expiration (XFetch) to prevent cache stampedes.",
    tradeoff:
      "Cache eviction patterns require exact key hygiene across microservices, but achieved a sustained 99.4% cache hit ratio during peak campaigns.",
  },
  {
    title: "Decoupled Asynchronous Payout Outbox Engine",
    problem:
      "Third-party banking APIs and 1-Link payout gateways frequently timed out or rate-limited requests during high-volume withdrawal windows, blocking client threads.",
    decision:
      "Implemented the Transactional Outbox pattern, queueing payout jobs in Celery/RabbitMQ with exponential backoff, jittered retries, and automated operator dead-letter escalation.",
    tradeoff:
      "Payouts execute asynchronously with a 1-2 minute verification window rather than synchronous execution, but unhandled gateway failures dropped to zero.",
  },
];

const constraints = [
  {
    label: "Latency SLA",
    title: "<50ms P95 Balance Lookups",
    text: "Consumer mobile app users expected real-time wallet balance displays, preventing expensive dynamic balance aggregations on every user screen load.",
  },
  {
    label: "Ledger Consistency",
    title: "Double-Entry Balance Accounting",
    text: "Zero financial discrepancy tolerance across millions of historical user reward line items and merchant commission credits.",
  },
  {
    label: "Throughput Resilience",
    title: "Burst Ingestion Capacity",
    text: "Mega-sale campaigns (11.11 / Black Friday) generated 5,000+ simultaneous webhook hits from partner networks that could not be dropped or delayed.",
  },
];

const failureModes = [
  {
    tag: "Failure Mode 01",
    title: "Duplicate Affiliate Conversion Webhooks",
    impact: "Network retries from merchant affiliate networks crediting the consumer's wallet multiple times for a single order.",
    defense: "HMAC request signature verification coupled with atomic Redis idempotent key caches (7-day TTL). Duplicate requests resolve to cached 200 OK without reaching the database.",
  },
  {
    tag: "Failure Mode 02",
    title: "Database Lock Contention on Balances",
    impact: "Multiple cashback events trying to mutate the same user's balance row concurrently, leading to transaction rollbacks.",
    defense: "Immutable append-only ledger architecture. New transactions write new credit/debit journal rows with zero row locks on user profiles, with balances projected asynchronously.",
  },
  {
    tag: "Failure Mode 03",
    title: "Redis Eviction & Cache Stampede",
    impact: "Sudden cache invalidation on popular brand commission rates triggering hundreds of simultaneous PostgreSQL queries.",
    defense: "Hierarchical cache warming with probabilistic early expiration (XFetch) and distributed mutex locking on cache misses to ensure only one worker re-queries PostgreSQL.",
  },
  {
    tag: "Failure Mode 04",
    title: "Order Return Fraud & Chargebacks",
    impact: "Consumers collecting cashback and immediately cancelling the purchase on the merchant's store.",
    defense: "Two-phase settlement state machine (Pending -> Verified -> Cleared). Cashback remains locked in escrow until the merchant's return dispute window expires.",
  },
];

const timeline = [
  ["Week 1-2", "Financial architecture and risk discovery. Audited affiliate webhook endpoints, mapped double-credit vulnerabilities, and designed the immutable ledger schema."],
  ["Week 3-4", "Built the idempotent ingestion gateway: HMAC validation, Redis atomic deduplication locks, and high-throughput SQS ingestion buffers."],
  ["Week 5-6", "Engineered double-entry ledger backend: PostgreSQL Serializable transaction boundaries, debit/credit audit logging, and automated balancing triggers."],
  ["Week 7-8", "Designed hierarchical Redis caching layers: brand commission caches, user balance projections, and cache stampede protection."],
  ["Week 9-10", "Built payout outbox engine: asynchronous 1-Link bank gateway adapters, retry state machines, and dead-letter reconciliation playbooks."],
  ["Week 11-12", "Load testing with 5,000+ concurrent simulated webhook bursts, chaos engineering on database failover, and zero-downtime cutover."],
  ["Week 13-14", "Telemetry dashboards, automated discrepancy alarms, security penetration testing, and engineering team handoff."],
];

const outcomes = [
  {
    value: "650+",
    label: "Integrated brand partners",
    note: "Supported across Daraz, Foodpanda, local retailers, and international affiliate networks without ingestion failures.",
  },
  {
    value: "99.4%",
    label: "Cache hit ratio",
    note: "Sustained cache hit rate on high-velocity brand commission queries during national shopping campaigns.",
  },
  {
    value: "<50ms",
    label: "P95 wallet query latency",
    note: "Sub-50ms balance retrieval latency under high concurrent mobile consumer traffic.",
  },
  {
    value: "100%",
    label: "ACID ledger reconciliation",
    note: "Zero financial balance discrepancies across millions of double-entry ledger line items.",
  },
];

export default function SavyourCaseStudy() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Selected Work", url: "https://uzairkhatri.com/#work" },
          { name: "Savyour Case Study", url: "https://uzairkhatri.com/work/savyour/" },
        ]}
      />
      <TechArticleJsonLd
        title="Savyour Case Study — High-Throughput Fintech SaaS Ledger"
        description="How Uzair Khatri architected high-throughput webhook ingestion, double-entry financial ledgers, and hierarchical Redis caching for Savyour's 650+ partner cashback platform."
        url="https://uzairkhatri.com/work/savyour/"
        image="https://uzairkhatri.com/linkedin-featured/case-studies.png"
      />
      <nav className={styles.topNav}>
        <a href={withBasePath("/")} className={styles.back}>
          <BackIcon />
          Uzair Khatri
        </a>
        <div className={styles.topNavRight}>
          <a href={withBasePath("/insights/")} className={styles.topNavLink}>
            Insights
          </a>
          <a href={withBasePath("/#work")} className={styles.topNavLink}>
            All work
          </a>
          <a href={CV_URL} target="_blank" rel="noreferrer" className={styles.topNavLink}>
            CV
          </a>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.topNavCta}>
            Book call
          </a>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.tag}>Fintech / Rewards</span>
              <span className={styles.tag}>14-week delivery</span>
              <span className={styles.tag}>Solutions Architect</span>
            </div>
            <h1 className={styles.heroTitle}>
              Savyour <span style={{ display: "block", fontSize: "0.5em", color: "var(--gold-bright)", fontWeight: 700, marginTop: "0.35rem", letterSpacing: "0.02em" }}>High-Throughput Fintech SaaS Ledger</span>
            </h1>
            <p className={styles.heroSub}>Enterprise Cashback &amp; Affiliate Ecosystem</p>
            <p className={styles.heroDesc}>
              How I architected high-throughput webhook ingestion, double-entry financial ledgers,
              and hierarchical Redis caching for a consumer rewards platform serving 650+ brand partners
              and millions of monthly transactions.
            </p>
            <div className={styles.heroFacts}>
              <span><strong>650+</strong> brand partners</span>
              <span><strong>99.4%</strong> cache hit ratio</span>
              <span><strong>&lt;50ms</strong> P95 wallet query</span>
            </div>
          </div>
          <ProjectVisual type="savyour" variant="hero" />
        </div>
      </header>

      <section className={styles.section} aria-label="The problem">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The problem</p>
          <h2 className={styles.sectionTitle}>
            Affiliate webhooks are noisy, duplicated, and financially dangerous.
          </h2>
          <div className={styles.prose}>
            <p>
              Savyour operates at the intersection of hundreds of affiliate networks and consumer wallets.
              When a major shopping festival launched, merchant partners hammered the backend with hundreds
              of thousands of status updates, purchase confirmations, and order cancellations.
            </p>
            <p>
              A single duplicate webhook processing bug would credit real money to a user&apos;s wallet twice.
              Without immutable double-entry bookkeeping, auditing where money entered and exited the system
              required manual database forensic queries.
            </p>
            <p>
              The challenge was to engineer a high-concurrency ingestion barrier that validates signatures,
              guarantees idempotency, maintains absolute ledger consistency, and scales reads seamlessly.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Operating constraints">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Operating constraints</p>
          <h2 className={styles.sectionTitleLight}>
            The financial rules that governed every database transaction.
          </h2>
          <p className={styles.sectionDescLight}>
            When an application handles real money, architectural shortcuts result in regulatory penalties
            and balance corruption. These constraints defined our technical boundaries.
          </p>
          <div className={styles.constraintsGrid}>
            {constraints.map((c) => (
              <div className={styles.constraintCard} key={c.label}>
                <span className={styles.constraintLabel}>{c.label}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Architecture decisions">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Architecture decisions</p>
          <h2 className={styles.sectionTitleLight}>
            Designing for zero financial drift and high-throughput ingestion.
          </h2>
          <p className={styles.sectionDescLight}>
            Every architectural boundary prioritized mathematical auditability, cryptographic payload
            verification, and system resilience under volatile third-party traffic surges.
          </p>
          <div className={styles.decisionGrid}>
            {decisions.map((decision) => (
              <article className={styles.decisionCard} key={decision.title}>
                <h3>{decision.title}</h3>
                <div className={styles.decisionBlock}>
                  <span>Problem</span>
                  <p>{decision.problem}</p>
                </div>
                <div className={styles.decisionBlock}>
                  <span>Decision</span>
                  <p>{decision.decision}</p>
                </div>
                <div className={styles.decisionBlock}>
                  <span>Tradeoff accepted</span>
                  <p>{decision.tradeoff}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="System architecture">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>System architecture</p>
          <h2 className={styles.sectionTitle}>How the financial pipeline flows.</h2>
          <div className={styles.diagram}>
            <div className={styles.diagramLabel}>Financial Ingestion &amp; Ledger Security Boundary</div>
            <div className={styles.diagramBody}>
              <div className={styles.diagramRow}>
                <div className={styles.diagramNode}>
                  <strong>650+ Partner Webhooks</strong>
                  <span>Affiliate networks &amp; merchants</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={`${styles.diagramNode} ${styles.diagramCore}`}>
                  <strong>HMAC &amp; Idempotency Gate</strong>
                  <span>SHA-256 validation &amp; Redis SETNX</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramAgents}>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Async Task Queue (Celery)</strong>
                    <span>Decoupled event calculation &amp; commission splits</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Two-Tier Redis Cache</strong>
                    <span>Sub-50ms brand tiers &amp; balance reads</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Payout Outbox Engine</strong>
                    <span>Bank &amp; 1-Link gateway dispatch queue</span>
                  </div>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramNode}>
                  <strong>Double-Entry Ledger Store</strong>
                  <span>PostgreSQL Serializable ACID records</span>
                </div>
              </div>

              <div className={styles.diagramInfra}>
                <div className={styles.diagramInfraItem}>
                  <span>Redis Sentinel</span>
                  <p>Idempotency &amp; cache cluster</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>PostgreSQL RDS</span>
                  <p>ACID double-entry ledger</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>RabbitMQ / Celery</span>
                  <p>Async transaction queues</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>Bank &amp; 1-Link APIs</span>
                  <p>Disbursement endpoints</p>
                </div>
              </div>
            </div>
            <p className={styles.diagramNote}>
              Double-entry consistency guaranteed. Balance queries never read arbitrary mutable columns;
              they verify the sum of signed credit/debit entries across auditable ledger accounts.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Failure modes and defenses">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Failure modes & defenses</p>
          <h2 className={styles.sectionTitle}>
            How financial edge cases and ingestion failures are neutralized.
          </h2>
          <p className={styles.sectionDesc}>
            Financial ledgers cannot rely on optimistic assumptions. These are the worst-case failure
            scenarios pressure-tested during implementation and the concrete defenses engineered into the backend.
          </p>
          <div className={styles.failureGrid}>
            {failureModes.map((f) => (
              <article className={styles.failureCard} key={f.tag}>
                <div className={styles.failureHeader}>
                  <span className={styles.failureTag}>{f.tag}</span>
                  <h3>{f.title}</h3>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.failureLabel}>Financial Risk</span>
                  <p>{f.impact}</p>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.defenseLabel}>Architectural Defense</span>
                  <p>{f.defense}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Build timeline">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Build timeline</p>
          <h2 className={styles.sectionTitleLight}>Fourteen weeks to enterprise financial stability.</h2>
          <div className={styles.timeline}>
            {timeline.map(([period, text]) => (
              <div className={styles.timelineItem} key={period}>
                <span className={styles.timelinePeriod}>{period}</span>
                <p className={styles.timelineText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Outcomes">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Outcomes</p>
          <h2 className={styles.sectionTitle}>Hard metrics from real consumer scale.</h2>
          <p className={styles.sectionDesc}>
            Eliminated duplicate payout exploits completely while maintaining sub-50ms responsiveness
            during peak nationwide retail promotions.
          </p>
          <div className={styles.outcomeGrid}>
            {outcomes.map((outcome) => (
              <article className={styles.outcomeCard} key={outcome.value}>
                <strong className={styles.outcomeValue}>{outcome.value}</strong>
                <h3 className={styles.outcomeLabel}>{outcome.label}</h3>
                <p className={styles.outcomeNote}>{outcome.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-label="Call to action">
        <div className={styles.ctaInner}>
          <p className={styles.eyebrowLight}>Work together</p>
          <h2 className={styles.ctaTitle}>Building high-concurrency transactional systems?</h2>
          <p className={styles.ctaDesc}>
            Let&apos;s build an idempotent, verifiable data pipeline that keeps your financial records
            accurate and your customer experience instant.
          </p>
          <div className={styles.ctaActions}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.ctaPrimary}>
              Request Architecture Review
            </a>
            <a href={withBasePath("/#work")} className={styles.ctaSecondary}>
              View all work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
