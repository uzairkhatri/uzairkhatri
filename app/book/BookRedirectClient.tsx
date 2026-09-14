"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo";

export default function BookRedirectClient({ bookingUrl }: { bookingUrl: string }) {
  useEffect(() => {
    window.location.replace(bookingUrl);
  }, [bookingUrl]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#08090c",
        color: "#ededed",
        fontFamily: "var(--font-inter, sans-serif)",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <Logo />
      </div>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "2px solid rgba(229, 169, 59, 0.2)",
          borderTopColor: "#e5a93b",
          animation: "bookSpin 0.8s linear infinite",
          marginBottom: "1.5rem",
        }}
      />
      <h1 style={{ fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
        Connecting to Strategy Calendar...
      </h1>
      <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem", maxWidth: "420px", marginBottom: "1.5rem" }}>
        Redirecting you to schedule your 30-minute architecture review session with Uzair Khatri.
      </p>
      <a
        href={bookingUrl}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.4rem",
          background: "rgba(229, 169, 59, 0.12)",
          border: "1px solid rgba(229, 169, 59, 0.4)",
          borderRadius: "6px",
          color: "#e5a93b",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        Click here if you are not automatically redirected &rarr;
      </a>
      <style>{`
        @keyframes bookSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
