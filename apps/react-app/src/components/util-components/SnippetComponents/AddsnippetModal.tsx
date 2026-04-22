import { useEffect, useRef, useState } from "react";
import { modalOpen } from "../../../recoilstates/snippets/createSnippetmodalOpen";
import { useRecoilState } from "recoil";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {toast} from "react-toastify";
import { allSnippets } from "../../../recoilstates/snippets/allSnippets";
import { selectedSnippetId } from "../../../recoilstates/snippets/selectedSnippetIdstate";
import { editSnippetModalOpen } from "../../../recoilstates/snippets/editSnippetModal";
import { useNavigate } from "react-router-dom";

function CreateSnippetModal({type,preCode,prelanguage,prename}:{
  type:"create"|"edit",
  preCode?:string,
  prelanguage?:string,
  prename?:string
}) {
  const [openModal, setOpenModal] = useRecoilState(modalOpen);
  const [editModalOpen,setEditModalOpen] = useRecoilState(editSnippetModalOpen);
  const [snippets, setAllSnippets] = useRecoilState(allSnippets);
  const modalRef = useRef();
  const [IdSelectedsnippet,] = useRecoilState(selectedSnippetId);
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(null);
  const [oldName,setoldName] = useState("");
  const [oldCode,setoldCode] = useState("");
  const [oldLanguage,setoldLanguage] = useState("");

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpenModal(false);
    }
  };

  const handleCreate = async () => {
    if (!name || !code) {
      toast.error("Please fill all fields");
      return;
    }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/editor/snippet`,
      {
        name: name,
        content: code,
        language: language
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(res.data.redirect){
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      return;
    }

    console.log(res.data);
    setAllSnippets([...snippets, res.data.snippet]);
    toast.success("Snippet created successfully ");

    // optional: reset fields
    setName("");
    setCode("");

    setOpenModal(false);
  } catch (err) {
    console.error(err);

    // smart error handling
    if (err.response) {
      if (err.response.data.redirect) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }
      toast.error(err.response.data?.message || "Something went wrong");
    } else if (err.request) {
      toast.error("Server not responding");
    } else {
      toast.error("Error creating snippet");
    }
  }
  };

  const handleEdit = async () => {
    if (!name || !code) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const body = {
        snippetId: IdSelectedsnippet,
        name: name === oldName ? undefined : name,
        content: code === oldCode ? undefined : code,
        language: language === oldLanguage ? undefined : language
      }

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/editor/snippet`,
          body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(res.data.redirect){
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }

      console.log(res.data);

      // update state (replace edited snippet)
      const updatedSnippets = snippets.map((snippet) =>{
        console.log("Updating snippet in fronend with snippetId :",snippet.id)
        return res.data.snippet.id === IdSelectedsnippet ? res.data.snippet : snippet
      }
      );

      setAllSnippets(updatedSnippets);

      toast.success("Snippet updated successfully");

      setEditModalOpen(false);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        if (err.response.data.redirect) {
          toast.error("Session expired. Please login again.");
          Navigate('/login');
          localStorage.removeItem("token");
          return;
        }
        toast.error(err.response.data?.error || "Something went wrong");
      } else if (err.request) {
        toast.error("Server not responding");
      } else {
        toast.error("Error updating snippet");
      }
    }
  };

  useEffect(()=>{
    setCode(preCode);
    setName(prename);
    setLanguage(prelanguage);
    if( type === 'edit' ){
      setoldCode(preCode);
      setoldName(prename);
      setoldLanguage(prelanguage);
    }
  },[])


  if (!openModal && !editModalOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
    >
      <div
        ref={modalRef}
        className="relative w-[750px] max-w-[95%] bg-[#0f0f0f] border border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
      >
        {/* Close Button */}
        { type === 'create' &&
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
        }{
          type === 'edit' &&
          <button
            onClick={() => setEditModalOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        }

        {/* Title */}
        <h2 className="text-xl font-semibold text-white">
         { type === 'create'? "Create Snippet" : "Edit Snippet"}
        </h2>

        {/* Name + Language Row */}
        <div className="flex gap-3">
          <input
            value={name||prename}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter snippet name..."
            className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 text-white outline-none focus:border-blue-500"
          />

          {/* Language Dropdown */}
          <select
            value={language||prelanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 text-white outline-none cursor-pointer"
          >
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
          </select>
        </div>

        {/* Monaco Editor */}
        <div className="h-64 border border-gray-700 rounded-md overflow-hidden">
          <Editor
            height="100%"
            language={language||prelanguage}
            theme="vs-dark"
            value={code||preCode}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Create Button */}
        {
          type === 'create' && 
          <button
            onClick={handleCreate}
            className="mt-2 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
          Create Snippet
        </button>
        }
        {
          type === 'edit' &&
          <button
            onClick={handleEdit}
            className="mt-2 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Confirm
        </button>
        }
      </div>
    </div>
  );
}

export default CreateSnippetModal;