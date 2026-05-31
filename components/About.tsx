import styles from "./About.module.css";
import { BOOKING_URL } from "./siteLinks";

const workflow = [
  ["01", "Clarity Session", "We map the product goal, current system, constraints, and architecture risks before anyone starts building around assumptions."],
  ["02", "Architecture Blueprint", "I design the agents, APIs, queues, data stores, observability, and operational boundaries needed for production."],
  ["03", "Build or Guide", "I either build the critical path directly or work with your team as the architect reviewing decisions, code, and delivery tradeoffs."],
  ["04", "Production Handoff", "We harden the system for real users: monitoring, failure paths, performance, ownership, and scale-readiness."],
];

const principles = [
  "Most AI systems fail around the model, not inside it.",
  "A demo without observability, retries, and cost control is not production.",
  "Agents need owners, limits, state, and failure paths before they need more tools.",
  "Architecture is only useful when the team can operate it under pressure.",
  "The best AI system is not the flashiest one; it is the one the business can trust.",
];

const stats = [
  ["650+", "Brand-partner ecosystem supported at Savyour"],
  ["100%", "Paperless delivery for FileNet transformation"],
  ["AA++", "EFU Life credit rating proxy"],
  ["3", "Named AI agents: KIVA, OPTA, Citation Intelligence"],
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
    title: "Claude Code in Action",
    detail: "Issued Mar 2026",
  },
  {
    issuer: "Anthropic",
    title: "Claude 101",
    detail: "Issued Mar 2026 - ID 5mkc9ne9cwr5",
  },
  {
    issuer: "IBM",
    title: "Machine Learning with Python",
    detail: "Issued Dec 2024 - ID 16V1TEPM0AFV",
  },
  {
    issuer: "BeMyApp / IBM TechXchange",
    title: "Virtual Agents Dev Day",
    detail: "Issued Jan 2025 - ID 5b4536c4-403b-4913-a6c4-c3f68b6ef528",
  },
  {
    issuer: "Laravel",
    title: "Laravel Certification",
    detail: "Issued Sep 2022",
  },
];

export default function About() {
  return (
    <section id="about" className={styles.section} aria-label="How Uzair Khatri thinks and works">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.principles}>
        <header className={styles.principlesHeader}>
          <p className={styles.label}>How I think</p>
          <h3>Strong opinions on production AI. No hedging.</h3>
        </header>
        <div>
          {principles.map((principle) => (
            <blockquote key={principle}>{principle}</blockquote>
          ))}
        </div>
      </div>

      <div className={styles.workflow}>
        <header className={styles.workflowHeader}>
          <p className={styles.label}>How I work</p>
          <h3>Clear decisions before expensive code.</h3>
          <p>
            My role is to reduce architecture risk early, then keep execution honest as the system
            moves toward production.
          </p>
        </header>

        <div className={styles.workflowGrid}>
          {workflow.map(([number, title, text]) => (
            <article className={styles.workflowStep} key={title}>
              <span>{number}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.trackRecord}>
        <div>
          <p className={styles.label}>The track record</p>
          <h3>
            Architecture <em>turned into</em> measurable outcomes.
          </h3>
          <p>
            Every number represents a real system, a real client, and production pressure.{" "}
            <strong>No inflated figures.</strong> No demos counted as production.
          </p>
        </div>

        <div className={styles.statGrid}>
          {stats.map(([value, label]) => (
            <article className={styles.stat} key={label}>
              <strong>{value}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.stackStrip}>
        <span>Core stack</span>
        <div>
          {stack.map((item) => (
            <em key={item}>{item}</em>
          ))}
        </div>
      </div>

      <div className={styles.credentials}>
        <div>
          <p className={styles.label}>Credentials</p>
          <h3>Verified learning across AI, ML, enterprise, and backend systems.</h3>
        </div>
        <div className={styles.credentialGrid}>
          {credentials.map((credential) => (
            <article className={styles.credentialCard} key={`${credential.issuer}-${credential.title}`}>
              <span>{credential.issuer}</span>
              <strong>{credential.title}</strong>
              <p>{credential.detail}</p>
            </article>
          ))}
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
