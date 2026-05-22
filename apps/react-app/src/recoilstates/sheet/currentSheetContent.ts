import { atom } from "recoil";
import type {
  Folder,
  Question
} from "@repo/types/apiResponse/getSheetDataResponseType";


// ==============================
// SHEET META
// ==============================

export const sheetMetaState = atom<{id: string;name: string;} | null>({
  key: "sheetMetaState",
  default: null
});


// ==============================
// ROOT FOLDER
// ==============================

export const rootFolderIdState = atom<string | null>({
  key: "rootFolderIdState",
  default: null
});


// ==============================
// NORMALIZED ENTITIES
// ==============================

export const foldersState = atom<Record<string, Folder>>({
  key: "foldersState",
  default: {}
});


export const questionsState = atom<Record<string, Question>>({
  key: "questionsState",
  default: {}
});


// ==============================
// OPTIONAL
// For quick lookup
// ==============================

export const solvedQuestionIdsState = atom<string[]>({
  key:"solvedQuestionIdsState",
  default:[]
});