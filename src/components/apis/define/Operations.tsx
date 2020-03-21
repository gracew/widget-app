import { Checkbox } from "@blueprintjs/core";
import React, { useState } from "react";
import { FieldDefinition, OperationDefinition } from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { Arrows } from "../../Arrows";
import { ListOptions } from "../define/ListOptions";

interface OperationsProps {
  saveDefinition: (operations: OperationDefinition) => any;
  fields: FieldDefinition[];
  definition: OperationDefinition;
}

export function Operations({
  fields,
  definition,
  saveDefinition
}: OperationsProps) {
  const [create, setCreate] = useState(definition.create.enabled);
  const [read, setRead] = useState(definition.read.enabled);
  const [list, setList] = useState(definition.list.enabled);
  const [sort, setSort] = useState(definition.list.sort);
  const [filter, setFilter] = useState(definition.list.filter);

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
          saveDefinition({
            create: { enabled: create },
            read: { enabled: read },
            list: { enabled: list, sort, filter }
          })
        }
      />
    </div>
  );
}
