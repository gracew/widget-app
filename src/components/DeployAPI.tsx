import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TEST_API } from "../routes";
import { Arrows } from "./Arrows";

const DEPLOY_API = gql`
  mutation DeployAPI($apiID: ID!, $env: Environment!) {
    deployAPI(input: { apiID: $apiID, env: $env }) {
      id
      apiID
      env
    }
  }
`;

const OBJECTS = gql`
  query GET_API($id: ID!) {
    api(id: $id) {
      definition {
        operations {
          type
          sort
          filter
        }
        fields {
          name
          type
        }
      }
    }
  }
`;
// TODO(gracew): would be nice to substitute the name of the API
export function DeployAPI() {
  const { id } = useParams();
  const history = useHistory();
  const [deployId, setDeployId] = useState("");

  const [deployAPI, {}] = useMutation(DEPLOY_API);
  const { data, loading } = useQuery(OBJECTS, { variables: { id } });

  if (loading) {
    return <p>Loading</p>;
  }

  async function handleDeploy() {
    const { data } = await deployAPI({
      variables: { apiID: id, env: "SANDBOX" }
    });
    setDeployId(data.deployAPI.id);
  }

  return (
    <div>
      <h2>Deploy API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <Button text="Deploy" intent="primary" onClick={handleDeploy} />
      <Arrows next={() => history.push(TEST_API(id!, deployId))} />
    </div>
  );
}
