import type { singleSheetData } from '@repo/types/apiResponse/getSheetDetailResponseType';
import {atom} from 'recoil';


export const currentSheet = atom<singleSheetData|null>({
    key: "currentSheet",
    default: null
})