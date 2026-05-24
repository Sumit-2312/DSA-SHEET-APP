import React, { useRef, useState, useCallback, useEffect } from "react";
import CodeEditorWrapper from "./code-editor";

interface IOExample {
  input: string;
  output: string;
}

interface Problem {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  statement: string;
  examples: IOExample[];
  constraints?: string[];
  tags?: string[];
}

interface ProblemEditorLayoutProps {
  problem: Problem;
}

const MIN_LEFT_PCT = 20;
const MAX_LEFT_PCT = 75;
const DEFAULT_LEFT = 40;

const DIFF_STYLES = {
  Easy: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/40",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.35)]"
  },
  Medium: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/40",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.35)]"
  },
  Hard: {
    text: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/40",
    glow: "shadow-[0_0_12px_rgba(251,113,133,0.35)]"
  }
};



export default function ProblemEditorLayout({
  problem
}: ProblemEditorLayoutProps) {
  const [leftPct, setLeftPct] = useState(DEFAULT_LEFT);
  const [dragging, setDragging] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "description" | "examples"
  >("description");

  const containerRef = useRef<HTMLDivElement>(null);

  const diff = DIFF_STYLES[problem.difficulty];

  const onDividerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setDragging(true);
    },
    []
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, width } =
        containerRef.current.getBoundingClientRect();

      const pct = ((e.clientX - left) / width) * 100;

      setLeftPct(
        Math.max(
          MIN_LEFT_PCT,
          Math.min(MAX_LEFT_PCT, pct)
        )
      );
    };

    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#080c14] text-slate-100 overflow-hidden font-['Syne',sans-serif]">

      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .problem-content code{
          background:rgba(30,41,59,.7);
          border:1px solid rgba(51,65,85,.5);
          padding:2px 6px;
          border-radius:6px;
          color:#7dd3fc;
          font-family:'JetBrains Mono', monospace;
        }

        .problem-content strong{
          color:white;
          font-weight:700;
        }

        .hide-scrollbar::-webkit-scrollbar{
          display:none;
        }

        .hide-scrollbar{
          -ms-overflow-style:none;
          scrollbar-width:none;
        }
      `}
      </style>

      <div
        ref={containerRef}
        className="flex flex-1 overflow-hidden relative"
      >

        {/* LEFT */}

        <div
          className="flex-shrink-0 flex flex-col overflow-y-scroll pb-20 hide-scrollbar bg-[#0d1525] border-r border-slate-700/40"
          style={{ width: `${leftPct}%` }}
        >
          {/* Tabs */}
          <div className="flex-shrink-0 flex px-5 border-b border-slate-700/40 bg-[#0d1525]">

            {(["description", "examples"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 mr-5 text-[11px] font-bold tracking-[0.5px] uppercase border-b-2 transition-colors duration-150 bg-transparent cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-400 border-blue-400"
                      : "text-slate-500 border-transparent hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              )
            )}

          </div>

          {/* Content */}

          <div className="flex-1 hide-scrollbar overflow-y-auto px-6 py-6 pb-10">

            {activeTab === "description" && (
              <>

                {/* Title */}

                <h1 className="text-xl font-extrabold tracking-tight text-slate-100 mb-4 font-font2">
                  {problem.title}
                </h1>

                {/* Difficulty */}

                <div className={`inline-flex items-center px-3 py-1 rounded-md border text-[11px] font-bold mb-5 ${diff.text} ${diff.bg} ${diff.border} ${diff.glow}`}>
                  {problem.difficulty}
                </div>

                {/* Statement */}

                <div
                  className="problem-content text-[14px] leading-[1.8] text-slate-400 mb-7 font-serif"
                  dangerouslySetInnerHTML={{
                    __html: problem.statement
                  }}
                />

                {/* Examples */}

                <IOSection examples={problem.examples} />

                {/* Constraints */}

                {problem.constraints &&
                  problem.constraints.length > 0 && (

                  <div className="mt-6">

                    <SectionHeading>
                      Constraints
                    </SectionHeading>

                    <div className="flex flex-col gap-1.5 mt-3">

                      {problem.constraints.map(
                        (c, i) => (

                        <div
                          key={i}
                          className="font-['JetBrains_Mono',monospace] text-[12px] text-slate-300 px-3 py-1.5 bg-slate-800/50 border-l-2 border-blue-500 rounded-r-md leading-relaxed"
                        >
                          {c}
                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </>
            )}

            {activeTab === "examples" && (
              <>
                <div className="mt-3">
                  <IOSection
                    examples={problem.examples}
                  />
                </div>
              </>
            )}

          </div>

        </div>

        {/* Divider */}

        <div
          onMouseDown={onDividerMouseDown}
          className={`flex-shrink-0 w-[5px] flex items-center justify-center cursor-col-resize z-10 transition-colors duration-150 group ${
            dragging
              ? "bg-blue-500"
              : "bg-slate-700/50 hover:bg-blue-500"
          }`}
        >

          <div className="flex flex-col items-center gap-1 pointer-events-none">

            {[0,1,2].map((i)=>(
              <div
                key={i}
                className="w-[3px] h-[3px] rounded-full bg-white/25 group-hover:bg-white/50 transition-colors"
              />
            ))}

          </div>

        </div>

        {/* Right */}

        <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
          <CodeEditorWrapper />
        </div>

      </div>

    </div>
  );
}

function SectionHeading({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold tracking-[1.2px] uppercase text-slate-500">
      {children}
      <div className="flex-1 h-px bg-slate-700/50"/>
    </div>
  );
}

function IOSection({
  examples
}: {
  examples: IOExample[];
}) {

  const DOT_COLORS = [
    "bg-blue-400",
    "bg-violet-400",
    "bg-cyan-400"
  ];

  return (
    <>
      <SectionHeading>
        Examples
      </SectionHeading>

      <div className="flex flex-col gap-3 mt-3">

        {examples.map((ex, idx)=>(

          <div
            key={idx}
            className="rounded-lg border border-slate-700/50 overflow-hidden bg-slate-800/30 hover:border-slate-600/60 transition-colors duration-150"
          >

            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.025] border-b border-slate-700/40">

              <div className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[idx % DOT_COLORS.length]}`}/>

              <span className="text-[10px] font-bold tracking-[1px] uppercase text-slate-500">
                Example {idx+1}
              </span>

            </div>

            <div className="grid grid-cols-2">

              <div className="px-3.5 py-3">
                <div className="text-[9px] font-bold tracking-[1px] uppercase text-slate-500 mb-1.5">
                  Input
                </div>

                <pre className="font-['JetBrains_Mono',monospace] text-[12.5px] text-slate-100 whitespace-pre-wrap break-all leading-relaxed">
                  {ex.input}
                </pre>
              </div>

              <div className="px-3.5 py-3 border-l border-slate-700/40">

                <div className="text-[9px] font-bold tracking-[1px] uppercase text-slate-500 mb-1.5">
                  Output
                </div>

                <pre className="font-['JetBrains_Mono',monospace] text-[12.5px] text-slate-100 whitespace-pre-wrap break-all leading-relaxed">
                  {ex.output}
                </pre>

              </div>

            </div>

          </div>

        ))}

      </div>
    </>
  );
}