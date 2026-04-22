
import type { basicResponseType } from "./basicResponseType.js";
import type { Folder, Question } from "./getSheetDataResponseType.js";

export interface addFolderResponseType extends basicResponseType{
	id: string,
	name: string,
	sheetId: string,
	parentFolderId: string,
	childFolders:Folder [],
	questions: Question[],
	createdBy: string
}