import {
  Button,
  Checkbox,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
  NumericInput
} from "@blueprintjs/core";
import React, { useState } from "react";
import { Constraint, FieldDefinition, Type } from "../../../graphql/types";
import { TYPES } from "../../../strings";
import { CollapseContainer } from "../objects/CollapseContainer";
import "./FieldForm.css";

interface FieldFormProps {
  definition?: FieldDefinition;
  disallowedFieldNames: string[];
  saveDefinition: (definition: FieldDefinition, prevName?: string) => void;
}

export function FieldForm({
  definition,
  disallowedFieldNames,
  saveDefinition
}: FieldFormProps) {
  const [name, setName] = useState((definition && definition.name) || "");
  const [type, setType] = useState(initialType(definition));
  const [elementType, setElementType] = useState(
    initialElementType(definition)
  );
  const [optional, setOptional] = useState(
    (definition && definition.optional) || false
  );
  const [customLogic, setCustomLogic] = useState(
    (definition && definition.customLogicPopulated) || false
  );

  const c = definition && definition.constraints;
  const initialMin = type === Type.Int ? c && c.minInt : c && c.minFloat;
  const initialMax = type === Type.Int ? c && c.maxInt : c && c.maxFloat;
  const [min, setMin] = useState<number | undefined>(initialMin || undefined);
  const [max, setMax] = useState<number | undefined>(initialMax || undefined);
  const [regex, setRegex] = useState<string | undefined>(
    (c && c.regex) || undefined
  );
  const [minLength, setMinLength] = useState<number | undefined>(
    (c && c.minLength) || undefined
  );
  const [maxLength, setMaxLength] = useState<number | undefined>(
    (c && c.maxLength) || undefined
  );

  const validFieldName = !disallowedFieldNames.includes(name);

  const onSave = () => {
    let constraints: Constraint = {};
    switch (type) {
      case Type.Int:
        constraints = { minInt: min, maxInt: max };
        break;
      case Type.Float:
        constraints = { minFloat: min, maxFloat: max };
        break;
      case Type.String:
        constraints = { regex, minLength, maxLength };
        break;
      case Type.List:
        constraints = { minLength, maxLength };
        break;
    }

    saveDefinition(
      {
        // TODO(gracew): do validation...
        name,
        type: (type === Type.List ? elementType : type) as Type,
        optional,
        list: type === Type.List,
        constraints,
        customLogicPopulated: customLogic
      },
      definition && definition.name
    );
  };

  const intent = validFieldName ? "none" : "danger";
  return (
    <div className="wi-field-form">
      <h2>{definition ? "Edit Field" : "New Field"}</h2>
      <ControlGroup>
        <FormGroup
          label="Field Name"
          intent={intent}
          helperText={validFieldName ? undefined : "Field name must be unique"}
        >
          <InputGroup
            value={name}
            intent={intent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </FormGroup>
        <FormGroup label="Field Type">
          <HTMLSelect
            value={type}
            onChange={(e: any) => setType(e.currentTarget.value)}
          >
            {Object.entries(TYPES).map(([type, display]) => (
              <option key={type} value={type}>
                {display}
              </option>
            ))}
          </HTMLSelect>
        </FormGroup>
      </ControlGroup>

      {type === Type.List && (
        <FormGroup label="List Element Type">
          <HTMLSelect
            value={elementType}
            onChange={(e: any) => setElementType(e.currentTarget.value)}
          >
            {Object.entries(TYPES).map(([type, display]) => (
              <option value={type}>{display}</option>
            ))}
          </HTMLSelect>
        </FormGroup>
      )}

      <Checkbox
        inline={true}
        label="Optional"
        checked={optional}
        onChange={() => setOptional(!optional)}
      />

      <CollapseContainer title="Advanced">
        <FormGroup label="If checked, this field will not be required as a request parameter">
          <Checkbox
            inline={true}
            label="Populated by custom logic"
            checked={customLogic}
            onChange={() => setCustomLogic(!customLogic)}
          />
        </FormGroup>
        {(type === Type.Float || type === Type.Int) && (
          <FormGroup label="Minimum value">
            <NumericInput
              value={min}
              onValueChange={(val: number) => setMin(val)}
            />
          </FormGroup>
        )}
        {(type === Type.Float || type === Type.Int) && (
          <FormGroup label="Maximum value">
            <NumericInput
              value={max}
              onValueChange={(val: number) => setMax(val)}
            />
          </FormGroup>
        )}
        {type === Type.String && (
          <FormGroup label="Regular expression pattern">
            <InputGroup
              value={regex}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRegex(e.target.value)
              }
            />
          </FormGroup>
        )}
        {(type === Type.String || type === Type.List) && (
          <FormGroup label="Minimum Length">
            <NumericInput
              value={minLength}
              onValueChange={(val: number) => setMinLength(val)}
            />
          </FormGroup>
        )}
        {(type === Type.String || type === Type.List) && (
          <FormGroup label="Maximum Length">
            <NumericInput
              value={maxLength}
              onValueChange={(val: number) => setMaxLength(val)}
            />
          </FormGroup>
        )}
      </CollapseContainer>

      <Button intent="primary" text="Save" onClick={onSave} />
    </div>
  );
}

function initialType(definition?: FieldDefinition) {
  if (!definition) {
    return Type.String;
  }
  if (definition.list) {
    return Type.List;
  }
  return definition.type;
}

function initialElementType(definition?: FieldDefinition) {
  if (!definition) {
    return Type.String;
  }
  if (definition.list) {
    return definition.type;
  }
  return Type.String;
}
