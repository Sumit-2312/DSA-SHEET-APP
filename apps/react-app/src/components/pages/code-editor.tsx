import { Editor } from '@monaco-editor/react';
import React from 'react'
import { useRecoilState } from 'recoil';
import codeState from '../../recoilstates/currentCode.js';

function CodeEditor() {
      const [code, setCode] = useRecoilState(codeState);

  return (
    <div>
    <Editor
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        height="90vh"
        width="90vw"
        theme="vs-dark"
      />
    </div>
  )
}

export default CodeEditor;