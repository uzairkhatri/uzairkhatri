# Uzair Khatri

### Production AI and Distributed Systems Architect

I design the systems around AI models: retrieval, orchestration, APIs, event processing, evaluation, observability, and the controls required to operate them reliably.

Over **14+ years**, I have worked across production AI, fintech, regulated enterprise workflows, and SaaS platforms. My public repositories turn those engineering patterns into runnable reference implementations.

[Portfolio](https://uzairkhatri.com) · [Case studies](https://uzairkhatri.com/case-studies/) · [LinkedIn](https://www.linkedin.com/in/uzair-khatri/) · [Email](mailto:hello@uzairkhatri.com)

---

## Areas of Focus

| Production AI | Distributed Platforms | Engineering Controls |
| :--- | :--- | :--- |
| Grounded RAG and retrieval evaluation | Event-driven services and workers | Observability and quality gates |
| Agent orchestration and state | Idempotency, retries, and DLQs | Security and failure-mode analysis |
| Guardrails and human approval | PostgreSQL, Redis, and Kafka | CI/CD, load testing, and ADRs |

## Selected Architectures

| Repository | Engineering proof |
| :--- | :--- |
| **[production-rag-reference](https://github.com/uzairkhatri/production-rag-reference)** | Hybrid retrieval, reranking, grounded citations, deterministic checks, and Recall@5/MRR regression gates |
| **[high-throughput-event-platform](https://github.com/uzairkhatri/high-throughput-event-platform)** | FastAPI ingestion, Kafka-compatible streams, partitioned workers, idempotency, bounded retries, DLQ, OpenTelemetry, Docker, and Kubernetes |
| **[production-ai-readiness](https://github.com/uzairkhatri/production-ai-readiness)** | Repository audit CLI covering evaluation, observability, guardrails, security, reliability, RAG quality, and cost controls |
| **[fastapi-ai-team](https://github.com/uzairkhatri/fastapi-ai-team)** | Multi-agent engineering workflow with specialized roles, structured handoffs, and verification stages |

Each project includes implementation, tests, CI, and architecture documentation. Performance claims are published only with reproducible methodology and environment details.

## Open Source

**OpenTelemetry Python Contrib**  
[PR #5111: trace per-cursor Psycopg2 factories](https://github.com/open-telemetry/opentelemetry-python-contrib/pull/5111)

The change fixes a real instrumentation gap, adds focused regression coverage and a changelog entry, and has completed the Linux Foundation CLA process. Status: **submitted upstream and awaiting maintainer review**.

## Selected Production Work

- **[Wellows](https://uzairkhatri.com/work/wellows/):** multi-agent workflows, retrieval, citation scoring, and production observability for an AI search visibility platform
- **[Savyour](https://uzairkhatri.com/work/savyour/):** distributed services, ledger workflows, partner APIs, and merchant settlement processing
- **[EFU Life](https://uzairkhatri.com/work/efu-life/):** auditable digital workflows and enterprise integrations in a regulated environment
- **[ClassFlow](https://uzairkhatri.com/work/classflow/):** concurrency control, Redis coordination, real-time matching, and payment workflows

## Core Stack

`Python` · `FastAPI` · `LangGraph` · `PostgreSQL` · `Redis` · `Kafka` · `OpenTelemetry` · `AWS` · `Docker` · `Kubernetes` · `Terraform` · `GitHub Actions`

## Working Principles

- Treat model output as untrusted until evaluated or verified.
- Design retries and idempotency together.
- Make operational failure visible before adding scale.
- Prefer measurable quality gates over demo-only claims.
- Document consequential decisions close to the code.

---

I am currently focused on production RAG, reliable agent runtimes, and high-throughput event systems.

**[View the portfolio](https://uzairkhatri.com)** · **[Review the case studies](https://uzairkhatri.com/case-studies/)** · **[Book an architecture call](https://calendly.com/uz-khatri/30min)**
