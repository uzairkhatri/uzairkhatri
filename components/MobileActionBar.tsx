"use client";

import { useEffect, useState } from "react";
import styles from "./MobileActionBar.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";

export default function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroThreshold = 350;
          const docHeight = document.documentElement.scrollHeight;
          const isNearBottom = window.innerHeight + scrollY >= docHeight - 380;
          const contact = document.getElementById("contact")?.getBoundingClientRect();
          const isContactVisible = contact && contact.top < window.innerHeight && contact.bottom > 0;

          // Show when scrolled past hero, but hide near contact/footer
          if (scrollY > heroThreshold && !isNearBottom && !isContactVisible) {
            setVisible(true);
          } else {
            setVisible(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <aside 
      className={`${styles.container} ${visible ? styles.visible : ""}`}
      aria-label="Quick mobile actions"
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className={styles.bar}>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.bookingBtn}
          data-source="mobile_sticky_bar"
        >
          <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Book Strategy Call</span>
        </a>

        <a
          href={withBasePath("/#contact-card")}
          className={styles.contactBtn}
        >
          <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>Message</span>
        </a>
      </div>
    </aside>
  );
}
