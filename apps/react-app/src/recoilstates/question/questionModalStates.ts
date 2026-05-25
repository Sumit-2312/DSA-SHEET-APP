import type { Question } from "@repo/types/apiResponse/getSheetDataResponseType";
import { atom, selector } from "recoil";
import { foldersState, questionsState } from "../sheet/currentSheetContent";


export const addResourceModalState = atom<boolean>({
  key: "addResourceModalState",
  default: false,
});

export const notesModalState = atom<boolean>({
  key: "notesModalState",
  default: false,
});

// which question is currently being edited
export const activeQuestionState = atom<Question | null>({
  key: "activeQuestionState",
  default: null,
});


export const addQuestionModalState = atom<boolean>({
  key: "addQuestionModalState",
  default: false,
});

export const addOwnQuestionModalState = atom<boolean>({
  key: "AddOwnQuestionModalState",
  default: false
})

const questionIdsByFolderIdState = selector({
  key:"questionIdsByFolderIdState",
  get:({get})=>{
    const foldersMap = get(foldersState);
    let arr = [];
    function dfs(folderId: string){
      const folder = foldersMap[folderId];
      if(!folder) return;
      arr.push(...folder.questionIds);
      for(const childId of folder.childFolderIds){
        dfs(childId);
      }
    }
    function find(folderId: string): string[]{
      arr = [];
      dfs(folderId);
      return arr;
    }

    return (folderId: string)=> find(folderId);
  }
})

export const getRandomQuestionModalState = selector({
  key: "getRandomQuestionModalState",

  get: ({ get }) => {
    const getQuestionIdsByFolder = get(questionIdsByFolderIdState);
    const questionsMap = get(questionsState);

    function find(folderId: string): Question | null {
      const allQuestions = getQuestionIdsByFolder(folderId);

      if (allQuestions.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(
        Math.random() * allQuestions.length
      );

      const randomQuestionId = allQuestions[randomIndex];

      return questionsMap[randomQuestionId] || null;
    }

    return (folderId: string): Question | null =>
      find(folderId);
  },
});