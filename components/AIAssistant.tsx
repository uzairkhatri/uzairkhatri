"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AIAssistant.module.css";
import { BOOKING_URL } from "./siteLinks";

type Message = {
  sender: "user" | "agent";
  text: string;
  isStreaming?: boolean;
};

const predefinedAnswers: Record<string, string> = {
  "what systems has uzair built?":
    "Uzair has architected several high-scale systems. Key deployments include Wellows (an AI Search Visibility platform running multi-agent search optimizations), ClassFlow (an agentic online learning engine handling real-time matchmaking and distributed Redis Redlocks), Savyour (a high-throughput affiliate reward ledger processing callback webhook traffic with database ACID transaction isolation), and enterprise digitization pipelines using IBM FileNet Case Manager clusters.",
  "how do you handle llm rate limits and costs?":
    "Uzair designs around failure boundaries: 1) Exponential retries with random jitter, 2) Redundant provider endpoints (e.g. AWS Bedrock Claude 3.5 fallback triggered immediately on OpenAI HTTP 429 timeouts), 3) Semantic local caching via Redis to bypass model calls for repeating agent queries, and 4) Dashboards tracing exact token expenditures and RTT context offsets.",
  "explain his ai architecture style.":
    "Uzair's core philosophy is 'Deterministic Orchestration'. He believes raw LLM models are unreliable for control flow. He orchestrates state using strict state machines (such as LangGraph stategraphs or custom event loops) with dedicated guardrails (LlamaGuard) and self-evaluating corrective judge nodes that retry queries when output confidence drops below threshold.",
  "is he open to contracts?":
    "Yes, Uzair is currently available for AI systems architecture advisory, contract engineering, and dedicated prototype-to-production launches. You can schedule a Free AI Architecture Review immediately using the booking link at the top or bottom of this page!",
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "I am Uzair's architecture agent, synced with his system logs and project indices. Ask me anything about his systems experience or select a telemetry query below.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, logs, isTyping]);

  const handleSuggest = (query: string) => {
    submitQuery(query);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitQuery(inputValue);
  };

  const submitQuery = (queryText: string) => {
    if (isTyping) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: queryText }]);
    setInputValue("");
    setIsTyping(true);
    setLogs([]);

    // Step 1: Simulate dynamic RAG/retrieval logs
    const retrievalLogs = [
      `[TRACE] Query: "${queryText}"`,
      "[INFO] Query parsed. Throttling checks cleared.",
      "[TRACE] Vector search: Scanning local portfolio index...",
      "[TRACE] Similarity matched index (confidence 0.94)",
      "[INFO] Context retrieved. Synthesizing response...",
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < retrievalLogs.length) {
        setLogs((prev) => [...prev, retrievalLogs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        
        // Find answer
        const cleanQuery = queryText.toLowerCase().trim().replace(/[?.]/g, "");
        let matchedAnswer = predefinedAnswers[cleanQuery];
        
        if (!matchedAnswer) {
          // Soft match keyword
          const keys = Object.keys(predefinedAnswers);
          const matchedKey = keys.find((key) => {
            const words = key.split(" ");
            return words.some((w) => w.length > 3 && cleanQuery.includes(w));
          });
          if (matchedKey) {
            matchedAnswer = predefinedAnswers[matchedKey];
          } else {
            matchedAnswer = `Interesting query. Uzair's system expertise focuses on LangGraph multi-agent pipelines, FastAPI async runtimes, Redis Redlocks, PostgreSQL ledger consistency, and scalable AWS configurations. For specialized system deep-dives, you can schedule a Free AI Architecture Review directly using the booking CTAs on the portfolio.`;
          }
        }

        // Add empty streaming agent message
        setMessages((prev) => [...prev, { sender: "agent", text: "", isStreaming: true }]);
        
        // Typewriter streaming effect
        let charIndex = 0;
        const typingInterval = setInterval(() => {
          if (charIndex < matchedAnswer.length) {
            const nextChar = matchedAnswer.substring(0, charIndex + 1);
            setMessages((prev) => {
              const updated = [...prev];
              const lastMsg = updated[updated.length - 1];
              if (lastMsg && lastMsg.sender === "agent") {
                lastMsg.text = nextChar;
              }
              return updated;
            });
            charIndex += 2; // Type two chars at a time for snappiness
          } else {
            clearInterval(typingInterval);
            setMessages((prev) => {
              const updated = [...prev];
              const lastMsg = updated[updated.length - 1];
              if (lastMsg) {
                lastMsg.isStreaming = false;
              }
              return updated;
            });
            setIsTyping(false);
            setLogs([]); // Clear logs for clean layout
          }
        }, 15);
      }
    }, 200);
  };

  return (
    <div className={styles.wrapper}>
      {/* Floating Button */}
      <button
        className={`${styles.launcher} ${isOpen ? styles.launcherActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Uzair AI"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <div className={styles.launcherIcon}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 25a11 11 0 1 1 11-11 11 11 0 0 1-11 11Z" fill="currentColor" />
              <path d="M14 11h4v2h-4zm-4 4h12v2H10zm4 4h4v2h-4z" fill="currentColor" />
            </svg>
            <span className={styles.launcherLabel}>Ask Uzair AI</span>
          </div>
        )}
      </button>

      {/* Chat Console Panel */}
      {isOpen && (
        <div className={styles.console} role="dialog" aria-label="Ask Uzair AI Console">
          <header className={styles.consoleHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.statusDot} />
              <strong>Ask Uzair AI</strong>
              <small>[ACTIVE] v1.02</small>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close panel">
              [x]
            </button>
          </header>

          <div className={styles.consoleBody}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.sender === "user" ? styles.msgUser : styles.msgAgent}`}>
                <span className={styles.msgBadge}>{msg.sender === "user" ? "[USER]" : "[AGENT]"}</span>
                <p className={styles.msgText}>{msg.text}</p>
              </div>
            ))}

            {/* Simulated live RAG search logs */}
            {logs.length > 0 && (
              <div className={styles.logTerminal}>
                {logs.map((log, index) => (
                  <div key={index} className={styles.logLine}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Typewriter cursor placeholder */}
            {isTyping && logs.length === 0 && (
              <div className={styles.messageAgentPlaceholder}>
                <span className={styles.msgBadge}>[AGENT]</span>
                <span className={styles.pulseCursor} />
              </div>
            )}

            <div ref={consoleEndRef} />
          </div>

          {/* Quick Query Options */}
          {!isTyping && (
            <div className={styles.suggestions}>
              <button onClick={() => handleSuggest("What systems has Uzair built?")}>
                📋 What systems has Uzair built?
              </button>
              <button onClick={() => handleSuggest("How do you handle LLM rate limits and costs?")}>
                ⚡ Failover & Costs?
              </button>
              <button onClick={() => handleSuggest("Explain his AI architecture style.")}>
                🧠 AI Architecture Style?
              </button>
              <button onClick={() => handleSuggest("Is he open to contracts?")}>
                💼 Open to contracts?
              </button>
            </div>
          )}

          {/* Submit form */}
          <form className={styles.consoleInputForm} onSubmit={handleFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              placeholder="Ask about AI platforms, LangGraph, scale..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className={styles.submitBtn} disabled={isTyping || !inputValue.trim()}>
              Send
            </button>
          </form>
          
          <div className={styles.consoleFooter}>
            <span>RAG agent synced with portfolio. Out-of-band execution.</span>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              Review Architecture
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
