"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./StickyNav.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import Logo from "./Logo";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const heroThreshold = window.innerHeight * 0.65;
          const docHeight = document.documentElement.scrollHeight;
          const isNearFooter = window.innerHeight + currentY >= docHeight - 160;

          if (currentY <= heroThreshold || isNearFooter) {
            // Above hero threshold or near footer: hide to avoid duplicate nav or overlapping footer
            setVisible(false);
          } else if (currentY < lastScrollY.current - 4) {
            // Scrolling UP: reveal nav
            setVisible(true);
          } else if (currentY > lastScrollY.current + 8) {
            // Scrolling DOWN: auto-hide so it never obscures headings, cards, or quotes while reading
            setVisible(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ x: "-50%", y: -24, opacity: 0, scale: 0.97 }}
      animate={
        visible
          ? { x: "-50%", y: 0, opacity: 1, scale: 1 }
          : { x: "-50%", y: -24, opacity: 0, scale: 0.97 }
      }
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={styles.nav}
      aria-label="Sticky navigation"
    >
      <a
        href={withBasePath("/")}
        className={styles.brand}
        aria-label="Uzair Khatri home"
        style={{ textDecoration: "none" }}
      >
        <Logo compact={true} />
      </a>

      <div className={styles.links}>
        <a href={withBasePath("/#work")}>Work</a>
        <a href={withBasePath("/services/ai-systems/")}>Services</a>
        <a href={withBasePath("/case-studies/")}>Case Studies</a>
        <a href={withBasePath("/#about")}>About</a>
        <a href={withBasePath("/#contact")}>Contact</a>
      </div>

      <a
        href={BOOKING_URL}
        className={styles.cta}
        target="_blank"
        rel="noreferrer"
      >
        <span className={styles.ctaTextPrimary}>Request Review</span>
        <span className={styles.ctaTextHover} aria-hidden="true">
          Request Review
        </span>
      </a>
    </motion.nav>
  );
}
