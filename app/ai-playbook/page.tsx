import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";

const image = "https://uzairkhatri.github.io/uzairkhatri/linkedin-featured/ai-playbook.png";

export const metadata: Metadata = {
  title: "The Production AI Playbook | Uzair Khatri",
  description: "A practical framework for moving AI systems from impressive prototypes to reliable production operation.",
  openGraph: { title: "The Production AI Playbook", description: "Evaluation, observability, security, cost, and human oversight for real AI systems.", url: "https://uzairkhatri.github.io/uzairkhatri/ai-playbook/", images: [{ url: image, width: 1200, height: 627 }] },
  twitter: { card: "summary_large_image", title: "The Production AI Playbook", description: "Evaluation, observability, security, cost, and human oversight for real AI systems.", images: [image] },
};

export default function AIPlaybook() {
  return <FeaturedLanding
    eyebrow="The production AI playbook"
    title={<>A prototype proves possibility. Production demands <em>evidence.</em></>}
    intro="Use this framework to evaluate an AI agent, RAG platform, or intelligent workflow before customers and operations depend on it."
    proof="The central question is not whether the model can produce a good answer. It is whether the complete system can produce acceptable outcomes repeatedly, safely, and at a known cost."
    primaryLabel="Discuss your production plan"
    primaryHref={BOOKING_URL}
    secondaryLabel="See architecture services"
    secondaryHref={withBasePath("/services/ai-systems/")}
    stats={[{value:"5 layers",label:"Evaluation, reliability, security, cost, oversight"},{value:"1 system",label:"Model behavior and software behavior tested together"},{value:"Always",label:"Evidence before confidence"}]}
    sectionEyebrow="The five production gates"
    sectionTitle="What must be true before the system earns trust."
    sectionIntro="These gates apply differently by use case, but none can be replaced by a successful demo or a handful of manually selected examples."
    cards={[
      {eyebrow:"Gate 01 / Evaluation",title:"Define acceptable outcomes",text:"Build representative test sets, explicit scoring criteria, regression checks, and thresholds connected to the business workflow."},
      {eyebrow:"Gate 02 / Observability",title:"Make failure visible",text:"Trace inputs, retrieval, tool calls, model outputs, latency, cost, retries, and the final action taken by the system."},
      {eyebrow:"Gate 03 / Security",title:"Constrain data and authority",text:"Enforce identity, least privilege, data boundaries, prompt-injection defenses, tool restrictions, and audit trails."},
      {eyebrow:"Gate 04 / Economics",title:"Know the cost of a useful outcome",text:"Measure total workflow cost, not only token price. Include retries, retrieval, tools, infrastructure, review, and failure."},
      {eyebrow:"Gate 05 / Oversight",title:"Keep humans where judgment matters",text:"Define approval points, escalation paths, reversible actions, and safe fallbacks for uncertainty or system degradation."},
      {eyebrow:"Operating principle",title:"Treat prompts as one component",text:"The production system also includes data, retrieval, tools, services, queues, permissions, tests, monitoring, and people."},
    ]}
    stepsEyebrow="A practical review sequence"
    stepsTitle="Move from confidence by impression to confidence by evidence."
    steps={[
      {number:"01",title:"Map the complete workflow",text:"Document every input, decision, retrieval step, tool call, side effect, human handoff, and failure path."},
      {number:"02",title:"Create the evaluation baseline",text:"Capture representative cases, expected behavior, unacceptable behavior, and the current system’s measurable performance."},
      {number:"03",title:"Add operating controls",text:"Instrument the system, restrict authority, introduce fallbacks, set budgets, and make risky actions reviewable."},
      {number:"04",title:"Release progressively",text:"Start with limited scope, compare production evidence against thresholds, and expand only when the system earns it."},
    ]}
    closingTitle="Want this framework applied to your system?"
    closingText="Bring your architecture, workflow, or prototype. We will identify the most important production gap and the evidence needed to close it."
  />;
}
