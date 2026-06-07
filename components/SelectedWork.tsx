"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SelectedWork.module.css";
import { withBasePath } from "./siteLinks";
import ProjectVisual, { type ProjectVisualType } from "./ProjectVisual";
import SystemSpecModal, { type ProjectSpec } from "./SystemSpecModal";

gsap.registerPlugin(ScrollTrigger);

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
  challenge: string;
  solution: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
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
    challenge: "Wellows prototype worked in investor demos but lacked cost controls, async orchestration, and failure boundaries required to support concurrent enterprise users.",
    solution: "Orchestrated three specialized agents (KIVA, OPTA, and Citation Intelligence) using LangGraph and isolated error queues, ensuring failure in one did not crash the system.",
    blueprint: {
      orchestration: "LangGraph / FastAPI / Python",
      data: "Vector Index / Ingestion pipeline",
      infra: "AWS SQS Queues / ECS Containers"
    }
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
    challenge: "Moving online learning operations from high-friction manual teacher matching and scheduling runs to a completely autonomous, lock-safe orchestration engine.",
    solution: "Designed an automated teacher matchmaking pipeline utilizing dynamic scoring and timezone resolution with real-time class state machines.",
    blueprint: {
      orchestration: "FastAPI / Python State Machine",
      data: "Redis Locks / WebSockets match feedback",
      infra: "Stripe payout system / AWS ECS"
    }
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
    challenge: "Processing thousands of affiliate rewards events concurrently while keeping financial wallet ledgers synchronized, idempotent, and highly consistent.",
    solution: "Developed decoupled ingestion queues with database-level ACID transactions and Redis caches to handle cashback event calculation in sub-second timelines.",
    blueprint: {
      orchestration: "FastAPI Async Services",
      data: "PostgreSQL Ledger / Transaction Isolation",
      infra: "Partner webhook channels / AWS"
    }
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
    challenge: "Migrating highly physical paper filing operations to paperless case routing for thousands of enterprise policy documents daily with strict compliance guidelines.",
    solution: "Implemented IBM FileNet Content Store with automated document ingestion and Case Manager routing pipelines, eliminating manual filing queues.",
    blueprint: {
      orchestration: "IBM Case Manager Workflows",
      data: "FileNet P8 Content Repository",
      infra: "On-Premise Server High Availability clusters"
    }
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSpec, setActiveSpec] = useState<ProjectSpec | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1051px)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Let layout settle then measure
      const update = () => {
        const totalScroll = track.scrollWidth - section.offsetWidth;
        if (totalScroll <= 0) return;

        const tween = gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      };

      // Small delay so fonts/images settle
      const id = setTimeout(update, 80);
      return () => clearTimeout(id);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} reveal-section`}
      id="work"
      aria-labelledby="selected-work-title"
    >
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

        {/* Horizontal scroll track — becomes flex row on desktop via GSAP */}
        <div ref={trackRef} className={styles.track}>
          <div className={`${styles.grid} ${styles.hGrid}`}>
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
                    <button onClick={() => setActiveSpec(project as any)} aria-label={`View ${project.name} specification`}>
                      View System Spec <ArrowIcon />
                    </button>
                  )}
                  <a href="#contact">
                    Built something similar? <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <SystemSpecModal project={activeSpec} onClose={() => setActiveSpec(null)} />
    </section>
  );
}

