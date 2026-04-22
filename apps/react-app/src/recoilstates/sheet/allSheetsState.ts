import {atom} from "recoil";
import type {singleSheetData} from "@repo/types/apiResponse/getSheetDetailResponseType";


export const allSheetsState = atom<singleSheetData[]>({
    key:"allSheetsState",
    default: []
})

