import {atom} from 'recoil';

type currentSheetType = "Fraz"|"Striver"|"Custom";

export const currentSheet = atom<currentSheetType>({
    key: "currentSheet",
    default: "Fraz"
})