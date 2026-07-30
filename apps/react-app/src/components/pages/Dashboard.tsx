import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";


// ─── Code Editor Animation ────────────────────────────────────────────────────
const CODE_LINES = [
  { text: "function twoSum(nums, target) {", indent: 0, color: "#c792ea" },
  { text: "  const map = new Map();", indent: 1, color: "#82aaff" },
  { text: "  for (let i = 0; i < nums.length; i++) {", indent: 1, color: "#c792ea" },
  { text: "    const diff = target - nums[i];", indent: 2, color: "#82aaff" },
  { text: "    if (map.has(diff)) {", indent: 2, color: "#c792ea" },
  { text: "      return [map.get(diff), i];", indent: 3, color: "#c3e88d" },
  { text: "    }", indent: 2, color: "#c792ea" },
  { text: "    map.set(nums[i], i);", indent: 2, color: "#82aaff" },
  { text: "  }", indent: 1, color: "#c792ea" },
  { text: "  return [];", indent: 1, color: "#c3e88d" },
  { text: "}", indent: 0, color: "#c792ea" },
];

function TypewriterLine({
  text,
  color,
  delay,
}: {
  text: string;
  color: string;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span style={{ color, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-pulse" style={{ color: "#fff", opacity: 0.7 }}>
          |
        </span>
      )}
    </span>
  );
}

function CodeEditorAnimation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (inView) setKey((k) => k + 1);
  }, [inView]);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0d1117",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#161b22",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span
            style={{
              marginLeft: 10,
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "monospace",
            }}
          >
            two-sum.js
          </span>
        </div>

        {/* Code */}
        <div style={{ padding: "20px 24px", lineHeight: 1.85 }}>
          {CODE_LINES.map((line, i) => (
            <div key={`${key}-${i}`} style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span style={{ color: "rgba(255,255,255,0.2)", userSelect: "none", minWidth: 16, textAlign: "right" }}>
                {i + 1}
              </span>
              {inView && (
                <TypewriterLine
                  text={line.text}
                  color={line.color}
                  delay={i * 220}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Sheet Animation ──────────────────────────────────────────────────────────
const SHEET_ROWS = [
  { topic: "Arrays & Hashing", total: 9, done: 9 },
  { topic: "Two Pointers", total: 5, done: 4 },
  { topic: "Sliding Window", total: 6, done: 2 },
  { topic: "Binary Search", total: 7, done: 6 },
  { topic: "Linked Lists", total: 11, done: 3 },
  { topic: "Trees", total: 15, done: 0 },
];

function SheetRow({ topic, total, done, rowDelay }: { topic: string; total: number; done: number; rowDelay: number }) {
  const pct = Math.round((done / total) * 100);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: rowDelay, ease: "easeOut" }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 60px 120px 40px",
        alignItems: "center",
        gap: 16,
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{topic}</span>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textAlign: "right" }}>
        {done}/{total}
      </span>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.7, delay: rowDelay + 0.2, ease: "easeOut" }}
          style={{
            height: "100%",
            background: pct === 100 ? "#4ade80" : "#818cf8",
            borderRadius: 99,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          color: pct === 100 ? "#4ade80" : "rgba(255,255,255,0.3)",
          textAlign: "right",
        }}
      >
        {pct}%
      </span>
    </motion.div>
  );
}

function SheetAnimation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "#0d1117",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {/* Sheet header */}
        <div
          style={{
            padding: "14px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#161b22",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
            DSA SHEET · NEETCODE 150
          </span>
          <span style={{ fontSize: 12, color: "#818cf8" }}>24 / 150 solved</span>
        </div>

        {/* Rows */}
        <div style={{ padding: "4px 24px 12px" }}>
          {SHEET_ROWS.map((row, i) => (
            <SheetRow key={row.topic} {...row} rowDelay={i * 0.09} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.3)",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div
      style={{
        background: "#060810",
        color: "#fff",
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
      className="h-fit"
    >
      {/* Subtle radial glow behind hero */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 420,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(129,140,248,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        {/* ── Hero ── */}
        <div
          style={{
            textAlign: "center",
            paddingTop: "clamp(80px, 14vh, 140px)",
            paddingBottom: "clamp(60px, 10vh, 100px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(129,140,248,0.1)",
              border: "1px solid rgba(129,140,248,0.2)",
              borderRadius: 99,
              padding: "5px 14px",
              fontSize: 12,
              color: "#a5b4fc",
              marginBottom: 32,
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#818cf8",
                display: "inline-block",
              }}
            />
            DSA Practice Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: "clamp(38px, 6vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              margin: 0,
              marginBottom: 20,
            }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              keep going.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
              maxWidth: 420,
              margin: "0 auto 40px",
            }}
          >
            Master data structures one problem at a time. Your progress is right here.
          </motion.p>

        </div>

        {/* ── Code Editor ── */}
        <div style={{ marginBottom: 72 }}>
          <SectionLabel>Code Editor</SectionLabel>
          <CodeEditorAnimation />
        </div>

        {/* ── Sheet ── */}
        <div style={{ marginBottom: 96 }}>
          <SectionLabel>Customizable Sheet</SectionLabel>
          <SheetAnimation />
        </div>
      </div>
    </div>
  );
}

// ─── Wrapper ──────────────────────────────────────────────────────────────────
function DashboardFallback() {
  return (
    <div style={{ padding: 40, textAlign: "center", color: "#fff" }}>
      Something went wrong loading the dashboard.
    </div>
  );
}

export default function DashboardWrapper() {
  return (
    // @ts-ignore
    <ErrorBoundary FallbackComponent={DashboardFallback}>
      <Dashboard />
    </ErrorBoundary>
  );
}