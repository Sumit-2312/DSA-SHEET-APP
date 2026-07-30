import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { atom } from "recoil";

export const updateSolveModal = atom({
    key: "updateSolveModal",
    default: {
        isOpen: false,
        question: null as Question | null
    }
})