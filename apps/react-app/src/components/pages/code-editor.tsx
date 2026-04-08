import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import codeState from "../../recoilstates/currentCode.js";
import currentCodeLanguageState from "../../recoilstates/currentCodeLanguage.js";
import { ChevronDown, RotateCcw } from "lucide-react";
import getSnippet from '../util-components/GetBasicSnippet.js'


function CodeEditor() {

  const [code, setCode] = useRecoilState(codeState);
  const [language, setLanguage] = useRecoilState(currentCodeLanguageState);
  const [basicSnippet,setBasicSnippet] = useState(``);
  const [languageOpen,setLanguageOpen] = useState(false);
  const [snippetOpen,setSnippetOpen] = useState(false);

  useEffect(()=>{
    function getBasicSnippet(){
      const snippet = getSnippet(language);
        setBasicSnippet(snippet);
        setCode(snippet);
    }
    getBasicSnippet();
  },[language])

  return (
    <div className="flex flex-col  w-screen bg-[#0f172a] text-white">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] border-b border-gray-700 shadow-sm">

        {/* Title */}
        <h1 className="text-sm font-semibold tracking-wide text-gray-200">
          Code Editor
        </h1>

        {/* Controls */}
        <div className="flex items-center gap-6 text-sm">

          {/* Language */}
          <div
            onClick={()=> setLanguageOpen((prev)=>!prev)}
            className="flex relative items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-700 cursor-pointer transition select-none "
          >
            <span className="text-gray-300">{language}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                languageOpen ? "rotate-180 text-white" : "text-gray-400"
              }`}
            />
             {languageOpen && 
                  <div className="z-[100] flex flex-col absolute top-[100%]  h-28 w-fit  ">
                    {["javascript","cpp","java"].map((lang,index)=>{
                      return <div onClick={()=>setLanguage(lang)} key={index} className="flex px-4 rounded-md bg-gray-900 py-2 text-md text-gray-200 items-center   hover:bg-gray-700 ">
                        {lang}
                      </div>
                    })}
                </div>
              }
          </div>

          {/* Templates */}
            <div
              onClick={()=>setSnippetOpen((prev)=>!prev)}
              className="flex relative items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-700 cursor-pointer transition select-none"
            >
              <span className="text-gray-300">Snipets</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  snippetOpen ? "rotate-180 text-white" : "text-gray-400"
                }`}
              />
            </div>

          {/* Reset Button */}
          <button onClick={()=>setCode(basicSnippet || "// start coding here...")} className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          language={language}
          value={code}
          height={"88vh"}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            smoothScrolling: true,
            padding: { top: 10 },
          }}
          className="z-10"
        />
      </div>
    </div>
  );
}

export default CodeEditor;