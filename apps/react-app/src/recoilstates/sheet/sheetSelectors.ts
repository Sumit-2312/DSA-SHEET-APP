import { selector } from "recoil";
import {
  questionsState,
  foldersState
} from "./currentSheetContent";


// ==============================
// SHEET TOTAL QUESTIONS
// ==============================

export const totalQuestionsState = selector<number>({
  key: "totalQuestionsState",
  get: ({ get }) => {
    const questions = get(questionsState);
    return Object.keys(questions).length;
  }
});



// ==============================
// SHEET SOLVED QUESTIONS
// ==============================

export const solvedQuestionsCountState = selector<number>({
  key: "solvedQuestionsCountState",
  get: ({ get }) => {
    const questions = get(questionsState);
    return Object.values(questions).filter(q => q.done).length;
  }
});

// ==============================
// FOLDER TOTAL QUESTION HELPER
// ==============================

export const folderTotalQuestionsSelector = selector({
  key: "folderTotalQuestionsSelector",

  get: ({ get }) => {
    const folders = get(foldersState);

    function dfs( folderId: string ): number {
      const folder = folders[folderId];
      // base case
      if (!folder) return 0;
      let count = folder.questionIds.length;
      // transition
      for ( const childId of folder.childFolderIds
      ) {
        count += dfs(childId);
      }
        // return 
      return count;
    }

    return (
      folderId: string
    ) => dfs(folderId);
  }
});


// ==============================
// FOLDER SOLVED QUESTION HELPER
// ==============================

export const folderSolvedQuestionsSelector = selector({
  key: "folderSolvedQuestionsSelector",
  get: ({ get }) => {
    const folders = get(foldersState);

    const questions = get(questionsState);

    function dfs( folderId: string ): number {

      const folder = folders[folderId];

      if (!folder) return 0;
      let solved = 0;
      for ( const qId of folder.questionIds ){ // find solved in current folder 
        if ( questions[qId]?.done) solved++;
      }
      // calculate form child folders
      for ( const childId of folder.childFolderIds) {
        solved += dfs(childId);
      }
      return solved;
    }

    return ( folderId: string ) => dfs(folderId);
  }
});