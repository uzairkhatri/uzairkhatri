import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png?v=20260921";

export const metadata: Metadata = {
  title: "AI Services, SaaS & Software Architecture",
  description: "Production-ready AI services, agentic workflows, scalable SaaS application architecture, and high-performance web systems designed by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/services/ai-systems/",
  },
  openGraph: { title: "AI Systems Built for Production", description: "From AI prototype to reliable business system.", url: "https://uzairkhatri.com/services/ai-systems/", images: [{ url: image, width: 1734, height: 907 }] },
  twitter: { card: "summary_large_image", title: "AI Systems Built for Production", description: "From AI prototype to reliable business system.", images: [image] },
};

export default function AISystemsServices() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Services", url: "https://uzairkhatri.com/services/ai-systems/" },
        ]}
      />
      <FeaturedLanding
    eyebrow="AI systems & software architecture"
    title={<>Turn ambitious AI ideas into <em>operable systems.</em></>}
    intro="I help founders, CTOs, and product teams design and deliver AI agents, RAG platforms, intelligent workflows, and cloud-native backends that can survive real traffic, real failures, and real business expectations."
    proof="14+ years across enterprise systems, backend architecture, Python and FastAPI, AWS, and production AI delivery."
    primaryLabel="Discuss your system"
    primaryHref={BOOKING_URL}
    secondaryLabel="See selected work"
    secondaryHref={withBasePath("/case-studies/")}
    stats={[{value:"14+",label:"Years designing enterprise systems"},{value:"AI → Cloud",label:"Architecture across the full delivery path"},{value:"Production",label:"Reliability, security, cost, and observability built in"}]}
    sectionEyebrow="Structured Engagements"
    sectionTitle="High-leverage architecture services for founders and CTOs."
    sectionIntro="Every engagement produces concrete technical decisions, code boundaries, and an operating model your engineering team can own long after the engagement ends."
    cards={[
      {eyebrow:"01 / Diagnostic & Risk Audit",title:"Production AI & Architecture Review",text:"A focused 2-week deep dive into your prototype or running system: isolating hallucination vectors, rate-limit bottlenecks, state corruption risks, and token cost leakages.",href:withBasePath("/services/ai-audit/"),linkLabel:"Explore AI Diagnostic Sprint"},
      {eyebrow:"02 / Agentic Engineering",title:"Multi-Agent Runtimes & State Architecture",text:"Designing fault-isolated agent coordination with LangGraph, structured memory contracts, dead-letter retry queues, deterministic guardrails, and human review gates.",href:withBasePath("/services/ai-agents/"),linkLabel:"Explore Multi-Agent Runtimes"},
      {eyebrow:"03 / Platform Infrastructure",title:"High-Throughput Backends & Concurrency Safety",text:"Engineering distributed cloud backends with Redis Redlock mutexes, async Celery/SQS workers, ACID database isolation, and Stripe automated ledgers.",href:withBasePath("/services/saas-architecture/"),linkLabel:"Explore SaaS Architecture"},
      {eyebrow:"04 / Strategic Advisory",title:"Fractional AI Systems Architect & Governance",text:"Senior architectural leadership for funded startups and enterprises: model failover paths via AWS Bedrock, cost governance, observability, and team handoff.",href:BOOKING_URL,linkLabel:"Book Advisory Call"},
    ]}
    stepsEyebrow="A focused engagement"
    stepsTitle="From unclear problem to executable system plan."
    steps={[
      {number:"01",title:"Clarify the outcome",text:"Map the workflow, users, constraints, existing systems, and the business result worth measuring."},
      {number:"02",title:"Design the architecture",text:"Define service boundaries, agent responsibilities, data flows, evaluation, failure paths, and security controls."},
      {number:"03",title:"Build the critical path",text:"Deliver the smallest production-worthy slice that proves technical feasibility and business value."},
      {number:"04",title:"Harden and hand over",text:"Add observability, testing, cost controls, documentation, and a roadmap your team can operate after launch."},
    ]}
    closingTitle="Bring me the workflow that should work better."
    closingText="In 30 minutes, we will identify the strongest solution direction, the risks that matter, and the next practical step."
  />
    </>
  );
}
