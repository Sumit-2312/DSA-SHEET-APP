import type { SheetDataType } from "@repo/types/apiResponse/getSheetDataResponseType";
import { atom} from "recoil";

export const currentSheetContent = atom<SheetDataType|null>({
    key: "currentSheetContent",
    default: null
});