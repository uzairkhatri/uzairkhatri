import type { Metadata } from "next";
import styles from "../wellows/page.module.css";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import ProjectVisual from "@/components/ProjectVisual";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";

const ogImage = "https://uzairkhatri.com/linkedin-featured/case-studies.png";

export const metadata: Metadata = {
  title: "ClassFlow Case Study — Live Tutoring Marketplace Architecture",
  description:
    "How Uzair Khatri architected ClassFlow: an automated live tutoring marketplace unifying dynamic teacher matching, distributed lock safety with Redis Redlock, and automated Stripe payouts.",
  alternates: {
    canonical: "https://uzairkhatri.com/work/classflow/",
  },
  openGraph: {
    title: "ClassFlow Case Study — Live Tutoring Marketplace Architecture",
    description: "Live tutoring marketplace platform architecture unifying dynamic matchmaking, Redis Redlock concurrency, and Stripe Connect automated ledgers.",
    url: "https://uzairkhatri.com/work/classflow/",
    images: [{ url: ogImage, width: 1200, height: 627, alt: "ClassFlow Architecture Case Study" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClassFlow Case Study — Live Tutoring Marketplace Architecture",
    description: "Live tutoring marketplace platform architecture unifying dynamic matchmaking, Redis Redlock concurrency, and Stripe Connect automated ledgers.",
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
    title: "Dynamic Matchmaking Engine vs. Manual Dispatch",
    problem:
      "Operational coordinators manually reviewed student requests, teacher subject strengths, timezone differences, and calendar slots, creating up to 4-hour booking turnaround times and frequent scheduling conflicts.",
    decision:
      "Designed a real-time heuristic scoring pipeline evaluating 3-tier weighting (timezone offsets, historical completion ratings, and active instructor workload) resolving matches in under 100ms.",
    tradeoff:
      "Algorithmic assignment requires continuous calibration of teacher load ceilings to prevent superstar burnout, but reduced match latency by 99%.",
  },
  {
    title: "Redis Distributed Mutex (Redlock) for Concurrency Safety",
    problem:
      "Peak registration bursts created race conditions where multiple students attempted to confirm bookings for the same teacher calendar window at the exact same sub-second interval.",
    decision:
      "Implemented a distributed lock pattern using Redis Redlock with a 45-second lease time and atomic lease release on checkout completion, ensuring strict mutual exclusion across nodes.",
    tradeoff:
      "Introduced a hard operational dependency on Redis cluster availability, backed by automated fallback to database row-level locking during failovers.",
  },
  {
    title: "Bidirectional WebSocket Lifecycle State Machine",
    problem:
      "Polling HTTP endpoints for classroom events (student check-in, instructor late warnings, connection drops, session completion) generated massive request volume and a 10-15s state lag.",
    decision:
      "Built a real-time event pipeline over FastAPI WebSockets paired with Redis Pub/Sub, streaming classroom state transitions and automated grace-period timers to all parties with sub-second latency.",
    tradeoff:
      "Stateful socket connections required dedicated sticky-session management and reconnect jitter logic on client apps.",
  },
  {
    title: "Idempotent Automated Payouts with Stripe Connect",
    problem:
      "Instructors were paid via manual spreadsheet calculations at week-end, resulting in high administrative labor, human calculation discrepancies, and delayed disbursements.",
    decision:
      "Designed an event-driven webhook pipeline consuming verified session completion events, computing commission splits with PostgreSQL Serializable transactions, and dispatching Stripe Transfers idempotently.",
    tradeoff:
      "Required cryptographic webhook signature validation and dead-letter queue replay mechanisms, but reduced operational payout workload to zero.",
  },
];

const constraints = [
  {
    label: "Latency SLA",
    title: "<100ms Heuristic Matchmaking",
    text: "Students required instantaneous instructor matching across dynamic availability matrices without incurring slow sequential database table scans.",
  },
  {
    label: "Concurrency Safety",
    title: "Zero Double-Booking Tolerance",
    text: "During opening flash surges, multiple users checking out the same time slot had to be resolved deterministically without human operator intervention.",
  },
  {
    label: "Financial Precision",
    title: "Idempotent Automated Ledgers",
    text: "Automating hundreds of daily instructor payouts via Stripe Connect required absolute idempotency to prevent duplicate transfers or ledger drift.",
  },
];

const failureModes = [
  {
    tag: "Failure Mode 01",
    title: "Concurrent Checkout Race Condition",
    impact: "Two students clicking 'Book' within 50ms of each other both getting charged for a single instructor seat.",
    defense: "Redis Redlock distributed mutex. An atomic 45-second reservation hold is acquired before entering the checkout tunnel; concurrent requests fail fast with an immediate 'slot held by another student' state.",
  },
  {
    tag: "Failure Mode 02",
    title: "Stripe Webhook Delivery Drops & Retries",
    impact: "Unreliable network conditions dropping Stripe payment confirmation webhooks or sending duplicate events.",
    defense: "HMAC signature verification combined with an idempotent transactional outbox pattern in PostgreSQL. Duplicate webhook payloads match existing event IDs and return 200 OK without re-triggering payouts.",
  },
  {
    tag: "Failure Mode 03",
    title: "Live WebSocket Connection Drops",
    impact: "Transient client network disconnects causing ongoing classes to prematurely trigger abandonment or non-attendance penalties.",
    defense: "Graceful 90-second heartbeat reconnection window stored in Redis. Session timers remain authoritative on the server, resuming seamlessly upon client reconnection.",
  },
  {
    tag: "Failure Mode 04",
    title: "Database Lock Contention at Peak Surge",
    impact: "Sudden surges locking the instructor schedule table, causing connection starvation and 504 Gateway Timeouts.",
    defense: "PgBouncer connection pooling with read-replica routing for availability search, isolating write-heavy transaction commits behind serialized row-level locks.",
  },
];

const timeline = [
  ["Week 1-2", "Architecture and operational discovery. Audited teacher scheduling workflows, identified race condition vectors, and formalized the state machine spec."],
  ["Week 3-4", "Built the dynamic matchmaking algorithm: timezone resolution matrix, instructor scoring criteria, and fast ranking pipeline."],
  ["Week 5-6", "Implemented distributed locking with Redis Redlock: atomic reservation holds, checkout lease management, and concurrency stress testing."],
  ["Week 7-8", "Constructed real-time WebSocket state layer: live room heartbeats, session timers, and Redis Pub/Sub broadcast infrastructure."],
  ["Week 9-10", "Engineered Stripe Connect payout engine: automated balance calculations, idempotent transfer dispatches, and audit trail logging."],
  ["Week 11-12", "Load testing, failover drills, telemetry dashboards, team runbooks, and zero-defect production deployment."],
];

const outcomes = [
  {
    value: "0",
    label: "Manual operations required",
    note: "100% of teacher scheduling, slot reservations, and payout allocations transitioned into automated system paths.",
  },
  {
    value: "<100ms",
    label: "Teacher match scoring",
    note: "Sub-100ms heuristic matching across thousands of concurrent instructor availability slots.",
  },
  {
    value: "0%",
    label: "Double-booking race conditions",
    note: "Zero scheduling overlap incidents recorded post-deployment via distributed mutex isolation.",
  },
  {
    value: "100%",
    label: "Automated payout accuracy",
    note: "All instructor disbursements computed and transferred idempotently via Stripe Connect webhooks.",
  },
];

export default function ClassFlowCaseStudy() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Selected Work", url: "https://uzairkhatri.com/#work" },
          { name: "ClassFlow Case Study", url: "https://uzairkhatri.com/work/classflow/" },
        ]}
      />
      <TechArticleJsonLd
        title="ClassFlow Case Study — Live Tutoring Marketplace Architecture"
        description="How Uzair Khatri architected ClassFlow: an automated live tutoring marketplace unifying dynamic teacher matching, distributed lock safety with Redis Redlock, and automated Stripe payouts."
        url="https://uzairkhatri.com/work/classflow/"
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
              <span className={styles.tag}>Live Tutoring / EdTech SaaS</span>
              <span className={styles.tag}>12-week delivery</span>
              <span className={styles.tag}>Lead Architect</span>
            </div>
            <h1 className={styles.heroTitle}>
              ClassFlow <span style={{ display: "block", fontSize: "0.5em", color: "var(--gold-bright)", fontWeight: 700, marginTop: "0.35rem", letterSpacing: "0.02em" }}>Live Tutoring Marketplace Architecture</span>
            </h1>
            <p className={styles.heroSub}>Automated Global Tutoring &amp; Scheduling Engine</p>
            <p className={styles.heroDesc}>
              How I architected a high-concurrency education marketplace unifying sub-100ms tutor matchmaking across global timezones,
              distributed lock safety with Redis Redlock to eliminate double-booking, and automated Stripe Connect teacher payouts — eliminating
              100% of manual scheduling operations.
            </p>
            <div className={styles.heroFacts}>
              <span><strong>0</strong> manual ops</span>
              <span><strong>&lt;100ms</strong> match scoring</span>
              <span><strong>0%</strong> double-bookings</span>
            </div>
          </div>
          <ProjectVisual type="classflow" variant="hero" />
        </div>
      </header>

      <section className={styles.section} aria-label="The problem">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>The problem</p>
          <h2 className={styles.sectionTitle}>
            Scaling class volume choked on spreadsheets and race conditions.
          </h2>
          <div className={styles.prose}>
            <p>
              ClassFlow was growing quickly, but every new hundred students required hiring more
              operational staff to manually match instructors, verify calendars across 14 timezones,
              and resolve double-booking collisions.
            </p>
            <p>
              When popular teachers opened availability slots, registration surges routinely caused
              sub-second race conditions where multiple students paid for the exact same session,
              forcing awkward customer support interventions and refunds.
            </p>
            <p>
              The challenge was to engineer an autonomous, fault-tolerant backbone: dynamic algorithmic
              matching, atomic reservation locks, live session telemetry, and automated financial
              disbursements.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-label="Operating constraints">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>Operating constraints</p>
          <h2 className={styles.sectionTitleLight}>
            The operational requirements that dictated the architecture.
          </h2>
          <p className={styles.sectionDescLight}>
            Scaling a live educational platform with concurrent payments leaves no room for loose
            consistency. These constraints shaped our database transaction model and locking design.
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
            Designing for absolute consistency and sub-second execution.
          </h2>
          <p className={styles.sectionDescLight}>
            Every architectural decision balanced strict concurrency boundaries against frictionless
            student booking experience and zero manual operator intervention.
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
          <h2 className={styles.sectionTitle}>How the lifecycle components coordinate.</h2>
          <div className={styles.diagram}>
            <div className={styles.diagramLabel}>Distributed State &amp; Concurrency Boundary</div>
            <div className={styles.diagramBody}>
              <div className={styles.diagramRow}>
                <div className={styles.diagramNode}>
                  <strong>Student Booking Request</strong>
                  <span>FastAPI gateway</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={`${styles.diagramNode} ${styles.diagramCore}`}>
                  <strong>Redis Mutex (Redlock)</strong>
                  <span>Atomic 45s reservation hold &amp; race prevention</span>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramAgents}>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Match Scoring Engine</strong>
                    <span>Heuristic timezone &amp; instructor load ranking</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>WebSocket State Hub</strong>
                    <span>Real-time class heartbeats &amp; room lifecycle</span>
                  </div>
                  <div className={`${styles.diagramNode} ${styles.diagramAgent}`}>
                    <strong>Stripe Connect Engine</strong>
                    <span>Idempotent commission split &amp; automated transfer</span>
                  </div>
                </div>
                <div className={styles.diagramArrow} aria-hidden="true" />
                <div className={styles.diagramNode}>
                  <strong>PostgreSQL ACID Store</strong>
                  <span>Serializable booking &amp; ledger records</span>
                </div>
              </div>

              <div className={styles.diagramInfra}>
                <div className={styles.diagramInfraItem}>
                  <span>Redis Cluster</span>
                  <p>Distributed locks &amp; pub/sub</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>AWS ECS Fargate</span>
                  <p>Autoscaling FastAPI services</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>Stripe Connect</span>
                  <p>Global teacher disbursements</p>
                </div>
                <div className={styles.diagramInfraItem}>
                  <span>CloudWatch &amp; Sentry</span>
                  <p>State tracing &amp; alerts</p>
                </div>
              </div>
            </div>
            <p className={styles.diagramNote}>
              Lock-safe by design. Any concurrent booking collision is caught at the Redis mutex layer
              before touching the database or processing a credit card transaction.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-label="Failure modes and defenses">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Failure modes & defenses</p>
          <h2 className={styles.sectionTitle}>
            How distributed concurrency failures are caught and neutralized.
          </h2>
          <p className={styles.sectionDesc}>
            High-concurrency platforms break at the seams when race conditions occur. These are the critical
            failure modes stress-tested before launch and the exact safeguards built to handle them.
          </p>
          <div className={styles.failureGrid}>
            {failureModes.map((f) => (
              <article className={styles.failureCard} key={f.tag}>
                <div className={styles.failureHeader}>
                  <span className={styles.failureTag}>{f.tag}</span>
                  <h3>{f.title}</h3>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.failureLabel}>Concurrency Risk</span>
                  <p>{f.impact}</p>
                </div>
                <div className={styles.failureRow}>
                  <span className={styles.defenseLabel}>Architectural Safeguard</span>
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
          <h2 className={styles.sectionTitleLight}>Twelve weeks from whiteboard to full automation.</h2>
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
          <h2 className={styles.sectionTitle}>Measurable operational transformation.</h2>
          <p className={styles.sectionDesc}>
            Eliminated the operational headcount requirement as booking volume scaled 4x, while delivering
            zero double-booking incidents.
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
          <h2 className={styles.ctaTitle}>Scaling a complex operational platform?</h2>
          <p className={styles.ctaDesc}>
            Let&apos;s eliminate manual bottlenecks, lock contention, and state synchronization issues
            before they impact your customer experience.
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
