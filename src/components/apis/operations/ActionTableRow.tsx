import { Button, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { ActionDefinition } from "../../../graphql/types";
import { FieldMultiSelect } from "./FieldMultiSelect";

interface ActionTableProps {
  fieldNames: string[];
  saveAction: (f: ActionDefinition) => void;
  action?: ActionDefinition;
}

export function ActionTableRow({
  fieldNames,
  saveAction,
  action
}: ActionTableProps) {
  const [name, setName] = useState((action && action.name) || "");
  const [fields, setFields] = useState((action && action.fields) || []);

  return (
    <tr>
      <td>
        <InputGroup
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </td>
      <td>
        <FieldMultiSelect
          fieldNames={fieldNames}
          selected={fields}
          setSelected={setFields}
        />
      </td>
      <td>
        <Button
          text="Save"
          intent="primary"
          onClick={() => {
            saveAction({ name, fields });
            setName("");
            setFields([]);
          }}
        />
      </td>
    </tr>
  );
}
