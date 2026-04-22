
import type { Question as question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { BookOpenText, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  activeQuestionState,
  addResourceModalState,
  notesModalState,
} from "../../../recoilstates/question/questionModalStates";
import { Link } from "react-router-dom";

const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "easy") return "text-green-400 bg-green-400/10";
  if (difficulty === "medium") return "text-yellow-400 bg-yellow-400/10";
  if (difficulty === "hard") return "text-red-400 bg-red-400/10";
  return "text-gray-400 bg-gray-400/10";
};

function QuestionItem({ ques }: { ques: question }) {
  const [solved, setSolved] = useState(ques.done);

  const openResourceModal = useSetRecoilState(addResourceModalState);
  const openNotesModal = useSetRecoilState(notesModalState);
  const setActiveQuestion = useSetRecoilState(activeQuestionState);

  useEffect(()=>{
    console.log("Resource link: ", ques.resourceLink);
  })

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

          <Link to={ques.resourceLink} target="_blank" >
            <div className="hover:cursor-pointer flex items-center gap-1">
              <BookOpenText size={20} className="mt-1" />
              <p>Resource</p>
            </div>
          </Link>

          {/* Difficulty */}
          <span
            className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
              ques.difficulty
            )}`}
          >
            {ques.difficulty}
          </span>

          {/* Solve Link */}
          <a
            href={ques.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition"
          >
            Solve →
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
          Resource
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