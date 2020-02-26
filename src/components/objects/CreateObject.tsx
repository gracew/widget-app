import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";
import { FormAndResult } from "./FormAndResult";

interface ICreateObjectProps {
  // TODO(gracew): type/generate this
  definition: any;
}

// TODO(gracew): would be nice to substitute the name of the API
export function CreateObject({ definition }: ICreateObjectProps) {
  return (
    <FormAndResult>
      {definition.fields.map(({ name }: { name: string }) => (
        <FormGroup key={name} label={name}>
          <InputGroup />
        </FormGroup>
      ))}
      <Button icon="play" text="Run" intent="primary" />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
