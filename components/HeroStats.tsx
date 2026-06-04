import styles from "./HeroStats.module.css";

export default function HeroStats() {
  return (
    <section className={`${styles.section} reveal-section`} aria-label="Career credibility snapshot">
      <div className={styles.shell}>
        <p>10 years. 25 systems. Zero demos counted as production.</p>
        <span>AI SaaS / Fintech / EdTech / Enterprise</span>
      </div>
    </section>
  );
}
