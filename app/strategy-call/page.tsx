import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";

const image = "https://uzairkhatri.github.io/uzairkhatri/linkedin-featured/strategy-call.png";

export const metadata: Metadata = {
  title: "Book an AI Architecture Strategy Call | Uzair Khatri",
  description: "A focused 30-minute conversation about your AI workflow, architecture bottleneck, or unreliable production system.",
  openGraph: { title: "Let’s Solve Your AI Workflow", description: "Bring one difficult AI or architecture problem. Leave with a clearer direction.", url: "https://uzairkhatri.github.io/uzairkhatri/strategy-call/", images: [{ url: image, width: 1200, height: 627 }] },
  twitter: { card: "summary_large_image", title: "Let’s Solve Your AI Workflow", description: "Bring one difficult AI or architecture problem. Leave with a clearer direction.", images: [image] },
};

export default function StrategyCall() {
  return <FeaturedLanding
    eyebrow="30-minute architecture strategy call"
    title={<>Bring one hard problem. Leave with a <em>clearer direction.</em></>}
    intro="This is a focused working conversation for founders, CTOs, and product leaders dealing with an AI workflow, product architecture decision, integration bottleneck, or unreliable system."
    proof="No generic AI pitch. We will stay with your actual workflow, constraints, risks, and next decision."
    primaryLabel="Choose a time on Calendly"
    primaryHref={BOOKING_URL}
    secondaryLabel="Review my services first"
    secondaryHref={withBasePath("/services/ai-systems/")}
    stats={[{value:"30 min",label:"Focused discussion around one problem"},{value:"3 outputs",label:"Direction, key risks, and next steps"},{value:"No pitch deck",label:"A practical architecture conversation"}]}
    sectionEyebrow="Good reasons to book"
    sectionTitle="Use the call when the next technical decision matters."
    sectionIntro="You do not need a finished specification. You do need a real problem, enough context to discuss it, and a reason to make progress now."
    cards={[
      {eyebrow:"Prototype → production",title:"The demo works, but the system is fragile",text:"We can identify missing reliability, evaluation, security, observability, scaling, and cost controls."},
      {eyebrow:"Workflow automation",title:"Manual work is slowing the business",text:"We can map where agents, deterministic automation, human review, and existing tools should each take responsibility."},
      {eyebrow:"Architecture decision",title:"Your team has multiple plausible directions",text:"We can compare boundaries and tradeoffs around models, retrieval, APIs, data, infrastructure, and integration."},
      {eyebrow:"Recovery",title:"An AI system is producing unreliable results",text:"We can isolate whether the failure sits in prompts, retrieval, data quality, orchestration, evaluation, or operations."},
    ]}
    stepsEyebrow="What happens"
    stepsTitle="A short call with a concrete shape."
    steps={[
      {number:"01",title:"You frame the problem",text:"Share the current workflow, desired outcome, constraints, and what has already been attempted."},
      {number:"02",title:"We test the assumptions",text:"I will ask the questions that reveal hidden system boundaries, risks, dependencies, and missing evidence."},
      {number:"03",title:"We map the direction",text:"You leave with the strongest next move, the risks to validate, and what not to overbuild yet."},
    ]}
    closingTitle="The next useful decision may take 30 minutes."
    closingText="Select a time that works for you. If there is relevant context, add it to the Calendly notes so we can start quickly."
  />;
}
