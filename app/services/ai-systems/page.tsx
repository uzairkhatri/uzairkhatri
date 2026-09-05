import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";

const image = "https://uzairkhatri.github.io/uzairkhatri/linkedin-featured/services.png";

export const metadata: Metadata = {
  title: "AI Systems & Software Architecture Services | Uzair Khatri",
  description: "Production-ready AI agents, RAG platforms, workflow automation, backend architecture, and cloud-native systems designed by Uzair Khatri.",
  openGraph: { title: "AI Systems Built for Production", description: "From AI prototype to reliable business system.", url: "https://uzairkhatri.github.io/uzairkhatri/services/ai-systems/", images: [{ url: image, width: 1200, height: 627 }] },
  twitter: { card: "summary_large_image", title: "AI Systems Built for Production", description: "From AI prototype to reliable business system.", images: [image] },
};

export default function AISystemsServices() {
  return <FeaturedLanding
    eyebrow="AI systems & software architecture"
    title={<>Turn ambitious AI ideas into <em>operable systems.</em></>}
    intro="I help founders, CTOs, and product teams design and deliver AI agents, RAG platforms, intelligent workflows, and cloud-native backends that can survive real traffic, real failures, and real business expectations."
    proof="12+ years across enterprise architecture, Java and Spring, Python and FastAPI, AWS, Kubernetes, and production AI delivery."
    primaryLabel="Discuss your system"
    primaryHref={BOOKING_URL}
    secondaryLabel="See selected work"
    secondaryHref={withBasePath("/case-studies/")}
    stats={[{value:"12+",label:"Years designing enterprise systems"},{value:"AI → Cloud",label:"Architecture across the full delivery path"},{value:"Production",label:"Reliability, security, cost, and observability built in"}]}
    sectionEyebrow="Where I create leverage"
    sectionTitle="Architecture that closes the gap between demo and delivery."
    sectionIntro="The work begins with the business constraint, not the model. Every engagement produces clear technical decisions, a delivery path, and an operating model your team can own."
    cards={[
      {eyebrow:"01 / Agentic systems",title:"AI agents that complete real workflows",text:"Multi-agent orchestration, tool integration, human approval paths, retries, state management, and measurable task completion."},
      {eyebrow:"02 / Grounded intelligence",title:"RAG and knowledge platforms",text:"Ingestion, retrieval, citations, evaluation, access controls, and observability designed around trustworthy answers."},
      {eyebrow:"03 / Enterprise backbone",title:"Backend and integration architecture",text:"Typed APIs, event-driven workflows, service boundaries, legacy integration, and migration plans that reduce operational risk."},
      {eyebrow:"04 / Production operations",title:"Cloud, reliability, and cost controls",text:"AWS and Kubernetes architecture, queues, scaling, failure isolation, monitoring, security boundaries, and predictable AI spend."},
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
  />;
}
