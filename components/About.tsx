import Image from "next/image";
import styles from "./About.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

const meta = [
  ["Status", "Selective availability", true],
  ["Location", "Karachi, Pakistan"],
  ["Timezone", "PKT - UTC +5"],
  ["Engagement", "Architecture Advisory"],
];

const services = [
  {
    number: "01",
    title: "AI Systems Architecture",
    description:
      "The AI system that impresses in demos but fails under load is not architecture; it is liability. I design the production layer around orchestration, retrieval quality, guardrails, observability, and cost control.",
    tags: ["LangGraph", "OpenAI", "Agents", "VectorDB"],
  },
  {
    number: "02",
    title: "Scalable Backend Platforms",
    description:
      "When growth exposes slow APIs, fragile queues, and unclear ownership, I rebuild the backend path around speed, resilience, and operational clarity.",
    tags: ["FastAPI", "SQS", "Redis", "AWS"],
  },
  {
    number: "03",
    title: "Architecture Advisory",
    description:
      "I turn technical risk into decisions teams can execute: system reviews, architecture tradeoffs, team standards, mentoring, and production-readiness plans.",
    tags: ["System Design", "Reviews", "Leadership"],
  },
];

const workflow = [
  ["01", "Clarity Session", "We map the product goal, current system, constraints, and architecture risks before anyone starts building around assumptions."],
  ["02", "Architecture Blueprint", "I design the agents, APIs, queues, data stores, observability, and operational boundaries needed for production."],
  ["03", "Build or Guide", "I either build the critical path directly or work with your team as the architect reviewing decisions, code, and delivery tradeoffs."],
  ["04", "Production Handoff", "We harden the system for real users: monitoring, failure paths, performance, ownership, and scale-readiness."],
];

const principles = [
  "Most AI systems fail around the model, not inside it.",
  "Architecture is only useful when the team can operate it under pressure.",
  "A demo without observability, retries, and cost control is not production.",
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
    <section id="about" className={styles.section} aria-label="About Uzair Khatri">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.opener}>
        <div className={styles.glowLeft} aria-hidden="true" />
        <div className={styles.glowRight} aria-hidden="true" />

        <div className={styles.openerInner}>
          <div className={styles.openerCopy}>
            <div className={styles.eyebrow}>
              <span />
              About
            </div>

            <h2 className={styles.statement}>
              <span>From</span>
              <span className={styles.ghost}>prototype</span>
              <span className={styles.amber}>to</span>
              <span className={styles.italic}>production.</span>
            </h2>

            <p className={styles.narrative}>
              I started as a backend engineer and kept getting pulled into the same problem:
              products were growing faster than their architecture. Today, I help teams make the
              decisions that decide whether an AI product becomes a reliable business system or a
              maintenance burden.
              <br />
              <br />
              Most AI systems are not failing because the model is wrong. They are failing because
              no one designed the infrastructure to survive the model being right. That is the gap I
              work in.
            </p>

          </div>

          <div className={styles.photoPanel}>
            <div className={styles.photoGlow} aria-hidden="true" />
            <div className={styles.photoFrame}>
              <Image
                src={withBasePath("/img/profile/my-image.jpeg")}
                alt="Uzair Khatri"
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div className={styles.photoBadge}>
              <strong>Uzair Khatri</strong>
              <span>AI Systems Architect - Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        <div className={styles.metaStrip}>
          {meta.map(([label, value, isLive]) => (
            <div className={styles.metaItem} key={label as string}>
              <span>{label}</span>
              <strong className={isLive ? styles.live : ""}>{value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.services}>
        <header className={styles.servicesHeader}>
          <h3>
            What I
            <br />
            <span>architect.</span>
          </h3>
          <p>Three disciplines. One standard: production-grade, or it does not count.</p>
          <p>
            Most AI products do not fail because the model is weak. They fail because the system
            around the model was never designed for production.
          </p>
        </header>

        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.title}>
              <span className={styles.serviceNumber}>{service.number}</span>
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <div className={styles.serviceTags}>
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
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

      <div className={styles.principles}>
        <header className={styles.principlesHeader}>
          <p className={styles.label}>Architecture principles</p>
          <h3>What I believe about production AI.</h3>
        </header>
        <div>
          {principles.map((principle) => (
            <blockquote key={principle}>{principle}</blockquote>
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
