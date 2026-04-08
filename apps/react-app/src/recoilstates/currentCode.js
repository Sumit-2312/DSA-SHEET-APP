import { atom } from "recoil";



// const startingCode = {
//   "javascript": `
//         let name = "John";

//         function greet() {
//             console.log("Hello " + name);
//         }

//         greet();
//       `,
//   "c++":`
//         #include <iostream>
//         using namespace std;

//         int main() {
//           cout << "Hello, World!";
//           return 0;
//         }
//       `
// }

// const language = useRecoilValue(currentCodeLanguageState)

const codeState = atom({
  key: "codeState",
  default: "//write your code"
});

export default codeState;