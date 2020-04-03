import React, { useState } from "react";
import { FieldDefinition, TestToken } from "../../../graphql/types";
import { FieldInput } from "./FieldInput";
import { FormAndResult } from "./FormAndResult";

interface CreateObjectProps {
  fields: FieldDefinition[];
  testTokens: TestToken[];
}

export function CreateObject({ fields, testTokens }: CreateObjectProps) {
  const [output, setOutput] = useState("");
  const initialInput: Record<string, any> = {};
  const [status, setStatus] = useState("");
  const [input, setInput] = useState(initialInput);
  const onSubmit = (token: string) =>
    // TODO(gracew): don't hardcode this
    fetch(`http://localhost:8081/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Parse-Session-Token": token
      },
      body: JSON.stringify(input)
    }).then(res =>
      res.text().then(t => {
        setStatus(res.status + " " + res.statusText)
        setOutput(t);
      })
    );
  const copyText = (token: string) =>
    `curl -XPOST -H "Content-type: application/json" -H "X-Parse-Session-Token: ${token}" http://localhost:8081/ -d '${JSON.stringify(
      input
    )}'`;
  return (
    <FormAndResult
      testTokens={testTokens}
      status={status}
      output={output}
      copyText={copyText}
      onSubmit={onSubmit}
    >
      {fields
        .filter(fieldDef => !fieldDef.customLogicPopulated)
        .map(fieldDef => (
          <FieldInput
            key={fieldDef.name}
            definition={fieldDef}
            value={input[fieldDef.name]}
            setValue={(val: any) =>
              setInput({ ...input, [fieldDef.name]: val })
            }
          />
        ))}
    </FormAndResult>
  );
}
