// Ping IndexNow API for instant search engine indexing (Bing, Yandex, Seznam, Naver)
const KEY = "85a92cfb19d44e83bf65882b7d29ae70";
const HOST = "uzairkhatri.com";

const urlList = [
  "https://uzairkhatri.com/",
  "https://uzairkhatri.com/services/ai-systems/",
  "https://uzairkhatri.com/services/ai-agents/",
  "https://uzairkhatri.com/services/saas-architecture/",
  "https://uzairkhatri.com/services/ai-audit/",
  "https://uzairkhatri.com/audit/",
  "https://uzairkhatri.com/work/production-rag/",
  "https://uzairkhatri.com/work/wellows/",
  "https://uzairkhatri.com/work/classflow/",
  "https://uzairkhatri.com/work/savyour/",
  "https://uzairkhatri.com/work/efu-life/",
  "https://uzairkhatri.com/case-studies/",
  "https://uzairkhatri.com/book/",
  "https://uzairkhatri.com/strategy-call/",
  "https://uzairkhatri.com/ai-playbook/",
  "https://uzairkhatri.com/insights/",
  "https://uzairkhatri.com/insights/production-ai-architecture/",
  "https://uzairkhatri.com/insights/ai-agent-guardrails/",
  "https://uzairkhatri.com/insights/rag-production-checklist/",
  "https://uzairkhatri.com/insights/ai-agent-evaluation/",
];

async function pingIndexNow() {
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow Response: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log("✓ Successfully submitted URLs to IndexNow network!");
    } else {
      const text = await res.text();
      console.log(`Response text: ${text}`);
    }
  } catch (err) {
    console.error("IndexNow ping failed:", err);
  }
}

pingIndexNow();
