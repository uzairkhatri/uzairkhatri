"use client";

import React, { useEffect, useState } from "react";
import styles from "./SelectedWork.module.css";
import { withBasePath } from "./siteLinks";

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

type ArchitecturalDecision = {
  title: string;
  decision: string;
  tradeoff: string;
};

type Project = {
  number: string;
  name: string;
  category: string;
  categoryTag: string;
  subtitle: string;
  role: string;
  year: string;
  statusLabel: string;
  codeSlug: string;
  caseStudyUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  problem: string;
  contribution: string;
  decisions: ArchitecturalDecision[];
  stack: string[];
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
    name: "Wellows",
    category: "Production AI Platform",
    categoryTag: "AI & RAG ARCHITECTURE",
    subtitle: "Multi-Agent Search Visibility & Citation Remediation Engine",
    role: "Solutions Architect",
    year: "2024",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "WELLOWS-PROD",
    caseStudyUrl: "/work/wellows/",
    liveUrl: "https://wellows.com",
    liveLabel: "Visit wellows.com",
    problem:
      "Single-query prototype scripts degraded under concurrent enterprise load, with unguarded token spend and ungrounded model outputs across AI search surfaces.",
    contribution:
      "Co-engineered a multi-agent orchestration architecture using LangGraph state machines, Pydantic schema validation, and isolated SQS queues to decouple citation auditing from content generation.",
    decisions: [
      {
        title: "Multi-Agent Supervisor vs. Monolithic Chain",
        decision:
          "Partitioned runtime into Citation Intelligence, Technical Auditor, and Writing Assistant agents under a LangGraph supervisor.",
        tradeoff:
          "Increased state machine orchestration complexity in exchange for bounded failure domains and token rate-limit isolation.",
      },
      {
        title: "Decoupled Asynchronous Task Queuing",
        decision:
          "Decoupled ingress API requests from long-running LLM generation and crawl pipelines via AWS SQS FIFO and Dead-Letter Queues (DLQ).",
        tradeoff:
          "Client applications require polling or webhook completion semantics, but workers never drop jobs during traffic surges.",
      },
      {
        title: "Tiered LLM Routing & Bedrock Failover",
        decision:
          "OpenAI GPT-4o structured extraction with automated AWS Bedrock Claude 3.5 Sonnet failover on HTTP 429 rate-limits.",
        tradeoff:
          "Requires maintaining strict schema validation parity across providers to eliminate single-vendor downtime risk.",
      },
    ],
    stack: [
      "LangGraph",
      "Python / FastAPI",
      "AWS SQS & Redis",
      "Qdrant Vector",
      "AWS Bedrock",
    ],
    blueprint: {
      orchestration: "LangGraph · FastAPI · Python",
      data: "Qdrant Vector · Redis · PostgreSQL",
      infra: "AWS ECS · SQS DLQ · LangSmith",
    },
    tierLabels: ["INGRESS", "AGENTS", "STORAGE & LLMS"],
    defaultActiveNodeId: "w-router",
    nodes: [
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
          "Edge API Gateway enforcing token bucket rate limits, customer tenancy, and audit trace header propagation.",
      },
      {
        id: "w-router",
        title: "Agent Supervisor",
        sub: "LangGraph Controller",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "gold",
        description:
          "LangGraph supervisor state machine coordinating specialized agents with isolated task boundaries and bounded memory.",
      },
      {
        id: "w-sqs",
        title: "SQS Buffer & DLQ",
        sub: "Decoupled Ingestion",
        x: 485,
        y: 24,
        w: 165,
        h: 54,
        tone: "default",
        description:
          "Decoupled AWS SQS message queue absorbing concurrent customer burst loads with automatic dead-letter retries.",
      },
      {
        id: "w-kiva",
        title: "KIVA Writer",
        sub: "Remediation Agent",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "Autonomous drafting agent generating citation-targeted content grounded in brand knowledge and real search data.",
      },
      {
        id: "w-opta",
        title: "OPTA Auditor",
        sub: "Technical SEO Agent",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "Deterministic audit agent checking schema markup, entity consistency, and crawl accessibility across target URLs.",
      },
      {
        id: "w-cit",
        title: "Citation Intel",
        sub: "Cross-LLM Monitor",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Citation Intelligence Agent tracking brand visibility and sentiment across ChatGPT, Gemini, and Perplexity.",
      },
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
      { d: "M 267 51 L 295 51", tone: "gold" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      { d: "M 567 78 L 567 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 567 78 L 567 101 L 376 101 L 376 124", tone: "emerald" },
      { d: "M 567 78 L 567 124", tone: "emerald" },
      { d: "M 186 182 L 186 205 L 166 205 L 166 228", tone: "gold" },
      { d: "M 186 182 L 186 205 L 304 205 L 304 228", tone: "gold" },
      { d: "M 376 182 L 376 205 L 304 205 L 304 228", tone: "emerald" },
      { d: "M 567 182 L 567 205 L 304 205 L 304 228", tone: "emerald" },
      { d: "M 227 256 L 243 256", tone: "muted" },
      { d: "M 365 256 L 381 256", tone: "gold", dashed: true },
      { d: "M 503 256 L 519 256", tone: "emerald" },
    ],
  },
  {
    number: "02",
    name: "Savyour",
    category: "Fintech & Distributed Backend",
    categoryTag: "FINTECH & DISTRIBUTED SYSTEMS",
    subtitle: "High-Throughput Cashback Webhook Ingestion & Settlement Platform",
    role: "Solutions Architect / Engineering Lead",
    year: "2023",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "SAVYOUR-LEDGER",
    caseStudyUrl: "/work/savyour/",
    problem:
      "Nationwide retail promotion bursts triggered concurrent affiliate reward webhooks across 100+ merchant integrations, risking race conditions and duplicate cashback ledger distributions.",
    contribution:
      "Architected distributed mutex locking with Redis Redlock, idempotent HMAC webhook ingestion, and double-entry transaction boundaries in PostgreSQL to protect ledger integrity.",
    decisions: [
      {
        title: "Distributed Mutex Locking (Redis Redlock)",
        decision:
          "Enforced millisecond distributed mutexes across worker nodes for wallet balance updates with automated lease expiration.",
        tradeoff:
          "Operational dependency on Redis cluster consensus, backed by repeatable-read database row-level locking during failovers.",
      },
      {
        title: "Idempotent HMAC Ingestion & Bloom Deduplication",
        decision:
          "Webhook signatures verified via HMAC and partner transaction IDs checked against in-memory Bloom filters prior to queue dispatch.",
        tradeoff:
          "Memory allocation for filter keys in exchange for dropping duplicate payloads before expensive database writes.",
      },
      {
        title: "Double-Entry Immutable Transaction Ledger",
        decision:
          "Structured balances into strict pending, verified, and settled double-entry journal records in PostgreSQL.",
        tradeoff:
          "Write amplification of two rows per transaction to guarantee mathematical balance reconciliation and audit tracing.",
      },
    ],
    stack: [
      "Redis Redlock",
      "PostgreSQL ACID",
      "AWS ECS & SQS",
      "FastAPI",
      "HMAC Verification",
    ],
    blueprint: {
      orchestration: "FastAPI · Async Workers · Python",
      data: "PostgreSQL ACID · Redis Cluster",
      infra: "AWS ECS · CloudWatch · SQS",
    },
    tierLabels: ["INGRESS", "PIPELINE", "LEDGER"],
    defaultActiveNodeId: "sv-lock",
    nodes: [
      {
        id: "sv-ingress",
        title: "Webhook Ingress",
        sub: "HMAC Authenticator",
        x: 105,
        y: 24,
        w: 162,
        h: 54,
        tone: "default",
        description:
          "Public-facing webhook receiver validating affiliate network HMAC signatures and timestamp freshness.",
      },
      {
        id: "sv-lock",
        title: "Redis Redlock",
        sub: "Distributed Mutex",
        x: 295,
        y: 24,
        w: 162,
        h: 54,
        tone: "gold",
        description:
          "Redis Redlock Distributed Mutex acquiring atomic leases per transaction ID to serialize concurrent webhook events.",
      },
      {
        id: "sv-router",
        title: "Ingestion Router",
        sub: "FastAPI Async",
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
        sub: "In-Memory Deduplication",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "gold",
        description:
          "Fast Bloom filter check rejecting duplicate partner transaction IDs before queue dispatch.",
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
        tone: "default",
        description:
          "Decoupled Amazon SQS FIFO queue smoothing transaction throughput spikes ahead of database commits.",
      },
      {
        id: "sv-worker",
        title: "Worker Pool",
        sub: "Celery Workers",
        x: 105,
        y: 228,
        w: 162,
        h: 56,
        tone: "emerald",
        description:
          "Containerized Celery worker cluster running in AWS ECS processing verified webhook events in parallel.",
      },
      {
        id: "sv-db",
        title: "PostgreSQL ACID",
        sub: "Double-Entry Ledger",
        x: 295,
        y: 228,
        w: 162,
        h: 56,
        tone: "gold",
        description:
          "PostgreSQL double-entry ledger enforcing atomic balance reconciliation across pending, verified, and settled states.",
      },
      {
        id: "sv-audit",
        title: "Audit Log Store",
        sub: "Immutable Trail",
        x: 485,
        y: 228,
        w: 165,
        h: 56,
        tone: "default",
        description:
          "Append-only audit archive tracking every balance transition, reversal, and merchant settlement event.",
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
    name: "ClassFlow",
    category: "Marketplace SaaS & Concurrency",
    categoryTag: "DISTRIBUTED CONCURRENCY & FINTECH",
    subtitle: "Autonomous Global Tutoring Matchmaker & Stripe Connect Ledger",
    role: "Lead Architect",
    year: "2024",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "CLASSFLOW-SAAS",
    caseStudyUrl: "/work/classflow/",
    problem:
      "Manual cross-timezone scheduling bottlenecks and checkout surges caused booking race conditions that resulted in concurrent double-booking of popular instructors.",
    contribution:
      "Architected a deterministic timezone matchmaking state machine, Redis Redlock distributed mutexes to lock calendar slots atomically, and automated Stripe Connect multi-party payout reconciliation.",
    decisions: [
      {
        title: "Atomic Slot Reservation (Redis Redlock)",
        decision:
          "Enforced a 45-second reservation lease during checkout with atomic release upon Stripe payment confirmation.",
        tradeoff:
          "Temporary slot holds during abandoned checkouts, but completely eliminated concurrent booking collisions.",
      },
      {
        title: "Deterministic Matchmaking Scoring Engine",
        decision:
          "Multi-factor heuristic scoring (UTC offset, subject affinity, instructor load ceilings) replacing manual coordinator dispatch.",
        tradeoff:
          "Algorithmic calibration required to avoid instructor burnout, but reduced match turnaround from hours to seconds.",
      },
      {
        title: "Bidirectional WebSocket Session State",
        decision:
          "FastAPI WebSockets with Redis Pub/Sub streaming real-time classroom state transitions and automated presence heartbeats.",
        tradeoff:
          "Stateful socket connections require sticky session routing, but eliminated client polling lag across global participants.",
      },
    ],
    stack: [
      "FastAPI & Celery",
      "Redis Redlock",
      "PostgreSQL Serializable",
      "Stripe Connect",
      "WebSockets",
    ],
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
          "Redis Redlock Distributed Mutex enforcing atomic slot reservation and lock expiration across concurrent booking requests.",
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
          "Deterministic UTC offset resolver pairing students with available tutors across global timezones.",
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
        id: "cf-queue",
        title: "Celery Dispatch",
        sub: "Background Workers",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "default",
        description:
          "Asynchronous worker queue handling reminder dispatches, calendar syncing, and session billing.",
      },
      {
        id: "cf-db",
        title: "PostgreSQL DB",
        sub: "Serializable ACID",
        x: 105,
        y: 228,
        w: 122,
        h: 56,
        tone: "emerald",
        description:
          "Relational datastore running with serializable isolation level to guarantee booking slot conflict rejection.",
      },
      {
        id: "cf-redis",
        title: "Redis Cache",
        sub: "Presence & Locks",
        x: 243,
        y: 228,
        w: 122,
        h: 56,
        tone: "gold",
        description:
          "Fast in-memory cache maintaining real-time instructor presence flags and active reservation locks.",
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
  {
    number: "04",
    name: "Enterprise Insurer",
    category: "Enterprise Workflow & Integrations",
    categoryTag: "REGULATED ENTERPRISE WORKFLOWS",
    subtitle: "Regulated Insurance Document Ingestion & Case Routing Architecture",
    role: "Enterprise Architect",
    year: "2022",
    statusLabel: "SHIPPED TO PRODUCTION",
    codeSlug: "INSURANCE-WORKFLOW",
    caseStudyUrl: "/work/efu-life/",
    problem:
      "Core insurance underwriting relied on paper-bound records and manual department handoffs, creating multi-day review queues and regulatory audit tracing gaps.",
    contribution:
      "Architected automated document capture, structured content indexing, and rules-based approval routing integrated with enterprise Active Directory / LDAP directories.",
    decisions: [
      {
        title: "Automated OCR Classification Queue",
        decision:
          "Automated optical character recognition pipeline extracting policy identifiers and document types directly into branch capture queues.",
        tradeoff:
          "Confidence score calibration required manual fallbacks for degraded physical scans, but cut manual index latency.",
      },
      {
        title: "Rules-Based Dynamic Underwriting Dispatch",
        decision:
          "Automated case routing across 5 core insurance approval chains based on policy risk tiers and underwriter approval authority.",
        tradeoff:
          "Complex configuration matrix, but eliminated physical file transit across dispersed regional branch offices.",
      },
      {
        title: "Directory-Integrated Governance (AD / LDAP)",
        decision:
          "Role-based access controls mapped directly to corporate Active Directory groups with centralized audit logging.",
        tradeoff:
          "Enterprise directory synchronization overhead in exchange for strict regulatory audit compliance.",
      },
    ],
    stack: [
      "Enterprise Workflow Engine",
      "High-Availability Content Repo",
      "OCR Ingestion Pipeline",
      "Active Directory / LDAP",
    ],
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
          "Centralized rules engine evaluating underwriting limits and routing cases to designated review pools.",
      },
      {
        id: "ef-meta",
        title: "Metadata Index",
        sub: "Structured Search",
        x: 105,
        y: 124,
        w: 162,
        h: 58,
        tone: "default",
        description:
          "High-performance metadata index enabling instant lookup of claims by policy number, CNIC, or branch ID.",
      },
      {
        id: "ef-rules",
        title: "Underwriter Rules",
        sub: "5 Approval Chains",
        x: 295,
        y: 124,
        w: 162,
        h: 58,
        tone: "emerald",
        description:
          "Multi-level approval state machines automating sign-offs across 5 core insurance product categories.",
      },
      {
        id: "ef-audit",
        title: "Audit Logger",
        sub: "Compliance Vault",
        x: 485,
        y: 124,
        w: 165,
        h: 58,
        tone: "emerald",
        description:
          "Tamper-evident audit logging recording every document access, underwriting approval, and decision timestamp.",
      },
      {
        id: "ef-store",
        title: "HA Content Store",
        sub: "Distributed Storage",
        x: 105,
        y: 228,
        w: 162,
        h: 56,
        tone: "default",
        description:
          "Clustered enterprise document repository providing high availability and encrypted archive storage.",
      },
      {
        id: "ef-ldap",
        title: "AD / LDAP Auth",
        sub: "Directory Sync",
        x: 295,
        y: 228,
        w: 162,
        h: 56,
        tone: "gold",
        description:
          "Enterprise Active Directory integration enforcing role-based permissions across branch personnel and underwriters.",
      },
      {
        id: "ef-portal",
        title: "Underwriter Portal",
        sub: "Branch Ingress",
        x: 485,
        y: 228,
        w: 165,
        h: 56,
        tone: "default",
        description:
          "Secure internal web portal for underwriters to review packets, add annotations, and issue policy approvals.",
      },
    ],
    edges: [
      { d: "M 267 51 L 295 51", tone: "muted" },
      { d: "M 457 51 L 485 51", tone: "gold" },
      { d: "M 567 78 L 567 101 L 376 101 L 376 124", tone: "emerald" },
      { d: "M 376 78 L 376 101 L 186 101 L 186 124", tone: "gold" },
      { d: "M 567 78 L 567 124", tone: "emerald" },
      { d: "M 186 182 L 186 228", tone: "muted" },
      { d: "M 376 182 L 376 228", tone: "gold" },
      { d: "M 567 182 L 567 228", tone: "emerald" },
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
      aria-labelledby="selected-work-heading"
    >
      <div className={styles.container}>
        {/* Section Header: Approved Eyebrow, Headline & Context Narrative */}
        <header className={styles.headerBlock}>
          <div className={styles.eyebrowPill}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>SELECTED WORK</span>
          </div>

          <h2 id="selected-work-heading" className={styles.heading}>
            Engineering Decisions{" "}
            <span className={styles.headingAccent}>Behind Real Products.</span>
          </h2>

          <p className={styles.subtitle}>
            Explore how I&apos;ve approached architecture, reliability, and
            complex engineering challenges across AI platforms, distributed
            systems, and enterprise applications.
          </p>
        </header>

        {/* Desktop Two-Column Split Stage (~30% Project Selector, ~70% Featured Showcase) */}
        <div className={styles.showcaseGrid}>
          {/* LEFT COLUMN: 4-Project Vertical Selector (Semantic 'a' links for 100% crawlability) */}
          <nav
            className={styles.selectorCol}
            role="tablist"
            aria-label="Selected engineering case studies"
          >
            {projects.map((proj, idx) => {
              const isSelected = idx === activeTab;
              return (
                <a
                  key={proj.number}
                  id={`tab-${proj.codeSlug}`}
                  href={withBasePath(proj.caseStudyUrl)}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${proj.codeSlug}`}
                  className={`${styles.selectorCard} ${
                    isSelected ? styles.selectorCardActive : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveTab((idx + 1) % projects.length);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveTab(
                        (idx - 1 + projects.length) % projects.length
                      );
                    }
                  }}
                >
                  <div className={styles.selectorCardHeader}>
                    <span className={styles.selectorNumber}>
                      [{proj.number}]
                    </span>
                    <span
                      className={`${styles.selectorDot} ${
                        isSelected ? styles.selectorDotActive : ""
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className={styles.selectorBody}>
                    <strong className={styles.selectorName}>{proj.name}</strong>
                    <span className={styles.selectorCategory}>
                      {proj.categoryTag}
                    </span>
                  </div>

                  <div className={styles.selectorFooter}>
                    <span className={styles.selectorHint}>
                      {isSelected ? "Active View" : "Select Case Study"}
                    </span>
                    <span className={styles.selectorArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>

          {/* RIGHT COLUMN: Featured Project Showcase Stage */}
          <div className={styles.featuredCol}>
            {projects.map((proj, idx) => {
              const isSelected = idx === activeTab;
              // All 4 panels are rendered in initial SSR HTML for search engine indexing.
              // Inactive panels are hidden via CSS class.
              return (
                <div
                  key={proj.codeSlug}
                  id={`panel-${proj.codeSlug}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${proj.codeSlug}`}
                  className={`${styles.projectPanel} ${
                    isSelected
                      ? styles.projectPanelActive
                      : styles.projectPanelHidden
                  }`}
                >
                  {/* Panel Top Meta Bar */}
                  <div className={styles.panelTopBar}>
                    <div className={styles.tagGroup}>
                      <span className={styles.categoryPill}>
                        {proj.category}
                      </span>
                      <span className={styles.statusBadge}>
                        <span className={styles.statusDot} aria-hidden="true" />
                        {proj.statusLabel}
                      </span>
                    </div>
                    <span className={styles.roleYear}>
                      {proj.role} &middot; {proj.year}
                    </span>
                  </div>

                  {/* Title & Context */}
                  <div className={styles.titleGroup}>
                    <h3 className={styles.projectTitle}>{proj.name}</h3>
                    <p className={styles.projectSubtitle}>{proj.subtitle}</p>
                  </div>

                  {/* Problem & Contribution Matrix */}
                  <div className={styles.briefGrid}>
                    <div className={styles.briefCell}>
                      <span className={styles.briefLabel}>
                        THE OPERATING PROBLEM
                      </span>
                      <p className={styles.briefText}>{proj.problem}</p>
                    </div>
                    <div className={styles.briefCell}>
                      <span className={styles.briefLabelGold}>
                        MY ENGINEERING RESPONSIBILITY
                      </span>
                      <p className={styles.briefText}>{proj.contribution}</p>
                    </div>
                  </div>

                  {/* Architectural Decisions & Tradeoffs */}
                  <div className={styles.decisionsSection}>
                    <span className={styles.decisionsSectionHeading}>
                      KEY ARCHITECTURAL DECISIONS &amp; TRADEOFFS
                    </span>
                    <div className={styles.decisionsGrid}>
                      {proj.decisions.map((dec, dIdx) => (
                        <div key={dIdx} className={styles.decisionCard}>
                          <div className={styles.decisionBadge}>
                            DECISION 0{dIdx + 1}
                          </div>
                          <h4 className={styles.decisionTitle}>{dec.title}</h4>
                          <p className={styles.decisionBody}>{dec.decision}</p>
                          <div className={styles.tradeoffBox}>
                            <strong className={styles.tradeoffLabel}>
                              Engineering Tradeoff:
                            </strong>{" "}
                            <span className={styles.tradeoffText}>
                              {dec.tradeoff}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive System Architecture Schematic */}
                  <div className={styles.schematicFrame}>
                    <div className={styles.schematicHeader}>
                      <div className={styles.schematicTitleWrap}>
                        <span className={styles.schematicIcon} aria-hidden="true">
                          &#9638;
                        </span>
                        <span className={styles.schematicTitle}>
                          SYSTEM ARCHITECTURE SCHEMATIC &bull; {proj.codeSlug}
                        </span>
                      </div>
                      <span className={styles.schematicBadge}>
                        INTERACTIVE SCHEMATIC
                      </span>
                    </div>

                    <div className={styles.schematicCanvas}>
                      <svg
                        viewBox="0 0 672 308"
                        className={styles.schematicSvg}
                        role="img"
                        aria-label={`${proj.name} system architecture diagram`}
                      >
                        <defs>
                          <pattern
                            id={`bp-grid-${proj.codeSlug}`}
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
                            id={`arr-gold-${proj.codeSlug}`}
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
                            id={`arr-emerald-${proj.codeSlug}`}
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
                            id={`arr-muted-${proj.codeSlug}`}
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

                        <rect
                          width="672"
                          height="308"
                          fill={`url(#bp-grid-${proj.codeSlug})`}
                        />

                        {/* Tier Labels on Left Margin */}
                        <text
                          x="18"
                          y="55"
                          fill="#8b949e"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="0.08em"
                        >
                          {proj.tierLabels[0]}
                        </text>
                        <text
                          x="18"
                          y="156"
                          fill="#8b949e"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="0.08em"
                        >
                          {proj.tierLabels[1]}
                        </text>
                        <text
                          x="18"
                          y="252"
                          fill="#8b949e"
                          fontSize="10"
                          fontWeight="700"
                          letterSpacing="0.08em"
                        >
                          {proj.tierLabels[2].split(" ")[0]}
                        </text>
                        {proj.tierLabels[2].includes(" ") && (
                          <text
                            x="18"
                            y="266"
                            fill="#8b949e"
                            fontSize="10"
                            fontWeight="700"
                            letterSpacing="0.08em"
                          >
                            {proj.tierLabels[2].split(" ").slice(1).join(" ")}
                          </text>
                        )}

                        {/* Connector Edges */}
                        {proj.edges.map((edge, eIdx) => {
                          const stroke =
                            edge.tone === "gold"
                              ? "rgba(212, 170, 103, 0.75)"
                              : edge.tone === "emerald"
                              ? "rgba(46, 204, 113, 0.75)"
                              : "rgba(140, 150, 165, 0.45)";
                          const marker =
                            edge.tone === "gold"
                              ? `url(#arr-gold-${proj.codeSlug})`
                              : edge.tone === "emerald"
                              ? `url(#arr-emerald-${proj.codeSlug})`
                              : `url(#arr-muted-${proj.codeSlug})`;
                          return (
                            <path
                              key={eIdx}
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
                        {proj.nodes.map((node) => {
                          const isNodeSelected =
                            node.id === (isSelected ? activeNode.id : proj.defaultActiveNodeId);
                          const fill =
                            node.tone === "gold"
                              ? "rgba(38, 30, 18, 0.95)"
                              : node.tone === "emerald"
                              ? "rgba(14, 35, 25, 0.95)"
                              : "rgba(18, 22, 29, 0.95)";
                          const stroke = isNodeSelected
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
                                strokeWidth={isNodeSelected ? "2" : "1.25"}
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

                    {/* Active Node Inspector Bar */}
                    <div className={styles.inspectorBar}>
                      <span className={styles.inspectorDot} aria-hidden="true" />
                      <p className={styles.inspectorText}>
                        <strong className={styles.inspectorPrefix}>
                          ACTIVE NODE:{" "}
                          {isSelected ? activeNode.title : proj.nodes[0].title}
                        </strong>{" "}
                        &mdash;{" "}
                        {isSelected
                          ? activeNode.description
                          : proj.nodes[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Panel Footer: Tech Stack Pills & Primary Case Study CTA */}
                  <div className={styles.panelFooter}>
                    <div className={styles.techTagsList} aria-label="Key technologies">
                      {proj.stack.map((tag) => (
                        <span key={tag} className={styles.techTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={withBasePath(proj.caseStudyUrl)}
                      className={styles.exploreCta}
                      data-source="selected-work"
                      aria-label={`Explore full case study for ${proj.name}`}
                    >
                      <span>Explore Case Study</span>
                      <span className={styles.ctaArrow} aria-hidden="true">
                        &rarr;
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Footer: Subtle Conversion Pathway */}
        <div className={styles.sectionFooterBar}>
          <div className={styles.sectionFooterTextWrap}>
            <span className={styles.footerPrompt}>
              Have a similar engineering challenge?
            </span>
            <span className={styles.footerSubtext}>
              Let&apos;s evaluate the architecture, failure modes, and scaling
              tradeoffs.
            </span>
          </div>

          <a
            href={withBasePath("/audit/")}
            className={styles.sectionFooterBtn}
            aria-label="Discuss architecture or request architecture pre-mortem"
          >
            <span>Discuss Architecture</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
