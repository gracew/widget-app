import { Button, HTMLSelect, InputGroup } from "@blueprintjs/core";
import React from "react";
import { FormAndResult } from "./FormAndResult";

interface IListObjectProps {
  definition: any;
}

// TODO(gracew): would be nice to substitute the name of the API
export function ListObject({ definition }: IListObjectProps) {
  const includeList = definition.operations.find(
    (el: any) => el.type === "LIST"
  );
  return (
    <FormAndResult>
      {includeList.sort && includeList.sort.length > 0 && (
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
      {includeList.filter && includeList.filter.length > 0 && (
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
      <Button icon="play" text="Run" intent="primary" />
      <Button icon="duplicate" text="Copy cURL" />
    </FormAndResult>
  );
}
