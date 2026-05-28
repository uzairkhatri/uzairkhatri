import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
