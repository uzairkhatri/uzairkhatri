import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "Production AI & Architecture Diagnostic Review — Uzair Khatri",
  description:
    "A 2-week focused technical review for AI systems and SaaS platforms: isolating hallucination vectors, token cost leaks, rate-limit bottlenecks, and scale risks by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/services/ai-audit/",
  },
  openGraph: {
    title: "Production AI & Architecture Diagnostic Review",
    description: "Isolate hallucination vectors, token cost leaks, and scale risks in a focused 2-week architectural sprint.",
    url: "https://uzairkhatri.com/services/ai-audit/",
    images: [{ url: image, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Production AI & Architecture Diagnostic Review",
    description: "Isolate hallucination vectors, token cost leaks, and scale risks in a focused 2-week architectural sprint.",
    images: [image],
  },
};

export default function AIAuditServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Services", url: "https://uzairkhatri.com/services/ai-systems/" },
          { name: "AI Architecture Diagnostic", url: "https://uzairkhatri.com/services/ai-audit/" },
        ]}
      />
      <FeaturedLanding
        eyebrow="Diagnostic Sprint / Architecture Review"
        title={<>Find the failure points in your AI system <em>before your customers do.</em></>}
        intro="A focused 2-week architectural diagnostic for founders, CTOs, and engineering leaders: isolating hallucination vectors, API rate-limit bottlenecks, token cost leaks, and state corruption risks in your prototype or live product."
        proof="14+ years across mission-critical enterprise systems, regulated insurance platforms (EFU Life), and high-throughput production AI applications."
        primaryLabel="Book Diagnostic Review"
        primaryHref={BOOKING_URL}
        secondaryLabel="Review All Services"
        secondaryHref={withBasePath("/services/ai-systems/")}
        stats={[
          { value: "2-Week", label: "Fixed-scope diagnostic sprint with immediate deliverables" },
          { value: "360°", label: "Audit covering prompts, schemas, state graphs & cloud infrastructure" },
          { value: "Direct ROI", label: "Immediate token cost reductions & reliability hardening" },
        ]}
        sectionEyebrow="Diagnostic Focus Areas"
        sectionTitle="What the 2-week architecture review inspects and hardens."
        sectionIntro="You receive an actionable architectural blueprint, prioritized risk scorecards, and concrete code diffs your team can implement immediately."
        cards={[
          {
            eyebrow: "01 / Hallucination & Accuracy",
            title: "Model Evaluation & Guardrails",
            text: "Auditing prompt injection vectors, context leakage, schema drift, and implementing deterministic assertion layers to guarantee strict Pydantic JSON outputs.",
          },
          {
            eyebrow: "02 / Cost & Latency",
            title: "Token Optimization & Semantic Caching",
            text: "Inspecting token usage patterns, trimming unnecessary conversation history, configuring Redis semantic caching, and eliminating redundant LLM round-trips.",
          },
          {
            eyebrow: "03 / Availability & Fallbacks",
            title: "Multi-Model Failover & Resiliency",
            text: "Designing automatic multi-provider fallback routes (OpenAI to Claude 3.5 Sonnet via AWS Bedrock), circuit breakers, and exponential backoff retry queues.",
          },
          {
            eyebrow: "04 / State & Memory Leaks",
            title: "Agent StateGraph & Session Safety",
            text: "Uncovering memory leaks in LangChain/LangGraph runtimes, unhandled exceptions in asynchronous agent tools, and deadlocks in vector store lookups.",
          },
        ]}
        stepsEyebrow="2-Week Sprint Timeline"
        stepsTitle="From code review to a hardened architecture roadmap."
        steps={[
          {
            number: "01",
            title: "Codebase & Trace Ingestion (Days 1–3)",
            text: "Connect observability traces (LangSmith, OpenTelemetry), inspect prompts, output schemas, vector pipelines, and API boundaries.",
          },
          {
            number: "02",
            title: "Synthetic Pressure Testing (Days 4–7)",
            text: "Simulate rate-limit spikes, malformed user inputs, context window saturation, and concurrent database write races.",
          },
          {
            number: "03",
            title: "Remediation Blueprint & Code Diffs (Days 8–11)",
            text: "Write the exact technical decisions, code diffs, fallback strategies, and cost-reduction architecture.",
          },
          {
            number: "04",
            title: "Executive Presentation & Handoff (Days 12–14)",
            text: "Deliver the prioritized roadmap, lead the architecture review meeting with your engineering team, and hand over operational runbooks.",
          },
        ]}
        closingTitle="Don’t wait for an outage or surprise API bill."
        closingText="Let’s spend 30 minutes evaluating your current AI architecture and see if the 2-week diagnostic sprint is the right fit for your team."
      />
    </>
  );
}
