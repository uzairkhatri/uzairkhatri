import styles from "./Writing.module.css";

const essays = [
  {
    title: "How I Think About Production AI",
    summary:
      "Why the hard part is no longer the prompt, but the system around the prompt: orchestration, state, recovery, observability, and cost control.",
  },
  {
    title: "The Prototype Is Not the Product",
    summary:
      "A practical architecture lens for teams moving from investor-demo energy to real users, real traffic, and business-critical reliability.",
  },
  {
    title: "Agents Need Boundaries Before They Need Tools",
    summary:
      "A note on designing agentic workflows with clear responsibilities, failure paths, and human-operable control surfaces.",
  },
];

export default function Writing() {
  return (
    <section className={styles.section} id="writing" aria-labelledby="writing-title">
      <div className={styles.shell}>
        <header className={styles.header}>
          <p>Writing</p>
          <h2 id="writing-title">How I think about production AI.</h2>
          <span>Short essays and architecture notes for teams building past the demo.</span>
        </header>

        <div className={styles.grid}>
          {essays.map((essay) => (
            <article className={styles.card} key={essay.title}>
              <span>Architecture note</span>
              <h3>{essay.title}</h3>
              <p>{essay.summary}</p>
              <a href="#contact">Discuss this idea -&gt;</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
