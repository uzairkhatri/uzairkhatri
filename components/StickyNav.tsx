"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./StickyNav.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

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
    <motion.nav
      initial={{ x: "-50%", y: -15, opacity: 0, scale: 0.96 }}
      animate={visible ? { x: "-50%", y: 0, opacity: 1, scale: 1 } : { x: "-50%", y: -15, opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={styles.nav}
      aria-label="Sticky navigation"
    >
      <a href={withBasePath("/")} className={styles.brand} aria-label="Uzair Khatri home" style={{ textDecoration: "none" }}>
        <Logo compact={true} />
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
        <span className={styles.ctaTextPrimary}>Free Review</span>
        <span className={styles.ctaTextHover} aria-hidden="true">Free Review</span>
      </a>
    </motion.nav>
  );
}
