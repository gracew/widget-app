import { Button, HTMLSelect, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { FormAndResult } from "./FormAndResult";

interface IListObjectProps {
  definition: any;
}

export function ListObject({ definition }: IListObjectProps) {
  const includeList = definition.operations.find(
    (el: any) => el.type === "LIST"
  );
  const [output, setOutput] = useState("");
  const onClick = () =>
    fetch(`http://localhost:8080/apis/${definition.name}/STAGING`)
      .then(res => res.text())
      .then(t => setOutput(t));
  return (
    <FormAndResult output={output}>
      {includeList && includeList.sort && includeList.sort.length > 0 && (
        <div>
          Sort by:
          <HTMLSelect id="sort">
            {includeList.map(
              ({ field, order }: { field: string; order: string }) => (
                <option value={field + order}>
                  {field} {order}
                </option>
              )
            )}
          </HTMLSelect>
        </div>
      )}
      {includeList && includeList.filter && includeList.filter.length > 0 && (
        <div>
          Filter by:
          <HTMLSelect id="filter">
            {includeList.filter.map((name: string) => (
              <option value={name}>{name}</option>
            ))}
          </HTMLSelect>
          <InputGroup />
        </div>
      )}
      <Button icon="play" text="Run" intent="primary" onClick={onClick} />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
