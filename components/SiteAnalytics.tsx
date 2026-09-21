"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { initializeAnalytics, MEASUREMENT_ID, trackLinkClick } from "./analytics";

export default function SiteAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!initializeAnalytics()) return;
    setEnabled(true);
    // Capture once, before Next navigation or the booking dialog stops bubbling.
    document.addEventListener("click", trackLinkClick, true);
    document.addEventListener("auxclick", trackLinkClick, true);
    return () => {
      document.removeEventListener("click", trackLinkClick, true);
      document.removeEventListener("auxclick", trackLinkClick, true);
    };
  }, []);

  return enabled ? (
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`} />
  ) : null;
}
