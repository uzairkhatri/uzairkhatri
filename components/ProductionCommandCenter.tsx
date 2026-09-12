"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ProductionCommandCenter.module.css";

const layers = [
  {
    id: "prototype",
    label: "Prototype",
    title: "The demo works, but the system is lying.",
    signal: "Unclear state, no replay path, hidden manual steps.",
    action: "I separate prompt behavior from system behavior and map every fragile assumption."
  },
  {
    id: "runtime",
    label: "Agent Runtime",
    title: "Agents need boundaries before they need more prompts.",
    signal: "Loops, tool misuse, rate limits, runaway token cost.",
    action: "I design state graphs, deterministic exits, evaluator checks, and provider fallbacks."
  },
  {
    id: "data",
    label: "Data Layer",
    title: "Memory is a product decision, not a vector database checkbox.",
    signal: "Stale retrieval, weak citations, untraceable context.",
    action: "I define ingestion, retrieval, cache, ledger, and audit paths around real workflows."
  },
  {
    id: "ops",
    label: "Operations",
    title: "Production begins when failure is boring.",
    signal: "No queues, no tracing, no ownership, no alertable events.",
    action: "I add observability, queues, retries, dashboards, and a handoff model your team can run."
  }
];

const paths = [
  "M92 88H256C294 88 306 136 344 136H606",
  "M92 214H248C304 214 306 292 362 292H606",
  "M162 342H310C348 342 372 214 416 214H670",
  "M92 214H248C304 214 306 292 362 292H606"
];

export default function ProductionCommandCenter() {
  const [activeLayer, setActiveLayer] = useState(1);
  const active = layers[activeLayer];
  const pathOffset = useMemo(() => `${activeLayer * 24}%`, [activeLayer]);

  return (
    <section id="method" className={`${styles.section} reveal-section`} aria-labelledby="command-center-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <div className="section-eyebrow"><span />Signature system</div>
            <h2 id="command-center-title">A production command center for your AI idea.</h2>
          </div>
          <div className={styles.headerContent}>
            <p>
              I audit the four layers that decide whether an AI product can survive customers:
              prototype behavior, agent runtime, data memory, and operations.
            </p>
            <a href="#work" className={styles.skipToWork}>
              Jump to Case Studies &darr;
            </a>
          </div>
        </header>

        <div className={styles.console} style={{ ["--active-offset" as any]: pathOffset }}>
          <div className={styles.rail} aria-label="Production system layers" role="tablist">
            {layers.map((layer, index) => (
              <button
                key={layer.id}
                className={`${styles.layerButton} ${index === activeLayer ? styles.active : ""}`}
                onClick={() => setActiveLayer(index)}
                role="tab"
                aria-selected={index === activeLayer}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {layer.label}
              </button>
            ))}
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.scanline} />
            <svg viewBox="0 0 760 430" className={styles.map}>
              <defs>
                <linearGradient id="command-path" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--gold-bright)" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8cc7ad" stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <path className={styles.gridPath} d="M92 88H256C294 88 306 136 344 136H606" />
              <path className={styles.gridPath} d="M92 214H248C304 214 306 292 362 292H606" />
              <path className={styles.gridPath} d="M162 342H310C348 342 372 214 416 214H670" />
              <motion.path
                key={active.id}
                className={styles.hotPath}
                d={paths[activeLayer]}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            </svg>
            {["Idea", "Runtime", "Memory", "Eval", "Queue", "Trace", "Cloud", "Team"].map((node, index) => (
              <span key={node} className={`${styles.node} ${styles[`node${index}`]}`}>
                {node}
              </span>
            ))}
          </div>

          <motion.article
            key={active.id}
            className={styles.readout}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className={styles.readoutKicker}>Active diagnosis</span>
            <h3>{active.title}</h3>
            <dl>
              <div>
                <dt>Failure signal</dt>
                <dd>{active.signal}</dd>
              </div>
              <div>
                <dt>My intervention</dt>
                <dd>{active.action}</dd>
              </div>
            </dl>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

