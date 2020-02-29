import { useMutation } from "@apollo/react-hooks";
import { HTMLSelect } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthPolicyType } from "../../graphql/types";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";

const AUTH_API = gql`
  mutation AuthAPI(
    $apiID: ID!
    $readPolicyType: AuthPolicyType!
    $writePolicyType: AuthPolicyType!
  ) {
    authAPI(
      input: {
        apiID: $apiID
        readPolicy: { type: $readPolicyType }
        writePolicy: { type: $writePolicyType }
      }
    )
  }
`;

export function AuthAPI() {
  const { id } = useParams();
  const history = useHistory();
  const [authApi, _] = useMutation(AUTH_API);
  const [readPolicyType, setReadPolicyType] = useState(
    AuthPolicyType.CreatedBy
  );
  const writePolicyType = AuthPolicyType.CreatedBy;

  async function handleNext() {
    const { data } = await authApi({
      variables: { apiID: id, readPolicyType, writePolicyType }
    });
    history.push(DEPLOY_API(data.defineAPI.id));
  }

  return (
    <div>
      <h2>Auth API</h2>
      <div>
        <h3>Read Policy</h3>
        <HTMLSelect
          value={readPolicyType}
          onChange={(e: any) => setReadPolicyType(e.currentTarget.value)}
        >
          <option value={AuthPolicyType.CreatedBy}>
            Allow for objects created by the user
          </option>
          <option value={AuthPolicyType.AttributeMatch}>
            Allow when object attribute matches user attribute
          </option>
          <option value={AuthPolicyType.Custom}>Custom</option>
        </HTMLSelect>

        <h3>Write Policy</h3>
        <HTMLSelect>
          <option value="read-policy">Use read policy</option>
          <option value="custom">Custom</option>
        </HTMLSelect>
        <Arrows next={handleNext} />
      </div>
    </div>
  );
}
