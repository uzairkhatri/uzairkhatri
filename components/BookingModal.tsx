"use client";

import { useEffect, useState } from "react";
import styles from "./BookingModal.module.css";
import { BOOKING_URL } from "./siteLinks";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (target && target instanceof HTMLAnchorElement) {
        const href = target.getAttribute("href") || "";
        // Intercept calendly booking links
        if (href.includes("calendly.com") || href === BOOKING_URL) {
          e.preventDefault();
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay} 
      onClick={() => setIsOpen(false)} 
      role="dialog" 
      aria-modal="true"
      aria-label="Calendly Booking Modal"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={() => setIsOpen(false)} 
          aria-label="Close booking modal"
        >
          &times;
        </button>
        <div className={styles.iframeContainer}>
          <iframe
            src="https://calendly.com/uz-khatri/30min?embed_domain=localhost&embed_type=inline"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a 30-Min Architecture Review"
          />
        </div>
      </div>
    </div>
  );
}
