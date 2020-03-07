import { useMutation } from "@apollo/react-hooks";
import { Button, Icon } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TEST_API } from "../../routes";
import { Arrows } from "../Arrows";
import "./DeployAPI.css";

const DEPLOY_API = gql`
  mutation DeployAPI($apiID: ID!, $env: Environment!) {
    deployAPI(input: { apiID: $apiID, env: $env }) {
      id
      apiID
      env
    }
  }
`;

export function DeployAPI() {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [deployId, setDeployId] = useState(undefined);

  const [deployAPI, {}] = useMutation(DEPLOY_API);

  async function handleDeploy() {
    setLoading(true);
    const { data } = await deployAPI({
      variables: { apiID: id, env: "SANDBOX" }
    });
    setLoading(false);
    setDeployId(data.deployAPI.id);
  }

  return (
    <div>
      <h2>Deploy API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <Button text="Deploy" intent="primary" onClick={handleDeploy} />
      <div className="wi-deploy-loading">
        {!deployId && (
          /* blueprint @gray4 */
          <ScaleLoader height={20} color="#A7B6C2" loading={loading} />
        )}
      </div>
      {deployId && (
        <Icon
          className="wi-deploy-success"
          icon="tick-circle"
          intent="success"
        />
      )}
      <Arrows
        next={() => history.push(TEST_API(id!, deployId!))}
        disableNext={deployId === undefined}
      />
    </div>
  );
}
