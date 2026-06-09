import styles from "./ProjectVisual.module.css";

export type ProjectVisualType = "wellows" | "classflow" | "savyour" | "efu";

type ProjectVisualProps = {
  type: ProjectVisualType;
  variant?: "card" | "hero";
};

const visualData = {
  wellows: {
    brand: "Wellows",
    title: "Orchestration Pipeline",
    metric: "3 agents active",
    tabs: ["LangGraph Flow", "Vector Search", "Provider Failover"]
  },
  classflow: {
    brand: "ClassFlow",
    title: "Scheduler & Ledger Engine",
    metric: "0 manual ops",
    tabs: ["Mutex Engine", "Candidate Scoring", "ACID Commits"]
  },
  savyour: {
    brand: "Savyour",
    title: "Partner Webhook & Wallet Ledger",
    metric: "650+ partners",
    tabs: ["HMAC Ingest", "Redis Eviction", "Ledger Commit"]
  },
  efu: {
    brand: "EFU Life",
    title: "Enterprise Document Routing",
    metric: "100% paperless",
    tabs: ["Datacap Ingestion", "FileNet Indexing", "Case Dispatch"]
  }
};

function WellowsDiagram() {
  return (
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
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-wellows)" />

      {/* Connection paths */}
      <path d="M 130 70 L 190 70" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <path d="M 310 70 L 370 70" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <path d="M 430 105 L 430 145" stroke="#00d66f" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <path d="M 290 190 L 250 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <path d="M 450 190 L 490 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-wellows)" />
      <path d="M 370 235 L 370 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />
      <path d="M 220 200 L 220 255" stroke="#00d66f" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-wellows-green)" />
      <path d="M 520 200 L 520 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-wellows)" />

      {/* Nodes Row 1 */}
      <rect x="20" y="45" width="110" height="50" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion API</text>
      <text x="75" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">FastAPI Node</text>

      <rect x="190" y="45" width="120" height="50" rx="6" fill="#1b211f" stroke="rgba(255, 255, 255, 0.08)" />
      <circle cx="205" cy="70" r="3.5" fill="#c59b53" />
      <text x="255" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion SQS</text>
      <text x="255" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">AWS Queue Store</text>

      {/* LangGraph Orchestrator */}
      <rect x="150" y="125" width="460" height="110" rx="10" fill="rgba(197, 155, 83, 0.02)" stroke="rgba(197, 155, 83, 0.2)" strokeDasharray="6 6" />
      <text x="165" y="145" fill="#c59b53" fontSize="8" fontWeight="950" fontFamily="var(--font-space-mono), monospace" letterSpacing="0.1em" textAnchor="start">LANGGRAPH STATE ORCHESTRATION</text>

      <rect x="170" y="165" width="100" height="50" rx="6" fill="#151918" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="220" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">KIVA Agent</text>
      <text x="220" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Keyword Intel</text>

      <rect x="330" y="165" width="100" height="50" rx="6" fill="#151918" stroke="rgba(197, 155, 83, 0.3)" />
      <text x="380" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">OPTA Agent</text>
      <text x="380" y="200" fill="#d8ad64" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Audit Parser</text>

      <rect x="490" y="165" width="100" height="50" rx="6" fill="#151918" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Citation Agent</text>
      <text x="540" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">LLM Monitor</text>

      {/* Row 3 Nodes */}
      <rect x="160" y="255" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="220" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">LLM Provider</text>
      <text x="220" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">AWS Bedrock / API</text>

      <rect x="310" y="255" width="120" height="40" rx="6" fill="#121615" stroke="rgba(0, 214, 111, 0.2)" />
      <text x="370" y="274" fill="#00d66f" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Vector Database</text>
      <text x="370" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">PGVector Index</text>

      <rect x="490" y="255" width="110" height="40" rx="6" fill="#241b1b" stroke="rgba(255, 95, 86, 0.2)" />
      <text x="545" y="274" fill="#ff5f56" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">DLQ Queue</text>
      <text x="545" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">AWS SQS Errors</text>
    </svg>
  );
}

function ClassFlowDiagram() {
  return (
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
      <path d="M 130 70 L 190 70" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <path d="M 310 70 L 370 70" stroke="#8cc7ad" strokeWidth="1.5" markerEnd="url(#arrow-classflow)" />
      <path d="M 430 105 L 430 145" stroke="#8cc7ad" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow)" />
      <path d="M 290 190 L 250 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <path d="M 450 190 L 490 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-classflow)" />
      <path d="M 370 235 L 370 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />
      <path d="M 220 200 L 220 255" stroke="#8cc7ad" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-classflow)" />
      <path d="M 520 200 L 520 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-classflow-gold)" />

      {/* Nodes Row 1 */}
      <rect x="20" y="45" width="110" height="50" rx="6" fill="#18211e" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Lifecycle Event</text>
      <text x="75" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">WS / API Trigger</text>

      <rect x="190" y="45" width="120" height="50" rx="6" fill="#18211e" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="250" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">FastAPI Gateway</text>
      <text x="250" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">State Orchestrator</text>

      <rect x="370" y="45" width="120" height="50" rx="6" fill="#18211e" stroke="rgba(140, 199, 173, 0.3)" />
      <circle cx="385" cy="70" r="3.5" fill="#8cc7ad" />
      <text x="435" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Redis Redlock</text>
      <text x="435" y="82" fill="#8cc7ad" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Distributed Lock</text>

      {/* Pipeline Box */}
      <rect x="150" y="125" width="460" height="110" rx="10" fill="rgba(140, 199, 173, 0.02)" stroke="rgba(140, 199, 173, 0.2)" strokeDasharray="6 6" />
      <text x="165" y="145" fill="#8cc7ad" fontSize="8" fontWeight="950" fontFamily="var(--font-space-mono), monospace" letterSpacing="0.1em" textAnchor="start">LOCK-SAFE AUTONOMOUS MATCHMAKER</text>

      <rect x="170" y="165" width="100" height="50" rx="6" fill="#141a18" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="220" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Timezone Filter</text>
      <text x="220" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Candidate Query</text>

      <rect x="290" y="165" width="160" height="50" rx="6" fill="#141a18" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="370" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Dynamic Scoring</text>
      <text x="370" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Active Load / Rating</text>

      <rect x="490" y="165" width="100" height="50" rx="6" fill="#141a18" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Payout Broker</text>
      <text x="540" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Stripe Custom</text>

      {/* Row 3 Nodes */}
      <rect x="160" y="255" width="120" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="220" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">WebSocket State</text>
      <text x="220" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Client Broadcast</text>

      <rect x="310" y="255" width="120" height="40" rx="6" fill="#121615" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="370" y="274" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PostgreSQL DB</text>
      <text x="370" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Serializable ACID</text>

      <rect x="490" y="255" width="110" height="40" rx="6" fill="#121615" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="545" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Stripe custom</text>
      <text x="545" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Partner payout</text>
    </svg>
  );
}

function SavyourDiagram() {
  return (
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
      <path d="M 130 70 L 190 70" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <path d="M 310 70 L 370 70" stroke="#9db5d8" strokeWidth="1.5" markerEnd="url(#arrow-savyour)" />
      <path d="M 430 105 L 430 145" stroke="#9db5d8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour)" />
      <path d="M 290 190 L 250 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <path d="M 450 190 L 490 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-savyour)" />
      <path d="M 370 235 L 370 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />
      <path d="M 220 200 L 220 255" stroke="#9db5d8" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-savyour)" />
      <path d="M 520 200 L 520 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-savyour-gold)" />

      {/* Nodes Row 1 */}
      <rect x="20" y="45" width="110" height="50" rx="6" fill="#171f26" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Partner Webhook</text>
      <text x="75" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Affiliate Event</text>

      <rect x="190" y="45" width="120" height="50" rx="6" fill="#171f26" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="250" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Ingestion Gateway</text>
      <text x="250" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">HMAC Verified</text>

      <rect x="370" y="45" width="120" height="50" rx="6" fill="#171f26" stroke="rgba(157, 181, 216, 0.3)" />
      <circle cx="385" cy="70" r="3.5" fill="#9db5d8" />
      <text x="435" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Decoupled Queue</text>
      <text x="435" y="82" fill="#9db5d8" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Redis Cache Buffer</text>

      {/* Calculation & Settlement Box */}
      <rect x="150" y="125" width="460" height="110" rx="10" fill="rgba(157, 181, 216, 0.02)" stroke="rgba(157, 181, 216, 0.2)" strokeDasharray="6 6" />
      <text x="165" y="145" fill="#9db5d8" fontSize="8" fontWeight="950" fontFamily="var(--font-space-mono), monospace" letterSpacing="0.1em" textAnchor="start">CASHBACK LEDGER & CALCULATION ENGINE</text>

      <rect x="170" y="165" width="100" height="50" rx="6" fill="#12161a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="220" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Redis Eviction</text>
      <text x="220" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Wallet Namespace</text>

      <rect x="290" y="165" width="160" height="50" rx="6" fill="#12161a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="370" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Cashback Calc</text>
      <text x="370" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Brand Rate Matrix</text>

      <rect x="490" y="165" width="100" height="50" rx="6" fill="#12161a" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Idempotence</text>
      <text x="540" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">UUID Deduplication</text>

      {/* Row 3 Nodes */}
      <rect x="160" y="255" width="120" height="40" rx="6" fill="#0f1214" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="220" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">User Wallet API</text>
      <text x="220" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Instant State Sync</text>

      <rect x="310" y="255" width="120" height="40" rx="6" fill="#0f1214" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="370" y="274" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">PostgreSQL DB</text>
      <text x="370" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Repeatable Read</text>

      <rect x="490" y="255" width="110" height="40" rx="6" fill="#0f1214" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="545" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Settlement Service</text>
      <text x="545" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Batch Payouts</text>
    </svg>
  );
}

function EFULifeDiagram() {
  return (
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
      <path d="M 130 70 L 190 70" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <path d="M 310 70 L 370 70" stroke="#c9bca8" strokeWidth="1.5" markerEnd="url(#arrow-efu)" />
      <path d="M 430 105 L 430 145" stroke="#c9bca8" strokeWidth="1.5" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu)" />
      <path d="M 290 190 L 250 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <path d="M 450 190 L 490 190" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.2" markerEnd="url(#arrow-efu)" />
      <path d="M 370 235 L 370 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />
      <path d="M 220 200 L 220 255" stroke="#c9bca8" strokeWidth="1.2" strokeDasharray="4 4" className={styles.flowLine} markerEnd="url(#arrow-efu)" />
      <path d="M 520 200 L 520 255" stroke="#c59b53" strokeWidth="1.5" markerEnd="url(#arrow-efu-gold)" />

      {/* Nodes Row 1 */}
      <rect x="20" y="45" width="110" height="50" rx="6" fill="#242220" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="75" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Physical Doc Scan</text>
      <text x="75" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">High-Vol Batch Ingest</text>

      <rect x="190" y="45" width="120" height="50" rx="6" fill="#242220" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="250" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">IBM Datacap Queue</text>
      <text x="250" y="82" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">OCR / Indexing</text>

      <rect x="370" y="45" width="120" height="50" rx="6" fill="#242220" stroke="rgba(201, 188, 168, 0.3)" />
      <circle cx="385" cy="70" r="3.5" fill="#c9bca8" />
      <text x="435" y="68" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">FileNet Content Engine</text>
      <text x="435" y="82" fill="#c9bca8" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Metadata Schema</text>

      {/* Workflow Engine Container */}
      <rect x="150" y="125" width="460" height="110" rx="10" fill="rgba(201, 188, 168, 0.02)" stroke="rgba(201, 188, 168, 0.2)" strokeDasharray="6 6" />
      <text x="165" y="145" fill="#c9bca8" fontSize="8" fontWeight="950" fontFamily="var(--font-space-mono), monospace" letterSpacing="0.1em" textAnchor="start">IBM PROCESS & CASE WORKFLOW ROUTING</text>

      <rect x="170" y="165" width="100" height="50" rx="6" fill="#1a1816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="220" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Active Directory</text>
      <text x="220" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">LDAP Sync ACL</text>

      <rect x="290" y="165" width="160" height="50" rx="6" fill="#1a1816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="370" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Routing Rules</text>
      <text x="370" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Priority Dispatch Engine</text>

      <rect x="490" y="165" width="100" height="50" rx="6" fill="#1a1816" stroke="rgba(255, 255, 255, 0.08)" />
      <text x="540" y="188" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Compliance check</text>
      <text x="540" y="200" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Electronic Audit</text>

      {/* Row 3 Nodes */}
      <rect x="160" y="255" width="120" height="40" rx="6" fill="#121110" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="220" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">Case client</text>
      <text x="220" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Workplace XT portal</text>

      <rect x="310" y="255" width="120" height="40" rx="6" fill="#121110" stroke="rgba(197, 155, 83, 0.2)" />
      <text x="370" y="274" fill="var(--gold-bright)" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">DB Clustered Stack</text>
      <text x="370" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Active-Active Sync</text>

      <rect x="490" y="255" width="110" height="40" rx="6" fill="#121110" stroke="rgba(255, 255, 255, 0.06)" />
      <text x="545" y="274" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="var(--font-inter), sans-serif" textAnchor="middle">P8 Storage</text>
      <text x="545" y="286" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-space-mono), monospace" textAnchor="middle">Distributed replica</text>
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
