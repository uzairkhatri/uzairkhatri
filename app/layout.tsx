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
  title: "Uzair Khatri | AI Systems Architect",
  description:
    "Uzair Khatri helps founders, CTOs, and product teams turn AI prototypes into production systems through agentic workflows, LLM platforms, backend architecture, and scalable cloud infrastructure."
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


