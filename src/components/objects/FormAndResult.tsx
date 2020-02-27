import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./FormAndResult.css";

interface IFormAndResultProps {
  children: any;
  output: string;
}

const MINIMAP_DISABLED = {
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false
  }
};
// TODO(gracew): would be nice to substitute the name of the API
export function FormAndResult({ children, output }: IFormAndResultProps) {
  const pretty = output && JSON.stringify(JSON.parse(output), null, 2);
  const numLines = pretty.split("\n").length;
  const height = numLines * 20;
  const boundedHeight = Math.max(100, Math.min(height, 500));
  return (
    <div className="wi-form-result">
      <div className="wi-form">{children}</div>
      <div className="wi-result">
        <MonacoEditor
          width="330"
          height={boundedHeight}
          theme="vs-dark"
          value={pretty}
          options={MINIMAP_DISABLED}
        />
      </div>
    </div>
  );
}
