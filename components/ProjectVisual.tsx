"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ProjectVisual.module.css";

export type ProjectVisualType = "wellows" | "classflow" | "savyour" | "efu";

type ProjectVisualProps = {
  type: ProjectVisualType;
  variant?: "card" | "hero";
  activeLogIndex?: number;
};

const visualData = {
  wellows: {
    brand: "Wellows",
    title: "Orchestration Pipeline & Guardrails",
    metric: "3 agents active",
    tabs: ["LangGraph Routing", "LlamaGuard", "LLM Evaluation Loop"]
  },
  classflow: {
    brand: "ClassFlow",
    title: "Scheduler & Ledger Engine",
    metric: "0 manual ops",
    tabs: ["Redis Redlock", "Timezone Matcher", "Serializable DB Ledger"]
  },
  savyour: {
    brand: "Savyour",
    title: "Idempotent Webhook Ingestion & Cache",
    metric: "650+ partners",
    tabs: ["HMAC Verification", "Bloom Filter ID", "Cache Eviction"]
  },
  efu: {
    brand: "EFU Life",
    title: "Enterprise Document Case Routing",
    metric: "100% paperless",
    tabs: ["OCR Datacap Queue", "FileNet Store", "AD/LDAP Access"]
  }
};

const nodeDescriptions: Record<string, string> = {
  // Wellows
  "w-ingest": "FastAPI entry point throttling incoming search visibility requests and managing token headers.",
  "w-guard": "LlamaGuard safety model validating prompt injection safety before agent workflow allocation.",
  "w-router": "LangGraph StateGraph router managing state context, task distribution, and agent handoffs.",
  "w-kiva": "Specialized agent query handler identifying search visibility opportunities.",
  "w-opta": "Audit agent crawling search surfaces and resolving technical citation anomalies.",
  "w-citation": "Compliance monitoring agent tracking brand visibility and sentiment variations across LLMs.",
  "w-vector": "Shared pgvector database cluster containing cached competitor crawls (queries <120ms).",
  "w-llm": "Primary LLM node (GPT-4o) running structured JSON parsers for citation audit outputs.",
  "w-fallback": "Failover AWS Bedrock (Claude 3.5 Sonnet) activated automatically on primary rate-limits.",
  "w-judge": "Self-Correction LLM Evaluator scoring output confidence. Triggers plan retry if confidence <0.85.",
  "w-telemetry": "Async LangSmith tracer pushing spans, latencies, and token costs to observability dashboard.",
  "w-cache": "Redis in-memory caching layer serving pre-compiled audits directly to API gateways.",

  // ClassFlow
  "cf-event": "WebSocket handler streaming real-time class lifecycle heartbeats from teacher/student clients.",
  "cf-lock": "Redis distributed lock safety ensuring only one teacher can claim a booking slot concurrently.",
  "cf-state": "State machine mapping real-time candidate booking transitions and slot closures.",
  "cf-timezone": "UTC timezone resolution matching candidates in correct geographic latency groups.",
  "cf-load": "Scoring engine querying candidate historical ratings and active class load factors.",
  "cf-celery": "Celery asynchronous background workers executing matching sequences out-of-band.",
  "cf-postgres": "Serializable isolation level database cluster preventing matching races under concurrent load.",
  "cf-ledger": "Idempotent transactional billing engine checking deduplication keys before accounting writes.",
  "cf-stripe": "Stripe Connect billing sync dispatching partner payouts on verified class completion events.",
  "cf-release": "Redis lock evictor clearing booking slot states upon successful database commits.",
  "cf-broadcast": "Outbound WebSocket relays updating class scheduling boards globally in real time.",

  // Savyour
  "sv-webhook": "Affiliate callback gateway receiving high-volume transaction tracking payloads.",
  "sv-limiter": "Nginx rate-limiting buffer queue cap checking and throttling payloads (2500 req/sec).",
  "sv-router": "FastAPI gateway route checking partner request headers and payload hashes.",
  "sv-bloom": "Bloom Filter checking transaction IDs in 2ms to prevent double cashback disbursements.",
  "sv-calc": "Cashback rewards compiler mapping tier multipliers and brand-partner campaign rules.",
  "sv-sqs": "Decoupled AWS SQS message queue buffering spike traffic during shopping campaigns.",
  "sv-evict": "Cache eviction scheduler wiping cache keys for modified user wallet states on DB commits.",
  "sv-postgres": "PostgreSQL repeatable read transaction isolation safeguarding double-entry accounting records.",
  "sv-ledger": "ACID double-entry ledger validating balances before ledger commits.",
  "sv-sync": "Synchronizer service replicating wallet states to localized edge databases.",
  "sv-settle": "Disbursement gateway executing settlement payloads with partner APIs.",

  // EFU Life
  "ef-scanner": "Physical document scanners digitizing application files into high-resolution formats.",
  "ef-datacap": "IBM Datacap OCR engine processing ingestion pools and parsing document types.",
  "ef-router": "IBM Process Engine dispatching cases to corresponding underwriter queues.",
  "ef-ldap": "IBM Case Manager access controls integrated with Active Directory domain controllers.",
  "ef-dispatch": "Automated routing rules dispatching cases based on complexity scores and policy limits.",
  "ef-metadata": "FileNet document metadata schema indexing document attributes.",
  "ef-filenet": "Clustered IBM FileNet P8 repository hosting secure policy document databases.",
  "ef-postgres": "High-availability active-active database replica supporting disaster failover models.",
  "ef-audit": "Electronic audit logging recording all document compliance modifications.",
  "ef-ldap-verify": "Multi-layer security group checks securing enterprise policy access.",
  "ef-portal": "IBM Workplace XT portal displaying assignments to insurance underwriters."
};

export default function ProjectVisual({ type, variant = "card", activeLogIndex = 7 }: ProjectVisualProps) {
  const data = visualData[type];
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to check active state based on current telemetry log line index
  const isNodeActive = (nodeName: string) => {
    // If the telemetry execution has completed, all nodes are active in standby mode
    if (activeLogIndex >= 7) return true;

    if (type === "wellows") {
      switch (nodeName) {
        case "w-ingest": return activeLogIndex === 0;
        case "w-guard": return activeLogIndex === 0;
        case "w-ingest-sqs": return activeLogIndex === 1;
        case "w-router": return activeLogIndex === 1 || activeLogIndex === 6;
        case "w-kiva": return activeLogIndex === 2;
        case "w-opta": return activeLogIndex === 4;
        case "w-citation": return activeLogIndex === 5;
        case "w-vector": return activeLogIndex === 2 || activeLogIndex === 3;
        case "w-llm": return activeLogIndex === 4;
        case "w-fallback": return activeLogIndex === 5;
        case "w-judge": return activeLogIndex === 6;
        case "w-telemetry": return activeLogIndex >= 1;
        case "w-cache": return activeLogIndex === 6;
        default: return false;
      }
    } else if (type === "classflow") {
      switch (nodeName) {
        case "cf-event": return activeLogIndex === 0;
        case "cf-lock": return activeLogIndex === 1;
        case "cf-state": return activeLogIndex === 2;
        case "cf-timezone": return activeLogIndex === 2;
        case "cf-load": return activeLogIndex === 3;
        case "cf-celery": return activeLogIndex === 3;
        case "cf-postgres": return activeLogIndex === 4;
        case "cf-ledger": return activeLogIndex === 4;
        case "cf-stripe": return activeLogIndex === 4;
        case "cf-release": return activeLogIndex === 5;
        case "cf-broadcast": return activeLogIndex >= 4;
        default: return false;
      }
    } else if (type === "savyour") {
      switch (nodeName) {
        case "sv-webhook": return activeLogIndex === 0;
        case "sv-limiter": return activeLogIndex === 1;
        case "sv-router": return activeLogIndex === 2;
        case "sv-bloom": return activeLogIndex === 2;
        case "sv-calc": return activeLogIndex === 3;
        case "sv-sqs": return activeLogIndex === 3;
        case "sv-postgres": return activeLogIndex === 4;
        case "sv-ledger": return activeLogIndex === 4;
        case "sv-evict": return activeLogIndex === 4;
        case "sv-settle": return activeLogIndex >= 4;
        default: return false;
      }
    } else if (type === "efu") {
      switch (nodeName) {
        case "ef-scanner": return activeLogIndex === 0;
        case "ef-datacap": return activeLogIndex === 1;
        case "ef-router": return activeLogIndex === 2;
        case "ef-ldap": return activeLogIndex === 3;
        case "ef-dispatch": return activeLogIndex === 2;
        case "ef-metadata": return activeLogIndex === 1;
        case "ef-filenet": return activeLogIndex === 2;
        case "ef-postgres": return activeLogIndex === 4;
        case "ef-audit": return activeLogIndex === 4;
        case "ef-portal": return activeLogIndex >= 3;
        default: return false;
      }
    }
    return false;
  };

  const nodeClass = (nodeName: string) => {
    return `${styles.nodeGroup} ${isNodeActive(nodeName) ? styles.nodeActive : ""}`;
  };

  const WellowsDiagram = () => (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-wellows" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1"/>
        </pattern>
        <marker id="arrow-wellows" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#c59b53" />
        </marker>
        <marker id="arrow-wellows-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#00d66f" />
        </marker>
        <marker id="arrow-wellows-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#ff5f56" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-wellows)" />

      {/* Connection paths */}
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 0 * 0.02 }} d="M 75 70 L 75 110" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 1 * 0.02 }} d="M 130 130 L 170 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 2 * 0.02 }} d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 3 * 0.02 }} d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 4 * 0.02 }} d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 5 * 0.02 }} d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 6 * 0.02 }} d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 7 * 0.02 }} d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 8 * 0.02 }} d="M 540 150 L 540 190" stroke="#ff5f56" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow-wellows-red)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 9 * 0.02 }} d="M 230 150 L 230 210" stroke="#00d66f" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 10 * 0.02 }} d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-wellows)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 11 * 0.02 }} d="M 290 230 L 640 230 L 640 150" stroke="#00d66f" strokeWidth="1.5" markerEnd="url(#arrow-wellows-green)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 12 * 0.02 }} d="M 200 110 L 75 210" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow-wellows)" />

      {/* Interactive Node Groups */}
      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 0 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-ingest")} onMouseEnter={() => setHoveredNode("w-ingest")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="30" width="110" height="40" rx="6" />
        <text x="75" y="48" className={styles.nodeTitle}>Ingestion Gateway</text>
        <text x="75" y="60" className={styles.nodeSub}>FastAPI Node</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 1 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-guard")} onMouseEnter={() => setHoveredNode("w-guard")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="110" width="110" height="40" rx="6" />
        <circle cx="32" cy="130" r="3" fill="#c59b53" />
        <text x="77" y="128" className={styles.nodeTitle}>LlamaGuard Node</text>
        <text x="77" y="140" className={styles.nodeSub} fill="#c59b53 !important">Content Safety</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 2 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-router")} onMouseEnter={() => setHoveredNode("w-router")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="110" width="120" height="40" rx="6" />
        <text x="230" y="128" className={styles.nodeTitle}>LangGraph Router</text>
        <text x="230" y="140" className={styles.nodeSub}>State Orchestrator</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 3 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-kiva")} onMouseEnter={() => setHoveredNode("w-kiva")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="30" width="110" height="40" rx="6" />
        <text x="385" y="48" className={styles.nodeTitle}>KIVA Agent</text>
        <text x="385" y="60" className={styles.nodeSub}>Keyword Classifier</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 4 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-opta")} onMouseEnter={() => setHoveredNode("w-opta")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="110" width="110" height="40" rx="6" />
        <text x="385" y="128" className={styles.nodeTitle}>OPTA Agent</text>
        <text x="385" y="140" className={styles.nodeSub}>Technical Extractor</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 5 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-citation")} onMouseEnter={() => setHoveredNode("w-citation")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="190" width="110" height="40" rx="6" />
        <text x="385" y="208" className={styles.nodeTitle}>Citation Intel</text>
        <text x="385" y="220" className={styles.nodeSub}>LLM Brand Monitor</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 6 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-vector")} onMouseEnter={() => setHoveredNode("w-vector")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="30" width="120" height="40" rx="6" />
        <text x="540" y="48" className={styles.nodeTitle} fill="#00d66f !important">PGVector Index</text>
        <text x="540" y="60" className={styles.nodeSub}>Vector Ingestion</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 7 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-llm")} onMouseEnter={() => setHoveredNode("w-llm")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="110" width="120" height="40" rx="6" />
        <text x="540" y="128" className={styles.nodeTitle}>OpenAI GPT-4o</text>
        <text x="540" y="140" className={styles.nodeSub}>Primary LLM Node</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 8 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-fallback")} onMouseEnter={() => setHoveredNode("w-fallback")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="190" width="120" height="40" rx="6" />
        <text x="540" y="208" className={styles.nodeTitle} fill="#ff5f56 !important">AWS Bedrock Sonnet</text>
        <text x="540" y="220" className={styles.nodeSub}>RateLimit Fallback</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 9 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-judge")} onMouseEnter={() => setHoveredNode("w-judge")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="210" width="120" height="40" rx="6" />
        <text x="230" y="228" className={styles.nodeTitle} fill="#00d66f !important">LLM Judge / Evaluator</text>
        <text x="230" y="240" className={styles.nodeSub}>Confidence &gt; 0.85</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 10 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-telemetry")} onMouseEnter={() => setHoveredNode("w-telemetry")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="210" width="110" height="40" rx="6" />
        <text x="75" y="228" className={styles.nodeTitle}>LangSmith / Arize</text>
        <text x="75" y="240" className={styles.nodeSub}>Async Tracer</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 11 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("w-cache")} onMouseEnter={() => setHoveredNode("w-cache")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="630" y="110" width="110" height="40" rx="6" />
        <text x="685" y="128" className={styles.nodeTitle}>Redis Ingestion Cache</text>
        <text x="685" y="140" className={styles.nodeSub}>Audited Responses</text>
      </motion.g>
    </svg>
  );

  const ClassFlowDiagram = () => (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-classflow" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1"/>
        </pattern>
        <marker id="arrow-classflow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#8cc7ad" />
        </marker>
        <marker id="arrow-classflow-gold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#c59b53" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-classflow)" />

      {/* Connectors */}
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 0 * 0.02 }} d="M 75 70 L 75 110" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 1 * 0.02 }} d="M 130 130 L 170 130" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 2 * 0.02 }} d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 3 * 0.02 }} d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 4 * 0.02 }} d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 5 * 0.02 }} d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 6 * 0.02 }} d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 7 * 0.02 }} d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 8 * 0.02 }} d="M 600 130 L 630 130" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 9 * 0.02 }} d="M 230 150 L 230 210" stroke="#8cc7ad" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 10 * 0.02 }} d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-classflow)" />

      {/* Nodes */}
      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 0 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-event")} onMouseEnter={() => setHoveredNode("cf-event")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="30" width="110" height="40" rx="6" />
        <text x="75" y="48" className={styles.nodeTitle}>WS Class Event</text>
        <text x="75" y="60" className={styles.nodeSub}>Realtime Gateway</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 1 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-lock")} onMouseEnter={() => setHoveredNode("cf-lock")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="110" width="110" height="40" rx="6" />
        <circle cx="32" cy="130" r="3" fill="#8cc7ad" />
        <text x="77" y="128" className={styles.nodeTitle}>Redis Redlock</text>
        <text x="77" y="140" className={styles.nodeSub} fill="#8cc7ad !important">Distributed Lock</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 2 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-state")} onMouseEnter={() => setHoveredNode("cf-state")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="110" width="120" height="40" rx="6" />
        <text x="230" y="128" className={styles.nodeTitle}>Scheduler State</text>
        <text x="230" y="140" className={styles.nodeSub}>Match Execution</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 3 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-timezone")} onMouseEnter={() => setHoveredNode("cf-timezone")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="30" width="110" height="40" rx="6" />
        <text x="385" y="48" className={styles.nodeTitle}>Timezone Matcher</text>
        <text x="385" y="60" className={styles.nodeSub}>UTC Offset Scoping</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 4 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-load")} onMouseEnter={() => setHoveredNode("cf-load")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="110" width="110" height="40" rx="6" />
        <text x="385" y="128" className={styles.nodeTitle}>Load Scorer</text>
        <text x="385" y="140" className={styles.nodeSub}>Rating Indexer</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 5 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-celery")} onMouseEnter={() => setHoveredNode("cf-celery")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="190" width="110" height="40" rx="6" />
        <text x="385" y="208" className={styles.nodeTitle}>Celery Worker</text>
        <text x="385" y="220" className={styles.nodeSub}>Asynchronous Queue</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 6 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-postgres")} onMouseEnter={() => setHoveredNode("cf-postgres")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="30" width="120" height="40" rx="6" />
        <text x="540" y="48" className={styles.nodeTitle} fill="#c59b53 !important">PostgreSQL DB</text>
        <text x="540" y="60" className={styles.nodeSub}>Serializable Transaction</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 7 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-ledger")} onMouseEnter={() => setHoveredNode("cf-ledger")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="110" width="120" height="40" rx="6" />
        <text x="540" y="128" className={styles.nodeTitle}>Double-Entry Ledger</text>
        <text x="540" y="140" className={styles.nodeSub}>Deduplication Key</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 8 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-stripe")} onMouseEnter={() => setHoveredNode("cf-stripe")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="190" width="120" height="40" rx="6" />
        <text x="540" y="208" className={styles.nodeTitle}>Stripe Custom</text>
        <text x="540" y="220" className={styles.nodeSub}>Payout Api</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 9 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-release")} onMouseEnter={() => setHoveredNode("cf-release")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="210" width="120" height="40" rx="6" />
        <text x="230" y="228" className={styles.nodeTitle} fill="#8cc7ad !important">Redis Eviction</text>
        <text x="230" y="240" className={styles.nodeSub}>Release Mutex</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 10 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("cf-broadcast")} onMouseEnter={() => setHoveredNode("cf-broadcast")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="630" y="110" width="110" height="40" rx="6" />
        <text x="685" y="128" className={styles.nodeTitle}>WS State Sync</text>
        <text x="685" y="140" className={styles.nodeSub}>Client Broadcasts</text>
      </motion.g>
    </svg>
  );

  const SavyourDiagram = () => (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-savyour" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1"/>
        </pattern>
        <marker id="arrow-savyour" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#9db5d8" />
        </marker>
        <marker id="arrow-savyour-gold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#c59b53" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-savyour)" />

      {/* Connectors */}
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 0 * 0.02 }} d="M 75 70 L 75 110" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 1 * 0.02 }} d="M 130 130 L 170 130" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 2 * 0.02 }} d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 3 * 0.02 }} d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 4 * 0.02 }} d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 5 * 0.02 }} d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 6 * 0.02 }} d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 7 * 0.02 }} d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 8 * 0.02 }} d="M 600 130 L 630 130" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 9 * 0.02 }} d="M 230 150 L 230 210" stroke="#9db5d8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 10 * 0.02 }} d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-savyour)" />

      {/* Nodes */}
      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 0 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-webhook")} onMouseEnter={() => setHoveredNode("sv-webhook")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="30" width="110" height="40" rx="6" />
        <text x="75" y="48" className={styles.nodeTitle}>Partner Webhook</text>
        <text x="75" y="60" className={styles.nodeSub}>HMAC-SHA256 Payload</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 1 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-limiter")} onMouseEnter={() => setHoveredNode("sv-limiter")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="110" width="110" height="40" rx="6" />
        <circle cx="32" cy="130" r="3" fill="#9db5d8" />
        <text x="77" y="128" className={styles.nodeTitle}>Nginx Gateway</text>
        <text x="77" y="140" className={styles.nodeSub} fill="#9db5d8 !important">Rate Limiter (2500/s)</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 2 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-router")} onMouseEnter={() => setHoveredNode("sv-router")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="110" width="120" height="40" rx="6" />
        <text x="230" y="128" className={styles.nodeTitle}>Ingestion Router</text>
        <text x="230" y="140" className={styles.nodeSub}>Header Gate</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 3 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-bloom")} onMouseEnter={() => setHoveredNode("sv-bloom")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="30" width="110" height="40" rx="6" />
        <text x="385" y="48" className={styles.nodeTitle}>Bloom Filter</text>
        <text x="385" y="60" className={styles.nodeSub}>Deduplication Key</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 4 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-calc")} onMouseEnter={() => setHoveredNode("sv-calc")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="110" width="110" height="40" rx="6" />
        <text x="385" y="128" className={styles.nodeTitle}>Rewards Calc</text>
        <text x="385" y="140" className={styles.nodeSub}>Base & Promo Rates</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 5 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-sqs")} onMouseEnter={() => setHoveredNode("sv-sqs")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="190" width="110" height="40" rx="6" />
        <text x="385" y="208" className={styles.nodeTitle}>SQS Ingest Queue</text>
        <text x="385" y="220" className={styles.nodeSub}>Decoupled Buffer</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 6 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-evict")} onMouseEnter={() => setHoveredNode("sv-evict")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="30" width="120" height="40" rx="6" />
        <text x="540" y="48" className={styles.nodeTitle} fill="#00d66f !important">Redis Cache Eviction</text>
        <text x="540" y="60" className={styles.nodeSub}>Wallet Namespace</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 7 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-postgres")} onMouseEnter={() => setHoveredNode("sv-postgres")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="110" width="120" height="40" rx="6" />
        <text x="540" y="128" className={styles.nodeTitle} fill="#c59b53 !important">PostgreSQL DB</text>
        <text x="540" y="140" className={styles.nodeSub}>Repeatable Read ACID</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 8 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-ledger")} onMouseEnter={() => setHoveredNode("sv-ledger")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="190" width="120" height="40" rx="6" />
        <text x="540" y="208" className={styles.nodeTitle}>Double-Entry Ledger</text>
        <text x="540" y="220" className={styles.nodeSub}>Balance Mutex</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 9 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-sync")} onMouseEnter={() => setHoveredNode("sv-sync")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="210" width="120" height="40" rx="6" />
        <text x="230" y="228" className={styles.nodeTitle} fill="#9db5d8 !important">Idempotence Sync</text>
        <text x="230" y="240" className={styles.nodeSub}>Deduplication Sync</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 10 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("sv-settle")} onMouseEnter={() => setHoveredNode("sv-settle")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="630" y="110" width="110" height="40" rx="6" />
        <text x="685" y="128" className={styles.nodeTitle}>Wallet Balance Sync</text>
        <text x="685" y="140" className={styles.nodeSub}>Disbursement API</text>
      </motion.g>
    </svg>
  );

  const EFULifeDiagram = () => (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-efu" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1"/>
        </pattern>
        <marker id="arrow-efu" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#c9bca8" />
        </marker>
        <marker id="arrow-efu-gold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#c59b53" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-efu)" />

      {/* Connectors */}
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 0 * 0.02 }} d="M 75 70 L 75 110" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 1 * 0.02 }} d="M 130 130 L 170 130" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 2 * 0.02 }} d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 3 * 0.02 }} d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 4 * 0.02 }} d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 5 * 0.02 }} d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 6 * 0.02 }} d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 7 * 0.02 }} d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 8 * 0.02 }} d="M 600 130 L 630 130" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 9 * 0.02 }} d="M 230 150 L 230 210" stroke="#c9bca8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu)" />
      <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.65, ease: "easeInOut" as const, delay: 10 * 0.02 }} d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-efu)" />

      {/* Nodes */}
      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 0 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-scanner")} onMouseEnter={() => setHoveredNode("ef-scanner")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="30" width="110" height="40" rx="6" />
        <text x="75" y="48" className={styles.nodeTitle}>Physical Scanner</text>
        <text x="75" y="60" className={styles.nodeSub}>High-Vol Ingestion</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 1 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-datacap")} onMouseEnter={() => setHoveredNode("ef-datacap")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="20" y="110" width="110" height="40" rx="6" />
        <circle cx="32" cy="130" r="3" fill="#c9bca8" />
        <text x="77" y="128" className={styles.nodeTitle}>IBM Datacap Queue</text>
        <text x="77" y="140" className={styles.nodeSub} fill="#c9bca8 !important">OCR / Queue Store</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 2 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-router")} onMouseEnter={() => setHoveredNode("ef-router")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="110" width="120" height="40" rx="6" />
        <text x="230" y="128" className={styles.nodeTitle}>Case Router PE</text>
        <text x="230" y="140" className={styles.nodeSub}>IBM Process Engine</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 3 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-ldap")} onMouseEnter={() => setHoveredNode("ef-ldap")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="30" width="110" height="40" rx="6" />
        <text x="385" y="48" className={styles.nodeTitle}>LDAP AD Sync</text>
        <text x="385" y="60" className={styles.nodeSub}>Access Control List</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 4 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-dispatch")} onMouseEnter={() => setHoveredNode("ef-dispatch")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="110" width="110" height="40" rx="6" />
        <text x="385" y="128" className={styles.nodeTitle}>Dispatch Rules</text>
        <text x="385" y="140" className={styles.nodeSub}>Underwriter Routing</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 5 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-metadata")} onMouseEnter={() => setHoveredNode("ef-metadata")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="330" y="190" width="110" height="40" rx="6" />
        <text x="385" y="208" className={styles.nodeTitle}>Metadata Index</text>
        <text x="385" y="220" className={styles.nodeSub}>Document Metadata</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 6 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-filenet")} onMouseEnter={() => setHoveredNode("ef-filenet")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="30" width="120" height="40" rx="6" />
        <text x="540" y="48" className={styles.nodeTitle} fill="#00d66f !important">FileNet P8 Store</text>
        <text x="540" y="60" className={styles.nodeSub}>Clustered HA Repo</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 7 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-postgres")} onMouseEnter={() => setHoveredNode("ef-postgres")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="110" width="120" height="40" rx="6" />
        <text x="540" y="128" className={styles.nodeTitle} fill="#c59b53 !important">DB Clustered Stack</text>
        <text x="540" y="140" className={styles.nodeSub}>Active-Active Sync</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 8 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-audit")} onMouseEnter={() => setHoveredNode("ef-audit")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="480" y="190" width="120" height="40" rx="6" />
        <text x="540" y="208" className={styles.nodeTitle}>Audit Trail Logger</text>
        <text x="540" y="220" className={styles.nodeSub}>Compliance Audit</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 9 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-ldap-verify")} onMouseEnter={() => setHoveredNode("ef-ldap-verify")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="170" y="210" width="120" height="40" rx="6" />
        <text x="230" y="228" className={styles.nodeTitle} fill="#c9bca8 !important">LDAP ACL Verify</text>
        <text x="230" y="240" className={styles.nodeSub}>Security Groups</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" as const, stiffness: 280, damping: 18, delay: 10 * 0.025 }} whileHover={{ y: -3 }} className={nodeClass("ef-portal")} onMouseEnter={() => setHoveredNode("ef-portal")} onMouseLeave={() => setHoveredNode(null)}>
        <rect x="630" y="110" width="110" height="40" rx="6" />
        <text x="685" y="128" className={styles.nodeTitle}>Workplace XT UI</text>
        <text x="685" y="140" className={styles.nodeSub}>Underwriting Case</text>
      </motion.g>
    </svg>
  );

  const renderDiagram = () => {
    switch (type) {
      case "wellows": return WellowsDiagram();
      case "classflow": return ClassFlowDiagram();
      case "savyour": return SavyourDiagram();
      case "efu": return EFULifeDiagram();
      default: return null;
    }
  };

  return (
    <figure className={`${styles.visual} ${styles[type] || ""} ${styles[variant] || ""}`}>
      <figcaption>System Architecture Blueprint</figcaption>
      <div className={styles.window}>
        <header>
          <div className={styles.brand}>
            <span>{data.brand.slice(0, 1)}</span>
            <div>
              <strong>{data.brand}</strong>
              <small>{data.title}</small>
            </div>
          </div>
          <div className={styles.windowTools}>
            <i />
            <i />
            <i />
          </div>
        </header>
        <div className={styles.toolbar}>
          <nav>
            {data.tabs.map((tab, index) => (
              <span className={index === 0 ? styles.activeTab : ""} key={tab}>
                {tab}
              </span>
            ))}
          </nav>
          <strong>{data.metric}</strong>
        </div>
        <div className={styles.diagramContainer}>
          {renderDiagram()}
        </div>
        <div className={styles.consoleDetailBar}>
          <span className={styles.tickerPrefix}>[SYSTEM DETAILS]:</span>{" "}
          <span className={styles.tickerText}>
            {hoveredNode 
              ? nodeDescriptions[hoveredNode] 
              : "Hover any architecture node to inspect structural details, runtime constraints, and scaling tradeoffs."}
          </span>
        </div>
      </div>
    </figure>
  );
}
