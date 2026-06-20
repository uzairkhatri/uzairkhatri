"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrollPos = window.scrollY;
      const pct = (scrollPos / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation in case page loads scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        background: "linear-gradient(to right, var(--gold, #c59b53), var(--gold-bright, #d8ad64), var(--gold, #c59b53))",
        zIndex: 9999,
        transition: "width 0.1s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: "none",
        boxShadow: "0 1px 10px rgba(216, 173, 100, 0.4)",
      }}
      aria-hidden="true"
    />
  );
}
