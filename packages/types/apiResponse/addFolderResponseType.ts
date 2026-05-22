
import type { basicResponseType } from "./basicResponseType.js";
import type { Folder } from "./getSheetDataResponseType.js";

export interface addFolderResponseType extends basicResponseType{
	Folder: Folder
}