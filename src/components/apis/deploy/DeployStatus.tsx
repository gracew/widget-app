import { Button, Icon } from "@blueprintjs/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Deploy } from "../../../graphql/types";
import { TEST_API } from "../../../routes";

interface DeployStatusProps {
  deploy?: Deploy;
}

export function DeployStatus({ deploy }: DeployStatusProps) {
  const history = useHistory();

  if (!deploy) {
    return <div></div>;
  }
  return (
    <div>
      <Icon icon="tick-circle" intent="success" />
      <Button
        icon="play"
        minimal={true}
        onClick={() => history.push(TEST_API(deploy.apiID, deploy.id))}
      />
      <Button
        icon="timeline-line-chart"
        minimal={true}
        onClick={() =>
          window.open(`http://localhost:3001/d/${deploy.id}`, "_blank")
        }
      />
    </div>
  );
}
