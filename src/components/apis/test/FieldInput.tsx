import {
  FormGroup,
  HTMLSelect,
  InputGroup,
  NumericInput
} from "@blueprintjs/core";
import React, { useState } from "react";
import { FieldDefinition, Type } from "../../../graphql/types";

interface IFieldInputProps {
  definition: FieldDefinition;
  value: any;
  setValue: (val: any) => void;
}

function helperText(definition: FieldDefinition) {
  if (!definition.constraints) {
    return undefined;
  }
  switch (definition.type) {
    case Type.Float:
      if (
        definition.constraints.minFloat !== null &&
        definition.constraints.maxFloat !== null
      ) {
        return `Value must be between ${definition.constraints.minFloat} and ${definition.constraints.maxFloat}`;
      }
      if (definition.constraints.minFloat !== null) {
        return `Value must be >= ${definition.constraints.minFloat}`;
      }
      if (definition.constraints.maxFloat !== null) {
        return `Value must be <= ${definition.constraints.maxFloat}`;
      }
      break;
    case Type.Int:
      if (
        definition.constraints.minInt !== null &&
        definition.constraints.maxInt !== null
      ) {
        return `Value must be between ${definition.constraints.minInt} and ${definition.constraints.maxInt}`;
      }
      if (definition.constraints.minInt !== null) {
        return `Value must be >= ${definition.constraints.minInt}`;
      }
      if (definition.constraints.maxInt !== null) {
        return `Value must be <= ${definition.constraints.maxInt}`;
      }
      break;
    case Type.String:
      let regexText;
      if (definition.constraints.regex) {
        regexText = `Pattern: ${definition.constraints.regex}`;
      }
      let lengthText;
      if (
        definition.constraints.minLength &&
        definition.constraints.maxLength
      ) {
        lengthText = `Length must be between ${definition.constraints.minLength} and ${definition.constraints.maxLength}`;
      } else if (definition.constraints.minLength) {
        lengthText = `Length must be at least ${definition.constraints.minLength}`;
      } else if (definition.constraints.maxLength) {
        lengthText = `Length must be at most ${definition.constraints.maxLength}`;
      }
      return regexText && lengthText
        ? `${regexText}. ${lengthText}`
        : regexText
        ? regexText
        : lengthText;
  }
}

export function FieldInput({ definition, value, setValue }: IFieldInputProps) {
  const [valid, setValid] = useState(true);
  function validate(v: any) {
    if (!definition.constraints) {
      return;
    }
    switch (definition.type) {
      case Type.Float:
        if (definition.constraints.minFloat) {
          if (v < definition.constraints.minFloat) {
            setValid(false);
            return;
          }
        }
        if (definition.constraints.maxFloat) {
          if (v > definition.constraints.maxFloat) {
            setValid(false);
            return;
          }
        }
        break;
      case Type.Int:
        if (definition.constraints.minInt) {
          if (v < definition.constraints.minInt) {
            setValid(false);
            return;
          }
        }
        if (definition.constraints.maxInt) {
          if (v > definition.constraints.maxInt) {
            setValid(false);
            return;
          }
        }
        break;
      case Type.String:
        if (definition.constraints.minLength) {
          if (v.length < definition.constraints.minLength) {
            setValid(false);
            return;
          }
        }
        if (definition.constraints.maxLength) {
          if (v.length > definition.constraints.maxLength) {
            setValid(false);
            return;
          }
        }
        break;
    }
    setValid(true);
    setValue(v);
  }
  const intent = valid ? "none" : "danger";
  const input = () => {
    if (definition.type === Type.Float || definition.type === Type.Int) {
      return (
        <NumericInput
          intent={intent}
          value={value}
          onValueChange={(num: number) => validate(num)}
        />
      );
    }
    if (definition.type === Type.Boolean) {
      return (
        <HTMLSelect
          value={value}
          onChange={(e: any) => setValue(e.currentTarget.value === "true")}
        >
          <option>--</option>
          <option value={"true"}>true</option>
          <option value={"false"}>false</option>
        </HTMLSelect>
      );
    }
    return (
      <InputGroup
        intent={intent}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          validate(e.target.value)
        }
      />
    );
  };
  const text = helperText(definition);
  return (
    <FormGroup
      key={definition.name}
      label={definition.name}
      helperText={text}
      intent={intent}
    >
      {input()}
    </FormGroup>
  );
}
