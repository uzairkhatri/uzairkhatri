"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import SubPageNav from "@/components/SubPageNav";
import { trackAuditSubmission } from "@/components/analytics";
import { BOOKING_URL, CV_URL, withBasePath } from "@/components/siteLinks";
import styles from "./page.module.css";

const auditAreas = [
  { icon: "layers", title: "Architecture & Design", items: ["System design & flow", "Scalability & modularity", "Technology choices", "Production readiness"] },
  { icon: "data", title: "Data & RAG Quality", items: ["Data sources & pipelines", "Chunking & retrieval strategy", "Context usage & citations", "Data privacy considerations"] },
  { icon: "agents", title: "Agents & Workflows", items: ["Agent design & tool use", "Prompting & guardrails", "Workflow reliability", "Human-in-the-loop design"] },
  { icon: "cost", title: "Costs & Optimization", items: ["Token usage & model costs", "Infrastructure efficiency", "Right model for the task", "Cost reduction opportunities"] },
  { icon: "bolt", title: "Performance & Reliability", items: ["Latency & throughput", "Error handling & retries", "Monitoring & alerting", "Caching & fallbacks"] },
  { icon: "shield", title: "Security & Compliance", items: ["Data handling & access", "Prompt injection risks", "Sensitive data protection", "Compliance best practices"] },
  { icon: "deploy", title: "Deployment & Scaling", items: ["Environment setup", "CI/CD & versioning", "Scaling strategy", "Disaster recovery"] },
  { icon: "report", title: "Actionable Roadmap", items: ["Prioritized findings", "Quick wins (0-30 days)", "Longer term improvements", "Clear next steps"] },
];

const stacks = ["Python", "JavaScript / TypeScript", "LangChain", "LlamaIndex", "OpenAI", "Anthropic", "AWS", "GCP", "Azure", "Docker / Kubernetes", "PostgreSQL", "Redis", "Other"];
const faq = [
  ["Is the audit really free?", "Yes. There is no cost and no obligation. This is a technical review, not a sales call."],
  ["What will you review?", "Architecture, costs, latency, reliability, RAG, agent workflows, security and scaling."],
  ["Do I need to share source code?", "No. A high-level architecture diagram or description is usually enough."],
  ["What happens after I submit?", "I’ll review your submission and get back to you, usually within 48 hours, to schedule your 15-minute walkthrough."],
];

function AuditIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "layers") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m4 10 12-6 12 6-12 6-12-6Z"/><path d="m4 16 12 6 12-6M4 22l12 6 12-6"/></svg>;
  if (type === "data" || type === "cost") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><ellipse cx="16" cy="7" rx="10" ry="4"/><path d="M6 7v9c0 2.2 4.5 4 10 4s10-1.8 10-4V7M6 16v9c0 2.2 4.5 4 10 4s10-1.8 10-4v-9"/>{type === "cost" && <path d="M16 10v15M12.5 14h5a2 2 0 0 1 0 4h-3a2 2 0 0 0 0 4h5"/>}</svg>;
  if (type === "bolt") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M18 2 6 18h9l-1 12 12-17h-9l1-11Z"/></svg>;
  if (type === "shield") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M16 3 27 7v8c0 7-4.7 11.8-11 14-6.3-2.2-11-7-11-14V7l11-4Z"/><path d="M16 9v11"/></svg>;
  if (type === "report") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="5" y="3" width="20" height="24" rx="2"/><path d="M10 9h10M10 14h8M10 19h6M22 22l5 5"/><circle cx="21" cy="21" r="4"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m16 3 11 6-11 6L5 9l11-6Z"/><path d="m5 9v13l11 7 11-7V9M16 15v14"/><path d="m9 20 7-4 7 4"/></svg>;
}

function ArchitectureMap() {
  return <div className={styles.map} aria-label="AI production architecture overview">
    <div className={styles.mapTop}><div className={styles.mapNode}><span>♙</span>Users</div><div className={`${styles.mapNode} ${styles.mapNodeGreen}`}><span>▣</span>Frontend</div><div className={styles.mapNode}><span>⌘</span>AI Agents</div></div>
    <div className={styles.mapLines} aria-hidden="true"><i/><i/><i/></div>
    <div className={styles.orchestration}>Orchestration Layer<small>APIs · Tools · Guardrails</small></div>
    <div className={styles.mapBranches} aria-hidden="true"><i/><i/><i/><i/></div>
    <div className={styles.mapBottom}><div className={styles.smallNode}><span>▤</span>Data Sources</div><div className={styles.smallNode}><span>◖</span>LLMs</div><div className={styles.smallNode}><span>◇</span>Vector DB</div><div className={styles.smallNode}><span>↗</span>External Tools</div></div>
  </div>;
}

function AuditDashboard() {
  const [active, setActive] = useState("System Overview");
  const nav = ["System Overview", "Architecture", "Costs & Efficiency", "RAG & Data", "Agents & Workflows", "Reliability & Scaling", "Security & Compliance", "Recommendations"];
  const health = [["Architecture", "78/100", "warn"], ["Cost Efficiency", "62/100", "warn"], ["RAG Quality", "85/100", "good"], ["Latency", "71/100", "warn"], ["Security", "88/100", "good"]];
  return <section className={styles.dashboard} aria-label="Interactive AI production audit preview">
    <div className={styles.dashboardBar}><div className={styles.windowDots}><i/><i/><i/></div><div><strong>AI PRODUCTION AUDIT</strong><small>From Idea → Architecture → Production</small></div><div className={styles.ready}><span/> Audit Ready<small>Last scan: Sep 22, 2026&nbsp; 14:32</small></div></div>
    <div className={styles.dashboardBody}>
      <nav className={styles.auditRail} aria-label="Audit dashboard sections">{nav.map((item, index) => <button key={item} className={active === item ? styles.railActive : ""} onClick={() => setActive(item)} type="button"><span>{index === 0 ? "◎" : "◇"}</span>{item}</button>)}</nav>
      <ArchitectureMap />
      <aside className={styles.healthPanel}><h3>System Health</h3>{health.map(([label, score, tone]) => <div className={styles.healthRow} key={label}><span><i className={tone === "good" ? styles.good : styles.warn}/>{label}</span><strong className={tone === "good" ? styles.goodText : styles.warnText}>{score}</strong></div>)}<small>Sample results — your audit will be unique.</small></aside>
    </div>
  </section>;
}

export default function AuditPage() {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", email: "", company: "", stage: "", description: "", _gotcha: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sending = useRef(false);
  const toggleStack = (stack: string) => setSelectedStacks((current) => current.includes(stack) ? current.filter((item) => item !== stack) : [...current, stack]);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function submitAudit(event: React.FormEvent) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setStatus("submitting");
    const message = `[FREE AI PRODUCTION AUDIT]\nCompany: ${form.company || "N/A"}\nStage: ${form.stage || "N/A"}\nStack: ${selectedStacks.join(", ") || "N/A"}\n\n${form.description}`;
    try {
      const response = await fetch(withBasePath("/api/audit"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, company: form.company, stage: form.stage, stack: selectedStacks.join(", "), message, _gotcha: form._gotcha }) });
      const result = await response.json();
      if (!response.ok || !result?.success) throw new Error();
      trackAuditSubmission(selectedStacks.join(", "), "Free AI production audit");
      setStatus("success");
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  }

  return <div className={styles.page}>
    <SubPageNav backLabel="Uzair Khatri" />
    <main>
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`${styles.handNote} ${styles.noteLeft}`}>Turn your<br/>AI idea into<br/>real impact.<span>↪</span></div>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrowPill}>Free AI Production Audit</div>
          <h1>Build Smarter.<br/><em>Ship with Confidence.</em></h1>
          <p>Get a free, expert review of your AI architecture, infrastructure and workflows. Find risks, reduce costs, and improve reliability — before they impact your users or your budget.</p>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#request-audit">Request Your Free Audit <span>→</span></a><a className={styles.secondaryButton} href="#sample-report">See a Sample Report</a></div>
          <div className={styles.heroProof}><span><b>♢</b>100% Confidential</span><span><b>ϟ</b>No Sales Pitch</span><span><b>▥</b>Actionable Recommendations</span></div>
        </div>
        <div className={styles.laptopVisual} aria-hidden="true"><Image src={withBasePath("/img/audit-laptop-v2.png")} alt="" width={1536} height={1152} priority /></div>
        <AuditDashboard />
      </section>

      <section className={styles.checkSection}>
        <div className={styles.sectionHeading}><span>What We Check</span><h2>A complete review of your AI stack.</h2><p>We analyze your systems end-to-end and highlight what’s working, what’s at risk,<br/>and where you can improve.</p></div>
        <div className={styles.auditGrid}>{auditAreas.map((area) => <article className={styles.auditCard} key={area.title}><AuditIcon type={area.icon}/><h3>{area.title}</h3><ul>{area.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className={styles.reportSection} id="sample-report">
        <div className={styles.reportCopy}><div className={styles.eyebrowPill}>Sample Output</div><h2>A clear report,<br/>not just a checklist.</h2><p>You’ll receive a 10+ page audit report with visual diagrams, a summary of key issues, risk ratings, and practical recommendations you can act on.</p><a href="#request-audit" className={styles.primaryButton}>View a Sample Report <span>→</span></a></div>
        <div className={styles.reportStack} aria-label="Sample AI Production Audit report"><Image className={styles.reportAsset} src={withBasePath("/img/audit-report-v2.png")} alt="Three-page sample AI Production Audit report" width={1536} height={1024}/></div>
        <div className={`${styles.handNote} ${styles.reportNote}`}>Real insights.<br/>Real impact.<span>↪</span></div>
      </section>

      <section className={styles.engineerSection}>
        <div className={styles.sectionLabel}>Reviewed by an engineer who ships</div>
        <div className={styles.engineerPanel}><Image src={withBasePath("/img/audit-engineer-v2.png")} alt="Uzair Khatri" width={118} height={118}/><div className={styles.engineerCopy}><h2>Uzair Khatri <span>·</span> AI Production Architect</h2><p>I design and build production AI systems for real-world use cases. With 12+ years of experience in cloud-native systems, I focus on practical, scalable and cost-effective architectures that actually work in production.</p></div><ul className={styles.engineerPoints}><li>Production-focused mindset</li><li>Hands-on technical experience</li><li>Practical, non-nonsense advice</li><li>100% confidential review</li></ul></div>
      </section>

      <section className={styles.formSection} id="request-audit">
        <div className={styles.formLabel}>Get Started</div>
        {status === "success" ? <div className={styles.success}><span>✓</span><h2>Your audit request is in.</h2><p>I’ll review your details and get back to you within 48 hours.</p></div> : <>
          <div className={styles.sectionHeading}><h2>Request Your Free AI Audit</h2><p>Share a few details about your project. All submissions are kept strictly confidential.</p></div>
          <form onSubmit={submitAudit}>
            <input className={styles.honeypot} tabIndex={-1} autoComplete="off" value={form._gotcha} onChange={(e) => update("_gotcha", e.target.value)}/>
            <div className={styles.formGrid}><label>Your Name <b>*</b><input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Alex Vance"/></label><label>Work Email <b>*</b><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="alex@company.com"/></label><label>Company / Product URL<input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="company.com or app name"/></label><label>Current Stage<select value={form.stage} onChange={(e) => update("stage", e.target.value)}><option value="">Select stage</option><option>Idea / Planning</option><option>Prototype / MVP</option><option>Staging / Pre-launch</option><option>Production with users</option></select></label></div>
            <fieldset><legend>Current Stack & Frameworks <span>(select all that apply)</span></legend><div className={styles.stackOptions}>{stacks.map((stack) => <button type="button" key={stack} aria-pressed={selectedStacks.includes(stack)} onClick={() => toggleStack(stack)}>{selectedStacks.includes(stack) ? "✓" : "~"} {stack}</button>)}</div></fieldset>
            <label className={styles.fullLabel}>Tell me about your system & what you’re looking to improve <b>*</b><textarea required value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="e.g. We’re building an AI agent for customer support and want to reduce costs and improve reliability..."/></label>
            {status === "error" && <p className={styles.formError}>The request could not be sent. Please email hello@uzairkhatri.com.</p>}
            <button className={styles.submitButton} disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request Free Audit →"}</button>
            <div className={styles.formProof}><span>♙&nbsp; 100% Confidential</span><span>ϟ&nbsp; No Obligation</span><span>▣&nbsp; Practical Recommendations</span></div>
          </form>
        </>}
      </section>

      <section className={styles.faqSection}><div className={styles.sectionHeading}><span>Common Questions</span><h2>Frequently Asked Questions</h2></div><div className={styles.faqGrid}>{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className={styles.footer}><div><strong>‹&nbsp; Uzair Khatri</strong><small>AI Systems · Architecture · Real-World Impact</small></div><nav><a href={withBasePath("/#work")}>Work</a><a href={withBasePath("/services/ai-systems/")}>Services</a><a href={withBasePath("/case-studies/")}>Case Studies</a><a href={withBasePath("/insights/")}>Insights</a><a className={styles.activeLink} href={withBasePath("/audit/")}>AI Triage</a><a href={CV_URL}>CV</a><a className={styles.footerCta} href={BOOKING_URL}>Book a call</a></nav><p>Build better. Ship smarter.</p><p>© 2026 Uzair Khatri. All rights reserved.</p></footer>
  </div>;
}
