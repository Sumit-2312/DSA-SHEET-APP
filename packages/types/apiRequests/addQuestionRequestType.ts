export interface addQuestionRequestType {
	title: string,
	platform: string,
	difficulty: "easy"|"medium"|"hard",
	link: string,
	resourceLink: string,
	notes: string,
	sheetId: string,
	folderId: string
}