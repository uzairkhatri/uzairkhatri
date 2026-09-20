"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BookingModal.module.css";
import { BOOKING_URL } from "./siteLinks";
import { trackBookingClick } from "./analytics";

const CALENDLY_EMBED_URL =
  "https://calendly.com/uz-khatri/30min?embed_domain=uzairkhatri.com&embed_type=inline&background_color=171b1a&text_color=ffffff&primary_color=c59b53";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // Warm up Calendly connection on mouse hover or focus over booking links
    const handleWarmup = (e: Event) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }
      if (target && target instanceof HTMLAnchorElement) {
        const href = target.getAttribute("href") || "";
        if (href === BOOKING_URL) {
          // Preconnect link hint dynamically if not already done
          if (!document.getElementById("calendly-preconnect")) {
            const link = document.createElement("link");
            link.id = "calendly-preconnect";
            link.rel = "preconnect";
            link.href = "https://calendly.com";
            document.head.appendChild(link);
          }
        }
      }
    };

    // Intercept clicks on Calendly links to open in modal
    const handleGlobalClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (target && target instanceof HTMLAnchorElement) {
        const href = target.getAttribute("href") || "";
        if (href === BOOKING_URL && !target.hasAttribute("data-booking-direct")) {
          e.preventDefault();
          triggerRef.current = target;
          const source = target.getAttribute("data-source") || target.innerText.trim().slice(0, 50) || "calendly_cta";
          trackBookingClick(source);
          setIsLoading(true);
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("mouseover", handleWarmup, { passive: true });
    window.addEventListener("focusin", handleWarmup, { passive: true });
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("mouseover", handleWarmup);
      window.removeEventListener("focusin", handleWarmup);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousPadding = document.body.style.paddingRight;
    const previousOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.paddingRight = previousPadding;
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
      onCancel={() => setIsOpen(false)}
      aria-label="Architecture Review Booking Modal"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span>Book an architecture call</span>
          <button
            autoFocus
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close booking modal"
          >
            &times;
          </button>
        </div>

        <div className={styles.iframeContainer}>
          {isLoading && (
            <div className={styles.skeletonContainer} aria-busy="true" aria-label="Loading booking calendar">
              {/* Skeleton Header */}
              <div className={styles.skeletonHeader}>
                <div className={styles.loadingMessage}>
                  <span className={styles.spinner} />
                  <span>Loading your booking calendar&hellip;</span>
                </div>
                <span className={styles.subtext}>
                  30-Minute Architecture Review &bull; Uzair Khatri
                </span>
              </div>

              {/* Skeleton Mockup Grid */}
              <div className={styles.skeletonBody}>
                <div className={styles.skeletonLeft}>
                  <div className={`${styles.skeletonLine} ${styles.w60}`} />
                  <div className={`${styles.skeletonLine} ${styles.w90}`} />
                  <div className={`${styles.skeletonLine} ${styles.w40}`} />
                  <div className={styles.skeletonSpacer} />
                  <div className={`${styles.skeletonLine} ${styles.w80}`} />
                  <div className={`${styles.skeletonLine} ${styles.w70}`} />
                </div>
                <div className={styles.skeletonRight}>
                  <div className={styles.skeletonCalendarHeader}>
                    <div className={`${styles.skeletonLine} ${styles.w30}`} />
                    <div className={`${styles.skeletonLine} ${styles.w20}`} />
                  </div>
                  <div className={styles.skeletonCalendarGrid}>
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className={styles.skeletonDay} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <iframe
            src={CALENDLY_EMBED_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Book a 30-Min Architecture Review"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setIsLoading(false)}
            className={`${styles.iframe} ${isLoading ? "" : styles.iframeLoaded}`}
          />
        </div>
        <div className={styles.fallbackNotice}>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" data-booking-direct>
            Open directly on Calendly &rarr;
          </a>
        </div>
      </div>
    </dialog>
  );
}
