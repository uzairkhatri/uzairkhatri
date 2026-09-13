import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";

const image = "https://uzairkhatri.com/linkedin-featured/case-studies.png";

export const metadata: Metadata = {
  title: "AI & Enterprise SaaS Case Studies",
  description: "Selected architecture work across production AI, multi-agent workflows, scalable SaaS platforms, and enterprise cloud systems.",
  alternates: {
    canonical: "https://uzairkhatri.com/case-studies/",
  },
  openGraph: { title: "Real Systems. Real Business Results.", description: "Selected AI and enterprise architecture work by Uzair Khatri.", url: "https://uzairkhatri.com/case-studies/", images: [{ url: image, width: 1200, height: 627 }] },
  twitter: { card: "summary_large_image", title: "Real Systems. Real Business Results.", description: "Selected AI and enterprise architecture work by Uzair Khatri.", images: [image] },
};

export default function CaseStudies() {
  return <FeaturedLanding
    eyebrow="Selected work"
    title={<>Real systems. <em>Real operating constraints.</em></>}
    intro="A selection of architecture work where reliability, integration, speed, security, and business outcomes mattered more than a polished demo."
    proof="My role sits at the point where product ambition meets technical reality: setting boundaries, choosing tradeoffs, and helping teams ship systems they can operate."
    primaryLabel="View the Wellows case study"
    primaryHref={withBasePath("/work/wellows/")}
    secondaryLabel="Discuss a similar challenge"
    secondaryHref={BOOKING_URL}
    stats={[{value:"3",label:"Production AI agents in the Wellows platform"},{value:"80%",label:"Fewer manual workflow steps in the documented case"},{value:"Enterprise",label:"Core-system experience in regulated insurance"}]}
    sectionEyebrow="Selected engagements"
    sectionTitle="Different systems. The same standard of engineering judgment."
    sectionIntro="Some client details remain confidential. These summaries focus on the architecture problem, my responsibility, and the operational result."
    cards={[
      {eyebrow:"AI platform / Wellows",title:"Multi-agent search visibility platform",text:"Designed a production architecture for keyword intelligence, technical auditing, and citation monitoring across LLM ecosystems with LangGraph.",href:withBasePath("/work/wellows/"),linkLabel:"Read full case study"},
      {eyebrow:"Agentic SaaS / ClassFlow",title:"Autonomous learning platform & distributed locks",text:"Architected dynamic instructor matchmaking (<100ms), Redis Redlock distributed mutexes, real-time WebSockets, and automated Stripe Connect payouts.",href:withBasePath("/work/classflow/"),linkLabel:"Read full case study"},
      {eyebrow:"Fintech & Ledgers / Savyour",title:"High-concurrency rewards & transaction safety",text:"Engineered decoupled event ingestion, Redis caching, and PostgreSQL ACID transaction boundaries to process partner affiliate conversions in sub-second timelines.",href:withBasePath("/work/savyour/"),linkLabel:"Read case study"},
      {eyebrow:"Insurance / Core systems",title:"Enterprise architecture for regulated workflows",text:"Architecture experience supporting core platforms at EFU Life and Jubilee Life, where data integrity, auditability, integration, and continuity were non-negotiable."},
    ]}
    stepsEyebrow="How I evaluate the work"
    stepsTitle="The result is more than code shipped."
    steps={[
      {number:"01",title:"Business outcome",text:"What measurable workflow, customer, revenue, or operating result did the system need to improve?"},
      {number:"02",title:"Architecture decision",text:"Which technical boundary or tradeoff removed the greatest delivery or operational risk?"},
      {number:"03",title:"Production evidence",text:"How were reliability, observability, security, performance, and cost validated beyond a demo?"},
      {number:"04",title:"Team ownership",text:"Could the team understand, change, and operate the system after the architecture engagement ended?"},
    ]}
    closingTitle="Your system can become the next strong case study."
    closingText="If the problem is technically difficult, integration-heavy, or stuck between prototype and production, let’s map the path forward."
  />;
}
