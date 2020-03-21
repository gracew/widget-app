import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { TestToken } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface ReadObjectProps {
  testTokens: TestToken[];
}

export function ReadObject({ testTokens }: ReadObjectProps) {
  const [objectId, setObjectId] = useState("");
  const [output, setOutput] = useState("");
  const onSubmit = (token: string) =>
    fetch(`http://localhost:8081/${objectId}`, {
      headers: {
        "X-Parse-Session-Token": token
      }
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  const copyText = (token: string) =>
    `curl -H "X-Parse-Session-Token: ${token}" http://localhost:8081/${objectId}`;
  return (
    <FormAndResult
      testTokens={testTokens}
      output={output}
      copyText={copyText}
      onSubmit={onSubmit}
    >
      <FormGroup label="id">
        <InputGroup
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setObjectId(e.target.value)
          }
        />
      </FormGroup>
    </FormAndResult>
  );
}
