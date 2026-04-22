import { useRecoilState } from "recoil";
import TerminalInput from "../../../recoilstates/terminal/terminalInput";

import inputOrOutput from "../../../recoilstates/terminal/inputOrOutput";

type SelectedFieldType = "input" | "output";

interface TerminalProps {
  height: number;
  onDragStart: (e: React.MouseEvent) => void;
  output?: string;
}

function Terminal({ height, onDragStart, output }: TerminalProps) {
  const [input, setInput] = useRecoilState<string>(TerminalInput);
  const [selectedField, setSelectedField] = useRecoilState(inputOrOutput);
  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col bg-[#0a0e1a] border-t border-[#1e293b] overflow-hidden"
    >
      {/* Drag Handle */}
      <div
        onMouseDown={onDragStart}
        className="group h-[6px] flex-shrink-0 bg-[#0f172a] border-y border-[#1a2332] cursor-ns-resize flex items-center justify-center hover:bg-[#1e293b] transition-colors"
      >
        <div className="flex gap-[3px] opacity-30 group-hover:opacity-80 transition-opacity">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-slate-500"
            />
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-0 px-3 bg-[#0d1117] border-b border-[#1a2332] h-9 flex-shrink-0">
        {(["input", "output"] as SelectedFieldType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedField(tab)}
            className={`h-full px-3 flex items-center gap-1.5 text-[11px] uppercase tracking-widest border-b-2 transition-all ${
              selectedField === tab
                ? "text-cyan-400 border-cyan-400"
                : "text-slate-600 border-transparent hover:text-slate-400"
            }`}
          >
            {selectedField === tab && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            )}
            {tab}
          </button>
        ))}
        <div className="flex-1" />
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {selectedField === "input" ? (
          <div>
            <div className="text-slate-700 mb-1">──</div>
            <div className="flex items-center gap-0">
              <span className="text-cyan-400">$&nbsp;</span>
              <input
                className="flex-1 bg-transparent outline-none text-slate-200 caret-cyan-400 placeholder-slate-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="enter input..."
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <div className="text-slate-200 whitespace-pre-wrap">
            {output ? (
              <div>
                <div className="text-slate-500 text-[11px] mb-2">
                  ✓ Execution Output
                </div>
                <div>{output}</div>
              </div>
            ) : (
              <div className="mt-1 text-slate-600 text-[11px] tracking-wider">
                ✓ Waiting for run...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;