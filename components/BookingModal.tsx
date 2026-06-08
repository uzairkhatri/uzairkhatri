"use client";

import { useEffect, useState } from "react";
import styles from "./BookingModal.module.css";
import { BOOKING_URL } from "./siteLinks";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("Establishing secure route...");

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
          setIsLoading(true); // Reset state
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
    if (!isOpen) return;

    const statuses = [
      "Establishing secure routing node...",
      "Resolving SSL proxy handshake...",
      "Connecting to Calendly API...",
      "Syncing availability buffers...",
      "Building scheduler interface...",
      "Active calendar synchronized."
    ];

    let index = 0;
    setLoadingStatus(statuses[0]);

    const interval = setInterval(() => {
      index++;
      if (index < statuses.length) {
        setLoadingStatus(statuses[index]);
      }
    }, 220);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Prevent layout shift from scrollbar disappearing
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";

      // Close on ESC key press
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
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
          {isLoading && (
            <div className={styles.loaderContainer}>
              <div className={styles.premiumLoader}>
                <div className={styles.ringOuter} />
                <div className={styles.ringInner} />
                <div className={styles.coreDot} />
              </div>
              <div className={styles.telemetryStatus}>
                <span className={styles.statusLine}>{loadingStatus}</span>
              </div>
            </div>
          )}
          <iframe
            src="https://calendly.com/uz-khatri/30min?embed_domain=localhost&embed_type=inline&background_color=171b1a&text_color=ffffff&primary_color=c59b53"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a 30-Min Architecture Review"
            onLoad={() => {
              setTimeout(() => {
                setIsLoading(false);
              }, 1300);
            }}
            className={`${styles.iframe} ${isLoading ? "" : styles.iframeLoaded}`}
          />
        </div>
      </div>
    </div>
  );
}
