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
        background: "#0a0c0e",
        color: "#f7f7f5",
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
          border: "2px solid rgba(212, 170, 103, 0.22)",
          borderTopColor: "#d4aa67",
          animation: "bookSpin 0.8s linear infinite",
          marginBottom: "1.5rem",
        }}
      />
      <h1 style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
        Connecting to Strategy Calendar...
      </h1>
      <p style={{ color: "#a3abb6", fontSize: "0.95rem", maxWidth: "420px", marginBottom: "1.75rem", lineHeight: 1.6 }}>
        Redirecting you to schedule your 30-minute architecture review session with Uzair Khatri.
      </p>
      <a
        href={bookingUrl}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.4rem",
          background: "linear-gradient(180deg, #dfb97a 0%, #c49a57 100%)",
          border: "1px solid #dfb97a",
          borderRadius: "8px",
          color: "#0b0d0e",
          textDecoration: "none",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          boxShadow: "0 4px 14px rgba(212, 170, 103, 0.22)",
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
