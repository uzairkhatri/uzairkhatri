"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SelectedWork.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

type SvgNode = {
  id: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "default" | "gold" | "emerald";
  description: string;
};

type SvgEdge = {
  d: string;
  tone: "gold" | "emerald" | "muted";
  dashed?: boolean;
};

type Project = {
  number: string;
  tabTag: string;
  year: string;
  name: string;
  subtitle: string;
  role: string;
  statusLabel: string;
  codeSlug: string;
  caseStudyUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  solution: string;
  outcome: string;
  blueprint: {
    orchestration: string;
    data: string;
    infra: string;
  };
  tierLabels: [string, string, string];
  defaultActiveNodeId: string;
  nodes: SvgNode[];
  edges: SvgEdge[];
};

const projects: Project[] = [
  {
    number: "01",
    tabTag: "AI SaaS",
    year: "2024",
    name: "Wellows",
    subtitle: "Multi-Agent LLM Search Visibility & Content Remediation Platform",
    role: "SOLUTIONS ARCHITECT",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "WELLOWS-PROD",
    caseStudyUrl: "/work/wellows/",
    liveUrl: "https://wellows.com",
    liveLabel: "Visit wellows.com",
    metrics: [
      { value: "3 Agents", label: "LangGraph Runtime" },
      { value: "Isolated Queues", label: "SQS Token Governance" },
      { value: "Vector Fallback", label: "Qdrant Index" },
    ],
    challenge:
      "Single-query prototype failed under concurrent enterprise load, with unguarded token costs and disconnected content drafting.",
    solution:
      "Partitioned runtime into KIVA, OPTA, and Citation agents via LangGraph with isolated SQS queues, shared Qdrant retrieval, and Bedrock failover.",
    outcome:
      "Unified citation tracking across ChatGPT, Gemini, and Perplexity with automated remediation on one observable production spine.",
    blueprint: {
      orchestration: "LangGraph · FastAPI · Python",
      data: "Qdrant Vector · Redis · PostgreSQL",
      infra: "AWS ECS · SQS DLQ · LangSmith",
    },
    tierLabels: ["INGRESS", "AGENTS", "STORAGE & LLMS"],
    defaultActiveNodeId: "w-router",
    nodes: [
      // Row 1 (y=24, h=54)
      {
        id: "w-gateway",
        title: "FastAPI Gateway",
        sub: "Rate & Auth Gate",
        x: 105,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Async FastAPI entry layer enforcing tenant rate-limits, request authentication, and token budget headers.",
      },
      {
        id: "w-guard",
        title: "LlamaGuard Safety",
        sub: "Prompt Guardrail",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Pre-execution prompt safety classifier blocking injection attempts before agent state allocation.",
      },
      {
        id: "w-router",
        title: "LangGraph Router",
        sub: "State Orchestrator",
        x: 485,
        y: 24,
        w: 165,
        h: 54,
        tone: "gold",
        description:
          "LangGraph StateGraph Router — manages isolated agent state, deterministic retries, and token budgets.",
      },
      // Row 2 (y=124, h=58)
      {
        id: "w-kiva",
        title: "KIVA Writing Agent",
        sub: "Grounded Drafting",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "KIVA Writing Agent — drafts grounded remediation articles using shared brand citations and vector context.",
      },
      {
        id: "w-opta",
        title: "OPTA Technical Agent",
        sub: "Page & Schema Audit",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "OPTA Technical Agent — crawls search surfaces, audits schema health, and resolves technical citation gaps.",
      },
      {
        id: "w-citation",
        title: "Citation Intel Agent",
        sub: "Cross-LLM Monitor",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Citation Intelligence Agent — tracks brand visibility and sentiment across ChatGPT, Gemini, and Perplexity.",
      },
      // Row 3 (y=228, h=56)
      {
        id: "w-qdrant",
        title: "Qdrant Vector",
        sub: "Shared Retrieval",
        x: 105,
        y: 228,
        w: 122,
        h: 56,
        tone: "default",
        description:
          "Shared Qdrant vector index grounding both audit agents and content generation with semantic retrieval fallback.",
      },
      {
        id: "w-gpt4o",
        title: "GPT-4o Primary",
        sub: "Structured JSON",
        x: 243,
        y: 228,
        w: 122,
        h: 56,
        tone: "emerald",
        description:
          "Primary OpenAI GPT-4o node executing structured Pydantic-validated JSON extraction and synthesis.",
      },
      {
        id: "w-bedrock",
        title: "Claude 3.5",
        sub: "Bedrock Failover",
        x: 381,
        y: 228,
        w: 122,
        h: 56,
        tone: "gold",
        description:
          "Automated AWS Bedrock Claude 3.5 Sonnet failover triggered on HTTP 429 rate-limits or latency spikes.",
      },
      {
        id: "w-redis",
        title: "Redis Cache",
        sub: "Audited Outputs",
        x: 519,
        y: 228,
        w: 131,
        h: 56,
        tone: "default",
        description:
          "In-memory Redis semantic and response cache serving verified audit payloads to client dashboards.",
      },
    ],
    edges: [
      // Row 1 horizontal
      { d: "M 267 51 L 295 51", tone: "gold" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      // Router down to 3 agents
      { d: "M 567 78 L 567 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 567 78 L 567 101 L 376 101 L 376 124", tone: "emerald" },
      { d: "M 567 78 L 567 124", tone: "emerald" },
      // Agents down to Storage & LLMs
      { d: "M 186 182 L 186 205 L 166 205 L 166 228", tone: "gold" },
      { d: "M 186 182 L 186 205 L 304 205 L 304 228", tone: "gold" },
      { d: "M 376 182 L 376 205 L 304 205 L 304 228", tone: "emerald" },
      { d: "M 567 182 L 567 205 L 304 205 L 304 228", tone: "emerald" },
      // Row 3 horizontal
      { d: "M 227 256 L 243 256", tone: "muted" },
      { d: "M 365 256 L 381 256", tone: "gold", dashed: true },
      { d: "M 503 256 L 519 256", tone: "emerald" },
    ],
  },
  {
    number: "02",
    tabTag: "Fintech",
    year: "2023",
    name: "Savyour",
    subtitle: "High-Throughput Cashback Ledger & Partner Settlement Platform",
    role: "SOLUTIONS ARCHITECT",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "SAVYOUR-LEDGER",
    caseStudyUrl: "/work/savyour/",
    metrics: [
      { value: "100+", label: "Merchant Integrations" },
      { value: "ACID", label: "Double-Entry Ledger" },
      { value: "1M+ Users", label: "High-Volume Wallet Ops" },
    ],
    challenge:
      "Processing thousands of concurrent affiliate reward webhooks during retail campaigns while preventing duplicate cashback payouts.",
    solution:
      "Engineered HMAC-verified webhook ingestion, Bloom-filter deduplication, SQS buffering, and repeatable-read PostgreSQL ACID ledger transactions.",
    outcome:
      "Supported 100+ national merchant integrations with deterministic wallet consistency and sub-second balance reads.",
    blueprint: {
      orchestration: "FastAPI · Async Workers · Python",
      data: "PostgreSQL ACID · Redis Cluster",
      infra: "AWS SQS · Nginx Gateway · Docker",
    },
    tierLabels: ["INGRESS", "PROCESSING", "LEDGER & SYNC"],
    defaultActiveNodeId: "sv-ledger",
    nodes: [
      {
        id: "sv-webhook",
        title: "Partner Webhook",
        sub: "HMAC-SHA256 Payload",
        x: 105,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Merchant affiliate callback ingress verifying HMAC-SHA256 signatures and timestamp windows.",
      },
      {
        id: "sv-nginx",
        title: "Nginx Rate Gate",
        sub: "2,500 req/s Buffer",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Edge throttling and burst-buffer layer absorbing flash-sale traffic spikes up to 2,500 req/sec.",
      },
      {
        id: "sv-router",
        title: "Ingestion Router",
        sub: "Idempotency Gate",
        x: 485,
        y: 24,
        w: 165,
        h: 54,
        tone: "gold",
        description:
          "FastAPI ingestion router validating partner payload schemas and assigning idempotency keys.",
      },
      {
        id: "sv-bloom",
        title: "Bloom Filter",
        sub: "2ms Deduplication",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "2ms Bloom filter check rejecting duplicate partner transaction IDs before queue dispatch.",
      },
      {
        id: "sv-calc",
        title: "Rewards Engine",
        sub: "Tier & Promo Rules",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "Cashback calculation service applying merchant tier rules, campaign caps, and promo multipliers.",
      },
      {
        id: "sv-sqs",
        title: "AWS SQS Queue",
        sub: "Decoupled Buffer",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Decoupled asynchronous message queue protecting transactional database pools during campaign surges.",
      },
      {
        id: "sv-pg",
        title: "PostgreSQL DB",
        sub: "Repeatable Read",
        x: 105,
        y: 228,
        w: 122,
        h: 56,
        tone: "default",
        description:
          "Relational store enforcing strict transaction isolation and row-level locking on wallet balances.",
      },
      {
        id: "sv-ledger",
        title: "ACID Ledger",
        sub: "Double-Entry",
        x: 243,
        y: 228,
        w: 122,
        h: 56,
        tone: "emerald",
        description:
          "Double-Entry ACID Ledger — enforces immutable balance reconciliation across pending, verified, and settled states.",
      },
      {
        id: "sv-redis",
        title: "Redis Cache",
        sub: "Wallet Eviction",
        x: 381,
        y: 228,
        w: 122,
        h: 56,
        tone: "gold",
        description:
          "Hierarchical wallet cache with deterministic key invalidation upon ledger transaction commit.",
      },
      {
        id: "sv-settle",
        title: "Settlement API",
        sub: "Partner Payouts",
        x: 519,
        y: 228,
        w: 131,
        h: 56,
        tone: "default",
        description:
          "Outbound payout gateway reconciling settled cashback balances with banking and wallet rails.",
      },
    ],
    edges: [
      { d: "M 267 51 L 295 51", tone: "gold" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      { d: "M 567 78 L 567 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 267 153 L 295 153", tone: "emerald" },
      { d: "M 457 153 L 485 153", tone: "emerald" },
      { d: "M 567 182 L 567 205 L 166 205 L 166 228", tone: "emerald" },
      { d: "M 227 256 L 243 256", tone: "emerald" },
      { d: "M 365 256 L 381 256", tone: "gold" },
      { d: "M 503 256 L 519 256", tone: "emerald" },
    ],
  },
  {
    number: "03",
    tabTag: "Regulated",
    year: "2022",
    name: "Enterprise Insurer",
    subtitle: "Regulated Insurance Document Ingestion & Case Routing Architecture",
    role: "ENTERPRISE ARCHITECT",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "INSURANCE-WORKFLOW",
    caseStudyUrl: "/work/efu-life/",
    metrics: [
      { value: "5 Chains", label: "Automated Approvals" },
      { value: "OCR Queue", label: "Document Capture" },
      { value: "AD / LDAP", label: "Role Access Control" },
    ],
    challenge:
      "Migrating physical paper-bound policy and claim records into compliant digital case queues without losing audit traceability.",
    solution:
      "Architected an end-to-end OCR document ingestion pipeline, indexed high-availability content repository, and automated underwriter routing.",
    outcome:
      "Automated five core insurance approval chains, cutting case turnaround from week-scale physical handoffs to day-scale digital routing.",
    blueprint: {
      orchestration: "Enterprise Workflow & Case Engine",
      data: "HA Content Repo · Metadata Index",
      infra: "On-Premise HA Cluster · Active Directory",
    },
    tierLabels: ["CAPTURE", "GOVERNANCE", "REPOSITORY"],
    defaultActiveNodeId: "ef-router",
    nodes: [
      {
        id: "ef-scan",
        title: "Scanner Ingress",
        sub: "Branch Capture",
        x: 105,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Branch document capture stations digitizing physical policy and claim packets at high volume.",
      },
      {
        id: "ef-ocr",
        title: "OCR Ingest Queue",
        sub: "Classification Pool",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Automated optical character recognition and document classification pipeline extracting policy identifiers.",
      },
      {
        id: "ef-router",
        title: "Case Router Engine",
        sub: "Workflow Dispatch",
        x: 485,
        y: 24,
        w: 165,
        h: 54,
        tone: "gold",
        description:
          "Case Router Engine — evaluates policy rules and routes indexed documents into underwriter approval queues.",
      },
      {
        id: "ef-ldap",
        title: "LDAP / AD Sync",
        sub: "Identity & ACLs",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "Active Directory / LDAP integration enforcing role-based access boundaries across branch and HQ teams.",
      },
      {
        id: "ef-rules",
        title: "Dispatch Rules",
        sub: "Underwriting SLA",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "Deterministic routing rules assigning cases by risk tier, policy limit, and underwriter workload.",
      },
      {
        id: "ef-meta",
        title: "Metadata Index",
        sub: "Policy Schema",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Structured document metadata index linking scanned records to customer policies and claim histories.",
      },
      {
        id: "ef-store",
        title: "Document Store",
        sub: "Clustered HA Repo",
        x: 105,
        y: 228,
        w: 122,
        h: 56,
        tone: "default",
        description:
          "Centralized high-availability enterprise content store housing encrypted policy and claim records.",
      },
      {
        id: "ef-db",
        title: "HA DB Cluster",
        sub: "Active-Active Sync",
        x: 243,
        y: 228,
        w: 122,
        h: 56,
        tone: "emerald",
        description:
          "Active-active relational database cluster maintaining workflow state and disaster recovery continuity.",
      },
      {
        id: "ef-audit",
        title: "Audit Logger",
        sub: "Compliance Trail",
        x: 381,
        y: 228,
        w: 122,
        h: 56,
        tone: "gold",
        description:
          "Immutable compliance logger recording every document view, annotation, and approval transition.",
      },
      {
        id: "ef-portal",
        title: "Case Portal",
        sub: "Underwriter UI",
        x: 519,
        y: 228,
        w: 131,
        h: 56,
        tone: "default",
        description:
          "Unified underwriter workspace presenting case documents, SLA timers, and multi-tier sign-off controls.",
      },
    ],
    edges: [
      { d: "M 267 51 L 295 51", tone: "gold" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      { d: "M 567 78 L 567 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 567 78 L 567 101 L 376 101 L 376 124", tone: "emerald" },
      { d: "M 567 78 L 567 124", tone: "emerald" },
      { d: "M 376 182 L 376 205 L 166 205 L 166 228", tone: "emerald" },
      { d: "M 567 182 L 567 205 L 304 205 L 304 228", tone: "emerald" },
      { d: "M 227 256 L 243 256", tone: "muted" },
      { d: "M 365 256 L 381 256", tone: "gold" },
      { d: "M 503 256 L 519 256", tone: "emerald" },
    ],
  },
  {
    number: "04",
    tabTag: "Marketplace",
    year: "2024",
    name: "ClassFlow",
    subtitle: "Autonomous Global Tutoring Scheduler & Stripe Connect Ledger",
    role: "LEAD ARCHITECT",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "CLASSFLOW-SAAS",
    caseStudyUrl: "/work/classflow/",
    metrics: [
      { value: "Deterministic", label: "Timezone Matchmaking" },
      { value: "Redlock Mutex", label: "State Isolation" },
      { value: "Automated", label: "Stripe Connect Splits" },
    ],
    challenge:
      "Manual cross-timezone scheduling bottlenecks and concurrent booking race conditions caused double-booked tutors during peak hours.",
    solution:
      "Built a sub-100ms timezone matchmaking state machine protected by Redis Redlock distributed mutexes and automated Stripe Connect payouts.",
    outcome:
      "Eliminated double-booking incidents and moved scheduling, live session state, and tutor disbursements into a zero-touch pipeline.",
    blueprint: {
      orchestration: "FastAPI · Celery · WebSockets",
      data: "Redis Redlock · PostgreSQL Serializable",
      infra: "Stripe Connect · AWS ECS · Docker",
    },
    tierLabels: ["INGRESS", "MATCHING", "SETTLEMENT"],
    defaultActiveNodeId: "cf-lock",
    nodes: [
      {
        id: "cf-ws",
        title: "WebSocket Gateway",
        sub: "Realtime Ingress",
        x: 105,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Realtime session gateway handling student booking intents and live classroom presence heartbeats.",
      },
      {
        id: "cf-lock",
        title: "Redis Redlock",
        sub: "Distributed Mutex",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "gold",
        description:
          "Redis Redlock Distributed Mutex — enforces atomic slot reservation and lock expiration across concurrent booking requests.",
      },
      {
        id: "cf-state",
        title: "Scheduler State",
        sub: "Slot Coordinator",
        x: 485,
        y: 24,
        w: 165,
        h: 54,
        tone: "default",
        description:
          "Deterministic booking state machine coordinating slot holds, confirmations, and timeout releases.",
      },
      {
        id: "cf-tz",
        title: "Timezone Engine",
        sub: "UTC Offset Match",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "Sub-100ms UTC offset resolver pairing students with available tutors across 14 global timezones.",
      },
      {
        id: "cf-score",
        title: "Load Scorer",
        sub: "Affinity & Rating",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "Multi-factor ranking engine weighting subject affinity, historical ratings, and active tutor capacity.",
      },
      {
        id: "cf-celery",
        title: "Celery Workers",
        sub: "Async Dispatch",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Background worker pool executing notifications, calendar syncs, and post-session settlement jobs.",
      },
      {
        id: "cf-pg",
        title: "PostgreSQL DB",
        sub: "Serializable Acid",
        x: 105,
        y: 228,
        w: 122,
        h: 56,
        tone: "default",
        description:
          "Serializable transaction store persisting finalized class schedules and attendance records.",
      },
      {
        id: "cf-ledger",
        title: "Payout Ledger",
        sub: "Idempotent Keys",
        x: 243,
        y: 228,
        w: 122,
        h: 56,
        tone: "emerald",
        description:
          "Double-entry escrow and payout ledger verifying completed session milestones before disbursement.",
      },
      {
        id: "cf-stripe",
        title: "Stripe Connect",
        sub: "Auto Split Payout",
        x: 381,
        y: 228,
        w: 122,
        h: 56,
        tone: "gold",
        description:
          "Automated Stripe Connect integration executing multi-party split payments and tutor disbursements.",
      },
      {
        id: "cf-sync",
        title: "WS Broadcast",
        sub: "Live Board Sync",
        x: 519,
        y: 228,
        w: 131,
        h: 56,
        tone: "default",
        description:
          "Outbound WebSocket broadcaster updating student and tutor dashboards immediately upon state commit.",
      },
    ],
    edges: [
      { d: "M 267 51 L 295 51", tone: "gold" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      { d: "M 376 78 L 376 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 567 78 L 567 101 L 376 101 L 376 124", tone: "emerald" },
      { d: "M 567 78 L 567 124", tone: "emerald" },
      { d: "M 376 182 L 376 205 L 166 205 L 166 228", tone: "emerald" },
      { d: "M 567 182 L 567 205 L 304 205 L 304 228", tone: "emerald" },
      { d: "M 227 256 L 243 256", tone: "emerald" },
      { d: "M 365 256 L 381 256", tone: "gold" },
      { d: "M 503 256 L 519 256", tone: "emerald" },
    ],
  },
];

export default function SelectedWork() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProject = projects[activeTab];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    activeProject.defaultActiveNodeId
  );

  useEffect(() => {
    setSelectedNodeId(projects[activeTab].defaultActiveNodeId);
  }, [activeTab]);

  const activeNode =
    activeProject.nodes.find((n) => n.id === selectedNodeId) ||
    activeProject.nodes[0];

  return (
    <section
      className={styles.section}
      id="work"
      aria-labelledby="work-title"
    >
      <div className={styles.container}>
        {/* Unified Architectural Dossier Frame (Matching Section 02) */}
        <div className={styles.dossierFrame}>
          <span className={styles.cornerTL} aria-hidden="true" />
          <span className={styles.cornerTR} aria-hidden="true" />
          <span className={styles.cornerBL} aria-hidden="true" />
          <span className={styles.cornerBR} aria-hidden="true" />

          <div className={styles.topEdgeGlow} aria-hidden="true" />

          {/* Row 1: Header + Non-Wrapping 4-System Switcher */}
          <header className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <div className={styles.eyebrow}>
                <svg
                  className={styles.eyebrowStar}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="#d4aa67"
                  aria-hidden="true"
                >
                  <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
                </svg>
                <span>03 // SELECTED WORK &middot; PRODUCTION CASE STUDIES</span>
              </div>
              <h2 className={styles.title} id="work-title">
                Architect Systems. <span className={styles.titleMuted}>Stress Assumptions.</span> <span className={styles.titleAccent}>See What Holds.</span>
              </h2>
            </div>

            <nav
              className={styles.switcherTrack}
              role="tablist"
              aria-label="Project architecture selector"
            >
              {projects.map((proj, idx) => {
                const isSelected = idx === activeTab;
                return (
                  <button
                    key={proj.number}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`${styles.switcherTab} ${
                      isSelected ? styles.switcherTabActive : ""
                    }`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <span className={styles.switcherNum}>[{proj.number}]</span>
                    <strong className={styles.switcherName}>{proj.name}</strong>
                    <span className={styles.switcherDot} aria-hidden="true">
                      &middot;
                    </span>
                    <span className={styles.switcherTag}>{proj.tabTag}</span>
                  </button>
                );
              })}
            </nav>
          </header>

          {/* Row 2: Asymmetric 2-Column Split Stage Inside the Dossier */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={styles.stageGrid}
            >
              {/* LEFT COLUMN (44%): Executive Case Study Story & Metrics */}
              <article className={styles.narrativeCol}>
                <div className={styles.metaRow}>
                  <span className={styles.roleBadge}>
                    {activeProject.role} &middot; {activeProject.year}
                  </span>
                  <span className={styles.statusIndicator}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    {activeProject.statusLabel}
                  </span>
                </div>

                <h3 className={styles.projectTitle}>{activeProject.name}</h3>
                <p className={styles.projectSubtitle}>
                  {activeProject.subtitle}
                </p>

                {/* 3-Metric Highlight Cards */}
                <div className={styles.metricsGrid}>
                  {activeProject.metrics.map((m) => (
                    <div className={styles.metricCard} key={m.label}>
                      <strong className={styles.metricValue}>{m.value}</strong>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Connected 3-Step Engineering Timeline */}
                <ol
                  className={styles.timelineList}
                  aria-label={`${activeProject.name} case study summary`}
                >
                  <li className={styles.timelineStep}>
                    <span className={styles.stepCircle} aria-hidden="true">
                      01
                    </span>
                    <p className={styles.stepText}>
                      <strong>THE BOTTLENECK:</strong> {activeProject.challenge}
                    </p>
                  </li>
                  <li className={styles.timelineStep}>
                    <span className={styles.stepCircle} aria-hidden="true">
                      02
                    </span>
                    <p className={styles.stepText}>
                      <strong>THE ARCHITECTURE:</strong>{" "}
                      {activeProject.solution}
                    </p>
                  </li>
                  <li className={styles.timelineStep}>
                    <span className={styles.stepCircle} aria-hidden="true">
                      03
                    </span>
                    <p className={styles.stepText}>
                      <strong>PRODUCTION OUTCOME:</strong>{" "}
                      {activeProject.outcome}
                    </p>
                  </li>
                </ol>

                {/* Dual CTA Row */}
                <div className={styles.ctaRow}>
                  <a
                    href={withBasePath(activeProject.caseStudyUrl)}
                    className={styles.primaryCta}
                    data-source="selected-work"
                  >
                    <span>Read Full Case Study</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                  {activeProject.liveUrl ? (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.secondaryCta}
                    >
                      <span>
                        {activeProject.liveLabel || "Visit Live Site"}
                      </span>
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  ) : (
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.secondaryCta}
                    >
                      <span>Discuss Architecture</span>
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  )}
                </div>
              </article>

              {/* RIGHT COLUMN (56%): Precision SVG Architecture Blueprint & Spec Matrix */}
              <div className={styles.blueprintCol}>
                <div className={styles.schematicWindow}>
                  {/* Schematic Window Header */}
                  <div className={styles.schematicHeader}>
                    <span className={styles.schematicTitle}>
                      SYSTEM ARCHITECTURE BLUEPRINT // {activeProject.codeSlug}
                    </span>
                    <span className={styles.schematicBadge}>
                      INTERACTIVE SCHEMATIC
                    </span>
                  </div>

                  {/* Coordinate-Accurate Interactive SVG Schematic */}
                  <div className={styles.schematicCanvas}>
                    <svg
                      viewBox="0 0 672 308"
                      className={styles.schematicSvg}
                      role="img"
                      aria-label={`${activeProject.name} system architecture diagram`}
                    >
                      <defs>
                        <pattern
                          id="bp-grid"
                          width="22"
                          height="22"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 22 0 L 0 0 0 22"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.03)"
                            strokeWidth="1"
                          />
                        </pattern>
                        <marker
                          id="arr-gold"
                          viewBox="0 0 10 10"
                          refX="7"
                          refY="5"
                          markerWidth="5"
                          markerHeight="5"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d4aa67" />
                        </marker>
                        <marker
                          id="arr-emerald"
                          viewBox="0 0 10 10"
                          refX="7"
                          refY="5"
                          markerWidth="5"
                          markerHeight="5"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2ecc71" />
                        </marker>
                        <marker
                          id="arr-muted"
                          viewBox="0 0 10 10"
                          refX="7"
                          refY="5"
                          markerWidth="5"
                          markerHeight="5"
                          orient="auto-start-reverse"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7d8694" />
                        </marker>
                      </defs>

                      <rect width="672" height="308" fill="url(#bp-grid)" />

                      {/* Tier Labels on Left Margin */}
                      <text
                        x="18"
                        y="55"
                        fill="#8b949e"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        {activeProject.tierLabels[0]}
                      </text>
                      <text
                        x="18"
                        y="156"
                        fill="#8b949e"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        {activeProject.tierLabels[1]}
                      </text>
                      <text
                        x="18"
                        y="252"
                        fill="#8b949e"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="0.08em"
                      >
                        {activeProject.tierLabels[2].split(" ")[0]}
                      </text>
                      {activeProject.tierLabels[2].includes(" ") && (
                        <text
                          x="18"
                          y="266"
                          fill="#8b949e"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="0.08em"
                        >
                          {activeProject.tierLabels[2]
                            .split(" ")
                            .slice(1)
                            .join(" ")}
                        </text>
                      )}

                      {/* Connector Edges */}
                      {activeProject.edges.map((edge, idx) => {
                        const stroke =
                          edge.tone === "gold"
                            ? "rgba(212, 170, 103, 0.75)"
                            : edge.tone === "emerald"
                            ? "rgba(46, 204, 113, 0.75)"
                            : "rgba(140, 150, 165, 0.45)";
                        const marker =
                          edge.tone === "gold"
                            ? "url(#arr-gold)"
                            : edge.tone === "emerald"
                            ? "url(#arr-emerald)"
                            : "url(#arr-muted)";
                        return (
                          <path
                            key={idx}
                            d={edge.d}
                            fill="none"
                            stroke={stroke}
                            strokeWidth="1.5"
                            strokeDasharray={edge.dashed ? "4 3" : undefined}
                            markerEnd={marker}
                          />
                        );
                      })}

                      {/* Interactive Nodes */}
                      {activeProject.nodes.map((node) => {
                        const isSelected = node.id === activeNode.id;
                        const fill =
                          node.tone === "gold"
                            ? "rgba(38, 30, 18, 0.95)"
                            : node.tone === "emerald"
                            ? "rgba(14, 35, 25, 0.95)"
                            : "rgba(18, 22, 29, 0.95)";
                        const stroke = isSelected
                          ? "#f5d69b"
                          : node.tone === "gold"
                          ? "rgba(212, 170, 103, 0.85)"
                          : node.tone === "emerald"
                          ? "rgba(46, 204, 113, 0.82)"
                          : "rgba(255, 255, 255, 0.16)";
                        const cx = node.x + node.w / 2;
                        const cy = node.y + node.h / 2;

                        return (
                          <g
                            key={node.id}
                            className={styles.svgNodeGroup}
                            onMouseEnter={() => setSelectedNodeId(node.id)}
                            onClick={() => setSelectedNodeId(node.id)}
                            tabIndex={0}
                            role="button"
                            aria-label={`${node.title} — ${node.sub}`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedNodeId(node.id);
                              }
                            }}
                          >
                            <rect
                              x={node.x}
                              y={node.y}
                              width={node.w}
                              height={node.h}
                              rx="8"
                              fill={fill}
                              stroke={stroke}
                              strokeWidth={isSelected ? "2" : "1.25"}
                            />
                            <text
                              x={cx}
                              y={cy - 4}
                              textAnchor="middle"
                              fill="#f7f7f5"
                              fontSize="11.5"
                              fontWeight="600"
                            >
                              {node.title}
                            </text>
                            <text
                              x={cx}
                              y={cy + 12}
                              textAnchor="middle"
                              fill={
                                node.tone === "gold"
                                  ? "#dfb978"
                                  : node.tone === "emerald"
                                  ? "#58d68d"
                                  : "#9ba3ae"
                              }
                              fontSize="10"
                              fontWeight="500"
                            >
                              {node.sub}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Live Node Inspector Bar */}
                  <div className={styles.inspectorBar}>
                    <span className={styles.inspectorDot} aria-hidden="true" />
                    <p className={styles.inspectorText}>
                      <strong className={styles.inspectorPrefix}>
                        ACTIVE NODE: {activeNode.title}
                      </strong>{" "}
                      &mdash; {activeNode.description}
                    </p>
                  </div>
                </div>

                {/* Bottom 3-Column Technical Blueprint Spec Footer */}
                <div className={styles.specFooterGrid}>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>ORCHESTRATION</span>
                    <strong className={styles.specValue}>
                      {activeProject.blueprint.orchestration}
                    </strong>
                  </div>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>
                      DATA &amp; RETRIEVAL
                    </span>
                    <strong className={styles.specValue}>
                      {activeProject.blueprint.data}
                    </strong>
                  </div>
                  <div className={styles.specCell}>
                    <span className={styles.specLabel}>INFRASTRUCTURE</span>
                    <strong className={styles.specValue}>
                      {activeProject.blueprint.infra}
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
