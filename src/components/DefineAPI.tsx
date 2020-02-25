import { useMutation } from "@apollo/react-hooks";
import { Button, FileInput } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useHistory } from "react-router-dom";
import { DEPLOY } from "../routes";
import "./DefineAPI.css";

const DEFINE_API = gql`
  mutation DefineAPI($rawDefinition: String!) {
    defineAPI(input: { rawDefinition: $rawDefinition }) {
      id
    }
  }
`;

const EXAMPLE = `
{
  "name": "Game",
  "fields": [{ "name": "name", "type": "String!" }],
  "operations": []
}
`;

export function DefineAPI() {
  const history = useHistory();
  const [defineApi, _] = useMutation(DEFINE_API);
  let text = EXAMPLE;

  async function handleNext() {
    const { data } = await defineApi({ variables: { rawDefinition: text } });
    history.push(`/${data.defineAPI.id}${DEPLOY}`);
  }

  return (
    <div>
      <h2>Define your API</h2>
      <MonacoEditor
        width="800"
        height="600"
        theme="vs-dark"
        value={EXAMPLE}
        onChange={newValue => {
          text = newValue;
        }}
      />
      <div className="upload-api">
        <p>Upload a file instead</p>
        <FileInput text="Choose file..." />
      </div>
      <div className="arrows">
        <Button rightIcon="arrow-right" onClick={handleNext} />
      </div>
    </div>
  );
}
