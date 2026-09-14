// Client-side Google Analytics GA4 Conversion Tracking Helper

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params);
    } catch {
      // Graceful fallback if adblockers block gtag
    }
  }
}

export function trackLeadSubmission(stage: string, method: string = "contact_form") {
  trackEvent("generate_lead", {
    event_category: "Conversion",
    event_label: stage,
    lead_type: stage,
    method,
    value: 1,
  });
}

export function trackBookingClick(source: string = "general") {
  trackEvent("booking_click", {
    event_category: "Conversion",
    event_label: source,
    source,
    value: 1,
  });
}
