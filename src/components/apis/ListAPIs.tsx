import { useQuery } from "@apollo/react-hooks";
import { Button, HTMLTable } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { Api, Environment } from "../../graphql/types";
import { AUTH_API, EDIT_API, NEW_API } from "../../routes";
import { DeployStatus } from "./DeployStatus";

export const ALL_APIS = gql`
  {
    apis {
      id
      name
      deploys {
        id
        apiID
        env
      }
    }
  }
`;

export function ListAPIs() {
  const history = useHistory();
  const { loading, error, data } = useQuery(ALL_APIS);
  // TODO(gracew): handle loading/error states better
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <h2>My APIs</h2>
      <Button
        onClick={() => history.push(NEW_API)}
        icon="add"
        text="New API"
        intent="primary"
      />
      <HTMLTable striped={true}>
        <thead>
          <tr>
            <th>API</th>
            <th>Sandbox</th>
            <th>Staging</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {data.apis.map(({ id, name, deploys }: Api) => (
            <tr key={id}>
              <td>
                {name}
                <Button
                  icon="edit"
                  minimal={true}
                  onClick={() => history.push(EDIT_API(id))}
                />
                <Button
                  icon="lock"
                  minimal={true}
                  onClick={() => history.push(AUTH_API(id))}
                />
              </td>
              <td>
                <DeployStatus
                  deploy={deploys.find(d => d.env === Environment.Sandbox)}
                />
              </td>
              <td>
                <DeployStatus
                  deploy={deploys.find(d => d.env === Environment.Staging)}
                />
              </td>
              <td>
                <DeployStatus
                  deploy={deploys.find(d => d.env === Environment.Production)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
}
