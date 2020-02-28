import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface ICreateObjectProps {
  definition: ApiDefinition;
}

export function CreateObject({ definition }: ICreateObjectProps) {
  const [output, setOutput] = useState("");
  const objectData: Record<string, string> = {};
  const onInputChange = (key: string, value: string) => {
    objectData[key] = value;
  };
  const onRun = () =>
    // TODO(gracew): don't hardcode this
    fetch(`http://localhost:8080/apis/${definition.name}/STAGING`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(objectData)
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  return (
    <FormAndResult output={output}>
      {definition.fields.map(({ name }: { name: string }) => (
        <FormGroup key={name} label={name}>
          <InputGroup
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange(name, e.target.value)
            }
          />
        </FormGroup>
      ))}
      <Button icon="play" text="Run" intent="primary" onClick={onRun} />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
