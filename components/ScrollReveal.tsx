"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const targets = document.querySelectorAll<HTMLElement>(".reveal-section, .reveal-item");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px 28% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
