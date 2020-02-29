import { Button, ControlGroup, HTMLSelect } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition } from "../../graphql/types";
import { FieldInput } from "./FieldInput";
import { FormAndResult } from "./FormAndResult";

interface ICreateObjectProps {
  definition: ApiDefinition;
}

export function CreateObject({ definition }: ICreateObjectProps) {
  const [output, setOutput] = useState("");
  const [token, setToken] = useState("r:97ab61c3717020ac1ef6366e0a365971");
  const initialInput: Record<string, any> = {};
  const [input, setInput] = useState(initialInput);
  const onRun = () =>
    // TODO(gracew): don't hardcode this
    fetch(`http://localhost:8080/apis/${definition.name}/STAGING`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Parse-Session-Token": token
      },
      body: JSON.stringify(input)
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  return (
    <FormAndResult output={output}>
      {definition.fields.map(fieldDef => (
        <FieldInput
          key={fieldDef.name}
          definition={fieldDef}
          value={input[fieldDef.name]}
          setValue={(val: any) => setInput({ ...input, [fieldDef.name]: val })}
        />
      ))}
      <ControlGroup>
        <Button icon="play" text="Run" intent="primary" onClick={onRun} />
        <HTMLSelect
          required
          value={token}
          onChange={(e: any) => setToken(e.currentTarget.value)}
        >
          <option value="r:97ab61c3717020ac1ef6366e0a365971">testUser1</option>
          <option value="r:12327f28fffe4198a812b37d4c09c3b4">testUser2</option>
        </HTMLSelect>
      </ControlGroup>
    </FormAndResult>
  );
}
