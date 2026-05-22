

export interface TreeFolder {
  id: string;
  name: string;
  parentFolderId: string | null;
  sheetId: string;
  childFolders: TreeFolder[];
  questions: TreeQuestion[];
}
export interface TreeQuestion {
    id: string;
    folderId: string;
    sheetId: string;
}

export interface Tree {
  id: string;
  name: string;
  folders: TreeFolder[];
  questions: TreeQuestion[];
  totalQuestions: number;
  solvedQuestionsCount: number;
  solvedQuestionsIds: string[];
}