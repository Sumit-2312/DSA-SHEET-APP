import { useState } from "react";
import { X, FileText, BookOpen } from "lucide-react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addOwnQuestionModalState } from "../../../recoilstates/question/questionModalStates";
import axios from "axios";
import type { AddCustomQuestionRequestType } from "@repo/types/apiRequests/addCustomQuestionRequestType";
import type { AddOwnQuestionResponseType } from "@repo/types/apiResponse/addOwnQuestionResponseType";
import { toast } from "react-toastify";
import { foldersState, questionsState } from "../../../recoilstates/sheet/currentSheetContent";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import { RichStatementEditor } from "./RichStatementEditor.tsx"; // adjust path as needed

function AddOwnQuestionModal() {
  const [open, setOpen] = useRecoilState(addOwnQuestionModalState);
  const setQuestionMap = useSetRecoilState(questionsState);
  const setFolderMap = useSetRecoilState(foldersState);
  const selectedFolder = useRecoilValue(currentFolder);
  const setCurrFolder = useSetRecoilState(currentFolder);

  const [form, setForm] = useState({
    title: "",
    statement: "",
    example1Input: "",
    example1Output: "",
    example2Input: "",
    example2Output: "",
    difficulty: "",
  });

  const close = () => {
    setOpen(false);
    setForm({
      title: "",
      statement: "",
      example1Input: "",
      example1Output: "",
      example2Input: "",
      example2Output: "",
      difficulty: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.difficulty ||
      !form.statement
    ) {
      alert("Please fill all the required fields");
      return;
    }
    if (!selectedFolder) {
      toast.error("No folder selected");
      return;
    }
    try {
      const body: AddCustomQuestionRequestType = {
        title: form.title,
        problemStatement: form.statement,
        inputs: [
          { input: form.example1Input || "no input", output: form.example1Output || "no output" },
          { input: form.example2Input || "no input", output: form.example2Output || "no output" },
        ],
        folderId: selectedFolder.id,
        sheetId: selectedFolder.sheetId,
        platform: "DSA-Sheet-Manager",
        difficulty: form.difficulty as "easy" | "medium" | "hard",
      };

      const response = await axios.post<AddOwnQuestionResponseType>(
        `${import.meta.env.VITE_BACKEND_URL}/sheet/customQuestion`,
        { ...body },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const data = response.data;
      if (!data.success) throw new Error(data.error || "Failed to add question");

      setQuestionMap((prev) => ({ ...prev, [data.Question.id]: data.Question }));

      setFolderMap((prev) => {
        const folder = prev[data.Question.folderId];
        if (!folder) return prev;
        const ids = new Set([...folder.questionIds, data.Question.id]);
        return {
          ...prev,
          [data.Question.folderId]: { ...folder, questionIds: [...ids] },
        };
      });

      setCurrFolder((prev) => {
        if (!prev) return prev;
        return { ...prev, questionIds: [...(prev.questionIds || []), data.Question.id] };
      });

      toast.success("Question added successfully");
      close();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Failed to add question");
      } else {
        toast.error("Failed to add question");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1120]/95 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,.6)]">
        <div className="absolute top-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400" />

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <div>
            <h1 className="text-xl font-semibold text-white">Create Custom Question</h1>
            <p className="text-sm text-gray-400 mt-1">Add your own problem with resources & notes</p>
          </div>
          <button
            onClick={close}
            className="h-10 w-10 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] transition"
          >
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-8 py-6 pb-32 space-y-6 max-h-[70vh] custom-scrollbar">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Question Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Maximum subarray sum"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm text-gray-300">Difficulty *</label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Problem Statement — Rich Editor */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <FileText size={15} />
              Problem Statement *
            </label>
            <RichStatementEditor
              value={form.statement}
              onChange={(val) => setForm((prev) => ({ ...prev, statement: val }))}
            />
          </div>

          {/* Examples */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400" />
              <h3 className="text-gray-200 font-medium">Examples</h3>
            </div>

            {/* Example 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm text-gray-400 mb-4">Example 1</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Input *</label>
                  <textarea
                    name="example1Input"
                    value={form.example1Input}
                    onChange={handleChange}
                    placeholder="nums = [1,2,3]"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Output *</label>
                  <textarea
                    name="example1Output"
                    value={form.example1Output}
                    onChange={handleChange}
                    placeholder="6"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-sm text-gray-400 mb-4">Example 2</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Input *</label>
                  <textarea
                    name="example2Input"
                    value={form.example2Input}
                    onChange={handleChange}
                    placeholder="nums=[-1,-2]"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Output *</label>
                  <textarea
                    name="example2Output"
                    value={form.example2Output}
                    onChange={handleChange}
                    placeholder="-1"
                    className="h-24 resize-none w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full px-8 py-5 border-t border-white/5 bg-[#0b1120] flex justify-end gap-3">
          <button
            onClick={close}
            className="px-5 py-2.5 rounded-xl bg-white/[0.05] text-gray-300 hover:bg-white/[0.08] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:scale-[1.02] transition text-white font-medium shadow-lg shadow-blue-500/20"
          >
            Create Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddOwnQuestionModal;