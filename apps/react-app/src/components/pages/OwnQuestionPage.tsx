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
  easy: { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/40", glow: "shadow-[0_0_12px_rgba(52,211,153,0.35)]" },
  medium: { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/40", glow: "shadow-[0_0_12px_rgba(251,191,36,0.35)]" },
  hard: { text: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/40", glow: "shadow-[0_0_12px_rgba(251,113,133,0.35)]" }
} as const;

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
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data = response.data;

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch question");
        }

        if (!data.Question) {
          throw new Error("Question not found");
        }

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



  const onDividerMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);


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
    }

  }, [dragging]);


  if (loading) {
    return (
      <div className="h-screen bg-[#080c14] p-6 animate-pulse">

        <div className="h-8 w-[250px] rounded bg-slate-700 mb-5" />

        <div className="h-6 w-[100px] rounded bg-slate-700 mb-8" />

        <div className="space-y-3">
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 bg-slate-800 rounded" />
          <div className="h-4 w-[70%] bg-slate-800 rounded" />
        </div>

        <div className="mt-10 space-y-4">
          <div className="h-24 rounded-xl bg-slate-800" />
          <div className="h-24 rounded-xl bg-slate-800" />
        </div>

      </div>
    )
  }

  if (!problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#080c14] text-white">
        Problem not found
      </div>
    )
  }


  return (

    <div className="flex flex-col h-screen w-screen bg-[#080c14] text-slate-100 overflow-hidden">

      <div ref={containerRef} className="flex flex-1 overflow-hidden relative">

        <div style={{ width: `${leftPct}%` }} className="flex-shrink-0 flex flex-col overflow-hidden bg-[#0d1525] border-r border-slate-700/40">

          <div className="flex px-5 border-b border-slate-700/40">

            {(["description", "examples"] as const).map((tab) => (

              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 mr-5 text-[11px] font-bold uppercase border-b-2 ${activeTab === tab ? "text-blue-400 border-blue-400" : "text-slate-500 border-transparent"}`}>
                {tab}
              </button>

            ))}

          </div>


          <div className="flex-1 overflow-y-auto px-6 py-6">

            {activeTab === "description" && (
              <>

                <h1 className="text-xl font-extrabold mb-4">{problem.title}</h1>

                <div className={`inline-flex items-center px-3 py-1 rounded-md border text-[11px] font-bold mb-5 ${diff.text} ${diff.bg} ${diff.border} ${diff.glow}`}>
                  {problem.difficulty}
                </div>

                <div className="problem-content text-[14px] leading-[1.8] text-slate-400 mb-7" dangerouslySetInnerHTML={{ __html: problem.problemStatement ?? "" }} />

                <IOSection examples={problem.inputs ?? []} />

              </>
            )}

            {activeTab === "examples" && <IOSection examples={problem.inputs ?? []} />}

          </div>

        </div>

        <div onMouseDown={onDividerMouseDown} className={`w-[5px] cursor-col-resize ${dragging ? "bg-blue-500" : "bg-slate-700/50 hover:bg-blue-500"}`} />

        <div className="flex-1 min-w-0 overflow-hidden">
          <CodeEditorWrapper />
        </div>

      </div>

    </div>

  );
}


function SectionHeading({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-slate-500">
      {children}
      <div className="flex-1 h-px bg-slate-700/50" />
    </div>
  )

}



function IOSection({ examples }: { examples: InputsType }) {

  if (!examples.length) {
    return <div className="text-slate-500">No examples available</div>
  }

  const DOT_COLORS = ["bg-blue-400", "bg-violet-400", "bg-cyan-400"];

  return (
    <>

      <SectionHeading>
        Examples
      </SectionHeading>

      <div className="flex flex-col gap-3 mt-3">

        {examples.map((ex, idx) => (

          <div key={idx} className="rounded-lg border border-slate-700/50 overflow-hidden bg-slate-800/30">

            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700/40">

              <div className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[idx % DOT_COLORS.length]}`} />

              <span className="text-[10px] uppercase text-slate-500 font-bold">
                Example {idx + 1}
              </span>

            </div>

            <div className="grid grid-cols-2">

              <div className="px-4 py-3">

                <div className="text-[9px] uppercase mb-1 text-slate-500">
                  Input
                </div>

                <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                  {ex.input}
                </pre>

              </div>

              <div className="px-4 py-3 border-l border-slate-700/40">

                <div className="text-[9px] uppercase mb-1 text-slate-500">
                  Output
                </div>

                <pre className="font-mono text-sm whitespace-pre-wrap break-all">
                  {ex.output}
                </pre>

              </div>

            </div>

          </div>

        ))}

      </div>

    </>
  )

}