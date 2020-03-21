import { Button, ControlGroup, HTMLSelect, Tooltip } from "@blueprintjs/core";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { TestToken } from "../../../graphql/types";
import { MONACO_OPTIONS } from "../../../monaco";
import "./FormAndResult.css";

interface FormAndResultProps {
  testTokens: TestToken[];
  children: any;
  output: string;
  copyText: (token: string) => string;
  onSubmit: (token: string) => void;
}

export function FormAndResult({
  testTokens,
  children,
  copyText,
  output,
  onSubmit
}: FormAndResultProps) {
  // TODO(gracew): fix this...
  const [token, setToken] = useState(testTokens[0].token);

  const pretty = output && JSON.stringify(JSON.parse(output), null, 2);
  const numLines = pretty.split("\n").length;
  const height = numLines * 20;
  const boundedHeight = Math.max(100, Math.min(height, 500));

  return (
    <div className="wi-form-result">
      <div className="wi-form">
        {children}
        <ControlGroup className="wi-form-buttons">
          <Button
            icon="play"
            text="Run"
            intent="primary"
            onClick={() => onSubmit(token)}
          />
          <HTMLSelect
            value={token}
            onChange={(e: any) => setToken(e.currentTarget.value)}
          >
            {testTokens.map(({ label, token }) => (
              <option key={label} value={token}>
                as {label}
              </option>
            ))}
          </HTMLSelect>
        </ControlGroup>
        <Tooltip className="wi-form-copy" content="Copy cURL">
          <Button
            icon="duplicate"
            onClick={() => navigator.clipboard.writeText(copyText(token))}
            minimal={true}
          />
        </Tooltip>
      </div>
      <div className="wi-result">
        <MonacoEditor
          width="330"
          height={boundedHeight}
          language="json"
          theme="vs-dark"
          value={pretty}
          options={MONACO_OPTIONS}
        />
      </div>
    </div>
  );
}
