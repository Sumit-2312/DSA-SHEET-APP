import type { question } from "@repo/types/sheet/sheetContentType";
import { Check } from "lucide-react";
import { useState } from "react";

const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "easy") return "text-green-400 bg-green-400/10";
    if (difficulty === "medium") return "text-yellow-400 bg-yellow-400/10";
    if (difficulty === "hard") return "text-red-400 bg-red-400/10";
    return "text-gray-400 bg-gray-400/10";
};

function QuestionItem({ques}:{ques:question}) {

    const[solved,setSolved] = useState(ques.isSolved);

  return (
            <div
              key={ques._id}
              className="group flex items-center justify-between bg-[#1e293b] transition rounded-lg px-4 py-3 cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                
                {/* Solved Indicator */}
                <div
                    onClick={()=>setSolved((prev)=>!prev)}
                    className={`w-5 h-5 rounded-md overflow-hidden flex items-center justify-center ${
                    solved ? "bg-green-800" : "bg-gray-500"
                  }`}
                >
                    {solved && <Check className="h-4" />}
                </div>

                {/* Title */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium group-hover:text-blue-400 transition">
                    {ques.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {ques.platform}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                
                {/* Difficulty */}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                    ques.difficulty
                  )}`}
                >
                  {ques.difficulty}
                </span>

                {/* Link */}
                <a
                  href={ques.link}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  Solve →
                </a>
              </div>
            </div>
  )
}

export default QuestionItem