
import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { BookOpenText, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  activeQuestionState,
  addResourceModalState,
  notesModalState,
} from "../../../recoilstates/question/questionModalStates";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { div } from "framer-motion/client";

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "easy") return "text-green-400 bg-green-400/10";
  if (difficulty === "medium") return "text-yellow-400 bg-yellow-400/10";
  if (difficulty === "hard") return "text-red-400 bg-red-400/10";
  return "text-gray-400 bg-gray-400/10";
};

function QuestionItem({ ques }: { ques: Question }) {
  const [solved, setSolved] = useState(ques.done);
  const openResourceModal = useSetRecoilState(addResourceModalState);
  const openNotesModal = useSetRecoilState(notesModalState);
  const setActiveQuestion = useSetRecoilState(activeQuestionState);
  

  const handleMarkSolved = async()=>{
    try{
      const updatedSolvedState = !solved;
      const response = await axios.patch(`${import.meta.env.VITE_APP_API_URL}/sheet/question`,{
        questionId: ques.id,
        done: updatedSolvedState,
        folderId: ques.folderId,
        sheetId: ques.sheetId
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data:basicResponseType = response.data;
      if( !data.success ){
        throw new Error(data.error || "Failed to update the question's solved state");
      }
      setSolved(updatedSolvedState);
      // we also need to update the solved state in the current sheet data recoil state so that the solved count and solved questions list gets updated in real time without refetching the sheet data from the backend. We can achieve this by creating a new recoil state for the current question's solved state and updating it here, and then using that recoil state in the Sheet component to calculate the solved count and solved questions list.
      toast.success("Done");
    }
    catch(err){
      console.log("Error while updating the question's solved state: ",err);
      toast.error("Failed to update the question's solved state. Please try again.");
    }
  };

  useEffect(()=>{
    console.log("Resource link: ", ques.resourceLink);
  }, [ques.resourceLink]);

  return (
    <div className="select-none group flex flex-col bg-[#1e293b] rounded-lg px-4 py-3 gap-2">
      
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          
          {/* Checkbox */}
          <div
            onClick={() => setSolved((prev) => !prev)}
            className={`w-5 h-5 rounded-md flex items-center justify-center cursor-pointer ${
              solved ? "bg-green-800" : "bg-gray-500"
            }`}
          >
            {solved && <Check className="h-4 text-white" />}
          </div>

          {/* Title + Platform */}
          <div className="flex flex-col">
            <span className="text-sm font-medium group-hover:text-blue-400 transition">
              {ques.title}
            </span>
            <span className="text-xs text-gray-400">
              {ques.platform}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex  w-1/4 justify-between px-5 items-center gap-3">
          
          {/* resource redirect */}
          {ques.resourceLink ? (
            <div className="w-1/3">
              <Link to={ques.resourceLink} target="_blank" >
              <div className="hover:cursor-pointer  flex items-center gap-1">
                <BookOpenText size={20} className="mt-1" />
                <p>Read</p>
              </div>
            </Link>
            </div>
          ):(
            <div className="w-1/3 ">
              </div>
          )}

          {/* Difficulty */}
          <div className="w-1/3 ">
            <span
              className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                ques.difficulty
              )}`}
            >
            {ques.difficulty}
          </span>

          </div>
          {/* Solve Link */}
          <a
            href={ques.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition"
          >
            Solve 
          </a>

        </div>
      </div>

      {/* BOTTOM ROW (Actions) */}
      <div className="flex gap-4 text-xs pl-8">
        
        <button
          onClick={() => {
            setActiveQuestion(ques);
            openResourceModal(true);
          }}
          className="text-blue-400 hover:underline"
        >
          {ques.resourceLink ? "Edit Resource" : "Add Resource"}
        </button>

        <button
          onClick={() => {
            setActiveQuestion(ques);
            openNotesModal(true);
          }}
          className="text-yellow-400 hover:underline"
        >
          Notes
        </button>

      </div>
    </div>
  );
}

export default QuestionItem;