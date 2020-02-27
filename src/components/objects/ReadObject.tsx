import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { FormAndResult } from "./FormAndResult";

interface IReadObjectProps {
  deployId: string;
}

// TODO(gracew): would be nice to substitute the name of the API
export function ReadObject({ deployId }: IReadObjectProps) {
  const [objectId, setObjectId] = useState("");
  const [output, setOutput] = useState("");
  const onClick = () =>
    fetch(`http://localhost:8080/apis/${deployId}/${objectId}`)
      .then(res => res.text())
      .then(t => setOutput(t));
  return (
    <FormAndResult output={output}>
      <FormGroup label="id">
        <InputGroup
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setObjectId(e.target.value)
          }
        />
      </FormGroup>
      <Button icon="play" text="Run" intent="primary" onClick={onClick} />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
