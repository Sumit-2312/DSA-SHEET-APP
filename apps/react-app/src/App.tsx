import Editor from "@monaco-editor/react";
import { useRecoilState } from "recoil";
import { codeState } from './recoilstates/currentCode.js';

function App() {
  const [code, setCode] = useRecoilState(codeState);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <Editor
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        height="90vh"
        width="90vw"
        theme="vs-dark"
      />
    </div>
  );
}

export default App;