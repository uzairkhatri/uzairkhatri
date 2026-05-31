import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section} aria-label="Production AI manifesto">
      <div className={styles.shell}>
        <p>Manifesto</p>
        <h2>
          Most AI systems fail around the model, not inside it.
          <br />
          <span>I design the layer that makes the model survivable.</span>
        </h2>
      </div>
    </section>
  );
}
