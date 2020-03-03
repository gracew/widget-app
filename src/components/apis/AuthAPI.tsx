import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthenticationType, AuthPolicyType } from "../../graphql/types";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import { AuthPolicy } from "./AuthPolicy";

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
    $authenticationType: AuthenticationType!
    $readPolicyType: AuthPolicyType!
    $writePolicyType: AuthPolicyType!
  ) {
    authAPI(
      input: {
        apiID: $apiID
        authenticationType: $authenticationType
        readPolicy: { type: $readPolicyType }
        writePolicy: { type: $writePolicyType }
      }
    )
  }
`;

export function AuthAPI() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(AUTH, { variables: { apiID: id } });
  const [authApi, _] = useMutation(SET_AUTH);
  const [readPolicyType, setReadPolicyType] = useState(
    (data && data.auth && data.auth.readPolicy.type) || AuthPolicyType.CreatedBy
  );
  const [writePolicyType, setWritePolicyType] = useState(
    (data && data.auth && data.auth.writePolicy.type) ||
      AuthPolicyType.CreatedBy
  );

  async function handleNext() {
    const { data } = await authApi({
      variables: {
        apiID: id,
        authenticationType: AuthenticationType.BuiltIn,
        readPolicyType,
        writePolicyType
      }
    });
    history.push(DEPLOY_API(id!));
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

        <Arrows next={handleNext} />
      </div>
    </div>
  );
}
