import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthPolicyType } from "../../graphql/types";
import { CUSTOMIZE_API } from "../../routes";
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
    await authApi({
      variables: {
        apiID: id,
        readPolicyType,
        writePolicyType
      }
    });
    history.push(CUSTOMIZE_API(id!));
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
