"use client";

import { useRef, MouseEvent } from "react";

export interface TiltGlowOptions {
  maxTilt?: number;
  scale?: number;
  enableTilt?: boolean;
  enableGlow?: boolean;
}

export function useTiltAndGlow(options: TiltGlowOptions = {}) {
  const cardRef = useRef<any>(null);

  const {
    maxTilt = 8,
    scale = 1.02,
    enableTilt = true,
    enableGlow = true,
  } = options;

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (enableGlow) {
      const glowX = ((x / rect.width) * 100).toFixed(2);
      const glowY = ((y / rect.height) * 100).toFixed(2);
      card.style.setProperty("--glow-x", `${glowX}%`);
      card.style.setProperty("--glow-y", `${glowY}%`);
    }

    if (enableTilt) {
      const pctX = x / rect.width - 0.5;
      const pctY = y / rect.height - 0.5;

      const tiltX = (-pctY * maxTilt).toFixed(2);
      const tiltY = (pctX * maxTilt).toFixed(2);

      card.style.setProperty("--tilt-x", `${tiltX}deg`);
      card.style.setProperty("--tilt-y", `${tiltY}deg`);
      card.style.setProperty("--card-scale", `${scale}`);
    }
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--card-scale", "1");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  };

  return {
    ref: cardRef,
    onMouseMove,
    onMouseLeave,
    style: {
      transform: enableTilt
        ? "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale3d(var(--card-scale, 1), var(--card-scale, 1), 1)"
        : undefined,
      transition: "transform 0.15s ease-out, border-color 0.3s ease, background-color 0.3s ease",
      position: "relative" as const,
    },
  };
}
