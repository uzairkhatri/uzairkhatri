import styles from "./MobileArchitecture.module.css";
import type { ProjectVisualType } from "./ProjectVisual";

type Node = { title: string; sub: string };
type Stage = { label: string; nodes: Node[] };

/**
 * Phone rendering of the architecture diagrams.
 *
 * The desktop version is a 760x300 SVG. On a 390px screen that scales every
 * label to roughly 45% and the diagram becomes unreadable, and letting it pan
 * instead only clipped the right-hand nodes. So phones get a layout built for
 * them: the same nodes, grouped into the stages the request actually passes
 * through, flowing top to bottom. Nothing is dropped and nothing is scaled.
 */
const DIAGRAMS: Record<ProjectVisualType, Stage[]> = {
  wellows: [
    { label: "Ingress", nodes: [
      { title: "Ingestion Gateway", sub: "FastAPI Node" },
      { title: "LlamaGuard Node", sub: "Content Safety" },
    ]},
    { label: "Orchestration", nodes: [
      { title: "LangGraph Router", sub: "State Orchestrator" },
    ]},
    { label: "Agents", nodes: [
      { title: "KIVA Agent", sub: "Writing Assistant" },
      { title: "OPTA Agent", sub: "Technical Extractor" },
      { title: "Citation Intel", sub: "LLM Brand Monitor" },
    ]},
    { label: "Retrieval & Models", nodes: [
      { title: "Qdrant Index", sub: "Vector Ingestion" },
      { title: "OpenAI GPT-4o", sub: "Primary LLM Node" },
      { title: "AWS Bedrock Sonnet", sub: "RateLimit Fallback" },
    ]},
    { label: "Verification & Ops", nodes: [
      { title: "LLM Judge / Evaluator", sub: "Confidence > 0.85" },
      { title: "LangSmith / Arize", sub: "Async Tracer" },
      { title: "Redis Ingestion Cache", sub: "Audited Responses" },
    ]},
  ],
  classflow: [
    { label: "Ingress", nodes: [
      { title: "WS Class Event", sub: "Realtime Gateway" },
      { title: "Redis Redlock", sub: "Distributed Lock" },
    ]},
    { label: "Matching", nodes: [
      { title: "Scheduler State", sub: "Match Execution" },
      { title: "Timezone Matcher", sub: "UTC Offset Scoping" },
      { title: "Load Scorer", sub: "Rating Indexer" },
    ]},
    { label: "Processing", nodes: [
      { title: "Celery Worker", sub: "Asynchronous Queue" },
      { title: "PostgreSQL DB", sub: "Serializable Transaction" },
    ]},
    { label: "Settlement", nodes: [
      { title: "Double-Entry Ledger", sub: "Deduplication Key" },
      { title: "Stripe Custom", sub: "Payout API" },
    ]},
    { label: "Release", nodes: [
      { title: "Redis Eviction", sub: "Release Mutex" },
      { title: "WS State Sync", sub: "Client Broadcasts" },
    ]},
  ],
  savyour: [
    { label: "Ingress", nodes: [
      { title: "Partner Webhook", sub: "HMAC-SHA256 Payload" },
      { title: "Nginx Gateway", sub: "Rate Limiter" },
      { title: "Ingestion Router", sub: "Header Gate" },
    ]},
    { label: "Deduplication", nodes: [
      { title: "Bloom Filter", sub: "Deduplication Key" },
      { title: "Rewards Calc", sub: "Base & Promo Rates" },
    ]},
    { label: "Buffering", nodes: [
      { title: "SQS Ingest Queue", sub: "Decoupled Buffer" },
      { title: "Redis Cache Eviction", sub: "Wallet Namespace" },
    ]},
    { label: "Ledger", nodes: [
      { title: "PostgreSQL DB", sub: "Repeatable Read ACID" },
      { title: "Double-Entry Ledger", sub: "Balance Mutex" },
    ]},
    { label: "Settlement", nodes: [
      { title: "Idempotence Sync", sub: "Deduplication Sync" },
      { title: "Wallet Balance Sync", sub: "Disbursement API" },
    ]},
  ],
  efu: [
    { label: "Capture", nodes: [
      { title: "Physical Scanner", sub: "High-Vol Ingestion" },
      { title: "IBM Datacap Queue", sub: "OCR / Queue Store" },
    ]},
    { label: "Routing", nodes: [
      { title: "Case Router PE", sub: "IBM Process Engine" },
      { title: "Dispatch Rules", sub: "Underwriter Routing" },
      { title: "LDAP AD Sync", sub: "Access Control List" },
    ]},
    { label: "Storage", nodes: [
      { title: "Metadata Index", sub: "Document Metadata" },
      { title: "FileNet P8 Store", sub: "Clustered HA Repo" },
      { title: "DB Clustered Stack", sub: "Active-Active Sync" },
    ]},
    { label: "Compliance", nodes: [
      { title: "Audit Trail Logger", sub: "Compliance Audit" },
      { title: "LDAP ACL Verify", sub: "Security Groups" },
    ]},
    { label: "Delivery", nodes: [
      { title: "Workplace XT UI", sub: "Underwriting Case" },
    ]},
  ],
};

export default function MobileArchitecture({ type }: { type: ProjectVisualType }) {
  const stages = DIAGRAMS[type];
  if (!stages) return null;

  return (
    <div className={styles.flow}>
      {stages.map((stage, i) => (
        <div className={styles.stage} key={stage.label}>
          <div className={styles.stageHead}>
            <span className={styles.stageIndex}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.stageLabel}>{stage.label}</span>
          </div>

          <div className={styles.nodes}>
            {stage.nodes.map((node) => (
              <div className={styles.node} key={node.title}>
                <strong className={styles.nodeTitle}>{node.title}</strong>
                <span className={styles.nodeSub}>{node.sub}</span>
              </div>
            ))}
          </div>

          {i < stages.length - 1 && (
            <div className={styles.connector} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
