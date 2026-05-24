export interface AddCustomQuestionRequestType {
    title: string;
    folderId: string;
    sheetId: string;
    problemStatement: string;
    inputs: {
        input: string;
        output: string;
    }[];
    platform: string;
    difficulty: "easy" | "medium" | "hard";
}
