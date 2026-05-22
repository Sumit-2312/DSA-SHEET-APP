export interface FieldsToBeUpdated{
	done? : boolean,
	title?: string,
	resourceLink?: string,
	notes?: string,
	difficulty? : "easy"|"medium"|"hard",
	platform? : string,
	link? : string
}
export interface updateQuestionRequestType{
	sheetId: string,
	folderId: string,
	questionId: string,
	fieldToBeUpdated: FieldsToBeUpdated
}