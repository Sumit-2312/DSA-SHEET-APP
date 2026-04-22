import type { basicResponseType } from "./basicResponseType.js"

export interface Question{
	id: string,
	title: string,
	link: string,
	resourceLink: string,
	notes: string,
	platform: string,
	difficulty: "easy"|"medium"|"hard",
	folderId: string,
	sheetId: string,
	done: boolean
}

export interface Folder{
	id: string,
	name: string,
	parentFolderId: string|null,
	questions: Question[]
	childFolders: Folder[]
}

export interface SheetDataType {
	id: string,
	name: string,
	solvedQuestionsCount: string,
	solvedQuestionsIds: string[],
	Folders: Folder[]
}

export interface getSheetDataResponseType extends basicResponseType {
	id: string,
	name: string,
	solvedQuestionsCount: string,
	solvedQuestionsIds: string[],
	Folders: Folder[]
}