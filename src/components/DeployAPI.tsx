import { useMutation } from "@apollo/react-hooks";
import { Button } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useHistory, useParams } from "react-router-dom";
import { CreateObject } from "./objects/CreateObject";

const DEPLOY_API = gql`
  mutation DeployAPI($apiID: String!, $env: String!) {
    deployAPI(input: { apiID: $apiID, env: $env }) {
      id
      apiID
      env
    }
  }
`;

// TODO(gracew): would be nice to substitute the name of the API
export function DeployAPI() {
  const history = useHistory();
  const { id } = useParams();
  const [deployAPI, { loading, error }] = useMutation(DEPLOY_API);

  async function handleDeploy() {
    const { data } = await deployAPI({
      variables: { apiID: id, env: "sandbox" }
    });
  }

  const createText =
    'curl -XPOST http://localhost:8080/apis/deployId -H "Content-type: application/json" -d \'{"foo": "bar"}\'';
  const readText = "curl http://localhost:8080/apis/deployId/objects/objectId";
  const updateText =
    'curl -XPUT http://localhost:8080/apis/deployId/objects/objectId -H "Content-type: application/json" -d \'{"foo": "bar"}\'';
  const deleteText =
    "curl -XDELETE http://localhost:8080/apis/deployId/objects/objectId";

  return (
    <div>
      <h2>Deploy & Test API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <Button text="Deploy" intent="primary" onClick={handleDeploy} />
      <div>
        <CreateObject />
        <h2>Read the object</h2>
        <MonacoEditor
          width="800"
          height="30"
          theme="vs-dark"
          value={readText}
        />
        <h2>Update the object</h2>
        <MonacoEditor
          width="800"
          height="30"
          theme="vs-dark"
          value={updateText}
        />
        <h2>Delete the object</h2>
        <MonacoEditor
          width="800"
          height="30"
          theme="vs-dark"
          value={deleteText}
        />
        <div className="arrows">
          <Button icon="arrow-left" onClick={history.goBack} />
          <Button rightIcon="arrow-right" />
        </div>
      </div>
    </div>
  );
}
