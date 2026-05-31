import styles from "./HeroStats.module.css";

const stats = [
  "10+ Years",
  "25+ Systems Built",
  "AI SaaS",
  "Fintech",
  "EdTech",
  "Enterprise",
];

export default function HeroStats() {
  return (
    <section className={styles.section} aria-label="Career credibility snapshot">
      <div className={styles.shell}>
        {stats.map((stat) => (
          <span className={styles.stat} key={stat}>{stat}</span>
        ))}
      </div>
    </section>
  );
}
