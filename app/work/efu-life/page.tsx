import type { Metadata } from "next";
import styles from "../wellows/page.module.css";
import SubPageNav from "@/components/SubPageNav";
import ProjectVisual from "@/components/ProjectVisual";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd, TechArticleJsonLd } from "@/components/JsonLd";
import CaseStudyAuditCTA from "@/components/CaseStudyAuditCTA";

const title = "EFU Life Case Study - Enterprise Document Workflow Architecture";
const description =
  "How Uzair Khatri implemented IBM FileNet P8, Capture, and Case Manager for EFU Life to move document-heavy insurance operations toward digital case routing.";
const url = "https://uzairkhatri.com/work/efu-life/";
const image = "https://uzairkhatri.com/linkedin-featured/case-studies.png?v=20260921";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    images: [{ url: image, width: 1734, height: 907, alt: "Enterprise architecture case studies" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const decisions = [
  {
    title: "Document capture and indexing",
    problem: "Physical policy documents had to become usable case records, not simply scanned files in another filing queue.",
    decision: "Implemented document ingestion using IBM Capture, with document metadata indexed in the FileNet P8 content repository.",
    consideration: "Capture and metadata form the entry boundary: downstream routing depends on a document being associated with the right case.",
  },
  {
    title: "Case routing and approval workflows",
    problem: "Paper-based handoffs made approval chains dependent on manual filing and movement between teams.",
    decision: "Implemented IBM Case Manager routing and FileNet approval workflows to move document-driven work into digital queues.",
    consideration: "Routing rules make operational responsibilities explicit. Changes to an approval process also need to be reflected in its workflow configuration.",
  },
  {
    title: "Access controls and audit history",
    problem: "Digitizing insurance records had to preserve controlled access and a traceable history of document changes.",
    decision: "Integrated Case Manager access controls with Active Directory / LDAP and included document audit logging in the architecture.",
    consideration: "Digital availability and permission to view a record are separate concerns; access checks remain part of the case workflow.",
  },
  {
    title: "Repository and operational continuity",
    problem: "Case routing depends on the underlying policy documents remaining available to the teams processing them.",
    decision: "Used FileNet P8 as the content repository within an on-premise high-availability server architecture.",
    consideration: "Capture, routing, identity, and document storage remain distinct dependencies that must be operated together.",
  },
];

export default function EFULifeCaseStudy() {
  return (
    <div className={styles.page}>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://uzairkhatri.com/" },
        { name: "Case Studies", url: "https://uzairkhatri.com/case-studies/" },
        { name: "EFU Life Case Study", url },
      ]} />
      <TechArticleJsonLd title={title} description={description} url={url} image={image} />
      <SubPageNav />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroMeta}>
              <span className={styles.tag}>Enterprise Insurance</span>
              <span className={styles.tag}>Enterprise Architect</span>
            </div>
            <h1 className={styles.heroTitle}>EFU Life</h1>
            <p className={styles.heroSub}>Enterprise Document Workflow Architecture</p>
            <p className={styles.heroDesc}>
              I implemented IBM FileNet P8, Capture, and Case Manager to move
              document-heavy insurance operations from physical filing and manual
              handoffs toward digital case management and paperless delivery.
            </p>
          </div>
          <ProjectVisual type="efu" variant="hero" />
        </div>
      </header>

      <section className={styles.section} aria-labelledby="efu-problem">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Problem</p>
          <h2 id="efu-problem" className={styles.sectionTitle}>Paper files slowed the approval path.</h2>
          <div className={styles.prose}>
            <p>
              Insurance operations relied on physical documents and manual filing
              queues. Moving a case forward meant moving its supporting records
              through document-heavy approval chains.
            </p>
            <p>
              Scanning alone would not solve the workflow problem. Documents also
              needed metadata, a managed repository, and routing into the right
              operational queues.
            </p>
            <p>
              The architecture had to preserve controlled access, auditability,
              and continuity while shifting the work toward digital case handling.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="efu-architecture">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrowLight}>What I Architected</p>
          <h2 id="efu-architecture" className={styles.sectionTitleLight}>Capture, content, and case routing.</h2>
          <p className={styles.sectionDescLight}>
            My implementation connected document ingestion, FileNet storage, and
            Case Manager workflows, with identity and audit controls supporting
            the path from a scanned document to an assigned case.
          </p>
          <div className={styles.decisionGrid}>
            {decisions.map((item) => (
              <article className={styles.decisionCard} key={item.title}>
                <h3>{item.title}</h3>
                <div className={styles.decisionBlock}><span>Problem</span><p>{item.problem}</p></div>
                <div className={styles.decisionBlock}><span>Implementation</span><p>{item.decision}</p></div>
                <div className={styles.decisionBlock}><span>Operating consideration</span><p>{item.consideration}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="efu-outcome">
        <div className={styles.sectionInner}>
          <p className={styles.eyebrow}>Outcome</p>
          <h2 id="efu-outcome" className={styles.sectionTitle}>Approval work moved into digital workflows.</h2>
          <div className={styles.prose}>
            <p>
              Five IBM FileNet approval chains were automated, moving
              document-heavy insurance work from week-scale handoffs toward
              day-scale digital case routing.
            </p>
            <p>
              Document ingestion, repository storage, and Case Manager routing
              replaced manual filing queues with a connected digital path for
              case processing.
            </p>
            <p>
              Access controls and audit logging remained part of that path,
              supporting controlled document handling as operations moved toward
              paperless delivery.
            </p>
          </div>
          <p className={styles.diagramNote}>Public details summarized under mutual NDA.</p>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="efu-contact">
        <div className={styles.sectionInner}>
          <CaseStudyAuditCTA
            focusArea="Enterprise Workflow Modernization"
            title="Have a document or case workflow that needs modernizing?"
            description="Whether you're moving from manual queues to automated routing, or integrating OCR/LLM extraction into legacy backends, let's triage your system boundaries, access rules, and throughput bottlenecks."
          />
          <div className={styles.ctaActions} style={{ marginTop: "1.5rem" }}>
            <a className={styles.ctaSecondary} href={withBasePath("/case-studies/")}>All Case Studies &rarr;</a>
            <a className={styles.backWork} href={withBasePath("/#work")}>Back to Selected Work &rarr;</a>
          </div>
        </div>
      </section>
    </div>
  );
}
