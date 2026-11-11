import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";

const image = "https://uzairkhatri.com/linkedin-featured/strategy-call.png?v=20260921";

export const metadata: Metadata = {
  title: "Book a 30-Minute Architecture Discovery Call",
  description: "A focused 30-minute verbal conversation about your AI services, SaaS application bottlenecks, or engineering role scope.",
  alternates: {
    canonical: "https://uzairkhatri.com/strategy-call/",
  },
  openGraph: { title: "30-Minute Architecture Discovery Call | Uzair Khatri", description: "Bring one difficult AI, SaaS, or architecture bottleneck. Walk through constraints, key risks, and next steps (verbal call, no written deliverable).", url: "https://uzairkhatri.com/strategy-call/", images: [{ url: image, width: 1734, height: 907 }] },
  twitter: { card: "summary_large_image", title: "30-Minute Architecture Discovery Call | Uzair Khatri", description: "Bring one difficult AI, SaaS, or architecture bottleneck. Walk through constraints, key risks, and next steps (verbal call, no written deliverable).", images: [image] },
};

export default function StrategyCall() {
  return <FeaturedLanding
    eyebrow="Free 30-minute architecture discovery call"
    title={<>Bring one hard problem. Leave with a <em>clearer direction.</em></>}
    intro="This is a focused verbal conversation for founders, CTOs, product leaders, and engineering hiring teams dealing with an AI workflow, architecture bottleneck, or senior hiring decision."
    proof="No generic pitch and no written deliverable promised—we spend 30 minutes testing assumptions, bottlenecks, and the clearest next move."
    primaryLabel="Choose a time on Calendly"
    primaryHref={BOOKING_URL}
    secondaryLabel="Explore $250 Architecture Pre-Mortem"
    secondaryHref={withBasePath("/audit/")}
    stats={[{value:"Free · 30 Min",label:"1-on-1 verbal engineering triage around one problem"},{value:"No Report",label:"Verbal discussion only—written audits live in /audit/"},{value:"No Pitch Deck",label:"Practical architecture and next-step clarity"}]}
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
