import { Checkbox } from "@blueprintjs/core";
import React from "react";
import { FieldDefinition, OperationDefinition } from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { ListOptions } from "../define/ListOptions";

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
        <ListOptions
          fieldNames={fields.map(f => f.name).concat([CREATED_AT, CREATED_BY])}
          sort={operations.list.sort}
          setSort={sort =>
            setOperations({ ...operations, list: { ...operations.list, sort } })
          }
          filter={operations.list.filter}
          setFilter={filter =>
            setOperations({
              ...operations,
              list: { ...operations.list, filter }
            })
          }
        />
      )}
    </div>
  );
}
