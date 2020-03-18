import { Button, HTMLTable, Icon, Tooltip } from "@blueprintjs/core";
import React from "react";
import { Constraint, FieldDefinition, Type } from "../../../graphql/types";
import { TYPES } from "../../../strings";
import "./FieldTable.css";

interface FieldTableProps {
  fields: FieldDefinition[];
  selectField: (f: FieldDefinition) => void;
  deleteField: (f: FieldDefinition) => void;
}

export function FieldTable({
  fields,
  selectField,
  deleteField
}: FieldTableProps) {
  return (
    <HTMLTable className="wi-field-table" striped={true}>
      <thead>
        <tr>
          <th>Field Name</th>
          <th>Field Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>createdBy</code>
          </td>
          <td>{TYPES[Type.String]}</td>
          <td></td>
        </tr>
        <tr>
          <td>
            <code>createdAt</code>
          </td>
          <td>{TYPES[Type.String]}</td>
          <td></td>
        </tr>
        {fields.map((f, i) => (
          <tr key={f.name}>
            <td>
              <code>{f.name}</code>
            </td>
            <td>
              {displayType(f)}
              {f.customLogicPopulated && (
                <Tooltip
                  className="wi-field-icon"
                  content="Value is populated by custom logic"
                >
                  <Icon icon="code" />
                </Tooltip>
              )}
              {f.constraints && constraintsDefined(f.constraints) && (
                <Tooltip
                  className="wi-field-icon"
                  content="Value is subject to constraints"
                >
                  <Icon icon="filter" />
                </Tooltip>
              )}
            </td>
            <td className="wi-td-button">
              <Button
                icon="edit"
                minimal={true}
                onClick={() => selectField(f)}
              />
              <Button
                icon="trash"
                minimal={true}
                onClick={() => deleteField(f)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}

function displayType(def: FieldDefinition) {
  const base = TYPES[def.type];
  if (def.optional) {
    return `${base} (optional)`;
  }
  if (def.list) {
    return `${base} (list)`;
  }
  return base;
}

function constraintsDefined(c: Constraint) {
  for (const [k, v] of Object.entries(c)) {
    if (k !== "__typename" && v) {
      return true;
    }
  }
  return false;
}
