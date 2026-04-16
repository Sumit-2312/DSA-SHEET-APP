import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import codeState from "../../recoilstates/currentCode.js";
import currentCodeLanguageState from "../../recoilstates/currentCodeLanguage.js";
import { ChevronDown, RotateCcw } from "lucide-react";
import getSnippet from "../util-components/GetBasicSnippet.js";
import Terminal from "../util-components/Terminal.js";
import { ErrorBoundary } from "react-error-boundary";
import CodeEditorFallback from "../FallbackUI/Code-editor-fallback.js";
import TerminalInput from '../../recoilstates/terminalInput.js'
import axios, { isAxiosError, type AxiosResponse } from "axios";
import getLanguageId from "../util-components/getLanguageId.js";
import inputOrOutput from "../../recoilstates/inputOrOutput.js";
import { allSnippets } from "../../recoilstates/allSnippets.js";
import { currentSnippet } from "../../recoilstates/currentSnippet.js";
import type { snippetResponseType } from "@repo/types/apiResponse/snippetsResponseType";
import { toast } from "react-toastify";
import SnippetDropdown from "../util-components/SnippetDropdown.js";
import CreateSnippetModal from "../util-components/AddsnippetModal.js";
import { modalOpen } from "../../recoilstates/createSnippetmodalOpen.js";
import { viewAllSnippetsModalOpen } from "../../recoilstates/viewAllSnippetsModalOpen.js";
import ViewAllSnippetsModal from "../util-components/ViewAllSnippetsModal.js";
import { useNavigate } from "react-router-dom";
import { editSnippetModalOpen } from "../../recoilstates/editSnippetModal.js";
import { selectedSnippetId } from "../../recoilstates/selectedSnippetIdstate.js";


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
  const [input] = useRecoilState(TerminalInput);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const setInputOrOutput = useSetRecoilState(inputOrOutput);
  const [snippets,setSnippets] = useRecoilState(allSnippets);
  const [current_snippet,setCurrSnippet] = useRecoilState(currentSnippet);
  const [openModal,setOpenModal] = useRecoilState(modalOpen);
  const viewAllSnippetModal = useRecoilValue(viewAllSnippetsModalOpen);
  const Navigage = useNavigate();
  const currentSnippetId = useRecoilValue(selectedSnippetId);
  const [IsOpenEditSnippetModal,setIsOpenEditSnippetModal] = useRecoilState(editSnippetModalOpen);


    useEffect(() => {
      const savedCode = localStorage.getItem(`code_${language}`);

      if (savedCode) {
        setCode(savedCode);
      } else {
        const snippet = getSnippet(language);
        setBasicSnippet(snippet);
        setCode(snippet);
      }
    }, [language]);

    useEffect(()=>{
      const fetchsnippets = async( ) =>{
        try{
          const response:AxiosResponse<snippetResponseType> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/editor/snippet`,{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })

          if( !response.data.success ){
            throw new Error(response.data.message || "Failed to fetch snippets");
          }
          console.log(`Fetched snippets : ${JSON.stringify(response.data.snippets)}`);
          // else set the snippets 
          setSnippets(response.data.snippets);

          if(response.data.redirect ){
            toast.error("Session expired. Please login again.");
            localStorage.removeItem("token");
            Navigage("/login");
          }

        }catch(err:unknown){
          if( err instanceof Error ){
            toast.error(err.message);
          }
          else if( typeof err === "string" ){
            toast.error(err); 
          }
          else if( isAxiosError(err) ){ 
                if(  err.response?.data.redirect ){
                  toast.error("Session expired. Please login again.");
                  localStorage.removeItem("token");
                  Navigage("/login");
                }
                else toast.error(err.response?.data?.message || "Failed to fetch snippets");}
          else{
            toast.error("An unknown error occurred while fetching snippets");
          }

      }
      }
      fetchsnippets();
    },[]);

    useEffect(()=>{
      console.log(`Current Snippet id: ${currentSnippetId} `);
      console.log(`edit modal open or not : ${IsOpenEditSnippetModal}`);
    });

    const handleTyping = (value?: string) => {
      const newCode = value || "";

      setCode(newCode);

      // persist per language
      localStorage.setItem(`code_${language}`, newCode);
    };

    const handleRun = async () => {
      try {
        setLoading(true);
        setOutput("Running...");
        setInputOrOutput("output");

        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        const res = await axios.post(
          `${BACKEND_URL}/editor/executeCode`,
          {
            language_id: getLanguageId(language),
            source_code: code,
            stdin: input,
          },{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        console.log(`Got response from backend : ${JSON.stringify(res.data)}`);

        const data = res.data;

        let finalOutput = " "
          // data?.stdout ||
          // data?.compile_output ||
          // data?.stderr ||
          // data?.message ||
          // "No output";

          if( data?.stderr ){
            finalOutput = data?.stderr;
          }else if( data?.compile_output ){
            finalOutput = data.compile_output
          }else if( data?.stdout  ){
            finalOutput = data.stdout
          }else finalOutput = "no output";

        setOutput(finalOutput);
      } catch (err: any) {
        setOutput(err?.response?.data?.message || "Execution failed");
      } finally {
        setLoading(false);
      }
    };

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
    <div ref={shellRef} className="relative flex flex-col h-screen w-screen bg-[#0f172a] text-white overflow-hidden">

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
                    className={`${language === lang ? "bg-slate-800" : ""} px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 cursor-pointer whitespace-nowrap`}
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
            {
              snippetOpen && <div className=" z-[100] absolute top-[100%] right-[50%] translate-x-1/2 rounded bg-[#0f172a] border border-slate-700 text-slate-400">
                <SnippetDropdown/>
              </div>
            }


          </div>

          {/* Reset */}
          <button
            onClick={() => setCode(basicSnippet || "// start coding here...")}
            className="flex items-center justify-center w-7 h-7 rounded border border-slate-700 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition"
            title="Reset to snippet"
          >
            <RotateCcw size={13} />
          </button>

          <button
            onClick={handleRun}
            disabled={loading}
            className="px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-500 disabled:opacity-50"
          >
            {loading ? "Running..." : "Run"}
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
      <Terminal height={termHeight} onDragStart={handleDragStart} output={output} />
      {/* create snippet modal to create new snippet */}
        {
          openModal && <CreateSnippetModal type="create" preCode={code} prelanguage={language} prename="" />
        }
      {/* view all snippets modal */}
      {
        viewAllSnippetModal && <ViewAllSnippetsModal />
      }
      {/* create snippet modal to edit the existing snippet */}
      {
        IsOpenEditSnippetModal && <CreateSnippetModal type="edit" preCode={current_snippet?.content as string} prelanguage={current_snippet?.language as string} prename={current_snippet?.name as string} />
      }
    </div>
  );
}

export default CodeEditorWrapper;