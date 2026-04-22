import { atom } from "recoil";

export const addFolderModalState = atom<boolean>({
  key: "addFolderModalState",
  default: false,
});