import {
  FormGroup,
  HTMLSelect,
  NumericInput,
  ControlGroup
} from "@blueprintjs/core";
import React, { useState } from "react";
import {
  FieldDefinition,
  OperationDefinition,
  TestToken
} from "../../../graphql/types";
import { FieldInput } from "./FieldInput";
import { FormAndResult } from "./FormAndResult";
import "./ListObject.css";

interface ListObjectProps {
  fields: FieldDefinition[];
  operations: OperationDefinition;
  testTokens: TestToken[];
}

export function ListObject({
  fields,
  operations,
  testTokens
}: ListObjectProps) {
  const [pageSize, setPageSize] = useState<number | undefined>();
  const [filterField, setFilterField] = useState<string | undefined>(
    operations.list.filter.length > 0 ? operations.list.filter[0] : undefined
  );
  const [filterValue, setFilterValue] = useState<any>();
  const [output, setOutput] = useState("");
  const queryParams: string[] = []
  if (pageSize) {
    queryParams.push("pageSize=" + pageSize)
  }
  if (filterValue !== undefined) {
    queryParams.push(filterField + "=" + filterValue)
  }
  const onSubmit = (token: string) => {
    const query = queryParams.length > 0 ? "?" + queryParams.join("&") : "";
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
      {operations.list.sort.length > 0 && (
        <div className="wi-list-option">
          Sort by:
          <HTMLSelect className="wi-sort-select">
            {operations.list.sort.map(
              ({ field, order }: { field: string; order: string }) => (
                <option key={field + order} value={field + order}>
                  {field} {order}
                </option>
              )
            )}
          </HTMLSelect>
        </div>
      )}
      {operations.list.filter.length > 0 && (
        <div className="wi-list-option">
          Filter by:
          <ControlGroup className="wi-list-filter">
            <HTMLSelect
              value={filterField}
              onChange={(e: any) => setFilterField(e.currentTarget.value)}
            >
              {operations.list.filter.map((name: string) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </HTMLSelect>
            <FieldInput
              definition={fields.find(f => f.name == filterField)!}
              value={filterValue}
              setValue={setFilterValue}
              hideLabel={true}
            />
          </ControlGroup>
        </div>
      )}
      <FormGroup className="wi-list-option" label="Page Size (default 100)">
        <NumericInput onValueChange={(num: number) => setPageSize(num)} />
      </FormGroup>
    </FormAndResult>
  );
}
