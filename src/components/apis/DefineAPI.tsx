import {
  Button,
  Checkbox,
  ControlGroup,
  Drawer,
  FileInput,
  FormGroup,
  HTMLSelect,
  HTMLTable,
  Icon,
  InputGroup,
  Tooltip
} from "@blueprintjs/core";
import React, { useState } from "react";
import {
  ApiDefinition,
  Constraint,
  FieldDefinition,
  OperationDefinition,
  OperationType,
  SortOrder,
  Type
} from "../../graphql/types";
import { CREATED_AT, CREATED_BY, TYPES } from "../../strings";
import { Arrows } from "../Arrows";
import "./DefineAPI.css";
import { FieldForm } from "./FieldForm";
import { CollapseContainer } from "./objects/CollapseContainer";

interface DefineAPIProps {
  saveDefinition: (definition: ApiDefinition) => any;
  initialName?: string;
  initialFields: FieldDefinition[];
  initialCreate: boolean;
  initialRead: boolean;
  initialList: boolean;
  initialSortField: string;
  initialSortOrder: SortOrder;
}

export function DefineAPI({
  saveDefinition,
  initialName,
  initialFields,
  initialCreate,
  initialRead,
  initialList,
  initialSortField,
  initialSortOrder
}: DefineAPIProps) {
  const [name, setName] = useState(initialName);

  const [create, setCreate] = useState(initialCreate);
  const [read, setRead] = useState(initialRead);
  const [list, setList] = useState(initialList);
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const [drawerOpen, setDrawerOpen] = useState(false);
  // use a list for stable ordering
  const [fields, setFields] = useState<FieldDefinition[]>(initialFields);
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

  const currDefinition = () => {
    const operations: OperationDefinition[] = [];
    if (create) {
      operations.push({ type: OperationType.Create });
    }
    if (read) {
      operations.push({ type: OperationType.Read });
    }
    if (list) {
      operations.push({
        type: OperationType.List,
        sort: [{ field: sortField, order: sortOrder }]
      });
    }
    return { name: name!, fields, operations };
  };

  return (
    <div>
      <h3>Name</h3>
      <InputGroup
        className="wi-api-name"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <h3>Fields</h3>
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
                  onClick={() => {
                    setSelectedField(f);
                    setDrawerOpen(true);
                  }}
                />
                <Button
                  icon="trash"
                  minimal={true}
                  onClick={() => setFields(fields.filter(field => field !== f))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
      <Button
        icon="add"
        intent="primary"
        text="Add field"
        onClick={() => setDrawerOpen(true)}
      />
      <CollapseContainer title="Operations">
        <Checkbox
          checked={create}
          label="Create"
          onChange={() => setCreate(!create)}
        />
        <Checkbox checked={read} label="Read" onChange={() => setRead(!read)} />
        <Checkbox checked={list} label="List" onChange={() => setList(!list)} />
        <h4>Sort Options</h4>
        <ControlGroup>
          <FormGroup label="Field">
            <HTMLSelect
              value={sortField}
              onChange={(e: any) => setSortField(e.currentTarget.value)}
            >
              {fieldNames.map(n => (
                <option value={n}>{n}</option>
              ))}
            </HTMLSelect>
          </FormGroup>
          <FormGroup label="Order">
            <HTMLSelect
              value={sortOrder}
              onChange={(e: any) => setSortOrder(e.currentTarget.value)}
            >
              <option value={SortOrder.Asc}>Asc</option>
              <option value={SortOrder.Desc}>Desc</option>
            </HTMLSelect>
          </FormGroup>
        </ControlGroup>
      </CollapseContainer>
      <FormGroup className="upload-file" label="Upload a file instead">
        <FileInput text="Choose file..." />
      </FormGroup>
      <Drawer
        hasBackdrop={false}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={Drawer.SIZE_SMALL}
      >
        {drawerContent}
      </Drawer>
      {!initialName && (
        <Arrows
          next={() => saveDefinition(currDefinition())}
          showBack={false}
          showNext={true}
        />
      )}
      {initialName && (
        <Button
          text="Save"
          intent="primary"
          onClick={() => saveDefinition(currDefinition())}
        />
      )}
    </div>
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
    if (v !== undefined) {
      return true;
    }
  }
  return false;
}
