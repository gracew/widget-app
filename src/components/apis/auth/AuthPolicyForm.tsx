import { HTMLSelect } from "@blueprintjs/core";
import React from "react";
import { AuthPolicy, AuthPolicyType } from "../../../graphql/types";

interface AuthPolicyProps {
  policy: AuthPolicy;
  setPolicy: (value: AuthPolicy) => void;
}

export function AuthPolicyForm({ policy, setPolicy }: AuthPolicyProps) {
  return (
    <HTMLSelect
      value={policy.type}
      onChange={(e: any) => setPolicy({ type: e.currentTarget.policy })}
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
