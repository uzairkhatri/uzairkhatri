"use client";

import { useEffect } from "react";
import styles from "./SystemSpecModal.module.css";

export type ProjectSpec = {
  name: string;
  category: string;
  role: string;
  year: string;
  description: string;
  metric: [string, string];
  stack: string[];
  challenge: string;
  solution: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
};

type SystemSpecModalProps = {
  project: ProjectSpec | null;
  onClose: () => void;
};

export default function SystemSpecModal({ project, onClose }: SystemSpecModalProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.tag}>{project.role}</span>
            <span className={styles.tag}>{project.category}</span>
            <span className={styles.tag}>{project.year}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.titleArea}>
            <h2 id="modal-title" className={styles.title}>{project.name}</h2>
            <p className={styles.desc}>{project.description}</p>
          </div>

          <div className={styles.contentGrid}>
            <section className={styles.leftCol}>
              <div className={styles.block}>
                <h3>The Scale Challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div className={styles.block}>
                <h3>The Architectural Solution</h3>
                <p>{project.solution}</p>
              </div>
            </section>

            <aside className={styles.rightCol}>
              <div className={styles.blueprintPanel}>
                <h3>System Blueprint</h3>
                <div className={styles.blueprintRow}>
                  <strong>Orchestration:</strong>
                  <span>{project.blueprint.orchestration}</span>
                </div>
                <div className={styles.blueprintRow}>
                  <strong>Data & Ingestion:</strong>
                  <span>{project.blueprint.data}</span>
                </div>
                <div className={styles.blueprintRow}>
                  <strong>Infrastructure:</strong>
                  <span>{project.blueprint.infra}</span>
                </div>
              </div>

              <div className={styles.metricPanel}>
                <h3>Impact Metric</h3>
                <strong>{project.metric[0]}</strong>
                <span>{project.metric[1]}</span>
              </div>

              <div className={styles.stackPanel}>
                <h3>Core Stack</h3>
                <div className={styles.tags}>
                  {project.stack.map((t) => (
                    <span key={t} className={styles.stackTag}>{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>NDA Protected System Architecture Spec. Verified Outcome.</span>
          <a href="#contact" onClick={onClose}>Discuss Similar Architecture -&gt;</a>
        </footer>
      </div>
    </div>
  );
}
