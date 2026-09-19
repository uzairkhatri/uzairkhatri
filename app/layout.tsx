import type { Metadata } from "next";
import { Inter, Space_Mono, Outfit, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "@/app/globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // Lighthouse attributed the page's only layout shift to this font and to
  // Cormorant Garamond swapping in over the fallback. Naming the fallback
  // stack lets next/font size-adjust against what the browser will actually
  // render first, instead of its default Arial metrics.
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "optional",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uzairkhatri.com"),
  alternates: {
    canonical: "https://uzairkhatri.com",
  },
  title: {
    default: "Uzair Khatri | AI Production Architect & SaaS Engineer",
    template: "%s | Uzair Khatri",
  },
  description:
    "Uzair Khatri provides enterprise AI services, multi-agent AI workflows, scalable SaaS application architecture, and high-performance web development.",
  keywords: [
    "AI services",
    "web development",
    "SaaS application",
    "AI workflow",
    "AI Systems Architect",
    "AI Production Architect",
    "Agentic AI",
    "LangGraph Orchestration",
    "Multi-Agent Systems",
    "Full-Stack Next.js Developer",
    "SaaS Architecture",
    "FastAPI",
    "AWS",
    "Redis Redlock",
    "Stripe Connect",
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
    url: "https://uzairkhatri.com",
    siteName: "Uzair Khatri | AI Production Architect",
    title: "Uzair Khatri | AI Production Architect & SaaS Engineer",
    description:
      "Enterprise AI services, multi-agent AI workflows, resilient SaaS application architecture, and high-performance web development by Uzair Khatri.",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 627,
        alt: "Uzair Khatri — AI Production Architect & SaaS Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzair Khatri | AI Production Architect & SaaS Engineer",
    description:
      "Enterprise AI services, multi-agent AI workflows, resilient SaaS application architecture, and high-performance web development.",
    images: ["/img/og-image.png"],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/img/profile/hero-portrait.webp"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Preconnect to Calendly to eliminate DNS/SSL handshake latency on review modal */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceMono.variable} ${outfit.variable} ${cormorantGaramond.variable}`}
      >
        {/* Google tag (gtag.js) */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-1LXS5Z6GJ6"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1LXS5Z6GJ6');
            `,
          }}
        />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

