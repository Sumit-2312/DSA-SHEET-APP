import { useState } from "react";
import { useRecoilState } from "recoil";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { addQuestionModalState } from "../../../recoilstates/question/questionModalStates";
import type { addQuestionRequestType } from "@repo/types/apiRequests/addQuestionRequestType";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";
import { currentSheetContent } from "../../../recoilstates/sheet/currentSheetContent";
import type { Folder, Question } from "@repo/types/apiResponse/getSheetDataResponseType";




function AddQuestionModal() {
  const [open, setOpen] = useRecoilState(addQuestionModalState);
  const [curr_folder,setCurrFolder] = useRecoilState(currentFolder);
  const [currSheetData, setCurrSheetData] = useRecoilState(currentSheetContent);

  const [form, setForm] = useState({
    title: "",
    platform: "",
    link: "",
    resource: "",
    notes: "",
    difficulty: "" as "easy" | "medium" | "hard" | ""
  });

  const updateQuestionsInSheet = (
    folders: Folder[],
    newQuestion: Question
  ): Folder[] => {
    return folders.map((folder) => {
      if (folder.id === newQuestion.folderId) {
        return {
          ...folder,
          questions: [...(folder.questions || []), newQuestion],
        };
      }

      if (!folder.childFolders || folder.childFolders.length === 0) {
        return folder;
      }

      return {
        ...folder,
        childFolders: updateQuestionsInSheet(folder.childFolders, newQuestion),
      };
    });
  };

  const close = () => {
    setOpen(false);
    setForm({
      title: "",
      platform: "",
      link: "",
      resource: "",
      notes: "",
      difficulty: ""
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.platform || !form.link || !form.difficulty) {
        toast.error("Please fill all required fields");
        return;
      }

      if (!curr_folder) {
        toast.error("Select a folder to add the question");
        return;
      }

      console.log("Current folder before adding question:", curr_folder);

      if(curr_folder.childFolders.length > 0 ){
        toast.error("To Added question, folder should not have any subFolders");
        toast.error("Please move subFolders to other folder or create new folder to add question");
        return;
      }

      const sheetId = currSheetData?.id ?? "";

      const body: {
        sheetId: string;
        folderId: string;
        question: addQuestionRequestType;
      } = {
        sheetId,
        folderId: curr_folder.id,
        question: {
          title: form.title,
          platform: form.platform,
          difficulty: form.difficulty,
          link: form.link,
          resourceLink: form.resource || "",
          notes: form.notes,
          sheetId,
          folderId: curr_folder.id,
        }
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sheet/addQuestion`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.data.success) {
        toast.success("Question added successfully");

        const newQuestion: Question = {
          id: res.data.questionId,
          title: form.title,
          platform: form.platform,
          difficulty: form.difficulty,
          link: form.link,
          resourceLink: form.resource || "",
          notes: form.notes,
          done: false,
          folderId: curr_folder.id,
          sheetId,
        };

        setCurrSheetData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            Folders: updateQuestionsInSheet(prev.Folders, newQuestion),
          };
        });

        setCurrFolder((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            questions: [...(prev.questions || []), newQuestion],
          };
        });

        close();
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Server error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal */}
      <div className="w-[420px] bg-[#0f172a] text-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Add Question</h2>
          <X
            className="cursor-pointer text-gray-400 hover:text-white transition"
            onClick={close}
          />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className="text-sm text-gray-300">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="text-sm text-gray-300">Platform *</label>
            <input
              name="platform"
              value={form.platform}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Link */}
          <div>
            <label className="text-sm text-gray-300">Question Link *</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
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

          {/* Resource */}
          <div>
            <label className="text-sm text-gray-300">Resource</label>
            <input
              name="resource"
              value={form.resource}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-gray-300">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition h-[90px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-sm font-medium"
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionModal;