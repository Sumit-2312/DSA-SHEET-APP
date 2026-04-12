import { selector } from "recoil";
import sheetContent from "./sheetContent";
import { currentSheet } from "./currentSheet";

export const currentSheetContent = selector({
    key: "currentSheetContent",

    //  READ
    get: ({ get }) => {
        const currSheet = get(currentSheet); // get the name of current sheet
        const content = get(sheetContent);// content of all the sheets
        return content.find((st) => st.sheet === currSheet) || [];
    },

    //  WRITE
    set: ({ get, set }, newValue) => {
        const currSheet = get(currentSheet);
        const content = get(sheetContent);

        const updated = content.map((st) =>
            st.sheet === currSheet ? newValue : st
        );

        set(sheetContent, updated);
    },
});