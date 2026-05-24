import type { basicResponseType } from "./basicResponseType.js"

export interface Question{
	id: string,
	title: string,
	link: string,
	resourceLink: string,
	notes: string,
	platform?: string,
	difficulty: "easy"|"medium"|"hard",
	folderId: string,
	sheetId: string,
	done: boolean,
	type?: "Custom"|"Normal",
	problemStatement?: string,
	inputs?: {
		input: string,
		output: string
	}[]
}

export interface Folder{
	id: string,
	name: string,
	parentFolderId: string|null,
	sheetId: string,
	questionIds: string[]
	childFolderIds: string[]
}

export interface getSheetDataResponseType extends basicResponseType {
	sheetDetails?: {
		id: string,
		name: string,
	},
	Folders?: Record<string,Folder>,
	Questions?: Record<string, Question>,
	rootFolderId?: string,
	totalQuestions?: number,
	solvedQuestionsCount?: number,
	solvedQuestionsIds?: string[]	
}
