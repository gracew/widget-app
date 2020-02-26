import { useQuery } from "@apollo/react-hooks";
import { Button, HTMLTable, Icon } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { DEPLOY } from "../routes";

const ALL_APIS = gql`
  {
    apis {
      id
      name
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
      <h2>All APIs</h2>
      <HTMLTable striped={true}>
        <thead>
          <tr>
            <th>API</th>
            <th>Actions</th>
            <th>Sandbox</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {data.apis.map(({ id, name }: { id: string; name: string }) => (
            <tr>
              <td>{name}</td>
              <td>
                <Button icon="edit" minimal={true} />
                <Button
                  icon="play"
                  minimal={true}
                  onClick={() => history.push(`/${id}${DEPLOY}`)}
                />
              </td>
              <td>
                <Icon icon="tick-circle" intent="success" />
              </td>
              <td>
                <Icon icon="tick-circle" intent="primary" />
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
}
