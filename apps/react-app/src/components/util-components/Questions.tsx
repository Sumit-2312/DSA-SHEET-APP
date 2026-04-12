import { useRecoilValue } from "recoil";
import { currentFolder } from "../../recoilstates/currentFolder";
import type { folders } from "@repo/types/sheet/sheetContentType";
import QuestionItem from "./QuestionItem";

function Questions() {
  const currFolder = useRecoilValue<folders | null>(currentFolder);


  return (
    <div className="h-full flex flex-col bg-[#0f172a] text-white">
      
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-wide">
          {currFolder?.name || "Select a Folder"}
        </h2>
        <span className="text-sm text-gray-400">
          {currFolder?.questions?.length || 0} Questions
        </span>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 no-scrollbar">
        {currFolder?.questions?.length ? (
          currFolder.questions.map((ques) => (
            <QuestionItem ques={ques} />
          ))
        ) : (
          <div className="text-gray-400 text-sm text-center mt-10">
            No questions found in this folder.
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;