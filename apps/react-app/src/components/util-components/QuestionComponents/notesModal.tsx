import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { X } from "lucide-react";
import { activeQuestionState, notesModalState } from "../../../recoilstates/question/questionModalStates";

function NotesModal() {
  const [open, setOpen] = useRecoilState(notesModalState);
  const question = useRecoilValue(activeQuestionState);
  const [notes, setNotes] = useState("");

  const close = () => {
    setOpen(false);
    setNotes("");
  };

  const handleSave = () => {
    console.log("Notes for:", question, notes);
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-5 rounded w-[400px] text-white">
        
        <div className="flex justify-between mb-3">
          <h2>Add Notes</h2>
          <X onClick={close} className="cursor-pointer" />
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes..."
          className="w-full h-[120px] px-3 py-2 bg-gray-800 border border-gray-700 rounded"
        />

        <button
          onClick={handleSave}
          className="mt-3 px-3 py-1 bg-yellow-600 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NotesModal;