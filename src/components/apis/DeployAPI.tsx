import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { Button, Icon, Spinner } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  DeployStatus,
  DeployStep,
  DeployStepStatus
} from "../../graphql/types";
import { TEST_API } from "../../routes";
import { Arrows } from "../Arrows";
import "./DeployAPI.css";
const uuid = require("uuid");

const DEPLOY_API = gql`
  mutation DeployAPI($deployID: ID!, $apiID: ID!, $env: Environment!) {
    deployAPI(input: { deployID: $deployID, apiID: $apiID, env: $env }) {
      id
      apiID
      env
    }
  }
`;

const DEPLOY_STATUS = gql`
  query DeployStatus($deployID: ID!) {
    deployStatus(deployID: $deployID) {
      steps {
        step
        status
      }
    }
  }
`;

const STEPS = {
  [DeployStep.GenerateCode]: "Generating code...",
  [DeployStep.BuildImage]: "Building docker image...",
  [DeployStep.LaunchContainer]: "Launching docker container...",
  [DeployStep.LaunchCustomLogicContainer]:
    "Launching custom logic docker container..."
};

export function DeployAPI() {
  const { id } = useParams();
  const history = useHistory();

  const [deployAPI, { data, loading }] = useMutation(DEPLOY_API);
  const deployComplete = data && data.deployAPI.id;

  const [getDeployStatus, { data: statusData, stopPolling }] = useLazyQuery(
    DEPLOY_STATUS,
    {
      pollInterval: 1000
    }
  );
  if (deployComplete) {
    stopPolling();
  }

  async function handleDeploy() {
    const deployID = uuid.v4();
    deployAPI({
      variables: { deployID, apiID: id, env: "SANDBOX" }
    });
    getDeployStatus({
      variables: { deployID }
    });
  }

  function stepStatus(step: string, text: string) {
    let icon;
    if (deployComplete) {
      icon = <Icon icon="tick-circle" intent="success" />;
    } else if (
      statusData &&
      statusData.deployStatus &&
      statusData.deployStatus.steps
    ) {
      const match = statusData.deployStatus.steps.find(
        (s: DeployStepStatus) => s.step === step
      );
      if (match) {
        switch (match.status) {
          case DeployStatus.InProgress:
            icon = <Spinner size={Icon.SIZE_STANDARD} />;
            break;
          case DeployStatus.Complete:
            icon = <Icon icon="tick-circle" intent="success" />;
            break;
          case DeployStatus.Failed:
            icon = <Icon icon="cross" intent="danger" />;
            break;
          default:
            break;
        }
      }
    }

    if (!icon) {
      return (
        <div key={step} className="wi-deploy-step wi-deploy-step-pending">
          <span className="wi-deploy-step-label">{text}</span>
        </div>
      );
    }
    return (
      <div key={step} className="wi-deploy-step">
        <span className="wi-deploy-step-label">{text}</span>
        {icon}
      </div>
    );
  }

  return (
    <div>
      <h2>Deploy API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <Button text="Deploy" intent="primary" onClick={handleDeploy} />
      {(loading || data) && (
        <div className="wi-deploy-steps">
          {Object.entries(STEPS).map(([step, text]) => stepStatus(step, text))}
        </div>
      )}
      <Arrows
        next={() => history.push(TEST_API(id!, data && data.deployAPI.id))}
        disableNext={!deployComplete}
      />
    </div>
  );
}
