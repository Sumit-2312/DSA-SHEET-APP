import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { Check, BookOpen, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeQuestionState,
  addResourceModalState,
  notesModalState,
} from "../../../recoilstates/question/questionModalStates";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { foldersState, questionsState } from "../../../recoilstates/sheet/currentSheetContent";

const getDifficultyStyle = (difficulty: string) => {
  if (difficulty === "easy")   return "text-teal-700   bg-teal-50   dark:text-teal-300   dark:bg-teal-900/20";
  if (difficulty === "medium") return "text-amber-700  bg-amber-50  dark:text-amber-300  dark:bg-amber-900/20";
  if (difficulty === "hard")   return "text-red-700    bg-red-50    dark:text-red-300    dark:bg-red-900/20";
  return "text-gray-500 bg-gray-100 dark:bg-gray-800";
};

function QuestionItem({ ques }: { ques: Question }) {
  const [questionMap, setQuestionMap] = useRecoilState(questionsState);
  const openResourceModal = useSetRecoilState(addResourceModalState);
  const openNotesModal    = useSetRecoilState(notesModalState);
  const setActiveQuestion = useSetRecoilState(activeQuestionState);
  const [isDisabled, setIsDisabled] = useState(false);
  const [folderMap, setFolderMap] = useRecoilState(foldersState);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ques.title); 


  useEffect(()=>{
    console.log(`QuestionItem : { ques: ${ques.title} , questionId: ${ques.id} } rendered `);
  });

  const isDone = questionMap[ques?.id]?.done;

  const handleMarkSolved = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
        {
          questionId: ques.id,
          folderId:   ques.folderId,
          sheetId:    ques.sheetId,
          fieldToBeUpdated: { done: !isDone },
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const data: basicResponseType = response.data;
      if (!data.success) throw new Error(data.error || "Failed to update");

      setQuestionMap((prev) => ({
        ...prev,
        [ques.id]: { ...prev[ques.id], done: !prev[ques.id]?.done },
      }));
      toast.success("Done", { autoClose: 1000 });
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update. Please try again.");
    }
  };

  const handleDelete = async()=>{
    try{
      const response = await axios.delete<basicResponseType>(
        `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
        {
          data: {
            questionId: ques.id,
            folderId:   ques.folderId,
            sheetId:    ques.sheetId,
          },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      const data: basicResponseType = response.data;
      if (!data.success) throw new Error(data.error || "Failed to delete");
      toast.success("Question deleted", { autoClose: 1000 });
      // remove this questoin from the folder also 
      setFolderMap((prev)=>{
        return {
          ...prev,
          [ques.folderId]:{
            ...prev[ques.folderId],
            questionIds: prev[ques.folderId].questionIds.filter(id=>id!==ques.id)
          }
        }
      });
      // remove this question from question map
      setQuestionMap((prev)=>{
        const newMap = {...prev};
        delete newMap[ques.id];
        return newMap;
      })
    }catch(err:unknown){
      if( axios.isAxiosError(err) ){
        console.error("Axios error:", err.response?.data?.error || err.message);
        toast.error(err.response?.data?.error || "Failed to delete. Please try again.");
      }else{
        console.error(err);
        toast.error("Failed to delete. Please try again.");
      }
    }
  }

const handleNameChange = async () => {
  const trimmedTitle = editedTitle.trim();

  if (!trimmedTitle || trimmedTitle === ques.title) {
    setIsEditing(false);
    setEditedTitle(ques.title);
    return;
  }

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
      {
        questionId: ques.id,
        folderId: ques.folderId,
        sheetId: ques.sheetId,
        fieldToBeUpdated: {
          title: trimmedTitle,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data: basicResponseType = response.data;

    if (!data.success) {
      throw new Error(data.error || "Failed to update");
    }

    setQuestionMap((prev) => ({
      ...prev,
      [ques.id]: {
        ...prev[ques.id],
        title: trimmedTitle,
      },
    }));

    toast.success("Title updated", {
      autoClose: 1000,
    });

    setIsEditing(false);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update title");
    setEditedTitle(ques.title);
    setIsEditing(false);
  }
};

  useEffect(() => {
    console.log("Resource link:", ques.resourceLink);
  }, [ques.resourceLink]);

  return (
    <div className="group bg-white dark:bg-[#0f172a] border border-gray-100 dark:border-white/[0.06] rounded-xl px-5 py-3.5 transition-colors hover:border-gray-200 dark:hover:border-white/10 select-none">

      {/* TOP ROW */}
      <div className="flex items-center gap-3">

        {/* Checkbox */}
        <button
          disabled={isDisabled}
          onClick={handleMarkSolved}
          className={`
            w-[18px] h-[18px] rounded-md flex items-center justify-center flex-shrink-0 transition-all
            ${isDone
              ? "bg-teal-600 border-teal-600"
              : "border border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40"
            }
            ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isDone && <Check size={11} strokeWidth={3} className="text-white" />}
        </button>

        {/* Title + Platform */}
        <div className="flex-1 min-w-0">
          
          <div className="flex gap-2 items-center group/title">

            {isEditing ? (
              <input
                autoFocus
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleNameChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNameChange();
                  }

                  if (e.key === "Escape") {
                    setEditedTitle(ques.title);
                    setIsEditing(false);
                  }
                }}
                className="text-sm font-medium w-full bg-transparent outline-none border-b border-blue-500 text-gray-800 dark:text-gray-100"
              />
            ) : (
              <>
                <p className="text-sm font-medium truncate transition-colors text-gray-800 dark:text-gray-100 group-hover/title:text-blue-500">
                  {questionMap[ques.id]?.title}
                </p>

                <PencilLine
                  size={15}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="opacity-0 group-hover/title:opacity-100 transition-opacity cursor-pointer hover:text-blue-500 flex-shrink-0"
                />
              </>
            )}

          </div>

          <div className="flex items-center gap-5 mt-0.5">

            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              {ques.platform}
            </p>

          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3 flex-shrink-0">

          {/* Read link */}
          {ques.resourceLink && (
            <Link
              to={ques.resourceLink}
              target="_blank"
              className="flex items-center gap-1 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <BookOpen size={14} />
              <span>Read</span>
            </Link>
          )}
          {/* Solve button */}
          <Link
            to={ques.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[12px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 px-3.5 py-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all"
          >
            Solve ↗
          </Link>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px bg-gray-100 dark:bg-white/[0.05] my-2.5 ml-[30px]" />

      {/* BOTTOM ROW */}
      <div className="flex items-center justify-between pl-[30px]">
        <div className="flex gap-4">
          <button
            onClick={() => { setActiveQuestion(questionMap[ques.id]); openResourceModal(true); }}
            className="text-[12px] text-blue-500 hover:underline"
          >
            {ques.resourceLink ? "Edit Resource" : "Add Resource"}
          </button>
          <button
            onClick={() => { setActiveQuestion(questionMap[ques.id]); openNotesModal(true); }}
            className="text-[12px] text-amber-600 dark:text-amber-500 hover:underline"
          >
            Notes
          </button>
        </div>


       <div className="flex gap-5 justify-between items-center ">
          <span
            className={`text-[10px] font-bold px-3 py-[1px] rounded-full ${getDifficultyStyle(
              ques.difficulty
            )}`}
          >
              {ques.difficulty[0].toUpperCase() + ques.difficulty.slice(1)}
          </span>
          
          <button onClick={handleDelete} className="text-[12px] text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-3 py-0.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            Delete
          </button>
       </div>


      </div>
    </div>
  );
}

export default QuestionItem;