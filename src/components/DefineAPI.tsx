import { Button, FileInput } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useHistory, useParams } from "react-router-dom";
import { DEPLOY } from "../routes";
import "./DefineAPI.css";

export function DefineAPI() {
  const history = useHistory();
  const { id } = useParams();
  const handleNext = () => history.push(`/${id}${DEPLOY}`);
  return (
    <div>
      <h2>Define your API</h2>
      <MonacoEditor
        width="800"
        height="600"
        theme="vs-dark"
        value="hello world!"
      />
      <div className="upload-api">
        <p>Upload a file instead</p>
        <FileInput text="Choose file..." />
      </div>
      <div className="arrows">
        <Button icon="arrow-left" onClick={history.goBack} />
        <Button rightIcon="arrow-right" onClick={handleNext} />
      </div>
    </div>
  );
}
