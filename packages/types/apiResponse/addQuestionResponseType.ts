import type { basicResponseType } from "./basicResponseType.js";
export interface addQuestionResponseType extends basicResponseType{
	id: string,
	title: string,
	platform: string,
	difficulty: "easy"|"medium"|"hard",
	link: string,
	resourceLink: string,
	notes: string,
	sheetId: string,
	folderId: string,
	createdBy: string
}