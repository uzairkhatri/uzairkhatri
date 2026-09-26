import { BASE_PATH, BOOKING_URL } from "./siteLinks";

export const MEASUREMENT_ID = "G-1LXS5Z6GJ6";
const OPT_OUT_KEY = "portfolio-analytics-disabled";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    "ga-disable-G-1LXS5Z6GJ6"?: boolean;
    portfolioAnalyticsInitialized?: boolean;
  }
}

export function isAnalyticsAllowed() {
  if (typeof window === "undefined") return false;
  if (window.location.protocol !== "https:" ||
      !["uzairkhatri.com", "www.uzairkhatri.com"].includes(window.location.hostname)) return false;
  if (window["ga-disable-G-1LXS5Z6GJ6"]) return false;
  try {
    return new URLSearchParams(window.location.search).get("analytics") !== "off" &&
      window.localStorage.getItem(OPT_OUT_KEY) !== "true";
  } catch {
    // Fail closed when the browser cannot read a saved testing preference.
    return false;
  }
}

export function initializeAnalytics() {
  if (typeof window === "undefined") return false;
  const preference = new URLSearchParams(window.location.search).get("analytics");
  try {
    if (preference === "off") window.localStorage.setItem(OPT_OUT_KEY, "true");
    if (preference === "on") window.localStorage.removeItem(OPT_OUT_KEY);
  } catch {
    window["ga-disable-G-1LXS5Z6GJ6"] = true;
    return false;
  }
  if (!isAnalyticsAllowed()) {
    window["ga-disable-G-1LXS5Z6GJ6"] = true;
    return false;
  }
  if (!window.portfolioAnalyticsInitialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID);
    window.portfolioAnalyticsInitialized = true;
  }
  return true;
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (isAnalyticsAllowed() && typeof window.gtag === "function") {
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

export function trackAuditSubmission(stack: string, bottleneck: string) {
  trackEvent("audit_request", {
    event_category: "Conversion",
    event_label: `${stack} - ${bottleneck}`,
    stack,
    bottleneck,
    value: 1,
  });
}

export function trackBookingClick(source: string = "general") {
  if (!isAnalyticsAllowed()) return;
  trackEvent("booking_click", {
    event_category: "Conversion",
    event_label: source,
    source,
    page_path: window.location.pathname,
    value: 1,
  });
}

export function trackLinkClick(event: MouseEvent) {
  if (!isAnalyticsAllowed()) return;
  if (event.type === "click" ? event.button !== 0 : event.type !== "auxclick" || event.button !== 1) return;
  if (!(event.target instanceof Element)) return;
  const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
  if (!anchor) return;
  const source = anchor.getAttribute("data-source") ||
    anchor.closest("section[id], nav, footer")?.getAttribute("id") || "page_link";
  const destination = new URL(anchor.href, window.location.href);
  if (destination.href === BOOKING_URL) {
    trackBookingClick(source);
    return;
  }
  if (destination.origin !== window.location.origin) return;
  const workPrefix = `${BASE_PATH}/work/`;
  if (!destination.pathname.startsWith(workPrefix)) return;
  const slug = destination.pathname.slice(workPrefix.length).replace(/\/$/, "");
  if (!/^[a-z0-9-]+$/.test(slug)) return;
  trackEvent("case_study_click", {
    case_study: slug,
    source,
    page_path: window.location.pathname,
    destination_path: destination.pathname,
  });
}
