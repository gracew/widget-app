import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { CreateObject } from "./objects/CreateObject";
import { ListObject } from "./objects/ListObject";
import { ReadObject } from "./objects/ReadObject";

const DEPLOY_API = gql`
  mutation DeployAPI($apiID: String!, $env: String!) {
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
  const history = useHistory();
  const { id } = useParams();
  const [deployAPI, {}] = useMutation(DEPLOY_API);
  const { data, loading } = useQuery(OBJECTS, { variables: { id } });
  if (loading) {
    return <p>Loading</p>;
  }

  async function handleDeploy() {
    await deployAPI({
      variables: { apiID: id, env: "sandbox" }
    });
  }

  return (
    <div>
      <h2>Deploy & Test API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <Button text="Deploy" intent="primary" onClick={handleDeploy} />
      <div>
        <CreateObject definition={data.api.definition} />
        <ReadObject definition={data.api.definition} />
        <ListObject definition={data.api.definition} />
        <div className="arrows">
          <Button icon="arrow-left" onClick={history.goBack} />
          <Button rightIcon="arrow-right" />
        </div>
      </div>
    </div>
  );
}
