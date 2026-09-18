import styles from "./TrustStrip.module.css";
import { EMAIL_ADDRESS } from "./siteLinks";

const testimonials = [
  {
    quote:
      "We had an extremely complex custom platform with significant technical issues. Uzair stepped in, stabilised the system, and delivered new features. Highly dependable.",
    author: "Ronak",
    location: "United States",
    source: "Platform Owner — Long-term System Build",
  },
  {
    quote:
      "One of the most efficient engineers I have worked with: fast execution, clean delivery, and zero unnecessary back-and-forth.",
    author: "Product Lead",
    location: "Saskatoon, Canada",
    source: "AI Product Delivery",
  },
  {
    quote:
      "Uzair delivers exactly what he promises, on time, with strong communication throughout. A true professional.",
    author: "Arad",
    location: "Sarajevo, Bosnia",
    source: "Operations Lead — Remote Engineering",
  },
  {
    quote:
      "Uzair has been a tremendous help across multiple projects. Reliable, technically strong, and someone we kept rehiring because he consistently delivered.",
    author: "Technical Partner",
    location: "United Kingdom",
    source: "Multi-project Systems Delivery Partner",
  },
  {
    quote:
      "Fantastic to work with: collaborative, solution-oriented, and someone who genuinely takes ownership instead of just completing tasks.",
    author: "Startup Team",
    location: "Sarajevo, Bosnia",
    source: "Product Engineering Collaboration",
  },
  {
    quote:
      "Exceptional engineer. Strong technical depth, proactive communication, and the kind of person you trust with business-critical work.",
    author: "Enterprise Partner",
    location: "United States",
    source: "NDA Partner — Architecture Advisory (Founder, name withheld)",
  },
];

function StarRating() {
  return (
    <div className={styles.starRating} aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={styles.starIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ author, quote, source, location }: { author: string; quote: string; source: string; location?: string }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardStars} role="img" aria-label="Five star rating">
        <StarRating />
      </div>
      <p className={styles.cardText}>&ldquo;{quote}&rdquo;</p>
      <footer className={styles.cardFooter}>
        <span className={styles.cardAuthor}>
          {author}
          {location && <span className={styles.cardLocation}> • {location}</span>}
        </span>
        <span className={styles.cardSource}>{source}</span>
      </footer>
    </article>
  );
}

export default function TrustStrip() {
  return (
    <section className={`${styles.section} reveal-section`} id="testimonials" aria-label="Client testimonials">
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          <span>SYSTEM RELIABILITY</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>AGENTIC INFRASTRUCTURE</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>LARGE-SCALE INGESTION</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>COLD-START OPTIMIZATION</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>FAULT TOLERANCE</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>HIGH THROUGHPUT</span>
          <span className={styles.marqueeDot}>&bull;</span>
          
          {/* Duplicate set for seamless looping */}
          <span>SYSTEM RELIABILITY</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>AGENTIC INFRASTRUCTURE</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>LARGE-SCALE INGESTION</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>COLD-START OPTIMIZATION</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>FAULT TOLERANCE</span>
          <span className={styles.marqueeDot}>&bull;</span>
          <span>HIGH THROUGHPUT</span>
          <span className={styles.marqueeDot}>&bull;</span>
        </div>
      </div>

      <div className={styles.shell}>
        <div className="section-eyebrow">
          <span />
          Client results
        </div>

        <header className={styles.header}>
          <h2>Client Results &amp; References</h2>
          <p>
            Direct feedback from the founders, platform owners, and product teams I have built and stabilised systems for.
          </p>
        </header>

        <div className={styles.inner}>
          <div className={styles.featured}>
            <div className={styles.featuredStars} role="img" aria-label="Five star rating">
              <StarRating />
            </div>
            <blockquote className={styles.featuredQuote}>
              &ldquo;We had a critical issue that several other developers could not solve. Uzair resolved it cleanly within an hour. Exceptional problem-solving ability.&rdquo;
            </blockquote>
            <footer className={styles.featuredFooter}>
              <div className={styles.featuredAvatar}>SK</div>
              <div className={styles.featuredMeta}>
                <span className={styles.featuredName}>Stacy &bull; Saskatoon, Canada</span>
                <span className={styles.featuredSource}>Founder &mdash; Custom Platform Recovery</span>
              </div>
            </footer>
          </div>

          <div className={styles.testimonialGrid} aria-label="Additional testimonials">
            {testimonials.map((item) => (
              <TestimonialCard key={`${item.author}-${item.source}`} {...item} />
            ))}
          </div>
        </div>

        <div className={styles.verificationBanner}>
          <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <div className={styles.bannerText}>
            <strong>NDA Protected &amp; Verified</strong>
            <span>References can be formally validated upon request.</span>
          </div>
          <a href={`mailto:${EMAIL_ADDRESS}?subject=Reference%20Verification%20Request&body=Hi%20Uzair%2C%0A%0AI'm%20reviewing%20your%20architecture%20portfolio%20and%20would%20like%20to%20verify%20references%20for%20your%20withheld%20NDA%20testimonials.%0A%0AThanks%2C%0A%5BMy%20Name%5D`} className={styles.verifyLink}>
            Request validation reference &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
