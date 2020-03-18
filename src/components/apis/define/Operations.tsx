import { Checkbox } from "@blueprintjs/core";
import React, { useState } from "react";
import { ApiDefinition } from "../../../graphql/types";
import { Arrows } from "../../Arrows";
import { ListOptions } from "../define/ListOptions";

interface OperationsProps {
  definition: ApiDefinition;
}

export function Operations({ definition }: OperationsProps) {
  const [create, setCreate] = useState(!!definition.operations.create);
  const [read, setRead] = useState(!!definition.operations.read);
  const [list, setList] = useState(definition.operations.list);

  const fieldNames = definition.fields.map(f => f.name);

  return (
    <div>
      <Checkbox
        checked={create}
        label="Create"
        onChange={() => setCreate(!create)}
      />
      <Checkbox checked={read} label="Read" onChange={() => setRead(!read)} />
      <Checkbox checked={list !== undefined} label="List" />
      {list && (
        <ListOptions fieldNames={fieldNames} list={list} setList={setList} />
      )}
      <Arrows next={() => "foo"} />
    </div>
  );
}
