import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png?v=20260921";

export const metadata: Metadata = {
  title: "Production AI & Architecture Diagnostic Review (Custom 2-Week Sprint)",
  description:
    "A custom-scoped 2-week technical review for AI systems and SaaS platforms: isolating hallucination vectors, token cost leaks, rate-limit bottlenecks, and scale risks by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/services/ai-audit/",
  },
  openGraph: {
    title: "Production AI & Architecture Diagnostic Review | Uzair Khatri",
    description: "Custom-scoped 2-week architectural sprint to isolate hallucination vectors, token cost leaks, and scale risks.",
    url: "https://uzairkhatri.com/services/ai-audit/",
    images: [{ url: image, width: 1734, height: 907 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Production AI & Architecture Diagnostic Review | Uzair Khatri",
    description: "Custom-scoped 2-week architectural sprint to isolate hallucination vectors, token cost leaks, and scale risks.",
    images: ["https://uzairkhatri.com/img/og-image.png"],
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
        eyebrow="Custom-Scoped 2-Week Deep Diagnostic (Implementation & Advisory)"
        title={<>Find the failure points in your AI system <em>before your customers do.</em></>}
        intro="A custom-scoped 2-week architectural engagement (Implementation & Advisory tier) for teams needing full-stack trace analysis and remediation diffs. Looking for a fixed-scope $250 review of one agreed technical problem instead? Request the $250 Pre-Mortem or start with a free 30-minute discovery call."
        proof="14+ years across mission-critical enterprise systems, regulated insurance platforms (Enterprise Insurer), and high-throughput production AI applications."
        primaryLabel="Book Discovery Call"
        primaryHref={BOOKING_URL}
        secondaryLabel="Explore $250 Single-Problem Review"
        secondaryHref={withBasePath("/audit/")}
        stats={[
          { value: "Custom Quote", label: "2-week multi-area sprint tailored to your codebase & traces" },
          { value: "End-to-End", label: "Deep inspection of prompts, schemas, state graphs & infrastructure" },
          { value: "Direct Handoff", label: "Prioritized risk scorecards, remediation diffs & team walkthrough" },
        ]}
        sectionEyebrow="Diagnostic Focus Areas"
        sectionTitle="What the 2-week architecture review inspects and hardens."
        sectionIntro="You receive an actionable architectural blueprint, prioritized risk scorecards, and concrete code diffs your team can implement immediately."
        cards={[
          {
            eyebrow: "01 / Hallucination & Accuracy",
            title: "Model Evaluation & Guardrails",
            text: "Auditing prompt injection vectors, context leakage, schema drift, and implementing deterministic assertion layers to enforce strict Pydantic JSON output schemas.",
          },
          {
            eyebrow: "02 / Cost & Latency",
            title: "Token Optimization & Semantic Caching",
            text: "Inspecting token usage patterns, trimming unnecessary conversation history, configuring Redis semantic caching, and reducing redundant LLM round-trips.",
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
