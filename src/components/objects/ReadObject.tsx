import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";
import { FormAndResult } from "./FormAndResult";

interface IReadObjectProps {
  // TODO(gracew): type/generate this
  definition: any;
}

// TODO(gracew): would be nice to substitute the name of the API
export function ReadObject({ definition }: IReadObjectProps) {
  return (
    <FormAndResult>
      <FormGroup label="id">
        <InputGroup />
      </FormGroup>
      <Button icon="play" text="Run" intent="primary" />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
