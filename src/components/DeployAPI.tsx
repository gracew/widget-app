import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Arrows } from "./Arrows";
import { CollapseContainer } from "./objects/CollapseContainer";
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
  const { id } = useParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const [deployAPI, {}] = useMutation(DEPLOY_API);
  const { data, loading } = useQuery(OBJECTS, { variables: { id } });

  if (loading) {
    return <p>Loading</p>;
  }

  const includeCreate =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.includes("CREATE");
  const includeRead =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.includes("READ");
  const includeList = data.api.definition.operations.find(
    (el: any) => el.type === "LIST"
  );

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
        {includeCreate && (
          <CollapseContainer
            title="Create an object"
            open={createOpen}
            setOpen={setCreateOpen}
          >
            <CreateObject definition={data.api.definition} />
          </CollapseContainer>
        )}

        {includeRead && (
          <CollapseContainer
            title="Read an object"
            open={readOpen}
            setOpen={setReadOpen}
          >
            <ReadObject definition={data.api.definition} />
          </CollapseContainer>
        )}

        {includeList && (
          <CollapseContainer
            title="List objects"
            open={listOpen}
            setOpen={setListOpen}
          >
            <ListObject definition={data.api.definition} />
          </CollapseContainer>
        )}

        <Arrows showNext={false} />
      </div>
    </div>
  );
}
