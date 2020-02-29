import { useMutation } from "@apollo/react-hooks";
import { FileInput, FormGroup } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useHistory } from "react-router-dom";
import { AUTH_API } from "../routes";
import { Arrows } from "./Arrows";
import "./DefineAPI.css";
import { ALL_APIS } from "./ListAPIs";

const DEFINE_API = gql`
  mutation DefineAPI($rawDefinition: String!) {
    defineAPI(input: { rawDefinition: $rawDefinition }) {
      id
      name
    }
  }
`;

const EXAMPLE = `{
  "name": "GameScore",
  "fields": [
    {
      "name": "name",
      "type": "STRING",
      "constraints": {
        "minLength": 2,
        "maxLength": 100
      }
    },
    {
      "name": "score",
      "type": "FLOAT",
      "constraints": {
        "minFloat": 0,
        "maxFloat": 100
      }
    }
  ],
  "operations": []
}
`;

export function DefineAPI() {
  const history = useHistory();
  const [defineApi, _] = useMutation(DEFINE_API, {
    update(cache, { data: { defineAPI } }) {
      const cachedRes: any = cache.readQuery({ query: ALL_APIS });
      const apis = (cachedRes && cachedRes.apis) || [];
      cache.writeQuery({
        query: ALL_APIS,
        data: { apis: apis.concat([defineAPI]) }
      });
    }
  });
  let text = EXAMPLE;

  async function handleNext() {
    const { data } = await defineApi({ variables: { rawDefinition: text } });
    history.push(AUTH_API(data.defineAPI.id));
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
        value={text}
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
