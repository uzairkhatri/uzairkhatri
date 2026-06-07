"use client";

import { useEffect, useState } from "react";
import styles from "./StickyNav.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

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
      <a href={withBasePath("/")} className={styles.brand} aria-label="Uzair Khatri home" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--gold)" }}>
          <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2.2" />
          <path d="M10 10v7a6 6 0 0 0 12 0v-7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>Uzair Khatri</span>
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
