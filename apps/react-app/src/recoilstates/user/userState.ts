import { atom } from "recoil";

export const userState = atom<{
  name: string;
  email: string;
  sheets: {
    id: string;
    name: string;
  }[];
} | null>({
  key: "userState",
  default: null
});