import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={`${styles.section} reveal-section`} aria-label="Production AI manifesto">
      <div className={styles.shell}>
        <p>Manifesto</p>
        <div className={styles.copy}>
          <h2>Most AI systems fail around the model, not inside it.</h2>
          <span>I design the layer that makes the model survivable.</span>
        </div>
        <div className={styles.systemMap} aria-hidden="true">
          <span className={styles.model}>Model</span>
          <span className={styles.orbitOne} />
          <span className={styles.orbitTwo} />
          <span className={styles.nodeA}>Retries</span>
          <span className={styles.nodeB}>State</span>
          <span className={styles.nodeC}>Observability</span>
          <span className={styles.nodeD}>Cost</span>
        </div>
      </div>
    </section>
  );
}
