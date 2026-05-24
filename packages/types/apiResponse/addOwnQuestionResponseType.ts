import type { basicResponseType } from "./basicResponseType";
import type { Question } from "./getSheetDataResponseType.js";

export interface AddOwnQuestionResponseType extends basicResponseType {
    Question: Question
}