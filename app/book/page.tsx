import type { Metadata } from "next";
import { BOOKING_URL } from "@/components/siteLinks";
import BookRedirectClient from "./BookRedirectClient";

export const metadata: Metadata = {
  title: "Book an Architecture Strategy Session",
  description: "Schedule a 30-minute high-impact architecture strategy session with Uzair Khatri.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookPage() {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${BOOKING_URL}`} />
      </head>
      <BookRedirectClient bookingUrl={BOOKING_URL} />
    </>
  );
}
