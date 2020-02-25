import { Button, HTMLSelect, InputGroup } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";

interface IListObjectProps {
  definition: any;
}

// TODO(gracew): would be nice to substitute the name of the API
export function ListObject({ definition }: IListObjectProps) {
  const includeList = definition.operations.find(
    (el: any) => el.type === "LIST"
  );
  return (
    <div>
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
      <div>
        Filter by:
        <HTMLSelect id="filter">
          {includeList.filter.map((name: string) => (
            <option value={name}>{name}</option>
          ))}
        </HTMLSelect>
        <InputGroup />
      </div>
      <Button icon="play" text="Run" intent="primary" />
      <Button icon="duplicate" text="Copy cURL" />
      <MonacoEditor width="300" height="30" theme="vs-dark" value="output" />
    </div>
  );
}
