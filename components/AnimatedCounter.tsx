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
    const ctrl = animate(motionVal, num, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, num, suffix, motionVal]);

  return (
    <span ref={ref} className={className}>
      {num !== null ? "0" + suffix : value}
    </span>
  );
}
