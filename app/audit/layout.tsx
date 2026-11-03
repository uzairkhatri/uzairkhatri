import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Production Architecture Pre-Mortem Audit",
  description:
    "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch with a focused technical architecture review.",
  alternates: {
    canonical: "https://uzairkhatri.com/audit/",
  },
  openGraph: {
    title: "Free AI Production Architecture Pre-Mortem Audit | Uzair Khatri",
    description:
      "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch.",
    url: "https://uzairkhatri.com/audit/",
    images: [{ url: "https://uzairkhatri.com/img/og-image.png", width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Production Architecture Pre-Mortem Audit | Uzair Khatri",
    description:
      "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch.",
    images: ["https://uzairkhatri.com/img/og-image.png"],
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

