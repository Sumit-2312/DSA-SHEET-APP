import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { X } from "lucide-react";
import { activeQuestionState, notesModalState } from "../../../recoilstates/question/questionModalStates";
import axios from "axios";
import { toast } from "react-toastify";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";

function NotesModal() {
  const [open, setOpen] = useRecoilState(notesModalState);
  const question = useRecoilValue(activeQuestionState);
  const [questionMap, setQuestionMap] = useRecoilState(questionsState);
  const [notes, setNotes] = useState("");

  const close = () => {
    setOpen(false);
    setNotes("");
  };

  const handleSave = async() => {
    try{
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/sheet/question`,{
        questionId: question?.id,
        folderId: question?.folderId,
        sheetId: question?.sheetId,
        fieldToBeUpdated:{
          notes: notes
        }
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = response.data;
      if( !data.success ){
        throw new Error(data.error || "Failed to update notes");
      }
      toast.success("Notes updated successfully");
      setQuestionMap((prev)=>{
        if(question?.id){
          return {
            ...prev,
            [question.id]:{
              ...prev[question.id],
              notes: notes
            }
          }
        } else {
          return prev;
        }
      });
      close();
    }
     catch (error:unknown) {
      if(axios.isAxiosError(error)){
        const errorMessage = error.response?.data?.error || "Failed to update notes";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
      close();
      return;
    }
  };

  useEffect(()=>{
    console.log("Active question in notes modal: ", question);
    setNotes(questionMap[question?.id]?.notes || "");
  },[question,open,questionMap]);

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