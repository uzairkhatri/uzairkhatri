import styles from "./HeroStats.module.css";

const stats = [
  { value: "10+", label: "Years across software and AI" },
  { value: "25+", label: "Systems and product builds" },
  { value: "4", label: "Industries: AI SaaS, fintech, edtech, enterprise" },
  { value: "8+", label: "Engineers mentored and led" },
];

export default function HeroStats() {
  return (
    <section className={styles.section} aria-label="Career credibility snapshot">
      <div className={styles.shell}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
