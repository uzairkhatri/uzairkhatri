import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "Multi-Agent AI Workflows & LangGraph Architecture",
  description:
    "Production multi-agent AI architecture, LangGraph stateful runtimes, deterministic guardrails, RAG retrieval spines, and fault-isolated agent clusters designed by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/services/ai-agents/",
  },
  openGraph: {
    title: "Multi-Agent AI Workflows Built for Production",
    description: "Stateful agent runtimes, LangGraph orchestration, deterministic guardrails, and fault-isolated architectures.",
    url: "https://uzairkhatri.com/services/ai-agents/",
    images: [{ url: image, width: 1200, height: 627 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Agent AI Workflows Built for Production",
    description: "Stateful agent runtimes, LangGraph orchestration, deterministic guardrails, and fault-isolated architectures.",
    images: [image],
  },
};

export default function AIAgentsServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Services", url: "https://uzairkhatri.com/services/ai-systems/" },
          { name: "Multi-Agent AI Workflows", url: "https://uzairkhatri.com/services/ai-agents/" },
        ]}
      />
      <FeaturedLanding
        eyebrow="Agentic AI Workflows & Runtimes"
        title={<>Multi-agent systems designed for <em>unforgiving production.</em></>}
        intro="I architect stateful, error-isolated multi-agent workflows using LangGraph, structured memory contracts, deterministic guardrails, and asynchronous task execution that survive model rate-limits, context bloat, and hallucinations."
        proof="Solutions Architect on the Wellows LLM search visibility platform (KIVA, OPTA, Citation Intelligence) with sub-200ms vector retrieval and 80% manual workflow reduction."
        primaryLabel="Discuss Agent Architecture"
        primaryHref={BOOKING_URL}
        secondaryLabel="Read Wellows Case Study"
        secondaryHref={withBasePath("/work/wellows/")}
        stats={[
          { value: "3+", label: "Isolated agents coordinated in production clusters" },
          { value: "<200ms", label: "Vector retrieval latency target achieved" },
          { value: "Zero", label: "Cascading failure propagation across agent boundaries" },
        ]}
        sectionEyebrow="Agent Engineering Deliverables"
        sectionTitle="How I take agents from fragile scripts to deterministic pipelines."
        sectionIntro="Every agentic system I design has explicit memory boundaries, schema validation, rate-limit backpressure, and human-in-the-loop gates."
        cards={[
          {
            eyebrow: "01 / Orchestration",
            title: "LangGraph StateGraph & Routing",
            text: "Stateful cyclical and acyclic agent graphs, supervisor-worker coordination, and checkpointing for full workflow resumability after third-party API interruptions.",
          },
          {
            eyebrow: "02 / Guardrails",
            title: "Deterministic Boundaries & Evaluation",
            text: "Input sanitization, strict Pydantic output schema validation, prompt injection defense, and automated evaluation suites testing against hallucination drift.",
          },
          {
            eyebrow: "03 / Retrieval Spine",
            title: "Chunked Vector RAG & Search Ingestion",
            text: "Hybrid dense-sparse retrieval, semantic re-ranking, chunk-size optimization, and asynchronous vector indexing pipelines accessible across all agent nodes.",
          },
          {
            eyebrow: "04 / Fault Isolation",
            title: "Dead-Letter Queues & Circuit Breakers",
            text: "Decoupling agent tool execution behind Celery/SQS queues, exponential retries with jitter, and human escalation gates before high-risk external actions.",
          },
        ]}
        stepsEyebrow="Architecture Engagement Path"
        stepsTitle="From prototype failure points to a scalable agent runtime."
        steps={[
          {
            number: "01",
            title: "Deconstruct the Workflow & Tools",
            text: "Map domain actions into isolated agent responsibilities with unambiguous input/output JSON contracts.",
          },
          {
            number: "02",
            title: "Implement LangGraph State Management",
            text: "Build deterministic routing, checkpointed persistence, and thread-scoped context windows to prevent token bloat.",
          },
          {
            number: "03",
            title: "Harden Retrieval & Tool Sandboxes",
            text: "Connect hybrid vector stores, configure API rate-limit circuit breakers, and enforce Pydantic validation on all tool outputs.",
          },
          {
            number: "04",
            title: "Observability & Production Handoff",
            text: "Set up tracing (OpenTelemetry/LangSmith), cost-tracking monitors, latency alerts, and complete operational runbooks.",
          },
        ]}
        closingTitle="Ready to move your AI agents beyond the demo?"
        closingText="Let’s map out your agent state graph, failure boundaries, and execution roadmap in a 30-minute architecture review."
      />
    </>
  );
}
