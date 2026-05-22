import { useRecoilValue } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";

import type { Folder } from '@repo/types/apiResponse/getSheetDataResponseType';
import QuestionItem from "./QuestionItem";
import { solvedQuestionsCountState } from "../../../recoilstates/sheet/sheetSelectors";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";



function Questions() {
  const currFolder = useRecoilValue<Folder|null>(currentFolder);
  const solved = useRecoilValue(solvedQuestionsCountState); // selector for current folder solved question count which return functioin
  const total = currFolder?.questionIds?.length || 0;
  const questionMap = useRecoilValue(questionsState);

  return (
    <div className="h-full flex flex-col bg-[#0f172a] text-white">
      
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-700 flex items-center justify-between">
        
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide">
            {currFolder?.name || "Select a Folder"}
          </h2>
          <p className="text-sm text-gray-400">
            {solved}/{total} Solved
          </p>
        </div>

    </div>
      {/* Questions List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 no-scrollbar">
        {currFolder?.questionIds?.length ? (
          currFolder.questionIds.map((quesId) => (
            <QuestionItem ques={questionMap[quesId]} />
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