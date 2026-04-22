import  type { basicResponseType } from "./basicResponseType.js";

export interface singleSheetData {
	id : string,
	name: string
}
export interface getSheetDetailResponseType extends basicResponseType  {
	sheets? : singleSheetData[]
}