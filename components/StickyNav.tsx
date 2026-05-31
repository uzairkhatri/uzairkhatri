"use client";

import { useEffect, useState } from "react";
import styles from "./StickyNav.module.css";
import { BOOKING_URL } from "./siteLinks";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.75;

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.visible : ""}`}
      aria-label="Sticky navigation"
    >
      <a href="/" className={styles.brand} aria-label="Uzair Khatri home">
        Uzair Khatri
      </a>

      <div className={styles.links}>
        <a href="#work">Work</a>
        <a href="#writing">Writing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>

      <a
        href={BOOKING_URL}
        className={styles.cta}
        target="_blank"
        rel="noreferrer"
      >
        Book Call
      </a>
    </nav>
  );
}
