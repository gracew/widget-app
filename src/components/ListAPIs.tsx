import { useQuery } from "@apollo/react-hooks";
import { Button, HTMLTable, Icon } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { TEST_API } from "../routes";

export const ALL_APIS = gql`
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
      <h2>My APIs</h2>
      <HTMLTable striped={true}>
        <thead>
          <tr>
            <th>API</th>
            <th>Sandbox</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {data.apis.map(({ id, name }: { id: string; name: string }) => (
            <tr key={id}>
              <td>
                {name}
                <Button icon="edit" minimal={true} />
              </td>
              <td>
                <Icon icon="tick-circle" intent="success" />
                <Button
                  icon="play"
                  minimal={true}
                  onClick={() => history.push(TEST_API(id, "STAGING"))}
                />
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
}
