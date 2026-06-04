import styles from "./ProjectVisual.module.css";

export type ProjectVisualType = "wellows" | "classflow" | "savyour" | "efu";

type ProjectVisualProps = {
  type: ProjectVisualType;
  variant?: "card" | "hero";
};

const visualData = {
  wellows: {
    brand: "Wellows", title: "Search visibility command center", metric: "3 agents active",
    tabs: ["Visibility", "Citations", "Technical"],
    rows: [["KIVA", "Keyword opportunity map", "Running"], ["OPTA", "Technical audit queue", "Healthy"], ["Citations", "LLM brand monitoring", "Live"]],
    chart: [42, 54, 48, 66, 62, 79, 74, 88],
  },
  classflow: {
    brand: "ClassFlow", title: "Learning operations", metric: "0 manual ops",
    tabs: ["Schedule", "Teachers", "Payments"],
    rows: [["09:30", "Teacher match confirmed", "Ready"], ["11:00", "Live class lifecycle", "Active"], ["14:30", "Payment disbursement", "Queued"]],
    chart: [48, 44, 58, 62, 70, 66, 82, 86],
  },
  savyour: {
    brand: "Savyour", title: "Partner & wallet operations", metric: "650+ partners",
    tabs: ["Partners", "Cashback", "Wallet"],
    rows: [["Partner API", "Cashback event received", "Synced"], ["Wallet", "Reward calculation", "Verified"], ["Disbursement", "Payment batch", "Ready"]],
    chart: [38, 52, 47, 68, 64, 76, 83, 91],
  },
  efu: {
    brand: "EFU Life", title: "Digital case management", metric: "100% paperless",
    tabs: ["Cases", "Capture", "Compliance"],
    rows: [["Capture", "Policy document indexed", "Filed"], ["Case", "Claims workflow routed", "Review"], ["Compliance", "Audit trail updated", "Clear"]],
    chart: [34, 46, 58, 55, 69, 74, 82, 89],
  },
};

export default function ProjectVisual({ type, variant = "card" }: ProjectVisualProps) {
  const data = visualData[type];
  return (
    <figure className={`${styles.visual} ${styles[type] || ""} ${styles[variant] || ""}`}>
      <figcaption>Conceptual interface representation</figcaption>
      <div className={styles.window}>
        <header>
          <div className={styles.brand}>
            <span>{data.brand.slice(0, 1)}</span>
            <div><strong>{data.brand}</strong><small>{data.title}</small></div>
          </div>
          <div className={styles.windowTools}><i /><i /><i /></div>
        </header>
        <div className={styles.toolbar}>
          <nav>{data.tabs.map((tab, index) => <span className={index === 0 ? styles.activeTab : ""} key={tab}>{tab}</span>)}</nav>
          <strong>{data.metric}</strong>
        </div>
        <div className={styles.dashboard}>
          <section className={styles.chartPanel}>
            <div className={styles.chartHeading}><span>System activity</span><em>Live</em></div>
            <div className={styles.chart}>{data.chart.map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</div>
            <div className={styles.chartLegend}><span>Inputs</span><span>Orchestration</span><span>Delivery</span></div>
          </section>
          <aside>
            <span>Operational health</span><strong>All systems clear</strong>
            <div className={styles.healthRing}><i /></div><small>Architecture status</small>
          </aside>
        </div>
        <div className={styles.table}>
          {data.rows.map(([label, detail, status]) => <div key={`${label}-${detail}`}><strong>{label}</strong><span>{detail}</span><em>{status}</em></div>)}
        </div>
      </div>
    </figure>
  );
}
