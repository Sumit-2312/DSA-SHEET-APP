import { atom } from "recoil";

const codeState = atom({
  key: "codeState",
  default: "// start coding here...",
});

export default codeState;