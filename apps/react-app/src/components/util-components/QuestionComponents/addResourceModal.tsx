import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { X } from "lucide-react";
import { activeQuestionState, addResourceModalState } from "../../../recoilstates/question/questionModalStates";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";
import axios from "axios";
import { toast } from "react-toastify";


function AddResourceModal() {
  const [open, setOpen] = useRecoilState(addResourceModalState);
  const question = useRecoilValue(activeQuestionState);
  const [questionMap,setQuestionMap] = useRecoilState(questionsState);
  const [link, setLink] = useState("");

  const close = () => {
    setOpen(false);
    setLink("");
  };

  const handleSave = async() => {
    if (!link.trim()) {
      alert("Please enter a valid link.");
      return;
    }
    // Here you would typically also want to validate the URL format before saving it.
   try{
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/sheet/question`,{
          questionId: question.id,
          folderId: question.folderId,
          sheetId: question.sheetId,
          fieldToBeUpdated:{
            resourceLink: link.trim()
          }
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = response.data;
        if( !data.success ){
          throw new Error(data.error || "Failed to add resource link");
        }
        const updatedQuestion = {
          ...question,
          resourceLink: link.trim()
        };
        setQuestionMap((prev)=>{
          return {
            ...prev,
            [question.id]: updatedQuestion
        };
        });
        toast.success("Resource link added successfully");
        close();
    }
    catch(err:unknown){
      console.log("Error while adding resource link: ",err);
      if(axios.isAxiosError(err)){
        toast.error(err.response?.data?.error || "Failed to add resource link. Please try again.");
      }else if(err instanceof Error){
        toast.error(err.message || "Failed to add resource link. Please try again.");
      }else{
        toast.error("Failed to add resource link. Please try again.");
      }
    }
  }

    useEffect(()=>{
      setLink(questionMap[question?.id]?.resourceLink || ""); // set the input field to the first resource link of the question when the modal opens
    },[questionMap, question,open])

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