import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./FormAndResult.css";

interface IFormAndResultProps {
  children: any;
}

// TODO(gracew): would be nice to substitute the name of the API
export function FormAndResult({ children }: IFormAndResultProps) {
  return (
    <div className="wi-form-result">
      <div className="wi-form">{children}</div>
      <div className="wi-result">
        <MonacoEditor width="330" height="100" theme="vs-dark" value="output" />
      </div>
    </div>
  );
}
