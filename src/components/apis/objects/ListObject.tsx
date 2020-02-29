import {
  FormGroup,
  HTMLSelect,
  InputGroup,
  NumericInput
} from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition, TestToken } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface IListObjectProps {
  definition: ApiDefinition;
  testTokens: TestToken[];
}

export function ListObject({ definition, testTokens }: IListObjectProps) {
  const includeList = definition.operations.find(
    (el: any) => el.type === "LIST"
  );
  const [pageSize, setPageSize] = useState();
  const [output, setOutput] = useState("");
  const onSubmit = (token: string) => {
    const query = pageSize ? `?pageSize=${pageSize}` : "";
    fetch(`http://localhost:8080/apis/${definition.name}/STAGING${query}`, {
      headers: {
        "X-Parse-Session-Token": token
      }
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  };
  return (
    <FormAndResult testTokens={testTokens} output={output} onSubmit={onSubmit}>
      {includeList && includeList.sort && includeList.sort.length > 0 && (
        <div>
          Sort by:
          <HTMLSelect id="sort">
            {includeList.sort.map(
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
      <FormGroup label="Page Size (default 100)">
        <NumericInput onValueChange={(num: number) => setPageSize(num)} />
      </FormGroup>
    </FormAndResult>
  );
}
