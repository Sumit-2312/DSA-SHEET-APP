import React, { useRef, useState, useCallback, useEffect } from "react";
import CodeEditorWrapper from "./code-editor";
import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface IOExample {
  input: string;
  output: string;
}

type InputsType = IOExample[];

interface GetQuestionResponseType extends basicResponseType {
  Question?: Question;
}

const MIN_LEFT_PCT = 20;
const MAX_LEFT_PCT = 75;
const DEFAULT_LEFT = 40;

const DIFF_STYLES = {
  easy: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/40",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.35)]",
  },
  medium: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/40",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.35)]",
  },
  hard: {
    text: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/40",
    glow: "shadow-[0_0_12px_rgba(251,113,133,0.35)]",
  },
} as const;

// ── Inline markdown renderer ──────────────────────────────────────────────────
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="font-mono text-[12.5px] text-sky-300 bg-sky-400/10 border border-sky-400/20 rounded px-1.5 py-px"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// ── Block markdown renderer ───────────────────────────────────────────────────
function MarkdownRenderer({ raw }: { raw: string }) {
  if (!raw.trim()) return null;

  const lines = raw.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={`pre-${i}`}
          className="bg-black/40 border border-white/[0.06] rounded-xl px-4 py-3 my-3 overflow-x-auto"
        >
          <code className="font-mono text-[12.5px] text-sky-300 leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-[19px] font-extrabold text-white tracking-tight mb-3 mt-1"
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-[15px] font-bold text-indigo-400 mt-5 mb-2 pb-1.5 border-b border-indigo-500/20"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-4 mb-1.5"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={`hr-${i}`} className="border-t border-white/[0.07] my-4" />);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="border-l-[3px] border-indigo-500 bg-indigo-500/[0.07] rounded-r-lg px-4 py-2.5 my-2 text-indigo-300 text-[13px]"
        >
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Bullet list — collect consecutive items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 my-2 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-slate-400 text-[13.5px] leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list — collect consecutive items
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 my-2 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-slate-400 text-[13.5px] leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line → small spacer
    if (line.trim() === "") {
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="text-slate-400 text-[13.5px] leading-[1.85]">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ProblemEditorLayout() {
  const { id } = useParams();

  const [problem, setProblem] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [leftPct, setLeftPct] = useState(DEFAULT_LEFT);
  const [dragging, setDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "examples">("description");

  const containerRef = useRef<HTMLDivElement>(null);
  const diff = problem ? DIFF_STYLES[problem.difficulty] : DIFF_STYLES.easy;

  useEffect(() => {
    async function fetchQuestion() {
      if (!id) {
        toast.error("Invalid Question");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get<GetQuestionResponseType>(
          `${import.meta.env.VITE_BACKEND_URL}/sheet/customQuestion/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const data = response.data;
        if (!data.success) throw new Error(data.error || "Failed to fetch question");
        if (!data.Question) throw new Error("Question not found");
        setProblem(data.Question);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.error || err.message);
        } else {
          toast.error("Failed to fetch question");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, [id]);

  const onDividerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(true);
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.max(MIN_LEFT_PCT, Math.min(MAX_LEFT_PCT, pct)));
    }
    function onUp() {
      setDragging(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  if (loading) {
    return (
      <div className="h-screen bg-[#080c14] p-8 animate-pulse">
        <div className="h-7 w-64 rounded-lg bg-slate-800 mb-4" />
        <div className="h-5 w-20 rounded-md bg-slate-800 mb-8" />
        <div className="space-y-3">
          <div className="h-4 rounded bg-slate-800/80" />
          <div className="h-4 rounded bg-slate-800/80 w-[90%]" />
          <div className="h-4 rounded bg-slate-800/80 w-[75%]" />
        </div>
        <div className="mt-10 space-y-4">
          <div className="h-24 rounded-xl bg-slate-800/60" />
          <div className="h-24 rounded-xl bg-slate-800/60" />
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#080c14] text-slate-400 text-sm">
        Problem not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#080c14] text-slate-100 overflow-hidden">
      <div ref={containerRef} className="flex flex-1 overflow-hidden relative">

        {/* ── Left panel ── */}
        <div
          style={{ width: `${leftPct}%` }}
          className="pb-20 flex-shrink-0 flex flex-col overflow-hidden bg-[#0d1525] border-r border-slate-700/30"
        >
          {/* Tab bar */}
          <div className="flex px-6 border-b border-slate-700/30 bg-[#0b1120]">
            {(["description", "examples"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 mr-6 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors ${
                  activeTab === tab
                    ? "text-blue-400 border-blue-400"
                    : "text-slate-500 border-transparent hover:text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Scrollable body */}
          <div className="flex-1 hide-scrollbar overflow-y-auto px-7 py-7">
            {activeTab === "description" && (
              <div className="flex flex-col gap-5">

                {/* Title + badge */}
                <div className="flex flex-col gap-3">
                  <h1 className="text-[22px] font-extrabold tracking-tight text-white leading-tight">
                    {problem.title}
                  </h1>
                  <span
                    className={`self-start inline-flex items-center px-3 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wide ${diff.text} ${diff.bg} ${diff.border} ${diff.glow}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <div className="h-px bg-slate-700/30" />

                {/* Rendered markdown */}
                <MarkdownRenderer raw={problem.problemStatement ?? ""} />

                {(problem.inputs ?? []).length > 0 && (
                  <div className="h-px bg-slate-700/30" />
                )}

                {/* <IOSection examples={problem.inputs ?? []} /> */}
              </div>
            )}

            {activeTab === "examples" && (
              <IOSection examples={problem.inputs ?? []} />
            )}
          </div>
        </div>

        {/* ── Drag divider ── */}
        <div
          onMouseDown={onDividerMouseDown}
          className={`w-[5px] flex-shrink-0 cursor-col-resize transition-colors ${
            dragging
              ? "bg-blue-500"
              : "bg-slate-700/40 hover:bg-blue-500/60"
          }`}
        />

        {/* ── Right panel ── */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <CodeEditorWrapper />
        </div>

      </div>
    </div>
  );
}


// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">
      {children}
      <div className="flex-1 h-px bg-slate-700/40" />
    </div>
  );
}


// ── IO examples ───────────────────────────────────────────────────────────────
const DOT_COLORS = ["bg-blue-400", "bg-violet-400", "bg-cyan-400"];

function IOSection({ examples }: { examples: InputsType }) {
  if (!examples.length) {
    return <p className="text-slate-500 text-sm">No examples available.</p>;
  }

  return (
    <div>
      <SectionHeading>Examples</SectionHeading>

      <div className="flex flex-col gap-4">
        {examples.map((ex, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-700/40 overflow-hidden bg-slate-800/20"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-700/30 bg-slate-800/30">
              <div className={`w-2 h-2 rounded-full ${DOT_COLORS[idx % DOT_COLORS.length]}`} />
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Example {idx + 1}
              </span>
            </div>

            {/* Input / Output */}
            <div className="grid grid-cols-2 divide-x divide-slate-700/30">
              {[
                { label: "Input",  value: ex.input  },
                { label: "Output", value: ex.output },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-4">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-2">
                    {label}
                  </p>
                  <pre className="font-mono text-[13px] text-slate-200 whitespace-pre-wrap break-all leading-relaxed">
                    {value}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}