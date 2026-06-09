import styles from "./ProjectVisual.module.css";

export type ProjectVisualType = "wellows" | "classflow" | "savyour" | "efu";

type ProjectVisualProps = {
  type: ProjectVisualType;
  variant?: "card" | "hero";
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

function WellowsDiagram() {
  return (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-wellows" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1"/>
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
      {/* Ingress -> Guardrail */}
      <path d="M 75 70 L 75 110" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      {/* Guardrail -> Router */}
      <path d="M 130 130 L 170 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      
      {/* Router -> Agent Workers (LangGraph branches) */}
      <path d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <path d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <path d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />

      {/* Agents -> DB / Models */}
      <path d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <path d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <path d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />

      {/* LLM Failover */}
      <path d="M 540 150 L 540 190" stroke="#ff5f56" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow-wellows-red)" />

      {/* Feedback / Evaluation Loop */}
      <path d="M 230 150 L 230 210" stroke="#00d66f" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <path d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-wellows)" />
      
      {/* Evaluator -> Cache Output */}
      <path d="M 290 230 L 640 230 L 640 150" stroke="#00d66f" strokeWidth="1.5" markerEnd="url(#arrow-wellows-green)" />
      
      {/* Async Telemetry */}
      <path d="M 200 110 L 75 210" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow-wellows)" />

      {/* Nodes */}
      {/* Ingress Gateway */}
      <rect x="20" y="30" width="110" height="40" rx="6" fill="#141817" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion Gateway</text>
      <text x="75" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">FastAPI Node</text>

      {/* Guardrails (LlamaGuard) */}
      <rect x="20" y="110" width="110" height="40" rx="6" fill="#241d1a" stroke="rgba(197, 155, 83, 0.3)" />
      <circle cx="32" cy="130" r="3" fill="#c59b53" />
      <text x="77" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LlamaGuard Node</text>
      <text x="77" y="140" fill="#c59b53" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Content Safety</text>

      {/* LangGraph Router */}
      <rect x="170" y="110" width="120" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="230" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LangGraph Router</text>
      <text x="230" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">State Orchestrator</text>

      {/* Worker 1: KIVA Agent */}
      <rect x="330" y="30" width="110" height="40" rx="6" fill="#141817" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">KIVA Agent</text>
      <text x="385" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Keyword Classifier</text>

      {/* Worker 2: OPTA Agent */}
      <rect x="330" y="110" width="110" height="40" rx="6" fill="#141817" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">OPTA Agent</text>
      <text x="385" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Technical Extractor</text>

      {/* Worker 3: Citation Intelligence */}
      <rect x="330" y="190" width="110" height="40" rx="6" fill="#141817" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Citation Intel</text>
      <text x="385" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">LLM Brand Monitor</text>

      {/* Data Layers & Provider Node */}
      <rect x="480" y="30" width="120" height="40" rx="6" fill="#121615" stroke="rgba(0, 214, 111, 0.2)" />
      <text x="540" y="48" fill="#00d66f" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PGVector Index</text>
      <text x="540" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Vector Ingestion</text>

      <rect x="480" y="110" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">OpenAI GPT-4o</text>
      <text x="540" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Primary LLM Node</text>

      <rect x="480" y="190" width="120" height="40" rx="6" fill="#241b1b" stroke="rgba(255, 95, 86, 0.2)" />
      <text x="540" y="208" fill="#ff5f56" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">AWS Bedrock Sonnet</text>
      <text x="540" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">RateLimit Fallback</text>

      {/* LLM Evaluation Loop Node */}
      <rect x="170" y="210" width="120" height="40" rx="6" fill="#121615" stroke="rgba(0, 214, 111, 0.2)" />
      <text x="230" y="228" fill="#00d66f" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LLM Judge / Evaluator</text>
      <text x="230" y="240" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Confidence &gt; 0.85</text>

      {/* Telemetry Endpoint */}
      <rect x="20" y="210" width="110" height="40" rx="6" fill="#141817" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="228" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LangSmith / Arize</text>
      <text x="75" y="240" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Async Tracer</text>

      {/* Output Cache */}
      <rect x="630" y="110" width="110" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="685" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Redis Ingestion Cache</text>
      <text x="685" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Audited Responses</text>
    </svg>
  );
}

function ClassFlowDiagram() {
  return (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-classflow" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1"/>
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
      <path d="M 75 70 L 75 110" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <path d="M 130 130 L 170 130" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      
      {/* Router -> Matchmaker paths */}
      <path d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <path d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <path d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />

      {/* Matchers -> DB / Ledger */}
      <path d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow-gold)" />
      <path d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />
      <path d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />

      {/* Ledger -> Payout */}
      <path d="M 600 130 L 630 130" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />

      {/* Cache Eviction feedback */}
      <path d="M 230 150 L 230 210" stroke="#8cc7ad" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow)" />
      <path d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-classflow)" />

      {/* Nodes */}
      {/* Event Trigger */}
      <rect x="20" y="30" width="110" height="40" rx="6" fill="#141816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">WS Class Event</text>
      <text x="75" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Realtime Gateway</text>

      {/* Redis Redlock */}
      <rect x="20" y="110" width="110" height="40" rx="6" fill="#18211e" stroke="rgba(140, 199, 173, 0.3)" />
      <circle cx="32" cy="130" r="3" fill="#8cc7ad" />
      <text x="77" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Redis Redlock</text>
      <text x="77" y="140" fill="#8cc7ad" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Distributed Mutex</text>

      {/* State Machine Router */}
      <rect x="170" y="110" width="120" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="230" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Scheduler State</text>
      <text x="230" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Match Execution Graph</text>

      {/* KIVA Timezone Matcher */}
      <rect x="330" y="30" width="110" height="40" rx="6" fill="#141816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Timezone Matcher</text>
      <text x="385" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">UTC Offset Scoping</text>

      {/* Active Load Balance */}
      <rect x="330" y="110" width="110" height="40" rx="6" fill="#141816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Load Scorer</text>
      <text x="385" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Historical Ratings</text>

      {/* Ingestion Queue */}
      <rect x="330" y="190" width="110" height="40" rx="6" fill="#141816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion Celery</text>
      <text x="385" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Redis Task Queue</text>

      {/* Postgres Serializable */}
      <rect x="480" y="30" width="120" height="40" rx="6" fill="#121615" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="540" y="48" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PostgreSQL Database</text>
      <text x="540" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Serializable ACID</text>

      {/* Idempotent Ledger */}
      <rect x="480" y="110" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Double-Entry Ledger</text>
      <text x="540" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Deduplication Key</text>

      {/* Stripe Disbursement */}
      <rect x="480" y="190" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Stripe Custom</text>
      <text x="540" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Disbursement API</text>

      {/* Cache Eviction */}
      <rect x="170" y="210" width="120" height="40" rx="6" fill="#121615" stroke="rgba(140, 199, 173, 0.2)" />
      <text x="230" y="228" fill="#8cc7ad" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Cache Eviction</text>
      <text x="230" y="240" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Redis Mutex Release</text>

      {/* Output Client Broadcast */}
      <rect x="630" y="110" width="110" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="685" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">WS State Dispatch</text>
      <text x="685" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Client Broadcasts</text>
    </svg>
  );
}

function SavyourDiagram() {
  return (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-savyour" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1"/>
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
      <path d="M 75 70 L 75 110" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <path d="M 130 130 L 170 130" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      
      {/* Router paths */}
      <path d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <path d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <path d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />

      {/* Workers -> DB / Cache */}
      <path d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour-gold)" />
      <path d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />
      <path d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />

      {/* DB -> Output */}
      <path d="M 600 130 L 630 130" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />

      {/* Cache Eviction feedbacks */}
      <path d="M 230 150 L 230 210" stroke="#9db5d8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour)" />
      <path d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-savyour)" />

      {/* Nodes */}
      {/* Webhook Ingress */}
      <rect x="20" y="30" width="110" height="40" rx="6" fill="#14181a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Partner Webhook</text>
      <text x="75" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">HMAC-SHA256 Signed</text>

      {/* HMAC & Rate Limiter */}
      <rect x="20" y="110" width="110" height="40" rx="6" fill="#171f26" stroke="rgba(157, 181, 216, 0.3)" />
      <circle cx="32" cy="130" r="3" fill="#9db5d8" />
      <text x="77" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Nginx Ingress</text>
      <text x="77" y="140" fill="#9db5d8" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">RateLimit (2500/s)</text>

      {/* Ingestion Router */}
      <rect x="170" y="110" width="120" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="230" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion Router</text>
      <text x="230" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Validation Gate</text>

      {/* Bloom Filter */}
      <rect x="330" y="30" width="110" height="40" rx="6" fill="#14181a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Bloom Filter</text>
      <text x="385" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Deduplication Key</text>

      {/* Rewards Calculator */}
      <rect x="330" y="110" width="110" height="40" rx="6" fill="#14181a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Calculation Engine</text>
      <text x="385" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Base & Campaign Rate</text>

      {/* AWS SQS Queue Buffer */}
      <rect x="330" y="190" width="110" height="40" rx="6" fill="#14181a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">SQS Ingest Buffer</text>
      <text x="385" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Decoupled Queue</text>

      {/* Redis Balance Cache */}
      <rect x="480" y="30" width="120" height="40" rx="6" fill="#121615" stroke="rgba(0, 214, 111, 0.2)" />
      <text x="540" y="48" fill="#00d66f" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Redis Cache Eviction</text>
      <text x="540" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">User Wallet Namespace</text>

      {/* Postgres Repeatable Read */}
      <rect x="480" y="110" width="120" height="40" rx="6" fill="#121615" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="540" y="128" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PostgreSQL Database</text>
      <text x="540" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Repeatable Read ACID</text>

      {/* Idempotent Ledger Transaction */}
      <rect x="480" y="190" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Double-Entry Ledger</text>
      <text x="540" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Balance Adjustment</text>

      {/* Cache Evict Lock */}
      <rect x="170" y="210" width="120" height="40" rx="6" fill="#121615" stroke="rgba(157, 181, 216, 0.2)" />
      <text x="230" y="228" fill="#9db5d8" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Deduplication Sync</text>
      <text x="230" y="240" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Cache Invalidation</text>

      {/* Output Wallet Update */}
      <rect x="630" y="110" width="110" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="685" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Wallet Balance Sync</text>
      <text x="685" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Instant Settlement</text>
    </svg>
  );
}

function EFULifeDiagram() {
  return (
    <svg className={styles.svgDiagram} viewBox="0 0 760 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-efu" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1"/>
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
      <path d="M 75 70 L 75 110" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <path d="M 130 130 L 170 130" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      
      {/* Route paths */}
      <path d="M 290 120 L 330 55" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <path d="M 290 130 L 330 130" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <path d="M 290 140 L 330 205" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />

      {/* Workers -> DB / FileNet */}
      <path d="M 440 50 L 480 50" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu-gold)" />
      <path d="M 440 130 L 480 130" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />
      <path d="M 440 210 L 480 210" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />

      {/* DB -> Output */}
      <path d="M 600 130 L 630 130" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />

      {/* LDAP verification feedback */}
      <path d="M 230 150 L 230 210" stroke="#c9bca8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu)" />
      <path d="M 170 230 C 120 230, 120 130, 170 130" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="4 4" markerEnd="url(#arrow-efu)" />

      {/* Nodes */}
      {/* Physical scan Ingress */}
      <rect x="20" y="30" width="110" height="40" rx="6" fill="#1f1c19" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Physical Scanner</text>
      <text x="75" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">High-Vol PDF Ingestion</text>

      {/* IBM Datacap */}
      <rect x="20" y="110" width="110" height="40" rx="6" fill="#242220" stroke="rgba(201, 188, 168, 0.3)" />
      <circle cx="32" cy="130" r="3" fill="#c9bca8" />
      <text x="77" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">IBM Datacap Queue</text>
      <text x="77" y="140" fill="#c9bca8" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">OCR / Queue Store</text>

      {/* IBM Case Router */}
      <rect x="170" y="110" width="120" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="230" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Case Router PE</text>
      <text x="230" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">IBM Process Engine</text>

      {/* LDAP Access checks */}
      <rect x="330" y="30" width="110" height="40" rx="6" fill="#1f1c19" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="48" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LDAP AD Sync</text>
      <text x="385" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Access Control List</text>

      {/* Underwriting Queues */}
      <rect x="330" y="110" width="110" height="40" rx="6" fill="#1f1c19" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Dispatch Rules</text>
      <text x="385" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Underwriter Routing</text>

      {/* Capture Indexes */}
      <rect x="330" y="190" width="110" height="40" rx="6" fill="#1f1c19" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="385" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Capture Indexes</text>
      <text x="385" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Document Metadata</text>

      {/* FileNet P8 Content Store */}
      <rect x="480" y="30" width="120" height="40" rx="6" fill="#121615" stroke="rgba(0, 214, 111, 0.2)" />
      <text x="540" y="48" fill="#00d66f" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">FileNet P8 Store</text>
      <text x="540" y="60" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Clustered HA Repo</text>

      {/* Database Clustered replicas */}
      <rect x="480" y="110" width="120" height="40" rx="6" fill="#121615" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="540" y="128" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PostgreSQL Replica</text>
      <text x="540" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Active-Active Sync</text>

      {/* Compliance Audited log */}
      <rect x="480" y="190" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="208" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Audit Trail Logger</text>
      <text x="540" y="220" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Electronic Verification</text>

      {/* LDAP ACL verification */}
      <rect x="170" y="210" width="120" height="40" rx="6" fill="#121615" stroke="rgba(201, 188, 168, 0.2)" />
      <text x="230" y="228" fill="#c9bca8" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LDAP ACL Verify</text>
      <text x="230" y="240" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Security Groups</text>

      {/* Workplace XT Portal */}
      <rect x="630" y="110" width="110" height="40" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="685" y="128" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Workplace XT UI</text>
      <text x="685" y="140" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Underwriting Case Dispatch</text>
    </svg>
  );
}

export default function ProjectVisual({ type, variant = "card" }: ProjectVisualProps) {
  const data = visualData[type];

  const renderDiagram = () => {
    switch (type) {
      case "wellows":
        return <WellowsDiagram />;
      case "classflow":
        return <ClassFlowDiagram />;
      case "savyour":
        return <SavyourDiagram />;
      case "efu":
        return <EFULifeDiagram />;
      default:
        return null;
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
      </div>
    </figure>
  );
}
