<p align="center">
  <img src="./assets/profile-hero.svg" alt="Uzair Khatri — Production AI Systems Architect" width="100%" />
</p>

<p align="center">
  <a href="https://uzairkhatri.com"><img src="https://img.shields.io/badge/Website-uzairkhatri.com-0052cc?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" /></a>
  <a href="https://uzairkhatri.com/case-studies/"><img src="https://img.shields.io/badge/Selected_Work-Case_Studies-10b981?style=for-the-badge&logo=buffer&logoColor=white" alt="Case Studies" /></a>
  <a href="https://www.linkedin.com/in/uzair-khatri/"><img src="https://img.shields.io/badge/LinkedIn-Uzair_Khatri-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://calendly.com/uz-khatri/30min"><img src="https://img.shields.io/badge/Book_Call-30_Min_Strategy-f97316?style=for-the-badge&logo=calendly&logoColor=white" alt="Book a Strategy Call" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Available_for_Global_Advisory_%26_Architecture_Contracts-22c55e?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Focus-Enterprise_AI_%7C_Production_RAG_%7C_Multi--Agent_Systems-3b82f6?style=flat-square" alt="Focus" />
</p>

---

### ⚡ Production Scale & Impact

| Metric | Engineering Proof |
| :--- | :--- |
| **14+ Years** | Designing fault-tolerant distributed backends, fintech ledgers, and enterprise architectures |
| **1M+ Customers** | Scaled core ledger and merchant settlement APIs processing 5,000+ daily transactions (*Savyour*) |
| **10K+ / Month** | Multi-agent autonomous content and remediation pipeline orchestrated via LangGraph (*Wellows*) |
| **800ms → 120ms** | API latency reduction achieved through async refactoring, Redis caching, and SQS queue isolation |
| **<200ms Vector SLA** | Hybrid dense/sparse vector retrieval layer built on Qdrant with zero-evidence abstention guards |

---

## 🛠️ Featured Open-Source Architectures

<table>
<tr>
<td width="50%" valign="top">

### 🔍 [Production RAG Reference](https://github.com/uzairkhatri/production-rag-reference)
*FastAPI reference architecture for RAG systems that can be measured, evaluated, and operated with confidence.*

```text
Document Ingestion ──> Word Chunking ──> Hybrid Retrieval (BM25 + Vector)
                                                    │
Context Selection <── Lexical Reranker <────────────┘
        │
Value Evidence Guard ──> Answer Generation + Grounded Citations + UUID Trace
```

**Key Engineering Capabilities:**
* **Measurable Quality:** Recall@5 (**0.9444**) and MRR (**0.9167**) regression floors enforced in CI.
* **Deterministic Guardrails:** Value-presence verification rejects hallucinated metrics, versions, and prices before hitting generator endpoints.
* **Provider Independence:** Swappable interfaces across offline local execution and OpenAI/Claude.

👉 [**Explore Repository →**](https://github.com/uzairkhatri/production-rag-reference) · [Live Architecture Walkthrough](https://uzairkhatri.com/work/production-rag/)

</td>
<td width="50%" valign="top">

### 🛡️ [Production AI Readiness](https://github.com/uzairkhatri/production-ai-readiness)
*Deterministic Python CLI that catches enterprise AI and LLM risks before code merges.*

```text
git diff / codebase
        │
[Audit Engine: 8 Quality Dimensions]
        │
├── Evaluation & RAG Quality
├── Guardrails & PII Sanitization
├── Observability & Trace IDs
└── Reliability & Cost Limits
        │
PR Gate Block / SARIF / JSON / Markdown Report
```

**Key Engineering Capabilities:**
* **8 Critical Dimensions:** Evaluates test coverage, prompt injection defenses, token budget ceilings, and human-in-the-loop gates.
* **CI/CD Integration:** Runs as a native GitHub Actions PR gate with SARIF security reporting.
* **Audit Transparency:** Generates audit-ready evidence for enterprise security and compliance.

👉 [**Explore Repository →**](https://github.com/uzairkhatri/production-ai-readiness) · [AI Architecture Audit Service](https://uzairkhatri.com/services/ai-audit/)

</td>
</tr>
<tr>
<td colspan="2" valign="top">

### 🤖 [FastAPI AI Engineering Team](https://github.com/uzairkhatri/fastapi-ai-team)
*Your AI-powered FastAPI engineering team: 11 specialized autonomous agents and 7 architectural skills taking specifications to production-ready pull requests.*

`Multi-Agent Orchestration` · `LangGraph State Machines` · `Automated Pre-PR Security Gates` · `Async Job Queues`

👉 [**Explore Repository →**](https://github.com/uzairkhatri/fastapi-ai-team)

</td>
</tr>
</table>

---

## 💻 Production Tech Stack

<div align="left">

#### AI & Agentic Systems
<p>
  <img src="https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langchain&logoColor=white" alt="LangGraph" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white" alt="LangChain" />
  <img src="https://img.shields.io/badge/OpenAI_APIs-412991?style=flat-square&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Anthropic_Claude-D97757?style=flat-square&logo=anthropic&logoColor=white" alt="Anthropic" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75C2?style=flat-square&logo=googlegemini&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Qdrant-DC2626?style=flat-square&logo=qdrant&logoColor=white" alt="Qdrant Vector DB" />
  <img src="https://img.shields.io/badge/Hybrid_Search_(BM25)-0284C7?style=flat-square" alt="Hybrid Search" />
  <img src="https://img.shields.io/badge/LlamaGuard-0668E1?style=flat-square&logo=meta&logoColor=white" alt="LlamaGuard" />
  <img src="https://img.shields.io/badge/LangSmith-000000?style=flat-square&logo=langchain&logoColor=white" alt="LangSmith" />
  <img src="https://img.shields.io/badge/Arize_Phoenix-FF6B6B?style=flat-square" alt="Arize" />
</p>

#### Distributed Systems & Backend
<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Java_Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Redis_Redlock-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/AWS_SQS-FF4F8B?style=flat-square&logo=amazonsqs&logoColor=white" alt="AWS SQS" />
  <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
</p>

#### Cloud, DevOps & Security
<p>
  <img src="https://img.shields.io/badge/AWS_(ECS_/_Lambda_/_Bedrock)-232F3E?style=flat-square&logo=amazonwebservices&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/Terraform-844FBA?style=flat-square&logo=terraform&logoColor=white" alt="Terraform" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <img src="https://img.shields.io/badge/CloudWatch-FF4F8B?style=flat-square&logo=amazoncloudwatch&logoColor=white" alt="CloudWatch" />
  <img src="https://img.shields.io/badge/RBAC_%26_PII_Encryption-059669?style=flat-square" alt="Security" />
</p>

</div>

---

## 🏛️ Selected Enterprise Case Studies

| Client / Product | Domain | Engineering Highlights | Case Study |
| :--- | :--- | :--- | :---: |
| **Wellows** | AI Search Visibility Platform | Multi-agent architecture (LangGraph + Qdrant) automating LLM citation scoring & content remediation at 10K+ articles/month. | [Read Case Study →](https://uzairkhatri.com/work/wellows/) |
| **Savyour** | High-Throughput Fintech | Decomposed monolith into 12 microservices, built distributed ledger balancing, and merchant settlement APIs for 1M+ users. | [Read Case Study →](https://uzairkhatri.com/work/savyour/) |
| **EFU Life** | Regulated Insurance Workflow | Transformed manual paper-heavy approval chains into audited IBM FileNet + Spring Boot digital workflow services. | [Read Case Study →](https://uzairkhatri.com/work/efu-life/) |
| **ClassFlow** | Live Marketplace SaaS | Concurrency-safe tutor matching (<100ms) with Redis Redlock distributed mutexes and automated Stripe Connect payouts. | [Read Case Study →](https://uzairkhatri.com/work/classflow/) |

---

<div align="center">

## 🤝 Let's Build Production-Grade Systems

If an AI prototype needs to become an enterprise-grade production system—or an existing RAG or multi-agent pipeline suffers from hallucinations, high latency, or unreliable state—let's connect.

<p align="center">
  <a href="https://calendly.com/uz-khatri/30min"><img src="https://img.shields.io/badge/Book_Strategy_Call-30_Min_Review-ea580c?style=for-the-badge&logo=calendly&logoColor=white" alt="Book Strategy Call" /></a>
  <a href="https://uzairkhatri.com/case-studies/"><img src="https://img.shields.io/badge/View_Full_Portfolio-uzairkhatri.com-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="View Portfolio" /></a>
  <a href="mailto:hello@uzairkhatri.com"><img src="https://img.shields.io/badge/Email_Me-hello@uzairkhatri.com-059669?style=for-the-badge&logo=gmail&logoColor=white" alt="Email Me" /></a>
</p>

**Production AI · Agentic Runtimes · Grounded RAG · High-Throughput Distributed Systems**

</div>
