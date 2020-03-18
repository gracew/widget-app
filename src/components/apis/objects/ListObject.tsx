import {
  FormGroup,
  HTMLSelect,
  InputGroup,
  NumericInput
} from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition, TestToken } from "../../../graphql/types";
import { FormAndResult } from "./FormAndResult";

interface ListObjectProps {
  apiId: string;
  definition: ApiDefinition;
  testTokens: TestToken[];
}

export function ListObject({ apiId, definition, testTokens }: ListObjectProps) {
  const list = definition.operations.list;
  const [pageSize, setPageSize] = useState<number | undefined>();
  const [output, setOutput] = useState("");
  const onSubmit = (token: string) => {
    const query = pageSize ? `?pageSize=${pageSize}` : "";
    fetch(`http://localhost:8081/${query}`, {
      headers: {
        "X-Parse-Session-Token": token
      }
    })
      .then(res => res.text())
      .then(t => setOutput(t));
  };
  const copyText = (token: string) => {
    const query = pageSize ? `?pageSize=${pageSize}` : "";
    return `curl -H "X-Parse-Session-Token: ${token}" http://localhost:8081/${query}`;
  };
  return (
    <FormAndResult
      testTokens={testTokens}
      output={output}
      copyText={copyText}
      onSubmit={onSubmit}
    >
      {list && list.sort.length > 0 && (
        <div>
          Sort by:
          <HTMLSelect id="sort">
            {list.sort.map(
              ({ field, order }: { field: string; order: string }) => (
                <option value={field + order}>
                  {field} {order}
                </option>
              )
            )}
          </HTMLSelect>
        </div>
      )}
      {list && list.filter.length > 0 && (
        <div>
          Filter by:
          <HTMLSelect id="filter">
            {list.filter.map((name: string) => (
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
