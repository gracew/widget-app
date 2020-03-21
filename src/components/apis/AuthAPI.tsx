import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { AuthPolicyType } from "../../graphql/types";
import { CUSTOMIZE_API } from "../../routes";
import { Arrows } from "../Arrows";
import { SaveCancel } from "../SaveCancel";
import { AuthPolicy } from "./auth/AuthPolicy";

const AUTH = gql`
  query AUTH($apiID: ID!) {
    auth(apiID: $apiID) {
      readPolicy {
        type
        userAttribute
        objectAttribute
      }
      writePolicy {
        type
        userAttribute
        objectAttribute
      }
    }
  }
`;

const SET_AUTH = gql`
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
  const query = new URLSearchParams(useLocation().search);
  const edit = query.get("edit") === "true";
  const history = useHistory();

  const { loading, data } = useQuery(AUTH, { variables: { apiID: id } });
  const [authApi, _] = useMutation(SET_AUTH);

  const [readPolicyType, setReadPolicyType] = useState(
    (data && data.auth && data.auth.readPolicy.type) || AuthPolicyType.CreatedBy
  );
  const [writePolicyType, setWritePolicyType] = useState(
    (data && data.auth && data.auth.writePolicy.type) ||
      AuthPolicyType.CreatedBy
  );

  async function handleSave() {
    await authApi({
      variables: {
        apiID: id,
        readPolicyType,
        writePolicyType
      }
    });
    if (edit) {
      history.goBack();
    } else {
      history.push(CUSTOMIZE_API(id!));
    }
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>Auth API</h2>
      <div>
        <h3>Read Policy</h3>
        <AuthPolicy value={readPolicyType} setValue={setReadPolicyType} />

        <h3>Write Policy</h3>
        <AuthPolicy value={writePolicyType} setValue={setWritePolicyType} />

        {!edit && <Arrows next={handleSave} />}
        {edit && <SaveCancel onSave={handleSave} />}
      </div>
    </div>
  );
}
