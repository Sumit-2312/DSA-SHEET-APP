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
  default: {
    name: "Sumit",
    email: "sumit@example.com",
    sheets: [
      {
        id: "1",
        name: "Striver DSA Sheet",
        totalQuestions: 191,
      },
      {
        id: "2",
        name: "Fraz Sheet",
        totalQuestions: 150,
      },
      {
        id: "3",
        name: "Custom Practice",
        totalQuestions: 75,
      },
    ],
  },
});