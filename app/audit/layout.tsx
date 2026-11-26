import type { Metadata } from "next";

const image = "https://uzairkhatri.com/linkedin-featured/audit.jpg?v=20261126";

export const metadata: Metadata = {
  title: "AI Production Architecture Pre-Mortem Audit",
  description:
    "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch with a focused technical architecture review.",
  alternates: {
    canonical: "https://uzairkhatri.com/audit/",
  },
  openGraph: {
    title: "What Breaks at Scale? Architecture Pre-Mortem | Uzair Khatri",
    description:
      "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch with a focused technical architecture review.",
    url: "https://uzairkhatri.com/audit/",
    images: [{ url: image, width: 1024, height: 536 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Breaks at Scale? Architecture Pre-Mortem | Uzair Khatri",
    description:
      "Identify hallucination vectors, latency bottlenecks, rate limits, and token cost leaks before launch with a focused technical architecture review.",
    images: [image],
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

