import { Button, Drawer, InputGroup } from "@blueprintjs/core";
import React, { useState } from "react";
import { FieldDefinition } from "../../../graphql/types";
import { CREATED_AT, CREATED_BY } from "../../../strings";
import { FieldForm } from "./FieldForm";
import "./Fields.css";
import { FieldTable } from "./FieldTable";

interface FieldsProps {
  name?: string;
  fields: FieldDefinition[];
  setName: (name: string) => void;
  setFields: (fields: FieldDefinition[]) => void;
}

export function Fields({ name, fields, setName, setFields }: FieldsProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // use a list for stable ordering
  const fieldNames = fields.map(f => f.name).concat([CREATED_AT, CREATED_BY]);

  const [selectedField, setSelectedField] = useState<
    FieldDefinition | undefined
  >(undefined);
  const drawerContent = (
    <FieldForm
      disallowedFieldNames={
        selectedField
          ? fieldNames.filter(n => n !== selectedField.name)
          : fieldNames
      }
      definition={selectedField}
      saveDefinition={(def: FieldDefinition, prevName?: string) => {
        if (prevName) {
          const i = fields.findIndex(f => f.name === prevName);
          if (i >= 0) {
            fields[i] = def;
          }
        } else {
          fields.push(def);
        }
        setFields(fields);
        setDrawerOpen(false);
        setSelectedField(undefined);
      }}
    />
  );

  return (
    <div>
      <h3>Name</h3>
      <InputGroup
        className="wi-api-name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <h3>Fields</h3>
      <FieldTable
        fields={fields}
        selectField={(f: FieldDefinition) => {
          setSelectedField(f);
          setDrawerOpen(true);
        }}
        deleteField={(f: FieldDefinition) =>
          setFields(fields.filter(field => field !== f))
        }
      />
      <Button
        icon="add"
        intent="primary"
        text="Add field"
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        hasBackdrop={false}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={Drawer.SIZE_SMALL}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}
