import { atom } from "recoil";

export const userState = atom<{
  name: string;
  email: string;
  sheets: {
    id: string;
    name: string;
    totalQuestions: number;
  }[];
} | null>({
  key: "userState",
  default: null
});