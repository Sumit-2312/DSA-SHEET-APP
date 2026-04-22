export interface updateQuestionRequestType{
	mark? : boolean,
	title?: string,
	resourceLink?: string,
	notes?: string,
	difficulty? : "easy"|"medium"|"hard",
	platform? : string,
	link? : string
}