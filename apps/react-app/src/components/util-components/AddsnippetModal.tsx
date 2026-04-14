import React, { useRef, useState } from "react";
import { modalOpen } from "../../recoilstates/modalOpen";
import { useRecoilState } from "recoil";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {toast} from "react-toastify";
import { allSnippets } from "../../recoilstates/allSnippets";

function CreateSnippetModal() {
  const [openModal, setOpenModal] = useRecoilState(modalOpen);
  const [snippets, setAllSnippets] = useRecoilState(allSnippets);
  const modalRef = useRef();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");

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
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
      toast.error(err.response.data?.message || "Something went wrong");
    } else if (err.request) {
      toast.error("Server not responding");
    } else {
      toast.error("Error creating snippet");
    }
  }
};
  if (!openModal) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className="relative w-[750px] max-w-[95%] bg-[#0f0f0f] border border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white">
          Create Snippet
        </h2>

        {/* Name + Language Row */}
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter snippet name..."
            className="flex-1 px-3 py-2 rounded-md bg-[#1a1a1a] border border-gray-600 text-white outline-none focus:border-blue-500"
          />

          {/* Language Dropdown */}
          <select
            value={language}
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
            language={language}
            theme="vs-dark"
            value={code}
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
        <button
          onClick={handleCreate}
          className="mt-2 w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Create Snippet
        </button>
      </div>
    </div>
  );
}

export default CreateSnippetModal;