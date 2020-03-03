import { HTMLSelect } from "@blueprintjs/core";
import React from "react";
import { AuthPolicyType } from "../../graphql/types";

interface AuthPolicyProps {
  value: AuthPolicyType;
  setValue: (value: AuthPolicyType) => void;
}

export function AuthPolicy({ value, setValue }: AuthPolicyProps) {
  return (
    <HTMLSelect
      value={value}
      onChange={(e: any) => setValue(e.currentTarget.value)}
    >
      <option value={AuthPolicyType.CreatedBy}>
        Allow for objects created by the user
      </option>
      <option value={AuthPolicyType.AttributeMatch}>
        Allow when object attribute matches user attribute
      </option>
      <option value={AuthPolicyType.Custom}>Custom</option>
    </HTMLSelect>
  );
}
