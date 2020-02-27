import { useMutation } from "@apollo/react-hooks";
import { FileInput, FormGroup } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useHistory } from "react-router-dom";
import { DEPLOY_API } from "../routes";
import { Arrows } from "./Arrows";
import "./DefineAPI.css";

const DEFINE_API = gql`
  mutation DefineAPI($rawDefinition: String!) {
    defineAPI(input: { rawDefinition: $rawDefinition }) {
      id
    }
  }
`;

const EXAMPLE = `{
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
    history.push(DEPLOY_API(data.defineAPI.id));
  }
  const MONACO_OPTIONS = {
    scrollBeyondLastLine: false,
    minimap: { enabled: false }
  };

  return (
    <div>
      <h2>New API</h2>
      <MonacoEditor
        width="700"
        height="400"
        theme="vs-dark"
        value={EXAMPLE}
        language="json"
        onChange={newValue => {
          text = newValue;
        }}
        options={MONACO_OPTIONS}
      />
      <FormGroup className="upload-file" label="Upload a file instead">
        <FileInput text="Choose file..." />
      </FormGroup>
      <Arrows next={handleNext} showBack={false} showNext={true} />
    </div>
  );
}
