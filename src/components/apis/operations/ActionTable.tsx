import { Button, HTMLTable, Tag } from "@blueprintjs/core";
import React, { useState } from "react";
import { ActionDefinition } from "../../../graphql/types";
import { ActionTableRow } from "./ActionTableRow";

interface ActionTableProps {
  fieldNames: string[];
  actions: ActionDefinition[];
  saveAction: (f: ActionDefinition, i?: number) => void;
  deleteAction: (f: ActionDefinition) => void;
}

export function ActionTable({
  fieldNames,
  actions,
  saveAction,
  deleteAction
}: ActionTableProps) {
  const [selected, setSelected] = useState<ActionDefinition | undefined>();

  return (
    <HTMLTable className="wi-field-table" striped={true}>
      <thead>
        <tr>
          <th>Action Name</th>
          <th>Fields</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {actions.map((action, i) =>
          action === selected ? (
            <ActionTableRow
              fieldNames={fieldNames}
              saveAction={a => {
                saveAction(a, i);
                setSelected(undefined);
              }}
              action={action}
            />
          ) : (
            <tr key={action.name}>
              <td>{action.name}</td>
              <td>
                {action.fields.map(f => (
                  <Tag key={f}>{f}</Tag>
                ))}
              </td>
              <td className="wi-td-button">
                <Button
                  icon="edit"
                  minimal={true}
                  onClick={() => setSelected(action)}
                />
                <Button
                  icon="trash"
                  minimal={true}
                  onClick={() => deleteAction(action)}
                />
              </td>
            </tr>
          )
        )}
        <ActionTableRow fieldNames={fieldNames} saveAction={saveAction} />
      </tbody>
    </HTMLTable>
  );
}
