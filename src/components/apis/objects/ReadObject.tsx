import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition, TestToken } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface ReadObjectProps {
  apiId: string;
  definition: ApiDefinition;
  testTokens: TestToken[];
}

export function ReadObject({ apiId, definition, testTokens }: ReadObjectProps) {
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
  return (
    <FormAndResult testTokens={testTokens} output={output} onSubmit={onSubmit}>
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
