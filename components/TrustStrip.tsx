import styles from "./TrustStrip.module.css";

const testimonials = [
  {
    quote:
      "We had a critical issue that several other developers could not solve. Uzair resolved it cleanly within an hour. Exceptional problem-solving ability.",
    author: "Founder",
    source: "Name withheld - Custom Platform Recovery",
  },
  {
    quote:
      "One of the most efficient engineers I have worked with: fast execution, clean delivery, and zero unnecessary back-and-forth.",
    author: "Product Lead",
    source: "Name withheld - AI Product Delivery",
  },
  {
    quote:
      "Uzair delivers exactly what he promises, on time, with strong communication throughout. A true professional.",
    author: "Operations Lead",
    source: "Name withheld - Remote Engineering",
  },
  {
    quote:
      "Fantastic to work with: collaborative, solution-oriented, and someone who genuinely takes ownership instead of just completing tasks.",
    author: "Startup Team",
    source: "Name withheld - Product Engineering",
  },
  {
    quote:
      "We had an extremely complex custom platform with significant technical issues. Uzair stepped in, stabilised the system, and delivered new features. Highly dependable.",
    author: "Platform Owner",
    source: "Name withheld - Long-term System Build",
  },
  {
    quote:
      "Uzair has been a tremendous help across multiple projects. Reliable, technically strong, and someone we kept rehiring because he consistently delivered.",
    author: "Agency Partner",
    source: "Name withheld - Multi-project Delivery",
  },
];

function TestimonialCard({ author, quote, source }: { author: string; quote: string; source: string }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardStars} aria-label="Five star rating">
        {"*****"}
      </div>
      <p className={styles.cardText}>&ldquo;{quote}&rdquo;</p>
      <footer className={styles.cardFooter}>
        <span className={styles.cardAuthor}>{author}</span>
        <span className={styles.cardSource}>{source}</span>
      </footer>
    </article>
  );
}

export default function TrustStrip() {
  return (
    <section className={`${styles.section} reveal-section`} aria-label="Client testimonials">
      <div className={styles.shell}>
        <div className={styles.eyebrow}>
          <span />
          Client results
          <span />
        </div>

        <header className={styles.header}>
          <h2>Trusted when the system has to work.</h2>
          <p>
            Client names withheld per NDA and platform policy. References available upon request
            for serious architecture conversations.
          </p>
        </header>

        <div className={styles.inner}>
          <div className={styles.featured}>
            <div className={styles.featuredStars} aria-label="Five star rating">
              {"*****"}
            </div>
            <blockquote className={styles.featuredQuote}>
              &ldquo;Exceptional engineer. Strong technical depth, proactive communication, and the
              kind of person you trust with business-critical work.&rdquo;
            </blockquote>
            <footer className={styles.featuredFooter}>
              <div className={styles.featuredAvatar}>NW</div>
              <div className={styles.featuredMeta}>
                <span className={styles.featuredName}>Founder</span>
                <span className={styles.featuredSource}>Name withheld - Architecture Advisory</span>
              </div>
            </footer>
          </div>

          <div className={styles.testimonialGrid} aria-label="Additional testimonials">
            {testimonials.map((item) => (
              <TestimonialCard key={`${item.author}-${item.source}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
