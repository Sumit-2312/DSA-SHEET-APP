import { atom } from "recoil";

export const addResourceModalState = atom<boolean>({
  key: "addResourceModalState",
  default: false,
});

export const notesModalState = atom<boolean>({
  key: "notesModalState",
  default: false,
});

// which question is currently being edited
export const activeQuestionState = atom<any | null>({
  key: "activeQuestionState",
  default: null,
});


export const addQuestionModalState = atom<boolean>({
  key: "addQuestionModalState",
  default: false,
});