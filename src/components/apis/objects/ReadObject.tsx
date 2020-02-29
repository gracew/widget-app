import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition, TestToken } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface IReadObjectProps {
  definition: ApiDefinition;
  testTokens: TestToken[];
}

export function ReadObject({ definition, testTokens }: IReadObjectProps) {
  const [objectId, setObjectId] = useState("");
  const [output, setOutput] = useState("");
  const onSubmit = (token: string) =>
    fetch(`http://localhost:8080/apis/${definition.name}/STAGING/${objectId}`, {
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
