import React from "react";
import { CV_URL, withBasePath } from "./siteLinks";
import styles from "./DualPathways.module.css";

interface SystemCredential {
  name: string;
  capability: string;
  badge: string;
  windowTab: string;
  stack: string;
  href: string;
  preview: React.ReactNode;
}

const SELECTED_SYSTEMS: SystemCredential[] = [
  {
    name: "Wellows",
    capability: "AI-powered SaaS",
    badge: "CASE STUDY \u2197",
    windowTab: "Analytics Console",
    stack: "LangGraph \u00b7 Multi-Agent \u00b7 Next.js",
    href: "/work/wellows/",
    preview: (
      <div className={styles.uiBody}>
        <div className={styles.uiHeadline}>AI Search Visibility &amp; Citations</div>
        <div className={styles.uiSubCard}>
          <div className={styles.uiMetricRow}>
            <span>Brand Citation Score:</span>
            <strong>88.4%</strong>
            <em className={styles.uiPositive}>(+14%)</em>
          </div>

          <div className={styles.uiRowsList}>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotEmerald} aria-hidden="true" />
                ChatGPT Search
              </span>
              <span className={styles.uiPillEmerald}>Cited &middot; #1 Source</span>
            </div>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotEmerald} aria-hidden="true" />
                Perplexity AI
              </span>
              <span className={styles.uiPillEmerald}>Cited &middot; 92% Visibility</span>
            </div>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotGold} aria-hidden="true" />
                Gemini / AI Overview
              </span>
              <span className={styles.uiPillGold}>KIVA Draft Ready</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Savyour",
    capability: "Fintech & distributed systems",
    badge: "FINTECH",
    windowTab: "Fintech Ledger",
    stack: "Microservices \u00b7 Event-Driven \u00b7 AWS",
    href: "/work/savyour/",
    preview: (
      <div className={styles.uiBody}>
        <div className={styles.uiHeadline}>Partner Settlement &amp; ACID Ledger</div>
        <div className={styles.uiSubCard}>
          <div className={styles.uiMetricRow}>
            <span>100+ Active Merchants &middot;</span>
            <strong>99.99%</strong>
            <span>Ledger Sync</span>
          </div>

          <div className={styles.uiRowsList}>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotEmerald} aria-hidden="true" />
                Webhook #SV-9402
              </span>
              <span className={styles.uiPillEmerald}>HMAC Verified</span>
            </div>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotGold} aria-hidden="true" />
                Cashback Calc (+5.0%)
              </span>
              <span className={styles.uiPillGold}>ACID Committed</span>
            </div>
            <div className={styles.uiItemRow}>
              <span className={styles.uiItemName}>
                <span className={styles.uiDotEmerald} aria-hidden="true" />
                Wallet Disbursement
              </span>
              <span className={styles.uiPillEmerald}>Settled &middot; 18ms</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "EFU Life",
    capability: "Enterprise insurance",
    badge: "ENTERPRISE",
    windowTab: "Workflow Console",
    stack: "Core Systems \u00b7 APIs \u00b7 High Availability",
    href: "/work/efu-life/",
    preview: (
      <div className={styles.uiBody}>
        <div className={styles.uiHeadline}>Policy Underwriting Workflow</div>
        <div className={styles.uiSubCard}>
          <div className={styles.uiMetricRow}>
            <strong>Policy #EFU-4091</strong>
            <span>&middot; Paperless Case Queue</span>
          </div>

          <div className={styles.uiStepper}>
            <div className={styles.uiStepNode}>
              <span className={styles.uiStepBox}>1</span>
              <small>Scan</small>
            </div>
            <span className={styles.uiStepArrow} aria-hidden="true">&rarr;</span>
            <div className={styles.uiStepNode}>
              <span className={styles.uiStepBox}>2</span>
              <small>OCR</small>
            </div>
            <span className={styles.uiStepArrow} aria-hidden="true">&rarr;</span>
            <div className={styles.uiStepNode}>
              <span className={styles.uiStepBox}>3</span>
              <small>Risk</small>
            </div>
            <span className={styles.uiStepArrow} aria-hidden="true">&rarr;</span>
            <div className={styles.uiStepNode}>
              <span className={styles.uiStepBox}>4</span>
              <small>Review</small>
            </div>
            <span className={styles.uiStepArrow} aria-hidden="true">&rarr;</span>
            <div className={styles.uiStepNode}>
              <span className={`${styles.uiStepBox} ${styles.uiStepBoxDone}`}>&#10003;</span>
              <small className={styles.uiPositive}>Approved</small>
            </div>
          </div>

          <div className={styles.uiFooterMeta}>
            <span>
              Doc Store: <strong className={styles.uiPositive}>HA Synced</strong>
            </span>
            <span>&middot;</span>
            <span>
              Access: <strong className={styles.uiPositive}>AD/LDAP Verified</strong>
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

const PROOF_PILLS = [
  "14+ YRS ARCHITECTURE",
  "PRODUCTION AI & RAG",
  "HIGH-THROUGHPUT BACKENDS",
];

export default function DualPathways() {
  return (
    <section
      id="start"
      className={styles.section}
      aria-labelledby="executive-proof-title"
    >
      <div className={styles.container}>
        <div className={styles.ledgerFrame}>
          {/* Precision Gold Corner Brackets */}
          <span
            className={`${styles.cornerBracket} ${styles.cornerTL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerTR}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerBL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.cornerBracket} ${styles.cornerBR}`}
            aria-hidden="true"
          />

          {/* Top-Edge Warm Bronze Ambient Glow & Micro-Grid */}
          <div className={styles.topEdgeGlow} aria-hidden="true" />
          <div className={styles.blueprintGrid} aria-hidden="true" />

          {/* Row 1: Balanced Editorial Context Header + Architectural Proof Pills */}
          <div className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <div className={styles.eyebrow}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles.eyebrowStar}
                  aria-hidden="true"
                >
                  <path
                    d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
                    fill="#D4AA67"
                  />
                </svg>
                <span>02 // PRODUCTION EXPERIENCE &middot; SELECTED SYSTEMS</span>
              </div>

              <h2 id="executive-proof-title" className={styles.heading}>
                Architecture beyond the prototype.
              </h2>

              <p className={styles.subtitle}>
                Experience spanning production AI, fintech, enterprise workflows,
                and SaaS platforms.
              </p>
            </div>

            <div
              className={styles.proofPillsCol}
              aria-label="Architectural credentials"
            >
              {PROOF_PILLS.map((pill) => (
                <span key={pill} className={styles.proofPill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: 3-Column Rich Product UI Showcase Cards */}
          <div
            className={styles.systemsGrid}
            role="list"
            aria-label="Selected production systems"
          >
            {SELECTED_SYSTEMS.map((sys) => (
              <div
                key={sys.name}
                className={styles.systemCell}
                role="listitem"
              >
                <a
                  href={withBasePath(sys.href)}
                  className={styles.systemCard}
                  data-source="executive-proof-strip"
                >
                  {/* Realistic Product UI Window Preview */}
                  <div className={styles.uiWindow} aria-hidden="true">
                    <div className={styles.uiWindowBar}>
                      <div className={styles.uiTrafficLights}>
                        <span className={styles.dotRed} />
                        <span className={styles.dotYellow} />
                        <span className={styles.dotGreen} />
                      </div>
                      <span className={styles.uiWindowTab}>{sys.windowTab}</span>
                      <span className={styles.cardBadge}>{sys.badge}</span>
                    </div>

                    {sys.preview}
                  </div>

                  {/* Card Footer Copy & Tech Stack */}
                  <div className={styles.cardFooter}>
                    <div className={styles.cardBody}>
                      <span className={styles.systemName}>{sys.name}</span>
                      <span className={styles.systemCapability}>
                        {sys.capability}
                      </span>
                    </div>

                    <div className={styles.stackPill}>{sys.stack}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* Row 3: Balanced Dual-Action Fast-Track Footer Bar */}
          <div className={styles.pathwaysRow}>
            {/* Left Half: Hiring Teams */}
            <div className={styles.pathwayCell}>
              <div className={styles.pathwayInfo}>
                <div className={styles.pathwayIconBox} aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className={styles.pathwayText}>
                  <span className={styles.pathwayTitle}>FOR HIRING TEAMS</span>
                  <span className={styles.pathwayDesc}>
                    Staff, Principal &amp; AI Architect Roles (UAE &amp; Remote)
                  </span>
                </div>
              </div>

              <a
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.pathwayBtnOutline}
              >
                <span>Explore my CV (PDF)</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Right Half: Founders & CTOs */}
            <div className={styles.pathwayCell}>
              <div className={styles.pathwayInfo}>
                <div className={styles.pathwayIconBox} aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <div className={styles.pathwayText}>
                  <span className={styles.pathwayTitle}>
                    FOR FOUNDERS &amp; CTOS
                  </span>
                  <span className={styles.pathwayDesc}>
                    System Audits, Agent Orchestration &amp; Advisory
                  </span>
                </div>
              </div>

              <a
                href={withBasePath("/audit/")}
                className={styles.pathwayBtnGold}
              >
                <span>Review your architecture</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
