"use client";

import React from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export default function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <div className={`${styles.logoContainer} ${compact ? styles.compact : ""} ${className}`}>
      {/* Emblem Section */}
      <div className={styles.emblemWrapper}>
        <div className={styles.emblemGlow} />
        <svg
          width={compact ? "24" : "32"}
          height={compact ? "24" : "32"}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.emblem}
          aria-hidden="true"
        >
          <defs>
            {/* Soft, rich gold gradient matching the site's dark palette */}
            <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE29A" />
              <stop offset="50%" stopColor="#D8AD64" />
              <stop offset="100%" stopColor="#B38942" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Blueprint background grid ticks */}
          <circle cx="18" cy="18" r="16.5" stroke="url(#logoGoldGrad)" strokeWidth="0.65" strokeOpacity="0.12" />
          <circle cx="18" cy="18" r="12" stroke="url(#logoGoldGrad)" strokeWidth="0.5" strokeOpacity="0.08" />
          
          {/* Axis markers */}
          <path d="M 18 1.5 V 4 M 18 32 V 34.5 M 1.5 18 H 4 M 32 18 H 34.5" stroke="url(#logoGoldGrad)" strokeWidth="0.75" strokeOpacity="0.25" strokeLinecap="round" />

          {/* Connected architecture gridline between U and K */}
          <path d="M 15 18 H 20" stroke="url(#logoGoldGrad)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="1 1" />

          {/* Letter "U" path */}
          <path
            d="M 9 13.5 V 20 C 9 23.5, 15 23.5, 15 20 V 13.5"
            stroke="url(#logoGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 1px rgba(216, 173, 100, 0.25))" }}
          />

          {/* Letter "K" path */}
          <path
            d="M 20.5 12 V 24 M 20.5 18 L 26.5 12 M 20.5 18 L 26.5 24"
            stroke="url(#logoGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 1px rgba(216, 173, 100, 0.25))" }}
          />

          {/* Glowing system nodes at key vertices */}
          {/* U - Top Left */}
          <circle cx="9" cy="13.5" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNode} />
          {/* U - Top Right */}
          <circle cx="15" cy="13.5" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNodeDelay1} />
          {/* K - Top Left */}
          <circle cx="20.5" cy="12" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNodeDelay1} />
          {/* K - Bottom Left */}
          <circle cx="20.5" cy="24" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNodeDelay2} />
          {/* K - Middle Junction */}
          <circle cx="20.5" cy="18" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNode} />
          {/* K - Top Right */}
          <circle cx="26.5" cy="12" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNodeDelay2} />
          {/* K - Bottom Right */}
          <circle cx="26.5" cy="24" r="1.8" fill="url(#logoGoldGrad)" className={styles.animatedNode} />
        </svg>
      </div>

      {/* Typography / Wordmark Section */}
      <div className={styles.textContainer}>
        <span className={styles.brandName}>
          <span className={styles.goldText}>Uzair</span>
          <span className={styles.whiteText}>Khatri</span>
        </span>
        {!compact && (
          <span className={styles.subtitle}>AI Systems Architect</span>
        )}
      </div>
    </div>
  );
}
