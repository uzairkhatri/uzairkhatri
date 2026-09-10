import type { Metadata } from "next";
import { Inter, Space_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uzairkhatri.dev"),
  title: {
    default: "Uzair Khatri | AI Production Architect",
    template: "%s | Uzair Khatri",
  },
  description:
    "Uzair Khatri turns fragile AI prototypes into reliable production systems with agent runtimes, guardrails, tracing, queues, cost controls, and cloud architecture.",
  keywords: [
    "AI Systems Architect",
    "AI Production Architect",
    "Solutions Architect",
    "LangGraph",
    "Multi-Agent Systems",
    "FastAPI",
    "AWS",
    "Dubai AI Architect",
    "RAG Architecture",
    "Uzair Khatri",
    "Uzair Iqbal"
  ],
  authors: [{ name: "Uzair Khatri (Uzair Iqbal)" }],
  creator: "Uzair Khatri",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uzairkhatri.dev",
    siteName: "Uzair Khatri | AI Production Architect",
    title: "Uzair Khatri | AI Production Architect",
    description:
      "Turning fragile AI prototypes into resilient production systems with multi-agent runtimes, deterministic guardrails, and enterprise cloud infrastructure.",
    images: [
      {
        url: "/img/profile/hero-portrait.png",
        width: 1200,
        height: 630,
        alt: "Uzair Khatri — AI Production Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair Khatri | AI Production Architect",
    description:
      "Turning fragile AI prototypes into resilient production systems with multi-agent runtimes, deterministic guardrails, and enterprise cloud infrastructure.",
    images: ["/img/profile/hero-portrait.png"],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceMono.variable} ${outfit.variable} ${cormorantGaramond.variable}`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}



