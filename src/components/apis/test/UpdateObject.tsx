import React, { useState } from "react";
import {
  ActionDefinition,
  FieldDefinition,
  TestToken
} from "../../../graphql/types";
import { FieldInput } from "./FieldInput";
import { FormAndResult } from "./FormAndResult";

interface UpdateObjectProps {
  fields: FieldDefinition[];
  action: ActionDefinition;
  testTokens: TestToken[];
}

export function UpdateObject({
  fields,
  action,
  testTokens
}: UpdateObjectProps) {
  const [output, setOutput] = useState("");
  const initialInput: Record<string, any> = {};
  const [input, setInput] = useState(initialInput);

  const fieldsByName = Object.assign({}, ...fields.map(f => ({ [f.name]: f })));

  const onSubmit = (token: string) =>
    // TODO(gracew): don't hardcode this
    fetch(`http://localhost:8081/${action.name}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Parse-Session-Token": token
      },
      body: JSON.stringify(input)
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  const copyText = (token: string) =>
    `curl -XPOST -H "Content-type: application/json" -H "X-Parse-Session-Token: ${token}" http://localhost:8081/${
      action.name
    } -d '${JSON.stringify(input)}'`;

  return (
    <FormAndResult
      testTokens={testTokens}
      output={output}
      copyText={copyText}
      onSubmit={onSubmit}
    >
      {action.fields.map(name => (
        <FieldInput
          key={name}
          definition={fieldsByName[name]}
          value={input[name]}
          setValue={(val: any) => setInput({ ...input, [name]: val })}
        />
      ))}
    </FormAndResult>
  );
}
