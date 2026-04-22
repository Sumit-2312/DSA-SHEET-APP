import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { X } from "lucide-react";
import { activeQuestionState, addResourceModalState } from "../../../recoilstates/question/questionModalStates";


function AddResourceModal() {
  const [open, setOpen] = useRecoilState(addResourceModalState);
  const question = useRecoilValue(activeQuestionState);
  const [link, setLink] = useState("");

  const close = () => {
    setOpen(false);
    setLink("");
  };

  const handleSave = () => {
    console.log("Resource for:", question, link);
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-5 rounded w-[350px] text-white">
        
        <div className="flex justify-between mb-3">
          <h2>Add Resource</h2>
          <X onClick={close} className="cursor-pointer" />
        </div>

        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste link here"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
        />

        <button
          onClick={handleSave}
          className="mt-3 px-3 py-1 bg-blue-600 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddResourceModal;