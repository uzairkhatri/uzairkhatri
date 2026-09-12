export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://uzairkhatri.com/#person",
    "name": "Uzair Khatri",
    "alternateName": ["Uzair Iqbal", "Uzair Iqbal Khatri"],
    "jobTitle": "Principal AI Systems Architect & Full-Stack SaaS Engineer",
    "url": "https://uzairkhatri.com",
    "image": "https://uzairkhatri.com/img/profile/hero-portrait.png",
    "email": "mailto:hello@uzairkhatri.com",
    "sameAs": [
      "https://www.linkedin.com/in/uzair-khatri",
      "https://github.com/UzairKhatri"
    ],
    "knowsAbout": [
      "AI Services",
      "Artificial Intelligence Architecture",
      "Agentic AI Workflows",
      "LangGraph StateGraph Orchestration",
      "Web Development",
      "Next.js App Router & React 19",
      "SaaS Applications & Multi-Tenant Systems",
      "Retrieval-Augmented Generation (RAG)",
      "FastAPI & Python Microservices",
      "Redis Distributed Mutex & Locks (Redlock)",
      "Stripe Connect & Payout Ledgers",
      "Amazon Web Services (AWS)",
      "PostgreSQL & Database Scaling"
    ],
    "description": "Uzair Khatri is an AI Systems Architect and SaaS Engineer specializing in enterprise AI services, multi-agent workflows, full-stack web development, and cloud-native backends."
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://uzairkhatri.com/#service",
    "name": "Uzair Khatri — AI Systems Architecture & SaaS Engineering",
    "url": "https://uzairkhatri.com",
    "image": "https://uzairkhatri.com/img/profile/hero-portrait.png",
    "telephone": "+923000000000",
    "email": "hello@uzairkhatri.com",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8607",
      "longitude": "67.0011"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Core Architecture & Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Services & Production Systems",
            "description": "Architecting resilient multi-agent runtimes, vector search retrieval layers (RAG), deterministic guardrails, LLM failovers, and latency optimization."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Autonomous AI Workflows",
            "description": "Designing state-machine orchestration using LangGraph, Celery/Redis queues, asynchronous event buses, and human-in-the-loop review boundaries."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SaaS Applications & Cloud Backends",
            "description": "Building multi-tenant SaaS platforms, payment ledgers with Stripe Connect, distributed lock safety with Redis Redlock, and cloud-native microservices."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Performance Web Development",
            "description": "Engineering modern Next.js 15 web applications with React 19, TypeScript, edge rendering, 3D Canvas visualizers, and sub-50ms global delivery."
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What AI services does Uzair Khatri provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uzair Khatri provides production-grade AI services including multi-agent runtime architecture (LangGraph), hybrid vector search & retrieval (RAG), deterministic guardrails, model failover strategies (OpenAI, Claude via AWS Bedrock), token cost control, and enterprise LLM observability."
        }
      },
      {
        "@type": "Question",
        "name": "How does Uzair Khatri build and scale SaaS applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uzair architects SaaS applications with rock-solid data integrity, utilizing distributed locks (Redis Redlock) for concurrency safety, asynchronous worker queues (Celery/SQS), relational database optimization in PostgreSQL, and automated Stripe ledger reconciliation."
        }
      },
      {
        "@type": "Question",
        "name": "What web development technologies and frameworks are used?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For web development, Uzair utilizes Next.js (App Router, Server Components), TypeScript, React 19, Tailwind CSS / Vanilla CSS Modules, Three.js / React Three Fiber for interactive 3D elements, and Cloudflare / AWS edge infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "What are agentic AI workflows and why are they necessary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI workflows coordinate specialized autonomous agents (such as retrieval, summarization, and citation agents) with explicit memory contracts, retry limits, and dead-letter queues, ensuring that failure in one agent does not crash the entire customer-facing application."
        }
      },
      {
        "@type": "Question",
        "name": "How can I hire or consult with Uzair Khatri for AI or web projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can schedule a 30-minute architecture review session via Calendly at https://calendly.com/uz-khatri/30min or email directly at hello@uzairkhatri.com."
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://uzairkhatri.com/#website",
    "url": "https://uzairkhatri.com",
    "name": "Uzair Khatri | AI Production Architect",
    "description": "Portfolio and architecture case studies of Uzair Khatri — AI Systems Architect, Full-Stack Web Developer, and SaaS Engineer.",
    "publisher": {
      "@id": "https://uzairkhatri.com/#person"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
