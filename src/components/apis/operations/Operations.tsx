import { Checkbox } from "@blueprintjs/core";
import React from "react";
import {
  ActionDefinition,
  FieldDefinition,
  OperationDefinition
} from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { ActionTable } from "./ActionTable";
import { FieldMultiSelect } from "./FieldMultiSelect";
import "./Operations.css";
import { SortMultiSelect } from "./SortMultiSelect";

interface OperationsProps {
  operations: OperationDefinition;
  setOperations: (operations: OperationDefinition) => any;
  fields: FieldDefinition[];
}

export function Operations({
  operations,
  setOperations,
  fields
}: OperationsProps) {
  const userFieldNames = fields.map(f => f.name);
  const fieldNames = userFieldNames.concat([CREATED_AT, CREATED_BY]);
  return (
    <div>
      <Checkbox
        checked={operations.create.enabled}
        label="Create"
        onChange={() =>
          setOperations({
            ...operations,
            create: { enabled: !operations.create.enabled }
          })
        }
      />
      <Checkbox
        checked={operations.read.enabled}
        label="Read"
        onChange={() =>
          setOperations({
            ...operations,
            read: { enabled: !operations.read.enabled }
          })
        }
      />
      <Checkbox
        checked={operations.list.enabled}
        label="List"
        onChange={() =>
          setOperations({
            ...operations,
            list: { ...operations.list, enabled: !operations.list.enabled }
          })
        }
      />
      {operations.list.enabled && (
        <div className="wi-list-options">
          <h4>Sort Options</h4>
          <SortMultiSelect
            fieldNames={fieldNames}
            selected={operations.list.sort}
            setSelected={sort =>
              setOperations({
                ...operations,
                list: { ...operations.list, sort }
              })
            }
          />

          <h4>Filter Options</h4>
          <FieldMultiSelect
            fieldNames={fieldNames}
            selected={operations.list.filter}
            setSelected={filter =>
              setOperations({
                ...operations,
                list: { ...operations.list, filter }
              })
            }
          />
        </div>
      )}
      <Checkbox
        checked={operations.update.enabled}
        label="Update"
        onChange={() =>
          setOperations({
            ...operations,
            update: {
              ...operations.update,
              enabled: !operations.update.enabled
            }
          })
        }
      />
      {operations.update.enabled && (
        <ActionTable
          fieldNames={userFieldNames}
          actions={operations.update.actions}
          saveAction={(a: ActionDefinition, i?: number) => {
            const actions = operations.update.actions;
            if (i !== undefined) {
              actions[i] = a;
            } else {
              actions.push(a);
            }
            setOperations({
              ...operations,
              update: {
                ...operations.update,
                actions
              }
            });
          }}
          deleteAction={(a: ActionDefinition) =>
            setOperations({
              ...operations,
              update: {
                ...operations.update,
                actions: operations.update.actions.filter(
                  action => action.name !== a.name
                )
              }
            })
          }
        />
      )}
      <Checkbox
        checked={operations.delete.enabled}
        label="Delete"
        onChange={() =>
          setOperations({
            ...operations,
            delete: { enabled: !operations.delete.enabled }
          })
        }
      />
    </div>
  );
}
