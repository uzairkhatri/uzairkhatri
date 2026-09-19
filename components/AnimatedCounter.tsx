"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const motionVal = useMotionValue(0);

  // Parse leading number + suffix (e.g. "650+" → 650, "+")
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  const num = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (!inView || num === null || !ref.current) return;

    // Keep the real value in server-rendered HTML for crawlers, accessibility,
    // and no-JS users. Only switch to zero once the client is ready to animate.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ref.current.textContent = value;
      return;
    }

    ref.current.textContent = "0" + suffix;
    motionVal.set(0);

    const ctrl = animate(motionVal, num, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, num, suffix, motionVal, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
