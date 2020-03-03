import { Button, ControlGroup, HTMLSelect } from "@blueprintjs/core";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { TestToken } from "../../../graphql/types";
import "./FormAndResult.css";

interface IFormAndResultProps {
  testTokens: TestToken[];
  children: any;
  output: string;
  onSubmit: (token: string) => void;
}

const MONACO_OPTIONS = {
  scrollBeyondLastLine: false,
  minimap: { enabled: false }
};

export function FormAndResult({
  testTokens,
  children,
  output,
  onSubmit
}: IFormAndResultProps) {
  const [token, setToken] = useState("");

  const pretty = output && JSON.stringify(JSON.parse(output), null, 2);
  const numLines = pretty.split("\n").length;
  const height = numLines * 20;
  const boundedHeight = Math.max(100, Math.min(height, 500));

  return (
    <div className="wi-form-result">
      <div className="wi-form">
        {children}
        <ControlGroup>
          <Button
            icon="play"
            text="Run"
            intent="primary"
            onClick={() => onSubmit(token)}
          />
          <HTMLSelect
            required
            value={token}
            onChange={(e: any) => setToken(e.currentTarget.value)}
          >
            <option selected>Run as...</option>
            {testTokens.map(({ label, token }) => (
              <option key={label} value={token}>
                {label}
              </option>
            ))}
          </HTMLSelect>
        </ControlGroup>
      </div>
      <div className="wi-result">
        <MonacoEditor
          width="330"
          height={boundedHeight}
          theme="vs-dark"
          value={pretty}
          options={MONACO_OPTIONS}
        />
      </div>
    </div>
  );
}
