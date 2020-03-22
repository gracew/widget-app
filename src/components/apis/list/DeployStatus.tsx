import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Icon,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { Deploy, Environment } from "../../../graphql/types";
import { DEPLOY_API, TEST_API } from "../../../routes";
import { ALL_APIS } from "../ListAPIs";

const DELETE_DEPLOY = gql`
  mutation DeleteDeploy($id: ID!) {
    deleteDeploy(id: $id)
  }
`;

interface DeployStatusProps {
  apiID: string;
  env: Environment;
  deploy?: Deploy;
}

export function DeployStatus({ apiID, env, deploy }: DeployStatusProps) {
  const history = useHistory();

  const [deleteDeploy, _] = useMutation(DELETE_DEPLOY, {
    update(cache, {}) {
      const cachedRes: any = cache.readQuery({ query: ALL_APIS });
      const apis = (cachedRes && cachedRes.apis) || [];
      cache.writeQuery({
        query: ALL_APIS,
        data: {
          apis: apis.map((a: any) => ({
            ...a,
            deploys: a.deploys.filter(
              (d: Deploy) => d.id !== (deploy && deploy.id)
            )
          }))
        }
      });
    }
  });

  if (!deploy) {
    return env === Environment.Sandbox ? (
      <Button text="Deploy" onClick={() => history.push(DEPLOY_API(apiID))} />
    ) : (
      <div></div>
    );
  }
  const menu = (
    <Menu>
      <MenuItem
        icon="play"
        text="Test"
        onClick={() => history.push(TEST_API(deploy.apiID, deploy.id))}
      />
      <MenuDivider />
      <MenuItem
        icon="trash"
        text="Delete"
        intent="danger"
        onClick={() => deleteDeploy({ variables: { id: deploy.id } })}
      />
    </Menu>
  );
  return (
    <div>
      <Icon icon="tick-circle" intent="success" />
      <Button
        icon="timeline-line-chart"
        minimal={true}
        onClick={() =>
          window.open(`http://localhost:3001/d/${deploy.id}`, "_blank")
        }
      />
      <Popover content={menu} position={Position.RIGHT}>
        <Button icon="more" minimal={true} />
      </Popover>
    </div>
  );
}
