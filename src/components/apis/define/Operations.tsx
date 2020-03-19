import { Checkbox } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition, OperationDefinition } from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { Arrows } from "../../Arrows";
import { ListOptions } from "../define/ListOptions";

interface OperationsProps {
  saveDefinition: (operations: OperationDefinition) => any;
  definition: ApiDefinition;
}

export function Operations({ definition, saveDefinition }: OperationsProps) {
  const [create, setCreate] = useState(definition.operations.create.enabled);
  const [read, setRead] = useState(!!definition.operations.read.enabled);
  const [list, setList] = useState(!!definition.operations.list.enabled);
  const [sort, setSort] = useState(definition.operations.list.sort);
  const [filter, setFilter] = useState(definition.operations.list.filter);

  return (
    <div>
      <Checkbox
        checked={create}
        label="Create"
        onChange={() => setCreate(!create)}
      />
      <Checkbox checked={read} label="Read" onChange={() => setRead(!read)} />
      <Checkbox
        checked={!!list}
        label="List"
        onChange={() => {
          setList(!list);
        }}
      />
      {list && (
        <ListOptions
          fieldNames={definition.fields
            .map(f => f.name)
            .concat([CREATED_AT, CREATED_BY])}
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
