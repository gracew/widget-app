import { Checkbox } from "@blueprintjs/core";
import React, { useState } from "react";
import { FieldDefinition, OperationDefinition } from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { Arrows } from "../../Arrows";
import { ListOptions } from "../define/ListOptions";

interface OperationsProps {
  operations: OperationDefinition;
  saveOperations: (operations: OperationDefinition) => any;
  fields: FieldDefinition[];
}

export function Operations({
  operations,
  saveOperations,
  fields
}: OperationsProps) {
  const [create, setCreate] = useState(operations.create.enabled);
  const [read, setRead] = useState(operations.read.enabled);
  const [list, setList] = useState(operations.list.enabled);
  const [sort, setSort] = useState(operations.list.sort);
  const [filter, setFilter] = useState(operations.list.filter);

  return (
    <div>
      <Checkbox
        checked={create}
        label="Create"
        onChange={() => setCreate(!create)}
      />
      <Checkbox checked={read} label="Read" onChange={() => setRead(!read)} />
      <Checkbox
        checked={list}
        label="List"
        onChange={() => {
          setList(!list);
        }}
      />
      {list && (
        <ListOptions
          fieldNames={fields.map(f => f.name).concat([CREATED_AT, CREATED_BY])}
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
        />
      )}
      <Arrows
        next={() =>
          saveOperations({
            create: { enabled: create },
            read: { enabled: read },
            list: { enabled: list, sort, filter }
          })
        }
      />
    </div>
  );
}
