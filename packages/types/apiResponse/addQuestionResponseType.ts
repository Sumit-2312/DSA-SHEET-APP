import type { basicResponseType } from "./basicResponseType.js";
import type { Question } from "./getSheetDataResponseType.js";
export interface addQuestionResponseType extends basicResponseType{
	Question : Question
}