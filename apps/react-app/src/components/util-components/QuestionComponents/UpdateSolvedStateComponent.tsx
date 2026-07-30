import { useRecoilState } from "recoil";
import { updateSolveModal } from "../../../recoilstates/question/updateSolveModal";
import { toast } from "react-toastify";
import axios from "axios";
import type { basicResponseType } from "@repo/types/apiResponse/basicResponseType";
import { questionsState } from "../../../recoilstates/sheet/currentSheetContent";






function Button(props: {
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick}
      className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 ${props.className}`}
    >
      {props.text}
    </button>
  );
}

function UpdateSolvedStateComponent() {

    const [modalState, setModalState] = useRecoilState(updateSolveModal);
    const [, setQuestionMap] = useRecoilState(questionsState);  
    const ques = modalState.question;

      if (!modalState.isOpen) return null;



     async function unsolvedHandler(){

        try {

        console.log("handleMarkSolve called with ques : ",ques);

        const response = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
            {
            questionId: ques.id,
            folderId:   ques.folderId,
            sheetId:    ques.sheetId,
            fieldToBeUpdated: { done: false, solvedAt: null },
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const data: basicResponseType = response.data;
        if (!data.success) throw new Error(data.error || "Failed to update");

        setQuestionMap((prev) => ({
            ...prev,
            [ques.id]: { ...prev[ques.id], done: !prev[ques.id]?.done, solvedAt: null },
        }));
        toast.success("Done", { autoClose: 1000 });

        setModalState({ isOpen: false, question: null });


        } catch (err) {
        console.error(err);
        toast.error("Failed to update. Please try again.");
        }

    }

    async function updateSolvedHandler() {
          try {

        console.log("handleMarkSolve called with ques : ",ques);

        const response = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/sheet/question`,
            {
            questionId: ques.id,
            folderId:   ques.folderId,
            sheetId:    ques.sheetId,
            fieldToBeUpdated: {
                done: true,
                solvedAt: new Date().toISOString()
             },
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        const data: basicResponseType = response.data;
        if (!data.success) throw new Error(data.error || "Failed to update");

        setQuestionMap((prev) => ({
            ...prev,
            [ques.id]: { ...prev[ques.id], done: !prev[ques.id]?.done, solvedAt: null },
        }));
        toast.success("Done", { autoClose: 1000 });

        setModalState({ isOpen: false, question: null });


        } catch (err) {
        console.error(err);
        toast.error("Failed to update. Please try again.");
        }

    }



  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={() => setModalState({ isOpen: false, question: null })}
    >
      <div
        className="w-[420px] rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Update Question Status
          </h2>

          <button
            onClick={() => setModalState({ isOpen: false, question: null })}
            className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-300 text-sm mb-8">
         { ques.done ?  "Choose the new status for this question." : "Are you sure you want to mark this question as solved?" }
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            text={ ques.done ? "Update Status" : "Confirm" }
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={updateSolvedHandler}
          />

        {ques.done &&  <Button
            text="Unsolved"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={unsolvedHandler}
          />}
        </div>
      </div>
    </div>
  );
}

export default UpdateSolvedStateComponent;
