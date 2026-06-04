import styles from "./SelectedWork.module.css";
import { withBasePath } from "./siteLinks";
import ProjectVisual, { type ProjectVisualType } from "./ProjectVisual";

type Project = {
  number: string;
  year: string;
  slug?: string;
  name: string;
  category: string;
  role: string;
  description: string;
  stack: string[];
  metric: [string, string];
  diagram: ProjectVisualType;
};

const projects: Project[] = [
  {
    number: "01",
    year: "2024",
    slug: "wellows",
    name: "Wellows",
    category: "AI Search Visibility Platform",
    role: "Founding Architect",
    description:
      "Designed the agent workflows, retrieval layer, backend services, and infrastructure path for production-grade AI search visibility across ChatGPT, Gemini, Perplexity, and Google AI surfaces.",
    stack: ["LangGraph", "OpenAI", "FastAPI", "Vector Search", "AWS"],
    metric: ["3 agents", "KIVA, OPTA, and Citation Intelligence in one orchestration layer"],
    diagram: "wellows",
  },
  {
    number: "02",
    year: "2024",
    name: "ClassFlow",
    category: "Agentic Online Learning Platform",
    role: "Lead Architect",
    description:
      "Architected scheduling, teacher matching, payment disbursement, quality scoring, and real-time class lifecycle systems as one coordinated operational platform.",
    stack: ["Agentic AI", "FastAPI", "Stripe", "WebSockets", "Redis"],
    metric: ["0 manual ops", "Scheduling and payment workflows moved into automated system paths"],
    diagram: "classflow",
  },
  {
    number: "03",
    year: "2023",
    name: "Savyour",
    category: "Fintech Cashback Platform",
    role: "Solutions Architect",
    description:
      "Contributed backend architecture across cashback calculation, partner integrations, wallet flows, payment disbursement, and AI shopping assistance for a large consumer marketplace.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Payment APIs"],
    metric: ["650+", "Brand-partner ecosystem supported through integration architecture"],
    diagram: "savyour",
  },
  {
    number: "04",
    year: "2022",
    name: "EFU Life",
    category: "Enterprise Insurance System",
    role: "Enterprise Architect",
    description:
      "Implemented IBM FileNet P8, Case Manager, and Capture to move document-heavy insurance operations toward digital case management and paperless delivery.",
    stack: ["IBM FileNet", "Case Manager", "Capture", "Workflow Automation"],
    metric: ["100%", "Paperless delivery path for enterprise document workflows"],
    diagram: "efu",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 9h9M9.5 5.5 13 9l-3.5 3.5" />
    </svg>
  );
}

export default function SelectedWork() {
  return (
    <section className={`${styles.section} reveal-section`} id="work" aria-labelledby="selected-work-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className={styles.eyebrow}>
              <span />
              Selected work
            </div>
            <h2 className={styles.title} id="selected-work-title">
              Production proof, not portfolio filler.
            </h2>
          </div>
          <p>
            Four engagements where architecture had to translate into systems, operations, and
            business continuity.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article
              className={`${styles.card} ${index === 0 ? styles.featured : ""} reveal-item`}
              key={project.number}
            >
              <div className={styles.cardTop}>
                <span>{project.number}</span>
                <em>{project.year}</em>
              </div>

              <ProjectVisual type={project.diagram} variant={index === 0 ? "hero" : "card"} />

              <div className={styles.cardBody}>
                <div className={styles.projectMeta}>
                  <span>{project.role}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>

              <div className={styles.metric}>
                <strong>{project.metric[0]}</strong>
                <span>{project.metric[1]}</span>
              </div>

              <div className={styles.stack}>
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className={styles.actions}>
                {project.slug ? (
                  <a href={withBasePath(`/work/${project.slug}`)}>
                    Full case study <ArrowIcon />
                  </a>
                ) : (
                  <a href="#contact">
                    Discuss similar work <ArrowIcon />
                  </a>
                )}
                <a href="#contact">
                  Built something similar? <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
