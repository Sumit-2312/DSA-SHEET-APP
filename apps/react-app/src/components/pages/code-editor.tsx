import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import codeState from "../../recoilstates/currentCode.js";
import currentCodeLanguageState from "../../recoilstates/currentCodeLanguage.js";
import { ChevronDown, RotateCcw } from "lucide-react";
import getSnippet from "../util-components/GetBasicSnippet.js";
import Terminal from "../util-components/Terminal.js";
import { ErrorBoundary } from "react-error-boundary";
import CodeEditorFallback from "../FallbackUI/Code-editor-fallback.js";

const LANGUAGES = ["javascript", "cpp", "java"];
const MIN_TERM_HEIGHT = 80;
const MAX_TERM_HEIGHT = 480;
const DEFAULT_TERM_HEIGHT = 160;


function CodeEditorWrapper(){
  return (
    //@ts-ignore
    <ErrorBoundary FallbackComponent={CodeEditorFallback}>
      <CodeEditor/>
    </ErrorBoundary>
  );
}

function CodeEditor() {
  const [code, setCode] = useRecoilState(codeState);
  const [language, setLanguage] = useRecoilState<string>(currentCodeLanguageState);
  const [basicSnippet, setBasicSnippet] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [snippetOpen, setSnippetOpen] = useState(false);
  const [termHeight, setTermHeight] = useState(DEFAULT_TERM_HEIGHT);
  const isDragging = useRef(false);
  const shellRef = useRef<HTMLDivElement>(null);

  const handleTyping = (value?: string) => {
    setTimeout(() => setCode(value || ""), 0);
  };

  useEffect(() => {
    function handle(){
      const snippet = getSnippet(language);
      setBasicSnippet(snippet);
      setCode(snippet);
    }
    handle();
  }, [language]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    e.preventDefault();

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !shellRef.current) return;
      const shellBottom = shellRef.current.getBoundingClientRect().bottom;
      const newHeight = shellBottom - ev.clientY;
      setTermHeight(Math.max(MIN_TERM_HEIGHT, Math.min(MAX_TERM_HEIGHT, newHeight)));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  const HEADER_H = 40; // px
  const editorHeight = `calc(100vh - ${HEADER_H}px - ${termHeight}px - 6px)`; // 6px = drag handle

  return (
    <div ref={shellRef} className="flex flex-col h-screen w-screen bg-[#0f172a] text-white overflow-hidden">

      {/* Header */}
      <div className="h-10 flex-shrink-0 flex items-center justify-between px-4 bg-[#1e293b] border-b border-slate-700">
        <h1 className="text-sm font-medium tracking-wide text-slate-300">Code Editor</h1>

        <div className="flex items-center gap-2 text-sm">

          {/* Language Dropdown */}
          <div
            onClick={() => setLanguageOpen((p) => !p)}
            className="relative flex items-center gap-1 px-2 py-1 rounded bg-[#0f172a] border border-slate-700 text-slate-400 hover:bg-slate-800 cursor-pointer select-none text-xs"
          >
            <span className="text-slate-300">{language}</span>
            <ChevronDown size={12} className={`transition-transform ${languageOpen ? "rotate-180 text-white" : ""}`} />
            {languageOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-[#0d1117] border border-slate-700 rounded overflow-hidden shadow-xl">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => { setLanguage(lang); setLanguageOpen(false); }}
                    className="px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer whitespace-nowrap"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Snippets */}
          <div
            onClick={() => setSnippetOpen((p) => !p)}
            className="relative flex items-center gap-1 px-2 py-1 rounded bg-[#0f172a] border border-slate-700 text-slate-400 hover:bg-slate-800 cursor-pointer select-none text-xs"
          >
            <span className="text-slate-300">Snippets</span>
            <ChevronDown size={12} className={`transition-transform ${snippetOpen ? "rotate-180 text-white" : ""}`} />
          </div>

          {/* Reset */}
          <button
            onClick={() => setCode(basicSnippet || "// start coding here...")}
            className="flex items-center justify-center w-7 h-7 rounded border border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition"
            title="Reset to snippet"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div style={{ height: editorHeight }} className="flex-shrink-0">
        <Editor
          key={language}
          language={language}
          value={code}
          onChange={handleTyping}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            smoothScrolling: true,
            padding: { top: 10 },
          }}
          className="h-full"
        />
      </div>

      {/* Terminal — drag logic lives in CodeEditor, height passed as prop */}
      <Terminal height={termHeight} onDragStart={handleDragStart} />
    </div>
  );
}

export default CodeEditorWrapper;