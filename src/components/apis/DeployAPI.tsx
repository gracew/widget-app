import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { TEST_API } from "../../routes";
import { Arrows } from "../Arrows";
import { ButtonLoading } from "./ButtonLoading";

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

  const [deployAPI, { data, loading }] = useMutation(DEPLOY_API);

  async function handleDeploy() {
    const { data } = await deployAPI({
      variables: { apiID: id, env: "SANDBOX" }
    });
  }

  return (
    <div>
      <h2>Deploy API</h2>
      <p>Great! Let's deploy the API to a sandbox and try calling it.</p>
      <ButtonLoading
        text="Deploy"
        loading={loading}
        success={data && data.deployAPI.id}
        onClick={handleDeploy}
      />
      <Arrows
        next={() => history.push(TEST_API(id!, data && data.deployAPI.id))}
        disableNext={!(data && data.deployAPI.id)}
      />
    </div>
  );
}
