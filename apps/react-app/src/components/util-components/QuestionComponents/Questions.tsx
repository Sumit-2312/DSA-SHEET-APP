import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";

import type { Folder } from '@repo/types/apiResponse/getSheetDataResponseType';import QuestionItem from "./QuestionItem";
import { addQuestionModalState } from "../../../recoilstates/question/questionModalStates";

function Questions() {
  const currFolder = useRecoilValue<Folder|null>(currentFolder);
  const openModal = useSetRecoilState(addQuestionModalState);

  const total = currFolder?.questions?.length || 0;
  const solved =
    currFolder?.questions?.filter((q) => q.done)?.length || 0;

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

        {/* RIGHT */}
        <button
          onClick={() => openModal(true)}
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 text-sm"
        >
          Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 no-scrollbar">
        {currFolder?.questions?.length ? (
          currFolder.questions.map((ques) => (
            <QuestionItem key={ques.id} ques={ques} />
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