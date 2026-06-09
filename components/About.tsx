import Image from "next/image";
import styles from "./About.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import AnimatedCounter from "./AnimatedCounter";

const workflow = [
  ["01", "Clarity Session", "We map the product goal, current system, constraints, and architecture risks before anyone starts building around assumptions."],
  ["02", "Architecture Blueprint", "I design the agents, APIs, queues, data stores, observability, and operational boundaries needed for production."],
  ["03", "Build or Guide", "I either build the critical path directly or work with your team as the architect reviewing decisions, code, and delivery tradeoffs."],
  ["04", "Production Handoff", "We harden the system for real users: monitoring, failure paths, performance, ownership, and scale-readiness."],
];

const engagements = [
  {
    tier: "01",
    name: "The Architecture Audit",
    timeline: "1-Week Sprint",
    focus: "Risk Reduction",
    desc: "A thorough review of your existing codebase, model orchestration (LangGraph/Chain), vector pipeline, and infra configuration. You receive a concrete risk analysis and system improvement blueprint.",
    cta: "Book Audit Call",
  },
  {
    tier: "02",
    name: "Fractional Architect",
    timeline: "Monthly Retainer",
    focus: "Advisory & Oversight",
    desc: "Regular architecture reviews, code reviews, and advisor syncs to keep your engineering team honest, reduce technical debt early, and guide scaling decisions as you move toward production.",
    cta: "Discuss Retainer",
  },
  {
    tier: "03",
    name: "Critical Path Build",
    timeline: "Project-Based",
    focus: "Direct Execution",
    desc: "Hands-on engineering of the most complex architectural components: orchestrators, transactional ledger pipelines, vector retrieval architectures, or highly-available deployment infrastructures.",
    cta: "Hire for Implementation",
  }
];

const principles = [
  {
    rule: "01",
    core: "Most AI systems fail around the model, not inside it.",
    impact: "Vulnerabilities lie in state orchestration, rate-limiting, database lock-safety, and external integrations—not the LLM itself."
  },
  {
    rule: "02",
    core: "A demo without observability, retries, and cost control is not production.",
    impact: "Unmonitored agent prompts lead to silent token leakage, loop regression, and runaway API costs."
  },
  {
    rule: "03",
    core: "Agents need owners, limits, state, and failure paths before they need more tools.",
    impact: "Adding external tools to unconstrained agent loops only compounds runtime errors and state mutation loss."
  },
  {
    rule: "04",
    core: "Architecture is only useful when the team can operate it under pressure.",
    impact: "A design is only complete if your on-call engineering team can trace, isolate, and debug its event graph under load."
  },
  {
    rule: "05",
    core: "The best AI system is not the flashiest one; it is the one the business can trust.",
    impact: "Consistency, latency thresholds, and idempotency guarantees are what validate enterprise utility."
  },
  {
    rule: "06",
    core: "If the team cannot debug it at 2am, the architecture is not finished.",
    impact: "Multi-agent systems must export structured telemetry traces and transaction logs, not black-box console strings."
  },
  {
    rule: "07",
    core: "Cost, latency, and failure states are product decisions, not backend details.",
    impact: "How the system responds when model APIs fail or latency spikes directly defines user retention and margin."
  },
  {
    rule: "08",
    core: "A system is only production-ready when ownership is clear after launch.",
    impact: "Clear alert escalation policies, telemetry thresholds, and runbooks are required to operate agent systems."
  }
];

const stats = [
  { value: "650+", label: "Brand-partner ecosystem supported at Savyour" },
  { value: "100%", label: "Paperless delivery for FileNet transformation" },
  { value: "AA++", label: "EFU Life credit rating proxy" },
  { value: "3", label: "Named AI agents: KIVA, OPTA, Citation Intelligence" },
];

const stack = [
  "OpenAI",
  "Claude",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Python",
  "AWS",
  "Redis",
  "PostgreSQL",
  "Docker",
  "SQS",
];

const credentials = [
  {
    issuer: "Anthropic",
    mark: "AI",
    title: "Claude Code in Action",
    detail: "Issued Mar 2026",
  },
  {
    issuer: "Anthropic",
    mark: "C",
    title: "Claude 101",
    detail: "Issued Mar 2026",
  },
  {
    issuer: "IBM",
    mark: "ML",
    title: "Machine Learning with Python",
    detail: "Issued Dec 2024",
  },
  {
    issuer: "BeMyApp / IBM TechXchange",
    mark: "VA",
    title: "Virtual Agents Dev Day",
    detail: "Issued Jan 2025",
  },
  {
    issuer: "Laravel",
    mark: "L",
    title: "Laravel Certification",
    detail: "Issued Sep 2022",
  },
];

export default function About() {
  return (
    <section id="about" className={`${styles.section} reveal-section`} aria-label="How Uzair Khatri thinks and works">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.principles}>
        <header className={styles.principlesHeader}>
          <div className="section-eyebrow"><span />How I think</div>
          <h3>Strong opinions on production AI. No hedging.</h3>
        </header>
        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <article
              className={`${styles.principleCard} reveal-item`}
              key={item.rule}
            >
              <header className={styles.cardHeader}>
                <span className={styles.ruleBadge}>RULE {item.rule}</span>
                <span className={styles.glowDot} />
              </header>
              <blockquote>&ldquo;{item.core}&rdquo;</blockquote>
              <p className={styles.impactLine}>
                <span>Operational Impact:</span> {item.impact}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.workflow}>
        <header className={styles.workflowHeader}>
          <div className="section-eyebrow"><span />How I work</div>
          <h3>Clear decisions before expensive code.</h3>
          <p>
            My role is to reduce architecture risk early, then keep execution honest as the system
            moves toward production.
          </p>
        </header>

        <div className={styles.workflowContent}>
          <div className={styles.workflowGrid}>
            {workflow.map(([number, title, text]) => (
              <article className={`${styles.workflowStep} reveal-item`} key={title}>
                <span>{number}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className={`${styles.workflowVisual} reveal-item`}>
            <Image
              src={withBasePath("/img/profile/ai_system_architecture_3d.png")}
              alt="AI Systems 3D Schematic Diagram"
              width={600}
              height={600}
              priority
              style={{ objectFit: "contain", borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      <div className={styles.engagements}>
        <header className={styles.engagementsHeader}>
          <div className="section-eyebrow"><span />Engagement Models</div>
          <h3>Clear structures for advisory and execution.</h3>
          <p>
            I work in focused engagements designed to align with your technical complexity and timeline pressure.
          </p>
        </header>

        <div className={styles.engagementsGrid}>
          {engagements.map((item) => (
            <article className={`${styles.engagementCard} reveal-item`} key={item.name}>
              <div className={styles.engagementHeader}>
                <span>{item.tier}</span>
                <em>{item.timeline}</em>
              </div>
              <h4>{item.name}</h4>
              <span className={styles.engagementFocus}>{item.focus}</span>
              <p>{item.desc}</p>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={styles.engagementCta}>
                {item.cta} -&gt;
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.trackRecord}>
        <div>
          <div className="section-eyebrow"><span />The track record</div>
          <h3>
            Architecture <em>turned into</em> measurable outcomes.
          </h3>
          <p>
            Every number represents a real system, a real client, and production pressure.{" "}
            <strong>No inflated figures.</strong> No demos counted as production.
          </p>
        </div>

        <div className={styles.statGrid}>
          {stats.map((stat) => (
            <article className={`${styles.stat} reveal-item`} key={stat.label}>
              <AnimatedCounter value={stat.value} />
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.toolkitGrid}>
        {/* Left Column: Core Stack */}
        <div className={styles.toolkitBlock}>
          <header className={styles.toolkitBlockHeader}>
            <div className="section-eyebrow"><span />Technical Toolkit</div>
            <h3 className={styles.toolkitTitle}>Core Stack</h3>
            <p className={styles.toolkitDescription}>
              Production-hardened tools and frameworks I leverage to design, build, and orchestrate resilient AI systems.
            </p>
          </header>
          <div className={styles.chipGrid}>
            {stack.map((item) => (
              <span className={styles.chip} key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* Right Column: Credentials */}
        <div className={styles.credentialsBlock}>
          <header className={styles.toolkitBlockHeader}>
            <div className="section-eyebrow"><span />Credentials</div>
            <h3 className={styles.credentialTitle}>Certifications</h3>
          </header>
          <div className={styles.credentialGrid}>
            {credentials.map((credential) => (
              <article className={`${styles.credentialCard} reveal-item`} key={`${credential.issuer}-${credential.title}`}>
                <div className={styles.credentialBadge}>{credential.mark}</div>
                <div className={styles.credentialInfo}>
                  <span className={styles.credentialIssuer}>{credential.issuer}</span>
                  <strong className={styles.credentialCardTitle}>{credential.title}</strong>
                  <p className={styles.credentialDetail}>{credential.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.closer}>
        <div className={styles.closerGlow} aria-hidden="true" />
        <blockquote>
          <span className={styles.quoteMark}>"</span>
          <p>
            Strategy only matters <span>when it</span> survives real users, <span>real traffic,</span>{" "}
            and real operational pressure.
          </p>
          <footer>
            <span />
            Uzair Khatri - AI Systems Architect
          </footer>
        </blockquote>

        <div className={styles.closerCta}>
          <span>Work together</span>
          <h3>Moving AI from prototype to production?</h3>
          <p>
            I do not do cosmetic patch jobs. If the architecture is wrong, I will tell you before
            another expensive layer gets built on top of it.
          </p>
          <div>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              Book architecture call -&gt;
            </a>
            <a href="#work">View production work</a>
          </div>
        </div>
      </div>
    </section>
  );
}
