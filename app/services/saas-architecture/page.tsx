import type { Metadata } from "next";
import FeaturedLanding from "@/components/FeaturedLanding";
import { BOOKING_URL, withBasePath } from "@/components/siteLinks";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const image = "https://uzairkhatri.com/linkedin-featured/services.png?v=20260921";

export const metadata: Metadata = {
  title: "SaaS Architecture & Distributed Systems Engineering",
  description:
    "Production SaaS application architecture, Redis Redlock distributed locks, idempotent financial ledgers, Stripe Connect integrations, and scalable cloud microservices by Uzair Khatri.",
  alternates: {
    canonical: "https://uzairkhatri.com/services/saas-architecture/",
  },
  openGraph: {
    title: "Scalable SaaS Architecture Built for Data Safety",
    description: "Multi-tenant backends, Redis Redlock concurrency mutexes, and automated Stripe financial ledgers.",
    url: "https://uzairkhatri.com/services/saas-architecture/",
    images: [{ url: image, width: 1734, height: 907 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scalable SaaS Architecture Built for Data Safety",
    description: "Multi-tenant backends, Redis Redlock concurrency mutexes, and automated Stripe financial ledgers.",
    images: [image],
  },
};

export default function SaasArchitectureServicePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://uzairkhatri.com/" },
          { name: "Services", url: "https://uzairkhatri.com/services/ai-systems/" },
          { name: "SaaS & Systems Architecture", url: "https://uzairkhatri.com/services/saas-architecture/" },
        ]}
      />
      <FeaturedLanding
        eyebrow="SaaS Platform & Distributed Systems"
        title={<>Scalable SaaS backends built for <em>strict concurrency & data safety.</em></>}
        intro="I architect multi-tenant SaaS platforms, distributed concurrency locks, idempotent financial transaction ledgers, and high-throughput cloud microservices that eliminate race conditions, double-spend vulnerabilities, and database deadlocks."
        proof="Architect of ClassFlow (Redis Redlock instructor matchmaking, Stripe Connect ledgers) and Savyour (100+ partner high-concurrency cashback ledger with cached balance retrieval)."
        primaryLabel="Discuss SaaS Architecture"
        primaryHref={BOOKING_URL}
        secondaryLabel="Read ClassFlow Case Study"
        secondaryHref={withBasePath("/work/classflow/")}
        stats={[
          { value: "100%", label: "Ledger reconciliation accuracy across double-entry transactions" },
          { value: "<100ms", label: "Dynamic matchmaking & distributed lock resolution" },
          { value: "100+", label: "High-throughput affiliate & e-commerce partner integrations" },
        ]}
        sectionEyebrow="SaaS Engineering Deliverables"
        sectionTitle="Eliminating race conditions, ledger drift, and scale bottlenecks."
        sectionIntro="Every SaaS architecture I build prioritizes strict data integrity, fault-tolerant worker pipelines, and predictable operating costs."
        cards={[
          {
            eyebrow: "01 / Concurrency Safety",
            title: "Redis Redlock & Distributed Mutexes",
            text: "Preventing double-booking and concurrent state corruption across distributed instances with millisecond lease expiration, Redlock consensus, and auto-extending locks.",
          },
          {
            eyebrow: "02 / Financial Ledgers",
            title: "Double-Entry Accounting & Stripe Connect",
            text: "Idempotent webhook processing via HMAC keys, transactional outbox patterns, automated dispute workflows, and sub-cent payout balance reconciliation.",
          },
          {
            eyebrow: "03 / Database Scaling",
            title: "PostgreSQL Isolation & Query Optimization",
            text: "Connection pooling via PgBouncer, read-replica routing, selective Redis cache warming, and zero-downtime database migration strategies under live traffic.",
          },
          {
            eyebrow: "04 / Async Workers",
            title: "Celery/SQS Background Job Pipelines",
            text: "Decoupling long-running API tasks, exponential retry backoff with dead-letter queue monitoring, and queue prioritization during high-volume traffic spikes.",
          },
        ]}
        stepsEyebrow="Architecture Engagement Path"
        stepsTitle="From concurrency bottlenecks to an unbreakable SaaS backbone."
        steps={[
          {
            number: "01",
            title: "Concurrency & Data Flow Audit",
            text: "Inspect critical write paths, race condition hazards, and third-party webhook failure modes across your stack.",
          },
          {
            number: "02",
            title: "Distributed Locking & Ledger Architecture",
            text: "Implement Redis Redlock mutexes, ACID database transaction boundaries, and idempotent webhook receivers.",
          },
          {
            number: "03",
            title: "Caching & Worker Decoupling",
            text: "Configure hierarchical Redis caching, Celery/SQS asynchronous queue pipelines, and auto-scaling triggers.",
          },
          {
            number: "04",
            title: "Stress Testing & Operational Handoff",
            text: "Execute high-concurrency load testing (k6/Locust), set up Datadog/CloudWatch alerts, and train your engineering team.",
          },
        ]}
        closingTitle="Scaling your SaaS beyond the limits of basic MVC?"
        closingText="In 30 minutes, let’s identify your highest concurrency risks and architect an unbreakable backend for your next stage of growth."
      />
    </>
  );
}
