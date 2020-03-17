import { useMutation } from "@apollo/react-hooks";
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
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Constraint,
  FieldDefinition,
  OperationDefinition,
  OperationType,
  SortOrder,
  Type
} from "../../graphql/types";
import { AUTH_API } from "../../routes";
import { TYPES } from "../../strings";
import { Arrows } from "../Arrows";
import "./DefineAPI.css";
import { FieldForm } from "./FieldForm";
import { ALL_APIS } from "./ListAPIs";
import { CollapseContainer } from "./objects/CollapseContainer";

const DEFINE_API = gql`
  mutation DefineAPI($rawDefinition: String!) {
    defineAPI(input: { rawDefinition: $rawDefinition }) {
      id
      name
    }
  }
`;

const CREATED_AT = "createdAt";
const CREATED_BY = "createdBy";

export function DefineAPI() {
  const history = useHistory();

  const [name, setName] = useState(undefined);
  const [create, setCreate] = useState(true);
  const [read, setRead] = useState(true);
  const [list, setList] = useState(true);
  const [sortField, setSortField] = useState(CREATED_AT);
  const [sortOrder, setSortOrder] = useState(SortOrder.Desc);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // use a list for stable ordering
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const fieldNames = fields.map(f => f.name).concat([CREATED_AT, CREATED_BY]);

  const [selectedDefinition, setSelectedDefinition] = useState<
    FieldDefinition | undefined
  >(undefined);
  const drawerContent = (
    <FieldForm
      disallowedFieldNames={
        selectedDefinition
          ? fieldNames.filter(n => n !== selectedDefinition.name)
          : fieldNames
      }
      definition={selectedDefinition}
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
        setSelectedDefinition(undefined);
      }}
    />
  );

  const [defineApi, _] = useMutation(DEFINE_API, {
    update(cache, { data: { defineAPI } }) {
      const cachedRes: any = cache.readQuery({ query: ALL_APIS });
      const apis = (cachedRes && cachedRes.apis) || [];
      cache.writeQuery({
        query: ALL_APIS,
        data: { apis: apis.concat([defineAPI]) }
      });
    }
  });

  async function handleNext() {
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
    const definition = { name, fields, operations };
    const { data } = await defineApi({
      variables: { rawDefinition: JSON.stringify(definition) }
    });
    history.push(AUTH_API(data.defineAPI.id));
  }

  return (
    <div>
      <h2>New API</h2>
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
              <td>{f.name}</td>
              <td>
                {displayType(f)}
                {constraintsDefined(f.constraints) && (
                  <Tooltip
                    className="wi-constraints-icon"
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
                    setSelectedDefinition(f);
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
      <Arrows next={handleNext} showBack={false} showNext={true} />
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
