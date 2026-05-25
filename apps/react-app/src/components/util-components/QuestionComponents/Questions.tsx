import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentFolder } from "../../../recoilstates/folders/currentFolder";

import type { Folder } from '@repo/types/apiResponse/getSheetDataResponseType';
import QuestionItem from "./QuestionItem";
import {  folderTotalQuestionsSelector, folderSolvedQuestionsSelector } from "../../../recoilstates/sheet/sheetSelectors";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";
import { addOwnQuestionModalState, getRandomQuestionModalState } from "../../../recoilstates/question/questionModalStates";
import { toast } from "react-toastify";
import { useState } from "react";
import IsOpenSidebarState from "../../../recoilstates/sheet/sideBarState";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";




function Questions() {
  const currFolder = useRecoilValue<Folder|null>(currentFolder);
  const solvedfxn = useRecoilValue(folderSolvedQuestionsSelector); // selector for current folder solved question count which return functioin
  const solved = currFolder ? solvedfxn(currFolder.id) : 0; // get solved question count for current folder using selector function
  const totalfxn = useRecoilValue(folderTotalQuestionsSelector);
  const total = currFolder ? totalfxn(currFolder.id) : 0; // get total question count for current folder using selector function
  const questionMap = useRecoilValue(questionsState);
  const setCreateOwnQuestionModalState = useSetRecoilState(addOwnQuestionModalState);
  const getRandomQuestion = useRecoilValue(getRandomQuestionModalState);
  const [randomQuestion,setRandomquestion] = useState(null);
  const [sideBarOpen,setSideBarOpen] = useRecoilState(IsOpenSidebarState);

  const handleRandomQuestion = ()=>{
    console.log("Random question button clicked");
    if(!currFolder){
      toast.error("No folder selected");
      return;
    }
    const question = getRandomQuestion(currFolder.id);
    console.log("Random question selected: ",question);
    if(!question){
      toast.error("No question found in this folder");
      return;
    }
    setRandomquestion(question);
  }


  return (
    <div className="h-full flex flex-col overflow-hidden pb-10 bg-[#0f172a] text-white">
      
      {/* Header */}
      <div className="px-5 py-3 border-b relative border-gray-700 flex items-center justify-between gap-4 flex-wrap sm:flex-row flex-col ">
        
          {/* sidebar toggle button */}
          <div className="flex items-center absolute top-5 left-1 ">
            <button
              onClick={() => setSideBarOpen(prev => !prev)}
              className="p-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              {sideBarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
          </div>

          {/* LEFT */}
          <div className="min-w-10 flex select-none flex-col items-center sm:items-start pl-10 ">
            <h2 className="text-lg font-semibold tracking-wide truncate">
              {currFolder?.name || "Select a Folder"}
            </h2>
            <p className="text-sm text-gray-400">
              {solved}/{total} Solved
            </p>
          </div>

        {/* Right */}
     
        <div className="flex gap-4 sm:flex-row flex-col w-fit sm:w-auto ">
          <div onClick={()=>handleRandomQuestion()} className="py-2 select-none  border border-gray-500 text-white font-bold rounded-md flex items-center justify-center px-5 hover:cursor-pointer hover:border-green-600  hover:bg-blue-400/5 hover:scale-105 ">
            Random 
          </div>
          {(currFolder?.childFolderIds?.length == 0  && currFolder?.questionIds?.length > 0) && (
              <div onClick={()=>setCreateOwnQuestionModalState(true)} className="py-2 border select-none border-gray-500 text-white font-bold rounded-md flex items-center justify-center px-5 hover:cursor-pointer hover:border-blue-600  hover:bg-blue-400/5 hover:scale-105 ">
                Create Own Question 
              </div>
          )}
       </div>
      

      </div >

      {/* Questions List */}
      <div className="flex flex-col gap-5 h-full py-5 flex-wrap ">
          {randomQuestion && (
            <div className="px-4">
              <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-red-500/5 to-transparent backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.12)] transition-all duration-300 hover:scale-[1.01] hover:border-red-400/40">
               
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-500/15 flex items-center justify-center text-xl">
                      🎲
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        Random Pick
                      </h3>

                      <p className="text-xs text-gray-400">
                        Surprise challenge selected for you
                      </p>
                    </div>

                  </div>

                  <div onClick={()=>setRandomquestion(null)} className="px-3 py-1 hover:scale-110 hover:cursor-pointer hover:text-red-400 hover:border-red-400 hover:bg-red-500/5  rounded-full text-xs bg-blue-500/15 border border-blue-500/20 text-blue-300">
                    Close
                  </div>

                </div>

                <div className="p-5">
                  <QuestionItem key={randomQuestion.id} ques={randomQuestion} />
                </div>

              </div>

              <div className="mt-6 border-b border-white/10"></div>
            </div>
          )}
        
        <div className="flex-1 overflow-y-auto px-4 py-3 pb-10 space-y-2 no-scrollbar hide-scrollbar ">
          {currFolder?.questionIds?.length ? (
            currFolder.questionIds.map((quesId) => {
              if( !questionMap[quesId] ){
                return null;
              }
              return (
                <QuestionItem key={quesId} ques={questionMap[quesId]} />
              );
            })
          ) : (
            <div className="text-gray-400 text-sm text-center mt-10">
              No questions found in this folder.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;